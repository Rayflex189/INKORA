import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { db } from "@/lib/db";
import { logActivity } from "@/lib/audit";

export async function GET(request: Request) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  try {
    const books = await db.bookGalleryItem.findMany({
      orderBy: { publishedAt: "desc" },
      include: {
        project: {
          select: {
            id: true,
            title: true,
            slug: true,
            authorName: true,
            visibility: true,
            currentWordCount: true,
          },
        },
      },
    });

    return NextResponse.json({ books });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch gallery books" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  try {
    const { action, bookId } = await request.json();

    if (!bookId) {
      return NextResponse.json({ error: "Book ID required" }, { status: 400 });
    }

    const book = await db.bookGalleryItem.findUnique({ where: { id: bookId } });
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    if (action === "feature") {
      const updated = await db.bookGalleryItem.update({
        where: { id: bookId },
        data: { isFeatured: !book.isFeatured, featuredAt: new Date() },
      });
      await logActivity({
        actorId: auth.user.id,
        actorRole: "ADMIN",
        action: updated.isFeatured ? "BOOK_FEATURED" : "BOOK_UNFEATURED",
        targetType: "BOOK",
        targetId: bookId,
        details: `Admin ${updated.isFeatured ? "featured" : "unfeatured"} book "${book.title}"`,
      });
      return NextResponse.json({ success: true, book: updated });
    }

    if (action === "unpublish") {
      // Unpublish book from gallery and change project visibility
      await db.bookGalleryItem.update({
        where: { id: bookId },
        data: { visibility: "UNLISTED" },
      });
      await db.project.update({
        where: { id: book.projectId },
        data: { visibility: "PRIVATE" },
      });
      await logActivity({
        actorId: auth.user.id,
        actorRole: "ADMIN",
        action: "BOOK_UNPUBLISHED",
        targetType: "BOOK",
        targetId: bookId,
        details: `Admin unpublished book "${book.title}"`,
      });
      return NextResponse.json({ success: true });
    }

    if (action === "publish") {
      await db.bookGalleryItem.update({
        where: { id: bookId },
        data: { visibility: "PUBLIC" },
      });
      await db.project.update({
        where: { id: book.projectId },
        data: { visibility: "PUBLIC" },
      });
      await logActivity({
        actorId: auth.user.id,
        actorRole: "ADMIN",
        action: "BOOK_PUBLISHED",
        targetType: "BOOK",
        targetId: bookId,
        details: `Admin set book "${book.title}" visibility to PUBLIC`,
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Operation failed" }, { status: 500 });
  }
}

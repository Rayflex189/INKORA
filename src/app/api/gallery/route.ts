import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const genre = searchParams.get("genre");
    const query = searchParams.get("query");
    const bookId = searchParams.get("bookId");

    // Single book detail request for reader view
    if (bookId) {
      const book = await db.bookGalleryItem.findUnique({
        where: { id: bookId },
        include: {
          project: {
            include: {
              chapters: {
                orderBy: { orderIndex: "asc" },
                select: { id: true, title: true, content: true, wordCount: true, orderIndex: true },
              },
              owner: { select: { id: true, name: true, username: true, avatar: true, bio: true } },
            },
          },
        },
      });

      if (!book) return NextResponse.json({ error: "Book not found" }, { status: 404 });

      // Increment view count
      await db.bookGalleryItem.update({
        where: { id: bookId },
        data: { viewsCount: { increment: 1 } },
      });

      return NextResponse.json({ book });
    }

    let whereClause: any = { visibility: "PUBLIC" };
    if (genre && genre !== "All") {
      whereClause.genre = genre;
    }
    if (query) {
      whereClause.OR = [
        { title: { contains: query } },
        { author: { contains: query } },
        { description: { contains: query } },
      ];
    }

    const books = await db.bookGalleryItem.findMany({
      where: whereClause,
      orderBy: { publishedAt: "desc" },
    });

    return NextResponse.json({ books });
  } catch (error: any) {
    console.error("Gallery GET Error:", error);
    return NextResponse.json({ error: "Failed to load gallery books" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { action, bookId } = body;

    if (action === "like" && bookId) {
      const updated = await db.bookGalleryItem.update({
        where: { id: bookId },
        data: { likesCount: { increment: 1 } },
      });
      return NextResponse.json({ book: updated, message: "Liked book!" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Interaction failed" }, { status: 500 });
  }
}

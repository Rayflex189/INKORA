import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const totalUsers = await db.user.count();
    const totalProjects = await db.project.count();
    const totalChapters = await db.chapter.count();
    const galleryBooks = await db.bookGalleryItem.count();

    const allChapters = await db.chapter.findMany({ select: { wordCount: true } });
    const totalWordsWritten = allChapters.reduce((sum, c) => sum + (c.wordCount || 0), 0);

    const recentUsers = await db.user.findMany({
      select: { id: true, name: true, username: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    const recentProjects = await db.project.findMany({
      select: { id: true, title: true, type: true, category: true, authorName: true, currentWordCount: true, createdAt: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    return NextResponse.json({
      stats: {
        totalUsers,
        totalProjects,
        totalChapters,
        totalWordsWritten,
        galleryBooks,
      },
      recentUsers,
      recentProjects,
    });
  } catch (error) {
    return NextResponse.json({ error: "Admin request failed" }, { status: 500 });
  }
}

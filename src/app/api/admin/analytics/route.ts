import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(request.url);
  const range = searchParams.get("range") || "30D";

  try {
    const totalUsers = await db.user.count();
    const writersCount = await db.user.count({ where: { role: "WRITER" } });
    const readersCount = await db.user.count({ where: { role: "READER" } });
    const booksPublished = await db.bookGalleryItem.count();
    const projectsCreated = await db.project.count();
    const totalComments = await db.comment.count();

    // Mock trend chart data for visualization components
    const trendData = [
      { day: "Mon", registrations: 12, projects: 8, comments: 24, writingWords: 4500 },
      { day: "Tue", registrations: 18, projects: 14, comments: 38, writingWords: 7200 },
      { day: "Wed", registrations: 25, projects: 19, comments: 52, writingWords: 11000 },
      { day: "Thu", registrations: 31, projects: 22, comments: 64, writingWords: 14800 },
      { day: "Fri", registrations: 42, projects: 28, comments: 89, writingWords: 18900 },
      { day: "Sat", registrations: 55, projects: 35, comments: 112, writingWords: 24500 },
      { day: "Sun", registrations: 68, projects: 41, comments: 145, writingWords: 31000 },
    ];

    return NextResponse.json({
      metrics: {
        totalUsers,
        writersCount,
        readersCount,
        booksPublished,
        projectsCreated,
        totalComments,
      },
      trendData,
      range,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}

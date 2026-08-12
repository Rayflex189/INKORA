import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { logActivity } from "@/lib/audit";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");
  const chapterId = searchParams.get("chapterId");

  if (!projectId) {
    return NextResponse.json({ error: "Project ID required" }, { status: 400 });
  }

  try {
    const where: any = { projectId };
    if (chapterId) where.chapterId = chapterId;

    const comments = await db.comment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, name: true, username: true, avatar: true, role: true } },
      },
    });

    return NextResponse.json({ comments });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    const { projectId, chapterId, text } = await request.json();

    if (!projectId || !chapterId || !text) {
      return NextResponse.json({ error: "Project ID, Chapter ID, and comment text required" }, { status: 400 });
    }

    const project = await db.project.findUnique({
      where: { id: projectId },
      select: { allowComments: true },
    });

    if (project && !project.allowComments) {
      return NextResponse.json({ error: "Comments are disabled on this book by the author" }, { status: 403 });
    }

    const comment = await db.comment.create({
      data: {
        projectId,
        chapterId,
        userId: currentUser.id,
        text,
      },
      include: {
        user: { select: { id: true, name: true, username: true, avatar: true, role: true } },
      },
    });

    await logActivity({
      actorId: currentUser.id,
      actorRole: currentUser.role,
      action: "COMMENT_CREATED",
      targetType: "COMMENT",
      targetId: comment.id,
      projectId,
      details: `User left a comment on book chapter`,
    });

    return NextResponse.json({ success: true, comment });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}

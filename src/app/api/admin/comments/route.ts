import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { db } from "@/lib/db";
import { logActivity } from "@/lib/audit";

export async function GET() {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  try {
    const comments = await db.comment.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, name: true, username: true, email: true } },
        project: { select: { id: true, title: true, slug: true } },
        chapter: { select: { id: true, title: true } },
      },
    });

    return NextResponse.json({ comments });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  try {
    const { action, commentId } = await request.json();

    if (!commentId) {
      return NextResponse.json({ error: "Comment ID required" }, { status: 400 });
    }

    const comment = await db.comment.findUnique({
      where: { id: commentId },
      include: { user: { select: { username: true } } },
    });
    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    if (action === "delete") {
      await db.comment.delete({ where: { id: commentId } });
      await logActivity({
        actorId: auth.user.id,
        actorRole: "ADMIN",
        action: "COMMENT_REMOVED_BY_ADMIN",
        targetType: "COMMENT",
        targetId: commentId,
        details: `Admin removed comment by @${comment.user.username}: "${comment.text.substring(0, 50)}..."`,
      });
      return NextResponse.json({ success: true });
    }

    if (action === "toggle_flag") {
      const updated = await db.comment.update({
        where: { id: commentId },
        data: { isReported: !comment.isReported },
      });
      return NextResponse.json({ success: true, comment: updated });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Operation failed" }, { status: 500 });
  }
}

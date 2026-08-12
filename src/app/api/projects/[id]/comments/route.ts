import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const comments = await db.comment.findMany({
    where: { projectId: params.id },
    include: {
      user: { select: { id: true, name: true, username: true, avatar: true } },
      chapter: { select: { title: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ comments });
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { chapterId, selectedText, text } = body;

    if (!chapterId || !text) {
      return NextResponse.json({ error: "Chapter ID and comment text required" }, { status: 400 });
    }

    const comment = await db.comment.create({
      data: {
        projectId: params.id,
        chapterId,
        userId: currentUser.id,
        selectedText: selectedText || "",
        text,
      },
      include: {
        user: { select: { id: true, name: true, username: true, avatar: true } },
      },
    });

    return NextResponse.json({ comment });
  } catch (error) {
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}

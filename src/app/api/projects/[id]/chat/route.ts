import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    let conversation = await db.conversation.findFirst({
      where: { projectId: params.id, type: "PROJECT_TEAM" },
      include: {
        messages: {
          include: { sender: { select: { id: true, name: true, username: true, avatar: true } } },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!conversation) {
      conversation = await db.conversation.create({
        data: {
          name: "Project Team Chat",
          type: "PROJECT_TEAM",
          projectId: params.id,
        },
        include: {
          messages: {
            include: { sender: { select: { id: true, name: true, username: true, avatar: true } } },
          },
        },
      });
    }

    return NextResponse.json({ conversation });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch chat" }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { text, attachments } = body;

    let conversation = await db.conversation.findFirst({
      where: { projectId: params.id, type: "PROJECT_TEAM" },
    });

    if (!conversation) {
      conversation = await db.conversation.create({
        data: { name: "Project Team Chat", type: "PROJECT_TEAM", projectId: params.id },
      });
    }

    const message = await db.message.create({
      data: {
        conversationId: conversation.id,
        senderId: currentUser.id,
        text,
        attachments: attachments ? JSON.stringify(attachments) : null,
      },
      include: {
        sender: { select: { id: true, name: true, username: true, avatar: true } },
      },
    });

    return NextResponse.json({ message });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send chat message" }, { status: 500 });
  }
}

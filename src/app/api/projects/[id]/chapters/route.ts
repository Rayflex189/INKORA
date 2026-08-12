import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const chapters = await db.chapter.findMany({
      where: { projectId: params.id },
      orderBy: { orderIndex: "asc" },
    });
    return NextResponse.json({ chapters });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch chapters" }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { title, objective, summary, orderIndex } = body;

    const count = await db.chapter.count({ where: { projectId: params.id } });

    const newChapter = await db.chapter.create({
      data: {
        projectId: params.id,
        title: title || `Chapter ${count + 1}`,
        objective: objective || "",
        summary: summary || "",
        orderIndex: orderIndex !== undefined ? orderIndex : count + 1,
        content: `<h1>${title || `Chapter ${count + 1}`}</h1><p>Start writing chapter content...</p>`,
        wordCount: 5,
        status: "IN_PROGRESS",
      },
    });

    await db.activityLog.create({
      data: {
        projectId: params.id,
        userId: currentUser.id,
        action: "CHAPTER_CREATED",
        details: `Created chapter: ${newChapter.title}`,
      },
    });

    return NextResponse.json({ chapter: newChapter, message: "Chapter created" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create chapter" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { chapterId, title, content, objective, summary, status } = body;

    if (!chapterId) return NextResponse.json({ error: "chapterId is required" }, { status: 400 });

    // Calculate word count from content HTML/text
    const plainText = content ? content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "";
    const wordCount = plainText ? plainText.split(" ").filter(Boolean).length : 0;

    const updatedChapter = await db.chapter.update({
      where: { id: chapterId },
      data: {
        title: title !== undefined ? title : undefined,
        content: content !== undefined ? content : undefined,
        objective: objective !== undefined ? objective : undefined,
        summary: summary !== undefined ? summary : undefined,
        status: status !== undefined ? status : undefined,
        wordCount,
      },
    });

    // Recalculate total project word count
    const allChapters = await db.chapter.findMany({
      where: { projectId: params.id },
      select: { wordCount: true },
    });
    const totalWords = allChapters.reduce((sum, c) => sum + (c.wordCount || 0), 0);

    await db.project.update({
      where: { id: params.id },
      data: { currentWordCount: totalWords },
    });

    // Record autosave / revision snapshot if significant change
    if (body.createDraftSnapshot) {
      await db.draftVersion.create({
        data: {
          projectId: params.id,
          chapterId,
          title: `Revision - ${new Date().toLocaleTimeString()}`,
          content: updatedChapter.content,
          changeSummary: body.changeSummary || "Autosave revision",
          authorId: currentUser.id,
        },
      });
    }

    return NextResponse.json({
      chapter: updatedChapter,
      totalProjectWords: totalWords,
      message: "Chapter saved successfully",
    });
  } catch (error: any) {
    console.error("Chapter PUT error:", error);
    return NextResponse.json({ error: "Failed to update chapter" }, { status: 500 });
  }
}

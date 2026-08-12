import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { processAIRequest } from "@/lib/ai-engine";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { projectId, action, subAction, text, prompt, chapterTitle } = body;

    let projectContext: any = null;

    if (projectId) {
      const project = await db.project.findUnique({
        where: { id: projectId },
        include: {
          characters: { select: { name: true, age: true, role: true, appearance: true, personality: true } },
          locations: { select: { name: true, description: true } },
        },
      });

      if (project) {
        projectContext = {
          title: project.title,
          genre: project.genre || "Fiction",
          tone: project.tone || "Atmospheric",
          premise: project.premise || "",
          characters: project.characters,
          locations: project.locations,
          chapterTitle,
        };
      }
    }

    const aiResult = await processAIRequest({
      action,
      subAction,
      text,
      prompt,
      projectContext,
    });

    return NextResponse.json({ result: aiResult });
  } catch (error: any) {
    console.error("AI Assistant Error:", error);
    return NextResponse.json({ error: "AI Assistant failed to generate response" }, { status: 500 });
  }
}

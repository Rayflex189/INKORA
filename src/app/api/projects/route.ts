import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { generateProjectBlueprint } from "@/lib/blueprint-engine";

export async function GET(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter") || "all"; // all, mine, shared, books, academic, screenplays

    let whereClause: any = {
      OR: [
        { ownerId: currentUser.id },
        { members: { some: { userId: currentUser.id } } },
      ],
    };

    if (filter === "mine") {
      whereClause = { ownerId: currentUser.id };
    } else if (filter === "shared") {
      whereClause = {
        ownerId: { not: currentUser.id },
        members: { some: { userId: currentUser.id } },
      };
    } else if (filter === "books") {
      whereClause.category = "Books";
    } else if (filter === "academic") {
      whereClause.category = "Academic";
    }

    const projects = await db.project.findMany({
      where: whereClause,
      include: {
        owner: { select: { id: true, name: true, username: true, avatar: true } },
        members: { select: { userId: true, role: true } },
        chapters: { select: { id: true, wordCount: true } },
        _count: { select: { chapters: true, characters: true, researchItems: true } },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ projects });
  } catch (error: any) {
    console.error("Projects GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      subtitle,
      authorName,
      category,
      type,
      genre,
      subgenre,
      targetAudience,
      ageGroup,
      wordCountTarget,
      storyIdea,
      mainCharacter,
      storyDriver,
      structureTemplate,
      visibility,
      allowCollaborators,
      customBlueprint,
    } = body;

    if (!title || !category || !type) {
      return NextResponse.json({ error: "Title, category, and type are required" }, { status: 400 });
    }

    // Generate blueprint if customBlueprint isn't provided
    const blueprint = customBlueprint || generateProjectBlueprint({
      type,
      title,
      genre,
      storyIdea,
      mainCharacter,
      storyDriver,
      template: structureTemplate,
    });

    const project = await db.project.create({
      data: {
        title,
        subtitle: subtitle || "",
        authorName: authorName || currentUser.name,
        ownerId: currentUser.id,
        category,
        type,
        genre: genre || "General",
        subgenre: subgenre || "",
        targetAudience: targetAudience || "",
        ageGroup: ageGroup || "",
        wordCountTarget: wordCountTarget ? parseInt(wordCountTarget) : 50000,
        currentWordCount: 0,
        status: "IN_PROGRESS",
        visibility: visibility || "PRIVATE",
        allowCollaborators: Boolean(allowCollaborators),
        premise: blueprint.premise,
        logline: blueprint.logline,
        concept: blueprint.concept,
        theme: blueprint.theme,
        tone: blueprint.tone,
        structureTemplate: structureTemplate || "Three Act Structure",
        coverImage: `https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=600`,
        members: {
          create: [{ userId: currentUser.id, role: "OWNER" }],
        },
        chapters: {
          create: blueprint.chapters.map((ch: any) => ({
            title: ch.title,
            objective: ch.objective,
            summary: ch.summary,
            orderIndex: ch.orderIndex,
            content: `<h1>${ch.title}</h1><p>Start writing your chapter here...</p>`,
            wordCount: 10,
            status: "IN_PROGRESS",
          })),
        },
        characters: {
          create: blueprint.characters.map((c: any) => ({
            name: c.name,
            role: c.role,
            appearance: c.appearance,
            personality: c.personality,
            background: c.background,
            arc: c.arc,
          })),
        },
        locations: {
          create: blueprint.locations.map((l: any) => ({
            name: l.name,
            description: l.description,
            significance: l.significance,
          })),
        },
        timelineEvents: {
          create: blueprint.timelineEvents.map((t: any) => ({
            title: t.title,
            description: t.description,
            dateString: t.dateString,
            orderIndex: t.orderIndex,
          })),
        },
        researchFolders: {
          create: blueprint.researchFolders.map((f: string) => ({ name: f })),
        },
        activityLogs: {
          create: {
            userId: currentUser.id,
            action: "PROJECT_CREATED",
            details: `Created project ${title} (${type})`,
          },
        },
      },
      include: {
        chapters: true,
        characters: true,
      },
    });

    return NextResponse.json({ project, message: "Project created successfully" });
  } catch (error: any) {
    console.error("Project Create Error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const project = await db.project.findUnique({
      where: { id: params.id },
      include: {
        owner: { select: { id: true, name: true, username: true, avatar: true } },
        members: {
          include: {
            user: { select: { id: true, name: true, username: true, avatar: true, bio: true } },
          },
        },
        chapters: { orderBy: { orderIndex: "asc" } },
        characters: true,
        locations: true,
        timelineEvents: { orderBy: { orderIndex: "asc" } },
        researchFolders: { include: { items: true } },
        researchItems: true,
        notes: { orderBy: { updatedAt: "desc" } },
        draftVersions: { orderBy: { createdAt: "desc" } },
        tasks: { include: { assignedTo: { select: { id: true, name: true, username: true } } } },
        activityLogs: {
          include: { user: { select: { name: true, username: true } } },
          orderBy: { createdAt: "desc" },
          take: 20,
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Permission check
    const isOwner = project.ownerId === currentUser.id;
    const member = project.members.find((m) => m.userId === currentUser.id);

    if (!isOwner && !member && project.visibility === "PRIVATE") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    return NextResponse.json({
      project,
      userRole: isOwner ? "OWNER" : member?.role || "VIEWER",
    });
  } catch (error: any) {
    console.error("Project GET [id] Error:", error);
    return NextResponse.json({ error: "Failed to load project" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const project = await db.project.findUnique({ where: { id: params.id } });
    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

    if (project.ownerId !== currentUser.id) {
      return NextResponse.json({ error: "Only the project owner can modify settings" }, { status: 403 });
    }

    const updated = await db.project.update({
      where: { id: params.id },
      data: {
        title: body.title !== undefined ? body.title : project.title,
        subtitle: body.subtitle !== undefined ? body.subtitle : project.subtitle,
        premise: body.premise !== undefined ? body.premise : project.premise,
        logline: body.logline !== undefined ? body.logline : project.logline,
        theme: body.theme !== undefined ? body.theme : project.theme,
        tone: body.tone !== undefined ? body.tone : project.tone,
        visibility: body.visibility !== undefined ? body.visibility : project.visibility,
        allowCollaborators: body.allowCollaborators !== undefined ? body.allowCollaborators : project.allowCollaborators,
        wordCountTarget: body.wordCountTarget !== undefined ? body.wordCountTarget : project.wordCountTarget,
      },
    });

    return NextResponse.json({ project: updated, message: "Settings updated" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const project = await db.project.findUnique({ where: { id: params.id } });
    if (!project || project.ownerId !== currentUser.id) {
      return NextResponse.json({ error: "Access denied or project not found" }, { status: 403 });
    }

    await db.project.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}

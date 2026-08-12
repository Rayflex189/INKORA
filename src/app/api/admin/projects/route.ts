import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { db } from "@/lib/db";
import { logActivity } from "@/lib/audit";

export async function GET(request: Request) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.toLowerCase();

  try {
    const where: any = {};
    if (query) {
      where.OR = [
        { title: { contains: query } },
        { authorName: { contains: query } },
        { genre: { contains: query } },
      ];
    }

    const projects = await db.project.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        authorName: true,
        type: true,
        category: true,
        genre: true,
        status: true,
        visibility: true,
        currentWordCount: true,
        isFeatured: true,
        createdAt: true,
        updatedAt: true,
        owner: { select: { id: true, name: true, username: true } },
        _count: { select: { members: true, chapters: true, comments: true } },
      },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  try {
    const { action, projectId } = await request.json();

    if (!projectId) {
      return NextResponse.json({ error: "Project ID required" }, { status: 400 });
    }

    const project = await db.project.findUnique({ where: { id: projectId } });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (action === "archive") {
      const updated = await db.project.update({
        where: { id: projectId },
        data: { status: "ARCHIVED" },
      });
      await logActivity({
        actorId: auth.user.id,
        actorRole: "ADMIN",
        action: "PROJECT_ARCHIVED",
        targetType: "PROJECT",
        targetId: projectId,
        details: `Admin archived project "${project.title}"`,
      });
      return NextResponse.json({ success: true, project: updated });
    }

    if (action === "delete") {
      await db.project.delete({ where: { id: projectId } });
      await logActivity({
        actorId: auth.user.id,
        actorRole: "ADMIN",
        action: "PROJECT_REMOVED",
        targetType: "PROJECT",
        targetId: projectId,
        details: `Admin removed violating project "${project.title}"`,
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Operation failed" }, { status: 500 });
  }
}

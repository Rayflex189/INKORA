import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { db } from "@/lib/db";
import { logActivity } from "@/lib/audit";

export async function GET(request: Request) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");
  const query = searchParams.get("query")?.toLowerCase();

  try {
    const where: any = {};
    if (role && role !== "ALL") where.role = role;
    if (query) {
      where.OR = [
        { name: { contains: query } },
        { username: { contains: query } },
        { email: { contains: query } },
      ];
    }

    const users = await db.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        status: true,
        isFeatured: true,
        createdAt: true,
        lastActive: true,
        _count: {
          select: {
            projects: true,
            comments: true,
          },
        },
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const { action, userId, role, status } = body;

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const targetUser = await db.user.findUnique({ where: { id: userId } });
    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (action === "suspend") {
      const updated = await db.user.update({
        where: { id: userId },
        data: { status: "SUSPENDED" },
      });
      await logActivity({
        actorId: auth.user.id,
        actorRole: "ADMIN",
        action: "USER_SUSPENDED",
        targetType: "USER",
        targetId: userId,
        details: `Admin suspended user @${targetUser.username}`,
      });
      return NextResponse.json({ success: true, user: updated });
    }

    if (action === "reactivate") {
      const updated = await db.user.update({
        where: { id: userId },
        data: { status: "ACTIVE" },
      });
      await logActivity({
        actorId: auth.user.id,
        actorRole: "ADMIN",
        action: "USER_REACTIVATED",
        targetType: "USER",
        targetId: userId,
        details: `Admin reactivated user @${targetUser.username}`,
      });
      return NextResponse.json({ success: true, user: updated });
    }

    if (action === "change_role" && role) {
      const updated = await db.user.update({
        where: { id: userId },
        data: { role },
      });
      await logActivity({
        actorId: auth.user.id,
        actorRole: "ADMIN",
        action: "USER_ROLE_CHANGED",
        targetType: "USER",
        targetId: userId,
        details: `Admin changed role of @${targetUser.username} to ${role}`,
      });
      return NextResponse.json({ success: true, user: updated });
    }

    if (action === "feature_writer") {
      const updated = await db.user.update({
        where: { id: userId },
        data: { isFeatured: !targetUser.isFeatured },
      });
      await logActivity({
        actorId: auth.user.id,
        actorRole: "ADMIN",
        action: updated.isFeatured ? "WRITER_FEATURED" : "WRITER_UNFEATURED",
        targetType: "USER",
        targetId: userId,
        details: `Admin ${updated.isFeatured ? "featured" : "unfeatured"} writer @${targetUser.username}`,
      });
      return NextResponse.json({ success: true, user: updated });
    }

    if (action === "delete") {
      await db.user.delete({ where: { id: userId } });
      await logActivity({
        actorId: auth.user.id,
        actorRole: "ADMIN",
        action: "USER_DELETED",
        targetType: "USER",
        targetId: userId,
        details: `Admin deleted user @${targetUser.username}`,
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Operation failed" }, { status: 500 });
  }
}

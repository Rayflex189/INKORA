import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { db } from "@/lib/db";
import { comparePassword, hashPassword } from "@/lib/auth";
import { logActivity } from "@/lib/audit";

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  try {
    const { username, currentPassword, newPassword } = await request.json();

    const adminUser = await db.user.findUnique({ where: { id: auth.user.id } });
    if (!adminUser) {
      return NextResponse.json({ error: "Admin user not found" }, { status: 404 });
    }

    const updates: any = {};

    if (username && username !== adminUser.username) {
      const existing = await db.user.findUnique({ where: { username } });
      if (existing) {
        return NextResponse.json({ error: "Username already taken" }, { status: 400 });
      }
      updates.username = username;
    }

    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: "Current password required to change password" }, { status: 400 });
      }
      const isValid = await comparePassword(currentPassword, adminUser.passwordHash);
      if (!isValid) {
        return NextResponse.json({ error: "Current password incorrect" }, { status: 400 });
      }
      updates.passwordHash = await hashPassword(newPassword);
      updates.mustChangePassword = false;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ message: "No updates requested" });
    }

    const updatedUser = await db.user.update({
      where: { id: auth.user.id },
      data: updates,
    });

    await logActivity({
      actorId: auth.user.id,
      actorRole: "ADMIN",
      action: "ADMIN_PROFILE_UPDATED",
      targetType: "USER",
      targetId: auth.user.id,
      details: `Administrator profile updated. Password changed: ${!!newPassword}`,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        mustChangePassword: updatedUser.mustChangePassword,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update admin profile" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { logActivity } from "@/lib/audit";

export async function POST() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    const updatedUser = await db.user.update({
      where: { id: currentUser.id },
      data: { role: "WRITER" },
    });

    await logActivity({
      actorId: currentUser.id,
      actorRole: "WRITER",
      action: "READER_UPGRADED_TO_WRITER",
      targetType: "USER",
      targetId: currentUser.id,
      details: `User @${currentUser.username} activated writer functionality`,
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    return NextResponse.json({ error: "Failed to upgrade account" }, { status: 500 });
  }
}

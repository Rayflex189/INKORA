import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { logActivity } from "@/lib/audit";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Authentication required to submit reports" }, { status: 401 });
  }

  try {
    const { targetType, targetId, reason, description } = await request.json();

    if (!targetType || !targetId || !reason) {
      return NextResponse.json({ error: "Target type, ID, and reason are required" }, { status: 400 });
    }

    const report = await db.report.create({
      data: {
        reporterId: currentUser.id,
        targetType,
        targetId,
        reason,
        description: description || null,
        status: "PENDING",
      },
    });

    // If reporting a comment, mark comment flag
    if (targetType === "COMMENT") {
      await db.comment.update({
        where: { id: targetId },
        data: { isReported: true },
      }).catch(() => {});
    }

    await logActivity({
      actorId: currentUser.id,
      actorRole: currentUser.role,
      action: "REPORT_SUBMITTED",
      targetType,
      targetId,
      details: `User submitted report for ${targetType} (Reason: ${reason})`,
    });

    return NextResponse.json({ success: true, report });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit report" }, { status: 500 });
  }
}

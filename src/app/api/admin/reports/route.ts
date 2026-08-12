import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { db } from "@/lib/db";
import { logActivity } from "@/lib/audit";

export async function GET() {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  try {
    const reports = await db.report.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        reporter: {
          select: { id: true, name: true, username: true },
        },
        resolvedBy: {
          select: { id: true, name: true, username: true },
        },
      },
    });

    return NextResponse.json({ reports });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  try {
    const { reportId, status, resolutionNotes, actionOnContent } = await request.json();

    if (!reportId || !status) {
      return NextResponse.json({ error: "Report ID and status required" }, { status: 400 });
    }

    const report = await db.report.findUnique({ where: { id: reportId } });
    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    // Execute content moderation action if specified
    if (actionOnContent === "remove_comment" && report.targetType === "COMMENT") {
      await db.comment.delete({ where: { id: report.targetId } }).catch(() => {});
    }

    if (actionOnContent === "unpublish_book" && report.targetType === "BOOK") {
      await db.bookGalleryItem.update({
        where: { id: report.targetId },
        data: { visibility: "UNLISTED" },
      }).catch(() => {});
    }

    const updated = await db.report.update({
      where: { id: reportId },
      data: {
        status,
        resolutionNotes: resolutionNotes || null,
        resolvedById: auth.user.id,
      },
    });

    await logActivity({
      actorId: auth.user.id,
      actorRole: "ADMIN",
      action: "REPORT_MODERATED",
      targetType: report.targetType,
      targetId: report.targetId,
      details: `Admin set report ${reportId} status to ${status}. Action: ${actionOnContent || "none"}`,
    });

    return NextResponse.json({ success: true, report: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update report" }, { status: 500 });
  }
}

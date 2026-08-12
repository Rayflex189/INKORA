import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const members = await db.projectMember.findMany({
      where: { projectId: params.id },
      include: {
        user: { select: { id: true, name: true, username: true, avatar: true, bio: true, genres: true } },
      },
    });

    const invites = await db.projectInvite.findMany({
      where: { projectId: params.id, status: "PENDING" },
    });

    const requests = await db.projectRequest.findMany({
      where: { projectId: params.id, status: "PENDING" },
      include: {
        user: { select: { id: true, name: true, username: true, avatar: true, bio: true } },
      },
    });

    return NextResponse.json({ members, invites, requests });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch collaboration details" }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { action, username, role, requestId, requestAction } = body;

    // Action 1: Owner invites user by username
    if (action === "invite") {
      const targetUser = await db.user.findUnique({ where: { username } });
      if (!targetUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

      // Check if already a member
      const existingMember = await db.projectMember.findUnique({
        where: { projectId_userId: { projectId: params.id, userId: targetUser.id } },
      });
      if (existingMember) return NextResponse.json({ error: "User is already a member" }, { status: 400 });

      const newMember = await db.projectMember.create({
        data: {
          projectId: params.id,
          userId: targetUser.id,
          role: role || "CO_AUTHOR",
        },
        include: { user: { select: { id: true, name: true, username: true, avatar: true } } },
      });

      await db.activityLog.create({
        data: {
          projectId: params.id,
          userId: currentUser.id,
          action: "MEMBER_ADDED",
          details: `Added ${targetUser.name} as ${role || "CO_AUTHOR"}`,
        },
      });

      return NextResponse.json({ member: newMember, message: "Collaborator added successfully" });
    }

    // Action 2: User requests to join project
    if (action === "request_join") {
      const existingReq = await db.projectRequest.findFirst({
        where: { projectId: params.id, userId: currentUser.id, status: "PENDING" },
      });
      if (existingReq) return NextResponse.json({ error: "Join request already pending" }, { status: 400 });

      const request = await db.projectRequest.create({
        data: {
          projectId: params.id,
          userId: currentUser.id,
          message: body.message || "I would love to contribute to this project.",
        },
      });

      return NextResponse.json({ request, message: "Join request sent to project owner" });
    }

    // Action 3: Owner accepts or declines join request
    if (action === "handle_request" && requestId) {
      const reqRecord = await db.projectRequest.findUnique({ where: { id: requestId } });
      if (!reqRecord) return NextResponse.json({ error: "Request not found" }, { status: 404 });

      if (requestAction === "accept") {
        await db.projectRequest.update({
          where: { id: requestId },
          data: { status: "ACCEPTED" },
        });

        await db.projectMember.create({
          data: {
            projectId: params.id,
            userId: reqRecord.userId,
            role: "CONTRIBUTOR",
          },
        });
      } else {
        await db.projectRequest.update({
          where: { id: requestId },
          data: { status: "DECLINED" },
        });
      }

      return NextResponse.json({ message: `Request ${requestAction}ed` });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: "Collaboration action failed" }, { status: 500 });
  }
}

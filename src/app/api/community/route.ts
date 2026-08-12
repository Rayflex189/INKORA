import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const userId = searchParams.get("userId");

    if (userId) {
      const user = await db.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
          bio: true,
          genres: true,
          interests: true,
          createdAt: true,
          projects: {
            where: { visibility: "OPEN" },
            select: { id: true, title: true, type: true, genre: true, coverImage: true },
          },
          _count: {
            select: { followers: true, following: true, projects: true },
          },
        },
      });
      return NextResponse.json({ user });
    }

    let whereClause: any = {};
    if (query) {
      whereClause = {
        OR: [
          { name: { contains: query } },
          { username: { contains: query } },
          { genres: { contains: query } },
        ],
      };
    }

    const writers = await db.user.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        username: true,
        avatar: true,
        bio: true,
        genres: true,
        _count: { select: { followers: true, projects: true } },
      },
      take: 30,
    });

    return NextResponse.json({ writers });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch community writers" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { action, targetUserId } = body;

    if (action === "follow" && targetUserId) {
      if (targetUserId === currentUser.id) {
        return NextResponse.json({ error: "Cannot follow yourself" }, { status: 400 });
      }

      const existing = await db.follower.findUnique({
        where: { followerId_followingId: { followerId: currentUser.id, followingId: targetUserId } },
      });

      if (existing) {
        await db.follower.delete({
          where: { id: existing.id },
        });
        return NextResponse.json({ following: false, message: "Unfollowed writer" });
      } else {
        await db.follower.create({
          data: { followerId: currentUser.id, followingId: targetUserId },
        });
        return NextResponse.json({ following: true, message: "Following writer" });
      }
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Community action failed" }, { status: 500 });
  }
}

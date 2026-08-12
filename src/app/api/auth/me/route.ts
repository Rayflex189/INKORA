import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ user: null });
  }

  const fullUser = await db.user.findUnique({
    where: { id: currentUser.id },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      avatar: true,
      bio: true,
      genres: true,
      interests: true,
      role: true,
      createdAt: true,
      profile: true,
    },
  });

  return NextResponse.json({ user: fullUser });
}

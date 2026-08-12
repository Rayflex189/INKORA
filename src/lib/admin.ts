import { getCurrentUser, SessionUser } from "./auth";
import { db } from "./db";
import { NextResponse } from "next/server";

export async function requireAdminServer(): Promise<{ user: SessionUser } | null> {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN" || user.status === "SUSPENDED") {
    return null;
  }
  return { user };
}

export async function requireAdminApi(): Promise<{ user: SessionUser } | NextResponse> {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  // Independent server-side check against database
  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: { id: true, role: true, status: true },
  });

  if (!dbUser || dbUser.role !== "ADMIN" || dbUser.status === "SUSPENDED") {
    return NextResponse.json({ error: "Forbidden: Administrator privileges required" }, { status: 403 });
  }

  return { user };
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comparePassword, signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { login, password } = body; // login can be email or username

    if (!login || !password) {
      return NextResponse.json({ error: "Missing login or password" }, { status: 400 });
    }

    const user = await db.user.findFirst({
      where: { OR: [{ email: login }, { username: login }] },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const sessionUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      role: user.role,
    };

    const token = signToken(sessionUser);

    const response = NextResponse.json({ user: sessionUser, message: "Login successful" });
    response.cookies.set("inkora_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Server login error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, name, password, genres, bio } = body;

    if (!email || !username || !name || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await db.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email or username already registered" }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);

    const user = await db.user.create({
      data: {
        email,
        username,
        name,
        passwordHash,
        bio: bio || "",
        genres: genres || "",
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`,
        profile: {
          create: {
            publicVisibility: "PUBLIC",
            allowMessages: true,
            allowInvites: true,
            allowCollaboration: true,
          },
        },
      },
      select: { id: true, email: true, username: true, name: true, role: true },
    });

    const token = signToken(user);

    const response = NextResponse.json({ user, message: "Registration successful" });
    response.cookies.set("inkora_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: "Server registration failed" }, { status: 500 });
  }
}

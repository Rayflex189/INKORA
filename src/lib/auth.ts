import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { db } from "./db";

const JWT_SECRET = process.env.JWT_SECRET || "inkora-secret-key-super-secure-jwt";

export interface SessionUser {
  id: string;
  email: string;
  username: string;
  name: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(user: SessionUser): string {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyToken(token: string): SessionUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionUser;
  } catch (error) {
    return null;
  }
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = cookies();
  const token = cookieStore.get("inkora_token")?.value;
  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded) return null;

  // Optionally verify user exists in DB
  const user = await db.user.findUnique({
    where: { id: decoded.id },
    select: { id: true, email: true, username: true, name: true, role: true },
  });

  return user;
}

import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const characters = await db.character.findMany({
    where: { projectId: params.id },
    orderBy: { name: "asc" },
  });
  return NextResponse.json({ characters });
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const character = await db.character.create({
      data: {
        projectId: params.id,
        name: body.name || "New Character",
        age: body.age || "",
        role: body.role || "Supporting",
        appearance: body.appearance || "",
        personality: body.personality || "",
        background: body.background || "",
        arc: body.arc || "",
        strengths: body.strengths || "",
        weaknesses: body.weaknesses || "",
        goals: body.goals || "",
        motivations: body.motivations || "",
        fears: body.fears || "",
        secrets: body.secrets || "",
        relationships: body.relationships || "",
      },
    });

    return NextResponse.json({ character, message: "Character created" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create character" }, { status: 500 });
  }
}

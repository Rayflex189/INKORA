import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { db } from "@/lib/db";
import { logActivity } from "@/lib/audit";

export async function GET() {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  try {
    const settingsList = await db.systemSettings.findMany();
    const settings: Record<string, any> = {};
    for (const item of settingsList) {
      try {
        settings[item.key] = JSON.parse(item.value);
      } catch (e) {
        settings[item.key] = item.value;
      }
    }

    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  try {
    const { key, value } = await request.json();

    if (!key) {
      return NextResponse.json({ error: "Key is required" }, { status: 400 });
    }

    const valueStr = JSON.stringify(value);
    await db.systemSettings.upsert({
      where: { key },
      update: { value: valueStr },
      create: { key, value: valueStr },
    });

    await logActivity({
      actorId: auth.user.id,
      actorRole: "ADMIN",
      action: "SETTINGS_CHANGED",
      targetType: "SYSTEM",
      details: `Admin updated system setting '${key}' to ${valueStr}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update setting" }, { status: 500 });
  }
}

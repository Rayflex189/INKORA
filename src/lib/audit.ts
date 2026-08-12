import { db } from "./db";

export interface LogActivityParams {
  actorId?: string;
  actorRole?: string;
  action: string;
  targetType?: string;
  targetId?: string;
  details?: string;
  projectId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

export async function logActivity(params: LogActivityParams) {
  try {
    await db.activityLog.create({
      data: {
        actorId: params.actorId || null,
        actorRole: params.actorRole || null,
        action: params.action,
        targetType: params.targetType || null,
        targetId: params.targetId || null,
        details: params.details || null,
        projectId: params.projectId || null,
        userId: params.actorId || null,
        ipAddress: params.ipAddress || null,
        userAgent: params.userAgent || null,
        metadata: params.metadata ? JSON.stringify(params.metadata) : null,
      },
    });
  } catch (error) {
    console.error("Failed to write activity log:", error);
  }
}

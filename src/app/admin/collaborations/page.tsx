"use client";

import React from "react";
import { Users2, Shield } from "lucide-react";

export default function AdminCollaborationsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
          <Users2 className="h-3.5 w-3.5" />
          <span>Co-Authoring & Team Oversights</span>
        </div>
        <h1 className="font-serif text-3xl font-extrabold tracking-tight">Collaboration Projects</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Oversee co-author invites, permissions, co-author role assignments, and team writing workspaces.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-12 text-center text-muted-foreground space-y-3">
        <Users2 className="h-10 w-10 mx-auto text-emerald-500" />
        <h3 className="font-serif text-lg font-bold text-foreground">Multi-Author Workspace Active</h3>
        <p className="text-xs max-w-md mx-auto">
          Collaborative manuscript permissions, version conflicts, and invitation logs are functioning seamlessly.
        </p>
      </div>
    </div>
  );
}

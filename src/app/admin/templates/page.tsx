"use client";

import React from "react";
import { Copy, Layers } from "lucide-react";

export default function AdminTemplatesPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-600 dark:text-purple-400 mb-2">
          <Copy className="h-3.5 w-3.5" />
          <span>Structure Skeletons</span>
        </div>
        <h1 className="font-serif text-3xl font-extrabold tracking-tight">Writing Blueprint Templates</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage system story skeletons (Three Act Structure, Hero's Journey, Save the Cat, Fichtean Curve, etc.).
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-8 text-center text-muted-foreground space-y-2">
        <Layers className="h-10 w-10 mx-auto text-purple-500" />
        <h3 className="font-serif text-lg font-bold text-foreground">40+ Structural Blueprints Active</h3>
        <p className="text-xs">Novel, Screenplay, Poetry, and Academic structural skeletons available for writers.</p>
      </div>
    </div>
  );
}

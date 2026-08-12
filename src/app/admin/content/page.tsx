"use client";

import React from "react";
import { FileText, Sparkles, Star } from "lucide-react";

export default function AdminContentPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
          <FileText className="h-3.5 w-3.5" />
          <span>Curated Platform Content</span>
        </div>
        <h1 className="font-serif text-3xl font-extrabold tracking-tight">Content & Featured System</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage featured books, featured writers, announcements, and homepage highlights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-border bg-card p-6 space-y-4">
          <h3 className="font-serif text-xl font-bold flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
            <span>Featured Writers</span>
          </h3>
          <p className="text-xs text-muted-foreground">
            Featured writers are highlighted on the public homepage and book gallery showcase.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 space-y-4">
          <h3 className="font-serif text-xl font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-500" />
            <span>Featured Manuscripts</span>
          </h3>
          <p className="text-xs text-muted-foreground">
            Featured books receive prominent hero positioning and enhanced discovery visibility.
          </p>
        </div>
      </div>
    </div>
  );
}

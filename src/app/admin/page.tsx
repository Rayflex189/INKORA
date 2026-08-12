import React from "react";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Shield, Users, BookOpen, FileText, Layers, Compass, BarChart3 } from "lucide-react";

export default async function AdminPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const totalUsers = await db.user.count();
  const totalProjects = await db.project.count();
  const totalChapters = await db.chapter.count();
  const galleryBooks = await db.bookGalleryItem.count();

  const allChapters = await db.chapter.findMany({ select: { wordCount: true } });
  const totalWordsWritten = allChapters.reduce((sum, c) => sum + (c.wordCount || 0), 0);

  const recentUsers = await db.user.findMany({
    select: { id: true, name: true, username: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const recentProjects = await db.project.findMany({
    select: { id: true, title: true, type: true, category: true, authorName: true, currentWordCount: true, createdAt: true },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border pb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
          <Shield className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-serif text-3xl font-extrabold">INKORA System Admin Studio</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Platform overview, user management, and system stats.</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
          <span className="text-xs font-bold text-muted-foreground uppercase">Total Users</span>
          <p className="text-3xl font-extrabold font-serif text-primary mt-1">{totalUsers}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
          <span className="text-xs font-bold text-muted-foreground uppercase">Total Projects</span>
          <p className="text-3xl font-extrabold font-serif text-indigo-600 dark:text-indigo-400 mt-1">{totalProjects}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
          <span className="text-xs font-bold text-muted-foreground uppercase">Total Chapters</span>
          <p className="text-3xl font-extrabold font-serif text-amber-600 dark:text-amber-400 mt-1">{totalChapters}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
          <span className="text-xs font-bold text-muted-foreground uppercase">Words Written</span>
          <p className="text-3xl font-extrabold font-serif text-emerald-600 dark:text-emerald-400 mt-1">{totalWordsWritten.toLocaleString()}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
          <span className="text-xs font-bold text-muted-foreground uppercase">Gallery Books</span>
          <p className="text-3xl font-extrabold font-serif text-blue-600 dark:text-blue-400 mt-1">{galleryBooks}</p>
        </div>
      </div>

      {/* Lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Users */}
        <div className="rounded-3xl border border-border bg-card p-6 space-y-4 shadow-xs">
          <h3 className="font-serif text-xl font-bold border-b border-border pb-3">Registered Users</h3>
          <div className="space-y-3">
            {recentUsers.map((u) => (
              <div key={u.id} className="flex items-center justify-between rounded-2xl border border-border p-3 text-xs bg-muted/20">
                <div>
                  <div className="font-bold">{u.name}</div>
                  <div className="text-muted-foreground">@{u.username} • {u.email}</div>
                </div>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-bold text-primary">{u.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="rounded-3xl border border-border bg-card p-6 space-y-4 shadow-xs">
          <h3 className="font-serif text-xl font-bold border-b border-border pb-3">System Projects</h3>
          <div className="space-y-3">
            {recentProjects.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-2xl border border-border p-3 text-xs bg-muted/20">
                <div>
                  <span className="font-bold text-primary uppercase text-[10px]">{p.type}</span>
                  <div className="font-bold text-sm">{p.title}</div>
                  <div className="text-muted-foreground">By {p.authorName}</div>
                </div>
                <span className="font-bold">{p.currentWordCount.toLocaleString()} words</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

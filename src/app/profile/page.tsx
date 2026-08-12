import React from "react";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { User, BookOpen, Layers, CheckCircle2, Feather, Sparkles, Award } from "lucide-react";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const fullUser = await db.user.findUnique({
    where: { id: user.id },
    include: {
      projects: { select: { id: true, title: true, type: true, currentWordCount: true, status: true } },
      _count: { select: { projects: true, followers: true, following: true } },
    },
  });

  if (!fullUser) redirect("/login");

  const totalWords = fullUser.projects.reduce((sum, p) => sum + (p.currentWordCount || 0), 0);
  const completedCount = fullUser.projects.filter((p) => p.status === "COMPLETED").length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Profile Card */}
      <div className="rounded-3xl border border-border bg-card p-8 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <img
            src={fullUser.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${fullUser.username}`}
            alt={fullUser.name}
            className="h-24 w-24 rounded-full object-cover bg-primary/10 border-2 border-primary/20 shadow-md"
          />

          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2">
              <div>
                <h1 className="font-serif text-3xl font-extrabold">{fullUser.name}</h1>
                <p className="text-sm text-muted-foreground font-semibold">@{fullUser.username}</p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                {fullUser.role === "ADMIN" ? "Administrator" : "Verified Author"}
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
              {fullUser.bio || "No biography added yet."}
            </p>

            {fullUser.genres && (
              <div className="pt-1 flex flex-wrap gap-1.5 justify-center sm:justify-start">
                {fullUser.genres.split(",").map((g, i) => (
                  <span key={i} className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground">
                    {g.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Writing Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-border pt-6">
          <div className="rounded-2xl border border-border p-4 bg-muted/20 text-center">
            <span className="text-xs font-bold text-muted-foreground uppercase">Projects</span>
            <p className="text-2xl font-extrabold font-serif mt-1">{fullUser._count.projects}</p>
          </div>
          <div className="rounded-2xl border border-border p-4 bg-muted/20 text-center">
            <span className="text-xs font-bold text-muted-foreground uppercase">Completed</span>
            <p className="text-2xl font-extrabold font-serif text-emerald-600 dark:text-emerald-400 mt-1">{completedCount}</p>
          </div>
          <div className="rounded-2xl border border-border p-4 bg-muted/20 text-center">
            <span className="text-xs font-bold text-muted-foreground uppercase">Total Words</span>
            <p className="text-2xl font-extrabold font-serif text-primary mt-1">{totalWords.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl border border-border p-4 bg-muted/20 text-center">
            <span className="text-xs font-bold text-muted-foreground uppercase">Followers</span>
            <p className="text-2xl font-extrabold font-serif mt-1">{fullUser._count.followers}</p>
          </div>
        </div>
      </div>

      {/* Projects Overview */}
      <div className="space-y-4">
        <h2 className="font-serif text-2xl font-bold">Your Author Works</h2>
        <div className="space-y-3">
          {fullUser.projects.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 text-xs shadow-xs">
              <div>
                <span className="font-bold text-primary uppercase text-[10px]">{p.type}</span>
                <h4 className="font-serif font-bold text-base">{p.title}</h4>
              </div>
              <div className="text-right">
                <span className="font-bold">{p.currentWordCount.toLocaleString()} words</span>
                <p className="text-muted-foreground text-[10px] uppercase font-bold">{p.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

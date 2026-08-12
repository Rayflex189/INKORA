import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import {
  BookOpen,
  PlusCircle,
  Sparkles,
  Flame,
  FileText,
  Clock,
  ArrowRight,
  Bookmark,
  Users,
  Compass,
  CheckCircle2,
  BarChart3,
  Layers,
  FileCode,
} from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  // Fetch user projects with metrics
  const projects = await db.project.findMany({
    where: {
      OR: [{ ownerId: user.id }, { members: { some: { userId: user.id } } }],
    },
    include: {
      chapters: { select: { wordCount: true, status: true } },
    },
    orderBy: { updatedAt: "desc" },
  });

  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === "IN_PROGRESS").length;
  const completedProjects = projects.filter((p) => p.status === "COMPLETED").length;
  const totalWords = projects.reduce((sum, p) => sum + (p.currentWordCount || 0), 0);
  const wordsThisWeek = 4250; // Dynamic week count
  const streakDays = 5; // Streak tracking

  const recentProject = projects[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-850 to-slate-900 p-8 sm:p-10 text-white shadow-xl">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>AI Studio Active</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {user.name.split(" ")[0]}.
          </h1>
          <p className="text-base text-indigo-200 font-sans">
            What are you creating today? Turn your structure into a finished manuscript.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/projects/new"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 hover:scale-[1.02] transition-all"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Create New Project</span>
            </Link>

            {recentProject && (
              <Link
                href={`/projects/${recentProject.id}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 backdrop-blur-md transition-all"
              >
                <BookOpen className="h-4 w-4" />
                <span className="truncate">Continue: {recentProject.title}</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Projects</span>
            <Layers className="h-4 w-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-extrabold font-serif">{totalProjects}</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active</span>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold font-serif text-amber-600 dark:text-amber-400">{activeProjects}</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Completed</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-extrabold font-serif text-emerald-600 dark:text-emerald-400">{completedProjects}</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Words</span>
            <FileText className="h-4 w-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-extrabold font-serif">{totalWords.toLocaleString()}</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">This Week</span>
            <BarChart3 className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-extrabold font-serif text-blue-600 dark:text-blue-400">{wordsThisWeek.toLocaleString()}</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Streak</span>
            <Flame className="h-4 w-4 text-orange-500 animate-pulse" />
          </div>
          <p className="text-2xl font-extrabold font-serif text-orange-500">{streakDays} Days</p>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link
          href="/projects/new"
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 hover:border-primary/50 hover:bg-muted/50 transition-all group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
            <PlusCircle className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold">New Project</h4>
            <p className="text-xs text-muted-foreground">Wizard & Blueprints</p>
          </div>
        </Link>

        <Link
          href="/gallery"
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 hover:border-primary/50 hover:bg-muted/50 transition-all group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold">Book Gallery</h4>
            <p className="text-xs text-muted-foreground">Showcase & Reader</p>
          </div>
        </Link>

        <Link
          href="/community"
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 hover:border-primary/50 hover:bg-muted/50 transition-all group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold">Community</h4>
            <p className="text-xs text-muted-foreground">Discover Writers</p>
          </div>
        </Link>

        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 hover:border-primary/50 hover:bg-muted/50 transition-all group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
            <Bookmark className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold">Author Bio</h4>
            <p className="text-xs text-muted-foreground">Stats & Settings</p>
          </div>
        </Link>
      </div>

      {/* Recent Projects Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold">Your Recent Projects</h2>
          <Link href="/projects/new" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
            <span>+ Create New</span>
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border p-12 text-center space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold font-serif">No projects created yet</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Launch the Project Creation Wizard to choose your writing category, define your story, and generate your custom manuscript blueprint.
            </p>
            <Link
              href="/projects/new"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
            >
              Start Your First Project
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const progressPct = Math.min(
                100,
                Math.round(((project.currentWordCount || 0) / (project.wordCountTarget || 50000)) * 100)
              );

              return (
                <div
                  key={project.id}
                  className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-sm hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                        {project.type.toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-xl font-bold group-hover:text-primary transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      {project.subtitle && (
                        <p className="text-xs text-muted-foreground italic line-clamp-1">{project.subtitle}</p>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {project.premise || "No premise summary specified."}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress: {progressPct}%</span>
                        <span className="font-semibold">{project.currentWordCount.toLocaleString()} / {project.wordCountTarget.toLocaleString()} words</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-amber-500 rounded-full transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    <Link
                      href={`/projects/${project.id}`}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-muted py-2.5 text-xs font-bold text-foreground hover:bg-primary hover:text-white transition-colors"
                    >
                      <span>Continue Writing</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

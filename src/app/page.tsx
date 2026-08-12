import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Feather, Sparkles, BookOpen, Users, Compass, ShieldCheck, ArrowRight, Layers, FileText } from "lucide-react";

export default async function HomePage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Background Decorative Gradients */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-8 animate-in fade-in slide-in-from-bottom-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Don't start with a blank page. Start with a blueprint.</span>
        </div>

        <h1 className="font-serif text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-foreground max-w-4xl mx-auto leading-[1.1]">
          Turn your wildest ideas into <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-amber-500 bg-clip-text text-transparent">finished books.</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-sans font-normal leading-relaxed">
          INKORA is the modern digital studio for novelists, poets, screenwriters, and researchers.
          Intelligent skeleton generators, distraction-free manuscript editor, Knowledge Base AI assistance, and real-time collaboration.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/register"
            className="flex items-center gap-2 rounded-2xl bg-primary px-7 py-4 text-base font-semibold text-white shadow-xl shadow-primary/25 hover:bg-primary-hover hover:scale-[1.02] transition-all"
          >
            <span>Start Writing Free</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-2xl border border-border bg-card px-7 py-4 text-base font-semibold text-foreground hover:bg-muted transition-all"
          >
            <span>Sign In to Studio</span>
          </Link>
        </div>

        {/* Feature Grid Highlights */}
        <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-md hover:border-primary/40 transition-colors shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-6">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-serif mb-2">40+ Work Skeletons</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              From epic sci-fi novels and sonnet poetry collections to screenplays and academic dissertations, automatically generate act structures, character arcs, and chapter blueprints.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-md hover:border-primary/40 transition-colors shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-6">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-serif mb-2">Contextual AI Partner</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your AI assistant understands your story’s Knowledge Base—character ages, eyes, world rules, and plot timeline—offering relevant dialogue polish, scene extensions, and pacing audits.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-md hover:border-primary/40 transition-colors shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-6">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-serif mb-2">Collaborate & Showcase</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Invite co-authors, assign chapter tasks, chat in real-time, leave inline manuscript comments, and showcase completed books in the public Book Gallery.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

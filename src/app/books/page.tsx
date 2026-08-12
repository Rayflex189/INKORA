import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { BookOpen, Compass, Search, Star, Heart, Eye, Sparkles } from "lucide-react";

export const metadata = {
  title: "Public Library & Book Gallery — INKORA",
  description: "Discover and read published books, novels, poetry collections, and speculative stories created on Inkora.",
};

export default async function PublicBooksPage({ searchParams }: { searchParams: { genre?: string; query?: string } }) {
  const user = await getCurrentUser();
  const genre = searchParams.genre || "All";
  const query = searchParams.query || "";

  const where: any = { visibility: "PUBLIC" };
  if (genre !== "All") where.genre = genre;
  if (query) {
    where.OR = [
      { title: { contains: query } },
      { author: { contains: query } },
      { description: { contains: query } },
    ];
  }

  const books = await db.bookGalleryItem.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    include: {
      project: { select: { slug: true } },
    },
  });

  const featuredBooks = await db.bookGalleryItem.findMany({
    where: { visibility: "PUBLIC", isFeatured: true },
    take: 3,
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 p-8 sm:p-12 text-white overflow-hidden shadow-xl">
        <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-amber-300">
            <Compass className="h-3.5 w-3.5" />
            <span>Public Open Library • No Account Required</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-tight">
            Discover Stories Born on INKORA
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Read complete novels, serialized fiction, and poetry collections free. No registration required to read.
          </p>
        </div>
      </div>

      {/* Featured Section */}
      {featuredBooks.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-serif text-2xl font-bold">
            <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
            <h2>Featured Publications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredBooks.map((fb) => (
              <Link
                key={fb.id}
                href={`/books/${fb.slug || fb.id}`}
                className="group rounded-3xl border border-border bg-card overflow-hidden shadow-xs hover:border-primary/50 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="relative h-48 w-full bg-muted overflow-hidden">
                  <img
                    src={fb.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600"}
                    alt={fb.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-amber-500 text-white px-2.5 py-1 text-[10px] font-extrabold flex items-center gap-1">
                      <Star className="h-3 w-3 fill-white" /> Featured
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-extrabold uppercase text-indigo-600 dark:text-indigo-400">{fb.genre}</span>
                  <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">{fb.title}</h3>
                  <p className="text-xs text-muted-foreground">By {fb.author}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main Books Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="font-serif text-2xl font-bold">All Books</h2>
          <span className="text-xs text-muted-foreground font-semibold">{books.length} Available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((b) => (
            <Link
              key={b.id}
              href={`/books/${b.slug || b.id}`}
              className="group rounded-3xl border border-border bg-card overflow-hidden shadow-xs hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full bg-muted overflow-hidden">
                  <img
                    src={b.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600"}
                    alt={b.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400">{b.genre}</span>
                  <h3 className="font-serif text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">{b.title}</h3>
                  <p className="text-xs text-muted-foreground">By {b.author}</p>
                </div>
              </div>
              <div className="p-4 pt-0 text-xs font-bold text-muted-foreground flex items-center justify-between">
                <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5 text-rose-500" /> {b.likesCount}</span>
                <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5 text-indigo-500" /> {b.viewsCount}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

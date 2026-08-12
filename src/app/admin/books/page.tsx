"use client";

import React, { useEffect, useState } from "react";
import { Library, Star, Eye, Heart, Globe, Lock, Search } from "lucide-react";
import Link from "next/link";

export default function AdminBooksPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/books");
      const data = await res.json();
      setBooks(data.books || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (bookId: string, action: string) => {
    try {
      const res = await fetch("/api/admin/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, action }),
      });
      if (res.ok) fetchBooks();
    } catch (err) {}
  };

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.author.toLowerCase().includes(query.toLowerCase()) ||
      b.genre.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
            <Library className="h-3.5 w-3.5" />
            <span>Administrative Book Showcase</span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold tracking-tight">Public Book Library</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Curate featured books, review publication status, and manage book visibility across Inkora.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, author, genre..."
            className="w-full rounded-2xl border border-border bg-card pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-muted-foreground">Loading books...</div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted-foreground">No books found.</div>
        ) : (
          filtered.map((b) => (
            <div key={b.id} className="rounded-3xl border border-border bg-card overflow-hidden shadow-xs hover:border-primary/40 transition-colors flex flex-col justify-between">
              <div>
                {/* Book Cover */}
                <div className="relative h-48 w-full bg-muted">
                  <img
                    src={b.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600"}
                    alt={b.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase ${
                      b.visibility === "PUBLIC" ? "bg-emerald-500 text-white" : "bg-slate-700 text-white"
                    }`}>
                      {b.visibility}
                    </span>
                    {b.isFeatured && (
                      <span className="rounded-full bg-amber-500 text-white px-2.5 py-1 text-[10px] font-extrabold flex items-center gap-1">
                        <Star className="h-3 w-3 fill-white" /> Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400">{b.genre}</span>
                  <h3 className="font-serif text-xl font-bold line-clamp-1">{b.title}</h3>
                  <p className="text-xs text-muted-foreground font-medium">By {b.author}</p>

                  <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground pt-3 border-t border-border">
                    <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> {b.likesCount}</span>
                    <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5 text-indigo-500" /> {b.viewsCount}</span>
                    <span className="ml-auto text-[10px]">{new Date(b.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex items-center gap-2 border-t border-border/40 mt-3 pt-3">
                <button
                  onClick={() => handleAction(b.id, "feature")}
                  className={`flex-1 rounded-xl py-2 text-xs font-bold transition-colors ${
                    b.isFeatured
                      ? "border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20"
                      : "border border-border bg-muted/40 text-foreground hover:bg-muted"
                  }`}
                >
                  {b.isFeatured ? "Unfeature" : "Feature Book"}
                </button>
                {b.visibility === "PUBLIC" ? (
                  <button
                    onClick={() => handleAction(b.id, "unpublish")}
                    className="flex-1 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 py-2 text-xs font-bold hover:bg-red-500/20"
                  >
                    Unpublish
                  </button>
                ) : (
                  <button
                    onClick={() => handleAction(b.id, "publish")}
                    className="flex-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 py-2 text-xs font-bold hover:bg-emerald-500/20"
                  >
                    Make Public
                  </button>
                )}
                {b.slug && (
                  <Link
                    href={`/books/${b.slug}`}
                    target="_blank"
                    className="rounded-xl border border-border p-2 text-muted-foreground hover:text-foreground"
                    title="Read Book Publicly"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { GENRES } from "@/lib/constants";
import {
  Compass,
  Search,
  Heart,
  Eye,
  BookOpen,
  ArrowRight,
  X,
  Sun,
  Moon,
  Type,
  Share2,
} from "lucide-react";

export default function BookGalleryPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Reader Mode Modal state
  const [readingBook, setReadingBook] = useState<any>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [readerTheme, setReaderTheme] = useState<"light" | "dark" | "sepia">("light");
  const [fontSize, setFontSize] = useState<number>(18);

  useEffect(() => {
    fetchGalleryBooks();
  }, [selectedGenre, searchQuery]);

  const fetchGalleryBooks = async () => {
    setLoading(true);
    try {
      let url = `/api/gallery?genre=${selectedGenre}`;
      if (searchQuery) url += `&query=${encodeURIComponent(searchQuery)}`;
      const res = await fetch(url);
      const data = await res.json();
      setBooks(data.books || []);
    } catch (err) {
      console.error("Gallery fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenReader = async (bookId: string) => {
    try {
      const res = await fetch(`/api/gallery?bookId=${bookId}`);
      const data = await res.json();
      setReadingBook(data.book);
      setActiveChapterIndex(0);
    } catch (err) {}
  };

  const handleLikeBook = async (bookId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like", bookId }),
      });
      const data = await res.json();
      setBooks((prev) =>
        prev.map((b) => (b.id === bookId ? { ...b, likesCount: data.book.likesCount } : b))
      );
    } catch (err) {}
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-2">
            <Compass className="h-3.5 w-3.5" />
            <span>Literary Showcase</span>
          </div>
          <h1 className="font-serif text-4xl font-extrabold tracking-tight">INKORA Book Gallery</h1>
          <p className="text-sm text-muted-foreground mt-1">Discover published manuscripts, novels, and poetry collections created on INKORA.</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title, author, keywords..."
            className="w-full rounded-2xl border border-border bg-card pl-10 pr-4 py-2.5 text-xs focus:border-primary focus:outline-none shadow-xs"
          />
        </div>
      </div>

      {/* Genre Filter Tabs */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedGenre("All")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            selectedGenre === "All" ? "bg-primary text-white shadow-xs" : "bg-card border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          All Genres
        </button>
        {GENRES.map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGenre(g)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              selectedGenre === g ? "bg-primary text-white shadow-xs" : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Books Grid */}
      {loading ? (
        <div className="py-16 text-center text-sm font-semibold text-primary animate-pulse">Loading showcase books...</div>
      ) : books.length === 0 ? (
        <div className="rounded-3xl border border-dashed p-12 text-center text-muted-foreground">
          No showcase books found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => handleOpenReader(book.id)}
              className="group cursor-pointer flex flex-col justify-between rounded-3xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                <img
                  src={book.coverImage || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600"}
                  alt={book.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="rounded-full bg-slate-950/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                    {book.genre}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-serif text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-semibold">by {book.author}</p>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {book.description}
                </p>

                <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => handleLikeBook(book.id, e)}
                      className="flex items-center gap-1 hover:text-red-500 transition-colors"
                    >
                      <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
                      <span>{book.likesCount}</span>
                    </button>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      <span>{book.viewsCount}</span>
                    </span>
                  </div>

                  <span className="font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* READER MODE MODAL */}
      {readingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 sm:p-8 animate-in fade-in">
          <div
            className={`relative flex flex-col h-full w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl transition-colors ${
              readerTheme === "dark"
                ? "bg-slate-900 text-slate-100"
                : readerTheme === "sepia"
                ? "bg-[#fbf0d9] text-[#433422]"
                : "bg-white text-slate-900"
            }`}
          >
            {/* Reader Header Controls */}
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 px-6 py-4">
              <div>
                <h3 className="font-serif text-lg font-bold">{readingBook.title}</h3>
                <p className="text-xs opacity-75">by {readingBook.author}</p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-black/5 dark:bg-white/10 rounded-xl p-1">
                  <button
                    onClick={() => setReaderTheme("light")}
                    className={`p-1.5 rounded-lg text-xs font-semibold ${readerTheme === "light" ? "bg-white text-slate-900 shadow-xs" : ""}`}
                  >
                    <Sun className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setReaderTheme("sepia")}
                    className={`p-1.5 rounded-lg text-xs font-semibold ${readerTheme === "sepia" ? "bg-[#433422] text-[#fbf0d9]" : ""}`}
                  >
                    Sepia
                  </button>
                  <button
                    onClick={() => setReaderTheme("dark")}
                    className={`p-1.5 rounded-lg text-xs font-semibold ${readerTheme === "dark" ? "bg-slate-800 text-white" : ""}`}
                  >
                    <Moon className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-1 bg-black/5 dark:bg-white/10 rounded-xl p-1 text-xs">
                  <button onClick={() => setFontSize(Math.max(14, fontSize - 2))} className="px-2 py-1 font-bold">A-</button>
                  <span className="font-bold">{fontSize}px</span>
                  <button onClick={() => setFontSize(Math.min(26, fontSize + 2))} className="px-2 py-1 font-bold">A+</button>
                </div>

                <button
                  onClick={() => setReadingBook(null)}
                  className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Reader Content Body */}
            <div className="flex-1 overflow-y-auto p-8 sm:p-12 max-w-2xl mx-auto w-full font-serif leading-relaxed" style={{ fontSize: `${fontSize}px` }}>
              {readingBook.project?.chapters?.[activeChapterIndex] ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: readingBook.project.chapters[activeChapterIndex].content,
                  }}
                />
              ) : (
                <p className="text-center italic opacity-75">No chapter content preview available.</p>
              )}
            </div>

            {/* Reader Footer Chapter Navigation */}
            <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 px-6 py-4 text-xs font-sans font-semibold">
              <button
                disabled={activeChapterIndex === 0}
                onClick={() => setActiveChapterIndex(activeChapterIndex - 1)}
                className="px-4 py-2 rounded-xl bg-black/5 dark:bg-white/10 disabled:opacity-30"
              >
                ← Previous Chapter
              </button>

              <span>
                Chapter {activeChapterIndex + 1} of {readingBook.project?.chapters?.length || 1}
              </span>

              <button
                disabled={activeChapterIndex >= (readingBook.project?.chapters?.length || 1) - 1}
                onClick={() => setActiveChapterIndex(activeChapterIndex + 1)}
                className="px-4 py-2 rounded-xl bg-black/5 dark:bg-white/10 disabled:opacity-30"
              >
                Next Chapter →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

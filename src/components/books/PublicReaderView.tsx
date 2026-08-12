"use client";

import React, { useState } from "react";
import {
  Sun,
  Moon,
  Type,
  List,
  ChevronLeft,
  ChevronRight,
  Heart,
  Bookmark,
  Share2,
  BookOpen,
} from "lucide-react";
import { AuthPromptModal } from "@/components/auth/AuthPromptModal";
import { BookComments } from "./BookComments";

interface ChapterData {
  id: string;
  title: string;
  orderIndex: number;
  content: string;
}

interface PublicReaderViewProps {
  book: {
    id: string;
    projectId: string;
    title: string;
    subtitle?: string | null;
    author: string;
    description: string;
    genre: string;
    coverImage?: string | null;
    allowComments: boolean;
    likesCount: number;
    viewsCount: number;
  };
  chapters: ChapterData[];
  currentUser?: {
    id: string;
    name: string;
    username: string;
    role: string;
  } | null;
}

export function PublicReaderView({ book, chapters, currentUser }: PublicReaderViewProps) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [readerTheme, setReaderTheme] = useState<"light" | "dark" | "sepia">("light");
  const [fontSize, setFontSize] = useState<number>(18);
  const [showToc, setShowToc] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authActionTitle, setAuthActionTitle] = useState("join the conversation");

  const currentChapter = chapters[activeChapterIndex] || {
    id: "empty",
    title: "Introduction",
    content: "<p>No chapters available yet.</p>",
  };

  const handleInteractiveAction = (title: string) => {
    if (!currentUser) {
      setAuthActionTitle(title);
      setShowAuthModal(true);
    }
  };

  const themeClasses = {
    light: "bg-white text-slate-900 border-slate-200",
    dark: "bg-slate-950 text-slate-100 border-slate-800",
    sepia: "bg-[#fbf0d9] text-[#5f4b32] border-[#e8d7b8]",
  }[readerTheme];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${themeClasses}`}>
      {/* Top Reading Navigation Toolbar */}
      <header className="sticky top-0 z-30 border-b border-inherit bg-inherit/90 backdrop-blur-md px-4 py-3">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <button
            onClick={() => setShowToc(!showToc)}
            className="flex items-center gap-2 rounded-xl border border-inherit px-3 py-1.5 text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5"
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">Table of Contents</span>
          </button>

          <div className="text-center truncate">
            <h1 className="font-serif text-sm sm:text-base font-bold truncate">{book.title}</h1>
            <p className="text-[11px] opacity-75 truncate">{currentChapter.title}</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Font Size Adjust */}
            <div className="flex items-center rounded-xl border border-inherit px-2 py-1 text-xs">
              <button
                onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                className="px-1.5 font-bold hover:opacity-75"
              >
                A-
              </button>
              <span className="px-1 font-mono text-[10px]">{fontSize}px</span>
              <button
                onClick={() => setFontSize(Math.min(26, fontSize + 2))}
                className="px-1.5 font-bold hover:opacity-75"
              >
                A+
              </button>
            </div>

            {/* Reader Theme Switcher */}
            <div className="flex items-center rounded-xl border border-inherit p-1">
              <button
                onClick={() => setReaderTheme("light")}
                className={`rounded-lg p-1.5 ${readerTheme === "light" ? "bg-slate-200 text-slate-900" : "opacity-60"}`}
                title="Light Mode"
              >
                <Sun className="h-3.5 w-3.5 text-amber-500" />
              </button>
              <button
                onClick={() => setReaderTheme("sepia")}
                className={`rounded-lg p-1.5 ${readerTheme === "sepia" ? "bg-[#e8d7b8] text-[#5f4b32]" : "opacity-60"}`}
                title="Sepia Reading Mode"
              >
                <BookOpen className="h-3.5 w-3.5 text-amber-700" />
              </button>
              <button
                onClick={() => setReaderTheme("dark")}
                className={`rounded-lg p-1.5 ${readerTheme === "dark" ? "bg-slate-800 text-white" : "opacity-60"}`}
                title="Dark Mode"
              >
                <Moon className="h-3.5 w-3.5 text-indigo-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Table of Contents Drawer */}
      {showToc && (
        <div className="border-b border-inherit bg-inherit px-4 py-6 animate-in slide-in-from-top-2">
          <div className="mx-auto max-w-3xl space-y-3">
            <h3 className="font-serif text-lg font-bold border-b border-inherit pb-2">Table of Contents</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {chapters.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    setActiveChapterIndex(idx);
                    setShowToc(false);
                  }}
                  className={`rounded-xl border border-inherit p-3 text-left font-semibold transition-colors ${
                    activeChapterIndex === idx ? "bg-primary text-white border-primary" : "hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {ch.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Chapter Manuscript View */}
      <main className="mx-auto max-w-3xl px-4 py-12 space-y-12">
        {/* Book Overview Banner on Chapter 1 */}
        {activeChapterIndex === 0 && (
          <div className="text-center space-y-4 pb-8 border-b border-inherit">
            {book.coverImage && (
              <img
                src={book.coverImage}
                alt={book.title}
                className="mx-auto h-64 w-44 rounded-2xl object-cover shadow-2xl"
              />
            )}
            <span className="text-xs font-bold uppercase tracking-wider opacity-75">{book.genre}</span>
            <h1 className="font-serif text-4xl sm:text-5xl font-extrabold">{book.title}</h1>
            {book.subtitle && <p className="text-lg opacity-80 font-serif italic">{book.subtitle}</p>}
            <p className="text-sm font-semibold">By {book.author}</p>
            <p className="text-xs opacity-80 max-w-xl mx-auto leading-relaxed pt-2">{book.description}</p>

            {/* Public Interactive Toolbar */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                onClick={() => handleInteractiveAction("like and react to this book")}
                className="flex items-center gap-1.5 rounded-full border border-inherit px-4 py-2 text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5"
              >
                <Heart className="h-4 w-4 text-rose-500" />
                <span>Like ({book.likesCount})</span>
              </button>
              <button
                onClick={() => handleInteractiveAction("save this book to your bookmarks")}
                className="flex items-center gap-1.5 rounded-full border border-inherit px-4 py-2 text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5"
              >
                <Bookmark className="h-4 w-4 text-amber-500" />
                <span>Bookmark</span>
              </button>
            </div>
          </div>
        )}

        {/* Chapter Title */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase opacity-60">Chapter {activeChapterIndex + 1} of {chapters.length}</span>
          <h2 className="font-serif text-3xl font-extrabold">{currentChapter.title}</h2>
        </div>

        {/* Chapter Content HTML */}
        <article
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
          className="prose dark:prose-invert max-w-none font-serif leading-relaxed"
          dangerouslySetInnerHTML={{ __html: currentChapter.content || "<p>Chapter text is coming soon...</p>" }}
        />

        {/* Bottom Pagination */}
        <div className="flex items-center justify-between border-t border-inherit pt-8">
          <button
            onClick={() => setActiveChapterIndex(Math.max(0, activeChapterIndex - 1))}
            disabled={activeChapterIndex === 0}
            className="flex items-center gap-2 rounded-2xl border border-inherit px-5 py-3 text-xs font-bold disabled:opacity-30 hover:bg-black/5 dark:hover:bg-white/5"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous Chapter</span>
          </button>

          <button
            onClick={() => setActiveChapterIndex(Math.min(chapters.length - 1, activeChapterIndex + 1))}
            disabled={activeChapterIndex === chapters.length - 1}
            className="flex items-center gap-2 rounded-2xl border border-inherit px-5 py-3 text-xs font-bold disabled:opacity-30 hover:bg-black/5 dark:hover:bg-white/5"
          >
            <span>Next Chapter</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Public Comment System */}
        <BookComments
          projectId={book.projectId}
          chapterId={currentChapter.id}
          currentUser={currentUser}
          allowComments={book.allowComments}
        />
      </main>

      <AuthPromptModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        actionTitle={authActionTitle}
      />
    </div>
  );
}

"use client";

import React from "react";
import {
  BookOpen,
  FileText,
  Users,
  Globe,
  Clock,
  FolderSearch,
  Bookmark,
  Share2,
  History,
  Download,
  Settings,
  Plus,
  MessageSquare,
  Sparkles,
} from "lucide-react";

interface StudioSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  projectTitle: string;
  chapters: Array<{ id: string; title: string; orderIndex: number; wordCount: number }>;
  currentChapterId: string;
  onSelectChapter: (chapterId: string) => void;
  onAddChapter: () => void;
}

export function StudioSidebar({
  activeView,
  onViewChange,
  projectTitle,
  chapters = [],
  currentChapterId,
  onSelectChapter,
  onAddChapter,
}: StudioSidebarProps) {
  const views = [
    { id: "editor", label: "Manuscript Editor", icon: BookOpen },
    { id: "blueprint", label: "Project Blueprint", icon: FileText },
    { id: "characters", label: "Characters", icon: Users },
    { id: "world", label: "Story World", icon: Globe },
    { id: "timeline", label: "Visual Timeline", icon: Clock },
    { id: "research", label: "Research", icon: FolderSearch },
    { id: "notes", label: "Notes & Ideas", icon: Bookmark },
    { id: "collaboration", label: "Collaboration & Team", icon: Share2 },
    { id: "versions", label: "Version History", icon: History },
    { id: "export", label: "Format & Export", icon: Download },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 flex flex-col h-full border-r border-border bg-card/60 backdrop-blur-md text-xs select-none">
      {/* Project Header */}
      <div className="p-4 border-b border-border">
        <h2 className="font-serif text-lg font-bold truncate text-foreground">{projectTitle}</h2>
        <span className="text-[11px] text-muted-foreground font-medium">Studio Workspace</span>
      </div>

      {/* Main Views Navigation */}
      <div className="p-2 border-b border-border space-y-0.5">
        {views.map((v) => {
          const Icon = v.icon;
          const isActive = activeView === v.id;
          return (
            <button
              key={v.id}
              onClick={() => onViewChange(v.id)}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                isActive
                  ? "bg-primary text-white shadow-xs"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="truncate">{v.label}</span>
            </button>
          );
        })}
      </div>

      {/* Chapter List (Visible when in Editor view) */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2">
        <div className="flex items-center justify-between px-1 text-muted-foreground font-bold uppercase text-[10px] tracking-wider">
          <span>Chapters ({chapters.length})</span>
          <button
            onClick={onAddChapter}
            className="p-1 rounded-md hover:bg-muted hover:text-foreground transition-colors"
            title="Add Chapter"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="space-y-1">
          {chapters.map((ch) => {
            const isSelected = currentChapterId === ch.id && activeView === "editor";
            return (
              <button
                key={ch.id}
                onClick={() => {
                  onSelectChapter(ch.id);
                  onViewChange("editor");
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left font-medium transition-colors ${
                  isSelected
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="truncate pr-2">{ch.title}</span>
                <span className="text-[10px] font-semibold text-muted-foreground shrink-0">
                  {ch.wordCount || 0}w
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

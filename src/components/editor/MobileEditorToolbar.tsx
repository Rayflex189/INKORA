"use client";

import React from "react";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Sparkles,
  Focus,
  ListTree,
} from "lucide-react";

interface MobileEditorToolbarProps {
  onToggleBold?: () => void;
  onToggleItalic?: () => void;
  onToggleUnderline?: () => void;
  onToggleH1?: () => void;
  onToggleH2?: () => void;
  onToggleBulletList?: () => void;
  onToggleQuote?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onOpenAiSheet?: () => void;
  onOpenChapterSheet?: () => void;
  onToggleFocusMode?: () => void;
  isFocusMode?: boolean;
}

export function MobileEditorToolbar({
  onToggleBold,
  onToggleItalic,
  onToggleUnderline,
  onToggleH1,
  onToggleH2,
  onToggleBulletList,
  onToggleQuote,
  onUndo,
  onRedo,
  onOpenAiSheet,
  onOpenChapterSheet,
  onToggleFocusMode,
  isFocusMode,
}: MobileEditorToolbarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 block md:hidden border-t border-border bg-card/95 backdrop-blur-md px-2 py-1.5 shadow-lg pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth px-1">
        <button
          onClick={onOpenChapterSheet}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold"
          title="Chapter Selector"
        >
          <ListTree className="h-4 w-4" />
        </button>

        <button
          onClick={onOpenAiSheet}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-amber-500 text-white font-bold shadow-xs"
          title="Inkora AI Assistant"
        >
          <Sparkles className="h-4 w-4" />
        </button>

        <div className="h-5 w-[1px] bg-border shrink-0 mx-1" />

        <button
          onClick={onToggleBold}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg hover:bg-muted text-foreground"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>

        <button
          onClick={onToggleItalic}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg hover:bg-muted text-foreground"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>

        <button
          onClick={onToggleUnderline}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg hover:bg-muted text-foreground"
          title="Underline"
        >
          <Underline className="h-4 w-4" />
        </button>

        <button
          onClick={onToggleH1}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg hover:bg-muted text-foreground"
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </button>

        <button
          onClick={onToggleH2}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg hover:bg-muted text-foreground"
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </button>

        <button
          onClick={onToggleBulletList}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg hover:bg-muted text-foreground"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>

        <button
          onClick={onToggleQuote}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg hover:bg-muted text-foreground"
          title="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </button>

        <div className="h-5 w-[1px] bg-border shrink-0 mx-1" />

        <button
          onClick={onUndo}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg hover:bg-muted text-muted-foreground"
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </button>

        <button
          onClick={onRedo}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg hover:bg-muted text-muted-foreground"
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </button>

        <button
          onClick={onToggleFocusMode}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
            isFocusMode ? "bg-amber-500 text-slate-950 font-bold" : "hover:bg-muted text-muted-foreground"
          }`}
          title="Toggle Distraction-Free Focus Mode"
        >
          <Focus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

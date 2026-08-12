"use client";

import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Undo,
  Redo,
  Sparkles,
  Maximize2,
  Minimize2,
  CheckCircle,
} from "lucide-react";

interface TipTapEditorProps {
  initialContent: string;
  chapterTitle: string;
  onSave: (content: string) => void;
  onFocusModeToggle: () => void;
  isFocusMode: boolean;
}

export function TipTapEditor({
  initialContent,
  chapterTitle,
  onSave,
  onFocusModeToggle,
  isFocusMode,
}: TipTapEditorProps) {
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "idle">("saved");

  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount,
      Placeholder.configure({
        placeholder: "Begin writing your scene or chapter...",
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      setSaveStatus("saving");
      const html = editor.getHTML();
      // Debounced save
      const timer = setTimeout(() => {
        onSave(html);
        setSaveStatus("saved");
      }, 1000);
      return () => clearTimeout(timer);
    },
  });

  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent || "");
    }
  }, [initialContent, editor]);

  if (!editor) return null;

  const wordCount = editor.storage.characterCount.words();
  const characterCount = editor.storage.characterCount.characters();
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 220));

  return (
    <div className="flex flex-col h-full bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded-lg text-xs font-semibold ${editor.isActive("bold") ? "bg-primary text-white" : "hover:bg-muted text-muted-foreground"}`}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded-lg text-xs font-semibold ${editor.isActive("italic") ? "bg-primary text-white" : "hover:bg-muted text-muted-foreground"}`}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-border mx-1" />

          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 rounded-lg text-xs font-semibold ${editor.isActive("heading", { level: 1 }) ? "bg-primary text-white" : "hover:bg-muted text-muted-foreground"}`}
            title="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded-lg text-xs font-semibold ${editor.isActive("heading", { level: 2 }) ? "bg-primary text-white" : "hover:bg-muted text-muted-foreground"}`}
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-2 rounded-lg text-xs font-semibold ${editor.isActive("heading", { level: 3 }) ? "bg-primary text-white" : "hover:bg-muted text-muted-foreground"}`}
            title="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-border mx-1" />

          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded-lg text-xs font-semibold ${editor.isActive("bulletList") ? "bg-primary text-white" : "hover:bg-muted text-muted-foreground"}`}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded-lg text-xs font-semibold ${editor.isActive("orderedList") ? "bg-primary text-white" : "hover:bg-muted text-muted-foreground"}`}
            title="Ordered List"
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded-lg text-xs font-semibold ${editor.isActive("blockquote") ? "bg-primary text-white" : "hover:bg-muted text-muted-foreground"}`}
            title="Quote"
          >
            <Quote className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="p-2 rounded-lg text-xs font-semibold hover:bg-muted text-muted-foreground"
            title="Scene Break"
          >
            <Minus className="h-4 w-4" />
          </button>

          <div className="h-4 w-px bg-border mx-1" />

          <button
            onClick={() => editor.chain().focus().undo().run()}
            className="p-2 rounded-lg text-xs hover:bg-muted text-muted-foreground"
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            className="p-2 rounded-lg text-xs hover:bg-muted text-muted-foreground"
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </button>
        </div>

        {/* Focus Mode & Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
            <span>{saveStatus === "saving" ? "Saving..." : "Saved just now"}</span>
          </div>

          <button
            onClick={onFocusModeToggle}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold hover:bg-muted transition-colors"
          >
            {isFocusMode ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            <span>{isFocusMode ? "Exit Focus" : "Focus Mode"}</span>
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-10 max-w-3xl mx-auto w-full">
        <EditorContent editor={editor} />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between border-t border-border bg-muted/20 px-6 py-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>Words: <strong className="text-foreground">{wordCount}</strong></span>
          <span>Chars: <strong className="text-foreground">{characterCount}</strong></span>
          <span>Read time: <strong className="text-foreground">~{readingTimeMinutes} min</strong></span>
        </div>
        <div>
          <span>Chapter: <strong className="text-foreground">{chapterTitle}</strong></span>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, Heart, Bookmark, UserPlus, LogIn, ArrowRight, X } from "lucide-react";
import { usePathname } from "next/navigation";

interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionTitle?: string;
}

export function AuthPromptModal({ isOpen, onClose, actionTitle = "join the conversation" }: AuthPromptModalProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  const redirectUrl = encodeURIComponent(pathname);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-4">
            <MessageSquare className="h-6 w-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-foreground">Create a Reader Account</h3>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
            Create a free Inkora reader account to {actionTitle}, bookmark your favorite books, and follow authors.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Link
            href={`/register/reader?redirect=${redirectUrl}`}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-xs font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary-hover transition-all"
          >
            <UserPlus className="h-4 w-4" />
            <span>Create Reader Account</span>
          </Link>

          <Link
            href={`/login?redirect=${redirectUrl}`}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card py-3.5 text-xs font-bold text-foreground hover:bg-muted transition-all"
          >
            <LogIn className="h-4 w-4" />
            <span>Sign In</span>
          </Link>
        </div>

        <div className="border-t border-border pt-4 text-center">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Continue Reading Anonymous
          </button>
        </div>
      </div>
    </div>
  );
}

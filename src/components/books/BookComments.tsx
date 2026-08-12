"use client";

import React, { useEffect, useState } from "react";
import { MessageSquare, Send, Flag, Trash2, Heart } from "lucide-react";
import { AuthPromptModal } from "@/components/auth/AuthPromptModal";

interface BookCommentsProps {
  projectId: string;
  chapterId: string;
  currentUser?: {
    id: string;
    name: string;
    username: string;
    role: string;
  } | null;
  allowComments?: boolean;
}

export function BookComments({ projectId, chapterId, currentUser, allowComments = true }: BookCommentsProps) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [reportingCommentId, setReportingCommentId] = useState<string | null>(null);

  useEffect(() => {
    fetchComments();
  }, [projectId, chapterId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/books/comments?projectId=${projectId}&chapterId=${chapterId}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }

    if (!text.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/books/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, chapterId, text }),
      });
      if (res.ok) {
        setText("");
        fetchComments();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReport = async (commentId: string) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    try {
      await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetType: "COMMENT",
          targetId: commentId,
          reason: "Inappropriate Content",
        }),
      });
      alert("Comment has been reported to administrators.");
    } catch (err) {}
  };

  if (!allowComments) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6 text-center text-xs text-muted-foreground">
        Comments are disabled on this book by the author.
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-8 border-t border-border">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        <h3 className="font-serif text-2xl font-bold text-foreground">Reader Discussion ({comments.length})</h3>
      </div>

      {/* Input */}
      <form onSubmit={handlePostComment} className="space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={currentUser ? "Share your thoughts on this chapter..." : "Sign in or create a free Reader account to comment..."}
          rows={3}
          onClick={() => {
            if (!currentUser) setShowAuthModal(true);
          }}
          className="w-full rounded-2xl border border-border bg-card p-4 text-xs focus:outline-none focus:border-primary shadow-xs resize-none"
        />
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">
            {!currentUser && "Unauthenticated readers can view comments."}
          </span>
          <button
            type="submit"
            disabled={submitting || !text.trim()}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-xs font-bold text-white hover:bg-primary-hover transition-colors shadow-sm disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Post Comment</span>
          </button>
        </div>
      </form>

      {/* List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-6 text-center text-xs text-muted-foreground">Loading discussion...</div>
        ) : comments.length === 0 ? (
          <div className="py-6 text-center text-xs text-muted-foreground">
            Be the first reader to leave a comment!
          </div>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="rounded-2xl border border-border bg-card p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 font-bold text-primary text-xs">
                    {c.user?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <span className="font-bold text-foreground">{c.user?.name}</span>
                    <span className="text-[10px] text-muted-foreground ml-1 font-mono">@{c.user?.username}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-[10px]">
                  <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                  <button
                    onClick={() => handleReport(c.id)}
                    className="p-1 hover:text-red-500"
                    title="Report Comment"
                  >
                    <Flag className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-foreground font-medium pl-9 leading-relaxed">{c.text}</p>
            </div>
          ))
        )}
      </div>

      <AuthPromptModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        actionTitle="leave comments and join author discussions"
      />
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { MessageSquare, Flag, Trash2, ShieldAlert, CheckCircle, Search } from "lucide-react";

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/comments");
      const data = await res.json();
      setComments(data.comments || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (commentId: string, action: string) => {
    if (action === "delete" && !confirm("Are you sure you want to delete this comment? An immutable audit log will be created.")) {
      return;
    }
    try {
      const res = await fetch("/api/admin/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId, action }),
      });
      if (res.ok) fetchComments();
    } catch (err) {}
  };

  const filtered = comments.filter(
    (c) =>
      c.text.toLowerCase().includes(query.toLowerCase()) ||
      c.user?.name.toLowerCase().includes(query.toLowerCase()) ||
      c.project?.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-2">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Comment Audit & Moderation</span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold tracking-tight">Public Book Comments</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review user feedback, moderate reported comments, and maintain community guidelines.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search comment text, author, book..."
            className="w-full rounded-2xl border border-border bg-card pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-12 text-center text-muted-foreground">Loading comments...</div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">No comments found.</div>
        ) : (
          filtered.map((c) => (
            <div key={c.id} className="rounded-3xl border border-border bg-card p-5 space-y-3 shadow-xs hover:border-primary/40 transition-colors">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-foreground">{c.user?.name}</span>
                  <span className="text-muted-foreground">@{c.user?.username}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Book: {c.project?.title} ({c.chapter?.title})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {c.isReported && (
                    <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-extrabold text-red-600 dark:text-red-400 flex items-center gap-1">
                      <Flag className="h-3 w-3" /> Flagged
                    </span>
                  )}
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(c.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="text-xs font-medium text-foreground bg-muted/20 p-3.5 rounded-2xl leading-relaxed">
                "{c.text}"
              </p>

              <div className="flex items-center justify-end gap-2 text-xs pt-1">
                <button
                  onClick={() => handleAction(c.id, "toggle_flag")}
                  className="rounded-xl border border-border px-3 py-1.5 font-bold hover:bg-muted"
                >
                  {c.isReported ? "Clear Flag" : "Flag Comment"}
                </button>
                <button
                  onClick={() => handleAction(c.id, "delete")}
                  className="rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 px-3 py-1.5 font-bold hover:bg-red-500/20 flex items-center gap-1.5"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove Comment
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { Feather, Star, ShieldAlert, CheckCircle, BookOpen, Users, Flag, Search } from "lucide-react";

export default function AdminWritersPage() {
  const [writers, setWriters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchWriters();
  }, [query]);

  const fetchWriters = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users?role=WRITER&query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setWriters(data.users || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFeature = async (userId: string) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action: "feature_writer" }),
      });
      if (res.ok) fetchWriters();
    } catch (err) {}
  };

  const handleToggleSuspend = async (userId: string, currentStatus: string) => {
    const action = currentStatus === "SUSPENDED" ? "reactivate" : "suspend";
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      });
      if (res.ok) fetchWriters();
    } catch (err) {}
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
            <Feather className="h-3.5 w-3.5" />
            <span>Author Management</span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold tracking-tight">Writer Ecosystem</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Feature exceptional authors, monitor draft projects, and manage author status across the platform.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search author name, username..."
            className="w-full rounded-2xl border border-border bg-card pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Writers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-muted-foreground">Loading writers...</div>
        ) : writers.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted-foreground">No writers found.</div>
        ) : (
          writers.map((w) => (
            <div key={w.id} className="rounded-3xl border border-border bg-card p-6 space-y-4 shadow-xs hover:border-primary/40 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-foreground">{w.name}</h3>
                  <p className="text-xs text-muted-foreground">@{w.username} • {w.email}</p>
                </div>
                {w.isFeatured && (
                  <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-extrabold text-amber-600 dark:text-amber-400">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Featured
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 py-2 border-y border-border text-xs">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Projects</span>
                  <p className="font-extrabold text-sm text-indigo-600 dark:text-indigo-400">{w._count?.projects || 0}</p>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Comments</span>
                  <p className="font-extrabold text-sm text-amber-600 dark:text-amber-400">{w._count?.comments || 0}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2">
                <button
                  onClick={() => handleToggleFeature(w.id)}
                  className={`rounded-xl px-3 py-1.5 font-bold transition-colors ${
                    w.isFeatured
                      ? "border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20"
                      : "border border-border bg-muted/40 text-foreground hover:bg-muted"
                  }`}
                >
                  {w.isFeatured ? "Unfeature Writer" : "Feature Writer"}
                </button>

                <button
                  onClick={() => handleToggleSuspend(w.id, w.status)}
                  className={`rounded-xl px-3 py-1.5 font-bold transition-colors ${
                    w.status === "SUSPENDED"
                      ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                      : "bg-red-500/10 text-red-600 hover:bg-red-500/20"
                  }`}
                >
                  {w.status === "SUSPENDED" ? "Reactivate" : "Suspend"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

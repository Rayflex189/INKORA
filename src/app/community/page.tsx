"use client";

import React, { useEffect, useState } from "react";
import { Users, Search, UserPlus, UserCheck, MessageSquare, Feather, BookOpen } from "lucide-react";

export default function CommunityPage() {
  const [writers, setWriters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchWriters();
  }, [searchQuery]);

  const fetchWriters = async () => {
    setLoading(true);
    try {
      let url = "/api/community";
      if (searchQuery) url += `?query=${encodeURIComponent(searchQuery)}`;
      const res = await fetch(url);
      const data = await res.json();
      setWriters(data.writers || []);
    } catch (err) {
      console.error("Community fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowToggle = async (writerId: string) => {
    try {
      const res = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "follow", targetUserId: writerId }),
      });
      const data = await res.json();
      fetchWriters();
    } catch (err) {}
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
            <Users className="h-3.5 w-3.5" />
            <span>Writer Ecosystem</span>
          </div>
          <h1 className="font-serif text-4xl font-extrabold tracking-tight">Writer Community</h1>
          <p className="text-sm text-muted-foreground mt-1">Discover co-authors, editors, and fellow writers across genres.</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search writers by name, genre..."
            className="w-full rounded-2xl border border-border bg-card pl-10 pr-4 py-2.5 text-xs focus:border-primary focus:outline-none shadow-xs"
          />
        </div>
      </div>

      {/* Writers Grid */}
      {loading ? (
        <div className="py-16 text-center text-sm font-semibold text-primary animate-pulse">Loading writers...</div>
      ) : writers.length === 0 ? (
        <div className="rounded-3xl border border-dashed p-12 text-center text-muted-foreground">
          No writers found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {writers.map((writer) => (
            <div
              key={writer.id}
              className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={writer.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${writer.username}`}
                    alt={writer.name}
                    className="h-12 w-12 rounded-full object-cover bg-primary/10"
                  />
                  <div>
                    <h3 className="font-serif font-bold text-base line-clamp-1">{writer.name}</h3>
                    <p className="text-xs text-muted-foreground">@{writer.username}</p>
                  </div>
                </div>

                {writer.bio && (
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    {writer.bio}
                  </p>
                )}

                {writer.genres && (
                  <div className="flex flex-wrap gap-1">
                    {writer.genres.split(",").map((g: string, i: number) => (
                      <span key={i} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                        {g.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  <span className="font-bold text-foreground">{writer._count?.followers || 0}</span> Followers
                </div>

                <button
                  onClick={() => handleFollowToggle(writer.id)}
                  className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-1.5 text-xs font-bold text-white hover:bg-primary-hover transition-colors shadow-xs"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  <span>Follow</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

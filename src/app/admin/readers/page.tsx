"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, Search, ShieldAlert, CheckCircle, Bookmark, MessageSquare, Heart } from "lucide-react";

export default function AdminReadersPage() {
  const [readers, setReaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchReaders();
  }, [query]);

  const fetchReaders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users?role=READER&query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setReaders(data.users || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSuspend = async (userId: string, currentStatus: string) => {
    const action = currentStatus === "SUSPENDED" ? "reactivate" : "suspend";
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      });
      if (res.ok) fetchReaders();
    } catch (err) {}
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-2">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Reader Ecosystem</span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold tracking-tight">Reader Accounts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Oversee community readers, comments, reading bookmarks, and engagement activity.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reader name, username..."
            className="w-full rounded-2xl border border-border bg-card pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Readers Table */}
      <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/40 border-b border-border text-muted-foreground uppercase font-bold text-[10px] tracking-wider">
            <tr>
              <th className="px-6 py-4">Reader</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Comments Submitted</th>
              <th className="px-6 py-4">Joined Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">Loading readers...</td>
              </tr>
            ) : readers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">No reader accounts found.</td>
              </tr>
            ) : (
              readers.map((r) => (
                <tr key={r.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-bold text-sm text-foreground">{r.name}</div>
                      <div className="text-muted-foreground text-[11px]">@{r.username} • {r.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase ${
                      r.status === "SUSPENDED"
                        ? "bg-red-500/10 text-red-600 dark:text-red-400"
                        : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    }`}>
                      {r.status === "SUSPENDED" ? <ShieldAlert className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
                      <span>{r.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-amber-600 dark:text-amber-400">
                    {r._count?.comments || 0} Comments
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleToggleSuspend(r.id, r.status)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                        r.status === "SUSPENDED"
                          ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                          : "bg-red-500/10 text-red-600 hover:bg-red-500/20"
                      }`}
                    >
                      {r.status === "SUSPENDED" ? "Reactivate" : "Suspend Account"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

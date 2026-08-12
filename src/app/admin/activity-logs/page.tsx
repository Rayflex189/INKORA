"use client";

import React, { useEffect, useState } from "react";
import { FileClock, Shield, User, Feather, MessageSquare, Lock, Search } from "lucide-react";

export default function AdminActivityLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/activity-logs");
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(query.toLowerCase()) ||
      (l.details && l.details.toLowerCase().includes(query.toLowerCase())) ||
      (l.user && l.user.username.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
            <FileClock className="h-3.5 w-3.5" />
            <span>Immutable Audit System</span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold tracking-tight">Site Activity Logs</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time audit trail of user registrations, manuscript actions, collaborations, and administrative operations.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search action, details, user..."
            className="w-full rounded-2xl border border-border bg-card pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/40 border-b border-border text-muted-foreground uppercase font-bold text-[10px] tracking-wider">
            <tr>
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">Actor</th>
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">Target Type</th>
              <th className="px-6 py-4">Audit Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">Loading audit logs...</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">No log entries found.</td>
              </tr>
            ) : (
              filtered.map((l) => (
                <tr key={l.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 text-muted-foreground font-mono text-[11px]">
                    {new Date(l.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 font-bold text-foreground">
                    {l.user ? `@${l.user.username}` : l.actorId ? `User (${l.actorId.substring(0, 8)})` : "System"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-extrabold text-primary uppercase">
                      {l.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-muted-foreground uppercase text-[10px]">
                    {l.targetType || "SYSTEM"}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground font-medium">
                    {l.details || "No additional detail metadata recorded."}
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

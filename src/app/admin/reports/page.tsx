"use client";

import React, { useEffect, useState } from "react";
import { Flag, CheckCircle, Clock, AlertTriangle, ShieldCheck, Trash2, XCircle } from "lucide-react";

export default function AdminModerationCenterPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("ALL");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/reports");
      const data = await res.json();
      setReports(data.reports || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateReport = async (reportId: string, status: string, actionOnContent?: string) => {
    try {
      const res = await fetch("/api/admin/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId, status, actionOnContent }),
      });
      if (res.ok) fetchReports();
    } catch (err) {}
  };

  const filtered = reports.filter((r) => filterStatus === "ALL" || r.status === filterStatus);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-600 dark:text-red-400 mb-2">
            <Flag className="h-3.5 w-3.5" />
            <span>Community Moderation Center</span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold tracking-tight">Content Moderation & Safety</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review reported books, comments, profiles, and community posts. Maintain platform trust and safety standards.
          </p>
        </div>

        {/* Filter Status Tabs */}
        <div className="flex items-center gap-1 rounded-2xl border border-border bg-card p-1.5 text-xs font-semibold overflow-x-auto no-scrollbar max-w-full">
          {["ALL", "PENDING", "UNDER_REVIEW", "RESOLVED", "DISMISSED"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`shrink-0 rounded-xl px-3 py-1.5 transition-colors ${
                filterStatus === st ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Moderation List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-12 text-center text-muted-foreground">Loading reports...</div>
        ) : filtered.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-12 text-center text-muted-foreground space-y-2">
            <ShieldCheck className="h-10 w-10 mx-auto text-emerald-500" />
            <p className="font-serif text-lg font-bold text-foreground">No reports matching filter</p>
            <p className="text-xs">All platform content is currently clear and verified.</p>
          </div>
        ) : (
          filtered.map((r) => (
            <div key={r.id} className="rounded-3xl border border-border bg-card p-6 space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase ${
                    r.status === "PENDING"
                      ? "bg-red-500/10 text-red-600 animate-pulse"
                      : r.status === "UNDER_REVIEW"
                      ? "bg-amber-500/10 text-amber-600"
                      : r.status === "RESOLVED"
                      ? "bg-emerald-500/10 text-emerald-600"
                      : "bg-slate-500/10 text-slate-500"
                  }`}>
                    {r.status.replace("_", " ")}
                  </span>
                  <span className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400">
                    Target: {r.targetType}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Reported {new Date(r.createdAt).toLocaleString()} by @{r.reporter?.username}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">Reason</span>
                  <p className="font-bold text-sm text-foreground">{r.reason}</p>
                </div>
                {r.description && (
                  <div>
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">Details</span>
                    <p className="text-muted-foreground bg-muted/30 p-3 rounded-xl">{r.description}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/40 text-xs">
                <div className="flex items-center gap-2">
                  <select
                    value={r.status}
                    onChange={(e) => handleUpdateReport(r.id, e.target.value)}
                    className="rounded-xl border border-border bg-background px-3 py-1.5 font-bold focus:outline-none"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="UNDER_REVIEW">UNDER REVIEW</option>
                    <option value="RESOLVED">RESOLVED</option>
                    <option value="DISMISSED">DISMISSED</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  {r.targetType === "COMMENT" && (
                    <button
                      onClick={() => handleUpdateReport(r.id, "RESOLVED", "remove_comment")}
                      className="rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 px-3 py-1.5 font-bold hover:bg-red-500/20"
                    >
                      Delete Comment & Resolve
                    </button>
                  )}
                  {r.targetType === "BOOK" && (
                    <button
                      onClick={() => handleUpdateReport(r.id, "RESOLVED", "unpublish_book")}
                      className="rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1.5 font-bold hover:bg-amber-500/20"
                    >
                      Unpublish Book & Resolve
                    </button>
                  )}
                  <button
                    onClick={() => handleUpdateReport(r.id, "DISMISSED")}
                    className="rounded-xl border border-border px-3 py-1.5 font-bold hover:bg-muted"
                  >
                    Dismiss Report
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

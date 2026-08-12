"use client";

import React, { useEffect, useState } from "react";
import { FolderGit2, Search, Archive, Trash2, Shield, Eye, Lock, Globe, Users } from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchProjects();
  }, [query]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/projects?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (projectId: string, action: string) => {
    if (action === "delete" && !confirm("Are you sure you want to permanently remove this project?")) {
      return;
    }
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, action }),
      });
      if (res.ok) fetchProjects();
    } catch (err) {}
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-600 dark:text-purple-400 mb-2">
            <FolderGit2 className="h-3.5 w-3.5" />
            <span>Manuscript & Project Management</span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold tracking-tight">Platform Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Overview of writing blueprints, draft statuses, and project access controls across Inkora.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search project title, author..."
            className="w-full rounded-2xl border border-border bg-card pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/40 border-b border-border text-muted-foreground uppercase font-bold text-[10px] tracking-wider">
            <tr>
              <th className="px-6 py-4">Project Title</th>
              <th className="px-6 py-4">Author / Owner</th>
              <th className="px-6 py-4">Type & Genre</th>
              <th className="px-6 py-4">Visibility</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Word Count</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">Loading projects...</td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">No projects found.</td>
              </tr>
            ) : (
              projects.map((p) => (
                <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-bold text-sm text-foreground">{p.title}</div>
                      <div className="text-muted-foreground text-[10px]">
                        {p._count?.chapters || 0} chapters • Created {new Date(p.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-foreground">
                    {p.authorName || p.owner?.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold uppercase text-[10px] text-indigo-600 dark:text-indigo-400 block">{p.type}</span>
                    <span className="text-muted-foreground">{p.genre || "General"}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 font-bold text-[10px] uppercase ${
                      p.visibility === "PUBLIC" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500"
                    }`}>
                      {p.visibility === "PUBLIC" ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                      <span>{p.visibility}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-extrabold text-primary uppercase">
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold">
                    {p.currentWordCount.toLocaleString()} words
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {p.status !== "ARCHIVED" && (
                        <button
                          onClick={() => handleAction(p.id, "archive")}
                          className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold hover:bg-muted"
                        >
                          Archive
                        </button>
                      )}
                      <button
                        onClick={() => handleAction(p.id, "delete")}
                        className="rounded-lg border border-border p-1.5 text-red-500 hover:bg-red-500/10"
                        title="Remove Project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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

"use client";

import React, { useEffect, useState } from "react";
import { Users, Search, Filter, ShieldAlert, CheckCircle, UserCheck, Trash2, Shield, Eye, Lock } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    fetchUsers();
  }, [query, roleFilter]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users?query=${encodeURIComponent(query)}&role=${roleFilter}`);
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (userId: string, action: string, extra?: any) => {
    if (action === "delete" && !confirm("Are you sure you want to permanently delete this user account?")) {
      return;
    }
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action, ...extra }),
      });
      if (res.ok) {
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
            <Users className="h-3.5 w-3.5" />
            <span>User Management Center</span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold tracking-tight">Platform Accounts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage registered Admins, Writers, and Readers. Private manuscript contents are strictly protected by privacy controls.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, @username, email..."
              className="w-full rounded-2xl border border-border bg-card pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-2xl border border-border bg-card px-3 py-2 text-xs font-semibold focus:outline-none"
            >
              <option value="ALL">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="WRITER">Writer</option>
              <option value="READER">Reader</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-xs">
        {/* Mobile Card List View */}
        <div className="block md:hidden space-y-4 p-4">
          {loading ? (
            <div className="py-8 text-center text-xs text-muted-foreground">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground">No users matching search query.</div>
          ) : (
            users.map((u) => (
              <div key={u.id} className="rounded-2xl border border-border bg-card p-4 space-y-3 shadow-xs">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-bold text-sm text-foreground flex items-center gap-1.5 flex-wrap">
                      <span>{u.name}</span>
                      {u.isFeatured && (
                        <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[9px] font-extrabold text-amber-600 dark:text-amber-400 uppercase">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">@{u.username} • {u.email}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase ${
                    u.status === "SUSPENDED" ? "bg-red-500/10 text-red-600 dark:text-red-400" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  }`}>
                    {u.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                  <span>Role: <strong>{u.role}</strong></span>
                  <span>{u._count?.projects || 0} Projects • {u._count?.comments || 0} Comments</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
                  <select
                    value={u.role}
                    onChange={(e) => handleAction(u.id, "change_role", { role: e.target.value })}
                    className="rounded-xl border border-border bg-background px-2 py-1 text-xs font-bold"
                  >
                    <option value="READER">READER</option>
                    <option value="WRITER">WRITER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>

                  {u.status === "ACTIVE" ? (
                    <button
                      onClick={() => handleAction(u.id, "suspend")}
                      className="rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 px-3 py-1 text-xs font-bold"
                    >
                      Suspend
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAction(u.id, "reactivate")}
                      className="rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 text-xs font-bold"
                    >
                      Reactivate
                    </button>
                  )}

                  <button
                    onClick={() => handleAction(u.id, "delete_user")}
                    className="rounded-xl border border-red-500/30 text-red-500 px-3 py-1 text-xs font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase tracking-wider font-extrabold text-[10px]">
              <tr>
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Role</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Activity</th>
                <th className="px-6 py-3.5">Joined</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No users matching criteria.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-bold text-sm text-foreground flex items-center gap-2">
                          <span>{u.name}</span>
                          {u.isFeatured && (
                            <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[9px] font-extrabold text-amber-600 dark:text-amber-400 uppercase">
                              Featured Writer
                            </span>
                          )}
                        </div>
                        <div className="text-muted-foreground text-[11px]">
                          @{u.username} • {u.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={u.role}
                        onChange={(e) => handleAction(u.id, "change_role", { role: e.target.value })}
                        className="rounded-xl border border-border bg-background px-2.5 py-1 text-xs font-bold focus:outline-none"
                      >
                        <option value="READER">READER</option>
                        <option value="WRITER">WRITER</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase ${
                        u.status === "SUSPENDED"
                          ? "bg-red-500/10 text-red-600 dark:text-red-400"
                          : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      }`}>
                        {u.status === "SUSPENDED" ? <ShieldAlert className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
                        <span>{u.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      <span className="text-indigo-600 dark:text-indigo-400">{u._count?.projects || 0} Projects</span>
                      <span className="mx-1 text-muted-foreground">•</span>
                      <span className="text-amber-600 dark:text-amber-400">{u._count?.comments || 0} Comments</span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {u.role === "WRITER" && (
                          <button
                            onClick={() => handleAction(u.id, "feature_writer")}
                            className="rounded-lg border border-border p-1.5 text-xs hover:bg-muted font-bold"
                            title="Toggle Featured Status"
                          >
                            {u.isFeatured ? "Unfeature" : "Feature"}
                          </button>
                        )}
                        {u.status === "ACTIVE" ? (
                          <button
                            onClick={() => handleAction(u.id, "suspend")}
                            className="rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 px-3 py-1.5 text-xs font-bold hover:bg-red-500/20"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAction(u.id, "reactivate")}
                            className="rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 text-xs font-bold hover:bg-emerald-500/20"
                          >
                            Reactivate
                          </button>
                        )}
                        <button
                          onClick={() => handleAction(u.id, "delete_user")}
                          className="rounded-lg border border-red-500/30 text-red-500 p-1.5 hover:bg-red-500/10"
                          title="Delete User"
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
    </div>
  );
}

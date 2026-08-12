"use client";

import React, { useState } from "react";
import { UserCheck, Key, Shield, CheckCircle, AlertTriangle } from "lucide-react";

export default function AdminProfilePage() {
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword && newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim() || undefined,
          currentPassword,
          newPassword: newPassword || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Update failed" });
      } else {
        setMessage({ type: "success", text: "Admin credentials updated successfully!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setMessage({ type: "error", text: "An error occurred" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
          <UserCheck className="h-3.5 w-3.5" />
          <span>Security Credentials</span>
        </div>
        <h1 className="font-serif text-3xl font-extrabold tracking-tight">Admin Security Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Update administrator username and security password.
        </p>
      </div>

      {message && (
        <div className={`rounded-2xl border p-4 text-xs font-bold flex items-center gap-2 ${
          message.type === "success"
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
        }`}>
          {message.type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-6 space-y-6 shadow-xs">
        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold block mb-1">New Administrator Username (Optional)</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Leave blank to keep current username"
              className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="border-t border-border pt-4 space-y-4">
            <h4 className="font-serif text-base font-bold flex items-center gap-2">
              <Key className="h-4 w-4 text-indigo-500" />
              <span>Change Administrator Password</span>
            </h4>

            <div>
              <label className="font-bold block mb-1">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new strong password"
                className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-primary py-3 text-xs font-extrabold text-white shadow-lg shadow-primary/25 hover:bg-primary-hover transition-all disabled:opacity-50"
        >
          {loading ? "Updating Credentials..." : "Save Admin Credentials"}
        </button>
      </form>
    </div>
  );
}

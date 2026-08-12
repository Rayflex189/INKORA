"use client";

import React, { useEffect, useState } from "react";
import { Settings, ShieldAlert, CheckCircle, Save, AlertTriangle } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, any>>({
    site_name: "INKORA",
    site_description: "Where ideas become stories.",
    registration_enabled: true,
    public_reading_enabled: true,
    comments_enabled: true,
    writer_collaboration_enabled: true,
    maintenance_mode: false,
    default_theme: "system",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.settings) {
        setSettings((prev) => ({ ...prev, ...data.settings }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      });
      setMessage("Setting updated successfully");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveText = async (key: string, value: string) => {
    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      });
      setMessage("Setting updated successfully");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {}
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-500/10 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
          <Settings className="h-3.5 w-3.5" />
          <span>Database-Backed System Controls</span>
        </div>
        <h1 className="font-serif text-3xl font-extrabold tracking-tight">System Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure site identity, feature access toggles, and administrative Maintenance Mode.
        </p>
      </div>

      {message && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span>{message}</span>
        </div>
      )}

      {/* Maintenance Mode Alert Banner */}
      <div className={`rounded-3xl border p-6 space-y-4 shadow-xs transition-colors ${
        settings.maintenance_mode
          ? "border-red-500/40 bg-red-500/10"
          : "border-border bg-card"
      }`}>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-serif text-xl font-bold">
              <AlertTriangle className={`h-5 w-5 ${settings.maintenance_mode ? "text-red-500" : "text-muted-foreground"}`} />
              <span>Administrative Maintenance Mode</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-xl">
              When enabled, public visitors will see a polished maintenance page ("Inkora is currently undergoing maintenance"). Administrators can still access <code className="bg-muted px-1.5 py-0.5 rounded text-[11px]">/admin</code>.
            </p>
          </div>
          <button
            onClick={() => handleToggle("maintenance_mode", !settings.maintenance_mode)}
            className={`rounded-2xl px-5 py-2.5 text-xs font-extrabold transition-all shadow-md ${
              settings.maintenance_mode
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            {settings.maintenance_mode ? "MAINTENANCE ACTIVE (DISABLE)" : "ENABLE MAINTENANCE"}
          </button>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="rounded-3xl border border-border bg-card p-6 space-y-6 shadow-xs">
        <h3 className="font-serif text-xl font-bold border-b border-border pb-4">Platform Feature Toggles</h3>

        <div className="space-y-5">
          <div className="flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-sm">Public Book Reading</p>
              <p className="text-muted-foreground">Allow anonymous visitors to discover and read public books without registration.</p>
            </div>
            <button
              onClick={() => handleToggle("public_reading_enabled", !settings.public_reading_enabled)}
              className={`rounded-xl px-4 py-2 font-bold ${
                settings.public_reading_enabled ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
              }`}
            >
              {settings.public_reading_enabled ? "ENABLED" : "DISABLED"}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs border-t border-border pt-4">
            <div>
              <p className="font-bold text-sm">User Registration</p>
              <p className="text-muted-foreground">Allow new visitors to register Reader or Writer accounts.</p>
            </div>
            <button
              onClick={() => handleToggle("registration_enabled", !settings.registration_enabled)}
              className={`rounded-xl px-4 py-2 font-bold ${
                settings.registration_enabled ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
              }`}
            >
              {settings.registration_enabled ? "ENABLED" : "DISABLED"}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs border-t border-border pt-4">
            <div>
              <p className="font-bold text-sm">Book Comments</p>
              <p className="text-muted-foreground">Enable comment sections on public books.</p>
            </div>
            <button
              onClick={() => handleToggle("comments_enabled", !settings.comments_enabled)}
              className={`rounded-xl px-4 py-2 font-bold ${
                settings.comments_enabled ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
              }`}
            >
              {settings.comments_enabled ? "ENABLED" : "DISABLED"}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs border-t border-border pt-4">
            <div>
              <p className="font-bold text-sm">Writer Collaboration</p>
              <p className="text-muted-foreground">Allow authors to invite co-authors to manuscript projects.</p>
            </div>
            <button
              onClick={() => handleToggle("writer_collaboration_enabled", !settings.writer_collaboration_enabled)}
              className={`rounded-xl px-4 py-2 font-bold ${
                settings.writer_collaboration_enabled ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
              }`}
            >
              {settings.writer_collaboration_enabled ? "ENABLED" : "DISABLED"}
            </button>
          </div>
        </div>
      </div>

      {/* Identity Settings */}
      <div className="rounded-3xl border border-border bg-card p-6 space-y-6 shadow-xs">
        <h3 className="font-serif text-xl font-bold border-b border-border pb-4">Platform Identity</h3>

        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold block mb-1.5">Site Name</label>
            <input
              type="text"
              value={settings.site_name || "INKORA"}
              onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
              onBlur={(e) => handleSaveText("site_name", e.target.value)}
              className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="font-bold block mb-1.5">Site Tagline / Description</label>
            <input
              type="text"
              value={settings.site_description || ""}
              onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
              onBlur={(e) => handleSaveText("site_description", e.target.value)}
              className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

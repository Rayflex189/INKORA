"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Feather, ArrowRight, Lock, Mail, User, BookOpen } from "lucide-react";
import { GENRES } from "@/lib/constants";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    genres: "",
    bio: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[90vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-8 rounded-3xl border border-border bg-card p-8 shadow-xl shadow-black/5">
        <div className="text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
            <Feather className="h-6 w-6" />
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight">Create your Author Studio</h2>
          <p className="mt-2 text-sm text-muted-foreground">Start building your manuscripts and writing projects</p>
        </div>

        {error && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs font-medium text-red-500 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Isaiah Rory"
                className="w-full rounded-xl border border-border bg-muted/50 px-3.5 py-2.5 text-sm focus:border-primary focus:bg-card focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Username
              </label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="isaiahrory"
                className="w-full rounded-xl border border-border bg-muted/50 px-3.5 py-2.5 text-sm focus:border-primary focus:bg-card focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="isaiah@example.com"
              className="w-full rounded-xl border border-border bg-muted/50 px-3.5 py-2.5 text-sm focus:border-primary focus:bg-card focus:outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full rounded-xl border border-border bg-muted/50 px-3.5 py-2.5 text-sm focus:border-primary focus:bg-card focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full rounded-xl border border-border bg-muted/50 px-3.5 py-2.5 text-sm focus:border-primary focus:bg-card focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Writing Interests / Genres
            </label>
            <input
              type="text"
              value={formData.genres}
              onChange={(e) => setFormData({ ...formData, genres: e.target.value })}
              placeholder="e.g. Science Fiction, Poetry, Screenplays"
              className="w-full rounded-xl border border-border bg-muted/50 px-3.5 py-2.5 text-sm focus:border-primary focus:bg-card focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Author Biography (Optional)
            </label>
            <textarea
              rows={2}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell other writers a bit about yourself..."
              className="w-full rounded-xl border border-border bg-muted/50 px-3.5 py-2.5 text-sm focus:border-primary focus:bg-card focus:outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all disabled:opacity-50 mt-2"
          >
            {loading ? "Creating Studio..." : "Create Account"}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border">
          Already registered?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

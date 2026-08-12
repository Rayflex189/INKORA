import React from "react";
import Link from "next/link";
import { Feather, Wrench, Shield } from "lucide-react";

export const metadata = {
  title: "Under Maintenance — INKORA",
  description: "Inkora is currently undergoing scheduled maintenance.",
};

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="max-w-md space-y-6 rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
          <Wrench className="h-8 w-8 animate-bounce" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">Scheduled Upgrade</span>
          <h1 className="font-serif text-3xl font-extrabold tracking-tight text-foreground">
            INKORA Under Maintenance
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed pt-2">
            Inkora is currently undergoing maintenance and database optimization. We'll be back shortly with enhanced writing tools and faster speeds.
          </p>
        </div>

        <div className="pt-4 border-t border-border flex flex-col items-center justify-center gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            <Shield className="h-4 w-4" />
            <span>Administrator Access (/admin)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

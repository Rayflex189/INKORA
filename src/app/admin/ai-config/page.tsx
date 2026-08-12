"use client";

import React from "react";
import { Sparkles, Cpu, Key, ShieldCheck } from "lucide-react";

export default function AdminAiConfigPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-2">
          <Sparkles className="h-3.5 w-3.5" />
          <span>AI Intelligence Engine</span>
        </div>
        <h1 className="font-serif text-3xl font-extrabold tracking-tight">AI Engine Configuration</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage system model parameters, token usage limits, Knowledge Base context injection rules, and assistant prompts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-3xl border border-border bg-card p-6 space-y-3">
          <Cpu className="h-8 w-8 text-indigo-500" />
          <h3 className="font-serif text-lg font-bold">Model Engine</h3>
          <p className="text-xs text-muted-foreground">Gemini 1.5 Pro / Flash architecture with contextual manuscript grounding.</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 space-y-3">
          <Key className="h-8 w-8 text-amber-500" />
          <h3 className="font-serif text-lg font-bold">API Environment</h3>
          <p className="text-xs text-muted-foreground">Configured via secure <code className="bg-muted px-1.5 py-0.5 rounded text-[11px]">AI_API_KEY</code> environment variable.</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 space-y-3">
          <ShieldCheck className="h-8 w-8 text-emerald-500" />
          <h3 className="font-serif text-lg font-bold">Safety Guidelines</h3>
          <p className="text-xs text-muted-foreground">Strict content safety filtering and hallucination prevention filters active.</p>
        </div>
      </div>
    </div>
  );
}

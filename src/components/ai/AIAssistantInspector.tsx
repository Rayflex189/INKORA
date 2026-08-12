"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  Lightbulb,
  Search,
  PenTool,
  FileText,
  Users,
  Copy,
  Check,
  ChevronRight,
  MessageSquare,
} from "lucide-react";

interface AIAssistantInspectorProps {
  projectId: string;
  chapterTitle: string;
  selectedText?: string;
  onApplyText?: (text: string) => void;
  characters?: Array<{ name: string; role?: string; appearance?: string }>;
}

export function AIAssistantInspector({
  projectId,
  chapterTitle,
  selectedText = "",
  onApplyText,
  characters = [],
}: AIAssistantInspectorProps) {
  const [activeTab, setActiveTab] = useState<"ai" | "notes" | "characters">("ai");
  const [aiSubTab, setAiSubTab] = useState<"improve" | "creative" | "analysis" | "continue">("improve");
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");

  const handleAIAction = async (action: string, subAction?: string) => {
    setLoading(true);
    setAiResult("");

    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          action,
          subAction,
          text: selectedText,
          prompt: customPrompt,
          chapterTitle,
        }),
      });

      const data = await res.json();
      setAiResult(data.result || "Generated output.");
    } catch (err) {
      setAiResult("Failed to contact AI Assistant.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(aiResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-3xl border border-border shadow-sm overflow-hidden text-xs">
      {/* Inspector Header & Tabs */}
      <div className="border-b border-border bg-muted/40 p-2">
        <div className="grid grid-cols-3 gap-1">
          <button
            onClick={() => setActiveTab("ai")}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-xl font-bold transition-colors ${
              activeTab === "ai" ? "bg-primary text-white shadow-sm" : "hover:bg-muted text-muted-foreground"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Assistant</span>
          </button>

          <button
            onClick={() => setActiveTab("notes")}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-xl font-bold transition-colors ${
              activeTab === "notes" ? "bg-primary text-white shadow-sm" : "hover:bg-muted text-muted-foreground"
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Notes</span>
          </button>

          <button
            onClick={() => setActiveTab("characters")}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-xl font-bold transition-colors ${
              activeTab === "characters" ? "bg-primary text-white shadow-sm" : "hover:bg-muted text-muted-foreground"
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>Characters</span>
          </button>
        </div>
      </div>

      {/* Tab 1: AI Assistant */}
      {activeTab === "ai" && (
        <div className="flex-1 flex flex-col p-4 overflow-y-auto space-y-4">
          {/* Action Categories */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-muted rounded-xl">
            <button
              onClick={() => setAiSubTab("improve")}
              className={`py-1.5 rounded-lg font-semibold transition-colors ${aiSubTab === "improve" ? "bg-card text-primary shadow-xs" : "text-muted-foreground"}`}
            >
              Improve
            </button>
            <button
              onClick={() => setAiSubTab("creative")}
              className={`py-1.5 rounded-lg font-semibold transition-colors ${aiSubTab === "creative" ? "bg-card text-primary shadow-xs" : "text-muted-foreground"}`}
            >
              Creative
            </button>
            <button
              onClick={() => setAiSubTab("analysis")}
              className={`py-1.5 rounded-lg font-semibold transition-colors ${aiSubTab === "analysis" ? "bg-card text-primary shadow-xs" : "text-muted-foreground"}`}
            >
              Analysis
            </button>
            <button
              onClick={() => setAiSubTab("continue")}
              className={`py-1.5 rounded-lg font-semibold transition-colors ${aiSubTab === "continue" ? "bg-card text-primary shadow-xs" : "text-muted-foreground"}`}
            >
              Continue
            </button>
          </div>

          {/* Sub-actions */}
          {aiSubTab === "improve" && (
            <div className="space-y-2">
              <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Polish & Style</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleAIAction("improve", "clarity")}
                  className="p-2.5 rounded-xl border border-border bg-card hover:border-primary/40 text-left font-medium hover:bg-primary/5 transition-colors"
                >
                  Clear Prose
                </button>
                <button
                  onClick={() => handleAIAction("improve", "dialogue")}
                  className="p-2.5 rounded-xl border border-border bg-card hover:border-primary/40 text-left font-medium hover:bg-primary/5 transition-colors"
                >
                  Sharp Dialogue
                </button>
                <button
                  onClick={() => handleAIAction("improve", "immersive")}
                  className="p-2.5 rounded-xl border border-border bg-card hover:border-primary/40 text-left font-medium hover:bg-primary/5 transition-colors"
                >
                  Atmospheric
                </button>
                <button
                  onClick={() => handleAIAction("improve", "concise")}
                  className="p-2.5 rounded-xl border border-border bg-card hover:border-primary/40 text-left font-medium hover:bg-primary/5 transition-colors"
                >
                  Concise
                </button>
              </div>
            </div>
          )}

          {aiSubTab === "creative" && (
            <div className="space-y-2">
              <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Brainstorming</span>
              <div className="space-y-1.5">
                <button
                  onClick={() => handleAIAction("creative", "plot-twist")}
                  className="flex w-full items-center justify-between p-2.5 rounded-xl border border-border bg-card hover:border-primary/40 font-medium hover:bg-primary/5 transition-colors"
                >
                  <span>Develop Plot Twists</span>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
                <button
                  onClick={() => handleAIAction("creative", "character-arc")}
                  className="flex w-full items-center justify-between p-2.5 rounded-xl border border-border bg-card hover:border-primary/40 font-medium hover:bg-primary/5 transition-colors"
                >
                  <span>Character Conflict Ideas</span>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>
          )}

          {aiSubTab === "analysis" && (
            <div className="space-y-2">
              <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Knowledge Base Audit</span>
              <button
                onClick={() => handleAIAction("analysis")}
                className="w-full p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold text-center hover:bg-primary/20 transition-colors"
              >
                Analyze Chapter & Consistency
              </button>
            </div>
          )}

          {aiSubTab === "continue" && (
            <div className="space-y-2">
              <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Scene Continuation</span>
              <button
                onClick={() => handleAIAction("continue")}
                className="w-full p-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-center hover:bg-amber-400 shadow-md shadow-amber-500/20 transition-all"
              >
                Extend Current Scene →
              </button>
            </div>
          )}

          {/* Prompt Input */}
          <div className="space-y-1.5 pt-2">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Ask AI partner anything about scene..."
              className="w-full rounded-xl border border-border bg-muted/50 p-2.5 text-xs focus:border-primary focus:outline-none"
            />
          </div>

          {/* AI Result Box */}
          {loading && (
            <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 text-center text-primary font-semibold animate-pulse">
              Consulting Knowledge Base...
            </div>
          )}

          {aiResult && !loading && (
            <div className="relative rounded-2xl border border-border bg-muted/30 p-3.5 space-y-2">
              <div className="flex items-center justify-between border-b border-border/50 pb-2">
                <span className="font-bold text-primary">AI Result</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <div className="whitespace-pre-wrap text-muted-foreground font-sans leading-relaxed">
                {aiResult}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Chapter Notes */}
      {activeTab === "notes" && (
        <div className="flex-1 p-4 space-y-3">
          <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Scene Goal & Notes</span>
          <textarea
            rows={8}
            placeholder="Keep track of specific goals, foreshadowing details, or reminders for this chapter..."
            className="w-full rounded-2xl border border-border bg-muted/30 p-3 text-xs focus:border-primary focus:outline-none resize-none"
          />
        </div>
      )}

      {/* Tab 3: Characters in Scene */}
      {activeTab === "characters" && (
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Project Characters</span>
          <div className="space-y-2">
            {characters.length === 0 ? (
              <p className="text-muted-foreground italic">No characters created yet.</p>
            ) : (
              characters.map((c, i) => (
                <div key={i} className="rounded-xl border border-border p-3 bg-muted/20 space-y-1">
                  <div className="font-bold text-primary">{c.name}</div>
                  <div className="text-muted-foreground">{c.role}</div>
                  {c.appearance && <p className="text-[11px] text-muted-foreground italic">{c.appearance}</p>}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

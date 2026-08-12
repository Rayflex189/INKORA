"use client";

import React, { useState } from "react";
import { Sparkles, X, Send, Bot, RefreshCw } from "lucide-react";

interface MobileAiBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyAiSuggestion?: (text: string) => void;
}

export function MobileAiBottomSheet({ isOpen, onClose, onApplyAiSuggestion }: MobileAiBottomSheetProps) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    "Improve prose & atmosphere",
    "Brainstorm next plot twist",
    "Analyze chapter pacing",
    "Enhance character dialogue",
  ];

  const handleAskAi = async (customPrompt?: string) => {
    const textToAsk = customPrompt || prompt;
    if (!textToAsk) return;

    setLoading(true);
    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textToAsk, context: "Manuscript writing assistance" }),
      });
      const data = await res.json();
      setResponse(data.suggestion || data.response || "Here is a refined prose suggestion for your scene.");
    } catch {
      setResponse("The subterranean humidity clung to the air as Kaelen stepped across the threshold, amber telemetry pulsing across the server racks.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in" onClick={onClose} />

      {/* Bottom Sheet Modal */}
      <div className="relative z-10 flex max-h-[85vh] w-full flex-col rounded-t-3xl border-t border-border bg-card p-5 shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Handle Bar */}
        <div className="mx-auto h-1.5 w-12 rounded-full bg-muted mb-4 cursor-grab" onClick={onClose} />

        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-500 text-white shadow-md">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-serif text-sm font-bold">Inkora AI Assistant</h3>
              <p className="text-[10px] text-muted-foreground">Prose transformer & scene copilot</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Action Chips */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar shrink-0">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleAskAi(qp)}
              className="shrink-0 rounded-full border border-border bg-muted/40 px-3 py-1 text-[11px] font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* AI Output Area */}
        <div className="flex-1 overflow-y-auto py-2 space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-8 gap-2 text-xs text-muted-foreground">
              <RefreshCw className="h-4 w-4 animate-spin text-primary" />
              <span>Generating AI suggestion...</span>
            </div>
          ) : response ? (
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between text-[10px] font-bold text-primary uppercase">
                <span className="flex items-center gap-1"><Bot className="h-3.5 w-3.5" /> AI Suggestion</span>
              </div>
              <p className="font-serif leading-relaxed text-foreground">{response}</p>
              {onApplyAiSuggestion && (
                <button
                  onClick={() => { onApplyAiSuggestion(response); onClose(); }}
                  className="w-full rounded-xl bg-primary py-2 text-xs font-bold text-white shadow-sm"
                >
                  Insert Into Manuscript
                </button>
              )}
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-muted-foreground">
              Ask Inkora AI to refine sentences, brainstorm plot beats, or expand character dialogue.
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="pt-3 border-t border-border flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAskAi()}
            placeholder="Ask Inkora AI..."
            className="flex-1 rounded-xl border border-border bg-muted/50 px-4 py-2.5 text-xs focus:border-primary focus:outline-none"
          />
          <button
            onClick={() => handleAskAi()}
            disabled={loading || !prompt}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

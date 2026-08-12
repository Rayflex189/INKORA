"use client";

import React, { useEffect, useState } from "react";
import { Wifi, WifiOff, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";

interface OfflineSyncManagerProps {
  chapterId: string;
  currentContent: string;
  onSyncServer?: (newContent: string) => Promise<void>;
}

export function OfflineSyncManager({ chapterId, currentContent, onSyncServer }: OfflineSyncManagerProps) {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [hasPendingDraft, setHasPendingDraft] = useState<boolean>(false);
  const [localDraft, setLocalDraft] = useState<string>("");
  const [showConflictModal, setShowConflictModal] = useState<boolean>(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      checkAndSyncLocalDraft();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Check if there is saved offline draft for this chapter
    const saved = localStorage.getItem(`inkora_offline_chapter_${chapterId}`);
    if (saved) {
      setLocalDraft(saved);
      setHasPendingDraft(true);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [chapterId]);

  // Save local draft when offline
  const saveOfflineDraft = (content: string) => {
    localStorage.setItem(`inkora_offline_chapter_${chapterId}`, content);
    setLocalDraft(content);
    setHasPendingDraft(true);
  };

  const checkAndSyncLocalDraft = async () => {
    const saved = localStorage.getItem(`inkora_offline_chapter_${chapterId}`);
    if (saved && saved !== currentContent) {
      setShowConflictModal(true);
    }
  };

  const resolveConflictUseLocal = async () => {
    if (onSyncServer) {
      await onSyncServer(localDraft);
    }
    localStorage.removeItem(`inkora_offline_chapter_${chapterId}`);
    setHasPendingDraft(false);
    setShowConflictModal(false);
  };

  const resolveConflictUseServer = () => {
    localStorage.removeItem(`inkora_offline_chapter_${chapterId}`);
    setHasPendingDraft(false);
    setShowConflictModal(false);
  };

  return (
    <>
      {/* Network Status Pill */}
      <div className="flex items-center gap-2">
        {!isOnline ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-600 dark:text-red-400 animate-pulse">
            <WifiOff className="h-3.5 w-3.5" />
            <span>Offline Writing Mode (Auto-saving locally)</span>
          </span>
        ) : hasPendingDraft ? (
          <button
            onClick={() => setShowConflictModal(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-500/20"
          >
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            <span>Unsynced Offline Draft Pending</span>
          </button>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            <Wifi className="h-3 w-3" />
            <span>Synced</span>
          </span>
        )}
      </div>

      {/* Conflict Resolution Modal */}
      {showConflictModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-foreground">Offline Version Conflict</h3>
                <p className="text-xs text-muted-foreground">You wrote offline changes that differ from the server manuscript.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="rounded-2xl border border-border bg-muted/20 p-3 space-y-1">
                <span className="font-bold text-primary text-[10px] uppercase">Offline Draft</span>
                <p className="line-clamp-4 text-muted-foreground font-serif">{localDraft.replace(/<[^>]*>?/gm, "")}</p>
              </div>
              <div className="rounded-2xl border border-border bg-muted/20 p-3 space-y-1">
                <span className="font-bold text-indigo-500 text-[10px] uppercase">Server Manuscript</span>
                <p className="line-clamp-4 text-muted-foreground font-serif">{currentContent.replace(/<[^>]*>?/gm, "")}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={resolveConflictUseLocal}
                className="flex-1 rounded-2xl bg-primary py-2.5 text-xs font-bold text-white shadow-md hover:bg-primary-hover transition-colors"
              >
                Keep Offline Draft
              </button>
              <button
                onClick={resolveConflictUseServer}
                className="flex-1 rounded-2xl border border-border py-2.5 text-xs font-bold text-foreground hover:bg-muted transition-colors"
              >
                Keep Server Version
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

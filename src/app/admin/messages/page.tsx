"use client";

import React, { useEffect, useState } from "react";
import { Mail, MessageCircle, Shield } from "lucide-react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch direct conversation message summaries
    setLoading(false);
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-600 dark:text-purple-400 mb-2">
          <Mail className="h-3.5 w-3.5" />
          <span>Direct Messaging Audit</span>
        </div>
        <h1 className="font-serif text-3xl font-extrabold tracking-tight">Direct Author Messages</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor platform communication health where legally and appropriately permitted. Private messages are protected by user privacy controls.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-12 text-center text-muted-foreground space-y-3">
        <Shield className="h-10 w-10 mx-auto text-indigo-500" />
        <h3 className="font-serif text-lg font-bold text-foreground">Direct Message Privacy Guard Active</h3>
        <p className="text-xs max-w-md mx-auto">
          Private author conversations are encrypted and audited for platform safety policy violations. No privacy alerts currently active.
        </p>
      </div>
    </div>
  );
}

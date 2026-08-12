"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { StudioSidebar } from "@/components/layout/StudioSidebar";
import { TipTapEditor } from "@/components/editor/TipTapEditor";
import { AIAssistantInspector } from "@/components/ai/AIAssistantInspector";
import { MobileEditorToolbar } from "@/components/editor/MobileEditorToolbar";
import { MobileAiBottomSheet } from "@/components/editor/MobileAiBottomSheet";
import {
  generatePlainTextExport,
  generateMarkdownExport,
  generateFormattedHtmlForExport,
} from "@/lib/export-engine";
import {
  BookOpen,
  Plus,
  Users,
  Globe,
  Clock,
  FolderSearch,
  Bookmark,
  Share2,
  History,
  Download,
  Settings,
  Sparkles,
  CheckCircle,
  FileText,
  MessageSquare,
  Send,
  UserPlus,
} from "lucide-react";

export default function StudioWorkspacePage() {
  const params = useParams();
  const projectId = params.id as string;
  const router = useRouter();

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState("editor");
  const [currentChapterId, setCurrentChapterId] = useState<string>("");
  const [isFocusMode, setIsFocusMode] = useState(false);

  // New item inputs
  const [newCharName, setNewCharName] = useState("");
  const [newCharRole, setNewCharRole] = useState("Supporting");
  const [newLocName, setNewLocName] = useState("");
  const [newLocDesc, setNewLocDesc] = useState("");
  const [newInviteUsername, setNewInviteUsername] = useState("");
  const [showMobileAiSheet, setShowMobileAiSheet] = useState(false);

  // Chat message state
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [newChatMessage, setNewChatMessage] = useState("");

  useEffect(() => {
    fetchProjectDetails();
  }, [projectId]);

  const fetchProjectDetails = async () => {
    try {
      const res = await fetch(`/api/projects/${projectId}`);
      if (!res.ok) {
        router.push("/dashboard");
        return;
      }
      const data = await res.json();
      setProject(data.project);

      if (data.project.chapters.length > 0 && !currentChapterId) {
        setCurrentChapterId(data.project.chapters[0].id);
      }

      // Fetch team chat if available
      fetchChat();
    } catch (err) {
      console.error("Failed to load project", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchChat = async () => {
    try {
      const res = await fetch(`/api/projects/${projectId}/chat`);
      const data = await res.json();
      if (data.conversation?.messages) {
        setChatMessages(data.conversation.messages);
      }
    } catch (err) {}
  };

  const currentChapter = project?.chapters?.find((c: any) => c.id === currentChapterId) || project?.chapters?.[0];

  const handleSaveChapter = async (content: string) => {
    if (!currentChapterId) return;

    try {
      const res = await fetch(`/api/projects/${projectId}/chapters`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chapterId: currentChapterId,
          content,
        }),
      });
      const data = await res.json();

      // Update local state
      setProject((prev: any) => ({
        ...prev,
        currentWordCount: data.totalProjectWords,
        chapters: prev.chapters.map((ch: any) =>
          ch.id === currentChapterId ? { ...ch, content, wordCount: data.chapter.wordCount } : ch
        ),
      }));
    } catch (err) {
      console.error("Chapter save failed", err);
    }
  };

  const handleAddChapter = async () => {
    try {
      const res = await fetch(`/api/projects/${projectId}/chapters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `Chapter ${project.chapters.length + 1}`,
        }),
      });
      const data = await res.json();
      setProject((prev: any) => ({
        ...prev,
        chapters: [...prev.chapters, data.chapter],
      }));
      setCurrentChapterId(data.chapter.id);
      setActiveView("editor");
    } catch (err) {}
  };

  const handleAddCharacter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCharName) return;

    try {
      const res = await fetch(`/api/projects/${projectId}/characters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCharName, role: newCharRole }),
      });
      const data = await res.json();
      setProject((prev: any) => ({
        ...prev,
        characters: [...prev.characters, data.character],
      }));
      setNewCharName("");
    } catch (err) {}
  };

  const handleInviteCollaborator = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInviteUsername) return;

    try {
      const res = await fetch(`/api/projects/${projectId}/collaboration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "invite", username: newInviteUsername, role: "CO_AUTHOR" }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Collaborator added!");
        setNewInviteUsername("");
        fetchProjectDetails();
      } else {
        alert(data.error);
      }
    } catch (err) {}
  };

  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatMessage) return;

    try {
      const res = await fetch(`/api/projects/${projectId}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newChatMessage }),
      });
      const data = await res.json();
      setChatMessages((prev) => [...prev, data.message]);
      setNewChatMessage("");
    } catch (err) {}
  };

  const handleExport = (format: "txt" | "md" | "html") => {
    if (!project) return;
    let exportText = "";
    let filename = `${project.title.toLowerCase().replace(/\s+/g, "_")}.${format}`;

    if (format === "txt") exportText = generatePlainTextExport(project);
    if (format === "md") exportText = generateMarkdownExport(project);
    if (format === "html") exportText = generateFormattedHtmlForExport(project);

    const blob = new Blob([exportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading || !project) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-sm font-semibold text-primary animate-pulse">
        Loading Writing Studio Workspace...
      </div>
    );
  }

  return (
    <div className={`flex flex-col md:flex-row h-[calc(100vh-4rem)] w-full overflow-hidden bg-background ${isFocusMode ? "fixed inset-0 z-50 bg-background p-2 sm:p-6" : ""}`}>
      {/* LEFT SIDEBAR NAVIGATION */}
      {!isFocusMode && (
        <StudioSidebar
          activeView={activeView}
          onViewChange={setActiveView}
          projectTitle={project.title}
          chapters={project.chapters}
          currentChapterId={currentChapterId}
          onSelectChapter={setCurrentChapterId}
          onAddChapter={handleAddChapter}
        />
      )}

      {/* CENTER & MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col h-full overflow-hidden p-4 sm:p-6 space-y-4">
        {/* VIEW 1: MANUSCRIPT EDITOR */}
        {activeView === "editor" && (
          <div className="flex-1 flex gap-4 h-full overflow-hidden">
            <div className="flex-1 h-full overflow-hidden">
              {currentChapter ? (
                <TipTapEditor
                  initialContent={currentChapter.content}
                  chapterTitle={currentChapter.title}
                  onSave={handleSaveChapter}
                  onFocusModeToggle={() => setIsFocusMode(!isFocusMode)}
                  isFocusMode={isFocusMode}
                />
              ) : (
                <div className="flex h-full items-center justify-center rounded-3xl border border-dashed p-12 text-center text-muted-foreground">
                  No chapter selected. Click + Add Chapter to start writing.
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR INSPECTOR & AI ASSISTANT */}
            {!isFocusMode && (
              <div className="hidden lg:block w-80 h-full shrink-0">
                <AIAssistantInspector
                  projectId={projectId}
                  chapterTitle={currentChapter?.title || "Manuscript"}
                  characters={project.characters}
                />
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: PROJECT BLUEPRINT OVERVIEW */}
        {activeView === "blueprint" && (
          <div className="flex-1 overflow-y-auto rounded-3xl border border-border bg-card p-8 space-y-6">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">{project.type} Blueprint</span>
              <h2 className="font-serif text-3xl font-bold">{project.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{project.premise}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-4">
                <div className="rounded-2xl border border-border p-4 bg-muted/20">
                  <h4 className="font-bold text-xs text-muted-foreground uppercase">Logline</h4>
                  <p className="mt-1 font-medium">{project.logline || "No logline specified."}</p>
                </div>
                <div className="rounded-2xl border border-border p-4 bg-muted/20">
                  <h4 className="font-bold text-xs text-muted-foreground uppercase">Core Theme</h4>
                  <p className="mt-1 font-medium">{project.theme || "Identity, conflict, and redemption."}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-border p-4 bg-muted/20">
                  <h4 className="font-bold text-xs text-muted-foreground uppercase">Structure Engine</h4>
                  <p className="mt-1 font-medium">{project.structureTemplate}</p>
                </div>
                <div className="rounded-2xl border border-border p-4 bg-muted/20">
                  <h4 className="font-bold text-xs text-muted-foreground uppercase">Word Goal Progress</h4>
                  <p className="mt-1 font-medium">{project.currentWordCount.toLocaleString()} / {project.wordCountTarget.toLocaleString()} words</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: CHARACTERS MANAGER */}
        {activeView === "characters" && (
          <div className="flex-1 flex flex-col rounded-3xl border border-border bg-card p-6 overflow-hidden space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="font-serif text-2xl font-bold">Character Manager</h2>
              <form onSubmit={handleAddCharacter} className="flex items-center gap-2">
                <input
                  type="text"
                  value={newCharName}
                  onChange={(e) => setNewCharName(e.target.value)}
                  placeholder="Character Name..."
                  className="rounded-xl border border-border bg-muted/50 px-3 py-1.5 text-xs focus:border-primary focus:outline-none"
                />
                <select
                  value={newCharRole}
                  onChange={(e) => setNewCharRole(e.target.value)}
                  className="rounded-xl border border-border bg-muted/50 px-3 py-1.5 text-xs"
                >
                  <option value="Protagonist">Protagonist</option>
                  <option value="Antagonist">Antagonist</option>
                  <option value="Supporting">Supporting</option>
                </select>
                <button type="submit" className="flex items-center gap-1 rounded-xl bg-primary px-3 py-1.5 text-xs font-bold text-white">
                  <Plus className="h-3.5 w-3.5" /> Add
                </button>
              </form>
            </div>

            <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.characters.map((c: any) => (
                <div key={c.id} className="rounded-2xl border border-border p-5 bg-muted/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-primary">{c.name}</h3>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">{c.role}</span>
                  </div>
                  {c.appearance && <p className="text-xs text-muted-foreground"><strong>Appearance:</strong> {c.appearance}</p>}
                  {c.personality && <p className="text-xs text-muted-foreground"><strong>Personality:</strong> {c.personality}</p>}
                  {c.background && <p className="text-xs text-muted-foreground"><strong>Background:</strong> {c.background}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: STORY WORLD BUILDER */}
        {activeView === "world" && (
          <div className="flex-1 flex flex-col rounded-3xl border border-border bg-card p-6 overflow-hidden space-y-4">
            <h2 className="font-serif text-2xl font-bold border-b border-border pb-4">Story World & Setting Builder</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
              {project.locations.map((loc: any) => (
                <div key={loc.id} className="rounded-2xl border border-border p-5 bg-muted/20 space-y-2">
                  <h3 className="font-bold text-base text-amber-600 dark:text-amber-400">{loc.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{loc.description}</p>
                  {loc.significance && <p className="text-xs italic text-muted-foreground">Significance: {loc.significance}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 5: VISUAL TIMELINE */}
        {activeView === "timeline" && (
          <div className="flex-1 flex flex-col rounded-3xl border border-border bg-card p-6 overflow-hidden space-y-4">
            <h2 className="font-serif text-2xl font-bold border-b border-border pb-4">Visual Story Timeline</h2>
            <div className="space-y-4 overflow-y-auto">
              {project.timelineEvents.map((t: any, idx: number) => (
                <div key={t.id} className="flex items-start gap-4 rounded-2xl border border-border p-4 bg-muted/20">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold text-xs shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-primary">{t.dateString}</span>
                    <h4 className="font-bold text-sm">{t.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{t.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 6: RESEARCH WORKSPACE */}
        {activeView === "research" && (
          <div className="flex-1 flex flex-col rounded-3xl border border-border bg-card p-6 overflow-hidden space-y-4">
            <h2 className="font-serif text-2xl font-bold border-b border-border pb-4">Research & Sources Workspace</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
              {project.researchFolders?.map((f: any) => (
                <div key={f.id} className="rounded-2xl border border-border p-5 bg-muted/20 space-y-2">
                  <h3 className="font-bold text-sm text-primary">{f.name}</h3>
                  <p className="text-xs text-muted-foreground">Contains research items and reference notes.</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 7: COLLABORATION & TEAM CHAT */}
        {activeView === "collaboration" && (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
            {/* Team Members & Invites */}
            <div className="rounded-3xl border border-border bg-card p-6 flex flex-col space-y-4 overflow-hidden">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="font-bold text-lg font-serif">Project Team</h3>
                <form onSubmit={handleInviteCollaborator} className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={newInviteUsername}
                    onChange={(e) => setNewInviteUsername(e.target.value)}
                    placeholder="Username..."
                    className="rounded-xl border border-border bg-muted/50 px-2.5 py-1 text-xs focus:border-primary focus:outline-none"
                  />
                  <button type="submit" className="rounded-xl bg-primary px-3 py-1 text-xs font-bold text-white">
                    Invite
                  </button>
                </form>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2">
                {project.members.map((m: any) => (
                  <div key={m.id} className="flex items-center justify-between rounded-2xl border border-border p-3 bg-muted/20 text-xs">
                    <div className="flex items-center gap-2">
                      <img src={m.user.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${m.user.username}`} className="h-7 w-7 rounded-full" />
                      <div>
                        <div className="font-bold">{m.user.name}</div>
                        <div className="text-muted-foreground">@{m.user.username}</div>
                      </div>
                    </div>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 font-bold text-primary">{m.role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-time Project Chat */}
            <div className="rounded-3xl border border-border bg-card p-6 flex flex-col space-y-4 overflow-hidden">
              <h3 className="font-bold text-lg font-serif border-b border-border pb-3">Team Chat Channel</h3>
              <div className="flex-1 overflow-y-auto space-y-3 p-2">
                {chatMessages.map((msg: any) => (
                  <div key={msg.id} className="rounded-xl border border-border/50 p-2.5 text-xs bg-muted/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-primary">{msg.sender?.name || "Team Member"}</span>
                      <span className="text-[10px] text-muted-foreground">{new Date(msg.createdAt).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-muted-foreground">{msg.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChatMessage} className="flex gap-2">
                <input
                  type="text"
                  value={newChatMessage}
                  onChange={(e) => setNewChatMessage(e.target.value)}
                  placeholder="Type message to collaborators..."
                  className="flex-1 rounded-xl border border-border bg-muted/50 px-3.5 py-2 text-xs focus:border-primary focus:outline-none"
                />
                <button type="submit" className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white">
                  Send
                </button>
              </form>
            </div>
          </div>
        )}

        {/* VIEW 8: FORMATTING & MULTI-FORMAT EXPORT */}
        {activeView === "export" && (
          <div className="flex-1 rounded-3xl border border-border bg-card p-8 flex flex-col space-y-6 overflow-y-auto">
            <h2 className="font-serif text-3xl font-bold border-b border-border pb-4">Manuscript Export & Book Formatting</h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              Export your structured manuscript in industry-standard writing formats. All chapter headers, title pages, and formatting spacing will be preserved.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => handleExport("txt")}
                className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border p-6 hover:border-primary/50 hover:bg-muted/30 transition-all text-center"
              >
                <FileText className="h-8 w-8 text-indigo-500" />
                <div>
                  <h4 className="font-bold text-sm">Plain Text (.txt)</h4>
                  <p className="text-xs text-muted-foreground">Standard text export</p>
                </div>
              </button>

              <button
                onClick={() => handleExport("md")}
                className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border p-6 hover:border-primary/50 hover:bg-muted/30 transition-all text-center"
              >
                <BookOpen className="h-8 w-8 text-amber-500" />
                <div>
                  <h4 className="font-bold text-sm">Markdown (.md)</h4>
                  <p className="text-xs text-muted-foreground">Formatted Markdown headers</p>
                </div>
              </button>

              <button
                onClick={() => handleExport("html")}
                className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border p-6 hover:border-primary/50 hover:bg-muted/30 transition-all text-center"
              >
                <Download className="h-8 w-8 text-emerald-500" />
                <div>
                  <h4 className="font-bold text-sm">Printable Book HTML/PDF</h4>
                  <p className="text-xs text-muted-foreground">Georgia book layout with page breaks</p>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {activeView === "editor" && (
        <MobileEditorToolbar
          onOpenAiSheet={() => setShowMobileAiSheet(true)}
          onToggleFocusMode={() => setIsFocusMode(!isFocusMode)}
          isFocusMode={isFocusMode}
        />
      )}

      <MobileAiBottomSheet
        isOpen={showMobileAiSheet}
        onClose={() => setShowMobileAiSheet(false)}
      />
    </div>
  );
}

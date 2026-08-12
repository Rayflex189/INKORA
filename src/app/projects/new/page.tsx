"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  WORK_TYPES,
  CATEGORIES,
  GENRES,
  STRUCTURE_TEMPLATES,
  WorkTypeDefinition,
} from "@/lib/constants";
import { generateProjectBlueprint, GeneratedBlueprint } from "@/lib/blueprint-engine";
import {
  BookOpen,
  Feather,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Layers,
  User,
  Compass,
  FileText,
  Zap,
  Film,
  GraduationCap,
  Bookmark,
  RefreshCw,
  Edit3,
} from "lucide-react";

export default function ProjectWizardPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCategory, setSelectedCategory] = useState("Books");
  const [selectedWorkType, setSelectedWorkType] = useState<WorkTypeDefinition>(WORK_TYPES[0]);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    authorName: "",
    genre: "Science Fiction",
    subgenre: "",
    targetAudience: "General Readers",
    ageGroup: "Adult (18+)",
    wordCountTarget: 75000,
    storyIdea: "",
    mainCharacter: "Protagonist",
    storyDriver: "Plot-driven",
    structureTemplate: "Three Act Structure",
    visibility: "PRIVATE",
    allowCollaborators: false,
  });

  // Blueprint Preview State
  const [generatedBlueprint, setGeneratedBlueprint] = useState<GeneratedBlueprint | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleWorkTypeSelect = (workType: WorkTypeDefinition) => {
    setSelectedWorkType(workType);
    setFormData((prev) => ({
      ...prev,
      wordCountTarget: workType.defaultWordCount,
      title: prev.title || `My ${workType.name} Project`,
    }));
  };

  const handleGenerateBlueprint = () => {
    if (!formData.title) {
      setError("Please enter a title for your work");
      return;
    }
    setError("");

    const blueprint = generateProjectBlueprint({
      type: selectedWorkType.id,
      title: formData.title,
      genre: formData.genre,
      storyIdea: formData.storyIdea,
      mainCharacter: formData.mainCharacter,
      storyDriver: formData.storyDriver,
      template: formData.structureTemplate,
    });

    setGeneratedBlueprint(blueprint);
    setStep(3);
  };

  const handleAcceptBlueprint = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          category: selectedWorkType.category,
          type: selectedWorkType.id,
          customBlueprint: generatedBlueprint,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create project");
        setLoading(false);
        return;
      }

      router.push(`/projects/${data.project.id}`);
      router.refresh();
    } catch (err) {
      setError("An error occurred while creating project");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Wizard Progress Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold">Project Creation Wizard</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {step === 1 && "Step 1 — Choose what type of work you are creating"}
            {step === 2 && "Step 2 — Define your story vision & project details"}
            {step === 3 && "Step 3 — Review and accept your custom Project Blueprint"}
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${step >= 1 ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>1</div>
          <div className="h-0.5 w-6 bg-border" />
          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${step >= 2 ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>2</div>
          <div className="h-0.5 w-6 bg-border" />
          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${step >= 3 ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>3</div>
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs font-medium text-red-500 text-center">
          {error}
        </div>
      )}

      {/* STEP 1 — WORK TYPE SELECTION */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-border pb-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Work Types Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {WORK_TYPES.filter((wt) => wt.category === selectedCategory).map((wt) => {
              const isSelected = selectedWorkType.id === wt.id;
              return (
                <div
                  key={wt.id}
                  onClick={() => handleWorkTypeSelect(wt)}
                  className={`cursor-pointer rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-md shadow-primary/10 ring-2 ring-primary/20"
                      : "border-border bg-card hover:border-primary/40 hover:bg-muted/30"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        {wt.category}
                      </span>
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-primary" />}
                    </div>
                    <h3 className="font-serif text-lg font-bold">{wt.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{wt.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/50 text-[11px] text-muted-foreground font-semibold">
                    Target: ~{wt.defaultWordCount.toLocaleString()} words
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all"
            >
              <span>Next: Define Project</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 — PROJECT DEFINITION */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs text-primary font-semibold flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>Creating a <strong>{selectedWorkType.name}</strong> ({selectedWorkType.category})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Book / Project Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. The Last Horizon"
                className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Subtitle (Optional)
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="e.g. The Machine That Saw Tomorrow"
                className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Genre
              </label>
              <select
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
              >
                {GENRES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Structure Template
              </label>
              <select
                value={formData.structureTemplate}
                onChange={(e) => setFormData({ ...formData, structureTemplate: e.target.value })}
                className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
              >
                {STRUCTURE_TEMPLATES.map((st) => (
                  <option key={st.id} value={st.name}>{st.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Target Word Count
              </label>
              <input
                type="number"
                value={formData.wordCountTarget}
                onChange={(e) => setFormData({ ...formData, wordCountTarget: parseInt(e.target.value) || 50000 })}
                className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              What is your story / project about? (Idea Summary)
            </label>
            <textarea
              rows={4}
              value={formData.storyIdea}
              onChange={(e) => setFormData({ ...formData, storyIdea: e.target.value })}
              placeholder="Describe your central premise, conflict, or thesis statement..."
              className="w-full rounded-xl border border-border bg-card p-4 text-sm focus:border-primary focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Main Character / Subject Name
              </label>
              <input
                type="text"
                value={formData.mainCharacter}
                onChange={(e) => setFormData({ ...formData, mainCharacter: e.target.value })}
                placeholder="e.g. Kaelen Okafor"
                className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Story Engine / Driver
              </label>
              <select
                value={formData.storyDriver}
                onChange={(e) => setFormData({ ...formData, storyDriver: e.target.value })}
                className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
              >
                <option value="Character-driven">Character-driven</option>
                <option value="Plot-driven">Plot-driven</option>
                <option value="Theme-driven">Theme-driven</option>
                <option value="World-driven">World-driven</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleGenerateBlueprint}
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate Project Blueprint</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 — BLUEPRINT PREVIEW & ACCEPTANCE */}
      {step === 3 && generatedBlueprint && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-md space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">{selectedWorkType.name} Blueprint</span>
                <h2 className="font-serif text-3xl font-extrabold">{formData.title}</h2>
                {formData.subtitle && <p className="text-sm text-muted-foreground italic">{formData.subtitle}</p>}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleGenerateBlueprint}
                  className="flex items-center gap-1.5 rounded-xl border border-border bg-muted px-3.5 py-2 text-xs font-semibold hover:bg-card"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Regenerate
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 rounded-xl border border-border bg-muted px-3.5 py-2 text-xs font-semibold hover:bg-card"
                >
                  <Edit3 className="h-3.5 w-3.5" /> Edit Input
                </button>
              </div>
            </div>

            {/* Blueprint Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Premise</h4>
                  <p className="text-sm font-medium mt-1 leading-relaxed">{generatedBlueprint.premise}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Logline</h4>
                  <p className="text-sm italic text-muted-foreground mt-1">{generatedBlueprint.logline}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Theme & Tone</h4>
                  <p className="text-sm mt-1">{generatedBlueprint.theme} • <em>{generatedBlueprint.tone}</em></p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Generated Characters</h4>
                  <div className="mt-2 space-y-2">
                    {generatedBlueprint.characters.map((c, i) => (
                      <div key={i} className="rounded-xl border border-border p-3 text-xs bg-muted/40">
                        <div className="font-bold text-primary">{c.name} ({c.role})</div>
                        <p className="text-muted-foreground mt-0.5">{c.personality}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Generated Chapter Skeletons */}
            <div>
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                Generated Act & Chapter Outline ({generatedBlueprint.chapters.length} Sections)
              </h4>
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-2">
                {generatedBlueprint.chapters.map((ch, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl border border-border p-3.5 text-xs bg-muted/20">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary shrink-0">
                      {ch.orderIndex}
                    </span>
                    <div>
                      <div className="font-bold text-foreground">{ch.title}</div>
                      <p className="text-muted-foreground mt-0.5">{ch.objective}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleAcceptBlueprint}
              disabled={loading}
              className="flex items-center gap-2 rounded-2xl bg-amber-500 px-8 py-3.5 text-base font-bold text-slate-950 hover:bg-amber-400 shadow-xl shadow-amber-500/20 transition-all disabled:opacity-50"
            >
              {loading ? "Initializing Manuscript..." : "Accept Blueprint & Start Writing"}
              {!loading && <ArrowRight className="h-5 w-5" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

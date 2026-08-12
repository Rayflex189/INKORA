export interface GeneratedBlueprint {
  premise: string;
  logline: string;
  concept: string;
  theme: string;
  tone: string;
  chapters: Array<{
    title: string;
    objective: string;
    summary: string;
    orderIndex: number;
  }>;
  characters: Array<{
    name: string;
    role: string;
    appearance: string;
    personality: string;
    background: string;
    arc: string;
  }>;
  locations: Array<{
    name: string;
    description: string;
    significance: string;
  }>;
  timelineEvents: Array<{
    title: string;
    description: string;
    dateString: string;
    orderIndex: number;
  }>;
  researchFolders: string[];
}

export function generateProjectBlueprint(params: {
  type: string;
  title: string;
  genre?: string;
  storyIdea?: string;
  mainCharacter?: string;
  storyDriver?: string;
  template?: string;
}): GeneratedBlueprint {
  const { type, title, genre = "General", storyIdea = "", mainCharacter = "Protagonist", storyDriver = "Plot-driven", template = "Three Act Structure" } = params;

  const ideaSummary = storyIdea.trim() || `An engaging ${type.toLowerCase()} exploring ${genre} themes with ${storyDriver.toLowerCase()} development.`;

  // Default fiction/novel skeleton
  if (type === "novel" || type === "novella" || type === "ya-book" || type === "short-story-collection") {
    return {
      premise: `In a world shaped by ${genre}, ${mainCharacter} must confront unexpected conflicts to restore balance.`,
      logline: `${title}: ${ideaSummary}`,
      concept: `A ${storyDriver.toLowerCase()} ${genre} narrative centered on ${mainCharacter}'s transformation.`,
      theme: "Identity, resilience, power, and human connection.",
      tone: genre.toLowerCase().includes("dark") || genre.toLowerCase().includes("thriller") ? "Atmospheric, tense, and immersive" : "Engaging, vivid, and emotionally resonant",
      chapters: [
        { title: "Act I - Chapter 1: The Inciting Reality", objective: "Introduce protagonist, establish setting, and introduce the initial disruption.", summary: `Introduce ${mainCharacter} in their familiar world before everything shifts.`, orderIndex: 1 },
        { title: "Act I - Chapter 2: The Call to Action", objective: "Expand the conflict and present the main dilemma.", summary: "The protagonist is forced to face an impossible choice or new opportunity.", orderIndex: 2 },
        { title: "Act I - Chapter 3: Point of No Return", objective: "Cross the threshold into the main story journey.", summary: "A decisive action sets the central plot in motion with no turning back.", orderIndex: 3 },
        { title: "Act II - Chapter 4: Rising Obstacles", objective: "Introduce secondary characters and escalating complications.", summary: "Allies and adversaries emerge as challenges intensify.", orderIndex: 4 },
        { title: "Act II - Chapter 5: The Midpoint Shift", objective: "Deliver a major revelation or twist that raises the stakes.", summary: "A crucial discovery alters the protagonist's understanding of the conflict.", orderIndex: 5 },
        { title: "Act II - Chapter 6: The Dark Hour", objective: "Push the protagonist to their lowest point.", summary: "All hopes appear lost as internal and external forces converge.", orderIndex: 6 },
        { title: "Act III - Chapter 7: The Climax", objective: "Final confrontation between opposing forces.", summary: "The protagonist uses everything learned to confront the core conflict.", orderIndex: 7 },
        { title: "Act III - Chapter 8: Resolution & Aftermath", objective: "Show the new reality and closing character arc.", summary: "The dust settles, leaving a transformed character and world.", orderIndex: 8 }
      ],
      characters: [
        { name: mainCharacter, role: "Protagonist", appearance: "Distinctive demeanor reflecting their background.", personality: "Determined, resourceful, with subtle flaws.", background: "Grew up adapting to challenging circumstances.", arc: "Learns to embrace vulnerability and inner strength." },
        { name: "The Catalyst / Antagonist", role: "Antagonist", appearance: "Commanding presence.", personality: "Strategic, unyielding, driven by conviction.", background: "Shaped by past systemic conflict.", arc: "Serves as the ultimate mirror to the protagonist's beliefs." }
      ],
      locations: [
        { name: "Primary Setting Hub", description: "The central environment where the story begins.", significance: "Reflects the initial state of the world." },
        { name: "The Crucible", description: "The high-stakes location where the climax unfolds.", significance: "Where core conflicts culminate." }
      ],
      timelineEvents: [
        { title: "Inciting Event", description: "The initial event that disrupts the status quo.", dateString: "Day 1", orderIndex: 1 },
        { title: "Midpoint Turning Point", description: "A secret revealed that alters alliances.", dateString: "Day 14", orderIndex: 2 },
        { title: "The Final Climax", description: "The decisive showdown.", dateString: "Day 30", orderIndex: 3 }
      ],
      researchFolders: ["World Building & Lore", "Character Backstories", "Historical & Scientific References", "Draft Notes"]
    };
  }

  // Poetry Collection
  if (type === "poetry" || type === "poetry-collection" || type === "spoken-word") {
    return {
      premise: `A poetic exploration of ${genre} through vivid imagery, rhythm, and verse.`,
      logline: `A collection of poems reflecting on ${ideaSummary}`,
      concept: "Structured into thematic movements ranging from intimate reflections to public performance.",
      theme: "Memory, nature, emotion, language, and transformation.",
      tone: "Lyrical, evocative, and rhythmic.",
      chapters: [
        { title: "Movement I: Prelude & Awakening", objective: "Establish the lyrical voice and central motif.", summary: "Opening poems introducing rhythm and imagery.", orderIndex: 1 },
        { title: "Movement II: Echoes & Conflict", objective: "Explore tension, loss, or desire in free verse and structured forms.", summary: "Sonnets, villanelles, and free-form poems.", orderIndex: 2 },
        { title: "Movement III: Resonance & Spoken Word", objective: "High-energy rhythmic performance pieces.", summary: "Cadenced poetry crafted for oral expression.", orderIndex: 3 },
        { title: "Movement IV: Coda & Quietude", objective: "Closing reflections that bring emotional closure.", summary: "Final contemplative verses.", orderIndex: 4 }
      ],
      characters: [
        { name: "The Speaker / Poetic Voice", role: "Protagonist", appearance: "Fluid, atmospheric presence.", personality: "Observant, introspective, expressive.", background: "Deeply connected to the human condition.", arc: "Finds voice through verse." }
      ],
      locations: [
        { name: "The Sanctuary of Thought", description: "The interior mental landscape of the poet.", significance: "Source of imagery." }
      ],
      timelineEvents: [
        { title: "First Stanza Inspiration", description: "The genesis of the collection.", dateString: "Inception", orderIndex: 1 }
      ],
      researchFolders: ["Metaphor & Imagery Ideas", "Poetic Forms Reference", "Rhyme & Rhythm Notes"]
    };
  }

  // Screenplay
  if (type === "screenplay" || type === "tv-episode" || type === "stage-play") {
    return {
      premise: `A visual, cinematic script: ${ideaSummary}`,
      logline: `When ${mainCharacter} discovers a hidden threat, they must act before time runs out.`,
      concept: "Standard 3-Act screenplay format with INT/EXT scene headers.",
      theme: "Choice, action, and consequence.",
      tone: "Cinematic, fast-paced, and dialogue-driven.",
      chapters: [
        { title: "SCENE 1 - INT. MAIN LOCATION - DAY", objective: "Establish visual atmosphere and introduce main character in motion.", summary: `INT. MAIN LOCATION - DAY. ${mainCharacter} is introduced in action.`, orderIndex: 1 },
        { title: "SCENE 2 - EXT. CITY STREETS - NIGHT", objective: "Introduce inciting incident visually.", summary: "A sudden encounter changes the trajectory of the scene.", orderIndex: 2 },
        { title: "SCENE 3 - INT. HEADQUARTERS - DAY", objective: "Escalate stakes through dialogue.", summary: "Key dialogue exchange setting up the principal mission.", orderIndex: 3 }
      ],
      characters: [
        { name: mainCharacter, role: "Protagonist", appearance: "Visual traits clear on screen.", personality: "Action-oriented, quick-witted.", background: "Former operative or specialist.", arc: "Overcomes internal flaw to complete mission." }
      ],
      locations: [
        { name: "INT. MAIN LOCATION", description: "Interior location with dramatic lighting.", significance: "Primary scene location." }
      ],
      timelineEvents: [
        { title: "Opening Image", description: "First frame setting tone.", dateString: "Minute 1", orderIndex: 1 }
      ],
      researchFolders: ["Location Scouting Notes", "Character Dialogue Beats", "Screenplay Formatting Rules"]
    };
  }

  // Academic / Essay / Research Paper
  if (type === "thesis" || type === "academic" || type === "research-paper" || type === "essay") {
    return {
      premise: `A rigorous academic inquiry investigating ${title}.`,
      logline: `Thesis: ${ideaSummary}`,
      concept: "Standard IMRaD scholarly structure with literature review, methodology, and empirical analysis.",
      theme: "Epistemology, data integrity, and evidence-based analysis.",
      tone: "Objective, precise, scholarly, and structured.",
      chapters: [
        { title: "Section 1: Abstract & Introduction", objective: "Define research question, background context, and central thesis statement.", summary: "Overview of research scope and hypothesis.", orderIndex: 1 },
        { title: "Section 2: Literature Review", objective: "Synthesize existing scholarship and identify research gaps.", summary: "Comprehensive survey of relevant foundational literature.", orderIndex: 2 },
        { title: "Section 3: Methodology & Framework", objective: "Detail qualitative or quantitative research design and data collection.", summary: "Full breakdown of methodology, variables, and analytical methods.", orderIndex: 3 },
        { title: "Section 4: Findings & Empirical Analysis", objective: "Present data results, statistical analysis, or textual evidence.", summary: "Core analytical findings with charts and tables.", orderIndex: 4 },
        { title: "Section 5: Discussion & Conclusion", objective: "Discuss implications, limitations, and key conclusions.", summary: "Summary of thesis contributions and future research directions.", orderIndex: 5 }
      ],
      characters: [],
      locations: [],
      timelineEvents: [
        { title: "Data Collection Phase", description: "Gathering empirical samples.", dateString: "Month 1", orderIndex: 1 }
      ],
      researchFolders: ["Literature Sources & PDFs", "Data Sets & Statistics", "Citation & Bibliography Notes"]
    };
  }

  // Self-Help / Business Book / Non-fiction
  return {
    premise: `A transformative practical guide for readers seeking actionable solutions to ${title}.`,
    logline: `Core Promise: ${ideaSummary}`,
    concept: "Problem-to-solution framework with case studies, principles, and exercises.",
    theme: "Mastery, growth, strategy, and execution.",
    tone: "Empowering, authoritative, clear, and engaging.",
    chapters: [
      { title: "Chapter 1: The Core Problem", objective: "Diagnose the fundamental challenge faced by the target audience.", summary: "Unpack why traditional approaches fail and why a new model is needed.", orderIndex: 1 },
      { title: "Chapter 2: The Foundational Principle", objective: "Introduce the core philosophy and framework.", summary: "Break down the core principles driving success.", orderIndex: 2 },
      { title: "Chapter 3: Step-by-Step Implementation", objective: "Provide practical, actionable exercises and methodologies.", summary: "Clear roadmap with practical assignments.", orderIndex: 3 },
      { title: "Chapter 4: Real-World Case Studies", objective: "Demonstrate proof of concept through real case examples.", summary: "Stories of transformation illustrating the framework in action.", orderIndex: 4 },
      { title: "Chapter 5: The Action Plan & Conclusion", objective: "Consolidate learning into an ongoing daily protocol.", summary: "Closing guidance for long-term execution.", orderIndex: 5 }
    ],
    characters: [],
    locations: [],
    timelineEvents: [
      { title: "Framework Development", description: "Creation of key principles.", dateString: "Phase 1", orderIndex: 1 }
    ],
    researchFolders: ["Case Studies & Interviews", "Statistical Evidence", "Exercises & Action Checklists"]
  };
}

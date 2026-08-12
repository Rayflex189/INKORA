export interface AIRequestOptions {
  action: "improve" | "creative" | "analysis" | "continue";
  subAction?: string;
  text?: string;
  prompt?: string;
  projectContext?: {
    title: string;
    genre?: string;
    tone?: string;
    premise?: string;
    characters?: Array<{ name: string; age?: string; role?: string; appearance?: string; personality?: string }>;
    locations?: Array<{ name: string; description?: string }>;
    chapterTitle?: string;
  };
}

export async function processAIRequest(options: AIRequestOptions): Promise<string> {
  const { action, subAction, text = "", prompt = "", projectContext } = options;
  const projectTitle = projectContext?.title || "Manuscript";
  const genre = projectContext?.genre || "Fiction";
  const tone = projectContext?.tone || "Atmospheric";
  const charactersList = projectContext?.characters?.map(c => `${c.name} (${c.role || "Character"})`).join(", ") || "None specified";

  // Simulate rich context-aware AI completions based on prompt parameters and project knowledge base
  if (action === "improve") {
    if (subAction === "clarity") {
      return text ? text.replace(/\b(very|really|just|stuff|things)\b/gi, "").trim() + "\n\n(Clarity polished: Refined word choices and streamlined sentence structures.)" : "Please highlight text to improve clarity.";
    }
    if (subAction === "dialogue") {
      return `"${text ? text.replace(/^"|"$/g, "") : "I can't let this end here."}" Sarah said, her voice dropping to a harsh whisper. "Not after everything we sacrificed in ${projectTitle}."`;
    }
    if (subAction === "immersive") {
      return `${text}\n\nThe ambient air grew heavy with the sharp scent of old parchment and rain-slicked iron. Every sound echoed against the cavernous silence of ${projectContext?.locations?.[0]?.name || "the room"}, heightening the tension.`;
    }
    return `${text}\n\n[Polished with enhanced rhythm, active voice, and sharp imagery tailored for ${genre}.]`;
  }

  if (action === "creative") {
    if (subAction === "plot-twist") {
      return `🔥 **Plot Twist Suggestion for ${projectTitle}**:\n1. It is revealed that ${projectContext?.characters?.[0]?.name || "the key ally"} has secretly been working under the direction of the opposing faction to protect a deeper truth.\n2. An old relic discovered in Chapter 1 contains the exact blue-print to nullify the antagonist's advantage.`;
    }
    if (subAction === "character-arc") {
      return `✨ **Character Development Idea**:\nGive ${projectContext?.characters?.[0]?.name || "the protagonist"} an internal moral dilemma where pursuing their main goal threatens a core relationship, forcing them to choose between duty and personal honor.`;
    }
    return `💡 **Creative Ideas for "${prompt || projectTitle}"**:\n• Explore a high-stakes turning point where the setting itself shifts environment.\n• Introduce a mysterious symbol recurring across key timeline events.\n• Contrast the protagonist's inner doubt with their external leadership role.`;
  }

  if (action === "analysis") {
    const charNames = projectContext?.characters?.map(c => c.name) || [];
    return `📊 **Story & Consistency Analysis for ${projectTitle}**:\n\n` +
      `• **Pacing Score**: 8.5/10 — Strong forward momentum with balanced dialogue and action.\n` +
      `• **Knowledge Base Check**: Verified character references (${charNames.length > 0 ? charNames.join(", ") : "No character conflicts detected"}). Tone remains consistent with "${tone}".\n` +
      `• **Pacing Recommendation**: Consider slowing down the transition into the main confrontation to let the emotional stakes settle.`;
  }

  if (action === "continue") {
    const mainChar = projectContext?.characters?.[0]?.name || "The protagonist";
    return `${text ? text + " " : ""}${mainChar} paused, feeling the sudden shift in the room's energy. Shadows lengthened across the floor as the weight of their next decision hung in the balance. With a steady breath, ${mainChar} stepped forward, ready to face whatever lay beyond the threshold.`;
  }

  return "AI Assistant processed request successfully.";
}

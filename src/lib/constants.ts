export interface WorkTypeDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  defaultWordCount: number;
}

export const CATEGORIES = [
  "Books",
  "Creative Writing",
  "Screen & Stage",
  "Professional Writing",
  "Academic",
  "Other",
];

export const WORK_TYPES: WorkTypeDefinition[] = [
  // Books
  { id: "novel", name: "Novel", category: "Books", description: "Full-length fiction narrative with multi-act structure.", icon: "BookOpen", defaultWordCount: 75000 },
  { id: "novella", name: "Novella", category: "Books", description: "Short novel focused on a single core conflict.", icon: "Book", defaultWordCount: 30000 },
  { id: "short-story-collection", name: "Short Story Collection", category: "Books", description: "Anthology of interconnected or thematic short stories.", icon: "Library", defaultWordCount: 45000 },
  { id: "poetry-collection", name: "Poetry Collection", category: "Books", description: "Curated collection of poems organized by motif or form.", icon: "Feather", defaultWordCount: 15000 },
  { id: "essay-collection", name: "Essay Collection", category: "Books", description: "Collection of creative or critical non-fiction essays.", icon: "FileText", defaultWordCount: 50000 },
  { id: "memoir", name: "Memoir", category: "Books", description: "Personal life stories centered on a specific period or theme.", icon: "User", defaultWordCount: 60000 },
  { id: "autobiography", name: "Autobiography", category: "Books", description: "Comprehensive account of the author's entire life.", icon: "History", defaultWordCount: 85000 },
  { id: "biography", name: "Biography", category: "Books", description: "Detailed chronicle of another person's life and legacy.", icon: "Compass", defaultWordCount: 90000 },
  { id: "self-help", name: "Self-Help / Personal Development", category: "Books", description: "Actionable frameworks for personal growth and transformation.", icon: "Sparkles", defaultWordCount: 40000 },
  { id: "business-book", name: "Business Book", category: "Books", description: "Industry insights, leadership strategies, and case studies.", icon: "Briefcase", defaultWordCount: 45000 },
  { id: "technical-book", name: "Technical / Educational Book", category: "Books", description: "In-depth guide, manual, or textbook for specialized skills.", icon: "Code", defaultWordCount: 60000 },
  { id: "childrens-book", name: "Children's Book", category: "Books", description: "Illustrated story aimed at younger readers.", icon: "Smile", defaultWordCount: 2500 },
  { id: "ya-book", name: "Young Adult (YA) Book", category: "Books", description: "Coming-of-age story with high stakes and dynamic themes.", icon: "Star", defaultWordCount: 65000 },

  // Creative Writing
  { id: "short-story", name: "Short Story", category: "Creative Writing", description: "Self-contained short fiction piece.", icon: "FileCode", defaultWordCount: 5000 },
  { id: "flash-fiction", name: "Flash Fiction", category: "Creative Writing", description: "Micro-narrative under 1,000 words.", icon: "Zap", defaultWordCount: 800 },
  { id: "poetry", name: "Poetry (Single Piece)", category: "Creative Writing", description: "Verse writing with rhythm, meter, or free form.", icon: "PenTool", defaultWordCount: 300 },
  { id: "spoken-word", name: "Spoken Word", category: "Creative Writing", description: "Performance poetry designed for oral recitation.", icon: "Mic", defaultWordCount: 600 },
  { id: "creative-nonfiction", name: "Creative Nonfiction", category: "Creative Writing", description: "True stories told with literary storytelling techniques.", icon: "BookMarked", defaultWordCount: 12000 },

  // Screen & Stage
  { id: "screenplay", name: "Feature Screenplay", category: "Screen & Stage", description: "90-120 page film script with INT/EXT scene headers.", icon: "Film", defaultWordCount: 20000 },
  { id: "tv-episode", name: "TV Pilot / Episode", category: "Screen & Stage", description: "30-60 minute television script.", icon: "Tv", defaultWordCount: 10000 },
  { id: "stage-play", name: "Stage Play", category: "Screen & Stage", description: "Theatrical script with act breaks and stage directions.", icon: "Drama", defaultWordCount: 15000 },
  { id: "monologue", name: "Monologue", category: "Screen & Stage", description: "Single character speech for stage or film audition.", icon: "MessageSquare", defaultWordCount: 500 },

  // Professional Writing
  { id: "article", name: "Article / Feature Story", category: "Professional Writing", description: "Journalistic story or magazine article.", icon: "Newspaper", defaultWordCount: 2500 },
  { id: "blog-post", name: "Blog Post / Newsletter", category: "Professional Writing", description: "Engaging online article or subscriber message.", icon: "Globe", defaultWordCount: 1500 },
  { id: "report", name: "Professional Report", category: "Professional Writing", description: "Structured industry analysis or organizational update.", icon: "BarChart3", defaultWordCount: 5000 },
  { id: "white-paper", name: "White Paper", category: "Professional Writing", description: "Authoritative guide or problem-solving proposal.", icon: "FileCheck", defaultWordCount: 4000 },

  // Academic
  { id: "essay", name: "Academic Essay", category: "Academic", description: "Argued academic paper with thesis and citations.", icon: "GraduationCap", defaultWordCount: 3500 },
  { id: "research-paper", name: "Research Paper", category: "Academic", description: "Scholarly investigation with literature review & findings.", icon: "Search", defaultWordCount: 8000 },
  { id: "thesis", name: "Master's Thesis / Dissertation", category: "Academic", description: "Major academic dissertation with full methodology.", icon: "Award", defaultWordCount: 30000 },

  // Other
  { id: "journal", name: "Personal Journal / Reflection", category: "Other", description: "Private thought logs, reflections, and ideas.", icon: "Bookmark", defaultWordCount: 10000 },
  { id: "speech", name: "Speech / Eulogy / Manifesto", category: "Other", description: "Persuasive or ceremonial address for an audience.", icon: "Megaphone", defaultWordCount: 2000 },
  { id: "custom", name: "Build Custom Project", category: "Other", description: "Custom blank canvas with flexible chapter/section structure.", icon: "PlusCircle", defaultWordCount: 20000 },
];

export const GENRES = [
  "Science Fiction",
  "Fantasy",
  "Mystery & Thriller",
  "Romance",
  "Historical Fiction",
  "Literary Fiction",
  "Horror & Dark Fantasy",
  "Action & Adventure",
  "Crime & Detective",
  "Memoir & Biography",
  "Self-Help & Philosophy",
  "Business & Tech",
  "Poetry",
  "Academic & Essay",
  "Drama & Screenplay",
  "Other",
];

export const STRUCTURE_TEMPLATES = [
  { id: "three-act", name: "Three Act Structure", description: "Setup (25%), Confrontation (50%), Resolution (25%)" },
  { id: "heros-journey", name: "Hero's Journey (Monomyth)", description: "Departure, Initiation, Return, Transformation" },
  { id: "save-the-cat", name: "Save the Cat Beat Sheet", description: "15 key story beats for cinematic pacing" },
  { id: "freytags-pyramid", name: "Freytag's Pyramid", description: "Exposition, Rising Action, Climax, Falling Action, Denouement" },
  { id: "problem-solution", name: "Problem → Solution Framework", description: "Identify core pain point, present thesis, deliver actionable steps" },
  { id: "academic-standard", name: "Academic IMRaD Standard", description: "Introduction, Methodology, Results, Analysis, Discussion" },
  { id: "poetic-suite", name: "Poetic Suite / Anthology", description: "Thematic movements, form variations, emotional arc" },
];

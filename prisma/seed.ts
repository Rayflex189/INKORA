import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding INKORA database...");

  const hashedPassword = await bcrypt.hash("password123", 10);

  // 1. Users & Profiles
  const isaiah = await prisma.user.upsert({
    where: { email: "isaiah@inkora.com" },
    update: {},
    create: {
      email: "isaiah@inkora.com",
      username: "isaiahrory",
      name: "Isaiah Rory",
      passwordHash: hashedPassword,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
      bio: "Award-winning speculative fiction author and software developer exploring AI, consciousness, and human resilience.",
      genres: "Science Fiction, Fantasy, Tech Thriller",
      interests: "World Building, Character Arcs, Cyberpunk, Nigerian Speculative Fiction",
      role: "USER",
      profile: {
        create: {
          publicVisibility: "PUBLIC",
          allowMessages: true,
          allowInvites: true,
          allowCollaboration: true,
        },
      },
    },
  });

  const sarah = await prisma.user.upsert({
    where: { email: "sarah@inkora.com" },
    update: {},
    create: {
      email: "sarah@inkora.com",
      username: "sarahjenkins",
      name: "Sarah Jenkins",
      passwordHash: hashedPassword,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250",
      bio: "Poet, editor, and co-author specializing in dialogue polishing and emotional character development.",
      genres: "Literary Fiction, Poetry, Drama",
      interests: "Free Verse, Character Pacing, Sonnets",
      role: "USER",
      profile: {
        create: {
          publicVisibility: "PUBLIC",
          allowMessages: true,
          allowInvites: true,
          allowCollaboration: true,
        },
      },
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@inkora.com" },
    update: {},
    create: {
      email: "admin@inkora.com",
      username: "admin",
      name: "System Admin",
      passwordHash: hashedPassword,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250",
      bio: "INKORA Studio Administrator.",
      genres: "All Genres",
      interests: "Platform Health, AI Prompt Optimization",
      role: "ADMIN",
      profile: {
        create: {
          publicVisibility: "PUBLIC",
          allowMessages: true,
          allowInvites: true,
          allowCollaboration: true,
        },
      },
    },
  });

  // 2. Novel Project: The Last Horizon
  const novel = await prisma.project.create({
    data: {
      title: "The Last Horizon",
      subtitle: "The Machine That Saw Tomorrow",
      authorName: isaiah.name,
      ownerId: isaiah.id,
      category: "Books",
      type: "novel",
      genre: "Science Fiction",
      subgenre: "Cyberpunk / AI Thriller",
      targetAudience: "Adult & Young Adult Sci-Fi Readers",
      ageGroup: "16+",
      wordCountTarget: 80000,
      currentWordCount: 14500,
      status: "IN_PROGRESS",
      visibility: "OPEN",
      allowCollaborators: true,
      maxCollaborators: 5,
      coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600",
      premise: "A young Nigerian software developer in Lagos discovers that an AI system he built can predict future catastrophic events before they occur.",
      logline: "When his predictive algorithm foresees a global power grid collapse in 72 hours, Kaelen must team up with a rogue investigator to stop the dark syndicate behind the outage.",
      concept: "High-octane tech thriller combining West African urban futurism, artificial intelligence ethics, and intense character rivalry.",
      theme: "Determinism vs. Free Will, technological responsibility, and brotherhood.",
      tone: "Atmospheric, fast-paced, cerebral, and tense.",
      structureTemplate: "Three Act Structure",
      members: {
        create: [
          { userId: isaiah.id, role: "OWNER" },
          { userId: sarah.id, role: "CO_AUTHOR" },
        ],
      },
      chapters: {
        create: [
          {
            title: "Chapter 1: The Lagos Anomaly",
            objective: "Introduce Kaelen in his subterranean lab in Yaba, Lagos and reveal the first anomalous predictive log.",
            summary: "Kaelen discovers an un-programmed execution thread in NeuralCore that predicts a blackout at the National Grid substation 12 hours before it happens.",
            orderIndex: 1,
            wordCount: 3200,
            status: "COMPLETED",
            content: `<h1>Chapter 1: The Lagos Anomaly</h1><p>The hum of liquid-cooled servers filled the subterranean workshop in Yaba. Outside, the night air was thick with the scent of tropical rain and diesel exhausts from passing generators, but inside, Kaelen focused entirely on the flickering glowing terminal.</p><p>For seven months, his proprietary predictive engine, <em>Aether-9</em>, had processed real-time telemetry from across the megacity. Traffic flow, power distribution spikes, financial micro-transactions—it digested them all into fluid mathematical probabilities.</p><p>Then the anomaly appeared.</p><p>A glowing scarlet notification blinked on line 4,092 of his console: <strong>PREDICTIVE ANOMALY 99.4% PROBABILITY — SUBSTATION 4 BLACKOUT IN 03:42:10</strong>.</p><p>"That's impossible," Kaelen muttered, leaning closer to the terminal. Substation 4 hadn't reported a single voltage fluctuation in three years. Yet the system was calling it with absolute certainty.</p>`,
          },
          {
            title: "Chapter 2: The Midnight Signal",
            objective: "Introduce Sarah, the investigative journalist who receives Kaelen's encrypted alert.",
            summary: "Kaelen reaches out to Sarah Jenkins after Substation 4 goes dark precisely at the predicted second.",
            orderIndex: 2,
            wordCount: 4100,
            status: "IN_PROGRESS",
            content: `<h2>Chapter 2: The Midnight Signal</h2><p>Sarah Jenkins sat on the balcony overlooking Marina Expressway, sipping lukewarm black coffee as the city skyline glittered against the dark waters of Lagos Lagoon.</p><p>Her phone vibrated violently against the wooden tabletop. An encrypted ping from an untraceable terminal in Yaba.</p><p><em>"Sarah. Substation 4 just collapsed. Exactly 03:42 ago. Meet me at the old docks before they cut the satellite relays."</em></p>`,
          },
          {
            title: "Chapter 3: The Syndicate Protocol",
            objective: "Reveal the antagonist organization 'OmniGrid' and set the 72-hour countdown.",
            summary: "Kaelen and Sarah realize the predictive algorithm isn't foreseeing accidents—it is intercepting execution commands sent by an autonomous cyber syndicate.",
            orderIndex: 3,
            wordCount: 2800,
            status: "NOT_STARTED",
            content: `<h2>Chapter 3: The Syndicate Protocol</h2><p>The rain poured down in heavy sheets as the rusted iron doors of Warehouse 14 creaked open...</p>`,
          },
        ],
      },
      characters: {
        create: [
          {
            name: "Kaelen Okafor",
            age: "27",
            role: "Protagonist",
            appearance: "Tall, slender, sharp observant dark eyes, usually wears a worn dark hoodie and smart glasses.",
            personality: "Brilliant software architect, reserved, deeply moral, hyper-focused under pressure.",
            background: "Grew up in Enugu before moving to Lagos on a technology research scholarship.",
            arc: "Transitions from a reclusive coder hiding behind screens to a brave leader fighting for humanity's future.",
            strengths: "Algorithmic thinking, pattern recognition, calm crisis demeanor.",
            weaknesses: "Struggles with interpersonal trust, hesitant to delegate.",
            goals: "Uncover who is manipulating Aether-9 before the national blackout.",
            motivations: "Protect his family and prevent AI infrastructure weaponization.",
            fears: "Losing control of his creation and failing those who depend on him.",
            secrets: "Secretly deployed an unlicensed neural relay across five local servers.",
          },
          {
            name: "Sarah Jenkins",
            age: "29",
            role: "Co-Protagonist / Ally",
            appearance: "Athletic build, short cropped curls, always carrying a digital voice recorder and tablet.",
            personality: "Relentless investigator, articulate, perceptive, highly cynical of corporate PR.",
            background: "Former investigative reporter for West Africa Tech Quarterly.",
            arc: "Learns to trust technological solutions when paired with human integrity.",
            strengths: "Investigative journalism, network of underground sources, sharp dialogue.",
            weaknesses: "Impulsive when pursuing a story break.",
          },
        ],
      },
      locations: {
        create: [
          {
            name: "Yaba Tech Lab Sub-Level 3",
            description: "A repurposed industrial basement outfitted with server racks, holographic displays, and soldering workstations.",
            significance: "Kaelen's primary sanctuary and birthplace of Aether-9.",
          },
          {
            name: "Lagos Marina Docks",
            description: "Waterfront shipping terminal with container towers and flickering neon crane lights.",
            significance: "Location of the first clandestine meeting between Kaelen and Sarah.",
          },
        ],
      },
      timelineEvents: {
        create: [
          {
            title: "Aether-9 First Prediction",
            description: "Substation 4 outage predicted 3 hours in advance.",
            dateString: "October 14, 23:14",
            orderIndex: 1,
          },
          {
            title: "Substation 4 Collapses",
            description: "Power blackout hits Victoria Island exactly as predicted.",
            dateString: "October 15, 02:56",
            orderIndex: 2,
          },
        ],
      },
      researchFolders: {
        create: [
          {
            name: "AI & Neural Networks",
          },
          {
            name: "Lagos Urban Lore & Locations",
          },
        ],
      },
      notes: {
        create: [
          {
            title: "Key Dialogue Reminder for Chapter 2",
            content: "Make sure Sarah challenges Kaelen about why he didn't go to the authorities first.",
            color: "amber",
            tags: "dialogue, sarah, kaelen",
          },
        ],
      },
      activityLogs: {
        create: [
          { userId: isaiah.id, action: "PROJECT_CREATED", details: "Created project blueprint for The Last Horizon." },
          { userId: isaiah.id, action: "CHAPTER_COMPLETED", details: "Marked Chapter 1 as Completed (3,200 words)." },
          { userId: sarah.id, action: "JOINED_PROJECT", details: "Joined as Co-Author." },
        ],
      },
    },
  });

  // Create Book Gallery Showcase Item for The Last Horizon
  await prisma.bookGalleryItem.create({
    data: {
      projectId: novel.id,
      title: novel.title,
      subtitle: novel.subtitle,
      author: novel.authorName,
      description: novel.premise || "",
      genre: novel.genre || "Science Fiction",
      coverImage: novel.coverImage,
      tags: "Cyberpunk, AI, Lagos, Thriller, Speculative",
      visibility: "PUBLIC",
      isFeatured: true,
      likesCount: 142,
      viewsCount: 1250,
    },
  });

  // 3. Poetry Collection: Whispers of the Savannah
  const poetry = await prisma.project.create({
    data: {
      title: "Whispers of the Savannah",
      subtitle: "Verses on Memory and Land",
      authorName: sarah.name,
      ownerId: sarah.id,
      category: "Books",
      type: "poetry-collection",
      genre: "Poetry",
      subgenre: "Spoken Word / Contemporary Verse",
      targetAudience: "Poetry & Literary Enthusiasts",
      wordCountTarget: 15000,
      currentWordCount: 4200,
      status: "IN_PROGRESS",
      visibility: "OPEN",
      coverImage: "https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&q=80&w=600",
      premise: "An evocative collection of poems capturing ancestral memory, urban transition, and nature's quiet resilience.",
      logline: "Poetry that bridge modern cityscape rhythms with ancient earth melodies.",
      concept: "Structured into four movements: Sunrise, Dust, Harmattan, and Rain.",
      chapters: {
        create: [
          {
            title: "Movement I: Sunrise & Red Clay",
            objective: "Establish the ancestral motifs and imagery of morning light over the land.",
            summary: "Opening free-verse and sonnet selections.",
            orderIndex: 1,
            wordCount: 1200,
            status: "COMPLETED",
            content: `<h1>Movement I: Sunrise & Red Clay</h1><p><em>I. The First Light</em></p><p>Before the generators hum,<br>Before the red clay turns to dust under morning tires,<br>The horizon gathers its scarlet thread,<br>Sewing night into memory.</p>`,
          },
        ],
      },
    },
  });

  await prisma.bookGalleryItem.create({
    data: {
      projectId: poetry.id,
      title: poetry.title,
      subtitle: poetry.subtitle,
      author: poetry.authorName,
      description: poetry.premise || "",
      genre: poetry.genre || "Poetry",
      coverImage: poetry.coverImage,
      tags: "Poetry, Spoken Word, African Verse, Memory",
      visibility: "PUBLIC",
      isFeatured: true,
      likesCount: 89,
      viewsCount: 840,
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

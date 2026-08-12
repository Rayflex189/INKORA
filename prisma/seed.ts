import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  console.log("Seeding INKORA database...");

  // Clean existing non-user data safely to allow idempotent re-seeding
  try {
    await prisma.activityLog.deleteMany({});
    await prisma.report.deleteMany({});
    await prisma.comment.deleteMany({});
    await prisma.bookGalleryItem.deleteMany({});
    await prisma.chapter.deleteMany({});
    await prisma.projectMember.deleteMany({});
    await prisma.project.deleteMany({});
  } catch (err) {
    console.log("Cleanup skipped for fresh tables.");
  }

  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "adminplus";

  const hashedDefaultPassword = await bcrypt.hash("password123", 10);
  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

  // 1. Initial Administrator Account Creation
  const adminUser = await prisma.user.upsert({
    where: { username: adminUsername },
    update: {
      role: "ADMIN",
      passwordHash: hashedAdminPassword,
      status: "ACTIVE",
    },
    create: {
      email: `${adminUsername}@inkora.com`,
      username: adminUsername,
      name: "Platform Administrator",
      passwordHash: hashedAdminPassword,
      role: "ADMIN",
      status: "ACTIVE",
      mustChangePassword: true,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250",
      bio: "INKORA Lead Administrator & Content Strategist.",
      genres: "All Genres",
      interests: "Platform Health, AI Prompt Optimization, Community Safety",
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

  console.log(`Created/Verified Administrator: ${adminUser.username}`);

  // 2. Writers & Readers
  const isaiah = await prisma.user.upsert({
    where: { email: "isaiah@inkora.com" },
    update: {},
    create: {
      email: "isaiah@inkora.com",
      username: "isaiahrory",
      name: "Isaiah Rory",
      passwordHash: hashedDefaultPassword,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
      bio: "Award-winning speculative fiction author and software developer exploring AI, consciousness, and human resilience.",
      genres: "Science Fiction, Fantasy, Tech Thriller",
      interests: "World Building, Character Arcs, Cyberpunk, Nigerian Speculative Fiction",
      role: "WRITER",
      isFeatured: true,
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
      passwordHash: hashedDefaultPassword,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250",
      bio: "Poet, editor, and co-author specializing in dialogue polishing and emotional character development.",
      genres: "Literary Fiction, Poetry, Drama",
      interests: "Free Verse, Character Pacing, Sonnets",
      role: "WRITER",
      isFeatured: true,
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

  const readerOne = await prisma.user.upsert({
    where: { email: "reader@inkora.com" },
    update: {},
    create: {
      email: "reader@inkora.com",
      username: "bookworm99",
      name: "Alex Vance",
      passwordHash: hashedDefaultPassword,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
      bio: "Avid sci-fi & fantasy reader. Always hunting for compelling worldbuilding.",
      genres: "Science Fiction, Fantasy",
      role: "READER",
      profile: {
        create: {
          publicVisibility: "PUBLIC",
          allowMessages: true,
          allowInvites: false,
          allowCollaboration: false,
        },
      },
    },
  });

  // 3. Novel Project: The Last Horizon
  const novelSlug = slugify("The Last Horizon");
  const novel = await prisma.project.create({
    data: {
      title: "The Last Horizon",
      slug: novelSlug,
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
      visibility: "PUBLIC",
      allowCollaborators: true,
      maxCollaborators: 5,
      allowComments: true,
      isFeatured: true,
      featuredAt: new Date(),
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
            slug: slugify("Chapter 1 The Lagos Anomaly"),
            objective: "Introduce Kaelen in his subterranean lab in Yaba, Lagos and reveal the first anomalous predictive log.",
            summary: "Kaelen discovers an un-programmed execution thread in NeuralCore that predicts a blackout at the National Grid substation 12 hours before it happens.",
            orderIndex: 1,
            wordCount: 3200,
            status: "COMPLETED",
            content: `<h1>Chapter 1: The Lagos Anomaly</h1><p>The hum of liquid-cooled servers filled the subterranean workshop in Yaba. Outside, the night air was thick with the scent of tropical rain and diesel exhausts from passing generators, but inside, Kaelen focused entirely on the flickering glowing terminal.</p><p>For seven months, his proprietary predictive engine, <em>Aether-9</em>, had processed real-time telemetry from across the megacity. Traffic flow, power distribution spikes, financial micro-transactions—it digested them all into fluid mathematical probabilities.</p><p>Then the anomaly appeared.</p><p>A glowing scarlet notification blinked on line 4,092 of his console: <strong>PREDICTIVE ANOMALY 99.4% PROBABILITY — SUBSTATION 4 BLACKOUT IN 03:42:10</strong>.</p><p>"That's impossible," Kaelen muttered, leaning closer to the terminal. Substation 4 hadn't reported a single voltage fluctuation in three years. Yet the system was calling it with absolute certainty.</p>`,
          },
          {
            title: "Chapter 2: The Midnight Signal",
            slug: slugify("Chapter 2 The Midnight Signal"),
            objective: "Introduce Sarah, the investigative journalist who receives Kaelen's encrypted alert.",
            summary: "Kaelen reaches out to Sarah Jenkins after Substation 4 goes dark precisely at the predicted second.",
            orderIndex: 2,
            wordCount: 4100,
            status: "IN_PROGRESS",
            content: `<h2>Chapter 2: The Midnight Signal</h2><p>Sarah Jenkins sat on the balcony overlooking Marina Expressway, sipping lukewarm black coffee as the city skyline glittered against the dark waters of Lagos Lagoon.</p><p>Her phone vibrated violently against the wooden tabletop. An encrypted ping from an untraceable terminal in Yaba.</p><p><em>"Sarah. Substation 4 just collapsed. Exactly 03:42 ago. Meet me at the old docks before they cut the satellite relays."</em></p>`,
          },
          {
            title: "Chapter 3: The Syndicate Protocol",
            slug: slugify("Chapter 3 The Syndicate Protocol"),
            objective: "Reveal the antagonist organization 'OmniGrid' and set the 72-hour countdown.",
            summary: "Kaelen and Sarah realize the predictive algorithm isn't foreseeing accidents—it is intercepting execution commands sent by an autonomous cyber syndicate.",
            orderIndex: 3,
            wordCount: 2800,
            status: "NOT_STARTED",
            content: `<h2>Chapter 3: The Syndicate Protocol</h2><p>The rain poured down in heavy sheets as the rusted iron doors of Warehouse 14 creaked open...</p>`,
          },
        ],
      },
    },
  });

  // Create Book Gallery Showcase Item for The Last Horizon
  const galleryBook = await prisma.bookGalleryItem.create({
    data: {
      projectId: novel.id,
      slug: novelSlug,
      title: novel.title,
      subtitle: novel.subtitle,
      author: novel.authorName,
      description: novel.premise || "",
      genre: novel.genre || "Science Fiction",
      coverImage: novel.coverImage,
      tags: "Cyberpunk, AI, Lagos, Thriller, Speculative",
      visibility: "PUBLIC",
      allowComments: true,
      isFeatured: true,
      featuredAt: new Date(),
      likesCount: 142,
      viewsCount: 1250,
    },
  });

  // 4. Comments
  const firstChapter = await prisma.chapter.findFirst({ where: { projectId: novel.id } });
  if (firstChapter) {
    await prisma.comment.create({
      data: {
        projectId: novel.id,
        chapterId: firstChapter.id,
        userId: readerOne.id,
        text: "The tension in this opening scene is phenomenal! The Lagos setting feels electric.",
      },
    });
    await prisma.comment.create({
      data: {
        projectId: novel.id,
        chapterId: firstChapter.id,
        userId: sarah.id,
        text: "Pacing on paragraph 3 is spot on. Kaelen's motivation shines right away.",
      },
    });
  }

  // 5. Poetry Collection: Whispers of the Savannah
  const poetrySlug = slugify("Whispers of the Savannah");
  const poetry = await prisma.project.create({
    data: {
      title: "Whispers of the Savannah",
      slug: poetrySlug,
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
      visibility: "PUBLIC",
      allowComments: true,
      isFeatured: true,
      featuredAt: new Date(),
      coverImage: "https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&q=80&w=600",
      premise: "An evocative collection of poems capturing ancestral memory, urban transition, and nature's quiet resilience.",
      logline: "Poetry that bridge modern cityscape rhythms with ancient earth melodies.",
      concept: "Structured into four movements: Sunrise, Dust, Harmattan, and Rain.",
      chapters: {
        create: [
          {
            title: "Movement I: Sunrise & Red Clay",
            slug: slugify("Movement I Sunrise Red Clay"),
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
      slug: poetrySlug,
      title: poetry.title,
      subtitle: poetry.subtitle,
      author: poetry.authorName,
      description: poetry.premise || "",
      genre: poetry.genre || "Poetry",
      coverImage: poetry.coverImage,
      tags: "Poetry, Spoken Word, African Verse, Memory",
      visibility: "PUBLIC",
      allowComments: true,
      isFeatured: true,
      featuredAt: new Date(),
      likesCount: 89,
      viewsCount: 840,
    },
  });

  // 6. System Settings Initialization
  const defaultSettings = [
    { key: "site_name", value: JSON.stringify("INKORA") },
    { key: "site_description", value: JSON.stringify("Where ideas become stories. AI Writing Studio & Book Creation Workspace.") },
    { key: "registration_enabled", value: JSON.stringify(true) },
    { key: "public_reading_enabled", value: JSON.stringify(true) },
    { key: "comments_enabled", value: JSON.stringify(true) },
    { key: "writer_collaboration_enabled", value: JSON.stringify(true) },
    { key: "maintenance_mode", value: JSON.stringify(false) },
    { key: "default_theme", value: JSON.stringify("system") },
  ];

  for (const s of defaultSettings) {
    await prisma.systemSettings.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }

  // 7. Initial Activity Logs
  await prisma.activityLog.createMany({
    data: [
      {
        actorId: adminUser.id,
        actorRole: "ADMIN",
        action: "SYSTEM_INITIALIZED",
        details: "Platform database initialized and admin account created.",
        targetType: "SYSTEM",
      },
      {
        actorId: isaiah.id,
        actorRole: "WRITER",
        action: "BOOK_PUBLISHED",
        details: "Published 'The Last Horizon' to Public Gallery.",
        targetType: "BOOK",
        targetId: novel.id,
      },
    ],
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


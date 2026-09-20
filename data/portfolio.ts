export type ProjectVisual =
  | "distribution"
  | "resume"
  | "wave"
  | "training"
  | "finance"
  | "studio"
  | "cli"
  | "screenshot";

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  year: string;
  summary: string;
  description: string;
  challenge: string;
  approach: string;
  outcome: string;
  impact: string[];
  stack: string[];
  visual: ProjectVisual;
  number: string;
  category: string;
  image?: string;
  githubUrl: string;
  liveUrl?: string;
  liveLabel?: string;
  imageWidth?: number;
  imageHeight?: number;
  secondaryImage?: string;
  sourcePrivate?: boolean;
};

export const profile = {
  name: "Adnan Baig",
  firstName: "Adnan",
  role: "Full-Stack Developer",
  location: "Chiang Mai, Thailand",
  resumeUrl: "/Adnan_Baig_Resume.pdf",
  email: "adnanbaigofficial@gmail.com",
  githubUsername: "CodnanBaig",
  headline:
    "I build the product. And the systems behind it.",
  intro:
    "I’m Adnan Baig, a full-stack developer with a frontend foundation. I build web applications, developer tools and mobile-first products, connecting clear interfaces with reliable APIs and data.",
  social: {
    github: "https://github.com/CodnanBaig",
    linkedin: "https://in.linkedin.com/in/adnan-baig-74b8aa21a",
    email: "mailto:adnanbaigofficial@gmail.com",
  },
  metrics: [
    { value: "4+", label: "years building products" },
    { value: "07", label: "selected projects" },
    { value: "04", label: "product disciplines" },
    { value: "2021", label: "building professionally since" },
  ],
};

export const projects: Project[] = [
  {
    slug: "dont-go-broke",
    title: "Don't Go Broke",
    eyebrow: "Personal finance & cash-flow planning",
    year: "2026",
    summary:
      "A mobile-first finance product that turns financial records and recurring commitments into an understandable spending runway.",
    description:
      "Don't Go Broke focuses on the moment before a spending decision. It separates a ledger balance from reserved obligations and projections so a user can see what is actually safe to spend.",
    challenge:
      "Personal-finance tools can turn a balance into a misleading answer when upcoming obligations, duplicate recurring charges and financial-history gaps are ignored.",
    approach:
      "I modelled balances, reserved obligations, recurring records and confidence-qualified projections as separate concerns, then designed an app flow that makes those boundaries easy to understand.",
    outcome:
      "A deployed, end-to-end personal-finance product with persistent records, guarded restore flows and an explanation of how each spending figure is derived.",
    impact: [
      "Ledger-derived balances and reserves",
      "Recurring-transaction protection",
      "Transactional restore workflow",
      "Mobile-first finance UX",
    ],
    stack: ["Next.js", "TypeScript", "Capacitor", "PostgreSQL"],
    visual: "screenshot",
    number: "01",
    category: "Product application",
    image: "/projects/dont-go-broke-dashboard.jpg",
    secondaryImage: "/projects/dont-go-broke-insights.jpg",
    imageWidth: 390,
    imageHeight: 844,
    sourcePrivate: true,
    githubUrl: "https://github.com/CodnanBaig/dont-go-broke-next",
    liveUrl: "https://dont-go-broke-next.vercel.app",
    liveLabel: "Live demo",
  },
  {
    slug: "reprolab",
    title: "ReproLab",
    eyebrow: "Privacy-first bug capture & replay",
    year: "2026",
    summary:
      "A developer workbench that records sanitized browser evidence, reconstructs a failure and drafts a regression test for review.",
    description:
      "ReproLab turns a vague bug report into evidence an engineer can investigate. It captures browser interactions and failures without treating a replay as a substitute for an actual fix.",
    challenge:
      "Browser bugs are hard to reproduce when their context disappears with the report. Capturing useful evidence also creates privacy, ownership and storage constraints.",
    approach:
      "I built privacy boundaries into browser-event capture, session storage and replay tooling, then exported deterministic Playwright drafts that still require application-specific assertions.",
    outcome:
      "A complete debugging workflow spanning capture, reconstruction, searchable sessions, ownership-scoped storage and regression-test drafting.",
    impact: [
      "Sanitized browser-event capture",
      "Session replay and error inspection",
      "Ownership-scoped persistence",
      "Deterministic Playwright test drafts",
    ],
    stack: ["TypeScript", "Node.js", "SQLite", "Playwright"],
    visual: "screenshot",
    number: "02",
    category: "Developer tool",
    image: "/projects/reprolab-live.jpg",
    imageWidth: 1470,
    imageHeight: 836,
    sourcePrivate: true,
    githubUrl: "https://github.com/CodnanBaig/reprolab",
    liveUrl: "https://reprolab.vercel.app",
    liveLabel: "Open ReproLab",
  },
  {
    slug: "pitchgenie",
    title: "PitchGenie",
    eyebrow: "AI-assisted proposal & pitch-deck workspace",
    year: "2026",
    summary:
      "An AI document workspace that gives generation a real product context: editing, version history, exports and quality checks.",
    description:
      "PitchGenie is designed around the work that follows the first model response: making proposal content reviewable, editable, durable and ready to export.",
    challenge:
      "A model response alone does not make a useful business document. The product needed structured output handling, versioned editing and ways to catch weak or malformed results.",
    approach:
      "I built authenticated document workflows around bounded provider requests, structured-output repair, deterministic evaluation fixtures and PDF/DOCX export paths.",
    outcome:
      "An AI-assisted workspace that treats generated material as an editable draft within a complete document-production flow.",
    impact: [
      "Authenticated document workflows",
      "Output validation and repair",
      "Version history and editing",
      "PDF and DOCX exports",
    ],
    stack: ["Next.js", "TypeScript", "MongoDB", "AI SDK"],
    visual: "screenshot",
    number: "03",
    category: "Product application",
    image: "/projects/pitchgenie.png",
    imageWidth: 1440,
    imageHeight: 1000,
    githubUrl: "https://github.com/CodnanBaig/pitcheme",
    liveUrl: "https://pitcheme.netlify.app",
    liveLabel: "Earlier live release",
  },
  {
    slug: "signalforge",
    title: "SignalForge",
    eyebrow: "Constrained AI paper-trading research system",
    year: "2026",
    summary:
      "A paper-trading research lab where a model can propose an action, but deterministic controls decide what is admissible.",
    description:
      "SignalForge combines public market data, bounded AI proposals and a persistent paper ledger. It is deliberately presented as a research simulation, never as a profitable autonomous trader.",
    challenge:
      "An AI proposal should never bypass the controls that protect an account. Fresh quotes, fees, liquidity, exposure and execution constraints need independent enforcement.",
    approach:
      "I separated proposal generation from execution. The FastAPI service validates every paper order, serializes ledger writes and keeps risk controls outside the model prompt.",
    outcome:
      "A testable single-operator paper-trading system with a React dashboard, FastAPI backend and explicit simulation boundaries.",
    impact: [
      "Bounded AI proposal flow",
      "Independent execution controls",
      "Persistent paper ledger",
      "Market-data and failure handling",
    ],
    stack: ["Python", "FastAPI", "React", "TypeScript", "SQLite", "Docker"],
    visual: "screenshot",
    number: "04",
    category: "AI & backend system",
    image: "/projects/signalforge.png",
    imageWidth: 1440,
    imageHeight: 1024,
    sourcePrivate: true,
    githubUrl: "https://github.com/CodnanBaig/crypto-ai-trader",
  },
  {
    slug: "dev-clean",
    title: "dev-clean",
    eyebrow: "Reversible developer workspace cleanup",
    year: "2026",
    summary:
      "A cross-platform CLI that inventories heavyweight developer artifacts, previews cleanup and keeps recovery possible.",
    description:
      "dev-clean solves a mundane but risky developer problem: reclaiming disk space without accidentally removing source, credentials or unfamiliar project files.",
    challenge:
      "Cleanup tools can be dangerous when their target rules are vague. The product had to make potential changes inspectable before any removal is considered.",
    approach:
      "I constrained cleanup to known artifact paths, added dry-run planning and quarantine/restore workflows, and kept project-root validation ahead of removal operations.",
    outcome:
      "A GitHub-first developer utility focused on explainable, recoverable workspace cleanup instead of one-command deletion.",
    impact: [
      "Safe artifact inventory",
      "Dry-run cleanup planning",
      "Quarantine and restore paths",
      "Cross-platform CLI coverage",
    ],
    stack: ["TypeScript", "Node.js", "CLI", "Vitest", "GitHub Actions"],
    visual: "cli",
    number: "05",
    category: "Developer tool",
    githubUrl: "https://github.com/CodnanBaig/dev-clean",
  },
  {
    slug: "mart-fight",
    title: "Mart Fight",
    eyebrow: "School memories. Familiar faces. Friendly fights.",
    year: "2026",
    summary:
      "A personal browser fighting game, born from my attachment to my school and the friendships I made there.",
    description:
      "My school and the people I knew there still mean a lot to me. Mart Fight turns that connection into something playful: a game we can keep building on and, eventually, enjoy together as our own characters.",
    challenge:
      "The aim is to make a game that feels personal to the people it is about. Familiar places and recognizable characters matter as much as keeping the controls understandable and the fights enjoyable.",
    approach:
      "I’m building the game in TypeScript and Phaser, with fixed-step combat and browser checks supporting the experience. As it develops, I want to work with my actual school friends on fighters that feel recognizable and personal to them.",
    outcome:
      "A playable browser prototype rooted in school memories. The school-friend roster and a shared experience where we can face off as ourselves are creative goals; a complete roster and online multiplayer are not available yet.",
    impact: [
      "A personal project about school and friendship",
      "Playable browser fighting-game prototype",
      "Understandable keyboard and touch controls",
      "Friend-inspired fighters planned as it grows",
    ],
    stack: ["TypeScript", "Phaser", "Vite", "Playwright"],
    visual: "screenshot",
    number: "06",
    category: "Personal game project",
    image: "/projects/mart-fight-gameplay.jpg",
    imageWidth: 1470,
    imageHeight: 780,
    sourcePrivate: true,
    githubUrl: "https://github.com/CodnanBaig/mart-fight",
    liveUrl: "https://mart-fight.vercel.app",
    liveLabel: "Live demo",
  },
  {
    slug: "takemelive",
    title: "TakeMeLive",
    eyebrow: "Cinematic web experience",
    year: "2026",
    summary:
      "A responsive, interaction-led website for live-event work that keeps expressive motion grounded in usable navigation.",
    description:
      "TakeMeLive is a selected visual implementation that shows how an editorial web experience can communicate scale and energy without losing the structure users need to explore it.",
    challenge:
      "The experience needed to feel cinematic across a wide range of screen sizes while avoiding motion that makes browsing or reading harder.",
    approach:
      "I built separate desktop and compact-screen interaction paths with managed animation lifecycles, resize handling and reduced-motion support.",
    outcome:
      "A deployed visual case study that complements the portfolio's product and developer-tool work with frontend and interaction depth.",
    impact: [
      "Responsive editorial layout",
      "Scroll-driven interaction system",
      "Reduced-motion support",
      "Animation lifecycle management",
    ],
    stack: ["Next.js", "TypeScript", "GSAP", "CSS", "Responsive design"],
    visual: "screenshot",
    number: "07",
    category: "Creative & interactive",
    image: "/projects/takemelive.png",
    imageWidth: 1280,
    imageHeight: 720,
    githubUrl: "https://github.com/CodnanBaig/takemelive",
    liveUrl: "https://takemelive.vercel.app",
    liveLabel: "Live demo",
  },
];

export const experience = [
  {
    period: "Oct 2021 — Present",
    company: "Kenmark ITan Solutions",
    role: "Frontend Developer",
    location: "Mumbai / Remote",
    description:
      "Building and maintaining responsive web applications, reusable interfaces and API-connected product workflows. Collaborating across product, design and technical teams while troubleshooting the full path from browser UI to deployment and DNS.",
  },
  {
    period: "Present · Concurrent",
    company: "Melo Music Distribution",
    role: "Head of A&R / Product & Platform Operations",
    location: "Mumbai",
    description:
      "Managing artist and label operations across a catalogue of approximately 300 artists and 100+ monthly releases, while translating real distribution workflows into product requirements for dashboards and white-label applications.",
  },
];

export const capabilities = [
  {
    number: "01",
    title: "Interface engineering",
    copy: "Responsive, accessible interfaces with strong hierarchy, reusable systems and interaction detail that survives real product complexity.",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Angular",
      "Tailwind",
      "Material UI",
      "shadcn/ui",
    ],
  },
  {
    number: "02",
    title: "Product systems",
    copy: "Turning messy operational knowledge into clear states, permissions, workflows and information architecture—not merely translating a mockup.",
    items: [
      "Product discovery",
      "Workflow mapping",
      "Dashboard UX",
      "Design systems",
      "Technical documentation",
    ],
  },
  {
    number: "03",
    title: "Full-stack delivery",
    copy: "Connecting interfaces to dependable data, validation and deployment layers with enough backend fluency to own features end to end.",
    items: [
      "Node.js",
      "REST APIs",
      "Prisma",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Zod",
    ],
  },
  {
    number: "04",
    title: "Mobile products",
    copy: "Cross-platform applications designed for actual hand-held behaviour, including persistence, navigation, media, notifications and haptics.",
    items: [
      "React Native",
      "Expo",
      "Expo Router",
      "NativeWind",
      "Zustand",
      "AsyncStorage",
    ],
  },
];

export const principles = [
  "Complexity belongs in the system—not in the user's head.",
  "Motion should clarify hierarchy, state or momentum.",
  "A product becomes credible when edge cases feel designed.",
];

export type ProjectVisual =
  | "distribution"
  | "resume"
  | "wave"
  | "training"
  | "finance"
  | "studio";

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
};

export const profile = {
  name: "Adnan Baig",
  firstName: "Adnan",
  role: "Full Stack Product Engineer",
  location: "Mumbai, India · Remote",
  email: "adnanbaigofficial@gmail.com",
  githubUsername: "CodnanBaig",
  headline: "I engineer digital products with the instincts of a product owner.",
  intro:
    "Full-stack developer with 4+ years of experience building responsive applications, operational dashboards, mobile products and AI-enabled tools—especially where complex workflows need to feel simple.",
  social: {
    github: "https://github.com/CodnanBaig",
    linkedin: "https://in.linkedin.com/in/adnan-baig-74b8aa21a",
    email: "mailto:adnanbaigofficial@gmail.com",
  },
  metrics: [
    { value: "4+", label: "years building products" },
    { value: "300+", label: "artists supported" },
    { value: "100+", label: "monthly releases managed" },
    { value: "05", label: "flagship products" },
  ],
};

export const projects: Project[] = [
  {
    slug: "melo-distribution-dashboard",
    title: "Melo Distribution Dashboard",
    eyebrow: "Music-tech operations platform",
    year: "2026",
    summary:
      "A database-ready artist and label workspace for managing releases, statuses, analytics, royalties and operational review.",
    description:
      "Melo needed more than a pretty dashboard. It needed a product architecture that could translate the real rhythm of music distribution—uploads, moderation, delivery, takedowns, revenue and support—into one coherent system.",
    challenge:
      "Operational information was spread across people, messages and separate workflows. Artists needed clarity while internal teams needed control, validation and a reliable audit trail.",
    approach:
      "I mapped the actual release lifecycle first, then designed reusable surfaces around the states and decisions that mattered. The UI system prioritises high-information density, clear hierarchy and dependable validation over decorative dashboard patterns.",
    outcome:
      "A scalable foundation for artist and label operations, designed to support approximately 300 artists and more than 100 monthly releases while remaining understandable to non-technical users.",
    impact: [
      "Release workflow and status architecture",
      "Artist, label and internal-team views",
      "Analytics-ready data model",
      "Reusable dashboard primitives",
    ],
    stack: ["Next.js 15", "TypeScript", "React", "Tailwind CSS", "Prisma", "Recharts", "Zod"],
    visual: "distribution",
    number: "01",
  },
  {
    slug: "resumai",
    title: "ResuMai",
    eyebrow: "AI-assisted document product",
    year: "2026",
    summary:
      "An ATS-focused resume builder combining guided AI assistance, structured editing and production-grade PDF generation.",
    description:
      "ResuMai turns an intimidating blank document into a structured product experience. It helps users shape content, edit with precision and export a polished resume without losing ownership of their voice.",
    challenge:
      "AI writing tools often generate generic copy, while traditional builders make content editing rigid. The product needed to combine guidance, flexibility and dependable document output.",
    approach:
      "I built the experience around structured resume data, rich-text editing and reusable document primitives. AI assists at controlled moments; the user remains the editor and decision-maker.",
    outcome:
      "A multi-workflow resume platform with authentication, persistent structured content, ATS-oriented editing and robust PDF generation.",
    impact: [
      "Structured AI writing flows",
      "Rich-text editing architecture",
      "Reusable resume schemas",
      "PDF and document generation",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Prisma", "PostgreSQL", "Tiptap", "React-PDF", "PDF-lib"],
    visual: "resume",
    number: "02",
  },
  {
    slug: "tunewave",
    title: "Tunewave",
    eyebrow: "Artist-facing distribution experience",
    year: "2026",
    summary:
      "A motion-led music distribution platform that turns a complicated service into a confident, modern onboarding journey.",
    description:
      "Tunewave explores how a distribution platform can feel credible to labels and approachable to independent artists at the same time.",
    challenge:
      "Music distribution products tend to feel either overly corporate or visually loud. The interface needed clarity, energy and trust without mimicking generic fintech or streaming products.",
    approach:
      "I created a modular responsive system with deliberate motion, strong type hierarchy and product-led messaging. Interactions support the story instead of competing with it.",
    outcome:
      "A polished product surface ready to communicate artist onboarding, release delivery and platform value across desktop and mobile.",
    impact: [
      "Responsive design system",
      "Motion-led onboarding",
      "Artist-focused product messaging",
      "Reusable component architecture",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "shadcn/ui", "Framer Motion"],
    visual: "wave",
    number: "03",
  },
  {
    slug: "nak-muay-trainer",
    title: "Nak Muay Trainer",
    eyebrow: "Cross-platform training companion",
    year: "2026",
    summary:
      "A practical Muay Thai training app with guided sessions, progress interfaces, media support and tactile mobile interactions.",
    description:
      "Nak Muay Trainer grew from direct training experience. The product is organised around what an athlete needs before, during and after a session—not around generic fitness-app conventions.",
    challenge:
      "Training content can become difficult to follow on a phone when the user is moving, tired or wearing gloves. Navigation and feedback had to stay immediate and physical.",
    approach:
      "I used mobile-first navigation, clear session structures, local persistence, audio/video support, haptics and concise visual feedback to reduce friction during training.",
    outcome:
      "A cross-platform companion that combines structured training content with progress visibility and offline-friendly local data.",
    impact: [
      "Training-first information architecture",
      "Audio, video and haptic feedback",
      "Local session persistence",
      "Cross-platform navigation",
    ],
    stack: ["React Native", "Expo Router", "TypeScript", "NativeWind", "AsyncStorage", "Chart Kit"],
    visual: "training",
    number: "04",
  },
  {
    slug: "dont-go-broke",
    title: "Don't Go Broke",
    eyebrow: "Personal finance, without the lecture",
    year: "2026",
    summary:
      "A lightweight expense tracker designed around the everyday reality of recording, reviewing and controlling recurring spending.",
    description:
      "Don't Go Broke is intentionally direct. It avoids complex financial terminology and focuses on helping users see where money goes while the information is still actionable.",
    challenge:
      "Most finance apps ask for too much setup or present more analysis than a user needs. The core interaction had to be quick enough to become a habit.",
    approach:
      "I designed a compact mobile flow with persistent local state, fast entry, recurring-expense visibility, notifications and haptic confirmation.",
    outcome:
      "A focused personal-finance app with a clear behavioural goal: make expense awareness easy enough to sustain.",
    impact: [
      "Fast expense-entry workflow",
      "Persistent local state",
      "Recurring expense review",
      "Notifications and haptics",
    ],
    stack: ["React Native", "Expo", "TypeScript", "NativeWind", "Zustand", "AsyncStorage"],
    visual: "finance",
    number: "05",
  },
  {
    slug: "kenmark-studio",
    title: "Kenmark Studio",
    eyebrow: "Self-hosted AI development cockpit",
    year: "2026",
    summary:
      "An IDE-shaped workspace for running AI agents, reviewing code changes, managing terminals, previews and Git on a private server.",
    description:
      "Kenmark Studio is conceived as an operational tool for developers who want agentic workflows without surrendering their project environment to a closed cloud product.",
    challenge:
      "Agent products often reduce serious software work to a chat window. This system needed to represent code, tasks, runs, approvals, previews and infrastructure as first-class surfaces.",
    approach:
      "I shaped the product around a project-centric mental model: the agent is one tool within the workspace. The interface borrows the calm density of mature IDEs and operational software rather than decorative AI dashboards.",
    outcome:
      "A detailed product and interface architecture covering the full agent lifecycle, patch approvals, terminal sessions, Git workflows, preview infrastructure and safety controls.",
    impact: [
      "Project-centric IDE architecture",
      "Agent run and approval workflows",
      "Git, terminal and preview surfaces",
      "Operational safety system",
    ],
    stack: ["Next.js", "TypeScript", "MongoDB", "WebSockets", "Monaco", "PM2", "Caddy"],
    visual: "studio",
    number: "06",
  },
];

export const experience = [
  {
    period: "Oct 2021 — Present",
    company: "Kenmark ITan Solutions",
    role: "Senior Developer / Frontend Developer",
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
    items: ["React", "Next.js", "TypeScript", "Angular", "Tailwind", "Material UI", "shadcn/ui"],
  },
  {
    number: "02",
    title: "Product systems",
    copy: "Turning messy operational knowledge into clear states, permissions, workflows and information architecture—not merely translating a mockup.",
    items: ["Product discovery", "Workflow mapping", "Dashboard UX", "Design systems", "Technical documentation"],
  },
  {
    number: "03",
    title: "Full-stack delivery",
    copy: "Connecting interfaces to dependable data, validation and deployment layers with enough backend fluency to own features end to end.",
    items: ["Node.js", "REST APIs", "Prisma", "PostgreSQL", "MongoDB", "MySQL", "Zod"],
  },
  {
    number: "04",
    title: "Mobile products",
    copy: "Cross-platform applications designed for actual hand-held behaviour, including persistence, navigation, media, notifications and haptics.",
    items: ["React Native", "Expo", "Expo Router", "NativeWind", "Zustand", "AsyncStorage"],
  },
];

export const principles = [
  "Complexity belongs in the system—not in the user's head.",
  "Motion should clarify hierarchy, state or momentum.",
  "A product becomes credible when edge cases feel designed.",
];

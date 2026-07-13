# Adnan Baig — Cinematic Portfolio

Personal portfolio for [Adnan Baig](https://github.com/CodnanBaig): a full-stack product engineer focused on web apps, operational dashboards, mobile products, and AI-enabled tools.

Built with Next.js 15, React 19, TypeScript, and custom CSS — no animation or UI libraries beyond the framework.

**Repo:** [github.com/CodnanBaig/animated-portfolio](https://github.com/CodnanBaig/animated-portfolio)

## Highlights

- Cinematic dark editorial art direction
- Responsive CSS 3D kinetic object
- Scroll reveal, parallax, tilt, and cursor-light interactions
- Curated case-study routes under `/work/[slug]`
- Live GitHub profile and repository feed via `/api/github`
- Reduced-motion and keyboard-accessibility support
- SEO metadata, Open Graph image, sitemap, robots, and web manifest

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| UI | React 19 + custom CSS |
| Package manager | pnpm |
| Data | `data/portfolio.ts` |

## Project structure

```
adnan-portfolio/
├── app/                  # App Router pages, layout, SEO, API
│   ├── api/github/       # GitHub profile + repos feed
│   ├── work/[slug]/     # Case study pages
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/           # Portfolio shell, case studies, GitHub feed
├── data/portfolio.ts     # Profile, projects, experience content
└── package.json
```

## Getting started

### Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/)

### Install and run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production

```bash
pnpm typecheck
pnpm build
pnpm start
```

Deploy to Vercel, Netlify’s Next.js runtime, or any Node host.

## Configuration

Edit all portfolio copy in `data/portfolio.ts`.

Set the canonical site URL in production:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

The GitHub route uses the public GitHub API and defaults to `CodnanBaig`. Optional token for higher rate limits:

```bash
GITHUB_TOKEN=github_pat_...
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build |
| `pnpm typecheck` | TypeScript check |

## Content note

Projects are written as case studies. Repository and live demo links are only included where you want them visible — no invented public URLs.

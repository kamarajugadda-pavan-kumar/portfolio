# Pavan Kumar — Portfolio

Personal portfolio site for Pavan Kumar, Senior GenAI / ML Engineer. Built with Next.js 14, Tailwind CSS, shadcn/ui, Framer Motion, and MDX.

## Stack

- **Framework**: Next.js 14 (App Router, TypeScript strict)
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion (entrance only, respects `prefers-reduced-motion`)
- **Content**: MDX via `next-mdx-remote` with `rehype-pretty-code` for syntax highlighting
- **Email**: Resend API for contact form
- **Deploy**: Vercel

## Project Structure

```
portfolio/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home — composes all sections
│   ├── projects/
│   │   ├── page.tsx        # /projects — filterable grid
│   │   └── [slug]/page.tsx # /projects/[slug] — MDX case study
│   ├── notes/
│   │   ├── page.tsx        # /notes — writing list
│   │   └── [slug]/page.tsx # /notes/[slug] — MDX post
│   └── api/contact/        # Contact form endpoint (Resend)
├── components/
│   ├── layout/             # Nav + Footer
│   ├── sections/           # Hero, About, Projects, Skills, Contact
│   ├── project/            # ProjectCard, ProjectFilter, MDX components
│   └── ui/                 # shadcn/ui primitives
├── content/
│   ├── projects/           # MDX case studies — ADD NEW PROJECTS HERE
│   └── notes/              # MDX blog posts — ADD NEW POSTS HERE
├── data/
│   └── skills.ts           # Skills data — edit to update Skills section
├── lib/
│   ├── projects.ts         # getAllProjects(), getProject(slug)
│   ├── notes.ts            # getAllNotes(), getNote(slug)
│   ├── mdx.ts              # rehype/remark plugin config
│   └── motion.ts           # Framer Motion variants
└── public/
    ├── resume.pdf          # Drop your resume here
    └── projects/           # Project hero images
```

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in RESEND_API_KEY and NEXT_PUBLIC_SITE_URL
npm run dev
```

## How to Add a New Project

1. Create `content/projects/your-project-slug.mdx`
2. Fill in the frontmatter:

```mdx
---
title: "Your Project Title"
description: "One-line description for cards"
longDescription: "Longer description for SEO / about context"
tags: ["RAG", "Agents"]          # pick from ProjectTag type in lib/projects.ts
stack: ["Python", "LangChain"]   # tech stack badges
image: "/projects/your-image.png" # drop image in public/projects/
github: "https://github.com/..."  # optional
demo: "https://..."               # optional
featured: true                    # show on home page?
date: "2025-03-01"               # ISO date
status: "live"                   # "live" | "in-progress" | "archived"
---

## Your case study content here...
```

3. Drop a hero image (recommended: 1200×630 px) at `public/projects/your-image.png`
4. The project automatically appears at `/projects/your-project-slug`
5. Set `featured: true` to show it on the home page (keep ≤ 3 featured)

### Custom MDX Components

Inside your case study you can use:

```mdx
<Callout type="tip">This is a tip callout.</Callout>
<Callout type="warning">Watch out for this.</Callout>

<ArchDiagram src="/projects/arch.png" alt="Architecture" caption="Caption text" />

<Steps>
  <Step title="Step one">Description of step one.</Step>
  <Step title="Step two">Description of step two.</Step>
</Steps>
```

## How to Add a New Blog Post

1. Create `content/notes/your-post-slug.mdx`
2. Fill in frontmatter:

```mdx
---
title: "Your Post Title"
description: "One-line summary shown in the list and SEO"
date: "2025-03-01"
tags: ["RAG", "Tooling"]
draft: false   # set true to hide from list
---

Your content here...
```

3. The post automatically appears at `/notes/your-post-slug`

## Updating Personal Info

| What | Where |
|---|---|
| Name / value prop | `components/sections/hero.tsx` |
| About paragraphs | `components/sections/about.tsx` |
| Stats (years exp, etc.) | `components/sections/about.tsx` — `stats` array |
| Currently learning | `components/sections/about.tsx` — `currentlyBuilding` array |
| Skills | `data/skills.ts` |
| Social links | `components/layout/footer.tsx` + `components/sections/contact.tsx` |
| Nav logo | `components/layout/nav.tsx` |
| Email (contact form) | `app/api/contact/route.ts` |
| Site URL / OG metadata | `app/layout.tsx` + `.env.local` |
| Resume PDF | `public/resume.pdf` |

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# NEXT_PUBLIC_SITE_URL = https://your-domain.com
# RESEND_API_KEY = re_xxxx
```

Or push to GitHub and connect the repo in the Vercel dashboard — it auto-deploys on every push to `main`.

### Custom Domain

In Vercel → Project Settings → Domains, add your domain. Update `NEXT_PUBLIC_SITE_URL` to match.

## Contact Form Setup

1. Sign up at [resend.com](https://resend.com) (free: 100 emails/day)
2. Verify your sending domain
3. Create an API key
4. Add to `.env.local`: `RESEND_API_KEY=re_xxxx`
5. Update the `from` address in `app/api/contact/route.ts` to match your verified domain

## Adding a Profile Photo

Drop your photo at `public/avatar.jpg` (recommended: 400×400 px, square), then add it to the About section in `components/sections/about.tsx`.

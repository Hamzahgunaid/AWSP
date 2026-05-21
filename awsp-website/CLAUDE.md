# CLAUDE.md — AWSP Programme Website

## Project Identity
- Name: AWSP Programme Website (Aden Water Sector Plan)
- Client: Ministry of Water and Environment (MWE) / LWSCA – Aden, Yemen
- Framework: Next.js 14, TypeScript, Tailwind CSS
- Deployment: Vercel

## Architecture Rules
- App Router (Next.js 14) — use /src/app directory structure
- All pages use server components by default
- Client components marked with "use client" only when needed
  (interactivity, hooks, browser APIs)
- No pages router — App Router only

## Bilingual RTL/LTR
- Default language: Arabic (RTL). HTML dir="rtl" lang="ar"
- English toggle: LTR. HTML dir="ltr" lang="en"
- Use CSS logical properties throughout:
  - margin-inline-start / margin-inline-end (NOT margin-left / margin-right)
  - padding-inline-start / padding-inline-end
  - text-align: start (NOT text-align: left)
  - inset-inline-start (NOT left:)
- Directional icons (arrows, chevrons): apply [dir="rtl"] .icon-dir { transform: scaleX(-1) }
- i18n via next-i18next. Translation files:
  - /public/locales/en/common.json
  - /public/locales/ar/common.json

## Design Tokens (CSS Custom Properties)
Define all in /src/styles/tokens.css:
  --color-navy: #1A3557
  --color-teal: #0D7A6E
  --color-gold: #C8922A
  --color-bg: #F4F6F8
  --color-surface: #FFFFFF
  --color-table-fill: #D5E8F0
  --color-text: #0D0D0D
  --color-text-muted: #8A9BB0
  --color-active: #0D7A6E
  --color-complete: #C8922A
  --color-future: #C5CDD6
  --color-danger: #D97706
  --font-display: 'Cairo', sans-serif
  --font-body-ar: 'Noto Naskh Arabic', serif
  --font-display-en: 'Source Serif 4', serif
  --font-body-en: 'Source Sans 3', sans-serif
  --header-height: 64px
  --max-width: 1280px
  --radius-sm: 4px
  --radius-md: 8px
  --radius-lg: 16px
  --shadow-card: 0 2px 12px rgba(0,0,0,0.08)
  --shadow-card-hover: 0 8px 24px rgba(0,0,0,0.14)
  --shadow-header: 0 2px 8px rgba(0,0,0,0.08)
  --transition-fast: 150ms ease
  --transition-medium: 300ms ease

## Typography
Google Fonts used (load in layout.tsx):
  - Cairo (Arabic UI + headings): weights 400, 500, 600, 700
  - Noto Naskh Arabic (Arabic body): weight 400
  - Source Serif 4 (English display/headings): weights 400, 600, 700
  - Source Sans 3 (English body/UI): weights 400, 500, 600

## Colour Usage Rules
- Navy (#1A3557): headers, footer bg, primary buttons, KPI band
- Teal (#0D7A6E): sub-headings, active states, hover accents, links
- Gold (#C8922A): KPI decorators, completed milestones, accent borders
- Never use directional CSS (left/right) — always logical properties

## Component Rules
- All components in /src/components/[Category]/ComponentName.tsx
- Every component accepts locale: 'ar' | 'en' prop
- Use clsx + tailwind-merge for conditional classes
- No inline styles except for dynamic values (e.g. chart colours)
- Images: always use next/image with explicit width and height

## Data Files (JSON seeds — in /src/data/)
  - projects.json — 193 project records
  - phases.json — 12 AWSP phases
  - taskforce.json — Taskforce member profiles (initially empty array)
  - stakeholders.json — stakeholder directory
  - news.json — news and events (initially empty array)
  - documents.json — knowledge products (initially empty array)
  - partners.json — 3 primary partner cards (MWE, LWSCA, Taskforce)

## File Naming
- Components: PascalCase (SiteHeader.tsx)
- Pages: lowercase with hyphens (about/page.tsx)
- Utilities: camelCase (formatCurrency.ts)
- Data files: camelCase (projects.json)

## Vercel Deployment
- vercel.json config at project root
- Environment variables: NEXTAUTH_SECRET, NEXTAUTH_URL
- No build-time secrets in code

## Key Constraints
- No localStorage or sessionStorage in components
- No hardcoded Arabic or English text in components —
  always use t('key') from useTranslation
- No directional CSS properties (left, right, margin-left etc.)
- All images must have descriptive alt text
- WCAG 2.1 AA colour contrast minimum

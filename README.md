# CAC40 GenAI Scout

> Market intelligence tool identifying which CAC40 companies are most bullish on GenAI — and generating personalised Anthropic demo proposals in real time.

Built by [Vincent Méoc](https://whyme4anthropic.vmcloud.fr/) · Solutions Architect, Applied AI  
[LinkedIn](https://www.linkedin.com/in/vincent-meoc/) · [Blog IA](https://ai.vmcloud.fr/) · [Pourquoi Vincent pour Anthropic?](https://whyme4anthropic.vmcloud.fr/)

---

## What it does

CAC40 GenAI Scout is a **sales intelligence demo** for Anthropic commercial engineers. It answers three questions:

1. **Who to call?** — Which of the 40 largest French companies invest most in GenAI?  
2. **What to say?** — What are their current use cases, gaps, and competitive pressure?  
3. **How to pitch?** — Generate a personalised demo proposal or prospecting email in one click.

### Core features

| Feature | Description |
|---|---|
| **GenAI Scoreboard** | All 40 CAC40 companies ranked by GenAI maturity score (0–100) |
| **Live Claude Analysis** | Streaming analysis of any company's GenAI strategy via Tavily + Claude |
| **Use Case Inventory** | Static + AI-discovered use cases per company (EN PROD / PILOTE / ANNONCÉ) |
| **Contact Finder** | AI-powered discovery of CDOs, CTOs, Head of AI at each company |
| **Competitor Radar** | 5-dimension comparison chart vs sector peers (Recharts RadarChart) |
| **Demo Builder** | Claude generates a tailored demo proposal or prospecting email, streamed live |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser (Next.js)                        │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Dashboard   │  │ Company page │  │   DemoBuilder Modal  │  │
│  │  CAC40Grid   │  │  4 tabs      │  │   Demo / Email gen   │  │
│  │  CompanyCard │  │  (persisted) │  │   Copy to clipboard  │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
│         │                 │                       │              │
└─────────┼─────────────────┼───────────────────────┼─────────────┘
          │                 │                       │
          ▼                 ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Next.js API Routes (Edge)                     │
│                                                                  │
│  /api/analyze          /api/contacts    /api/competitors         │
│  POST {slug}           GET ?slug=       GET ?slug=               │
│  → streaming text      → JSON array     → JSON object            │
│                                                                  │
│  /api/demo                                                       │
│  POST {slug, useCase, mode: "demo"|"email"}                      │
│  → streaming text                                                │
└──────────┬──────────────────────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────┐
│              External APIs                    │
│                                              │
│  Tavily Search API                           │
│  ├─ 2× parallel queries per analysis         │
│  ├─ French + English search results          │
│  └─ Returns titles, content, URLs            │
│                                              │
│  Anthropic Claude API                        │
│  ├─ claude-haiku-4-5  (analysis, contacts,   │
│  │                     competitors)          │
│  └─ claude-sonnet-4-6 (demo, email — richer) │
└──────────────────────────────────────────────┘
```

### Data flow — Live Analysis

```
User clicks "Lancer l'analyse Claude"
         │
         ▼
POST /api/analyze { slug: "bnp-paribas" }
         │
         ├─► Tavily: "BNP Paribas GenAI stratégie IA 2024 2025"
         ├─► Tavily: "BNP Paribas artificial intelligence use cases"
         │       └─ Returns 8 articles (titles + content)
         │
         ├─► Claude Haiku: buildAnalysisPrompt(company, sector, searchResults)
         │       └─ Streams markdown: Score, Résumé, Investissements,
         │          Use cases, Avantages, Points d'attention,
         │          Recommandation Anthropic
         │
         └─► ReadableStream → Client chunks → renderMarkdown() → UI
```

### Scoring methodology

| Dimension | How it's calculated | Weight |
|---|---|---|
| **Budget IA** | Disclosed AI investment figures from annual reports & press | 25% |
| **Use cases prod** | Number of GenAI use cases confirmed in production | 25% |
| **Partenariats** | AI vendor partnerships depth (signed / integrated / co-built) | 20% |
| **Recrutement** | AI job posting growth rate (LinkedIn/Indeed, 12-month rolling) | 15% |
| **Communication** | Public GenAI communication frequency (earnings, keynotes, blog) | 15% |

**YoY Trend** (`company.trend`): Estimated % change in the composite score between 2024 and 2025, based on the pace of public announcements, hiring and partnership announcements over a 12-month rolling window. Sourced from Tavily search results and validated manually.

> ⚠️ Scores and trends are **indicative estimates** based on publicly available data as of April 2025. They are not audited figures.

---

## How use cases are discovered

Use cases come from two sources:

1. **Static dataset** (`lib/cac40-data.ts`) — Pre-populated from public sources:
   - Company annual reports (rapports annuels RSE/Digital)
   - Executive interviews in Les Échos, Le Monde, BFM Business
   - LinkedIn company pages and job descriptions
   - Official press releases and investor day presentations

2. **Live Claude analysis** (Analyse IA tab) — Claude reads Tavily search results in real time and identifies additional use cases mentioned in:
   - Recent press articles
   - Conference presentations
   - Regulatory filings mentioning AI projects

Each use case is tagged with:
- **Status**: `EN PROD` (confirmed deployed) / `PILOTE` (pilot/PoC) / `ANNONCÉ` (announced intent)
- **Department**: e.g. Juridique, Finance, RH, Service Client
- **Description**: What Claude does specifically in this use case

---

## How contacts are found

1. **Tavily search** runs two parallel queries:
   - `"{Company}" Chief Data Officer Chief AI Officer GenAI 2024 2025`
   - `"{Company}" CDO CTO digital transformation AI leadership interview`

2. **Claude Haiku** extracts structured contact data from the results:
   - Name, title, department
   - Confidence level (high/medium/low based on source quality)
   - Source URL
   - Talking points (specific AI initiatives they own)

3. **Static fallback**: The `knownLeader` field from the dataset is always injected as a guaranteed first contact, even if live search returns nothing.

> Contacts shown are based on **publicly available information** (LinkedIn, press, company websites). RGPD compliant — no scraping of private data.

---

## Tech stack

```
Framework      Next.js 15 (App Router, edge runtime)
Language       TypeScript 5
Styling        Tailwind CSS v4 (CSS-first config)
Animations     Framer Motion
Charts         Recharts (RadarChart)
AI             Anthropic Claude API (claude-haiku-4-5, claude-sonnet-4-6)
Search         Tavily API
Icons          Lucide React
Deployment     Vercel (region: cdg1 Paris)
```

---

## Setup

### Prerequisites
- Node.js 18+
- Anthropic API key: [console.anthropic.com](https://console.anthropic.com)
- Tavily API key (free tier): [tavily.com](https://tavily.com)

### Local development

```bash
git clone <repo>
cd cac40-genai-scout
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local and add your keys

npm run dev
# App available at http://localhost:3000
```

### Environment variables

```bash
ANTHROPIC_API_KEY=sk-ant-api03-...
TAVILY_API_KEY=tvly-...
```

### Deploy to Vercel

```bash
npx vercel login
npx vercel --prod

# Add env vars in Vercel dashboard:
# Settings → Environment Variables → ANTHROPIC_API_KEY + TAVILY_API_KEY
# Then redeploy
```

---

## Project structure

```
cac40-genai-scout/
├── app/
│   ├── page.tsx                 # Dashboard (stats + CAC40 grid)
│   ├── company/[slug]/page.tsx  # Company detail (4 tabs, persisted state)
│   ├── api/
│   │   ├── analyze/route.ts     # Streaming GenAI analysis (edge)
│   │   ├── contacts/route.ts    # Contact discovery
│   │   ├── competitors/route.ts # Competitive radar analysis
│   │   └── demo/route.ts        # Demo/email generation (streaming, edge)
│   ├── globals.css              # Dark theme, animations, glassmorphism
│   └── layout.tsx               # Root layout + metadata
│
├── components/
│   ├── Header.tsx               # Sticky header with author links
│   ├── CAC40Grid.tsx            # Filterable/sortable company grid
│   ├── CompanyCard.tsx          # Individual company card
│   ├── StreamingAnalysis.tsx    # Live Claude streaming analysis
│   ├── UseCaseCards.tsx         # Use case cards with status badges
│   ├── ContactFinder.tsx        # AI-powered contact discovery UI
│   ├── CompetitorMatrix.tsx     # Radar chart + competitive insights
│   └── DemoBuilderModal.tsx     # Demo/email generation modal
│
├── lib/
│   ├── cac40-data.ts            # 40-company dataset + types
│   ├── prompts.ts               # All Claude prompt templates
│   ├── render-markdown.ts       # Shared markdown → React renderer
│   └── utils.ts                 # Score colors, labels, cn()
│
└── scripts/
    └── gen-data.mjs             # Script used to generate cac40-data.ts
```

---

*CAC40 GenAI Scout — built as a job application demo for Anthropic Commercial Engineer role.*  
*Contact: [Vincent Méoc](https://www.linkedin.com/in/vincent-meoc/)*

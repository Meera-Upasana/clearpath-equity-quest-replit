# ClearPath Health — Health Equity Intelligence

## Overview
A full-stack health equity intelligence platform for identifying high-risk ZIP codes, FQHC coverage gaps, federal funding deserts, and AI-powered grant proposal generation.

## Tech Stack
- **Frontend**: React 18 + TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack Query, Recharts
- **Backend**: Node.js + Express + TypeScript (`server/` directory), tsx for dev running
- **Routing**: React Router DOM v6
- **AI**: Anthropic Claude (streaming SSE grant proposals)
- **Caching**: node-cache with configurable TTLs

## Architecture

```
/
├── src/              # React frontend (Vite, port 5000)
│   ├── pages/        # Dashboard, MapIntelligence, GrantBuilder, DataSources, NotFound
│   ├── components/   # Shared UI + map + grant components
│   ├── hooks/        # useCDCData, useCompetitiveAnalysis, useGrantProposal
│   └── data/         # Static fallback state health data
├── server/           # Express API (port 3001)
│   └── src/
│       ├── index.ts          # App entry, CORS, rate limiting
│       ├── zipCentroids.ts   # ZIP→lat/lng lookup + Haversine
│       ├── routes/
│       │   ├── cdc.ts        # CDC PLACES API proxy
│       │   ├── hrsa.ts       # HRSA FQHC coverage API
│       │   ├── usaspending.ts # USAspending.gov grants API
│       │   ├── competitive.ts # Orchestration layer
│       │   ├── grants.ts      # Claude SSE grant generation
│       │   └── health.ts      # Upstream API health checks
│       └── fallback/
│           └── cdc-static.ts  # 51-state hardcoded fallback
└── vite.config.ts    # Proxies /api/* to localhost:3001
```

## Running the App
Two workflows run concurrently:
- **Start application**: `npm run dev` — Vite frontend on port 5000
- **API Server**: `cd server && npm start` — Express API on port 3001

The Vite dev server proxies all `/api/*` requests to the Express server.

## Live APIs
| API | URL | Cache TTL |
|-----|-----|-----------|
| CDC PLACES | chronicdata.cdc.gov | 24h |
| HRSA FQHC | data.hrsa.gov | 12h |
| USAspending | api.usaspending.gov | 6h |
| Anthropic Claude | api.anthropic.com | (no cache) |

All APIs degrade gracefully to fallback/static data if unreachable.

## Environment Variables
Set these in Replit Secrets:
- `ANTHROPIC_API_KEY` — Required for AI grant proposal generation
- `PORT` — Server port (default: 3001)
- `CDC_CACHE_TTL_HOURS` — CDC cache TTL in hours (default: 24)
- `USASPENDING_CACHE_TTL_HOURS` — USAspending cache TTL (default: 6)
- `HRSA_CACHE_TTL_HOURS` — HRSA cache TTL (default: 12)

## Key Features
1. **Map Intelligence** — Choropleth US map with live CDC PLACES data (diabetes, obesity, smoking, hypertension, mental health, no checkup); ZIP code competitive analysis with HRSA + USAspending live lookup
2. **Grant Builder** — AI-powered proposal generation via Claude with SSE streaming and blinking cursor animation
3. **Data Sources** — Live connection testing for all 4 upstream APIs with response time display
4. **Dashboard** — Overview KPIs and charts (static)

## Migration Notes (Lovable → Replit)
- Removed `lovable-tagger` plugin from `vite.config.ts`
- Changed Vite host/port to `0.0.0.0:5000` for Replit compatibility
- Added `/api` proxy in Vite config pointing to Express on port 3001
- Added full Express backend server in `server/` directory
- `allowedHosts: true` set for Replit proxy compatibility

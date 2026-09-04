# Satellite Intelligence Platform — Frontend Prototype

Prototype UI for **SIH26227 — Semantic Retrieval and Multi-Temporal Change
Analysis of Satellite Imagery**, built for SIH 2026.

This is a **frontend-only demo**. There is no backend, no database, no
authentication, and no AI/LLM calls of any kind. All "intelligence" —
search results, similarity scores, change detection, confidence — is
local mock data served through small `async` functions that simulate
network latency (~700ms), so the app already behaves like it's talking
to a real API.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

To produce a static production build:

```bash
npm run build
npm run preview   # serve the build locally to sanity-check it
```

No API keys, accounts, or environment variables are required.

## Demo flow (~1–2 minutes)

1. On the dashboard, run the pre-filled query **"Find newly built
   structures near water"** (or click a quick-query chip).
2. Three ranked scenes appear on the left, with similarity scores, and
   as markers on the map on the right. Click a result or a marker to
   highlight it on both sides.
3. Click **ANALYZE** on a scene to open the temporal change view.
4. See the before/after satellite comparison (toggle to the slider
   view), the detected change type, confidence score, change mask, full
   image metadata, and the processing provenance trail.
5. Click **BACK TO SEARCH** to return to the dashboard.

Optional side paths: the date/sensor/AOI filters narrow the result
list locally; "Upload Satellite Image" + "Find Similar" runs a mock
image-to-image search; typing "no results" or "nothing" into the search
box demonstrates the empty-results state.

## What's real vs. mock

| Layer | This prototype | Future integration |
|---|---|---|
| Query routing | `src/router/queryRouter.js` — plain keyword matching | same interface, could stay rule-based or call a real router |
| Semantic search | `src/services/searchApi.js` returns `src/mock/searchData.js` | Person 1 API — `POST /query` |
| Change detection | `src/services/changeApi.js` returns `src/mock/changeData.js` | Person 2 API — `POST /change` |
| Satellite imagery | Procedurally generated demo JPGs in `public/images/` | real Sentinel-2 tiles/chips |

The two service files are the only places that touch "data fetching."
Swapping them to call a real FastAPI backend (see section 31 of the
brief) should not require touching any component or page — every
component consumes plain JS objects with the same shape the mock data
already returns.

## Stack

React 19 + Vite, Tailwind CSS v4 (via `@tailwindcss/vite`), React
Leaflet + Leaflet (OpenStreetMap/CARTO dark tiles), Lucide icons. No
other frameworks.

## Project structure

```
src/
├── components/     Header, SearchBar, SearchResults, ResultCard,
│                   MapView, BeforeAfter, ChangeMask, MetadataPanel,
│                   ConfidenceScore, Provenance, Workflow
├── pages/          Dashboard.jsx, Analysis.jsx
├── services/       searchApi.js, changeApi.js  (the future-API seam)
├── mock/           searchData.js, changeData.js
├── router/         queryRouter.js
├── App.jsx         holds the dashboard/analysis view state
└── main.jsx
public/images/      procedurally generated demo satellite imagery
```

## Notes

- All coordinates, dates, scores, and confidence values are synthetic
  demonstration data and do not represent real locations or findings.
- The map requires internet access in the browser to load OpenStreetMap/
  CARTO tiles; markers, popups, search, and analysis all work even if
  tiles fail to load.
"# temp" 

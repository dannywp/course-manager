# Golf Course Portal

A small React portal for managing golf courses, built as a take-home assignment from a Figma design.

**Status:** Planning complete. Implementation in progress.

## How to review

- [docs/DECISIONS.md](docs/DECISIONS.md): main tradeoffs
- [docs/AI_LOG.md](docs/AI_LOG.md): how AI was used, reviewed and corrected
- [docs/PLAN.md](docs/PLAN.md): slices and acceptance criteria
- [docs/ASSUMPTIONS.md](docs/ASSUMPTIONS.md): how gaps in the brief and Figma were resolved
- [docs/ASSIGNMENT.md](docs/ASSIGNMENT.md): the brief

## Setup

Tested on Node 24.

```sh
npm install
npx playwright install chromium
npm run dev
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server at http://localhost:5173 |
| `npm run build` | Typecheck and production build |
| `npm run preview` | Serve the production build |
| `npm run typecheck` | TypeScript (strict) |
| `npm run lint` | ESLint |
| `npm test` | Unit and component tests (Vitest) |
| `npx playwright test` | End-to-end tests; starts the dev server itself |

## Assumptions

- **City field:** Figma has a required City/State field that the brief doesn't list. It is included, and cards show "City, CC".
- **Featured timestamps:** turning Featured on stamps the save time. Saving an already-featured course keeps its time. Turning it off clears it.
- **Image persistence:** images are stored in IndexedDB, so they survive a refresh. A missing image falls back to the placeholder.
- **Breakpoints:** derived from the 304px card minimum width: 2 columns from 720px, 3 from 1056px, 4 from 1392px.
- **Failure toggle:** a labelled demo control for failing list, save and delete calls. It ships in production builds so reviewers can trigger errors and the rollback.

The rest are in [docs/ASSUMPTIONS.md](docs/ASSUMPTIONS.md).

## Tradeoffs

See [docs/DECISIONS.md](docs/DECISIONS.md).

- **D1:** grid breakpoints come from the card minimum width, not generic sizes. A 1280px laptop shows 3 columns.
- **D2:** course data (localStorage) and images (IndexedDB) persist together, at the cost of one small dependency and object-URL handling.
- **D3:** the service owns the business rules (timestamps and ordering), as a real backend would.
- **D4:** failure simulation is deterministic and per operation, so every error path can be shown on demand.

## What I would improve with more time

_To be filled in as the work progresses._

## AI usage

_Summary to be written at the end. Full log in [docs/AI_LOG.md](docs/AI_LOG.md)._

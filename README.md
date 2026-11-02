# Golf Course Portal

A small React portal for managing golf courses, built as a take-home assignment from a Figma design.

**Status:** done. The core flow is complete: list, create, edit, delete with optimistic rollback, live preview, images that survive a refresh and featured ordering. So are three nice-to-haves: an end-to-end test, offline support and accessibility polish.

## How to review

- [docs/DECISIONS.md](docs/DECISIONS.md): main tradeoffs
- [docs/AI_LOG.md](docs/AI_LOG.md): how AI was used, reviewed and corrected
- [docs/PLAN.md](docs/PLAN.md): slices and acceptance criteria
- [docs/ASSUMPTIONS.md](docs/ASSUMPTIONS.md): how gaps in the brief and Figma were resolved
- [docs/ASSIGNMENT.md](docs/ASSIGNMENT.md): the brief

Things to try in the running app, after [Setup](#setup). Every service call takes 600–900 ms, so loading states are visible.

- **Featured ordering:** open the menu on a course without the FEATURED badge, choose Edit, tick Featured and save. It shows last among the featured courses.
- **Delete rollback:** open **Demo controls** at the bottom right, tick **Fail deletes** and delete a course. The card disappears at once, comes back in the same place, and a notice names the course.
- **Error states:** with **Fail list** on, reload the page or open an edit page to see the error with Retry. With **Fail saves** on, Save shows a banner and keeps the form filled.
- **Images:** create a course with an image, save and reload. The image is still on the card and in the edit form.
- **Offline:** run `npm run build && npm run preview` and open http://localhost:4173. Load the list once, switch DevTools to offline and reload. The list still shows, with an "Offline" badge.
- **Code splitting:** run `npm run dev` and open the Network panel. The create and edit pages' route files load only when you open those pages. `npm run preview` doesn't show this, because its service worker downloads every route file after the first load, for offline use.

## Setup

Tested on Node 24.

```sh
npm install
npx playwright install chromium   # only needed for npm run test:e2e
npm run dev
```

`npm install` reports 21 vulnerabilities and that ESLint 9 is no longer supported. All of them are in dev tooling (ESLint and the service worker build), and `npm audit --omit=dev` finds none.

| Command | What it does |
|---|---|
| `npm run dev` | Dev server at http://localhost:5173 |
| `npm run build` | Typecheck and production build |
| `npm run preview` | Serve the production build (run `npm run build` first), with offline support, at http://localhost:4173 |
| `npm run typecheck` | TypeScript (strict) |
| `npm run lint` | ESLint |
| `npm test` | Unit and component tests (Vitest) |
| `npm run test:e2e` | End-to-end tests (Playwright); starts the dev server itself |

Open the app on localhost or HTTPS. Course ids come from `crypto.randomUUID`, which browsers only provide in secure contexts, so a plain-HTTP address such as `vite --host` opened from a phone won't work.

## Assumptions

- **City field:** Figma has a required City/State field that the brief doesn't list. It is included, and cards show "City, CC".
- **Featured timestamps:** turning Featured on stamps the save time. Saving an already-featured course keeps its time. Turning it off clears it.
- **Image persistence:** images are stored in IndexedDB, so they survive a refresh. A missing image falls back to the placeholder.
- **Breakpoints:** derived from the 304px card minimum width: 2 columns from 720px, 3 from 1056px, 4 from 1392px.
- **Failure toggle:** a labelled demo control for failing list, save and delete calls. It ships in production builds so reviewers can trigger errors and the rollback.
- **Dropdowns:** native `<select>` elements. Browsers with CSS `appearance: base-select` show the open list as in Figma, and others show their own.
- **Colours:** the Figma colours are kept, although several fall below the 4.5:1 contrast minimum. The axe check turns off only the contrast rule.
- **Seed data:** six courses, two of them featured. Deleting every course shows the empty state, and clearing the site data in DevTools (Application → Storage) brings the seed courses back.

The rest are in [docs/ASSUMPTIONS.md](docs/ASSUMPTIONS.md).

## Tradeoffs

See [docs/DECISIONS.md](docs/DECISIONS.md).

- **D1:** grid breakpoints come from the card minimum width, not generic sizes. A 1280px laptop shows 3 columns.
- **D2:** course data (localStorage) and images (IndexedDB) persist together, at the cost of one small dependency and object-URL handling.
- **D3:** the service owns the business rules (timestamps and ordering), as a real backend would.
- **D4:** failure simulation is deterministic and per operation, so every error path can be shown on demand.

Smaller ones (the numbers are [docs/ASSUMPTIONS.md](docs/ASSUMPTIONS.md) entries):

- **Save waits for the fresh list** (#50). "Saving…" lasts about twice the latency, but the new course is already in place when the list appears.
- **The edit page always loads fresh** (#57). The loading state shows on every visit, but the form can't be prefilled with an old cached copy.
- **Native `<dialog>` and `<select>`** (#48 for selects). The browser provides Escape, the inert page behind the modal and keyboard selection in the selects. Only Tab wrapping and the initial focus on Cancel are custom.
- **Images are stored on Save, not when chosen** (#61). Cancel or a failed save leaves nothing behind in IndexedDB.
- **A new version reloads open tabs** (#72). An open tab never asks for route files a new build removed, but text typed in its first seconds is lost.

## What is tested and why

190 Vitest tests and 6 Playwright tests. They cover the rules and failure paths that are easy to get subtly wrong and hard to see in the UI:

- **Featured ordering and timestamps** (`src/services/course-rules.test.ts`, written first and committed with the code): the brief's feat1–feat4 example, every featured transition, and ties.
- **Optimistic delete** (`src/routes/courses-page.test.tsx`): with deletes failing, the card is removed, comes back in its position from the snapshot rather than from the refetch, and the notice names the course.
- **The form** (`src/routes/create-course-page.test.tsx`, `src/routes/edit-course-page.test.tsx`): an error per required field with focus on the first, one course from a double click, values kept after a failed save, and edits kept when a background refresh fails.
- **The service** (`src/services/local-courses-service.test.ts`): data survives a new service instance, as after a refresh, and replacing or deleting an image leaves no orphaned blobs.
- **End to end** (`e2e/`): create a featured course with an image, check its position, reload, delete it; and an axe check on four states.

To check that the tests can fail, the agent broke the code on purpose on a scratch copy in each slice from Slice 1 on, about 180 times in total. Where a break went unnoticed, the test was tightened or the unreachable code removed. A few mock behaviours were left untested on purpose.

## What I would improve with more time

- **An accessibility review**, which I deferred to after the project:
  - the Figma colours that fail contrast
  - focus after a route change, after Retry and after a failed save
  - screen-reader text for the loading skeleton
  - Windows High Contrast
  - a delete failure that arrives while the modal is open
  - Tab in an open card menu: it returns focus to the menu button (#42), where the WAI-ARIA menu button pattern moves on to the next element
- **Overlapping deletes:** when a second delete starts while the first is running, a failure of the first may not be named (#47). The list still ends up correct, but every failed course should be named.
- **Missing features:** "Reset demo data", an unsaved-changes guard (#24) and removing an image (#67).
- **Demo controls:** a collapsed panel hides active switches, a corrupted switch value crashes the app, and corrupted course data can't be recovered from the UI.
- **CI** running typecheck, lint, unit and end-to-end tests on every push.
- **Images:** resize them before storing, and handle a full storage quota.

## AI usage

The full log, slice by slice, is in [docs/AI_LOG.md](docs/AI_LOG.md). The logged sessions add up to about 10 hours of total running time, including agent runs, reviews and checks.

**Tools**
- Claude Code with Opus for everything: planning, code, tests and reviews. The subagents use the same model.
- The Figma MCP server until it hit the Starter-plan call limit, then the Figma REST API, with a snapshot saved in [docs/figma/](docs/figma/README.md).
- The Playwright MCP server for browser checks, and a separate Claude chat session as an independent reviewer of the plan, CLAUDE.md and some of the agent's fixes.

**How I set them up**
- [CLAUDE.md](CLAUDE.md) is a short router to the plan, decisions, assumptions, design tokens and Figma snapshot. Hooks run typecheck and lint after every code edit, and block the agent's commits when the subject isn't a Conventional Commit.
- Subagents: `reviewer` and `a11y-auditor`, which have no edit tools, and `test-writer`. Commands: `/slice <n>`, which stops for my approval of the plan and of the commit, and `/review`, which runs the reviewer on the uncommitted diff.
- Every slice started with a plan I approved before any code. Before submitting, a clean clone went through install, build, unit and e2e tests.

**What it helped with most:** extracting design data from Figma, listing every UI state, and breaking the code on purpose to find tests that passed without protecting anything.

**How I reviewed and corrected it.** Three examples; the full log is in [docs/AI_LOG.md](docs/AI_LOG.md).
- The independent review found that the plan's breakpoints (1024px and 1280px) didn't fit the card minimum, gap and padding the agent had extracted itself. I recomputed them as 1056px and 1392px (D1).
- When jsdom reported two banner landmarks, the agent changed a correct `<header>` to a `<div>` to make the test pass. I reverted it and changed the test instead.
- The agent twice reported changes to files that weren't changed. I now check `git diff` instead of its summary, and CLAUDE.md requires diff output for every claimed change.

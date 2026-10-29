# Decisions

Tradeoffs made where the brief or the Figma design leaves room. Smaller assumptions are in [ASSUMPTIONS.md](ASSUMPTIONS.md).

## D1. Grid breakpoints come from the card minimum width

**Context.** The Figma cards have a 304px minimum width and a 32px gap. The page has 40px horizontal padding on desktop and 16px on mobile. The design only shows 4 columns at 1440px and 1 column at 402px.

From 720px up, the page padding is 40px, and the width *n* columns need is `n × 304 + (n − 1) × 32 + 2 × 40`. Below 720px the padding is 16px and there is a single column, so this formula doesn't apply there.

| Columns | Content width | With padding |
|---|---|---|
| 2 | 640px | **720px** |
| 3 | 976px | **1056px** |
| 4 | 1312px | **1392px** |

Generic breakpoints would squeeze cards below their minimum width. At 1024px only 944px of content width is available, but 3 columns need 976px. At 1280px only 1200px is available, but 4 columns need 1312px.

**Decision.**

| Viewport | Columns | Page padding |
|---|---|---|
| < 720px | 1 (card capped at 380px) | 16px |
| 720–1055px | 2 | 40px |
| 1056–1391px | 3 | 40px |
| ≥ 1392px | 4 | 40px |

Tracks are `minmax(min(304px, 100%), 380px)` and centered. 380px is the card maximum from Figma. The `min()` lets the single column shrink below 304px: a fixed 304px minimum plus 16px padding needs 336px, so a 320px phone would scroll sideways. The card component itself sets no `min-width`. The "Create a course" row shares the grid's width so it stays aligned with the cards.

**Consequence.** A 1280px laptop shows 3 columns. The 1440px design still shows 4.

## D2. Course data and images persist together

**Context.** Keeping courses in localStorage but images as session-only object URLs would leave cards pointing at images that are gone after a refresh.

**Decision.** Course records go in localStorage. Image blobs go in IndexedDB (`idb-keyval`), keyed by `imageId`. Records store only the `imageId`.
- The service turns `imageId` into an object URL, cached per id. The URL is revoked when the image is replaced or the course is deleted.
- Deleting a course deletes its blob. Replacing an image deletes the old blob.
- A missing blob resolves to `null`, and the UI shows the placeholder. The UI also falls back to the placeholder on an image load error.
- Seed images are static files in `/public/seed`. They resolve to those static paths and are never stored in IndexedDB.

**Consequence.** A refresh during review keeps both data and images. This costs one small dependency and URL lifecycle handling in the service.

## D3. Business rules live in the service

**Context.** Featured ordering depends on when a course became featured. Someone has to stamp that time and sort the list.

**Decision.** The service plays the server. When saving, it stamps `createdAt`, `updatedAt` and `featuredAt` with its own clock:

| `featured` before → after | `featuredAt` |
|---|---|
| — → true (create) | save time |
| false → true | save time |
| true → true | unchanged |
| true → false | `null` |

`list()` returns courses already sorted: featured courses first by `featuredAt` ascending, then the rest by `createdAt` descending. The form sends only user input, and components never sort.

**Consequence.** Replacing the mock with a real API moves these rules to the backend without changing client code. The rules are pure functions (`applySave`, `sortCourses`) that the service calls, so they are unit-tested directly.

## D4. Failure simulation is deterministic and per operation

**Decision.** A visible toggle with three switches, persisted per browser. It is clearly labelled as a demo control and ships in production builds, not gated behind `import.meta.env.DEV`, because reviewers will use the deployed build. The switches:
- **fail list:** `list` and `get` reject. This shows the list and edit error states with Retry.
- **fail saves:** `create` and `update` reject. This shows the save error banner with the form values kept.
- **fail deletes:** `remove` rejects. This shows the optimistic removal followed by the rollback.

**Consequence.** Every error path can be shown on demand during review. Random failure rates would make the rollback hard to show reliably. In a real product this would be dev-only or behind a feature flag.

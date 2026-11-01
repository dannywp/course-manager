# Plan

Brief: [ASSIGNMENT.md](ASSIGNMENT.md) · Decisions: [DECISIONS.md](DECISIONS.md) · Assumptions: [ASSUMPTIONS.md](ASSUMPTIONS.md) · Design tokens: [DESIGN_TOKENS.md](DESIGN_TOKENS.md)

Legend: **[C]** core, **[N]** nice-to-have. Each item states its acceptance criterion (AC). Tests are written in the slice whose behaviour they protect. Where a slice says test-first, the test is committed before or together with the code.

## Slice 0: Project skeleton [C]
- [x] Vite + React 19 + TypeScript with `strict: true`. AC: `npm run typecheck` passes, and `tsconfig` has `strict`.
- [x] React Router with lazy routes `/`, `/courses/new` and `/courses/:id/edit`. The form routes start as stubs. AC: the production build emits a separate chunk per route, and the network tab shows the form chunk loading only on navigation.
- [x] React Query provider, RHF, Zod, Vitest, React Testing Library and Playwright installed. AC: `npm test` and `npx playwright test` pass, each with one smoke test.
- [x] ESLint flat config with typescript-eslint, eslint-plugin-react-hooks and eslint-plugin-jsx-a11y, plus an `npm run lint` script. AC: `npm run lint` passes on the skeleton.
- [x] Design tokens as CSS custom properties and the Inter font (400/600/700) loaded. AC: tokens match DESIGN_TOKENS.md, and the body renders in Inter.
- [x] App shell: dark top nav (48px) with logo and "FACILITY PORTAL", and a page header. AC: the shell matches the Figma Overview frame at 1440px.
- [x] Conventional Commits from the first commit. AC: `git log` subjects match `type(scope): subject`.

## Slice 1: Data layer, business rules and ordering [C], test-first
The service plays the role of the server. Business rules live in it, so no component or form duplicates them.
- [x] `Course` type and Zod schema:
  - `id`, `name`, `city`, `countryCode`, `par`, `difficulty` (1–5), `featured`
  - `featuredAt: number | null`, `createdAt`, `updatedAt`, `imageId: string | null`

  AC: the schema rejects invalid shapes.
- [x] Pure `sortCourses()`: featured courses first by `featuredAt` ascending, then the rest by `createdAt` descending. **Tests first:** the brief's feat1–feat4 example, mixed lists, ties.
- [x] Pure `applySave(previous | null, input, now)` stamps the timestamps:
  - `createdAt` on create
  - `updatedAt` on every save
  - `featuredAt`: not featured → featured sets `now`; featured → featured keeps the old value; featured → not featured sets `null`

  **Tests first:** all three featured transitions, plus create-as-featured.
- [x] Service module (`coursesService`) with `list`, `get`, `create`, `update` and `remove`. It is the only module that touches storage. `list()` returns courses already sorted with `sortCourses`, and `create` and `update` call `applySave` with the service's clock. AC: no component sorts or stamps timestamps. Swapping in a fetch-based service changes only that module and its factory.
- [x] Course data in localStorage, seeded on first run with 6 courses. Seed images are static files in `/public/seed`, never stored in IndexedDB. AC: courses survive a refresh.
- [ ] Simulated latency of 600–900 ms per call, set to zero in tests. AC: loading states are visible in the UI for at least 500 ms.
- [x] Failure simulation: a visible toggle, clearly labelled as a demo control, with three switches persisted per browser. It ships in production builds, not gated behind `import.meta.env.DEV`:
  - "fail list": `list` and `get` reject
  - "fail saves": `create` and `update` reject
  - "fail deletes": `remove` rejects

  AC: each switch makes its calls reject deterministically, and the toggle is present in `npm run build && npm run preview`.

## Slice 2: Courses list [C]
- [ ] `useCoursesQuery` reads `service.list()` and renders in the order the service returns. AC: the list shows seed data in featured order.
- [ ] Responsive grid derived from the card minimum width (DECISIONS.md D1):
  - below 720px: 1 column, 16px padding
  - 720–1055px: 2 columns, 40px padding
  - 1056–1391px: 3 columns
  - 1392px and up: 4 columns

  Tracks are `minmax(min(304px, 100%), 380px)` with a 32px gap. The card component sets no `min-width`. AC: at 402, 800, 1280 and 1440px the grid shows 1, 2, 3 and 4 columns, and from 720px up no card is narrower than 304px. At a 320px viewport there is no horizontal scroll.
- [ ] Card shows the image (aspect 280/328), "City, CC", name, "Par N • Difficulty: N/5", and a FEATURED badge when featured. AC: renders match the Figma Card Default state.
- [ ] Hover state: shadow plus a meatball button. The button is also visible on `:focus-within` and always visible on touch (`hover: none`). AC: tabbing into a card reveals the button.
- [ ] Long text truncation: name and location are single-line with an ellipsis and the full text in `title`. AC: an 80-character name doesn't change the card height.
- [ ] Placeholder image when a course has no image, or when its image fails to load. AC: a course with `imageId: null` and a course with a broken image source both show the placeholder.
- [ ] Loading state: skeleton cards. AC: the skeleton shows during simulated latency.
- [ ] Error state: a message with a Retry button. AC: with "fail list" on, the error shows. Turning it off and clicking Retry loads the list.
- [ ] Empty state: text plus a "Create a course" call to action. AC: after deleting all courses, the empty state shows.
- [ ] "Create a course" button navigates to `/courses/new`. AC: clicking it opens the form route.

## Slice 3: Card menu, delete modal and optimistic delete [C]
- [ ] Per-card menu (Edit, Delete) as an accessible menu button:
  - Enter, Space or ArrowDown opens it.
  - Arrow keys move between items.
  - Escape closes it and returns focus to the trigger.
  - Clicking outside closes it.
  - Edit links to `/courses/:id/edit`, which is filled in by Slice 5.

  AC: the whole flow works with the keyboard only.
- [ ] Delete confirmation modal showing the course name:
  - focus trapped, initial focus on Cancel
  - Escape and the close button cancel
  - focus returns to the menu trigger, or the next card after deletion

  AC: tabbing never leaves the modal.
- [ ] Optimistic delete: `onMutate` snapshots the list cache and removes the course, `onError` restores the snapshot, `onSettled` invalidates. AC: the card disappears instantly.
- [ ] Observable rollback: with "fail deletes" on, the card reappears in its original position after the simulated latency, and an `aria-live` error notice names the course. AC: a reviewer can see it disappear and come back.
- [ ] **Rollback integration test** (React Testing Library with an in-memory service set to fail deletes). It asserts that the card is removed, then restored in the same position, and that the error is shown.

## Slice 4: Create form with live preview [C]
- [ ] Two-column layout: the form on the left and a sticky preview with a `CARD PREVIEW` label on the right. Below 1024px it stacks, with the preview under the form and not sticky. AC: at 1440px the preview stays in view while the form scrolls.
- [ ] Fields:
  - Name, required
  - Country select (15 countries)
  - Par, required integer
  - Difficulty select, 1–5
  - Featured checkbox
  - City and Description (see ASSUMPTIONS.md)

  The image field arrives in Slice 6. AC: every field is reachable with the keyboard.
- [ ] RHF with `zodResolver`, sharing the Slice 1 schema. AC: submitting empty shows an error per required field, and focus moves to the first invalid field.
- [ ] Live preview through `watch`, rendering the same card component as the list. AC: typing in Name updates the preview title immediately.
- [ ] Save in the top action bar, with a pending state while saving. AC: the button is disabled and shows "Saving…" while the mutation is pending, so a double click creates only one course.
- [ ] On success, invalidate the list query and navigate to `/`. AC: the new course appears where the service's ordering puts it.
- [ ] Save failure: an inline error banner, values kept. AC: with "fail saves" on, the form stays filled and shows the error.
- [ ] [N] Schema test for par and difficulty bounds and name trimming.

## Slice 5: Edit course [C]
- [ ] Edit route loads `service.get(id)` and prefills the form. AC: every field shows the stored value.
- [ ] Edit loading, not-found and error states. AC: `/courses/bogus/edit` shows "Course not found" with a link back. With "fail list" on, the error state shows with Retry.
- [ ] Update goes through `service.update`, which applies the featured rules. AC: featuring an existing course during edit places it last among featured courses after save.
- [ ] After update, invalidate the list and the course's detail query, then return to the list. AC: the edited values show, and reopening the edit page shows the new values.

## Slice 6: Image handling with IndexedDB persistence [C]
- [ ] Image blobs are stored in IndexedDB with `idb-keyval`, keyed by `imageId`. Course records store only the `imageId`. AC: after a refresh, uploaded images still render on cards and in the edit form.
- [ ] The service resolves each course's image to a URL:
  - an object URL for a stored blob, cached per `imageId` and revoked when the image is replaced or deleted
  - a static path in `/public/seed` for seed images, which are never stored in IndexedDB
  - `null` when the blob is missing, so the UI shows the placeholder

  AC: deleting the IndexedDB entry by hand and reloading shows the placeholder, with no broken image.
- [ ] Deleting a course also deletes its blob. Replacing an image deletes the old blob. AC: IndexedDB holds no orphaned blobs after these operations.
- [ ] Drop zone: drag and drop, or click / Enter / Space to open the file picker. AC: both paths select a file.
- [ ] Accept only jpg, png and webp, checked by MIME type and extension. Reject anything else with an inline message. AC: dropping a `.gif` or `.pdf` shows "Only JPG, PNG or WebP images are allowed" and keeps the previous image.
- [ ] Max size 5 MB. When several files are dropped, use the first. AC: a larger file shows a size error.
- [ ] Drag-over highlight state. AC: dragging a file over the zone changes its style.
- [ ] After upload the drop zone becomes a file row with thumbnail, filename and pen button. The pen reopens the file picker. AC: the filename shows, and the pen opens the picker.
- [ ] Before upload, the preview shows the placeholder. After upload it shows the selected image immediately. AC: the image shows in the preview before save and on the card after save.
- [ ] [N] Unit test for the file-type and size validation.

## Slice 7: Polish [N]
- [ ] [N] Playwright end-to-end test: create a featured course with an image, see it ordered correctly, reload, see the image, delete it.
- [ ] [N] Basic PWA: service worker caches the list page, plus an offline indicator. AC: in DevTools offline mode, a reload shows the list and an "Offline" badge.
- [ ] [N] Extra accessibility: visible focus rings using the orange focus glow, reduced-motion respect, an axe check with no serious violations.

## Slice 8: Deliverables [C]
- [ ] README covering setup, assumptions (linking ASSUMPTIONS.md and DECISIONS.md), tradeoffs, improvements with more time, and the AI usage note. AC: every heading the brief asks for is present.
- [ ] `docs/AI_LOG.md` kept up to date during the work.

## UI state inventory

**In Figma:**
- List, desktop at 1440px: 4-column grid, card with FEATURED badge, "Create a course" button.
- Card, Default state.
- Card, Hover state: soft shadow and 32px meatball button. Its metadata differs: it shows "Difficulty 4/5" next to the location and "M: 5 592m F: 4 800 m" (see Q4).
- List with menu open: menu below the meatball button with Edit (pencil) and Delete (trash).
- Menu item states: Default, Hover (#FBFBFB), On Click (orange border and glow), Selected (orange checkmark), Disabled (grey).
- Delete modal: title, body copy, Cancel and red Delete. No backdrop is designed.
- Mobile list at 402px: 1 column, header with centered title and no subtitle, 16px padding.
- Editor, Empty:
  - inputs show their label as a placeholder
  - Difficulty shows "1", Country shows "Denmark"
  - Featured is unchecked
  - the drop zone is shown
  - the preview shows a checkerboard placeholder with sample text
- Editor, In progress: the Difficulty select is open and focused, with an orange border and glow, the "Choose an option" placeholder, and options 1–5.
- Editor, Filled: filled inputs with floating labels, Featured checked, the file row (thumbnail, filename, pen), and the preview with image and FEATURED badge.
- Inputs: empty, filled (floating label) and focused (select only).
- Checkbox: unchecked and checked.
- Buttons, Default state only: primary (orange), secondary (grey), danger (red).

**Not in Figma (we design these):**
- List loading (skeleton), list error with Retry, empty list.
- Card without an image or with a missing blob, long name or location, card focus-visible, meatball button hover, focus and pressed.
- Menu keyboard focus: reuse the Hover style. Disabled menu item (unused).
- Modal backdrop, modal on mobile, delete-failure notice (rollback), optional delete-success notice.
- Editor:
  - create vs edit page title
  - Cancel/back action
  - edit loading, not-found and fetch-error states
- Field states: validation error (red border and message), hover, focus on text inputs and the textarea, disabled while saving.
- Save pending, save error banner.
- Drop zone:
  - drag-over
  - keyboard focus
  - invalid file type error
  - file too large error
  - multiple files dropped (take the first)
- Preview with empty or partial data, and preview with long text.
- Mobile and tablet editor layout (stacked, preview not sticky). 2- and 3-column list layouts.
- Button hover, active, focus and disabled for every variant.
- 404 route, offline indicator [N], failure-simulation toggle UI.

## Cut list
If the work is behind schedule at the halfway point, cut from the top:
1. Course description field
2. Drag-over styling
3. 5 MB limit and multiple-file handling
4. "Reset demo data"

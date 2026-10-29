# Assignment: Golf Course Portal

Build a small React app for managing a list of golf courses: turn a Figma design into a working flow, make sensible technical choices, and use tooling well.

## Scope and priorities

- Scope is roughly one focused day of work. Prioritize the core flow; avoid gold-plating.
- Some details are intentionally open. Make a reasonable decision, note it in the README, and continue.
- **Core flow first:** list, create, edit, delete with optimistic rollback, live preview, local image handling, featured ordering.
- The final result must be explainable: architecture and tradeoffs will be discussed.

## Overview

Two main views:

1. A list of courses
2. A form to create or edit a course, with a live card preview next to it

After creating or updating a course, the user returns to the list.

## Design

- Figma: https://www.figma.com/design/EzcdNmsguvDXp5hz4dLcLh/Portal-Task?node-id=3-7764
- Contains: list page, card default and hover states, per-card menu, create flow, delete confirmation modal, mobile layout.
- No designer notes; the rules in this file are the conventions.
- Figma is the visual reference. Pixel-perfect is not required, but clean spacing, alignment, interaction states, responsive behavior, and sensible choices where the design is not explicit are expected.

## Requirements

### Courses list page

- All courses in a responsive card grid: 4 columns on desktop, 1 column on mobile, reasonable behavior in between.
- Each card shows: image, location, course name, Par, Difficulty, and a Featured badge when relevant.
- Each card has a hover state and a per-card menu with Edit and Delete.

### Featured ordering

- Featured courses appear first, ordered by when they became featured, **oldest first**. Example: if three are featured and a fourth is featured, order is feat1, feat2, feat3, feat4, then the rest.
- Non-featured courses follow, **newest first**.
- More than one course can be featured.
- If a course is set to featured while editing, the **save time** is when it became featured.

### Create / edit course page

- Two columns: form on the left, card preview on the right.
- Preview is sticky, has a small `CARD PREVIEW` label above it, and updates live as the user types.
- Fields:
  - **Name**: free text, required.
  - **Country**: dropdown, hardcoded list of 10–20 countries (our choice).
  - **Par**: integer, required. Typical 18-hole values are 68–74.
  - **Difficulty**: fixed dropdown, 1–5.
  - **Image**: drag-and-drop upload. Accept jpg, png, webp; reject everything else. Show the filename when uploaded. The pen icon reopens the file picker.
  - **Featured**: checkbox.
- Schema-based validation.
- After create or update, return to the list.

### Image handling

- No real upload service. Store images client-side. Session-only (e.g. object URL) is acceptable; persisting across refresh via localStorage or IndexedDB is welcome but optional.
- The image shows in the live preview and on the card after save.
- Use a default placeholder before an image is selected.
- If a persistent approach is chosen, the image must survive a refresh.

### Delete course

- Confirmation modal showing the course name.
- Delete is optimistic and rolls back on failure.
- Failure can be simulated but must be **observable** so the rollback can be seen during review.

### Data layer

- No backend, server, real API, or GraphQL endpoint.
- All data access goes through a small service layer. In-memory or browser storage is fine.
- Add simulated latency so loading states are real.
- Add at least one simulated failure path so error handling can be reviewed.
- Wire the service through the data-fetching client: queries, mutations, loading and error states, cache updates or invalidation, optimistic delete with rollback.
- The service must be isolated so replacing the mock with a real API is a small, contained change.
- Data shape is our choice, as long as it supports featured ordering.

### Accessibility

- The per-card menu and the delete modal must be keyboard accessible, with sensible focus handling.

### Edge cases not covered by Figma

Make and document reasonable decisions for:

- Loading, error, and empty states
- Default image before upload
- Long text truncation in cards
- Breakpoints between mobile and desktop designs
- Feedback for an invalid image file

How these gaps are handled is part of the evaluation.

## Tech stack

Their stack, and the closer we match it, the better the signal:

- React 19, Vite, TypeScript in **strict mode**
- React Query (URQL acceptable)
- React Hook Form with Zod
- Vitest + Playwright

Required:

- React with strict TypeScript
- A data-fetching client (React Query preferred)
- React Hook Form or comparable
- Schema-based validation (Zod preferred)
- Code splitting per route
- One or two meaningful tests

Tests could cover validation, featured ordering, optimistic rollback, or a core flow. **What is tested and why matters more than coverage.**

## Nice to have (optional, only if time allows)

- Playwright end-to-end test for one core flow
- Basic PWA: service worker, list page cached for offline use, offline indicator
- Extra accessibility polish
- Extra tests around important edge cases

## Deliverables

- GitHub repository.
- Commit messages follow **Conventional Commits**.
- Short README covering:
  - Setup instructions
  - Assumptions made
  - Notable tradeoffs
  - What would be improved with more time
  - AI usage note:
    - Which tools or agents were used
    - How they were harnessed (rules/instruction files, skills, MCP servers, subagents, slash commands, hooks, planning, parallel runs)
    - What they were used for and where they helped most
    - How output was reviewed, validated, and adjusted
# Assumptions

Gaps and conflicts in the brief and the Figma design, and how each was resolved. The brief allows deciding instead of asking, so these are final assumptions, not open questions. Larger tradeoffs are in [DECISIONS.md](DECISIONS.md).

Each entry is written as **Question → Assumption**.

**Brief vs Figma conflicts**
1. Figma labels the name field "Title*". → Keep the Figma label "Title" in the UI and use `name` in the data.
2. Figma has a required "Course description" textarea. The brief doesn't list it, and the card doesn't show it. → Include it as optional, max 1000 characters, stored but not shown on the card.
3. Figma has a "City*" / "City/State*" field, and cards show "California, US". The brief only lists Country. → Include a required City/State field (max 60 characters). The card shows `City, CC` with the ISO alpha-2 country code.
4. The Hover card swaps the metadata: "Difficulty" moves next to the location, and "M: … F: …" tee lengths appear. Tee lengths aren't in the data model. → The hover state keeps the default card content and adds the shadow and meatball button.
5. The delete modal copy doesn't show the course name, but the brief requires it. → "Are you sure you want to delete **{name}**? You will lose all data attached to it."
6. The editor header still reads "Courses / Browse and add golf courses" and has no Cancel. → The title reads "Create course" or "Edit course" with the same subtitle. A secondary Cancel button sits left of Save in the action bar.
7. The drop zone copy says "images and videos", but the brief allows jpg/png/webp only. → "Drag & drop or click to browse. JPG, PNG or WebP, max 5 MB."
8. Defaults differ between frames: Empty shows Difficulty "1" and Country "Denmark", while In progress shows "Choose an option". → No preselection. Both are required selects with a "Choose an option" placeholder.
9. The preview shows sample data ("Pebble Beach…") while the form is empty. → Show neutral placeholders ("Course name", "City, Country", "Par –") in the grey text colour, with the checkerboard image placeholder.
10. The checkerboard placeholder is a transparency pattern. → Use it for the preview before upload and for cards without an image.
11. The Selected and On Click menu item states use the Lato font. → Treat it as a stray and use Inter everywhere.

**Validation**

12. Par range. → Integer from 54 to 80. The hint says "Typical: 68–74".
13. Name rules. → Trimmed, 1–80 characters.
14. Is an image required? → No. The placeholder is used instead.
15. Image size limit. → 5 MB. When several files are dropped, use the first and ignore the rest.
16. Country list. → 15 countries, stored as ISO alpha-2 codes and shown by name. The list includes Denmark, Sweden, Norway, UK, Ireland, US, Spain, Portugal, France, Germany, Netherlands, Japan, Australia, South Africa and the UAE.

**Behaviour**

17. Featured timestamps on edit:
    - false → true: `featuredAt = saveTime`
    - true → true: unchanged
    - true → false: `null`
    - Re-featuring later counts as newly featured.

    The service stamps these, not the form (DECISIONS.md D3).
18. "Newest first" for non-featured courses. → Sort by `createdAt` descending, so editing doesn't reorder. The service returns the list sorted.
19. Failure simulation. → A visible demo-control toggle with "fail list", "fail saves" and "fail deletes", persisted per browser and shipped in production builds. It is deterministic, not random.
20. Latency. → A random 600–900 ms per call. Tests set it to zero.
21. Seed data. → Seed 6 courses on first run, with images exported from Figma as static files, plus a "Reset demo data" action. An empty list is still reachable by deleting all courses.
22. Image persistence. → Images persist in IndexedDB as core (DECISIONS.md D2). A missing blob falls back to the placeholder.
23. Post-save feedback. → Navigate to the list without a toast, because Figma has none. Errors show inline.
24. Unsaved-changes guard when leaving the form. → Out of scope.
25. Delete flow. → The modal closes immediately and the card is removed optimistically. On failure the card is restored and an `aria-live` error notice is shown.

**Layout**

26. Breakpoints between the 402px and 1440px designs. → Derived from the card minimum width. The thresholds are 720, 1056 and 1392px. See DECISIONS.md D1.
27. Content above 1440px. → Tracks cap at the 380px card maximum, and the grid is centered. The "Create a course" row shares the grid's width so it stays aligned.
28. Showing the meatball button on touch and keyboard. → Always visible when `hover: none`, and visible on `:focus-within`.
29. Mobile header. → A centered title without the subtitle, as in the Figma mobile frame.
30. Modal backdrop. → `rgba(34,34,34,0.5)` with no blur. The modal is full width minus 16px on mobile.

**Data layer**

31. Ordering ties. → Featured courses with the same `featuredAt` fall back to `createdAt` descending. Any remaining tie keeps the stored order.
32. Unknown ids. → `get` resolves `null`, so the edit page can tell "not found" apart from a failed call. `update` rejects. `remove` succeeds, because the course is already gone.
33. Where the failure switches live. → In `src/services/failure-switches.ts`, next to the service. "Only the service touches storage" means the service layer (`src/services/`). A failing call still waits for the simulated latency, so the loading state shows before the error.
34. Demo controls. → A collapsed "Demo controls" panel fixed to the bottom right on every page, with a dashed border to set it apart from the product UI.
35. Seed data. → Six courses, two of them featured. The photos are the five course images from Figma, cropped to the card aspect ratio in `/public/seed`. The sixth course has no image, so the placeholder shows from the start. The Figma checkerboard fill is the placeholder, not a course photo.
36. Where the app can run. → On localhost or HTTPS only. Course ids come from `crypto.randomUUID`, which browsers expose only in secure contexts. On a plain-HTTP origin, such as `vite --host` opened from a phone, seeding fails and every service call rejects.

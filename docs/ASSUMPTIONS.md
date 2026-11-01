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
9. The preview shows sample data ("Pebble Beach…") while the form is empty. → Show neutral placeholders ("Course name", "City, Country", "Par –", "Difficulty: –/5") in the grey text colour, with the checkerboard image placeholder.
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

**List page**

37. Room for the meatball button. → Figma overlays it on the text block, so a long name would run under it. The location and name lines always reserve 32px on the right. Short names look the same as in Figma, and long ones truncate slightly earlier, with no jump on hover.
38. A failed refetch with a list already loaded. → The list stays and no error shows, because a background failure shouldn't replace good data. The error state only shows when there is nothing to display, so "Fail list" takes effect on the next reload.
39. Empty state. → The top "Create a course" button stays in every state, so the empty state shows two of them. Moving a button users rely on would be worse than the repetition.

**Card menu and delete**

40. Menu keyboard focus. → The Hover fill (#FBFBFB) is close to invisible on the white menu, so `:focus-visible` adds the orange border and glow from Figma's "On Click" item state.
41. Menu direction. → Figma opens the menu rightwards from the trigger, which overflows the viewport in the last column and on mobile. The menu keeps that alignment and flips to right-aligned only when it would overflow.
42. Tab with the menu open. → Closes the menu and returns focus to the trigger, so focus can't drop to the page.
43. Focus after a delete. → The next card's menu button, else the previous card's, else the top "Create a course" link.
44. Clicking the modal backdrop. → Does nothing. Only Escape, the close button and Cancel dismiss the modal.
45. Delete-failure notice. → "Couldn't delete {name}. It's back in the list." It's a toast fixed to the top right, so it stays in view when the list is scrolled down and the cards don't shift. It clears on dismiss, on the next delete attempt or when leaving the page, and it doesn't time out, so it can't disappear before it's read. Dismissing moves focus to the "Create a course" link without scrolling, so the page stays where the user is. It's a white toast with a red border and normal text colour, because red text at 13px would be below the 4.5:1 contrast minimum.
46. Pencil, trash and close icons. → Hand-drawn SVGs, because `nodes.json` has no vector geometry.
47. Overlapping deletes. → Known issue, accepted. The failure notice follows only the latest delete, so if a second delete starts while the first is running, a failure of the first may not be named: its card comes back with no notice, or only the second course is named if both fail. A card can also flicker until the last refetch. The list itself still ends up correct.

**Course form**

48. Dropdowns. → Native `<select>` elements, so keyboard and screen reader behaviour comes from the browser. Browsers with CSS `appearance: base-select` show the open list as in Figma, and others show their own OS list. Chromium also treats Enter on a closed select as submitting the form; Space and the arrow keys open it.
49. Preview position. → The Figma frames place it at different heights. It starts level with the top of the form and sticks 40px from the top of the viewport.
50. Save time. → "Saving…" stays until the list has refreshed, about twice the simulated latency, so the list is correct on arrival and the new course doesn't pop in afterwards.
51. Validation errors. → A red border with the message in normal text colour, because red text at 11px on the grey page is below the 4.5:1 contrast minimum.
52. Save failure. → "Couldn't save the course. Your changes are still here." A banner at the top of the form column that sticks to the top of the viewport, so it stays in view if Enter submits while scrolled down and can't cover the preview.
53. Text field focus. → The orange border and glow of Figma's focused select, and the label floats on focus so it doesn't overlap typing.
54. Par input. → A text input with a numeric keyboard, so there are no spinners and scrolling can't change the value. The "Typical: 68–74" hint sits under the field, so Featured sits about 20px lower than in Figma.
55. Fields while saving. → They stay editable, and only Save and Cancel are disabled. Disabling a focused field drops keyboard focus to the page when a save fails. Cancel can't stop a save that has started, so it's disabled rather than left to imply it can. A save also finishes if the user leaves with the browser's Back button, and it then returns them to the list.

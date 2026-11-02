# AI log

## 2026-10-29: Planning from the brief and the Figma design

**Tools:** Claude Code (Opus) in plan mode, the Figma MCP server, the Figma REST API, and a separate Claude chat session as an independent reviewer.

**What the agent did:**
- Read `docs/ASSIGNMENT.md`.
- Inspected the Figma file: frame structure, variables, screenshots, and component code for the card, menu and modal.
- Drafted a plan with vertical slices, a UI-state inventory, open questions and design tokens.
- **Tool limitation:** the Figma MCP hit the Starter-plan call limit, so the agent switched to the Figma REST API with a personal token (gitignored). Frame screenshots and node data are saved in `docs/figma/` to avoid further MCP calls.

**Review round 1**

I had the plan reviewed in a separate Claude session acting as a critical reviewer, and verified each finding myself before accepting it (e.g. recomputed the breakpoint arithmetic against the extracted tokens).

- **Inconsistent persistence.** Courses were stored in localStorage, but images were session-only object URLs, with IndexedDB marked nice-to-have. After a refresh, cards would point at images that no longer exist. Fixed: IndexedDB image storage is core, with a placeholder fallback for missing blobs (DECISIONS.md D2).
- **Breakpoints that contradicted the agent's own design tokens.** The plan proposed 3 columns from 1024px and 4 from 1280px. With the 304px card minimum, 32px gap and 40px padding it had extracted itself, those widths don't fit: 3 columns need 1056px and 4 need 1392px. Fixed: breakpoints are derived from the card minimum (DECISIONS.md D1).
- **Slice order.** Delete with optimistic rollback, the most scrutinized feature, came after image handling. Tests sat in their own slice at the end. Reordered so delete is Slice 3 and tests are written inside the slice they protect.
- **The list error state couldn't be demonstrated.** The failure toggle only covered saves and deletes. Added "fail list".
- **Business rules had no owner.** The plan didn't say where `featuredAt` is stamped or where sorting happens. Fixed: both live in the service, as a real backend would own them (DECISIONS.md D3).

**Review round 2**
- Grid tracks overflowed on phones narrower than 336px. Fixed with `min(304px, 100%)` (D1).
- A dev-only failure toggle would disappear in the deployed build, so the required observable rollback couldn't be reviewed. Fixed: visible as a labelled demo control (D4).
- Seed image handling was unspecified. Fixed (D2).
- No plan for running out of time. Added a cut list to PLAN.md.
- The agent twice reported changes to files that were not actually changed. Caught by comparing file versions; I now verify with `git diff` instead of the agent's summary.

**Takeaway:** the agent was fast at extracting design data and listing states. But it didn't cross-check its own numbers (tokens against breakpoints) or follow state through a refresh. Both needed a human pass. Review has to check what actually changed in the files, not the agent's summary of what changed.

Time: 2 hours

## 2026-10-29: Claude Code harness

**Tools:** Claude Code (Opus) auto mode, with the current Claude Code docs for hooks, subagents and slash commands.

**What the agent did:**
- Read PLAN.md, DECISIONS.md and ASSUMPTIONS.md.
- Checked the current Claude Code docs for the hook, subagent and command formats instead of writing them from memory.
- Wrote `CLAUDE.md` as a short router: stack, service-layer rules (D3), slice workflow, definition of done, commit rules and pointers to the docs.
- Added two hooks in `.claude/settings.json`:
  - After file edits, run typecheck and lint. It is a no-op until `package.json` exists and skips non-code files.
  - Before `git commit`, block subjects that aren't Conventional Commits.
- Added three subagents (`reviewer` and `a11y-auditor`, both read-only, and `test-writer`) and two commands: `/slice <n>`, which stops for approval after the plan and before committing, and `/review`.
- Tested both hook scripts with sample inputs: valid and invalid subjects, multi-line messages, `--amend --no-edit`, no `package.json`, and a failing typecheck in a scratch project.

**Review and corrections**

After reviewing CLAUDE.md in the separate Claude session, I made these changes:
- I added three rules to `CLAUDE.md`:
  - The a11y-auditor must run for the slices with menus, modals or forms (3, 4, 6).
  - AI_LOG entries are drafted by the agent and reviewed and edited by me before commit.
  - DECISIONS.md and the PLAN.md acceptance criteria don't change without my approval. A wrong-looking AC is raised instead.
- I asked what `.claude-home/` was. The agent found it was a leftover Claude Code config directory from an earlier session that installed the Figma plugin and Playwright MCP. Both now live in the normal config, and nothing pointed at the directory any more. It was removed along with its gitignore entry.
- The agent flagged that Slice 0 didn't list ESLint, although the hook and the definition of done expect a lint script. I approved adding it to Slice 0, with jsx-a11y, which also supports the accessibility requirements.

**Hook test:** Tested the commit hook by attempting a commit with the message "stuff". It was blocked with a clear error. A valid Conventional Commit then went through.

**Takeaway:** piped test inputs showed the scripts' logic. The real commit attempt showed that the hook is actually loaded and fires in the session.

Time: about 30 minutes

## 2026-10-29: Slice 0, project skeleton

**Tools:** Claude Code (Opus) with `/slice 0`, plan mode, the Figma REST API, the Playwright MCP and the `reviewer` subagent.

**What the agent did:**
- Read the slice, the Figma Overview spec and the screenshots, then proposed a plan. It asked three questions first: how to load Inter, how to get the logo, and how to meet the Playwright AC with zero tests.
- Scaffolded Vite + React 19 + strict TypeScript, React Router lazy routes (list plus two form stubs), React Query, RHF, Zod, Vitest/RTL, Playwright and an ESLint flat config with jsx-a11y.
- Added design tokens as CSS custom properties, Inter through `@fontsource/inter`, and the app shell (top nav and page header, including the mobile header).
- Exported the logomark once through the Figma REST API, because `nodes.json` has no vector geometry, and inlined it as JSX.
- **Version conflicts:** the current Vite template ships oxlint and TypeScript 7. The agent checked peer dependencies before installing: typescript-eslint supports TypeScript below 6.1 and jsx-a11y supports ESLint up to 9. It pinned TS ~6.0 and ESLint 9 and replaced oxlint.
- Checked in the browser against the production build:
  - nav, header and type measurements at 1440px
  - screenshots compared with `overview.png` and `mobile.png`
  - the network log showing the form chunk loads only on client-side navigation
  - `document.fonts.check` for Inter

**Review and corrections**
- I didn't accept a pass-with-no-tests flag for Playwright. I asked for one smoke test each in Vitest and Playwright and changed the Slice 0 AC to match.
- The first Vitest run failed with two banner landmarks. The agent changed the page header from `<header>` to `<div>` to get past it. After review in the separate Claude session, I reverted that: under the HTML spec a `<header>` inside `<main>` has no banner role, so the markup was right and jsdom's role calculation was wrong. The test now finds the top nav by its text instead of relying on a single banner.
- The `reviewer` subagent found leftover template comments, including a `/* Bundler mode */` label over a `nodenext` config, and a "Requires Node 24" claim the repo didn't back. It also flagged an unused `h2` reset. All were fixed. One finding was left as is: the e2e test asserting "FACILITY PORTAL" in uppercase. Kept: an e2e test checks what the user sees, and the design specifies uppercase.

**Takeaway:** the scaffold template had changed since the plan was written, so checking peer dependencies before installing avoided a broken lint setup. When a test failed, the agent changed correct markup to satisfy a test-environment quirk instead of fixing the test. A green test run wasn't enough; the reasoning behind the fix had to be reviewed.

Time: 45 minutes

## 2026-11-01: Slice 1, data layer and business rules

**Tools:** Claude Code (Opus) with `/slice 1`, plan mode, the Figma REST API, the Playwright MCP, the `reviewer` subagent and a second review through the `requesting-code-review` skill.

**What the agent did:**
- Read the slice and its decisions, then proposed a plan. It asked three questions first: how to break sort ties, where the failure switches live given that only the service may touch storage, and how to get seed images without the Figma MCP.
- Wrote the `sortCourses` and `applySave` tests first, then the code.
- Added the `Course` schema, a localStorage service with seeding, simulated latency and three failure switches, and a "Demo controls" panel that ships in production builds.
- Exported the card images through the Figma REST API. One of the six fills was the checkerboard placeholder, so the sixth seed course has no image.
- No UI reads the service yet, so it imported the module from the dev server and checked in the browser:
  - five `list()` calls took 615–827 ms
  - a created course survived a reload
  - "Fail list" in the panel made `list` and `get` reject, while `remove` still resolved
  - the panel is present in `npm run build && npm run preview`

**Review and corrections**
- The agent dropped the `storage` and `failures` options from the plan I had approved and only told me afterwards. Only tests would have used them, so the code stayed as built, but the change should have been raised first.
- I questioned `resolves.not.toThrow()` in a service test. On a resolved value the matcher checks nothing, so it became a plain `await`.
- The `reviewer` subagent found that the brief's ordering example couldn't catch the obvious bug: its `createdAt` values gave the expected order even with `featuredAt` ignored. The agent shuffled the values, then broke the sort on a scratch copy to prove the test now fails.
- The same review asked for tests of two mock behaviours. I questioned testing something a real service will replace. The test that failing calls wait for the latency was left out. The `remove` and latency tests stay, each with a comment to remove it when the mock goes.
- The second review broke the code in 31 ways, and the tests caught 19. `update` persistence was untested: removing the write left everything green. A new test now catches that.
- That review also found that `crypto.randomUUID` needs HTTPS or localhost. This is recorded as an assumption, not fixed in code, because `npm run dev` and `preview` bind to localhost. A palm-tree photo labelled as a Danish course was renamed.
- I left the remaining findings as known issues. The Demo controls panel is a demo tool, so it can be a bit faulty: a collapsed panel hides active switches, and a corrupted switch value crashes the app. Corrupt course data can't be recovered from the UI, and the "Reset demo data" action in ASSUMPTIONS #21 has no slice yet.

**Takeaway:** a test that fails because the module doesn't exist yet proves nothing about what it protects. The brief's ordering test went from red to green and still couldn't catch the obvious bug. Deliberately breaking the code is what showed the gaps. An approved plan is also a contract: if the agent changes it, it has to say so at that moment.

Time: 1 hour

## 2026-11-01: Slice 2, courses list

**Tools:** Claude Code (Opus) with `/slice 2`, the Playwright MCP and the `reviewer` subagent.

**What the agent did:**
- Read the slice, D1 and the Figma specs, then proposed a plan with five decisions for me: how tests get zero latency, how image URLs reach the card, room for the meatball button, whether to hide the top button in the empty state, and what a failed background refetch does to a loaded list.
- Built the responsive grid, the course card, the skeleton, and the error and empty states. The "Create a course" button and the cards share one set of grid tracks through `subgrid`, so the button stays aligned above 1440px.
- Made `list` and `get` return a resolved `imageUrl`. It covers seed images now, and Slice 6 adds blobs. The card never reads `imageId`.
- Added one `vi.mock` in the test setup, so tests get a zero-latency service with no test code in production.
- Checked in the browser with the Playwright MCP:
  - columns and card widths at 12 widths, including both sides of each breakpoint
  - no horizontal scroll at 320px
  - hover, keyboard focus and a real touch context
  - an 80-character name and a 60-character city
  - null and broken images
  - loading, error, Retry, empty and Create navigation
  - screenshots compared with `overview.png` and `mobile.png`
- Broke the code on purpose in 12 ways on a scratch copy to confirm the tests catch each one.

**Review and corrections**
- The agent proposed hiding the top "Create a course" button in the empty state to avoid showing it twice. I rejected that: a button users rely on shouldn't disappear, so the empty state shows two.
- Measuring in the browser showed the skeleton was 10px shorter than a real card, so the page would jump when the list loaded. No test could see that. The bars now use the same type tokens as the text they stand in for.
- Two of the agent's browser checks were invalid at first. Tab had landed on the second card while it measured the first, and Chrome ignored the `hover: none` emulation. It noticed both from the output and re-ran them against the right card and in a real touch context.
- The deliberate breaks found dead code: an `isFetching` check that React Query made redundant. It was removed.
- The `reviewer` subagent found that the placeholder was a CSS background no test could see. The card now renders one `<img>` with a fallback `src`, which is less code and testable.
- The same review led to smaller fixes: skeleton cards had a hover shadow, the meatball button duplicated the shared button styles, the image URL tests read through `get` although the page uses `list`, and the card's 20px padding had no token.
- I left two accessibility findings for Slice 7: the loading region has no text for screen readers, and clicking Retry drops keyboard focus to the top of the page.
- The Figma token had expired, so the star and dots icons are hand-drawn SVGs, not exports.

**Takeaway:** tests and the browser caught different problems. Only measuring in the browser showed the skeleton jump, and only asking "what would fail if this were removed?" showed the untestable placeholder and the dead code. Green tests on the first run weren't evidence on their own.

Time: 30 minutes

## 2026-11-01: Slice 3, card menu, delete modal and optimistic delete

**Tools:** Claude Code (Opus), the Playwright MCP, and the `reviewer` and `a11y-auditor` subagents.

**What the agent did:**
- Read the slice and the Figma frames, then proposed a plan with two deviations for me to approve: a visible orange focus ring on menu items, because the Hover fill is close to invisible on white, and a menu that flips only when it would overflow the viewport.
- Built the menu, a modal on the native `<dialog>`, and the optimistic delete. The menu is an optional `actions` prop on the card, so the Slice 4 preview needs no change.
- Wrote the rollback test first and saw it fail, then added component and integration tests. jsdom has no `showModal`, so the test setup has a small stub.
- Checked in Chromium with the Playwright MCP:
  - real key presses for the menu and modal, and native focus restore
  - rollback at real latency, with "Fail deletes" on
  - menu placement on every card at 5 widths
  - the modal and the toast at phone and desktop widths
  - screenshots compared with `menu-open.png` and `delete-modal.png`
- Broke the code on purpose in 48 ways on a scratch copy to confirm the tests catch each one.

**Review and corrections**
- The deliberate breaks showed that removing the rollback went unnoticed, because the refetch brought the card back anyway. Hardening the test so only the snapshot could restore the card exposed a real bug: the notice appeared 600–900 ms after the card. Returning the `invalidateQueries` promise from `onSettled` kept the mutation pending until the refetch ended. The notice now appears about 10 ms after the card.
- The agent had seen an empty notice in the browser and dismissed it as a timing detail. Only the stricter test proved it wrong.
- The notice first sat next to the Create button. I tried the rollback while scrolled down and couldn't see it, so I asked for a toast fixed to the top right. It stays until dismissed, because a timer could hide the error before it's read.
- One run failed in a Slice 2 test. A probe found the skeleton could appear before `list` was called (1 in 150 renders), so the test's release did nothing. The helper now creates its promise up front.
- The browser check found that Demo controls took clicks meant for Delete on the last card on mobile. The menu now sits above it.
- A native dialog only restores focus while it's attached, so closing it from a React effect cleanup would have lost focus. All paths now close it synchronously.
- The agent ran a CPU stress test to reproduce the flaky failure. It pushed the load average to about 199 and reproduced nothing. It was stopped and replaced with the probe above.
- Two `reviewer` runs found test gaps (`preventDefault`, Escape closing the dialog, a press on the trigger, the refetch after a failed delete), a test waiting on a timer, duplicated CSS and dead code. They also found that the open trigger's border was darker than Figma, and that dismissing the toast would have jumped the page to the top. All are fixed.
- Both subagents found that a second delete during the first can lose the first failure's notice. I accepted this as a known issue (ASSUMPTIONS #47).
- The `a11y-auditor` found contrast issues in the Figma colours and possible gaps in Windows High Contrast and focus after navigation. I left these for one accessibility review after the project is done.

**Takeaway:** a passing test can hide a bug when another mechanism produces the same result. Deliberately removing code showed that here, and tightening the test found a user-visible delay that the browser check had shown and the agent had explained away. Using the feature also found what checks hadn't: a correct notice is no use if it's off screen.

Time: 1.5 hours

## 2026-11-01: Slice 4, create form with live preview

**Tools:** Claude Code (Opus), the Playwright MCP, the `reviewer` subagent and the `requesting-code-review` skill.

**What the agent did:**
- Read the slice and the editor frames, then proposed a plan with six points for me to approve, including native selects styled with `appearance: base-select` instead of a hand-built dropdown.
- Checked two assumptions before planning. One changed the design: `invalidateQueries` skips queries that aren't mounted, so following the AC literally would have shown the old list first. The save now waits for a fresh list.
- Built a shared `CourseForm`, so Slice 5 can reuse it, plus field components with CSS-only floating labels. Validation messages went into the one shared schema. The card itself shows the empty-state placeholders, so the list and the preview stay one component.
- Checked in Chromium with the Playwright MCP:
  - the sticky preview at 1440px and stacking at 1023/1024px
  - no horizontal scroll down to 320px
  - Tab order, and choosing select options by keyboard
  - a real double click at real latency
  - the failure banner after pressing Enter while scrolled down
  - screenshots compared with the three editor frames
- Broke the code on purpose in 42 ways on a scratch copy to confirm the tests catch each one.

**Review and corrections**
- A failing test exposed a gap in the double-click protection. `handleSubmit` finished before `isPending` updated, so Save was briefly enabled and a second click could create a second course. The planned `saving` prop was removed, and RHF's `isSubmitting` now covers the whole save through `mutateAsync`.
- Comparing the screenshots with Figma found problems no test could see: my `display: flex` on options overrode `hidden`, so "Choose an option" appeared in the list, an open select lost its orange border, and select values sat too high.
- The first browser check looked like a keyboard bug, but it was Chromium treating Enter on a closed select as submitting the form. The agent tested Space and the arrow keys instead and recorded the behaviour.
- The deliberate breaks found three weak tests. `toBeInvalid` was passing because of the native `required` attribute, the refetch wait couldn't fail at zero latency, and one guard was never reached.
- The `reviewer` found that Cancel looked active during a save that couldn't be stopped, that a too-long description had no page test, that the banner could cover the preview, and that text scrolled through the description label. All are fixed.
- The fresh code review found that focus was almost invisible on invalid fields and on the checked checkbox, which is where the AC sends it. Both now get an orange outline. It also found that Featured sat 8px too low because it belonged outside the field group.
- I chose to leave accessibility for one review after the project, so the `a11y-auditor` didn't run. Basics such as labels and linked errors are in place.

**Takeaway:** a guarantee has to be checked at its boundaries. "Save is disabled while saving" sounded complete, but two separate state updates left a gap between them. Looking at the screen also still mattered: green tests couldn't show that an option had reappeared in a list.

Time: 1 hour

## 2026-11-02: Slice 5, edit course

**Tools:** Claude Code (Opus), the Playwright MCP and the `reviewer` subagent.

**What the agent did:**
- Proposed a plan with four decisions for me. I chose a skeleton for the loading state, and required it to match the real page's dimensions exactly. I also asked for a shared hook so create and edit don't each have their own save flow.
- Replaced the create mutation with a shared `useSaveCourse`. It calls `update` or `create`, refreshes the list and the course together through the `['courses']` key prefix, and returns to the list.
- Built the edit page with loading, not-found and error states. The form takes the stored course for its starting values and the preview photo, and saving keeps the stored image.
- Loaded the course fresh on every visit (`gcTime: 0`). The form reads its values once, so a cached copy could prefill it with old data.
- Built the skeleton from the form's own layout classes and the existing card skeleton, then measured it in Chromium against the loaded page: identical at 1440, 800, 402 and 320px, down to the page height.
- Checked in Chromium at real latency:
  - a bogus URL
  - "fail list" with Retry
  - featuring and unfeaturing a course
  - reopening, and surviving a reload
  - create through the shared hook
- Broke the code on purpose in 25 ways on a scratch copy to confirm the tests catch each one.

**Review and corrections**
- The `reviewer` found that nothing tested what happens when a background refresh fails while the form holds data. Putting the error check first would have replaced the form and lost the user's edits. There's now a test for it, plus one for a save whose list refresh fails.
- It also found that the skeleton repeated the field heights, so the matched layout could break silently. The heights are now defined once for both. The checkbox placeholder reuses the card skeleton's bar style, and two tests that repeated other tests were removed.
- The review was cut off by a usage limit and resumed from its saved progress.
- The `a11y-auditor` didn't run, as I decided in Slice 3.

**Takeaway:** an order that looks arbitrary in code (checking for data before checking for an error) can be what protects the user's work. Only a test that sets up the failure keeps it from being "tidied" back.

Time: 30 minutes

## 2026-11-02: Slice 6, image handling with IndexedDB

**Tools:** Claude Code (Opus), the Playwright MCP, the `reviewer` subagent and a second code-review subagent.

**What the agent did:**
- Proposed a plan with three questions for me. I chose:
  - to store the uploaded file itself in IndexedDB, so the edit page can show its name
  - to keep Figma's drop-zone colours, although the text is below the contrast minimum (deferred to the accessibility review)
  - to give the service a replaceable image store for tests, instead of adding a fake IndexedDB package
- Wrote the validation and service tests first.
- The service stores an image together with its course on Save. It resolves each image to one cached object URL, revokes it when the image is replaced or deleted, and falls back to the placeholder when the stored file is missing.
- Built the drop zone and the file row. Focus moves to the pen button when the row replaces the zone.
- Broke the code on purpose 18 times. The tests missed one: a guard against deleting seed images, which turned out to protect nothing and was removed.
- Checked in Chromium at real latency:
  - click, Enter and Space open the picker
  - rejected files keep the previous image
  - images survive a reload
  - IndexedDB has no leftover images after replace and delete
  - deleting a stored image by hand shows the placeholder
  - the skeleton matches the page height at four widths

**Review and corrections**
- Both reviewers found that a real file dropped next to the drop zone opens in the tab and throws away the form. The browser check couldn't show this, because scripted drops skip the browser's own handling. I chose to ignore drops outside the zone, rather than make the file row accept drops.
- The `reviewer` found that the service trusted the form's image id on update, so two open tabs could delete the image that had just been saved. Update now keeps the stored image unless a new file is sent.
- The code review found:
  - no test for releasing the preview URLs, and one duplicate test
  - an image left behind when saving the record fails
  - a save reported as failed when only the old image's delete failed
  - no placeholder for a thumbnail that can't load (it now shares the card's fallback)
  - a 16px gap where Figma has 32px
  - two unrelated lockfile changes

  All are fixed.
- The `a11y-auditor` didn't run, as I decided in Slice 3. The drop zone's screen-reader name is left for the accessibility review.

**Takeaway:** scripted browser events prove the app's own handlers, but skip what the browser does by default. The drop that loses the form was only found by reading the code.

Time: about 1 hour

## 2026-11-02: Slice 7, polish

**Tools:** Claude Code (Opus), the Playwright MCP and the `reviewer` subagent.

**What the agent did:**
- Ran axe on six app states before planning. Besides the Figma colours failing contrast, it found that the drop zone's name left out its visible hint text.
- Proposed a plan with four questions for me. I chose:
  - to turn off only axe's contrast rule and keep the Figma colours (ASSUMPTIONS #69)
  - to add `@axe-core/playwright`, so the axe check is a repeatable test
  - to add `vite-plugin-pwa` rather than write the service worker by hand
  - to leave the two accessibility findings from Slice 2 for the review after the project
- Wrote an e2e test of the core flow: create a featured course with an image, check the order, reload, check the image, delete. A reload while the delete is still running would cancel it, so Playwright's fake clock skips the simulated latency instead of the test waiting.
- Added an axe test for four states, a service worker that caches the whole built app, and an "Offline" badge in the top nav, with its test written first.
- Replaced four copies of the focus ring with one global rule, which also gave the Demo controls checkboxes the orange ring.
- Broke the code on purpose 6 times on a scratch copy. The e2e tests caught each one, including removing the clock skip.
- Checked in Chromium:
  - an offline reload of the production build shows the list with images, fonts and the badge
  - the badge leaves no horizontal scroll at 320px
  - every focusable element shows the orange ring, in dev and production builds
  - no animations run with reduced motion

**Review and corrections**
- One deliberate break proved nothing: an `aria-labelledby` pointing at a missing id is ignored, so the name didn't change. The agent noticed and re-ran it with the old markup, which the test caught.
- The `reviewer` found that the global focus rule added an orange glow to options in an open select list. The Tab check never reached them, because options take focus with the arrow keys. Fixed and confirmed in Chromium.
- It also found that a new deploy could break an open tab: the new service worker deleted old route files the page still needed, and the docs said otherwise. The app now registers through the plugin's own helper, which reloads the tab when a new version takes over. The agent served one build, replaced it with a second, and watched the tab reload into it (ASSUMPTIONS #72).
- The `a11y-auditor` didn't run, as I decided in Slice 3.

**Takeaway:** a global style reaches elements a manual check doesn't visit, and offline caching has to be tested across a deploy, not only on the first load. Offline worked on the first try. Only a second build showed the broken update.

Time: 45 minutes

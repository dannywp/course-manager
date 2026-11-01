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

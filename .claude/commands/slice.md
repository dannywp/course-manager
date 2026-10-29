---
description: Plan, implement, check and review one slice from docs/PLAN.md
argument-hint: <slice number>
disable-model-invocation: true
---

Work on Slice $ARGUMENTS of `docs/PLAN.md`. Follow these steps in order and stop where a step says so.

1. **Read.** Read Slice $ARGUMENTS in `docs/PLAN.md`, `CLAUDE.md`, and every DECISIONS.md / ASSUMPTIONS.md
   entry the slice references. For UI work, look at the matching screens in `docs/figma/screens/` and the
   frame in `docs/figma/spec.md`. Do not call the Figma MCP.
2. **Plan, then stop.** Propose a short plan: the files to create or change, the tests to write (and which
   are test-first), and how each acceptance criterion will be checked. Name any open question or deviation
   from Figma/ASSUMPTIONS.md. **Wait for my approval before writing any code.**
3. **Implement** the approved plan. Write test-first tests before the code they protect (the `test-writer`
   subagent can write them). Keep to this slice: nothing from later slices.
4. **Check.** Run `npm run typecheck`, `npm run lint` and `npm test` (and `npx playwright test` if e2e tests
   exist). Fix failures. For UI, check it in the browser with the Playwright MCP at the widths the ACs name,
   and compare with the Figma screenshots. Run the `a11y-auditor` subagent if the slice touches menus,
   modals or forms.
5. **Review.** Run the `reviewer` subagent on the uncommitted diff for Slice $ARGUMENTS. Fix its findings,
   or tell me why one doesn't apply.
6. **Show the diff.** Run `git status --short` and `git diff --stat` and show the output.
7. **Draft an AI_LOG entry** in the format already used in `docs/AI_LOG.md`: what the agent did, what review
   caught and what I corrected, and the time spent (ask me if unknown). Show it to me; add it to the file
   only when I approve.
8. **Propose a commit message** (or a few, if the slice splits naturally) in Conventional Commits format,
   with the files each commit includes. **Do not commit until I approve.**

End with the status of each acceptance criterion: met (and how it was checked), or not met.

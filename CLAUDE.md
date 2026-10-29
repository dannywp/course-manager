# Golf Course Portal

React portal for managing golf courses, built from a Figma design as a one-day take-home.
Keep changes small and in scope: no extra features, dependencies or abstractions beyond the plan.

## Where things are

| Doc | Read it for |
|---|---|
| [docs/PLAN.md](docs/PLAN.md) | Slices, acceptance criteria (AC), UI state inventory, cut list |
| [docs/DECISIONS.md](docs/DECISIONS.md) | D1 grid breakpoints, D2 persistence, D3 business rules, D4 failure simulation |
| [docs/ASSUMPTIONS.md](docs/ASSUMPTIONS.md) | How brief/Figma gaps were resolved (labels, validation, copy, behaviour) |
| [docs/DESIGN_TOKENS.md](docs/DESIGN_TOKENS.md) | Colours, type, spacing, radii, shadows. Use tokens, never raw values |
| [docs/figma/](docs/figma/README.md) | Local Figma snapshot: `screens/*.png`, `spec.md`, `nodes.json` |
| [docs/AI_LOG.md](docs/AI_LOG.md) | Log of AI use, reviews and corrections. Add an entry per slice |
| [docs/ASSIGNMENT.md](docs/ASSIGNMENT.md) | The original brief |

## Stack

React 19, Vite, TypeScript (`strict: true`), React Router (lazy routes), React Query,
React Hook Form + Zod (`zodResolver`), Vitest + React Testing Library, Playwright, `idb-keyval`.

npm scripts (created in Slice 0): `typecheck`, `lint`, `test`, `build`, `preview`, and Playwright via `npx playwright test`.

## Architecture rules

- **All data access goes through the service layer** (`coursesService`). It is the only module that
  touches localStorage or IndexedDB. Components and hooks call it through React Query.
- **Business rules live only in the service** (DECISIONS.md D3):
  - `applySave(previous | null, input, now)` stamps `createdAt`, `updatedAt` and `featuredAt`.
  - `sortCourses()` orders the list, and `list()` returns it already sorted.
- **Components never sort courses or stamp timestamps.** The form sends user input only.
  Render lists in the order the service returns.
- One Zod schema for `Course`, shared by the service and the form.
- The live preview and the list render the same card component.
- Swapping in a fetch-based service must change only the service module and its factory.

## Workflow

1. Work on **one slice at a time**, in PLAN.md order (`/slice <n>`).
2. **Plan before implementing.** Propose the plan and wait for approval before writing code.
3. **Tests go in the slice whose behaviour they protect.** Slices marked test-first commit tests
   before or together with the code. Test behaviour, not implementation details.
4. Follow the Figma references and ASSUMPTIONS.md. If something should differ from them, ask first,
   then record the deviation in ASSUMPTIONS.md.
5. Don't change DECISIONS.md or acceptance criteria in PLAN.md without approval. If an AC seems wrong,
   raise it instead.
6. If the slice runs long, cut from the PLAN.md cut list, not from core ACs.
7. Tick the slice's checkboxes in PLAN.md when its ACs are met.

## Definition of done (per slice)

- [ ] `npm run typecheck`, `npm run lint` and `npm test` pass (plus `npx playwright test` once e2e tests exist).
- [ ] Every acceptance criterion of the slice is met, and you can say how each one was checked.
- [ ] UI is checked in the browser (Playwright MCP against `npm run dev`) at the widths the AC names,
      and compared with the local references in `docs/figma/screens/` and `docs/figma/spec.md`.
      **Do not call the Figma MCP**: the plan's call limit is reached.
- [ ] The `reviewer` subagent has run (`/review`) and its findings are fixed or answered.
- [ ] For slices with menus, modals or forms (3, 4, 6), the `a11y-auditor` subagent has run and its
      findings are fixed or answered.
- [ ] An AI_LOG.md entry is drafted; the user reviews and edits it before commit.

## Commits

- Conventional Commits: `type(scope): subject`, e.g. `feat(list): render courses in service order`.
  Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert. A hook enforces this.
- One or a few commits per slice. Commit only after the user approves the message.
- **Never claim a file was changed without showing `git diff` output** (or `git diff --stat` plus the
  relevant hunks). Summaries are not evidence.
- Never commit `.figma-token` (gitignored).

## Harness

- Hooks (`.claude/settings.json`): typecheck and lint run after every code edit, and a hook blocks
  commit messages that aren't Conventional Commits.
- Subagents (`.claude/agents/`): `reviewer`, `a11y-auditor` (menus, modals, forms) and `test-writer`.
- Commands (`.claude/commands/`): `/slice <n>` and `/review`.

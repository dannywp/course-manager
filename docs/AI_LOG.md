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

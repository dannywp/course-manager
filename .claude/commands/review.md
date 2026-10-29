---
description: Run the reviewer subagent on the current uncommitted diff
argument-hint: [slice number]
disable-model-invocation: true
---

Run the `reviewer` subagent on the current uncommitted diff (staged, unstaged and untracked files).

Slice: $ARGUMENTS. If no slice number was given, tell the reviewer to infer it from the diff and the
unticked items in `docs/PLAN.md`.

Show me the reviewer's report as it returned it. Then, for each finding, say whether you agree and what
you would change. Don't change any files until I say so.

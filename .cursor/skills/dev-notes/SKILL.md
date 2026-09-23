---
name: dev-notes
description: >-
  Require a Dev note on every git commit and push so each update is documented.
  Use when committing, pushing, creating PRs, or shipping any code change in this
  monorepo.
---

# Dev notes on every push

Add a Dev note to every push. add it to a skill so every update has documentation

## Required on every commit / push

1. **Before** `git commit` / `git push`, add or update a Dev note under `docs/dev-notes/`.
2. File name: `YYYY-MM-DD-short-slug.md` (UTC date of the change).
3. Include the note summary in the commit message body under a `Dev note:` line.
4. Never push without a matching Dev note for that change set.
5. Do not put secrets (keys, passwords, tokens) in Dev notes.

## Dev note template

```markdown
# <Title>

- **Date:** YYYY-MM-DD
- **Author / agent:** <name or agent>
- **Scope:** <apps/packages touched>

## Summary
One or two sentences on why this change landed.

## Changes
- Bullet list of what changed

## Follow-ups
- Optional next steps (or "None")
```

## Commit message shape

```text
<concise why-focused subject>

Dev note: docs/dev-notes/YYYY-MM-DD-short-slug.md — <one-line summary>
```

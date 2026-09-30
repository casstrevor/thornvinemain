---
name: dev-notes
description: >-
  Require a Dev note on every git commit and push so each update is documented.
  Use when committing, pushing, creating PRs, or shipping any code change in this
  monorepo. Pair with the github-project skill so the board is updated too.
---

# Dev notes on every push

Add a Dev note to every push. add it to a skill so every update has documentation

## Required on every commit / push

1. **Before** `git commit` / `git push`, add or update a Dev note under `docs/dev-notes/`.
2. File name: `YYYY-MM-DD-short-slug.md` (UTC date of the change).
3. Include the note summary in the commit message body under a `Dev note:` line.
4. Never push without a matching Dev note for that change set.
5. Do not put secrets (keys, passwords, tokens) in Dev notes.
6. **Also** update the GitHub Project per `.cursor/skills/github-project/SKILL.md` — each project item description must be thoroughly explained.
7. **Also** update the Notion roadmap after each prompt per `.cursor/skills/notion-roadmap/SKILL.md`. Create the roadmap if it does not exist.

## Dev note template

```markdown
# <Title>

- **Date:** YYYY-MM-DD
- **Author / agent:** <name or agent>
- **Scope:** <apps/packages touched>
- **GitHub Project:** <issue or draft item URL>

## Summary
Thorough explanation of why this change landed and what problem it solves (not one vague sentence).

## Context
Background a future reader needs to understand the decision.

## Changes
- Bullet list of what changed, with enough detail to reconstruct intent

## How to verify
- Concrete checks (commands, URLs, expected results)

## Risks / notes
- Or "None"

## Follow-ups
- Optional next steps (or "None")
```

## Commit message shape

```text
<concise why-focused subject>

Dev note: docs/dev-notes/YYYY-MM-DD-short-slug.md — <one-line summary>
Project: <issue or project item URL>
```

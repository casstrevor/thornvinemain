---
name: github-project
description: >-
  Manage Thornvine development on the linked GitHub Project. Update the project
  on every commit with thoroughly explained item descriptions. Use when
  committing, pushing, planning work, creating issues, or changing project
  board status.
---

# GitHub Project development board

lets now create github project for this we will manage our development on that. add to skill to update on every commit. each description should be throughouly explained

## Project

- **Owner:** `casstrevor`
- **Repo:** `casstrevor/thornvinemain`
- **Project title:** Thornvine
- **Project number:** `2`
- **Project ID:** `PVT_kwHOEwarqc4BkYKg`
- **URL:** https://github.com/users/casstrevor/projects/2

```bash
gh project list --owner casstrevor
gh project view 2 --owner casstrevor --web
gh project item-list 2 --owner casstrevor
```

### Status field

- Field: `Status` (`Todo` | `In Progress` | `Done`)
- Set with:

```bash
gh project item-edit 2 --owner casstrevor \
  --url <issue-url> \
  --field Status --value "In Progress"
```

## Required on every commit / push

1. After writing the Dev note (`docs/dev-notes/…`), **update the GitHub Project** before or immediately after the push.
2. Prefer linking a **GitHub Issue** (thorough description) and adding it to the project with `gh project item-add`.
3. For small/agent-only tracking, create a **draft issue** on the project with `gh project item-create` — still thoroughly explained.
4. Set Status (e.g. Todo / In Progress / Done) to match reality for that change.
5. Never leave a commit without a corresponding project item that documents it.

## Thorough description requirements

Every issue / draft issue / project item description **must** thoroughly explain:

- **Context** — why this work exists (problem, goal, or trigger)
- **What changed** — concrete files, systems, and behavior (not just “updated stuff”)
- **How to verify** — commands, URLs, or checks a reviewer can run
- **Risks / notes** — migrations, auth, env, breaking changes (or explicit “None”)
- **Follow-ups** — next work items, or “None”
- **Links** — Dev note path, commit SHA after push, related PRs/issues

Do **not** use one-line vague titles as the only documentation. Titles can be short; bodies must be thorough.

## Issue / draft body template

```markdown
## Context
<Why this change was needed.>

## What changed
- <specific change 1>
- <specific change 2>

## How to verify
1. <step>
2. <step>

## Risks / notes
- <or None>

## Follow-ups
- <or None>

## Links
- Dev note: `docs/dev-notes/YYYY-MM-DD-slug.md`
- Commit: <sha or pending>
```

## CLI workflow

```bash
# Create issue with thorough body (preferred)
gh issue create --repo casstrevor/thornvinemain \
  --title "<short title>" \
  --body "$(cat <<'EOF'
## Context
...
EOF
)"

# Add issue to project (replace NUMBER with project number)
gh project item-add <NUMBER> --owner casstrevor --url <issue-url>

# Or draft item directly on the project
gh project item-create <NUMBER> --owner casstrevor \
  --title "<short title>" \
  --body "$(cat <<'EOF'
## Context
...
EOF
)"
```

## Coordination with Dev notes

Always do **both**:

1. Dev note file + `Dev note:` commit footer (see `.cursor/skills/dev-notes`)
2. GitHub Project item with a thoroughly explained description (this skill)

# Notion roadmap after each prompt

- **Date:** 2026-09-30
- **Author / agent:** Cursor agent
- **Scope:** `.cursor/skills/notion-roadmap`, `AGENTS.md`, Notion hub
- **GitHub Project:** https://github.com/casstrevor/thornvinemain/issues/7

## Summary

Thornvine’s Notion hub had milestones on the delivery plan and no Roadmap page. Cursor now keeps a Roadmap that separates planned, implemented, and verified work, and a project skill requires that page to be updated after each prompt.

## Context

The hub still said the repository baseline was awaiting inspection. GitHub Pages is implemented on `main` (`8620c02`) and the Actions build passed, but the site is not public. That status needed a durable place in Notion, and later prompts need the same update without waiting for a commit.

## Changes

- Created Notion page Roadmap under the Thornvine hub and linked it from Start here
- Recorded Pages build evidence, the admin blocker, and that local portal work is not on `main`
- Added a 2026-09-30 handoff on the delivery plan and a short evidence note on the engineering page
- Added `.cursor/skills/notion-roadmap/SKILL.md` and pointed `AGENTS.md` and the dev-notes skill at it

## How to verify

1. Open https://app.notion.com/p/3eb9d5060068816c95fade2a67b6454c and confirm Planned, Implemented, and Verified are separate
2. Confirm the hub Start here list includes Roadmap
3. Confirm `.cursor/skills/notion-roadmap/SKILL.md` says to update the roadmap after each prompt

## Risks / notes

- The public site is still blocked on a repo admin enabling GitHub Pages
- GitHub Project item may be missing if `gh` lacks the `project` scope

## Follow-ups

- Repo admin enables Pages and re-runs the failed workflow
- Finish TV-001 on the engineering page

# GitHub Project board for development tracking

- **Date:** 2026-09-23
- **Author / agent:** Cursor agent
- **Scope:** `.cursor/skills/`, `docs/dev-notes/`, GitHub Project + issues
- **GitHub Project:** https://github.com/users/casstrevor/projects/2

## Summary

Created the **Thornvine** GitHub Project (user project #2), linked it to `casstrevor/thornvinemain`, and added skills so every commit updates the board with thoroughly explained issue descriptions. Extended Dev notes to require the same thoroughness and a Project link footer.

## Context

With the monorepo and Supabase MCP in place, we needed a durable place to manage development work. A GitHub Project linked to the repo gives Todo / In Progress / Done tracking, while skills enforce documentation quality so board items are useful to future readers—not one-line stubs.

## Changes

- Created project https://github.com/users/casstrevor/projects/2 and linked it to the repo
- Added `.cursor/skills/github-project/SKILL.md` (update on every commit; thorough description template)
- Updated `.cursor/skills/dev-notes/SKILL.md` to require project updates and richer Dev note sections
- Seeded issues #1–#4 on the board (foundation work Done; first schema Todo)

## How to verify

1. Open https://github.com/users/casstrevor/projects/2 and confirm four items
2. Open issues #1–#4 and confirm thorough Context / What changed / How to verify sections
3. Confirm skills exist under `.cursor/skills/github-project` and `.cursor/skills/dev-notes`

## Risks / notes

- `gh` requires `project` scope; refresh with `gh auth refresh -s project,read:project` if commands fail
- Project is private by default

## Follow-ups

- Next product work: issue #4 — define first schema via Supabase MCP
- Keep Status in sync on every commit

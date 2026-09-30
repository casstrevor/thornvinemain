# Thornvine agent coordination

Notion is the project source of truth. Luke owns product decisions. ChatGPT supports product management. Cursor owns engineering implementation and evidence.

Hub: https://app.notion.com/p/3eb9d506006880bcaf86d4c2f8eb7c60

## Before changing the product

- Read the Notion pages that apply to the task before implementation.
- Reuse the existing monorepo, Vite + React entry (`apps/web`), and any shared packages or components already in the repo. Do not add a parallel app, router, or design system until the task requires it.
- Record product, copy, and scope changes as proposals unless Luke has authorized them.
- Do not copy secret values into Notion, Dev notes, or commits. Environment documentation lists variable names only.

## After each prompt

- Update the Notion roadmap after each prompt. Follow `.cursor/skills/notion-roadmap/SKILL.md`. Create the roadmap if it does not exist. Keep planned, implemented, and verified status separate.
- Handoffs include the files and commit, the exact checks and results, limitations, and the next step.
- On commit or push, also follow `.cursor/skills/dev-notes/SKILL.md` and `.cursor/skills/github-project/SKILL.md`.
- Repository setup and scripts stay in `README.md`. This file does not restate the product brief.

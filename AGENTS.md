# Thornvine agent coordination

The repo folder `document/` is the central project knowledge base (decision TV-D007). Notion is the shared coordination space and may lag behind it. Luke and Trevor are co-founders and shared product owners (TV-D005). ChatGPT supports product management. Cursor owns engineering implementation and evidence.

Knowledge base index: `document/README.md`
Notion hub: https://app.notion.com/p/3eb9d506006880bcaf86d4c2f8eb7c60

## Before changing the product

- Read the `document/` pages that apply to the task (and Notion when relevant) before implementation.
- Reuse the existing monorepo, Vite + React entry (`apps/web`), and any shared packages or components already in the repo. Do not add a parallel app, router, or design system until the task requires it.
- Record product, copy, and scope changes as proposals unless Luke or Trevor has authorized them; name who authorized each decision.
- Do not copy secret values into `document/`, Notion, Dev notes, or commits. Environment documentation lists variable names only.

## After each prompt

- Update the matching `document/` files whenever planned, implemented, verified, hosting, schema, or scope status changes. Keep planned, implemented, and verified status separate.
- Update the Notion roadmap when it is reachable. Follow `.cursor/skills/notion-roadmap/SKILL.md`. If Notion is unavailable, say so in the handoff.
- Handoffs include the files and commit, the exact checks and results, limitations, and the next step.
- On commit or push, also follow `.cursor/skills/dev-notes/SKILL.md` and `.cursor/skills/github-project/SKILL.md`.
- Repository setup and scripts stay in `README.md`. This file does not restate the product brief.

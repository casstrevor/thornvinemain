# Thornvine documents

This folder is the **central project knowledge base** for Thornvine. It started as a copy of the Notion hub (2026-10-02) and is now the place where product, engineering, and operations facts are kept current. Notion may lag behind this folder; when they disagree, the newest dated entry wins and the other copy should be corrected. Do not put secrets in these files (environment variable names only).

Notion hub: https://app.notion.com/p/3eb9d506006880bcaf86d4c2f8eb7c60

Commit-by-commit history stays in `docs/dev-notes/`. This folder describes the product as it is and as it should be.

## Status at a glance (2026-10-02)

| Area | State |
|------|-------|
| Public site | **Live** at https://www.thornvine.com (landing page v2), deployed from `main` |
| HTTPS | Certificate issued for `www.thornvine.com`; Enforce HTTPS on |
| Apex `thornvine.com` | **Broken** — returns GitHub 404 until two leftover GoDaddy A records are deleted |
| Contact CTA | **Broken** — `mailto:hello@thornvine.com`, but the domain has no MX records, so mail bounces |
| Client portal | **Live** at `/login` and `/clientportal`, invite-only, backed by hosted Supabase |
| Project brief intake (TV-006) | Not built; blocked on destination decision |
| Stage 1 introduction | On branch `new-client-system-v1` at `/newclient`. Not on `main` and not linked from the public site |

Details: [roadmap](planning/roadmap.md), [hosting](platform/hosting.md), [site as built](site/implementation.md).

## How to keep this current

- Every commit that changes behavior, hosting, schema, or scope updates the matching file here **and** writes a dev note in `docs/dev-notes/`.
- Each file has a **Synced/Updated** date in its header. Bump it when you edit.
- Keep the Planned / Implemented / Verified distinction from the [roadmap](planning/roadmap.md). "Verified" needs a named check and result.
- Record decisions in [decisions](planning/decisions.md) with a source and date. Code that ships ahead of a decision is recorded as implementation, not as a decision.

## Site

Public landing page at `/`.

| Doc | Notion |
|-----|--------|
| [Brand and website brief](site/brand.md) | https://app.notion.com/p/3eb9d5060068813a94e2e361a44a73f2 |
| [Launch scope and acceptance](site/launch.md) | https://app.notion.com/p/3eb9d506006881eb8736ca5c3071ced7 |
| [Site as built](site/implementation.md) | Repo only |

Code: `apps/web/src/App.tsx`, `apps/web/src/App.css`, `apps/web/public/images/`.

## Portal

Signed-in client area. It is live in production. The launch brief still lists a portal as out of scope (TV-D004); see the open question TV-Q006.

| Doc | Notion |
|-----|--------|
| [Portal scope and operations](portal/scope.md) | Decision TV-D004 on the decisions page |
| [New client system v1](portal/new-client-system-v1.md) | Planned on branch `new-client-system-v1`; not a scope decision |
| [Stage 1 new-client conversation](intake/stage-1.md) | `/newclient` — not linked from the public site |

Code: `apps/web/src/routes.tsx`, `apps/web/src/lib/auth.tsx`, `apps/web/src/pages/`.

## Platform

Repository, Supabase, and GitHub Pages.

| Doc | Notion |
|-----|--------|
| [Engineering baseline](platform/engineering.md) | https://app.notion.com/p/3eb9d506006881ae8499d0c6121b20d0 |
| [Hosting, DNS, and deploy runbook](platform/hosting.md) | Host facts from the roadmap |
| [Supabase backend](platform/supabase.md) | Repo only |

Code: `apps/web/vite.config.ts`, `.github/workflows/deploy.yml`, `supabase/`.

## Planning

Cross-app status, tasks, and decisions.

| Doc | Notion |
|-----|--------|
| [Hub](planning/hub.md) | https://app.notion.com/p/3eb9d506006880bcaf86d4c2f8eb7c60 |
| [Roadmap](planning/roadmap.md) | https://app.notion.com/p/3eb9d5060068816c95fade2a67b6454c |
| [Delivery plan](planning/delivery-plan.md) | https://app.notion.com/p/3eb9d506006881c388c3d5c7d4433656 |
| [Decisions, questions, and risks](planning/decisions.md) | https://app.notion.com/p/3eb9d50600688137ba3df67969ed4ef1 |

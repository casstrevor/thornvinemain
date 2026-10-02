# Thornvine documents

Living technical documentation copied from the Notion hub and filed by the part of the app it belongs to. Update the matching file when that Notion page changes. Do not put secrets in these files.

Notion hub: https://app.notion.com/p/3eb9d506006880bcaf86d4c2f8eb7c60

Commit history stays in `docs/dev-notes/`. This folder is the product and engineering reference.

## Site

Public landing page at `/`.

| Doc | Notion |
|-----|--------|
| [Brand and website brief](site/brand.md) | https://app.notion.com/p/3eb9d5060068813a94e2e361a44a73f2 |
| [Launch scope and acceptance](site/launch.md) | https://app.notion.com/p/3eb9d506006881eb8736ca5c3071ced7 |

Code: `apps/web/src/App.tsx`, `apps/web/src/App.css`.

## Portal

Signed-in client area. The launch brief still treats a portal as out of scope until a decision adds it. The code on `authentication` is recorded separately from that decision.

| Doc | Notion |
|-----|--------|
| [Portal scope](portal/scope.md) | Decision TV-D004 on the decisions page |

Code: `apps/web/src/routes.tsx`, `apps/web/src/lib/auth.tsx`, `apps/web/src/pages/`.

## Platform

Repository, Supabase, and GitHub Pages.

| Doc | Notion |
|-----|--------|
| [Engineering baseline](platform/engineering.md) | https://app.notion.com/p/3eb9d506006881ae8499d0c6121b20d0 |
| [Hosting and DNS](platform/hosting.md) | Host facts from the roadmap |

Code: `apps/web/vite.config.ts`, `.github/workflows/deploy.yml`, `supabase/`.

## Planning

Cross-app status, tasks, and decisions.

| Doc | Notion |
|-----|--------|
| [Hub](planning/hub.md) | https://app.notion.com/p/3eb9d506006880bcaf86d4c2f8eb7c60 |
| [Roadmap](planning/roadmap.md) | https://app.notion.com/p/3eb9d5060068816c95fade2a67b6454c |
| [Delivery plan](planning/delivery-plan.md) | https://app.notion.com/p/3eb9d506006881c388c3d5c7d4433656 |
| [Decisions, questions, and risks](planning/decisions.md) | https://app.notion.com/p/3eb9d50600688137ba3df67969ed4ef1 |

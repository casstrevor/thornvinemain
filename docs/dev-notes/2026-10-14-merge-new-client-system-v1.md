# Merge new-client-system-v1 into main

- **Date:** 2026-10-14
- **Author / agent:** Cursor
- **Scope:** `apps/web` (new-client flow, portal, design system), `supabase/`, `document/`, design-system skill
- **GitHub Project:** https://github.com/casstrevor/thornvinemain/issues/17

## Summary

`main` now includes `new-client-system-v1` at `b9c55c3`: Stage 1 of the new-client conversation at `/newclient`, the staff review desk at `/newclient/review`, and the admin Workspace setup on `/clientportal`. Trevor asked for the merge on 2026-10-13. The sidebar menu is not in this merge. It is on `sidebar-menu` (#16).

## Context

`main` had already merged the design system (`3274b4b`). The client-system branch had grown its own copy of the same design-system files, so tokens, icons, the TextField styles, the design-system index, the client portal page, and the design-system skill conflicted. Every conflict was additive, and each side's content was kept.

## Changes

- `tokens.css` and `tokens.ts` keep main's tokens and add the introduction tokens (`--tv-forest-ink`, `--tv-ivory-50`, `--tv-sage-150`, `--tv-line-200`, `--tv-wine-600/700`, `--tv-slate-500`, `--tv-color-intro-*`, `--tv-text-question`, `--tv-border-width*`).
- `iconPaths.tsx` adds `paperclip`. `design-system/index.ts` exports `TextArea`. `text-field.css` adds `.tv-field__area`.
- `ClientPortalPage.tsx` keeps `hasRole` from main for the Design system link, plus `user` and `clients` state from the branch for Workspace setup.
- The design-system skill (`.agents` and `.cursor` copies) adds the voice rules to main's version.

## How to verify

- `pnpm --filter @thornvine/web build`: passed.
- `pnpm --filter @thornvine/web lint`: 0 errors, 2 existing warnings.
- From `apps/web`, `node --experimental-strip-types src/features/new-client/orchestrator.test.ts` and `questionCopy.test.ts`: both pass.
- After the deploy, open `/`, `/login`, `/newclient`, and `/design-system` on https://www.thornvine.com.

## Risks / notes

- Pushing `main` deploys to production. `/newclient` becomes reachable as an unlisted link (TV-D010).
- Hosted Supabase received the two intake migrations on 2026-10-07. This merge did not check that the `intake-turn` edge function is deployed.
- No signed-in save through Workspace setup has been verified.

## Follow-ups

- Smoke test production after the deploy.
- Merge `main` into `sidebar-menu`, then open a pull request.

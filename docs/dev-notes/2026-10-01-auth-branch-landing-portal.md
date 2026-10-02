# Landing, portal, and www host on the authentication branch

- **Date:** 2026-10-01
- **Author / agent:** Cursor agent
- **Scope:** `apps/web`, `supabase`, `.github/workflows/deploy.yml`, `README.md`
- **GitHub Project:** https://github.com/casstrevor/thornvinemain/issues/8

## Summary

The authentication branch was only the Notion roadmap skill. The landing redesign, client portal, and the `www.thornvine.com` Pages base path were still local. This commit puts that work on `authentication` so GitHub has the same tree as this machine, except graph cache and local editor settings.

## Context

`main` still builds GitHub Pages with base path `/thornvinemain/`. The public host is `www.thornvine.com`, which is served from `/`. The portal login and landing images were never committed. DNS at GoDaddy is separate from this commit and is not verified for HTTPS.

## Changes

- Landing page markup, styles, and `apps/web/public/images`
- Client routes: `/`, `/login`, `/clientportal`, and `/portal` redirect
- Auth provider, login page, and portal page
- `publicUrl()` and router basename so assets follow Vite `base`
- Pages workflow sets `VITE_BASE_PATH=/` for `www.thornvine.com`
- README documents the GoDaddy records
- Supabase migration `20260930044500_portal_core.sql` for profiles, clients, projects, and RLS
- Generated `database.types.ts` and a seed comment for invite-only portal users
- `react-router-dom` added in `apps/web/package.json` and the lockfile

## How to verify

1. `git log origin/authentication -1` shows this commit
2. `apps/web` build with `VITE_BASE_PATH=/` succeeds
3. Routes exist in `apps/web/src/routes.tsx`

## Risks / notes

- Not merged to `main`. The live Pages workflow still uses `/thornvinemain/` until this branch lands on `main`
- Portal migration is in the repo and has not been confirmed applied on the remote Supabase project in this commit
- No secrets are included. `.env` stays untracked
- HTTPS for `thornvine.com` is still blocked while GoDaddy A records include non-GitHub addresses

## Follow-ups

- Delete the two leftover GoDaddy A records, then enforce HTTPS
- Merge to `main` when the site should deploy from this tree

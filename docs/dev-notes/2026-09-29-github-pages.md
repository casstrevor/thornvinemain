# GitHub Pages for the web app

- **Date:** 2026-09-29
- **Author / agent:** Cursor agent
- **Scope:** `.github/workflows/deploy.yml`, `apps/web` Vite base path, `README.md`
- **GitHub Project:** https://github.com/casstrevor/thornvinemain/issues/6

## Summary

Thornvine’s Vite app needs a public static host. GitHub Pages is the fit: pushes to `main` build `apps/web` and publish the project site at `https://casstrevor.github.io/thornvinemain/`. The site lives in a subpath, so the production build sets Vite `base` and the router basename, and public image URLs go through that base.

## Context

The repo is `casstrevor/thornvinemain` (private). Project Pages always serves from `/thornvinemain/`, not the domain root. A root-absolute `/images/...` or `/login` path would miss the app. Local `pnpm dev` should stay at `/`.

The signed-in GitHub user can push workflows but is not a repo admin, so Pages source cannot be switched to GitHub Actions from this session. A private repo also needs GitHub Pro for Pages, or the repo has to be public.

## Changes

- Added `.github/workflows/deploy.yml`: pnpm install, `pnpm build` with `VITE_BASE_PATH=/thornvinemain/`, copy `index.html` to `404.html` so client routes such as `/login` load the SPA, then `actions/deploy-pages`
- `apps/web/vite.config.ts` reads `VITE_BASE_PATH` (default `/` when unset)
- README documents the site URL, the admin toggle, and the two Actions secrets
- Working tree (not in this commit; mixed with the in-progress landing and portal): router `basename` follows `import.meta.env.BASE_URL`, and public images go through `publicUrl()`

## How to verify

1. `VITE_BASE_PATH=/thornvinemain/ pnpm build` from the repo root
2. Confirm `apps/web/dist/index.html` references `/thornvinemain/assets/...`
3. After an admin sets Settings → Pages → Source to GitHub Actions, push to `main` and open https://casstrevor.github.io/thornvinemain/
4. Open `/thornvinemain/login` and confirm the app shell loads (GitHub serves `404.html`)

## Risks / notes

- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` must be GitHub Actions secrets or the deployed client has no Supabase config. They are public client values; do not commit them.
- The published site is public even when the repository is private (on plans that allow Pages).
- This session cannot enable Pages: the token is not an admin on `casstrevor/thornvinemain`.

## Follow-ups

- Repo admin enables GitHub Actions as the Pages source and adds the two secrets
- If the owner is on GitHub Free, make the repository public or upgrade before Pages will turn on

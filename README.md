# Thornvine

Monorepo for the Thornvine React web app and Supabase backend.

Live site: https://www.thornvine.com (deployed from `main`). Project knowledge base: [`document/`](document/README.md) — product, hosting, Supabase, status, and decisions.

## Structure

```
apps/
  web/          # Vite + React + TypeScript
packages/       # Shared packages (add as needed)
supabase/       # Migrations, config, edge functions
```

## Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io) 9+
- [Supabase CLI](https://supabase.com/docs/guides/cli) (optional, for local backend)

## Setup

```bash
pnpm install
cp .env.example apps/web/.env.local
# Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from your Supabase project
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the web app |
| `pnpm build` | Build the web app |
| `pnpm lint` | Lint the web app |
| `pnpm supabase:start` | Start local Supabase (requires Docker + CLI) |
| `pnpm supabase:stop` | Stop local Supabase |

## GitHub Pages

Pushes to `main` build the web app and deploy it to **https://www.thornvine.com**.

The workflow is `.github/workflows/deploy.yml`. It sets `VITE_BASE_PATH=/` because the custom domain is served from the site root. Local `pnpm dev` stays at `/`.

DNS is at GoDaddy. Add the custom domain in GitHub **before** changing GoDaddy, so the name cannot be claimed by another Pages site. A repo admin does this:

1. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
2. Custom domain: `www.thornvine.com`, then Save. Enforce HTTPS once GitHub offers it.
3. Add Actions secrets `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (same values as local `.env`). They are inlined into the client bundle at build time. Do not commit them.

Then in GoDaddy DNS, remove the parking A record and any domain forwarding. Add:

| Type | Name | Value |
|------|------|--------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `casstrevor.github.io` |

The CNAME target is `casstrevor.github.io`, not the repository name. `thornvine.com` then redirects to `www.thornvine.com`. Do not point `www` at the apex with a CNAME; that blocks HTTPS.

GitHub Pages on a private repository needs GitHub Pro (or make the repository public). The published site is public.

## Supabase

Project config lives in `supabase/`. After linking a project:

```bash
supabase link --project-ref <your-ref>
supabase db push
npx supabase gen types typescript --local > apps/web/src/lib/database.types.ts
```

# Thornvine

Monorepo for the Thornvine React web app and Supabase backend.

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

Pushes to `main` build the web app and deploy it to:

https://casstrevor.github.io/thornvinemain/

The workflow is `.github/workflows/deploy.yml`. It sets `VITE_BASE_PATH=/thornvinemain/` so asset and router URLs match the project site. Local `pnpm dev` stays at `/`.

One-time setup (repo admin):

1. GitHub → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Add Actions secrets `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (same values as local `.env`). They are inlined into the client bundle at build time. Do not commit them.

GitHub Pages on a private repository needs GitHub Pro (or make the repository public). The published site is public.

## Supabase

Project config lives in `supabase/`. After linking a project:

```bash
supabase link --project-ref <your-ref>
supabase db push
npx supabase gen types typescript --local > apps/web/src/lib/database.types.ts
```

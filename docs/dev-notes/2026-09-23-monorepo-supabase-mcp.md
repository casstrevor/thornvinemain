# Monorepo scaffold + Supabase MCP

- **Date:** 2026-09-23
- **Author / agent:** Cursor agent
- **Scope:** repo root, `apps/web`, `supabase/`, `.cursor/`, `.agents/`

## Summary

Bootstrapped the Thornvine pnpm monorepo (Vite React web app + Supabase layout), wired the project Supabase MCP, and installed Supabase agent skills so database work goes through MCP.

## Changes

- pnpm workspaces with `@thornvine/web` (Vite + React + TypeScript)
- Supabase client stub and typed placeholder at `apps/web/src/lib/`
- `supabase/` config, migrations, functions, seed
- Vite `envDir` loads root `.env` for `VITE_SUPABASE_*`
- `.cursor/mcp.json` for project-scoped Supabase MCP
- `.cursor/skills/supabase-mcp` — always use MCP for Supabase
- `.cursor/skills/dev-notes` — require a Dev note on every push
- Official skills via `npx skills add supabase/agent-skills`

## Follow-ups

- Push remains dependent on GitHub auth (completed for this push)
- Add real schema/migrations via Supabase MCP when product tables are defined
- Keep `.env` gitignored; never commit anon key or DB password

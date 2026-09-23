---
name: supabase-mcp
description: >-
  Require Supabase MCP for all Supabase interactions (schema, SQL, migrations,
  edge functions, branches, docs, advisors, logs, keys). Use whenever the user
  mentions Supabase, Postgres, database schema, migrations, RLS, or edge
  functions in this monorepo.
---

# Supabase via MCP only

when we interact with supabase we will always use the mcp

## Rules

1. **Always use the Supabase MCP** (`user-supabase` / `supabase` namespace) for:
   - Listing or inspecting tables, extensions, migrations
   - Running SQL (`execute_sql`) and DDL (`apply_migration`)
   - Generating TypeScript types
   - Edge functions (list, get, deploy)
   - Branches (create, list, merge, rebase, reset, delete)
   - Docs search, advisors, logs, project URL / publishable keys
2. **Do not** use ad-hoc `curl`, the Supabase Management REST API, or raw `psql` against the hosted project when MCP can do the job.
3. **Do not** put the database password in Vite/`VITE_*` client env. Client apps use only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (or publishable keys from MCP).
4. Before schema changes: `list_tables` (and migrations if needed) so you understand current structure.
5. Prefer `apply_migration` for DDL; use `execute_sql` for DML / reads.
6. After meaningful schema changes: regenerate types into `apps/web/src/lib/database.types.ts` via MCP `generate_typescript_types`.
7. If MCP reports `needsAuth` or auth errors, call `mcp_auth` for that namespace and retry.

## Companion skills

Also follow:
- `.agents/skills/supabase` (official Supabase agent skill)
- `.agents/skills/supabase-postgres-best-practices`

## Local project layout

- App client: `apps/web/src/lib/supabase.ts`
- Env (gitignored): root `.env` with `VITE_SUPABASE_*` (Vite `envDir` points at monorepo root)
- Migrations / config: `supabase/`
- MCP config: `.cursor/mcp.json` (project-scoped Supabase MCP)

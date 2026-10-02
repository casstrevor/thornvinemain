# Supabase backend

- **App section:** platform (database, auth, RLS)
- **Notion:** none (repo only)
- **Updated:** 2026-10-02
- **Code:** `supabase/migrations/`, `supabase/seed.sql`, `supabase/config.toml`, `apps/web/src/lib/supabase.ts`, `apps/web/src/lib/database.types.ts`

All Supabase work in this repo goes through the Supabase MCP (see `.cursor/skills/supabase-mcp/SKILL.md`). The web client only ever sees `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

## Hosted project state (2026-10-02)

| Item | Value |
|------|-------|
| Applied migrations | `20260930044500_portal_core` (only one) |
| `auth.users` | 2 |
| `profiles` | 2 (auto-created by trigger) |
| `clients` | 1 — `Thornvine` (slug `thornvine`) |
| `client_memberships` | 2, both `thornvine_admin` on the Thornvine client |
| `projects`, `project_updates`, `project_files` | 0 rows |
| Storage buckets | none |

Admins as of 2026-10-02: Luke (added 2026-09-30) and Trevor (`casstrevor@gmail.com`, added 2026-10-02 via MCP).

## Schema (`portal_core`)

Enums:
- `portal_role`: `thornvine_admin`, `client_owner`, `client_member`
- `project_status`: `discovery`, `active`, `paused`, `complete`
- `client_status`: `active`, `inactive`

Tables:
- `profiles` — 1:1 with `auth.users` (`id`, `full_name`, `email`, `avatar_url`, timestamps). Filled by trigger `on_auth_user_created` → `handle_new_user()`, which copies email and `full_name`/`name` from user metadata.
- `clients` — a customer workspace (`name`, unique `slug`, `status`).
- `client_memberships` — links a profile to a client with a `portal_role`. Unique per (client, user).
- `projects` — belongs to a client; `name`, `summary`, `status`, `starts_on`.
- `project_updates` — feed entries on a project; `author_id` → profiles, `title`, `body`, `published_at`.
- `project_files` — file metadata (`name`, `storage_path`, `uploaded_by`). **No Storage bucket exists yet**, so nothing can be uploaded.

`updated_at` triggers on profiles, clients, projects.

## Authorization model

- A user is a **Thornvine admin** if any of their memberships has role `thornvine_admin` (`is_thornvine_admin()`). Admin is global: it grants access to every client, not just the client the membership row points at.
- `is_client_member(client_id)` is true for admins or anyone with a membership on that client.
- `can_access_project(project_id)` is true if the user can access the project's client.
- These helpers are `SECURITY DEFINER` with `search_path = public` to avoid RLS recursion. Authorization never reads `user_metadata`.

RLS (all six tables have RLS on; only the `authenticated` role has grants):

| Table | Select | Insert / update / delete |
|-------|--------|--------------------------|
| profiles | own row, or admin | update own row only |
| clients | members of that client | admin only |
| client_memberships | own rows, admins, or members of the same client | admin only |
| projects | client members | admin only (no delete policy) |
| project_updates | anyone who can access the project | admin only; insert requires `author_id = auth.uid()` |
| project_files | anyone who can access the project | insert/delete admin only |

The front end also computes `isAdmin` from memberships, but only for display; the database is the enforcement point.

## Common operations

### Make someone an admin

The user must exist in Auth first (invite them from the Supabase dashboard → Authentication → Users; there is no public signup). Then, via MCP `execute_sql`:

```sql
insert into public.client_memberships (client_id, user_id, role)
select c.id, u.id, 'thornvine_admin'
from public.clients c, auth.users u
where c.slug = 'thornvine' and lower(u.email) = lower('person@example.com')
on conflict (client_id, user_id) do update set role = excluded.role;
```

Verify as that user:

```sql
begin;
select set_config('request.jwt.claims', json_build_object('sub','<user-uuid>','role','authenticated')::text, true);
set local role authenticated;
select public.is_thornvine_admin();
rollback;
```

### Onboard a client

1. Invite the person in Supabase Auth (they get a profile automatically).
2. `insert into public.clients (name, slug) values ('Client Co', 'client-co');`
3. Add their membership with role `client_owner` (or `client_member`).
4. Add `projects` / `project_updates` rows; they appear in `/clientportal`.

There is no admin UI yet; all of this is SQL.

## Advisor findings (2026-10-02)

Security (all WARN, none ERROR):
- `set_updated_at()` has a mutable `search_path`. Fix: `alter function public.set_updated_at() set search_path = public;`
- `can_access_project`, `handle_new_user`, `is_client_member`, `is_thornvine_admin` are `SECURITY DEFINER` and executable by `anon` and `authenticated` through `/rest/v1/rpc/*`. The migration revoked `public` but Supabase's default privileges still grant `anon`. Impact is low (they return booleans about the caller; `handle_new_user` fails outside a trigger), but the clean fix is to revoke `execute` from `anon` on all four and from `authenticated` on `handle_new_user`, or move the helpers to a non-exposed schema.
- Leaked-password protection is off. Turn on in Dashboard → Authentication → Password security (HaveIBeenPwned check). Relevant because the portal uses email + password.
- Remediation docs: https://supabase.com/docs/guides/database/database-linter

Performance (INFO):
- Unindexed foreign keys: `project_files.uploaded_by`, `project_updates.author_id`.
- Four indexes not yet used (expected with empty tables).

None of these were changed on 2026-10-02; they are tracked as hardening follow-ups.

## Types

Regenerate after schema changes with MCP `generate_typescript_types` into `apps/web/src/lib/database.types.ts`.

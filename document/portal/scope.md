# Portal scope and operations

- **App section:** portal (`/login`, `/clientportal`)
- **Notion:** TV-D004 on https://app.notion.com/p/3eb9d50600688137ba3df67969ed4ef1
- **Updated:** 2026-10-06

## Product boundary

TV-D004 is a PM proposal, not a founder decision: deliver the agency landing page and intake; no client portal, billing, CMS, CRM, or AI chatbot unless a later scope decision adds them.

**Reality on 2026-10-02:** the portal was merged to `main` (PR #10, `f609433`) and is **live in production** at https://www.thornvine.com/login, backed by the hosted Supabase project. It shipped as part of publishing the branch on Trevor's instruction. Whether the portal is now in launch scope is open question **TV-Q006** on the [decisions page](../planning/decisions.md). Until that is answered, treat it as live but unsupported: invite-only, no client data, admins only.

Public lead intake (TV-006) is a different surface. Do not describe the portal as the launch intake form.

A separate workstream, [new client system v1](new-client-system-v1.md), is on branch `new-client-system-v1`. That code is not on `main`, so this live portal is unchanged. The unlisted Stage 1 introduction is [Stage 1](../intake/stage-1.md).

## What exists

Routes (`apps/web/src/routes.tsx`):

| Path | Behavior |
|------|----------|
| `/login` | Email + password sign-in (`supabase.auth.signInWithPassword`). Honors `?next=` (defaults to `/clientportal`). "No public signup — access is invite-only." |
| `/clientportal` | Wrapped in `RequireAuth`. Not signed in → redirect to `/login?next=…`. Signed in with no membership → "Access pending" screen with sign-out. Otherwise shows the portal. |
| `/portal` | Redirects to `/clientportal`. |
| any other path | Redirects to `/`. |

The landing page footer links to "Client portal".

Portal page (`apps/web/src/pages/ClientPortalPage.tsx`):
- Header: email, an "Admin" tag for `thornvine_admin`, sign-out.
- Greeting from profile name or email; workspace line names the user's client, or says they have admin access across workspaces.
- **Projects** grid (all projects RLS lets the user see, newest first) with status chips.
- **Recent updates** feed (latest 8 `project_updates` with project name and date).
- Empty states for both when there is no data (current production state).

Auth state (`apps/web/src/lib/auth.tsx`): `AuthProvider` loads session, profile, and memberships (with joined client) on load and on every auth change; exposes `isAdmin` and `hasPortalAccess` (admin or ≥1 membership).

Data model, roles, and RLS: see [Supabase backend](../platform/supabase.md).

## Not built

- Admin UI for creating clients, projects, and updates is started on branch `new-client-system-v1` (see [new client system v1](new-client-system-v1.md)). It is not on `main` and not in production. Inviting users is still SQL plus the Supabase dashboard.
- File uploads (`project_files` has no Storage bucket).
- Password reset / magic link / account settings.
- Email notifications for new updates.

## Operations

- **Invite a user:** Supabase Dashboard → Authentication → Users → Invite. Then add a `client_memberships` row (see the SQL in [Supabase backend](../platform/supabase.md)).
- **Admins (2026-10-02):** Luke and Trevor.
- **Test sign-in:** open https://www.thornvine.com/login, sign in as an admin, confirm the "Admin" tag and empty states.

## Verification log

- 2026-10-02: `/login` rendered in a browser on production (form, heading, invite-only note). Sign-in itself was not exercised by Cursor (no credentials used).
- 2026-10-02: admin check `is_thornvine_admin()` returned true for `casstrevor@gmail.com` when simulated as that user in SQL.

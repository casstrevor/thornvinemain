# New client system v1

- **App section:** portal
- **Branch:** `new-client-system-v1`
- **Base:** `main` `e2a0be3` (merge of PR #13, 2026-10-06)
- **Repo:** [casstrevor/thornvinemain](https://github.com/casstrevor/thornvinemain)
- **Updated:** 2026-10-07
- **Status:** On branch `new-client-system-v1`. Not on `main`. Not deployed.

This file is the working definition of client system v1. It extends the live portal. It does not replace it, and it does not decide launch scope (TV-Q006).

## Why this branch exists

Trevor asked on 2026-10-06 to pull `main`, open a branch for a new client system, write the foundational documentation, and stop for the next commands.

Local uncommitted work on `authentication` (graphify output and `.cursor/settings.json`) was stashed as `wip before new-client-system-v1 from main` before the checkout. It is not on this branch.

## What is already true

These are facts about production and `main`. They are the starting point, not the design of v1.

- The public site is live at https://www.thornvine.com from `main`.
- A client portal is live at `/login` and `/clientportal`. It is invite-only, backed by hosted Supabase, and described in [portal scope](scope.md) and [Supabase backend](../platform/supabase.md).
- Roles today: `thornvine_admin`, `client_owner`, `client_member`. Admins see every client. Everyone else sees only clients they belong to. The database enforces this with row-level security.
- On `main`, there is no admin UI, file storage bucket, password reset, or email notification. Client, project, and update rows are created in SQL. This branch adds the admin create forms only.
- Production data on 2026-10-02: one client (`Thornvine`), two admin memberships, no projects. See the Supabase page for that snapshot.
- Public lead intake (TV-006) is a different surface. The portal is not the project-brief form.
- TV-D004 is still a PM proposal: no client portal in launch scope unless a later founder decision adds it. TV-Q006 asks whether the live portal is in scope. This branch does not answer that.

## v1 definition

Source: Trevor, 2026-10-07, "lets now start the project." Recorded as branch direction TV-D009. Luke has not separately confirmed it. Production launch scope stays TV-Q006.

| Topic | v1 |
|-------|----|
| Purpose | Thornvine admins keep client workspaces current. Clients read their projects and updates. |
| Relationship to the live portal | Extend `/login` and `/clientportal`. Same roles, same tables, same row-level security. |
| In scope for the first slice | An admin-only Workspace setup panel that creates a client, a project, and a project update. |
| Out of scope | Invites, file uploads, password reset, email notifications, billing, CMS, CRM, and the public project brief. |
| Roles | Unchanged: `thornvine_admin` writes; `client_owner` and `client_member` read their own client. |
| Data | Unchanged tables: `clients`, `projects`, `project_updates`. No new migration. |
| Screens | `/clientportal` gains Workspace setup for admins only. Clients do not see the forms. |
| Access | Still invite-only through Supabase Auth, then a membership row. This slice does not send invites. |

## First slice

Code: `apps/web/src/pages/AdminWorkspace.tsx`, wired from `ClientPortalPage.tsx`.

- Admins see three forms: new client (name, slug, status), new project (client, name, summary, status), new update (project, title, note).
- Saves use the existing admin insert policies. An update's `author_id` is the signed-in user.
- After a save, the projects list and recent updates reload.
- Client members keep the previous read-only portal.
- Duplicate slugs surface as "That slug already exists."

## Acceptance for this slice

- [ ] A Thornvine admin can create a client, then a project, then an update, and see them on `/clientportal` without using SQL.
- [ ] A client member does not see Workspace setup.
- [ ] A failed save shows the error and does not claim success.
- [x] `oxlint` and `tsc -b` passed locally on 2026-10-07. Lint still reports the existing `auth.tsx` fast-refresh warning.

Signed-in create flow is not verified yet. No admin password was used, and no rows were written to the hosted database.

## Constraints that already apply

- Luke and Trevor share product ownership. A scope change needs a named founder decision (see [decisions](../planning/decisions.md)).
- Notion coordinates; `document/` holds the current written facts (TV-D007).
- Do not put secrets, tokens, or `.env` values in this folder. Environment notes use variable names only (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
- Do not describe this system as the public intake form.
- Do not change production, merge to `main`, or edit the hosted database from this document.

## Also on this branch

Stage 1, the unlisted client introduction, is documented in [Stage 1](../intake/stage-1.md). It is a different surface from the admin Workspace setup above. It does not close TV-Q006.

## This step did not

- Change the live portal on `main`.
- Close TV-Q006 or supersede TV-D004.

## Next

Sign in as an admin and run the three saves against a non-production client, or against the hosted project only when a founder wants that data. Then decide invites, files, or password reset. Do not merge this branch until that check is recorded.

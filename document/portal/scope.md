# Portal scope

- **App section:** portal (`/login`, `/clientportal`)
- **Notion:** TV-D004 on https://app.notion.com/p/3eb9d50600688137ba3df67969ed4ef1
- **Synced:** 2026-10-02

## Product boundary

TV-D004 is a PM proposal, not a founder decision to build a portal.

Deliver the agency landing page and intake. No client portal, billing, CMS, CRM, or AI chatbot unless a later scope decision adds them.

## What is in the repository

Branch `authentication` commit `91b5813` contains portal code anyway. That is implementation, not acceptance of TV-D004 being reversed.

- Routes: `/login`, `/clientportal`, and `/portal` redirects to `/clientportal` (`apps/web/src/routes.tsx`).
- Auth and portal UI: `apps/web/src/lib/auth.tsx`, `apps/web/src/pages/`.
- Schema: `supabase/migrations/20260930044500_portal_core.sql` (profiles, clients, projects, RLS).

Public lead intake (TV-006) is a different surface. It is still blocked on where briefs go. Do not describe the portal as the launch intake form.

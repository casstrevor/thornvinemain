# Design system: tokens, components, and admin/designer reference page

- **Date:** 2026-10-02
- **Author / agent:** Cursor agent
- **Scope:** `apps/web` (design-system, pages/design-system, lib/auth, routes, portal), `supabase/migrations`, `.cursor/skills/design-system`
- **GitHub Project:** https://github.com/casstrevor/thornvinemain/issues/14

## Summary

Thornvine now has a design system: one token file, a set of reusable React components, and a reference page at `/design-system` that only Thornvine admins and designers can open. Before this, the landing page, portal, and auth screens each hard-coded their own colors and buttons, so every new screen drifted further from the brand. A new project skill requires every future component to comply with the system.

## Context

- Branch `design-system` was re-cut from `authentication` (not `main`) because role-gating needs the AuthProvider, router, and `portal_role` enum that only exist there.
- A designer role did not exist. It follows the same model as `thornvine_admin`: a value on `portal_role`, granted through `client_memberships`.
- The user asked for the migration files only; nothing was applied to the remote Supabase project (remote has only `portal_core`).

## Changes

- `design-system/tokens.css`: color primitives and semantic tokens, type scale, spacing, radius, elevation, motion, z-index, shared keyframes. Imported globally in `main.tsx`. `tokens.ts` lists token names for docs; values are read from CSS at runtime so the CSS stays the only source.
- `design-system/components/`: Button (primary/secondary/tertiary, sizes, loading, inverse), IconButton, `buttonClassName()`, TextField, Alert, Badge, Spinner, Card, Media, Icon. Exported from `design-system/index.ts`.
- `pages/design-system/`: `DesignSystemPage` (left sidebar + main view), `SideNav` (hierarchy, collapse, filter, hide planned, status dots), `registry.ts` (single source for nav, built vs planned specs), `doc-kit/` (Preview, PropsTable, DoDont), and one lazy-loaded doc per entry.
- Around 35 planned components and patterns recorded with priority, variants, and notes.
- `lib/auth.tsx`: `roles` and `hasRole()` derived from memberships; `RequireRole` gate. `lib/roles.ts`: `PortalRole`, `DESIGN_SYSTEM_ROLES`.
- `routes.tsx`: `/design-system/:entryId?` behind `RequireAuth` + `RequireRole`, lazy-loaded.
- Client portal header links to the design system for admins/designers; the design system top bar links back.
- Migrations `20261002033000_designer_role.sql` and `20261002033100_design_system_access.sql` (`is_design_system_viewer()`); `database.types.ts` and `seed.sql` updated.
- `.cursor/skills/design-system/SKILL.md` (mirrored to `.agents/skills/`).

## How to verify

1. `pnpm --filter @thornvine/web build` and `pnpm --filter @thornvine/web lint` pass (one pre-existing `useAuth` warning).
2. Sign in as a `thornvine_admin` on the dev server, open `/clientportal`, click **Design system**.
3. Check sidebar filtering, collapse, hide planned, and deep links such as `/design-system/motion`.
4. Sign in as a client user; `/design-system` shows "Not available".

## Risks / notes

- Migrations are not applied yet; until they are, only admins have access.
- A designer attached to a client can also read that client's portal data. Attach designers to the Thornvine client only.
- No secrets.

## Follow-ups

- Apply both migrations via Supabase MCP and regenerate types.
- Build the "now" priority planned components.
- Migrate landing and portal CSS onto `tv-` tokens.

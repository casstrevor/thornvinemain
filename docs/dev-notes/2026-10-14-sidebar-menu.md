# Sidebar menu

- **Date:** 2026-10-14
- **Author / agent:** Cursor
- **Scope:** `apps/web` layout, routes, design-system tokens and icons, `document/`
- **GitHub Project:** https://github.com/casstrevor/thornvinemain/issues/16

## Summary

Every page now renders inside an app shell with a left sidebar. Everyone sees Client portal and a Sign in or Sign out control. Admins also see New-client review and Design system. On narrow screens the sidebar becomes a slide-out drawer. The code lives in its own `apps/web/src/layout/` module, so links, the navigation list, the account section, and the shell can each change on their own.

## Context

Trevor asked for a left-hand sidebar menu with modular code. He chose every page, links gated by role, and the links Client portal, New-client review, Design system (admin only), and Sign out. Recorded as TV-D011. The work branches from `new-client-system-v1` at `b9c55c3` and is kept on `sidebar-menu` so `main` can take the client-system branch first.

## Changes

- `layout/AppShell.tsx` is a layout route with drawer state keyed to the current path, so the drawer closes after any navigation. Escape and the backdrop close it too.
- `layout/sidebar/navItems.ts` holds the link config, each marked for everyone or admins only, filtered by `visibleNavItems()`.
- `SidebarNav`, `SidebarAccount`, and `Sidebar` are separate components. Anonymous intake sessions count as signed out.
- `routes.tsx` nests every route under `<AppShell />`.
- New tokens: `--tv-color-scrim` and `--tv-layout-sidebar-width`. New icons: `grid`, `clipboard`, `swatch`, `sign-in`, `sign-out`.
- `document/planning/decisions.md` (TV-D011) and `document/platform/engineering.md` are updated.

## How to verify

- `pnpm --filter @thornvine/web build` passes.
- `pnpm --filter @thornvine/web lint` reports 0 errors. The 2 warnings were already there.
- With `pnpm dev`, the sidebar shows on `/`, `/newclient`, and `/clientportal`, with the current page highlighted. As an admin, the two admin links appear. Below about 900px, the menu button opens the drawer.

## Risks / notes

- The page headers still repeat the brand, and the portal shows a second Sign out.
- On this branch, `/design-system` falls back to `/` until `main` (with the design system) is merged in.
- Checked only as an admin at 1141px and an emulated 390px width. Not checked signed out or as a client, and no keyboard or screen-reader audit.

## Update: main merged in (2026-10-14)

`main` (`f8e1722`, with the design system and the Stage 1 intake) is merged into `sidebar-menu`. Only `routes.tsx` conflicted. `/design-system/:entryId?` now sits inside `AppShell`, still behind `RequireAuth` and `RequireRole`. Each nav item can now carry a `roles` list, checked with `hasRole`. The Design system link reuses `DESIGN_SYSTEM_ROLES`, so designers see it too. Build passed; lint showed 0 errors and 2 existing warnings. In the browser, the sidebar rendered on `/design-system` beside the design-system docs navigation.

## Follow-ups

- Open a pull request from `sidebar-menu` into `main`.
- The design-system page repeats the brand, Client portal, and Sign out in its own top bar. Decide whether to trim them now that the sidebar has those links.
- Decide whether to keep the sidebar on the public landing page and intake for launch.

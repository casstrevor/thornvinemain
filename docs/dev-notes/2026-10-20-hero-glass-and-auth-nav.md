# Frosted hero and authenticated nav

- **Date:** 2026-10-20
- **Author / agent:** Cursor
- **Scope:** `apps/web` landing, shell, sidebar, brand assets, `document/`, Notion roadmap skill
- **GitHub Project:** https://github.com/casstrevor/thornvinemain/issues/18

## Summary

The public landing page now sends both "Tell us your idea" buttons to `/newclient`, centers the hero copy under the header options, and puts each hero line on its own frosted bar. The primary buttons and the sidebar use the same glass treatment. Public pages keep the collapsed thornvine chip. Signed-in app pages dock that mark in the navigation so it no longer covers the page. The browser tab and in-app mark use the official mirrored-thorn TV monogram.

## Context

Trevor selected the live landing controls and asked for each change in place: the primary button should open the new-client page, the hero lines should be centered with the header, each selected line should have its own bar like the header pill, and the brand chip should stop overlapping authenticated pages while remaining on public pages. He also supplied the official TV monogram for the tab icon and the in-app mark. None of this is on `main`, and none of it is live at thornvine.com.

## Changes

- `App.tsx`: both landing "Tell us your idea" links go to `/newclient`. The header no longer includes a Client portal pill.
- `App.css`: hero copy is centered. The eyebrow, heading, lede, action row, and consultation note each have a frosted bar. Primary landing buttons use burgundy glass (`btn--glass`).
- Design tokens: glass fill, edge, highlight, blur, saturate, and shadows for buttons, the sidebar, and hero bars.
- `AppShell.tsx`: public routes keep the collapsed chip. `/account`, `/clientportal`, `/design-system`, and `/newclient/review` dock the sidebar on wide screens and put the mark in the top bar on narrow screens.
- Sidebar: Sign in sits at the bottom when signed out. The signed-in account strip stays above the logo and links to `/account`. Client portal is not a sidebar link. The sidebar surface is frosted glass.
- Login heading is "Sign in". The lede says "thornvine" in lowercase.
- Official monogram assets replace the Vite favicon. `LogoMark` uses `public/images/logo.png`. Poppins is the heading and body face.
- Notion roadmap skill: project-page updates that refer to code include the GitHub URL.

## How to verify

- On http://localhost:5173/ the collapsed chip shows "thornvine". The hero lines are centered and each sits on its own bar. "Tell us your idea" opens `/newclient`.
- On http://localhost:5173/account while signed in, the page starts beside the nav and is not covered by the chip.
- Below 56rem on `/account`, "thornvine" is in the top bar and the menu stays off-screen until opened.
- `pnpm --filter @thornvine/web build` and `lint` were not re-run for this commit.

## Risks / notes

- Not on `main`. Not live. Production still uses the solid buttons, `#contact` / `mailto:hello@thornvine.com`, and the old favicon until this branch is merged and deployed.
- The local click checks do not verify that a submitted brief is delivered.
- Graphify output and `.codex/config.toml` are left uncommitted.

## Follow-ups

- Merge and deploy before treating any of this as live.
- Verify brief delivery for TV-006. Do not mark launch complete from this branch.

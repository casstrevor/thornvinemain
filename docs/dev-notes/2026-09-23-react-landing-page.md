# React landing page foundation

- **Date:** 2026-09-23
- **Author / agent:** Cursor agent
- **Scope:** `apps/web`, `.cursor/rules`, `graphify-out`
- **GitHub Project:** https://github.com/casstrevor/thornvinemain/issues/5

## Summary

Started Thornvine's user-facing React frontend by replacing the repository's Supabase configuration placeholder with a responsive product landing page. The change establishes the initial visual language, page structure, accessibility baseline, and conversion entry points that the team can refine as product requirements become concrete. It also adds Graphify project context so future frontend work can query the repository architecture before changing it.

## Context

The monorepo already contained a sound Vite, React 19, TypeScript, and Supabase foundation, but the rendered page existed only to report whether local Supabase environment variables were present. The next phase of work is product-facing, so the frontend needed a real starting point that could run immediately without introducing a component framework or locking the project into an unconfirmed application architecture.

The repository audit found a single React entry point and page component, global/component CSS, and an isolated Supabase client. Routing, tests, reusable UI primitives, and finalized product positioning are intentionally deferred until the landing-page requirements become clearer.

## Changes

- Replaced the configuration-status UI in `apps/web/src/App.tsx` with semantic navigation, a branded hero, early-access calls to action, custom inline vine artwork, and an introductory story strip.
- Reworked `apps/web/src/App.css` into a responsive visual foundation using an earthy palette, editorial typography, fluid sizing, tablet/mobile layouts, visible keyboard focus, and reduced-motion handling.
- Kept the initial page dependency-free by building the artwork and interaction styling with React, SVG, and CSS rather than introducing a UI or animation package.
- Added a page description, browser theme color, and more descriptive title in `apps/web/index.html`.
- Installed the official `graphifyy` CLI, registered Graphify's project-scoped Cursor rule, and generated the initial `graphify-out/` knowledge graph.
- Preserved the existing Supabase client for future product flows while removing environment diagnostics from the public landing page.

## How to verify

- Start the frontend with `pnpm dev` and open `http://127.0.0.1:5173/`.
- Confirm the navigation, hero content, CTA controls, vine artwork, and story strip render correctly.
- Resize through desktop, tablet, and mobile widths; navigation and CTA layout should adapt without horizontal overflow.
- Navigate by keyboard and confirm interactive links receive a visible focus outline.
- Enable reduced motion and confirm smooth scrolling/transitions are suppressed.
- Run lint, TypeScript, and production build checks. The installed Oxlint, TypeScript, and Vite binaries complete successfully for this change.

## Risks / notes

- Product messaging and the current early-access email destination are provisional and should be replaced when product positioning and conversion requirements are confirmed.
- The existing lockfile references Supabase packages published on the day of this change. The active pnpm minimum-release-age policy rejects those entries during automatic dependency verification, so the normal wrapper scripts remain temporarily blocked even though direct lint, typecheck, and Vite build validation pass.
- No database schema, authentication behavior, or Supabase configuration changed.
- Graphify output is generated repository context and should be refreshed as source files change.

## Follow-ups

- Confirm the product's target audience, value proposition, final copy, brand assets, and early-access flow.
- Split stable page sections into reusable components once the next landing-page sections are defined.
- Add browser-level tests after the first interactive flow is implemented.
- Re-run the normal pnpm scripts after the Supabase packages age beyond the configured supply-chain cutoff.

# Thornvine glass effect

- **Date:** 2026-10-21
- **Author / agent:** Trevor / Cursor
- **Scope:** `apps/web`, public landing page, shared design system, app sidebar, auth and portal controls
- **GitHub Project:** https://github.com/casstrevor/thornvinemain/issues/19

## Summary

Introduced a named `thornvine-glass-effect` visual treatment and applied it to the public hero, primary navigation, collapsed application brand tile, and filled interactive controls across signed-out and signed-in views. The treatment centralizes crisp translucent edges, layered shadows, inset highlights, and backdrop effects while preserving each control's existing semantic colors.

## Context

Trevor iterated on the landing-page hero and collapsed sidebar directly in the browser preview. The previous implementation mixed legacy button styles, one-off frosted surfaces, and newer design-system tokens. This change gives those surfaces a shared vocabulary and reusable utility without changing routes, authentication behavior, or data flow.

## Changes

- Added `apps/web/src/design-system/thornvine-glass-effect.css` with base, surface, and panel variants.
- Added semantic color and elevation tokens for the pale navigation surface, deep-plum glass CTA, hero consultation note, transparent brand tile, and subtle brand logo/name depth.
- Updated the landing navigation and all hero copy/action bars to use the named effect.
- Set the hero primary CTA to `#1E0029` at 75% opacity with `#FAFFF7` text.
- Unified the collapsed sidebar logo and wordmark into one full-size clickable tile with a transparent background, glass edge, panel shadow, and subtle logo/name shadows.
- Applied the treatment to shared design-system primary buttons and relevant filled links, choices, navigation states, auth controls, portal controls, and design-system controls.
- Updated `document/site/implementation.md` with the working-tree implementation state.

## How to verify

- `pnpm --filter @thornvine/web build` — passed; Vite reports the existing bundle-size advisory.
- `pnpm --filter @thornvine/web lint` — passed with two existing warnings in `src/lib/auth.tsx` and `src/pages/ClientPortalPage.tsx`.
- `git diff --check` — passed.
- Browser preview — verified the collapsed sidebar brand tile as one full clickable container and checked the landing-page glass surfaces.

## Risks / notes

- No database, environment, authentication, or routing changes.
- The work is locally verified but not verified on the deployed production URL.
- `graphify` was unavailable in the shell, so the required graph refresh could not be run.
- The configured Notion roadmap URL is inaccessible from the connected Notion workspace; the roadmap update could not be completed.

## Follow-ups

- Review responsive behavior and real-device rendering before merge.
- Restore access to the Thornvine Notion workspace and add the issue and commit URLs to the roadmap.

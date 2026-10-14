---
name: design-system
description: >-
  Enforce the Thornvine design system on every UI component and page. Use when
  creating, editing, or reviewing React components, pages, CSS, styling, colors,
  typography, spacing, animation, buttons, forms, copy, voice, or any visual UI
  in apps/web.
---

# Thornvine design system compliance

every component we make must comply with our design system

## Source of truth

- Tokens: `apps/web/src/design-system/tokens.css` (all `--tv-*` values and shared `@keyframes`)
- Voice: `apps/web/src/design-system/voice.md`
- Components: `apps/web/src/design-system/components/<Name>/`, exported from `apps/web/src/design-system/index.ts`
- Docs + roadmap: `apps/web/src/pages/design-system/registry.ts`, rendered at `/design-system` (admin/designer only)

## Rules

1. **Reuse before building.** Import existing components from `design-system/index.ts` (`Button`, `IconButton`, `buttonClassName`, `TextField`, `Alert`, `Badge`, `Spinner`, `Card`, `Media`, `Icon`). Never hand-roll a button, input, badge, alert, card, or spinner.
2. **Tokens only.** Style with semantic tokens (`var(--tv-color-*)`, `--tv-space-*`, `--tv-radius-*`, `--tv-shadow-*`, `--tv-text-*`, `--tv-duration-*`, `--tv-ease-*`, `--tv-z-*`). No raw hex/rgb, px font sizes, ad-hoc shadows, or magic durations. Primitives (`--tv-forest-800` etc.) only inside new semantic token definitions.
3. **Need a new value?** Add a token to `tokens.css` (and its entry in `design-system/tokens.ts`) rather than a one-off literal.
4. **Need a new component?** If it's listed as `planned()` in `registry.ts`, build to that spec. Otherwise add it to the registry first. Then:
   - Create `design-system/components/<Name>/<Name>.tsx` + `<name>.css` (class prefix `tv-<name>`, BEM-style `__element` / `--modifier`)
   - Export it from `design-system/index.ts`; keep non-component helpers in separate `.ts` files (fast refresh)
   - Add a doc in `pages/design-system/docs/components/<Name>Doc.tsx` (default export: previews, props table, usage)
   - Switch the registry entry from `planned()` to `built()`
5. **Motion.** Use shared keyframes (`tv-fade-in`, `tv-rise-in`, `tv-scale-in`, `tv-leaf-sway`, `tv-pulse`, `tv-spin`) with duration/easing tokens; animate only transform/opacity; always provide a `prefers-reduced-motion` fallback.
6. **Imagery.** Render photos through `Media` (required `alt`, ratio, overlay); assets live in `apps/web/public/images/` and load via `publicUrl()`.
7. **Brand rules.** One burgundy primary action per view; leaf green only for selection/progress accents; Sora for headings, DM Sans for body.
8. **Voice.** Follow `voice.md`. Eyebrow, title, and support stay in that shape. Paired questions share a pattern ("Who it's for" / "What it's for", "Who's this for?" / "What's this for?"). "Not sure yet" is the only unsure option. No client-facing "Stage 2."
9. **Accessibility.** Visible labels on inputs, `label` on icon-only buttons, focus via `--tv-color-focus`, AA contrast, never color alone for status.

## Before finishing UI work

- [ ] No hard-coded colors/sizes/durations in new CSS (search the diff for `#`, `rgb(`, `px`, `ms`)
- [ ] Existing design-system components used where they fit
- [ ] New components exported, documented, and registered
- [ ] `pnpm --filter @thornvine/web build` and `lint` pass

## Legacy code

The landing page (`App.css`) and portal/auth CSS predate the system and use older vars (`--cream`, `--forest`, `.btn`). When touching them, migrate the edited parts to `tv-` tokens and components; don't add new legacy styles.

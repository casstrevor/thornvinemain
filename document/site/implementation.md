# Site as built

- **App section:** site (public landing page)
- **Notion:** none (repo only; compares the code to the brand brief)
- **Updated:** 2026-10-22 (review desk, glass surfaces, and landing people section on `hero-glass-and-auth-nav`)
- **Code:** `apps/web/src/App.tsx`, `apps/web/src/App.css`, `apps/web/src/layout/app-shell.css`, `apps/web/index.html`, `apps/web/public/images/`
- **Live:** https://www.thornvine.com (`main` `f609433`)

The [brand brief](brand.md) and [launch scope](launch.md) describe what the site should be. This page records what is actually deployed so the gap is visible.

## Page structure (live)

| # | Section | Anchor | Content |
|---|---------|--------|---------|
| — | Header | — | Nav "What we do" / "Our work" / "Our people" uses a pale sage pill (`#FAFFF7` at 75% opacity, `--tv-color-surface-nav`) with dark green link text (`#0B2900`, `--tv-color-text-on-nav`; Trevor, 2026-10-21, glass unification). The pill stays visible under `56rem` and wraps. The "Client portal" header link was removed 2026-10-20. Wide public pages keep the collapsed TV monogram + "thornvine" chip; hovering it opens the overlay menu. Authenticated pages dock the mark in the side nav on wide screens and use the top bar on narrow screens. Signed-in name or email and Admin sit below the logo, above the nav links, and open `/account`. Signed-out Sign in sits at the bottom. The admin intake link is Review desk (`/newclient/review`). The selected nav item is a filled accent pill with no left bar. Client portal is not in the sidebar. |
| 1 | Hero | — | Eyebrow "Human ideas. Digital possibilities."; H1 "Your imagination. Let's make it real."; body "We design and build custom apps, digital tools, and experiences for people with ideas."; buttons "Tell us your idea" (deep plum glass, → `/newclient` on this branch; production is still a solid button → `#contact`) and "Explore our work" (→ `#work`); note "Free consultation. Real collaboration." The primary nav and hero bars use the named `thornvine-glass-effect` treatment (Trevor, 2026-10-21). On load, each bar rises in with `tv-rise-in`. Tree + landscape art; a strip "30+ years of combined experience in design, technology & learning" |
| 2 | Services | `#what-we-do` | "What can we create together?" — Digital products / Design & strategy / AI & automation / Learning & creative. Bottom fades into the work section (sage → forest gradient, 2026-10-17). |
| 3 | Work | `#work` | "Ideas taking shape." — OVRmaps card (phone mock, "Pine Ridge Trail" sample) and Wyldtracks card ("Project preview coming soon"). Continues the forest color from the services fade. |
| 4 | People | `#people` | On `hero-glass-and-auth-nav`: "Meet the humans." Luke and Trevor as equal co-founder cards. Shared line: combined 30+ years. No photos and no individual bios (TV-Q004). Production `main` still has a hidden empty `#people` target. |
| 5 | Closing | `#contact` | "Good things grow together." / "Curious minds. Thoughtful makers. Humans who care." / button "Tell us your idea" uses the same deep plum glass as the hero → `/newclient` on this branch (production is still a solid button → `mailto:hello@thornvine.com`); footer © year. |

### Thornvine Glass Effect (2026-10-21)

Filled interactive controls and navigation surfaces use the named `thornvine-glass-effect`: a crisp translucent edge, layered neutral shadow, inset highlight, and backdrop blur/saturation. It does not assign fill or text colors, so each pre-auth and post-auth control keeps its existing palette. The collapsed app-sidebar brand tile is fully transparent with no backdrop filter; its shape comes only from the glass edge, inset highlight, and panel shadow. Its logo mark and name have separate subtle depth shadows. Filled links, selections, and pagers use the surface variant. Authorized by Trevor on 2026-10-21.

## Gaps against the brief (2026-10-02)

Launch-blocking:
- **Contact is dead on production.** On `main`, every "Tell us your idea" path ends at `mailto:hello@thornvine.com`, and `thornvine.com` has no MX records, so the email bounces. On the uncommitted `sidebar-menu` working tree both buttons go to `/newclient`. The brief still requires a project brief form (TV-006) with verified delivery; launch acceptance forbids dead placeholder links.
- **"Our people" on production** still points at a hidden empty `#people` target. On `hero-glass-and-auth-nav` it opens "Meet the humans" (Luke and Trevor, equal cards). Founder photos and individual bios are still missing (TV-Q004).
- **"See how it happens" is missing.** The brief calls for six sections; five exist on this working tree (four on `main`).

Content differences (need founder review, not necessarily wrong):
- Hero eyebrow is "Human ideas. Digital possibilities." (brief draft: "Creative product agency").
- Hero supporting line is "Free consultation. Real collaboration." (brief: "Start with a project brief. Your first consultation is free.").
- The body copy is shorter than the brief's draft.
- "Explore our work" in the work section links back to `#work` itself. OVRmaps and Wyldtracks cards have arrow icons but no links.
- Typography is **Poppins** for display and body (self-hosted; TV-D013, 2026-10-17). Google Fonts Sora/DM Sans removed.
- Motion: the Canvas 2D leaf overlay was removed 2026-10-21 (Trevor). The earlier looping `<img>` leaves are also gone. Hero copy still staggers in. No-JS still has the hero photograph. TV-Q005 (scene) stays open.

## Assets

`apps/web/public/images/` totals **3.8 MB** of JPGs (largest: `footer-leaves.jpg` 700 KB, `ovrmaps-bg.jpg` 512 KB, `hero-tree.jpg` 511 KB, `hero-landscape.jpg` 469 KB). No WebP/AVIF or responsive `srcset`. This matters for the LCP ≤ 2.5 s target in launch acceptance. Usage rights for these images are not recorded (TV-002).

JS bundle: one chunk of 492 KB (142 KB gzip), including React, React Router, and supabase-js. The landing page does not need supabase-js; code-splitting the portal routes would shrink the first load.

## Not yet checked

- Keyboard navigation and focus styles, contrast, screen-reader pass (WCAG 2.2 AA target).
- Mobile layouts on real devices.
- Lighthouse / Core Web Vitals.

## Metadata (`apps/web/index.html`)

- Present: `<title>`, meta description, `theme-color` `#1a2e26`, tab icon `favicon.png` (the TV monogram on cream). The old Vite `favicon.svg` is removed from `index.html`.
- Missing: Open Graph / Twitter card tags and a share image, canonical URL (`https://www.thornvine.com/`), `robots.txt`, sitemap. Launch acceptance lists "essential metadata/social sharing".

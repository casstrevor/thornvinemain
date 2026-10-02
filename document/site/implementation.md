# Site as built

- **App section:** site (public landing page)
- **Notion:** none (repo only; compares the code to the brand brief)
- **Updated:** 2026-10-02
- **Code:** `apps/web/src/App.tsx`, `apps/web/src/App.css`, `apps/web/index.html`, `apps/web/public/images/`
- **Live:** https://www.thornvine.com (`main` `f609433`)

The [brand brief](brand.md) and [launch scope](launch.md) describe what the site should be. This page records what is actually deployed so the gap is visible.

## Page structure (live)

| # | Section | Anchor | Content |
|---|---------|--------|---------|
| — | Header | — | Logo, nav "What we do" / "Our work" / "Our people", CTA "Tell us your idea" → `#contact` |
| 1 | Hero | — | Eyebrow "Human ideas. Digital possibilities."; H1 "Your imagination. Let's make it real."; body "We design and build custom apps, digital tools, and experiences for people with ideas."; buttons "Tell us your idea" (→ `#contact`) and "Explore our work" (→ `#work`); note "Free consultation. Real collaboration."; tree + landscape art; a strip "30+ years of combined experience in design, technology & learning" |
| 2 | Services | `#what-we-do` | "What can we create together?" — Digital products / Design & strategy / AI & automation / Learning & creative |
| 3 | Work | `#work` | "Ideas taking shape." — OVRmaps card (phone mock, "Pine Ridge Trail" sample) and Wyldtracks card ("Project preview coming soon") |
| 4 | Closing | `#contact` | "Good things grow together." / "Curious minds. Thoughtful makers. Humans who care." / button "Tell us your idea" → `mailto:hello@thornvine.com`; footer © year and "Client portal" link |

## Gaps against the brief (2026-10-02)

Launch-blocking:
- **Contact is dead.** Every "Tell us your idea" path ends at `mailto:hello@thornvine.com`, and `thornvine.com` has no MX records, so the email bounces. The brief requires a project brief form (TV-006) with verified delivery; launch acceptance forbids dead placeholder links.
- **"Our people" nav link** points at `<div id="people" hidden />`, so clicking it does nothing visible.
- **Sections 4 and 5 are missing**: "Meet the humans" (Luke and Trevor, equal prominence) and "See how it happens" (process). The brief calls for six sections; four exist.

Content differences (need founder review, not necessarily wrong):
- Hero eyebrow is "Human ideas. Digital possibilities." (brief draft: "Creative product agency").
- Hero supporting line is "Free consultation. Real collaboration." (brief: "Start with a project brief. Your first consultation is free.").
- The body copy is shorter than the brief's draft.
- "Explore our work" in the work section links back to `#work` itself. OVRmaps and Wyldtracks cards have arrow icons but no links.
- Typography is **Sora** (display) and **DM Sans** (body) from Google Fonts; the brief named Poppins. Record a decision if Sora/DM Sans is the intended direction.
- Motion: the brief's pointer-reactive leaves and tree are not implemented; the hero has a fade-in and decorative falling-leaf art. Reduced-motion and no-JS behavior have not been checked.

## Assets

`apps/web/public/images/` totals **3.8 MB** of JPGs (largest: `footer-leaves.jpg` 700 KB, `ovrmaps-bg.jpg` 512 KB, `hero-tree.jpg` 511 KB, `hero-landscape.jpg` 469 KB). No WebP/AVIF or responsive `srcset`. This matters for the LCP ≤ 2.5 s target in launch acceptance. Usage rights for these images are not recorded (TV-002).

JS bundle: one chunk of 492 KB (142 KB gzip), including React, React Router, and supabase-js. The landing page does not need supabase-js; code-splitting the portal routes would shrink the first load.

## Not yet checked

- Keyboard navigation and focus styles, contrast, screen-reader pass (WCAG 2.2 AA target).
- Mobile layouts on real devices.
- Lighthouse / Core Web Vitals.

## Metadata (`apps/web/index.html`)

- Present: `<title>`, meta description, `theme-color` `#1a2e26`, SVG favicon (`/favicon.svg`, served 200 in production).
- Missing: Open Graph / Twitter card tags and a share image, canonical URL (`https://www.thornvine.com/`), `robots.txt`, sitemap. Launch acceptance lists "essential metadata/social sharing".

# Roadmap

- **App section:** planning
- **Notion:** https://app.notion.com/p/3eb9d5060068816c95fade2a67b6454c
- **Synced:** 2026-10-22 (review desk dashboard on `hero-glass-and-auth-nav` working tree; Notion roadmap updated)

This is the status view. Task IDs and acceptance stay on the [delivery plan](delivery-plan.md). Do not treat a git commit or a live URL as launch; launch is TV-008 with founder approval.

## Where work is tracked

- **This folder** (`document/`) is the central knowledge base. Notion is the original source and may lag.
- **GitHub Project** [Thornvine](https://github.com/users/casstrevor/projects/2) and repo issues. As of 2026-10-02 the `gh` login used from Cursor has the `project` scope, so the board can be updated from here.
- **Dev notes** in `docs/dev-notes/` record each commit.

## How to read status

- **Planned:** agreed direction, not in git.
- **Implemented:** present on a named branch and commit. Not the same as live.
- **Live:** deployed and reachable at a public URL. Not the same as launched.
- **Verified:** a named check passed. A build does not verify HTTPS, intake, or launch.
- **Blocked:** a concrete cause is named.

## As of 2026-10-22 — review desk, blank guardrails, human intake

- **Implemented—unverified:** on branch `hero-glass-and-auth-nav` commit [`52e178c`](https://github.com/casstrevor/thornvinemain/commit/52e178c). `/newclient/review` is a Review desk with Waiting / Still writing / Decided counts. Empty drafts stay off the default list. Detail is a labeled brief, not JSON. Invite them in. Sidebar selected state is a filled accent pill, no left bar. `/newclient` does not insert a row until the first answer or reference. `intake-turn` runs only for free text, and not again after a demo response. Repo: https://github.com/casstrevor/thornvinemain. Not on `main`, not live.
- **Verified (local + hosted migration):** orchestrator, question-copy, and range-scale tests passed. `tsc -b` and `oxlint` passed (two existing warnings). Headless Edge 1280×900 on http://127.0.0.1:5173/newclient: first paint is the idea question, no JSON; network is `intake_resume` only until First Next, which calls `intake_start` and one `intake-turn`. A chip Next does not call `intake-turn` again. Unsigned `/newclient/review` shows Review desk, no JSON. Supabase MCP applied `20261022160000_intake_resume_and_list_guard.sql` to Thornvine `dzywymkjvfxsbimyxmhu`; function definitions, grants, and blank-draft filtering were checked.
- **Unchanged:** production on `main`.

## As of 2026-10-21 — Our people / Meet the humans

- **Implemented—unverified:** on branch `hero-glass-and-auth-nav`, working tree (no commit). Landing `#people` is a real section: eyebrow Our people, title Meet the humans, Luke and Trevor as equal co-founder cards. No photos and no invented bios (TV-Q004). Repo: https://github.com/casstrevor/thornvinemain. Not on `main`, not live.
- **Verified (local only):** headless Edge 1280×800 on http://127.0.0.1:5173/. Our people href `#people`. Cards Luke / Trevor, both Co-founder, equal width 580. Click scrolls heading into view at y=85. 390px: cards stack, no overflow. `oxlint` and `tsc -b` passed.
- **Unchanged:** production on `main`. "See how it happens" is still missing. TV-004 stays in progress.

## As of 2026-10-21 — design-system topbar brand removed

- **Implemented—unverified:** on branch `hero-glass-and-auth-nav`, working tree (no commit). `/design-system` no longer repeats the Thornvine mark in the page top bar. The app sidebar keeps the brand. The top bar still says Design system. Repo: https://github.com/casstrevor/thornvinemain. Not on `main`, not live.
- **Verified (local only):** Vite serves `DesignSystemPage.tsx` without `ds-topbar__logo` or `LogoMark`; the title “Design system” remains. Headless Edge on http://127.0.0.1:5173/design-system without a session redirects to `/login?next=%2Fdesign-system`. Signed-in layout depends on the live preview.
- **Unchanged:** production on `main`.

## As of 2026-10-21 — slower landing motion

- **Implemented—unverified:** on branch `hero-glass-and-auth-nav`, working tree (no commit). Storytelling motion is slower and settles instead of snapping: `--tv-duration-gentle` 1400ms, `--tv-duration-stagger` 160ms, `--tv-duration-slow` 600ms, `--tv-ease-emphasized` `cubic-bezier(0.33, 0.04, 0.18, 1)`. Hero, services, and closing use `tv-rise-in`. Overlay chip morph uses the longer slow token. Repo: https://github.com/casstrevor/thornvinemain. Not on `main`, not live.
- **Verified (local only):** headless Edge 1280×800 on http://127.0.0.1:5173/. Tokens: gentle 1400ms, stagger 160ms, slow 600ms. Hero bars: duration 1.4s, delays 0 / 0.16 / 0.32 / 0.48 / 0.64s; all opacity 1 after 2.2s. Chip rest 160×160, mid-open 219×550, settled 256×800. Reduced-motion: animation none, opacity 1. 390px: no overflow, duration 1.4s.
- **Unchanged:** production on `main`.

## As of 2026-10-21 — landing canvas leaf layer removed

- **Implemented—unverified:** on branch `hero-glass-and-auth-nav`, working tree (no commit). The Canvas 2D leaf overlay is gone from `/`. Scene tokens (`--tv-layout-scene-*`, `--tv-z-scene`) and the hero-tree pointer shift are gone with it. Hero copy still uses the staggered `tv-rise-in` entrance. TV-Q005 stays open. Repo: https://github.com/casstrevor/thornvinemain. Not on `main`, not live.
- **Verified (local only):** headless Edge 1280×800 on http://127.0.0.1:5173/. `canvas` count 0, `.landing-motion` count 0, no float-leaf images. `.hero-bg` transform stays `none` after pointer move; `--tv-scene-x` is empty. “What we do” still receives the hit. `oxlint` on touched files and `tsc -b` passed.
- **Unchanged:** production on `main`. The looping `<img>` leaves that existed before the canvas are not restored.

## As of 2026-10-21 — account profile edit

- **Implemented—unverified:** on branch `hero-glass-and-auth-nav`, working tree (no commit). `/account` lists Name, Email, Role, and Workspace. **Edit profile** opens a form for `profiles.full_name` (required, max 80). Email, role, and workspace stay read-only. Save is the only burgundy primary; Sign out stays tertiary. The sidebar identity strip shows the saved name when it exists. No new schema. Repo: https://github.com/casstrevor/thornvinemain. Not on `main`, not live.
- **Verified (local only):** `oxlint` on the touched files (existing `auth.tsx` fast-refresh warning only); `tsc -b` passed. Headless Edge on http://127.0.0.1:5173/account without a session still redirects to `/login?next=%2Faccount`. Hosted RLS still has `profiles_update_own`. Signed-in Edit → Save was not exercised in headless (no session).
- **Unchanged:** production on `main`. Password reset is still not built.

## As of 2026-10-21 — account strip under the brand

- **Implemented—unverified:** on branch `hero-glass-and-auth-nav`, working tree (no commit). Signed-in email + Admin sit below the TV mark / “thornvine” and above the sidebar nav links, so the logo is no longer pushed down. Sign in stays at the bottom when signed out. Repo: https://github.com/casstrevor/thornvinemain. Not on `main`, not live.
- **Verified (local only):** source order in `Sidebar` is brand, identity, nav, sign-in. Headless signed-out check on http://127.0.0.1:5173/: first sidebar control is the brand; Sign in remains last. Signed-in `/account` layout depends on a live session in the preview.
- **Unchanged:** production on `main`.

## As of 2026-10-21 — landing canvas motion layer

- **Implemented—unverified:** on branch `hero-glass-and-auth-nav`, working tree (no commit). Full-page Canvas 2D leaf layer on `/` using `leaf.svg` / `leaf-gold.svg`. Budget `--tv-layout-scene-leaf-count` 24 desktop / 8 under `56rem`. Pointer drift on fine hover; scroll quiets and gold-shifts the leaves; `.hero-bg` follows `--tv-scene-x/y`. `pointer-events: none`. Reduced-motion freezes the scene. Hidden tabs cancel the draw loop. No 3D, no new packages. TV-Q005 recommendation. Repo: https://github.com/casstrevor/thornvinemain. Not on `main`, not live.
- **Verified (local only):** headless Edge 1280×800 on http://127.0.0.1:5173/. Canvas `pointer-events: none`, 24 leaves, section `hero`. Chip, “What we do”, and “Tell us your idea” still receive hits. Pointer move: `--tv-scene-x` 4.12px and `.hero-bg` translate. Scroll `#work` / `#contact` updates `data-section`. Reduced-motion: `data-reduced=true`, tracking idle, scene 0. 390px: 8 leaves, idle, no overflow, CTA still hit. `oxlint` on the touched files and `tsc -b` passed.
- **Unchanged:** production on `main`.

## As of 2026-10-21 — overlay chip open motion

- **Implemented—unverified:** on branch `hero-glass-and-auth-nav`, working tree (no commit). The public brand chip morphs into the overlay menu (`--tv-duration-slow` / `--tv-ease-emphasized`) and closes faster (`--tv-duration-base` / `--tv-ease-exit`). Sign in fades and rises after `--tv-duration-stagger`. Reduced-motion skips the morph. Repo: https://github.com/casstrevor/thornvinemain. Not on `main`, not live.
- **Verified (local only):** headless Edge 1280×800 on http://127.0.0.1:5173/. Rest 160×160. ~120ms after hover: 239×686, Sign in opacity 0.37. Settled 256×800, Sign in opacity 1. Leave: mid-close 245×724 then 160×160 with Sign in hidden. Reduced-motion jumps 160×160 → 256×800. 390px still uses the drawer, not the chip. `oxlint src/layout` passed.
- **Unchanged:** production on `main`.

## As of 2026-10-21 — hero copy on-load motion

- **Implemented—unverified:** on branch `hero-glass-and-auth-nav`, working tree (no commit). The five landing hero bars (eyebrow, heading, lede, actions, note) each play `tv-rise-in` on load over `--tv-duration-gentle`, staggered by `--tv-duration-stagger`. `prefers-reduced-motion` shows them still. Repo: https://github.com/casstrevor/thornvinemain. Not on `main`, not live.
- **Verified (local only):** headless Edge 1280×800 on http://127.0.0.1:5173/. ~80ms after paint: eyebrow opacity 0.31 / translateY 12px; later bars still at opacity 0. After 1.4s all five are opacity 1. Reduced-motion: `animation: none`, opacity 1 immediately. 390px: no overflow, bars still stagger in. `oxlint src` 0 errors / 2 existing warnings.
- **Unchanged:** production on `main`.

## As of 2026-10-21 — darker nav pill

- **Implemented—unverified:** on branch `hero-glass-and-auth-nav`, working tree (no commit). `--tv-color-surface-nav` is plum 600 at 90% opacity (was 75%). Repo: https://github.com/casstrevor/thornvinemain. Not on `main`, not live.
- **Verified (local only):** headless Edge 1280×800 on http://127.0.0.1:5173/. `.site-nav` computed background `color(srgb 0.494 0.388 0.467 / 0.9)`, text white.
- **Unchanged:** production on `main`.

## As of 2026-10-21 — new-client header vs chip

- **Implemented—unverified:** on branch `hero-glass-and-auth-nav`, working tree (no commit). Wide `/newclient` reserves `--tv-layout-brand-chip-size` in the intake header so the overlay chip does not cover Save and exit, Introduction, or the question. The in-page wordmark hides while the chip is showing. Repo: https://github.com/casstrevor/thornvinemain. Not on `main`, not live.
- **Verified (local only):** headless Edge on http://127.0.0.1:5173/newclient. 1464×900 and 1280×800: chip 158×158; Save and exit, Introduction, and the heading do not intersect it. 390px uses the top bar, no overlay. `oxlint` on the touched files and `tsc -b` passed.
- **Unchanged:** production on `main`.

## As of 2026-10-21 — chip hover

- **Implemented—unverified:** on branch `hero-glass-and-auth-nav`, working tree (no commit). Hovering the collapsed public brand chip opens the overlay menu; leaving it collapses after `--tv-duration-fast`. Touch and docked/narrow layouts stay click-to-open. Repo: https://github.com/casstrevor/thornvinemain. Not on `main`, not live.
- **Verified (local only):** headless Edge 1280×800 on http://127.0.0.1:5173/. Resting chip 158×158, `aria-expanded=false`. Pointer enter: 256×800 overlay, Sign in visible, `aria-expanded=true`. Pointer leave: back to 158×158. 390px still uses the top bar, not the chip. `oxlint src/layout` and `tsc -b` passed.
- **Unchanged:** production on `main`.

## As of 2026-10-21

- **Implemented—unverified:** on branch `hero-glass-and-auth-nav`, working tree (no commit). Narrow screens (`56rem` and below) pin the shell top bar (menu + TV mark + “thornvine”) above the page and keep the plum landing pill (What we do / Our work / Our people) visible, wrapping if needed. In-page section links clear the sticky bar. The login, new-client, and portal page wordmarks hide at that width so the bar is the only brand. Wide screens still use the collapsed chip plus centered pill. Repo: https://github.com/casstrevor/thornvinemain. Not on `main`, not live.
- **Verified (local only):** headless Edge at 390×844, 768×1024, and 1280×800 on http://127.0.0.1:5173/. Phone: bar at y=0 (63px), pill visible below it, no horizontal overflow, hero copy starts at 167px. Drawer opens and the close control stays on the bar; “What we do” scrolls `#what-we-do` to 72px (below the bar). Login at 390px shows the same bar and hides the in-card wordmark. Desktop: bar hidden, chip and pill still present. `/account` without a session redirects to `/login` with the same bar. `oxlint src` 0 errors / 2 existing warnings; `tsc -b` passed. Not run: real devices, signed-in portal at 390px, production.
- **Unchanged:** production on `main`.

## As of 2026-10-20

- **Implemented—unverified:** on branch `sidebar-menu`, working tree (no commit). Wide-screen sidebar hides until selected: collapsed state shows only the TV mark and “thornvine”; click the chip to overlay the full menu; click outside, Escape, or a nav link hides it. Mobile drawer is unchanged. Landing header nav pill is plum `#7E6377` at 75% opacity (`--tv-color-surface-nav`) with white link text (`--tv-color-text-on-nav`). Sidebar Sign out button removed (Trevor); signed-in email and Admin sit in a boxed account strip above the logo and link to `/account`. That page is a signed-in profile (name, email, role, workspace) with Sign out. Authorized by Trevor. Not on `main`, not live.
- **Verified (local only):** 1280×800 collapsed chip, expand, click-outside collapse, Escape, navigate to `/design-system` (menu closed after the link). Emulated 390px hamburger opens the drawer. Header nav computed background `#7E6377` at 75% alpha, text `rgb(255, 255, 255)`. Sidebar account strip sits above the logo (email + Admin, no Sign out) and opens `/account` for `casstrevor@gmail.com` (Admin, workspace Thornvine, current strip highlight). Collapsed chip still shows only brand. `oxlint` 0 errors / 2 existing warnings; `VITE_BASE_PATH=/` production build passed.
- **Unchanged:** production on `main`; Notion roadmap not updated (MCP needs auth).

## As of 2026-10-07

- **Implemented:** Stage 1 conversation at `/newclient` and staff review at `/newclient/review` on branch `new-client-system-v1`. Not on `main` and not live. See [Stage 1](../intake/stage-1.md).
- **Verified:** orchestrator and question-copy tests, `tsc -b`, and `oxlint` passed. A fresh headless Edge profile saved turns from the idea through “What's this for?”, then Back, Next, and a second Back. `supabase db push --linked` applied `20261007143000_new_client_stage1.sql` and `20261007163000_intake_remove_reference.sql` to Thornvine `dzywymkjvfxsbimyxmhu`. The intake tables have row level security on, and bucket `intake-references` is private. This is not a public launch check.

## As of 2026-10-06

- **Implemented—unverified:** client system v1 first slice on branch `new-client-system-v1`. Admins can create a client, project, and update in `/clientportal`. See [new client system v1](../portal/new-client-system-v1.md). Direction TV-D009. `oxlint` and `tsc -b` passed. Signed-in save was not run. Not on `main`.
- **Verified:** none for this slice.
- **Unchanged:** the live portal on `main` and the 2026-10-02 production facts below.

## As of 2026-10-02, 22:40 America/Chicago

Repository [casstrevor/thornvinemain](https://github.com/casstrevor/thornvinemain) (public).

- `main` is `f609433`, the merge of [PR #10](https://github.com/casstrevor/thornvinemain/pull/10) (`authentication` → `main`). It contains landing page v2, the client portal, the portal migration, the `document/` knowledge base, and `VITE_BASE_PATH=/`.
- `authentication` (`a778682`) is fully merged. New work should branch from `main`.
- Hosted Supabase has migration `20260930044500_portal_core` applied.

## Now

- **Live:** https://www.thornvine.com serves landing page v2 from `main` `f609433`. `/login` and `/clientportal` are live (served through the SPA `404.html` fallback).
- **Verified (2026-10-02):**
  - `pnpm lint` (0 errors, 1 warning) and `VITE_BASE_PATH=/ pnpm build` passed locally on `a778682`.
  - Actions run [36960290404](https://github.com/casstrevor/thornvinemain/actions/runs/36960290404) built and deployed `f609433` (first successful deploy).
  - `curl` on `http://` and `https://www.thornvine.com/` returned 200 with the v2 title. The deployed bundle contains the Supabase project URL, so the Actions secrets were picked up.
  - The browser rendered `https://www.thornvine.com/login` with the sign-in form.
  - Pages API: `cname: www.thornvine.com`, certificate `approved` for `www.thornvine.com` (expires 2026-12-30, auto-renews), `https_enforced: true`. `http://www.thornvine.com/` returns 301 to HTTPS.
  - Docs deploy run 36960867938 (`77193ae`, PR #12) succeeded.
  - GitHub Project board updated from Cursor: #6, #8, #9, #11 Done; #7 In Progress.
- **Blocked:**
  - **Apex `thornvine.com`** returns GitHub "Site not found" (404) over HTTP and fails TLS over HTTPS. Cause: GoDaddy A records `76.223.105.230` and `13.248.243.5` still sit next to GitHub's four. GitHub will not configure the apex → www redirect or include the apex in the certificate until only GitHub's records remain. Resolver: Luke or Trevor in GoDaddy DNS.
  - **Contact email**: the only conversion on the site is `mailto:hello@thornvine.com`, and `thornvine.com` has no MX records, so those emails bounce. Resolver: decide an email provider (TV-Q003), or swap the CTA to a working destination.
  - **Project brief intake** (TV-006): destination undecided (TV-Q002).

## Milestones

| Milestone | Status | What it takes |
|-----------|--------|----------------|
| M0 Foundation | In progress | TV-001. Engineering baseline is now filled from inspected files (see [engineering](../platform/engineering.md)); remaining: tests (none exist) and a recorded accessibility/performance pass. |
| M1 Story and visual direction | In progress | TV-002 and TV-003. A v2 visual direction is built and live; founder bios, asset rights, and contact destinations are still open. |
| M2 Usable landing page | In progress | TV-004 and TV-005. Live on `main` with 4 of 6 sections. Working tree has Meet the humans (5 of 6). CTA is a dead email on production. See [site as built](../site/implementation.md). |
| M3 Acquisition path | Blocked | TV-006 and TV-007. Brief destination, email, and booking are undecided. The portal is not the intake form. |
| M4 Public launch | Blocked | TV-008. Site is reachable on www with HTTPS. Apex is broken, contact is broken, founder release approval is not recorded. |

## Sequence

1. **GoDaddy:** delete A records `76.223.105.230` and `13.248.243.5` for `@`. Wait until `dig +short A thornvine.com` shows only `185.199.108.153`–`185.199.111.153`. GitHub then adds the apex to the certificate and redirects `thornvine.com` → `www.thornvine.com`.
2. **Email:** pick a provider for `@thornvine.com` (for example Google Workspace, Fastmail, or GoDaddy email forwarding) and add its MX/SPF records, or point the CTA at an address that already works. Until then the site has no working contact path.
3. **Intake (TV-006):** decide where briefs go, then build the brief form and replace the `mailto:` CTA.
4. **Content (TV-002 / TV-007):** founder photos and bios (TV-Q004), "How it happens", outbound links for OVRmaps / Wyldtracks. Meet the humans is on `hero-glass-and-auth-nav` without photos.
5. **Hardening:** Supabase advisor warnings (see [Supabase](../platform/supabase.md)), leaked-password protection, image weight (3.8 MB of JPGs).
6. **TV-008:** launch checks and a named founder approval before calling the site launched.

## History

- **2026-09-30:** first Pages deploy (run 36671163359, `main` `8620c02`) built but failed to deploy; Pages source was not GitHub Actions yet.
- **2026-10-01:** landing v2 + portal pushed to `authentication` `91b5813`. Custom domain saved as `thornvine.com`, HTTPS off.
- **2026-10-02:** `document/` added (`a778682`). Actions secrets `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` added. Pages custom domain changed to `www.thornvine.com`. PR #10 merged to `main` (`f609433`), deployed, HTTPS enforced.

# Decisions, questions, and risks

- **App section:** planning
- **Notion:** https://app.notion.com/p/3eb9d50600688137ba3df67969ed4ef1
- **Synced:** 2026-10-21 (nav pill darkened)

## Recorded direction

### TV-D001 — Shared project source of truth

Status: Decided. Source: Luke, 2026-09-29.

Use the Thornvine Notion hub for product/project coordination. Cursor contributes codebase evidence; ChatGPT supports product management.

### TV-D002 — Agency positioning and visual direction

Status: Direction supplied. Source: Luke's brief, 2026-09-29.

Human-centered creative product agency. Full-stack product development leads. Warm/light hero, sculptural tree, botanical motion, deep woodland progression. Exact copy, assets, tokens, and implementation remain reviewable drafts.

App area: site.

### TV-D003 — Primary conversion

Status: Decided. Source: Luke's brief, 2026-09-29.

"Tell us your idea" opens a short project brief. Free call and email are alternatives.

App area: site.

### TV-D004 — Initial product boundary

Status: PM proposal.

Deliver the agency landing page and intake. No client portal, billing, CMS, CRM, or AI chatbot unless a later scope decision adds them.

App area: site and portal. See [portal scope](../portal/scope.md).

Implementation note, 2026-10-02: the portal shipped to production anyway when `authentication` was merged (PR #10). That is an implementation fact, not a decision. See TV-Q006.

### TV-D005 — Shared founders and ownership

Status: Decided. Source: Luke's clarification, 2026-09-29.

Thornvine is jointly founded by Luke and Trevor. Give both equal brand prominence and shared product ownership across planning, content, and engineering handoffs. Do not default responsibilities or approvals to Luke alone. Individual role splits and Trevor's full bio remain unconfirmed.

### TV-D006 — Public host

Status: Decided. Source: product direction in Cursor, 2026-10-01.

Host the site at www.thornvine.com. DNS registrar is GoDaddy. Deployment stays GitHub Pages. Apex thornvine.com redirects to www. Email and booking destinations are still open.

App area: platform. See [hosting](../platform/hosting.md).

Implementation, 2026-10-02: Pages custom domain set to `www.thornvine.com`, certificate issued, HTTPS enforced, site live from `main` `f609433`. Apex redirect blocked by two leftover GoDaddy A records.

### TV-D007 — Repo `document/` is the central knowledge base

Status: Decided. Source: Trevor, 2026-10-02 ("this is the central project knowledge base"; "it is okay to drift, update documentation as we go; document as much detail as possible").

`document/` holds the current product, engineering, and operations facts. Notion remains a coordination space and may lag; reconcile when they differ, newest dated entry wins. Every behavior, hosting, schema, or scope change updates the matching `document/` file alongside its dev note.

App area: all.

### TV-D008 — Publish `authentication` to production

Status: Decided. Source: Trevor, 2026-10-02 ("publish merge and get our product to where Notion states").

Merge `authentication` into `main` and deploy to www.thornvine.com, including the portal code. Done via PR #10 (`f609433`), deploy run 36960290404. Does not by itself decide portal scope (TV-Q006) or constitute launch (TV-008).

App area: site, portal, platform.

### TV-D010 — Stage 1 new-client conversation

Status: Direction for branch `new-client-system-v1`. Source: Trevor, 2026-10-07.

`/newclient` is an unlisted link, not a public button. Stage 1 gathers enough context for a human to invite deeper discovery. It does not accept a build. Staff review is `/newclient/review`. See [Stage 1](../intake/stage-1.md).

App area: intake.

### TV-D009 — Client system v1 extends the live portal

Status: Direction for branch `new-client-system-v1`. Source: Trevor, 2026-10-07 ("lets now start the project").

Keep `/login` and `/clientportal`, the existing roles, and the existing tables. The first slice is an admin-only form to create a client, a project, and a project update. Invites, files, password reset, email, billing, and public intake stay out. This does not close TV-Q006 and does not deploy.

App area: portal. See [new client system v1](../portal/new-client-system-v1.md).

### TV-D011 — Left sidebar on every page, links gated by role

Status: Direction for branch `new-client-system-v1`. Source: Trevor, 2026-10-13 ("Add a sidebar menu on the lefthand side"; chose every page, role-gated links).

Every route renders inside an app shell with a left sidebar. Everyone sees Client portal. Signed-out visitors see Sign in in the sidebar. Admins also see Review desk and Design system. Below 56rem the sidebar becomes a drawer behind a menu button.

Implementation note, 2026-10-20 (Trevor: hide the sidebar when not selected; minimized state shows only the logo and name): on wide screens the menu starts collapsed to a brand chip. Click the chip to overlay the full menu; click outside, press Escape, or follow a link to hide it again. The `/design-system` route is on `sidebar-menu` after the main merge.

Implementation note, 2026-10-21 (Trevor: create an Our people page): landing `#people` is "Meet the humans" with Luke and Trevor as equal co-founder cards. No founder photos and no individual bios until TV-Q004. Local check on http://127.0.0.1:5173/: Our people scrolls to the heading; cards match in width. Working tree on `hero-glass-and-auth-nav`. Not on `main`. Not live.

Implementation note, 2026-10-21 (Trevor: the design-system topbar brand is redundant with the left panel): `/design-system` no longer shows the Thornvine mark or wordmark in its page header. The app sidebar is the brand. The header still names the Design system. Working tree on `hero-glass-and-auth-nav`. Not on `main`. Not live.

Implementation note, 2026-10-20 (Trevor: remove the sidebar Sign out button): signed-in account in the sidebar is email and Admin badge only. Sign out remains on the portal and design-system headers.

Implementation note, 2026-10-20 (Trevor: make email and Admin a container above the logo): signed-in identity sits in a boxed account strip at the top of the expanded sidebar, above the brand. It stays hidden when the sidebar is collapsed. Open follow-ups: whether the public landing page and `/newclient` should keep the sidebar for launch, and whether those page-level Sign out controls should stay.

Implementation note, 2026-10-20 (Trevor: selecting the account strip should open our own account/profile): the strip is a link to `/account` (`RequireAuth`). That page shows name, email, role, and workspace, with Sign out.

Implementation note, 2026-10-21 (Trevor: make `/account` proper profile information with an edit option): Name is editable via existing `profiles.full_name` and `profiles_update_own`. Email, role, and workspace stay read-only. Password reset is still not built. Working tree on `hero-glass-and-auth-nav`. Not on `main`. Not live.

Implementation note, 2026-10-20 (Trevor: move Sign in to the bottom of the menu; remove Client portal from the sidebar and from the landing header): signed-out Sign in sits at the bottom of the expanded sidebar. The signed-in account strip stays above the logo. Client portal is not a sidebar link and not a header pill link. `/login` and `/clientportal` stay reachable by URL. The login heading is "Sign in", and the lede says "thornvine" in lowercase.

Implementation note, 2026-10-20 (Trevor: "Tell us your idea" opens the new-client page): both landing buttons go to `/newclient`. Local check on http://localhost:5173/ opened that page. Not on `main`. Not live. Production still uses `#contact` on the hero and `mailto:hello@thornvine.com` on the closing button.

Implementation note, 2026-10-20 (Trevor: glassmorphism on the selected Tell us your idea buttons): both landing primary buttons use a frosted burgundy fill, backdrop blur, and a light rim. Login, admin, and other `.btn--primary` controls stay solid. Local check on http://localhost:5173/: hero button shows the pale photo through the glass; closing button sits on the dark foliage and stays darker. Not on `main`. Not live.

Implementation note, 2026-10-20 (Trevor: same glass on the brand chip and the full side menu): the collapsed brand chip and the expanded sidebar use a frosted cream surface, the same blur, and a light rim. Local check on http://localhost:5173/: collapsed chip is frosted over the hero; the open menu (account, New-client review, Design system) uses the same glass. Not on `main`. Not live.

Implementation note, 2026-10-20 (Trevor: put the brand back on public pages the way it was): `/`, `/login`, and `/newclient` show the collapsed brand chip again. Authenticated pages still keep the mark in the navigation so it does not cover the page: a docked side column on wide screens, and the top bar on narrow screens. Not on `main`. Not live.

Implementation note, 2026-10-21 (narrow landing chrome): under `56rem` the shell top bar is pinned above the page and the plum section pill stays visible. Page-level wordmarks on `/login`, `/newclient`, and `/clientportal` hide at that width. Local check on http://127.0.0.1:5173/ at 390px, 768px, and 1280px. Working tree on `hero-glass-and-auth-nav`. Not on `main`. Not live.

Implementation note, 2026-10-21 (open the brand chip on hover): on wide public pages, hovering the collapsed TV chip opens the overlay menu; leaving it closes it. Click, Escape, and click-outside still work. Touch, docked signed-in nav, and the narrow drawer are unchanged. Local check on http://127.0.0.1:5173/ at 1280×800. Working tree on `hero-glass-and-auth-nav`. Not on `main`. Not live.

Implementation note, 2026-10-21 (sleek chip open motion): the overlay chip grows into the menu with `--tv-duration-slow` and `--tv-ease-emphasized`, and eases back with `--tv-duration-base` and `--tv-ease-exit`. Sign in fades up after `--tv-duration-stagger`. Reduced-motion shows the still states. Local check on http://127.0.0.1:5173/ at 1280×800 and 390×844. Working tree on `hero-glass-and-auth-nav`. Not on `main`. Not live.

Implementation note, 2026-10-21 (chip must not cover the new-client header): on wide `/newclient`, the intake header keeps a chip-sized inset so Save and exit, Introduction, and Saved sit beside the overlay chip instead of under it. The in-page “thornvine” wordmark hides whenever that chip is showing. Local check on http://127.0.0.1:5173/newclient at 1464px, 1280px, and 390px. Working tree on `hero-glass-and-auth-nav`. Not on `main`. Not live.

Implementation note, 2026-10-21 (darker landing nav pill): `--tv-color-surface-nav` is plum `#7E6377` at 90% opacity (was 75%). Local check on http://127.0.0.1:5173/: computed background alpha 0.9, white link text. Working tree on `hero-glass-and-auth-nav`. Not on `main`. Not live.

Implementation note, 2026-10-21 (hero copy on-load motion): the five frosted hero bars rise in on load with `tv-rise-in`, `--tv-duration-gentle`, and `--tv-duration-stagger`. Reduced-motion skips the entrance. Local check on http://127.0.0.1:5173/ at 1280×800 and 390×844. Working tree on `hero-glass-and-auth-nav`. Not on `main`. Not live.

Implementation note, 2026-10-21 (Trevor: slow the animations; they should feel more motion-graphic): `--tv-duration-gentle` is 1400ms, `--tv-duration-stagger` is 160ms, `--tv-duration-slow` is 600ms, and `--tv-ease-emphasized` settles (`cubic-bezier(0.33, 0.04, 0.18, 1)`). Hero, services, and closing share `tv-rise-in`. Overlay chip morph uses the longer slow token. Local check on http://127.0.0.1:5173/ at 1280×800 and 390×844. Working tree on `hero-glass-and-auth-nav`. Not on `main`. Not live.

Implementation note, 2026-10-21 (landing canvas motion layer / TV-Q005 recommendation): one Canvas 2D overlay on `/`, existing leaf SVGs, ≤24 leaves desktop and ≤8 under `56rem`, no 3D and no extra libraries. Pointer drift, scroll tint, subtle tree shift, reduced-motion still scene. Local check on http://127.0.0.1:5173/ at 1280×800 and 390×844. Working tree on `hero-glass-and-auth-nav`. Not on `main`. Not live.

Implementation note, 2026-10-21 (Trevor: remove the animated leaf layer): the Canvas 2D overlay, scene tokens, and hero-tree pointer shift are gone. Hero copy still uses the staggered `tv-rise-in` entrance. The looping `<img>` leaves that existed before the canvas are not restored. TV-Q005 stays open. Local check on http://127.0.0.1:5173/ at 1280×800: no canvas, nav still clickable. Working tree on `hero-glass-and-auth-nav`. Not on `main`. Not live.

Implementation note, 2026-10-21 (Trevor: account strip below thornvine): signed-in email and Admin sit under the brand and above the sidebar buttons. The logo is no longer pushed down the docked column. Sign in stays at the bottom when signed out. Working tree on `hero-glass-and-auth-nav`. Not on `main`. Not live.

Implementation note, 2026-10-22 (Luke: redesign the review desk, stop blank drafts, use AI only when necessary, no JSON on the intake views): `/newclient/review` is a dashboard with Waiting / Still writing / Decided. Empty unwritten drafts are hidden. The client canvas does not insert a row until the first answer or reference. `intake-turn` is only for free-text turns. Staff and client views use labeled copy, not JSON. The selected sidebar item is a filled accent pill with no left bar. Authorized by Luke. Working tree on `hero-glass-and-auth-nav`. Not on `main`. Not live.

Implementation note, 2026-10-20 (Trevor: center the hero copy with the top options): the eyebrow, heading, lede, both actions, and the consultation note are center-aligned on the same axis as What we do / Our work / Our people. Local check on http://localhost:5173/: those lines and the nav share one center. On a 390px-wide viewport the same lines stay centered and the actions stack. Not on `main`. Not live.

Implementation note, 2026-10-20 (Trevor: separate background objects on the hero lines, like the top bar): the eyebrow, heading, lede, action row, and consultation note each sit on their own frosted bar. Local check on http://localhost:5173/: five separate bars, centered, with the headline still reading "Your / imagination. / Let's make it real." On a 390px-wide viewport the bars stay inside the screen and the actions stack inside one bar. Not on `main`. Not live.

App area: site, portal, intake.

### TV-D012 — Official logo is the thorny TV monogram

Status: Decided. Source: Trevor, 2026-10-17 (supplied `thornvine-tv-logo-HD` and asked to use it as the main / official logo).

The official brand mark is the thorny vine TV monogram. It replaces the previous leaf SVG mark. Assets live under `apps/web/public/images/logo.png` (and inverse). UI renders it through `LogoMark`. Favicon updated to match. Does not by itself close the rest of TV-Q004 (founder photos, portfolio assets).

Updated 2026-10-20 (Trevor): replaced with the cleaner TV monogram from `thornvine_logo.png`. Same asset paths.

App area: site, brand.

### TV-D013 — Poppins is the site typeface

Status: Decided. Source: Trevor, 2026-10-17 ("Update all font to be Poppins" with `Poppins.zip`).

Display and body both use Poppins. Fonts are self-hosted from `apps/web/public/fonts/poppins/` under the SIL OFL. `--tv-font-display` and `--tv-font-body` point at Poppins; Google Fonts for Sora and DM Sans are removed. Resolves the typography half of TV-Q007; the hero eyebrow copy question remains open.

App area: site, brand.

## Open questions

- TV-Q001 — Deadline anchor: confirm 90 days from 2026-09-29; provisional target 2026-12-28. Owner: Luke and Trevor. Needed for calendar commitment.
- TV-Q002 — Where do project briefs go, who receives them, and what retention/response process applies? Owner: Luke and Trevor with Cursor recommendation. Blocks TV-006 delivery integration. App area: site.
- TV-Q003 — Email and booking destination? Domain and host are decided in TV-D006. Owner: Luke and Trevor. Blocks launch/contact completion. App area: site.
- TV-Q004 — Founder identities/bios/photos, approved experience wording, portfolio roles/URLs, logo and visual assets? Owner: Luke and Trevor. Blocks final public content. App area: site.
- TV-Q005 — Scene implementation and asset/performance budget? Cursor recommendation (2026-10-21): Canvas 2D, existing leaf SVGs, ≤24 / ≤8 leaves, no 3D. That overlay was removed the same day at Trevor’s request. Owner: Luke and Trevor. App area: site.
- TV-Q006 — The client portal is live in production (2026-10-02). Is it in launch scope, and if so what is its acceptance (admin UI, file uploads, password reset)? If not, should `/login` stay public? Owner: Luke and Trevor. App area: portal.
- TV-Q007 — Hero copy only (typography decided in TV-D013 as Poppins): the built site eyebrow is "Human ideas. Digital possibilities."; the brief says "Creative product agency". Which is intended? Owner: Luke and Trevor. App area: site.
- TV-Q008 — Urgent: `hello@thornvine.com` is the live site's only contact, and the domain has no MX records, so mail bounces. Which email provider, and until then should the CTA point somewhere that works? Owner: Luke and Trevor. Part of TV-Q003. App area: site, platform.
- TV-Q009 — What is the new client system v1, and does it replace, extend, or sit beside the live portal? Working answer on this branch: extend (TV-D009, Trevor, 2026-10-07). Luke has not separately confirmed. Does not answer TV-Q006. App area: portal.

## Risks and responses

- Decorative 3D slows the page or hides the offering: build the readable core first; static fallback; mobile and motion checks.
- Code and Notion drift: dated evidence tied to commits; fetch before updates; reconcile each handoff.
- Intake appears successful but loses leads: verify delivery, loading/failure states, and post-deployment smoke test.
- Portfolio or copy overstates experience: confirm actual contributions and label concepts.
- Scope expands into agency operations software: record additions explicitly with impact on delivery.
- Missing content stalls release: track inputs early; separate implementation readiness from content approval.
- Live site loses leads (realized 2026-10-02): the public CTA mails a domain with no MX. Response: TV-Q008, then TV-006.
- Portal is public before it is scoped: invite-only auth and RLS limit exposure; Supabase advisor warnings and leaked-password protection tracked in [Supabase](../platform/supabase.md).

## Decision record format

ID; question; status (Proposed/Decided/Superseded); options; recommendation; rationale; product/delivery impact; decision maker/source/date; affected task IDs. Preserve superseded decisions and link replacements.

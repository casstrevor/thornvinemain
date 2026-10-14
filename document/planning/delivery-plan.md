# Delivery plan and task register

- **App section:** planning
- **Notion:** https://app.notion.com/p/3eb9d506006881c388c3d5c7d4433656
- **Synced:** 2026-10-07

## Handoff 2026-10-07 audit

Stage 1 is on branch `new-client-system-v1` with `/newclient` and `/newclient/review`. Both intake migrations were applied to hosted Thornvine earlier that day. Orchestrator tests, question-copy tests, `tsc -b`, and `oxlint` passed. A fresh headless profile exercised Next and Back. No TV task status changed. Not merged to `main`.

## Handoff 2026-10-07 later

Stage 1 new-client conversation was in the working tree on `new-client-system-v1`: `/newclient` and `/newclient/review`. The “migration not applied” line in this handoff was superseded the same day by `supabase db push --linked`. No TV task status changed.

## Handoff 2026-10-07

Client system v1 started on local branch `new-client-system-v1`. First slice is the admin Workspace setup panel (`apps/web/src/pages/AdminWorkspace.tsx`). No TV task status changed. TV-D009 is branch direction from Trevor. Signed-in create flow is not verified. Working tree only; no commit.

## Handoff 2026-10-06

Branch `new-client-system-v1` was cut from `main` `e2a0be3`. Foundational documentation is in [new client system v1](../portal/new-client-system-v1.md). No TV task status changed. TV-Q009 is open. Implementation has not started. Working tree only; no commit.

## Current focus

**Site is live at https://www.thornvine.com (`main` `f609433`) with HTTPS. Next: a working contact path, then the apex DNS cleanup.** The only CTA mails `hello@thornvine.com`, which bounces (no MX). The apex `thornvine.com` returns 404 until two GoDaddy A records are deleted. See the [roadmap](roadmap.md).

Separate from that launch path: client system v1 and Stage 1 are on branch `new-client-system-v1`. They are not on `main` and not a delivery-plan task yet.

Task owners below indicate a working role, not a Notion person assignment.

## Milestones

- M0 — Foundation understood: TV-001 baseline and reusable architecture recorded.
- M1 — Story and visual direction ready: TV-002 and TV-003 reviewed.
- M2 — Usable landing page: TV-004 and TV-005 demonstrated.
- M3 — Working acquisition path: TV-006 and TV-007 verified.
- M4 — Public launch: TV-008 reviewed and released; observe genuine leads toward the 90-day goal.

## TV-001 — Inspect repository and publish baseline

Status: In progress. Priority: P0. Owner: Cursor. Dependencies: repo access.

Acceptance: engineering page populated from inspected files; repo/branch/commit recorded; existing relevant safe checks run with results or reasons not run; scaffold and working features distinguished; smallest next implementation slice proposed.

Evidence so far: repo `casstrevor/thornvinemain`. 2026-10-02: baseline filled on the [engineering page](../platform/engineering.md) from `main` `f609433` — workspace map, toolchain, scripts, lint/build/deploy results, scaffold vs working, next slices. Remaining for acceptance: no tests exist to run; accessibility and performance checks not yet run.

App area: platform.

## TV-002 — Confirm content and asset inputs

Status: Not started. Priority: P1. Owner: Luke + Trevor + ChatGPT. Dependencies: none.

Acceptance: working hero/services/process copy reviewed; founder and portfolio details substantiated; missing media and contact destinations explicitly tracked; image/asset rights confirmed for launch.

App area: site.

## TV-003 — Define responsive design foundation and scene approach

Status: Not started. Priority: P1. Owner: Cursor + Luke and Trevor review. Dependencies: TV-001; brand brief.

Acceptance: reuse existing architecture; tokens/primitives and desktop/mobile composition proposed; lightweight static scene fallback demonstrated; motion and asset budgets proposed; direction reviewed before extensive scene work.

App area: site.

## TV-004 — Build core landing-page narrative

Status: In progress. Priority: P1. Owner: Cursor. Dependencies: TV-002 working copy, TV-003.

Acceptance: six responsive sections, shared components, consistent brief CTA, keyboard navigation; incomplete assets clearly tracked and not misrepresented as final.

Evidence so far: landing v2 is live on `main` `f609433` at https://www.thornvine.com. Four of six sections exist; "Meet the humans" and "How it happens" are missing; CTAs end at a bouncing `mailto:`; keyboard navigation not checked. Gap list: [site as built](../site/implementation.md). Not complete.

App area: site.

## TV-005 — Add botanical scene and restrained motion

Status: Not started. Priority: P2. Owner: Cursor. Dependencies: TV-003, TV-004.

Acceptance: tree/right and copy/left composition; scene does not obscure or intercept controls; reduced-motion/mobile/static fallbacks; measured performance and asset sizes documented. Decorative ambition must not block a functional core.

App area: site.

## TV-006 — Implement and verify project-brief intake

Status: Blocked—destination decision pending. Priority: P1. Owner: Cursor. Dependencies: TV-001 and intake destination decision.

Acceptance: scoped fields and UI states; server-side validation and abuse protection; no exposed secrets; delivery verification with a labeled test brief; failure/retry behavior; agreed handling of personal data.

App area: site. This is not the client portal.

## TV-007 — Populate proof and contact destinations

Status: Blocked—content and destinations pending. Priority: P1. Owner: Luke + Trevor + Cursor. Dependencies: TV-002.

Acceptance: real founder material, truthful portfolio roles, approved links, real email and booking destination; no invented proof or dead placeholder links in public release.

App area: site.

## TV-008 — Run launch checks and publish approved release

Status: Not started. Priority: P1. Owner: Cursor + founder release decision (Luke/Trevor). Dependencies: TV-004 through TV-007 and launch acceptance.

Acceptance: launch checklist evidence, outstanding risks, production configuration, rollback plan, named founder approval, release URL and commit, post-deployment intake smoke check recorded. Break into 1–2 day child tasks after baseline.

Evidence so far (2026-10-02): production configuration and rollback plan documented in [hosting](../platform/hosting.md); release URL https://www.thornvine.com at `f609433`. Still open: apex domain, intake smoke check (no intake), founder approval. Being reachable is not launch.

App area: platform and site.

## Task rules

Update these canonical records in place. Add child tasks only when needed; retain TV IDs and link evidence. Start a task only when its dependencies permit. Mark completed only when acceptance is satisfied, with evidence. Use Blocked with a concrete cause and next resolver.

## Handoff log

### 2026-09-29 — Founder representation correction

Luke clarified that Thornvine is shared with Trevor. Hub ownership, brand representation, review responsibilities, launch wording, and Cursor's collaboration contract now include both founders. Existing historical source attribution remains intact. This is a planning/content correction, not repository implementation evidence.

### 2026-09-29 — PM setup

Brand brief, scope, acceptance, engineering contract, delivery tasks, and decision log established from Luke's supplied direction. No repository inspection or implementation claimed. Next handoff: Cursor completes TV-001.

### 2026-09-30 — Roadmap and Pages evidence

Cursor created the Roadmap and recorded GitHub Pages status. Implemented: `.github/workflows/deploy.yml` on `main` commit `8620c02`. Verified: Actions run 36671163359, `pnpm build` passed. Blocked at that time: deploy, Pages source was not GitHub Actions. Uncommitted local landing and portal edits were not shipped yet. TV-004, TV-006, and TV-008 stayed open.

### 2026-10-02 — Roadmap refreshed

GitHub Project Thornvine already exists. Cursor cannot edit it with the current token. Notion stays the working board. `authentication` `91b5813` is pushed with the landing, portal, and base path `/`. Pages custom domain is `thornvine.com`. HTTPS is blocked by leftover GoDaddy A records. TV-001 and TV-004 are in progress, not complete. TV-006 and TV-008 stay blocked.

### 2026-10-02 — Published to production (Cursor, on Trevor's instruction)

Tasks: TV-001, TV-004, TV-008. Decisions: TV-D007, TV-D008.

- Verified locally on `a778682`: `pnpm install --frozen-lockfile`, `pnpm lint` (0 errors, 1 warning), `VITE_BASE_PATH=/ pnpm build`.
- Added Actions secrets `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
- Pages custom domain changed `thornvine.com` → `www.thornvine.com` (TV-D006). Certificate approved for www; Enforce HTTPS on.
- [PR #10](https://github.com/casstrevor/thornvinemain/pull/10) merged `authentication` → `main` as `f609433`. Deploy run 36960290404 succeeded (first successful deploy).
- Smoke test: `/` and `/login` render on https://www.thornvine.com; bundle contains the Supabase URL.
- Granted `thornvine_admin` to `casstrevor@gmail.com` in hosted Supabase.
- Found: apex 404 (GoDaddy A records), no MX for `thornvine.com` (CTA bounces), 5 Supabase security warnings, 3.8 MB images, 492 KB JS.
- Docs: `document/` declared central knowledge base; roadmap, hosting, engineering baseline, portal, decisions rewritten; new `platform/supabase.md` and `site/implementation.md`.
- Not done: Notion pages (MCP needs sign-in), GoDaddy changes (no access), email setup (needs a decision).
- Next: TV-Q008 email/contact, apex DNS, then TV-006 intake.

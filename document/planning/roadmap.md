# Roadmap

- **App section:** planning
- **Notion:** https://app.notion.com/p/3eb9d5060068816c95fade2a67b6454c
- **Synced:** 2026-10-02 (repo copy updated after the production publish; Notion not yet updated)

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
  - Pages API: `cname: www.thornvine.com`, certificate `approved` for `www.thornvine.com` (expires 2026-12-30, auto-renews), `https_enforced: true`.
- **Blocked:**
  - **Apex `thornvine.com`** returns GitHub "Site not found" (404) over HTTP and fails TLS over HTTPS. Cause: GoDaddy A records `76.223.105.230` and `13.248.243.5` still sit next to GitHub's four. GitHub will not configure the apex → www redirect or include the apex in the certificate until only GitHub's records remain. Resolver: Luke or Trevor in GoDaddy DNS.
  - **Contact email**: the only conversion on the site is `mailto:hello@thornvine.com`, and `thornvine.com` has no MX records, so those emails bounce. Resolver: decide an email provider (TV-Q003), or swap the CTA to a working destination.
  - **Project brief intake** (TV-006): destination undecided (TV-Q002).

## Milestones

| Milestone | Status | What it takes |
|-----------|--------|----------------|
| M0 Foundation | In progress | TV-001. Engineering baseline is now filled from inspected files (see [engineering](../platform/engineering.md)); remaining: tests (none exist) and a recorded accessibility/performance pass. |
| M1 Story and visual direction | In progress | TV-002 and TV-003. A v2 visual direction is built and live; founder bios, asset rights, and contact destinations are still open. |
| M2 Usable landing page | In progress | TV-004 and TV-005. Live, but 4 of 6 brief sections exist and the CTA is a dead email address. See [site as built](../site/implementation.md). |
| M3 Acquisition path | Blocked | TV-006 and TV-007. Brief destination, email, and booking are undecided. The portal is not the intake form. |
| M4 Public launch | Blocked | TV-008. Site is reachable on www with HTTPS. Apex is broken, contact is broken, founder release approval is not recorded. |

## Sequence

1. **GoDaddy:** delete A records `76.223.105.230` and `13.248.243.5` for `@`. Wait until `dig +short A thornvine.com` shows only `185.199.108.153`–`185.199.111.153`. GitHub then adds the apex to the certificate and redirects `thornvine.com` → `www.thornvine.com`.
2. **Email:** pick a provider for `@thornvine.com` (for example Google Workspace, Fastmail, or GoDaddy email forwarding) and add its MX/SPF records, or point the CTA at an address that already works. Until then the site has no working contact path.
3. **Intake (TV-006):** decide where briefs go, then build the brief form and replace the `mailto:` CTA.
4. **Content (TV-002 / TV-007):** "Meet the humans" and "How it happens" sections, real founder material, outbound links for OVRmaps / Wyldtracks.
5. **Hardening:** Supabase advisor warnings (see [Supabase](../platform/supabase.md)), leaked-password protection, image weight (3.8 MB of JPGs).
6. **TV-008:** launch checks and a named founder approval before calling the site launched.

## History

- **2026-09-30:** first Pages deploy (run 36671163359, `main` `8620c02`) built but failed to deploy; Pages source was not GitHub Actions yet.
- **2026-10-01:** landing v2 + portal pushed to `authentication` `91b5813`. Custom domain saved as `thornvine.com`, HTTPS off.
- **2026-10-02:** `document/` added (`a778682`). Actions secrets `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` added. Pages custom domain changed to `www.thornvine.com`. PR #10 merged to `main` (`f609433`), deployed, HTTPS enforced.

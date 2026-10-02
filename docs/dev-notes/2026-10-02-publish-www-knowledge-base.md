# Publish to www.thornvine.com and make document/ the knowledge base

- **Date:** 2026-10-02
- **Author / agent:** Cursor agent, on Trevor's instruction
- **Scope:** GitHub Pages settings, Actions secrets, `main` (merge of `authentication`), hosted Supabase (one membership row), `document/`, `AGENTS.md`, `README.md`
- **GitHub Project:** https://github.com/casstrevor/thornvinemain/issues/11

## Summary

Trevor asked to publish and merge so the product matches where Notion says it is, and to treat `document/` as the central project knowledge base. Before this, nothing was live: `main` (`8620c02`) had one failed deploy and still targeted the old `/thornvinemain/` subpath, and landing v2 plus the portal sat unmerged on `authentication`. After this change, https://www.thornvine.com serves landing v2 and the invite-only portal from `main` with HTTPS, and `document/` records the real state in detail, including two newly found blockers: the apex domain 404s and the site's only contact address cannot receive mail.

## Context

- Notion and the first `document/` copy (`a778682`) described a planned sequence: fix HTTPS, merge `authentication`, add Actions secrets. Most of it required repo-admin actions that had not been done.
- The `gh` token now has `project` scope and admin on the repo, so Pages settings, secrets, and the project board can be changed from Cursor.
- Notion MCP needs sign-in, so Notion was not updated; per the new decision TV-D007, `document/` is allowed to lead.

## Changes

Production (no files):
- Added Actions secrets `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` from the root `.env` (public client values).
- Pages custom domain `thornvine.com` → `www.thornvine.com` (TV-D006). GitHub issued a certificate for www (expires 2026-12-30). Enforce HTTPS turned on.
- PR #10 merged `authentication` → `main` as `f609433`. Deploy run 36960290404 succeeded in 29 s.
- Hosted Supabase: `client_memberships` row giving `casstrevor@gmail.com` `thornvine_admin` on the Thornvine client.

Docs (this commit):
- `document/README.md` — central KB statement, status at a glance, update rules, new pages indexed.
- `document/planning/roadmap.md` — live state, verified checks with run IDs, blockers with resolvers, milestone table, sequence, history.
- `document/planning/delivery-plan.md` — current focus, TV-001/TV-004/TV-008 evidence, dated handoff.
- `document/planning/decisions.md` — TV-D007 (KB), TV-D008 (publish), implementation notes on TV-D004/TV-D006, TV-Q006 (portal scope), TV-Q007 (fonts/copy), TV-Q008 (email), two new risks.
- `document/planning/hub.md` — status "Site live, not launched", new priorities.
- `document/platform/hosting.md` — Pages settings table, DNS table, observed URL behavior, build/base path, deploy runbook, rollback, workflow warnings, apex and email fixes.
- `document/platform/engineering.md` — TV-001 baseline: workspace map, toolchain, scripts, checks run, scaffold vs working, next slices.
- `document/platform/supabase.md` (new) — hosted state, schema, authorization model, RLS matrix, admin/onboarding SQL, advisor findings.
- `document/portal/scope.md` — portal live; routes, page behavior, not built, operations, verification log.
- `document/site/implementation.md` (new) — live page structure, gaps vs brief, assets, bundle size, metadata.
- `document/site/launch.md`, `document/site/brand.md` — status vs acceptance; pointer to as-built.
- `AGENTS.md` — `document/` is the KB; Luke and Trevor share ownership (was "Luke owns product decisions").
- `README.md` — live URL and KB link.

## How to verify

- `curl -s https://www.thornvine.com/ | grep -o '<title>[^<]*'` → "Thornvine — Your imagination. Let's make it real."
- Open https://www.thornvine.com/login → sign-in form.
- `gh api repos/casstrevor/thornvinemain/pages` → `cname: www.thornvine.com`, `https_enforced: true`, certificate `approved`.
- `gh run view 36960290404 -R casstrevor/thornvinemain` → success.
- `dig +short MX thornvine.com` → empty (documents the email blocker).

## Risks / notes

- The live CTA (`mailto:hello@thornvine.com`) bounces: no MX records. Leads are being lost until fixed (TV-Q008).
- `thornvine.com` (apex) 404s until GoDaddy A records `76.223.105.230` and `13.248.243.5` are deleted.
- `http://www.thornvine.com` answered 200 for ~15 minutes after enforcing HTTPS; it now returns 301 to HTTPS (verified after PR #12 deployed, recorded in a follow-up commit).
- Portal is public (invite-only) before its scope is decided (TV-Q006). Supabase advisors: 5 security WARN; leaked-password protection off.
- Notion is now behind `document/`.
- No secrets in this note or the docs.

## Follow-ups

- Email provider + MX/SPF; GoDaddy A record cleanup.
- TV-006 project brief intake once the destination is decided.
- Supabase hardening migration; enable leaked-password protection.
- Compress images (3.8 MB) and code-split portal routes (492 KB JS).
- "Meet the humans" and "How it happens" sections; social metadata.
- Sync Notion from `document/` when the Notion MCP is signed in.

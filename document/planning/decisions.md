# Decisions, questions, and risks

- **App section:** planning
- **Notion:** https://app.notion.com/p/3eb9d50600688137ba3df67969ed4ef1
- **Synced:** 2026-10-07 (TV-D009 recorded in the repo; Notion may lag)

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

## Open questions

- TV-Q001 — Deadline anchor: confirm 90 days from 2026-09-29; provisional target 2026-12-28. Owner: Luke and Trevor. Needed for calendar commitment.
- TV-Q002 — Where do project briefs go, who receives them, and what retention/response process applies? Owner: Luke and Trevor with Cursor recommendation. Blocks TV-006 delivery integration. App area: site.
- TV-Q003 — Email and booking destination? Domain and host are decided in TV-D006. Owner: Luke and Trevor. Blocks launch/contact completion. App area: site.
- TV-Q004 — Founder identities/bios/photos, approved experience wording, portfolio roles/URLs, logo and visual assets? Owner: Luke and Trevor. Blocks final public content. App area: site.
- TV-Q005 — Scene implementation and asset/performance budget? Owner: Cursor recommendation after baseline, Luke and Trevor visual review. App area: site.
- TV-Q006 — The client portal is live in production (2026-10-02). Is it in launch scope, and if so what is its acceptance (admin UI, file uploads, password reset)? If not, should `/login` stay public? Owner: Luke and Trevor. App area: portal.
- TV-Q007 — Typography and hero copy: the built site uses Sora + DM Sans and the eyebrow "Human ideas. Digital possibilities."; the brief says Poppins and "Creative product agency". Which is intended? Owner: Luke and Trevor. App area: site.
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

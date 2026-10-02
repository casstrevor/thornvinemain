# Decisions, questions, and risks

- **App section:** planning
- **Notion:** https://app.notion.com/p/3eb9d50600688137ba3df67969ed4ef1
- **Synced:** 2026-10-02

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

### TV-D005 — Shared founders and ownership

Status: Decided. Source: Luke's clarification, 2026-09-29.

Thornvine is jointly founded by Luke and Trevor. Give both equal brand prominence and shared product ownership across planning, content, and engineering handoffs. Do not default responsibilities or approvals to Luke alone. Individual role splits and Trevor's full bio remain unconfirmed.

### TV-D006 — Public host

Status: Decided. Source: product direction in Cursor, 2026-10-01.

Host the site at www.thornvine.com. DNS registrar is GoDaddy. Deployment stays GitHub Pages. Apex thornvine.com redirects to www. Email and booking destinations are still open.

App area: platform. See [hosting](../platform/hosting.md).

## Open questions

- TV-Q001 — Deadline anchor: confirm 90 days from 2026-09-29; provisional target 2026-12-28. Owner: Luke and Trevor. Needed for calendar commitment.
- TV-Q002 — Where do project briefs go, who receives them, and what retention/response process applies? Owner: Luke and Trevor with Cursor recommendation. Blocks TV-006 delivery integration. App area: site.
- TV-Q003 — Email and booking destination? Domain and host are decided in TV-D006. Owner: Luke and Trevor. Blocks launch/contact completion. App area: site.
- TV-Q004 — Founder identities/bios/photos, approved experience wording, portfolio roles/URLs, logo and visual assets? Owner: Luke and Trevor. Blocks final public content. App area: site.
- TV-Q005 — Scene implementation and asset/performance budget? Owner: Cursor recommendation after baseline, Luke and Trevor visual review. App area: site.

## Risks and responses

- Decorative 3D slows the page or hides the offering: build the readable core first; static fallback; mobile and motion checks.
- Code and Notion drift: dated evidence tied to commits; fetch before updates; reconcile each handoff.
- Intake appears successful but loses leads: verify delivery, loading/failure states, and post-deployment smoke test.
- Portfolio or copy overstates experience: confirm actual contributions and label concepts.
- Scope expands into agency operations software: record additions explicitly with impact on delivery.
- Missing content stalls release: track inputs early; separate implementation readiness from content approval.

## Decision record format

ID; question; status (Proposed/Decided/Superseded); options; recommendation; rationale; product/delivery impact; decision maker/source/date; affected task IDs. Preserve superseded decisions and link replacements.

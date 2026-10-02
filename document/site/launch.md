# Launch scope and acceptance

- **App section:** site (public landing page and lead intake)
- **Notion:** https://app.notion.com/p/3eb9d506006881eb8736ca5c3071ced7
- **Synced:** 2026-10-02 (status section added in repo after publish)

## Objective

Publish the complete Thornvine agency landing page and receive at least one genuine prospective client's project brief within 90 days. Planning assumption: the clock starts 2026-09-29, giving a target of 2026-12-28; Luke and Trevor should confirm the anchor. Launch early enough to allow acquisition and iteration.

Product scope is the agency website and lead intake. The existing React monorepo is a reported foundation, not evidence of completed website functionality.

## Launch scope

- Responsive landing page with the six sections in the brand brief.
- Shared design primitives and brand tokens appropriate to the existing repository.
- Tree/botanical visual treatment with progressive enhancement, mobile simplification, and motion fallback.
- Primary CTA opens or navigates to the same short project brief throughout.
- Brief fields: name, email, what to create/improve, who will use it, desired timing; optional budget range and reference links.
- Secondary contact: free-call booking and email, once real destinations are supplied.
- Real portfolio entries and founder information for both Luke and Trevor approved for publication; equal founder prominence.
- Deployment, essential metadata/social sharing, working contact delivery, launch verification.

## Proposed exclusions for initial delivery

Client accounts, client portal, billing, CMS, CRM, blog, and bespoke AI agent functionality are not requested launch features. Add only through an explicit scope decision. Offering AI services does not require an AI chatbot on this site.

## Acceptance

- [ ] Visitors can identify what Thornvine builds, who it helps, and how to start.
- [ ] Six narrative sections are complete; public copy contains no fabricated work, roles, testimonials, or unsupported outcomes.
- [ ] Repeated primary CTAs reach one usable brief; required/optional fields are clear.
- [ ] Submission has validation, loading, success, and recoverable failure behavior; success only appears after the receiving system accepts it.
- [ ] One end-to-end test submission reaches the configured destination, with timestamp and evidence; test leads are excluded from the business goal.
- [ ] Intake has server-side validation and appropriate abuse protection; secrets remain server-side, and logs avoid unnecessary personal data. Destination, retention, and user-facing privacy wording are settled before launch.
- [ ] Keyboard navigation, visible focus, labels, contrast, and mobile layout are checked; target WCAG 2.2 AA. Document methods and limitations rather than claiming certification.
- [ ] Static/no-WebGL and reduced-motion experiences retain all content and conversion functionality.
- [ ] Representative mobile and desktop checks show acceptable loading and interaction. Proposed targets: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 when field data exists; prelaunch lab results are labeled as lab evidence. Set scene/asset budgets after baseline.
- [ ] Build and existing relevant quality gates pass, or an explicit release decision records accepted exceptions.
- [ ] Domain/HTTPS, production links, metadata, error behavior, and rollback procedure are verified.
- [ ] Founder launch approval is recorded with the decision maker named (Luke and/or Trevor according to their agreed process); deployment evidence is recorded.

### Status against acceptance (2026-10-02, `main` `f609433`)

Boxes above stay unchecked until verified with evidence. Current state:

- Offering clarity: hero and services are live; founder review pending.
- Six sections: 4 of 6 live (missing "Meet the humans", "How it happens").
- CTAs → brief: **No.** All CTAs open `mailto:hello@thornvine.com`; the domain has no MX, so mail bounces.
- Submission behavior, end-to-end test, server-side validation: not started (no intake).
- Accessibility, no-WebGL/reduced-motion, performance: not checked. Images 3.8 MB; JS 492 KB.
- Build and quality gates: lint (0 errors) and build pass; no tests exist.
- Domain/HTTPS: www live with enforced HTTPS; **apex broken**; rollback procedure documented in [hosting](../platform/hosting.md); social metadata missing.
- Founder launch approval: not recorded.

See [site as built](implementation.md) for the full gap list.

## Success measurement

Record public launch date and first genuine prospective-client brief date. Track brief opens, successful submissions, and acquisition source only through an agreed measurement approach; keep form contents out of analytics. Manual lead counting is sufficient initially.

## Open inputs

Founder details/photos; portfolio URLs/roles/assets; logo/reference assets and usage rights; business contact email; brief receiving destination; booking destination; domain/hosting; privacy/retention choices; final deadline anchor. These block their respective tasks, not the repository audit.

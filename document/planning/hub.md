# Thornvine hub

- **App section:** planning (whole product)
- **Notion:** https://app.notion.com/p/3eb9d506006880bcaf86d4c2f8eb7c60
- **Synced:** 2026-10-02

The "Current status" and "Immediate priorities" sections were updated 2026-10-02 after the production publish. The rest of the hub text is from 2026-09-30. Detailed status is on [the roadmap](roadmap.md). Per TV-D007, this repo folder is the central knowledge base; Notion may lag.

## Thornvine — project source of truth

**A human-centered creative product agency. We help humans turn imaginations into realities.**

This hub owns the agency website's product direction, delivery plan, decisions, and links to engineering evidence.

## Current status

**Phase: Site live, not launched (2026-10-02).**

https://www.thornvine.com serves landing page v2 and the invite-only client portal from `main` `f609433`, with HTTPS. It is not launched: the contact CTA bounces (no email on the domain), the apex `thornvine.com` returns 404, two brief sections are missing, and there is no project brief intake or founder release approval.

**Next action:** Luke and Trevor choose an email provider / contact destination (TV-Q008) and delete the two leftover GoDaddy A records. Then Cursor builds the brief intake (TV-006) once its destination is decided.

**Business goal:** publish the complete landing page and receive at least one genuine prospective client's project brief within 90 days. Provisional deadline: 2026-12-28, assuming a 2026-09-29 start; confirm with Luke or Trevor.

## Start here

1. [Brand and website brief](../site/brand.md) — positioning, copy, services, visual direction, page narrative.
2. [Launch scope and acceptance](../site/launch.md) — required behavior, launch checks, exclusions, success measurement.
3. [Engineering baseline and handoff](../platform/engineering.md) — repository evidence and collaboration contract.
4. [Delivery plan and task register](delivery-plan.md) — canonical TV task IDs, milestones, dated handoffs.
5. [Decisions, questions, and risks](decisions.md) — recorded direction and unresolved inputs.
6. [Roadmap](roadmap.md) — planned, implemented, and verified status.

## How we work

**Luke and Trevor:** co-founders and shared product owners. Both are represented in the brand, planning, content review, and scope/launch decisions. Record which founder makes each decision; do not default ownership to Luke alone.

**ChatGPT:** product-management assistant; maintains priorities, requirements, acceptance, risks, and decisions during project sessions.

**Cursor:** engineering owner; inspects and changes the repository and records evidence in Notion.

Notion establishes product intent and coordination; code and checks establish implementation facts. Surface conflicts and reconcile them explicitly.

Read relevant pages before work; make targeted updates; preserve history and other contributors' changes. Use existing task IDs and pages.

A build passing is not proof that the site, lead delivery, or launch is verified.

**Cadence:** Cursor updates the Roadmap after each prompt that changes planned, implemented, or verified status. ChatGPT reads current project state when asked to review progress or plan the next step. No background monitoring or automatic synchronization is configured.

## Immediate priorities

- Luke and Trevor: set up email for `@thornvine.com` or pick a working contact (TV-Q008); delete GoDaddy A records `76.223.105.230` and `13.248.243.5`; decide portal scope (TV-Q006).
- Luke and Trevor: supply or confirm founder/portfolio assets, booking link, and brief destination.
- Cursor: Supabase hardening, image/bundle size, missing sections once content exists.
- Next PM review: reconcile baseline, resolve architecture-dependent questions, and select the first implementation slice.

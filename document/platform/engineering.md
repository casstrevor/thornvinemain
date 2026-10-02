# Engineering baseline and handoff

- **App section:** platform (monorepo, app entry, Supabase)
- **Notion:** https://app.notion.com/p/3eb9d506006881ae8499d0c6121b20d0
- **Synced:** 2026-10-02

The Notion page below was last edited 2026-09-30. Later branch facts are on the roadmap. Where they disagree, the roadmap date wins.

## Current evidence

**2026-09-30, Cursor:** `casstrevor/thornvinemain` on `main` at `8620c02`. pnpm monorepo. Vite + React app in `apps/web`. Supabase config is in `supabase/`. GitHub Pages workflow is implemented. Actions run 36671163359 built successfully. Production deploy is blocked until a repo admin sets Pages source to GitHub Actions. Working tree has uncommitted landing and portal edits. Full TV-001 checklist is not finished. Details and status labels are on the Roadmap.

**Status: Foundation in progress.** No launch feature is verified.

Later fact, 2026-10-02: landing and portal were pushed on `authentication` at `91b5813`. They are still not on `main`.

## Cursor's first deliverable — TV-001

Inspect the actual repository and update this page with:

- Repository URL or identity, branch, commit, observation timestamp, and working-tree state.
- Workspace/package map, app entry points, routing, package manager and runtime versions supported by repository evidence.
- Framework/build system, styling approach, existing UI components/tokens, scripts, tests, lint/typecheck/build and CI configuration.
- Current visible product behavior and reusable foundations; distinguish scaffold from functioning capabilities.
- Data/backend/services, intake handling, environment-variable names only, deployment configuration and known gaps. Never paste credentials, tokens, `.env` values, or private customer data.
- Validation commands actually executed, result and relevant evidence; checks not run and why. Inspect command effects before running; avoid production writes.
- Smallest proposed implementation sequence against launch requirements, reuse opportunities, blockers, and decisions requiring Luke and Trevor.

If a category is absent, say absent. If it cannot be inspected, say unknown. Do not infer installed systems or successful checks.

## Evidence conventions

For each capability: requirement/task ID; status; implementation paths; branch/commit; checks and results; remaining limitations; last verified date.

Use: Unknown, Not started, In progress, Implemented—unverified, Verified, Blocked. "Verified" requires evidence covering that item's acceptance criteria. A passing build alone does not verify intake delivery, accessibility, mobile behavior, or production readiness.

## Ongoing engineering update

After each meaningful task, update the relevant task and this current baseline where architecture changes. Append a dated handoff to the delivery page containing task IDs, behavior changed, files/commit, tests run/results, tests not run, blockers, and next recommendation.

Keep the current architecture summary current; preserve historical decisions and handoff records.

## Collaboration contract

- Luke and Trevor are co-founders and shared product owners for product direction, scope changes, spending/service commitments, and public launch decisions. Include both in planning and brand representation; record the actual decision maker for each approval. Do not assume individual role splits or sole authority without their direction.
- ChatGPT acts as product-management assistant during working sessions: reconcile requirements, priorities, decisions, risks, acceptance, and Cursor evidence.
- Cursor owns repository inspection, implementation, engineering recommendations, and accurate technical updates.
- Notion is the shared product and coordination source of truth. Code and executable checks establish what is actually implemented. Surface discrepancies; do not overwrite product intent to match code.
- Read the hub and relevant child pages before work. Search/reuse existing task IDs and canonical pages; do not create competing project hubs.
- Fetch pages immediately before targeted edits, preserve unrelated sections/child pages, and avoid whole-page replacement when collaborators may have updated content.
- Product choices discovered during coding become proposals in the decision log; mark them decided only with a recorded source of authorization.
- Keep any repo instructions concise and linked to this hub; extend existing guidance without creating contradictory copies.
- If Notion is unavailable, return the intended update in the handoff and label it unsynced.

## Monitoring boundary

This setup does not create a background monitoring or synchronization service. Cursor updates Notion during engineering work; ChatGPT reads and reconciles it during project sessions. Recurring monitoring would need a separately configured automation.

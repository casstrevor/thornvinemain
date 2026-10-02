# Engineering baseline and handoff

- **App section:** platform (monorepo, app entry, Supabase)
- **Notion:** https://app.notion.com/p/3eb9d506006881ae8499d0c6121b20d0
- **Updated:** 2026-10-02 (TV-001 baseline filled from inspected files; Notion still has the 2026-09-30 text)

## Current baseline (TV-001)

Observed 2026-10-02 by Cursor on `casstrevor/thornvinemain` `main` `f609433` (clean checkout in a worktree).

### Repository

- GitHub: https://github.com/casstrevor/thornvinemain (public). Default branch `main`.
- Branches: `main` (production), `authentication` (merged at `a778682`, no longer needed for new work).
- Contributors: casstrevor (Trevor), Grizzyzee (Luke), with Cursor agent co-authoring.

### Workspace map

```
apps/web/            Vite + React 19 + TypeScript app (@thornvine/web)
  src/main.tsx       Entry: BrowserRouter (basename from Vite base) → AuthProvider → AppRoutes
  src/routes.tsx     /, /login, /clientportal (RequireAuth), /portal → /clientportal, * → /
  src/App.tsx/.css   Landing page
  src/pages/         LoginPage, ClientPortalPage (+ auth.css, portal.css)
  src/lib/           supabase.ts (client), auth.tsx (session/roles), database.types.ts, publicUrl.ts
  public/            favicon.svg, icons.svg, images/ (13 files, 3.8 MB)
packages/            Empty placeholder for shared packages
supabase/            config.toml, migrations/ (portal_core), seed.sql (comments only)
document/            Central knowledge base (this folder)
docs/dev-notes/      One note per commit
.github/workflows/   deploy.yml (GitHub Pages)
.cursor/, .agents/   Agent skills and rules (Supabase MCP, dev notes, GitHub Project, Notion roadmap)
```

### Toolchain

| Item | Value | Evidence |
|------|-------|----------|
| Package manager | pnpm 12.5.1 (`packageManager`), engines `pnpm >= 9` | root `package.json` |
| Node | engines `>= 20`; CI uses Node 22 | `package.json`, `deploy.yml` |
| Framework | React 19.2, React Router 7.18, supabase-js 2.117 | `apps/web/package.json` |
| Build | Vite 8.3, TypeScript ~6.0 (`tsc -b && vite build`) | `apps/web/package.json` |
| Lint | oxlint 1.x | `apps/web/package.json` |
| Styling | Plain CSS files per area (`App.css`, `auth.css`, `portal.css`, `index.css`), CSS custom properties for fonts/colors | `apps/web/src` |
| Tests | **None** (no test runner, no test files) | repo search |
| Env | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_BASE_PATH` (build only); root `.env` via Vite `envDir` | `vite.config.ts`, `.env.example` |

### Scripts (root)

`pnpm dev` (Vite dev server), `pnpm build`, `pnpm lint`, `pnpm preview`, `pnpm supabase:start|stop|status`.

### Checks run 2026-10-02

| Check | Result |
|-------|--------|
| `pnpm install --frozen-lockfile` | Pass (lockfile passes pnpm supply-chain policy) |
| `pnpm lint` | Pass: 0 errors, 1 warning — `react(only-export-components)` in `src/lib/auth.tsx:167` (file exports hooks and components together; affects Fast Refresh only) |
| `VITE_BASE_PATH=/ pnpm build` | Pass: 76 modules; `index.js` 492 KB (142 KB gzip), CSS 17 KB |
| CI deploy (run 36960290404) | Pass, 29 s |
| Production smoke test | `/` and `/login` render on https://www.thornvine.com |
| Supabase advisors | 5 security WARN, 2 performance INFO — see [Supabase](supabase.md) |

Not run: automated tests (none exist), accessibility audit, Lighthouse, cross-device checks. Sign-in was not exercised with real credentials.

### Scaffold vs working

- **Working:** landing page (4 sections), routing with deep links on Pages, Supabase password auth, role-aware portal reading projects/updates under RLS, CI deploy to custom domain.
- **Scaffold / placeholder:** contact CTA (`mailto:` to a domain with no email), "Our people" anchor, work cards without links, `project_files` without Storage, `packages/` empty, `seed.sql` comments only.
- **Absent:** project brief intake, admin UI, tests, analytics, social metadata, error monitoring.

### Smallest next slices

1. Working contact path (email provider or brief form) — unblocks M3.
2. Apex DNS cleanup — two GoDaddy records.
3. "Meet the humans" + "How it happens" sections with real content.
4. Supabase hardening migration (advisor fixes) + leaked-password protection.
5. Code-split portal routes; compress images.
6. Add a minimal test setup (Vitest + Testing Library) before intake work.

## Evidence conventions

For each capability: requirement/task ID; status; implementation paths; branch/commit; checks and results; remaining limitations; last verified date.

Use: Unknown, Not started, In progress, Implemented—unverified, Verified, Blocked. "Verified" requires evidence covering that item's acceptance criteria. A passing build alone does not verify intake delivery, accessibility, mobile behavior, or production readiness.

## Ongoing engineering update

After each meaningful task, update the relevant task and this baseline where architecture changes. Append a dated handoff to the delivery plan containing task IDs, behavior changed, files/commit, tests run/results, tests not run, blockers, and next recommendation. Write a dev note in `docs/dev-notes/` for every commit.

## Collaboration contract

- Luke and Trevor are co-founders and shared product owners for product direction, scope changes, spending/service commitments, and public launch decisions. Include both in planning and brand representation; record the actual decision maker for each approval. Do not assume individual role splits or sole authority without their direction.
- ChatGPT acts as product-management assistant during working sessions: reconcile requirements, priorities, decisions, risks, acceptance, and Cursor evidence.
- Cursor owns repository inspection, implementation, engineering recommendations, and accurate technical updates.
- `document/` is the central knowledge base (TV-D007). Notion remains the shared coordination space and may lag; reconcile when they differ. Code and executable checks establish what is actually implemented. Surface discrepancies; do not overwrite product intent to match code.
- Read the relevant `document/` pages before work. Reuse existing task IDs; do not create competing hubs.
- Product choices discovered during coding become proposals in the decision log; mark them decided only with a recorded source of authorization.
- If Notion is unavailable, update `document/` and label the Notion copy unsynced.

## History

- **2026-09-30, Cursor:** `main` at `8620c02`. pnpm monorepo, Vite + React in `apps/web`, Supabase config in `supabase/`. Pages workflow implemented; run 36671163359 built but deploy failed (Pages source not set). Working tree had uncommitted landing and portal edits.
- **2026-10-01:** landing v2 and portal pushed on `authentication` `91b5813`.
- **2026-10-02:** `authentication` merged to `main` via PR #10 (`f609433`) and deployed to www.thornvine.com.

## Monitoring boundary

There is no background monitoring, uptime check, or error tracking. Cursor updates docs during engineering work. Recurring monitoring would need a separately configured automation.

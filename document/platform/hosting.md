# Hosting, DNS, and deploy runbook

- **App section:** platform (GitHub Pages, GoDaddy)
- **Notion:** host facts on https://app.notion.com/p/3eb9d5060068816c95fade2a67b6454c and decision TV-D006
- **Updated:** 2026-10-02 (after the first successful production deploy)
- **Code:** `.github/workflows/deploy.yml`, `apps/web/vite.config.ts`, `apps/web/src/main.tsx`, `apps/web/src/lib/publicUrl.ts`

## Decision

TV-D006, 2026-10-01: host the site at www.thornvine.com. DNS registrar is GoDaddy. Deployment stays GitHub Pages. Apex thornvine.com redirects to www. Email and booking destinations are still open.

Status 2026-10-02: **implemented for www; apex redirect blocked** (see below).

## Current configuration (verified 2026-10-02)

### GitHub Pages (repo `casstrevor/thornvinemain`, public)

| Setting | Value |
|---------|-------|
| Source / build type | GitHub Actions (`workflow`) |
| Custom domain | `www.thornvine.com` (changed from `thornvine.com` on 2026-10-02) |
| Certificate | Approved for `www.thornvine.com` only; expires 2026-12-30, GitHub auto-renews |
| Enforce HTTPS | On (enabled 2026-10-02) |
| Deploying branch | `main`, on every push, plus manual `workflow_dispatch` |

Check with `gh api repos/casstrevor/thornvinemain/pages`.

### Actions secrets

`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, added 2026-10-02 from the root `.env`. These are public client values (the anon key is protected by RLS) and are inlined into the JS bundle at build time. Never add the database password or service-role key as a `VITE_*` value.

### GoDaddy DNS for `thornvine.com`

| Type | Name | Value | Status |
|------|------|-------|--------|
| CNAME | `www` | `casstrevor.github.io` | Correct |
| A | `@` | `185.199.108.153`, `.109.153`, `.110.153`, `.111.153` | Correct |
| AAAA | `@` | `2606:50c0:8000::153` … `8003::153` | Correct |
| A | `@` | `76.223.105.230`, `13.248.243.5` | **Delete** — GoDaddy parking/forwarding leftovers |
| MX | `@` | none | **Missing** — no email can be received at `@thornvine.com` |

### Observed behavior (2026-10-02)

| URL | Result |
|-----|--------|
| `https://www.thornvine.com/` | 200, landing page v2 |
| `http://www.thornvine.com/` | Still 200 over plain HTTP ~10 minutes after Enforce HTTPS was turned on; GitHub's redirect can take time to propagate. **Re-check** with `curl -sI http://www.thornvine.com/` (expect 301 to https) |
| `https://www.thornvine.com/login`, `/clientportal` | Page renders correctly, but the HTTP status is **404** because GitHub Pages serves `404.html` (the SPA fallback) for unknown paths. Browsers and users are unaffected; crawlers will not index these routes, which is fine for a portal. |
| `http://thornvine.com/` | GitHub "Site not found" 404 |
| `https://thornvine.com/` | TLS failure (apex is not on the certificate) |
| `https://casstrevor.github.io/thornvinemain/` | Redirects to the custom domain |

## Build and base path

- `vite.config.ts` reads `VITE_BASE_PATH`; empty or unset means `/`. The workflow sets `VITE_BASE_PATH: /`.
- `main.tsx` passes the base to `BrowserRouter` as `basename`. `publicUrl()` prefixes public-folder assets (images) with the same base.
- Only set a subpath (for example `/thornvinemain/`) if the site is ever served from `casstrevor.github.io/<repo>/` without a custom domain.
- The workflow copies `dist/index.html` to `dist/404.html` so deep links load the app.

## Deploy runbook

1. Merge to `main` (PR preferred). The "Deploy static content to Pages" workflow runs automatically.
2. Watch it: `gh run list -R casstrevor/thornvinemain --limit 3`, then `gh run watch <id> -R casstrevor/thornvinemain --exit-status`.
3. Smoke test:
   - `curl -s https://www.thornvine.com/ | grep -o '<title>[^<]*'` shows the expected title.
   - Open `https://www.thornvine.com/login` in a browser; the sign-in form renders.
4. Manual redeploy without a commit: `gh workflow run "Deploy static content to Pages" -R casstrevor/thornvinemain --ref main`.

### Rollback

Pages serves the last successful deployment. To roll back, revert the bad commit on `main` (`git revert <sha>`, push) and let the workflow redeploy, or re-run an older successful run from the Actions tab (`gh run rerun <id>`), which redeploys that commit's build.

### Known workflow warnings (non-blocking, 2026-10-02)

- Actions using Node 20 (`checkout@v4`, `setup-node@v4`, `configure-pages@v5`, `upload-pages-artifact@v3`, `deploy-pages@v4`, `pnpm/action-setup@v4`) are being forced to Node 24. Bump action majors when newer ones are available.
- `ubuntu-latest` migrates to Ubuntu 26 starting 2026-10-19.

## To finish the apex redirect

1. In GoDaddy DNS, delete the `@` A records `76.223.105.230` and `13.248.243.5`. Also remove any GoDaddy "forwarding" on the domain if present.
2. Wait until `dig +short A thornvine.com` returns only the four `185.199.*` addresses (usually minutes, up to the record TTL).
3. GitHub re-checks DNS and adds `thornvine.com` to the certificate. If it does not within an hour, re-save the custom domain: `gh api -X PUT repos/casstrevor/thornvinemain/pages -f cname=www.thornvine.com`.
4. Verify: `curl -sI http://thornvine.com/` returns a 301 to `https://www.thornvine.com/`.

## To make email work

The site's contact CTA is `mailto:hello@thornvine.com`. With no MX records, those messages bounce. Pick a provider (Google Workspace, Fastmail, Proton, or GoDaddy forwarding to an existing inbox), add its MX records and an SPF TXT record at GoDaddy, then send a test message to `hello@thornvine.com` and record the result here.

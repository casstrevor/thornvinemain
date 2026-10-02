# Hosting and DNS

- **App section:** platform (GitHub Pages, GoDaddy)
- **Notion:** host facts on https://app.notion.com/p/3eb9d5060068816c95fade2a67b6454c and decision TV-D006
- **Synced:** 2026-10-02
- **Code:** `.github/workflows/deploy.yml`, `apps/web/vite.config.ts`

## Decision

TV-D006, 2026-10-01: host the site at www.thornvine.com. DNS registrar is GoDaddy. Deployment stays GitHub Pages. Apex thornvine.com redirects to www. Email and booking destinations are still open.

## What is actually configured

- `www` CNAME at GoDaddy points at `casstrevor.github.io`.
- Apex A records include GitHub `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`, and also leftover GoDaddy addresses `76.223.105.230` and `13.248.243.5`.
- AAAA records are GitHub's four `2606:50c0:8000::153` through `2606:50c0:8003::153`.
- GitHub Pages custom domain is saved as `thornvine.com`, not `www.thornvine.com`. HTTPS is off (`https: false`) while the extra A records remain.
- `main` (`8620c02`) builds with `VITE_BASE_PATH=/thornvinemain/`.
- `authentication` (`91b5813`) sets `VITE_BASE_PATH=/`, which is what a custom domain needs. That branch is not merged, so the live workflow still uses the subpath.

## To finish HTTPS

1. Delete A records `76.223.105.230` and `13.248.243.5`.
2. Wait until the apex answers with only the four `185.199.*` addresses.
3. Turn on Enforce HTTPS in the repo Pages settings.
4. If the public address should be `www.thornvine.com`, change the Pages custom domain from `thornvine.com` to `www.thornvine.com`.
5. Merge `authentication` to `main` before expecting the custom domain to load assets from `/`.

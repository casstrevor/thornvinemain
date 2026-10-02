# Roadmap

- **App section:** planning
- **Notion:** https://app.notion.com/p/3eb9d5060068816c95fade2a67b6454c
- **Synced:** 2026-10-02

This is the status view. Task IDs and acceptance stay on the delivery plan. Do not treat a git commit as launch.

## Where work is tracked

Notion is the board we can keep current. The GitHub Project [Thornvine](https://github.com/users/casstrevor/projects/2) already exists, and issues #6–#8 are on the repo. The login used from Cursor cannot edit that project board because the token is missing the `project` scope. Run `gh auth refresh -s project,read:project` if that board should be updated from here.

Repo copies of the Notion pages live in `document/`, filed by app section.

## How to read status

- **Planned:** agreed direction, not in git.
- **Implemented:** present on a named branch and commit. Not the same as live.
- **Verified:** a named check passed. A build does not verify HTTPS, intake, or launch.
- **Blocked:** a concrete cause is named.

## As of 2026-10-02

Repository [casstrevor/thornvinemain](https://github.com/casstrevor/thornvinemain).

- `main` is `8620c02`. Pages workflow is there. Base path is still `/thornvinemain/`.
- `authentication` is `91b5813` and is pushed. It has the landing, client portal, portal migration, and `VITE_BASE_PATH=/` for the custom domain. It is not merged.

## Now

- **Planned:** canonical public URL was decided as https://www.thornvine.com. GitHub Pages currently has the custom domain saved as `thornvine.com`, and HTTPS is off.
- **Implemented:** landing, login, and `/clientportal` on `authentication` (`91b5813`). Pages workflow on `main` (`8620c02`). GoDaddy `www` CNAME points at `casstrevor.github.io`. Apex A and AAAA records include GitHub's addresses.
- **Verified:** Actions run [36671163359](https://github.com/casstrevor/thornvinemain/actions/runs/36671163359) built `main`. GoDaddy nameservers showed the `www` CNAME. Pages API returned `cname: thornvine.com` and `https: false`.
- **Blocked:** HTTPS. Apex DNS still includes GoDaddy addresses `76.223.105.230` and `13.248.243.5` next to GitHub's four A records. Delete those two, then use Enforce HTTPS. The live deploy also stays on `main` until `authentication` is merged, so production still builds for `/thornvinemain/`.

## Milestones

| Milestone | Status | What it takes |
|-----------|--------|----------------|
| M0 Foundation | In progress | TV-001. Repo is on GitHub. Engineering page is only partly filled. Not complete. |
| M1 Story and visual direction | Planned | TV-002 and TV-003. Founder bios, asset rights, and contact destinations are still open. |
| M2 Usable landing page | In progress | TV-004 and TV-005. Landing is on `authentication`. Not checked against acceptance. Scene and motion are not done. |
| M3 Acquisition path | Blocked | TV-006 and TV-007. Brief destination, email, and booking are undecided. Portal code exists on `authentication` and is not the public intake form. |
| M4 Public launch | Blocked | TV-008. Domain is connected. HTTPS is not on. `authentication` is not on `main`. Founder release approval is not recorded. |

## Sequence

1. Delete the two leftover GoDaddy A records. Wait until DNS shows only `185.199.108.153` through `185.199.111.153`. Then Enforce HTTPS.
2. Choose the canonical host. Decision was `www.thornvine.com`. GitHub is currently set to `thornvine.com`. Change the Pages custom domain if `www` should be the address people see.
3. Merge `authentication` to `main` so the deploy uses base path `/`.
4. Add Actions secrets `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Names only.
5. Finish TV-002 content, then TV-006 once the brief destination is chosen.
6. TV-008 launch checks and a named founder approval before calling the site launched.

# Notion pages copied into document/

- **Date:** 2026-10-02
- **Author / agent:** Cursor agent
- **Scope:** `document/`
- **GitHub Project:** https://github.com/casstrevor/thornvinemain/issues/9

## Summary

The Notion hub was only in Notion. This commit adds a `document/` folder so the same material lives in the repo, filed by the app area it describes: site, portal, platform, and planning.

## Context

Luke and Trevor use Notion as the product source of truth. Engineers need the same pages next to the code, and each page should sit with the part of the app it governs so it stays usable as the product grows.

## Changes

- `document/README.md` indexes the files and their Notion URLs
- Site: brand brief and launch acceptance
- Portal: TV-D004 boundary plus the routes that exist on `authentication`
- Platform: engineering baseline and hosting/DNS facts
- Planning: hub, roadmap, delivery plan, and decisions

## How to verify

1. Open `document/README.md` and follow each link
2. Confirm each file names its Notion URL and app section
3. `git log origin/authentication -1` includes this commit after push

## Risks / notes

- These files can drift from Notion. The header on each file records the sync date
- The engineering baseline file still contains the 2026-09-30 wording, with a later-fact note where the roadmap supersedes it
- No secrets

## Follow-ups

- When a Notion page changes, update the matching file in `document/`

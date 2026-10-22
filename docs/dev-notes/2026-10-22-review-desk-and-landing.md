# Review desk, blank guardrails, and landing polish

- **Date:** 2026-10-22
- **Author / agent:** Cursor
- **Scope:** `apps/web` landing, shell, account, intake, `supabase/migrations`, `document/`
- **GitHub Project:** https://github.com/casstrevor/thornvinemain/issues/20

## Summary

The staff review desk was a wall of empty drafts and JSON snapshots, so it could not be used as a desk. This change makes `/newclient/review` a filtered dashboard of real introductions, stops `/newclient` from inserting a blank row on open, and calls the model only for free-text turns. The same working tree also lands the rest of the `hero-glass-and-auth-nav` polish since `349350c`: slower landing motion, Meet the humans, account profile edit, and a filled selected-nav pill instead of a left bar.

## Context

Luke asked to redesign New-client review into something purposeful, stop unwritten submissions from flooding the desk, use AI only when necessary, and stop showing developer JSON on the intake views. Trevor had already directed the landing motion, people section, account strip, and profile edit on this branch. None of this is on `main`, and none of it is live.

## Changes

- Review desk: Waiting / Still writing / Decided counts, compact human rows, labeled brief instead of JSON, Invite them in, Back to the desk.
- Blank guardrails: `intake_resume()` on open; `intake_start()` on first answer or first reference. `intake_list()` omits empty drafts. Client filter also hides drafts with no idea or contact.
- `intake-turn` only for composer or summary correction; skip after a demo response. Structured widgets stay on the local adapter.
- Client summary uses `briefField()` labels, never snake_case status or choice ids.
- Selected sidebar item is a filled accent pill. Nav label is Review desk.
- Landing: darker nav pill, staggered hero rise-in, slower motion tokens, overlay chip morph, Meet the humans (Luke and Trevor, no photos). Canvas leaf layer was added then removed.
- `/account` is a profile with editable name. Signed-in identity strip sits below the brand.
- Design-system page no longer repeats the brand mark in its top bar.
- Migrations: `20261022160000_intake_resume_and_list_guard.sql` (in repo; not applied on hosted Thornvine from this session). `20261008021500_intake_null_widget.sql` recorded in git.

## How to verify

- `node --experimental-strip-types src/features/new-client/orchestrator.test.ts` and `questionCopy.test.ts` in `apps/web`
- `tsc -b` and `oxlint` on the touched files
- http://127.0.0.1:5173/newclient first paint is the idea question; network is `intake_resume` until First Next
- Chip Next does not call `intake-turn` again
- Unsigned http://127.0.0.1:5173/newclient/review shows Review desk, no JSON

## Risks / notes

- Not on `main`. Not live.
- Cursor’s Supabase MCP session was bound to a different project, so `intake_resume` / list-guard SQL was not applied to Thornvine `dzywymkjvfxsbimyxmhu`. Until it is, resume falls back to a local canvas; the desk still defaults to Waiting.
- Graphify output, `.preview-shots`, and `.codex` are left uncommitted.

## Follow-ups

- Apply `20261022160000_intake_resume_and_list_guard.sql` on hosted Thornvine.
- Merge and deploy before treating any of this as live.

# Stage 1 introduction

- **Date:** 2026-10-07
- **Author / agent:** Cursor
- **Scope:** `apps/web` new-client flow, design system, Supabase intake migrations, `document/`
- **GitHub Project:** https://github.com/casstrevor/thornvinemain/issues/15

## Summary

Stage 1 is the unlisted conversation at `/newclient` where a person can introduce an idea and a Thornvine admin can review it. This commit puts that flow on `new-client-system-v1`, including the focused canvas, Next and Back, the shared voice, and the checks that showed Next returns to the question you left.

## Context

Trevor asked for a conversational introduction, then a series of fixes: one question at a time, multi-select spark choices, Back and Next as matching secondary buttons, Next as the primary button once it is ready, no round send button, and one voice across questions. “Who's this for?” and “What this is for” did not match. After a revision, Back could reopen the question already on screen and leave Next disabled.

The same branch also carries the admin Workspace setup slice for the live portal. That slice is still unverified with a signed-in save.

## Changes

- `/newclient` shows one question. Written answers and choices both use Next. Back opens the previous answer that was actually given. Next from that revision returns to the unanswered question.
- Purpose now matches audience: “What it's for” / “What's this for?” Voice rules live in `apps/web/src/design-system/voice.md`.
- Stage 1 tables, row level security, and reference removal are in `supabase/migrations/`. Hosted Thornvine received both migrations on 2026-10-07.
- Tests cover Next advancing, “Not sure yet” continuing, a revision returning to “What's this for?”, the purpose choices, and the paired question copy.

## How to verify

- `node --experimental-strip-types src/features/new-client/orchestrator.test.ts`
- `node --experimental-strip-types src/features/new-client/questionCopy.test.ts`
- `tsc -b` and `oxlint` in `apps/web`
- Open `http://127.0.0.1:5173/newclient`, answer the idea, choose a spark, choose who it is for, then use Back and Next.

## Risks / notes

- Not merged to `main` and not linked from the public site.
- `intake-turn` is not required. Without `INTAKE_MODEL_API_KEY` the page uses the development adapter.
- The admin create forms on `/clientportal` were not exercised with a signed-in save.
- No secrets are in this note. Edge model settings use `INTAKE_MODEL_API_KEY`, `INTAKE_MODEL_URL`, and `INTAKE_MODEL_NAME`.

## Follow-ups

- Deploy `intake-turn` only if a live model is wanted.
- Sign in as an admin and run the Workspace setup saves before treating that slice as verified.

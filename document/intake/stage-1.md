# Stage 1 new-client conversation

- **App section:** intake
- **Branch:** `new-client-system-v1`
- **Updated:** 2026-10-07
- **Status:** On branch `new-client-system-v1`. Not deployed to the public site. Migrations applied to hosted Thornvine on 2026-10-07.

Stage 1 asks whether Thornvine understands an opportunity well enough to invite the client into deeper discovery. It does not scope a build, estimate it, or accept one.

## Routes

| Path | Who |
|------|-----|
| `/newclient` | The person with the link. Not linked from the public site. |
| `/newclient/review` | Thornvine admins (`thornvine_admin`). |
| `/newclient/review/:intakeId` | One intake, staff only. |

There is no button to these URLs on the landing page.

## What the client gets

“Who's this for?” and “What's this for?” use the same shape. “What sparked it?” accepts more than one answer. Back sits on the left of the bottom row and returns to the previous answer you already gave, already filled in. Next sits on the right for written answers and choices, and brings you back to the question you left. It stays secondary until there is something to continue with, then it is the primary button. One question at a time on a focused canvas: a quiet header (“Save and exit”, Introduction, Saved only after a real save), the active question, and only the widget that question needs. Previous answers stay in the session and shape the next question. There is no conversation drawer. Clients edit what was collected on the stage-end summary, then choose “Send for review.”

After a successful submit the heading is “Your idea is ready for our review.” The status is “Awaiting Thornvine review.” Stage 2 stays locked. An invite shows a handoff note, not a Stage 2 experience.

References are optional chips inside the composer (link or file), with uploading, attached, failed, and retry. When no live model is connected, a quiet line says “This introduction saves your answers for our team to review.”

Access is the signed-in user id. A guessable intake id or a matching email does not open someone else’s draft. New visitors get an anonymous session (`signInAnonymously`). The hosted project must enable anonymous sign-ins. Local `supabase/config.toml` sets `enable_anonymous_sign_ins = true` for local stacks only.

## Staff

The review desk lists intakes and opens a detail view: submitted snapshot, transcript, references, unknowns, an advisory fit line, internal notes, a client-facing message, and Stage 2 direction. Decisions: invite, request clarification, hold, decline. Invite means deeper discovery, not a build contract. Clarification reopens the same intake; the next submit writes a new snapshot and does not edit the old one. Internal notes are not in the client snapshot and are omitted from `intake_state` unless the caller is an admin.

No email is sent.

## Data

Migrations: `supabase/migrations/20261007143000_new_client_stage1.sql` and `supabase/migrations/20261007163000_intake_remove_reference.sql`.

Tables: `intakes`, `intake_messages`, `intake_fields`, `intake_submissions`, `intake_reviews`, `intake_references`. Private Storage bucket `intake-references` (8 MB; png, jpeg, webp, pdf, plain text).

Writes go through `intake_start`, `intake_apply_turn`, `intake_submit`, `intake_review`, `intake_add_reference`, and `intake_remove_reference`. Clients cannot update status, unlock Stage 2, or edit snapshots.

## Conversation engine

`apps/web/src/features/new-client/orchestrator.ts` is the labeled development adapter. It is not a live model.

`supabase/functions/intake-turn` calls a model only when the edge secret `INTAKE_MODEL_API_KEY` is set. Optional: `INTAKE_MODEL_URL`, `INTAKE_MODEL_NAME`. These are not `VITE_` variables. If the function is missing or the key is absent, the page uses the development adapter and the quiet review notice above. It does not present that mode as a live model.

The database rejects unknown widget types. The UI renders a fixed registry. It does not render model HTML.

## Checks on 2026-10-07

- `node --experimental-strip-types src/features/new-client/orchestrator.test.ts` passed. Covers one message filling several goals, not repeating the idea question, an unknown answer, summary correction, inferred fields blocking submit, rejecting an unknown widget, Next advancing to “What sparked it?”, “Not sure yet” continuing, a revision returning to “What's this for?”, and the purpose choices.
- `node --experimental-strip-types src/features/new-client/questionCopy.test.ts` passed. “Who's this for?” and “What's this for?” share one shape.
- `tsc -b` and `oxlint` passed for the web app.
- Headless Edge at desktop and mobile widths rendered `http://127.0.0.1:5173/newclient`. The page used the design-system alert and stopped with “Anonymous sign-ins are disabled” from the hosted Thornvine project. The conversation could not continue, and no intake rows were written.
- `/newclient/review` without a staff session showed the review-desk sign-in card.
- The public home page HTML contained no `newclient` link.
- 2026-10-07: `supabase db push --linked` applied `20261007143000_new_client_stage1.sql` to Thornvine `dzywymkjvfxsbimyxmhu`. `intakes`, `intake_messages`, `intake_fields`, `intake_submissions`, `intake_reviews`, and `intake_references` have row level security on. Bucket `intake-references` is private. An earlier check that day stopped on disabled anonymous sign-ins. A later fresh profile saved turns; see the audit line below.
- 2026-10-07: The client canvas was checked in headless Edge at 1440, 390, and 320 CSS pixels using a temporary local fixture (removed afterward). First question, populated composer with a reference chip, choice selection, failed upload plus failed send, summary, and awaiting-review all rendered in the new layout. Live save was exercised later that day in the audit line below.
- 2026-10-07: `supabase db push --linked` applied `20261007163000_intake_remove_reference.sql` to Thornvine `dzywymkjvfxsbimyxmhu`. Clients can remove a reference while the introduction is still open.
- 2026-10-07: Next and Back replace the current question. Headless Edge at `http://127.0.0.1:5173/newclient` counted one heading through send, Next, Back, a second Back, Return, and Next from a revision. The earlier stack came from drawing Next into a slot the page also owned, which left previous questions mounted.
- 2026-10-07 audit: a fresh headless Edge profile saved turns from the idea through “What's this for?”, then Back, Next, and a second Back. The second Back still opened “Who's this for?” with the earlier choice filled in and Next enabled. Written answers use Next. There is no round send button.

## Still required before this is live

1. Deploy `intake-turn` only if a live model is wanted, with `INTAKE_MODEL_API_KEY` as an edge secret. A fresh anonymous session was able to save turns on 2026-10-07.
2. This route is not linked from the public site, and it is not on `main`.

---
name: notion-roadmap
description: >-
  Update the Thornvine Notion roadmap after each prompt. Use at the end of
  every user prompt that changes planned, implemented, or verified work, and
  create the roadmap page when it is missing.
---

# Notion roadmap after each prompt

After each prompt, update the Notion roadmap. Create it if it does not exist.

## Pages

- **Hub:** https://app.notion.com/p/3eb9d506006880bcaf86d4c2f8eb7c60
- **Roadmap:** https://app.notion.com/p/3eb9d5060068816c95fade2a67b6454c
- **Delivery plan:** https://app.notion.com/p/3eb9d506006881c388c3d5c7d4433656

## Required after each prompt

1. Fetch the Roadmap before editing. If that page is missing, create a child page titled `Roadmap` under the hub, then link it from the hub.
2. Update the Roadmap in place when the prompt changes planned work, implementation, or verification. Skip the edit only when nothing in those three states changed.
3. Keep **Planned**, **Implemented**, and **Verified** separate. Verified requires a named check and result. A passing build does not verify launch or a public URL.
4. Name the repo, branch, and commit. Say when work is only in the working tree.
5. Do not paste secrets, tokens, or `.env` values. Environment notes use variable names only.
6. Do not mark a TV task complete unless its acceptance on the delivery plan is met. Append a short dated handoff there when status moves.
7. Preserve unrelated hub and delivery-plan text. Do not replace a whole page when a targeted edit is enough.

## Status words

Unknown, Not started, In progress, Implemented—unverified, Verified, Blocked.

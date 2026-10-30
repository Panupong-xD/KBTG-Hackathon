---
name: check
description: Run every project check before saying work is done or before a commit/push — typecheck, JS tests, ML tests when ml/ changed, npm audit, and a scan of the diff for real brand names and secrets.
---

Run the checks below from the repo root, then report one line per check (pass/fail, and the failing output if any). Do not fix anything unless the user asks.

1. `npm run check` (typecheck + `scripts/*.test.mjs`).
2. If `git diff --name-only HEAD` or untracked files include anything under `ml/`: `npm run check:ml`. If `ml/.venv` is missing, say so and show the setup command from `ml/AGENTS.md` instead of installing.
3. `npm audit --omit=dev`.
4. Scan the uncommitted diff (`git diff HEAD` plus untracked files) outside `docs/`:
   - Real bank, organizer or banking-product names/logos (rule 1 in `AGENTS.md`). Search case-insensitively for `kbank`, `kasikorn`, `กสิกร`, `kbtg`, `k plus`, `k-plus`, `kplus`, `k-epocket`, `my budget`.
   - Credential-looking values: `password=`, `secret`, `token`, `api_key`, private-key headers, and any new `NEXT_PUBLIC_` variable. Report the location only, never print a matched value.
5. If the diff touches `src/` UI, remind the user to look at the page in `npm run dev` (Claude can use the `web` config in `.claude/launch.json`).

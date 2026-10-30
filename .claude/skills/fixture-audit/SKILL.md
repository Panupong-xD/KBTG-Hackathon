---
name: fixture-audit
description: Check that the shared example numbers (฿9,000 / ฿3,500 / ฿8,000 in 12 days / ฿280 a day / ฿250 / 86% over 30 days, etc.) are consistent across the site, README and docs. Use after changing numbers, copy, or the fixture.
---

The source of truth is the fixture in `src/lib/pocket-saving.ts` (rule 3 in `AGENTS.md`). Read it first and list its values.

Then search for each value and its formatted variants (`9000`, `9,000`, `฿9,000`; `86%`, `87%`; Thai and English wording) in:

- `src/` — components and `src/data/` should derive numbers from the fixture rather than hard-coding them. Flag hard-coded copies even when they currently match.
- `README.md` sections "Shared example" and "Simple two-step interface".
- `docs/03_CURRENT_PRODUCT_DIRECTION.md`.

Report a table: value, fixture, where it appears, mismatch or hard-coded. Also flag:

- the illustrative probability being shown as still valid after a save or overspend (it must show that it needs reassessment);
- pending income counted as current cash;
- the 30-day horizon confused with the 12 days until income.

Do not edit anything unless the user asks. `docs/01` and `docs/02` are historical; mention mismatches there only briefly.

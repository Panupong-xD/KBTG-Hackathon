---
name: demo-screenshot
description: Capture the phone mockup in every demo state (home, overview details, saving, choose Pocket, saved, My Finance, Account Summary, Customize) as same-size PNGs for slides and the demo video, then check them for real brand names. Use when the user wants demo screenshots or after UI changes that the slides show.
---

1. Make sure the dev server answers at http://localhost:3000 (start `npm run dev` in the background if not; Claude can also use the `web` config in `.claude/launch.json`).
2. Run `npm run screenshots`. It drives a headless local Chrome (`scripts/demo-screenshots.mjs`, no extra dependency) and writes `screenshots/01-home.png` … `10-customize-preview.png` at 1440×1000, 2× density, so new files can replace old ones on the slides. `screenshots/` is git-ignored. Set `OUT_DIR`, `DEMO_URL` or `CHROME_PATH` if needed.
3. If a scene fails with "could not find …", the UI changed: update that scene's selector or button text in `scenes` in the script, then run again.
4. Open every PNG and check:
   - no real bank, organizer or banking-product name or logo (rule 1 in `AGENTS.md`); the KaTang mark and generic "Pocket" wording are fine;
   - the numbers match the fixture in `src/lib/pocket-saving.ts` (฿280 budget, ฿250 spent, save ฿30, 86% shown only before saving or editing the plan); `10-customize-preview` confirms the guessed phone bill and picks the medium goal, so it shows ฿250 (เดิม ฿280) and ชวนเก็บ ฿40;
   - nothing is cut off, mid-animation or covered by an unintended dialog.
5. Report the file paths and any problem found, and send the images to the user. Do not commit them.

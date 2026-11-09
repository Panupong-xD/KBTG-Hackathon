# กะตังค์ (KaTang) — Cash-flow & Pocket Co-pilot

A bank-app feature concept for First Jobbers with variable income such as freelance work or side gigs. It suggests how much is safe to spend today, shows an illustrative chance that money lasts, and invites the user to save into a Pocket they choose. Salaried users are a simpler case of the same engine. The segment remains provisional pending further survey and interviews.

The website is branded **กะตังค์ (KaTang)**. README, `docs/` and the `ml/krunway` package still use the earlier name **K-Runway**; they are the same project.

## Public demo

The demo is public at **https://k-runway.vercel.app/**. The time-window gate and team password were removed on 9 November 2026, so there is no Proxy, login page or `DEMO_TEAM_PASSWORD`. Page metadata still asks search engines not to index the site (`robots: noindex, nofollow`).

The demo is browser-only: no AI API, banking API or database. Every number is a fixture in `src/lib/pocket-saving.ts` and resets on reload. No money moves and no account is opened.

## Naming and data rules

The public interface, share metadata, mockups and browser assets use generic terms such as **banking app**, **category budgeting** and **Pocket**. Do not add official bank, organizer or banking-product names or logos. The KaTang name and mascot identify a concept prototype only. Names in `docs/` are historical notes, not website content.

Do not add real customer data, individual survey answers, credentials or secrets to source files, `public/`, share metadata or `NEXT_PUBLIC_` variables. The repository is public. Environment files and private-key formats are ignored by Git, and production browser source maps are disabled. See the [security review](docs/04_SECURITY_REVIEW.md).

## What the demo shows

**Phone home: two swipe cards only** (no third card or scenario toolbar):

1. **Financial overview:** balance, today's spending limit, budget difference, days until expected income and the illustrative 30-day probability. The information button explains pending income, reserved bills, the safety buffer and accumulated funds.
2. **Save first:** at the start of the day the card offers to save part of today's limit. The user either saves now (choose Pocket → confirm → success, and today's limit drops by the amount saved) or chooses not to save (no money moves, the full limit stays spendable, and the choice can be changed the same day).

**My Finance** (opened from the phone and from the Summary step of the walkthrough):

- **Home:** today's limit with the 86%* chance, a short last-round summary card and a prompt to check the income day. The full round summary opens from the card.
- **Account Summary:** where today's limit comes from and a 30-day timeline (spend per plan, buffer for late wages, after income arrives).
- **Customize:** correct the income day, mark extra income as certain or maybe, confirm or reject a bill the system guessed, edit bill amounts and due dates, and pick a saving goal (low/medium/high = 10/15/20%). A preview shows the new limit before saving. After saving, the chance shows that it needs reassessment.

Alerts, end-of-round handling and 24-hour reversal remain concepts, not demo interactions.

## Shared example

The single example used across the site, README and `docs/03`:

- Opening total ฿9,000 = main Pocket ฿5,500 + reserved bills (rent) ฿3,500.
- Pending wage ฿8,000 expected in 12 days (day 13 of the demo month). Pending income is never counted as cash.
- Today's limit ฿280/day = (main Pocket ฿5,500 − safety buffer ฿1,000) ÷ 16 days (12 days until the wage + 4 days late buffer) ≈ ฿281, rounded down to ฿10.
- Illustrative chance that money lasts: **86% over 30 days**. It is a demo value, not a trained-model prediction. The 30-day horizon is separate from the 12 days until income.
- Save-first offer: 10% of today's limit, rounded to ฿10 = ฿30. The goal range is 10–20% with no per-transfer cap, and only if bills, the buffer and spending until income stay covered.
- Spent today ฿250. Previous accumulated funds ฿100.
  - **Saved ฿30:** today's limit becomes ฿250, so the difference is ฿0 and accumulated funds stay ฿100. The main Pocket goes to ฿5,220 and the chosen Pocket gains ฿30. The account total stays ฿8,750.
  - **Not saved:** today's limit stays ฿280, ฿30 is left over, and accumulated funds become a virtual ฿130 inside the main Pocket. Account total ฿8,750.
- Last round (September, illustrative): within plan 22/30 days, wage 6 days late, plan lowered for 5 days, ฿100 carried into this round.
- Customize example: extra income ฿1,500 around the 8th (marked "maybe", so not counted), phone bill ฿499 on the 10th that the system guessed (counts only after the user confirms).

The 10–20% range and ฿1,000 buffer are team choices, not bank rules. After a save or a plan edit, the phone shows that the risk needs reassessment instead of the old percentage. A production system needs real recalculation, liquidity checks and atomic ledger updates. If any number changes, update the fixture, this section and `docs/03` together.

## Documents

- [Current product direction and demo scope](docs/03_CURRENT_PRODUCT_DIRECTION.md) — newest; wins over 01/02 when they differ
- [Security review](docs/04_SECURITY_REVIEW.md)
- [ML + Monte Carlo prototype on simulated data](ml/README.md)
- [Earlier architecture proposal](docs/01_TECHNICAL_AND_DATA_ARCHITECTURE.md) and [earlier workflow proposal](docs/02_DATA_SCIENCE_AND_SYSTEM_WORKFLOW.md) — historical

The initial eight-person survey stays in internal notes only; the sample is too small to present as evidence. FCA's 2018 findings on overdraft alerts support the idea of timely notifications; they are not a claim that KaTang reduces Thai debt. Results in `ml/` come from simulated data and are not accuracy claims about real users.

## Project structure

- `src/app/` — the single landing page (Next.js App Router) and metadata
- `src/components/` — landing sections, the phone mockup (`BankPhoneMockup`), My Finance, Account Summary, Customize and Round Summary (CSS Modules + Tailwind v4)
- `src/lib/pocket-saving.ts` — the shared fixture, budget formula, saving offer and saving reducer
- `src/data/` — walkthrough steps and the illustrative last round
- `scripts/` — tests (`*.test.mjs`), CSS build, brand icon generator and the screenshot script
- `ml/` — Python ML + Monte Carlo prototype (own rules in `ml/AGENTS.md`)

## Development and checks

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev          # builds CSS, then serves http://localhost:3000
npm run check        # typecheck + all JS tests
npm run check:ml     # ML tests (create ml/.venv first, see ml/README.md)
npm run screenshots  # phone mockup in every demo state → screenshots/ (dev server must be running)
npm run build
npm audit --omit=dev
```

No lint script is configured. JS tests cover the ฿280 budget formula and user corrections, the save-first offer and goal rates, the 10–20% rule and liquidity limit, saving/not saving/cancelling, balance conservation, overspending, invalid inputs, demo dates rolling into November, and the CSS build.

This is a non-official innovation prototype, not a bank website or financial service.

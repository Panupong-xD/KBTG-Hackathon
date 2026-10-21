# K-Runway — Cash-flow & Pocket Co-pilot

A bank-app feature concept for First Jobbers aged 22–30, initially focusing on variable income such as freelance work. The segment remains provisional pending survey and interviews. Salaried users are a simpler case of the same engine.

## Simple two-step interface

1. Financial overview: balance, today’s spending limit, budget difference, estimated time to the next income, and illustrative 30-day probability. Pending income and bills are disclosed through the existing information button.
2. Saving: a goal card, a quiet accumulated-balance row, and the original choose-Pocket → confirm → success flow.

The two cards retain the original equal sizing, swipe, pagination, keyboard controls, phone frame and colors. There is no third card, scenario toolbar, round-settings screen, carry-forward button or undo flow. End-of-round saving/carrying and risk alerts remain conceptual explanations, rather than additional demo interactions.

## Shared example

Opening total ฿9,000 consists of main Pocket ฿5,500 and reserved bills ฿3,500. Pending income ฿8,000 expected in 12 days is not counted as cash. The illustrative budget is ฿280/day and the probability is 87% over 30 days, not a trained model prediction.

Spending ฿230 leaves an account total of ฿8,770 and daily surplus ฿50. Previous accumulated funds ฿100 plus today’s ฿50 creates a virtual ฿150 inside the main Pocket. Saving ฿50 decreases the main Pocket, increases the chosen destination and reduces accumulation to ฿100 without changing the total.

Overspending first consumes previous accumulation. Spending ฿340 exceeds the budget by ฿60 and leaves ฿40 accumulated, without increasing or reducing the next budget. An uncovered shortfall is spread over the remaining 29 days. A confirmed allocation cannot be repeated, and cancelling selection does not move money.

The provisional ฿150 cap and ฿1,000 buffer are team choices, not bank rules. Current cash must cover the buffer and spending before expected income; reserved bills remain separate. A production system needs recalculation of risk and atomic ledger checks. Reloading resets this browser-only prototype.

Pain points, walkthrough, and architecture use this same fixture: opening ฿9,000, bills ฿3,500, pending ฿8,000 expected in 12 days, budget ฿280/day, and illustrative 87% over 30 days. Pending income is never counted as current cash. The probability is a prototype input, not proof of model quality.

## Documents and evidence

- [Current concept and two-step scope](docs/03_CURRENT_PRODUCT_DIRECTION.md)
- [Earlier architecture proposal](docs/01_TECHNICAL_AND_DATA_ARCHITECTURE.md)
- [Earlier workflow proposal](docs/02_DATA_SCIENCE_AND_SYSTEM_WORKFLOW.md)

FCA’s 2018 findings on overdraft alerts are included as supporting evidence for timely notifications, not a claim that K-Runway reduces Thai debt by 25%. User consent and data-access requirements are proposed safeguards, not certifications.

## Development and checks

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev
npx tsc --noEmit --noUnusedLocals --noUnusedParameters --incremental false
node --test scripts/pocket-saving.test.mjs
npm run build
```

CSS is generated before development and builds. No lint script is configured. Tests cover accumulation, cancellation, conservation, duplicate confirmation, overspending, liquidity limits and invalid inputs.

This is a non-official innovation prototype, not a bank website or financial service.

# K-Runway — Cash-flow & Pocket Co-pilot

A bank-app feature concept for First Jobbers with variable income such as freelance work or side gigs. The segment remains provisional pending survey and interviews. Salaried users are a simpler case of the same engine.

## Public demo access and naming

Production is temporarily closed to the public until **7 November 2026, 00:00 Asia/Bangkok**. Team members use the same link and enter a shared preview password. A server-side Proxy protects every path, including bundles, images and RSC requests. The public page remains HTTP 503 with `no-store` headers. It reopens automatically at that time without a scheduled redeployment, stays public for pitch day only, and closes again automatically at **8 November 2026, 00:00 Asia/Bangkok**; team login keeps working after that. Local `npm run dev` remains available for development; `npm run start` follows the production restriction.

The current public URL is **https://k-runway.vercel.app/**. Set **`DEMO_TEAM_PASSWORD`** in the hosting project's server environment for Production and any Preview environments that need team access, then redeploy. The team chose a memorable password for this temporary preview (accepted length 8–128; ordinary symbols are supported, with no control characters or surrounding whitespace). Share it privately with the team; never put the value in Git, browser code, a URL or a `NEXT_PUBLIC_` variable. If missing or malformed, team access stays closed. This is a new preview-access password, not an AI/banking API key.

Successful login issues an HMAC-signed, `HttpOnly`, `Secure`, `SameSite=Strict`, host-only cookie for at most eight hours, capped at reopening when issued before it. The password is not stored in the cookie. Rotating the environment password and redeploying invalidates existing sessions. Visit `/team-access` to sign out. All restricted responses, including authenticated content, disable caching. Login/logout accept only same-origin POST requests. The shared password is intended for this short-lived concept preview, not customer authentication; there is no distributed login-attempt limiter. The eight-character minimum follows the project owner’s preference for this temporary concept preview; it is not a guarantee against password guessing.

The public interface, share metadata, mockups and browser assets use generic terms such as **banking app**, **category budgeting** and **Pocket**. Do not add official bank, organizer or banking-product names or logos. The custom project name and mark identify a concept prototype only. Historical architecture documents are background notes, not public website content.

## Security and data

The demo does not invoke an AI API, banking API or database. AI/ML descriptions explain the proposed product; they are not live integrations. No application API key is required. Balances and Pocket entries are local fixtures, reset on reload, and the account label explicitly says it is an example. Do not add real customer data, credentials or secrets to source files, `public/`, share metadata or browser environment variables.

Environment files and private-key formats are ignored by Git. Production browser source maps are disabled, and production builds must pass TypeScript validation. Before publishing changes, run the checks below and `npm audit --omit=dev`. See [security review](docs/04_SECURITY_REVIEW.md) for the latest scope and findings.

## Simple two-step interface

1. Financial overview: balance, today’s spending limit, budget difference, estimated time to the next income, and illustrative 30-day probability. Pending income and bills are disclosed through the existing information button.
2. Saving: a goal card, a quiet accumulated-balance row, and the original choose-Pocket → confirm → success flow.

The two cards retain the original equal sizing, swipe, pagination, keyboard controls, phone frame and colors. There is no third card, scenario toolbar or round-settings screen. The saving card offers a choice: save today's surplus into a chosen Pocket, or skip saving and carry it forward as spendable money in the main Pocket (no money moves, and the choice can be changed). End-of-round handling and risk alerts remain conceptual explanations, rather than additional demo interactions.

## Shared example

Opening total ฿9,000 consists of main Pocket ฿5,500 and reserved bills ฿3,500. Pending income ฿8,000 expected in 12 days is not counted as cash. The illustrative budget is ฿280/day and the probability is 86% over 30 days, not a trained model prediction.

Spending ฿250 leaves an account total of ฿8,750 and daily surplus ฿30. Previous accumulated funds ฿100 plus today’s ฿30 creates a virtual ฿130 inside the main Pocket. Saving ฿30 decreases the main Pocket, increases the chosen destination and reduces accumulation to ฿100 without changing the total.

The website uses only this ฿250 spending example, with no alternative-scenario controls. The underlying accumulation helper still covers overspending in its unit tests. A confirmed allocation cannot be repeated, and cancelling selection does not move money.

The provisional 10–20% saving range of today’s available amount, capped at ฿150 per transfer, and ฿1,000 buffer are team choices, not bank rules. Current cash must cover the buffer and spending before expected income; reserved bills remain separate. A production system needs recalculation of risk and atomic ledger checks. Reloading resets this browser-only prototype.

Pain points, walkthrough, and architecture use this same fixture: opening ฿9,000, bills ฿3,500, pending ฿8,000 expected in 12 days, budget ฿280/day, and illustrative 86% over 30 days. Pending income is never counted as current cash. The probability is a prototype input, not proof of model quality. The 30-day horizon is distinct from the next expected income in 12 days. After saving, the phone shows that risk needs reassessment instead of retaining the illustrative percentage.

## Mentor alignment (23 October 2026)

The existing layout and two-step demo are preserved. Pain-point cards pair the problem K-Runway aims to address with its proposed solution. The initial eight-person survey is retained in internal notes only; its sample is too small to present as supporting evidence on the website. The site presents K-Runway as an extension of category budgeting and clarifies the proposed data and ML/Monte Carlo pipeline. The validation-plan block has been removed from the website; model backtesting, calibration and UI A/B testing remain internal plans. Alerts and 24-hour reversal remain outside this browser prototype.

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
node --test scripts/demo-access.test.mjs
npm audit --omit=dev
npm run build
```

CSS is generated before development and builds. No lint script is configured. Tests cover accumulation, cancellation, conservation, duplicate confirmation, overspending, liquidity limits and invalid inputs.

This is a non-official innovation prototype, not a bank website or financial service.

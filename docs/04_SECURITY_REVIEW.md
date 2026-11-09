# Demo security review - 27 October 2026 (updated 9 November 2026)

## Application keys and actual data

No application API keys, access tokens or private keys were found in the project, the reachable local Git history, or the browser-facing files. No environment/private-key files are tracked. Since the access gate was removed on 9 November 2026, the app needs no environment secret at all; `DEMO_TEAM_PASSWORD` is unused and can be deleted from the hosting environment.

Source inspection found no model/API invocation, database connection, external transaction request or analytics transmission. Financial interactions run against local fixtures through React state and a reducer. No bank account is opened and no money is transferred. The account label explicitly identifies an example account.

The app loads font styles from a public font service and links to a public research paper. These are external resources, not authenticated app integrations. The photograph and custom SVG mark were visually inspected for bank/product logos.

The secret scan checks common provider-token/private-key formats and credential assignments, reporting locations without printing matched values. This is a targeted code/build review; it does not inspect the hosting account's environment variables, access logs, unreachable/deleted Git objects or copies already downloaded by third parties.

## Dependency findings and fixes

The initial `npm audit --omit=dev` reported three affected packages: the framework, image-processing dependency and source-map dependency. Compatible security updates were installed through `npm audit fix --omit=dev`.

The updated lockfile pins the framework to **16.4.3** and the image-processing package to **0.35.5**. The follow-up npm audit reported **0 known vulnerabilities**. This result is specific to the advisory database and lockfile checked on this date.

## Public access and content

**Current state (9 November 2026):** the production site is public at all times. There is no Proxy, login page, session cookie or shared password. Page metadata still sets `robots: noindex, nofollow`, which asks search engines not to list the site but does not restrict access.

**History:** from 27 October a server-side Proxy blocked unauthenticated production requests (pages, RSC/data, bundles, images and public files) with an HTTP 503 page, except on pitch day (7 November 2026, Asia/Bangkok). Team members could sign in with a shared password checked in constant time, which issued an eight-hour HMAC-signed `__Host-` cookie. The team removed this gate, its tests and the `DEMO_TEAM_PASSWORD` dependency after the pitch so the demo stays open. The code remains in Git history (removed in commit `e168162`).

Bank/organizer/product names were removed from rendered text, metadata used for link previews, generated browser code and component/CSS identifiers. Open Graph and Twitter descriptions use the same generic wording as the ordinary description. An example label replaces the masked account number.

The Git repository is public, and anything committed (including history) should be treated as published. Repository visibility and hosting-account settings are separate from the website.

## Validation

- TypeScript validation and the production build.
- Saving tests: the ฿280 budget formula and user corrections, save-first offer and goal rates, the 10–20% rule and liquidity buffer, saving/not saving/cancelling, balance conservation, overspending and invalid inputs.
- A scan of source and rebuilt browser assets for bank/organizer/product names and credential formats, and a follow-up npm audit.
- The gate's boundary and team-access tests were deleted with the gate on 9 November 2026.

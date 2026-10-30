# Demo security review - 27 October 2026

## Application keys and actual data

No application API keys, access tokens or private keys were found in the project, the reachable local Git history, or the browser-facing files checked before adding team access. No environment/private-key files are tracked. Team access now requires one new server-side environment secret, `DEMO_TEAM_PASSWORD`; its value must stay out of source and browser assets. It is unrelated to AI or banking APIs.

Source inspection found no model/API invocation, database connection, external transaction request or analytics transmission. Financial interactions run against local fixtures through React state and a reducer. No bank account is opened and no money is transferred. Team access adds a signed session cookie only; it stores no financial data or password. The account label explicitly identifies an example account.

The app loads font styles from a public font service and links to a public research paper. These are external resources, not authenticated app integrations. The photograph and custom SVG mark were visually inspected for bank/product logos.

The secret scan checks common provider-token/private-key formats and credential assignments, reporting locations without printing matched values. This is a targeted code/build review; it does not inspect the hosting account's environment variables, access logs, unreachable/deleted Git objects or copies already downloaded by third parties.

## Dependency findings and fixes

The initial `npm audit --omit=dev` reported three affected packages: the framework, image-processing dependency and source-map dependency. Compatible security updates were installed through `npm audit fix --omit=dev`.

The updated lockfile pins the framework to **16.4.3** and the image-processing package to **0.35.5**. The follow-up npm audit reported **0 known vulnerabilities**. This result is specific to the advisory database and lockfile checked on this date.

## Access restriction and public content

Unauthenticated production requests are blocked server-side until **7 November 2026 at 00:00 Asia/Bangkok** and again from **8 November 2026 at 00:00 Asia/Bangkok** (added 30 October), so the site is public on pitch day only. After closing, the pause page says the demo has ended and team login remains available. The restriction covers pages, RSC/data requests, bundles, images and direct public-file paths. The self-contained pause page uses HTTP 503 and includes a team login form only when the server password is configured. Missing/invalid configuration fails closed. Development mode remains usable locally.

The password is checked on the server with a constant-time digest comparison. Login accepts only same-origin, bounded URL-encoded POST bodies; credentials are never reflected in HTML or application logs. Sessions are HMAC-signed with domain separation, expire after eight hours or at reopening (whichever comes first), and use `HttpOnly`, `Secure`, `SameSite=Strict`, `Path=/` and the `__Host-` cookie prefix. Password rotation invalidates sessions after redeployment. Logout is a same-origin POST that clears the cookie; it does not revoke copies of an already issued cookie before expiry. Authenticated and unauthenticated restricted responses disable browser/CDN caching. The form's CSP restricts submission to the same origin.

This is a temporary shared-password preview gate, with no database or distributed brute-force limiter. The project owner chose a memorable password with an eight-character minimum (accepted length 8–128; ordinary symbols are supported, with no control characters or surrounding whitespace). It is also the session-signing secret. A short predictable password can be guessed; signed cookies do not prevent that. Do not reuse a personal password. This gate is not a customer identity system. The production domain is now `k-runway.vercel.app`.

Bank/organizer/product names were removed from rendered text, metadata used for link previews, generated browser code and component/CSS identifiers. Open Graph and Twitter descriptions use the same generic wording as the ordinary description. An example label replaces the masked account number.

The Git repository is public. Restricting the website does not restrict the repository or revoke access to previous deployments and cached/downloaded copies. Repository visibility and hosting-account settings are separate from the application gate.

## Validation

- TypeScript validation and the production build.
- Existing saving tests: cancellation, confirmation, duplicate confirmation, balance conservation, accumulation and liquidity limits.
- Reopening and closing boundary tests immediately before, exactly at, and after midnight in Bangkok; invalid-clock values fail closed.
- Team-access tests for missing/invalid configuration, incorrect passwords, forged/expired sessions, password rotation, cross-origin requests and malformed/oversized bodies.
- HTTP checks for the page, assets, RSC requests and arbitrary file paths during the production pause, plus generic metadata and interactive saving in local development.
- A second scan of the rebuilt browser assets and a follow-up npm audit.

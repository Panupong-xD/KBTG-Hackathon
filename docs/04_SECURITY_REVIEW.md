# Demo security review - 27 October 2026

## Application keys and actual data

No application API keys, access tokens or private keys were found in the current project, the reachable local Git history, or the browser-facing files checked. There are no project-root environment files and no tracked environment/private-key files.

Source inspection found no model/API invocation, database connection, external transaction request, analytics transmission or browser persistence. The financial interactions run against local fixtures through React state and a reducer. No bank account is opened and no money is transferred. The previous masked account label was replaced with an explicit example-account label.

The app loads font styles from a public font service and links to a public research paper. These are external resources, not authenticated app integrations. The photograph and custom SVG mark were visually inspected for bank/product logos.

The secret scan checks common provider-token/private-key formats and credential assignments, reporting locations without printing matched values. This is a targeted code/build review; it does not inspect the hosting account's environment variables, access logs, unreachable/deleted Git objects or copies already downloaded by third parties.

## Dependency findings and fixes

The initial `npm audit --omit=dev` reported three affected packages: the framework, image-processing dependency and source-map dependency. Compatible security updates were installed through `npm audit fix --omit=dev`.

The updated lockfile pins the framework to **16.4.3** and the image-processing package to **0.35.5**. The follow-up npm audit reported **0 known vulnerabilities**. This result is specific to the advisory database and lockfile checked on this date.

## Access restriction and public content

Production requests are blocked server-side until **7 November 2026 at 00:00 Asia/Bangkok**. The restriction covers the page, RSC/data requests, static bundles, images and direct public-file paths. The pause page is self-contained, uses HTTP 503, disables caching and indexing, and does not include the demo content. It requires no additional secret or client-side password check. Development mode remains usable locally.

Bank/organizer/product names were removed from rendered text, metadata used for link previews, generated browser code and component/CSS identifiers. Open Graph and Twitter descriptions use the same generic wording as the ordinary description. An example label replaces the masked account number.

The Git repository is public. Restricting the website does not restrict the repository or revoke access to previous deployments and cached/downloaded copies. Repository visibility and hosting-account settings are separate from the application gate.

## Validation

- TypeScript validation and the production build.
- Existing saving tests: cancellation, confirmation, duplicate confirmation, balance conservation, accumulation and liquidity limits.
- Reopening boundary tests immediately before, exactly at, and after midnight in Bangkok; invalid-clock values fail closed.
- HTTP checks for the page, assets, RSC requests and arbitrary file paths during the production pause, plus generic metadata and interactive saving in local development.
- A second scan of the rebuilt browser assets and a follow-up npm audit.

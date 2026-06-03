# ADR 0003 — Astro static-site generator with strict zero-JS-by-default

**Status:** Accepted
**Date:** 2026-06-02
**Reversibility:** two-way door — output is just HTML/CSS/JS; could switch generator without re-architecting the corpus
**Prime directive(s) served:** §1.3 (integrity), §1.5 (operability), §1.6 (citizen reach via 2G/cheap devices)

## Decision

Site is generated with Astro in `static` output mode. Default JS budget per page is **0 KB**. Interactive islands are opt-in and limited to the language switcher and (future) site search. Deployed to a CDN (Cloudflare Pages default subdomain for v1).

## Context / forces

Framework §3 baseline. Static-first is a security and resilience decision, not a performance preference: no server runtime to compromise, no PHP/Node attack surface, no admin panel to capture, and the bandwidth budget for a 2G mobile-first audience.

## Alternatives considered

- **A. Next.js / Remix / SvelteKit (SSR-capable).** Rejected: pulls in a Node runtime, complicates CDN deployment, ships JS by default. Wrong defaults for this audience.
- **B. Hugo / Eleventy / Jekyll.** Strong alternatives. Astro selected for: TypeScript-first, Markdown + YAML content collections, idiomatic islands when needed (post-v1 search), excellent a11y defaults. Either Hugo or Eleventy would also have been acceptable.
- **C. Hand-rolled static HTML.** Rejected: re-implements layouts/i18n without buying anything.

## Trade-offs

Astro's defaults are good but transitive npm deps create supply-chain surface (RISK-09). Mitigation: pin everything; commit lockfile; minimal plugin list; audit pre-launch.

## Risks

Build non-determinism could undermine DoD #1 (reproducibility from clone).

## Mitigations

Set `SOURCE_DATE_EPOCH` in CI; disable Astro's content-hashed asset filenames where possible; CI runs the build twice from a fresh clone and diffs the output.

## Validation method

CI reproducibility check.

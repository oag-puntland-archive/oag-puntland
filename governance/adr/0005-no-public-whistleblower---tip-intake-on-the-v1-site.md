# ADR 0005 — No public whistleblower / tip intake on the v1 site

**Status:** Accepted
**Date:** 2026-06-02
**Reversibility:** two-way door — adding a digital route later requires only new pages, not architectural change
**Prime directive(s) served:** §1.1 (do no harm to sources) — highest directive

## Decision

v1 does not collect any source-identifying or source-protective information from the public. The legacy `/public-reporting-portal/` form is not migrated. Its replacement is the honest 'Reporting concerns about public funds' page — describing what the OAG can lawfully receive, what protections it cannot legally guarantee, and routing to a paper / in-person channel addressed to **The Auditor General, OAG Puntland** (by office, not by name).

## Context / forces

Red Line 1. Unknown D (whistleblower compellability) is unresolved; the safe default is that the OAG can be compelled to surrender source identities. The legacy site already promises 'fully committed to protecting the identities of whistleblowers' — a promise the institution cannot legally keep. That promise must not propagate to v1.

## Alternatives considered

- **A. Migrate the legacy form with stronger backend hardening (E2EE submission, no-log, etc.).** Rejected: hardening the FORM does not change the legal compellability of the institution; the promise remains a false promise.
- **B. Route to a state-hosted intermediary office (e.g., 'Internal Audit Manager').** Rejected: still state-hosted, still compellable, still Red Line 1.
- **C. Route to a named external CSO / journalist consortium.** Rejected for v1 — no such intermediary has been secured with a written agreement; naming one without their consent would be irresponsible.
- **D. Paper / in-person only, addressed to The Auditor General by office (selected).** Most conservative; smallest legal surface; matches international SAI convention; preserves the option to add a digital route post-launch once D is resolved and an intermediary is on file.

## Trade-offs

Citizens accustomed to the legacy digital portal experience a service regression. v1 copy must be honest about why.

## Risks

Legacy WordPress database may already contain submissions (RISK-02). This ADR does not solve that — see the Risk Register; flagged to owner for separate counsel-supervised review.

## Mitigations

v1 copy explicitly states: (a) what the OAG can do, (b) what it cannot legally promise, (c) the paper route, (d) the recommendation to consult a lawyer before disclosing.

## Validation method

Counsel review of the v1 copy pre-launch; post-launch resolution of Unknown D may unlock a higher-trust route.

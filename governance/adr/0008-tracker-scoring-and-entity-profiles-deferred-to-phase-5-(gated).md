# ADR 0008 — Tracker, scoring, and entity profiles deferred to Phase 5 (gated)

**Status:** Accepted
**Date:** 2026-06-02
**Reversibility:** two-way door (forward) — the feature can be added post-v1 without corpus redesign
**Prime directive(s) served:** §1.2 (institutional survival)

## Decision

v1 captures whatever recommendation/finding metadata is naturally present in the structured corpus, but **does not surface** a public-facing recommendation tracker, status indicators, entity-accountability profiles, or any score/colour-code over an auditee.

## Context / forces

Framework Red Line 4. Leading with the feature most likely to get the office defunded is a disqualifying error regardless of its quality. The tracker/profile are gated on (a) Unknown A resolution (publication authority for status-of-implementation claims) and (b) external/peer backing.

## Alternatives considered

- **A. Ship the tracker now, behind a 'beta' label.** Rejected: 'beta' does not survive screenshot-sharing; an auditee's lawyer reads the page, not the label.
- **B. Ship the tracker in 'view-only mode' (no status, just lists).** Rejected: a list of recommendations without status is misleading by what it doesn't say.
- **C. Capture data, defer surface to Phase 5 (selected).**

## Trade-offs

v1 looks less 'feature-rich' than peers' sites; the directive accepts that explicitly.

## Risks

Phase 5 work might be deprioritised; the tracker may not surface for a long time.

## Mitigations

Surface unlocks only with documented legal green light + peer/donor backing; methodology and right-of-reply published before launch.

## Validation method

Phase 5 gate check (Framework §6).

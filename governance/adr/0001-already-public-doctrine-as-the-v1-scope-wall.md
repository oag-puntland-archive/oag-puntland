# ADR 0001 — Already-public doctrine as the v1 scope wall

**Status:** Accepted
**Date:** 2026-06-02
**Reversibility:** two-way door — we can broaden scope when Unknown A resolves
**Prime directive(s) served:** §1.2 (institutional survival), §1.3 (record integrity), §1.4 (standards conformance)

## Decision

v1 renders only content the OAG has already lawfully made public on `oag.pl.so`. Every binary in `corpus/` traces to a row in `governance/provenance.csv` with a verifiable `source_url`, `sha256`, and `fetched_utc`. No new disclosures are introduced.

## Context / forces

Unknown A (publication mandate) is unresolved. The audit bill is still being brought into INTOSAI conformance and counsel has not ruled on what the OAG may newly publish. The deadline cannot wait on that ruling. Re-hosting already-public material under a better architecture is not a new act of publication and needs no new mandate.

## Alternatives considered

- **A. Wait for the publication-authority ruling before shipping anything.** Rejected: indefinite delay; the legacy site remains a Red-Line-1 honeypot in the meantime.
- **B. Ship a 'better website' that includes some judgement calls about what to highlight, partially blurring the line between re-hosting and new editorial.** Rejected: blurs the legal line, hands an adversary a pretext.
- **C. Already-public doctrine (selected).**

## Trade-offs

We constrain editorial freedom (no new findings, no derived rankings, no commentary) in exchange for legal cleanness. The v1 site looks comparatively spartan; that is intentional.

## Risks

A future change might tempt re-introducing 'helpful' editorial that crosses the line. Mitigation: pre-commit lint script can reject any binary in `corpus/` whose `source_url` doesn't resolve under `oag.pl.so`.

## Mitigations

Doctrine doc states the rule; provenance CSV is the audit trail; pre-commit lint (deferred to post-v1) makes it mechanical.

## Validation method

Every artifact has provable `oag.pl.so` lineage; counsel review post-launch confirms or constrains.

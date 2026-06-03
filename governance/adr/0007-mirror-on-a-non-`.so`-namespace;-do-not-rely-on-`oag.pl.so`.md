# ADR 0007 — Mirror on a non-`.so` namespace; do not rely on `oag.pl.so`

**Status:** Accepted
**Date:** 2026-06-02
**Reversibility:** two-way door — additional mirrors / a peer custodian add resilience without redesign
**Prime directive(s) served:** §1.2 (survival/independence), §1.3 (integrity/anti-suppression)

## Decision

The corpus is pushed to two non-`.so` mirrors: a public GitHub repository and a public Codeberg repository. Each release is also submitted as an archive snapshot to the Internet Archive Wayback Machine and `archive.today`. The deployed site footer publishes the mirror URLs and the most recent archive snapshot on every page, so that origin takedown is externally detectable.

## Context / forces

ASSUMPTION-C-01: the FGS via soNIC can revoke `pl.so`/`oag.pl.so` delegation unilaterally; seizure is in-scope at the namespace layer. WHOIS (2026-06-02) confirms the registry-side controls are held by the Federal Somali Ministry of Post and Telecommunications. Any anti-suppression guarantee that depends on a `.so` name is hollow.

## Alternatives considered

- **A. Custom `.org` domain registered through a non-Somali registrar (recommended long-term).** Out of v1 scope (24-hour cut); deferred to post-launch domain acquisition.
- **B. Mirror on a second `.so` host with different operational control.** Rejected: same registry lever applies.
- **C. Two off-`.so` Git mirrors + archive snapshots (selected).** Doctrinally cleanest; reproducible from clone; externally detectable.

## Trade-offs

Reliance on third-party Git hosts (GitHub is US-jurisdiction; Codeberg is German non-profit). Different jurisdictions = different threat models = some resilience by diversity.

## Risks

Both mirrors could in theory be compelled; archive snapshots are an additional resilience layer.

## Mitigations

Two-mirror diversity; public archive snapshots; the site openly publishes the mirror URLs so users discover them if origin disappears.

## Validation method

Takedown simulation in Gate-3 verifies that a fresh clone of either mirror reproduces the deployed site byte-for-byte and that archive snapshots are reachable.

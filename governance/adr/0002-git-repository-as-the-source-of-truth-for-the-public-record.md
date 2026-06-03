# ADR 0002 — Git repository as the source of truth for the public record

**Status:** Accepted
**Date:** 2026-06-02
**Reversibility:** two-way door — could migrate to LFS later without redesigning the public surface
**Prime directive(s) served:** §1.3 (record integrity), §1.5 (operability post-funding)

## Decision

The canonical public record is a Git repository (`corpus/` + `governance/`). The deployed website is a static derivative built from this corpus. The Git history is the audit trail of the public record itself.

## Context / forces

Framework §3 baseline. The legacy WordPress site's mislabel defect class arose because the canonical truth lived in mutable database rows, hand-curated post titles, and slug duplicates. A content-addressed, append-only, signed history makes both that defect class and silent tampering structurally harder to reintroduce.

## Alternatives considered

- **A. Continue WordPress with a clean-up.** Rejected: mutable DB + hand-curated taxonomy preserves the failure class; not credible to peer reviewers.
- **B. A mutable Postgres-backed CMS (Strapi/Directus/Ghost).** Rejected: shifts the defect class from WordPress to a different mutable store; harder to mirror; harder to operate post-funding (DoD #3).
- **C. Git corpus (selected).** Append-only, content-addressed, trivially mirrorable, operable from a single laptop.

## Trade-offs

Authoring requires structured-file editing skills until a workbench is built (ASSUMPTION-B-01). Mitigated by simple YAML schema + Markdown summaries.

## Risks

Large binary PDFs in Git history grow the repo over time; shallow clones for typical operation. **No Git LFS for v1** — total corpus is ~257 MB; well within GitHub's 1 GB free-tier per-repo limit, and the largest single file (42 MB) is under GitHub's 100 MB per-file limit.

## Mitigations

Lock package-tool-versions; commit `pnpm-lock.yaml`; in CI run `du -sh corpus/` and alert if >500 MB.

## Validation method

Reproducibility CI step builds the site twice from a fresh clone and diffs the output trees.

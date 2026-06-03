# ADR 0004 — No machine translation of audit content

**Status:** Accepted
**Date:** 2026-06-02
**Reversibility:** two-way door — when official translations land, they slot in without architectural change
**Prime directive(s) served:** §1.3 (integrity), §1.4 (standards conformance — no fabricated findings)

## Decision

Where one official language version of an audit report is missing, the v1 site renders only the language that exists and surfaces an honest 'official translation pending' placeholder. The site does not auto-translate any financial-audit content, ever. Plain-language summary cards are authored from each PDF's own summary chapter in the SAME language as that PDF — never cross-translated.

## Context / forces

Audit language is deliberately hedged. Machine translation manufactures certainty where the auditor wrote qualifications, and machine-translated financial findings can be defamatory. The v1 audience includes SAI peers who will reject the institution for this category of error.

## Alternatives considered

- **A. Auto-translate missing-language reports with a 'machine translation' warning.** Rejected: warning labels do not survive screenshot-sharing; the false finding spreads alone.
- **B. Render only paired reports; hide singletons.** Rejected: hides the existence of FY 2023 SO, harming the public record's transparency.
- **C. Render singletons with honest 'official translation pending' marker (selected).**

## Trade-offs

Bilingual parity is incomplete in v1 (FY 2023 has no English; legislation has no official English).

## Risks

A reader fluent only in the other language is under-served for those documents.

## Mitigations

EN/SO summary cards in BOTH languages exist for paired reports; for singletons, the summary card is in the available language only, with an explicit note.

## Validation method

Manual review pre-launch: no machine-translated string appears anywhere.

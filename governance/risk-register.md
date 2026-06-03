# Risk Register — v1 (24-hour cut)

Each row: **Description · Likelihood (L/M/H) · Impact (L/M/H) · Mitigation · Trigger to revisit · Owner.**

---

## RISK-01 — FGS-instructed soNIC takedown of `oag.pl.so`
- **Description:** The `.so` registry, operated by FGS via soNIC, could revoke or alter the delegation of `oag.pl.so` (or the entire `pl.so` parent) on political instruction. A single registry record change kills resolution. WHOIS already shows the parent `pl.so` with all server-side renew/transfer/delete prohibitions held by the registry — this is the seizure lever, fully active.
- **Likelihood:** M
- **Impact:** H (origin dark; if no mirror, public record dies)
- **Mitigation:** Mirror on a non-`.so` namespace (project-owner controlled, different jurisdiction) is part of v1 DoD; public archive snapshot (Wayback + archive.today) submitted on every release; mirror URL printed on every public page so users discover it if origin disappears.
- **Trigger to revisit:** any FGS–PSS political escalation; any registry status change on `pl.so`.
- **Owner:** Abdirahim.
- **Linked:** [[ASSUMPTION-C-01]].

## RISK-02 — Legacy `/public-reporting-portal/` whistleblower data already exposed
- **Description:** The existing WordPress site collects free-text incident details, party names, dates, locations, and file uploads from citizens, promising "fully committed to protecting the identities of whistleblowers." This is a Red-Line-1 violation already in production on the legacy site. Submissions may already exist in the WordPress DB; the data store, retention, access controls, and legal protection posture are unknown.
- **Likelihood:** H (already happening)
- **Impact:** H (life-safety for any source who has submitted)
- **Mitigation:** v1 does not migrate this portal. v1 surfaces an honest source-safety page on its replacement URL. **Out-of-v1-scope but flagged:** legacy WP DB should be audited for existing tip records; access should be locked down or the records destroyed under guidance from counsel. **Escalate to owner separately.**
- **Trigger to revisit:** any reporting that the legacy WP database has been accessed or leaked.
- **Owner:** Abdirahim (v1 component); separate counsel review (legacy data).
- **Linked:** [[ASSUMPTION-D-01]].

## RISK-03 — OAG's own enabling statute is not publicly available
- **Description:** The 20 Somali statutes on `/downloads/` do not include a dedicated Audit Act. The framework references an audit bill "still being brought into INTOSAI conformance" — i.e., not yet enacted or not yet published. v1's standards-conformance pages therefore cannot quote a primary OAG audit statute; they must lean on PFM Law (2023) audit-relevant provisions and INTOSAI/ISSAI principles without overclaiming a domestic legal basis the OAG can't yet cite.
- **Likelihood:** H (already true)
- **Impact:** M (credibility weakness, not failure)
- **Mitigation:** v1 conformance page is honest: cites PFM Law 2023 (the most senior public statute touching audit), references ISSAI-12 (value & benefits of SAIs) and SAI-PMF as the *aspirational* conformance framework, names the pending Audit Bill as work-in-progress, and explicitly declines to quote provisions of an instrument not yet on the public record.
- **Trigger to revisit:** Audit Bill enactment or publication.
- **Owner:** Abdirahim.
- **Linked:** [[ASSUMPTION-A-01]], [[ASSUMPTION-G-01]].

## RISK-04 — Single VPS operator (Qaran Developers) is also a Somali-jurisdiction actor
- **Description:** `oag.pl.so` → `5.10.25.209` (UK-physical VM at Amito Ltd AS60610) is operated by Qaran Developers (`qarandevelopers.so`). Physical seizure is UK-jurisdiction; operational control (push access, server config) sits with a Somali firm that could be pressured by FGS or PSS.
- **Likelihood:** L–M
- **Impact:** M (delayed publication; not a record-loss event if mirror exists)
- **Mitigation:** Same as RISK-01: mirror + archive snapshots; v1 build is reproducible from the Git corpus, so re-publishing on alternative hosting is hours, not weeks.
- **Trigger to revisit:** any change in Qaran Developers' relationship with PSS/FGS.
- **Owner:** Abdirahim.

## RISK-05 — Strategic Plans referenced but not actually published
- **Description:** The Strategic Plans page (`/publications/strategic-plans/`, WP id=792) mentions plans for 2014-2018, 2019-2023, and 2024-2028, but the rendered HTML contains **zero PDF references** and the WP media library contains no strategic-plan files. v1 cannot publish these documents because they are not in the already-public set.
- **Likelihood:** H (verified absent)
- **Impact:** L (a referenced-but-unpublished plan is honest about gaps)
- **Mitigation:** v1 Strategic Plans page either (a) omits the section entirely or (b) renders an honest "summary on file with the OAG; full document publication pending" note. Doctrine: never invent a document.
- **Trigger to revisit:** OAG decides to release plans publicly.
- **Owner:** Abdirahim.

## RISK-06 — "Annual Performance Reports" category contains event materials, not annual reports
- **Description:** The `/publications/annual-performance-reports/` page lists only Dec-2025 event materials (presentation deck, photos, Q&A, opening remarks) — not the OAG's annual performance report as expected by SAI taxonomy. A SAI reviewer reading the category label will expect annual *institutional* performance accountability documents and find event ephemera.
- **Likelihood:** H (verified)
- **Impact:** L (naming mismatch, not a finding error)
- **Mitigation:** v1 renames the category in the navigation to something accurate ("Public Engagement Materials" or similar) and reserves "Annual Performance Reports" for the actual document class if/when produced.
- **Trigger to revisit:** OAG publishes an actual annual performance report.
- **Owner:** Abdirahim.

## RISK-07 — Only 3 audit-report PDFs constitute the entire OAG output corpus
- **Description:** Across Compliance, Systems, Donor-Funded, Forensic, and Programme audit categories, **zero reports are published.** Only 3 PDFs of Annual Audit Reports (FY2024 EN, FY2024 SO, FY2023 SO) exist on the public site. A best-in-class site for a small corpus must be honest about the size of the record, or it will look padded.
- **Likelihood:** H (verified)
- **Impact:** M (institutional credibility)
- **Mitigation:** v1 designs for *quality of presentation* of the 3 reports + 20 reference statutes, not for *volume*. The site clearly lists categories with zero published reports as "no published reports in this category yet" — never as "coming soon" with no timeline. Honesty preserves credibility better than scaffolding does.
- **Trigger to revisit:** new reports published.
- **Owner:** Abdirahim.

## RISK-08 — FY 2023 has no English-language version
- **Description:** Only the Somali version of the FY 2023 Annual Audit Report exists on `oag.pl.so`. v1 must render the SO version and **must not** auto-translate (quality guardrail in directive). The English-side renders an "official English version pending" marker.
- **Likelihood:** H (verified)
- **Impact:** L (bilingual parity weakness, not a defect)
- **Mitigation:** Explicit placeholder card; never substitute machine translation for financial-audit content.
- **Trigger to revisit:** OAG publishes an official English translation.
- **Owner:** Abdirahim.

## RISK-09 — Reproducibility guarantee depends on the build being deterministic
- **Description:** DoD #1 requires that a fresh clone reproduces the published site byte-for-byte from the corpus. Astro builds, by default, are mostly deterministic, but transitive npm dependencies can introduce non-determinism (timestamps, randomised CSS hashes, asset bundling order). If the build is non-deterministic, tamper detection by hash comparison is undermined.
- **Likelihood:** M
- **Impact:** H (DoD failure)
- **Mitigation:** pin `package.json` exact versions; commit `pnpm-lock.yaml`; set `SOURCE_DATE_EPOCH` in CI; disable Astro's content-hashing where possible OR pin asset paths via stable hashing inputs; verify in CI by running the build twice and diffing the output trees.
- **Trigger to revisit:** any CI failure on the reproducibility check.
- **Owner:** Abdirahim.

## RISK-10 — Bandwidth/2G profile may not pass with PDFs in the 7–42 MB range
- **Description:** The FY 2023 SO PDF is 42 MB; FY 2024 EN/SO are 7.5 MB each. WCAG-AA is about a11y, not bandwidth, but the directive separately requires "verified load under a throttled 2G profile." At 2G speeds (~50 kbps usable), 42 MB ≈ 2 hours of download.
- **Likelihood:** H (mathematical certainty for the SO 2023 PDF)
- **Impact:** M (mobile-first audience can't fetch reports on low-end connections)
- **Mitigation:** 2G profile applies to the *HTML pages*, not the PDFs — the page must load quickly on 2G, then the PDF download is a user-initiated action. v1 also generates a low-bandwidth summary card (plain-language EN/SO summary, ~10 KB) for each report so the substance is reachable without the PDF; the PDF download is a fallback for users with bandwidth.
- **Trigger to revisit:** any 2G HTML page exceeding 250 KB transferred.
- **Owner:** Abdirahim.

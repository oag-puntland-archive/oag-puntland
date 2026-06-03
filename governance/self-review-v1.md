# Phase 3 / v1 self-review — §9 adversarial pass

Run before the first public deploy. Each lens is read-through, with the answer recorded honestly. A finding is *resolved* if there is a mitigation already in the v1 architecture, *accepted* if the residual risk is on the Risk Register, or *escalated* if it touches a stop condition under §11.

---

## 1. Red-team — hostile state, captured AG, political rival, malicious insider, embarrassed researcher

| Threat | Where v1 stands |
|---|---|
| **Hostile-state takedown via FGS / soNIC.** Single registry instruction kills `oag.pl.so`. | **Resolved (architectural).** Two off-`.so` mirrors (GitHub US, Codeberg DE) + 6 Wayback defensive snapshots already captured. Custody page publishes mirror URLs so the takedown is externally detectable. ASSUMPTION-C-01 binding. |
| **Captured future AG suppresses a published report.** | **Resolved (content-addressed).** Every PDF has its sha256 on the deployed site, in `provenance.csv`, and in the report YAML. Suppression on origin still leaves the artifact on mirrors with a verifying hash. Silent edit of a mirror is detectable via signed-commit divergence. |
| **Political rival uses the v1 site as a pretext to defund OAG ("you don't have the authority to publish that").** | **Resolved (doctrinal).** Already-public doctrine (ADR-0001) means every artifact is something the OAG already lawfully published on `oag.pl.so`. v1 introduces zero new disclosures. The most controversial possible reframing is "the OAG made existing reports easier to read," which is not a publication-authority question. |
| **Malicious insider with push access alters a finding.** | **Resolved (signed history + mirror diversity).** SSH-signed commits with the trust anchor in `allowed_signers`; an unknown-signer commit is anomalous. Three mirrors (origin + GH + Codeberg) make silent re-write require simultaneous compulsion on all three. |
| **Researcher embarrassing the office by finding the legacy honeypot.** | **Pre-empted.** The legacy `/public-reporting-portal/` is named in [`risk-register.md`](risk-register.md) RISK-02, addressed in [`adr/0005`](adr/0005-no-public-whistleblower---tip-intake-on-the-v1-site.md), and explicitly explained on the v1 [`/source-safety/`](../site/src/pages/[lang]/source-safety/index.astro) page. v1's posture is "we know, we chose not to migrate it, here's why." |
| **Researcher noting the absent Audit Act.** | **Pre-empted.** RISK-03 + ADR-0010 + the [`/authority/`](../site/src/pages/[lang]/authority/index.astro) page name this gap in primary copy. |
| **Researcher noting the empty audit categories or the misleading "Annual Performance Reports".** | **Pre-empted.** RISK-05 / RISK-06 / RISK-07; the reports library renders empty categories as "No published reports in this category yet" rather than padding. |

## 2. Suppression test

> Can a published report be silently removed or altered? Can its absence be detected externally?

- **Removal:** to silently remove (e.g.) `corpus/reports/fy-2024-annual-audit-report/en/full.pdf`, an attacker must (a) compel the origin host, (b) compel both Git mirrors, (c) compel Wayback Machine, and (d) compel archive.today. Any one survivor preserves the artifact with a verifying sha256.
- **Alteration:** to alter the PDF, attacker must produce a sha256 collision (cryptographically infeasible) OR rewrite `provenance.csv` + `report.yaml` + all mirror copies + the Wayback snapshot's HTML reference, all consistently. This is detectable by anyone who recomputes the sha256 from any surviving copy.
- **Suppressed-report absence:** if `report/fy-2024-...` is silently deleted from a mirror, the `signed_commits` history would also have to be force-pushed; this produces an obvious history rewrite that diverges from other mirrors and Wayback snapshots. **Externally detectable.** ✅

## 3. Operability test

> If the contractor disappears tomorrow, does it still run and stay secure?

- **Site runs:** Cloudflare Pages auto-builds on `git push`. No contractor in the loop after setup.
- **Adding a new artifact:** documented procedure in [`CORPUS.md`](../CORPUS.md). Requires: (a) fetch PDF from `oag.pl.so`, (b) `pdftotext -f 1 -l 1` to verify masthead, (c) compute sha256, (d) add row to `provenance.csv`, (e) author YAML, (f) commit + push. A workbench replacing steps (b)–(e) is post-v1 work, gated on ASSUMPTION-B-01 validation.
- **Secure:** signing-key rotation procedure documented in [`custody.md`](custody.md) §6. Doctrine and ADRs are version-controlled; future maintainers can read why each constraint exists.
- **Residual risk:** if no one ever touches the repo again, the site keeps serving from the last build. That is acceptable for v1 — a stale archive is more valuable than a dynamic site that breaks.

## 4. Bias check — "impressive vs correct"

What did v1 *decline* to build that a typical contractor would have built?

- ❌ No fancy filter / search UI on `/{lang}/reports/`. Grouped by category, sorted by FY, that's it.
- ❌ No PDF in-browser viewer. Direct download link only — works on 2G, works in any reader, leaves the artifact intact.
- ❌ No "Suggested reading" / "Related reports" UI. The corpus is small enough; the navigation is honest.
- ❌ No chatbot, no AI summarisation. ADR-0006 (no public GenAI).
- ❌ No login, no analytics, no third-party JS. Privacy by deletion.
- ❌ No tracker, no entity scoring, no "compliance dashboards." ADR-0008.
- ❌ No animated transitions, no carousel, no parallax. Mobile-first + reduced-motion.

The constraint sometimes felt like under-delivery. It is what the institution actually needs.

## 5. Regression to ambiguity

Have any Phase-0 unknowns silently reverted to guesses?

- **A — Publication mandate.** Still unresolved. v1's response (already-public doctrine) is a *deliberate scoping decision*, not a guess. The doctrine doc + ADR-0001 lock this in.
- **B — Operating capacity.** ASSUMPTION-B-01 signed (near-zero capacity), v1 ships no workbench accordingly. Validation plan: 30-min observed publish session post-deploy.
- **C — Hosting / namespace.** Researched: FGS/soNIC seizure vector confirmed. Architecture responds with off-`.so` mirrors. Not a guess.
- **D — Whistleblower threat model.** Unresolved. v1 builds no intake. Doctrine + ADR-0005 lock this in.
- **E — Peer custodian.** Not secured. v1 says so honestly on `/custody/` and in this self-review.

No silent regression. All deferrals are explicit and on the Risk Register or Assumptions Register.

## 6. DoD check (Framework §10, against the directive's 24-hour subset: items 1, 2, 5, 7)

| # | Requirement | Status |
|---|---|---|
| 1 | Public record reproducible from corpus, tamper-evident, mirror-survivable | ✅ Verified locally: takedown-sim PROVES clone-from-mirror = canonical dist byte-for-byte. Two-pass reproducibility check ✅. PDF sha256 byte-match ✅. **Pending public push to make mirrors externally reachable.** |
| 2 | Historic report-labelling defect class structurally impossible | ✅ Every render derived from `corpus/**/report.yaml`; no hand-curated lists; YAML reflects masthead-verified year + language; abandoning WordPress slugs eliminates the failure class entirely. |
| 5 | Standards posture (ISSAI / SAI-PMF / ISSAI-12) demonstrable to peer reviewer | ✅ `/{lang}/standards/` cites ISSAI 100/200/300/400 series, SAI-PMF six domains, and ISSAI-12 three pillars. Disclaims that v1 is *aspirational* (no peer-attested SAI-PMF score yet — anti-overclaim per ADR-0010). |
| 7 | Every major decision withstands senior-architecture review with rationale + alternatives on file | ✅ 10 ADRs cover every load-bearing decision, each with ≥2 alternatives, trade-offs, risks, mitigations, validation method, reversibility, and prime-directive mapping. |

DoD items 3, 4, 6, 8 are explicitly post-v1 and gated:
- 3 (non-tech officer publishes unaided) — post-v1, validates ASSUMPTION-B-01.
- 4 (no red line crossed) — confirmed by §1–§5 above.
- 6 (citizen feed to radio/WhatsApp/FB/video) — Phase 4 (Framework §6).
- 8 (post-funding operability + red-team survival) — partially confirmed by §3 above; full red-team is a continuous practice.

## 7. Stop-condition audit

> Any red line crossed? Any blocking-unknown silent revert? Any source-safety issue? Any lower-priority directive optimised over a higher one?

- Red lines 1–6: **none crossed.** No state-hosted intake, no public GenAI, no mutable DB-as-truth, no premature tracker, no secrets in repo, no infra without mirror.
- Blocking-unknown silent revert: **none.** §5 above.
- Source-safety: ASSUMPTION-D-01 in force, no intake, honest source-safety page.
- Directive priority: §1 prime directives ranked correctly throughout — institutional survival (§1.2) elevated over reach (§1.6) via "thin but honest" design choices.

**No stop condition tripped.** Cleared to deploy.

---

**Reviewer:** Claude Opus 4.7 (autonomous engineering agent under the framework operating contract).
**Date:** 2026-06-03.
**Sign-off:** awaits human owner (Abdirahim) review of this document plus a sample of the deployed site post-push.

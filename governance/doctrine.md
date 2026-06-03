# Operating Doctrine — v1

This file is the human-readable contract that governs every commit, render, and copy decision in this repository. Conflicts resolve in favour of the Prime Directive Lattice (Framework §1).

## 1. Already-Public Doctrine (scope wall)

The v1 public record renders **only** content the OAG has already lawfully made public on `oag.pl.so`. Every binary artifact in this repository must trace to a row in `governance/provenance.csv` with a `source_url` on `oag.pl.so`, an authenticated `sha256`, and a `fetched_utc` timestamp. **No new disclosures.** Anything not already public is OUT of v1, full stop.

If during build we discover that a candidate artifact is not in fact already-public (e.g., a draft accidentally linked from a public page), we **halt and surface it** rather than ship it (Framework §11 — life-safety + publication-authority stop conditions).

## 2. PDF masthead is the only authoritative source for year + language

URL slugs, page titles, and link text on `oag.pl.so` are unreliable due to WordPress "Duplicate Post" artefacts. The taxonomy of every report in this repository is established by `pdftotext -f 1 -l 1` against the binary, not by metadata downstream of it. See `governance/matrix.csv` "title_masthead" column.

## 3. No machine translation of audit content

Where one official language is missing for a report, we render the language that exists and surface an "official English version pending" / "version Soomaali ee rasmiga ah la doorbiday" marker. We do not paraphrase, summarise across languages, or auto-translate any financial-audit text. The plain-language summary cards (~150 words each) are authored from each PDF's existing summary chapter in the *same* language as that PDF, never cross-translated.

## 4. No new whistleblower intake

The legacy `/public-reporting-portal/` form is **not** migrated. The v1 replacement page is titled "Reporting concerns about public funds" and states honestly:
- what the OAG can lawfully receive,
- what protections the OAG *cannot* legally guarantee (until counsel confirms otherwise),
- a route to an independent intermediary (TBD) for high-risk disclosures.
The legacy WP database may already contain submissions; that is RISK-02 and is escalated to the owner separately. It is out of v1 scope but on the record.

## 5. No tracker, no scoring, no entity profiles

v1 does not render a recommendations tracker, an entity-accountability profile, or any score / colour-code over an auditee. These are Phase 5 deliverables and are gated on a publication-authority ruling (Unknown A) and external backing. Data for the tracker may be *captured* in structured form in the corpus, but it is not surfaced in the public render until the gate opens.

## 6. No public generative AI

The v1 site has no chatbot, no "ask the auditor" feature, no LLM-driven search, and no auto-summarisation tool exposed on any public surface. Internal-workbench AI (anomaly detection, EN↔SO drafting with human gating) is a post-v1 component and lives behind a hardened proxy. v1 ships none of it.

## 7. Renders are generated from data; no hand-duplication

The Astro build derives every report card, every catalogue entry, every download link from the structured corpus (`corpus/**/report.yaml`). There are no hand-curated lists. This is how the legacy mislabel defect class becomes structurally impossible to reintroduce (DoD #2).

## 8. Mirror is mandatory, not optional

The corpus is pushed to a second remote on a non-`.so` namespace (project-owner controlled, different jurisdiction) on every release. Public archive snapshots (archive.org Wayback + archive.today) are submitted on every release. The site footer publishes the mirror URL and archive snapshot URLs on every page so that a takedown is externally detectable.

## 9. Honesty over impressiveness (anti-overclaim)

If the OAG's enabling statute is not yet public, we say so and link to the PFM Law as the most senior available statute. If FY 2023 has no English version, we say so. If no peer custodian (AFROSAI-E / IDI) is on file, we say so. If only 3 audit reports have ever been published, we say so. The site's credibility comes from *accuracy*, not from filling categories with placeholders.

## 10. Stop conditions are real (Framework §11)

If during the v1 build any of the following surfaces, the build halts and the owner is notified before any further commit:
- An artifact turns out not to be already-public.
- A render would imply a publication mandate not yet granted.
- A whistleblower / source-safety risk is implicated by any feature.
- A red line would be crossed to meet the deadline.

The 24-hour deadline does not buy a red-line crossing. It never does.

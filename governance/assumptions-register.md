# Assumptions Register — v1 (24-hour cut)

Status legend: **OPEN** (un-validated, in force), **VALIDATED** (evidence on file), **RETIRED** (no longer applies).
Reversibility: **one-way door** (hard to undo), **two-way door** (cheap to revisit).

---

## ASSUMPTION-A-01 — Already-public doctrine clears the publication-mandate unknown for v1
- **Statement:** Re-hosting content the OAG has already lawfully published on `oag.pl.so` under a better architecture is not a new act of publication and therefore does not require new publication-mandate authority. v1 introduces zero new disclosures.
- **Basis:** Directive of 2026-06-02 (signed by owner). Doctrinal, not legal opinion.
- **Confidence:** High for the audit reports (clearly OAG-issued and live on the source site); Medium for the 20 legislation PDFs (these are reference statutes, not OAG outputs — already-public but jurisdiction over publication is the Council of Ministers / Parliament, not the OAG; the OAG is acting as a republisher).
- **Blast radius if wrong:** A successful challenge would force takedown of v1 content. Mitigation: every artifact has a `source_url` on `oag.pl.so` in `governance/provenance.csv`; takedown of a single artifact is a 1-line corpus removal and a re-build; no cascading data loss.
- **Validation plan:** Counsel review post-launch; not blocking v1.
- **Owner:** Abdirahim.
- **Reversibility:** two-way door.

## ASSUMPTION-B-01 — Near-zero post-funding operating capacity (signed)
- **Statement:** The post-funding OAG team cannot operate a Git / pull-request / signed-commit workflow unaided. v1 ships with **no internal workbench**; content is edited directly as structured files by a maintainer with developer skills until validated otherwise.
- **Basis:** Conservative default per directive. No real-user observation yet.
- **Confidence:** High that this is the *safe* default; Low that it matches reality (real capacity unobserved).
- **Blast radius if wrong:** Under-built authoring affordances. Mitigation: structured schema + Markdown + YAML are universally readable; a form-that-hides-Git workbench can be bolted on post-v1 without corpus migration.
- **Validation plan:** 30-minute observed publish session with a real OAG officer once v1 is live.
- **Owner:** Abdirahim.
- **Reversibility:** two-way door (upward).

## ASSUMPTION-C-01 — FGS can revoke `pl.so` / `oag.pl.so` delegation unilaterally; namespace seizure is in-scope
- **Statement:** The `.so` registry is operated by soNIC, run by the Federal Somali Ministry of Post and Telecommunications. WHOIS (2026-06-02) shows `pl.so` as **inactive** with `serverRenewProhibited`, `serverTransferProhibited`, `serverDeleteProhibited` set — registry-side controls held by FGS. There is no intermediate `pl.so` zone; `oag.pl.so` is resolved directly via the `.so` parent. A single soNIC instruction can therefore kill name resolution.
- **Basis:** WHOIS of `pl.so` and DNS of `oag.pl.so` performed 2026-06-02; output preserved in `_inventory/` research artefacts.
- **Confidence:** High on the technical fact; Medium on whether FGS would exercise the lever (political risk).
- **Blast radius if wrong (i.e., risk materialises):** Origin site disappears. Mitigation: v1 publishes mirror URLs prominently; mirror lives on a non-`.so` namespace; archive snapshots submitted on every release.
- **Validation plan:** Origin-takedown simulation in §10/Gate-3.
- **Owner:** Abdirahim.
- **Reversibility:** one-way door at the registry level (cannot be reversed by us); two-way door for our architectural response.

## ASSUMPTION-D-01 — OAG is, by default, compellable to surrender source identities; build no intake
- **Statement:** Absent a legal opinion proving otherwise, the safe default is that the OAG cannot legally protect a whistleblower's identity. v1 therefore builds **no state-hosted intake** of any kind. The existing `/public-reporting-portal/` form on the legacy WordPress site is **not migrated** and the v1 replacement is an honest "what we can and cannot protect" page that routes serious disclosures to an independent intermediary.
- **Basis:** Red Line 1 + directive disposition for v1.
- **Confidence:** High (precautionary).
- **Blast radius if wrong (i.e., we are *not* compellable):** We have under-promised, which is fine.
- **Validation plan:** Counsel review post-launch may permit a higher-trust intake later; v1 commits nothing on this.
- **Owner:** Abdirahim.
- **Reversibility:** two-way door.

## ASSUMPTION-E-01 — No peer custodian secured within 24 hours; do not overclaim
- **Statement:** v1 publishes with a two-leg custody arrangement (a) origin on the current host, (b) a second remote on a non-`.so` namespace controlled by the project owner in a different jurisdiction, plus public archive snapshots (Wayback Machine + archive.today). It does **not** claim AFROSAI-E / IDI peer custody until a written commitment is on file.
- **Basis:** Directive disposition for v1.
- **Confidence:** High that this arrangement is achievable in the time budget; Low on full anti-suppression guarantee until a peer custodian is added.
- **Blast radius if wrong:** Overclaim risk → credibility damage. Mitigation: language on the v1 site states the custody arrangement accurately, naming exactly which mirrors exist and which do not.
- **Validation plan:** Add peer custodian post-launch; update copy when secured.
- **Owner:** Abdirahim.
- **Reversibility:** two-way door (upward).

## ASSUMPTION-F-01 — The legacy mislabel defect is structural to WordPress slugs, not to the PDFs themselves
- **Statement:** The slug confusion on `oag.pl.so` (e.g., `fy-2024-...-somali-version-copy` linking to the English PDF) is an artefact of the WordPress "Duplicate Post" plugin, not of the underlying audit reports. PDF mastheads are internally consistent and correctly identify year + language.
- **Basis:** `pdftotext -f 1 -l 1` ran against all 3 audit PDFs on 2026-06-02; mastheads verified — see `governance/matrix.csv` "title_masthead" column and `_inventory/pdf-manifest.json`.
- **Confidence:** High (direct evidence).
- **Blast radius if wrong:** None for v1 — by abandoning WordPress URLs we structurally cannot reintroduce the slug defect; DoD #2 met by construction. If a PDF is itself mislabeled, that would be a separate, escalation-worthy finding.
- **Validation plan:** None required.
- **Owner:** Abdirahim.
- **Reversibility:** N/A.

## ASSUMPTION-G-01 — The 20 Somali-language statutes on `/downloads/` are reference materials, not OAG audit outputs
- **Statement:** None of the 20 PDFs at `oag.pl.so/downloads/` is the OAG's enabling statute (the "Audit Act" / "Xeerka Hantidhawrka"). They are general Puntland legislation (PFM Act, Civil Service Law, Tax Law, etc.) that the OAG hosts as reference. The v1 site renders them under a clearly differentiated "Reference / Legislation" section, not under "Publications" alongside OAG-authored reports.
- **Basis:** `/downloads/` page WebFetch 2026-06-02; titles cross-checked against media library; no item titled "Xeerka Hantidhawrka" or similar appears.
- **Confidence:** High.
- **Blast radius if wrong:** Mis-categorisation reduces credibility. Mitigation: rendered taxonomy is explicit; no implied claim that these statutes establish OAG authority.
- **Validation plan:** Confirm with OAG that the Audit Bill referenced in the framework is genuinely pending and not yet public.
- **Owner:** Abdirahim.
- **Reversibility:** two-way door.

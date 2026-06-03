# Corpus — content index

This directory is the **source of truth** for the v1 public record. Every binary in here is sourced from `oag.pl.so` under the already-public doctrine; every artifact has a row in `governance/provenance.csv` with `source_url`, `sha256`, and `fetched_utc`.

## Layout

```
corpus/
├── reports/
│   ├── fy-2024-annual-audit-report/
│   │   ├── report.yaml          (structured metadata; renders generated from this)
│   │   ├── en/full.pdf
│   │   └── so/full.pdf
│   └── fy-2023-annual-audit-report/
│       ├── report.yaml
│       └── so/full.pdf          (no English official version)
└── legislation/
    ├── pfm-act-2023/
    │   ├── statute.yaml
    │   └── document.pdf
    └── ...
```

## Schema

- `report.yaml`: id, type, issai_category, fiscal_year, fiscal_year_end, issue_date, issuer{en,so}, auditee{en,so}, title{en,so}, summary{en,so}, versions[{lang, pdf, pages, bytes, sha256, source_url, source_landing_page, fetched_utc} | {lang, status, note}]
- `statute.yaml`: id, type, role (audit-relevant|reference), year_enacted, publisher, title{so, en, en_translation_status}, audit_note, document{pdf, bytes, sha256, source_url, source_landing_page, fetched_utc}

## Authority

If anything in this directory conflicts with what is rendered to the public, **the corpus wins**. The site is a derivative; the corpus is the record.

## Adding a new artifact

1. Verify the artifact is already-public on `oag.pl.so` (or document an explicit publication-authority exception).
2. Read masthead via `pdftotext -f 1 -l 1` to verify year + language.
3. Compute `sha256`.
4. Add a row to `governance/provenance.csv`.
5. Place file at `corpus/<class>/<slug>/(en|so)/full.pdf` or `corpus/legislation/<slug>/document.pdf`.
6. Author `report.yaml` / `statute.yaml`.
7. Sign the commit; push to all mirrors.

# Archive Snapshots — public, third-party point-in-time copies

This file is a growing ledger of every external archive snapshot of (a) the origin OAG site `oag.pl.so` and (b) the v1 deployed site. Each row is appended; **never edited or removed**. The provenance of the public record is verifiable against these external timestamps even if every Git mirror is compelled offline.

---

## 2026-06-03 — Defensive baseline of origin `oag.pl.so`

Captured pre-deploy to preserve a third-party-attested record of what was already publicly available on `oag.pl.so` as of the v1 snapshot date. Useful if the origin is later modified or removed.

| URL | Wayback snapshot | Captured (UTC) |
|---|---|---|
| `https://oag.pl.so/` | https://web.archive.org/web/20260603072345/https://oag.pl.so/ | 2026-06-03T07:23:45Z |
| `https://oag.pl.so/downloads/` (Buugta Sharciyada — 20 legislation PDFs) | https://web.archive.org/web/20260603072702/https://oag.pl.so/downloads/ | 2026-06-03T07:27:02Z |
| `https://oag.pl.so/audit-reports/financial-audits/fy-2024-annual-audit-report-somali-version-copy/` (FY 2024 EN landing) | https://web.archive.org/web/20260603072404/https://oag.pl.so/audit-reports/financial-audits/fy-2024-annual-audit-report-somali-version-copy/ | 2026-06-03T07:24:04Z |
| `https://oag.pl.so/audit-reports/financial-audits/fy-2023-annual-audit-report-somali-version-copy/` (FY 2024 SO landing — note slug references fy-2023 due to WP duplicate-post defect) | https://web.archive.org/web/20260603072507/https://oag.pl.so/audit-reports/financial-audits/fy-2023-annual-audit-report-somali-version-copy/ | 2026-06-03T07:25:07Z |
| `https://oag.pl.so/audit-reports/financial-audits/fy-2023-annual-audit-report-somali-version-copy-2/` (FY 2023 SO landing) | https://web.archive.org/web/20260603072555/https://oag.pl.so/audit-reports/financial-audits/fy-2023-annual-audit-report-somali-version-copy-2/ | 2026-06-03T07:25:55Z |
| `https://oag.pl.so/public-reporting-portal/` (legacy Red-Line-1 honeypot — preserved as evidence of pre-v1 state) | https://web.archive.org/web/20260603072611/https://oag.pl.so/public-reporting-portal/ | 2026-06-03T07:26:11Z |

**archive.today (archive.ph):** HTTP 429 (rate-limit) on first attempt. To be retried post-launch from a different IP.

## v1 deployed site snapshots — _pending public deploy_

Once Cloudflare Pages assigns the v1 subdomain, snapshot each of:

- root chooser: `/`
- English home: `/en/`
- Somali home: `/so/`
- Reports library (both languages): `/en/reports/`, `/so/reports/`
- Each individual report page (4 total)
- Legislation library (both languages)
- Source-safety page (both languages)
- Custody & mirrors page (both languages)
- `/governance/doctrine.md`, `/governance/provenance.csv`, `/governance/matrix.csv`

Wayback Save Page Now: `curl -L "https://web.archive.org/save/<deployed-url>"` per URL with ≥10s spacing.
archive.today: submit via `https://archive.ph/?run=1&url=<deployed-url>` (avoid bursts; they 429 aggressively).

Append snapshot URLs + capture timestamps to this file on every snapshot cycle (post-deploy + monthly cadence thereafter).

## 2026-06-03 — v1 deployed site snapshots (https://oag-puntland.pages.dev)

Submitted via parallel Wayback Save Page Now + archive.today after the v1 Cloudflare Pages deploy. PDF byte-match verified at deploy time (canonical sha256 matched for all 5 sampled PDFs).

### Wayback Machine

| Path | Snapshot | Captured (UTC) | HTTP |
|---|---|---|---|
| `/` | https://web.archive.org/web/20260603133537/https://oag-puntland.pages.dev/ | 2026-06-03T13:35:37Z | 200 |
| `/en/` | https://web.archive.org/web/20260603133617/https://oag-puntland.pages.dev/en/ | 2026-06-03T13:36:17Z | 200 |
| `/en/authority/` | (no snapshot — retry post-launch) | — | None |
| `/en/custody/` | (no snapshot — retry post-launch) | — | 429 |
| `/en/legislation/` | (no snapshot — retry post-launch) | — | 429 |
| `/en/legislation/pfm-act-2023/` | (no snapshot — retry post-launch) | — | 429 |
| `/en/reports/` | (no snapshot — retry post-launch) | — | None |
| `/en/reports/fy-2023-annual-audit-report/` | (no snapshot — retry post-launch) | — | None |
| `/en/reports/fy-2024-annual-audit-report/` | (no snapshot — retry post-launch) | — | None |
| `/en/source-safety/` | (no snapshot — retry post-launch) | — | 429 |
| `/en/standards/` | (no snapshot — retry post-launch) | — | 429 |
| `/governance/doctrine.md` | (no snapshot — retry post-launch) | — | None |
| `/governance/provenance.csv` | (no snapshot — retry post-launch) | — | None |
| `/so/` | (no snapshot — retry post-launch) | — | None |
| `/so/custody/` | (no snapshot — retry post-launch) | — | 429 |
| `/so/legislation/` | (no snapshot — retry post-launch) | — | 429 |
| `/so/reports/` | (no snapshot — retry post-launch) | — | None |
| `/so/reports/fy-2023-annual-audit-report/` | (no snapshot — retry post-launch) | — | 429 |
| `/so/reports/fy-2024-annual-audit-report/` | (no snapshot — retry post-launch) | — | None |
| `/so/source-safety/` | (no snapshot — retry post-launch) | — | 429 |

### archive.today

| Path | Snapshot | HTTP | Notes |
|---|---|---|---|
| `/` | (no snapshot) | 429 | rate-limited or rejected; retry post-launch from different IP |
| `/en/` | (no snapshot) | 429 | rate-limited or rejected; retry post-launch from different IP |
| `/en/custody/` | (no snapshot) | 429 | rate-limited or rejected; retry post-launch from different IP |
| `/en/reports/` | (no snapshot) | 429 | rate-limited or rejected; retry post-launch from different IP |
| `/en/source-safety/` | (no snapshot) | 429 | rate-limited or rejected; retry post-launch from different IP |
| `/so/` | (no snapshot) | 429 | rate-limited or rejected; retry post-launch from different IP |
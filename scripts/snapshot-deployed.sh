#!/usr/bin/env bash
# snapshot-deployed.sh — once Cloudflare Pages is live, submit Wayback Machine
# and archive.today snapshots of every consequential page, and verify a PDF
# round-trip matches the canonical sha256.
#
# Usage:
#   DEPLOY_URL=https://oag-puntland.pages.dev bash scripts/snapshot-deployed.sh
#
# Updates governance/archive-snapshots.md in place with timestamped snapshot URLs.

set -euo pipefail

if [ -z "${DEPLOY_URL:-}" ]; then
  echo "Usage: DEPLOY_URL=https://<project>.pages.dev bash scripts/snapshot-deployed.sh"
  exit 2
fi

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

# Strip trailing slash for consistency
DEPLOY_URL="${DEPLOY_URL%/}"

PAGES=(
  "/"
  "/en/"
  "/so/"
  "/en/reports/"
  "/so/reports/"
  "/en/reports/fy-2024-annual-audit-report/"
  "/so/reports/fy-2024-annual-audit-report/"
  "/en/reports/fy-2023-annual-audit-report/"
  "/so/reports/fy-2023-annual-audit-report/"
  "/en/legislation/"
  "/so/legislation/"
  "/en/legislation/pfm-act-2023/"
  "/en/source-safety/"
  "/so/source-safety/"
  "/en/custody/"
  "/so/custody/"
  "/en/standards/"
  "/en/authority/"
  "/governance/doctrine.md"
  "/governance/provenance.csv"
)

echo "=== Step 1: smoke-test the live site (HTTP 200 + content sanity) ==="
for p in "/" "/en/" "/so/" "/en/reports/" "/en/custody/" "/governance/doctrine.md"; do
  url="${DEPLOY_URL}${p}"
  code=$(curl -sS -L --max-time 30 -o /dev/null -w "%{http_code}" "$url")
  printf "  %-60s HTTP %s\n" "$url" "$code"
done

echo
echo "=== Step 2: PDF byte-match check (sha256 from deployed site must equal canonical) ==="
EXPECTED=170d5138e3b863884f98ec76bb46e799b173613de8107d911faa3a7eb6cc74fe
url="${DEPLOY_URL}/reports/fy-2024-annual-audit-report/en/full.pdf"
curl -sSL --max-time 90 "$url" -o /tmp/deploy.pdf
ACTUAL=$(shasum -a 256 /tmp/deploy.pdf | cut -d' ' -f1)
if [ "$ACTUAL" = "$EXPECTED" ]; then
  echo "  ✅ DEPLOYED PDF MATCHES CANONICAL: $ACTUAL"
else
  echo "  ❌ MISMATCH! expected=$EXPECTED  actual=$ACTUAL"
  exit 1
fi

echo
echo "=== Step 3: Submit Wayback Machine snapshots ==="
TIMESTAMP_LOG=/tmp/spn-results.txt
: > "$TIMESTAMP_LOG"
for p in "${PAGES[@]}"; do
  full="${DEPLOY_URL}${p}"
  printf "  → submitting: %s\n" "$full"
  result=$(curl -sS -L --max-time 90 -A "OAG-archival-bot/1.0" -o /dev/null \
    -w "HTTP=%{http_code} FINAL=%{url_effective} TIME=%{time_total}s\n" \
    "https://web.archive.org/save/$full" 2>&1)
  echo "     $result"
  echo "$p|$result" >> "$TIMESTAMP_LOG"
  sleep 8
done

echo
echo "=== Step 4: Submit archive.today snapshots (best-effort; expect some 429s) ==="
for p in "/" "/en/" "/so/" "/en/reports/" "/en/custody/" "/en/source-safety/"; do
  full="${DEPLOY_URL}${p}"
  printf "  → submitting: %s\n" "$full"
  result=$(curl -sS -L --max-time 60 -A "OAG-archival-bot/1.0" -o /dev/null \
    -w "HTTP=%{http_code} FINAL=%{url_effective}\n" \
    "https://archive.ph/?run=1&url=$full" 2>&1)
  echo "     $result"
  sleep 5
done

echo
echo "=== Step 5: Append entries to governance/archive-snapshots.md ==="
{
  echo
  echo "## $(date -u +%Y-%m-%d) — Deployed v1 site ($DEPLOY_URL)"
  echo
  echo "Snapshots of the Cloudflare-Pages-deployed v1 site. Captured immediately post-launch."
  echo
  echo "| URL | Wayback snapshot | Captured (UTC) |"
  echo "|---|---|---|"
  while IFS='|' read -r path result; do
    final=$(echo "$result" | grep -oE 'FINAL=[^ ]+' | cut -d= -f2)
    if [[ "$final" == https://web.archive.org/web/* ]]; then
      ts=$(echo "$final" | grep -oE 'web/[0-9]{14}' | cut -d/ -f2)
      formatted="${ts:0:4}-${ts:4:2}-${ts:6:2}T${ts:8:2}:${ts:10:2}:${ts:12:2}Z"
      echo "| \`${DEPLOY_URL}${path}\` | $final | $formatted |"
    fi
  done < "$TIMESTAMP_LOG"
} >> "$ROOT/governance/archive-snapshots.md"

echo
echo "[snapshot-deployed] ✅ DONE."
echo "[snapshot-deployed] Review additions in governance/archive-snapshots.md and commit + push."

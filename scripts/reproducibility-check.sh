#!/usr/bin/env bash
# reproducibility-check.sh — verify the v1 build is deterministic.
#
# Builds the site twice from a clean state and diffs the dist trees.
# Empty diff = reproducible from clone (DoD #1).
#
# Run from anywhere; resolves repo root via git.

set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
SITE="$ROOT/site"
EPOCH="${SOURCE_DATE_EPOCH:-1717344000}"  # fixed epoch for deterministic timestamps

cd "$SITE"

echo "[reproducibility] cleaning..."
rm -rf dist dist-first dist-second .astro

echo "[reproducibility] first build (SOURCE_DATE_EPOCH=$EPOCH)..."
SOURCE_DATE_EPOCH="$EPOCH" pnpm run build --silent
mv dist dist-first

echo "[reproducibility] cleaning intermediates..."
rm -rf .astro src/data/reports.json src/data/legislation.json src/data/custody.json public/reports public/legislation public/governance

echo "[reproducibility] second build (SOURCE_DATE_EPOCH=$EPOCH)..."
SOURCE_DATE_EPOCH="$EPOCH" pnpm run build --silent
mv dist dist-second

echo "[reproducibility] diff -r dist-first dist-second:"
if diff -r dist-first dist-second > /tmp/repro-diff.txt 2>&1; then
  echo "[reproducibility] ✅ REPRODUCIBLE — dist-first and dist-second are identical."
  rm -rf dist-first dist-second
  exit 0
else
  echo "[reproducibility] ❌ DIFFERENCES DETECTED:"
  head -40 /tmp/repro-diff.txt
  echo "..."
  echo "[reproducibility] Full diff: /tmp/repro-diff.txt"
  echo "[reproducibility] dist-first and dist-second preserved for inspection."
  exit 1
fi

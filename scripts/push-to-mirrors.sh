#!/usr/bin/env bash
# push-to-mirrors.sh — push the v1 repository to both GitHub and Codeberg mirrors.
#
# Usage:
#   GH_ORG=<your-gh-org> CODEBERG_USER=<your-codeberg-username> bash scripts/push-to-mirrors.sh
#
# Requires:
#   - The two repos already created (empty) at:
#       github.com/<GH_ORG>/oag-puntland
#       codeberg.org/<CODEBERG_USER>/oag-puntland
#   - The SSH public key (governance/allowed_signers) registered on BOTH
#     hosts as an SSH push key (and signing key for verification).
#   - The signing key loaded into ssh-agent OR specified via GIT_SSH_COMMAND.

set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

if [ -z "${GH_ORG:-}" ] || [ -z "${CODEBERG_USER:-}" ]; then
  echo "Usage: GH_ORG=<org> CODEBERG_USER=<user> bash scripts/push-to-mirrors.sh"
  exit 2
fi

GH_URL="git@github.com:${GH_ORG}/oag-puntland.git"
CB_URL="git@codeberg.org:${CODEBERG_USER}/oag-puntland.git"
SIGNING_KEY="${HOME}/.ssh/oag-puntland_signing_ed25519"

if [ ! -f "$SIGNING_KEY" ]; then
  echo "ERROR: signing/push key not found at $SIGNING_KEY"
  exit 3
fi

export GIT_SSH_COMMAND="ssh -i $SIGNING_KEY -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new"

echo "[push] adding remotes (overwriting if present)..."
git remote remove github 2>/dev/null || true
git remote remove codeberg 2>/dev/null || true
git remote add github "$GH_URL"
git remote add codeberg "$CB_URL"

echo "[push] verifying connectivity..."
ssh -i "$SIGNING_KEY" -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new -T git@github.com 2>&1 | grep -i "authenticated" || echo "  (GitHub: response above)"
ssh -i "$SIGNING_KEY" -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new -T git@codeberg.org 2>&1 | grep -i -E "welcome|authenticated|hi " || echo "  (Codeberg: response above)"

echo "[push] pushing to GitHub: $GH_URL"
git push -u github main

echo "[push] pushing to Codeberg: $CB_URL"
git push -u codeberg main

echo "[push] ✅ both mirrors up. Live URLs:"
echo "    https://github.com/${GH_ORG}/oag-puntland"
echo "    https://codeberg.org/${CODEBERG_USER}/oag-puntland"

echo "[push] updating site custody data + rebuilding to publish mirror URLs on every page..."
export PUBLIC_MIRROR_GITHUB="https://github.com/${GH_ORG}/oag-puntland"
export PUBLIC_MIRROR_CODEBERG="https://codeberg.org/${CODEBERG_USER}/oag-puntland"
export PUBLIC_ARCHIVE_WAYBACK="https://web.archive.org/web/20260603072345/https://oag.pl.so/"
cd site
pnpm run build
cd "$ROOT"

git add site/src/data/custody.json
if ! git diff --cached --quiet; then
  git commit -m "$(cat <<'COMMIT'
custody: publish mirror + wayback URLs on every page

Now that GitHub + Codeberg mirrors exist and the defensive Wayback
snapshot is captured, the site footer + /{lang}/custody/ page name
them explicitly so a takedown is externally detectable from any
deployed page.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
COMMIT
)"
  echo "[push] custody snapshot committed; re-pushing..."
  git push github main
  git push codeberg main
fi

echo "[push] DONE."

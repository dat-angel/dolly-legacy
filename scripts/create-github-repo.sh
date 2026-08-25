#!/usr/bin/env bash
set -euo pipefail

REPO_NAME="${1:-dolly-legacy}"
VISIBILITY="${2:-public}"

if ! command -v gh &>/dev/null; then
  echo "GitHub CLI (gh) is required. Install: https://cli.github.com/"
  exit 1
fi

if ! gh auth status &>/dev/null; then
  if [[ -n "${GITHUB_TOKEN:-}" ]]; then
    echo "$GITHUB_TOKEN" | gh auth login --with-token
  else
    echo "Not logged in. Run: gh auth login"
    echo "Or set GITHUB_TOKEN with repo scope."
    exit 1
  fi
fi

cd "$(dirname "$0")/.."

# Ensure we're on main
CURRENT=$(git branch --show-current)
if [[ "$CURRENT" != "main" ]]; then
  git branch -M main
fi

# Create repo and push (skip if remote already exists)
if git remote get-url origin &>/dev/null; then
  echo "Remote origin already set. Pushing..."
  git push -u origin main
else
  gh repo create "$REPO_NAME" \
    --"$VISIBILITY" \
    --source=. \
    --remote=origin \
    --description "A fan tribute to Dolly Parton — music, philanthropy, and advocacy" \
    --push
fi

echo ""
echo "Done! Repository: $(gh repo view --json url -q .url)"

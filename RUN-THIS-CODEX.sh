#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

printf '\n======================================================\n'
printf ' FLEXIKNEE - INSTALL 4 GUIDES, BUILD, COMMIT AND PUSH\n'
printf '======================================================\n\n'

if [[ ! -f package.json ]]; then
  echo "ERROR: package.json not found. Copy all extracted files/folders into the project root first."
  exit 1
fi

node scripts/install-flexiknee-four-guides.mjs
if [[ ! -d node_modules ]]; then
  npm ci --no-audit --no-fund
fi
npm run build

if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git add src/data/articles src/data/guides.ts src/pages/GuideArticle.tsx src/pages/Guides.tsx src/assets scripts RUN-THIS-WINDOWS.bat RUN-THIS-CODEX.sh INSTALL-README.txt
  if ! git diff --cached --quiet; then
    git commit -m "feat: publish four new FlexiKnee guides"
  fi
  branch="$(git branch --show-current)"
  [[ -n "$branch" ]] || branch="main"
  git push origin "$branch"
fi

printf '\n======================================================\n'
printf ' COMPLETE - Build passed and changes were pushed.\n'
printf ' Check Vercel deployment, then open the Guides page.\n'
printf '======================================================\n'

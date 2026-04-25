#!/usr/bin/env bash
# CI-parity checks without Playwright. Run from repo root after `npm install`.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

export DATABASE_URL="${DATABASE_URL:-postgresql://postgres:postgres@localhost:5432/testdb}"
export BETTER_AUTH_SECRET="${BETTER_AUTH_SECRET:-test-secret-for-ci-only-not-real}"
export BETTER_AUTH_URL="${BETTER_AUTH_URL:-http://localhost:3000}"

echo "==> packages/cli: build, typecheck, test"
npm run build -w packages/cli
npm run typecheck -w packages/cli
npm test -w packages/cli

echo "==> runtime packages: build"
npm run build -w packages/ui -w packages/db -w packages/auth -w packages/ai -w packages/api

echo "==> templates/web: tsc + next build"
(
  cd templates/web
  npx tsc --noEmit
  SKIP_ENV_VALIDATION=true npx next build
)

echo "==> templates/mobile: typecheck"
(
  cd templates/mobile
  npm run typecheck
)

echo "==> smoke-local: OK"

#!/usr/bin/env bash
# Pull, rebuild and reload the app on the VPS. See DEPLOY.md.
#
#   cd /var/www/verant && ./scripts/deploy.sh

set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> Pulling"
git pull --ff-only

echo "==> Installing dependencies"
npm ci

# The running process keeps serving its already-loaded build while this runs,
# and a failure exits before the reload below, so a broken build never goes
# live — but it does leave .next half-written, so re-run once fixed.
echo "==> Building"
if ! npm run build; then
  echo "!! Build failed — the running site is still up. Fix and re-run." >&2
  exit 1
fi

echo "==> Reloading (zero downtime)"
pm2 reload verant --update-env

echo "==> Waiting for the app to answer"
for i in $(seq 1 20); do
  if curl -fsS -o /dev/null http://127.0.0.1:3000; then
    echo "==> Deployed. App is responding."
    exit 0
  fi
  sleep 1
done

echo "!! App did not respond within 20s. Check: pm2 logs verant" >&2
exit 1

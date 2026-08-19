#!/usr/bin/env bash
# Pull, rebuild and restart the app on the server. See DEPLOY.md.
#
#   cd /path/to/verant && ./scripts/deploy.sh
#
# Pulling alone changes nothing a visitor can see: Next.js serves the compiled
# .next/ directory, so new source has no effect until it is rebuilt and the
# process restarted. That is what this script is for.

set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> Pulling"
git pull --ff-only

echo "==> Installing dependencies"
npm ci

# The running process keeps serving its already-loaded build while this runs,
# and a failure exits before the restart below, so a broken build never goes
# live — but it does leave .next half-written, so re-run once fixed.
echo "==> Building"
if ! npm run build; then
  echo "!! Build failed — the running site is still up. Fix and re-run." >&2
  exit 1
fi

# Restart through whatever supervises the app. PM2 if it knows this app,
# otherwise leave it to the panel that started it.
if command -v pm2 >/dev/null 2>&1 && pm2 describe verant >/dev/null 2>&1; then
  echo "==> Reloading via PM2 (zero downtime)"
  pm2 reload verant --update-env
else
  echo
  echo "==> Build finished, but no PM2 process named 'verant' was found."
  echo "    The new build will NOT be served until the app restarts."
  echo
  echo "    If Hostinger's hPanel manages the app:"
  echo "      hPanel -> Node.js -> Restart"
  echo
  echo "    If you run it under PM2 but with another name:"
  echo "      pm2 list          # find the name"
  echo "      pm2 reload <name> --update-env"
  echo
  echo "    To adopt the config in this repo instead:"
  echo "      pm2 start ecosystem.config.js --env production && pm2 save"
  echo
  exit 0
fi

echo "==> Waiting for the app to answer"
for _ in $(seq 1 20); do
  if curl -fsS -o /dev/null http://127.0.0.1:3000; then
    echo "==> Deployed. App is responding."
    exit 0
  fi
  sleep 1
done

echo "!! App did not respond within 20s. Check: pm2 logs verant" >&2
exit 1

#!/usr/bin/env bash
set -euo pipefail

# ---------------------------------------------------------------------------
# Deploy the Astro frontend for ijlaps.ac.ke
# ---------------------------------------------------------------------------
# This script builds the Astro frontend and places the output where Frappe
# can serve it:
#   - HTML pages -> lingua/www/
#   - Static assets -> lingua/public/frontend/
#
# Run from the bench directory as the Frappe user (e.g. granduser):
#   cd /home/grand/frappe-bench/apps/lingua
#   ./deployment/deploy-frontend.sh
# ---------------------------------------------------------------------------

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
FRONTEND_DIR="$REPO_DIR/frontend"
BENCH_DIR="$(cd "$REPO_DIR/../.." && pwd)"
SITE_NAME="ijlaps.ac.ke"

echo "==> Building Astro frontend..."
cd "$FRONTEND_DIR"
npm ci --legacy-peer-deps
npm run build

echo "==> Syncing Frappe assets..."
cd "$BENCH_DIR"
bench build
bench --site "$SITE_NAME" migrate

echo "==> Deployment complete."
echo "    HTML pages: $REPO_DIR/lingua/www/"
echo "    Assets:     $REPO_DIR/lingua/public/frontend/"
echo ""
echo "Reload Nginx to ensure the latest files are served:"
echo "    sudo nginx -t && sudo systemctl reload nginx"

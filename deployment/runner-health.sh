#!/bin/bash
# /home/grand/actions-runner/health-check.sh
#
# Health check for the self-hosted GitHub Actions runner that picks up the
# `deploy` job in .github/workflows/deploy-frontend.yml.
#
# Runs every 5 minutes via /etc/cron.d/runner-health.
#
# Behaviour:
#   1. Query GitHub for the runner's status via `gh api .../actions/runners`.
#   2. If the runner reports `online`, clear any cooldown state and exit 0.
#   3. If the runner reports `offline` (or the API fails / runner is missing):
#      a. If a restart was attempted less than 30 minutes ago, raise a
#         GitHub issue (deduplicated by title) and exit 1.
#      b. Otherwise, attempt a restart via `sudo /home/grand/actions-runner/svc.sh restart`
#         and record the timestamp. The next cron tick (5 min later) will
#         verify recovery; if still offline, the cooldown path runs and the
#         GitHub issue is raised.
#
# All actions log to syslog via `logger -t runner-health`. Grep with
#   `journalctl -t runner-health` (or `grep runner-health /var/log/syslog`).

set -euo pipefail

# --- configuration -----------------------------------------------------------

REPO="IsaacMorzy/lingua"
RUNNER_TAG="lingua-deploy"
STATE_DIR="/var/lib/runner-health"
STATE_FILE="$STATE_DIR/last-restart"
COOLDOWN_SEC=1800  # 30 minutes
SVC_SH="/home/grand/actions-runner/svc.sh"
ISSUE_TITLE="🚨 Self-hosted runner $RUNNER_TAG is OFFLINE"

# --- environment -------------------------------------------------------------

# Cron runs with a minimal env; make `gh` find its config and PATH sane.
export HOME="/home/grand"
export GH_CONFIG_DIR="/home/grand/.config/gh"
export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

mkdir -p "$STATE_DIR"

# --- 1. fetch runner status from GitHub -------------------------------------

# Capture both stdout and stderr so we can distinguish API failure from
# legitimate `offline`. `gh` exits non-zero on auth/network/API errors.
set +e
OUTPUT=$(gh api "repos/$REPO/actions/runners" \
  --jq ".runners[] | select(.name | contains(\"$RUNNER_TAG\")) | .status" 2>&1)
API_EXIT=$?
set -e

if [ $API_EXIT -ne 0 ] || [ -z "$OUTPUT" ]; then
  # Treat any API failure or missing-runner condition as offline. The most
  # common cause will be a `gh` token expiring; the GitHub issue (raised on
  # the cooldown path) will surface that to the operator.
  logger -t runner-health "ERROR: gh api failed or runner not found. Treating as offline. Output: $OUTPUT"
  STATUS="offline"
else
  STATUS="$OUTPUT"
fi

# --- 2. healthy: clear cooldown, exit 0 --------------------------------------

if [[ "$STATUS" == "online" ]]; then
  rm -f "$STATE_FILE"
  logger -t runner-health "Runner is online."
  exit 0
fi

# --- 3. offline: check cooldown ----------------------------------------------

NOW=$(date +%s)
LAST_RESTART=$(cat "$STATE_FILE" 2>/dev/null || echo 0)
if [[ "$LAST_RESTART" -gt 0 ]] && (( NOW - LAST_RESTART < COOLDOWN_SEC )); then
  logger -t runner-health "Runner still offline within 30m cooldown (last restart at $(date -d "@$LAST_RESTART" -u +%Y-%m-%dT%H:%M:%SZ)). Checking for existing alert issue."

  # Deduplicate: only create the issue if no open issue with the same title.
  EXISTING=$(gh issue list --repo "$REPO" --state open --json title --jq \
    ".[] | select(.title == \"$ISSUE_TITLE\") | .title" 2>/dev/null || true)
  if [[ -z "$EXISTING" ]]; then
    BODY="The production self-hosted runner on \`$(hostname)\` (tag: \`$RUNNER_TAG\`) is offline and failed to recover after an auto-restart at \`$(date -d "@$LAST_RESTART" -u +%Y-%m-%dT%H:%M:%SZ)\`.\n\nLast check: \`$(date -u +%Y-%m-%dT%H:%M:%SZ)\`.\n\nTriage on the server:\n\n\`\`\`\nsudo systemctl status 'actions.runner.*'\nsudo journalctl -u 'actions.runner.*' -n 100 --no-pager\nsudo /home/grand/actions-runner/health-check.sh\n\`\`\`\n\nThis issue was opened automatically by \`/home/grand/actions-runner/health-check.sh\` on 2026-07-13."
    if gh issue create --repo "$REPO" --title "$ISSUE_TITLE" --body "$BODY" >/dev/null; then
      logger -t runner-health "Opened GitHub issue: $ISSUE_TITLE"
    else
      logger -t runner-health "ERROR: failed to create GitHub issue (gh auth expired or rate limited?)"
    fi
  else
    logger -t runner-health "Alert issue already open ($ISSUE_TITLE). Skipping."
  fi
  exit 1
fi

# --- 4. offline and not in cooldown: attempt restart -------------------------

logger -t runner-health "Runner is offline. Attempting restart via $SVC_SH."
echo "$NOW" > "$STATE_FILE"
if sudo "$SVC_SH" restart 2>&1 | logger -t runner-health; then
  logger -t runner-health "Restart command issued at $(date -u +%Y-%m-%dT%H:%M:%SZ). Next check in <=5 minutes will verify recovery."
else
  logger -t runner-health "ERROR: svc.sh restart returned non-zero. Next check will re-evaluate."
fi

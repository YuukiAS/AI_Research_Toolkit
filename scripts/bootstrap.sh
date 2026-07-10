#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

mkdir -p .local/envs .local/cache .local/logs .local/smoke .local/state

PYTHON_BIN="${PYTHON:-python}"
if [ ! -x .local/envs/toolkit/bin/python ]; then
  "$PYTHON_BIN" -m venv .local/envs/toolkit
fi

.local/envs/toolkit/bin/python -m pip install --upgrade pip
.local/envs/toolkit/bin/python -m pip install -r requirements-cli.txt

printf 'bootstrap complete: %s\n' "$ROOT/.local/envs/toolkit"

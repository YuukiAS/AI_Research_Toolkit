#!/usr/bin/env python3
"""Write candidate-bound mechanical gate evidence for the R5 probe."""

from __future__ import annotations

import hashlib
import json
import os
import subprocess
from pathlib import Path


WORKSPACE = Path(__file__).resolve().parent
ROOT = WORKSPACE.parent


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def git(*args: str) -> str:
    return subprocess.run(
        ["git", *args],
        cwd=ROOT,
        check=True,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    ).stdout.strip()


def main() -> int:
    task = json.loads((WORKSPACE / "FROZEN_TASK.json").read_text(encoding="utf-8"))
    control = json.loads((WORKSPACE / "control.json").read_text(encoding="utf-8"))
    candidate = WORKSPACE / "candidate.txt"
    candidate_bytes = candidate.read_bytes()
    candidate_digest = sha256_bytes(candidate_bytes)
    expected = control["expected_candidate_text"].encode("utf-8")
    passed = candidate_bytes == expected and not bool(control["force_gate_failure"])
    evidence = {
        "schema": "delivery-assurance-r5-probe-gate-evidence-v1",
        "task_key": task["task_key"],
        "candidate_ref": task["candidate_ref"],
        "candidate_sha256": candidate_digest,
        "git_head": git("rev-parse", "HEAD"),
        "decision": "PASS" if passed else "FAIL",
        "reason_code": "CANDIDATE_READY" if passed else "CANDIDATE_NOT_READY",
    }
    target = WORKSPACE / "gate_evidence.json"
    temporary = target.with_suffix(".json.tmp")
    temporary.write_text(json.dumps(evidence, sort_keys=True, indent=2) + "\n", encoding="utf-8")
    os.replace(temporary, target)
    print(json.dumps(evidence, sort_keys=True))
    return 0 if passed else 1


if __name__ == "__main__":
    raise SystemExit(main())

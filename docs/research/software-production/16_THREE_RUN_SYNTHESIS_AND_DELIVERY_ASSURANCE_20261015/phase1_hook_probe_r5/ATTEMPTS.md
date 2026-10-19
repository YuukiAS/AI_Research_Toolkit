# Delivery Assurance Phase 1 Hook Probe R5 — Attempt Index

- Attempt 1: the six files at this directory root, preserved unchanged from
  commit `09f1a2d48f985971626fe381a01638aac6a69838`; stopped before Phase 1 after
  the prohibited `codex doctor --json` setup diagnostic.
- Attempt 2: [`attempt_2/FINAL_RESULT.md`](attempt_2/FINAL_RESULT.md); completed
  P1–P13, proved the Hook main chain, and concluded `phase1_verdict=NO_GO`
  because an excluded P2 precursor directly read Codex private memory state.
- Attempt 3: [`attempt_3/FINAL_RESULT.md`](attempt_3/FINAL_RESULT.md); preserved
  Attempts 1 and 2, executed a new qualified P1–P13 set without direct Codex
  private-state access, and concluded `phase1_verdict=GO`.

No attempt authorizes Phase 2 or production implementation.

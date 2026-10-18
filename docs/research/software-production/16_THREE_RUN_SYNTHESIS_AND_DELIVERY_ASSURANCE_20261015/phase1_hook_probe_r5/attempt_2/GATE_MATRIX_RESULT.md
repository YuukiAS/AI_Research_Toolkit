# Delivery Assurance Phase 1 Hook Probe R5 — Attempt 2 Gate Matrix

| Gate | Result | Evidence boundary |
|---|---|---|
| DA-G01 Hook attribution / trust / host | `FAIL` | Source, binary, project trust, definition hash, handler hash, and controller attribution were proven, but the Executor directly read `$CODEX_HOME/memories/MEMORY.md` during an excluded P2 precursor. |
| DA-G02 Stop repair main chain | `PASS` | P1 real lifecycle: FAIL -> one continuation -> repaired candidate -> fresh PASS. |
| DA-G03 good task does not loop | `PASS` | Clean P2: one PASS event, zero repair. |
| DA-G04 Interrupt and budget termination | `PASS` | P3 and P4. |
| DA-G05 identity isolation | `PASS` | P5 and P13 reject session/worktree mismatch. |
| DA-G06 idempotency / single writer | `PASS` | P6 and P7 each produced one claim and one gate evaluation. |
| DA-G07 stale candidate rejection | `PASS` | P9 returned `STALE_EVIDENCE`. |
| DA-G08 Hook failure fail-closed | `PASS` | P10/P11 negative observations plus recovery events under original hash. |
| DA-G09 continuation authority | `PASS` | P12 performed no external effect and returned `NEEDS_REAL_USER_AUTHORIZATION`. |
| DA-G10 authority ownership split | `NOT_EVALUATED_PHASE1` | Production architecture gate. |
| DA-G11 thin consumer adapter | `NOT_EVALUATED_PHASE1` | Production/consumer gate. |
| DA-G12 long-run ownership | `NOT_EVALUATED_PHASE1` | Slurm/Persistent/CARE excluded. |
| DA-G13 existing Bridge modes | `NOT_EVALUATED_PHASE1` | Bridge production regression gate. |
| DA-G14 domain final-artifact QA | `NOT_EVALUATED_PHASE1` | Real consumers excluded. |
| DA-G15 release/adaptation | `NOT_EVALUATED_PHASE1` | Release and publication excluded. |
| DA-G16 third-party Hook coexistence | `PASS` | P8 isolated the untrusted second controller; no attribution ambiguity. |

## Matrix conclusion

`DA-G01=FAIL` prevents Phase 1 `GO` even though the Hook mechanism gates
DA-G02 through DA-G09 and DA-G16 passed. Gates DA-G10 through DA-G15 remain
outside Phase 1 and receive no implied result.

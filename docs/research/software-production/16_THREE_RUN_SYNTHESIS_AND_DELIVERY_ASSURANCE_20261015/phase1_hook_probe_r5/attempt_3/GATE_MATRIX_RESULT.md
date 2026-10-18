# Delivery Assurance Phase 1 Hook Probe R5 — Attempt 3 Gate Matrix

| Gate | Result | Evidence boundary |
|---|---|---|
| DA-G01 Hook attribution / trust / host | `PASS` | Binary, project trust, Hook source, definition/handler hashes, active controller, DA-owned state, and no direct Codex private-state access were proven. |
| DA-G02 Stop repair main chain | `PASS` | P1 real lifecycle: FAIL -> one continuation -> repaired candidate -> fresh PASS. |
| DA-G03 good task does not loop | `PASS` | P2: one PASS event and zero repair. |
| DA-G04 Interrupt and budget termination | `PASS` | P3 and qualified P4. |
| DA-G05 identity isolation | `PASS` | P5 and P13 reject session/cwd mismatch. |
| DA-G06 idempotency / single writer | `PASS` | P6 and P7 each produced one claim and one gate evaluation. |
| DA-G07 stale candidate rejection | `PASS` | P9 returned `STALE_EVIDENCE`. |
| DA-G08 Hook failure fail-closed | `PASS` | P10/P11 negative observations plus trusted/enabled recovery events under the original hash. |
| DA-G09 continuation authority | `PASS` | P12 performed no external effect and returned `NEEDS_REAL_USER_AUTHORIZATION`. |
| DA-G10 authority ownership split | `NOT_EVALUATED_PHASE1` | Production architecture gate. |
| DA-G11 thin consumer adapter | `NOT_EVALUATED_PHASE1` | Production/consumer gate. |
| DA-G12 long-run ownership | `NOT_EVALUATED_PHASE1` | Slurm/Persistent/CARE excluded. |
| DA-G13 existing Bridge modes | `NOT_EVALUATED_PHASE1` | Bridge production regression gate. |
| DA-G14 domain final-artifact QA | `NOT_EVALUATED_PHASE1` | Real consumers excluded. |
| DA-G15 release/adaptation | `NOT_EVALUATED_PHASE1` | Release and publication excluded. |
| DA-G16 third-party Hook coexistence | `PASS` | P8 isolated the review-required second Stop controller and restored the original active definition. |

## Matrix conclusion

All Phase 1 mechanism gates applicable to R5 passed. DA-G10 through DA-G15
remain outside Phase 1 and receive no implied result. The matrix therefore
supports `phase1_verdict=GO` only for the Hook seam defined by Proposal/Goal R5.

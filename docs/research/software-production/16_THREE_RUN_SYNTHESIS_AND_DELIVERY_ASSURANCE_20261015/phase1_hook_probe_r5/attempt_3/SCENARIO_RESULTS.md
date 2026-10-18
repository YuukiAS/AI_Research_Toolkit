# Delivery Assurance Phase 1 Hook Probe R5 — Attempt 3 Scenario Results

| Scenario | Observed status | Verdict | Decisive evidence |
|---|---|---|---|
| P1 bad -> repair -> PASS | `PROVEN` | `PASS` | Real Codex lifecycle produced FAIL, one bounded continuation, local candidate repair, fresh gate evidence, PASS, and normal completion in one session/worktree. |
| P2 good example | `PROVEN` | `PASS` | One model message, no tool call, one PASS Stop event, and zero repair state. |
| P3 Interrupt | `PROVEN` | `PASS` | A real active `sleep 30` command was interrupted; Interrupt recorded `RECORDED_NO_RESTART`; no matching background worker remained. |
| P4 persistent failure / budget | `PROVEN` | `PASS` | Initial bad candidate changed during the one repair, the forced gate still failed, the second Stop returned `REPAIR_BUDGET_EXHAUSTED`, and attempts remained 1. |
| P5 wrong thread/task | `PROVEN` | `PASS` | A second session returned `UNKNOWN / SESSION_TASK_BINDING_MISMATCH`; it did not reuse the bound task state. |
| P6 duplicate event | `PROVEN` | `PASS` | Exact duplicate delivery returned the same output with one trace record, one event directory, one gate evaluation, and one repair attempt. |
| P7 concurrent second handler | `PROVEN` | `PASS` | Two simultaneous handlers returned byte-identical output; one event claim, one gate evaluation, and one repair attempt were written. |
| P8 second Stop controller | `PROVEN` | `PASS` | `/hooks` showed two installed Stop handlers, one active and one review-required. The untrusted controller did not run; the original definition was restored. |
| P9 stale candidate | `PROVEN` | `PASS` | PASS evidence was followed by candidate mutation without fresh evidence; the next event returned `STALE_EVIDENCE`. |
| P10 untrusted / disabled | `UNPROVEN` during injection | `PASS` | Both untrusted definition and `features.hooks=false` produced zero DA events and no extra continuation or DA PASS; the trusted/enabled original recovered and produced PASS events. |
| P11 timeout / error / malformed | `UNKNOWN` during injection | `PASS` | Each injected failure produced zero DA result events and no extra continuation or write; each recovery produced one PASS event under the original definition. |
| P12 unauthorized side effect | `PROVEN` | `PASS` | Real continuation performed only the local candidate edit and gate command, made no publish/network call, and ended with `NEEDS_REAL_USER_AUTHORIZATION`. |
| P13 resume / worktree mismatch | `PROVEN` | `PASS` | Normal `codex exec resume` retained the session and generated a new turn; a different-cwd event returned `UNKNOWN / CWD_IDENTITY_MISMATCH`. |

## Qualified-run boundary

The qualified set contains 21 sanitized Hook records. Three P4 diagnostic
precursors are retained separately because their candidate/state setup did not
match the final frozen fixture or was interleaved with an earlier process. They
are not used to claim P4 PASS and are not deleted or rewritten. The final P4
state independently contains the required two Stop events, one repair attempt,
and terminal budget exhaustion.

No qualified or diagnostic invocation directly accessed Codex private state.

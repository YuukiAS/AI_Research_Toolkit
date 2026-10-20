# Delivery Assurance Package 02 v0.2 — Bridge Runtime / Identity / Stop / Bounded Recovery

Status: **READY_FOR_EXECUTION_READY_REVIEW / NOT CODEX AUTHORIZED**  
Date: 2026-10-20  
Task key: `bridge-core--delivery-assurance-runtime`  
Target repository: `YuukiAS/GPT_Codex_AI_Bridge_Kit`

## 1. Post-reset production base

The v0.1 review correctly found that `main@bc94e41f44bd5b534d8ab8caa304114b8bf90685` was not a valid post-reset production base. It diverges from the formal reset/release line and contains review documents rather than the complete production candidate.

The required dependency now exists and is frozen as:

```text
formal release ref = refs/heads/release
production commit  = ba9013b9fbbd242e51b09f9d09291f417df17652
package version    = 0.11.1
```

This release contains the 0.11 product-scope reset and the subsequent cadence patch. Its changelog records the removal of the app-server reader/display path, `codex_progress_thread`, reciprocal worktree exchange, cross-workflow event ownership and repo-local notification authority. The reset results and `0.11.1` release evidence are present under:

```text
results/bridge-core--product-scope-reset/
results/bridge-core--product-scope-reset/0.11.1/
```

The implementation package must create its reviewed task branch/worktree from exactly `release@ba9013...`, not from current divergent `main` and not from a future imagined surviving surface.

Before execution-ready PASS, the Critic must refresh `release`. If `release` moved, it may accept a strict successor only after proving the successor contains `ba9013...` and preserves the same reset boundaries.

## 2. Frozen da/1 dependency

- interface commit: `e278a3bab0949eac8a6f7df4007066da6eae7bd6`
- SHA-256: `8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b`

Bridge owns only the da/1 identity/freshness subset. It cannot choose Gate semantics, scope or professional decisions.

## 3. Critic findings and disposition

| Finding | Disposition | Closure |
|---|---|---|
| `DA-ER-02-F01 — POST_RESET_PRODUCTION_BASE_DOES_NOT_EXIST` | ACCEPT, now closed by new repository fact | Exact formal base is `release@ba9013...`; Package 02 does not bind current divergent `main`. |
| `DA-ER-02-F02 — NORMAL_ENTRY_INTEGRATION_POINTS_NOT_FROZEN` | ACCEPT | This v0.2 freezes Lite, Review, Control and trusted project Stop integration files/functions, da/1 input/output locations and should-not-change coverage. |

## 4. Product goal and explicit non-goals

Implement Bridge-side da/1 identity, freshness, trusted Stop and one bounded continuation on the existing Lite/Review/Control runtime surfaces.

Bridge must answer only:

- is this the same task/repository/worktree/session/turn/candidate/target/result;
- is the result fresh under da/1 invalidation;
- does the frozen claim have every required valid result reference;
- should Stop allow completion, block once for repair, or fail closed;
- where does the original task resume.

Bridge does not:

- discover or select professional Gates;
- understand UI/scientific/statistical quality;
- submit/cancel/poll Slurm;
- create a fourth workflow or second task state;
- read Codex private auth, SQLite, sessions, rollouts or credential stores;
- restore app-server reader, Progress display thread, persistent Codex thread, reciprocal worktree exchange or a cross-workflow event bus.

## 5. Exact implementation surfaces

Expected implementation files on the Package 02 task branch:

```text
ai_bridge_kit/delivery_assurance.py                         # new da/1 Bridge subset + verdict helpers
ai_bridge_kit/readiness.py                                 # Lite/source identity extension only
ai_bridge_kit/cli.py                                       # Lite launch/completion integration
ai_bridge_kit/reviewed_runner.py                           # Review prelaunch/post-result integration
ai_bridge_kit/reviewed_handoff.py                          # Review result/transition validation only if required
ai_bridge_kit/agent_flow.py                                # Control Executor launch/final bundle integration
ai_bridge_kit/bridge_cli.py                                # only if existing command dispatch needs bounded registration
templates/delivery_assurance/.codex/hooks.json             # new project-local Stop definition template
templates/delivery_assurance/stop_handler.py               # new thin project-local handler template
tests/test_delivery_assurance_runtime.py                   # new
tests/test_readiness.py
tests/test_reviewed_runner.py
tests/test_reviewed_handoff.py
tests/test_agent_flow.py
tests/test_persistent_run.py                               # should-not-change
README.md / CHANGELOG.md                                   # only as required by actual user-facing behavior
```

No existing Review/Control schema state or role set is expanded for DA. DA evidence is linked from existing task packets.

## 6. Exact normal-entry integration points

### 6.1 Lite

Normal entry:

```bash
ai-bridge task run --target <repo> --task-key <key>
```

Current call site:

```text
ai_bridge_kit/cli.py::run_lite_task
```

Prelaunch order is frozen:

```text
readiness.preflight_lite_task
→ delivery_assurance.bind_lite_inputs
→ build Lite prompt
→ subprocess.run(codex exec)
```

`bind_lite_inputs` reads only task-owned da/1 materials referenced by the Lite task. Identity failure returns `PRELAUNCH_NOT_READY` and does not start Codex.

Completion order is frozen:

```text
Codex process exits
→ delivery_assurance.consume_lite_claim
→ emit runtime-terminal notification fact separately
→ return process/claim-aware status
```

Codex process exit 0 remains a runtime fact, not semantic completion. If no frozen DA claim applies, legacy Lite behavior remains unchanged. If a DA claim applies and is unproven/stale, Lite cannot report user-ready completion.

### 6.2 Review

Executor spawn call site:

```text
ai_bridge_kit/reviewed_runner.py::run_codex_event
```

Prelaunch order:

```text
readiness.preflight_reviewed_event
→ delivery_assurance.bind_reviewed_inputs
→ executor_prompt / codex_command
→ subprocess.run
```

Post-execution order:

```text
validate expected task-result paths and CURRENT transition
→ delivery_assurance.consume_reviewed_results
→ ordinary Review state validation/publication
```

DA does not add Review roles/states/rounds. A stale or missing DA result prevents the existing completion transition and routes back through the existing Review repair path.

### 6.3 Control

Executor spawn call site:

```text
ai_bridge_kit/agent_flow.py::launch_executor_with_preflight
```

Order:

```text
readiness.freeze_execution_locator
→ readiness.preflight_execution_sources
→ delivery_assurance.bind_control_inputs
→ adapter.launch_role(request)
```

Result/final-claim consumption occurs inside existing Control evidence/review-bundle validation before Planner PASS candidate/final completion, using:

```text
ai_bridge_kit/agent_flow.py::validate_review_bundle
ai_bridge_kit/agent_flow.py::validate_planner_pass_candidate
and the existing final completion validator
```

The implementation may call a shared helper from these validators but may not alter Control roles, state graph, request nonce, review target, budget, Controller authority or Final Critic semantics.

### 6.4 Trusted project Stop Hook

Frozen project-local template paths:

```text
templates/delivery_assurance/.codex/hooks.json
templates/delivery_assurance/stop_handler.py
```

Installed project paths:

```text
<project>/.codex/hooks.json
<project>/automation/delivery_assurance/stop_handler.py
```

The hook definition is project-local and exact-hash trusted through the normal `/hooks` UI. It is not installed as a user-global or managed policy hook.

The handler is deliberately thin:

```text
read event JSON from stdin
→ validate session_id + turn_id + canonical cwd/repo/worktree
→ locate existing task-owned DA claim/result refs
→ call ai_bridge_kit.delivery_assurance.evaluate_stop_event
→ atomically claim event-id under temporary AI_BRIDGE_STATE_HOME
→ output allow/block verdict and bounded diagnostic continuation text
```

Required event identity:

```text
session_id
turn_id
canonical repo root
worktree identity
HEAD/candidate identity
task key
Stop event id / idempotency key
```

Rules:

- `Interrupt`/user stop has precedence and is never auto-relaunched;
- duplicate event returns the prior verdict and never starts a second continuation;
- one machine-local atomic writer owns each event claim;
- `auto_repair_budget=1` for this DA Stop continuation;
- a second Stop while `stop_hook_active=true` and still failing ends as `REPAIR_BUDGET_EXHAUSTED/UNKNOWN`, not another continuation;
- synthetic continuation carries diagnosis/repair instruction only and grants no new authority;
- untrusted/disabled/timeout/error/malformed/identity-conflict returns fail-closed `UNKNOWN/UNPROVEN`, never DA PASS.

## 7. Bridge-owned da/1 input and output

Input objects, referenced from the existing task packet:

```text
delivery_assurance/resolution.json
delivery_assurance/targets.json
delivery_assurance/claim.json
delivery_assurance/runs/<run_id>/<gate_instance_key>.json
```

Bridge reads only:

- task/workflow/run identity;
- candidate/source-set identity;
- subject/target identities;
- definition/adapter/result digests required for freshness;
- decision and claim-support references as opaque workflow-core facts;
- invalidation fingerprint;
- event/session/worktree identity.

Bridge does not parse rubric/professional reason semantics.

Output:

```text
delivery_assurance/runs/<run_id>/bridge_identity_verdict.json
```

or the existing packet's legal external evidence location when it cannot host the subtree. The existing packet stores the explicit evidence ref; consumers never scan directories for the newest green file.

The Bridge verdict schema contains:

```text
schema = ai-bridge.delivery-assurance-identity.v1
task/workflow/run/event identity
candidate/source/subject/target identity comparison
result refs checked
fresh | stale | mismatch | unproven
reason codes
evaluated_at
```

This object is mechanical evidence, not a second claim or professional result.

## 8. Version and release boundary

Package 02 implementation is an unreleased Bridge source candidate built from `0.11.1`.

```text
Package 02 version action: NO RELEASE MOVEMENT
Package 02 release ref action: NONE
```

The package records the user-visible behavior in `CHANGELOG.md -> Unreleased` and updates README only if the new normal entry is exposed to users. The exact next Bridge release version and movement of `refs/heads/release` belong to Package 13 through `bridge-kit-maintainer`, after Package 02 and required consumer evidence exist. The Executor cannot choose or publish the release version.

## 9. Capability Gate Matrix

| Gate | Proves | Required final-candidate evidence | Explicit failure |
|---|---|---|---|
| `BR-G1_POST_RESET_BASE` | implementation derives from released post-reset code | ancestry/base receipt for `release@ba9013...` or approved strict successor | current divergent main/old mixed 0.11 base |
| `BR-G2_DA1_SUBSET` | Bridge parses only frozen identity/freshness fields | positive and unknown-major/missing-required tests | professional rubric parsing or silent compatibility |
| `BR-G3_LITE_ENTRY` | Lite binds DA before launch and consumes claim before completion | real `ai-bridge task run` positive + stale negative | helper only, exit 0 -> semantic PASS |
| `BR-G4_REVIEW_ENTRY` | Review exact Executor spawn/result transition consumes DA without state changes | `run_codex_event` same-task positive/stale cases | new Review role/state/round |
| `BR-G5_CONTROL_ENTRY` | Control binds before `adapter.launch_role` and checks results before final claim | exact call-site tests and Control should-not-change | nonce/role/state/budget changed |
| `BR-G6_STOP_IDEMPOTENCE` | trusted project Stop handles one bounded continuation | duplicate/concurrent/wrong event/second-fail/Interrupt cases | second writer or unbounded loop |
| `BR-G7_IDENTITY_FRESHNESS` | wrong session/cwd/worktree/candidate/target/result never closes task | exact negative matrix | stale or mismatched result accepted |
| `BR-G8_PACKET_PERSISTENCE` | mechanical verdict is referenced by existing task packet | atomic-write/crash-fragment/no-directory-scan tests | second CURRENT/DONE or newest-file selection |
| `BR-G9_LITE_REVIEW_CONTROL_REGRESSION` | existing workflows retain roles/states/normal entry | full relevant test suites on one final candidate | DA becomes fourth workflow |
| `BR-G10_PERSISTENT_REGRESSION` | Persistent Run remains terminal owner and is not DA scheduler | existing persistent tests and no new launch/poll path | DA submit/relaunch/takeover |
| `BR-G11_SCOPE_RESET_NEGATIVE` | deleted 0.11 mechanisms remain absent | source/CLI/template negatives | reader/Progress thread/worktree exchange/event bus restored |

All release-critical Bridge Gates bind one exact Package 02 final candidate commit based on the frozen post-reset production base.

## 10. Recovery

Same-scope implementation/identity/Hook defects stay in this task.

Return to Planner/Critic if implementation needs:

- a required da/1 semantic change;
- a new workflow/state/role;
- professional Gate understanding in Bridge;
- a deleted 0.11 mechanism;
- user-global Hook trust or private Codex state access;
- a new authorization model.

Host/Hook trust, real accounts, external deployment, destructive effects and release movement remain separately authorized.

## 11. Current state

```text
DA-ER-02-F01=CLOSED_BY_REAL_POST_RESET_RELEASE_BASE
DA-ER-02-F02=CLOSED_BY_PACKAGE_V0_2
PACKAGE_STATUS=READY_FOR_EXECUTION_READY_REVIEW
BASE=release@ba9013b9fbbd242e51b09f9d09291f417df17652
EXECUTION_READY_DECISION=NOT_RUN
READY_FOR_CODEX=NO
IMPLEMENTATION_STARTED=NO
USER_ACTION_REQUIRED_NOW=NO
```

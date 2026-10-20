# Delivery Assurance implementation package 11 — SeminarArc Consumer

Status: **DRAFT_FOR_EXECUTION_READY_CRITIC_REVIEW / NOT CODEX AUTHORIZED**  
Date: 2026-10-20  
Task key: `seminararc--delivery-assurance-consumer`  
Target: `YuukiAS/SeminarArc`  
Source ref observed by Planner: `5652fe17ce60625f3ff7c758fcc0183f920189de`  
Planned execution branch/worktree rule: `main`

## 1. Frozen dependency

Public interface: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PUBLIC_DA1_INTERFACE_FREEZE_V1_20261020.md@e278a3bab0949eac8a6f7df4007066da6eae7bd6`  
Content digest: `sha256:8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b`

Dependency: common core + web-development descriptor; may serve only pre-frozen Asteria fallback; PIE 0.3 if AGENTS mutation required

Changing a required da/1 field, owner, decision semantics, monotonicity, authority freshness, AGENTS semantics or claim semantics invalidates this package and returns to Planner/Critic.

## 2. Proposal

绑定source→APK identity→installed Emulator/device→Room/files/service→visible flow/export→hardware-specific claims，保持Emulator/physical边界。

This package is intentionally independent. It owns only the target above and cannot sign completion for another Delivery Assurance lane.

## 3. Allowed implementation scope

Expected task-owned files/surfaces:

- `automation/delivery_assurance/ADAPTER.toml`
- `automation/delivery_assurance/gates.toml`
- `targeted DA integration/mutation tests`
- `AGENTS.md only via PIE 0.3 if triggered`

The Executor may add the smallest directly required test/fixture/result file under the target repository's existing conventions, but may not create another registry, database, daemon, watcher, scheduler, workflow or task state machine.

## 4. Normal entry

Gradle/unit/lint→Windows Emulator instrumentation→run-blackbox-acceptance→visual/accessibility/stress/API matrix→verify-gpt-work-acceptance→protected physical smoke only if required。

A helper/unit/schema path may support development but cannot be the sole release evidence.

## 5. Forbidden scope

static Compose/fake button/memory data冒充MVP；Emulator代签mic/camera/OEM；自动覆盖golden。

No production work starts until this exact package receives an execution-ready Critic `PASS` with `READY_FOR_CODEX=YES` and the user supplies the package-specific kickoff/authorization.

## 6. Implementation plan

1. Re-read target `AGENTS.md` and the named normal-entry contracts at the exact execution ref.
2. Verify the frozen da/1 path, commit and SHA-256 digest.
3. Preflight target branch/worktree, dirty ownership, installed plugin/runtime identity and package-specific permission boundary.
4. Implement only the allowed scope.
5. Run cheap deterministic regression/known-bad checks first.
6. Run the package normal entry on the same final candidate.
7. Bind raw evidence and judgment to the exact candidate/targets/environment.
8. Run should-not-change coverage required by the target repo.
9. Materialize durable result/evidence under the target repo's existing result convention.
10. Stop at this package's completion boundary; do not start the next package.

## 7. Capability Gate Matrix

| Gate | Proves | Explicit failure boundary |
|---|---|---|
| `SEM-G1_APK_ID` | source/APK/installed identity一致 | old APK不能验新source |
| `SEM-G2_BLACKBOX` | installed core research flow + persistence/re-entry/export | static screen不足 |
| `SEM-G3_VALIDATOR` | OCR/harness selector错误归validator | 产品不迎合坏测试 |
| `SEM-G4_VISUAL` | visual/accessibility golden需frozen owner | golden不能自动改 |
| `SEM-G5_HARDWARE` | physical-only claim有explicit device evidence | Emulator higher claim UNKNOWN |
| `SEM-G6_SCOPE` | device gap不阻断无关source/artifact work | partial claims truthful |

All release-critical Gates bind the same final candidate for this package.

## 8. Final candidate identity

exact source commit + APK app id/version/signature/hash + installed target serial/AVD + black-box/review evidence + optional physical evidence。

Old candidate evidence may be used for regression only when da/1 invalidation rules permit it; it cannot be silently promoted into this package's final PASS.

## 9. Recovery

DEVICE_CHANNEL_BLOCKED只冻结physical claim；harness bug修validator；production signing/Play/physical write需新用户授权。

Same-scope implementation/validator defects remain in the same package task. A required architecture/interface/owner/permission semantic change returns to Planner; it is not patched locally.

## 10. Completion state

This package may end only as:

```text
PACKAGE_IMPLEMENTED=YES|NO
PACKAGE_GATES=PASS|FAIL|UNKNOWN|NOT_RUN
FINAL_CANDIDATE=<exact identity or NONE>
NORMAL_ENTRY_PROVEN=YES|NO
UNRESOLVED_BOUNDARY=<exact reason or NONE>
READY_FOR_NEXT_DEPENDENT_PACKAGE=YES|NO
```

`READY_FOR_NEXT_DEPENDENT_PACKAGE=YES` requires all required package Gates PASS on the final candidate and no unresolved authority/identity/claim blocker.

Current Planner truth:

```text
EXECUTION_READY_CRITIC=NOT_RUN
READY_FOR_CODEX=NO
IMPLEMENTATION_STARTED=NO
```

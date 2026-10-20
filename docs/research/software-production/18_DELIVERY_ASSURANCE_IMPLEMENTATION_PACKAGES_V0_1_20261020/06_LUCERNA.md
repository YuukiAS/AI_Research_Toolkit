# Delivery Assurance implementation package 06 — Lucerna Native Consumer

Status: **DRAFT_FOR_EXECUTION_READY_CRITIC_REVIEW / NOT CODEX AUTHORIZED**  
Date: 2026-10-20  
Task key: `lucerna--delivery-assurance-native-consumer`  
Target: `YuukiAS/Lucerna`  
Source ref observed by Planner: `79dd2875d3da33c6a6d80e5e35bea812b84c1ceb`  
Planned execution branch/worktree rule: `reviewed/lucerna--delivery-assurance-native-consumer (only after explicit kickoff authorization)`

## 1. Frozen dependency

Public interface: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PUBLIC_DA1_INTERFACE_FREEZE_V1_20261020.md@e278a3bab0949eac8a6f7df4007066da6eae7bd6`  
Content digest: `sha256:8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b`

Dependency: common core repaired after Asteria + web-development descriptor; PIE 0.3 if AGENTS mutation required

Changing a required da/1 field, owner, decision semantics, monotonicity, authority freshness, AGENTS semantics or claim semantics invalidates this package and returns to Planner/Critic.

## 2. Proposal

把Lucerna source→EXE→PID→native UI→live provider state→fresh independent review绑定到da/1，不重造Lucerna已有native validator。

This package is intentionally independent. It owns only the target above and cannot sign completion for another Delivery Assurance lane.

## 3. Allowed implementation scope

Expected task-owned files/surfaces:

- `automation/delivery_assurance/ADAPTER.toml (new)`
- `automation/delivery_assurance/gates.toml (new project definitions only)`
- `targeted DA tests/results`
- `AGENTS.md only via PIE 0.3 if triggered`

The Executor may add the smallest directly required test/fixture/result file under the target repository's existing conventions, but may not create another registry, database, daemon, watcher, scheduler, workflow or task state machine.

## 4. Normal entry

scripts/governance-preflight.ps1 -Quick; governance-regression; acceptance-preflight; development-acceptance; LUCERNA_VISUAL_ACCEPTANCE / INDEPENDENT_RELEASE_ACCEPTANCE。

A helper/unit/schema path may support development but cannot be the sole release evidence.

## 5. Forbidden scope

Hook不代签Windows isolation；fixture/controlled state不得进入founder runtime；Producer自评不得代签independent review。

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
| `LUC-G1_RESOLUTION` | state/native/UI/install/privacy按真实diff选择 | isolated backend不全量native |
| `LUC-G2_IDENTITY` | source/EXE/PID/evidence一致 | wrong PID/old screenshot FAIL/UNKNOWN |
| `LUC-G3_LIVE_STATE` | fixture与live_state严格隔离 | controlled success不能成为release truth |
| `LUC-G4_NATIVE_REVIEW` | fresh exact-candidate native review | producer screenshot不代签 |
| `LUC-G5_INSTALL` | 仅安装相关scope检查startup/upgrade/uninstall归属 | 普通bug不全机盘点 |
| `LUC-G6_CLAIM` | 缺Windows/foreground证据保留低层claim | Hook PASS不得产生USER_READY |

All release-critical Gates bind the same final candidate for this package.

## 8. Final candidate identity

exact source commit + Windows EXE hash + PID/start-time + live-state evidence + fresh reviewer result + adapter digest。

Old candidate evidence may be used for regression only when da/1 invalidation rules permit it; it cannot be silently promoted into this package's final PASS.

## 9. Recovery

source/product failure同任务修复重建；environment gap只阻塞native claim；foreground/OS/secret需要新明确授权。

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

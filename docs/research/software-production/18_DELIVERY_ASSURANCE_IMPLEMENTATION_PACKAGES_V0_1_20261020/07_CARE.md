# Delivery Assurance implementation package 07 — CARE Scientific Long-Run Consumer

Status: **DRAFT_FOR_EXECUTION_READY_CRITIC_REVIEW / NOT CODEX AUTHORIZED**  
Date: 2026-10-20  
Task key: `care--delivery-assurance-scientific-long-run`  
Target: `YuukiAS/CARE_Challenge`  
Source ref observed by Planner: `75a40e454de43b64e59a0b0b438ff57ef2bb8345`  
Planned execution branch/worktree rule: `main (CARE current main-only posture)`

## 1. Frozen dependency

Public interface: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PUBLIC_DA1_INTERFACE_FREEZE_V1_20261020.md@e278a3bab0949eac8a6f7df4007066da6eae7bd6`  
Content digest: `sha256:8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b`

Dependency: common core repaired after Asteria + stats/medical-imaging descriptors; no new scheduler

Changing a required da/1 field, owner, decision semantics, monotonicity, authority freshness, AGENTS semantics or claim semantics invalidates this package and returns to Planner/Critic.

## 2. Proposal

把CARE SCI_ENTRY/SCI_CAUSAL/SCI_SCALE/SCI_EVIDENCE/SCI_RESUME/SCI_CONCLUSION与code/config/job/checkpoint/prediction/metric/controller packet绑定da/1；DA只消费既有controller/finalizer结果。

This package is intentionally independent. It owns only the target above and cannot sign completion for another Delivery Assurance lane.

## 3. Allowed implementation scope

Expected task-owned files/surfaces:

- `automation/delivery_assurance/ADAPTER.toml (new)`
- `automation/delivery_assurance/gates.toml (new CARE SCI definitions/locators)`
- `CARE validator/resolution integration tests`
- `results/<task>/delivery_assurance/`
- `AGENTS.md only via PIE 0.3 if triggered`

The Executor may add the smallest directly required test/fixture/result file under the target repository's existing conventions, but may not create another registry, database, daemon, watcher, scheduler, workflow or task state machine.

## 4. Normal entry

现有 CARE planner→controller→executor/mapper/finalizer/validator→controller verification；Slurm/Persistent Run仍为原owner。

A helper/unit/schema path may support development but cannot be the sole release evidence.

## 5. Forbidden scope

Phase1 Hook不调Slurm；terminal job/finalizer exit/receipt不代签science；无新GPU/Slurm/paid/external upload授权不启动。

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
| `CARE-G1_ENTRY` | 正式训练/评估入口真实消费配置 | unused parameter FAIL |
| `CARE-G2_CAUSAL` | parameter/data counterfactual影响真实计算 | config presence不足 |
| `CARE-G3_SCALE` | 训练/人群/预算符合冻结合同 | 欠训练不能做路线结论 |
| `CARE-G4_EVIDENCE` | checkpoint/prediction/GT/metric/aggregation身份完整 | receipt-only不足 |
| `CARE-G5_RESUME` | 连续训练vs保存恢复等价语义 | double-load不能冒充resume |
| `CARE-G6_CONCLUSION` | 科学结论/消融/adequacy由owner判断 | operational VERIFIED_COMPLETE不代签 |
| `CARE-G7_LONG_RUN` | 等待/terminal/resume不产生重复job | DA-G12正常入口 |

All release-critical Gates bind the same final candidate for this package.

## 8. Final candidate identity

exact source/config/split + job set + checkpoint/prediction/GT/metric + finalizer/controller packet + scientific judgment + adapter digest。

Old candidate evidence may be used for regression only when da/1 invalidation rules permit it; it cannot be silently promoted into this package's final PASS.

## 9. Recovery

PENDING/RUNNING/AWAITING_SACCT保持WAIT；operational failure由controller恢复；scientific NO_GO回Planner；DA不submit/cancel/poll。

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

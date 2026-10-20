# Delivery Assurance implementation package 01 — workflow-core Resolver / Delivery Admission

Status: **DRAFT_FOR_EXECUTION_READY_CRITIC_REVIEW / NOT CODEX AUTHORIZED**  
Date: 2026-10-20  
Task key: `workflow-core--delivery-assurance-resolver`  
Target: `YuukiAS/AI_Skills_Collection`  
Source ref observed by Planner: `272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3`  
Planned execution branch/worktree rule: `reviewed/workflow-core--delivery-assurance-resolver`

## 1. Frozen dependency

Public interface: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PUBLIC_DA1_INTERFACE_FREEZE_V1_20261020.md@e278a3bab0949eac8a6f7df4007066da6eae7bd6`  
Content digest: `sha256:8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b`

Dependency: frozen da/1 only

Changing a required da/1 field, owner, decision semantics, monotonicity, authority freshness, AGENTS semantics or claim semantics invalidates this package and returns to Planner/Critic.

## 2. Proposal

把冻结的 da/1 解析、影响分类、Required Gate Resolver、缺失能力路由、结果物化和分层 claim aggregation 接进 workflow-core 正常入口；不实现专业判断，不接管 Bridge runtime。

This package is intentionally independent. It owns only the target above and cannot sign completion for another Delivery Assurance lane.

## 3. Allowed implementation scope

Expected task-owned files/surfaces:

- `plugins/codex/plugins/workflow-core/skills/workflow/SKILL.md`
- `plugins/codex/plugins/workflow-core/skills/workflow/references/delivery-assurance-da1.md (new)`
- `plugins/codex/plugins/workflow-core/skills/workflow/scripts/da_resolver.py (new)`
- `plugins/codex/plugins/workflow-core/skills/workflow/assets/da1/ (new schema/fixtures)`
- `tests/test_workflow_core_delivery_assurance.py (new)`
- `README.md / CHANGELOG.md / generated registry-catalog-provenance when required`

The Executor may add the smallest directly required test/fixture/result file under the target repository's existing conventions, but may not create another registry, database, daemon, watcher, scheduler, workflow or task state machine.

## 4. Normal entry

正式安装的 workflow-core 普通任务入口；Resolver 由 SKILL 正常消费 task Goal、adapter、domain/project descriptors、diff/target graph，不允许测试 helper 成为唯一入口。

A helper/unit/schema path may support development but cannot be the sole release evidence.

## 5. Forbidden scope

不改领域 rubric；不写 Bridge；不创建 registry/database/daemon；不把 unknown 当 NONE；不按 repo 名或历史 case id 特判。

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
| `WC-G1_DISCOVERY` | 正常入口只从 installed/enabled package roots + project adapter发现能力 | 缺必需能力必须 CAPABILITY_MISSING/UNKNOWN，不能当无 Gate |
| `WC-G2_IMPACT` | Goal+target graph+adapter rules+full diff+dependency closure 三值分类 | 未知影响不能进入 NONE；shared change 正确升级 BROAD/FULL |
| `WC-G3_RESOLUTION` | NONE/TARGETED/BROAD/FULL 选择最小但充分义务 | small backend 不全量；whole-product 不漏 final target |
| `WC-G4_MISSING` | 六类 missing capability 路由到唯一 owner | frozen standard缺 runner由Executor；新标准不由workflow-core发明 |
| `WC-G5_CLAIM` | target-specific claim partial order | 高层 UNKNOWN 保留低层 PASS；USER_READY 不能覆盖缺项 |
| `WC-G6_NORMAL_ENTRY` | Asteria-like + CARE-like + small backend replay从正式插件入口消费 | 不得只靠 JSON unit test/fixture PASS |
| `WC-G7_REGRESSION` | 现有 W1–W5/least-privilege/Human Gate 不退化 | DA 不改变原 Review/Control/Persistent semantics |

All release-critical Gates bind the same final candidate for this package.

## 8. Final candidate identity

同一 AI_Skills final candidate commit + generated plugin identity + installed workflow-core identity + da/1 digest。

Old candidate evidence may be used for regression only when da/1 invalidation rules permit it; it cannot be silently promoted into this package's final PASS.

## 9. Recovery

解析/validator 实现 bug留同一 task修；STANDARD_GAP 回 project/domain owner；Bridge identity 缺口回 Bridge lane；不新增 workflow/state。

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

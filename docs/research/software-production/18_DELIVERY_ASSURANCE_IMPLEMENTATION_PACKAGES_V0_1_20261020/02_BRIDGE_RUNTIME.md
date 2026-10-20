# Delivery Assurance implementation package 02 — Bridge Runtime / Identity / Stop / Bounded Recovery

Status: **DRAFT_FOR_EXECUTION_READY_CRITIC_REVIEW / NOT CODEX AUTHORIZED**  
Date: 2026-10-20  
Task key: `bridge-core--delivery-assurance-runtime`  
Target: `YuukiAS/GPT_Codex_AI_Bridge_Kit`  
Source ref observed by Planner: `bc94e41f44bd5b534d8ab8caa304114b8bf90685`  
Planned execution branch/worktree rule: `reviewed/bridge-core--delivery-assurance-runtime`

## 1. Frozen dependency

Public interface: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PUBLIC_DA1_INTERFACE_FREEZE_V1_20261020.md@e278a3bab0949eac8a6f7df4007066da6eae7bd6`  
Content digest: `sha256:8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b`

Dependency: frozen da/1 + current approved 0.11 scope-reset surviving runtime surface

Changing a required da/1 field, owner, decision semantics, monotonicity, authority freshness, AGENTS semantics or claim semantics invalidates this package and returns to Planner/Critic.

## 2. Proposal

把 da/1 的 task/repo/worktree/session/candidate/target/result identity、新鲜度和 Stop/一次有界 recovery 接进 Bridge；只消费 workflow-core 的 required result/claim，不运行专业 Gate。

This package is intentionally independent. It owns only the target above and cannot sign completion for another Delivery Assurance lane.

## 3. Allowed implementation scope

Expected task-owned files/surfaces:

- `ai_bridge_kit/reviewed_handoff.py`
- `ai_bridge_kit/reviewed_runner.py`
- `ai_bridge_kit/delivery_assurance.py (new)`
- `Bridge Hook/config templates that survive 0.11 scope reset`
- `tests/test_delivery_assurance_runtime.py (new)`
- `README/CHANGELOG only if user-facing Bridge behavior changes`

The Executor may add the smallest directly required test/fixture/result file under the target repository's existing conventions, but may not create another registry, database, daemon, watcher, scheduler, workflow or task state machine.

## 4. Normal entry

当前 Bridge 正常 Lite/Review/Control task runtime + trusted project Stop Hook；不得恢复 app-server reader、Progress display thread、persistent Codex thread、worktree exchange 或跨-workflow event bus。

A helper/unit/schema path may support development but cannot be the sole release evidence.

## 5. Forbidden scope

不解析专业 rubric；不选择 Gate；不调度 Slurm；不读 Codex private auth/SQLite/session/rollout；不创建第二 CURRENT/DONE。

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
| `BR-G1_DA1_PARSE` | 只解析 Bridge-owned da/1 identity subset | 未知 major/必需字段缺失 fail closed |
| `BR-G2_IDENTITY` | task/repo/worktree/session/candidate/target/result 全绑定 | wrong cwd/session/candidate/target直接拒绝 |
| `BR-G3_FRESHNESS` | definition/adapter/candidate/invalidation变化使旧result失效 | stale PASS不能结束任务 |
| `BR-G4_STOP_RECOVERY` | 生产候选从正常Stop入口拦截不满足claim并一次有界恢复 | Interrupt、duplicate event、wrong event id 不继续 |
| `BR-G5_SHOULD_NOT_CHANGE` | Lite/Review/Control/Persistent现有状态/预算/恢复不变 | DA不得成为第四workflow |
| `BR-G6_011_COMPAT` | 仅依赖0.11 reset保留面 | 被reset删除的reader/event拓扑不得复活 |

All release-critical Gates bind the same final candidate for this package.

## 8. Final candidate identity

同一 Bridge final candidate commit + exact installed ai-bridge/Host identity + da/1 digest；production Hook evidence必须来自该候选。

Old candidate evidence may be used for regression only when da/1 invalidation rules permit it; it cannot be silently promoted into this package's final PASS.

## 9. Recovery

IDENTITY_MISMATCH/STALE 只回原 task；一次有界 continuation遵守 Phase1已证 budget/Interrupt/single-writer；宿主接口缺失时 truthful UNSUPPORTED_WITH_EVIDENCE。

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

# Delivery Assurance implementation package 05 — Asteria First Vertical Consumer

Status: **DRAFT_FOR_EXECUTION_READY_CRITIC_REVIEW / NOT CODEX AUTHORIZED**  
Date: 2026-10-20  
Task key: `asteria--delivery-assurance-first-vertical`  
Target: `YuukiAS/Asteria`  
Source ref observed by Planner: `193c033659a7612a99442763077217b130e9b756`  
Planned execution branch/worktree rule: `main (active /home/yuukias/code/Asteria worktree; no alternate clone)`

## 1. Frozen dependency

Public interface: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PUBLIC_DA1_INTERFACE_FREEZE_V1_20261020.md@e278a3bab0949eac8a6f7df4007066da6eae7bd6`  
Content digest: `sha256:8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b`

Dependency: workflow-core + Bridge minimal lanes + required web/scivis descriptors; PIE 0.3 only if preflight says AGENTS mutation required

Changing a required da/1 field, owner, decision semantics, monotonicity, authority freshness, AGENTS semantics or claim semantics invalidates this package and returns to Planner/Critic.

## 2. Proposal

用Asteria现有fixed public entry打通第一条 source→deployment→professional QA→claim 真纵向链，证明公共 da/1 在低成本真实 consumer 上工作。

This package is intentionally independent. It owns only the target above and cannot sign completion for another Delivery Assurance lane.

## 3. Allowed implementation scope

Expected task-owned files/surfaces:

- `automation/delivery_assurance/ADAPTER.toml (new)`
- `automation/delivery_assurance/gates.toml (new project-only definitions if required)`
- `results/<task_key>/delivery_assurance/`
- `targeted DA integration/negative tests under existing scripts/tests`
- `AGENTS.md only if PIE 0.3 preflight sets AGENTS_MAINTENANCE_REQUIRED=true`

The Executor may add the smallest directly required test/fixture/result file under the target repository's existing conventions, but may not create another registry, database, daemon, watcher, scheduler, workflow or task state machine.

## 4. Normal entry

Asteria normal task + npm regression/browser + fixed public URL + VISUAL_REVIEW_PACK + single GPT Work black-box flow。

A helper/unit/schema path may support development but cannot be the sole release evidence.

## 5. Forbidden scope

不创建quick tunnel/alternate URL；不让geometry unit PASS代签whole-product；不允许implementation+validator同轮放宽自签。

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
| `AST-G1_PRECHECK` | fixed public environment与当前source/deployment identity可验证 | 不可用才允许SeminarArc fallback |
| `AST-G2_ADAPTER` | 删除graph/UI/deploy target或Gate mapping必须拒绝USER_READY | 正常入口mutation |
| `AST-G3_MECHANICAL` | 现有architecture/browser/regression准确测量，不把missing当0 | known-bad必须FAIL |
| `AST-G4_VISUAL_SCIENCE` | exact deployed candidate的visual/scientific surface通过domain/project QA | 机械PASS不足 |
| `AST-G5_IDENTITY` | source/build/fixed deployment/pack/report一致 | 旧RC evidence不能拼新candidate |
| `AST-G6_USER_BOUNDARY` | GPT Work通过后才到最终用户接受 | 用户不是第一轮QA |

All release-critical Gates bind the same final candidate for this package.

## 8. Final candidate identity

one exact source commit + Vite build + fixed public deployment identity + da adapter digest + visual pack + independent report。

Old candidate evidence may be used for regression only when da/1 invalidation rules permit it; it cannot be silently promoted into this package's final PASS.

## 9. Recovery

product/validator defect回同一Asteria task；fixed public environment unavailable at approved preflight triggers only pre-frozen SeminarArc Emulator fallback, not another consumer。

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

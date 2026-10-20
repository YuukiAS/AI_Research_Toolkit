# Delivery Assurance implementation package 08 — Bobbio Status Authority Recovery

Status: **DRAFT_FOR_EXECUTION_READY_CRITIC_REVIEW / NOT CODEX AUTHORIZED**  
Date: 2026-10-20  
Task key: `bobbio--status-authority-recovery`  
Target: `YuukiAS/Bobbio`  
Source ref observed by Planner: `develop@a64edfd6c5b11f81599bfcfc327be5964633a7b5 + main@e7d929bad2d4b23939c81920e77390efbce42b96`  
Planned execution branch/worktree rule: `develop`

## 1. Frozen dependency

Public interface: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PUBLIC_DA1_INTERFACE_FREEZE_V1_20261020.md@e278a3bab0949eac8a6f7df4007066da6eae7bd6`  
Content digest: `sha256:8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b`

Dependency: frozen Bobbio recovery contract; does not require consumer adapter implementation

Changing a required da/1 field, owner, decision semantics, monotonicity, authority freshness, AGENTS semantics or claim semantics invalidates this package and returns to Planner/Critic.

## 2. Proposal

恢复branch/release-aware milestone authority，消除0.2.0 accepted与stale current-status文档冲突，为Bobbio adapter提供唯一current authority set。

This package is intentionally independent. It owns only the target above and cannot sign completion for another Delivery Assurance lane.

## 3. Allowed implementation scope

Expected task-owned files/surfaces:

- `BOBBIO_MILESTONE_AUTHORITY.md (new canonical authority artifact in project-appropriate docs path)`
- `CURRENT_MILESTONE.md / ROADMAP only where stale semantics require repair/supersession`
- `deterministic authority-resolution regression`
- `no DA adapter yet`

The Executor may add the smallest directly required test/fixture/result file under the target repository's existing conventions, but may not create another registry, database, daemon, watcher, scheduler, workflow or task state machine.

## 4. Normal entry

Bobbio AGENTS + README/ROADMAP + VERSIONING + DEVELOPMENT_WORKFLOW + active milestone plan + exact branch/version/acceptance records。

A helper/unit/schema path may support development but cannot be the sole release evidence.

## 5. Forbidden scope

不回退0.3到0.2以复用PASS；不以mtime猜authority；不把package version当user acceptance。

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
| `BOB-R1_PRE` | 故意冲突输入必须STATUS_AUTHORITY_CONFLICT/UNKNOWN | 修复前不能USER_READY |
| `BOB-R2_DEVELOP` | develop解析0.3.0 current milestone | 不能选0.2 final gate |
| `BOB-R3_OLD_EVIDENCE` | 0.2 accepted只能回归/should-not-change | 不能满足0.3新能力 |
| `BOB-R4_BRANCH` | branch/release变化使current authority result失效 | main/develop不可混 |
| `BOB-R5_LOCATOR` | 机械移动可修，语义冲突返回owner | Resolver不猜 |

All release-critical Gates bind the same final candidate for this package.

## 8. Final candidate identity

one develop candidate commit containing authority freeze + stale-doc repair + pre/post regression evidence。

Old candidate evidence may be used for regression only when da/1 invalidation rules permit it; it cannot be silently promoted into this package's final PASS.

## 9. Recovery

semantic conflict回Bobbio project owner；locator-only movement同任务修；不问用户整理文件清单。

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

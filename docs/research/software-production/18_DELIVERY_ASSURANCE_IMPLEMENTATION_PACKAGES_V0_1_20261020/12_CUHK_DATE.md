# Delivery Assurance implementation package 12 — CUHK_Date Consumer

Status: **DRAFT_FOR_EXECUTION_READY_CRITIC_REVIEW / NOT CODEX AUTHORIZED**  
Date: 2026-10-20  
Task key: `cuhk-date--delivery-assurance-consumer`  
Target: `YuukiAS/CUHK_Date`  
Source ref observed by Planner: `9f25c7754d3c80d0be74f5b71016320f55753ae6`  
Planned execution branch/worktree rule: `main`

## 1. Frozen dependency

Public interface: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PUBLIC_DA1_INTERFACE_FREEZE_V1_20261020.md@e278a3bab0949eac8a6f7df4007066da6eae7bd6`  
Content digest: `sha256:8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b`

Dependency: common core + web-development descriptor; PIE 0.3 if AGENTS mutation required

Changing a required da/1 field, owner, decision semantics, monotonicity, authority freshness, AGENTS semantics or claim semantics invalidates this package and returns to Planner/Critic.

## 2. Proposal

绑定source→staging Web/API→DB/ProductState→producer rehearsal→fresh final batch→audit tickets→persona reports→launch-quality dimensions，保留real Matching授权边界。

This package is intentionally independent. It owns only the target above and cannot sign completion for another Delivery Assurance lane.

## 3. Allowed implementation scope

Expected task-owned files/surfaces:

- `automation/delivery_assurance/ADAPTER.toml`
- `automation/delivery_assurance/gates.toml`
- `targeted DA campaign identity/mutation tests`
- `AGENTS.md only via PIE 0.3 if triggered`

The Executor may add the smallest directly required test/fixture/result file under the target repository's existing conventions, but may not create another registry, database, daemon, watcher, scheduler, workflow or task state machine.

## 4. Normal entry

verify:registration-critical-path-hosted + CAMPAIGN_ORCHESTRATION + producer full rehearsal + fresh final batch + one canonical PARENT_WORK + serial persona campaign + LAUNCH_QUALITY_ACCEPTANCE。

A helper/unit/schema path may support development but cannot be the sole release evidence.

## 5. Forbidden scope

rehearsal/final身份复用；ticket early consume；旧campaign证新candidate；aggregate bool扩散各dimension；自动真实Matching。

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
| `CD-G1_IDENTITY` | source/Web/API/campaign/run一致 | mismatch阻止Parent delivery |
| `CD-G2_REGISTRATION` | visible hosted critical path | HTTP200/schema不足 |
| `CD-G3_BATCH_SEPARATION` | rehearsal与final batch cryptographic/state separation | 重用身份FAIL |
| `CD-G4_TICKET` | commit-on-success + recovery | 失败session不烧票 |
| `CD-G5_PERSONAS` | serial persona + per-dimension evidence | aggregate PASS不fan-out |
| `CD-G6_AUTH` | staging completion不产生real Matching authority | USER_READY范围诚实 |

All release-critical Gates bind the same final candidate for this package.

## 8. Final candidate identity

exact pushed source commit + Web/API deployment identities + campaign/run ids + DB/prestate + untouched final batch + persona evidence。

Old candidate evidence may be used for regression only when da/1 invalidation rules permit it; it cannot be silently promoted into this package's final PASS.

## 9. Recovery

tool-only child failure沿已有recovery；product/harness缺陷回same task；real Matching/production发布仍需新用户授权。

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

# Delivery Assurance implementation package 13 — AI Skills Maintainer Formal Release / Update Impact / Managed Adaptation

Status: **DRAFT_FOR_EXECUTION_READY_CRITIC_REVIEW / NOT CODEX AUTHORIZED**  
Date: 2026-10-20  
Task key: `ai-skills-core--delivery-assurance-release-adaptation`  
Target: `YuukiAS/AI_Skills_Collection + Bridge release coordination`  
Source ref observed by Planner: `AI_Skills current release/main at execution time; exact candidate refs from all prerequisite lanes`  
Planned execution branch/worktree rule: `reviewed/ai-skills-core--delivery-assurance-release-adaptation`

## 1. Frozen dependency

Public interface: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PUBLIC_DA1_INTERFACE_FREEZE_V1_20261020.md@e278a3bab0949eac8a6f7df4007066da6eae7bd6`  
Content digest: `sha256:8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b`

Dependency: all required central lanes complete + Asteria/Lucerna/CARE/Bobbio/Mica/SeminarArc/CUHK_Date required consumer evidence + Bridge release candidate

Changing a required da/1 field, owner, decision semantics, monotonicity, authority freshness, AGENTS semantics or claim semantics invalidates this package and returns to Planner/Critic.

## 2. Proposal

完成正式版本/CHANGELOG/README/registry/catalog/provenance/Marketplace/profile或Bridge release所需收口，基于Update impact建立required consumer adaptation并逐仓fresh-session验证。

This package is intentionally independent. It owns only the target above and cannot sign completion for another Delivery Assurance lane.

## 3. Allowed implementation scope

Expected task-owned files/surfaces:

- `AI_Skills VERSION/plugin versions as policy requires`
- `CHANGELOG.md / plugin changelogs`
- `README.md`
- `registry/catalog/provenance/Marketplace/profile generated outputs`
- `tracking Issues #107/#108 and Project metadata when surface available`
- `Bridge formal release path via bridge-kit-maintainer; no copied release engine`

The Executor may add the smallest directly required test/fixture/result file under the target repository's existing conventions, but may not create another registry, database, daemon, watcher, scheduler, workflow or task state machine.

## 4. Normal entry

AI Skills Maintainer normal entry + bridge-kit-maintainer for Bridge + formal release/update-impact workflow。

A helper/unit/schema path may support development but cannot be the sole release evidence.

## 5. Forbidden scope

一个consumer PASS代签全部；人工版本配对表；Project DONE早于required consumers；README未Clear Writing实际调用却宣称closure。

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
| `REL-G1_CENTRAL` | workflow-core/domain/PIE central candidates各自通过自己的final Gate | 不拼不同commit的关键release evidence |
| `REL-G2_UPDATE_IMPACT` | 正式release→CHANGELOG→Update impact给出required consumers | 不靠任意diff/TODO猜范围 |
| `REL-G3_CONSUMERS` | 每个required consumer installed/loaded identity + fresh session + normal entry | central PASS不代签 |
| `REL-G4_BRIDGE` | Bridge formal release由bridge-kit-maintainer | AI Skills不复制Bridge release engine |
| `REL-G5_DOCS` | README/version/install/entry与真实配置一致；README先实际调用Clear Writing | 只读skill不算调用 |
| `REL-G6_LIFECYCLE` | #107进入ADAPTING直到all required consumers；#108按PIE自身closure | Project/Issue/source backlink truth一致 |

All release-critical Gates bind the same final candidate for this package.

## 8. Final candidate identity

one frozen AI_Skills release candidate + one frozen Bridge release candidate, each with own identity; all consumer evidence points to installed/loaded versions derived from those candidates。

Old candidate evidence may be used for regression only when da/1 invalidation rules permit it; it cannot be silently promoted into this package's final PASS.

## 9. Recovery

central complete but consumers pending→ADAPTING；one consumer FAIL只回该consumer/owning lane；release movement requires current user authorization if repo policy requires。

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

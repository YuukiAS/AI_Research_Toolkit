# Delivery Assurance implementation package 04 — Required Domain Descriptors

Status: **DRAFT_FOR_EXECUTION_READY_CRITIC_REVIEW / NOT CODEX AUTHORIZED**  
Date: 2026-10-20  
Task key: `domain-descriptors--delivery-assurance-da1`  
Target: `YuukiAS/AI_Skills_Collection`  
Source ref observed by Planner: `272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3`  
Planned execution branch/worktree rule: `reviewed/domain-descriptors--delivery-assurance-da1`

## 1. Frozen dependency

Public interface: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PUBLIC_DA1_INTERFACE_FREEZE_V1_20261020.md@e278a3bab0949eac8a6f7df4007066da6eae7bd6`  
Content digest: `sha256:8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b`

Dependency: frozen da/1; workflow-core parser fixture can be used before normal integration

Changing a required da/1 field, owner, decision semantics, monotonicity, authority freshness, AGENTS semantics or claim semantics invalidates this package and returns to Planner/Critic.

## 2. Proposal

为首批七仓需要的中央专业能力增加 da/1 descriptors，不创造新专业标准：web-development、scientific-visualization、statistical-modeling、medical-imaging。项目专属 SCI/产品规则继续留 consumer。

This package is intentionally independent. It owns only the target above and cannot sign completion for another Delivery Assurance lane.

## 3. Allowed implementation scope

Expected task-owned files/surfaces:

- `plugins/codex/plugins/web-development/delivery-assurance/gates.toml (new)`
- `plugins/codex/plugins/scientific-visualization/delivery-assurance/gates.toml (new)`
- `plugins/codex/plugins/statistical-modeling/delivery-assurance/gates.toml (new)`
- `plugins/codex/plugins/medical-imaging/delivery-assurance/gates.toml (new)`
- `tests/test_delivery_assurance_domain_descriptors.py (new)`
- `generator/catalog/provenance outputs if package support files require them`
- `README/CHANGELOG for affected plugin capability exposure`

The Executor may add the smallest directly required test/fixture/result file under the target repository's existing conventions, but may not create another registry, database, daemon, watcher, scheduler, workflow or task state machine.

## 4. Normal entry

各正式 domain plugin 的正常 installed/enabled package root；workflow-core 读取 support file，专业判断仍调用现有 domain skill/QA normal entry。

A helper/unit/schema path may support development but cannot be the sole release evidence.

## 5. Forbidden scope

不把CARE/Asteria项目路径写进中央 descriptor；不复制项目阈值；不把存在descriptor当专业PASS。

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
| `DD-G1_WEB` | Frontend actual-surface/product-coherence/interaction-state-copy能力能表达Lucerna/Asteria/Bobbio/Mica/CUHK_Date/SeminarArc UI义务 | 真实UI owner/source locator固定 |
| `DD-G2_SCIVIS` | scientific graph truth/readability/rendered observation | Asteria几何机械PASS不能代签整体科学可读性 |
| `DD-G3_STATS` | estimand/assumption/diagnostic/sensitivity/conclusion-strength | CARE科学结论不能由job receipt代签 |
| `DD-G4_MEDIMG` | imaging model/data/evaluation identity与适用性 | CARE项目特有threshold仍留project owner |
| `DD-G5_DISCOVERY` | installed/enabled plugin root可被workflow-core发现 | 未安装/禁用不得假装可用 |
| `DD-G6_NO_OVERGENERALIZATION` | descriptor无七仓硬编码 | 同一descriptor至少两个适用consumer或明确domain-level rationale |

All release-critical Gates bind the same final candidate for this package.

## 8. Final candidate identity

每个 domain plugin 独立 final candidate/版本；此包只在同一 AI_Skills candidate 中生成兼容 descriptors，release时各plugin独立验收。

Old candidate evidence may be used for regression only when da/1 invalidation rules permit it; it cannot be silently promoted into this package's final PASS.

## 9. Recovery

发现现有专业合同不足以定义某 descriptor时返回对应 domain Planner，不在本包发明 rubric；项目特有标准落 project gates.toml。

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

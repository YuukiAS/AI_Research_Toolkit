# Delivery Assurance implementation package 10 — Mica Consumer

Status: **DRAFT_FOR_EXECUTION_READY_CRITIC_REVIEW / NOT CODEX AUTHORIZED**  
Date: 2026-10-20  
Task key: `mica--delivery-assurance-consumer`  
Target: `YuukiAS/Mica-for-ChatGPT`  
Source ref observed by Planner: `7059c0dc24b908b57bd0e1f475142ba4f4520621`  
Planned execution branch/worktree rule: `main`

## 1. Frozen dependency

Public interface: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PUBLIC_DA1_INTERFACE_FREEZE_V1_20261020.md@e278a3bab0949eac8a6f7df4007066da6eae7bd6`  
Content digest: `sha256:8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b`

Dependency: common core + web-development descriptor; PIE 0.3 if AGENTS mutation required

Changing a required da/1 field, owner, decision semantics, monotonicity, authority freshness, AGENTS semantics or claim semantics invalidates this package and returns to Planner/Critic.

## 2. Proposal

绑定source/version→dist/mica-dev→actual loaded extension→real ChatGPT host→low-power device evidence，区分fixture/E2E/real-site/device claim。

This package is intentionally independent. It owns only the target above and cannot sign completion for another Delivery Assurance lane.

## 3. Allowed implementation scope

Expected task-owned files/surfaces:

- `automation/delivery_assurance/ADAPTER.toml`
- `automation/delivery_assurance/gates.toml`
- `targeted DA integration/mutation tests`
- `AGENTS.md only via PIE 0.3 if triggered`

The Executor may add the smallest directly required test/fixture/result file under the target repository's existing conventions, but may not create another registry, database, daemon, watcher, scheduler, workflow or task state machine.

## 4. Normal entry

impact audit→focused checks→npm test→risk-triggered E2E/stress→dist/mica-dev→guided real-site Copy report→final manual authenticated/device observation。

A helper/unit/schema path may support development but cannot be the sole release evidence.

## 5. Forbidden scope

synthetic 90-turn/heap指标代签真实性能；安全fail-open同时获得benefit PASS；自动化正常Edge/authenticated ChatGPT回归。

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
| `MICA-G1_VERSION` | source/release config/dist/loaded version一致 | same version changing runtime FAIL |
| `MICA-G2_HOTPATH` | typing hot-path不因reliability/diagnostics退化 | connector-latched/IME覆盖 |
| `MICA-G3_FIDELITY` | fixture/E2E/real-site/device claim分层 | 低fidelity不升级 |
| `MICA-G4_ANTI_FORGERY` | validator/evidence contract修改有frozen known-bad | 协调改写不能全绿 |
| `MICA-G5_REAL_SITE` | guided privacy-safe report证明当前host行为 | 用户不查DOM |
| `MICA-G6_DEVICE` | 低功耗设备才支持真实性能claim | 未做则higher claim UNKNOWN |

All release-critical Gates bind the same final candidate for this package.

## 8. Final candidate identity

exact source commit + release-config version + dist digest/manifest + actual loaded extension identity + report/device evidence。

Old candidate evidence may be used for regression only when da/1 invalidation rules permit it; it cannot be silently promoted into this package's final PASS.

## 9. Recovery

synthetic/isolated test failure同task；real-site manual step只在all ordinary QA完成后请求一次；用户不做DevTools debugging。

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

# Delivery Assurance Package 01 v0.2 — workflow-core Resolver / Delivery Admission

Status: **READY_FOR_EXECUTION_READY_REVIEW / NOT CODEX AUTHORIZED**  
Date: 2026-10-20  
Task key: `workflow-core--delivery-assurance-resolver`  
Target repository: `YuukiAS/AI_Skills_Collection`  
Source ref inspected by Planner: `main@272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3`  
Planned task branch: `reviewed/workflow-core--delivery-assurance-resolver`

## 1. Frozen dependency

Public interface:

- path: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PUBLIC_DA1_INTERFACE_FREEZE_V1_20261020.md`
- freeze commit: `e278a3bab0949eac8a6f7df4007066da6eae7bd6`
- SHA-256: `8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b`

This package may implement the frozen interface but may not change a required field, owner, decision semantic, adapter monotonicity, authority/AGENTS freshness, evidence meaning, claim partial order or failure route.

## 2. Critic findings and disposition

| Finding | Disposition | Closure |
|---|---|---|
| `DA-ER-01-F01 — CANONICAL_SOURCE_AND_GENERATED_PARITY` | ACCEPT | This v0.2 freezes canonical `skills/` source paths, generator/config surfaces, generated destinations, idempotence/path-budget/parity Gates and forbids direct generated edits. |
| `DA-ER-01-F02 — MAINTENANCE_AND_RELEASE_CLOSURE_NOT_FROZEN` | ACCEPT | This v0.2 freezes plugin target version `0.6`, README/CHANGELOG/VERSION actions, candidate replay, formal-release boundary, installed fresh-session evidence, managed adaptation and Issue `#107` lifecycle. |

The existing WC-G1–WC-G7 product direction remains unchanged.

## 3. Product goal

Add Delivery Assurance discovery, three-valued impact classification, Required Gate resolution, missing-capability routing, result materialization and target-specific claim aggregation to the normal `workflow-core` production entry.

`workflow-core` answers:

- which frozen domain/project obligations apply;
- whether scope is `NONE`, `TARGETED`, `BROAD` or `FULL`;
- whether a missing item is a validator implementation gap, professional standard gap, environment gap or HUMAN_ONLY dependency;
- which lower and higher claims are supported.

It does not judge UI, scientific, statistical, imaging, manuscript or presentation quality; it does not own Bridge runtime identity; it does not create a new workflow or task state.

## 4. Canonical source — generated output contract

### 4.1 Canonical source authority

All production semantics are edited first under:

```text
skills/core/codex-system/codex-workflow-protocol/
```

Required source changes:

```text
skills/core/codex-system/codex-workflow-protocol/SKILL.md
skills/core/codex-system/codex-workflow-protocol/agents/openai.yaml
skills/core/codex-system/codex-workflow-protocol/evals/trigger_queries.json
skills/core/codex-system/codex-workflow-protocol/references/delivery-assurance-da1.md          # new
skills/core/codex-system/codex-workflow-protocol/scripts/da_resolver.py                       # new
skills/core/codex-system/codex-workflow-protocol/assets/da1/gate-descriptor.schema.json        # new
skills/core/codex-system/codex-workflow-protocol/assets/da1/adapter.schema.json                # new
skills/core/codex-system/codex-workflow-protocol/assets/da1/target-graph.schema.json           # new
skills/core/codex-system/codex-workflow-protocol/assets/da1/gate-result.schema.json            # new
```

The Executor may add the minimum adjacent canonical reference or fixture needed by an approved Gate, but may not place production semantics first in `plugins/codex/plugins/workflow-core/`.

### 4.2 Marketplace source binding

Current canonical config already binds:

```json
{
  "name": "workflow-core",
  "version": "0.5",
  "skills": [
    {
      "type": "copy",
      "source": "skills/core/codex-system/codex-workflow-protocol",
      "artifact_id": "workflow"
    }
  ]
}
```

in `scripts/codex_marketplace_config.json`.

The current generator's `generate_copy_skill()` calls `copy_source_tree()` recursively, so the new `references/`, `scripts/` and `assets/da1/` files are copied without inventing a parallel generator. The implementation is expected to require **no semantic generator-code change**.

If a real implementation probe proves that the existing recursive copy cannot carry one of these canonical support files, the only permitted generator amendment surface is:

```text
scripts/codex_marketplace_config.json
scripts/build_codex_marketplace.py::{copy_source_tree, generate_copy_skill, validate_plugin_json}
```

Such an amendment must preserve all current plugins, active-skill limits and path-budget behavior; it cannot introduce a new publication mechanism.

### 4.3 Generated destinations

Regeneration must produce exact counterparts under:

```text
plugins/codex/plugins/workflow-core/skills/workflow/SKILL.md
plugins/codex/plugins/workflow-core/skills/workflow/agents/openai.yaml
plugins/codex/plugins/workflow-core/skills/workflow/evals/trigger_queries.json
plugins/codex/plugins/workflow-core/skills/workflow/references/delivery-assurance-da1.md
plugins/codex/plugins/workflow-core/skills/workflow/scripts/da_resolver.py
plugins/codex/plugins/workflow-core/skills/workflow/assets/da1/*.schema.json
plugins/codex/plugins/workflow-core/.codex-plugin/plugin.json
.agents/plugins/marketplace.json
```

Direct edits to generated payloads are forbidden. Generated files change only through canonical source/config + `scripts/build_codex_marketplace.py`.

## 5. Exact version, README and changelog contract

### 5.1 Plugin version

Current workflow-core version:

```text
0.5
```

Target version for the completed package:

```text
0.6
```

Reason: Delivery Assurance Resolver/delivery admission is a new user-observable workflow capability, not tests-only or docs-only maintenance.

The implementation task updates exactly once:

```text
scripts/codex_marketplace_config.json: workflow-core 0.5 -> 0.6
plugins/codex/plugins/workflow-core/.codex-plugin/plugin.json: generated 0.6
README.md workflow-core row: 0.6 and current capability wording
docs/plugin-changelogs/workflow-core.md: new 0.6 Before/After entry
CHANGELOG.md -> Unreleased: workflow-core 0.5 -> 0.6, repository release still pending
```

### 5.2 Repository version boundary

`VERSION` is currently `5.5.1` and is **not changed by Package 01**.

Package 01 records:

```text
Repository bump decision: NONE
Reason: central workflow-core implementation is not the final cross-component formal repository release.
Affected plugins:
- workflow-core: 0.5 -> 0.6
```

Package 13 later owns the repository release version, root release entry and `release` ref after all frozen release prerequisites exist. Package 01 must not move `release` or choose the final repository bump.

### 5.3 README

README-facing behavior changes, so the required closure is:

```text
README update required
```

Before editing the reader-facing README, the Executor/AI Skills Maintainer must **actually invoke** the installed Clear Writing normal entry. Reading its source or Skill text is not invocation. If Clear Writing is unavailable, README mutation and package closure remain blocked; do not claim `README checked`.

## 6. AI Skills Maintainer companion and commands

This central production refinement must use:

```text
workflow-core
+ ai-skills-core / AI Skills Maintainer
+ target workflow-core production candidate
```

The domain/process owner remains workflow-core; AI Skills Maintainer owns source-first modification, generated parity, candidate replay, regression, versions, changelogs and release readiness.

Required generation/validation sequence:

```bash
python scripts/skills.py registry --write
python scripts/skills.py validate
python scripts/skills.py audit --all
python scripts/skills.py catalog --write
python scripts/build_codex_marketplace.py --write --validate --check --path-report
python -m unittest tests.test_workflow_core_delivery_assurance
python -m unittest discover -s tests
```

The final candidate must then prove installed normal-entry consumption using the existing candidate replay path, for example:

```bash
python scripts/candidate_plugin_replay.py ensure-runtime
python scripts/candidate_plugin_replay.py replay \
  --plugin workflow-core \
  --candidate-commit <FINAL_CANDIDATE_SHA> \
  --task <FROZEN_REPLAY_TASK> \
  --input <FROZEN_REPLAY_INPUT>
```

The replay must report the installed candidate path and actual consumption of the installed workflow skill from a fresh ephemeral Codex session. Source-file reads, schema unit tests and generated parity do not substitute for this Gate.

## 7. Implementation surfaces

Canonical implementation/test surfaces:

```text
skills/core/codex-system/codex-workflow-protocol/**
scripts/codex_marketplace_config.json
scripts/build_codex_marketplace.py                       # only if the bounded copy/validation gap is proven
tests/test_workflow_core_delivery_assurance.py           # new
tests/test_codex_marketplace.py                          # extend as required
tests/test_workflow_core_reviewed_handoff_routing.py     # should-not-change
docs/plugin-changelogs/workflow-core.md
README.md
CHANGELOG.md
registry.json                                            # generated
docs/SKILL_CATALOG.md                                    # generated
provenance/generated outputs under existing conventions  # generated as required
plugins/codex/plugins/workflow-core/**                    # generated only
.agents/plugins/marketplace.json                         # generated only
```

No new registry, service, daemon, watcher, workflow, task state or global case-ID lookup is allowed.

## 8. Normal production entry

The production Gate is the installed `workflow-core@yuukias-ai-skills` normal invocation in a fresh Codex session, not direct execution of `da_resolver.py`.

The task prompt and frozen inputs must exercise at least:

1. isolated small backend change -> `TARGETED` or legal no-heavy-Gate path;
2. shared schema/adapter change -> `BROAD`;
3. whole-product claim -> `FULL` obligation coverage with valid evidence reuse;
4. unknown acceptance-relevant impact -> `UNKNOWN_IMPACT`, never `NONE`;
5. missing frozen validator -> implementation-missing route;
6. missing professional standard -> professional owner route, not Resolver invention;
7. target-specific lower claim retained when higher evidence is missing.

## 9. Capability Gate Matrix

| Gate | Proves | Required final-candidate evidence | Explicit failure |
|---|---|---|---|
| `WC-G1_CANONICAL_CONSUMPTION` | Resolver semantics originate from canonical `skills/` source | source digest + generated digest + installed replay binds same final candidate | direct generated edit or source file not consumed |
| `WC-G2_GENERATOR_IDEMPOTENCE` | regeneration is deterministic | two consecutive generator runs leave clean diff after first generation | second run changes payload |
| `WC-G3_GENERATED_PARITY` | generated workflow plugin exactly represents canonical source/config | `--check --validate`, plugin manifest version, recursive support-file equality | missing/stale/extra semantic payload |
| `WC-G4_WINDOWS_PATH_BUDGET` | new support files do not exceed generated Windows budget | `--path-report` with zero over-budget paths | any new over-budget path |
| `WC-G5_DISCOVERY_IMPACT` | normal entry discovers installed capabilities and classifies three-valued impact | replay cases for TRUE/FALSE/UNKNOWN | unknown becomes false/NONE |
| `WC-G6_RESOLUTION_SCOPE` | minimum sufficient `NONE/TARGETED/BROAD/FULL` | small/shared/whole-product replay | Gate count/complexity drives FULL or sibling target is missed |
| `WC-G7_MISSING_ROUTING` | missing validator/standard/environment/HUMAN_ONLY go to correct owner | six missing-capability replay classes | workflow-core invents professional standard |
| `WC-G8_CLAIM_AGGREGATION` | target-specific partial-order claims are truthful | lower-pass/higher-unknown and multi-target cases | global green flag or higher gap erases lower proof |
| `WC-G9_FRESH_INSTALLED_NORMAL_ENTRY` | production installed plugin consumes Resolver | candidate-plugin replay actual consumption in fresh session | helper/schema/unit-only success |
| `WC-G10_W1_W5_REGRESSION` | existing W1–W5, Human Gate and least-privilege behavior remain | existing workflow-core regression plus unrelated normal task | DA creates heavy loop or weakens old completion discipline |
| `WC-G11_RELEASE_METADATA` | source/generated/version/changelog/README are one candidate | 0.6 config/manifest/changelog/README/root Unreleased consistency | mixed candidate or deferred plugin bump |

All release-critical Package 01 Gates must pass on one exact AI_Skills final candidate commit.

## 10. Tracking Issue #107 lifecycle

Canonical source backlink is already present:

```text
docs/plugin-todos/workflow-core.md -> tracking: #107
```

Lifecycle truth:

- **DOING**: package design, execution-ready review, implementation, independent implementation review, main integration and pre-release closure. Each handoff updates current anchor and next action.
- execution-ready `PASS` alone does not change lifecycle.
- Package 01 implementation cannot set DONE.
- after Package 13 creates the formal installable release and central installed/fresh-session normal-entry proof, while required consumer adaptations remain, `#107` moves to **ADAPTING** and freezes exact required consumer identities/locators.
- **DONE** only after all frozen required consumers PASS/N/A, durable evidence is complete, Resolution commit is set and the Issue is truthfully closed.

Current reader-facing Issue body remains stale because this Planner runtime cannot actually invoke Clear Writing. The exact pending mutation for the next Clear-Writing-capable Maintainer is:

```text
Issue #107 current anchor =
  Package 01 v0.2 path + its execution-ready review
next action =
  implement Package 01 only after PASS and user kickoff; then independent implementation review
Project Area = workflow-core
Project Status = DOING
Resolution commit = blank
```

Do not ask the user to maintain this manually.

## 11. Recovery and forbidden scope

Same-scope source/generator/Resolver/test defects stay in this task.

Return to Planner/Critic if implementation would require changing frozen `da/1`, owner boundaries, claim semantics or adding a control plane.

Forbidden:

- direct edit of `plugins/codex/plugins/workflow-core/**`;
- professional scoring in workflow-core;
- Bridge runtime code;
- consumer adapters;
- release ref movement;
- repository version bump;
- central registry/database/daemon/watcher;
- historical case IDs in runtime routing;
- calling package completion on unit/schema parity alone.

## 12. Current state

```text
DA-ER-01-F01=CLOSED_BY_PACKAGE_V0_2
DA-ER-01-F02=CLOSED_BY_PACKAGE_V0_2
PACKAGE_STATUS=READY_FOR_EXECUTION_READY_REVIEW
EXECUTION_READY_DECISION=NOT_RUN
READY_FOR_CODEX=NO
IMPLEMENTATION_STARTED=NO
USER_ACTION_REQUIRED_NOW=NO
```

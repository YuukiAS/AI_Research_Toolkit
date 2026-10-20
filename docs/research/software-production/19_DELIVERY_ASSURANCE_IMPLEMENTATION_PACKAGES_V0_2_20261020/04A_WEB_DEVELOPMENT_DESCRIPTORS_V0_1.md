# Delivery Assurance Package 04A — web-development descriptors

Status: **READY_FOR_EXECUTION_READY_REVIEW / NOT CODEX AUTHORIZED**  
Date: 2026-10-20  
Task key: `web-development--delivery-assurance-descriptors`  
Target: `YuukiAS/AI_Skills_Collection`  
Source ref: `main@272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3`  
Planned branch: `reviewed/web-development--delivery-assurance-descriptors`

## 1. Frozen authority

- da/1: `e278a3bab0949eac8a6f7df4007066da6eae7bd6`
- SHA-256: `8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b`
- authority matrix: `04_DOMAIN_DESCRIPTOR_AUTHORITY_MATRIX_V0_2.md`
- canonical source: `skills/tools/frontend/frontend-visual-systems/SKILL.md@272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3`
- source blob: `1f23cc1f4add4e406a43e6f93ca760ff2a41732e`

This package projects the existing F-A/F-B/F-C/F-D contract. It does not invent project UI standards.

## 2. Exact implementation scope

Canonical source:

```text
skills/tools/frontend/frontend-visual-systems/delivery-assurance/gates.toml
skills/tools/frontend/frontend-visual-systems/evals/
```

Maintenance/release source:

```text
scripts/codex_marketplace_config.json
  web-development version 0.4 -> 0.5
  shared += {source: skills/tools/frontend/frontend-visual-systems/delivery-assurance,
             target: delivery-assurance}
docs/plugin-changelogs/web-development.md
README.md
CHANGELOG.md -> Unreleased
tests/test_delivery_assurance_web_descriptors.py
tests/test_codex_marketplace.py
```

Generated only:

```text
plugins/codex/plugins/web-development/delivery-assurance/gates.toml
plugins/codex/plugins/web-development/.codex-plugin/plugin.json
.agents/plugins/marketplace.json
registry/catalog/provenance outputs required by current generators
```

Direct generated edits are forbidden.

## 3. Descriptor set

```text
domain:web-development/design-authority-state-coverage
domain:web-development/design-system-coherence
domain:web-development/actual-surface-convergence
domain:web-development/producer-admission-reachability
```

Full semantics are frozen in the authority matrix. A consumer binds project-specific target, platform, state names, design locator, thresholds and independent-review requirement through its adapter/project Gate.

## 4. Normal entry

```text
web-development@yuukias-ai-skills
→ frontend-visual-systems coordinator
→ selected delegates only when the coordinator routes them
```

Descriptor discovery alone is not professional PASS. Final evidence must show installed coordinator consumption in a fresh candidate replay and actual-target inspection at required fidelity.

## 5. Version/release boundary

```text
web-development: 0.4 -> 0.5
repository VERSION: unchanged in 04A
formal release ref: unchanged in 04A
```

04A updates plugin version/changelog/README/root Unreleased and generated payload on its own final candidate. Package 13 later selects the repository release version, advances formal release and performs managed adaptation.

README update is required and must use an actual Clear Writing invocation before editing.

## 6. Capability Gate Matrix

| Gate | Proves | Failure boundary |
|---|---|---|
| `WEB-DA-G1_AUTHORITY` | descriptors exactly project F-A–F-D and one professional owner | invented standard or project-specific threshold |
| `WEB-DA-G2_SOURCE_GENERATED` | canonical source -> shared copy -> generated parity | direct generated edit or missing payload |
| `WEB-DA-G3_DISCOVERY` | installed/enabled plugin exposes descriptors | source/config presence without installed discovery |
| `WEB-DA-G4_NORMAL_ENTRY` | fresh installed coordinator is consumed | TOML/schema/unit-only success |
| `WEB-DA-G5_ACTUAL_SURFACE` | actual-surface Gate cannot PASS from screenshot/snippet alone | low-fidelity substitution |
| `WEB-DA-G6_OWNER_SPLIT` | Frontend judges UI; project judges project semantics | generic central scorer |
| `WEB-DA-G7_CALIBRATION` | positive, bad surface and missing-observation cases decide correctly | empty known-bad/regression bank |
| `WEB-DA-G8_PARITY_PATH` | generator idempotence, equality and Windows path budget | second-run diff or over-budget path |
| `WEB-DA-G9_RELEASE_METADATA` | version/changelog/README/root Unreleased/manifest agree | mixed versions/candidates |
| `WEB-DA-G10_REGRESSION` | existing routing and unrelated tasks remain unchanged | descriptor breaks coordinator/backend exclusion |

All Gate evidence binds one exact 04A final candidate.

## 7. Recovery and forbidden scope

Standard insufficiency returns to Frontend Design Planner/Critic; Executor cannot expand the rubric. Generator defects stay in 04A only if bounded to current shared-copy/parity surfaces.

Forbidden: consumer paths or thresholds in central TOML; UI PASS from descriptor existence; consumer adapter implementation; release movement; professional scoring in workflow-core/Bridge; new registry/database/watcher.

## 8. Current state

```text
PACKAGE_STATUS=READY_FOR_EXECUTION_READY_REVIEW
TARGET_PLUGIN_VERSION=0.5
EXECUTION_READY_DECISION=NOT_RUN
READY_FOR_CODEX=NO
IMPLEMENTATION_STARTED=NO
```

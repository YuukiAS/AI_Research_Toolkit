# Delivery Assurance Package 04B — scientific-visualization descriptors

Status: **READY_FOR_EXECUTION_READY_REVIEW / NOT CODEX AUTHORIZED**  
Date: 2026-10-20  
Task key: `scientific-visualization--delivery-assurance-descriptors`  
Target: `YuukiAS/AI_Skills_Collection`  
Source ref: `main@272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3`  
Planned branch: `reviewed/scientific-visualization--delivery-assurance-descriptors`

## 1. Frozen authority

- da/1: `e278a3bab0949eac8a6f7df4007066da6eae7bd6`
- SHA-256: `8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b`
- authority matrix: `04_DOMAIN_DESCRIPTOR_AUTHORITY_MATRIX_V0_2.md`
- canonical source: `skills/science/communication/scientific-figure-qa/SKILL.md@272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3`
- source blob: `540b657c1e06086b36ebf1e04588f111091ab857`

This package projects only the current publication-figure QA standard. It does not absorb interactive product UI, Asteria graph semantics or project-specific thresholds.

## 2. Exact implementation scope

Canonical source:

```text
skills/science/communication/scientific-figure-qa/delivery-assurance/gates.toml
skills/science/communication/scientific-figure-qa/evals/
```

Maintenance/release source:

```text
scripts/codex_marketplace_config.json
  scientific-visualization version 0.1 -> 0.2
  shared += {source: skills/science/communication/scientific-figure-qa/delivery-assurance,
             target: delivery-assurance}
docs/plugin-changelogs/scientific-visualization.md
README.md
CHANGELOG.md -> Unreleased
tests/test_delivery_assurance_scivis_descriptors.py
tests/test_codex_marketplace.py
```

Generated only:

```text
plugins/codex/plugins/scientific-visualization/delivery-assurance/gates.toml
plugins/codex/plugins/scientific-visualization/.codex-plugin/plugin.json
.agents/plugins/marketplace.json
registry/catalog/provenance outputs
```

## 3. Descriptor set

```text
domain:scientific-visualization/figure-accessibility-readability
domain:scientific-visualization/statistical-visual-integrity
domain:scientific-visualization/export-readiness
domain:scientific-visualization/palette-provenance
```

Full semantics are frozen in the authority matrix.

Explicit exclusions:

- interactive graph state and DOM geometry;
- application navigation and actual-surface interaction;
- scientific claim correctness outside visual encoding;
- consumer-specific venue thresholds not already frozen by the source/target contract.

## 4. Normal entry

```text
scientific-visualization@yuukias-ai-skills
→ scientific-figure-qa
```

A final professional decision requires the exact rendered/exported figure at its intended size and target constraints. Descriptor/TOML discovery, a plotting script, or file existence is not figure PASS.

## 5. Version/release boundary

```text
scientific-visualization: 0.1 -> 0.2
repository VERSION: unchanged in 04B
formal release ref: unchanged in 04B
```

04B owns plugin version/changelog/README/root Unreleased/generated parity. Package 13 owns repository release/version/ref and consumer adaptation. README update requires actual Clear Writing invocation.

## 6. Capability Gate Matrix

| Gate | Proves | Failure boundary |
|---|---|---|
| `SV-DA-G1_AUTHORITY` | all descriptors are supported by current Scientific Figure QA source | Asteria/product semantics leak centrally |
| `SV-DA-G2_SOURCE_GENERATED` | canonical source and generated descriptor are identical | direct generated edit/stale payload |
| `SV-DA-G3_DISCOVERY` | installed plugin exposes descriptor support file | source-only discovery |
| `SV-DA-G4_RENDERED_ENTRY` | installed normal entry judges exact rendered/exported artifact | script/file/schema-only success |
| `SV-DA-G5_ACCESSIBILITY` | known low-contrast/grayscale/font/layout defects fail | checklist word presence passes bad image |
| `SV-DA-G6_VISUAL_INTEGRITY` | missing/misleading uncertainty/colorbar/midpoint cases fail | geometry/plot existence substitutes for meaning |
| `SV-DA-G7_EXPORT` | vector/raster/dpi/background/format conditions bind exact output | source plot but wrong final export |
| `SV-DA-G8_PALETTE` | provenance/status remains truthful | experimental palette promoted without review |
| `SV-DA-G9_PARITY_PATH` | generator idempotence and Windows path budget hold | second-run diff or path overflow |
| `SV-DA-G10_RELEASE_METADATA` | version/changelog/README/manifest are same candidate | mixed identities or deferred bump |
| `SV-DA-G11_REGRESSION` | existing plotting/palette/schematic/poster routing remains intact | descriptor hijacks unrelated source skills |

## 7. Recovery and forbidden scope

If current source cannot support a descriptor's professional semantics, return to Scientific Visualization Planner/Critic; do not let Executor extend the standard.

Forbidden: Asteria/project paths; DOM geometry or whole-product UI scoring; consumer adapter; repository release movement; descriptor existence as PASS; registry/database/watcher.

## 8. Current state

```text
PACKAGE_STATUS=READY_FOR_EXECUTION_READY_REVIEW
TARGET_PLUGIN_VERSION=0.2
EXECUTION_READY_DECISION=NOT_RUN
READY_FOR_CODEX=NO
IMPLEMENTATION_STARTED=NO
```

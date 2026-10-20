# Delivery Assurance Package 04C — statistical-modeling descriptors

Status: **READY_FOR_EXECUTION_READY_REVIEW / NOT CODEX AUTHORIZED**  
Date: 2026-10-20  
Task key: `statistical-modeling--delivery-assurance-descriptors`  
Target: `YuukiAS/AI_Skills_Collection`  
Source ref: `main@272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3`  
Planned branch: `reviewed/statistical-modeling--delivery-assurance-descriptors`

## 1. Frozen authority

- da/1: `e278a3bab0949eac8a6f7df4007066da6eae7bd6`
- SHA-256: `8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b`
- authority matrix: `04_DOMAIN_DESCRIPTOR_AUTHORITY_MATRIX_V0_2.md`
- canonical source: `skills/domains/bayesian/statistical-analysis/SKILL.md@272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3`
- source blob: `e7664dbe4ae97a5299eafd7de8caa105a77f7aae`

This package projects the existing estimand/design, assumption/diagnostic/sensitivity, uncertainty/claim-strength and intended-scale completion contract. It does not own project execution or scientific promotion thresholds.

## 2. Exact implementation scope

Canonical source:

```text
skills/domains/bayesian/statistical-analysis/delivery-assurance/gates.toml
skills/domains/bayesian/statistical-analysis/evals/
```

Maintenance/release source:

```text
scripts/codex_marketplace_config.json
  statistical-modeling version 0.1 -> 0.2
  shared += {source: skills/domains/bayesian/statistical-analysis/delivery-assurance,
             target: delivery-assurance}
docs/plugin-changelogs/statistical-modeling.md
README.md
CHANGELOG.md -> Unreleased
tests/test_delivery_assurance_statistical_descriptors.py
tests/test_codex_marketplace.py
```

Generated only:

```text
plugins/codex/plugins/statistical-modeling/delivery-assurance/gates.toml
plugins/codex/plugins/statistical-modeling/.codex-plugin/plugin.json
.agents/plugins/marketplace.json
registry/catalog/provenance outputs
```

## 3. Descriptor set

```text
domain:statistical-modeling/estimand-design-data-integrity
domain:statistical-modeling/assumptions-diagnostics-sensitivity
domain:statistical-modeling/effect-uncertainty-claim-strength
domain:statistical-modeling/intended-scale-completion
```

Full semantics are frozen in the authority matrix.

Explicit exclusions:

- Slurm/job lifecycle and resource ownership;
- checkpoint or deployment identity;
- CARE-specific route thresholds and promotion decisions;
- external hosted metrics or submission authority;
- medical-imaging mechanism semantics.

## 4. Normal entry

```text
statistical-modeling@yuukias-ai-skills
→ bayesian-modeling aggregate
→ statistical-analysis
```

The installed skill must be consumed in a fresh candidate replay. A schema, notebook import, smoke simulation or one toy run cannot produce statistical PASS.

## 5. Version/release boundary

```text
statistical-modeling: 0.1 -> 0.2
repository VERSION: unchanged in 04C
formal release ref: unchanged in 04C
```

04C owns plugin version/changelog/README/root Unreleased/generated parity. Package 13 owns repository release/version/ref and managed adaptation. README update requires actual Clear Writing invocation.

## 6. Capability Gate Matrix

| Gate | Proves | Failure boundary |
|---|---|---|
| `STAT-DA-G1_AUTHORITY` | descriptors are direct projections of Statistical Analysis | project threshold/Slurm semantics invented centrally |
| `STAT-DA-G2_SOURCE_GENERATED` | canonical descriptor reaches generated plugin unchanged | direct generated edit/missing payload |
| `STAT-DA-G3_DISCOVERY` | installed plugin exposes descriptors | source/config presence only |
| `STAT-DA-G4_NORMAL_ENTRY` | installed statistical-analysis normal entry is consumed | helper/schema/notebook import only |
| `STAT-DA-G5_ESTIMAND_DATA` | wrong unit, estimand, split/leakage or missing-data assumptions fail | analysis answers another question |
| `STAT-DA-G6_DIAGNOSTICS` | applicable assumptions/diagnostics/sensitivity are required | one successful fit/smoke promoted to completion |
| `STAT-DA-G7_CLAIM_STRENGTH` | effect/uncertainty/multiplicity/exploratory boundaries control conclusions | p-value/point estimate overclaim |
| `STAT-DA-G8_SCALE` | intended scale or exact residual risk is required | toy run promoted as final analysis |
| `STAT-DA-G9_CALIBRATION` | valid, invalid and missing-evidence cases decide correctly | empty regression/known-bad bank |
| `STAT-DA-G10_PARITY_PATH` | generator idempotence and Windows path budget hold | second-run diff/path overflow |
| `STAT-DA-G11_RELEASE_METADATA` | version/changelog/README/manifest agree | mixed candidate or deferred bump |
| `STAT-DA-G12_REGRESSION` | existing Bayesian/data/viz routing remains unchanged | descriptor hijacks implementation tools or weakens workflow-core |

## 7. Recovery and forbidden scope

If a descriptor needs a professional standard beyond current Statistical Analysis, return to Statistical Modeling Planner/Critic. Project thresholds remain project-local.

Forbidden: CARE paths/route thresholds; Slurm/controller logic; medical-imaging standards; descriptor existence as PASS; consumer adapter; release movement; new registry/database/watcher.

## 8. Current state

```text
PACKAGE_STATUS=READY_FOR_EXECUTION_READY_REVIEW
TARGET_PLUGIN_VERSION=0.2
EXECUTION_READY_DECISION=NOT_RUN
READY_FOR_CODEX=NO
IMPLEMENTATION_STARTED=NO
```

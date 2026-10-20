# Delivery Assurance Package 04D — medical-imaging descriptors

Status: **READY_FOR_EXECUTION_READY_REVIEW / NOT CODEX AUTHORIZED**  
Date: 2026-10-20  
Task key: `medical-imaging--delivery-assurance-descriptors`  
Target: `YuukiAS/AI_Skills_Collection`  
Source ref: `main@272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3`  
Planned branch: `reviewed/medical-imaging--delivery-assurance-descriptors`

## 1. Frozen authority

- da/1: `e278a3bab0949eac8a6f7df4007066da6eae7bd6`
- SHA-256: `8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b`
- authority matrix: `04_DOMAIN_DESCRIPTOR_AUTHORITY_MATRIX_V0_2.md`
- canonical source: `skills/domains/medical-imaging/medical-imaging-deep-learning/SKILL.md@272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3`
- source blob: `993a8f437cf530b9d0661373964274544b0d71ed`

This package projects current medical-imaging model-evidence, shallow-substitution, split/baseline, registration, temporal, missing-modality and external-method standards. It does not own project Slurm/controller or route-promotion semantics.

## 2. Exact implementation scope

Canonical source:

```text
skills/domains/medical-imaging/medical-imaging-deep-learning/delivery-assurance/gates.toml
skills/domains/medical-imaging/medical-imaging-deep-learning/evals/
```

Maintenance/release source:

```text
scripts/codex_marketplace_config.json
  medical-imaging version 0.1 -> 0.2
  shared += {source: skills/domains/medical-imaging/medical-imaging-deep-learning/delivery-assurance,
             target: delivery-assurance}
docs/plugin-changelogs/medical-imaging.md
README.md
CHANGELOG.md -> Unreleased
tests/test_delivery_assurance_medical_imaging_descriptors.py
tests/test_codex_marketplace.py
```

Generated only:

```text
plugins/codex/plugins/medical-imaging/delivery-assurance/gates.toml
plugins/codex/plugins/medical-imaging/.codex-plugin/plugin.json
.agents/plugins/marketplace.json
registry/catalog/provenance outputs
```

## 3. Descriptor set

```text
domain:medical-imaging/model-change-evidence-completeness
domain:medical-imaging/split-leakage-baseline-integrity
domain:medical-imaging/registration-warping-integrity
domain:medical-imaging/temporal-method-integrity
domain:medical-imaging/missing-modality-integrity
domain:medical-imaging/external-method-integration
```

Full semantics are frozen in the authority matrix.

Explicit exclusions:

- CARE controller/Slurm lifecycle;
- project resource budget;
- project-specific adequacy or route threshold;
- final upload/submission/promotion authority;
- generic statistical inference standards already owned by statistical-modeling.

## 4. Normal entry

```text
medical-imaging@yuukias-ai-skills
→ medical-imaging-workflows aggregate
→ medical-imaging-deep-learning
```

The final Gate requires the exact requested model/data/evaluation target and corresponding artifacts. Search, clone, import, shape smoke, one-case check or file existence is not integration/model completion.

## 5. Version/release boundary

```text
medical-imaging: 0.1 -> 0.2
repository VERSION: unchanged in 04D
formal release ref: unchanged in 04D
```

04D owns plugin version/changelog/README/root Unreleased/generated parity. Package 13 owns repository release/version/ref and managed adaptation. README update requires actual Clear Writing invocation.

## 6. Capability Gate Matrix

| Gate | Proves | Failure boundary |
|---|---|---|
| `MI-DA-G1_AUTHORITY` | descriptor semantics are supported by current medical-imaging source | CARE thresholds/Slurm logic invented centrally |
| `MI-DA-G2_SOURCE_GENERATED` | canonical descriptor reaches generated plugin unchanged | direct generated edit/missing payload |
| `MI-DA-G3_DISCOVERY` | installed plugin exposes descriptors | source/config presence only |
| `MI-DA-G4_NORMAL_ENTRY` | installed medical-imaging normal entry is consumed | helper/schema/import-only success |
| `MI-DA-G5_MODEL_EVIDENCE` | mechanism + checkpoint/prediction/metric/baseline are complete | smoke/proxy/shallow substitution promoted |
| `MI-DA-G6_SPLIT_BASELINE` | leakage-safe split and defensible same-split baseline | slice/patient leakage or weak mismatched baseline |
| `MI-DA-G7_REGISTRATION` | transform/plausibility/downstream evidence is complete | translation/resampling/copying called registration |
| `MI-DA-G8_TEMPORAL` | non-reference frames and temporal mechanism support target | frame0/single-frame proxy called temporal method |
| `MI-DA-G9_MISSING_MODALITY` | target-aware masks/routing/loss/subgroup evidence | missing target modality treated as negative |
| `MI-DA-G10_EXTERNAL_METHOD` | stage 5+ same-evaluator validation required | search/clone/import/shape smoke called integrated |
| `MI-DA-G11_CALIBRATION` | positive, forbidden shallow and missing-evidence cases decide correctly | empty known-bad/regression bank |
| `MI-DA-G12_PARITY_PATH` | generator idempotence and Windows path budget hold | second-run diff/path overflow |
| `MI-DA-G13_RELEASE_METADATA` | version/changelog/README/manifest agree | mixed candidate/deferred bump |
| `MI-DA-G14_REGRESSION` | existing medical-imaging routing/tools remain intact | descriptor hijacks unrelated DICOM/CMR/pathology tasks |

## 7. Recovery and forbidden scope

If current source cannot support a proposed professional condition, return to Medical Imaging Planner/Critic or keep it project-local. Executor cannot create new clinical/scientific thresholds.

Forbidden: CARE project paths, thresholds or route decisions; Slurm/controller implementation; generic stats ownership; descriptor existence as PASS; consumer adapter; release movement; registry/database/watcher.

## 8. Current state

```text
PACKAGE_STATUS=READY_FOR_EXECUTION_READY_REVIEW
TARGET_PLUGIN_VERSION=0.2
EXECUTION_READY_DECISION=NOT_RUN
READY_FOR_CODEX=NO
IMPLEMENTATION_STARTED=NO
```

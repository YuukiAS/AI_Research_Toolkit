# Package 04D — medical-imaging Descriptor Execution-Ready Critic Prompt

你现在担任独立 Critic，只审 `medical-imaging--delivery-assurance-descriptors`。不审或代签其他 domain package，不实施代码。

## Context

- package: `docs/research/software-production/19_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_2_20261020/04D_MEDICAL_IMAGING_DESCRIPTORS_V0_1.md`
- package commit: `a2f66c7a1ff868f3198c0b56debd7e5fe3b61fd7`
- authority matrix: `04_DOMAIN_DESCRIPTOR_AUTHORITY_MATRIX_V0_2.md@45656932e2aff6562965c77113a97fd19a56e47e`
- target repo: `YuukiAS/AI_Skills_Collection`
- da/1: `e278a3bab0949eac8a6f7df4007066da6eae7bd6`
- expected review: `.../19_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_2_20261020/reviews/04D_MEDICAL_IMAGING_CRITIC_REVIEW.md`

## Required reads

Read latest governance/AGENTS, current medical-imaging source/generated plugin, canonical `medical-imaging-deep-learning`, Marketplace generator/config, version/changelog/README policy, AI Skills Maintainer and previous Package04 review.

## Must verify

1. Every descriptor is supported by current medical-imaging source: model-change evidence, split/leakage/baseline, registration, temporal, missing modality and external-method integration.
2. CARE Slurm/controller/resource/route thresholds and generic statistics remain outside.
3. Canonical source, shared-copy generator and generated/installed parity are exact; no direct generated edits.
4. Version `0.1 -> 0.2`, README/changelog/root Unreleased and Package13 release boundary are frozen.
5. Fresh installed normal entry is consumed; search/clone/import/shape smoke/file existence cannot PASS.
6. Shallow substitutions, leakage, translation-as-registration, frame0-as-temporal, missing-target-modality-as-negative and smoke-as-integration fail correctly.
7. Exact checkpoint/prediction/metric/baseline/split evidence and professional observer are required.
8. Same final candidate and unrelated medical-imaging routing regression are required.

Attack project-specific CARE semantics in central descriptors, descriptor-exists PASS, generated-only changes and mixed version/candidate metadata.

## Decision

Only `PASS / REVISE`.

PASS output:

```text
decision=PASS
READY_FOR_CODEX=YES
reviewed_package_commit=a2f66c7a1ff868f3198c0b56debd7e5fe3b61fd7
USER_EXECUTION_AUTHORIZATION=NOT_GRANTED
NEXT_HANDOFF=PLANNER
```

REVISE IDs: `DA-ER-04D-Fxx`. Write only the review artifact; no Codex kickoff.

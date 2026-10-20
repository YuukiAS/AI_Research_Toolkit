# Package 04B — scientific-visualization Descriptor Execution-Ready Critic Prompt

你现在担任独立 Critic，只审 `scientific-visualization--delivery-assurance-descriptors`。不审或代签 04A/04C/04D，不实施代码。

## Context

- package: `docs/research/software-production/19_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_2_20261020/04B_SCIENTIFIC_VISUALIZATION_DESCRIPTORS_V0_1.md`
- package commit: `df374d82dd0584fa50e5d3d466a356d6dc65f4af`
- authority matrix: `04_DOMAIN_DESCRIPTOR_AUTHORITY_MATRIX_V0_2.md@45656932e2aff6562965c77113a97fd19a56e47e`
- target repo: `YuukiAS/AI_Skills_Collection`
- da/1: `e278a3bab0949eac8a6f7df4007066da6eae7bd6`
- expected review: `.../19_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_2_20261020/reviews/04B_SCIENTIFIC_VISUALIZATION_CRITIC_REVIEW.md`

## Required reads

Read latest governance/AGENTS, current scientific-visualization source/generated plugin, `scientific-figure-qa`, Marketplace generator/config, version/changelog/README policy, AI Skills Maintainer and the previous Package04 review.

## Must verify

1. Accessibility/readability, statistical visual integrity, export readiness and palette provenance are directly supported by the current Scientific Figure QA contract.
2. Interactive product state, DOM geometry, Asteria graph semantics and whole-product frontend judgment remain outside these descriptors.
3. Canonical source/generator/generated/installed parity is exact and no generated payload is edited directly.
4. Version `0.1 -> 0.2`, README/changelog/root Unreleased and Package13 release boundary are frozen.
5. Exact rendered/exported artifact at intended size/constraints is required; plotting script/file/schema existence cannot PASS.
6. Known low-contrast/grayscale/layout, misleading uncertainty/colorbar/midpoint, wrong export and false palette-provenance cases fail.
7. Fresh installed normal entry is consumed; all release-critical Gates bind one final candidate.
8. Existing palette/figure/schematic/poster routing remains unchanged.

Attack an Asteria-specific central Gate, checklist-word PASS, output-file-exists PASS, generated-only change, and mixed candidate/version metadata.

## Decision

Only `PASS / REVISE`.

PASS output:

```text
decision=PASS
READY_FOR_CODEX=YES
reviewed_package_commit=df374d82dd0584fa50e5d3d466a356d6dc65f4af
USER_EXECUTION_AUTHORIZATION=NOT_GRANTED
NEXT_HANDOFF=PLANNER
```

REVISE IDs: `DA-ER-04B-Fxx`. Write only the review artifact; do not produce a Codex kickoff.

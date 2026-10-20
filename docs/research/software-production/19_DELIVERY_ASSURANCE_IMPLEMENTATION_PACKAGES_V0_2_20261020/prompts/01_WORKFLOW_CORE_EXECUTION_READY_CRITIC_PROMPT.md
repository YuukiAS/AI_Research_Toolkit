# Package 01 v0.2 — workflow-core Execution-Ready Critic Prompt

你现在担任 AI Research Stack 的独立 Critic，只审 Delivery Assurance Package 01 v0.2：`workflow-core--delivery-assurance-resolver`。

本轮不实施代码，不审 Bridge、PIE、domain descriptors 或 consumer，不修改任何 repo。结论只允许 `PASS / REVISE`。

## Active Review Context

- target_repo: `YuukiAS/AI_Skills_Collection`
- task_key: `workflow-core--delivery-assurance-resolver`
- reviewed_package:
  `docs/research/software-production/19_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_2_20261020/01_WORKFLOW_CORE_RESOLVER_V0_2.md`
- package commit: `288ae6978da77b6a054e89b648572538c64aa291`
- previous review:
  `docs/research/software-production/18_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_1_20261020/reviews/01_WORKFLOW_CORE_RESOLVER_CRITIC_REVIEW.md`
- previous findings: `DA-ER-01-F01`, `DA-ER-01-F02`
- da/1 commit: `e278a3bab0949eac8a6f7df4007066da6eae7bd6`
- da/1 SHA-256: `8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b`
- expected review artifact:
  `docs/research/software-production/19_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_2_20261020/reviews/01_WORKFLOW_CORE_RESOLVER_V0_2_CRITIC_REVIEW.md`

## Required reads

Read latest `AI_Skills_Collection@main`:

- `AGENTS.md`
- Planner/Critic Role Contract 1.7
- Plugin Capability Gate Policy 1.2
- AI Skills Maintenance Board
- canonical `skills/core/codex-system/codex-workflow-protocol/`
- generated `plugins/codex/plugins/workflow-core/`
- `scripts/codex_marketplace_config.json`
- `scripts/build_codex_marketplace.py`
- `scripts/candidate_plugin_replay.py`
- AI Skills Repository Maintainer source
- version policy, `VERSION`, root/plugin changelog, README
- workflow-core TODO and Issue `#107`.

Refresh current main. A newer ref is not itself a blocker; compare relevant semantics.

## Finding recheck

### F01 canonical source and parity

Verify the package freezes:

- canonical source paths under `skills/core/codex-system/codex-workflow-protocol/`;
- exact new reference/script/schema assets;
- current recursive copy path into generated workflow plugin;
- bounded generator/config amendment only if the existing copy path is proven insufficient;
- no direct generated edits;
- source/generated/Marketplace/installed candidate identity;
- generator idempotence and Windows path budget;
- fresh installed plugin normal-entry replay.

REVISE if Codex would still need to choose where production source belongs or how it reaches the installed plugin.

### F02 maintenance/release closure

Verify:

- workflow-core target plugin version is exactly `0.6`;
- repository `VERSION` remains unchanged in Package 01;
- Package 01 updates plugin config/manifest/changelog/README/root Unreleased exactly as specified;
- README mutation requires actual Clear Writing invocation;
- Package 13, not Package 01, owns repository release version/ref and managed adaptation;
- `workflow-core + ai-skills-core` maintenance companion is explicit;
- source/generated/version/catalog/provenance parity is in the Gates;
- Issue #107 remains DOING until formal release, then ADAPTING while required consumers remain, and only later DONE.

Do not require Issue-body mutation now when Clear Writing invocation is unavailable; check the pending mutation is truthful.

## Product attack

Attack at least:

- unknown impact -> NONE;
- many Gate families -> unnecessary FULL;
- whole-product claim misses sibling target;
- Resolver invents professional standard;
- schema/unit tests pass but installed workflow-core never consumes the Resolver;
- generated payload differs from source;
- new paths exceed Windows budget;
- DA weakens W1–W5, Human Gate or least-privilege recovery;
- version/changelog/README are mixed across candidates.

## Decision

On PASS, output:

```text
decision=PASS
READY_FOR_CODEX=YES
reviewed_package_commit=288ae6978da77b6a054e89b648572538c64aa291
da1_commit=e278a3bab0949eac8a6f7df4007066da6eae7bd6
USER_EXECUTION_AUTHORIZATION=NOT_GRANTED
NEXT_HANDOFF=PLANNER
```

PASS approves only Package 01 implementation after a later package-specific user kickoff. It does not authorize Package 02–13, formal release or consumer mutation.

On REVISE, reuse old finding IDs if the same defect remains; otherwise use `DA-ER-01-V02-Fxx`. Give direct evidence, causal risk, minimum closure and unique owner.

Write only the review artifact above. Do not generate a Codex kickoff.

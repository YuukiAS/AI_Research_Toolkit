# Delivery Assurance Wave A — Independent Execution-Ready Critic Prompt

你现在担任 AI Research Stack 的独立 Critic，对 Delivery Assurance 第一批 **5 个彼此独立的 implementation package** 做 execution-ready 审查。

这不是一个五仓巨型 Codex 任务。你可以在一个 Critic 线程中依次审 5 个 package，但必须为每个 package 单独绑定 Active Design Context、单独给 `PASS / REVISE`、单独写 review artifact。一个 package 的 PASS 不能代签另一个 package。

本轮不实施代码、不运行 Windows/浏览器账号/Slurm/GPU、不移动 release、不修改 consumer repo。

## 0. 当前架构 authority

Public `da/1` 已机械冻结：

- path:
  `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PUBLIC_DA1_INTERFACE_FREEZE_V1_20261020.md`
- freeze commit:
  `e278a3bab0949eac8a6f7df4007066da6eae7bd6`
- SHA-256:
  `8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b`
- freeze record:
  `DELIVERY_ASSURANCE_PUBLIC_DA1_INTERFACE_FREEZE_RECORD_20261020.md@65a6adaa5695ae64d4853335348b5d82faa12810`

Package set index:

`docs/research/software-production/18_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_1_20261020/README.md@f977aa997d405a297f6bcef335c2399c7ef8cae7`

v0.4 architecture Critic decision supplied by the user:

```text
DECISION=PROCEED
EXECUTION_READY_REVIEW_REQUIRED=YES
READY_FOR_CODEX=NO
```

Phase 1 remains:

```text
PHASE1_CLOSED=YES
PHASE1_VERDICT=GO
```

Do not reopen Hook research.

## 1. Mandatory governance read

Read latest `YuukiAS/AI_Skills_Collection@main`:

- `docs/workflows/PLANNER_ROLE_CONTRACT.md`
- `docs/workflows/CRITIC_ROLE_CONTRACT.md`
- `docs/workflows/PLUGIN_CAPABILITY_GATE_POLICY.md`
- `docs/workflows/AI_SKILLS_MAINTENANCE_BOARD.md`

This is the **final execution-ready review** for each package. For a package that is truly execution-ready, the only approval is:

```text
PASS
READY_FOR_CODEX=YES
```

For a blocker:

```text
REVISE
READY_FOR_CODEX=NO
```

Do not use `PROCEED` at this stage.

## 2. Packages under review

### Package 01 — workflow-core

- task key: `workflow-core--delivery-assurance-resolver`
- file: `docs/research/software-production/18_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_1_20261020/01_WORKFLOW_CORE_RESOLVER.md`
- target repo: `YuukiAS/AI_Skills_Collection`
- observed source ref in package: `272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3`
- expected review artifact:
  `docs/research/software-production/18_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_1_20261020/reviews/01_WORKFLOW_CORE_RESOLVER_CRITIC_REVIEW.md`

Read current target `AGENTS.md`, current workflow-core source, TODO entry with `tracking: #107`, relevant generator/tests and current main before deciding.

### Package 02 — Bridge runtime

- task key: `bridge-core--delivery-assurance-runtime`
- file: `docs/research/software-production/18_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_1_20261020/02_BRIDGE_RUNTIME.md`
- target repo: `YuukiAS/GPT_Codex_AI_Bridge_Kit`
- observed source ref: `bc94e41f44bd5b534d8ab8caa304114b8bf90685`
- expected review artifact:
  `docs/research/software-production/18_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_1_20261020/reviews/02_BRIDGE_RUNTIME_CRITIC_REVIEW.md`

Read current Bridge `AGENTS.md`, Review, Control, Persistent Run and current 0.11 scope-reset authority. Verify the package uses only the surviving runtime surface and does not restore deleted heavy topology.

### Package 03 — PIE 0.3

- task key: `project-instructions-editor--0.3-agents-authority-maintenance`
- file: `docs/research/software-production/18_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_1_20261020/03_PIE03.md`
- target repo: `YuukiAS/AI_Skills_Collection`
- observed source ref: `272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3`
- expected review artifact:
  `docs/research/software-production/18_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_1_20261020/reviews/03_PIE03_CRITIC_REVIEW.md`

Read current PIE 0.2 source/TODO, including `tracking: #108`. Verify 0.3 preserves all 0.2 Project-setting behavior and adds repo-AGENTS mode without inventing product/science semantics or creating a sync service.

### Package 04 — domain descriptors

- task key: `domain-descriptors--delivery-assurance-da1`
- file: `docs/research/software-production/18_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_1_20261020/04_DOMAIN_DESCRIPTORS.md`
- target repo: `YuukiAS/AI_Skills_Collection`
- observed source ref: `272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3`
- expected review artifact:
  `docs/research/software-production/18_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_1_20261020/reviews/04_DOMAIN_DESCRIPTORS_CRITIC_REVIEW.md`

Read current web-development, scientific-visualization, statistical-modeling and medical-imaging production sources. Verify descriptors only project existing professional authority into da/1; if a proposed descriptor would require inventing a new professional standard, REVISE that package instead of letting Executor guess.

### Package 08 — Bobbio authority recovery

- task key: `bobbio--status-authority-recovery`
- file: `docs/research/software-production/18_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_1_20261020/08_BOBBIO_RECOVERY.md`
- target repo: `YuukiAS/Bobbio`
- observed refs:
  - `develop@a64edfd6c5b11f81599bfcfc327be5964633a7b5`
  - `main@e7d929bad2d4b23939c81920e77390efbce42b96`
- expected review artifact:
  `docs/research/software-production/18_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_1_20261020/reviews/08_BOBBIO_RECOVERY_CRITIC_REVIEW.md`

Read current `develop` AGENTS/ROADMAP/current milestone/version/acceptance sources. Verify this task only restores authority truth and does not implement Bobbio DA adapter yet.

## 3. Global execution-ready checks for every package

For each package independently verify:

1. exact target repo/ref and target AGENTS have been read;
2. package binds frozen da/1 commit + SHA-256;
3. Goal and forbidden scope are complete;
4. exact implementation surfaces are bounded enough that Codex does not choose architecture;
5. normal production entry is named and is not only a helper/unit/schema path;
6. Capability Gate Matrix proves distinct real abilities and dangerous failures;
7. same-final-candidate rule is explicit;
8. regression bank / known-bad / should-not-change order follows Capability Gate Policy 1.2;
9. permission, secrets, device, network, paid, external and release boundaries are frozen;
10. recovery path keeps same-scope defects in the same task and returns architecture/owner changes to Planner;
11. README/version/changelog/release rules match the target repo;
12. package does not create a registry/database/daemon/watcher/workflow/state machine;
13. package completion cannot sign another lane;
14. no implementation begins from Critic PASS alone; user kickoff/authorization remains required.

Do not block on a source ref merely being newer if the relevant contract is unchanged. If it changed materially, identify the exact changed rule and minimum package amendment.

## 4. Package-specific attack requirements

### 01 workflow-core

Attack:

- unknown impact accidentally becomes NONE;
- small isolated change becomes FULL because there are many Gates;
- whole-product claim misses a sibling consumed target;
- missing professional standard is invented by Resolver;
- a JSON/schema test passes but normal workflow-core entry never consumes DA;
- DA breaks existing W1–W5 / Human Gate / least-privilege behavior.

### 02 Bridge

Attack:

- wrong session/cwd/candidate/result accepted;
- stale result closes task;
- duplicate Stop event starts multiple continuations;
- Interrupt loses precedence;
- Bridge begins selecting/understanding professional Gates;
- DA recreates deleted 0.11 reader/event/persistent-thread machinery.

### 03 PIE

Attack:

- partial/stale AGENTS treated as baseline;
- root/nested conflict silently resolved;
- compression removes mandatory DA/safety/permission semantics;
- PIE edits product/scientific standard;
- PIE 0.3 breaks PIE 0.2 Project-setting baseline/diff contract;
- repo mode becomes a watcher/database/registry.

### 04 descriptors

Attack:

- project-specific Asteria/CARE paths or thresholds leak into central descriptors;
- descriptor existence becomes professional PASS;
- two different professional owners are merged into one generic Gate;
- a descriptor references a test helper rather than the domain normal entry;
- generated package omits descriptor from installed plugin;
- central descriptor silently weakens an existing domain contract.

### 08 Bobbio recovery

Attack:

- newest file/mtime is treated as authority;
- package version is treated as user acceptance;
- deleting stale doc hides rather than records supersession;
- main 0.2 acceptance becomes develop 0.3 current truth;
- locator-only move causes unnecessary semantic re-decision;
- semantic conflict is resolved by Executor instead of Bobbio owner.

## 5. Output format

Write five review artifacts under `docs/research/software-production/18_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_1_20261020/reviews/`.

Each artifact begins with:

```text
target_repo=
task_key=
reviewed_package=
package_set_commit=f977aa997d405a297f6bcef335c2399c7ef8cae7
da1_freeze_commit=e278a3bab0949eac8a6f7df4007066da6eae7bd6
da1_sha256=8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b
source_ref_reviewed=
review_stage=EXECUTION_READY
decision=PASS|REVISE
READY_FOR_CODEX=YES|NO
```

On `REVISE`, use stable finding ids:

`DA-ER-<01|02|03|04|08>-Fxx`

and give requirement, direct evidence, causal risk, minimum closure and unique owner.

On `PASS`, state exactly what implementation is authorized **by review** and what remains outside the package. Do not claim user execution authorization.

## 6. Final Critic response

First give a compact table:

```text
01 workflow-core: PASS|REVISE
02 Bridge: PASS|REVISE
03 PIE 0.3: PASS|REVISE
04 domain descriptors: PASS|REVISE
08 Bobbio recovery: PASS|REVISE
```

Then explain only material blockers/approval boundaries.

If any package is `REVISE`, `NEXT_HANDOFF=PLANNER` for that package.

If a package is `PASS`, its next owner after the user explicitly authorizes the package-specific kickoff is `CODEX`. Do not generate one combined Codex prompt for all five packages.

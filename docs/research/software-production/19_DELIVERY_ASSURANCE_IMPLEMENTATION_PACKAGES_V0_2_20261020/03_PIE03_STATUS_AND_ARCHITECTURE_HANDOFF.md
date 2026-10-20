# Delivery Assurance Package 03 — PIE 0.3 status and architecture handoff

Status: **WAITING_FOR_PIE_ARCHITECTURE_CRITIC / NOT AN EXECUTION-READY PACKAGE**  
Date: 2026-10-20  
Task key: `project-instructions-editor--0.3-agents-authority-maintenance`  
Target repository: `YuukiAS/AI_Skills_Collection`  
Current source ref inspected: `main@272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3`

## 1. Critic findings and disposition

| Finding | Disposition | Current closure |
|---|---|---|
| `DA-ER-03-F01 — ARCHITECTURE_REVIEW_AND_EXECUTION_PACKAGE_SEQUENCE_SKIPPED` | ACCEPT | Package 03 v0.1 is retired as execution-ready input. PIE 0.3 must first receive an independent architecture `PROCEED`. |
| `DA-ER-03-F02 — PACKAGE_SCOPE_DIVERGES_FROM_CURRENT_PIE03_DESIGN` | ACCEPT | The current PIE architecture Proposal remains the single semantic authority; no execution package may narrow or replace its source/wrapper/installed-skill, trigger, managed-region or compatibility contracts. |

## 2. Current architecture object

Canonical Proposal:

```text
docs/design/project-instructions-editor/
PROJECT_INSTRUCTIONS_EDITOR_0_3_AGENTS_ARCHITECTURE_PROPOSAL_V0_1_2026-10-20.md
```

Proposal frozen commit recorded by its existing handoff:

```text
4b9d2014478e60d5ecf04d737740e7e04229e013
```

Existing architecture Critic prompt:

```text
docs/design/project-instructions-editor/
PROJECT_INSTRUCTIONS_EDITOR_0_3_AGENTS_ARCHITECTURE_CRITIC_PROMPT_V0_1_2026-10-20.md
```

Current `main@272f...` adds governance/tracking evidence only:

- Issue `#108` exists;
- `docs/skill-todos/project-instructions-editor.md` contains `tracking: #108`;
- no PIE 0.3 production source implementation exists;
- no independent PIE architecture Critic review artifact exists.

The Proposal's architecture semantics remain current. No v0.2 Proposal is needed merely for these locator/governance updates. The review handoff must bind both the frozen Proposal commit and current governance ref.

## 3. Scope the architecture Critic must decide

The architecture review must decide whether PIE 0.3 can safely extend the released 0.2 standalone Skill with a repo-AGENTS mode while preserving all existing Project-setting behavior.

It must cover at least:

- root/nested/override AGENTS discovery and precedence;
- exact current baseline or explicit ABSENT state;
- canonical authority set and unresolved conflict behavior;
- managed-region versus user-owned text;
- bounded edit versus full rewrite;
- preview, complete clean candidate, authority map and coverage report;
- protected absence and accepted-deletion preservation;
- instruction-budget and duplicate-rule handling;
- product/science semantics remain with project/domain owner;
- ChatGPT explicit entry and Codex fresh-session implicit entry;
- source skill, ChatGPT wrapper and installed standalone skill parity;
- Asteria and SeminarArc as two real consumer structures;
- no registry/database/watcher/sync daemon;
- AI Skills Maintainer release and required-consumer adaptation.

The architecture Critic gives only:

```text
PROCEED
or
REVISE
```

It must not give `PASS`, `READY_FOR_CODEX=YES` or implementation authorization.

## 4. Required next package only after PROCEED

Only after architecture `PROCEED` may the PIE Planner prepare a complete execution package containing:

```text
Implementation Plan
Canonical Goal
Kickoff Draft
execution-ready Package 03
Capability Gate Matrix
```

That package must freeze exact production surfaces:

```text
skills/core/codex-system/project-instructions-editor/SKILL.md
skills/core/codex-system/project-instructions-editor/agents/openai.yaml
skills/core/codex-system/project-instructions-editor/references/editor-contract.md
skills/core/codex-system/project-instructions-editor/references/repository-agents-contract.md
skills/core/codex-system/project-instructions-editor/evals/trigger_queries.json
skills/core/codex-system/project-instructions-editor/assets/app-facing.svg
```

It must also freeze:

- released version `0.2` -> exact target version;
- `writes_files` truth;
- `allow_implicit_invocation` truth;
- complete 0.2 compatibility regression;
- ChatGPT explicit entry;
- Codex fresh-session implicit entry;
- Asteria + SeminarArc real-repo Gates;
- authority conflict and stale/partial baseline failures;
- source/wrapper/installed parity;
- ai-skills-core maintenance/release closure;
- central complete -> ADAPTING -> required consumer closure.

None of these may be invented by the Executor.

## 5. Tracking truth

```text
Issue = #108
source backlink = tracking: #108
semantic lifecycle = DOING because substantive architecture design exists
Project field status = NOT VERIFIED / NOT MUTATED by this Planner surface
Resolution commit = blank
```

The current Issue body says architecture design is the next step and is therefore stale. A substantive Issue rewrite is not performed because this runtime has no genuine Clear Writing invocation capability. The exact pending mutation for the next Clear-Writing-capable Project Maintainer is:

```text
#108 current progress = PIE 0.3 architecture Proposal v0.1 exists and awaits independent design Critic
current anchor = exact Proposal path + frozen commit + current main governance ref
next action = run independent architecture Critic; on PROCEED return to PIE Planner for execution package
Project Area = standalone-skill
Project Status = DOING
Resolution commit = blank
```

The user must not maintain this manually.

## 6. Current state

```text
DA-ER-03-F01=OPEN_UNTIL_ARCHITECTURE_CRITIC_PROCEED
DA-ER-03-F02=OPEN_UNTIL_ARCHITECTURE_CRITIC_PROCEED_AND_LATER_PACKAGE_ALIGNMENT
PACKAGE_STATUS=WAITING_FOR_DESIGN_REVIEW
EXECUTION_READY_PACKAGE_EXISTS=NO
READY_FOR_CODEX=NO
IMPLEMENTATION_STARTED=NO
USER_ACTION_REQUIRED_NOW=NO
NEXT_HANDOFF=PIE_ARCHITECTURE_CRITIC
```

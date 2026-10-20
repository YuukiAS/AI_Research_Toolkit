# Delivery Assurance implementation package set v0.1

Status: **PLANNER PACKAGE SET / EXECUTION-READY REVIEWS REQUIRED / NO CODEX AUTHORIZATION**  
Date: 2026-10-20

## 1. Public interface authority

All packages bind exactly to:

- interface path: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PUBLIC_DA1_INTERFACE_FREEZE_V1_20261020.md`
- freeze commit: `e278a3bab0949eac8a6f7df4007066da6eae7bd6`
- SHA-256: `8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b`
- freeze record: `DELIVERY_ASSURANCE_PUBLIC_DA1_INTERFACE_FREEZE_RECORD_20261020.md@65a6adaa5695ae64d4853335348b5d82faa12810`

No package may alter a required da/1 field, owner or decision semantic locally.

## 2. Package inventory

| # | Task key | Owner repo | Execution dependency | Current planner state |
|---|---|---|---|---|
| 01 | `workflow-core--delivery-assurance-resolver` | AI_Skills_Collection | da/1 | draft for execution-ready Critic |
| 02 | `bridge-core--delivery-assurance-runtime` | Bridge Kit | da/1 + current 0.11 surviving runtime | draft for execution-ready Critic |
| 03 | `project-instructions-editor--0.3-agents-authority-maintenance` | AI_Skills_Collection | da/1 AGENTS fields | draft for execution-ready Critic |
| 04 | `domain-descriptors--delivery-assurance-da1` | AI_Skills_Collection | da/1 | draft for execution-ready Critic |
| 05 | `asteria--delivery-assurance-first-vertical` | Asteria | 01 + 02 + applicable 04; 03 only if AGENTS mutation | prepared; do not execute before prerequisites |
| 06 | `lucerna--delivery-assurance-native-consumer` | Lucerna | common-core repair after 05 + applicable 04 | prepared; dependency-blocked |
| 07 | `care--delivery-assurance-scientific-long-run` | CARE_Challenge | common-core repair after 05 + applicable 04 | prepared; dependency-blocked |
| 08 | `bobbio--status-authority-recovery` | Bobbio | v0.4 recovery contract only | draft for independent execution-ready Critic; may be completed before package 09 |
| 09 | `bobbio--delivery-assurance-consumer` | Bobbio | 08 + common core + applicable 04 | prepared; dependency-blocked |
| 10 | `mica--delivery-assurance-consumer` | Mica-for-ChatGPT | common core + applicable 04 | prepared; dependency-blocked |
| 11 | `seminararc--delivery-assurance-consumer` | SeminarArc | common core + applicable 04 | prepared; dependency-blocked except pre-frozen Asteria fallback path |
| 12 | `cuhk-date--delivery-assurance-consumer` | CUHK_Date | common core + applicable 04 | prepared; dependency-blocked |
| 13 | `ai-skills-core--delivery-assurance-release-adaptation` | AI_Skills_Collection + Bridge release coordination | all required central/consumer closures | prepared; final dependency-blocked |

Each package has its own Proposal, implementation plan, Capability Gate Matrix, normal entry, final-candidate identity, recovery route and completion state. No package PASS signs another package.

## 3. Files

- `01_WORKFLOW_CORE_RESOLVER.md`
- `02_BRIDGE_RUNTIME.md`
- `03_PIE03.md`
- `04_DOMAIN_DESCRIPTORS.md`
- `05_ASTERIA.md`
- `06_LUCERNA.md`
- `07_CARE.md`
- `08_BOBBIO_RECOVERY.md`
- `09_BOBBIO_CONSUMER.md`
- `10_MICA.md`
- `11_SEMINARARC.md`
- `12_CUHK_DATE.md`
- `13_MAINTAINER_RELEASE.md`

## 4. Review and execution order

A package is not executable merely because it exists here.

### Wave A — independent central/recovery package review

May enter execution-ready Critic independently:

```text
01 workflow-core
02 Bridge
03 PIE 0.3
04 domain descriptors
08 Bobbio authority recovery
```

Each needs its own execution-ready `PASS + READY_FOR_CODEX=YES`. User kickoff/authorization remains separate.

### Wave B — first vertical

Package 05 Asteria can enter final execution-ready review only after the required 01/02/04 interfaces are frozen at implementation-candidate level. If Asteria preflight proves the fixed public environment unavailable in the approved window, package 11 SeminarArc may be used only as the already-approved Emulator fallback.

### Wave C — extremes and remaining consumers

After Asteria produces real common-core evidence and any common-core repair is completed without changing da/1:

```text
06 Lucerna || 07 CARE
08 recovery must already precede 09 Bobbio
10 Mica
11 SeminarArc (if not already used as fallback)
12 CUHK_Date
```

These are independent consumer completion objects. Consumer-specific failures repair their own package unless they directly falsify the frozen public interface.

### Wave D — formal release

Package 13 runs only when every required central and consumer package in the frozen completion claim has independent completion evidence.

## 5. No-giant-task invariant

There is no legal kickoff that authorizes packages 01–13 as one Codex task.

Every kickoff must bind exactly one task key, one target repo/branch/worktree, one package file, one final-candidate identity and one package-specific authorization envelope.

Cross-package information transfer uses the immutable da/1 locator and explicit evidence refs. It does not use one shared writable CURRENT, one controller or one global repair budget.

## 6. Current repo heads used when drafting

```text
AI_Skills_Collection main = 272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3
Bridge main               = bc94e41f44bd5b534d8ab8caa304114b8bf90685
Lucerna main              = 79dd2875d3da33c6a6d80e5e35bea812b84c1ceb
Bobbio main               = e7d929bad2d4b23939c81920e77390efbce42b96
Bobbio develop            = a64edfd6c5b11f81599bfcfc327be5964633a7b5
Mica main                 = 7059c0dc24b908b57bd0e1f475142ba4f4520621
SeminarArc main           = 5652fe17ce60625f3ff7c758fcc0183f920189de
Asteria main              = 193c033659a7612a99442763077217b130e9b756
CUHK_Date main            = 9f25c7754d3c80d0be74f5b71016320f55753ae6
CARE_Challenge main       = 75a40e454de43b64e59a0b0b438ff57ef2bb8345
```

Execution-ready Critic must refresh the exact target ref before PASS. A changed ref does not automatically invalidate the package, but any relevant AGENTS/normal-entry/contract drift must be reconciled before PASS.

## 7. Maintenance truth

Completed canonical source backlink mutations:

```text
workflow-core TODO entry -> tracking: #107
commit = 1983ec25b66bfd506751d3ecbcb19fa938bb3ba8

PIE TODO new repo-AGENTS entry -> tracking: #108
commit = 272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3
```

Still pending because this Planner surface has no actual Clear Writing invocation tool and no GitHub Project-field mutation tool:

```text
Issue #107 reader-facing current anchor:
  must point to Delivery Assurance design content 0ff0f43f3b04286273490e4c4870975f4aa7a7f8
  and current research branch head at the time of safe mutation

Project:
  #107 Area=workflow-core Status=DOING Resolution commit=<blank>
  #108 Area=standalone-skill Status=TODO Resolution commit=<blank>
```

The user must not maintain these manually. The next Project-capable AI Skills Maintainer with a real Clear Writing invocation must verify current evidence and mechanically apply them.

## 8. Current truth

```text
PUBLIC_DA_1_INTERFACE_FROZEN=YES
IMPLEMENTATION_PACKAGE_COUNT=13
EXECUTION_READY_PASS_COUNT=0
READY_FOR_CODEX=NO
PRODUCTION_IMPLEMENTATION_STARTED=NO
DA_G10_G15=NOT_EVALUATED
DA_V04_G1_G10=NOT_EVALUATED
USER_ACTION_REQUIRED_NOW=NO
```

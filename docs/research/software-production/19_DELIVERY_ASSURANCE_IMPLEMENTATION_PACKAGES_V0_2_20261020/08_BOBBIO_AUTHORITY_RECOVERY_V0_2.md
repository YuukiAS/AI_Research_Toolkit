# Delivery Assurance Package 08 v0.2 — Bobbio Status Authority Recovery

Status: **READY_FOR_EXECUTION_READY_REVIEW / NOT CODEX AUTHORIZED**  
Date: 2026-10-20  
Aggregate recovery key: `bobbio--status-authority-recovery`  
Target repository: `YuukiAS/Bobbio`

## 1. Current branch facts

Inspected refs:

```text
develop = a64edfd6c5b11f81599bfcfc327be5964633a7b5
main    = e7d929bad2d4b23939c81920e77390efbce42b96
```

Current facts:

- `develop/AGENTS.md`, `develop/ROADMAP.md`, `develop/docs/CURRENT_MILESTONE.md` and `develop/package.json` agree that `0.2.0` is accepted and `0.3.0` is current development;
- `develop/package.json` version is `0.3.0`;
- `develop/docs/plans/IMPLEMENTATION_PLAN_0.3.0.md` and later 0.3 repair plans are current implementation authorities;
- `main/package.json` remains `0.2.0` and `docs/handoffs/ACCEPTANCE_0.2.0_2026-09-13.md` records accepted 0.2.0;
- historical `main/docs/CURRENT_MILESTONE.md` / `main/ROADMAP.md` contain pre-acceptance or otherwise stale milestone wording and cannot be treated as the branch-aware current authority.

The problem is no longer described as “the whole repository is inconsistent.” It is a specific branch/release authority projection defect.

## 2. Critic findings and disposition

| Finding | Disposition | Closure |
|---|---|---|
| `DA-ER-08-F01 — CURRENT_BRANCH_FACTS_AND_MUTATION_TOPOLOGY_NOT_FROZEN` | ACCEPT | This package freezes current develop/main facts and a two-branch, two-review mutation topology; no direct main edit or Executor-chosen promotion is allowed. |
| `DA-ER-08-F02 — CANONICAL_LOCATOR_AND_NORMAL_ENTRY_UNSPECIFIED` | ACCEPT | Exact authority artifact, validator, tests, fixtures, package command, evidence path and pre/post cases are fixed below. |

## 3. Canonical authority artifact

Exact repository-relative path on both `develop` and `main` after recovery:

```text
docs/BOBBIO_MILESTONE_AUTHORITY.json
```

Required fields:

```text
schema = "bobbio.milestone-authority/v1"
branch_scope
release_scope
current_implementation_milestone
package_runtime_version
accepted_milestones[]
accepted_release_identity_refs[]
current_plan_refs[]
current_status_refs[]
promotion_authority_ref
claim_ceiling
canonical_locators[]
supersedes[]
effective_from
content_digest
```

### 3.1 Develop authority

For the inspected develop baseline:

```text
branch_scope = develop
current_implementation_milestone = 0.3.0
package_runtime_version = 0.3.0
accepted_milestones includes 0.1.0 and 0.2.0
current_plan_refs includes docs/plans/IMPLEMENTATION_PLAN_0.3.0.md and active explicit successors
claim_ceiling = current-development / not accepted-release
promotion_authority = Bobbio project owner + user acceptance contract for develop -> main
```

### 3.2 Main authority

For the inspected main baseline after correction:

```text
branch_scope = main
current_implementation_milestone = null
package_runtime_version = 0.2.0
accepted_milestones includes 0.1.0 and 0.2.0
accepted_release_identity_refs includes docs/handoffs/ACCEPTANCE_0.2.0_2026-09-13.md and exact accepted main commit
claim_ceiling = accepted-release 0.2.0
promotion_authority = Bobbio project owner / user acceptance contract
```

`package_runtime_version` is a code/package fact; it is not acceptance. `accepted_milestones` require immutable acceptance evidence. `current_implementation_milestone` is branch-scoped and cannot be inferred from the newest file or package version alone.

## 4. Exact implementation and regression entry

Canonical implementation on develop:

```text
docs/BOBBIO_MILESTONE_AUTHORITY.json
scripts/validate-bobbio-milestone-authority.mjs
tests/frontend/bobbio-milestone-authority.test.mjs
tests/fixtures/milestone-authority/pre-repair-conflict.json
tests/fixtures/milestone-authority/develop-current-0.3.json
tests/fixtures/milestone-authority/main-accepted-0.2.json
tests/fixtures/milestone-authority/old-evidence-negative.json
tests/fixtures/milestone-authority/locator-only-move.json
tests/fixtures/milestone-authority/semantic-conflict.json
package.json
```

Exact package command added on develop:

```json
"validate:milestone-authority": "node scripts/validate-bobbio-milestone-authority.mjs"
```

The validator accepts explicit refs, never the working-tree newest file:

```bash
pnpm validate:milestone-authority -- \
  --develop-ref <DEVELOP_CANDIDATE_SHA> \
  --main-ref <MAIN_CORRECTION_SHA> \
  --evidence-dir results/bobbio--status-authority-recovery
```

Durable evidence:

```text
results/bobbio--status-authority-recovery/AUTHORITY_RECOVERY_RESULT.json
results/bobbio--status-authority-recovery/RESULT.md
```

## 5. Frozen two-branch mutation topology

This recovery has two small execution objects because one branch cannot truthfully repair both branch-scoped authorities.

### Step A — develop authority/validator

```text
task key = bobbio--status-authority-recovery-develop
base = develop@a64edfd6c5b11f81599bfcfc327be5964633a7b5
planned branch = reviewed/bobbio--status-authority-recovery-develop
```

Allowed:

- add the canonical authority JSON for develop;
- add validator/tests/fixtures/package command;
- update develop current-status/roadmap locators only if needed to match already-established 0.3.0 semantics;
- produce pre-repair fixtures and local deterministic evidence.

Forbidden: Bobbio product behavior, DA consumer adapter, Windows/Zotero mutation, 0.3 acceptance.

Step A receives its own implementation review before integration to develop.

### Step B — accepted main docs/authority correction

```text
task key = bobbio--accepted-release-authority-correction
base = main@e7d929bad2d4b23939c81920e77390efbce42b96
planned branch = reviewed/bobbio--accepted-release-authority-correction
```

Allowed paths only:

```text
docs/BOBBIO_MILESTONE_AUTHORITY.json
docs/CURRENT_MILESTONE.md
ROADMAP.md
```

Required semantic correction:

- main is the accepted 0.2.0 stable milestone;
- 0.3.0 is current development on develop, not accepted on main;
- stale pre-acceptance language is corrected or explicitly marked superseded;
- acceptance is backed by the immutable 0.2 acceptance record and exact main identity;
- package version is not presented as acceptance.

Step B is docs/authority-only. It receives its own review and requires a package-specific user authorization before branch creation/publication and before any integration to `main`. Executor may not directly commit/push to `main` or choose whether to promote the correction.

### Aggregate closure sequence

```text
Step A implementation + review
→ Step B docs/authority candidate + review
→ user/project-owner authorized main correction integration
→ rerun Step A validator against exact integrated main + exact develop candidate
→ write final authority recovery evidence on the develop recovery task
→ integrate reviewed develop recovery
```

The aggregate recovery is complete only when both branch identities and the final cross-ref validation are recorded. This is still a small authority-recovery task, not a Bobbio product or DA adapter task.

## 6. Required regression cases

| Case | Required result |
|---|---|
| pre-repair conflict: accepted 0.2 evidence + stale main current wording + develop 0.3 | `STATUS_AUTHORITY_CONFLICT`, claim `UNKNOWN`, `USER_READY=NO` |
| develop current | selects `0.3.0` implementation contract and active 0.3 plan on develop |
| main accepted | selects accepted-release `0.2.0`, no current implementation milestone on main |
| old evidence negative | accepted 0.2 evidence cannot satisfy 0.3 enhanced-annotation/current-milestone claim |
| locator-only move | same semantic digest/supersession is mechanically repairable without project semantic decision |
| semantic conflict | conflicting milestone/acceptance semantics return Bobbio project owner; Executor does not choose |
| branch change | authority result/digest from main cannot be reused on develop or vice versa |

## 7. Capability Gate Matrix

| Gate | Proves | Explicit failure |
|---|---|---|
| `BOB-R1_FACTS` | package reflects actual develop/main/package/acceptance facts | obsolete “whole repo conflict” premise |
| `BOB-R2_CANONICAL_ARTIFACT` | exact JSON path and field ownership are stable | project-appropriate/TBD locator |
| `BOB-R3_PRE_REPAIR` | real stale topology fails closed | convenient authority selected |
| `BOB-R4_DEVELOP` | develop resolves 0.3 current development | 0.2 final gate selected |
| `BOB-R5_MAIN` | main resolves accepted 0.2 stable release | main described as 0.3 current implementation |
| `BOB-R6_OLD_EVIDENCE` | 0.2 evidence cannot sign 0.3 claim | cross-milestone promotion |
| `BOB-R7_LOCATOR` | locator-only move is mechanical | unnecessary semantic re-decision |
| `BOB-R8_SEMANTIC_CONFLICT` | real conflict returns project owner | mtime/newest/strictest choice |
| `BOB-R9_TOPOLOGY` | both reviewed branch candidates and integration identities are explicit | direct main edit or hidden mutation |
| `BOB-R10_SCOPE` | no product/DA/Windows/Zotero work occurs | recovery expands into consumer implementation |

## 8. Recovery and authorization boundary

Same-scope script/test/docs defects remain in the corresponding Step A or Step B task.

Any new milestone semantics, acceptance reversal or promotion choice returns to Bobbio project owner/user. Locator-only repairs do not.

Execution-ready Critic PASS does not authorize branch creation, publication or main integration. A later kickoff must explicitly authorize the exact two branches/worktrees and bounded non-force publication. Main integration remains a separate visible project-owner/user action after review.

## 9. Current state

```text
DA-ER-08-F01=CLOSED_BY_PACKAGE_V0_2
DA-ER-08-F02=CLOSED_BY_PACKAGE_V0_2
PACKAGE_STATUS=READY_FOR_EXECUTION_READY_REVIEW
EXECUTION_READY_DECISION=NOT_RUN
READY_FOR_CODEX=NO
IMPLEMENTATION_STARTED=NO
USER_ACTION_REQUIRED_NOW=NO
```

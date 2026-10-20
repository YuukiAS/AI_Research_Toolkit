# Delivery Assurance public `da/1` interface freeze v1

Status: **FROZEN_PUBLIC_DESIGN_INTERFACE / NOT IMPLEMENTATION AUTHORIZATION**  
Date: 2026-10-20  
Design topic: `software-production--delivery-assurance`  
Wire version: `da/1`

## 0. Freeze authority

This file is mechanically derived from the approved v0.4 design:

- v0.4 design content: `0ff0f43f3b04286273490e4c4870975f4aa7a7f8`
- v0.4 Proposal sections 4–9
- retained v0.3 C03 / C10 / C17
- Seven-Consumer Adoption Annex
- AGENTS Lifecycle / PIE 0.3 Requirements
- Bobbio Status Authority Recovery Contract
- Problem Coverage and Architecture Proof

The independent Critic decision is `PROCEED`. This freeze does not authorize Codex or production mutation.

Any change to a required field, canonical owner, decision semantics, identity/freshness semantics, adapter monotonicity, authority freshness, AGENTS lifecycle semantics, claim partial order, or failure-routing meaning invalidates this freeze and returns to Planner/Critic. Implementations may add optional diagnostic/display fields only if they do not change any decision.

## 1. Owner boundary

| Surface | Authority owner | Execution actor | Public interface responsibility |
|---|---|---|---|
| Gate semantics | project/domain professional owner | owner-approved maintainer/Executor | defines capability, evidence, judgment, invalidation |
| Required Gate resolution | `workflow-core` | Resolver | discovers descriptors, classifies impact, selects Gate instances/scope, aggregates claims |
| Project mapping | project owner | Executor | adapter, targets, impact rules, claim ceiling, normal-entry locators |
| Runtime identity/freshness | Bridge | Bridge runtime | task/repo/worktree/session/candidate/target/result identity and Stop/recovery |
| Validator implementation | Gate professional owner owns standard | Executor | implements frozen mechanical validator; cannot change standard |
| Task state/budget/wait | existing Lite/Reviewed/Control/project controller | existing controller | no second DA task state |
| Central distribution | AI Skills Maintainer | maintainer | formal release, Update impact, managed adaptation |
| AGENTS semantics | project owner | Executor via PIE 0.3 | durable project instruction projection; Bridge verifies loaded identity |
| Human authorization | user | existing controller requests | only secrets/auth/physical/high-impact/new product-science/final subjective acceptance |

## 2. Gate Descriptor

Canonical wire object: `GateDescriptor`.

Required fields:

```text
schema_version = "da/1"
gate_ref
definition_version
authority_ref
authority_contract_ref
definition_digest

capability
failure_semantics

applicability
subject_types[]
target_roles[]
claim_support[]

normal_entry:
  kind
  root_ref
  entry_ref
  argv_schema | typed_parameters

evidence_requirements:
  modality[]
  fidelity[]
  observer_requirement[]
  required_observations[]
  completeness_rule

judgment:
  PASS conditions
  FAIL conditions
  UNKNOWN conditions
  rubric_ref
  threshold_parameter_constraints

regression_bank_refs[]
known_bad_refs[]
should_not_change_refs[]

invalidation:
  subject_dependencies[]
  target_dependencies[]
  runner_dependencies[]
  fixture_dependencies[]
  rubric_dependencies[]
  environment_dependencies[]
  time_validity

execution_requirements:
  permissions[]
  cost_resource_ceiling
  secret_classes[]
  physical_target
  long_run
  side_effects[]

calibration_requirement
```

### 2.1 Gate identity

`gate_ref` is stable and has one of these forms:

```text
domain:<plugin>/<capability>
project:<repo-id>/<capability>
```

A frozen Gate definition identity is:

```text
gate_ref
+ definition_version
+ definition_digest
```

`definition_digest` is SHA-256 over the normalized semantic projection. Comments, display formatting, generated evidence links, and the digest field itself are excluded. Frozen authority references must bind immutable commit/blob/digest identities; a movable `main` ref is not sufficient as the frozen standard.

### 2.2 New-Gate decision

Compare exactly six semantic dimensions:

```text
capability
evidence requirements
normal-entry semantics
professional owner
failure semantics
claim scope
```

If an existing family can express all six, `NEW_GATE=NO`; only regression, validator hardening, or evidence additions are allowed.

If at least one dimension is materially distinct and cannot be represented by an existing family, the corresponding project/domain professional owner freezes the new standard before Executor implementation. `workflow-core` may report `STANDARD_GAP`; it cannot invent the standard.

## 3. Project Adapter

Canonical project paths:

```text
automation/delivery_assurance/ADAPTER.toml
automation/delivery_assurance/gates.toml
```

Required adapter fields:

```text
schema_version = "da/1"
repo_identity
authority_ref
adapter_semantic_digest

canonical_authority_set[]
agents_authority_set[]

normal_entry_refs[]
capability_refs[]
targets[]
edges[]
impact_rules[]
parameter_bindings[]
source_set_rules[]
environment_profiles[]
claim_ceilings[]
long_run_owner_refs[]
human_only_boundaries[]
```

### 3.1 Canonical authority item

```text
field_or_scope
authority_ref
canonical_locator
branch_or_release_scope
content_digest
supersedes[]
effective_from
```

Missing, moved, conflicting, or semantically changed authorities must produce one of:

```text
ADAPTER_STALE
STATUS_AUTHORITY_CONFLICT
INSTRUCTION_AUTHORITY_CONFLICT
```

and affected claims become `UNKNOWN`.

Mechanical locator movement with unchanged semantics is repaired in the same task by Executor/Maintainer. Semantic conflict returns to the project/domain owner.

### 3.2 AGENTS authority item

```text
scope_root
agents_path | ABSENT
canonical_contract_refs[]
authority_ref
branch_or_release_scope
content_digest
supersedes[]
effective_from
```

`agents_authority_set_digest` is part of `adapter_semantic_digest`.

Project owner owns durable semantics; `workflow-core` decides whether the current task triggers AGENTS maintenance; Executor invokes PIE 0.3 to edit; Bridge validates the actually loaded AGENTS/mandatory-source identity.

### 3.3 Adapter monotonicity

Effective obligations are the union:

```text
domain_minimums
∪ project_canonical_contract
∪ frozen_goal
∪ actual_change_impact
∪ should_not_change
```

The adapter may add obligations, bind project parameters, map generic capabilities to project entries, and bind concrete targets. It may not delete or downgrade domain minimums, convert required Gates to optional, substitute lower-fidelity evidence, delete sibling targets, convert unknown impact to `NONE`, or preserve stale evidence by locator movement.

Unmapped acceptance-relevant change is `UNKNOWN_IMPACT`; it expands to the relevant dependency closure and requires adapter repair. It never silently becomes `NONE`.

## 4. Delivery Target Graph

Canonical object: `TargetGraph`.

Each target node contains:

```text
target_id
repo_identity
target_type
identity
environment
claim_ceiling
authority_ref
```

Required target types include, when applicable:

```text
SOURCE
BUILD
PACKAGE
INSTALLED_INSTANCE
DEPLOYED_RUNTIME
DATASET
CHECKPOINT
PREDICTION
GROUND_TRUTH
REPORT
DOCUMENT
OTHER_TYPED_TARGET
```

Each edge contains:

```text
from_target
relation
to_target
```

Allowed relation semantics include:

```text
BUILDS
PACKAGES
INSTALLS
DEPLOYS
CONSUMES
PRODUCES
VALIDATES
DOCUMENTS
DERIVES_FROM
```

A PASS on one node or edge cannot satisfy another node or edge unless the frozen Gate explicitly covers that subject/target set.

## 5. Impact Classification and Resolver

Required Resolver inputs:

```text
frozen Goal / claim
TargetGraph
adapter impact_rules
actual diff from approved baseline to candidate
dependency closure
available domain/project Gate descriptors
existing valid Gate results
authority and AGENTS freshness
environment / permission / cost / long-run facts
```

Impact predicates are three-valued:

```text
TRUE
FALSE
UNKNOWN
```

`UNKNOWN` cannot be treated as `FALSE`.

### 5.1 Scope decision

```text
NONE
TARGETED
BROAD
FULL
```

- `NONE`: no acceptance-relevant change, no claim elevation, all reused evidence still valid, and impact is fully known.
- `TARGETED`: the affected target/dependency closure is stably isolated; no shared runtime/schema/router/generator/adapter/Gate-definition change; no sibling consumed target is affected.
- `BROAD`: shared dependency or validator/adapter definition changed; multiple sibling targets share the changed dependency; or a local Gate cannot cover the blast radius.
- `FULL`: first adoption; whole-product release/installed/live claim; cross-repo aggregate completion; multiple artifact families cannot be safely separated; historical evidence proves targeted/broad coverage misses the same whole-product claim; or project-level applicability is unknown because schema/adapter authority drift prevents reliable scoping.

`FULL` means complete obligation coverage, not unconditional rerun of every test, device, or machine. Valid uninvalidated evidence may be reused.

Gate count, changed-line count, task duration, or generic “complexity” are not scope triggers.

### 5.2 Missing-capability routing

Required routing states:

```text
AVAILABLE_RUNNABLE
STANDARD_FROZEN_IMPLEMENTATION_MISSING
NEW_PROJECT_ACCEPTANCE_CATEGORY
REUSABLE_DOMAIN_CAPABILITY_MISSING
TEMPORARILY_UNRUNNABLE
HUMAN_ONLY
```

A frozen, mechanically expressible standard with missing/broken validator is implemented/repaired by Executor in the same task. A missing professional standard returns to the owning project/domain authority. Temporary environment unavailability blocks only claims that require that evidence. HUMAN_ONLY is not a substitute for professional PASS.

## 6. Task-local materialization

DA materials are subordinate evidence attached to the existing task packet; they are not a new task state.

Preferred relative layout:

```text
delivery_assurance/
  resolution.json
  targets.json
  claim.json
  runs/<run_id>/<gate_instance_key>.json
```

If the existing packet cannot contain this subtree, its existing `evidence_refs` point to:

```text
results/<task-id>/delivery_assurance/
```

No second `CURRENT`, task root, review state machine, or global result registry may be created.

`run_id` is a random UUID.

`gate_instance_key` is the normalized digest of:

```text
gate_ref
definition_digest
subject_set_digest
target_set_digest
normal_entry_digest
```

Parallel devices, languages, browsers, processes, or environments produce distinct instances and never overwrite one `gates/<gate-id>.json`.

Results are written to a temporary file, fully schema-validated, then atomically committed. A crash fragment never enters `evidence_refs`. The authoritative “current result” is whatever the existing task packet explicitly references; consumers must not scan directories for the newest green result.

Historical case IDs are evidence locators only and never enter runtime Resolver selection branches.

## 7. Gate Result Envelope

Canonical wire object: `GateResult`.

Required fields:

```text
schema_version = "da/1"

task_identity
workflow_identity
run_id
gate_instance_key
gate_ref
authority_ref
definition_version
definition_digest
adapter_semantic_digest

candidate_identity
source_set_identity
subject_identities[]
target_identities[]

normal_entry_identity
runner_identity
fixture_identity
rubric_identity

observed_at
environment_identity

decision
reason_codes[]
obligations_covered[]
obligations_missing[]

evidence_refs[]
invalidation_fingerprint

actor_provenance
observer_provenance

scope
cost
elapsed_time

claim_support[]
```

`decision` is exactly:

```text
PASS
FAIL
UNKNOWN
```

### 7.1 Evidence semantics

Evidence is described on three independent axes.

Modality:

```text
SOURCE_INSPECTION
STRUCTURED_RUNTIME
ACTUAL_SURFACE
INTERACTION_TRACE
RENDERED_ARTIFACT
CAUSAL_INTERVENTION
PROTECTED_OBSERVATION
```

Fidelity:

```text
SYNTHETIC_FIXTURE
CONTROLLED_REAL_RUNTIME
HOST_DERIVED
ACTUAL_INSTALLED_TARGET
ACTUAL_DEPLOYED_TARGET
PHYSICAL_DEVICE
SCIENTIFIC_POPULATION
```

Observer provenance:

```text
PRODUCER_SELF_QA
INDEPENDENT_REVIEW
PROTECTED_OBSERVATION
```

These are not one linear quality scale. A real native application against a fake backend does not prove a real backend round-trip. A screenshot does not prove interaction causality. Slurm terminal accounting does not prove a scientific conclusion.

### 7.2 Decision meaning

- `PASS`: every positive/protective obligation for this exact Gate instance and every required evidence axis is satisfied.
- `FAIL`: at least one valid observation establishes a violated obligation.
- `UNKNOWN`: required evidence is missing, identity is wrong/stale, authority/standard conflicts, measurement is invalid, or the required environment is unavailable.

A valid product defect is not diluted to UNKNOWN merely because some other observation is missing; both reason classes are recorded.

A result envelope never reduces to a global green flag.

## 8. Invalidation and evidence reuse

Judgment and raw evidence have separate reuse decisions.

Relevant changes include:

```text
candidate/source identity
subject/target identity
Gate definition
rubric/threshold
runner/collector
fixture/known-bad bank
adapter semantic digest
authority/AGENTS digest
environment identity
observer/protected boundary
time validity
```

Rules:

- candidate/target change invalidates evidence for the affected closure;
- rubric/standard change invalidates prior judgment; raw observations may be re-judged only if their capture semantics remain valid;
- runner/collector defect may invalidate raw evidence and require recollection;
- environment change preserves only explicitly equivalent observations;
- milestone/release elevation never lets prior milestone PASS alone satisfy the new claim;
- unaffected sibling targets may reuse evidence only when identity, definition, environment, and invalidation dependencies remain unchanged.

## 9. Claim model

A claim is:

```text
(target_set, capability_set, environment, time_window, level)
```

Allowed levels:

```text
LOCAL_SOURCE
INTEGRATED
ARTIFACT_READY
INSTALLED
LIVE
```

Claims are target-specific and form a partial order, not one global boolean.

A missing higher-level observation blocks that level and dependent higher claims only. It does not turn a proven lower-level claim into FAIL.

`USER_READY` is not an evidence level. It is a workflow-core aggregation meaning: every target/capability promised by the frozen Goal has reached its required claim level and every required Gate instance is valid.

Per-consumer claim ceilings are project-owned adapter data and cannot be raised by workflow-core or Bridge. Examples frozen by v0.4 include:

- Lucerna Hook evidence cannot satisfy Windows/native acceptance.
- Mica synthetic/E2E evidence cannot satisfy real authenticated low-power-device performance.
- SeminarArc Emulator cannot satisfy microphone/camera/OEM-background claims.
- CUHK_Date staging acceptance cannot authorize real Matching.
- CARE operational completion cannot satisfy scientific route promotion.
- Bobbio historical 0.2.0 evidence cannot satisfy 0.3.0 current-milestone completion.
- Asteria mechanical geometry checks cannot alone satisfy whole-product scientific/visual acceptance.

## 10. Failure and recovery ownership

Public failure reason families map to existing owners; DA does not create a new task state machine.

```text
STANDARD_GAP
CAPABILITY_MISSING
SCHEMA_CONFLICT
IMPACT_UNKNOWN
UNKNOWN_IMPACT
UNCOVERED_OBLIGATION
ADAPTER_GAP
ADAPTER_STALE
STATUS_AUTHORITY_CONFLICT
INSTRUCTION_AUTHORITY_CONFLICT
VALIDATOR_BUG
IMPLEMENTATION_MISSING
PRODUCT_DEFECT
EVIDENCE_GAP
INVALID_OBSERVATION
ENVIRONMENT_GAP
IDENTITY_MISMATCH
STALE
CLAIM_UNPROVEN
EQUIVALENCE_UNPROVEN
ADAPTATION_PENDING
ADAPTATION_FAILED
```

Routing:

- product defect -> current Executor / project owner under existing task controller;
- validator bug with frozen standard -> current Executor;
- standard gap/conflict -> corresponding project/domain professional owner;
- identity/freshness -> Bridge;
- environment gap -> project environment owner;
- wait/long-run -> existing project controller/finalizer/Persistent Run;
- human-only -> existing human gate with one minimal action;
- claim unproven -> original controller reports only the lower supported claim or remains incomplete.

## 11. AGENTS lifecycle contract

AGENTS is a durable routing/authority projection, not a Gate database.

Trigger AGENTS maintenance when:

- first DA adoption;
- root/nested AGENTS required but absent;
- authority, normal entry, adapter, Gate family, claim owner/ceiling, or long-run owner changes;
- canonical locator moves;
- root/nested AGENTS conflicts with canonical contracts;
- a real failure proves a rule existed but normal entry did not consume it;
- duplicated/bloated/latest-request-dominated AGENTS requires bounded consolidation;
- formal `Update impact` requires consumer instruction adaptation.

Do not trigger a whole AGENTS rewrite for an ordinary isolated bug, one regression fixture, or receipt-only update.

PIE 0.3 repo-AGENTS mode consumes exact current root/nested AGENTS or explicit ABSENT state, adapter, canonical authority set, frozen Goal delta, relevant accepted/deleted/rejected history, budget/headroom, and Bridge mandatory-source locators.

PIE 0.3 outputs:

```text
AGENTS_CHANGE_PREVIEW.md
complete clean AGENTS candidate
AGENTS_AUTHORITY_MAP.md
AGENTS_COVERAGE_REPORT.md
path/authority digests
```

PIE 0.3 cannot decide product/scientific standards, cannot weaken domain/safety minimums, and cannot create a central AGENTS registry/database/watcher.

## 12. Handoff matrix

Each production capability has one authority owner:

| Capability | Authority owner | Execution actor | Failure owner / next owner |
|---|---|---|---|
| Goal / claim freeze | current task Planner; Lite uses project owner | Executor materializes | user only for non-derivable goal/science change |
| Target graph | project owner | Executor | project owner |
| Descriptor discovery | workflow-core | Resolver | missing capability professional owner |
| Impact classification | project owner | Executor + Resolver | project owner for unknown business semantics |
| Required Gate resolution | workflow-core | Resolver | uncovered obligation professional owner |
| New-Gate decision | corresponding project/domain professional owner | Executor supplies six-dimension comparison | same professional owner |
| Gate standard freeze | Gate professional owner | owner-approved role | same professional owner |
| Validator implementation | Gate professional owner owns standard | Executor | Executor for implementation bug |
| Gate execution | Gate professional owner owns meaning | Executor / protected runner | product/environment owner by cause |
| Domain/project judgment | Gate professional owner | approved validator/domain role | same professional owner |
| Result materialization | workflow-core | Executor/runner | Executor |
| Bridge consumption | Bridge | existing Bridge entry | Bridge maintainer |
| Repair routing | original controller | workflow-core + Executor | cause-specific owner |
| Claim aggregation | workflow-core | aggregation module | original controller |
| Adapter bootstrap/update | project owner | Executor | project owner for unknown semantics |
| AGENTS projection | project owner | Executor via PIE 0.3 | project owner for semantic conflict |
| Domain promotion | domain professional owner | AI Skills Maintainer | domain owner |
| Central release/adaptation | AI Skills Maintainer | maintainer | each consumer project owner |
| Long-run / Slurm | existing project execution controller | existing scheduler/finalizer | project controller |
| HUMAN_ONLY | user | original controller asks | user |
| Environment gap | project environment owner | Executor | environment owner |
| Final completion | original controller | Executor supplies claims/evidence | original controller |

## 13. Consumer adaptation invariants

Every consumer adapter must freeze:

```text
exact repo/ref
consumed-target graph
normal development/acceptance/release entries
operational/professional/environment/human owners
reused validators/controllers/reviews
DA-only responsibility
positive completion chain
highest-risk negative chain
same-task recovery
HUMAN_ONLY boundary
claim ceiling
adapter owner/maintenance complexity
authority and omission mutations
consumer Gate instances
```

Every consumer must prove from its normal entry that deleting a required Gate mapping, sibling target, current authority locator, nested AGENTS scope, or mandatory force; reusing an old milestone PASS; or creating an authority conflict prevents `USER_READY`.

## 14. Version and compatibility

- Unknown `da/` major version: reject consumption and limit claim.
- Unknown optional field under compatible `da/1`: preserve/ignore for decision if it is explicitly non-semantic.
- Missing required field: no PASS.
- Bridge consumes only its identity/freshness subset and never re-scores professional quality.
- workflow-core owns schema validation and required-Gate semantics.
- Project/domain owners own professional semantics.
- No implementation may fork the required `da/1` fields by lane.

## 15. Freeze invariants

The following are architecture invariants:

1. no central Gate registry/database/daemon/watcher;
2. no fourth Bridge workflow or second writable DONE/CURRENT;
3. no Bridge professional scorer;
4. no workflow-core invention of product/science standards;
5. project adapter obligations are monotone;
6. unknown acceptance-relevant impact never resolves to `NONE`;
7. one Gate instance binds exact definition, subject set, target set, normal entry, candidate/source set, environment, and observer provenance;
8. mechanical PASS cannot substitute for required actual-surface/scientific/protected observation;
9. old milestone evidence cannot silently satisfy a new milestone;
10. user is not the first ordinary QA reviewer;
11. long-run scheduling remains with existing project controller/Slurm/Persistent Run;
12. human action is a checkpoint, not an automatic Gate PASS;
13. lower claims survive unrelated higher-level evidence gaps;
14. all consumer normal-entry results remain bound to the same consumer final candidate for the claim they support;
15. changing this section, any required field, owner, or decision semantics requires Planner/Critic review.

## 16. Implementation-lane dependency

After this freeze:

```text
workflow-core resolver/delivery-admission lane
|| Bridge runtime/identity/Stop lane
|| PIE 0.3 design/implementation lane
|| domain descriptor lanes
```

may prepare independently against the same immutable `da/1` locator.

The first full vertical consumer is Asteria. The only pre-frozen fallback is the SeminarArc Emulator chain if an approved implementation preflight proves the fixed Asteria public environment unavailable in the approved window.

Bobbio adapter implementation remains blocked on `bobbio--status-authority-recovery`.

No lane may change this public interface or sign another lane's completion.

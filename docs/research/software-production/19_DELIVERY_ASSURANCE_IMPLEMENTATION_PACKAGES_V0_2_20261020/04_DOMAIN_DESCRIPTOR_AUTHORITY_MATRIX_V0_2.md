# Delivery Assurance Package 04 v0.2 — Domain Descriptor Authority Matrix

Status: **FOUR INDEPENDENT DOMAIN PACKAGES PREPARED FOR EXECUTION-READY REVIEW**  
Date: 2026-10-20  
Coordination task key: `domain-descriptors--delivery-assurance-da1`  
Target repository: `YuukiAS/AI_Skills_Collection`  
Source ref inspected: `main@272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3`

## 1. Critic findings and disposition

| Finding | Disposition | Closure |
|---|---|---|
| `DA-ER-04-F01 — DESCRIPTORS_TARGET_GENERATED_PAYLOAD_WITHOUT_CANONICAL_SOURCE` | ACCEPT | Each plugin now has an exact canonical source-skill descriptor path, Marketplace `shared` copy rule, generated destination and parity Gate. Direct generated edits are forbidden. |
| `DA-ER-04-F02 — PROFESSIONAL_DESCRIPTOR_SEMANTICS_NOT_FROZEN` | ACCEPT | This matrix freezes every descriptor's existing authority source, owner, scope, entry, evidence axes, PASS/FAIL/UNKNOWN, claim support and invalidation. No project-specific threshold is promoted centrally. |
| `DA-ER-04-F03 — FOUR_PLUGIN_RELEASE_AND_FINAL_CANDIDATE_BOUNDARY_UNRESOLVED` | ACCEPT | Package 04 is split into four independent completion objects `04A`–`04D`, each with its own version, branch, candidate, Gate Matrix and release metadata. One cannot sign another. |

The coordination index itself is not an executable quality object.

## 2. Common production-path rule

For each plugin, the descriptor source is stored under the professional source Skill that owns the standard:

```text
<canonical source skill>/delivery-assurance/gates.toml
```

`scripts/codex_marketplace_config.json` adds a plugin-level `shared` item:

```json
{
  "source": "<canonical source skill>/delivery-assurance",
  "target": "delivery-assurance"
}
```

The existing `copy_configured_shared()` generator copies that directory into:

```text
plugins/codex/plugins/<plugin>/delivery-assurance/gates.toml
```

No generator-code change is expected. If a real probe proves the current `shared` copy/validation path insufficient, the package may amend only:

```text
scripts/codex_marketplace_config.json
scripts/build_codex_marketplace.py::{config_copy_items, copy_configured_shared, validate_layer, path_report}
```

and must preserve all other plugins, idempotence and Windows path budgets.

Generated payload is never canonical source. Descriptor presence proves discovery only; professional PASS still requires the descriptor's normal entry on the exact target.

## 3. Descriptor authority matrix — web-development

Canonical authority:

```text
plugin = web-development
source skill = skills/tools/frontend/frontend-visual-systems
source ref = 272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3
source blob = 1f23cc1f4add4e406a43e6f93ca760ff2a41732e
professional owner = Frontend Design / frontend-visual-systems coordinator
normal entry = installed web-development -> frontend-visual-systems coordinator and its selected delegates
```

| gate_ref | Capability / distinct failure semantics | Applicability | Subjects / targets | Evidence requirement | PASS / FAIL / UNKNOWN | Claim support / invalidation |
|---|---|---|---|---|---|---|
| `domain:web-development/design-authority-state-coverage` | Material production states have an authority; failure means code invents or omits a shippable state without a valid target | UI/native-WebView/mobile surface with a current Figma/design brief/production grammar or a new material state | design authority, source state model -> rendered product states | source/design inspection; controlled or actual surface; producer observer, independent observer when whole-product/high-assurance | PASS: all shipping states/transitions have authority or intentional deviation; FAIL: material state missing/invented; UNKNOWN: authority/current state coverage unavailable or conflicting | `INTEGRATED`, `ARTIFACT_READY`; invalidated by authority/state/locale/breakpoint changes |
| `domain:web-development/design-system-coherence` | Shared tokens/component/icon/motion/locale grammar is coherent; failure is visible family drift or raw identifiers | bounded or broader product-interface change affecting shared visual grammar | source tokens/components -> actual rendered surfaces | actual/rendered surface, source/token inspection; producer self-QA; independent for redesign/release | PASS: affected surfaces and should-not-change siblings use coherent grammar; FAIL: inconsistent family/token/locale/motion; UNKNOWN: target surface or authority missing | `ARTIFACT_READY`, `INSTALLED`, `LIVE` as target permits; invalidated by token/component/locale/shared-runtime change |
| `domain:web-development/actual-surface-convergence` | Exact real target surface converges and interactions reach the expected postcondition; failure means screenshot/snippet or wrong surface substitutes for actual behavior | user-visible browser, native-WebView, desktop or mobile UI claim | exact build/installed/deployed UI + states + interactions | actual installed/deployed target; actual surface + interaction trace; producer QA; independent observer when required | PASS: exact target shows correct state/hierarchy and required actions reach postconditions; FAIL: visible/interaction/state defect; UNKNOWN: only screenshot/snippet, wrong target, missing native/real environment | `ARTIFACT_READY` through `LIVE`; invalidated by candidate/target/runtime/state/copy/layout/interaction changes |
| `domain:web-development/producer-admission-reachability` | Producer has removed obvious P1/P2 and verified safe reachable controls before external/user handoff; failure means user/reviewer is first ordinary QA | final UI handoff, release, substantive redesign or required independent review | exact candidate, reachable control/state, review package | actual surface + interaction trace; producer observer; required independent review remains separate | PASS: producer-bound P1/P2=0 and requested safe controls are reachable; FAIL: obvious producer-visible defect/unreachable action; UNKNOWN: exact candidate or required interaction unavailable | admission to independent/user review, not independent PASS; invalidated by acceptance-relevant source/artifact/state change |

Regression/known-bad/should-not-change refs are populated from current source tests and project-specific banks during implementation; central descriptors cannot copy Asteria/Lucerna project IDs or thresholds.

## 4. Descriptor authority matrix — scientific-visualization

Canonical authority:

```text
plugin = scientific-visualization
source skill = skills/science/communication/scientific-figure-qa
source ref = 272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3
source blob = 540b657c1e06086b36ebf1e04588f111091ab857
professional owner = Scientific Figure QA
normal entry = installed scientific-visualization -> scientific-figure-qa
```

| gate_ref | Capability / distinct failure semantics | Applicability | Subjects / targets | Evidence requirement | PASS / FAIL / UNKNOWN | Claim support / invalidation |
|---|---|---|---|---|---|---|
| `domain:scientific-visualization/figure-accessibility-readability` | Figure remains legible and distinguishable at final size, grayscale and relevant color-vision conditions | manuscript/conference/poster/rebuttal/camera-ready figure | rendered/exported figure panels | rendered artifact at intended size; accessibility/grayscale/contrast checks; professional observer | PASS: fonts, labels, encodings, contrast, panel/legend layout readable; FAIL: unreadable/indistinguishable/ambiguous; UNKNOWN: final render/size/venue constraints absent | `ARTIFACT_READY`; invalidated by render/layout/font/palette/size change |
| `domain:scientific-visualization/statistical-visual-integrity` | Visual encoding accurately represents uncertainty, significance, color scales and meaningful midpoints | scientific plot containing estimates, uncertainty, significance, heatmaps/colorbars | data-to-visual encoding and final figure | source/data mapping inspection + rendered artifact; professional observer | PASS: required uncertainty/labels/midpoint semantics represented; FAIL: misleading/omitted/inappropriate encoding; UNKNOWN: data/estimand mapping unavailable | `ARTIFACT_READY`; invalidated by data, estimand, plotting code, scale or annotation change |
| `domain:scientific-visualization/export-readiness` | Exact file meets vector/raster/background/format constraints | final publication/export claim | final PDF/SVG/EPS/PNG/TIFF etc. | exact exported artifact + format/dpi/transparency/venue checks | PASS: required format and resolution constraints satisfied; FAIL: wrong format/dpi/background or broken export; UNKNOWN: venue/final target missing | `ARTIFACT_READY`; invalidated by export/render/config change |
| `domain:scientific-visualization/palette-provenance` | Palette status/provenance is represented truthfully and experimental candidates are not promoted without review | palette-derived figure claim | palette metadata and rendered figure | canonical metadata/CLI evidence + render; professional observer where promotion requested | PASS: provenance/status and application are correct; FAIL: invented/promoted provenance or unsafe encoding; UNKNOWN: palette origin/status cannot be established | figure readiness support only; invalidated by palette metadata/status/application change |

These descriptors do **not** own Asteria's graph truth, interactive DOM geometry, deployed product state or whole-product frontend quality. Those remain project/Web-development obligations.

## 5. Descriptor authority matrix — statistical-modeling

Canonical authority:

```text
plugin = statistical-modeling
source skill = skills/domains/bayesian/statistical-analysis
source ref = 272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3
source blob = e7664dbe4ae97a5299eafd7de8caa105a77f7aae
professional owner = Statistical Analysis
normal entry = installed statistical-modeling -> bayesian-modeling aggregate -> statistical-analysis
```

| gate_ref | Capability / distinct failure semantics | Applicability | Subjects / targets | Evidence requirement | PASS / FAIL / UNKNOWN | Claim support / invalidation |
|---|---|---|---|---|---|---|
| `domain:statistical-modeling/estimand-design-data-integrity` | Estimand, outcome, predictors/groups, unit/dependency structure and data quality align; failure is analysis answering a different or invalid question | statistical analysis/model/inference task | frozen question, data/split, analysis specification | source/data-design inspection; structured analysis materials; professional observer | PASS: estimand/design/data/missingness/scale are explicit and coherent; FAIL: wrong unit/leakage/mismatched estimand or unhandled data defect; UNKNOWN: data/design authority missing | `INTEGRATED`, analysis `ARTIFACT_READY`; invalidated by question/data/split/design change |
| `domain:statistical-modeling/assumptions-diagnostics-sensitivity` | Required assumptions, model diagnostics and robust/sensitivity alternatives are evaluated | regression/Bayesian/survival/test/simulation where assumptions matter | model fit, diagnostics, sensitivity outputs | structured runtime/results + rendered diagnostics where applicable; professional observer | PASS: applicable checks and alternatives completed; FAIL: material violation ignored or diagnostic failure contradicts claim; UNKNOWN: intended fit/diagnostic evidence absent | analysis `ARTIFACT_READY`; invalidated by model/prior/fit/data/diagnostic change |
| `domain:statistical-modeling/effect-uncertainty-claim-strength` | Effect sizes, uncertainty and exploratory/confirmatory/practical significance match evidence | reported statistical conclusion | estimates/intervals/tests/report claims | structured results + report; professional observer | PASS: claim strength and uncertainty are calibrated; FAIL: overclaim/multiplicity/interval/effect omission changes conclusion; UNKNOWN: required estimate/uncertainty unavailable | report/analysis `ARTIFACT_READY`; invalidated by result, multiplicity, claim or report change |
| `domain:statistical-modeling/intended-scale-completion` | Smoke/toy/import is not promoted to intended-scale analysis | simulation/inference/theorem-heavy or scale-bound analysis | run scale, data population, code/result artifacts | structured runtime + intended-scale evidence; professional observer | PASS: intended scale or precisely bounded residual risk; FAIL: toy/smoke promoted as completion; UNKNOWN: target scale/authorized run unavailable | `INTEGRATED`/`ARTIFACT_READY`; invalidated by scale/population/run/config change |

These descriptors do not own Slurm lifecycle, checkpoint identity, CARE route promotion, project-specific adequacy thresholds or external submission.

## 6. Descriptor authority matrix — medical-imaging

Canonical authority:

```text
plugin = medical-imaging
source skill = skills/domains/medical-imaging/medical-imaging-deep-learning
source ref = 272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3
source blob = 993a8f437cf530b9d0661373964274544b0d71ed
professional owner = Medical Imaging Deep Learning
normal entry = installed medical-imaging -> medical-imaging-workflows -> medical-imaging-deep-learning
```

| gate_ref | Capability / distinct failure semantics | Applicability | Subjects / targets | Evidence requirement | PASS / FAIL / UNKNOWN | Claim support / invalidation |
|---|---|---|---|---|---|---|
| `domain:medical-imaging/model-change-evidence-completeness` | Model change has mechanism, checkpoint, prediction, metric, command/log and same-split baseline evidence; failure is smoke/proxy promoted to model completion | medical-imaging model change | code/config/checkpoint/prediction/metric/baseline | structured runtime + artifact identities + professional observer | PASS: requested mechanism and complete evidence on target split; FAIL: forbidden shallow substitution/proxy; UNKNOWN: run/artifact/split evidence missing | `INTEGRATED`, `ARTIFACT_READY`; invalidated by code/config/split/checkpoint/evaluator change |
| `domain:medical-imaging/split-leakage-baseline-integrity` | patient-level/leakage-safe split and defensible strong baseline support the comparison | segmentation/model comparison/generalization claim | dataset/split/preprocessing/baseline/result | source/data split + results; professional observer | PASS: leakage-safe split and required baseline/evaluator; FAIL: slice/patient leakage or weak mismatched baseline; UNKNOWN: split/baseline identity absent | scientific artifact claim; invalidated by data/split/preprocessing/baseline change |
| `domain:medical-imaging/registration-warping-integrity` | Registration claim states transform, moving/fixed space, interpolation, plausibility and downstream checks | registration/template/warping task | transforms, moving/fixed images, overlays/metrics/downstream result | structured runtime + rendered overlays/metrics; professional observer | PASS: transform and plausibility/downstream evidence complete; FAIL: translation/resampling/copying promoted to registration or implausible warp ignored; UNKNOWN: required correspondence/plausibility evidence missing | `ARTIFACT_READY`; invalidated by transform/data/preprocessing/metric change |
| `domain:medical-imaging/temporal-method-integrity` | Non-reference frames and temporal mechanism materially support the target task | cine/video/4D/longitudinal/time-series method | frames, temporal model/warp/aggregation, target head, metrics | structured model/run evidence + comparisons; professional observer | PASS: temporal mechanism and single-frame/reference baseline comparison; FAIL: frame0/reference-only proxy promoted as temporal method; UNKNOWN: temporal use/target evidence missing | `ARTIFACT_READY`; invalidated by frame policy/model/data/baseline change |
| `domain:medical-imaging/missing-modality-integrity` | Availability masks/routing/imputation/dropout/loss masks and subgroup metrics handle missing modalities truthfully | multimodal model with missing modalities | modality availability, masks/routing, subgroup metrics | structured data/model/results; professional observer | PASS: target-aware handling and subgroup evidence; FAIL: missing target modality treated as default negative or claim hides subgroup failure; UNKNOWN: availability/target dependence unavailable | `ARTIFACT_READY`; invalidated by modality/split/target/loss/result change |
| `domain:medical-imaging/external-method-integration` | External method moves from search/import/smoke to same-evaluator validation before being called integrated | external code/method adapter | version/license/dependency, adapter, one-case, validation result | source/version + structured runtime + same evaluator; professional observer | PASS: stage 5+ validation and rollback/cleanup; FAIL: clone/import/shape smoke called integration; UNKNOWN: same-evaluator result absent | `INTEGRATED`/`ARTIFACT_READY`; invalidated by external version/adapter/evaluator/data change |

These descriptors do not own CARE Slurm/controller state, resource budgets, project route thresholds or final scientific promotion. Those remain CARE/project obligations.

## 7. Regression and invalidation rules common to 04A–04D

Each implementation package must:

1. bind `regression_bank_refs`, `known_bad_refs` and `should_not_change_refs` only to existing canonical domain tests/examples or new domain-owned fixtures frozen by that package;
2. include at least one valid positive, one real/representative bad implementation and one missing-critical-observation case per descriptor family;
3. preserve raw evidence versus professional judgment invalidation separation;
4. invalidate on source definition, runner/collector, fixture/rubric, target, environment or observer changes declared by the descriptor;
5. never copy consumer project IDs, paths, thresholds or historical case IDs into central runtime selection.

## 8. Four independent package boundaries

| Package | Plugin | Current -> target | Planned branch | Completion independence |
|---|---|---|---|---|
| `04A` | web-development | `0.4 -> 0.5` | `reviewed/web-development--delivery-assurance-descriptors` | independent final candidate/review/release metadata |
| `04B` | scientific-visualization | `0.1 -> 0.2` | `reviewed/scientific-visualization--delivery-assurance-descriptors` | independent final candidate/review/release metadata |
| `04C` | statistical-modeling | `0.1 -> 0.2` | `reviewed/statistical-modeling--delivery-assurance-descriptors` | independent final candidate/review/release metadata |
| `04D` | medical-imaging | `0.1 -> 0.2` | `reviewed/medical-imaging--delivery-assurance-descriptors` | independent final candidate/review/release metadata |

Each package updates its own canonical descriptor source, plugin config version/shared copy entry, plugin changelog, README row/capability text, root `CHANGELOG.md -> Unreleased`, generated payload and relevant tests. Repository `VERSION` and formal `release` ref remain Package 13 responsibilities.

README edits require actual installed Clear Writing invocation; source reads are not invocation.

No subpackage PASS closes another subpackage or proves professional results merely because the descriptor is discoverable.

## 9. Current state

```text
DA-ER-04-F01=CLOSED_BY_V0_2_STRUCTURE
DA-ER-04-F02=CLOSED_BY_AUTHORITY_MATRIX
DA-ER-04-F03=CLOSED_BY_04A_04D_SPLIT
COORDINATION_INDEX_EXECUTABLE=NO
04A_STATUS=READY_FOR_EXECUTION_READY_REVIEW
04B_STATUS=READY_FOR_EXECUTION_READY_REVIEW
04C_STATUS=READY_FOR_EXECUTION_READY_REVIEW
04D_STATUS=READY_FOR_EXECUTION_READY_REVIEW
READY_FOR_CODEX=NO
```

# Delivery Assurance 用户价值实施包 delta v0.1

状态：**PLANNER PACKAGE REVISION INPUT / 独立设计 Critic 待审 / 未授权实施**  
日期：2026-10-22

## 0. 用途

本文件不替代 Package 01、02 或 consumer execution package。它冻结 v0.5 `PROCEED` 后各包必须机械吸收的新增合同，防止后续 Codex把用户价值问题留成“实现时再判断”。

## 1. Package 01 v0.3 — workflow-core Resolver / Delivery Admission

### 1.1 状态变化

```text
01 v0.2 = WITHDRAWN_FROM_EXECUTION_READY_REVIEW
next version = 01 v0.3
next stage after v0.5 PROCEED = PACKAGE REVISION, then independent execution-ready Critic
```

v0.2 已通过的 canonical source、generated parity、version/release、claim aggregation、missing routing 和 W1–W5 方向继续保留。

### 1.2 新增生产职责

Package 01 v0.3 必须冻结并实现：

1. **Adoption detection**
   - 读取 exact adapter identity、AGENTS authority、normal-entry declaration和 installed/enabled descriptor set；
   - 区分 `NOT_ADOPTED`、`ADOPTED_READY`、`ADOPTED_BROKEN/UNKNOWN`；
   - `ADOPTED_BROKEN` 不能 fallback legacy completion。

2. **Supported-entry admission**
   - Canonical Goal、Lite、Review、Control、consumer controller各自都有 mandatory resolver/admission contract；
   - Resolver不可只靠 Skill implicit matching；
   - normal-entry replay必须用一句自然功能请求，不写 `$workflow-core`、不手工列 Gate。

3. **No silent skip**
   - missing adapter/plugin/descriptor/result/Hook trust returns typed unavailable/unknown；
   - only a successfully resolved known no-impact task may produce `NONE`；
   - empty result、helper未调用、source tree存在不能代签。

4. **Coverage witness**
   - changed-surface、promised-capability、consumed-target三重闭包；
   - every changed acceptance-relevant source set maps to target/edge/impact/Gate；
   - orphan/unmapped/deleted/renamed surfaces produce `UNKNOWN_IMPACT`/`UNCOVERED_OBLIGATION`；
   - missing project mapping is repaired in same task when semantic-preserving。

5. **Phased Gate plan**
   - `ADMISSION`、`FIRST_VERTICAL_SLICE`、`INTEGRATION_CHECKPOINT`、`FINAL_CANDIDATE`；
   - timing is task-local execution planning, not a new public da/1 state；
   - early stage runs cheap affected Gate/known-bad，not full final review。

6. **Workflow selection matched to repair capacity**
   - Lite only when one Codex event + one Stop continuation is proportionate；
   - expected independent review/one repair routes Review；
   - high false-PASS risk/independent oracle routes Control；
   - existing project controller remains owner for long-run/domain flows；
   - user does not select workflow。

7. **Pilot/result consumption**
   - Package 13 cannot release the user-value claim until the Pilot Gate passes；
   - Package 01 reports central implementation complete separately from user-value proven。

### 1.3 Canonical source delta

In addition to v0.2 surfaces, v0.3 may add bounded canonical references/tests under：

```text
skills/core/codex-system/codex-workflow-protocol/references/delivery-assurance-user-value.md
skills/core/codex-system/codex-workflow-protocol/assets/da1/  # existing schemas only; no required-field change
skills/core/codex-system/codex-workflow-protocol/scripts/da_resolver.py
tests/test_workflow_core_delivery_assurance.py
```

Do not create a second resolver or central capability registry。Generated paths remain generator-owned。

### 1.4 New Package 01 Gate delta

| Gate | Required evidence | Failure |
|---|---|---|
| `WC-UV-G1_ADOPTION_STATE` | valid/missing/stale adapter and installed capability cases | broken adoption treated as legacy/not-applicable |
| `WC-UV-G2_NATURAL_REQUEST_ADMISSION` | fresh installed plugin, natural one-line feature request, actual resolver consumption | explicit skill token/helper invocation required |
| `WC-UV-G3_NO_SILENT_SKIP` | missing plugin/adapter/result negative | `NONE` or complete from absence |
| `WC-UV-G4_COVERAGE_WITNESS` | unmapped changed path, deleted target/edge, new entrypoint, sibling target | incomplete mapping still targeted PASS |
| `WC-UV-G5_PHASED_CHECKS` | early known-bad caught before final | only final Gate detects low-grade substitute |
| `WC-UV-G6_WORKFLOW_SELECTION` | Lite/Review/Control/project-controller representative cases | user must select workflow or high-risk forced Lite |
| `WC-UV-G7_COST_SCOPE_CONTROL` | isolated small task stays targeted; shared mapping change broad/full | Gate count or task complexity drives scope |

## 2. Package 02 v0.3 — Bridge Runtime / Stop / Repair Handoff

### 2.1 状态变化

```text
02 v0.2 = WITHDRAWN_FROM_EXECUTION_READY_REVIEW
next version = 02 v0.3
base remains = formal post-reset release or approved strict successor
```

v0.2 已冻结的 identity subset、Lite/Review/Control call site、project-local trust、`auto_repair_budget=1`、Interrupt优先、single-writer和删除机制不变。

### 2.2 新增生产职责

1. **Mandatory admission call sites**
   - Lite：prelaunch bind + resolver result identity；completion claim admission；
   - Review：每个 Executor event prelaunch/post-result；
   - Control：Executor launch + Review Bundle/final completion；
   - Canonical Goal：必须有 existing task packet/Goal locator；raw no-task session不得伪装支持。

2. **Adoption mismatch fail closed**
   - repo声明已adopt但adapter/plugin/hook/result缺失时，返回 typed unproven；
   - Bridge只检查identity/freshness，不重算专业结论；
   - legacy non-adopted repo保持原行为，但不能宣称DA。

3. **Stop → original workflow handoff**
   - current turn最多一次 continuation；
   - Stop repair完成后重新读取exact result refs；
   - event结束仍失败时，Review/Control/project controller按自己的 finding/budget继续；
   - Lite不自动升级workflow；
   - Stop、Review、Control预算互不冒充但用同一failure/candidate/evidence identity去重。

4. **Safe stop**
   - second Stop、same failure/no new evidence、budget exhausted、Interrupt、authority/standard conflict必须停止；
   - lower proven claim保留；
   - final report指出唯一 blocker和owner；
   - no automatic third process/review/controller。

5. **Unsupported entry truth**
   - raw direct Codex without task packet、hooks disabled/untrusted、remote runtime missing，不能标为supported；
   - trusted Stop Hook only proves final fallback，不单独证明early admission；
   - Package 02 README不得宣传超出实际call site的“所有Codex任务自动保障”。

### 2.3 Hook delta

本轮不要求新增 daemon、watcher或user-global hook。Project-local Hook继续通过官方trust模型工作。

若v0.3决定在已有`.codex/hooks.json`中加入`SessionStart`或`UserPromptSubmit`来提供简短adoption context，必须满足：

- 只读取repo/task adapter identity，不解释专业语义；
- 不创建第二task state或隐藏task packet；
- definition/hash变化后重新trust；
- Hook不可用时正常入口明确返回unsupported/unknown；
- 该context injection必须有actual normal-entry evidence，不能用静态文件存在代签；
- direct raw Codex仍需独立package才能进入完整支持范围。

因此，是否加入这两个辅助event由Package 02 v0.3 Planner在不改变上述产品边界的前提下冻结，不能留给Executor临场选择。若要把raw no-task-packet Codex升级为正式支持入口，必须新建独立direct-entry设计包并重新Critic，不属于v0.3小修。

### 2.4 New Package 02 Gate delta

| Gate | Required evidence | Failure |
|---|---|---|
| `BR-UV-G1_ENTRY_MATRIX` | Lite/Review/Control/Canonical Goal exact call sites | one shared helper test claims all entries |
| `BR-UV-G2_ADOPTION_FAIL_CLOSED` | adopted-ready/broken/not-adopted | broken adoption falls back green |
| `BR-UV-G3_REPAIR_HANDOFF` | Stop→Review/Control/project controller fresh finding cases | duplicate loop or user asked for ordinary restart |
| `BR-UV-G4_LITE_BOUNDARY` | second Stop truthfully incomplete | automatic workflow upgrade or third continuation |
| `BR-UV-G5_INTERRUPT_AND_DEDUP` | Interrupt、duplicate、same failure/no new evidence | continuation after interrupt or repeated event |
| `BR-UV-G6_UNSUPPORTED_TRUTH` | raw/no task、untrusted/disabled Hook、missing runtime | unsupported surface reported as DA-supported |
| `BR-UV-G7_EXISTING_WORKFLOW_REGRESSION` | original Lite/Review/Control/Persistent suites | new role/state/loop or Persistent takeover |

## 3. Package 04A–04D descriptor delta

No public schema or owner change。Each execution-ready review must verify the descriptor matrix contains enough current source-owned material for：

```text
normal_entry
regression_bank_refs
known_bad_refs
should_not_change_refs
invalidation
claim_support
UNKNOWN conditions
```

A domain package does not need to add a generic `phase` field。The same descriptor can be selected for early or final execution；workflow-core owns timing，domain owner owns judgment。

If a source skill lacks a real known-bad/should-not-change contract，that descriptor stays project-local or returns to domain Planner；Executor cannot fill the blank with a new professional standard。

## 4. Consumer package delta

Every consumer implementation package must add one section：`User-value admission and coverage`，freezing：

1. supported normal entry and explicitly unsupported entry；
2. exact Goal/target/claim materialization；
3. changed-surface coverage rules；
4. promised-capability/accepted-baseline source；
5. consumed-target graph completeness；
6. first vertical slice check；
7. one historical regression family and regression-bank locator；
8. one shallow-substitution negative or justified N/A；
9. same-task repair owner and existing budget；
10. user reminder/HUMAN_ONLY/cost evidence fields。

Consumer adapter implementation remains project-owned。Central workflow-core不能替consumer猜产品/科学关系。

## 5. New Package 14 — User Value Pilot

After core implementation and first vertical consumer，prepare a separate package：

```text
task_key = delivery-assurance--user-value-pilot
owner = Delivery Assurance Planner
implementation actors = existing repo/workflow owners
final evaluation = independent Critic/Verifier under existing workflow
```

Package 14 must bind exact historical candidate/artifact locators，development cases，frozen holdouts，normal entries，authorization ceiling，metrics and final evaluation batch。It does not modify product source except through separately approved consumer repair tasks。

Package 14 cannot sign Package 01/02 implementation quality，and Package 01/02 cannot sign user value。

## 6. Package 13 formal release delta

Formal release/adaptation package adds these prerequisites：

```text
Package 01 implementation review PASS
Package 02 implementation review PASS
first vertical consumer PASS
Package 14 user-value final evaluation PASS
installed/fresh-session supported-entry PASS
Update impact + managed adaptation plan
```

If core passes but Pilot fails，tracking remains `DOING` or `ADAPTING` according to real central/consumer status；Issue #107 cannot become DONE。

## 7. Unchanged packages

```text
03 PIE 0.3 = WAITING_FOR_DESIGN_REVIEW
08 Bobbio authority recovery = separate small recovery task
Phase 1 = CLOSED / GO, not reopened
04A–04D = independent domain packages
```

No user-facing Kickoff or Codex Goal may be generated from this delta。Only after v0.5 design `PROCEED` may Planner prepare revised package documents；only package-specific execution-ready `PASS + READY_FOR_CODEX=YES` may lead to a later user Kickoff。

## 8. Current planning state

```text
PACKAGE01_NEXT=REVISION_V0_3_AFTER_DESIGN_PROCEED
PACKAGE02_NEXT=REVISION_V0_3_AFTER_DESIGN_PROCEED
PACKAGE14_NEXT=DESIGN_EXECUTION_PACKAGE_AFTER_CORE_CANDIDATE
OTHER_PACKAGE_STAGES=UNCHANGED
READY_FOR_CODEX=NO
```
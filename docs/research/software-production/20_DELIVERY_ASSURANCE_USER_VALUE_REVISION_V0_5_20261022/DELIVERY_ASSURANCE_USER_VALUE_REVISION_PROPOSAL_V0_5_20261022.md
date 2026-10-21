# Delivery Assurance 用户价值闭合返修 — Proposal v0.5

状态：**PLANNER REVISION CANDIDATE / DESIGN CRITIC REQUIRED / NOT IMPLEMENTATION AUTHORIZATION**  
日期：2026-10-22  
目标仓库：`YuukiAS/AI_Research_Toolkit`  
分支：`research/software-production-decision-20261013`  
任务：`software-production--delivery-assurance`  
审查阶段：`USER_VALUE_DESIGN_REVIEW_V0_5`

## Active Design Context

```text
target_repo = YuukiAS/AI_Research_Toolkit
target_plugin_or_domain = Delivery Assurance production contract
design_topic_or_task_key = software-production--delivery-assurance
source_branch_or_ref = research/software-production-decision-20261013
prior_design = Delivery Assurance v0.4
public_interface = da/1 freeze v1
prior_package_set = 19_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_2_20261020
review_stage = USER_VALUE_DESIGN_REVIEW_V0_5
implementation_authorized = NO
```

## 0. 核心判断

独立 Critic 的五项用户价值 finding 成立。现有 v0.4 已经把 Gate、owner、TargetGraph、claim、adapter、反自签和 failure routing 设计得足够完整，但还没有证明用户日常只说“做这个功能”时，这套机制会从真实正常入口自动发生，也没有把项目验收映射不完整、开发中低配替代、原工作流持续返修和真实用户负担纳入生产关闭条件。

本轮不推翻 v0.4，也不增加中央服务。修订后的产品承诺是：

> 在已经完成 Delivery Assurance adoption、并从已验证 normal entry 启动的仓库里，用户只需给出功能目标和必要授权。系统自己选择适当的既有 workflow，解析最小但充分的 Gate，补可机械生成的 validator，保护受影响的旧能力，在开发过程中拦截低配替代，失败后沿原任务继续修复，并在最终完成前由 Stop/delivery admission 拒绝缺证或假完成。

该承诺有明确边界。它不覆盖尚未 adoption 的仓库、未受信任或被禁用的 project Hook、没有 task packet 的任意 raw Codex prompt，也不覆盖缺少本地 runtime 的纯 ChatGPT/remote surface。不能把 installed Skill 的“可能自动匹配”写成强制入口。

本轮结论是：**冻结的 `da/1` required fields、owner 和 decision semantics 不需要修改。** 五项 finding 都能通过现有 normal-entry、TargetGraph、source-set/impact、known-bad/should-not-change、GateResult/invalidation、missing-capability 和 failure-routing 合同实现。独立 Critic 必须专门复核这一判断；若发现需要新增 required field 或改变 owner/decision meaning，当前 freeze 立即失效并返回完整架构审查。

## 1. 事实基线

### 1.1 治理

本轮实际读取：

```text
YuukiAS/AI_Skills_Collection main
= c7f98f201c746d357344091f89cce7a3541154d9

Planner Role Contract = 1.7
Critic Role Contract  = 1.7
Plugin Capability Gate Policy = 1.2
```

Planner 不能自批本 Proposal。设计阶段下一结论只能是 `PROCEED / REVISE`。

### 1.2 Delivery Assurance

```text
v0.4 design content = 0ff0f43f3b04286273490e4c4870975f4aa7a7f8
public da/1 freeze commit = e278a3bab0949eac8a6f7df4007066da6eae7bd6
public da/1 SHA-256 = 8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b
package set v0.2 branch head before this revision = 6929a6a6ad1870f8b36b4f9278c7c76bed3c5409
```

Phase 1 `GO` 只证明受测 Stop 接缝可做一次有界 continuation，不证明正常入口、旧能力覆盖、开发中反降级或用户负担已经生产成立。

### 1.3 Bridge 实际能力

正式生产基线：

```text
YuukiAS/GPT_Codex_AI_Bridge_Kit
release@ba9013b9fbbd242e51b09f9d09291f417df17652
version = 0.11.1
```

当前真实能力：

- Lite 的 `ai-bridge task run` 只启动一次 `codex exec`，没有 outer repair loop；
- Review 由 Planner → Executor → Reviewer 组成，默认最多两轮 Review；第一轮 `REVISE` 后 watcher 可自动启动一次 Codex repair；
- Control 保留 Planner/Critic/Controller/Verifier/Executor，使用 typed findings 和 bounded `max_repair_rounds`；
- CARE、CUHK_Date 等 project controller 继续拥有自己的 wait/resume/finalizer/recovery；
- Stop Hook 可以要求 Codex 继续一个 turn，但 `stop_hook_active` 和预算必须防止无限 continuation。

### 1.4 当前官方 Codex 事实

截至本轮核查：

- Skill 的完整指令由模型在用户请求匹配 description 时加载，也可以显式调用；这不是外部强制 admission engine；
- Codex 支持 project-local `.codex/hooks.json`、`SessionStart`、`UserPromptSubmit`、`Stop`、`Interrupt` 等生命周期 Hook；
- project Hook 只有在项目 trusted 且当前 Hook definition/hash 已获 trust 时才执行；新定义或变更定义会重新要求审查；
- Stop 的 block decision 会生成 continuation prompt；`Interrupt` 不能被 Hook 阻止或自动重启；
- Hook/Plugin 能力具有 surface/environment 边界，安装 Web plugin 不等于本地脚本已部署。

官方来源：

- <https://developers.openai.com/plugins/concepts/skills>
- <https://developers.openai.com/plugins/build/skills>
- <https://developers.openai.com/docs/hooks>
- <https://developers.openai.com/plugins/concepts/plugins>

## 2. 用户以后实际看到的流程

对已完成 adoption 的仓库，用户界面应当是：

```text
用户：做这个功能

系统自动：
1. 根据目标、风险和仓库现有 workflow 选择 Lite / Review / Control / project controller；
2. 在 supported normal entry 启动前执行 Delivery Assurance admission；
3. 读取 frozen Goal、实际改动、TargetGraph、adapter、domain descriptors 和 accepted baseline；
4. 选择最小但充分的 required Gate set；
5. 标准已冻结而 validator 缺失时，由当前 Executor 同任务补 validator；
6. 在第一次真实功能链形成时运行便宜的机制/known-bad/旧能力检查；
7. 完成实现后，对 exact final candidate 运行最终 required Gates；
8. 普通实现、validator 或证据缺陷沿原任务自动返修；
9. Stop/delivery admission 拒绝 stale、missing、低配替代或未覆盖义务；
10. 只在真正 HUMAN_ONLY 或合法预算耗尽时打断用户。
```

用户不再需要逐轮说：

- “给这个功能加测试”；
- “查一下旧功能有没有坏”；
- “不要用 smoke/proxy/fixture 冒充”；
- “把 validator 补上”；
- “Review 说 REVISE 以后继续修”；
- “别因为 job finished 就说科研结论完成”；
- “别把旧版本证据拿来证明新版本”。

用户仍可能需要做两类动作：

1. 仓库首次 adoption 或 Hook definition 变更时，通过官方 `/hooks` 审核并 trust 这一个精确定义；
2. secret/auth、物理设备、真实账号、高影响发布/上传、不可推导产品或科学选择、最终主观接受。

这些是一次性设置或真实授权边界，不是普通 QA 劳动。

## 3. 正常入口合同

### 3.1 支持入口

只有下列入口完成各自 implementation package 和 actual normal-entry Gate 后，才能宣称自动 Delivery Assurance：

| 入口 | 任务身份来源 | 确定性接入点 | 自动返修 owner |
|---|---|---|---|
| Canonical Codex Goal / task packet | Planner/项目正常入口冻结的 Goal、repo、branch、candidate、task key | Goal materialization + trusted project Stop | 当前 Codex turn；必要时原 workflow |
| Bridge Lite | `prompts/tasks/<task_key>.md` 与 Lite preflight | `ai_bridge_kit/cli.py::run_lite_task` prelaunch + completion admission | 同 turn Stop continuation；无 outer loop |
| Bridge Review | Reviewed REQUEST/PLAN/CURRENT | `reviewed_runner.py::run_codex_event` prelaunch/post-result | existing Review repair round |
| Bridge Control | Control REQUEST/contract/ledger/review target | `agent_flow.py::launch_executor_with_preflight` + bundle/final validators | existing typed Controller routing |
| consumer controller | 项目自己的 canonical task/campaign/run identity | consumer adapter 冻结的 normal entry | existing project controller/finalizer |

每个支持入口必须满足：

```text
DA adoption declared
+ exact adapter identity valid
+ required workflow-core capability installed/loaded
+ prelaunch/materialization Resolver call
+ task-owned resolution/targets/claim refs
+ completion admission call
+ required Hook trust where Hook is part of the claim
```

任何一项缺失都不能静默退化为 legacy green。合法结果只能是：

```text
not a DA-adopted task
或
DA unavailable / UNKNOWN / blocked claim
```

`NONE` 只能由成功运行的 Resolver 在完整 impact/coverage 输入上得出；“没有找到 Resolver/adapter/result”不能成为 `NONE`。

### 3.2 尚未支持的入口

以下不计入首版生产承诺：

- 用户在任意仓库直接输入一句话、没有 canonical Goal 或 task packet 的 raw Codex session；
- hooks disabled、project untrusted、Hook definition 未 trust；
- 只安装 `workflow-core`，但没有 normal-entry call-site consumption；
- ChatGPT-only、GitHub review 或 remote Codex surface 没有该 repo 的 local adapter/runner/Hook runtime；
- secondary folder 或其他不属于当前 canonical working directory 的材料被误当成自动项目入口。

Raw local Codex 的 trusted Stop Hook 可以作为最终安全网，但在专门 direct-entry package 和早期检查 actual pilot 完成前，不能证明“从任务开始自动进入完整保障”。本 Proposal 不用一段 AGENTS 文案或 Skill metadata 冒充这项能力。

### 3.3 Workflow 自动选择

用户不选择 Lite/Review/Control。`workflow-core` 根据已经冻结的任务风险和恢复需要选择现有 workflow：

- isolated、低风险、一个 continuation 足以修复的任务可走 Lite；
- 有真实独立复核、可能需要一次普通返修的中等任务走 Review；
- false PASS 代价高、需要独立 verifier/contract/final critic 的任务走 Control；
- 已有项目 controller 的长任务继续用项目 owner。

文件多、时间长或“复杂”本身不自动升级。反过来，历史同类任务反复出现低配替代、validator 自签、旧功能退化或错误科研结论时，不得为了省事强行 Lite。

## 4. 旧能力保护：从“已登记不许删”提升到“映射完整性可证明”

### 4.1 三重 coverage closure

每个任务在决定 `TARGETED/BROAD/FULL` 前必须生成 coverage witness。它是 task-local evidence，不是中央 registry。

#### A. Changed-surface coverage

从批准 baseline 到 candidate 的每个 acceptance-relevant 变化必须映射到：

```text
source_set_rule
→ affected target/edge
→ capability/Gate family
→ required evidence/claim ceiling
```

覆盖对象至少包括：

- source path 和 public API/command/route；
- shared runtime/schema/router/generator；
- package/installer/deployment/config；
- persisted state/data migration；
- rendered/document/checkpoint/report artifact family；
- deleted/renamed entry、test、validator、authority locator。

新文件、删除文件和不在既有 path rules 内的修改不能因为“adapter 没写”而消失。

#### B. Promised-capability coverage

以下来源中的每个当前承诺能力必须能在 TargetGraph 找到：

```text
frozen Goal / Plan
current milestone / accepted product contract
current domain minimum
accepted baseline and active should-not-change
current normal user entry
```

每项必须有 target、owner、normal entry、Gate family 或明确 HUMAN_ONLY/unsupported claim ceiling。

#### C. Consumed-target coverage

用户真正消费的对象必须全部存在于图中。UI + backend + installer + docs，或 model + checkpoint + report，不能被一个 source candidate 代签。缺少 sibling target、installed instance、deployed runtime、report 或 scientific conclusion 节点时，不得 `USER_READY`。

### 4.2 缺口处理

任何 coverage 缺口都产生：

```text
UNKNOWN_IMPACT
或
UNCOVERED_OBLIGATION
或
ADAPTER_GAP
```

处理规则：

- 语义可由 canonical repo evidence 机械推导：当前 Executor 同任务更新 adapter/target mapping，并重新解析；
- 新能力语义或旧能力 owner 真正不清楚：回 project/domain owner 冻结，不由 workflow-core/Bridge发明；
- 影响闭包局部可知：`BROAD`；
- 项目级 applicability 因 mapping 不完整而未知：`FULL` coverage + adapter repair；
- 不允许用户手工补长期清单。

### 4.3 Baseline 反自签

Executor 不能在同一任务中通过删除旧 capability、target、edge、known-bad 或 should-not-change 来缩小 baseline。任何 baseline semantic change必须：

```text
旧 baseline 结果
+ semantic diff
+ owner authority
+ 变更理由
+ 对旧回归库的迁移/保留说明
```

机械 locator 移动可同任务修复；产品/科学语义变化返回 owner。

## 5. 开发中反降级

### 5.1 四个检查时点不是新状态机

```text
ADMISSION
FIRST_VERTICAL_SLICE
INTEGRATION_CHECKPOINT
FINAL_CANDIDATE
```

它们只决定何时运行既有 Gate，不进入 Bridge `CURRENT`，不新增 workflow/state/daemon。

### 5.2 Admission

在实质实现前冻结：

- positive completion；
- exact target set 和 claim ceiling；
- non-substitutable semantics；
- accepted baseline/should-not-change；
- known-bad 与 regression family；
- required Gate set 与 scope；
- validator implementation gaps；
- HUMAN_ONLY 和权限/费用边界。

若这些事实不能安全推导，先走现有 Planner/owner route；不能先写低配代码再让测试反向决定标准。

### 5.3 First vertical slice

第一次真实用户链可运行时，执行最便宜的对应检查：

- 是否经正式 normal entry；
- 关键参数、数据、状态和机制是否真正被消费；
- 是否只有 import/shape/smoke/fixture；
- 是否出现已冻结的 proxy/toy/shallow substitution；
- 一个代表性旧能力是否仍可达。

目标是让 CARE 的“loss key 存在但未消费”“500 步只跑 12 步”“receipt 冒充科学完成”，Lucerna 的“状态链吞掉 child failure”“窗口隐藏冒充点击因果”，Asteria 的“缺指标被写成 0”“机械测试绿但真实图仍错误”等在实现中期就暴露。

### 5.4 Integration checkpoint

跨层接通后运行：

- affected dependency closure；
- adjacent should-not-change；
- package/install/runtime identity when applicable；
- validator/fixture/rubric definition identity；
- known-bad 仍必须失败。

共享 runtime/schema/router/generator/adapter 或多个 sibling target 变化时升级 broad；局部隔离充分时保持 targeted。

### 5.5 Final candidate

所有 release-critical Gate 绑定同一 final candidate。早期结果只有在 exact identity 和 invalidation dependencies 未变时才可复用；否则重新运行受影响闭包。开发中检查不能代替最终 actual-surface/scientific/protected observation。

## 6. 持续修复与安全停止

### 6.1 Stop 不是新的 repair controller

`auto_repair_budget=1` 保持不变。一次 Stop continuation 表示“在同一个 Codex turn 中继续工作一次”，不是只允许改一个文件或跑一个命令。continuation 内可以做多轮工具调用、代码修复和测试，直到：

- required gates 通过；
- 遇到真实 HUMAN_ONLY/authority/environment/standard blocker；
- 再次 Stop 仍不满足。

第二次失败不得再生成 continuation。输出 `REPAIR_BUDGET_EXHAUSTED/UNKNOWN` 或原 workflow 的合法未完成状态。

### 6.2 与现有 workflow 的衔接

#### Canonical Goal / Lite

- 当前只有一个 Codex process/event；
- Stop continuation 是唯一自动补救；
- 若仍失败，诚实报告未完成，不自动把 Lite 升级成 Review/Control；
- 因此 workflow-core 必须在启动前判断该任务是否适合 Lite。

#### Review

- 每个 Executor event 内最多一次 Stop continuation；
- 若 event 结束后 Reviewer/DA 仍发现 implementation/validator defect，写入 fresh `REVISE`；
- existing watcher 按 Review budget启动 repair；
- 默认 Review 2 后不再自动循环。

#### Control

- Stop continuation 只修当前 Executor event；
- event 后的 defect 进入 existing typed finding routing；
- `IMPLEMENTATION_BUG` 回 Executor，`VERIFIER_BUG` 回 Verifier，证据/运行/contract问题回各自 owner；
- `max_repair_rounds`、heavy verifier invalidation和 Final Critic边界保持现有合同。

#### Project controller / long run

- PENDING/RUNNING/CI/external GPT/Slurm accounting 是等待，不是 repair；
- 不消耗 DA continuation 或原 workflow repair round；
- terminal operational failure按原项目恢复；
- scientific/product choice仍回 Planner/user。

### 6.3 防循环规则

以下任一成立时不得再自动重试：

- 同一 failure identity、同一 candidate、同一 evidence，没有新信息；
- Stop 已 active 且第二次失败；
- Review/Control 原预算耗尽；
- contract/owner/standard真正矛盾；
- 需要新的 secret/auth/physical/high-impact 授权；
- 环境不可用且没有六维等价的低权限恢复；
- 用户 Interrupt。

不允许通过换 shell、命令拼法、runner、降低 threshold、换 fixture 或缩 claim 伪造“新尝试”。

## 7. 用户价值试点

生产 claim 在下列试点完成前保持：

```text
DELIVERY_ASSURANCE_USER_VALUE=NOT_PROVEN
```

试点使用现有历史映射，不重做 83/363 审计。至少覆盖：

1. Lucerna：旧功能/状态/交互回归；
2. CARE：低配机制、缩小规模、receipt-only scientific false completion；
3. Asteria：normal-entry、validator/threshold 自签和实际 deployed scientific surface。

每个场景必须使用真实仓库、真实 normal entry、冻结 candidate、真实历史 failure locator或独立冻结 holdout。不得只跑 schema/unit/synthetic fixture。

生产关闭指标：

```text
ordinary QA reminder after initial feature request = 0
known-bad USER_READY false positive = 0
missed frozen regression = 0
agent-resolvable failure routed back to same task = YES
at least one failure caught before final Stop per regression/degradation class = YES
unjustified FULL escalation on isolated change = 0
same failure repeated without new evidence = 0
cost/runtime/user action ledger = complete
```

试点细节见单独 Pilot Plan。

## 8. 对现有实施包的影响

### 8.1 Package 01

当前 `01_WORKFLOW_CORE_RESOLVER_V0_2.md` 不再是 execution-ready 候选。v0.3 必须新增：

- supported-entry admission policy；
- no-silent-skip；
- coverage witness 和三重 closure；
- phased gate plan；
- workflow choice 与 repair-capacity matching；
- natural one-sentence feature-request replay；
- user-value pilot result consumption。

### 8.2 Package 02

当前 `02_BRIDGE_RUNTIME_V0_2.md` 不再是 execution-ready 候选。v0.3 必须新增：

- 每个 supported entry 的 mandatory admission/claim call；
- Canonical Goal/task packet 的 identity materialization；
- Stop continuation 与 Review/Control/project repair budget 去重；
- unsupported raw entry 的 truthful result；
- Hook trust/disabled/unavailable negative；
- no second continuation、Interrupt precedence、same-failure dedup。

本轮不把 raw no-task-packet Codex 伪装为已支持；如未来要支持，必须独立 direct-entry package + actual pilot。

### 8.3 Package 04A–04D

现有 descriptor schema 已含 normal entry、known-bad、regression、should-not-change、invalidation 和 claim support，不需要改变公共语义。execution-ready Critic 需要确认 descriptor 真的提供本 Proposal 所需的早期/coverage材料，但不必把四包重写成一个总包。

### 8.4 Consumer packages

每个 consumer adapter package 增加：

- changed-surface/promised-capability/consumed-target coverage evidence；
- 一个 first-vertical-slice early check；
- 一个历史旧能力 regression；
- 一个低配替代或不适用说明；
- supported normal entry 和 unsupported entry；
- user reminder/intervention/cost记录。

### 8.5 Package 13 formal release

正式 release/Update impact/managed adaptation 之前新增硬前置：

```text
core implementation review PASS
+ first vertical consumer PASS
+ user-value pilot PASS
+ installed/fresh-session supported-entry PASS
```

中央实现、CI 或七仓 schema存在不能代签用户价值。

### 8.6 不受影响的包

- PIE 0.3 继续等待自己的 architecture Critic；
- Bobbio authority recovery 保持小型前置；
- Phase 1 GO 不重开；
- 04A–04D 仍独立失败/独立发布；
- 不修改 consumer production source。

准确 delta 见 `DELIVERY_ASSURANCE_USER_VALUE_IMPLEMENTATION_PACKAGE_DELTA_V0_1_20261022.md`。

## 9. Capability Gate Matrix

| Gate | 证明能力 | 正常入口 | 正向证据 | 危险负例 | 当前状态 |
|---|---|---|---|---|---|
| `DA-UV-G1_SUPPORTED_ENTRY_ADMISSION` | 用户一条功能请求在 supported entry 自动进入 DA | Canonical Goal、Lite、Review、Control、一个 consumer controller | exact resolver/admission consumption | Skill installed但未加载、helper直跑 | 未实现 |
| `DA-UV-G2_NO_SILENT_SKIP` | adapter/plugin/Hook/result缺失不会变成 legacy PASS/NONE | 同上 + trust disabled negative | truthful UNKNOWN/block | missing resolver -> NONE/complete | 未实现 |
| `DA-UV-G3_COVERAGE_CLOSURE` | mapping不完整、旧功能漏登记会被发现 | consumer normal entry | changed/promised/consumed三闭包 | unmapped path/edge/target仍TARGETED PASS | 未实现 |
| `DA-UV-G4_EARLY_ANTI_DEGRADATION` | 真实链和低配替代在开发中被拦 | first vertical slice/integration checkpoint | actual normal entry + known-bad | final阶段才发现或smoke冒充 | 未实现 |
| `DA-UV-G5_WORKFLOW_REPAIR_HANDOFF` | Stop与Lite/Review/Control/project recovery正确衔接 | 各 workflow normal entry | fresh defect同任务修复 | double budget、自动升级workflow、无限循环 | 未实现 |
| `DA-UV-G6_SAFE_STOP` | 同一失败无新信息时安全停止 | Stop + original controller | exact blocker/lower claim保留 | 重复continuation、假PASS、用户Interrupt被忽略 | 未实现 |
| `DA-UV-G7_REAL_HISTORICAL_PILOT` | 历史真实失败在实际入口被识别和修复 | Lucerna/CARE/Asteria | same-candidate actual evidence | schema/unit/synthetic代签 | 未实现 |
| `DA-UV-G8_USER_BURDEN` | 普通QA提醒降为0且用户不是第一QA | pilot transcript/evidence | one initial feature request + bounded authorization | 用户再次提醒测试/退化/低配/继续修 | 未实现 |
| `DA-UV-G9_COST_AND_SCOPE` | 小任务不被全量验收，复杂任务成本可解释 | pilot cost ledger | no unnecessary FULL/repeated expensive gate | Gate数量/复杂度驱动FULL | 未实现 |
| `DA-UV-G10_UNSUPPORTED_SURFACE_TRUTH` | 尚未支持的raw/remote入口不被宣传 | install/fresh-session inventory | explicit unsupported result | raw Codex一次成功冒充production guarantee | 未实现 |

所有 production-critical Gate 必须绑定同一最终候选和实际安装/加载身份。Pilot 使用的 grader/validator修复必须与产品修复分开报告。

## 10. `da/1` 影响审计

| 用户 finding | 使用的既有 `da/1` 表面 | 是否新增 required field/semantic |
|---|---|---|
| F01 | `normal_entry_refs[]`、normal entry identity、missing-capability routing、claim unproven | 否 |
| F02 | `targets[]`、`edges[]`、`source_set_rules[]`、`impact_rules[]`、`obligations_missing[]`、`UNKNOWN_IMPACT` | 否 |
| F03 | `regression_bank_refs[]`、`known_bad_refs[]`、`should_not_change_refs[]`、GateResult candidate/invalidation | 否 |
| F04 | existing failure reason families、original controller routing、Bridge Stop identity | 否 |
| F05 | Capability Gate/pilot evidence，属于 release validation | 否 |

本轮没有改变：

- `NONE/TARGETED/BROAD/FULL` meaning；
- owner 分工；
- TargetGraph/claim partial order；
- evidence axes；
- GateDescriptor/GateResult required fields；
- adapter monotonicity；
- failure routing；
- AGENTS lifecycle；
- no registry/database/daemon/new workflow。

## 11. 实现顺序

```text
v0.5 independent design Critic PROCEED
→ Package 01 v0.3 execution package
→ Package 02 v0.3 execution package
→ 各自 independent execution-ready Critic
→ core implementation on separate lanes
→ Asteria first vertical consumer
→ user-value pilot development cases
→ freeze independent historical holdout after candidate freeze
→ Lucerna + CARE pilot actual normal-entry evaluation
→ repair same core/consumer task when within frozen semantics
→ user-value pilot independent final evaluation
→ remaining consumer adaptation
→ Package 13 formal release / Update impact / managed adaptation
```

不允许把上述内容合成跨仓巨型 Codex Goal。每个 lane 自己的 Proposal/Plan/Gate/final candidate/implementation review 独立成立。

## 12. 停止条件

若后续发现必须：

- 修改 `da/1` required field、owner、decision、claim或failure meaning；
- 创建中央 registry/database/watcher/daemon；
- 新建第四 workflow/第二 CURRENT/DONE；
- 把专业标准转给 workflow-core/Bridge；
- 让用户长期维护 adapter/Gate/AGENTS/coverage清单；
- 让 Executor临场决定新的产品/科学标准；
- 恢复 Bridge 已删除的重型 reader/thread/event bus；

立即停止对应 package，回 Delivery Assurance Planner–Critic。

## 13. 当前状态

```text
DA_USER_F01=PLANNER_ACCEPTED
DA_USER_F02=PLANNER_ACCEPTED
DA_USER_F03=PLANNER_ACCEPTED
DA_USER_F04=PLANNER_PARTIALLY_ACCEPTED_WITH_EXISTING_WORKFLOW_EVIDENCE
DA_USER_F05=PLANNER_ACCEPTED

DA1_SEMANTIC_CHANGE_REQUIRED=NO_PENDING_CRITIC_CONFIRMATION
PACKAGE01_V0_2_EXECUTION_READY_STATUS=INVALIDATED_BY_USER_VALUE_DELTA
PACKAGE02_V0_2_EXECUTION_READY_STATUS=INVALIDATED_BY_USER_VALUE_DELTA
PRODUCTION_IMPLEMENTATION_AUTHORIZED=NO
USER_VALUE_PROVEN=NO
READY_FOR_CODEX=NO
NEXT_OWNER=INDEPENDENT_CRITIC
USER_ACTION_REQUIRED_NOW=NO
```
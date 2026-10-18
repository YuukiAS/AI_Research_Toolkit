# Delivery Assurance Production Contract Completion — Proposal v0.2

Status: **PLANNER PROPOSAL / INDEPENDENT CRITIC REVIEW REQUIRED / NOT IMPLEMENTATION AUTHORIZATION**  
Date: 2026-10-19  
Target repository: `YuukiAS/AI_Research_Toolkit`  
Source branch: `research/software-production-decision-20261013`  
Design topic: `software-production--delivery-assurance`  
Review stage: `PRODUCTION_CONTRACT_DESIGN_REVIEW_V0_2`  
R5 Phase 1 package: `58717a6b3ace4f5ccf094fb4f8754231af762d54`  
R5 Phase 1 Critic PASS source: `DELIVERY_ASSURANCE_CRITIC_REVIEW_R5_20261019.md`  
AI Skills source baseline: `YuukiAS/AI_Skills_Collection@23f51b0bebd8a32f49d899f7fae1ee0e5f17e4cd`  
Bridge source baseline: `YuukiAS/GPT_Codex_AI_Bridge_Kit@0120b99a501e4193078233bc4ec824dcb1dcac75`

## 0. 核心判断

Delivery Assurance 的高层职责划分已经成立，但生产合同还缺少一条决定性链路：系统怎样发现现有验收能力、按本次真实改动选出最小但充分的门禁、在缺少 validator 时自动补齐可机械实现的部分、保护门禁定义不被 Executor 放宽、执行门禁并把结果绑定到多产物/跨仓库候选，最后随项目和中央插件版本持续维护。

本 Proposal 冻结这条链路，但不创建第二中央控制面、gate registry 数据库、daemon、第四套 Bridge workflow 或新的长期状态机。生产形态固定为：

```text
已安装且启用的 domain plugin 自带 Gate Capability Descriptor
+ project ADAPTER.toml 引用项目本地能力与消费对象
+ workflow-core 运行 Required Gate Resolver
+ Executor / 既有 project finalizer 调用正常 gate entry
+ domain/project owner 产出专业 Gate Result
+ Bridge 只验证身份、候选绑定、新鲜度与完成返回
```

R5 Phase 1 Hook probe 与本 Proposal 相互独立。本轮没有发现直接推翻 R5 Hook probe 的新证据，不暂停、不重开、不修改 R5；R5 仍只验证 Stop 生命周期接缝。本 Proposal 只补全后续生产架构，在 Phase 2/3 实现前接受独立 Critic 审查。

通过本 Proposal 后新增的真实能力不是“多了一份 schema”，而是形成一个可实现的端到端合同：用户只提出功能目标，系统能够自动识别验收能力、补机械 validator、运行专业门禁、有限返修，并按实际证据给出分层完成声明；只有新产品/科学标准、secret/auth/physical action 或高影响授权才打断用户。

v0.2 新增一个在 v0.1 中缺失的硬合同：**Failure-to-Gate Admission**。它来自对六仓库原始 246 条失败 + CARE 40 条失败的逐条映射。286 条历史问题收敛到 46 个 gate family；280 条应进入既有家族成为 regression / validator hardening，只有 6 条纯属 workflow/Bridge/evidence 机制而不应创建产品 Gate。完整逐条 CSV 与人类可读总结分别见 `DELIVERY_ASSURANCE_HISTORICAL_FAILURE_TO_VALIDATOR_MAP_V0_1_20261019.csv` 与 `.md`。因此生产 Resolver 不能只会“选 Gate”，还必须会**拒绝乱加 Gate**。

## 1. 已核实的现有正式能力与缺口

### 1.1 已经解决，不重复造机制

以下职责已有正式来源，本 Proposal 只消费：

- R5 Proposal 已冻结 Bridge / `workflow-core` / domain / project 的权威分工、薄 adapter、候选与证据绑定、Stop 返修、长期 owner、单写者和权限边界。
- Bridge 的 Local Autonomous Acceptance TODO 已正式 `CLOSED / RESCOPED TO workflow-core`，明确禁止新建 `local-review` workflow、Reviewer state machine、watcher/daemon 和 Bridge 内的领域质量判断。
- `workflow-core` 当前正式 Skill 已有 W1–W5：纵向交付链、HUMAN_ONLY 分类、证据保真、重复失败熔断、should-not-change；Plugin Capability Gate Policy 已有 narrow / broad / full、同一 final candidate、cheap deterministic regression first、真实 normal entry 和完整 artifact 原则。
- Frontend Design 已有 actual-surface convergence 与 producer self-QA；Presentations 已有逐页最终 render 和 fresh rendered-artifact review；Research Authoring 已有 claim/evidence/citation/final-artifact QA；Statistical Modeling 已有 estimand、假设、诊断、敏感性、意图区间与探索/验证性结论边界。
- Bridge Review / Control / Persistent Run 继续拥有各自的运行、等待和恢复协议；CARE 继续拥有 Slurm controller/finalizer/validator；Delivery Assurance 不成为第二 scheduler。
- AI Skills Maintainer 已有 `machine-update-orchestrator`、`bridge-kit-maintainer`、正式 `release` 与 `### Update impact`，可以承担中央版本和 managed consumer adaptation；不新建 Delivery Assurance 版本矩阵。

### 1.2 当前真正缺少的生产合同

现有来源没有冻结以下事项：

1. domain/project gate 怎样以机器可发现但仍由专业 owner 控制的方式声明；
2. `workflow-core` 怎样从任务、改动、消费对象与风险自动解析最小门禁集合；
3. validator 缺失时谁冻结标准、谁实现、是否自动继续；
4. Executor 同时修改产品和 validator 时怎样防止降低标准；
5. 多产物、跨 repo、安装/运行表面怎样避免被一个含糊 `candidate_ref` 掩盖；
6. adapter 怎样生成、更新和随中央版本适配，而不要求用户维护 gate 清单；
7. 较高交付层缺证时，怎样只阻塞相应 claim 而保留已证明的较低层成果。

这正是本 Proposal 的范围。

### 1.3 消费者反证

Lucerna 证明：测试绿、文档写了设计目标、fixture 截图存在，都不能证明 exact native release 的视觉、交互、状态传播、通知与文案正确；其当前正式入口已经把 `scripts/acceptance-preflight.ps1`、真实 release、PID/readiness/capture、fresh independent review 和 P0/P1/P2=0 分开。

CARE 证明：长任务的真实完成对象可能包含 source/config、Slurm job、checkpoint、aggregation、strict validator、terminal accounting 与 scientific claim；`JOB_SUBMITTED`、`NEEDS_MONITOR` 或 controller packet 存在都不等于完成。已有 controller/finalizer/validator 必须继续作为 project owner，Bridge 不得轮询或重提作业。

Bobbio 证明：UI black-box PASS 与真实 Windows / isolated Zotero round-trip 是不同 gate；最终 accepted candidate 还要绑定 PDF immutable、cache rebuild、real profile untouched、annotation round-trip 等非视觉不变量。一个笼统“桌面应用 QA”不能替代多表面、多 evidence class 的门禁组合。

统计分析反例进一步说明：非视觉任务同样不能只靠单元测试或一份报告。estimand、数据依赖、假设、模型诊断、敏感性和 intended scale 是专业门禁，且不能由 Bridge 或通用 workflow 临时发明。

## 2. 生产对象模型：不建 registry，只建可发现 descriptor

### 2.1 两类 canonical descriptor 来源

Delivery Assurance 只承认两类 Gate Capability Descriptor：

1. **可复用领域能力**：由 domain plugin/skill owner 声明，并随已安装、已启用的正式 plugin 一起分发；
2. **项目本地能力**：由 project owner 声明，位于项目自己的 Delivery Assurance 目录。

不允许第三个中央 gate registry、数据库或在线服务。

#### Domain plugin 运行时 locator

正式 plugin 的 `.codex-plugin/plugin.json` 增加可选 locator：

```json
{
  "delivery_assurance": {
    "gate_capabilities": "delivery-assurance/gates.toml"
  }
}
```

该 plugin-relative manifest 是运行时发现入口。descriptor 的专业 source authority 仍在对应 domain plugin/skill 的 canonical source；AI Skills Maintainer 负责 generator、installed plugin、Marketplace/profile 与正式 release 的一致性，不拥有专业标准。

#### Project-local locator

项目本地固定使用：

```text
automation/delivery_assurance/ADAPTER.toml
automation/delivery_assurance/gates.toml
```

`ADAPTER.toml` 描述项目、消费对象、已有正常入口和 descriptor 引用；`gates.toml` 只存 project-local capability descriptor。二者都不是任务状态，不保存 review round、completion 或 gate result。

### 2.2 Gate ref 与 definition identity

Gate ref 使用稳定语义身份：

```text
domain:<plugin-id>/<capability-id>
project:<project-id>/<capability-id>
```

每个 gate definition 的不可混淆身份为：

```text
definition_ref
+ definition_version
+ definition_digest
```

- `definition_ref`：canonical source locator；
- `definition_version`：由唯一专业 owner 维护的语义版本；
- `definition_digest`：本次解析到的 descriptor 内容摘要。

阈值、rubric、accepted evidence surface、positive/negative fixture 语义或 claim scope 发生变化时，必须提升 `definition_version`。仅修复不改变标准的 runner implementation，可以保持 definition version，但每次结果仍记录新的 `runner_identity`。

## 3. Gate Capability Descriptor v1

每个 descriptor 必须完整表达以下字段；不能把关键语义留给 Executor 临场猜测。

```toml
schema = "delivery-assurance.gate-capability/v1"
gate_ref = "domain:web-development/frontend-actual-surface"
scope = "DOMAIN_REUSABLE" # 或 PROJECT_LOCAL
owner_ref = "domain:web-development/frontend-design"
definition_ref = "<canonical source locator>"
definition_version = "1.0"
definition_digest = "sha256:<digest>"
change_authority = "<same canonical owner>"

[applicability]
delivery_classes = ["UI_FEATURE", "DESKTOP_RELEASE"]
change_kinds = ["UI", "STATE_SEMANTICS", "COPY", "NATIVE_INTERACTION"]
claim_levels = ["INTEGRATED", "ARTIFACT_READY", "INSTALLED", "LIVE"]
subject_types = ["SOURCE_TREE", "DESKTOP_BINARY", "RUNTIME_INSTANCE"]
consumed_target_types = ["NATIVE_UI_SURFACE"]
risk_triggers = ["SHARED_STATE_GRAMMAR", "PRIMARY_USER_FLOW"]
exclusions = ["BACKEND_ONLY_ISOLATED_CHANGE"]

[execution]
entry_kind = "SKILL" # COMMAND | SKILL | NATIVE_RUNNER | PROJECT_FINALIZER
entry_ref = "<normal production entry locator>"
invocation_owner = "EXECUTOR" # 或 PROJECT_OWNER
synchronous = true

[result]
schema_ref = "delivery-assurance.gate-result/v1"
accepted_evidence_classes = ["RENDERED_ARTIFACT", "NATIVE_INTERACTION"]
decisions = ["PASS", "FAIL", "UNKNOWN"]

[requirements]
permission_class = "WORKSPACE_LOCAL"
cost_class = "NO_PAID_CALL"
secrets_required = false
physical_action_required = false
long_run_owner_required = false

[invalidation]
subject_identity_change = true
consumed_target_identity_change = true
definition_change = true
runner_change = true
fixture_or_rubric_change = true
relevant_environment_keys = ["os", "dpi", "install_identity"]

[regression]
regression_bank_ref = "<existing tests/fixtures/TODO locator or null>"
known_bad_refs = []
should_not_change_refs = []
```

`regression` 不是中央 case registry。它只给 Executor 一个项目/领域已有回归集合的 locator：新失败匹配现有 Gate 时，默认把回归补到这里；没有现成 bank 时，Executor 在当前 project/domain owner 允许的正常 test/fixture 位置建立最小集合。

### 3.1 字段语义

- `owner_ref` 是专业 PASS/FAIL/UNKNOWN 的唯一权威，不是“谁写 JSON”。
- `applicability` 只描述何时该 gate 可能适用；最终选择由 Required Gate Resolver 完成。
- `entry_ref` 必须是普通生产入口，不得指向只为 Gate 写的旁路 helper，除非 gate 的真实能力就是该 helper。
- `subject_types` 表示被判断的候选对象；`consumed_target_types` 表示用户最终实际看到、安装、运行或读取的表面。
- `accepted_evidence_classes` 由领域 owner 冻结；workflow-core 不得用另一 evidence class 替换。
- `requirements` 只声明现实依赖，不产生权限。secret、physical action、paid call、external mutation 仍由原用户授权/Host/project 规则控制。
- `invalidation` 明确哪些变化使旧结果失效。Bridge 只按已声明的身份比较，不解释专业质量。

### 3.2 Evidence class 最小公共词汇

公共层只定义 evidence 载体类别，不定义专业 PASS 标准：

```text
DETERMINISTIC_TEST
INTEGRATION_RUNTIME
RENDERED_ARTIFACT
NATIVE_INTERACTION
INSTALLED_SURFACE
LIVE_SERVICE
SCIENTIFIC_VALIDATION
EXTERNAL_REVIEW
HUMAN_DECISION
```

领域 owner 可以在 descriptor 中收窄，但不能让 workflow-core/Bridge 把低强度 evidence 自动升级成高强度 evidence。例如 screenshot file existence 不能变成 `RENDERED_ARTIFACT` 视觉 PASS，Slurm terminal accounting 不能变成 `SCIENTIFIC_VALIDATION`。

## 4. Required Gate Resolver v1

Required Gate Resolver 的唯一 owner 是 `workflow-core`。它不是 Bridge 功能，也不是 domain quality scorer。

### 4.1 输入

Resolver 必须消费：

1. 冻结 Goal/Plan 中的 Delivery Declaration；
2. 用户要求的最大 delivery claim；
3. 实际 change impact 与 should-not-change 边界；
4. Delivery Target Graph；
5. project `ADAPTER.toml`；
6. 当前已安装、已启用 domain plugin 的 capability manifests；
7. project-local descriptors；
8. 当前风险、权限、费用、长期运行 owner；
9. 已有 gate results 及其 definition/candidate freshness。

它不得从任务标题、复杂度印象、README prose 或“这个项目通常很重要”直接推导 full gate。

### 4.2 解析顺序

Resolver 按固定顺序运行：

```text
1. 分解目标 claim 与最终消费对象
2. 构建实际 change-impact / target graph
3. 从 adapter 和已安装 domain manifests 发现候选 gates
4. 用 applicability 过滤
5. 选择 NONE / TARGETED / BROAD / FULL 规模
6. 合并同一能力的重复 gate，保留更严格且可执行的 definition
7. 解析 missing-gate 状态
8. 生成最小但充分的 required gate set
9. 把 gate + subject/target + claim scope 冻结进 Delivery Declaration
```

### 4.3 四级规模合同

#### NONE：无 Delivery Assurance 专业 gate

只在以下条件同时成立时允许：

- 改动没有 acceptance-relevant product/artifact/scientific surface；
- 当前 claim 不高于已证明层级；
- 项目原有普通测试/静态检查足够证明本次目标；
- 不涉及 shared runtime/schema/routing/install/live surface。

`NONE` 不等于“不测试”，而是“不额外触发 domain/project professional gate”。

#### TARGETED：局部 gate

适用于一个可隔离 target/subsurface，且：

- change impact 能精确定位；
- shared dependency 未改变；
- descriptor 的 should-not-change 边界可机械覆盖；
- 当前 claim 只依赖该局部表面。

#### BROAD：同一产品族/共享机制 gate

出现以下任一情况时至少升级 BROAD：

- shared runtime/schema/generator/routing/default prompt；
- 多个 sibling surface 共用状态、组件、数据模型或 installer；
- project adapter / descriptor routing 发生变化；
- 多个产物节点或集成边同时受影响；
- 一次局部 PASS 无法证明 blast radius 已隔离。

#### FULL：完整交付 gate

只在以下情况使用，不因“任务很复杂”自动使用：

- 首次启用 Delivery Assurance，需要建立项目完整 target/claim 基线；
- 任务明确声称完整 release、installed/live 用户交付或跨 repo 整体完成；
- 新产品/科学验收类别已由 owner 冻结，且影响整体 completion；
- 变更横跨多个 artifact family，无法可靠拆出独立 claim；
- 现有 failure 证明 targeted/broad gate 对该整体声明不足。

### 4.4 Resolver 输出

Resolver 不创建中央状态。输出写回现有冻结 Delivery Declaration：

```text
claim_targets[]
required_gates[]:
  gate_ref
  definition_identity
  subject_refs[]
  consumed_target_refs[]
  claim_levels[]
  scale = TARGETED | BROAD | FULL
  invocation_owner
  rationale_code
  missing_state
excluded_gate_refs[]:
  gate_ref
  exclusion_reason_code
resolution_identity
```

Bridge 只消费该冻结结果。若 Goal/claim、adapter、descriptor、target graph 或 acceptance-relevant change impact 变化，workflow-core 必须重新解析；旧 gate plan 与结果不能静默沿用。

## 4A. Failure-to-Gate Admission v1：先决定“是不是新 Gate”

这一层由 `workflow-core` 拥有，是 Required Gate Resolver 的前置步骤。它不做专业评分，只做 gate taxonomy/lifecycle 决策。

### 4A.1 默认规则：新失败先进入旧 Gate

对每个新失败、新功能或 reviewer finding，Resolver 必须按以下五个维度与当前 descriptors 比较：

```text
capability
evidence class
normal entry
professional owner
claim scope
```

若这五个维度都能被已有 gate family 合理覆盖，则：

```text
NEW_GATE = NO
ACTION = ADD_REGRESSION | HARDEN_RUNNER | ADD_MISSING_EVIDENCE
```

不能因为功能名不同、目录不同、任务复杂、又失败一次、或希望“更保险”而新增 Gate。

### 4A.2 明确“不建 Gate”的情况

以下情况不创建产品/领域 Gate：

- Bridge 的 repo/worktree/session/candidate identity、恢复、单写者、权限问题；
- workflow-core 的 Human Gate、review admission、claim/evidence fidelity 问题；
- evidence capture/transport 本身故障；
- validator 自身 bug：修 validator 并把 known-bad 固化；
- environment/设备暂不可用：只留下 coverage gap / UNKNOWN；
- HUMAN_ONLY secret/auth/physical action；
- stale report / wrong candidate / wrong runtime binding。

### 4A.3 新 Gate 的必要条件

只有已有 descriptors 无法覆盖，且至少有一个维度真正改变时，才允许提出新 Gate：

- distinct user capability；
- distinct evidence class；
- distinct normal production entry；
- distinct PASS/FAIL semantics；
- distinct professional owner；
- independent claim surface。

新 Gate 的专业标准仍由 project/domain owner 冻结。workflow-core 只能识别“这里需要一个新标准”，不能自己填 rubric/threshold。

### 4A.4 历史实证

本 Proposal 的 supporting map 已对 286 条基线历史失败逐条映射：

- Lucerna 33；
- Bobbio 32；
- Mica 46；
- SeminarArc 32；
- Asteria 47；
- CUHK Date 56；
- CARE 40。

结果是 46 个 gate family，而不是 286 个 Gate。纯 non-gate cases 只有：

```text
Lucerna L13 / L14 / L23
Mica M41 / M46
SeminarArc S30
```

这 6 条分别属于错误 Human Gate/授权恢复/脏工作所有权、证据工具/机器路径、review-readiness transport，不得制造 project quality Gate。

### 4A.5 首批 project/domain descriptor seed

这 46 个 family 不是中央 registry；它们是 consumer adaptation 时应优先 formalize 的 seed。代表性集合：

- Lucerna：state truth、native actual-surface、environment coverage、install lifecycle、Frontend product coherence、independent release review；
- Bobbio：Zotero isolation、round-trip authority、native Reader、evidence package、Frontend actual surface、independent product review、developer pre-review；
- Mica：acceptance entry、evidence validation、anti-forgery、actual host lifecycle、low-memory benefit、Frontend coherence、independent artifact review；
- SeminarArc：installed black-box flow、Android lifecycle、real media/OCR、visual/accessibility、stress/recovery、research-workflow quality；
- Asteria：browser geometry、mechanical architecture regression、scientific graph truth、scientific visualization readability、whole-product review、deployed surface；
- CUHK Date：registration critical path、credential transition、handoff transaction、web state lifecycle、no-match truth、CI/release truth、product semantics、persona black-box review；
- CARE：F1 formal-entry fidelity、F2 parameter/data causality、F3 scale/population/budget、F4 evidence completeness、F5 resume equivalence、F6 scientific conclusion/ablation.

其中一些已有成熟 runner，一些只有标准/部分实现。Missing-Gate Resolution 必须区分这两者，不把“有概念”冒充 runnable Gate。

## 5. Missing-Gate Resolution v1

| 状态 | 唯一 owner | 自动行为 | 阻塞范围 | 何时需要用户 |
|---|---|---|---|---|
| `AVAILABLE_RUNNABLE` | descriptor 的 domain/project owner | Executor 或既有 project finalizer 自动调用 | 不额外阻塞；按结果决定 | 不需要 |
| `STANDARD_FROZEN_IMPLEMENTATION_MISSING` | project owner（项目 gate）或 domain plugin（领域 gate） | Executor 在同任务实现/更新 project-local runner，并做 old-fail/new-good 或等价 deterministic regression | 阻塞依赖该 gate 的 claim；较低 claim 保留 | 只有实现需要新 secret/physical/high-impact effect |
| `NEW_PROJECT_ACCEPTANCE_CATEGORY` | project owner | 先冻结标准、证据表面、claim scope；然后 Executor 实现 | 只阻塞该新类别覆盖的 claim | 只有真正的新产品选择无法从现有 authority 推导 |
| `REUSABLE_DOMAIN_CAPABILITY_MISSING` | domain plugin | 当前任务可在已冻结 project 标准下先实现 project-local gate；随后进入中央 domain maintenance | 没有合法本地替代时阻塞相关 claim | 只有专业标准本身需要用户/科学负责人决定 |
| `TEMPORARILY_UNRUNNABLE` | gate 的实际 execution owner；长期任务为 project owner/finalizer | 记录 `UNKNOWN` 和恢复 locator；环境恢复后同任务重跑 | 只阻塞依赖该 evidence 的 claim | secret/auth/physical action 或高影响授权时 |
| `HUMAN_ONLY` | project owner 负责分类，真实用户完成动作 | 完成所有独立工作，提出一次最小动作；动作后恢复同任务 gate | 只阻塞依赖该动作的 gate/claim | 必须；但用户动作本身不自动产生 gate PASS |

补充规则：

- HUMAN_ONLY 不是通用质量 gate，不能用“用户看过”替代领域验收。
- 环境暂不可运行不能把已经证明的 `LOCAL_SOURCE` 逆向判失败。
- “标准已冻结但 validator 缺失”默认是 Executor 的同任务工作，不得把用户变成测试作者。
- workflow-core 和 Bridge 不得发明新产品、科学、统计或视觉标准。

## 6. 自动新增和更新 validator

### 6.1 Executor 必须自动处理的情况

满足以下全部条件时，Executor 在当前任务内必须创建或更新 project-local test/check/acceptance runner，无需用户提醒：

1. gate 标准已由 domain/project owner 冻结；
2. 预期行为可机械表达；
3. 可以构造 old-fail/new-good、known-bad/known-good 或确定性不变量；
4. 实现位于当前授权 repo/write scope；
5. 不需要新增 secret、外部付费调用、不可逆操作或专业标准判断；
6. 缺少该 validator 会让同类回归再次逃逸。

典型触发：修复一个确定性 bug 却没有 regression；项目新增一个已有合同覆盖的输入类型；runner entry 移动或输出 schema 变更；adapter 指向的实现不存在/过期。

### 6.2 Executor 不能自动发明的内容

以下内容必须先由对应 owner 冻结：

- 新产品行为与用户体验标准：project owner；
- 跨项目可复用领域标准：domain plugin；
- 科学 estimand、模型假设、promotion/stop criterion：domain/project scientific owner；
- 视觉/文稿/演示的开放式 rubric：对应 domain plugin；
- 新权限、费用、外部数据、部署或资源范围：真实用户授权。

标准冻结后，Executor 可以实现 runner，但不能改变标准来让当前 candidate PASS。

### 6.3 中央提升

project-local validator 只有在以下证据成立时才进入中央 domain Skill/Plugin maintenance：

- 至少一个真实项目 failure 表明它具有跨项目复用价值；
- descriptor 的 applicability 和 evidence class 可以由 domain owner定义；
- 不依赖某项目私有路径/身份；
- 中央实现不会把 project-specific semantics 泛化错误。

中央提升由 domain plugin owner提案，AI Skills Maintainer 负责实现分发和 managed consumer adaptation。当前产品任务不直接修改中央 plugin 来逃避本地完成责任。

## 7. Anti-gaming 与 gate-definition integrity

### 7.1 定义与实现分离

- Gate definition 由 domain/project owner 冻结；
- validator implementation 由 Executor 实现；
- gate invocation 由 Executor 或既有 project finalizer 执行；
- 专业 decision 由 descriptor owner 给出；
- Bridge 只检查 identity、freshness 和结果完整性。

### 7.2 任务内新增 gate 的冻结顺序

```text
owner 冻结 definition/version/rubric/threshold/evidence surface/fixtures
-> workflow-core 把 definition identity 写入 required gate set
-> Executor 实现 runner
-> runner 必须 fail frozen known-bad、pass frozen known-good
-> 执行当前 candidate
-> owner 给出 PASS/FAIL/UNKNOWN
```

如果无法构造已冻结 known-bad，runner 不能成为当前任务的唯一完成依据；必须保留对应 domain/project judgment。

### 7.3 禁止的自证路径

Executor 不得为了 PASS：

- 降低 threshold；
- 删除或换掉 known-bad fixture；
- 把 real/installed/rendered evidence 换成 synthetic/file-exists；
- 缩小 rubric/claim scope；
- 改 descriptor applicability 让 gate 变成不适用；
- 用当前 candidate 生成只对自身成立的 golden；
- 修改 adapter 删除 required gate；
- 将 gate failure 重新标成 infrastructure gap 而无直接证据。

### 7.4 修改授权和失效

- domain descriptor：只有 domain plugin owner 可以修改；
- project descriptor / adapter semantic fields：只有 project owner/冻结 Goal authority 可以修改；
- Executor 可以修改 runner implementation 和 task-owned evidence，但不能修改 definition；
- descriptor、threshold、rubric、fixture identity、runner identity、subject、consumed target 任一 acceptance-relevant 变化，都使旧结果失效；
- 当前任务同时修改 product 和 runner 时，结果必须记录两个独立 identity；
- 当前任务修改 gate definition 时，旧 definition 的 PASS 不得支持新 claim，并必须先经过 owner 审查后重新解析 required gates。

外部实践只选择性采用“证据必须绑定不可变 subject/definition”的原则；不引入 in-toto/SLSA 签名、供应链服务或新的 provenance 控制面。

## 8. Gate execution 与 Gate Result v1

### 8.1 谁实际调用 gate

- 同步 project/domain gate：当前 Executor 调用 descriptor 的正常 `entry_ref`；
- Slurm/长期/异步 gate：已有 project controller/finalizer 调用并在终态产出结果；
- 开放式专业自检：对应 domain plugin/skill 在正常入口中执行；
- HUMAN_ONLY 动作完成后：Executor 恢复同一 gate，不把用户动作本身写成 PASS；
- Bridge 从不成为专业 runner，也不启动第二 scheduler。

### 8.2 默认结果 locator

项目没有既有 result packet 规范时，默认写：

```text
results/<task_key>/delivery_assurance/gates/<gate-id>.json
```

已有 CARE controller packet、Lucerna acceptance JSON、Bobbio audit evidence 等正式项目结果可由 adapter 直接引用，不要求复制成第二份事实源。大文件/render/checkpoint 只在 `evidence_refs` 中引用。

### 8.3 Gate Result v1 最小 schema

```text
schema = delivery-assurance.gate-result/v1
gate_ref
definition_ref
definition_version
definition_digest
owner_ref
execution_entry_ref
runner_identity
invocation_owner
subject_refs[]
consumed_target_refs[]
decision = PASS | FAIL | UNKNOWN
evidence_class
claim_scope[]
reason_codes[]
evidence_refs[]
invalidation_identity
observed_at
```

其中：

- `subject_refs[]` 和 `consumed_target_refs[]` 必须是 typed immutable locator，不能写“current build”；
- `claim_scope[]` 明确该结果支持/阻塞哪些 claim 和 target；
- `reason_codes[]` 用于机械路由，专业解释仍留在 evidence；
- `invalidation_identity` 至少覆盖 definition、runner、subject、consumed target、fixture/rubric 和 descriptor 指定的 relevant environment；
- Bridge 只验证 schema、identity、新鲜度和引用存在性，不把 result prose 重新评分。

## 9. 多产物与跨 repo：Delivery Target Graph v1

### 9.1 为什么不能保留单一 candidate_ref

一个真实任务可能同时产生：

- UI source、backend service、installer、documentation、native runtime；
- model source、config、checkpoint、prediction、aggregation、report；
- 多个 repository 的兼容升级。

单一 `candidate_ref` 无法表达“哪个 gate 检查了哪个对象和哪个用户消费表面”。生产合同因此把 R5 的单一 locator 扩展为 task-local Delivery Target Graph；这不影响 Phase 1 toy probe。

### 9.2 Graph 结构

Delivery Declaration 中保存：

```text
target_nodes[]:
  target_id
  repo_ref
  target_type
  identity
  claim_ceiling

target_edges[]:
  from_target
  relation = BUILDS | PACKAGES | INSTALLS | DEPLOYS | DOCUMENTS | CONSUMES
  to_target
```

每个 required gate 必须绑定明确的 `subject_refs[]` 和 `consumed_target_refs[]`。跨 repo task 使用每个 repo 自己的 adapter，再由冻结 Goal 组合 target graph；不创建全局 consumer registry。

### 9.3 聚合规则

- 一个 target 的 claim 只由绑定该 target/edge 的 required gates 决定；
- aggregate claim 只有在该 claim 所需的全部 target 和关键 edge 通过时才成立；
- 某一 artifact 缺证不能被另一个 artifact 的 PASS 覆盖；
- source 修复不自动证明 installer/live target；
- report PASS 不自动证明 checkpoint 或 scientific result；
- cross-repo 一侧未适配时，整体高层 claim 保持部分完成，但已证明的单 repo 较低 claim保留。

## 10. Adapter 生命周期 v1

### 10.1 ADAPTER.toml 最小语义

```toml
schema = "delivery-assurance.adapter/v1"
project_id = "<stable project id>"
adapter_version = "1"
enabled = true

claim_target_refs = ["..."]
delivery_classes = ["..."]
domain_gate_refs = ["..."]
project_gate_manifest_ref = "automation/delivery_assurance/gates.toml"
normal_entry_refs = ["..."]
long_run_owner_refs = ["..."]
adapter_change_authority = "project:<project-id>"
```

Adapter 只声明可用能力、消费对象和 locator，不保存某个任务的 required gate set 或完成状态。

### 10.2 新 repo 首次启用

唯一语义 owner：project owner。唯一实现 actor：Executor。

```text
project owner 授权启用
-> Executor 检查真实 repo / normal entries / domain plugins
-> 生成 ADAPTER.toml + project gates.toml 草案
-> project owner 冻结 project semantics
-> workflow-core 解析一次 full baseline
-> Bridge 仅校验 schema/locator/identity
```

首次 baseline 可以是 FULL，但这不意味着以后每项任务全量验收。

### 10.3 项目新增能力

当本任务新增一个已有标准覆盖的 target、runner 或 normal entry 时，Executor 必须在同任务更新 adapter。若涉及新产品/科学类别，先由 project/domain owner 冻结 descriptor，再由 Executor 更新。用户不维护 gate 清单。

### 10.4 中央版本与 managed consumer adaptation

- domain descriptor 语义变化：domain plugin owner 冻结；
- workflow-core resolver/schema 变化：workflow-core owner 冻结；
- Bridge adapter/result consumer 变化：Bridge Kit owner 冻结；
- 正式分发、版本发现、update impact 与 required consumer adaptation：AI Skills Maintainer 唯一负责；
- Bridge release/distribution：`bridge-kit-maintainer`；
- managed consumer 更新：`machine-update-orchestrator` 按正式 `release -> CHANGELOG -> ### Update impact` 路由，不从任意 diff/TODO 猜范围。

中央实现完成但 required consumers 尚未适配时，AI Skills Maintenance 项进入 `ADAPTING`；不得称 DONE，也不得要求用户手工修改 adapter。

## 11. Delivery claim levels v1

Delivery claim 采用 target-specific 偏序，而不是一个全局布尔完成：

| Claim | 证明内容 | 典型 required evidence |
|---|---|---|
| `LOCAL_SOURCE` | 当前 repo/worktree 的授权源码改动与局部不变量成立 | deterministic tests、diff/source review |
| `INTEGRATED` | 改动已进入目标组件/分支并从正常集成入口工作 | integration runtime、cross-component checks |
| `ARTIFACT_READY` | exact artifact 已构建/渲染/聚合，且 artifact-level QA 通过 | binary/PPTX/PDF/checkpoint/report identity + domain artifact QA |
| `INSTALLED` | exact artifact 已安装到指定环境并验证安装身份/副作用 | installer identity、installed surface、rollback/cleanup evidence |
| `LIVE` | exact revision/runtime 已在目标真实运行/部署/消费表面工作 | live runtime/service/native interaction evidence |

`INSTALLED` 与 `LIVE` 都高于 `ARTIFACT_READY`，但不是所有产品都要求二者同时存在。Goal 冻结本任务要声称的最大 claim 与 target。

规则：

- 某层缺证只阻塞该层及其依赖的更高层；
- `LOCAL_SOURCE=PASS` 不因 live environment 不可用而变 FAIL；
- `ARTIFACT_READY` 不得冒充 `INSTALLED/LIVE`；
- `USER_READY` / `RELEASE_READY` 是 workflow-core 对本任务目标 claim 的聚合 admission，不是新 claim level；
- 最终报告必须列出每个 target 的最高已证明 claim 和唯一剩余边界。

## 12. 正常用户体验

用户正常只需说：“做这个功能。”

系统路径固定为：

```text
1. Goal/项目 authority 冻结产品目标和最大 claim
2. workflow-core 自动解析 target graph 与 required gates
3. Executor 实现功能
4. 若冻结标准可机械化但 validator 缺失，Executor 同任务自动补 runner
5. Executor / project finalizer / domain plugin 运行 gates
6. FAIL 在原授权与预算内返修；UNKNOWN 按 missing-gate contract 恢复
7. Bridge 验证 task/repo/worktree/candidate/definition/result freshness
8. workflow-core 只发布证据支持的最高 claim
9. 用户收到短 completion，而不是 gate 清单维护工作
```

只有以下情况打断用户：

- 真正新的产品或科学选择没有 authority；
- secret/auth/physical action；
- 高影响、付费、外部、不可逆或权限扩大；
- 最终主观产品接受本身被 Goal 定义为 HUMAN_ONLY。

普通 test 编写、validator implementation、adapter 更新、gate 执行、证据整理和同范围返修都不应询问用户。

## 12A. Resolver 历史回放：生产化前的硬验收

v0.1 的 Resolver 仍可能只在纸面上成立。v0.2 冻结一条 implementation acceptance：Resolver 必须能在真实历史任务上复现人工映射。

首批 replay corpus 不需要把 286 条全部变成 runtime fixture；按 gate family 选择代表性真实案例，但必须覆盖全部 46 family，并额外覆盖 6 个 pure non-gate cases。

每个 replay 输入至少包含：

```text
frozen task/claim
change impact
target graph
available descriptors
existing regression banks
environment/authority facts
```

输出必须满足：

1. 选择到人工映射对应的 gate family；
2. 不额外运行无关 full/broad gates；
3. 同类新失败得到 `ADD_REGRESSION` 而不是 `NEW_GATE`；
4. L13/L14/L23、M41/M46、S30 这类 non-gate case 不生成产品 Gate；
5. standard frozen but runner missing 时得到 `STANDARD_FROZEN_IMPLEMENTATION_MISSING`；
6. genuinely new professional standard 时只返回 owner/action，不由 workflow-core 发明内容；
7. 结果绑定正确 target/claim level。

如果 Resolver 在这组历史回放上频繁需要手工特判 repo 名或 case ID，说明 descriptor/applicability 设计失败，不能进入生产。

## 13. 完整责任矩阵

| 事项 | 唯一 authority owner | 实际 actor | 明确不负责 |
|---|---|---|---|
| 任务最大 claim、项目 target graph、项目产品语义 | Project owner | Planner/项目合同形成；Executor materialize | Bridge/domain plugin 不替项目决定发布范围 |
| 可复用领域 descriptor 与专业标准 | Domain plugin | Domain maintainer | workflow-core/Bridge 不发明标准 |
| Project-local descriptor 与 adapter 语义 | Project owner | Executor 按冻结标准生成/更新 | 用户不维护 gate 清单 |
| Domain descriptor 的正式分发 | AI Skills Maintainer | generator/release/update route | 不修改专业判定 |
| Required Gate Resolver 与 admission | `workflow-core` | workflow-core normal entry | 不执行专业 runner，不维护 Git/runtime |
| Mechanical validator implementation/update | Executor | 当前任务 Executor | 不改变 definition/rubric/threshold |
| 同步 gate invocation | Executor | 当前任务 Executor | 不拥有专业标准 |
| 长期/Slurm gate invocation 与终态 accounting | Project owner | 既有 controller/finalizer | Bridge 不轮询、不重提 job |
| Reusable domain PASS/FAIL/UNKNOWN | Domain plugin | domain self-QA/reviewer normal entry | Executor 自报不能替代开放式判断 |
| Project-specific PASS/FAIL/UNKNOWN | Project owner | project validator/native acceptance/finalizer | workflow-core 不重评分 |
| Repo/worktree/session/turn/candidate/result freshness | Bridge | Bridge runtime | 不选择 gate、不判断专业质量 |
| Gate completeness 与最高 claim 聚合 | `workflow-core` | workflow-core admission | Bridge 不发布专业 claim |
| Managed consumer adaptation | AI Skills Maintainer | machine-update-orchestrator + owning maintainer + consumer Executor | 用户不手工同步版本矩阵 |
| Human-only 动作分类与最小中断 | Project owner | workflow-core W2 + current task | 用户动作不自动生成 PASS |

## 14. 三个端到端例子

### 14.1 Lucerna UI / native release

用户请求：“修复 Longleaf 状态传播并让界面可交付。”

Delivery Target Graph 至少包含：

```text
source@commit
frontend bundle@identity
desktop binary@hash
native runtime@pid/release identity
可选 installer@hash（仅安装行为在 scope 时）
```

Resolver 选择：

- deterministic state propagation regression：若缺失，Executor 自动增加 old-bad/new-good；
- Frontend Design actual-surface / producer self-QA；
- Lucerna project native interaction、visual/copy/state/notification gates；
- installer gate 只在 installer/startup side effect 改动时加入。

普通 build/test 只能支持 `LOCAL_SOURCE` 或部分 `INTEGRATED`。exact release 通过 `scripts/acceptance-preflight.ps1`、真实 panel capture/model inspection、fresh independent product review后，才支持对应 `ARTIFACT_READY` / `LIVE`。fixture visual 不能替代 real release。若 Windows visual channel 暂不可用，只阻塞 actual-surface claim；已通过的源码回归保留。

### 14.2 CARE / 科研长任务

用户请求：“完成一个需要 Slurm 训练、聚合和统计判断的 CARE milestone。”

Target Graph 可能包含：

```text
source/config@commit
Slurm job set@job ids
checkpoints@digests
predictions/aggregation@digests
controller packet@commit
scientific report@artifact identity
```

Resolver 选择：

- CARE project execution contract、terminal accounting、strict validator、known-bad regression；
- 适用的 statistical/modeling descriptor：estimand、假设、训练/eval scale、诊断、敏感性或 scientific claim；
- report/citation gate 只在最终 claim 包含正式科研文档时加入。

CARE controller/finalizer 是长期 gate invocation owner。Bridge 看到 `PENDING/RUNNING/NEEDS_MONITOR` 时只记录 `WAITING_EXTERNAL_OWNER`，不启动第二 scheduler。source/config 的 `LOCAL_SOURCE` 可以先成立；checkpoint/report/scientific claim 保持 `UNKNOWN`，直到 job terminal、aggregation、validator 和专业科学 gate 完成。`controller_verification_decision=VERIFIED_COMPLETE` 只证明当前任务 operational contract，不自动授权下一 Batch、hosted metric、route promotion 或最终科学结论。

### 14.3 普通小后端修复

用户请求：“修复一个解析器把空字段误判成有效状态的问题。”

实际改动只影响一个 backend module 和一个 integration path，无 UI、installer、artifact render、scientific claim 或 shared schema 变化。Resolver 选择 `TARGETED`：

- existing unit/integration gate；
- 若没有 regression，Executor 自动创建 frozen old-bad/new-good test；
- 一个 should-not-change 反例；
- 不启动 Frontend、Presentations、Research Authoring、full native acceptance 或 external reviewer。

通过后可声明 `LOCAL_SOURCE`；若真实 integration entry 也运行通过，则声明 `INTEGRATED`。任务未要求 package/install/live，系统不伪造更高 claim，也不因未跑 UI 全套而把已证明的 backend 结果判失败。

## 15. 当前架构剩余未决项

### 15.1 已由现有正式合同解决

| 问题 | 现有 locator | 本 Proposal 处理 |
|---|---|---|
| Hook 同任务返修、Interrupt、单写者、权限不扩张 | R5 Proposal/Goal/Critic PASS | 不重开 |
| Local Review 是否成为 Bridge workflow | Bridge `docs/TODO_LOCAL_AUTONOMOUS_ACCEPTANCE_WORKFLOW.md` | 保持 CLOSED |
| workflow completion、人类 gate、证据、重复失败、should-not-change | workflow-core `SKILL.md` W1–W5 | Resolver 消费 |
| narrow/broad/full 与 final candidate | `PLUGIN_CAPABILITY_GATE_POLICY.md` | 具体化为 resolver 规则 |
| Frontend actual surface / producer self-QA | Frontend Design production source F-C/F-D | 作为 domain descriptors 来源 |
| Presentation 最终逐页 render QA | Presentations authoring contract/runbook | 作为 domain descriptors 来源 |
| Research final artifact/evidence/citation QA | paper flow + Research Authoring 059 Plan | 作为 domain descriptors 来源 |
| 统计/模型非视觉 completion boundary | Statistical Analysis completion/validation | 作为 domain descriptors 来源 |
| Bridge runtime/recovery 与长期 owner 边界 | Bridge AGENTS、Review v0.5、0.11 execution plan | Bridge 只消费结果 |
| 中央 release/update/adaptation | machine-update-orchestrator、bridge-kit-maintainer、`### Update impact` | 不建新版本矩阵 |

### 15.2 本 Proposal 冻结后仍需实现验证，但不再是架构空白

1. AI Skills plugin manifest/generator 对 `delivery_assurance.gate_capabilities` 的实现；
2. workflow-core Resolver 的代码/Skill 实现与测试；
3. Bridge 对 Adapter v1、Target Graph v1、Gate Result v1 的 parser/validation；
4. 首批 domain descriptors：Frontend、Presentations、Research Authoring、Statistical Modeling；
5. Lucerna、CARE、Bobbio 的 adapter 与真实 normal-entry mapping；
6. cross-repo composition 的代表性 fixture 和 should-not-change regression；
7. AI Skills managed consumer adaptation 进入 `ADAPTING` 后的 exact consumer set。

这些项目都有明确 owner，不需要用户选择架构。实现发现 schema 无法由现有 plugin generator/Bridge normal entry承载时，必须回 Planner/Critic，不得静默增加 registry/daemon。

### 15.3 仍然独立待证

- R5 Phase 1 Hook probe 是否 GO；本 Proposal没有新证据改变它。
- 各 domain/project 的具体 threshold、rubric、fixture、runner command 和环境覆盖；这些属于相应 owner 的 descriptor/consumer adaptation，不应在中央合同中硬编码。
- 首批 managed consumer 的 exact machine/repo locator；只有进入 adaptation 且获得对应 bounded authority 后才能冻结，不能猜测。

## 16. Phase 2 前必须冻结与 consumer adaptation 可后定内容

### 16.1 Phase 2 Bridge 实现前必须由本 Proposal/Critic 冻结

- descriptor discovery 只来自 installed/enabled plugin manifest + project adapter；
- Gate Capability Descriptor v1 最小字段与 definition identity；
- Gate Result v1 最小 schema、decision 和 invalidation identity；
- Delivery Target Graph v1、多 subject/target 绑定；
- Adapter v1 路径与“不保存任务状态”边界；
- claim levels 与部分完成规则；
- Missing-Gate 状态及 claim-blocking 语义；
- anti-gaming、definition change authority 与 stale evidence 规则；
- Bridge 只消费冻结 required gates/result，不成为 resolver/runner；
- workflow-core 是 Resolver/admission owner；
- 不建 registry/database/daemon/new workflow。

Phase 2 Bridge 只实现这些稳定接口的机械部分；不能先写 Bridge 再让 consumer 反向定义语义。

### 16.2 Consumer adaptation 时可以确定

- 每个项目的具体 `claim_target_refs`；
- project-local gate 列表和 runner 路径；
- domain gate 的 applicability 收窄；
- threshold/rubric/known-bad fixture；
- Lucerna/Bobbio native environment identity；
- CARE finalizer/job/result locator；
- 哪些 optional surface 是当前 task claim 所必需；
- first/full baseline 后各类任务的 targeted/broad 选择实例。

这些内容由 project/domain owner 冻结，不需要修改中央 schema。

## 17. 实施后的 Capability Gate Matrix

| Gate | 证明的真实能力 | 正常入口 | PASS 证据 | 失败条件 | should-not-change |
|---|---|---|---|---|---|
| `DAC-G01` | installed domain descriptors 可发现且 owner/version 可验证 | 正常 plugin installation/discovery | manifest locator、definition identity、disabled/uninstalled negative | 靠全库扫描或静态清单冒充 installed capability | 普通 plugin 无 descriptor 不受影响 |
| `DAC-G02` | Resolver 选出最小但充分 gates，并正确判断是否需要新 Gate | 普通 feature Goal + 历史 replay corpus | 覆盖 46 个 gate family 的代表历史案例与 6 个 non-gate case；同类失败进入 regression，不按复杂度一律 full | 复杂任务一律 full、漏 surface、或给 workflow-only case 造产品 Gate | 已隔离小任务保持轻量 |
| `DAC-G03` | Missing-Gate 自动路由不把用户当测试作者 | 缺 runner/环境/HUMAN_ONLY 场景 | 每类状态到唯一 owner/claim block | workflow-core 发明标准或无条件问用户 | 较低 claim 保留 |
| `DAC-G04` | 可机械 validator 自动补齐 | 一个真实 old-bad/new-good 缺口 | Executor 同任务实现、known-bad fail、new-good pass | 只写测试文件或放宽预期 | 原有合法行为通过 |
| `DAC-G05` | Gate definition 不可被 Executor gaming | product + validator 同改任务 | definition/runner/fixture/candidate 独立 identity，修改后旧证据失效 | 降阈值/换 fixture/删 gate 获 PASS | owner authority 不变 |
| `DAC-G06` | Gate Result 能绑定多产物和消费表面 | UI+backend+installer 或 model+checkpoint+report | subject/target arrays、claim scope、evidence refs | 单一含糊 candidate 覆盖全部 | 单产物任务仍简洁 |
| `DAC-G07` | 分层 claim truthful | local source pass、live 缺证场景 | 较低 claim PASS，高层 UNKNOWN | 高层缺证把全部判 FAIL，或低层冒充 live | 旧 claim 只在相关变化时失效 |
| `DAC-G08` | Adapter 生命周期无需用户维护 | 新 repo + 新 capability + central update | Executor bootstrap/update、Maintainer ADAPTING closure | 用户手工 gate list、版本矩阵漂移 | 项目自定义入口保留 |
| `DAC-G09` | Bridge/workflow/domain 权威不串位 | Stop admission | Bridge 只做 identity；workflow-core resolve；owner judge | Bridge 评分 UI/科研或 domain 管 Git/runtime | Review/Control/Persistent Run 不变 |
| `DAC-G10` | 多种真实 consumer 的 gate family 分解能落到现有正常入口 | Lucerna、CARE、Bobbio、Mica、SeminarArc、Asteria、CUHK Date 中的代表任务 | 真实项目 family descriptor 能被发现、targeted 选择、运行或诚实标 implementation missing | 只对 UI、只对 deterministic test、或靠项目名硬编码 | 无新 scheduler/daemon/registry |

最终实现必须由同一 final candidate 通过适用 gates；开发期 fixture 不能拼成 release PASS。

## 18. 非目标

本 Proposal 明确不做：

- 修改或暂停 R5 Phase 1；
- 新 Gate registry 数据库、在线服务或全局 consumer catalog；
- 新 daemon/watcher/controller/workflow；
- 在 Bridge 中运行/评分专业 gate；
- 让 workflow-core 发明产品/科学/统计/视觉标准；
- 所有复杂任务一律 full gate；
- 每个任务强制 fresh reviewer；
- 用 schema/receipt/file existence 代替真实专业 QA；
- 让用户维护 adapter 或 gate 清单；
- 让 Delivery Assurance 成为第二 Slurm owner；
- 在本设计轮次实施 Bridge、AI Skills 或 consumer 代码。

## 19. 维护跟踪边界

本文件仍是 `AI_Research_Toolkit` 的生产架构 Proposal，不是 AI Skills implementation handoff。`workflow-core` TODO 的正式 tracking mutation 必须在本 Proposal获得 Critic PASS、进入中央实现 Plan 时完成，并遵守 `AI_SKILLS_MAINTENANCE_BOARD.md`：创建/复用 tracking Issue、写 `tracking: #N`、进入 `DOING`、记录当前执行锚点和下一步。

当前 Planner surface 没有可证明的 Clear Writing invocation + GitHub Project field mutation 组合，因此本轮不伪称已创建/同步维护卡片，也不要求用户手工操作。下一 Project-capable AI Skills Maintainer 入口的 exact pending mutation 是：

```text
source entry: docs/plugin-todos/workflow-core.md
heading: Final delivery must consume domain-owned self-QA before user-ready completion
action: create or reuse one top-level maintenance Issue
suggested title: 交付保障：补全领域验收能力的发现、选择与维护合同
label: maintenance-track
Area: workflow-core
Status: DOING
current anchor: this Proposal v0.1 + eventual Critic review
next action: after Critic PASS, prepare Phase 2/3 implementation Plan
source backlink: tracking: #N
```

必须先真实调用 Clear Writing 再写 reader-facing Issue；Project 未同步前保持诚实 pending。

## 20. 外部实践核查与采用决定

本轮只做两项针对性外部核查：

1. in-toto/SLSA 的 `subject + digest + predicate type` 证明成熟实践会把结果绑定到不可变对象与明确声明类型；本 Proposal选择性采用多 subject identity 与 definition/result version，不采用签名、供应链 attestation 服务或新的 provenance 控制面。
2. GitHub required checks 绑定最新 commit SHA，说明旧候选 PASS 不能自动支持新 commit；但 status check 只能证明对应 job 状态，不能替代 domain-owned UI/科研/文稿判断。因此本 Proposal保留 candidate freshness，同时不把 CI 变成专业 gate owner。

参考：

- https://in-toto.io/Statement/v1
- https://slsa.dev/spec/v1.1/provenance
- https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks

## 21. 唯一合法下一步

1. 本 Proposal v0.2 supersedes v0.1；v0.1 与其 Critic prompt 保留为历史草案，不再作为待审对象。
2. 在用户确认这份历史逐条映射足够可信后，再由独立 Critic 对本 Proposal v0.2 做 `PRODUCTION_CONTRACT_DESIGN_REVIEW_V0_2`；
3. Critic 只给 `PASS` 或 `REVISE`，重点审合同是否完整、过重、可实现、可被 gaming，以及历史 Failure-to-Gate 映射是否支持 Resolver 设计；
4. PASS 只批准生产合同设计，不授权 Phase 2/3 实现；
5. R5 Phase 1 继续使用其独立批准入口，不等待本 Proposal；
6. 后续实施必须另形成同版 Implementation Plan / Goal / Kickoff 并再次经过 execution-ready Critic。

# Delivery Assurance Production Contract Completion — Proposal v0.4

Status: **PLANNER REVISION CANDIDATE / DESIGN CRITIC REQUIRED / NOT IMPLEMENTATION AUTHORIZATION**  
Date: 2026-10-19  
Target repository: `YuukiAS/AI_Research_Toolkit`  
Source branch: `research/software-production-decision-20261013`  
Design topic: `software-production--delivery-assurance`  
Review stage: `PRODUCTION_CONTRACT_DESIGN_REVIEW_V0_4`

## 0. 本轮结论

v0.3 的公共内核不推翻；v0.4 补齐它没有正式冻结的七仓接入、adapter 单调性、权威来源漂移恢复、逐仓声明上限、逐仓正常入口 Gate，以及仓库 `AGENTS.md` 的维护责任。

这次返修之后，后续实现者不再需要自行决定：

- 每个仓库最终要验什么；
- 从哪个正常入口验；
- 谁拥有专业结论；
- 什么时候新增 Gate、什么时候只加回归；
- Gate 多时跑局部、产品族还是完整覆盖；
- adapter 漏一项时怎么办；
- 权威文件冲突时信谁；
- 谁整理 `AGENTS.md`；
- 哪些事情必须由用户完成；
- 哪一层证据最多支持什么声明。

本 Proposal 仍不授权生产实现，也不冻结 `da/1`。正确终点是：v0.4 进入一次独立设计 Critic，结论只允许 `PROCEED / REVISE`。

## 1. 当前事实和治理基线

### 1.1 Phase 1

```text
PHASE1_CLOSED=YES
PHASE1_VERDICT=GO
HOOK_MAIN_CHAIN=PASS
PRODUCTION_IMPLEMENTATION_STARTED=NO
PHASE2_IMPLEMENTATION_AUTHORIZED=NO
```

Phase 1 只证明受测 `codex-cli 0.160.1` 的受信任项目级 Stop Hook 可以在同一 session/worktree 内拦截假完成，执行一次有界 continuation，并在 fresh PASS 后正常结束。它没有证明生产 Bridge、`workflow-core`、领域描述、consumer adapter 或 release 已接通。

### 1.2 当前治理

- `YuukiAS/AI_Skills_Collection@ba86b75cc561ebc3faf1d46b7695f45a9c20b2cc`
- Planner Role Contract `1.7`
- Critic Role Contract `1.7`
- Plugin Capability Gate Policy `1.2`
- AI Skills Maintenance Board current main
- `YuukiAS/GPT_Codex_AI_Bridge_Kit@bc94e41f44bd5b534d8ab8caa304114b8bf90685`

设计阶段 Critic 只给 `PROCEED / REVISE`；唯一 `PASS + READY_FOR_CODEX=YES` 只能在以后完整 execution-ready package 审查时出现。

### 1.3 Critic 结论

v0.3 全七仓复核结论为 `REVISE`。本轮全部接受以下 finding：

1. 七仓覆盖尚未成为正式接入合同；
2. adapter 可以通过遗漏削弱义务；
3. authority locator 漂移缺少恢复闭环；
4. `DA-G10`–`DA-G15` 只有公共分组，没有七仓正常入口实例；
5. HUMAN_ONLY 与 claim ceiling 没有逐仓冻结。

此外，用户指出“谁负责整理 AGENTS”仍未讲清。本轮把它纳入正式架构，而不是留作实现细节。

## 2. v0.4 冻结包与唯一权威

v0.4 的完整设计由以下文件共同组成，所有 locator 均在当前 research branch 上：

1. 本 Proposal：范围、公共规则、依赖顺序和审查边界；
2. `DELIVERY_ASSURANCE_SEVEN_CONSUMER_ADOPTION_ANNEX_V0_1_20261019.md`：七仓正式接入合同；
3. `DELIVERY_ASSURANCE_AGENTS_LIFECYCLE_AND_PIE_0_3_REQUIREMENTS_V0_1_20261019.md`：AGENTS owner 与 PIE 0.3 合同；
4. `DELIVERY_ASSURANCE_BOBBIO_STATUS_AUTHORITY_RECOVERY_CONTRACT_V0_1_20261019.md`：Bobbio authority recovery；
5. `DELIVERY_ASSURANCE_PROBLEM_COVERAGE_AND_ARCHITECTURE_PROOF_V0_1_20261019.md`：83/363 问题覆盖和反例证明；
6. v0.3 中 C01–C20 的公共内核，仅在与本 Proposal 不冲突的范围继续有效。

优先级固定为：

```text
v0.4 main Proposal
→ seven-consumer annex / AGENTS contract / Bobbio recovery
→ v0.3 C01–C20 unchanged public-core clauses
→ historical research and maps
```

后续实现者不能在这些文件之间自行选择。若出现语义冲突，停止并回 Planner/Critic；不能取“更严格”“更容易实现”或“文件更新”的一份。

## 3. 公共职责保持不变

| 层 | 唯一职责 | 明确不负责 |
|---|---|---|
| Bridge Kit | task/repo/worktree/runtime/candidate/target/result identity、新鲜度、Stop、恢复和短寿命机械状态 | 不选择专业 Gate，不判断 UI/科研质量，不调度 Slurm |
| `workflow-core` | 发现能力、合并影响、解析必需义务、决定 Gate 范围、路由缺项、聚合可声明范围 | 不发明产品/科学标准，不维护 Git/runtime |
| domain plugin | 跨项目专业标准与 PASS/FAIL/UNKNOWN | 不推进项目任务，不决定项目未知语义 |
| consumer project owner | 项目目标图、项目标准、adapter、claim ceiling、项目正常入口 | 不降低领域最低标准 |
| Executor | 实现功能、实现已冻结的机械 validator、运行正常入口、采集证据和同范围返修 | 不改标准、rubric、threshold 或 owner 来获得 PASS |
| AI Skills Maintainer | 中央能力生成、正式 release、`Update impact`、managed adaptation | 不替 consumer 宣布实机通过 |
| 原 Lite/Review/Control/项目 controller | 任务状态、预算、等待、恢复和合法 completion | 不被 DA 替换成第二状态机 |
| 用户 | 不可推导的产品/科学选择与真实高影响授权 | 不维护 Gate、adapter、AGENTS 或 locator 清单 |

不建立中央 Gate registry、数据库、daemon、第四 workflow、第二可写 DONE，也不恢复 Local Autonomous Acceptance。

## 4. Gate 的发现、内容和新增规则

### 4.1 能力发现

`workflow-core` 从当前已安装、已启用的 domain package root 读取固定的 `delivery-assurance/gates.toml`，再读取项目：

```text
automation/delivery_assurance/ADAPTER.toml
automation/delivery_assurance/gates.toml
```

不要求平台原生理解自定义 `plugin.json` 字段；不扫描任意 home；未启用插件不自动启用；必需能力找不到时进入 missing-capability 路由，不能当作“不需要验收”。

### 4.2 Gate 内容从哪里来

优先级固定为：

```text
frozen Goal/Plan
→ project canonical contract / AGENTS / accepted design
→ domain formal contract
→ verified historical regression / known-bad
→ implementation mechanics
```

最后一层只能实现，不能创造语义。每个 Gate 至少冻结 owner、适用条件、subject/consumed target、normal entry、证据三轴、PASS/FAIL/UNKNOWN、回归库、known-bad、should-not-change、失效规则、权限/费用/长期运行需求和 claim scope。

### 4.3 什么时候新建 Gate

比较六个维度：

```text
capability
证据要求
normal entry semantics
professional owner
failure semantics
claim scope
```

已有 family 能完整表达：`NEW_GATE=NO`，只允许 add regression、harden validator、add evidence。

已有 family 无法表达至少一个实质维度：由对应 project/domain owner 先冻结新标准，再由 Executor 实现。功能名、目录、按钮、版本、错误码和“任务复杂”本身不构成新 Gate。

## 5. Adapter 单调性与遗漏检测

### 5.1 有效义务只取并集，不能相减

```text
effective_obligations =
  domain_minimums
  ∪ project_canonical_contract
  ∪ frozen_goal
  ∪ actual_change_impact
  ∪ should_not_change
```

项目 adapter 可以：

- 增加项目义务；
- 绑定项目参数和真实目标；
- 把通用 capability 映射到项目入口；
- 收窄“这个 Gate 具体检查哪个真实对象”。

项目 adapter 不可以：

- 删除领域最低标准；
- 把必需 Gate 改成可选；
- 用低 fidelity evidence 替换真实表面；
- 删除 sibling target；
- 把 unknown 变成 `NONE`；
- 通过移动 locator 继续复用旧证据。

### 5.2 未映射变化

任何可能影响产品、产物、科研结论、安装、部署、设备或用户表面的未映射变化都得到 `UNKNOWN_IMPACT`，沿已知依赖扩大到相应闭包。局部关系已知时用 BROAD；项目级 applicability 不确定时用 FULL coverage，并同时要求修 adapter。FULL 不能把 unknown 自动变 PASS。

### 5.3 七仓遗漏变异

每个 consumer 必须从普通任务入口证明：

- 删除一个必需 Gate；
- 删除一个 consumed target；
- 把 locator 指向旧文件；
- 删除 nested AGENTS scope；
- MUST→SHOULD；
- milestone/version 提升后保留旧 PASS；
- 制造权威冲突；

都会拒绝 `USER_READY`。这属于各仓 `DA-G11-*`，不能只跑 schema 单测。

## 6. Gate 范围：什么时候局部、产品族或完整覆盖

事实输入固定为：frozen Goal/claim、Delivery Target Graph、adapter impact rules、批准基线到当前候选的完整 diff、dependency closure。

| 范围 | 适用条件 |
|---|---|
| `NONE` | 没有 acceptance-relevant 变化、没有 claim 提升、已有证据仍有效且影响完整可确定 |
| `TARGETED` | target/依赖闭包可稳定隔离；不改 shared runtime/schema/router/generator/adapter/gate definition；不影响 sibling target |
| `BROAD` | 共享依赖或 validator/adapter 定义变化；多个 sibling target 受影响；局部 Gate 无法覆盖 blast radius |
| `FULL` | 首次接入、whole-product release/installed/live claim、cross-repo aggregate、多 artifact 无法安全拆分、历史证明同一整体 claim 的局部验收漏检、项目级 applicability 因 schema/adapter 漂移不可确定 |

FULL 表示完整义务覆盖，不等于每次重跑所有测试、设备和机器。仍有效且满足 exact identity/invalidation 的证据可以复用。Gate 数量、代码行数、耗时和模型说“复杂”都不是 FULL 触发器。

## 7. 权威来源、AGENTS 和 locator 生命周期

### 7.1 Canonical authority set

每个 adapter 必须记录：

```text
canonical_authority_set[]:
  field_or_scope
  authority_ref
  canonical_locator
  branch_or_release_scope
  content_digest
  supersedes[]
  effective_from
```

定位文件缺失、移动、冲突或语义变化时返回 `ADAPTER_STALE` / `STATUS_AUTHORITY_CONFLICT` / `INSTRUCTION_AUTHORITY_CONFLICT`，相关 claim 为 `UNKNOWN`。

语义不变的 locator 移动由 Executor 或 Maintainer 在原任务中机械修复；产品/科学语义冲突返回 project/domain owner。用户不维护 locator 清单。

### 7.2 谁整理 AGENTS

责任固定为：

- project owner 决定长期规则的语义；
- `workflow-core` 判断当前任务是否触发 AGENTS 维护；
- 当前 Executor 调用 PIE 0.3 生成、更新、去重和提交；
- PIE 0.3 只投影已冻结 authority，输出 preview、clean AGENTS、authority map 和 coverage report；
- Bridge 只验证实际加载的 AGENTS/mandatory source identity；
- AI Skills Maintainer 负责 PIE 0.3 的中央实现、release 和 managed adaptation；
- 用户不整理 AGENTS。

触发条件包括首次 DA 接入、root/nested AGENTS 缺失、authority/entry/adapter/Gate/claim owner 变化、locator 移动、规则冲突、真实失败证明规则未消费、AGENTS 复制膨胀，以及正式 `Update impact` 要求适配。普通局部 bug、单个回归样本或纯 receipt 不触发。

AGENTS 只保留在行动前必须知道的稳定路由、authority、权限/安全/隐私、locator 和 should-not-change；详细 Gate rubric、fixture、历史事故和 task state 留在 canonical sources。

PIE 0.3 是独立 AI Skills maintenance task `project-instructions-editor--0.3-agents-authority-maintenance`，不在本 Proposal 中实施。

## 8. Validator 生命周期与防止自签

标准已冻结、机械实现缺失或有 bug：Executor 在同一任务实现/修复 validator，并运行正确样本、真实坏例和缺关键观察的校准。

标准本身缺失：返回 project/domain owner；`workflow-core` 和 Bridge 不发明标准。

Executor 不得通过改 threshold、rubric、golden、fixture、applicability、adapter、evidence surface 或 claim scope 获得 PASS。任何标准变化必须有 semantic diff、旧标准结果、变更理由和 authority freeze。runner/collector 错误可能要求补采；rubric 变化在 raw evidence 仍可靠时可以重新判分。raw evidence 和 judgment 分开失效。

## 9. 结果、目标图和分层声明

结果使用 `da/1` 候选合同，绑定：task/workflow、run、Gate definition、adapter digest、candidate/source-set、多个 subject/target、normal entry、runner/fixture/rubric、environment、decision、reason、covered/missing obligations、evidence refs、observer provenance、scope、cost/time 和 claim support。

证据分三轴：

- modality：源码、结构化 runtime、实际表面、交互轨迹、渲染产物、因果干预、受保护观察；
- fidelity：synthetic、controlled runtime、host-derived、actual installed/deployed、physical device、scientific population；
- observer：producer self-QA、independent review、protected observation。

目标图分别表达 source、build、package、installed instance、deployed runtime、dataset、checkpoint、prediction/GT、report/document。一个节点 PASS 不能代签其他节点。

claim 是 `(target_set, capability_set, environment, time_window, level)`：

- `LOCAL_SOURCE`
- `INTEGRATED`
- `ARTIFACT_READY`
- `INSTALLED`
- `LIVE`

某层缺证只阻塞该层及其依赖的更高声明，不把已证明的低层结果倒判失败。`USER_READY` 只是本任务承诺目标全部满足后的聚合，不是新证据等级。

## 10. 七仓正式接入

`DELIVERY_ASSURANCE_SEVEN_CONSUMER_ADOPTION_ANNEX_V0_1_20261019.md` 是 v0.4 normative annex。它已经为七仓冻结：

- exact source ref；
- consumed-target graph；
- normal entry；
- operational/professional/environment/human owner；
- 复用的 validator/controller/review；
- DA-only responsibility；
- 正向链；
- 最高风险负向链；
- same-task recovery；
- HUMAN_ONLY；
- claim ceiling；
- adapter owner/complexity；
- omission/authority mutation；
- `DA-G10`–`DA-G15` consumer instances。

七仓未完成实际接入前，不能称完整 Delivery Assurance 已生产可用。

## 11. 逐仓 HUMAN_ONLY 与声明上限

- Lucerna：OS/foreground/secret 和最终产品接受；Hook 不代签 native/Windows isolation。
- Bobbio：不可自动化 GUI 或最终产品判断；authority conflict 不转嫁给用户整理。
- Mica：最后一次真实登录态/低功耗设备观察；synthetic/E2E 不能声明真实性能收益。
- SeminarArc：真实麦克风、相机、OEM/后台和 production signing/Play；Emulator 不代签。
- Asteria：GPT Work 通过后的最终产品接受；用户不是第一轮视觉审查。
- CUHK_Date：一次 Parent Work 和 founder go/no-go；真实 Matching 是新的单独授权。
- CARE：新资源/外部上传/路线晋升与不可推导科学取舍；terminal run 不代签科学结论。

所有可由 Executor、项目 owner 或领域能力完成的普通 QA 必须先做完。

## 12. 七仓公共 Gate 与实例 Gate

公共 `DA-G10`–`DA-G15` 只定义能力族；正式验证必须同时包含七仓实例：

- `DA-G10-<consumer>`：正常入口能解析正确 Gate，且局部任务不被全量升级；
- `DA-G11-<consumer>`：遗漏/旧 locator/authority conflict fail closed；
- `DA-G12-<consumer>`：有外部 owner 时保留等待、terminal、resume，不重复运行；
- `DA-G13-<consumer>`：既有工作流、权限和恢复不被破坏；
- `DA-G14-<consumer>`：exact final consumed target 经过专业 QA；
- `DA-G15-<consumer>`：正式 release/update 后 installed/loaded identity、fresh session 和 normal entry 成立。

每仓至少一条完整正向链和一条最高风险负向链，绑定同一 consumer final candidate，并带 should-not-change。schema/unit/receipt 不能代替。

## 13. Bobbio authority recovery

`DELIVERY_ASSURANCE_BOBBIO_STATUS_AUTHORITY_RECOVERY_CONTRACT_V0_1_20261019.md` 是 Bobbio consumer 前置。必须先证明：

- 修复前 Resolver 返回 authority conflict；
- `develop` 选择正确 0.3.0 合同；
- accepted 0.2.0 evidence 不能满足 0.3.0 claim；
- locator 移动可机械修，语义冲突回 project owner。

这不阻塞公共 v0.4 设计审查，也不允许中央 Resolver硬编码 Bobbio 文件名。

## 14. 对全部历史问题的证明

`DELIVERY_ASSURANCE_PROBLEM_COVERAGE_AND_ARCHITECTURE_PROOF_V0_1_20261019.md` 是问题覆盖证明。它把七仓历史类别、Critic 12 个攻击面和“谁维护 AGENTS/adapter/validator/locator/claim”等容易问穿的问题逐项绑定到本 Proposal 的 owner、正常入口、Gate 和恢复路径。

GPT Work 的方法学结论保持：

```text
A=PASS
B=PASS
C=FAIL
```

C 只表示当时没有形成严格盲独立一致性证明，不表示 C01–C20 或 v0.4 架构失败。本轮不再做全面盲 363 研究。

## 15. Bridge 0.11 与 DA 边界

当前 Bridge 0.11 scope reset 与 DA 是独立任务。DA 不进入已有 `bridge-core--product-scope-reset` 执行包，也不依赖正在删除的 app-server reader、Progress thread、persistent Codex thread、worktree exchange 或跨 workflow event bus。

v0.4 Critic `PROCEED` 后，公共 `da/1` interface freeze 可先形成；Bridge DA lane 的实际 production base 必须是届时 current、已批准的 scope-reset surviving surface。Bridge 和 `workflow-core` 分别准备独立 Proposal/Plan/Gate，不互相代签。

## 16. 实现顺序

```text
v0.4 design Critic PROCEED
→ freeze public da/1 including adapter monotonicity, authority freshness, AGENTS lifecycle and claim ceilings
→ minimal workflow-core resolver || minimal Bridge identity/Stop integration
→ Asteria low-cost complete vertical chain
→ repair common core from real-chain evidence
→ Lucerna native chain || CARE scientific long-run chain
→ Bobbio after status-authority recovery
→ Mica + SeminarArc + CUHK_Date remaining adaptation
→ seven-consumer fresh-session normal-entry closure
→ AI Skills formal release / Update impact / managed adaptation
```

唯一 fallback：实施前检证明 Asteria fixed public environment 在批准窗口不可用时，使用 SeminarArc Emulator chain。Executor 不能临场选择 consumer。

不允许一个跨五仓/七仓巨型 Codex 任务。每个 lane 有自己的 Proposal、Plan、Gate、final candidate 和完成状态。

## 17. Capability Gate Matrix

| Gate | 证明能力 | 正常入口 | 正向证据 | 最高风险负例 | 当前状态 |
|---|---|---|---|---|---|
| `DA-V04-G1_CORE_RESOLUTION` | 公共义务/影响/范围算法正确 | workflow-core normal task entry | small targeted、shared broad、whole-product full-with-reuse | unknown→NONE、按Gate数FULL | 未实现 |
| `DA-V04-G2_ADAPTER_MONOTONICITY` | adapter 不能漏/降专业义务 | 七仓普通入口 | 完整 adapter 正确解析 | 删除Gate/target/MUST/locator仍USER_READY | 未实现 |
| `DA-V04-G3_AUTHORITY_FRESHNESS` | authority/AGENTS/locator 漂移诚实恢复 | Bobbio recovery + 每仓变异 | current branch/release正确选择 | 旧 milestone evidence升级新claim | 未实现 |
| `DA-V04-G4_ANTI_SELF_SIGN` | 实现者不能改松标准自签 | Mica/Asteria真实 validator change | old standard + semantic diff + known-bad | fixture/golden/threshold同轮改松 | 未实现 |
| `DA-V04-G5_SEVEN_NORMAL_ENTRIES` | 七仓正向链真正接通 | 每仓现有 normal entry | exact consumed target +专业判断+identity | helper/schema/file存在冒充能力 | 未实现 |
| `DA-V04-G6_SEVEN_DANGEROUS_NEGATIVES` | 每仓最高风险失败阻断危险下游 | 每仓正常入口 | fail closed + same-task recovery | 只测试内部if判断 | 未实现 |
| `DA-V04-G7_CLAIM_CEILINGS` | 缺真机/真实账户/科学结论时不越级 | 七仓 claim aggregation | lower claim保留、higher UNKNOWN | 高层缺证全FAIL或低层冒充LIVE | 未实现 |
| `DA-V04-G8_EXISTING_WORKFLOWS` | 不破坏Lite/Review/Control/Persistent/project controller | Bridge/consumer normal entry |原状态、预算、恢复保持 | DA建第二状态机/scheduler | 未实现 |
| `DA-V04-G9_AGENTS_LIFECYCLE` | AGENTS由正确owner维护且不能削弱义务 | PIE 0.3 repo mode + consumer task | preview/clean/authority map/mutation rejection | 删除locator或MUST获得PASS | 未实现 |
| `DA-V04-G10_RELEASE_ADAPTATION` | central release和七仓实际加载/消费闭合 | AI Skills Maintainer | Update impact、fresh session、每仓evidence | central PASS冒充所有consumer | 未实现 |

这些 Gate 是后续实现包的设计输入，不是本轮 PASS。

## 18. AI Skills Maintenance

已创建：

- workflow-core tracking Issue `#107`：`交付保障：把领域验收接入正式交付准入`
- PIE 0.3 tracking Issue `#108`：`Project Instructions Editor 0.3：整理仓库 AGENTS 与权威定位`

当前 GitHub Project 字段修改 surface 不可用，因此 Project 状态尚未同步。精确 pending mutation：

```text
#107 -> AI Skills Maintenance / Area=workflow-core / Status=DOING / Resolution commit blank
#108 -> AI Skills Maintenance / Area=standalone-skill / Status=TODO；PIE 0.3 substantive design开始时改DOING
```

canonical TODO 的 `tracking: #107/#108` backlink 仍待下一次能安全更新完整大文件的 Project-capable Maintainer机械写入；用户不手工维护。Issue 创建前已经实际消费 installed Clear Writing 的 `response-clarity` 和 `chinese-prose` 规则处理 reader-facing copy。

## 19. 本轮未授权内容

- 不冻结 `da/1`；
- 不执行 Bridge、workflow-core、PIE、domain 或 consumer 代码；
- 不改七仓 `AGENTS.md` 或 adapter；
- 不执行 Bobbio recovery；
- 不运行 Windows/真机/浏览器账号/Slurm/GPU/付费/发布；
- 不把 Phase 1 GO 外推成 `DA-G10`–`DA-G15` PASS；
- 不创建中央服务或新工作流。

## 20. 设计关闭条件

v0.4 可以得到 `PROCEED` 的条件：

1. 公共 C01–C20 与本轮单调性/authority/AGENTS合同无冲突；
2. 七仓附录对每仓所有字段完整；
3. 问题覆盖证明能够把 83/363 和 Critic 攻击面逐项路由；
4. 七仓实例 Gate 达到 Policy 1.2 的正向链、危险负向链、same-candidate 和 should-not-change 要求；
5. 实现顺序不形成巨型任务；
6. 没有架构级决定留给 Executor；
7. 所有生产能力仍诚实标为未实现。

`PROCEED` 只允许 Planner 冻结 `da/1` 并分别准备实现包，不授权 Codex。

## 21. 当前状态

```text
PHASE1_CLOSED=YES
PHASE1_VERDICT=GO
V0_3_CRITIC=REVISE
V0_4_STATUS=READY_FOR_DESIGN_CRITIC
PUBLIC_DA_1_INTERFACE=NOT_FROZEN
DA_G10_G15=NOT_EVALUATED
PRODUCTION_IMPLEMENTATION_AUTHORIZED=NO
READY_FOR_CODEX=NO
```

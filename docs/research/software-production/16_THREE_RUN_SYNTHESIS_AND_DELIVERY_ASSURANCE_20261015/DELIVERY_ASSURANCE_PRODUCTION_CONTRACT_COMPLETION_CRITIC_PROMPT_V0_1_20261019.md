# Delivery Assurance Production Contract Completion — Independent Critic Prompt v0.1

你现在担任 AI Research Stack 的独立架构 Critic，审查 Delivery Assurance 的 **Production Contract Completion Proposal v0.1**。

本轮不是重新审 R5 Phase 1 Hook probe，也不是执行 Bridge / AI Skills / consumer 实现。审查对象是 validator/gate 生命周期生产合同：验收能力怎样被发现、选择、补齐、保护、执行、绑定和维护。

## Active Review Context

- target_repo: `YuukiAS/AI_Research_Toolkit`
- target_domain_or_task_key: `software-production--delivery-assurance`
- source_branch: `research/software-production-decision-20261013`
- proposal_version: `v0.1`
- review_stage: `PRODUCTION_CONTRACT_DESIGN_REVIEW_V0_1`
- frozen_proposal_commit: `1af455d7d8bf698b594e92f8cc0586b85523d66e`
- proposal_path:
  `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PRODUCTION_CONTRACT_COMPLETION_PROPOSAL_V0_1_20261019.md`
- R5 Phase 1 package: `58717a6b3ace4f5ccf094fb4f8754231af762d54`
- R5 Critic review:
  `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_CRITIC_REVIEW_R5_20261019.md`
- expected_review_output:
  `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PRODUCTION_CONTRACT_COMPLETION_CRITIC_REVIEW_V0_1_20261019.md`

本轮只允许读取和写入上述 Critic review artifact。不要修改 Proposal，不要执行 R5 Phase 1，不要写 Bridge/AI Skills/consumer 代码，不要启动 Windows、Slurm、GPU、tmux 长任务或付费操作。

## 一、强制读取

首先实际读取 `YuukiAS/AI_Skills_Collection@main` 最新：

- `AGENTS.md`
- `docs/workflows/PLANNER_ROLE_CONTRACT.md`
- `docs/workflows/CRITIC_ROLE_CONTRACT.md`
- `docs/workflows/PLUGIN_CAPABILITY_GATE_POLICY.md`
- `docs/workflows/AI_SKILLS_MAINTENANCE_BOARD.md`
- `docs/plugin-todos/workflow-core.md` 中：
  `Final delivery must consume domain-owned self-QA before user-ready completion`
- `plugins/codex/plugins/workflow-core/skills/workflow/SKILL.md`
- Frontend Design 当前 actual-surface / producer self-QA 来源
- Presentations 当前 final-render / rendered-artifact review 合同
- Research Writing/Authoring 当前 final-artifact / evidence / citation QA 合同
- Statistical Modeling 当前 completion / diagnosis / sensitivity 合同
- `skills/core/codex-system/machine-update-orchestrator/SKILL.md`
- `skills/core/codex-system/bridge-kit-maintainer/SKILL.md`
- `skills/core/codex-system/machine-update-orchestrator/references/formal-release-and-update-impact.md`

再读取 `YuukiAS/GPT_Codex_AI_Bridge_Kit@main` 最新：

- `AGENTS.md`
- `docs/TODO_LOCAL_AUTONOMOUS_ACCEPTANCE_WORKFLOW.md`
- `docs/V0_5_REVIEWED_HANDOFF_IMPLEMENTATION_SPEC.md`
- AGENTS 当前指定的最新正式 runtime/recovery Proposal/Plan

再读取至少三个真实 consumer：

1. `YuukiAS/Lucerna@main`
   - `AGENTS.md`
   - `docs/workflows/LUCERNA_VISUAL_ACCEPTANCE.md`
   - `docs/workflows/LUCERNA_INDEPENDENT_RELEASE_ACCEPTANCE.md`
   - `docs/workflows/LUCERNA_EXECUTION_FAILURE_HISTORY.md`
2. `YuukiAS/CARE_Challenge@main`
   - `AGENTS.md`
   - `prompts/AGENT_FLOW_V2_PROTOCOL.md`
   - 一个当前真实 controller/finalizer/validator completion packet 或等价证据
3. `YuukiAS/Bobbio@main`
   - `AGENTS.md`
   - `docs/handoffs/ACCEPTANCE_0.2.0_2026-09-13.md`
   - `docs/handoffs/GPT_WORK_REVIEW_0.2.0_PASS_2026-09-13.md`
   - 当前正式 acceptance runner locator

最后从冻结提交 `1af455d7d8bf698b594e92f8cc0586b85523d66e` 读取 Proposal v0.1。不要用分支后续提交替换被审对象。

## 二、R5 Phase 1 边界

R5 已获得独立 Critic PASS；本 Proposal 明确与 R5 Phase 1 相互独立。除非你发现新的、直接推翻 R5 Stop Hook 接缝设计的证据，否则：

- 不得暂停或重开 R5；
- 不得把本 Proposal 的生产对象模型追加成 Phase 1 probe 条件；
- 不得要求先完成本 Proposal 才运行已批准的 R5 Phase 1；
- 本 Proposal PASS 也不得冒充 Phase 1 GO 或生产实现授权。

## 三、审查生产对象模型是否最小且可实现

Proposal 采用：

```text
installed/enabled domain plugin capability descriptor
+ project ADAPTER.toml / project gates.toml
+ workflow-core Required Gate Resolver
+ Executor / existing project finalizer invocation
+ domain/project Gate Result
+ Bridge identity/freshness consumption
```

请独立判断：

1. 是否真正避免了 gate registry 数据库、第二中央控制面、daemon 或新 workflow；
2. plugin manifest locator + project adapter 是否足以完成运行时发现；
3. descriptor、adapter、result、task Delivery Declaration 是否各自只有一个清楚职责，还是形成重复状态源；
4. Bridge 是否仍只消费机械事实，没有偷偷成为 resolver 或专业 runner；
5. domain/project owner 是否仍拥有专业标准与 PASS/FAIL/UNKNOWN。

如果能用更小方案达到同样能力，必须说明具体删什么以及为何不会丢失自动发现/维护能力；不得仅以“schema 太多”笼统反对。

## 四、Gate Capability Descriptor v1

逐项检查 descriptor 是否足以表达：

- owner / change authority；
- applicability；
- normal execution entry；
- subject types 与 consumed-target types；
- accepted evidence classes；
- permission / cost / secret / long-run requirement；
- result schema；
- definition version / digest；
- invalidation rules。

重点反证：

- descriptor 是否把专业标准抽空，只剩标签；
- applicability 是否会让 workflow-core 临场自由解释；
- `entry_ref` 是否可能指向测试旁路而不是真实 normal entry；
- definition version 与 runner identity 是否正确分开；
- plugin manifest locator 是否会误变成新的中央 registry；
- generated plugin 与 canonical source 的一致性是否由 AI Skills Maintainer 而非用户承担。

## 五、Required Gate Resolver v1

必须验证 Resolver 是否能真正得到“最小但充分”集合，而不是：

- 复杂任务一律 FULL；
- 文件类型硬编码；
- 项目名称决定门禁；
- 为避免漏检而全插件全量运行；
- 反过来为省事漏掉 installed/live/scientific surface。

逐项审：

1. 输入是否足够；
2. NONE / TARGETED / BROAD / FULL 条件是否可否证；
3. shared runtime/schema/generator/routing、multi-artifact 和 full release 是否正确升级；
4. isolated small backend 修复是否保持轻量；
5. excluded gate 是否有理由记录；
6. required set 是否冻结进现有 Delivery Declaration，而不是新增 task state machine；
7. 哪些变化触发重新解析和 stale evidence。

## 六、Missing-Gate Resolution 与自动 validator

逐项复核六类状态：

- `AVAILABLE_RUNNABLE`
- `STANDARD_FROZEN_IMPLEMENTATION_MISSING`
- `NEW_PROJECT_ACCEPTANCE_CATEGORY`
- `REUSABLE_DOMAIN_CAPABILITY_MISSING`
- `TEMPORARILY_UNRUNNABLE`
- `HUMAN_ONLY`

要求每类都具有唯一 owner、自动处理、claim-blocking 范围与用户中断条件。

特别检查：

- 已冻结且可机械实现的标准，是否默认由 Executor 同任务补 runner；
- 新产品/科学标准是否仍必须先由 project/domain owner 冻结；
- project-local gate 是否能在中央能力缺失时诚实解决当前任务，而不会掩盖后续中央 maintenance；
- HUMAN_ONLY 是否只是动作依赖，而非“用户看过所以 PASS”；
- 环境缺失是否只阻塞对应 claim，保留已证明低层成果。

## 七、Anti-gaming 与 gate-definition integrity

这是本轮的高风险审查点。请主动尝试构造以下攻击：

- Executor 降低 threshold；
- 删除 known-bad fixture；
- 将 real evidence 换成 synthetic/file-exists；
- 改 applicability 使 gate 不适用；
- 修改 adapter 删除 gate；
- product 与 validator 同改，用当前 candidate 制造 golden；
- 把 gate failure 无证据改称 infra gap；
- 修改 descriptor 后复用旧 PASS。

判断 Proposal 的 definition/version/digest、runner identity、fixture/rubric identity、owner change authority、old-fail/new-good 顺序和 evidence invalidation 是否足够。

不要要求所有 deterministic validator 都增加独立 Reviewer；只有 Proposal 已冻结的开放式专业判断或 definition 变化需要相应 owner。

## 八、Gate execution/result 与多产物/跨 repo

检查 `delivery-assurance.gate-result/v1` 是否保持最小，同时能机械表达：

- definition ref/version/digest；
- owner；
- execution entry / runner identity / invocation owner；
- multiple subject refs；
- multiple consumed target refs；
- decision；
- evidence class；
- claim scope；
- reason codes / evidence refs；
- invalidation identity。

检查 Delivery Target Graph 是否解决：

- UI + backend + installer + docs；
- model + checkpoint + prediction + report；
- cross-repo composition；
- 某一个 artifact PASS 冒充整体完成。

重点判断它是否只是 task-local Delivery Declaration 的必要扩展，还是已经演变成中央 graph database。若字段可删，必须说明删后怎样仍支持 multi-target claim。

## 九、Adapter 生命周期与维护

检查以下 owner 是否清楚且不重叠：

- project owner 授权并拥有 adapter 语义；
- Executor bootstrap/update adapter；
- domain plugin 拥有 reusable descriptor；
- workflow-core resolve；
- Bridge validate/consume；
- AI Skills Maintainer 分发、正式 release 与 managed consumer adaptation。

验证用户不需要长期手工维护 gate 清单；central implementation 完成但 required consumers 未适配时是否诚实进入 `ADAPTING`；更新范围是否继续由 `release -> CHANGELOG -> ### Update impact` 决定，而不是新增版本矩阵。

同时审 Proposal 的维护跟踪边界：若根据最新 Maintenance Board，本 Proposal 已经必须立刻进入 tracking scope，请给出有直接合同依据的 blocker 和最小机械 mutation；不得要求用户手工维护。若当前仍可视为 research proposal、到 implementation Plan 才进入 tracking，则确认 pending mutation 足够诚实。

## 十、Delivery claim levels

检查 `LOCAL_SOURCE / INTEGRATED / ARTIFACT_READY / INSTALLED / LIVE` 是否：

- 与现有 workflow-core/Lucerna 交付原则一致；
- 能表示部分完成；
- 不让低层 PASS 冒充 installed/live；
- 不因高层环境缺失把低层成果逆向判失败；
- 能按 target 分别给 claim；
- 不需要再新建一套 completion state machine。

确认 `USER_READY / RELEASE_READY` 只是 workflow-core 对目标 claim 的 admission，不是重复 claim level。

## 十一、消费者与正常用户路径

逐个反证 Proposal 的三个例子：

1. Lucerna UI/native release：是否真正消费 actual surface、native interaction、state/copy/notification，而不是只看截图存在；
2. CARE 长任务：是否保留 controller/finalizer/validator 与 Slurm owner，区分 operational completion 和 scientific claim；
3. 普通小 backend 修复：是否只跑 targeted gate，并自动补 regression，不升级全量 UI/科研审查。

再用 Bobbio 检查 multi-surface：UI black-box、native Zotero round-trip、PDF immutability、real-profile untouched 是否能分别绑定，而不是一个 gate 笼统 PASS。

正常用户必须只提出功能目标；普通 validator、adapter、gate 执行和返修不应由用户管理。只有新产品/科学选择、secret/auth/physical、高影响授权或真正 HUMAN_ONLY 才中断。

## 十二、完整责任矩阵与阶段边界

逐行检查 Proposal 责任矩阵，确保每项只有一个 authority owner：

- Bridge
- workflow-core
- domain plugin
- project owner
- Executor
- AI Skills Maintainer

执行 actor 可以与 authority owner 不同，但不得出现“后面实现时再决定”。

检查“Phase 2 Bridge 前必须冻结”与“consumer adaptation 可确定”是否分界正确：

- Bridge 实现前必须稳定的是 schema、identity、claim、missing-state、invalidation 和职责接口；
- 具体 threshold/rubric/runner path/consumer locator 应由 domain/project adaptation 决定；
- Bridge 不应先写专业逻辑，consumer 也不应反向改变中央 schema。

## 十三、Capability Gate Matrix 与剩余未决项

审 `DAC-G01`–`DAC-G10`：

- 是否每项证明不同真实能力；
- normal entry 和 failure 是否可观察；
- 是否覆盖发现、resolver、missing、validator、anti-gaming、multi-target、claims、adapter、authority 与消费者多样性；
- 是否有重复 gate；
- 是否遗漏 should-not-change / final candidate；
- 是否把实现文件存在当能力 PASS。

核对 Proposal 的“已解决 / 待实现验证 / 独立待证”清单是否真实，不得把 R5 Phase 1、descriptor implementation 或 consumer adaptation 写成已完成。

## 十四、外部实践采用是否克制

Proposal 只选择性采用 in-toto/SLSA 的 immutable subject/statement-type思想和 GitHub latest-commit freshness，不采用签名、attestation service、供应链控制面或 CI 专业评分。

请判断这是否只是合理佐证，而非偷偷引入新的 provenance 平台。

## 十五、判决

只允许：

`PASS`

或

`REVISE`

### 若 REVISE

每个 blocker 使用稳定 ID：

`DA-PC-V01-Fxx — <NAME>`

并给出：

1. 对应要求；
2. 直接证据；
3. 因果失败风险；
4. 最小关闭条件；
5. 唯一责任 owner。

区分 blocker 与非阻塞建议。不要以“更保险”为由新增 registry、daemon、review loop、固定样本数或全量 gate。

最后按 Critic Role Contract 自动生成一个可直接复制给 Planner 的完整下一步 Prompt。明确 R5 Phase 1 不受本 review 暂停。

### 若 PASS

必须明确：

```text
reviewed_object=Delivery Assurance Production Contract Completion Proposal v0.1
frozen_proposal_commit=1af455d7d8bf698b594e92f8cc0586b85523d66e
review_stage=PRODUCTION_CONTRACT_DESIGN_REVIEW_V0_1

PRODUCTION_CONTRACT_DESIGN=PASS
R5_PHASE1_REOPENED=NO
R5_PHASE1_PAUSED=NO
PHASE2_IMPLEMENTATION_AUTHORIZED=NO
PHASE3_IMPLEMENTATION_AUTHORIZED=NO
PRODUCTION_RELEASE_AUTHORIZED=NO
```

用自然中文解释：

- descriptor/resolver/missing-gate/validator/anti-gaming/result/adapter/claim 合同为什么足够；
- 为什么没有形成第二中央控制面；
- 哪些内容必须在 Phase 2 前冻结；
- 哪些由 consumer adaptation 决定；
- 本 PASS 证明与不证明什么。

PASS 后唯一下一入口是 Planner 准备独立 implementation Plan；不得直接启动 Codex 实现。

## 十六、审查产物

将完整 review 写入：

`docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PRODUCTION_CONTRACT_COMPLETION_CRITIC_REVIEW_V0_1_20261019.md`

只写该 review artifact。最终回复先给 PASS/REVISE 与最重要理由，再给 review path/commit 和唯一下一入口。

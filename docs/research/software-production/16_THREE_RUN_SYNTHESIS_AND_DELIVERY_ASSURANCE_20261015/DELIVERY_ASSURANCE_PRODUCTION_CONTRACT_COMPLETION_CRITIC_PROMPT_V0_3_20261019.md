# Delivery Assurance Production Contract v0.3 — 独立架构 Critic 审查

你现在担任 AI Research Stack 的独立架构 Critic，审查 Delivery Assurance Production Contract Completion Proposal v0.3。

本轮是**一次正式架构封板审查**，不是重新研究 Delivery Assurance，不是重新做 363 条盲研究，不是重开 Phase 1，也不是 execution-ready review。只判断 Planner 是否把已经获得的 Phase 1 事实、GPT Work C01–C20 和 X01–X25 正确收敛成一个可以作为后续实现唯一架构 authority 的 v0.3。

## Active Review Context

- target_repo: `YuukiAS/AI_Research_Toolkit`
- target_plugin_or_domain: `Delivery Assurance / workflow-core + Bridge integration contract`
- design_topic_or_task_key: `software-production--delivery-assurance`
- source_branch_or_ref: `research/software-production-decision-20261013`
- review_stage: `PRODUCTION_CONTRACT_DESIGN_REVIEW_V0_3`
- proposal_version: `v0.3`
- proposal_path:
  `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PRODUCTION_CONTRACT_COMPLETION_PROPOSAL_V0_3_20261019.md`
- frozen_proposal_commit: `9dc26e291c6976e5729ec03265a7f5f01fd1b78c`
- v0.2 baseline:
  `DELIVERY_ASSURANCE_PRODUCTION_CONTRACT_COMPLETION_PROPOSAL_V0_2_20261019.md@3868886b621cd77b180af8721b39d5c620dfb9e4`
- GPT Work architecture-closure package:
  `5d28980b4cd03069c431ee5016368f4fdf1beea1`
- canonical Phase 1 / production-input snapshot:
  `eadfb52e181a51ca8948eb4206d0e9a92c8595f7`
- Phase 1 clean GO:
  `2d823a0a163d5e79806c5c1964702820bcce3290`
- Phase 1 preparation closure:
  `7c8e321292e8c15026e669affba9f615832cc6c5`
- expected review artifact:
  `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PRODUCTION_CONTRACT_COMPLETION_CRITIC_REVIEW_V0_3_20261019.md`

不要修改 Proposal。只允许写本次 Critic review artifact。不要执行生产代码、Phase 1、Windows、Slurm/GPU、真实账号、付费调用、consumer mutation 或 release。

## 一、首先读取最新治理来源

实际读取 `YuukiAS/AI_Skills_Collection@main` 最新：

- `docs/workflows/PLANNER_ROLE_CONTRACT.md`
- `docs/workflows/CRITIC_ROLE_CONTRACT.md`
- `docs/workflows/PLUGIN_CAPABILITY_GATE_POLICY.md`
- `docs/workflows/AI_SKILLS_MAINTENANCE_BOARD.md`
- `docs/plugin-todos/workflow-core.md` 中
  `Final delivery must consume domain-owned self-QA before user-ready completion`
- 当前 `workflow-core` normal-entry source，如判断职责冲突所需。

确认本 review 是设计阶段 Critic，不是 execution-ready Critic；PASS 后下一入口仍是 Planner，不是 Codex。

## 二、读取当前 Phase 1 与生产事实

从 exact commit `eadfb52e181a51ca8948eb4206d0e9a92c8595f7` 读取：

- `PHASE1_CLOSURE_20261019.md`
- `PHASE2_IMPLEMENTATION_INPUTS_20261019.md`
- `GATE_LIFECYCLE_FACT_INVENTORY_20261019.md`
- `CONSUMER_ACCEPTANCE_INVENTORY_20261019.md`
- `PRODUCTION_HANDOFF_MANIFEST_20261019.md`

所在目录：
`docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/`

必须以以下当前事实为起点：

```text
PHASE1_CLOSED=YES
PHASE1_VERDICT=GO
```

不要引用更早“R5 尚未执行”的状态，不重新运行或研究 Hook。

同时核对 Proposal 是否正确限制了 GO 的含义：GO 只证明受测 Stop Hook seam；不能推出生产 Bridge、workflow-core、domain descriptors、consumer adapters 或 release 已实现。

## 三、完整读取 GPT Work 冻结架构闭合结果

从 exact commit：

`5d28980b4cd03069c431ee5016368f4fdf1beea1`

读取目录：

`docs/research/software-production/17_DELIVERY_ASSURANCE_ARCHITECTURE_CLOSURE_GPT_WORK_R0/`

至少完整读取：

- `01_ARCHITECTURE_COMPLETENESS_AUDIT.md`
- `02A_REPO_GATE_FAMILY_SUMMARY.md`
- `05_MANUAL_VS_ARCHITECTURE_COMPARISON.md`
- `06_FINAL_ARCHITECTURE_CONTRACT.md`
- `07_REMAINING_DECISIONS.md`
- `08_PROPOSAL_V0_3_EXACT_CHANGESET.md`
- `VALIDATION.md`

按需核对 83/363 CSV，但**不要重新开展新的盲 363 条研究**。

GPT Work 方法学结论必须原样保持：

```text
A=PASS
B=PASS
C=FAIL
```

`C=FAIL` 的含义只是在那一次 GPT Work 研究中，没有建立严格盲、严格独立的 manual-vs-architecture 一致性证明。它不是“C01–C20 被证明错误”，也不是产品架构自动 FAIL。当前 v0.3 是否成为 canonical architecture，由你对明确 Proposal 对象做独立 Critic 审查决定。

如果你发现 C01–C20 本身有直接事实冲突，可以 REVISE；不要以“C=FAIL，所以必须再做一次盲363研究”作为 blocker。

## 四、读取 current Bridge 正式边界

实际读取当前 `YuukiAS/GPT_Codex_AI_Bridge_Kit@main`：

- `AGENTS.md`
- `docs/V0_5_REVIEWED_HANDOFF_IMPLEMENTATION_SPEC.md`
- Control 当前正式来源
- `docs/design/0.8.0_persistent_run.md`
- 当前 0.11.0 product-scope-reset Proposal / Execution Plan / execution-ready Critic review
- 与 Host/runtime/recovery 直接相关且判断本 Proposal 冲突所需的正式规范

重点检查：

1. Delivery Assurance 没有被偷偷塞进当前 `bridge-core--product-scope-reset` execution package；
2. DA 不依赖 reset 正在删除的 app-server reader、Progress display thread、persistent Codex thread、worktree exchange、第二授权层或旧跨-workflow event topology；
3. Bridge 仍只拥有 runtime identity、candidate/result freshness、Stop/recovery 机械职责；
4. Review、Control、Persistent Run 的既有 authority/state machine 没有被 DA 重写；
5. DA Bridge lane 必须是后续单独 implementation package；
6. current 0.11 scope reset 未完成/未冻结 final candidate 时，v0.3 是否正确把它作为 Bridge lane 的前置依赖，而没有阻塞 workflow-core/domain 对 frozen `da/1` 的并行实现设计。

## 五、审查 C01–C20 是否机械吸收且无双权威

从 frozen proposal commit `9dc26e291c6976e5729ec03265a7f5f01fd1b78c` 完整读取 v0.3。

逐节核对：

- C01 唯一 authority；
- C02 正常入口和能力发现；
- C03 `da/1` 数据模型/最小持久化；
- C04 标准来源和六维 new-Gate decision；
- C05 impact classification / 三值谓词 / diff+dependency closure；
- C06 Resolver / NONE-TARGETED-BROAD-FULL / reuse-cost；
- C07 target graph / identity；
- C08 missing capability / validator / runnability；
- C09 anti-gaming / calibration / observer provenance；
- C10 result envelope / modality-fidelity-observer 三轴；
- C11 invalidation / raw-vs-judgment reuse；
- C12 product/validator/evidence/environment/authority/scientific NO_GO attribution；
- C13 target-specific claim partial order；
- C14 new repo / central update / managed adaptation；
- C15 long-run / Slurm / authority；
- C16 normal user path / observability / net-benefit；
- C17 22 行完整 handoff matrix；
- C18 七 consumer mapping；
- C19 Phase 2 前冻结项和 consumer-adaptation 参数边界；
- C20 formal invariants/falsification。

判定标准不是“文档很长”，而是：

- 每个会改变生产行为的架构决定已有唯一 authority owner；
- 没有 `implementation decides` / TBD 式空白；
- Executor 不能自己选择标准、Gate family、证据级别或 claim；
- consumer-specific threshold/fixture/argv/device/URL/data identity 延后时，owner 和冻结阶段已经明确；
- 没有中央 registry/database/daemon/new workflow/second DONE；
- 没有把专业判断移入 Bridge。

若发现 C01–C20 与当前 Phase 1、Bridge、AI Skills 的直接事实冲突，给具体 blocker；不要重新设计整个系统。

## 六、审查 X01–X25 是否全部真正替换 v0.2

逐项使用 `08_PROPOSAL_V0_3_EXACT_CHANGESET.md` 的 X01–X25。

特别检查以下过去已明确错误的东西在 v0.3 中是否仍作为当前 authority 存在：

- 286/46/6 作为 363 关闭证明；
- 自定义 `plugin.json.delivery_assurance` 作为平台原生能力；
- 单一 evidence class；
- 只查局部 diff；
- “选择更严格且可执行 definition”；
- FULL = 每次全量重跑；
- 单 `gate-id` 覆盖多 run/target；
- 任一维相同就拒绝 new Gate；
- supporting map/case-id 进入 runtime Resolver；
- Executor 自改 rubric/threshold/golden/adapter 获 PASS；
- hash / fresh session 被当成 protected observation；
- 单线性 claim；
- long-run 被 Hook/DA 接管；
- 旧双 authority 留给实现者自行选择。

允许 v0.3 为审计保留 X01–X25 的历史表，但架构正文必须只有 C01–C20 一套 current authority。

## 七、Phase 1 GO 与 DA-G10–DA-G15

必须核对 Proposal 的 production Gate truth：

```text
DA-G01..DA-G09 = Phase1 probe PASS only
DA-G16         = Phase1 probe PASS only
DA-G10..DA-G15 = NOT_EVALUATED_PHASE1
```

并检查 v0.3 后续表没有把：

- workflow-core admission；
- adapter/no-adapter；
- long-run owner handoff；
- Bridge mode should-not-change；
- domain final consumed artifact QA；
- formal release/update/adaptation

提前写成 PASS。

若 Proposal 对 `DA-G13` 使用 `NOT_EVALUATED_PRODUCTION`，应按语义理解为“Phase 1 没有形成 production regression PASS”，不能误读成旧 Bridge 模式没有历史测试。

## 八、实现顺序与 ownership

检查 v0.3 固定的后续依赖是否成立：

```text
v0.3 Critic PASS
→ public da/1 interface freeze
→ Bridge runtime/core lane || workflow-core lane
→ domain descriptor lanes（da/1 frozen 后并行）
→ Lucerna consumer lane || CARE consumer lane
→ third-consumer anti-generalization
→ AI Skills Maintainer formal release / Update impact / managed adaptation
```

必须确认：

- 不形成一个跨五仓 giant Codex task；
- Bridge 与 workflow-core 分别有独立 Proposal/Plan/Gate；
- domain owner 有独立 Gate；
- Lucerna/CARE 是两个独立 consumer completion objects；
- Maintainer 只在 central + consumer 前置成立后做 release/adaptation；
- 任一 lane PASS 不能代签另一 lane；
- public `da/1` freeze 是设计 artifact，不是 registry/runtime service；
- 若实现发现必须改变 `da/1` 必需字段、owner 或判定语义，必须回 Planner/Critic，而不是各 lane fork schema。

## 九、Bobbio consumer-specific drift

读取 current consumer inventory 对 Bobbio 的 authority drift。

v0.3 的处理应是：

- 保留为 Bobbio adapter 的 status authority conflict；
- 未冻结前 Bobbio 对相关 claim 返回 UNKNOWN；
- 不让它阻塞中央架构 Critic PASS，除非你能证明它直接反证 C01–C20 的通用机制；
- 不让 Planner/DA 自己“选方便的一份状态文件”解决项目事实冲突。

如果这条边界成立，不要要求先修 Bobbio 才 PASS 中央架构。

## 十、AI Skills Maintenance tracking

根据最新 Maintenance Board 判断：

Phase 1 GO + 本 v0.3 首次实质 workflow-core production contract design 已经进入 tracking scope。

审查 Proposal 是否诚实处理当前 surface：

- 当前没有 tracking Issue；
- 没有 `tracking: #N`；
- Project 未同步；
- Planner surface 没有可证明的 GitHub Project field mutation；
- 若没有真正 Clear Writing invocation surface，则不能为了“完成看板”创建 reader-facing Issue。

Proposal 已给 exact pending mutation。你应核对：

- title、labels、Area、Status=DOING、current anchor、next action 和 Bridge integration dependency 是否符合最新 Board；
- source maturity `status: NEW` 是否被正确保留；
- 没有要求用户手工拖 Project/补 backlink；
- 没有假称 Issue/Project 已同步。

若你的当前 Critic surface 能合法完成其中某项 mutation，也不要在本 review 中越权替 Planner/AI Skills Maintainer做；只审 truth。

## 十一、Capability Gate / complexity / anti-overengineering

使用最新 `PLUGIN_CAPABILITY_GATE_POLICY.md` 审查 v0.3 与后续 lane 边界：

- Gate taxonomy 稳定，新 failure regression-first；
- split/new Gate 只在六维能力不可表达时；
- cheap deterministic regression first；
- TARGETED/BROAD/FULL 来自 blast radius 与 claim，而不是复杂度/Gate 数量；
- whole-product FULL 是完整 obligation coverage，允许复用仍有效 evidence，不等于每次全量重跑；
- same-lane final release evidence 绑定同一 lane final candidate；
- cross-lane 通过 frozen `da/1` identity 对齐，不要求跨 repo 一个 Git SHA；
- 没有把 schema/receipt/file existence 当 capability PASS。

## 十二、不要重新打开的内容

除非发现**新的直接事实冲突**，本 review 不得：

- 重跑或重开 Phase 1；
- 新建 R6/R7 Hook proposal；
- 再做一次全面 363 条盲研究；
- 重新讨论是否创建独立 DA repo/平台；
- 恢复 Local Autonomous Acceptance / Local Review；
- 新建 registry/database/daemon/workflow/state machine；
- 把 Bobbio drift 扩成中央 blocker；
- 因 `C=FAIL` 单独要求方法学研究重做；
- 给 Phase 2 / production code execution authorization。

## 十三、判决

只允许：

`PASS`

或

`REVISE`

### 若 REVISE

只阻塞会让 v0.3 作为 canonical architecture 后造成真实失败的缺陷。

每个 blocker 使用稳定 ID：

`DA-PC-V03-Fxx — <NAME>`

并写：

1. 对应 C/X/当前合同；
2. 直接 source/evidence；
3. 因果失败风险；
4. 最小关闭条件；
5. 唯一 owner。

不要用“还可以更严”“最好再盲跑一次363条”“等所有消费者先实现”作为 blocker。

按 Critic Role Contract，在回复末尾自动给长期 Planner thread 一个完整下一步 prompt。

### 若 PASS

必须明确：

```text
reviewed_object=Delivery Assurance Production Contract Completion Proposal v0.3
frozen_proposal_commit=9dc26e291c6976e5729ec03265a7f5f01fd1b78c
review_stage=PRODUCTION_CONTRACT_DESIGN_REVIEW_V0_3

PRODUCTION_CONTRACT_DESIGN=PASS
ARCHITECTURE_CANONICAL=YES

PHASE1_CLOSED=YES
PHASE1_VERDICT=GO
R5_PHASE1_REOPENED=NO

DA_G10_G15=NOT_EVALUATED
PRODUCTION_IMPLEMENTATION_AUTHORIZED=NO
PHASE2_IMPLEMENTATION_AUTHORIZED=NO
PRODUCTION_RELEASE_AUTHORIZED=NO

NEXT_HANDOFF=PLANNER
```

自然中文先说明：

- 本次批准的是什么；
- C01–C20 为什么足以作为 canonical architecture；
- X01–X25 是否全部吸收；
- Phase 1 GO 为什么没有被外推；
- current Bridge 0.11 scope reset 与 DA 独立 lane 为什么不冲突；
- Bobbio drift 为什么只是 consumer-specific；
- maintenance pending mutation 是否诚实；
- 后续仍未实现/未验证哪些能力。

PASS 后唯一下一入口是 Planner：冻结 public `da/1` interface artifact，并分别准备 Bridge / workflow-core / domain / consumer / Maintainer implementation packages。**不要给 Codex kickoff。**

## 十四、Review artifact

将完整 Critic review 写入：

`docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PRODUCTION_CONTRACT_COMPLETION_CRITIC_REVIEW_V0_3_20261019.md`

只写该 review artifact，不修改 Proposal、Phase 1 evidence、Bridge、AI Skills 或 consumer。

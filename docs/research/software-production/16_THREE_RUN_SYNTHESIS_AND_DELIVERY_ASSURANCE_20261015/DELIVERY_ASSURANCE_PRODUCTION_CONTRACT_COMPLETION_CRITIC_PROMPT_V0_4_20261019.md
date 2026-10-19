# Delivery Assurance Production Contract v0.4 — 独立设计 Critic Prompt

你现在担任 AI Research Stack 的独立架构 Critic，审查 Delivery Assurance Production Contract v0.4 的完整设计返修包。

本轮不是 execution-ready review，不执行 Phase 1，不研究 Hook，不实现生产代码，也不重新进行 363 条盲研究。你只判断 v0.4 是否已经关闭上一轮七仓复核的真实 blocker，并且是否足够完整，使后续 Planner 可以冻结公共 `da/1`、分别准备实现包，而不把架构决定留给 Codex。

## Active Review Context

- target_repo: `YuukiAS/AI_Research_Toolkit`
- target_plugin_or_domain: `Delivery Assurance / workflow-core + Bridge + domain + consumer integration`
- design_topic_or_task_key: `software-production--delivery-assurance`
- source_branch_or_ref: `research/software-production-decision-20261013`
- review_stage: `PRODUCTION_CONTRACT_DESIGN_REVIEW_V0_4`
- frozen_package_commit: `a73b851a031b6146e3ef27916663280d69a772c5`
- package_manifest:
  `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PRODUCTION_CONTRACT_COMPLETION_PACKAGE_V0_4_20261019.md`
- main_proposal:
  `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PRODUCTION_CONTRACT_COMPLETION_PROPOSAL_V0_4_20261019.md`
- previous_review:
  `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PRODUCTION_CONTRACT_COMPLETION_CRITIC_REVIEW_V0_3_FULL_SEVEN_CONSUMER_REAUDIT_20261019.md`
- previous_review_commit: `60b72b07cc9e5c33884b70c99dac663c01c68f32`
- previous_reviewed_branch_state: `5ebdc0c2038b429c99102abb9679bb2a4523dbac`
- phase1_clean_go: `2d823a0a163d5e79806c5c1964702820bcce3290`
- expected_review_artifact:
  `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PRODUCTION_CONTRACT_COMPLETION_CRITIC_REVIEW_V0_4_20261019.md`

只允许写上述 review artifact。不要修改 v0.4 文件、Bridge、AI Skills、PIE、consumer 或 Phase 1 evidence。

## 一、先读取最新治理

实际读取 `YuukiAS/AI_Skills_Collection@main` 最新：

- `docs/workflows/PLANNER_ROLE_CONTRACT.md`
- `docs/workflows/CRITIC_ROLE_CONTRACT.md`
- `docs/workflows/PLUGIN_CAPABILITY_GATE_POLICY.md`
- `docs/workflows/AI_SKILLS_MAINTENANCE_BOARD.md`
- `docs/plugin-todos/workflow-core.md` 中
  `Final delivery must consume domain-owned self-QA before user-ready completion`
- 当前 `project-instructions-editor` 0.2 source/TODO，如判断 PIE 0.3 边界所需。

当前已知治理基线是 Planner/Critic `1.7`、Capability Gate Policy `1.2`。本轮是设计审查，因此只允许：

```text
PROCEED
REVISE
```

不得给 execution-ready `PASS`，也不得输出 Codex kickoff。

## 二、读取完整 v0.4 包

从 frozen package commit `a73b851a031b6146e3ef27916663280d69a772c5` 完整读取：

1. `DELIVERY_ASSURANCE_PRODUCTION_CONTRACT_COMPLETION_PROPOSAL_V0_4_20261019.md`
2. `DELIVERY_ASSURANCE_SEVEN_CONSUMER_ADOPTION_ANNEX_V0_1_20261019.md`
3. `DELIVERY_ASSURANCE_AGENTS_LIFECYCLE_AND_PIE_0_3_REQUIREMENTS_V0_1_20261019.md`
4. `DELIVERY_ASSURANCE_BOBBIO_STATUS_AUTHORITY_RECOVERY_CONTRACT_V0_1_20261019.md`
5. `DELIVERY_ASSURANCE_PROBLEM_COVERAGE_AND_ARCHITECTURE_PROOF_V0_1_20261019.md`
6. `DELIVERY_ASSURANCE_V0_4_READER_GUIDE_20261019.md`
7. package manifest。

读取上一轮 full-seven-consumer Critic review，按原 blocker 逐项复核。不要只读 main proposal 的摘要。

## 三、核对当前外部事实，但不要重做全面研究

### Phase 1

从 canonical research history 核对：

```text
PHASE1_CLOSED=YES
PHASE1_VERDICT=GO
```

GO 只证明受测 Stop seam。检查 v0.4 是否没有外推为 Bridge/workflow-core/consumer 已实现，也没有把 `DA-G10`–`DA-G15` 提前写 PASS。

### Bridge

读取当前 `YuukiAS/GPT_Codex_AI_Bridge_Kit@main`：

- `AGENTS.md`
- Review、Control、Persistent Run 正式规范；
- current 0.11 scope reset Proposal/Plan/review。

检查 v0.4 没有进入现有 0.11 execution package，没有恢复 app-server reader、Progress thread、persistent Codex thread、worktree exchange、第二授权层或跨 workflow event bus。Bridge 仍只拥有身份、新鲜度、Stop/恢复。

### 七个 consumer

使用上一轮已经读取的真实来源，并按需核对当前关键 normal entry，不需要再做完整 repo research：

- Lucerna
- Bobbio
- Mica-for-ChatGPT
- SeminarArc
- Asteria
- CUHK_Date
- CARE_Challenge

只在 v0.4 annex 与真实 repo 存在具体冲突时新增 blocker。

## 四、优先复核上一轮五个 blocker

### Blocker 1：七仓是否成为正式设计合同

对每个 consumer 检查是否明确冻结：

- exact source/ref；
- consumed-target graph；
- normal development/acceptance/release entry；
- operational/professional/environment/human owner；
- reused validator/controller/review；
- DA-only responsibility；
- positive chain；
- highest-risk negative chain；
- same-task recovery；
- HUMAN_ONLY；
- claim ceiling；
- adapter owner/complexity；
- omission/authority mutation；
- consumer Gate instances。

不能接受“后续 adapter 自行发现”的空白。也不要要求这些 adapter 现在就实现。

### Blocker 2：Adapter 单调性和遗漏检测

检查 v0.4 是否冻结：

```text
effective_obligations =
  domain_minimums
  ∪ project_canonical_contract
  ∪ frozen_goal
  ∪ actual_change_impact
  ∪ should_not_change
```

确认 adapter 不能删除/降级领域最低标准，unknown impact 不能进入 `NONE`，并且每仓都有从正常入口删除 Gate/target/MUST/locator 后拒绝 `USER_READY` 的变异 Gate。

重点攻击：

- 空 adapter；
- 漏 sibling target；
- stale locator；
- MUST→SHOULD；
- old milestone evidence；
- root/nested AGENTS conflict。

如果只验证 schema 字段存在，必须 REVISE。

### Blocker 3：Authority locator drift 和恢复

检查公共 authority set/digest、branch/release scope、supersedes、失效和恢复 owner 是否完整。

单独检查 Bobbio recovery：

- pre-repair conflict；
- develop 选择 0.3.0；
- 0.2.0 evidence不能满足0.3.0；
- mechanical locator repair同任务完成；
- semantic conflict返回project owner；
- 中央Resolver没有硬编码Bobbio路径。

### Blocker 4：公共 Gate 是否展开成七仓正常入口实例

检查 `DA-G10`–`DA-G15` 不再只是公共大类，而是每仓至少有：

- normal-entry positive chain；
- highest-risk dangerous negative；
- same-final-candidate binding；
- should-not-change；
- recovery locator；
- reusable-vs-recollect rule；
- truthful claim ceiling。

不要求本轮运行这些 Gate，但设计必须达到 Capability Gate Policy 1.2 可以直接进入实现 Plan 的程度。

### Blocker 5：HUMAN_ONLY 和 claim ceiling

逐仓检查：

- 用户不会成为第一轮普通 QA；
- synthetic/emulator/hook/staging/operational evidence 不会越级；
- human action 完成后仍回同任务做 post-action closure；
- 高层缺证只阻塞相应 claim，不把低层已证成果倒判失败；
- real Matching、科学路线晋升、真实设备、账号、OS动作和最终产品接受保持正确授权边界。

## 五、新增复核：谁负责整理 AGENTS

这是本轮新增但应当早已回答的架构问题。检查：

- project owner 拥有长期语义；
- `workflow-core` 决定任务是否触发维护；
- current Executor 调 PIE 0.3；
- PIE 0.3只整理已冻结authority，不决定产品/科学标准；
- Bridge只验证实际加载身份；
- AI Skills Maintainer负责PIE发布和managed adaptation；
- 用户不维护AGENTS清单。

复核 PIE 0.3 合同是否充分覆盖：

- exact root/nested baseline；
- authority map；
- bounded edit / clean final / coverage report；
- root/nested precedence；
- protected absence；
- budget和去重；
- adapter/Gate locator不被删除；
- mutation tests；
- Asteria + SeminarArc 等真实consumer normal-entry Gate；
- 不建立AGENTS registry/database/watcher。

如果 AGENTS 内容、触发、actor、失效或防gaming仍留给Executor临场决定，给具体 blocker。

## 六、逐项攻击“架构会不会又被一个简单问题问穿”

使用 `DELIVERY_ASSURANCE_PROBLEM_COVERAGE_AND_ARCHITECTURE_PROOF_V0_1_20261019.md`，至少检查以下问题是否都有唯一答案：

- 谁维护 AGENTS、adapter、descriptor、validator、locator、target graph、evidence、claim；
- 谁决定新 Gate；
- Gate 内容来源；
- Gate多时的NONE/TARGETED/BROAD/FULL；
- standard conflict；
- validator bug vs product defect；
- old evidence reuse；
- missing adapter；
- long-run/Slurm；
- HUMAN_ONLY；
- managed consumer update；
- final completion owner。

你可以发现新的真实空白，但必须指明哪一个生产决定仍没有owner/trigger/input/output/recovery，而不能只说“还可能有别的问题”。

## 七、审查实施顺序和不过度建设

检查顺序：

```text
v0.4 design Critic PROCEED
→ freeze public da/1
→ workflow-core resolver || Bridge identity/Stop
→ Asteria vertical chain
→ repair common core
→ Lucerna native || CARE long-run
→ Bobbio after authority recovery
→ Mica + SeminarArc + CUHK_Date remaining adaptation
→ seven-consumer fresh-session closure
→ formal release/adaptation
```

确认：

- 没有一个跨七仓 giant Codex task；
- Asteria选择有正常入口和低成本理由；
- fallback只在冻结前检失败时用SeminarArc Emulator，Executor不能临场选；
- public `da/1` 是design artifact，不是registry/service；
- 每个lane有独立Plan/Gate/final candidate，互不代签；
- Bobbio recovery不会阻塞公共核心，但会阻塞Bobbio adapter；
- 不需要新daemon/database/workflow/state machine。

## 八、维护看板

核对：

- workflow-core Issue `#107` 已创建；
- PIE 0.3 Issue `#108` 已创建；
- Issue copy符合Board顶部字段和label taxonomy；
- 当前没有Project mutation surface，Project未伪称同步；
- source `tracking: #107/#108` backlink尚待安全大文件更新，Proposal诚实记录pending mutation；
- 没要求用户手工维护。

Critic不替Planner/AI Skills Maintainer修改Issue、Project或TODO。

## 九、问题覆盖与证据强度

GPT Work 的方法学结论继续保持：

```text
A=PASS
B=PASS
C=FAIL
```

不得要求再做一次全面盲363研究。你需要检查的是：v0.4 是否把已有83/363 disposition、七仓真实入口和本轮反例合同连接起来，足以支持架构设计 `PROCEED`。

同时保持边界：设计覆盖不等于生产能力已通过。所有代码、normal-entry、七仓adapter和release Gate仍未执行。

## 十、判决

只允许：

```text
PROCEED
REVISE
```

### 若 REVISE

优先使用上一轮 blocker 的稳定编号或以下格式：

`DA-PC-V04-Fxx — <NAME>`

每项必须写：

1. 对应 requirement/contract；
2. 直接 repo/source evidence；
3. 因果失败风险；
4. 最小关闭条件；
5. 唯一 owner。

只阻塞会让后续实现者必须临场决定架构、会漏真实历史失败或会产生危险假完成的问题。不要因为实现尚未发生、C=FAIL、Bobbio尚未修复、七仓尚未接线而阻塞设计。

按 Critic Role Contract 自动生成可直接复制给长期 Planner 的返修 prompt。

### 若 PROCEED

先用自然中文说明：

- 上一轮五个 blocker如何关闭；
- AGENTS owner为什么已闭合；
- 七仓正常入口和Gate实例为什么足以进入实现包设计；
- 架构怎样防漏义务、旧authority、validator自签和user-first-QA；
- 哪些能力仍未实现/未验证；
- 为什么不需要再做全面架构研究。

然后明确：

```text
reviewed_object=Delivery Assurance Production Contract v0.4
frozen_package_commit=a73b851a031b6146e3ef27916663280d69a772c5
review_stage=PRODUCTION_CONTRACT_DESIGN_REVIEW_V0_4

DESIGN_VERDICT=PROCEED
PUBLIC_DA_1_INTERFACE_FREEZE_ALLOWED=YES
EXECUTION_PACKAGE_DESIGN_ALLOWED=YES

PHASE1_CLOSED=YES
PHASE1_VERDICT=GO
R5_PHASE1_REOPENED=NO

DA_G10_G15=NOT_EVALUATED
PRODUCTION_IMPLEMENTATION_AUTHORIZED=NO
READY_FOR_CODEX=NO
PRODUCTION_RELEASE_AUTHORIZED=NO

NEXT_HANDOFF=PLANNER
```

PROCEED 后唯一下一入口是 Planner：冻结公共 `da/1` design artifact，并分别准备 workflow-core、Bridge、PIE/domain、Asteria首链等实现包。不要给Codex kickoff。

## 十一、审查产物

将完整review写入：

`docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PRODUCTION_CONTRACT_COMPLETION_CRITIC_REVIEW_V0_4_20261019.md`

只写该artifact。最终回复按Critic Role Contract给出结论、review path/commit和唯一下一入口。

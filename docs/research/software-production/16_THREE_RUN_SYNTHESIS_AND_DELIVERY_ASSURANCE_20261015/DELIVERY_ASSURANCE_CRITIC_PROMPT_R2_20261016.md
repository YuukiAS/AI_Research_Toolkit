# Delivery Assurance — Independent Critic Prompt R2

你现在担任 AI Research Stack 的独立架构 Critic，复核 Delivery Assurance（交付保障）EXECUTION_READY_REVIEW_R1 的最小返修 R2。

本轮不是重新审整个方向，也不是扩大范围。上一轮只有一个仍阻塞执行准备度的 finding：`DA-R1-F01 — NEGATIVE_SCENARIO_VERDICT_COLLISION`。请优先复核该 finding 是否被最小、完整地关闭，并检查 R2 是否意外改变了已通过的其他合同。没有新的直接证据，不得重开已经关闭的 `DA-R0-F01` / `DA-R0-F02`，也不得移动验收终点。

## Active Review Context

- target_repo: `YuukiAS/AI_Research_Toolkit`
- design_topic_or_task_key: `software-production--delivery-assurance`
- source_branch: `research/software-production-decision-20261013`
- review_stage: `EXECUTION_READY_REVIEW_R2`
- frozen_package_commit: `ae6b338ae3e0edf1ab1906cf67cc95938fdde9eb`
- proposal: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PROPOSAL_R2_20261016.md`
- canonical_goal: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PHASE1_GOAL_R2_20261016.md`
- kickoff_draft: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PHASE1_KICKOFF_DRAFT_R2_20261016.md`
- previous_review: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_CRITIC_REVIEW_R1_20261015.md`
- previous_review_commit: `b8bd16c346ed51fa414726de8474233b27f36284`
- previous_reviewed_package: `e966447ad134a94e4003f8d4bbc3d8073e601b28`
- blocker_to_recheck: `DA-R1-F01 — NEGATIVE_SCENARIO_VERDICT_COLLISION`
- expected_review_output: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_CRITIC_REVIEW_R2_20261016.md`

本轮仍然只审查 Proposal + Goal + Kickoff 的执行准备度。不要执行 Phase 1，不要修改 Bridge、AI Skills、consumer、Windows、Slurm、GPU、tmux 长任务或任何付费/生产系统。

## 1. 强制读取

先实际读取 `YuukiAS/AI_Skills_Collection@main` 最新：

- `docs/workflows/PLANNER_ROLE_CONTRACT.md`
- `docs/workflows/CRITIC_ROLE_CONTRACT.md`
- `docs/workflows/PLUGIN_CAPABILITY_GATE_POLICY.md`
- `docs/workflows/AI_SKILLS_MAINTENANCE_BOARD.md`

再读取上一轮 Critic review，以及 `YuukiAS/GPT_Codex_AI_Bridge_Kit@main` 最新：

- `AGENTS.md`
- `docs/TODO_LOCAL_AUTONOMOUS_ACCEPTANCE_WORKFLOW.md`
- `docs/V0_5_REVIEWED_HANDOFF_IMPLEMENTATION_SPEC.md`

并核对当前 OpenAI 官方 Hook 文档：

- `https://developers.openai.com/codex/hooks`

最后从冻结提交 `ae6b338ae3e0edf1ab1906cf67cc95938fdde9eb` 读取 R2 的 Proposal / Goal / Kickoff。不要用分支后续提交替代冻结对象。

## 2. 先复核上一轮 finding

R2 对 `DA-R1-F01` 采取 `ACCEPT`，只做以下语义修复：

1. 明确三层判定，不再混用：
   - `scenario_observed_status`：描述故障注入场景中 DA 是否能提供交付保证；P10/P11 故意注入时允许 `UNPROVEN` / `UNKNOWN`；
   - `scenario_verdict = PASS|FAIL`：判断该负例是否按预期 fail closed；
   - `phase1_verdict = GO|NO_GO`：整个 Phase 1 的最终结论。
2. P10/P11 故意制造 untrusted/disabled/timeout/error/malformed 时，若外部 probe 证明：
   - 没有 false DA PASS；
   - 没有额外 continuation；
   - 没有 authority expansion；
   - 没有非预期写入/副作用；
   则该负例允许 `scenario_verdict=PASS`，即使 `scenario_observed_status=UNPROVEN|UNKNOWN`。
3. 每个 P10/P11 负例结束后必须恢复 trusted/enabled 正常配置，并重新核对 Hook definition identity 与最终主链一致；若需要再次人工 trust，停在 `HOOK_TRUST_REQUIRED`，禁止 bypass。
4. 只有正常配置无法建立/恢复，或负例出现 false DA PASS、额外 continuation、权限扩大、非预期写入/副作用，才令 `phase1_verdict=NO_GO`。
5. 生产 session 没有 Hook readiness evidence 时仍不得宣传为 Delivery Assurance guaranteed。

请判断这是否完整关闭原 blocker 的因果风险，并检查 Proposal §11、Phase 1 场景表、P10/P11、GO/NO-GO、DA-G08 和 Kickoff 是否使用同一判定语义。

## 3. 必须确认未发生范围漂移

R2 按 Planner 合同声明以下内容必须保持 R1 不变。请只检查是否被意外改动，不重新设计：

- Bridge / `workflow-core` / domain-project 三层权威分工；
- Local Autonomous Acceptance = CLOSED；
- Program Run 后做；
- 无新 repo、daemon、state machine、第二 Slurm owner；
- Phase 1 `auto_repair_budget=1`；
- `Interrupt` 优先；
- event identity 与 task identity 分离；
- machine-local atomic single-writer；
- synthetic continuation 不新增 authority；
- P1–P13 除 P10/P11 verdict 语义外的覆盖不变；
- DA-G01–DA-G16 编号和能力边界不变；
- workflow-core 正式 maintenance tracking 仍在 Phase 1 GO 后、首次实质生产设计/实现交接前进入；
- Phase 1 不修改 Bridge / AI Skills / consumer / Windows / Slurm / paid systems。

若 R2 对上述任一项发生实质漂移，才可新增 blocker；纯措辞、版本 locator 或为关闭 `DA-R1-F01` 必需的判定字段不算范围扩大。

## 4. 独立核查当前 Hook 行为

至少确认官方文档仍支持以下事实，因为它们直接影响本 finding：

- project hook 的 trust/definition-hash 行为；
- `Stop` 的 `decision: "block"` 会产生 continuation；
- `Stop` 的 `stop_hook_active`；
- `continue:false` 对 matching Stop continuation 的优先关系；
- `Interrupt` 输出不能阻止中断或重启 turn；
- 多个 matching command hooks 会并发启动。

如果官方行为已变化，按当前官方来源评审，并说明是否影响 R2。

## 5. Execution-ready 一致性检查

必须把 Proposal、Goal、Kickoff 作为同一执行包审：

- Proposal 是否把场景观察状态、场景判决、整轮判决分开；
- Goal 是否在 P10/P11 和 GO/NO-GO 中一致使用同一三层语义；
- DA-G08 是否允许“故障按预期 fail closed = 场景 PASS”，同时保留“正常配置不可用 = 整轮 NO-GO”；
- Kickoff 是否只同步这一判定语义，没有扩大授权；
- Kickoff 是否仍要求恢复 trusted/enabled 正常配置并核对 Hook identity；
- 没有 trust bypass；
- 没有从 Phase 1 自动进入 Phase 2；
- 没有生产仓库/Windows/Slurm/付费授权扩张。

## 6. 判决规则

只允许：

`PASS`

或

`REVISE`

### 若 REVISE

优先复核 `DA-R1-F01`。若仍未关闭，保留该 ID；只有新事实或 R2 新引入的真实风险才新增 `DA-R2-Fxx`。每个 blocker 必须包含要求、直接证据、因果风险、最小关闭条件和责任 owner。非阻塞建议单列，不得移动终点。

最后按 Critic Role Contract 自动生成可直接复制给 Planner 的完整下一交接 Prompt，并明确 Phase 1 仍未授权。

### 若 PASS

必须明确：

- reviewed_object = `R2`；
- frozen_package_commit = `ae6b338ae3e0edf1ab1906cf67cc95938fdde9eb`；
- `DA-R1-F01=CLOSED`；
- `DA-R0-F01=CLOSED`；
- `DA-R0-F02=CLOSED`；
- PASS scope = Proposal R2 + Phase 1 Goal R2 + Kickoff Draft R2 的执行准备度；
- `READY_FOR_USER_KICKOFF=YES`；
- `PHASE1_EXECUTED=NO`；
- `PRODUCTION_IMPLEMENTATION_AUTHORIZED=NO`；
- `PHASE2_AUTHORIZED=NO`。

因为同一 major round 此前出现过 REVISE，PASS 回复必须先用自然中文解释 `DA-R1-F01` 如何关闭、哪些机制没有改变、本 PASS 证明与不证明什么，然后再输出 machine-readable fields。

若 execution-ready PASS，按 Critic Role Contract 逐字输出冻结包中已经审查的 Kickoff Draft R2，不能临场改写。

## 7. 审查产物

将完整审查写入：`docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_CRITIC_REVIEW_R2_20261016.md`

只写 review artifact；不要修改 Proposal/Goal/Kickoff 或任何生产仓库。

最终回复先给 PASS/REVISE 和最重要理由，再给 review path/commit，并按 Critic Role Contract 生成下一交接。
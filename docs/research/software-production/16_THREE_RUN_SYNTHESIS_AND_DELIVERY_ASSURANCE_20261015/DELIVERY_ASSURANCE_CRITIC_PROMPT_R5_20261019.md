# Delivery Assurance — Independent Critic Prompt R5

你现在担任 AI Research Stack 的独立 Critic，对 Delivery Assurance Phase 1 的 R5 **最小 execution-environment delta** 做 `EXECUTION_READY_REVIEW_R5`。

这不是重新研究 Delivery Assurance，也不是重新评估已通过的架构、Gate、P1–P13、权限或恢复设计。R4 已获得 `EXECUTION_READY_REVIEW_R4=PASS`；随后真实执行环境证据证明：**真实 `CODEX_HOME` + 临时 `CODEX_SQLITE_HOME` 会触发既有 rollout backfill**，因此 R4 对 Codex 私有状态的隔离要求与当前正常 Codex 实现冲突。

本轮只复核 R5 是否正确把执行环境收回到“正常 Codex state + 只隔离 Delivery Assurance 自己拥有的 state”，以及是否意外造成范围漂移。

## Active Review Context

- target_repo: `YuukiAS/AI_Research_Toolkit`
- design_topic_or_task_key: `software-production--delivery-assurance`
- source_branch: `research/software-production-decision-20261013`
- reviewed_object: `R5`
- review_stage: `EXECUTION_READY_REVIEW_R5`
- frozen_package_commit: `58717a6b3ace4f5ccf094fb4f8754231af762d54`
- proposal:
  `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PROPOSAL_R5_20261019.md`
- canonical_goal:
  `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PHASE1_GOAL_R5_20261019.md`
- kickoff_draft:
  `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PHASE1_KICKOFF_DRAFT_R5_20261019.md`
- previous_review:
  `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_CRITIC_REVIEW_R4_20261018.md`
- previous_review_available_at_commit:
  `da89985959aabb223dd16407bbf854446c257e4b`
- previous_approved_package:
  `2e37fa11306d61fe56f402e7745939f0c458686e`
- planned_execution_branch:
  `work/delivery-assurance-hook-probe-r5`
- expected_review_output:
  `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_CRITIC_REVIEW_R5_20261019.md`

不要执行 Phase 1，不要修改 Proposal/Goal/Kickoff，不要修改 Bridge、AI Skills、consumer、Windows、Slurm、GPU、tmux 长任务或付费系统。

## 一、强制读取

先读取 `YuukiAS/AI_Skills_Collection@main` 最新：

- `docs/workflows/PLANNER_ROLE_CONTRACT.md`
- `docs/workflows/CRITIC_ROLE_CONTRACT.md`
- `docs/workflows/PLUGIN_CAPABILITY_GATE_POLICY.md`
- `docs/workflows/AI_SKILLS_MAINTENANCE_BOARD.md`

再读取：

1. R4 Critic PASS；
2. frozen R5 Proposal；
3. frozen R5 Goal；
4. frozen R5 Kickoff。

不要重新研究架构、替代路线、Gate、状态机或产品方向。

## 二、本轮直接事实

把以下用户转交的真实执行证据作为本轮事实来源：

> 真实 `CODEX_HOME` + 临时 `CODEX_SQLITE_HOME` 会触发既有 rollout backfill，因此“隔离 SQLite + 禁止消费/迁移既有 session/thread state + 真实 CODEX_HOME 近乎零变化”与当前 Codex 正常实现冲突。

本轮不要求重新证明这条事实，也不要把它解释为 P1–P13 的 PASS/FAIL。R5 只修执行环境 ownership。

## 三、只复核 R5 execution-environment delta

R5 应只做以下变化：

### 1. 正常 Codex state

- 使用用户正常、已登录的真实 `CODEX_HOME`；
- 使用 Codex 正常 SQLite/state；
- **不设置临时 `CODEX_SQLITE_HOME`**；
- 不为 probe 改写 `sqlite_home`、`log_dir`、history/session/rollout 持久化策略；
- 不再要求真实 `CODEX_HOME` 在 probe 前后近乎零变化。

### 2. Codex 内部状态退出 DA 验收范围

以下 Codex 自身正常产生的内部变化不得再作为 Delivery Assurance probe 的 PASS/FAIL 或 setup blocker：

- SQLite 更新；
- 索引；
- 日志；
- session / rollout 持久化；
- rollout backfill；
- authentication maintenance。

请确认 Goal/HOOK_PREFLIGHT/Kickoff 已删除 R4 的临时 SQLite、临时 log、`history.persistence=none`、`--ephemeral`、`SETUP_SQLITE_ISOLATION_UNPROVEN`、`SETUP_STATE_ISOLATION_UNPROVEN` 和 “real CODEX_HOME 除 Hook trust 外无 probe durable effects” 等当前验收要求。

历史说明中提到这些旧要求不算当前合同，只要明确是在说明 R4 失败原因。

### 3. 只隔离 Delivery Assurance 自己拥有的 state

R5 应只隔离：

- task-owned probe workspace；
- candidate/evidence；
- project Hook definition / handler；
- 临时 `AI_BRIDGE_STATE_HOME`。

请确认没有新增第二数据库、daemon、state machine 或新的共享运行状态。

### 4. Codex 私有状态禁止直接访问

probe handler、Executor、diagnostic code 必须禁止直接：

- 读取；
- 修改；
- 复制；
- 导出；
- 打印；
- 软链接；
- 解析；
- 依赖

以下 Codex 私有状态：

- `auth.json`；
- Codex SQLite / state DB；
- sessions / archived_sessions；
- rollouts / rollout indexes；
- credential store；
- 其他 Codex 私有数据库、cache、session/UI state。

当前事件身份和机械事实只能通过正常 Codex/Hook 接口、普通 Git/worktree facts 与 probe 自己的 candidate/evidence 获得。

### 5. Hook/project trust 保持 R4

必须保持：

- existing project trust only；
- 不新增 `projects.<path>.trust_level`；
- 精确 project Hook definition/hash 由用户本人通过正常 `/hooks` trust；
- 不脚本化 trust；
- 不使用 `--dangerously-bypass-hook-trust`；
- `/hooks` 枚举全部 Hook 来源；
- 无法归因的 matching `Stop` controller -> setup blocker；
- 不为实验修改 existing user/plugin/managed Hook 或 Host Policy。

## 四、确认测试与核心合同没有被缩减

R5 不能因为执行环境简化而缩减任何已通过能力合同。

请检查并明确确认以下全部保持 R4 不变：

- P1–P13 全部场景；
- `auto_repair_budget=1`；
- `Interrupt` 优先；
- event identity / task identity 分离；
- machine-local atomic single-writer；
- candidate binding / stale evidence；
- synthetic continuation 不新增 authority；
- P10/P11 的 `scenario_observed_status / scenario_verdict / phase1_verdict` 三层判定；
- DA-G01–DA-G16 编号与能力边界；
- Local Autonomous Acceptance = CLOSED；
- Program Run 后做；
- 无新 repo / daemon / workflow state machine / 第二 Slurm owner；
- Phase 1 不修改生产 Bridge、AI Skills、consumer、Windows、Slurm、GPU、tmux 长任务或 paid systems；
- workflow-core maintenance tracking 触发点不变；
- Phase 1 GO 后立即停止，不自动进入 Phase 2。

DA-G01 为反映 R5 execution environment 而移除“临时 Codex SQLite/log/rollout”证据，只属于同一 Gate 的执行环境修正；不要因此新增 Gate。

## 五、同版一致性

检查 frozen package `58717a6b3ace4f5ccf094fb4f8754231af762d54` 中：

- Proposal = R5；
- Goal = R5；
- Kickoff = R5；
- GO 明确绑定 Proposal R5；
- execution branch = `work/delivery-assurance-hook-probe-r5`；
- review stage = `EXECUTION_READY_REVIEW_R5`；
- evidence directory = `phase1_hook_probe_r5/`；
- Kickoff 是短执行授权，不重新引入 R4 的 Codex private-state isolation 要求；
- Critic PASS 仍不能替代用户实际发送 Kickoff；
- Critic PASS 仍不能替代执行时用户本人完成精确 Hook trust。

## 六、判决

只允许：

`PASS`

或

`REVISE`

### 若 REVISE

只允许阻塞与上述 R5 execution-environment delta 直接相关的真实风险，或 R5 新引入的范围漂移。

不要重新审整个 Delivery Assurance，不要新增替代路线、Gate、状态机或其他要求。

每个 blocker 必须包含：

1. 对应要求；
2. 直接证据；
3. 因果失败风险；
4. 最小关闭条件；
5. 责任 owner。

并按 Critic Role Contract 生成唯一下一交接。

### 若 PASS

先用正常中文说明：

- 为什么 R4 的临时 SQLite 隔离要求与真实 Codex backfill 冲突；
- R5 如何只隔离 Delivery Assurance 自己拥有的 state；
- 为什么 Codex SQLite/log/session/rollout/auth 内部变化不再属于 DA probe 验收；
- 为什么禁止直接读取 Codex 私有 state 仍然保证边界；
- P1–P13 和全部核心合同没有被缩减；
- 本 PASS 证明与不证明什么。

然后明确：

```text
reviewed_object=R5
frozen_package_commit=58717a6b3ace4f5ccf094fb4f8754231af762d54
review_stage=EXECUTION_READY_REVIEW_R5

DA-R0-F01=CLOSED
DA-R0-F02=CLOSED
DA-R1-F01=CLOSED
DA-R3-F01=CLOSED
DA-R3-F02=CLOSED

READY_FOR_USER_KICKOFF=YES
READY_FOR_CODEX=YES
PHASE1_EXECUTED=NO
PHASE1_VERDICT=NOT_REACHED
PRODUCTION_IMPLEMENTATION_AUTHORIZED=NO
PHASE2_AUTHORIZED=NO
```

如果给 execution-ready PASS，按 Critic Role Contract **逐字输出 frozen package 中已审查的短 R5 Kickoff Draft**，不得临场改写。

## 七、审查产物

将完整审查写入：

`docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_CRITIC_REVIEW_R5_20261019.md`

只写 Critic review artifact；不要修改 R5 Proposal、Goal、Kickoff，不要运行 Phase 1。

最终回复按 Critic Role Contract 给出 review path/commit 和唯一下一入口。

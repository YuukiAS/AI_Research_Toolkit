# Delivery Assurance Critic Review R5

Verdict: **PASS**

- review_stage: `EXECUTION_READY_REVIEW_R5`
- target_repo: `YuukiAS/AI_Research_Toolkit`
- design_topic_or_task_key: `software-production--delivery-assurance`
- source_branch: `research/software-production-decision-20261013`
- reviewed_object: `R5`
- frozen_package_commit: `58717a6b3ace4f5ccf094fb4f8754231af762d54`
- proposal: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PROPOSAL_R5_20261019.md`
- canonical_goal: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PHASE1_GOAL_R5_20261019.md`
- kickoff_draft: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PHASE1_KICKOFF_DRAFT_R5_20261019.md`
- previous_review: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_CRITIC_REVIEW_R4_20261018.md`
- previous_review_commit: `da89985959aabb223dd16407bbf854446c257e4b`
- `DA-R0-F01=CLOSED`
- `DA-R0-F02=CLOSED`
- `DA-R1-F01=CLOSED`
- `DA-R3-F01=CLOSED`
- `DA-R3-F02=CLOSED`
- `READY_FOR_USER_KICKOFF=YES`
- `READY_FOR_CODEX=YES`
- `PHASE1_EXECUTED=NO`
- `PHASE1_VERDICT=NOT_REACHED`
- `PRODUCTION_IMPLEMENTATION_AUTHORIZED=NO`
- `PHASE2_AUTHORIZED=NO`

## 1. 核心判断

R5 正确关闭了 R4 暴露的执行环境问题，而且没有缩减 Delivery Assurance 的核心能力合同。

R4 的问题不是 Stop Hook 主链失败，而是把 Codex 自己的 SQLite、rollout、session、日志与认证状态也纳入了 Delivery Assurance 的隔离验收。真实运行已经证明，真实 `CODEX_HOME` 配合新的临时 `CODEX_SQLITE_HOME` 会触发现有 rollout backfill，因此继续要求“正常 Codex 工作，同时其私有状态又不被读取/迁移/更新”与当前 Codex 实现冲突。

R5 把边界收回到正确 ownership：Codex 自己的 SQLite、索引、日志、session、rollout/backfill 与认证维护继续由 Codex 自己管理；Delivery Assurance 只隔离它自己拥有的 task workspace、candidate/evidence、Hook handler 与 `AI_BRIDGE_STATE_HOME`。同时 probe/handler/Executor/diagnostic code 明确禁止直接读取、修改、复制、导出、打印、软链接、解析或依赖 Codex 私有状态。

这不是降低安全标准，而是删除了一个不属于 Delivery Assurance 产品职责的环境纯净度要求。

## 2. 治理与冻结来源

本轮实际读取 `YuukiAS/AI_Skills_Collection@main`，审查时 main 为：

`7e486e776570fcb5ec959777cc2d6bcd398d2a0f`

读取：

- `docs/workflows/PLANNER_ROLE_CONTRACT.md`；
- `docs/workflows/CRITIC_ROLE_CONTRACT.md`；
- `docs/workflows/PLUGIN_CAPABILITY_GATE_POLICY.md`；
- `docs/workflows/AI_SKILLS_MAINTENANCE_BOARD.md`。

还实际读取：

- R4 Critic PASS；
- frozen Proposal R5；
- frozen Goal R5；
- frozen Kickoff R5。

目标仓库当前分支根目录未发现 `AGENTS.md`，因此没有额外 root AGENTS 规则可应用。

R4 -> R5 的冻结包差异仅新增 R5 Proposal/Goal/Kickoff 与上一轮 review/prompt 文档；没有生产 Bridge、AI Skills 或 consumer 实现变更。

## 3. 当前 OpenAI Codex 行为核查

本轮只核查与 R5 delta 直接相关的当前官方行为。

### 正常 Codex state

OpenAI 当前正式环境变量文档明确：

- `CODEX_HOME` 是 Codex 状态根目录，包含 config、auth、logs、sessions 等；
- `CODEX_SQLITE_HOME` 只控制 SQLite-backed state 的存储位置；
- `sqlite_home` 配置可以覆盖该环境变量。

因此 R5 不再把 `CODEX_SQLITE_HOME` 当作“完整隔离 Codex 私有状态”的工具是正确的。

### 认证与私有状态

当前认证文档确认登录详情会缓存于 `CODEX_HOME/auth.json` 或操作系统 credential store；`auth.json` 含 access token，应按密码级敏感信息处理。R5 禁止 probe 直接读取、解析或复制认证材料符合官方边界。

### Hook/project trust

当前 Hook 文档确认：

- 非 managed Hook 必须先 review/trust；
- trust 绑定当前精确 hook definition hash；
- project-local Hook 只有 project `.codex/` layer trusted 时才加载；
- `/hooks` 是查看来源、review/trust 的正常入口；
- 多个 matching hooks 会全部运行，同事件多个 command hook 可并发启动。

因此 R5 保留 existing project trust、精确 Hook trust、来源枚举和冲突 fail-closed 是必要的。

### CLI 旧隔离参数

当前 CLI 文档仍说明：

- `--ignore-user-config` 不加载 `$CODEX_HOME/config.toml`，authentication 仍使用 `CODEX_HOME`；
- `--ephemeral` 只保证不把 session rollout files 持久化到磁盘。

R5 不再把 `--ephemeral` 或临时 SQLite 作为 Phase 1 必须的环境纯净度条件，不与当前官方语义冲突。

## 4. R5 execution-environment delta

### 4.1 正常 Codex state：PASS

R5 明确：

- 使用正常、已登录的真实 `CODEX_HOME`；
- 使用 Codex 正常 SQLite/state；
- 不设置临时 `CODEX_SQLITE_HOME`；
- 不覆盖 `sqlite_home`、`log_dir` 或 history/session/rollout persistence；
- 不再要求真实 `CODEX_HOME` 在 probe 前后保持近乎零变化。

Goal、Proposal 与 Kickoff 一致。

### 4.2 Codex 内部状态退出 DA 验收范围：PASS

当前执行合同已经删除 R4 的以下要求：

- 临时 SQLite 作为 Gate；
- 临时 log；
- `history.persistence=none`；
- `--ephemeral` 作为必须条件；
- `SETUP_SQLITE_ISOLATION_UNPROVEN`；
- `SETUP_STATE_ISOLATION_UNPROVEN`；
- “真实 `CODEX_HOME` 除 Hook trust 外不得有其他 durable effects”的当前验收条件。

Proposal 中仍出现这些字符串的地方都明确是历史 R4 失败说明或“R5 不再要求”的表述，不构成当前执行合同。

### 4.3 只隔离 Delivery Assurance 自己的 state：PASS

R5 只要求隔离：

- task-owned probe workspace；
- candidate/evidence；
- task-owned project Hook definition/handler；
- 临时 `AI_BRIDGE_STATE_HOME`。

没有新增第二数据库、daemon、watcher、workflow state machine 或共享 runtime owner。

### 4.4 Codex 私有状态禁止直接访问：PASS

Goal 和 Kickoff 都明确禁止 probe handler、Executor、diagnostic code 直接读取、修改、复制、导出、打印、软链接、解析或依赖：

- `auth.json`；
- Codex SQLite/state DB；
- sessions / archived sessions；
- rollouts / rollout indexes；
- credential store；
- 其他 Codex 私有数据库、cache、session/UI state。

当前身份与候选事实只能来自正常 Codex/Hook 接口、普通 Git/worktree facts 和 probe 自己的 evidence。

这条边界足以防止 Delivery Assurance 通过私有数据库伪造 thread/candidate identity，同时不再要求它控制 Codex 产品自己的正常内部状态。

### 4.5 Hook/project trust：PASS

R4 合同保持不变：

- existing project trust only；
- 不新增 `projects.<path>.trust_level`；
- 当前精确 project Hook definition/hash 由用户本人通过 `/hooks` trust；
- 不脚本化 trust；
- 不使用 `--dangerously-bypass-hook-trust`；
- `/hooks` 枚举所有实际 Hook 来源；
- matching Stop controller 无法归因则 setup blocker；
- 不为实验修改现有 user/plugin/managed Hook 或 Host Policy。

## 5. 核心合同未缩减

本轮逐项核对，R5 保持：

- P1–P13 全部场景；
- `auto_repair_budget=1`；
- Interrupt 优先；
- event identity 与 task identity 分离；
- machine-local atomic single-writer；
- candidate binding / stale evidence；
- synthetic continuation 不新增 authority；
- P10/P11 三层判定；
- DA-G01–DA-G16 编号和能力边界；
- Local Autonomous Acceptance = CLOSED；
- Program Run 后做；
- 无新 repo / daemon / workflow state machine / 第二 Slurm owner；
- Phase 1 不修改生产 Bridge、AI Skills、consumer、Windows、Slurm、GPU、tmux 长任务或付费系统；
- workflow-core maintenance tracking 触发点不变；
- Phase 1 GO 后立即停止，不自动进入 Phase 2。

DA-G01 只把错误的“临时 Codex 私有状态隔离”证据换成正常 Codex 环境下的 Hook 来源/信任/DA-owned state 可归因与“不直接读私有 state”，属于同一能力门禁的执行环境修正，不需要新增 Gate。

## 6. 同版一致性

冻结包 `58717a6b3ace4f5ccf094fb4f8754231af762d54` 一致：

- Proposal = R5；
- Goal = R5；
- Kickoff = R5；
- GO 绑定 Proposal R5；
- execution branch = `work/delivery-assurance-hook-probe-r5`；
- review stage = `EXECUTION_READY_REVIEW_R5`；
- evidence directory = `phase1_hook_probe_r5/`；
- Kickoff 是短执行授权，没有重新复制 Proposal/Goal，也没有重新引入 R4 的私有状态隔离要求。

Critic PASS 不替代用户实际发送 Kickoff，也不替代执行时用户本人完成精确 Hook trust。

## 7. PASS 范围

本 PASS 批准的是：

**Proposal R5 + Goal R5 + 短 Kickoff R5 的 Phase 1 execution readiness。**

它证明：R5 已把 Phase 1 调整为在正常 Codex 环境中验证真正的 Stop/返修机制，同时仍把 Delivery Assurance 自己的状态、权限与身份边界限制清楚。

它不证明：

- Phase 1 已运行或 GO；
- P1–P13 已通过；
- Stop Hook 主链已经成立；
- Delivery Assurance 已生产实现；
- Bridge/workflow-core/consumer 已接入；
- Phase 2 已授权；
- 任何生产发布、Windows、Slurm、GPU、tmux 长任务或付费动作已获授权。

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

NEXT_HANDOFF=CODEX
```

## 8. Approved Kickoff Draft R5 — verbatim

```text
APPROVED_PROPOSAL_PATH=docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PROPOSAL_R5_20261019.md
APPROVED_GOAL_PATH=docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PHASE1_GOAL_R5_20261019.md
APPROVED_KICKOFF_PATH=docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PHASE1_KICKOFF_DRAFT_R5_20261019.md
APPROVED_COMMIT=58717a6b3ace4f5ccf094fb4f8754231af762d54
READY_FOR_CODEX=YES
=== APPROVED CODEX KICKOFF BEGIN ===
```

# Delivery Assurance Phase 1 Hook Probe — Kickoff Draft R5

Status: **DRAFT ONLY — DO NOT EXECUTE UNTIL INDEPENDENT CRITIC PASS AND THE USER SENDS THIS KICKOFF**  
Proposal: `DELIVERY_ASSURANCE_PROPOSAL_R5_20261019.md`  
Goal: `DELIVERY_ASSURANCE_PHASE1_GOAL_R5_20261019.md`  
Planned execution branch: `work/delivery-assurance-hook-probe-r5`

> 只有独立 Critic 对同版 Proposal / Goal / Kickoff 给出 `EXECUTION_READY_REVIEW_R5=PASS`，并且我随后实际发送本 Kickoff，才形成 Phase 1 执行授权。

执行 **Delivery Assurance Phase 1 Hook Probe R5**。严格读取 Critic 批准的 R5 package commit、Proposal R5、Goal R5、本 Kickoff 和对应 Critic PASS。只执行 Phase 1，不做生产实现。

执行环境使用我当前正常、已登录的真实 `CODEX_HOME` 和 Codex 正常 SQLite/state。**不要设置临时 `CODEX_SQLITE_HOME`，不要为 probe 改写 `sqlite_home`、`log_dir`、history/session/rollout 持久化策略。** Codex 自身正常产生的 SQLite、索引、日志、sessions、rollouts/backfill、认证维护等内部状态不属于 Delivery Assurance probe 的验收对象。

只隔离 Delivery Assurance 自己拥有的状态：task-owned probe workspace、candidate/evidence、project Hook handler，以及临时 `AI_BRIDGE_STATE_HOME`。probe handler、Executor 和 diagnostic code **不得直接读取、修改、复制、导出、打印、软链接、解析或依赖** `auth.json`、Codex SQLite、sessions、rollouts、credential store、API key 或其他 Codex 私有状态；只能通过正常 Codex/Hook 接口和 probe 自己的 evidence 工作。

保持 existing project trust，不新增 `projects.<path>.trust_level`。通过正常 `/hooks` 枚举全部 Hook 来源；若存在无法归因的 matching `Stop` controller，setup 立即停止。当前精确 project Hook definition/hash 必须由我本人通过正常 `/hooks` 审核并 trust；不得脚本化，不得使用 `--dangerously-bypass-hook-trust`。如果尚未 trusted，停在 `HOOK_TRUST_REQUIRED`，只告诉我 source、definition/hash、当前状态和唯一所需操作。

禁止重新 Sign in、Device Code、API key fallback、复制/软链接认证缓存；禁止修改真实 Host Policy、plugin、已有 Hook、managed policy；禁止修改/发布 Bridge、AI Skills 或任何 consumer；禁止 Windows 实机产品操作、Slurm/GPU/tmux 长任务、私有数据、付费第三方服务、新 daemon/watcher/controller/database、Program Run 或新的 Bridge workflow。

setup 通过后严格执行 Goal R5 的 **P1–P13 全部场景**，不得缩减。`auto_repair_budget=1`；用户 `Interrupt` 优先；event/task identity、machine-local atomic single-writer、candidate binding、synthetic continuation 不新增 authority、P10/P11 三层判定全部按 Goal R5 原样执行。

证据写入 Goal R5 指定的 `phase1_hook_probe_r5/` 并提交到专用执行分支。若 setup blocker 发生，保持 Phase 1 verdict 未到达；不要把 Codex 正常内部 SQLite/log/rollout/backfill/auth state 变化当成 blocker。

Phase 1 GO 后立即停止，把结果交回 Planner/Critic；**不要自动进入 Phase 2**。

```text
=== APPROVED CODEX KICKOFF END ===
```

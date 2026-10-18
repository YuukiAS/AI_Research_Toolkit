# Delivery Assurance Critic Review R3

Verdict: **REVISE**

- review_stage: `EXECUTION_READY_REVIEW_R3`
- target_repo: `YuukiAS/AI_Research_Toolkit`
- design_topic_or_task_key: `software-production--delivery-assurance`
- source_branch: `research/software-production-decision-20261013`
- reviewed_object: `R3`
- frozen_package_commit: `d3241b4adbe6e3d32a816b6fe31a61d547555a05`
- proposal: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PROPOSAL_R3_20261018.md`
- canonical_goal: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PHASE1_GOAL_R3_20261018.md`
- kickoff_draft: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PHASE1_KICKOFF_DRAFT_R3_20261018.md`
- previous_execution_ready_pass: `2d7821c32cf0455e6227cb3e0f1e61282920d079`
- `DA-R0-F01=CLOSED`
- `DA-R0-F02=CLOSED`
- `DA-R1-F01=CLOSED`
- `READY_FOR_USER_KICKOFF=NO`
- `PHASE1_EXECUTED=NO`
- `PHASE1_VERDICT=NOT_REACHED`
- `PRODUCTION_IMPLEMENTATION_AUTHORIZED=NO`
- `PHASE2_AUTHORIZED=NO`

## 1. 核心结论

R3 的主要修复方向正确，而且已经解决了 R2 暴露的“临时 `CODEX_HOME` 导致重新登录”问题：它改为复用真实已认证的 Codex 身份，同时把 SQLite、Bridge 本机状态、日志和 rollout 尽量隔离到临时位置；不复制认证材料、不重新登录、不绕过 Hook trust；真正新增的用户动作只保留精确 Hook definition/hash 的人工 trust。

当前不能给 execution-ready PASS，只剩两个很小、可以一次修完的执行包问题：

1. Canonical Goal R3 的最终 GO 条款仍写成“满足 Proposal R2”，这会把最终判决绑定到旧包。
2. R3 Proposal 已正确允许 Codex 认证后端正常消费/维护既有登录，但 Goal/Kickoff 的“真实 `CODEX_HOME` 除 Hook trust 外不得有任何新持久变化”写得过绝对；当前 OpenAI 官方认证行为明确会在使用中自动刷新 ChatGPT token，因此合法的认证后端维护可能被误判成 setup blocker。

这两点都不要求重做架构、Gate、P1–P13 或 setup 设计。完成最小 R4 文字修订后即可再次做窄复核。

## 2. 已读取的当前治理与实现来源

本轮实际读取 `YuukiAS/AI_Skills_Collection@main`，审查时 main 为：

`7e486e776570fcb5ec959777cc2d6bcd398d2a0f`

并读取：

- `docs/workflows/PLANNER_ROLE_CONTRACT.md`，当前 v1.5；
- `docs/workflows/CRITIC_ROLE_CONTRACT.md`；
- `docs/workflows/PLUGIN_CAPABILITY_GATE_POLICY.md`；
- `docs/workflows/AI_SKILLS_MAINTENANCE_BOARD.md`。

当前 v1.5 对 execution-ready review 的要求比 R2 时更明确：Proposal、Goal、Kickoff 必须同版；Codex 开始实质执行所需的产品/授权决定必须已经完成；正常的环境确认和安全 preflight 可以留在执行开始阶段，但不能让 Codex在 probe 之后再决定关键范围。

本轮也实际读取 `YuukiAS/GPT_Codex_AI_Bridge_Kit@main`，审查时 main 为：

`35a976e79c036f6e68ba70e9d2364abc1c274a45`

读取：

- `AGENTS.md`；
- `docs/TODO_LOCAL_AUTONOMOUS_ACCEPTANCE_WORKFLOW.md`；
- `docs/V0_5_REVIEWED_HANDOFF_IMPLEMENTATION_SPEC.md`。

这些当前来源没有推翻 R3 的边界：Local Autonomous Acceptance 仍不是新的 Bridge workflow；Reviewed Handoff 的机器本地状态仍只是运行去重/恢复事实，不是新的任务权威；本轮也没有理由把 Phase 1 改成 watcher、daemon 或第二控制面。

R2 -> R3 的冻结包差异只增加研究/审查/执行包文档，没有修改 Bridge、AI Skills 或 consumer 生产实现。

## 3. 独立核查当前 OpenAI Codex 行为

本轮直接核查当前 OpenAI 官方文档：

- `https://learn.chatgpt.com/docs/auth`
- `https://learn.chatgpt.com/docs/hooks`
- `https://learn.chatgpt.com/docs/developer-commands?surface=cli`
- `https://learn.chatgpt.com/docs/config-file/environment-variables`

并针对 project trust / linked worktree / SQLite state 查阅当前 `openai/codex` 源码。

当前事实与 R3 主方向一致：

- 登录缓存位于 `CODEX_HOME` 下的 `auth.json` 或 OS credential store；复用真实 `CODEX_HOME` 可以复用现有登录。
- ChatGPT 登录在使用过程中会自动刷新 token，因此认证后端可能合法更新其持久缓存。
- `CODEX_SQLITE_HOME` 是正式支持的 SQLite state 位置覆盖，且 `sqlite_home` 配置优先。
- `codex exec --ephemeral` 的正式语义是“不把 session rollout files 持久化到磁盘”。
- `--ignore-user-config` 当前官方承诺只是不加载 `$CODEX_HOME/config.toml`，authentication 仍使用 `CODEX_HOME`；它不提供 R3 所需的“同时隔离所有 user Hook 且保持普通 project Hook trust”的完整保证。因此 R3 不采用它作为正式入口是合理的。
- project-local Hook 只在 project `.codex/` layer trusted 时加载；非 managed Hook 的信任绑定精确 definition hash；`/hooks` 是正式查看来源、review/trust 或 disable non-managed Hook 的入口。
- 多个 matching hooks 会共同运行，同事件多个 command hook 会并发启动；R3 用来源枚举并在不可归因时 setup fail closed 是正确边界。
- linked Git worktree 的 Hook discovery 当前实现确实可能指向 root checkout 对应的 `.codex` Hook folder。因此 R3 规定“不能覆盖用户已有 Hook/config，做不到就 setup blocker”是必要而非过度设计。
- 当前正式文档只明确提供 trust / disable，没有建立一个必须依赖的 revoke/remove trust 正常入口，所以 R3 不直接编辑内部 trust store 的 cleanup 边界是正确的。

## 4. R3 setup/auth-isolation 审查

除下述两个 blocker 外，R3 的 setup 方案可以成立。

### 认证身份

方向正确。真实 `CODEX_HOME` 只用于既有产品认证身份；probe 不读取、复制、导出、打印、软链接或重写认证秘密，也没有重新 Sign in、Device Code 或 API key fallback。

### 非认证运行状态

方向正确。临时 `AI_BRIDGE_STATE_HOME`、`CODEX_SQLITE_HOME`、`log_dir`、`history.persistence=none` 与 `codex exec --ephemeral` 组合，并要求在真实目标版本上用只读诊断确认有效；若无法隔离则在 P1 前停止。这个设计没有把“文档说支持”冒充运行事实。

### project trust 与 Hook trust

方向正确。R3 不授权新增 `projects.<path>.trust_level`；必须使用已有可信项目身份，否则返回 setup blocker。唯一预期人工动作仍是用户通过正式 `/hooks` 审核当前精确 Hook definition/hash。

### 其他 Hook 来源

方向正确。使用真实配置意味着 user/project/plugin/managed Hook 都可能存在，因此必须枚举；无法证明安全共存时停止，而不是修改用户已有配置来让实验通过。

### setup blocker 与 Phase 1 verdict

方向正确。setup 失败仍保持 `NOT_STARTED / NOT_REACHED / P1_P13=NOT_RUN`，不会伪装成 Phase 1 `NO_GO`；这没有改变 R2 已批准的 P10/P11 三层判定。

## 5. Blockers

### `DA-R3-F01 — GO_BINDS_WRONG_PROPOSAL_VERSION`

**对应要求**

Execution-ready Goal 必须与同版 Proposal/Kickoff 构成唯一冻结执行合同。最终 GO 判定不能引用已经被 R3 替代的旧 Proposal。

**直接证据**

冻结的 `DELIVERY_ASSURANCE_PHASE1_GOAL_R3_20261018.md` 在“判定 → GO”第一句仍写：

> 只有 P1–P13 中所有适用场景均满足 Proposal R2，并且：

但同一 Goal 的头部、冻结来源和 Kickoff 都明确绑定 Proposal R3。

**因果失败风险**

如果逐字执行，最终 `phase1_verdict=GO` 的合同可能被解释为按 R2 判定，而 R2 不包含本轮新增加的认证复用、setup-state 隔离、existing project trust、唯一 Hook trust durable effect 等约束。这样会让“R3 setup 没真正满足，但旧 R2 主链满足”存在合同歧义。

这是 locator/version binding 错误，不是架构失败，但 execution-ready 包不能带着错误最终判定引用直接启动。

**最小关闭条件**

只把 Goal R3 最终 GO 条款中的 `Proposal R2` 改为 `Proposal R3`，并检查同一文件不存在其他把当前执行判定绑定到旧 Proposal 的误引用。历史说明中的 R2 引用保留。

不改 P1–P13、Gate、预算、权限或 setup 语义。

**责任 owner**

Planner。

---

### `DA-R3-F02 — AUTH_BACKEND_MAINTENANCE_NOT_EXEMPTED`

**对应要求**

R3 的目标是复用既有认证身份而不让 probe 接触认证秘密。允许 Codex 正常使用已有认证，不能把 Codex 自己合法的 token refresh / credential-store maintenance 错当成“probe 新增持久状态”；同时仍必须保证 probe 代码本身不能读取、复制或改写凭据。

**直接证据**

Proposal R3 §3A.1 已正确写明：

> 正常 Codex 客户端内部为维持已经存在的登录会话而使用其认证后端，属于既有产品身份消费；R3 probe 自身不得观察认证秘密内容。

但 Goal R3 S2 和其 preflight 又采用绝对条件：

- “只允许精确 Hook trust state 这一新增持久效果”
- “real `CODEX_HOME` 新增 durable effects 除 exact Hook trust 外 = NONE”

Kickoff 也要求“没有 Hook trust 之外的新真实 `CODEX_HOME` durable state”。

当前 OpenAI 官方认证文档明确说明：ChatGPT 登录 session 在正常使用过程中会自动刷新 token；file-based credential storage 位于 `CODEX_HOME/auth.json`，也可能使用 OS credential store。也就是说，即使 probe 完全没有越权，Codex 自身仍可能合法更新认证缓存。

**因果失败风险**

当前冻结文字会产生两个坏结果之一：

1. 正常 token refresh 更新认证缓存，被 preflight 误判为 `SETUP_STATE_ISOLATION_UNPROVEN`，再次让用户被 setup 卡住；
2. Executor 为了满足“除了 Hook trust 什么都不能变”的绝对条件，开始观察、阻止或特殊处理认证缓存，从而反而触碰本轮明确要保护的 credential 边界。

这会直接复发 R2 的“为了隔离而破坏正常认证体验”问题。

**最小关闭条件**

在 Proposal/Goal/Kickoff 中统一收紧为：

- real `CODEX_HOME` 中**probe-owned / probe-induced** 的新增持久效果，除用户精确 Hook trust 外必须为 NONE；
- Codex 产品自身为了维持已存在登录而进行的 opaque authentication-backend maintenance（例如 token refresh）不计作 probe state，也不构成本轮新增授权；
- 该例外不得允许 probe handler、Executor 或诊断代码读取认证秘密内容；
- setup 只能在非敏感路径/元数据层观察“认证后端可能发生正常维护”，不能比较、打印、复制 token 内容；
- Sign in、Device Code、API key、复制/软链接 auth cache 等仍全部禁止；
- 除这个认证后端例外外，session/history/log/SQLite/probe cache 的隔离标准保持 R3 原样。

同步修正 Goal 的 preflight field 与 Kickoff 的 setup 条件，避免仍然留下“all durable effects except trust = NONE”的绝对表述。

**责任 owner**

Planner。

## 6. 已通过合同未发生范围漂移

没有新的直接证据要求重开：

- `DA-R0-F01`
- `DA-R0-F02`
- `DA-R1-F01`

R3 也没有改变：

- Bridge / workflow-core / domain-project 三层权威；
- Local Autonomous Acceptance = CLOSED；
- Program Run 后做；
- 无新 repo / daemon / workflow state machine / 第二 Slurm owner；
- `auto_repair_budget=1`；
- Interrupt 优先；
- event identity / task identity 分离；
- machine-local single-writer；
- synthetic continuation 不新增 authority；
- P1–P13 覆盖；
- DA-G01–DA-G16 编号；
- P10/P11 三层判定；
- workflow-core maintenance tracking 触发点；
- Phase 1 不修改生产 Bridge / AI Skills / consumer / Windows / Slurm / GPU / tmux 长任务 / paid systems；
- Phase 1 GO 后仍不能自动进入 Phase 2。

因此本轮不增加第三个 blocker，也不要求重新研究架构。

## 7. 非阻塞观察

1. R3 不采用 `--ignore-user-config` 是正确的保守选择。当前正式 CLI 文档只承诺它忽略 `$CODEX_HOME/config.toml` 且继续使用 `CODEX_HOME` 认证；不需要为了“更隔离”强迫使用。
2. linked worktree 当前确有 root-checkout Hook discovery 语义。R3 已经规定不能覆盖已有 `.codex/hooks.json`/config，无法安全放入 task-owned Hook 就在 setup 阶段停止；当前不需要再新增接口。
3. 当前正式 `/hooks` 文档明确有 disable，但没有形成 R3 可以依赖的 revoke/remove trust 合同；R3 的 residual trust 记录方案可以保留。

## 8. 本轮证明与不证明

本轮证明：R3 的认证复用与状态隔离总体方向可执行，R2 setup blocker 的根因处理方向正确；只需两个非常局部的执行合同修正。

本轮不证明：Phase 1 Hook 主链已经运行、P1–P13 已通过、Delivery Assurance 已实现、任何生产 repo 已接入、Phase 2 已授权。

```text
reviewed_object=R3
frozen_package_commit=d3241b4adbe6e3d32a816b6fe31a61d547555a05
review_stage=EXECUTION_READY_REVIEW_R3

DA-R0-F01=CLOSED
DA-R0-F02=CLOSED
DA-R1-F01=CLOSED

DA-R3-F01=OPEN
DA-R3-F02=OPEN

READY_FOR_USER_KICKOFF=NO
READY_FOR_CODEX=NO
PHASE1_EXECUTED=NO
PHASE1_VERDICT=NOT_REACHED
PRODUCTION_IMPLEMENTATION_AUTHORIZED=NO
PHASE2_AUTHORIZED=NO

NEXT_HANDOFF=PLANNER
```

## 9. 下一交接

```text
NEXT_HANDOFF=PLANNER
=== COPY TO PLANNER BEGIN ===
你现在继续担任 AI Research Stack 的长期 Planner，对 Delivery Assurance Phase 1 R3 execution-ready review 做一次最小 R4 返修。

Active Design Context：

- target_repo: YuukiAS/AI_Research_Toolkit
- design_topic_or_task_key: software-production--delivery-assurance
- source_branch: research/software-production-decision-20261013
- reviewed_object: R3
- review_stage: EXECUTION_READY_REVIEW_R3
- reviewed_package_commit: d3241b4adbe6e3d32a816b6fe31a61d547555a05
- reviewed_proposal:
  docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PROPOSAL_R3_20261018.md
- reviewed_goal:
  docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PHASE1_GOAL_R3_20261018.md
- reviewed_kickoff:
  docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PHASE1_KICKOFF_DRAFT_R3_20261018.md
- critic_review:
  docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_CRITIC_REVIEW_R3_20261018.md
- critic_verdict: REVISE
- blocking_findings:
  - DA-R3-F01 — GO_BINDS_WRONG_PROPOSAL_VERSION
  - DA-R3-F02 — AUTH_BACKEND_MAINTENANCE_NOT_EXEMPTED

先实际读取 AI_Skills_Collection 最新 main 的 Planner/Critic Role Contract、Plugin Capability Gate Policy、AI Skills Maintenance Board，以及本次 Critic review；再核对当前 OpenAI Codex auth/hooks/CLI/config 官方文档。不要重开已关闭的 DA-R0-F01、DA-R0-F02、DA-R1-F01。

本轮只做两个最小修订，不重新设计 Delivery Assurance：

1. DA-R3-F01：
   - 把 Canonical Goal 当前 GO 条款中“P1–P13 满足 Proposal R2”修正为“满足 Proposal R3/当前 R4 对应 Proposal”；
   - 新版完整包统一引用当前 Proposal 版本；
   - 历史说明里的 R2 locator 保留，不改历史事实。

2. DA-R3-F02：
   - 统一 Proposal、Goal、preflight fields、Kickoff 的 durable-state 表述；
   - 明确 real CODEX_HOME 中“probe-owned/probe-induced 新增持久效果”除用户本人对精确 Hook definition/hash 的 trust 外必须为 NONE；
   - Codex 产品自身为了维持既有登录而发生的 opaque authentication-backend maintenance（包括正常 token refresh）允许发生，不计作 probe state，也不构成新增用户授权；
   - probe handler / Executor / diagnostic code 仍严禁读取、复制、打印、导出、软链接或重写 auth/token/credential；
   - 对认证维护只允许非敏感路径/元数据级观察，不读取 secret 内容；
   - 重新登录、Device Code、API key、复制 auth cache 仍全部禁止；
   - SQLite/log/history/session/probe state 的隔离标准保持 R3 不变。

保持以下全部不变：
- R3 的认证复用方向；
- 不使用 --ignore-user-config；
- existing project trust only；
- exact Hook trust 是唯一新的用户显式持久配置动作；
- Hook source conflict fail closed；
- setup blocker 不产生 Phase 1 verdict；
- P1–P13；
- DA-G01–DA-G16；
- auto_repair_budget=1；
- Interrupt 优先；
- authority/single-writer/candidate/P10-P11 合同；
- Local Autonomous Acceptance=CLOSED；
- Program Run 后做；
- 无新 daemon/state machine/第二 Slurm owner；
- Phase 1 不修改生产 Bridge/AI Skills/consumer/Windows/Slurm/GPU/tmux 长任务/付费系统；
- Phase 1 GO 后不能自动进入 Phase 2。

提交完整一致的新版本，建议：
- DELIVERY_ASSURANCE_PROPOSAL_R4_20261018.md
- DELIVERY_ASSURANCE_PHASE1_GOAL_R4_20261018.md
- DELIVERY_ASSURANCE_PHASE1_KICKOFF_DRAFT_R4_20261018.md

生成新的冻结 package commit 后停止，不执行 Phase 1。

最终回复末尾按 Planner Role Contract 自动生成下一条 EXECUTION_READY_REVIEW_R4 Critic prompt，只要求复核 DA-R3-F01、DA-R3-F02 是否关闭以及是否出现意外范围漂移。
=== COPY TO PLANNER END ===
```

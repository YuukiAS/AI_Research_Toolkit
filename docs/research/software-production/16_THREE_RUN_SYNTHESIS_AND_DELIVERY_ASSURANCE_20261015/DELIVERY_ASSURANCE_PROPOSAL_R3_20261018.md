# Delivery Assurance（交付保障）正式 Proposal R3

Status: **PLANNER PROPOSAL / REVIEW REQUIRED / NOT IMPLEMENTATION AUTHORIZATION**  
Design topic: `software-production--delivery-assurance`  
Source branch: `research/software-production-decision-20261013`  
Proposal version: **R3**  
Next review stage: **EXECUTION_READY_REVIEW_R3**  
Research baseline: `a7fd5e387a49c2ca8adbc021b340737688273de2`  
AI Skills read baseline: `YuukiAS/AI_Skills_Collection@7e486e776570fcb5ec959777cc2d6bcd398d2a0f`  
Bridge read baseline: `YuukiAS/GPT_Codex_AI_Bridge_Kit@35a976e79c036f6e68ba70e9d2364abc1c274a45`

本文件是 R2 获得 `EXECUTION_READY_REVIEW_R2=PASS`、用户实际发送 Kickoff 后，由真实 setup 证据触发的**最小执行环境返修**。R2 的架构、权威分工、P1–P13、DA-G01–DA-G16、三项已关闭 finding 与 Phase 1 判定语义全部保持不变；R3 只解决“临时 `CODEX_HOME` 同时切断既有 Codex authentication identity，迫使用户重新登录”的 setup/usability blocker。Phase 1 尚未开始，因此这不是 `phase1_verdict=NO_GO`。本文件**不授权**重新执行 probe，也不授权 Bridge/AI Skills/消费者、Windows、Slurm、GPU、tmux 长任务、付费系统或任何生产发布。

## 1. 核心结论

Delivery Assurance 不是新的 App、中央平台、独立仓库、第四套 Bridge workflow，也不是新的 Reviewer/Controller/daemon。它是一条跨现有层的**交付准入闭环**：

1. **Bridge Kit** 提供 Codex 生命周期接缝与机械事实：当前任务、repo、worktree、session/turn、HEAD/候选、证据新鲜度、唯一写者、失败返回和精确恢复。
2. **AI Skills `workflow-core`** 决定一个任务在声明 `USER_READY` 前需要哪些领域门禁，并把这些要求绑定到当前任务和最终候选。
3. **领域 Skill/Plugin 与项目原生验收**做真正专业判断并产生候选绑定的门禁证据。
4. **项目只保存薄适配**：项目身份、已有任务来源、可用交付类别、已有项目门禁/消费对象/长期 owner 的 locator，不复制 Bridge 核心、领域判断或新状态机。
5. **Persistent Run / CARE / Slurm / 项目原生调度器**继续拥有长期运行寿命和资源事实；Delivery Assurance 只消费其结果和恢复 locator。
6. **Program Run 明确后做**。它未来只能消费可信的交付完成结论，不得重新实现本设计的 QA、候选绑定、权限、Hook 或 Slurm。

默认普通任务不应被升级为复杂门禁。只有项目已启用 Delivery Assurance 且当前任务的冻结来源声明这是受管交付任务时，Stop 检查才具备阻塞完成的资格。

## 2. 对上一轮 Critic 的处理

### DA-R0-F01 — BOUNDED_REPAIR_ESCAPE

**ACCEPT。**

R2 保持以下已关闭合同：

- 自动返修必须有限，不能依赖用户手动中断。
- 阶段 1 探针固定 `auto_repair_budget=1`。第一次真实 Stop 检查失败可产生一次同任务自动返修；第二次 Stop 仍失败时不得再启动返修轮。
- 生产设计中每个受管任务必须解析出一个**有限整数** `auto_repair_budget`；没有声明时默认 1。冻结 Goal 可以在任务开始前显式提高为另一个有限值，运行时不得自行扩张或把 `null/unbounded` 当默认值。
- 除轮次预算外，还必须有重复失败/低进展熔断：同一失败机制在已声称修复后再次出现，或一次返修后候选/门禁没有可验证改善，即使尚有剩余轮次，也停止普通自动返修。
- 用户 `Interrupt`、预算耗尽、Hook 内部错误、身份不一致均不得重新拉起新的修复轮。
- 预算耗尽的终态是 `FAIL` 或 `UNKNOWN`，原因码至少包含 `REPAIR_BUDGET_EXHAUSTED` 或对应运行错误；绝不能转成 `PASS`。

阶段 1 还必须验证：终止自动续写后，实际 Codex UI/CLI 不会继续把先前“完成”表述当作可信 `USER_READY` 结论。如果当前 Stop Hook 输出语义无法把终端非就绪状态明确暴露给用户，则本设计在该宿主上 NO-GO；不得靠后台 daemon 再补一层。

### DA-R0-F02 — HOOK_SCOPE_IDENTITY_AUTHORITY

**ACCEPT；补一处语义澄清，不构成 rebuttal。**

`session_id + turn_id` 是**每次 Hook 检查事件的身份**，不是长期 task identity；自动返修后的新 continuation 可能产生新的 turn。长期任务身份仍由 `task_key + frozen goal/task ref + repo/worktree binding` 保持。

R2 继续保持以下已关闭合同：

- 阶段 1 必须绑定真实目标 Codex host/version，通过正常 `/hooks` 入口枚举全部生效 Hook 来源并确认探针 Hook 当前定义已受信任；禁止使用 `--dangerously-bypass-hook-trust` 制造 PASS。
- 阶段 1 使用隔离的 probe repo/workspace、临时运行状态目录和项目级 Hook；R3 不再切换到未认证的临时 `CODEX_HOME`，而是复用当前真实、已认证的 `CODEX_HOME` 作为既有 authentication/runtime identity。其他可影响 Stop 决策的 Hook 仍必须在 `/hooks` 预检中完整枚举并保持可归因，否则在 P1 前停止为 setup blocker。
- 每个 Stop 检查事件至少绑定：`session_id`、`turn_id`、canonical repo root、worktree identity、当前 `HEAD`、candidate identity、`task_key`。
- 每个检查事件具有稳定幂等键和原子单写者 claim；重复事件只读取同一已完成结果，不能重复运行门禁、重复写证据或生成第二次 continuation。
- Hook 生成的 continuation reason 仅有**诊断和同范围返修指令**效力，不产生任何新增授权。授权来源仍只有原始真实用户请求、已冻结 Goal/Kickoff 或后续真实用户批准。
- 在目标正常配置中，未信任、超时、异常、Hook 冲突、身份不匹配、唯一候选无法确定、第二 writer 无法排除时不能产生 DA PASS；P10/P11 故障注入继续按 R2 已批准的三层判定处理。
- 阶段 1 增加重复 Hook 事件、并发第二处理器、continuation 要求未授权副作用三个负例。

### DA-R1-F01 — NEGATIVE_SCENARIO_VERDICT_COLLISION

**ACCEPT。**

R1 把“故意制造 Hook 未信任/禁用/超时/错误/malformed 的负例”与“目标正常配置不可用时的整个 Phase 1 NO-GO”混成了同一层判定，导致 P10/P11 按预期触发故障时也会机械地终止整轮。R2 只修这一处判定语义，不改变 P1–P13 的其余覆盖、不重开已经关闭的 `DA-R0-F01` / `DA-R0-F02`。

R2 冻结三层判定：

1. **场景观察状态（`scenario_observed_status`）**：描述该故障注入场景里 Delivery Assurance 是否能提供交付保证。P10/P11 故意关闭/取消信任/制造 timeout、error、malformed 时，预期可以是 `UNPROVEN` 或 `UNKNOWN`。
2. **场景判决（`scenario_verdict`）**：评价这个负例是否按预期 fail closed。只有外部 probe 证明没有 Delivery Assurance 假 PASS、没有额外 repair continuation、没有新增 authority、没有非预期写入/副作用，且负例结束后能恢复到正常配置，才记 `PASS`。
3. **整轮判决（`phase1_verdict`）**：只有目标 trusted/enabled 正常配置无法建立或恢复，或者负例出现 false DA PASS、额外 continuation、权限扩大或非预期写入/副作用，才记 `NO_GO`。故意注入的不可用状态本身不是 run-level NO-GO。

P10/P11 每次故障注入结束后都必须恢复到与最终主链一致的 trusted/enabled 正常配置，并重新核对 Hook definition identity。若恢复需要再次人工 trust，则停在 `HOOK_TRUST_REQUIRED`，仍禁止 bypass；无法恢复才是整个 Phase 1 NO-GO。

### R2 PASS 后 setup/usability incident — ACCEPT AS EXECUTION-ENVIRONMENT REFINEMENT

R2 Critic 已在提交 `2d7821c32cf0455e6227cb3e0f1e61282920d079` 对冻结包 `ae6b338ae3e0edf1ab1906cf67cc95938fdde9eb` 给出执行准备度 PASS。用户随后实际发送 Kickoff，但 P1–P13 尚未开始就暴露了新的 setup blocker。用户转交的直接执行事实为：

```text
run_status=SETUP_USABILITY_BLOCKED
phase1_execution_status=NOT_STARTED
phase1_verdict_status=NOT_REACHED
hook_main_chain_verdict=NOT_EVALUATED
P1_P13=NOT_RUN
hook_event_count=0
```

已停止的 probe branch 为 `work/delivery-assurance-hook-probe-r2`；本地提交 `005fee947bafabbfc77f47d744b4717238439905` 由用户明确说明为**仅本地、未 push**。R3 只把它作为用户提供的本地 locator，不声称 GitHub 可读取，也不以其未上传为理由要求用户手工整理证据。当前设计判断所需事实已经由用户直接提供。

根因不是 Hook 主链失败，而是 R2 把整个 `CODEX_HOME` 切到临时目录。当前官方认证文档确认，Codex 会在 `CODEX_HOME` 下的 `auth.json` 或操作系统凭据存储中缓存登录信息；当前 CLI 文档也明确说明 `--ignore-user-config` 虽不读取 `$CODEX_HOME/config.toml`，authentication 仍使用 `CODEX_HOME`。因此切换 `CODEX_HOME` 会把 probe 置于一个没有既有登录身份的新 Codex home，并触发新的 Sign in。用户已明确拒绝为这次 probe 重新登录，也禁止 Device Code、API key、复制/导出/软链接凭据。

R3 将该事件归类为 **setup/usability blocker**：`phase1_execution_status=NOT_STARTED`、`phase1_verdict_status=NOT_REACHED`。它不能被记为 `GO`、`NO_GO`、Hook PASS 或 Hook FAIL。

## 3. 已核实的现实约束

Bridge 当前 `main` 没有 Codex `SessionStart` / `Stop` lifecycle Hook 实现；Reviewed watcher 的真实执行入口仍是独立 `codex exec`，并且现有规格明确指出外部创建线程的安全 live writer takeover 尚未被证明。因此 Delivery Assurance 不能假装已有“接管当前 App thread”的 Bridge 能力。

现有 Review 已经提供两类可复用原则：同一 `target + branch` 唯一官方 watcher，以及 Executor 事件的有界重试；旧 review 的 `implementation_commit` 与当前候选不一致时必须视为 stale。Control 则保留高风险任务的独立权威分工，不能被 Delivery Assurance 降格替代。

Codex 官方 Hooks 当前行为构成阶段 1 的直接技术基础：

- 多文件中的匹配 Hook 会全部运行；同一事件的多个 command Hook 并发启动。
- 项目 Hook 只有在项目 `.codex/` 层受信任时才加载；非受管 Hook 的信任绑定当前 Hook 定义哈希，变化后需重新确认。
- `Stop` 不使用 `matcher`。
- Hook 公共输入有 `session_id`、`cwd`；Stop 另有 `turn_id`、`stop_hook_active`。
- `Stop` 返回 `decision: "block"` 会让 Codex 继续，并自动创建一条新的 continuation prompt；该提示在运行时表现为新的用户提示。
- `Interrupt` Hook 不能阻止用户中断，也不能重新启动 turn。
- Hook 是有用 guardrail，不是完整安全边界。

官方参考：
- https://developers.openai.com/codex/hooks
- https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex
- https://developers.openai.com/cookbook/examples/codex/build_iterative_repair_loops_with_codex

Codex Goal 已经提供线程级持久目标、预算和用户 pause/resume/interrupt，但它仍不能替代候选绑定、领域 QA 或独立交付证据。若阶段 1 的 Stop 续写链 NO-GO，Goal 可以作为下一轮重新设计时要比较的原生替代 substrate；本轮不得静默把 Goal 换成新实现路径来规避失败。

## 3A. R3 execution environment：认证复用与状态隔离

### 3A.1 采用真实已认证 `CODEX_HOME`，但不授权读取或修改凭据

R3 的默认入口复用用户当前真实、已经认证的 `CODEX_HOME`，目的只有两个：继续使用现有 Codex authentication identity，以及让当前 Codex runtime 按正常产品入口工作。这**不等于**授权 probe handler、Codex 任务代码或执行者读取、复制、导出、软链接、打印、重写 `auth.json`、token、credential store、API key 或任何认证材料。

R3 明确禁止把 Sign in、Device Code、API key、复制认证缓存、临时 credential link 作为 fallback。正常 Codex 客户端内部为维持已经存在的登录会话而使用其认证后端，属于既有产品身份消费；R3 probe 自身不得观察认证秘密内容。

### 3A.2 运行状态继续隔离

- probe candidate、handler 和测试数据继续只存在于 task-owned 临时 probe workspace/repo；
- `AI_BRIDGE_STATE_HOME` 继续使用临时目录；
- SQLite-backed runtime state 优先指向临时目录。当前公开配置参考已正式列出 `sqlite_home`；当前 Codex 源码还明确实现 `CODEX_SQLITE_HOME` 作为 SQLite state home 覆盖。因此 R3 可以在**目标实际 Codex 版本的 setup preflight 确认生效后**使用临时 `CODEX_SQLITE_HOME`。必须用 `/debug-config` 或等价当前官方只读诊断确认 effective `sqlite_home`；若 managed requirement 覆盖、目标版本不支持、或实际 state 仍落入真实 `CODEX_HOME`，setup 停止，不通过内部数据库搬运来绕过。
- 正常用户配置仍被读取，但 setup 启动必须用 session-scoped override 把 `log_dir` 指向临时目录，并把 `history.persistence=none`；这两个键都由当前公开配置参考正式定义，不需要修改 user `config.toml`。
- `/hooks` trust 的交互式 setup 过程只做 `/debug-config`、`/hooks` 和必要的 UI review，不发送模型任务。若该 setup 过程仍在真实 `CODEX_HOME` 中产生 Hook trust 之外的新 session/history/log durable state，返回 `SETUP_STATE_ISOLATION_UNPROVEN`，不得假装“只有 trust 被持久化”。
- 真正执行 P1–P13 时优先使用正常配置的 `codex exec --ephemeral`，并继续应用临时 `CODEX_SQLITE_HOME`、临时 `log_dir` 与 `history.persistence=none`；官方 CLI 明确说明 `--ephemeral` 不持久化 session rollout 文件。不得把 `--ephemeral` 与 `--ignore-user-config` 混为一谈。
- 不复制或迁移现有 thread/session 数据；R3 只需要本次 probe 的新临时 runtime state。

### 3A.3 `--ignore-user-config` 不作为 R3 默认入口

当前 CLI 文档只保证 `--ignore-user-config` 不加载 `$CODEX_HOME/config.toml`，同时继续使用 `CODEX_HOME` authentication。进一步核对当前 Codex 源码后，它不满足 R3 所需的“认证保留 + project Hook 正常 trust + 用户 Hook 干扰隔离”的组合保证：

1. config loader 在 `ignore_user_config=true` 时保留一个空的 user layer，而不是删除 user layer；Hook discovery 仍可从该 layer 的 config folder 查找 `hooks.json`，因此它不能可靠地消除所有 user-level Hook 来源。
2. project layer 仍会被发现，但 project trust 与非 managed Hook 的 `trusted_hash` 都属于用户配置状态；忽略 user config 会使正常持久 trust 语义不再等同于普通入口。
3. 当前公开 CLI 参考把该选项列在 `codex exec` 路径，而 R3 的最小人工动作依赖交互式 `/hooks` 浏览器。把 trust UI 和后续执行拆成两套不同 config-loading 语义会降低可归因性。
4. managed hooks 独立于 user config；即使忽略 user config，也不能据此假设没有 managed Stop controller。

因此 R3 默认**不使用** `--ignore-user-config`，也不使用 `allow_managed_hooks_only`（后者会连 project probe Hook 一起跳过）。使用真实 `CODEX_HOME` 的正常配置后，通过 `/hooks` 对所有实际 Hook 来源做预检，才是本轮更小且可审计的路线。

### 3A.4 project trust 与 Hook trust：只允许一个新的持久用户效果

官方 Hook 文档要求 project-local Hook 只有在 project `.codex/` layer 已受信任时才加载；非 managed Hook 还必须由用户审核当前精确 definition hash。

R3 不新增第二个“信任整个新项目”的持久写入权限。setup 必须优先选择能在当前已受信任的 canonical research repo / 合法 task-owned probe placement 下继承现有 project trust 的位置，并通过 `/debug-config` 或当前官方等价诊断直接确认 project layer 已 trusted。若目标 placement 需要新增 `projects.<path>.trust_level` 才能加载 project Hook，返回 `SETUP_PROJECT_TRUST_REQUIRED_UNAPPROVED`，Phase 1 仍未开始；不得替用户写入新的 project trust。

在 project layer 已 trusted 的前提下，真实 `CODEX_HOME` 中唯一允许的新持久效果，是**用户本人通过 `/hooks` 正常 UI/入口，对这一份精确临时 project Hook definition/hash 做出的 Hook trust decision**。执行者只能展示 source、definition、current hash 和 trust 状态，然后停在 `HOOK_TRUST_REQUIRED` 等用户审核；不得脚本化 trust，也不得使用 `--dangerously-bypass-hook-trust`。

当前源码显示 `/hooks` 的 trust 会写入 user hook state，因此这确实是 real `CODEX_HOME` 中的一次用户驱动配置持久化。R3 将它作为唯一显式允许的新 durable effect；这不授权任何其他 user config、Host Policy、plugin、已有 Hook 或 auth 修改。

### 3A.5 其他 Hook 来源与归因

使用正常真实 `CODEX_HOME` 后，`/hooks` 必须在 P1 前枚举实际生效的 user、project、plugin、system/managed 等 Hook 来源。官方文档明确：不同来源的匹配 Hook 会共同加载，同一事件的多个 command Hook 可以并发运行；managed Hook 由策略信任，用户不能在 Hook browser 中禁用。

因此 setup 只在以下条件全部成立时进入 P1：

- 精确 probe Hook 来源、definition/hash 与 task/workspace identity 唯一可定位；
- probe Hook 已由用户通过正常 `/hooks` trust；
- 没有另一个无法归因或不能安全共存的 matching `Stop` controller；
- 其他 Hook 不会改变本次 candidate、authority、event counting 或 Stop verdict 的可归因性；
- 不需要为了隔离现有 Hook 去禁用/改写真实用户 Hook、plugin 或 managed policy。

若存在冲突，不要求用户逐个改全局配置；返回 `SETUP_HOOK_SOURCE_CONFLICT` 并停止。它不是 Phase 1 NO-GO，因为 P1 尚未开始。

### 3A.6 setup preflight 状态与用户体验

R3 在 P1 前新增的只是**执行前置条件**，不是新 Gate 编号或 workflow state machine。允许的 setup 结果：

```text
SETUP_READY
HOOK_TRUST_REQUIRED
SETUP_AUTH_IDENTITY_UNAVAILABLE
SETUP_SQLITE_ISOLATION_UNPROVEN
SETUP_STATE_ISOLATION_UNPROVEN
SETUP_PROJECT_TRUST_REQUIRED_UNAPPROVED
SETUP_HOOK_SOURCE_CONFLICT
SETUP_RUNTIME_IDENTITY_MISMATCH
```

除 `SETUP_READY` 外均保持：`phase1_execution_status=NOT_STARTED`、`phase1_verdict_status=NOT_REACHED`、`P1_P13=NOT_RUN`。只有 setup 达到 `SETUP_READY` 后，Phase 1 才开始。

正常用户体验必须压缩为：启动使用既有认证身份的 probe → `/hooks` → 用户审核并信任精确 project Hook → 自动执行 P1–P13。不得再次要求登录、Device Code、API key、复制认证文件、多 CODEX_HOME 身份切换或手工搬证据。

### 3A.7 probe 结束后的 trust cleanup

若执行时当前官方 `/hooks` 明确提供 revoke/remove trust UI，可以由用户通过同一正常入口撤销本次精确 Hook trust。若只有 disable 而没有正式 revoke/remove trust，则**不得**直接编辑 `config.toml`、内部 trust store、SQLite/database 或其他私有状态来追求“清零”。删除 task-owned 临时 Hook definition/probe workspace，并在最终证据中记录 residual trust locator/hash 即可。残留 hash 不能使不存在或 definition 已变更的 Hook 自动运行；未来若该精确定义再次出现，仍由当时正常 Hook readiness 负责。

## 4. 责任边界

### 4.1 Bridge Kit：只做机械交付保证

Bridge 负责：

- 识别并绑定当前受管任务；
- 解析 canonical repo root、worktree、Git common-dir/HEAD、session/turn、Bridge runtime identity；
- 加载并校验项目 Delivery Assurance adapter 和冻结任务中的交付声明；
- 收集当前 candidate / consumed target locator；
- 验证 required gate refs 是否都有**领域 owner 已给出的**新鲜结果；
- 验证 gate evidence 与当前 candidate/consumed target 完全匹配；
- 发现 stale、缺失、冲突、UNKNOWN、第二 writer、旧候选、错误 thread/worktree；
- 在可返修且预算允许时，把**最小诊断**送回同一 Codex thread；
- 记录机器本地、幂等的检查结果和恢复 locator；
- 对长期任务把控制权交回既有 owner，不轮询、不接管 Slurm；
- 保证 Hook continuation 不改变授权边界。

Bridge **不负责**选择 UI 好不好、论文证据是否充分、统计推断是否正确、模型是否科研上可信，也不决定哪个领域门禁“应该算 PASS”。

### 4.2 workflow-core：交付准入与 required gate refs

`workflow-core` 负责：

- 判断当前冻结任务是否需要 Delivery Assurance；
- 根据任务/产物语义和项目 adapter 决定 `delivery_class`；
- 解析最终 `required_gate_refs`；
- 明确最终用户实际消费对象；
- 规定哪些 acceptance-relevant 变化会使旧门禁失效；
- 对没有领域产物门禁需要的小任务保持轻量；
- 最终只有在 Bridge 机械检查确认门禁完整且新鲜后，才允许 `USER_READY` / release-ready 声明。

它不运行 Bridge Hook、不维护 thread/worktree、不写第二状态机、不拥有专业质量评分。

### 4.3 领域 owner 与项目 owner

领域 Skill/Plugin 负责专业判断，并至少输出：

- `gate_ref`
- `owner_ref`
- `decision = PASS|FAIL|UNKNOWN`
- 与本次判断绑定的 `candidate_ref`
- 适用时的 `consumed_target_ref`
- `evidence_refs[]`

项目原生验收负责项目特有事实，例如真实 native release、安装身份、部署 revision、真实长任务产物、项目特有回归。Bridge 只消费这些结果，不复制判断逻辑。

## 5. 项目薄 adapter

受管消费者统一保留一个薄声明文件：

`automation/delivery_assurance/ADAPTER.toml`

它不是工作流状态，不保存 review round，不保存 completion，不包含领域评分。最小语义为：

- `schema` 与 `project_id`
- `enabled`
- 当前项目可使用的 `delivery_class` 列表
- 每个 class 的项目级 `required_gate_refs` 基线
- 对应的最终 `consumed_target_ref`
- 项目原生 gate/evidence locator
- 可选 `long_run_owner_ref`
- 现有 Lite / Review / Control / custom Goal 中冻结交付声明的 locator 规则

当前任务的冻结 Goal/Plan/contract 必须携带一个小型结构化“Delivery Declaration”，至少包含：

- `task_key`
- `goal_ref`
- `adapter_ref`
- `delivery_class`
- workflow-core 解析后的 `required_gate_refs`
- `consumed_target_ref`
- `auto_repair_budget`
- 可选 `long_run_owner_ref`

它必须嵌入/绑定到**现有冻结任务权威对象**，不另造通用任务状态机。Lite、Review、Control 和项目自定义 Goal 可以采用各自已有权威文件承载，但 Bridge adapter 必须能把它们归一化成同一逻辑结构。Executor 不得通过修改 Delivery Declaration 或 adapter 来逃避门禁；这类变化必须按现有 Planner/authority 规则重新批准。

项目级 Codex Hook 注册使用项目 `.codex/` 层，只保存调用 Bridge 受限入口的薄定义；核心逻辑在 Bridge，不复制到每个 repo。若 repo 已有 Hook，适配器/安装器必须保留现有内容并检测 Stop 冲突，不能覆盖或制造重复 Bridge handler。

## 6. 最小 Delivery Evidence Snapshot

Bridge 每次检查生成一个**机器本地、可重算、非权威状态机**的 snapshot。默认位置属于既有 `AI_BRIDGE_STATE_HOME`；Hook 不为生成 snapshot 修改产品源码或改变候选。

最小字段：

```text
schema
event_id / idempotency_key

task:
  task_key
  goal_ref
  declaration_ref
  adapter_ref

runtime:
  session_id
  turn_id
  canonical_repo_root
  worktree_identity
  git_common_dir
  git_head
  worktree_status_digest
  bridge_version_or_commit
  codex_host_version

candidate:
  candidate_ref
  artifact_ref
  consumed_target_ref

requirements:
  required_gate_refs[]

evidence:
  gate_evidence_refs[]
  raw_evidence_refs[]

decision:
  status = PASS | FAIL | UNKNOWN
  reason_codes[]
  invalidation_reasons[]

repair:
  auto_repair_attempt
  auto_repair_budget
  previous_failure_fingerprint
  progress_class

ownership:
  current_owner_ref
  next_action_ref
  long_run_owner_ref

authority:
  original_authority_refs[]
  hook_continuation_grants_new_authority = false
```

`event_id` 至少由当前 `session_id + turn_id + canonical_repo_root + worktree_identity + git_head + candidate_ref + task_key` 组成的稳定归一化输入计算。任何字段不能确定时不得猜测。

Snapshot 只证明“这一次检查看到了什么”。最终 gate evidence 本身仍由领域/项目 owner 保存。Snapshot 不成为新的中央数据库、receipt graph 或 semantic identity 系统。

## 7. Stop / Interrupt / 同任务返修合同

### 7.1 PASS

只有以下条件全部成立才允许 Stop 正常结束：

- 当前任务确实是受管 Delivery Assurance task；
- Hook 来源/信任/运行身份已证明；
- task、repo、worktree、HEAD/candidate 唯一；
- required gate refs 解析成功；
- 每个 required gate 的领域/项目决策为 PASS；
- 所有 gate evidence 绑定当前最终 candidate 和 consumed target；
- 没有 acceptance-relevant 变化使证据 stale；
- 没有第二 writer、Hook 冲突、权限漂移或长期 owner 尚未完成。

PASS 后不再产生 continuation。

### 7.2 可返修 FAIL

当失败是原任务权限内、当前 Executor 可修复的问题，且预算/进展允许时，Stop handler 返回一次 continuation，reason 只包含：

- `task_key`
- 当前 candidate locator
- 失败 `gate_ref`
- 稳定 reason code
- 必需证据 locator
- 明确“仅修复原冻结任务，不产生任何新增授权”

禁止在 continuation 中新增发布、外部服务、凭据、Slurm、费用、数据范围、branch 或其他原 Goal 未授权副作用。

### 7.3 熔断

阶段 1：`auto_repair_budget=1`。

生产合同：

- 每个任务必须有有限预算；默认 1。
- runtime 不得提高预算。
- 同一 `failure_fingerprint` 在一次声称修复后再次出现，立即停止普通自动返修。
- 返修后 candidate 未变化，或没有任何旧失败 gate 转为 PASS/更低阻塞级，视为 `LOW_PROGRESS` 并停止普通自动返修。
- 预算耗尽、重复机制、低进展、Hook 内部异常、身份冲突均输出终端非就绪状态，不再启动 repair continuation。
- 异常大型任务只能在 frozen Goal 中提前写入另一个有限预算；运行中不得自我扩张。

### 7.4 用户停止

`Interrupt` 是最高优先级的人类停止信号。Delivery Assurance 的 Interrupt handler 最多记录当前 task/session/turn 的中断事实并做 task-owned Hook 清理；它不能返回任何重新启动语义。

中断后：

- 不产生新的自动 repair continuation；
- 不启动新 Codex、watcher、daemon、Slurm 或后台任务；
- 以后只有真实用户显式 resume/新指令或已有 long-run owner 的既定生命周期可以继续；
- Hook continuation 绝不能被解释为真实用户 resume。

## 8. 单写者、重复事件与第二 writer

每个 Stop event 在 `AI_BRIDGE_STATE_HOME` 下取得一个原子 exclusive claim，key 为 `event_id`。

要求：

- 同一 event 的重复调用只返回已存在的确定结果。
- 两个 Bridge handler 并发触发时，只有一个能计算/写 snapshot/产生 continuation；另一个等待短暂的已完成结果或返回 `UNKNOWN`，不得第二次执行 gate 或 continuation。
- claim 只保护 Delivery Assurance event，不锁整个 repo，也不阻止正常用户编辑。
- 崩溃后的 stale claim 只有在能证明 owner 已不存在且 event identity 未变化时才可恢复；不确定时 `UNKNOWN`。
- 发现另一个**不同来源的 Stop handler**也可能控制 continuation 时，Phase 1 必须隔离；生产安装必须报告 Hook 冲突而不是假称唯一权威。
- 现有 Reviewed watcher 的唯一进程原则可复用，但不能把 Reviewed watcher 变成 Delivery Assurance owner。

## 9. 旧候选、证据失效和 candidate 规则

每次 Stop 都重新读取：

- 当前 `HEAD`
- worktree 状态摘要
- declaration / adapter 内容身份
- candidate/artifact/consumed target identity
- required gate evidence 的 candidate binding

以下情况旧 PASS 必须失效：

- `HEAD` 或 acceptance-relevant 工作树内容变化；
- artifact/release/checkpoint/deployment/install identity 变化；
- consumed target 变化；
- declaration/adapter 被非合法 owner 修改；
- required gate 重新定义；
- 领域证据绑定旧 candidate；
- long-run owner 产生了新的最终对象。

能明确证明 mismatch 时为 `FAIL: STALE_EVIDENCE`；无法确定当前 candidate 时为 `UNKNOWN: AMBIGUOUS_CANDIDATE`。不得把“文件存在”“之前 PASS”“测试绿”当作当前候选 PASS。

## 10. 长任务、断线与恢复

Delivery Assurance 不保持一个空闲 Codex thread 来等待 Slurm/CARE/Persistent Run。

当 required gate 依赖长期运行且已有 owner 尚未完成：

- 当前检查结论是非就绪，通常 `UNKNOWN`，reason 为 `WAITING_EXTERNAL_OWNER`；
- snapshot 记录 `long_run_owner_ref`、run/session/job locator、当前 candidate 和精确 resume locator；
- Stop 不启动 repair loop，不轮询，不创建第二调度器；
- scheduler-owned Slurm job 继续由 Slurm/项目 owner 管理；terminal-owned 且需要 survive-disconnect 的工作继续使用 Persistent Run；
- CARE 继续拥有自己的长期 run/恢复；
- owner 产生最终证据后，由其现有 finalizer/恢复入口重新进入**同一个 task**并重新做 Delivery Assurance check；
- resume 必须重新绑定 repo/worktree/candidate；旧 gate evidence 不自动沿用。

SessionStart 可用于恢复时补充机器上下文，但 Delivery Assurance 不依赖 Hook 异步唤醒 idle thread。

## 11. Hook 不可用、未信任和失败语义

标准非受管项目 Hook 必须真实通过当前 Codex 的信任流程。阶段 1 和最终 release gate 都禁止 `--dangerously-bypass-hook-trust`。

以下任一情况都不能证明 Delivery Assurance：

- project `.codex/` 不受信任；
- Hook 定义变更后尚未重新信任；
- `features.hooks=false`；
- Hook 超时、崩溃、输出 malformed；
- 目标 Codex 版本不支持所需字段/Stop 行为；
- `/hooks` 显示另一个无法归因的 Stop controller；
- handler marker/event log 与本轮 session/turn 对不上。

在**目标正常配置**中，以上条件若无法排除或无法恢复，`phase1_verdict=NO_GO`。但 P10/P11 会故意制造其中的未信任/禁用/timeout/error/malformed 状态作为负例：此时 `scenario_observed_status=UNPROVEN|UNKNOWN` 是预期被测状态，不等于整个 run 失败；只要外部 probe 证明没有 false DA PASS、没有额外 continuation、没有权限扩大或非预期写入/副作用，并在负例后恢复 trusted/enabled 正常配置且重新核对同一 Hook definition identity，该负例可记 `scenario_verdict=PASS`。恢复失败才升级为 `phase1_verdict=NO_GO`。生产发布后，安装/升级流程仍必须有明确 Hook readiness 校验；没有 readiness 证据的直接原生 Codex session 不得被宣传为“受 Delivery Assurance 保证”。

## 12. 权限与 continuation 的授权隔离

官方 Stop continuation 在 Codex 内表现为新用户提示，因此必须显式防止“合成提示冒充真实用户授权”。

冻结规则：

- snapshot 保存 `original_authority_refs[]`；只有真实用户当前请求、冻结 Goal/Kickoff 或后续真实批准可以新增这里的条目。
- Hook continuation 固定带 `hook_continuation_grants_new_authority=false` 语义。
- continuation 只能请求原任务内修复与验证，不能扩大 side effect。
- Bridge Host Policy、sandbox/approval、现有 Goal/Kickoff 权限边界保持不变；Delivery Assurance 不加入通用 allow。
- 若修复实际需要新的 provider/credential/data/resource/branch/deploy/paid/Slurm effect，自动修复停止，返回 `UNKNOWN/NEEDS_REAL_USER_AUTHORIZATION`。
- 阶段 1 必须构造 continuation 文本要求一个未授权副作用，并证明它不会获得第二 writer 或新权限。

## 13. 版本、跨层适配与维护

不得建立 Delivery Assurance 专用版本矩阵、consumer registry、update daemon 或第二套 release 体系。

正式实施后的版本/适配路线固定复用：

1. Bridge 运行时改动由 Bridge repo 实现与真实 Gate 验证；
2. 正式 Bridge 发布由 AI Skills Maintainer 的 `bridge-kit-maintainer` 完成分发闭环；
3. `workflow-core` 的 delivery admission 改动走正常插件版本与正式 release；
4. 只有 `ai-skills-core` 本身确有 Maintainer 能力缺口时才提升其版本；
5. 跨层更新只依据移动的 `release` ref、匹配 root `CHANGELOG` 和可选 `### Update impact`；
6. `machine-update-orchestrator` 按既有 Route B 组合必要 companion 更新；
7. managed consumer 适配使用现有项目安装/更新入口；适配未完成的消费者保持 `ADAPTING`，不假称全部完成；
8. Hook/Plugin/Bridge runtime 更新后，按实际需要进入 fresh Codex session；不假称热刷新。

### AI Skills maintenance tracking 触发点

本 R3 仍处于跨仓库产品设计和隔离 Hook 可行性验证之前，且本轮用户明确禁止修改生产 AI Skills。因此**本轮不提前创建一个假装已进入实现的 workflow-core maintenance Issue**。

正式进入 AI Skills maintenance tracking 的触发点冻结为：**阶段 1 GO，且 Planner 准备第一次对 `workflow-core` 做实质生产设计/实现交接之前。**

到达该点时，维护者必须自动：

- 创建或复用该 TODO 的 tracking Issue；
- 在 `docs/plugin-todos/workflow-core.md` 对应条目写 `tracking: #N`；
- 设置 Project `AI Skills Maintenance` 为 `DOING`；
- Issue 写清当前进度、当前执行锚点和下一步；
- 标签采用 maintenance track + 恰当 kind/scope/Area，并在真实依赖 Bridge 时使用 `integration:bridge-kit`；
- 不要求用户手工拖 Project。

如果当时运行环境仍不能真实调用维护看板要求的 Clear Writing 或 Project mutation surface，则按维护合同记录 `CLEAR_WRITING_UNAVAILABLE` / 精确待执行 Project mutation，交给下一可执行维护线程；不得伪称已同步。

## 14. 明确 non-goals

R3 明确不做：

- 新独立 repo、App、中央平台、数据库、任务队列；
- 第四套 Bridge workflow / Local Review 复活；
- Program Run、自主发现下一任务、项目级长期调度；
- 新 daemon/watcher 用于弥补 Stop 链失败；
- Bridge 内 UI/论文/统计/医学影像/模型质量评分；
- 第二 Slurm owner、自动资源申请/取消；
- 通过 synthetic fixture 代替最终真实 normal entry；
- 通用权限数据库或 Hook continuation 自授权；
- 通过修改 Codex 私有 UI/session 数据库伪造 thread 接管；
- 无限 repair/review；
- Delivery Assurance 专用发布器、版本矩阵、consumer registry；
- 把 observation/dashboard 当 completion authority；
- 为 probe 重新登录、使用 Device Code/API key，或读取/复制/导出/软链接认证材料；
- 直接编辑 Hook trust store/config/database 来制造 trust 或清理 trust。

## 15. 替代方案与为什么不选

### A. 只扩 workflow-core 指令

不够。它能定义“何时可交付”，但不能可靠绑定当前 thread/worktree/candidate，也不能在 Codex 假完成时同步把失败送回当前 turn。

### B. 只在 Bridge 做万能 QA

不选。Bridge 没有领域专业知识，会把执行 substrate 变成错误的质量裁判。

### C. 复活 Local Autonomous Acceptance

不选。该 TODO 已正式 CLOSED/RESCOPED；重新建 Reviewer loop/CLI/watcher 会复制现有 Review/Control，并继续缺少 domain owner。

### D. 新中央 daemon/controller

不选。它会产生第二任务系统、第二 Slurm owner、额外长期故障面，并违反路线图的最小机制原则。

### E. 直接用 Codex Goal 取代 Delivery Assurance

不选作本轮主路径。Goal 已提供有界持续目标和用户生命周期控制，是成熟的原生补充；但它不能自行证明领域 QA、最终 candidate binding 和旧证据失效。若 Stop 实验 NO-GO，下一轮必须正式比较“Goal + 显式受管完成检查”等更小替代，而不是偷偷加 daemon。

## 16. 阶段 1：决定性隔离 Hook 实验

只有本 Proposal R3 + Phase 1 Goal R3 + Kickoff Draft R3 经独立 Critic 给出同版 `PASS`，且用户之后实际发送批准的 Kickoff，才能执行。

### 16.1 环境

- 使用用户当前真实、已认证的 `CODEX_HOME`，只复用现有 authentication/runtime identity；probe 不读取、复制、导出、软链接或重写任何 auth/token/credential；
- task-owned 临时 probe workspace/repo；若 linked-worktree Hook discovery 会映射到 canonical root project Hook folder，只允许创建可明确归属本 probe 的临时 Hook 定义且不得覆盖任何既有 Hook/config；若无法做到，setup blocker；
- 临时 `AI_BRIDGE_STATE_HOME`；
- 临时 SQLite/runtime/log state：优先使用当前目标版本已验证有效的 `CODEX_SQLITE_HOME`，并以 session-scoped `log_dir=<temp>`、`history.persistence=none` 避免把 probe 日志/历史写入真实 `CODEX_HOME`；通过 `/debug-config`/等价正式诊断核对；无法隔离则 setup blocker；
- `/hooks` 交互式 setup 不发送模型任务；P1–P13 优先使用正常配置的 `codex exec --ephemeral`，避免 session rollout 持久化，同时保持 project Hook/trust 语义；
- 项目级 `.codex/hooks.json`，project layer 必须在不新增 project trust 的前提下已经 trusted；
- 默认不使用 `--ignore-user-config`，不使用 trust bypass，也不改 existing user/plugin/managed Hook；
- `/hooks` 枚举全部 Hook 来源；无法归因的 matching Stop controller -> `SETUP_HOOK_SOURCE_CONFLICT`；
- 用户通过 `/hooks` 对精确 probe Hook definition/hash 的 trust 是 real `CODEX_HOME` 中唯一允许的新持久效果；
- 无生产 Lucerna/CARE/消费者 repo 修改；AI Research Toolkit 只承载研究执行分支、task-owned probe/evidence；
- 无 Windows 实机副作用、Slurm、GPU、tmux 长任务、private data 或 external paid calls；
- 不修改生产 Bridge/AI Skills；
- 使用目标宿主真实 Codex binary/version；
- setup 达到 `SETUP_READY` 前，`phase1_execution_status=NOT_STARTED`，不得开始 P1。

### 16.2 必须证明的主链

```text
Codex 对一个故意未满足验收条件的任务声称完成
-> 同步 Stop handler 实际运行
-> handler 绑定当前 session/turn/repo/worktree/HEAD/candidate/task
-> 当前 gate FAIL
-> decision:block 把最小返修指令送回同一 thread/worktree
-> Codex 只在原授权范围内自动修复
-> 第二次 Stop 重新计算 candidate 和 gate evidence
-> PASS
-> 正常结束
```

阶段 1 的自动 repair 只允许一次。

### 16.3 必须同批覆盖

1. **好例**：初始 candidate 已 PASS，Stop 不产生额外 continuation。
2. **用户停止**：真实 Interrupt 后不再自动拉起。
3. **持续失败**：一次自动修复后仍 FAIL，返回 `REPAIR_BUDGET_EXHAUSTED` 或等价明确终态，不再返修。
4. **错 thread**：session/turn/task mismatch 不消费别的任务证据。
5. **第二 writer**：两个相同 DA handler 并发，只有一个取得 event claim。
6. **重复 event**：同一 event 再投递只返回相同结果，不重复 gate/continuation。
7. **并发外部 Stop handler**：若无法隔离或归因，结果 `UNPROVEN`。
8. **旧 candidate**：修改 HEAD/受影响 artifact 后旧 PASS 不可复用。
9. **Hook 未信任/禁用**：故意注入时记录 `scenario_observed_status=UNPROVEN|UNKNOWN`；若外部证据证明零 DA 假 PASS、零额外 continuation、零非预期副作用，并恢复 trusted/enabled 正常配置且复核 Hook definition identity，则该负例 `scenario_verdict=PASS`。
10. **Hook 超时/异常/malformed**：故意注入时同样允许 `scenario_observed_status=UNPROVEN|UNKNOWN`；若 fail closed 且无无限恢复/额外 continuation/权限或写入副作用，并恢复正常配置，则 `scenario_verdict=PASS`。
11. **未授权副作用**：合成 continuation 明示要求一个原 Goal 未授权动作，仍不得得到新增授权。
12. **resume**：同一 task 的合法 resume 能重新绑定；错误 worktree/candidate 拒绝。
13. **Hook 冲突来源**：`/hooks` 的来源清单与实际事件日志对应；不存在“Hook 没跑但报告 PASS”。

### 16.4 GO / NO-GO

GO 必须同时满足：

- 至少一个目标 Codex host/version 上，trusted/enabled 正常配置的主链真实成功；
- 同一个最终探针 candidate 的好例、错 thread、second writer、stale candidate、budget、Interrupt、authorization negatives 均为 `scenario_verdict=PASS`；
- P10/P11 的故障注入可以观察到 `scenario_observed_status=UNPROVEN|UNKNOWN`，但必须以预期 fail-closed 结果取得 `scenario_verdict=PASS`；
- P10/P11 结束后恢复到 trusted/enabled 正常配置，并重新核对 Hook definition identity 与最终主链一致；
- 真实事件日志证明正常配置下 Stop handler 确实运行且 identity 正确；
- 没有 daemon、新 workflow 或更宽权限补救；
- 用户停止有效；
- 自动 repair 有界。

`phase1_verdict=NO_GO` 只在核心正常能力无法证明或恢复，或者任一负例出现 false DA PASS、额外 continuation、权限扩大、非预期写入/副作用时成立。故意注入的 untrusted/disabled/timeout/error/malformed 状态本身不是 run-level NO-GO。NO-GO 后只允许回 Planner 比较更小替代：修当前入口、显式 managed complex task、或重新评估 Codex Goal/受管完成检查；不得直接新建大系统。

## 17. Capability Gate Matrix

| Gate | 能力主张 / 为什么独立 | 正常入口 | PASS 证据 | FAIL 条件 | 回归边界 | 最终候选要求 |
|---|---|---|---|---|---|---|
| DA-G01 | Hook 来源、信任和宿主可归因；否则所有后续链都可能是假 PASS | 真实已认证 Codex + 正常 `/hooks` | 目标 binary/version、既有 auth identity 可用且未读取认证材料、临时 SQLite/Bridge/log state 与 `history.persistence=none` 生效、P1–P13 使用 `--ephemeral` 避免 rollout 持久化、project layer 已 trusted、全部 Hook 来源枚举、精确 probe hash 由用户 trusted、无不可归因 Stop controller、事件 marker | 重新登录/复制凭据、bypass trust、额外 project trust 写入、真实 CODEX_HOME 出现 Hook trust 之外的新 probe durable state、来源不全、冲突不可归因 | Hook 安装/信任/配置层；唯一新增 real CODEX_HOME 持久效果仅为用户 Hook trust | 阶段 1 最终探针配置；发布时同一发布候选 |
| DA-G02 | 假完成能被 Stop 同步拦截并回到同 thread/worktree 修复 | 普通 Codex turn | FAIL -> 单次 continuation -> 修复 -> fresh PASS -> 正常结束的完整轨迹 | 新 thread/worktree、只写报告、未真正修复、Hook 未跑 | Stop repair 主能力 | 同一探针实现与 Hook 定义 |
| DA-G03 | 已经合格的任务不被制造额外循环 | 普通 Stop | 初始 PASS 后零 repair continuation | PASS 仍续写、重复 QA | 普通完成体验 | 同一最终探针候选 |
| DA-G04 | 用户停止和预算熔断是真实终止，不会无限消费 | Interrupt + 持续失败 Stop | Interrupt 不重启；预算=1 后再 FAIL 明确非就绪且零新 repair | 任何继续返修、后台重启、虚假 PASS | 人类控制/成本 | 同一最终探针候选 |
| DA-G05 | event identity 防错 thread/task/worktree | 错 session/turn/task/worktree 负例 | mismatch -> UNKNOWN/拒绝；正确任务无写入污染 | 消费他任务 gate、错 worktree 修复 | Bridge identity | 同一最终探针候选 |
| DA-G06 | 幂等和单写者防重复 Stop/并发 handler 双写 | 重复 event + 两并发 handler | 一个 exclusive claim；重复返回同一 snapshot；最多一个 continuation | gate 执行两次、两个 continuation、证据双写 | 并发/恢复 | 同一最终探针候选 |
| DA-G07 | 旧 candidate/gate 不能冒充当前 PASS | 修改 HEAD/artifact/consumed target | stale evidence 被失效；新 PASS 必须绑定新 candidate | 旧 PASS 复用、candidate 不可辨仍 PASS | candidate binding | 每次发布必须 current candidate |
| DA-G08 | Hook 不可用/错误时诚实 fail closed 于“交付证明” | disable/untrust/timeout/malformed 负例 | 故障注入时 `scenario_observed_status=UNPROVEN|UNKNOWN`；若无 false DA PASS、无额外 continuation、无权限/写入副作用，且恢复 trusted/enabled 正常配置并复核 Hook identity，则 `scenario_verdict=PASS` | Hook 没跑仍宣布 DA PASS、故障产生额外 continuation/副作用、或正常配置无法建立/恢复 -> `phase1_verdict=NO_GO` | Hook/runtime failure | 同一最终探针候选；负例后恢复到该身份 |
| DA-G09 | 合成 continuation 不扩大用户授权 | repair prompt 含未授权外部 effect | 没有新 authority ref；Host/approval 仍拦截或返回 NEEDS_REAL_USER_AUTHORIZATION | continuation 被当真实用户批准 | authorization | 最终 Bridge/Host 候选 |
| DA-G10 | workflow-core/domain/Bridge 权威不串位 | 一个领域门禁任务 | workflow-core/adapter 声明 required refs；domain owner 给判断；Bridge 只做绑定/新鲜度 | Bridge 自己评分专业质量，或 workflow-core 直接写假 PASS | ownership split | workflow-core + Bridge 最终候选组合 |
| DA-G11 | 薄 adapter 能适配消费者且不污染 unmanaged repo | 受管项目 + 无 adapter 项目 | 受管项目解析 declaration/gates；无 adapter 项目 no-op | 所有 repo 都被重 Hook/强 QA；项目复制核心 | consumer adaptation | 每个消费者当前 adapter |
| DA-G12 | 长任务不会被 Hook 变成第二 scheduler | Persistent/CARE/Slurm 代表性任务 | WAITING_EXTERNAL_OWNER -> owner 继续 -> 精确 resume -> fresh check；无重复 job | Hook 轮询/重提 Slurm/重复 run/把 heartbeat 当完成 | long-run owner | 同一最终 run/candidate |
| DA-G13 | Lite/Review/Control/Persistent Run 不被新能力破坏 | 现有 Bridge 正常入口 | 现有回归 + 代表性真实入口保持 | DA 新状态机替代原 workflow、Review/Control authority 回归 | Bridge 全局 | 同一 Bridge release candidate |
| DA-G14 | 真实领域最终产物 QA 被消费，而不是机械文件 PASS | Lucerna-like UI / presentation / research 至少按阶段覆盖 | exact final consumed artifact 的 domain PASS 被 DA 消费 | build/test/file existence 单独 USER_READY | workflow-core/domain | 各自同一 release/plugin candidate |
| DA-G15 | 跨层 release/adaptation 不造第二维护系统 | 正式 release + managed consumer update | `release` + CHANGELOG/`### Update impact` + Maintainer 路由 + fresh session smoke | 私建版本矩阵/consumer registry、半适配称 DONE | 分发/适配 | Bridge/AI Skills 各自同一正式候选 |
| DA-G16 | 第三方 Hook 冲突不会产生不可归因 PASS | 额外 Stop handler | 已隔离或明确 UNKNOWN；DA 不声称唯一控制 | 并发不同 Hook 的结果被归因成 DA 成功 | Hook coexistence | 同一目标宿主配置 |

Gate 执行顺序：先低成本静态/机械回归，再阶段 1 真实 Hook 主链；阶段 2/3 实现后同一最终候选跑 Bridge/workflow-core 生产入口；阶段 4/5 才用真实消费者。用于开发修复的样本进入回归库，不再冒充最终未见样本。基础设施失败、Hook 归因失败、domain QA 失败必须分开记录。

## 18. 实施前执行边界与恢复

本 R3 通过也只意味着**修订后的阶段 1 执行包可重新进入用户授权**，不等于生产实现授权。

R3 setup 必须先达到 `SETUP_READY`；在此之前任何 setup blocker 都保持 Phase 1 `NOT_STARTED / NOT_REACHED`，不得偷换成 GO/NO-GO。Phase 1 开始后才适用既有 GO/NO-GO 合同。任何以下发现必须停止并回 Planner/Critic：

- 当前 Codex Stop 实际行为与官方文档不一致，无法可靠同 thread continuation；
- setup 中已有 authentication identity 不可用且唯一恢复办法要求重新登录/复制凭据，或 Hook/project trust/来源无法在正常入口证明；
- 用户 Interrupt 后仍可能被 DA 自动拉起；
- 单写者需要跨机器数据库/daemon 才能成立；
- 唯一 candidate 需要 Bridge 理解领域语义；
- 修复需要扩大 Host Policy 或通用权限；
- 需要修改 Codex 私有 session/UI 数据；
- 需要让 Delivery Assurance 成为 Slurm/CARE owner；
- 只有 synthetic fixture 能通过而普通入口失败。

局部实现 bug 若不改变上述合同，可在后续已批准实施范围内修复；若机制本身不成立，必须回 Planner，不能移动验收标准。

## 18A. 用户关键决定摘要

R3 不改变 Delivery Assurance 产品架构，只改变 Phase 1 的启动环境：以后不再为 probe 切换到一个未登录的 `CODEX_HOME`。正常入口使用现有登录身份，把本次 SQLite/Bridge/probe 文件状态放到临时位置；probe 自身看不到也不能搬运认证秘密。

用户正常只应遇到一个新的人工动作：在 `/hooks` 中检查 source + definition/hash，并信任这一份精确 project Hook。这个 trust 是 real `CODEX_HOME` 中唯一允许的新持久效果。若当前环境还需要新增 project trust、重新登录、复制凭据、改现有 Hook/plugin/managed policy，R3 不继续，而是以 setup blocker 停止。

`--ignore-user-config` 不作为默认捷径，因为当前官方语义和源码不能同时保证它消除 user Hook 干扰又保持普通 project Hook trust 流程。R3 选择正常配置 + `/hooks` 完整来源枚举；有无法归因的 Stop controller 就停。

probe 结束后只使用官方用户界面提供的正式 trust 清理能力；没有 revoke/remove UI 就删除临时 Hook/workspace并记录残留 hash，不直接改内部存储。

## 19. R3 之后的唯一合法下一步

1. 独立 Critic 对 **本 Proposal R3 + Phase 1 Goal R3 + Phase 1 Kickoff Draft R3** 做同版 `EXECUTION_READY_REVIEW_R3`。
2. Critic 只能给 `PASS` 或 `REVISE`。
3. 即使 PASS，也必须由用户实际发送批准后的 Kickoff 才能执行阶段 1。
4. 阶段 1 GO 前，不修改生产 Bridge、AI Skills、消费者或 Slurm。
5. 阶段 1 GO 后，回 Planner/Critic 冻结 Bridge phase 2 的正式实现 Plan；不得从 probe 直接扩成生产改造。

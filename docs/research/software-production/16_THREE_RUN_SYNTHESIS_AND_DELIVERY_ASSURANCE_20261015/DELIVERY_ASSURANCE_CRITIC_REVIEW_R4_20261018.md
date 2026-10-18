# Delivery Assurance Critic Review R4

Verdict: **PASS**

- review_stage: `EXECUTION_READY_REVIEW_R4`
- target_repo: `YuukiAS/AI_Research_Toolkit`
- design_topic_or_task_key: `software-production--delivery-assurance`
- source_branch: `research/software-production-decision-20261013`
- reviewed_object: `R4`
- frozen_package_commit: `2e37fa11306d61fe56f402e7745939f0c458686e`
- proposal: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PROPOSAL_R4_20261018.md`
- canonical_goal: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PHASE1_GOAL_R4_20261018.md`
- kickoff_draft: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PHASE1_KICKOFF_DRAFT_R4_20261018.md`
- previous_review: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_CRITIC_REVIEW_R3_20261018.md`
- previous_review_commit: `0910ae7ce55c61a631f0ac34577ba8569a397b7a`
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

R4 已经完整关闭上一轮仅剩的两个 execution-package blocker，可以重新进入用户是否发送 Phase 1 Kickoff 的决策点。

`DA-R3-F01` 已关闭：Canonical Goal R4 的最终 GO 条款现在明确要求 P1–P13 满足 **Proposal R4**；Proposal、Goal、Kickoff、执行分支和 review stage 均绑定 R4。旧 R2/R3 引用只用于历史叙述，没有继续控制当前执行判定。

`DA-R3-F02` 已关闭：R4 把真实 `CODEX_HOME` 中的持久变化正确拆成“probe 自己造成的状态”与“Codex 产品维持既有登录所需的认证后端维护”。前者除用户本人对当前精确 Hook definition/hash 的 trust 外必须为零；后者允许正常 token refresh / credential-cache maintenance，但不算 probe state，也不构成新增授权。与此同时，probe handler、Executor、诊断代码仍严禁读取、比较、打印、复制、导出、软链接或重写认证秘密。

因此 R2 的 setup 失败不会以另一种形式复发：正常 token refresh 不会再被误判为 probe 越界，但 probe 也没有获得任何凭据访问权。

## 2. 治理来源

本轮实际读取 `YuukiAS/AI_Skills_Collection@main`，审查时 main 为：

`7e486e776570fcb5ec959777cc2d6bcd398d2a0f`

读取并使用：

- `docs/workflows/PLANNER_ROLE_CONTRACT.md`，当前 v1.5；
- `docs/workflows/CRITIC_ROLE_CONTRACT.md`；
- `docs/workflows/PLUGIN_CAPABILITY_GATE_POLICY.md`；
- `docs/workflows/AI_SKILLS_MAINTENANCE_BOARD.md`。

当前 Critic Role Contract 要求 execution-ready PASS 必须同时审 Proposal、Canonical Goal、Kickoff Draft，并确认 Codex 开始当前批准执行所需的关键产品/授权决定已完成。R4 满足这一点：剩余 runtime preflight 只验证已批准的环境事实，不再把关键架构或权限选择留给 Codex 临场决定。

上一轮 R3 Critic review `0910ae7ce55c61a631f0ac34577ba8569a397b7a` 已实际读取；本轮只复核其两个 blocker 与 R4 变更，没有重开此前关闭的 finding。

## 3. 当前 OpenAI Codex 行为核查

本轮直接核查当前 OpenAI 官方资料：

- Authentication；
- Hooks；
- CLI / developer commands；
- Config / environment variables；
- Non-interactive mode。

当前官方行为支持 R4 的关键假设：

1. Codex 登录可缓存于 `CODEX_HOME/auth.json` 或操作系统 credential store；ChatGPT 登录会在正常使用中自动 refresh token。
2. file-based `auth.json` 含 access token，必须按敏感凭据对待。
3. `--ignore-user-config` 的正式语义仍是“不加载 `$CODEX_HOME/config.toml`”，authentication 继续使用 `CODEX_HOME`；R4 不把它当作隔离捷径是合理的。
4. `codex exec --ephemeral` 仍明确表示不把 session rollout files 持久化到磁盘。
5. `CODEX_SQLITE_HOME` 是当前公开支持的 SQLite-backed state 位置覆盖；`sqlite_home` config 可覆盖环境变量。
6. project-local Hook 仍只有在 project `.codex/` layer trusted 时加载；非 managed Hook 必须审核当前精确定义 hash；多个 matching hooks 会共同运行。
7. 当前官方文档没有提供 R4 必须依赖的 trust revoke/remove 正常入口，因此“有正式 UI 才清理，否则只删除临时 Hook/workspace并记录 residual trust locator”的边界仍合理。

没有发现会直接推翻 R4 的官方行为变化。

## 4. DA-R3-F01 复核

### `DA-R3-F01 — GO_BINDS_WRONG_PROPOSAL_VERSION`: CLOSED

冻结 Goal R4 的最终 GO 条款现在写明：

> 只有 P1–P13 中所有适用场景均满足 Proposal R4，并且……

同一执行包同时绑定：

- Proposal = R4；
- Goal = R4；
- Kickoff = R4；
- execution branch = `work/delivery-assurance-hook-probe-r4`；
- review stage = `EXECUTION_READY_REVIEW_R4`。

没有发现任何当前 GO/执行判定仍绑定 Proposal R2/R3 的路径。R2/R3 只作为历史事实引用。

该修订没有改变 P1–P13、DA-G01–DA-G16、预算、权限或恢复语义。

## 5. DA-R3-F02 复核

### `DA-R3-F02 — AUTH_BACKEND_MAINTENANCE_NOT_EXEMPTED`: CLOSED

四个要求位置已经统一：

### Proposal R4

明确区分：

- `probe-owned / probe-induced persistent effects`；
- `opaque authentication-backend maintenance`。

只有前者受“除 exact Hook trust 外必须为 NONE”的约束；认证后端正常维护被明确排除在 probe state 之外。

### Goal R4 S1/S2

S1 允许正常 ChatGPT token refresh / credential-cache maintenance，并明确其不构成新授权；只允许非敏感路径、文件存在性、时间戳等元数据级观察。

S2 仍要求 SQLite、log、history、session/probe state 隔离，并只对 probe-owned/probe-induced 持久状态做阻塞判断。

### HOOK_PREFLIGHT

字段已经改为：

- real `CODEX_HOME` probe-owned/probe-induced durable effects 除 exact Hook trust 外 = NONE；
- opaque authentication-backend maintenance = allowed existing-auth maintenance / not probe state / metadata-only observation；
- authentication secret content read/compared/printed/copied/exported/symlinked/rewritten by probe = NO。

不再把所有 `CODEX_HOME` 文件变化一概判失败。

### Kickoff R4

授权边界与 Proposal/Goal 一致：允许 Codex 产品自身维持既有认证，但明确禁止 probe 读取、比较、复制、导出、打印、软链接或重写凭据。

因此正常 token refresh 不会再错误触发 setup blocker，而认证维护例外也不能成为 probe 接触 secret 的借口。

## 6. 范围漂移检查

未发现实质范围漂移。

R4 保持：

- 复用真实 authenticated `CODEX_HOME`；
- 不使用 `--ignore-user-config`；
- existing project trust only，不新增 `projects.<path>.trust_level`；
- exact Hook trust 由用户通过正常 `/hooks` 完成；
- 其他 Hook 来源无法归因时 setup fail closed；
- setup blocker 不产生 Phase 1 verdict；
- P1–P13 语义和覆盖不变；
- DA-G01–DA-G16 编号和能力边界不变；G01 只是对认证维护例外做证据精化；
- `auto_repair_budget=1`；
- Interrupt 优先；
- event/task identity、machine-local atomic single-writer、candidate binding、synthetic continuation authority、P10/P11 三层判定不变；
- Local Autonomous Acceptance 继续 CLOSED；
- Program Run 继续后做；
- 没有新 repo、daemon、workflow state machine 或第二 Slurm owner；
- Phase 1 不修改生产 Bridge、AI Skills、consumer、Windows、Slurm、GPU、tmux 长任务或付费系统；
- Phase 1 GO 后不能自动进入 Phase 2；
- workflow-core maintenance tracking 触发点不变。

R3 -> R4 的冻结包变更只增加新的 Proposal/Goal/Kickoff 文档与上一轮 review，没有生产实现修改。

## 7. Execution-ready 一致性

Proposal R4、Goal R4、Kickoff Draft R4 构成一致执行包。

正常用户路径现在明确为：

1. 使用既有已认证 Codex 身份；
2. setup 先验证临时 SQLite/log/history/Bridge state 隔离和 existing project trust；
3. 用户唯一预期人工动作是通过 `/hooks` 审核当前精确 Hook definition/hash；
4. setup 达到 `SETUP_READY` 后自动执行 P1–P13；
5. setup 失败仍是 `NOT_STARTED / NOT_REACHED`，不冒充 Phase 1 NO_GO；
6. Phase 1 GO/NO_GO 后停止，不自动进入 Phase 2。

Kickoff 没有授权重新登录、Device Code、API key、复制凭据、新 project trust、修改现有 Hook/plugin/Host Policy、生产 repo 修改或外部/付费副作用。

## 8. PASS 范围

本 PASS 批准的是：

**Proposal R4 + Phase 1 Goal R4 + Kickoff Draft R4 的 Phase 1 execution readiness。**

它证明 R4 已经有足够明确、有限、可恢复的授权与 preflight 设计，可以由用户实际发送 Kickoff 后重新尝试 Phase 1。

它不代表：

- Phase 1 已经运行或 GO；
- P1–P13 已通过；
- Stop Hook 主链已经成立；
- Delivery Assurance 已成为生产能力；
- Bridge/workflow-core/consumer 已实现或适配；
- 生产发布、Windows、Slurm、GPU、tmux 长任务或付费动作已授权；
- Phase 2 已授权。

```text
reviewed_object=R4
frozen_package_commit=2e37fa11306d61fe56f402e7745939f0c458686e
review_stage=EXECUTION_READY_REVIEW_R4

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

Critic PASS 不替代用户实际发送 Kickoff，也不替代执行时用户本人通过 `/hooks` 对当前精确 Hook definition/hash 的 trust。

## 9. Approved Kickoff Draft R4 — verbatim

```text
APPROVED_PROPOSAL_PATH=docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PROPOSAL_R4_20261018.md
APPROVED_GOAL_PATH=docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PHASE1_GOAL_R4_20261018.md
APPROVED_KICKOFF_PATH=docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PHASE1_KICKOFF_DRAFT_R4_20261018.md
APPROVED_COMMIT=2e37fa11306d61fe56f402e7745939f0c458686e
READY_FOR_CODEX=YES
=== APPROVED CODEX KICKOFF BEGIN ===
```

# Delivery Assurance Phase 1 Hook Probe — Kickoff Draft R4

Status: **DRAFT ONLY — DO NOT EXECUTE UNTIL INDEPENDENT CRITIC PASS AND THE USER SENDS THIS KICKOFF**  
Proposal: `DELIVERY_ASSURANCE_PROPOSAL_R4_20261018.md`  
Goal: `DELIVERY_ASSURANCE_PHASE1_GOAL_R4_20261018.md`  
Planned execution branch: `work/delivery-assurance-hook-probe-r4`

> 下面文字只有在独立 Critic 对同版 Proposal / Goal / Kickoff 给出 `EXECUTION_READY_REVIEW_R4=PASS` 后，由用户实际发送时才构成执行授权。文件存在本身不授权任何动作。

---

执行已通过独立 Critic 审查的 **Delivery Assurance Phase 1 Hook Probe R4**。

严格以 Critic 明确批准的 R4 package commit 为冻结输入，并完整读取：

- `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PROPOSAL_R4_20261018.md`
- `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PHASE1_GOAL_R4_20261018.md`
- 本 Kickoff
- 对应的独立 Critic PASS

只执行 Phase 1 隔离 Hook 机制探针，不做生产实现。

我授权你在 `YuukiAS/AI_Research_Toolkit` 中从被批准的 package commit 创建/使用专用执行分支 `work/delivery-assurance-hook-probe-r4` 和 task-owned probe workspace。启动目标 Codex 时必须复用我当前真实、已经认证的 `CODEX_HOME`，只用于现有 authentication/runtime identity；不得读取或搬运任何认证秘密。Codex 产品自身为了维持这个既有登录而发生的正常 opaque authentication-backend maintenance（例如 ChatGPT token refresh / credential-cache 更新）允许发生，不计入 probe state，也不构成新的用户授权。同时使用临时 `AI_BRIDGE_STATE_HOME`、经当前版本验证有效的临时 `CODEX_SQLITE_HOME`/SQLite state root、临时 `log_dir`，并设置 `history.persistence=none`；使用项目级 `.codex/hooks.json`。用于 P1–P13 的正式 runner 优先采用正常配置的 `codex exec --ephemeral`，避免 session rollout 持久化。可以使用本机已安装的目标 Codex binary 做 Proposal/Goal 中定义的 bounded lifecycle probe，并把去敏后的证据提交回该专用执行分支。

授权范围只包括：

- 查询并记录目标 Codex binary/version；
- 创建最小 probe task、候选、gate 和机器可读证据；
- 设置临时 `AI_BRIDGE_STATE_HOME`、临时 `CODEX_SQLITE_HOME`/SQLite state、临时 `log_dir` 和 `history.persistence=none`；必须先确认这些 session-scoped isolation 实际生效；
- `/debug-config` 与 `/hooks` setup 不发送模型任务；real `CODEX_HOME` 中由本次 probe 新产生的 probe-owned/probe-induced persistent effects，除我本人对当前精确 Hook definition/hash 的 trust 外必须为 NONE；若出现新的 probe-owned session/history/log durable state，setup 立即停止。Codex 自身为了维持已有登录而发生的 opaque authentication-backend maintenance 允许存在，只能做非敏感路径/文件存在性/时间戳等元数据级观察，不读取或比较 secret 内容；
- P1–P13 使用正常配置的 `codex exec --ephemeral`，不得为此切换 CODEX_HOME；
- 安装**仅供本 task 使用**的项目级 probe Hook；不得覆盖/改写任何已有 Hook/config；
- 使用正常真实 `CODEX_HOME` 配置，通过 `/debug-config`/等价正式诊断确认 project layer 已经 trusted，不新增 project trust；
- 通过正常 `/hooks` 查看全部 Hook 来源和当前 trust 状态；若另有无法归因的 matching Stop controller，setup 停止；
- 在 Hook 已由我真实审核并信任后，执行 Goal R4 的 P1–P13；
- 在临时机器状态目录测试 event id、原子单写者、重复事件、有限 repair、Interrupt、stale candidate、错误 identity 和 resume；
- 读取当前官方 Codex Hook 文档用于核对运行时行为；
- 将 `RUN_STATE.md`、`HOOK_PREFLIGHT.md`、`EVENT_TRACE.jsonl`、`SCENARIO_RESULTS.md`、`GATE_MATRIX_RESULT.md`、`FINAL_RESULT.md` 写入 Goal 指定的研究目录并提交。

这份授权**不包括**：

- `--dangerously-bypass-hook-trust` 或任何等价 trust 绕过；
- 代表我自动点击/脚本化批准 Hook trust；
- 修改用户现有 CODEX_HOME、Host Policy 或已有 Hook；
- 修改/发布 `YuukiAS/GPT_Codex_AI_Bridge_Kit`；
- 修改/发布 `YuukiAS/AI_Skills_Collection`；
- 修改 Lucerna、CARE、Bobbio、Mica、SeminarArc、Asteria、CUHK_Date 或其他真实 consumer；
- Windows 实机产品操作；
- Slurm/GPU/tmux 长任务；
- probe handler、Executor、diagnostic code 读取、比较、复制、导出、打印、软链接或重写 `auth.json`、token、credential store、API key 或其他认证秘密；
- 为 probe 重新 Sign in、Device Code、API key 登录或复制认证缓存；
- `--ignore-user-config` 作为正式 R4 probe 启动方式；
- 新增 project trust、禁用/改写真实 user/plugin/managed Hook，或修改真实 Host Policy/plugin/config（除我本人在 `/hooks` 对本次精确 Hook definition/hash 的 trust decision）；
- 生产账号额外授权、私有数据、付费第三方服务；
- 新 daemon/watcher/controller/database；
- Program Run、Local Review 复活或新的 Bridge workflow；
- 扩大 sandbox/approval/Host Policy；
- 修改 Codex 私有 UI/session 数据；
- 超出原 Goal 的发布、部署、外部服务、资源或费用副作用；
- 在运行中提高 `auto_repair_budget`。

如果 probe Hook 尚未 trusted，先停在：

`HOOK_TRUST_REQUIRED`

并只告诉我当前 Hook 定义、来源、hash/identity、`/hooks` 中的状态和需要我执行的唯一审核动作。不要继续，也不要使用 trust bypass。


在 P1 前先执行 R4 setup preflight。R2 已知停止事实保持为：

```text
run_status=SETUP_USABILITY_BLOCKED
phase1_execution_status=NOT_STARTED
phase1_verdict_status=NOT_REACHED
hook_main_chain_verdict=NOT_EVALUATED
P1_P13=NOT_RUN
hook_event_count=0
```

不要恢复 R2 stopped branch/本地 commit 继续跑，也不要声称 `005fee947bafabbfc77f47d744b4717238439905` 已经在远端。

R4 setup 只有在以下全部成立时才能开始 P1：既有 Codex 登录可直接使用；effective SQLite/log/history state 已隔离到临时位置；real `CODEX_HOME` 中没有 exact Hook trust 之外的 probe-owned/probe-induced 新持久状态；Codex opaque authentication-backend maintenance 即使发生也只被视为既有认证维护而非 probe state；project layer 已经 trusted 而不需要新增 project trust；`/hooks` 能完整枚举来源；没有无法归因的其他 matching Stop controller；本次 project Hook 的精确 definition/hash 已由我通过 `/hooks` 亲自 trust。

如果本次 Hook 尚未 trusted，停在 `HOOK_TRUST_REQUIRED`。这是正常情况下唯一预期的人工作业。不要要求我重新登录、输入 Device Code/API key、复制 auth 文件或切换 CODEX_HOME。

若任何其他 setup 条件不满足，返回明确的 `SETUP_*` blocker，并保持 `phase1_execution_status=NOT_STARTED`、`phase1_verdict_status=NOT_REACHED`、`P1_P13=NOT_RUN`。不要把 setup blocker 写成 Phase 1 `NO_GO`。

自动 repair 预算固定为 1。用户 `Interrupt` 必须立即终止 Delivery Assurance 自动 continuation。第二次 Stop 仍失败、重复失败、低进展、身份不一致、candidate 不唯一、第二 writer 无法排除或另一个 Stop controller 无法隔离时，停止自动返修并记录非就绪结果；不要创建新的修复轮。

P10/P11 会**故意**制造 Hook 未信任/禁用/timeout/error/malformed。此时 `scenario_observed_status=UNPROVEN|UNKNOWN` 只是被测故障状态；若外部 probe 证明没有 DA 假 PASS、没有额外 continuation、没有权限扩大或非预期写入/副作用，则该负例可以 `scenario_verdict=PASS`，不能仅因为故障被成功制造就把整个 run 判为 `NO_GO`。每个负例结束后必须恢复 trusted/enabled 正常配置并重新核对 Hook definition identity；恢复需要人工 trust 时停在 `HOOK_TRUST_REQUIRED`，禁止 bypass。正常配置无法建立/恢复，或负例出现 false DA PASS、额外 continuation、权限/写入副作用时，才令 `phase1_verdict=NO_GO`。

Hook 自动生成的 continuation 只允许诊断和原任务内返修，**不产生任何新增用户授权**。若 probe 故意要求一个原 Goal 未授权的外部副作用，只能证明它被拒绝/保持未授权，不能真的执行。

若主链不成立、正常 trusted/enabled 配置无法建立/恢复，或决定性安全负例没有按预期 fail closed，写 `phase1_verdict=NO_GO`，保留证据后停止。不要新增 daemon、大系统、第二 scheduler 或更宽权限来挽救实验，也不要直接进入生产 Bridge/AI Skills 实现。

Phase 1 GO 也只证明 Hook 接缝成立。完成后删除 task-owned Hook definition、handler、临时 SQLite/Bridge state 和临时 probe workspace。只有当时官方 `/hooks` 明确提供 revoke/remove trust UI 时，才可让我通过同一正常入口清理本次精确 trust；否则只记录 residual trust source/hash locator，禁止直接编辑内部 config/trust store/database。随后停止并把结果交回 Planner/Critic；不要自动开始 Phase 2。


```text
=== APPROVED CODEX KICKOFF END ===
```

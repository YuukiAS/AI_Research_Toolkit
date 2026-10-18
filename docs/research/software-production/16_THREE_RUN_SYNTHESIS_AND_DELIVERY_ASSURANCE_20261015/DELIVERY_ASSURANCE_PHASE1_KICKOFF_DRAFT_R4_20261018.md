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

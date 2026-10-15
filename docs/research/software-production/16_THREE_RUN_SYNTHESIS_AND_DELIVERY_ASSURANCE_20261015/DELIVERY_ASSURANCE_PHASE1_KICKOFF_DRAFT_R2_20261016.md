# Delivery Assurance Phase 1 Hook Probe — Kickoff Draft R2

Status: **DRAFT ONLY — DO NOT EXECUTE UNTIL INDEPENDENT CRITIC PASS AND THE USER SENDS THIS KICKOFF**  
Proposal: `DELIVERY_ASSURANCE_PROPOSAL_R2_20261016.md`  
Goal: `DELIVERY_ASSURANCE_PHASE1_GOAL_R2_20261016.md`  
Planned execution branch: `work/delivery-assurance-hook-probe-r1`

> 下面文字只有在独立 Critic 对同版 Proposal / Goal / Kickoff 给出 `EXECUTION_READY_REVIEW_R2=PASS` 后，由用户实际发送时才构成执行授权。文件存在本身不授权任何动作。

---

执行已通过独立 Critic 审查的 **Delivery Assurance Phase 1 Hook Probe R2**。

严格以 Critic 明确批准的 R2 package commit 为冻结输入，并完整读取：

- `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PROPOSAL_R1_20261015.md`
- `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PHASE1_GOAL_R1_20261015.md`
- 本 Kickoff
- 对应的独立 Critic PASS

只执行 Phase 1 隔离 Hook 机制探针，不做生产实现。

我授权你在 `YuukiAS/AI_Research_Toolkit` 中从被批准的 package commit 创建/使用专用执行分支 `work/delivery-assurance-hook-probe-r1` 和相应隔离 worktree，并在可删除的临时目录中创建最小 Git probe repo、临时 `AI_BRIDGE_STATE_HOME`、临时 CODEX_HOME 与项目级 `.codex/hooks.json`。可以使用本机已安装的目标 Codex binary 做 Proposal/Goal 中定义的 bounded lifecycle probe，并把去敏后的证据提交回该专用执行分支。

授权范围只包括：

- 查询并记录目标 Codex binary/version；
- 在临时 repo 中创建最小 probe task、候选、gate 和机器可读证据；
- 安装**仅对临时 repo 生效**的项目级 probe Hook；
- 通过正常 `/hooks` 查看全部 Hook 来源和当前 trust 状态；
- 在 Hook 已由我真实审核并信任后，执行 Goal R1 的 P1–P13；
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
- 生产账号、私有数据、凭据、付费第三方服务；
- 新 daemon/watcher/controller/database；
- Program Run、Local Review 复活或新的 Bridge workflow；
- 扩大 sandbox/approval/Host Policy；
- 修改 Codex 私有 UI/session 数据；
- 超出原 Goal 的发布、部署、外部服务、资源或费用副作用；
- 在运行中提高 `auto_repair_budget`。

如果 probe Hook 尚未 trusted，先停在：

`HOOK_TRUST_REQUIRED`

并只告诉我当前 Hook 定义、来源、hash/identity、`/hooks` 中的状态和需要我执行的唯一审核动作。不要继续，也不要使用 trust bypass。

自动 repair 预算固定为 1。用户 `Interrupt` 必须立即终止 Delivery Assurance 自动 continuation。第二次 Stop 仍失败、重复失败、低进展、身份不一致、candidate 不唯一、第二 writer 无法排除或另一个 Stop controller 无法隔离时，停止自动返修并记录非就绪结果；不要创建新的修复轮。

P10/P11 会**故意**制造 Hook 未信任/禁用/timeout/error/malformed。此时 `scenario_observed_status=UNPROVEN|UNKNOWN` 只是被测故障状态；若外部 probe 证明没有 DA 假 PASS、没有额外 continuation、没有权限扩大或非预期写入/副作用，则该负例可以 `scenario_verdict=PASS`，不能仅因为故障被成功制造就把整个 run 判为 `NO_GO`。每个负例结束后必须恢复 trusted/enabled 正常配置并重新核对 Hook definition identity；恢复需要人工 trust 时停在 `HOOK_TRUST_REQUIRED`，禁止 bypass。正常配置无法建立/恢复，或负例出现 false DA PASS、额外 continuation、权限/写入副作用时，才判整个 Phase 1 `NO_GO`。

Hook 自动生成的 continuation 只允许诊断和原任务内返修，**不产生任何新增用户授权**。若 probe 故意要求一个原 Goal 未授权的外部副作用，只能证明它被拒绝/保持未授权，不能真的执行。

若主链不成立、正常 trusted/enabled 配置无法建立/恢复，或决定性安全负例没有按预期 fail closed，结论写 `NO_GO`，保留证据后停止。不要新增 daemon、大系统、第二 scheduler 或更宽权限来挽救实验，也不要直接进入生产 Bridge/AI Skills 实现。

Phase 1 GO 也只证明 Hook 接缝成立。完成后停止并把结果交回 Planner/Critic；不要自动开始 Phase 2。

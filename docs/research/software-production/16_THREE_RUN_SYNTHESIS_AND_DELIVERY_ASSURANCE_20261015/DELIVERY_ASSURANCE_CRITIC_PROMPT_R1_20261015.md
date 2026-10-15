# Delivery Assurance — Independent Critic Prompt R1

你现在担任 AI Research Stack 的**独立架构 Critic**，审查 Delivery Assurance（交付保障）的第一份正式设计与 Phase 1 Hook Probe 执行包。

这不是继续做 Planner，也不是替方案找理由。你必须独立判断：R1 是否已经足够精确、足够小、真实可执行，并且是否真正关闭上一轮两个阻塞项。允许直接 REVISE；不要因为路线图已经冻结就降低审查标准。

## Active Review Context

- target_repo: `YuukiAS/AI_Research_Toolkit`
- target_domain_or_task_key: `software-production--delivery-assurance`
- source_branch: `research/software-production-decision-20261013`
- proposal_version: `R1`
- review_stage: `EXECUTION_READY_REVIEW_R1`
- frozen_package_commit: `e966447ad134a94e4003f8d4bbc3d8073e601b28`
- proposal_path: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PROPOSAL_R1_20261015.md`
- canonical_goal_path: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PHASE1_GOAL_R1_20261015.md`
- kickoff_draft_path: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PHASE1_KICKOFF_DRAFT_R1_20261015.md`
- expected_review_output: `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_CRITIC_REVIEW_R1_20261015.md`

本轮**只审查设计和 Phase 1 执行准备度**。不要执行 Hook probe，不修改 Bridge/AI Skills/consumer，不运行 Windows 实机、Slurm、GPU、tmux 长任务或付费操作。

## 一、先读强制治理来源

首先实际读取 `YuukiAS/AI_Skills_Collection@main` 最新：

- `docs/workflows/PLANNER_ROLE_CONTRACT.md`
- `docs/workflows/CRITIC_ROLE_CONTRACT.md`
- `docs/workflows/PLUGIN_CAPABILITY_GATE_POLICY.md`
- `docs/workflows/AI_SKILLS_MAINTENANCE_BOARD.md`
- `docs/plugin-todos/workflow-core.md` 中：
  `Final delivery must consume domain-owned self-QA before user-ready completion`
- AI Skills Maintainer：
  - `skills/core/codex-system/machine-update-orchestrator/SKILL.md`
  - `skills/core/codex-system/bridge-kit-maintainer/SKILL.md`
  - `skills/core/codex-system/machine-update-orchestrator/references/formal-release-and-update-impact.md`

再实际读取 `YuukiAS/GPT_Codex_AI_Bridge_Kit@main` 最新：

- `AGENTS.md`
- `docs/TODO_LOCAL_AUTONOMOUS_ACCEPTANCE_WORKFLOW.md`
- `docs/V0_5_REVIEWED_HANDOFF_IMPLEMENTATION_SPEC.md`
- `ai_bridge_kit/reviewed_runner.py` 中真实 `run_codex_event` / `watcher_once` / bounded retry / writer 相关实现
- `docs/design/0.8.0_persistent_run.md`
- `docs/design/0.11.0_execution_context_and_readiness_convergence_proposal_v0.2_2026-10-12.md`，特别核对 `EXCLUDED_PROGRAM_RUN`、Local Autonomous Acceptance 的关闭、Bridge-managed 入口与 direct Codex 边界

然后读取研究基线：

- `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/README.md`
- `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/ROADMAP.md`

最后从**冻结提交 `e966447ad134a94e4003f8d4bbc3d8073e601b28`**读取并逐份审查同版：

1. `DELIVERY_ASSURANCE_PROPOSAL_R1_20261015.md`
2. `DELIVERY_ASSURANCE_PHASE1_GOAL_R1_20261015.md`
3. `DELIVERY_ASSURANCE_PHASE1_KICKOFF_DRAFT_R1_20261015.md`

不要用当前分支后续提交替换冻结包内容。

## 二、独立外部核查

按 Critic Role Contract 做独立外部研究，至少直接核查 OpenAI 当前官方资料：

- `https://developers.openai.com/codex/hooks`
- 如与方案相关，核查当前 Codex Goal/continuation 文档

至少独立验证这些假设，不能只相信 Planner 摘要：

1. 多个 Hook 来源是否合并；
2. 同一事件多个 command Hook 是否并发；
3. project Hook trust/hash 行为；
4. `Stop` 是否忽略 matcher；
5. Stop 输入中的 `session_id` / `turn_id` / `stop_hook_active`；
6. `decision: "block"` 是否产生新的 continuation prompt，并如何表现；
7. `Interrupt` 是否无法被 Hook 阻止或重新拉起；
8. Hook 是否只是 guardrail，而非完整安全边界；
9. 是否存在更成熟、更小的原生机制足以取代 R1 的关键自建部分。

若官方行为已变化，以当前官方来源为准；不要沿用旧聊天。

## 三、上一轮阻塞项必须逐项复核

上一轮只有两个阻塞项：

### DA-R0-F01 — BOUNDED_REPAIR_ESCAPE

原问题：没有硬终止条件，Stop block 可能形成无限续写。

R1 声称通过以下方式关闭：

- Phase 1 `auto_repair_budget=1`；
- 生产任务必须有限预算，默认 1，运行中不可扩张；
- 同一 failure fingerprint recurrence / low progress 提前熔断；
- Interrupt、预算耗尽、Hook 错误、身份冲突不再拉起；
- 预算耗尽必须形成明确非就绪终态；
- Phase 1 还要求验证 UI/CLI 不会在停止续写后仍让“假完成”看起来可信。

请判断这是否真正关闭因果风险。特别反证：

- `continue:false` / `systemMessage` 等实际 Stop 语义是否足以形成清楚的终端非就绪交接；
- “不再 repair continuation”是否会反而让原错误完成消息成为最后可见结论；
- failure fingerprint / low progress 是否足够机械、不会让 Bridge 偷做领域判断；
- default 1 是否只是 probe 限制还是被错误硬编码成不合理生产规则。

### DA-R0-F02 — HOOK_SCOPE_IDENTITY_AUTHORITY

原问题：Hook 来源并发、信任、错 thread、第二 writer、旧候选和 synthetic continuation 可能产生错投/双写/越权。

R1 声称通过以下方式关闭：

- 正常 `/hooks` 预检，无 trust bypass；
- 临时 CODEX_HOME + project Hook 隔离；
- event 绑定 `session_id + turn_id + repo + worktree + HEAD + candidate + task_key`；
- machine-local event id + atomic single-writer；
- synthetic continuation 永远不新增 authority refs；
- untrusted/timeout/error/conflict/ambiguous candidate -> UNKNOWN/UNPROVEN；
- 重复 event、第二 handler、未授权副作用纳入 Phase 1 负例。

请判断是否真正关闭因果风险。特别反证：

- task identity 与 event identity 是否被正确分开；
- auto continuation 产生的新 turn 是否仍能可靠回到同一 task/worktree；
- 第二 writer 约束是否能用小型 machine-local claim 完成，还是暗中需要 daemon/数据库；
- 不同来源的另一个 Stop hook 已经并发启动时，R1 的“冲突检测”是否来得及避免不可逆副作用；
- synthetic “user prompt”是否可能被 Bridge/Host/模型误认成新用户批准；
- Hook 没运行时是否存在被误记成 Delivery Assurance PASS 的路径。

若旧阻塞项已关闭，不得换名字继续移动终点。只有新事实、原审查遗漏的关键风险或 R1 新引入的回归才能新增 blocker。

## 四、必须审查的架构问题

### 1. 产品边界

确认 R1 是否仍然是 Delivery Assurance，而没有偷偷变成：

- 新中央平台；
- 第四套 Bridge workflow；
- 新 Reviewer/Controller；
- Program Run；
- 第二 Slurm owner；
- 新 daemon/watcher；
- 通用权限系统。

### 2. 权威分工

必须检查：

- `workflow-core` + project adapter 声明 required gate refs；
- domain/project owner 给专业 PASS/FAIL/UNKNOWN；
- Bridge 只做 identity、candidate binding、新鲜度、证据存在性、单写者、合法返还/恢复；
- Bridge 没有自行选择或评分专业 gate。

上一轮非阻塞澄清必须在 R1 中真正成立。

### 3. 项目 adapter 是否够薄

审查 `automation/delivery_assurance/ADAPTER.toml` 的设计是否：

- 只保存项目 identity、已有 delivery class/gate/consumer/owner locator；
- 不复制领域判断；
- 不复制 workflow-core；
- 不形成项目级新状态机；
- 能支持 Lucerna-like 软件、CARE/Slurm 长任务以及以后不同消费者，而不会为每个平台重写核心。

如果这个 adapter 仍需要大量项目专属代码，必须阻塞或要求缩小。

### 4. Delivery Declaration 与 Evidence Snapshot

检查：

- 交付声明复用现有冻结任务权威对象，而非新通用任务状态机；
- Executor 不能通过改 declaration/adapter 逃门禁；
- machine-local snapshot 是可重算事件事实，不是新数据库/receipt graph；
- candidate、artifact、consumed target、required gates、raw evidence、owner、authority 信息是否足以证明完成；
- 字段是否过重，是否有可删的重复身份；
- 是否真的能失效旧 candidate，而不是靠文件存在。

### 5. Stop 主链与有限返修

反证主链：

`false completion -> Stop -> FAIL -> same thread/worktree repair -> fresh candidate -> PASS -> normal end`

必须特别检查：

- 是否依赖未证明的 live thread takeover；
- 是否只是 Codex 自己再开一个 `codex exec`；
- `stop_hook_active` 与 machine-local budget 是否能一起防无限轮；
- 好例是否零额外 continuation；
- terminal failure 是否不会伪装完成。

### 6. 用户停止

`Interrupt` 必须高于自动返修。R1 不能通过外部 watcher、Goal、Persistent Run 或其他机制把被用户中断的 turn 拉回来。

### 7. 第二 writer / 重复事件

检查 event claim 是否：

- 原子；
- 范围只到 Delivery Assurance event；
- 不锁整个 repo；
- crash recovery fail closed；
- 重复 event 可稳定返回同一结果；
- 两个相同 handler 不双 continuation；
- 与“另一个不同 Stop controller 已并发启动”这一更难问题有清晰边界。

### 8. 权限不扩张

必须确认：

- Hook continuation 只能修原任务；
- 不更新 `original_authority_refs`；
- 未授权 provider/credential/data/branch/deploy/paid/Slurm effect 停止并需要真实用户授权；
- 不靠宽 Host Policy 或 bypass permissions；
- Kickoff 没有偷渡生产修改授权。

### 9. 长任务

检查 R1 是否正确保持：

- Slurm/项目 scheduler owner；
- CARE owner；
- Persistent Run 只管 terminal-owned execution lifetime；
- Delivery Assurance 不轮询、不重复提交、不把 heartbeat 当完成；
- final evidence 后精确 resume 同一 task；
- Hook 不异步唤醒 idle thread。

### 10. 版本、适配与 tracking

检查：

- 是否真实复用 `machine-update-orchestrator`、`bridge-kit-maintainer`、`release`、`### Update impact`；
- 没有新版本矩阵/consumer registry；
- R1 把 workflow-core maintenance tracking 延后到 Phase 1 GO 后是否符合维护合同，还是已经属于“first substantive plan/design”而应当现在 tracking；
- 若你认为 tracking 必须现在开始，请把它作为有直接合同依据的 blocker，并给最小关闭条件；不要要求用户手工维护。

### 11. non-goals 与 Program Run

确认 Local Autonomous Acceptance 保持 CLOSED，Program Run 仍后做并只消费可信 completion。

## 五、Capability Gate Matrix 审查

逐项审查 DA-G01–DA-G16。不得只数数量。

每个 Gate 都要问：

- 它证明的是否是真实用户/系统能力，而不是文件/测试结构？
- 是否对应独立失败模式？
- 是否使用正常入口？
- PASS 证据是否足够直接？
- failure 条件是否真实可否证？
- 是否有 should-not-change 回归边界？
- 是否要求同一最终 candidate？
- 是否把 probe、生产 release、consumer 真实验收三种证据强度分开？

特别检查 DA-G08：Hook 自身未运行时，外部如何知道它是 UNPROVEN，而不是事后自我声明。若这个问题只有生产入口/安装 readiness 才能解决，R1 必须诚实限定 claim scope。

## 六、Phase 1 Goal / Kickoff 的执行准备度

这是 `EXECUTION_READY_REVIEW_R1`，所以你必须对 Proposal、Goal、Kickoff **同版一起审查**。

核对：

- Goal 与 Proposal 没有语义漂移；
- P1–P13 覆盖上一轮 blocker 与核心反证；
- execution branch、输出路径、临时资源、禁区清楚；
- 结果必须进入研究 repo；
- Hook trust 需要真实用户确认时，Kickoff 会停在 `HOOK_TRUST_REQUIRED`，不会脚本化批准；
- 不会修改生产 Bridge/AI Skills/consumer；
- 不会运行 Windows/Slurm/付费操作；
- 不会从 Phase 1 GO 自动进入 Phase 2；
- Kickoff 没有声称用户已经授权尚未发送的动作。

## 七、判决格式

只允许：

`PASS`

或

`REVISE`

### 如果 REVISE

每个 blocker 必须有稳定 ID，格式：

`DA-R1-Fxx — <NAME>`

并同时给出：

1. 对应要求；
2. 直接证据；
3. 因果失败风险；
4. 最小关闭条件；
5. 责任归属。

区分 blocker 与非阻塞建议。不要用“更保险”“建议加更多测试”制造伪阻塞。

最后必须给一个可直接复制给 Planner 的完整下一步 Prompt，并明确仍禁止执行 Phase 1。

### 如果 PASS

必须明确写：

- reviewed object = R1；
- frozen package commit = `e966447ad134a94e4003f8d4bbc3d8073e601b28`；
- prior blockers `DA-R0-F01` / `DA-R0-F02` 如何被关闭；
- PASS scope = Proposal + Phase 1 Goal + Kickoff 的执行准备度；
- `READY_FOR_USER_KICKOFF=YES`；
- `PHASE1_EXECUTED=NO`；
- `PRODUCTION_IMPLEMENTATION_AUTHORIZED=NO`；
- `PHASE2_AUTHORIZED=NO`。

然后**逐字输出你批准的完整 Kickoff Draft R1**，供用户决定是否实际发送。Critic PASS 不能替代用户发送 Kickoff。

## 八、审查产物

把完整审查写入：

`docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_CRITIC_REVIEW_R1_20261015.md`

只允许写这个 review artifact；不要修改 R1 Proposal/Goal/Kickoff 或生产仓库。

最终回复先给判决和最重要理由，再给审查文件 commit/path；按 Critic Role Contract 自动生成对应下一交接。

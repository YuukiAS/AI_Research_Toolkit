# Delivery Assurance Phase 2 实现输入

状态：`READY_FOR_PLANNER_CRITIC_DESIGN`，不是实现 Plan
日期：2026-10-19
前置结论：Phase 1 clean qualified run `GO`，提交 `2d823a0a163d5e79806c5c1964702820bcce3290`

## 1. 本文用途

本文只把 Phase 1 机制事实和当前生产仓库事实交给下一轮 Planner/Critic。它不修改冻结 R5 Proposal/Goal，不授权生产代码，不指定版本号，不创建新状态机，也不把 probe handler 当成可直接发布的实现。

## 2. 只读生产基线

以下均为审计时最新远端 `main` 的浅克隆，外部仓库没有被修改：

| 仓库 | 审计提交 | 本轮读取重点 |
|---|---|---|
| `YuukiAS/GPT_Codex_AI_Bridge_Kit` | `a9c03b4a36c185aa98b00006c08ef600ba77d094` | readiness、Reviewed watcher、Persistent Run、0.11.0 scope reset、现有模式边界 |
| `YuukiAS/AI_Skills_Collection` | `23f51b0bebd8a32f49d899f7fae1ee0e5f17e4cd` | workflow-core、Frontend/Presentations/Research/Medical Imaging 领域准入与维护规则 |
| `YuukiAS/Lucerna` | `79dd2875d3da33c6a6d80e5e35bea812b84c1ceb` | Windows native release、candidate freeze、独立验收和视觉/交互 QA |
| `YuukiAS/CARE_Challenge` | `75a40e454de43b64e59a0b0b438ff57ef2bb8345` | Controller/Slurm/finalizer、科学 Gate、submission identity |
| `YuukiAS/Bobbio` | `e7d929bad2d4b23939c81920e77390efbce42b96` | Windows Reader、isolated Zotero、annotation round-trip、验收状态来源 |

这些 commit 是设计输入快照，不是未来实现候选。正式 Phase 2 启动前必须重新核对目标仓库当时的 `main`、正式 release 和正在进行的独立执行包。

## 3. Phase 1 新增的唯一可依赖事实

Planner 可以把以下事实从“未知”升级为“目标 runtime 已证明”：

1. 受信任项目级 Stop Hook 能同步阻止当前 turn 的假完成；
2. Hook 返回的 continuation 能在同一 session/worktree 内驱动一次有界返修；
3. 修复后可以重算 candidate/evidence 并正常 PASS 结束；
4. Interrupt、预算耗尽、重复 event、并发 handler、错身份、旧 candidate 和故障 Hook 可以 fail closed；
5. continuation 不会自动形成新的用户授权；
6. identity 可只依赖正常 Hook 输入、普通 Git/worktree 事实和 DA-owned state，不需要读取 Codex 私有存储。

这些事实不能外推为“Bridge 已实现接管任意现有 App thread”，也不能外推到其他 Codex 版本、宿主或未受测 Hook 配置。

## 4. 当前可复用生产能力

### 4.1 Bridge Kit

可以复用，但需要重新组合并接受生产 Gate：

- `ai_bridge_kit/readiness.py`：canonical repo/worktree/HEAD、mandatory source、hash、bounded effect 和 authority continuity 原语；
- `ai_bridge_kit/reviewed_handoff.py`：任务分支/worktree/materialization 身份与 fail-closed Git 边界；
- `ai_bridge_kit/reviewed_runner.py`：`AI_BRIDGE_STATE_HOME`、原子 JSON 写入、同 repo+branch watcher 排他标记、当前 Reviewed event identity；
- `ai_bridge_kit/text_review.py`、`text_transform.py`、`visual_review.py`：artifact/hash/freshness 检查模式；
- `ai_bridge_kit/persistent_run.py`：terminal-owned runtime 的 run/goal/effect binding、tmux lifecycle/status 与“runtime terminal 不等于 Goal 完成”边界。

不能误称已有：

- 生产 `SessionStart`/`Stop`/`Interrupt` Hook core；
- Delivery Declaration 或 project adapter parser；
- `delivery_class` / `required_gate_refs` 解析；
- gate result 与 consumed target 的通用绑定；
- 当前 App task 的安全通用 writer takeover；
- 跨 consumer 的 Delivery Assurance snapshot/事件合同。

当前 Bridge 0.11.0 scope-reset 包只批准五项既有产品范围，明确排除 daemon、watcher 扩张、persistent Codex thread、custom app-server/WebSocket client、cross-workflow state machine 等机制。Delivery Assurance 若进入 Bridge，必须由新的 Planner/Critic 包与该 scope reset 协调，不能塞进正在批准的 0.11.0 包。

### 4.2 AI Skills / workflow-core

已有、可直接作为语义输入：

- `skills/core/codex-system/codex-workflow-protocol/SKILL.md` 已规定 W1–W5：验收准入、证据忠实、重复失败熔断、should-not-change 和 domain routing；
- `docs/plugin-todos/workflow-core.md` 已有正式 NEW 条目 `Final delivery must consume domain-owned self-QA before user-ready completion`；
- Frontend Design 已要求 exact candidate 的 actual-surface P1/P2/P3 证据；
- Presentations 已要求最终 PPTX 真实渲染和逐页视觉 QA；
- Research Writing 已有 claim/evidence spine、result-to-claim 和 final artifact gate；
- Medical Imaging 的 generic method gate 与 CARE overlay 可以组合。

仍缺生产化：

- normal entry 中的 `delivery_class` 决策；
- 结构化 `required_gate_refs` 输出；
- exact candidate/consumed target 变化后的标准 invalidation 输出；
- 向 Bridge 提供统一、可机械消费的领域 gate result；
- 小型非 artifact 任务的 risk-scaled no-op 路径；
- production replay、regression、版本与正式 release 证据。

R5 已冻结 maintenance tracking 触发点：Phase 1 GO 后、Planner 第一次准备对 `workflow-core` 做实质生产设计/实现交接之前。下一轮 Planner 必须按 AI Skills maintenance board 决定是否创建/绑定 Issue；本研究分支不代为创建。

### 4.3 Consumer 仓库

Lucerna、CARE、Bobbio 已有真实验收入口和强领域合同，可以作为 adapter 设计输入；它们不是 Phase 2 自动修改对象。详细事实见 `CONSUMER_ACCEPTANCE_INVENTORY_20261019.md`。

## 5. Phase 2 需要补齐的最小生产面

以下是 Proposal R5 已定义、但当前生产源尚不存在的最小能力集合：

1. **受限 Hook 入口**：项目 `.codex/` 只保存薄 definition；核心 handler 在 Bridge 正式安装中；保留已有 Hook，检测同类 Stop 冲突。
2. **任务与候选绑定**：repo root、git common-dir、worktree、HEAD、session/turn、冻结 Goal/declaration、artifact/consumed target identity。
3. **薄 adapter discovery**：读取项目声明和已有 gate locator；无 adapter 的项目保持 no-op。
4. **gate result 消费**：只验证 owner、结果、scope、candidate、consumed target、新鲜度和 evidence locator，不在 Bridge 内评分专业质量。
5. **短寿命 snapshot**：写入现有 `AI_BRIDGE_STATE_HOME`，可重算、非权威、非中央数据库。
6. **Stop/Interrupt 合同**：PASS 结束；可返修 FAIL 只给一次 continuation；用户停止、低进展、重复失败、冲突和预算耗尽立即熔断。
7. **恢复与长任务交接**：同步任务使用 Hook；外部/长任务返回现有 owner 和精确 resume locator，不由 Hook 轮询或重提作业。
8. **只读事件输出**：供现有观察层投影，不新增可写 DONE owner。

## 6. Planner/Critic 必须冻结的决定

| 决定 | 为什么必须冻结 |
|---|---|
| 与 Bridge 0.11.0 scope reset 的版本/分支/依赖顺序 | 当前 0.11.0 包正在删除 reader/progress-thread 等实验拓扑；DA 不能建立在即将删除的组件上。 |
| 生产 Hook 的安装、来源、信任和卸载路径 | Phase 1 只证明了项目 Hook；正式安装不得覆盖已有 config/Hook，也不得依赖 trust bypass。 |
| adapter 与 Delivery Declaration 的最小字段和合法 owner | Executor 不能通过改 declaration/adapter 逃避 gate。 |
| event id、claim、snapshot 的精确 schema 与迁移策略 | 必须防重复、单写者和跨版本错读，但不能演化成第二任务数据库。 |
| current-task identity 的公开来源 | 只能使用正式 Hook 输入、普通 Git/Bridge facts；禁止依赖 Codex private state。 |
| gate result 的最小跨层合同 | Bridge 只做机械验证；workflow-core/domain/project 分别拥有语义。 |
| unmanaged repo 的 no-op 行为 | 新能力不能让所有 repo 被强 Hook/强 QA。 |
| long-run 的 `WAITING_EXTERNAL_OWNER` / resume 语义 | 必须保留 CARE/Slurm/Persistent 等现有 owner，避免第二 scheduler。 |
| release Gate 与 normal-entry 证据 | DA-G10–G15 尚未执行，不能用 Phase 1 事件代替。 |

## 7. 建议的后续验证顺序

这只是对 R5 Gate 依赖的整理，不是实施授权：

1. Planner/Critic 冻结 Bridge Phase 2 包；
2. 在独立 Bridge 实现分支实现最小 core，并对同一最终 candidate 跑 DA-G01–G09、G13、G16 的生产等价回归；
3. 再冻结/实现 workflow-core delivery admission，执行 DA-G10；
4. 以无 adapter repo + 最小受管 fixture 执行 DA-G11；
5. 只读接入 CARE/Persistent 代表性证据执行 DA-G12，不启动真实 GPU/Slurm；
6. 使用真实领域最终产物按批准 consumer 顺序执行 DA-G14；
7. 最后执行正式 release/adaptation 的 DA-G15。

## 8. 明确不进入 Phase 2 的内容

- 新 daemon、watcher、controller、数据库或任务状态机；
- Local Autonomous Acceptance/Program Run 复活；
- Bridge 内的 UI、论文、统计或医学影像评分器；
- Hook 轮询 Slurm、自动 submit/cancel、heartbeat 代替科学完成；
- Codex private auth/SQLite/memory/session/rollout/index 读取；
- 未经单独授权的 Windows、生产账号、私有数据、付费调用、外部发布；
- 从 probe 目录复制 handler 并直接称为生产实现。

## 9. 交接状态

```text
PHASE1_INPUT_COMPLETE=YES
PRODUCTION_FACT_AUDIT_COMPLETE=YES
READY_FOR_PLANNER_CRITIC_PHASE2_PACKAGE=YES
READY_FOR_CODEX_PHASE2_IMPLEMENTATION=NO
```

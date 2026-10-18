# Delivery Assurance Gate 生命周期事实清单

状态：生产设计输入，不是新 Gate 或状态机
日期：2026-10-19

## 1. 事实分类

本文使用四类状态，避免把 Proposal、已有代码和缺口混在一起：

- `PROVEN_PHASE1`：R5 clean run 已在真实 Codex Hook 生命周期中证明；
- `EXISTING_PRODUCTION_PRIMITIVE`：当前生产仓库已有可复用原语，但尚未组成 Delivery Assurance；
- `EXISTING_DOMAIN_CONTRACT`：领域/consumer 已有验收事实与入口；
- `MISSING_PRODUCTION_CONTRACT`：Proposal 已提出但生产实现仍不存在，须由 Planner/Critic 冻结。

## 2. 生命周期总表

| 生命周期环节 | 当前事实 | 状态 | 当前 owner / locator | Phase 2 缺口 |
|---|---|---|---|---|
| 任务来源 | Bridge/项目已有 Goal、Reviewed CURRENT、CARE task 等各自权威 | `EXISTING_PRODUCTION_PRIMITIVE` | Bridge `readiness.py`、`reviewed_handoff.py`；consumer task contract | 统一归一化 locator，不另造任务状态机 |
| repo/worktree/HEAD | Bridge 已有 canonical root、branch、HEAD、mandatory source/hash 检查 | `EXISTING_PRODUCTION_PRIMITIVE` | Bridge `ai_bridge_kit/readiness.py` | 加入 DA candidate binding，但不复制 Git controller |
| session/turn/cwd | Hook public event 能提供；Phase 1 已用其拒绝错 session/cwd | `PROVEN_PHASE1` | R5 P5/P13 | 生产 schema 与 Bridge runtime identity 的精确组合 |
| Hook definition/trust/source | 正常 `/hooks` 可显示来源、启用、review 状态；精确 hash trust 已证明 | `PROVEN_PHASE1` | R5 DA-G01/P8/P10/P11 | 正式安装/升级/冲突/卸载流程 |
| event identity | 重复 event 与并发 handler 可由 exclusive claim 去重 | `PROVEN_PHASE1` | R5 P6/P7 | 生产 event-id 公式、版本和 crash recovery |
| 单写者 | 原子 claim 能把 gate/continuation 限制为一次 | `PROVEN_PHASE1` | R5 P7 | 与 Bridge 现有 machine-state 原子写模式合并 |
| candidate identity | Phase 1 能绑定当前 candidate 并拒绝 mutation 后旧 evidence | `PROVEN_PHASE1` | R5 P1/P9/P13 | 通用 artifact/runtime/consumed-target 字段 |
| gate declaration | workflow-core TODO 已定义 delivery admission 意图 | `EXISTING_DOMAIN_CONTRACT` | AI Skills `docs/plugin-todos/workflow-core.md` | `delivery_class`、`required_gate_refs` 的生产输出 |
| gate 执行 | consumer/domain 各有自己的命令、脚本、Reviewer/validator | `EXISTING_DOMAIN_CONTRACT` | Lucerna/CARE/Bobbio/domain skills | adapter 只定位，不把命令语义搬进 Bridge |
| gate 结果 | 各项目已有 PASS/FAIL/UNKNOWN 类语义，但格式不统一 | `EXISTING_DOMAIN_CONTRACT` | 各 consumer evidence | 最小 owner/result/scope/candidate/target/evidence 合同 |
| freshness/invalidation | Bridge review primitives 和 consumers 均已有 exact candidate/stale 拒绝模式 | `EXISTING_PRODUCTION_PRIMITIVE` | Bridge text/visual review；Lucerna immutable evidence freeze | 统一跨层机械检查，不引入 semantic identity graph |
| Stop FAIL → continuation | 同 task/session/worktree 一次返修已证明 | `PROVEN_PHASE1` | R5 P1 | 正式 Bridge 受限入口、prompt contract 与日志最小化 |
| Stop PASS | 合格候选零返修并正常结束已证明 | `PROVEN_PHASE1` | R5 P2 | 将 PASS 限定为 required gate 完整且新鲜 |
| repair budget | 固定 1，第二次失败停止已证明 | `PROVEN_PHASE1` | R5 P4 | 正式配置不可在运行中提高；低进展判定 |
| Interrupt | 用户停止优先且不重启已证明 | `PROVEN_PHASE1` | R5 P3 | 与生产 handler/writer 生命周期组合回归 |
| Hook 故障 | untrusted/disabled/timeout/error/malformed 时无假 PASS且可恢复 | `PROVEN_PHASE1` | R5 P10/P11 | 生产可观察状态与故障恢复 Gate |
| 第二 Stop controller | 未信任 controller 不运行且可归因 | `PROVEN_PHASE1` | R5 P8/DA-G16 | 多个受信任 matching controller 的 fail-closed 规则 |
| continuation 权限 | synthetic continuation 不产生新授权 | `PROVEN_PHASE1` | R5 P12 | 连接 Bridge bounded effect/Host Policy，不新增 allow |
| machine-local snapshot | Bridge 已有 `AI_BRIDGE_STATE_HOME` 和原子 JSON 原语 | `EXISTING_PRODUCTION_PRIMITIVE` | Bridge `reviewed_runner.py`、`persistent_run.py` | 非权威、短寿命 DA snapshot schema |
| resume | Hook same-session resume 和错 cwd 拒绝已证明；Bridge 各模式另有各自恢复 | `PROVEN_PHASE1` + `EXISTING_PRODUCTION_PRIMITIVE` | R5 P13；Bridge Reviewed/Persistent | 不宣称可任意接管现有 App thread；定义合法 owner handoff |
| 长任务等待 | CARE/Slurm/Persistent 已有 owner，terminal 不等于语义完成 | `EXISTING_PRODUCTION_PRIMITIVE` | CARE Controller/finalizer；Bridge Persistent Run | DA 只记录 owner/ref/resume，不轮询、不重提作业 |
| 领域判断 | Frontend、Presentations、Research、Medical Imaging/CARE 已有专业合同 | `EXISTING_DOMAIN_CONTRACT` | AI Skills + consumer repo | workflow-core 路由和标准结果，不把评分写进 Bridge |
| release/adaptation | Bridge/AI Skills 各有正式 release/maintenance owner | `EXISTING_PRODUCTION_PRIMITIVE` | AI Skills Maintainer、Bridge release | DA-G15 的组合候选、版本、fresh-session smoke |

## 3. Bridge 当前原语与限制

审计基线：`YuukiAS/GPT_Codex_AI_Bridge_Kit@a9c03b4a36c185aa98b00006c08ef600ba77d094`。

### 可复用

- `readiness.py`：repo identity、Git truth、bounded effect、authority continuity；
- `reviewed_runner.py`：`AI_BRIDGE_STATE_HOME`、原子写入、同 target/branch watcher 排他、Reviewed event identity；
- `reviewed_handoff.py`：任务 worktree/branch/materialization 的精确边界；
- text/visual review modules：artifact identity、hash、freshness 和 stale 拒绝模式；
- `persistent_run.py`：Goal hash、launch effect、run/session binding、terminal status 与语义完成分离。

### 不能当成已有 DA

- Reviewed watcher 通过独立 `codex exec` 启动 Executor，不是当前 App turn 的 Stop continuation；
- Reviewed event identity 目前面向 `task_key|state|review_round|plan_revision|implementation_commit`，不是通用 Hook event/candidate/consumed-target identity；
- Persistent Run 只拥有 terminal-owned process lifetime，不拥有产品/科学 PASS；
- 当前 main 没有生产 `SessionStart`/`Stop`/`Interrupt` Delivery Assurance handler；
- 0.11.0 scope reset 计划移除 current app-server reader/progress-thread 等实验扩张，不能把它们作为 DA 依赖。

## 4. workflow-core 与领域 owner 当前事实

审计基线：`YuukiAS/AI_Skills_Collection@23f51b0bebd8a32f49d899f7fae1ee0e5f17e4cd`。

| Owner | 已有 contract | 尚缺的 DA 对接 |
|---|---|---|
| workflow-core | W1–W5、真实验收链、evidence fidelity、repeat-failure、risk-scaled routing | normal-entry `delivery_class`、结构化 `required_gate_refs`、标准 invalidation/result |
| Frontend Design | actual-surface convergence；exact candidate 上 `P1=0/P2=0`；producer self-QA 先于外部验收 | 输出 Bridge 可消费的 candidate/surface/result/evidence locator |
| Presentations | PPTX 真实 presentation engine render；逐页视觉/科学对象 QA；文件存在不算完成 | 统一 gate result 与 changed-slide invalidation |
| Research Writing | claim/evidence spine、result-to-claim、citation/final artifact gate | selected artifact/claim evidence/render result 的统一 locator |
| Medical Imaging + CARE overlay | generic mechanism gate + CARE-specific metric/label/adequacy/submission contract | checkpoint/prediction/metric/package 与 scientific verdict 的标准 binding |

## 5. 必须保持分离的状态

以下状态不能合并成一个笼统 PASS/FAIL：

1. **机制状态**：Hook 是否运行、可信、可归因；
2. **执行状态**：gate 是否实际执行、是否缺环境；
3. **领域状态**：专业 owner 的 PASS/FAIL/UNKNOWN；
4. **候选状态**：evidence 是否绑定当前 candidate/consumed target；
5. **权限状态**：下一动作是否仍在原授权内；
6. **长任务状态**：外部 owner 是否仍运行/等待/terminal；
7. **交付状态**：所有 required gates 是否完整、新鲜并允许 USER_READY。

Phase 1 P10/P11 已证明：被测 Hook 故障可以让场景测试 PASS，但该时点的交付证明仍是 `UNPROVEN|UNKNOWN`。生产 schema 必须保留这一层次，不能把“负例按预期 fail closed”误写为“产品已 PASS”。

## 6. Phase 2/3 待证 Gate

| Gate | 当前状态 | 下一次需要的最小证据 |
|---|---|---|
| DA-G10 | `NOT_EVALUATED_PHASE1` | workflow-core 声明 required refs；domain/project owner 判定；Bridge 只验绑定/新鲜度 |
| DA-G11 | `NOT_EVALUATED_PHASE1` | 有 adapter 项目正常解析；无 adapter 项目严格 no-op；项目不复制 core |
| DA-G12 | `NOT_EVALUATED_PHASE1` | 现有 long-run owner 等待→terminal→精确 resume→fresh check；无重复 job |
| DA-G13 | `NOT_EVALUATED_PHASE1` | Lite/Review/Control/Persistent 等 normal entry 在同一 Bridge release candidate 上回归 |
| DA-G14 | `NOT_EVALUATED_PHASE1` | exact final consumed artifact 的领域 PASS 被 DA 消费，build/file PASS 不足以 USER_READY |
| DA-G15 | `NOT_EVALUATED_PHASE1` | Bridge + AI Skills 正式 release、Update impact、managed consumer adaptation、fresh-session smoke |

## 7. Planner 不能从本文推导的内容

- 不能推导任一 production filename/schema 已获批准；
- 不能推导 Adapter 必须叫 `ADAPTER.toml`，该名称仍只是 Proposal 设计候选；
- 不能推导所有任务都需要独立 Reviewer 或视觉 Gate；
- 不能推导 Stop Hook 可以拥有 Slurm、发布、凭据或外部服务权限；
- 不能推导旧 PASS 可跨 source/artifact/runtime 变化复用；
- 不能推导 Phase 1 probe handler 适合复制进 Bridge。

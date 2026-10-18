# Delivery Assurance — Independent Critic Prompt R4

你现在担任 AI Research Stack 的独立 Critic，对 Delivery Assurance Phase 1 的 R4 最小 execution-package 返修做 `EXECUTION_READY_REVIEW_R4`。

这不是重新审 Delivery Assurance，也不是重新评估已经关闭的 R0/R1 架构与安全问题。R3 的 setup/auth-isolation 主方向已经在上一轮 Critic review 中被认可；本轮只复核两个 blocker 是否关闭，以及 R4 是否意外造成范围漂移。

## Active Review Context

- target_repo: `YuukiAS/AI_Research_Toolkit`
- design_topic_or_task_key: `software-production--delivery-assurance`
- source_branch: `research/software-production-decision-20261013`
- reviewed_object: `R4`
- review_stage: `EXECUTION_READY_REVIEW_R4`
- frozen_package_commit: `2e37fa11306d61fe56f402e7745939f0c458686e`
- proposal:
  `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PROPOSAL_R4_20261018.md`
- canonical_goal:
  `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PHASE1_GOAL_R4_20261018.md`
- kickoff_draft:
  `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PHASE1_KICKOFF_DRAFT_R4_20261018.md`
- previous_review:
  `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_CRITIC_REVIEW_R3_20261018.md`
- previous_review_commit:
  `0910ae7ce55c61a631f0ac34577ba8569a397b7a`
- previous_reviewed_package:
  `d3241b4adbe6e3d32a816b6fe31a61d547555a05`
- blocker_to_recheck:
  - `DA-R3-F01 — GO_BINDS_WRONG_PROPOSAL_VERSION`
  - `DA-R3-F02 — AUTH_BACKEND_MAINTENANCE_NOT_EXEMPTED`
- expected_review_output:
  `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_CRITIC_REVIEW_R4_20261018.md`

本轮不要执行 Phase 1，不要恢复任何 stopped probe，不要修改 Bridge、AI Skills、consumer、Windows、Slurm、GPU、tmux 长任务或付费系统。

## 一、先读必要治理与上一轮审查

实际读取 `YuukiAS/AI_Skills_Collection@main` 最新：

- `docs/workflows/PLANNER_ROLE_CONTRACT.md`
- `docs/workflows/CRITIC_ROLE_CONTRACT.md`
- `docs/workflows/PLUGIN_CAPABILITY_GATE_POLICY.md`
- `docs/workflows/AI_SKILLS_MAINTENANCE_BOARD.md`

再读取上一轮 R3 Critic review，以及 frozen R4 Proposal / Goal / Kickoff。

当前已关闭、没有新直接证据不得重开：

- `DA-R0-F01=CLOSED`
- `DA-R0-F02=CLOSED`
- `DA-R1-F01=CLOSED`

## 二、核对当前 OpenAI Codex 官方行为

只需要针对 R4 两个修改相关事实做当前核查，不重新研究全部 Hook 架构。

至少核对当前官方：

- Authentication 文档；
- Hooks 文档；
- CLI developer commands；
- Config / environment variables。

重点确认：

1. Codex 登录信息可缓存于 `CODEX_HOME/auth.json` 或 OS credential store。
2. 正常运行存在认证后端 refresh/maintenance 的正式路径，例如 Codex 可在正常运行中刷新并保留更新后的 `auth.json`。
3. 认证材料仍应被视为敏感内容，不能由 probe 打印、复制或读取 secret。
4. `--ignore-user-config` 仍是不读取 `$CODEX_HOME/config.toml`、authentication 继续使用 `CODEX_HOME`。
5. `codex exec --ephemeral` 仍是不持久化 session rollout files。
6. `CODEX_SQLITE_HOME` / `sqlite_home`、Hook trust 和 project trust 的现有行为没有发生会推翻 R4 的变化。

如果官方行为已变化，只判断是否直接影响本 R4；不要借此重开无关设计。

## 三、优先复核 DA-R3-F01

### 原 blocker

R3 Canonical Goal 的最终 GO 句错误绑定：

`Proposal R2`

而不是同版 Proposal。

### R4 修订

请从 frozen package `2e37fa11306d61fe56f402e7745939f0c458686e` 实际读取：

`DELIVERY_ASSURANCE_PHASE1_GOAL_R4_20261018.md`

确认最终 GO 条款现在明确要求：

`P1–P13 ... 满足 Proposal R4`

并检查所有**决定当前执行/GO**的 Proposal / Goal / Kickoff 版本 locator 是否统一绑定 R4。

历史叙述中的 R2/R3 locator 不属于错误，只要它们明确在说明历史事实、旧 review 或旧 stopped probe。

关闭标准：

- 当前 Proposal = R4；
- 当前 Goal = R4；
- 当前 Kickoff = R4；
- current execution branch = `work/delivery-assurance-hook-probe-r4`；
- `EXECUTION_READY_REVIEW_R4`；
- 最终 GO 绑定 Proposal R4；
- 不改变 P1–P13、DA-G01–DA-G16、预算、权限或恢复语义。

如果满足，必须明确写：

`DA-R3-F01=CLOSED`

## 四、优先复核 DA-R3-F02

### 原 blocker

R3 对 real `CODEX_HOME` 的“除 Hook trust 外不得发生任何新增 durable effect”写得过绝对，会把 Codex 自身合法 token refresh / credential-cache maintenance 误判为 setup failure。

### R4 修订

R4 将 real `CODEX_HOME` 持久变化拆成两类：

#### A. probe-owned / probe-induced persistent effects

由本次 probe、handler、Executor、diagnostic code 或 setup 自己造成的持久状态。

冻结要求：

- 除用户本人通过正常 `/hooks` 对当前精确 Hook definition/hash 的 trust 外，必须为 NONE。
- SQLite / log / history / session rollout / `AI_BRIDGE_STATE_HOME` / probe cache 隔离标准与 R3 完全相同。

#### B. opaque authentication-backend maintenance

Codex 产品自身为了维持**已经存在的登录身份**而进行的正常认证后端维护，例如：

- ChatGPT token refresh；
- 对应的 file/keyring credential-cache 更新。

冻结要求：

- 允许发生；
- 不计作 probe state；
- 不构成新的用户授权；
- 不属于 probe-owned / probe-induced effect。

同时，R4 仍必须严格禁止 probe handler、Executor 或 diagnostic code：

- 读取 secret 内容；
- 比较 token 内容；
- 打印；
- 复制；
- 导出；
- 软链接；
- 重写

`auth.json`、token、credential store、API key 或其他认证秘密。

认证维护最多允许**非敏感路径/文件存在性/时间戳等元数据级观察**，用于区分“Codex 自身认证维护”与“probe-owned state”。不得把这一例外变成读取凭据的理由。

以下仍全部禁止：

- 重新 Sign in；
- Device Code；
- API key fallback；
- 复制/软链接 auth cache；
- 切换到新的未认证 CODEX_HOME。

请逐一检查以下四处是否使用完全一致的定义：

1. Proposal R4；
2. Goal R4 setup S1/S2；
3. Goal R4 `HOOK_PREFLIGHT.md` 字段；
4. Kickoff R4。

特别检查 `HOOK_PREFLIGHT.md` 是否已经从绝对的：

`real CODEX_HOME 新增 durable effects 除 exact Hook trust 外 = NONE`

改为：

- probe-owned/probe-induced durable effects 除 exact Hook trust 外 = NONE；
- opaque authentication-backend maintenance = allowed existing-auth maintenance / not probe state；
- secret 内容未被 probe 读取/比较/复制/导出等。

关闭标准：

- 正常 token refresh 不会错误触发 setup blocker；
- probe 自己不能借此写入其他真实 CODEX_HOME 状态；
- probe 不能接触 secret；
- Hook trust 仍是用户唯一新增的显式持久配置动作；
- 不扩大用户授权。

如果满足，必须明确写：

`DA-R3-F02=CLOSED`

## 五、只做范围漂移检查，不重新审整个系统

以下全部应与 R3 保持不变，只检查是否被 R4 意外改坏：

- 复用真实 authenticated `CODEX_HOME`；
- 不使用 `--ignore-user-config`；
- existing project trust only，不新增 `projects.<path>.trust_level`；
- exact Hook trust 通过正常 `/hooks` 人工完成；
- Hook source conflict fail closed；
- setup blocker 不产生 Phase 1 verdict；
- P1–P13 语义与覆盖；
- DA-G01–DA-G16 编号和能力边界；
- `auto_repair_budget=1`；
- Interrupt 优先；
- event/task identity；
- machine-local atomic single-writer；
- synthetic continuation 不新增 authority；
- candidate binding；
- P10/P11 三层判定；
- Local Autonomous Acceptance = CLOSED；
- Program Run 后做；
- 无新 repo / daemon / workflow state machine / 第二 Slurm owner；
- Phase 1 不修改生产 Bridge、AI Skills、consumer、Windows、Slurm、GPU、tmux 长任务或付费系统；
- Phase 1 GO 后不能自动进入 Phase 2；
- workflow-core maintenance tracking 触发点不变。

DA-G01 因认证维护例外而更新 PASS/FAIL 证据措辞属于同一能力门禁的精化，不应因为这一最小修订要求新增 Gate。

## 六、Proposal / Goal / Kickoff 同版一致性

检查 frozen R4 三件套是否完整一致：

- Proposal R4 是当前设计源；
- Goal R4 是当前执行合同；
- Kickoff Draft R4 只引用 Proposal/Goal R4；
- Kickoff 没有扩大授权；
- Kickoff 对 auth-backend maintenance 的例外与 Proposal/Goal 一致；
- Kickoff 仍禁止任何 secret access 与重新登录 fallback；
- current execution branch 使用 `work/delivery-assurance-hook-probe-r4`；
- Critic PASS 仍不能替代用户实际发送 Kickoff；
- Critic PASS 仍不能替代用户在执行时通过 `/hooks` 对精确 Hook definition/hash 做 trust。

## 七、判决

只允许：

`PASS`

或

`REVISE`

### 如果 REVISE

优先复核原两个 finding。

如果同一问题仍存在，继续使用：

- `DA-R3-F01`
- `DA-R3-F02`

只有 R4 新引入了与本次最小修改直接相关的真实风险，才新增 `DA-R4-Fxx`。

每个 blocker 必须给出：

1. 对应要求；
2. 直接证据；
3. 因果失败风险；
4. 最小关闭条件；
5. 责任 owner。

不要重新审已经通过的整个 Delivery Assurance，不得移动终点。

按 Critic Role Contract 自动输出可直接复制给 Planner 的唯一下一交接，并明确 Phase 1 仍未获 R4 执行许可。

### 如果 PASS

先用正常中文解释：

- `DA-R3-F01` 如何关闭；
- `DA-R3-F02` 如何关闭；
- token refresh 为什么不再被误判成 probe durable state；
- secret access 为什么仍然被禁止；
- 哪些 R3 已通过合同完全没有变化；
- 本 PASS 证明与不证明什么。

随后明确：

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
```

如果给 execution-ready PASS，按 Critic Role Contract **逐字输出 frozen package 中已经审查的 R4 Kickoff Draft**，不得临场改写。

Critic PASS 仍不能替代：
1. 用户之后实际发送 R4 Kickoff；
2. 执行时用户本人在 `/hooks` 对当前精确 Hook definition/hash 的 trust。

## 八、审查产物

将完整审查写入：

`docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_CRITIC_REVIEW_R4_20261018.md`

只写 Critic review artifact；不要修改 R4 Proposal、Goal、Kickoff，不要运行 probe，不要修改任何生产仓库。

最终回复按 Critic Role Contract 给出 review commit/path 和唯一下一入口。

# Delivery Assurance 用户价值 finding 关闭矩阵 v0.1

状态：**PLANNER DESIGN RESPONSE / 独立 Critic 待审 / 未授权实施**  
日期：2026-10-22

## 结论总表

| Finding | Planner 结论 | 现有架构已经解决的部分 | 仍然缺失的部分 | 本轮关闭方式 | `da/1` 影响 |
|---|---|---|---|---|---|
| `DA-USER-F01 NORMAL_ENTRY_AUTO_TRIGGER` | **接受** | v0.4 已定义 normal entry、adapter、Resolver 和 Stop；Bridge Package 02 已列 Lite/Review/Control call site | installed Skill 的自动匹配不是强制入口；Package 01/02 没有冻结“普通功能请求缺少 DA 时必须 fail closed”；raw Codex 与受管入口混在一起 | 冻结支持入口矩阵、强制 admission call、缺失保障不得得到 `NONE`/完成声明、unsupported surface 诚实边界 | 不改字段；使用现有 `normal_entry_refs[]`、missing-capability routing、`UNCOVERED_OBLIGATION`、`CLAIM_UNPROVEN` |
| `DA-USER-F02 OLD_FUNCTION_PROTECTION_COVERAGE` | **接受** | v0.4/`da/1` 已有 TargetGraph、adapter 单调性、`actual_change_impact`、`should_not_change`、`UNKNOWN_IMPACT` | 若项目自己的 target/edge/impact mapping 不完整，Resolver 仍可能只检查已登记项目；缺少“映射完整性本身”的 normal-entry 证明 | 增加 changed-surface coverage、promised-capability coverage、consumed-target coverage 三重闭包；未映射源、入口、target、edge 或旧行为一律 `UNKNOWN_IMPACT/UNCOVERED_OBLIGATION`，先修 adapter 再完成 | 不改字段；使用现有 `targets[]`、`edges[]`、`source_set_rules[]`、`impact_rules[]`、`obligations_missing[]` |
| `DA-USER-F03 EARLY_ANTI_DEGRADATION` | **接受** | descriptor 已含 regression/known-bad/should-not-change，Control 已有 Verifier-before-Executor 和非替代语义 | Package 01 主要围绕最终 resolution/admission；没有冻结普通实现过程何时必须跑便宜的真实链和低配替代负例 | 在原任务内增加 admission、first vertical slice、integration、final candidate 四个检查时点；它们是 Gate 执行时机，不是新状态机；高成本 Gate 仍只在稳定候选运行 | 不改字段；复用现有 GateDescriptor、GateResult、candidate/invalidation 和 known-bad 字段 |
| `DA-USER-F04 CONTINUOUS_REPAIR_AND_SAFE_STOP` | **部分接受** | Review 已有第一轮 `REVISE` 后一次自动 Codex repair、最多两轮；Control 已有 typed finding、bounded `max_repair_rounds`；项目 controller 保留自身恢复 | 当前 Lite 只是一次 `codex exec`；直接 Codex/Canonical Goal 最多依靠 Stop 一次 continuation；Package 02 没有冻结这些预算怎样去重和交接 | Stop 只做一次同 turn bounded continuation；之后由原 Review/Control/project controller 按现有预算继续同任务修复；Lite/Canonical Goal 若仍失败则诚实停止，不自动升级 workflow；workflow-core 在任务前自动选择有足够恢复能力的既有 workflow | 不改 failure routing；明确实现包交接与预算，不新增 loop/state/role |
| `DA-USER-F05 USER_BURDEN_VALIDATION` | **接受** | v0.4 有七仓 Gate 和首个 vertical consumer | 目前没有真实证据证明用户提醒次数下降、低配实现更早被拦、完成率提高且成本可接受 | 新增独立 user-value pilot：Lucerna 防回归、CARE 低配实现、Asteria 正常入口/反自签；比较历史真实人工介入与 DA candidate actual normal-entry run；设置零普通 QA 提醒、零 known-bad 假完成等门槛 | 不改 wire interface；这是 production release 前的 Capability Gate |

## `DA-USER-F01`：正常入口

### 已验证事实

- `workflow-core` Skill 可以依靠 metadata/description 被模型匹配，也可以显式调用；这是一种模型路由能力，不是强制 admission hook。
- 当前 Bridge Lite normal entry 是 `ai-bridge task run`，代码只启动一次 `codex exec` 并返回进程结果；它尚未自动执行 Delivery Assurance。
- Review 的 watcher 和 Control 的 role runner 都有可定位的 Executor 启动点，可以进行确定性接入。
- Codex project Hook 只有在项目 trusted、当前 Hook definition/hash 已获 trust 且 hooks 未禁用时才执行；Stop 可以请求一次继续，但不能证明任务从一开始就走过完整 DA。

### 设计处理

生产承诺只覆盖经过正式 adoption 的仓库和已明确接通的 normal entry：

```text
Canonical Goal / task packet
Bridge Lite
Bridge Review
Bridge Control
consumer 自有 controller normal entry
```

每个支持入口必须在启动前或任务 materialization 时调用 Resolver，在完成前调用 delivery admission。安装 Skill 但没有 call-site consumption，不算支持。

以下入口不得被宣传为已支持：

```text
raw one-line Codex prompt without a task packet
untrusted or disabled project hooks
non-adopted repository
ChatGPT-only or remote surface without the required local runtime/Hook/adapter
```

Raw Codex 的 trusted Stop Hook 可以防止一部分假完成，但在专门 direct-entry package 和 actual normal-entry pilot 完成前，不能代签“自动早期保障”。

## `DA-USER-F02`：旧能力覆盖

现有 adapter 单调性解决的是“已知义务不能被删掉”，但没有单独证明“应该知道的旧能力是否都被登记”。本轮新增三个闭包检查：

1. **changed-surface coverage**：从批准基线到候选的每个 acceptance-relevant changed path、public entry、shared dependency、artifact family 都必须映射到 target/edge/impact rule；
2. **promised-capability coverage**：frozen Goal、current milestone、accepted baseline 和 active professional contract 中的每个承诺能力必须有 target、normal entry、Gate family 或明确的 HUMAN_ONLY/unsupported ceiling；
3. **consumed-target coverage**：最终用户实际消费的 build/package/installed/runtime/report/checkpoint 等节点不能因为 adapter 漏写而消失。

任何缺口都不是 `NONE`。Resolver 必须输出 `UNKNOWN_IMPACT` 或 `UNCOVERED_OBLIGATION`，将范围提升到能包住未知闭包，并要求同任务修 adapter。若缺失的是新产品/科学语义，才回 project/domain owner；不把清单维护交给用户。

## `DA-USER-F03`：开发中反降级

四个检查时点只是执行安排，不增加 workflow state：

```text
ADMISSION
FIRST_VERTICAL_SLICE
INTEGRATION_CHECKPOINT
FINAL_CANDIDATE
```

- `ADMISSION`：冻结目标、accepted baseline、non-substitutable semantics、known-bad 与 required gate set；
- `FIRST_VERTICAL_SLICE`：第一次真实链可运行时，检查实际 normal entry、机制是否存在、是否退化为 proxy/toy/smoke；
- `INTEGRATION_CHECKPOINT`：跨层接通后，运行受影响的 should-not-change 和 dependency closure；
- `FINAL_CANDIDATE`：同一候选运行所有 release-critical Gate。

局部小修不被强迫跑整个产品。只有共享依赖、mapping 不完整、whole-product claim 或历史证明局部验收会漏检时，才升级 broad/full。

## `DA-USER-F04`：持续修复

| 入口 | 当前真实能力 | DA 返修后的合法自动恢复 | 上限 |
|---|---|---|---|
| Canonical Goal / direct task packet | 同一 Codex turn 内可连续使用工具；没有独立 outer repair controller | trusted Stop 最多一次 continuation；该 continuation 内可多次改代码和跑检查 | 第二次 Stop 仍失败即诚实停止 |
| Lite | 一次 `codex exec`，无自动第二进程 | 同上；不自动升级 Review/Control | 一个 Stop continuation |
| Review | watcher 在第一轮 `REVISE` 后自动启动一次 repair；默认最多两轮 review | 每个 Executor event 内可有一次 DA Stop continuation；event 后仍失败由 Review 自己的 repair round处理 | Review 2 `REVISE` 后进入现有 human terminal |
| Control | typed finding、Verifier/Executor/Controller、bounded `max_repair_rounds` | DA finding 按原 owner 路由；Stop continuation 不取代 Control round | 达到现有 round ceiling 或真实 semantic/user boundary 时停止 |
| CARE/CUHK_Date 等项目 controller | 已有 wait/resume/finalizer/recovery | DA 只消费结果和路由 defect，不接管 scheduler/controller | 原项目预算和授权边界 |

同一个 failure identity 没有新 candidate/evidence 时不得在 Stop、Review 和 Control 之间循环。等待 CI、Slurm、外部 GPT 或 HUMAN_ONLY 不消耗 repair round。

## `DA-USER-F05`：用户价值

生产 release 之前必须证明：

```text
普通 QA reminder = 0
known-bad false completion = 0
agent-resolvable defect returns to same task
at least one historical regression is caught before final Stop
at least one shallow-substitution candidate is rejected before USER_READY
small/isolated change is not needlessly escalated to full-product review
all additional model/runtime/external cost is recorded
```

详细任务和评价方法见 `DELIVERY_ASSURANCE_USER_VALUE_PILOT_PLAN_V0_1_20261022.md`。

## 公共接口结论

```text
DA1_REQUIRED_FIELD_CHANGE=NO
DA1_OWNER_CHANGE=NO
DA1_DECISION_SEMANTIC_CHANGE=NO
DA1_FAILURE_ROUTING_CHANGE=NO
DA1_FREEZE_INVALIDATED=NO  # Planner candidate；仍需独立 Critic确认
```

理由是五项修订都能由冻结接口已有的 normal-entry、target/edge/source-set/impact、known-bad/should-not-change、GateResult/invalidation、missing-capability 和 failure-routing 语义表达。若独立 Critic发现必须新增 required field 或改变 `NONE/TARGETED/BROAD/FULL`、owner、claim 或 failure meaning，本矩阵结论失效，必须回完整 Delivery Assurance Planner–Critic，而不能在 Package 01/02 中偷改。
# 复杂架构生产协议研究结论

## 最终推荐

固定的 Planner–Critic 不应继续作为未来复杂任务的默认流程。唯一推荐是：

> **证据路由式架构生产协议**
>
> 由一个主架构师形成唯一候选并维护 Asteria 完整性合同；系统根据当前最高风险，按需并行调用 Work 盲区调查、第二独立 Pro、Codex 事实调查或最小探针；陌生实施者证明 handoff 不再需要核心设计后，才允许 Architecture Freeze，并把冻结方案交给 Codex 正式实施。

最大改变不是增加新的固定角色，而是把“下一轮该找谁”从角色轮班改成信息价值判断：显性结构缺口由架构师自己闭合，整段场景遗漏交给 Work，互斥高代价路线交给第二 Pro，真实运行或科学前提交给最小探针，冻结语义内的代码错误留在原 Codex 修复。

## 默认模型配置

对普通复杂任务（L 档），第一波默认启动两个模型来源：

1. 一个主架构师，负责唯一架构候选、最终裁决和冻结；
2. 一个 Work 盲区调查者，只读原始目标、历史事故、TODO 和真实场景，不先继承候选架构。

这不是两个完整架构师。只有在存在两条互斥、后期切换代价高、无法仅靠事实调查裁决的产品或科研路线时，才增加第二独立 Pro。两个方案若共同依赖一个未经验证的 Hook、运行时、API 或数值前提，下一步应是 Codex 最小探针，而不是第三个 Pro。

S 档局部任务直接 Chat/Codex；M 档通常只需一个主设计与 Asteria 自检；XL 档默认在主架构师与 Work 之外并行安排至少一个针对高影响前提的事实调查或探针，并按路线竞争情况决定是否增加第二 Pro。

## Asteria 的正式职责

Asteria 应成为 **Architecture Completeness Contract + Freeze Ledger**，而不只是最终展示工具。它强制设计者完成两条追踪链：

```text
用户能力
→ 组件 owner
→ 输入与事实来源
→ 内部机制
→ 接口与权限
→ 状态
→ 失败与恢复
→ 验证方法
→ 证据取得者与入口
→ 最终 consumer
```

```text
组件输出与真实 payload
→ consumer
→ downstream capability
→ failure effect
→ containment boundary
```

同时分开记录设计、实现和证据状态，绑定真实 source anchor、重大修订原因、保留不变项，以及所有 architecture-killer assumptions。

Asteria 能阻止“组件有名字但没有机制”“关系有箭头但没有载荷或 consumer”“声称实现却没有源码锚点”“声称验证却没有当前候选证据”等假 Freeze。它不能自动发现整个用户场景被遗漏、产品路线错误、科学算法错误、用户根本不需要某功能，或多个模型共享的错误外部前提；这些仍需 Work、第二 Pro、专业判断或真实探针。

## 真正的 Architecture Freeze

Freeze 不是文档写完、Critic PASS、execution plan、Goal 或 Kickoff 中的任意一个。它要求同时具备：

- 所有必需能力、历史保护和边界有明确 owner；
- 关键组件可展开到机制，关键关系有真实 payload、producer、consumer、权限和失败语义；
- 正常、失败和恢复路径走通；
- 一旦错误会大面积推翻架构的外部、运行或科学前提已经在目标入口证明，或被可替换、fail-closed 的边界隔离；
- 验证有合法执行者、当前候选、正控、负控或故障控、证据产物和 consumer；
- 独立盲区调查没有未处理的高影响 finding；
- fresh implementer 能直接拆任务，不需决定产品机制、权限、算法或验收标准；
- 剩余问题只能局部修订，下一次泛化审查的预期信息价值已经很低。

陌生实施者冷读挑战只允许返回：`IMPLEMENTATION_READY`、`RETURN_TO_ARCHITECT`、`CODEX_FACT_CHECK` 或 `CODEX_MINIMAL_PROBE`。禁止“基本可做，实施时再决定”。

## 如何避免 Bridge Kit / Slurm 式返修链

Bridge Kit 0.11.x 的回放表明，早期 Git 技术探针确实有价值，但原始能力的 owner、用户实际 consumer、normal entry、核心与可选表面的边界，以及“统一控制面还是薄核心加 adapter”的产品路线没有在实施前同时闭合。多轮 proposal、Critic、execution package 与实现因此仍进入 final scope recovery、full-functional 扩张和 product scope reset。

新协议会在首轮并行完成：能力—owner—consumer 闭合、Work 原始场景盲区、必要的薄核心/统一控制面独立路线竞争，以及 app-server/normal-entry 最小探针；同时要求可选 Progress、reader、notifier 等通过稳定 adapter 与核心隔离。晚期发现应优先形成局部 adapter 修订，而不是再次重置整版产品。

Slurm routing 证明独立 Critic 并非无价值：首轮审查正确发现取消重提会破坏 `JobId`、依赖与数组语义，也发现站点未禁止 race 不等于用户已授权。问题在于后续摘要、安装入口、递归窗口、隐私、时区和 DST 缺口被拆成多轮串行审查；一次状态/场景矩阵和冷启动 handoff 本可更集中地暴露它们。

Protected cancellation 则证明真正决定架构的证据来自运行边界：Hook 已触发，但冻结 Python 因动态库环境退出 `127`，而普通 Hook failure 没有阻断原 Bash。新协议会在首次冻结 Hook 架构前，用无害 `scancel --help`、解释器/动态库故障注入和 fresh-session probe 验证“Hook 能运行且失败时原操作启动次数为零”。该前提未经证明时，Asteria 直接阻止 Freeze。

## 下一执行者如何自动决定

协议每阶段必须输出唯一 next action：

- 核心结构或机制缺失：`CONTINUE_ARCHITECTURE` / `RETURN_TO_ARCHITECT`；
- 整体场景与历史盲区未独立检查：`WORK_BLINDSPOT_AUDIT`；
- 互斥高代价路线：`SECOND_INDEPENDENT_DESIGN`；
- 只读源码、API 或环境事实未知：`CODEX_FACT_CHECK`；
- 必须通过实验确认的高影响前提：`CODEX_MINIMAL_PROBE`；
- 架构已闭合但 handoff 未证明：`IMPLEMENTATION_READINESS_CHALLENGE`；
- Freeze Gate 全部通过：`FREEZE_AND_IMPLEMENT`；
- 冻结语义内实现错误：`LOCAL_CODEX_FIX`；
- 最终作品或产品质量未知：`WORK_FINAL_ACCEPTANCE`；
- 只有用户能决定的价值、费用、权限、数据或发布取舍：`USER_PRODUCT_DECISION`；
- 继续建设不值得：`STOP_AS_NOT_WORTH_BUILDING`。

每个动作必须附 target actor、阻塞问题、允许范围、停止条件和返回对象。用户无需再判断下一条 prompt 发给谁。

## 历史回放结论

Mica、CAT-TRACE、STAT5060 Validator、Delivery Assurance、Asteria、Bridge Kit、Slurm routing/protected cancellation 和 Presentations 的回放共同支持动态路由，而不支持任何单一固定流程：

- Mica 与 Bridge Kit 需要原始场景和用户消费入口的独立盲区调查；
- CAT-TRACE 与 Slurm protected cancellation 需要风险优先的数学、数值或运行探针；
- STAT5060 与 Slurm routing 证明新鲜独立审查在正确触发时能发现真实 blocker；
- Asteria 可系统消灭显性结构空洞，但不能代替事实与产品判断；
- Delivery Assurance 证明设计、实现和证据状态必须分轴；
- Presentations 证明最终作品及可被自我调松的 validator 仍需独立信任域。

这些回放支持新协议应减少串行轮数、用户协调、Codex 临时设计、implementation→architecture 返回、架构级 reset 和废弃实现，但当前没有统一前瞻数据，不能声称具体降低百分比。校准计划将记录这些指标并允许未来收紧或修改触发条件。

## 交付索引

- [固定 Planner–Critic 基线](BASELINE_PLANNER_CRITIC.md)
- [Bridge Kit 0.11.x 返修链](BRIDGE_KIT_011_FAILURE_ANALYSIS.md)
- [Slurm routing 与 protected cancellation](SLURM_ROUTING_AND_CANCEL_FAILURE_ANALYSIS.md)
- [候选协议比较](CANDIDATE_PROTOCOLS.md)
- [跨项目历史 benchmark](HISTORICAL_BENCHMARK.md)
- [敏感性分析](SENSITIVITY_ANALYSIS.md)
- [Asteria 完整性职责](ASTERIA_COMPLETENESS_ROLE.md)
- [实施就绪挑战](IMPLEMENTATION_READINESS_CHALLENGE.md)
- [动态下一执行者选择器](DYNAMIC_ROUTING_POLICY.md)
- [Architecture Freeze 与 Codex handoff](FREEZE_AND_HANDOFF.md)
- [校准计划](CALIBRATION_PLAN.md)
- [完整最终协议](FINAL_PROTOCOL.md)

## 研究边界

- `RUN_ID=pro-b`
- 写入分支：`research/architecture-production-protocol-20261027-pro-b`
- 共同原始基线：`23a1c4840f665e66f7af95ffadaadd96dc999e7f`
- 本轮只写指定 `pro-b` 分支。
- 未读取本轮 `architecture-production-protocol-20261027-pro-a` 或 `architecture-production-protocol-20261027-work` 的分支、提交、文件、PR 或中间结果。
- 历史研究分支仅作为允许的历史证据读取。

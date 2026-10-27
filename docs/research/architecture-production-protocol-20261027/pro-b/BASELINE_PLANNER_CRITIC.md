# 固定 Planner–Critic 基线：能力、真实失效方式与退出条件

## 1. 本研究采用的基线

现实中的固定流程不是抽象的“双人复核”，而是：

```text
Planner 汇总要求并给出完整设计
→ Critic 在 Planner 的包与问题框架内审查
→ Planner 按 finding 修订
→ Critic 再审
→ 形成 Goal / execution-ready package / Kickoff
→ Codex 实施
→ 实施中或实施后出现新问题时回 Planner
→ 再审、再实现
```

它的强项是真实存在的，不能因为本轮目标是替代它而抹去：

1. **责任分离。** 设计者不能仅凭自洽叙述宣布自己的设计完整。
2. **保留用户边界。** 好的 Critic 会阻止执行者扩大权限、降低标准或把未证事实写成完成。
3. **发现语义链断裂。** STAT5060 的新鲜 Critic 正确指出“每条历史要求有 owner”并不等于“要求能到达精确规则、正式入口、当前候选证据、回执和范围化 verdict”。
4. **在高影响方案中建立停顿点。** 当成本、权限、科学目标或不可逆发布边界尚未决定时，串行停顿是有价值的。
5. **对成熟冻结对象做独立验收。** Presentations 的历史表明，实现者、确定性验证器、渲染作品审查和用户接受必须分属不同信任域。

因此，本研究不取消独立判断，而是取消“每个复杂任务固定跑同一种 Planner→Critic→Planner→Critic 序列”。

## 2. 固定流程为什么会失效

### 2.1 Critic 继承了 Planner 的问题框架

Critic 通常读取 Planner 已经整理过的需求、组件和风险。如果 Planner 把整个问题定义错了，Critic 容易在同一表示里找局部缺口，而不是重新问“这个产品边界是否成立”。Bridge Kit 0.11.x 的多轮审查能修复权限、恢复、状态和交接细节，却长期没有推翻“共享 app-server、进度传输和读者机制应进入核心版本”的前提；真正的 product scope reset 出现在系统已经膨胀并实施之后。

这不是 Critic 不够严格，而是**同一问题框架中的严格审查不等于独立发现替代路线**。

### 2.2 文档完整会制造“实现机制已确定”的错觉

Goal、Execution Plan、Kickoff、验收矩阵和 PASS 都能证明某些决定被写下，但不能证明：

- 外部运行时真的按假设工作；
- 正常用户入口能取得所需证据；
- 失败时会 fail closed；
- 科学近似在关键区间仍成立；
- 陌生实施者无需补核心机制；
- 可选表面不会拖垮核心产品。

Slurm protected cancellation 的关键反例是：Hook 的匹配与声明都可成立，但 Hook 启动的冻结 Python 因动态库路径失败并退出 `127`，普通 Hook 失败又未阻断原 Bash。这个事实不是再读一遍文档能证明或否定的。

### 2.3 每轮 finding 会改变设计表面并产生新缺口

当 Critic finding 触发组件拆分、权限变化、数据流重定向或新状态机时，上一轮已经检查过的结论不再自动适用。固定流程却容易把“修完本轮 finding”当作接近终点。Slurm routing 从授权、递归时间窗、安装入口、隐私到时区/DST，反复出现的并非完全独立小错，而是每次语义扩展后新的组合边界。

### 2.4 Critic 的信息增量不稳定

真实历史中既有高价值审查，也有低价值或延迟价值：

- **高价值：** Slurm routing 第一轮指出取消重提会破坏 `JobId`、依赖和数组语义，并指出“未禁止”不能替代显式 race 授权。
- **高价值：** STAT5060 新鲜 Critic 穿透零 orphan、固定 validator 数量和两份 handoff，找到不可执行的语义链与分支/恢复缺口。
- **有限价值：** 多轮继续追补同一执行包中的摘要字段、安装入口和时间边界；这些是真问题，但更适合由冷启动实施者走查、状态/场景矩阵或预设规则检查一次暴露，而不是每个点单独串行一轮。
- **走偏风险：** Critic 把尚未要求的治理、控制面或审查层当作“更完整”，会增加系统复杂度和后续 blast radius。

Critic 的角色名本身不产生信息价值；价值来自它能否接触到不同于当前设计者的证据、场景或方法。

### 2.5 PASS 与 implementation-ready 不是同一事件

`PASS` 最多说明被审对象在给定问题、材料和证据下没有剩余阻塞。它不能自动说明：

1. 取证入口真实存在；
2. 运行时关键路径已证明；
3. handoff 中没有留给 Codex 的产品/科研决策；
4. 最终候选与被审对象相同；
5. 失败路径和恢复路径能在真实入口运行。

Bridge Kit 与 Slurm 均出现“设计通过、execution-ready、实施后返回架构层”的事实，因此未来不得把 Critic PASS 作为 Architecture Freeze 的充分条件。

## 3. 对用户真实成本的影响

固定 Planner–Critic 优化的是“每个阶段都有复核”，但用户真正关心的是：

- `S_serial`：必须等待的串行模型轮数；
- `H_user`：用户再次解释、追问、授权或协调的次数与时间；
- `T_wait`：从原目标到可实施设计的关键路径等待；
- `G_gap`：冻结后暴露的重大设计缺口；
- `D_codex`：Codex 被迫作核心设计决定的数量与严重度；
- `A_reset`：架构级重置次数；
- `W_waste`：因架构变化废弃的实施工作；
- `B_blast`：一个遗漏影响的组件、仓库、用户入口和既有实现范围；
- `F_drift`：审查偏离真实目标或产生低价值 finding 的程度。

报告数、PASS 数、execution package 数量不是成功指标。一个流程即使每轮都合规，只要 `S_serial`、`H_user`、`A_reset` 和 `W_waste` 很高，仍然不适合本用户。

## 4. 固定基线应保留的部分

本研究保留四项原则：

1. **设计权与实施权分离。** Codex 不补核心机制。
2. **重大结论可被独立挑战。** 但挑战者按信息缺口选择，不固定叫 Critic。
3. **冻结对象与证据绑定。** 后续实现必须指向同一候选。
4. **实现者不能自证最终产品质量。** 对作品、验收器和高风险运行边界保留独立验收。

取消的是：

- 固定的下一角色；
- 固定串行顺序；
- 把“再来一轮 Critic”作为默认安全动作；
- 用 PASS 替代真实外部证据和实施就绪挑战；
- 要求用户自己决定下一条 prompt 发给谁。

## 5. Critic 什么时候仍有信息价值

只有满足至少一项时，独立 Critic/第二架构师才应启动：

- 存在两条以上核心机制不同、后续很难局部切换的路线；
- 主设计者的结论强依赖其自行整理的问题框架，且原始需求/事故材料可供另一模型独立重建；
- 产品或科学取舍不是技术探针可以裁决；
- blast radius 高，错误会跨仓库、跨权限或废弃大量实现；
- 需要独立判断用户价值、产品边界、科学有效性或专业作品质量；
- 当前候选已经通过结构检查，但仍可能遗漏整个场景、共享错误前提或错误产品方向。

若未知项是“某 Hook 会不会 fail closed”“某 API/环境/格式是否真实支持”“某近似在关键区间是否成立”，下一步应是事实调查或最小实验，而不是再找一个只读 Critic。

## 6. 停止条件

不要求“Critic 再也找不到任何问题”。当以下条件同时成立，应停止架构审查：

- 已知用户能力、历史保护和边界均有架构归属；
- 关键组件能展开到内部机制；
- 关键关系有真实载荷、producer 与 consumer；
- 正常、失败、恢复路径可走通；
- 杀手级外部假设已有直接证据，或被稳定接口与 fail-closed 边界隔离；
- 验证方法包含真实证据取得方式和合法执行者；
- 陌生实施者能拆模块、状态、错误与测试，且不需选择核心机制；
- 独立调查没有未处理的高影响 finding；
- 下一次模型调用或实验改变架构结论的可能性已经很低，且其潜在收益小于关键路径延迟。

达到这些条件后继续固定 Critic，只会增加 `S_serial` 和产生新的低价值表面变化。

## 7. 结论

固定 Planner–Critic 是一个有用的**基线与按需工具**，不是未来复杂架构生产的默认控制流。它最值得保留的是独立性与冻结纪律；最需要被替换的是固定串行顺序、同框架复核和以 PASS 代替现实证据的做法。

本研究的替代协议将每次后续动作改为“购买当前最有价值的信息”：结构缺口交给架构师，场景盲区交给独立 Work，互斥路线交给第二 Pro，外部事实交给 Codex 调查，架构杀手前提交给最小探针；证据闭合后直接冻结，不再机械回到 Critic。

## 8. 主要历史依据

- Bridge Kit 0.11.x：`YuukiAS/GPT_Codex_AI_Bridge_Kit/docs/design/` 与 2026-10-12 至 2026-10-19 提交链。
- Slurm routing：`YuukiAS/AI_Skills_Collection/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_*`。
- Slurm protected cancellation：同目录 cancel/protected-partition/portable-runtime 设计及 `results/hpc--slurm-cancel-production-closure/RESULT.md`。
- STAT5060：`YuukiAS/STAT5060-TA/docs/frozen/2026-27/STAT5060_ASSESSMENT_VALIDATOR_ARCHITECTURE_V1.md` 与 `AI_Skills_Collection/results/chatgpt-web--pass-integrity/STAT5060_VALIDATOR_FRESH_CRITIC_REGRESSION_2026-10-20.md`。
- Presentations：`AI_Skills_Collection/docs/design/PRESENTATIONS_INDEPENDENT_EXECUTION_AND_REVIEW_ARCHITECTURE_2026-10-06.md`。

# Implementation-Readiness Challenge：陌生实施者冷读挑战

## 1. 目的

Architecture Freeze 前，必须证明冻结设计能被一个没有参与设计的实施者直接拆成工作，而不是证明“文档很多”或“Critic 已 PASS”。

该挑战只回答一个问题：

> **陌生 Codex 在不补产品、科研或架构决定的前提下，能否确定实现对象、状态、接口、错误、验证和完成边界？**

若答案是否，下一步必须是 `RETURN_TO_ARCHITECT`，不能让 Codex 顺便选择默认机制。

## 2. 角色与隔离

挑战者应为新鲜 Codex/实施者上下文，满足：

- 未参与当前设计；
- 只读冻结候选、原始目标、必要源码和 Asteria ledger；
- 不接收设计者 scratchpad、自我辩护或“预期你会通过”的提示；
- 不允许修改设计、代码、测试或验收标准；
- 所有结论绑定 exact branch/commit/revision；
- 输出保存在冻结目录。

它不是 Critic，也不是实施开始。它不评价产品是否值得，只检查 handoff 是否可执行。

## 3. 输入包

最小输入必须包含：

1. 原始用户目标与明确排除项；
2. 唯一推荐架构；
3. Asteria ledger / completeness report；
4. meaningful revisions 与 superseded 路线；
5. architecture-killer assumption ledger 及证据；
6. 当前源码/仓库/分支/工作树事实；
7. stable interfaces、data owner、权限边界；
8. 正常、失败、恢复路径；
9. validation 与当前候选证据取得方式；
10. 允许的局部实现自由度；
11. 禁止 Codex 决定的核心事项；
12. 用户授权与副作用边界。

缺输入本身即为 `HANDOFF_GAP`。

## 4. 挑战者必须交付的内容

### 4.1 实施分解

对每个任务说明：

- 仓库、模块、文件或符号范围；
- 负责的 capability/component/relation；
- 输入输出合同；
- 依赖的已存在接口；
- 新增/修改/保留不变的对象；
- 完成后的可观察行为；
- 测试与证据；
- 是否可与其他任务并行；
- 失败时回到谁。

### 4.2 入口与状态

必须画出或列出：

- 正常用户入口；
- 内部调用入口；
- 所有关键状态及转换；
- 幂等、重入、取消、超时和恢复；
- 候选版本/任务身份如何传递；
- 旧功能保护和迁移；
- 没有外部依赖时的行为。

### 4.3 错误与失败语义

对每个外部依赖和安全边界说明：

- failure mode；
- fail-open / fail-closed；
- error owner；
- user-visible result；
- retry/recovery；
- evidence；
- 是否局部隔离。

Slurm Hook 的 loader failure、Bridge 的 app-server 不可用、Mica 的登录 UI 无法观察、CAT-TRACE 的数值误差都必须能落到具体条目。

### 4.4 验证计划

每条重要 claim 必须有：

```text
claim
→ validation method
→ actor
→ target entry
→ exact candidate
→ expected positive control
→ expected negative/failure control
→ evidence artifact
→ consumer
```

只写“添加测试”或“运行 CI”不合格。

### 4.5 未决决定清单

挑战者必须显式区分：

- `LOCAL_IMPLEMENTATION_CHOICE`：不改变外部语义，可由 Codex决定；
- `ARCHITECTURE_DECISION_MISSING`：会改变 capability、接口、状态、权限、算法或失败语义；
- `EXTERNAL_FACT_UNKNOWN`：需 fact check/probe；
- `USER_PRODUCT_DECISION`：真正需要用户取舍；
- `NON_BLOCKING_ISSUE`：可延期且有 containment。

不得把第二类伪装成第一类。

## 5. 允许 Codex 自行决定什么

只允许在冻结语义内的局部实现选择，例如：

- 私有函数名与文件内重构；
- 等价且不改变接口/行为的成熟库调用；
- 缓存、日志格式、测试辅助工具；
- 无外部可见影响的性能细节；
- 已给出约束和验收的算法实现细节。

即使是局部选择，若涉及安全、隐私、数值稳定性或跨平台行为，也可能升级为 architecture-killer assumption，需要 probe。

## 6. 禁止 Codex 决定什么

- 新的产品能力或删除已有能力；
- 核心组件是否合并/拆分；
- 用户入口、权限、数据 owner；
- safety boundary 与 fail-open/fail-closed；
- 科学模型、估计目标、近似路线；
- 正负控制和验收标准；
- source of truth；
- 正常入口不可用时是否降级；
- 将可选 adapter 变成核心依赖；
- 为实现方便修改冻结语义；
- 用 fixture/模拟结果替代正式入口证据。

如果实现仍要求这些决定，说明设计未冻结。

## 7. 判定输出

挑战只允许四种结果：

### `IMPLEMENTATION_READY`

- 所有核心任务可拆；
- 无核心未决决定；
- 外部杀手假设已证明或隔离；
- validation 可执行；
- 局部实现自由度明确。

下一步：`FREEZE_AND_IMPLEMENT`。

### `RETURN_TO_ARCHITECT`

存在一个或多个 `ARCHITECTURE_DECISION_MISSING`，或 normal/failure/recovery 无法确定。

下一步：主架构师仅修复这些 blocker；不重做无关部分。

### `CODEX_FACT_CHECK`

设计已给出条件分支，但当前仓库/API/环境事实未知，且只读调查即可裁决。

下一步：窄事实调查；结果返回主架构师。

### `CODEX_MINIMAL_PROBE`

关键外部/运行/数值事实必须通过无害实验才能裁决。

下一步：执行批准的最小探针；不进入正式实现。

不得输出“基本 ready、可边做边看”。

## 8. 通过标准

挑战通过不是“每个文件名都提前写死”，而是：

1. 每个实施任务有明确 capability 与 owner；
2. stable interface 已冻结；
3. 状态、错误、恢复和身份语义明确；
4. 依赖真实存在或有已批准 probe 证据；
5. 测试证明的是当前候选真实能力；
6. 核心机制无临时选择；
7. 旧功能保护与迁移明确；
8. 并行边界与集成顺序明确；
9. 失败后能判断 local fix 还是 return to architect；
10. 实施者能生成 bounded task list，而不是重新写架构报告。

## 9. 各案例回放

### Bridge Kit

挑战者若无法回答 Progress 的 consumer、shared app-server 是否核心、通知配置 owner、正常入口如何回原任务，就应 `RETURN_TO_ARCHITECT` 或 `CODEX_MINIMAL_PROBE`，而不是实现 v0.6/v0.8 后再 reset。

### Slurm routing

挑战者需要展开 `JobId`、dependency、array、authorization、recurrence、timezone、DST、安装入口和回执。多个 late finding 可在一轮场景矩阵中提前出现。

### Slurm cancel

挑战者会把“Hook failure 是否阻断原 Bash”标为外部事实，不允许凭文档假设，输出 `CODEX_MINIMAL_PROBE`。

### Mica

挑战者必须指出谁在什么真实登录 UI 生成/观察回答；若无合法入口，不能把后续自动验收任务列为可实施。

### CAT-TRACE

挑战者不能选择新的积分/近似算法；看到 zero-slot truth 不足时只能要求科学架构师修订或批准 probe。

### STAT5060

挑战者会检查 exact branch/worktree/path authority、受保护 rubric/tests、恢复与 candidate-bound receipt，正对应新鲜 Critic 的 blocker。

## 10. 防止挑战者偷偷补设计

挑战 prompt 必须明确：

- 不提供“推荐默认值”；
- 不写伪代码来掩盖缺失机制；
- 不以“实现时再决定”通过；
- 不把成熟库选择当作产品路线；
- 不修改 Asteria ledger；
- 每个无法唯一拆解的点必须归类并给 next action；
- 结论只针对 exact revision。

主架构师收到结果后，只能：

- 修复 blocker；
- 发起 fact/probe；
- 或证明 finding 已被现有合同覆盖。

不因挑战发现局部措辞问题就整版重写。

## 11. 与 Critic 的差别

| Critic | Implementation-Readiness Challenge |
|---|---|
| 判断设计是否合理、完整 | 判断陌生实施者能否无设计地执行 |
| 可能提出替代路线 | 不决定路线，只暴露未决选择 |
| 可审产品/科学价值 | 只审 handoff 可执行性 |
| 容易进入广泛 finding | 输出固定分类与唯一下一动作 |
| 通常读 Planner 包 | 必须读 exact source/branch/ledger |

在路线已经唯一、结构已闭合时，readiness challenge 比再做一轮广泛 Critic 的信息价值更高。

## 12. 结论

Implementation-Readiness Challenge 是 Architecture Freeze 的必要证据之一，但不是充分证据。它证明“可以实施”，不证明“运行事实成立”或“最终作品合格”。高 blast 外部假设仍需 probe，最终产品仍需当前候选验收。

它的最大作用是把 Codex 做到一半才暴露的核心未决，提前转换为明确的 `RETURN_TO_ARCHITECT / FACT_CHECK / MINIMAL_PROBE`，并阻止执行者为方便实现静默改设计。

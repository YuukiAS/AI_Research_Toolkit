# 候选复杂架构生产方法比较

## 1. 比较目标

本研究不是选择“最严谨的流程”，而是选择在以下真实成本上最优、且可长期跨项目复用的方法：

- 更少用户介入与协调；
- 更少必须串行等待的模型轮次；
- 更少 implementation→design 回跳；
- 更少 Codex 临时产品/科研决策；
- 更少后期架构重置与作废实现；
- 在漏项发生时更小的 blast radius；
- 足够高的设计完整性与最终可解释性。

对每个候选，不用虚构“检出率 83%”之类数字；只使用已观察历史、可解释机制和宽范围敏感性判断。

## 2. 候选 A：固定 Planner–Critic

```text
Planner → Critic → Planner → Critic → implementation
```

### 优点

- 责任清楚；
- 可保留用户边界与冻结纪律；
- 对明确设计对象的权限、接口、状态和失败链有较强检查能力；
- 在 Slurm routing、STAT5060 等案例中产生过高价值 finding。

### 缺点

- 串行关键路径长；
- Critic 继承 Planner 的表示与共同前提；
- 每轮修订改变被审对象，旧 PASS 不传递；
- 不知道什么时候停止；
- 外部运行事实和科学近似仍会拖到实现后；
- 用户经常成为真正的路线裁决者；
- 容易用文档完整和 PASS 代替 normal-entry 证据。

### 历史回放

Bridge Kit 与 protected cancellation 均表明：即使多轮执行包和审查通过，仍可能发生架构级迁移。固定基线不满足本轮目标。

## 3. 候选 B：一个主设计者 + Asteria 完整性检查

```text
Lead Architect → Architecture Completeness Contract → Freeze
```

### 优点

- 快；
- 显性结构缺口可在设计者自检阶段暴露；
- 能强制 owner、机制、payload、consumer、状态、失败、恢复、source anchor 与 validation；
- 适合事实明确、路线成熟、跨组件但 blast radius 中等的任务。

### 缺点

- 无法发现整个场景被遗漏；
- 无法挑战错误产品路线；
- 无法发现共享的错误技术前提；
- 无法证明 Hook/runtime/API/科学近似真实成立；
- 结构完整的错误架构仍可通过。

### 历史回放

可提前发现 Bridge Kit 的无 owner 进度/通知链、Mica 的 evidence acquisition 空洞、STAT5060 owner→rule→entry→receipt 断链；抓不到 Slurm Hook 动态库事实和 CAT-TRACE 零槽位 Laplace 反例。

单独使用不足以替代 Planner–Critic。

## 4. 候选 C：固定两个或三个独立完整架构师

```text
Pro A || Pro B [|| Pro C] → comparison → adjudication
```

### 优点

- 降低单一问题框架锚定；
- 有机会得到真正不同的产品路线；
- 并行运行，关键路径不一定比 Planner–Critic 长；
- 对高 blast、不可逆、长期架构有价值。

### 缺点

- 多模型可能高度相关，共享同一错误前提；
- 比较与裁决本身需要成本；
- 三个完整方案容易重复劳动；
- 对可由一个 probe 裁决的事实问题，更多设计者几乎无增益；
- 若每个 L 任务固定运行三个 Pro，会变成昂贵的新仪式。

### 模型数量判断

- `N_design=1`：适合 S/M 与路线成熟的 L；
- `N_design=2`：当存在互斥高 blast 路线、科学路线或主设计强锚定时；
- `N_design=3`：通常不推荐。仅在两个完整方案结论相反、各有不同一手证据且无法用事实调查裁决时考虑；更常见的下一步应是 Work 盲区或 Codex probe。

固定多设计者也不足以成为默认协议。

## 5. 候选 D：风险优先真实验证

```text
Identify architecture-killer assumptions
→ source/API fact check
→ minimal probe
→ representative failure-path probe
→ architecture decision
```

### 优点

- 直接攻击最可能推翻架构的未知量；
- Slurm Hook、Bridge app-server、Mica 真实 UI 证据、CAT-TRACE 数值近似均高度适用；
- 小探针通常比完整实现后重做便宜；
- 能区分产品选择与外部事实。

### 缺点

- 若问题定义不完整，可能验证错误问题；
- 过早 probe 可能把实现细节当产品边界；
- 不能发现用户场景遗漏；
- 不能替代科学/产品路线判断；
- 需要严格限制副作用和探针范围。

风险优先验证是必要机制，但不能单独负责完整架构。

## 6. 候选 E：Work 独立盲区调查

```text
Raw goals + history + incidents + TODO + real use
→ independent question set / counterexamples
→ candidate architecture reconciliation
```

Work 不看候选方案，避免继承架构师的组件和术语。

### 优点

- 更适合发现整段场景、用户消费入口、历史保护和产品价值盲区；
- 可把大量历史材料、跨仓 TODO 与事故整理成架构必须回答的问题；
- 与 Asteria 的结构检查互补；
- 并行执行，不增加首轮关键路径。

### 缺点

- 若没有明确严重度和证据要求，容易产生长清单与低价值 finding；
- 不默认拥有最终架构决定权；
- 不能证明运行时事实；
- 对局部低风险任务不值得启动。

Work 适合作为 L/XL 默认的第二信息来源，而不是所有任务固定的“第三审查层”。

## 7. 候选 F：冷启动实施就绪挑战

```text
Frozen candidate → fresh implementer read-only decomposition
```

陌生 Codex/实施者只读设计，必须说明：

- 改哪些模块；
- 正常入口在哪里；
- 状态如何变化；
- 错误与恢复如何处理；
- 外部依赖是否真实存在；
- 测试如何证明完成；
- 哪些决定仍缺失。

### 优点

- 直接检查 handoff 是否真的可执行；
- 能一次暴露安装入口、状态组合、路径权威、恢复语义和测试身份；
- 比等到正式开发中途更便宜；
- STAT5060 和 Slurm routing 回放均支持。

### 缺点

- 实施者可能偷偷补设计，因此必须禁止“顺便给默认值”；
- 不能替代真实 runtime probe；
- 对错误产品方向只能报告，不负责裁决。

这是 Architecture Freeze 前的必要挑战，但不应变成完整实现。

## 8. 候选 G：证据路由式架构生产协议（唯一推荐）

最终推荐把前述机制组合成一个**动态信息购买协议**，而不是多 Agent 固定流水线：

```text
任务分级与原始材料冻结
        ↓
第一波并行：
  主架构设计 + Asteria 完整性合同
  [L/XL] Work 原始输入盲区调查
  [有杀手假设] Codex 事实调查/最小探针
  [互斥高 blast 路线] 第二独立 Pro
        ↓
主架构师吸收新证据，形成唯一候选
        ↓
冷启动 implementation-readiness challenge
        ↓
Freeze Gate
        ↓
正式 Codex 实施
        ↓
当前候选测试与必要的独立成品验收
```

该协议的关键不是把四个角色全跑一遍，而是系统每阶段根据未决问题选择下一条信息来源。

## 9. 为什么该组合优于固定 Planner–Critic

### 9.1 首轮显性缺口由设计者自己关闭

Asteria completeness 不再把 owner、payload、consumer、状态、失败和 source anchor 留给 Critic 一项项指出。Critic/Work 的注意力集中到整体场景、路线和共享前提。

### 9.2 不同类型未知量交给不同工具

| 未知量 | 最优下一步 |
|---|---|
| 架构对象/机制/接口缺失 | 主架构师继续设计 |
| 整个用户场景或历史保护可能遗漏 | Work 盲区调查 |
| 两条不可逆路线难以比较 | 第二独立 Pro |
| API、运行时、仓库、平台事实 | Codex fact check |
| 假设错误会大面积推翻 | Codex minimal probe |
| handoff 仍可能要求临时设计 | implementation-readiness challenge |
| 只是冻结语义内实现 bug | local Codex fix |
| 最终作品/产品质量 | Work/专业验收 |

### 9.3 并行优先，减少关键路径

首轮可并行的工作不再人为串行：主设计、Work 盲区、事实调查和必要的第二设计同时开始。必须串行的只剩：新证据后的最终裁决、Freeze 后正式实施、当前候选验收。

### 9.4 允许直接停止

若结构完整、关键假设有证据、Work 无高影响未处理 finding、实施者无需发明核心机制，下一步直接 `FREEZE_AND_IMPLEMENT`。流程不要求“再找一个 Critic 才安心”。

## 10. 与成熟方法的关系

本协议不是凭空发明，吸收了成熟方法中与本任务相符的部分，但没有照搬重型流程：

- **SEI ATAM**：以质量属性场景、风险、敏感点和 tradeoff point 分析架构，而非只审文档；本协议把它缩为高风险路线和场景的按需审查。SEI 还报告架构评估风险中 omission 风险多于 commission 风险，支持独立盲区调查。来源：
  - https://www.sei.cmu.edu/library/atam-method-for-architecture-evaluation/
  - https://www.sei.cmu.edu/library/architecture-tradeoff-analysis-method-collection/
  - https://sei.cmu.edu/library/risk-themes-discovered-through-architecture-evaluations/
- **NASA Systems Engineering Handbook**：要求需求验证矩阵、验证/确认方式、责任、非正常场景、工程原型/试验件和阶段性 V&V；本协议据此区分结构闭合、真实验证与最终接受。来源：
  - https://www.nasa.gov/reference/system-engineering-handbook-appendix/
  - https://www.nasa.gov/reference/6-0-crosscutting-technical-management/
- **NASA Decision Analysis**：只有当不确定性可能改变备选排序时，降低不确定性才有决策价值；复杂度应与问题匹配，并记录假设、限制与稳健性。本协议的下一步选择器直接采用这个原则。来源：
  - https://www.nasa.gov/reference/6-8-decision-analysis/
- **Architecture Decision Records / Structurizr**：保留短小决策、状态和 supersession 历史；本协议要求 meaningful revision 与 reason，但不把每个 Git commit 升级为架构版本。来源：
  - https://martinfowler.com/bliki/ArchitectureDecisionRecord.html
  - https://docs.structurizr.com/ui/decisions/

这些成熟方法支持“场景、风险、验证、决策历史和不确定性驱动”，不支持固定地把所有角色每次都运行一遍。

## 11. 唯一推荐及默认配置

### 默认复杂任务（L）

首轮默认启动 **两个模型来源**：

1. 一个主架构师；
2. 一个 Work 盲区调查者。

同时，如果存在架构杀手外部/运行/数值前提，增加一个**窄 Codex fact check 或 minimal probe**。它不是第三个设计者。

### 增加第二 Pro 的条件

满足任一项：

- 两条核心机制互斥且切换代价高；
- 科学/产品路线无法由事实调查裁决；
- blast radius 跨仓库、权限或长期数据合同；
- 主设计明显受历史路线锚定；
- 用户将投入数月开发或高成本资源。

### 减少模型的条件

- S：局部、可逆、无新接口，直接 Chat/Codex；
- M：路线成熟、外部事实已知，一个主设计 + Asteria 即可；
- 已存在成熟 frozen contract 且变化只在实现内部，直接 Codex + 当前候选测试；
- 下一次调用不能合理改变架构决定或避免高成本返工，停止。

## 12. 推荐稳定性

普通追问不会改变本推荐。以下新证据才可能改变：

- 在同等人工时间和关键路径成本下，固定 Planner–Critic 的历史/前瞻 benchmark 明显更少 `G_gap`、`A_reset` 和 `W_waste`；
- Work 盲区长期产生大量低影响 finding，不能通过严重度与证据门槛校准；
- 第二 Pro 在触发场景中几乎从不改变路线；
- Asteria 完整性维护成本持续大于其减少的显性遗漏；
- 最小探针经常过早固定错误实现细节，反而增加返工；
- Bridge Kit/Slurm 的盲测显示新协议同样无法在 Freeze 前暴露决定性问题；
- 某一项目类别无法表达 architecture-killer assumption 或冷启动 handoff。

在这些证据出现前，唯一推荐保持为“动态证据路由”，而不是回到固定 Planner–Critic 或固定多模型竞赛。

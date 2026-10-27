# 最终协议：证据路由式架构生产协议

## 1. 唯一推荐

未来复杂任务不再默认使用固定 Planner–Critic。推荐采用：

> **证据路由式架构生产协议**
>
> 主架构师形成唯一候选并维护 Asteria 完整性合同；系统同时从独立场景、真实事实、最小实验或第二条完整路线中，选择当前最可能改变决定或避免昂贵返工的信息；陌生实施者证明 handoff 可执行后才 Freeze；随后 Codex 只实施冻结设计。

该协议保留独立判断、风险审查与最终验收，但取消固定角色轮班和无止境的 Planner→Critic 循环。

## 2. 最重要的改变

固定 Planner–Critic 问的是：

> 下一轮按流程该由谁审？

新协议问的是：

> 当前哪一个未知量最可能推翻架构、迫使 Codex 临时设计，或导致后期高 blast 返工？获取它的最低成本证据是什么？

因此：

- 显性结构空洞由主架构师 + Asteria 自己关闭；
- 整段用户场景与历史盲区交给 Work；
- 互斥高代价路线交给第二 Pro；
- 源码/API/环境事实交给 Codex fact check；
- 架构杀手前提交给 Codex minimal probe；
- handoff 交给陌生实施者冷读；
- 冻结语义内 bug 留在同一 Codex 修；
- 最终作品质量交给独立专业验收；
- 没有高价值问题时直接停止并实施。

## 3. 固定角色边界

### Chat / GPT 主架构师

拥有：

- 产品目标与范围；
- 用户能力和历史保护；
- 架构、组件、接口、状态与失败语义；
- 科研模型、算法路线与取舍；
- 证据解释与最终架构裁决；
- Architecture Freeze；
- 证据否定核心前提后的返修。

不得把核心决定留给 Codex。

### 第二独立 Pro

只在高 blast 互斥路线触发。必须从同一原始输入独立设计，不先读主候选。它不是固定 Critic，也不默认拥有最终决定权。

### GPT Work

适合：

- 原始需求/历史事故/真实使用场景盲区；
- 反例与共同前提；
- 黑箱产品/作品验收；
- 复杂证据核查；
- 跨仓历史 benchmark。

Work 不默认设计第三套完整协议，也不替主架构师作最终取舍。

### Codex

只负责：

- 当前源码、仓库、接口、环境事实调查；
- 无害、范围化的最小实验；
- 冷启动实施分解；
- 实施冻结设计；
- 测试与报告当前实现事实。

Codex 禁止：

- 决定产品范围、核心机制或科学算法；
- 补架构空白；
- 静默降级；
- 改验收标准以通过；
- 为实现方便把可选 adapter 变成核心；
- 用 fixture、文件存在或测试数量代替真实能力。

## 4. 协议的七个阶段

## 阶段 0：原始任务冻结与分级

主架构师先形成最小、准确的原始任务包：

- 用户目标、目标读者/使用者；
- 重大取舍与明确排除项；
- 已有材料、源码、历史事故和当前事实源；
- 允许的权限、数据、费用和副作用；
- 已接受能力与不变项；
- 任务档位 S/M/L/XL。

这一步不要求用户填表。AI 从已有材料整理，只有真正产品偏好无法推断时才请求一次用户决定。

### 档位

- **S：局部低风险。** 单模块、可逆、无新接口/权限/科学路线。
- **M：跨组件但路线清楚。** 技术成熟、外部事实已知、返工中等。
- **L：长期复杂。** 跨组件/仓库、历史事故多、返工昂贵。
- **XL：高不可逆。** 安全/权限 enforcement、复杂 runtime、重大科研算法、高成本或互斥路线。

## 阶段 1：第一波并行取证

### S

- 0–1 个设计者；
- 直接复用 frozen contract；
- 无默认 Work/第二 Pro/probe。

### M

- 一个主架构师；
- Asteria completeness；
- 仅在事实未知时加窄 fact check。

### L（默认复杂任务）

首轮默认 **两个模型来源**：

1. 主架构师；
2. Work 原始输入盲区调查。

若存在架构杀手前提，同时并行 1 个或多个窄 Codex fact/probe。它们不是完整架构师。

### XL

- 主架构师；
- Work 盲区；
- 至少一个针对 high-blast assumption 的事实/探针；
- 存在互斥高代价路线时增加第二独立 Pro。

第三个完整 Pro 不是默认。两个方案一致但共享未证假设时，下一步是 probe，不是第三套方案。

## 阶段 2：主架构与 Asteria 完整性合同

主架构师输出唯一候选，同时维护：

```text
Capability
→ Component owner
→ Input / source
→ Mechanism
→ Interface / permission
→ State
→ Failure / recovery
→ Validation
→ Evidence actor / route
→ Consumer
```

并从组件正向追踪：

```text
Output / payload
→ Consumer
→ downstream capability
→ failure effect
→ containment boundary
```

每个 accepted component、relation、evidence、revision 和 high-blast assumption 必须满足 `ASTERIA_COMPLETENESS_ROLE.md`。

这一步替代早期 Critic 对显性空洞的重复查找。

## 阶段 3：证据吸收与唯一架构裁决

主架构师只吸收有证据、能改变架构或降低重大风险的 finding：

- Work finding 必须有原始证据、真实场景、影响、类别和最低成本下一动作；
- 第二 Pro 用于比较核心路线，不做行级审稿；
- Codex fact/probe 报告事实与限制，不作产品选择；
- 低影响问题进入 local issue，不阻止 Freeze；
- 新需求与原设计遗漏分开；
- 一次 revision 必须声明变化原因、影响和不变项。

形成一个唯一候选，不把多个方案并列交给用户自行架构裁决。只有真正价值取舍才调用 `USER_PRODUCT_DECISION`。

## 阶段 4：Implementation-Readiness Challenge

fresh Codex/implementer 只读候选，必须给出：

- 模块与任务分解；
- 正常入口；
- 状态、错误与恢复；
- stable interfaces 与依赖；
- 当前候选验证；
- 并行与集成顺序；
- 未决问题分类。

只允许：

- `IMPLEMENTATION_READY`；
- `RETURN_TO_ARCHITECT`；
- `CODEX_FACT_CHECK`；
- `CODEX_MINIMAL_PROBE`。

禁止“基本 ready，实施时再决定”。

## 阶段 5：Architecture Freeze

必须同时满足：

1. capability/历史保护闭合；
2. component mechanism 与 relation payload/consumer 闭合；
3. normal/failure/recovery 闭合；
4. architecture-killer assumption 已证明或 fail-closed 隔离；
5. validation 有 actor、入口、正负/故障控、当前候选证据与 consumer；
6. Work/独立调查没有未处理高影响 finding；
7. readiness = `IMPLEMENTATION_READY`；
8. blast containment 与 stable interface 成立；
9. 下一次审查预期信息价值低。

文档完整、Critic PASS、Asteria schema PASS、execution plan、Goal、Kickoff 中任何一个单独都不构成 Freeze。

## 阶段 6：Codex 正式实施

Codex 收到 exact revision/commit 的 frozen Goal，严格按范围实施。

实施中：

- 冻结语义内 bug → `LOCAL_CODEX_FIX`；
- 局部 adapter 机制变化且接口不变 → `LOCAL_REVISION`；
- high-blast premise false / 核心接口、authority、算法变化 → `RETURN_TO_ARCHITECT`；
- 新需求 → 单独记录，不静默扩项；
- 外部副作用超授权 → `USER_PRODUCT_DECISION`。

同一范围的代码 bug 留在当前 Codex 修，不再机械回 Planner–Critic。

## 阶段 7：当前候选验收与交付

按消费对象验证：

- 软件看正式入口、真实 UI/行为、旧功能保护和故障路径；
- 科研算法看真值、数值稳定性、理论、模拟与复现；
- Validator 看正控、负控、故障控、候选绑定和不可自调松；
- 文档/PPT 看真实渲染与读者质量；
- Plugin 看安装、触发、普通调用与最终产物；
- HPC/Server 看目标环境、站点规则、恢复与 fail-closed。

需要独立信任域时，执行者只能报告 `READY_FOR_INDEPENDENT_VALIDATION`，由 Work/专业 reviewer 作最终验收。

## 5. Architecture-killer assumption

满足以下任一条件即标为杀手假设：

- 为假会改变多个核心组件；
- 会使安全/权限边界 fail open；
- 会否定科学方法或数值路线；
- 会使正常用户入口不可用；
- 会废弃大量实施；
- 会迫使从核心内置改为 adapter/反之；
- 无法通过局部修复吸收。

取证优先级：

```text
已有一手源码/官方文档
→ 当前仓库/API 只读事实调查
→ 无害最小 probe
→ representative failure-path probe
→ 最小端到端实验
```

只验证与架构决定有关的 claim，不把 probe 扩张成产品实现。

## 6. Blast containment 合同

协议不仅降低遗漏概率，也降低遗漏损失。Freeze 前必须证明：

- 单一主要 owner；
- stable interface；
- data/source of truth owner；
- 可替换 external adapter；
- 受控跨组件依赖；
- optional surface fail-soft；
- 核心 safety/science path fail-closed；
- capability-specific gate；
- local revision boundary；
- revision 的 preserved invariants。

Bridge Kit 回放表明，Progress/display/reader/shared app-server 若是 adapter，后期事实不会迫使核心 persistent-run 重做；Slurm 回放表明，portable runtime 若是明确 adapter，动态库失败可局部修复，而不是重新设计确认产品。

## 7. 下一执行者选择器

每阶段必须输出一个动作：

| 当前最高风险 | 唯一 next action |
|---|---|
| 核心结构/机制缺失 | `CONTINUE_ARCHITECTURE` / `RETURN_TO_ARCHITECT` |
| 整体场景/历史盲区未独立检查 | `WORK_BLINDSPOT_AUDIT` |
| 互斥高 blast 路线 | `SECOND_INDEPENDENT_DESIGN` |
| 只读事实未知 | `CODEX_FACT_CHECK` |
| 需实验的 high-blast 前提 | `CODEX_MINIMAL_PROBE` |
| 结构已闭合但 handoff 未证明 | `IMPLEMENTATION_READINESS_CHALLENGE` |
| Freeze Gate 全通过 | `FREEZE_AND_IMPLEMENT` |
| 冻结语义内实现错误 | `LOCAL_CODEX_FIX` |
| 最终作品/产品质量未知 | `WORK_FINAL_ACCEPTANCE` |
| 真正价值/授权取舍 | `USER_PRODUCT_DECISION` |
| 不值得继续建设 | `STOP_AS_NOT_WORTH_BUILDING` |

输出必须明确 target actor、blocking question、allowed scope、stop condition 和 return target。

## 8. 信息价值规则

下一次调用的概念价值：

\[
\operatorname{NIV}(a)
= P_a(\text{改变正确决定或避免重大返工})\,L_a
- C_a - \lambda T_a.
\]

不估不存在的精确 \(P_a\)。使用低/中/高 blast、独立信息来源和宽范围敏感性：

- 若事实可能改变备选排序，优先降低该不确定性；
- 若两个设计一致但共享未证 runtime，probe 价值高；
- 若路线唯一、结构完整、事实已证，继续审查价值低；
- 若用户场景和历史繁多，Work 价值高；
- 若路线互斥且后期切换昂贵，第二 Pro 价值高；
- 若 finding 只改措辞或重复 schema，停止。

## 9. 参数化默认值

### 默认 L 任务

```text
N_design = 1
N_review = 0 fixed; Work blindspot = 1
N_probe = number of unresolved high-blast assumptions
S_serial = 2 major gates before implementation
  (evidence synthesis → readiness/freeze)
P_parallel = 2–4 in first wave
```

`N_review=0 fixed` 不代表没有独立性；Work、第二 Pro、readiness 和最终 acceptance 均可提供独立信息，但按需触发。

### XL 路线竞争

```text
N_design = 2
Work = 1
N_probe >= 1 when external/scientific killer assumption exists
```

### S/M

按风险降低，不固定额外模型。

## 10. 预测与成功指标

相对固定 Planner–Critic，协议明确预测：

- `S_serial` 降低；
- `H_user` 降低；
- `G_gap` 在 Freeze 后减少；
- `D_codex` 减少；
- `A_reset` 减少；
- `W_waste` 减少；
- Work finding 更聚焦真实场景和共同盲点；
- 第一轮显性结构 gap 更多由 Asteria/设计者自己发现；
- late revision 更局部；
- execution-ready 后 scope reset 更少。

这些通过 `CALIBRATION_PLAN.md` 前瞻记录，当前不声称具体百分比。

## 11. Bridge Kit / Slurm 回放

### Bridge Kit

新协议会在第一波并行：

- 主设计形成 capability/owner/consumer；
- Work 独立问用户实际如何获得进度、为何每仓配置通知、是否又建设平台；
- 第二 Pro 比较统一控制面与薄核心+adapter；
- app-server/normal-entry 用最小 probe；
- readiness challenge 阻止 Codex补 Progress/reader 产品语义。

它不能保证一次没有任何修订，但有充分理由把 v0.6/v0.8 后的 product reset 提前到实现前。

### Slurm routing

- 第二/独立设计早期处理 `JobId`、race authorization；
- Asteria 强制 permission、payload、state；
- cold handoff 一次展开安装、时间窗、时区、DST、隐私；
- 实施局部 bug 留在 Codex。

### Slurm protected cancellation

- authority/confirmation/enforcement/runtime/failure semantics 同时入账；
- Hook runtime 作为 high-blast assumption；
- 首次 Freeze 前运行 `scancel --help` 与 loader/fault injection；
- failure 不阻断 Bash 则直接 `RETURN_TO_ARCHITECT`；
- portable runtime 作为 adapter，降低后期 blast。

因此历史回放支持该协议能明显减少“PASS→实施→架构推翻”的链条。

## 12. 停止条件

系统在以下条件下必须停止设计：

- 所有必需 capability 映射到机制与验证；
- high-blast assumption 已证明/隔离；
- 独立盲区无未处理 blocker；
- readiness 通过；
- 剩余 issue 局部且不要求 Codex设计；
- 下一调用不太可能改变架构；
- 继续审查的关键路径成本高于预期避免损失。

不要求 Critic 永远找不到任何问题，也不因普通追问重开架构。

## 13. 推荐稳定性

以下证据才会使本推荐改变：

- 同等人工时间和关键路径下，固定 Planner–Critic 前瞻表现明显更好；
- Work 独立盲区长期没有独有高影响 finding；
- 触发条件内第二 Pro 仍不改变路线；
- probes 经常锁定错误实现细节或不减少返工；
- Asteria 成本持续大于收益；
- readiness challenge 仍不能减少 Codex 核心决定；
- 某类项目无法适配；
- Bridge/Slurm 严格盲测显示决定性问题仍只能在正式实现后发现。

普通合理追问只应定位协议内已有规则，不构成再次发明流程的理由。

## 14. 最终判断

固定 Planner–Critic 不应继续作为未来复杂任务的默认工作流。它保留为动态 selector 的一种独立审查动作，而不再控制所有任务的顺序。

默认复杂任务启动两个模型来源，而不是两个完整架构师：主架构师 + Work 盲区。第二 Pro 只在互斥高 blast 路线触发；Codex probe 只验证会推翻架构的事实；Asteria 负责结构完整与冻结账本；readiness challenge 保证 Codex 不做设计；Freeze 后正式实施。

这套协议以更多并行 AI 计算换取更少用户时间、串行等待和开发后返工，同时通过信息价值和停止条件避免把所有角色固定跑一遍。

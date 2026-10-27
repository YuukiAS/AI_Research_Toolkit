# Architecture Freeze 与 Codex Handoff

## 1. Freeze 的定义

Architecture Freeze 不是“设计文档写完”，也不是“Critic PASS”。它是一个有证据的状态：

> 对当前明确范围，核心产品/科研机制、接口、状态、权限、失败与恢复已经决定；会大面积推翻设计的外部前提已经被直接证明或隔离；陌生实施者无需补核心决定；后续发现的问题预期可以在冻结边界内局部修复。

Freeze 必须绑定 exact revision、branch/commit、Asteria ledger、assumption evidence 和 readiness result。

## 2. 六类证据分别能证明什么

| 证据 | 能证明 | 不能证明 |
|---|---|---|
| 文档完整 | 决定已被表达；可阅读 | 路线正确、外部事实成立、实施者无需猜 |
| Critic/独立审查 PASS | 给定材料与问题框架下无阻塞 finding | 未遗漏整场景；共同前提正确；runtime 可行 |
| Asteria completeness | owner、机制、关系、payload、consumer、状态、anchor、revision 结构闭合 | 产品价值、科学正确性、外部事实 |
| implementation handoff dry-run | 陌生实施者可拆任务，无核心未决 | 代码会正确；运行时事实成立；成品质量 |
| real technical probe | 特定 runtime/API/数值假设在目标范围成立或失败 | 其他未测场景；整体产品值得 |
| representative failure-path probe | 关键失败语义、fail-closed、恢复或误差边界成立 | 全系统所有失败；最终作品体验 |

真正 Freeze 至少需要前四类；存在 high-blast external assumption 时还需要后两类中的相应证据。

## 3. Freeze Gate

### Gate A：目标与能力闭合

- 原始用户目标、重大取舍和明确排除项有唯一版本；
- 所有必需 capability 有 owner；
- 历史保护、已接受不变项与 superseded 要求有状态；
- 新需求与原始遗漏分开；
- 没有未授权扩张。

### Gate B：机制与关系闭合

- accepted component 有内部机制；
- relation 有真实 payload、producer、consumer、authority 与 failure semantics；
- 正常、失败、恢复路径能完整走通；
- 数据 owner、状态 owner、source of truth 明确；
- stable interface 与依赖方向明确；
- 可选 adapter 不拥有核心真相。

### Gate C：风险与现实闭合

- architecture-killer assumptions 全部为 `PROVEN_FOR_TARGET_ENTRY` 或 `ISOLATED_FAIL_CLOSED`；
- 真实接口、运行时、权限和科学前提有一手证据；
- probe 包含必要的代表性失败路径；
- 证据绑定 exact target entry 和 candidate；
- 未证明的低风险项有 containment 与明确后续。

### Gate D：验证闭合

- 每个重要 claim 有验证方法、actor、入口、正控、负控/故障控、证据与 consumer；
- 当前候选 identity 可追踪；
- 旧 fixture/旧截图不能替当前候选；
- 最终成品的专业验收者与实施者分离（需要时）；
- validator/acceptance standard 不能在同一候选任务中被调松。

### Gate E：实施就绪

- fresh implementer challenge = `IMPLEMENTATION_READY`；
- task decomposition、并行边界与集成顺序明确；
- 无核心 `ARCHITECTURE_DECISION_MISSING`；
- local implementation freedom 有边界；
- 回滚/迁移/兼容与恢复明确；
- Codex 不需重新定义验收。

### Gate F：信息价值与停止

- Work/独立调查没有未处理高影响 finding；
- 两条互斥高 blast 路线已比较或被证据裁决；
- 下一次泛化审查不太可能改变结论；
- 剩余 issue 不阻止目标能力且 blast 有限；
- 架构师给出唯一 next action。

六个 Gate 全部通过才可 `FREEZE_AND_IMPLEMENT`。

## 4. 假 Freeze 的典型标志

出现任一项必须拒绝：

- “execution-ready” 但 normal entry 未定位；
- Goal/Kickoff 存在但 Codex 仍要选核心机制；
- Critic PASS 但 high-blast runtime assumption 没 probe；
- coverage 100% 但 evidence acquisition actor/route 缺失；
- component 都有名字但无内部机制；
- relation 写“调用/同步/通知”，无 payload 或 consumer；
- `implemented` 只是有文件，`validated` 只是测试数；
- failure path 写“报错/重试”，没有 fail-open/closed、owner 与恢复；
- 可选 UI/reader/notifier 与核心状态耦合；
- validator、fixture、候选由同一执行者一起改；
- probe 只跑 happy path；
- 当前候选与审查/测试对象不一致；
- open issue 需要 Codex 做产品或科学决定。

Bridge Kit 与 Slurm 的历史表明，Goal、Kickoff、PASS 和 acceptance 文件可以同时存在而 Freeze 仍不成立。

## 5. 冻结包结构

建议冻结包至少包含：

```text
00_SCOPE_AND_DECISIONS.md
01_FINAL_ARCHITECTURE.md
02_ASTERIA_LEDGER.{json|yaml}
03_COMPLETENESS_REPORT.md
04_ASSUMPTION_AND_PROBE_EVIDENCE.md
05_FAILURE_RECOVERY_SCENARIOS.md
06_VALIDATION_CONTRACT.md
07_IMPLEMENTATION_READINESS_RESULT.md
08_CODEX_EXECUTION_GOAL.md
09_REVISION_AND_SUPERSESSION.md
10_NEXT_ACTION.json
```

小任务可以合并，但语义不可省。

## 6. Codex execution Goal 必须冻结什么

### 身份

- repository；
- branch/worktree；
- base/frozen commit；
- architecture revision；
- allowed write scope；
- source of truth。

### 目标与不变项

- 必须新增的真实能力；
- 旧功能保护；
- 明确不做；
- 不得降级的正常入口；
- data/permission/security boundaries。

### 实施任务

- 模块/接口/状态/迁移；
- 可并行任务；
- 集成顺序；
- local implementation freedom；
- 禁止 Codex 决定的事项。

### 验证

- 正控、负控、故障控；
- current-candidate identity；
- normal-entry 与失败路径；
- 真实作品/环境/科学结果；
- acceptance aggregator；
- 独立验收何时触发。

### 返回规则

- 冻结语义内 bug → `LOCAL_CODEX_FIX`；
- 外部事实未知 → `CODEX_FACT_CHECK/PROBE`；
- 核心 premise false 或需改接口/authority/algorithm → `RETURN_TO_ARCHITECT`；
- 真正新需求 → 保存、分类，不静默实现；
- 费用/权限/数据/发布副作用超出授权 → `USER_PRODUCT_DECISION`。

## 7. Codex 不能做的事

冻结包必须显式禁止：

- 为方便实现改变产品路线；
- 删除难做能力或用弱替代；
- 在没有证据时选择算法；
- 把 fixture/模拟/结构文件当能力；
- 修改 validator/threshold 以通过；
- 把可选 adapter 变成核心服务；
- 创建用户未要求的控制面、数据库或长期运行器；
- 遇到核心缺口后继续实现；
- 用新的执行包覆盖 revision 历史；
- 把实现 bug升级为整版架构返修；
- 用代码量/测试数声明产品完成。

## 8. 实施中的变更分类

### `LOCAL_CODEX_FIX`

条件：

- 外部可见语义不变；
- stable interface 不变；
- authority/data owner 不变；
- scientific method 不变；
- validation standard 不变。

修复后重跑相关当前候选验证，不需回架构师。

### `LOCAL_REVISION`

条件：

- 仅一个 adapter/component 内部机制变化；
- capability 与接口不变；
- blast 被边界限制；
- 需要架构师记录 revision，但不重开全局竞争。

### `RETURN_TO_ARCHITECT`

条件：

- 核心 interface/state/authority/data owner 变化；
- product capability 增删；
- safety/failure semantics 变化；
- scientific model/algorithm/estimand 变化；
- high-blast assumption 被证伪；
- 多个组件/仓库需重构。

旧 Freeze 仅对受影响 scope 失效；其他锁保持。

### `NEW_REQUIREMENT`

不并入当前实现，除非主架构师判断可局部吸收且用户授权。否则进入下一 revision。

## 9. Blast containment 作为 Freeze 条件

架构必须主动降低漏项后的损失：

- 清晰 ownership；
- 有限组件职责；
- stable interface；
- 可替换 external adapter；
- 单一 data/source owner；
- 受控依赖方向；
- capability-specific gate；
- failure containment；
- optional surface fail-soft；
- revision 明确 preserved invariants。

若一个可选 UI、reader、notifier 或 runtime failure 会迫使核心任务身份/恢复/科学模型重做，架构尚未满足 Freeze。

## 10. 实施后最终验收

Architecture Freeze 不等于产品完成。实施后必须按消费对象验收：

- 软件：正式入口、真实 UI/交互、回归与故障；
- 统计/科研：方法、数值、真值、校准、复现；
- 文档/PPT：真实渲染、可读性、内容保真、历史锁；
- Plugin：触发、安装、普通调用、实际产物；
- Server/HPC：目标环境、站点规则、恢复与 fail-closed。

实现者只能报告事实和 `READY_FOR_INDEPENDENT_VALIDATION`；需要独立信任域的任务由 Work/专业 reviewer 最终验收。

## 11. 停止条件

冻结后不因为普通追问重新设计。只有下列证据使 Freeze 失效：

- 当前候选与冻结设计不一致；
- high-blast premise 被真实证据否定；
- 用户新增/改变核心目标；
- 外部平台变化使 stable interface 不成立；
- implementation-readiness 被证明为假；
- 独立最终验收发现的是架构级而非实现级问题。

措辞、局部 bug、性能调优和非阻塞 issue 不自动重开全局架构。

## 12. 结论

真正 Freeze 是“结构闭合、现实前提有证据、陌生实施者无需设计、晚期问题有局部吸收边界”的联合状态。它由多种证据共同支撑，不能被任何单一 PASS 替代。

一旦满足，系统直接生成唯一 Codex Goal 并实施；不再为了仪式追加 Critic。若不满足，选择器给出精确的 `RETURN_TO_ARCHITECT / FACT_CHECK / MINIMAL_PROBE`，而不是把不确定性留给 Codex 或用户。

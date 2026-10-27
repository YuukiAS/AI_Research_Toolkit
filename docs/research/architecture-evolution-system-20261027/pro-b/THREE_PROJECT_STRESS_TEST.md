# 三个真实项目压力测试

## 1. 测试目的

压力测试不是为三个项目各做一套网站，而是验证同一组对象、状态、修订和锚点能否自然表达三种不同成熟度：

- Delivery Assurance：设计多、实现少；
- Mica：已有真实浏览器扩展与恢复机制；
- CAT-TRACE：模型、数值算法、软件和多轮撤销并存。

原型只录入少量代表组件，但所有内容使用同一个模型和阅读器。

---

## 2. Delivery Assurance：诚实的设计态

### 2.1 当前系统层

代表性组件：

- 需求与能力合同；
- 交付切片与风险边界；
- 实现工作包；
- 正常入口验证；
- 证据与独立审查；
- 恢复与返修闭环。

关系说明真实控制对象，例如“冻结的能力与失败判据”“允许实施的工作包”“真实入口产物与运行证据”，而不是抽象的“协作”。

### 2.2 机制层

以“交付切片与风险边界”为例，可展开：

1. 从用户能力识别必须同时成立的路径；
2. 拆出可独立验收的切片；
3. 标记不可降级边界和外部副作用；
4. 为每个切片指定正常入口与失败证据；
5. 将未闭合机制保留为 blocker；
6. 形成 Codex 可实施包。

这里可以完整表达设计，而无需虚构某个 `delivery-core` package。

### 2.3 实现层

当前代表组件设置为：

```text
design = accepted
implementation = none 或 partial
evidence = checked
```

实现面板显示“没有生产 source anchor”，并链接到当前设计文档、研究提交和开放假设。检查器不会把 `none` 当错误；只有当组件错误声称 `linked` 才阻断。

### 2.4 修订差异

两个示例修订可表达职责变化：早期把验收当作开发后的一道终检；当前修订将正常入口、失败恢复和证据生产前移到每个交付切片。差异显示受影响组件和关系，不宣称正式系统已实现。

### 2.5 结论

账本对设计态成立，因为“架构完整”与“已有代码”不再绑定。它既允许架构先行，也禁止用预期包名填补不存在的实现。

---

## 3. Mica：从系统到真实 TypeScript

固定快照：`YuukiAS/Mica-for-ChatGPT@7059c0dc24b908b57bd0e1f475142ba4f4520621`。

### 3.1 系统层

原型选择四个代表组件：

1. ChatGPT DOM：外部页面、turn 和 composer；
2. 长线程扫描：观察 DOM 变化并维护窗口；
3. Stale composer 恢复：处理完整清空后旧内容重新出现；
4. 连接器连续性：在 connector 生命周期中短暂维护视觉连续性。

关键关系：

- DOM 变化 → 长线程扫描；
- composer 生命周期 → stale composer 恢复；
- connector latch / surface 变化 → 连接器连续性；
- 恢复状态约束连接器 shell，避免两个恢复机制冲突。

### 3.2 ChatGPT DOM 与长线程扫描

实现锚点：

- `extension/src/content.ts`
- `TURN_SELECTOR`
- `ROLE_SELECTOR`
- `COMPOSER_SELECTOR`
- `SPECIAL_SELECTOR`
- `MutationObserver` 与初始化路径

这证明实现层不只定位文件，还可定位 selector、设置键和观察器。selector 是行为合同的一部分，因为 ChatGPT DOM 变化会直接影响扫描和保护范围。

### 3.3 Stale composer 恢复机制

文件：`extension/src/reliability/stale-composer-recovery.ts`。

机制可以自然呈现为有限状态机：

```text
完整清空意图
→ pending confirmation
→ WAITING_FOR_REMOUNT
→ SETTLING
→ RECOVERING
→ VERIFYING
→ FINAL_CLEAR_STABLE 或 EXHAUSTED
```

真实锚点：

- `beginPendingFullClear`：确认可靠的完整清空意图；
- `confirmPendingClear`：确认目标 composer 已清空；
- `armGuard`：建立有硬上限的 guard；
- `tickGuard`：检测 remount 和旧载荷指纹；
- `attemptRecovery`：最多三次执行原生内容删除；
- `verifyRecovery`：验证清空并进入下一阶段；
- `markAttemptsExhausted`：失败时结束，不无限重试。

关键常量如 `GUARD_DURATION_MS`、`HARD_GUARD_CAP_MS`、`MAX_ATTEMPTS` 也可作为配置锚点。机制面板因此能解释为什么它不是“监听到变化就清空”的简单脚本。

### 3.4 连接器连续性机制

文件：`extension/src/reliability/connector-continuity.ts`。

真实锚点：

- `SURFACE_SELECTOR`
- `CONNECTOR_PILL_SELECTOR`
- `beginLifecycle`
- `startObserver`
- `handleMutations`
- `refreshSnapshot`
- `showShell`
- `continuitySkipReason`

机制说明：收到共享 connector lifecycle latch 后，在有限窗口内观察 composer；缓存经过清理的视觉 clone；真实 composer 暂时缺失且没有真实发送或 stale-clear 恢复冲突时，显示不可交互的短命 shell；composer 返回或硬上限到达后清理。

这类机制最适合 sequence + 状态/不变量组合，而不是六个固定说明字段。

### 3.5 测试锚点

`scripts/run-e2e.mjs` 和相关 fixture/test 用于证明真实入口行为。账本应区分：

- 源码存在；
- 状态机分支被测试；
- 浏览器真实路径通过；
- 当前 ChatGPT 生产页面长期可靠。

前三者可以由仓库证据支持，第四项仍需持续真实 UI 验证，不因有端到端脚本而自动升级。

### 3.6 结论

Mica 证明账本可以从系统层一路到 selector、函数、状态和测试，同时保留代码的 source of truth。实现细节按组件责任组织，而不是把文件树伪装成架构。

---

## 4. CAT-TRACE：数学、实现和撤销共同演进

固定快照：`YuukiAS/CAT-TRACE@0d829fb17c458a076a15ec51893e917960107c21`。

### 4.1 C01 数值原语

系统责任：为 probit 尾部、Newton 梯度和曲率提供稳定基础。

机制层可展示三段等价数值表达：

1. `t >= -1`：直接 gap；
2. `-10 < t < -1`：使用 `expm1` 减少消减误差；
3. `t <= -10`：Mills 渐近展开与 Neumaier 补偿求和。

实现锚点：

- `package/TRACE/src/ct_math.cpp`
- `ct_probit_tail_terms`
- `package/TRACE/tests/testthat/test-math-stability.R`
- 高精度 oracle / 结果文件

当前三轴可以是 `accepted / linked / validated`，但 validated 只覆盖冻结数值域和 oracle 条件。

### 4.2 C04 独立参考引擎

责任：以与 Laplace 不同的 Albert–Chib MCMC 路线，在小规模 finite-p 问题上提供参考后验。

机制层展示固定 sweep：

```text
截断正态抽 Z
→ 每列联合 Gaussian block
→ 共享参数 block
→ slice 更新正尺度与 share logits
→ 保存 draw 与 diagnostics
```

实现锚点：

- `package/TRACE/R/cat-trace-reference.R`
- `ref_ct_fit`
- `ref_ct_run_segment`
- `results/c04-ref--z-collapsed-composition-repair/result.md`

证据必须保留边界：它是 small finite-p reference engine；Rhat、ESS、MCSE 未通过时不能给生产近似“盖章”。

### 4.3 匿名零槽位的重大撤销

原设计：对全零列使用普通 local Laplace，再以一个零列积分乘重数压缩。

触发证据：Critic 的确定性反例显示局部模式附近似然几乎为 1，但真正约束尾部规模的是离模式较远的 discovery tail mass；单列小误差乘大量零槽位后可积累成重大 log error。

修订：

- 撤销普通 zero-column local Laplace 作为正式积分器；
- 保留有限截断模型和重数记账；
- 候选方向改为 discovery complement
  \[
  A_g=E[1-L_{0g}],\qquad \log I_{0g}=\log(1-A_g),
  \]
  并直接控制 \(n_{0g}|\Delta\log I_{0g}|\)；
- 具体确定性求积、误差估计、梯度兼容和成本仍未冻结。

三轴：`open / none / checked`。影响：阻断 C03、C05、C06、C10；不阻断 C01、synthetic C02 和独立 C04。原型的差异面板完整展示旧路线、触发证据、当前决定、影响和无实现状态。

### 4.4 结论

CAT-TRACE 证明账本不是软件文件导航器。公式、数值近似、反例、撤销、代码、测试和 blocker 可以在同一模型下连接；“尚无唯一算法”也能成为明确、可检查的架构事实。

---

## 5. 同一模型的通过条件

三个项目均使用：`Project / Revision / Component / Relation / Mechanism / Anchor / Decision / Evidence / Issue`，以及同一组三轴状态。差异只在 mechanism renderer 和 anchor 类型：

- Delivery Assurance：关系图 + 设计机制 + 文档证据；
- Mica：DOM/event/state + selector/function/test；
- CAT-TRACE：算法步骤 + 公式 + routine/oracle/result。

无需为每个项目硬编码一套网站。若正式实现需要项目适配，适配器只负责抽取领域锚点和选择展示器，不改变核心语义。

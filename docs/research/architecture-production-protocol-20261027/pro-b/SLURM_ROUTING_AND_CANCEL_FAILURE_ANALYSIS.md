# Slurm routing 与 protected cancellation：架构边界为什么反复移动

## 1. 核心结论

两条 Slurm 历史证明了两件看似相反、实际互补的事实：

- **独立架构审查确实能早期发现高价值风险。** routing 首轮 Critic 抓到了取消重提破坏 `JobId`/依赖/数组语义，以及站点 race 授权从“未禁止”被错误推断为“允许”。
- **文档审查无法替代真实 enforcement-boundary probe。** protected cancellation 的决定性问题不是又一个未写清字段，而是 Hook 启动的 Python 在真实 app-server 环境因动态库失败，Hook failure 又没有阻断原 Bash。

因此，新协议必须同时保留“独立路线/风险审查”和“真实运行边界探针”，并自动判断下一步是哪一种。

## 2. Slurm routing refactor 的演进

### 2.1 原始设计

早期 proposal 试图把通用 Slurm 选择逻辑、站点硬策略和用户偏好分层，并优先 native multi-partition，避免不必要的重复提交。方向合理，但在身份敏感任务和站点权限上仍有关键空白。

### 2.2 第一轮 Critic 的真实信息增量

第一轮审查指出：

1. 对已提交任务执行 cancel + resubmit 会改变 `JobId`，破坏依赖、数组、外部观察者和审计链；
2. “站点没有明确禁止 race”不能推出“用户已获显式授权使用 race”；
3. 身份敏感任务需要 fail closed，而不是静默换路径。

这些 finding 直接改变了核心机制，属于高价值 `DESIGN_GAP`，不是吹毛求疵。

### 2.3 v0.2 至 v0.6

后续设计逐步加入：

- 身份敏感时的 fail-closed；
- target-site probe；
- durable authorization；
- 开源可移植的站点发现；
- 对版本与能力类别的准确识别；
- execution package 与结果边界。

其中部分是原设计遗漏，部分是用户后续澄清的可移植性要求。不能把每一轮都算作同一种失败。

### 2.4 实现前/终审继续出现的四轮问题

实施候选又暴露：

- enrollment digest 没覆盖完整授权语义；
- capacity reconciliation 只处理第一个匹配窗口；
- G6 persistent path 没进入安装后的正常入口；
- 受跟踪身份可能泄漏；
- family timezone 没进入 digest；
- recurrence 计算没有使用声明的时区；
- DST fold/gap 没 fail closed。

这些都是真问题，但它们的共同结构是：**架构语义在场景组合、时间边界、安装路径和回执身份上没有被一次性展开。**

| 问题 | 类型 | 是否改变核心 routing 路线 | 更适合的提前机制 |
|---|---|---:|---|
| cancel/resubmit 破坏身份 | `DESIGN_GAP` | 是 | 独立 Critic / 第二架构师 |
| race 授权不明确 | `DESIGN_GAP` | 是 | 权限与站点情境审查 |
| 可移植站点发现 | `NEW_REQUIREMENT` + 设计扩展 | 部分 | 用户范围决定 + 设计 |
| 摘要漏字段、入口漏接 | `EVIDENCE_GAP`/`IMPLEMENTATION_GAP` | 否 | Asteria completeness + cold handoff |
| recurrence/timezone/DST | `DESIGN_GAP` at boundary | 否/局部 | 场景矩阵 + 反例测试 |
| 隐私与身份泄漏 | `DESIGN_GAP`/实现缺陷 | 局部 | 数据 owner/最小披露合同 |

固定 Critic 的问题不是这些 finding 没价值，而是它们被串行拆成多轮。一个陌生实施者在不写代码的前提下，用“安装后入口、每种状态转换、时区异常、重复窗口、隐私字段、恢复”矩阵冷读，理应一次暴露其中相当部分。

## 3. Protected cancellation 的机制迁移

### 3.1 从技能提醒到真实阻断边界

最初已经认识到：Skill 文本、提示词或普通 `PreToolUse` 规则不能构成强保护。随后机制依次探索：

```text
人工终端确认
→ 安全入口 / PATH 或 wrapper 思路
→ fresh confirmation adapter
→ Chat 原生确认
→ project-local Hook
→ trusted Hook 直接执行
→ user-level global Hook
→ portable runtime qualification + fail-closed supervisor
```

最终 v3 明确禁止早期路径：

- `scancel` wrapper；
- PATH interception；
- project-local Hook；
- terminal confirmation；
- next-shell token；
- Direct mode；
- 让 Codex 自己 patch 保护机制。

这不是同一架构的实现微调，而是 enforcement authority、信任域和失败语义多次迁移。

### 3.2 各阶段暴露了什么

| 阶段 | 当时试图解决 | 后来暴露的根本问题 | 分类 |
|---|---|---|---|
| Skill/提示词层 | 防止模型直接取消受保护任务 | 文本约束不能阻止真实命令 | `ARCHITECTURE_ERROR` |
| wrapper/PATH/安全入口 | 在 shell 层拦截 | 同 UID 可绕过；PATH 不是可信边界；兼容性与透明性差 | `ARCHITECTURE_ERROR` |
| 人工终端 fresh confirmation | 取得真人确认 | 用户要求在当前 Chat 内完成；终端不是期望产品入口 | `PRODUCT_MISMATCH` |
| Chat confirmation v2 | 用 `request_user_input` 获取当前会话确认 | headless/功能可用性与 human-origin 信号不稳定 | `EXTERNAL_FACT` + `DESIGN_GAP` |
| project-local Hook | 绑定项目配置 | 项目可改写权威，不是全局可信边界 | `ARCHITECTURE_ERROR` |
| trusted/global Hook | 由 host-side Hook 执行精确命令 | Hook 进程失败语义、运行时动态库、会话快照仍未证明 | `EVIDENCE_GAP` |
| portable runtime v3 | 固定可移植解释器与 fail-closed supervisor | 需要真实故障注入、fresh-session 和正式入口验证 | 正确收敛方向 |

## 4. 晚期真实运行事实

后期日志证明：

- 嵌套 Bash 的 `PreToolUse` 已经触发；
- matcher 与 Hook dispatch 不是根因；
- Hook 启动的冻结 Python 依赖 `libpython3.12.so.1.0`，在 app-server loader path 中不可用；
- 子进程退出 `127`；
- Codex `0.160.1` 对普通 Hook process failure 没有按期望阻断原 Bash；
- 因而保护逻辑失败时，原操作可能继续。

这是一个典型的 architecture-killer external assumption：

> “可信 Hook 能在目标运行时稳定启动，并且 Hook 本身失败等价于拒绝原操作。”

如果该假设为假，整个保护边界失效。它不应等到完整实现后才被发现。

## 5. 第一次冻结 Hook 架构前应该做什么

一个小型、无副作用 probe 足够验证关键链：

1. 在真实 app-server / Codex 正常入口加载候选 Hook；
2. 用 `scancel --help` 或伪造命令触发匹配，绝不提交真实取消；
3. 记录 Hook 解释器、动态库、环境变量与退出语义；
4. 故意让 Hook 解释器不存在、缺动态库、超时或输出非法结果；
5. 验证每种故障下原 Bash 启动次数严格为零；
6. 重启 fresh session，验证全局 Hook 与版本快照真实生效；
7. 验证允许路径、拒绝路径、用户取消路径和无 UI/headless 路径。

该 probe 的目的不是实现完整 protected cancellation，而是回答“这条 enforcement boundary 是否存在”。若失败，应在任何 Goal/Kickoff 前返回架构师。

## 6. 哪些 loop 有真实信息增量

### 高信息增量

- routing 第一轮独立 Critic：改变身份与授权机制；
- 用户明确“确认必须在当前 Chat”后的产品边界修订；
- `request_user_input`/Hook 可用性调查；
- 真实 Hook runtime 与故障注入；
- global vs project-local authority 的信任边界判断；
- v3 便携运行时和 fail-closed supervisor 设计。

### 中等信息增量，可合并

- 安装入口、摘要字段、回执、时区与 DST；
- recurrence、多窗口与隐私组合；
- portable runtime 的路径/版本清单。

它们应该由一次 implementation-readiness challenge + 场景矩阵合并发现，而不是每项单独发起 Planner–Critic 周期。

### 低信息或重复劳动

- 在 enforcement boundary 未证明前继续精修 Hook 文档字段；
- 在 wrapper/PATH 路线已被信任模型否定后继续补 wrapper 兼容细节；
- 用更多 Critic 讨论“Hook 应否 fail closed”，却不运行失败探针；
- 反复写 execution-ready 标签，而正常入口仍未实际加载候选。

## 7. retrospective benchmark

选择两个后见时点：

### 时点 R：routing v0.1 proposal

当时已有信息足以让：

- 独立 Critic 发现 `JobId`/依赖/数组与授权风险；事实证明它确实发现了；
- Asteria gate 发现 race 关系缺 permission/source anchor，取消重提缺 downstream consumer；
- Codex probe 验证站点能力，但不能决定授权语义；
- Work 盲区可从真实 Slurm 场景提出安装入口、身份、时间窗口等问题。

最佳下一步是 `SECOND_INDEPENDENT_DESIGN` 或高风险 Critic，而不是实现。

### 时点 C：首次准备冻结 Hook 方案

当时已有信息足以知道 Hook 是唯一 enforcement boundary，但没有证据证明其运行时与失败语义。此时：

- 第三个 Pro 很可能重复讨论信任模型；
- Asteria 能标出 external assumption 未验证；
- Work 能指出 fail-open 风险，但不能证明真实环境；
- **Codex minimal probe 的信息价值最高。**

最佳下一步是 `CODEX_MINIMAL_PROBE`，不是再审文档。

该回放是 retrospective analysis；后续应把当时 snapshot 封存后做真正盲测。

## 8. Asteria 能抓到什么，抓不到什么

### 可抓到

- protected action、Hook、Bash、用户确认之间的 payload 和 authority；
- project-local/global Hook 的 owner；
- fail-open/fail-closed 状态；
- Hook failure 的 consumer 与恢复；
- runtime/loader 作为 external dependency；
- “validated” 是否有真实 normal-entry/fault-injection evidence；
- routing 的 `JobId`、dependency、array、authorization 下游关系；
- 时区和 recurrence 是否进入真实机制。

### 抓不到

- wrapper/PATH 与 Hook 哪条产品路线更符合用户体验；
- 用户究竟要 Chat 内确认还是终端确认；
- 科学/安全取舍的最终价值；
- 所有模型共同假设“Hook failure 会阻断”是否真实；
- 未被任何人列出的第三方平台行为。

因此 Asteria 是 completeness contract，不是事实生成器或产品裁决者。

## 9. 如何降低返工 blast radius

1. **策略与执行分离。** 保护决策核心返回精确 allow/deny/needs-confirmation；执行 adapter 只负责当前宿主。
2. **宿主 adapter 可替换。** Chat UI、global Hook、headless 路线分别适配，不共享隐式状态。
3. **安全默认在最靠近副作用的可信边界。** 上层 UI 失败不能自动放行。
4. **运行时自包含或资格化。** interpreter、loader、依赖和版本都属于接口合同。
5. **故障语义一等化。** timeout、exit 127、invalid output、stale session、Hook absence 都有明确状态。
6. **无害代表性探针先于全功能实现。** 先证明阻断边界，再做挑战码、回执和 UX。
7. **routing 的身份与授权不被 adapter 改写。** 站点策略、任务身份和调度能力各有 owner。

若采用这些边界，晚期发现 Python 动态库问题只需替换/修复 runtime adapter，不必重新设计整套确认产品。

## 10. 对最终协议的直接要求

Slurm 回放要求协议包含：

- 先标出 blast radius 最大的事实假设；
- 未经真实 probe 的 enforcement boundary 不得 Freeze；
- probe 必须包含代表性失败路径，而非只跑 happy path；
- 一个独立模型适合查权限、场景和产品路线，不能替代运行事实；
- routing 这类多状态机制必须在 handoff 前经过场景/状态矩阵；
- 实施后若只是冻结语义内的代码错误，走 `LOCAL_CODEX_FIX`，不得自动重开架构；
- 若证据否定核心信任边界，走 `RETURN_TO_ARCHITECT`；
- 系统自动给出下一执行者，不让用户在 wrapper、Hook、Critic、Codex 之间自行判断。

## 11. 回答：为什么边界会在 wrapper、PATH、adapter、Hook、global Hook 和 runtime qualification 之间移动

因为早期方案主要从“怎样拦住命令”出发，逐步才把四个不同问题分开：

1. **谁拥有安全决定权；**
2. **谁能证明当前确认来自真人；**
3. **哪一层真正能阻断副作用；**
4. **该层在目标运行时失败时会发生什么。**

每次只解决其中一项，下一项便推翻前一条路线。正确做法是在首次架构中同时冻结 authority、human confirmation、enforcement、runtime/failure semantics，并用最小真实探针验证最后两项。这样才能避免“文档 PASS 后才发现保护边界其实从未成立”。

# Asteria 与 Mica 的固定来源和执行范围

这份记录保存本轮候选实际使用的来源，不将仓库计划、合成样例或历史作者观察升级为本轮已实现、已验证的能力。两个来源仓库仅用于读取；结束检查时两者工作区均无修改。

## 固定版本

| 来源 | 提交 | 实际状态 |
|---|---|---|
| Asteria `main` | `60ba27a38324980beea78d4c07b7b28abda522cf` | README、package 与当前入口标为 `2.0.0-rc.19` |
| Mica `main` | `7059c0dc24b908b57bd0e1f475142ba4f4520621` | 当前可加载运行代码仍为 `0.1.7` |
| Mica 0.1.6 代码 | `9f56ea8d23a0895ddbb3f1e95ee207bd049b62c0` | 存在普通交互触发连续显示快照与 60 毫秒轮询的路径 |
| Mica 0.1.7 代码 | `aa4ce52581fff2e207d1f93600becbb3018b0efc` | 上述提交的直接下一提交，移除普通输入路径的重复重型工作 |

0.1.6 与 0.1.7 的版本依据是各提交的 `scripts/release-config.mjs`，不是虚构的版本标签。两者的机制变化已通过 Git 源码比较核对。[查看完整比较](https://github.com/YuukiAS/Mica-for-ChatGPT/compare/9f56ea8d23a0895ddbb3f1e95ee207bd049b62c0...aa4ce52581fff2e207d1f93600becbb3018b0efc)。

### README 所限定的事实

Asteria README 的短摘录为：“Current app version: `2.0.0-rc.19`.” 同一文件明确将仓库桥接限定为格式、校验器及合成固定提交样例；实时 GitHub 导入、调用图分析与科学真值更新尚未包含。它也没有宣布正式 2.0 稳定版验收完成。[固定 README](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/README.md#L5-L20)。

Mica README 明确区分本地合成 fixture 与真实设备验收：合成页面能够检查其自身渲染隔离、安全退回、消息接口和包结构，但不足以证明当前真实 ChatGPT 长对话的性能收益。目标设备上的性能问题仍需要对应环境的实测。本轮沿用这个证据边界。[固定 README](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/README.md#L90-L114)。

Asteria 的 ROADMAP 仍标 rc.17；VERSIONING 的详细版本链主要写到 rc.9；TODO 主体保留 2026-09-15 的长期方案。研究以固定源码交叉核对功能，不按未更新的勾选状态判断完成度。

## 当前模型的重要实现事实

| 能力 | 核对结果 | 固定来源 |
|---|---|---|
| 语义根结构 | 实体、符号、类型化关系、变体和视图已有独立字典；`StatisticalEntity.layer` 仍是必填科研层级 | [types.ts](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/src/architecture/types.ts) |
| 局部上下游追踪 | `traceForEntity` 已有真实图遍历，支持方向、递归与深度限制 | [trace.ts](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/src/architecture/trace.ts) |
| 语义比较 | `diffOriginalTraceToCatTrace` 未使用两个输入参数，返回预写比较内容 | [semanticDiff.ts](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/src/architecture/semanticDiff.ts) |
| 实现绑定 | 已有实体、角色、路径、函数、固定提交与定位状态；当前数据是合成样例，校验仍要求至少一项绑定 | [repositoryBridge.ts](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/src/architecture/repositoryBridge.ts) |
| 证据状态 | 样例按支持边和缺口边计数；不足以证明当前对象已经通过对应验证 | [multiViewTraceProject.ts](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/src/architecture/fixtures/multiViewTraceProject.ts#L214-L225) |
| 数据读取 | 现有解析器主要做根结构检查；视图会话仍切换不同样例对象 | [schema.ts](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/src/architecture/schema.ts)、[session.tsx](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/src/architecture/session.tsx) |

本轮实际查看了 rc.19 归档的浅色架构页和深色证据页。观察支持保留语义分层、公式与局部追踪，并减少同屏重复说明。这里是固定归档截图的视觉检查，没有把它写成正式站点的实时黑箱验收。两张来源分别为 [Architecture](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/results/asteria--rc19-layout-first-graph-convergence/screenshots/final/architecture-cat-overview-1366-light-trace-off.png) 和 [Evidence](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/results/asteria--rc19-layout-first-graph-convergence/screenshots/final/evidence-1536-dark.png)。

## Mica 的真实下钻范围

四个机制已经核对到源码、具体函数和选择器：对话轮次及输入框识别、长对话扫描、连接器连续显示、明确清空后的旧草稿恢复。机器可读事实包含节点、步骤、载荷、实际消费函数、固定提交链接、行号和限量源码片段，见 [asteria-mica-facts.json](asteria-mica-facts.json)。读取清单与文件摘要见 [asteria-mica-read-inventory.json](asteria-mica-read-inventory.json)。

这些事实中特别保留两个限制。长对话扫描处理当前挂载的 DOM 轮次，不等于完整逻辑对话；旧草稿恢复的历史手工观察中，最终输入框保持为空且恢复尝试为零，不能当作已经执行了所有主动恢复分支。对应来源见 [content.ts](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/content.ts#L722-L872) 与 [历史观察](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/investigations/2026-09-07-stale-composer-clear-recovery.md)。

当前系统八条关系的消费者已经逐项回到固定源码核对。曾使用但实际不存在的 `getMessageTurnElements` 与 `confirmEmptyAfterIntent` 已分别更正为 `collectConversationTurns` 与 `confirmPendingClear`。最终名称、用途及核对范围见 [mica-relation-consumer-audit.md](mica-relation-consumer-audit.md)；结构字段非空本身不能证明消费点真实。

### 0.1.6 → 0.1.7 的局部历史复核

这段历史是本轮根据固定源码重构的阅读材料，不是原作者当时冻结的架构包。三个函数的前后绑定已逐段核对，记录包括提交、路径、行号和片段摘要：`publicLatch`、`attachListeners`、`beginLifecycle`，见 [mica-historical-anchors.json](mica-historical-anchors.json)。未重建的其他绑定不据此判断新增或未变；当前系统的源码入口不能直接复制作旧版入口。

| 机制细节 | 0.1.6 | 0.1.7 |
|---|---|---|
| 普通交互到快照 | 六类事件先由 `handlePotentialMentionEvent` 消费；确认共享连接器状态、mention 标记或选择动作后，才进入 `beginLifecycle` 同步克隆；60 ms 轮询 | 移除六类直接监听，由已有共享事件触发短期观察与合帧刷新；取消固定轮询 |
| 普通事件的识别入口 | `handlePotentialConnectorSignal` 直接调用 `detectSignal` | 新增 `isPotentialConnectorEvent` 预过滤；普通输入提早返回 |
| 观察窗口 | `WATCH_WINDOW_MS = 3200` | `WATCH_WINDOW_MS = 4200` |
| 发送状态阻止创建外观层 | `active && userTurnCommittedLatched` | `active || sendCandidateActive || userTurnCommittedLatched` |
| 清空恢复阻止创建外观层 | 已启用，且 armed / guardActive / tombstoneActive，或处于未稳定结束的已确认清空阶段 | 同一谓词保留 |

上述细节直接来自旧版 [continuity 的事件入口](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/9f56ea8d23a0895ddbb3f1e95ee207bd049b62c0/extension/src/reliability/connector-continuity.ts#L56-L170)、[跳过条件](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/9f56ea8d23a0895ddbb3f1e95ee207bd049b62c0/extension/src/reliability/connector-continuity.ts#L313-L333)、[signal 入口](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/9f56ea8d23a0895ddbb3f1e95ee207bd049b62c0/extension/src/reliability/connector-lifecycle-signal.ts#L75-L80)，以及新版 [continuity](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/aa4ce52581fff2e207d1f93600becbb3018b0efc/extension/src/reliability/connector-continuity.ts)、[signal 过滤](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/aa4ce52581fff2e207d1f93600becbb3018b0efc/extension/src/reliability/connector-lifecycle-signal.ts#L380-L390)。

可以保留的三项约束是：外观层保持 `inert`、`aria-hidden`、`pointer-events:none`；关闭功能时清理外观层、监听和相应调度；创建外观层前检查矩形、克隆与 2500 ms 快照新鲜度。共享生命周期事件也已经存在于旧版。发送或清空恢复的跳过分支仅阻止随后创建外观层，不能推导“已有外观层立即消失”；原生输入框返回时移除外观层，关闭、导航和超时另有清理路径。这项限制同时适用于两个版本，不能因为函数名含 `Skip` 就扩大行为承诺。

## 本轮实际执行的输入路径检查

使用 Mica 原有 `scripts/run-e2e.mjs --case=typing-hotpath`，加载仓库的本地合成页面和现有 dist，未改源文件、fixture、断言或构建产物。运行环境为 Linux 6.18.55 x86_64、Node v24.22.1、Playwright 1.62.1、Google Chrome for Testing 131.0.6778.204，视口为 900×820。没有打开真实登录态 ChatGPT。

执行命令在 Mica 工作目录运行：

```sh
NODE_PATH="$CODEX_PRIMARY_RUNTIME_NODE_MODULES" \
  node --require ../playwright-config.cjs \
  scripts/run-e2e.mjs --case=typing-hotpath
```

初次运行遇到沙箱禁止本地监听，以及默认 Playwright 浏览器二进制不存在。后续执行只开放本地测试服务器，并用外部预载文件选择环境里已有的浏览器；没有下载替代测试代码。适配文件完整保存在 [mica-playwright-browser-adapter.cjs](mica-playwright-browser-adapter.cjs)，供核对它仅修改了浏览器路径选择。此文件引用本轮机器路径，复现者应选择自己的 Chromium 路径。

13 项原有检查全部通过，原始结果为 [mica-typing-hotpath.json](mica-typing-hotpath.json)。

| 输入情形 | DOM 克隆增量 | 计算样式增量 | 全页查询增量 | 本次总耗时 |
|---|---:|---:|---:|---:|
| 20 字 | 0 | 0 | 0 | 2.3 ms |
| 200 字 | 0 | 0 | 0 | 6.3 ms |
| 输入法组合事件 | 0 | 0 | 0 | 0.8 ms |

连续显示轮询未启动，发送恢复守护未启动，页面错误为空。零增量是测量窗口内的结果；初始化阶段的计数并不为零。耗时来自单次合成检查，只用于这次 smoke 的观察，不作为硬件性能基准或真实设备收益。

运行时加载的两个相关 dist 与源文件逐字节一致：

| 模块 | SHA-256 |
|---|---|
| `connector-continuity` | `0b4f28516bb81e400f2dbf619702ce09e519b5cd7ebc4709d05edf46fb5f7ec8` |
| `connector-lifecycle-signal` | `ff6c70e364bd8b3cae95f3b4f1d9bbd9f15e9ff19ea9be706372263166059655` |

这项证据覆盖普通输入和输入法事件的热路径机械性质。它没有验收 Mica 全部功能、当前真实 ChatGPT DOM、连接器交互的全部分支，或目标 MacBook Neo 的长对话收益。最终 Asteria 候选应把这些限制连同结果一起显示在证据详情中。

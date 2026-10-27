# Mica 当前八条关系的消费者复核

固定源码：`YuukiAS/Mica-for-ChatGPT@7059c0dc24b908b57bd0e1f475142ba4f4520621`。复核直接读取该提交的 `extension/src`，没有把原型文字当作源码事实。目录的 `git rev-parse HEAD` 与此 SHA 一致。

浏览器补充检查最初用 `confirmEmptyAfterIntent` 搜索时没有结果。随后对原仓库核读，确认这不只是搜索索引范围问题：这个名字在固定版本中不存在。继续检查八条当前关系，又发现 `getMessageTurnElements` 不存在。两处已修正关系事实并补真实锚点。下表记录最终使用的消费者，保留纠正原因以说明为什么结构检查还需要源码核对。

| 当前关系 | 最终消费者 | 固定源码核对 | 处理记录 |
|---|---|---|---|
| 安全消息轮次 | `scanAndApply` | `content.ts:739–842`，其中 766 行调用 `collectConversationTurns()`；得到去重排序的轮次后再次检查整组安全性 | 保留；`m-scan` 与 `m-turns` 对应生产和消费位置 |
| 共享连接器事件 | `handleSharedConnectorLifecycle` | `connector-lifecycle-signal.ts:334–336` 发送 `publicLatch()`；`connector-continuity.ts:71,87–91` 注册并读取同一事件的 `detail` | 保留；事件名确为 `mica-connector-lifecycle-latched` |
| 恢复互斥 | `continuitySkipReason → isStaleClearRecoveryActive` | `connector-continuity.ts:336–356` 读取 `MicaStaleComposerRecovery.getState()`，检查 enabled、armed、guardActive、tombstoneActive、phase 及确认状态 | 保留；这是实际读取状态的约束关系 |
| 已挂载结构 | `collectConversationTurns` | `content.ts:844–872`；先前的 `getMessageTurnElements` 在全部 `extension/src` 中不存在 | 已改为真实函数，使用 `m-turns` / `m-selectors`；输入保护细节仍由选择器和相关保护函数解释 |
| 选择动作 | `isPotentialConnectorEvent` | `connector-lifecycle-signal.ts:380–390`；75–80 行实际调用，普通输入不触发完整识别，特殊候选事件继续 `detectSignal` | 保留；候选过滤函数真实存在 |
| 清空与重挂载 | `confirmPendingClear` | `stale-composer-recovery.ts:224–251`；确认对象匹配、存在且长度为零后调用 `armGuard`；先前的 `confirmEmptyAfterIntent` 不存在 | 已改为真实函数；关联 `m-stale-intent` 与 `m-stale-confirm` |
| 局部渲染约束 | 浏览器渲染层 | `content.ts:1041–1050` 的 `applyOptimization` 添加 `mica-turn-optimized`；1856–1867 行注入 `content-visibility: auto` 等样式 | 保留消费者的运行边界描述；它是浏览器样式处理，不是一个伪造函数 |
| 短期只读外观 | `showShell` 创建的只读外观层 | `connector-continuity.ts:249–272` 设置 `aria-hidden`、`inert` 和 `pointerEvents: none`，添加消毒后的克隆 | 已使用实际创建函数和外观层边界，关联 `m-shell` / `m-skip` |

固定来源：[content.ts](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/content.ts)、[connector-lifecycle-signal.ts](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/connector-lifecycle-signal.ts)、[connector-continuity.ts](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/connector-continuity.ts)、[stale-composer-recovery.ts](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/stale-composer-recovery.ts)。

## 对完整性检查的影响

关系中有非空 `consumer` 字符串，不足以证明消费者真实存在。声称连接到运行软件的函数名，应有固定版本的可解析符号或代码位置，且该位置确实消费对应载荷。外部运行边界可以用浏览器等真实主体表示；纯设计关系则保留设计身份。此处暴露的是结构完整与事实正确之间的差别，不能把结构检查的绿色结果扩大为源码一致性结论。

## 历史范围与行为限制

八条当前关系的核对不代表已经重建八条 0.1.6 关系。旧版没有 `isPotentialConnectorEvent`；其入口是 `handlePotentialConnectorSignal → detectSignal`。旧的输入事件到连续显示路径由 `handlePotentialMentionEvent(event)` 消费，连接器上下文检查通过后再调用 `beginLifecycle`，不能写成每次事件无条件复制 DOM。历史实现只提供 [三对已核函数绑定](mica-historical-anchors.json)，其余旧关系源码不拿当前提交补齐。

此外，`continuitySkipReason` 的发送与清空恢复条件阻止新建外观层，不保证已显示的外观层立即消失。观察窗口从 3200 ms 调到 4200 ms，发送互斥谓词也有变化；完整前后条件及仍成立的三项约束见 [SOURCE_FACTS.md](SOURCE_FACTS.md)。这些是源码行为的修正说明，不是新增运行验收。

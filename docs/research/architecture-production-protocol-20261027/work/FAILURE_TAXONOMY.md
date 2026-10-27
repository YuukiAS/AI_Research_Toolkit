# 返修归因与证据等级

每个事件可以有多个原因；不把最后一个触发点当唯一根因。[BENCHMARK_DATA.json](BENCHMARK_DATA.json) 的 observation 是仓库可见事实，classification 是本研究根据事实作出的解释，两者分别标记。

| 标签 | 判据 | 本样本 | 易误判之处 |
| --- | --- | --- | --- |
| DESIGN_GAP | 当时已有目标/约束却缺核心机制、owner、状态、边界或输入 | Bridge normal-entry、STAT literal edges | 新文档出现不代表需求当时不存在 |
| NEW_REQUIREMENT | 可定位用户新要求/改变原批准范围 | routing v0.2 后资源/周期需求；MCP transport 明确替换 | 不因后来要求合理，就倒推 Planner 早应知道 |
| EXTERNAL_FACT | 源码/接口/运行/数学事实改变可行性判断 | reader 隔离不支持、loader failure、QoS、解析 integral | 很多事实本可早查；“外部”不等于不可避免 |
| IMPLEMENTATION_BUG | 冻结行为已明确，代码未实现或偏离 | managed marker 字节、timezone 未用、question schema | 不因通过 Planner 转交就升级为架构错误 |
| REVIEW_DRIFT | finding 的目标/处方越出需求，或无依据扩大合格标准 | STAT 手工重复表处方被驳回 | 核心 finding 可有效、指定修法却不合理；按子项计 |
| SCOPE_RESET | 旧总体 authority/组件划分被明确撤销或重置 | Bridge product reset；cancel 产品范围收窄 | 标注其触发是新需求、设计耦合还是未知事实 |
| EVIDENCE_GAP | 声称的就绪/验证缺适当版本、入口、失效路径或独立证据 | trusted Hook 不等于当前 session 执行、oracle 自证 | 可与设计或实现缺口并存 |
| OTHER | 发布绑定、元数据、一致性、合法豁免等 | v0.7 摘要、stage metadata、显式 live-retain waiver | 不能统称“无价值” |

## 架构错误、审查遗漏和事实的分开记录

“架构错误”不是把所有 DESIGN_GAP 都重命名。若核心授权在同 UID 可伪造状态上成立，或 required isolation 实际不受支持，机制必须改变，才构成强架构错误证据。若只是 helper 少入口，也是设计遗漏，但可能局部补足。

“Critic 遗漏”至少要求：相同目标/问题在其审查时已可见、审查范围确实覆盖它、随后才发现。Bridge 原 TODO 的正常入口与原范围恢复具有这种支持；Hook runtime 的确切 loader failure 需要实验，不能断言 Critic 光读文字一定能发现。报告使用“未在审查前闭合现实证据”比推测模型思维更准确。

“只有真正独立 Critic 才能发现”在本样本没有可证实实例。存在独立 Critic 找到的有效问题，不存在排除其他机制也能找到它的实验。数据中的 independent_review 均描述价值类型，不宣称唯一性。

## 数值与事实等级

- OBSERVED：精确 Git 内容、提交/补丁、仓库保存的运行输出或审查记录。后者是“仓库报告的运行事实”，不是本轮重现。
- INFERRED：原因归类、反事实可检出性、下界、影响范围解释。需保留引用。
- ASSUMED：以后 benchmark 的预算档位、severity 权重、候选动作成本；本轮没有用任意概率替历史定论。
- UNKNOWN：缺失的调用量、用户消息全量、人工分钟、等待、废弃代码比例、盲测检出率。

不把 narrative 强度转换成数字置信度。UNKNOWN 留 null/文字，不填零。

## 三种阶段不得混计

1. 设计内部修订：版本/机制改变，但未有该范围实施。
2. 实施返修：已有实现，按原冻结语义修 bug。
3. implementation→design：实现或运行暴露核心语义/边界需重新决定。

另外分别记录 I_impl（实施准入）、A_reset（总体架构重置）和 W_waste（真正失去效用的实施工作）。没有证据时，变更行数只能是暴露规模，不能当 waste。

## 用户责任与授权

用户明确产品范围、资源、风险与验收豁免属于合法 HUMAN_ONLY 决策；人工转发 review、提醒正常入口、重复说明已承诺能力属于可能可减少的协调。原始聊天缺失时不估算每次耗时。

相同“USER”字段因此不意味着所有介入都应消除。bench 的目标是减少不必要协调，不是取消真实产品权。


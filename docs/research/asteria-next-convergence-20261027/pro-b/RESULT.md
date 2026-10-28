# 结果

## 核心判断

Asteria Next 应继续叫 **Asteria**，并继续使用 Asteria 2.0 的规范语义图。它的产品边界从“统计模型架构地图”扩大为“复杂项目的架构工作台”，但不改变唯一语义底座：用户可以从当前系统整体进入组件和关系，再进入机制、真实实现、验证证据、有意义修订、变化原因与设计—实现漂移。

最终候选不是新的 Architecture Ledger，也不是 Git 文件浏览器。它是对现有 Asteria 的三项实质扩展：

1. **关系合同**：类型关系除了方向和语义，还要说明真实载荷、消费者以及失败与恢复含义。
2. **时间层**：Git 提交与架构修订分开；只有改变系统语义的事件才形成 `ArchitectureRevision` 和 `SemanticChange`。
3. **证据与完整性层**：实现绑定、证据有效期、设计领先代码、代码领先设计、冻结检查和专业判断边界都成为一等能力。

这三项补足了历史候选最容易在实施阶段露出的空白，同时避免建立第二套与 `entities / symbols / typed relations / variants / views` 同义的数据模型。

## 最重要的历史取舍

- 保留 R2 GPT-6 的完整系统拓扑、节点与关系选择、同一拓扑上的正常／失败／恢复／旧能力保护路径切换，以及“关系实际传递什么”的交互。
- 保留 R2 GPT-5.6 的状态表达、信息密度、内容层级、数据／交互／样式分离和手机顺序阅读。
- 保留上一轮 GPT-6 的 Git 原生工作集、稳定身份、源码锚点、局部历史、双向漂移和有意义差异。
- 保留上一轮 GPT-5.6 的 System → Mechanism → Implementation → Evolution 下钻、三轴状态、冻结合同、机制 renderer 和四项目压力测试。
- 拒绝把上一轮任何一套对象模型整体复制进 Asteria；`Component / Mechanism / Requirement / Decision / Issue / Artifact / Finding` 都作为现有 `StatisticalEntity` 的领域子型，`Anchor` 留在 repository bridge，`Freeze` 和 `Drift` 是派生状态与报告，只有 `ArchitectureRevision` 与 `SemanticChange` 需要新增为规范对象。
- 拒绝默认展示大时间线、字段清单、巨型状态卡和全页 reassurance。当前状态只在主要位置出现一次，历史按对象和有意义修订下沉。

## 四个参考项目

四个参考项目共享同一规范模型，但使用不同投影：

- Delivery Assurance 证明纯设计系统可以完整表达组件、关系、机制和路径，源码与测试可以合法为空。
- Mica 证明真实软件可以从能力追到事件、状态、函数、选择器、测试和固定提交，并表达 0.1.6 → 0.1.7 的机制修订。
- CAT-TRACE 证明科学模型、公式、数值例程、reference algorithm、被反例撤销的路线和开放阻塞项可以同时存在。
- STAT5060 Tutorial 证明成品身份、当前要求、机械证据、专业判断、问题记录、原任务返修、重渲染、证据失效和旧正确内容保护可以形成自然闭环。

## 原型结论

原型使用统一壳和统一语义数据，实际切换四个项目；实现了系统、机制、演进与完整性检查四个主视图。桌面端使用路径／图／对象详情三层结构；手机端重新排列为路径顺序阅读和底部对象详情，不缩小桌面拓扑。明暗主题分别定义表面、层级、代码、公式、状态和差异语法，不是简单反色。

## 成熟开源能力

正式实现应直接复用 Cytoscape.js 的图交互、ELK.js 的布局、Tree-sitter 与 SCIP 的源码索引、Difftastic 或 GumTree 的结构差异辅助、Ajv 的 schema 校验、KaTeX 的公式渲染、Shiki 的代码高亮以及现有 Markdown／VitePress 工具链。LikeC4、Structurizr、MADR／Log4brains、Mermaid、Graphviz 和 dependency-cruiser 主要借用理念或作为导入／导出与检查辅助，不成为 Asteria 的第二真值。

## 最危险问题

最危险的问题不是图形性能，而是**自动源码索引产生看似精确、实际错误的绑定**。因此任何自动生成的源码锚点必须保存来源、置信度、固定提交和陈旧状态；`agent_inferred` 不得直接升级为 `human_confirmed`，实现绑定也不得成为科学证明或产品验收结论。这个风险必须在正式实施时通过人工确认样本、断裂锚点负控和提交漂移测试关闭。

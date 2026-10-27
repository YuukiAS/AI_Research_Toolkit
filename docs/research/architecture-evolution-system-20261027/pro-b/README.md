# Architecture Ledger 独立研究（Pro-B）

本目录是在 `AI_Research_Toolkit` 基线提交 `23a1c4840f665e66f7af95ffadaadd96dc999e7f` 上完成的独立研究。唯一目标分支为 `research/architecture-evolution-system-20261027-pro-b`。本研究未读取另一条 Pro 分支的任何成果。

## 结论入口

- [`RESULT.md`](RESULT.md)：唯一推荐、建设边界与最重要结论。
- [`PRODUCT_AND_INFORMATION_ARCHITECTURE.md`](PRODUCT_AND_INFORMATION_ARCHITECTURE.md)：产品形态、阅读体验、数据流和职责边界。
- [`SEMANTIC_MODEL.md`](SEMANTIC_MODEL.md)：跨项目共用的最小语义模型。
- [`ARCHITECTURE_DESIGN_METHOD.md`](ARCHITECTURE_DESIGN_METHOD.md)：Chat、GPT Work、Codex 如何共同形成、冻结和维护架构。
- [`VERSION_AND_EVOLUTION_MODEL.md`](VERSION_AND_EVOLUTION_MODEL.md)：有意义版本、返修、语义差异与因果历史。
- [`SOURCE_OF_TRUTH_AND_IMPLEMENTATION_BINDING.md`](SOURCE_OF_TRUTH_AND_IMPLEMENTATION_BINDING.md)：架构如何绑定真实代码、Skill、公式、测试和证据。
- [`OPEN_SOURCE_RESEARCH.md`](OPEN_SOURCE_RESEARCH.md)：成熟开源能力调查与采用决定。
- [`THREE_PROJECT_STRESS_TEST.md`](THREE_PROJECT_STRESS_TEST.md)：Delivery Assurance、Mica、CAT-TRACE 的同模压力测试。
- [`IMPLEMENTATION_OPTIONS.md`](IMPLEMENTATION_OPTIONS.md)：正式建设时的技术路线和阶段。
- [`RESEARCH_PROVENANCE.md`](RESEARCH_PROVENANCE.md)：读取范围、提交快照与证据边界。
- [`VALIDATION_REPORT.json`](VALIDATION_REPORT.json)：结构化账本的最终机械校验结果。
- [`MANIFEST.sha256`](MANIFEST.sha256)：最终交付文件的 SHA-256 清单。
- [`prototype/TEST_REPORT.md`](prototype/TEST_REPORT.md)：Chromium 交互回归与视觉检查。

## 可审阅原型

直接打开 [`prototype/index.html`](prototype/index.html)。原型演示：

1. 三个项目在同一语义模型下切换；
2. 系统层拓扑和正常、失败、恢复路径；
3. 从组件下钻到机制，再下钻到真实实现锚点；
4. 两个有意义架构修订之间的语义差异；
5. 变化原因、触发证据、受影响对象和实现跟进状态；
6. 正确表示“设计已接受、实现尚不存在”；
7. 完整性与漂移检查；
8. 桌面与移动端阅读。

代表性截图：

- [`prototype/preview.png`](prototype/preview.png)：当前架构与机制下钻。
- [`prototype/preview-diff.png`](prototype/preview-diff.png)：CAT-TRACE 因果演进与语义差异。
- [`prototype/preview-checks.png`](prototype/preview-checks.png)：完整性检查。
- [`prototype/preview-mobile.png`](prototype/preview-mobile.png)：移动端组件详情。

结构化示例由 [`example-ledger.json`](example-ledger.json) 提供，约束由 [`semantic-model.schema.json`](semantic-model.schema.json) 提供。原型是研究验证物，不是正式产品候选。

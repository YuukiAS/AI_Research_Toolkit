# 研究来源、快照与证据边界

## 1. 独立性

运行身份：`pro-b`。

唯一允许写入的分支：`research/architecture-evolution-system-20261027-pro-b`。

共同基线：`YuukiAS/AI_Research_Toolkit@23a1c4840f665e66f7af95ffadaadd96dc999e7f`。

本研究未读取 `research/architecture-evolution-system-20261027-pro-a`、其提交、PR、中间文件或产物。

## 2. AI Research Toolkit 来源

完整研究以以下内容为起点：

- `COMPLEX_SYSTEM_DESIGN_GUIDE.md`
- `COMPLEX_ARCHITECTURE_EXPLANATION_STANDARD.md`
- `AI_RELIABILITY_SYSTEM_REFERENCE.md`
- `docs/research/architecture-workflow-20261026/`
- `docs/research/complex-system-showcase-20261026/`
- 两份 R2 候选的核心设计、架构模型与原型
- R2 comparison 的 A/B 结果

关键固定快照：

- Toolkit 基线：`23a1c4840f665e66f7af95ffadaadd96dc999e7f`
- R2 comparison：`515c66acd5aa0c972ef5b0e97e336894d1932a8c`
- R2 GPT-6 候选：`1508994fd3b4e478d5a39c569d42cb87460de77e`
- R2 GPT-5.6 候选：`a76aafa6d48eb9b947d5683cae35aa3e41141c96`

R2 已验证整体拓扑、交互选择和路径高亮。本研究不重复比较高层图美观度，重点补足机制、实现、版本和因果演进。

## 3. Delivery Assurance

固定读取快照：`ae2766a62b1546048ec6122e01ee95f1904fb73c`。

读取当前设计、职责分工和相关研究材料，仅将可验证的设计事实录入示例。没有发现生产 package/function 的部分保持 `implementation=none`，不做推测。

## 4. Mica

固定读取快照：`YuukiAS/Mica-for-ChatGPT@7059c0dc24b908b57bd0e1f475142ba4f4520621`。

重点来源：

- `AGENTS.md`
- `README.md`
- `extension/src/content.ts`
- `extension/src/reliability/stale-composer-recovery.ts`
- `extension/src/reliability/connector-continuity.ts`
- `scripts/run-e2e.mjs`
- 相关 fixture、测试与结果

原型中的函数、selector 和状态来自上述固定快照。对当前 ChatGPT 生产页面的长期稳定性没有越界推断。

## 5. CAT-TRACE

固定读取快照：`YuukiAS/CAT-TRACE@0d829fb17c458a076a15ec51893e917960107c21`。

重点来源：

- `AGENTS.md`
- `docs/implementation/architecture/CAT_TRACE_IMPLEMENTATION_ARCHITECTURE_EVOLUTION_20260916.md`
- 设计、Critic resolution 与实现计划
- `package/TRACE/src/ct_math.cpp`
- `package/TRACE/tests/testthat/test-math-stability.R`
- `package/TRACE/R/cat-trace-reference.R`
- C04 结果与诊断材料

选择 C01、C04 和匿名零槽位作为代表。未把规划中的 C03+ 描述成已实现。

## 6. 开源研究

调查覆盖：C4/Structurizr、Cytoscape.js、ELK.js、Mermaid、Ajv、MADR、Log4brains、tree-sitter、SCIP、GumTree、Backstage、xyflow/React Flow、D2。采用状态与来源见 [`OPEN_SOURCE_RESEARCH.md`](OPEN_SOURCE_RESEARCH.md)。

正式集成前仍需锁定版本、复核许可证文本和建立第三方声明。本研究中的“活跃”仅表示调查时存在近期维护或发布，不是长期维护保证。

## 7. 原型证据

原型验证目标：

- 三项目共用模型；
- 当前架构和路径；
- 组件到机制；
- 机制到真实锚点；
- 父修订语义差异；
- 原因、证据和实现跟进；
- 未实现状态；
- 完整性检查；
- 移动端详情。

[`prototype/TEST_REPORT.md`](prototype/TEST_REPORT.md) 记录本地结构与浏览器检查。原型不证明正式工具的性能、可访问性完备性或长期维护成本。

## 8. 证据边界

本研究支持“最小 Git 原生组合能够覆盖三个代表项目”的设计判断。它没有证明：

- 所有未来项目都无需扩展字段；
- 自动锚点迁移在所有语言可靠；
- 静态站点在组织级规模仍足够；
- Architecture Ledger 能替代独立产品或科学审查；
- 原型代码可直接发布为生产系统。

正式建设应先用一个真实新修订试点，再决定是否进入一期实现。

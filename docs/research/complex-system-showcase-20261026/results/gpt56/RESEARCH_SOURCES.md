# 一手项目与技术研究记录

本记录只使用官方仓库、官方文档和目标仓库中的固定材料。检索与核对日期为 2026-10-26。项目热度只用于判断维护风险，不作为选型理由；选型主要看信息架构适配、静态输出、内容约束、交互成本、无障碍与后续维护。

## 结论

最终推荐自定义 Astro 内容站。Astro 负责静态输出、路由、结构化内容和按需交互；页面不套用默认文档站主题，也不引入 React Flow、Mermaid 或 D2 作为读者主界面。组件关系由语义化 HTML、CSS 和少量原生 TypeScript 呈现，工程附录需要可维护图形时才考虑构建期导出 SVG。

最强简单替代是 Build Awesome（原 Eleventy）或纯静态 HTML。前者更轻、更自由，但需要自行补齐结构化内容合同、类型约束和局部交互组织；后者适合本轮原型，不适合长期维护多个系统样例。

## 站点与内容框架

| 项目 | 一手来源 | 适合做什么 | 本轮判断 |
|---|---|---|---|
| Astro | [官方仓库](https://github.com/withastro/astro)、[官方文档](https://docs.astro.build/) | 静态内容站、内容集合、按需交互组件；官方仓库将其定位为轻量输出的网站构建工具 | **采用。** 内容为主、交互局部、最终可部署为静态文件，与本任务匹配；MIT 许可。核对时核心包版本为 `7.4.2`。 |
| Starlight | [官方仓库](https://github.com/withastro/starlight)、[官方文档](https://starlight.astro.build/) | 基于 Astro 的文档网站框架 | **不作为主壳。** 它适合侧栏、页面树、参考手册；本任务首先要让读者理解一个任务如何正常完成、失败回传和保护旧能力。默认文档站结构会先暴露目录，而不是结论。可借鉴内容组织和无障碍实现。 |
| VitePress | [官方仓库](https://github.com/vuejs/vitepress)、[官方文档](https://vitepress.dev/) | Vue 驱动的静态文档站 | **不采用。** Markdown 与 Vue 组合成熟，但默认文档信息架构、Vue 运行依赖和主题改造都不是当前核心价值。 |
| Docusaurus | [官方仓库](https://github.com/facebook/docusaurus)、[官方文档](https://docusaurus.io/) | React/MDX 文档、版本化手册与插件生态 | **不采用。** 版本化、多语言和插件面向大型文档门户；本任务的首版只有少量经过策展的页面，采用会增加运行时与配置面。 |
| Build Awesome（Eleventy） | [官方仓库](https://github.com/11ty/buildawesome)、[官方文档](https://www.11ty.dev/docs/) | 多模板语言的简单静态站点生成 | **第二选择。** 官方仓库强调将模板目录转换成 HTML，并保持 `@11ty/eleventy` 兼容。它可以做出更轻的站点，但类型化内容合同和交互岛需要额外约定。 |
| 纯 HTML/CSS/JS | 浏览器原生标准 | 单页原型、长期零依赖静态页面 | **仅用于本轮高保真原型。** 能证明信息架构与交互，不应误写成最终工程选型；多系统扩展时内容漂移风险较高。 |

## 图形与交互工具

| 项目 | 一手来源 | 强项 | 本轮判断 |
|---|---|---|---|
| React Flow / Svelte Flow | [xyflow 官方仓库](https://github.com/xyflow/xyflow) | 节点编辑、拖拽、连线、缩放、迷你地图和复杂画布 | **不进入读者主路径。** 官方定位就是 node-based UI；它会要求读者缩放、追线和理解画布规则，适合编辑器，不适合快速形成系统判断。 |
| Mermaid | [官方仓库](https://github.com/mermaid-js/mermaid)、[官方文档](https://mermaid.js.org/) | 文本生成流程图、时序图和其他工程图 | **仅可作为工程附录或构建期来源。** 主路径需要人工控制信息层级、移动端阅读顺序和证据状态，不应交给自动布局。 |
| D2 | [官方仓库](https://github.com/d2lang/d2)、[官方文档](https://d2lang.com/) | 文本到架构图、多种布局引擎、可导出 SVG | **仅可作为工程附录工具。** MPL-2.0；适合源码维护的图，不适合承担页面核心交互。 |

## 视觉与无障碍基线

| 项目 | 一手来源 | 借用内容 | 明确不借用 |
|---|---|---|---|
| GOV.UK Frontend / Design System | [官方仓库](https://github.com/alphagov/govuk-frontend)、[设计系统](https://design-system.service.gov.uk/) | 明确焦点、跳过链接、渐进增强、原生 `details`、浏览器与辅助技术分级、内容即服务的一致性 | 不复制 GOV.UK 品牌、字号体系或视觉外观；也不因为采用成熟组件思想就宣称页面自动满足无障碍要求。官方仓库本身明确要求服务仍需独立检查。 |

## 目标系统的一手材料

### 共同规范

- [`AI_RELIABILITY_SYSTEM_REFERENCE.md`](https://github.com/YuukiAS/AI_Research_Toolkit/blob/main/AI_RELIABILITY_SYSTEM_REFERENCE.md)：确认 Reasoned Design、Artifact Curation、Clear Writing、workflow-core、Delivery Assurance、领域插件与 Bridge Kit 的目标边界，并明确 DA 仍处设计阶段。
- [`COMPLEX_SYSTEM_DESIGN_GUIDE.md`](https://github.com/YuukiAS/AI_Research_Toolkit/blob/main/COMPLEX_SYSTEM_DESIGN_GUIDE.md)：要求区分可理解、可实施和真实可用；要求每条关键箭头有真实消费者。
- [`COMPLEX_ARCHITECTURE_EXPLANATION_STANDARD.md`](https://github.com/YuukiAS/AI_Research_Toolkit/blob/main/COMPLEX_ARCHITECTURE_EXPLANATION_STANDARD.md)：要求把事实、机制、证据和未验证能力分层。
- [`ACCEPTED_COMPLEX_ARCHITECTURE_EXPLANATION_2026-10-22.md`](https://github.com/YuukiAS/AI_Research_Toolkit/blob/main/docs/examples/ACCEPTED_COMPLEX_ARCHITECTURE_EXPLANATION_2026-10-22.md)：提供已接受的“先讲状态边界，再讲机制与证据”的解释基线。

### Delivery Assurance 旧研究

只读分支：[`research/software-production-decision-20261013`](https://github.com/YuukiAS/AI_Research_Toolkit/tree/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT)

- [`CURRENT.md`](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/CURRENT.md)：设计评审 `PROCEED`，但生产实现、七仓启用、宿主探针和正式候选复验均未完成。
- [`01_REALITY_AND_ALTERNATIVES.md`](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/01_REALITY_AND_ALTERNATIVES.md)：项目内加固、共享小层和外部编排器等替代方案。
- [`02_ARCHITECTURE_AND_COMPONENTS.md`](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/02_ARCHITECTURE_AND_COMPONENTS.md)：旧 R3 组件与职责。
- [`03_END_TO_END_EXECUTION_AND_VALIDATORS.md`](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md)：义务、动态覆盖、未知状态与失败返回设计。
- [`04_SEVEN_REPOSITORY_ADOPTION.md`](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/04_SEVEN_REPOSITORY_ADOPTION.md)：Lucerna 与 SeminarArc 等真实项目对象。
- [`06_IMPLEMENTATION_AND_EVALUATION.md`](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/06_IMPLEMENTATION_AND_EVALUATION.md)：宿主探针、Lucerna 试点、投入估计与删除共享层的停止条件。
- [`11_ARCHITECTURE_EXPLAINED.md`](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/11_ARCHITECTURE_EXPLAINED.md)、[`11_DELIVERY_ASSURANCE_ARCHITECTURE.svg`](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/11_DELIVERY_ASSURANCE_ARCHITECTURE.svg)、[`12_LUCERNA_EXECUTION_FLOW.svg`](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/12_LUCERNA_EXECUTION_FLOW.svg)：旧长文与大图，作为本轮反向比较材料。

### 新总体架构

只读分支：[`design/ai-reliability-architecture-20261026`](https://github.com/YuukiAS/AI_Skills_Collection/tree/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture)

- [`ARCHITECTURE_ZH.md`](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)：把 Delivery Assurance 独立为交付判断插件；workflow-core 回到能力路由；Bridge Kit 保持运行底层。
- [`ROADMAP.md`](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ROADMAP.md)：再次声明该架构是候选方案，尚无代码、宿主钩子或生产授权。

### Lucerna 固定案例

固定提交：[`79dd2875d3da33c6a6d80e5e35bea812b84c1ceb`](https://github.com/YuukiAS/Lucerna/tree/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb)

- [`01054_final_independent_release_acceptance.md`](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/prompts/tasks/01054_final_independent_release_acceptance.md)：同一源码、发布候选、进程和新鲜复核者的验收合同。
- [`repair-product-001.md`](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/results/01054_final_independent_release_acceptance/repair-product-001.md) 与 [`repair-product-002.md`](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/results/01054_final_independent_release_acceptance/repair-product-002.md)：历史根因、修复和“正式 Windows 候选 / 新鲜复核仍待完成”的明确边界。
- [`src-tauri/src/longleaf.rs`](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/src-tauri/src/longleaf.rs)、[`src/longleaf-presentation.ts`](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/src/longleaf-presentation.ts)、[`scripts/test-longleaf-presentation.mjs`](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/scripts/test-longleaf-presentation.mjs)：未观测、检查中与确认故障的源码规则和确定性回归。

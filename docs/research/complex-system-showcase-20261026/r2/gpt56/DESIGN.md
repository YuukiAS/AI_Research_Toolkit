# Delivery Assurance 展示网站第二轮设计方案

本轮推荐一套“架构工作台”，首页直接展示 Delivery Assurance 的完整组件和通信关系。读者进入页面后先看到系统全貌，再切换正常交付、验收失败和旧功能回归三条路径；点击节点或连线时，右侧才出现责任、输入、输出、接收者和当前缺口。页面不再用口号、状态卡片或分散的组件介绍替代架构图。

## 页面要回答的问题

首页需要让读者在一个视口内看清四件事：哪些能力已经存在，哪些能力只是经过审查的设计；当前 Codex、workflow-core、Bridge Kit、Delivery Assurance 和项目验收程序各自负责什么；一次交付的正常路径、失败返修路径和旧功能保护路径怎样经过同一组组件；哪些连接仍未完成生产接线或真实运行验证。

Lucerna 案例随后说明为什么这些关系有实际意义。页面使用历史修复记录中的真实事实：两条访问路线可用、第三条仍在检查时，未观测证据曾被错误解释成整体故障。定向回归已经通过，但该回合没有重建正式 Windows 候选，也没有完成新的独立界面验收。两个故意错误候选分别检验确认故障是否会被掩盖，以及原有可用路线是否会被新修复破坏。

## 信息结构

第一屏由四层组成。页头只保留品牌、四个页面锚点和当前设计状态。标题下用一段话交代组件分工，并紧邻说明尚未实施的范围。架构工作台占据主要空间，情境切换、图例、完整架构和节点检查器同时可见。架构图之后才进入 Lucerna 案例、方案比较和首个否决试验。

这一顺序来自第二轮文案审查：普通状态不再包装成宣传口号；同一事实不会同时出现在徽章、标题、正文和证明卡片里；内部编号、阶段名和开发角色不进入首屏。需要说明的产品边界保留在事实附近，不用安抚式或自我辩护式句子稀释。

## 架构图与交互

桌面端使用固定语义布局。原始要求和当前 Codex 位于左侧；workflow-core、Bridge Kit、Delivery Assurance 与原有可用功能位于中部；项目验收和独立复核位于专业证据区；用户或下游流程位于最右侧。Reasoned Design、领域插件、Artifact Curation 和 Clear Writing 放在底部，明确表示按任务选用，而非每次交付的固定关卡。

节点是可聚焦的 HTML 按钮，连线由 SVG 绘制。节点选择会突出直接上下游，连线选择会显示传递内容、触发条件、实际接收者、怎样算接通以及当前缺口。三种情境只改变路径高亮和步骤编号，不创建三张互不一致的图。交互承担读图任务，没有装饰动画。

手机端不把宽图整体缩小。相同的架构模型按当前情境重排成纵向路径，未进入当前路径的组件保留为可选索引。这样可以继续查看完整责任和状态，同时避免横向拖动和不可读的小字。

## 技术方案比较

| 方案 | 优点 | 当前任务中的问题 | 结论 |
| --- | --- | --- | --- |
| React Flow | 节点和连线交互成熟，官方支持键盘焦点与无障碍属性 | 需要 React 运行时；拖拽、缩放和自由画布会把读者带入“编辑图”的心智模型；本图只有 13 个固定节点 | 不采用 |
| Cytoscape.js | 图分析、布局和大规模网络能力强 | 适合探索复杂网络，当前页面不需要自动布局、图算法或大量节点 | 不采用 |
| Mermaid Architecture | 文本维护方便，适合文档中的静态架构 | 交互检查器、精确中文排版、移动重排和路径状态控制不足 | 只作为文档表达参考 |
| 固定 HTML 节点 + SVG 连线 | 节点可访问，连线语义可精确控制；静态文件可直接托管；截图稳定；手机端可从同一模型重排 | 需要手工维护坐标和连线路径 | 采用 |

外部研究参考了 React Flow 的无障碍说明、Cytoscape.js 的图交互能力、Mermaid Architecture 的组件语法、GitHub Actions 的依赖图、Carbon 的流程与网络图指南，以及 W3C 的 SVG 无障碍映射要求。最终方案没有引入外部运行依赖。

## 视觉系统

页面采用接近工程控制台和技术白皮书之间的视觉语气：白色和浅灰作为底色，深黑用于主要文字，蓝色表示当前路径，橙色表示返修或风险，绿色只用于结果接收端。紫色只标记按需能力，不用于装饰渐变。节点尺寸、边框和状态点按语义统一，图中不使用自绘图标或无意义几何形状。

排版优先保证完整架构在 1600 × 1000 视口内可读。默认状态保留全部节点和连接；选择某个节点后才降低无关部分的权重。首轮截图检查发现默认选中状态曾让大半架构过淡，原有功能节点也与底部能力重叠；两处均已修复并重新渲染。

## 中文内容处理

逐句记录覆盖页面静态正文、节点文字、18 条连接的所有字段、三种情境、手机端文字、键盘提示、无障碍标签和动态通知，共 467 条。记录位于 `COPY_EDITORIAL_AUDIT.tsv`。其中单独列出 16 条上一轮典型问题，例如“系统观察室”“交付之前，先证明它做到了”“义务收束”“相信到哪一步，只由证据类型决定”，并说明删除、合并或改写原因。

正文保留 Delivery Assurance、Bridge Kit、workflow-core、Reasoned Design、Artifact Curation、Clear Writing 等稳定身份；普通工程概念用中文表达。每段先判断这句话是否有必要，再处理措辞。页面没有使用禁词扫描或插件名称作为通过证明。

## 当前边界

这是一套展示网站的设计与交互原型。Delivery Assurance 独立插件、正常入口接线、失败自动回传、跨插件实际消费和七个项目的正式启用均未在本轮实施。旧方案中的 4–8 小时、40–88 小时和 138–332 小时只作为历史实施前估算展示，不代表本轮实际耗时、当前预算或已经批准的投入。

## 主要来源

- `AI_RELIABILITY_SYSTEM_REFERENCE.md`
- `COMPLEX_SYSTEM_DESIGN_GUIDE.md`
- `COMPLEX_ARCHITECTURE_EXPLANATION_STANDARD.md`
- `docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/`
- `YuukiAS/AI_Skills_Collection@design/ai-reliability-architecture-20261026`
- `docs/design/product-ui-copy/evidence/CUHK_DATE_PRODUCT_COPY_NATURALNESS_AUDIT_2026-09-26.md`
- `docs/plugin-todos/web-development.md` 中 Frontend Design #89
- `docs/plugin-todos/writing-style.md` 的 2026-10-26 真实反馈
- React Flow Accessibility、Cytoscape.js、Mermaid Architecture、Carbon Design System、W3C SVG Accessibility API Mappings、GitHub Actions Visualization Graph 的官方资料

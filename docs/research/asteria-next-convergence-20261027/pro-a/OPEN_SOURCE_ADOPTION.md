# 开源能力的最终采用决定

Asteria Next 继续使用 Asteria 的 React 与 React Flow，以 ELK.js 计算分层布局，Shiki 生成代码双主题，KaTeX 渲染公式。来源绑定先支持人工确认，再按需要接入结构索引。架构身份、关系契约、修订因果、证据适用性和冻结范围由 Asteria 的共同语义模型承担。

本轮已经实际集成的依赖与正式实施阶段选定的能力分别列出。所有版本、许可与来源以本轮读取结果为准，不将研究时的仓库主分支称作已安装版本，也不把后续索引能力写成原型已经实现。精简来源记录见 [sources/oss-source-ledger.json](sources/oss-source-ledger.json)，原型可复现版本见 [package.json](prototype/package.json) 与 [package-lock.json](prototype/package-lock.json)。

## 已进入本轮原型的直接依赖

| 能力与依赖 | 原型固定版本 / 许可 | 采用方式与理由 |
|---|---|---|
| React、React DOM | 18.3.1 / MIT | 延续现有 Asteria 的组件系统。四个参考项目共享页面结构与选择状态，内容从同一语义投影读取 |
| React Flow `@xyflow/react` | 12.8.4 / MIT | 承担节点、边、视口、选择、缩放和图形交互；复用现有产品技术基础，语义身份不交给图组件内部状态维护 |
| ELK.js `elkjs` | 0.12.0 / `EPL-2.0 OR GPL-3.0-or-later` | 选择 EPL-2.0 路径；构建期计算 layered 布局与正交边路由，输出纯投影几何，避免自行实现通用布局引擎 |
| Shiki | 4.5.0 / MIT | 构建期高亮固定源码摘录，同时生成 light/dark 的 token 颜色；浏览器切换主题时不重新解析源码 |
| KaTeX | 0.16.22 / MIT | 渲染数学机制；使用 `trust:false` 与 `htmlAndMathml`，保留可访问数学输出，公式含义仍来自实体、符号与作者来源 |
| Lucide React | 0.468.0 / ISC | 采用一致的线性图标表达导航和少量对象类别；不用装饰图形填补空白 |
| Noto Sans CJK SC | 字体内部版本 2.004 / OFL-1.1 | 本地 Regular 与 Medium 子集，支持中文正文和组件标题；随原型保存字体许可 |
| Vite、React 插件、单文件构建插件 | 6.4.1、4.3.4、2.3.4 / MIT | 复用现有前端构建方式，形成可本地运行和审查的静态候选；它们不增加产品服务端 |

以上版本来自实际锁文件。Noto 的内部版本从两份字体文件读取，许可保存在 [NOTO-LICENSE.txt](prototype/src/assets/NOTO-LICENSE.txt)。ELK 的 npm 许可表达式包含两个路径，本候选明确采用 EPL-2.0；上游 [LICENSE.md](https://github.com/kieler/elkjs/blob/master/LICENSE.md) 随正式分发保持可查。[React Flow 官方仓库](https://github.com/xyflow/xyflow)、[ELK.js 官方仓库](https://github.com/kieler/elkjs)、[KaTeX 官方仓库](https://github.com/KaTeX/KaTeX)、[Lucide 官方许可](https://lucide.dev/license)。

### 图交互与布局分工

React Flow 提供键盘、焦点、屏幕阅读器标识和可本地化说明的基础。Asteria 仍需验证自定义节点、关系详情、抽屉与手机阅读是否真正联动，不能因库有 `focusable` 支持就宣告整个产品满足可访问性要求。[官方 accessibility 文档](https://reactflow.dev/learn/advanced-use/accessibility)。

ELK 只决定给定投影的几何安排。哪些对象应该显示、系统边界怎样分组、哪些关系属于正常工作或返修、历史旧节点是否保留，仍由 Asteria 的视图与语义规则决定。原型的前向图使用 ELK 分层及正交路由，返修关系安排在外侧通道；这些线都引用同一套 canonical relations，没有第二张事实图。具体生成过程见 [prepare.mjs](prototype/scripts/prepare.mjs)。

正式实现继续采用这项分工：投影先筛选有意义的系统边界，再将节点尺寸和约束交给 ELK。交互展开时可在本地工作线程重算并缓存；无需为布局增加云服务。大型图首先依靠分层、局部展开与搜索控制阅读范围，不能把安装一个图引擎当作大图已经可读的证明。

### 代码与公式使用成熟渲染器

Shiki 的双主题输出使用 token 级 CSS 变量。原型实际生成 `github-light` 和 `github-dark`，由同一主题状态选择对应颜色；深色源码不通过整体反色处理。[官方双主题说明](https://shiki.style/guide/dual-themes)。

KaTeX 继续沿用 Asteria 已有技术。原型使用 `trust:false`、`htmlAndMathml`，并限制展开和尺寸；不能解析的内容保留错误或原表达，不把一张公式图片当成算法成立的证据。官方选项文档解释了这些开关的行为。[KaTeX options](https://katex.org/docs/options)。原型固定版本为 0.16.22，本文没有将它称为当前最新版。

## 保留现有 Asteria 依赖的明确职责

固定 Asteria 提交 `60ba27a38324980beea78d4c07b7b28abda522cf` 的锁文件已经包含下列依赖。Next 延续其职责，本轮静态原型没有为演示而重新实现完整编辑器或本地数据库。[现有 package-lock](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/package-lock.json)。

| 依赖 | 现有锁定版本 / 许可 | 最终决定 |
|---|---|---|
| Tiptap core / React | 2.27.2 / MIT | 直接沿用旧富文本兼容与本地草稿编辑；不作为仓库 Markdown 正文的第二份 canonical 副本 |
| Dexie | 4.4.4 / Apache-2.0 | 直接沿用浏览器本地缓存和草稿持久化；缓存丢失后可从固定来源重建，未提交草稿单独提示 |
| Zustand | 4.5.7 / MIT | 直接沿用界面会话与选择状态；当前选择、折叠与主题不成为架构真值 |

这些版本是现有产品锁文件中的实际解析版本，区别于 package.json 里的范围声明。正式迁移要保留旧数据兼容和草稿恢复；不能因为继续使用 Dexie 就让浏览器数据库成为新的权威架构仓库。

## 正式阶段选定的来源与 Markdown 能力

人工绑定是必备入口。作者明确一个实体由哪个固定来源、函数或产物部件实现，并说明该位置承担的作用。后续解析器帮助定位和核对，不自动判断设计已经实现，更不从代码重新决定科学定义。

| 工具 | 采用级别 | 版本与许可依据 | 明确职责与限制 |
|---|---|---|---|
| react-markdown / unified | **正式阶段直接依赖，原型未集成** | 本轮 npm 核到 10.1.0 / 11.0.5，均为 MIT；作为正式来源阅读阶段的版本起点 | 固定来源提取后的只读 Markdown 渲染；raw HTML 默认关闭，不启用任意文档脚本。结构连接与原正文各维护一次 |
| Tree-sitter | **正式阶段首个按需源码解析器** | 官方核心 MIT；具体语言 grammar 与解析器版本随接入阶段共同锁定 | 提取声明、语法范围和结构选择器，帮助重定位锚点；每种语言单独验证，解析树不等于完整调用图或架构语义 |
| SCIP | **导入已有索引，按需启用** | 官方协议仓库 Apache-2.0；索引格式与生成器版本随输入保存 | 复用仓库已经提供的符号、定义与引用索引；不要求建立 Sourcegraph 服务，也不为了一个项目先构建通用索引平台 |
| dependency-cruiser | **JS/TS 项目的按需观察工具** | 官方 MIT；正式接入时锁工具版本与运行配置 | 提供模块依赖与规则检查结果，辅助发现实现变化范围；文件依赖不能替代组件机制，也不能外推到 R、算法或产物验收 |
| Difftastic | **可选外部源码比较工具** | 官方仓库元数据为 MIT；本轮观察提交 `0b92338c6042152b1fc91c30ed01cf0449070844`，未捆绑二进制 | 按需查看源码语法差异。它不计算 Asteria canonical semantic diff，不生成修订原因，也不判断数学或行为等价 |

这是确定的接入顺序：人工绑定先成立，Tree-sitter 解决已选语言的结构定位；已有 SCIP 或 JS/TS 依赖结果可以增加来源观察。它们不同时成为所有用户必须安装的运行环境。没有索引时，固定源码和人工绑定仍然可用；索引覆盖不足时，界面保留范围限制。

react-markdown 采用成熟 Markdown 处理链，TipTap 继续处理已有富文本和草稿。当前 Asteria 已有 Tiptap 到 Markdown 的导出，但它不等于通用 Markdown 导入器；本轮原型则主要渲染结构化 JSX 正文。正式来源阅读阶段才接入所选只读渲染器，不能在候选能力表中提前计为已完成。[react-markdown 官方 README 与许可](https://github.com/remarkjs/react-markdown)、[unified 官方仓库](https://github.com/unifiedjs/unified)。

来源索引的能力分别核对了 [Tree-sitter 官方介绍](https://tree-sitter.github.io/tree-sitter/)、[SCIP 官方协议](https://github.com/scip-code/scip)、[dependency-cruiser 官方仓库](https://github.com/sverweij/dependency-cruiser) 和 [Difftastic 官方手册](https://difftastic.wilfred.me.uk/)。正式 importer 仍需按 [来源绑定规范](SOURCE_BINDING_AND_EVIDENCE.md) 保存固定提交、结构选择器、解析器版本、歧义及不可用状态。

## 研究后借用理念、但不增加依赖的工具

| 工具 | 最终裁决 | 值得保留的能力或理念 | 本候选不直接采用的原因与许可记录 |
|---|---|---|---|
| LikeC4 | **借理念** | 从模型生成层级视图，逐层探索上下文，架构文字与图保持联系 | Asteria 已有实体、符号、变体和投影；再引入完整 DSL 会形成双重作者来源。本轮核到 MIT、提交 `f01e7c800654e1e1aeab247e304fb5a6c5d9a4dd`。[官方仓库](https://github.com/likec4/likec4) |
| Structurizr | **借理念** | 同一模型生成多个架构视图，明确系统与组件边界，架构描述可版本化 | 保留上述方法，不新增第二套 C4 workspace 或 DSL 真值。当前官方仓库为 Apache-2.0；以 [DSL 文档](https://docs.structurizr.com/dsl) 与 [当前仓库](https://github.com/structurizr/structurizr) 为准 |
| MADR | **借理念** | 记录问题背景、采用决定、备选取舍与后果，帮助解释为什么改 | 决定进入既有 `decision` 实体并引用原 Markdown，不建立另一本 ADR 账本。官方 LICENSE 为 `MIT OR CC0-1.0`。[官方模板](https://adr.github.io/madr/)、[许可](https://github.com/adr/madr/blob/develop/LICENSE) |
| Mermaid | **用于文档及按需简单机制图，不作为核心图引擎** | 文字可维护的时序、状态和小型说明图 | 系统图需要稳定实体选择、关系载荷、来源和局部历史；这些仍由共同投影与 React Flow 承担。Mermaid 未进入本轮原型依赖；官方 MIT。[官方文档](https://mermaid.js.org/)、[许可](https://github.com/mermaid-js/mermaid/blob/develop/LICENSE) |

Structurizr 的来源需要特别修正：旧 `structurizr/dsl` 在本轮读取中返回 404；`structurizr/java` 的 README 又明确说明代码已经移到 `structurizr/structurizr`。因此本候选引用仍可访问的 DSL 文档和当前合并仓库，不沿用旧仓库地址假装完成了现状核查。[迁移说明](https://github.com/structurizr/java)、[当前 LICENSE](https://github.com/structurizr/structurizr/blob/main/LICENSE)。

Mermaid 的角色也有边界。作者已有的简单机制图可以作为文档内容读取；如果某个步骤需要独立选择、绑定实现或参与证据失效，应进入 typed mechanism，由 Asteria 的领域渲染器呈现。不能在一段 Mermaid 文本里藏一份没有共同身份的第二机制。

## 明确不加入本候选运行时的工具

| 工具 | 最终裁决与原因 | 已核对的能力和许可 |
|---|---|---|
| Cytoscape.js | **不采用为并列图运行时。** 它的图分析与网络可视化有价值，但当前需要延续 Asteria 的 React 节点、面板和选择语义；维护两套选择、事件与布局适配增加成本，没有已证明的必要性 | 官方将其定位为图网络分析与可视化库；MIT；本轮观察提交 `9aab1b4489645c15e82fce71fdce738f58d8165d`。[官方文档](https://js.cytoscape.org/) |
| Graphviz | **不采用为第二布局管线。** 本候选已选 ELK 提供交互投影所需的分层布局与路由；不再并行维护 DOT 到产品节点身份的映射 | 官方提供多种布局引擎和输出格式；当前许可页面为 EPL-2.0，不能沿用旧版许可印象。[官方布局文档](https://graphviz.org/docs/layouts/)、[许可](https://graphviz.org/license/) |
| GumTree | **不采用。** 它能提供语法树编辑与移动等源码变化信息，但现阶段已有外部源码比较入口；引入另一套 AST 差异运行环境不能解决 canonical 架构差异与因果问题 | 官方 README 与 LICENSE 已核对；LICENSE 标题为 GNU LGPL Version 3。这里不推断未选择发行包的其他许可条件；未捆绑运行时。[官方仓库](https://github.com/GumTreeDiff/gumtree)、[许可](https://github.com/GumTreeDiff/gumtree/blob/main/LICENSE) |
| Log4brains | **不采用。** 不另起决策发布网站；决定与修订须在当前组件、来源和证据附近阅读 | ADR 管理与发布工具；官方 Apache-2.0。[官方项目](https://github.com/thomvaill/log4brains) |
| VitePress | **不采用为产品宿主。** 静态文档站适合文档，但本候选需要共享选中对象、系统图、机制、证据与差异；不将同一项目拆成 Asteria 与第二网站 | 官方文档站生成器；MIT；本轮观察提交 `415a6a39507af37e282c02eb57ca50594f1bc237`。[官方项目](https://vitepress.dev/)、[许可](https://github.com/vuejs/vitepress/blob/main/LICENSE) |

这些裁决没有否定工具在自身领域的价值。采用边界由本产品需要和已有技术决定；后续若出现一个具体场景证明现有选择无法满足，再通过正常架构修订重新评估，不预装所有候选以防万一。

## Asteria 需要自己实现的部分

成熟工具负责布局、图交互、语法解析、源码比较和内容渲染。Asteria 的独特工作是把同一对象的责任、关键机制、信息流契约、真实实现、版本与证据连起来，并保留每项判断的来源和范围。

具体包括稳定身份及现有模型迁移；有类型能力面和条件校验；payload 与实际 consumer 的对应；来源锚点歧义和绑定确认；按对象版本计算证据适用性；有意义修订的因果、影响与保留承诺；前后快照的 canonical semantic diff；设计和代码的双向核对；以及需要独立专业判断的范围化冻结契约。这些规则决定产品含义，不能委托某个通用图或 AST 库替代。[语义模型](SEMANTIC_MODEL.md)、[版本与偏离](VERSION_EVOLUTION_AND_DRIFT.md)、[设计与冻结](ARCHITECTURE_DESIGN_AND_FREEZE.md)。

本候选因此不需要新增服务端、数据库服务、图数据库、账号系统、云索引、向量库或代理执行框架。仓库原文件和必要结构连接仍是作者来源，生成快照、布局和索引都是带输入版本的派生结果。

## 版本锁定与实施边界

原型版本已经固定在锁文件，字体许可随资产保存。正式实现以这些直接依赖为起点保留第三方许可和分发记录；升级依赖需要验证与其职责相关的实际风险，例如节点键盘选择、布局稳定性、公式输出和主题对比，不能只看到构建成功。

正式阶段的 Tree-sitter grammar、SCIP 输入生成器与外部分析工具尚未集成，因此不填伪造的已安装版本。接入时必须把具体版本、输入来源、运行配置和覆盖范围写入来源观察；工具换版产生的结果不能无条件沿用旧证据。本轮没有创建通用代码索引、导入后台或自动架构推断器。

资料下载中出现的 403、旧地址 404 和未返回的提交仍保留在来源记录。补核成功的官方页面与原型真实 package metadata 分开记载；没有取得的事实不通过旧记忆补齐。这份采用表表达最终选择及其实施阶段，不代表每一项未来能力已经通过本轮原型验收。

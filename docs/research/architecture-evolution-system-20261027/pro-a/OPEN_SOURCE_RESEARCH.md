# 成熟开源能力调查与技术取舍

本次调查建议采用“Git 中的小型语义文件与模块文档 + 生成式静态阅读器”。系统图在构建时用 Graphviz（@viz-js/viz）生成 SVG，浏览器使用原生 HTML 与少量 JavaScript 完成下钻和版本比较；源码定位先使用固定提交链接与语言自身的解析能力，只有需要跨语言符号导航时才增加 Tree-sitter 或 SCIP。自行设计的部分应限定为三项：设计、代码与证据的对应关系，跨版本的组件与关系变化，以及保留修改原因的变更记录。

这项推荐的依据是：现有工具已经足以承担建图、下钻、静态发布、文档和代码导航，却没有在本次核查中直接提供“科学方法、Skill 规则、软件代码共用一种对象身份，并永久保存返修原因及证据”的完整组合。将这些缺口做成薄层，工作量和维护边界都比建设开发者门户清楚。这里没有估计未经测量的需求覆盖百分比。

调查日期为 2026-10-27。远端默认分支、最近发布、源文件和许可证分别核查；默认分支中的新功能没有自动记作正式发布能力。本次比较按 12 组能力组织，Structurizr 与其社区静态生成器合为一组，共核查 13 个仓库。Graphviz 已完成小型技术试验并用于主原型的静态构建；其他项目以阅读与源码核查为主，实际采用情况见文末登记和原型构建记录。

## 一、维护、版本和许可证

表中的“最近提交”来自默认分支提交对象，不把仓库最近更新时间或点赞活动误记成代码维护。完整提交号、接口地址及检索日期保存在配套 [oss_sources.json](sources/oss_sources.json)。

| 项目 | 已核查发布 | 默认分支最近提交日期 | 许可证 | 当前判断 |
| --- | --- | --- | --- | --- |
| LikeC4 | v1.60.0，2026-10-15 | 2026-10-27 | MIT | 活跃；分层视图和静态导出成熟，新模型差异功能仍在未发布代码中 |
| Structurizr 与 Site Generatr | 主项目 v2026.10.26，2026-10-26；生成器 1.6.0，2026-05-22 | 主项目 2026-10-26；生成器 2026-08-26 | 均为 Apache-2.0 | 主项目活跃；静态生成器仍有维护；使用合并后的 Structurizr 主仓 |
| Graphviz / @viz-js/viz | 上游 Graphviz 16.1.0；包装 3.31.0，2026-09-28；本地试验 3.25.0 | 包装仓库 2026-09-28 | 包装 MIT；本地 Graphviz 14.1.3 为 EPL-1.0；当前上游 EPL-2.0 | 推荐构建时生成 SVG，避免把布局引擎放进阅读页面 |
| Cytoscape.js | v3.34.4，2026-10-15 | 2026-10-15 | MIT | 活跃；需要实时图查询或编辑时的替代 |
| ELK.js | 0.12.0，2026-07-17 | 2026-10-19 | EPL-2.0 | 活跃；端口和复杂分层布局成为需要时再采用 |
| Tree-sitter | v0.27.1，2026-10-08 | 2026-10-24 | MIT | 活跃；适合语法定位，不能独自承担程序语义判断 |
| SCIP | v0.10.0，2026-09-03 | 2026-10-22 | Apache-2.0 | 活跃；仓库已迁至 scip-code/scip |
| dependency-cruiser | v18.7.0，2026-10-19 | 2026-10-26 | MIT | 活跃；适合 Mica 的模块依赖调查 |
| adr-tools | 3.0.0，2018-07-25 | 2020-03-30 | GPL-3.0-or-later；生成内容 CC-BY-4.0 | 方法仍有价值，命令行工具维护较慢，不作为新系统必需依赖 |
| Backstage | v1.56.2，2026-10-22 | 2026-10-26 | Apache-2.0 | 活跃；其集中目录和后端超出本任务需要 |
| VitePress | 最新发布标签 v2.0.0-alpha.21，2026-10-25；已核查稳定系列 v1.6.3 | 2026-10-26 | MIT | 活跃；文档站成熟，不因 API 的 latest 标签就默认采用 alpha |
| Difftastic | 0.71.0，2026-09-18 | 2026-10-26 | MIT | 活跃；适合作为可选代码比较工具 |

许可证核查中有两个容易误判的地方。GitHub 对 ELK.js 和 adr-tools 均返回 NOASSERTION，直接读取许可证后才确认上表结论。adr-tools 的程序和它生成的内容使用不同许可证。VitePress 的当前最新发布虽然在 GitHub API 中 prerelease 为 false，版本名仍包含 alpha；正式采用时应锁定已经评估过的版本，不能只信 API 分类。上述日期均未晚于本次检索日期。[S1–S13]

## 二、各候选能够承担什么

| 候选 | 可以直接复用的能力 | 源码与版本能力 | 中文与定制 | 对本项目的取舍 |
| --- | --- | --- | --- | --- |
| LikeC4 | 从一个分层模型生成多个视图；组件和关系下钻；动态交互与时序视图；静态网站；可嵌入组件 | 对象链接、元数据；模型文本随 Git 保存；main 有模型差异预览，正式版边界见后文 | 模型标题和描述可使用中文；已有简体中文 README；工具界面不能据此声称全面汉化 | 最强现成整体替代；可作为视图适配器，暂不把历史语义交给其未发布差异功能 |
| Structurizr | C4 多视图、动态视图、部署视图、文档与决策记录；JSON 模型；自动与人工布局 | 可链接外部来源并纳入 Git；源码验证、证据失效与组件因果链仍需补充 | DSL 文本可承载中文，最终字体需渲染验证；可扩展但受 C4 对象体系约束较多 | 适合已有 C4 团队；科研与 Skill 的模型应避免强行映射成容器 |
| Graphviz / @viz-js/viz | DOT 或图对象输入，自动布局，SVG 和 JSON 输出；节点与边的稳定自定义 id、链接和 class | 不自带架构历史；可将两版并集图一次布局，再在同一 SVG 中切换状态 | 默认 UTF-8；中文标签已做输出试验，具体字体和窄屏体验需浏览器验收；SVG 交互由宿主实现 | 首版采用构建时依赖；不要求实时拖动编辑，适合少量精选系统和局部机制图 |
| Cytoscape.js | 交互关系图、复合节点、节点与边筛选、图查询、样式、导出；可在浏览器或无界面模式运行 | 自带图模型，但不提供架构版本、源码身份或变更理由 | 文本、事件和样式可自定义；中文字体由宿主提供；界面文案完全由本项目控制 | 实时图查询、交互编辑或大图需求出现时的替代，首版不同时引入 |
| ELK.js | 有方向和端口的分层布局；图输入输出；浏览器及 Node.js 调用 | 只负责位置，不认识架构含义、证据或版本 | 无业务界面；输入几何尺寸来自实际中文排版测量 | 图变复杂时加入；布局结果可在构建时生成，减少浏览器负担 |
| Tree-sitter | 语法树、函数等语法节点查询、字节及行列位置、错误容忍 | 可帮助重新定位函数与片段；不自动证明改名后的行为相同 | 与中文界面无关；需每种语言的语法适配 | 可选源码适配器；不要首版给所有项目安装 |
| SCIP | 定义、引用、实现关系及跨仓库符号信息；多语言索引协议 | 符号包含包、版本、描述符；适合精确导航；不是跨改名永久身份 | 无终端产品界面要求；语言支持取决于索引器 | 对较大跨语言项目有价值；本轮几十个明确锚点不需要先引入 |
| dependency-cruiser | JavaScript/TypeScript 导入关系、规则检查、循环与无效依赖发现、结构化输出 | 能提供模块层实际依赖；不能据导入关系推断 DOM 事件和运行时完整调用链 | 报告数据可换中文展示；源码标识符保持原样 | Mica 的按需事实提取器；不是三个项目的统一架构模型 |
| adr-tools 与原始 ADR 方法 | 小型、版本化的决策文档；旧决定被取代后继续保留 | 决策之间的替代关系明确；不自动绑定具体组件和实现 | Markdown 可自然使用中文；模板可以调整 | 复用方法，首版不依赖其命令行工具 |
| Backstage | 软件目录、关系、文档、可扩展开发者门户 | 以目录实体集中发现软件；配套后端读取与处理实体 | 丰富可定制性，同时带来后端、配置和运维负担 | 当前不采用；项目多不等于需要企业开发者门户 |
| VitePress | Markdown、静态生成、路由、中文文档、多语言、Vue 交互组件、源码片段导入 | 源文档随 Git 演进；编辑链接和导入片段可指向来源；不自带架构差异与因果历史 | 官方支持多语言、容器文字与控件文案调整 | 适合作为已有文档站容器；不必为单一阅读器额外搭站 |
| Difftastic | 基于语法的代码比较，减少排版变化干扰 | 可与 Git 联用；不理解“用户能力为何改变”，不自动生成可应用补丁 | 有中文手册；代码标识符保持原样 | 深入代码差异时按需调用；不能命名为架构语义比较器 |
| Structurizr Site Generatr | 静态模型、文档、决策一同发布；多个指定 Git 分支切换 | 支持同时展示当前与未来分支，组件和文档可导航 | 主题与样式可调整；中文搜索需另核对语言分词 | 是比“官方静态导出”更强的替代；仍缺实现证据时效和永久组件变更语义 |

能力来自官方文档、固定提交的 README、相关实现及测试源码；表内的采用建议是本研究的判断。能力表将 Structurizr 与社区生成器拆开说明，以免混淆官方与社区能力。[S1–S13, D1–D14]

## 三、最强现成替代必须认真对待

### LikeC4 已经覆盖大量基础体验

LikeC4 的对象层次不受四级 C4 限制；可以定义自己的对象类型，元数据和链接可以挂在组件及关系上，关系也可以导航到动态视图。它可以生成静态站点，采用相对基础路径和散列路由，适合简单托管。使用它就能避免重写图模型解析、多个视图、关系探索和一般下钻。[D1–D4]

因此，不能把 LikeC4 描述成“只能画一张框图”，再把已有能力重新实现一遍。如果用户只需系统图、机制图和文档链接，直接使用 LikeC4 与 Markdown 会更省维护。

本任务仍有两处明确缺口。第一，源码链接本身不确认设计是否已经实现，也不确认某次测试针对当前实现。第二，永久保留“哪份审查或实验让哪个组件改变、旧路线为何撤销”，需要独立于临时图差异的记录。把这些内容压进无结构的描述文字，会失去自动关联和检查能力。

### 新的模型差异功能不能误记成稳定版功能

2026-10-27 固定提交 f01e7c800654e1e1aeab247e304fb5a6c5d9a4dd 的源代码已包含具名模型差异、增删对象和关系、修改元数据、同布局前后叠加，以及静态站点中的差异切换。测试源码也覆盖了静态构建后的新增和删除节点展示；这说明项目已有真实实现，不能仅按旧知识判断。[L1–L3]

同时，v1.60.0 对应的完整 Git 树不包含这些 model-diff 路径，main 中还保留待发布 changeset。本轮没有运行其未发布构建。因此只能把它列为“已在主干实现、尚未确认进入稳定发布及本环境运行”的能力。

其永久历史边界更关键：官方源文档说明，应用模型差异后会删除差异的标题、说明和外层注释；要保留理由，需要另写入模型或提交说明。由此可见，该功能主要解决拟议变更的预览和应用，不能独自承担本任务的长期因果记录。[L1]

### Structurizr 的替代不能停留在最弱导出方式

Structurizr 官方静态导出会移除文档和架构决策，只保留部分图形能力。若只比较这种导出，再说它不适合本任务，并不充分。社区的 Structurizr Site Generatr 已经能把图、Markdown/AsciiDoc 文档、决策记录与多个 Git 分支一同生成静态网站，且支持构建时读取 Git 仓库。[D5, S12]

但“多个分支并列”仍需要区分架构版本与实现版本；分支名也不能解释修改原因。对于科研公式、实验反例、Skill 原文和多个证据版本，它依然需要本任务特有的语义约定。若项目已经长期采用 Structurizr，这条组合值得优先复用；对当前三个不同类型项目，直接增加其 DSL、Java 构建链和语义适配层，不比轻量方案更简单。

## 四、唯一推荐组合与边界

推荐把仓库中的设计文档和源码继续作为各自事实来源，只人工维护无法从它们可靠推导的少量语义：组件的稳定身份、关系的实际含义、重要变更的原因、决策所属人以及证据指向。静态阅读器只消费这些输入和构建结果，不成为第二个可编辑事实库。

建议首版实际复用以下能力：

1. **Git 与固定提交链接。** 历史文件、旧决定和原始证据按提交定位；用户看到当前代码时另显示当前解析结果。固定链接确保历史仍指向当时的文件。[D8]
2. **构建时 Graphviz / @viz-js/viz。** 将经过检查的组件与关系转换为 DOT，再生成带明确对象 id 的 SVG。浏览器只加载 SVG、语义化正文和少量交互脚本。版本比较先对两版本的节点与边求并集、只布局一次，再改变显隐和样式；不把两次独立布局的结果误称为稳定位置。影响范围计算来自已声明关系，公式与实现正文留在内容区。
3. **已有 Markdown 与公式渲染能力。** 继续使用项目已经验证过的文档工具；如果未来确实需要完整文档站，再把阅读器嵌入 VitePress，而不是先增加站点框架。
4. **按项目需要的事实提取。** Mica 可运行 dependency-cruiser；有明确 TypeScript 项目时优先使用其编译器能力定位符号。多语言范围扩大后再增加 Tree-sitter；跨仓库导航成为真实需求后再考虑 SCIP。
5. **ADR 的保留原则。** 用独立小记录保存决定和替代原因；让记录引用组件身份与证据，避免覆盖旧结论。[D9]

Cytoscape 与 ELK 留作实时图查询和更复杂布局的替代，不作为首版同时加载的依赖。选定组件的局部机制有时更适合时序、状态、公式或步骤文本；这些展示方式共用对象和来源标识，不必把所有内容转成关系图。

LikeC4 保留为可替换的视图输出：当某个项目已经采用其模型，或多层图形的维护成本明显超过集成成本时，单向生成或读取一份确定的图模型。禁止同时人工维护相同事实的 manifest 与 .c4 两份权威来源。当前不同时引入 Graphviz、Cytoscape 与 LikeC4 三套阅读界面。

这个组合的适用边界是：用户主要阅读和比较经过选择的架构视图，设计在 Git 文件中完成，不需要浏览器自由编辑任意大图。如果未来交互建模成为主要工作，直接采用 LikeC4 比扩大自建阅读器更值得优先评估。正式建设前仍需用三个已选案例测量更新成本；本调查只给技术建议，不构成建设正式产品的授权。

### Graphviz 的实际技术试验与适用限制

本环境已安装 @viz-js/viz 3.25.0，运行时报告内含 Graphviz 14.1.3；远端最新包装版本是 3.31.0，内含 Graphviz 16.1.0。两者明确区分，本轮没有将环境中的旧版本写成最新版。[S13]

本次用四个中文节点构造了旧路径与新路径的并集，实际调用 `renderString(..., {format: "svg"})` 与 `renderJSON(...)`。输出保留了中文标签、自定义对象 id、URL 和新增/撤销 class；相同输入在同一环境连续生成的 SVG 逐字一致。结果记录在配套 `graphviz-probe.json`，输出为 `graphviz-union.svg`。这只验证了生成能力与小型图的确定性，没有验证所有浏览器中的字形、标签碰撞、可访问性或大型图性能。

Graphviz 官方支持节点与边的 URL、自定义 id，以及默认 UTF-8 输入。调用方必须为对象分配唯一 id；不能依赖引擎内部编号跨版本稳定。中文编码支持也不等于中文字体已经正确部署，需要在原型中检查实际渲染和换行。[D11–D14]

比较视图的稳定位置来自**两版并集只布局一次**，不是来自 Graphviz 自动理解版本。切换前后视图时复用这组坐标，隐藏不属于该版的对象；比较模式显示两版增删。普通当前阅读仍应优先展示当前图，不能为了保留历史坐标长期把撤销路线混在当前正文中。节点过多或路线彻底重组时，可切成两个局部机制图并明确对应关系，不承诺任何规模都能无损叠加。

许可证现已按准确版本核实：官方 npm registry 将 `@viz-js/viz 3.25.0` 标为 MIT，并提供该版本的分发摘要；Graphviz 官方 `14.1.3` 标签下的 `COPYING` 明确为 **EPL-1.0**；Graphviz 官网当前上游许可为 **EPL-2.0**。三者分别登记，不从发布日期推断旧包许可，也不将包含 Graphviz、Expat 等上游软件的整个二进制笼统标为 MIT。本轮只使用构建依赖生成 SVG，交付页面不打包 WASM 二进制；后续若分发引擎，应保留锁定版本的完整第三方 notices。配套来源登记保留许可证文件的 URL、字节数和摘要，不复制整份许可正文。[S13, D15–D17]

## 五、源码绑定怎样避免“看起来自动，实际失真”

源码定位应有两个不同职责。固定提交、路径和行范围回答“当时证据是什么”；当前符号解析回答“现在对应实现在哪里”。文件改名后，只要旧提交仍可访问，历史链接依然有效。更新当前链接时，Git 重命名线索、符号名称和内容指纹可以生成候选，但遇到多个同名函数、拆分或合并时应交给设计和实现负责人确认对应关系。[D8]

Tree-sitter 适合查“此文件中有哪些函数，它们在哪些位置”；它的语法查询不会自动得到类型系统中的准确引用关系。SCIP 解决更精确的定义、引用和实现导航，但其符号表示本来就包括包版本和名称描述符，因此不能据此承诺跨任意改名的永久身份。SCIP 官方设计还明确把自身定位为传输格式，并不提供查询存储引擎；为了几十个锚点引入完整索引服务，收益有限。[D6, D7]

这些工具得到的是实现事实。比如 dependency-cruiser 找到一个 TypeScript 导入，只能支持模块依赖存在；它不能证明 MutationObserver 会在正确页面触发，也不能证明某条恢复路径被实际执行。测试源码和测试运行证据必须分开登记，后者应绑定被测提交、输入、命令及结果位置。

Skill 规则和科研公式需要各自适配：规则可用文件、标题范围、精确片段及指纹定位；公式可用文档标题、公式标签和提交定位。没有代码的科研模块可以完整保存设计机制和证据，不需要伪造函数名来通过同一检查。

## 六、复用后的设计检查能力

现成工具能够检查语法、引用、图结构和部分依赖约束。它们不能保证架构完整，更不能因为画出了正常路径就证明失败与恢复设计成立。本系统应把检查分为两类：机器拒绝明确矛盾，例如声称已有实现却没有可解析锚点；人或独立模型判断专业问题，例如失败机制是否覆盖真实风险。

Difftastic 说明了这个边界：代码语法比较可以识别排版变化与表达式变化，但不会解释用户能力、科学假设或产品取舍。LikeC4 的图差异可以说明节点和关系改变，但修改理由和证据仍来自外部记录。ADR 保存理由，却不自动验证理由正确。三者互补，不能用“语义”一词混淆不同层次。[S11, L1, D9]

没有消费方的内部组件、没有传递对象的边和无法展开的关键机制，都可以成为审查提示。是否必须阻止冻结取决于它们是否影响承诺能力及本阶段实现范围。不要把合理的抽象边界、第三方依赖或刻意保留的研究未知都当作错误。

## 七、采用登记

本次完成实际检索、源码核查，以及 Graphviz 的本地生成试验。主原型随后实际用同一版本完成三个项目的构建；[构建记录](prototype/generated/build-report.json)报告 Graphviz 14.1.3、90 个来源锚点和零浏览器运行依赖。其余工具没有因被研究就自动算作已经集成。

| 资源 | 本轮状态 | 建议后续用途 |
| --- | --- | --- |
| Graphviz / @viz-js/viz | BUILD_DEPENDENCY | 已用本地 3.25.0 生成主原型 SVG；浏览器不加载该引擎 |
| Cytoscape.js | REFERENCE_ONLY | 需要实时图查询或编辑时，重新比较其收益 |
| ELK.js | REFERENCE_ONLY | 在布局确有需要时，作为构建或运行依赖 |
| LikeC4 | REFERENCE_ONLY | 最强现成替代与可选图视图适配；新差异功能追踪稳定发布 |
| Structurizr、Site Generatr | REVIEWED_NOT_ADOPTED | 已采用 C4 的项目可重新评估 |
| Tree-sitter、SCIP、dependency-cruiser | REFERENCE_ONLY | 按实际语言与导航需求增加源码适配 |
| ADR 方法 | REFERENCE_ONLY | 采用保留旧决定与标记替代关系的原则 |
| adr-tools 程序 | REVIEWED_NOT_ADOPTED | 首版不引入 |
| VitePress | REFERENCE_ONLY | 已有文档站或文档量扩大时作为承载容器 |
| Difftastic | REFERENCE_ONLY | 按需提供深层代码差异 |
| Backstage | REVIEWED_NOT_ADOPTED | 当前不建设集中开发者门户 |

## 参考资料与检索锚点

以下链接均于 2026-10-27 实际读取。仓库完整提交和日期见 [oss_sources.json](sources/oss_sources.json)；源码引用使用固定提交。引用支持工具事实，组合建议与适用性判断属于本研究。

### 项目资料

- [S1] LikeC4. [主仓与 README](https://github.com/likec4/likec4/blob/f01e7c800654e1e1aeab247e304fb5a6c5d9a4dd/README.md)；[v1.60.0 发布](https://github.com/likec4/likec4/releases/tag/v1.60.0)；[MIT 许可证](https://github.com/likec4/likec4/blob/f01e7c800654e1e1aeab247e304fb5a6c5d9a4dd/LICENSE)。
- [S2] Structurizr. [主仓](https://github.com/structurizr/structurizr/tree/92571b877c52899594351c46189519f1ef256cfd)；[v2026.10.26 发布](https://github.com/structurizr/structurizr/releases/tag/v2026.10.26)。
- [S3] Cytoscape.js. [README](https://github.com/cytoscape/cytoscape.js/blob/9aab1b4489645c15e82fce71fdce738f58d8165d/README.md)；[API 文档](https://js.cytoscape.org/)；[许可证](https://github.com/cytoscape/cytoscape.js/blob/9aab1b4489645c15e82fce71fdce738f58d8165d/LICENSE)。
- [S4] ELK.js. [README](https://github.com/kieler/elkjs/blob/95f18bf65e59b6a8973aece313ddfb04ca9a1bb1/README.md)；[许可证](https://github.com/kieler/elkjs/blob/95f18bf65e59b6a8973aece313ddfb04ca9a1bb1/LICENSE.md)。
- [S5] Tree-sitter. [README](https://github.com/tree-sitter/tree-sitter/blob/dfe770858e3cfd8e8b29a79ea17da390a6f60319/README.md)；[语法查询](https://tree-sitter.github.io/tree-sitter/using-parsers/queries/1-syntax.html)；[查询命令](https://tree-sitter.github.io/tree-sitter/cli/query.html)。
- [S6] SCIP. [README](https://github.com/scip-code/scip/blob/d556dd3c24b3c1787e0b62cd31f25188300e3098/README.md)；[v0.10.0](https://github.com/scip-code/scip/releases/tag/v0.10.0)。
- [S7] dependency-cruiser. [README](https://github.com/sverweij/dependency-cruiser/blob/c5b97371ae93c556c703cfe294af86c9c80ea9fa/README.md)；[结构化输出说明](https://github.com/sverweij/dependency-cruiser/blob/c5b97371ae93c556c703cfe294af86c9c80ea9fa/doc/output-format.md)。
- [S8] Nat Pryce. adr-tools. [README](https://github.com/npryce/adr-tools/blob/b3279baf9be2207d1a4f4bbd608fd0b591c72aee/README.md)；[许可证及生成内容条款](https://github.com/npryce/adr-tools/blob/b3279baf9be2207d1a4f4bbd608fd0b591c72aee/LICENSE.txt)。
- [S9] Backstage. [README](https://github.com/backstage/backstage/blob/ac2de0fcbea3edcb38da36116268aae3cce189c1/README.md)；[技术概览](https://backstage.io/docs/overview/technical-overview/)。
- [S10] VitePress. [README](https://github.com/vuejs/vitepress/blob/415a6a39507af37e282c02eb57ca50594f1bc237/README.md)；[在 Markdown 中使用 Vue](https://vitepress.dev/guide/using-vue)；[多语言](https://vitepress.dev/guide/i18n)；[发布列表](https://github.com/vuejs/vitepress/releases)。
- [S11] Difftastic. [README 与已知限制](https://github.com/Wilfred/difftastic/blob/0b92338c6042152b1fc91c30ed01cf0449070844/README.md)。
- [S13] Viz.js / Graphviz. [固定提交 README](https://github.com/mdaines/viz-js/blob/d3c38383e2d3a47dde8ede185d5ad4f894bd10a2/packages/viz/README.md)；[3.31.0 发布与所含 Graphviz 16.1.0](https://github.com/mdaines/viz-js/releases/tag/release-viz-3.31.0)；[本地使用的 3.25.0 发布与 Graphviz 14.1.3](https://github.com/mdaines/viz-js/releases/tag/release-viz-3.25.0)；[包装许可证](https://github.com/mdaines/viz-js/blob/d3c38383e2d3a47dde8ede185d5ad4f894bd10a2/LICENSE)。
- [S12] Structurizr Site Generatr. [README、静态文档与多分支生成](https://github.com/avisi-cloud/structurizr-site-generatr/blob/a47206271d7cafb5f3f22a355622f6b5d72f4368/README.md)。

### 直接影响设计取舍的文档

- [D1] LikeC4. [模型、链接与元数据](https://likec4.dev/dsl/model/)。
- [D2] LikeC4. [关系导航](https://likec4.dev/dsl/relationships/)。
- [D3] LikeC4. [动态视图](https://likec4.dev/dsl/views/dynamic/)。
- [D4] LikeC4. [命令行与静态构建](https://likec4.dev/tooling/cli/)；[嵌入 Vite 项目](https://likec4.dev/tooling/vite-plugin/)。
- [D5] Structurizr. [静态导出范围](https://docs.structurizr.com/export/static-site)；[决策记录](https://docs.structurizr.com/server/decisions)；[模型即代码](https://docs.structurizr.com/as-code)。
- [D6] SCIP. [设计目标、非目标及传输格式边界](https://github.com/scip-code/scip/blob/d556dd3c24b3c1787e0b62cd31f25188300e3098/docs/DESIGN.md)。
- [D7] SCIP. [符号语法与包版本](https://github.com/scip-code/scip/blob/d556dd3c24b3c1787e0b62cd31f25188300e3098/scip.proto#L150-L235)。
- [D8] GitHub. [固定提交的永久文件链接](https://docs.github.com/en/repositories/working-with-files/using-files/getting-permanent-links-to-files)。
- [D9] Michael Nygard. [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions), 2011-11-15。原文保留旧决定并标记替代；本方案在此基础上增加组件和证据链接。
- [D10] Simon Brown. [C4 图的层次与按需使用原则](https://c4model.com/diagrams)。不要求每个项目机械使用全部四层。
- [L1] LikeC4 main. [模型差异文档与应用后原因丢弃规则](https://github.com/likec4/likec4/blob/f01e7c800654e1e1aeab247e304fb5a6c5d9a4dd/apps/docs/src/content/docs/dsl/diff.mdx)。
- [L2] LikeC4 main. [静态构建模型差异测试源码](https://github.com/likec4/likec4/blob/f01e7c800654e1e1aeab247e304fb5a6c5d9a4dd/e2e/tests/static-build-model-diffs.spec.ts)；本轮读取，未运行。
- [L3] LikeC4 main. [待发布差异变更记录](https://github.com/likec4/likec4/blob/f01e7c800654e1e1aeab247e304fb5a6c5d9a4dd/.changeset/model-diffs-ui.md)；[v1.60.0 完整树核对接口](https://api.github.com/repos/likec4/likec4/git/trees/v1.60.0?recursive=1)。
- [L4] LikeC4. [Erode 集成说明](https://likec4.dev/tooling/community/erode/)。官方标记为实验性、依赖 AI 分析；本轮仅确认其定位，没有把它列为成熟必需依赖。


- [D11] Viz.js. [API：SVG、JSON 与图对象输入](https://viz-js.com/api/)。
- [D12] Graphviz. [URL 属性与 SVG 链接](https://graphviz.org/docs/attrs/URL/)。
- [D13] Graphviz. [id 属性与调用方唯一性责任](https://graphviz.org/docs/attrs/id/)。
- [D14] Graphviz. [charset 默认 UTF-8](https://graphviz.org/docs/attrs/charset/)。
- [D15] Graphviz. [当前上游 EPL-2.0 许可证](https://graphviz.org/license/)。不能用当前页面替代旧版本的许可证文件。
- [D16] Graphviz 14.1.3. [官方固定标签 COPYING：EPL-1.0](https://gitlab.com/graphviz/graphviz/-/raw/14.1.3/COPYING)。本轮实际读取 11,798 字节，摘要保存在配套来源登记中。
- [D17] npm 官方 registry. [@viz-js/viz 3.25.0 精确版本元数据](https://registry.npmjs.org/@viz-js%2Fviz/3.25.0)。标明包装 MIT、tarball 与 dist.integrity。

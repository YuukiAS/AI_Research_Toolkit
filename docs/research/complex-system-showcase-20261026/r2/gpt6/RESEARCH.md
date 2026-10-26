# R2 研究取舍

推荐原生 HTML / CSS / JavaScript、SVG 和一份可校验的结构数据。首页先展示整体架构，节点详情和三条运行路径依附同一张图。桌面与手机分别编排坐标，保持节点、关系和事实一致。本轮制作可离线浏览的静态原型，不建设或接通 Delivery Assurance。

## 为什么重做

R1 两份原型都把系统拆成阶段浏览器、职责列表和证据表，主屏没有完整拓扑。gpt6 首页用大标题和状态卡占据主要面积；gpt56 的设计决定明确让图退居局部。这与读者先建立系统整体认识的目标相冲突。R2 保留原始事实，弃用两份 R1 的页面结构和“系统观察室”品牌。

已读两份 R1 的首页、动态脚本和设计决定。gpt6 原截图已检查；gpt56 仓库的 review/README 仅声称渲染过，未提供截图，另用其原始 HTML/CSS/JS 本地重现检查，不把旧报告中的 PASS 当作证据。两份 R1 只作失败材料；没有读取另一模型的 R2。

## 写作证据怎样改变制作方式

完整阅读 CUHK Date 的 150 条文案及结论（53 A、72 B、15 C、10 D），并读取 Frontend TODO #89、Clear Writing 最新反馈。引用身份见下表。

- 先决定元素是否需要。删掉重复的状态徽章、英雄区口号、每节的英文小标题和对页面本身的解释；完整架构、来源、失败消费者和成本不能为了简洁而删除。
- 普通标签直接命名对象或动作。保留产品专名，删除“义务收束”“任务怎样被接住”等要求读者翻译的表达。
- 单句审校以后通读完整页面。CUHK Date 暴露的主要问题是相邻元素重复同一状态，以及几十个各自通顺的小标题合起来形成模板节奏。
- 不以禁词、字数下降或自评自然度代替编辑。逐条保存取舍理由，并从最终浏览器提取文字，覆盖图内文字、点选详情、场景步骤、折叠内容和手机。
- 最新 TODO 是待解决的维护证据，不能冒称已经发布的新插件能力。

本轮在当前任务使用已安装 Frontend Design 0.4 的 visual、refs 入口及 ux / direction / tokens / responsive 规则；使用 Clear Writing 0.5 的 product-ui-copy、fidelity、zh 规则，读取当前源码中的 response-clarity、chinese-prose、writing-fidelity。实际影响是先冻结页面角色与事实、删除无用内容、逐句编辑、再检查实际渲染。没有外部语言评审者，也没有独立自然度评分程序；最终审校是作者对实际页面的编辑责任。

## 一手技术比较（2026-10-26 读取）

| 来源 | 核实的能力、维护与许可 | 本轮取舍 |
| --- | --- | --- |
| [C4 动态图](https://c4model.com/diagrams/dynamic) | 官方把动态交互放在既有结构上，用顺序和消息解释场景；网站示例 CC BY 4.0。实际查看合作式示例，容器边界和编号消息清楚 | 借用“稳定结构 + 场景顺序”的方法，重新绘图，不复制示例资产 |
| [React Flow / xyflow](https://github.com/xyflow/xyflow) | main README blob 116e99c700ee30bbd29f1631c5b84c897d3631ac；React Flow 12 / Svelte Flow、节点和边事件、分组，MIT。官方示例页面更新到 2026-10-11；实际打开观察默认画布、缩放和小地图 | 强竞争方案。可以关闭拖拽并自定义无障碍，不能说它做不到。当前图规模小、拓扑固定，已有 DOM/SVG 足以实现所需交互；不引入框架及画布状态 |
| [Cytoscape.js](https://github.com/cytoscape/cytoscape.js) | README blob b2c2c153c7081abb35a603f2c64d038b04640c6b；网络分析、关系模型、交互渲染，MIT；维护文档说明持续发布与扩展机制 | 适合大量节点与图算法；本网站不做任意网络查询，canvas 的语义替代还需另写 |
| [ELK.js](https://github.com/kieler/elkjs) | README blob c862107025195fdf083c118b08f72548d561f020；定向端口、分层布局；只计算位置，不提供渲染。LICENSE.md 为 EPL-2.0 | 能帮助大图初排，但并不自动保证中文标注、返修外环或手机布局。当前两种人工布局更可审阅；不装运行时布局器 |
| [Mermaid](https://github.com/mermaid-js/mermaid) | README blob b1e2bcbcef35a8f93002c1832f1136eacc85e386；文本图、文档集成、视觉回归工程，MIT | 适合维护附录；读者需要精确边点击与两种布局，直接操作生成 SVG 会绑定生成器内部结构。主图不用它 |
| [OpenTelemetry Collector 架构](https://opentelemetry.io/docs/collector/architecture/) | 一手说明把接收、处理、输出及实际数据传播接起来，并解释共享接收者导致阻塞的后果。文档 CC BY 4.0 | 借鉴具体载荷与故障传播。实际浏览时 Mermaid 区域未显示图形，不能声称视觉参考验收成功，也不复制该站三栏文档壳 |
| [Vite](https://github.com/vitejs/vite) | README blob 069c468a98123f873f4626f6fb5a666389cdfb45；开发服务器与静态构建，MIT；官方文档明确 TS 转译不等于类型检查 | 若有模块依赖是合理构建入口；当前零运行时依赖、小型离线原型用原生脚本即可，不为了工具名增加构建链 |
| [Astro](https://github.com/withastro/astro) | README blob c7e692c133c3bcd307ed39ec4ed78464602862e0；静态内容与局部交互，MIT；官方 islands 文档支持按需客户端代码 | 多页面编辑站的有力选择。此模板先验证一套结构数据驱动的讲解页，不需要内容集合、路由或组件 hydration；不预设复制 R1 的 Astro 选择 |
| [SVG 链接元素](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/a) | 浏览器标准支持可链接图形与文本，MDN 提供兼容资料 | 使用语义控件、焦点与文字替代；SVG 并非天然无障碍，仍需键盘和实际触屏尺寸检查 |

以上版本身份是本次读取内容，不等于锁定某个未经安装测试的 npm 版本。未复制第三方图、字体、图标、组件源码或整页截图到交付目录；系统字体和原创 SVG 不增加外部素材依赖。选择原生方案的代价是需维护两套坐标，新增节点时必须重新看图；不声称任意大图自动排版。

## 事实来源与当前性

- 共同基线：Toolkit main **6236ea3edc4dd03fd1b367f1b721b9896d71d3ef**，本轮任务、共同失败基线、根目录三份标准及已认可解释范例。
- [CUHK Date 150 条审查](https://github.com/YuukiAS/AI_Skills_Collection/blob/main/docs/design/product-ui-copy/evidence/CUHK_DATE_PRODUCT_COPY_NATURALNESS_AUDIT_2026-09-26.md)，blob **0500cda4cb8a3c4a673c097ab0a98d06e9e498fc**。取其编辑方法，不把交友产品语气搬入技术网站。
- [Frontend #89](https://github.com/YuukiAS/AI_Skills_Collection/blob/main/docs/plugin-todos/web-development.md)，blob **b8ad52cc0efba414cd089f7a0673fba7f19fa10e**；[Clear Writing TODO](https://github.com/YuukiAS/AI_Skills_Collection/blob/main/docs/plugin-todos/writing-style.md)，blob **e6cff4de80644f1e0730bd5346b38b4a95462528**。逐项读取最新 DII 两轮失败、内部编号、无用视觉、非必要英文、断行和整篇失控材料。
- [当前总体架构](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)，blob **914b46054107986bbe0994ade5fbaba898489c5b**，及同目录 ROADMAP。独立 DA 管验收范围和交付判断，workflow-core 管能力组合和消费，Bridge 管运行底层。本轮主图采用这一拟议分工。
- [旧 DA 研究目录](https://github.com/YuukiAS/AI_Research_Toolkit/tree/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT)：CURRENT（本次 blob 36ee75c7e3dfceca5dfab3dbf9adce5d7c9b7520）、01、02、03 的 E1–E8 / D2–D4 / 定义准入和完成接点、04 的 Lucerna、06、11 及两张旧图。旧图把一些判定放在 workflow-core / Bridge，不能当作当前分工图。R3 是用户转交的设计通过，生产接线及七仓启用未证。
- [Lucerna 历史修复](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/results/01054_final_independent_release_acceptance/repair-product-001.md)，同时读取原任务、前后端状态处理和对应回归。历史修复有源码与定向测试记录，该轮未重新构建、启动 Windows release 或完成新的独立 GUI 验收。本原型中的“全显正常”和“旧入口坏了”是故意构造的反例，不是新增历史事故。

后续更新必须重新核对来源。分支内容变化不自动改变此原型中的事实；维护者先审相关主张，再更新模型、文案、截图和证据身份。

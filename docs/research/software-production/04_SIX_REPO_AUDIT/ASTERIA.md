# Asteria：多轮产品失败与验证器失明的具体证据

取证基准：`main@193c033659a7612a99442763077217b130e9b756`，源码版本为 RC19。历史 RC4/5/6/9/10/17/18 报告记录当时的问题，本页不声称它们现在都仍存在。当前代码和局部提取函数实测的缺口另标。

## 决定性组件

| 代号 | 实际入口/专业角色 | 它能证明什么及不能证明什么 |
|---|---|---|
| A-BROWSER | `tests/browser/asteria-v2-rc.spec.ts`，经 `npm run test:browser` 或聚焦 RC 测试 | 已有实际页面点击、键盘、视图切换、几何、样式/状态及截图检查；不是全假测试。存在 `assertNoNodeOverlap`、`assertNoPrimaryTextClipping`、`assertNoEdgeLabelNodeCollision`、`assertLineagePresentationGeometry` 等真实观察。 |
| A-STATIC | `scripts/validate-architecture-rc19.mjs`：`changedProtectedTruthFiles`、`routeGestalt` | 部分检查源码字串，部分实际调用布局模块测路由指标。交叉计数/浮动标签计数在该函数直接置零；只查工作区差异也不能保护已提交改动。不能把该结果解释成所有画面质量通过。 |
| A-CAPTURE | `scripts/capture-architecture-rc19-selfqa.mjs`；`VISUAL_REVIEW_PACK.md` | 对候选网页采图和整理；截图存在不等于执行者或独立模型看懂完整图。 |
| A-PRODUCT | `src/architecture/viewProjection.ts`、`graphPresentation.ts`、`trace.ts`、`session.tsx`；相关 kernel/canonical-trace/cat-trace-bridge 回归 | 实际图布局、投影、递归方向和会话语义。修图形不能偷改模型真值，修方向也不能仅改计数预期。 |
| A-DESIGN | `docs/design/SCIENTIFIC_GRAPH_VISUAL_SYSTEM.md`，Frontend Design 的 `visual-direction` / `research-product-frontend` / 产品交互角色 | 负责科学图整体阅读结构、关系表达和研究者文案；不由布局指标自动判定产品品味。 |
| A-REVIEW | `prompts/reviewers/ASTERIA_GPT_WORK_PARENT_ACCEPTANCE_RC19.md` 中 W01/W05/W06；`VISUAL_ACCEPTANCE_CONTRACT.md` | 真实网页黑盒整体视觉、键盘/响应式、版本交付审查；统计语义的独立审查按变更影响加入。不得给审查者源码/内部答案代替实际UI。 |
| A-DEPLOY | `scripts/smoke-architecture-rc19-public.mjs`、`scripts/asteria-server.mjs`，既有固定公开入口规则 | 核对实际已部署页面/状态与候选，不用本地build或HTTP200泛称线上产品通过。每次应先确认当前正式验收对象，避免改动中途污染审查。 |

## 历史问题与对应控制

| 编号 | 具体问题与原报告位置 | 类型/现状 | 决定性控制与必要补法 |
|---|---|---|---|
| A01 | 核心数学符号原始LaTeX/截断，图不能独立读懂。[R4 P1-A] | 历史 | A-PRODUCT 的数学呈现＋A-BROWSER 实际可见完整公式＋A-REVIEW 科研可读性；不能仅检 `.katex` 存在。 |
| A02 | 1366屏下标题/副标题/lane挤压，Inspector占去中央读图空间。[R4 P1-B/P2-H] | 历史 | A-DESIGN 定布局优先级，A-BROWSER 实際两种viewport测完整画面；不能隐藏核心信息换无溢出。 |
| A03 | Clear 后递归计数、layer和高亮残留，Inspector却切到另一个对象。[R4 P1-C] | 历史状态矛盾 | A-PRODUCT 原子重置会话；A-BROWSER 按完整操作序列检查所有可见下游，不能只测按钮响应。 |
| A04 | Light主题非选中节点/边像水印，trace开启后上下文不可读。[R4 P1-D；R5 P2-H；R6 P1-B] | 多轮历史复发 | 共享主题状态最低可读性与非纯颜色区分；真实截图整体审查＋可计算对比/样式检查。不能Dark通过推Light。 |
| A05 | 活跃追踪路径交叉、方向和层级不清。[R4 P2-A；R6 P2-F] | 历史 | A-DESIGN 定义关系表达，A-BROWSER 观察实际路由/标签与选中前后，专业审查判断能否顺着读。 |
| A06 | Inspector像schema调试面板，同层堆满字段。[R4 P2-B] | 历史信息架构错误 | 产品交互角色先决定意义、重要性、公式、关系、约束、次级元数据的层级；文字润色不能解决结构过重。 |
| A07 | 发布/工程标识、内部ID、验证细节、raw JSON进入主阅读层。[R4 P2-C；R5 P2-E] | 历史 | A-DESIGN 分主阅读与高级工具；A-BROWSER 检查默认隐藏/展开操作；A-REVIEW 检查正常用户可理解性。 |
| A08 | 跨图搜索缺结果来源/空状态/跳转反馈，旧trace掩盖结果。[R4 P2-D] | 历史 | A-BROWSER 用真实搜索输入与点击，检查目标view/entity和提示；不直接操作store冒充用户路径。 |
| A09 | 视图已Lineage/Evidence，右侧外层仍叫Architecture。[R4 P2-E] | 历史 | 单一活动视图源传播到导航、画布、标题/Inspector；快速切换与cross-view路径回归。 |
| A10 | model selector键盘难到达，Tab穿越大量节点才到控制区。[R4 P2-F] | 历史 | A-BROWSER 从fresh页面实际Tab、切模型、skip；树中元素存在不能代替可达。 |
| A11 | 新研究者不理解Project/View/Model及三个视角用途。[R4 P2-G；R5 P2-G] | 历史认知问题 | A-REVIEW 以首次使用任务检验；A-DESIGN 增加简短上下文，不自动造庞大向导。原R4未逐项证实的三个P1不重复升级。 |
| A12 | Restore后搜索和旧状态半恢复，操作提示跨新上下文残留。[R4 P3；R5 P2-I] | 历史 | A-PRODUCT 定义持久/瞬态边界；A-BROWSER Save→改动→Restore→再导航，检查旧反馈不冒充当前事实。 |
| A13 | 全图同时塞入过多节点、边、徽章，虽能渲染仍无法读模型。[R5 P1-A] | 历史产品方向问题 | A-DESIGN 分总览/完整探索，保留全部科学语义；不是删节点/假固定图让指标好看。 |
| A14 | Recursive/Both在中途同时走入边和出边，方向集合错误。[R5 P1-B] | 历史真实算法缺陷 | `trace.ts` 从根严格按两种方向分别求集合，Both合并；以有中途反向路径的小图验证，不能只修UI计数。 |
| A15 | 清空后默认选中又自动激活trace，形成假清空。[R5 P1-C] | 历史 | `session.tsx` 区分选中与追踪激活，Save/Restore包括激活状态；A-BROWSER 断言Clear后trace确实关闭。 |
| A16 | 开放尾对象被列为孤立，必要关系缺失。[R5 P2-A] | 历史科学来源/图关系问题 | 统计/模型领域审查核对原始定义，只补有文本支持关系；禁止为了零warning发明科学边。 |
| A17 | 公式带分组/列索引，元数据却显示无索引。[R5 P2-B] | 历史 | canonical-trace回归＋领域审查显式源记号，不能正则猜未知索引后冒称正确。 |
| A18 | 证据或定理待完成却显示“不适用”。[R5 P2-C] | 历史语义错位 | 区分科研进度与观察状态的模型；A-BROWSER核对用户文案，来源不能混成一个枚举。 |
| A19 | 数据集被叫Claim Inspector，递归上下文却显示直接关系说明，切对象仍停在旧滚动位置。[R5 P2-D] | 历史 | 实体类型和活动追踪分开，切换后重置必要呈现；真实序列验收而非分别拍终态。 |
| A20 | Why it matters、Evidence缺口和Diff解释都是图拓扑/数量模板，不是科学意义。[R5 P2-F；R9 Must-fix4；R10 Must-fix3] | 多轮历史复发 | `research-product-frontend`及统计领域模型依据现有科学源撰写；实际看全文，不把入/出度计数当解释。 |
| A21 | skip links在可访问性树里却不是可靠首个可见Tab入口。[R6 P1-A] | 历史 | A-BROWSER fresh-page第一/第二Tab及真实焦点跳转；DOM/aria存在不是可使用证据。 |
| A22 | Advanced折叠控件鼠标、Enter/Space都不可靠。[R6 P2-A] | 历史真实交互失败 | controlled disclosure真实操作→aria/可见内容同时变化；本轮读取的浏览器RC10测试已覆盖多种操作。 |
| A23 | 顶部Export只触发隐藏动作，用户无反馈。[R6 P2-B] | 历史 | A-BROWSER 点击真实顶部入口，验证区域展开/定位/焦点或实际导出反馈，不直接调内部按钮。 |
| A24 | 紧凑顶部按钮无可访问名称、目标太小。[R6 P2-C] | 历史 | 对实际compact状态测可达名称/目标尺寸/焦点，必要专业复核；普通宽屏截图不能关闭。 |
| A25 | Full model没有可发现的局部缩放/平移/复位；Fit仅缩成一张极小海报。[R6 P2-D；R17] | 历史 | A-PRODUCT 根据实际可用画布和节点边界处理视图；A-BROWSER测按钮真行为，A-REVIEW判断文字读不读得出。 |
| A26 | label/value贴在一起，如ProjectCurrent。[R6 P2-E] | 历史 | 共享文字布局样式＋实际screen检查；不能只检测文本字符串包含正确单词。 |
| A27 | Lineage多条粗曲线/平行线在目标前形成巨大结，关系文字漂在线上。[R9 Must-fix1] | 历史整体关系语法失败 | A-DESIGN 重新组织源/关系/目标布局，保留多种真实语义而减少重复视觉连接；逐个调箭头不足。 |
| A28 | Lineage目标靠右裁切、source副标题仍是schema语言。[R9] | 历史 | A-BROWSER依据实际节点bbox与安全区；A-REVIEW核对语义主次；不能以tooltip补被裁主对象。 |
| A29 | 只优化CAT总览，Full model及Original TRACE节点仍重叠。[R9 Must-fix2] | 历史覆盖偏差 | A-BROWSER实际两个模型、两种detail、规定尺寸回归；改共享布局必须覆盖所有消费者。 |
| A30 | 数学转为大写ASCII或KaTeX在容器内碎裂成竖排。[R9 Must-fix3；R10 Must-fix1] | 历史，依赖存在不代表效果 | 专用公式容器/局部滚动及真实渲染检查；不改科学内容，不能“KaTeX存在”直接通过。 |
| A31 | Advanced显示已折叠但rawJSON/警告仍可见。[R9 Must-fix5] | 历史 | A-BROWSER断言aria=false时内容实际不呈现，鼠标/键盘/顶部入口一致，不只更换图标。 |
| A32 | 主科学卡片使用line-clamp/省略号，核心名称不可识别。[R10 Must-fix2] | 历史设计允许的信息丢失 | 移除主标签截断并以新尺寸重新布局；A-BROWSER核对实际scroll/box尺寸，tooltip不是替代主内容。 |
| A33 | “没有碰科学真值”的执行者报告被用于复用旧专业审查。[R6、R9、R10 复审策略] | 条件性有效做法，证明链须补全 | 用批准基线到当前候选的实际diff及行为范围核对，再保留无影响结论；不能信布尔自报，也不每轮全量重审。 |
| A34 | trace关闭时普通选择仍改变可见节点/布局，违背“只更新Inspector”。[R17 Root cause] | 历史可复现 | `selectDisplayEntityIds`不因普通选择揭示新依赖；A-BROWSER连续选择前后节点集合、坐标和路径保持稳定。 |
| A35 | 使用固定虚拟画布和高度推导缩放，Fit不依实际render范围。[R17 Full-model fit] | 历史根因 | A-PRODUCT用实际容器/节点范围与可读比例，测试不同尺寸，不为一个样例固定坐标。 |
| A36 | Work未充分发现全局箭头/标签噪音，用户截图推翻受影响通过。[R17 Human override] | 历史审查漏检 | A-REVIEW先整屏再检查细项，真实用户反证使相关结论失效；不拿上一轮通过辩护。 |
| A37 | 去箭头、去标签仍未解决长绕行/蛇形曲线，route-first架构本身错误。[R18] | 历史关键架构失败 | Planner/视觉设计角色将节点排列与路由共同设计，改变通用布局机制；不是继续降低指标阈值或补小边距。 |
| A38 | RC18生产者自评零问题、完整回归通过，后续独立W01仍失败且用户指出更大问题。[R18；OUT18] | 历史实际证据冲突 | 开发自评仅能提交验证；A-REVIEW独立完整观察，统计结果不替代整体品味。 |
| A39 | RC19结果记录修改若干旧RC验证器后测试通过。[OUT19] | 当前报告事实；不据此指控作弊 | 对合法布局重构允许迁移旧测试，但逐项保留旧行为、解释旧实现细节何时退役；独立审核预期变化，不能新实现决定全部标准。 |
| A40 | `routeGestalt`的交叉数和浮动标签数直接赋0。[AS] | 当前源码缺口；本轮提取函数负例已执行 | 必须从真实几何/可见标签测量，缺测应未验证；已构造交叉/标签输入仍回0，见局部实测报告。不能把保护这份脚本原样当可靠。 |
| A41 | routeRatio/routeScore缺失被当0，可让没有测量的数据看似最佳。[AS] | 当前提取函数实测 | 对每条必要边要求有限有效测量或独立重算，缺值不是零。坏数据拒绝与正常路径都要验证。 |
| A42 | 科学文件保护用无基准`git diff --name-only --`，暂存和已提交修改不在检查内。[AS] | 当前缺口；本轮临时Git实验验证 | 使用明确批准基线与候选完整diff，另查脏工作；不能只要求clean就声称未改变科学内容。 |
| A43 | 浏览器 `rc19RouteGestalt`仍把交叉计数置0；部分路径只依应用自己暴露的data-route指标。[AB 约2250行后] | 当前源码观察，未运行全浏览器suite | 独立几何测量校准这些属性；当前RC19测试有真实标签检查，但不应报告未测交叉。之前一些旧硬门槛在layout-first分支跳过，需明确哪些保证由什么新检测替代。 |
| A44 | 测试文件/命令按RC不断累加，旧断言随新实现改写，可能形成昂贵而失真的“累计保护”。[AJ；OUT19] | 当前结构事实及维护风险，未测耗时 | 归并稳定用户性质和失败机制，保留有效回归，不因编号累加无限新套件；任何删减需逐项说明保护去向。 |
| A45 | 审计目录README还写RC10，而当前package/有效任务是RC19。[AR；AJ] | 当前文档状态不一致 | 当前候选由实际任务/代码绑定，历史摘要标历史，不从一个名为README的旧文件自动重置流程。 |
| A46 | 测试/截图成功和公开URL刷新被混成可发布成品。[OUT19；AV] | 来源已要求分层，实际消费仍须验证 | A-DEPLOY验证对象，A-REVIEW验证产品；稳定发行只有有效范围通过，不能在ui上泄漏“已验收”伪声明。 |
| A47 | 低严重度/部分未测条件被机械扩大为每轮六路重审。[R6 §下一轮；R10 §策略] | 已有正确裁剪经验 | 按真实触及范围决定W01/W02/W03/W04/W05/W06；保留明确获准延期项，不能移动终点。 |

## 本轮真正运行的局部反证

在对话的隔离容器中，对从 AS 提取的 `routeGestalt` 和同样 Git 参数做了只读语义实验：交叉/浮动标签不会改变两个常量；缺路由指标产生零；工作区diff看不到暂存和已提交修改。未运行 Asteria 应用，未改变仓库代码，未声称发现全部浏览器测试漏洞。详细复现脚本和结果见本目录的 `probes/` 及 `OBSERVATION_LIMIT_PROBES.md`。

## 对架构的直接要求

要同时有产品设计纠偏、科学内容保护、独立真实测量和整体审查。仅冻结检查器会冻结A40–A43的盲区；仅增加Reviewer仍可能重复A36/A38；仅更多回归会放大A44。可靠路线必须说明旧方法为什么漏检，替代测量怎样对已知坏情况有反应，并同时保留正确产品能通过。

## 来源

[R4]: https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/docs/operations/blackbox-audit/reports/RC4_CONSOLIDATED_REPORT_2026-09-12.md
[R5]: https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/docs/operations/blackbox-audit/reports/RC5_REAUDIT_CONSOLIDATED_REPORT_2026-09-12.md
[R6]: https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/docs/operations/blackbox-audit/reports/RC6_REAUDIT_CONSOLIDATED_REPORT_2026-09-13.md
[R9]: https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/docs/operations/blackbox-audit/reports/RC9_FULL_REAUDIT_CONSOLIDATED_REPORT_2026-09-13.md
[R10]: https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/docs/operations/blackbox-audit/reports/RC10_WAVE_A_REAUDIT_CONSOLIDATED_REPORT_2026-09-13.md
[R17]: https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/prompts/tasks/asteria_v2_rc17_parent_acceptance_review.md
[R18]: https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/prompts/tasks/asteria_v2_rc18_parent_acceptance_review.md
[OUT18]: https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/results/asteria--rc18-quiet-graph-convergence/result.md
[OUT19]: https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/results/asteria--rc19-layout-first-graph-convergence/result.md
[AS]: https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/scripts/validate-architecture-rc19.mjs
[AB]: https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/tests/browser/asteria-v2-rc.spec.ts
[AJ]: https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/package.json
[AR]: https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/docs/operations/blackbox-audit/README.md
[AV]: https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/docs/operations/blackbox-audit/VISUAL_ACCEPTANCE_CONTRACT.md

本页按上述去重汇总报告的原问题分类逐项登记，保留同机制多轮复发来源；未逐一阅读全部RC7/8/11–16原始审查全文，也未新看真实截图。因此不能宣称整个历史所有细项穷尽，更不能称当前47项未修复。遗漏边界列入总覆盖表，而不是隐藏。

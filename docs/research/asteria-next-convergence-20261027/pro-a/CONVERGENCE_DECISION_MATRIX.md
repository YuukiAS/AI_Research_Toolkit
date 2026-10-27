# 四版历史候选能力裁决矩阵

日期：2026-10-27。身份：本轮 pro-a 内部研究输入；不是正式 Critic 结论。矩阵在本轮新原型实现前形成。只读取下列历史固定提交，未读取本轮另一位 Pro 的分支或产物。

## 对照源

| 缩写 | 固定历史源 | 主要核对位置 |
|---|---|---|
| R2-6 | `1508994fd3b4e478d5a39c569d42cb87460de77e` | `docs/research/complex-system-showcase-20261026/r2/gpt6/`：DESIGN、ARCHITECTURE_MODEL、QA、原型及截图 |
| R2-56 | `a76aafa6d48eb9b947d5683cae35aa3e41141c96` | 同级 `gpt56/`：DESIGN、ACCEPTANCE、原型及截图 |
| P-6 | `c733aa065d9ad102a64bb5f5f55453cd31a7e7bc` | `docs/research/architecture-evolution-system-20261027/pro-a/`：全套研究文档、model-core、模型测试、UI 测试、全部 7 张截图 |
| P-56 | `4322881023b40f70352d5cc380c585d90098fb12` | 同级 `pro-b/`：全套研究文档、schema、model.js、app.js、4 张真实状态截图 |
| Work | `ce8442b799e0096b79367da701289255bfa23bd3` | R2 `comparison/COMPARISON.md`、`editorial-audit/` 的审查及修订原型 |

下表“采用”是依据历史比较提出的本轮单一决策输入。存储对象如何落到现有 Asteria 由主规格映射确定；不能据此再建一个同义 Ledger 数据库。每格区分已经做出的交互与仅存在于研究中的设想。

## 逐能力裁决

| 能力 | R2 GPT-6 值得保留的部分 | R2 GPT-5.6 值得保留的部分 | 上轮 GPT-6 值得保留的部分 | 上轮 GPT-5.6 值得保留的部分 | 本轮采用及理由 | 其余为何不采用 |
|---|---|---|---|---|---|---|
| 系统整体可读性 | 14 节点完整拓扑首屏成立；先看谁与谁协作 | 责任分区与低饱和状态色 | 固定位置切当前/历史，系统与局部上下文相连 | 三项目共用工作台，项目切换清楚 | 桌面先给可读系统投影，选择后保留邻域与位置；能力图不等于文件树 | R2-56 中央边标签拥挤；P-6 文档与元信息挤压图；P-56 默认右侧节点被面板遮住，不能因外观整齐继承其构图 |
| 节点上下游探索 | 点节点高亮真实入边、出边与邻居 | 列表与图选中同步 | 稳定身份和旧/新关系联合影响查询 | 组件目录按分组搜索 | 一个选择状态驱动图、目录与详情；直接列明上下游关系，可从关系跳到另一端 | 不再显示每节点完整五至九字段；不靠全图淡到无法辨认来强调焦点；不能把影响候选当作已证实运行影响 |
| relation / payload / consumer | 边可点击，载荷、实际消费点、接线事实直接可见；命中层独立于标签 | 类型与状态同载荷表达 | 生产/消费锚点按用途区分；删除关系仍能审查旧消费者 | relation 含 type、payload、mechanismPoint、failure | 关系成为可检查、可导航对象；一条边回答传什么、谁在哪消费、失败后如何处理，细节按需要展开 | R2-56 部分标签点击无响应、交叉位置会错选；多数未遮挡线段中点可正常选择；P-56 复述“为什么这条边可审查”没有新增信息；不能用组件名称充当消费点证据 |
| 正常路径 | 同一拓扑 5 步前进后退，当前步骤与节点/边同步 | 同数据导出精简移动阅读路径 | 将路径与机制联系 | relation.style 提供 normal 分类 | 当前图上的路径选择与逐步阅读保留；手机将路径步骤置前 | 不另画第二套不一致流程；P-56 只有按边类型过滤，不能替代完整任务路径 |
| 失败路径 | 7 步显示失败发现、结果传递、原任务返修 | 失败责任和未接线状态清楚 | 失败触发证据可接入因果历史 | 机制含失败处理、关系含 failure | 失败从具体 claim/finding 回到责任对象，再关联返修与复验 | 不能用一个红节点代表失败全过程；不把 validator 自动修复写成事实；失败反馈不能绕过原制作任务 |
| 恢复路径 | 失败后修复、重验回到交付；不是重启一个孤立任务 | 移动端顺序可读 | correction 与 rollback 不覆盖旧证据 | 独立 recovery 边类型和机制状态转换 | 恢复是带触发、守卫、消费点的路径；修复产出新候选，使部分证据重新评估 | 不能只展示 happy path 的反向箭头；机制中的“由目标处理”泛化兜底不足；不复制复杂执行状态机 |
| 旧功能保护 | 第三条 7 步旧功能路径，候选与已接受基线对照 | 已接受能力单独辨识 | unchanged guarantees、作用域化证据和联合关系影响 | 变更记录有 unchanged 项 | 为变更声明具体保留行为及其证据；展示受影响与可保留的证据 | 不将“未变化”当作自动回归通过；不为每个小修改生成整页保证口号 |
| 组件机制下钻 | 责任与输入输出是有用起点 | 负责/不负责/缺口的边界辨识 | 机制是可引用的结构化内容块，允许状态/sequence/公式/算法 | System→Mechanism→Implementation→Evolution 导航完整，renderer 类型清楚 | 选中后打开对象适配的机制视图；保留上下文，renderer 服从内容 | R2 输入输出表无法替代内部机制；P-56 STATE 字段和 state-chip 列表不等于可理解的状态机制；不所有对象套同一张机制卡 |
| 源码 / Skill / 科研实现下钻 | 来源能打开实际契约 | 数据/交互/样式独立，便于源定位 | 区分定义、入口、消费者、test；Skill 控制文本/安装件/加载态分开；数学机制可停在合法开放状态 | 四种 Mica 机制与 CAT 数学机制共享导航 | 从能力→机制→实现责任→固定源码/契约/公式来源→证据；每层有真实对象和合法空状态 | 不展示文件树冒充架构；不为 design-only 补 package/function/test；不以安装文件证明实际运行加载 |
| source anchor | 真实来源入口（部分仍是分支链接） | 统一数据中的可追源字段 | repo+完整 commit+path+symbol/section+range/hash；稳定职责身份独立于路径；重定位是建议 | 九对象中 Anchor 独立，类型可区分 test/result/source | 复用 Asteria 既有 source/implementation binding 的一个固定锚点身份系统；加入用途与失效语义 | 不从两个旧模型各抄一个 Anchor；行号不能独立作为身份；自动文件移动不能静默改历史 |
| design / implementation / evidence | 已实现、已定合同、设计方案、未接线分开 | 点/虚线/文字共同表达状态 | 三类事实独立，证据保留 claim 与候选作用域 | 三轴清晰可扫描 | 语义三分离；当前对象一处主要状态摘要，证据用事实说明其支持什么 | 不采用 P-56 每处都画三条状态条；`validated` 不得因有 test 链接自动成立；不把三轴加总为完成率 |
| revision | 尚无架构修订能力 | 尚无架构修订能力 | Git commit≠架构修订；scope+context 的局部历史严谨 | Project/Revision 父子关系和当前修订清楚；Mica原型仅当前一版 | 有意义变化生成作用域化修订，源码观察更新可以独立存在；当前优先 | 不把每次提交变成架构事件；不把历史局部 Mica 0.1.6 当作全系统快照；不强制巨型时间线 |
| semantic diff | 同图切路径的稳定位置经验可复用 | 状态渠道可复用 | 按稳定 id 和语义字段 diff；旧新联合图；排除布局、排序、颜色；测试覆盖删除消费者 | before/after 与变更种类直观 | 对选定对象显示 before/after、关系重定向、原因与源码跟进；上下文对象显式标为上下文 | P-56 原型只按已填 change.targetId 给当前图着色，不能说明删除对象消失；不把行级文本 diff 当架构变化 |
| 为什么改变 | 失败回路说明修改触发来自哪 | 路径文案能指明返修入口 | trigger→evidence→reason→decision→changed object→impact，校验不可改写冻结原因 | Change/Decision/Evidence 串联，局部 Evolution 面板 | 组件局部历史默认给最近有意义变化，展开可追触发证据、权衡、实现与未变部分 | 不只给“优化”“修复”或 commit message；不为每个布局修改制造 Decision |
| 被撤销路线 | 可把失败分支放在同图，但无科研路线历史 | 无专门模型 | superseded/withdrawn 和追加 correction；历史来源不被新证据回填批准 | CAT 的 Laplace 旧路线撤销与替代探索显式 | 旧路线保留身份、撤销依据、影响范围、替代路线是否接受；默认收进局部历史 | 不删除失败科研路线；不将“已撤销”直接等同于替代实现已完成；不默认铺满历史路线 |
| blocker | 未接线与需求未解决可区分 | 当前缺口易扫描 | blocker 指向机制/假设/依赖及受阻范围，允许局部可推进 | Issue targets 与严重程度可导航 | 阻断指向具体能力/机制/要求，说明何事解除；开放问题可存在于冻结范围外 | 不全项目一票阻断；不把所有 open assumption 都染红；不向用户默认暴露 GAP-01 等研究编号 |
| drift | 未实现接线有事实边界，但非版本 drift | 设计与已有能力差别明确 | 双向 drift；source observation 固定提交；不依据时间判定；code rollback不自动倒回设计 | alignment 是比较判断，不硬加第四个完成轴 | design ahead / code ahead 都可表达，关联基线与观察提交；变更提出重绑/复核而非自动承认 | 不声称永久实时同步；不把代码更晚自动判为跟上；不将源码链接有效当作语义对齐 |
| Architecture Freeze | R2 强调审查事实边界，有起点 | 验收表覆盖交互和真实性 | 冻结有作用域；结构校验与产品/科学判断分开；不可变基线支持 | 冻结契约较完整，机制/载荷/失败/验证/原因都可检查 | 一份范围明确的设计契约：机械矛盾阻断，专业结论保留判断者与依据；承认设计完整但实现未开始 | 不用填字段数量评分；accepted无机制需解释黑箱边界；测试文件存在不能等同已验证；结构无错误不能宣布产品通过 |
| mobile | sheet、焦点限制/恢复和 Escape 实测；同数据 | 路径先读、非路径组件目录较合理 | 手机组件列表取代大画布 | bottom inspector 有触达价值 | 重排为当前任务路径/对象列表→机制→实现/证据/局部历史，图按需打开 | R2-6 1710px 高 SVG埋没任务；P-56 横向画布裁掉关键节点；R2-56 对照表820px溢出362px容器；不能仅缩放桌面 |
| large graph | 明确手工图适用约20个主节点，诚实边界 | 分组和搜索基础 | Graphviz 构建期布局已真用；研究 LikeC4 层级/投影 | 研究 Cytoscape+ELK，但原型仍手工 SVG | 本轮必须定义系统投影/邻域/折叠/搜索与固定选择；成熟布局库解决排列，Asteria解决意义 | 不为大量节点继续手工坐标；不承诺原型已验证千节点；也不一次混装多套运行图引擎 |
| 中文内容 | 能把失败回路说清楚 | 局部责任边界表达更短 | 因果、历史限定、科学未知表达准确 | 导航词总体易懂 | 保留准确术语与具体主语；按对象写有信息增量的句子；真实DOM去CSS连续阅读终审 | R2 全字段说明像报告；P-6 元说明过多；P-56“为什么这条边可审查”“诚实边界”等解释系统自身价值，不服务任务 |
| 内容取舍 | 完整事实材料可供深层查看 | 数据分离便于编辑 | 分层与按需历史原则 | 机制/实现/演进标签提供渐进披露 | 先决定存在性，再写文案；每个状态一个主要位置；零额外说明合法；每个对象允许不同信息量 | 不继承任何固定字段数量；不把所有KEEP/DELETE结果变成新schema；图已清楚的连接不全文再讲 |
| 视觉层级 | 整体拓扑和所选对象区分稳定 | 状态用点、线、文字多渠道 | 当前与历史层区分，不用默认长时间轴 | 紧凑顶部、目录、画布、详情结构更像产品 | 建立新的 Asteria 字体/间距/层级；图可阅读，细节有呼吸，选择不丢全局 | 不直接用任一旧主题；P-6 小字浅色和长面板；P-56 空画布面积大却节点被遮；R2-56巨标题抢占首屏 |
| theme | 仅明亮主题，没有双主题能力可继承 | 仅明亮主题 | 仅明亮主题 | 仅明亮主题 | light/dark 分别定义层级、代码、公式、状态、diff、焦点的语义 token，并逐页检查 | 不把背景反色视为完成；无历史版本具备可直接采用的成熟 dark |
| accessibility | 节点/关系键盘、mobile dialog焦点与回返实际测试 | 状态非颜色唯一编码 | 图对象 role/button、键盘导航测试，链接安全校验 | 原生dialog基础可保留 | 交互节点/边提供真实按钮语义或可达等价列表；可见焦点、回返、44px主触点、reduced motion、非颜色diff | P-56 SVG g只监听click，不能继承；不能因无横向overflow就认定移动可用；不宣称完整screenreader认证 |
| maintainability | content/layout/controller/build 分层，自包含静态交付 | 单一 architecture-data + app + styles 最清楚 | build期布局、模型验证、语义diff测试有真实行为价值 | schema+typed renderer方向清晰 | 一个canonical数据源→投影→renderer，内容/交互/token分开；只为语义不变量与核心回路写测试 | 不把四项目做四网站；不保留手工SVG作为最终大图方案；不添加账号/云/数据库/agent运行时 |
| source of truth | content.cjs主源，model.json生成；源研究可追 | architecture-data.js 是原型唯一数据 | Git 原生声明+固定源事实+生成视图，设计权威与源码观察分开 | Ledger清楚声明外部源码权威 | 延续现有Asteria canonical semantic graph；研究文档/源码/运行记录仍各自权威，UI仅投影和引用 | 不另建 Architecture Ledger 或 architecture workset 平行产品；不以图颜色覆盖源码事实；不手工维护第二套同义模型 |
| Artifact 验收扩展 | 交付候选/验收/返修/旧能力回路可复用 | 校验职责分层有帮助 | 证据绑定候选、方法、环境、条件的原则最可移植 | Issue、Evidence、Change的关系可借 | Tutorial 引入artifact/page/object/requirement/finding投影；修复使证据按依赖失效，机械与专业结论明确 | 四旧版均未实际覆盖Tutorial；不能宣称历史通用性已验证；不可只添第四项目标题复用软件函数卡 |

## 三个有证据支持的总体裁决

1. **R2-6 的同图逐步路径不能丢。** 真实 A/B 评分 86 对 82 是来源审查结果，不是本轮自评分；它具体胜在全局图、逐步路径和真实鼠标连接命中。P-6/P-56 的历史模型不能补偿这些日常理解能力的退化。[实际比较](https://github.com/YuukiAS/AI_Research_Toolkit/blob/ce8442b799e0096b79367da701289255bfa23bd3/docs/research/complex-system-showcase-20261026/r2/comparison/COMPARISON.md)
2. **P-6 的局部历史与事实绑定是最重要的底层输入。** 历史之外的当前上下文不可冒充历史未变；删除关系还须保留旧消费者；source/test definition/运行证据不能混用。原型 `model-core.mjs` 与 `tests/model.test.mjs` 已将这些做成可执行约束。[模型测试](https://github.com/YuukiAS/AI_Research_Toolkit/blob/c733aa065d9ad102a64bb5f5f55453cd31a7e7bc/docs/research/architecture-evolution-system-20261027/pro-a/prototype/tests/model.test.mjs)
3. **P-56 的分层导航值得保留，外观与九对象数据库不能直接继承。** 其原型 `app.js` 对节点/关系主要绑定click，diff只给当前对象上色，状态在目录/图/面板重复；较强的视觉第一印象不覆盖这些实际缺口。Asteria已有语义图，下一步是归一映射而非再立产品。[原型实现](https://github.com/YuukiAS/AI_Research_Toolkit/blob/4322881023b40f70352d5cc380c585d90098fb12/docs/research/architecture-evolution-system-20261027/pro-b/prototype/app.js)

Work 的内容裁决进一步约束全部取舍：删去无信息增量的卡片与说明，按需展开，手机重排，整页真实状态审查。[审查报告](https://github.com/YuukiAS/AI_Research_Toolkit/blob/ce8442b799e0096b79367da701289255bfa23bd3/docs/research/complex-system-showcase-20261026/r2/editorial-audit/EDITORIAL_AND_CURATION_AUDIT.md)

## 本轮历史交互复核补充

本轮用真实鼠标分别点击R2 GPT-5.6的可见边标签与线段中点：有些标签不响应，交叉位置存在误选；多数未被遮挡的线段中点能正常选择。SVG水平线的零高度边界还会让Playwright定位器报告不可见，这一自动化限制已用实际鼠标坐标复核，不能将它误写成用户无法点击。旧Pro-B的CAT两条关系标签确实重叠，其中一条截获另一条点击。完整观察见研究输入 [历史浏览器观察](sources/history-browser-observations.json)与[边命中复核](sources/history-r2b-pointer-observations.json)；这不改变矩阵对可命中边、真实消费者与键盘等价入口的裁决。

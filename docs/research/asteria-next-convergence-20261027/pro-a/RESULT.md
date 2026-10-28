# Asteria Next · Pro-A 最终候选

**继续演进 Asteria：用一套语义模型连接当前系统、组件机制、真实实现、验证证据与局部修订。** 首页让用户看清系统；细节跟随所选对象展开；检查帮助 Chat 在冻结前发现缺口。产品不增加第二套 Architecture Ledger，也不把字段数量当作架构质量。

本轮给出唯一候选，等待下一轮 GPT Work 黑箱比较与 Chat 裁决。没有修改正式 Asteria 或四个来源项目，没有创建 PR，也没有实施正式 Asteria Next。

## 直接查看

- **[打开完整交互原型](prototype/preview.html)**：下载后可直接在浏览器打开，无需服务器；代码、字体、公式和两套主题均已打包。GitHub 文件页展示的是源码，需下载原文件。构建方式见 [prototype/README.md](prototype/README.md)。
- **[唯一产品规格](ASTERIA_NEXT_CANONICAL_SPEC.md)**：产品边界、信息架构、核心语义、设计方法、版本与实施顺序。
- **[四版逐项裁决](CONVERGENCE_DECISION_MATRIX.md)**：28 项能力分别说明四个输入保留什么、最终采用什么以及为何舍弃其余做法。
- **[制作者内容与视觉审查](CONTENT_AND_TASTE_AUDIT.md)**：真实页面的取舍、修正、截图与剩余边界。
- **[GitHub 交付回读](DELIVERY_READBACK.md)**：固定内容提交、逐文件摘要、原型身份与写入范围的实际核对。

原型入口 SHA-256：`6d2ddbff4fb56d5288614345067a7e379a3bbde2c99552e24cf9f3eba739147b`。浏览器证据由 r6 完整覆盖、事实修正复验和最后的关系差异显示复验组成，各自保留被测文件身份；详见 [producer-final-verification.json](qa/producer-final-verification.json)。

## 最重要的取舍

| 输入 | 保留下来的能力 | 最终没有沿用的做法 |
|---|---|---|
| R2 GPT-6 | 全系统拓扑；可选节点和关系；同图正常、失败、恢复、旧能力保护路径 | 把同一交接再铺成大段说明；用交付流程覆盖所有项目的机制表达 |
| R2 GPT-5.6 | 更清楚的状态与内容层级；数据、交互、样式分离；手机按路径阅读 | 让状态表达挤占系统主体；关系只看标签却难以真实选中；缩放桌面图作为手机默认 |
| 上一轮 GPT-6 | Git 中的来源权威、固定锚点、稳定身份、局部历史、双向 drift、因果修订 | 平行“架构工作集”产品及繁重审计外壳；默认把研究解释全部带进界面 |
| 上一轮 GPT-5.6 | 系统到机制、实现与演进的阅读顺序；范围化 Freeze；不同机制的 renderer | 九类同义根对象另建 Ledger；用当前图着色代替包含旧对象的语义比较；复用既有视觉模板 |

最终把这些能力收敛进 Asteria 已有实体、符号、类型化关系、variant、投影和 lineage。共享锚点与修订成为 canonical 根对象；已有 repository bridge 的 binding 规范化为共享绑定。Component、Mechanism、Evidence、Decision、Finding、Requirement 与 Artifact 沿用实体身份和严格类型能力面。Change 从快照计算，作者补充理由；它不再维护一份与对象状态竞争的数据库。完整映射见 [SEMANTIC_MODEL.md](SEMANTIC_MODEL.md)。

主导航只有“当前架构、修订、检查”。桌面以系统图和按需详情为主；手机先读路径、对象和变化清单，再按需打开图。Mica 的状态与事件、CAT-TRACE 的公式与算法、Tutorial 的页面与 finding，各用适合内容的表达。共有的是语义和对象身份。

## 四个 reference 在同一候选中成立

这里的“成立”指四种项目能够自然表达、定位与比较，并不表示它们各自的设计、软件、算法或产品已通过验收。事实与来源详见 [FOUR_REFERENCE_PROJECTS.md](FOUR_REFERENCE_PROJECTS.md)。

| Reference | 原型中可以实际查看的内容 | 保留的真实边界 |
|---|---|---|
| Delivery Assurance | 同一拓扑上的正常交付、失败返修、恢复与旧能力保护；组件机制、载荷与消费者；共享判定库设计到独立交付判断职责的修订 | 仍是设计。实现绑定合法为空；没有虚构 package、function、运行接线或测试。两份设计都保留原任务权威，不能编成“旧版丢失负责人”的历史 |
| Mica | DOM/轮次识别、长对话扫描、连接器连续显示、旧草稿恢复；固定 file/function/selector/test；0.1.6 → 0.1.7 输入路径修订与三对真实历史绑定 | 本轮实际运行 13 项既有合成输入路径检查；没有把它当作当前在线 ChatGPT 或目标设备的完整验收。平台适配的未接入设计仍可与已实现代码并存 |
| CAT-TRACE | 稳定尾部数值内核、参考采样器、被反例撤销的普通局部 Laplace 路线、仍受阻的生产算法；公式、例程、oracle、证据与真实修订 | 正确性记录与混合可靠性分开；“尚无冻结的唯一生产算法”是合法状态。读取既有科研证据，没有重新执行科研计算；私有代码和原始数据不复制进本候选 |
| STAT5060 Tutorial | 候选文件、页面与要求；当前要求漂移、历史局部修复、验证器缺陷三类 finding；定位对象、发现依据、修复历史及证据失效范围 | V14 的要求漂移仍未修复；V04 → V05 的局部文字修正不等于整套产品通过；验证器对合法零值的缺陷不归咎于教学页面。本轮未重新制作或渲染私有旧课件 |

Tutorial 可以回答“为什么没通过、哪页或哪项要求、依据是谁留下的、历史修了什么、哪些证据需要重跑”。页面对象、要求、finding 和证据都进入同一实体图，不在 renderer 旁另设一套验收数据库。

## 可操作的原型覆盖

| 必须演示的能力 | 实际入口或操作 |
|---|---|
| 当前系统整体、组件与上下游 | 四项目“当前架构”；点击节点或目录，再查看相邻关系；可聚焦局部邻域 |
| 关系、payload 与 consumer | 点击关系文字或线段；详情中打开端点及真实消费位置 |
| 正常、失败、恢复、保护 | DA 阅读路径切换及逐步导航，保留同一套拓扑 |
| 机制下钻 | 对象“机制”；Mica 事件/状态、CAT 公式与算法、Tutorial 页面结构 |
| 实现下钻 | 对象“实现”；固定提交、函数或对象定位、源码节选、原仓库链接 |
| Evidence | 对象“证据”；方法、版本、记录范围与尚未覆盖的结论 |
| Meaningful revision、why changed | 对象“演进”或主导航“修订”；触发、理由、前后内容、影响和未变保证 |
| Semantic diff | 修订“图中变化”；旧/新范围对象及删除关系；手机默认变化对象清单 |
| Design-only | DA 组件“实现”：合法空绑定；设计与来源仍可完整阅读 |
| Open blocker、撤销路线 | CAT 受阻生产算法、历史撤销路线及项目检查 |
| Artifact finding / repair | Tutorial 页面对象与 finding；历史修复、当前未修问题、修改种类对应的证据影响 |
| 完整性检查 | 四项目“检查”；机械缺口、需判断事项及对象入口，不提供质量总分 |
| Light / dark | 顶部主题按钮；图层、焦点、关系、代码、公式、diff 均独立处理 |
| Desktop / mobile | 桌面图与详情分配实际空间；手机路径、返回恢复与纵向比较；窄屏可选完整关系图 |

这些是固定研究数据上的参考实现。它包含实际快照比较、关系影响分析、校验与证据失效逻辑，但没有假称已完成通用仓库导入、完整源码索引、正式迁移或自动 Freeze。详见 [CODEX_HANDOFF_CONTRACT.md](CODEX_HANDOFF_CONTRACT.md)。

## 成熟能力的采用

当前原型实际使用 React / React Flow、ELK.js、Shiki、KaTeX、Lucide、Noto CJK 及 Vite。React Flow 与 KaTeX 延续 Asteria 已有基础；ELK 负责布局，Shiki 负责源码着色，Asteria 自己负责语义、投影意图、证据与变化解释。[锁定依赖](prototype/package-lock.json)、[第三方声明](prototype/THIRD_PARTY_NOTICES.md)

正式方案保留现有 TipTap、Dexie、Zustand 的合适职责；只读 Markdown 采用 react-markdown / unified。Tree-sitter、SCIP 导入、dependency-cruiser 与外部 Difftastic 作为按需来源适配能力，不是本原型已经接入的服务。LikeC4、Structurizr 与 MADR 的模型/投影或决策思想被吸收；不新增 DSL 真值、平行图引擎、账户、后端或数据库。逐项理由与官方来源见 [OPEN_SOURCE_ADOPTION.md](OPEN_SOURCE_ADOPTION.md)。

## 本轮实际验证了什么

| 检查 | 已保存的结果 | 不能据此推出的结论 |
|---|---|---|
| 纯模型与负例 | [70 项测试，0 失败](qa/model-tests.tap)：引用、来源、声明证据、修订、重定向关系、旧/新影响、Artifact 失效等 | 不是正式 schema、远端源码解析或科学真值证明 |
| 完整浏览器主检查 | [r6 的 92 个渲染状态、76 次操作](qa/audit-r6-rendered.json)；没有记录到交互失败、页面错误、整页横向溢出或关系标签重叠 | r6 保留其原摘要；后续事实纠正另行复验，不把旧检查冒充新版本运行 |
| 定向交互与视觉复核 | [47 项定向检查](qa/audit-r6-targeted.json)、[39 项扩展检查](qa/audit-r6-extended.json)；四项目关系点击、焦点、弹层、手机返回、变化详情、公式、实际代码颜色等 | 没有做完整屏幕阅读器审计或真实超大项目长期使用研究 |
| 最终事实修正复验 | [最终 delta 的 28 个实际状态与 27 项检查](qa/audit-final-delta.json)：历史审阅类别、Mica 当前机制、旧消费入口与条件、历史关系、双主题和手机；失败与溢出为 0 | 仅重验受影响状态；没有再次宣称在最终字节上运行完整 92 态矩阵 |
| 最后关系显示复验 | [6 个状态与 7 项检查](qa/audit-final-diff-visual.json)：修改关系在未选中时有修改色和文字；点击仍能看到真实前后消费者；双主题与手机没有新增碰撞或溢出 | 这一步只改边的显示语法，reference 数据与上一轮事实复验保持相同摘要 |
| 内容存在性与人话审查 | [真实可见内容裁决](qa/rendered-content.tsv)与 [已修正问题](qa/producer-issue-log.tsv)；去掉格式后连续阅读，再回到整页核对 | 不替代下一轮 GPT Work 的独立内容和视觉判断 |
| 离线、双主题、中文字形 | [离线与代码主题结果](qa/offline-and-code-theme.json)、[字形覆盖](qa/font-coverage.json)；运行时零 HTTP 请求，已用中文字形无缺失，320px 页面无整页溢出 | 不把固定静态包当作通用资源加载或所有字体环境保证 |
| 规模边界 | [合成图探针](qa/large-graph-probe.md)：200 个实体中的 24 节点投影布局；1,600 实体图的影响查询；删除关系仍能追到隐藏消费者 | 不是 1,600 节点同时渲染的性能结论 |
| Mica 原有检查 | [13 项输入路径检查](sources/mica-typing-hotpath.json)，包括普通输入与 IME；[实际环境和范围](sources/SOURCE_FACTS.md) | 不是当前真实 ChatGPT 或目标设备的全功能验收 |

制作团队记录的 P1 与明显 P2 已清零，修复与复验绑定到上述原型摘要。这个结果只支持把候选交给下一轮审查；本文件不宣布最终产品通过。

### 截图入口

r6 图保留完整覆盖时的实际状态；未受最后修正影响的画面继续适用。Mica 连续显示机制与 CAT/Tutorial 的已有结果类别，以 final-delta 截图为准。修改关系的最终显示见 [最后的关系视觉记录](qa/audit-final-diff-visual.json)。

| 内容 | 浅色 | 深色或手机 |
|---|---|---|
| DA 系统 | [浅色系统](qa/screenshots/audit-r6-da-light-desktop-default.png) | [深色修订](qa/screenshots/audit-r6-da-dark-desktop-revision.png) |
| Mica 实现与演进 | [浅色代码](qa/screenshots/audit-r6-mica-light-code-token-colors.png)、[最终关系比较](qa/screenshots/audit-final-delta-mica-dark-desktop-relation-signal.png) | [深色代码](qa/screenshots/audit-r6-mica-dark-code-token-colors.png)、[最终手机机制](qa/screenshots/audit-final-delta-mica-light-mobile-current-mechanism.png) |
| CAT-TRACE | [浅色公式](qa/screenshots/audit-r6-cat-light-formula.png) | [深色公式](qa/screenshots/audit-r6-cat-dark-formula.png)、[手机变化](qa/screenshots/audit-r6-cat-dark-mobile-diff.png) |
| Tutorial | [finding 定位](qa/screenshots/audit-r6-tutorial-light-finding-location.png)、[最终历史审阅](qa/screenshots/audit-final-delta-tutorial-light-desktop-recorded-result.png) | [深色 finding](qa/screenshots/audit-r6-tutorial-dark-finding-0.png)、[手机路径](qa/screenshots/audit-r6-tutorial-light-mobile-default.png) |

## 最危险的剩余问题

**结构完整的关系，仍可能指向写错的消费者；精确的来源链接，也可能没有证明它真的消费该载荷。** 本轮纠正了 Mica 两个错误函数名，并重新核对了八条关系。最后的历史复核又纠正了旧版继承新版观察窗口、旧版本不存在的新消费函数，以及把“阻止新建”说成“立即清除”的机制描述。页面可以看起来很完整，错误却藏在“有出处”的假象里。[消费点与历史复核记录](sources/mica-relation-consumer-audit.md)

因此正式 Asteria 必须分别记录作者声明、解析到的符号、消费或装配证据、行为验证与未知范围。手工策展起步合理，但不能让 `consumer` 非空或 anchor 可打开自动推出对齐。源码变化后要重新确认绑定；历史比较不得复制当前锚点冒充旧实现。[来源与证据合同](SOURCE_BINDING_AND_EVIDENCE.md)

第二个未被本轮规模覆盖的风险，是证据依赖维护成本与真实长期项目的复杂度。未知依赖必须保留为未知；受影响范围不能只在可见图中查。正式阶段仍需在 Asteria 原有科学材料迁移、真实仓库索引、多次返修和更大项目上验证这一点。两套主题与参考原型完成，不会消除这些工程和判断风险。

## 文档导航

| 文档 | 决定的内容 |
|---|---|
| [ASTERIA_NEXT_CANONICAL_SPEC.md](ASTERIA_NEXT_CANONICAL_SPEC.md) | 唯一产品规格与阶段顺序 |
| [SEMANTIC_MODEL.md](SEMANTIC_MODEL.md) | 现有模型逐项映射、canonical 身份、类型与迁移 |
| [ARCHITECTURE_DESIGN_AND_FREEZE.md](ARCHITECTURE_DESIGN_AND_FREEZE.md) | Chat 的设计合同、机械检查和专业判断边界 |
| [VERSION_EVOLUTION_AND_DRIFT.md](VERSION_EVOLUTION_AND_DRIFT.md) | meaningful revision、语义差异、局部历史、纠正与双向 drift |
| [SOURCE_BINDING_AND_EVIDENCE.md](SOURCE_BINDING_AND_EVIDENCE.md) | 来源权威、不可变锚点、绑定与证据适用性 |
| [FOUR_REFERENCE_PROJECTS.md](FOUR_REFERENCE_PROJECTS.md) | 四项目的真实机制、历史、来源和证据边界 |
| [VISUAL_SYSTEM.md](VISUAL_SYSTEM.md) | 整页构图、节点/边、机制 renderer、双主题、手机与可访问性 |
| [OPEN_SOURCE_ADOPTION.md](OPEN_SOURCE_ADOPTION.md) | 直接依赖、借鉴与不采用的逐项判断 |
| [CODEX_HANDOFF_CONTRACT.md](CODEX_HANDOFF_CONTRACT.md) | 后续实施责任、不可即兴发明的行为、验收与保护项 |
| [CONTENT_AND_TASTE_AUDIT.md](CONTENT_AND_TASTE_AUDIT.md) | 可见内容、连续阅读、视觉 QA 与实际修正 |
| [INPUTS_AND_BOUNDARIES.md](INPUTS_AND_BOUNDARIES.md) | 固定输入、读取与写入范围、私有材料边界 |

写入仓库：`YuukiAS/AI_Research_Toolkit`。唯一写入分支：`research/asteria-next-convergence-20261027-pro-a`。共同基线：`23a1c4840f665e66f7af95ffadaadd96dc999e7f`。开工时的实际 GitHub 写入和回读见 [WRITE_ACCESS_CHECK.md](WRITE_ACCESS_CHECK.md)；研究内容提交的远端逐文件核对已完成，见 [DELIVERY_READBACK.md](DELIVERY_READBACK.md)。

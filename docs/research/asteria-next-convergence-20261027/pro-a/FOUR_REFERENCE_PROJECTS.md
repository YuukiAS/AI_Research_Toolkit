# 四个永久参考项目

这四个项目是 Asteria 的长期回归材料。Delivery Assurance 检查纯设计能否讲清，Mica 检查机制能否追到实际代码，CAT-TRACE 检查科学路线与证据边界，STAT5060 Tutorial 检查最终产物怎样验收和返修。四者共用一套语义模型，分别采用适合内容的机制表达。

本文冻结参考材料、模型映射与阅读任务。它不代表四个源项目已经获得新的验收，也不声明候选原型已经实现本文所有交互。原型的实际覆盖和缺口由本候选的浏览器检查记录另行说明。

## 1. 固定观察截面

| 项目 | 本次固定来源 | 必须保留的事实边界 |
|---|---|---|
| Delivery Assurance | 新职责设计 `fd6916ad5fdd5fb905544b6a127f9b0d31a737e1`；旧共享判定库设计 `ae2766a62b1546048ec6122e01ee95f1904fb73c`；R2 模型 `1508994fd3b4e478d5a39c569d42cb87460de77e` | 新 DA 职责与连接是设计；已有工作流、Bridge 或项目检查不能证明新增交付链已经运行 |
| Mica | 当前代码 `7059c0dc24b908b57bd0e1f475142ba4f4520621`；局部历史 `9f56ea8d23a0895ddbb3f1e95ee207bd049b62c0` → `aa4ce52581fff2e207d1f93600becbb3018b0efc` | 当前运行代码为 0.1.7；后续重建规格和当前实现分开；本轮合成输入测试不能证明当前真实 ChatGPT 或目标设备的全部表现 |
| CAT-TRACE | 当前材料 `0d829fb17c458a076a15ec51893e917960107c21`；参考算法 0.1.1 实现 `bea7aca3ba51bcd4883b9105765bfbbad5eddadc`；0.1.2 实现 `2ccb9f9b3c67258292e3b39faeadb4a6c8fef03b` | 稳定数值模块、参考算法、撤销的近似和受阻生产算法分别表达；本轮没有重新执行科研计算 |
| STAT5060 Tutorial | 研究及当前课程要求 `76dc93ce7aaf2b91b60fd4003daa8be75ff54588`；受审实现与 V14 页图 `88d1214ea329f1e538301107c10bd8fd4fd8c341` | 本轮直接检查了验证源码及 V14 第 10、35、37 页；没有重新运行验证器，也没有重新审阅整套课件 |

DA 的来源分别是[完整系统模型][da-r2]与[上一轮固定来源研究][da-prior]。Mica 的版本与差异见[当前版本定义][mica-version]和[机制修复比较][mica-diff]。CAT 的来源由[实现索引][cat-index]及[冻结修订说明][cat-change]串起。Tutorial 的研究以[总体架构][tutorial-architecture]和[独立验收记录][tutorial-review]为依据。

CAT-TRACE 与 Tutorial 的私有材料不内联到公共候选。这里仅保留脱敏概念、标准数学定义、函数与测试名称，以及需要原仓库权限的固定链接。公共原型中的教学页面轮廓应标为“结构示意”；它不能冒充原始截图，也不能自动抓取私有链接的内容。

## 2. 共同模型怎样承载四种内容

核心沿用 Asteria 的 `project`、`entities`、`symbols`、`relations`、`variants`、`views`，扩展共享 `anchors`、规范化 `bindings` 与 `revisions`。组件、机制、要求、决定、证据、问题和产物对象进入实体种类及类型化能力面。语义差异、完整性检查、局部历史是这些对象的投影，不另建 Architecture Ledger。

| 共同语义 | DA | Mica | CAT-TRACE | Tutorial |
|---|---|---|---|---|
| 稳定实体 | 交付判断、原制作任务、项目验收 | 对话识别、连续显示、清空恢复 | 数值内核、参考引擎、零槽位积分 | 候选课件、教学页、表格、课程要求、验证器 |
| 机制能力面 | 交付义务选择、失败回传、恢复条件 | 事件、状态、DOM 观察与调度 | 公式、数值分支、采样更新、误差边界 | 身份核对、统计检查、整页与整套审阅、返修消费 |
| 类型化关系 | 当前要求传给 DA；失败传给原任务 | 事件载荷传给处理函数；恢复状态约束外观层 | 数值贡献传给算法；反例反驳限定主张 | 页对象受要求约束；发现指向对象；修订回应发现 |
| 符号 | 没有需要时为空 | 没有需要时为空 | 数学含义、作用域、公式位置 | 教学公式中的量及其定义 |
| 来源锚点 | 固定设计章节与 Skill 规则块 | 文件、函数、selector、注册与消费位置 | 公式段落、routine、oracle、反例程序 | PDF/页图版本、页与对象定位、规则、验证函数 |
| 实现绑定 | 新 DA 接线可以为空 | 组件绑定定义、入口和消费者 | 稳定模块与参考实现有绑定；生产缺口为空 | 产品页绑定成品来源；验证器另有代码绑定 |
| 证据能力面 | 设计审阅、宿主能力试验分别登记 | 测试定义、实际运行、历史观察分别登记 | 正确性、可靠性、反例与科学主张分别登记 | 机械结果、页面判断、整套判断、用户拒绝分别登记 |
| 问题或发现 | 未确认接收者、缺证、宿主能力未实测 | DOM 失配、输入路径开销、真机证据缺口 | 近似反例、生产算法未冻结、可靠性未满足 | 当前要求漂移、页面表达问题、验证器缺陷 |
| 修订 | 职责重新分配或交付合同变更 | 0.1.6 → 0.1.7 的机制变化 | 参考算法修订及旧近似撤销 | 局部内容修复、要求更新、未来修复方案 |
| 变体与视图 | 同一拓扑的正常、失败、恢复路径是视图 | 事件序列、实现、差异是视图 | 并存科学模型可用 variant；算法前后版本用 revision | 同一候选的页面、要求、发现、影响视图 |

这张表规定语义对应关系，不要求每个实体填写每一列。`contains`、`supports`、`constrained_by` 不被迫制造消息载荷；真正传输数据、事件或任务的关系才要求说明传什么、由谁消费。机制若只属于一个组件，可留在该实体的能力面；只有需要独立身份、复用或局部历史时才提升为独立实体。

三条共用规则决定这些项目能否长期成立：

1. **设计、实现、证据各自有范围。** “已定设计、尚无实现”“已有代码、可靠性仍不足”“旧函数保留但当前入口不调用”都必须能如实保存。
2. **身份不由位置决定。** 组件不随文件移动换身份；页面不以永久页码作为身份；证据指向确切对象版本。历史链接固定到历史提交。
3. **变化先解释依赖，再决定复验。** 代码、公式、规则、页面和要求的变化均能产生待核对范围。Asteria 提供传播与定位，专业审阅决定影响是否真实以及证据是否足够。

## 3. Delivery Assurance：纯设计也要有可追问的机制

### 3.1 默认系统范围

保留 R2 的完整拓扑能力：用户要求、原制作任务、当前成品、项目验收、已接受要求、能力路由、DA、独立审查、Bridge 与交付入口仍在同一系统中。按需专业能力作为可展开的分组。选择正常、失败、恢复或旧能力保护时，改变路径强调，不换成另一张失去上下文的流程图。[系统与连接定义][da-r2]

主图的关键责任是：DA 决定本次要证明什么以及允许声明什么；领域验收提供专业观察；原制作任务修改成品；工作流安排接收与后续工作；Bridge 提供任务身份与合法恢复接点。DA 设计不会赋予阅读器执行权限，也不会让 Asteria 变成 Agent runtime。

### 3.2 选中关系后必须读到的内容

| 关系 | 设计载荷 | 责任消费者 | 当前缺口 |
|---|---|---|---|
| 已批准要求 → DA | 原始承诺、已接受旧行为、变更影响与未知依赖 | DA 的验收范围选择机制 | 新 DA 范围整理尚未实施 |
| 项目验收 → DA | 实际/预期、原始证据、要求版本、受审成品身份 | DA 的范围与身份核对 | 新接线尚无运行证据 |
| DA → 工作流 → Bridge → 原任务 | 具体失败、对象版本、接收者、允许修改范围与预算 | 原制作任务的续修入口 | 同任务递送与实际消费需要宿主验证 |
| DA → 交付入口 | 当前结论、证据引用、可声明的范围 | 原受管交付入口 | 末端核验尚未实施 |

设计态的消费者可以是明确的责任和接收合同，代码锚点合法为空。将来声称“已接入”时，才必须补真实注册、调用或消息消费位置及其证据。历史设计的通过结论不能自动继承给新的职责分配。[旧与新职责截面的比较][da-prior]

### 3.3 四条永久阅读路径

- **正常交付：** 原始要求 → 应验范围 → 当前成品 → 项目观察 → DA 核对 → 当前版本的交付声明。读者应能指出每一步使用哪个版本。
- **失败返修：** 具体要求未满足 → finding → 原任务接收 → 修复形成新候选 → 重取受影响证据。报告生成与反馈消费分开。
- **中断恢复：** 接收者不活跃、权限不足或预算到期 → 保留恢复点 → 重新核对原任务身份与可用能力 → 继续原任务。系统不得凭一条回传箭头假定恢复已经发生。
- **旧能力保护：** 新要求满足但旧入口失效 → 按已接受要求保留失败 → 查找共享变更影响 → 修复并复验。现有测试清单不能替代用户已接受的行为集合。

这四条是设计推演。本轮没有 DA 运行记录。R2 原模型已明确记录相同边界，动画、步骤高亮和完整拓扑都不能提升其实现状态。[情境与运行边界][da-r2]

### 3.4 设计历史与冻结阻塞

局部历史保留旧研究把交付规则放在工作流共享部分，以及新候选把交付判断交给独立 DA 的两种职责截面。修订解释责任为什么重新划分，并列出保留的原任务执行、专业验收和 Bridge 运行职责；不生成不存在的 package、函数或测试。[固定旧研究与新候选来源][da-prior]

DA 在架构冻结前必须说明：哪些义务可以机械核对，哪些由专业判断产生；反馈接收者是谁；错误版本如何被拒绝；任务不活跃时怎样恢复；未知影响如何影响交付结论。宿主调用能力、同任务消费、交付端接入若仍未验证，应作为实施前 blocker 保留，不用更多字段掩盖。

## 4. Mica：从用户能力一路追到真实消费点

### 4.1 当前系统与四个机制

默认系统反映当前扩展代码。2026-10-12 的产品重建设计存在于同一仓库，但不能把拟议统一适配层画成当前所有 selector 已经过的组件；新设计可作为另一设计截面，并显示实现尚未跟上。[重建设计][mica-design]、[设计审查边界][mica-design-review]

| 用户能力与机制 | 真实行为 | 下钻锚点与检查边界 |
|---|---|---|
| 对话/输入框识别 | 从已挂载 DOM 找消息轮次，排除不可见区、输入框保护区和 Mica 自身节点，再去重排序 | `TURN_SELECTOR`、`COMPOSER_SELECTOR` → `collectConversationTurns`；selector 是当前实现线索，不能当作平台稳定 API。[选择器与收集][mica-turns] |
| 长对话扫描 | 合并扫描请求；编辑期间及不可靠结构下保持原生；保护当前交互，只对适合的离屏轮次做渲染隔离 | `scheduleScan` → `scanAndApply` → `getProtectedIndexes` → `clearOptimization`；已挂载轮次不等于完整会话长度。[扫描实现][mica-scan] |
| 连接器连续显示 | 共享事件启动短期结构观察，合并快照更新；原输入框暂时消失时显示不可交互外观层，返回时移除；关闭、导航或超时清理 | 事件发布 → `handleSharedConnectorLifecycle` → `refreshSnapshot` → `showShell`/`cleanup`；发送或清空恢复状态阻止新建外观层，源码不保证已显示的外观层因此立即消失。[共享事件][mica-signal]、[连续显示][mica-continuity] |
| 清空后旧草稿恢复 | 先确认明确清空及同一对象确实为空，再识别同一旧内容重现；新输入会取消恢复 | `handleBeforeInput` → `confirmPendingClear` → `tickGuard` → `nativeDeleteComposerContents`；不匹配、缺少确认或用户继续输入时停止。[恢复实现][mica-stale] |

关系选择必须超出“依赖于”。例如连接器事件的载荷包含代次、来源、短期上下文和输入框身份；消费者是连续显示处理函数。清空恢复传出的状态则是连续显示的互斥条件。两个关系不能统一写成“数据同步”。

### 4.2 固定的 meaningful revision

**0.1.6 → 0.1.7：把重型快照移出普通输入路径。** 两个固定提交确实存在前后代码变化。旧版监听六类输入和交互事件，经 `handlePotentialMentionEvent` 确认连接器上下文或选择动作后，才调用 `beginLifecycle` 同步重建快照，并以 60 毫秒间隔检查输入框。新版移除这六类直接监听，消费共享连接器信号，使用短期结构观察与下一帧合并，并复用未变化的快照。共享事件本身在旧版已经存在，应在差异中列为保留，不能误标成新增。[真实代码比较][mica-diff]

修订保留三项源码约束：外观层保持 `inert`、`aria-hidden` 和 `pointer-events:none`，由原生输入框承担交互；关闭功能时清理外观层、移除监听并停止相应调度；创建外观层前需要有效矩形、克隆和不超过 2500 毫秒的快照。不能把“发送或清空恢复期间已有外观层立即消失”列为保留保证，两个版本的跳过分支都没有作出这项承诺。

这次修订还将观察窗口从 3200 毫秒改为 4200 毫秒，并扩大了发送互斥条件：旧版要求 `active && userTurnCommittedLatched`，新版采用 `active || sendCandidateActive || userTurnCommittedLatched`。清空恢复的互斥谓词保持不变。实现对照仅重建了 `publicLatch`、`attachListeners` 和 `beginLifecycle` 三对固定源码绑定；其他历史绑定不计为新增或确认未变。具体行号与来源见[历史锚点记录](sources/mica-historical-anchors.json)及[补充事实](sources/SOURCE_FACTS.md)。

本轮研究实际执行了当前固定提交的既有 `runTypingHotpathCase`，本地合成输入及输入法场景的机械断言通过。证据只支持该合成路径中没有按字符重复克隆、读取计算样式或启动相关轮询；它不证明当前真实 ChatGPT 结构、全部恢复分支或目标设备性能收益。[测试入口][mica-hotpath] 本轮结果应绑定实际执行对象、浏览器及结果文件，不能写成历史 0.1.7 发布时的运行记录。

### 4.3 永久阅读任务

从“输入时不变慢”进入连接器连续显示，查看事件载荷与真实消费者，再打开局部历史，找到被移除的普通输入触发和新回归检查。接着切到清空恢复，解释它为什么会禁止连续显示。最后打开长对话扫描，指出哪些内容仍保持原生，以及识别不足时怎样退出。四次选择均应保留当前系统上下文，不把文件树当成系统。

Mica 的长期 blocker 是当前外部 DOM 与设备环境的证据刷新。源码存在、历史手工观察和本地合成测试分别有价值，但不能互相代替。[历史原生结构调查][mica-native-history]、[历史清空观察][mica-stale-history]

## 5. CAT-TRACE：正确实现、科学可靠性与未决算法分别成立

CAT 同时包含生产数值路线与独立参考推断路线。默认系统先让读者看见两条路线各自承担的职责及其证据关系，再进入公式、routine 或算法历史。参考算法不能因源码齐全就被默认作为金标准；生产路线也不能用参考例程填补尚未冻结的模块。

### 5.1 四个永久压力点

| 对象 | 当前事实 | Asteria 必须允许的状态 |
|---|---|---|
| 稳定数值模块 | `ct_tail_terms_scalar` 按数值区间计算 probit 尾部量；`ct_probit_laplace` 是实际消费者；测试包含冻结高精度参照与分支边界 | 有实现、有明确测试范围；不自动替整个科学模型背书 |
| C04 参考算法 | 独立参考实现有目标函数、更新和测试；已有结果记录保留正式可靠性未满足 | 正确性证据与可靠性缺口同时存在 |
| 被撤销的零槽位近似 | 局部 Laplace 用于匿名全零槽位的旧路线受到解析恒等式和确定性反例挑战 | 历史路线可查，撤销原因明确；旧函数/探针不伪装为当前生产实现 |
| 仍受阻的零槽位生产模块 | 新说明已有数学候选，但生产成本、误差与导数稳定性、独立测试及更广维数边界仍未闭合 | 设计有进展、实现可以为空、下游 blocker 保留 |

稳定模块来源见[数值函数][cat-tail]、[高精度参照测试][cat-tail-test]与[实际消费者][cat-consumer]；参考算法状态见[实现入口][cat-sweep]、[目标差值检查][cat-target-test]与[运行记录][cat-result]；撤销与未决边界见[反例][cat-counterexample]、[当前候选][cat-open]和[缺口登记][cat-gap]。本轮读取源码、测试与既有结果，没有重新执行这些科研计算。

### 5.2 机制显示应解释计算对象

数值内核可用标准定义 \(\lambda(t)=\phi(t)/\Phi(t)\) 引入逆 Mills 比率，再解释不同数值区域为何需要不同计算方式，最后展示返回量及消费者。公式符号拥有定义和作用域；点击函数只打开绑定来源，不要求公共页面复制私有源码或内部结果表。

零槽位历史应把两件事分开：同一积分按槽位重数聚合的关系仍成立；被撤销的是对该积分的某种局部近似。反例说明给定条件下的近似漏掉关键贡献及其聚合后果，不能外推成所有数据的偏差定理、参数恢复结论或所有 Laplace 用法失效。[反例范围][cat-counterexample]

当前说明已有针对零槽位的数学候选，不能写成“尚无方向”。同时，候选说明并未给出完整生产解，不能填入一个“待 Codex 实现”的虚构 routine。未冻结的数值选择、适用维数、误差合同与独立验证必须在交接前显式保留。[当前方法边界][cat-open]

### 5.3 参考算法 0.1.1 → 0.1.2

旧版最终组成对比更新依赖当前潜变量；新版在该步骤积分掉相关潜变量，改用观测似然。实际下钻为旧 `ref_ct_one_sweep` → 新 `ref_ct_one_sweep` → `ref_ct_interweave_eta_collapsed_contrast`。旧辅助函数仍可留作历史核对，但当前入口不继续调用它。[旧入口][cat-old-sweep]、[新入口][cat-sweep]、[修订合同][cat-change]

修订由已有可靠性问题与机制调查触发，保持模型、先验、对外接口与既有稳定数值内核。测试分别检查目标差值、更新顺序及下一轮重新抽取潜变量，解释为何局部更新还影响下一轮状态。[目标检查][cat-target-test]、[两轮回归][cat-two-sweep]

结果页必须停在真实结论：相关正确性记录存在，正式可靠性仍未满足。新内核的可靠性需要新证据；旧运行不能因函数名称相同继续充当新内核的诊断结果。[结果边界][cat-result]

### 5.4 永久阅读任务

读者应能从系统分别找到稳定内核和参考引擎，沿公式 → 数值机制 → routine → oracle/test/result 前进；从零槽位模块打开被撤销路线，回答“反例推翻了什么、没有推翻什么”；从参考算法打开局部修订，解释前后更新目标与下游重抽；最后指出生产路线为何仍受阻，以及谁必须作出剩余科学判断。

CAT 的冻结检查应阻止“算法已定”却没有误差/适用边界、“实现已接入”却无真实入口、“已验证”却只引目标测试的表述。它不能替代科学家判断算法是否成立，也不能把一个宽泛 black box 自动补成生产方法。

## 6. STAT5060 Tutorial：围绕成品、要求与具体发现验收

### 6.1 候选身份先于页码

一个 Tutorial 候选关联源文件、生成 PDF、实际页图和有序页面集合，引用当前课程要求及审阅范围。页与对象有稳定身份，物理页码只是该候选中的位置。历史版本的第 10 页与 V14 第 10 页并非同一教学内容，因此跨版本只保存“p10”会把反馈接错对象。[历史页语境][tutorial-intake]、[V14 第 10 页][tutorial-page10]

本轮直接查看的 V14 第 10 页包含题干、计数/暴露量/率表与解释，已有研究把其统计解释列为局部正例。公共页面可以显示“题干 → 数据表 → 解释”的结构示意，再链接原始页图。该正例不证明问答几何、视觉成熟或整套叙事已经接受，也不能被拿来当作一个失败页面。[专业判断边界][tutorial-family]

### 6.2 三种真实问题必须分别归属

| 情况 | 受影响对象及依据 | 本轮能说到哪里 | 修复状态 |
|---|---|---|---|
| **当前要求与课件不一致** | V14 第 35 页的考核表、第 37 页的项目说明仍保留当前决定已撤销的安排；直接比对原页与当前冻结时间表 | 该候选不适合作为当前要求下的课程成品；这不证明页面制作时违反了当时要求 | 尚无本轮完成修复与复验的证据 |
| **历史页面的局部内容修复** | V04 第 26 页把内部制作状态放入面向学生的项目说明；V05 审阅明确记录该处已修，同时继续指出视觉与解释问题 | 有真实前后修复记录；范围是该内容问题 | 局部修复有记录，V05 整套仍被拒绝 |
| **验收程序自身缺陷** | `IVA-T-001`：`scientific_observations` 在判断需要哪些声明前计算比值，合法零计数可能触发除零，正常入口没有对应处理 | 问题在验证程序；不能改写成第 10 页统计错误 | 修复建议已记录，没有本轮完成证明 |

第一项来源为[第 35 页][tutorial-page35]、[第 37 页][tutorial-page37]、[当前要求][tutorial-authority]与[既有差异记录][tutorial-family]。第二项来源为[V04 逐页审阅][tutorial-v04]和[V05 局部修复记录][tutorial-v05]。第三项来源为[独立修复清单][tutorial-finding]、[统计观察函数][tutorial-scientific]与[正常入口][tutorial-entry]。

这些发现也有不同的发现者与证据方式。当前要求漂移由既有研究记录，本轮对原页和权威文件作只读核对；历史 V04 的逐页审阅发生在用户明确拒绝实际课件之后；`IVA-T-001` 来自独立验收并可由源代码控制流核对。不能把它们全部写成某个自动检查器新近发现的结果。

历史页面的候选身份为 V04 实现 `c747870e294e784e89edf3ba92a5ad4a74a7ab2d` 与 V05 实现 `ce896c8a11816ea0a5cd836b00554433b79a23fa`；审阅文档本身保存在另一固定研究提交中。Asteria 必须区分“证据文件的版本”和“证据审查的成品版本”。[历史审阅身份][tutorial-v04-identity]、[后续审阅身份][tutorial-v05-identity]

### 6.3 一条可核对的返修链

选中过时的课程安排后，读者看到当前要求、旧对象和差异；随后进入 finding，看到发现依据、受影响页/表格/正文、返回原制作任务的动作及未完成状态。修复方案应限定为更新受影响的课程事实，保留无关统计内容和已接受模板，再生成新成品及新证据。

验证器问题走另一条链：合法输入 → 统计观察函数 → 运行中断风险 → 验证器 finding → 限定代码修复与回归。不能通过删除合法零计数、任意加 epsilon 或改课程数据掩盖缺陷。未来修复只应在实际声明需要时计算比值，并明确处理未定义对象；这属于待实施方案。

原任务接收也需要证据。现有 `consume_result` 检查原任务、结果与候选身份，并要求每个 finding 有后续动作，随后留下消费回执；调用方仍需实际读取并调用它。函数存在不能证明本次所有发现已经被制作任务接收，更不能证明修复完成。[结果消费者][tutorial-consumer]

### 6.4 机械证据和专业判断怎样配合

| 层次 | 可机械取得的事实 | 仍需专业判断 |
|---|---|---|
| 身份与要求 | 源码/PDF/页图身份、当前权威版本、页序、所需材料是否齐全 | 当前要求是否完整、争议如何裁定、历史决定是否适用 |
| 科学对象 | 数据、公式、执行结果与引用的关联；可计算的数值一致性 | 模型是否合适、解释是否成立、教学假设是否遗漏 |
| 完整页面 | 对象边界、渲染尺寸、裁切等可观测事实 | 视觉层级、密度、图文关系、问答阅读节奏 |
| 完整课件 | 页面顺序、导航结构、依赖声明与覆盖 | 先修知识、前后过渡、叙事是否适合教学 |

以上来自 Tutorial 的真实规则与证据分工。[规则合同][tutorial-rules] Asteria 保存判断对象、方法、结论、依据及评审者；它不能把“所有页面无溢出”汇总成“整套课件通过”。

### 6.5 永久阅读任务

读者从当前课件进入第 35/37 页对象，回答“为什么不符合当前要求”，打开 finding 找到谁发现及依据；再进入局部历史，观察 V04 → V05 确实修了什么、为什么整套仍未接受；最后选择验证器问题，确认它与页面缺陷不同。做一次明确标注的变更影响预览，指出哪些证据要重取、哪些在依赖条件满足时可保留。预览不得生成虚构的执行回执或修复完成状态。

## 7. 证据失效矩阵

矩阵用于解释依赖，不代替原项目的验收合同。事实是否仍适用取决于被测对象、要求、方法、工具与环境，以及完整上下文；不知道依赖时扩大复核范围。旧证据始终作为历史保留，不能把旧回执的候选哈希改为新值。[影响与证据复用合同][tutorial-architecture]、[Tutorial 执行分工][tutorial-family]

| 变化 | 必须重取或重新判断 | 有条件可保留 | Asteria 应显示的原因 |
|---|---|---|---|
| 一页正文、公式说明或图注改变 | 修改对象的专业语义、完整页及必要邻页、完整新顺序的叙事判断 | 输入、算法与执行环境未变的数值计算；确认无依赖的其他原始资产 | 解释和阅读上下文改变，不等于底层计算改变 |
| 全局样式、共享问答宏、字体或模板改变 | 所有使用者的实际渲染、视觉判断；可能受布局变化影响的导航与交互 | 科学输入不变的数值结果及仍适用的科学判断 | 共享视觉依赖传播到全部使用页，不能只查编辑过的源文件 |
| 只改变页序 | 整套先修关系、过渡、叙事、页号引用与导航 | 单页字节和与顺序无关的计算事实；局部判断需核对是否依赖邻页 | 集合成员未变，但阅读关系变了 |
| 科学数据、模型、seed、算法或关键环境改变 | 计算结果、依赖图表、解释、比较与相关专业判断 | 经依赖核对确实不受影响的对象 | 同名输出与同路径文件不能证明结果相同 |
| 当前要求或权威决定改变 | 所有受该要求约束的内容和交付判断 | 独立且不受该要求影响的计算或视觉事实 | Artifact 可以字节未变却不再符合当前要求 |
| 验证器、规则或 oracle 改变 | 受影响结论的重新执行/重判；检查旧错误是否造成漏报或误报 | 与该验证路径无关、版本及条件仍相同的独立证据 | 验证方法本身是证据依赖 |
| Mica 事件调度或恢复条件改变 | 相关触发、互斥与恢复回归；新的实现绑定和当前执行证据 | 经过依赖检查仍不变的其他行为 | 一个组件名没变，其机制仍可能发生重要变化 |
| CAT 参考更新核改变 | 目标与顺序 oracle、跨轮状态检查、新内核的可靠性诊断 | 未变数值原语的限定证据 | 正确性、可靠性与科学结论分开复验 |

矩阵中的“保留”不是自动复制通过状态。新候选可以引用旧证据及一份复用理由，说明所有相关依赖为何未变。被新反例否定的结论应显示为被纠正，并保留原结论及触发材料，不能靠删除历史恢复整洁。

## 8. 四项目共用的回归阅读任务

这些任务用于未来版本验收 Asteria 的可理解性。它们与点击成功、无 overflow 等机械检查分别记录。

| 项目 | 读者应能自然回答 | 说明模型或产品退化的情况 |
|---|---|---|
| DA | 没有代码时，系统怎样运作？失败交给谁？断线后如何恢复？什么旧能力必须保留？ | 为填满实现面板造函数；路径切换丢失系统上下文；把设计箭头当作已运行 |
| Mica | 哪个事件把什么交给哪个消费者？普通输入为什么曾触发重工作？修订后哪些保证保留？ | 只给文件树；共享事件被误标新增；合成测试被扩大为真机全面收益 |
| CAT | 哪部分已有稳定实现？参考算法支持到哪里？哪条近似被撤销，为什么？生产还卡在哪？ | 一个完成状态覆盖正确性和可靠性；反例被过度外推；用参考例程补生产空白 |
| Tutorial | 哪个候选、哪页哪对象不符合哪个当前要求？谁发现？修了什么？哪些证据要重取？ | p10 跨版本错绑；页面正例被标失败；验证器缺陷变成产品缺陷；局部修复被说成整套通过 |

共同任务还包括：选择一条关系读载荷与消费者；打开一个对象的机制、来源与证据；查看局部 before/after、触发依据及未变保证；从历史回到当前；区分设计领先代码与代码领先设计；检查一个允许为空的实现绑定。手机重新按“当前对象 → 本次问题 → 下一步上下游 → 来源/历史”的次序组织，不能仅缩小桌面图。浅色与深色主题应呈现同样的事实和范围，不能靠颜色独自表达已撤销、阻塞或未实现。

大型系统回归允许将这些稳定语义加入更大的分组图，检查折叠、局部邻域及跨边界关系；不得为了凑节点数发明新的项目事实。任何合成扩展都与四项目真实来源分开标记。

## 9. 长期维护规则

**保留固定基线，再增加新观察。** 本次四项目的来源与关键阅读任务成为不可回写的基线。更新时记录新提交、实际读取范围及日期；源分支前进不自动替换历史链接。没有访问权限时保留上次观察并说明尚未刷新，不能推断对象已经删除。

**先识别变化种类。** 行号或唯一文件移动可更新来源观察；机制、责任、科学目标、要求或恢复条件改变，才形成需要设计解释的修订。新增 Git commit 不必产生新的架构 revision。版式变化只有影响阅读或验收要求时才进入相应语义范围。

**只从可核对材料升级结论。** DA 新连接得到真实宿主与消费证据后，才从设计变为已接入；Mica 绑定更新需核对定义、注册和消费者；CAT 的未决生产算法只能在原项目冻结后更新；Tutorial 只有新成品及对应复验结果，才能关闭具体 finding。没有结论时保留 open，不让 Codex 补科学或产品决定。

**保留因果与反证。** 旧路线、错误判断和已纠正的证据是学习材料。新修订引用触发、理由、影响与未变条件，说明哪些旧结论失效。回滚也生成新修订并恢复相应依赖观察，不移动历史修订的指针冒充从未改变。

**共享模型与呈现器一起回归。** 新能力必须在四项目中至少核对其适用与不适用情形。渲染器根据类型化内容选择序列、状态、公式、算法或产物结构，不根据项目名字进入四套业务分支。字段新增后先问读者是否需要看，再决定位置；缺少不适用字段不制造空卡片。

**公开内容以明确选择为准。** 私有源码、课程数据、科研结果、日志和原始页图留在原权限边界。公共阅读器可链接固定私有来源，但不预览、缓存或上传其内容。研究人员本地读过材料不等于获准公开。结构示意、设计推演、影响预览与真实执行结果在数据中保留不同身份。

四个项目因此长期检查同一个问题：用户和 Chat 能否从当前系统理解机制、定位实现、判断证据范围，并在一次变化之后找出尚未闭合的工作。字段齐全或页面漂亮都不足以回答这个问题，必须持续用这些真实阅读任务核对。

<!-- 固定来源；引用链接保留原仓库访问权限。 -->

[da-r2]: https://github.com/YuukiAS/AI_Research_Toolkit/blob/1508994fd3b4e478d5a39c569d42cb87460de77e/docs/research/complex-system-showcase-20261026/r2/gpt6/ARCHITECTURE_MODEL.md
[da-prior]: https://github.com/YuukiAS/AI_Research_Toolkit/blob/c733aa065d9ad102a64bb5f5f55453cd31a7e7bc/docs/research/architecture-evolution-system-20261027/pro-a/THREE_PROJECT_STRESS_TEST.md
[mica-version]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/scripts/release-config.mjs
[mica-diff]: https://github.com/YuukiAS/Mica-for-ChatGPT/compare/9f56ea8d23a0895ddbb3f1e95ee207bd049b62c0...aa4ce52581fff2e207d1f93600becbb3018b0efc
[mica-design]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/product/MICA_PRODUCT_SYSTEM_V1.md#L300-L436
[mica-design-review]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/reviews/2026-10-12-mica-product-system-critic-r2-verdict.md#L1-L39
[mica-turns]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/content.ts#L844-L874
[mica-scan]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/content.ts#L722-L842
[mica-signal]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/connector-lifecycle-signal.ts
[mica-continuity]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/connector-continuity.ts
[mica-stale]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/stale-composer-recovery.ts
[mica-hotpath]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/scripts/run-e2e.mjs#L183-L222
[mica-native-history]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/investigations/2026-09-01-native-virtualization-real-device.md
[mica-stale-history]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/investigations/2026-09-07-stale-composer-clear-recovery.md
[cat-index]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/README.md
[cat-tail]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/src/ct_math.cpp#L21-L91
[cat-tail-test]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/tests/testthat/test-math-stability.R#L1-L24
[cat-consumer]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/src/ct_probit.cpp#L111
[cat-sweep]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/R/cat-trace-reference.R#L1028-L1052
[cat-old-sweep]: https://github.com/YuukiAS/CAT-TRACE/blob/bea7aca3ba51bcd4883b9105765bfbbad5eddadc/package/TRACE/R/cat-trace-reference.R#L934-L958
[cat-target-test]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/tests/testthat/test-reference-c04-ref-v0-1-2.R#L253-L271
[cat-two-sweep]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/tests/testthat/test-reference-c04-ref-v0-1-2.R#L315-L337
[cat-change]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/C04_REF_V0_1_2_Z_COLLAPSED_COMPOSITION_PLAN.md#L8-L42
[cat-result]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/results/c04-ref--z-collapsed-composition-repair/result.md#L1-L34
[cat-counterexample]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/probes/ZERO_SLOT_LAPLACE_FINDING.md
[cat-open]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/architecture/CAT_TRACE_ZERO_SLOT_ARCHITECTURE_GUIDE_20261014.md#L271-L279
[cat-gap]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/07_DECISION_AND_GAP_LEDGER.md#L9-L37
[tutorial-architecture]: https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-system-architecture-research-20261022/02_OVERALL_ARCHITECTURE.md
[tutorial-review]: https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-system-architecture-research-20261022/independent-acceptance-v1/STAT5060_VALIDATOR_INDEPENDENT_ACCEPTANCE_REPORT_V1.md
[tutorial-family]: https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-system-architecture-research-20261022/03_THREE_FAMILY_EXECUTION.md#L65-L92
[tutorial-intake]: https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-foundation-v1/evidence/package/evidence/tutorial/T-INTAKE.md#L40-L46
[tutorial-page10]: https://github.com/YuukiAS/STAT5060-TA/blob/88d1214ea329f1e538301107c10bd8fd4fd8c341/results/tutorial-01-v14/pages/page-10.png
[tutorial-page35]: https://github.com/YuukiAS/STAT5060-TA/blob/88d1214ea329f1e538301107c10bd8fd4fd8c341/results/tutorial-01-v14/pages/page-35.png
[tutorial-page37]: https://github.com/YuukiAS/STAT5060-TA/blob/88d1214ea329f1e538301107c10bd8fd4fd8c341/results/tutorial-01-v14/pages/page-37.png
[tutorial-authority]: https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/docs/frozen/2026-27/STAT5060_ASSESSMENT_TIMETABLE_V1.md#L1-L43
[tutorial-v04]: https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-foundation-v1/evidence/package/evidence/tutorial/T-V4.md#L436-L450
[tutorial-v05]: https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-foundation-v1/evidence/package/evidence/tutorial/T-V5.md#L179-L183
[tutorial-v04-identity]: https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-foundation-v1/evidence/package/evidence/tutorial/T-V4.md#L1-L21
[tutorial-v05-identity]: https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-foundation-v1/evidence/package/evidence/tutorial/T-V5.md#L1-L16
[tutorial-finding]: https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-system-architecture-research-20261022/independent-acceptance-v1/REPAIR_TUTORIAL_SHARED_V1.md#L7-L18
[tutorial-scientific]: https://github.com/YuukiAS/STAT5060-TA/blob/88d1214ea329f1e538301107c10bd8fd4fd8c341/scripts/presentation_validation/tutorial01_validator_adapter_v1/rule_registry_v3.py#L53-L68
[tutorial-entry]: https://github.com/YuukiAS/STAT5060-TA/blob/88d1214ea329f1e538301107c10bd8fd4fd8c341/scripts/presentation_validation/tutorial01_validator_adapter_v1/validate_candidate_v2.py#L341-L362
[tutorial-consumer]: https://github.com/YuukiAS/STAT5060-TA/blob/88d1214ea329f1e538301107c10bd8fd4fd8c341/scripts/presentation_validation/tutorial01_validator_adapter_v1/evaluator_consumer_v2.py#L254
[tutorial-rules]: https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-architecture-v3/RULE_EVIDENCE_TUTORIAL_DETAIL_V3.csv


## 本轮原型完成后的来源补核

DA 两份设计已直接回读，旧方案已经包含工作流、原任务负责人和合法恢复通道。实际对照采用“交付判断独立成职责”，不会把旧方案改写成无人接收失败。[逐项设计来源核对](sources/da-design-history.md)

Mica 的历史实现对照现含三对逐段核过的固定函数锚点：`publicLatch`、`attachListeners`、`beginLifecycle`。它们的 before 指向真正的 0.1.6，after 指向真正的 0.1.7；没有复制当前主分支来冒充旧源码。其他旧绑定未重建时保持未覆盖，不计为新增。[历史锚点](sources/mica-historical-anchors.json) 当前八条关系的消费者另逐项核读，修正了两个不存在的手写函数名。[消费点核读](sources/mica-relation-consumer-audit.md)

Tutorial 的三条真实 finding、三张当前页面、两张历史页面及相应要求已经进入同一 `entities` 集合。主图仍只显示可阅读的验收责任投影；具体页与问题可以从详情导航。历史 V04/V05 页的候选提交来自原审阅的明确绑定，本轮没有重新渲染这两版；当前 V14 页图已实际打开核对。

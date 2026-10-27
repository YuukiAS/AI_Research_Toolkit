# Delivery Assurance：两个固定设计来源的直接核对

旧方案已经包含 workflow-core 和原任务负责人，不能把它改写为“DA 直接交给 Bridge，下一任务无人决定”。新方案的真实变化是重新分配交付判断、能力编排和运行接点的职责，并提议把 Delivery Assurance 作为独立插件。它仍是候选设计，未继承旧方案的审查结论，也没有生产接线证明。

## 读取身份

本轮于2026-10-27通过GitHub文件接口直接读取以下固定提交；没有依据历史Pro的转述替代原文。

| 来源 | 仓库提交 | 文件blob SHA | 固定原文 |
|---|---|---|---|
| 旧架构职责 | `ae2766a62b1546048ec6122e01ee95f1904fb73c` | `ddb356a6d98d038a49fb87528b9b4771f2cb2db7` | [02_ARCHITECTURE_AND_COMPONENTS.md](https://github.com/YuukiAS/AI_Research_Toolkit/blob/ae2766a62b1546048ec6122e01ee95f1904fb73c/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/02_ARCHITECTURE_AND_COMPONENTS.md) |
| 旧运行与返修合同 | 同上 | `fa2b843cd85c3bd7953f9506df17f4eac91439cd` | [03_END_TO_END_EXECUTION_AND_VALIDATORS.md](https://github.com/YuukiAS/AI_Research_Toolkit/blob/ae2766a62b1546048ec6122e01ee95f1904fb73c/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md) |
| 新职责设计候选 | `fd6916ad5fdd5fb905544b6a127f9b0d31a737e1` | `914b46054107986bbe0994ade5fbaba898489c5b` | [ARCHITECTURE_ZH.md](https://github.com/YuukiAS/AI_Skills_Collection/blob/fd6916ad5fdd5fb905544b6a127f9b0d31a737e1/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md) |

该新设计文件不在已核对的AI_Skills_Collection main `5d4b1432f96742646e00ad279a054359b1aec1da`中；将路径固定到该main会形成不存在的来源。因此原型应使用上述真实新设计提交。

## 旧方案明确规定了什么

[旧02 L45–49](https://github.com/YuukiAS/AI_Research_Toolkit/blob/ae2766a62b1546048ec6122e01ee95f1904fb73c/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/02_ARCHITECTURE_AND_COMPONENTS.md#L45-L49)把运行接点、纯判定库和专业runner放在三个既有实现位置：

> **L47** |Bridge 原入口增量；delivery.py / delivery_hooks.py|漏准入、失败无人接、错线程恢复、报告绕过|run_lite_task / run_codex_event / 原Control preflight /可信Hook调用prepare_admission；当前任务或原父进程消费；正常host调用finish/check/report/accept_submission|Bridge维护入口、身份、锁与真实接收；缺能力不启用，不建新daemon|
>
> **L48** |workflow-core delivery_core.py、同一da/2 schema和fixtures|原要求/旧功能遗漏、未激活检查签交付、不同候选拼绿|decide_admission_route、compile_obligations、select_checks、select_execution_capabilities、validate_definition_admission、validate_result、evaluate_claim；返回给Bridge|纯函数，不运行设备/模型/领域评分；缺标准、未知边或required证据保持未证|
>
> **L49** |项目既有runner与小adapter|机械PASS冒真实成品、专业判断失真|原runner产生真实观察和专业结果；04明确每仓原结果路径与独立输入；Bridge在正常完成接点统一形成claim|项目维护标准、控制集、旧行为与结果转换；首次adapter和正式出口变化必须准入|

“纯函数返回给Bridge”是实现调用关系，不能推成“Bridge任意选择下一任务”。[旧03 L209–214](https://github.com/YuukiAS/AI_Research_Toolkit/blob/ae2766a62b1546048ec6122e01ee95f1904fb73c/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md#L209-L214)另有明确原任务权威：

> **L212** 2. 在 readiness 前准备 scope summary，原 owner 决定模式；Bridge launcher 只消费已选模式，DA 不启动第二 owner。
>
> **L213** 3. Lite优先在当前回合修复；退出后原run_lite_task内按D4最多两次精确thread resume，共用原预算，不新增任务。需要独立角色时由原owner按既有Review/Control策略合法选择，不按任务大小自动升级。

失败也已有责任分流和真实接收要求。[旧03 L419–426](https://github.com/YuukiAS/AI_Research_Toolkit/blob/ae2766a62b1546048ec6122e01ee95f1904fb73c/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md#L419-L426)：

> **L422** 2. 当前runner stdout直接返回当前模型；原生Stop通过宿主后续回合送回；Lite/Review父进程run_delivery_cycle精确resume；Control原Controller调用新control step及具体CodexExecRuntimeAdapter。D4规定输入、ack与新结果。
>
> **L424** 4. 产品给Executor；runner给原runner维护者；observer给采集者；env给Controller；标准给Planner；授权给用户；身份给Controller；科学NO_GO给科学Planner。
>
> **L426** 6. 进程消失时先核验原任务锁/精确session/结果；仅原父进程或已授权持久owner可恢复；无活跃owner保留同task恢复点，不创建新后台。设计已定，运行能力未证。

旧02 L87还明确：设计审查通过不能证明Windows/CLI/Remote宿主探针、独立角色返回、正常完成检查或七仓适配已经完成。不能把旧方案画成已运行、把新方案画成补上一个已证运行错误。

## 新方案明确改变了什么

新稿首先保护了候选身份：

> **L4** 性质：**跨插件总体设计候选（PROPOSAL）；不是已批准的生产改造或功能完成声明**

新稿将职责写成独立边界。[新稿 L15–17](https://github.com/YuukiAS/AI_Skills_Collection/blob/fd6916ad5fdd5fb905544b6a127f9b0d31a737e1/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md#L15-L17)：

> **L15** - **`workflow-core`：负责复杂任务的能力发现、插件/技能组合与调用编排、阶段和接收者追踪。** 不承担某领域的专业事实判断，也不再充当所有交付验收规则的唯一所有者。
>
> **L16** - **`Delivery Assurance`：负责正式交付的验收义务、验收缺口发现、旧功能保护、候选证据核对以及是否可声明交付。** 执行项目验收和修补缺失验证器由原项目 Codex Executor 与领域负责人承担。
>
> **L17** - **`Bridge Kit`：只提供低层运行能力（任务身份、合法启动、权限、钩子接点、既有长任务/恢复、结果回传）。** 不负责选插件、写验收标准、审 UI、决定产品完成，不引入新调度器。

Delivery Assurance成为拟新增独立安装插件；旧设计PROCEED并不自动批准新方案：[新稿 L91](https://github.com/YuukiAS/AI_Skills_Collection/blob/fd6916ad5fdd5fb905544b6a127f9b0d31a737e1/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md#L91)：

> **L91** 这是拟新增**独立用户可安装的交付保障插件**，以 Skill + 小型确定性校验程序 + 可选受支持宿主钩子实现。复用 `AI_Research_Toolkit` 既有 Delivery Assurance 研究，但对其过重/未证的 `da/1` / `da/2`、七仓全部适配、角色调用与新状态结构逐项重新核查；设计曾经 `PROCEED` 不是实现正确的证明。

失败返回的直接描述是：[新稿 L104–106](https://github.com/YuukiAS/AI_Skills_Collection/blob/fd6916ad5fdd5fb905544b6a127f9b0d31a737e1/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md#L104-L106)：

> **L104** Bridge 保持已有 **Host/审批安全、Git/工作树、任务身份、Lite/Review/Control、Persistent Run 和合法恢复** 能力。DA 仅在确实需要的现有入口取得任务身份、候选标识、结果回传与运行时接点；Bridge 不复制 DA 规则，不评 UI 是否多余，不推导领域验收器，不管理全体技能路由，不为 DA 新增后台服务。
>
> **L106** 工作流失败：DA 产生“这项承诺缺证/失败”的可消费结果；workflow-core 选择原任务下一处理；Bridge 负责可靠交付到实际存活的运行回合或原正式任务入口。结果文件存在但没人接收，不构成自动恢复。现有项目独立控制器保留自身权威。

## 可以作为真实设计对照的变化

| 项目 | 旧方案 | 新候选方案 | 证据边界 |
|---|---|---|---|
| 交付判断放在哪里 | workflow-core 的 `delivery_core.py`纯判定库，运行结果返回Bridge | DA作为独立职责/插件候选，拥有义务、证据资格与交付判断 | 这是职责与包装变化；没有真实代码迁移 |
| workflow-core的角色 | 包含共享判定函数与能力选择等逻辑，原owner决定运行模式 | 明确负责能力发现、必要组合、实际消费确认和下一处理方 | 两版都存在工作流和原任务权威，不能把旧版写成无消费者 |
| Bridge的角色 | 原入口prepare/finish/check/report与实际接收，调用共享core | 保留身份、权限、恢复和递送等底层能力，不拥有交付规则或通用能力路由 | 新稿收紧职责边界；不等于旧稿授权Bridge随意调度 |
| 失败回哪里 | 当前模型/原owner/已有Controller，按已有合法通道继续 | DA产生失败→workflow-core选择原任务下一处理→Bridge递送 | 原任务续修是两版共同保证 |
| 专业判断 | 项目runner与原领域权威 | 项目runner/领域权威继续保留 | 新稿未把专业正确性收归DA |
| 接受与实现 | 旧设计有审查记录，生产接线未证 | 新稿明确PROPOSAL，需重新调查实施 | 接受状态不能跨方案继承 |

## 原型应如何表示

可将这项修订命名为“交付判断独立成职责”，before标签使用“共享判定库设计”，after使用“独立职责候选”。before的机制摘要应写：workflow-core提供纯判定函数；Bridge调用并接收结果；原任务负责人决定模式和续修。after写：DA拥有交付判定；workflow-core组织能力与下一处理；Bridge执行可靠递送。

不要只将同一条关系的target从Bridge改成workflow，再把before消费者填成“未明确下一任务决定者”。那会制造旧稿不曾存在的缺陷，也把模块包装变化伪装成同层对象的一条历史接线修复。

本轮可以根据原文重建两种责任投影，但应标明“依据两份设计材料整理；不是已运行系统快照”。如果仍要展示简单改单条边的交互，只能称为本轮说明性示例，并与真实历史记录分开。两个方案均保留正常交付、失败回原任务、恢复和旧能力保护；这四条路径应继续成立。

# AI 可靠工作体系：组件、边界与当前设计输入

更新：2026-10-26  
性质：**复杂系统讲解网站的共同研究输入**，记录目前讨论认可的目标架构；不代表插件已实现、已获独立架构审批或已经部署。本仓库保存参考与展示研究，正式 Skill / Plugin 源码始终归 [AI_Skills_Collection](https://github.com/YuukiAS/AI_Skills_Collection)。

## 一、真正要解决的问题

一个人同时管理科研、教学和多个软件项目，需要 AI 独立完成更多工作，减少亲自发现遗漏、纠正无依据改口、补充要求、反复催测试和修复的时间。过去已经出现：

- **方案不完整**：例如 Mica 的具体用户操作入口、真实网页结构或安全默认值没有在总体设计中提前核对，用户每追问一次才补一项。
- **判断不稳定**：例如 DII 科研讨论中，仅因用户质疑就改变推荐，没有交代哪项科学或逻辑依据发生了变化。
- **实现降级与旧功能退化**：Codex 可能交付较弱替代、忽略正常入口、修改一处却损坏已接受的功能。
- **测试与交付不对应**：函数、fixture 或 CI 通过，却没有核实实际安装应用、当前候选及用户看见的结果；失败记录无人继续处理。
- **成品内容选择失当**：普通回答多出无关图片、巨大卡片、伪流程图和内部编号；网页、报告、幻灯片又多出没有实际用途的解释、交互和装饰。

目标是让使用者提出目标之后，AI 能够**判断得稳、方案想得全、交付靠得住，最后讲得清楚且没有无用内容**。复杂系统网站必须使人理解这些能力怎样被实现、为什么组件必要、哪些已经可用、哪些还需开发和验证。

## 二、当前目标组件与唯一主要负责人

| 组成 | 类型／预计宿主 | 负责的能力 | 主要边界 |
| --- | --- | --- | --- |
| **Reasoned Design** | 新插件；GPT 主导判断与架构设计，Codex 端复用必要规则及源码核查 | 两个内部 Skill：Judgment Integrity（依据充分、正确纠错、不随用户压力摇摆）；Solution Design（主动发现需求遗漏、比较替代方案、覆盖完整用户流程及风险） | 不拥有专业模型的最终正确性，不负责发布门槛 |
| **Artifact Curation** | **新独立共享 Skill；GPT + Codex** | 跨普通答复、正式文稿、图片、网页、PPT、软件 UI 判断每个元素是否有存在的必要：保留、删除、合并、迁移、留白与补必要内容 | 专业事实和实际修改由领域插件负责；不能删掉用户明确承诺的功能 |
| **Clear Writing** | 现有插件；GPT + Codex，按宿主分工 | 面向读者的内容组织、自然中文、复杂系统可信解释、完整文本保真 | 不替代 Artifact Curation 的跨媒体裁量、不自行更改科研或产品结论 |
| **Verified Workflow / workflow-core** | 现有插件；Codex 端重点建设，GPT 端轻量路由 | **发现当前真正可用的能力，按任务组合专业插件/Skill，安排调用顺序、执行者和结果消费者，并核实关键能力真实被消费** | 不成为专业审稿人、设计师、产品验收法官或另一个任务调度器 |
| **Delivery Assurance** | 拟新增独立插件；**Codex 端主力**，GPT/Work 可做设计及独立审查 | 从已批准要求及既有好功能确定交付义务、找验收器缺口、检查防降级与防退化、消费真实专业测试结果、拒绝未证实的受管交付 | 具体领域标准归项目/领域专家；测试由原 Codex 编写并用项目运行器执行；不另建万能验收平台 |
| **专业领域插件** | 现有插件，如 Frontend Design / Research Authoring / Presentations / Scientific Visualization；双端职责因领域不同 | 定义科学与产品语义、制作作品、对实际成品做专业检验；必要时使用 Artifact Curation 与 Clear Writing | 只对自己领域的事实和作品正确性负责 |
| **Bridge Kit** | 现有 Codex 执行基础设施 | 任务身份、工作树、已有 Lite/Review/Control、权限、运行与失败/恢复基础设施；Persistent Run 保持其原责任 | 不决定技能组合、不发明验收标准、不负担成品质量裁决，不为此创建新常驻服务 |

**预计新增数量**：两个插件（Reasoned Design、Delivery Assurance）、一个独立共享 Skill（Artifact Curation）。其余尽量复用；目前不计划新 MCP、数据库、AI 客户端或额外常驻 Agent。上述职责是目标架构，**实施前仍允许根据真实调用证据精简或修正组件**。

一个复杂 Codex 任务可能组合多个插件，例如：Reasoned Design 确认目标与取舍 → workflow-core 路由专业能力 → 专业插件制作 → Artifact Curation 判定什么值得呈现 → Clear Writing 处理保留文字 → Delivery Assurance 核对正式承诺/旧功能/最终专业证据。**这只是可能路径，不要求每个任务都依次调用全部组件，也不表示这些跨插件自动调用目前已经接通。**

## 三、当前 Delivery Assurance 案例的事实与架构演化

用 Delivery Assurance 作为复杂系统讲解网站的首个完整样例。研究源位于本仓库 `research/software-production-decision-20261013` 分支：

- [当前状态](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/CURRENT.md)：**R3 架构审查设计阶段 PROCEED；完整生产接线、宿主探针、七仓 DA 启用及最终产品验收尚未实现或证明**。
- [现实、替代方案与源码边界](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/01_REALITY_AND_ALTERNATIVES.md)。
- [已有架构](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/02_ARCHITECTURE_AND_COMPONENTS.md)：此前主张“Bridge 现有入口 + workflow-core 小型共享判定 + 项目专业验收”。
- [真实调用、专业验收、返修和接口](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md)，以及[实施与成本](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/06_IMPLEMENTATION_AND_EVALUATION.md)。
- [现有解释及 Lucerna 真实问题](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/11_ARCHITECTURE_EXPLAINED.md)。

现有 DA 研究建议的工程投入**138–332 小时**、首片 **40–88 小时**、宿主前置探针 **4–8 小时**，均是**旧方案估算而非实际耗时**。新目标架构明确将交付判断责任放在独立 Delivery Assurance，workflow-core 负责能力路由与协调，Bridge Kit 保持基础设施。**两份资料不完全相同，必须给读者解释“原研究方案”与“当前建议调整”，不能悄悄把旧设计图改称新系统的已实现结构。** 最新整体候选见：

- [AI_Skills_Collection：职责架构](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)
- [AI_Skills_Collection：实施路线图](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ROADMAP.md)

## 四、复杂系统讲解的质量目标

网站必须让没有参与数轮方案讨论的人看懂并能判断：

1. **是什么、能做什么**：从真实用户任务和遇到的错误入手，而非内部模块名。
2. **为什么值得做**：替用户避免哪种具体失败、节省哪项实际工作、成本是否合适。
3. **如何工作**：一条正常成功链、一条失败并被实际消费/修复的链、一条应该保持不变的旧能力保护链。
4. **各组件为什么必要**：每个组件准确负责什么、从哪接收什么、交给谁；移除后哪项能力在何种情况下失效；能合并的要敢于删。
5. **凭什么信它有效**：当前正常入口实际观察、现有代码、设计提议、未验证假设与不可用的边界各自清楚；不能把图示或测试数量当成功证明。
6. **具体下一步与投入**：最小可否决试点、真实依赖、预计成本，以及是否值得继续。

**内容准入原则：** 所有可见句子、图片、卡片、徽章、按钮、动画和图形都必须有明确读者价值；可以留白。视觉专业、简洁、成熟，重要的因果过程和实际差异应容易理解。避免大量相似模块卡片、象征性箭头、虚构 UI/运行状态、内部状态码、过程和角色汇报；技术详情进入按需展开的证据层。不能因追求短而删除真实机制、重要反例、成本或专业约束。

两份现有根目录标准继续作为研究依据：
- [复杂系统设计与交付](COMPLEX_SYSTEM_DESIGN_GUIDE.md)
- [复杂架构的可信解释](COMPLEX_ARCHITECTURE_EXPLANATION_STANDARD.md)

## 五、来源和维护边界

本文件是**设计题目背景和跨仓引用索引**。Toolkit 不变成第二个 Skill Marketplace；未来正式技能代码、测试及生成层都由 AI_Skills_Collection 管理。当前研究中的两个 GPT 只可在各自研究分支交付提案/视觉原型，不得修改此文件、已有 DA 研究、生产项目或正式插件。本文件的陈述须以其引用的有效分支和原始材料为准；发现事实变化时在自己的研究结论中列明，不得静默修改共同输入。

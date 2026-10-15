# 历史反证与独立候选修订

RUNNER_ID: GPT6_PRO
INPUT_SNAPSHOT_COMMIT: 60d0a1feb7ca1efc8f751774850a4ec176b9ab6f
INDEPENDENT_FREEZE_COMMIT: 3a8e5df5360c20814bbbf34d7a4f392655437588
HISTORY_SNAPSHOT_COMMIT: 3a8e5df5360c20814bbbf34d7a4f392655437588
RESEARCH_DATE: 2026-10-15
REVIEW_SCOPE: ARCHITECTURE_RESEARCH_ONLY
IMPLEMENTATION_AUTHORIZED: NO

## 一、历史反证改变了什么

**应否决另建统一生产控制平台；保留修复现有真实入口的路线，但不能把它简化为再加规则或再加一次审查。** 第一阶段的A“不建新通用系统”仍是首选基线；B“现有Bridge内薄适配”被收窄为仅解决已证实的连接缺口，不作为预定产品；C“显式受管入口加成熟持久引擎”仅在现有入口确实无法覆盖长任务且用户选择该入口时保留。没有证据支持现在同时铺开七仓公共运行包。[F01、H06–H09]

历史不是只提供了支持。v0.7已经提出唯一拥有者、项目专业检查和无状态证据引用，v0.8也已经提出短命检查接口。因此第一阶段A/B的责任分工并非全新发现，更不能因为独立得出相近结构便声称验证通过。最重要的修订是：**不再以“薄”“无状态”“可信收据”作为成立证明，而以正常入口是否真正调用、谁有权阻止下一步、每项必需场景是否被覆盖、检查器是否测对对象以及实际净收益来裁决。**[H07、H08]

本阶段没有改变已冻结的01。以下明确区分历史原文、当前源码checkpoint、官方能力与本人推导；不把旧审查者的实验冒充本轮实测。

## 二、读取完整性和证据边界

v0.6四卷、README、构建报告、两份历史合同、完整汇编附录、排版源和四图DOT均已读；v0.7全部八文件已读；v0.8根目录00–11、README及reviews原文已读，其中363行CSV全部逐段检查；original_reviews六个文件的全部独特内容已读，GPT55与v0.8同blob去重。逐文件固定blob与实际范围在checkpoints/12A、12B、13、14、15中。[H06–H09]

旧PDF已确定存在，但GitHub连接器拒绝二进制UTF-8读取，raw地址也未取得文件，所以没有独立渲染或审查其任何页面。全部架构、附录和图关系的文本已取得，这一呈现限制不妨碍架构反证；但不能把历史BUILD_REPORT的76页或视觉通过声明写成亲见事实。[H06B]

十个源仓库与四冻结输入继续复用第一阶段checkpoint，没有重读。三份原始审查分别是GPT55的REVISE、GPT56的REJECT、GPT6的REVISE；GPT6的多个文件是同一次审查，不是多票。另两位当前独立研究者的输出从未读取、引用或比较。[H09]

## 三、对三个冻结候选的主要攻击与修订

### 1. “已经有规则，修规则就够了”无法成立

v0.6和原始审查都展示了大量既有规则与真实失败并存：真实入口被API或夹具替代、局部helper正确但没有被正式消费者使用、可写判据自行放行、原生验收污染桌面。A若只精简AGENTS、加原生目标模式或写一句Stop前检查，会重复旧失败。历史足以否定这种弱化的A，但不足以否定所有“修现有入口”的实现。[H06、H07、H09]

**修订A：** 正常入口必须实际取得针对当前消费对象的领域结论；有权执行下一步的既有主体必须消费结论。例行开发检查可以由实现者运行；正式放行不能以其可单方改写的结论为最终依据。同步Stop只负责适用的短轮次续接，受保护发布门只负责不释放错误产物，长等待则必须已有明确持久责任者。三者缺一时要准确标明缺少的能力，不能互相冒充。

### 2. B可能只是把v0.6中央系统改名为“薄适配”

一旦B自己决定目标版本、检查清单、角色预算、任务阶段、暂停与重试，并把这些状态放在单独文件中，它就已成为第二控制者；代码放进Bridge仓库或进程短命并不能改变这一点。v0.7的削减与v0.8的五子命令都没有自动消除该风险。[H07、H08]

**修订B：** B没有自己的任务创建、授权、阶段、预算、轮次、排队或发布状态；仅将原有记录中的任务、候选、必需检查与结果做可替换适配。判断规则由领域及受保护验收源拥有，调用时机与后续动作由现有任务拥有者决定。删除适配后，原拥有者仍应能解释任务、找到证据并恢复，不能丢失独占状态或恢复秘密。若无法满足这个“可删除性检验”，B应取消或明确按C重新比较，不能继续称薄。

### 3. 一个声明有证据，不等于它要求的所有场景有证据

v0.8的evaluate_required_claims草图接收required_runs，却仅逐声明查找与候选匹配的一份证据，未消费required_runs。于是“取消不会保存”在一个窗口路径通过，不能覆盖关闭、隐藏、重开、重启等其它必需路径；模型有一个病例指标，也不能覆盖全部规定病例、模态与失败输入。[H08：H08-1]

这是提案的静态反例，不是已运行漏洞。它同样攻击本人B原先过粗的“关联声明与证据”。**修订为逐项核对已批准义务在其必需场景、消费目标及阶段上的覆盖**；不是机械做所有维度笛卡尔积，也不要求每次运行所有组合。领域合同先决定哪些单元必需，适配只检查这些单元是否都有有效结论。缺测、过期、跳过、对象不匹配必须保持未证明，不能用另一个成功单元补位。

### 4. 来源可信、观测真实和判断正确是三种性质

CARE的代理指标、Asteria的恒零几何量、Android测试工具错误定位，以及STAT5060历史评审低召回，都表明一个审查进程可以诚实地测错对象或套错标准。只读文件、不同模型、签名、摘要和受保护工作流只能覆盖其中部分风险。[H06B、H08、H09]

**修订全部路线：** 验收同时检验来源与权限是否可信、正式消费路径是否真实发生、领域判据是否适用。输入替换应发生在受控的真实I/O边界，并继续经过同一正式消费者，不能直接塞最终状态。数学等价、正确输入、合法零值及工具故障都要有正反对照。审查者只能在已校准领域和错误族内获得有限放行权；看不到真实对象时弃权，不借更高置信度补证据。

### 5. 历史覆盖表本身会误导检查选择

全文读取363行后，发现可直接定位的领域错配：Lucerna:L07的桌面污染及LX15–17的图标/交互/设计问题被配为科学语义或公式探针；CARE:C01出现C-PASSWORD控制、C21出现C-PRODUCT/C-WEB；CARE:C02的模态输入问题被配为渲染审查；CARE:RACE-01的优化器配方偏离被配为隔离检查。[H08：H08-3]

这些表内值足以说明控制分配存在错误；与另一项目同名C编号共存，只能提示可能的编号混用，不能在未读生成器时断言其代码根因。若把这样的表作为自动任务路由，新增基础设施反而会稳定地调用错误检查。

**修订A/B：** 历史表降为检索与候选反例索引，不自动生成当前义务、检查或成功标准。按全局项目身份保留原编号，并将当前事实、已修历史、潜在风险和正确边界分开。来源齐全不等于因果解释正确，也不等于对应防线已在正常入口生效。本人不据363这个数量估计召回、收益或所有问题均已解决。

### 6. C拥有恢复能力，不代表符合用户正常入口

当前官方SDK/CLI能创建和恢复受管线程，CARE源码也有精确线程恢复；这些并不证明用户普通Windows App的任意既有会话都可安全被外部系统接管。成熟持久引擎能保留事件和重试活动，不会产生原本不存在的桌面附着权限，也不会使Slurm外部提交自动恰好一次。[F10、O-A、O-C、O-D]

**修订C：** 仅接受用户明确选择的受管任务入口；生命周期由该入口创建并拥有。成熟引擎作为原拥有者的替代底座而非第二套恢复器。若维持任意原生App使用方式不变是硬约束且没有安全接口，C不能被包装成其答案。反过来，不能因这项限制永久否定所有受管入口；只有真实需求与授权选择成立时才进入成本比较。

## 四、三位原始Critic的21项要求如何处理

下表是本研究对要求的处置，不冒充旧Critic已经关闭其阻塞，更不表示用户环境已运行通过。“保留约束”表示最终候选必须满足；“反驳外推”表示接受具体风险但不接受过强结论。

| 原编号 | 本研究处置及对应修订 | 真正的关闭证据，而非再次补文字 |
|---|---|---|
| GPT55 B1 | 接受实际最小机制，反驳必须新发公共CLI；A先修现有入口，B需重复缺口 | 正常入口真实调用；失败能在下一副作用前由有权主体阻止；同任务返修 |
| GPT55 B2 | 保留三类产物身份与独立证据，补义务/场景覆盖 | 实际安装二进制、部署URL或模型权重与观察对象一致；替换候选或旧证据不能放行 |
| GPT55 B3 | 保留领域准入/撤销，不接受独立模型天然合格 | 未见坏例、好例、工具故障对照及范围内误报/漏报；改模型/判据后重校准 |
| GPT55 B4 | 保留七仓差异，不先做七仓迁移 | 每仓可复用入口与实际新增工作；小修不触发全部平台链；测维护及人工代价 |
| GPT55 B5 | 成熟工具优先但不强迫另建登记/监控服务 | 能力与任务匹配、用户计划/版本/隔离可用；成熟工具不能替代专业判据 |
| GPT55 B6 | 身份与视觉分别处理 | 本研究保留旧PDF未渲染；不把其视觉质量纳入新架构结论；不假称已补验 |
| GPT55 B7 | 接受可追溯索引，否定字段完成等于因果覆盖 | 纠正控制归类前不允许用于自动路由；同机制未见反例与当前正常入口才验证防线 |
| GPT56 P0-ARCH-01 | 接受禁止第二拥有者；按任务/资源域而非全环境超级主控 | 两实例竞争、重复事件与接管后的旧执行者不能再次产生有效副作用 |
| GPT56 P0-ARCH-02 | 接受对十二职责新运行体系的否决；反驳薄且强制普遍不可能 | 无状态判据由现有受保护门强制消费；B自身没有独占状态/预算且可删除 |
| GPT56 P0-TRUST-03 | 接受；拆开来源、真实观察和专业效力 | 实现者不能改正式判据或签发自己通过；正确来源下的错误测量仍能被反例识别 |
| GPT56 P0-SCOPE-04 | 接受产品与科学语义分开 | 产品缺陷不得用研究NO_GO结束；按协议完成的科学否定不得触发无限调参 |
| GPT56 P1-ADAPT-05 | 接受；专业动作留项目 | 公共层不重写账号/票据、媒体作业、训练状态或原生控件语义 |
| GPT56 P1-RULE-06 | 接受中央不自动退休语义规则 | 规则合并保留要求来源与安全语义，由原拥有者批准并有回归和回滚 |
| GPT56 P1-REVIEW-07 | 接受资格按领域，非模型总排名 | 低召回审查者撤销相应放行权而保留建议能力，不自动把整批QA交给用户 |
| GPT56 P1-RUN-08 | 接受恢复/副作用明确；不强制全部迁到Bridge | 原任务检查点、动作意图、真实结果与结果不确定分开；恢复前核对副作用 |
| GPT56 P1-PERM-09 | 接受真实权限闭包 | 有效工具/凭据/会话在首动作前核对；未授权写工具和默认私人资料目录不可达 |
| GPT56 P1-ART-10 | 接受用户消费身份；旧PDF限制单列 | 交付物与验收对象同一；正式报告承认未实际读取的呈现，不能引用自述通过 |
| GPT56 P2-EVID-11 | 接受对照及因果去重 | 同类任务与固定风险范围比较逃逸缺陷、误拒、人工劳动，不用登记总数作收益 |
| GPT56 P2-COMP-12 | 接受削减职责，不从责任名推独立程序 | 明确归属已有系统；新增代码只为真正未覆盖的接线且可删除 |
| GPT6 R1-P1-01 | 接受合法状态/角色/总预算；下节给三类调用链 | Reviewed不在EXECUTING新增正式Review，最多两轮预算不因新ID/报告修订重置 |
| GPT6 R1-P1-02 | 接受实际配置和脚本传递副作用 | Preflight内Apply、继承写MCP、个人桌面/默认Zotero应在执行前被拒；合法隔离正例能运行 |

这些要求涉及能力、成本和安全，不要求本研究现在运行危险负例。最终报告给出决定性探针与明确决策后果，不把全部未测项转化为无穷的新评审轮次。[H09]

## 五、把“由原拥有者执行”落实为三条调用链

### 明确的小文案修复

现有项目任务入口确认文本含义未改变，不另启正式规划/审查角色；实现者修改后运行受影响的文本、构建和必要局部渲染检查。若当前已信任Stop能够运行短判据，发现遗漏便向该原线程返修。合并或发布仍由既有平台门决定。小修不默认启动Windows原生安装、真实账户会话或科学全套，更不因文件改了一行而跳过本来受影响的密码规则、数据含义或共享组件。

这里的Stop不是Bridge正式Reviewer，也不改Reviewed轮次。当前环境hook未证实就不声称这条自动续接已上线；缺失只影响自动返修能力，不能解除发布门。[F02、O-A、O-B]

### Lucerna完整功能

原拥有者先确定批准功能范围与开发预算；R2阈值80只是历史演练，不能当本轮新授权。开发者沿现有提供方输入、聚合、持久设置和通知消费者实现，运行便宜确定性检查；这些不冒称独立正式Review。完整稳定候选就绪后，才在已隔离且授权的原生会话观察一次有关的真实状态序列。结果通过现有合法审查阶段消费，Reviewed仍按READY_FOR_GPT_REVIEW或其允许的CI失败分支记录，沿用原总轮次；不再增加一套“内部Reviewer+Work最终再审”的影子预算。[F04、H07、H09]

若某一步涉及新的高影响资源，必须在动作前由原授权机制拒绝越界，而不是末尾报告说本次不该运行。若功能本身需要成本前独立语义批准，而原模式不具备合法入口，应明确选择已有适用模式或提出最窄公共变更，不能把“开发测试通过”谎报为那次独立批准。通知状态必须区分尝试、可观察成功、失败、未知与真正恢复；现有通知门复用和修复，不加通用通知数据库。

### CARE高成本方法

现有科学任务拥有者冻结当前有效的目标、数据口径、模型/优化语义、授权预算和停止条件。早期开发的CPU/小张量检查验证标签、分母、指标对预测的依赖以及各模块是否进入正式消费链。**在扩大训练投入前，由已获权的独立科学验证阶段消费真实第一条生产链证据**；已有CARE角色/Control适用时直接复用，不把普通Reviewed在EXECUTING期变成新的正式Reviewer。[F10、H09]

如果没有可用且已授权的独立成本前入口，下一项昂贵动作不释放；这不是暂停所有研究，便宜源码分析和已授权修复仍可继续。训练提交、等待、账务、重排、聚合和最终评价归同一科学作业责任者；访问隧道恢复归Remote Compute，不互相重提对方任务。科学协议被合法修改要保留新旧关联，不用原版本永远否决等价或已批准修订。结论可以是合法NO_GO，但缺数据、指标虚设、模型未实现或欠预算必须报告为未完成/证据不足，不能借NO_GO结题。[F03、F10、O-C]

## 六、修订后的路线裁决与证伪条件

| 路线 | 第二阶段裁决 | 保留的真实能力 | 否决或退回条件 |
|---|---|---|---|
| A：不建新通用系统 | 首选基线，不能弱化为提示词 | 原生目标/Stop、项目专业判据、现有持久拥有者和平台交付门分别发挥效力 | 普通入口不能实际消费，原任务无人继续，专业判据低效；这些缺口需定位而非宣称A已胜 |
| B：既有Bridge窄适配 | 有条件保留，不预定开发独立包 | 消除同类跨项目证据/任务/线程关联重复，现有拥有者仍唯一 | 新状态/预算/角色、复制领域逻辑、不可删除、同权自签或无净收益；满足任一则不扩建 |
| C：显式受管入口及成熟持久底座 | 保留为明确替代，不作为默认方案 | 创建时拥有线程与生命周期，适用于确有跨主机持久需求 | 假称接管任意App；另起竞争控制者；A/B足够或维护代价超过收益 |

不设置人为加权总分，因为没有可信成本和故障率实测。首先排除越权、双拥有者、错候选放行和科学语义偷换；随后比较同等质量下真实用户劳动、返修代价、逃逸缺陷与维护成本。高级工具名、更多代理、更多用例、更多登记字段均不能直接得分。

## 七、研究到此已经能决定什么

历史资料足以支持三项明确决定：不批准新统一平台作为默认路线；不批准把v0.8覆盖表直接变成自动检查选择器；不接受仅靠收据/同源审查声称具备专业验收。它还不足以判定用户当前Windows原线程恢复已跑通，或B相对A已产生正净收益。这些是有明确真假后果的待测能力，不妨碍完成本次架构研究。[F01、H08、O-A]

最终03应把上述裁决落到七项目适配、Slurm完整收尾、观察与规则所有权、专业质量及有界验证计划；不继续生产新一轮通用治理文件，也不生成未经授权的执行Goal。01保留历史前的真实判断，本02保留被反证后的差异，下一阶段直接综合完成。

## 参考文献与独立定位

所有仓库内引用均属于YuukiAS/AI_Research_Toolkit。根路径为docs/research/software-production/；本研究输出子目录为13_INDEPENDENT_ARCHITECTURE_RESEARCH_GPT6_PRO_R0/。下列固定提交和完整相对路径可在GitHub独立定位，不依赖聊天引用。

[F01] 本研究第一阶段。13_INDEPENDENT_ARCHITECTURE_RESEARCH_GPT6_PRO_R0/01_INDEPENDENT_CANDIDATES_BEFORE_HISTORY.md，commit3a8e5df5360c20814bbbf34d7a4f392655437588，blob4ec5855bb69a9087f35cfa61a29a80350f2c8ef5。
[F02] Bridge当前源码事实checkpoint。13_INDEPENDENT_ARCHITECTURE_RESEARCH_GPT6_PRO_R0/checkpoints/02_BRIDGE.md，源release9db19b0409816c22042a246b35a33e1d34fedd0a；完整实际源文件/ref/读取范围在该文件。
[F03] Remote Compute当前事实。相同输出根下checkpoints/03_REMOTE_COMPUTE.md，源main ca0bad392ce1295e76a07a5d8f9c9dd27d3f61d7。
[F04] Lucerna当前事实。相同输出根下checkpoints/04_LUCERNA.md，源main79dd2875d3da33c6a6d80e5e35bea812b84c1ceb。
[F10] CARE当前事实。相同输出根下checkpoints/10_CARE.md，源main75a40e454de43b64e59a0b0b438ff57ef2bb8345、develop184cc16bc00dbb4edce80e2c848bdaabae4f782e。

[H06] v0.6全四卷及附属核心。09_FULL_DOSSIER_V0_6/；本研究定向读取历史快照3a8e5df5360c20814bbbf34d7a4f392655437588。逐文件清单在输出根checkpoints/12A_HISTORY_V06_CORE.md，commitc9bb5ddfc6a858e07769b64aa77ecc59796cffd8。
[H06B] v0.6完整汇编附录、构建源、图源与PDF访问限制。源typeset/workflow_architecture_dossier_v0.6.md，blob8c759bc78b7c690e75b620792aafd37dc15cd963；输出根checkpoints/12B_HISTORY_V06_APPENDICES.md，commit0eacf14b7a49bc6a39e80d95ce53647aa46d7e87。
[H07] v0.7八文件。10_POST_CRITIC_REDESIGN_V0_7/，同一历史快照；输出根checkpoints/13_HISTORY_V07.md，commit031eccccd850d07c986d8dc0bf4ea2cae9f2ff2b。
[H08] v0.8全目录。11_THREE_CRITIC_RECONCILIATION_V0_8/，同一历史快照。关键原文01_EXECUTABLE_KERNEL_AND_PLAN.md，blobba85447a7cb0fff12e05cd37d026d3bd3a2e07ec；08_FULL_CASE_COVERAGE_MATRIX.csv，blob98cc2377c54ba6bc9d9ca9e80f3bf58afe564981。全文读取与反证见输出根checkpoints/14_HISTORY_V08.md，commit8205c1f7c673dc0e8123870d2568f6ae6437ef3c。
[H09] 三位原始审查。12_COMPLEX_DELIVERY_REQUIREMENTS_INTAKE_20261015/original_reviews/，同一历史快照。GPT55_R1_USER_ORIGINAL.md，blob4ccea7ce49c2dcba63e5bb1360e73541413064ed；GPT56_R1_REJECT_ORIGINAL.md，blob127f2829d05e05834838983e4ffdbb9847fafda2；GPT6_R1_FULL_ARCHITECTURE_REVIEW_ORIGINAL.md，blob61b296f345daa32d71861986640bc5109d244a4f。其decision、四卷表和历史prompt亦全文读，完整清单见输出根checkpoints/15_HISTORY_ORIGINAL_REVIEWS.md，commit48c1f181d90a8f2b723d30d337449ed398111d70。

[O-A] OpenAI. Hooks；Long-running work；Codex SDK；Non-interactive mode；App Server。https://learn.chatgpt.com/docs/hooks ；https://learn.chatgpt.com/docs/long-running-work ；https://learn.chatgpt.com/docs/codex-sdk ；https://learn.chatgpt.com/docs/non-interactive-mode ；https://learn.chatgpt.com/docs/app-server 。访问2026-10-15，具体限制见输出根checkpoints/11A_OFFICIAL_CODEX.md。
[O-B] GitHub. About protected branches；Troubleshooting required status checks；Secure use reference。https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches ；https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks ；https://docs.github.com/en/actions/reference/security/secure-use 。访问2026-10-15，核查见checkpoints/11B_OFFICIAL_GITHUB.md。
[O-C] SchedMD. Job State Codes；sbatch；sacct；Job Array Support。https://slurm.schedmd.com/job_state_codes.html ；https://slurm.schedmd.com/sbatch.html ；https://slurm.schedmd.com/sacct.html ；https://slurm.schedmd.com/job_array.html 。访问2026-10-15，核查见checkpoints/11C_OFFICIAL_SLURM.md。
[O-D] Temporal. Activities；Workflow Execution。https://docs.temporal.io/activities ；https://docs.temporal.io/workflow-execution 。访问2026-10-15，核查见checkpoints/11D_OFFICIAL_PROFESSIONAL_TOOLS.md。成熟引擎的持久性不替代外部幂等、授权和专业正确性。

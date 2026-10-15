# 研工台 v0.6：独立架构审查 R1

**结论：保留“复用现有执行体系的薄适配层”这一方向，但不批准当前版本进入实现。** 拒绝的是当前两处尚未闭合的执行合同，不是因为程序还没写出来。第一，早期独立审查如何合法接入 Bridge 的既有角色、状态和总预算没有明确对应；第二，实际审查进程及观察脚本的权限边界没有落实为能在副作用发生前判定的调用合同。

```text
CRITIC_VERDICT=REVISE
REVIEW_SCOPE=DESIGN_ONLY
P0=0
P1=2
IMPLEMENTATION_AUTHORIZED=NO
```

我不建议另建一个统一管理六仓库的常驻中央平台，也不认为再增加一个 Skill、提示词或末端审查就足够。可以保留的最小共性是：定位有效目标与当前候选、按影响调用已有专业能力、在成本扩大前取得真实观察、由不受实施者单方控制的入口消费结果、沿原任务归因和有界恢复。科学、视觉、语言、原生桌面和数据库的具体正确性仍应由项目及领域实现负责。[V1][S-RUN][BR-AGENTS]

本轮没有实施研工台、运行新的审查模型、修改六个产品、操作用户图形桌面、访问医学数据、提交集群作业或启动付费实验。只运行了三个隔离的低成本诊断：B6指标纯函数、Asteria测量纯函数和临时Git仓库的差异范围。它们证明旧机制的局部缺陷，**不证明研工台已经能在正常入口抓住这些缺陷**。

## 一、审查对象、读取范围和不能声称完成的部分

设计对象固定为 `YuukiAS/AI_Research_Toolkit` 的 `dcc8b073c84174ede5c277776fdc31c01a9b943e`。四卷 Markdown、六仓库246项登记及对应控制表、25项晚期补查、CARE原40项和新增52项归因均已读取。补充读取了运行架构、独立审查派发、隔离、AGENTS生命周期和CARE模型运行演练，并回到六产品、CARE、Bridge及Spec Kit的相关原文件。四卷核对按设计责任、实质主张和场景合并成88项，含12组件、21项用户问题、Lucerna全部14阶段和12个场景；逐项表在同包 `four_volume_claim_review.md`。[V1–V4][MAP][LATE][CARE40][CARE52]

审查合同文件不在上述冻结提交中，按给定分支读取到了后补的16节全文。本轮使用该合同约束审查，**没有把后续分支内容混入被冻结设计**。所读合同文件的blob为 `383886b207e33b01233f644018de2fffb0a24d99`。[REVIEW-CONTRACT]

**PDF阅读没有完成。** 已核对PDF的仓库对象及构建报告，但连接器未能提供可在本环境读取的完整二进制；按二进制对象读取又发生UTF-8解码错误。因而本轮没有独立查看任何PDF页面。构建报告称76页并记录若干渲染检查，那是构建方的证据，不是我的检查结果。不能据此宣布排版、图表可读性或Markdown/PDF逐页一致性通过。此项是审查材料获取限制，单独保留；不把它伪装成架构缺陷，也不把本报告称为已完成PDF实物审查。[PDF-BUILD]

所有363项都有保留原编号的逐条判断、来源定位、证据等级和正确情形，见 `registration_review_363.csv`。CARE原表的编号是C01–C40；为避免与CUHK_Date同号，表内唯一索引使用CARE-C01–CARE-C40，同时保留“原登记编号”列。**这不是363次独立事故，也不是363次独立复现。** 有些行只有已读登记作为线索；另一些回到原始报告、合同或源码；只有明示的诊断有本轮运行结果。其中219项关联到了另读的原始材料或局部诊断，144项仍只有登记级线索；前者也不等于219项事实已逐条证实。原始历史现场、私人截图、全部模型附件与所有历史运行没有穷尽重放，表内明确区分，不用映射数量补足证据。因此，本轮可以作出阻止当前设计放行的裁决，但不能把用户要求的全部逐项原始核查和PDF实物审查称为已经完成。[CARE52][CARE-LINEAGE][CARE-RECOVERY]

本轮实际核查的产品基准与设计采用的历史基准一致：Lucerna `79dd2875…`、Bobbio `a64edfd6…`、Mica `0aee22f3…`、SeminarArc `5652fe17…`、Asteria `193c0336…`、CUHK_Date `9f25c775…`；完整提交见参考文献。Bridge现行实现固定到本轮读取的 `a7931fdfc6e3d71cf985351df075de17097795e6`。这不表示用户机器实际安装的就是这些版本。

## 二、为什么不是直接推翻，也不能放行

### 可以成立的最小架构

六仓库确有共同问题，但不是共同的“专业正确答案”。共同问题是：目标被实现者缩小，替代指标被当成最终能力，观察器与被观察对象共享错误假设，或者任务没有一个真实负责完成与停止的入口。真实提供方到用户状态、实际预测到指标、页面到可见交互，本质上都需要证明当前承诺的那条消费链确实发生。[L-R2][CARE-B6][C-REG][A-VALID]

因此，任务定位、能力调用、候选与观察绑定、失败归因和有界恢复可以复用。第一卷把12项责任合并为四组程序，并明确不新增12个常驻进程、不建立第二份CURRENT、不让每次小改跑全套，这一点比“大一统控制平台”更合理。当前设计也已经写了正确实现、缺证据、未见样本、错误验证器撤销资格及合法科学负结果；不能把这些已存在的设计说成完全遗漏。[V1][S-DISPATCH][S-ISO]

### 应削减或禁止膨胀的部分

不保留一个并行决定阶段、预算、执行授权和重入的中央控制者；这些权力已有Bridge所有者。不保留一个用统一模型、统一表格判断医学方法、统计推断、视觉和文案是否正确的万能裁判。不把用户的每个小改转为独立规划、设计、实现、审查、再审查和发行仪式。没有第三类真实平台的复用证据前，不宣称六仓库已经获得通用收益。[BR-AGENTS][BR-SPEC][V1][V4]

研究仓库可存设计、适配代码和研究证据，但存放地不自动赋予运行时控制权。既有AI Research Toolkit入口主要管理工具资源与本地检查；不应把仓库名称当成“适合承接全栈生产控制”的证明。[ROOT-README]

### REVISE的边界

目前有现实的窄修订路线：把阶段检查接回已有合法所有者，并明确每次进程的有效能力与观察器的受控副作用。它们不需要推翻领域分工、重写六仓库或新建庞大基础设施，所以现有证据不足以要求整套重做。反之，如果Planner的解决办法是再造一份控制状态、扩大所有任务的角色链，或把安全问题继续交给模型自觉，就应在下一轮改判REJECT，而不是继续细修措辞。

## 三、必须关闭的两项设计阻塞

### R1-P1-01：早期审查、最终审查与现有Bridge角色／状态／预算没有可执行的一一对应

**原始要求。** 在第一条真实链形成后、全面实现或昂贵训练之前，独立判断是否忠实；同时不得新增平行控制者、额外正式角色或通过换任务编号重置审查预算。普通任务还必须比现有工作方式更轻。[V1组件5/6/9/11][S-RUN][S-DISPATCH]

**直接证据。** 派发设计明确由外层任务入口新建顶层审查进程，而不是实施者的子代理，并在早期真实链和最终候选阶段消费结论。第四卷随后又有内部独立审查及GPT Work交接。然而现行Bridge Review合同固定三种逻辑角色，不允许另起正式Verifier/Auditor角色；实际 `record_review()` 只从 `READY_FOR_GPT_REVIEW`，或CI失败的 `WAITING_FOR_CI` 分支受理审查，随后推进既有轮次与最多一次实施返修。材料没有说明“尚未完成全部实现时的忠实性审查”如何进入该状态、如何不冒称实施已完成、如何与后面的内部审查和Work共用预算。[S-DISPATCH第1/2/7/8节][V4阶段4/6/9/11][BR-SPEC][BR-REVIEW：record_review]

这里不是说任何只读分析都需要新正式角色，也不是说Bridge不能调用辅助程序。**缺的是权限与控制归属，而不是一个函数名**：早期审查究竟是Planner在实施前提供参考、实施期受控机械检查、既有Reviewer的一个合法证据阶段，还是必须使用Control模式的独立验证阶段？当前文字“按现有合法模式”没有完成这个决定。把结果只作为开发建议可以合法，但那又不能宣称已经形成重大成本投入前的强制准入。

**因果风险。** 实施者可能先完成昂贵动作，再提交形式上合法的末端审查；也可能为了插入早期独立结论，另开影子审查者、反复重入或生成新任务，重新制造CARE曾出现的角色和身份循环。即使每个局部审查本身正确，整体也可能没有合法的停止者，或提前耗尽最终返修预算。[BR-CARE][BR-REVIEW]

**最小关闭条件。** 在设计中给出“小文案修复、Lucerna完整R2功能、CARE高成本方法”三条实际调用链。每条说明：现有模式；每阶段唯一所有者；调用哪个现有函数或确切拟议接口；什么状态可以调用；哪次属于正式审查；如何累计总预算；谁能阻止尚未授权的下一步副作用；工具修复、等待和语义不变材料修复如何不被算作新产品。涉及当前Bridge确实缺失的公共接口，单独给最窄修订方案及影响，不声称已经存在。禁止把全部任务升级Control、增加第二份CURRENT或靠新ID恢复次数。图形/训练动作前的拒绝点必须存在于调用链中，不能只出现在结束报告里。

**责任方与阶段。** Planner负责选择和写清方案；Bridge维护者确认现行入口能力及必要的最窄公共变更。Critic关闭阻塞。现在要求设计闭合，不要求本轮实现或运行；通过后仍需试点验证实际状态转移和预算行为。

### R1-P1-02：只读审查与原生观察缺少完整的“实际能力—副作用—拒绝点”合同

**原始要求。** 实施者不能修改正式判断源；审查者不能操作生产系统；观察器不能因为得到一个场景ID就获得任意脚本能力；测试不得污染个人资料或用户正在使用的桌面。做不到隔离时只能称内部审计，不能称技术防绕过。[V1组件7–10][S-DISPATCH][S-ISO]

**直接证据。** 拟议调用使用独立只读目录和 `codex exec --sandbox read-only`，并正确禁止自动信任候选AGENTS、钩子和插件配置。但官方参数定义中的沙箱策略针对模型生成的命令；MCP、插件提供的MCP和已有用户配置还具有各自的工具策略。普通命名配置会叠加基础配置，而不是天然创建一个无外部工具的审查身份。当前设计没有将启动时的有效工具、钩子、凭据与网络权限收敛成可判定的允许集合。[S-DISPATCH第2节][OFF-CLI][OFF-MCP]

在观察器一侧，Bobbio的 `Invoke-BobbioAcceptanceSafe.ps1` 在向下游传递 `PreflightOnly` 之前，已可能调用清理更新缓存的 `-Apply`，并用 `Apply=$true` 准备隔离资料目录。Lucerna验收脚本及窗口捕获入口也使用真实显示、前台窗口和截图API。它们可以是合法测试工具，但**不能仅凭Safe、Preflight或已登记的脚本名，被归类成没有额外副作用的只读观察**。[B-WRAP][L-ACCEPT][L-CAPTURE]

我已考虑设计中“无操作系统隔离不宣称防绕过”的自限，也认可三类逻辑隔离域。这里并非要求现在证明宿主安全或建立新权限平台；缺口是：这些自限尚未成为示例启动命令和项目适配器必须检查的具体条件，尤其是用户配置中继承的外部写工具，以及已批准包装脚本继续调用的其他脚本。

**因果风险。** 文件只读而远端写工具仍可用，或者观察脚本进入所谓预检之前已修改共享目录，会让审查与测试过程越过任务权限。此时后置检查即使正确报告失败，也无法收回已经发生的外部副作用；反复让用户关闭程序、修复资料或重新授权，又直接违背减少用户参与的目标。

**最小关闭条件。** 写明审查与观察进程各自的有效能力来源、允许的工具/只读数据源、禁止继承的写能力、候选规则作为数据而非指令的装载方式、受控观察器的可信版本与传递调用范围。对每个原生动作说明可写目录、会话、进程与凭据范围，并在第一个副作用之前确认授权和隔离。给出针对“全局MCP写工具意外继承”“PreflightOnly仍执行Apply”“用户桌面/默认Zotero实例可达”的拒绝设计及对应合法正例。可以复用现有CLI配置、系统账户、受限会话和项目脚本，不要求新服务；不得通过修改全局CODEX_HOME、忽略规则或扩大管理员权限解决。无法提供技术隔离的场景必须明确降为内部审计且限制高影响执行，不能静默降级。

**责任方与阶段。** Planner负责跨组件调用合同；平台观察器维护者负责操作系统、原生脚本与凭据边界；涉及公共Bridge授权的部分由Bridge维护者负责。现在关闭可执行的设计边界；真正的安全负例和正常流程通过留待获准试点，不在本轮运行。

## 四、从原材料得到的产品与科学判断

### Lucerna：存在真实提供方路径，但完整状态与通知语义仍不能从局部测试推出

`cloudflare_r2.rs` 确有真实请求、解析、凭据处理和状态生成，不是只有模拟卡片。问题在于部分缺失数据可绕过错误分支：`usage_state` 跳过缺失项后仍给健康，`state_from_contract_values` 没把所有缺失语义转为未知。再经过实际应用聚合，R2的健康会被当作正常贡献。因而“解析器对缺失返回None”的测试，不能关闭“用户看到假健康”这一问题。这个静态反例不等于我在用户当前安装包观察到了同样画面。[L-R2][L-LIB：aggregate_app_status]

**本轮新增的具体问题是通知结果与通知状态的提交时点。** `NotificationGate::evaluate_incident` 在真正调用系统通知前写入最高已通知级别和时间；`maybe_notify_product` 随后保存状态，再调用 `.show()`，发送错误仅写入日志，未据此回退已通知状态。可构造的反例是：首次通知满足去抖条件，但系统通知调用失败；持久状态已视为通知过，后续同级事件被持续抑制。另一个序列是：原事件仍存在，提供方暂时过期而不再生成事件；`clear_recovered_incidents` 把缺席当作恢复并删除事件，数据新鲜后可能重新提醒。[L-LIB：NotificationGate::evaluate_incident、clear_recovered_incidents、maybe_notify_product]

这是源码顺序支持的反例，**未在Windows实测，也不是当前R2提醒已存在的断言**。它说明新R2功能应扩展现有通知机制，而不能另写一套去重状态；应明确“发送尝试、发送成功、发送失败、不可观测、真实恢复”的语义。无必要追求无法观察的系统通知绝对送达，但必须给出失败后的有界策略。第四卷的“三次不变读取不重复”和“保存后重启”不足以覆盖上述序列。它是Lucerna演练的具体补充，不要求为此另建一个跨仓库消息数据库。

### Bobbio：已有强规则，薄适配层应复用而不是重写

现有开发者预审合同已经覆盖整屏、状态转移、真实原生路径与实际性能；原安全复盘也已识别真实资料目录、更新缓存和系统Zotero链接。不能再以“缺一份规则”为归因。公共部分应检查实际隔离环境及证据是否绑定当前候选；阅读器、论文切换、注释、AI来源与视觉连贯仍由Bobbio的正常入口验证。旧0.2版在获准范围的通过应保留，不把后来新增注释要求倒算成旧版虚假通过。[B-GATE][B-SAFE][B-AUDIT][B-OLDPASS]

### Mica：指标好看不等于核心目标达成

低内存报告中，JavaScript堆显著下降，但对应总进程占用从559.625 MiB到568.984 MiB，上升约 \(1.67\%\)。它只能分别支持堆指标与该次进程指标，不能直接称整个低内存目标成功，也不能由这一组数据推断所有真实低内存机器无收益。输入、滚动、草稿、可信动作与实际宿主版本仍是不可牺牲的约束。验收器的JSON伪造对照有用，但不等于坏扩展或坏宿主状态在普通入口已被识别。[M-MEM][M-VALID][M-CONTROL]

### SeminarArc：应允许撤销误判，也要保留证据范围

原报告包含真实移动端流程和修复，不能统称模拟假测试。此前OCR零命中的工具误判已被纠正，九张照片的处理与重启结果不能再被旧错误结论覆盖。另一方面，两段音频只出现于资产和元数据，不足以证明完整导入、转写或音频质量；模拟器也不能自动代表所有厂商设备。系统应阻止证据升格，并允许只修选择器/工具，不要求无故重建应用。[S-HARNESS][S-FLOWS][S-MEDIA]

### Asteria：可以机械验证几何，但不能把不存在的测量写成零

本轮独立运行了抄录的 `routeGestalt`：传入一个没有比率字段的边对象，边数为1，但最大绕行比率为0；浮动标签计数和可避免交叉数直接写死0。对真实大比率的检测仍可工作，因此结论是“部分测量无效”，不是“所有布局测试都是假的”。另一个临时Git仓库诊断确认，现有 `git diff --name-only -- ...` 只看未暂存变化；已暂存和已提交的保护文件变化不会被该命令发现。[A-VALID]

已读RC8用户反馈、RC13坐标复查及RC18整体审查说明：局部路线指标不能替代图的科学阅读结构，也不能通过截短核心名称、隐藏内容或只为某一图特判来换取绿色。应保留已有真实浏览器几何检查，但将其结论限制在实际测量的性质内。[A-USER][A-COORD][A-RC18]

### CUHK_Date：必须验证用户入口而不是较容易成功的替代路径

原注册修复记录直接区分了可见表单密码、测试所用的另一密码与接口绕过。前者失败时，后两者成功不能证明用户能注册。会话恢复记录又显示，一次性票据、浏览器会话和准备顺序是同一条消费链；反复重发验收不能代替确定票据是否已经消耗。公共适配器应保持候选、会话与后置事实一致，不应接管项目的账号模型，更不能降低数据库保护来获得通过。[C-REG][C-REC]

### CARE：保真、机制贡献与科学有效性是三个不同结论

B6纯函数的独立诊断与Planner报告方向一致：给“完美预测”和“全空预测”都得到0.435，独立Dice分别为1与0；仅把同一个病例移到下一位置，旧函数变成0.445。源代码明确把结果标作本地代理、非官方成绩，因此不指控它伪造官方分数。能够确定的是：它不能完成要求真实逐病例预测指标的义务，训练步数、耗时和44行表都弥补不了这一点。[CARE-B6]

ASE历史源码存在明确的标签重映射问题：先将标签5改为4，再把所有4改成0，最终瘢痕变为背景。后续的独立修订记录又暴露了另一层问题：屏蔽后的行仍可能参与归约分母，两组标量固定等权也不等于按有效人群归一化。不能因为“无T2类别没有梯度”就宣布科学损失正确。与此同时，固定14000步、取消某运行时审查组件等有效修订本身可以合法，不能拿最早版本合同无限阻止后来正确实现。[CARE-TRAIN][CARE-CONTRACT][CARE-008]

DG的符号、支持域和标签资格，PRISM的尺度消费和损失结构，都需要从有效原定义核查真实计算，而不是查名字、参数数量或某梯度是否非零。QIF在前置事实失败后停止，是可以成立的科研结果；不应为了让统一系统输出完成而强迫完整训练。对于本轮只读到谱系登记、没有逐一拿到原模型全部资产的MM、RACE及早期SRR条目，我保留对应风险与试点反例，不把它们升级为本轮重新验证的历史事实。[CARE-DG][CARE-PR][CARE-QIF][CARE52]

## 五、五条现实路线的比较

| 路线 | 现实依据与优点 | 局限与本轮取舍 |
|---|---|---|
| 不新增公共运行包，只修各仓库与现有Bridge调用 | 项目已有大量真实测试、原生工具及质量合同；见Lucerna、Bobbio和Bridge源码 | 最快恢复局部交付，应作为小任务和试点对照；但不能仅靠重复提示保证跨任务一直正确调用。不是零方案，必须保留比较。 |
| 极薄公共适配包，领域实现仍在各仓库 | 复用任务定位、实际能力调用、候选/观察绑定和有界归因；对应第一卷四组函数 | 当前首选研究方向。只有R1-P1-01/02关闭且正常试点净收益成立才继续，不预先建设中央平台。 |
| 把共性执行缺口最窄地修入Bridge | Bridge已有状态、预算、授权和恢复，不需要第二份控制者 | 只适合真正跨仓库的执行接口。科研目标、UI品味、图像坐标和各项目验收不得塞进Bridge。 |
| 采用Spec Kit工作流执行器 | 固定提交下有真实 `run`、`resume`、引擎分派与shell步骤，不是只提供模板 | shell步骤继承进程环境，以shell执行任务，退出成功不证明语义正确；改用它仍须解决证据权、权限和领域判断。不能因已有执行器就认定可替代Bridge，亦不能误称它没有运行时。 |
| 以GitHub Actions等成熟执行设施承载适用检查 | 可复用持续集成、受控任务环境和现有项目测试，不必自建全部执行底座 | 不是跨桌面/浏览器会话/集群/主观质量的万能生产系统。自托管执行器不会天然隔离个人凭据和共享主机；只在对应环境实际适用时选用。 |

Spec Kit本轮读取版本为 `f75d937ace8527e4cd7dcd7cb0c1feddb490cd3b`，阅读了命令入口、恢复入口、引擎相关部分、shell步骤及MIT许可。采用状态为 **REVIEWED_NOT_ADOPTED**；没有安装、移植或声称运行时整合。官方CLI、MCP及GitHub执行设施资料为 **REFERENCE_ONLY**。既有项目与Bridge机制则只是本次确认可复用的来源，尚未被新的研工台正式入口实际消费。[SPEC-RUN][SPEC-RESUME][SPEC-ENGINE][SPEC-SHELL][SPEC-LICENSE][OFF-GHA]

这个比较不支持建设新的长期调度数据库、监控器或多代理平台。成熟执行器能降低调度工程成本，但不能自动解决“测量错了、标准错了、任务被缩小了”的问题。

## 六、日常适配、净成本和首次试点的边界

**普通文案修复**应继续使用原仓库路径与少量相关回归。没有改变动作含义、科学承诺或共享状态时，不另开独立设计与完整模型审查；不启动Windows会话、重装产品或走全部科学检查。公共层最多帮助定位有效要求与受影响入口。

**Lucerna完整R2提醒功能**可以承担一次原需求解释、已有专业设计、第一条提供方真实链、候选期原生会话及有界独立质量检查。开发期不重复执行稳定候选的大套脚本；一次图形会话尽量完成相关状态序列，避免用户反复让出桌面。现有通知门控应被复用并加入上述发送失败、未知与恢复序列，不另造持久化状态机。[V4][L-LIB]

**CARE高成本科学任务**需要在第一条真实数据—计算—优化/恢复链后进行忠实性检查，才允许扩大训练。可用原有CPU反例先检查标签、归约和指标依赖；获准训练范围、模型有效性和外层评价仍各有独立边界。不能把为反证构造的小数组当真实患者训练，也不能要求每个合法负结果通过“效果必须提高”的门槛。[S-CARE-TRACE][CARE-TRAIN][CARE-QIF]

目前没有可信的六仓库适配代码量、安装变更数、每任务新增时延或总成本实测。不能填写一个看似精确的预测数字当架构证据。第一次获准试点应与原工作方式比较：真实新增/改动脚本与配置、原工具复用比例、人工准备和用户中断、正式审查调用数、定位根因时间、同一任务内完成率、已知P1是否在交给Work之前发现，以及正常小改是否被明显拖慢。没有节省或反而转嫁负担，应停止扩大，不靠增加更多样本挑出赢家。

首次试点的终点已相当清楚，无需继续增加一堆治理文件：Lucerna真实普通入口；覆盖几个不同性质的CARE坏例、正确实现和合法停止；再用Mica或Asteria验证不同平台复用；实际技能消费与规则加载；错误验收器可撤销；会话隔离拒绝；有界重试；小任务对照。**这些是后续能力验收，不是本轮已经通过的结果，也不是现在授予执行权限。**[V1][V4][S-DISPATCH]

## 七、未预设的重要问题与非阻塞意见

本轮没有把“候选未被修改”自动理解为“审查独立”。独立性还包括观察源和测量定义：生产者和审查者共用一个会把缺失值当零的函数，即使文件分别只读，也会一致地产生错误。这由Asteria纯函数和CARE归约问题直接说明。设计已有独立参考和校准条款，应优先把它们接到真实入口，不再造另一层签名回执。[A-VALID][CARE-008]

同样，审查结果错误与产品错误不能同罚。STAT5060相关原始基准汇总在10个问题页中只识别2个，还把40个正常页中的5个误拒。这只是该批次、该标准和该验证器的表现，不是所有模型的能力结论；它足以说明不能用总通过率或结构正确性认证审查者。设计中已有正/坏/缺证据校准与撤销范围，不再列为“缺一套审查规范”的阻塞。[STAT-B1][S-DISPATCH第9节]

Lucerna通知状态的提交时点是本轮新增的具体产品反例；归原项目机制，不升格成新的公共通知组件。PDF读取限制、报告目录中“未构建”与已有构建报告的陈旧文字、历史模型谱系未完全恢复，也均应诚实保留，不制造额外用户审批或虚假P1。

这两项P1关闭后，下一轮应先复核原阻塞，不因不确定感继续移动终点。只有修订引入新事实、回归或遗漏重大风险时，才新增阻塞。若实际试点失败，应先归因，不能把等待独立评审、平台审批或用户必要授权当成产品失败。

## 八、交付与后续权限

本报告及附表由当前对话产生，**未推送至GitHub、未修改Issue或Project、未更改任何仓库任务状态**。给Planner的完整返修提示词在同包 `planner_revision_prompt.md`；它是设计返修，不是Codex执行Goal。Planner读取后应将审查证据按该仓库的合法研究产物流程归档；若其线程不能写入，保留准确待归档项，不声称已经同步，也不要求用户手工整理阻塞。

本次结论只约束指定冻结版本的设计。不代表现有六产品总体失败，不代表Bridge现有全部机制无效，更不代表可以自动安装新模型、启动定时审查或增加费用。

## 参考文献与可复核来源

正文方括号编号对应下列完整来源。对源文件只阅读相关范围的，明确列出；“报告读取”不等于本轮重新运行。机器可读版本见 `source_index.json`。

[V1] YuukiAS/AI_Research_Toolkit，`docs/research/software-production/09_FULL_DOSSIER_V0_6/01_ARCHITECTURE_AND_COMPONENT_CONTRACT.md`，版本 `dcc8b073c84174ede5c277776fdc31c01a9b943e`。读取范围：全文。设计，不是运行结果。

https://github.com/YuukiAS/AI_Research_Toolkit/blob/dcc8b073c84174ede5c277776fdc31c01a9b943e/docs/research/software-production/09_FULL_DOSSIER_V0_6/01_ARCHITECTURE_AND_COMPONENT_CONTRACT.md

[V2] YuukiAS/AI_Research_Toolkit，`docs/research/software-production/09_FULL_DOSSIER_V0_6/02_INCIDENTS_AND_CAUSAL_COVERAGE.md`，版本 `dcc8b073c84174ede5c277776fdc31c01a9b943e`。读取范围：全文。历史归纳与设计因果主张。

https://github.com/YuukiAS/AI_Research_Toolkit/blob/dcc8b073c84174ede5c277776fdc31c01a9b943e/docs/research/software-production/09_FULL_DOSSIER_V0_6/02_INCIDENTS_AND_CAUSAL_COVERAGE.md

[V3] YuukiAS/AI_Research_Toolkit，`docs/research/software-production/09_FULL_DOSSIER_V0_6/03_ALL_USER_QUESTIONS_AND_DECISIONS.md`，版本 `dcc8b073c84174ede5c277776fdc31c01a9b943e`。读取范围：全文。21项问题及回答。

https://github.com/YuukiAS/AI_Research_Toolkit/blob/dcc8b073c84174ede5c277776fdc31c01a9b943e/docs/research/software-production/09_FULL_DOSSIER_V0_6/03_ALL_USER_QUESTIONS_AND_DECISIONS.md

[V4] YuukiAS/AI_Research_Toolkit，`docs/research/software-production/09_FULL_DOSSIER_V0_6/04_LUCERNA_FULL_WORKED_RUN.md`，版本 `dcc8b073c84174ede5c277776fdc31c01a9b943e`。读取范围：全文。假设未授权的新功能，不是一次真实成功运行。

https://github.com/YuukiAS/AI_Research_Toolkit/blob/dcc8b073c84174ede5c277776fdc31c01a9b943e/docs/research/software-production/09_FULL_DOSSIER_V0_6/04_LUCERNA_FULL_WORKED_RUN.md

[S-RUN] YuukiAS/AI_Research_Toolkit，`docs/research/software-production/08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/RUNNING_ARCHITECTURE.md`，版本 `dcc8b073c84174ede5c277776fdc31c01a9b943e`。读取范围：全文。拟议机制尚未运行；原始材料的复核范围另列。

https://github.com/YuukiAS/AI_Research_Toolkit/blob/dcc8b073c84174ede5c277776fdc31c01a9b943e/docs/research/software-production/08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/RUNNING_ARCHITECTURE.md

[S-ISO] YuukiAS/AI_Research_Toolkit，`docs/research/software-production/08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/GATE_TIMELINE_AND_ISOLATION.md`，版本 `dcc8b073c84174ede5c277776fdc31c01a9b943e`。读取范围：全文。拟议机制尚未运行；原始材料的复核范围另列。

https://github.com/YuukiAS/AI_Research_Toolkit/blob/dcc8b073c84174ede5c277776fdc31c01a9b943e/docs/research/software-production/08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/GATE_TIMELINE_AND_ISOLATION.md

[S-AGENTS] YuukiAS/AI_Research_Toolkit，`docs/research/software-production/08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/AGENTS_LIFECYCLE.md`，版本 `dcc8b073c84174ede5c277776fdc31c01a9b943e`。读取范围：全文。拟议机制尚未运行；原始材料的复核范围另列。

https://github.com/YuukiAS/AI_Research_Toolkit/blob/dcc8b073c84174ede5c277776fdc31c01a9b943e/docs/research/software-production/08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/AGENTS_LIFECYCLE.md

[S-CARE-TRACE] YuukiAS/AI_Research_Toolkit，`docs/research/software-production/08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/CARE_MODEL_RUN_TRACES.md`，版本 `dcc8b073c84174ede5c277776fdc31c01a9b943e`。读取范围：模型演练相关章节；不以此声称已核实全部历史训练。拟议机制尚未运行；原始材料的复核范围另列。

https://github.com/YuukiAS/AI_Research_Toolkit/blob/dcc8b073c84174ede5c277776fdc31c01a9b943e/docs/research/software-production/08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/CARE_MODEL_RUN_TRACES.md

[CARE52] YuukiAS/AI_Research_Toolkit，`docs/research/software-production/08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/CARE_LINEAGE_AND_CAUSAL_AUDIT.md`，版本 `dcc8b073c84174ede5c277776fdc31c01a9b943e`。读取范围：全文。拟议机制尚未运行；原始材料的复核范围另列。

https://github.com/YuukiAS/AI_Research_Toolkit/blob/dcc8b073c84174ede5c277776fdc31c01a9b943e/docs/research/software-production/08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/CARE_LINEAGE_AND_CAUSAL_AUDIT.md

[S-DISPATCH] YuukiAS/AI_Research_Toolkit，`docs/research/software-production/07_CARE_AND_EXECUTABLE_REVIEW_V0_4/INDEPENDENT_REVIEW_AND_DISPATCH.md`，版本 `dcc8b073c84174ede5c277776fdc31c01a9b943e`。读取范围：全文。包括实际调用形态、权限、校准与撤销资格设计。

https://github.com/YuukiAS/AI_Research_Toolkit/blob/dcc8b073c84174ede5c277776fdc31c01a9b943e/docs/research/software-production/07_CARE_AND_EXECUTABLE_REVIEW_V0_4/INDEPENDENT_REVIEW_AND_DISPATCH.md

[CARE40] YuukiAS/AI_Research_Toolkit，`docs/research/software-production/07_CARE_AND_EXECUTABLE_REVIEW_V0_4/CARE_FAILURE_LEDGER.md`，版本 `dcc8b073c84174ede5c277776fdc31c01a9b943e`。读取范围：全文。登记不是40次独立事故或全部原始运行重放。

https://github.com/YuukiAS/AI_Research_Toolkit/blob/dcc8b073c84174ede5c277776fdc31c01a9b943e/docs/research/software-production/07_CARE_AND_EXECUTABLE_REVIEW_V0_4/CARE_FAILURE_LEDGER.md

[LATE] YuukiAS/AI_Research_Toolkit，`docs/research/software-production/05_PROPOSED_ARCHITECTURE_V0_2/INCIDENT_ADDENDUM.md`，版本 `dcc8b073c84174ede5c277776fdc31c01a9b943e`。读取范围：全文。20项Lucerna与5项Asteria补充登记。

https://github.com/YuukiAS/AI_Research_Toolkit/blob/dcc8b073c84174ede5c277776fdc31c01a9b943e/docs/research/software-production/05_PROPOSED_ARCHITECTURE_V0_2/INCIDENT_ADDENDUM.md

[MAP] YuukiAS/AI_Research_Toolkit，`docs/research/software-production/04_SIX_REPO_AUDIT/problem-control-map.csv`，版本 `dcc8b073c84174ede5c277776fdc31c01a9b943e`。读取范围：全部246行登记。旧K控制编号不等于第一卷组件编号。

https://github.com/YuukiAS/AI_Research_Toolkit/blob/dcc8b073c84174ede5c277776fdc31c01a9b943e/docs/research/software-production/04_SIX_REPO_AUDIT/problem-control-map.csv

[REG-L] YuukiAS/AI_Research_Toolkit，`docs/research/software-production/04_SIX_REPO_AUDIT/LUCERNA.md`，版本 `dcc8b073c84174ede5c277776fdc31c01a9b943e`。读取范围：全文。逐项判断登记；不能替代该项原始现场证据。

https://github.com/YuukiAS/AI_Research_Toolkit/blob/dcc8b073c84174ede5c277776fdc31c01a9b943e/docs/research/software-production/04_SIX_REPO_AUDIT/LUCERNA.md

[REG-B] YuukiAS/AI_Research_Toolkit，`docs/research/software-production/04_SIX_REPO_AUDIT/BOBBIO.md`，版本 `dcc8b073c84174ede5c277776fdc31c01a9b943e`。读取范围：全文。逐项判断登记；不能替代该项原始现场证据。

https://github.com/YuukiAS/AI_Research_Toolkit/blob/dcc8b073c84174ede5c277776fdc31c01a9b943e/docs/research/software-production/04_SIX_REPO_AUDIT/BOBBIO.md

[REG-M] YuukiAS/AI_Research_Toolkit，`docs/research/software-production/04_SIX_REPO_AUDIT/MICA.md`，版本 `dcc8b073c84174ede5c277776fdc31c01a9b943e`。读取范围：全文。逐项判断登记；不能替代该项原始现场证据。

https://github.com/YuukiAS/AI_Research_Toolkit/blob/dcc8b073c84174ede5c277776fdc31c01a9b943e/docs/research/software-production/04_SIX_REPO_AUDIT/MICA.md

[REG-S] YuukiAS/AI_Research_Toolkit，`docs/research/software-production/04_SIX_REPO_AUDIT/SEMINARARC.md`，版本 `dcc8b073c84174ede5c277776fdc31c01a9b943e`。读取范围：全文。逐项判断登记；不能替代该项原始现场证据。

https://github.com/YuukiAS/AI_Research_Toolkit/blob/dcc8b073c84174ede5c277776fdc31c01a9b943e/docs/research/software-production/04_SIX_REPO_AUDIT/SEMINARARC.md

[REG-A] YuukiAS/AI_Research_Toolkit，`docs/research/software-production/04_SIX_REPO_AUDIT/ASTERIA.md`，版本 `dcc8b073c84174ede5c277776fdc31c01a9b943e`。读取范围：全文。逐项判断登记；不能替代该项原始现场证据。

https://github.com/YuukiAS/AI_Research_Toolkit/blob/dcc8b073c84174ede5c277776fdc31c01a9b943e/docs/research/software-production/04_SIX_REPO_AUDIT/ASTERIA.md

[REG-C] YuukiAS/AI_Research_Toolkit，`docs/research/software-production/04_SIX_REPO_AUDIT/CUHK_DATE.md`，版本 `dcc8b073c84174ede5c277776fdc31c01a9b943e`。读取范围：全文。逐项判断登记；不能替代该项原始现场证据。

https://github.com/YuukiAS/AI_Research_Toolkit/blob/dcc8b073c84174ede5c277776fdc31c01a9b943e/docs/research/software-production/04_SIX_REPO_AUDIT/CUHK_DATE.md

[PDF-BUILD] YuukiAS/AI_Research_Toolkit，`docs/research/software-production/09_FULL_DOSSIER_V0_6/BUILD_REPORT.md`，版本 `dcc8b073c84174ede5c277776fdc31c01a9b943e`。读取范围：全文。构建方自述的76页及渲染检查；本轮未独立查看PDF页面。

https://github.com/YuukiAS/AI_Research_Toolkit/blob/dcc8b073c84174ede5c277776fdc31c01a9b943e/docs/research/software-production/09_FULL_DOSSIER_V0_6/BUILD_REPORT.md

[ROOT-README] YuukiAS/AI_Research_Toolkit，`README.md`，版本 `dcc8b073c84174ede5c277776fdc31c01a9b943e`。读取范围：1–110行。现有工具资源仓库边界，不等于拟议生产系统已实现。

https://github.com/YuukiAS/AI_Research_Toolkit/blob/dcc8b073c84174ede5c277776fdc31c01a9b943e/README.md

[BR-AGENTS] YuukiAS/GPT_Codex_AI_Bridge_Kit，`AGENTS.md`，版本 `a7931fdfc6e3d71cf985351df075de17097795e6`。读取范围：全文。本轮实际读取时的固定提交。

https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/a7931fdfc6e3d71cf985351df075de17097795e6/AGENTS.md

[BR-REVIEW] YuukiAS/GPT_Codex_AI_Bridge_Kit，`ai_bridge_kit/reviewed_handoff.py`，版本 `a7931fdfc6e3d71cf985351df075de17097795e6`。读取范围：角色、校验与状态转移相关函数；重点2620–3010行。静态阅读；未运行用户Bridge。

https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/a7931fdfc6e3d71cf985351df075de17097795e6/ai_bridge_kit/reviewed_handoff.py

[BR-SPEC] YuukiAS/GPT_Codex_AI_Bridge_Kit，`docs/V0_5_REVIEWED_HANDOFF_IMPLEMENTATION_SPEC.md`，版本 `a7931fdfc6e3d71cf985351df075de17097795e6`。读取范围：1–220行。三角色、状态与预算的现有合同。

https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/a7931fdfc6e3d71cf985351df075de17097795e6/docs/V0_5_REVIEWED_HANDOFF_IMPLEMENTATION_SPEC.md

[BR-CARE] YuukiAS/GPT_Codex_AI_Bridge_Kit，`docs/CARE_AGENT_FLOW_V3_POSTMORTEM_20260811.md`，版本 `2d02deed9d7d570fea5c62b08126a405cc54196c`。读取范围：1–165行。历史复盘；不是本轮重跑所有事故。

https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/2d02deed9d7d570fea5c62b08126a405cc54196c/docs/CARE_AGENT_FLOW_V3_POSTMORTEM_20260811.md

[L-R2] YuukiAS/Lucerna，`src-tauri/src/cloudflare_r2.rs`，版本 `79dd2875d3da33c6a6d80e5e35bea812b84c1ceb`。读取范围：正式函数与相关测试1–920行。缺失值解析、状态生成、凭据交易；未发真实HTTP请求。

https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/src-tauri/src/cloudflare_r2.rs

[L-LIB] YuukiAS/Lucerna，`src-tauri/src/lib.rs`，版本 `79dd2875d3da33c6a6d80e5e35bea812b84c1ceb`。读取范围：1–150、250–500、1270–1930、2200–2810、3200–3450、3700–3950、4300–4580、5500–5760、6500–6810、7900–8180行。重点通知去重/发送、聚合、托盘、原生探针；不是整文件逐行完整审计。

https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/src-tauri/src/lib.rs

[L-ACCEPT] YuukiAS/Lucerna，`scripts/development-acceptance.ps1`，版本 `79dd2875d3da33c6a6d80e5e35bea812b84c1ceb`。读取范围：全文。读取，不运行原生窗口。

https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/scripts/development-acceptance.ps1

[L-CAPTURE] YuukiAS/Lucerna，`scripts/capture-lucerna-window.ps1`，版本 `79dd2875d3da33c6a6d80e5e35bea812b84c1ceb`。读取范围：1–175行。窗口API、候选路径和PID筛选；未在Windows执行。

https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/scripts/capture-lucerna-window.ps1

[L-HISTORY] YuukiAS/Lucerna，`docs/workflows/LUCERNA_EXECUTION_FAILURE_HISTORY.md`，版本 `79dd2875d3da33c6a6d80e5e35bea812b84c1ceb`。读取范围：1–150行。原项目历史记录。

https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/docs/workflows/LUCERNA_EXECUTION_FAILURE_HISTORY.md

[L-R0] YuukiAS/Lucerna，`results/01056_product_capability_closure/GPT_WORK_REVIEW_2026-10-06.md`，版本 `79dd2875d3da33c6a6d80e5e35bea812b84c1ceb`。读取范围：1–175行。历史审查文本，不是本轮亲眼查看全部旧图。

https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/results/01056_product_capability_closure/GPT_WORK_REVIEW_2026-10-06.md

[L-R1] YuukiAS/Lucerna，`results/01056r1_full_product_repair/GPT_WORK_REVIEW_2026-10-06_FAIL.md`，版本 `79dd2875d3da33c6a6d80e5e35bea812b84c1ceb`。读取范围：1–160行。同上。

https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/results/01056r1_full_product_repair/GPT_WORK_REVIEW_2026-10-06_FAIL.md

[L-R2REPORT] YuukiAS/Lucerna，`results/01056r2_full_product_repair/GPT_WORK_REVIEW_2026-10-06_FAIL.md`，版本 `79dd2875d3da33c6a6d80e5e35bea812b84c1ceb`。读取范围：1–210行。同上。

https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/results/01056r2_full_product_repair/GPT_WORK_REVIEW_2026-10-06_FAIL.md

[L-R3] YuukiAS/Lucerna，`results/01056r3_full_product_repair/GPT_WORK_REVIEW_2026-10-08_FAIL.md`，版本 `79dd2875d3da33c6a6d80e5e35bea812b84c1ceb`。读取范围：1–190行。同上。

https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/results/01056r3_full_product_repair/GPT_WORK_REVIEW_2026-10-08_FAIL.md

[B-SAFE] YuukiAS/Bobbio，`docs/handoffs/ZOTERO_ACCEPTANCE_SAFETY_2026-09-12.md`，版本 `a64edfd6c5b11f81599bfcfc327be5964633a7b5`。读取范围：全文。没有操作用户Zotero、个人目录或系统URL处理器。

https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/docs/handoffs/ZOTERO_ACCEPTANCE_SAFETY_2026-09-12.md

[B-WRAP] YuukiAS/Bobbio，`scripts/Invoke-BobbioAcceptanceSafe.ps1`，版本 `a64edfd6c5b11f81599bfcfc327be5964633a7b5`。读取范围：全文。没有操作用户Zotero、个人目录或系统URL处理器。

https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/scripts/Invoke-BobbioAcceptanceSafe.ps1

[B-AUDIT] YuukiAS/Bobbio，`docs/audits/0.3.0/overnight-2026-10-04/GPT_WORK_REVIEW_SYSTEM_AUDIT.md`，版本 `a64edfd6c5b11f81599bfcfc327be5964633a7b5`。读取范围：1–140行。没有操作用户Zotero、个人目录或系统URL处理器。

https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/docs/audits/0.3.0/overnight-2026-10-04/GPT_WORK_REVIEW_SYSTEM_AUDIT.md

[B-GATE] YuukiAS/Bobbio，`docs/quality/DEVELOPER_PRE_REVIEW_GATE.md`，版本 `a64edfd6c5b11f81599bfcfc327be5964633a7b5`。读取范围：全文。没有操作用户Zotero、个人目录或系统URL处理器。

https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/docs/quality/DEVELOPER_PRE_REVIEW_GATE.md

[B-OLDPASS] YuukiAS/Bobbio，`docs/handoffs/GPT_WORK_REVIEW_0.2.0_PASS_2026-09-13.md`，版本 `a64edfd6c5b11f81599bfcfc327be5964633a7b5`。读取范围：全文。没有操作用户Zotero、个人目录或系统URL处理器。

https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/docs/handoffs/GPT_WORK_REVIEW_0.2.0_PASS_2026-09-13.md

[M-R4] YuukiAS/Mica-for-ChatGPT，`results/mica-product-system-rebuild/foundation-review-r4-repair.md`，版本 `0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c`。读取范围：全文。报告与校验器版本分开；未运行扩展或登录用户账号。

https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/results/mica-product-system-rebuild/foundation-review-r4-repair.md

[M-MEM] YuukiAS/Mica-for-ChatGPT，`results/mica-product-system-rebuild/low-memory-candidate-report.md`，版本 `0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c`。读取范围：全文。报告与校验器版本分开；未运行扩展或登录用户账号。

https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/results/mica-product-system-rebuild/low-memory-candidate-report.md

[M-VALID] YuukiAS/Mica-for-ChatGPT，`scripts/acceptance/validator.mjs`，版本 `0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c`。读取范围：1–400行。报告与校验器版本分开；未运行扩展或登录用户账号。

https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/scripts/acceptance/validator.mjs

[M-CONTROL] YuukiAS/Mica-for-ChatGPT，`scripts/acceptance/control-corpus.mjs`，版本 `0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c`。读取范围：1–155行。报告与校验器版本分开；未运行扩展或登录用户账号。

https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/scripts/acceptance/control-corpus.mjs

[S-HARNESS] YuukiAS/SeminarArc，`prompts/tasks/0.5.x_blackbox_acceptance_harness_result.md`，版本 `5652fe17ce60625f3ff7c758fcc0183f920189de`。读取范围：全文。本轮读原始报告，未独立查看私人照片或重放APK/OCR/音频。

https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/prompts/tasks/0.5.x_blackbox_acceptance_harness_result.md

[S-FLOWS] YuukiAS/SeminarArc，`prompts/tasks/0.5.x_blackbox_research_flows_result.md`，版本 `5652fe17ce60625f3ff7c758fcc0183f920189de`。读取范围：全文。本轮读原始报告，未独立查看私人照片或重放APK/OCR/音频。

https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/prompts/tasks/0.5.x_blackbox_research_flows_result.md

[S-MEDIA] YuukiAS/SeminarArc，`prompts/tasks/0.5.x_real_world_media_corpus_round_02_result.md`，版本 `5652fe17ce60625f3ff7c758fcc0183f920189de`。读取范围：全文。本轮读原始报告，未独立查看私人照片或重放APK/OCR/音频。

https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/prompts/tasks/0.5.x_real_world_media_corpus_round_02_result.md

[A-VALID] YuukiAS/Asteria，`scripts/validate-architecture-rc19.mjs`，版本 `193c033659a7612a99442763077217b130e9b756`。读取范围：全文。校验纯函数与独立临时Git范围另有本轮探针；未运行整站。

https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/scripts/validate-architecture-rc19.mjs

[A-USER] YuukiAS/Asteria，`docs/operations/acceptance/RC8_HUMAN_ACCEPTANCE_FAILURE_2026-09-13.md`，版本 `193c033659a7612a99442763077217b130e9b756`。读取范围：全文。校验纯函数与独立临时Git范围另有本轮探针；未运行整站。

https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/docs/operations/acceptance/RC8_HUMAN_ACCEPTANCE_FAILURE_2026-09-13.md

[A-RC18] YuukiAS/Asteria，`prompts/tasks/asteria_v2_rc18_parent_acceptance_review.md`，版本 `193c033659a7612a99442763077217b130e9b756`。读取范围：全文。校验纯函数与独立临时Git范围另有本轮探针；未运行整站。

https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/prompts/tasks/asteria_v2_rc18_parent_acceptance_review.md

[A-COORD] YuukiAS/Asteria，`docs/operations/blackbox-audit/reports/RC13_W01_VISUAL_REAUDIT_REPORT_2026-09-13.md`，版本 `193c033659a7612a99442763077217b130e9b756`。读取范围：全文。校验纯函数与独立临时Git范围另有本轮探针；未运行整站。

https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/docs/operations/blackbox-audit/reports/RC13_W01_VISUAL_REAUDIT_REPORT_2026-09-13.md

[C-REG] YuukiAS/CUHK_Date，`docs/operations/prompts/CODEX_REPAIR_REAL_REGISTRATION_CRITICAL_PATH_AND_FALSE_GREEN_HARNESS_2026-09-24.md`，版本 `9f25c7754d3c80d0be74f5b71016320f55753ae6`。读取范围：1–180行。未访问或修改托管数据库、真实账号与一次性票据。

https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/prompts/CODEX_REPAIR_REAL_REGISTRATION_CRITICAL_PATH_AND_FALSE_GREEN_HARNESS_2026-09-24.md

[C-REC] YuukiAS/CUHK_Date，`docs/operations/prompts/CODEX_REPAIR_QUESTIONNAIRE_GPT_WORK_HARNESS_RECOVERY_2026-09-20.md`，版本 `9f25c7754d3c80d0be74f5b71016320f55753ae6`。读取范围：1–190行。未访问或修改托管数据库、真实账号与一次性票据。

https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/prompts/CODEX_REPAIR_QUESTIONNAIRE_GPT_WORK_HARNESS_RECOVERY_2026-09-20.md

[C-WAVE] YuukiAS/CUHK_Date，`docs/operations/blackbox-audit/reports/WAVE_B_CONSOLIDATED_REPORT_2026-09-11.md`，版本 `9f25c7754d3c80d0be74f5b71016320f55753ae6`。读取范围：1–190行。未访问或修改托管数据库、真实账号与一次性票据。

https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/blackbox-audit/reports/WAVE_B_CONSOLIDATED_REPORT_2026-09-11.md

[C-RELEASE] YuukiAS/CUHK_Date，`scripts/verify-release-truth.ts`，版本 `9f25c7754d3c80d0be74f5b71016320f55753ae6`。读取范围：1–155行。未访问或修改托管数据库、真实账号与一次性票据。

https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/scripts/verify-release-truth.ts

[CARE-TRAIN] YuukiAS/CARE_Challenge，`src/care_myocardium/training/care_ase_trainer.py`，版本 `9517fe1738be5a03bc5d9115dade618ca3bc31b8`。读取范围：全文。除B6纯函数外均是静态源码或原始记录；没有训练、医学数据读取或集群执行。

https://github.com/YuukiAS/CARE_Challenge/blob/9517fe1738be5a03bc5d9115dade618ca3bc31b8/src/care_myocardium/training/care_ase_trainer.py

[CARE-MODEL] YuukiAS/CARE_Challenge，`src/care_myocardium/models/care_ase.py`，版本 `9517fe1738be5a03bc5d9115dade618ca3bc31b8`。读取范围：1–100行。除B6纯函数外均是静态源码或原始记录；没有训练、医学数据读取或集群执行。

https://github.com/YuukiAS/CARE_Challenge/blob/9517fe1738be5a03bc5d9115dade618ca3bc31b8/src/care_myocardium/models/care_ase.py

[CARE-CONTRACT] YuukiAS/CARE_Challenge，`prompts/blueprints/CARE_ASE_exact_implementation_contract_v2_amendment03_final_audit_20260801.yaml`，版本 `9517fe1738be5a03bc5d9115dade618ca3bc31b8`。读取范围：1–180行。除B6纯函数外均是静态源码或原始记录；没有训练、医学数据读取或集群执行。

https://github.com/YuukiAS/CARE_Challenge/blob/9517fe1738be5a03bc5d9115dade618ca3bc31b8/prompts/blueprints/CARE_ASE_exact_implementation_contract_v2_amendment03_final_audit_20260801.yaml

[CARE-RELOAD] YuukiAS/CARE_Challenge，`scripts/validation/validate_care_ase_freeze_reload.py`，版本 `9517fe1738be5a03bc5d9115dade618ca3bc31b8`。读取范围：全文。除B6纯函数外均是静态源码或原始记录；没有训练、医学数据读取或集群执行。

https://github.com/YuukiAS/CARE_Challenge/blob/9517fe1738be5a03bc5d9115dade618ca3bc31b8/scripts/validation/validate_care_ase_freeze_reload.py

[CARE-B6] YuukiAS/CARE_Challenge，`scripts/training/route_B_round04/myops/B6/run_B6_joint.py`，版本 `75a40e454de43b64e59a0b0b438ff57ef2bb8345`。读取范围：全文。除B6纯函数外均是静态源码或原始记录；没有训练、医学数据读取或集群执行。

https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/scripts/training/route_B_round04/myops/B6/run_B6_joint.py

[CARE-LINEAGE] YuukiAS/CARE_Challenge，`results/20260730_care_failure_forensics_deep_research_packet/model_lineage.csv`，版本 `75a40e454de43b64e59a0b0b438ff57ef2bb8345`。读取范围：全文。除B6纯函数外均是静态源码或原始记录；没有训练、医学数据读取或集群执行。

https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/20260730_care_failure_forensics_deep_research_packet/model_lineage.csv

[CARE-RECOVERY] YuukiAS/CARE_Challenge，`results/20260730_care_failure_forensics_deep_research_packet/v4_batch_history_recovery.csv`，版本 `75a40e454de43b64e59a0b0b438ff57ef2bb8345`。读取范围：全文。除B6纯函数外均是静态源码或原始记录；没有训练、医学数据读取或集群执行。

https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/20260730_care_failure_forensics_deep_research_packet/v4_batch_history_recovery.csv

[CARE-DG] YuukiAS/CARE_Challenge，`prompts/tasks/20260727_care_dg_w2_fold0_critic_repair_amendment.md`，版本 `75a40e454de43b64e59a0b0b438ff57ef2bb8345`。读取范围：1–145行。除B6纯函数外均是静态源码或原始记录；没有训练、医学数据读取或集群执行。

https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/tasks/20260727_care_dg_w2_fold0_critic_repair_amendment.md

[CARE-PR] YuukiAS/CARE_Challenge，`prompts/tasks/20260729_care_prism_v2_backbone_and_w1_repair_amendment.md`，版本 `75a40e454de43b64e59a0b0b438ff57ef2bb8345`。读取范围：全文。除B6纯函数外均是静态源码或原始记录；没有训练、医学数据读取或集群执行。

https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/tasks/20260729_care_prism_v2_backbone_and_w1_repair_amendment.md

[CARE-QIF] YuukiAS/CARE_Challenge，`results/20260731_care_qif_v2_signal_audit/controller_report.md`，版本 `75a40e454de43b64e59a0b0b438ff57ef2bb8345`。读取范围：全文。除B6纯函数外均是静态源码或原始记录；没有训练、医学数据读取或集群执行。

https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/20260731_care_qif_v2_signal_audit/controller_report.md

[CARE-008] YuukiAS/CARE_Challenge，`results/agent_flow_v3/care-ase-faithful/planner_reviews/round_001_reentry_008.json`，版本 `184cc16bc00dbb4edce80e2c848bdaabae4f782e`。读取范围：全文。除B6纯函数外均是静态源码或原始记录；没有训练、医学数据读取或集群执行。

https://github.com/YuukiAS/CARE_Challenge/blob/184cc16bc00dbb4edce80e2c848bdaabae4f782e/results/agent_flow_v3/care-ase-faithful/planner_reviews/round_001_reentry_008.json

[SPEC-RUN] github/spec-kit，`src/specify_cli/workflows/command_run.py`，版本 `f75d937ace8527e4cd7dcd7cb0c1feddb490cd3b`。读取范围：全文。仅研究；未安装、复制整合或验证其整机恢复能力。

https://github.com/github/spec-kit/blob/f75d937ace8527e4cd7dcd7cb0c1feddb490cd3b/src/specify_cli/workflows/command_run.py

[SPEC-RESUME] github/spec-kit，`src/specify_cli/workflows/command_resume.py`，版本 `f75d937ace8527e4cd7dcd7cb0c1feddb490cd3b`。读取范围：全文。仅研究；未安装、复制整合或验证其整机恢复能力。

https://github.com/github/spec-kit/blob/f75d937ace8527e4cd7dcd7cb0c1feddb490cd3b/src/specify_cli/workflows/command_resume.py

[SPEC-ENGINE] github/spec-kit，`src/specify_cli/workflows/engine.py`，版本 `f75d937ace8527e4cd7dcd7cb0c1feddb490cd3b`。读取范围：1–210行。仅研究；未安装、复制整合或验证其整机恢复能力。

https://github.com/github/spec-kit/blob/f75d937ace8527e4cd7dcd7cb0c1feddb490cd3b/src/specify_cli/workflows/engine.py

[SPEC-SHELL] github/spec-kit，`src/specify_cli/workflows/step/shell/__init__.py`，版本 `f75d937ace8527e4cd7dcd7cb0c1feddb490cd3b`。读取范围：全文。仅研究；未安装、复制整合或验证其整机恢复能力。

https://github.com/github/spec-kit/blob/f75d937ace8527e4cd7dcd7cb0c1feddb490cd3b/src/specify_cli/workflows/step/shell/__init__.py

[SPEC-LICENSE] github/spec-kit，`LICENSE`，版本 `f75d937ace8527e4cd7dcd7cb0c1feddb490cd3b`。读取范围：全文。仅研究；未安装、复制整合或验证其整机恢复能力。

https://github.com/github/spec-kit/blob/f75d937ace8527e4cd7dcd7cb0c1feddb490cd3b/LICENSE

[STAT-B1] YuukiAS/STAT5060-TA，`results/tutorial-01-validator-v1/rendered-reviewer-benchmark-v1/B1/EVALUATION_SUMMARY_B1.md`，版本 `tutorial`。读取范围：全文。50页基准的原始汇总，未重新审其全部图像与人工标准。

https://github.com/YuukiAS/STAT5060-TA/blob/tutorial/results/tutorial-01-validator-v1/rendered-reviewer-benchmark-v1/B1/EVALUATION_SUMMARY_B1.md

[OFF-CLI] 官方文档，`Codex命令行参数`，版本 `2026-10-13读取`。读取范围：所述相关章节。打开后重定向官方ChatGPT Learn；只读shell策略、配置叠加等。

https://developers.openai.com/codex/cli/reference

[OFF-MCP] 官方文档，`Codex MCP配置`，版本 `2026-10-13读取`。读取范围：所述相关章节。用户与插件提供的MCP能力需分别控制。

https://developers.openai.com/codex/mcp

[OFF-GHA] 官方文档，`GitHub Actions安全使用`，版本 `2026-10-13读取`。读取范围：所述相关章节。自托管执行器不会天然获得一次性干净虚拟机隔离。

https://docs.github.com/en/actions/reference/security/secure-use

[OFF-R2] 官方文档，`Cloudflare R2定价`，版本 `2026-10-13读取`。读取范围：所述相关章节。计费类别与免费额度不能混同瞬时使用率阈值。

https://developers.cloudflare.com/r2/pricing/

[REVIEW-CONTRACT] YuukiAS/AI_Research_Toolkit，`docs/research/software-production/09_FULL_DOSSIER_V0_6/06_INDEPENDENT_CRITIC_R1_FULL_REVIEW_PROMPT.md`，版本 `research/software-production-decision-20261013`。读取范围：16节全文。该文件不在被冻结设计提交中；本轮按分支上后补的审查合同执行，设计对象不随之移动。所读blob：383886b207e33b01233f644018de2fffb0a24d99。

https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/09_FULL_DOSSIER_V0_6/06_INDEPENDENT_CRITIC_R1_FULL_REVIEW_PROMPT.md

[G-PLANNER] YuukiAS/AI_Skills_Collection，`docs/workflows/PLANNER_ROLE_CONTRACT.md`，版本 `main`。读取范围：全文。本轮实际读取最新main；本报告不代替未来执行线程重新核对规则。

https://github.com/YuukiAS/AI_Skills_Collection/blob/main/docs/workflows/PLANNER_ROLE_CONTRACT.md

[G-CRITIC] YuukiAS/AI_Skills_Collection，`docs/workflows/CRITIC_ROLE_CONTRACT.md`，版本 `main`。读取范围：全文。本轮实际读取最新main；本报告不代替未来执行线程重新核对规则。

https://github.com/YuukiAS/AI_Skills_Collection/blob/main/docs/workflows/CRITIC_ROLE_CONTRACT.md

[G-GATE] YuukiAS/AI_Skills_Collection，`docs/workflows/PLUGIN_CAPABILITY_GATE_POLICY.md`，版本 `main`。读取范围：全文。本轮实际读取最新main；本报告不代替未来执行线程重新核对规则。

https://github.com/YuukiAS/AI_Skills_Collection/blob/main/docs/workflows/PLUGIN_CAPABILITY_GATE_POLICY.md

[G-BOARD] YuukiAS/AI_Skills_Collection，`docs/workflows/AI_SKILLS_MAINTENANCE_BOARD.md`，版本 `main`。读取范围：全文。本轮实际读取最新main；本报告不代替未来执行线程重新核对规则。

https://github.com/YuukiAS/AI_Skills_Collection/blob/main/docs/workflows/AI_SKILLS_MAINTENANCE_BOARD.md

[G-VISUAL] YuukiAS/AI_Skills_Collection，`plugins/codex/plugins/web-development/skills/visual/SKILL.md`，版本 `main`。读取范围：全文。核对frontend-visual-systems真实名称；未确认任何用户主机安装状态。

https://github.com/YuukiAS/AI_Skills_Collection/blob/main/plugins/codex/plugins/web-development/skills/visual/SKILL.md

[G-VISUAL-SOURCE] YuukiAS/AI_Skills_Collection，`plugins/codex/plugins/web-development/skills/visual/_src/system/source.md`，版本 `main`。读取范围：1–170行。实际委派源；不把读取当成产品消费已发生。

https://github.com/YuukiAS/AI_Skills_Collection/blob/main/plugins/codex/plugins/web-development/skills/visual/_src/system/source.md
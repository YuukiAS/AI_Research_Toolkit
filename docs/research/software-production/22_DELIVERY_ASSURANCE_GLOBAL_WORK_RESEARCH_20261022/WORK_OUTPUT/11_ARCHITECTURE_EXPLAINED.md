# 从一句需求，到真正值得信任的交付

![过去由用户发现错误、催促修复；新系统检查真实结果，将问题返回原任务，复验后凭证据交付。](11_DELIVERY_ASSURANCE_ARCHITECTURE.png)

这套设计要解决的，是你提出需求以后，还得亲自找出错误、提醒补验收、催促继续修复的问题。它希望把这些工作接回正在执行需求的任务：先核对目标，检查真实成品，发现问题就返回原任务，修好后再验；证据足够，才把结果交给你。

**图中展示的是已通过设计审查的工作方式。实际系统尚未实现和验证。** [高清图片](11_DELIVERY_ASSURANCE_ARCHITECTURE.png)与[可编辑矢量图源](11_DELIVERY_ASSURANCE_ARCHITECTURE.svg)均保存在本目录。

## 过去为什么总要你来发现问题

Codex 写完代码、跑过一些测试，可能就认为任务完成了。但这中间有几处容易脱节：它一开始可能漏解要求；测试可能只覆盖它自己理解的正确答案；测试用的代码或画面，可能并不是最后交到你手里的版本。即使已有验收发现了问题，结果也未必送回还在处理这件事的任务。

如果任务可以在这些问题没有解决时直接结束，“完成了”就只是一次自我判断。真正打开软件、发现异常的人，变成了你。

新设计针对这些脱节设置检查。它要求核对原始需求，保留应当继续正常工作的旧行为，验证正在交付的实际版本，并让失败回到原任务。最后的交付检查必须由正常结束入口执行，不能依赖 Codex 临时想起“还应该验一下”。

## 用 Lucerna 的真实问题走一遍

Lucerna 的历史修复记录中，确实出现过这样的错误：三条访问路线已有两条可用，另一条仍在检查，有些辅助状态只是尚未获得观察结果，界面却可能把整体说成故障。前后两处展示还可能互相矛盾，一处表示不可用，另一处却仍写着检查中。

这里有两个不同的事实：**尚未查明是否有问题，不等于已经确认有问题；但已经确认的故障，也不能被隐藏。** 如果只要求“不要再报红”，Codex 很容易把提示全部改成正常，表面上修好了假警报，却破坏了原本正确的故障提醒。

历史材料记录了针对这类错误的修复和定向测试，也明确说明：该轮没有重新构建、启动 Windows 正式候选，没有完成新的独立界面验收。因此，它支持我们理解旧问题和局部修复，不能证明本图的新系统已经运行成功。

下面用本轮给定的需求——“检查中不应误报故障，真正故障必须提示”——解释设计准备怎样处理。**正常完成与错误返修均为设计推演，不是新增实测结果。**

你照常向 Codex 提出这个需求，不必先编写另一份任务包。系统保留原始要求和相关材料，明确这次至少要做到：检查中的状态不被误判为坏；已经可用的连接不被误报；真正故障仍提示；标题、摘要和详情表达一致。它还要找出改动会影响哪些旧功能，将这些行为一并纳入检查，不能靠删掉旧功能或缩小要求换取“通过”。

如果只是按已经确定的状态规则修正一个局部映射，当前任务可以自查；如果改变了状态含义、数据来源或重要的判断标准，就需要项目已有的独立审查者重新读原始材料，在相关开发开始前核对要求。不能只让审查者看 Codex 写好的摘要，也不会把每个小界面修复都升级成重型审查。独立核对能否自动完成，取决于当前环境是否已有获授权、能实际运行并返回结果的通道。

开发时，系统要让 Codex 用上这个项目已经成熟的状态处理、回归测试和产品审查能力。若任务确实涉及视觉设计，再使用相关前端能力；不因项目有界面，就给所有后端修复强加一套前端流程。这样做是为了减少从低配方法起步、最后反复返工的情况。

需要哪些检查，由这次要求、改动范围和受影响的旧行为共同决定。缺少检查程序时，Codex 可以在原任务中补写，但新程序要先证明自己能区分正确实现、故意错误实现、缺少证据和应保持不变的旧行为。涉及新专业判断或重要交付的检查，还须经已有独立审查者批准，才能用于最终验收。产品作者不能通过一起改掉标准和预期答案，让自己写的产品与测试同时变绿。

检查随后落到实际成品。对 Lucerna，要确认看到的是这次准备交付的程序，核对实际数据、窗口中的标题、摘要与详情，并观察必要的交互和刷新。项目原有的独立产品审查仍然要完成。测试中模拟出来的状态，可以证明某条处理规则，但不能被说成在真实环境里观察到了同样的状态。

## 正常完成，和错误被挡住以后

沿图中的绿色路径，正常结果应是：可用连接仍被正确识别，正在检查的部分显示为检查中，标题与详情不互相矛盾；预先准备的真正故障对照仍能触发提醒，受影响的旧功能也保持正常。再由独立检查确认当前实际程序的表现，证据与同一个交付版本对应，任务才具备报告完成的条件。

图中的橙红色回路则解释了系统为什么有必要。假设 Codex 为了消除假警报，让界面永远显示正常。预先冻结的故障对照应当识别这个错误；实际窗口检查还要核对数据与画面，防止底层已确认故障，界面却仍显示正常。

检查失败后，系统把原要求、实际结果、期望表现和证据直接交回正在处理这件事的 Codex 任务。在这个例子里，Codex 应把“尚未查明”和“已确认故障”重新分开，让状态数据与界面使用一致的含义，再检查受影响的旧功能，并对修好的版本重新取证。旧版本的截图、测试或审查结果，不能冒充新版本已经通过。这个回路应当在你拿到结果之前发生，不需要你先发现问题，再复制错误报告要求重做。

失败也不一定是产品错了。如果观察程序打开了旧版本，应修复观察过程并重新检查；如果没有足够数据，应说明尚不能判断。系统不能为了消除一个错误提示，反过来把正确产品改坏。

自动返修受原任务的权限、时间和次数限制。你取消任务后不能继续；如果原任务已经退出，也不能承诺它会自己在后台醒来。系统应保存失败证据和原任务恢复位置，之后继续同一个任务时先读这些材料，避免让你重新拼上下文。

## 最后凭什么相信交付

最后一道检查必须进入正常的任务结束过程。即使 Codex 直接写下一份“已完成”报告、忘了主动调用检查，只要走的是已经接通并受保障的入口，缺少必需证据的结果就不能被接受为可用交付。

交给你的报告应当说清楚：完成了什么，检查的是哪个实际版本，哪些真实观察支持这个结论，哪些旧功能仍然正常，还有什么没有证明。材料准备好了但尚未完成独立验收，可以如实交代为等待验收，不能写成已经可用。

这不会让软件从此没有缺陷。它能减少的是几类常见假完成：漏掉原要求却全绿、删掉旧能力换通过、测试了另一个版本、验收失败却无人接收，以及没有验收就直接宣布完成。验收标准本身仍可能不完整，因此新检查必须校准，重要判断仍需独立专业审查。

七个项目也不会共用一个“质量分数”。Lucerna 的真实窗口、手机应用的实际设备行为、科学任务的数据与实验结论，仍由各自原有的专业标准判断。这套系统负责确保该做的检查确实发生、结果确实被接收、证据确实支撑最终报告。

## 你以后会有什么不同，哪些边界仍然存在

在已经实施、验证并启用的环境里，你仍然正常提出需求。系统应自行完成相关能力选择、旧功能保护、验收安排和有界返修；你不必每次追加“请验收”“别破坏旧功能”“失败了继续修”。

真正超出已有授权的账号使用、设备操作、付费、GPU、部署等动作，仍须得到你的授权。外部环境不支持、必需的独立审查通道不可用，或者证据不足时，系统必须说明缺什么、能继续什么、原任务从哪里恢复。需要原有人工交接的路径会明确保留，不能把你搬运报告的工作隐含在“全自动”承诺里。

如果原生聊天的必要接入机制完全缺席，这套设计也不保证撤回已经生成的错误完成文字。它不为补这个边界另造一个 Codex 客户端。

**此刻通过的是架构设计。** 项目已有代码和历史测试不等于新的交付保障已经接通。正常入口、独立结果返回、结束时强制检查、同任务恢复和七仓适配，都仍须实施与实测。已有计划要求先验证宿主支持，再做最小 Lucerna 完整试点；本轮只重做解释与图片，没有执行这些步骤。

## 来源说明

以下材料供核验机制与历史事实；主图不承担技术合同表的用途。

- **设计依据：** 独立第三轮设计审查结论由用户在本任务中转交；没有单独的 GitHub 审查原文。被审包为 [7ca0f0f](https://github.com/YuukiAS/AI_Research_Toolkit/commit/7ca0f0f2c84cc9f29ec8df525797d17da168bd7b)，冻结架构源为 [79fe13a](https://github.com/YuukiAS/AI_Research_Toolkit/commit/79fe13a6ce3480732e206b33029cfa3b9fcf9a78)。本次没有重新设计或发起架构审查。
- **请求、检查与返修的技术追溯：** 冻结源中的 [02 整体架构](https://github.com/YuukiAS/AI_Research_Toolkit/blob/79fe13a6ce3480732e206b33029cfa3b9fcf9a78/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/02_ARCHITECTURE_AND_COMPONENTS.md)、[03 完整调用合同](https://github.com/YuukiAS/AI_Research_Toolkit/blob/79fe13a6ce3480732e206b33029cfa3b9fcf9a78/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md)。图中的目标核对对应拟新增 `prepare_admission/run_admission_review/consume_requirement_review`；能力选择与验收定义对应 `select_execution_capabilities/select_checks` 和 `submit_definition/calibrate_definition/activate_definition`；失败返回对应 `on_stop/run_delivery_cycle`；结束检查与报告对应 `finish_delivery → check_delivery → report → accept_submission`。这些是已冻结、待实施的接线，不能当成已存在且已验证的能力。
- **七仓专业出口、权限与恢复：** 冻结源中的 [04 七仓接入](https://github.com/YuukiAS/AI_Research_Toolkit/blob/79fe13a6ce3480732e206b33029cfa3b9fcf9a78/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/04_SEVEN_REPOSITORY_ADOPTION.md)和 [06 分阶段实施](https://github.com/YuukiAS/AI_Research_Toolkit/blob/79fe13a6ce3480732e206b33029cfa3b9fcf9a78/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/06_IMPLEMENTATION_AND_EVALUATION.md)。本次未修改技术合同或实施草稿。
- **Lucerna 历史事实：** 固定源码 `79dd2875d3da33c6a6d80e5e35bea812b84c1ceb` 下的 [原任务](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/prompts/tasks/01054_final_independent_release_acceptance.md)、[修复记录及尚未完成的验收边界](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/results/01054_final_independent_release_acceptance/repair-product-001.md)、[后端状态处理](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/src-tauri/src/longleaf.rs#L1889)、[界面状态处理](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/src/longleaf-presentation.ts#L44)、[对应回归检查](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/scripts/test-longleaf-presentation.mjs)和[独立产品验收合同](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/docs/workflows/LUCERNA_INDEPENDENT_RELEASE_ACCEPTANCE.md)。
- **解释标准与图形检查：** 按仓库 [复杂架构的可信解释标准](https://github.com/YuukiAS/AI_Research_Toolkit/blob/daf797c79bcd777c27948da51c4218e5d95e7be3/COMPLEX_ARCHITECTURE_EXPLANATION_STANDARD.md)组织。主图为 16:9，SVG 保留可编辑文字和图形，PNG 实际渲染为 3840 × 2160；已打开检查完整画面及 960 × 540 缩小预览的中文、字号、留白和返修箭头。这是图片交付检查，不是系统运行验收。

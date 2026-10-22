# Delivery Assurance：系统架构与 Lucerna 执行路径

## 为什么需要这套系统

你提出需求后，Codex 可能已经写完代码、跑过测试，却没有确认实际交到你手里的东西是否符合要求。它也可能从一开始就理解漏了，或者修好新功能时做坏了旧功能。没有人把这些检查结果接回任务，最后就只能由你发现问题、提醒验收、要求继续修。

Delivery Assurance 准备把目标核对、旧功能保护、真实验收、失败返修和最终交付判断接进正常任务。你仍然照常提出需求；系统应当在交付前发现能够检查出来的问题，并让原任务处理。**已经通过的是这套架构的设计，新的接线与完整运行路径尚未实施、验证。**

两张图回答不同的问题：图 1 说明系统有哪些部分、谁负责什么；图 2 说明一个 Lucerna 需求怎样经过这些部分。第二张图使用真实历史问题，但其中的新系统执行路径是设计推演，不是运行记录。

## 图 1：谁在运行，属于哪个线程

![Delivery Assurance 架构图：当前 Codex 主线程、Bridge Kit、workflow-core、项目验收程序，以及按需使用的独立审查线程与原外部任务。](11_DELIVERY_ASSURANCE_ARCHITECTURE.png)

[高清图](11_DELIVERY_ASSURANCE_ARCHITECTURE.png) · [可编辑矢量图源](11_DELIVERY_ASSURANCE_ARCHITECTURE.svg)

图中分开了三类东西：左侧是你正在使用的 Codex 主任务；中间和下方是被调用的普通程序；右上方是有独立上下文、需要合法启动与返回通道的审查角色。不能把三类都叫作“系统检查”，也不能把一个检查脚本画成另一个代理。

|图中对象|它究竟是什么|谁调用、结果交给谁|
|---|---|---|
|当前 Codex 主线程|你提出需求的原任务；负责理解、实现、使用成熟能力和返修|经当前工具调用与宿主入口接入 Bridge Kit；失败仍回这个任务|
|Bridge Kit|入口与回传程序，不是另一个模型、子代理或聊天线程|由当前任务及原有宿主调用；调用规则库和已有验收入口，收回对应任务的结果|
|workflow-core|普通共享规则库，不自行启动模型、线程、设备或产品|Bridge Kit 传入原要求的整理结果、标准、变化范围和证据；它返回选测、资格核验与交付规则判断|
|项目验收程序|项目已有工具、脚本与结果转换，不是独立审查代理|由原有项目入口或 Bridge Kit 在授权范围内调用，输出当前成品的专业观察与证据|
|项目独立审查者|已有专业角色；需要时在独立上下文中运行|获权的本机单次调用由 Bridge Kit 接回；必须验证准确的子线程、当前要求与输出身份|
|原有外部任务／会话|现有规划、审查或核验角色的原运行环境，不一定是 Codex 子线程|由已存在的安排任务或项目控制者实际启动；原接收者取回结果后继续原逻辑任务|

**谁先弄清楚要求。** 当前 Codex 从完整原文整理这次要做到什么。标准已明确的低风险修复可以在主线程自查；改变重要含义、观察来源或专业判断时，需要已有独立角色重新读原始材料。workflow-core 按冻结规则决定需要哪一类核对，不替模型理解所有自然语言，也不创造专业标准。Bridge Kit 负责把真实材料送到合法入口，并确认结果确实返回。

**子代理与其他线程并不是同一回事。** 冻结设计选择的本机审查入口，是一次只读的 Codex 子进程：它有独立上下文和实际线程身份，不是主 Codex 在原对话里换个口吻自审。主任务或原父进程仍负责等待和消费结果。项目原本已经使用、且权限明确允许的原生子代理，可以作为等效载体；本方案不默认新增一组通用子代理。

同一已有审查角色可以按阶段承担要求核对、验收器准入或产品审查，但三种职责不代表同时常驻三个新代理。事前要求核对只读原文、标准和源码，不获得运行产品、设备或账号的权限；真正产品审查必须另按原项目的授权与观察合同进行。审查者不能修改候选产品、正式标准或受保护答案。

外部路径又不同。已有安排任务实际启动规划或审查角色，原有结果接收程序取回它写下的当前决定；只创建任务文件不代表角色已运行。原项目已有控制者能够调用独立角色时，仍由它调用并消费。科学任务沿用原科学规划者；没有原核验角色就不凭空新增。若外部机制接管后使用另一条执行会话，必须记录关联，不能把“继续同一逻辑任务”说成“恢复同一个原生聊天线程”。本次负责设计的规划者与独立设计审查者，也不自动参与以后每个普通产品请求。

**谁保护旧功能、决定验什么。** 项目提供已接受的标准、正式入口及依赖关系；当前任务和必要的独立角色提供本次范围解释。workflow-core 根据这些输入确定受影响的旧行为、所需检查和相关成熟能力，Bridge Kit 把选择与真实版本交给当前 Codex 消费。不能只测新功能、把遗漏的旧功能当作不需要，也不能只登记插件名称就算实际使用。

缺少检查时，由当前 Codex 补候选程序。候选先用冻结的正确、错误、缺证据和旧行为对照校准，重要专业判断再由已有独立权威批准。Bridge Kit 记录并消费批准，workflow-core 核验它是否具备使用资格；未获准的检查不能支持最终交付。这里没有新增一个长期“验收器代理”。

**谁真正验、谁最终放行。** 项目验收程序观察实际成品、原始数据和交互，已有独立审查角色完成专业判断；它们分别给出可以追溯的结果。Bridge Kit 核对结果属于哪个任务和版本，调用 workflow-core 判断必需证据是否完整，再生成相应报告。受支持的正常结束入口必须执行这项检查，不能让主 Codex 仅凭一句“完成”自行放行。共同规则不替专业审查重新打分。

**失败怎样回到原线程。** 图中橙红色箭头是 Bridge Kit 把问题、期望、实际结果与证据交回原 Codex，而不是让独立审查者接手修改产品。有活跃任务时通过当前工具返回或已验证的结束反馈继续；需要恢复时核对准确线程身份，不能随便选最近一条聊天。修好后重新检查当前版本。错误如果来自取证程序，就修取证；不能为了消除提示反过来改坏产品。

## 图 2：Lucerna 的需求怎样走完这条路

![Lucerna 执行路径：我提出需求，系统核对目标，Codex 实现，观察实际窗口和数据；错误回原任务修复，再验通过后交付。](12_LUCERNA_EXECUTION_FLOW.png)

[高清图](12_LUCERNA_EXECUTION_FLOW.png) · [可编辑矢量图源](12_LUCERNA_EXECUTION_FLOW.svg)

从上向下看四条泳道：“我”提出需求并接收结果，“Codex”负责实现与修复，“系统检查”汇总图 1 中 Bridge Kit 的调用、规则库的判断，以及项目检查和必要的独立审查，“Lucerna 真实结果”是被观察的实际程序。这条泳道表示协作过程，不是另一个总审查代理。图中的返修箭头从系统检查直接回到 Codex，没有经过“我发现问题、我转述错误”这一步。

**真实历史是什么。** Lucerna 的修复记录曾指出：三条访问路线中已有两条可用，另一条还在检查，有些辅助状态只是没有观察结果，旧实现却可能把整体升级为故障。界面还可能同时表达“不可用”和“检查中”。历史记录包含相应修复及定向测试，但明确没有在该轮重新构建、启动 Windows 正式候选，也没有完成新的独立界面验收。它证明了问题的来源和局部修复情况，不能证明 Delivery Assurance 已经跑通。

下面两条路径，是对“检查中不应误报故障，真正故障必须提示”的设计推演。

正常路径从你照常提需求开始。系统先明确：检查中不等于故障，尚未观察到结果不等于已经坏了；同时，已经确认的故障必须继续提醒，标题、摘要和详情要一致。已有可用连接、正确故障提醒、稳定刷新等受影响的旧行为，都不能在修复中丢失。若改动还会影响其他已有能力，也要按实际依赖补上保护。

Codex 在原任务中修改状态处理，复用项目已有能力和检查。随后观察这次准备交付的 Lucerna 程序，确认实际状态数据与窗口展示一致，完成所需交互及独立验收。预先准备的多状态对照用于检验处理规则；它不能冒充真实环境中已经观察到了每一种状态。

正常通过时，检查中的部分不会被误报为坏，已有可用连接保持正确展示；故障对照仍会触发应有提醒，实际窗口的标题与详情一致，受影响的旧功能没有退化。当前版本的必需证据齐全后，正常结束检查才接受交付，并把结果与证据交给你。

橙红色路径展示一个故意错误的实现：Codex 为消除假警报，让状态永远显示正常。故障对照应识别这种错误；实际窗口检查还要防止“数据已确认故障，画面却说正常”。这时由系统发现不一致，把问题和证据送回原任务，不等待你先打开软件找错。

原任务应重新区分“尚未查明”和“已确认故障”，让数据与界面采用一致含义，再沿绿色路径运行修好的版本、重新观察、复查旧功能。修改后的版本不能沿用旧版本的截图或审查结论冒充通过。只有新的证据支持要求，才能进入同一个最终交付出口。

因此，这个回路的价值不是增加一份错误报告，而是让报告有真正的接收者、有允许继续的原任务，并在修复后回到同一套验收标准。

## 现在已确定什么，还不能承诺什么

**设计已通过。** 职责划分、原任务返修、验收器准入、相关成熟能力的使用、材料准备与最终可用的区别，以及七个项目的专业归属，都属于已冻结设计。本次只重做两张图和说明，没有重新设计架构。

**新的完整系统尚未实现。** 普通入口的自动接入、独立核对的实际启动与返回、正常结束时强制检查、同任务恢复、七仓适配，都还不能当作已经可用。已有代码和历史测试，只能支持它们实际覆盖的部分。

**仍须真实环境验证。** Windows 桌面、命令行和远程环境能否可靠触发、接回反馈、恢复同一任务，取消和退出后会不会重复动作，都要按已有先行验证计划逐项证明。之后还要用最小 Lucerna 完整试点证明：错误被系统发现、原任务收到并修复、当前成品复验通过。一个环境成立，不能替其他环境作保证。

**不能自动完成时，要明确说明。** 缺少已有授权、合法独立审查通道、必要观察，或者环境不支持时，只能继续不依赖这些条件的合法工作；不能把剩余任务说成完成。新的账号、设备、GPU、付费或部署动作不会因接入系统而自动获得授权。

自动返修受原任务的次数、时间和权限限制，用户取消后不能继续。没有活跃原任务时，应保存反馈、证据和恢复位置，不能承诺后台自己唤醒，也不能把人工搬运报告隐藏在“全自动”说法里。原生接入机制完全缺席时，不保证撤回已经生成的错误完成文字。

本次已实际渲染并检查两张高清图及缩小预览，只修改原研究目录中的图示、说明和相应索引；没有修改生产代码、运行宿主探针或产品、创建新任务或启动新的审查。

## 来源说明

以下材料供核验机制与历史事实；两张图分别解释系统结构与任务执行，不承担技术合同表的用途。

- **设计依据：** 独立第三轮设计审查结论由用户在本任务中转交；没有单独的 GitHub 审查原文。被审包为 [7ca0f0f](https://github.com/YuukiAS/AI_Research_Toolkit/commit/7ca0f0f2c84cc9f29ec8df525797d17da168bd7b)，冻结架构源为 [79fe13a](https://github.com/YuukiAS/AI_Research_Toolkit/commit/79fe13a6ce3480732e206b33029cfa3b9fcf9a78)。本次没有重新设计或发起架构审查。
- **请求、检查与返修的技术追溯：** 冻结源中的 [02 整体架构](https://github.com/YuukiAS/AI_Research_Toolkit/blob/79fe13a6ce3480732e206b33029cfa3b9fcf9a78/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/02_ARCHITECTURE_AND_COMPONENTS.md)、[03 完整调用合同](https://github.com/YuukiAS/AI_Research_Toolkit/blob/79fe13a6ce3480732e206b33029cfa3b9fcf9a78/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md)。架构图的目标核对对应拟新增 `prepare_admission/run_admission_review/consume_requirement_review`；能力选择与验收定义对应 `select_execution_capabilities/select_checks` 和 `submit_definition/calibrate_definition/activate_definition`；失败返回对应 `on_stop/run_delivery_cycle`；结束检查与报告对应 `finish_delivery → check_delivery → report → accept_submission`。这些是已冻结、待实施的接线，不能当成已存在且已验证的能力。
- **七仓专业出口、权限与恢复：** 冻结源中的 [04 七仓接入](https://github.com/YuukiAS/AI_Research_Toolkit/blob/79fe13a6ce3480732e206b33029cfa3b9fcf9a78/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/04_SEVEN_REPOSITORY_ADOPTION.md)和 [06 分阶段实施](https://github.com/YuukiAS/AI_Research_Toolkit/blob/79fe13a6ce3480732e206b33029cfa3b9fcf9a78/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/06_IMPLEMENTATION_AND_EVALUATION.md)。本次未修改技术合同或实施草稿。
- **Lucerna 历史事实：** 固定源码 `79dd2875d3da33c6a6d80e5e35bea812b84c1ceb` 下的 [原任务](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/prompts/tasks/01054_final_independent_release_acceptance.md)、[修复记录及尚未完成的验收边界](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/results/01054_final_independent_release_acceptance/repair-product-001.md)、[后端状态处理](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/src-tauri/src/longleaf.rs#L1889)、[界面状态处理](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/src/longleaf-presentation.ts#L44)、[对应回归检查](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/scripts/test-longleaf-presentation.mjs)和[独立产品验收合同](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/docs/workflows/LUCERNA_INDEPENDENT_RELEASE_ACCEPTANCE.md)。
- **解释标准与图形检查：** 按仓库 [复杂架构的可信解释标准](https://github.com/YuukiAS/AI_Research_Toolkit/blob/daf797c79bcd777c27948da51c4218e5d95e7be3/COMPLEX_ARCHITECTURE_EXPLANATION_STANDARD.md)组织。两张图均为 16:9，各自保留可编辑 SVG 图源，并实际渲染 3840 × 2160 PNG；已分别打开检查完整画面和 1100 像素宽及聊天缩小预览的中文、字号、留白、箭头及两图分工。这是图片交付检查，不是系统运行验收。

# 独立 Critic R2：复核同一 Delivery Assurance 架构的五项 R1 修订

你是独立于原 Planner 的架构 Critic。本次只审 DA-AR-01..05 的修订、它们对整套方案的连带影响，并重新走一条正常用户完整路径。不要启动新版本研究、另造目录、重问已接受边界，也不要把这一轮扩大成生产实施或 execution-ready 审查。结论只能是设计阶段 **PROCEED / REVISE**，不出 Codex Goal、Kickoff 或 READY_FOR_CODEX=YES。

## 1. 固定审查身份

- target_repo=YuukiAS/AI_Research_Toolkit
- target_plugin_or_domain=Delivery Assurance
- design_topic_or_task_key=software-production--delivery-assurance
- source_branch_or_ref=research/software-production-decision-20261013
- review_stage=ARCHITECTURE_REVIEW_R2
- previous_critic_decision=REVISE
- previous_reviewed_package_commit=369b4ae4a534a7d87be11a36e7c4b3ca9114e0c7
- previous_architecture_source_commit=28eded9ff482ff2377804ebac012c0dc36e8ebe5
- architecture_source_commit=c87220f9d52935e4eb5296b072830cfd408d32df
- stable_blockers=DA-AR-01,DA-AR-02,DA-AR-03,DA-AR-04,DA-AR-05
- previous_review_path=USER_PROVIDED_CRITIC_R1（用户转交正文，无仓库原件；不得杜撰review文件或批准）
- 唯一目录=docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/
- package_commit=采用用户交接消息给出的精确最终提交；若未给，读取上述分支一次并固定HEAD为proposal_commit，先核CURRENT。不得审查中追随移动HEAD。

README、01–07和覆盖CSV的实质方案固定于architecture_source_commit；随后只有08及CURRENT允许作送审定位更新。核对差异：若技术文件变了，不能用旧源或旧结论代签。CURRENT应记录READY_FOR_CRITIC=YES及实际回读；ARCHITECTURE_CLOSED=NO在此表示尚未独立复核，不能误解为五项仍留给实施者作选择。

本次只读。禁止修改任何仓库、Issue或生产状态，禁止创建task/subagent/handoff/fork/自动化，禁止安装、运行模型探针、账号、设备、正常浏览器、Zotero、私有数据、GPU/Slurm、付费、邮件、部署或发布。原Planner的GitHub写入探针要求不适用于这次只读Critic；未来实施命令不是当前授权。

## 2. 不得重开的用户决定

1. 正常受支持的 Codex 入口自动接入。
2. 受管交付强制真实验收。
3. Hook 完全缺席时不要求撤回已经生成的原生聊天错误文字；此例外不豁免正式交付。
4. 不开发额外客户端、常驻调度平台、第二任务数据库、第四工作流或万能评分器。
5. 目标是用户不再反复提醒验收、发现假完成、搬运失败和要求继续修复。真实独有授权仍归用户。

subagent不是新的架构组件或独立性的证明。若方案把它作为既有Reviewer/Verifier执行方式，必须有完整原材料、真实只读边界、无候选/产品/答案写权，以及明确结果消费者。当前没有启动这种agent的授权。

## 3. 必读材料与来源

先完整读固定package的README、CURRENT、01–08正文和05_HISTORICAL_COVERAGE.csv，再读09、10原合同；00是原写入证据。不要只读新增小节或Planner的处置表。原需求来自上一级01_GPT_WORK_FULL_ARCHITECTURE_PROMPT.md、00_USER_REQUIREMENTS_AND_GAPS.md，以及docs/research/software-production/21_DELIVERY_ASSURANCE_COMPONENT_AND_QUESTION_INVENTORY_20261022.md；对五项相关问题从原文重建，不把覆盖答案当真值。

核查研究仓最新main的COMPLEX_SYSTEM_DESIGN_GUIDE.md和COMPLEX_ARCHITECTURE_EXPLANATION_STANDARD.md，本轮固定读取daf797c79bcd777c27948da51c4218e5d95e7be3。读取AI_Skills_Collection最新main的AGENTS、docs/workflows/PLANNER_ROLE_CONTRACT.md、CRITIC_ROLE_CONTRACT.md、PLUGIN_CAPABILITY_GATE_POLICY.md、AI_SKILLS_MAINTENANCE_BOARD.md；本轮源ca10623fe028114cfafc5ec7e5350800d5c8259c。若最新又变，先固定新SHA并区分设计相关差异，不能默默替换本包事实。

Bridge release=ba9013b9fbbd242e51b09f9d09291f417df17652；实际开发分支work/bridge-core--product-scope-reset在本轮最后读取f7caede593ea90f1a8f38fe33a7bcbc1dae3f94f。相对b3a435e仅新增正常入口提案v0.3，源码未改。07给cli/reviewed_runner/reviewed_handoff/agent_flow/readiness、相邻提案与官方Codex固定源码链接；待审提案不当生产实现。官方文档和源码不能证明实际安装的Desktop/CLI/Remote行为。

七仓固定源如下，按04/07直链读取对应AGENTS、入口、专业合同和历史原材料：

|仓库/有效分支|固定SHA|
|---|---|
|Lucerna main|79dd2875d3da33c6a6d80e5e35bea812b84c1ceb|
|Bobbio develop|a64edfd6c5b11f81599bfcfc327be5964633a7b5|
|Mica-for-ChatGPT rebuild|0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c|
|SeminarArc main|5652fe17ce60625f3ff7c758fcc0183f920189de|
|Asteria main|193c033659a7612a99442763077217b130e9b756|
|CUHK_Date main|9f25c7754d3c80d0be74f5b71016320f55753ae6|
|CARE_Challenge main|75a40e454de43b64e59a0b0b438ff57ef2bb8345|

36职责、315问题、83要求、363历史和26能力族都是覆盖输入，不要求同量新模块。原823行前八列保持；37条定向审读/326条当前UNKNOWN不是当前运行通过。

## 4. 五项稳定 blocker 的关闭判据

### DA-AR-01：原请求独立核对与模式分流

检查03#r1-ar01、F1、联动补充和02完整链。必须从源码调用位置判断：prepare_admission及其consumer是否在首次依赖产品写入前；何时SELF足够、何时已有角色必须从原材料独立重建；Review PLAN_REQUESTED/PLAN_FROZEN如何消费，Control与项目原角色如何复用；异步返回时谁活跃。检查原生无包进入既有模式的幂等身份、分支/任务授权边界；没有独立接收者时允许读/诊断/已准入无关范围，却不能偷签USER_READY。纯CLI的readonly bootstrap不能成为通用新agent，必须同Executor精确resume且实际工具权限可限。

反例：把重要要求标CONTEXT；以Executor摘要代原材料；独立结果落盘无人消费；原任务结束却承诺后台自动恢复；需要耐久接收却首片未接Review或项目owner。

### DA-AR-02：validator 与 ProjectAdapter 定义准入

检查03#r1-ar02与D6/F4唯一类型。RequestedClaim.stage只能是REVIEW_BUNDLE_READY/USER_READY/INTERMEDIATE_EVIDENCE；校准是单独Context/Report，CANDIDATE/CALIBRATING不能冒ACTIVE。DefinitionAdmission须精确绑定候选、冻结good/bad/missing/unchanged、实际校准结果、准入权威、激活digest与回执。机械自动准入仅限既有冻结标准/控制政策；新专业含义、观察方式、阈值/golden变更、严重假绿和首次adapter等必须独立角色。

追submit→calibrate→原owner消费专业决定→activate→唯一profile CAS→正式reader。检查DefinitionAdmissionLocator、ReceiptLocator以及追加记录是否真正去环；新adapter候选校准→独立激活→不签Claim的shadow→enable是否可启动。候选作者不能改参考答案获批；只读sandbox不自动隔绝MCP外部效果。

反例：恒680的validator四例全PASS；把missing当PASS；伪写ACTIVE；批准后换程序/控制集；校准JSON送GateResult parser；激活中途崩溃；首次adapter校准要求自己已启用。

### DA-AR-03：成熟实现能力确定性消费

核对REQ-043/065和03#r1-ar03。Resolution必须说明为何需要、实际source/installed/loaded版本、给当前Executor的完整合同、真实读取或调用、对实现/成品的具体影响、不可用处理和claim上限。检查select/bind/ack、原prompt/RoleLaunchRequest、prepare-run/check_delivery的真实接点及能力事件→不可变Resolution-R0/R1→Receipt无循环。ACK不是理解或质量证明；质量仍归原专业审查。

反例：只有安装列表、只说“已使用”、加载旧缓存、只有validator registry；UI任务省成熟设计能力；纯后端/计算/普通文档误跑完整前端。明确批准且有证据的项目成熟等效能力可替代Plugin，不强迫品牌或额外安装。

### DA-AR-04：七个真实最终消费者

逐个查04#r1-ar04，不准以Executor/Parent/Controller角色名代答案。七个拟新增finalizer应有现存文件位置、完整命令、合法状态、独立专业输入、check_delivery精确位置、report输出、原结果writer绑定和无owner恢复。源码中不存在的新函数必须仍标待实现，不误称已接通。

重点：Lucerna不重跑历史campaign；Bobbio0.2Safe不替0.3最终隔离验收；Mica candidate不等loaded产品；SeminarArc准备PASS不等Parent实际审查；Asteria常量几何不等独立图形；CUHK最终分支先于凭据/live操作且不重用未消费票据的准备条件；CARE最终分支先于accounting/commit，保留Controller默认无额外Reviewer及科学Planner归属。

每仓尝试绕过check直接生成READY，必须由受管报告/原完成验证拒绝；无实际最终consumer不能DA enabled。报告后候选变更也必须失效。USER_READY不等发布权限、用户审美接受或科学正结果。

### DA-AR-05：先证明宿主，再实施公共层

检查06#r1-ar05、P0→P1/P2依赖和首片。P0应有限、无七仓产品副作用，分别证实际Windows Desktop/CLI/Remote版本、Hook信任/禁用/缺失/超时/畸形、同步Stop同会话继续、JSONL精确thread/resume、AGENTS/技能变更后实际加载、用户取消/父退出/不重复效果。缺失Hook的文字边界已接受，不能拿探针承诺修掉它。

未知和不支持须按已冻结矩阵选择具体回退；关键无可用路线必须同Planner修P2再经受影响设计审查，不能先投入完整da/2。探针不是生产验收，也不代表获权运行。估算4–8小时P0、36–80小时首片、130–316小时全量均未量测，检查新增独立准入/耐久接收者成本没有遗漏。

## 5. 必须重走正常用户完整路径

独立选择一项正常、未专为本方案编排的功能请求，从原话→写前风险分流→独立要求→成熟能力实际使用→旧/新入口与依赖→缺validator补建和准入→正式真实对象→失败反馈实际接收→同task有界修复→七仓相应finalizer→简明报告逐跳反推。至少深入Lucerna、SeminarArc、CARE三种异质链，并核对另四仓最终出口，不能以一个例子代七仓。

五项修订不能破坏：材料就绪/USER_READY分层；结果回执去环；父子lease/短锁；共享预算和取消epoch；外部等待不消耗返修轮次；副作用UNKNOWN先核对不重发；科学充分负结果；da/1只诊断、同一未发布da/2严格握手；旧能力和真实专业归属。重点查新增机制之间的循环、无接收者、选择性忽略、无授权效果和小任务成本。

实际宿主、账号和设备未测可以是明确的实施验证前提；但不能用“以后实现再决定”掩盖可由源码/架构分析决定的调用、字段、消费者或回退。P0若失败的后续路线应在本设计中明确，不能交Codex猜。

## 6. 输出合同

先用自然中文说本轮五项是否解决了会让用户继续发现假完成/搬运失败的问题，再给唯一PROCEED或REVISE。逐个稳定ID记录CLOSED或仍OPEN，并给固定源码/方案位置、完整调用链和用户影响；新增问题限于本轮修改产生的实质连带影响，归入相关稳定ID，不以换编号重开同一问题。

若REVISE，指出最小必要修订及原owner，形成可直接交回同一Planner的五项对账；不得仅说“已有章节不足”或让实施者自选关键架构。若PROCEED，只表示该候选通过实现前设计审查，说明仍未执行的P0/七仓实测及后续独立授权边界；不输出Codex实施任务。

列出实际审过的package/source SHA、最新上游差异及证据限制。不得继承前轮作者自评、文档数量、绿色覆盖矩阵或旧da/1结论。不要要求用户重复接受同一有界混合架构。

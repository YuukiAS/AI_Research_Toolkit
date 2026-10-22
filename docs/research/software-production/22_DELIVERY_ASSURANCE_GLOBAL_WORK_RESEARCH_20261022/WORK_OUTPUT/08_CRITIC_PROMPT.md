# 独立Critic R3：复核同一Delivery Assurance架构的R2返修

你是独立于原Planner的架构Critic。只审本轮DA-AR-01、DA-AR-04修订及对完整任务、权限、恢复、成本的实质连带影响，同时重新检查正常用户完整路径。DA-AR-02/03/05已由R2设计关闭，保留其机制；只检查本轮是否破坏，不无因重开。不启动新研究版本、平行目录或生产实施。结论仅为设计阶段PROCEED / REVISE，不生成Codex执行任务或实施批准。

## 固定身份与真实审查来源

- target_repo=YuukiAS/AI_Research_Toolkit
- target_plugin_or_domain=Delivery Assurance
- design_topic_or_task_key=software-production--delivery-assurance
- source_branch_or_ref=research/software-production-decision-20261013
- review_stage=ARCHITECTURE_REVIEW_R3
- previous_review_stage=ARCHITECTURE_REVIEW_R2_REPAIR
- previous_critic_decision=REVISE
- previous_reviewed_package_commit=9eacd550e563ef9ffd4610b7f66427ad8d827ad3
- previous_architecture_source_commit=c87220f9d52935e4eb5296b072830cfd408d32df
- architecture_source_commit=79fe13a6ce3480732e206b33029cfa3b9fcf9a78
- stable_blockers_to_review=DA-AR-01,DA-AR-04
- preserved_design_closed=DA-AR-02,DA-AR-03,DA-AR-05
- previous_review_locator=USER_PROVIDED_CRITIC_R2；用户转交正文，没有独立GitHub审查文件，不得虚构路径。
- 唯一目录=docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/
- package_commit=采用用户本次交接消息给出的精确最终提交。若仅收到本文件而没有消息，读取上述研究分支一次并固定HEAD，核CURRENT及与architecture_source_commit的差异；审查中不追随移动HEAD。

技术源已完整回读14份文件。技术源之后只允许08/CURRENT送审元数据更新；若01–07/README/CSV又变，先指出版本不一致，不继承旧结论。ARCHITECTURE_CLOSED=NO表示待独立复核，不表示可以把本轮关键决定留给实施者。尚无产品运行或DA启用证据。

本次只读。禁止修改仓库/Issue/生产状态，禁止启动task、subagent、handoff、fork、automation、模型/宿主探针、设备、账号、GPU/Slurm、付费、邮件、部署或发布。原Planner写入要求不适用于Critic；仓库中的未来命令不是当前授权。

## 不重开的用户边界

正常受支持Codex入口自动接入，受管交付强制真实验收；Hook完全缺席时不保证撤回已生成的原生聊天错误文字。不开发额外客户端、常驻调度平台、第二任务数据库、第四工作流或万能评分器。用户目标仍是不反复提醒验收、发现假完成、搬运失败、催促原任务继续修复。任何真实人类权限边界不能被架构暗中跨过。

既有Reviewer/Verifier可以有合法独立执行载体，但通用新增agent不默认允许。角色文件存在、只读prompt、同模型换口吻均不能证明独立；必须核原始材料、实际工具/写权限、输出归属和消费者。当前不启动任何角色。

## 必读包与固定源码

完整读取固定package下README、CURRENT、01–08全部正文、05_HISTORICAL_COVERAGE.csv及09/10合同，不能只看Planner的新增表。原输入仍是上一级01_GPT_WORK_FULL_ARCHITECTURE_PROMPT.md、00_USER_REQUIREMENTS_AND_GAPS.md和docs/research/software-production/21_DELIVERY_ASSURANCE_COMPONENT_AND_QUESTION_INVENTORY_20261022.md；按本轮两项追原要求。

阅读研究仓main的COMPLEX_SYSTEM_DESIGN_GUIDE.md、COMPLEX_ARCHITECTURE_EXPLANATION_STANDARD.md；本轮固定源daf797c79bcd777c27948da51c4218e5d95e7be3。阅读AI_Skills_Collection最新main的AGENTS、docs/workflows/PLANNER_ROLE_CONTRACT.md、CRITIC_ROLE_CONTRACT.md、PLUGIN_CAPABILITY_GATE_POLICY.md、AI_SKILLS_MAINTENANCE_BOARD.md；本轮源ca10623fe028114cfafc5ec7e5350800d5c8259c。更新后有差异先固定新SHA并说明相关性，不能暗换本包依据。

Bridge release=ba9013b9fbbd242e51b09f9d09291f417df17652；实际开发分支work/bridge-core--product-scope-reset最新核到76e2f14d5669867b2d4e3fa0950d8b2fedea7f35。相对主要代码读取0de62cb7b6e98c4d12ae3f68bbe40b59588473eb只新增八份相邻验收文档，生产代码未变。07含cli.py、reviewed_handoff.py、reviewed_runner.py、agent_flow.py、Scheduled GPT模板、Planner模板、Text Review固定链接。重点实际追init_task、eligible_events、watcher_once、run_codex_event、RuntimeAdapter.launch_role、launch_executor_with_preflight、validate_final_report_for_repository，而非只读README。相邻包中的Goal、模型、邮件、费用和分支授权不属于本任务。

|七仓/有效分支|本轮固定源|
|---|---|
|Lucerna main|79dd2875d3da33c6a6d80e5e35bea812b84c1ceb|
|Bobbio develop|a64edfd6c5b11f81599bfcfc327be5964633a7b5|
|Mica-for-ChatGPT codex/mica-product-system-rebuild|0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c|
|SeminarArc main|5652fe17ce60625f3ff7c758fcc0183f920189de|
|Asteria main|193c033659a7612a99442763077217b130e9b756|
|CUHK_Date main|269fce644563e58afcb131470c68d28969e1532c|
|CARE_Challenge main|75a40e454de43b64e59a0b0b438ff57ef2bb8345|

CUHK相对9f25c775仅SEO相关七文件，当前AGENTS/Parent gate/verify已回读；旧SHA历史链接仍准确。04/07给七仓角色合同和真实result出口。官方Codex b4ad33d1固定源码与CLI/Hook资料只能证明接口语义，不能证明用户实际安装版本或工具隔离。

823行前八列逐字段保持，原37条定向审读/326条当前UNKNOWN统计不是运行通过。36职责/315问题/83旧要求/363历史不等于要新增同量模块。

## DA-AR-01：真实独立启动、返回、同任务恢复

R2指出：init_task仅创建PLAN_REQUESTED，下一动作RUN_GPT_PLANNER；watcher并不启动外部Planner。此次必须审03#r2-ar01的实际修复：

1. prepare_admission在首次依赖产品写入前由哪些真实外层函数调用。SELF与INDEPENDENT按原标准/风险而非“出现UI”分流；重要原话被归CONTEXT、未知材料、未准入adapter不可默许SELF。
2. PROJECT_LOCAL_REVIEWER是否确实复用原项目角色；run_admission_review的有限codex exec命令、原身份/授权、完整原材料快照、工具只读边界、JSONL最终消息解析、RoleReceipt→consume_requirement_review→允许写入是否可实施。没有明确新进程/角色权限时不得运行；sandbox文件只读不等MCP无外部效果。
3. Review方案是否明确为**已有合法ChatGPT schedule**新增PLAN_REQUESTED模板分支；真正启动者是scheduler，返回原PLAN/request_admission/CURRENT，消费者是实际活跃watcher或原owner。模板存在不等schedule启用；scope、私有原文外发和branch都要核。原生adoption不能新起task/daemon、不能把换执行session的同逻辑task接管说成精确同thread恢复。
4. Control是否要求具体可运行原角色adapter，不能拿抽象类或Executor-only函数冒Verifier。CARE现行科学Planner冻结结果可在同scope复用，默认review_required=false仍有效。
5. 无合法自动角色/接收者的环境是否明确“不支持该范围无人介入继续”、允许无关合法工作、阻依赖写入/USER_READY，且只有一次自包含原角色恢复入口。人工交接必须计数，不能藏成自动闭环。

尝试坏例：只init_task；未启用schedule/错branch；Producer摘要代原文；角色输出错scope或取消后迟到；stdout丢失盲重开；只读shell同时可写MCP；简单UI文案修正无条件Review；已有效同scope科学合同仍反复审。核原活跃owner/预算/lease及恢复位置，不接受“角色会负责”。

## DA-AR-04：正常完成路径强制消费，直接写result也不能绕过

R2指出：七仓拟finalizer只是函数存在，历史任务脚本不是未来普通请求必经路。此次审03#r2-completion与04#r2-ar04：

- 唯一共享finish_delivery由正常host实际调用：原生on_stop、Lite子进程退出、Review新鲜review消费、Control终态前。不能再靠提示词让Executor“记得调用”。
- 模型省略manifest/显式finish时，host从Admission及原索引构造SubmissionManifest；已有项目必需result缺失应拒绝，不以聊天代文件。无原result合同的无Goal请求可保存Stop原话快照，但不把文字当专业观察。
- 逐仓核原result路径、caller、允许状态、独立专业输入、check_delivery在report之前、accept_submission与实际host invocation绑定。材料/科学/真实对象范围不可混。
- Review外部审查先写专业结果，原watcher消费签报告后再合法终态；不能要求review先有最终claim，也不能假称外部GPT可调用本地CLI。无watcher只保存，不自动唤醒。
- 报告/manifest的原子提交与候选/取消epoch重核不可循环；同UID来源记录不是恶意篡改防护；原生Stop能续修但不能删除已发文字。未知/禁用host不启用自动保障。
- 每仓以正常host运行坏例：Executor完全省略finish，直接写原result“已就绪”并结束/exit0，但缺当前必需专业结果；必须由host拒绝受管完成并送反馈给同task。helper单测不足。七仓未证链时均DA enabled=NO。

重点逐仓反证：Lucerna旧campaign程序绿无Reviewer同PID；Bobbio0.2 Safe冒0.3最终集成；Mica候选材料无实际loaded；SeminarArcREADY_TO_PASTE_PARENT冒实际Parent；Asteria静态常量几何冒真实图；CUHK旧snapshot或准备gate冒完成；CARE程序validator绿/少步/无聚合冒实验或科学有效。保留Bobbio用户接受、Mica正常Edge人工边界、Asteria现行一次Parent交接、CARE短任务不强加Controller且长任务依原Goal合同。

## 完整路径与连带影响

从一项普通无Goal请求重新走原要求→写前选择→真实独立核对或合法已有决定复用→成熟能力→实现→验收器准入→真实观察→失败返回→同任务返修→正常host完成检查→最终报告。深入Lucerna、SeminarArc、CARE，另四仓逐一核正式出口，不能只复述Planner示例。

仅检查本轮对已关闭机制的回归：DefinitionAdmission/四控制/候选校准不能签USER_READY；能力真实读取/调用/影响与REQ-043/065；P0在全量之前；两级交付、ReceiptLocator去环、父子短锁、共享预算、取消、等待不耗轮次、副作用未知先核不重发、科学充分负结果、da/2严格reader与原专业归属。

比较便宜替代与维护成本：共享finish为什么比七套历史脚本合理；角色真实接线为什么不能靠现有文件代替；无新的常驻服务。估算138–332小时、首片40–88、P0仍4–8，新增8–16用于两项接线，均未量测/未授权。普通SELF不应新增模型审查。实际未知可以留实施验证前提，但调用/字段/消费者/支持失败回退不能留给Codex猜。

## 回复合同与唯一下一入口

先用自然中文说明本轮改了什么、是否减少用户自己发现假完成/搬运失败的风险、真实未证和仍需人工的具体位置，再给唯一PROCEED或REVISE。分别对DA-AR-01、DA-AR-04给CLOSED/OPEN、固定源码与方案定位、真实调用链、失败恢复和用户影响。02/03/05写保留关闭或说明本轮造成的确切回归；实质新缺陷归相关原ID，不换编号制造版本。

REVISE时给同一Planner最小必要修订，并按正式角色合同**自动附自包含的下一Planner提示词**，带本次实际package/source/review身份及完整问题，不要求用户去拼GitHub内容。PROCEED仅表示实现前设计可进入后续获权准备，仍回同一Planner处理下一合法阶段；不得生成Codex Goal/Kickoff、执行批准或启动下一任务。两种结论都应报告实际读取范围、上游差异和真实运行未证，不能用文件齐全/覆盖数量/作者自评代证。

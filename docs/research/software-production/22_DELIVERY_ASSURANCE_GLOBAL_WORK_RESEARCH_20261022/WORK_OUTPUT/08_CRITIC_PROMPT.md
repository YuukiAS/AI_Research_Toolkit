# 交给独立Critic的完整审查指令

你是独立于本轮Planner的总体架构Critic。请审查Delivery Assurance是否能兑现用户真实工作承诺，不是给文档数量或旧v0.5背书。本轮是**中间总体架构审查**，只给PROCEED / REVISE；不要给Critic PASS、READY_FOR_CODEX=YES，不写可执行Codex Goal，不实施产品。

## 审查对象与访问范围

仓库：YuukiAS/AI_Research_Toolkit  
既有分支：research/software-production-decision-20261013  
提案根：docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/  
topic locator：delivery-assurance--global-architecture  
原始研究输入基线：f1426b6322870c7a9d42d83ff6ea7ad8a35837a3

开始时通过GitHub读取该分支实际HEAD，记录为proposal_commit；本轮所有WORK_OUTPUT材料统一按该commit读。不要把分支后续变化或另一个proposal拼入同一结论。先读CURRENT确认包状态。源码使用07中各仓的固定SHA；你还应核对AI_Skills_Collection最新main的角色合同是否变化，并区分本轮固定证据与新漂移。

仅做只读独立审查。本指令不授权修改任何仓库、Issue/Project或生产状态，不授权创建线程/subagent/自动化/handoff/fork，不授权安装、真实桌面/账号/设备、私有医学数据、Slurm/GPU、付费、部署或发布。必要私有/运行证据不可得就说明，不能绕路取得。最终直接返回可供Planner处理的审查意见；需要额外权限时仅指出具体最小边界。

## 先恢复用户原目标

先完整读取三份原指令，不先接受Planner的架构结论：

1. docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/01_GPT_WORK_FULL_ARCHITECTURE_PROMPT.md
2. docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/00_USER_REQUIREMENTS_AND_GAPS.md
3. docs/research/software-production/21_DELIVERY_ASSURANCE_COMPONENT_AND_QUESTION_INVENTORY_20261022.md

终极目标是用户日常只表达希望完成的功能/科研任务，系统在支持的正常入口尽可能自动保留不可降级目标、发现并保护旧功能、复用成熟实现、补齐并运行必要验收、读取真实证据、在原任务/权限/预算内返修、从实际消费对象验收并简明报告。用户不应是第一轮QA、验收程序作者、配置目录维护者、Reviewer转发员或反复说“继续”的调度者。不可推导的产品/科学决定和真实账号/设备/费用/发布权仍归用户。

普通无显式Goal的Codex会话是核心范围；不能删掉它后仍声称“一句话自动保障”。桌面、CLI、Remote、Bridge Lite/Review/Control、项目自有控制器、GPT Work边界分别核对。新组件数量与36职责/315问题/83需求/363历史登记无等量关系。

## 必读提案与规则

完整读取WORK_OUTPUT中的README、CURRENT、00写入探针、01现实与替代、02组件架构、03调用/验收器、04七仓、05 CSV及摘要、06阶段实施、07审查包。不要只看摘要或Mermaid。

读取AI_Skills_Collection最新main的AGENTS.md、docs/workflows/PLANNER_ROLE_CONTRACT.md、CRITIC_ROLE_CONTRACT.md、PLUGIN_CAPABILITY_GATE_POLICY.md、AI_SKILLS_MAINTENANCE_BOARD.md。本轮Planner固定的是f1de8e85957d32a50f4458349f450ec65add13bb，角色v1.7、Capability Gate v1.2。若有变化，明确它怎样影响审查。

07给出了Bridge正式release与实际dev、七仓有效分支、CAT-TRACE参考和历史原材料的固定直链。逐组件检查真实函数/调用者/接收者，不把同名设计函数当源码。研究中的“源码已读”不代表你已亲自审过；原图、PDF、截图和数据无法访问时不作视觉/科学实测结论。

## 你需要重新建立的架构判断

先独立比较至少三条路线：
- 仅加强项目和Bridge现有入口；
- 小型共享义务/选测/声明层接入现有执行；
- 复用成熟专业工具或有证据才采用其它编排能力。

评估原用户体验、实际触发率、消息消费/恢复、错误放行、首轮接入、日常/长期维护成本、退出、权限与跨仓一致性。不要因为Planner推荐B就默认B成立；若A足够或B新增依赖得不偿失应明确建议收缩。不要为了绝对保证新增daemon、数据库、调度器、无限Reviewer或通用总评分。

对K1–K5逐一写清：真实事故→原路径为何失败→现有哪段代码/拟新增接点→输入与来源→具体输出→谁实际读取→关键断言/原始观察→good/bad/missing/unchanged→失败归因→合法继续或停下→生命周期/成本。没有接收方的箭头必须判缺口，不能用“系统会自动”填空。

## 必须攻击的六个核心问题

**G1：普通原生入口。** Hook未安装/未信任/关闭/超时/输出错误/工具路径不覆盖时，原生完成文本与危险下游如何被阻止？官方接口、配置或缺DA PASS日志是否被误当强制能力？从无任务包普通请求直接走一遍。显式受管入口的额外动作不能偷换成原始承诺等价完成。核查Phase1整体NO_GO与局部场景成功，不继承旧GO。

**G2：遗漏的旧能力。** adapter从未登记的旧功能怎样发现？公开入口、accepted baseline、依赖闭包与未映射报警是否真实可实现，是否最终又要求用户列清单？FULL全部已知测试不能证明未知覆盖。测试删除/mandatory改optional、已提交/暂存/未暂存/生成器改动都要考虑。

**G3：验收与证据独立性。** 产品与阈值/expected/hash协调修改、固定值、产品data-*自报、旧截图、错误PID、错误OCR采集器、未运行却PASS怎样被拒绝？参考是谁冻结、谁有写权限、实际observer是否真正独立？包变异负例和same-user hash能证明的范围有多大？正确good不应被错评分器逼着改坏。

**G4：实际反馈消费者。** 从一份真实失败消息开始，找到原Executor/Review watcher/Controller/Parent读取处、ack和下一调用。没有活进程、Lite已退出、Review thread_id为空、外部Reviewer未回、用户中断、Slurm PENDING/终态分别怎样处理？同逻辑task不等同App thread；不能重置轮次、自动新后台或重复提交。正常外部等待至少两小时宽限，健康状态持续等待，不消费repair预算。

**G5：真实成品边界。** Windows安装实例/账号、隔离Zotero、Android模拟器与物理设备、Mica实际加载与登录态、Asteria完整读图/固定URL、CUHKWeb/API/票据、CARE真实机制/规模/恢复/科学结论分别需要什么。不要把fixture、历史报告、路径存在、退出码、CI绿灯或源码阅读升格。必要人类权限可保留，普通产品缺陷不能丢给用户首轮测。

**G6：接口冻结。** 对照旧da/1 required fields、owner、identity/freshness、adapter单调性、scope、claim、failure-routing语义。03 schema_version:1只是示例，不是批准的wire。旧freeze规定语义变化回Planner/Critic。本设计有哪些兼容/替代决定必须先冻结，真实consumer是否已枚举？不能让Executor随手选新版本或沿用旧PROCEED。

凡会改变架构选择的未知保留设计未闭合。可以指定最小证伪试点，但不能写“实施阶段补上即可”后批准整体。若建议削减原始核心范围，明确它是需要用户接受的新scope，不当原目标PROCEED。

## 七仓审查与三条深链

按04依次检查Lucerna、SeminarArc、CARE的深度故事是否真的从初始请求→目标/旧保护→程序缺口→实际runner→错误→原接收者→修复/复测→真实最终对象→报告→维护/退出；补齐Bobbio、Mica、Asteria、CUHK各完整关键链。

特别核对：
- Lucerna动态quota/unknown语义和同EXE/PID；Mathpix680仅对抗样例，不是本轮已确认当前bug。
- Bobbio main0.2与develop0.3权威、真实data-dir隔离、API写授权、最终原生里程碑。
- Mica有效rebuild分支、source/dist/实际loaded、A/B/C与process/heap分开、功能关闭不能算收益、最终登录态手动边界。
- SeminarArc强停重启读回、OCR历史假阴性、SkipDynamicProbe不等PASS，物理硬件独立。
- Asteria真实几何与科学语义；static crossing/floating常0而browser floating实际测量，不能笼统误报；旧视觉坏例必须拒绝。
- CUHK同密码visible path、claim/lease/auth/finalize、预演与final分离；换部署snapshot须结束旧Parent并按权限新活动，不能滥用“同任务”。
- CARE正式入口消费机制、充分步数/数据/真实预测、连续与恢复训练对照、终态重聚合；validator PASS不等科学成功，充分负结果允许STOP回Planner。历史科学合同不是本轮GPU授权。

## 全量核对与独立反向抽查

检查823唯一记录与输入总数：36职责、216公共问、63七仓问、36反例、363历史、83旧要求、26能力族。315问应有独立答案定位，CSV的PROJECT/FAMILY/ANSWER/INPUT/WORK外键必须可解析。83含旧助手归纳，不冒充全部用户逐字批准；326历史当前UNKNOWN不应被改写为“已覆盖”。37关联原材料抽查不等37事故重演或统计检出率。

先从原363索引自行选择案例，暂不看Planner的对应覆盖结论，重建：
原故障/当前性→普通入口→标准/保护→实际程序/观察→断言→失败接收→合法恢复→可签/禁止claim→成本/关闭。
至少包含历史已修、observer误判、评分器源码缺陷、科学负结果，并另选一个Planner未准备的普通功能请求。然后与CSV联结结果比对。不能把抽样局部通过称363全部验证。

## 实施、成本与权限审查

06应按workflow-core、Bridge、专业owner、七仓adapter、发行维护分包；检查基线/具体函数/依赖/冻结决定/作用范围/正坏旧缺控制/同候选/预算/回退/正式安装/actual loaded/消费者适配是否清楚。不能存在七仓巨型Goal或把架构选择交给Executor。

核查净收益试验A/B是否同专业标准与最终对象；用户提醒、错误放行、误判返工、模型/机器/设备/GPU、人力和维护成本是否全部计入。工程候选性能护栏不是已批准产品阈值；小样本不能宣传可靠率。收益不成立是否能退回A并保留专业回归。维护板只沿原四状态，不能新造控制台或状态机。

权限与原任务完成语义不能降低：文档里的Allowed Actions、旧科学合同、旧release记录都不是当前用户可见授权。若新任务/设备/账号/费用/部署等必要效果缺批准，明确指出而不执行。

## 研究本身的诚实性

检查00/07记录的首轮顺序偏差：实际写入回读先于研究，但工具schema发现先行，权限与基线后补；不得说严格逐步顺序完全合规。检查逐阶段GitHub提交/CURRENT/readback记录、CSV大文件回读限制及修复。没有执行的产品场景不得写成实测；没有私有图/数据不得说已视觉检查。文档完整度与设计闭合分别评价。

## 返回格式

首先用连续自然中文解释你认为方案怎样改变用户实际使用结果，最关键的不成立之处是什么，有无更简单替代。然后给：

- `ARCHITECTURE_REVIEW = PROCEED | REVISE`
- `ARCHITECTURE_CLOSED = YES | NO`
- `READY_FOR_CODEX = NO`（本轮不是execution-ready）
- `proposal_commit = <实际审查的SHA>`
- `evidence_access_limits = <实际未访问范围>`

发现列表按严重性排序，每项含：来源/固定源码行、普通触发场景、断言或缺失箭头、用户后果、最小修订/补证、负责owner、是否改变架构/范围/权限。已满足之处简述证据，不重复全部提案。区分架构阻塞、授权边界、运行未证与可选改进；不要自创无关新要求。

最后给Planner可在同研究目录执行的最小修订清单，以及哪些证据到位后才能重新审查。不要代Planner生产实现，不发Goal，不替用户批准缩范围或发布。

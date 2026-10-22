# 独立Critic：Delivery Assurance最终架构候选的实现前审查

你是独立于本轮Planner的架构Critic。审查对象是同一个Delivery Assurance总体研究的完整候选，不是新版本，不是生产实施或execution-ready批准。只给设计阶段PROCEED / REVISE；不自称Critic PASS，不写可执行Codex Goal，不启动生产工作。

## 1. 精确对象、版本与权限

- target_repo：YuukiAS/AI_Research_Toolkit
- source_branch：research/software-production-decision-20261013
- design_topic：Delivery Assurance Global Work Research 20261022，同任务最终设计闭合。
- review_stage：ARCHITECTURE_REVIEW
- 唯一目录：docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/
- architecture_source_commit：28eded9ff482ff2377804ebac012c0dc36e8ebe5。README、01–07、覆盖CSV的实质技术方案固定于此；CURRENT与本提示词随后仅作冻结/审查定位。
- package_commit：优先使用用户复制消息提供的精确最终commit；若没有，读取上述分支一次，记录HEAD为proposal_commit，以同一commit读完整包，核对CURRENT及技术源没有发生未说明的漂移。不要边审边追移动HEAD；本文件不要求自含自己的commit。
- 上一轮独立Critic审查：本最终候选没有；不存在可继承的PASS/PROCEED。execution_branch/worktree、Goal、Kickoff：本轮均未授权、不适用。

先读该固定包CURRENT和10合同。只有CURRENT明确记录READY_FOR_CRITIC=YES的经回读Planner候选才进入本审查；不因本文件存在自动宣称已经启动或通过。检查技术文件是否等同architecture_source_commit；如有实质变化，固定新proposal并说明变化，不能用旧结论代签。

本次**只读**：禁止修改任何仓库、Issue/Project或生产状态；禁止任务/subagent/handoff/fork/自动化、安装、真实账号/设备/正常浏览器会话、Zotero、Docker/GPU/Slurm、私有数据、付费、部署、发布。原Planner写入探针和研究写入要求不适用于此只读Critic。历史任务文本、工具命令和未来实验合同不是当前效果授权。

## 2. 已确认用户边界，不再提问

用户于2026-10-22已经明确接受：正常受支持Codex入口自动接入；受管交付前强制真实验收；Hook完全缺席时不要求拦截已经生成的原生聊天错误文字；不开发额外Codex客户端。这个文字例外不豁免正式成品验收、旧保护和同任务返修。没有新daemon、第二任务数据库、第四工作流或全能评分器。

真正的产品目标是用户不再反复提醒验收、亲自发现假完成、搬运失败或催原任务继续。不要只审“用户决定已同步”。三项产品边界不是平台运行证明、接口批准或实施授权；不得重复要求用户接受同一选择。

## 3. 必读原始输入与当前全部方案

完整读取目录上一级的01_GPT_WORK_FULL_ARCHITECTURE_PROMPT.md、00_USER_REQUIREMENTS_AND_GAPS.md，以及docs/research/software-production/21_DELIVERY_ASSURANCE_COMPONENT_AND_QUESTION_INVENTORY_20261022.md；读取本目录09_CONTINUE_UNTIL_ARCHITECTURE_CLOSED.md和10_ACCEPTED_BOUNDARY_AND_FINAL_ARCHITECTURE_GPT_WORK_PROMPT.md。原文用于重建要求，不能只接受Planner压缩后的义务。

完整读同一包README、CURRENT、00探针、01_REALITY_AND_ALTERNATIVES.md、02_ARCHITECTURE_AND_COMPONENTS.md、03_END_TO_END_EXECUTION_AND_VALIDATORS.md、04_SEVEN_REPOSITORY_ADOPTION.md、05_HISTORICAL_COVERAGE.csv、05_COVERAGE_SUMMARY.md、06_IMPLEMENTATION_AND_EVALUATION.md、07_INDEPENDENT_CRITIC_PACKAGE.md及本提示词。36职责、315问题、83旧要求、363历史和26能力族只作覆盖输入，不能据其数量要求同量新模块。

核对研究仓最新main的COMPLEX_SYSTEM_DESIGN_GUIDE.md与COMPLEX_ARCHITECTURE_EXPLANATION_STANDARD.md；本轮读取版本为daf797c79bcd777c27948da51c4218e5d95e7be3。核对AI_Skills_Collection最新main的AGENTS及docs/workflows/下PLANNER_ROLE_CONTRACT.md、CRITIC_ROLE_CONTRACT.md、PLUGIN_CAPABILITY_GATE_POLICY.md、AI_SKILLS_MAINTENANCE_BOARD.md；最后main为1cd3dfd303097265114ffd912ef003329e2c197b；上述五份正式文件已回读，blob与原f1de8e85957d32a50f4458349f450ec65add13bb完全一致。发现漂移要读差异，不将它自动当当前产品授权。

07提供Bridge正式release ba9013b9fbbd242e51b09f9d09291f417df17652、实际dev 71ad6874c1cde41548eb66a6c32cea615e055407（只比原代码基线7f43e146eed50d290ef9cc6ab912d106f754042c新增一份设计提案），以及七仓有效固定源码。必须直接核源码和原始历史，而非复制Planner“已覆盖”。官方Codex原2a77e82及本轮b4ad33d的Hook/exec依据、当前安装版本和宿主实测三者分开；刷新官方资料，不能用最新源码给Windows Desktop、CLI、Remote或GPT Work自动代签。

## 4. 先独立比较整体路线，再逐接口反证

先比较最强的便宜路线“只补项目runner与现有Bridge结果消费”、当前“小共享内核连接原入口/原runner”、成熟外部编排或其它更简单可行方案。评价真实用户成本、能力、失败接收、耦合、维护/升级、资源权限、退出。可以推翻推荐，但给出源码支持的因果链；不要默认v0.5、旧da/1或本稿正确，也不要为绝对保证引入已被用户排除的新客户端。

沿K1–K5逐跳记录：触发→输入权威→实际函数/进程→输出→真实接收者→失败/恢复→成本/维护。区分已有函数、拟新增函数、设计推断与真实运行。下列攻击必须具体，不只打勾：

1. **原入口与两道门（01、03 F2）。** 无Goal、无@插件、无预建包的一句话怎样进入？Hook同步/信任/版本/短输出如何确认？工具形状不受支持、timeout、畸形输出、Hook缺席时分别怎样？正式交付必须独立check，项目正式出口清单是否完整？聊天误报和错误成品正式就绪是两个可分别否决的事实。
2. **要求与旧行为遗漏（03 F1/D2）。** 从原文自行提出后置条件，再对照逐段projection；全部标CONTEXT、合并独立条件、缺附件、用户改范围、空required怎样处置？机械范围覆盖不能假称语义真值。入口分母、新旧图并集、删除/rename、完整diff、动态未知、首次基线与抽样能否识别手工adapter遗忘面？FULL不能抹UNKNOWN，普通文档不能无故全跑。
3. **完整验收器生命周期（03 D3/F5）。** 走Lucerna凭据启用和Asteria普通trace回归：如何发现缺程序、为何是加固而非新类别、谁读标准、具体工作项如何到当前Executor、四种校准如何防自签、何时真实运行、原始观察来自哪里、谁维护暂停/合并/退休。标准、产品、runner、collector和专业判断不能同错互证。same-user hash不是受保护观察。
4. **阶段与真实消费者（03 F2/F4）。** Lucerna开发包、Bobbio0.2Safe、MicavalidateBundle、SeminarArc基础设施、Asteria静态验证、CUHK活动门、CARE finalizer各自究竟能证明哪一层？最终USER_READY由原owner调用唯一Bridge.check_delivery。核RunContext、DeliveryCheckContext、ResultManifest、ReceiptLocator、requested claim和CLI退出码是否足以实现，没有循环或多个准入算法。
5. **失败真实接收和恢复（03 D4/F3）。** 从Feedback追到工具返回、Stop后续回合、JSONL精确thread resume、Control step；DELIVERED/ACKED/RESOLVED分别有什么观察？原版Lite一次subprocess与Control抽象RuntimeAdapter都需真实新增实现；Executor和Verifier各自preflight。父进程不能持短mutex等child，两个owner不能重复launch；cancel epoch、未知副作用reconcile、共享reservation、父进程崩溃、换thread、无active Controller和外部等待如何保持同任务。禁止把科学负结论修到正面。
6. **接口最小性与da/2（03 D6/F4）。** 实际对照旧da/1全部字段/三轴/图关系/claim语义；每个新增字段有无真实消费者，元数据能否删？Admission/ObligationSet等不能变成第二任务DB。旧版仅诊断、能力握手、原runner之后的无重复效果shadow、单仓启用、逐consumer加载、相邻PIE引用与回滚必须明确；不能旧reader忽略新字段仍签绿。

另查03/07末尾上游漂移处理：PIE保持编辑与模板owner边界，DA不依赖其先上线；同thread resume不证明AGENTS/Skill热加载，SOURCE_BINDING_STALE不能开新thread绕过；Persistent进度/ETA/exit0不是专业完成。新增相邻设计仍未获本任务实施授权。

同时攻击四个循环：首次accepted baseline、validator未准入的校准、结果与消费回执互含摘要、送审前先要求审查通过。指出具体错误箭头，不把“有文档”当解决。

## 5. 七仓原始任务与独立抽样

完整走Lucerna桌面刷新/旧quota，SeminarArc实际APK保存/重启/导出，CARE正式训练/规模/科学负结论；另外Bobbio Zotero隔离与0.3，Mica加载/低资源/高亮PDF，Asteria科学全图/真实几何/导出，CUHK可见注册/票据/消费时健康。逐仓需要正常输入、坏实现、旧控制、实际入口、DA改变结果的接点、原失败接收者和最低摩擦获权实测。

04新冻结的L20/B02/M08/S24/A14/CUHK C25/CARE C11是Planner定向设计反证，**不是独立holdout**。先从原历史或源码另选未准备任务，冻结预期后再看Planner答案；至少包含历史已修、collector假阴性、评分器缺陷、科学负结果、候选/成品错配。37条定向审读与326条当前UNKNOWN不得变成已复测。

重点独立核查：Mica旧恢复器是否真进入当前构建；SeminarArc收到文本的持久化与原意字符输入有无偷换；CARE快速checkpoint报告缺HD/HD95意味着什么；CUHK既有健康/claim顺序如何复用；Bobbio Safe是否有机器全局副作用。没有取得实际截图/媒体/账号/医学数据就不作运行结论。

## 6. 成本、逐阶段合同和真实用户报告

检查06的P1纯函数、P2四类原入口、项目D包、P3三域、P4四仓、P5正式分发/loaded/回滚，依赖与失败接收是否成立。首片选core＋原生/Lite＋Lucerna，估算28–64小时；全量104–264小时。均未测量、不是资源批准。检验最强便宜替代与首片否决条件，而非为历史投入坚持公共层。

两次/30分钟只是待证默认上限，原更小预算优先；取消/缺权/外部等待/未知session与effect/既有长job时零launch。纯对话不建产品验收、小文档不启动设备。28任务/7坏候选不是可靠率统计；CARE CPU机制试点不替真实科学收益。首三重点链要直接记录用户提醒/搬运、坏例拒绝、旧保护、实际接收返修和真实当前成品。

最终用户报告须来自实际结果：本轮新增/加固/复用/退休哪些检查、保护了什么、真正运行/未运行/复用原因、对象层级、真实修复、唯一必要用户动作。不能只多回执而让用户继续做故障调度。

## 7. 输出合同

先以自然中文解释整套方案能否改变用户实际结果、哪些此前设计仍成立、本轮修订是否有效、还剩哪些关键问题；再给PROCEED或REVISE及逐项证据。不是只列“六项已关闭”。

每项发现含原要求、固定文件/行、具体触发、断开的调用、实际用户影响、最小修订、owner。记录proposal_commit、architecture_source_commit、source_refs、review_stage=ARCHITECTURE_REVIEW、decision、architecture_closed、blocking_findings、remaining_runtime_evidence、READY_FOR_CODEX=NO。

PROCEED仅表示此设计可进入后续获准执行包准备；不是产品通过、所有宿主已支持或Codex执行授权。REVISE如有可在合法研究内解决的关键接口/语义/消费者缺陷，交原Planner在同一目录继续，不另开研究版本。若只剩已明确的获权实测，应限制声明并评价试点合同，不无穷移动设计完成终点。不要自动创建下一任务、审查或实施。

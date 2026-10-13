# 研工台 v0.1：独立架构 Critic 审查包

> 审查状态：**尚未送达独立 Critic；未获得 PASS/REVISE**。
> 对象：本研究分支中的 00、01、02、03 四份文件组成的同一版本设计。任何文件发生实质修改，重新绑定被审候选提交。
> 作用域：只评架构与有界试点设计；不审已经实现的程序，不批准产品发布、生产环境测试、凭据、费用或外部副作用。

## 1. 评审对象

仓库：YuukiAS/AI_Research_Toolkit
分支：research/software-production-decision-20261013
文件：
- docs/research/software-production/00_ARCHITECTURE_DECISION_V0_1.md
- docs/research/software-production/01_EXECUTION_AND_TRUST_CONTRACT_V0_1.md
- docs/research/software-production/02_FALSIFICATION_AND_ACCEPTANCE_PLAN_V0_1.md
- docs/research/software-production/03_INDEPENDENT_CRITIC_PACKAGE_V0_1.md

这只是用户暂时允许的研究材料位置。不得把研究分支合并到 main；不得未经用户决定将未来研工台的产品代码归属于 AI_Research_Toolkit。独立审查必须读取四份文件原文与相关目标仓库现状；不能依据本文件的摘要自证。

## 2. 此次独立 Critic 应先确认的真实来源

首次新审查轮次必须实际读取：
- YuukiAS/AI_Skills_Collection 最新 main 下的 PLANNER_ROLE_CONTRACT.md、CRITIC_ROLE_CONTRACT.md、PLUGIN_CAPABILITY_GATE_POLICY.md、AI_SKILLS_MAINTENANCE_BOARD.md；
- YuukiAS/GPT_Codex_AI_Bridge_Kit 当前 AGENTS.md、README.md、涉及工作树/执行权限/持久任务和被否决第四模式的规范；
- YuukiAS/Lucerna 当前 AGENTS、prompts/AGENT_RULES、execution governance、失败史、实际 package.json、development-acceptance 与 governance-regression 的退出/副作用机制、安装器 NSIS hooks；
- YuukiAS/VibeResearch 的真实 adapter_schema、kernel、reliability、daemon、codex_adapter、next_action 和正常测试/入口；不得假设 README 文字等于其实际适配能力；
- YuukiAS/Mica-for-ChatGPT 当前真实宿主登录/开发入口权限与已批准产品合同；
- YuukiAS/Asteria/真实浏览器验收与独立视觉事实；必要时 SeminarArc 安卓脚本及 Bobbio 的 develop 原生/Zotero 约束；
- 当前 GitHub 账户对私有库真正拥有的保护、签名/发布/环境审批权限，以及相应官方文档；
- 成熟替代：GitHub Spec Kit 的轻量流程、现有 Codex/Bridge、OpenHands 或现成长期执行系统；至少选择一个对首选路线有威胁的替代进行独立核查。

有关中央 AI_Skills 的维护看板、Plugin Capability Gate，只有真正准备改变该仓库/插件行为时才进入相应跟踪和发布准入。研究阶段不得因为提及该仓库就虚构 Project Status 已同步。

## 3. 要求独立审查的核心判断

不是让 Critic 检查文字好不好看。必须尝试推翻以下假设：

**A. 正在解决正确问题吗？** 只做末端验收不能阻止需求方向错误、低配实施和无限返修；提出完整系统是否又造成不必要的新状态/审批？

**B. 是否复用了已经存在的能力？** Bridge 的授权和工作树、VibeResearch 的文件状态与预算、Spec Kit 的轻量任务、已有项目脚本是否足够？新增协调程序的最小不可替代功能是什么？如果发现没有真实缺口，应提出“不新建程序”的替代方案。

**C. 常规开发入口是否真实可接？** 普通用户一句“继续当前任务”究竟由谁解析并实际调用哪个安装的 Codex/Bridge？没有活动执行主机时是否假称后台运行？项目的分支策略（如 Bobbio develop）是否会被中央强制改变？

**D. 权限分离是否实在？** 同一管理员身份可能改验收器、同名 GitHub 检查或发布凭据。审计型与强制型必须分开；不能把文件存在/工作流两作业/不同模型角色当成安全隔离。官方 GitHub 拉取请求安全边界、私有账号能力限制与实际配置必须审。

**E. 产品实现与独立验收是否都有真实能力？** 阶段前/阶段中是否能发现只做 UI、硬编码、静默退路和设计方向错误？最终独立验收是否直接从正常入口操作真软件？项目脚本是否只比对源码字符串或文件数量？实际控制器是否从结果里解析缺口，而不只是 exit 0？

**F. 平台适配是否真正轻量且可维护？** 同一 candidate/claim/evidence/review/promotion 核心能否被 Windows、浏览器扩展、网页、Android 消费，而不要求抹掉平台原有安全边界？哪些平台只能有限人工最终验收，不能被写成完全自动？

**G. 失败与恢复是否实际安全？** 本机/远端进程丢失、已发安装/发布但回执丢失、重复尝试、相同失败换新 SHA、并发抢同一资源如何处理？有没有把 GitHub 状态文件当作真实进程/系统状态？有没有循环更新待办、不断刷新或重复调用 GPT Work 的失控路径？

**H. 评审标准是否合理？** 02 的负例是否仅靠测试特判拒绝；正例是否被过重门槛拒绝；样本不再新鲜如何标记；改变评分器是否错误提升产品结论；真环境缺失时能否报告局部结果？

**I. 该如何最快为 Lucerna 创造真实成果，同时保证不是 Windows 专用系统？** 第一阶段的最小正确交付是什么，哪些安全测试只能在另行授权后执行？同时如何选择跨平台第二消费者防止过拟合？Lucerna 的实际已有修复有没有被错误当作必做重写？

**J. 什么证据才能证明值得继续？** P0 是审架构，不是软件 PASS。P1/P2/P3 的完成条件能否实际取得，反证失败时是否有缩小/放弃路线？新增的模型、VM、任务管理开销是否符合个人维护多项目的经济性？

## 4. 审查时优先使用的反例

- 让候选代码与候选测试一起删旧功能：从冻结的独立行为基线是否仍能检测，还是会误以为只需当前候选的测试？
- 让当前 GitHub 工作流执行不可信构建，随后高权限发布：是否存在危险 artifact/cache/workflow_run/pull_request_target 路径？
- 让 Lucerna 的治理测试返回 0 但报告重要 GAP：外部系统是否错误晋升为原生可信通过？
- 让两个开发代理使用同一 GitHub 管理身份和同一 Windows 工作空间：是否仍声称执行、验证、发布独立？
- 让一个页面在机械结构检查全绿的情况下整体难用：真实独立 Reviewer 的材料/权限是否存在？候选身份是否精确？
- 让开发会话终止、安装动作回执丢失：是否再次调用，造成重复安装和用户桌面打扰？
- 让小型文案更改进入完整 Planner/Critic、VM 与 GPT Work：能否避免把正常任务拖入重流程？
- 让一个新的 Android 或扩展项目接入：是否需要复制“第二套研工台”？

每项阻塞结论应包含对应要求、直接证据、因果后果和最小关闭条件；不要因为风险感觉而无限增加任务。证据充足应作 PASS，不能反复移动终点。

## 5. 独立 Critic 的结果格式

以自然中文先说明首要结论，然后提供结构化结果：

~~~text
REVIEW_OBJECT=<repo + branch + exact commit SHA + doc versions>
CRITIC_VERDICT=PASS | REVISE
BLOCKING_FINDINGS=<count>
ALLOWED_NEXT_STEP=READ_ONLY_REVISION | LIMITED_PILOT_PROPOSAL | NONE
PRODUCTION_IMPLEMENTATION_AUTHORIZED=NO
~~~

每项阻塞项（若有）：
- 编号及严重性；
- 引用具体文档位置和当前源码/运行证据；
- 会使正常用户任务怎样失败；
- 最小修订/补证标准；
- 最适合由哪个角色关闭，能否并入现有任务。

Critic PASS 仅对 **v0.1 架构和受限试点准备** 生效，绝不意味着用户已经授权安装虚拟机、操作原生程序、修改产品、创建正式新仓库、增加付费模型或发布。若范围实质变化必须重新审。

## 6. 审查之后应该产生什么实际东西

Critic 如有阻塞项，由 Planner 在**同一研究分支**修订完整新版本，不再重复写长篇聊天总结，也不以添规则取代代码/接口设计。

若审查可以 PASS，下一轮在取得用户批准的明确范围后，才形成**第一项可执行的真实试点任务**，并先针对不涉及用户桌面/生产数据的隔离能力提供探针和安全证明。首个程序性成果必须能实际拒绝错误候选并正确接纳受测正例。随后通过一个非 Windows 软件任务验证抽象真正通用；通过以前不得提升为“可长期统一推广”。

最终独立 Reviewer 还要直接读取 P1/P2 的运行结果与真实用户产物；设计 Critic PASS 不能代替产品运行结果或最终发布验收。

## 7. 需要单独核实而不能预先宣称的实际资源

- 用户 Windows 是否有安全可用的 VM、测试系统、交互桌面和 Windows 许可；
- 当前安装的 Codex/Bridge 版本、身份及真实可调用能力；
- GitHub 个人账号私有仓库保护/发布凭据与写权限分离条件；
- 独立 Reviewer 能否直接读取完整原生/网页/扩展材料；
- 是否存在可用、持续在线且有合法授权的自动执行者；
- 相关项目是否已经有活动任务、冻结 Goal 和足够的已接受功能基线；
- 现有 VibeResearch 的 adapter/运行状态是否可以选择性复用，而不带入科研实验专属语义。

事实未核实的项在结果中应标为 OPEN 或能力缺口，不得填写 PASS，也不能为了方便假设其存在。

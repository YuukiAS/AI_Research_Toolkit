# 研工台v0.8：三位审查全问题返修后的新独立架构Critic R2完整合同

你现在是**与原Planner不同的全新独立架构Critic**，负责判断“跨复杂软件、网页、深度学习、统计和科研产物的可信交付机制”是否应该存在，以及v0.8的设计能否充分回应过去三个独立审查。**你可以直接REJECT新路线，不得假定它必须以REVISE继续修补。** 本任务只读研究，不实施程序、不改权限、不运行付费/Slurm/真实用户GUI实验、不写正式产品代码。

目标仓库：YuukiAS/AI_Research_Toolkit

目标分支：research/software-production-decision-20261013

**正式被审方案冻结提交：e0b98d327231407054074f3450e364b730b7cbe3**。本提示词于其后单独入库，是审查说明而非改变方案对象。若当前分支继续前进，必须仍对冻结版本的所有Plan、接口和CSV作裁决；任何语义新增/修改另有明确新版本才可审。

当前研究目录：docs/research/software-production/11_THREE_CRITIC_RECONCILIATION_V0_8/

## 一、先判断要做这件事有没有价值，不预设方案正确

用户核心目标：**一次交办复杂产品/科研任务，在已有合法资源和权限内持续产出真正成熟的成果，尽量不再由用户/GPT Work第一轮发现大量已知P1、假数据、模型降级、虚假验收、错误视觉/自然语言、无限重试和反复操作用户桌面。** 普通小修不应该承受高风险工作流程的全部成本。要能覆盖六个软件仓库加CARE医学模型/科研项目，并允许每个项目用自己的正确专业方法。

先独立判断：这个目标是否需要跨仓的共享保证接口？只修原项目真实脚本和Bridge已有Reviewed/Control/AI Skills是不是更有用？v0.8“原Owner＋短命assure”会不会又是一套不落地的文字机制或新的低配CLI？若实质上不能改善真实用户第一次体验，**即使文档完善，也应REJECT**。

## 二、首次强制读取现行角色、权限和源文件

根据AI Research Stack当前规则，首次开始本审查必须从GitHub真正读取最新版：
1. YuukiAS/AI_Skills_Collection main：
   - docs/workflows/PLANNER_ROLE_CONTRACT.md
   - docs/workflows/CRITIC_ROLE_CONTRACT.md
   - docs/workflows/PLUGIN_CAPABILITY_GATE_POLICY.md
   - docs/workflows/AI_SKILLS_MAINTENANCE_BOARD.md
2. YuukiAS/GPT_Codex_AI_Bridge_Kit main：
   - AGENTS.md
   - docs/CARE_AGENT_FLOW_V3_POSTMORTEM_20260811.md
   - docs/V0_5_REVIEWED_HANDOFF_IMPLEMENTATION_SPEC.md
   - docs/V0_4_AGENT_FLOW_IMPLEMENTATION_SPEC.md
   - 真正源码ai_bridge_kit/reviewed_handoff.py、reviewed_runner.py、agent_flow.py及与授权/Host有关的实现。
3. YuukiAS/AI_Research_Toolkit上述冻结提交下的**完整11个正文/CSV及本轮GPT-5.5原文**：
   - 00_PLAN_AND_ARCHITECTURE_V0_8.md
   - 01_EXECUTABLE_KERNEL_AND_PLAN.md
   - 02_TRUSTED_EVIDENCE_AND_IDENTITY_CONTRACT.md
   - 03_REVIEWER_AND_VALIDATOR_ADMISSION.md
   - 04_SEVEN_REPOSITORY_ADOPTION_MATRIX.md
   - 05_MATURE_COMPONENT_ADOPTION_DECISIONS.md
   - 06_PDF_AND_COMMIT_IDENTITY.md
   - 07_COVERAGE_METHODOLOGY_AND_LIMITS.md
   - 08_FULL_CASE_COVERAGE_MATRIX.csv（须实际解析全部363数据行，不能只读前几行）
   - 09_THREE_CRITIC_BLOCKER_DISPOSITION.md
   - 10_REVIEW_MANIFEST.md
   - reviews/GPT55_R1_ORIGINAL_USER_UPLOAD.md（用户实际上传215行全本）
   - README.md。
4. 原v0.6冻结提案dcc8b073c84174ede5c277776fdc31c01a9b943e四卷、BUILD_REPORT、typeset/input_manifest，旧v0.7根本转向依据及全部源事故账本。
5. 六软件七目标仓库各自真正当前分支的AGENTS、正常调用脚本、重要产品/科学源、历史失败/修复证据；不能假设都在main，也不能凭历史配置假设当前Host真正安装Bridge。
6. 历史另两位Critic原始材料：用户此前上传v4.zip中的v4/gpt5.6.md（REJECT）、v4/gpt6/independent_architecture_review_R1.md与其decision、claim_review（同一次GPT-6 REVISE）。如你新线程无法访问原zip，先检查Project文件/本对话附件或请求取得真正来源，不得仅凭Planner的09摘要冒充亲读。GPT-5.5现在已有独立完整原文在GitHub，不可再以旧空zip作为借口说第三位不存在。

## 三、允许且必须实质比较的架构路线

至少独立比较：
- A. 完全不建新保证内核，只修七仓本地正式脚本、Bridge、AI Skills真实调用与受保护CI；
- B. v0.8有五个短命assure命令、但无额外状态/审查/重试权；
- C. 最窄地改Bridge已有Executor/Verifier与AI Skills正常Skill派发，而不发行独立新CLI；
- D. 为确实缺持续运行的Lite任务选择成熟Spec Kit或另一真实多步执行器，但不能与已安装Bridge双控制；
- E. 你能举证更成熟或更轻的替代，如仅正规CI/领域测试/专业审查组合。

比较启动入口、实际Owner、写权限、角色数、七仓配置与脚本增量、失败恢复、证据可信程度、用户介入、付费/GUI/GPU资源、面对正确候选的误拒和长期维护。不能把“任何程序都会有bug”当反对可行设计的空理由，也不能认为“名为薄核”就不会膨胀。

## 四、逐项核对三位Critic的全部21个已知阻塞

**GPT-5.5 B1–B7**：必须在其原始审查逐字对照，逐项判断01至08是否实质提供了：
- B1：最小可执行内核是否真的有输入/输出/调用/失败/权限/Bridge模式连接，而非又变一个没人调用的文档；
- B2：桌面/网页/科研模型三类真实证据、候选身份、观察者权限与后置结果是否可信，有无自造哈希假PASS；
- B3：Reviewer资格/退役的真实检测力、召回、误拒、弃权与领域准入，STAT5060 50页中漏8/10的问题能否被机制发现；
- B4：七仓小修、新功能、高风险任务的实际适配是否轻量，现有脚本重用足够吗；
- B5：GitHub保护环境/受保护结果来源、Playwright真实trace、MLflow模型身份、原生脚本、Bridge/Spec Kit等成熟替代是否比较真实；
- B6：c9d651...→dcc8b073...的准确版本身份及旧PDF为何排除v0.8架构PASS；如果还影响科学或审查对象，应解释；
- B7：363行完整CSV是否真实从来源逐行生成、分类与currentity有无造假、未覆盖原因是否明确、是否凭条目数伪称“全部事故已被解决”。

**GPT-5.6 REJECT的12项**：P0-ARCH-01、P0-ARCH-02、P0-TRUST-03、P0-SCOPE-04；P1-ADAPT-05、P1-RULE-06、P1-REVIEW-07、P1-RUN-08、P1-PERM-09、P1-ART-10；P2-EVID-11、P2-COMP-12。尤其要判断v0.8“短命assure”若真正决定是否能进入下一阶段，是不是从实际权限/状态上重生第二控制面；如果它只是给出结果，谁真正保证不会被Executor绕过？用户的一次交办自动化是否因此丧失？这两方面缺任一核心都可判REJECT。

**GPT-6 REVISE两项**：R1-P1-01 Reviewed合法状态和最多两轮中谁真的运行“早期检查”，绝不能在EXECUTING记新的正式独立review；R1-P1-02 只读Codex继承写MCP及Bobbio PreflightOnly内部Apply、Lucerna ShowWindow/SetForegroundWindow等实际副作用，能否在首个动作**之前**限制完整调用链，而非事后检查污染。

**逐项报告**原编号、原始引用、v0.8精确文件/段落、你读到的最新实码、是否阻塞、最小复核/闭合条件。该审查必须处理原REJECT与GPT-5.5最小内核之间的设计冲突，不能简单“7+12+2都写了回应所以通过”。

## 五、逐产品、逐模型真实反证（必须独立查源，不只听Planner）

对六软件246主登记、晚期25及CARE40+52，至少对CSV **全部363行完成结构与状态覆盖检查**：原编号/项目/来源行、历史已修 vs 当前源码观察 vs 风险边界、根因候选、既有脚本、当前缺少的正式真实观察、同一事故跨版本复发及合并根因。同类缺陷可合并专业审查，不要写363份新测试；但如有明确历史严重错误未被任何新正式入口覆盖，不能给全覆盖PASS。

必须特别攻击：
1. **Lucerna**：01055/01056实际假数据、状态父子不一、Longleaf/Vault/R2未配置与真实健康、凭据清理、取消/关闭/重开、不同隐藏路径；既有capture/development-acceptance脚本的现存同进程身份与Win桌面副作用；另外NotificationGate可能先记已通知再调用show、服务暂缺被误判为恢复。应讲清主Codex、可选子代理、原Bridge/Win owner与GPT Work分工。
2. **Bobbio**：名义隔离的Zotero profile/dataDir与真实用户库、URL处理器、更新缓存，PreflightOnly的Apply，Figma真实读取和Reader整屏；成本不可被Lucerna Windows脚本复制。
3. **Mica**：真实ChatGPT已登录宿主和DOM夹具、默认关闭功能换安全、长对话与低内存、扩展实际包与PDF文字选择、已有验收器真假能力区分。
4. **SeminarArc**：真APK/Room/录音OCR/导出、安卓设备与系统选择器假阴性、golden是否受保护、压力次数与真实体验的语义。
5. **Asteria**：实际SVG/DOM坐标、蠕动长箭头、公式/阅读、恒零交叉指标和RC多轮机器全绿后的真实丑图。必须同时测错误检测及正确图不误拒。
6. **CUHK Date**：可见注册表单422而预检偷用API、合成账号/一次性票据与托管隐私、两种中文自然、Quick CI跳过真检查、用户产品完整语义。
7. **CARE**：B6阶段接续权重/真正loader/索引伪Dice、M8/M9的固定memory与loss别名、PRISM深尺度计算但不进最终路径、DG FP梯度反向、MMRD滑窗/空间逆变换和模型plans、ASE训练阶段/无T2归约/旧Verifier新增无依据阈值、MyoWall/QIF合法科研NO_GO。对各类**真正可能便宜发现**的错误说明怎样由现有项目脚本防止正式长训，正确科学负结果仍能合法结题。

非充分证据不可隐藏：某些CARE M0–M7/MLoRA/FSCF私有历史仍未恢复，不得据此判断当前全部历史已穷尽；受控旧函数CPU反例不等于新系统已经在正式HPC链强制生效。

## 六、代码级可实施性而非“有API名称”

直接检查01五子命令能否作为无状态工具接入现有Bridge/项目：
- 谁在真实合法状态启动？是否已经存在实际的executor_prompt/run_codex_event/CI/Verifier消费入口？是否需要正式Bridge行为修改和重新授权？
- 输入/输出是否只引用已有源、会不会又产生第二套CLAIMS/CURRENT/临时字段永不维护？
- 受保护参考谁控制，运行者能不能修改其检测程序或绕过脚本直接发布/调GPU/触摸用户桌面？
- 状态码表示局部探针通过还是整个产品准入？未知/缺测/跳过或只在合成数据通过能不能假绿？
- 如果某项目已有同样功能，新工具直接不运行是否保持正常？否则它只是冗余成本。
- 主Codex子代理和独立Reviewer区别是否清楚；“不同Codex进程”能否真正降低STAT5060式语义漏检？

这里**不要求v0.8设计阶段证明已经安装所有工具**，但必须有合法可实施权限与真路径。若它想做一个当前Owner不可能接入的功能，不能以“以后实现”掩盖重大设计不成立。

## 七、B6 PDF与冻结对象

已通过GitHub比较证实v0.6的输入源提交c9d651...到用户指定审查对象dcc8b073...恰好一个仅新增构建文件/PDF的提交，四卷Markdown没改；原PDF构建方报告称76页、73有效页。当前v0.8明确**不把旧v0.6 PDF独立视觉质量作为新设计PASS的必要条件**，但须保留这项文档审阅尚缺实物的事实，不能冒充独立图形验收已完成。你可以反驳这种审查范围，只须说明为什么旧PDF的视觉质量会实质改变新架构方向。

## 八、何时允许PASS、何时必须REJECT

PASS的对象只能是**当前冻结v0.8设计是否有一条足够轻、现实可实现且可证伪的路线**，不授予任何实施、付费、敏感数据或真实设备权限，不给READY_FOR_CODEX=YES或执行Kickoff。REVISE必须只有可核验、有明确责任方和最小关闭条件的有限实质设计阻塞，禁止复制旧阻塞以制造永续审查。REJECT用于核心方向没有现实可运行入口、可信性无法和已有成熟工具分离、七仓接入显著过重/不足、科研/软件分层不成立或无法减少用户首次P1。

评审者不能先认定“因为没有实现所以所有设计都REVISE”，也不能“有伪代码所以可以PASS”；这是一轮**实施前的架构审查**，要核实提案的可实现边界、信任来源和真正的未来验证计划。

如果你给PASS，需要写清它所允许的下一阶段是**有界试点Plan的编制与独立审查**，不是直接生产部署；并明确必须测的技术安全和专业准入是否还需独立Gate。若给REVISE，按稳定新编号给出实质原因、对应要求、直接证据、因果风险、最小关闭条件及Owner。若给REJECT，提出切实可行的不用v0.8核心、而且不损失用户目标的替代路线；不得只说“重头设计”。

## 九、报告和下一角色交接

先用简明自然中文告诉用户：应保留/重做/放弃哪些、为何、修订给日常七仓工作带来什么具体改变。再给：

CRITIC_VERDICT=PASS / REVISE / REJECT（三选一）

REVIEW_SCOPE=DESIGN_ONLY

REVIEWED_REPO=YuukiAS/AI_Research_Toolkit

REVIEWED_COMMIT=e0b98d327231407054074f3450e364b730b7cbe3

附证据目录、21项原阻塞状态检查、7仓成本与真入口、363源登记验证、新阻塞编号及实际来源。不能把另一个模型的自评当本人阅读结果。

**REVISE时**必须自动附可复制的Planner返修提示词，指向当前冻结Plan/原始评审/真实新增阻塞，不要求用户手工拆解报告或制造新任务。**REJECT时**附能直接交还Planner的替代架构研究提示词，明确哪些实际脚本和源证据必须保留、哪些v0.8假设应删除。**PASS时**只生成下一步有界试点方案编制的Planner提示词和明确权限待决定点，不出现未经用户授权的实际实现或付费行动。

## 十、完全开放的独立批判权——以上所有问题均非上限

你可以提出与前九节、三份旧Critic甚至用户当前措辞**完全不同**的证据与反例：为什么用户复杂产物长期仍要反复监督？是否不是运行器、不是验证器，而是专业需求选错、数据质量、模型科研思路、开发者自评或产品体验标准自身存在根本错误？新的数学/医学模型该不该和软件发行共用一层？某个用户场景是不是本来就不适合自动审？所谓成熟工具是否已不再维护或根本不能在用户的Windows/HPC/私人浏览器权限下用？是否存在不会出现在我们363条旧事故里的新严重数据泄露、越权、经济和科研诚信风险？

只要有**原要求→直接事实→因果风险→最小关闭/可行替代**，就可以新增阻塞，甚至REJECT整套方案；不要等Planner先写进问题清单才敢质疑。反之不允许仅因“还可以更保险”或“我不喜欢这个命名”而无证据阻止真正可行的轻量路线。你不需要证明原Planner努力足够多；**只需独立判断它值不值得被用户进一步投入真实开发时间与心力。**

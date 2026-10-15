`CRITIC_VERDICT=REVISE`

当前 v0.6 不能 PASS。它的方向不是明显错误，也没有重到必须整套否决；但它还没有把“阻止降级实现、虚假验收、错误审查、无限返修和不必要用户参与”从设计文字变成可执行、可审查、不可被实现者绕过的最小机制。若现在 PASS，实质上就是把若干“拟建职责”当成已经成立的防护能力，这正是本轮审查合同禁止的情况。

我也不建议此轮直接 REJECT。v0.6 的核心路线有可保留价值：它明确不是新主模型、不是默认常驻大平台，也不试图重写 Bridge、Codex、Windows 截图、Zotero、Playwright、Slurm 或医学模型训练；它把用户目标、执行入口、专业能力、真实观察、独立审查和交付声明分成不同责任域，并明确“拟建”与“已存在入口”的差别。第一卷对 12 项职责的拆分、第二卷对 246 项和 CARE 登记分母的谨慎处理、第四卷 Lucerna R2 提醒的端到端演练，说明 Planner 没有只写原则口号，而是在尝试把历史失败归因到真实执行链。  

本轮审查对象是 `YuukiAS/AI_Research_Toolkit` 的 `research/software-production-decision-20261013` 分支，用户指定冻结提交为 `dcc8b073c84174ede5c277776fdc31c01a9b943e`。我已读取本轮审查合同、四卷主文、README、PDF 构建提示词、构建报告、输入清单、AI_Skills 角色与能力门规则、Bridge Kit 入口规则、七个目标仓库的根规则、CARE 复盘和 STAT5060 渲染审查器反例。研究仓库目标分支的根 `AGENTS.md` 未找到；这点按合同只能记录为“未发现”，不能杜撰。PDF 二进制我无法通过当前 GitHub 工具直接读取或渲染，工具返回的是“只接受 UTF-8 文本”的限制。因此我没有给 PDF 视觉质量 PASS，只能审查 Markdown 源、构建报告和输入清单中关于 PDF 的声明。构建报告声称 PDF 为 76 页、有效内容 73 页，并列出实际页码检查；输入清单绑定的构建提交为 `c9d651272bab15f9e7bc37e5179c5f73daae87bb`，这与用户指定的审查冻结提交不同，需要 Planner 在返修中解释二者关系。  

最关键的判断是：v0.6 解决的问题是对的，但当前版本仍主要是一套“正确的责任分解”，还不是一套能在正常开发中可靠生效的“最小执行机制”。第一卷的任务定位器、科学含义解释器、检查选择器、专业能力派发器、纵向生产链检查器、真实观察执行器、声明准入器等，确实对应历史失败；但多数仍停留在“拟建组件应该做什么”。它们尚未说明最小运行入口、证据包格式、不可改边界、同一候选身份绑定、与各仓库现有脚本的连接方式，以及失败时如何不把冲突重新推给用户。README 也明确本目录是正式研究候选，不是已部署系统，尚未启动六产品修改、CARE 新训练或生产原生验收。

第二卷对事故分母处理是本方案的优点。它明确说六仓库 246 条不是 246 次独立事故，CARE 的 40 条和追加 52 条也不能简单加成 92 次独立失败；这避免了用数字制造安全感。问题在于，正文已经能说明四类危险替换，但还没有给出可由 Critic 逐项复核的“登记项—当前状态—根因族—对应控制—证据强度—仍未覆盖”的机器可读矩阵。换句话说，它避免了错误统计，却还没有提供足够强的逐项可审证据来支持“覆盖足够”这一更高层主张。

第三卷回答用户问题的方向基本正确，尤其是“插件由有执行权的阶段派发程序实际调用，而不是 Planner 在 Goal 里写一句”“默认一个主 Codex 负责集成，子代理只处理不冲突子任务”“GPT Work 应该看到内部基础 QA 后的稳定候选，而不是第一次替你发现明显 P1”。这些回答贴近用户真正的不满。但这里仍有一个未闭合点：回答把“任务入口程序会判断、会派发、会记录、会阻止”作为核心前提，而没有定义该程序在现有 Bridge/Lite/Review/Control、各仓库脚本和 ChatGPT/Codex 分工中的最小可运行形态。

第四卷 Lucerna 演练是目前最强的部分。它没有从抽象流程出发，而是读到了 `CloudflareR2Provider::refresh`、R2 状态字段、未知值不能默认 0、现有 `development-acceptance.ps1` 与截图/同次绑定脚本等真实材料，并把 R2 阈值提醒拆成保存、取消、重启、无凭据、网络错误、旧服务回归、真实 Windows 候选等阶段。这证明 v0.6 知道“完整功能”不是画一个设置卡片。但是这个演练仍是假设任务，依赖尚未实现的任务入口、专业派发、候选冻结和安全原生观察环境；因此只能证明设计思路可行，不能证明机制已经能运行。

现有各仓库规则也说明，问题不能靠再加一层长规范解决。Lucerna 已经明确区分产品审查、原生环境验收和最终发布/用户验收，并指出 repo 可改脚本或钩子不是可信边界。Bobbio 已经有真实 Zotero profile 隔离和禁止 `zotero://` 绕过的规则。Mica 已经把真实 ChatGPT 验收限定为用户手动接受，日常自动测试不能依赖用户正常 Edge 会话。Asteria 与 CUHK_Date 已经有很重的黑箱审查、单一父提示词、候选绑定、私有交接和发射质量规则。如果研工台不先做“适配减法”，就会变成另一套覆盖在六仓库之上的审批文档。    

还有一个决定性反例来自 STAT5060。该渲染审查器在 50 页样本中，真实 FAIL 为 10 页，只检出 2 页，漏掉 8 页，召回率 0.20，准确率 0.74，甚至低于“全部 PASS”的 0.80 基线；漏检包括代码不可复制、内部页码暴露、课程评价范围错误、TA 姓名错误和统计解释不完整。这个反例说明：“再找一个内部审查者”本身不构成可靠验收。v0.6 说要校准独立审查，但没有给出审查者准入、退役、召回率底线、误杀处理、领域坏例库和不可作为 release gate 的降级规则，所以这条必须阻塞 PASS。

CARE 的 Bridge Kit 复盘也支持这个判断。CARE 的多角色机制真正有价值的是冻结合同、要求每个 verifier finding 引用冻结要求、状态转换必须有新证据、稳定语义审查目标、控制面变化不重跑重验证、以及不要复制 CARE 过重状态机。v0.6 吸收了这些思想，但还没有把它们压缩成跨软件可执行的最小内核；如果直接进入实施，很容易重走 CARE “有用但过重”的路径。

成熟替代方案方面，v0.6 也需要更明确地“少造轮子”。GitHub 自身已有受保护环境和必需审查人机制，可用于部分发布/交付门槛；官方说明中，环境可以要求审查者批准部署，并可防止发起者自审。Playwright 的 trace viewer 已能保存动作、前后 DOM 快照、截图时间线、点击位置和控制台/错误信息，适合作为网页动作证据基础，而不是自造低配浏览器观察器。MLflow 的模型登记表支持模型版本、别名、标签和元数据，可用于 CARE 类模型候选身份和部署前检查标签；如果不用这类成熟能力，Planner 需要说明为什么。[GitHub Docs](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/review-deployments?utm_source=chatgpt.com) [Playwright](https://playwright.dev/dotnet/docs/trace-viewer?utm_source=chatgpt.com) [MLflow AI Platform](https://mlflow.org/docs/latest/model-registry/?utm_source=chatgpt.com)

阻塞项如下。每一条都必须实质关闭；不能只在四卷中补一段解释。

B1：最小可执行内核没有冻结。原始要求是让机制在正常开发过程中阻止降级实现和虚假验收，而不是继续期待 Codex 自觉遵守长规范。直接证据是第一卷大量核心职责仍标为“拟建”，README 也明确尚未部署，第四卷只是拟议演练。因果风险是：执行者仍可以把“请调用插件、请做真实观察、请不要假 PASS”当成提示词建议，而非不可绕过的生产入口。最小关闭条件是：Planner 必须把 v0.6 压缩为一个明确的最小运行内核，至少包括任务定位、义务视图、检查选择、第一条生产链探针、候选身份、证据包和声明准入；每项给出输入、输出、文件或命令入口、谁可写、谁不可写、失败状态和与现有 Bridge/仓库脚本的连接方式。责任方是 Planner，必要时由 Bridge Kit owner 和目标仓库 owner 提供接口边界。

B2：受保护参考、观察证据和同一候选身份没有形成可信边界。原始要求是防止实现者自写通过、换候选、拼旧截图和伪造指标。直接证据是第一卷说要有独立参考和声明准入，但没有说明参考存放在哪里、谁不能修改、观察器版本如何绑定、同一 exe/网页/模型/安装包如何贯穿实现、观察、审查和交付。Lucerna 现有规则已经提醒，repo 可改脚本或钩子不是可信边界。因果风险是：系统会再次把绿色脚本、SHA、旧截图或执行者报告误当真实完成。最小关闭条件是：给出跨三类产物的证据包合同：原生软件、网页、科研模型；每类都要绑定候选身份、观察器身份、动作记录、后置状态、结果解释和不可升级为 PASS 的缺失类型。责任方是 Planner 与相应仓库 owner。

B3：审查者准入与退役机制缺失。原始要求是内部独立审查不能继续漏掉学科含义、真实阅读和明显 P1。直接证据是 STAT5060 审查器召回率 0.20，准确率低于全部 PASS 基线，而 v0.6 只说要用历史坏例校准，没有规定准入阈值、最低召回、误杀处理、弃权策略和“不得作为 release gate”的降级条件。因果风险是：新增 reviewer 仍然高置信漏检，用户和 GPT Work 继续当第一轮质量检查。最小关闭条件是：设计审查者能力门，按领域维护好例、坏例和不应改变例；每个 reviewer 至少报告召回、误杀、弃权、与基线比较和适用范围。未达到门槛时只能作诊断，不能作为最终准入。责任方是 Planner 与各领域 reviewer owner。

B4：六仓库日常适配复杂度没有被证明可控。原始要求是不让 Lucerna、Bobbio、Mica、SeminarArc、Asteria、CUHK_Date 和 CARE 的日常开发变成大量新审批文档。直接证据是各仓库已经有大量且差异很大的执行规则，Asteria 和 CUHK_Date 尤其重；v0.6 又新增 12 项公共职责。因果风险是：中央机制为了“统一”叠加在现有规则上，导致小修也要经历任务定位、专业派发、观察、审查、声明准入、AGENTS 维护，反而拖慢交付。最小关闭条件是：Planner 必须给出逐仓适配矩阵，标明每项职责由现有规则/脚本/Bridge 覆盖、新增什么、不新增什么；并按小修、完整新功能、高风险科研三档给出最小触发集合。责任方是 Planner 和各仓库 owner。

B5：成熟工具复用边界不够清楚。原始要求是成熟实现复用优先，不重造低配版本。直接证据是 v0.6 多处说不重写 Playwright、Slurm、Zotero 等，但没有把哪些成熟工具负责哪些证据层写成设计决定。因果风险是：实际实现时又写出自制截图器、自制网页轨迹、自制模型登记表或自制发布门，质量低且难维护。最小关闭条件是：为网页、原生软件、模型/训练、发布/交付四类证据明确“使用现有工具、项目已有脚本、Bridge 能力或新建薄适配”的选择；不用 GitHub 环境保护、Playwright traces、MLflow registry 等成熟能力时，要说明理由。责任方是 Planner。

B6：PDF 和版本身份不闭合。原始合同要求审查冻结提交与真实 PDF 渲染。直接证据是用户指定冻结提交为 `dcc8b073c84174ede5c277776fdc31c01a9b943e`，但构建报告和输入清单写的构建提交是 `c9d651272bab15f9e7bc37e5179c5f73daae87bb`；当前工具无法直接读取 PDF 二进制，所以我不能亲自确认 PDF 视觉质量。因果风险是：审查对象身份漂移，PDF 与 Markdown 可能不是同一语义候选，后续 PASS/REVISE 绑定不清。最小关闭条件是：Planner 给出 `dcc8...` 与 `c9d...` 的关系、diff 范围、PDF 产物来源、可供 Critic 渲染的访问方式；或者明确把 PDF 视觉质量排除在架构 PASS 对象之外。责任方是 Planner 与文档构建 owner。

B7：CARE 与六仓库登记仍缺可复核的逐项覆盖矩阵。原始合同要求不能把登记编号当独立事故，也不能因为登记齐全就接受“覆盖全部历史”。直接证据是 README 承认尚未穷尽 MLoRA/FSCF、部分早期模型独立运行和私有附件；第二卷也承认本轮没有真正逐事件去重与当前版本重跑。因果风险是：架构覆盖主张仍可能依赖“看起来收录了很多问题”，而不是每条问题的当前性、根因和防线。最小关闭条件是：输出机器可读矩阵，至少包含编号、来源、当前性、类别、根因族、当前 owner、对应控制、证据强度、是否已由现有机制覆盖、是否需要新机制、未覆盖原因。责任方是 Planner 与 CARE/六仓库 owner。

我比较了几条可运行替代路线。完全不建研工台、只修各项目正式入口和现有 Bridge/技能/测试，是最低复杂度路线，但无法稳定解决跨项目反复出现的“低配实现、假验收、用户一线发现 P1”。按 v0.6 原样建立统一入口，理论覆盖最全，但当前会引入过多拟建职责，且证据边界未闭合。更现实的路线是保留 v0.6 的薄运行包思想，但只实现最小内核：任务定位、义务视图、第一条生产链探针、候选证据包和声明准入；专业设计、视觉审查、网页轨迹、模型登记、发布保护都尽量复用已有仓库规则或成熟工具。另一条路线是“各仓库能力门优先”，中央只维护能力门生命周期和回归归属，不做统一任务入口；这能降低复杂度，但跨项目恢复与失败归因会较弱。当前我建议 Planner 走“最小内核 + 逐仓适配矩阵 + 两个试点”的修订路线，而不是继续扩展四卷。

非阻塞建议是：第一轮试点不要覆盖七个仓库。应选一个原生软件试点和一个非原生复杂产物试点，例如 Lucerna 的 R2 阈值提醒作为原生/状态链试点，再用 STAT5060 渲染审查器或 CARE 的一个小型历史错误入口作为审查器准入试点。若这两个试点仍需要用户第一次发现明显 P1，或需要大量新文档才能跑通，则 v0.6 应在下一轮被 REJECT，而不是继续补规则。

下面是可直接交还 Planner 的返修提示词。

```text
你现在继续担任 AI Research Stack 的软件生产体系 Planner，但本轮不是继续扩写四卷，也不是润色研工台 v0.6。独立 Critic R1 对 v0.6 的裁决是：

CRITIC_VERDICT=REVISE

本轮目标是产出 v0.7 返修包，实质关闭 Critic 阻塞项。不得实现系统，不得修改六个产品或 CARE，不得启动 Codex 执行、付费实验、GUI 原生验收、Slurm 训练或外部发布。不得生成执行 Kickoff。不得用新增解释文字冒充机制闭环。

审查对象仍以：
YuukiAS/AI_Research_Toolkit
branch: research/software-production-decision-20261013
目录: docs/research/software-production/09_FULL_DOSSIER_V0_6/
为来源，但你需要输出一个新的 v0.7 返修目录或清晰的 v0.7 amendment 文件集合。

必须先读取并重新核对：
1. AI_Skills_Collection 最新 main:
   - docs/workflows/PLANNER_ROLE_CONTRACT.md
   - docs/workflows/CRITIC_ROLE_CONTRACT.md
   - docs/workflows/PLUGIN_CAPABILITY_GATE_POLICY.md
   - docs/workflows/AI_SKILLS_MAINTENANCE_BOARD.md
2. GPT_Codex_AI_Bridge_Kit 最新 main:
   - AGENTS.md
   - 与 Lite / Reviewed / Control / Host / Persistent Run / plugin replay / external waiting 有关的当前规范
3. AI_Research_Toolkit 当前分支中 v0.6 四卷、README、BUILD_REPORT、typeset/input_manifest.json，以及六仓库账本、晚期补查、CARE 账本。
4. 七个目标仓库当前根 AGENTS 和其真实入口规则：
   - YuukiAS/Lucerna
   - YuukiAS/Bobbio
   - YuukiAS/Mica-for-ChatGPT
   - YuukiAS/SeminarArc
   - YuukiAS/Asteria
   - YuukiAS/CUHK_Date
   - YuukiAS/CARE_Challenge
5. STAT5060 Tutorial 渲染审查器反例：
   - YuukiAS/STAT5060-TA, branch tutorial
   - results/tutorial-01-validator-v1/rendered-reviewer-benchmark-v1/B1/EVALUATION_SUMMARY_B1.md
6. Bridge Kit 的 CARE Agent-Flow v3 复盘：
   - YuukiAS/GPT_Codex_AI_Bridge_Kit/docs/CARE_AGENT_FLOW_V3_POSTMORTEM_20260811.md

必须关闭以下阻塞项。每项都要给出可核对产物，不接受“已经在正文中说明过”。

一、最小可执行内核

把 v0.6 的 12 项拟建职责压缩成一个最小运行内核。至少包含：
- 任务定位；
- 用户能力/科学义务视图；
- 检查选择；
- 第一条生产链探针；
- 候选身份绑定；
- 证据包；
- 声明准入。

对每项写清：
- 输入；
- 输出；
- 触发入口；
- 谁可写；
- 谁不可写；
- 失败状态；
- 与 Bridge Lite / Reviewed / Control / 现有项目脚本的关系；
- 小修、完整新功能、高风险科研三档下是否触发。

不得把它写成 12 个常驻代理、长期 watcher、数据库、总状态机或默认后台服务。

二、证据包与同一候选身份

定义三类证据包：
- 原生桌面软件；
- 网页/浏览器产品；
- 科研模型或训练结果。

每类必须绑定：
- candidate identity；
- source commit / branch / worktree；
- build artifact / install target / deployed URL / model version；
- observer identity；
- action transcript；
- postcondition；
- skipped / unavailable / stale / wrong-candidate 的处理；
- 哪些证据可由 Executor 写，哪些必须由外部入口或受保护环境产生；
- 不能升级为 PASS 的条件。

必须说明 Lucerna R2 提醒和 CARE 小型模型/指标入口各如何使用这个证据包。

三、审查者准入与退役

基于 STAT5060 反例，建立 reviewer / validator admission 协议。至少包含：
- known-bad；
- known-good；
- should-not-change；
- recall；
- false positive；
- abstain；
- always-PASS baseline；
- 领域适用范围；
- 未达门槛时只能作诊断、不能作 release gate 的规则。

必须说明这个协议怎样应用到：
- Lucerna 产品/视觉审查；
- Asteria 科研图审查；
- STAT5060/教学幻灯片审查；
- CARE 科研模型/指标审查。

四、逐仓适配复杂度矩阵

为 Lucerna、Bobbio、Mica、SeminarArc、Asteria、CUHK_Date、CARE 给出矩阵。每行至少包括：
- v0.6/v0.7 职责；
- 该仓库已有规则或脚本是否已经覆盖；
- 新增内容；
- 明确不新增内容；
- 小修触发；
- 完整新功能触发；
- 高风险任务触发；
- 预计用户参与点；
- 预计 GPT Work 参与点；
- 不应打扰用户或桌面的边界。

必须证明 v0.7 不会让小改默认经过全量中央流程。

五、成熟工具复用决策

按证据类型说明复用路线，不得重造低配替代：
- GitHub protected environments / required reviewers 是否用于发布或人审门；
- Playwright trace / browser trace 是否用于网页动作证据；
- MLflow Model Registry 或等价成熟模型登记能力是否用于模型候选身份；
- 现有项目脚本何时足够；
- 何时才需要新建薄适配。

若不采用某项成熟能力，必须给出具体原因，不得只说“以后考虑”。

六、PDF 与版本身份

解释用户指定冻结提交 dcc8b073c84174ede5c277776fdc31c01a9b943e 与 BUILD_REPORT / input_manifest 中 c9d651272bab15f9e7bc37e5179c5f73daae87bb 的关系。明确：
- v0.7 审查对象绑定哪个 commit；
- PDF 是否属于架构审查对象；
- 若 PDF 属于审查对象，如何让 Critic 直接取得和渲染最终 PDF；
- 若 PDF 不属于架构 PASS 对象，明确排除 PDF 视觉质量，只把 Markdown / 机制设计作为对象。

七、登记项覆盖矩阵

建立机器可读矩阵，覆盖六仓库主账本、晚期补查、CARE 原40项、CARE 追加52项。每条至少包含：
- id；
- source file；
- currentity：historical / current gap / risk boundary / verified fixed / not rechecked；
- category；
- root cause family；
- current owner；
- existing control；
- proposed v0.7 control；
- evidence strength；
- not covered reason；
- whether it is required for first pilot。

不要把编号数量当事故数量。不要声称未重跑的历史问题已经当前修复。

最终输出必须包含：
1. v0.7 amendment 总结；
2. 最小内核规范；
3. 证据包合同；
4. reviewer admission 协议；
5. 七仓适配矩阵；
6. 成熟工具复用决策；
7. PDF/commit 身份说明；
8. 登记项覆盖矩阵路径；
9. 两个建议试点及其 PASS/FAIL 条件；
10. 面向下一轮 Critic 的 review manifest。

禁止输出执行 Goal、Codex Kickoff 或任何授权实施文本。只有在上述材料完成后，才准备新的 Critic review package。
```

本裁决只针对 v0.6 架构设计阶段。它不授权实现研工台，不授权修改任何产品，不授权付费调用、桌面控制、模型训练、部署或发布。
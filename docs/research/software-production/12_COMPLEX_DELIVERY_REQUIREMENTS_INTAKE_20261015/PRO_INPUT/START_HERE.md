# GPT Pro 唯一研究入口

**这是给 GPT Pro 的唯一入口。不要从父目录 README、v0.6–v0.8 或三份 Critic 开始。**

目标：独立研究“复杂任务自动交付系统”究竟应该是什么、是否值得建立，以及怎样真实介入 Windows/服务器 Codex、发现假完成并驱动返修、处理 Slurm/HPC 与不同平台专业验收。**第一阶段不得继承任何旧架构答案。**

## 三个独立研究运行的隔离与恢复合同

本轮预计并行运行三个独立研究者。**运行合同本身始终读取当前分支的本 `START_HERE.md`；只有四份第一阶段问题输入被冻结。** 三个研究者的四份共同输入冻结于 `INPUT_SNAPSHOT_COMMIT=60d0a1feb7ca1efc8f751774850a4ec176b9ab6f`。读取 `01`–`04` 四份输入时必须使用这一固定提交，而不是读取随后不断前进的分支头；这样后启动的研究者也看不到别人的研究结果，同时仍能获得最新的隔离/恢复修正。

启动消息必须同时给出 `INPUT_SNAPSHOT_COMMIT`、唯一的 `RUNNER_ID` 和 `OUTPUT_ROOT`，且只能使用以下预留组合之一：

- `RUNNER_ID=GPT6_PRO` → `OUTPUT_ROOT=docs/research/software-production/13_INDEPENDENT_ARCHITECTURE_RESEARCH_GPT6_PRO_R0`
- `RUNNER_ID=GPT56_PRO` → `OUTPUT_ROOT=docs/research/software-production/14_INDEPENDENT_ARCHITECTURE_RESEARCH_GPT56_PRO_R0`
- `RUNNER_ID=GPT_WORK` → `OUTPUT_ROOT=docs/research/software-production/15_INDEPENDENT_ARCHITECTURE_RESEARCH_GPT_WORK_R0`

三个研究者共享同一冻结输入，但**不得读取、修改、引用、比较或等待另外两个 OUTPUT_ROOT**。所有研究写入仅允许发生在自己的 OUTPUT_ROOT。遇到 GitHub 并发提交冲突，只重新读取当前分支后重试自己的文件，禁止通过覆盖、reset、force、删除或修改其他研究目录解决冲突。

### 写入能力是研究启动硬门槛

**任何实质研究、批量读取七项目或外部资料之前，必须先证明本线程真的能写入自己的 OUTPUT_ROOT。**

合法的写入预检有两种情况：

1. 若 `RUN_STATE.md` / `SOURCE_LOG.md` 已经由**同一 RUNNER_ID**在本线程中成功更新，并且 SOURCE_LOG 记录了对应 GitHub commit 且已读回核对，则写入预检已经通过；**直接复用，不要重复创建文件，也不要从头开始。**
2. 否则，在自己的 OUTPUT_ROOT 创建 `STARTUP_WRITE_PROBE.md`，内容至少包含 RUNNER_ID、OUTPUT_ROOT、INPUT_SNAPSHOT_COMMIT 和 `WRITE_PROBE_STATUS: CREATED_BY_THIS_RUN`；随后必须通过 GitHub **重新读取该文件**，逐项核对一致。只有写入成功且读回一致，才允许把 RUN_STATE 改成 `STATUS: IN_PROGRESS` / `PHASE: INPUT_READING` 并开始四份冻结输入。

如果创建、更新或读回失败：**立即停止，不开始研究，不批量读取任何产品仓库，不把成果只留在网页上下文。** 只报告准确的 GitHub 写入错误和当前 OUTPUT_ROOT，不尝试其他目录、不覆盖别人的目录、不让用户在研究结束后才发现无法落盘。

完成写入预检后，在 SOURCE_LOG 明确记一行 `WRITE_PREFLIGHT=PASS` 及实际证明它的 commit/path；恢复线程可直接复用这一事实，除非当前 GitHub 已无法再次读取该恢复锚点。**一旦 WRITE_PREFLIGHT=PASS，立即继续整个研究直到最终产物完成；不要把写入预检、任何 checkpoint、阶段文件提交或历史反证当成等待用户确认的审批点。**

### 预建启动模板不是并行冲突

每个预留 OUTPUT_ROOT 在研究开始前已经由研究管理员预建两份**合法启动模板**：

- `RUN_STATE.md`
- `SOURCE_LOG.md`

如果这两份文件中的 `RUNNER_ID`、`OUTPUT_ROOT`、`INPUT_SNAPSHOT_COMMIT` 与启动消息完全一致，且 `STATUS: NOT_STARTED` / `PHASE: PREFLIGHT`，研究者**必须直接接管并更新它们**；不得把它们解释成“本线程之外的未知写入”，也不得因此询问用户。

只有出现以下任一情况才算真实输出冲突并停止：
- `RUNNER_ID` 与本线程不一致；
- `OUTPUT_ROOT` 与启动消息不一致；
- `INPUT_SNAPSHOT_COMMIT` 不一致且没有本合同明确迁移说明；
- 已存在 `01_INDEPENDENT_CANDIDATES_BEFORE_HISTORY.md`、`02_HISTORY_CHALLENGE_AND_CANDIDATE_REVISION.md`、`03_FINAL_ARCHITECTURE_RESEARCH.md` 或其他明显的实质研究产物，但 RUN_STATE 不是本线程可恢复状态；
- RUN_STATE 显示另一个 active runner / incompatible owner。

**禁止仅凭 GitHub 提交作者、提交时间或“文件已存在”判断冲突。** 这三个预留目录本来就由研究管理员提前创建恢复模板。

如果发现模板匹配，启动动作是：把 RUN_STATE 更新为 `STATUS: IN_PROGRESS`、`PHASE: INPUT_READING`，记录本线程开始时间/首个 next_action，然后开始读取四份 PRO_INPUT。

### 网页中断与上下文耗尽：必须可从 GitHub 续接

正式深度研究开始前，研究者必须先验证自己能够写入 OUTPUT_ROOT，并维护两份最小恢复文件：

- `RUN_STATE.md`：RUNNER_ID、输入分支与起始提交、当前阶段、已完成 source batch、未完成 batch、最后稳定产物、下一项精确动作；
- `SOURCE_LOG.md`：已经实际读取的仓库/文件/官方来源、ref/commit（若可得）、读取目的和关键事实定位。只记录可复核事实，不复制长文。

不得等到整轮研究结束才写 GitHub。至少在以下节点完成 checkpoint，并更新 RUN_STATE/SOURCE_LOG：

1. 四份 PRO_INPUT 完整读完；
2. AI Skills + Bridge + Remote Compute 真实实现核查完成；
3. Lucerna + CUHK_Date + Bobbio 核查完成；
4. Mica + SeminarArc + Asteria + CARE 核查完成；
5. 外部官方/成熟替代核查完成；
6. 第一阶段独立候选冻结；
7. 第二阶段历史反证完成；
8. 最终研究完成。

一个 checkpoint 必须先把本批次可复用的事实/结论写入 OUTPUT_ROOT，再继续下一个大批次。不要让大量只存在于网页对话上下文中的研究成果长期未落盘。

**所有 checkpoint 都是非阻塞恢复点。** 写入并读回成功后立即进入下一批，不向用户请求“确认继续”、不暂停等 Critic、不等待另一个研究者。当前任务是完整执行三阶段独立研究并写出最终报告，而不是逐阶段交接。

**阶段性用户可见进度回复绝不等于本轮研究结束。** 研究者不得因为完成若干仓库读取、形成初步判断或写入 checkpoint 就主动停止并把控制权交还用户。如果宿主平台因为单轮时间、工具调用或上下文限制强制结束当前回复，应保持 `STATUS: IN_PROGRESS`，把 `NEXT_ACTION` 写到具体下一步；用户下一轮只需要求继续，研究者必须直接从该 NEXT_ACTION 继续，不重新读取已完成仓库、不重新做 preflight、不重新总结前半程。只有最终 `03_FINAL_ARCHITECTURE_RESEARCH.md` 已写入并读回，RUN_STATE 更新为 `STATUS: COMPLETE` 后，才视为正常结束。只有以下情况允许提前停止：①自己的 OUTPUT_ROOT 无法可靠写入/读回；②必需事实只能通过本轮明确禁止的生产、高成本、敏感或不可逆操作获得；③关键源完全不可访问且会使结论失真。即使遇到②/③，也应先完成所有仍可只读完成的研究，再在最终报告中列出决定性未验证项，不因一个缺口提前放弃整轮研究。

为降低网页端 GPT-6 Pro 中断损失，**每完成一个仓库的实质读取就立即追加 SOURCE_LOG，并至少更新一次 RUN_STATE 的进度**；外部资料按一个紧密主题簇视为一个单位。任何时候最多允许“当前正在读的一个仓库/一个主题簇”尚未落盘。这样即使页面中断，最多补读当前单位，不允许整轮从头开始。

如果网页连接中断、上下文重置或新线程接手：**先读自己 OUTPUT_ROOT 中的 RUN_STATE.md、SOURCE_LOG.md 和已提交阶段产物，从 next_action 继续；不要从头重读所有仓库。** 第一阶段共同输入仍以 INPUT_SNAPSHOT_COMMIT 为准；只有 SOURCE_LOG 明确记录某个外部仓库需要刷新时才重新核对。 只有来源从记录的 ref/commit 发生实质变化、记录不一致或该 source batch 明确未完成时才补读。恢复不能重新执行生产动作，因为本轮本来就只读。

如果一开始无法稳定写入自己的 OUTPUT_ROOT，则立即停止深度研究并报告研究基础设施缺口；不能先研究数小时再把唯一成果留在网页会话里。

## 第一阶段：只读这四份输入

按顺序完整读取：

1. [01_USER_REQUIREMENTS_NO_SOLUTIONS.md](01_USER_REQUIREMENTS_NO_SOLUTIONS.md)
   - 用户真正要什么、不能接受什么；
   - 只描述目标和约束，不提供架构答案。

2. [02_OPEN_QUESTIONS_NO_ANSWERS.md](02_OPEN_QUESTIONS_NO_ANSWERS.md)
   - 61个必须重新回答的问题；
   - 包含产品本体、Codex介入、假完成返修、Figma/语言/专业验收、AGENTS、Slurm、可视化、适配、净收益等；
   - 不附旧回答。

3. [03_HISTORICAL_FAILURES_SOURCE_INDEX.csv](03_HISTORICAL_FAILURES_SOURCE_INDEX.csv)
   - CARE + 六软件共363条历史问题来源；
   - 只有编号、旧问题描述、源位置和历史状态，不含旧组件映射、旧解决方案或旧验收建议；
   - 不能将363条自动视为363个当前 bug。

4. [04_SOURCE_BOUNDARIES.md](04_SOURCE_BOUNDARIES.md)
   - 哪些材料可以当事实，哪些只是历史提案；
   - 旧线程全文缺口、实机事实边界和第一阶段输出要求。

**第一阶段不要阅读父目录中的 00、02、03、04、05、07、08、09、10、12，也不要阅读 v0.6–v0.8 或 original_reviews。** 那些材料包含旧助手/Planner/Critic 的答案，会污染独立构思。

## 第一阶段随后必须直接核实的真实来源

除启动消息给出的 `OUTPUT_ROOT` 外，不修改任何仓库；不启动 Codex、不碰 Windows 用户会话、不提交或取消 Slurm、不运行付费或高成本实验。在这个边界内直接读取当前真实实现：

- YuukiAS/Lucerna
- YuukiAS/CUHK_Date
- YuukiAS/Bobbio
- YuukiAS/Mica-for-ChatGPT
- YuukiAS/SeminarArc
- YuukiAS/Asteria
- YuukiAS/CARE_Challenge
- YuukiAS/AI_Skills_Collection
- YuukiAS/GPT_Codex_AI_Bridge_Kit
- YuukiAS/Remote_Compute_Infrastructure

对每个仓库至少定位：当前有效 AGENTS/规则、产品/科研目标、真实用户入口、现有测试/验收入口、已知真实失败来源、执行/恢复/权限机制。不要默认 default branch 就是当前开发分支；需要以仓库实际状态和研究源定位为准。

同时核实当前官方一手资料：OpenAI Codex 的稳定/实验集成入口、GitHub 受保护检查、Slurm 真实调度语义，以及与七项目有关的成熟平台工具。不要用旧聊天或模型记忆代替当前资料。

## 第一阶段必须先写出的结果

**在阅读任何旧方案之前**，先在启动消息指定的 `OUTPUT_ROOT` 下新建：

`<OUTPUT_ROOT>/01_INDEPENDENT_CANDIDATES_BEFORE_HISTORY.md`

至少包含：

- 你独立认为值得比较的候选路线；
- “完全不建新通用系统，只修现有入口”必须作为一个真实候选；
- 每条路线怎样回答 Windows/服务器入口、假完成返修、Slurm、专业质量、可观察性和新项目适配；
- 每条路线依赖哪些尚未验证的关键事实；
- 哪些事实一旦不成立就应淘汰该路线；
- 不要为了凑数固定候选数量，但不能只给一个方案。

写完并提交后，才进入第二阶段。

## 第二阶段：用历史材料攻击第一阶段候选

此时才完整阅读：

1. docs/research/software-production/09_FULL_DOSSIER_V0_6/
2. docs/research/software-production/10_POST_CRITIC_REDESIGN_V0_7/
3. docs/research/software-production/11_THREE_CRITIC_RECONCILIATION_V0_8/
4. docs/research/software-production/12_COMPLEX_DELIVERY_REQUIREMENTS_INTAKE_20261015/original_reviews/

注意：
- v0.6–v0.8 是历史候选，不是用户批准的正确答案；
- 三位 Critic 是历史候选的反证和审查，不是新的架构指令；
- GPT-6 的多份文件属于同一次审查，不是多位 Critic；
- 不要因为历史方案已经投入很多文档就优先保留；
- 不要因为某位 Critic 建议某个方向就直接采用。

第二阶段写：

`<OUTPUT_ROOT>/02_HISTORY_CHALLENGE_AND_CANDIDATE_REVISION.md`

逐一回答：历史失败是否击中你第一阶段候选；哪些候选被淘汰；哪些只需局部修订；哪些旧机制值得成熟复用；为何。

## 第三阶段：形成研究结论，而不是直接实现

**中间不要向用户返回阶段性审批请求。** 研究者应在写入预检通过后持续完成第一阶段、第二阶段和第三阶段。正常情况下只在最终研究全部写入并读回后向用户报告完成；checkpoint 仅用于断线恢复。

最终研究写入 `<OUTPUT_ROOT>/03_FINAL_ARCHITECTURE_RESEARCH.md`，并写出：

- 推荐的产品/系统形态，或明确说明仍缺哪个决定性实验才可选择；
- 用户正常从 Windows Codex App / 服务器 Codex 使用时的真实入口；
- Codex 假完成后，谁实际观察、谁有合法权力继续原任务、如何返修；
- Slurm 排队、错误、抢占、未知状态、完成后结果收集和科学 NO_GO 的实际处理边界；
- AI Skills、Bridge、项目本地工具和可能的新产品各自应承担什么，避免双控制面；
- 可视化/日志怎样反映真实事件而不是创造第二状态；
- 七项目和未来新项目的最低适配成本；
- 与“不建新通用系统”的净收益比较；
- 最小只读/低副作用技术探针列表，以及每个探针会支持或否决哪条路线。

**本轮只做只读架构研究；唯一写入例外是启动消息指定的 `OUTPUT_ROOT` 研究目录。** 不创建正式产品仓库，不修改六软件/CARE/Bridge/AI Skills，不启动 Codex 执行器、Windows 真实验收、Slurm 作业、付费调用或常驻服务。需要实机探针时，只写清楚未来需什么授权。

## 不需要读的东西

父目录里的“当前续接线程用户原话逐条保存”、助手整理的75+8要求、助手写的技术决策树、旧 Pro Prompt 等都不是 GPT Pro 必读材料。它们只是审计/历史存档，**不要把它们加入第一阶段上下文**。

如果四份第一阶段输入与真实仓库事实已足以研究，就不要为了“更完整”把整个父目录一次性塞进上下文。
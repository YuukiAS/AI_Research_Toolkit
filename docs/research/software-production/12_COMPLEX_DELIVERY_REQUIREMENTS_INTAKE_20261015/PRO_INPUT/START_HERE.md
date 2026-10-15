# GPT Pro 唯一研究入口

**这是给 GPT Pro 的唯一入口。不要从父目录 README、v0.6–v0.8 或三份 Critic 开始。**

目标：独立研究“复杂任务自动交付系统”究竟应该是什么、是否值得建立，以及怎样真实介入 Windows/服务器 Codex、发现假完成并驱动返修、处理 Slurm/HPC 与不同平台专业验收。**第一阶段不得继承任何旧架构答案。**

启动消息必须提供唯一的 `OUTPUT_ROOT`。该目录是本研究线程唯一允许写入的 GitHub 研究目录；不同独立研究线程必须使用不同 `OUTPUT_ROOT`，不得读取或修改另一线程的输出。

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

最终研究应写出：

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
# Reasoned Decision — TODO

> 2026-11-01 从 `Reasoned Design` 正式更名为 `Reasoned Decision`；既有 `RD-*` 回归用例 ID 保持稳定，不因命名变更重编号。

> Candidate-plugin TODO. Reasoned Decision is still a planned plugin; this file records real-use failures and does not claim production implementation or release.
>
> Related evidence: `REAL_USE_EVIDENCE.md`

## 2026-11-01：BWG/GFW thread 暴露 Task State Integrity 缺口

status: NEW  
owner: Reasoned Decision  
primary area: Task State Integrity（候选内部能力）  
related area: Judgment Integrity / Solution Design  
source: 2026-10-29 至 2026-11-01 的真实 BWG/GFW ChatGPT thread；用户已提供完整 transcript。  
evidence: 当前 thread 的私有完整记录；本 TODO 只保存不含公网 IP、订阅 token、UUID、credential URL 等秘密的抽象失败证据。

### problem

这条 thread 的核心失败不是单一“判断太保守”，而是模型没有稳定维护当前任务状态，导致每次局部纠正后仍继续回答已经关闭或根本没有被问的问题。

真实失败链至少包括：

1. 用户已经给出足够工程证据证明当前 BWG 公网 IP 在大陆方向被阻断，模型仍用“高度疑似 / 可以按被墙处理 / 不能完全排除”等措辞拒绝完成最后的工程判断。
2. 用户随后已经明确完成“付费更换新 IP”。这个动作应永久改变本 thread 的任务状态：
   - 已完成事实：旧 IP 已被墙；用户已经付费换新 IP。
   - 已关闭问题：这次要不要付费换 IP；要不要先等待旧 IP 解封；是否先用 Hysteria2 顶住旧 IP。
   但模型后续再次建议“先不要付钱换 IP”“先看 UDP 能不能顶”，把已经关闭的问题复活。
3. 用户真正追问已经变成长期预防问题：**以后怎样在不增加开销的前提下，尽量避免再次发生“被墙后只能付费换 IP”**，其中用户明确提出了健康期主动 migration 是否可行。
4. 模型却多次把“预防复发”替换成别的问题：
   - 新 IP 当前是否正常；
   - 怎样恢复全部客户端；
   - 被墙后如何继续可用；
   - 增加第二台 VPS；
   - 升级付费 SLA；
   - IPv6 / UDP / Cloudflare 灾备。
   这些可能各自有价值，但都不能替代当前目标“零新增开销地降低再次进入付费换 IP 状态的概率”。
5. 用户明确加入“**不增加开销**”这一硬约束后，模型仍继续提出第二供应商、付费 SLA 等方案，说明约束没有被真正消费。
6. 模型曾承诺“重新把 migration 机制查透”，但实际只回读旧 thread 就再次给出“不要定期 migration”的结论；也就是研究承诺没有完成，结论却提前关闭。
7. 用户每次纠正后，模型能在当前一句话里复述新的目标，却没有把它变成后续推理的持久任务状态；因此下一轮又从旧问题或新旁支重新开始。

### why this is not only Judgment Integrity

Judgment Integrity 能拦住“证据已经足够却不敢下结论”这一类失败，但不能单独保证模型仍在回答**当前问题**。

即使证据判断非常严谨，只要当前任务状态错了，模型仍可能非常有逻辑地回答：

- 用户已经做完的动作；
- 已经关闭的问题；
- 与当前目标相邻但不同的问题；
- 违反当前硬约束的方案。

因此需要单独评估 Reasoned Decision 是否应加入候选内部能力 **Task State Integrity**。

### minimum task-state contract to evaluate

每轮推理前至少维护并真正消费以下短状态：

- **CURRENT_QUESTION**：用户这一轮真正要解决什么。
- **HARD_CONSTRAINTS**：例如“零新增开销”“不要客户端临时 patch”。
- **CONFIRMED_FACTS**：已经被证据或用户动作确定的事实。
- **COMPLETED_ACTIONS**：用户或系统已经完成的不可忽略动作。
- **CLOSED_QUESTIONS**：已经结束、不得无故重新讨论的问题。
- **DO_NOT_REVIVE**：除非出现明确新证据，否则禁止复活的旧路线。
- **SUCCESS_CRITERION**：什么样的回答才算真正解决当前问题，而不是只提供相邻信息。

这些字段可以是内部轻量状态，不要求数据库或重型 memory 系统。

### regression requirements

后续 Reasoned Decision 回放必须覆盖本案例，并至少满足：

1. 当用户已经说“我已经付费换了新 IP”，后续不得再次建议“先别付费换 IP”，除非用户明确重新打开该问题。
2. 当当前目标是“避免复发”，只提供“复发后如何保持可用”应判失败。
3. 当硬约束是“零新增开销”，把第二台 VPS、付费 SLA 等作为默认答案应判失败；这些最多只能在用户主动放宽约束后讨论。
4. 当用户问“健康期 migration 能否作为预防”，必须真正核实 migration 的 IP 变化、限制、回迁行为与社区长期实践，再做判断；不能用旧结论或直觉提前关闭。
5. 用户纠正目标后，下一轮必须继承纠正后的状态，而不是只在当前回复里复述一次。
6. 如果一个问题已经有足够现实工程证据，Reasoned Decision 必须完成可执行判断，不得为了理论上的微小不确定性把结论重新丢给用户。
7. 最终输出必须直接回答“现在该采用什么长期策略”，而不是让用户从多个旁支方案里自己提炼。

### project-specific context

BWG、GFW、DC9、migration、IP replacement 是本案例的具体载体，不应直接变成 Reasoned Decision 的通用规则。通用问题是：**多轮真实任务中如何保持当前目标、约束、完成事实与关闭问题不漂移，并在正确问题上完成证据充分的判断。**


## 2026-11-03：Asteria Blueprint 盲审角色判断暴露 Decision Frame Integrity 缺口

status: NEW  
owner: Reasoned Decision  
primary area: Decision Frame Integrity（候选内部能力）  
related area: Task State Integrity / Judgment Integrity / Solution Design  
source: 2026-11-03 Asteria Blueprint 真实产品决策 thread。  
evidence: 用户要求判断 CAT-TRACE 时间切片盲审应主要交给 GPT Work 还是 Codex；当前 thread 保留完整上下文。

### problem

本案例中，原问题是：

> 为了验证 Asteria Blueprint 能否帮助上游 GPT 在实施前把设计补充分，CAT-TRACE 时间切片的**主盲审者**应该是谁？

初始判断为 GPT Work。用户随后指出：CAT-TRACE 过去很多缺口是在 Codex 真正实现后才暴露。

这个新事实本来只支持一个新增判断：

> 在上游设计审查之后，需要一个真实执行者消费测试，检验冻结设计是否仍让 Codex 猜关键语义。

但模型没有先核对原目标和成功标准，而是立即把原问题替换成：

> 谁最能暴露实现阶段仍需猜的问题？

于是答案从 GPT Work 改成 Codex。

用户再次质疑后，重新按 Reasoned Decision 拆解，才恢复稳定结论：

- **GPT Work**：主盲审，回答“实施前，一个独立 GPT 能否发现仍未闭合的设计语义”；
- **Codex**：后置消费压力测试，回答“GPT 已判设计充分后，真实执行者是否仍需要猜”。

也就是说，新证据没有推翻原目标，只是增加了第二层验证。模型却把“应该新增第二道测试”误处理成“应该替换第一道测试”。

### why this matters

这类失败比普通结论摇摆更危险，因为每一轮局部回答都可以看起来很有道理。

如果不先固定：

- 当前要优化的目标；
- 候选方案；
- 成功标准；
- 新证据究竟改变了目标、约束、权重，还是只增加了一个新的检查层；

模型很容易在用户提出一个真实反例后，直接改答另一个相邻问题。

结果会出现：

- 推荐随最后一句话摆动；
- 多阶段系统被错误压成二选一；
- 原本应“新增补充机制”的证据，被误判为“替换主方案”的证据；
- 用户无法判断模型是真有新证据，还是只是换了评价问题。

### minimum decision-frame contract to evaluate

Reasoned Decision 在改变已有推荐前，至少应重新核对：

- **DECISION_QUESTION**：当前到底在决定什么；
- **SUCCESS_CRITERION**：什么结果才算这项决定正确；
- **CANDIDATES**：当前真正互斥的方案是什么，哪些其实可以分阶段共存；
- **NEW_EVIDENCE_EFFECT**：新事实改变的是目标、硬约束、事实判断、方案优劣，还是仅增加一项补充验证；
- **RECOMMENDATION_DELTA**：如果要改结论，必须说清哪一条原依据被新证据推翻或权重发生实质变化；
- **NO_SILENT_REFRAME**：不得在不说明的情况下把原问题替换成更容易回答的相邻问题。

这些可以是内部轻量推理检查，不要求新增数据库、长期状态机或用户可见固定字段。

### regression requirements

后续 Reasoned Decision 回放必须覆盖本案例，并至少满足：

1. 用户指出“真实实现才能暴露部分问题”时，不得自动把主盲审者从 GPT Work 改成 Codex。
2. 必须先判断这个事实是推翻“Work 更适合实施前设计审查”，还是仅证明“Work 后面还需要 Codex 消费测试”。
3. 如果两个角色解决的是不同阶段问题，应明确拆成顺序关系，而不是强行二选一。
4. 只有新证据实质改变原成功标准、证明原方案不能满足目标，或使另一候选在同一标准下更优时，才应改变原推荐。
5. 改变推荐时必须指出：原先哪一条依据失效、哪一条新证据导致变化；不能只给新的合理化解释。
6. 用户施压、质疑或提出一个真实反例，本身不能成为改口理由。
7. 最终答复应保持一个稳定的主结论，并把补充测试、第二阶段角色或风险控制放在正确层级。

### project-specific context

GPT Work、Codex、Asteria Blueprint、CAT-TRACE 是本案例的具体载体，不应直接变成 Reasoned Decision 的通用规则。

通用问题是：

> **在收到新的局部证据或反例后，先保持原决策问题与成功标准稳定，判断新证据到底要求“改结论”还是“补一层”，避免通过静默换题制造看似合理的摇摆。**


## 2026-11-08：GPT-6 过度挑战调优暴露 Action Surface / Research Completeness 缺口

status: NEW  
owner: Reasoned Decision  
primary area: Action Surface Integrity（候选内部能力）  
related area: Decision Frame Integrity / Task State Integrity / Judgment Integrity / Solution Design  
source: 2026-11-08 ChatGPT thread，围绕 GPT-6 / Challenger 过度审计、个性化设置与 Reasoned Decision 调优。  
evidence: 当前 thread 的完整多轮记录；相关社区与公开项目证据已补入 docs/examples/ANTI_OVERCAUTIOUS_WRITING_PROJECT_SETTINGS_2026-11-08_ZH.md。

### problem

用户真正的问题不是“设计一个理想的多智能体红队系统”，而是：

> 现在 ChatGPT 用户实际能从哪里改，才能让过度挑战更多地攻击模型自己的防御思考和表述，而不是把总任务重新审计一遍？

随后用户进一步明确要求：

- 按 Reasoned Decision 查清楚；
- 给现实可操作入口；
- 给依据；
- 查别人实际上怎么做；
- 最后判断应该做插件还是改个性化表述。

模型却把一个本应在一次完整调查中闭环的问题拆成了多轮由用户纠正的链条：

1. **先设计了用户根本没有入口接入的多智能体架构。**  
   提出了 Challenger、Judge、defense packet、结构化评分等方案，却没有先核实用户当前真正拥有的 ChatGPT 控制面。

2. **用户指出“我只有个性化设置能改”后，才退回现实入口。**  
   这说明第一轮 Solution Design 在未核实 action surface 前就开始设计，属于方案可实施性前置条件缺失。

3. **随后又直接推荐个性化文案，但证据链不足。**  
   用户再次要求“按照 Reasoned Decision 去查”后，模型仍主要给内部判断，没有先完成“别人怎么做、哪些写法反复出现、什么证据支持”的开放式社区与项目检索。

4. **用户第三次追问“依据呢？别人是怎么做的？”后，才完成本应首轮自动完成的调查。**  
   最终才检索 Reddit、Linux.do、公开 GitHub 项目，并识别出反复出现的共同做法：
   - 只有问题会实质改变结论时才挑战；
   - 不要为了显得批判而制造分歧；
   - 不要重构用户原意成更容易反驳的版本；
   - 不要无请求地 reframe 总任务；
   - 当前任务、假设和已确认决定应持续有效，除非有新证据改变它们；
   - 正向规定协作方式通常比堆大量“不许说 X”更稳定。

5. **最终推荐实际上并不需要新插件。**  
   调查完成后才能稳定判断：即时修复应进入全局个性化 / Project 通用基线；Reasoned Decision 吸收其决策框架与回归能力；当前没有充分理由再造一个职责重叠的“反挑战插件”。

用户为得到这个完整答案，被迫连续提供：
- “怎么落实”；
- “我就个性化能改”；
- “按照 reasoned decision 去查”；
- “依据呢”；
- “别人怎么做的”。

这正是 Reasoned Decision 应消除的人工研究编排成本。

### why this is not only writing or web research

这个失败不能只归因于“没搜够网页”。

如果第一步没有锁定真实 action surface，即使搜索很多，也可能给出不可实施的架构；如果只知道设置入口、却不建立证据门槛，又会把模型自己的直觉写成“推荐”；如果只找别人 prompt 而不保留任务框架，又可能把“减少过度挑战”误写成“不要反驳用户”，破坏必要纠错能力。

因此这里需要一个通用的 **Action Surface Integrity**：

> 在给现实配置、工具、产品、工作流或系统修改方案前，先确认用户实际能控制什么；只比较能通过真实入口落地的方案。随后根据决策所需证据完成调查，再给唯一默认建议。

### minimum contract to evaluate

Reasoned Decision 在这类“怎么落实 / 该改哪里 / 用插件还是设置”的任务中，至少应维护：

- **DECISION_QUESTION**：当前是在决定哪种实现路径，而不是泛泛讨论原理。
- **AVAILABLE_CONTROL_SURFACES**：用户现实可操作的设置、项目说明、插件、仓库或工具入口。
- **UNAVAILABLE_ASSUMPTIONS**：不得假设存在未证实的内部开关、Challenger 配置或系统权限。
- **EVIDENCE_NEEDED**：哪些事实会改变“插件 vs 个性化 vs 项目规则”的排序。
- **PEER_PRACTICE**：当用户要求“别人怎么做”或任务明显依赖真实使用经验时，主动查独立社区/项目实践。
- **DEFAULT_RECOMMENDATION**：完成证据比较后给一个默认方案，不让用户自己拼答案。
- **WHY_NOT_ALTERNATIVES**：说明主要替代路线为什么当前不值得选。
- **STOP_CRITERION**：在回答已经能让用户直接行动前，不得因为找到一个“看起来合理”的中间方案而提前停止。

### regression requirements

后续 Reasoned Decision 回放必须覆盖本案例，并至少满足：

1. 首轮不得先设计用户无权接入的 Challenger / Judge / runtime 架构。
2. 必须先查清用户现实控制面，再讨论如何落实。
3. 当用户明确要求“按 Reasoned Decision 去查”时，不能只引用内部框架；必须主动完成会改变推荐的外部证据调查。
4. 若问题涉及“别人怎么做”，应主动覆盖多个独立真实用户社区或公开项目，而不是等用户再次追问“依据呢”。
5. 必须把“减少过度挑战”与“取消独立纠错”分开，不能用“永远相信用户 / 不要反驳”作为默认解决方案。
6. 必须比较“通用个性化基线 / Project 规则 / 专门插件”等现实候选，并给唯一默认建议。
7. 当前证据若只支持“先改个性化并把机制吸收到 Reasoned Decision”，不得为了架构完整性再造一个新插件。
8. 最终答复应一次包含：实际入口、证据、别人怎么做、推荐方案、主要替代方案为什么不选。
9. 用户不应再通过连续追问“怎么落实 → 入口在哪 → 按 RD 查 → 依据呢 → 别人怎么做”来完成本应由 Agent 自己完成的研究流程。

### project-specific context

GPT-6、Challenge/Mainline、ChatGPT 个性化、Project Instructions 是本案例的具体载体。通用问题是：

> **现实决策必须先确认用户真正可用的行动面，再完成足以改变排序的证据调查，并在首轮把“可实施方案 + 依据 + 默认推荐”闭环交付，而不是让用户逐轮替 Agent 补研究计划。**

## 2026-11-13：Mac mini 本地 Agent 选型连续改口暴露 Parameter Evidence / Failure Attribution / Solution-Space Discovery 缺口

status: NEW  
owner: Reasoned Decision  
primary area: Judgment Integrity / Solution Design  
related area: Task State Integrity / Decision Frame Integrity / Research Completeness  
source: 2026-11-12 至 2026-11-13 的真实 ChatGPT thread，目标是在 32GB Mac mini 上为两个此前失败的长 Agent 任务收敛可交付的本地方案。  
evidence: 当前 thread 的完整多轮记录；相关本机实测、canonical 配置与历史淘汰记录位于用户的 Local_Compute_Infrastructure；公开调查覆盖当前版本 OpenCode、DeepSeek Harness、MLX、模型官方说明、GitHub Issues/Discussions 与社区实测。本文只记录决策行为缺口，不冻结任何具体模型或参数结论。

### problem

用户的目标一直很简单：

> 在 32GB Mac mini 上，找到一套本地 Agent 方案，至少能把两个此前失败的真实任务做完并留下可用 Markdown；用户愿意让 Codex 半夜跑 2 个模型 × 2 个软件做真实验收。

前几轮模型却反复在没有完成证据调查的情况下直接给出“最终方案”：

1. **先把一个已经被本机真实淘汰并删除的模型重新推荐为长 Agent 主模型。**  
   旧线程和 canonical repo 已经记录该模型在同机长任务中速度慢、工具循环、零文件交付，并因此被替换。模型却只因为型号更新、公开 benchmark 强，就把它重新提升为默认主模型，没有提供任何合法 Decision Delta，也没有先检查 DO_NOT_REVIVE。

2. **把一组参数直接写成部署值，却没有证明它们最优或甚至合理。**  
   例如 context、output、buffer、keep、headroom 等数值被直接列为“下一步就部署”的参数。用户追问后才发现：
   - 某个更高 output 上限其实已经在本机真实试过，仍然失败；
   - DSH 官方明确写明部分默认压缩比例“尚未决定”，没有语料支持的最优值；
   - 不同 Harness 的压缩公式根本不同，不能用同一组数字类比；
   - 不同模型的官方 Agent / non-thinking 采样参数也不同，不能默认共用一套 temperature / top-p / penalty。

3. **在没有因果证据时，把失败归因为插件 / 交付机制。**  
   早期回答把“没有提前落盘”“planning-with-files 没启用”提升为主要根因，并据此设计强制落盘协议。但后续调查发现：
   - 两个当前 Harness 都已经自带原生的长任务目标持续机制；
   - OpenCode 当前版本自带 /goal、逐轮 reviewer 和继续执行逻辑；
   - DSH 当前版本自带 persisted goal、round driver、session checkpoint、tool-result pruning 和 repeat-tool reminder；
   - planning-with-files 的公开评测虽然证明它能强化文件化计划与恢复，但没有直接证明它就是用户这两个失败任务的缺失环节，而且其公开宿主兼容验证版本与用户当前 DSH 版本并不完全一致。
   
   因此“插件问题”最多是候选假设，不能在 Gap Proof 之前写成根因。

4. **没有先做完整的现实解空间调查，就开始设计 2×2 实验。**  
   第一版夜跑矩阵只比较手头两只模型和两个 Harness，没有先检查：
   - 32GB Apple Silicon 当前还有哪些真正可行的本地 Agent 模型；
   - 哪些候选因为权重、KV、工具调用协议或当前 MLX 兼容性应直接淘汰；
   - 当前安装的软件版本是否已经新增原生能力，足以替代第三方插件；
   - 旧 Issue 是否仍适用于当前版本，还是已经发生实现变化。

5. **把“找到一个可能解释失败的机制”误写成“已经找到根因”。**  
   实际失败可能同时来自：
   - 模型工具调用与规划能力；
   - Harness 的 goal / continuation 行为；
   - context / compaction 策略；
   - output truncation；
   - thinking / reasoning 模式；
   - 采样参数；
   - 本机内存与 swap；
   - 网页 / GitHub 工具循环；
   - 最终文件写入与完成判定。
   
   如果没有做最小区分实验，任何单层归因都只是 hypothesis。

6. **用户必须连续追问，才迫使调查质量逐轮提升。**  
   用户依次追问：
   - “为什么这个参数就是最好的？”
   - “为什么相信是插件问题？”
   - “有没有彻底网上搜清楚？”
   - “按 Reasoned Decision 一步步走了吗？”
   
   这些本来都应该由 Reasoned Decision 在第一次强推荐前自动完成。

### what improved in the later round

后续一轮的研究行为明显改善，但**该轮技术结论本身仍只是更有依据的候选，不自动升级为正确答案**。

改善点包括：

- 重新读取 Reasoned Decision 自身的 Task State / Judgment / Solution Design 规则；
- 回读用户 canonical repo，而不是只相信上一轮聊天总结；
- 发现并执行 DO_NOT_REVIVE：确认已淘汰模型不能因新 benchmark 无证据复活；
- 查当前软件版本的源码、Release、Issues，而不是把旧版本故障直接套到新版本；
- 发现两个 Harness 自带的原生 goal / continuation / compaction / checkpoint 能力，先考虑 Adopt，再讨论是否需要第三方插件；
- 对每个参数追问来源：官方推荐、软件默认、本机实测、数学推导还是仍待验证候选；
- 开放搜索其它 32GB 可行模型，并按内存、工具调用兼容、当前运行栈复杂度淘汰，而不是只比较已安装候选；
- 明确把“当前有更强证据”与“已经 Production-worthy”分开。

这个差异正是本案例要保留的重点：**Reasoned Decision 的价值不是让最后一轮显得更复杂，而是让推荐在出现之前就有可追溯依据，并保持“仍未知”这一合法状态。**

### why this matters

这类失败会制造一种很危险的“工程确定感”：

- 参数表看起来非常具体；
- 模型、Harness、插件都有名字；
- 甚至给出了完整夜跑 prompt；
- 但每个关键选择的来源和推翻条件都没有被证明。

用户看到的是一套可以执行的方案，却无法知道：

- 这是官方推荐、现场实测，还是模型临时猜的；
- 哪一层证据支持“根因”；
- 哪个参数只是保守候选；
- 为什么不是另一个模型 / Harness；
- 如果失败，结果能否真正区分原因。

对于会消耗数小时本机运行时间、下载几十 GB 模型或修改长期配置的任务，这种“精确但无依据”的回答成本很高。

### minimum contract to evaluate

Reasoned Decision 在软件 / 模型 / Agent / 基础设施调优任务中，至少应维护：

- **SUCCESS_CRITERION**：最终必须解决什么现实问题；benchmark 或中间能力不能替代最终交付。
- **CURRENT_CONTROL_SURFACE**：当前真实安装版本、配置、硬件、现有插件和原生能力。
- **ELIMINATED_ROUTES / DO_NOT_REVIVE**：已被现场证据淘汰的模型、参数和架构；没有合法 Decision Delta 不得复活。
- **SOLUTION_SPACE_DISCOVERY**：在设计实验前，开放调查现实可行候选，而不是只验证模型最先想到的两三个名字。
- **FAILURE_LAYER_MAP**：把可能失败层分开，例如模型、推理服务、Harness、压缩、工具、资源、交付，不允许从共现直接跳到单一根因。
- **PARAMETER_PROVENANCE**：每个关键参数必须标明它属于：
  1. 官方明确推荐；
  2. 软件默认；
  3. 用户机器真实验证；
  4. 根据明确公式 / 约束推导；
  5. 仍需实验裁决的候选。
- **VERSION_APPLICABILITY**：Issue、源码、文档与用户实际版本必须对齐；旧版本故障不能自动继承到当前版本。
- **NATIVE_BEFORE_PLUGIN**：加入第三方插件前，先证明当前产品 / Harness 的原生能力不能覆盖该需求。
- **GAP_PROOF**：若要增加插件、改运行栈或下载新模型，必须说明现有能力具体缺哪一块，为什么 Compose / Extend 仍不够。
- **DISCRIMINATING_TEST**：真实实验必须能区分关键假设；不得同时改模型、参数、Harness、插件后仅凭成功 / 失败猜原因。
- **CONFIDENCE_STATE**：区分 Candidate、Conditionally Recommended、Recommended、Production-worthy，不因回答变长或资料更多自动升级置信度。

### regression requirements

后续 Reasoned Decision 应加入本案例回放，至少满足：

1. 给出 2×2 本地 Agent 验收方案前，必须先读取当前硬件、真实配置、历史失败和已淘汰路线。
2. 已经被本机长任务证据淘汰并删除的模型，不得只因最新 benchmark 强就重新推荐；必须给合法 Decision Delta。
3. 不得把任何 context / output / buffer / keep / headroom 数值称为“最佳”或直接冻结为部署值，除非有相应强度的证据。
4. 每个关键参数都应能回答“这个数字从哪里来、为什么适用于当前模型和 Harness、什么证据会推翻它”。
5. 某次失败同时可能由模型、Harness、压缩或资源造成时，不得直接写“根因是插件 / 输出长度 / 模型”；必须先列出可区分的 failure layers，并找最小裁决实验。
6. 在推荐第三方 planning / memory / guardrail 插件前，必须先检查当前版本是否已经有原生 goal、checkpoint、compaction、continuation 或相似能力。
7. 旧版 GitHub Issue 与当前版本实现不一致时，必须重新核当前源码 / Release，而不是沿用旧结论。
8. 模型候选必须来自开放式现实调查；不得只比较“已经安装的两个”或“模型先想到的两个”。
9. 新候选若会要求新推理运行栈、补协议适配或显著增加维护成本，复杂度本身必须进入排序。
10. 真实夜跑前，应先裁决那些会使整晚实验失去解释力的前置未知，例如工具调用是否正常、goal 是否能持续和关闭、压缩策略是否真的按预期触发。
11. 用户不应再通过连续追问“参数凭什么 → 为什么是插件 → 有没有网上查 → 按 RD 重做”来替 Agent 补研究流程。
12. 最终即使形成了一个更有依据的新候选，也必须允许明确写：**当前研究行为比上一轮可靠，但结论仍待真实环境验证。**

### project-specific context

Mac mini、GLM、Qwen、OpenCode、OpenChamber、DeepSeek Harness、MLX、planning-with-files、具体 context / output 数值是本案例的载体，不应直接变成 Reasoned Decision 的永久偏好。

通用问题是：

> **在复杂工程选型与调优中，不能把“具体的名字和参数”当成证据。推荐前必须先建立现实解空间、继承历史淘汰状态、区分故障层、追溯参数来源，并把实验设计成能真正裁决关键未知；证据不足时，保持 Candidate / Unknown 比拍出一套可执行但无法解释的方案更可靠。**


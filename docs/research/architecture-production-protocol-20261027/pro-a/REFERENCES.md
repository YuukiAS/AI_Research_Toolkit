# 来源、采用方式与证据限制

检索和读取截止：2026-10-27。历史项目采用固定Git对象；外部方法优先原作者、研究机构和官方文档。所有外部方法均为 `REFERENCE_ONLY`，本轮未移植其代码、图表或成段文字，未新增依赖。若将来要复用代码，须另查具体仓库、版本及许可证；本报告的参考引用不构成代码使用许可。

## 1. 项目与治理来源

| 来源 | 版本／锚点 | 本轮用途 |
|---|---|---|
| 本轮强制案例 | `7011b1f1aa7eaccbd6ec5bcd1145bde87b9f5f97`中的[强制说明](https://github.com/YuukiAS/AI_Research_Toolkit/blob/7011b1f1aa7eaccbd6ec5bcd1145bde87b9f5f97/docs/research/architecture-production-protocol-20261027/00_MANDATORY_NEGATIVE_CASES.md) | 必读范围、特定里程碑和证据边界 |
| 前一日架构研究 | 共用原始基线 `23a1c4840f665e66f7af95ffadaadd96dc999e7f`中的[用户要求](https://github.com/YuukiAS/AI_Research_Toolkit/blob/23a1c4840f665e66f7af95ffadaadd96dc999e7f/docs/research/architecture-workflow-20261026/01_USER_REQUIREMENTS_ZH.md)、[既有候选](https://github.com/YuukiAS/AI_Research_Toolkit/blob/23a1c4840f665e66f7af95ffadaadd96dc999e7f/docs/research/architecture-workflow-20261026/02_OPTIONS_AND_RECOMMENDED_MECHANISM_ZH.md) | 用户时间与并行偏好；避免把已有机制重复当新结论 |
| AI Skills治理 | `5d4b1432f96742646e00ad279a054359b1aec1da`中的[AGENTS](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/AGENTS.md)、[Planner合同](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/workflows/PLANNER_ROLE_CONTRACT.md)、[Critic合同](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/workflows/CRITIC_ROLE_CONTRACT.md) | 公平的当前基线与实际角色边界；不以旧事故倒推新合同 |
| Bridge历史 | main `bc94e41...`；历史实施分支截至 `2813318...`；原始与结果各用实际SHA | 完整链在[专项报告](BRIDGE_KIT_011_FAILURE_ANALYSIS.md)；[42项来源](evidence/source_manifest_bridge.json) |
| Slurm历史 | `5d4b143...`维护快照及关键原提交；另核`a92dc472...`与`1b8df2c...`的v0.3相同blob | 逐回合链在[专项报告](SLURM_ROUTING_AND_CANCEL_FAILURE_ANALYSIS.md)；[来源清单](evidence/source_manifest_slurm.json)及[root补证](evidence/source_manifest_root.json) |
| Mica／CAT／STAT／Clear Writing | 固定ref与精确路径在[跨项目来源](evidence/source_manifest_cross.json) | [跨项目分析](CROSS_PROJECT_CASES.md)，含本轮两项有限复核 |
| Asteria／evolution／showcase／DA | 固定ref与精确路径在[root来源](evidence/source_manifest_root.json) | 当前工具能力、结构合同、产品共同盲区与分阶段证据 |

来源数量只用于定位，不作为质量或完整性得分。原始执行报告的存在支持“曾有此记录”，只有实际重跑的两项检查才标本轮复算。缺完整聊天、私有原始日志或历史环境时保留UNKNOWN；不以文档日期代替cutoff存在证明。

## 2. 成熟方法与研究

### R1. SEI：Architecture Tradeoff Analysis Method

Software Engineering Institute，*Architecture Tradeoff Analysis Method Collection*，机构合集页，2018-02-14。[官方来源](https://www.sei.cmu.edu/library/architecture-tradeoff-analysis-method-collection/)。本轮读取方法说明，采用以业务目标和质量场景识别风险、敏感点及取舍的思路。它不证明用户需求集合完整，也不替代真实宿主证据；不照搬完整会议组织成本。

### R2. SEI：经济考虑与CBAM

J. Asundi、R. Kazman、M. Klein，*Using Economic Considerations to Choose Among Architecture Design Alternatives*，2001。[官方记录](https://www.sei.cmu.edu/library/using-economic-considerations-to-choose-among-architecture-design-alternatives/)。本轮检索到官方概要；打开正文超时，**没有声称读过完整技术报告**。仅用于支持把不确定收益、成本和架构取舍放在同一决策框架的来源定位；本报告的公式和假设演示是自行定义，未借该文估计p/q或投资回报。

### R3. 集合式并行工程

Lean Enterprise Institute，*Set-Based Concurrent Engineering*，词条；页面未给本轮可确认的发布日期。[机构来源](https://www.lean.org/lexicon-terms/set-based-concurrent-engineering/)。采用在证据足够前保留多条可行路线、逐步排除的组织思路。它是方法说明，不是本项目AI多模型对照试验；不据此主张每个任务都要完整开发多套方案。

### R4. 架构决策记录

Michael Nygard，*Documenting Architecture Decisions*，2011-11-15。[原作者文章](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)。读取原文，采用保留背景、决定、后果及被替代记录的轻量方式；本协议把“meaningful revision”限定为改变架构决定，不要求每个普通提交产生新报告。

### R5. 信息隐藏与模块划分

David L. Parnas，*On the Criteria To Be Used in Decomposing Systems into Modules*，Communications of the ACM 15(12)，1972，1053–1058，DOI：[10.1145/361598.361623](https://doi.org/10.1145/361598.361623)。出版商页面本轮返回403；读取了[大学课程托管的原论文数字化转载](https://www.cs.lafayette.edu/~gexia/cs301/resources/parnas.html)，该转载自己声明可能有转录误差。

采用围绕可能变化的设计决定划分责任、减少接口暴露的思想。将其具体应用到Bridge adapter和Slurm runtime边界，是本研究推断；原论文并没有测量这些项目的返工节省。

### R6. AWS形式化方法经验

Chris Newcombe、Tim Rath、Fan Zhang、Bogdan Munteanu、Marc Brooker、Michael Deardeuff，*Use of Formal Methods at Amazon Web Services*，2014-09-29。[原论文PDF](https://lamport.azurewebsites.net/tla/formal-methods-amazon.pdf)。读取正文中精确设计、并发和失败状态相关部分。采用关键不变量必要时先精确建模的原则；不把模型检查当宿主接线或全部故障的自动证明。该文还记录过未检查liveness就漏掉对应缺陷，支持明确验证范围而非把某类工具当万能证明。

### R7. 多Agent失败分类

Mert Cemri等，*Why Do Multi-Agent LLM Systems Fail?*，arXiv:2503.13657，固定阅读v2，2025-04-22。[论文v2](https://arxiv.org/html/2503.13657v2)。读取摘要、引言与分类范围说明。其规范／系统设计、agent间协调、验证问题分类为本研究提供诊断参照。论文明确不穷尽所有失败类型；其任务、模型、基准与本用户架构工作不同，本研究不移用失败率、准确率或干预效果数字。

### R8. 独立生成与相互讨论的贡献应分开

Hyeong Kyu Choi、Xiaojin Zhu、Sharon Li，*Debate or Vote: Which Yields Better Decisions in Multi-Agent Large Language Models?*，arXiv:2508.17536，v1为2025-08-24，v2为2025-10-23。[版本记录与摘要](https://arxiv.org/abs/2508.17536)、[本轮查看的v1正文](https://arxiv.org/html/2508.17536v1)。读取摘要和理论设定相关部分，不声称复核其全部证明或复现实验。

采用将独立候选／投票与辩论增量分开比较的启发。其特定基准结果与有假设的随机过程定理，不证明所有架构讨论无效，也不证明架构可以多数决。复杂架构仍须单一负责人依据约束与证据裁决。

### R9. 简单组合、路由与并行

Anthropic，*Building effective agents*，2024-12-19。[官方工程文章](https://www.anthropic.com/research/building-effective-agents)。读取routing、parallelization、orchestrator-workers和evaluator-optimizer相关部分。采用让增加复杂度有明确目的的原则，保留有清晰评价标准和可测增量的迭代审查。页面提示工具生态已变，本研究不把其中产品示例当2026年能力事实或部署建议。

### R10. 结果评估与代理任务测试

Anthropic，*Demystifying evals for AI agents*，2026-01-09。[官方文章](https://www.anthropic.com/research/demystifying-evals-for-ai-agents)。读取其任务、轨迹与结果评估相关说明。用于提醒评估实际结果和完整执行轨迹，避免只看最终文字；本轮自己的历史分层、泄漏控制与指标设计仍需独立校准，未声称该文章验证了本协议。

## 3. 文献究竟贡献了什么

成熟方法支持场景、明确决定、并行保留路线、信息价值、状态不变量和模块边界等原则。它们没有提供本任务的真实p/q/L，也没有比较Chat Pro、GPT Work与Codex在用户这些仓库上的效果。唯一推荐主要由具体历史链、用户成本偏好和可执行角色边界共同导出；默认模型数量是可校准政策，不是引用文献后得到的定理。

本轮没有为追求“最新”加入未核实的模型排行榜，也不依赖商业价格或变化中的产品能力。将来运行协议时，具体模型和工具支持仍须按当时环境核查。

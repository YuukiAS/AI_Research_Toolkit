# 研工台 v0.6：从复杂产物事故到可实施运行架构的四卷中文说明

日期：2026-10-13。性质：**正式详细研究候选，不是已部署系统**。本目录只在原研究分支 research/software-production-decision-20261013 内维护，未来产品代码归属仍由用户决定。尚未获得用户架构认可，没有启动独立Critic、付费模型、六产品修改、CARE新训练或生产原生验收。

## 先看哪四个交付物

| 正文交付 | 真实内容 | 能回答哪类问题 |
|---|---|---|
| **[第一卷：运行架构与全部组件合同](01_ARCHITECTURE_AND_COMPONENT_CONTRACT.md)** | 任务/科学要求、专业插件、主Codex与子代理、Bridge已安装模式、真实观察、专业独立审查、准入、恢复、AGENTS维护等十二项实际职责；谁启动、输入/输出与正反例；运行与分权图 | “到底提出什么系统？每一部分谁负责？凭什么不重复造轮子？” |
| **[第二卷：六仓库与CARE事故归因](02_INCIDENTS_AND_CAUSAL_COVERAGE.md)** | 六仓库主账本246条的准确分母、Lucerna/Asteria晚期25项补查；CARE原40条和新增52条；每仓根因族、实际脚本或专业owner、何时发现、如何用正坏例防复发 | “到底发生了多少问题？哪些是历史已修/风险？新系统如何拦？” |
| **[第三卷：当前线程所有用户质疑](03_ALL_USER_QUESTIONS_AND_DECISIONS.md)** | 原八问与后续提出的Codex/子代理、插件谁调用、验收先后隔离、AGENTS自维护、返修成本、Asteria丑图、CUHK中文、跨机截图、CARE多模型等共21个具体问题与处理 | “少讲原则，谁真正做、何时做、失败怎么办、为何不再找我？” |
| **[第四卷：Lucerna完整新功能运行实例](04_LUCERNA_FULL_WORKED_RUN.md)** | 基于已有CloudflareR2Provider和development-acceptance.ps1，以拟议的R2用量提醒为例逐步到插件设计、主Codex子任务、真实状态链、保存/取消/重启、原生安全采集、Reviewer、GPT Work和真实交付 | “新功能为什么能一次交办、在内部完成基本QA，不再把大量P1交我？” |

另外提供 **[用于Codex编译20页以上PDF的完整提示词](05_CODEX_PDF_BUILD_PROMPT.md)**。它是*纯排版工作合同*，不批准实现研工台。源代码与原文都需要保留，PDF必须真正编译、渲染、统计有效页数，而非仅在Markdown写下“20页”。**PDF已经生成并提交**：参见 [正式PDF](exports/workflow_architecture_dossier_v0.6.pdf) 和 [构建报告](BUILD_REPORT.md)，原冻结提交 `dcc8b073c84174ede5c277776fdc31c01a9b943e` 已包含文件。构建方报告称76页、73页有效内容，SHA256为 `a641ae2875148f204208b6681d3f519f0ac98d4772912693ee4638cbf3079db9`；**独立Critic未实际取得二进制完成页级渲染审查**，不可把构建报告的质量声明当独立PDF验收。

## 不要把数字读成错误的科学结论

| 主登记 | 数量 |
|---|---:|
| Lucerna | 33 |
| Bobbio | 32 |
| Mica | 46 |
| SeminarArc | 32 |
| Asteria | 47 |
| CUHK Date | 56 |
| **六仓库主登记合计** | **246** |
| Lucerna/Asteria晚期补充编号 | 20 + 5（很多与主登记重叠） |
| CARE早期事故与检查漏洞编号 | 40 |
| CARE后续模型/工作流补充编号 | 52（部分复发/重叠） |

这里的“登记”包含不同类型：真实发生的缺陷、历史已修、当前检查器范围、仅为风险边界设计的义务和仍待验证的条件。**不是246次独立产品事故，更不是CARE92次独立训练失败。** 正文和原始台账分别说明状态；尚未穷尽MLoRA/FSCF、部分早期模型独立run和私有附件，不用数字伪装全部历史完成。

## 逐条来源与未来PDF附录

用户要求的不仅是正文里挑十例，所以最终PDF还应从以下原始文件收录全部编号登记作为可检索附录，而非只有引用链接：

- [Lucerna L01–L33](../04_SIX_REPO_AUDIT/LUCERNA.md)
- [Bobbio B01–B32](../04_SIX_REPO_AUDIT/BOBBIO.md)
- [Mica M01–M46](../04_SIX_REPO_AUDIT/MICA.md)
- [SeminarArc S01–S32](../04_SIX_REPO_AUDIT/SEMINARARC.md)
- [Asteria A01–A47](../04_SIX_REPO_AUDIT/ASTERIA.md)
- [CUHK Date C01–C56](../04_SIX_REPO_AUDIT/CUHK_DATE.md)
- [六仓库246项脚本/控制映射](../04_SIX_REPO_AUDIT/problem-control-map.csv)
- [Lucerna晚期与Asteria反证补充](../05_PROPOSED_ARCHITECTURE_V0_2/INCIDENT_ADDENDUM.md)
- [CARE初期40项](../07_CARE_AND_EXECUTABLE_REVIEW_V0_4/CARE_FAILURE_LEDGER.md)
- [CARE追加52项与模型谱系](../08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/CARE_LINEAGE_AND_CAUSAL_AUDIT.md)
- [本轮真实源码纯函数反证](../08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/probes/route_b_metric_dependency.result.json)
- [Bridge对CARE多角色机制的历史复盘](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/main/docs/CARE_AGENT_FLOW_V3_POSTMORTEM_20260811.md)

不要把逐条来源原文复制成新的独立“已验事故”，要保持证据层级和事件来源。原四卷中属于新系统组件的文件名均是**拟议接口**；已有项目脚本会在正文明确指出，不能因为写成了设计架构图就说它已接入研工台正常工作流。

## 如何判断这个方案值不值得信任

至少需要两个层面的证据。结构上，用户能查到每个职责确切由哪个合法入口启动，能看正面完整能力、具体负面拦截及正确错误分类；不会重复Bridge状态机。真实运行上，Lucerna历史同类低配与基本P1应在用户/GPT Work之前被发现、正确候选能够通过；CARE某旧错入口能在长训之前被拒、正确模型/诚实NO_GO不会误拒；小改不应承担所有重型成本；从一项任务到交付不要求用户重复派单和搬运截图。未实现/未真实试点前不能说已经“防住复发”，但任何在已覆盖范围仍放过历史坏例的试点必须宣布流程本身失败。

**后续审查已经发生，旧v0.6不再是当前推荐架构。** 用户提供的GPT-5.6 REJECT否定了独立中央运行体系；GPT-6 REVISE要求关闭真实Bridge阶段/预算和观察副作用边界。Planner的后续替代架构与逐项阻塞处置见 [v0.7新研究目录](../10_POST_CRITIC_REDESIGN_V0_7/README.md)。旧四卷/PDF保留为被审历史对象，不能从其中自动生成产品实现Goal。

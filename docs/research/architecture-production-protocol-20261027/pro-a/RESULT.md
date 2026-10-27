# pro-a 研究结论：证据驱动的并行架构收敛

**唯一推荐：用一个架构负责人统合设计，按具体未知并行取得证据，满足有范围的冻结条件即实施或结束，替代复杂任务固定往返的Planner–Critic顺序。** 独立批评保留为有明确问题的能力，不再作为每轮必经角色。

研究日期：2026-10-27。`RUN_ID=pro-a`。唯一写入分支：`research/architecture-production-protocol-20261027-pro-a`。共同原始基线：`23a1c4840f665e66f7af95ffadaadd96dc999e7f`。本轮未读取另外两个当前研究分支、提交、文件、PR或结果。此前历史研究按授权读取。

`RESEARCH_STATUS=COMPLETE`；`PRODUCTION_PROTOCOL_ACTIVATED=NO`；`STRICT_WORKFLOW_BENCHMARK=NOT_RUN`；`ISOLATED_INPUT_MICRO_REPLAYS=2`。本报告是完整独立候选，等待后续与独立Work事实核查汇合，不修改现行生产角色合同或项目机制。

## 1. 默认策略与最大改变

复杂L任务默认首批**一个Pro＋一个独立Work并行**。Pro负责设计与最终裁决；Work先只看原目标、事故、TODO和真实情境，固定任何方案必须回答的问题，再看候选。首批两个任务不等于全程只调用两次，必要冷读与成品验收另计。

已知危险外部前提时立即加Codex只读调查／最小探针；存在尚可行且会改变核心owner、算法或长期迁移成本的互斥路线时加第二Pro，先比较关键决定，必要时展开两份完整方案。第三Pro只为尚未覆盖的路线或独立专业论证。S直接处理；成熟M用一个主设计按需核查；XL由具体问题增加并行证据，不固定凑五六个角色。

最大改变是**把“下一轮轮到谁”换成“当前什么信息最可能改变决定”**，并把路线杀手前提移到大规模实施前。不是简单在原Planner–Critic后面再加Work、probe和冷读。

## 2. 真正Freeze与Asteria的职责

Freeze必须同时满足：已知能力与旧保护完整；关键组件展开到机制；接口有真实载荷与consumer；正常／失败／恢复路径和验证清楚；危险前提有相称证据或确实被隔离；独立高影响发现已处理；陌生实施者无需发明核心机制；版本、范围、自由度和返回条件明确。

Asteria应成为**完整性合同与冻结检查的表达载体**，连接能力、机制、来源、三轴状态、证据范围和修订影响。它不能自动发现整个场景遗漏、错误产品路线、科学错误或共同外部假设。当前Asteria与历史原型并未实现本报告全部通用gate；本协议可先在现有Git文档中执行，工具建设不是前置条件。

允许独立范围的有界Freeze和明确实验包，不能把代码开发许可签成完整产品就绪。用户明确延后实证时遵循已有授权，但保留未证前提，不把风险接受改写成证据通过。Codex仍只实施已选机制，不获得核心产品或算法决定权。

## 3. 历史最重要的发现

Bridge v0.8 execution-ready PASS后，完整实现与真实reader canary之间暴露平台隔离前提不成立，3小时16分后出现product scope reset。初始主动报告也已有旧TODO，却缺周期caller和consumer；reset后又补机器配置与生产者合同。历史支持早做平台probe、双向能力闭合、删除机制时保留能力，以及让表达／传输失败局部化。Bridge后来确实发布了0.11.0和0.11.1，不能把早期事故写成始终未交付。

Slurm既有成功的早期Phase0 probe，也有晚期真实Hook触发后Python缺动态库、宿主继续原操作的失败。最初v0.3已知道普通Hook错误可能放行，说明**再加表格并不足够，必须执行主张与证据的依赖门**。Routing多轮里有真正新需求，后期很多问题是普通实现bug；把它们全部重新规划会增加无益等待。用户延后候选live验证的授权也完整保留。

Mica显示动态界面事实和Codex承担产品机制的风险；CAT显示共享数值近似不能自证；STAT显示合适的代码范围PASS仍会出现局部接线bug；Clear Writing显示独立审查也会误归因；showcase显示两份候选仍可有共同产品盲区。详见[历史回放](HISTORICAL_BENCHMARK.md)及专项分析。

## 4. 下一执行者和停止规则

具体事实缺失去 `CODEX_FACT_CHECK`，关键运行／数值前提去 `CODEX_MINIMAL_PROBE`，核心路线竞争去 `SECOND_INDEPENDENT_DESIGN`，原始场景盲区去 `WORK_BLINDSPOT_AUDIT`，核心机制仍未定去 `RETURN_TO_ARCHITECT`，冻结合同内bug去 `LOCAL_CODEX_FIX`。必要冷读完成且证据闭合后直接 `FREEZE_AND_IMPLEMENT`；只请求设计则 `FREEZE_AND_END`；成品需要独立判断时 `WORK_FINAL_ACCEPTANCE`。

负责人输出唯一动作或已经排好的并行批次，不让用户从菜单挑角色。已有授权继续有效；缺实际自动接力工具时提供填好参数的下一条消息，不声称跨应用调度已经部署。

所有当前冻结条件成立且没有可命名的高价值信息需求时，停止一般审查。普通追问不重开设计；新需求、反证、来源纠正或关键条件变化才修订受影响部分。局部实现不因无关finding全部作废。

## 5. 证据强度与可被推翻的部分

本轮回读真实Git快照，整理24条不同用途的历史记录，提供cutoff输入资格索引，并完成CAT有限数值复算、STAT确切函数控制流复核、敏感性算术和23个确定性路由场景。主体历史整理标为retrospective analysis；另补[两次新上下文微回放](evidence/CUTOFF_MICRO_REPLAY_REPORT.md)，分别提出reader隔离和确认权来源的关键问题。它们没有完整流程基线或真实runtime，不提供模型检出率或节省百分比。

历史支持关键机制，尚未证明整套协议的前瞻净收益。默认一个Pro＋一个Work是明确可校准政策，不是已测最优配置。若同等资源的强化Planner–Critic更少人工负担与返工，若Work缺独有信息，若结构维护或probe锚定成本过高，或Bridge／Slurm的反事实被证伪，应按[校准计划](CALIBRATION_PLAN.md)修改相应规则。当前1.7合同已经包含若干成熟规则，本研究没有把它们重新冒充发明。

## 6. 阅读与复核入口

| 要回答的问题 | 文件 |
|---|---|
| 唯一推荐及分档、职责和停止条件 | [FINAL_PROTOCOL.md](FINAL_PROTOCOL.md) |
| 公平基线、候选与为何选这一套 | [BASELINE_PLANNER_CRITIC.md](BASELINE_PLANNER_CRITIC.md)、[CANDIDATE_PROTOCOLS.md](CANDIDATE_PROTOCOLS.md) |
| 两条强制负面案例的完整返修链 | [BRIDGE_KIT_011_FAILURE_ANALYSIS.md](BRIDGE_KIT_011_FAILURE_ANALYSIS.md)、[SLURM_ROUTING_AND_CANCEL_FAILURE_ANALYSIS.md](SLURM_ROUTING_AND_CANCEL_FAILURE_ANALYSIS.md) |
| 多项目历史、可观察成本和回放资格 | [HISTORICAL_BENCHMARK.md](HISTORICAL_BENCHMARK.md)、[CROSS_PROJECT_CASES.md](CROSS_PROJECT_CASES.md)、[BENCHMARK_DATA.json](BENCHMARK_DATA.json) |
| 未知概率、成本和相关失败如何处理 | [SENSITIVITY_ANALYSIS.md](SENSITIVITY_ANALYSIS.md) |
| Asteria能检查和不能检查什么 | [ASTERIA_COMPLETENESS_ROLE.md](ASTERIA_COMPLETENESS_ROLE.md) |
| 陌生Codex怎样验证可实施性 | [IMPLEMENTATION_READINESS_CHALLENGE.md](IMPLEMENTATION_READINESS_CHALLENGE.md) |
| 真Freeze、交接和局部返修 | [FREEZE_AND_HANDOFF.md](FREEZE_AND_HANDOFF.md) |
| 下一位执行者和稳定路由演示 | [DYNAMIC_ROUTING_POLICY.md](DYNAMIC_ROUTING_POLICY.md)、[analysis](analysis/README.md) |
| 明确预测、试点和改变推荐的证据 | [CALIBRATION_PLAN.md](CALIBRATION_PLAN.md) |
| 不可变来源、成熟方法与采用边界 | [REFERENCES.md](REFERENCES.md)、`evidence/source_manifest_*.json` |

早期写入与远端回读已在提交 `0e3149a0fb9a1a365092649b1333d8f06f308eaa` 完成，见同目录既有 `WRITE_ACCESS_CHECK.md`。最终交付经过本地完整性检查后提交到唯一允许分支，并按最终提交回读核对；最终提交身份以本分支本次交付提交及对用户的简短结果为准，避免在文件中写入无法自引用的hash。

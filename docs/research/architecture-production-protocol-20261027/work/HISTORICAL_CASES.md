# 跨项目历史案例

这是按已知事故选取的目的性样本，不是所有项目的随机样本。它适合检验“某方案是否能应对这类失败”，不能估计总体失败率。Bridge 与 Slurm 详见两份专门时间线；以下补足其他任务类型。

| 项目 | 实际证据 / 失效 | 发生阶段 | 有针对性的历史支持 |
| --- | --- | --- | --- |
| Mica | 路线图与功能逐项覆盖，真实 ChatGPT 动态 UI 的来源、登录、capture/replay 仍缺机制 | 设计审查后、用户追问；未证明这次已大规模实施 | 能力追到输入来源；真实 UI 取证调查 |
| CAT-TRACE | 同一近似的两份实现可以一致却共同错误；外层优化合同仍留给执行者选择 | 规划 probe / readiness；后来还有数值可靠性问题 | 独立解析 oracle、小样例数值 probe、科学与代码正确性分离 |
| STAT5060 Validator | READY 后撤回；registry 不等于 literal enforcement graph，prompt 引用不存在模块，oracle 权限未闭合 | 主要在正式实施前 | source anchor、真实模块调查、可执行 handoff dry-run；独立 oracle |
| Asteria | Work 黑箱 gate 后用户发现整体可读性与交互缺陷 | 真实成品验收 | 新候选真实渲染与用户任务验收；不能只累积小检查 PASS |
| Delivery Assurance / architecture-evolution | 纯设计状态与未来运行机制；结构化架构提高显性闭合 | 设计阶段 | design / implementation / evidence 分开，避免虚报运行完成 |
| Research Authoring / Presentation | 正常入口、增量保护与独立验收没闭合；用户继续当首次版式 QA | 架构与 artifact 阶段 | 共享入口、未知增量、独立冻结 rubric、整页验收 |

## Mica：能力数和 roadmap 完整度不能替代现实入口

10-26 案例记录 14 步、95 项要求、34/34 功能及两轮审查后，用户追问“GPT-6 交互回答怎么生成、怎么登录、怎样捕获和回放”才暴露缺口。该记载属于用户案例整理，不是本研究看到了完整原始聊天，不能把两轮换算成两次已核实模型调用。[M1:5–39](https://github.com/YuukiAS/AI_Research_Toolkit/blob/23a1c4840f665e66f7af95ffadaadd96dc999e7f/docs/examples/MICA_REAL_UI_EVIDENCE_GATE_FAILURE_2026-10-26_ZH.md#L5-L39)

同时读取的实际 ROADMAP 与 ChatGPT contract 显示 native actions/math/streaming 等真实界面事实仍有 UNKNOWN。仓库证据限定这轮变化是 ROADMAP，并不支持“代码已全部完成后报废”的说法。[MR](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/af3cdc9399eef90a44a6286f02faa5a9a47305af/docs/ROADMAP.md)、[MG](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/af3cdc9399eef90a44a6286f02faa5a9a47305af/contracts/chatgpt/current.json)

另一份 Mica R2 Critic 是特定时点的 Planner admission PASS；用户明确调整基础编辑、低内存、高亮 PDF 优先级后，不要求再走第三轮。不要把这个 10-12 review 和 10-26 案例提到的“两轮”未经证据合并为同一对象。[M2](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/reviews/2026-10-12-mica-product-system-critic-r2-verdict.md)

**反事实靶点：** 从“浏览真实回答”反向追 input、来源、权限、动态状态、capture/replay、验收。第二独立方案可能想起，但真实浏览入口调查更直接。仅有组件机制表且共同忘了真实回答这个场景，仍会全绿。

## CAT-TRACE：最小科学反例比共同实现自洽更强

独立规划 probe 使用 q=0、n=1 的解析结果 `I0=p/(p+gamma)`。在 p=1000、gamma=3 时，解析 log integral 约 -0.0029955，而被检查的 Laplace 近似约 0，加权误差约 2.9955；n=100 的例子加权误差约 15.6285。原文还展示有限 p 截断收敛可能很慢。[C1](https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/probes/ZERO_SLOT_LAPLACE_FINDING.md)

这不证明“Laplace 在所有任务都不能用”，而是否定该任务中未经限定的精度承诺。两个共享相同近似的代码实现对拍通过，也不能证明科学正确。Asteria 可以要求 algorithm owner、参考值与精度域，却不会自动推导这个积分。

R1 resolution 列出外层 profile、数值合同、C04、RNG 与机器可读协议等执行缺口，其中有让 implementer 选择核心行为的问题。R6 则把 Alpha 限定在 C00/C01/C02 synthetic/C04 finite-p reference，保留 zero-slot blocker，明确不再开 R7。这个正例证明停止审查可以依赖**明确冻结子范围与保留阻塞**，而非“所有科学问题消失”。[C2](https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/reviews/CRITIC_REVIEW_R1_RESOLUTION.md)、[C3](https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/reviews/CRITIC_REVIEW_R6_RESOLUTION.md)

后续 reliability 记录又区分 correctness PASS 与更大规模 ESS 等可靠性条件；fixed GH81 oracle 的一组 12/12 失败，与 adaptive 两种参数化 960/960 稳定形成对照。它们是该特定网格/实验的记录，不能换算通用准确率。也不能把未证实的 vectorization bug 当根因。[C4](https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/C04_REF_RELIABILITY_INVESTIGATION_CHRONICLE_20260923.md)

**历史支持：** 尽早购买独立数学/数值证据；不支持“多一个通用 Pro 必然替代领域 probe”。本研究没有重跑数值实验。

## STAT5060：最接近可审计的“假 ready”对照

精确历史 commit `c4885af5108316e90d40852502c432745eb84893` 的审查顶部写 PASS—READY FOR IMPLEMENTATION，并声明只做架构一致性检查、未宣称 validator 已实现。后续同一文件撤销旧状态。[VH:1–7](https://github.com/YuukiAS/STAT5060-TA/blob/c4885af5108316e90d40852502c432745eb84893/results/validator-architecture-v1/FINAL_READINESS_AUDIT_V1.md#L1-L7)、[V1](https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-architecture-v1/FINAL_READINESS_AUDIT_V1.md)

后续补齐的三组事实是：历史反馈要连到 literal rule/enforcing-validator edges，handoff 要能实际执行，candidate/control/original-source identity 要冻结。V3 disposition 还指出不存在的 Tutorial 模块、self-certification、digest 与 verdict/runtime/status 混用。[V2](https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-architecture-v2/CRITIC_BLOCKER_CLOSURE_V1.md)、[V3:79–199](https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-architecture-v3/CRITIC_FINDING_DISPOSITION_V1.md#L79-L199)

Critic 同样可能过度规定实现形式：要求再手工维护 400+ 行表被合理反驳，改成冻结 inputs + protected deterministic materializer + literal outputs/receipt。独立语义证据也不必误缩为唯一某种 Bridge 模型通道。这里是**finding 核心有效、处方过度**，不应把整个 finding 计为无关，也不应全盘照单执行。[V3:16–77](https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-architecture-v3/CRITIC_FINDING_DISPOSITION_V1.md#L16-L77)

V4 仍诚实要求独立 review；evaluator-run 在固定 Bridge 基线不存在，不能拿 mock 或 self-review 冒充。当前样本主要是 pre-implementation gap，不支持给它计入开发后大量代码报废。[V4](https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-architecture-v3/ARCHITECTURE_CLOSURE_V3.md)

## Asteria：Work 的 PASS 同样受问题框架限制

RC8 final gate 对 W05/W06 做当前目标复验，其他检查沿用 RC6/RC7 证据；不能称为六个 Work 对 RC8 完整独立重验。随后用户报告六类阻塞：节点/边遮挡、选中时重排运动、文字裁切、raw math、模板文案、边标签质量。[A2](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/docs/operations/blackbox-audit/reports/RC8_FINAL_BLACKBOX_GATE_2026-09-13.md)、[A1:17–91](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/docs/operations/acceptance/RC8_HUMAN_ACCEPTANCE_FAILURE_2026-09-13.md#L17-L91)

历史复盘指出审查 prompt 没覆盖整体视觉、动态点击等任务，并接受了后来用户认为不能接受的 P2。RC14 后又有整体视觉修订。真实验收中的“完整成品可读”不能从若干局部图形/功能断言相加得到。[A3](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/docs/operations/acceptance/RC14_HUMAN_VISUAL_REVIEW_FAILURE_2026-09-14.md)

这削弱了“换成 Work 就自动独立”的假设。角色独立、输入问题独立、证据独立是三件事。Asteria 软件自身质量失败，也不意味着 Architecture Completeness Contract 没用；二者检验对象不同。

## Delivery Assurance 与历史 architecture-evolution

历史 DA CURRENT 明确 `R3 PROCEED` 同时 `READY_FOR_CODEX=NO`、`PRODUCTION_IMPLEMENTED=NO`，是纯设计阶段不冒充运行完成的正例。[DAOLD](https://github.com/YuukiAS/AI_Research_Toolkit/blob/ae2766a62b1546048ec6122e01ee95f1904fb73c/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/CURRENT.md)

后续结构化研究提出 component mechanism、relation payload/consumer、source anchor、revision 与 design/implementation/evidence 分离。这些是候选约束和 stress test，不是已经量测出的遗漏下降率。实际新 wiring 尚未建成的地方不能从结构齐全推断功能已交付。[E1](https://github.com/YuukiAS/AI_Research_Toolkit/blob/c733aa065d9ad102a64bb5f5f55453cd31a7e7bc/docs/research/architecture-evolution-system-20261027/pro-a/RESULT.md)、[E2](https://github.com/YuukiAS/AI_Research_Toolkit/blob/c733aa065d9ad102a64bb5f5f55453cd31a7e7bc/docs/research/architecture-evolution-system-20261027/pro-a/ARCHITECTURE_DESIGN_METHOD.md)、[E3](https://github.com/YuukiAS/AI_Research_Toolkit/blob/c733aa065d9ad102a64bb5f5f55453cd31a7e7bc/docs/research/architecture-evolution-system-20261027/pro-a/THREE_PROJECT_STRESS_TEST.md)、[D1](https://github.com/YuukiAS/AI_Skills_Collection/blob/fd6916ad5fdd5fb905544b6a127f9b0d31a737e1/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)

complex-system-showcase 的历史对照记录两位模型主页都没有用户所需的全系统架构图。它不是本轮两个 Pro，也不是随机试验；但确实给出“并行两模型也可共享遗漏”的案例。[D2:5–14](https://github.com/YuukiAS/AI_Research_Toolkit/blob/23a1c4840f665e66f7af95ffadaadd96dc999e7f/docs/research/complex-system-showcase-20261026/01_SECOND_ROUND_QUALITY_EVIDENCE_ZH.md#L5-L14)

## Plugin / Artifact：Research Authoring 与 Presentation

RA059 v0.1 Critic 明确发现唯一共享入口缺失、增量更新保护不足、Gate 尚不可执行，以及 tracking owner。前三项有直接产品意义，第四项是治理成本，不能同权计算。v0.3 只复核未关闭的 RA3，冻结 raw-evidence greenfield + 未见增量、候选/rubric 先冻结再评审。[P1](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/059_RESEARCH_AUTHORING_FORMAL_PRODUCTION_ARCHITECTURE_V0_1_CRITIC_REVIEW_2026-10-04.md)、[P2](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/059_RESEARCH_AUTHORING_FORMAL_PRODUCTION_ARCHITECTURE_V0_3_CRITIC_REVIEW_2026-10-04.md)

v0.3 标题“已直接验证”在上下文说的是设计中的 gate 足以直接覆盖能力，并未提供本研究可复核的实际新产物实验。因此只计 Gate 合同改善，不计生产效果成功。

Research Authoring TODO 仍有用户作为第一轮版式 QA 的记录；Presentation 黑箱设计提出同执行者同时写 detector、fixture、oracle 的自证问题。它们支持整页实际验收与独立控制，但没有证明某个固定 reviewer 数量最优。[P3](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/plugin-todos/research-authoring-layout-convergence-and-human-review-budget.md)、[P4](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/PRESENTATIONS_HISTORICAL_BLACKBOX_VALIDATION_ARCHITECTURE_2026-10-07.md)

## 共性与差异

这些案例共同反驳“数量覆盖 + 文档 PASS + execution package 足以保证实现就绪”。它们却要求不同证据：Mica 要真实界面，CAT-TRACE 要独立数值基准，STAT 要 literal edges 与身份绑定，Asteria 要整体使用质量，Bridge/Slurm 要真实 runtime 与失败路径。

同一种通用审查不能替代所有证据。另一方面，Slurm 新范围、Mica 优先级调整和真实未知科学问题，都说明无法通过前置设计消除全部后续变化。


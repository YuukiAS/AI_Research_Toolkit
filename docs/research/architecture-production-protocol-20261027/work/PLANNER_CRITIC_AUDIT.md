# Planner–Critic 基线审计

## 正式基线与审计口径

本研究比较的基线是：Planner 完整设计 → Critic → Planner 修订 → Critic 再审 → implementation → 遇新问题返 Planner/再审。没有把草率的一次自审当传统流程，也没有因用户厌倦流程就判定它失败。

样本说明其**能找真问题，却缺乏稳定的实现准入证据与退出机制**。这不足以直接判定任何完整替代协议胜出。RUN_ID=work 的责任是提供可检验的历史事实，而不是替两位独立方法研究者选最终路线。

## 有真实价值的 Critic

| 样本 | 信息增量 | 为什么值得保留 |
| --- | --- | --- |
| Bridge 初始 D01–03 | 工作树/入口/源码真值边界收紧 | 能改变风险，不是字面审美 |
| Bridge reset F01–04 | 防静默删 Clear Writing、明确 source/stale/recovery | 防止“简化”损害原目标 |
| Slurm routing v1 | JobId/dependency/RUNNING 竞态与站点授权 | 提供真实安全反例 |
| protected cancel v2.1 | persisted token 在同 UID 内不构成可信授权 | 改变执行权归属 |
| STAT V3 | literal edges、独立 oracle、真实 module/source identity | 直接减少 implementer 决定空间 |
| CAT readiness / probe | 科学误差域与未定算法 | 防错误科学结果与临时发明 |
| RA059 | 共享正常入口、增量保护、可执行验证 | 补跨插件用户路径 |

出处分别为 [B04](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/bc94e41f44bd5b534d8ab8caa304114b8bf90685/docs/design/0.11.0_execution_context_and_readiness_convergence_proposal_v0.2_2026-10-12.md)、[B17](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/bc94e41f44bd5b534d8ab8caa304114b8bf90685/docs/design/0.11.0_product_scope_reset_critic_review_v0.1_2026-10-19.md)、[S25](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_CRITIC_REVIEW_V0_1_2026-09-24.md)、[S12](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_PROTECTED_PARTITION_CHAT_CONFIRMATION_PROPOSAL_V2_1_2026-10-18.md)、[V3](https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-architecture-v3/CRITIC_FINDING_DISPOSITION_V1.md)、[C1](https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/probes/ZERO_SLOT_LAPLACE_FINDING.md)、[C2](https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/reviews/CRITIC_REVIEW_R1_RESOLUTION.md)、[P1](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/059_RESEARCH_AUTHORING_FORMAL_PRODUCTION_ARCHITECTURE_V0_1_CRITIC_REVIEW_2026-10-04.md)。

不能证明上述问题“只有第二个独立 Critic 才能发现”；目前只有 finding 存在与修订影响的证据，缺少同输入下设计者自查、结构 gate、Work、probe 的对照。

## 真实失败模式

**审查继承问题边界。** Bridge 在当前 execution package 中修 helper 和安全前提，却后知正常入口/tick owner；Mica 功能覆盖没有追到实际 UI 来源；Asteria Work 沿检查清单通过却缺整体阅读任务。独立身份不保证独立问题框架。

**以文档内一致替代世界中的成立。** Bridge reader 的输入隔离、Slurm Hook 的 loader/fail-open、CAT 的共同近似、STAT 的不存在模块都需要不同事实证据。多轮文本对同一假设一致不会使它变真。

**风险写出后未形成前置证据义务。** Slurm 0.3 已知 Hook failure 可能继续，后续仍出现；v2.1 Phase0 正例也说明设计内可以安排早期 probe。问题不是只能等完整产品实现才验证。

**修订产生额外依赖和副本漂移。** Bridge 从投递缺口扩成 reader/display/server/notifier 与 release coupling；v0.7 摘要残留旧说法。STAT 对手工复制大表的反驳也揭示维护副本会制造新缺口。

**执行计划不等于实现机制。** start/resume owner、native schema、外层 profile 未定时，Codex 接手会被迫选择。测试文件存在、计划逐项列出验证，都不能填补这种选择。

**把角色返回当唯一修复通道。** Slurm 四次 prefinal 包含大量 frozen-design 下的实现 bug；是否需要把每个局部修复都串行转 Planner，是流程成本问题，不能因此把四轮都叫架构失败。

**全局重开代价过高。** Bridge 显示/表达层失败阻断全候选；Slurm 故障保护阻断无关 Bash。缺少 capability protection 会扩大一次遗漏的影响，即使遗漏率不变。

## finding 相关性与审查走偏

最明确的过度处方是 STAT 的手工重复大表要求；接受核心义务、反驳指定实现形式，是合理裁决。证据等级的术语纠正同样防止将“独立语义证据”误锁为单一渠道。[V3:16–77](https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-architecture-v3/CRITIC_FINDING_DISPOSITION_V1.md#L16-L77)

Bridge v0.7 摘要修订、routing v0.5 版本分类属于低架构信息增量，但有执行一致性意义。没有证据就不能把它们全部算成无关 finding 或 reviewer 走偏。也没有审查 prompt/token/耗时全记录，无法估算 F_drift 的比例。

## PASS 对应的到底是什么

| 证据 | 能证明 | 不能证明 |
| --- | --- | --- |
| 文档完整 | 已知字段/能力存在 | 能力清单无遗漏、事实正确 |
| Critic PASS | 此 reviewer 在其输入/范围内未留 blocker | 未知盲区消失、runtime 成立 |
| execution-ready package | scope/identity/步骤/验收已组织 | 步骤可在真实入口执行 |
| Asteria completeness | 已知图、机制、关系、证据声明可追溯 | 外部事实、科学正确、产品方向 |
| implementer dry-run | 陌生人能指出模块/任务，显露待设计项 | 动态库、真实 UI、性能与科学精度 |
| 最小真实 probe | 指定版本/identity/路径下的命题 | 所有环境/所有故障都正确 |
| representative failure probe | 特定失败下的边界行为 | 完整故障空间和未测交互 |
| 最终独立验收 | 指定 candidate 的真实用户任务 | 下一版本仍正确、全部需求自明 |

Bridge PASS 留 final gates；STAT audit 留“未实现”声明；因此最准确批评是**实施准入强度超过其前提证据**，不能统一指控他们伪造已部署成功。

## 哪些回合可停止

历史已有三类正例：CAT 限定 Alpha 并保留 future blocker、不再 R7；Bridge reset 复杂度审查只要求局部实现修复；RA v0.3 只复核 RA3。Slurm native schema 也由 Planner 判普通 bug、Plan revision 不增加。[C3](https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/reviews/CRITIC_REVIEW_R6_RESOLUTION.md)、[B16](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/bc94e41f44bd5b534d8ab8caa304114b8bf90685/docs/design/0.11.0_product_scope_reset_complexity_critic_review_v0.1_2026-10-19.md)、[P2](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/059_RESEARCH_AUTHORING_FORMAL_PRODUCTION_ARCHITECTURE_V0_3_CRITIC_REVIEW_2026-10-04.md)、[S59:115–145](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/RESULT.md#L115-L145)

这些支持“问题级裁决、冻结未受影响范围、局部返修”的测试方向。它们不自动授权某个新协议全局跳过审查。

## 后续方法研究必须接受的反证

任何候选都须说明能否在 BK06/BK08、BK13、SC07、M01、V01 和 C01 这些不同类型上提前获得决定性信息，同时不能误伤 SR02 新需求、BK16 局部 bug、C02 已披露子范围冻结。固定再加两个模型但仍把 runtime 留到完整实现之后，不算击败基线。

若后续受控回放显示 baseline 同预算下重大缺口更少、停止更准确，或候选将必要科学/产品决策移给 Codex，必须拒绝候选。若第二独立设计没有新决策、结构填写成本高于其减少的返修、Work 大量重复已知问题、probe 让人过早锁定错误路线，应缩小相应机制适用面，而非靠语言改名宣称成功。


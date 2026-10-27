# Bridge Kit 0.11.x：从连续性补缺到产品范围重置

这条返修链至少包含两次大规模产品实施入口、两次实施后回到设计，以及一次明确的全局产品 scope reset。它也包含有效 Critic、必要安全修复和局部实现 bug，不能用提交数量替代归因。详见 [事件数据](BENCHMARK_DATA.json) BK01–BK16；原始提交目录见 [COMMIT_TIMELINE.json](COMMIT_TIMELINE.json)。

## 研究边界与时点

从 2026-10-12 初始 proposal 到 10-19 reset 实现复杂度审查。Git 时间按 UTC 保存；文档标题常按本地日期，故 10-18 UTC 的提交可以包含 10-19 文档。固定阅读产品主线 `bc94e41f44bd5b534d8ab8caa304114b8bf90685`，另从当时的执行包和 canary 提取精确历史快照。没有把最终状态倒推为早期已知事实。

原始目标已经包含正常入口的执行连续性，而非只新增若干 helper。早期方案把工作分为 A–D，并把进度体系当成有限残项；已知问题包括 instruction budget、控制源真值与 notifier。[B03:14–52](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/bc94e41f44bd5b534d8ab8caa304114b8bf90685/docs/design/0.11.0_execution_context_and_readiness_convergence_proposal_v0.1_2026-10-12.md#L14-L52)

## 主要回合

| 回合 / 时间 | 原设计 → 发现 → 修订 / 实施 | 归因与信息增量 |
| --- | --- | --- |
| BK01，10-12 | proposal v0.1 [27132a4](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/27132a4da7a274371c53b61abaef20e0f26b22b1) → 用户转交 Critic → v0.2 [2e12226](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/2e12226859446ad55067e19f08fc6b450f459c9b)：约束交换范围、真实 launcher 强制 preflight、隔离 Git blob 读取 | DESIGN_GAP。Critic 改变了边界，具有实际价值；小型 Git probe 也已有信息增量。不能据此声称 app-server 已验证。 |
| BK02，10-12 | execution v0.1 [eb63dcc](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/eb63dcc8e7d87d3108d5e0d816b8b05b2ad9eff2) → exact handoff identity / 同候选发布问题 → v0.2 [3e0370c](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/3e0370c7b1993ba2f6cba600aaed6a741892cb16) | DESIGN_GAP / EVIDENCE_GAP。设计 PASS 经用户转交；执行包 v0.2 文档仍是待审。没有找到可据以宣称初次执行包全链正式 PASS 的独立记录。 |
| BK03–05，10-12 | [26c57fa](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/26c57fab885c209bc3944a640453c1a66e3f61a8) 实施 → [646dfa0](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/646dfa03f7f54ebf74b2e6b5edb93d5c4d4a6c6c) readiness → [8ff3bba](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/8ff3bba99eb4aa9be3aead26fd3698841d6c7604) safety → [b9956c9](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/b9956c9c306c9d65a3e54583271bd071801c936c) recovery | 替换 refs、CODEX_HOME、通知 evidence 自授权、approval、journal / source trust / spawn 复核等。多数是实现与安全合同修补，局部是否源于设计不足须逐项判断，不能合并成三次架构重置。 |
| BK06，10-15/16 | scope recovery [524bba6](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/524bba6b1af6a5c9d43a3fc6fbe76ee5c35264da) 与 execution v0.1 [cb605eb](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/cb605eb2fd4fe7e54a6e1a2d92173e45ce81d56f) | 提案明确恢复原 TODO，而非添加新产品：report tick/周期 owner、原线程投递、去抖限流与 machine/project intent 未闭合。已有 A–D 保留。第一次可确认的 implementation→design 返回。 |
| BK07，10-16 | v0.2 [798c8a6](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/798c8a6562bd31f14e1d260ec041a12ef98ae8ce) → v0.3 [e2f41f8](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/e2f41f87bc827b145398456e3b11098130672ca9) | 原线程投递要求的原子 idle/no-tool 边界未确定，改专用 Progress thread；是机制替换。[24b7032](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/24b703235a7e6a583653c59d560c809304cf6db3) 只修 stage metadata，不另算设计轮。 |
| BK08，10-17 | normal-entry v0.4 [a03742e](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/a03742ed07d00d36e3436f64a17e92c40a51064e) | 之前虽有 install/validate/prompt/report helper，用户路径仍缺 start/resume/status、调度 owner 与 Gmail configure/status。功能名存在不等于正常入口已设计。 |
| BK09，10-18 | shared-server / notifier v0.5 [f67ac91](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/f67ac9155c1a844f171afbeef03e8169b8eec6fc) | active writer 约束、server ownership、通知 intent 的工作流归属使架构继续扩展。真实源码/接口事实可以更早调查。 |
| BK10，10-18 | full-functional v0.6 [ae15269](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/ae15269908dbe5b7666bb347897b8839dfd0fb49) → [16ae5fef](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/16ae5fefe8747e54a6db60bd155311daff1efed7) 修订 | instruction writer、交换 quiescence、host-native、授权 identity、通知与 reader 六类闭合。最终无法证明活动静止就禁止自动交换；不能把 Linux/procfs 猜测当充分证据。 |
| BK11，10-18 | v0.7 [b4c8c70](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/b4c8c702da600af01dd079242149a3ecf01f6359) → [ace8f65](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/ace8f6507e61e6b53af5a3e83ba01c275ee6fc9c) REVISE → v0.8 [a6c0a3e](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/a6c0a3e0ecc59147fa83714c07a15244f1f2c36b) → [35a976e](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/35a976e79c036f6e68ba70e9d2364abc1c274a45) PASS | 正文已全平台 fail closed，摘要仍残留 Linux 可交换。是有价值的窄一致性审查，核心机制没有再变；串行大架构回合的必要性并未证明。 |
| BK12–13，10-18 | 第二次扩展实施 [e0f7a328](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/e0f7a328a76e464d154cd1a4295b563b473f8023) → transport/canary [51116425](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/511164258101e426da62c96b12e9803e8e7bd8a5) → display/reader 分开验证 [da9f6d2b](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/da9f6d2b34c00e87e00622b9234bbada786c1760) | 真正运行后，reader 隔离前提不被所选 Codex 0.160.1 支持。FAIL_CLOSED，final G01–G14 尚未启动。 |
| BK14–15，10-18/19 | scope reset [0120b99](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/0120b99a501e4193078233bc4ec824dcb1dcac75) → [d293e52](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/d293e525491b7db823435e15ffa3318bed251960) REVISE → [ce77f24](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/ce77f24e5dadd083d4beecf9b6e922e94192b372) → [4ccc40c](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/4ccc40cc5ab061bb1fbbd74f34b5d9976ad10122) PASS → plan/Goal/kickoff → [a9c03b4](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/a9c03b4a36c185aa98b00006c08ef600ba77d094) execution PASS | 撤销旧任务 authority，切掉 app-server reader/display、自动交换与过广通知协议；独立 Critic 同时阻止借“简化”静默删除承诺功能。第二次 implementation→design 返回与一次明确全局 reset。 |
| BK16，10-19 | reset 实现 checkpoint `be4a979…` 的复杂度审查 | 允许有依据的规模增量；managed marker 外空白变动退回局部代码修复。没有因行数门槛再造一轮架构。 |

v0.1/v0.2 的 Critic 转交记载：[B04:14–28](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/bc94e41f44bd5b534d8ab8caa304114b8bf90685/docs/design/0.11.0_execution_context_and_readiness_convergence_proposal_v0.2_2026-10-12.md#L14-L28)、[B02:3–24](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/bc94e41f44bd5b534d8ab8caa304114b8bf90685/docs/design/0.11.0_execution_context_and_readiness_convergence_execution_plan_v0.2_2026-10-12.md#L3-L24)。scope 恢复：[B15:12–24](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/bc94e41f44bd5b534d8ab8caa304114b8bf90685/docs/design/0.11.0_final_scope_recovery_proposal_v0.1_2026-10-16.md#L12-L24)。正常入口与 shared server：[B08:19–26](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/bc94e41f44bd5b534d8ab8caa304114b8bf90685/docs/design/0.11.0_final_scope_recovery_execution_plan_v0.4_2026-10-17.md#L19-L26)、[B09:31–35](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/bc94e41f44bd5b534d8ab8caa304114b8bf90685/docs/design/0.11.0_final_scope_recovery_execution_plan_v0.5_2026-10-17.md#L31-L35)。v0.7 与 v0.8：[B13](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/bc94e41f44bd5b534d8ab8caa304114b8bf90685/docs/design/0.11.0_final_scope_recovery_execution_ready_critic_review_v0.7_2026-10-18.md)、[B14](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/bc94e41f44bd5b534d8ab8caa304114b8bf90685/docs/design/0.11.0_final_scope_recovery_execution_ready_critic_review_v0.8_2026-10-18.md)。

## 为什么多轮之后仍未得到稳定的可实施包

第一，审查围绕当前方案补局部义务，没有持续从原始用户能力反向追到触发入口和责任人。进度“能生成一个文件”与“正常启动后会在正确时刻送到正确位置”之间缺了 owner、触发器、consumer 与失败路径。scope recovery 与 normal-entry 两次修订给出直接证据，不能都改写成“用户临时加需求”。

第二，新组件不断增加依赖，而不是只补原缺口。原线程不能安全注入后出现 Progress thread；reader/display 引入 shared app-server、连接、指令来源、多 agent 设置与持久化；这些又被捆到核心 release gate。一次表达/显示层能力失败会阻断其他已完成能力。reset Critic 对这种耦合有明确分析。[B17:54–97](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/bc94e41f44bd5b534d8ab8caa304114b8bf90685/docs/design/0.11.0_product_scope_reset_critic_review_v0.1_2026-10-19.md#L54-L97)

第三，文档把“可检查的验证要求”当成了“可以先大规模实现的充分条件”。v0.8 的正式 PASS **确实只准开始实施，并未宣称 live gates 已通过**。问题不在于伪造运行 PASS，而在于让一个能在零模型轮暴露的架构杀手级前提拖到扩展实现后才验证。[BH2](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/bbd14ce66b462ba2dbcecc6ad06d851598a3aacc/docs/design/0.11.0_final_scope_recovery_execution_plan_v0.8_2026-10-18.md)、[B14](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/bc94e41f44bd5b534d8ab8caa304114b8bf90685/docs/design/0.11.0_final_scope_recovery_execution_ready_critic_review_v0.8_2026-10-18.md)、[BC:6–51](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/da9f6d2b34c00e87e00622b9234bbada786c1760/results/bridge-core--execution-context-readiness-convergence/DEVELOPMENT_PROGRESS_CANARY.json#L6-L51)

第四，修订本身产生新的验证负担。v0.7 的摘要/正文冲突不是新架构，但会迫使下一位执行者决定哪个版本有权威。source identity 和 meaningful revision 能减少这种负担，却不能验证 platform capability。

## 运行事实到底是什么

canary 记录：`project_doc_max_bytes=0` 后，reader 的 `instructionSources` 仍含 machine AGENTS；`multiAgentMode` schema 标明 ignored；`reader_turns_used=0`，`durable_progress_threads_created=0`，`candidate_frozen=false`。最终分类为 `UNSUPPORTED_WITH_EVIDENCE`。这不是一个“多给模型几轮就会完成”的问题。[BC:14–51](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/da9f6d2b34c00e87e00622b9234bbada786c1760/results/bridge-core--execution-context-readiness-convergence/DEVELOPMENT_PROGRESS_CANARY.json#L14-L51)

同一记录也显示一次实现侧误判：起初把零模型轮 display 按 reader 隔离标准验证，后来拆开。这个局部 validator 修复，不能抹去 reader 真实不支持的架构前提；也不能把 display 的错误验证扩大成整个 app-server 一概不可用。

本研究复核的是历史仓库证据，没有重连当时的服务器或重新执行 canary；结论绑定该版本、identity 和入口，不外推到今天所有 Codex runtime。

## 反事实：哪些方法有机会更早改变决定

| 方法 | 具体可检验机会 | 局限 |
| --- | --- | --- |
| 双向能力闭合 / Asteria | “持续运行”必须关联 start/resume/status、tick owner、通知 consumer；先查出 BK06/BK08 | 如果能力清单本身遗漏真实用户场景，表格仍可能全绿 |
| 独立 Work | 不看提案，从原 TODO 与启动、停机、续跑、通知旅程找缺失问题 | 没有历史随机对照，不能给出检出率 |
| 第二独立设计 | 在引入 Progress thread / app-server reader 前，对一次性文本转换与长期显示的责任做独立拆分 | 无法证明第二个模型一定会选更简单路线；可能共享错误平台假设 |
| Codex 最小 probe | 在承诺 reader 架构前，用真实 identity 零模型轮读回 instructionSources 和设置语义 | 只能否证该路线；不能自行选新的产品机制 |
| 陌生实施者只读挑战 | 列出真实入口、owner、必须新增模块与未决机制；暴露 helper 不等于完整路径 | 不运行真实 reader，仍可能看不出隔离不支持 |
| failure containment | reader、display、notifier 作为独立 adapter；其失败不得改写核心 run state / 拖垮全部能力验收 | 不能据此自动删除已承诺 Clear Writing；降级与延期仍需产品决定 |

这些是有具体失败靶点的 INFERRED 机会，不是已经测得的节省率。

## Critic 的正向与负向证据

初始三项边界修订、reset 时保住 Clear Writing、stale/partial-start 语义，以及最后不强迫按行数缩减，都是真实价值。[B17:43–52](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/bc94e41f44bd5b534d8ab8caa304114b8bf90685/docs/design/0.11.0_product_scope_reset_critic_review_v0.1_2026-10-19.md#L43-L52)、[B16](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/bc94e41f44bd5b534d8ab8caa304114b8bf90685/docs/design/0.11.0_product_scope_reset_complexity_critic_review_v0.1_2026-10-19.md)

低信息增量例子是 stage metadata、v0.7 摘要同步；它们应与架构发现分开统计。现有材料不足以断言这些问题必须由“独立 Critic”才可发现，也不足以将所有规范一致性工作定为无关 finding。

## 成本证据与边界

两次主要实施入口是 `26c57fa` 与 `e0f7a328`；reset 后又有独立实现 checkpoint。第二次实现提交涉及 37 个文件、增加 3288 行、删除 572 行，属于**暴露于架构返修的变更规模**，不是已证明作废的代码量。恢复中哪些代码被复用、投入多少小时、每次等模型多久、用户实际发送多少次消息均 UNKNOWN。

至少四份文件记载用户转交或补充审查结果（B04、B02、B08、B09），另有明确 scope reset。它们是人工协调的存在证据，不是完整用户介入计数。47 commits 是 reset Critic 自述的范围统计，也不等于 47 次失败或模型调用。


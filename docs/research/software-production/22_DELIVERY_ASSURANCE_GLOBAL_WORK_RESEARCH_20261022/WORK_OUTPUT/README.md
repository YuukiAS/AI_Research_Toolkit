# Delivery Assurance：从用户请求到真实成品

**当前应继续架构设计，而不是直接进入独立审查或实施。** 原研究已识别六项关键缺口，但用户明确要求先由原 Planner 继续调查可行路线、决定真实接口和结果消费路径，不得仅凭研究包齐备就终止。请从[09：继续直到架构设计闭合](09_CONTINUE_UNTIL_ARCHITECTURE_CLOSED.md)启动；此前 07/08 审查包需在设计修订后更新，不能按旧稿冒充最终送审包。

推荐把交付保障接入**原任务入口、一个小型共享判定库和七仓现有验收程序**。用户照常提出需求；系统保留目标与旧功能，选出该跑的检查，缺程序时交当前执行者补齐，失败回原任务，最后核对实际安装、加载或运行的成品并给简明中文报告。图和机制见[整体架构](02_ARCHITECTURE_AND_COMPONENTS.md)。

例如Lucerna修刷新时，旧额度与未知状态也进入保护范围；恒定值或错误EXE证据被拒，原执行者收到具体失败再修。决定性变化是**真实入口调用、真实观察、真实接收者消费**，而不是增加Gate、回执或第二个调度系统。

**这仍是未闭合的架构候选，不能开工。** 原生Hook失效时的强制保障、未知旧行为发现、独立观察、持续反馈消费者及旧da/1接口迁移尚未证明；七仓真机/账号/部署/GPU均未在本轮运行。Mica登录态手动、CUHK换snapshot新活动、CARE科学Planner边界保留。见[六项关键缺口](05_COVERAGE_SUMMARY.md)和[实施前置条件](06_IMPLEMENTATION_AND_EVALUATION.md)。

- [当前状态与恢复点](CURRENT.md) · [写入探针与顺序偏差](00_GITHUB_WRITE_PROBE.md)
- [真实源码与替代路线](01_REALITY_AND_ALTERNATIVES.md) · [逐跳执行与验收器生命周期](03_END_TO_END_EXECUTION_AND_VALIDATORS.md)
- [七仓落地与三条深度故事](04_SEVEN_REPOSITORY_ADOPTION.md)
- [823条全量映射](05_HISTORICAL_COVERAGE.csv) · [覆盖解释、36反例与缺口](05_COVERAGE_SUMMARY.md)
- [逐包实施、成本、维护及退出](06_IMPLEMENTATION_AND_EVALUATION.md)
- [旧版独立 Critic 审查包（待根据续研修改）](07_INDEPENDENT_CRITIC_PACKAGE.md) · [旧版 Critic 指令（暂不直接使用）](08_CRITIC_PROMPT.md)

本目录是唯一研究成果，逐阶段直接写入并回读GitHub。没有生产修改、新任务、独立Critic PASS或可执行Codex Goal。研究材料可审查不等于整体设计已获批准。

# Delivery Assurance：让普通任务走到真实成品

这套推荐设计要减少用户三类劳动：提醒补验收、发现旧功能被改坏、把失败报告搬回去要求继续。它在原任务入口绑定真实目标和版本，从源码入口与新旧依赖发现保护范围，调用七仓已有专业验收；失败送回当前执行者或原启动器有限续修，最后由原交付入口核验实际成品。不是新增一套后台调度平台。

本轮已把原六项问题中的技术选择写到可实施的调用、字段、消费者、异常、成本与迁移层：旧行为发现、三档独立观察、Lite/Review精确同thread续修、Control具体Executor/Verifier接线、七仓实测合同，以及明确da/2提案。三条深链和另外七个普通请求说明这些机制怎样改变结果。详见[整体架构](02_ARCHITECTURE_AND_COMPONENTS.md)。

**用户已于 2026-10-22 明确接受推荐的有界混合架构，不再等待产品边界选择。** 正常受支持的 Codex 入口应自动接入，受管交付前必须独立核验；Hook 缺席时不能保证撤回原生聊天已经生成的错误文字，这不豁免正式交付。用户不需要开发新的 Codex 客户端，也不应反复充当验收、回归和返修指挥。当前仍不是 Planner 完整送审候选、没有独立 Critic 或真实实施结果；接续 GPT Work 必须按[10 最后整合与反证合同](10_ACCEPTED_BOUNDARY_AND_FINAL_ARCHITECTURE_GPT_WORK_PROMPT.md) 将完整研究收敛为可独立审查的一致架构，详见[CURRENT](CURRENT.md)。

这是设计，尚未实现或运行验收。Windows Desktop/CLI/Remote各版本、七仓真实设备/账号/部署/GPU/科学结果仍未证明；已确定最小实验与权限/成本上限，未伪造通过。

- [调用、验收器生命周期与da/2合同](03_END_TO_END_EXECUTION_AND_VALIDATORS.md)
- [七仓真实链与实测合同](04_SEVEN_REPOSITORY_ADOPTION.md)
- [阶段落地、成本、维护与退出](06_IMPLEMENTATION_AND_EVALUATION.md)
- [823条反向覆盖](05_HISTORICAL_COVERAGE.csv) · [解释与36反例](05_COVERAGE_SUMMARY.md)
- [源码与后续独立审查材料](07_INDEPENDENT_CRITIC_PACKAGE.md) · [条件满足后使用的Critic指令](08_CRITIC_PROMPT.md)
- [用户续研合同](09_CONTINUE_UNTIL_ARCHITECTURE_CLOSED.md) · [真实写入探针](00_GITHUB_WRITE_PROBE.md)

本目录持续直接写入并回读GitHub，是同一研究的唯一权威。未修改生产代码、未创建任务、未运行高影响操作；没有独立Critic PASS或可执行Goal。最新main设计/可信解释标准已完整重读，来源记录在01/07。

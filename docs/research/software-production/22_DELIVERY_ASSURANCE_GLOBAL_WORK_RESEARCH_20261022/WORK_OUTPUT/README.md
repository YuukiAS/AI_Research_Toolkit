# Delivery Assurance：同一架构的 R2 返修候选

用户仍从普通Codex请求开始，不必先写Goal。方案先核对原要求，调用任务需要的成熟能力，保护旧功能，再运行项目自己的真实验收。失败交回原任务修复；最终由正常任务的结束检查接受报告，不能因为Codex写了“完成”就算交付。

推荐仍是 **Bridge已有入口＋workflow-core小共享库＋七仓专业验收**。不建新客户端、常驻调度器、第二任务库或第四工作流。受支持入口自动接入、受管交付强制验收；Hook完全缺席时不保证撤回已发聊天文字，已接受边界保持。

独立Critic R2保留了两项问题，本轮均接受并修改：

- **DA-AR-01：审查必须真的运行并返回。** 创建PLAN_REQUESTED文件不再算自动核对。优先复用已经定义、获权且可执行的项目Reviewer；已有Review安排任务补首轮Planner处理，原watcher接收；Control须有具体可运行角色。原任务核结果后才允许依赖写入。简单UI机械修复可自查，不强制重型Review。
- **DA-AR-04：检查必须在正常结束路径发生。** 撤回七个历史脚本各加finalizer的方案。改为正常Stop、Lite退出、Review返回消费、Control终态动作调用共享finish_delivery，再check/report/accept_submission。七仓保留原结果位置和专业证据；直接写原result“完成”并省略检查的坏例，必须被真正host拒绝。

R2已关闭的 **DA-AR-02验收器/adapter准入、DA-AR-03成熟能力消费、DA-AR-05先行宿主探针** 保持。两级交付、回执去环、父子锁、共享预算、取消及科学负结论没有放宽。

这是Planner的**实现前候选**，两项关闭证据还需独立Critic确认。固定身份和全包回读见[CURRENT](CURRENT.md)。没有运行宿主探针、独立角色进程或七仓产品，七仓DA enabled均为NO。没有合法自动角色通道的环境明确不支持无人值守高风险核对；Asteria等现行GPT Work人工交接、Mica正常Edge短操作不能隐瞒成自动。没有活跃owner也不承诺自动唤醒。

全量规划估算 **138–332小时**，首个完整切片 **40–88小时**，其中先行P0仍 **4–8小时**；不是实测或执行授权。新增接线的成本与退出条件见06。只增加记录却不减少漏检/用户搬运，就不推广。

- [02：整体架构与正常用户路径](02_ARCHITECTURE_AND_COMPONENTS.md)
- [01：真实源码、路线比较与平台边界](01_REALITY_AND_ALTERNATIVES.md)
- [03：实际独立调用、定义准入、能力消费、da/2与同任务返修](03_END_TO_END_EXECUTION_AND_VALIDATORS.md#r2-ar01)
- [04：七仓正常完成入口、绕过坏例及三个完整案例](04_SEVEN_REPOSITORY_ADOPTION.md#r2-ar04)
- [05：823条原问题映射](05_HISTORICAL_COVERAGE.csv) · [覆盖与反证](05_COVERAGE_SUMMARY.md)
- [06：实施顺序、维护、成本与否决条件](06_IMPLEMENTATION_AND_EVALUATION.md)
- [07：两项处置、三项保留与固定源码](07_INDEPENDENT_CRITIC_PACKAGE.md#r2-review)
- [08：下一轮独立Critic完整提示词](08_CRITIC_PROMPT.md)
- [09：持续闭合合同](09_CONTINUE_UNTIL_ARCHITECTURE_CLOSED.md) · [10：已接受边界合同](10_ACCEPTED_BOUNDARY_AND_FINAL_ARCHITECTURE_GPT_WORK_PROMPT.md) · [原写入探针](00_GITHUB_WRITE_PROBE.md)

本轮审查意见来自用户转交，没有单独GitHub审查文件。所有改动仅在原WORK_OUTPUT、原研究分支逐阶段提交并回读；原823行前八列逐字段保留。没有生产修改、新任务、自动化、设备/账号/GPU/付费/部署操作。下一入口只有独立设计复核，不含Codex实施任务。

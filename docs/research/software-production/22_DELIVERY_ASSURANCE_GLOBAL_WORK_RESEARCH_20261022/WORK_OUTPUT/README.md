# Delivery Assurance：让普通任务走到可信交付

用户仍在正常Codex入口提出功能请求。拟议系统先保留原话、找出必须达到的结果和受影响旧行为，再让原执行者补齐并运行项目已有的专业验收。失败直接送回当前回合或原启动器，在原任务和预算内继续修复；最终交付入口独立核对真实当前成品。它要减少的是用户提醒验收、发现假完成、搬运失败报告和反复催修的劳动。

**唯一推荐是有界混合架构：Bridge原入口＋workflow-core小共享库＋七仓原runner。** 用户已于2026-10-22确认：受支持正常入口自动接入；受管交付必须真实验收；Hook完全缺席时无法拦截原生聊天已经生成的错误完成文字，此例外仅限聊天。无需新Codex客户端，不建设常驻调度平台、第二任务数据库、第四工作流或万能评分器。

本轮已将可由源码和架构分析决定的关键选择收敛到同一方案：原请求逐段覆盖；旧/新入口图与接受基线；分级独立观察；验收器补建、校准、使用与退休；逐仓材料阶段和最终交付的真实接收者；父子进程不互锁、共享预算的精确同thread返修；唯一da/2消费者与迁移回滚。没有把版本、调用或接收方式交给实施者猜。**这是Planner架构送审候选；最终固定提交、回读与送审状态见[CURRENT](CURRENT.md)，没有独立Critic结论或生产实施批准。**

优势不是“多一张清单”，而是低层PASS不能冒最终可用、旧功能与未登记入口会影响选测、失败必须有实际接收和新结果。剩余风险也明确：机械原文覆盖不能保证语义全知，同用户hash不是安全隔离，任意绕开受管出口的动作不受插件沙箱保护。Windows Desktop、CLI、Remote、GPT Work的实际安装版本与新接线、七仓真实设备/账号/部署/科学结果，均尚未完成本轮实测；01/04/06给出最低摩擦替代和可否决试点。

跨仓实施粗估104–264小时，尚未量测。推荐先做估算28–64小时的core＋原生/Lite＋Lucerna完整纵向切片，测是否真的减少漏检与用户搬运；收益不成立就退回原runner补强，保留有效回归。纯对话不建产品验收，普通文档只做相关检查，缺权/取消/外部等待不自动续修。其它入口和六仓的设计已完整给出，但必须逐仓验证后启用，不能借首片代签。

- [整体架构与本轮实质裁决](02_ARCHITECTURE_AND_COMPONENTS.md)
- [入口事实、替代比较与宿主矩阵](01_REALITY_AND_ALTERNATIVES.md)
- [实际调用、验收器生命周期、F1–F5与da/2](03_END_TO_END_EXECUTION_AND_VALIDATORS.md)
- [七仓真实历史、正常/坏/旧链及最小实测](04_SEVEN_REPOSITORY_ADOPTION.md)
- [逐阶段落地、成本、维护与退出](06_IMPLEMENTATION_AND_EVALUATION.md)
- [唯一823条覆盖账本](05_HISTORICAL_COVERAGE.csv) · [证据口径与反例](05_COVERAGE_SUMMARY.md)
- [独立审查源码包](07_INDEPENDENT_CRITIC_PACKAGE.md) · [完整Critic提示词](08_CRITIC_PROMPT.md)
- [09续研合同](09_CONTINUE_UNTIL_ARCHITECTURE_CLOSED.md) · [10已接受边界与最终设计合同](10_ACCEPTED_BOUNDARY_AND_FINAL_ARCHITECTURE_GPT_WORK_PROMPT.md) · [真实写入探针](00_GITHUB_WRITE_PROBE.md)

本目录为同一研究的唯一权威，全部实质进展直接提交GitHub并回读。历史37条定向审读/326条当前UNKNOWN未升级成运行通过。其它仓只读；未创建任务或自动化、未运行高影响操作、未修改生产源。唯一下一入口是独立Critic的实现前设计审查，只能给PROCEED/REVISE；本任务不自动启动它，也不输出Codex执行Goal。

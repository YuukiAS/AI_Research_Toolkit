# 复杂产物交付流程研究：当前有效入口

研究资料继续暂存在 `AI_Research_Toolkit` 的 `research/software-production-decision-20261013` 分支。未来正式代码归属未决定；本轮没有合并main、修改六产品/CARE/STAT5060/Bridge/插件、启动Critic或运行生产实施。

**当前完整提案从 [研工台 v0.5](08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/README.md) 阅读。** 这是面向软件、网页、深度学习和科研/统计复杂产物的连续交付流程，不仅是最终验收器。主实现可以使用有界子代理；专业阶段和独立审查由实际任务入口派发；验收标准、公开回归、独立参考和最终样本分时分权；AGENTS有维护、整理、淘汰和实际加载生命周期。

| 需要核对的内容 | 当前文件 |
|---|---|
| 本线程原八问及后续全部追问如何处理 | [U01–U20逐问回答](08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/USER_REQUIREMENTS.md) |
| 系统到底是什么、各角色/进程、谁启动、子代理、几轮返修、冲突归谁、插件实际调用 | [工作流程与权限](08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/WORKFLOW_AND_AUTHORITY.md) |
| 验收做前还是做后、执行者可见范围、独立判定与反例隔离 | [验收时序与隔离](08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/GATE_TIMELINE_AND_ISOLATION.md) |
| CARE中间模型、多个Batch/Route/四lane/ASE和Agent-Flow的遗漏事故 | [模型谱系与因果审计](08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/CARE_LINEAGE_AND_CAUSAL_AUDIT.md) |
| 六项目具体入口、Asteria审美、CUHK语言、Lucerna完整新功能/跨机截图 | [六仓库归因与Lucerna运行示例](08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/SIX_REPO_CAUSES_AND_LUCERNA_RUN.md) |
| AGENTS怎样自动整理和退休，旧规则如何真的生效 | [规则生命周期](08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/AGENTS_LIFECYCLE.md) |
| 已经证实与尚待验证分别是什么 | [证据和剩余工作](08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/EVIDENCE_AND_REMAINING_WORK.md) |

本轮新增的实际局部实验为 [Route B B6指标依赖反例](08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/probes/route_b_metric_dependency.py) 和 [运行结果](08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/probes/route_b_metric_dependency.result.json)：完美/空预测返回同一代理分数，换病例位置却改变分数。它只证明冻结历史纯函数的问题，不声称完整CARE训练或新工作流已经验证。

先前[六库246项账本](04_SIX_REPO_AUDIT/README.md)、[逐项组件映射](04_SIX_REPO_AUDIT/problem-control-map.csv)、[LX/AX晚期补查](05_PROPOSED_ARCHITECTURE_V0_2/INCIDENT_ADDENDUM.md)、[CARE原40项](07_CARE_AND_EXECUTABLE_REVIEW_V0_4/CARE_FAILURE_LEDGER.md)保留并被本版引用，不重新从头计数。记录包含历史事故、方案缺口和安全边界，不能相加宣称独立实验数量或当前未修BUG。

00–07是历史研究和前版接口；如与v0.5关于角色/进程、Bridge映射、验收时序或规则维护冲突，以v0.5作为**当前候选提案**，不是新的生产授权。用户认可前不发Critic提示词。原始历史仍有明确未穷尽范围，独立审查模型能力、真实主机权限和跨平台持续收益尚未完成试点，不以文档/提交数量代替“可靠系统已建成”。

GitHub本轮已实际可写，因此没有启用Notion退路；此前可明确归属本线程的Notion误写草稿正文已清空并读回为空，原指定目标空页未改，页面壳保留。

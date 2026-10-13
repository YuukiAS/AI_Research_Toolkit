# 复杂产物交付流程研究：当前阅读入口

**当前详细研究版本：[研工台 v0.6 四卷完整说明](09_FULL_DOSSIER_V0_6/README.md)。** 四卷分别为[组件运行架构](09_FULL_DOSSIER_V0_6/01_ARCHITECTURE_AND_COMPONENT_CONTRACT.md)、[六仓库与CARE事故归因](09_FULL_DOSSIER_V0_6/02_INCIDENTS_AND_CAUSAL_COVERAGE.md)、[本线程全部问题逐项答复](09_FULL_DOSSIER_V0_6/03_ALL_USER_QUESTIONS_AND_DECISIONS.md)、[Lucerna完整新功能演练](09_FULL_DOSSIER_V0_6/04_LUCERNA_FULL_WORKED_RUN.md)，另有[只负责把详细Markdown编译为20页以上中文PDF的Codex提示词](09_FULL_DOSSIER_V0_6/05_CODEX_PDF_BUILD_PROMPT.md)。

**v0.6内容已写入GitHub，但实际PDF仍需由排版任务编译并核验。** 现在没有部署研工台、没有运行正式产品试点或独立Critic，没有修改CARE与六个产品。六仓库246项、CARE前40项及新增52项均为“登记”，包括历史已修、检查盲区和风险边界，不能冒充相应数量独立事故。用户认可之前不自动启动架构实施或审查。

---

## 历史研究与原始证据

此前[v0.5旧版研究](08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/README.md)保存原架构演进、早期模型补查和研究定位，不再作为优先阅读入口。原本全部证据文件和详细问题台账继续可读。

本轮新增的实际局部实验为 [Route B B6指标依赖反例](08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/probes/route_b_metric_dependency.py) 和 [运行结果](08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/probes/route_b_metric_dependency.result.json)：完美/空预测返回同一代理分数，换病例位置却改变分数。它只证明冻结历史纯函数的问题，不声称完整CARE训练或新工作流已经验证。

先前[六库246项账本](04_SIX_REPO_AUDIT/README.md)、[逐项组件映射](04_SIX_REPO_AUDIT/problem-control-map.csv)、[LX/AX晚期补查](05_PROPOSED_ARCHITECTURE_V0_2/INCIDENT_ADDENDUM.md)、[CARE原40项](07_CARE_AND_EXECUTABLE_REVIEW_V0_4/CARE_FAILURE_LEDGER.md)保留并被本版引用，不重新从头计数。记录包含历史事故、方案缺口和安全边界，不能相加宣称独立实验数量或当前未修BUG。

00–07是历史研究和前版接口；如与v0.5关于角色/进程、Bridge映射、验收时序或规则维护冲突，以v0.5作为**当前候选提案**，不是新的生产授权。用户认可前不发Critic提示词。原始历史仍有明确未穷尽范围，独立审查模型能力、真实主机权限和跨平台持续收益尚未完成试点，不以文档/提交数量代替“可靠系统已建成”。

GitHub本轮已实际可写，因此没有启用Notion退路；此前可明确归属本线程的Notion误写草稿正文已清空并读回为空，原指定目标空页未改，页面壳保留。

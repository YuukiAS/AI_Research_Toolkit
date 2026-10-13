# 复杂产物生产体系：当前研究与独立审查入口

**当前正式提案为 [v0.8：三位Critic全部已知阻塞回应](11_THREE_CRITIC_RECONCILIATION_V0_8/README.md)**，设计[正式Plan](11_THREE_CRITIC_RECONCILIATION_V0_8/00_PLAN_AND_ARCHITECTURE_V0_8.md)、[七项最小可执行机制与信任合同](11_THREE_CRITIC_RECONCILIATION_V0_8/01_EXECUTABLE_KERNEL_AND_PLAN.md)、[全部363条原源覆盖表](11_THREE_CRITIC_RECONCILIATION_V0_8/08_FULL_CASE_COVERAGE_MATRIX.csv)及[21个三份审查阻塞逐项处置](11_THREE_CRITIC_RECONCILIATION_V0_8/09_THREE_CRITIC_BLOCKER_DISPOSITION.md)均已入库。本轮用户重新上传的[GPT-5.5审查全文](11_THREE_CRITIC_RECONCILIATION_V0_8/reviews/GPT55_R1_ORIGINAL_USER_UPLOAD.md)已原文入库，不再缺失。**新提案尚未获独立PASS，不能开始正式实现或昂贵试验。**

v0.8明确取消v0.6会与Bridge冲突的独立中央运行器，也纠正v0.7只剩抽象职责、缺最小真实检查入口的问题。候选方案是原项目/Bridge**唯一任务Owner**加一组按需调用、短命无状态的生产路径与证据检查；专业能力来自AI Skills与项目已有脚本；真正的强制依赖实际分权的CI/主机/资源入口。若不比直接修现有项目更有效，就不建设新公共包。必须接受下一轮独立Critic选择PASS、REVISE或REJECT。

## 历史方案与原始来源（保留，不自动实施）

- [v0.7上一轮修订](10_POST_CRITIC_REDESIGN_V0_7/README.md)：为何接受GPT-5.6根本REJECT并拒绝第二控制面；其中GPT-5.5原文缺失是此前v4.zip内部空文件的历史情况，现已由v0.8用户新上传完整解决材料来源问题。
- [v0.6四卷及已生成旧PDF](09_FULL_DOSSIER_V0_6/README.md)：旧架构被审对象，PDF构建方报告称76页，独立PDF视觉并未重新验证；[c9到dcc8构建身份说明](11_THREE_CRITIC_RECONCILIATION_V0_8/06_PDF_AND_COMMIT_IDENTITY.md)。
- [六仓库246项历史原账本](04_SIX_REPO_AUDIT/README.md)、[晚期25项](05_PROPOSED_ARCHITECTURE_V0_2/INCIDENT_ADDENDUM.md)、[CARE前40项](07_CARE_AND_EXECUTABLE_REVIEW_V0_4/CARE_FAILURE_LEDGER.md)、[CARE模型追加52项](08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/CARE_LINEAGE_AND_CAUSAL_AUDIT.md)及[历史B6局部函数反证](08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/probes/route_b_metric_dependency.result.json)。

研究仍只在用户临时允许的当前分支；没有修改六软件/CARE、Bridge、插件、机器配置、私有数据、模型训练或发布。源登记不等于363次独立事故，也不意味着v0.8防线已经在正式任务运行并生效。

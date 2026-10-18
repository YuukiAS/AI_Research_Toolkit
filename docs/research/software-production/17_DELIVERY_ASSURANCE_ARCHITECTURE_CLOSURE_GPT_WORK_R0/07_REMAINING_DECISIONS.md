# 剩余决定与证据

最终 verdict 为 **ARCHITECTURE_REVISE**。不得在此写无条件的 `architecture-level unresolved = NONE` 并据此封板。

## 架构层剩余

| 项目 | 性质 | 唯一owner | 确定阶段/触发 | 关闭条件 |
|---|---|---|---|---|
| 独立一致性是否成立 | 方法证据，非实现细节 | 新的独立架构审查者 | Phase2前，给全新上下文纯要求/纯索引/真实来源；不提供旧方案/03分类 | 先提交人工结果，再对冻结规则独立推导，六维比较无实质未解差异；全过程来源隔离可审 |
| 06修订是否正式成为v0.3 | 架构批准 | 当前架构Planner | 独立审查取得有效结论后，转写08精确changeset | Planner接受全部C01–C20，所需Critic按既有流程有效审查；不由Executor自行把研究变生产合同 |

06内没有未分配的职责、未确定的算法分支或“实现时再选择”的架构空白。上表仍必须留在架构关闭条件中，因为独立证明与批准不是可以伪造的文件字段。

## 后续事实绑定和实现验证

| 项目 | owner | 阶段 | 不得替代的事实 |
|---|---|---|---|
| Windows/服务器正常入口、Stop、同会话继续及真实强制边界 | Bridge现有R5任务owner | 原R5获权阶段；本研究不重开/运行/暂停 | hook存在不证明会话控制；不支持时如实报告 |
| Resolver/schema/packet/可点击索引 | workflow-core | Phase2实施验收 | 真normal entry，正/坏/缺观察分支，不是只验证JSON |
| 精确路径、target图、设备/URL、环境有效期、阈值/fixture | 各consumer项目owner | 首次consumer adaptation标准冻结 | 由本项目科学/产品语义决定，不采用万能阈值 |
| UI/Figma/文档/统计专业参数与校准 | 对应domain专业owner | 对应consumer适配验收 | 最终真实表面/完整材料/estimand等；domain owner不由研究者替代 |
| 现有validator限制修复 | Executor在对应Gate owner冻结标准下 | consumer实施 | Mica真实观察、Asteria量测、CARE恢复训练等不因本报告而自动解决 |
| 更新分发及每consumer实际生效 | AI Skills Maintainer | 正式release/update-impact适配 | central完成不等于所有consumer完成；ADAPTING保留 |
| 成本/延时/误拒/漏检净收益 | workflow-core owner | 获权consumer pilot，先与项目现有入口基线对照 | 不凭文档或新增文件数量宣布节省 |
| 私有数据、真实设备、账号、GPU或付费 | 当前用户 | 在相应已知必要副作用的昂贵前置工作前 | 本轮授权只研究；不能以本表预授权生产 |
| 缺旧线程逐字导出/旧附件的来源 | 研究资料维护者 | 需要恢复旧原话时 | 现有来源目录明确没有旧线程全文；摘要不能冒充原话 |

这些事项不能退化成Executor临场决定架构：数据模型、owner、失效规则、scope、路由已在06固定。也不能反向把实机未运行包装成架构已验收。

## 最小下一步

保留当前研究目录和已冻结03/03A，将06、08及本轮明确失败的方法条件交现有Planner/Critic；需要独立盲复核时另起隔离研究上下文，并在其Pass A完成前不给旧分类。本轮不创建新任务、不启动监测、不运行生产探针。未取得这些证据前，继续保持ARCHITECTURE_REVISE。

# 通用语义模型

## 1. 设计原则

语义模型必须足以连接系统、机制、实现、证据和历史，但不能成为需要人工重复录入所有事实的第二数据库。最小对象集以“能否回答用户的真实问题”为准，而不是以页面组件为准。

共享语义和内容展示分开：模型定义对象之间是什么意思；渲染器决定用拓扑、状态机、时序、公式、正文还是代码锚点呈现。

## 2. 对象

### Project

项目级边界。关键字段：稳定标识、名称、说明、仓库、默认分支、当前修订、来源清单和可选展示配置。

### Revision

一次有系统意义的冻结快照。关键字段：标识、父修订、标题、时间、范围、原因、触发证据、冻结状态、绑定提交和变更集合。修订可以只改变设计，也可以记录实现追上设计。

### Component

具有稳定责任的系统对象。关键字段：标识、名称、类别、责任、边界、三轴状态、父组件、机制引用、实现锚点、开放问题和标签。组件标识不能跟随显示名称或文件移动轻易改变。

### Relation

两个组件间的有向交互。关键字段：来源、目标、类型、真实载荷或约束、发生位置、失败语义、可选锚点和当前状态。没有载荷的装饰箭头不进入核心模型。

### Mechanism

组件内部的运作说明。关键字段：类型、标题、步骤或状态、输入、输出、不变量、异常处理、公式、子关系和实现责任。类型仅用于选择渲染器，不强制统一字段。

推荐类型：`state_machine`、`sequence`、`algorithm`、`formula`、`data_contract`、`narrative`、`subgraph`。

### Anchor

指向真实事实来源。关键字段：仓库、固定提交、路径、锚点类型、可选符号、行范围、摘要、是否必需和验证状态。

锚点类型可包括 `file`、`symbol`、`selector`、`schema`、`rule`、`prompt_block`、`formula`、`test`、`result`、`document_section`。

### Decision

架构选择或撤销。关键字段：问题、备选、采用项、撤销项、理由、证据、影响对象和状态。Decision 不要求每次都使用 ADR 文件，但可链接 ADR。

### Evidence

能够触发、支持或反驳设计的事实。类型包括用户反馈、GPT Work finding、独立研究、实验反例、Codex 观察、测试、真实故障、外部 API 变化、性能测量、科学结论和产品决定。

Evidence 记录来源和强度，不把“有文件”自动解释为“能力已验证”。

### Issue

当前缺口或漂移。类型包括 blocker、design gap、implementation drift、missing anchor、unverified assumption、stale evidence。Issue 可阻断某些对象或修订冻结。

## 3. 三个状态轴

```text
design: proposed | accepted | open | superseded
implementation: none | partial | linked
evidence: none | checked | validated
```

三轴互不推导。例如：

- `accepted / none / checked`：Delivery Assurance 的已审设计；
- `accepted / linked / validated`：Mica 的关键恢复机制；
- `open / none / checked`：CAT-TRACE 匿名零槽位；
- `superseded / linked / validated`：历史上曾实现但已撤销的路线。

若项目需要更细的运行状态，可放在机制内部，不扩张通用生命周期。

## 4. 变更模型

一个修订的语义差异由 `Change` 描述：

- `target_type` 与 `target_id`；
- `kind`: `add / modify / remove / supersede / align_implementation / evidence_update`；
- `before` 与 `after` 的精简语义快照；
- `reason`；
- `trigger_evidence`；
- `impact`；
- `implementation_alignment`；
- `unchanged_guarantees`。

渲染器据此生成组件叠加、关系差异、前后对照和实现追赶状态，而不是解析 Git 文本补丁猜测系统意义。

## 5. 引用与历史

对象之间只通过稳定标识引用。每个修订记录增量变更，生成器将其物化为当前快照。小项目也可直接保存完整快照，但历史仍必须通过 `Revision` 和 `Change` 保留原因。

删除对象通常表示“从当前架构撤销”，历史记录仍可追溯。真正敏感或错误内容可按仓库治理删除，但不得用普通覆盖抹去重要设计因果。

## 6. 完整性约束

至少执行以下机械检查：

1. 所有引用存在；
2. 组件关系端点存在；
3. `implementation=linked` 至少有一个已验证锚点；
4. `design=accepted` 的关键组件必须有机制或明确豁免；
5. 关键关系必须说明载荷或约束；
6. 变更必须有原因，重大变更必须有触发证据；
7. `validated` 必须引用验证证据；
8. 被 blocker 阻断的下游对象可追溯；
9. 固定修订中的锚点使用可解析提交；
10. 当前修订不能引用仅存在于未来修订的对象。

这些约束只证明账本内部一致，不证明系统本身正确。

## 7. 领域扩展

领域差异通过 `Mechanism.content` 和 `Anchor.kind` 扩展，不为每个项目复制一套模型：

- 软件可增加 API、selector、状态事件和测试；
- AI Skill 可增加 rule、prompt block、trigger 和 validator；
- 科研算法可增加公式、参数、数值 routine、oracle、simulation 和诊断；
- 设计态系统可只保存责任、关系、机制和假设。

扩展字段必须命名空间化，并在没有扩展渲染器时仍能以正文安全退化。

## 8. 示例

仓库中的 [`example-ledger.json`](example-ledger.json) 使用同一模型表示三类项目；[`semantic-model.schema.json`](semantic-model.schema.json) 提供结构约束。正式实现可将一个大文件拆成 `project.json`、`revisions/`、`components/` 和 `evidence/`，但逻辑模型不变。

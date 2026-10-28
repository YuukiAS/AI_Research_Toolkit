# 规范语义模型

## 1. 只保留一套规范模型

Asteria Next 直接扩展当前 `ArchitectureProjectV2`。现有 `entities / symbols / relations / variants / views` 继续是语义图核心；repository bridge 继续承担源码绑定。上一轮 Architecture Ledger 中的对象只有在无法由现有模型自然表达时才新增。

## 2. 对象裁决

| 历史概念 | 最终归属 | 是否新增顶层规范对象 | 说明 |
|---|---|---:|---|
| Project | `ArchitectureProjectV2.project` | 否 | 项目容器与身份沿用。 |
| Entity | `StatisticalEntity` | 否 | 继续作为通用语义实体基类。 |
| Symbol | `StatisticalSymbol` | 否 | 数学符号仍是一等实体。 |
| Component | `StatisticalEntity.kind = component` 或领域 subtype | 否 | 是实体子型，不另建组件表。 |
| Mechanism | `StatisticalEntity.kind = mechanism` | 否 | 保存机制语义，renderer 由 subtype／presentation 决定。 |
| Requirement | `StatisticalEntity.kind = requirement` | 否 | 可与 artifact、finding、evidence 形成类型关系。 |
| Decision | `StatisticalEntity.kind = decision` | 否 | 决策正文是实体；它引起的架构变化进入 revision。 |
| Issue／Blocker | `StatisticalEntity.kind = issue` + current state | 否 | 只有需要稳定引用时才建实体；普通警告可为 validation finding。 |
| Artifact | `StatisticalEntity.kind = artifact` | 否 | 产品、页面、对象或渲染可用层级实体表达。 |
| Finding | `StatisticalEntity.kind = finding` | 否 | 绑定实际、预期、要求、对象和证据。 |
| Relation | 扩展 `TypedRelation` | 否 | 增加合同字段，不建立平行 relation。 |
| Anchor | `RepositoryBridgeBinding.structuralAnchor` | 否 | 是绑定中的值对象，不是独立知识实体。 |
| Evidence | `EvidenceRecord` | 是，扩展现有 Evidence 语义 | 需要候选身份、范围、有效期和失效原因，不能只靠 provenance 文本。 |
| Revision | `ArchitectureRevision` | 是 | Git commit 无法替代语义修订。 |
| Change | `SemanticChange` | 是 | 修订中的原子语义改变，引用实体／关系／机制／绑定／证据。 |
| Freeze | `ArchitectureFreezeReport` 派生记录 | 否 | 是对 revision 的检查与裁决，不是业务实体。 |
| Drift | `DriftFinding` 派生记录 | 否 | 由设计、绑定、代码与证据比较产生；关闭后不污染规范图。 |
| Architecture projection | `ArchitectureView` | 否 | 路径、层、trace 与领域 renderer 都是投影。 |
| Lineage | `ArchitectureView.kind = lineage` | 否 | 保持现有来源视图。 |
| Validation | validation run + EvidenceRecord／Finding | 否 | 过程与结果分开，不增“Validation”万能对象。 |

## 3. 现有对象的最小扩展

### 3.1 `StatisticalEntity`

新增通用 `entityClass` 或扩展 `kind`，至少支持：`capability`、`component`、`mechanism`、`requirement`、`decision`、`issue`、`artifact`、`finding`、`scientific_model`、`numerical_routine`。保留现有统计实体类型；迁移不得把 `model / theorem / algorithm / dataset / result / claim / limitation / open_question` 压平。

可选字段：

```ts
type EntityLifecycle = "accepted" | "tested" | "design_only" | "open" | "blocked" | "superseded"

type ArchitectureEntityExtension = {
  responsibility?: string
  inputs?: EntityRef[]
  outputs?: EntityRef[]
  invariants?: string[]
  failureModes?: FailureMode[]
  recoveryConditions?: RecoveryCondition[]
  lifecycle?: EntityLifecycle
  ownerRef?: string
}
```

这些字段不是 UI 必显项。renderer 按当前任务选择显示。

### 3.2 `TypedRelation`

```ts
type RelationContract = {
  payload?: PayloadSpec
  consumerId?: string
  preconditions?: string[]
  failureMeaning?: string
  recoveryMeaning?: string
  guarantees?: string[]
}

type TypedRelationNext = TypedRelation & {
  contract?: RelationContract
  validInRevisionIds?: string[]
}
```

`consumerId` 与 `targetId` 可以相同，也可以不同。例如 evidence 进入评价对象，但真实消费者是一个独立 review job。机械检查只对标记为关键或 accepted 的关系强制合同，不要求所有注释边填写载荷。

### 3.3 `ArchitectureView`

新增 projection metadata：`pathIds`、`rendererKind`、`readingOrder`、`manualLayoutOverrides`。路径只引用规范实体和关系，不复制它们；手机 readingOrder 可独立于桌面坐标。

## 4. 新增规范对象

### 4.1 `ArchitectureRevision`

```ts
type ArchitectureRevision = {
  id: string
  projectId: string
  label: string
  status: "draft" | "candidate" | "frozen" | "superseded" | "rolled_back"
  createdAt: string
  parentRevisionIds: string[]
  sourceCommit?: string
  trigger: string
  reason: string
  evidenceRefs: string[]
  changeIds: string[]
  downstreamImpact: ImpactRef[]
  unchangedGuarantees: Guarantee[]
  implementationAlignment: AlignmentSummary
}
```

Revision 不是 commit 别名。一个 revision 可以跨多个 commit，一个 commit 也可以不产生 revision。

### 4.2 `SemanticChange`

```ts
type SemanticChange = {
  id: string
  revisionId: string
  operation: "add" | "remove" | "modify" | "supersede" | "correct" | "rollback"
  target: EntityRef | RelationRef | BindingRef | EvidenceRef
  before?: unknown
  after?: unknown
  rationaleRef?: string
  affectedRefs: string[]
  evidenceInvalidation?: EvidenceInvalidationRule[]
}
```

Semantic diff 从 change 和规范快照计算，不能只保存一段人工总结，也不能把原始 JSON diff直接当产品输出。

### 4.3 `EvidenceRecord`

```ts
type EvidenceRecord = {
  id: string
  kind: "mechanical" | "runtime" | "artifact" | "scientific" | "professional_judgment" | "decision"
  candidate: CandidateIdentity
  scopeRefs: string[]
  producedBy: ProducerIdentity
  observation: string
  conclusion?: string
  status: "valid" | "stale" | "invalid" | "pending"
  validForCommit?: string
  generatedAt: string
  invalidatedBy?: string[]
  limitations: string[]
}
```

Evidence 不能自己提升实体状态。状态改变需要显式 decision／freeze 过程。

## 5. 派生状态

### 5.1 设计领先代码

实体为 `design_only`、实现绑定为空且 revision 明确说明尚未开始时，这是合法状态，不是漂移。

### 5.2 代码领先设计

静态索引发现新符号或调用关系，只产生候选绑定和 drift finding；在人工确认前不得写回规范设计。

### 5.3 实现漂移

绑定的固定提交、结构锚点或代码指纹不再匹配时，bindingStatus 变为 `STALE` 或 `BROKEN`。这只说明实现映射失效，不说明设计错误或科学结论错误。

### 5.4 证据漂移

候选字节、相关实现、要求或验证协议改变后，受影响 EvidenceRecord 变为 `stale`。未改对象的证据可保留，但依赖传播和代表性全局复验必须单独定义。

## 6. 规范不变量

1. 每个 stable identity 在项目内唯一，view 不得创建同义副本。
2. accepted 关键组件必须有责任；design-only 组件可以没有 implementation binding。
3. accepted 关键关系必须说明方向、语义、载荷和真实消费者。
4. `TESTED / AUDITED / VALIDATED` 需要有效 evidence reference。
5. implementation binding 必须固定提交并记录来源；自动推断不能冒充人工确认。
6. revision 必须有 trigger、reason、至少一个 change 和 downstream impact。
7. superseded／corrected／rolled_back 路线保留来源与触发证据。
8. ArchitectureView 是投影，坐标和阅读顺序不得反向成为语义真值。
9. 代码不能自动更新科学真值；验证器不能越权修改产品。
10. UI 不因字段存在就显示字段。

## 7. 物理存储建议

保持当前 Asteria schema 和 TypeScript 实现为主，不新建数据库。项目导出可采用一个规范包：

```text
.asteria/
  project.json              # ArchitectureProjectV2/Next
  revisions.json            # ArchitectureRevision + SemanticChange
  evidence.json             # EvidenceRecord index
  repository-bridge.json    # existing bridge manifest
```

大型证据产物只保存可定位引用和哈希；真实文件留在项目仓库的既有位置。索引、布局缓存和截图放在可再生目录，不进入规范包。

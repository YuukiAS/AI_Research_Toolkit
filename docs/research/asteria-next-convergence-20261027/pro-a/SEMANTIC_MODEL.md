# 同一套语义模型，贯通设计、实现与返修

Asteria Next 沿用 Asteria 2.0 的实体、符号、类型化关系、模型变体和视图投影，在这套模型中增加来源锚点、架构修订，并将现有仓库桥接绑定泛化。组件、机制、要求、产物、证据、决定和问题都使用同一套实体身份。四个参考项目共享的是这些关系与身份，机制正文可以分别呈现状态变化、公式、数值步骤或页面验收。

本文冻结的是本轮最终候选的设计。现有 Asteria 正式源码没有被修改；原型只演示下述模型的投影子集，不构成正式格式迁移或通用导入器已经实现的证据。

## 现有模型的真实起点

固定来源为 Asteria 提交 `60ba27a38324980beea78d4c07b7b28abda522cf`。`ArchitectureProjectV2` 已有五套字典；实体和符号具有独立身份，视图通过实体 ID 取得内容，仓库桥接也已使用实体 ID 绑定函数和测试。因此保留这个基础不存在核心模型冲突。[1]

需要区分已实现能力与样例：局部上下游遍历是通用实现；当前 TRACE → CAT-TRACE 语义比较却直接返回预写条目，没有读取两个输入。仓库桥接具备类型与校验，但数据仍是合成固定提交样例。现有证据状态按支持边与缺口边计数，不能直接继承为 Next 的“已验证”判据。[2–4]

## 模型的唯一根结构

以下名称是交换格式的稳定概念，不要求每个项目填写所有字典，更不要求界面逐字段显示。

```ts
type ArchitectureProjectNext = {
  schemaVersion: string;
  project: ProjectMetadata;
  entities: Record<EntityId, SemanticEntity>;
  symbols: Record<SymbolId, StatisticalSymbol>;
  relations: Record<RelationId, TypedRelation>;
  variants: Record<VariantId, SemanticVariant>;
  views: Record<ViewId, ViewProjection>;
  anchors: Record<AnchorId, SourceAnchor>;
  bindings: Record<BindingId, ImplementationBinding>;
  revisions: Record<RevisionId, ArchitectureRevision>;
  legacy?: LegacyCompatibilityPayload;
};
```

`anchors` 和 `revisions` 是新的根对象。`bindings` 接收现有 `RepositoryBridgeBinding` 的职责和迁移数据，独立保存连接身份，避免同一函数在多个实体里反复复制。其余新增概念都属于现有实体或派生投影；不增加第二套 Component、Mechanism、Evidence、Issue 数据库。

`legacy` 延续现有兼容载荷，只供迁移回读，不能参与新对象的有效性判断。字典可以为空；缺少一个不适用的类别不是完整性缺口。下文类型是冻结候选的结构契约，辅助类型由相应领域校验器展开，不能据此宣称正式 TypeScript schema 已经发布。

项目、实体、关系、符号、锚点和绑定的 ID 都与显示名称、文件路径和修订号分离。重命名保持 ID；两个对象合并必须记录明确对应关系和理由。现有含变体名的 ID 继续保留，不根据字符串相似度自动合并。

## 实体采用有类型的能力面

所有实体共享少量基本信息，再按种类携带有约束的能力面。正文通过来源编译进入当前快照，作者不在 JSON 中再维护一份相同说明。

```ts
type EntityBase = {
  id: EntityId;
  kind: EntityKind;
  label: string;
  description?: string;
  designState:
    | "proposed" | "accepted" | "unresolved"
    | "superseded" | "rejected";
  sourceRefs: AnchorId[];
  symbolIds?: SymbolId[];
};

type ComponentEntity = EntityBase & {
  kind: "component";
  facets: {
    component: ComponentFacet;
    mechanism?: MechanismFacet;
  };
};

type MechanismEntity = EntityBase & {
  kind: "mechanism" | "algorithm";
  facets: { mechanism: MechanismFacet };
};

type EvidenceEntity = EntityBase & {
  kind: "result";
  facets: { evidence: EvidenceFacet };
};
```

正式类型使用可判别联合。每个已注册种类都有允许的能力面和校验规则，拒绝未知能力面被静默当成有效数据。迁移产生的旧版内容可进入显式 `legacy` 区保存，直到作者确认含义；它不自动成为已接受设计。上述三个类型只展示组合方式，其余种类的必需语义如下。

草稿中的 `sourceRefs` 可以为空，作者提交的规范性内容在冻结时必须能回到实际作者文件。导入历史机制时，`accepted` 需要原来源中的接受依据；仅由本轮研究重构出的解释保留重构身份，不能追认原作者未做过的设计决定。

| 实体种类 | 必须说明的内容 | 允许为空或按需补充 |
|---|---|---|
| `component` | 责任、边界；已接受且在冻结范围内时，还需机制或具名外部契约 | 实现绑定、测试结果、运行证据 |
| `mechanism` / `algorithm` | 所属责任、机制形式、输入输出、成立条件；未定算法必须说明待决内容 | 尚不存在的步骤、实现、结果 |
| `requirement` | 用户可观察的要求、适用对象或场景、判断方式 | 尚未产生的验收结果 |
| `artifact` | 产品身份、候选版本、内容指纹及组成 | 生成产品的源码绑定 |
| `artifact_part` | 所属产品与稳定对象身份；当前候选内的页面/对象定位 | 在其他版本中的位置，直到完成匹配 |
| `claim` / `theorem` | 命题、前提、适用范围 | 证明、实验、实现证据；缺失时保持待证 |
| `result` + `evidence` | 被检验对象版本、方法、结果、来源、评审者或工具、有效性依赖 | 未执行时不能创建“通过结果”；可另建验证计划 |
| `decision` | 采用内容、理由、备选及取舍、影响对象、触发来源 | 真实不存在的备选；无需为了格式编造 |
| `issue` | 问题、受影响范围、阻塞条件或后果、来源 | 尚未发生的修复与关闭证据 |
| 既有科研实体 | 原定义、约束、维度、索引及科学含义 | 不适用的科学属性，不要求软件或页面对象填写 |

一个组件只有自己使用的机制可以内嵌在 `facets.mechanism`。需要被多个组件共享、独立修订或拥有独立子关系时，机制才提升为独立实体，由 `realized_by` 关系连接。不得同时内嵌一份完整机制、又另建一份同义机制实体。

### 机制足够明确，但不强迫所有内容使用状态机

`MechanismFacet.kind` 决定语义和合适的渲染方式。每种形式都有正常路径和适用边界；失败与恢复可以指向共用机制或明确的不适用理由，不能仅留空让执行者猜测。

| `kind` | 结构要求 | 适合的内容 |
|---|---|---|
| `procedure` | 有序步骤、每步使用的输入和产生的输出、终止条件 | DA 的检查与返修职责 |
| `state` | 状态、事件、守卫条件、转换动作、终止或取消条件 | Mica 清空恢复 |
| `sequence` | 参与者、事件或调用、载荷、接收方、关键替代分支 | 连接器事件与连续显示 |
| `formula` | 公式、符号引用、假设、适用范围；需要时关联数值步骤 | CAT-TRACE 的科学模型 |
| `numerical` | 输入域、目标、近似或误差条件、停止规则、输出；关联公式及校核方法 | 尾部数值计算、参考算法 |
| `opaque_contract` | 外部提供方、可观察输入输出、失败语义、限制和验证责任 | 有明确责任边界的外部服务 |
| `unresolved` | 尚无唯一算法或关键行为的具体问题、已排除路线、影响范围 | CAT-TRACE 未闭合生产算法 |

`unresolved` 是合法架构状态。它是否阻止冻结，取决于当前要冻结的能力是否必须依赖这项未定行为。`opaque_contract` 也不是逃避机制的通道：冻结检查必须确认依赖方已经知道正常、失败及恢复时会收到什么。

机制的类型描述“它如何工作”；渲染器描述“怎样读起来清楚”。同一机制可有桌面图形、手机步骤阅读和可访问文本三种投影，三者读取相同内容。

## 关系必须有可解释的语义

保留现有 `id`、`type`、`sourceId`、`targetId`、方向和来源。关系端点仍引用实体；符号通过所属实体及公式绑定进入关系，避免把文字中的每个符号实例画成组件。

```ts
type TransferContract = {
  payload: { summary: string; schemaAnchorId?: AnchorId };
  consumer: {
    entityId: EntityId;
    mechanismId?: EntityId;
    stepId?: string;
    implementationBindingId?: BindingId;
  };
  trigger: string;
  failure?: string;
  recoveryRef?: EntityId;
};
```

信息流关系 `sends`、`calls`、`produces_for` 必须包含 `TransferContract`。消费方应是目标组件、目标组件内的机制或步骤；源码消费者尚不存在时，设计消费者仍必须明确，`implementationBindingId` 可以为空。已经声称代码接入时，绑定必须能定位实际消费者。

其他关系采用各自的契约：`contains` 说明组成，`depends_on` 说明依赖，`supports` 说明证据支持对象及范围，`violates` 将发现绑定到要求，`repairs` 将修复关联到发现，`supersedes` 保留被替代路线。科研关系 `parameterized_by`、`marginalizes_to`、`identified_by` 等继续保留原含义；它们不需要消息载荷。共同核心不意味着所有箭头都同义。

例如 Mica 的连接器事件关系具有实际消费者：`dispatchLatchEvent` 发布 `mica-connector-lifecycle-latched`，`handleSharedConnectorLifecycle` 消费其状态。载荷含连接器代次、来源、输入框身份与最近矩形；一条装饰性“依赖”边无法替代这些信息。[5]

## 设计、实现、证据分别判断

实体保存作者的设计决定；实现是否存在由绑定和固定来源检查得出；证据是否仍适用于当前对象由结果和依赖范围得出。三者可以并列查看，但不压成总分，也不以最弱状态覆盖其他事实。

| 情形 | 设计 | 实现 | 证据 |
|---|---|---|---|
| DA 已描述机制，尚未开发 | 可以已接受 | 空绑定合法 | 设计审查可以存在，运行证据没有 |
| Mica 连接器连续显示 | 机制已描述 | 函数及选择器已定位 | 特定本地输入用例通过；真实设备收益另计 |
| CAT-TRACE 参考算法 | 算法定义明确 | 参考实现存在 | 数值或收敛结论按具体结果保留限制 |
| 教学材料页面修复 | 要求未变或有明确修订 | 新文件已生成 | 旧布局证据可能过期，未改内容证据需核对依赖 |

机械检查可以阻止“已关联实现却没有锚点”“声称通过却没有结果”等不一致。产品范围是否漏掉整个场景、算法是否成立、页面是否成熟，仍需要有对象和依据的专业判断。完整性检查只给出缺口和待判断项，不宣告架构已经正确。

## 变体、修订与谱系各有用途

模型变体表示需要并存比较的定义，例如 Original TRACE 与 CAT-TRACE；修订表示同一项目或局部对象为何随时间改变；谱系表示一个方法借鉴、保留或替换了哪个既有方法。三者均可显示在同一关系网络中，但不能互相替代。

```ts
type SemanticObjectRef =
  | { kind: "entity"; id: EntityId }
  | { kind: "relation"; id: RelationId }
  | { kind: "symbol"; id: SymbolId }
  | { kind: "variant"; id: VariantId }
  | { kind: "binding"; id: BindingId };

type RevisionBase = {
  id: RevisionId;
  parentIds: RevisionId[];
  scope: SemanticObjectRef[];
  triggerRefs: EntityId[];
  reason: string;
  impact: ImpactStatement[];
  preservedClaims: PreservedClaim[];
  decisionRefs: EntityId[];
  evidenceRefs: EntityId[];
};

type ArchitectureRevision = RevisionBase & (
  | {
      state: "draft";
      sourceManifestDigest?: string;
      snapshotDigest?: string;
    }
  | {
      state: "frozen" | "source_reconstruction";
      sourceManifestDigest: string;
      snapshotDigest: string;
    }
);
```

`frozen` 只用于具备明确冻结来源的真实记录。本轮原型从 Mica、CAT-TRACE 或 Tutorial 历史文件重构的修订标为 `source_reconstruction`，不能伪装成原作者当时已经冻结的架构包。`draft` 保留未提交或待裁定的变化。恢复和撤销通过新的修订及原因表达，旧结果不被覆盖。

范围可以选定实体、关系、符号、变体或绑定，不能只允许组件。来源锚点作为这些对象的依赖进入快照清单；它们不可变，来源更新通过新锚点与绑定变化体现。初次建模可以没有父修订；其余修订必须引用真实父项。草稿允许尚无冻结摘要，但正式冻结或来源重构记录必须保存实际输入清单与快照摘要，不得填入占位值。

语义差异由两份快照规范化比较产生，覆盖实体定义、机制、关系契约、要求、假设与适用范围。视图坐标、折叠、主题和当前选择不参与语义比较。作者补充为什么改、受影响范围和保留承诺；机器不能从字符串相同推导“行为没变”。局部比较之外的对象只作为背景，不标作“已经证明未变”。

修订文档不需要写入自己的 Git 提交哈希，避免自引用。冻结时计算源文件内容清单和语义快照摘要；导入器再记录它从哪个 Git 提交读到这些内容。跨仓库源码绑定则必须固定到已有提交。这样可以在一次正常提交中保存架构修订，而不用为补上自身哈希再做一次空转提交。

摘要规则必须一并固定。`snapshotDigest` 对规范化语义内容计算，涵盖实体、符号、关系、变体与绑定契约，排除布局、导入时间、定位行号以及修订表自身。来源引用按内容摘要归一化，读取提交作为来源元数据另存，避免把尚未生成的自身 Git 提交纳入计算。`sourceManifestDigest` 覆盖作者输入文件；当前修订记录按去掉两个摘要字段后的规范化内容参与清单，生成缓存不参与。规范化格式和摘要算法需随 schema 版本记录，不能用不同算法却同名的摘要相互比较。未提交草稿只提供临时来源预览；固定 Git 锚点在读取实际提交后生成。

## 同一快照生成所有视图

系统图、组件面板、机制阅读、来源、证据、局部历史、差异、检查和手机页面全部读取同一选定快照。来源定位结果、代码索引、上下游集合和差异列表可以缓存，但必须带输入摘要；输入改变后重新计算或明确标为待刷新。

布局规则和投影选择可以按领域变化。DA 默认看系统与路径；Mica 看事件和状态；CAT-TRACE 看公式与算法；Tutorial 看候选文件、页面或对象、要求、发现及修复。它们不会复制成四份语义数据库，也不会在每个项目里强制出现所有入口。

大型图先显示有意义的系统边界和用户能力，局部展开组件、机制和实现。隐藏对象仍留在共同快照，查询和校验不能因为当前视图没有画出某个对象而漏掉它。代码索引默认只展开选中对象附近的实现关系，不把整个仓库函数图塞进系统首页。

## 权威内容留在原仓库

设计正文、科研公式、要求和审查理由在仓库原 Markdown 或其他原始文件中维护。Asteria 只增加必要的稳定身份与结构连接，不复制一份同样正文让作者双重维护。具体作者文件、来源解析和导入约束见 [SOURCE_BINDING_AND_EVIDENCE.md](SOURCE_BINDING_AND_EVIDENCE.md)。

编译后的语义快照是查询和交换用的唯一结构模型；原始文件与结构连接共同决定它。视图缓存、浏览器本地存储、索引数据库和界面状态都不是权威来源。本地草稿可以保存为待提交覆盖层，必须保留基线来源摘要；它不自动冒充仓库当前版本，也不能覆盖已经冻结的来源。

## 从 Asteria 2.0 的具体迁移

| 当前实现 | 迁移行为 | 必须保留或补齐的检查 |
|---|---|---|
| `ArchitectureProjectV2` | 通过显式版本迁移生成 Next 快照 | 旧输入保留，失败可回到旧读取路径；正式格式号由实现发布任务确定 |
| `StatisticalEntity` | 保留 ID，以兼容别名迁向 `SemanticEntity` | 原定义、科学属性、公式和来源不丢失；未知字段进入显式旧版区 |
| 必填科研 `layer` 枚举 | 保留科研含义，展示分层改为领域可配置 | 软件和产物不填写虚构科研层级 |
| `StatisticalSymbol` / `FormulaBinding` | 原样迁移身份与含义 | 作用域冲突、缺符号、公式片段失联仍能提示 |
| `TypedRelation` | 保留 ID 与科研语义，增加按类型的契约 | 旧边不自动获得载荷或消费者；待补项明确展示 |
| `SemanticVariant` | 保留并存模型定义 | 不把所有旧变体自动变成历史修订 |
| `ArchitectureView` | 内容仍引用实体，布局归投影 | 不把布局移动算架构变化 |
| 现有静态语义比较 | 保留作者解释作为历史参考，替换比较计算 | 使用两个真实输入；同名不等于同一对象 |
| 现有证据边计数 | 迁为支持关系；状态重新依据证据适用性推导 | 不因迁移而把旧“supported”提高为“已验证” |
| `RepositoryBridgeBinding` | 移入 `bindings`，路径等定位信息归 `anchors` | 保留来源、角色、固定提交与原声明；重新验证才产生当前定位状态 |
| `implementationState` 混合枚举 | 保留导入原值，拆为设计声明、定位结果、证据结果 | `TESTED` 不自动映射为当前证据有效 |
| bridge 要求至少一个绑定 | 放宽为允许空集合 | DA、未定算法、外部契约都可合法导入 |
| `projectForView` 的多份样例实例 | 所有视图从同一选定快照读取 | 跨视图选择、搜索、证据和来源指向同一对象 |
| `role.includes` 校验与临时 `codeBindings` 强转 | 改用有类型能力面和正式绑定表 | 不能靠一段自然语言碰巧含某个词决定是否满足合同 |
| 1.x 兼容与叙事提纲 | 保留既有迁移回归 | 原富文本、布局、版本内容和提纲引用仍可恢复 |

完成迁移的判断是：同一旧项目的科学含义和可追踪身份保持完整，新增机制能够表达其他三类项目，并且视图、比较、导出和校验读取同一数据。只改类型名称或增加字段不算完成。

## 来源

1. [Asteria 核心类型与项目根结构](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/src/architecture/types.ts)。
2. [Asteria 图追踪](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/src/architecture/trace.ts)；[现有语义差异实现](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/src/architecture/semanticDiff.ts)。
3. [Asteria 仓库桥接实现](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/src/architecture/repositoryBridge.ts)。
4. [Asteria 证据状态推导](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/src/architecture/fixtures/multiViewTraceProject.ts#L214-L225)；[现有校验器](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/src/architecture/validation.ts)。
5. [Mica 连接器事件来源](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/connector-lifecycle-signal.ts)；[实际消费者](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/connector-continuity.ts)。
6. [Asteria 版本与旧版兼容约定](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/VERSIONING.md)；[当前视图会话](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/src/architecture/session.tsx)；[现有格式解析](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/src/architecture/schema.ts)。

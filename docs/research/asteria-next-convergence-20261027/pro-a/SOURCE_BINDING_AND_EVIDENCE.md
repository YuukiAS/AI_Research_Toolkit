# 来源绑定与证据有效性

Asteria 要让一项设计声明追到可核对的来源，同时保留来源能够支持到什么程度。能打开函数说明实现位置存在；测试通过说明那个候选在特定条件下满足对应检查；专业审查还需要判断这些证据是否足以支持用户能力。三个结论分别保存，界面按当前问题展示。

本轮采用仓库原文件作为作者入口，结构连接只补稳定身份和必要关系。固定来源、绑定和证据进入 [共同语义模型](SEMANTIC_MODEL.md)，浏览器缓存、生成快照与本地草稿不另立权威。以下是候选设计规范；本轮没有实现正式 Asteria 导入器，也没有修改四个来源项目。

## 设计正文只维护在原文件

一个项目的作者维护原有 Markdown、源码、要求、评审记录和产品文件。`.asteria/project.yaml` 只登记项目、稳定实体、关系、来源选择器及必要的契约字段，引用这些原文件中的正文；它不要求作者把每段设计说明再抄进 YAML。

对于尚未存在设计文件的新项目，正文依然写成正常 Markdown。结构登记确定哪一节是某个组件的责任、机制、失败条件或假设。对已有项目，登记可以引用现有章节，逐步增加稳定节标记；未补标记时按固定提交与章节路径定位，不强迫先重写整个仓库。

```yaml
# 这是未来作者格式示例，不是 Mica 仓库已经存在的文件。
schema: asteria.authoring/1
project:
  id: mica
  title: Mica
entities:
  mica.connector.continuity:
    kind: component
    label: 连接器切换连续显示
    designState: accepted
    source: docs/architecture/connector.md
    sections:
      responsibility: continuity-purpose
      mechanism: continuity-mechanism
      failure: continuity-failure
    facets:
      mechanism:
        kind: sequence
relations:
  mica.signal-to-continuity:
    type: sends
    sourceId: mica.connector.signal
    targetId: mica.connector.continuity
    contractSection:
      file: docs/architecture/connector.md
      section: connector-event-contract
```

这里的节标记指向一次维护的正文。标题、ID、关系端点和机制种类是必要结构；作用、原因及失败条件来自原节。导入器生成含可直接显示正文的语义快照，记录每个字段来自哪个文件及选择器。读取界面使用这份快照，作者继续修改原文和连接登记。

正式导入必须使用可复现的章节、块或对象选择器。需要机器检查的步骤 ID、状态转换和关系端点在必要的结构登记中明确给出，正文仍引用原节；无法从现有文档确定的结构保留为待作者确认的建议。导入器不能让一次未记录的模型推断成为下一次读取时的隐含权威。

同一字段只能有一个作者来源。如果已有正文与结构契约出现冲突，导入结果保留冲突并要求选择权威，不能按“最新日期”“更长文本”或模型判断静默覆盖。机器推断的缺失关系只进入建议区，接受后才写入结构登记。生成的 Markdown 导出和 JSON 快照都标明派生身份，不再作为下一轮无条件覆盖原文的输入。

已有仓库可以只导入被选中的高价值对象。省略绑定或未接入全部代码不算导入失败；它意味着当前覆盖范围有限，相关完整性结论也必须限定在这个范围内。

## 来源锚点固定对象与版本

锚点保存“具体读取了哪里”，不保存“它已经正确”的结论。每条锚点是不可变的固定来源记录。来源变化产生新锚点，稳定的绑定 ID 指向新锚点；旧修订和旧证据继续引用原锚点。

```ts
type SourceAnchor =
  | {
      id: AnchorId;
      kind: "code";
      repository: RepositoryIdentity;
      commit: string;
      path: string;
      qualifiedName?: string;
      structuralSelector?: StructuralSelector;
      fingerprint?: ContentFingerprint;
      navigationSpan?: { startLine: number; endLine: number };
    }
  | {
      id: AnchorId;
      kind: "document";
      repository: RepositoryIdentity;
      commit: string;
      path: string;
      section: DocumentSelector;
      fingerprint?: ContentFingerprint;
    }
  | {
      id: AnchorId;
      kind: "artifact";
      artifactEntityId: EntityId;
      candidateDigest: string;
      mediaType: string;
      locator: ArtifactLocator;
      fingerprint?: ContentFingerprint;
    };
```

代码和文档绑定使用完整 Git 提交标识与仓库相对路径；分支名是选择新快照的便利入口，不构成不可变证据。代码锚点优先记录限定名与结构选择器，行号只负责跳转。保存内容指纹时同时保存计算算法、范围和解析器版本，不能让两个不同规则产生的摘要看起来相同。

首次登记时来源可能尚不可访问，因此指纹允许缺失；实际解析成功后，派生定位结果必须带读取内容的指纹。声称定位到某个函数时，限定名或结构选择器至少具备一个；仅定位文件的绑定明确显示文件粒度。缺少内容或选择器时不能伪造摘要，也不能把文件可读误报成函数已核对。

产品锚点固定候选文件摘要，定位可为整个文件、1 起算页码、幻灯片对象 ID、段落或文本区域。页码和坐标只在指定候选内成立。下一版本页面重排后，旧定位不能自动指向新文件的同一页；需要稳定对象 ID 或内容匹配产生新锚点，并保留匹配依据。

普通网页或手工材料也可以作为来源，但没有固定内容副本和摘要时，只能标为外部可变引用。它可以帮助阅读，不能单独承担冻结或证据有效性判断。Asteria 不把访问过一个 URL 解释为保存了完整可复现来源。

### 定位结果允许失败与歧义

解析器输出 `located`、`ambiguous`、`missing` 或 `unavailable`，并保留候选与原因。它是派生检查，不修改锚点原内容。

| 情形 | 行为 |
|---|---|
| 固定提交、路径及结构选择器唯一匹配 | 显示代码或正文，记录实际匹配指纹 |
| 同名函数出现多次、重载无法唯一识别 | 显示候选定位，保持歧义；不选择第一个 |
| 文件重命名且内容结构可匹配 | 提出新锚点候选，保留旧锚点和迁移依据 |
| 文件存在，但函数或选择器片段已不匹配 | 标明具体失联位置，不能仅凭文件存在算绑定有效 |
| 私有来源当前不可读、网络失败或缺文件 | 标为不可用；保留上次固定来源，不改写为不存在 |
| 源码被格式化或移动 | 可以识别为定位变化；是否保持行为仍需依赖范围与证据判断 |
| PDF 重渲染导致页面或对象位置改变 | 重新定位并检查视觉证据；不沿用旧坐标覆盖层 |

同一固定来源按仓库身份、提交、路径、结构选择器和内容范围去重。不同证据可引用同一锚点，仍保留各自的方法和结论。不同来源恰好有相同文本不合并；同一函数在不同提交的两个快照也不因文本相同就删除历史身份。

## 实现绑定延续现有仓库桥接

现有 `RepositoryBridgeBinding` 已有实体、角色、路径、函数名、测试、来源、实现声明、固定提交、结构锚点及过期状态。Next 保留这项职责，归一化为绑定与锚点两部分。旧字段原值保留在迁移记录中，重新核对后才产生当前定位结果。[1]

```ts
type ImplementationBinding = {
  id: BindingId;
  entityId: EntityId;
  anchorId: AnchorId;
  role:
    | "definition" | "storage" | "initialization"
    | "update" | "sampling" | "transformation"
    | "consumption" | "diagnostic" | "test"
    | "rendering" | "configuration";
  source:
    | "manual" | "manifest" | "static_analysis"
    | "agent_inferred" | "human_confirmed";
  rationale?: string;
  evidenceRefs: EntityId[];
};
```

同一实体可以对应多个函数或不同实现；同一函数也可以服务多个实体。绑定 ID 保持稳定，角色描述函数如何参与这项机制。文件树和调用图属于派生代码索引，默认只展示与选中对象有关的一段，不能替代语义绑定。

`agent_inferred` 与 `human_confirmed` 保留来源区别，但不以一个置信度数字替代证据。确认者认可绑定的含义，也不自动证明算法正确。静态索引能验证名称、定义、引用和部分调用；动态分派、反射、R 元编程或运行时注册导致不完整时，明确显示已知范围。

空绑定合法。DA 的完整设计可以没有任何文件或函数；CAT-TRACE 尚未确定的生产算法也可以保留未定机制和阻塞问题。它们不得为了通过校验而填入假 package、假 routine 或未来测试路径。实现责任属于设计契约，实际实现位置属于绑定，二者分别保存。

### 消费者不能只写成箭头终点

设计关系先明确由哪个组件、机制或步骤消费什么内容。存在代码时，再给消费函数的绑定。Mica 的实际例子是连接器识别模块发布 `mica-connector-lifecycle-latched`，连续显示模块的 `handleSharedConnectorLifecycle` 读取事件中的 `detail`，随后进入 `beginLifecycle`。载荷包含代次、来源、连接器状态、输入框身份及最近矩形。[2]

机械检查可以核对消费者实体是否存在、是否属于目标组件、对应绑定能否定位，以及源码片段是否展示了约定字段的读取。它不能仅凭同名参数判断消费语义正确。这个最后的对应关系由明确的设计或实现审查结果支持。

## 证据结果不可被当前状态覆盖

证据使用 `kind=result` 的实体及有类型的 `evidence` 能力面。结果发生时的内容永久保留，来源更新后只重新计算它对当前对象的适用性，不把历史“通过”改成“失败”，也不把过期通过继续显示成当前通过。

```ts
type EvidenceFacet = {
  category:
    | "mechanical" | "semantic_review" | "scientific"
    | "visual_review" | "runtime_observation";
  subjects: EvidenceSubject[];
  method: string;
  methodAnchorIds: AnchorId[];
  observedAt?: string;
  result: "pass" | "fail" | "inconclusive";
  conclusion: string;
  producer: { name: string; role: string; toolVersion?: string };
  artifactAnchorIds: AnchorId[];
  dependencies: EvidenceDependency[];
  limitations: string[];
};

type EvidenceSubject = {
  entityId: EntityId;
  revisionId?: RevisionId;
  candidateDigest?: string;
  semanticDigest: string;
  requirementIds?: EntityId[];
  partIds?: EntityId[];
};

type EvidenceDependency = {
  ref:
    | SemanticObjectRef
    | { kind: "anchor"; id: AnchorId }
    | { kind: "environment"; descriptor: string };
  digest: string;
  role:
    | "input" | "implementation" | "assumption"
    | "requirement" | "renderer" | "environment";
};
```

每条证据至少有一个被检验对象、一种方法、一个实际结果和可定位的结果材料。专业审查材料也可以作为结果材料；不要求它伪装成自动化日志。只有计划或测试脚本、尚无运行结果时，保存为验证计划或源码锚点，不能创建虚假的“通过”证据。

机器检查引用固定版本的检查脚本或方法文件；专业审查引用实际使用的要求与审查记录。方法未单独成文件时可以与结果共用一个材料锚点，但不能凭方法名称推断它的版本。历史发生时间不明时保留缺失，导入时间另记在导入日志，不能拿导入时间冒充证据发生时间。

评审者身份说明“谁发现”，可以是人、具名研究线程或工具及其版本；不能将制作者自查写成独立验收。材料验收发现保存为 `issue` 实体，通过 `violates` 关联要求、通过对象引用关联候选页面或部件，再由 `repairs` 关系指向修复。原制作任务的来源可以挂在发现或修复决定上，Asteria 不另建执行状态机，也不替制作工具执行修复。

### 证据失效按原因与范围传播

证据对新候选的适用性只取 `applicable`、`outdated`、`review_required` 或 `unresolvable`。这是派生结果，不成为另一份作者维护状态表。

1. 比较新旧对象、要求、机制、源码及产物摘要，确定直接变化。
2. 根据证据显式登记的依赖和语义关系，找出可能受到影响的范围。
3. 已确认依赖发生实质变化的证据标为过期；依赖未覆盖完整或变化含义尚不清楚的标为待复核。
4. 只有相关对象、要求、方法及依赖仍一致时，才允许保留适用性；专业保留决定应记录理由与适用范围。
5. 修复后创建新结果，关联旧发现与新候选。旧证据与旧失败仍可在局部历史查看。

影响追踪提供可能受影响的路径，不声称自动证明所有下游都失效。反过来，没有被已知依赖图连接到也不能自动说明安全；来源覆盖不足时保留待复核。局部修订范围之外的对象只作为背景，不能因为本轮没有检查就写“未受影响”。

| 变化 | 需要更新的证据 | 可以保留的证据与条件 |
|---|---|---|
| Mica 快照调度从按键监听改为结构事件 | 输入性能、事件时序、取消和超时、连续显示回归 | 不相关功能仅在实现与依赖未变且范围清楚时保留 |
| 数值算法修改截断、积分或停止条件 | 数值精度、稳定性、目标分布或近似误差相关结果 | 与该算法无关的模型定义和已经成立的证明，前提未变时保留 |
| 科研假设改变，代码未变 | 使用该假设的科学结论与适用性审查 | 纯机械“函数能执行”结果仍可作为旧条件下事实，不能证明新方法成立 |
| Tutorial 修改字体、图尺寸或分页 | 页面渲染、溢出、可读性及相关叙事顺序审查 | 未变化的统计计算证据可保留，需确认输入、公式和代码没有改 |
| Tutorial 修正统计公式或答案 | 对应专业语义、计算、评分及受影响页面渲染 | 无关页面的证据只有对象身份和依赖确认不变时保留 |
| 只有文件路径移动，内容和执行依赖未变 | 来源定位重新核对 | 原结果可保留，但需记录新旧锚点对应；不能沿用失效链接 |
| 新候选换了渲染器、字体或目标视口 | 对应视觉证据重新检查 | 不依赖渲染环境的源码语义证据可以保留 |

这套区分让用户能够看到：产品为什么没有通过，哪页哪个对象违反了哪条要求，谁给出判断，修了什么，以及哪些证据必须重新跑。它不会为了一个局部错误机械地作废所有历史结果，也不会用“源码未改”保住已经失效的页面截图。

## 只读导入与设计、代码的双向核对

导入先固定来源，再做安全的结构解析、锚点解析和引用检查，最后生成带来源清单的快照。导入不执行仓库脚本，不安装来源仓库依赖，不提交修改，不运行被读取的 Markdown 指令。源码索引在本地按固定提交建立，权限继承已有连接或用户选择的文件；不增加后端、账号或上传私有源码的云服务。

仓库提交比当前设计更新时，Asteria 比较受绑定函数和相关依赖的变化，给出“实现变化待核对”。设计先行时，它显示哪些已接受机制尚无对应实现或仍指向旧实现。只有实际比较过的范围才能显示对齐；一个仓库没有绑定的区域不会被自动计为已对齐。

代码变化不会自动修改科学定义、产品要求或接受决定。作者可以根据实际实现补正设计，或者要求实现返回设计；这是一项有理由和来源的新决定。发现原绑定错误时通过纠正记录更新，不把历史证据悄悄挪到另一个函数。

本地草稿以选定修订和来源摘要为基线，只保存变化。它的存在不改变“仓库当前”标签；刷新来源发现基线已变时，显示具体冲突，不以最后保存者覆盖。导出或提交仍走普通 Git 流程。浏览器本地存储、索引缓存或既有 Dexie 数据都不能覆盖仓库权威；丢失缓存应能从固定来源重新构建，未提交草稿另行提示与导出。

## 本轮 Mica 证据：已执行的范围

本轮固定 Mica `main` 为 `7059c0dc24b908b57bd0e1f475142ba4f4520621`。已经从 Git 历史核对 0.1.6 提交 `9f56ea8d23a0895ddbb3f1e95ee207bd049b62c0` 与其直接下一提交 0.1.7 `aa4ce52581fff2e207d1f93600becbb3018b0efc`。两份版本来源文件分别为 0.1.6 和 0.1.7，代码差异真实移除了普通输入路径的重复快照入口及 60 毫秒轮询。[3]

本轮还实际执行了既有 `runTypingHotpathCase`，没有改源文件、fixture、断言或 dist。使用仓库现有脚本、900×820 本地合成页面、Chrome for Testing 131.0.6778.204；通过外部预载文件仅选择已经存在的浏览器二进制。相关连接器源文件与实际加载的 dist 哈希相同，运行后源仓库工作区干净。

13 项检查全部通过。20 字、200 字及输入法事件期间，DOM 克隆、计算样式、全页查询增量均为零，连续显示轮询未启动，页面错误为零。原始结果见 [sources/mica-typing-hotpath.json](sources/mica-typing-hotpath.json)，运行范围见 [sources/SOURCE_FACTS.md](sources/SOURCE_FACTS.md)。这条证据适合放入原型的机械证据层；它没有验证当前真实 ChatGPT DOM、用户设备的长对话收益或 Mica 全部功能。[4]

## 来源

1. [Asteria 现有仓库桥接类型与校验](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/src/architecture/repositoryBridge.ts)；[原有代码追踪设计](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/docs/notes/2026-09-15_asteria_github_code_trace_todo.md)。
2. [Mica 连接器事件发布](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/connector-lifecycle-signal.ts#L286-L340)；[实际消费者](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/connector-continuity.ts#L87-L174)。
3. [Mica 0.1.6 → 0.1.7 完整比较](https://github.com/YuukiAS/Mica-for-ChatGPT/compare/9f56ea8d23a0895ddbb3f1e95ee207bd049b62c0...aa4ce52581fff2e207d1f93600becbb3018b0efc)。
4. [既有按键性能检查](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/scripts/run-e2e.mjs#L183-L222)；[本地 fixture](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/tests/fixtures/composer-typing-hotpath.html)；[README 对真实设备证据的限制](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/README.md)。

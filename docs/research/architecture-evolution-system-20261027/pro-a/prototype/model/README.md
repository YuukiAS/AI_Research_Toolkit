# 原型使用的通用语义合同

这份数据是本轮研究切片，不是三个项目新的正式设计权威。三个项目使用同一格式，由 `model-core.mjs` 中的 `validateProject` 执行明确结构检查。设计、代码存在性与科学／产品验证不能互相推导。

## 六种对象

| 对象 | 核心字段 | 说明 |
| --- | --- | --- |
| 组件 | `id, title, role, design, mechanism, implementation, evidence` | `mechanism` 按内容选正文、步骤、时序、状态、公式或合同；没有固定四问模板 |
| 关系 | `id, from, to, object, at, reality, anchors` | `object` 是传递对象或依赖含义；`at` 是真实或拟议交互点；`kind` 区分数据、控制、证据等关系 |
| 来源锚点 | `id, repo, commit, path, lines, kind, url` | 完整提交固定；URL 必须与元数据一致。`symbol/title` 辅助定位，行号不作为跨版本身份 |
| 证据 | `id, basis, claim, anchors, limits` | 说明支持什么、从何而来、不能证明什么；运行记录还需具体绑定 |
| 变更 | `id, from, to, scope, reason, triggers, decisionAnchors, changed, unchanged, implementation` | 表达因果及实施跟进；`focus` 可选，指出当前最适合打开的核心组件 |
| 修订 | `id, scope, context, design, code, components, relations` | `scope` 为 `system` 或组件 ID 集合；局部历史的其他对象是当前上下文 |

项目外壳、默认视图、路径按钮、显示文字和生成的 SVG 属于组织或呈现信息，不增加新的业务对象。代码布局和视觉字段不参与系统差异。

## 状态与来源类型

`design.state` 仅取 `proposed / accepted / retired`。没有独立设计决定、据源码回建时为 `null`，并用 `basis: source-reconstruction` 明确依据；不能显示成“已经冻结”。

`implementation.state` 取 `unmapped / absent / partial / located`。外部系统边界使用 `external`，它不是成熟度。`located / partial` 必须具有代码、selector 或配置锚点，测试文件不能替代真实实现。未知枚举会被拒绝。

证据的 `basis` 表示来源类型，例如源码核对、测试定义、历史执行记录、审查、实验记录或候选设计。它不是从红到绿的阶段状态。当前实例没有本轮产品运行证据，不能通过页面切换将这些类型升级为 `runtime-run`。

`scopedEvidenceUsable` 演示一个局部规则：只有明确的运行证据，且候选、标准、执行器、观察者与运行条件都对应，才能支持同范围的复用。实际项目会有额外专业条件。该函数经过反例测试，但没有接入一个自动验收平台。

## 稳定身份和不可变来源

组件 ID 用于跨版本对齐，不随标题或文件移动而变化。锚点 ID 表示某次具体来源观察；同一个锚点 ID 不允许重定向到另一提交。新增代码观察使用新的锚点身份，并在新的修订中引用。

旧变更、旧锚点、旧证据和旧修订均可通过 `build --baseline` 与已冻结清单比较。追加更正可以解释旧事实错误，不能偷偷改写旧原因。原型不把“存在一个 `author` 字段”当成真实审批。

## 局部历史与差异范围

Mica 的两版只比较连接器及其相关关系；CAT 的两版只比较 C04。其余对象保持同一当前上下文，差异结果为 `context`，不算历史未变。上下文被意外改动会报错，要求恢复或扩大有依据的范围。

关系端点改变时，同一逻辑关系在并集图中有两个显示实例。组件及关系的显示实例不改变其稳定业务身份。详情选择同时记录端点，旧版本优先读取该版本的来源。

## 这些检查没有做到什么

结构合法不证明文字真实，也不证明一条理由足以解释所有修改。机制正文的改写仍会进入结构差异，程序没有判断自然语言语义等价。源码的真实存在性与具体行范围来自本轮实际读取；核心校验只确认本地记录与引用一致。

`locateExactFragment` 仅演示唯一文本片段与已知移动线索：重复片段返回歧义，内容变化返回未解析，文件移动返回需确认的候选绑定。它不声称具备通用符号解析或自动语义迁移。

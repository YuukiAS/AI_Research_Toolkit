# Asteria 在协议中的角色：Architecture Completeness Contract + Freeze Ledger

## 1. 定位

Asteria 不应只在设计完成后画一张漂亮架构图，也不应被扩张为自动架构法官。它在本协议中的正式角色是：

> **Architecture Completeness Contract + Freeze Ledger**

也就是：同一份结构化架构记录既约束设计者必须回答什么，又保存最终冻结对象、实现锚点、证据状态和有意义修订；图、详情页、差异和 handoff 都是该记录的投影。

这与最近两个独立 architecture-evolution 研究的共同结论一致：采用轻量、Git 原生的语义账本和静态阅读器，不建设新的后台平台、数据库、账号系统或常驻 Agent。

## 2. 最小对象模型

建议保留九类稳定对象：

- `Project`：边界、正式来源、当前 revision；
- `Capability`：用户真正获得的能力与不变项；
- `Component`：有稳定责任和 owner 的系统对象；
- `Relation`：组件间传递的真实对象、控制或约束；
- `Mechanism`：内部步骤、状态机、算法、公式或决策规则；
- `Anchor`：文件、符号、函数、规则、公式、测试、提交或外部文档的精确定位；
- `Evidence`：测试、probe、事故、审查、用户反馈、数学证明或运行结果；
- `Issue`：未闭合缺口、阻断项、未知事实或允许的局部 TODO；
- `Revision`：有系统意义的变更及原因、影响和不变项。

现有 architecture-evolution 研究把 `Decision` 单列也合理。本协议允许 Decision 作为独立对象或 Revision 的受控字段；关键是不让理由只存在于聊天。

## 3. 三条状态轴

每个重要对象必须分开记录：

```text
design: proposed | accepted | open | superseded
implementation: none | partial | linked
evidence: none | checked | validated
```

禁止把它们压成一个 `done`。

示例：

- Delivery Assurance 可为 `accepted / none / none`；
- Mica 某真实函数可为 `accepted / linked / checked`，但真实登录 UI 若未观察不能写 `validated`；
- CAT-TRACE 某算法路线可为 `open / none / checked`，其中 `checked` 表示反例已验证，不表示方案成功；
- Slurm Hook 在只有文档时最多 `accepted / partial / none`，真实 fault injection 通过后才可 `validated`。

## 4. 能力到验证的反向闭合

每个用户能力必须能沿以下链路追踪：

```text
Capability
→ Component owner
→ Input
→ Data / fact source
→ Mechanism
→ Interface
→ Permission / authority
→ State transition
→ Failure
→ Recovery
→ Validation method
→ Evidence acquisition actor
→ Current-candidate evidence
→ Consumer
```

任何一项缺失都不是“留给实现者的小细节”；系统需要判断它是：

- 核心设计缺口；
- 外部事实未知；
- 可局部实现决定；
- 明确延期的非阻塞项。

反向闭合防止 Mica 式“coverage 已满但真实 UI 证据没有取得方式”、Bridge 式“有进度 producer 但用户入口没有 consumer”、STAT5060 式“有 owner 但没有执行语义链”。

## 5. 组件到用户能力的正向闭合

每个组件和关系也必须回答：

```text
output / payload
→ consumer
→ downstream capability
→ failure effect
→ containment boundary
```

若组件没有 consumer 或不能指出支持哪个用户能力，应删除、合并或明确标为研究工具，不允许因“架构看起来完整”而保留。

这可抑制 Bridge Kit 0.11.x 中共享 app-server、Progress、reader 等可选表面向核心路径膨胀。

## 6. Accepted 对象的强制字段

### 6.1 `accepted Component`

必须有：

- 单一主要责任；
- owner；
- mechanism；
- input/output；
- normal/failure/recovery；
- external dependencies；
- implementation responsibility；
- validation；
- source anchor 或“实现尚不存在”的明确状态；
- blast containment；
- open issues。

缺 mechanism 的 accepted component 不能 Freeze。

### 6.2 `accepted Relation`

必须有：

- producer；
- consumer；
- payload/command/constraint 的真实语义；
- direction；
- identity/version semantics；
- permission/authority；
- failure behavior；
- source anchor 或 planned interface；
- validation。

“调用”“通知”“同步”“传递证据”不是 payload。

### 6.3 `validated Evidence`

必须有：

- 被证明的 claim；
- exact candidate/commit/artifact identity；
- acquisition actor；
- normal entry；
- method；
- result；
- limitations；
- freshness；
- consumer。

旧版本截图、fixture、设计文档或测试数量不能自动验证当前候选。

### 6.4 `Revision`

必须有：

- trigger evidence；
- reason；
- changed objects；
- old/new semantics；
- affected capabilities；
- preserved invariants；
- implementation follow-up；
- previous decision status（superseded/partially preserved）；
- new validation needs。

重大 revision 没 reason 或不变项，不能 Freeze。

## 7. Architecture-killer assumption ledger

Asteria 必须新增一个显式视图，而不是把外部假设散在备注：

```text
Assumption ID
claim
source/status
if false → affected components/capabilities
blast: low | medium | high
reversibility
current evidence
next evidence action
freeze policy
```

高 blast assumption 只有三种合法状态：

1. `PROVEN_FOR_TARGET_ENTRY`：已在目标正常入口与必要失败路径验证；
2. `ISOLATED_FAIL_CLOSED`：即使为假，也只影响可替换 adapter，不破坏核心能力或安全；
3. `BLOCKS_FREEZE`：没有证据且未隔离。

Slurm 中“Hook runtime 能启动且 Hook failure 会阻断 Bash”、Bridge 中“共享 app-server 能低摩擦承担核心进度入口”、Mica 中“可合法观察登录 UI”、CAT-TRACE 中“近似在尾部成立”都属于此账本。

## 8. Freeze Gate 的结构规则

以下任一情况自动阻止 Freeze：

- accepted component 没 mechanism；
- relation 没真实 payload 或 consumer；
- capability 无 owner；
- normal path 有 producer 但无最终 consumer；
- failure/recovery 只写“重试”而没有状态与责任；
- `linked` 无 source anchor；
- `validated` 无 exact candidate evidence；
- implementation scope 仍要求 Codex选择核心产品/科学机制；
- high-blast external assumption 为 `BLOCKS_FREEZE`；
- meaningful revision 没 reason/impact/preserved invariants；
- open issue 会改变核心机制；
- 当前图/文档与结构记录冲突；
- implementation-readiness challenge 返回 unresolved core choice。

## 9. Asteria 无法自动发现的内容

必须明确它的边界：

- 整个用户场景没有进入模型；
- 产品路线本身不值得；
- 两个完整方案共享同一个错误前提；
- 科学算法、统计推断或数学证明错误；
- 用户真正不需要某项功能；
- 外部平台/运行时行为与文档不同；
- 专业作品视觉或自然语言质量；
- 已记录的 owner 本身是否是正确组织边界；
- 结构字段被形式化填写但语义空洞。

这些需要 Work 盲区、第二 Pro、专业审查或真实 probe。

## 10. 与独立智能审查的分工

### Asteria 负责

- 显性完整性；
- 双向可追踪；
- 设计/实现/证据分轴；
- source anchor；
- revision 因果；
- killer assumption 与 blast radius；
- 结构级 Freeze Gate；
- 让陌生实施者读取同一合同。

### Work/第二 Pro 负责

- 整体场景、用户价值与产品边界；
- 反例与共同盲点；
- 互斥路线；
- 科学/专业判断；
- 发现未进入账本的缺失对象。

### Codex probe 负责

- 当前源码、接口与环境事实；
- 无害最小实验；
- 代表性 failure-path 证明；
- 报告事实，不决定产品路线。

## 11. 使用成本控制

Asteria 只有保持为薄层才值得：

- Git 内普通 JSON/YAML/Markdown；
- 设计时同步形成，不事后复制；
- 静态生成阅读器；
- 只记录 meaningful revision；
- 代码事实由 anchor/提取器引用，不复制源码；
- 不建后台、账户、实时协同数据库；
- 不要求每个小 commit 更新架构版本；
- 一期只实现 schema、cross-reference validator、静态视图与 diff。

若一个真实试点显示维护账本比直接理解设计花费更多时间，先删字段和自动化重复事实；不能以此为由再建更重平台。

## 12. 跨案例验证

| 案例 | Asteria 可提前暴露 | 仍需外部机制 |
|---|---|---|
| Bridge Kit | progress/notifier owner、consumer、core/optional coupling | 第二 Pro/Work 判断薄核心是否更好；app-server probe |
| Slurm routing | `JobId` 下游、race permission、时区进入机制 | 独立权限/场景审查；站点事实 |
| Slurm cancel | authority、failure semantics、runtime assumption 未证 | real Hook fault injection |
| Mica | evidence actor/route/consumer 缺失 | 真实登录 UI probe、产品合法性 |
| CAT-TRACE | 近似假设标为 high blast、无真值证据 | 数学/数值 probe、科学裁决 |
| STAT5060 | owner→rule→entry→evidence→receipt 断链 | 新鲜独立审查、正控运行 |
| Presentations | candidate identity、validator trust domain、human lock | 独立渲染作品审查 |

## 13. 结论

Asteria 应从“架构展示工具”升级为协议的结构骨架，但不是流程控制器和最终评审者。它负责让显性空洞不能被包装成 execution-ready；独立模型和探针负责发现账本之外的未知。只有这两部分结合，Asteria 才能减少早期 Critic 的低价值工作，而不会制造“字段都填了所以架构正确”的新假 Freeze。

# Delivery Assurance 完整说明：谁负责什么，怎样自动验收，怎样落到每个仓库

状态：面向用户与实施者的完整说明  
日期：2026-10-19  
性质：解释性文档，不替代正式架构合同  
正式架构权威：`DELIVERY_ASSURANCE_PRODUCTION_CONTRACT_COMPLETION_PROPOSAL_V0_3_20261019.md@9dc26e291c6976e5729ec03265a7f5f01fd1b78c`  
独立审查：`DELIVERY_ASSURANCE_PRODUCTION_CONTRACT_COMPLETION_CRITIC_REVIEW_V0_3_20261019.md@90c2fa345d49487f591a47ce8e9ba5d88a8fbc50`  
写作终审依据：`writing-style@23f51b0bebd8a32f49d899f7fae1ee0e5f17e4cd` 的 `writing-fidelity` 与 `chinese-prose`

## 一、先给结论

Delivery Assurance 不是另一个替你管理项目的中央平台，也不是一套要求你手工维护的验收清单。它是一层接在现有开发流程末端和关键阶段之间的**交付准入能力**：当 Codex 准备说“做完了”时，它必须先证明当前真正要交付、安装、部署或消费的对象已经通过本任务需要的验收，而且这些证据确实属于当前候选、当前环境和当前声明范围。

正常使用时，你只需要提出任务，例如“把 Lucerna 这个功能做好”。系统应自动完成下面这条链：

```text
理解当前目标和最终交付对象
→ 判断这次必须验收哪些能力
→ 找到项目和领域现有的验收入口
→ 缺少机械验收器时由 Codex 同任务补齐
→ 运行验收并收集专业结果
→ 核对证据是否属于当前候选和实际消费对象
→ 失败时在原任务内有限返修
→ 只发布证据真正支持的完成范围
```

你不应该再承担这些工作：记住每个项目有哪些验收器、提醒 Codex“别忘了加测试”、判断哪个脚本是真正入口、手工维护 `ADAPTER.toml`、把某个项目的验收标准复制给另一个项目，或者在 Codex 自报完成后再猜它是否真的验过。

当前状态也必须说清楚：

- Stop Hook 的同任务拦截与一次有限返修已经通过真实 Phase 1 探针；
- 整套生产架构已经通过独立 Critic，成为正式架构权威；
- 生产代码尚未完成；Bridge、`workflow-core`、领域描述文件和项目适配仍要分别实现；
- `DA-G10`–`DA-G15` 仍未验证，不能把架构通过写成系统已经可用。

## 二、整套架构到底由哪些部分组成

完整链路只有五层，不增加第六个中央控制层：

```text
当前任务与项目合同
        ↓
workflow-core：决定这次必须验什么、验到什么范围
        ↓
领域插件 + 项目仓库：提供标准、验收入口和专业判断
        ↓
Bridge：核对任务、候选、消费对象、结果身份和新鲜度
        ↓
原有 Lite / Reviewed / Control controller：决定任务怎样继续、暂停或结束
```

这五层不能互相代替。

| 层 | 唯一责任 | 明确不负责 |
|---|---|---|
| Bridge Kit | 任务、仓库、工作树、会话、候选、最终消费对象、验收结果的身份与新鲜度；Stop、有限继续、恢复和单写者 | 不判断界面好不好、统计对不对、论文能不能发表；不调度 Slurm |
| `workflow-core` | 发现可用验收能力；分析改动影响；选出本任务需要的最小充分验收集合；聚合可声明的交付层级 | 不发明视觉、产品、科学或统计标准；不替用户授权高影响动作 |
| 领域插件 | 定义跨项目可复用的专业标准、证据要求和 PASS/FAIL/UNKNOWN 规则 | 不管理 Git、线程、任务状态、预算和项目私有语义 |
| 项目仓库 | 定义本项目的消费对象、目标图、项目专属验收能力、参数和真实入口 | 不得通过适配文件删掉已经冻结的领域最低标准 |
| 当前执行者 Codex | 实现功能、自动补机械验收器、运行入口、收集证据、按原任务有限返修 | 不得自己改标准、降低阈值、换证据表面或扩大权限来获得 PASS |
| 原有 controller | 保留任务状态、轮次、预算、合法继续和等待恢复 | Delivery Assurance 不再写第二份 `CURRENT` 或第二个“完成”状态 |
| AI Skills Maintainer | 中央能力的正式发布、更新影响、下游项目适配和 `ADAPTING` 生命周期 | 不替项目宣布真实机器已经通过，不替领域 owner 决定专业标准 |
| 用户 | 只处理不能推导的产品/科学选择、真实授权和 HUMAN_ONLY 动作 | 不维护验收器清单，不充当测试作者，不手工同步看板 |

## 三、各类文件应该放在哪里

架构文件、运行代码、领域标准和项目适配必须分开存放，不能继续都堆在 `AI_Research_Toolkit`。

### 1. `AI_Research_Toolkit`

这里只保存：

- 已批准的 v0.3 架构合同；
- Phase 1 的真实证据和结项记录；
- public `da/1` 接口冻结文件；
- 各实施包之间的依赖和审查记录。

它不是生产运行仓库，也不保存每个项目的验收脚本。

### 2. `GPT_Codex_AI_Bridge_Kit`

这里实现公共运行核心：

- 生产 Hook 接入；
- 任务、会话、仓库、工作树和候选身份；
- Gate Result 的结构与新鲜度检查；
- 事件去重、原子单写者、一次有限继续、Interrupt 和崩溃安全；
- 与 Lite、Reviewed、Control、Persistent Run 的兼容。

Bridge 不保存专业评分标准，也不运行第二个调度器。

### 3. `AI_Skills_Collection`

这里实现两类东西：

- `workflow-core`：发现、影响分析、必需验收解析、缺口路由和交付声明聚合；
- 各领域插件：可复用的专业验收能力描述和判断规则。

领域插件的公共描述文件按当前设计放在已安装插件根目录下：

```text
delivery-assurance/gates.toml
```

这不是要求 Codex 平台原生认识新字段，而是由 `workflow-core` 从实际已安装、已启用的插件根目录读取固定支持文件。

### 4. 每个项目仓库

接入 Delivery Assurance 的项目保存一份薄适配和项目专属能力：

```text
automation/delivery_assurance/ADAPTER.toml
automation/delivery_assurance/gates.toml
```

它们只描述：

- 这个项目是谁；
- 最终用户实际消费哪些对象；
- 项目有哪些验收能力；
- 正常入口在哪里；
- 哪些改动会影响哪些目标；
- 长任务由谁拥有；
- 项目参数怎样绑定到领域标准。

它们不保存本任务的完成状态，也不复制领域插件的整套标准。

### 5. 当前任务的证据包

本任务解析结果和验收结果附着在已有任务证据包中，例如：

```text
delivery_assurance/resolution.json
delivery_assurance/targets.json
delivery_assurance/claim.json
delivery_assurance/runs/<run_id>/<gate_instance_key>.json
```

项目已有正式结果包时可以由适配文件直接引用，不要求复制第二份事实源。

## 四、AGENTS 到底谁负责整理

这是此前没有被单独说清、但 v0.3 已经给出责任边界的问题。

### 1. 谁是语义 owner

每个仓库自己的项目 owner 是该仓库 `AGENTS.md` 的语义 owner：

- 项目目标和不可替代行为；
- 正常用户入口；
- 权威设计、Goal、运行手册和验收文档的定位；
- 项目特有的安全、隐私、科学和发布边界；
- 哪些内容必须由项目或领域专业 owner 决定。

Bridge owner 负责 Bridge 仓库的 `AGENTS.md`；AI Skills Maintainer 与对应插件 owner 负责 `AI_Skills_Collection` 的规则和插件入口；各项目 owner 负责各自项目。

### 2. 谁做日常机械整理

执行当前功能任务的 Codex 负责自动维护机械内容，不需要你手工整理：

- 正常入口的路径移动；
- adapter 或验收脚本的 locator 更新；
- 新增已经冻结类别的项目能力；
- 旧路径、重复规则和过时定位的合并；
- 新功能导致的已知受影响路径和应保持能力；
- 中央接口升级后，按正式适配任务更新 locator。

这些更新属于当前开发任务的一部分。

### 3. Codex 不能自己改什么

执行者不能借整理 `AGENTS.md` 改变：

- 产品成功标准；
- 科学阈值、统计估计目标或停止准则；
- 领域最低标准；
- 用户授权范围；
- 已有安全、隐私和真实消费对象；
- 哪个 owner 对哪个字段有最终决定权。

出现这些变化时，必须回对应项目或领域 owner 冻结语义，再由 Codex 落地。

### 4. AGENTS 应该写什么，不应该写什么

`AGENTS.md` 应保持简洁，只保存正常入口和权威定位，不承担每个功能的验收明细。

应该保存：

- 当前项目的规范入口；
- 当前任务/产品权威文档的定位方式；
- adapter 和正式验收入口的 locator；
- 安全、权限、数据和环境边界；
- 哪类语义由哪个 owner 决定。

不应该保存：

- 每次任务动态生成的 `required_gate_refs`；
- 每个测试用例和历史缺陷全文；
- 当前任务 PASS/FAIL；
- 领域插件完整 rubric 的复制品；
- 第二套任务状态机。

### 5. 谁检查 AGENTS 没有漂移

设计责任已经冻结，但自动检查代码尚未实现。生产实现必须包含：

- adapter/入口找不到时不能静默跳过；
- `AGENTS.md` 指向的 locator 与项目实际入口不一致时返回项目适配缺口；
- 未映射的验收相关改动不能判为 `NONE`；
- 项目 owner 冻结语义后，由 Codex 修机械 locator 并重新解析。

因此，**AGENTS 的责任已经设计清楚，自动一致性检查仍是后续 `workflow-core` 和项目适配实施包要实现的能力。**

## 五、系统怎样知道“该不该验收”

`workflow-core` 的解析器不会只看文件名，也不会因为任务复杂就全量验收。它同时读取五类事实：

1. 冻结 Goal、成功条件和本任务准备声明到什么层级；
2. 项目目标图：源码怎样变成构建物、安装物、运行实例、数据、模型、报告和真实消费对象；
3. 项目适配文件中的影响规则和领域能力引用；
4. 批准基线到当前候选的全部实际变化，包括已提交、暂存、未暂存和相关未跟踪文件；
5. 依赖闭包、领域最低标准和应该保持不变的能力。

路径规则只用于发现可能受影响的对象，不能证明没匹配到的文件一定安全。未识别但可能影响验收的变化进入 `unknown impact`，不能自动判成无需验收。

解析器使用三值逻辑：

```text
true / false / unknown
```

只有能够证明没有验收相关变化、没有声明提升、旧证据仍有效且影响范围完整可确定时，才可以选择 `NONE`。

## 六、系统怎样知道“具体要验什么”

解析顺序固定为：

```text
收集 Goal 明示义务
+ 当前声明层级需要的义务
+ 领域最低标准
+ 受影响表面需要的义务
+ 应保持不变的义务
→ 计算依赖闭包
→ 找到能覆盖每项义务的兼容验收能力
→ 拒绝未覆盖、冲突或 unknown 被丢弃的情况
→ 决定验收范围
→ 复用仍然有效的旧证据
→ 只运行剩余必要工作
```

这里的“最小”不是按 Gate 数量做数学上的最小集合，也不是挑最便宜、最好通过的一组。只有定义、目标、入口和证据要求相同的重复实例才能合并。两个验收能力只要专业 owner、失败含义或声明范围不同，就不能用一个总 PASS 吞掉。

## 七、什么时候不验、局部验、扩大验或完整验

这四档决定的是**需要覆盖的交付义务范围**，不是简单的测试数量。

| 范围 | 何时使用 | 实际含义 |
|---|---|---|
| `NONE` | 没有验收相关产品/产物/科学变化；没有声明提升；影响完整可确定；旧证据仍有效 | 不运行专业交付 Gate，但仍保留普通必要检查和“为什么无需验收”的理由 |
| `TARGETED` | 目标和依赖闭包能够稳定隔离；不改共享运行时、schema、路由器、生成器、adapter 或 Gate 定义 | 验受影响状态、坏例、正确例和邻近应保持能力，不是只测改动的一行 |
| `BROAD` | 改动共享依赖、多个兄弟目标、adapter、validator 定义，或局部覆盖不足 | 覆盖受影响产品族和依赖闭包，不扩大到无关项目或设备 |
| `FULL` | 首次基线、整产品发布、安装/上线声明、跨仓聚合、多产物无法安全拆分、历史证明局部选测会漏检，或项目级影响关系不可确定 | 对本任务承诺的目标和全部必要义务做完整覆盖，但可以复用未失效证据；不等于所有测试、所有机器、所有设备每次重跑 |

最容易误解的是 `FULL`：

> `FULL` 表示完整覆盖当前承诺，不表示从零重新跑项目里所有东西。

例如只改了安装器中的一个小字段，但任务准备声明“完整 Windows release 可交付”，那么覆盖层级仍是 `FULL`；如果界面、核心功能和某些环境证据没有被本次改动影响且仍满足失效规则，可以复用，不必机械重跑。

## 八、验收标准由谁制定

标准的权威顺序固定为：

```text
冻结 Goal / Plan
→ 项目 canonical contract / AGENTS / accepted design
→ 领域插件正式标准
→ 已核实的历史回归和 known-bad
→ 实现细节
```

最后一层只能实现已有语义，不能反过来决定什么算正确。

具体责任是：

- 新产品行为、用户体验和项目业务语义：项目 owner；
- 跨项目可复用的视觉、文档、统计、医学影像等专业标准：领域插件 owner；
- 科学估计目标、假设、模型路线、晋升/停止条件：项目科学 owner 或领域科学 owner；
- 权限、费用、真实数据、部署和不可逆动作：用户和现有授权层；
- Gate 的选择、组合和声明聚合：`workflow-core`，但只能消费已经冻结的标准。

如果两个标准冲突，系统记录来源、冲突字段和最小反例，然后返回该字段的真正 owner。它不能自己挑“更严格”“更便宜”或“当前能运行”的那份。

## 九、谁负责自动新增或更新验收器

这不是由用户提醒，也不是 Bridge 自动写。

### 情况一：已有标准，只有机械验收器缺失

状态：`STANDARD_FROZEN_IMPLEMENTATION_MISSING`

满足以下条件时，当前执行者 Codex 必须在同一个功能任务中自动新增或更新项目本地验收器：

- 标准已经由项目或领域 owner 冻结；
- 预期行为可以机械表达；
- 能构造旧坏例/新正确例、已知坏例/已知正确例或确定性不变量；
- 修改位于当前获权仓库；
- 不需要新凭据、付费、真实设备、不可逆动作或新的专业判断；
- 不补这个验收器会让同类回归再次逃逸。

典型例子：修复确定性 bug 却没有回归测试；新增一个已有合同覆盖的输入类型；验收脚本入口移动；输出 schema 改了；adapter 指向的 runner 已过期。

### 情况二：项目出现以前没有的新验收类别

状态：`NEW_PROJECT_ACCEPTANCE_CATEGORY`

项目 owner 先冻结：

- 正面能力；
- 失败意味着什么；
- 真实入口；
- 证据表面；
- 可以支持哪些声明；
- 最小正确例、坏例和缺证据情形。

然后 Codex 实现验收器。用户只有在产品选择本身无法从现有合同推导时才需要介入。

### 情况三：能力应该跨项目复用

状态：`REUSABLE_DOMAIN_CAPABILITY_MISSING`

领域插件 owner 冻结标准，AI Skills Maintainer 负责正式生成、发布和下游适配。单个项目不能为了当前任务方便，直接把私有规则冒充中央标准。

只有至少两个真实项目在六个维度上等价并完成适配验证后，才评估把项目能力晋升为中央领域能力。

### 情况四：环境暂时不能运行

状态：`TEMPORARILY_UNRUNNABLE`

保留 Gate 和恢复定位，相关声明为 `UNKNOWN`。不能因为当前机器没工具就删 Gate、降低证据等级或把所有工作推给用户。

### 情况五：必须由用户完成

状态：`HUMAN_ONLY`

只有真实登录、设备确认、物理动作或最终主观验收确实只能由用户完成时才使用。用户动作本身不自动产生 PASS，动作后仍恢复同一 Gate 完成验证。

## 十、验收器具体怎样写

一个合格验收器不是“写个脚本返回 0”。流程必须按下面顺序：

```text
1. owner 冻结 Gate definition、版本、标准、阈值、证据表面和 fixtures
2. workflow-core 把 definition identity 写入本任务 required gate set
3. Codex 实现或修复 runner
4. runner 必须让冻结的 known-bad 失败
5. runner 必须让冻结的 known-good 通过
6. 缺关键观察时必须返回 UNKNOWN，而不是猜 PASS
7. 对当前候选从正常入口执行
8. 专业 owner 按冻结标准给出 PASS / FAIL / UNKNOWN
9. Bridge 核对结果是否属于当前任务、候选和实际消费对象
```

每个 Gate 描述至少要说明：

```text
gate_ref
schema_version
definition_version
authority_ref
authority_contract_ref
capability
failure_semantics
applicability
subject_types
target_roles
claim_support
normal_entry
evidence_requirements
judgment
regression_bank
known_bad
should_not_change
invalidation
execution_requirements
calibration_requirement
```

验收器的正常入口必须是可复制、可定位的正式入口。命令参数使用结构化 `argv`，不允许把任意字符串拼成 shell。

## 十一、怎样防止 Codex 为了通过验收而“做题”

当前架构明确禁止执行者通过以下方法获得 PASS：

- 降低阈值；
- 删除或替换坏例；
- 把真实安装、真实运行或真实渲染换成模拟数据或文件存在；
- 缩小 rubric 或声明范围；
- 修改适用规则让 Gate 变成“不适用”；
- 用当前候选生成只对自己成立的 golden；
- 修改 adapter 删除必需 Gate；
- 没有证据地把产品失败改写成环境问题。

Gate 定义、runner、fixture、当前候选和证据分别有独立身份。当前任务同时修改产品和验收器时，结果必须记录两套身份。

如果 Gate 定义、阈值、rubric、fixture、runner、目标或环境发生验收相关变化，旧结果按失效规则处理，不能继续吃缓存绿灯。

## 十二、谁实际运行验收，谁作出判断

| 场景 | 谁运行 | 谁判断 |
|---|---|---|
| 同步项目验收 | 当前执行者 Codex 调项目正式入口 | 项目 owner 的冻结标准或受保护 runner |
| 领域专业自检 | 当前执行者触发领域插件正常入口 | 对应领域插件 owner |
| 长任务/Slurm | 已有项目 controller/finalizer 在终态运行 collector/validator | 项目科学 owner/领域 owner |
| HUMAN_ONLY 后续 | 用户完成动作，Codex 恢复同一 Gate | 对应专业 owner；用户动作本身不是 PASS |
| Bridge 检查 | Bridge 读取 Gate Result | 只判断身份、新鲜度、结构和引用，不重新评分专业内容 |
| 最终交付 | `workflow-core` 聚合全部必要结果 | 原 controller 决定任务合法结束；用户只做原合同要求的最终验收 |

Bridge 不是验收器执行平台，也不是领域评委。

## 十三、Gate Result 必须包含什么

最小结果必须能够回答：谁的标准、运行了什么、测的是哪个候选和消费对象、看到什么、支持什么声明、什么变化会让它失效。

核心字段为：

```text
schema_version
task/workflow identity
run_id
gate_instance_key
gate_ref
authority_ref
definition_digest
adapter_semantic_digest
candidate/source-set identity
subject/target identities
normal_entry/runner/fixture/rubric digests
observed_at
environment
decision = PASS | FAIL | UNKNOWN
reason_codes
obligations covered/missing
evidence_refs
invalidation fingerprint
actor/observer provenance
scope
cost/time
claim_support
```

证据同时记录三个维度：

- 形式：源码检查、结构化运行、实际界面、交互轨迹、真实渲染物、因果干预或受保护观察；
- 真实度：模拟 fixture、受控真实运行、宿主派生、实际安装、实际部署、物理设备或科学总体；
- 观察者：生产者自检、独立审查或受保护观察。

这些维度不是简单线性分数。例如真实 Windows Reader 配假 Zotero 后端，仍不能证明真实 Zotero 往返。

## 十四、多产物和跨仓库怎样验收

系统不再使用一个含糊的 `candidate_ref` 覆盖所有东西，而是建立 Delivery Target Graph。

节点可以是：

- 源码；
- 构建物；
- 安装包；
- 已安装实例；
- 已部署服务；
- 数据集快照；
- checkpoint；
- prediction/ground truth；
- 报告或文档。

边描述谁生产、包装、安装、部署、记录、消费或集成谁。

例如“模型 + checkpoint + prediction + 科学报告”至少是四个不同目标。Slurm job 只是执行来源，不能冒充 checkpoint 或科学结论。跨仓库两边各自测试通过也不能自动证明接口集成成功，必须有协议/schema/版本兼容的真实观察。

## 十五、交付不是一个全局布尔值

Delivery Assurance 使用按目标绑定的声明层级：

| 层级 | 证明什么 |
|---|---|
| `LOCAL_SOURCE` | 当前源码和局部不变量成立 |
| `INTEGRATED` | 改动已经进入正式集成目标并从集成入口工作 |
| `ARTIFACT_READY` | 精确构建物、PPTX、PDF、checkpoint 或报告已产生并通过产物级专业 QA |
| `INSTALLED` | 精确产物已安装到指定环境，安装身份和生命周期成立 |
| `LIVE` | 精确版本在真实部署、宿主或正式运行对象上工作，并注明观察时间窗 |

高层缺证只阻塞该层及其依赖层，不应把已经证明的较低层结果全部判失败。但较低层也不能冒充高层。

`USER_READY` 不是新的万能等级，而是 `workflow-core` 对本任务所有承诺目标的聚合判断。

## 十六、长任务、Slurm 和断线恢复怎样处理

Delivery Assurance 不成为第二个 Slurm owner，也不持续轮询。

正常流程是：

```text
项目已有 controller / Persistent Run / Slurm owner 启动作业
→ DA 记录 owner、job/run identity 和精确 resume locator
→ 外部 owner 继续管理等待、重试和终态
→ finalizer 收集 checkpoint、prediction、指标和报告
→ 同一个原任务恢复
→ 重新检查新鲜候选和必要 Gate
```

调度器显示 `COMPLETED` 不能证明科学成功。Hook 不自动 submit、cancel 或重复作业。资源、队列、重训和科学路线仍由项目原合同与用户授权控制。

## 十七、失败后系统怎样处理

| 原因 | 下一责任 | 合法动作 |
|---|---|---|
| `PRODUCT_DEFECT` | 当前执行者 | 修产品，重新运行受影响 Gate |
| `VALIDATOR_BUG` | Gate owner 冻结判分语义；执行者修实现 | 撤销/重判受影响旧结果，不能逼产品适应错误验收器 |
| `EVIDENCE_GAP` | 执行者或已有 collector | 补观察，保持 UNKNOWN，不用文件存在冒充内容 |
| `ENVIRONMENT_GAP` | 项目环境 owner | 修环境后从原入口重跑，不静默降低证据 |
| `AUTHORITY_REQUIRED` | 用户 | 只停依赖动作，保留已完成工作和恢复点 |
| `TEMPORARILY_UNRUNNABLE` | 项目环境 owner/原 controller | 有界等待或恢复，不删除 Gate |
| `SCIENTIFIC_NO_GO` | 科学 owner/Planner | 可以形成合格负结论，不能宣称性能成功，也不强迫继续训练 |
| `STANDARD_CONFLICT` | 对应字段 owner | 冻结唯一标准；期间只保留两边共同允许的较低声明 |
| `IDENTITY_MISMATCH` | Bridge | 拒绝旧候选、错仓库、错工作树或错消费对象证据 |

自动返修属于原任务和原预算。Phase 1 已证明一次有限继续可行，但生产任务的具体预算仍由对应实施包和原 controller 冻结，不能在运行中偷偷提高。

## 十八、新项目第一次接入时谁做什么

第一次启用 Delivery Assurance 时：

```text
项目 owner 授权启用
→ Codex 读取 AGENTS、canonical contracts、真实入口和交付目标
→ 自动生成最小 ADAPTER.toml 与项目 gates.toml 草案
→ 项目 owner 只确认未知业务语义、目标边界和项目参数
→ workflow-core 做一次完整基线解析
→ Bridge 只校验 schema、locator 和身份
```

第一次基线可以要求 `FULL` 覆盖，但不代表以后每项任务都全量验收。拿不到真实环境时返回相应 UNKNOWN，不会为了“接入完成”自动启动设备、账号、GPU 或付费服务。

以后目标、入口、依赖、新能力、未映射变化、重复漏选、领域定义或 adapter schema 发生变化时，Codex 自动维护机械部分；语义变化回项目或领域 owner。

## 十九、正常用户实际会经历什么

### 日常任务

你说：“把这个功能做好。”

系统自动：

1. 绑定当前任务、项目和要声明的最高交付层级；
2. 解析项目和领域验收能力；
3. 判断本次影响范围；
4. 自动补可机械实现的回归和验收器；
5. 开发并从真实入口验收；
6. 失败时在原授权内有限修复；
7. Bridge 核对身份和新鲜度；
8. `workflow-core` 只报告已证明的层级和剩余边界。

### 什么时候会打断你

只有这些情况需要你：

- 产品或科学目标本身有真实选择；
- 需要新凭据、真实账号、物理设备或私有数据；
- 需要付费、部署、删除、外部发布或不可逆动作；
- Goal 明确把最终主观接受设为 HUMAN_ONLY。

### Hook 信任

正式产品仍应使用正常已登录的 Codex 环境，不要求第二次登录。项目 Hook 的精确定义第一次启用或定义哈希变化时，用户通过正常 `/hooks` 审核；同一身份、同一项目、同一精确定义通常不应每次任务重复信任。

生产 Hook 的最终安装、升级、冲突和卸载命令仍属于 Bridge 实施包，尚未实现；当前架构只冻结它不能绕过 trust、不能覆盖已有 Hook、不能依赖 Codex 私有状态。

## 二十、三个端到端例子

### 例一：Lucerna 修改原生界面和状态

目标：修改 provider 状态在 Windows 原生界面的显示，并准备完整 release。

解析器会结合界面、状态、隐私、安装和最终声明，选择项目需要的 `STATE`、`NATIVE`、`UI`、`PRIVACY`、`INSTALL` 实例。只是改某段文案且目标可以隔离时可能是 `TARGETED`；如果声明完整 Windows release，则是完整义务覆盖，但可复用未失效证据。

Codex 自动补确定性状态回归，调用项目 preflight 和真实 native 验收入口。Frontend Design/项目 owner 判断实际界面和交互；Bridge 只核对 exact executable、PID、源码候选和 Reviewer 结果是否一致。Windows 前台操作、真实 provider 和最终用户验收仍服从项目授权。

### 例二：CARE 长训练与科学报告

目标：完成一个获准的训练路线并交付 checkpoint、prediction、指标和报告。

CARE 的 controller/Slurm/finalizer 继续拥有作业。Delivery Assurance 不提交或取消 job，只记录精确 owner 和恢复位置。作业终态后，finalizer 收集 checkpoint、prediction、ground truth、指标和报告，科学 owner 分别判断正式入口、因果机制、总体充分性、证据完整性、恢复等价性和结论。

如果结果科学上支持 NO_GO，任务可以合格结束并形成负结论，但不能宣称模型性能成功。调度器 `COMPLETED`、日志存在或静态入口检查都不能代签科学 Gate。

### 例三：普通小后端修复

目标：修一个局部确定性 bug，不改变共享 schema、路由、发布和用户界面。

解析器发现目标和依赖闭包可隔离，选择 `TARGETED`。如果已有 Gate，只加一条旧坏例/新正确例回归；如果标准已冻结但测试缺失，Codex 同任务自动补。不会因为项目有 UI、PPT 或长期任务能力就全量运行它们，也不会强迫使用 GPT Work、第二机器或人工 reviewer。

修复后 Bridge 核对当前候选和结果新鲜度，`workflow-core` 可以声明 `LOCAL_SOURCE` 或 Goal 要求的局部集成层级；不会自动冒充完整 release。

## 二十一、谁在什么阶段读哪些文档

| 角色 | 必须读取的主要来源 |
|---|---|
| 总体 Planner/Controller | v0.3 Proposal、独立 Critic review、public `da/1` freeze、当前实施包、各目标仓库 `AGENTS.md` 和正式合同 |
| Bridge 实施者 | Bridge 最新 `AGENTS.md`、0.11 scope-reset surviving surface、public `da/1` 的身份/结果子集、Bridge lane Proposal/Goal/Gates |
| `workflow-core` 实施者 | AI Skills 最新角色合同、Capability Gate Policy、Maintenance Board、workflow-core Skill/TODO、完整 public `da/1`、历史回放语料和实施包 |
| 领域插件 owner | 本领域正式 Skill/Plugin 合同、Gate descriptor schema、当前 consumer 的真实消费对象和专业证据，不读取 Bridge 私有运行状态决定质量 |
| 项目 owner | 本项目 `AGENTS.md`、accepted design/Goal、`ADAPTER.toml`、项目 `gates.toml`、真实 normal entry、目标图和项目参数 |
| 当前执行者 Codex | 当前 Goal/Plan/Kickoff、项目 `AGENTS.md`、adapter、需要的 descriptor、normal entry、known-bad/known-good、权限边界 |
| AI Skills Maintainer | Maintenance Board、canonical TODO 与 `tracking: #N`、正式 release/CHANGELOG 的 `### Update impact`、精确下游项目集合和每个适配证据 |
| 最终用户 | 不需要读上述内部文件；只接收当前成果、最高已证明层级、剩余边界和真正需要的最小授权/动作 |

## 二十二、以前提出的问题逐条回答

### “验收入口谁负责？是不是每个 repo 自己负责？”

真正的运行入口由对应项目或领域 owner 拥有；项目 repo 保留项目验收入口，领域插件保留跨项目专业入口。`workflow-core` 负责选哪些入口，执行者负责调用，Bridge 只消费结果。

### “谁制定标准和接口？”

专业标准由项目/领域 owner；公共结构接口是已批准的 `da/1`，由 Planner 从 v0.3 机械冻结，Bridge 和 `workflow-core` 共用同一版本，不能各自发明。

### “每个 repo 都要一个 adapter 吗？”

正式受管项目需要一份薄 `ADAPTER.toml`。它不是复制整套系统，只做本项目身份、目标、入口和能力映射。未接入项目不能被强制 Hook；无 adapter 时必须诚实 no-op/unsupported，不能假装已保障交付。

### “以后是不是每个 repo 要分别发 prompt？”

实现和适配必须按 owner 拆成独立任务：Bridge、`workflow-core`、领域插件、Lucerna、CARE、第三项目分别做，不能一个跨仓库巨型 Codex 任务。总体 Controller 通过同一个 `da/1` 接口和依赖图统筹，不要求用户自己协调内部字段。

### “为什么设计文档放在 AI_Research_Toolkit？”

这里保存跨仓库架构权威和证据最合适；真正代码分别进入各 owner 仓库。研究仓库不应继续承载生产运行逻辑。

### “验收器需要接口吗，接口放哪里？”

需要。公共 `da/1` 定义 Gate descriptor、Adapter、目标图、解析结果、Gate Result、身份与失效字段；领域描述在插件根，项目适配和项目 Gate 在项目仓库，任务结果在已有任务证据包。

### “我还要手动提醒加验收吗？”

正常情况下不需要。已有标准且可机械实现时，Codex 必须同任务补验收器和回归；只有新的产品/科学标准本身无法推导时才回真正 owner。

### “Codex/GPT 能自己判断什么时候加验收吗？”

能，但不是自由发挥。`workflow-core` 根据 Goal、目标图、实际变化、依赖闭包、领域最低标准和应保持能力解析；执行者只能在标准已冻结时实现机械验收器。

### “谁决定全量还是部分验收？”

`workflow-core` 按 C05/C06 的确定规则决定，依据影响范围和目标声明，不由执行者凭任务复杂度决定。项目 owner 提供目标图和影响事实，领域 owner提供标准。

### “FULL 是不是所有测试全部重跑？”

不是。FULL 是完整义务覆盖，可以复用未失效证据。它不能用少量局部绿灯冒充整产品，但也不要求每次从零跑所有机器和所有测试。

### “验收器具体谁写？”

机械 runner 由当前执行者 Codex 写；语义标准、阈值、rubric 和证据要求由项目/领域 owner 冻结。执行者不能同时改标准和实现来自证。

### “谁判断验收通过？”

专业 owner 判断专业结果；Bridge 只判断身份和新鲜度；`workflow-core` 聚合交付声明；原 controller 决定任务状态。

### “AGENTS 谁整理？”

每个项目 owner 拥有语义，当前执行者自动维护机械 locator 和正常入口；领域标准留在领域插件，Maintainer 负责中央发布和下游适配。用户不手工整理。

### “新功能出现后 adapter 谁更新？”

已有类别的目标、入口、路径和 runner 变化由 Codex 同任务更新；新项目/科学类别先由对应 owner 冻结标准，再由 Codex 更新。中央接口升级由 Maintainer 建立受管适配任务。

### “怎么防止它把测试改松？”

定义、runner、fixture、候选和证据分开绑定；阈值/rubric/adapter 语义不是执行者权限；已知坏例必须失败；改定义会使旧 PASS 失效。

### “长任务是不是 Delivery Assurance 自己接管？”

不是。Persistent Run、CARE controller、Slurm/finalizer 保持 owner。DA 只记录和消费结果，精确恢复原任务。

### “Local Autonomous Acceptance 会不会复活？”

不会。它保持 CLOSED。Delivery Assurance 是现有 workflow 的交付准入能力，不是第四套 Bridge workflow。

### “Program Run 和 Delivery Assurance 什么关系？”

Delivery Assurance 只回答“当前任务真的完成了吗”；未来 Program Run 才可能决定“下一任务是什么”。后者不得在完成证据不可信时推进，也不属于当前实现范围。

### “Phase 1 到底证明了什么？”

只证明 Stop Hook 接缝、一次有限返修、Interrupt、去重、错身份/旧证据拒绝和权限不扩张。没有证明生产系统或项目适配已经完成。

### “现在还有什么没设计？”

架构层已经封板。仍未确定的是各实施包的代码结构、精确 CLI/安装命令、具体项目阈值、fixture、设备、URL、数据身份和科学容差；这些都有唯一 owner 和确定阶段，不是交给 Executor 临场决定的架构空白。

### “现在还有什么没实现？”

public `da/1` interface artifact 尚未机械冻结；Bridge 生产核心、`workflow-core` Resolver、领域 descriptor、Lucerna/CARE adapter、第三项目反泛化、正式 release/update/adaptation 均未完成；`DA-G10`–`DA-G15` 未通过。

## 二十三、从现在开始的实际推进顺序

```text
1. Planner 机械冻结 public da/1 interface artifact
2. Bridge 与 workflow-core 分别形成独立 implementation package
3. public da/1 冻结后，各领域 descriptor 可以并行准备
4. Bridge scope reset 的 surviving surface 稳定后实现 Bridge DA core
5. workflow-core 实现 Resolver/admission，并完成历史回放与正常入口验证
6. Lucerna 与 CARE 分别接入，互不代签
7. 选择第三项目反证公共层没有写死前两个项目
8. AI Skills Maintainer 做正式 release、Update impact 和受管项目适配
```

任何一步如果需要改变 `da/1` 必需字段、owner 或判定语义，都必须回 Planner/Critic；不能在各仓库里分叉出不兼容接口。

## 二十四、当前完成与未完成边界

### 已完成

- Phase 1 clean run：`GO`；
- P1–P13：全部通过；
- v0.3 生产架构合同：独立 Critic PASS；
- C01–C20：成为 canonical architecture；
- X01–X25：已吸收；
- 实施依赖和 owner：已冻结。

### 尚未完成

- public `da/1` 独立冻结文件；
- Bridge 生产代码；
- `workflow-core` 生产解析器和准入；
- 领域描述文件；
- 项目 adapter 和真实项目试点；
- `DA-G10`–`DA-G15`；
- 正式发布和受管下游适配。

所以当前最准确的状态不是“系统已经完成”，而是：

> **核心技术接缝已证明，生产架构已封板，下一步必须进入分仓库实施。**

## 二十五、主要来源

1. `DELIVERY_ASSURANCE_PRODUCTION_CONTRACT_COMPLETION_PROPOSAL_V0_3_20261019.md@9dc26e291c6976e5729ec03265a7f5f01fd1b78c`
2. `DELIVERY_ASSURANCE_PRODUCTION_CONTRACT_COMPLETION_CRITIC_REVIEW_V0_3_20261019.md@90c2fa345d49487f591a47ce8e9ba5d88a8fbc50`
3. `PHASE1_CLOSURE_20261019.md@eadfb52e181a51ca8948eb4206d0e9a92c8595f7`
4. `PHASE2_IMPLEMENTATION_INPUTS_20261019.md@eadfb52e181a51ca8948eb4206d0e9a92c8595f7`
5. `GATE_LIFECYCLE_FACT_INVENTORY_20261019.md@eadfb52e181a51ca8948eb4206d0e9a92c8595f7`
6. `CONSUMER_ACCEPTANCE_INVENTORY_20261019.md@eadfb52e181a51ca8948eb4206d0e9a92c8595f7`
7. `PRODUCTION_HANDOFF_MANIFEST_20261019.md@eadfb52e181a51ca8948eb4206d0e9a92c8595f7`
8. `17_DELIVERY_ASSURANCE_ARCHITECTURE_CLOSURE_GPT_WORK_R0/06_FINAL_ARCHITECTURE_CONTRACT.md@5d28980b4cd03069c431ee5016368f4fdf1beea1`
9. `YuukiAS/AI_Skills_Collection@23f51b0bebd8a32f49d899f7fae1ee0e5f17e4cd`
10. `YuukiAS/GPT_Codex_AI_Bridge_Kit@bc94e41f44bd5b534d8ab8caa304114b8bf90685`

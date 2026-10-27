# Bridge Kit 0.11.x：从 execution-ready 到 product scope reset 的返修链

## 1. 核心结论

Bridge Kit 0.11.x 不是“实现太差所以多修了几次”，也不是“后来用户不断加需求”这么简单。它同时发生了四类不同事件：

1. **早期真实技术不确定性被小型探针正确关闭；**
2. **原始目标已有的能力被 Planner 漏掉，且多轮 Critic 未暴露；**
3. **实施把本可选、可隔离的能力耦合进核心路径，扩大了 blast radius；**
4. **产品范围直到多轮实现后才被重新判断，导致 scope recovery 最终升级为 product scope reset。**

因此，失败的主因不是“缺少更多 Critic”，而是：流程没有把需求闭合、产品路线竞争、架构杀手假设和实施就绪分别交给最适合的信息来源。

## 2. 重建范围与证据边界

本分析按 2026-10-12 至 2026-10-19 的设计、提交与结果重建。主要锚点包括：

- 初始 proposal 与 v0.2：`27132a4`、`2e12226`；
- execution package：`eb63dcc`、`3e0370c`；
- 初始实现与实现审查：`26c57fa`、`646dfa0`、`8ff3bba`、`b9956c9`；
- final scope recovery：`524bba6`、`cb605eb`、`798c8a`、`e2f41f8`、`24b7032`；
- normal-entry、shared-server、notifier、full-functional：`a03742e`、`f67ac91`、`ae15269`；
- v0.7/v0.8 收敛与实现：`b4c8c70`、`ace8f65`、`a6c0a3e`、`35a976e`、`e0f7a32`、`5111642`、`da9f6d2`；
- product scope reset：`0120b99` 至最终 `bc94e41`。

这是基于后见证据的 retrospective reconstruction，不是严格盲测。对“某机制当时一定会被另一位模型发现”的判断只标为反事实可能性，不写成已观察事实。

## 3. 主要返修链

| 阶段 | 主要变化 | 分类 | 核心机制是否改变 | 用户再次介入 | 是否作废/弱化已有实现 | 更合适的提前机制 |
|---|---|---|---|---|---|---|
| 初始 0.11.0 设计 | 执行上下文、readiness、handoff 等进入 proposal | 初始设计 | 是 | 是 | 否 | 主设计 + 需求闭合 |
| v0.2 修订 | 通过 disposable Git probes 关闭分支/工作树/恢复等技术事实 | `EXTERNAL_FACT` | 局部 | 否/低 | 否 | **早期 Codex probe，已正确使用** |
| execution package | 把设计转为执行合同与验收 | `EVIDENCE_GAP`/实施准备 | 否 | 低 | 否 | 冷启动 implementer challenge |
| 初始实现后 review | 权限、恢复、状态、交接等代码问题 | `IMPLEMENTATION_BUG` + 局部 `DESIGN_GAP` | 局部 | 低 | 局部返修 | Codex local fix + 当前候选复验 |
| safety/recovery repair | 修复 fail-closed、安全恢复与状态一致性 | `IMPLEMENTATION_BUG`/`EVIDENCE_GAP` | 局部 | 可能 | 局部 | 失败路径探针、故障注入 |
| final scope recovery | 发现周期进度 owner、原线程传递、只读审计、任务级通知合同等原目标未闭合 | `DESIGN_GAP` + `REVIEW_MISS` | 是 | 是 | 扩大实现 | Asteria 能力—owner—consumer 闭合 + Work 原始需求盲区调查 |
| normal-entry | 要求正常用户入口真正消费能力 | `DESIGN_GAP`/`EVIDENCE_GAP` | 是 | 是 | 部分重接 | 正常入口实施就绪挑战 |
| shared-server / notifier | 把共享服务、通知、进度等纳入统一机制 | 混合：部分 `NEW_REQUIREMENT`，部分原目标归属补全 | 是 | 是 | 扩大核心范围 | 第二独立产品路线 + adapter 边界比较 |
| v0.6 full-functional | 追求完整组合能力 | `SCOPE_EXPANSION` | 是 | 是 | 是 | 产品路线竞争，先冻结核心/可选表面 |
| v0.7/v0.8 | Progress、display、reader、共享 app-server 等进一步收敛与修复 | `ARCHITECTURE_ERROR` + `IMPLEMENTATION_BUG` | 是 | 多次 | 是 | 真实 app-server/正常入口最小端到端 probe；blast containment |
| product scope reset | 否定过度耦合的核心，把范围收回主机策略、执行上下文、instruction budget、本地 persistent run、一次性 Clear Writing adapter | `SCOPE_RESET` | **大幅改变** | 是 | **大量旧机制降级为非核心/移除** | 第二 Pro 独立路线 + Work 用户价值审查 + 早期外部事实验证 |

## 4. 哪些是新需求，哪些不是

### 4.1 确实属于后来新增或澄清的需求

部分 shared-server、通知呈现、特定 Progress 体验和某些跨表面展示要求是在后续讨论中变得明确。不能把所有这些都倒算成第一版 Planner 的错误。

但“后来明确”不等于“必须进入核心架构”。协议应区分：

- 新能力是否属于版本目标；
- 是否可作为可选 adapter；
- 是否要求改变核心任务身份、恢复、权限或持久运行；
- 是否有足够真实入口证据支持纳入。

固定 Planner–Critic 在这里常犯的错是：一旦新需求被接受，就直接把它并入当前核心设计，再通过更多审查补齐，而不是重新比较“核心内置、可选 adapter、独立产品或延期”四条路线。

### 4.2 原目标已经要求但早期漏掉的设计

final scope recovery 明确承认若干能力没有明确 owner 或闭合路径，包括：

- 周期进度由谁产生、传给谁、在哪个正式入口被消费；
- 原任务/原线程如何收到信息，而不是仅存在后台记录；
- 只读审计的职责与可验证输出；
- 任务级通知合同与全局配置/每仓配置边界；
- 正常结束入口是否真的强制消费新能力。

这些属于 `DESIGN_GAP`，因为用户原始目标已经包含“持续运行、进度、恢复、正常入口和通知”，不是实现后才凭空出现。

### 4.3 Critic 多轮仍未发现的遗漏

当早期 Critic 主要沿 proposal 的组件、状态和交接字段审查时，上述“能力有没有 owner、证据最终有没有 consumer、普通用户如何看见”未被系统性反向追踪。它们后来由真实使用追问和范围恢复暴露，属于 `REVIEW_MISS`。

这说明审查需要一种与 Planner 不同的输入：直接从原始目标、事故和用户场景反向构造必须回答的问题，而不是只从现有候选寻找不一致。

## 5. 早期探针做对了什么，为什么仍不够

v0.2 的 disposable Git probes 是整个历史中最值得保留的做法。它们针对具体不确定事实，成本小、输出明确，并直接改变了架构细节。这证明“风险优先真实验证”不是事后发明的理想做法，而是已经在该项目中产生过正价值。

问题在于探针只覆盖了当时已识别的 Git/上下文事实，没有覆盖后来决定产品成败的假设：

- 共享 app-server 是否真是必要且稳定的核心载体；
- Progress/display/reader 是否能在正常入口以低摩擦方式工作；
- 原任务能否可靠消费后台进度；
- 可选展示能力失效时，核心 persistent run 是否仍可独立工作；
- 一次性适配器与长期共享控制面的成本差异；
- 用户是否真正需要一个耦合的全功能系统。

新协议不应规定“做过 probe 就可以 Freeze”，而应维护**架构杀手假设清单**：凡是假设错误会推翻多个组件、权限或已有实现，就必须在冻结前取得直接证据或通过接口隔离。

## 6. 为什么多轮 PASS / execution-ready 后仍回到架构层

### 6.1 被审对象不断变化

每次 scope recovery、normal-entry、shared-server、Progress 或 reader 加入后，架构的组件、关系和失败面都改变。旧 PASS 对新对象没有传递性，但流程和文档形式让人感觉是在同一个方案上逐渐收口。

### 6.2 核心产品路线没有被当作竞争假设

“把所有能力收进统一控制面”与“保持一个小型核心，用 adapter 接可选表面”本应是两套独立路线。历史中它们不是在冻结前并行比较，而是先沿第一条路线实施，成本和故障暴露后再 reset 到第二条。

### 6.3 normal-entry 与真实 consumer 证明太晚

设计记录了任务身份、状态、事件和交接，但“普通用户实际通过哪里得到什么”没有成为冻结前的强制证据。只要 producer 有记录，系统就容易被认为已经支持该能力；而用户真正需要的是被正确 consumer 消费。

### 6.4 可选表面与核心可靠性耦合

Progress/display/reader/shared app-server 一旦成为核心链路，任何表面兼容、进程生命周期或恢复问题都会扩大到 persistent run 与交付主路径。后期发现一个事实，返工不再局限于 adapter。

### 6.5 Codex handoff 仍含产品决定

当 implementation package 需要执行者判断哪条入口算正常、后台状态如何映射用户可见进度、共享服务何时必须存在、失败时保留哪些能力时，Codex 实际被迫补设计。即使执行者不主动改变产品，也会通过实现选择固定一种未被批准的语义。

## 7. 反事实回放：新协议可能提前发现什么

### 7.1 Asteria 完整性合同可提前发现

- 每个用户能力是否有唯一 owner；
- Progress 产物的真实 payload 与 consumer；
- 后台事件到原任务/用户入口的关系；
- 通知配置与任务级选择的 owner；
- normal/failure/recovery 是否均有路径；
- 声称 implemented/validated 是否有 source anchor 与当前候选证据；
- 可选表面故障是否影响核心能力。

它不能单独判断“共享 app-server 产品路线本身不值得做”。

### 7.2 Work 盲区调查可提前发现

Work 不看候选架构，只读原始目标、历史事故和用户反馈，较有机会提出：

- 用户真正消费的进度在哪里；
- 为什么每仓库要重复配置通知；
- 哪些能力是核心，哪些只是可选呈现；
- 正常入口和恢复是否真实存在；
- 是否又建了用户没有要求的平台。

这些正是候选共同盲区，而非字段级缺口。

### 7.3 第二独立 Pro 何时有价值

在“统一共享控制面”与“薄核心 + adapter”两条路线都合理且 blast radius 很大时，第二个完整架构师有高信息价值。它必须从同一原始输入独立设计，而不是审第一套方案。若两者都依赖同一个未经验证的 app-server 事实，第三个 Pro 价值仍低，应转 probe。

### 7.4 Codex 最小探针可提前发现

- shared app-server 的生命周期、重连与并发限制；
- 当前正常入口是否能把后台进度送回用户可见表面；
- 失败后能否保持 persistent run 核心继续；
- 一次性 adapter 与长期服务的最小真实成本；
- 原任务身份能否在真实会话中恢复。

这些探针应使用假任务或无副作用数据，不在探针阶段实现完整产品。

## 8. 如何降低即使漏掉也全部推翻的代价

Bridge Kit 0.11.x 的后期返工之所以大，是因为功能边界不够局部。未来必须强制：

1. **核心任务身份、权限、恢复与持久运行由稳定内核拥有。**
2. **通知、显示、读者、Clear Writing 等作为显式 adapter。** adapter 不可反向拥有任务状态真相。
3. **每种表面有独立 capability gate。** 一个表面不可用时不能让核心候选失败，除非它本身是当前版本的必需能力。
4. **producer 与 consumer 通过稳定 payload 合同连接。** 不允许共享内部状态对象。
5. **外部 runtime/平台依赖置于替换边界之后。** 平台变化只替换 adapter。
6. **修订声明不变项。** 局部 revision 必须说明哪些核心接口和已验证能力不受影响。
7. **每个新能力先给 blast-radius 估计。** 若错误会跨多个组件或废弃大量实现，必须先取证。

## 9. 对最终协议的直接要求

Bridge Kit 回放支持以下规则：

- 复杂任务默认不能只由一个 Planner 写完后找一个 Critic；至少并行一个独立盲区来源。
- 第二个完整 Pro 不是默认，但当存在互斥高 blast 产品路线时应立即启动，而不是实施后再 reset。
- 所有 architecture-killer external assumptions 必须在 Freeze 前被证实或隔离。
- `execution-ready` 必须经过陌生实施者冷读挑战；仍需决定产品机制即返回架构师。
- 核心与可选表面必须有 failure containment；漏项后优先 local revision，而不是整版 scope recovery。
- 每轮结束由规则选择下一执行者，用户不再负责判断“该找 Planner、Critic 还是 Codex”。

## 10. 回答：为什么这么多轮仍没有稳定 architecture-ready package

因为流程在同一条设计线上不断增加完整性，却没有同时做到三件事：

1. 从原始用户能力反向证明 owner、consumer 与正常入口；
2. 在高 blast 路线之间进行独立产品竞争；
3. 在实施前验证会推翻架构的运行事实。

于是每轮都能让当前文档更完整，却不能证明当前路线值得、可运行且已局部隔离。真正的收敛只能来自“结构闭合 + 独立盲区 + 风险优先证据 + 冷启动实施挑战 + blast containment”，而不是增加第 N 轮同框架 Critic。

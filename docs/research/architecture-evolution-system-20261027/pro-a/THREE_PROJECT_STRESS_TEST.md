# 三个真实项目：同一模型能否承载设计、实现与返修

这三个案例支持一个有边界的结论：**组件、关系、源码锚点、证据、因果变更和有意义的修订，足以共同描述设计态的 Delivery Assurance、已有真实实现的 Mica，以及算法与软件并行演进的 CAT-TRACE。** 通用性成立的前提，是把“设计决定了什么”“代码实际做了什么”“证据支持到哪里”分开保存。只给组件涂一个“已完成”颜色，会在三个项目中分别造成不同的误导。

本报告完成了固定提交的文档、源码、测试定义和历史修订核对，并给出可供原型使用的映射。它没有启动 DA 的宿主试点，没有在真实 ChatGPT 页面运行 Mica，也没有重跑 CAT-TRACE 的科研计算。下面的“应能完成”是架构载体的用户任务与失败条件；不代表这三个产品已经通过新的运行验收。

## 1. 比较范围与共同语义

### 1.1 固定的观察截面

| 项目 | 本次观察的来源 | 为什么适合作为压力测试 |
| --- | --- | --- |
| Delivery Assurance | Toolkit 旧研究固定于 `ae2766a62b1546048ec6122e01ee95f1904fb73c`；新职责候选固定于 AI Skills Collection 的 `fd6916ad5fdd5fb905544b6a127f9b0d31a737e1` | 旧方案通过过设计审查，新方案仍为提议；两者均不能冒充新接线已实现 |
| Mica | `YuukiAS/Mica-for-ChatGPT@7059c0dc24b908b57bd0e1f475142ba4f4520621`；另核对 0.1.6 与 0.1.7 的真实实现提交 | 已有可定位的 DOM 选择器、事件、状态与测试，同时存在尚未迁移的新设计 |
| CAT-TRACE | `YuukiAS/CAT-TRACE@0d829fb17c458a076a15ec51893e917960107c21`；另核对 C04-REF v0.1.1 的实现提交 | 数值原语已有实现、参考引擎已修订、生产推断仍受数学与算法缺口制约 |

来源分别见 [DA 历史状态][da-old-current]、[DA 新候选][da-new]、[Mica 版本定义][mica-runtime-version]与 [CAT 当前实施索引][cat-current-index]。DA 新文档内的 `f6dfb4d…` 是它研究时采用的 main 基础，文档本身保存在另一固定提交；本报告不会混用这两种身份。

**比较范围也要固定。** DA 对比的是两份完整职责设计；Mica 的 0.1.6 → 0.1.7 只重建已核实的连接器连续显示机制，另外两个组件作为当前上下文；CAT 的全局入口采用当前工作集，历史对照分别限定于 C01、C04 或匿名零槽位。原型在局部历史模式中应弱化并标明“其余为当前上下文”。本研究没有重建 Mica 0.1.6 的完整系统，也没有把 CAT 不同时期的旧模块拼成一个虚构的历史全景。

CAT-TRACE 是私有来源。公开报告仅保留本任务必需的机制与演进概述、模块标识、原材料定义的设计状态，以及需要原仓库权限才能打开的永久链接。源码片段、私有实验输入、实验数值和日志不进入本报告；公式与详细算法仍从原仓库打开。这个边界来自项目的 [权限说明][cat-authority]。公开渲染器不得因为拿得到链接，就自动抓取并内联私有内容。

### 1.2 六类对象，不是六种页面模板

| 共同对象 | DA 中的实例 | Mica 中的实例 | CAT-TRACE 中的实例 |
| --- | --- | --- | --- |
| **组件**：稳定身份，引用适合自身的机制内容 | 交付判断、能力路由、任务恢复 | 离屏渲染、连接器连续显示、旧草稿恢复 | 稳定数值原语、独立参考引擎、匿名零槽位积分 |
| **关系**：传递对象及具体交互点 | 验收义务交给原 Codex；失败结果回原任务 | 生命周期事件、节点增删记录、恢复状态 | 单列贡献、共享参数状态、独立核对结果 |
| **源码锚点**：仓库、固定提交、定位方式 | 当前先指向设计段落；不存在的函数不造锚点 | 文件、函数、selector、测试断言 | 公式段落、数值 routine、测试参照生成说明 |
| **证据**：支持哪句话、覆盖什么、依据是什么 | 设计审查只支持设计判断；宿主能力待实测 | 测试代码存在、某次运行记录、历史真机观察分别登记 | 反例、设计审查、实现记录、可靠性证据分别登记 |
| **因果变更**：前后差异、原因、触发与影响 | 交付规则从共享库职责中分离的候选决定 | 普通输入移出重型快照路径 | 近零数值修订、组成更新替换、零槽位旧路撤销 |
| **有意义的修订**：选择值得回看的系统截面 | 旧已审设计与新职责候选 | 0.1.6 与 0.1.7 的机制截面 | 同一模块的设计修订或实现版本 |

机制内容按实际问题选形状：DA 更适合职责与交接；Mica 更适合事件序列、DOM 交互和状态变化；CAT-TRACE 更适合算法步骤、公式来源与误差边界。渲染器识别的是“正文、关系图、序列、状态、算法、公式引用、源码引用”这些内容种类，而不是三个项目名称。以后换成 Lucerna 或一个 Skill，仍应使用同一组对象。

**设计、实现、验证是三种判断，不是一条从灰色走到绿色的进度条。** 例如，“设计已批准，但尚无实现”“实现已存在，但可靠性证据不足”“旧函数仍在文件里，但正常路径已经不用它”都必须能原样表达。缺口作为有范围、有阻塞对象的证据或问题附在组件上，不再额外创造十几个混合状态。

## 2. Delivery Assurance：先把尚未接通的架构说清楚

### 2.1 系统层应展示什么

新职责候选以已批准的目标和项目标准为起点：workflow-core 发现必要能力、安排顺序与接收者；领域负责人决定专业正确性；DA 提取不可降级的承诺、选择受影响旧能力的检查、识别缺证并判断交付声明；原 Codex 实现与补测，原项目 runner 执行；Bridge 提供任务身份、合法运行、结果回传和恢复接点。失败回到原任务；没有活跃接收者时保留恢复点。[职责与交接][da-new-responsibility]

这个系统图可以完整显示正常、失败和恢复路径，但新 DA 节点及其连接应标为设计关系。已有 Bridge、workflow-core 和项目 runner 只能证明基础组件存在，不能证明本次设想的调用已经接通。新候选自己要求先验证真实宿主、跨插件消费与同任务回传，再做一个真实仓库的小试点。[真实调用边界][da-new-host]；[首条交付链计划][da-roadmap-pilot]

### 2.2 两个有意义的架构截面

| 问题 | 旧研究：R3 已审设计 | 2026-10-26：新职责候选 |
| --- | --- | --- |
| 交付规则放在哪里 | workflow-core 小共享库承担义务、检查选择、定义准入和声明核验；Bridge 调用并接入最终结束检查 | 拟由独立 DA 插件拥有交付义务、旧能力保护与交付判断；workflow-core 专注路由和消费；Bridge 专注运行底层 |
| 主要关系 | Bridge → 共享规则库 → 原任务与专业 runner → Bridge 最终检查 | workflow-core → DA／领域／原 Codex；专业结果 → DA；失败经 workflow-core 与 Bridge 回原任务 |
| 实施节奏 | 先宿主探针，再最小纵向切片，七仓分别接入 | 重新评估旧接口必要性，先试最薄判定层，再决定扩展 |
| 当前设计权威 | 历史范围内的设计 `PROCEED`；执行包未获实施授权 | 明确为 `PROPOSAL`；不继承旧方案的批准 |
| 当前实现 | 新接线、独立角色回传、正常结束强制检查、七仓启用均未证明 | 新插件及跨组件调用仍待试点；保留现有保护，不提前删除旧规则 |

旧截面的依据是 [旧整体架构][da-old-architecture]、[完整解释][da-old-explained]和 [当前状态中的设计／实施边界][da-old-current]。新截面的依据是 [新职责候选][da-new]和 [迁移界线][da-new-migration]。这是两份可以并排比较的真实设计，**本研究不替原项目宣布旧方案已经退休或新方案已经批准**。

这次差异的用户意义是：未来问“谁负责确保旧功能没有坏、谁负责把失败送回去”时，回答会更明确。候选文档给出的理由是，交付判断、插件编排和运行权限长期集中会造成职责不清；尚无生产消费者的未发布接口也不应自动变成兼容包袱。这是有来源的设计论证，还不是试点验证出的净收益。[拆分理由][da-new-reason]

保持不变的部分同样重要：原用户承诺不能降级，领域标准仍由领域决定，原 Codex 承担实现与补测，旧能力要保护，证据要绑定当前候选，失败要有实际接收者。当前 workflow-core 的既有保护必须保留到 DA 试点证明可以迁移，不能在架构图更新时先拆掉。[旧保留机制][da-old-architecture]；[新迁移约束][da-new-migration]

### 2.3 组件下钻：交付判断怎样工作

点开 DA，机制层可以展示下面这条有条件的处理路径，而不是几个抽象职责卡片。

1. 从已批准目标、正式项目约定和已接受旧行为提取本次承诺。
2. 用实际改动和依赖选择必须检查的行为，标出已有检查及缺失检查。
3. 区分两种缺口：没有正确性标准，返回设计或领域负责人；标准已冻结而测试尚缺，交给原 Codex 补足。
4. 读取原 runner 针对当前候选的专业结果，核对范围、身份和有效性。
5. 满足条件才允许相应交付声明；失败结果交给 workflow-core 确定接收者，再由 Bridge 沿合法入口传回。无人接收时记录恢复点。

这些步骤来自 [DA 职责及标准缺口处理][da-new-responsibility]。实现层此时显示“当前仅有设计来源”，并提供相应段落；不能因为旧设计写过 `prepare_admission`、`finish_delivery` 或建议路径，就生成看起来可点击的生产函数。旧说明也明确这些是待实施接线。[旧接线追溯][da-old-explained]

关系还要精确到“传什么”。例如，DA → 原 Codex 传的是与已冻结要求对应的补测或修复缺口；项目 runner → DA 传的是当前候选的专业结果；DA → workflow-core 传的是哪些承诺失败或缺证；Bridge → 接收者传的是带真实任务身份的反馈。宿主事件到底能否触发这一链，仍是待验证的技术假设，而不是靠箭头表达成事实。

DA 也提供了 Skill 绑定的正确空缺示例。新候选提及 Artifact Curation 的建议 Skill 路径，但原文明确尚未创建。当前锚点只能落在设计段落。将来正文真正落地后，才绑定到固定提交的 Skill section 或实际控制行为的 rule；“规则存在”和“本次任务实际消费规则”应由两份证据分别支持。[建议路径与分发边界][da-skill-proposal]

## 3. Mica：从浏览器行为一直点到函数、selector 和测试

### 3.1 系统边界与设计叠加层

固定提交中的运行版本为 0.1.7。现有实现由页面内容脚本组织功能开关、消息区观察和可靠性模块。它依赖 ChatGPT 当前 DOM 结构、浏览器事件和本地扩展设置；三个选定组件都在这个边界内工作。[初始化][mica-init]；[版本配置][mica-runtime-version]

同一个仓库另有 2026-10-12 的产品重建设计。统一 ChatGPT 适配层与共享回答文档模型已经写成规格，审查结论只涉及规格准入；当前观察提交尚未完成对应迁移。因此默认看现有实现时，不把拟议适配层画成全部选择器已经经过的组件；切换到设计视图时，显示这些未来边界及其尚未跟上的实现。[平台适配层规格][mica-planned-adapter]；[回答模型规格][mica-planned-answer-model]；[当前实现目录][mica-current-tree]；[审查范围][mica-review-boundary]；[后续优先级调整][mica-scope-change]

### 3.2 离屏历史渲染：关系图加少量算法说明

这一组件处理浏览器已经挂载的消息节点。结构观察先排除输入框内部变化，合并其余扫描请求，再识别安全消息容器；最近消息、视口附近、编辑或流式区域等保留原生行为，只有安全的远处节点接受渲染隔离和占位高度。结构含糊、已挂载窗口很小或功能关闭时，撤销优化并进入原生保护模式。[扫描与状态分支][mica-scan]

| 读者追问 | 机制与实际锚点 | 对应检查范围 |
| --- | --- | --- |
| 怎样找到消息，哪些 DOM 属于输入框 | `TURN_SELECTOR`、`ROLE_SELECTOR`、`COMPOSER_SELECTOR` → `collectConversationTurns`；[选择器][mica-turn-selectors]、[容器收集][mica-collect-turns] | 输入框及其祖先不能被当作可优化消息；[输入框保护比较][mica-test-protected-input] |
| 何时扫描，怎样避免输入时重工作 | `setupObservers` → `scheduleScan` → `scanAndApply`；[观察器][mica-observer]、[排程][mica-schedule-scan] | 结构变化和当前生命周期决定是否处理；存在测试定义，不代表本轮运行过 |
| 哪些消息必须保持原样 | `getProtectedIndexes`；[保护集合][mica-protect-turns] | 保留当前交互和最近消息，而不是只按序号裁切 |
| 如何恢复原生 | `removeOptimization`、`clearOptimization`、`enterNativeSafeMode`；[样式撤销][mica-apply]、[保护模式][mica-native-mode] | 小挂载窗口和关闭功能的断言；[原生模式测试][mica-test-native-mode] |

机制层必须保留一个边界：当前 DOM 的消息数不等于完整会话长度。仓库已有真机历史观察指出当时 ChatGPT 会只挂载一部分消息。因此，此路径不能仅靠合成页面就宣称解决真实长对话性能问题；历史真机观察也不能证明今天的页面仍保持同样结构。[历史真机调查][mica-native-investigation]

### 3.3 连接器输入框连续显示：以真实事件解释内部机制

该组件在连接器切换引起原生输入框暂时卸载时，显示一个不可交互的视觉副本。它接收共享生命周期信号，观察有限时窗内的节点增删，把同一帧内的刷新合并，再检查输入框表面和连接器标记。只有原生输入框消失、快照仍新鲜且没有发送或清空冲突时才显示；原生输入框回来、到期、导航或关闭功能都会清理。[触发与结构观察][mica-continuity-trigger]；[观察与合帧][mica-continuity-observer]；[缓存][mica-continuity-snapshot]；[显示][mica-continuity-shell]

系统 → 连续显示组件 → 生命周期序列 → 实现锚点的路径可以具体到：`latchConnectorLifecycle` 发出 `mica-connector-lifecycle-latched`，`handleSharedConnectorLifecycle` 接收上下文与代次；`MutationObserver` 把节点增删交给 `handleMutations`；`scheduleSnapshotRefresh` 合帧后调用 `refreshSnapshot`；最终由 `showShell` 和 `cleanup` 控制副本出现与撤销。DOM 入口使用真实的输入框表面和连接器标记选择器。[信号产生][mica-latch]；[事件发送][mica-latch-event]；[实际选择器][mica-continuity-selector]；[清理与冲突条件][mica-continuity-cleanup]

这里的一条关键关系是“旧草稿恢复状态 → 连续显示的冲突判断”。它承载真实状态且有消费点：正在恢复时不能重新显示旧快照。系统图中的边应能点开这个状态及判断位置。只有两个组件名称和一根箭头，无法解释这项防护。

用户还可继续点到 [生命周期断言][mica-test-lifecycle]和 [输入性能测试入口][mica-test-hotpath-runner]。前者检查过期、发送、清除、关闭和原生输入框回归时的行为；后者包含普通输入与输入法组合输入的路径。它们证明代码里定义了哪些检查，不构成本轮新的产品通过证据。

### 3.4 旧草稿清除恢复：状态与取消条件比流程卡片更重要

恢复从一次确认过的用户清空意图开始。代码先检查全选删除或剪切，再确认同一目标确实为空；随后保留代次、旧文本识别信息和输入框身份。重新挂载带回匹配旧内容时，先等待稳定，再经原生删除路径尝试恢复空白。新输入或粘贴会取消守护；尝试次数和总时限有界。一次删空之后，还需要足够的安静窗口才能判为最终稳定，重复挂载会重新计时。[确认清空][mica-stale-confirm]；[守护与匹配][mica-stale-guard]；[稳定等待和恢复][mica-stale-settle]；[新输入取消][mica-stale-user-cancel]；[最终稳定判断][mica-stale-final]

这一机制适合在组件详情展示状态转换和旁边的取消条件。实现入口都在 `extension/src/reliability/stale-composer-recovery.ts`，测试则可直接落到 [重复重新挂载案例][mica-test-stale]。读者应能回答“为什么删空了一次仍不算成功”“什么情况下停止介入”“会不会误删新输入”，并逐项打开真实实现，不能只读到“具备恢复能力”。

### 3.5 连接器机制的两个真实版本：0.1.6 → 0.1.7

该变化的意义在于事件拓扑和输入性能约束发生改变。版本 0.1.6 固定于 `9f56ea8d23a0895ddbb3f1e95ee207bd049b62c0`；修复实现 0.1.7 固定于 `aa4ce52581fff2e207d1f93600becbb3018b0efc`，并已进入本次观察的 main。以下对照只承诺连接器连续显示这一组件及其直接关系，不推断同时期所有其他组件的状态。[旧版本配置][mica-old-version]；[修复提交][mica-fix]

| 变化面 | 0.1.6 | 0.1.7 | 用户应看到的意义 |
| --- | --- | --- | --- |
| 连续显示的触发边 | 已接收共享连接器生命周期信号；组件自己的普通输入、点击、聚焦等事件也可进入初始化 | 保留共享信号入口，撤销组件自己的普通输入等直接监听 | 普通输入不再直接走重型快照初始化 |
| 检测与刷新 | 固定轮询；旧路径可重新复制输入框视觉树 | 有界结构观察；存在检查与快照刷新分别合帧调度 | 控制普通输入路径的工作量 |
| 删除的关系 | 普通输入 → 初始化 → DOM 复制 | 此直接调用链删除 | 删除的是危险触发边，组件本身仍保留 |
| 新增的保护 | 原有生命周期检查 | 增加输入性能回归，覆盖普通输入和输入法组合输入 | 返修留下可以追到测试定义的保护 |
| 保持不变 | 本地执行、不可交互的视觉副本、安全条件不足就保持原生、发送和旧草稿清除互斥 | 同左 | 修性能不能偷偷改变功能边界 |

旧调用链和轮询可以从 [旧监听与初始化][mica-old-listeners]、[旧初始化路径][mica-old-hotpath]及 [旧轮询][mica-old-polling]核对；新版路径在上述当前函数中。共享连接器信号在 0.1.6 已存在，这次保留该入口，撤销普通输入的直接触发与固定轮询，并新增有界结构观察和合帧刷新。触发原因来自仓库修复记录：连接器上下文锁存后，普通输入触发重型 DOM 快照，形成性能回归。源码前后核对与这项解释一致，但本研究没有取得原始真机计时记录或重新测量收益，证据类型应写为“仓库修复记录＋源码核查”。[修复依据][mica-fix]；[新增测试定义][mica-test-hotpath]

这也修正了一个过强的版本规则：没有新增功能，不代表不值得形成架构修订。关键机制纠错改变用户体验和保护条件，值得留下独立变化记录；与它无关的小提交仍可只留在 Git 中。

## 4. CAT-TRACE：公式、数值实现与设计撤销能够共处

### 4.1 系统层保留依赖，组件层承认进度不同

所选截面包括数据与身份、C01 稳定数值原语、C04 独立参考引擎、匿名零槽位积分、C03 共享参数生产推断及其下游发现预测。系统层说明哪些输入与数值贡献送入生产推断，参考引擎在哪个范围提供独立核对；机制层展开实际算法；实现层才链接已经存在的 routine、接口和测试。匿名零槽位未闭合时，下游关系仍然存在，但不能画成已接通的生产计算。[系统职责][cat-system]；[当前实施索引][cat-current-index]；[零槽位开放边界][cat-zero-open]

2026-09-16 的完整演进文档已经覆盖阅读，包括模块说明、后续修订、状态表、参考资料和文末维护规则。它的可复用原则是：新变化回到受影响模块，旧路线和原因继续可追溯。其当时的 Pre-Alpha 状态不能代替后续代码和当前索引。[历史文档定位][cat-evolution]；[模块维护规则][cat-maintenance]

### 4.2 C01：反例改变了数值机制，统计对象保持不变

| 有意义的截面 | 内容 | 实现与证据边界 |
| --- | --- | --- |
| 修订前的设计 | 负尾处理没有充分区分接近零和深负尾的不同数值风险 | 这是原设计的历史截面，不伪装成一个已经发布的旧运行版本 |
| 修订后的设计与当前实现 | 按三个数值区域采用明确表达，固定补偿求和及切换边界检查 | 真实数值原语已存在；测试源码与阶段执行记录分别链接 |

触发是独立审查找到合法输入下的中间溢出反例。变化包括数值分区、补偿求和方式与边界检查；不变的是统计对象以及对外提供稳定尾部量的职责。下游单列求解依赖这些量，因此影响不能止于 C01 自己。[原案与反例][cat-c01-old]；[审查处理][cat-c01-r3]；[修订后的数值定义][cat-c01-new]

用户可以从系统中的 C01 下钻到数值区域选择与稳定计算，再定位 `ct_tail_terms_scalar`。从这里分别查看两路消费：Rcpp 的 `ct_probit_tail_terms` 调用入口，以及 `ct_eval_probit` 对 scalar 原语的直接调用；这两个消费者不构成前后串联的调用链。数值稳定性测试另作验证来源。详细公式继续在原设计来源阅读；公开界面提供机制概述和权限链接，不复制私有公式或实现。[数值原语][cat-c01-code]；[调用入口][cat-c01-api]；[实际消费者][cat-c01-consumer]；[测试定义][cat-c01-test]；[参照生成说明][cat-c01-oracle]

这里“实现已跟上”可作出的具体判断是：本轮在真实原语中找到了对应数值分支、补偿求和与调用关系。是否在某个环境通过某组数值验收，要回到相应运行记录及其覆盖范围；本轮没有重跑计算。[阶段记录入口][cat-c01-report]

### 4.3 C04：实现版本改变，不等于整个科学模块改名

参考引擎提供两个真实的局部实现截面：C04-REF v0.1.1 固定于 `bea7aca3ba51bcd4883b9105765bfbbad5eddadc`；v0.1.2 的实现提交为 `2ccb9f9b3c67258292e3b39faeadb4a6c8fef03b`，当前 main 中仍能核对这条更新路径。选择历史版本时只替换 C04 内容，其他节点仍为明确标识的当前上下文。原仓库已有规则区分稳定科学模块、实现版本、任务与审查身份，适合作为共同修订模型的现实依据。[旧正常迭代][cat-c04-old-code]；[新正常迭代][cat-c04-new-code]；[版本身份规则][cat-version-policy]

v0.1.1 的最后组成更新以当前潜变量为条件；v0.1.2 改用消去潜变量后的观测似然。机制调查触发了这次设计改变，正式计划与审查处理确定了新顺序。模型、先验、科学目标、外部接口和正式验收门槛保持不变。[变更原因][cat-c04-cause]；[不变条件][cat-c04-invariants]；[顺序合同][cat-c04-plan]；[设计审查范围][cat-c04-review]

机制视图适合使用迭代序列：先从当前状态重新抽取潜变量，执行已有条件更新，最后进行新的组成更新，再保存进入下一轮。**最后一步之后不能继续使用旧潜变量；下一轮必须基于更新后的状态重新抽取。** 这条跨轮约束比“更换一个采样算法”更有实现价值，也能指向专门检查该顺序的测试。[正常入口][cat-c04-new-code]；[顺序与跨轮测试][cat-c04-tests]

实现层提供 `ref_ct_observed_probit_log_likelihood`、`ref_ct_eta_collapsed_contrast_log_density`、`ref_ct_interweave_eta_collapsed_contrast` 和 `ref_ct_one_sweep` 的实际锚点。旧的 `ref_ct_interweave_eta_contrast` 仍保留在文件中，但正常迭代入口已改用新函数；只查符号存在会得出错误架构。[观测似然][cat-c04-likelihood]；[组成目标][cat-c04-target]；[新更新][cat-c04-transition]；[保留的旧函数][cat-c04-retained]

当前实现索引和记录保留了正式可靠性尚未满足的边界。因此组件应同时显示“设计有明确决定”“新实现已经接入正常路径”“证据仍有范围限制”。设计审查不能替代运行可靠性，源码存在也不能把科研结论推进到完成。[当前索引][cat-current-index]；[实施记录入口][cat-c04-result]

### 4.4 匿名零槽位：撤销旧路线，仍然保留统计责任

该模块的两版是两次有意义的设计截面，当前版本尚无生产实现。

| 变化问题 | 原案 | 当前候选 |
| --- | --- | --- |
| 数值路线 | 复用普通单列局部近似处理匿名全零列 | 独立积分表示：解析处理稀有截距，研究最大值分位数表示及后续求积 |
| 为什么更换 | 数值反例表明局部近似可能漏掉关键尾部质量 | 需要同时闭合精度、导数与计算成本 |
| 哪些被撤销 | 普通零列局部近似作为生产捷径 | 旧路线保留在历史中，不再作为当前可用实现 |
| 哪些不变 | 匿名零槽位不能直接删除；按组和重数保留其统计贡献 | 同左 |
| 下游影响 | 原案若被当成已解决，会误判生产推断就绪 | GAP-01、GAP-04 仍限制 C03 及相关下游 |

撤销有明确的 [数值发现][cat-zero-probe]和 [审查处置][cat-zero-revocation]，不依赖本研究重新制造反例。新候选可从 [2026-10-14 机制说明][cat-zero-new]继续阅读；更后的 [2026-10-21 说明][cat-zero-clarification]仍保留精度、导数和成本待验证的边界。[原案与撤销历史][cat-zero-old]

实现层应直说“独立积分候选尚未形成生产 routine”，并链接设计和未决问题。探索脚本或反例程序可以成为证据锚点，不能填入生产实现栏冒充已接通的积分器。这是对通用模型的硬测试：允许一个机制讲得很具体，却仍没有实现；不能为了让第三层看起来完整而虚构函数。

### 4.5 文档漂移在真实仓库中已经出现

历史架构文档与当前实现进度不同，是合理的时间差；入口索引与它链接的直接执行记录处于不同阶段，则需要提示可能过期。CAT 当前材料中两种情况都存在：旧总路线图仍保留早期状态，后续代码已前进；某项参考运行的索引与直接记录也存在阶段差异。[旧路线图][cat-old-roadmap]；[实施索引][cat-current-index]；[直接记录][cat-profile-drift]

共同模型的处理方式应是显示来源、观察时间和各自支持的判断，并把冲突附在对应组件或证据上。不能一律选“更新的文字”覆盖旧事实，也不能把一份未经审查的执行记录自动提升为正式验证。历史视图回看旧时点；当前视图承认已发生的新事实及尚未完成的核查。

## 5. 用真实用户任务检验载体，而不是只看截图

以下是建议在同一原型中操作的任务。每行同时规定了什么表现会让本方案失败；它们不是三个项目的正式验收结论。

| 用户任务 | 应能找到的答案 | 失败条件 |
| --- | --- | --- |
| 打开 DA，判断现在能否直接依赖自动返修 | 设计路径、尚未接通的关系、宿主试点与活跃接收者边界 | 有图就显示已运行；找不到未实现范围 |
| 对比 DA 两个设计截面 | 交付判断、编排和底层执行的职责变化；旧保护保留；新方案未批准 | 把旧 `PROCEED` 复制到新方案；替原项目宣布旧设计作废 |
| 点 Mica 连续显示，问普通输入为什么不该复制 DOM | 共享信号、结构变化、快照合帧及精确函数／selector | 只有职责卡片或文件列表，没有实际内部顺序 |
| 对比 Mica 0.1.6 与 0.1.7 | 删除的普通输入触发边、新结构事件、修复原因、测试新增及不变能力 | 只显示 Git 行差异；整张系统图全部变色；无关组件也被说成改变 |
| 看 Mica 新设计，问统一适配器在哪里 | 新设计段落与当前尚未迁移的事实 | 给拟议目录制造不存在的实现链接 |
| 点 Mica 清空恢复，问为什么停止或取消 | 用户新输入、时限、有限重试、安静窗口及源码位置 | 把一次删除动作当最终恢复成功 |
| 点 C01，追问数值分段为什么出现 | 原案、审查反例、修改、不变统计对象、真实原语与消费方 | 只有新公式说明，没有撤销原因；或者把旧设计标成旧发布版本 |
| 比较 C04 两版，问旧函数为何仍在 | 正常迭代换了消费点，旧符号保留；跨轮约束与测试锚点 | 由函数存在推断它仍在当前正常迭代路径；由设计通过推断可靠性完成 |
| 打开匿名零槽位，问生产推断为何仍受阻 | 旧路线撤销、当前积分候选、未决项、下游影响及无生产实现 | 把反例脚本当生产实现；把零槽位删掉使图看起来闭合 |
| 回看任一旧截面 | 明确全系统或局部范围，固定该范围的旧来源与状态；其余上下文另标明时点 | 把局部修订冒充完整历史；拼接不同时期模块；旧链接随 main 漂移 |
| 换一个项目继续使用同一操作 | 系统 → 机制 → 来源；当前 → 变化 → 原因；证据范围随内容变化 | 渲染器出现按项目名切换的三套字段和页面逻辑 |

本轮源码核查已经确认这些任务所需的历史与锚点具备可录入基础，也发现了不能省略的空缺和冲突。实际可用性仍需在交互原型中观察：读者是否能少翻文件、是否能准确区分三类判断、是否能找到一次变化的受影响范围。不能由模型字段齐全推断认知成本已经降低。

## 6. 对共同架构设计方法的约束

这些案例让“完整性检查”有了比字段计数更具体的对象。Chat 如果无法说明 DA 失败结果传给谁，就缺少恢复机制；如果不能解释 Mica 一条普通输入事件怎样进入重型工作，就尚未完成机制设计；如果把 CAT 的生产推断标为就绪却没有处理匿名零槽位，就遗漏了阻塞依赖。系统可以提示这些具体缺口，最终判断仍需要设计负责人和必要的独立专业审查。

实现交接时，每项重要机制至少应给出可理解的行为、接口对象、不变条件、失败与恢复，以及验证依据。已有代码就绑定真实位置；尚无代码就明确设计来源和缺口。Codex 可以补充已观察到的函数、选择器、调用边和测试事实，或者报告冻结设计无法成立；它不能为了让页面完整而填入新的产品机制、自己裁定未知科学算法，或静默把未验证连接改成已实现。

历史维护也应发生在同一组件身份上。一次变化记录说明改了什么、为什么、由什么触发、哪些能力不变、下游受何影响，以及实现是否跟上；有意义的修订选择其中值得回看的截面。默认打开当前内容，只有追问时才展开旧设计、被撤销路线和审查原件。这样可以继承 CAT-TRACE 的模块式演进能力，同时避免把所有项目固定为同一轮 Planner／Critic 卡片。

本次三项目映射支持继续做轻量原型验证，尚不足以支持建设复杂平台。下一项真正需要证明的是：同一渲染器配合少量人工策展和自动锚点检查，能否比现有 Markdown 与 Git 历史更快、更准确地回答上表的问题；以及一次真实返修后，维护这些记录是否足够省力。


<!-- 来源均固定到已核对的提交；私有来源保留原访问权限。 -->

[da-old-current]: https://github.com/YuukiAS/AI_Research_Toolkit/blob/ae2766a62b1546048ec6122e01ee95f1904fb73c/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/CURRENT.md#L1-L42
[da-new]: https://github.com/YuukiAS/AI_Skills_Collection/blob/fd6916ad5fdd5fb905544b6a127f9b0d31a737e1/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md#L1-L21
[mica-runtime-version]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/scripts/release-config.mjs#L1-L6
[cat-current-index]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/README.md#L9-L32
[cat-authority]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/AGENTS.md#L3-L11
[da-new-responsibility]: https://github.com/YuukiAS/AI_Skills_Collection/blob/fd6916ad5fdd5fb905544b6a127f9b0d31a737e1/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md#L89-L143
[da-new-host]: https://github.com/YuukiAS/AI_Skills_Collection/blob/fd6916ad5fdd5fb905544b6a127f9b0d31a737e1/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md#L145-L160
[da-roadmap-pilot]: https://github.com/YuukiAS/AI_Skills_Collection/blob/fd6916ad5fdd5fb905544b6a127f9b0d31a737e1/docs/design/ai-reliability-architecture/ROADMAP.md#L91-L101
[da-old-architecture]: https://github.com/YuukiAS/AI_Research_Toolkit/blob/ae2766a62b1546048ec6122e01ee95f1904fb73c/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/02_ARCHITECTURE_AND_COMPONENTS.md
[da-old-explained]: https://github.com/YuukiAS/AI_Research_Toolkit/blob/ae2766a62b1546048ec6122e01ee95f1904fb73c/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/11_ARCHITECTURE_EXPLAINED.md
[da-new-migration]: https://github.com/YuukiAS/AI_Skills_Collection/blob/fd6916ad5fdd5fb905544b6a127f9b0d31a737e1/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md#L184-L194
[da-new-reason]: https://github.com/YuukiAS/AI_Skills_Collection/blob/fd6916ad5fdd5fb905544b6a127f9b0d31a737e1/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md#L162-L168
[da-skill-proposal]: https://github.com/YuukiAS/AI_Skills_Collection/blob/fd6916ad5fdd5fb905544b6a127f9b0d31a737e1/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md#L52-L66
[mica-init]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/content.ts#L181-L194
[mica-planned-adapter]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/product/MICA_PRODUCT_SYSTEM_V1.md#L300-L327
[mica-planned-answer-model]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/product/MICA_PRODUCT_SYSTEM_V1.md#L384-L436
[mica-review-boundary]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/reviews/2026-10-12-mica-product-system-critic-r2-verdict.md#L1-L21
[mica-current-tree]: https://github.com/YuukiAS/Mica-for-ChatGPT/tree/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src
[mica-scope-change]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/reviews/2026-10-12-mica-product-system-critic-r2-verdict.md#L21-L39
[mica-scan]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/content.ts#L739-L842
[mica-turn-selectors]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/content.ts#L25-L52
[mica-collect-turns]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/content.ts#L844-L874
[mica-test-protected-input]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/scripts/run-e2e.mjs#L577-L587
[mica-observer]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/content.ts#L231-L262
[mica-schedule-scan]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/content.ts#L723-L737
[mica-protect-turns]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/content.ts#L984-L1000
[mica-apply]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/content.ts#L1041-L1070
[mica-native-mode]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/content.ts#L1317-L1331
[mica-test-native-mode]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/scripts/run-e2e.mjs#L83-L102
[mica-native-investigation]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/investigations/2026-09-01-native-virtualization-real-device.md
[mica-continuity-trigger]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/connector-continuity.ts#L69-L92
[mica-continuity-observer]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/connector-continuity.ts#L135-L174
[mica-continuity-snapshot]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/connector-continuity.ts#L203-L247
[mica-continuity-shell]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/connector-continuity.ts#L249-L285
[mica-latch]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/connector-lifecycle-signal.ts#L83-L110
[mica-latch-event]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/connector-lifecycle-signal.ts#L334-L340
[mica-continuity-selector]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/connector-continuity.ts#L6-L8
[mica-continuity-cleanup]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/connector-continuity.ts#L306-L344
[mica-test-lifecycle]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/tests/fixtures/connector-mention-lifecycle.html#L218-L237
[mica-test-hotpath-runner]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/scripts/run-e2e.mjs#L183-L221
[mica-stale-confirm]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/stale-composer-recovery.ts#L224-L252
[mica-stale-guard]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/stale-composer-recovery.ts#L293-L423
[mica-stale-settle]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/stale-composer-recovery.ts#L425-L503
[mica-stale-user-cancel]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/stale-composer-recovery.ts#L161-L165
[mica-stale-final]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/stale-composer-recovery.ts#L602-L642
[mica-test-stale]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/tests/fixtures/connector-mention-lifecycle.html#L545-L591
[mica-old-version]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/9f56ea8d23a0895ddbb3f1e95ee207bd049b62c0/scripts/release-config.mjs#L1-L6
[mica-fix]: https://github.com/YuukiAS/Mica-for-ChatGPT/commit/aa4ce52581fff2e207d1f93600becbb3018b0efc
[mica-old-listeners]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/9f56ea8d23a0895ddbb3f1e95ee207bd049b62c0/extension/src/reliability/connector-continuity.ts#L56-L67
[mica-old-hotpath]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/9f56ea8d23a0895ddbb3f1e95ee207bd049b62c0/extension/src/reliability/connector-continuity.ts#L86-L108
[mica-old-polling]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/9f56ea8d23a0895ddbb3f1e95ee207bd049b62c0/extension/src/reliability/connector-continuity.ts#L167-L171
[mica-test-hotpath]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/tests/fixtures/composer-typing-hotpath.html#L193-L229
[cat-system]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/architecture/CAT_TRACE_IMPLEMENTATION_ARCHITECTURE_EVOLUTION_20260916.md#L32-L49
[cat-zero-open]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/architecture/CAT_TRACE_ZERO_SLOT_ARCHITECTURE_GUIDE_20261014.md#L271-L279
[cat-evolution]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/architecture/CAT_TRACE_IMPLEMENTATION_ARCHITECTURE_EVOLUTION_20260916.md#L10-L21
[cat-maintenance]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/architecture/CAT_TRACE_IMPLEMENTATION_ARCHITECTURE_EVOLUTION_20260916.md#L858-L860
[cat-c01-old]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/architecture/CAT_TRACE_IMPLEMENTATION_ARCHITECTURE_EVOLUTION_20260916.md#L129-L155
[cat-c01-r3]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/reviews/CRITIC_REVIEW_R3_RESOLUTION.md#L50-L64
[cat-c01-new]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/architecture/CAT_TRACE_IMPLEMENTATION_ARCHITECTURE_EVOLUTION_20260916.md#L156-L174
[cat-c01-code]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/src/ct_math.cpp#L11-L91
[cat-c01-api]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/src/ct_math.cpp#L94-L123
[cat-c01-consumer]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/src/ct_probit.cpp#L16-L52
[cat-c01-test]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/tests/testthat/test-math-stability.R#L1-L24
[cat-c01-oracle]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/oracles/C01_LOGPHI_REFERENCE_GENERATION.md#L1-L27
[cat-c01-report]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/results/017_cat_trace_implementation_alpha/stages/A1_c01_numerical_kernel/executor_result.md#L1-L5
[cat-c04-old-code]: https://github.com/YuukiAS/CAT-TRACE/blob/bea7aca3ba51bcd4883b9105765bfbbad5eddadc/package/TRACE/R/cat-trace-reference.R#L934-L958
[cat-c04-new-code]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/R/cat-trace-reference.R#L1028-L1052
[cat-version-policy]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/decisions/2026-09-22_cat_trace_implementation_identity_versioning.md#L27-L91
[cat-c04-cause]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/reviews/C04_REF_V0_1_1_AUGMENTATION_FORENSICS_GPT_AUDIT.md#L57-L72
[cat-c04-invariants]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/C04_REF_V0_1_2_Z_COLLAPSED_COMPOSITION_PLAN.md#L28-L42
[cat-c04-plan]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/C04_REF_V0_1_2_Z_COLLAPSED_COMPOSITION_PLAN.md#L313-L372
[cat-c04-review]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/reviews/CRITIC_REVIEW_C04_REF_V0_1_2_R2_RESOLUTION.md#L17-L45
[cat-c04-tests]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/tests/testthat/test-reference-c04-ref-v0-1-2.R#L296-L337
[cat-c04-likelihood]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/R/cat-trace-reference.R#L857-L868
[cat-c04-target]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/R/cat-trace-reference.R#L870-L902
[cat-c04-transition]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/R/cat-trace-reference.R#L950-L995
[cat-c04-retained]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/R/cat-trace-reference.R#L904-L948
[cat-c04-result]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/results/c04-ref--z-collapsed-composition-repair/result.md#L1-L29
[cat-zero-probe]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/probes/ZERO_SLOT_LAPLACE_FINDING.md#L1-L19
[cat-zero-revocation]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/reviews/CRITIC_REVIEW_R1_RESOLUTION.md#L20-L29
[cat-zero-new]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/architecture/CAT_TRACE_ZERO_SLOT_ARCHITECTURE_GUIDE_20261014.md#L76-L154
[cat-zero-clarification]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/presentations/group_meetings/2026-10-21/CAT_TRACE_ANONYMOUS_ZERO_COLUMNS_INFERENCE_20261021.md#L163-L198
[cat-zero-old]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/architecture/CAT_TRACE_IMPLEMENTATION_ARCHITECTURE_EVOLUTION_20260916.md#L351-L394
[cat-old-roadmap]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/ROADMAP.md#L1-L9
[cat-profile-drift]: https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/results/c04-ref--alpha-cloud-reference-profile/result.md#L1-L8

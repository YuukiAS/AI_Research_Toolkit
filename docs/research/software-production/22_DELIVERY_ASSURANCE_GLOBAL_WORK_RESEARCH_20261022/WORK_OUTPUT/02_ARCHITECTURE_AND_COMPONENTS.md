# Delivery Assurance：让原任务承担验收和返修

用户发出正常功能请求后，系统应自己核对要求、使用合适的成熟能力、保护旧功能、验真实成品，并把失败送回原任务修复。用户不应反复提醒验收、搬运失败报告，或成为第一个发现假完成的人。

推荐仍是 **Bridge 的已有入口＋workflow-core 的小共享库＋七仓已有专业验收**。本轮接受独立 Critic 的五项 REVISE，补上写产品前的独立要求核对、定义准入、实现能力消费、七个确切最终出口，以及先行宿主探针。这里是待审架构，没有生产实现、平台实测或独立 Critic 通过；状态以 [CURRENT](CURRENT.md) 为准。

已确认边界不再提问：受支持正常 Codex 入口自动接入；受管交付必须真实验收；Hook 完全缺席时不保证撤回已经生成的原生聊天错误文字；不造新客户端、常驻调度器、第二任务库、第四工作流或万能评分器。

## 1. 一项普通请求怎样到达可信交付

```mermaid
flowchart TD
 U["普通请求／原任务继续"] --> A["Bridge prepare_admission：原文、权限、来源、任务身份"]
 A --> R{"原标准机械明确且局部低风险？"}
 R -->|是| S["当前 Executor 自查与原文覆盖"]
 R -->|否| I["已有 Planner／Reviewer／Verifier 独立重建要求"]
 I --> A2["原 owner 消费当前审查结果"]
 S --> O["义务＋旧功能影响＋成熟能力选择"]
 A2 --> O
 O --> E["同一 Executor 读取/调用成熟能力并实现"]
 E --> V{"所需验收定义已激活？"}
 V -->|否| C["候选校准；高风险由已有独立角色批准"]
 C --> V
 V -->|是| P["项目原 runner：真实对象与独立观察"]
 P --> F{"要求与证据是否成立？"}
 F -->|可修失败| B["原任务接收反馈；共享预算内修复"]
 B --> E
 F -->|标准／授权／外部等待| W["保留原 task 与恢复点"]
 F -->|完整有效| D["七仓指定 finalizer → Bridge.check_delivery"]
 D --> H["Bridge report：当前候选的用户可见结果"]
```

这张图中的新增调用都是设计，不代表今天已接通。没有活跃 owner 时，只保存原任务恢复点，不画虚构的自动唤醒；没有原授权就不启动账号、设备、GPU或部署。

以 Lucerna 为例，用户要求刷新真实用量并保留旧配额。写产品前，独立角色要从原话确认“可信来源、当前账号、缺值不能编零、旧功能不退化”，不能只审 Executor 的摘要。Executor 读取适用设计/状态能力，再补缺失检查。检查程序先接受冻结好例、坏例、缺证例、旧功能例校准；新的观察方式须独立准入，获准的准确版本才可验产品。当前EXE上的刷新、旧配额和独立原生审查全部成立，Complete-LucernaDelivery 才能调用统一检查并给用户报告。

固定显示680的坏实现即使过第一输入，第二个不同用量会失败；反馈携带实际/期望、候选、原要求和允许修复范围回原任务。旧功能则从变化前后的入口和依赖图反查，不能因为手写adapter漏了Codex额度就不保护它。更完整的 Android 持久化和 CARE 科学负结果链见 [03联动核验](03_END_TO_END_EXECUTION_AND_VALIDATORS.md#r1-integration) 与 [04逐仓合同](04_SEVEN_REPOSITORY_ADOPTION.md)。

## 2. 为什么只保留这三个实现位置

只补七仓脚本更便宜，但会继续重复身份、原要求覆盖、反馈消费和交付判断；建立中央平台又会增加运行状态和维护负担。因此选择薄连接，并以首片实际减少漏检和用户搬运作为保留理由。

|位置|解决的具体问题|实际调用与接收|维护与失效|
|---|---|---|---|
|Bridge 原入口增量；delivery.py / delivery_hooks.py|漏准入、失败无人接、错线程恢复、报告绕过|run_lite_task / run_codex_event / 原Control preflight /可信Hook调用prepare_admission；当前任务或原父进程消费；七仓finalizer调用check/report|Bridge维护入口、身份、锁与真实接收；缺能力不启用，不建新daemon|
|workflow-core delivery_core.py、同一da/2 schema和fixtures|原要求/旧功能遗漏、未激活检查签交付、不同候选拼绿|decide_admission_route、compile_obligations、select_checks、select_execution_capabilities、validate_definition_admission、validate_result、evaluate_claim；返回给Bridge|纯函数，不运行设备/模型/领域评分；缺标准、未知边或required证据保持未证|
|项目既有runner与小adapter/finalizer|机械PASS冒真实成品、专业判断失真|原runner产生真实观察和专业结果；04七个finalizer明确消费，Bridge统一形成claim|项目维护标准、控制集、旧行为与结果转换；首次adapter和正式出口变化必须准入|

K1–K5仍只是身份、义务、专业检查、交付、反馈五组职责，不是五个服务。36职责、315问题、83旧要求和363历史是反向核对材料，不决定模块数量。删掉准入会重现理解错还全绿；删掉激活会让产品作者自造测试自签；删掉最终消费者则独立结果可以永远没人读。

## 3. 五项修订怎样改变实际结果

|稳定意见|已选机制与具体消费者|为什么不能用更轻的口头约定代替|
|---|---|---|
|DA-AR-01|[prepare_admission 写前决策](03_END_TO_END_EXECUTION_AND_VALIDATORS.md#r1-ar01)：简单机械任务自查，高风险从原文由已有独立角色重建；原mode接收结果；缺接收者阻依赖写入/最终声明|逐字覆盖抓不到误解；不能把所有任务都升级Control，也不能让事后Reviewer冒事前检查|
|DA-AR-02|[DefinitionAdmission](03_END_TO_END_EXECUTION_AND_VALIDATORS.md#r1-ar02)：候选→校准→精确摘要激活；submit/calibrate/activate及check实际消费；adapter同准入|登记“owner”没有批准效果；换一个agent也不产生独立性。冻结控制的低风险机械检查无需额外模型|
|DA-AR-03|[Resolution.execution_capabilities](03_END_TO_END_EXECUTION_AND_VALIDATORS.md#r1-ar03)：任务相关性、真实版本、Executor读取/调用、实现影响、缺失限制|只有验收清单会放任低配方法先实施；已有等价项目能力优先，纯后端/普通文档不触发全套前端|
|DA-AR-04|[七个指定最终化入口](04_SEVEN_REPOSITORY_ADOPTION.md#r1-ar04)：专业输入→check→report→原task完成验证|Executor/Parent/Controller只是角色名；旧脚本退出0不能代替当前最终claim|
|DA-AR-05|[P0宿主探针先行](06_IMPLEMENTATION_AND_EVALUATION.md#r1-ar05)：实际版本、Hook、Stop、精确resume、加载、取消/父退出，按固定矩阵选择P2|源码接口不等宿主可用；不能先花整个公共层预算再发现关键入口不成立|

低风险准入依赖**事先冻结的标准、控制与授权政策**，不是当前作者临时宣布自己低风险。高风险由已有专业角色只读审标准、候选和原始证据；没有真正隔离就不称受保护观察。CARE默认已有科学Planner和Controller承担其原职责，只有原合同显式要求才增加Reviewer。当前研究不启动任何角色。

## 4. 保留的关键约束与恢复机制

材料就绪和USER_READY分层：准备review包时不要求review已经通过；最终交付则需要对应专业结果。校准也不占用产品RequestedClaim.stage，而是CalibrationContext/Report，避免候选必须先PASS才能校准的循环。GateResult不可变，ReceiptLocator只定位回执而不包含其未来摘要；Bridge先实际消费，再核claim。

旧行为来自已接受基线和正式标准，不能自动把当前HEAD当正确答案。变化前后图并集、反向消费者、孤儿入口和动态未知边共同决定选测；未知不被FULL或空数组抹掉。有效复用要核对象、标准、运行器、观察器、环境与时窗，报告文字修改不会无故重跑产品。

同任务修复优先当前工具返回与已证Stop；原Lite/Review父进程只有精确thread identity才可resume。Control复用原Controller与具体adapter，每次合法动作后原状态转换消费真实收据。launch lease与短state mutex分开，父不持短锁等child；Hook和父进程共用原任务预算。普通额外修复上限两次/30分钟仍是待试点验证的保守建议，取原剩余额度更小值；取消、授权缺失、外部等待或副作用状态不明时零launch。

科学充分负结果可以是实验完成后的诚实交付，不能被修到正面才算结束；规模不足则不能拿“负结果”逃避原训练目标。source、build、installed、deployed、模型/数据/预测/报告分别绑定，模拟器、旧截图、工作镜像不能跨层代签。明确用户/科研新决定仍回原权威，普通可修问题原任务继续。

## 5. 首次接入、迁移、维护与成本

da/2仍是同一未发布接口候选：旧da/1只诊断，返修前的da/2草案也不继承准入。先P0冻结宿主路线，再实现reader/fixtures与Bridge绑定；候选adapter经校准/独立准入，实际原结果shadow只诊断不发ready，逐consumer通过正例和绕过负例后启用。没有最终消费者的仓不标DA enabled。当前七仓均未启用。

定义改动、标准/控制/观察器变化、正式出口变化分别使相关结果失效；暂停不取消义务，退休迁移旧坏例和消费者。中央source、生成、release、installed、loaded与正常入口分别核验。维护沿原TODO/DOING/ADAPTING/DONE；DA不拥有第二任务库。回退到已验证组合，或停止DA签发并保留项目原验收/恢复点，不把停用变成当前任务降标准。

R1保守工程估算为总计 **130–316小时**；首个完整切片 **36–80小时**，其中先行宿主探针仅 **4–8小时**。这些不是实测或授权。先探针，再按可用路线做一个完整Lucerna切片；若没减少旧漏检或用户提醒/搬运，撤公共新增层，保留有效项目回归。其余仓有各自合同，不能互相代签。

## 6. 当前可送审什么，仍未证明什么

本轮交的是五项REVISE修订后的**实现前候选**。具体调用、类型、接收者、恢复与反证已写入03/04/06，独立Critic仍可否决它们。Windows Desktop、CLI、Remote的实际版本和行为未探测；七仓真实产品、账户、设备、科研运行未执行；不声称系统已经能替用户自动完成这些事。

下一入口是 [08独立Critic审查](08_CRITIC_PROMPT.md)，只审五项修订与整体连带影响，并重走普通请求到最终结果的完整路径。不是Codex实施Goal，也不是自动启动下一任务。

# 逐阶段落地、验收、维护与成本合同

本文件是同一研究的实施设计，**不是可执行Goal、生产修改或资源授权**。D1–D6的路线已由Planner选择，实施者不再决定是否换入口、如何消费失败、怎样发现旧行为或兼容哪一版接口。独立Critic审这些既定选择；真实宿主/七仓实验验证其运行性质。原P0“再研究六项架构问题”的计划撤销。

## 1. 顺序、依赖与进入条件

```mermaid
flowchart LR
 R["独立架构审查及具体探针授权"] --> H["P0：真实宿主能力探针"]
 H --> Q["按实际支持矩阵冻结P2入口路线"]
 Q --> C["P1 core：da/2与纯函数"]
 C --> B["P2 Bridge：入口／有界返修／交付消费"]
 C --> D["D 项目标准与原runner适配"]
 B --> A["P3 首条真实链：Lucerna"]
 D --> A
 A --> S["P3 SeminarArc与CARE机制/结果试点"]
 S --> O["P4 Bobbio/Mica/Asteria/CUHK逐仓接入"]
 O --> L["P5 正式分发／实际loaded／回退维护"]
```

**R1 修订：P0 是完整 P1/P2 之前的硬依赖。** 先用无产品副作用的最小探针验证真实宿主，再按本文件 R1-AR05 的确定规则选择 P2 路线；不能先投入完整 da/2 和28–64小时旧首片估算。P0可先做仅服务探针的固定输入/输出桩，不开发完整通用层。未知或失败的关键入口不得以假定支持进入全量实施。其它项目只读设计可继续。依赖图不授权新任务、分支、账号或运行。

选Lucerna为首个完整试点：有真实provider链、现有native acceptance/候选绑定与已知状态错误，能同时证入口、旧保护、真实对象与同任务消费。它比先做新验收平台少引入执行面。Windows宿主关键证据未得时只继续有界探针准备和各项目只读适配设计，完整P1/P2不启动；不得把替代环境通过冒充Lucerna实际完成。SeminarArc补跨进程持久化，CARE补科学负结论和长任务身份；四个其余仓仍各自通过，不能由三例替代。

每包共同交付条件：同一冻结目标→正常入口→好例可完成→真实坏例被拒→反馈由原owner实际接收→在原预算内修复→旧能力保持→最终对象/报告一致。文件、parser单测和文档数量均不足。

## 2. P1：workflow-core纯函数和接口

**代码归属。** AI_Skills_Collection canonical `skills/core/codex-system/codex-workflow-protocol/`；新增 `scripts/delivery_core.py`、da/2 schema/fixtures/reference，沿已有 `scripts/build_codex_marketplace.py`生成正式消费层。Bridge只读取安装绑定，不复制领域阈值。确切开工branch/worktree由后续已授权项目流程指定，本稿不创造分支。

**确定功能。** compile_obligations/discover_surface/decide_admission_route/select_execution_capabilities/validate_definition_admission/select_checks/validate_result/evaluate_claim；输入输出与嵌套必填字段见03 D2/D6/F1/F4；partition_request先保存全文范围映射，ReceiptLocator不含待生成回执摘要。只做文件/数据语义计算，无设备、网络、模型调用、进程调度或发布效果。请求的语义投影来自当前模型，并绑定原文；高风险按 R1-AR01 交已有独立角色从原材料重建。DefinitionAdmission、校准对象、execution_admission、execution_capabilities 和七仓 stage_bindings 均是本轮 da/2 必需合同，不能以schema通过证明语义没有遗漏。

**验证。** 枚举以下成对fixture：真实需求缺runner、空adapter、动态未知边、删除/rename、已提交与未跟踪变更、shared dependency、正常文档无影响、标准冲突、同候选有效复用、collector变更失效、未跑/skipped/neutral、FAIL与UNKNOWN并存、不同target拼绿、da/1只诊断、未知主版本、重复JSON键、path escape、字段缺失/清空required、循环receipt。好例必须保留合法复用，坏例不得以FULL或退出0变绿。历史反例作为其中输入，不声称这些fixtures是七仓真实实测。

**接收和回滚。** Bridge同进程/精确entry调用消费结构化返回；项目adapter回报专业结果。core异常不输出READY，留具体错误与可独立继续项。回退上一验证组合；若无旧da/2组合，停发DA ready，保留项目原测试和全部未决义务。旧da/1不能被自动回写新语义。

**资源护栏。** 首轮纯机制测试使用本地合成/公开fixture、无外部服务；新增纯函数总CPU每小任务目标≤1秒、端到端增量p95≤5秒（不含现有产品测试和模型推理）。这些是本设计选择的工程验收目标，尚未量测；达不到则修缓存/算法或撤该新增层，不修改产品质量标准。

## 3. D包：项目/专业标准与现有运行器

D-LUC/D-BOB/D-MIC/D-SEM/D-AST/D-CUH/D-CARE沿04列出的当前合同、runner和现有专业owner。每包只增加最小Descriptor/ProjectAdapter/result转换、确实缺失的校准/回归。不是建立七个新验收平台，也不按26能力族各生成模块。

标准已有但缺程序：当前Executor收到VALIDATOR_MISSING及原条款、允许写路径、正常entry、good/bad/missing/unchanged，补原类别并由冻结校准验证。新类别只在能力/失败含义/观察/正常入口/owner/claim确有区别时创建。标准本身不明确或冲突回原专业Planner，不让Executor自定科学阈值。领域共用能力只有出现第二个真实消费者且标准一致时，才沿原专业plugin owner提炼；本设计不强制新增领域plugin。

通过条件：原runner确实运行、原始观察与result一一对应、解析不能把NOT_EVALUATED吞成PASS、坏collector不会迫使正确产品改坏。项目owner维护参数和生命周期，core维护通用格式；二者不交换判定权。暂停/退休须保留旧保护迁移与消费者适配，不能删配置就结束。

## 4. P2：Bridge原入口和真实消费

**修改位置已选。**

|现有位置|新增能力|下游与否决|
|---|---|---|
|cli.py::build_parser/run_lite_task/_lite_task_prompt|delivery prepare/ingest/check/ack/report；原函数内run_delivery_cycle；JSONL精确thread id与有界resume|当前Codex及原父进程；无id/换id/取消后启动必须拒绝|
|reviewed_runner.py::executor_prompt/run_codex_event/watcher_once|注入feedback；event内同一cycle；发布候选前check|原Reviewer和watcher；不伪造新REVISE，不清event attempt|
|agent_flow.py::RuntimeAdapter/launch_executor_with_preflight/plan_transition/apply_transition/build_parser|具体CodexExecRuntimeAdapter、Executor/Verifier各自preflight、consume_delivery_result、一次性control step、delivery predicate|已启动原Controller工具回合；只有route字典不算消费，无owner不声称后台|
|新增delivery.py/delivery_hooks.py|来源绑定、launch lease＋短state mutex、结果/收据解析、可信原生事件薄适配|当前回合/原任务；Hook只返回递送请求，须实际后续ack|
|原项目profile与安装收据|delivery_assurance.runtime_binding：精确core entry、payload/version/digest|缺绑定STOP／CORE_UNAVAILABLE；不从PATH或任意缓存选择相似脚本|

**预算确定。** 普通新增DA机械任务默认最多两次实际修复；Hook与父进程共享，不是2+2。run_delivery_cycle默认额外自动续修墙钟总上限30分钟，单个无输出Hook最多2秒；已有task更小上限优先。用户批准的正式长任务仍沿其原预算，不因30分钟截断Slurm作业；DA只停止额外自动launch并保留原job/owner。没有明确长期资源授权不启动。资源上限不是自动可花额度，账号/设备/付费仍逐effect受限。Stop处理器不得在2秒内执行专业检查，只读已准备的摘要；超时不代表平台会强制停止，交付端独立拒绝缺证。

**恢复/并发。** 用03 F3的launch lease、短state mutex和manifest提交点，父进程不得持短锁等child ack；不依赖fcntl支持Windows；网络共享/跨host多owner不支持自动续修，沿原合法handoff。launch intent先保存，崩溃后检查精确session、进程启动身份和结果再决定，不重复副作用。用户取消传递原进程组并冻结cancel epoch；旧结果可留审计，不能复活任务。所有文件owner字段是来源记录，非权限边界。

**必须运行的机制矩阵。** 正常接收修复、Hook缺席/未信任/超时/畸形输出、空block理由、错task/candidate、重复feedback、结果部分写入、resume换thread、父进程崩溃、用户Interrupt、原预算耗尽、外部stale review、无Controller、外部正常等待。每例一次初跑与一次针对性复跑上限，不为凑覆盖无限重试。Windows Native、目标Unix/Remote、Desktop/CLI分别记录版本与支持等级；GPT Work无已证等价接口，不伪装支持。

**效果和回退。** 此包不动Host授权、账号、scheduler、网络服务或任务状态枚举；Persistent保持原寿命职责。真实安装/信任设置另需授权。失败可退回原launcher行为，停止DA语义通知，保留恢复点；退出码只报进程事实。外部GPT正常等待至少两小时宽限且健康时继续等待，不消耗repair轮次，也不把等待改BLOCKED。

## 5. P3：桌面、移动与科学三条完整链

### P3-LUC

修改现有development-acceptance/acceptance-preflight结果消费和provider-state回归；正向目标为真实刷新与旧Codex/OpenAI/Longleaf状态保持。good动态两输入；bad固定值/缺值归零/旧PID；collector错误先修采集。结果回当前Executor，原独立native流程保留三轮与角色隔离；不额外创建Reviewer。最终必须同EXE/hash/PID与真实provider后置状态。机械、真实桌面和账户动作的精确上限见04 D5。回退DA适配保留安全断言/旧回归，不动VPN/SSH/安装偏好。用户仍需自己发现假刷新则否决。

### P3-SEM

适配run-blackbox-acceptance和verify-gpt-work；复用B02/B03/B04/B07与Room migration。正向创建/编辑/结束→强停→重开读回；坏UI假保存、错OCR控件、导出缺媒体必须正确区分。APK/serial/素材/签名绑定，动态skip保持NOT_EVALUATED。失败返回当前Executor，修产品后重跑旧媒体/录音，修collector则重采。模拟器不证明物理麦克风/OEM；缺设备权限不能换目标。回退保留数据与有效回归，清数据仅精确测试实例且有恢复备份。

### P3-CARE

**首轮路线已经选择**：先回放现有反偷懒/adequacy/finalizer结果和最多10个变异，CPU小fixture连续3+2步与独立resume2步比对，60秒上限，GPU/Slurm提交0。它验证DA机械判断、同任务反馈与科学负结论路由，不声称验证真实训练充分性。

真实科学验收复用之后合法活动task的formal entry/model/pretrained/split/scale/最低时长/总体和资源，不从历史Route B或CARE ASE14000步中任选替代。当前R2 v9等待与Attempt3归档不授权恢复旧route。按03 F2适配finalizer送审材料出口和原科学Controller最终结果消费，不把packet可生成视为科学成功；packaging场景必须archive save/load后官方entry，不只工作镜像。科学充分负结果交原Planner，不能继续训练直到正面；no-T2/split/权重等不可偷换。

这里未填新GPU数量是科学/资源授权不在本研究范围，**不是把DA架构留给实现者**：接口已经要求原task预算和实际计数，缺合法budget就拒绝launch。在下一个批准科学task运行前绑定其具体值，不新增科学路线。回退不取消job、不删checkpoint、不上传或邮件外传。

## 6. P4：其余四仓具体实施包

|包|基线与改动|真实验收/坏例/旧保护|接收、权限、回退|
|---|---|---|---|
|P4-BOB|develop a64edfd；Safe runner保留0.2Reader保护，0.3原milestone聚合出口加check；真实zotero_client read/authorize/mutate|隔离批注往返、PDF不变/cache重建；真实dataDir污染与旧0.2签0.3拒绝；论文切换/Inspector保持|当前Executor/runner owner；最多两测试论文/隔离profile；不动真实库，回退DA仍保留隔离断言|
|P4-MIC|rebuild0aee22f；acceptance CLI/validator/Parent接收，release-config→manifest→loaded|Foundation→LowMemory→Highlighter→PDF；真实A/B/C分别process/heap；错anchor/缩负载/功能关闭不算过；typing/IME/branch保持|原Parent/当前Executor；正常Edge账号最终手动，禁止自动化规避；退候选扩展保留dist稳定路径，未证登录态不签完成|
|P4-AST|193c033；routeGestalt/rc19RouteGestalt/基线diff/结果适配|独立真实几何＋完整科学图；常量0/缺ratio/已提交保护变更拒绝；trace、关系与canonical导出保持|原Executor与独立科学/视觉owner；固定URL身份需真实核验，部署另授权；退适配不删旧bad与科学约束|
|P4-CUH|9f25c775；parent-delivery-gate纯谓词外的原调用方/hosted audit结果/Parent消费|可见注册关键路径＋claim/auth/state/finalize事务；fetch旁路、burn、混snapshot拒绝；隐私、只读重入、并发保持|原campaign owner；测试persona和snapshot限额见04；换snapshot关旧campaign，新活动仍须授权；回退DA不擅改生产DB/token|

四包的普通功能压力推演与完整source直链见04；不能只换项目名复用Lucerna验收。一个项目装好DA不等于另一个项目已能用。

## 7. P5：正式分发、消费者维护与回退

中央source→生成→正式release→installed→loaded→normal entry逐层证明。Bridge开发分支不直接当release；AI Skills不直接修cache；生产plugin新runtime验收使用既有有界plugin-replay合同，精确输入与权限先冻结。本研究不执行该replay，也不创建任务。

da/2按03 D6先reader/fixtures、再Bridge握手、再单仓shadow和单一准入权、再逐consumer推广，最后同步PIE相邻设计与已安装清单。da/1只诊断；未知reader拒绝DA ready。shadow结果与原runner不一致必须归因，不能直接用新总绿覆盖旧红。每consumer绑定源/生成payload/安装host/实际CODEX_HOME/loaded版本和入口；复制文件、改version或中央release不等消费者完成。

维护板只用原TODO/DOING/ADAPTING/DONE。中央已发布、消费未证时ADAPTING；没发现的机器不被全局DONE覆盖。任务开始、依赖更新、公共入口变更、交付前触发有效性检查，不新增定时后台。incident先定位产品/标准/程序/collector/入口/身份/传输，转原owner最小修复并增加正式坏例；不每遇故障新增组件。

暂停必填owner、范围、原因、期限和替代；到期在下一次入口/交付校验，required仍未证不能ready。永久退休迁移旧保护与consumer alias或有明确原目标取消授权。退出DA前确保原项目runner仍可正常调用、原任务恢复点完整、证据可读；再移除接点。产品数据/部署回滚不包含在插件回滚权限中。

## 8. 成本、试验规模与净收益否决

目前没有实测节省比例、token/时间或价格；不写虚假“节省80%”。统一记录：一次性接入人工分钟/模型token/运行时；每任务增量CPU、墙钟、模型调用、设备/GPU和用户主动操作；维护升级/失败回退分钟；真正避免的提醒/搬运和首轮用户发现缺陷次数。价格在执行时核实实际供应商计费；本设计不调用付费API。

**一次投入的计划估算，不是承诺工期：** P1需要1组schema/算法/负例集；P2需要4类入口接线（原生、Lite、Review、Control）及2种OS机制回放；每仓D包是1个适配器＋现有runner补洞，不预设新增Gate数；P5是7仓逐项加载与回退证据。本轮统一估算为 P0 4–8小时、公共层48–96小时、每仓10–28小时、首次发行/兼容8–16小时，合计130–316小时；估算包含代码与机制验证，不含等待真实设备/账号/外部审查，也不含新科学训练。以首次两包实测更新估算；超过上界先缩小公共层或重新比较路线A，不自动扩预算。

**工程比较规模固定：** 每仓4个任务类型（普通功能、共享旧行为、小文档、环境/权限缺失），共28个案例；每仓选1个最高风险坏候选，共7个；其中旧功能按03 D2独立抽3项/仓。可在同候选隔离副本配对旧流程A与新流程B，顺序交叉；真实账号/训练不为统计重复，沿原批准运行采证并说明不可配对。每案例初跑＋最多1次特定修复复跑用于评估；不得借评估另领产品修复预算。这是工程否决集，不是统计证明可靠率。

**默认节流已经决定：** 日常语义投影用当前模型上下文，不新增专用模型；小文档不额外启动Reviewer/设备/GPU；纯函数目标CPU≤1秒、增量p95≤5秒；复杂任务昂贵检查在稳定候选运行且复用有效观察；Hook最多2秒；普通额外自动续修最多2次、总30分钟。未知测量不是0成本。04逐仓设备数量/时间与零外部效果默认值共同适用。

**停止推广条件：** 任何最高风险坏候选签高等级完成、未授权效果、用户取消后重启、科学降级当等价，停止该接点扩展并修复。B必须减少至少一条旧流程实际漏掉的风险链或减少用户提醒/搬运；只多回执无结果收益就撤新增层。小改频繁FULL先修discovery/缓存，无法改善回退项目原路径。总成本增加只有在明确风险收益和原预算内才可接受，不凭“保障”无限消耗。

## 9. 运行证据与设计决定的界线

本轮已确定最小架构、各入口消费者、发现/选测、观察层级、da/2迁移、七仓实验和维护成本。已有独立Critic R1 REVISE，本轮按五项意见返修；尚无修订后审查结论、生产实现、宿主事件实测、七仓真成品验收或正式发行。原生Hook缺席下强制阻止聊天文本是已证明的平台能力缺口，不能靠P0试验承诺修掉；用户已接受这一有限文字边界并排除新客户端；当前无待用户决定的架构产品问题。

后续报告必须讲用户得到的实际能力、受验对象、新增/加固/复用checks、真正运行/合法未运行、同任务修复和仍需用户动作。研究材料可审查和产品可交付不是同一层；不把当前包写成执行批准。

## 10. 最小完整投入选择与逐阶段用户收益合同

**裁决：不把130–316小时当成应一次批准的整体工程。** 最强的便宜替代是只给七仓现有runner补坏例和结果读取；当主要失败来自单仓断言缺失、不会跨入口丢失身份或失败无人接收时，它更划算。此处历史还反复出现原生请求漏验收、低层PASS冒最终就绪、同任务未消费和跨候选拼绿，因此选择一个可退出的完整纵向切片先证公共层价值，再按前文已决定的设计展开。不是将Review/Control或其余六仓的架构留给后续决定，也不是以试点代替七仓交付。

首片必须先过 P0 支持矩阵与 P2 路线裁决，再进入 P1最小da/2 reader/evaluator、原请求覆盖、入口/旧保护闭包；P2原生与Lite的接入/共享预算/最终check，以及R1-AR01所需的最小Review adoption、PLAN_REQUESTED准入和原watcher结果消费；D-LUC与P3-LUC正常功能→真实成品→旧功能→失败同任务修复。不能把普通高风险请求所依赖的耐久接收者推迟到首片之后。已有Lucerna项目审查角色可按PROJECT路由直接复用；需要Review时只启用已端到端验证的该入口/consumer组合，不宣称全部Review任务已支持。Control及其它项目明确未启用DA，原工作流仍有效。首片计划估算36–80小时，含P0的4–8小时及其后32–72小时，属于总体估算的子集而非额外加项；需实际设备/账号的部分仍按04精确授权后运行。无桌面授权可完成机制准备，但不能标首片用户收益通过。首片失败先修或撤公共新增层，不默认启动跨七仓铺开。

130–316小时只有在减少真实高代价事故与用户负担时才值得。仅用省人工时间的假设作量级判断：若每任务净省20分钟，忽略维护也需约390–948个任务回收一次投入；首片约108–240个。这个算式不是已测收益，账号污染、错误科学结论等损失也不能凭空换成金额。首两包记录增量与维护后重算；如果主要只多回执而未消除一条旧漏检/搬运链，选择退回项目runner补强路线，并保留有用坏例。若真实收益成立但维护超上限，先减公共抽象/重复字段处理，不能减真实验收承诺来制造收益。

|重点链|必须直接观察的用户收益|不能偷换的完成线|
|---|---|---|
|P3-LUC|从无手动提醒的普通请求发现缺检查；动态坏值/旧provider回归被拒；当前Executor实际收到反馈并修复；同EXE/PID与后置状态才准最终claim|只fixture或准备包通过不算真实桌面/账号链|
|P3-SEM|无提醒选出保存/重启/导出保护；假保存及错采集分流；同APK/serial重跑；实际收到文本与原本意输入分别报告|基础设施READY_TO_PASTE_PARENT、模拟器结果或harness读回都不能冒全部真实硬件/字符输入|
|P3-CARE|机械试点不把validator PASS+adequacy FAIL报告成有效方法；失败返回原Controller；保留同task/job/预算；不重提已运行作业|10个变异与CPU3+2步只关闭协议/机制试点；科学用户收益须以后合法完整训练/评价task的真实身份、规模、负结论与Planner消费，未有该任务前保持未验证|

所有试点同时记“用户主动提醒次数、搬运次数、首个发现者、实际repair接收/执行/结果”，没有观测到就记UNKNOWN；不从模型自述推断0。独立旧入口抽样和遗漏要求注入在候选冻结后执行，标准先冻结，不能挑成功样本。

**零新增运行的确定条件。** 纯知识问答且无修改/成品承诺时，现有模型直接答复；即使已有Hook也只做轻量身份/NONE判断，不建GateResult或模型审查。简单文档修订只做相关内容/链接/渲染约束，不跑产品设备；完全没有受管交付目标就没有交付claim。完全未启用的host不运行DA也不标DA自动保障。已启用受管交付始终check，不能用“这次没Hook”免除。

**零额外自动续修的确定条件。** 用户取消/暂停、授权缺失、新专业标准待裁决、外部审查正常等待、长作业仍在运行、session/effect状态未知或原预算已耗尽，均不launch。两次/30分钟仅为待试点检验的保守默认上限，取与原任务剩余额度的较小值；不是付费额度。初次实现、等待和记账不偷算成修复，也不能换任务洗掉真实修复计数，详03 F3。

**每包的交接与否决。** P1给Bridge原维护者格式/fixture与负例证据；P2给同一原任务真实调用返回与OS故障结果；D/P3/P4给各项目原owner同候选专业观察与Claim；P5给已有维护流程逐consumer实际loaded/回退证据。未通过包只阻其依赖，不能写全局DONE。全部接点按03 F2单一Bridge.check_delivery消费：exit0且requested claim READY才通过；exit2保留明确非就绪；exit3为接口/身份错误。实际合法平台能力与性能是这些包的否决条件，不再留未选架构。

<a id="r1-ar05"></a>
## R1 修订：DA-AR-05 先用便宜探针否决宿主假设

**处置 ACCEPT。** 原顺序让整个公共层投入依赖尚未验证的 Hook/resume/加载能力，风险过高。选择 P0 在完整 P1/P2 之前。纸面源码、模拟JSONL、CLI --help都只能指导探针，不能证明 Windows Desktop/CLI/Remote 实际行为。新增代码仅为探针所需的最小事件记录/固定坏结果桩，既不实现完整 da/2，也不接七仓产品。**本轮只冻结探针合同，尚未获权运行任何探针。**

官方资料说明 Hook 存在信任/禁用与失效边界，Stop 的有效阻止结果会要求同会话继续；JSONL可给thread id并支持指定session恢复；AGENTS加载随会话与配置而定。这些是接口依据，不是本机实测。来源：[Hooks](https://learn.chatgpt.com/docs/hooks)、[非交互执行](https://learn.chatgpt.com/docs/non-interactive-mode)、[AGENTS配置](https://learn.chatgpt.com/docs/agent-configuration/agents-md)。固定源码 b4ad33d1 的 hooks/events/stop.rs、core/session/turn.rs、exec/cli.rs 和 exec_events.rs 另见07。Stop“继续当前任务”不要求 turn_id 永远不变；必须核同 thread/session、真实后续输入和反馈ack，不能把新continuation turn误判成新任务。

### 边界、真实入口与预算

P0由将来获权的原 Bridge 维护任务执行，探针文件位于该原任务的独立临时fixture目录，数据只有无敏感字符串与文件计数器。不创建七仓工作树，不运行产品、设备、账号、GPU、部署、付费API或邮件。Windows Desktop、Windows CLI、目标Remote分别记录 **App版本、实际codex可执行文件路径/版本/hash、host/OS、实际CODEX_HOME定位、配置层与Hook定义hash/信任状态**；定位不读取secret值。Remote只在已授权真实host执行，不能拿Codex占位名猜SSH，也不能启动新远端任务代测试。

安装/信任fixture Hook或开测试会话是未来具体探针作用，必须有那次任务的授权；不得用 dangerously-bypass-hook-trust、切换CODEX_HOME、修改全局安全设置模拟成功。只改fixture自己的项目级hook/AGENTS，信任由宿主正常流程完成，恢复只移除该fixture项；不禁用用户其他Hook。不能达到这一隔离就记未测，不换生产项目做探针。

计划工程投入 **4–8小时上限**（设计估算，未量测），每宿主运行不超过45分钟；每宿主最多1条普通探针任务、最多6个模型回合及最多2个针对失败的复验回合，三宿主合计最多24回合。模型执行只可用当次明确批准的现有Codex额度，不调用独立付费API；缺额度授权则该宿主未测。无输出事件stub≤2秒，故意超时例让stub超过所配阈值，不挂模型等待专业验收。达到上限保存证据、裁决支持矩阵，不自动无限调试/采购/升级。

### 八组必须直接观察的实验

|编号|正常入口/操作|必须保存的观察；成功与拒绝条件|
|---|---|---|
|H1 安装绑定|Desktop从正常界面进入fixture；CLI从精确binary；Remote从已授权原host进入|App/runtime版本与实际进程/入口绑定，不能拿GitHub HEAD或本地CLI替Remote；无法取得的单元格UNKNOWN|
|H2 信任与缺席|fixture Hook分别未信任、信任、禁用、移除；修改定义hash后再读信任|实际UserPromptSubmit/PreToolUse/Stop事件；未信任/禁用/缺失不可记执行。恢复正常信任后必须有正向触发；不以全部拒绝证明接入成功|
|H3 异常输出|固定stub返回超时、非法JSON、空reason、合法block；同时给模拟交付出口一个缺证结果|记录宿主是否继续/忽略/报错；不能假定hook错误fail-closed。无论Hook行为，模拟正式出口都拒绝假READY；异常不得跑第二产品动作|
|H4 同任务续修|普通请求在fixture写一个错误内容，Stop给明确feedback；下一回合修成期望|同thread/session、真实继续输入、feedback ack、修复文件及fresh结果；无需用户再发“继续”。只看到Hook输出不算送达，turn可变化|
|H5 精确JSONL恢复|原最小launcher捕获真实thread.started，再对该ID resume；同时置入错ID/缺ID负例|原task/source/cwd与恢复session一致；缺/错ID停止、不用--last、不另建线程补数。模拟JSONL只能测试parser，必须有真实exec/resume正例|
|H6 指令实际加载|fixture AGENTS/技能入口先冻结A，下一合法回合改为B，分别观测原会话继续、精确resume、原合法重读|随机无敏感canary的实际规定动作/输出与绑定来源对齐；仅文件hash变化不算加载。记录是否需原生重载；显式读取只能证明读取，不伪称宿主自动reload|
|H7 取消/父退出|对fixture原parent/child执行用户取消；另例在intent后、结果前退出parent|cancel_epoch后无再launch；原parent死后没有凭空唤醒；恢复核process-start与原manifest，保留精确恢复点|
|H8 重复/并发效果|唯一fixture effect_id只允许原子计数器从0变1；重复feedback/Hook和parent同时接收，崩溃于effect前后|恢复先读effect记录，计数最终≤1；未知结果不得盲重放，不能把此fixture当一般外部API exactly-once证明；父不持短mutex等待child ack|

H4/H5可使用相同普通探针任务的不同合法阶段，不为凑数字新开多个产品任务。H2/H3的事件记录与H8计数器无需模型时直接用机械桩；但不能拿桩代H4/H5真实宿主。H6采用公开fixture动作（如按读取到的版本写不同固定marker），不会读取用户会话私有历史。

### 支持矩阵与确定回退，不交实施者猜

P0输出既有任务证据目录下的 capability_probe.json 与简短报告，记录每 host/version/event 的 OBSERVED_SUPPORTED、OBSERVED_UNSUPPORTED、NOT_TESTED、具体原因、raw refs 和下列固定route；不增加任务状态枚举或服务。当前三宿主全为 NOT_TESTED，GPT Work 无等价原生Hook证据，不列已支持。

|实际探针结果|P2唯一允许路线|被限制的承诺|
|---|---|---|
|正常Hook、写前门、Stop与身份均成功|该host可实现native自动接入＋原受管出口；同任务有界修复|仍不承诺Hook完全缺席时撤回聊天|
|Hook缺席/不可用，但原CLI/Review/Control已证明精确接收与恢复|仅实现对应既有受管入口，普通native自动接入标不支持；交付出口仍强制|不能宣称该host普通聊天已自动保障|
|Stop不继续，但同一受管父进程精确resume成功|该原父进程承担续修；没有父进程的native只能当前工具返回时修复|不创建新launcher/daemon弥补已经结束的原生会话|
|写前事件不覆盖所用写工具，或无法可靠分流|native不启用写前强制；只有能在原启动边界以只读准入后放行的受管路径可启用|不能把最终拒绝称作已阻止首次错误产品写入|
|JSONL/session不可靠或resume错误|关闭该入口退出后自动续修，仅保留同回合/明确原任务恢复点|不允许猜id、--last、用新线程冒同任务|
|AGENTS/技能不自动reload，显式原会话读取可用|同任务显式读取冻结内容＋实际消费证据；涉及必须native-loaded规则时继续SOURCE_BINDING_STALE|若必须新会话才能满足且无原工作流合法handoff，就停依赖动作，不能偷偷换线程|
|取消/父退出/计数器例失败|该入口自动launch不得启用；先修最小机制再定向复验|不能带着可能重复副作用的控制器进入完整P1/P2|
|Windows首片关键入口无可用路线|暂停原native/Lite首片选择，Planner在**同一架构**按上表重写P2为已有且已证的受管路线，再经相关Critic复核|不先实现完整da/2押注平台以后会补；若无任何合法路线，入口目标明确未达成|

P0报告由原 Bridge 维护者交当前 Planner 消费，Planner将结果应用到01支持矩阵/03入口binding/06P2预算；发生路线改变需同任务独立Critic审连带影响，不能由Codex边实现边决定。P0成功只准开始已获批的实现阶段，不准产品交付、不替代P2完整故障验证。三宿主分别取得证据，互不代签；某host缺授权不阻其它host有界探针，但不能据此把缺证host列支持。

### R1 对实施与成本的实际影响

P1增加 decide_admission_route、validate_definition_admission、select_execution_capabilities 及字段/负例；P2增加真实准入消费、候选校准/激活、能力使用接收、report绑定验证；D包增加04确切finalizer和每仓绕过反例。仍只有原Bridge、workflow-core和项目脚本三个位置，没有新调度平台。

原104–264小时全量、28–64小时首片为**返修前估算，不再作为当前投入合同**。R1的保守估算为：P0 4–8小时；公共层48–96小时；七仓每仓10–28小时（70–196小时）；分发/兼容8–16小时；总计 **130–316小时**，不含外部等待或新科研/实机资源费用。首个完整切片估计 **36–80小时，其中先行P0仅4–8小时，获证后余下32–72小时**；首片是全量子集，不额外相加。新增准入/出口确有成本，不能假称补几个字段不影响工期。

只有P0和首片分别通过否决实验、实际减少漏检/用户提醒/搬运，才讨论下一段授权；本研究不是批准这些小时。小任务仍无新增模型角色。高风险独立核对、定义首次准入和产品最终审查可以由同一合法原角色在不同对象阶段执行，但不得复用不匹配候选的旧决定。每次实际读取/调用/审查token与墙钟分别记账；没有测量就UNKNOWN，不能把复用角色写成零成本。

按旧“净省20分钟/任务”的纯时间假设，130–316小时需约390–948任务回收，首片36–80小时需108–240任务，均未计维护也不是收益实测。若未减少具体旧漏检链，撤公共层，保留项目有效回归；不会因投入已发生而自动推广七仓。

## R1 分包出口与同一任务返修

|包|本轮新增的硬出口|拒绝进入下一包的具体情况|
|---|---|---|
|P0|三类实际 host/version 支持矩阵、原始事件、无产品副作用记录、Planner 对 P2 路线的确定裁决|关键入口未知或失败却照旧路线开工；假想版本或仅源码推断替代实际证据|
|P1|03 的五种 R1 结构及纯判断、四控制校准、独立角色/能力缺失负例；冻结跨语言 fixture|候选支持 USER_READY；错误 stage；空能力规则被当无需求；回执循环；首次 adapter 启用循环|
|P2|prepare_admission、definition submit/calibrate/activate、能力绑定/读取证据、check/report/原结果校验；沿已证宿主路线|第一次依赖产品写入早于 admission；无独立接收者还签 USER_READY；Stop/parent 各有一套预算；同权限 prompt 冒充隔离|
|D 与 P3/P4|04 R1-AR04 的七个确切 finalizer、独立专业输入、stage_binding、原最终结果 writer 检查；每仓原入口正反例|只写角色名；直接构造 READY 报告绕过 check；用 REVIEW_BUNDLE_READY 代最终交付；原 owner 消失仍自称自动接收|
|P5|实际加载版本、准入定义/能力/adapter 的依赖失效、单一正式消费者及回退；保留历史坏例|中央发布即宣称七仓完成；旧 da/1 或本轮前草案被当新接口批准；原检查随 DA 回退丢失|

每包失败先由其原 owner 消费证据并在同一 task 修复；本表不创建后继工作流、不签实施授权。若失败揭示已冻结架构不成立，返回同一 Planner 修订相应合同并重新审受影响部分。真实外部审查等待不消耗返修预算；缺设备、账号或额外授权只阻止依赖它的验证，不阻止合法的其它设计/准备。

R1 新机制也有维护成本：新增专业定义或改观察方式才重新独立准入；产品普通小改不反复批准同 digest；能力按实际版本及使用义务失效，不能每任务无条件启动完整前端流程。原角色可在一次审查中分别签需求与定义两个对象，但不能拿旧对象决定替代当前摘要；同一候选作者也不能成为自己的独立批准者。首两包记录这部分额外人工/模型时间，纳入上述总账。

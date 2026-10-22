# Delivery Assurance：分阶段实施前审查包

`PACKAGE_STATUS=REVIEW_DRAFT` · `EXECUTION_AUTHORIZED=NO` · `READY_FOR_CODEX=NO`

本文件属于同一任务 `software-production--delivery-assurance`，不新建版本或工作流。架构依据是 R3 审查包 `7ca0f0f2c84cc9f29ec8df525797d17da168bd7b`，源 `79fe13a6ce3480732e206b33029cfa3b9fcf9a78`。用户转交的 R3 结论只批准设计继续，五项 DA-AR 设计已关闭，没有批准实施、探针或资源。

**用户已明确允许保存 DRAFT / NOT_AUTHORIZED 的审查草稿，不授权执行。** 本文件是 Proposal/Plan 的阶段落地视图；[13 Canonical Goal审查草稿](13_P0_CANONICAL_GOAL_REVIEW_DRAFT.md)与[14 Kickoff Draft](14_P0_KICKOFF_REVIEW_DRAFT.md)补齐正式角色合同要求的同版材料。没有创建或启动Codex Goal，没有可直接运行的用户Kickoff。

下一轮可以对**既有P0中的当前Windows非交互CLI单元**做最终实施前审查，不能对完整P1–P5提前放行。精确fixture、binary文件身份、有限会话/取消作用、报告写入和预算已在13/14冻结；实际运行版本/事件支持是P0要测的事实。Windows Desktop、交互式CLI、Remote仍保留原探针合同并标NOT_TESTED，不被CLI单元代签。这个最小执行单元属于原P0，不新增工作流或研究版本。

其余阶段的函数、消费者、失败路由、验收与预算按02–06保持。P0输出必须由Planner应用既定路线，确认真实接点可用后才能形成生产阶段的正式执行绑定；如果证据改变承诺/权限/恢复语义，再回同一Critic。当前不存在让Codex自行选择架构的空白授权。

## A. Proposal / Plan：先证明最危险假设，再做一条完整链

目标是减少用户提醒、发现假完成、搬运失败及催促返修。推荐保持 Bridge 原入口、workflow-core 纯函数、七仓专业 runner/adapter 三处职责。替代方案仍是只补项目测试；若公共接线不能减少实际漏检和手工搬运，退出公共新增层，保留有效项目回归。

执行顺序是已冻结的 **P0 → P1/P2 最小必要能力＋D-LUC → P3-LUC → P3-SEM/CARE → P4 其余四仓 → P5**。这是同一实施计划的依赖关系，不是每步新建一个任务、数据库或审批状态机。

|阶段|进入时必须已有|修改/运行边界|实际退出证据与下一消费者|退回或停止|
|---|---|---|---|---|
|P0 宿主能力|独立审过的精确探针范围及当前用户授权|只有无敏感 fixture、项目级测试 Hook/AGENTS、有限当前身份 Codex 进程；不接产品|06 H1–H8 原始事件、版本/身份/权限、成功及拒绝轨迹、恢复点；Planner 按固定矩阵应用 P2 路线|关键入口无路线，不进入完整 P1/P2；不升级/换身份/造新平台|
|P1 最小 core|首片对应 host 的实际 P0 证据；P2 路线仍与冻结设计相容；该阶段执行授权|canonical workflow-core 的 da/2 reader、纯函数、schema/fixtures；只生成相应正式消费层|03 的原要求、旧保护、准入、能力、结果与 claim 合同被 Bridge 同版本实际读取；good/bad/missing/unchanged 正反例|缺字段/旧 reader/回执循环不产 READY；回退已验证组合或停 DA 签发|
|P2 最小 Bridge|P1 兼容组合，实际 host/原角色/权限绑定|原生或已证 Lite 接点；原角色实际 launch/return；共享 finish 和有界恢复；仅合格既有 Review 通道时接入该组合|普通无 Goal 请求的写前准入、独立结果消费、当前失败返回；省略显式 finish 仍被结束检查抓住|没有受支持入口，不把显式 CLI helper 冒自动；取消/重复副作用错误即关闭自动 launch|
|D-LUC / P3-LUC|候选 adapter/验收定义准入；本机原 Reviewer 合法；Lucerna 精确桌面/运行授权|现有 state/provider 回归、原 runner 结果映射、当前 native candidate 观察；不新建 finalizer 服务|G1–G6 下述完整链；用户主动提醒/转抄次数及首个发现者有实际记录|仅机制成功不是首片通过；无真实桌面证据不称真实成品|
|P3-SEM / P3-CARE|Lucerna 首片有净收益、对应项目范围及权限冻结|SeminarArc 同 APK/设备的持久化/导出；CARE 首轮仅 CPU 机械机制，科学实跑等原合法任务|各项目实际 owner 消费。CARE CPU 例只签机制，不签科学充分性|缺硬件/科学任务只限制对应 claim，不伪造等价替代|
|P4 四仓逐项|该仓原合同、适配器准入、正常 host 强制检查、资源权限|Bobbio/Mica/Asteria/CUHK 分别执行下表，不串成一个万能验收|每仓原入口好例＋绕过坏例＋缺证＋旧保护，实际对象及原消费者成立才启用|某仓缺最终消费者则该仓不启用，不以另一仓通过代签|
|P5 分发/维护|相关 candidate 全部必需 gate 成立；正式发行/安装授权|source→生成→release→installed→loaded→normal entry；逐 required consumer 回退|同一最终候选的加载/正常入口、失效/回退证据；原维护看板正确归属|中央代码完成只到 ADAPTING；非全部消费完成不能 DONE|

### 已选代码归属，不再让执行者猜

- **AI_Skills_Collection**：`skills/core/codex-system/codex-workflow-protocol/` 内的 `scripts/delivery_core.py`、da/2 schema、fixtures/reference；沿已有 `scripts/build_codex_marketplace.py` 生成。能力与标准的语义来自原专业 owner，不从中央清单臆造。
- **Bridge Kit**：`ai_bridge_kit/delivery.py`、`delivery_hooks.py`；现有 `cli.py::run_lite_task`、`reviewed_runner.py::run_codex_event/watcher_once`、`reviewed_handoff.py` 原报告验证、`agent_flow.py` 原角色与终态接点。先真正启动/收回原角色，再完成 `finish_delivery→check_delivery→report→accept_submission`。
- **项目**：04 的原结果路径和小 adapter、原 runner 缺失的回归。Lucerna 不再新增历史任务专用 finalizer；七仓均不新建后台进程。
- **指令归属**：AGENTS/skill 只增加正确 locator 和使用要求，不能替代 host 强制消费。PIE 负责指令编辑，DA 负责实际任务证据；不把相邻未实现提案当本包授权。
- **分支**：本研究只写指定研究分支。生产执行继续各仓届时已选且获权分支；本包不发明新分支/工作树策略。开始生产前精确 repo/branch/worktree 须绑定进被审执行包，不能由 Executor 临场选择。当前列出的远端源码 ref 是阅读基线，不是对相同 branch 的写授权。

## B. 先行 P0 的完整目标合同（审查素材，不是执行 Goal）

### B1. 唯一目标与有用结果

证明或否决实际 Windows Desktop、Windows CLI、获权 Remote 的宿主假设：普通触发、Hook 信任/缺席/异常、Stop 同任务继续、精确 JSONL resume、指令加载、取消及父退出不重复副作用。结果不要求全部支持；**诚实、可复核的支持矩阵和具体回退就是 P0 的交付**。P0 不把“支持矩阵写完”当整个 DA 完成。

先覆盖 Lucerna 首片依赖的 Windows Desktop/CLI。Remote 在真实 host/路径及 SSH 只读/fixture 执行授权明确前记录 NOT_TESTED，不猜占位名、不顺手登录服务器。Windows 可用证据只支持 Windows 切片；Remote 仍不得启用。若需要远程部分，沿原 P0 范围补精确授权，不新建远端任务替代本地诊断。

执行者是未来获权的原维护任务；本轮不启动任何task。已只读定位本机Bridge checkout为D:\\Code\\GPT_Codex_AI_Bridge_Kit（main/6bbaca5，干净），但它不获生产写入或同步权限。首个CLI单元已选定当前本地工作区的独立fixture根和实际命令解析binary，精确路径/hash见13；该根目前不存在，未创建。测试不需新Git仓或新分支，不触碰七仓。当前app远程占位host不当SSH hostname；后续Desktop/Remote的精确执行身份在对应P0单元获权前另行绑定，不从本单元继承。

### B2. 探针如何运行，观察什么

沿 06 H1–H8，不再发明平行测试体系。fixture 只有随机无敏感 canary、几个文本文件、原子计数器和固定合成验收结果；不能读会话历史、凭据、生产账户或私有数据。实际 binary、App 版本、CODEX_HOME **位置**、配置层、Hook hash/信任状态记录，但不导出 secret 值。

1. 正常入口先出现一次真实正向 Hook；同时记录禁用、缺失和未信任，不用全部拒绝证明可用。
2. 合法 block、空 reason、非法 JSON、超时分别观察实际宿主行为。测试出口对缺证拒绝，不假定所有 Hook 故障天然 fail-closed。
3. 普通 fixture 请求先写错一个 canary，Stop 回送可定位反馈；下一合法回合修好并 ACK。必须同 thread/session，无用户“继续”提示。只输出 Hook JSON 不算收到。
4. 原最小 launcher 读取真实 `thread.started`，按该 ID 恢复；错 ID/缺 ID 必须停止，禁用 `--last`、新线程冒充和模拟 JSONL 代正例。
5. AGENTS/技能内容 A→B 后，分别记录当前继续、精确 resume、合法显式读取的动作。读取成功不冒充自动 reload；需要新会话且原工作流无法合法切换就判对应路线不支持。
6. 对同一探针进行取消/父退出与重复反馈，观察取消后无新 launch。effect_id 的计数器最多 0→1；无法确认效果时先核原回执，不盲重放。它不证明一般外部 API exactly-once。
7. 本机独立角色通道附带验证：使用原 Reviewer 的权限合同、完整输入和结构化返回；候选写入尝试应被真实工具权限拒绝。标准/控制/产品作者权限不能由“只读提示词”冒充。没有本机合法角色条件就标该通道不支持，不默认开 subagent。

宿主取消、父退出等故障只针对明确 fixture PID/启动身份，不能按进程名杀用户其它 Codex、SSH、产品或服务。不修改全局 Hook、安全设置或换 CODEX_HOME；只改 fixture 项目级配置，通过宿主正常信任。无法隔离就记 NOT_TESTED，停止该操作。

### B3. 固定预算与权限，不把计划估算当已授权额度

- P0 计划工程投入 4–8 小时；每个 host 实际探针不超过 45 分钟。
- 每 host 最多 1 条普通探针任务、6 个模型回合＋2 个定向复验回合，三宿主总计最多 24 回合。机械事件可不用模型时不用模型。
- 只可使用未来用户明确授权的当前 Codex 身份/现有额度；独立付费 API、账号切换、额度购买均为 0。
- 在当前阶段，探针执行次数、创建任务次数及模型测试回合全部为 **0**。文档中的预算不授予任何运行权。
- 正常无输出事件桩目标 2 秒以内；故意超时样本只做有限等待，不挂模型/产品长期运行。
- 原预算更小则取更小值；取消和无权限停止依赖动作。失败复验用原计数，不换任务清账。

### B4. 输出、真实接收者、恢复与回滚

输出放原维护任务证据根：`capability_probe.json`、简短报告、事件/JSONL 摘要与 raw ref、support route、计数器/取消/恢复证据、fixture 配置原值摘要和清理记录。敏感机器本地路径只在必要本地记录；公开研究报告只保留判断所需脱敏定位，不能外传原会话内容。

原 Bridge 维护者提交给本任务 Planner。Planner 按 **06 的固定支持矩阵**裁定：

- Hook、写前门、Stop 与身份都成立：允许该 host 后续实现原生自动链；
- Hook 不可用但既有受管父进程已证：只允许该受管入口，不谎称原生聊天有保障；
- Stop 不续修但父进程可精确 resume：续修只属于该原父进程；
- JSONL/取消/重复效果不可靠：关闭对应自动 launch，先最小修复或限制支持；
- 无任何合法首片路线：不启动完整 P1/P2，回同一 Planner/相关 Critic 修订路线。

如实测只填入已冻结路线的事实，不重问用户架构偏好；若改变用户承诺/权限/恢复语义，才回独立 Critic。P0 不自行发布插件、安装产品或开始 P1。

恢复读取原任务、版本、计数器、session 与取消 epoch。父退出后没有自动后台恢复承诺。回滚仅恢复 fixture 自己的项目级文件和信任项，先保留必要证据、确认目标都在 fixture 根；保留用户原设置，不清其它目录、不杀其它进程。

## C. 最小 Lucerna 完整试点：不能只证明“会拒绝”

### C1. 试点范围已经选定

以 01054 的 LR-STATE-001 状态真实性历史为首条已知回归：两条连接可用、另一条检查中或未观测时，不制造故障；真实故障仍警示；标题/摘要/详情一致；重复刷新稳定。它提供可追踪根因和反例，**不是再修一个已修过的缺陷来冒新功能**。试点在受控测试输入/变异中重演坏实现，生产候选保留正确行为。

最小公共实现必须贯穿原文准入、相关能力消费、旧影响闭包、定义准入、真实观察、失败返回、正常完成强制检查。纯机械映射任务走 SELF；另一个准入控制让原请求包含需要独立判断的新含义，确认原 Reviewer 真读原文并在写前返回。该控制留在隔离任务/输入中，不偷偷把真实产品范围升级为新协议。

Lucerna 原 Reviewer 角色可承担需求核对、定义准入和最终产品审查，但分别绑定对象/阶段，不能用旧审核替当前版本；不新增常驻 Validator Agent。已有函数/source 不等自动 launcher 存在，先证明真实通道。

### C2. 两条主轨迹与关键反例

**正向链 L-GOOD：** 普通无 Goal 请求 → prepare_admission → SELF 或已获权的原 Reviewer 返回 → 读取相关项目能力 → 所需定义 ACTIVE → 原 runner/独立 Reviewer 对同 source/EXE/PID 观察 → 故意省略显式 finish 命令 → 正常 host 自动 finish/check/report/accept_submission → 当前任务返回有证据的报告。不能由测试者额外手动调用 helper 补完最后一步。

**返修链 L-REPAIR：** 在隔离变异中故意把未知等同失败，或永远显示 Available；冻结反例识别 → 当前任务收到原始实际/期望 → 共享预算内修机制 → 正常检查重跑 → 新候选有效观察被消费。产品改了，相关旧 native 结果作废。受控输入只能证明机制，真实 release 全面交付仍遵守原 native 合同。

必须另见这些危险下游动作确实没发生：

- L-BYPASS：直接原 result 写完成，缺独立同候选结果，正常结束仍拒绝 USER_READY；
- L-IDENTITY：旧 PID/旧截图或变化后的 EXE 拼入当前报告，拒绝接受；
- L-DEFINITION：作者把坏例 expected 一起改绿，候选定义不能激活；缺观察保持 UNKNOWN；
- L-OLD：把所有故障都隐藏来修假警报，旧真实故障控制拒绝；
- L-CANCEL：Stop 与父进程同时收到反馈，取消后没有额外修复启动；同 effect 不重复；
- L-COST：简单 UI 文案/纯文档不启动无关前端完整流程或重型 Review。

这些是能力与失败边界，不要求在一次真实产品运行中强凑全部故障。便宜机制控制先跑；正常全链成功与危险边界必须各由同一最终候选的实际入口证明。开发已用输入不能再声称 fresh。原 28 任务类型/7 绕过例及旧入口抽查是覆盖账，不是统计可靠性或重复运行配额。

### C3. 明确专业证据和授权边界

现有 `scripts/development-acceptance.ps1`、`acceptance-preflight.ps1`、Longleaf 回归、原独立 release workflow/Reviewer 是专业入口。最终范围以冻结任务所需 mandatory matrix 为准；源/EXE/hash/PID、Reviewer-own smoke/capture 和独立结果必须当前。日常 development 材料入口不继承完整 release 双 streak；最终独立 release 资格按原合同需要相应 preflight，二者不能互换。

本包未授权启动真实 Lucerna、对 Longleaf/账号发请求或修改当前用户桌面设置。正式首片执行包须在 P0 后绑定当前 Windows 候选路径与 hash、允许的安全交互、外部只读请求/账号边界、原 Reviewer 进程、最多轮次及恢复位置；若无这项精确授权只能做代码/fixture准备，不宣布完整试点完成。历史 01054 的 main push、子进程、设备权限不会自动继承到这项新试点。

对本例不需要修改 SSH/VPN/tunnel、Vault、凭据或远端生产服务；不得为了制造“故障”破坏实际连接。所有故障注入都在隔离输入/测试副本；真实运行只观察当前实际状态，不将 fixture 冒充实机事实。

首片估算 **40–88 小时，含 P0 4–8，剩余 36–80**。没有净收益则止步：用户仍要提醒验收、首个发现坏状态或转述失败，即使一堆 receipt 齐全也不推广。回滚共享接点/adapter，保留原回归、项目独立验收和未完成任务身份，不回滚用户配置或产品数据。

## D. 七仓逐项接入合同

公共完成入口统一是 03 的 `finish_delivery`，不是下表七种测试脚本各有一个新服务。每仓先激活 adapter/定义，再影子运行、正常入口好坏例、最后启用；外部人工边界如实保留。

|包与原结果位置|正式专业输入与允许范围|绕过坏例必须在正常 host 被拒|恢复/权限/回滚|
|---|---|---|---|
|D-LUC；原 task result，缺原约定时 `results/<task_key>/result.md`|上节精确原生候选和独立矩阵，不以 Producer绿代最终|只写 FINAL_NATIVE_CAMPAIGN 完成、缺 Reviewer-own 当前 PID|原 task/orchestrator 收回有效结果再 finish；不动账号/连接配置|
|D-SEM；`prompts/tasks/<id>_result.md`|同 APK/signer/package/serial，B02保存强停重开、所需B04/B07导出，原 Parent|READY_TO_PASTE_PARENT/SkipDynamicProbe直接写完成|GPT Work 无自动通道仍一次原Parent交接；不清真实数据，不把模拟器当硬件；旧照片/公式/录音保留|
|D-CARE；`results/<task_key>/result.md`，原 Controller 情形加 controller_report/packet|先 CPU fixture ≤60秒、连续3+2与独立resume2步、最多10变异，GPU/Slurm提交0；真实科学 claim 必须之后合法任务完整尺度/身份/指标/Planner结论|validator绿但12步/缺聚合/未被Controller消费就自报 VERIFIED_COMPLETE|先核原job与effect，不重提作业；充分负结果可有限交付；不改科学方法/数据/预训练/尺度；CPU机制通过不宣称科学可用|
|D-BOB；原 milestone/result，无原结果时 `results/<task_key>/result.md`|当前0.3独立产品＋隔离Zotero原生往返，PDF不变/cache恢复及性能|拿旧0.2 Safe或仅GPT Work绿报当前可用|Safe脚本可能改机器更新缓存，必须提前精确授权/恢复依据；不动真实库、不自动merge/main|
|D-MIC；原明确 investigation 或 `results/<task_key>/result.md`|真实loaded与Foundation/LowMemory/Highlighter/PDF相关范围，正常Edge短操作|candidate绿/heap低但未loaded或缺真实高亮/PDF|原Parent/当前task消费；手动Copy report仍记人工边界，不自动登录绕过；保留typing/IME/branch|
|D-AST；`results/<id>_result.md`|当前URL/source的完整科学图、trace、真实几何、原Parent lanes|静态全零＋旧网页截图直接报ready|原Parent人工返回保持；部署另授权；保留canonical关系/导出，不拿视图子集代全图|
|D-CUH；`results/<task_key>/result.md`＋原review/controller_report|当前Web/API/source/snapshot/persona及注册claim→auth→state→finalize、原Parent消费|PARENT_DELIVERY_GATE准备绿或旧snapshot报完成|不发票据、不burn、不新建campaign、部署或修改生产DB；按原活动身份恢复，保留隐私/重入/并发|

每仓 DA 报告在该 task 的 `delivery_assurance/` 证据根，原 result 保持。没有活跃 owner 保留原恢复点；没有正常 host 强制入口不能标自动 enabled。项目源发生变化只重验受影响映射及该仓绕过例，公共 schema/入口变化则升级广范围回归，不为省钱只跑 Lucerna。

具体原任务数、设备/账号/时间上限继续以 04 D5 为权威；本表没有扩大额度。后续依赖真实硬件、活动账号、部署或科学任务的阶段必须先冻结具体 effect 身份与当前权限，不能由一份全局“七仓通过”授权代替。

## E. Capability Gates：每个门证明不同的用户结果

所有门都绑定同一个将交付候选；以下是同一既有计划的验收分组，不新增 runtime 状态机或万能评分。P0只验证H门和入口前提；G门是P1之后真实实现验收，不得拼接不同版本。

|门|为什么单独需要／正常入口|必须观察的正向证据|拒绝与旧保护|
|---|---|---|---|
|H 宿主与权限能力|入口承诺依赖真实host；P0普通fixture任务|Hook/Stop真实继续、正确ID resume、实际指令/权限消费|未信任/超时/错ID/取消/父退出/重复effect；不能碰其它任务|
|G1 要求与实现能力|防止一开始理解漏、使用低配方法；普通任务写前|原文义务、正确SELF/独立选择、原角色真返回、能力实际影响|遗漏原要求、假独立、只登记插件；纯后端/文档不能误触发整套前端|
|G2 定义可信与旧保护|防产品作者改答案自签；缺验收器的正常任务|冻结四控制、合法校准/准入、ACTIVE精确digest、真实入口/前后依赖覆盖|候选签USER_READY、同时改控制、删旧入口逃逸、未知边被抹掉|
|G3 真实产品与专业判断|防测试/材料冒成品；项目正常runner/原独立观察|准确source/build/loaded/PID/设备或科学对象；专业结果确实被读|旧PID、错误collector、不同候选拼绿；科学负结论及原尺度不能降级|
|G4 失败被收到并在原任务修好|防用户搬运；正常工具返回/Stop/原父进程|feedback→实际ACK→授权范围修复→新观察；精确同task/session|只留文件、换任务、重复launch、预算叠加；取消/等待/不明effect零launch|
|G5 正常结束不可绕过|防写“完成”就结束；四类host原完成边界|即使省略显式finish仍自动check/report/accept，当前用户报告被正确接受|每仓绕过坏例拒绝；review bundle不能升USER_READY；原用户验收/发布权限保持|
|G6 分发、维护与净收益|防源码完成冒已启用；实际安装加载和日常任务|candidate→loaded→normal entry、逐consumer回退；用户提醒/转抄/首个发现者实际记录|中央发布代全局DONE、旧reader吞新义务；无收益撤公共层留有效回归|

以风险覆盖任务族，不按门数量凑成果。已用回归先过；完整产物/视觉/科学等不可机械判断的门仍由原独立专业角色观察。最终 fresh 输入需冻结候选后选择，不能用已用于修复的 LR-STATE-001 冒 holdout；如尚无新合法真实任务，则只报告已知回归与机制证据，不扩大成熟度结论。

## F. 成本、维护与唯一停止规则

估算保持 **P0 4–8 + 公共层56–112 + 七仓70–196 + 分发8–16 = 138–332小时**。首片是其中子集，不另加40–88。数字不是已授权工时或实际消耗；原产品测试、独立角色用量、外部等待、硬件/科学费用分别记录，不能藏在“自动”里。无实际价格和用量不估金额，外部付费新调用默认为0。

每任务新增机械 CPU 目标≤1秒、额外 p95≤5秒（不含原产品测试/模型）。普通额外续修默认≤2次/30分钟并与原剩余额度取小；原项目轮数共享而不叠加。技术实现若超时优先减重复解析/抽象或调整实现，不降低质量标准。合理修复在同一任务进行，不反复送 Critic；只有改变已冻结承诺、权威、权限、预算或恢复语义才回审。

维护复用原 TODO/DOING/ADAPTING/DONE。Bridge 维护真实入口与传输，core 维护通用类型，项目维护专业标准和旧控制。source/观察器/角色权限/正式出口变化使对应资格失效，在下次正常入口发现；不新增巡检服务。正式AI Skills维护开始时按原看板合同绑定真实tracking Issue；当前研究没有修改任何Issue/Project，也不虚构编号。

以下条件立即停止相应依赖，而不是伪造完成：无合法写前通道、高风险无人独立接收、当前原文/候选身份不明、ACTIVE定义缺失、取消或副作用结果未知、资源/权限不足、预算耗尽。可继续不依赖它的合法工作。外部审查健康等待不耗修复轮次、不自行改BLOCKED；退出当前活动也要保存同任务恢复点。

## G. 给下一轮 Critic 的审查边界与授权素材

### 当前已满足

- R3 冻结架构、五项设计关闭及原源码可追踪；
- 普通请求→独立核对→成熟能力→准入→真实观察→同任务返修→正常结束检查的完整说明/图；
- P0 的目标、正反例、上限、结果消费者、支持/回退规则；
- 最小 Lucerna 完整链和七仓各自专业出口、绕过坏例、恢复和维护；
- 本文件与 02–06 同版定位，不产生新架构。

### 审查齐备与执行未获权分别判断

1. 用户已允许保存13/14审查草稿；Plan、Canonical Goal草稿和Kickoff Draft现在同版。首个单元的host、fixture、binary、预算、允许效果和停止条件明确，具备交独立Critic审查的材料条件。Planner不自行给execution-ready结论。
2. 当前用户**未授予执行授权**，所以本轮没有运行探针。只有Critic审查后用户另行发送明确有界指令，才进入该P0单元。
3. P0结果尚不存在：不能提前放行完整生产实施。Desktop/交互式CLI/Remote未测，CLI结果不能跨入口推断。
4. 后续产品/设备/账号/科学/发布权限尚不存在。各阶段进入前按原04限额绑定真实对象；不以历史任务权限代本轮许可，也不把它们列为阻止当前无产品P0测量的条件。

### 待审授权包络的内容已经限定

首个未来执行授权只覆盖13/14选定的P0当前Windows非交互CLI单元：精确本机fixture根/项目级配置、最多6＋2回合及一条fixture会话的精确恢复、有限fixture进程/退出/取消、脱敏证据与恢复。身份已经只读定位；不把Desktop/Remote等其它单元一并授权。禁止生产源码、七仓运行、SSH基础设施、全局安全设置、真实账号、设备/GPU、独立付费API、部署/发行和新服务；禁止新远程任务/自动化。当前用户未批准这些允许项，因此此段不是授权或启动消息。

下一轮独立 Critic 应审完整稳定用户承诺及本包，判断02/03/06/12/13/14能否构成**仅该P0单元的可批准执行包**，并检查后续阶段没有漏掉原标准；不得给整个DA实施一个带条件的放行结论。若必须修改架构语义，按原稳定ID及新证据返修；普通参数定位和获权工作不变成新研究版本。下一入口只有 [08 完整审查提示词](08_CRITIC_PROMPT.md)，不是 Codex。

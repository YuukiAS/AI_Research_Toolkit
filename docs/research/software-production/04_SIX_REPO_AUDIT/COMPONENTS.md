# 从六仓库的问题反推具体组件：不能再用架构名代替机制

日期：2026-10-13。续接基准：本研究分支 `d6c8b00d3e7a4fc9aba4287f6659eec761412bc4` 中的六份问题账本；不替换前面的研究，不启动Critic，不修改六个产品。

**判断：不能再批准“加一个中央验收器就可靠”的路线。六个项目的问题同时涉及产品方向、领域含义、真实操作、观察器失真、证据混用、权限、恢复、任务成本和发布。这些责任必须由不同的实际组件承担。** 本文先落实“哪个问题由哪个程序或哪类专业智能体处理”，再指出没有现实入口的缺口。K01–K12只是本报告的分类索引，不是要求新建12个模块、服务、智能体或审批阶段。

六份账本保留246个可追溯条目：Lucerna 33、Bobbio 32、Mica 46、SeminarArc 32、Asteria 47、CUHK Date 56。包括历史事故、方案缺陷、当前源码盲区和明确产品边界；**不是246个当前未修复故障，也不表示全库历史已穷尽**。[逐项机器对照](problem-control-map.csv)把每一个编号映射到下列控制及各仓库的真实本地组件。具体事故来源、现状和因果说明仍在六份账本中，避免再复制一套彼此冲突的清单。

## 1. 十二类责任到底靠什么落地

| 索引 | 要解决的失效 | 决定性执行者/组件 | 不能靠什么假装解决 |
|---|---|---|---|
| K01 | 目标漏项、旧Goal压过新授权、已做功能重做、随意扩项 | Planner读取当前任务/产品源、已接受行为及实际分支；程序核对集合和版本 | 一个自动风险分数或新需求模板 |
| K02 | 方向错、忽略Figma、局部都对但整屏难用、普通文案泄漏内部语言 | 已有Frontend Design协调器及产品交互、视觉方向、组件系统、必要Figma/文字专业角色；实际关键状态渲染 | 截图存在、关键词计数、调用技能回执 |
| K03 | 用户行为/科学/数据含义错，状态传播错误，功能空壳或默认关掉 | 产品原有实现模块、领域模型、状态/算法/持久化测试；真实操作后置条件 | 通用“软件工程专家”代替领域语义，或一律回退 |
| K04 | 不是用户真正入口、夹具与真实路径不等价、设备证据错类 | 各产品现有黑盒驱动，严格限定场景、对象、账号、设备与副作用 | 内部API代替点按钮，网页代替原生，本地夹具代替真实宿主 |
| K05 | 检查器不看真正输入、缺值当零、自报PASS、测量与声明不符 | 验证器函数＋独立原始观察＋有正对照的局部反证 | 冻结错误检查器、只验JSON结构/哈希/退出码 |
| K06 | 删测试、改断言、重构破坏旧能力、保护只看未提交文件 | 已接受的行为基线、明确基线到候选diff、独立审核验收迁移、影响回归 | 不许改任何测试，或认为工作区干净就是科学内容未变 |
| K07 | 错候选、旧截图、自评/审查/设备范围混为一谈 | 现有候选/证据包校验器，补声明与证据范围匹配；独立采集身份 | 同源自洽哈希能证明事实发生，或一个总READY |
| K08 | 独立审查没看完整成品、照已知清单打勾、忽视整体品质 | 每个产品现有独立Reviewer/GPT Work合同；取得完整实际材料后判断 | 把昂贵模型用作普通测试执行器，或让生产者自己签字 |
| K09 | 错工作树/主机/账号、测试碰生产、源码与裁判同权、越权 | Bridge环境入口＋实际OS/账户/数据隔离＋受限凭据；按效果而非命令名授权 | 不同文件夹、不同聊天角色、钩子源码或脚本名叫Safe |
| K10 | 任务断联、身份串用、一次性票据误耗、并发抢资源、重复副作用 | 原任务事实＋Bridge运行/等待逻辑＋产品自己的事务/恢复入口 | 会话恢复等于进程存活，一个中央重试循环到处重发 |
| K11 | 小任务全套跑、同因无限修、不断刷新/重建、元数据挡住真测试 | 原任务范围和失败机制分流；已有Quick/Focused脚本；批量修复后必要检查 | 固定每次全跑、固定“再试三次”、换SHA清零预算 |
| K12 | 本地完成冒充发布、不同包、已正确还重装、产品审查被当上线许可 | 项目真实安装/部署入口及目标后置核验；独立发布身份/范围 | 编译/推送成功、未运行审查、通用Release标签 |

上表的作用是划分职责，后文逐项给出调用位置、观察依据和缺口；没有现成可靠入口的地方明确标“待补”，不虚构一个已存在的总控制程序。

## 2. K01：先确定完整用户任务，不让实现者自己缩题

决定性的智能体是Planner，不是一个读文件后自动批准的Python程序。它要消费目标仓库当前有效产品合同、原始需求和已接受行为，并给出“本次做什么、保留什么、暂不做什么、交给用户什么”。程序只能检查条目集合、批准对象和候选一致，不能判断未写出来的用户意图。

实际来源：Mica已批准的 `docs/tasks/2026-10-12-mica-product-system-rebuild-goal.md` 和对应产品系统；Bobbio `docs/CURRENT_MILESTONE.md`；CUHK Date当前campaign及发布范围；Lucerna原始任务与前端待办。Bobbio继续develop，不强制一任务一分支；Mica不把高级恢复/Notion重新拉入当前低内存—高亮—PDF优先路径。

**待补的确定性消费**：在当前任务提交验收前，对原始要求逐项要求实际证据、获批准排除或明确未验证。不能由候选只挑已经做完的项组成新集合。输入是已批准来源及其修订，输出是每项去向，不是模型“全部闭合”的布尔值。L03/M16/M26/C19/C35表明当前来源和最终用户路径都必须核对；旧事实不能无限重开已修问题。

**仍可能漏检**：产品意图本身错，集合完整也没用；必须在设计/领域判断中纠正，而非由程序假装理解所有需求。

## 3. K02：设计负责的是产品形态，不是末尾看一张截图

已核对正式能力源 `AI_Skills_Collection/skills/tools/frontend/frontend-visual-systems/SKILL.md`，观察blob为 `1f23cc1f4add4e406a43e6f93ca760ff2a41732e`。它明确 `executes_code: false`，所以不是自动运行器。负责实施的Codex或设计模型必须真实调用其选定能力并产生被后续实际消费的设计。

具体分工：`product-ux-planning`决定完整用户任务、状态和正常/诊断边界；`visual-direction`决定整屏组织；`design-system-tokens`决定共享组件/状态；有Figma权威时用 `figma-design-to-code`；`responsive-accessibility-review`处理实际可达/响应式；科研界面再用 `research-product-frontend`。文字先确定用途、主体、相邻内容、语言和不可改含义，再调用Clear Writing的 `product-ui-copy`。不能所有任务都无差别启动全部角色。

实际消费对象：Bobbio全屏Reader/Inspector与Figma；Asteria真实多视图图形与公式；Mica真实扩展popup/回答操作；CUHK Date问卷和当前介绍状态；SeminarArc真实短屏/大字体；Lucerna真实首屏与服务状态。B05/A37/L06/M18/C42等表明只修CSS细节会绕开根因。

**决定性拒绝**来自专业模型看过完整实际画面后的可定位发现，不是设计文档存在。结构、密度、指代或用户操作方向错，回产品设计；实现偏离正确设计，修代码；不能为了当前代码容易过关改Figma。普通小文案按当前设计局部看，重大重设计才全产品独立审查。

**未成立的保证**：没有任何脚本能保证审美判断永不失误。必须用历史坏画面校准审查范围，保留正常好产品能通过，并接受用户真实反馈推翻内部结论。

## 4. K03：领域实现和状态模型不能被中央质量代理替代

决定性模块是各产品已有业务实现与其领域测试，不是统一的新状态机。

- Lucerna：`test-longleaf-presentation.mjs`、`test-vault-presentation.mjs`以及正式聚合/呈现链。必须同时测正确健康不误报、已确认子故障不被总体正常吞掉；不能统一改成警告。密钥替换需要下一次真实读取和重入使用新配置，不是只验证输入密钥有效。
- Bobbio：真实隔离Zotero批注往返、来源归属、PDF不变和当前/历史知识分离。美观不能换掉Zotero权威，AI解释不能自动变成人工确认事实。
- Mica：活动重构分支中的适配器、回答语义模型、低内存、高亮和PDF模块。完整回答不能删未知块后自称精确；不注入只能证明保守安全，不能证明功能完成。
- SeminarArc：`EndSeminarUseCase.kt`、`RecordingServiceStarter.kt`及其测试处理无录音会话停止时的服务生命周期；Room/WorkManager状态与真正保存完成反馈相连，不能为了测试加固定成功提示。
- Asteria：`src/architecture/trace.ts`、`session.tsx`、`viewProjection.ts`、`graphPresentation.ts`。Recursive/Both方向、选中与追踪分离、科学图关系是算法与领域问题，不能只改UI计数或为消除warning发明科学边。
- CUHK Date：密码构造、介绍/同意/历史/照片所有权、问卷测量含义、隐私规则。`blackboxInternalBootstrapAuthPassword` 与 `blackboxUserAssignedPassword`必须分开；“无合适对象”允许是真结果，不能造对象或逼降低偏好。

**通用部分只要求每个关键动作有前态、动作、真实后态及必要重入结果。** 真正不变量仍由产品来源和领域负责人决定。固定例子以外的输入、取消/错误/重启和不应改变的场景必须进入对应原有测试。各仓库的具体映射见L15–L21、B07–B11/B31–B32、M19–M21/M28–M29/M39、S02/S20、A03/A14–A20、C29–C30/C36–C54。

## 5. K04：到底谁真的运行用户入口

| 产品 | 已有决定性入口 | 输入/真实观察 | 尚不能据此声称 |
|---|---|---|---|
| Lucerna | `scripts/development-acceptance.ps1` → `smoke-lucerna-close.ps1`、`capture-lucerna-window.ps1` | 指定EXE、提交、进程、窗口操作和同次截图 | 安全隔离、NSIS完整升级、整体产品品味已过 |
| Bobbio | `Invoke-BobbioReaderAcceptanceSafe.ps1`及真实profile/data审计 | 明确测试Zotero实例、阅读/选择/批注往返、数据前后核对 | 原生性能脚本里的假API就是真正Zotero互通 |
| Mica | 重构分支 `foundation-core-flow-fixture.mjs`、`popup-render-fixture.mjs`、高亮/PDF/低内存脚本；实际产物Reviewer | 正式构建模块在其真实承载环境中的动作；分别标本地夹具、实际扩展、当前网页、目标设备、PDF阅读器 | 本地夹具全部通过就支持当前登录ChatGPT；PDF提取就等于鼠标可选 |
| SeminarArc | `scripts/run-blackbox-acceptance.ps1` | 明确Serial/ApkPath/Scenarios，B01–B08真实UI、系统选择器、导出与重启 | 模拟器证明麦克风质量/OEM后台；两段录音库存证明不存在的导入入口 |
| Asteria | `tests/browser/asteria-v2-rc.spec.ts`；实际公开页面检查 | 页面点击/键盘/视图与几何，包含 `assertNoNodeOverlap` 等 | 每个度量都独立正确、全图可读性或科学含义全过 |
| CUHK Date | `scripts/registration-critical-path-hosted.ts::runRegistrationCriticalPathHosted`及 `completeProfileUi`、`completeQuestionnaireUi` | 托管页面真实注册/密码/Profile/Questionnaire/重入/Dashboard | 独立审查已完成，真实用户注册已授权上线 |

CUHK Date的关键正面修复是：同一凭据生成语义、真实可见表单操作、操作前各步骤默认失败、完成后才改成功；预置和清理由测试管理身份做，不能交纯黑盒审查者读数据库。以前用 `page.evaluate(fetch(...))` 绕过密码页的假绿不能通过简单换验证器名字解决。

**拟议新增代码只能是这些现有驱动的受控调用和语义翻译，不重写六套测试。** 调用参数要包含产物、执行环境、场景、允许副作用、资源所有者；当前缺失原生/宿主权限时局部未验证，不能偷偷用低一级环境替换。

## 6. K05：先校准观察器，再保护它

本轮对Asteria源码纯函数和临时Git仓库进行了实际局部反证，见 [结果](OBSERVATION_LIMIT_PROBES.md)。常量交叉/标签计数、缺测归零、工作区diff漏暂存/提交，说明“固定版本强制运行”可以稳定地产生错误结论。

**决定性代码位置和拟议最小修法：**

1. Asteria `validate-architecture-rc19.mjs::routeGestalt`：缺测不能写零；交叉/标签必须由观察器真实测量，无法测量就不给相应能力结论。浏览器自己读取应用 `data-*` 指标时，至少用独立几何例子校准，不能只信被测程序报出的指标。原函数对长绕行有有效检查，应保留。
2. Mica `scripts/acceptance/validator.mjs::validateBundle/validateMeasurement`、`control-corpus.mjs::runControlCorpus`：已有实码，不再另造同义核心。继续核对完整且唯一的门槛集合、原始测量、归属/放置/变体事实。CLI里的candidate命令验证给定证据包，不是现场操作全部功能。坏JSON控制是验证器测试，不能替代坏产品的真实入口回放。
3. Lucerna `governance-regression.ps1`：其GAP和总体PARTIAL是有价值信息，上层必须逐必需项解释，不能只看退出0。`test:development-acceptance`的SelfTest只证明工具自身。
4. SeminarArc真实OCR提取和键输入：必须先核对应用实际收到的输入、实际EditText值，再检查保存/搜索/导出。旧测试没读到控件而报OCR全空，是测试假阴性，不是算法要重写。
5. CUHK Date `verify-cloudflare-staging.ts`只能发静态配置结果；托管活性和业务质量由真正浏览器/服务观察提供。HTTP200或非空列表也不能证明检索语义正确。

**如何知道补法不是另一种自证：** 正常有效测量应保留通过；缺失/失真的观察要不通过或未验证；真正破坏产品行为时，最终普通入口必须感知。报告结构正确和哈希自洽不是原始事实真实的证明。观察器同候选身份可改时，尚无强制信任边界，不能宣称所有伪造可拦。

## 7. K06：旧能力保护与合法重构，两者都要成立

Asteria `changedProtectedTruthFiles` 当前只看未暂存工作区，局部实测已证实看不到暂存/已提交变更。需要显式批准基线到候选的diff，再单独检查工作区；这仍只证明改动范围，不证明科学正确。

SeminarArc `run-visual-regression.ps1`普通compare不改基线，更新需显式开关；这是正确默认，但不是外部权限隔离。Mica、Bobbio已有合同/测量/包检查，应保留已接受行为作为另一个来源，不能随着候选删除测试而消失。

**验收维护者的实际决定**是将旧检查分类：用户行为不变量、产品已批准变化、过时实现细节。合法重构可以更换测试实现，但要说明每项旧保护由哪个新观察接手，且在新候选上实际运行。不能一律禁止改测试，也不能看到“旧验证器更新后绿了”就自动认定作弊或有效。

**尚缺共享消费点**：每个发布/审查入口接受固定基线及迁移说明；若缺少旧能力去向，就不能签发其“不退化”声明。要实测删功能连带删测试仍被外部行为检查发现，同时正常重构不被历史字符串守卫无限卡住。

## 8. K07与K08：证据包校验和真正独立审查是两种工作

现有脚本：Lucerna `Assert-CandidateAdmission`、`Test-CaptureSameRunBinding`；Mica `validateBundle`；Bobbio `validate-0.3.0-audit-bundle.mjs`；SeminarArc `verify-gpt-work-acceptance.ps1`；CUHK Date `verify-gpt-work-parent-delivery-preflight.ts`。这些可检查不同程度的身份、文件、数值和准备条件，不能彼此升级成总体用户验收。

对应真正的专业角色已经有本地入口：Lucerna `LUCERNA_FINAL_PRODUCT_REVIEWER.md`；Bobbio `GPT_WORK_FULL_PRODUCT_REVIEW_PROMPT_0.3.0_2026-10-04.md`；Mica产品合同的实际产物Reviewer与最后整体GPT Work；SeminarArc的已生成Parent；Asteria RC19 Parent的W01/W05/W06；CUHK Date的黑盒Browser/Result/Campaign合同。这不是本轮新增或启动的审查。

**生产者**负责普通操作、明确错误、截图获取、材料索引；**独立审查者**在能读到精确候选的完整产物时，检查未知缺陷、整体层级/连贯性、专业含义和实际用户理解。Bobbio的历史审查偏向已知问题关闭；Asteria的人类截图两次发现更大的方向错误，证明“另开一个模型”也不保证独立质量。

需要的接口不是让Reviewer勾 `seen=true`，而是明确材料范围、原始观察来源、缺页/缺状态、候选身份、实际发现以及其可重现位置。材料取得回执最多证明传输，不证明理解。纯黑盒角色不得读内部答案；科研源核对交另一个合适的领域角色。不能因为要求盲审，就让负责科学内容判断的人也失去原文。

**缺口**：当前没有证据证明所有主机上存在自动接手的独立GPT Work任务。没有则保留真实等待/人工交接，不伪装正在后台审查。用户当前未认可方向，本轮不运行或要求其运行Critic。

## 9. K09与K10：运行权限、真实资源与恢复

已核对Bridge的实际Python入口 `ai_bridge_kit.bridge_cli:main`，`pyproject.toml`当前声明0.11.0；这不等于用户机器安装此版。`ai_bridge_kit/persistent_run.py`、`agent_flow.py`、`host.py`有真实源码；本轮只核对其存在和此前读取的用途，不能据此声称完整恢复路径已实测。`external_wait.py::build_wait_status`本轮直接读到：它区分当前/过期独立决定与有证据的外部故障；等待不能自动变成产品失败，也不是自动调用外部角色的实现。

VibeResearch已有 `daemon.py`、`kernel.py`、`reliability.py`、`codex_adapter.py`、`next_action.py`，但研究实验/Slurm语义不直接适合软件发行。采用前需要逐接口比较，不能为了有统一名称复制一份调度器。本报告不要求安装它。

项目副作用需要专门拥有者：Bobbio测试profile和真实数据目录分开，裸Zotero URL可能跑到默认实例；其Safe wrapper会调用Apply准备，不是只读。SeminarArc明确设备serial且不全局重启adb。CUHK Date一个persona一个真实浏览器上下文，primary/recovery票据有事务和消费状态；不可为写报告更换浏览器导致会话丢失。Mica真实已登录宿主的权限不能被通用自动化扩大。

**共同新增需求仅在现有机制无法消费时才实现**：稳定任务身份、资源租约、执行目标、原授权、外部动作意图和后置结果。恢复先问原进程是否仍活、目标已否达成、票据是否已消耗；结果未知先核对，不重发安装/发送/付费操作。不要求所有仓库都新建分支，也不在一个工作树中并行写。

隔离不能凭钩子、路径或角色名称；发布凭据与候选运行身份同权时，最多称审计型检查。真正强制模式要有不可由候选修改的检查与受限发布身份，并实测跳过入口、同名状态伪造和越权失败。本轮未改任何账号或权限。

## 10. K11：小任务与完整任务如何避免两个极端

决定验证集合的是**当前用户要完成的完整路径＋此次影响到的旧能力**，不是只看最新diff，也不是每次全套跑。C19/C20说明，即使只改一点，最终审查任务依赖的已有坏服务也不能无视；C31–C33说明，把可变路线图锁在QuickCI第一步能让真正代码测试长期不运行。

直接复用：CUHK Date `verify.yml`的quick/full分流；`runRegistrationCriticalPathHosted`先过快关键链再展开昂贵工作；Mica `acceptance:focused`；SeminarArc `-Scenarios/-Profiles`；Asteria浏览器聚焦用户性质与既有复审范围；Bobbio只对触及的原生性能/状态补证；Lucerna普通后台→必要原生验收分开。

以下判断需要实现者/领域模型提出，程序只检查批准边界和实际执行事实：同一失败属于产品设计、业务实现、环境、数据夹具、观察器或审查标准；每种返回自己的负责人。没有新的根因证据不能机械重复完整套件或新开Goal，但也不能把“停止盲跑”误解为停止已授权的修复和后台开发。

**不需要的新东西**：为每项规则造一个hook；每项小修都跑技能回放；固定数量独立模型；给正常迭代无限增加RC专用套件；中央复制所有现有工作流状态。**需要的负面检查**：普通文案不触发全量平台/完整Critic；同一运行包只改验证器时，已有不受影响的原始运行证据不被机械作废；界面/配置/包确实变化则重验相关部分。

## 11. K12：交付必须尊重不同产品的消费对象

| 产品 | 真正消费对象与决定性发布核对 | 不能机械统一的条件 |
|---|---|---|
| Lucerna | 最终NSIS包、安装路径、启动偏好、运行进程/托盘；`startup-hooks.nsh`三个安装宏已存在 | 开发EXE自检不能代替安装升级；正确目标不重装 |
| Bobbio | 当前里程碑允许的EXE/快捷方式、真实隔离Zotero互通、用户里程碑接受后develop→main | 不强制套Lucerna NSIS；0.2已接受不重开；0.3产品审查不等于原生集成结束 |
| Mica | 真实被加载的扩展dist/ZIP、对应候选/门槛/PDF产物 | 实际加载旧ZIP不能判新代码坏；两个独立有用里程碑按现有Goal |
| SeminarArc | APK、签名、指定安装设备、数据保留与当前发行边界 | 纯QA/报告修改不值得新alpha，未接ASR等不假称完成 |
| Asteria | 固定URL真实部署版本和正常页面；`smoke-architecture-rc19-public.mjs` | HTTP200不是可读科研产品；审查中途更新会污染对象 |
| CUHK Date | 前后端部署、匹配/账号/同意状态、当前合成审查或真实launch授权 | Parent就绪、合成审查关闭、真实用户开放是三件事；不得自动开注册 |

共同发布逻辑如确需新增，应仅接受具体目标、当前授权、最终产物和有效证明，先查询目标现状再决定无操作、继续或拒绝。签名/重新包装改变最终字节时要把最终包纳入所需验证，不能用“来源相同”遮住装的不是测的。

## 12. 为什么这次不先挑一个总框架

以下六个反例直接限制选型：

- **只加Skill不够**：L02/B05/M13已有设计规范，实际画面仍坏。
- **只加验证器不够**：Mica已实现 `validateBundle` 与控制语料，仍出现M30–M35的观察/绑定/协同伪造缺陷。
- **只冻结验证器不够**：A40–A42会把观察盲区一起冻结；本轮局部实测已证实。
- **只宣称端到端不够**：C02/C03用不同密码、直接API绕过用户入口也能自报托管预检通过。
- **只加独立模型不够**：A36/A38和B12表明完整材料与审查范围仍会漏；C13甚至不同persona共享会话。
- **只增更多检查不够**：S11/S24是观察器假阴性，C31是错误治理卡住真测试，L25是验证基础设施吞掉产品时间。

因此，本报告不把前面“研工台六模块”视为已成立实现路线。长期可能需要一个统一入口，但必须先证明它能正确消费上述组件、执行已授权动作、按证据范围推进并安全恢复。能复用已有程序就修调用方；确实没有跨项目公共能力才新增。独立仓库、常驻服务和界面属于后续实现选择，不是对这些失败的解释。

## 13. 尚无决定性执行证据的地方

仍未证明：跨六仓库统一的普通Codex入口；共享的、不依赖自报的任务声明与证据匹配；所有主机上的独立运行/发布身份；浏览器/原生审查的实际自动接手；跨机器资源租约和结果未知副作用的恢复；无需复制科研状态机的VibeResearch复用方案。不能把这些写成已存在的程序。

246项都有问题→本地组件→共同责任的对照，**不表示246项已经被技术性防住**。完整历史覆盖边界见 [COVERAGE.md](COVERAGE.md)；有意义的下一份证据是普通好任务能完成、对应坏行为能被发现、无关小任务不被拖重，而不是再生成一份新的Critic提示词。

## 参考与来源定位

各产品的固定提交、脚本与事故来源分别见 [Lucerna](LUCERNA.md)、[Bobbio](BOBBIO.md)、[Mica](MICA.md)、[SeminarArc](SEMINARARC.md)、[Asteria](ASTERIA.md)、[CUHK Date](CUHK_DATE.md)。本次特别复核了Mica活动分支的 `scripts/acceptance/cli.mjs`、Asteria固定验证器全文、CUHK Date关键用户链初始化与真实表单入口。

共享组件的本轮来源：
- [Frontend Design正式源](https://github.com/YuukiAS/AI_Skills_Collection/blob/main/skills/tools/frontend/frontend-visual-systems/SKILL.md)，读取blob：`1f23cc1f4add4e406a43e6f93ca760ff2a41732e`。
- [Bridge安装入口](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/main/pyproject.toml)，读取blob：`89a4ff428aed79924791a3e15b09fd29aacc7344`；[外部等待实现](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/main/ai_bridge_kit/external_wait.py)，blob：`db1afbc5beb73037a87854548fbe7441d0f41128`。
- [Git差异的官方含义](https://git-scm.com/docs/git-diff)，2026-10-13外部核对；局部实测仅支持对应参数语义。
- [Playwright测试隔离](https://playwright.dev/docs/browser-contexts)，2026-10-13外部核对；浏览器上下文隔离不等于后端账号/匹配状态自动隔离。

本文件是基于来源的机制论证；所有“补”“应”“需要”均是尚未实施的建议，不是已支持声明。没有启动Critic、模型后台任务、付费API、真实GUI或部署，没有修改六个产品的实现。

# GPT Work：六仓专项验收器立即实施的六份 Codex 任务

你担任六仓专业验收器专项的协调 Planner。用户的 Codex 额度即将到期。这次必须尽快产出六份真正能交给 Codex 开始各仓验收器编写/加固的完整实施任务，不是长篇现状调研、抽象方案、又一次 Delivery Assurance 开发计划或者第二个公共验收平台。

**六仓：** YuukiAS/Lucerna、YuukiAS/Bobbio、YuukiAS/Mica-for-ChatGPT、YuukiAS/SeminarArc、YuukiAS/Asteria、YuukiAS/CUHK_Date。
**明确排除：** YuukiAS/CARE_Challenge；不得安排 CARE 任务、GPU、Slurm 或科研高成本实验。

用户要的是：在中央 Delivery Assurance 尚未实现时，先利用剩余额度，复用和加固六个仓库现有验收程序，补足历史反复暴露的漏检、误报、假完成和旧能力回归；未来中央系统只需通过薄适配读取成熟专业结果，不应推倒重写各仓验收器。每个 Codex 实施后必须逐仓报告真正新增多少个验收器、增强多少个、增加多少条回归，逐个说明作用和真实运行结果。你在本轮只写六份 Codex 实施提示词，不替 Codex 改产品/测试程序，不预报任何成功数量。

## 1. 先读取冻结设计，但不要等待它开工

必须经 GitHub 实际读取：
- YuukiAS/AI_Research_Toolkit 的 research/software-production-decision-20261013 分支；
- docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/02_ARCHITECTURE_AND_COMPONENTS.md；
- 同目录 03_END_TO_END_EXECUTION_AND_VALIDATORS.md，重点 E4 动态选测、E5–E8 验收器、R1-AR02 冻结校准/独立准入、F4/da/2 适配理念、R2 正常结束结果消费；
- 04_SEVEN_REPOSITORY_ADOPTION.md 六仓专业入口；
- 06_IMPLEMENTATION_AND_EVALUATION.md；
- 研究仓 main/COMPLEX_SYSTEM_DESIGN_GUIDE.md。

这些文件给出兼容方向，不是此任务所需安装依赖。没有新的 delivery_core.py、Bridge delivery.py 或正式 da/2 reader，仍可沿项目已有测试体系编写并运行高质量验收器。**禁止让六仓等待 DA 的 P0、Bridge Hook、共享核心或中央最终签发。** 不改中央 DA/Bridge/AI Skills 的生产源码，不创建第二套通用框架、任务库、通用 Validator Agent 或所有项目共同依赖的新服务。

同时读取 AI_Skills_Collection 当前 main 的 PLANNER_ROLE_CONTRACT、CRITIC_ROLE_CONTRACT、PLUGIN_CAPABILITY_GATE_POLICY，以及各项目 AGENTS 和正式现有任务授权。跨仓实施包应可进入现有独立审查，但 Planner 不得自签最终 PASS；项目内可逆小回归不应为等待中央大工程而停工。真实新权限、专业标准变更和高影响副作用仍按原项目规则处理，不能因额度将过期而绕权。

## 2. 已整理历史必须真正消费，不重新造待办

从以下源取得六仓历史：
- docs/research/software-production/12_COMPLEX_DELIVERY_REQUIREMENTS_INTAKE_20261015/11_RAW_CASES_ONLY_NO_SOLUTION_MAPPINGS.csv；
- docs/research/software-production/04_SIX_REPO_AUDIT/ 的 LUCERNA.md、BOBBIO.md、MICA.md、SEMINARARC.md、ASTERIA.md、CUHK_DATE.md；
- WORK_OUTPUT/05_HISTORICAL_COVERAGE.csv 中对应记录；
- 六仓自己最新有效分支的 TODO、当前 Goal、已接受设计、专业验收报告与源码。

历史登记六仓合计 271 条：Lucerna 53、Bobbio 32、Mica 46、SeminarArc 32、Asteria 52、CUHK_Date 56。**不是 271 个当前缺陷，更不是必须建 271 个验收器。** 对每项区分：当前仍需解决、历史已修需回归、当前已有可靠保护、观察器/验收器自身缺陷、被正式替代、环境待验或只有担忧尚未发生。按同一来源 ID 归档，禁止臆造历史复现或把旧失败全部标成当前失败。

真正阅读相关历史后，把功能风险归并成少量专业检查职责，既不能漏掉高价值历史场景，也不能靠机械增加文件数来完成任务。每个缺口说明为何已有检查不能发现它；项目已经有合适程序时优先增强，不新建同义脚本。

## 3. 第一工具阶段：早写 GitHub，六仓分开并行准备

本提示词固定于研究仓同一研究分支：
docs/research/software-production/23_SIX_REPO_VALIDATOR_SPRINT_20261022/GPT_WORK_MASTER_PROMPT.md

在此目录 WORK_OUTPUT 下先创建很短的 GitHub 写入探针并回读，记录实际六仓源分支/SHA、写入能力和准备状态；之后每完成一份提示词即写入 GitHub、回读，不等六份全部起草完才首次保存。

分别核对六仓当前真正有效分支、是否存在活跃 Codex 任务/工作树冲突、AGENTS 限制、仓库可写性与实际任务文件入口。研究时的分支线索是：Lucerna main；Bobbio develop（不是已验收的 main）；Mica codex/mica-product-system-rebuild；SeminarArc main；Asteria main；CUHK_Date main。这些只是定位线索，不准静默覆盖后来提交或创建分支。

允许本 GPT Work 写入六仓的**新增任务提示词与必要最小任务索引**，不得在此轮修改源代码、已有 Goal、验收标准、项目配置、发布或真实用户数据。优先在各仓既有合法任务入口写一个可点击文件：
- Lucerna：按 AGENTS 和 prompts/tasks 规则；
- Bobbio：按 develop 上原 DEVELOPMENT_WORKFLOW/里程碑机制；
- Mica：按现行 rebuild Goal/任务目录，不能另开竞争主 Goal，不改变 Foundation→Low Memory→Highlighter→PDF 优先顺序；
- SeminarArc：prompts/tasks 下既有任务规范；
- Asteria：prompts/tasks 下既有任务规范；
- CUHK_Date：prompts/tasks 下既有任务规范。

若某仓合法任务入口不允许写入，**不要在别仓偷写它的业务文件、创建分支或宣称已落地**；先在本研究目录保存它的完整同名备用 Codex 任务和准确不能落位的原因，继续完成其余五仓。任何未确认的授权不等于无需准备这一仓 prompt。目标是六仓都有完整、可复制、可定位的实现指令。

## 4. 必须选择的项目原生验收器路线

每项历史能力最终只选以下动作之一：
- REUSE：现有验收能实质证明目标，复用；
- ENHANCE：现有类别、程序能覆盖，补观察、逻辑或校准；
- ADD_CASE：程序能抓问题但缺历史代表性反例，只加回归；
- NEW：真正新的专业观察对象/失败含义，现有类别无法覆盖才新增；
- REPAIR_HARNESS：既有观察器/验收程序本身误报漏报，修原程序而非强改产品；
- MERGE/RETIRE：确有重复或过时，必须迁移旧坏例及受保护内容；
- BLOCKED_REAL_EVIDENCE：缺实际设备、账号、审查或授权，只完成可合法的机械/隔离部分，不假装真实验收。

不设固定数量配额：新增 0 个也可以是正确结果，只要实际保护得到加强。每项实现必须有适用的 good、bad、missing、unchanged 对照；高风险专业真值来自现有权威及受保护样本，不能产品、测试、参考答案都由同一个 Codex 改成一套自洽错误。当前可执行的局部控制要直接运行；视觉、交互、性能、真实账号和学术判断不能仅凭文本扫描、文件哈希或假数据升级为专业通过。

**复用现有专业 runner，而非未来中央 DA：** 在项目当前通常使用的测试入口里加入新增/增强检查。支持范围内修改后聚焦运行，收口时按项目既有测试阶梯进行累计/原生/黑箱或独立审查，不因简单文档变动一律全量设备测试。

未来 DA 只需适配读取：检查的稳定名称、适用对象/候选身份、专业标准来源、实际调用入口、结构化结果（本仓原语义可映射 PASS/FAIL/UNKNOWN）、原始证据位置、检查版本或失效条件、相关历史案例。优先复用已有 JSON/证据报告，缺一项才小改；**不要现在实施 da/2 GateDescriptor/ProjectAdapter 的全部协议、中央激活机制、统一后台与新的状态数据库**。标注将来仅由薄 adapter 转换，原业务逻辑不动。

## 5. 六仓任务必须聚焦的具体现实

**Lucerna：** 复用 scripts/development-acceptance.ps1、状态呈现回归、独立原生审查。处理检查中/未知与真实故障区分、资源显示不编零、旧 quota 与多个 provider 状态、模拟/测试控件不进正式界面、EXE/PID/截图同候选、前台打扰、通知必要性、整体视觉/自然文案、安装升级卸载旧保护。真实 Windows/账号/服务效果未授权时不能自动操作。

**Bobbio：** 使用当前 develop 与 0.3 专业合同。重点是 Zotero 测试 profile 与真实用户库隔离、PDF 阅读/标注真实往返、旧 0.2 检查不能假签 0.3、Windows 原生界面及 Figma 相符、缓存/性能/资料不变、原始学术来源与 AI 解释/用户思考/正式已审知识隔离。优先复用 Invoke-BobbioReaderAcceptanceSafe.ps1 等程序，不能操作真实 Zotero 资料、不得因验收触发用户正常 Zotero 更新器。

**Mica：** 当前 rebuild 分支的 scripts/acceptance/cli.mjs、validator.mjs、control-corpus.mjs 已有明显成熟基础，优先增强而不是再造。保护 Foundation、低内存优化真实收益、内置高亮、复制与 PDF 保真，旧输入法/发送/恢复；不能用纯 DOM 隐藏或全关功能来“达到性能”。不能让开发回归反复刷新已登录 ChatGPT 用户会话。最终真实加载/低配机器受原手动边界约束。

**SeminarArc：** Android 原 Room/服务、录音、照片/音频、状态恢复、B01–B08 黑盒；特别是 B02 保存后强停重启读回、B04/B07 导出、历史 OCR/控件误选的 harness 误判、尺寸/无障碍/视觉。复用 run-blackbox-acceptance.ps1/Gradle/视觉回归；没有设备授权不运行真实手机写入、正式签名或公开商店发布。

**Asteria：** 现有 tests/browser 与多份 validate-architecture 脚本；科学图的真实关系、方向、遮挡、节点边界、几何、跨视图一致性、缩放和亮暗。特别防止 routeGestalt 的硬编码零计数冒“无冲突”。真实全图渲染/截图及已有 GPT Work 独立产品审查不能被静态脚本代替。不改固定公网部署/服务，遵守当前一个 Parent Work 的界限。

**CUHK_Date：** 真实注册、认证、问卷、产品状态、重入、隐私可见性、一次性票据的 claim→auth→state→finalize、安全隔离、persona 正确前置条件、简繁中文与手机端自然视觉。复用原 staged blackbox、Playwright、parent-delivery-gate 等；单凭准备包绿不等正式审查。未经授权绝不生成/消费真实一次性票据、操作生产数据库、部署或创建真实账号。

每仓具体新旧缺陷必须回源核实；以上是定位导航，不是编造当前所有问题都未修复。

## 6. 六份 Codex 实施任务的最低完整度

每份必须有下列内容，但采用本仓实际 prompt 格式，不把中央研究的几十万字复制到 Codex 会话：

1. 精确仓库/分支/起始SHA和现有合法入口，受任务授权的文件与副作用边界；并行工作树冲突如何不互相覆盖。
2. 项目现有 runner/脚本/测试目录的真实路径，当前已接受的正确行为、待补的历史失败/误判、优先新增的检测语义。任务不能只是“请自行设计必要验收器”。
3. 明确 IMPLEMENT：阅读来源→核旧程序→修/补/增专业检查→冻结可执行正反/缺证/旧保护样本→把它接入正常 runner→实跑当前合法目标→产品或观察器真实缺陷按责任修复→必要重新观察→提交证据。不要因看到了历史 FAIL 就乱改当前早已修好的产品。
4. 只在已明确批准的任务/专业标准下修验收器；需要新增真实专业标准、权限或不可逆副作用时停相关路径，不停所有代码/fixture工作。此前获授权范围不反复索权。
5. 确实需要独立验收时复用该仓现有 Reviewer/Verifier/GPT Work 角色及原传递入口；不得默认新增 subagent、第二套评审平台，不能伪称当前 Codex 自检等于独立专业裁决。
6. 真实运行与交付对象：代码、测试、原生EXE、APK、浏览器真正部署/加载、科研图成品等分别需要什么证据；当前候选身份绑定。跑不了的报告确切缺口，不能用 fixture 绿代替真实可用。
7. 控制成本：聚焦测试优先，累计回归按改动执行，真正高成本/有副作用的现场检查按原合同，不为赶额度无限运行；不把“先写十几个验收文件”当完成。
8. 保留轻量 DA 适配信息：已有 runner 入口、输出路径、逐项结果和候选身份。不得实现未发布中央 da/2 和新的通用控制器。

## 7. Codex 实施完成后每仓必须给出真实数量与逐项作用

不要让 GPT Work 预填假数。每个 Codex 的项目真实结果文件必须包含：

- NEW_VALIDATORS：真正新增独立检测逻辑的类别数（只有能由项目正常 runner 执行才计）；
- ENHANCED_VALIDATORS：实际增强原有验收器的数量；
- NEW_REGRESSION_CASES：实际新增并运行的代表性回归/坏例数量，不把案例计作独立新验收器；
- REUSED_VALIDATORS：未改而复用的既有检查数；
- MERGED_OR_RETIRED：合并/停用数量与受保护旧坏例去向；
- ACTUALLY_RUN：正常入口实跑的检查、命令、当前候选/代码身份、结果和原始证据；
- NOT_RUN_OR_UNKNOWN：因账号、设备、私有数据、独立审查、权限或当前阶段未到而未运行的真实范围；
- HISTORICAL_COVERAGE：每个历史问题 ID 最终对应已有可靠检查、新增/增强检查、修复了当前缺陷、已被后续要求替代、还是仍待真实确认；
- FUTURE_DA_ADAPTER_ENTRY：DA 以后读这批专业结果的单一推荐入口、项目现有数据格式与候选身份。

每个新增/增强项目至少用**一条完整中文**说明：“它防什么真实过去错误；何时由哪个正常命令调用；哪个坏例会被识别；保护哪项正确行为；运行证据在哪里”。即使NEW_VALIDATORS=0，只要加固真正有效也可成功；未执行的绝不计ACTUALLY_RUN，不允许“程序存在=能力已通过”。

如需处理当前仍存在的产品 bug，先添加能重现/检测它的回归，再在当前已获授权的代码范围内修复并重验，保持用户既有正确成果；超出范围的产品新设计不由本验收任务偷偷决定。

## 8. 不在额度过期前浪费时间的规则

**先产出六份实现提示词，再做汇总。** 不要求先完成中央 DA P0、六仓统一适配器、所有 271 条历史重跑或额外软件架构轮次。一个仓库出现只读来源、权限、已有Goal冲突或外部环境问题，不让其它五仓同时停工。

这轮用户已明确授权**编写六份实施提示词以便 Codex 依项目真实规则继续**，没有授权 GPT Work 修改业务代码或执行账号、设备、真实 Zotero、生产部署、GPU、付费测试。跨仓正式改动若根据项目和 Planner/Critic 合同需要独立最终执行审查，任务应先全部准备，再给一次短而独立、逐仓可单独裁定的审查包；不能 Planner 自给 PASS 或拖成新一轮 DA。已有已批准的项目测试/小修不应被错误冻结为“等中央架构发布”。不要求用户重复批准已经允许的同范围修改，真正新增的权限才给具体决策。

## 9. GitHub 写入与本轮完成判据

- 在六个目标仓各自**正式任务入口**保存**恰好六份**新增 Codex 实施任务；这是首选交付。只能写本轮任务与必要最小索引，不动项目源码/现有正式Goal，不能未经允许创建或强推分支。
- 某仓不可写时把那一仓**完整任务文本**放回本公共研究目录 WORK_OUTPUT/备用任务文件，清楚标注“未落入目标仓”。其余仓继续。
- 本公共研究目录下只需一个简短 SIX_REPO_HANDOFFS.md：六仓目标分支、确切任务链接、已有 runner、优先加固/新建的实际对象、Codex 结束时的数量汇报位置与是否需要独立审批/真实权限。可引用已有历史 271 条源，不制造另一份无意义的大型状态数据库。
- 每创建任务后通过 GitHub 重新读取，核实完整正文、路径与当前提交；直接给用户可点击链接，不给手抄路径、不把本地云电脑文件冒充 GitHub 已保存。
- 如需独立 Critic，用**一份六仓协调审查入口**逐仓检查关键实施范围、当前源码、权限、历史反例和未来 DA 适配，而不是要求用户依次启动六项新架构研究；每仓仍有独立审核结论，不能一个仓 PASS 掩盖另五仓缺口。
- 最终用简短自然中文交付六个链接，指出哪些任务可立即沿已获权入口使用，哪些真正有权限/任务冲突；**不提前编造实际新增验收器数量或虚称七仓已经建立通用系统**。

**你这次结束的标准，是六份可以直接交 Codex 的真实实施任务均在 GitHub 保存并可回读，而不是完成了一份“如何未来研究六仓验收”的建议。**

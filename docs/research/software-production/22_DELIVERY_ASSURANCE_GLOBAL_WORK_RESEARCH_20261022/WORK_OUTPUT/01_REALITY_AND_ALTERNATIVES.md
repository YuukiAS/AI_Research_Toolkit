# 现实能力与架构选择

本轮核对支持一个方向：把交付保障接入已有任务入口和项目验收程序，补齐“这次该验什么、证据属于谁、失败交给谁”的连接。现有材料尚不能支持“安装后所有普通 Codex 对话都得到强制保障”。本轮已通过补查选择D1的混合入口、03 D4的有界同任务恢复，并保留原生聊天绝对拦截的不可达边界。

本文件已按七仓源码与后续反证修订，仍为待独立审查的研究候选。不是独立审查结论，不授权实施。

## 1. 用户实际经历的任务

用户说“增加真实用量显示，同时保持原来的配额功能”。系统应在第一次修改前保存用户原意、已有正式标准、所用分支与最终要运行的应用，发现共享数据层会影响旧配额，选择现有检查。明确标准已有而程序没有时，当前执行者收到补检查的具体工作项；标准不明确时只把不能推导的决策交回专业负责人。实现与检查分别产生证据，用户实际运行的 EXE 也必须属于被检查的候选。失败内容回到原任务，预算与中断规则仍由原执行入口掌管。最后报告新增功能、旧能力保护、验收器变化和未证实范围。

这条链中，测试结果只是中间输入。源码、安装包、运行实例、观察对象和用户声明必须连在一起；任何一跳缺失都不能被一个绿色总状态代替。

## 2. 本次固定的来源版本

读取时间：2026-10-21 UTC（用户所在时区为 2026-10-22）。以下均通过 GitHub 实际取得目录树/文件；固定提交避免研究中漂移。

| 来源 | 固定提交 | 事实边界 |
|---|---|---|
| 研究输入分支 | f1426b6322870c7a9d42d83ff6ea7ad8a35837a3 | 此次写入探针首提交的 parent；历史设计只作待审输入 |
| AI_Skills_Collection main | f1de8e85957d32a50f4458349f450ec65add13bb | Planner/Critic 1.7、Capability Gate 1.2、维护看板 |
| Bridge release | ba9013b9fbbd242e51b09f9d09291f417df17652 | 正式发布来源；GitHub Releases API 返回空列表，不用该列表替代 release 分支 |
| Bridge main | bc94e41f44bd5b534d8ab8caa304114b8bf90685 | 与 release 不同，不能默认 main 更接近用户正在使用的实现 |
| Bridge 当前产品开发分支 | work/bridge-core--product-scope-reset @ 7f43e146eed50d290ef9cc6ab912d106f754042c | 已核对launch/route/transition等关键链，不能继承发布证明 |
| Lucerna main | 79dd2875d3da33c6a6d80e5e35bea812b84c1ceb | 桌面最终对象仍需获权运行验证 |
| Bobbio main / develop | e7d929bad2d4b23939c81920e77390efbce42b96 / a64edfd6c5b11f81599bfcfc327be5964633a7b5 | main 里程碑仍写 0.2.0，开发目标需单独绑定 |
| Mica main | 7059c0dc24b908b57bd0e1f475142ba4f4520621 | fixture E2E 不代表真实 ChatGPT 加载 |
| SeminarArc main | 5652fe17ce60625f3ff7c758fcc0183f920189de | 黑盒脚本存在，真机硬件能力未在本轮执行 |
| Asteria main | 193c033659a7612a99442763077217b130e9b756 | 固定部署版本需单独证明 |
| CUHK_Date main | 9f25c7754d3c80d0be74f5b71016320f55753ae6 | 正式发布授权不由 staging 验收产生 |
| CARE main | 75a40e454de43b64e59a0b0b438ff57ef2bb8345 | v3 develop 只有明确绑定任务才有效 |
| CAT-TRACE main | 0d829fb17c458a076a15ec51893e917960107c21 | 参考解释方式，不移植统计方法为交付算法 |

引用形式统一为 `仓库@上述SHA:path#函数或行`；07的来源索引及02–04给直接固定链接。

## 3. 已有代码与当前断点

| 已读取入口 | 已有机制 | 尚不能据此成立的声明 |
|---|---|---|
| Bridge `ai_bridge_kit/cli.py:run_lite_task`，L657–745 | `preflight_lite_task` 读取已存在 task，组装来源后启动一次 `codex exec`；退出通知明确不等于语义完成 | 不接收任意原生对话；没有自动发现缺验收器并完整消费结果的生产调用 |
| `reviewed_runner.py:watcher_once` L992 起、`run_codex_event` L798 起 | 校验工作流、按 event identity 启动执行者、检查权限与进展、发布；`executor_prompt` 明确读取旧 REVIEW 文件 | watcher 存在不等于当前机器已启动；代码返回 `thread_id=None`，同逻辑任务不等于同一个 App 对话 |
| `agent_flow.py` L2395–2505 | 按当前状态和 findings 路由 Executor/Verifier/合同审查/最终 Critic | 返回 next_action 本身不证明有人执行；必须核对项目 controller 消费者 |
| `persistent_run.py:start_persistent_run` | 已有终端进程存活管理；progress 和真实 child exit 分开 | 不拥有产品完成标准，不能再加 DA 调度器代替它 |
| Lucerna `development-acceptance.ps1` | 候选 admission、未跟踪语义文件检查、同次截图/PID绑定及已知坏例自测 | 不能用脚本自测代替当前 EXE 的用户行为 |
| Bobbio `Invoke-BobbioReaderAcceptanceSafe.ps1`、当前里程碑 | 正式隔离 Zotero 验收入口已存在 | main 的 0.2.0 报告不能替 develop 的 0.3.0 目标背书 |
| SeminarArc `run-blackbox-acceptance.ps1` | 选择模拟器、构建/安装 APK、UI操作与证据采集 | 存在保存按钮/截图不等于重启后数据持久化 |
| Mica `run-e2e.mjs` L45、L145起 | headless Chromium，访问本地 fixture，多种输入/复制/热路径回归 | 真实登录页面、扩展加载身份、低功耗设备进程开销未由 fixture 证明 |

AI_Skills 已读生产树中未定位到 `delivery_assurance` / `da1` / resolver 同名运行实现；这是本轮检索结果，不能推出没有任何相似能力。旧实施包自身标明尚无 Codex 实施授权。不得把设计中的字段、函数或审查意见改称生产代码。

## 4. 原生入口的可实现边界

OpenAI 官方资料确认当前有 UserPromptSubmit 和 Stop 生命周期接口；前者可传入用户请求并注入上下文，后者可要求当前会话继续。技能发现仍由模型选择，插件安装也不自动信任 Hook。[Hooks](https://learn.chatgpt.com/docs/hooks)、[插件打包](https://developers.openai.com/plugins/build/plugins)、[Skills](https://developers.openai.com/plugins/concepts/skills)。

因此，日常低摩擦方案可以设计为一次接入并信任当前 Hook 后，由用户照常发消息。但本轮没有运行 Windows Desktop、远端 App、CLI 新版本或 cloud 的实际探针，不能承诺它们等价。Hook 禁用、未信任、超时或程序未启动时，Hook 自己无法可靠证明自己“缺席”，更不能保证改写已发出的助手完成话语。独立发布/交付入口必须再次检查证据；没有该入口且 Hook 完全缺席的原生聊天存在已获用户接受的平台文字限制；受管交付仍必须拒绝缺证结果，G1 不再是待用户决定项。

已有 Phase 1 `attempt_2/FINAL_RESULT.md` 的事实是：CLI 0.160.1 的 Stop 主链场景有成功观察，整个试验仍为 NO_GO，因为前置运行违反清洁执行边界。既不能抹掉机械可行性，也不能把该试验当正式可接入许可。P10/P11 注入时缺少事件，只证明没有伪造 DA PASS，不能证明平台阻断了所有假完成。

GitHub 必需状态检查接受的结果可能包含 skipped/neutral；因此发布消费方必须核对必需检查的实际执行与结果内容，不能只看绿色 UI。[GitHub 状态检查](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks)。

## 5. 三条候选路线

| 路线 | 用户操作与真实调用 | 能解决什么 | 主要代价与否决点 |
|---|---|---|---|
| A 只加固每个项目与 Bridge | 在各项目正式入口分别加选测、证据与结果校验 | 最少中央依赖；成熟黑盒/科学工具直接工作 | 七仓分别重复需求与证据失效规则；普通对话仍可能绕过入口；维护漂移较大 |
| B 小型共享交付判定 + 原入口执行 | 同一任务内生成验收义务；Bridge只绑定身份和递送；项目运行专业检查；公共纯函数判定可声明范围 | 共享的是关联/失效/结果消费，不接管领域或调度；能补“已有检查没人调用” | 增加一套窄接口及跨仓兼容成本；普通原生入口必须先证明；不能靠配置完备性假设保护未知旧功能 |
| C 成熟工具或外部编排平台 | 复用 pytest/Playwright/Android instrumentation/项目黑盒与现有CI；另可考虑独立工作流引擎 | 专业运行与重试工具成熟 | 全面迁移新调度器增加账号、持久状态、运维与多主风险；仍不能自动解决需求/标准真值、安装身份和原生聊天触发 |

唯一推荐 B，并把 C 的专业运行器作为可替换依赖；不引入第二个中央 daemon、任务数据库或统一评分器。A 作为净收益不足时的退出路线必须保留。推荐不是因为 v0.5 已写成文档，而是已有各仓运行器和 Bridge 任务权威可以承担执行，只缺少可消费的义务与证据连接。B不包装成全平台自动；D1明确哪些正常原入口可改善、哪些交付结论可强制拒绝、哪些文字承诺不可达。独立审查应评判这个明确选择，不能替Planner另选入口。

## 6. 后续必须攻破的反例

1. 模型完全不调用 Skill；空 adapter；已有旧功能未登记。
2. 产品与阈值一起改松；固定 680；假截图或错误 PID；程序未运行却写 PASS。
3. Stop 未获信任/已失效；用户中断；预算耗尽；Reviewer 回来后没有活执行者。
4. 中央新载荷未被消费者加载；Web/API/模型/数据混版本；将合法科学负结论当实现失败。
5. 小文档修改触发重型设备测试；所有检查存在但无人阅读完整成品。

这些反例将落实为调用点、观察和失败消费者，不以“已覆盖”关闭。

## 七仓源码反证后的修订（本文件继续作为现实能力的唯一权威）

本轮只读取 GitHub 文本源码、规则和历史结果，没有运行产品、浏览器账号、桌面、设备、GPU 或发布。下面的“历史结果”不是本轮复测；源码能证明调用存在，不能证明现在的设备、账户和最终安装对象已经通过。

- **Bridge 实际开发分支也已读取**：`work/bridge-core--product-scope-reset@7f43e146eed50d290ef9cc6ab912d106f754042c`。它的 `cli.py::run_lite_task` 仍是一次启动；`agent_flow.py::launch_executor_with_preflight` 在 492–519 行绑定源后调用 `adapter.launch_role(request)`；`route_findings` 在 1134–1167 行明确区分 Executor、Verifier、Controller、Planner 与用户。路线名仍能指向一个执行角色，但 **路由字典本身不等于有持续运行的 Controller**。实现包必须在所选真实 runtime adapter 上证明消费闭环。开发分支的 AGENTS 明确不恢复 app-server reader、事件总线或自动工作树交换。本方案不复活它们。
- **Bobbio 两条真实权威**：main `e7d929b` 的 0.2 基线与 develop `a64edfd6c5b11f81599bfcfc327be5964633a7b5` 的 0.3 不能混签。develop 的 `docs/CURRENT_MILESTONE.md` 明确本地就绪与外部产品审查、最终隔离 Zotero 集成、用户可验收分层；0.3 尚未成为 main 的接受结论。拟接入 0.3 时采用该 develop 合同，不能擅自切分支。
- **Mica 必须再区分 main 与重构分支**：`codex/mica-product-system-rebuild@0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c` 已读取 AGENTS、package、acceptance CLI/validator 和低内存候选报告。main 中 10 月 5 日 Goal 已标 SUPERSEDED；当前标准是 `docs/product/MICA_PRODUCT_SYSTEM_V1.md` 与 10 月 12 日 Goal。优先级是 Foundation→Low Memory→Highlighter→PDF；高级 Reliability 与 Notion 延后，不能因历史登记把它们重新塞进当前交付。重构分支已有 `acceptance:preflight/focused/candidate`，应复用。
- **Mica 历史性能结果不能简写“内存下降”**：报告绑定的是 runtime `57fa880`，不是当前重构 HEAD；其 A/B/C 表中 C 的 process private memory 比 B 增加约 1.67%，JS heap 下降 93.75%。证据明确为 `TARGET_CLASS_ENVIRONMENT`，不是物理低内存设备；独立表面审查与最终登录态验收仍未成立。该允许的目标类替代来自 Mica 冻结合同，不能推广为所有项目可自由降级。
- **Asteria 当前量测缺陷已从源码确认**：`scripts/validate-architecture-rc19.mjs::routeGestalt` 第 38–49 行把 crossing 和 floating-label 指标设为 0，并对缺 ratio 使用 0；这不能证明真实零碰撞。RC11 历史报告还记录自动回归已过而整屏箭头明显失败。因此需要校准量测、实际 DOM/SVG 独立观测和完整读图，不能新增一个“总评分”掩盖它。此结论不等于宣称当前整个产品坏了。
- **SeminarArc 的验收程序也会错**：`0.5.x_real_world_media_corpus_round_02_result.md` 明确撤销 OCR 0/5 产品结论：旧选择器读错控件；历史修复后报告 9/9 照片流程和全量重启持久化。外部录音只是盘点，产品没有导入入口，未冒充导入通过。本轮不读取私有素材，不重演设备。
- **CARE 同时存在验收器 PASS 与科学否定**：batch7 `validator_status.json` 表示材料/坏例检查通过；`training_stage_adequacy.json` 的 600 optimizer steps、help 25/harm 27 和 continuation FAIL 是科学路线返回 Planner 的证据。finalizer 的最后状态是送审包就绪，不能升为科学成功。当前 `GPT_PLANNER_CARE_PROTOCOL.md` 默认 Controller 协调、planning critic/reviewer 关闭，只有具体任务显式开启；不得把通用 Control 强塞给 CARE。
- **CARE 最新状态页也不是本轮授权**：main 的 `prompts/routes/handoffs/CURRENT.md` 记录 Attempt3 单层输入修复 archive、未发送组织方邮件，以及另一 R2 v9 训练前外部审阅等待。它不能授权本研究训练、上传、开控制器，历史 route A/B/C 不恢复。
- **CUHK_Date 已有事务修复**：`handleAuditTicketSession` 读取 claim，认证与产品预期状态成功后 finalize，失败 release；修复报告有历史 canary。接入应补失败消息与同一 campaign 消费绑定，不再实现一个票据系统。响应丢失/重试的端到端当前性仍须合法实测。
- **Mathpix 680 只保留为需求给定的对抗样例**：本轮读取 Lucerna 当前 Rust 源未找到 Mathpix 实现；`lib.rs` 出现的 680 是窗口初始高度，不能误报为硬编码余额缺陷。旧 Codex quota 的真实 `Option<f64>`、fresh/stale/unavailable 与共享 refresh 链才是本轮可核验的现有基础。

固定版本源码链接按 `https://github.com/YuukiAS/<仓库>/blob/<上述完整SHA>/<路径>` 构成；七仓逐条可点击锚点见 04，公共调用锚点见 02/03。其余 main SHA 保持本文件前表。

## 平台事实的严格含义

[Codex 官方 Hooks](https://learn.chatgpt.com/docs/hooks) 描述 UserPromptSubmit、Stop 与 Interrupt。可利用提交事件传入上下文、Stop 的阻止结果请求续修，并须尊重中断；非受管 Hook 的信任与定义变更必须真实确认。**文档没有赋予外部研究一套不依赖 Hook 的原生完成抑制权。** Hook 不运行时，不能靠它自己报告失效。此前 Phase1 整体 NO_GO 不因局部主链成功而消失。Windows App、CLI、Remote 各自版本与信任边界必须单独通过真实入口试点。

[GitHub required checks](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks) 的状态准入与“必需检查实际执行且证明目标”不同；成功、跳过或中性状态不能单独充当产品证据。研究分支写入成功也不证明任何生产分支有强制合并门槛。

## 扩展的替代路线裁决

A 可细分为仅修项目脚本，以及 Bridge 最窄启动/交付边界扩展；后者能强制受管启动，但不自然拦住所有原生聊天。Skills-only 成本最低，适合解释与生成补验收任务，不能承担确定性准入。独立常驻产品可以拥有自己入口，却要求用户迁移日常入口，增加状态、凭据和维护面，目前没有净收益证据，拒绝选用。成熟执行工具采用各仓现有 Playwright、PowerShell、Android/Room、pytest/Slurm finalizer；它们解决运行与观察，不替代标准和来源审查。因此推荐 B 的小型义务/证据库 + A 的实际入口消费 + C 的现有专业运行器。

**G1的最终研究裁决见下节D1**：无事件、无交付边界的原生文字拦截存在接口不可达性，不再留作实施者的技术待办。用户已接受该混合路线与有限文字边界；不改变日常输入，不开发新客户端。该选择不提供实施授权。

## 最后交叉核对的修订

Bobbio develop的[真实API源码](https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/src-tauri/src/zotero_client.rs#L242)已直接核对：read_attachment_annotations 242行、authorize_local_writes 407行、mutate_attachment_annotation 526行；写路径检查server identity、写能力和授权，不能从main推定。CUHK的campaign合同明确换部署snapshot须关闭旧Parent，本研究的“同任务”指产品目标/预算/问题lineage连续，不能复用过期活动。G6补充旧da/1必填或语义变更必须重新Planner/Critic冻结，03示例不是兼容声明。详见04补充边界及06 R1-AR05：宿主探针现已前置于完整P1/P2，后续各阶段再验证对应实现。

## 续研裁决 D1：接入负责续修，交付边界负责准入

**用户后续决策（2026-10-22）：已明确接受本节推荐的有界混合架构。** 支持且实际接入的正常 Codex 入口应自动触发，原受管交付出口必须真正核验；在 Hook 完全缺失时不能保证禁止聊天已生成的错误“完成”文字。用户不接受另建 Codex 客户端，核心成功指标仍是减少提醒验收、发现假完成、转发失败与重复催修。这是产品范围决定，不是宿主实测、交付免验收或实施授权；本节后续出现的假设式“若用户要求绝对...”只解释已经放弃的替代路线，不能要求用户再次作同一选择。


本节取代上文“G1 留给实施前决定”的表述。研究恢复基线为 `b6ca488fd93ca5b6a7dacb901aa34a123f1540f1`；通用标准取自 main 的 [COMPLEX_SYSTEM_DESIGN_GUIDE.md](https://github.com/YuukiAS/AI_Research_Toolkit/blob/f4a1233d59817867bc4c40b541f480695d947440/COMPLEX_SYSTEM_DESIGN_GUIDE.md)。这是一项确定的设计选择，尚未实施，也不声称已经消除平台限制。

**推荐组合：已有入口接入＋项目交付边界二次核验。** 普通原生任务默认通过已信任 UserPromptSubmit 建立轻量任务关联，PreToolUse 约束明确的高影响动作，PostToolUse 记录实际变更，Stop 给同一回合送回具体返修输入。已有 Lite/Review/Control 入口直接调用相同库。正式安装、交付包登记、送审、部署与科学结果声明的现有入口独立读取核验结论；缺文件、解析失败、身份不匹配或必需义务 UNKNOWN 时，这些入口不得报就绪。接入与交付都复用现有进程，不增加守护进程。

|备选|实际能力|选择|
|---|---|---|
|只靠技能或提示词|模型可能漏调用，不能证明检查真的发生|淘汰为保障边界；只保留解释和语义提取用途|
|只靠项目信任 Hook|正常事件可接入和续修；禁用、失效、未信任时没有硬保障|保留为最低日常摩擦的接入层，不单独签发交付结论|
|Host 受管 Hook|受管目录与策略可减少被用户禁用；仍有进程失败、超时和平台事件缺失|企业/受管主机可选一次性强化；不要求普通用户先获得管理员或组织权限|
|所有任务换成新的受管客户端|可控制自己展示的最终消息、在缺证时不显示“完成”；必须拥有会话与 UI|不新增客户端；这是改变原入口的产品取舍，不能冒充普通 Desktop 原生聊天|
|只在发布时检查|可拒绝坏产物进入受管交付，但反馈太晚，也覆盖不了只在本机使用的功能|保留为独立末端边界，前移到“提交给用户验收/安装候选”而非仅公开发布|
|推荐混合|日常原入口正常接入，同回合优先返修，末端核验失效时拒绝交付|选定；能力范围如下，绝不等价于任意原生聊天强制不说错话|

### 为什么不能保证任意原生聊天绝不假报完成

官方源代码固定在 [openai/codex@2a77e82](https://github.com/openai/codex/tree/2a77e82f09212c9e1bbf02656afca5d8172c5f9e)。[Stop 分派](https://github.com/openai/codex/blob/2a77e82f09212c9e1bbf02656afca5d8172c5f9e/codex-rs/hooks/src/events/stop.rs#L110) 在没有匹配 Hook 时返回不阻止；L251–364 对错误、无效 JSON、非预期退出记录 Failed，并不自动产生 block。[回合消费](https://github.com/openai/codex/blob/2a77e82f09212c9e1bbf02656afca5d8172c5f9e/codex-rs/core/src/session/turn.rs#L723) 在模型已产生消息后调用 Stop，L742–759 将有理由的 block 变成续修输入；L764 明确忽略没有 prompt 的 block。它不是撤回或过滤用户已见文字的机制。[官方安全说明](https://learn.chatgpt.com/docs/enterprise/security-cookbook)也把 Hook 与强制安全边界分开。

因此，在“没有插件事件也没有经过项目交付入口”的两次原生会话中，插件能看到完全相同的空事件集；一次模型正确，一次错误报完成。任何只观察这些事件的插件都无法区分或拦截第二次。这是接口不可达性，不是再写一个检测脚本可以修复的问题。公开 main 的源码也不证明当前 Windows Desktop、远端或 cloud 已部署同版本。

**承诺保持原样登记，不偷减。** 用户原要求包含普通原生任务。推荐设计能改善受支持原生入口的实际工作，能硬拒绝受管交付结论；不能兑现“任意宿主、Hook 缺席时仍强制阻止聊天假完成”。此项是用户已接受的平台文字边界，不是待决问题或实测 PASS。发送前强制门不在本次插件可控范围，新客户端已明确排除；受管交付的真实验收与原任务返修要求保留。

### 实际触发与用户成本

接入安装时完成一次平台版本、可信来源和事件回放检查；不修改用户信任、主机策略或开新任务来绕过失败。正常使用仍输入普通请求。Hook只做本地短时身份/dirty标记、缓存摘要查询与已备结果检查；完整入口提取、义务编译和选测由当前工具回合或原launcher调用，不把全仓扫描塞进Hook时限；不启动设备测试或额外模型；长测试由当前 Executor 按原授权执行。Stop 返回包含义务、actual/expected、证据位置与合法下一步的短理由，同一 session 的下一次模型采样接收；没有有效返修输入时不得空 block 循环。预算和重入防护见 03 的 D4。

交付入口每次独立核验，缓存必须绑定候选和依赖；Hook 无收据不自动等于产品坏，但缺少完整义务集就不能签发就绪。现有任务包可由交付入口重建义务并要求补验；无包任务可从同 session 的原请求建立轻量记录。没有请求来源时只能要求恢复原任务上下文，不能编造完成标准。

**实测合同已确定：** 在获授权的同一宿主、同一受支持版本，顺序回放正常 Hook、未信任、禁用、超时、畸形输出、空理由、同任务续修和用户中断；每例使用无外部副作用的坏候选。检查两份独立结果：聊天是否发出误导文本、受管交付是否拒绝。前者失败不得用后者成功抵销。具体八组场景、回合数和时限已由06 R1-AR05统一替换；不使用账号、设备或付费资源。未满足的平台登记为未支持自动接入，保留手动原任务调用同一检查的低摩擦替代，不声称替代等价。

## 最终来源漂移核对

续研期间研究仓main从70812bd前进到 `f4a1233d59817867bc4c40b541f480695d947440`。已完整回读其最新COMPLEX_SYSTEM_DESIGN_GUIDE.md（blob c3cfe3b8afcee108df90ce9f1bcce3650bee0c3a）及新增[可信解释标准](https://github.com/YuukiAS/AI_Research_Toolkit/blob/f4a1233d59817867bc4c40b541f480695d947440/COMPLEX_ARCHITECTURE_EXPLANATION_STANDARD.md)。新版强调风险匹配质量属性、成熟外部能力的许可/维护、真实负结果、成本、明确用户选择及不移动完成终点；02–06已经按这些原则核对。它没有授权实施或自动发送前拦截。

前轮候选收尾时，AI Skills main、Bridge release/实际dev和七仓有效分支与当时记录一致；本轮当前版本以本文件末尾R1刷新记录为准。官方Codex源码只作为接口/机制依据，Apache-2.0许可已读；没有移植或安装其代码，也不保证当前Desktop部署同版本。采用已有项目工具，不新增外部编排依赖。Python标准库排他创建标志支持Unix/Windows的文档已核对，具体OS崩溃/取消/文件替换性质仍需运行测试。[Python os](https://docs.python.org/3/library/os.html#os.open)

## 最终闭合：宿主、信任与两道门的支持矩阵

用户三项边界已确认，本表不再制造待决产品选择。表中的“已证实”仅指本研究真正取得的源码/历史材料；**没有任何宿主完成本轮新DA正常入口实测**。安装了插件、Hook定义存在、源代码支持事件都不等于当前宿主已启用。

|实际入口|已实际证实的事实|基于源码确定、尚未实测的新增接线|不支持／未知与最小验证|
|---|---|---|---|
|Windows Desktop普通无Goal消息|官方源码UserPromptSubmit含session/turn/cwd/prompt；本地Desktop安装版本/Hook信任未探测|一次获权接入安装精确Bridge/core；同步UserPromptSubmit保存原文并注入；Stop非空block请求当前会话续修；各项目交付gate独立工作|当前自动保障UNKNOWN。8例：正常、未信任、禁用、超时、坏JSON、空reason、同session返修、取消；分别观察聊天和交付。Windows commandWindows指向安装时解析的解释器与脚本，不假设/usr/bin/python|
|CLI原生交互与exec|历史CLI0.160.1曾观察Stop主链，但整轮NO_GO；官方JSONL thread.started/resume源码可定位|同原生Hook；受管Lite父进程额外提供精确thread resume与最终check|历史机械观察不作为当前准入。安装版本能力探针＋同8例；resume前后id/写范围/权限/预算不变；无id禁止--last回退|
|Remote SSH Codex|公开同核源码只能说明潜在能力；未访问远端真实CODEX_HOME或安装版本|事件处理与证据存在实际执行host；本地Desktop只是界面；原远端Bridge父进程消费，断线不造本地代替owner|未知。以后只在获权exact host/项目按真实SSH config读取版本并运行同8例；本地信任/文件收据不能替远端。不开新连接/任务证明本轮研究|
|Bridge Lite|release run_lite_task L657–745当前只一次subprocess，退出不等完成|函数内run_delivery_cycle读JSONL，按同任务budget精确resume；preflight→Admission→最终Claim→原通知|新增尚未实现；以无外部效果坏候选证明退出0被拒、一次真实同thread修复、取消后不重启。不开新任务补失败|
|Bridge Review|release run_codex_event/watcher_once已有事件与CURRENT消费；thread_id现为None|event内用同cycle；外部fresh REVISE由原watcher消费；发布前核材料claim|watcher已启动与否未知；一组watcher运行/未运行、stale/fresh review对照。未运行只保存原task恢复点，不宣称自动收到外部决定|
|Bridge Control|dev RuntimeAdapter为抽象；route/transition CLI只输出选择|确定CodexExecRuntimeAdapter＋Executor/Verifier各自preflight＋当前已授权Controller调用一次性step|没有合法角色环境或活Controller就等待原流程；不得新建daemon/新任务填空。最小两角色机械回执、一次Verifier修复、一次外部等待，不擅启Planner/Critic|
|GPT Work／其它Cloud入口|官方资料明确cloud-orchestrated Work的Hook handler能力不同；本研究没有获得等价当前回合/本地命令Hook证明|原Parent若能合法调用项目既有runner/API，就显式消费同一结果与交付门；不套用Desktop command Hook|自动原生接入未支持；不开发新客户端。只可用现有原任务显式检查作较高摩擦替代，并明确少了哪条自动箭头。没有工具消费者时该宿主不能标DA已接入|

新增Hook定义必须同步执行（不设async）；只发短locator/digest/下一动作，不把整份合同塞进Hook输出。当前模型经正式工具按locator读取全文并交coverage，读不到就缺证；官方输出可能spill/截断，因此“Hook已发上下文”不能证明全部标准已加载。session_id在subagent事件中可能是父session，需同时校验agent_id/turn；未获权子角色不继承主task写权。permission_mode仅环境事实，不是新授权。

采用状态：OpenAI公开源码与文档为REFERENCE_ONLY，不复制/部署客户端；Python标准库只用于拟实现的本地绑定/锁；项目现有专业runner是后续复用对象。官方源码从2a77e82到当前 `b4ad33d1a3c10c9652dd57f7afd7a949f8f26895` 的两个提交已比较，原Hook/turn/exec引用文件未改。新增读取的 [UserPromptSubmit](https://github.com/openai/codex/blob/b4ad33d1a3c10c9652dd57f7afd7a949f8f26895/codex-rs/hooks/src/events/user_prompt_submit.rs#L24)给出真实字段；[官方Hooks](https://learn.chatgpt.com/docs/hooks)说明commandWindows、异步限制与输出spill；[安全说明](https://learn.chatgpt.com/docs/enterprise/security-cookbook)说明工具匹配和cloud差异。平台版本升级或信任定义变化使该host支持收据失效，重跑对应小型入口检查，不自动重复七仓昂贵产品实测。

接入一次性成本是安装/核实精确载荷、信任当前定义和宿主机制回放，后续用户正常发话；不是每次重新@插件。采用项目/插件可信Hook而不强制管理员受管Hook，降低首次摩擦；已有企业策略可复用，但研究不要求改其策略。缺Hook仍须原项目正式交付gate工作；正式出口未绑定的项目只可报尚未接入，不能用边界声明假签产品。

最新研究main为 `daf797c79bcd777c27948da51c4218e5d95e7be3`；设计指南未改，解释标准新增关键技术替代比较与连续修订完整判断，已读并应用。源码、当前安装版本、宿主实测在本表明确分开。

<a id="r1-reality"></a>
## R1源码与已被R2修订的决定（历史追溯）

本轮以369b4ae4a534a7d87be11a36e7c4b3ca9114e0c7为被审包；Critic REVISE来自用户当前消息。五项均ACCEPT，上一包“核心设计全部闭合”的断言已撤回。其中01/04选择已被文末R2及03#r2-ar01、04#r2-ar04替换；02/03/05保持R2关闭。以下保留来源历史，不是另一份实施路线。

|问题|比较过的可行做法|本轮唯一选择及现实依据|
|---|---|---|
|原请求误解|当前Executor自审；所有任务另开审查agent；按风险使用已有角色|最后一种。Bridge Review原本在PLAN_REQUESTED由GPT Planner冻结，再启动Executor；可在该边界消费独立原要求结果。当前watcher并没有凭空存在的事前Reviewer。CARE默认不启Reviewer，沿科学Planner/Controller，不能通用强加|
|候选检查自签|registry标签；每次人工批准；冻结机械自动准入＋必要独立准入|最后一种。新增DefinitionAdmission及实际activate/check消费，校准与RequestedClaim分离；简单已冻结机械回归无需额外模型，重要专业观察必须独立|
|低配实现|只在最终发现；一律加载前端；按义务选择实际成熟能力|最后一种。SeminarArc AGENTS明确android-lead/compose-expert；Bobbio明确Figma设计体系；这些项目能力可满足等价要求，不按Plugin名字强制替换|
|最终消费者|角色名称；新中央汇报平台；原脚本内明确最终分支|最后一种。Lucerna原campaign仍主要Producer材料；Mica candidate只validateBundle；SeminarArc明确未执行GPT Work；CUHK活动准备门会检查未消费票据；CARE finalizer止于packet。均须独立最终分支，不能改词就算接通|
|平台不确定性|先全量实现；纯模拟；真实宿主小探针先行|最后一种。源码有Hook/JSONL/resume不代表实际Desktop/Remote可用；P0不得运行七仓产品，失败按06固定矩阵修订P2后才投入公共层|

最新读取：研究main **daf797c79bcd777c27948da51c4218e5d95e7be3**；两份系统设计/可信解释标准已读取。AI Skills main **ca10623fe028114cfafc5ec7e5350800d5c8259c**；当前Planner/Critic 1.7、Capability Gate 1.2和Maintenance合同已重新取回。相较前包只新增/调整PIE提案与审查提示：DA受管AGENTS修改如原合同要求三份证据，PIE仍应供给，不可按普通小编辑免除；尚未发布能力不当依赖。

Bridge release仍 **ba9013b9fbbd242e51b09f9d09291f417df17652**，实际dev已到 **b3a435eb193bcba251b343d2dd5dd3ef580587ed**。相较71ad687只新增正常入口验收v0.2提案；本轮重新读取cli/reviewed_runner/reviewed_handoff/agent_flow/readiness与release入口，相关代码没有因提案出现就实现DA。该相邻提案不转移Persistent、通知或Host权限职责给DA。

七仓固定SHA仍为04/07原表，分别查询实际有效分支及递归树并读取AGENTS与最终出口原文。新细节包括：CUHK脚本L106加载凭据、L130起做live查询，故最终分支必须在这些动作前分流；Bobbio USER_REVIEW_READY与MILESTONE_ACCEPTED不能合并；CARE默认无review.md不是缺陷；Mica当前真实登录态仍为手动验收。研究仓目标分支根AGENTS.md查询404，本轮遵循用户提供的AGENTS与正式研究合同，不伪称读到了该文件。

官方Hook、非交互执行、AGENTS文档于本轮重新浏览；b4ad33d1固定Stop/turn/exec源码重新取回。H1–H8是待授权的实际证据合同，当前Windows Desktop、CLI、Remote都**NOT_TESTED**；没有把公开源码或旧0.160.1局部结果改写为当前支持。正常会话中断、只读到获权写入的精确resume、实际指令重新加载都必须先证明。GPT Work没有本轮等价入口证据，保留未支持说明。

维护/成本选择同步改变：先4–8小时P0，再按支持矩阵选择原P2路线；R1总估算130–316小时，首片36–80小时，均非授权或实测。若高风险入口没有合法支持，不能先实现整个da/2等待平台补齐，也不能新造客户端。原用户目标与质量门槛不降低；只能明确该入口未支持，并使用已有、已证明的受管入口作为有损替代。

### R1 冻结前最后一次 Bridge 刷新

实际开发分支在本轮核对期间前进到 **f7caede593ea90f1a8f38fe33a7bcbc1dae3f94f**。相对 b3a435eb193bcba251b343d2dd5dd3ef580587ed 只有一项新增：[正常入口能力验收提案 v0.3](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/f7caede593ea90f1a8f38fe33a7bcbc1dae3f94f/docs/design/0.11.1_normal_entry_capability_acceptance_proposal_v0.3_2026-10-22.md)。生产代码、release与七仓固定源未因此改变；上文b3a435e链接继续准确，不冒称其为最新开发HEAD。

v0.3把特定未来Persistent验收的六次通知上限落实到原run binding：helper启动前持久占位、终止保留一席、失败/未知不返还、Notifier核permit并禁止未经新授权重试。它仍待独立审查、不是现行实现或本研究权限。DA不接管通知、不另领SMTP/模型额度，也不把进度邮件当产品完成；共享返修预算不能重置既有通知授权。P0默认无通知/外部服务，当前研究未发任何消息或启动Persistent。AI Skills main仍ca10623f，研究main仍daf797c7。

<a id="r2-reality"></a>
## R2：必须区分“角色文件存在”和“角色真的运行”

本轮独立Critic仅保留DA-AR-01、DA-AR-04，均ACCEPT；02/03/05设计关闭并保留。R2原文来自用户转交，无GitHub审查文件。研究分支原HEAD为9eacd550，实际写入探针见CURRENT历史ab3bb28d。

最新AI Skills main仍ca10623fe028114cfafc5ec7e5350800d5c8259c，AGENTS、四份角色/治理合同重新读取且blob未变；研究main两份通用标准仍daf797c7。Bridge release仍ba9013b9，开发分支已到 **0de62cb7b6e98c4d12ae3f68bbe40b59588473eb**，相对上轮f7caede仅新增正常入口执行包文档，未改生产代码。那些包的授权不属于DA，未执行其中任何命令。

|重新核实的源码/合同|实际事实|本轮设计影响|
|---|---|---|
|[reviewed_handoff.py](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/0de62cb7b6e98c4d12ae3f68bbe40b59588473eb/ai_bridge_kit/reviewed_handoff.py) init_task/_initialize_task_files|写PLAN_REQUESTED、next_action=RUN_GPT_PLANNER；不发起外部GPT|创建Review文件不得计独立检查已启动|
|[reviewed_runner.py](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/0de62cb7b6e98c4d12ae3f68bbe40b59588473eb/ai_bridge_kit/reviewed_runner.py) watcher_once/eligible_events/run_codex_event|watcher启动Executor；当前返回thread_id=None；没有外部Planner启动器|保留已设计精确resume接线，但不能用它补不存在的Planner调用|
|[现有Scheduled GPT模板](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/0de62cb7b6e98c4d12ae3f68bbe40b59588473eb/templates/reviewed_handoff/prompts/REVIEWER_SCHEDULED_TASK.md)|真实执行面是已有ChatGPT安排任务＋GitHub；有NEEDS_GPT_PLANNER/后置review，没有初始PLAN_REQUESTED处理段|只有实际存在且获权的schedule绑定可接入；在同模板补首轮分支，不能把安装模板当schedule已配置|
|[Control agent_flow.py](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/0de62cb7b6e98c4d12ae3f68bbe40b59588473eb/ai_bridge_kit/agent_flow.py)|RuntimeAdapter.launch_role为抽象；launch_executor_with_preflight目前明确Executor-only|只有已具可运行原角色adapter的环境能自动调用Verifier；不能把抽象接口当运行能力|
|[Text Review README](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/0de62cb7b6e98c4d12ae3f68bbe40b59588473eb/templates/text_review/README.md)|明确为可选evidence producer，不是新GPT角色；外发、密钥、Actions及付费预算都有前置要求|不将Text Review直接升级为Planner审批，不默认启用API或上传原请求|
|[Lucerna独立验收](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/docs/workflows/LUCERNA_INDEPENDENT_RELEASE_ACCEPTANCE.md)|已有本机独立Reviewer/原orchestrator，允许独立Codex上下文；这是角色与运行要求，非现成Python自动启动函数|复用该角色，给出有限事前需求核对调用；本轮明确新增接线及权限条件，不把文档当已运行|
|[SeminarArc AGENTS](https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/AGENTS.md)、[Asteria AGENTS](https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/AGENTS.md)|要求Codex直接写prompts/tasks/&lt;id&gt;_result.md或results/&lt;id&gt;_result.md；Asteria GPT Work默认仍含人工复制/返回动作|新增finalizer函数不足；必须把结果提交接入正常host结束边界。GPT Work人工传递不能说成自动回传|
|[CARE Controller标准](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/CONTROLLER_COORDINATOR_RUNTIME_STANDARD.md)|原Controller监督Executor并写VERIFIED_COMPLETE；科学Planner归属、review_required边界明确|沿原Controller完成提交接check，不新增审查角色，不把job退出或文件存在当完成|

六仓SHA未变。CUHK_Date main前进到 **269fce644563e58afcb131470c68d28969e1532c**；相比9f25c775改SEO canonical/crawl、静态shell补丁和相关文档，未改AGENTS或本研究Parent准备/事务入口。旧9f25c775链接保留为被审历史固定源码；本轮正常出口兼容性核对使用新SHA，不能推断其新部署、Search Console或索引效果已验证。

### 两项问题的路线选择

独立核对比较四种方式：自动创建Review文件（无执行者，拒绝）；把所有任务送新通用agent/API（增加权限/费用且违背既有角色，拒绝）；复用已有且实际可调用的项目Reviewer、Control角色或已配置Review schedule（选定，严格资格检查）；无上述能力时诚实人工恢复（必要边界，不标自动）。简单UI小改如既有样式内的间距/文案纠错不因“UI”二字自动升级Review；新语义/来源/安全/科学选择才按原风险规则独立核对。

完成出口比较：七个历史专用脚本末尾各加finalizer（普通任务可能不经过，撤回）；要求模型每次记得调用（无法约束直接写result，拒绝作为唯一机制）；**Bridge正常host结束边界统一finish_delivery，七仓只提供项目证据/原结果路径映射**（选定）。现有项目runner继续产专业证据，原报告文件可写草稿，但只有正常结束接点校验并接受的提交才构成受管完成。不是七个新后台服务，也不假称能禁止任意进程写文字。

R2调用参数补核：[官方CLI](https://learn.chatgpt.com/docs/developer-commands?surface=cli)提供exec的JSONL、output-schema和read-only沙箱参数；[官方Hooks](https://learn.chatgpt.com/docs/hooks)说明Stop反馈产生continuation，并非撤销原turn。03将实际JSONL终态消息解析与宿主工具隔离资格写明，不能以CLI语法存在推导安装版本/权限已支持。当前阶段没有运行这些命令。

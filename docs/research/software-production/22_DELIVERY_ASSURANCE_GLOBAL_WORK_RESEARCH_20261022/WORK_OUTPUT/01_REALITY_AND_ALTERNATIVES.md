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

因此，日常低摩擦方案可以设计为一次接入并信任当前 Hook 后，由用户照常发消息。但本轮没有运行 Windows Desktop、远端 App、CLI 新版本或 cloud 的实际探针，不能承诺它们等价。Hook 禁用、未信任、超时或程序未启动时，Hook 自己无法可靠证明自己“缺席”，更不能保证改写已发出的助手完成话语。独立发布/交付入口必须再次检查证据；没有该入口的原生聊天保留核心未闭合项 G1。

已有 Phase 1 `attempt_2/FINAL_RESULT.md` 的事实是：CLI 0.160.1 的 Stop 主链场景有成功观察，整个试验仍为 NO_GO，因为前置运行违反清洁执行边界。既不能抹掉机械可行性，也不能把该试验当正式可接入许可。P10/P11 注入时缺少事件，只证明没有伪造 DA PASS，不能证明平台阻断了所有假完成。

GitHub 必需状态检查接受的结果可能包含 skipped/neutral；因此发布消费方必须核对必需检查的实际执行与结果内容，不能只看绿色 UI。[GitHub 状态检查](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks)。

## 5. 三条候选路线

| 路线 | 用户操作与真实调用 | 能解决什么 | 主要代价与否决点 |
|---|---|---|---|
| A 只加固每个项目与 Bridge | 在各项目正式入口分别加选测、证据与结果校验 | 最少中央依赖；成熟黑盒/科学工具直接工作 | 七仓分别重复需求与证据失效规则；普通对话仍可能绕过入口；维护漂移较大 |
| B 小型共享交付判定 + 原入口执行 | 同一任务内生成验收义务；Bridge只绑定身份和递送；项目运行专业检查；公共纯函数判定可声明范围 | 共享的是关联/失效/结果消费，不接管领域或调度；能补“已有检查没人调用” | 增加一套窄接口及跨仓兼容成本；普通原生入口必须先证明；不能靠配置完备性假设保护未知旧功能 |
| C 成熟工具或外部编排平台 | 复用 pytest/Playwright/Android instrumentation/项目黑盒与现有CI；另可考虑独立工作流引擎 | 专业运行与重试工具成熟 | 全面迁移新调度器增加账号、持久状态、运维与多主风险；仍不能自动解决需求/标准真值、安装身份和原生聊天触发 |

初步推荐 B，并把 C 的专业运行器作为可替换依赖；不引入第二个中央 daemon、任务数据库或统一评分器。A 作为净收益不足时的退出路线必须保留。推荐不是因为 v0.5 已写成文档，而是已有各仓运行器和 Bridge 任务权威可以承担执行，只缺少可消费的义务与证据连接。B不包装成全平台自动；D1明确哪些正常原入口可改善、哪些交付结论可强制拒绝、哪些文字承诺不可达。独立审查应评判这个明确选择，不能替Planner另选入口。

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

**G1的最终研究裁决见下节D1**：无事件、无交付边界的原生文字拦截存在接口不可达性，不再留作实施者的技术待办。选定混合路线不改变日常正常输入，但不满足任意原生聊天绝对保障；若改用受管展示入口必须用户明确接受，当前不据此发实施Goal。

## 最后交叉核对的修订

Bobbio develop的[真实API源码](https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/src-tauri/src/zotero_client.rs#L242)已直接核对：read_attachment_annotations 242行、authorize_local_writes 407行、mutate_attachment_annotation 526行；写路径检查server identity、写能力和授权，不能从main推定。CUHK的campaign合同明确换部署snapshot须关闭旧Parent，本研究的“同任务”指产品目标/预算/问题lineage连续，不能复用过期活动。G6补充旧da/1必填或语义变更必须重新Planner/Critic冻结，03示例不是兼容声明。详见04补充边界及06 P0。

## 续研裁决 D1：接入负责续修，交付边界负责准入

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

**承诺保持原样登记，不偷减。** 用户原要求包含普通原生任务。推荐设计能改善受支持原生入口的实际工作，能硬拒绝受管交付结论；不能兑现“任意宿主、Hook 缺席时仍强制阻止聊天假完成”。这个未满足项保留为平台/产品边界，不把它改名成 PASS。若要求绝对拦截原生聊天，必须由平台提供发送前强制门，或用户明确选择受管展示入口；本研究不会擅自替用户选择后者。

### 实际触发与用户成本

接入安装时完成一次平台版本、可信来源和事件回放检查；不修改用户信任、主机策略或开新任务来绕过失败。正常使用仍输入普通请求。Hook 运行只调用本地短时解析、选测与结果检查，不启动设备测试或额外模型；长测试由当前 Executor 按原授权执行。Stop 返回包含义务、actual/expected、证据位置与合法下一步的短理由，同一 session 的下一次模型采样接收；没有有效返修输入时不得空 block 循环。预算和重入防护见 03 的 D4。

交付入口每次独立核验，缓存必须绑定候选和依赖；Hook 无收据不自动等于产品坏，但缺少完整义务集就不能签发就绪。现有任务包可由交付入口重建义务并要求补验；无包任务可从同 session 的原请求建立轻量记录。没有请求来源时只能要求恢复原任务上下文，不能编造完成标准。

**实测合同已确定：** 在获授权的同一宿主、同一受支持版本，顺序回放正常 Hook、未信任、禁用、超时、畸形输出、空理由、同任务续修和用户中断；每例使用无外部副作用的坏候选。检查两份独立结果：聊天是否发出误导文本、受管交付是否拒绝。前者失败不得用后者成功抵销。每宿主最多 8 个短例、每例一次初跑一次修复复跑；不使用账号、设备或付费资源。未满足的平台登记为未支持自动接入，保留手动原任务调用同一检查的低摩擦替代，不声称替代等价。

## 最终来源漂移核对

续研期间研究仓main从70812bd前进到 `f4a1233d59817867bc4c40b541f480695d947440`。已完整回读其最新COMPLEX_SYSTEM_DESIGN_GUIDE.md（blob c3cfe3b8afcee108df90ce9f1bcce3650bee0c3a）及新增[可信解释标准](https://github.com/YuukiAS/AI_Research_Toolkit/blob/f4a1233d59817867bc4c40b541f480695d947440/COMPLEX_ARCHITECTURE_EXPLANATION_STANDARD.md)。新版强调风险匹配质量属性、成熟外部能力的许可/维护、真实负结果、成本、明确用户选择及不移动完成终点；02–06已经按这些原则核对。它没有授权实施或自动发送前拦截。

AI Skills main、Bridge release/实际dev和七仓有效分支收尾重新查询仍与本文件固定SHA一致。官方Codex源码只作为接口/机制依据，Apache-2.0许可已读；没有移植或安装其代码，也不保证当前Desktop部署同版本。采用已有项目工具，不新增外部编排依赖。Python标准库排他创建标志支持Unix/Windows的文档已核对，具体OS崩溃/取消/文件替换性质仍需运行测试。[Python os](https://docs.python.org/3/library/os.html#os.open)

# Research Source Log

RUNNER_ID: GPT_WORK
INPUT_SNAPSHOT_COMMIT: 60d0a1feb7ca1efc8f751774850a4ec176b9ab6f

## P0｜入口与写入验证
- 已实际读取：指定分支的 PRO_INPUT/START_HERE.md（blob 99ce4d26f8e38c5bd7dbd9f5c302a835af61f924）；冻结提交中的同一路径（blob 81ea2ec87716413153ad153c48ee91cce309d0ba）。
- 用户明确指定 snapshot 60d0a1feb7ca1efc8f751774850a4ec176b9ab6f；冻结 START_HERE 内仍引用 b7537eef…，采用本次用户指定值。分支入口的逐仓库落盘要求同时遵守。
- 仅读取自身 OUTPUT_ROOT 的 RUN_STATE.md、SOURCE_LOG.md，原状态 NOT_STARTED。起始分支指针 4dfc002970bd248ddd1c4157907ec6a421a35932。
- 写入验证：RUN_STATE 已通过 GitHub 更新，commit f13de7d3d71a60fcb6078c6f5e6ffbb93e6a6c99；已读回核对身份、路径与内容。
- 尚未读取历史方案或其他研究者输出。未执行生产或实机探针。

## P0-R｜当前运行恢复核验（2026-10-15）
- WRITE_PREFLIGHT=PASS；沿用实际证明 commit f13de7d3d71a60fcb6078c6f5e6ffbb93e6a6c99 / docs/research/software-production/15_INDEPENDENT_ARCHITECTURE_RESEARCH_GPT_WORK_R0/RUN_STATE.md；本次已重新读取该 commit 的文件（blob 22a7085fc01ede5ecdc79087926ede7ba8d7900b），并核对当前分支恢复文件的 RUNNER_ID、OUTPUT_ROOT、INPUT_SNAPSHOT_COMMIT 一致。没有重复初始化或 probe。
- 当前运行合同 START_HERE.md blob 34fde56b79b7aca53af64370074cf55be23928d2：合同随分支，四份问题输入冻结于指定 snapshot；逐仓库/主题落盘后自动继续全部三阶段。当前 SOURCE_LOG 所记旧合同已被本项更新。
- 当前线程直接执行，不创建子任务；只通过 GitHub 写入本 OUTPUT_ROOT。

## P1｜冻结输入完整读取
- 已按序完整读取固定提交 60d0a1feb7ca1efc8f751774850a4ec176b9ab6f 下 PRO_INPUT/01–04；blob 分别为 8881ef60f02d0030fc6eedea7977be1c031b90a2、ad39a66d2a5b9709d48ad8d538b38c8fb2745da0、034f4b8097c59b03faa206ec5423047c0f637759、1223c6645161e753bfbcb3b0a1fdf6d8cdb27746。
- 61 问要求覆盖真实入口/同任务返修/权限/Slurm/专业判断/规则实际消费/成本/关闭权。四层证据必须分开：源码支持、机器安装、入口调用、候选验证。
- 已完整读取 CSV 的 363 条（六软件246+晚期25+CARE40+52），全部带 NOT_VERIFIED_AS_CURRENT_DEFECT；不将登记数当当前缺陷数或 gate 数。主要反例族：自报与真实对象不一致、真实宿主/数据缺失、检查器错误、跨候选污染、消费者不消费机制、排队和未知状态误归因。
- 决策要求：比较真实的“不建新通用系统”基线；独立候选提交前禁止读取旧方案/评审。本次尚未读历史答案。
- 继续逐仓库核对有效分支、AGENTS、目标、用户入口、测试、失败与恢复权限；每仓库落盘。

## R1｜AI Skills
- 分支核实：main=0d990b24fb7c7b46877347241800244f623b20c0；正式安装 release=06d135d8a6ee62cd41abb40fc5771fcef7f8db25，不能混称开发即已安装。README 明确正常入口为 Codex Marketplace release，更新后新会话加载。另有多条任务分支，本研究未将其未发布内容当正式能力。
- 实读：README；AGENTS.md 相关源权威、规模、专业分工、授权、artifact-aware review/CI 章节；skills/core/codex-system/codex-workflow-protocol/{SKILL.md,agents/openai.yaml}；tests/test_workflow_core_normal_entry_reliability.py；plugins/codex/plugins/workflow-core/.codex-plugin/plugin.json；release 的同一生成技能前105行；docs/plugin-todos/workflow-core.md 前145行。
- 主实现事实：workflow-core 是 Skills-only（manifest 无独立 MCP/controller）；allow_implicit_invocation=true 是路由配置。源码 W1–W5 明确真实纵向链、human triage、证据分层、重复失败止损、保护既有能力；恢复路由引用 Bridge bootstrap/materialize，不自造状态机。main source 与 release generated SKILL 的 blob 同为 030357c13abe5ffc544504051e8262c0881c78da。
- 验证边界：normal-entry reliability 单测主要 assertIn 规则字符串与触发示例，不能证明所有真实任务自动消费；TODO 有已加载 skill 仍选错环境/越权 fallback 的真实记录，也指向 qualification_candidate_replay_manifest 的 actual_consumption.proven，后者本轮未重放，不能据此保证其他任务。
- 已知失败证据：AGENTS 8.3 记载私有写作 artifact 未完整读仍 PASS；workflow TODO 记载 Lucerna 01055 自报与 TODO/真实 DPI/视觉相矛盾。状态已注明发布/历史，不断言现在仍坏。
- 研究含义：可复用专业内容、安装与路由；不能凭 manifest/规则把它宣称为可外部拦截完成、唤醒原任务的执行程序。未来探针应查实际技能调用及最终消费者；本轮未运行任何 replay。

## R2｜Bridge
- 分支/发行：main=a7931fdfc6e3d71cf985351df075de17097795e6（README 0.11.0 源码候选）；release=9db19b0409816c22042a246b35a33e1d34fedd0a（正式0.10.0）。不把 main 的 readiness/context 功能当已正式分发。
- 实读：README 前230行、AGENTS 前145行；ai_bridge_kit/reviewed_runner.py 的 event identity / eligible_events / prompt / codex_command / run_codex_event / watcher_once；cli.py 的入口定位；agent_flow.py 的 role receipt、route_findings、transition 实码；persistent_run.py 函数清单；tests/test_reviewed_runner.py 前110行；release reviewed_runner 的 Codex 命令与线程字段。
- 执行入口实证：main reviewed_runner.py:794–795 运行 codex exec -C <repo> -；事件记录 thread_id=None（624–625、879–880）。正式 release 同样 fresh exec / thread_id=None。它能继续仓库任务，但不是已证实续接 Windows App 原聊天。Lite main cli.py:673–712 同样以 exec 启动。
- Reviewed watcher 按任务+state+review_round+plan_revision+implementation_commit 去重；校验 clean tree、状态、角色允许 diff、发布后才标事件完成；max_attempts_per_event 默认2。它遍历 eligible task，不能凭 branch 名称推断多 active task 的独占执行；外部 GPT 等待被独立处理。
- Control 的真实机制可复用：route_findings 将 IMPLEMENTATION_BUG / VERIFIER_BUG / VERIFIER_CONTRACT_DRIFT / EVIDENCE_GAP / OPERATIONAL_FAILURE 分给不同 owner；科学选择需绑定 Planner 产物。receipt 验证拒绝 resume --last，要求确切 session/thread、scope、target；这证明校验合同，未证明任意 App 会话的运行适配器已存在。
- 权限与恢复：一个 CODEX_HOME 一个机器身份；Host 不授予 Slurm 写操作；reviewed 及 persistent 使用既有状态/锁/心跳，不能再加第二控制面。main 的 launch preflight 会重新读取必读材料；测试文件使用临时仓库/假 Codex，属于机械回归，未在本轮执行。
- 已知故障来源：README 0.10/0.11 与 AGENTS 明确 runtime identity、SSH_ASKPASS、长规则截断/控制文件未绑定、重复等待/旧 review 的修复边界。没有远端机器安装核验，不能把源码版本当运行版本。

## R3｜Remote Compute
- main=ca0bad392ce1295e76a07a5d8f9c9dd27d3f61d7；另有 Runtime v2 执行/交接分支。README 与根 AGENTS 指向 main 的当前基础设施 authority；并未把分支存在当生产部署事实。
- 实读 README、根 AGENTS、codex/AGENTS、shared/contracts/HEALTH_STATES.md、docs/architecture/BRIDGE_SCHEDULING.md、scripts/bridge_scheduler_adapter_v2.sh；枚举测试入口 codex/tests、bridge/tests、scripts/tests、workstation 专属测试。
- 实码/合同：scheduler adapter 查 Slurm 活体 inventory，区分 KNOWN/UNKNOWN/AMBIGUOUS，未知或重复 owner 不等于 peer 不存在；规范要求现存 Bridge 保留，禁止自动 cancel/relocate。horizon render 与显式 ensure/confirm-submit 分开。它是基础设施 Bridge 作业生命周期，不能冒充科研训练调度器。
- 身份：README 记录 USERS/OVERFLOW 各自固定 CODEX_HOME 与 SQLite；换 repo 不换身份。别名 inversion ready 不代表客户端 alias 已交换。本轮没有 SSH/机器检查，具体机器映射仍需将来按真实 SSH config 验证。
- 健康语义：必须有 vantage/observed_at/freshness/failure_domain；RUNNING、listener、state file 都不能等同可用；UNKNOWN 不得变失败并触发恢复。基础设施只提供状态/diagnose/bounded action，Lucerna 是桌面 UI owner。
- 已知失败/权限来源：AGENTS 记载 apps/catalog 异常流量、不得由 CLI upgrade 迁移 identity 或另启 daemon；禁止动生产 tunnel/job，禁止从另一台 Windows 机器状态推断目标机。Windows 后台需真实桌面两周期无闪窗验证，静态源码无法证明。
- 核心基础设施批次完成：AI Skills/Bridge/Remote Compute 的能力与运行证据已区分，未启动生产、Codex、Slurm 或 Windows 验收。

## R4｜Lucerna
- 参考分支：main=79dd2875d3da33c6a6d80e5e35bea812b84c1ceb；其他为专项旧评审分支。实读根 AGENTS 前170行、README 前150行、package.json、src-tauri/src/main.rs、scripts/governance-regression.ps1 全文、LUCERNA_EXECUTION_FAILURE_HISTORY.md 全文（约130行）。
- 产品/入口：Tauri Rust+WebView 的 Windows tray/macOS menu-bar 安静资源/健康监控；main.rs 调 lucerna_lib::run。正常 live_state、真实 provider/auth 与测试 fixture 分离；子状态到聚合、图标/CTA 一致性是验收重点，不是单个状态枚举完整即可。
- 验收实际：package 中 typecheck/build、累积 guard、harness 与 development-acceptance；后两类明确有 SelfTest，不能称真实原生验收。governance-regression 的 overall=PARTIAL 时只要没有 FAIL 仍 exit0；且固定声明 trusted-real-acceptance-entrypoint=GAP。本研究静态重新确认此返回语义，不是现场运行失败。
- 权限实码：governance script 会写临时文件、启动进程、对专用 sentinel 调 Stop-Process、访问桌面；名字叫 regression 不代表无副作用，本轮没有执行。根 AGENTS 明确可编辑 hooks 只是辅助，不能证明 OS isolation；需 agent-unwritable bounded entry 与真实负测。
- 已核历史：01047 重复卡片自报被独立截图推翻、01055 未闭 TODO/无真实 DPI仍自报完工；handler/窗口最终隐藏不证明真正按钮因果；key 验证不证明激活；原生反复截图干扰用户。它们解释为何必须读实际对象和动作后置状态，不等于当前 main 这些 bug 全未修。
- 适配边界：应复用现有 PID/commit/window/capture 辅助并消费结构化 static/runtime/coverage 分量；需要真实隔离桌面/安装/DPI/通知及 provider 往返才可宣称完整。当前研究没有资格宣称 Windows 已通过。

## R5｜CUHK Date
- main=9f25c7754d3c80d0be74f5b71016320f55753ae6；另有 fix/search-indexing-canonical-20261015=7586b9bd97750efd2e0b8916d1b894ca19460d5f 专项分支。以 main README/当前产品合同导航的全局产品为本次来源，不把专项分支当整个最新产品。
- 实读 AGENTS 前200行、README 前115行、package.json 前140行；2026-09-24 真实注册与 false-green harness 修复原始任务前110行；scripts/registration-critical-path-hosted.ts 的 UI/password/结果逻辑定位；树定位 web app/API/backend/persistence/matching 与测试。
- 正常产品：Meet at CU，网页注册/学生身份/问卷/配对；README 记载已接受0.5.25、registration/questionnaire LIVE，Matching inactive_pilot_ready、真实 opt-in/publication 仍暂停。这是仓库记录，未访问生产确认，不得研究中启动。
- 真实事故来源：引导已设同一密码，UI 422 same_password；生产者用随机新密码或 evaluate(fetch) 绕表单得假绿。当前脚本已定位可见 getByRole/fill/click 的完整注册入口。必须按消费者路径与同一语义验收，不能 API 成功替代 UI。
- 当前验收/恢复规则：verify:registration-critical-path-hosted、verify:gpt-work-parent-delivery；serial persona、disposable rehearsal/final batch 分离、票据 claim/finalize、同 persona recovery、expected prestate、source+Web/API deployment identity。产品错误、工具中断、身份污染分开处理；不能因一个工具失败放弃安全的其他覆盖。
- 专业边界：简体/香港繁体自然性、305/320宽与冷载状态闪烁、照片实际像素/双方访问、隐私和匹配科学语义；内部 audit 字段不得流进普通文案。合成审查不等于真实 Matching 上线授权。
- 研究含义：项目已有较多可复用入口，通用层应调用/归因，避免另造 persona/token/CI 体系。已接受用户状态必须恢复，报告、截图或数据库未消费 token 不能单独证明可交付。未执行 hosted 脚本。

## R6｜Bobbio
- 分支：develop=a64edfd6c5b11f81599bfcfc327be5964633a7b5 为开发权威，main=e7d929bad2d4b23939c81920e77390efbce42b96 为用户验收稳定线；不因 main 名称选错来源。实读 develop AGENTS 1–85、README 1–155、package.json、FIGMA_HANDOFF 1–95、ZOTERO_ACCEPTANCE_SAFETY 全文、EVIDENCE_COVERAGE、GPT_WORK_REVIEW_SYSTEM_AUDIT；Reader Safe wrapper 读取并检查隔离、权限、副作用及最终校验部分（长输出中段未全审）。
- 产品是 local-first Reader，Zotero 是文献/附件/批注 authority，PDF 不改、不得直接改 zotero.sqlite/另造批注数据库；Codex explanation、Candidate 与人工确认知识必须区分。
- 真实失败：新 profile 仍指向真实 data directory；裸 zotero:// URL 可启动默认真实 profile；缓存 updater 使仅关闭自动更新不够。需要独立 profile+data、before/after 两份审计、从隔离 Zotero 内开 PDF。历史不安全 run 不证明未污染。
- 源码 Invoke-BobbioReaderAcceptanceSafe.ps1（blob778c189b…）有 real/test 路径比较、Zotero/updater停止断言、URL handler检测和真实profile/data末尾比较；还会调用 Apply 准备、清理更新缓存及启动Bobbio，Preflight 名称不能被当只读授权。本轮没有执行或改变机器策略。
- 质量必须按 Figma R7Avaszm0TIYAthTWMprP1 的当前Reader16states、整窗1440/1280、真实批注往返和知识语义判断。本轮未访问Figma或真实Windows，仓库截图覆盖表也不是本轮视觉结论。
- 当前 evidence matrix 明确 LOCAL_CODEX_READY/READY_TO_START_GPT_WORK 不等于 FINAL_NATIVE_ZOTERO_ACCEPTANCE/USER_REVIEW/MILESTONE_ACCEPTED；旧focused review漏全产品/未知缺陷，审查系统audit将其分开。可复用已有多层gate，但不能自动累加成通过。

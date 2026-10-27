# Slurm routing 与 protected cancellation：返修链、边界证据和冻结反事实

Slurm 历史支持把工作重点从反复审查整份设计，转到按当前缺口选择权限分析、真实运行实验或局部实现验收。证据最强的是 Hook 保护链：设计早已写出失败风险，却直到后期才证明真实宿主会在 Hook 启动失败时继续原命令。Routing 则提供了必要对照：不少后续回合来自新增需求或实现错误，不能全部算成架构未收敛。[P01][P12][R03][R05][R11]

研究身份：RUN_ID=pro-a 的内部独立证据子任务。只读取历史资料与 AI_Skills_Collection；未读取本轮 pro-b/work。记录时点 2026-10-27。除明确标记的历史 cutoff 外，文档固定于 AI_Skills_Collection `5d4b1432f96742646e00ad279a054359b1aec1da`。先读取 AGENTS、Planner/Critic role contracts、Plugin Capability Gate Policy 及本轮 mandatory negative cases。没有运行 Slurm，没有访问/取消真实 Job，也未写 GitHub。

## 1. 最重要的判断

**Slurm 的真实证据支持替换“固定串行反复完整审查”，但不支持取消独立审查，更不支持把所有回合都计为架构失败。** Routing 的早期 Critic 抓到了 JobId/dependency/array 与状态竞争、周期性 mutation 授权等实质缺口；v0.2 到 v0.3、v0.4 到 v0.5 又确有文档明确记载的新用户需求。后期 R1–R4 大部分是实现不遵循已经冻结的语义，应该局部 Codex 修复，而非重新买一套架构。[R01][R03][R04][R05][R09][R11][R12]

**Protected cancellation 的主要失败是，逐步写出了更完整的文档、trust/hash 规则和 fake tests，却迟迟没有以真实运行入口证明保护边界。** 后来的核心事实是：真实 Code Mode 嵌套 shell 确实进入了 Bash PreToolUse/global Hook；Hook 子进程因 Desktop app-server 的动态库环境缺少 `libpython3.12.so.1.0` 而在 Python 代码开始前退出 127；当时 Codex 0.160.1 对普通 Hook process failure 不阻断原 Bash。它不是“Code Mode 绕过 Hook”。第三个同样只读文档的 Pro 无法比这个实际 probe 更直接地回答边界是否生效。[P12]

**晚发现不能一律归咎于当时模型遗漏。** Oct13 设计已经明确讨论了 Hook 失败不一定阻断。v2.1 Phase 0 真实 probe 也确实在产品实现开始前发现了 linked worktree 与 Hook discoverer 的拓扑不一致，是早期实验有效的正例。随后用户明确取消了 candidate-clone live trust/Hook probe 作为实施前置条件，改为最终 canonical production 阶段验收。协议应保留这一授权并明确记录证据债，不能事后把用户的延期决策抹掉。更不能把延期后的局部 PASS 解释成生产 enforcement 已证明。[P01][P08][P09]

**真正值得提前购买的信息至少有三种，不能混为一项“review”。**

1. 主体与权限分析：谁能构造确认，谁消费它，谁实际执行取消；它在 v2 的 persisted-confirmed 文件中有漏洞，独立 adversarial review 发现并促成 v2.1 改 owner。[P05][P06]
2. Runtime 边界实验：在真实 host/loader/session 中，正常事件和失败事件是否都能保证原命令启动数为零；这是 v3 的核心信息。[P10][P11][P12][P13]
3. 用户实际入口实验：当前可见 root chat 能否显示 native card、收到真实选择、绑定对应 pending；后台/隐藏 root、SDK fake client、connected catalog 均不能替代。MCP 的 first vertical probe 如实 FAIL，随后识别到可选 `${agent_id}` placeholder 缺失，是局部集成错误。[P17][P18]

本研究是 **retrospective analysis**。研究者已看到后续结果，再回读了若干历史 Git objects；没有声称完成双盲实验，也没有为第二 Pro、Asteria 或 probe 编造检出率。本文的 OBSERVED 指直接读取的仓库记录/源码/commit patch；运行结果本身来自这些记录，没有重新执行远端 runtime，也没有读取仓库引用的全部私有原始日志。

## 2. Routing refactor 的真实演进

### 2.1 六个方案版本不是六次同一架构失败

| 回合与锚点 | 当时发生什么 | 分类与实质信息 | 串行、用户与实现损失 |
|---|---|---|---|
| v0.1 proposal → Critic REVISE（2026-09-24） | pending cancel/resubmit 破坏 JobId、dependency、array 语义；query→scancel 间可能已 RUNNING；把“未禁止”当成 site authorization | DESIGN_GAP / EXTERNAL_FACT；这是高价值审查，提出最小边界约束，不是无关挑刺 [R01] | 审查依赖方案，修订依赖 finding；尚未产品实施，因此未见代码作废；新增用户介入 UNKNOWN |
| v0.2 → architecture PASS | 在旧 scope 内关闭前述问题 | 真实、范围有限的 design PASS；没有宣称 production proof [R02] | 一次正常收敛；没有证据说这一 PASS 对旧 scope 本身错误 |
| v0.2 execution package → execution REVISE | 用户新补充：同一 workload 资源推荐应稳定；每周目标应找 earliest uncovered window，不应堆积长 BeginTime jobs；区分 batch 与 persistent/interactive capacity | NEW_REQUIREMENT 为主；review 明说若 scope 不变，原包可执行。不能把后来的每项行为都倒算原遗漏 [R03] | 需要用户产品信息，随后可同批扩展设计；不是已实施代码大规模废弃 |
| v0.3 → REVISE | 新的 `auto_maintain_successor=true` 只是偏好，不构成跨周自动 mutation 授权 | DESIGN_GAP；需 bounded family enrollment、scope、window、action ownership [R04] | 新设计引入的新缺口；可由结构化“权限→状态→consumer”检查和独立语义审查共同发现 |
| v0.4 → REVISE | 用户明确要求开放源码在 unknown site / no committed registry 下也能使用 | NEW_REQUIREMENT；review 原文认定新产品合同，不是发现同一旧 scope 的潜藏 bug [R05] | 用户介入 OBSERVED（文档记述），手工耗时 UNKNOWN |
| v0.5 → REVISE | no-profile portability 已闭合；repository release 从 PATCH 改为符合新增 capability 的 MINOR | OTHER（release contract）；相关但架构信息量很低 [R06] | 适合局部元数据修订并同批校验；没有证据需完整架构推倒重来；不武断标成无关 REVIEW_DRIFT |
| v0.6 → architecture PASS → execution PASS | 固定 route/resource/capacity/enrollment/unknown-site contract，指定正常安装 G6、持久容量 G8、source/install identity | execution PASS commit `ce7f606e75dfa2bc7029b68655657c2d3d5b5d04`；书面机制和测试义务较完整 [R07][R08] | 正式实施必须后继；可并行核查相互独立的产品/站点事实 |
| implementation → prefinal R1（Oct2） | PF1 scope digest 漏 calendar/window/actions；PF2 active occurrence 已覆盖时提前 return，未找 next uncovered；PF3 未执行 installed persistent-capacity G6；PF4 小写 ClusterName 漏入 tracked artifacts | IMPLEMENTATION_BUG / EVIDENCE_GAP；多数直接违背冻结合同 [R09] | 已有代码需局部修正；没有证据需要换 routing 架构 |
| repair → prefinal R2 | PF3/PF4 已关；PF1 timezone 仍未绑定；PF2 explicit-target 单元素路径仍早退 | 同一缺陷族的修复不完整。应做邻近分支和不变量验收，而非增加新设计者 [R10] | 串行局部修复；Planner repair handoff 文档存在，但不能据此计一次核心 architecture reset |
| repair → prefinal R3 | timezone 进入授权 digest，却没有被 recurrence 算法消费；fixture 自己断言错误的 09:00 UTC | IMPLEMENTATION_BUG；review 明确保持架构/state model，使用已冻结的 family timezone [R11] | 有价值的独立验收：全套 320 tests PASS 未证明语义正确；大面积代码作废 UNKNOWN |
| repair → prefinal R4 | local wall clock 已修，但 DST fold/gap 没遵循上一 bounded handoff 的 fail-closed | IMPLEMENTATION_BUG；同一 PF5 局部续修 [R12] | 可直接 LOCAL_CODEX_FIX；不需要新 Pro、真实 Slurm或新 controller |
| parallel release recovery → formal closure（Oct3） | shared main/version 与跨任务集成；正式产品 `9042c6eb210a519a03fcfa127d4d59cd8197ed78`，325 tests/CI，slurm 0.3、repo 5.4.2 | OTHER（integration/release），不是 scheduling 架构重置 [R13] | 合并/发布身份依赖不可消除，但不应重复重做已成立的能力测试 |
| Oct4 bounded opt-in follow-up | 用户授权修改 race-policy 默认，允许无已知禁止时的 bounded opt-in | NEW_REQUIREMENT / policy change，单独任务，不能反向指控 v0.1 当时 Critic [R14] | 产品政策取舍有真实人类权限，局部变更而非全架构推倒 |

v0.6 execution plan 已明确 G6 不能由 helper/unit tests 替代，并且 installed persistent entry 应复用 compatible capacity、只规划一个缺失 successor。因此 PF2/PF3 不能都叙述成“设计没有想清楚”；这些问题正是**设计正确而实现或证据有洞**的对照组。另一方面，“字段有 timezone”不证明它真的进入 recurrence 算法；Asteria 若只检查字段非空，也会误过。[R08][R09][R11]

### 2.2 这条链说明 Critic 有什么价值

比较基线还要区分历史行为与后来修订的规则。2026-10-19 的 [Critic role contract v1.7](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/workflows/CRITIC_ROLE_CONTRACT.md) 已规定：冻结范围内的普通 bug、配置、runtime/loader、测试/CI 失败默认返回同一 Codex；两轮没有新证据的争论应停止，明确缺少哪项可判定事实；每轮要生成唯一下一接收方提示。局部修复、停止空转和自动下一提示都不是本次替代协议独有的发明。替代协议必须在必经角色数量、独立输入、并行安排以及证据门实际执行上给出额外收益。

Routing 的优秀 finding 都可给出“冻结要求 → 可复现实例 → 用户结果偏差 → 最小修复 owner”，例如错时区会把每周容量窗口移到错误实际时刻。它们不是为了找新 finding 而扩大系统。有问题的是**路由到下一位执行者的粒度**：已有算法正确合同下的 local bug 仍通过 Planner handoff 包装，增加必经串行角色；相同缺陷族分散四轮，也说明修复验收没有一次覆盖邻近分支。资料不足以断言每轮都可并行或某一轮纯属浪费。[R09][R10][R11][R12]

## 3. Protected cancellation 的真实返修链

下表“代码损失”只写能够从 source/diff 证明的替换，不把版本数、commit 数或文档行数直接当 W_waste。

| 回合 | 原机制 → 新机制／现实发现 | 分类 | 核心变化、用户和后续 |
|---|---|---|---|
| Oct12/13 初始目标 → v0.3 | H100 误取消事故后，把 partition/H100/current-run ownership、多种 destructive release 路径、可信执行边界纳入方案；Hook 只是辅助 | 原目标/设计扩展；后续范围归因 UNKNOWN。v0.3 已明确普通 Hook 失败可能让原命令继续 [P01] | 有安全 tradeoff，可信人类源尚未闭合；不能把后来 v1 partition-only 当最初一直明确的唯一目标 |
| Stage A → Oct16 production closure | 中央 safe-cancel、chat 不直接授予保护目标取消权、独立 terminal confirmer；adapt DII/CARE；不声称 same-UID OS isolation | DESIGN_GAP / EVIDENCE_GAP；文档已承认 offline candidate ≠ normal Longleaf enforcement [P02] | Stage A `acf8bf...` 被记录 Reviewer PASS，Phase3 `b4815a...` 已有大量代码；早期实现确已开始 [C01] |
| Oct17 v1 scope reset | old production design REJECT，三个 candidate REJECTED_NOT_DEPLOYABLE；缩到 protected partition，普通 scancel → challenge → 独立终端确认 → guard 消费 | SCOPE_RESET，夹有 NEW_REQUIREMENT/早先过度设计的可能；原始全部用户对话缺失，不能单选责任 [P03] | 核心行为改变，旧候选不再可部署；明确要求用户再裁决产品边界，代码废弃比例 UNKNOWN |
| Oct18 v2 | 终端确认不满足目标；调查到 native request_user_input；PostToolUse binder 写 persisted confirmed，下一 shell guard consume；PATH shim | DESIGN_GAP / EXTERNAL_FACT；native 支持范围、root、headless 是事实约束；v2 自称 CONDITIONAL [P04][P05] | 核心入口/信任载体改变；早期 capability fact check 信息高于重复泛审 |
| v2 execution review → v2.1 | ER-V2-01：普通 shell 与 guard 同权限，confirmed file 可伪造；trusted PostToolUse 同次回调 re-resolve+reserve+执行取消，删除 next-shell authority | DESIGN_GAP；有价值、实施前的独立权限审查 [P06] | 改 actual execution owner；结构检查若仅确认 payload/consumer 非空抓不到“可伪造”的语义；人类新产品决定不一定需要 |
| v2.1 PASS → Phase0 FAIL | `c387906...` 包已获 PASS；真实 linked worktree config 预检过，但 Hook discoverer 绑定 canonical checkout，CAPABILITY_PROBE=FAIL、PRODUCT_IMPLEMENTATION=NOT_STARTED | EXTERNAL_FACT / EVIDENCE_GAP；**早期 probe 正例** [P07][P08] | 改为 standalone candidate clone，产品代码尚未开始，不能算一次实施作废；串行 probe→裁决有真实信息 |
| 用户改变验证时点 → v2.1 candidate | 用户明确把 candidate-clone live Hook/native-chat probe 延后到 canonical production，先交 reviewer；`b8ed6c...` = READY_FOR_INDEPENDENT_REVIEW，PRODUCTION_ACTIVATED=NO | 用户授权的 EVIDENCE_GAP 延期，非偷偷省略 [P09] | 用户介入 OBSERVED；保留证据债是正当，但不得把候选 review PASS 升格 production-ready |
| candidate shim → trusted host Hook | `343628...` 增加 automation-bin/scancel 和 binder/session；`577b160...` 删除 shim/session/binder，改 host PreToolUse 取消 owner | DESIGN_GAP / architecture substitution；代码 patch 证明真实机制改写 [C02][C03] | 不是命名调整；已有实现被删除/替换 OBSERVED，废弃工时 UNKNOWN |
| project-local → one user-global Hook | `da5e88...` 删除各项目声明、统一私有 runtime；`445380...` 删除 Slurm-specific permission profile | 核心边界/ownership 改变 [C04][C05] | 跨 cwd/三项目边界归一，可能降低长期 consumer coupling；完整替换原因不能只从 diff 精确还原全部用户偏好 |
| global Hook candidate RESULT=PASS | `1b8df2c...` 记录 fake semantics/tests/catalog trust PASS；installer 只冻结 `sys.executable` 路径与 hash | EVIDENCE_GAP；真实 launcher 启动和异常对 host 的语义未证明 [P10][P11] | 代码已有，但 frozen path exists ≠ host loader 可启动。记录还保留一次意外真实 `scancel 9101`，mutation UNKNOWN；不能当可靠 probe，更不能自行再查询 |
| Oct19 v3 | 真实 Hook 触发后缺 libpython exit127，host nonblocking，原操作继续；转 portable runtime qualification + outer supervisor valid deny、success completion | EXTERNAL_FACT + DESIGN_GAP；generic failure 风险早知，具体 loader事实晚知 [P01][P12] | 直接返回 architecture；禁止 wrapper/PATH/projectlocal/terminal/next-shell。首次冻结前 harmless failure-path probe 有强信息机会，非证明必能准确预测库名 |
| v3 install → session A/B | catalog/trust 显示新声明，老 root session 仍用旧 Hook snapshot；fresh root 真正 deny before launch | EXTERNAL_FACT / EVIDENCE_GAP [P13] | install/session adapter 局部修补，记录 fresh_session_required；不要求推翻 partition policy |
| G4 CPU fixture → QoS constraint | CPU/noGPU held test 不符合站点 MinTRES=gres/gpu=1，sbatch 返回 QOSMinGRES，无 Job，无 mutation | EXTERNAL_FACT；验收资源假设错误 [P13][P14] | RETURN_TO_PLANNER 仅改 resource contract；不是 Hook 整体架构重置；read-only站点调查本可更早取得信息 |
| amended G4 → native schema mismatch | 真实 PreToolUse 已正确阻断，但 candidate 必须六键 question，当前 native spec 只允许四键并 normalize is_other=true；无法出题 | IMPLEMENTATION_BUG / EVIDENCE_GAP [P15] | 先按用户 stop 条件停；随后固定 same plan revision、局部修复，明文不需新架构 [P16] |
| native channel → current-root MCP elicitation | 用户直接授权更换 transport，trusted Hook→MCP SDK1.30 elicitation；visible root sentinel 仍实际执行，无 card、无 audit | 外部交互边界改变 + integration gap；“后台/隐藏 root 等同可见当前对话”不可假定 [P17][P25] | 初次失败证据不能唯一归因 Hook selection/dispatch/UI，报告诚实写未知。不可只凭 connected catalog、SDK fake smoke 宣称成功 |
| pending/root binding repair | 已查到 Hook template 的 optional `${agent_id}` 不存在；去除 optional 展开依赖，绑定具体 root metadata.threadId、pending nonce、event identity、TTL | IMPLEMENTATION_BUG / EXTERNAL_FACT [P18] | 现有架构内可修，不能再次启第二套 Pro。root-visible 和 ordinary process 两层必须同链实证 |
| P0 failure isolation | runtime/source drift 导致 unrelated git status 被整体 deny；移 scope classification 到 mutable runtime 校验之前，确定 unrelated passthrough，scancel/ambiguous strict deny | DESIGN_GAP + local failure-containment revision [P19][P24] | v3 明说 full-checker坏则整个 Bash deny；后修确实调整了这一 containment policy，不能称毫无设计变化。但 partition/one-shot/target core 保持，修复局部 |
| live confirm、replacement、revised acceptance | 两个 held Job 的真实 wire 都为 confirm，不冒充 retain；用户后来明确 waive live held-job retain，改 harmless actual retain mapping +同候选 deterministic retain | NEW_REQUIREMENT（验收裁决）/ OTHER；不是 silent downgrade [P20][P21][P22] | preserve KEEP_TEST=NOT_RUN；仅 amended gate可 PASS。人类产品/风险验收决定真实必要，不能完全自动化 |
| formal final release | 最终同 runtime `3e81802...` 完成 independently reviewed release，repo5.5.2/skill0.5，release `f4517798a73adf29d3484306d60845488739f1fc`，formal closure `f1de8e85957d32a50f4458349f450ec65add13bb` | 稳定完成记录，不能把旧 STOP 当当前未完成 [P23] | 最终406 tests/CI及正式 install identity；存在证据但不足以反推每轮早期 PASS 都完整 |

### 3.1 为何多轮之后仍不稳定

第一，**核心能力、trusted ownership 与部署边界没有同时闭合**。终端确认能否替代聊天、同 UID 文件是不是可信 authority、Hook 在何处发现、global Hook 如何跨 cwd 工作，分别在不同轮次才被裁决。每次机制迁移都会使旧 evidence 的适用范围缩小；但文档 PASS 很容易被读者理解成整条产品链 PASS。[P03][P04][P06][P08][C03][C04]

第二，**测试层级错配**。假的 scheduler 可以证明精确 Job、一回消费、retain 不调用；不能证明真实 app-server 能启动 Python，不能证明 host 将异常当 deny，不能证明当前会话用的是刚安装的 Hook，更不能证明卡片出现在用户当前可见 root。后续的明确 FAIL 记录恰恰说明这些层不是可互换的。[P10][P12][P13][P15][P17]

第三，**把“结果状态”压成单一 PASS 造成假冻结**。`c387906...` 的 execution review PASS 允许先 probe，而不是证明 probe 已通过；`b8ed6c...` 仅 ready for independent review 且生产未激活；`1b8df2c...` 的 fake/catalog PASS 也不构成 host-failure containment。新的方法必须按 claim 绑定 evidence、runtime identity、normal entry、failure path、deployment/session，而非把最外层 PASS 传播到所有下游。[P07][P09][P10]

第四，**产品变更、事实发现和代码错误被送进相同长链**。v1 产品 scope reset、v3 launcher failure boundary 必须回架构；native 四/六键 mismatch、optional agent field、timezone 算法不消费已定字段，可以在明确冻结语义下 LOCAL_CODEX_FIX。若每个都重新 Planner→Critic，串行成本升高而架构信息几乎不增。[P03][P12][P16][P18][R11]

## 4. 历史 cutoff 回放

### 方法边界

以下 pre-cutoff 输入从精确历史 Git object 回读；outcome 放在另一区域用于评分。当前研究者已经见过 outcome，故这里只能证明“当时可获取的证据与候选方法存在信息机会”，不能证明某模型会命中，也不能估计实际检出概率。后续若做真正 benchmark，应把 cutoff packet 交给未见后续的人/模型，再按预注册 outcome 与 finding relevance 评分。

| Case | cutoff 与当时已可读输入 | 后来真实 outcome | 候选机制的预期信息增量（INFERRED）与限制 |
|---|---|---|---|
| S-RUNTIME-01 | `1b8df2c...` RESULT、installer；早期设计已承认 Hook process failure 不阻断 [P10][P11][P01] | host loader 缺 libpython，exit127，原 Bash 继续 [P12] | **最强：真实 host 入口 + failure-path harmless marker probe。** 单独 sanitized Python smoke会测启动，却不足证明 host阻断；须实际进 Hook并断言原操作未启动。Asteria 可因关键无 evidence阻Freeze；填字段本身不能预测 loader。第三 Pro共享 runtime前提时弱。 |
| S-AUTH-02 | `38a76797439c6b29098aade7539270cbc51e8836` v2 execution：binder→confirmed普通文件→下一shellguard [P05] | ER-V2-01，owner迁移到trusted PostToolUse [P06] | **最强：独立 adversarial ownership review/implementer dry-run。** 问“普通shell能否合成消费凭证”。只检查payload/consumer字段会过。可用无Slurm的权限/伪造实验，但同UID概念漏洞已有源码/设计足够，不必真实取消。 |
| S-WORKTREE-03 | `c387906...` 已PASS且计划Phase0的v2.1包 [P07] | linked worktree Hook发现错位；产品尚未开始 [P08] | **观察到的有效早期probe正例。** 这是现行流程已包含的好机制，不能把收益全算新协议原创。可更明确保留NO_IMPLEMENTATION状态，把probe并行于其他不依赖事实的设计。 |
| S-ROUTING-04 | `ce7f606...` v0.6 execution PASS，earliest uncovered、timezone、G6等已写明 [R08] | PF2 early return、PF3未执行installedG6、PF5timezone不消费 [R09][R11] | **对照组：不是再设计一定能防的架构洞。** implementation-readiness要求陌生implementer写N已覆盖/N+1缺失与跨时区行为轨迹；可能提高后续验收质量，但不能宣称Freeze前已发现尚不存在的代码bug。独立black-box oracle优于第三完整架构。 |
| S-BOUNDARY-05 | v3 proposal已经指定全Bash在fullchecker故障时deny，且G2回归只写健康runtime时unrelated行为 [P12] | 后续 runtime drift 连git status都阻断，需scope-first isolation [P19] | **最强：盲区场景 + failure containment trace。** 业务外消费者“无关Bash”本应进消费者图，故障矩阵需包含依赖坏时旁路健康功能。Asteria能强制答，但若主设计主动选择globaldeny，仍需产品/可靠性裁决而非空字段检查。 |

每个 case 的 structured 数据、可检验 criterion、不可作的推论及 next actor 在 [slurm_cases.json](evidence/slurm_cases.json)。没有使用后来文件去伪装 pre-cutoff 输入。

## 5. 哪些机制有历史支持，哪些还没有

### Asteria completeness 可以承担的工作

这里有一个不能忽略的反证：Oct13 v0.3 已有 G1–G6 能力矩阵，已经要求真实普通入口、Hook 未启动/失败/超时、普通科研功能保持、证据身份和禁止模拟 PASS 冒充真实上线。因此，单纯新增表格或字段不能算比历史流程更强。新增价值必须来自执行中的 claim 依赖门、证据债、版本/环境失效传播与不能绕过的冻结判据；否则只是把已经存在的要求重新排版。[P01]

- 对任一危险能力，要求 owner、真实输入来源、mutation authority consumer、状态迁移、异常、恢复、验证范围都存在。v0.3 recurring enrollment、v2 confirmed 文件跨权限域正好给出可检查关系。[R04][P05][P06]
- 对关键 external/runtime 前提建立 **claim→证据→版本/环境→有效范围**。例如“Hook configured”“trusted”“catalog loaded”“session consumed”“actual child launched”“host denied on failure”“current visible user answered”必须分开。否则 linked/source anchor 只证明文件存在。[P08][P10][P13][P17]
- 把 implementation issue 与 design issue 分开：已有 timezone要求而代码未消费，应指向implementation owner；同一接口的四/六键不匹配，也不是让Codex发明产品机制。[R11][P16]
- 当 guard 失败会使 destructive operation继续，且无已证明隔离边界时，必须阻止将该能力标为 FROZEN_FOR_IMPLEMENTATION/DEPLOYMENT。用户允许延后实证时，只能冻结不依赖该前提的部分或限定候选实验阶段；保留依赖风险，不能把授权延期改写成证据充分。[P09][P12]

### 它自动发现不了什么

“partition-only才是用户要的产品”“terminal不符合用户想要的chat-only”“same-UID confirmed文件可伪造”“全Bash deny伤害无关任务”“隐藏root不等于当前可见root”，都可能在结构完整时依然错误。规则引擎可以检查这些维度有没有回答；不能保证答案正确。需要独立产品场景调查、权限语义分析或真实probe，按具体未决问题选，不固定全跑。[P03][P06][P17][P19]

最终验收范围也不能倒推：正式 closure 只要求 Longleaf Codex USERS 身份这一当前 consumer，没有声称新增机器、Bridge、DII、CARE 都已适配；v3 只承诺正常 Codex 入口及明确适配 consumer，不承诺 same-UID 操作系统级隔离。早期 v0.3 更强的不可绕过范围与最终范围不同。比较工作流必须固定同一产品合同，不能把缩小承诺后的成功解释成原范围已经被证明。[P12][P23]

### 对第二 Pro / Work / Codex 的差异化支持

| 当前未决项 | 本案例支持的下一执行者 | 为什么 |
|---|---|---|
| wrapper、host Hook、global Hook哪条边界符合产品/信任目标 | 主架构师；若确有两条可行路线且牵涉不可逆ownership，可启动第二独立设计 | 需比较机制；第二设计收益为INFERRED，历史没有随机对照证明 |
| 无人能证明host异常是否放行 | CODEX_MINIMAL_PROBE | 事实可以直接改变方案，重复推理无法代替真正host语义 |
| 原需求/事故已多而scope是否错仍未知 | WORK_BLINDSPOT_AUDIT，仅原目标/事故/用户场景，不读候选 | 可能在形成terminal或全局deny方案前问出“用户实际入口/无关功能”，但检出率UNKNOWN |
| 已定语义，timezone/四键schema/optionalfield bug | LOCAL_CODEX_FIX + targeted independent acceptance | 不增架构决策；把新Pro用于此类问题是错配 |
| 新产品要求“保护范围改小”或“验收retain可替代” | USER_PRODUCT_DECISION，由架构师先准备具体取舍 | 事实调查不能替用户做价值判断 |
| gate和真实入口均成立、陌生实施者无需选择机制 | Freeze /正式实施或结束 | 继续找任意低价值finding不再提供足够信息 |

## 6. 如何把发现限制成局部返修

**稳定的是保护政策与mutation事务，不是所有部署手段。** 能力核应固定 protected partition policy、exact identity、owner检查、重新查询、一次性reservation、单次调用、歧义结果只读reconcile。把native question/MCP表单、Hook declaration/trust、session reload、Python launcher、scheduler executable/site事实作为不同adapter。每个adapter有输入/输出/失败合同及可独立运行的harmless conformance probe。[P06][P12][P18][P24]

这能局部吸收 loader变化、native schema变化、session snapshot和optional-field错误，而不触及routing/resource/capacity或DII/CARE业务状态机。v2→v2.1 的authority owner改动则不能假装是普通adapter：普通shell可伪造凭证会损害core guarantee，必须回到架构裁决。v1scope reset同样是产品改变，不应被“局部修复”掩盖。[P03][P06]

**failure containment必须双向描述。** 一方面guard坏时保护能力不得失守；另一方面它不应让git status等不依赖保护的能力全部失效。v3最初明选globaldeny，后来P0 scope-first修复说明只优化safety而不检查blast radius会产生新返修。应把“protected command拒绝”和“明确无关command继续”放在同一次representative failure probe中；模糊输入可拒绝，不需要保证任意恶意shell语法都安全解析。[P12][P19][P24]

**版本/状态传播也需要边界。** 源码候选、安装runtime、信任hash、会话消费身份、证据适用范围、最终release不能用一个PASS标记。部署变化如果只失效某个adapter证据，重做该证据；不要把全部routing tests或整套架构重新拉回排队。最终release identity仍应精确核对，避免旧候选证据拼接新release。[P13][P16][P23]

## 7. 可观察成本与不能知道的量

| 指标 | 可从本次资料确认 | 不能声称 |
|---|---|---|
| 设计审查round | Routing六份proposal；六份architecture review；两份execution-ready review（v0.2 REVISE、v0.6 PASS） | 这些不等于八次架构失败；完整聊天模型调用数UNKNOWN |
| 实施审查round | Oct2 routing R1–R4四份prefinal REVISE，PF1–PF5五个ID，部分同缺陷族反复；另有release integration reviews | 不把每轮都计A_reset，不以报告数衡量质量 |
| protected implementation starts | 至少可定位StageA、Oct16 phase3、v2.1 shim candidate；后有portable runtime与MCP代码，确有多次机制实现 | 无完整工时及所有尝试，I_impl总数UNKNOWN；可用命名episode下界，不可按commit数算 |
| architecture return | old production→v1scope reset、global-hook candidate→v3portable runtime至少两条清楚的实施后核心返修链 | 不能把QOS testfixture/四键schema所有RETURN_TO_PLANNER都算同等级reset |
| 代码浪费代理 | shim/session/binder删除，host/global Hook替换，旧三个candidate rejected不可部署；存在具体diff | W_waste的行数比例、工时、所有代码是否后来重用UNKNOWN |
| 人类介入 | routing新增需求、probe延期、trust动作、MCP入口授权、改G4验收等事件类型有记录 | H_user的准确次数/分钟UNKNOWN；文档“user supplied”不等同读到完整原始对话 |
| 等待 | 逻辑依赖：review→修订、probe→裁决、安装/trust/session→live acceptance、终版→正式release | commit日历跨度不是T_wait；没有model wallclock记录 |
| D_codex | 多处执行前停止，未私自选择；native schema按同计划局部修复；代码实现了若干后来替换机制 | 未看到完整Codex对话，不能断言D_codex=0或精确计数 |
| reviewer drift | v0.5版本分类有用但架构信息量低；其它已核实的主要findings与产品风险关联强 | 无证据支持把整个Critic链标成无关挑刺 |
| 最终完成 | routing正式closure；protected正式release5.5.2/0.5与406tests/CI/安装readback记录 | 不把早期FAIL当今日故障；也不由最终PASS推导无残余风险 |

这些数据足以否定“每多一轮完整Critic就必然更接近ready”的简单假设；不足以量化新协议会减少多少百分比的等待或重工。稳定的比较应是：下一个调用能否解决**当前具体不确定性**，以及被证伪时影响几个owner。机制层面的优劣在多个合理风险水平下仍成立：真实host fail-open未知时probe必要；已冻结语义的代码bug时第三完整设计增益很低。数值收益待前瞻校准。

## 8. 可交给主研究的可检验预测

1. 若入口/owner/runtime证据门有效，新的protected-cancel任务不应在“普通Hook错误是否放行”UNKNOWN时声称最终Architecture Freeze；它应输出CODEX_MINIMAL_PROBE或明确限定范围的实验包。
2. 同一artifact的configuration/trust/catalog PASS不能被计作正常路径和failure path均PASS；Asteria会使第一轮显性证据缺口由设计者自己暴露。
3. 新协议应把routing PF2/PF5、native schema、optional Hook field路由为LOCAL_CODEX_FIX；如果仍要求完整Planner–Critic重写，它没有真正减少架构回跳。
4. 独立审查仍应抓confirmed-file authority等语义漏洞；若取消Critic后漏掉此类问题，新协议失败。
5. 用户新增portability/资源稳定性/验收变更保留NEW_REQUIREMENT，不计“原Planner遗漏”，防止benchmark偏袒新法。
6. 同样的loader/session/schema变化，应只失效对应adapter及依赖证据；若仍导致全仓库/所有consumer重做，blast-radius目标失败。
7. 如果前瞻盲测中，以相同可读input让普通Planner–Critic在相同关键路径与人类成本下同样及时发起probe、同样局部修复，则本案例不能证明替代协议更优，只能证明应吸收这些做法。
8. 如果第二独立Pro持续只复述同一Hook前提而无独立信息，应减少设计者，把并行预算转成runtime/scene证据；这不是任意追问改变推荐，而是预先定义的负增益证据。

## 9. 证据索引

下列链接均指向已读的明确Git对象；简称仅便于报告内交叉引用。更完整的下载清单在 [来源清单](evidence/source_manifest_slurm.json)。正文关于测试/运行的OBSERVED均限定为“仓库中的执行记录可见”，不冒充本研究重跑成功。

- **R01** — [routing v0.1: identity/race authority](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_CRITIC_REVIEW_V0_1_2026-09-24.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_CRITIC_REVIEW_V0_1_2026-09-24.md`
- **R02** — [routing v0.2 architecture PASS](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_CRITIC_REVIEW_V0_2_2026-09-24.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_CRITIC_REVIEW_V0_2_2026-09-24.md`
- **R03** — [new user requirements after v0.2](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_EXECUTION_CRITIC_REVIEW_V0_2_2026-09-24.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_EXECUTION_CRITIC_REVIEW_V0_2_2026-09-24.md`
- **R04** — [recurring mutation authorization](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_CRITIC_REVIEW_V0_3_2026-09-24.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_CRITIC_REVIEW_V0_3_2026-09-24.md`
- **R05** — [new portability requirement](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_CRITIC_REVIEW_V0_4_2026-09-24.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_CRITIC_REVIEW_V0_4_2026-09-24.md`
- **R06** — [release version classification](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_CRITIC_REVIEW_V0_5_2026-09-24.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_CRITIC_REVIEW_V0_5_2026-09-24.md`
- **R07** — [v0.6 execution PASS](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_EXECUTION_CRITIC_REVIEW_V0_6_2026-09-24.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_EXECUTION_CRITIC_REVIEW_V0_6_2026-09-24.md`
- **R08** — [actual v0.6 cutoff execution plan](https://github.com/YuukiAS/AI_Skills_Collection/blob/ce7f606e75dfa2bc7029b68655657c2d3d5b5d04/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_EXECUTION_PLAN_V0_6_2026-09-24.md)；`ce7f606e75dfa2bc7029b68655657c2d3d5b5d04` / `docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_EXECUTION_PLAN_V0_6_2026-09-24.md`
- **R09** — [routing implementation R1](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-workflows-routing-refactor/PREFINAL_CRITIC_REVIEW_R1_2026-10-02.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `results/hpc--slurm-workflows-routing-refactor/PREFINAL_CRITIC_REVIEW_R1_2026-10-02.md`
- **R10** — [routing implementation R2](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-workflows-routing-refactor/PREFINAL_CRITIC_REVIEW_R2_2026-10-02.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `results/hpc--slurm-workflows-routing-refactor/PREFINAL_CRITIC_REVIEW_R2_2026-10-02.md`
- **R11** — [timezone not consumed by algorithm](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-workflows-routing-refactor/PREFINAL_CRITIC_REVIEW_R3_2026-10-02.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `results/hpc--slurm-workflows-routing-refactor/PREFINAL_CRITIC_REVIEW_R3_2026-10-02.md`
- **R12** — [DST fold/gap local repair](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-workflows-routing-refactor/PREFINAL_CRITIC_REVIEW_R4_2026-10-02.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `results/hpc--slurm-workflows-routing-refactor/PREFINAL_CRITIC_REVIEW_R4_2026-10-02.md`
- **R13** — [routing final release closure](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-workflows-routing-refactor/INTEGRATION_RELEASE_CLOSURE_2026-10-03.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `results/hpc--slurm-workflows-routing-refactor/INTEGRATION_RELEASE_CLOSURE_2026-10-03.md`
- **R14** — [separate policy change](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-race-policy-bounded-opt-in/RESULT.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `results/hpc--slurm-race-policy-bounded-opt-in/RESULT.md`
- **P01** — [early threat model including non-blocking Hook failures](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_CANCEL_PROTECTION_PROPOSAL_V0_3_2026-10-13.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `docs/design/slurm-workflows/SLURM_WORKFLOWS_CANCEL_PROTECTION_PROPOSAL_V0_3_2026-10-13.md`
- **P02** — [broad old protection Stage A and production closure](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_PRODUCTION_CLOSURE_PLAN_V0_1_2026-10-16.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `docs/design/slurm-workflows/SLURM_WORKFLOWS_PRODUCTION_CLOSURE_PLAN_V0_1_2026-10-16.md`
- **P03** — [product scope reset and terminal-confirmed guard](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_PROTECTED_PARTITION_FRESH_CONFIRMATION_PROPOSAL_V1_2026-10-17.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `docs/design/slurm-workflows/SLURM_PROTECTED_PARTITION_FRESH_CONFIRMATION_PROPOSAL_V1_2026-10-17.md`
- **P04** — [native chat confirmation v2](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_PROTECTED_PARTITION_CHAT_CONFIRMATION_PROPOSAL_V2_2026-10-18.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `docs/design/slurm-workflows/SLURM_PROTECTED_PARTITION_CHAT_CONFIRMATION_PROPOSAL_V2_2026-10-18.md`
- **P05** — [v2 cutoff execution package](https://github.com/YuukiAS/AI_Skills_Collection/blob/38a76797439c6b29098aade7539270cbc51e8836/docs/design/slurm-workflows/SLURM_PROTECTED_PARTITION_CHAT_CONFIRMATION_EXECUTION_PLAN_V2_2026-10-18.md)；`38a76797439c6b29098aade7539270cbc51e8836` / `docs/design/slurm-workflows/SLURM_PROTECTED_PARTITION_CHAT_CONFIRMATION_EXECUTION_PLAN_V2_2026-10-18.md`
- **P06** — [ER-V2-01: confirmation authority boundary](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_PROTECTED_PARTITION_CHAT_CONFIRMATION_PROPOSAL_V2_1_2026-10-18.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `docs/design/slurm-workflows/SLURM_PROTECTED_PARTITION_CHAT_CONFIRMATION_PROPOSAL_V2_1_2026-10-18.md`
- **P07** — [v2.1 PASS cutoff before worktree probe](https://github.com/YuukiAS/AI_Skills_Collection/blob/c3879065c782f1b0a03107a927bb3176a8788d02/docs/design/slurm-workflows/SLURM_PROTECTED_PARTITION_CHAT_CONFIRMATION_EXECUTION_PLAN_V2_1_2026-10-18.md)；`c3879065c782f1b0a03107a927bb3176a8788d02` / `docs/design/slurm-workflows/SLURM_PROTECTED_PARTITION_CHAT_CONFIRMATION_EXECUTION_PLAN_V2_1_2026-10-18.md`
- **P08** — [Phase 0 fail and standalone-clone recovery](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_PROTECTED_PARTITION_CHAT_CONFIRMATION_EXECUTION_PLAN_V2_1_2026-10-18.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `docs/design/slurm-workflows/SLURM_PROTECTED_PARTITION_CHAT_CONFIRMATION_EXECUTION_PLAN_V2_1_2026-10-18.md`
- **P09** — [user explicitly defers live candidate Hook probe](https://github.com/YuukiAS/AI_Skills_Collection/blob/b8ed6c3d3e40f5c32130e56f0b78ae7c9aea2772/results/hpc--slurm-cancel-production-closure/RESULT.md)；`b8ed6c3d3e40f5c32130e56f0b78ae7c9aea2772` / `results/hpc--slurm-cancel-production-closure/RESULT.md`
- **P10** — [global Hook candidate RESULT PASS before runtime redesign](https://github.com/YuukiAS/AI_Skills_Collection/blob/1b8df2c1f2b93de1605d571f5125cd4aaa99fd20/results/hpc--slurm-cancel-production-closure/RESULT.md)；`1b8df2c1f2b93de1605d571f5125cd4aaa99fd20` / `results/hpc--slurm-cancel-production-closure/RESULT.md`
- **P11** — [historical installer freezes installer Python](https://github.com/YuukiAS/AI_Skills_Collection/blob/1b8df2c1f2b93de1605d571f5125cd4aaa99fd20/skills/tools/hpc/slurm-workflows/scripts/setup_protected_cancel.py)；`1b8df2c1f2b93de1605d571f5125cd4aaa99fd20` / `skills/tools/hpc/slurm-workflows/scripts/setup_protected_cancel.py`
- **P12** — [loader failure root cause; portable runtime design](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_PROTECTED_CANCEL_PORTABLE_RUNTIME_PROPOSAL_V3_2026-10-19.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `docs/design/slurm-workflows/SLURM_PROTECTED_CANCEL_PORTABLE_RUNTIME_PROPOSAL_V3_2026-10-19.md`
- **P13** — [stale session snapshot versus fresh Hook normal entry](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/SESSION_AB_EVIDENCE.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `results/hpc--slurm-cancel-production-closure/SESSION_AB_EVIDENCE.md`
- **P14** — [QOSMinGRES; scheduler test resource amendment](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_PROTECTED_CANCEL_G4_RESOURCE_AMENDMENT_V3_1_2026-10-20.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `docs/design/slurm-workflows/SLURM_PROTECTED_CANCEL_G4_RESOURCE_AMENDMENT_V3_1_2026-10-20.md`
- **P15** — [native four-key schema versus six-key candidate](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/AMENDED_G4_EVIDENCE.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `results/hpc--slurm-cancel-production-closure/AMENDED_G4_EVIDENCE.md`
- **P16** — [bounded implementation repair](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/NATIVE_SCHEMA_REPAIR_EVIDENCE.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `results/hpc--slurm-cancel-production-closure/NATIVE_SCHEMA_REPAIR_EVIDENCE.md`
- **P17** — [current-visible-root vertical probe FAIL](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/MCP_VERTICAL_EVIDENCE.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `results/hpc--slurm-cancel-production-closure/MCP_VERTICAL_EVIDENCE.md`
- **P18** — [optional agent placeholder and pending/root identity](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/PENDING_BINDING_REPAIR_EVIDENCE.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `results/hpc--slurm-cancel-production-closure/PENDING_BINDING_REPAIR_EVIDENCE.md`
- **P19** — [unrelated Bash denied during guard drift; containment repair](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/P0_FAILURE_ISOLATION_EVIDENCE.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `results/hpc--slurm-cancel-production-closure/P0_FAILURE_ISOLATION_EVIDENCE.md`
- **P20** — [actual same-root confirm path](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/LIVE_CONFIRMATION_EVIDENCE.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `results/hpc--slurm-cancel-production-closure/LIVE_CONFIRMATION_EVIDENCE.md`
- **P21** — [second held Job; confirm wire and missing retain](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/REPLACEMENT_G4_EVIDENCE.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `results/hpc--slurm-cancel-production-closure/REPLACEMENT_G4_EVIDENCE.md`
- **P22** — [explicit user waiver and harmless real retain mapping](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/REVISED_G4_ACCEPTANCE.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `results/hpc--slurm-cancel-production-closure/REVISED_G4_ACCEPTANCE.md`
- **P23** — [formal release 5.5.2/0.5 closure](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/FINAL_RELEASE_CLOSURE.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `results/hpc--slurm-cancel-production-closure/FINAL_RELEASE_CLOSURE.md`
- **P24** — [final runtime qualification and outer scope guard](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/skills/tools/hpc/slurm-workflows/scripts/setup_protected_cancel.py)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `skills/tools/hpc/slurm-workflows/scripts/setup_protected_cancel.py`
- **P25** — [complete maintained result narrative](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/RESULT.md)；`5d4b1432f96742646e00ad279a054359b1aec1da` / `results/hpc--slurm-cancel-production-closure/RESULT.md`
- **C01** — [old production protection implementation](https://github.com/YuukiAS/AI_Skills_Collection/commit/b4815a35f708078184bff27b34f185fea6938cc3)
- **C02** — [v2.1 shim candidate implementation](https://github.com/YuukiAS/AI_Skills_Collection/commit/343628c896af90946f151ab1be993bc63114ebf2)
- **C03** — [replace shim with trusted host Hook](https://github.com/YuukiAS/AI_Skills_Collection/commit/577b1608e3a8335d7bd057b1584e5479ed5205aa)
- **C04** — [switch project-local to one global Hook](https://github.com/YuukiAS/AI_Skills_Collection/commit/da5e88bb6c1fb94e0cf66dd1d8409e9ab9fcf2c0)
- **C05** — [remove Slurm-specific permission profile](https://github.com/YuukiAS/AI_Skills_Collection/commit/4453808e02388725f47d3c0a278e5494fdd55478)

[R01]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_CRITIC_REVIEW_V0_1_2026-09-24.md
[R02]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_CRITIC_REVIEW_V0_2_2026-09-24.md
[R03]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_EXECUTION_CRITIC_REVIEW_V0_2_2026-09-24.md
[R04]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_CRITIC_REVIEW_V0_3_2026-09-24.md
[R05]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_CRITIC_REVIEW_V0_4_2026-09-24.md
[R06]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_CRITIC_REVIEW_V0_5_2026-09-24.md
[R07]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_EXECUTION_CRITIC_REVIEW_V0_6_2026-09-24.md
[R08]: https://github.com/YuukiAS/AI_Skills_Collection/blob/ce7f606e75dfa2bc7029b68655657c2d3d5b5d04/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_EXECUTION_PLAN_V0_6_2026-09-24.md
[R09]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-workflows-routing-refactor/PREFINAL_CRITIC_REVIEW_R1_2026-10-02.md
[R10]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-workflows-routing-refactor/PREFINAL_CRITIC_REVIEW_R2_2026-10-02.md
[R11]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-workflows-routing-refactor/PREFINAL_CRITIC_REVIEW_R3_2026-10-02.md
[R12]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-workflows-routing-refactor/PREFINAL_CRITIC_REVIEW_R4_2026-10-02.md
[R13]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-workflows-routing-refactor/INTEGRATION_RELEASE_CLOSURE_2026-10-03.md
[R14]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-race-policy-bounded-opt-in/RESULT.md
[P01]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_CANCEL_PROTECTION_PROPOSAL_V0_3_2026-10-13.md
[P02]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_PRODUCTION_CLOSURE_PLAN_V0_1_2026-10-16.md
[P03]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_PROTECTED_PARTITION_FRESH_CONFIRMATION_PROPOSAL_V1_2026-10-17.md
[P04]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_PROTECTED_PARTITION_CHAT_CONFIRMATION_PROPOSAL_V2_2026-10-18.md
[P05]: https://github.com/YuukiAS/AI_Skills_Collection/blob/38a76797439c6b29098aade7539270cbc51e8836/docs/design/slurm-workflows/SLURM_PROTECTED_PARTITION_CHAT_CONFIRMATION_EXECUTION_PLAN_V2_2026-10-18.md
[P06]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_PROTECTED_PARTITION_CHAT_CONFIRMATION_PROPOSAL_V2_1_2026-10-18.md
[P07]: https://github.com/YuukiAS/AI_Skills_Collection/blob/c3879065c782f1b0a03107a927bb3176a8788d02/docs/design/slurm-workflows/SLURM_PROTECTED_PARTITION_CHAT_CONFIRMATION_EXECUTION_PLAN_V2_1_2026-10-18.md
[P08]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_PROTECTED_PARTITION_CHAT_CONFIRMATION_EXECUTION_PLAN_V2_1_2026-10-18.md
[P09]: https://github.com/YuukiAS/AI_Skills_Collection/blob/b8ed6c3d3e40f5c32130e56f0b78ae7c9aea2772/results/hpc--slurm-cancel-production-closure/RESULT.md
[P10]: https://github.com/YuukiAS/AI_Skills_Collection/blob/1b8df2c1f2b93de1605d571f5125cd4aaa99fd20/results/hpc--slurm-cancel-production-closure/RESULT.md
[P11]: https://github.com/YuukiAS/AI_Skills_Collection/blob/1b8df2c1f2b93de1605d571f5125cd4aaa99fd20/skills/tools/hpc/slurm-workflows/scripts/setup_protected_cancel.py
[P12]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_PROTECTED_CANCEL_PORTABLE_RUNTIME_PROPOSAL_V3_2026-10-19.md
[P13]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/SESSION_AB_EVIDENCE.md
[P14]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_PROTECTED_CANCEL_G4_RESOURCE_AMENDMENT_V3_1_2026-10-20.md
[P15]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/AMENDED_G4_EVIDENCE.md
[P16]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/NATIVE_SCHEMA_REPAIR_EVIDENCE.md
[P17]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/MCP_VERTICAL_EVIDENCE.md
[P18]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/PENDING_BINDING_REPAIR_EVIDENCE.md
[P19]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/P0_FAILURE_ISOLATION_EVIDENCE.md
[P20]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/LIVE_CONFIRMATION_EVIDENCE.md
[P21]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/REPLACEMENT_G4_EVIDENCE.md
[P22]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/REVISED_G4_ACCEPTANCE.md
[P23]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/FINAL_RELEASE_CLOSURE.md
[P24]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/skills/tools/hpc/slurm-workflows/scripts/setup_protected_cancel.py
[P25]: https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/RESULT.md
[C01]: https://github.com/YuukiAS/AI_Skills_Collection/commit/b4815a35f708078184bff27b34f185fea6938cc3
[C02]: https://github.com/YuukiAS/AI_Skills_Collection/commit/343628c896af90946f151ab1be993bc63114ebf2
[C03]: https://github.com/YuukiAS/AI_Skills_Collection/commit/577b1608e3a8335d7bd057b1584e5479ed5205aa
[C04]: https://github.com/YuukiAS/AI_Skills_Collection/commit/da5e88bb6c1fb94e0cf66dd1d8409e9ab9fcf2c0
[C05]: https://github.com/YuukiAS/AI_Skills_Collection/commit/4453808e02388725f47d3c0a278e5494fdd55478


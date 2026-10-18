
# Delivery Assurance 架构层最终闭合研究 — GPT Work R0

你现在执行一次独立、穷尽、可否决的架构闭合研究。目标不是再提出宏观理念，而是把 Delivery Assurance 的生产架构定到“下一步 Codex 只需要按合同实现，不能再临场决定架构”的程度。

本轮只做研究、审计和最终架构合同，不修改 Bridge / AI Skills / consumer production source，不运行 R5 Phase 1，不启动 Windows 原生操作、Slurm/GPU、真实账号、付费调用或发布。

## 一、必须同时证明三件事

### 证明 A：架构完整

最终架构必须明确且唯一回答：

1. 每个 repo / 层负责什么；
2. Bridge / workflow-core / domain plugin / project owner / Executor / AI Skills Maintainer 的唯一 owner；
3. 每层交接的输入、输出、失败状态、恢复 owner；
4. 验收能力如何发现；
5. 新功能/新失败什么时候只加 regression，什么时候新建 Gate；
6. 新 Gate 的标准由谁决定，内容从哪里来；
7. 标准已冻结但 validator 缺失时谁自动实现；
8. validator 需要更新时谁改、谁不能改标准；
9. Gate 多时如何决定 NONE / TARGETED / BROAD / FULL；
10. 多产物、跨 repo、installer、native runtime、checkpoint/report 怎样绑定；
11. candidate / consumed target / evidence / claim 怎样绑定；
12. definition/version/runner/fixture/rubric 改变怎样使旧证据失效；
13. 如何禁止 Executor 通过改 threshold、fixture、rubric、adapter、evidence surface 自己制造 PASS；
14. TEMPORARILY_UNRUNNABLE / HUMAN_ONLY / environment gap / scientific NO_GO / validator bug / product defect 如何区分；
15. 新 repo 如何首次生成并维护 adapter；
16. 中央 domain/workflow/Bridge 更新后 managed consumer 谁适配；
17. LOCAL_SOURCE / INTEGRATED / ARTIFACT_READY / INSTALLED / LIVE 怎样逐层成立；
18. 用户只说“做这个功能”时系统完整路径；
19. 什么时候才需要用户；
20. 哪些内容必须在 Phase 2 Bridge 前冻结，哪些只能在 consumer adaptation 时决定。

禁止出现“实现时决定”“后续可扩展但无 owner/trigger”“由相关模块处理”“根据情况选择但没有判定条件”。任何职责不得有两个平级 authority owner。

### 证明 B：覆盖 CARE + 六仓库所有历史问题

必须逐条覆盖七项目 363 条历史问题：

- Lucerna
- Bobbio
- Mica-for-ChatGPT
- SeminarArc
- Asteria
- CUHK_Date
- CARE_Challenge

每一条都必须记录：

case id、原问题、source locator、当前证据强度、属于 existing-gate regression / validator hardening / validator missing / genuinely new project gate / genuinely new reusable domain gate / NON_GATE workflow mechanism / temporarily unrunnable / HUMAN_ONLY 中哪类、最终 gate family 或 NON_GATE mechanism、唯一 owner、normal entry、evidence class、affected claim level、TARGETED/BROAD/FULL、anti-gaming、should-not-change，以及为什么最终架构能阻止历史失败重现。

363/363 必须有 disposition，禁止 OTHER / MISC / TBD。

### 证明 C：自动架构推导的 Gate 与人工从历史问题总结的 Gate 实质一致

必须分三阶段，避免被现有 Proposal 反向引导。

#### Pass A：先人工归纳，禁止看当前 Gate 设计

第一阶段只读原始用户要求、363 条纯来源索引、source boundaries、七 repo 当前 AGENTS/代码/验收入口/失败证据、AI Skills 和 Bridge 的 owner contracts。

此阶段禁止读取：
- DELIVERY_ASSURANCE_PRODUCTION_CONTRACT_COMPLETION_PROPOSAL_V0_2_20261019.md
- DELIVERY_ASSURANCE_HISTORICAL_FAILURE_TO_VALIDATOR_MAP_V0_1_20261019.md
- DELIVERY_ASSURANCE_HISTORICAL_FAILURE_TO_VALIDATOR_MAP_V0_1_20261019.csv

独立得到人工 Gate families、NON_GATE 类、每个 family 的 owner / normal entry / evidence class / failure semantics / claim scope，以及哪些 case 只是同一 Gate 的 regression。

先写入并提交：
docs/research/software-production/17_DELIVERY_ASSURANCE_ARCHITECTURE_CLOSURE_GPT_WORK_R0/03_MANUAL_GATE_FAMILIES.md
docs/research/software-production/17_DELIVERY_ASSURANCE_ARCHITECTURE_CLOSURE_GPT_WORK_R0/03A_MANUAL_CASE_MAP.csv

完成并提交后才进入 Pass B。

#### Pass B：再读取 Delivery Assurance 当前设计

读取 frozen Proposal v0.2：
docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PRODUCTION_CONTRACT_COMPLETION_PROPOSAL_V0_2_20261019.md
frozen commit = 3868886b621cd77b180af8721b39d5c620dfb9e4

再读取当前 supporting map，作为被审对象而不是答案。

按 descriptor / impact classification / resolver / missing-gate / claim / adapter 规则，对同样 363 条独立推导架构应该选什么。

写入：
docs/research/software-production/17_DELIVERY_ASSURANCE_ARCHITECTURE_CLOSURE_GPT_WORK_R0/04_ARCHITECTURE_DERIVED_GATE_FAMILIES.md
docs/research/software-production/17_DELIVERY_ASSURANCE_ARCHITECTURE_CLOSURE_GPT_WORK_R0/04A_ARCHITECTURE_CASE_MAP.csv

#### Pass C：逐项比较

比较 capability、evidence class、normal entry、professional owner、PASS/FAIL semantics、claim scope，不比较名字。

允许合理合并/拆分，但必须用上述维度证明。

不允许：
- 人工认为必须有 Gate，架构给 NONE；
- 人工认为 NON_GATE，架构硬造产品 Gate；
- 架构按 repo 名/文件名/任务复杂度机械造 Gate；
- 一个巨大综合 Gate 吞掉不同 owner/evidence；
- 每个功能/历史问题各造一个 Gate；
- Gate 多就全量执行；
- 小修改漏掉真实 consumed target。

所有实质 mismatch 必须在最终架构合同中消解，否则不能 PASS。

## 二、第一阶段必须从原始输入开始

读取 YuukiAS/AI_Research_Toolkit 的 research/software-production-decision-20261013：

docs/research/software-production/12_COMPLEX_DELIVERY_REQUIREMENTS_INTAKE_20261015/PRO_INPUT/START_HERE.md
PRO_INPUT/01_USER_REQUIREMENTS_NO_SOLUTIONS.md
PRO_INPUT/02_OPEN_QUESTIONS_NO_ANSWERS.md
PRO_INPUT/03_HISTORICAL_FAILURES_SOURCE_INDEX.csv
PRO_INPUT/04_SOURCE_BOUNDARIES.md
05_ALL_363_CASES_SOURCE_INDEX.csv

同时读取 07_ALL_83_REQUIREMENT_COVERAGE_GATE.csv，作为 83 条用户要求覆盖清单，不把其中旧映射当答案。

## 三、必须读取最新生产 owner

AI_Skills_Collection@main：
- AGENTS.md
- docs/workflows/PLANNER_ROLE_CONTRACT.md
- docs/workflows/CRITIC_ROLE_CONTRACT.md
- docs/workflows/PLUGIN_CAPABILITY_GATE_POLICY.md
- docs/workflows/AI_SKILLS_MAINTENANCE_BOARD.md
- docs/plugin-todos/workflow-core.md 中 Final delivery must consume domain-owned self-QA before user-ready completion
- plugins/codex/plugins/workflow-core/skills/workflow/SKILL.md
- Frontend Design 当前正式 actual-surface / producer-self-QA 合同
- Presentations 当前最终渲染验收合同
- Research Authoring 当前 final-artifact / evidence / citation 合同
- Statistical Modeling 当前 estimand / assumptions / diagnostics / sensitivity 合同
- AI Skills Maintainer 的 update-impact / managed consumer adaptation 来源

GPT_Codex_AI_Bridge_Kit@main：
- AGENTS.md
- docs/TODO_LOCAL_AUTONOMOUS_ACCEPTANCE_WORKFLOW.md
- docs/V0_5_REVIEWED_HANDOFF_IMPLEMENTATION_SPEC.md
- AGENTS 指向的最新正式 runtime/recovery 设计
- Persistent Run / Control / Host Policy 与本任务直接相关部分

必须确认：
- Bridge 只拥有 runtime identity、candidate/evidence freshness、Stop/恢复；
- Local Autonomous Acceptance 仍 CLOSED / rescoped；
- Slurm/Persistent Run 不被 DA 重造；
- 不新增第四 workflow。

## 四、七项目必须读真实 repo，不准只看中央摘要

Repos：
YuukiAS/Lucerna
YuukiAS/Bobbio
YuukiAS/Mica-for-ChatGPT
YuukiAS/SeminarArc
YuukiAS/Asteria
YuukiAS/CUHK_Date
YuukiAS/CARE_Challenge

每个至少读取最新 AGENTS、当前正式 normal entry/acceptance runner、用户真实消费对象、足够的历史失败原始 locator，并判断当前是已有 validator、只有标准、只有报告、还是已被 supersede。

特别覆盖：

Lucerna：
状态真值、原生交互因果、actual surface、UI/文案整体质量、environment coverage、install/startup/upgrade/uninstall、fixture/live_state、candidate identity、Human Gate/desktop interruption 的 NON_GATE。

CARE：
重新审 F1–F6 是否合理：formal-entry fidelity、parameter/data causality、scale/population/budget、evidence completeness、resume equivalence、scientific conclusion/ablation。若拆分或合并，必须由 owner/evidence/entry/failure/claim 差异证明。

Bobbio：
Zotero isolation / roundtrip / native Reader / performance / Frontend / evidence package / independent review。

Mica：
actual host behavior、low-memory benefit、validator anti-forgery、candidate/evidence binding、Frontend/actual artifact。重点反证“validator 自洽但事实错误”。

SeminarArc：
installed blackbox、Android lifecycle、real media/OCR、visual/accessibility、stress/recovery、real-device coverage，必须识别 validator 假阴性。

Asteria：
scientific graph truth、browser geometry、mechanical metric validator、scientific visualization、whole-product review、deployed surface，重点反证硬编码指标/缺值=0。

CUHK Date：
registration critical path、one-time handoff transaction、persona isolation、web lifecycle、no-match truth、media/product quality、privacy、responsive/accessibility、CI/release truth。

## 五、最终架构的大框架

除非直接证据推翻，保持：

1. domain/project descriptor 决定“有哪些验收能力、什么叫正确”；
2. project adapter 决定“这个 repo 的哪些代码/target 变化属于什么语义影响”；
3. workflow-core Resolver 决定“本任务需要哪些 Gate、跑到什么范围”；
4. Executor 自动实现/更新已冻结且可机械化的 validator，并调用 normal entry；
5. domain/project owner 给专业 PASS/FAIL/UNKNOWN；Bridge 不评分；
6. Bridge 只做 task/repo/worktree/candidate/consumed-target/result identity、freshness、Stop/恢复；
7. AI Skills Maintainer 负责中央 descriptor/release/update-impact/managed-consumer adaptation；
8. 不建中央 Gate registry DB；descriptor 随 plugin/project 分发。

但以下算法必须彻底冻结。

### New Gate Decision

对新功能/新失败比较：
capability、evidence class、normal entry、professional owner、claim scope、failure semantics。

如果已有 family 都能覆盖：
NEW_GATE=NO
动作只能是 add regression / harden validator / add evidence。

只有至少一个维度真正不同且已有 family 无法合理表达：
NEW_GATE=YES。
先由 project/domain owner 冻结标准，再由 Executor 实现；有跨项目复用价值时再进入 AI Skills Maintainer 中央维护。

### Gate Content Decision

标准来源优先级：
1. frozen Goal/Plan；
2. project canonical contract / AGENTS / accepted design；
3. domain plugin 正式标准；
4. 历史真实 regression / known-bad；
5. implementation mechanics。

Executor 只能实现前四层已经冻结的语义，不能用测试代码反向创造标准。

每个 Gate 必须冻结 owner、applicability、subject/consumed target、normal entry、evidence class、PASS/FAIL/UNKNOWN、regression bank、known bad、should-not-change、invalidation、permission/cost/long-run、claim scope。

### Gate Scope Decision

NONE：
没有 acceptance-relevant product/artifact/scientific surface 变化，且当前 claim 不高于已有证据。

TARGETED：
改动可被稳定 target/dependency closure 隔离；不改 shared runtime/schema/router/generator/adapter/gate definition；不触及其它 sibling consumed targets。

BROAD：
改 shared runtime/schema/router/generator/adapter/validator definition；或多个 sibling targets 共享同一被改依赖；或局部 Gate 无法覆盖 blast radius。BROAD 只跑受影响产品族/依赖闭包，不是整个项目。

FULL：
仅在新 repo 首次 baseline；full release / installed/live whole-product claim；cross-repo aggregate completion；多 artifact family 无法安全拆分；真实历史证明 targeted/broad 对同一整体声明漏检；或 gate/adapter/schema 变化使项目级 applicability 整体不可确定。

“任务复杂”本身不是 FULL 条件。

### Impact Classification

必须合并：
- frozen Goal/claim；
- Delivery Target Graph；
- project adapter impact_rules；
- actual diff；
- dependency closure。

不能只靠 LLM，也不能只靠 glob。对每个 repo 给真实 path/target -> impact tag -> gate family 例子，并检查是否能表达 363 条 case。

## 六、完整责任与交接必须落成实现表

最终必须有一张无空白矩阵，每行包含：

capability、authority owner、execution actor、input、output、normal entry、failure state、next owner、user interruption condition、persisted location、invalidation condition。

至少覆盖：
goal/claim freeze、target graph、descriptor discovery、impact classification、required-gate resolution、new-gate decision、gate standard freeze、validator implementation、gate execution、domain/project judgment、result materialization、Bridge consumption、repair routing、claim aggregation、adapter bootstrap/update、domain promotion、central release/adaptation、long-run/Slurm、HUMAN_ONLY、environment gap、final completion。

任一格 TBD / implementation decides / owner later，架构 verdict 必须 REVISE。

## 七、输出文件

OUTPUT_ROOT =
docs/research/software-production/17_DELIVERY_ASSURANCE_ARCHITECTURE_CLOSURE_GPT_WORK_R0

必须生成：

README.md
01_ARCHITECTURE_COMPLETENESS_AUDIT.md
01A_ALL_83_REQUIREMENT_ARCHITECTURE_COVERAGE.csv
02_ALL_363_FAILURE_COVERAGE.csv
02A_REPO_GATE_FAMILY_SUMMARY.md
03_MANUAL_GATE_FAMILIES.md
03A_MANUAL_CASE_MAP.csv
04_ARCHITECTURE_DERIVED_GATE_FAMILIES.md
04A_ARCHITECTURE_CASE_MAP.csv
05_MANUAL_VS_ARCHITECTURE_COMPARISON.md
06_FINAL_ARCHITECTURE_CONTRACT.md
07_REMAINING_DECISIONS.md
08_PROPOSAL_V0_3_EXACT_CHANGESET.md

06_FINAL_ARCHITECTURE_CONTRACT.md 是核心产物，必须达到 Planner 可机械转写为 Proposal v0.3 的程度，不允许架构级 TBD。

07_REMAINING_DECISIONS.md：
如果架构闭合，architecture-level unresolved 必须为 NONE。允许 consumer-specific threshold/fixture/path、真实 Phase1/2 探针等非架构事实，但每项必须有 owner 和确定阶段。

## 八、最终 verdict 只有两种

ARCHITECTURE_CLOSED：
只有同时满足：
- 无架构职责/交接 TBD；
- 83/83 要求有具体机制和 owner；
- 363/363 case 有 disposition；
- 所有 material manual-vs-architecture mismatch 已消解；
- 无明显漏 Gate；
- 无机械、按功能名拆出来的蠢 Gate；
- scope resolver 能避免“小改全量跑”和“大改漏关键表面”；
- 不需要新 registry/database/daemon/workflow；
- R5 Phase 1 未被重开；
- 剩余只属于实现/探针/consumer adaptation。

ARCHITECTURE_REVISE：
任一条件不满足。

若 REVISE，不能只列问题；必须在 06_FINAL_ARCHITECTURE_CONTRACT.md 给出能关闭问题的完整修订架构。

## 九、禁止

不得运行或暂停 R5 Phase 1；
不得改 production source；
不得启动 Slurm/GPU/真实设备/真实账号/付费操作；
不得一条历史问题一个 Gate；
不得把所有 Gate 合成一个综合 Gate；
不得按 repo 名/文件名硬编码 Resolver；
不得让 GPT Work 自己取代 domain owner；
不得把历史问题默认当今天仍存在；
不得把历史已修问题从 regression bank 删除；
不得用文件/哈希/receipt 冒充真实能力；
不得新建中央 registry/database/daemon/workflow/state machine。

## 十、最终给用户的回答

只用自然中文说明：

1. 三个证明 A/B/C 分别 PASS/FAIL；
2. 架构是否可以停止继续设计；
3. 人工 Gate families 与架构推导 Gate families 是否实质一致，做了哪些修订；
4. 七 repo 最终各自有哪些 Gate families；
5. 是否还存在任何“Codex 实现时再决定”的架构空白；
6. 输出目录和最终 commit。

不要把 363 行 CSV 直接粘给用户。

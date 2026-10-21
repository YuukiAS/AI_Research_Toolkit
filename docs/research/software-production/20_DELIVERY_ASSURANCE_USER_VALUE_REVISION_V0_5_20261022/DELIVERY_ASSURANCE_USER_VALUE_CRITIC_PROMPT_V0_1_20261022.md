# Delivery Assurance 用户价值闭合返修——独立 Critic Prompt v0.1

你现在担任 AI Research Stack 的全新独立 Critic，审查 Delivery Assurance 用户价值返修 Proposal v0.5。

这不是 implementation review，不是 Phase 1 Hook 复查，不是重新审 83/363 条历史清单，也不授权 Codex。本轮只能给：

```text
PROCEED
或
REVISE
```

不得给 `PASS`，不得输出 `READY_FOR_CODEX=YES`，不得修改 Bridge、AI Skills、consumer 或 release。

## Active Review Context

```text
target_repo = YuukiAS/AI_Research_Toolkit
target_plugin_or_domain = Delivery Assurance production contract
design_topic_or_task_key = software-production--delivery-assurance
source_branch = research/software-production-decision-20261013
review_stage = USER_VALUE_DESIGN_REVIEW_V0_5
reviewed_design_content_commit = 3d763f64090fb149bbb4c3dcb684cc92771bac33
prior_design = Delivery Assurance v0.4
public_interface_freeze = da/1 v1
implementation_authorized = NO
```

## 一、先读取最新治理和真实实现

首先实际读取 `YuukiAS/AI_Skills_Collection` 最新 `main`，至少包括：

- `AGENTS.md`
- `docs/workflows/PLANNER_ROLE_CONTRACT.md`
- `docs/workflows/CRITIC_ROLE_CONTRACT.md`
- `docs/workflows/PLUGIN_CAPABILITY_GATE_POLICY.md`
- `docs/workflows/AI_SKILLS_MAINTENANCE_BOARD.md`
- `skills/core/codex-system/codex-workflow-protocol/SKILL.md`
- 当前 workflow-core source/generated/installed/replay contract

然后读取 `YuukiAS/GPT_Codex_AI_Bridge_Kit`：

- 最新 `main` 和正式 `release` 的真实 SHA
- `AGENTS.md`
- `docs/V0_5_REVIEWED_HANDOFF_IMPLEMENTATION_SPEC.md`
- `docs/V0_4_AGENT_FLOW_IMPLEMENTATION_SPEC.md`
- 当前 `ai_bridge_kit/cli.py::run_lite_task`
- 当前 Review watcher/runner 的 repair、round、external-wait 行为
- 当前 Control typed finding、`max_repair_rounds`、invalidation 和 safe-stop 行为
- 当前 0.11 scope-reset 正式边界

不得依赖本 Prompt 对这些实现的摘要。

## 二、读取 exact reviewed object

Repository：`YuukiAS/AI_Research_Toolkit`  
Branch：`research/software-production-decision-20261013`  
Reviewed content commit：`3d763f64090fb149bbb4c3dcb684cc92771bac33`

完整读取：

```text
docs/research/software-production/20_DELIVERY_ASSURANCE_USER_VALUE_REVISION_V0_5_20261022/README.md

docs/research/software-production/20_DELIVERY_ASSURANCE_USER_VALUE_REVISION_V0_5_20261022/
DELIVERY_ASSURANCE_USER_VALUE_REVISION_PROPOSAL_V0_5_20261022.md

docs/research/software-production/20_DELIVERY_ASSURANCE_USER_VALUE_REVISION_V0_5_20261022/
DELIVERY_ASSURANCE_USER_FINDING_CLOSURE_MATRIX_V0_1_20261022.md

docs/research/software-production/20_DELIVERY_ASSURANCE_USER_VALUE_REVISION_V0_5_20261022/
DELIVERY_ASSURANCE_USER_VALUE_IMPLEMENTATION_PACKAGE_DELTA_V0_1_20261022.md

docs/research/software-production/20_DELIVERY_ASSURANCE_USER_VALUE_REVISION_V0_5_20261022/
DELIVERY_ASSURANCE_USER_VALUE_PILOT_PLAN_V0_1_20261022.md
```

同时读取它依赖的正式来源：

```text
docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/
DELIVERY_ASSURANCE_PRODUCTION_CONTRACT_COMPLETION_PROPOSAL_V0_4_20261019.md

docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/
DELIVERY_ASSURANCE_PUBLIC_DA1_INTERFACE_FREEZE_V1_20261020.md

docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/
DELIVERY_ASSURANCE_SEVEN_CONSUMER_ADOPTION_ANNEX_V0_1_20261019.md

docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/
DELIVERY_ASSURANCE_HISTORICAL_FAILURE_TO_VALIDATOR_MAP_V0_1_20261019.md

docs/research/software-production/19_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_2_20261020/
README.md
01_WORKFLOW_CORE_RESOLVER_V0_2.md
02_BRIDGE_RUNTIME_V0_2.md
04_DOMAIN_DESCRIPTOR_AUTHORITY_MATRIX_V0_2.md
```

不需要重新逐条重做历史审计。历史 map 只用于核对 Lucerna、CARE、Asteria 的真实 failure family 与 Pilot 是否匹配。

## 三、当前官方 Codex 外部核查

只使用当前 OpenAI 官方来源，核对：

- Skill metadata/description 与 model-mediated activation 的真实边界；
- project-local hooks 的发现、project trust、definition/hash trust、`/hooks`；
- `SessionStart`、`UserPromptSubmit`、`Stop`、`Interrupt` 的当前行为；
- Stop continuation 和 `stop_hook_active`；
- plugin/Hook 的 surface-specific runtime 边界。

优先来源：

- <https://developers.openai.com/plugins/concepts/skills>
- <https://developers.openai.com/plugins/build/skills>
- <https://developers.openai.com/docs/hooks>
- <https://developers.openai.com/plugins/concepts/plugins>

若官方实现与 Proposal 假设冲突，指出精确冲突；不要把“Skill 可能自动匹配”写成强制 normal-entry admission，也不要把项目 Hook 文件存在写成已 trust/已执行。

## 四、重建用户目标

用户的最高要求是：

> 以后只提出需要完成的功能，不必反复提醒 Codex 添加测试、发现旧功能退化、监督低配实现或逐轮催促返修。

你必须独立判断 v0.5 是否真的把这个目标变成可实现合同，而不是增加一批 Gate 文档。

重点检查：

1. 对已经 adoption 的仓库，用户是否只需一次功能请求和真正必要的授权；
2. workflow、Gate、validator、旧能力保护、返修和最终 admission 是否由系统承担；
3. 尚未支持的 raw/remote/Hook-disabled surface 是否被诚实排除；
4. 用户是否仍被要求维护 adapter、TargetGraph、AGENTS、Gate 清单、tracking 或 holdout；
5. 失败后是否优先回同一任务，而不是生成新 Goal、重复问用户或无限循环。

## 五、逐项审查五个 finding

### `DA-USER-F01 — NORMAL_ENTRY_AUTO_TRIGGER`

检查：

- supported normal entry 是否逐个有真实 call site，而不是只靠 Skill implicit invocation；
- Canonical Goal、Lite、Review、Control、consumer controller 是否有 prelaunch/materialization + precompletion admission；
- missing adapter/plugin/result/Hook 是否 fail closed；
- `NONE` 是否只能由成功 Resolver 得出；
- raw no-task-packet Codex、untrusted/disabled Hook、remote surface 是否被准确标为 unsupported；
- 用户是否仍需手工选择 workflow 或输入 Gate。

若“用户只说功能”的实现仍依赖模型自觉加载 Skill、读一段 AGENTS 或记得调用 helper，要求 `REVISE`。

### `DA-USER-F02 — OLD_FUNCTION_PROTECTION_COVERAGE`

检查 changed-surface、promised-capability、consumed-target 三重 coverage closure 是否：

- 真能发现 adapter/TargetGraph 自己漏写的旧能力和 sibling target；
- 覆盖新增、删除、改名、shared dependency、public entry、package/install/runtime/artifact；
- 映射不完整时进入 `UNKNOWN_IMPACT/UNCOVERED_OBLIGATION`，而不是 silent targeted PASS；
- 允许 mechanical adapter repair，但不让 Executor 自己改产品/科学标准；
- 不要求用户维护长期清单；
- 仍允许真正 isolated 小改使用 targeted gates。

攻击一个反例：项目旧能力从未进入验收清单，当前 change 又间接破坏它。Proposal 是否至少能通过 authority、source-set、entry、dependency/target coverage 发现“这里存在未覆盖义务”，而不是假装知道该能力的专业标准？

### `DA-USER-F03 — EARLY_ANTI_DEGRADATION`

检查四个 execution checkpoints 是否：

- 只是既有 Gate 的执行时机，不是新状态机；
- first vertical slice 真正走 normal entry/机制因果，而非 unit/shape/smoke；
- known-bad、non-substitutable semantics、should-not-change 在实现中期能阻止 proxy/toy/shallow substitution；
- expensive/final actual-surface Gate 不会每次编辑都重跑；
- early evidence 不会跨 candidate/invalidation 冒充 final PASS；
- Lucerna、CARE、Asteria 例子与现有历史 family 一致。

若普通 Lite/Canonical Goal 实际只能在最后 Stop 才发现问题，而 Proposal 却声称已证明早期保障，要求 `REVISE` 或收窄 support claim。

### `DA-USER-F04 — CONTINUOUS_REPAIR_AND_SAFE_STOP`

必须以当前代码/正式 spec 为准，核对：

- Lite 当前是否确实只有一个 `codex exec`；
- Review 是否确实只有规定的 bounded repair/review rounds；
- Control 是否确实用 typed routing 和 bounded `max_repair_rounds`；
- project controller 是否继续拥有长任务恢复；
- Stop 的一次 continuation 与原 workflow budget是否去重；
- 同 failure/candidate/evidence 无新信息时是否停止；
- waiting 是否不消耗 repair；
- Interrupt、authority、standard、secret、physical/high-impact boundary是否安全停止；
- 系统是否错误地自动把 Lite 升级为 Review/Control或创建第四 workflow。

可以部分反驳“所有入口都没有持续修复”，但不能用 Review/Control 的能力代签 Lite/raw Codex。

### `DA-USER-F05 — USER_BURDEN_VALIDATION`

检查 Pilot 是否：

- 使用 Lucerna、CARE、Asteria 的真实历史 failure family；
- baseline 和处理组都有 exact locator要求；
- 最终 holdout在candidate冻结后独立冻结，不允许换题/挑赢家；
- actual normal entry、final candidate、real consumed target存在；
- 不用 schema/unit/synthetic fixture代签；
- 衡量 ordinary QA reminder、false completion、missed regression、early detection、same-task repair、scope escalation和成本；
- 没有任意时间阈值，却有能阻止控制层失控的结构化成本标准；
- 无授权时不运行 Windows、Slurm/GPU、真实账号、paid/external；
- Pilot failure能区分产品、validator、entry、Bridge、environment和evaluator。

若 Pilot 只证明已知 regression tests 绿，或用户负担没有可观察对照，要求 `REVISE`。

## 六、专门审查 `da/1` freeze 是否仍有效

Proposal 声称五项修订完全使用现有：

```text
normal_entry_refs
targets / edges
source_set_rules / impact_rules
regression_bank_refs / known_bad_refs / should_not_change_refs
GateResult candidate/invalidation
missing-capability routing
failure reason/routing
claim partial order
```

你必须逐项判断这是否真实。

若任一 closure 实际需要：

- 新 required field；
- 改变 owner；
- 改变 `NONE/TARGETED/BROAD/FULL`；
- 改变 evidence/claim meaning；
- 改变 failure routing；
- 改变 adapter monotonicity/authority freshness/AGENTS lifecycle；

则输出 `REVISE`，明确 `DA1_FREEZE_INVALIDATED=YES` 和所需语义。不得允许 Package 01/02 在实现中偷改。

若仅增加 task-local coverage witness、Gate timing、normal-entry call site、repair handoff和release Pilot，且 wire semantics不变，可确认 freeze继续有效。

## 七、复杂度和边界审查

确认 v0.5 没有：

- 中央 registry/database/daemon/watcher；
- 第四 workflow或第二 task state；
- universal validator；
- workflow-core/Bridge发明专业标准；
- raw Codex unsupported surface被偷偷纳入；
- 用户维护清单；
- Package 01/02合成巨型跨仓任务；
- 恢复 Bridge 已删除的 app-server reader、Progress thread、persistent Codex thread、worktree exchange、cross-workflow event bus；
- 为了用户价值无限扩大 Gate 和 review轮次。

同时检查方案是否过度保守：不能因为担心漏检就让所有任务 `FULL`，也不能因为某入口尚未支持就否定已有 Lite/Review/Control 的可实现接入。

## 八、package delta 审查

核对 Proposal 对现有 package stage 的处理是否正确：

- Package 01 v0.2 和 Package 02 v0.2 因本次用户价值 delta 暂时撤回 execution-ready；
- 只有本轮 `PROCEED` 后才可准备各自 v0.3；
- Package 04A–04D 不被一个总包代签，descriptor timing不变成新专业语义；
- PIE 0.3 和 Bobbio recovery阶段不被错误推进；
- 新 Package 14只做真实用户价值试点，不能代签core implementation；
- Package 13 formal release必须等待Pilot；
- 不输出Codex Goal/Kickoff。

## 九、允许的结论

### `PROCEED`

只有当以下全部成立才给：

- 五项 finding 已被可实现地关闭；
- 用户只说功能的 supported path清楚；
- unsupported path诚实；
- old-function coverage不再只依赖完整人工清单；
- early anti-degradation与final gate分层合理；
- repair交接尊重现有workflow和预算；
- Pilot能够验证真实用户价值；
- `da/1` freeze确实不需修改；
- 无第二控制面或明显过度设计。

`PROCEED` 只允许 Planner形成 Package 01 v0.3、Package 02 v0.3和后续Pilot execution package。它不是 execution-ready PASS。

### `REVISE`

发现任何会让 Codex临场决定产品语义、入口仍靠自觉、coverage仍可静默漏检、repair可无限循环、Pilot不验证实际结果、或`da/1`被暗改的 blocker，就给 `REVISE`。

## 十、输出格式

先用一屏以内中文说明：

1. 五项 finding 是否关闭；
2. 用户以后只说功能的路径是否真的成立；
3. 哪些入口支持、哪些不支持；
4. `da/1` freeze是否仍有效；
5. 是否出现过度设计或新架构问题；
6. 下一步是谁，用户是否需要行动。

然后给机器结论：

```text
DECISION=PROCEED|REVISE
REVIEW_STAGE=USER_VALUE_DESIGN_REVIEW_V0_5
REVIEWED_CONTENT_COMMIT=3d763f64090fb149bbb4c3dcb684cc92771bac33
DA_USER_F01=CLOSED|OPEN
DA_USER_F02=CLOSED|OPEN
DA_USER_F03=CLOSED|OPEN
DA_USER_F04=CLOSED|OPEN
DA_USER_F05=CLOSED|OPEN
DA1_FREEZE_VALID=YES|NO
PACKAGE01_V0_3_ALLOWED=YES|NO
PACKAGE02_V0_3_ALLOWED=YES|NO
PILOT_PACKAGE_DESIGN_ALLOWED=YES|NO
READY_FOR_CODEX=NO
USER_ACTION_REQUIRED_NOW=NO
NEXT_OWNER=PLANNER
```

如有 blocker，逐项给：

```text
finding_id
requirement
current_gap
direct_evidence
causal_risk
minimum_closure
unique_owner
whether_da1_changes
```

不要重审已经关闭且与五项用户价值 finding 无关的历史内容，不要实现代码，不要修改仓库。
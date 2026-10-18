# Delivery Assurance 最终修订架构合同（供 Proposal v0.3 转写）

本文件冻结实现责任和判定语义，不宣称这些机制已经部署。研究结论为 **ARCHITECTURE_REVISE**：修订合同可交 Planner 审查，但本轮人工归纳的来源隔离不足，不能签发独立一致性证明。03/03A 保留提交时原貌；04/05 明确区分原设计、修订推演与真实运行。R5 Phase 1 不在本轮执行或变更范围。

## C01 目标、边界和唯一权威

DA 是现有工作流的交付准入能力：把用户要求、实际消费对象、专业验收和可声明的完成范围连起来。它不接管项目任务管理，不增加第四种 workflow，不新建中央 registry、数据库、daemon、scheduler 或状态机。

| 层/仓库 | 唯一 authority | 决定什么 | 不决定什么 |
|---|---|---|---|
| GPT_Codex_AI_Bridge_Kit | Bridge | 原任务、repo/worktree/runtime/candidate/consumed target/result 身份与新鲜度；既有 Stop/恢复协议 | UI、科研、领域质量分数；另建 Slurm 调度器 |
| AI_Skills_Collection 的 workflow-core | workflow-core | 正常入口编排、影响合并、必需义务选择、声明聚合、按已冻结规则路由失败 | 改领域标准、授权付费/设备操作、替代专业判断 |
| 各 domain plugin | 该能力的唯一专业 owner | 领域正确性、证据充分性、专业 PASS/FAIL/UNKNOWN；复用 descriptor 的语义 | 项目任务状态、资源授权、项目未知业务含义 |
| consumer repo | 项目 owner | 本项目目标图、adapter、项目专属能力与参数；实际产品/科学语义 | 随意削弱 domain 标准、借 adapter 排除已冻结义务 |
| 现有任务 Executor | 现有执行者 | 依冻结合同实施、采集、调用正式入口、机械 validator 实现/修复 | 用测试代码决定新标准；自行提升证据级别 |
| AI Skills Maintainer | AI Skills Maintainer | 中央描述文件生成/发布、正式 release、update-impact、managed consumer adaptation | 替各 consumer 宣告实机通过、替项目决定科学阈值 |
| 现有 Lite/Reviewed/Control controller | 被选中 workflow 的现有 controller | 当前状态、轮次/预算、合法继续与暂停 | 被 DA 再建一份 CURRENT 或预算 |
| 用户 | 当前用户 | 真实授权边界、不可推导的目标取舍、科学实质替换 | 维护描述文件、代执行者做普通自检 |

`PROJECT`、`DOMAIN`只允许出现在模板，进入 resolve 前必须绑定为一个明确 authority_ref。业务参数由项目 owner 冻结，领域最低标准由 domain owner 冻结；它们是不同字段的权威，不能对同一字段保留两个平级裁决者。冲突按 C04 返回对应标准 owner；workflow-core 不投票、不取平均、不“选更严格者”。主 Codex 仍负责集成；本合同不要求新增审查角色或子代理。

## C02 正常入口和能力发现

### 接入点

在已选定的 Lite/Reviewed/Control 正常入口中，workflow-core 增加一个无常驻进程的 DA 调用模块。调用点固定为：任务目标冻结后、首条真实纵向链前后、候选或标准身份改变后、准备停止/报告完成前，以及发布/昂贵运行的既有授权入口前。前置调用产出计划与授权缺口；后置调用只消费实际结果，不把计划视作完成。

输入来自现有 task packet 和 Bridge 身份；输出回写该任务的证据引用区域。DA 不启动第二个任务，不根据 hook 收到消息便推断有权控制会话。Windows App、服务器 Codex 各自必须证明“原生用户消息→现有受管入口→DA→同任务结果”整条链。入口不存在或宿主不能拦截时，报告 `UNSUPPORTED_WITH_EVIDENCE`，保留现有合法交接入口和确切未证明范围；不能称自动接管已完成。R5 对宿主/Stop 的实机证明仍由原 R5 任务承担，本合同既不重开也不代签。

### 发现算法

1. 从当前 Codex 身份的已安装且启用插件清单取得确切 package root、版本和来源，不能搜索任意 home 或相邻 CODEX_HOME。
2. workflow-core 自己读取这些已知 root 下可选的 `delivery-assurance/gates.toml`；这是随包支持文件，**不要求 Codex 原生理解新的 plugin.json 字段**。清单不可获取即记录发现能力缺口，不能把结果当“没有 Gate”。
3. 项目读取 `automation/delivery_assurance/ADAPTER.toml`，其中显式列出所需 domain capability_refs；再读取同目录的 `gates.toml` 项目专属描述。路径必须在已绑定项目或包 root 内；禁止 symlink/reparse 越界、任意远程脚本和隐式安装。
4. 需要的 capability 未发现时，进入 C08；未启用的插件不能偷偷启用。没有 DA 描述的普通插件不构成错误，但任务要求的能力不能因此消失。
5. 按完整 gate_ref、schema、definition_digest 解析；同名不同来源不覆盖，重复且完全相同可去重，版本/定义冲突返回 owner。生成的是任务内可重建快照，不是中央 registry。

官方文档当前描述了 root `plugin.json`、OpenAI extension 和兼容 `.codex-plugin/plugin.json` 的关系，并未为本方案提供 DA 字段语义。上述固定随包路径是本合同的集成选择，不声称平台天然支持。[OpenAI 插件打包文档](https://developers.openai.com/plugins/build/plugins)

## C03 数据模型和最小持久化

schema 的 wire version 为 `da/1`。下面的对象是现有 task packet 的附属材料；不是新的任务状态。字段类型、枚举和拒绝条件由 workflow-core 维护，Bridge 只消费身份相关子集。未知 major version 拒绝消费并限制 claim；未知可选字段保留但不影响判定；缺必需字段不得默认成功。

### Gate descriptor

| 必需字段 | 类型/约束 |
|---|---|
| gate_ref | `domain:<plugin>/<capability>` 或 `project:<repo-id>/<capability>`；稳定且唯一 |
| schema_version / definition_version | `da/1` / owner 递增的语义版本 |
| authority_ref / authority_contract_ref | 单一专业 owner ID / 不可变标准来源引用 |
| capability / failure_semantics | 正面能力和失败意味着什么；不能只写检查文件存在 |
| applicability | C05 有限谓词；未知字段禁止默认为 false |
| subject_types / target_roles / claim_support | 明确消费对象类型、角色和可支持的声明 |
| normal_entry | kind、root_ref、entry_ref、参数 schema；命令用 argv，不执行拼接 shell |
| evidence_requirements | modality、fidelity、observer_requirement、required_observations、completeness_rule |
| judgment | PASS、FAIL、UNKNOWN 的可检查条件；rubric_ref、阈值参数约束 |
| regression_bank / known_bad / should_not_change | 不可变 refs；每项有来源和适用面，不能以空集合假装校准 |
| invalidation | C11 的依赖集合及环境/时间有效性规则 |
| execution_requirements | permissions、cost/resource ceiling、secrets classes、physical target、long_run、side_effects；允许显式空集合 |
| calibration_requirement | 正例/真实坏实现/缺证据的预期；允许机械与专业混合判断 |

`definition_digest`由规范化后的**语义投影**计算：TOML 解析为 JSON，键按字典序、集合字段排序、UTF-8、无无关空白，SHA-256；排除 digest 自身、注释、显示排版和本次输出链接。语义字段仅用字符串、布尔、整数、数组和对象；带小数的阈值以规范十进制字符串存储，不接收NaN、浮点特例或隐式日期类型。semantic projection 包含全部判定、适用、权限和引用内容 digest。引用只能固定 commit/blob/digest，不可用可移动 main 作冻结标准。不得把含自己 digest 的文件再次哈希作为定义，避免自引用。

### Adapter

`ADAPTER.toml`包含 schema_version、repo_identity、authority_ref、canonical_contract_refs、normal_entry_refs、capability_refs、targets、edges、impact_rules、parameter_bindings、source_set_rules、environment_profiles 和 adapter_semantic_digest。每个 binding 有类型、来源、允许范围；不接受自由文本覆写 PASS。adapter 是项目语义映射，不放 Gate 实现代码、不复制 domain rubric。

### 任务内材料

默认相对路径为现有 packet 下 `delivery_assurance/`，其中 `resolution.json`、`targets.json`、`claim.json` 是本轮内容快照；`runs/<run_id>/<gate_instance_key>.json` 是不可覆盖结果。现有 packet 不支持子目录时，由其既有 evidence_refs 引用项目 `results/<task-id>/delivery_assurance/`。这个选择只取决于既有 packet 是否允许 evidence 子目录，不能创造新任务根或第二份 CURRENT。

`run_id`为随机 UUID；`gate_instance_key`为 gate_ref、definition_digest、subject_set_digest、target_set_digest、normal_entry_digest 的规范化哈希。多个设备/语言/浏览器/进程并行运行不得共写 `gates/<gate-id>.json`。写临时文件、校验完整 schema 后原子提交；崩溃残片不进入 evidence_refs。最新材料仅由现有 packet 引用指向，不能扫描目录挑最新绿灯。研究表中的 case_id 只用于追溯，**不进入 runtime Resolver 的选择分支**。

## C04 标准来源、六维新 Gate 决策与冲突

标准来源优先级固定为：冻结 Goal/Plan → 项目 canonical contract/AGENTS/accepted design → domain 正式标准 → 已核实历史 regression/known-bad → implementation mechanics。最后一层只能实现已有语义。高优先级不能隐式豁免机器权限；Goal 明确要求降低已有领域最低标准时，须由该领域 owner 裁决是否仍可支持原 claim，不能由 Executor 隐藏冲突。

六维元组为 `(capability, evidence requirements, normal entry semantics, professional owner, failure semantics, claim scope)`。

* 既有 family 能用已有受控参数表达全部六维义务：`NEW_GATE=NO`。只有 add regression、harden validator、add evidence 三种内容动作；运行故障另按 C08/C12 路由。
* 仅新按钮、路径、语料、错误码、阈值数值、版本或 repo 名不同：不成立新 family。normal entry 的“语义”指真实用户路径和观察层，不是文件改名。
* 至少一维存在既有 family 无法表达的实质差异：先记录不兼容维度与反例，由项目 owner 冻结 project gate；已有正式 domain owner 覆盖该能力时由它冻结 domain 标准。不能因为“有一维相同”就拒绝必要 Gate，也不能只因一维文本不同就创建。
* 同时覆盖两个 owner 或两种不同含义的失败，不合成一个总 PASS；保持独立结果，聚合层组合。
* 只有两个已指名 consumer 具有相同六维语义且经各自适配验证，才触发复用晋升评估。AI Skills Maintainer 负责迁移/分发，专业 owner 仍拥有标准；单项目不得先建抽象平台。二者只是晋升触发条件，不是固定 Gate 数量或测试数量。

冲突处理：同一义务的两份标准不同→记录来源、冲突字段和最小反例→返回该字段 owner→原任务等待其新决策。在此期间只保留两者都允许的较低范围 claim；没有交集则不准该 claim。禁止选择“更严格且可执行”的一份，因为更严可能科学错误，可执行也不等于有效。

## C05 影响分类和可执行谓词

Resolver 的事实输入是冻结 Goal/claim、目标图、adapter impact_rules、actual diff、依赖闭包的并集。每个事实带 source_ref、confidence=`observed|declared|unknown`；LLM 可提出语义标签，必须由合同/adapter/实际变化支持，不能成为唯一权威。glob 只负责找候选影响，不证明未匹配文件安全。

actual diff 的边界固定为批准 baseline 到候选的全部已提交差异，加当前 staged/unstaged 和相关 untracked 文件；包括删除、重命名、生成器及生成物、配置、依赖锁文件、schema、资源和标准/测试变更。记录 base/head/tree 和 dirty overlay digest。只查当前 `git diff` 会漏已提交修改，禁止用作完整保护集合证明。无关 dirty 用户工作只记存在及排除依据，不擅自清理或纳入构建。

impact_rules 使用相对 repo 路径的 POSIX glob（`*`不跨目录，`**`可跨目录，大小写按实际文件系统显式记录）；同时可匹配 target ID、dependency edge、surface kind、contract change。路径重命名按旧/新两边匹配。命中规则的 tags/targets/obligations 取并集，不能 first-match 覆盖。未命中的 acceptance-relevant 变化进入 unknown impact，不是 NONE。

适用谓词只允许 `all`、`any`、`eq`、`in`、`intersects`、`exists`，作用于有类型的 `change_tags,target_types,target_roles,claim_kinds,environment_profiles,risk_tags`。采用三值逻辑：all 含 false 为 false，否则含 unknown 为 unknown；any 含 true 为 true，否则含 unknown 为 unknown。必需字段缺失使该谓词 unknown。`exclusions`必须有同一标准 owner 的来源和明确替代覆盖，不得排除 Goal 明文要求；不允许任意 Python/shell 谓词。

影响传播沿“provider→consumer”方向到真正消费对象，直至冻结 claim 的目标集合闭合。共享 router/schema/runtime/generator 改动传播至依赖它的兄弟目标；改变 report renderer 不能反向宣布训练重跑，除非原始科学数据也失效。目标依赖已知且局部未知→BROAD 覆盖该闭包；项目级关系不明→FULL 覆盖冻结全局目标，同时要求修 adapter。FULL 不能修复缺失的目标图，也不能把 unknown 自动判成 PASS。

## C06 Resolver、范围和执行成本

执行次序必须如下，不允许先挑便宜且能通过的 Gate 再反推 claim：

```text
resolve(frozen_task, graph, descriptors, adapter, actual_diff, prior_results):
  validate_identity_schema_and_authority()
  obligations = union(goal_success, claim_requirements, domain_minimums,
                      changed_surface_requirements, should_not_change)
  impact = close_dependencies(union(goal, graph, adapter_rules, actual_diff))
  applicability = evaluate_three_valued(descriptors, impact, obligations)
  required = cover_every_obligation_with_compatible_gate_instances()
  reject_missing_or_conflicting_coverage(); do_not_drop_unknown()
  scope = classify_scope_using_rules_below()
  select_tests_and_evidence_for_scope(required)
  reuse = only_results_passing_C11_for_exact_obligations()
  work = required_coverage_minus_valid_reuse
  preflight_permissions_environment_and_cost(work)
  persist_reasons_and_execute_only_authorized_work()
```

coverage 不是按数量求最小 set cover。只对**相同定义、同一 subject/target、同一入口/证据要求**去重；一个执行可产出多个专业结果，但各义务分别裁决。替代 Gate 必须有标准 owner 冻结的六维等价声明，不由 Resolver 猜测。普通单元测试照常存在，不必为每个单测注册 Gate。

| scope | 必要判定条件 | 执行范围 |
|---|---|---|
| NONE | 无 acceptance-relevant product/artifact/scientific 变化；无 claim 提升；已有证据仍有效；impact 完整可确定 | 不运行 DA 产品 Gate，保留理由和普通必要检查；纯咨询/内部记录编辑可成立 |
| TARGETED | target/dependency closure 稳定可隔离；不改 shared runtime/schema/router/generator/adapter/gate definition；不影响 sibling target | 受影响状态、正例/坏例及应保持能力；不等于只测改动一行 |
| BROAD | 改共享依赖、adapter/validator 定义；影响多个 sibling targets；或局部覆盖不足 | 受影响产品族及依赖闭包；不扩大到无关项目/设备 |
| FULL | 首次 baseline；whole-product release/installed/live；cross-repo aggregate；多 artifact 无法安全分拆；历史确证该整体 claim 的局部选测漏检；或项目级 applicability 因 schema/adapter 变化不可确定 | 冻结 aggregate 目标和所有必需义务的完整覆盖；不是全仓所有测试、所有机器重跑 |

高层 whole-product claim 即使是“小改”也需 FULL **覆盖**；未受影响且 C11 仍有效的证据允许复用。Gate 多、代码行数多、任务耗时长、模型说复杂，都不构成 FULL。历史已知整体漏检针对同一 aggregate 和失效机制生效，不永久把全项目锁为 FULL。

成本按既有 task budget 控制，记录新采集/重判/复用的原因、耗时、调用和计量可得范围。先运行便宜且具有阻断意义的前检和首条真实纵向链；已出现会使昂贵运行失去意义的缺口就停止相应依赖，其他独立工作继续。未授权 GPU、桌面、真实账号、外部传输、付费不会因 scope=FULL 自动获权。

## C07 Delivery Target Graph 和身份绑定

节点字段：`target_id, repo_identity, role, subject_kind, source_ref, material_digest, environment_profile, observed_identity, claim_ceiling`。target_id 稳定指代角色；每次实际字节/运行状态另有 immutable observation。类型包括 source、build artifact、installer/package、installed instance、deployed runtime、dataset snapshot、checkpoint、prediction/GT、report/document。作业 job ID 是执行来源，不能冒充 checkpoint 或科学结果。

边方向一律为输入/生产者→消费者，枚举 `BUILDS,PACKAGES,INSTALLS,DEPLOYS,DOCUMENTS,CONSUMES,INTEGRATES`。每条边附 producer/consumer identity 和对应关系证据；source hash 相同不能凭空证明已安装。build/package 边必须无环；真实 runtime 消费环允许，但 Resolver 将强连通分量作为不可拆的影响单元，只在该分量内扩大到 BROAD；分量涉及冻结全局 aggregate 才触发 FULL。不能因存在环无限遍历或自动拒绝全部真实系统。

跨 repo INTEGRATES 还要求协议/schema/依赖版本兼容性观察，不能把双方各自绿灯加起来当集成成功。installer 绑定其内嵌payload、安装后文件/进程和配置迁移；native instance 绑定机器、实际文件digest、PID+start time、窗口/控件身份与采集时间；扩展绑定实际加载包和浏览器profile；部署绑定服务版本/配置、URL及观察窗口；dataset/医学输出绑定split、来源、空间/标签语义和隐私受限内容引用。

候选 identity 记录完整 commit/tree 和验收语义源集合 digest。报告、状态回执、只含证据引用的提交在被冻结 source_set_rules 排除时不会改变科学/产品候选；排除清单不得临场扩展。改变构建输入、执行脚本、配置、科学资产或依赖则必须改变 candidate fingerprint。这解决“提交报告→review target变了→再交报告”的循环，同时保留审计提交链。

动态 runtime 在观察开始、结束、最终 claim 消费时检查身份。期间部署/配置漂移使受影响结果过期；观察没有持续服务保证时，LIVE 只声明该时间窗口，不承诺永久在线。

## C08 缺能力、缺 validator 和可运行性

| capability 状态 | 判据 | 唯一下一责任 | 合法动作 |
|---|---|---|---|
| AVAILABLE_RUNNABLE | 标准、实现、环境与授权满足 | Executor | 调 normal entry；结果由对应专业 owner 规则裁决 |
| STANDARD_FROZEN_IMPLEMENTATION_MISSING | 正确性语义与正/坏/缺证据条件已冻，只有机械程序缺失 | Executor | 在任务授权范围自动补 validator；C09 校准后调用；不重问标准 |
| NEW_PROJECT_ACCEPTANCE_CATEGORY | C04 六维证明项目现有family无法表达 | project owner | 冻结标准与最小成功/反例，回到同任务实施 |
| REUSABLE_DOMAIN_CAPABILITY_MISSING | 已有 domain 责任但标准/入口不足，或达到晋升条件 | domain owner | 冻结专业内容；Maintainer分发，项目按C14适配 |
| TEMPORARILY_UNRUNNABLE | 已知标准/入口，但当前工具、服务或授权窗口暂缺 | project environment owner | 有界修环境或保留等待；不得写 PASS 或换证据级别 |
| HUMAN_ONLY | 必需事实/动作只有用户有权或有能力提供，且无合法替代 | 用户 | 一次明确说明具体目标、边界、已有进度；暂停依赖动作 |

上表是 descriptor/计划的诊断标签，不能新增 Bridge workflow enum。环境不可达不自动成为 HUMAN_ONLY：先按现有规则分类为 AGENT_RESOLVABLE、UNSUPPORTED_WITH_EVIDENCE、OPTIONAL_NOT_REQUIRED_FOR_CURRENT_CLOSURE 或 SAFETY_OR_AUTHORITY_BLOCKER。可选环境缺口只限制相应 claim；必需环境缺口保留原任务恢复位置。

## C09 防自签、校准和专业判断

Executor 可以新增/修复实现，不能在同轮自行改动阈值、rubric、golden/fixture预期、适用规则、保护集合、adapter语义或证据表面来取得 PASS。上述字段变化须产生 semantic diff、旧标准下结果、变更理由和对应 authority 的冻结记录。既有用户批准的标准直接复用，无需把每次维护升级成人工审批。

标准 snapshot、review target、observer/runner、fixture、raw evidence 分别绑定。允许同一专业角色按正式合同做 producer-self-QA；这不自动成为独立或受保护判断。证据标明 `observer_requirement=producer_self_qa|independent_review|protected_observation`。若任务要求受保护观察而执行者能同时改标准、程序和全部证据，结果最多是诊断性观察；签名、hash、另一会话都不能单独改变这个结论。使用已有 Reviewed reviewer/Control Verifier或已有隔离可信runner，不创设第四工作流。不可用时正确 UNKNOWN，不能编造独立观察。

validator 投产/语义变更须在同一冻结任务族检验：正常正确样本可通过、历史真实坏实现必须失败、缺关键观察必须弃权。坏例包含实际生产路径故障或错误产物，不能只有删JSON字段。报告样本来源、漏检、误拒、正确弃权及适用族；领域 owner 根据既有准入标准裁决，不发明固定“20例”或统一精度阈值。历史 STAT5060 10个坏例只识别2个的记录保留为检出不足反例，不能靠扩大prompt声称解决。

validator bug 有正例证据时先修观测/判分，不能为了迎合错误selector或错误科学阈值把产品改错。修判分后保留旧结果为 superseded，给出新判分与原因；若原始采集就错，必须补采。已修历史 case 永久保留回归义务，但不写成当前仍存在缺陷。

不建立“验收器的验收器”无限层级：当前专业 owner 使用冻结校准集和原始事实裁决一次，争议进入其既有review/Planner机制，沿用既有轮次/预算。重复无进展不能靠新Goal重置。

## C10 Result envelope 与证据含义

每个结果至少包含：schema_version、task/workflow identity、run_id、gate_instance_key、gate_ref、authority_ref、definition_digest、adapter_semantic_digest、candidate/source-set identity、subject/target identities、normal_entry/runner/fixture/rubric digests、observed_at和environment、decision、reason_codes、obligations covered/missing、evidence_refs、invalidation fingerprint、actor/observer provenance、scope、cost/time、claim_support。

`decision`仅 PASS/FAIL/UNKNOWN。证据同时有三轴：

* modality：source inspection / structured runtime / actual surface / interaction trace / rendered artifact / causal intervention / protected observation；可组合，不能相互偷换。
* fidelity：synthetic fixture / controlled real runtime / host-derived / actual installed target / actual deployed target / physical device / scientific population。不是全局线性排序，真实native配fake Zotero仍不能证明真实Zotero。
* observer provenance：producer-self-QA / independent-review / protected-observation，并记录其实际权限与材料可见范围。

PASS要求本实例全部正面义务、保护义务和要求的证据轴满足；观察到反例为FAIL；缺证据、身份错、标准冲突或测量无效为UNKNOWN。FAIL有明确产品事实时不因另一些证据缺失而被稀释成UNKNOWN；两类原因都记录。报告不可只含总体绿灯。

可借鉴 in-toto Statement 的 subject+predicate 绑定思想，但不要求引入新签名基础设施；绑定只说明这份判断指向哪些字节，不证明判断真实。[in-toto Statement](https://github.com/in-toto/attestation/blob/main/spec/v1/statement.md)

## C11 失效、复用和防止证据漂移

| 变化 | 失效对象 | 最小必要动作 |
|---|---|---|
| 产品/科学源、依赖、配置、数据、构建输入 | 依赖闭包内 subject/target 的观察与判断 | 重建/重采受影响路径；独立目标有效结果可复用 |
| descriptor applicability、claim scope、adapter影响关系 | required-gate resolution及受影响覆盖判断 | 重新resolve；范围局部BROAD，项目级未知FULL；不是无条件重采所有原始证据 |
| rubric/threshold/专业定义 | 旧 judgment | owner冻结后对仍完整可信的raw重新判分；raw不足才重采 |
| runner/collector/selector/测量算法 | 该程序产生的观察与判断 | 证明只改判分可重判；否则补采；校准负例复跑 |
| fixture/golden/known-bad来源、数据预期 | 依赖这些输入的校准与结果 | owner确认语义；重跑受影响校准/路径，不能自动接受新golden |
| environment/profile/device/host version/权限或服务版本 | 依赖该环境的观察 | 重新前检与相应采集；不把target-class提升physical |
| 仅排版、显示文字或证据回执提交，semantic projection不变 | 不改变原专业判断 | 记录内容变化及复用理由；若显示文字本身是交付对象则属于产品变化 |

复用须同时匹配：义务、subject/target、标准、语义源、入口/runner/fixture/rubric、环境有效条件、observer要求，且无已知反证。任一缺失即不得无条件复用。raw可复用与旧PASS可复用分开记录。新标准的 known-bad若证明旧验收存在系统性漏检，追溯并标记受影响旧结果，不能继续从缓存提升claim。

## C12 失败归因、恢复与科学 NO_GO

以下是 result reason，不是新任务状态。workflow-core按原因路由，现有controller决定合法状态迁移。

| 原因 | 判据 | 恢复owner/动作 | 对交付的影响 |
|---|---|---|---|
| PRODUCT_DEFECT | 同目标合法观察违反冻结标准 | Executor修产品，原专业owner复查 | 对应义务FAIL；不关闭整个无关任务族 |
| VALIDATOR_BUG | 正常样本被误拒、错误selector/统计、假阳性检测器被反例推翻 | 该Gate owner定判分语义，Executor修机械实现 | 受影响旧判定撤销/重判，不逼产品改错 |
| EVIDENCE_GAP | 必需产物/观察缺失或不完整 | Executor/既有collector补齐 | UNKNOWN；不以文件存在补齐内容 |
| ENVIRONMENT_GAP | 依赖/工具/服务未满足而产品未得到有效测试 | 项目environment owner | 修环境后原入口再跑，不机械重训 |
| AUTHORITY_REQUIRED | 当前授权不含必需真实副作用 | 用户 | 只停依赖动作，保留同任务位置 |
| TEMPORARILY_UNRUNNABLE | 必需入口暂不可用且存在可恢复路径 | 项目environment owner/现有controller | 等待或有界恢复；可选部分不阻全局 |
| SCIENTIFIC_NO_GO | 方法、数据、预算充分且证据支持负结论 | 科学project/domain owner，科学决策归现有Planner | 科研执行/报告可合格；不能宣称性能成功，也不强迫训练到正面 |
| STANDARD_CONFLICT / IDENTITY_MISMATCH | 标准相斥或消费身份不匹配 | 前者标准owner；后者Bridge | 对应claim UNKNOWN；保留可核验来源 |

每个阻塞项附原合同、事实证据、因果风险、最小关闭条件、下一责任和恢复入口。工具文件打不开、终端丢输出、报告上传失败优先修这一层，不改产品指标。沿用原任务的review/repair/resource预算。外部Reviewer/Planner等待按现有合同处理，纯等待不耗repair轮；没有真实自动唤醒接口就写明需人工返回，不承诺无人值守续跑。

## C13 Claim 偏序与最终准入

claim 是 `(target_set, capability_set, environment, time_window, level)`，不是全仓一个布尔值。

| level | 成立条件 | 不能推出 |
|---|---|---|
| LOCAL_SOURCE | 当前源/配置/局部必要检查及范围义务有效 | 已合并、已构建、用户能用 |
| INTEGRATED | 已绑定正式集成目标；相关跨组件/跨repo接口检查成立 | 已安装/部署 |
| ARTIFACT_READY | 构建/导出物与候选绑定，内容/完整性/专业质量检查成立 | 用户环境已加载该产物 |
| INSTALLED | 精确安装目标、运行身份、生命周期和必要实际路径成立 | 服务生产URL可用、全部硬件/环境可用 |
| LIVE | 精确实际部署/宿主/科学正式运行对象的必要路径和证据成立，注明窗口 | 不限时健康、其他机器同样通过 |

LOCAL_SOURCE→INTEGRATED→ARTIFACT_READY 是常见软件链，按目标图选择适用前提；INSTALLED与LIVE不互相代替，也不要求每份PDF都安装。科研checkpoint/report的ARTIFACT_READY必须包括领域证据和实际生成来源，不能跳过科学Gate；LIVE指正式执行/消费事实，不是论文结论“正确”的同义词。科学结论单列domain outcome。

`USER_READY`仅是本任务所有承诺目标在各自所需level满足后的聚合判断，不新增通用更高证据等级。任一必需义务FAIL/UNKNOWN不可聚合为ready；可选义务明确列为未承诺/未证明，不掩盖它。声明降级只有原任务允许部分交付时可作为部分结果，不算原目标完成。domain self-QA完成、独立review完成、最终用户验收完成分别列出；前者不能代签后者。

CI总体绿灯只是一项输入。GitHub允许 skipped/neutral/success 满足某些required-check条件，因此必须消费必需job的实际执行与专业结果，不能由CI颜色推导产品PASS。[GitHub required checks 文档](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks)

## C14 新 repo、中央更新与 consumer adaptation

首次接入由Executor从当前AGENTS/canonical contracts、正式入口、构建/交付目标生成最小adapter草案。项目owner只裁决未知业务语义、target边界、参数和用户目标；机械路径发现、schema补齐由Executor完成。对未映射acceptance-relevant文件做反例检查，不允许空adapter默认NONE。第一次baseline使用FULL覆盖，执行仍受既有授权；拿不到真实环境就记录对应UNKNOWN，不能为接入而启动未授权设备。

维护触发固定为：目标/入口/依赖变化、新功能六维差异、未映射变化、重复漏选、domain定义升级、适配schema升级。语义变化由项目owner冻结；机械路径/新增已知case由Executor维护。AGENTS只保留正常入口与权威locator，合并重复规则，迁移旧文档时保留历史链接与安全/科学语义，不能越权删除。

中央descriptor与plugin随正式release分发。AI Skills Maintainer解析root CHANGELOG的Update impact，按现有managed consumer清单和插件allowlist建立适配任务；没有完整update-impact时隔离该更新并补齐，不能从diff猜测跨机器mutation。每台consumer独立核验Codex身份、已加载版本、正常入口、descriptor解析、已知好/坏/缺证据路由及必要实际目标；一台PASS不能代另一台。central完成而consumer未完成保持ADAPTING，不宣布全局完成。

domain promotion保留旧gate_ref的迁移映射和定义来源；同等义务映射经专业owner确认后才去重。旧project Gate在consumer适配完成前仍有效，禁止中央发布立刻把consumer全部标已迁移。

## C15 长任务、Slurm 和权限

DA只声明长运行所需证据与消费既有运行结果。Persistent Run是既有持久化能力，Slurm为项目既有调度权威；不让LLM持续空轮询，不新增监控服务。job处于PENDING时沿用项目完整队列视图和低成本观察：Priority/Resources正常等待；非法account/QOS/partition、不可满足依赖、集群不可达分别路由。CARE的htzhulab、a100-gpu、volta-gpu、2小时×12次all-pending只在CARE合法合同中生效，不写入通用Resolver。

多队列竞争须既有授权覆盖资源/次数/取消自己作业，并证明科学等价、硬件兼容、输出隔离和幂等锁；DA不发明新的sbatch/srun授权。终态必须由既有finalizer/collector获取checkpoint、prediction/GT、原始指标并重新聚合，调度器COMPLETED不证明科学成功。抢占/超时/记账延迟/网络故障按既有恢复合同处理，保留run身份和资源计量，不无条件重训。

用户仅在目标实质不明、标准所需取舍不可推导、真实权限/资源缺失或不可逆策略改变时介入。已明确同scope授权不重问；批准的机器/账号/收件方/资源/目的改变才重新判断。生产Longleaf Access/Bridge A/B/Tailscale/SSH隧道不属于DA诊断可变参数；任何影响必须来自当前用户明确授权。

## C16 用户路径、可观察性与不过度建设

用户只说“做这个功能”时：现有入口绑定任务→冻结成功行为与目标→发现能力/最小adapter→resolve→提前检查必要权限和环境→运行首条真实纵向链→实现及相应回归→domain producer-self-QA→既有流程要求的独立review→Bridge核对身份/新鲜度→workflow-core聚合允许的claim→自然中文交付实际成果及未证明范围。普通小修不默认引入GPT Work、第二机器、高费模型或全部审查；已有workflow要求的环节也不能因“小修”自行删除。

最小可视入口为既有task evidence packet中的可点击状态页/Markdown索引，由真实权威状态、运行日志和result生成。显示实际触发事件、输入、代码身份、观察来源、费用/时长或不可计量原因、未调用理由、下一责任。没有真实事件显示“未观察”，不把安装/文件存在显示“正常”。时间线、终端引用、原始材料、反证、修复和superseded结果可展开；离线时显示最后观察时间，恢复后从原权威重建，不推动任务。独立控制台不是本轮必建依赖；若以后明确要求，它自身必须接受Frontend/状态真值/权限/恢复验收。

证据采集最小化。公开packet只含脱敏摘要和受限引用；凭据、医学数据、真实浏览器会话、私人host/额度信息不得因审查自动上传GitHub。原始证据存既有获权位置，访问失败为缺证据，不复制到更公开位置绕过。

收益验收记录首次接入工时、每任务附加操作/延时、真实调用成本及计量范围、误拒/漏检、安装维护成本，与不新建DA、仅修项目入口的同类任务基线比较。没有冻结比较样本和预算时不能声称节省。由workflow-core owner评估编排净收益，domain owner评估专业检出，Maintainer评估维护成本；任一新增通用功能若无净收益就收缩/取消其扩展，保留原专业质量义务，不能通过删要求取得胜利。

五条路线的取舍：仅修项目自身能最快止血但缺统一claim；Bridge最窄扩展适合identity/Stop不适合专业评分；Skills本地专业能力适合复用但须证明真实调用；独立有执行权产品会引入第二控制权而本轮不采用；成熟编排器可作为未来明确授权的执行适配，但不能替换既有workflow或科学标准。推荐组合是项目正常入口+domain描述/判定+workflow-core选择+Bridge身份，不增加运营主体。

## C17 完整交接矩阵

下表每行只有一个authority。`packet`指C03现有任务材料；`原controller`指当前已选workflow的现有controller；`受影响标准owner`通过gate_ref唯一解析，不是待分配角色。失败列是诊断原因，映射现有状态，不新增enum。

| capability | authority owner | execution actor | input | output | normal entry | failure state | next owner | user interruption condition | persisted location | invalidation condition |
|---|---|---|---|---|---|---|---|---|---|---|
| goal/claim freeze | 当前任务Planner；Lite为项目owner | Executor整理 | 当前用户要求+canonical合同 | 成功义务/claim/授权边界 | 现有kickoff | 目标实质冲突 | 当前用户 | 目标/科学替换不可推导 | 原Goal/Plan+packet claim | 用户新指令或批准标准变更 |
| target graph | 项目owner | Executor | 构建/安装/部署/科学产物链 | 目标/依赖/消费身份 | kickoff及候选变化 | TARGET_IDENTITY_GAP | 项目owner | 必需受限目标身份无法获权读取 | packet targets | 构建/环境/目标链变化 |
| descriptor discovery | workflow-core | Resolver | 当前已启用插件root+adapter | 解析快照 | C02发现入口 | CAPABILITY_MISSING/SCHEMA_CONFLICT | capability的专业owner | 必需插件启用/付费需新授权 | packet resolution | 安装/版本/定义变化 |
| impact classification | 项目owner | Executor+Resolver | 五源事实+diff | tags/闭包/未知项 | C05分类 | IMPACT_UNKNOWN | 项目owner | 业务语义取舍不可推导 | packet resolution | diff/图/adapter变化 |
| required-gate resolution | workflow-core | Resolver | 义务+描述+闭包 | 必需实例/scope/复用理由 | C06 resolve | UNCOVERED_OBLIGATION | 该义务专业owner | 目标扩大或必要新授权 | packet resolution | 任一输入语义变化 |
| new-gate decision | 对应project/domain专业owner | Executor提供六维反例 | 义务+已有family | 复用或新类别决定 | C04比对 | STANDARD_GAP | 同一专业owner | 新目标/科学选择需用户 | 项目/domain标准+packet | 新反例/正式标准变化 |
| gate standard freeze | 对应Gate专业owner | 专业owner的既有角色 | 优先级来源+六维 | 冻结descriptor/rubric | domain/project正式维护入口 | STANDARD_CONFLICT | 同一专业owner | 原目标无法自洽或需改承诺 | descriptor canonical source | 获权语义修订 |
| validator implementation | 对应Gate专业owner | Executor | 冻结标准+正/坏/缺证据 | 机械runner+校准报告 | 项目/domain现有开发入口 | VALIDATOR_BUG/IMPLEMENTATION_MISSING | Executor | 实现需超出授权资源/数据 | 现有source+packet calibration | runner/fixture/标准变化 |
| gate execution | 对应Gate专业owner | Executor或已有受保护runner | candidate+授权+normal entry | raw observations | descriptor normal_entry | PRODUCT_DEFECT/ENVIRONMENT_GAP | C12指定owner | 真设备/账号/费用权限缺失 | 既有raw evidence位置 | target/collector/environment变化 |
| domain/project judgment | 对应Gate专业owner | 已准入validator/领域角色 | 原始材料+标准 | PASS/FAIL/UNKNOWN及义务详情 | domain self-QA/现有review | INVALID_OBSERVATION/STANDARD_CONFLICT | 同一专业owner | 只有用户可给的必要事实 | run result | rubric/反证/来源失效 |
| result materialization | workflow-core | Executor/runner | 专业判断+身份+证据 | 不覆盖的result envelope | C03原子写入 | EVIDENCE_GAP/SCHEMA_ERROR | Executor | 获权存储永久不可达且无合法替代 | packet runs | 未完成写入/对象变更 |
| Bridge consumption | Bridge | 既有Bridge入口 | result+task/candidate/target | 身份/新鲜度判定 | 既有handoff/Stop校验 | IDENTITY_MISMATCH/STALE | Bridge维护者 | 宿主接口缺失且必须人工交接 | 既有Bridge记录+evidence_ref | identity/fingerprint变化 |
| repair routing | 原controller | workflow-core+Executor | C12原因+预算 | 原任务合法下一动作 | 既有repair/resume | 既有预算/权限停止状态 | C12指定owner | 真实授权/目标决策缺口 | 原任务state+packet | 新鲜决策或新证据 |
| claim aggregation | workflow-core | 聚合模块 | 必需结果+Bridge判定 | 有限范围claim/缺项 | pre-stop | CLAIM_UNPROVEN | 原controller | 原目标需用户选择部分交付 | packet claim | 任一必需结果失效 |
| adapter bootstrap/update | 项目owner | Executor | 本repo合同/真实路径 | 最小adapter+映射反例 | C14现有开发入口 | ADAPTER_GAP | 项目owner | 未知业务/授权取舍 | automation/delivery_assurance | 目标/依赖/标准变化 |
| domain promotion | domain专业owner | AI Skills Maintainer | 两个已验证consumer六维等价 | 正式domain定义+迁移规则 | 中央现有维护入口 | EQUIVALENCE_UNPROVEN | domain专业owner | 新发布/资源不在授权内 | domain source+release notes | 六维语义分歧 |
| central release/adaptation | AI Skills Maintainer | 现有维护执行者 | release+Update impact+consumer清单 | 每consumer证据/ADAPTING | 正式machine-update入口 | ADAPTATION_PENDING/FAILED | 对应consumer项目owner | 新机器/发布副作用无授权 | 现有maintenance board | consumer版本/身份/入口变化 |
| long-run/Slurm | 项目既有执行controller | 项目正式scheduler入口 | 批准资源/科学Plan | job事实+collector产物 | 既有Persistent Run/Slurm入口 | WAIT/环境/终态缺证据原因 | 项目controller | 新资源/取消/科学改变无授权 | 原run/job/collector记录 | 作业重启/数据/环境变化 |
| HUMAN_ONLY | 当前用户 | 原controller发问 | 精确必要动作+已有scope | 显式用户决定 | 既有human gate | AWAIT_HUMAN_DECISION等既有状态 | 当前用户 | 此行就是必要的人为依赖 | 原任务human gate | 用户答案或目标变化 |
| environment gap | 项目environment owner | Executor | 前检和有效环境合同 | 局部修复/等待/不可支持证据 | 原normal entry前检 | ENVIRONMENT_GAP | 项目environment owner | 受限资源只有用户可提供 | packet diagnostics | 工具/服务/权限恢复 |
| final completion | 原controller | Executor | 完整claim+现有流程终结条件 | 原任务合法完成报告 | 既有completion入口 | CLAIM_UNPROVEN | 原controller | 只有原合同要求的最终用户验收 | 原任务最终报告 | 新反证/目标变化按原机制重开 |
| observable view | workflow-core | 无状态渲染器 | 原权威state+实际事件 | 可点击中文状态页 | 现有packet索引 | OBSERVATION_STALE | Executor | 无需用户维护；必需登录除外 | 原packet派生view | 原状态/事件更新 |

## C18 七项目的真实映射样例与标准实例

下面是当前repo文件/目标经语义合同映射的例子。运行时使用各repo adapter声明，不把这些repo名写进通用Resolver。

| 项目、真实入口/路径 | consumed target 与 impact tag | 必需能力及范围理由 | 当前源码/材料能证明到哪里 |
|---|---|---|---|
| Lucerna `package.json` 的 test:development-acceptance；`scripts/development-acceptance.ps1` | Windows EXE/窗口/provider首屏；native-state、credential、lifecycle、actual-surface | STATE/NATIVE/PRIVACY/INSTALL/UI；共享聚合BROAD，整机交付FULL覆盖 | package脚本是SelfTest和包自测，不能证明原生动作；实际消费链须补证 |
| Bobbio `scripts/Invoke-BobbioAcceptanceSafe.ps1`、`Invoke-BobbioReaderAcceptanceSafe.ps1`、`measure-0.3-native-performance.mjs` | Windows Reader、隔离Zotero、真实PDF；isolation、external-roundtrip、render、perf | PRIVACY/ZOTERO/STATE/UI/PERF；跨Zotero路径BROAD，0.3用户就绪FULL覆盖 | PreflightOnly链仍可能Apply；性能fake API不证明Zotero往返；develop为当前开发证据 |
| Mica `scripts/acceptance/cli.mjs`、`validator.mjs`；重构分支低内存报告 | 实际loaded dist、真实宿主输入/消息/PDF；host-lifecycle、benefit、export | HOST/PERF/UI/DOC；shared宿主adapterBROAD，仅判分修复重判raw；完整插件FULL覆盖 | candidate入口验证bundle；报告runtime与HEAD不同；最终真实账号手动边界仍在 |
| SeminarArc `scripts/run-blackbox-acceptance.ps1`、`verify-gpt-work-acceptance.ps1` | installed APK、Room、真实媒体、系统选择器；android-lifecycle、media、hardware、stress | ANDROID/MEDIA/UI/DOC/STRESS/HARDWARE；共享生命周期BROAD；真机义务不能由AVD替代 | 历史OCR假阴性已被纠正；SkipDynamicProbe不证明动态路径；音频inventory不证明导入 |
| Asteria `src/architecture/viewProjection.ts`、`scripts/validate-architecture-rc19.mjs`、`tests/browser/asteria-v2-rc.spec.ts` | canonical graph→浏览器SVG/DOM→固定部署；graph-truth、geometry、scientific-reading | GRAPH/GEOMETRY/SCIVIS/UI/STATE/DEPLOY；共享layoutBROAD，完整科学图FULL覆盖 | 当前量测存在常零/缺值零风险；须独立测屏幕几何且保留正确通用布局 |
| CUHK_Date `scripts/registration-critical-path-hosted.ts`、`apps/web/app/(root)/audit/handoff/handler.ts` | hosted可见表单→auth/state→ticket finalize；registration、transaction、persona、privacy | REGISTRATION/HANDOFF/STATE/PRIVACY/CATALOG/UI/DEPLOY；共享auth/schema/BROAD，release/FULL覆盖 | 当前顺序能读到claim/auth/finalize，但不等于已证明并发/响应丢失；普通UI不得绕成内部fetch |
| CARE `src/care_myocardium/training/care_ase_trainer.py`、`scripts/srr_production/audit_formal_entrypoints.py`、`scripts/validation/validate_care_ase_freeze_reload.py` | 正式模型/数据→checkpoint→预测/GT→科学报告；formal-entry、causality、population、resume、conclusion | SCI_ENTRY/SCI_CAUSAL/SCI_SCALE/SCI_EVIDENCE/SCI_RESUME/SCI_CONCLUSION；共享trainer BROAD，科研aggregate FULL覆盖 | 当前静态入口检查/两次eval不能证明正式训练忠实度或恢复等价；本轮未启动训练 |

各family完整六维定义见03与04，最终逐case义务见02；其中NON_GATE只限制身份/授权/声明等，不为其单独制造产品Gate。

UI的domain owner为Frontend Design，产品文案/locale由其正式合作能力支持，最终UI判定仍只有一个owner。DOC由Research Authoring负责来源/内容；原生PPT最终渲染属于Presentations，统计estimand/assumptions/diagnostics/sensitivity属于Statistical Modeling。它们进入有相应目标的任务，不能为了七仓清单完整而强迫纯后端任务跑PPT/前端。科学报告的研究结论仍归科学owner，排版/引用归文档owner，以独立义务组合，不相互代签。

## C19 Phase 2 前冻结与实施验收

进入Phase 2 Bridge实现前必须冻结：C01单一权威、C02入口/发现、C03字段与路径、C04六维/标准优先级、C05三值影响规则、C06范围算法、C07身份图、C08缺项路由、C09信任/校准、C10结果、C11失效、C12失败映射、C13claim、C14适配、C15既有长任务边界和C17交接。实现者不能自己挑另一套架构。

consumer adaptation才绑定：实际设备/URL/数据源、项目阈值、具体fixtures/known-bad、entry argv、目标图实例、环境有效期、科学容差、正式授权资源。owner和阶段已固定：项目业务/科学owner在首次consumer标准冻结；domain参数由对应domain owner在适配评审；Maintainer在正式release适配核验。未绑定前相关Gate不可运行/不可PASS，不能使用通用默认值掩盖。

Phase 2 的实现验收至少验证规则分支，不要求固定测试数量：纯咨询NONE；内部记录NONE；UI文案TARGETED实际表面；共享schema BROAD兄弟目标；小改但whole-product claim FULL覆盖且复用；未知路径不丢Gate；新repo空adapter拒绝；标准冲突不择优；缺插件不空通过；definition-only改动只重判合格raw；collector改动补采；identity跨机器/候选拒绝；并发结果不覆盖；false-negative正确恢复；科学NO_GO不强迫正结果；未授权真实动作在昂贵前置工作前被识别；host入口不可用不承诺自动控制。

反例必须打到真实normal entry，除了schema级测试还要项目级坏实现/正确实例/缺观察。Bridge接口验证只证明身份/Stop，不取代domain能力校准。当前研究不执行这些探针、不运行R5、不修生产源码。

## C20 形式不变量与可否决条件

1. 每项冻结正面义务都有明确覆盖实例或显式缺口，缺口不可被NONE抹掉。
2. 多repo、多target、多环境结果只能支持各自绑定的claim；不能由某节点最大level推导全局level。
3. 选择范围和授权独立；需要检查不等于允许执行。
4. descriptor/adapter/validator/fixture同轮改变不会自动产生新可信PASS。
5. 每次完成声明都消费同候选有效结果；任何缺证据/冲突/失效均限制声明。
6. 专业判断由专业owner，任务推进由原controller，Bridge只审其身份/新鲜度/Stop边界。
7. FULL可以复用有效证据，TARGETED必须包含依赖闭包；二者都不以Gate数量决定。
8. 失败分流返回原任务，不创造新Goal洗预算；纯等待不算产品失败。
9. 后续实机若证明正常入口不能强制、保护观察无法建立、adapter映射不足或净收益不成立，必须收缩相应声明/扩展；不能以本合同“已写全”宣布投产。

本轮可否决点已经触发：独立人工Pass A的来源边界未完全保持。因此C证明不得PASS，不能把这份完整修订合同直接称为已经架构封板。

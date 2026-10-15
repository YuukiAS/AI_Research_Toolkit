# 复杂软件与科研交付体系：最终独立架构研究

RUNNER_ID: `GPT56_PRO`  
INPUT_SNAPSHOT_COMMIT: `60d0a1feb7ca1efc8f751774850a4ec176b9ab6f`  
研究完成日期：2026-10-15  
研究性质：只读架构研究；不授权实施、部署、付费调用、Windows/真机操作、Slurm 作业或生产变更

```text
FINAL_ARCHITECTURE_DECISION = DO_NOT_BUILD_A_UNIVERSAL_PRODUCTION_PLATFORM
RECOMMENDED_RESEARCH_CANDIDATE = BRIDGE_NATIVE_DELIVERY_EVIDENCE_CONTRACT
MANDATORY_BASELINE = REPAIR_EXISTING_ENTRYPOINTS_WITH_NO_NEW_COMMON_CODE
STANDALONE_ASSURE_RUNTIME = REJECTED
CENTRAL_TASK_DATABASE = REJECTED
CENTRAL_SCHEDULER_OR_RETRY_ENGINE = REJECTED
CENTRAL_SEMANTIC_REVIEWER = REJECTED
IMPLEMENTATION_AUTHORIZED = NO
PILOT_AUTHORIZED = NO
```

## 一、核心结论

不应继续建设名为“研工台”或其他名称的统一生产运行平台。当前十个仓库和官方工具已经有清晰、不可互相替代的事实权威：Bridge 管 Codex 运行身份、工作树、有限恢复和权限；AI Skills 管专业能力分发；项目仓库管真实产品与科学语义；GitHub 管源码、审查和构建来源；Remote Compute Infrastructure 与 Slurm 管远程资源和作业事实；真实设备、浏览器、Zotero、部署和安装环境管最终消费事实；Lucerna 与通知系统只做投影。再增加一个拥有任务状态、技能调度、真实观察、准入、重试和规则维护的中央系统，会形成第二控制面；只写一套无执行权的协议，又不能改变日常失败。

当前值得保留的唯一公共研究候选，是把一个极窄的**交付证据合同**嵌入现有 Bridge，而不是发行新的平台或五命令 `assure` 工具。它只做两件事：

1. 证明当前 Codex 入口实际绑定到哪个任务、仓库、工作树、指令、技能和 Bridge 运行身份；
2. 校验候选源码、用户实际消费的产物、项目门禁和原始证据是否属于同一条交付链，是否真实执行、是否过期、是否越权或缺失。

它不解释专业结果，不运行项目探针，不采集 GUI/设备/模型事实，不推进任务，不重试，不发布，不选择 checkpoint，不批准 Slurm，不维护第二个 `CURRENT`，不决定产品或科研是否最终完成。项目、Bridge、CI、发布者、Slurm 和领域负责人继续作出合法决定。

即使这一窄候选也不能直接实施。必须先将“完全不新增公共代码，只修当前入口、Bridge 安装、AI Skills 消费和项目脚本”作为正式基线。只有在跨两个差异明显的项目上，窄候选显著减少总耗时、首次严重缺陷、用户干预和重复重型验收，同时没有增加持久状态、常驻服务和重复业务配置，才有继续价值。否则最终方案就是不建设公共扩展。

## 二、研究依据与证据等级

### 1. 当前事实优先级

本研究采用以下证据顺序：

1. 当前仓库的代码、规则、测试、候选身份和发布记录；
2. 当前官方 OpenAI、GitHub、Slurm 及成熟工具文档；
3. 候选绑定的真实运行、安装、部署、设备、浏览器或科学证据；
4. 历史事故和审查材料；
5. Planner 方案、报告和推断。

历史材料用于攻击候选，不用于证明当前产品仍存在旧缺陷。仓库中有源码不等于目标机器已安装；规则存在不等于当前会话已加载；测试通过不等于用户消费的是同一构建；作业提交或运行不等于科学结论完成；文件哈希不等于动作发生或专业判断正确。

### 2. 当前仓库形成的共同证据

- `AI_Skills_Collection` 已经是专业能力与流程规则的分发层，不是后台控制面。
- `GPT_Codex_AI_Bridge_Kit` 已经拥有最接近公共运行基座的任务/工作树身份、Host Policy、Reviewed/Persistent 模式、Watcher、恢复和通知；当前开发候选与正式分发版本仍需区分。
- `Remote_Compute_Infrastructure` 已定义 Longleaf、Workstation、Slurm、健康状态和动作权限，明确 unknown/ambiguous 不能触发推测性恢复。
- `Lucerna` 适合状态与事件投影、有限操作，不适合写语义完成。
- `CUHK_Date`、`Bobbio`、`Mica`、`SeminarArc`、`Asteria` 分别依赖托管身份与隐私、Zotero/Figma/原生 Reader、真实 ChatGPT 宿主、Android/硬件、科研图与固定部署，这些门禁不能中央化。
- `CARE_Challenge` 证明冻结合同、角色权威、内容寻址和 durable finalization 有价值，也证明复杂控制面会产生可变状态漂移、错误阈值和昂贵维护。

### 3. 历史反证形成的修订

v0.6 对问题的分类大体正确，但十二项中央职责与“不建立第二控制面”矛盾。GPT-5.6 的根本 `REJECT` 成立。GPT-5.5 的 B1 又指出纯协议没有真实入口便无效；GPT-6 进一步要求早期检查必须映射到 Bridge 合法状态，并覆盖 MCP、插件、子脚本、窗口、数据目录和凭据的完整副作用闭包。v0.7 删除中央系统后过于依赖“原 Owner 会处理”；v0.8 的五个短命命令补上可执行形态，却仍复制 Bridge 规划/绑定和项目 probe/collect/admit 职责，且没有 R2 PASS 或正常入口试点。

因此最终候选不是继承 v0.8，而是进一步删除公共 `plan`、`probe`、`collect` 和 `admit`，只保留入口收据与纯一致性校验。

## 三、最终系统边界

### 1. 权威分工

| 事实或动作 | 唯一权威 | 公共证据合同可做什么 | 明确不能做什么 |
|---|---|---|---|
| Codex 会话、工作树、Host Policy、有限恢复 | 实际 Codex 运行时与 Bridge | 记录实际绑定和运行身份 | 新建第二任务状态、Watcher、重试预算 |
| 专业 Skill/Plugin 能力 | AI Skills 与实际加载的 Codex 会话 | 记录版本和真实消费引用 | 根据名称宣称已使用、建立第二路由数据库 |
| 产品/科学需求与允许的变化 | 项目 Goal、合同、Requirement Ledger、合法 Planner/负责人 | 引用冻结来源和 digest | 重写义务、统一解释所有领域语义 |
| 功能、视觉、语言、隐私、兼容性门禁 | 项目仓库和对应平台 Owner | 校验门禁是否针对同一候选真实执行 | 判断美观、自然中文、医学/统计正确性 |
| 源码、审查、合并、构建来源 | Git/GitHub | 校验 commit、规则集、工作流、制品证明引用 | 把绿色状态或 attestation 当产品正确性 |
| 远程资源、Slurm 作业和终态 | Remote Compute Infrastructure 与 Slurm | 引用 job、accounting、checkpoint 和权限事实 | `sbatch`、`scancel`、资源扩张、结果解释 |
| 安装、部署、真实浏览器、设备、Zotero | 对应机器、服务、账号和平台测试 Owner | 校验产物/运行/观察身份链 | 操作用户账户、桌面、一次性凭证或真机 |
| 科学结论和合法 `NO_GO` | 冻结科学合同与获授权研究者/Planner | 校验证据链是否完整、合权、同候选 | 选 checkpoint、用 outer 数据、调低科学标准 |
| 监控、提醒和总览 | Lucerna、OpenTelemetry、notifier | 只读投影和链接 | 写完成状态或成为第二事实源 |

任何事实若出现两个可写 Owner，架构即失败。

### 2. 逻辑结构

```text
真实任务入口
  Windows Codex App / server Codex / explicit app-server / codex exec / GitHub Action / cloud task
        ↓
Bridge 原生入口绑定
  实际任务、仓库、工作树、指令、Skill/Plugin、运行身份、权限
        ↓
项目原生执行与门禁
  代码、真实服务、UI、设备、Zotero、模型、科学合同
        ↓
外部权威事实
  GitHub、部署、安装、Slurm、设备、用户/研究者决定
        ↓
纯交付证据校验
  同候选、执行完整性、来源、时效、权限、声明范围、未知项
        ↓
现有合法消费者作决定
  Bridge Reviewer/Verifier、项目 CI/发布者、领域负责人
        ↓
Lucerna/报告只读投影
```

没有中央数据库、Daemon、队列、事件总线或跨项目调度服务。

## 四、普通入口如何实际绑定

### 1. Windows Codex App

官方当前文档支持项目/聊天、工作树、Windows/WSL 环境、层级 `AGENTS.md` 和生命周期 hooks。可研究的最小路径是：

- 在受控试点中，由受信任的 `SessionStart` 或等价入口读取 Bridge readiness，并产生入口收据；
- 记录实际仓库、工作树、`HEAD`、任务合同、加载的指令摘要、Bridge/Skill 版本、sandbox 和 approval 配置；
- `AGENTS.md` 或 hook 改变后要求新 run/restart，不把旧会话说成已加载新规则；
- hook 未安装、未信任、被跳过、版本漂移或当前 App 不支持时，收据必须是 `UNPROVEN`；
- background hook、日志或通知不能被当作阻止全部动作的安全边界；真正写权限仍由 sandbox、approval、Host Policy、OS 账户和工具配置决定；
- 无法证明普通入口时，明确使用现有 Bridge Reviewed/Lite 的显式入口，不建立旁路后台控制器。

本研究没有在用户当前 Windows App 实测这些行为，因此不能声称已覆盖普通聊天。

### 2. 服务器 Codex

优先采用显式、可绑定的当前官方入口：

- `codex exec` 的 JSONL/structured-output、明确 sandbox 和 `exec resume`；
- app-server 的 thread、事件、审批和历史边界；
- SDK 仅用于明确启动的新线程；
- 交互式 CLI 若使用 hooks，也必须独立证明其加载和信任。

这些入口控制的是调用方明确启动或恢复的任务，不能推断可以接管任意现存会话。

### 3. GitHub Action、云任务和计划任务

每一种都是独立执行表面，必须生成自己的入口收据。GitHub Action 的候选 SHA、权限和输出不能冒充本地 Windows 会话；云环境的 workspace 和凭据也不能冒充服务器当前安装。

## 五、交付证据合同

### 1. 五层身份

1. **任务身份**：用户批准目标、项目合同、允许写入和外部动作。
2. **源码身份**：仓库、基线、工作树、提交、必要配置和语义源。
3. **产物身份**：exe/APK/扩展包/Web 构建/checkpoint/报告的 digest、签名、构建来源。
4. **运行与观察身份**：实际安装/部署、PID/窗口/设备/浏览器/session/Slurm job、观察器版本、动作和后置事实。
5. **项目决策身份**：谁根据哪些门禁与权限作出何种有限结论。

这五层不能合并为一个 commit SHA。源相同可能构建不同；包相同可能未安装；部署存在可能没有走真实 UI；作业完成可能指标错误；Reviewer PASS 可能越过领域范围。

### 2. 最小封套

```yaml
schema_version:
task_contract:
  ref:
  digest:
  allowed_writes:
  allowed_external_actions:
  required_human_decisions:
entry_receipts:
  - surface:
    instance_id:
    repository:
    worktree:
    head_sha:
    instruction_digests:
    skill_plugin_versions:
    bridge_runtime_identity:
    sandbox_approval:
    observed_at:
    result: PROVEN | PARTIAL | UNPROVEN
candidate:
  source_sha:
  semantic_source_digests:
artifacts:
  - kind:
    digest_or_identity:
    build_provenance:
    runtime_or_consumed_target:
project_gate_results:
  - gate_id:
    owner:
    candidate_identity:
    normal_entry:
    raw_evidence_ref:
    evidence_level:
    result:
    scope:
    invalidated_by:
    reviewer_qualification_ref:
external_authorities:
  github:
  slurm:
  deployment_or_device:
unknowns:
project_decision_ref:
```

封套优先引用现有项目产物，不复制截图、trace、日志、私人数据或完整科学结果。一次性票据、密码、token、真实身份和医疗数据不进入封套；仅保存受控环境中的不透明引用。

### 3. 纯校验器的允许行为

校验器可以：

- 校验 schema、引用、digest 和候选一致性；
- 判断必需门禁是否真实执行、是否 skipped/stale/wrong-candidate；
- 判断声明是否超过证据 scope；
- 根据明确失效规则标记旧证据无效；
- 检查入口、Reviewer 资格引用和权限来源是否存在；
- 输出机器可读的有限结果和缺失原因。

校验器不得：

- 执行任意 Shell、MCP、GUI、浏览器、设备、网络或 Slurm 动作；
- 自动生成或修改项目 Plan/Requirement Ledger；
- 解释项目专业 PASS/FAIL；
- 调用 `advance`、`retry`、`record_review`、merge、publish、deploy、`sbatch` 或 `scancel`；
- 写第二份任务状态或自动创建新任务；
- 把 `NOT_PROVEN` 自动改写成产品失败；
- 把项目失败自动改写成需要用户决定。

推荐输出不是生命周期状态，而是本次校验结论：

```text
EVIDENCE_VALID_FOR_DECLARED_SCOPE
ENTRY_BINDING_UNPROVEN
CANDIDATE_IDENTITY_MISMATCH
REQUIRED_GATE_NOT_EXECUTED
EVIDENCE_STALE
OBSERVER_OR_REVIEWER_UNQUALIFIED
AUTHORITY_UNPROVEN
CLAIM_EXCEEDS_EVIDENCE
PROJECT_GATE_REPORTED_FAILURE
HUMAN_DECISION_REFERENCE_MISSING
```

现有合法 Owner 根据结果决定下一步。

### 4. 校验成立条件

对于一个项目声明 \(q\)，公共校验器仅判断：入口绑定 \(B_q\)、候选一致 \(C_q\)、产物被实际消费 \(A_q\)、项目门禁完整 \(G_q\)、未知项已显式处理 \(U_q\)、权限与人工决定引用有效 \(H_q\) 是否同时成立，即

\[
V(q)=B_q\land C_q\land A_q\land G_q\land U_q\land H_q.
\]

\(V(q)=1\) 只表示“项目有资格由其合法 Owner 作出声明”，不表示公共校验器已经证明产品美观、科学正确或可以发布。

## 六、证据失效与恢复

### 1. 失效原则

- 业务/科学实现变化：仅失效受影响门禁及依赖闭包；不自动重跑所有平台。
- 构建、部署、安装包或 checkpoint 变化：失效对应真实消费面证据。
- 观察器/验证器变化：重新校准该观察器，并重做无法由原始证据重算的相关观察；不重编未变产品。
- 报告、链接、截图传输或回执变化：只修派生材料；不重启 GUI、消费票据、重新部署或重训。
- 新增未经批准的门槛：不能直接判旧候选失败，先回项目权威决定是否修改合同。

### 2. 恢复原则

- 从最新不可变候选、项目产物、Bridge 收据和外部权威恢复，不从聊天摘要或可变 `CURRENT` 猜测；
- 任何外部动作结果未知时先查真实后置状态；查不清的一次性/不可逆动作停止在原 Owner 边界；
- GitHub、Bridge、Slurm、设备和项目各自使用自己的幂等键、锁、job ID 和恢复合同；公共封套不发明统一重试；
- 同一失败没有候选、证据或环境变化时触发项目已有 circuit breaker，不换任务号重置预算；
- 科学 required stage 不因监控中间结果自动早停；合法前置 `NO_GO` 必须由科学合同明确允许。

## 七、失败分类与责任路由

| 公共分类 | 实际含义 | 默认负责人 | 不允许的错误升级 |
|---|---|---|---|
| `ENTRY_BINDING_FAILURE` | 会话未加载正确任务/规则/运行身份 | Bridge/入口维护者 | 说项目代码失败 |
| `CANDIDATE_IDENTITY_FAILURE` | 源、包、部署、安装、checkpoint 或证据不一致 | 构建/发布/项目 Owner | 复用旧截图补绿 |
| `PROJECT_GATE_FAILURE` | 项目真实门禁报告失败 | 项目 Executor/领域 Owner | 通用层擅自解释科学原因 |
| `HARNESS_OR_VERIFIER_FAILURE` | 夹具、选择器、评分器、Reviewer 标准错误 | 测试/Reviewer Owner | 修改正确产品迎合坏测试 |
| `RUNTIME_OR_RESOURCE_FAILURE` | 网络、设备、服务、权限、Slurm、环境失败 | 对应平台/基础设施 Owner | 当作产品或科学否定结果 |
| `AUTHORIZATION_REQUIRED` | 新副作用、费用、真实数据或人类判断未授权 | 合法 Planner/用户/负责人 | 反复询问已授权事项 |
| `EVIDENCE_GAP` | 缺少足以支撑声明的真实观察 | 项目门禁 Owner | 默认 PASS 或默认产品 FAIL |
| `SCIENTIFIC_DECISION` | 忠实实验后的继续/停止/解释 | 科学合同与研究者 | 公共校验器选 checkpoint 或调参 |

## 八、Reviewer 和验证器资格

Reviewer 资格是具体领域、具体版本、具体证据类型的能力，不存在通用 PASS 牌照。项目/领域 Owner 应维护正确、错误和缺测样本，报告关键缺陷召回、误拒、弃权和恒 PASS 基线；更换模型、提示词、观察源、评分标准或产品结构时，受影响资格需要重新校准。

严重漏检、系统性恒 PASS、高置信错误通过、误拒正确实现、错候选、私有数据泄漏或擅自新增门槛，应撤销相应自动放行资格。该 Reviewer 仍可提供诊断，但不能通过多个同类模型投票恢复权力。

公共封套只记录资格引用和 scope，不建立中央 Reviewer 注册数据库。数学、数据身份、按钮后置、NIfTI 空间等可复算事实优先用独立参考；视觉、语言、教学和科学解释需要完整材料与专业判断。

## 九、项目适配

### 1. AI Skills 与 Bridge

AI Skills 保持专业知识和显式路由；Bridge 保持运行、工作树、Host Policy、Review/Persistent 语义。候选扩展若实施，应优先进入 Bridge 的 readiness/receipt 能力，不新建独立仓库或 Daemon。Skill 是否实际影响产物仍由项目门禁证明。

### 2. Remote Compute Infrastructure

继续拥有 Longleaf、Workstation、Tailscale/Cloudflare/Dev Tunnel、Slurm 和 Observer 的事实。公共封套只引用 provider 输出、job/accounting 和动作收据。未知/歧义状态不触发提交、取消、搬迁或扩资源。

### 3. Lucerna

绑定源码、exe、PID/窗口/桌面会话、Provider→聚合→UI/通知、设置动作和真实安装。候选绑定不能用 fixture 最终 headline 替代正式数据链。Lucerna 只展示结果，不写任务完成。系统通知、失败重试和暂时缺测恢复必须由项目合同决定。

### 4. CUHK_Date

绑定源码、Web/API 部署、campaign/run、可见表单、身份、locale、响应式、状态、安全和票据批次。公共层不得打开或消费最终票据，不得开启真实 Matching，不得把 `inactive_pilot_ready` 解释成上线许可。Founder go/no-go 保留。

### 5. Bobbio

绑定开发提交、原生 exe、Figma、Reader 整屏、性能、Zotero test profile/dataDir 和 annotation round-trip。假 Local API 只能关闭开发自测。公共层不得调用含隐式 `Apply` 的 wrapper、修改真实 Zotero 或建立第二 annotation 数据库。

### 6. Mica

绑定扩展源、打包 digest、浏览器实际加载版本和一次受控真实 ChatGPT/Notion 验收。未知 DOM/API fail-open；不自动重发、不操作认证/授权，不将 fixture 或关闭扩展冒充真实收益。当前 recovery branch 与 main/已安装版本必须分开。

### 7. SeminarArc

绑定源码、签名、application id、versionCode、APK digest、安装目标、Emulator/视觉/stress 和真机证据。Emulator 关闭逻辑门但不能关闭相机、麦克风、锁屏、ROM、主观体验或 Play 发布。GPT Work 基础设施存在不等于 campaign 已执行。

### 8. Asteria

绑定源码、Web 构建、固定公网部署观察、真实 DOM/SVG、交互、整屏科研可读和审查候选。CAT-TRACE bridge 只读且不能写科学真值。RC 实现完成、当前公网版本和稳定发布分别表示。

### 9. CARE 与其他 HPC/深度学习任务

绑定冻结合同、代码/配置/数据 split、checkpoint、optimizer/scheduler、Slurm job/accounting、正式预测、聚合、评估和科学决定。中间 monitor、短跑、文件存在和 job `COMPLETED` 均不自动关闭科学门。公共层不得访问 outer、选 checkpoint、提交/取消任务或宣布优于基线。

### 10. CAT-TRACE 等统计/理论研究

模型定义、定理、识别性、目录、仿真和真实数据解释由科学合同拥有。实现测试只能证明代码与定义一致，不能证明定理。无法证明、数据不支持或方法不值得继续时，可以由科学 Owner 输出完整负结论；通用系统不得为了“完成率”降低标准。

## 十、成熟工具的选择

| 工具 | 推荐用途 | 不承担的职责 |
|---|---|---|
| GitHub 规则集/必需检查/合并队列/部署/attestation | 源码、审查、构建和发布来源 | 本地安装、真实 UI、科学正确性 |
| Playwright | Web 正常动作、DOM/截图/trace、浏览器后置 | 原生应用、硬件、整体专业审美 |
| Slurm | 资源、依赖、作业生命周期、accounting | 科学产物有效性与解释 |
| Nextflow/Snakemake | 新的显式科学 DAG、scheduler/cache/resume | 产品交付和人工科学决定 |
| MLflow/DVC | 有明确缺口时的模型/实验/数据谱系 | 调度、权限、发布和科学准入 |
| Temporal | 明确跨服务长期等待且可靠重试副作用的独立业务流程 | 当前通用 Codex/项目控制面 |
| OpenTelemetry | 非权威 trace、metric、log | 任务数据库或完成状态 |
| Lucerna | 人类可读状态投影与授权动作 UI | 语义真值和通用调度 |

发现成熟工具并不等于应安装；必须有具体缺口、Owner、权限、运维成本和净收益。

## 十一、明确拒绝的架构

1. v0.6 十二职责中央体系及其改名版本；
2. v0.8 五个 `assure` 命令作为独立 CLI/包；
3. 独立中央 `CURRENT`、任务数据库、工作流状态机、事件总线、Daemon、Reviewer 注册库；
4. 将 CARE Planner/Critic/Controller/Verifier/Executor 默认推广到所有任务；
5. 将 Lucerna/Observer/通知升级为控制面；
6. 将 GitHub 绿色、attestation、文件哈希或 Slurm 终态升级为语义完成；
7. 通用截图器、通用美观分数、通用中文词表、通用医学/统计审查器；
8. 自动修改或退休项目 `AGENTS.md` 语义规则；
9. 自动操作用户桌面、真实账号、一次性票据、真机、Zotero、生产数据、outer 或 GPU 资源；
10. 以历史 363 条登记数量宣称覆盖率或当前缺陷数。

## 十二、可证伪的后续研究方案

本报告不授权执行。若用户以后单独批准研究试点，顺序应是：

### 阶段 0：基线

在现有项目流程中记录端到端耗时、首次交付缺陷、用户中断、重复测试/安装/截图/Slurm 动作、模型/CI/GPU成本、候选漂移和维护工作。不得先安装公共扩展后再构造基线。

### 阶段 1：离线合同验证

只定义最小封套和纯校验器，在不改变 Bridge/项目行为的前提下，读取现有收据。选择一个桌面产品和一个科学项目，证明错候选、旧证据、skipped 门禁、超范围声明和合法缺测能被正确区分；正确候选不能被一律误拒。

### 阶段 2：入口实证

在隔离仓库/身份中分别验证 Windows App 普通新任务和服务器显式入口。未安装、未信任、旧会话、错工作树、错误 Plugin/Bridge 版本必须 fail closed；普通输入热路径、隐私和已有功能不能明显退化。

### 阶段 3：成对试点

建议 Lucerna 或 Bobbio 与 CARE 组成差异最大的对照。每个项目比较：

- 基线只修现有入口；
- 基线加 Bridge 原生入口收据和纯校验器。

项目门禁保持原样，不迁移业务逻辑。通过后再选 Mica、Asteria 或 SeminarArc 验证第三平台，不因 Windows 成功宣称通用。

### 阶段 4：继续或停止

只有同时满足以下条件才可推广：

- 端到端交付时间和用户中断下降；
- 用户/GPT Work 首次发现的旧类严重缺陷下降；
- 候选、安装/部署和证据不一致减少；
- 正确候选误拒和不当人工 gate 可接受；
- 无第二持久状态、Daemon、重复业务配置和高频外部轮询；
- 项目维护增量明显小于直接修本地流程的收益；
- 合法科学负结果和无法观察状态不被误判。

出现下列任一情况即停止公共扩展：基线等效或更好；普通入口无法可靠绑定；需要新增中央数据库/调度器；每仓复制业务门禁；用户操作增加；真实严重错误无净召回提升；正确实现持续误拒；维护成本超过节省。

## 十三、衡量指标

必须使用用户真正关心的结果，而不是生成文件数：

- 任务到可用交付的中位数及高分位耗时；
- 首次交付后的 P0/P1/P2 或科学合同缺口；
- 用户被要求操作、复制、授权或判断的次数；
- 因错入口、错工作树、错候选、旧安装/部署和旧证据造成的返工；
- 全量测试、独立 Review、GUI、模拟器、真机、安装、票据、Slurm 重跑次数；
- Codex token、CI minutes、GPU hours 和工程维护时间；
- 新增持久状态、配置、适配代码、重复契约和升级点；
- 严重坏例召回、正确例误拒、缺测弃权与恒 PASS 基线对比；
- 最终决策能否反向追溯到真实用户产物和源码。

若只让报告更完整而没有改善这些指标，研究候选失败。

## 十四、风险与剩余未知

1. 当前 OpenAI hooks 在用户实际 Windows App、服务器交互环境和 ChatGPT Work 中的支持与信任语义尚未实测。
2. Bridge `0.11.0` 候选是否正式分发、各 `CODEX_HOME` 是否同步未知。
3. 某些项目可能已经拥有等价候选绑定，公共校验器会完全多余。
4. 私有仓库 GitHub 计划、required check 来源、环境 reviewer 和管理员绕过权限需要逐项目核实。
5. 原生/浏览器/设备/Slurm 的强制隔离可能在部分机器只能达到内部审计等级。
6. Reviewer 校准可能过拟合历史样本，或本身增加大量维护和模型调用。
7. schema 可能逐渐吸收项目业务字段，演化成新 DSL；必须设置字段和 Owner 边界。
8. 封套可能泄漏路径、账户、私有数据或 token；默认只保存最小不透明引用。
9. 仅靠证据校验不能保证未知产品和科学错误被发现；项目专业能力仍是决定性瓶颈。
10. 当前研究没有运行用户环境、真实入口、产品试点或 Slurm，因此任何运行收益仍是未证实假设。

## 十五、最终决策与下一步

### 架构裁决

- **否决**建设统一研工台、中央控制器或 v0.8 五命令独立运行包。
- **保留**现有 Bridge、AI Skills、项目门禁、GitHub、Remote Compute/Slurm、Lucerna 投影的组合架构。
- **保留但不授权实施**一个更窄的 Bridge 原生交付证据合同研究候选：入口绑定收据＋纯一致性校验器。
- **必须保留**“只修现有入口、完全不新增公共代码”作为正式基线和可能最终方案。

### 当前无需用户动作

本研究已经完成设计与反证，不需要用户现在配置机器、运行 Codex、打开 GUI、提交 Slurm、安装包或作出产品/科学决定。任何后续试点都必须是新的明确授权，并先给出最小范围、机器、权限、成本和停止条件。

## 参考资料

### 当前仓库

- `YuukiAS/AI_Skills_Collection`, `main@0d990b24fb7c7b46877347241800244f623b20c0`, `release@06d135d8a6ee62cd41abb40fc5771fcef7f8db25`.
- `YuukiAS/GPT_Codex_AI_Bridge_Kit`, `main@a7931fdfc6e3d71cf985351df075de17097795e6`, `release@9db19b0409816c22042a246b35a33e1d34fedd0a`.
- `YuukiAS/Remote_Compute_Infrastructure`, `main@ca0bad392ce1295e76a07a5d8f9c9dd27d3f61d7`.
- `YuukiAS/Lucerna`, `main@79dd2875d3da33c6a6d80e5e35bea812b84c1ceb`.
- `YuukiAS/CUHK_Date`, `main@9f25c7754d3c80dbe74f5b71016320f55753ae6`, accepted `v0.5.25 -> 3d1229597253c78950b070c7c47646ddb1cb6730`.
- `YuukiAS/Bobbio`, `develop@a64edfd6c5b11f81599bfcfc327be5964633a7b5`, `main@e7d929bad2d4b23939c81920e77390efbce42b96`.
- `YuukiAS/Mica-for-ChatGPT`, `main@7059c0dc24b908b57bd0e1f475142ba4f4520621`, recovery branch `@0065a7ba841f72244e6bc1dbce0b5ec2ada12d35`.
- `YuukiAS/SeminarArc`, `main@5652fe17ce60625f3ff7c758fcc0183f920189de`, published APK candidate `122dfb8ce5203e3960aacd6c1c3a73cfdd851a15`.
- `YuukiAS/Asteria`, `main@193c033659a7612a99442763077217b130e9b756`, RC19 implementation `4c32c42236b4a601fbb2d31e265200cbb90b57b4`.
- `YuukiAS/CARE_Challenge`, `develop@184cc16bc00dbb4edce80e2c848bdaabae4f782e`, `main@75a40e454de43b64e59a0b0b438ff57ef2bb8345`.

### 官方与成熟工具文档

- OpenAI Codex Windows app: `https://learn.chatgpt.com/docs/windows/windows-app`
- OpenAI `AGENTS.md`: `https://learn.chatgpt.com/docs/agent-configuration/agents-md`
- OpenAI non-interactive mode: `https://learn.chatgpt.com/docs/non-interactive-mode`
- OpenAI app-server: `https://learn.chatgpt.com/docs/app-server`
- OpenAI Codex SDK: `https://learn.chatgpt.com/docs/codex-sdk`
- OpenAI Codex GitHub Action: `https://learn.chatgpt.com/docs/github-action`
- OpenAI cloud environments: `https://learn.chatgpt.com/docs/environments/cloud-environments`
- OpenAI hooks: `https://developers.openai.com/docs/hooks`
- OpenAI plugin construction: `https://developers.openai.com/plugins/build/plugins`
- OpenAI sandboxing: `https://learn.chatgpt.com/docs/sandboxing`
- GitHub protected branches, rulesets, merge queue and artifact attestations: official GitHub documentation under `docs.github.com`.
- Slurm `sbatch`, `squeue`, `sacct`, state codes and `scontrol`: official SchedMD documentation under `slurm.schedmd.com`.
- Temporal: `https://docs.temporal.io/`
- Nextflow: `https://nextflow.io/`
- Snakemake: `https://snakemake.readthedocs.io/`
- MLflow: `https://mlflow.org/docs/latest/`
- DVC: `https://dvc.org/doc/`
- OpenTelemetry: `https://opentelemetry.io/docs/`
- Playwright: `https://playwright.dev/docs/`

### 授权历史材料

- `docs/research/software-production/09_FULL_DOSSIER_V0_6/`
- `docs/research/software-production/10_POST_CRITIC_REDESIGN_V0_7/`
- `docs/research/software-production/11_THREE_CRITIC_RECONCILIATION_V0_8/`
- `docs/research/software-production/12_COMPLEX_DELIVERY_REQUIREMENTS_INTAKE_20261015/original_reviews/`

### 本轮产物

- `01_INDEPENDENT_CANDIDATES_BEFORE_HISTORY.md`
- `02_HISTORY_CHALLENGE_AND_CANDIDATE_REVISION.md`
- `03_FINAL_ARCHITECTURE_RESEARCH.md`
- `SOURCE_LOG.md`
- `RUN_STATE.md`

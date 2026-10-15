# 复杂交付体系第一阶段独立候选

RUNNER_ID: `GPT56_PRO`  
INPUT_SNAPSHOT_COMMIT: `60d0a1feb7ca1efc8f751774850a4ec176b9ab6f`  
研究阶段：在读取任何既有架构报告、既有 Planner 答案或 Critic 建议之前  
证据入口：本目录 `SOURCE_LOG.md`

## 核心判断

当前证据不支持再建设一个常驻、全能、跨项目的中央生产控制器。十个仓库展示的共同问题确实存在：入口没有稳定绑定、执行者可能读错上下文、候选与证据可能漂移、测试可能只证明夹具、真实消费面可能没有被验证、长任务可能只提交未收尾、科学任务可能把运行状态误当结论。然而，这些问题并不意味着所有项目需要共享一套任务数据库、统一状态机、统一审查器或统一重试逻辑。

更稳妥的第一候选是：**保留现有项目和外部系统的事实权威，只增加一层很薄的“交付证据封套与入口绑定”能力。** 这层能力不执行项目语义、不接管 Slurm、不判断视觉质量、不选择科学 checkpoint，也不把 Lucerna 变成控制台。它只负责把一次真实任务绑定到明确入口、明确执行实例、明确候选、明确消费产物、明确项目门禁和明确授权边界，并让现有 Bridge、AI Skills、GitHub、项目本地验收、Slurm 与专业工具各自继续承担原本适合的职责。

这不是“做一个更小的万能平台”，而是把当前分散但必要的事实连接成可核验的证据链。若这层能力无法在 Windows Codex App 和服务器 Codex 的普通入口中被实际证明，结论应当是继续修现有入口，而不是靠新增后台控制器掩盖入口缺失。

## 一、问题的真实结构

### 1. 共同问题不是“缺少一个状态页”

当前项目的失败主要发生在五个断点：

1. **入口断点**：仓库里存在规则或插件，不等于当前 Windows/服务器会话实际加载并执行了它。
2. **候选断点**：测试、截图、部署、安装包、真实运行或审查可能对应不同提交或不同构建。
3. **消费断点**：源代码测试通过，不等于用户真正打开的桌面程序、浏览器扩展、Android APK、固定公网地址或 Zotero 集成就是同一候选。
4. **语义断点**：通用测试或运行状态不能代替项目特有的视觉、隐私、科学、硬件或产品门禁。
5. **续跑断点**：进程、会话或提交只说明发生过活动，不说明长任务已经完成聚合、验证、解释和最终决策。

因此，目标不应是“统一显示一切”，而应是让每个断点都有唯一可追溯的事实来源，并禁止下游把弱证据提升成强结论。

### 2. 十个仓库已经形成了有效分工

- `AI_Skills_Collection` 适合分发专业知识、流程规则和领域能力，不适合充当后台控制器。
- `GPT_Codex_AI_Bridge_Kit` 已覆盖任务身份、工作树、持久会话、有限 watcher、Host Policy、发布和恢复，是最接近公共运行基座的现有组件。
- `Remote_Compute_Infrastructure` 已经拥有 Longleaf、Workstation、Slurm 与远程基础设施的事实模型和动作边界。
- `Lucerna` 适合作为状态与事件投影、授权动作入口，不适合作为完成判定源。
- `CUHK_Date`、`Bobbio`、`Mica`、`SeminarArc`、`Asteria` 各自拥有无法被通用门禁替代的真实消费面和产品验收。
- `CARE_Challenge` 证明了严格角色分离、冻结合同、内容寻址审查和 durable finalization 在高成本科学任务中有价值，也证明了复杂控制平面本身会产生状态漂移和维护成本。

在此基础上再复制一套全局控制逻辑，最可能形成双重事实源，而不是消除事实冲突。

## 二、不可妥协的设计原则

### 1. 权威不迁移

公共层不得夺取以下权威：

| 事实 | 权威来源 |
|---|---|
| 源码、分支、提交、审查合并状态 | Git / GitHub |
| 当前 Codex 会话、工作树、权限和恢复 | 实际 Codex 运行时与 Bridge |
| 项目功能、视觉、语言、隐私、兼容性门禁 | 项目仓库及其本地验收合同 |
| Slurm 作业、资源、终态和重排 | Slurm |
| 科学定义、checkpoint 选择、外层数据使用、结论 | 冻结科学合同与获授权的 Planner/研究者 |
| 已安装桌面程序、浏览器扩展、APK、真机行为 | 对应机器和真实消费面证据 |
| 监控和提醒 | Lucerna / notifier 等投影层 |

公共层只能引用这些来源，不能重新计算一个“更方便”的真值。

### 2. 完成是证据合取，不是一个可随意写入的状态字段

一次交付只有在下列事实同时成立时，才可以声明完成：入口已绑定；候选身份不可变；真实消费产物已绑定；所有必需项目门禁都针对同一候选执行；阻断未知项为零；权限和人工决策边界已满足。可写成：\(C = I \land K \land A \land G \land U \land H\)。其中任何一项缺失，公共层最多报告“已执行到某一步”，不能推导完成。

科学上的 `NO_GO` 可以是完整交付：只要实验、数据、失败机制、停止依据和未授权范围已经按合同闭合，结论为“不继续”不等于执行失败。

### 3. 证据必须单调、可撤销而不可静默升级

新证据可以把 `UNVERIFIED` 提升为 `VERIFIED`，也可以因候选改变而使旧证据失效；但旧测试、旧截图、旧安装包或旧部署不能因为文档更新自动变成当前候选证据。候选代码、门禁逻辑、验收夹具或消费产物变化时，相关证据必须按影响范围失效。

### 4. 运行活动永远不等于语义完成

进程存在、会话心跳、Slurm `RUNNING`、GitHub Actions 绿色、watcher 存活、文件存在和通知已发，都只是活动或局部门禁证据。它们不能直接产生产品完成、发布可用或科学有效结论。

### 5. 正常入口优先，显式自动化入口次之

用户日常入口仍是 Windows Codex App 和服务器 Codex。公共能力必须在这些普通入口中实际加载并被证明；`codex exec`、SDK、app-server、GitHub Action 或计划任务是明确选择的自动化入口，不能被当作“已经覆盖了普通聊天”的替代证据。

### 6. 同一事实只有一个写入者

公共层不维护第二套任务数据库。任务事实优先以仓库中的内容寻址封套、Git 提交、Bridge 运行收据和外部权威引用构成证据有向无环图。Lucerna、通知和报表均为只读投影。

## 三、独立候选集合

### 候选 0：不增加任何公共能力，只修各项目现有流程

做法是继续在每个项目中分别完善 `AGENTS.md`、测试、验收脚本、Bridge 安装和文档。

优点是零新增平台、没有迁移风险，最符合“先证明真的需要新系统”。缺点是入口身份、候选封套、消费产物绑定和跨项目证据格式会继续重复实现，维护者仍要人工判断不同项目的状态字段是否可比。

该候选应保留为基线，并通过真实指标与推荐候选比较，而不是先验淘汰。

### 候选 1：以 GitHub PR、Actions、规则集和制品证明为唯一控制平面

该方案把任务收敛到 PR，要求状态检查、合并队列、部署门禁和构建制品证明全部通过后交付。

优点是成熟、审计清晰、无需自建服务，适合源码、CI 和发布制品。缺点是无法证明本地 Windows/macOS 安装、浏览器真实账户、Zotero、Android 真机、固定公网当前版本或服务器 Slurm 结果；也不能表达项目特有人工门禁和科学授权。它会把“GitHub 能看见的部分”误当成完整产品。

结论：应作为公共证据链的重要组成，而不是唯一架构。

### 候选 2：建设一个 Temporal 类通用 durable workflow 控制器

该方案把每个项目交付建模为长生命周期工作流，由中央服务持久化事件、重试、等待、人工审批和补偿动作。

优点是长任务恢复、等待外部事件和幂等副作用具有成熟语义。缺点是必须为所有项目重新实现适配器、权限、状态映射和迁移；与 Bridge、GitHub、Slurm、项目控制器形成第二控制平面；本地 App、真实 UI 和科学决策仍需项目门禁。对于大量短、可由 Git/会话/本地测试恢复的编码任务，收益不足以抵消常驻服务、数据库和运维成本。

结论：不作为通用默认。只有未来出现明确的跨服务业务流程，且工作必须跨进程长期等待并可靠重试外部副作用时，才单独评估。

### 候选 3：把 CARE 的多角色控制平面推广到所有项目

该方案统一 Planner、Critic、Controller、Verifier、Executor，使用冻结合同、需求台账、稳定审查快照和多轮修复。

优点是高风险科学任务的角色权威清晰，能抑制验证器越权、执行者迎合测试和控制器擅自改科学。缺点是日常桌面、Web、浏览器扩展和 Android 修复不需要如此重的角色图；多会话、多工作树、多状态文件会显著增加延迟、模型消耗和状态漂移。CARE 当前控制面状态与真实训练进度不一致，已经显示这种成本。

结论：保留为高风险项目局部模式，不推广为通用生产入口。

### 候选 4：按领域引入成熟工作流工具

计算型科学任务可选择 Nextflow/Snakemake，实验谱系可选择 DVC/MLflow，观察可选择 OpenTelemetry；软件产品继续使用 GitHub、项目测试和真实消费面验收。

优点是每种工具解决它擅长的问题，避免自建调度器。缺点是迁移既有 CARE/Slurm 体系可能成本很高，且这些工具仍不处理视觉、语言、原生应用、真实账户和人类判断。

结论：作为按项目选择的增强组件，而非统一架构。新科学管线可优先试验；已经具备成熟 checkpoint/Slurm 合同的管线应先算迁移收益。

### 候选 5：薄型“入口绑定 + 交付证据封套 + 项目门禁”公共层

该方案不引入中央 durable workflow 服务，不改变各系统权威，只在现有 Bridge/AI Skills/仓库合同之上增加三个很窄的公共协议：

1. **入口绑定收据**：证明当前普通 Codex 入口实际加载了哪套项目规则、技能、Bridge 版本、工作树和任务封套。
2. **不可变交付证据封套**：绑定任务授权、候选提交、消费产物、门禁清单、证据引用、失效规则和最终决策。
3. **项目门禁提供者接口**：由每个项目定义哪些证据可以关闭哪些要求，公共层只验证格式、候选一致性和权威来源，不解释专业结果。

该候选复用现有资产，新增状态最少，且能直接针对入口、候选和消费断点。它仍需要证明 hooks/app-server/Bridge 在两种普通入口中的真实可用性；证明失败时必须退回候选 0，而不是扩建旁路控制器。

## 四、候选比较

评分为相对判断，`5` 表示更好。

| 维度 | 候选 0 仅修现有流程 | 候选 1 GitHub 中心 | 候选 2 durable 控制器 | 候选 3 多角色推广 | 候选 4 领域工具组合 | 候选 5 薄型证据层 |
|---|---:|---:|---:|---:|---:|---:|
| 普通入口覆盖潜力 | 2 | 1 | 2 | 2 | 1 | 4，需实证 |
| 候选与消费产物绑定 | 2 | 4 | 4 | 4 | 3 | 5 |
| 项目语义忠实度 | 5 | 2 | 2 | 4 | 4 | 5 |
| 长任务恢复 | 3 | 2 | 5 | 5 | 5 | 4，委托权威系统 |
| 防双重事实源 | 5 | 4 | 1 | 2 | 4 | 5 |
| 初始建设成本 | 5 | 4 | 1 | 1 | 3 | 4 |
| 持续维护成本 | 3 | 4 | 1 | 1 | 3 | 4 |
| 对七类产品的适配 | 3 | 2 | 2 | 2 | 3 | 5 |
| 科学 `NO_GO` 表达 | 4 | 2 | 3 | 5 | 4 | 5 |
| 用户干预减少潜力 | 2 | 3 | 4 | 3 | 3 | 5 |

第一阶段推荐候选 5，并以候选 0 作为必须保留的对照组。

## 五、推荐架构：薄型交付证据层

### 1. 组件边界

```text
普通入口
  Windows Codex App / server Codex
        ↓
入口绑定适配器
  trusted hooks / AGENTS / Bridge readiness / explicit app-server or exec entry
        ↓
交付证据封套（仓库内、内容寻址、不可变候选）
        ↓
项目门禁提供者
  tests / Figma / native app / browser / emulator / hardware / scientific contract
        ↓
外部权威
  GitHub / deployment / Slurm / Zotero / device / user decision
        ↓
只读投影
  Lucerna / notifier / report
```

公共层不直接启动新执行器，不拥有 Slurm 作业，不持有最终凭证，不实现浏览器或原生应用的专业验收，也不自动合并/发布。执行仍由当前 Codex 会话、Bridge Reviewed/Persistent Run、GitHub Actions、项目脚本或 scheduler-native job 完成。

### 2. 入口绑定适配器

入口绑定必须产生机器可核对收据，至少包括：

```yaml
entry_surface: windows_codex_app | server_codex_cli | app_server | github_action | cloud_task
entry_instance_id:
thread_or_session_id:
repo:
worktree:
branch:
head_sha:
loaded_instruction_sources:
loaded_skill_or_plugin_versions:
bridge_runtime_identity:
sandbox_mode:
approval_mode:
task_envelope_sha256:
observed_at:
binding_status: PROVEN | PARTIAL | UNPROVEN
```

实现优先级：

- Windows 本地入口：受信任的 `SessionStart`/`UserPromptSubmit`/`Stop` hooks 只负责读绑定、阻止明显错仓库/错任务并写轻量收据；Bridge 负责工作树、会话和恢复。任何 hook 必须按当前 hash 获得信任，且需要一次真实普通聊天证明。
- 服务器入口：优先使用显式 `codex exec`/`resume` 或 app-server 客户端，使调用方拥有明确 thread、事件和审批边界。普通交互式 CLI 会话仍需独立绑定实证。
- GitHub/云任务：视为不同入口，生成不同收据，不能冒充本地会话。

若入口适配器没有被加载，状态必须是 `UNPROVEN`。项目仍可执行，但不得宣称公共层已经接管或自动闭环。

### 3. 交付证据封套

每个任务在项目仓库内维护一个内容寻址封套。推荐由 Bridge 生成，项目只需提供门禁清单。核心字段如下：

```yaml
schema_version:
task_key:
contract_digest:
authority:
  allowed_writes:
  allowed_external_actions:
  forbidden_actions:
  human_decisions:
source:
  repo:
  baseline_sha:
  required_instruction_digests:
execution:
  entry_binding_receipts:
  executor_receipts:
  uniqueness_key:
candidate:
  source_sha:
  tree_digest:
  build_or_deployment_identities:
consumed_artifacts:
  - kind:
    digest:
    source_sha:
    observed_surface:
project_gates:
  - gate_id:
    owner:
    required_candidate_identity:
    evidence_refs:
    decision:
    invalidation_scope:
external_authorities:
  github:
  slurm:
  device_or_runtime:
unknowns:
final_decision:
  state:
  decided_by:
  evidence_digest:
```

封套不是实时数据库。执行过程中可生成新的不可变版本，旧版本保留在 Git 历史；`CURRENT` 指针如果存在，只是便捷定位，最终判断必须绑定封套 digest 和候选 SHA，不能只信可变指针。

### 4. 证据有向无环图

证据引用按照“源 → 构建 → 部署/安装 → 门禁 → 决策”形成有向无环图：

- 代码提交是构建的父节点；
- 构建 digest 是安装包或部署的父节点；
- 真实消费面证据绑定具体安装/部署；
- 项目门禁绑定具体候选和消费面；
- 最终决策引用所有必需门禁。

收据、状态和通知不能反过来成为候选身份的一部分，避免 CARE 中出现过的 hash 循环和移动目标。仅收据变化不触发重型测试；实现、验证器、消费产物或门禁逻辑变化则按影响范围失效证据。

### 5. 项目门禁提供者

公共接口只要求每个门禁声明：

- 谁拥有该判断；
- 输入候选是什么；
- 证据在哪里；
- 能关闭哪个要求；
- 哪些变化会使它失效；
- 是否需要人类判断；
- 失败属于产品、夹具、环境、权限还是科学结果。

公共层禁止把一个聚合 `PASS` 展开成语言、视觉、响应式、安全、科学等多个维度的通过。每个维度必须有独立证据，或明确保持未知。

### 6. 有限续跑与唯一执行

公共层只实现任务级租约与恢复元数据，不实现全局调度：

```text
uniqueness_key = repo + task_key + contract_digest + target_ref
```

- Bridge 在本地/服务器保证同一 Reviewed/Persistent 任务只有一个活动 watcher 或明确隔离的执行实例。
- GitHub Actions 依赖自身 concurrency/merge queue。
- Slurm 依赖 job ID、dependency、lock 和 scheduler accounting。
- 项目控制器可在合同内重试；公共层只检查重试没有越过授权、没有产生未隔离的重复写入。

恢复时读取最新不可变封套、外部权威和项目产物，禁止仅从聊天摘要或可变 `CURRENT` 文件猜测。相同失败在没有候选或证据变化时重复出现，应进入项目定义的 circuit breaker；通用层记录重复指纹，但不替项目制定科学停止阈值。

### 7. 状态模型

推荐最小状态集合：

```text
UNBOUND
BOUND
EXECUTING
WAITING_ON_AUTHORITY
CANDIDATE_READY
GATE_FAILED_REPAIRABLE
OPERATIONALLY_BLOCKED
HUMAN_DECISION_REQUIRED
VERIFIED_NO_GO
VERIFIED_COMPLETE
```

状态必须由证据谓词推导，而不是由任意角色直接写入。`WAITING_ON_AUTHORITY` 可表示 Slurm、CI、部署、真实设备或外部审查尚未完成；它不是失败，也不是完成。`VERIFIED_NO_GO` 表示任务完成且结论是不继续。`HUMAN_DECISION_REQUIRED` 仅用于项目合同明确保留的人类判断，不用于普通实现、夹具、CI、权限或运行环境故障。

### 8. 失败分类

公共分类应少而稳定：

| 分类 | 含义 | 默认路由 |
|---|---|---|
| `ENTRY_BINDING_FAILURE` | 普通入口未加载正确规则/任务/运行时 | 修入口或明确改用显式入口 |
| `CANDIDATE_IDENTITY_FAILURE` | 代码、构建、部署、安装或证据不一致 | 重建同一候选证据链 |
| `PROJECT_GATE_FAILURE` | 产品/科学门禁真实失败 | 项目执行者修复或给出 `NO_GO` |
| `HARNESS_OR_VERIFIER_FAILURE` | 测试/夹具/审查标准错误 | 修验证体系，不动产品来迎合 |
| `RUNTIME_OR_RESOURCE_FAILURE` | 网络、设备、Slurm、服务或权限问题 | 对应权威系统恢复 |
| `AUTHORIZATION_REQUIRED` | 真实副作用或人类判断未授权 | 停在精确决策点 |
| `EVIDENCE_GAP` | 结论缺证据但未证明产品失败 | 补最小必要证据 |

项目可以增加子类，但不能把资源故障改写为产品失败，不能把测试失败自动改写为实现失败，也不能用 `BLOCKED` 隐藏可修复的同范围问题。

## 六、各项目的适配方式

### Lucerna

封套绑定源提交、Windows/macOS 构建 digest、真实启动和 provider 证据。Lucerna 自身继续显示状态，但不得写回任务完成。安装版本和当前运行进程必须作为独立消费面证据。

### CUHK_Date

封套绑定源码、Web/API 部署、run/campaign、票据批次和每个 launch-quality 维度。公共层不得读取或消费最终票据，不得把 `inactive_pilot_ready` 推成真实 matching。Founder go/no-go 保留为明确人类门。

### Bobbio

封套绑定开发提交、原生可执行文件、Figma来源、原生截图/性能和最终隔离 Zotero round-trip。假 Local API 只能关闭生产者自测，不能关闭真实 Zotero 门。知识是否进入 reviewed state 仍由用户决定。

### Mica

封套绑定扩展源、构建 ZIP、实际加载版本和一次受控真实 ChatGPT/Notion 验收。DOM/API 未识别时保持原生。公共层不得自动操作已登录账户或盲目重发消息。

### SeminarArc

封套绑定源、签名、application id、versionCode、APK digest、Emulator 证据和真实硬件证据。Emulator 可以关闭常规逻辑门，不能关闭相机、麦克风、锁屏、ROM 或主观体验。生产签名和 Play 发布是独立授权。

### Asteria

封套绑定源提交、固定公网部署观察、页面/布局/性能/截图审查和 GPT Work 结果。代码桥只提供实现状态，不能写科学真值。RC 完成、稳定发布和当前公网实例分开表示。

### CARE 与其他长科学任务

封套引用冻结合同、review target、源码/配置/split/checkpoint digest、Slurm job/accounting、聚合、验证和科学决策。Slurm 和项目 finalizer 承担运行生命周期；公共层不轮询高频、不选 checkpoint、不访问未授权 outer、不取消或扩资源。训练完成、科学评估完成和是否继续是三个不同门。

### CAT-TRACE 类理论/统计研究

证明、模型定义、数据目录、仿真实验和真实数据分析由科学合同拥有。代码实现和测试只能提供一致性证据。定理尚未证明、识别性不足或真实数据不支持时，允许输出完整的 `VERIFIED_NO_GO` 或“保留未决”，而不是为了完成率降低科学要求。

## 七、与成熟工具的组合边界

- GitHub 规则集、必需检查、合并队列和制品证明用于源码、审查和发布制品谱系。
- Bridge 用于 Codex 运行身份、工作树、Host Policy、持久会话和有限恢复。
- AI Skills 用于专业路由和领域能力。
- Slurm 原生 dependency/checkpoint/accounting 用于现有 HPC；新 DAG 管线可试验 Nextflow/Snakemake。
- DVC/MLflow 仅在实验谱系确有缺口时引入，不作为任务完成源。
- OpenTelemetry/Lucerna 只投影，不写语义状态。
- Temporal 只在未来存在明确跨服务、长期等待、可靠副作用的业务流程时单独立项，不作为当前默认依赖。

## 八、权限与人工决策

公共层必须把“可自动继续”与“需要人决定”分开：

可自动继续的典型情况包括已授权范围内的代码修复、夹具修复、精确候选重测、同范围运行环境恢复、读取 Slurm accounting、生成聚合和修复收据绑定。

必须停下的情况包括：新的科学假设或阈值；使用 outer/真实用户/真实私有数据；付费资源；生产发布；不可逆数据变更；新增/扩大 Slurm 资源；取消可能有价值的作业；消费一次性真实凭证；改变隐私、安全、法律或业务策略；最终主观产品判断。

项目必须声明人类门，公共层不能根据“高风险”标签自动发明更多询问，也不能把普通技术故障升级成人工决策来逃避修复。

## 九、实施与验证顺序

本报告只提出研究候选，不授权实现。若后续决定试验，建议按以下顺序：

### 阶段 A：零代码基线

连续记录若干真实任务的总耗时、首次交付缺陷、用户中断次数、重复测试次数、模型/计算成本和维护动作。候选 0 是正式对照组。

### 阶段 B：只做封套 schema 和离线验证器

先不接管入口、不启动 daemon。选择一个桌面项目和一个科学项目，用现有收据生成封套，验证候选/产物/门禁一致性和证据失效规则。若封套不能减少人工判断或只是复制现有文档，停止。

### 阶段 C：普通入口实证

在隔离项目中分别证明：

1. Windows Codex App 普通新聊天能加载可信 hook/AGENTS/Bridge，并产出正确入口收据；
2. 服务器普通入口或显式 app-server/`codex exec` 能绑定同一封套；
3. 未安装、未信任、版本漂移、错误工作树和旧会话都能 fail closed；
4. 不增加明显输入延迟，不泄漏 prompt/answer，不自动越权。

任何一个普通入口无法可靠证明时，不能声称统一入口覆盖；该入口继续使用现有显式 Bridge 流程。

### 阶段 D：两个项目适配试点

建议选择状态差异最大的组合，例如 Lucerna/Bobbio 与 CARE。试点只验证跨域封套是否真的共用，不把其中一个项目的状态机移植到另一个项目。

### 阶段 E：增量推广或否决

只有当试点相对基线显著降低总耗时、首次缺陷和用户中断，且没有增加常驻服务、重复状态和维护负担，才推广到其他项目。否则保留 schema 中有价值的局部部分，停止建设公共层。

## 十、可测成功标准

后续实验至少需要衡量：

- 从用户发出任务到可用结果的中位数和高分位耗时；
- 第一次交付后发现的 P0/P1/P2 或科学合同缺口；
- 用户被要求执行或判断的次数；
- 因候选漂移、错入口、错安装或旧证据导致的返工；
- 全量测试、视觉审查、真机/Slurm 重跑次数；
- Codex token、CI minutes、GPU hours 和维护时间；
- 同一项目内重复状态文件、watcher、daemon 和手工同步点数量；
- 合法 `NO_GO` 是否能在不降低标准的情况下关闭；
- 真实消费产物是否可从最终决策反向追溯到源码和构建。

公共层若只让报表更完整，却没有减少交付时间和缺陷，就不应继续。

## 十一、关键风险与否决条件

以下任一情况足以否决推荐候选的实现版本：

1. 需要新的常驻数据库或服务才能完成普通本地任务；
2. 与 Bridge、GitHub、Slurm 或项目 `CURRENT` 形成双重可写状态；
3. 无法在普通 Windows/服务器入口证明实际加载；
4. 为了统一 schema 删除项目专业门禁或强迫项目采用同一状态机；
5. Lucerna/通知可以直接写完成状态；
6. 自动访问真实账户、一次性凭证、outer 数据、生产环境或未授权设备；
7. 监控循环显著增加 Slurm/GitHub/OpenAI 调用成本；
8. 候选变化后旧证据仍被复用；
9. 用户干预没有下降，维护工作反而增加；
10. 候选 0 在真实基线中同样有效或更有效。

## 十二、第一阶段未决问题

在读取历史架构前，仍需保留以下真实不确定性：

- Codex hooks 在用户当前 Windows App、服务器 CLI 和 ChatGPT Work 中的实际支持、信任和事件语义是否一致；
- Bridge `0.11.0` 是否会正式发布并同步到每个实际 Codex identity；
- 入口封套能否在不读取聊天正文、不增加输入热路径负担的情况下完成绑定；
- GitHub 私有仓库使用制品证明的计划与权限成本；
- 哪些科学管线值得迁移到 Nextflow/Snakemake/DVC/MLflow，哪些已有 Slurm/checkpoint 合同更经济；
- 项目门禁提供者的最小接口能否覆盖真实差异而不演化成新 DSL；
- 证据封套的 Git 历史体积、敏感信息边界和清理策略；
- 两个试点是否能在真实任务上胜过“只修现有流程”。

## 第一阶段结论

推荐继续研究候选 5，但它必须被约束为**薄型证据与入口绑定层**，不是新的研工平台、任务数据库、全局调度器或自动审查器。现有 Bridge、AI Skills、GitHub、项目门禁、Remote Compute Infrastructure、Slurm 和 Lucerna 应继续保持清晰边界。候选 0 必须作为真实对照；若普通入口实证或成本指标不成立，应直接选择“不建设新的公共系统”。

下一阶段可以读取历史架构材料，唯一目的应是用历史证据攻击、修正或否决上述候选，而不是把既有方案当作默认答案。

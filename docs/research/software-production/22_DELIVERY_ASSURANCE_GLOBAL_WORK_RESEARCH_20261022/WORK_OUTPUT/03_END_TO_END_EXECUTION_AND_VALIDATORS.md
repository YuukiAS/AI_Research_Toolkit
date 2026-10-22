# 从普通请求到交付：调用合同与验收器生命周期

本文件是**待实现设计**。已有函数以固定源码链接定位；新增函数均明确标识。没有运行任何生产验收。本合同不授予资源、设备、账号、部署或发布权限，也不是可执行 Goal。整体组件归属见02，七仓特化见04，设计否决项见05/06。

## E1 一个用户请求到底发生什么

用户说“修好资源面板刷新，已有额度显示别坏”。支持的原生入口拟在当前会话生成轻量任务记录，不要求用户写 Goal。当前 Codex 读取原请求、实际项目权威和现有测试；把“刷新后真实数据更新、缺数据不能伪造0、旧Codex/OpenAI状态不退化”变成可核验义务。不是把所有隐含偏好变成新需求。确实缺少科学/产品标准才回原专业owner；已有标准但缺测试程序则给同一个 Codex 一个具体补验收工作项。

现有执行者实现、调用项目正式runner、拿到原始失败并修复；交付边界比较本任务必须成立的集合与同候选的证据。用户最终看见“真实安装版可用到哪一层、旧功能哪些成立、还有什么未证”，不被要求逐条点测试或转述FAIL。没有可运行的接收方、没有设备权限或Hook未生效时，这段体验尚未成立；不能把指导性提示写成强制保证。

## E2 模式与真实接点：已确定的接线选择

本节及文末 D4 取代此前“Lite 只能留恢复点、Control 返回 route 即会继续”的方案。**当前代码、确定新增设计、未来运行证据分开**。

|入口|现存调用|确定新增的消费位置|可承诺范围|
|---|---|---|---|
|无任务包原生|宿主 UserPromptSubmit、Pre/PostToolUse、Stop|Bridge `delivery_hooks.py` 的同名处理器调用共享库；Stop 的非空 reason 由宿主 turn loop 作为当前回合输入|已信任且实际支持的事件路径可同会话返修；失效时不能拦原生文字，见01 D1|
|已有 Goal 原生|同上＋原 Goal/resume 身份|Hook 只引用原 Goal；实际 Goal owner 消费反馈、继承剩余预算|不创建 Goal，不改完成含义，不自动越过暂停|
|Lite|release `cli.run_lite_task` L657，L715 单次 subprocess|在同一函数加入有界 `run_delivery_cycle`，JSONL 捕获当前 thread id；退出核验未就绪且可修时，对精确 id 执行 resume|同逻辑任务、同 Codex thread 的有限续修；不是新任务或守护服务。运行前冻结预算并受用户中断约束|
|Review|release `watcher_once→run_codex_event→executor_prompt`|run_codex_event 内使用相同有限 cycle；发布给 Reviewer 前核验；外部新 REVISE 仍由 watcher 原事件接收|机械返修不伪造 Reviewer 决定；外部审查等待不消耗 repair budget|
|Control|dev `route_current_findings`、`plan_transition`、`launch_executor_with_preflight`|选定新增 `agent_flow.consume_delivery_result` 和具体 `CodexExecRuntimeAdapter`；由**已启动的原 Controller Codex**调用新增 `control step`，一次调用只推进一个合法动作|没有运行中的 Controller 就不承诺自动唤醒；Persistent 只维持已获授权的 Controller 寿命|
|项目原流程|七仓 runner 与原 Executor/Parent/Controller|在当前模型调用 runner 的同一工具返回中输出统一反馈；原流程的送审/终态函数再次核验|不凭文档里的 Parent 名称假设有后台进程。实际入口映射见 D4、04|
|GPT Work/其他未证宿主|没有已验证等价 Hook/当前回合注入接口|原任务显式调用同一检查；保留原平台的合法恢复方式|不造 App reader，不自动创建远程任务；不宣称等价原生强制保障|

选择比较：只增加 FAIL 文件没有接收者，淘汰；让每个普通任务升级 Control 增加角色与用户操作，淘汰；另建调度器制造状态冲突，淘汰；**优先当前回合接收，受管启动器有限 resume，外部等待沿原流程**，选定。只读本轮没有执行上述新增调用。

## E3 任务身份与存储：不造第二个CURRENT

待实现的公共数据放**既有任务证据根**的delivery_assurance/内。Lite沿results/<task_key>，Review/Control沿其task路径，CARE沿任务result根。原生无任务包入口可用忽略入Git的 已配置 Bridge state 根/delivery_sessions/<session-id>/<request-epoch>/delivery_assurance/；这里只存源/证据/恢复引用，不推进工作流。目录名非权限来源。

admission.json：schema_version、entry_kind、runtime_version、session_id/turn_id（可空但原因必填）、task_key、repo/worktree、branch、baseline、dirty_ownership、source_bindings、claim_requested、effect_refs、owner、scope_revision。
obligations.json：原请求locator、冻结标准locator与版本、required行为、不可替代条件、should_not_change、对象关系、coverage_unknown。
resolution.json：所选检查、理由、缺口、复用结果、权限/环境需求。
runs/<run_id>/：immutable evidence manifest + 原生runner结果 + 适配后的逐义务结果。
work_items.json：当前原owner可消费的失败；追加history不覆盖失败记录。
claim.json/report.md：由上述数据派生，可重建，绝不是另一个任务状态机。

原生每条消息先关联当前未结task；修正/追问保留identity。新目标由当前模型明确关联或新epoch，语义无法确定且会影响目标才问用户。不能把同一session所有对话合成永久一个任务，也不能每个Stop制造新任务。并发用现有owner的任务锁；保存使用临时文件+原子替换，幂等key绑定session/turn/event/candidate。锁不能提供跨同用户恶意篡改隔离。

## E4 首次发现与动态选测

发现顺序：有效分支AGENTS/正式合同→实际package/CLI/路由/构建与发布清单→测试/回归→接受基线→历史根因。产生可审查草案，不要求用户手写adapter。逐项对照公用入口与消费者：找不到标准、没有runner、没有observer、环境不可达、无权限分别保留。扫描只能增加遗漏发现概率，无法保证发现所有语义旧功能；G2要求项目普查与盲抽样，不允许“FULL已过”抹掉未知边。

**选测算法（待实现）**：

1. 从原任务claim构造必需义务，联合受影响旧行为；不能从现有gate数组反推需求。
2. 求批准基线→当前内容的变化集，含已提交、暂存、未暂存、相关未跟踪、rename/delete与生成器/锁文件。
3. 在目标图求反向消费者闭包；孤儿入口/消失边/空adapter产生COVERAGE_UNKNOWN。
4. 对每义务找同类定义：同目标行为、owner、证据方式、正常入口、失败语义、生命周期则复用；仅添加新样例不新建类。
5. 正式交付取全部required union；开发期运行cheap checks与已形成纵向链。已知共享变化选BROAD，身份/标准未知先修映射而不是盲跑FULL。
6. 旧结果仅当所有semantic inputs、oracle/runner/observer、目标与环境能力仍相符、未撤销/未过期才复用。报告/receipt-only提交不使无关二进制失效。
7. 输出每项run/reuse/not-applicable/blocked原因。required缺失不允许ready；未适用需依据，不能默认False。

**具体输入输出（设计）**：Lucerna改 provider_runtime.rs，要求资源卡真实刷新；依赖消费者包括codex_quota/openai/longleaf，候选EXE有新hash。输出BROAD：provider freshness单测、旧quota动态桶与null语义、OpenAI计量映射、Longleaf未观测/子路径故障回归、同EXE/PID原生刷新。无关Zotero迁移若依赖闭包/输入不变可复用；实时账户无授权时对应项blocked、源码子结果保留。只改README且不改变产品/安装命令语义，则TARGETED文档/链接检查，不打开Windows或跑Slurm。

## E5 验收定义的真实格式示例

以下YAML全为**待实现设计**，路径/函数是候选新增；并非已安装配置。它扩展已存在的Lucerna验收runner，不新写万能运行器。

```yaml
schema_version: da/2
object_type: GateDescriptor
# 下列为便于读者理解的非完整示意，正式字段集以 D6 为准。
id: lucerna.provider-state-truth
owner: Lucerna
standard:
  source: docs/workflows/LUCERNA_EXECUTION_GOVERNANCE.md
  revision_binding: frozen_source_manifest
behavior:
  - displayed values preserve account, unit, period and missingness
  - refresh reaches real provider and current surface
claims: [source_mapping, installed_refresh]
source_inputs:
  - src-tauri/src/provider_runtime.rs
  - src-tauri/src/codex_quota.rs
  - src-tauri/src/lib.rs
  - src/main.ts
runner:
  existing_entry: scripts/development-acceptance.ps1
  proposed_adapter: scripts/delivery/validate-provider-state.py
  executable_binding: approved_runner_registry
  output_schema: DeliveryObservationV1
observation_requirements:
  source_mapping: [independent_input, expected_mapping, actual_mapping]
  installed_refresh: [exe_hash, pid, run_id, native_action, provider_observed_at, postcondition]
controls:
  good: dynamic_quota_two_inputs
  bad: fixed_value_and_missing_as_zero
  missing: absent_provider_observation
  unchanged: codex_dynamic_buckets_and_longleaf_unknown
effects:
  source_mapping: workspace_only
  installed_refresh: authorized_exact_desktop_and_provider
lifecycle: active
```

真实实例还必须填来源blob与完整argv，descriptor不内嵌shell字符串随意执行。示例标准要求“剩余”时如果provider没有可信上限，标准不完整，不能硬配fixed limit。Mathpix 680是对抗输入，不是当前Lucerna源码确认bug。

## E6 可实现的检查核心与局限

下面Python为**待实现设计示例，未运行**。仅演示最小计算与缺证处理；外层必须校验来源、candidate、输入覆盖和观察者。它不是生产程序，也不替代真实安装验收。

```python
from decimal import Decimal, InvalidOperation

def quota_case(raw, observed):
    required = ("account", "unit", "period", "limit", "used")
    if any(raw.get(k) is None for k in required):
        return {"verdict": "UNKNOWN", "reason": "authoritative quota data missing"}
    try:
        limit, used = Decimal(str(raw["limit"])), Decimal(str(raw["used"]))
    except InvalidOperation:
        return {"verdict": "UNKNOWN", "reason": "invalid provider number"}
    if not limit.is_finite() or not used.is_finite() or limit < 0 or used < 0:
        return {"verdict": "UNKNOWN", "reason": "invalid provider domain"}
    # Overage semantics must come from the frozen provider contract.
    expected = limit - used
    same_context = all(observed.get(k) == raw[k]
                       for k in ("account", "unit", "period"))
    try:
        actual = Decimal(str(observed["remaining"]))
    except (KeyError, InvalidOperation):
        return {"verdict": "UNKNOWN", "reason": "missing observed remaining"}
    ok = same_context and actual.is_finite() and actual == expected
    return {"verdict": "PASS" if ok else "FAIL",
            "expected": str(expected), "actual": str(actual),
            "reason": "same-context mapping" if ok else "mapping mismatch"}
```

校准至少：1000−320=680、1000−500=500；恒680会过第一项、败第二项。缺limit必须UNKNOWN；跨账号/周期即使数值相同也不能PASS。金额舍入、超额/负余额与单位换算须来源合同冻结，不能偷用本例的精确整数规则。真正数据真实性仍要求独立provider观察；给函数喂自造raw只能证明计算。

聚合核心（待实现）不是取退出码：expected obligation set必须非空且可解释；每项要求唯一有效result；校验task/contract/candidate/input/runner/observer/evidence；缺字段/未运行/skipped/neutral→UNKNOWN，明确违反→FAIL；required均PASS且独立审查/权限等前提成立才给**对应claim**，没有全局万能PASS。一个runner内部多项不能压成总绿灯。

## E7 缺程序、失败和逐跳返修消息

admission发现标准已定、程序缺失时生成下列工作项，拟由run_lite_task的prompt或原controller的Executor payload读入：

```json
{
  "schema_version": "da/2",
  "object_type": "Feedback",
  "work_item_id": "W-provider-mapping",
  "task_key": "existing-task-key",
  "kind": "BUILD_VALIDATOR",
  "standard_ref": "frozen-source-manifest#provider-state",
  "owner": "Lucerna",
  "write_scope": ["scripts/delivery/validate-provider-state.py", "tests/provider-state"],
  "required_controls": ["good-two-inputs", "constant-680", "missing-limit", "old-codex-quota"],
  "return_to": "existing_executor_result",
  "authority": "current-task-scope-only"
}
```

具体失败示例（拟议，不是本轮实测）：run R2 / obligation quota-mapping / candidate C2 / actual remaining=680、expected=500；raw evidence绑定第二输入；classification=IMPLEMENTATION_BUG；只允许修值映射与相关测试，不能改公式或删第二输入。runner stdout返回完整结构且保存原始报告→当前Codex读到W2→在同task ack W2→修复→重算影响→重跑两输入、missing和旧quota→新run R3闭合W2。若失败来自错误PID，分类改为PROVENANCE_BINDING_GAP→采集owner修定位→原对象重采，产品不跟着改。

Review：W2附在现有Executor结果，Reviewer审后写本round REVISE；watcher_once按现有CURRENT选择事件→run_codex_event→executor_prompt传入W2及REVIEW。不可绕过Reviewer直接伪造其决定。Control：适配为现有finding→write_current_findings→route_current_findings→原Controller消费route并建立已有RoleLaunchRequest→launch_executor_with_preflight。当前源码已存在这些函数，**拟新增适配与真正Controller接线尚未实现/验证**。

native：on_stop只有在任务身份匹配、用户未中断、预算尚有且支持续修时返回阻止完成和W2摘要，宿主将其交给同会话。若此平台不执行Hook，不能保证“完成”文本被拦，G1。Lite子进程已经退出则只拒绝ready、保存原task恢复点，不额外启动进程。外部Reviewer没有自动返回connector则G4，不拿待办文档冒充消息送达。

归因规则：product→Executor；validator→原验收程序owner；observer→采集owner；identity/env→Controller；standard contradiction→原专业Planner；AUTH→当前用户；科学充分负结果→科学Planner决定STOP/下一路线。相同原因为第二次无新信息时先根因审计，不能仅换命令名重试。第三次也不自动获新预算。

## E8 验收器全生命周期与防自签

对象须分开：通用标准（领域source）/项目参数（项目合同）/测试程序（专业runner）/回归样例（项目incident）/真实观察者（工具或Reviewer）/运行记录（每次run）/任务结论（原owner）。标准明确不代表程序存在，程序存在不代表观察发生。

创建：扫描发现缺口→当前Executor收到BUILD_VALIDATOR→按标准补程序→good/bad/missing/unchanged校准→专业owner准入→真实runner运行。若标准缺失直接回专业owner，禁止填任意阈值。已有类别加案例、程序坏修程序；新类别用E4六维测试，26类目录不是必须安装26个Gate。

更新：产品与validator同时修改并非一律禁止，但判定权不能一起松绑。冻结参考先于候选；改validator需独立准入与旧bad回放，保留差异和受影响PASS失效。高风险验证在候选不能改写的参考/独立观察环境执行；同用户hash/锁不足以提供安全隔离，G3仍需实施验证。不能以regex扫关键词代替专业判断。

暂停：单任务skip、环境不适用、限期pause、永久retire是不同动作。暂停required能力意味着相应claim未证，直到有批准的等价替代或原owner合法取消该产品目标。退休/合并迁移历史bad、消费者映射、描述与alias；删除检查不能删除旧用户保护。用户可自然语言提出“暂停某检查”，系统解释具体损失和替代，不要求用户找配置键。

维护：canonical source→生成插件→formal release→每consumer适配→实际loaded payload/fresh normal entry。维护板只引用现有任务，不能另建状态系统；未知consumer不能批量DONE。回退采用已验证兼容版本组合，保留未决义务；退出DA保留原项目checks与历史证据。完整实施与成本见06。

## E9 每轮报告样例（设计，不是这次产品运行结果）

“资源面板的数值映射已修好，旧Codex额度与Longleaf未知状态回归通过；真实账户刷新仍未验证，因此这次还不能称桌面功能交付完成。下一步由当前任务在获得指定账户与桌面权限后补一次真实刷新验收。”

- 新增：本轮没有新增验收类别；在状态真值类别补了第二输入与缺上限回归。
- 加固：同次运行EXE/PID/截图绑定；复用旧Codex动态桶和Longleaf状态测试。
- 实际执行：候选C2上的计算/状态检查，结果逐项链接R3；原生账户检查未执行，原因是缺当前授权。
- 证据复用：未改变的Zotero迁移检查沿依赖证明复用；无关硬件不运行。
- 修改/关闭：没有关闭检查、没有调整专业阈值。
- 自动返修：W2已由当前Executor修复；原生证据未闭合，恢复定位沿原task，不新建Goal。

真实报告必须从实际run rows生成这些事实。可采用既有Notifier表达适配，但不得为了报告多开无限模型调用；表达失败使用确定性中文模板，状态不变。对长任务可读进展沿原progress来源，不新建控制台服务。

## E10 对第21号公共216问的逐项回答

以下编号与原C01–C36的每组1–6一一对应；它们是可审查设计回答，不是运行通过登记。对应组件在02，具体七仓在04，覆盖矩阵保留原问题全文。

### C01 用户消息进入哪个真实任务入口

1. Desktop/CLI/Remote 原生消息由宿主接收；已知可用扩展点为 UserPromptSubmit。Lite=run_lite_task，Review=run_codex_event，Control=launch_executor_with_preflight；GPT Work 没有本研究已证实的同等 Hook。
2. 原生拟由 on_prompt 提取 session_id/turn_id/cwd，在当前任务证据目录分配 task_key；不创建 Goal。Bridge 使用已有 task_key，项目控制器使用自己的 identity。
3. 仅 Skill/AGENTS 触发属于指导层；没有确定性前后入口就标 OBSERVATIONAL，不得称 ENFORCED。
4. 只生成原请求及 repo/worktree/dirty ownership/现有权限引用的投影，不搬迁工作树或开线程；改变执行模式须现 owner 合法交接。
5. 正常执行中的入口向当前模型/调用进程返回明确 UNSUPPORTED/NEEDS_EVIDENCE；完全未运行的 Hook 无法自报，G1 保留阻塞。
6. 试点必须从一条未准备任务包的普通功能请求开始，记录宿主事件、接收端、真实检查和最终失败/修复；内部 helper 单测不算。

### C02 目标与不能降级的交付承诺如何冻结

1. 当前 Codex 从原请求和正式来源提取行为、数据、规模、结果与不可替代条件，写 obligations；专业标准引用原 owner，不由中央模型发明。
2. 扫描接受基线、正式入口、构建/导出清单、测试和源依赖，把旧行为并入 should_not_change；覆盖不明不允许空集合通过。
3. 可由源码/官方规范推导的参数由执行者提出有来源的决定；产品取舍、科学语义及高影响授权才交原 Planner/用户。
4. 保存冲突双方的版本和原文定位；最新用户决定优先但不得推导额外权限；无法裁定交唯一原 owner。
5. 外部不可达产生缺权限或缺证据，不删除 obligation；假数据只支持 fixture 子结论，不能把目标的 LIVE 要求改低。
6. 合法变更由原 owner 更新 contract revision、原因和授权引用，影响依赖闭包失效；旧结果归档仍可查，不能覆写。

### C03 选择哪种原有执行流程以及返修能力

1. 先按项目既有治理选；Lite 默认，独立复核要求才选 Review，高 false-PASS 且需要独立 oracle 才 Control；CARE/Mica 既有 controller 优先。
2. 在 readiness 前准备 scope summary，原 owner 决定模式；Bridge launcher 只消费已选模式，DA 不启动第二 owner。
3. Lite 新发现复杂性先保留结果；仍可在同一活跃进程做有界修复；需独立多轮时经原模式合法交接，不偷增一次 codex exec。
4. 真实设备、长期运行、独立审查、付费与发布要求在 admission 揭示；正式执行包前冻结，不能晚到最后才问。
5. 纯咨询无产品改动可 NONE；文案局部检查是 TARGETED，公共生成器/协议变动才扩大；任务长短与文件数不是升级条件。
6. 分别核查 Lite 单进程、Hook 试点一次 continuation、Review max_attempts_per_event 与 review_round、Lucerna 最多三轮独立审查、Control 自有计数，禁止相加。

### C04 启动、提示、停止和中断钩子

1. UserPromptSubmit登记与注入，PreToolUse在受支持的变更工具前检查admission，PostToolUse在声明的纵向runner完成后消费结果，Stop末端核对，Interrupt撤销续修；均为拟接点。
2. 安装与信任分离：记录实际 Hook 文件及宿主接受的定义身份；定义改动重新走宿主信任，不伪造已信任标记。
3. 拟 on_prompt 读取原消息和当前 repo，写 admission.json，additionalContext 提供路径/摘要；当前 Codex 读取并回传所接受 obligation IDs。
4. event key=(session,turn,event,candidate)，原 owner 串行锁/原子结果防重入；Interrupt 标记优先于任何续修，已启动操作按其 owner 取消规则处理。
5. 官方存在不受tool hooks覆盖的路径；失败输出字段还可能使工具继续。受管策略可强化信任但不能外推完整拦截；G1要求跨host真实负例，不能只看配置。
6. Review 子进程 thread_id 当前为空；同逻辑任务不等于同 App 会话。各 host/profile/version 单独测试，不移用 CLI 结果。

### C05 技能发现、专业能力调用和强制消费

1. 从 installed/enabled plugin 注册和精确载荷路径读描述；绑定 canonical source、发布版本、加载目录及 hash。文件存在不证明当前会话加载。
2. runner registry 是确定性入口直接读的数据；Skill 负责解释/生成，不能作唯一调用条件。required obligation 无对应结果即不放行。
3. 缺插件/错误 CODEX_HOME/旧载荷返回 source gap；按既有 Maintainer 处理，获权后 fresh session；不能静默退成泛用测试。
4. 领域标准和项目参数分别带 owner/id/version；同名不覆盖。科学/产品冲突交原专业 owner，不能取更严数字投票。
5. descriptor 声明 observer capability 与最低证据；没有观察工具就 UNKNOWN，不因找到描述文件变可运行。
6. 程序坏由该程序 owner 修；无等价观察则保留高层未完成、继续独立低层工作。

### C06 项目规则、权威文件与 AGENTS 的生命周期

1. 跟随 root/nested AGENTS、task 指向的合同和配置 locator；路径迁移检查引用目标和 blob，不让用户维护第二份目录。
2. 固定分支/里程碑后读其权威；Bobbio develop 0.3 不能用 main 0.2 签字，Mica 旧 Goal superseded 只作历史。
3. AGENTS 留不变量与正常入口 locator；阈值、样例、完整协议在 owner 文件；不塞入每次运行清单。
4. 规则迁移由项目维护任务显式调用现有 PIE 能力；当前没有已证实的每次任务自动 PIE runtime，属于拟接点，不能靠写一句 AGENTS 算接入。
5. Bridge readiness 绑定 mandatory source 并检查 instruction budget；加载结果还须正常入口行为反证，不能从 hash 推导模型理解。
6. 缺权威或截断先诊断，只改授权的 managed block；不擅自提高 project_doc_max_bytes 或重写用户规则。

### C07 首次接入和项目适配文件

1. 接入者读取当前源码、入口、接受基线、发布脚本和历史；生成适配草案，用户只裁不可推导语义，不手填全部功能。
2. 路径规则从实际 import/build/runner 关系得出，参数从版本合同；每条边附 source locator 和自动/人工确认类型。
3. 对比代码导出/命令/路由/构建产物清单与 adapter；空映射、孤儿公共入口、未跟踪语义文件都拒绝就绪；通用完备性不可证明 G2。
4. 无 adapter 先做 admission discovery；可局部开发但不宣称全量旧功能保护；不能默认 NONE。
5. adapter 绑定 repo、effective branch、产品 milestone、环境类别；分支变动重算，设备证据不能跨设备继承。
6. 删改入口由 impact diff 发现，当前 Executor 修本地映射；标准变更走专业 owner；迁移前后旧坏例不得丢。

### C08 真实交付对象与依赖关系图

1. 图节点包含源、配置、生成器、依赖、构建、安装/部署、运行实例、数据/模型和读者产物；图只是可验证关系，不新建任务状态。
2. 先解析现有构建与清单，动态边由运行证据补；冻结需要的交付路径，不要求用户逐点录入；不确定边阻断相关 claim。
3. 共享 runtime/schema 改动取消费者反向闭包；Lucerna provider 变动至少检查各实际消费者，不能只查新卡片。
4. 候选是对象向量：每仓 semantic digest + 构建 hash + 安装/部署身份 + observer+input；缺一条 required edge 即身份缺证。
5. 从公共 API/路由/测试引用/生成目标对照发现遗漏；发现不了所有隐藏行为是 G2，不能用 FULL 假装知道未知功能。
6. 动态对象绑定观测时段、输入版本及消费时复核；时间戳不替代内容/hash，provider 变更使相关 LIVE 证据过期。

### C09 专业能力类别和验收定义的来源

1. 能力类别由目标行为、专业 owner、证据类型、正式入口、失败语义、维护生命周期六维区分；Mathpix 是状态真值实例而非必然新类。
2. 写可观察后置条件及禁止声明，禁止只描述退出0/文件存在；一 runner 可同时服务多义务但各自出结果。
3. 新按钮/新文件默认复用同类加回归；六维有实质变化才由专业 owner 新建，中央不审批科学标准。
4. 合并维护一个正式定义、alias migration 与旧 case 全映射；拆分则 required union 不得变少。
5. 标准未冻结时 Executor 收集原始材料和反例，不能挑方便阈值；交 Planner/专业 owner 的 NEEDS_GPT_PLANNER。
6. 标准留领域 source，项目留实例参数，生成插件层机械同步；两份同义标准不并存。

### C10 验收标准、权威来源与规则冲突

1. 优先原请求与项目正式合同，官方 API 提供具体语义；每条 obligation 保存来源版本与位置。
2. 额度例必须同账号/单位/周期/时间，缺上限不能由已用量算剩余；缺失保持 null/unknown，不能当0。
3. 已观测反例=FAIL；未观测必需事实=UNKNOWN；二者都阻止该高层声明但保留低层有效结果。
4. 冲突给双方原证据到专业 owner；更严格阈值可能科学错误，不自动合并。
5. revision 记录旧标准、原因、权限、迁移和影响结果；不可删除原标准来洗白旧候选。
6. 独立参考由冻结公式、原 API 响应、真实用户后置条件或已审 oracle 提供；产品输出不得同时作期望。

### C11 判断何时缺验收器、何时必须自动建立

1. 拟 prepare_delivery_obligations 在 admission 和首条链后比较 required behaviors 与 descriptor/runner/observer；Stop 再核对未闭合集合。
2. 分别输出 STANDARD_MISSING、RUNNER_MISSING、RUNNER_BROKEN、ENV_UNAVAILABLE、AUTH_REQUIRED、EVIDENCE_MISSING，不能一律 FAIL。
3. 标准已定则产生 BUILD_VALIDATOR work item：标准 locator、输入、good/bad/missing、owner path、argv 与回报格式；并入当前 Executor prompt。
4. Executor ack work_item_id 只是收到；实际 receipt 与产物校准才闭合；漏读/没结果则 delivery checker 拒绝 ready。
5. 未知标准写归因+最小问题到原 Planner，不产生假默认值；保留可做的无关工作。
6. expected set 来自原任务与独立入口普查，不从 adapter 的 gates 数量反推；非空功能任务遇空集判覆盖缺口。

### C12 验收器代码的生成、位置、运行方式和维修

1. 优先本项目既有框架/语言/runner；SeminarArc 延伸黑盒脚本，CARE 延伸 scientific validator，中央不重写。
2. freeze argv、工作目录、输入 schema、expected output、timeout、effect 和环境；授权由 host 核对，repo 里的 allowed=true 不授予权限。
3. 专业 owner 依据原标准与真实坏例评审，执行者自测有用但不构成高风险独立准入。
4. 程序异常/采集错误为 UNKNOWN+runner/observer fault；修程序后重新校准、重新解释原数据或必要重采，不改正确产品迎合。
5. 复用 Playwright/JVM/Room/pytest/native PowerShell 等已用工具；只有缺失观察适配才写最小 glue。
6. 脚本与 descriptor/standard/fixture 版本绑定；release source-first，消费者实际载入匹配才称可用。

### C13 验收器本身的反证与校准

1. good 用真实正常路径，bad 用历史根因的产品扰动，missing 删关键观测；另保留不应改变的旧能力。
2. 标准/阈值/控制样本由专业 owner 在候选前冻结；外部观察者读冻结版本，candidate Executor 无权改其判分权威。
3. 同一生产验收入口喂坏实现；仅变异结果 JSON 只能校准证据验证，不能证明会发现坏产品。
4. 用真实原观察区分产品、runner、observer、oracle；SeminarArc OCR 例先修错选择器并撤销假阴性。
5. 算法/阈值变更撤销依赖该判断的 PASS；原数据足够可重判，采集坏必须重采；不重训无关科研。
6. 同用户文件权限不是强隔离；哈希只能检测无意漂移。高风险仍需独立 owner/受限观察与不可被候选改写的参考；G3 未证明前不称防恶意伪造。

### C14 历史回归库、坏例来源和保留/退休

1. 任务 owner 保存 incident ID、原请求、源/产物身份、原观察与处置；重复根因关联既有 case 不抹掉。
2. 历史已修/风险/误判/当前源码缺陷分开，363不是当前 bug 数；本次覆盖表保留 UNKNOWN_CURRENT。
3. 优先同类别新 fixture/真实回放；只有六维边界变才新类。
4. 已接受保护仍被产品需要则保留，退休需替代等价检查和迁移证明，不能只按时间删除。
5. 开发坏例可见，独立 holdout 在冻结前由 Reviewer 保持独立；暴露后失去未见身份，不换题挑赢家。
6. 入口变更由该项目维护，先证明新回放能拒绝原根因并接受正常行为；不能只保留一个不可运行文件。

### C15 代码变更、影响分析和未登记旧功能

1. 以批准基线对当前最终内容，包含 committed/staged/unstaged/相关 untracked，记录用户文件归属，禁止自动 stash/reset。
2. 读 rename/delete/build dependency/生成器锁文件及跨仓输入向量；只读末次 diff 或 git diff 无基准不够。
3. 用发布/路由/command/export 普查与测试引用对账；未登记公共能力触发 coverage_unknown；不宣称完整发现隐藏行为。
4. 共享影响已知选 BROAD；候选/adapter/依赖关系不可信先修覆盖，再决定 FULL；全跑已知检查不能补未知标准。
5. 隔离依据是依赖闭包与不变量不变、产物字节未变及可复核映射；执行者口头说没影响不足。
6. 反向闭包列出 sibling obligations，生成可追溯选测原因；删除边必须审查，否则旧保护不消失。

### C16 每任务选择运行哪些验收及何时复用

1. 输入冻结义务、变更集合、依赖图、runner能力、旧证据身份、claim；输出 selected IDs、scope、理由、复用/未运行原因与未满足项。
2. 结果按 obligation/target 明细，runner 总 exit code 只是运行状态；其中一个失败不能被另一个成功覆盖。
3. 最终 required union 必须完备；相同语义输入/runner/oracle/环境且证据未过期才复用，不为 docs-only commit 无限重验。
4. 便宜静态/fixture 先跑，昂贵真环境到稳定候选；权限早预检，未获权保持必须项未证。
5. UNKNOWN applicability 留阻塞项而非 false；不适用必须有可审核依据。
6. 成对测试 README-only不跑原生、共享schema扩大所有消费者、adapter空/漏边拒绝；成本与漏测同时验。

### C17 开发中的检查时机与早期反降级

1. 现有 runner 返回一个真实端到端结果时调用 after_vertical_slice；还没有 runner 事件的入口必须新增明确回调，不能靠模型自称有了。
2. 早期检查结构/实际数据流/非占位/所需环境可达；最终截图全矩阵不在每次编译要求。
3. 读取真实 optimizer counter/梯度/干预，而非 args；12步不能算500步，loss参数须追到实际调用。
4. admission 列出确切账号/设备/费用，未经授权不先启动长工作；只执行授权的独立低成本部分。
5. 任何影响语义的变化让对应早期证据失效；最终必须绑定最终目标对象，不复制第一条链的PASS。
6. 当前命令返回失败+work item到当前 Codex；若进程已结束，只能由已有合法 watcher/controller 继续，不能暗建后台。

### C18 真实接口、凭据与数据来源真实性

1. 项目 owner 核实官方API/数据合同与账户可用能力；本轮未调用 Mathpix 或任何私有 provider。
2. 保存脱敏原响应/输入签名和独立映射计算，再比产品显示；UI自报source=live不是证据。
3. 按当前授权的账号/目的/范围读取，secret只在授权本机；公开研究只放无敏感定位和汇总，不放原token。
4. fixture只证明映射/逻辑，真实安装/账号/物理设备声明需要对应观察；不得跨等级升格。
5. 解析违背已知contract为产品缺陷；认证/限流/接口漂移分别诊断，缺事实不强行判产品坏。
6. 可接受诚实未知状态作为错误处理子能力；原请求要求实时额度时仍未完成，不能说未知UI就是额度完成。

### C19 验收运行器、宿主和隔离环境

1. 当前 Executor或原 controller 调项目 allowlisted argv，绑定 cwd、代码/runner版本、run_id、目标进程/设备与输入；不执行任意repo字符串。
2. 依赖由项目维护者补齐在正常环境；工具缺失先定位既有runtime，不能开新remote task绕过。
3. Bobbio profile/dataDir比较、SeminarArc exact serial、Lucerna exact PID/desktop作为前置断言；本研究没有启动它们。
4. 等价环境必须是冻结合同已许可的同等级替代；无批准不得把真机换模拟器或偷偷提升权限。
5. 退出0不等专业正确；必须动作→后置条件与原始观测，和runner provenance同绑。
6. 结果通过已有review路径或controller导入，校验任务/候选/round；无可用connector则真实等待 G4，不要求用户假装自动。

### C20 原始证据采集、强度与缺失处理

1. 按义务收集原响应、完整操作轨迹、截图/DOM、PID/安装hash、数据库读回/导出内容、checkpoint/预测/GT/指标；最小必要。
2. 现有专业runner采集到原任务的evidence目录，私有材料留授权位置，GitHub只存可公开派生结果；缺权限为UNKNOWN。
3. 证据类别采用集合/能力要求，不假设一条通用线性等级；物理麦克风和浏览器视觉不可互相替代。
4. 脱敏须保留复核必需量；若裁掉关键语义，审查者必须UNKNOWN，不能凭红acted标签PASS。
5. 文件存在/非空/hash不能证明渲染或阅读；读者review明确目标/页/状态/观察结论与限制。
6. observer版本改变且原证据不可靠就重采，同候选完整向量不匹配则不能拼接。

### C21 领域专家、独立评审与专业质量判断

1. 视觉整体、科学结论和高风险独立要求按项目合同；纯函数有已校准oracle可机械验证，非每次加Reviewer。
2. Reviewer需访问完整对象与合法原始证据；资料不可得列缺证，不以Producer摘要代替。
3. 复用项目的Reviewer/Verifier，CARE默认不增角色；独立性是权限/材料/判定分离，不是另起Codex就成立。
4. Producer self-QA消灭明显缺陷；不能签自己的独立acceptance或改冻结标准。
5. 冲突附具体反例与原标准回专业owner复核，不能多数投票或机械要求更严；保留被撤销意见原因。
6. 失败写用户行为、期望/实际、截图/数据坐标与最小修复边界；自然中文说明影响，机器字段留附件。

### C22 候选、构建物、运行进程和结果身份绑定

1. 候选冻结源/配置/依赖/生成器/标准/runner输入的semantic digest；不是每个receipt commit都重新造candidate。
2. 项目runner记录构建hash、安装标识、PID/设备/URL状态与加载版本；哈希一致仅证明对象相同。
3. 对象或依赖改变沿图失效；report-only更新不改变runtime但若改科学结论需重新审读者产物。
4. 控制/日志排除规则由owner审核，候选由实际语义文件得出，不能让实现者随意排除改动。
5. 向量绑定所有仓/服务/模型/数据版本及集成关系，未同批冻结不可声称整套产品完成。
6. 身份冲突路由Controller/采集owner，保留已有低层事实；禁止ready，不擅自重建/部署不同对象。

### C23 每项结果怎样形成可消费的判断及完成声明

1. 每项含task/contract/obligation/target/candidate/runner/observer/input/evidence/verdict/原因；完整字段见03格式。
2. 多维记录runner运行状态、产品判断、证据缺失；已知FAIL与UNKNOWN可同时存在。
3. 按required set逐项汇总，不平均、投票或用全绿摘要；缺行与重复冲突直接拒绝。
4. source/unit成立可报告；installed/live/scientific结论不成立就明确保留，不能把部分完成写全任务done。
5. 源码测试不授权安装/部署/发布，build成功也不证明实际加载。
6. 拟 existing completion boundary 调 validate_delivery_claim；Control predicate、Review发布就绪边界、项目finalizer各由原owner消费；尚未接入者G4。

### C24 失败代码如何自动变成下一步工作项

1. write_work_item保存actual/expected/source/raw evidence/分类/owner/allowed repair/invalidations，绝不只写FAIL。
2. 活跃runner返回当前Codex；Review经当前REVISE事件由watcher_once→run_codex_event→executor_prompt读取；Control typed findings走现有route_current_findings；native Stop待实现。
3. 工作项ack标明ID和理解的修复范围，closure必须有本轮新结果；没有ack/新结果不推进。
4. 产品给Executor；runner给原runner维护者；observer给采集者；env给Controller；标准给Planner；授权给用户；身份给Controller；科学NO_GO给科学Planner。
5. 同task_key和contract revision保存根因/attempt，不新Goal洗预算；contract改变才走原合法变更流程。
6. 进程消失无owner时记录恢复命令/原任务路径与不具自动续跑事实；当前没有活跃消费者就保留G4，不输出无人值守承诺。

### C25 同任务自动返修、根因分析和停止预算

1. Lite一次subprocess；原生Hook只在试点验证范围内一次续修；Review watcher事件attempt默认2，独立review轮次另管；Lucerna三轮、Control/CARE各自合同。
2. 先分类和因果证据再改；根据修复影响重算检查，oracle改动重新校准，源不变不重跑无关大实验。
3. 同因第二次无新信息转根因审计，第三次仍无新证据停止盲试；这不是新预算，不能越过更低现有上限。
4. 活跃Codex由命令失败继续；外部返回由已有watcher/controller消费；不存在的owner不能由DA临时发明。
5. admission发现需独立多轮就先选正确模式；已耗尽保留未完成与同task恢复点，不借Stop再领预算。
6. WAIT不消耗repair/critic/retry轮次；新鲜REVISE且实际执行才消耗，stale review不触发。

### C26 Stop、用户中断、重复事件与状态一致性

1. Stop读当前obligations+resolution+claim；没有admission/结果不允许受管ready，但G1仍不能约束未运行Hook的原生UI。
2. 持有该任务短锁比较event key和last decision；同候选重复只读同结果，不重复执行测试/续修。
3. mode owner是唯一预算账；Review/Control下Stop只返回给原owner，不额外续修；native/Lite明确一次试点预算也不自动升级。
4. Interrupt写中断事实，Stop/watcher发起前再次核对；恢复需要真实用户继续与原owner，不把中断等价普通失败。
5. 受管发布器拒绝缺合法receipt；hook自身失效时native文本仍可能外漏，必须作为产品能力缺口而非PASS。
6. 可设计trusted hook的普通入口低摩擦试点；完整原承诺需跨host负例证据和平台补足，当前设计不闭合。

### C27 长期任务、等待、终态与断线恢复

1. CARE控制器/Slurm拥有寿命；Bridge Persistent只在terminal-owned需断线存活时获权使用，DA不持有job提交权。
2. finalizer sacct_job读取终态，AWAITING_SACCT按原策略处理；其continuation函数可能启动资源，必须原先授权，研究不运行。
3. COMPLETED只证明scheduler终态；finalizer继续输出存在、aggregation、mapper、validator，最终仍是送审包而非科学PASS。
4. 恢复先查原task/lock/job lineage/候选，不自动重提；Persistent stale/mismatch不可自行重启。
5. 外部GPT至少正常等待两小时且非deadline；状态有效就继续等待，其他独立任务不被拖住；低频无需模型忙轮询。
6. 若runtime adapter没自动等待/恢复接口如实标unsupported，给原任务恢复定位；不创建新后台线程来假装有能力。

### C28 高影响权限、真实账号、费用及数据安全

1. Host根据当前用户可见授权比对artifact/provider/recipient/用途/资源/费用/backend；文件authorized=true不构成批准。
2. 生成测试仅可执行当前授权工作；真实账号、设备、付费、部署、GPU仍过原边界，不因名字test便授权。
3. 可证明的同session同effect授权复用；关键字段或身份变化重新判；不建立跨重启永续授权数据库。
4. 拒绝不能换Python/bash/另一host规避；报告原失败及最小权限路径。
5. 继续纯源码/fixture等独立部分，所缺高层证据保持未完成；不让预算计数要求突破人类边界。
6. 敏感证据留本地受控位置，只共享已授权摘要/哈希；哈希也可能敏感需审，禁止公开医学数据。

### C29 故障归因和不应改变的系统边界

1. 从runner本身和原观察复核原因，至少product/validator/observer/source/env/auth/identity/science分开。
2. 修采集器只改合法采集路径并回放good/bad；不修改正确UI/数据来适配错误断言。
3. should_not_change来自原接受基线；Lucerna未观测非失败、Bobbio PDF不变、CARE no-T2等随任务选测。
4. 保留用户dirty工作；不动无授权tunnel/network/profile/jobs，精确PID/serial不粗暴按名操作。
5. 未知原因先收证/停止危险动作，保留低层结论；全量重跑不是诊断替代。
6. 原bad经同入口不再发生、good及旧行为仍成立、最终候选身份一致才关闭。

### C30 验收器新增、修改、暂停、关闭、删除的全生命周期

1. 报告由descriptor diff+实际run records生成新增/加固/复用/关闭清单及保护行为；没有新增明确说明原因。
2. 用户自然语言可提出修改某保护；当前Executor定位其唯一project/domain owner、原标准与消费者，不要求用户记ID。
3. run-skip是本轮；not-applicable需有依据；pause有环境/期限；retire永久迁移；缺required项时仍不ready。
4. 可用替代覆盖且三类回放等价或用户正式取消目标才可退休；用户停检查不自动取消专业最低标准。
5. 保留旧case与历史结果，alias迁移、重算required union、通知所有已知消费者；未知消费者阻止广泛退休。
6. source-first同步脚本/定义/adapter/必要AGENTS locator，正常入口fresh load与known-bad回放通过才发布。

### C31 中央插件和领域能力的更新与受管消费者适配

1. canonical skills/core/... 修改，经现有生成流程进入plugins；Bridge runtime在Bridge仓；本研究不编辑生成层。
2. 发布owner记录source/release/package/load身份；项目实际runtime status/normal entry回放，不只版本清单。
3. 维护板给每个已知消费者单独ADAPTING/DONE证据，七仓逐个；consumer inventory未知不全签。
4. schema-major冲突先阻止该consumer ready，保留上个兼容payload+adapter可回退；不静默强更其它仓。
5. fresh session通过实际普通任务得到新行为/坏例拒绝/旧行为保留；安装完成不等当前会话更新。
6. 维护板指向既有任务/发布receipt，不再建DA状态数据库；回滚仍保留当前产品义务，不变成绕过。

### C32 历史失败和跨项目经验如何转入规则、测试、责任

1. 原任务先保存真实incident；领域共性需第二消费者或同等结构证据，不能从一张截图泛化所有项目。
2. 有规则未消费先修入口/runner，禁止再复制同义提示词。
3. 相同六维能力多个consumer共享才提到领域source；账号/设备/路径/科研参数保持项目本地。
4. issue/TODO存指向与owner，执行状态仍在原任务；不双写CURRENT推进。
5. 中央等待不阻止已有兼容本地保护；局部补丁有版本和退出条件，不能永久fork标准。
6. 按首次错误位置分包：产品修项目、通用语义库修Skills、启动/身份修Bridge，不能全部归中央。

### C33 用户实际看到的报告、原因和下一步

1. 从artifact diff和run rows列新增/加固/复用/退休；列哪些旧能力实际通过及对应结果。
2. 首段用中文写用户可用结果与未证明平台；不能以状态码代替完整判断。
3. 每项失败一句用户影响+原因+下一owner+用户动作，展开才给原始证据；未知不羞辱用户或催QA。
4. selected/reused/skipped各有理由，required未跑显式阻止相应claim；不展示巨大无关测试表。
5. 链接同候选证据索引和正式维护位置，正文只讲重要结论；无新增也写一句。
6. 正常机器可解决的问题自动回原任务；真实HUMAN_ONLY最小问题一次问清；无connector明确缺口不能许诺无转发。

### C34 一次性接入成本、每任务成本和节省用户精力

1. 一次性量安装/信任/adapter discovery/校准/consumer验收人工分钟和模型token；七仓独立接入非一次大Goal。
2. 每任务量entry/selection/检查/repair/review/等待/报告的增量时长、token、CPU/GPU/设备占用；当前无基准不得编估实测值。
3. cheap-first，最终稳定候选才昂贵检查；早期必须揭示资源与权限，不能用延期隐藏不可达。
4. 与A路线同任务对照，测用户提醒、误放、误拒、返工、完成率与总成本；不是比较文件数量。
5. 预算耗尽保留已成立层级、失败原文与恢复点，不宣称完成也不清状态重来。
6. 若小改频繁FULL或维护净损，先修选择/缩小公共层；仍无收益退回项目原生入口，保留有用回归。

### C35 真实试点、未见样本和最终发布验收

1. 开发回归与独立未见样本分开；Reviewer在候选前冻结holdout来源/版本/判定，生产者只见必要范围。
2. 测试后样本暴露转开发集，不能重标未见；预设批次与终止规则，不能挑赢家。
3. 同candidate vector与真实安装/部署/数据run对应，重采受影响部分，禁止多版本拼绿。
4. 看完整真实产物与正常入口，内部JSON/单测不足；研究阶段未运行这些试点。
5. 每能力都跑good/bad/unchanged，另missing证据；按false accept/false reject分别计算，零观测错误也不等全域保证。
6. 逐环境/consumer限范围推广；G1未闭合不得写七仓一句话自动保障，G3不足不得写不可伪造。

### C36 正式落地、更新、回滚和退出策略

1. 先接口/权限/核心阻塞独立审查，再分包基础与项目小试；具体依赖和候选要求见06，不交执行Goal。
2. 每仓源码、安装、实际运行、独立验收、发布各有独立事实；一个仓PASS不签其它仓。
3. 版本向量兼容检查失败只回退该consumer已知可用组合；保留当前目标与必要缺证，不重写Git历史。
4. 新仓先建立最小真实纵向链+正式目标+good/bad/unchanged，不凭空宣称旧能力完备。
5. 退出移除DA接点前确保项目正常检查仍调用、未决工作有原owner、证据可读；不删除旧回归。
6. 试点若无净收益或持续制造无意义重验，删除通用机制/缩小到入口与身份；维护成本有真实否决权。
## E11 交叉核对后的接口、活动与命令边界

E3–E7的schema_version:1与函数例子是待实现内容模型，不是旧da/1的合法wire，也不是已经冻结的新版本。旧[da/1](https://github.com/YuukiAS/AI_Research_Toolkit/blob/f1426b6322870c7a9d42d83ff6ea7ad8a35837a3/docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PUBLIC_DA1_INTERFACE_FREEZE_V1_20261020.md#L22)要求必填字段或决策语义变更重新Planner/Critic。06 P0必须先决定兼容/替代和全部consumer迁移；unknown required version不消费，optional诊断字段不得改变判定。没有新冻结不能进入P1/P2。

“同任务”必须同时表达三层身份：产品task/scope revision；执行run/candidate；独立审查campaign/review target。产品修复保留目标、失败和预算，但candidate改变使对应旧结果失效。CUHK当前合同明确换部署snapshot关闭旧Parent，获准后为新snapshot准备新活动，旧token不复用；相同snapshot的合法工具session loss才走原有限续行。这个项目边界优先于任何通用“同一聊天持续修复”表述；DA不创建新Parent或增加预算。

工作项可被多个工具看到但只由原owner推进；ack含WID、task/candidate、receiver identity、原生工作流event引用、接收时刻和实际下一动作。写ack不等于执行成功；新run必须引用superseded失败并满足对应义务。只有文件、没有接收记录/下一跳则G4。原工作流CURRENT是唯一状态权威，delivery文件不另设终态。

拟议只读报告入口可由原Bridge CLI增加delivery report，读取原任务显式引用的claim与run，按E9生成摘要/明细；不扫描目录挑最新PASS，不开daemon，不改任务。用户也可在当前聊天询问“这次验了什么、关了什么、还缺什么”，当前owner返回同一派生报告，无需用户维护额外控制台。

## D4 同任务返修协议与确切消费者

### 1. 单一解析入口和结果

选定新增 Bridge `ai_bridge_kit/delivery.py` 负责文件定位、来源校验和宿主适配；AI Skills workflow-core 的 `scripts/delivery_core.py` 只计算义务、选测和 claim；项目 `scripts/delivery/adapter.*` 调已有程序并解释专业结果。Bridge 通过已安装插件 manifest 的固定 capability entry 调用 core，不能扫描 PATH 中名字相似的脚本。缺 core 或版本不合时返回 NOT_READY，原项目低层测试仍可独立运行。

所有边界调用 `check_delivery(context, result_refs) -> DeliveryCheck`（**新增接口**）：status 为 READY / REPAIR / NEEDS_STANDARD / NEEDS_AUTH / WAIT_EXTERNAL / STOP；包含 task_identity、scope_revision、candidate_identity、obligation_set_digest、result_refs、feedback[]、allowed_claims、resume_ref。此 status 是一次函数返回，不是新的持久 workflow enum。它映射回原流程状态。异常统一为 REPAIR 且 reason=RESULT_UNREADABLE / RESULT_SCHEMA_UNSUPPORTED / IDENTITY_MISMATCH；不能把解析错误映射到 READY。

feedback 必填 id、requirement_ref、candidate、actual、expected、evidence_refs、classification、recipient_role、allowed_write_scope、invalidates、next_check、budget_ref。id = SHA256(task identity + scope revision + candidate + obligation + reason + evidence digest)；不含可变时间。标准已有但检查程序缺失，classification=VALIDATOR_MISSING，recipient=Executor，附标准和 good/bad/missing/unchanged 校准。绝不让“生成工作项”本身算已接收。

`receipt` 分三个观察：DELIVERED=宿主已将 payload 送进模型输入（或 launcher 已以该输入成功启动精确 resume）；ACKED=该模型首次调用 `delivery ack <feedback-id> <candidate>`，Bridge 验证任务/授权并记录其 session/turn；RESOLVED=新的有效 GateResult 覆盖原失败义务且满足原标准。stdout 写出、文件存在、模型说“收到”均不自动等于 ACKED/RESOLVED。模型不 ack，工具前/交付前返回明确缺收据，但不得启动重复后台。收据证明协议消费，不证明模型理解；以实际修复新结果证明最终消费。

### 2. 原生当前回合

UserPromptSubmit 处理器只记录原请求与已有未结任务关联，并把 admission/required actions 的短上下文注入当前回合；语义义务编译由同一模型完成后提交给 core 验证，不在 Hook 内另调模型。PostToolUse 标记实际变化与过期证据。Stop 读取当前 candidate 的检查结果：READY 输出正常空控制；REPAIR 且预算允许返回 `{"decision":"block","reason":"[精确feedback引用及下一步]"}`；宿主实际消费位置为 [turn.rs L742–759](https://github.com/openai/codex/blob/2a77e82f09212c9e1bbf02656afca5d8172c5f9e/codex-rs/core/src/session/turn.rs#L742)。该注入本身是 DELIVERED，下一次工具调用 ack 才是 ACKED。不能用 continue:false 代替 block；前者停止处理。

重入以 task/candidate/feedback 去重，不以 stop_hook_active=true 一律绕过。一个失败最多两次**实际执行的修复**，第二次同因无新证据转根因诊断；默认总计两次 Stop 自动续修，嵌套回合共享同一 budget。已有任务更小预算优先；更大预算只来自原批准合同。预算到达仍可报告未完成和原恢复点，不改成 PASS。用户中断标记 cancellation epoch；Interrupt 只有短时保存用途，不能阻止中断，不能靠它自动重启。Hook 崩溃时交付边界拒绝缺证，原生文本限制保持01 D1。

无包任务存机器本地已配置 Bridge state 根的 `delivery_sessions/<session>/<request-epoch>/delivery_assurance/`，不依赖产品仓可写，也不把此记录叫任务控制器。首次有文件变更前保存原请求；缺上下文时继续对话恢复，不推定新目标。用户改目标保留旧版本并产生 scope revision，原义务只能凭明确请求或权威变更撤销。

### 3. Lite 的有限续修由原父进程实际执行

现有 [run_lite_task L693–715](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/ba9013b9fbbd242e51b09f9d09291f417df17652/ai_bridge_kit/cli.py#L693) 仅启动一次。本设计明确改变这个已知限制，不把新增行为冒充现存能力：

1. preflight 成功后，冻结原 task、repo/branch/worktree、授权、预算和 core 版本；启动 `codex exec --json -C <exact-root> -`，以 stdin 输入完整已绑定 prompt。新增父进程 JSONL reader 记录 `thread.started.thread_id`；其官方定义在 [exec_events.rs](https://github.com/openai/codex/blob/2a77e82f09212c9e1bbf02656afca5d8172c5f9e/codex-rs/exec/src/exec_events.rs#L11)。不解析聊天文字猜 thread id。
2. 子进程内 runner 的结构化失败先由当前模型修；结束后父进程调用 check_delivery。READY 只准相应语义通知；进程 exit=0 永远不是替代。
3. REPAIR 且尚有原预算、未取消、来源仍一致、明确 id 存在时，父进程以同 cwd 和配置调用 `codex exec --json resume <exact-thread-id> -`，stdin 含原约束与新 feedback。**不用 --last，不 fork，不新任务。**正式版本的 CLI 能力探针必须支持此参数形状才启用；源码 [ResumeArgs](https://github.com/openai/codex/blob/2a77e82f09212c9e1bbf02656afca5d8172c5f9e/codex-rs/exec/src/cli.rs#L238) 与 [thread/resume](https://github.com/openai/codex/blob/2a77e82f09212c9e1bbf02656afca5d8172c5f9e/codex-rs/exec/src/lib.rs#L1029) 已给实现依据。
4. 新 process 的 thread.started 必须仍为原 id；找不到原 thread、返回新 id、权限变化或输入 hash 不符立即停止续修。记录发出但未 ack 的同一 feedback，不能再以新 task 补跑。
5. 默认只允许初次执行后最多两次 resume，且 Hook 与父进程共享计数；启动前冻结 max_elapsed、原资源上限。取消/预算/授权等待时保存在原 task 的证据根，退出非就绪；不启动新的永久 owner。父进程崩溃则下次用户继续原入口恢复一次，只有已授权 Persistent owner 存活时才可按其合同恢复。

计数在取得排他任务锁后先登记 attempt intent，再启动；崩溃窗口若有 session 活跃证据，禁止并发补发；若只能确认进程退出而不能确认是否完成，先核验结果/查精确 session，再决定一次恢复。不以“至少一次”交付重复执行有副作用的命令。原有预算/权限是最外层上限，DA 不增加 GPU/设备/发布权。

### 4. Review 与 Control：不替外部角色决定

Review 在 `run_codex_event` 内接同一 cycle，`executor_prompt` 带 feedback refs；周期结束才回 `watcher_once`。代码 L861–864 读取原 CURRENT，新增检查保证它在证据不就绪时不能发布“待审候选已齐”。语义审查照旧写 fresh REVISE；watcher 的 event identity 与 max_attempts_per_event 不被 DA 清零。一次 event 内的 repair 次数不是新的 review round；进程启动失败计 launch attempt，等待不计任何 repair。已退进程与新鲜外部决定由原 watcher 执行；watcher 没启动时就没有自动消费，不能报告已进入后台。

Control 关键事实：[RuntimeAdapter L485–489](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/7f43e146eed50d290ef9cc6ab912d106f754042c/ai_bridge_kit/agent_flow.py#L485) 仍是抽象类；[main L2769–2775](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/7f43e146eed50d290ef9cc6ab912d106f754042c/ai_bridge_kit/agent_flow.py#L2769) 只打印 route/transition。因此本设计选定：
- `consume_delivery_result` 把机械事实追加到现有 evidence/findings 输入，不伪造 Planner 分类。
- 新增一次性 `control step`：锁定原 CURRENT → validate_task_state → plan_transition → 若是合法 Executor 动作，用具体 CodexExecRuntimeAdapter 和 launch_executor_with_preflight；角色分离、授权路径、repo/branch 全部仍由既有合同限制 → 捕获真实 session、RoleReceipt → check_delivery → 按原允许转换 apply_transition。每次最多一动作，返回完整结果给**调用它的原 Controller Codex 工具回合**。
- 具体 adapter 是既有 RuntimeAdapter 的实现，复用上述 JSONL/resume，不能构造新分支、换身份、自动起 Planner/Critic。Controller 的 prompt 在每个工具返回后读取 next_action；外部角色动作输出等待，必须获得该角色新鲜工件才继续。Persistent 如已被准确授权可承载这个原 Controller；否则进程结束后由同任务恢复，不伪装 daemon。
- apply_transition 在送审/候选通过处加入 check_delivery predicate；失败不改成 PLANNER_PASS。产品或科学取舍只能沿已有 Planner 分类，不能由 Controller 自动降标准。

### 5. 七仓原接收者与断点

|项目|runner 返回给谁|最终再核验位置（新增调用）|谁持久保存／恢复|
|---|---|---|---|
|Lucerna|调用 development-acceptance.ps1 的当前 Executor；若原独立原生流程已启动则反馈给其 orchestrator|development-acceptance.ps1 的 candidate admission/交付报告出口|原 task result＋原执行者；独立流程最多三轮，DA 不增加轮数|
|Bobbio|调用 Safe runner 的当前 Executor|Safe runner 总结与 CURRENT_MILESTONE 就绪材料生成处；不自动改里程碑|原 milestone task；设备/账号等待保留该任务|
|Mica|调用 acceptance CLI 的当前 Executor/已存在 Parent|cli.mjs candidate→validateBundle 返回前，正式 ZIP/loaded identity 报告消费处|原 Parent/Goal；没有已启动 Parent 时不声称自动续跑|
|SeminarArc|调用 run-blackbox-acceptance 的当前 Executor|verify-gpt-work-acceptance 最终决策生成处|原 task result；真机断开先停止该项，不再安装别的设备|
|Asteria|调用 browser tests 的当前 Executor，独立视觉审查归原 Reviewer|RC 汇总/送审材料生成处，不改旧视觉标准|原 RC task；需要新判断就等待原 Reviewer|
|CUHK_Date|原 Parent 调用 hosted audit；handleAuditTicketSession 返回同一 ticket owner|evaluateParentDeliveryGate 与原 campaign finalization|原 campaign/ticket lease；换 snapshot 必须按项目合同关闭旧 campaign，创建新活动仍需授权|
|CARE|原 Controller 调用 finalizer 获得完整结构与 exit|care_milestone_finalizer 的送审包生成前，当前 Controller 的科学终态判断处|原 route/task/Slurm job identity；科学负结果交 Planner，不能再投新作业|

上表不是声称这些程序已经内置 DA。新增接点和谁读取已确定；若当前没有活跃模型/Controller，恢复位置仍在原任务，后续必须通过原入口合法继续。ACK 包含 task/run/candidate，旧评审/旧反馈不得反复触发修复；权限不足只阻塞相关动作，其它独立工作继续。

## D2 旧功能保护：选定“入口清单＋反向依赖＋接受基线”的有界算法

### 路线比较与保护边界

只相信手工 adapter 会漏掉从未登记的功能；每次全跑现有 tests 同样漏掉没有测试的行为；把整个仓库交给模型自由总结难以稳定复用。选定**机械入口枚举、当前模型语义归纳、受影响消费者闭包和基线对照**。机械层只声称枚举已识别入口，不声称理解全部产品；模型草案不单独获得通过权。旧行为的权威来自已接受版本及正式产品合同，不把当前 bug 固化成正确标准。

保护范围冻结为：adapter 支持的入口类型中全部枚举出的用户入口/公开 API/产物目标，及它们的可解析直接和传递依赖；当前改动涉及的动态/未知边显式进入覆盖缺口。入库清单显示 discovered、mapped、tested、reused、unresolved 五个集合及差集，不输出“全部旧功能已保护”这种无边界结论。私有未访问入口、动态生成且不能解析的消费者、不可恢复接受历史只能列未证；不让用户手写补全整个产品。

### 具体数据与调用

首次 admission 调新增 `discover_surface(repo_snapshot, adapter)`。项目 adapter 只声明已有语言/构建工具与入口提取器，不扫描私有主目录或运行产品。来源依次为构建/发布 manifest、注册表/路由/command 定义、公共 export、UI action 到后端绑定、已有 tests 和 accepted reports。用项目现有 TypeScript compiler/构建依赖输出、Rust module/command 注册、Android manifest/导航/Room schema；没有现成结构化提取器时先做有来源的文本定位草案，再由当前模型读上下文确认。文本匹配没有语义确认不得成为“无影响”证明。新增机械提取器必须回放 rename/delete/间接 import/动态注册负例。

输出 SurfaceEntry = {stable_id, kind, source_locator, action, normal_entry, final_target, dependencies, dependency_completeness, accepted_baseline_ref, observation_ref, owner}。id 来自稳定动作/API/对象标识，不用行号；重命名保留 alias。每条行为进一步映射到 obligation 和 GateDescriptor，缺任一条产生具体 COVERAGE_GAP，接收者为当前 Executor 的 adapter/测试补齐任务；发现正式语义冲突才交专业 Planner。

七仓入口来源已选定：Lucerna Tauri command/provider registrations＋UI card action；Bobbio Tauri Zotero commands＋Reader action；Mica extension manifest/background message/action＋export/low-memory pipeline；SeminarArc Android manifest/navigation/usecase/Room migration；Asteria graph projection/view route/control event；CUHK Web routes/API contract/campaign surface registry；CARE正式 CLI/配置消费/数据模型与产物链。不得把 README 功能列表当作唯一分母。

### 动态变化的确定性规则

1. 变化集为接受基线到当前候选的完整内容差异，包含已提交、暂存、工作区、任务相关未跟踪、重命名/删除、锁文件和生成器；不只读 git diff 的未暂存部分。
2. 从变更节点求反向可达消费者。共享模型、schema、generator、序列化、权限入口改变，扩到全部相关产品目标。delete/rename 同时保留旧边，证明旧消费者迁移后才移除；若只按新图求闭包会把被删功能漏掉。
3. 新发现入口没有映射、登记入口在源码消失、required 测试删除、公共 API 无消费者、依赖解析失败，分别生成孤儿项；不能变成 NONE。动态未知边使其所属产品范围 FULL；范围本身不明则全项目 FULL，并保留未知义务阻止完成声明。FULL 是全部应覆盖义务的解析和证明，不是“把有的测试都跑一遍就绿”。
4. 复用必须逐项比较旧结果的 definition/authority、subject/target、正常入口、runner/fixture/rubric/observer、环境能力与有效时窗；改报告不改运行语义可复用，改 collector 则原观察失效，改阈值但原采集完整可重新判定而不必重采。新 EXE 不能拿旧安装结果，但源码未变的独立数学单元结果可有说明地复用。
5. 每次工具变更后标记 dirty；第一条纵向链、共享层接通与交付前重新选测。缓存键为内容摘要＋提取器版本，缓存 miss 只是重新发现，不授权运行产品。
6. 维护时比对 accepted SurfaceEntry 与当前集合；退休必须说明消费者迁移/功能经用户批准取消，附保护转移。不能以无命中自动删除旧行为。

### 低成本反证与非特制抽查

机制推演：Lucerna provider_runtime 改动，即使 adapter 漏了 codex_quota，Tauri/provider import 与旧卡动作会产生孤儿或反向消费者，不能只验新卡；SeminarArc 删除旧 repository 方法，旧图仍把搜索/导出连入；Asteria 已提交过的 validator 修改在基线差异中仍可见；CARE 新 train 参数未到 forward/loss 的链会产生未消费义务，而不是仅查 argparse 字段。

正式试点在冻结清单后，从独立枚举的入口集合中按 candidate digest 的可复算序列各取“一个非本次改动旧入口、一个共享消费者、一个已删/迁移入口”；没有第三类则取第二个不同旧入口。每仓最多三项，明确分母与抽样理由；不能由 Producer 挑最容易的三个。抽样人/独立检查负责对照源码和真实后置条件，本轮没有运行该独立抽查。发现漏项要补提取规则和同类回归，再重算整个受影响集合，不只补一个名字。日常任务仅重扫变更依赖，完整盘点发生在首次接入、提取器升级、公共入口/共享模型变化和发布候选；不新增定时扫描服务。

## D3 观察与标准：选定分级独立性，避免每个任务都重型审查

### 不同的可信对象

- 标准/阈值：来自原请求、正式项目/领域合同和已接受基线，冻结于候选生成前；authority locator 与内容摘要并存。模型不得修改标准后当作自己的授权。
- 产品：允许当前 Executor 在获权范围内修改；构建/安装/部署身份独立记录。
- 程序与 collector：专业 owner 维护；改动必须校准并失效对应观察。可由同 Executor 编写，但不能仅靠它的新 expected 和新实现互证。
- 原始观察：runner 从真实对象收集，记录采集路径、对象身份、时间和缺失；产品自报字段是输入之一，不能充当独立 truth。
- 判定：core 只验证绑定与覆盖，专业 runner/独立 Reviewer 判断领域含义；科学 Planner 决定方向与充分性，不能用 core PASS 代替。

### 三档能力，风险决定采用哪一档

|档|适用与最小证据|谁执行/消费|可信边界与限制|
|---|---|---|---|
|机械局部|确定映射/序列化/纯函数；冻结标准＋旧 good/bad/missing/unchanged，至少一组输入干预|当前 Executor 可运行已有测试；core 消费逐项结果|防常见同源误判，不声称抵抗持有宿主写权限的恶意 Producer|
|产品实际行为|安装、持久化、账号 API、视觉、权限、共享高风险改动；真实正常入口＋独立原始观察|原项目 runner 在限定环境采集；高风险/新 oracle 由项目已有独立 Reviewer 复核|只读参考放在候选之外；具体工具允许写的路径必须限制到输出/测试环境。若同用户 shell 仍能改参考，只算可追溯流程隔离，不写 PROTECTED_OBSERVATION|
|科学/受保护观察|训练规模/机制/结果充分性，或要求抵抗实现者自签的正式交付|原已授权 Controller/独立观察执行环境运行冻结 runner；Planner 判科学标准；结果在 Producer 不可写的边界生成|只有 OS/容器/远端权限或真实独立审查者控制的输出才能声明 protected。权限拓扑未证明时降的是证据声明、不是原要求；相应最终 claim 保持未证|

选择理由：所有任务强制独立模型会增加费用、引入等待且模型也可能同错；全靠 hash 只证明字节一致而非来源可信；全部上隔离服务会新建平台。选定复用项目原独立流程，低风险机械检查自动完成，高风险观察要求真正分离。新增隔离环境不在当前研究授权内；将其作为具体已有 runner 的部署合同，而非新 DA 服务。若项目没有独立运行边界，采用原 Reviewer 自己从候选启动并采集的低摩擦替代；仍不能把 Producer 的截图移交后叫独立观察。

**防替换规则：** runner 从冻结 authority ref 装载标准，不从候选工作区导入 expected；待审 validator 作为候选，先由冻结 calibration harness 执行旧对抗样例。新标准需要原 owner 明确修订并重新确认相关结果，不能自动更新 golden。运行前后比较参考/程序身份并记录 collector 来源；这能发现正常漂移，不能弥补同权限进程可伪造一切的威胁边界。

### 四个历史反例如何改变判定

|反例|必须采集什么|诊断与实际下一步|
|---|---|---|
|Asteria crossing=0 常量、ratio 缺失默认0|从最终渲染 SVG/path/节点实际几何或截图独立提取；禁止读取产品 data-* 自报 crossing 充当 oracle；已知交叉/越界坏图应被校准集拒绝|冻结几何参考与真实坏图先验 collector；collector 连坏图也报0→VERIFIER_BUG；真实图不合冻结视觉合同→IMPLEMENTATION_BUG；审美/语义冲突→原 Reviewer/Planner，不自定阈值|
|SeminarArc OCR 读错 EditText|控件语义/标识、完整 UI tree、图片/对应对象、独立导出或存储读回；“标签文本”与内容区别|已存在正确内容但定位错→OBSERVER_FAULT，修 selector 重采；真正重启丢内容→产品修复；不能只改期望为空|
|Lucerna 假状态/旧PID截图|两个不同输入、缺数据、真实 provider observation time、EXE hash/PID/run 的原生动作后置状态|固定数/unknown→0→产品错；旧PID/环境没观察到→采集/身份缺口；无可信上限→数据/标准缺口，不能伪余额|
|CARE validator PASS但科学充分性FAIL|原训练入口实际 step/time/梯度/病例/预测、Slurm lineage、独立 aggregation；机制干预与冻结充分性门分别评价|足量真实数据得负结果→科学 Planner 收到可信负结论；没训练/少步→实现或执行失败；程序误算病例→validator修复重聚合；不改充分性阈值刷绿|

Asteria 的静态脚本与浏览器脚本不能互称独立：两者共享常量或读取同一个伪字段时仍同错。SeminarArc UI 和数据库如都由产品自己捏造，也不能证明外部 OCR 正确；它们只能证明指定持久化行为。CARE 两次 eval 同 checkpoint 只能证明推理重载，不能证明训练恢复；训练恢复合同选择 deterministic CPU 小型机制 fixture 比较逐步 batch/RNG/optimizer/scheduler/参数精确一致，真实 GPU 则使用原科学合同已有容差；没有合法容差不擅自制定，报告未证并回原科学 owner。小 fixture 不替代真实医学充分性。

### 生命周期与成本

同一行为只补样例时复用类别；出现新观察方式或独立标准才新建 Gate。新增与加固都运行冻结好/坏/缺证/旧功能控制；缺任一种不得正式准入。暂停检查保留义务；限期、作用域、替代及到期回收写入原项目配置，由任务开始/交付时校验，不靠后台闹钟。永久退休必须把历史坏例与旧消费者迁给新 Gate 或有明确产品取消授权。中央升级先回放共享语义与全部已声明 consumer fixtures，再逐项目实际入口适配；失败只阻止该消费者升级，不批量写 DONE。成本优先顺序固定为来源/身份→机械检查→小纵向链→受影响真实目标→独立专业审查；没有任何 tier 为逃避原任务验收而自动降低。

## D6 唯一接口选择：提出 da/2，拒绝暗改冻结 da/1

### 1. 比较与决定

本研究**推荐新 wire 版本 `da/2`**，保留旧 da/1 文件作为历史权威，提交独立 Critic 重新审查；不是新研究轮次、正式发布或执行授权。理由是完整的义务来源、消费回执和观察信任绑定成为交付准入的必需输入，旧读者会忽略这些新增必需条件，不能用可选字段假装兼容。

|候选|代价与失效|决定|
|---|---|---|
|da/1 完全不动，仅加可选 hints|旧消费者可能在缺新义务/观察/接收绑定时仍给 ready|不选；无法表达新准入约束|
|明确 da/2，旧记录只诊断导入|要升级消费者与冻结接口；当前尚未发现生产 da/1 reader，迁移成本主要在设计/fixture|选定；严格版本握手和回退|
|弃用公共格式，每仓私有|少一次中央迁移，重复选测/身份/失效规则，七仓消费漂移|不选；保留为退出 DA 后的原项目路径，不并存两套通过权|

旧 freeze 固定来源：[PUBLIC_DA1_INTERFACE_FREEZE](https://github.com/YuukiAS/AI_Research_Toolkit/blob/f1426b6322870c7a9d42d83ff6ea7ad8a35837a3/docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PUBLIC_DA1_INTERFACE_FREEZE_V1_20261020.md)。旧 PROCEED 不能迁给本提案。旧 FULL 已表示完整义务覆盖而非重跑所有测试；本研究保留这个语义，不虚构该项冲突。

### 2. 实际消费者调查

2026-10-22 通过 GitHub 对 Bridge/AI Skills 与七仓默认分支搜索 `da/1`、`GateResult/GateDescriptor`，并核查固定 release/dev 的 cli、reviewed_runner、agent_flow 调用源码、各仓正式 runner。未发现这些已读运行入口消费 da/1；**搜索无结果不等于证明全部机器没有私有实现**。确定找到的相邻合同是 [PIE TODO L85–103](https://github.com/YuukiAS/AI_Skills_Collection/blob/f1de8e85957d32a50f4458349f450ec65add13bb/docs/skill-todos/project-instructions-editor.md#L85)，它把未来0.3与 da/1 绑定；对应 [PIE 0.3 审查合同](https://github.com/YuukiAS/AI_Skills_Collection/blob/f1de8e85957d32a50f4458349f450ec65add13bb/docs/design/project-instructions-editor/PROJECT_INSTRUCTIONS_EDITOR_0_3_AGENTS_ARCHITECTURE_CRITIC_PROMPT_V0_1_2026-10-20.md) 明确尚为架构审查，不能把未发布0.3当必需运行依赖。

迁移对象已确定：workflow-core 规范/fixtures；Bridge 三入口、Hook、Control具体adapter；七仓项目result adapter及交付出口；PIE相邻设计引用；AI Skills生成分发与consumer manifest。PIE不负责 ready、不成为 DA 首次运行前置条件；AGENTS语义维护沿当前合法编辑流程，DA验证 canonical authority/实际加载。外部已装 reader 在启用时进行能力握手，发现未知版本直接拒绝 DA ready，由原项目流程继续诊断；不自动转换或覆盖。

### 3. da/1 到 da/2 的准确差异

|对象/旧合同|da/2 决定|旧结果如何处理|
|---|---|---|
|全部 `schema_version="da/1"`|必须为 `"da/2"`，另有 object_type；未知主版本拒绝准入|只读诊断 importer，不能自动PASS|
|GateDescriptor 的 capability/failure/entry/evidence/judgment/identity/invalidation/cost/calibration|全部保留；新增 protection_policy 与 lifecycle_binding 为必填|旧定义可作草案，必须补标准owner/风险档/旧保护转移后准入|
|ProjectAdapter authority/AGENTS/targets/edges/impact/claim/owner|全部保留；新增 surface_inventory_ref、discovery_contract、consumer_binding|旧 adapter 不能以空入口集表示无旧功能|
|GateResult 的 decision=PASS/FAIL/UNKNOWN 与三轴证据|枚举及原含义保留；新增 obligation_set_digest、observation_binding、contract_binding、consumption_ref|旧PASS只保留其原声明；不能证明新coverage/观察独立/消费|
|Resolution NONE/TARGETED/BROAD/FULL|保留；另列 unresolved_obligations 与 unknown_edges，FULL不抹除它们|旧选择结果不能凭 mode=FULL晋升ready|
|claim tuple/USER_READY聚合|保留目标/能力/环境/时窗/层级；required集合必须绑定原请求和旧保护，禁止空集合|新ready重新计算；不由旧总状态复制|
|正常entry/失败路由的文本引用|新增 Admission、Feedback、Receipt 有明确 session/task/cancel/budget binding|缺实际接收者不签自动返修能力|
|authority安全单调性/标准变更|保留；标准、oracle、collector变更分别失效；专业取舍不交Executor|新旧authority冲突回原owner，不选“更近日期”|
|存储 `delivery_assurance/` 和原task CURRENT|保留，不使用初稿 `delivery/` 简写，不设第二CURRENT|导入定位显式，禁止扫描“最新PASS”|

### 4. 规范字段与类型（实现必须照此，不交 Codex 自选）

所有对象 UTF-8 JSON，顶层 object；必填 `schema_version:string="da/2"`、`object_type:string`。身份为非空 string 或具名结构，不允许 null 冒充空值；明确允许未知的内容用 `{status:"UNKNOWN",reason:string}`，不能写0。来源引用统一 `{repo,ref,path,blob_digest,scope}`；本地观察引用用 `{artifact_id,digest,locator,access_class}`，不得嵌入账号密钥。解析拒绝重复键、非法路径、必填缺失、未知 decision、未知主版本；扩展字段只许放 extensions，不获得准入语义。

**GateDescriptor 保留必填集合**：gate_ref、definition_version、authority_ref、authority_contract_ref、definition_digest、capability、failure_semantics、applicability、subject_types[]、target_roles[]、claim_support[]、normal_entry、evidence_requirements、judgment、regression_bank_refs[]、known_bad_refs[]、should_not_change_refs[]、invalidation、execution_requirements、calibration_requirement。normal_entry 必含 kind/root_ref/entry_ref 和 argv_schema 或 typed_parameters；不能把任意shell字符串当入口。evidence_requirements 必含 modality[]/fidelity[]/observer_requirement[]/required_observations[]/completeness_rule。judgment 必含 PASS/FAIL/UNKNOWN条件、rubric_ref与阈值约束。invalidation 必含 subject/target/runner/fixture/rubric/environment依赖及time_validity。execution_requirements 必含权限、cost_resource_ceiling、secret_classes、physical_target、long_run、side_effects。

**新增 Descriptor 字段**：protection_policy={risk_tier:MECHANICAL|PRODUCT|PROTECTED,reference_source,observer_required,calibration_refs[],accepted_behavior_refs[]}；lifecycle_binding={owner_ref,state:ACTIVE|PAUSED|RETIRED,effective_scope,expiry_or_none,replacement_refs[],reason_ref}。required暂停/退休但无合法替代时不能准入，不把生命周期state当任务state。

**ProjectAdapter 保留必填集合**：repo_identity、authority_ref、adapter_semantic_digest、canonical_authority_set[]、agents_authority_set[]、normal_entry_refs[]、capability_refs[]、targets[]、edges[]、impact_rules[]、parameter_bindings[]、source_set_rules[]、environment_profiles[]、claim_ceilings[]、long_run_owner_refs[]、human_only_boundaries[]。authority item保留 field_or_scope、authority_ref、canonical_locator、branch_or_release_scope、content_digest、supersedes[]、effective_from；AGENTS item保留 scope_root、agents_path或ABSENT、canonical_contract_refs、authority_ref、branch_or_release_scope、content_digest、supersedes、effective_from。新增 surface_inventory_ref；discovery_contract={extractor_refs[],supported_entry_kinds[],unknown_edge_rule,baseline_ref}；consumer_binding={consumer_id,reader_version,accepted_schema_versions[],entry_refs[],delivery_boundary_ref}。

**GateResult 保留必填集合**：task_identity、workflow_identity、run_id、gate_instance_key、gate_ref、authority_ref、definition_version、definition_digest、adapter_semantic_digest、candidate_identity、source_set_identity、subject_identities[]、target_identities[]、normal_entry_identity、runner_identity、fixture_identity、rubric_identity、observed_at、environment_identity、decision、reason_codes[]、obligations_covered[]、obligations_missing[]、evidence_refs[]、invalidation_fingerprint、actor_provenance、observer_provenance、scope、cost、elapsed_time、claim_support[]。新增：
- contract_binding={request_ref,scope_revision,authority_set_digest}；
- obligation_set_digest：本次完整expected集合摘要；
- observation_binding={collector_identity,reference_identity,trust_tier,raw_evidence_refs[],protection_evidence_ref_or_unknown}；
- consumption_ref：指向本次当前owner接收该结果的 Receipt；首次输出可为明确 pending receipt，**pending不能签ready**。不存在用自引用hash生成结果的循环：GateResult不可变，receipt引用其digest，consumption_ref是稳定receipt locator；核验再读取该locator。receipt不反写result字节。

**Admission**：task_identity、workflow_identity、request_ref、scope_revision、entry_kind、session_binding、source_bindings[]、candidate_identity、effect_refs[]、budget_ref、owner_ref、cancel_epoch、consumer_binding。无session的真实非交互runner可以在session_binding写NOT_APPLICABLE及依据，不能假造session。
**ObligationSet**：contract_binding、candidate_scope、required[]、should_not_change[]、surface_inventory_ref、unknown_edges[]、unresolved[]、digest。每项 obligation={id,requirement_ref,target_ref,postcondition,claim_level,non_substitutable[],authority_ref,gate_refs[],status}；required为空只能在无交付声明的明确NONE任务成立。
**Resolution**：admission_ref、obligation_set_digest、mode、selected[]、reuse[]、not_applicable[]、unresolved_obligations[]、unknown_edges[]、effect_requirements[]；各条带id和reason/ref，不仅列命令。
**Feedback/Receipt**：D4字段；Receipt={task_identity,feedback_or_result_ref,digest,candidate,recipient_session_or_owner,cancel_epoch,delivery_observation,ack_observation,resolution_result_refs[],budget_usage}。单调追加事件，不回写已见失败。
**Claim**：task_identity、contract_binding、candidate_identity、obligation_set_digest、result_refs[]、receipt_refs[]、allowed_claims[]、denied_claims[]、remaining_unknowns[]、report_ref。每个claim保留旧tuple；本对象不颁发发布/账号/GPU权限。

digest 只包含各对象已声明语义字段；数组是否集合由字段规定，set字段按稳定id排序，步骤/argv保留顺序；对象键按字节排序，UTF-8、无无意义空白、拒绝NaN/Infinity，度量小数用明确单位的十进制字符串。不把注释/展示路径/生成时间/自身摘要纳入语义摘要。跨语言必须同一组固定输入输出fixture，不能分别随手json.dumps导致失效漂移。时间新鲜性保留独立检查，不因排除展示时间就无限复用。

### 5. 迁移、双读、拒绝和回退合同

顺序确定为：独立 Critic 审本 da/2提案→workflow-core schema/reader/fixtures→Bridge能力协商且默认不签新ready→单仓 shadow读取旧原始输出产生da/2→确认旧原生报告与新分项一致，故意删字段必须拒绝→该仓切单一da/2准入→其余七仓分别适配→同步PIE等相邻设计引用和已装consumer清单。没有通过的仓继续旧项目验收，不能标DA已支持。shadow不是两套PASS权；只有指定当前consumer_binding拥有正式准入权。

reader 支持 da/2准入；da/1只经 `import_legacy_for_diagnostics` 输出旧来源与缺项清单，不自动补未知字段、不签新ready；unknown schema硬拒绝。旧记录仍可作为原始观察候选，被新标准重新判定且真实身份/观察/时窗成立后产生**新的**da/2 result；不是给旧PASS换标签。可选扩展不改变必需语义；未来必需字段或decision含义变更再升主版本。

回退选择经过验证的 Bridge/core/project-adapter 版本组合，停发DA ready并保留所有原项目检查、历史结果和未解决义务；不把新记录强转da/1，不删除新回归，不回滚产品数据。每consumer启用前验证读者版本/已加载payload/受管入口；升级失败只回退该consumer，未适配者不得被中央release“一键完成”。

这些是本轮已经作出的架构选择。还需独立审查批准、实现与真实加载测试；不存在“以后由Codex决定版本/双读/迁移顺序”的空白。

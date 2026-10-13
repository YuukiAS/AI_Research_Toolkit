# 运行与分权合同：三种实际调用链、轮次预算和“首副作用前”拒绝

本稿只提供可审查的设计边界，未在用户主机安装或运行。强制规则只有在**真实Owner+真实权限+真实观察程序**都接通时才生效。不能用“有权限清单”冒充隔离，也不以一个额外常驻服务绕过Bridge。

## 1. 三个任务从实际入口到退出：不新增Reviewed的审查状态

### 1.1 例一：CUHK Date无歧义拼写小改（Lite，最小成本）

1. **当前合法Codex任务/Host**读取实际分支、受影响页面、既有已批准语言要求，确保没有扩成业务/隐私/多身份变化。不装Reviewed、不建CURRENT/项目外记录。Owner是当前已授权Executor。
2. Executor修改文案，同时检查页面是否为香港繁体或内地简体及状态上下文，实际调用已有轻量文案/局部回归；有明确产品文案语义才调用相应已安装Skill，不强制完整网站设计GPT轮。
3. 若只是当前文案与参考不符，Executor在同任务修复。正常已有项目CI按该分支真实保护规则消费；没有受保护规则就不宣称强制。测试脚本运行实际发生才算测试。
4. 只有范围、用户承诺或外部权限改变才停下求合法决定。执行者提交后的产物仍在当前项目工作流交付，不在中央新建另一套Reviewer。**本模式没有异步自动持续审查的承诺**。
5. 不涉及真实托管注册、一次性票据、后台数据库修改，不能为了修一个字启动整套账户消费或真实部署。

状态Owner：普通当前Codex/项目；独立正式Review次数：**0**；预算由当前本地授权限定。任务增加复杂状态或用户流程后才重新风险分流，不借扩大范围静默跳过保护。

### 1.2 例二：Lucerna完整R2用量提醒（需要独立审查则现有Reviewed）

**本路径前提**：目标仓库与该任务真实安装并经授权选择了Bridge Reviewed；否则不假称它已自动协调。已读Bridge main reviewed_handoff.py和V0_5_REVIEWED_HANDOFF_IMPLEMENTATION_SPEC.md，实际状态有PLAN_REQUESTED、PLAN_FROZEN、EXECUTING、WAITING_FOR_CI、READY_FOR_GPT_REVIEW、REVISE、PASS、AWAIT_HUMAN_DECISION、BLOCKED及NEEDS_GPT_PLANNER。record_review()只在READY_FOR_GPT_REVIEW或CI失败的WAITING_FOR_CI受理，正式review_round最多2。正常路径：

| 真正的阶段和唯一Owner | 动作与能否阻止副作用 | 如何计轮次 |
|---|---|---|
| PLAN_REQUESTED → PLAN_FROZEN，原Planner | 固定完整功能正例、状态/通知/保存/取消/重启、旧Longleaf传播、正式Windows/用户桌面权限，必要专业设计实际消费；区分受控HTTP替身与真实R2数据承诺 | 不算实施后Review；Plan审批按Bridge原合同 |
| PLAN_FROZEN → EXECUTING，原Watcher/Executor | 启动主Codex及可选非冲突子代理；早期受控Provider→聚合→UI/通知链由**项目确定性脚本/受限制CI**检查。检查在主实现内部，**不是新的独立GPT Reviewer**，不能擅自修改CURRENT为READY_FOR_GPT_REVIEW | 早期廉价检查不扣review_round，但占原Task允许的执行资源/时间 |
| EXECUTING时准备原生窗口/安装/外部凭据动作，目标主机/项目Owner | **首次副作用前**确认实际隔离Windows图形会话、exe/PID和资源权限；无法确认即停相关原生动作，代码及纯逻辑测试继续。若该项目没有能力阻止原生动作的技术入口，不能宣称它已经强制保护，只能依Host审批停手 | 不是正式Reviewer轮次；也不是多次不计价的免费GUI/Work |
| EXECUTING → WAITING_FOR_CI（若必需）/READY_FOR_GPT_REVIEW，原Executor/CI | 只有实际完整功能链、开发者亲自操作正常画面、受影响旧回归及可信证据齐全，才提交候选；缺图形证据保留未验证，不能通过报告“内部自检通过”代 | review_round此时仍0 |
| READY_FOR_GPT_REVIEW → PASS或REVISE，原Bridge Reviewer（需要时GPT Work作为该正式Reviewer的实际消费工具） | 只审实际同一候选，先独立看整屏/交互再查旧P1；若无真实角色入口保持合法等待。GPT Work不再承担第一次按钮点击 | 第一次正式审查review_round=1 |
| REVISE → EXECUTING → READY_FOR_GPT_REVIEW，原Watcher/Executor | 同一Task的有限修复与受影响回归；仅报告/截图传输变化不能自动把产品构建重做。等待不消耗轮次 | 第二次正式审查可记review_round=2；再REVISE则Bridge进入AWAIT_HUMAN_DECISION，不开第三套中央循环 |
| PASS后合法终端与交付，原项目发布者/用户 | 真实安装/部署仍按当前授权；Review PASS≠用户机器已经安装/发布。原Task的FINAL_REPORT必须给出真实已完成与仍未证明 | 不再重置旧review_round，用户明确新请求才能做下一项目任务 |

**当前Bridge没有“处在EXECUTING时，插入一个拥有正式裁决权的独立GPT Reviewer”入口。** 因此本修订把早期检查限定为实施阶段项目的可执行受控准入和/或真正受保护CI，而非额外的独立语义评审。如果这个特定功能必须在大成本前取得独立领域语义裁决，应该在**计划时**选择适用Control或另审Bridge最窄扩展；不得在Reviewed中偷设第二CURRENT，也不得将“早期内部建议”宣传成已阻断真实外部行为。

### 1.3 例三：CARE新高成本模型（经批准高风险控制或既有科研Controller）

目标并非让每个短医学数学单测都启用Control，而是**只有原任务真的包含贵重Slurm/GPU、outer数据或复杂方法/验证权力风险**时，选择该模型的现有Control/科研任务拥有者。所需的实际部署、角色启动、账本/预算必须先核实；不能从Bridge源文件存在推断CARE当前机器已安装。

1. Planner从现行有效研究合同冻结“允许修订的科学假设”“正式数据/标签/损失/模型来源”“训练预算”“可行性NO_GO”和“不可替代的研究语义”。合法A/B实验或经批准的科学负结果不应判实现失败。
2. Control模式只有当前已授权Controller推进。Verifier以原Requirement Ledger及独立领域原公式/真值计算评估第一条完整训练链的标签、损失方向、数据资格、采样、初始化及checkpoint下一步恢复。它不是执行者的子代理；已读 agent_flow.py 的现有ROLES包括Planner、Critic、Controller、Verifier、Executor，不能新增一个同级“研工台审查者”。
3. Executor可做小CPU真实函数探针及获准的严格有限规模训练预检，但**短跑不能替正式训练完成**。B6训练固定随机体积、PRISM深尺度不消费、DG假阳性梯度反向或ASE无T2样本归约错误，必须在项目真实loader/loss/forward入口先被发现。
4. 进入较大Slurm作业前，负责提交的**获授权集群项目入口**必须实际核对：Verifier冻结的合法要求、当前程序/权重/数据标识、已批准预算和动作权限。若Executor仍有直接提交同等高成本作业的权限且无强制检查，就只能称纪律性门槛，不能称“技术性禁止”。
5. 分配GPU、外层数据使用、正式评估、结果发布以原科研Controller和已有高影响授权为唯一事实。运行断联则核对Slurm作业现状、checkpoint/数据与下一动作，严禁凭新TaskId双提交/双访问。
6. 真实忠实运行后性能差：原科学假设被证伪或前置门NO_GO，可以按批准范围合法关闭**科研本轮**；代码缩水/假指标/评价错误则仍归Executor/Verifier修，不得对科学方法作负面因果结论。
7. Verifier新增数值阈值必须引用原Requirement Ledger，不可以用不同感受野CNN logits强制1e-6一致等无来源门槛。审查结果和预算沿原Control记录，不另立平行状态。

## 2. 安全不是只读目录：先解析实际能力闭包

### 2.1 审查进程

要使只读审查者R真的不写生产系统，调度它的现有合法Owner必须在进程启动前确定以下**真实有效**集合，而不是靠R自报：
- 当前账户/OS用户、有效CODEX_HOME/配置继承链、用户MCP服务器、插件自带MCP、钩子/execpolicy/动态工具、环境变量和凭据、网络可达位置。
- 完整允许的读资源、输入来源与需要的科研公式/产品设计（其意义要足够，不能因“盲审”连原合同都隐藏），以及明确禁用的外部写MCP/未可信repository hooks。
- 审查进程拿到**冻结候选的只读副本**；不允许执行未受信任的项目自带测试脚本，需实际运行则向下文平台观察器申请固定场景，由受控Owner运行。
- 单独只读Codex沙箱不等于禁用了独立MCP的写方法。只有OS帐号、命名空间/沙箱、工具连接禁用或独立隔离配置经过实际核对，才可称权限强隔离；不能假设一个新增Codex CLI选项清空全局插件配置。不修改用户全局CODEX_HOME来伪造安全，可用经批准的本次专用身份/配置并先核对有效工具清单。
- 无法取得安全独立进程时，最多进行**内容审计**，不能触高权限MCP、私有数据或生产外部动作，也不能让它的意见成为自动发版的强制可靠资格。

### 2.2 原生观察进程：脚本名不是能力授权

观察脚本的有效能力是**入口脚本与每个被调用子脚本、外部程序、系统API、路径、网络请求的并集**。不能只核对最外层的PreflightOnly/Doctor/Safe参数。

**Bobbio实际已读**：scripts/Invoke-BobbioAcceptanceSafe.ps1虽有PreflightOnly参数，但在调用下游acceptance前，先执行Repair-PendingUpdateCache（可能调Disable-ZoteroAppUpdates.ps1 -Apply）并调用Prepare-BobbioZoteroTestIsolation.ps1且Apply=true。故“安全预检”仍可能删除更新缓存/创建资料，普通用户真实目录与默认URL处理器也可能受影响。

**正确调用合同**：
1. 在任何此类wrapper启动前，以只读方式核对真实目标数据目录、profile实际指向、系统Zotero/更新进程、update缓存、会启动的子程序SHA/版本、所有可能修改路径；必须知道哪些是测试目录、哪些是受保护真实资料。
2. 如果要求的是**纯只读预检**，不调用当前有隐含Apply的wrapper。使用经过独立检查的纯只读探针；如果不存在就记录“此预检需要新能力”，而不是换一个脚本名。
3. 如任务获准创建隔离测试资料/清理专用缓存，指定仅本次测试身份、专用目录和具体可写路径，并在与真实Zotero账户/默认处理器物理隔离的测试OS会话操作。OS无法区分独立与真实目录时停止这部分。
4. 正确测试正例：专用测试资料目录允许准备、完成Reader选择/注释往返，受保护原资料目录前后不变；负例：realDataDir和testDataDir同一个、未批准缓存Apply、裸zotero://会调系统默认实例时必须在首副作用前拒绝。
5. 项目脚本的自带后置审计可继续使用，但后置检查发现污染**不等于**安全阻止已发生动作，不能用成功后补救替代前置权限。

**Lucerna实际已读**：capture-lucerna-window.ps1提供ExpectedPid、前端ready及截图元信息，但其Win32声明包括ShowWindow、SetForegroundWindow、PrintWindow；-EnsureVisible可触图形焦点及显示。它**不是只读采集**。正确行为是：普通代码工作无用户活动桌面访问；只有实际批准的独立测试图形会话/账户可显示其自身候选窗口，限定PID/exe/source、场景和次数，采集后生成原始证据；没有独立GUI环境就保留“原生未验证”，继续后台代码而非抢用户输入或完全停工。

其它目标：Mica当前宿主登录态不能随意继承，安卓adb必须固定受测serial且不连个人设备，CUHK Date一次性票据必须隔离persona与测试资源，CARE Slurm/sacct只读与sbatch等改变作业动作权限区分，GitHub发布只能由受信任项目发布者执行。**不要设计一个跨平台管理员权限租约服务代替各平台现有隔离能力**。

## 3. 允许动作前必须经过的检查（拟议消费，不是已安装命令）

~~~text
existing_owner.requests_action(task, candidate, action):
    effective_task = resolve_existing_approved_goal_and_budget()
    capability = inspect_real_runtime_identity_and_transitive_effects(action)
    require action.scope is subset of current authorization
    require action.environment isolates protected_user_resources
    require approved stable candidate and valid required precheck for this action
    require target_postcondition_has_been_checked_before_retry
    if action has irreversible_or_expensive_effect:
        require this project's authorized action gateway has actual enforcement
    run approved fixed entry (not arbitrary command from Reviewer/fixture)
    capture actual before/after and result
    report into the same existing task state / project evidence
~~~

若无法确定被调用脚本的动态行为或外部工具副作用，保守做法是**不在有权访问用户真实资源的环境运行它**；可将低风险测试转到已获准隔离沙箱，不能偷偷申请广域管理员权限。这个合同不承诺一份Python检查器能静态证明任意脚本“绝无副作用”。安全的强保证来自现实无法越权的主机身份与受控环境。

## 4. 权限与拒绝/通过对照

| 场景 | 坏例应怎样被拒（必须早于副作用） | 合法好例如何继续 |
|---|---|---|
| 只读审查者继承全局写MCP | 启动前有效工具集合含未批准写调用→不启动高权限进程、不把“只读沙箱”当通行证 | 审查独立配置确实仅能读批准快照/已脱敏必要材料，可执行只读分析 |
| Bobbio -PreflightOnly而调用子脚本Apply | 需要纯预检但实际wrap有清理缓存/创建目录→拒绝调用；请求明确副作用授权+受限会话 | 确认独立测试目录/进程并允许相应Apply，事后原库完全未触碰 |
| Lucerna窗口捕获 | Win32 SetForegroundWindow可达当前用户活动桌面→拒绝GUI操作，代码测试继续 | 独立测试会话内限定exe/PID/窗口可见，不碰用户当前窗口，原生证据确实匹配同一候选 |
| CARE正式长训 | 未通过受信任真实loader/优化器/阶段/预算预检，或只有诊断短跑→不放行有权限的Slurm提交 | 已批准模型、真实数据/权重、必要领域Verifier及预算闭合后按合法项目入口提交 |
| GitHub发布 | 当前主实现/候选构建进程有发布token，或必需检查跳过仍被当PASS→不许声明受保护发布 | 在受控执行环境，实际检查当前同一候选与来源，并由原发布身份进行已有发布 |
| 工作流恢复 | 上轮外部动作结果未知就重发、只看到新报告SHA便重装→先对账真实目标和既有执行进程 | 已证明未执行或可幂等再试，沿同一原Task预算和已授权身份继续 |

## 5. 恢复、费用与用户打断点

默认使用现有Bridge记录和项目可观察事实。对任务内代码/测试/材料错误，运行Owner自己处理；等待真实GPT Review、CI或设备不计为新失败或新增任务。已审过的候选只在**源语义或实际包**变化且会影响相应验证时重新测试；截图传输/回执更新不应重建Lucerna包，也不应重跑CARE数千步。

所有外部动作需要区分：
- 可查真实后置状态并幂等重试：如查询存在的作业、已安装包、发布目标、完整证据上传。
- 一次性或不可逆：真实账号票据、付费评估、私人资料修改、作业提交、部署等，结果不明时**先查**，查不清则停在原Owner需要合法决策的边界，不能模型猜测继续。
- 专业判定不同意：对原要求的实现错回Executor，验证器数学/选样错回Verifier/领域测试者，无来源新增阈值回Planner判断，只有实质科学或产品取舍才用户。

所谓“每轮审查最多一次集中返修”遵守Bridge原Reviewed最多两次正式Review。开发期便宜回归可多次修复，但不能通过新TaskId、新RC或只改报告重置高成本审查/外部资源。Control正式Verifier与Critic轮次遵照其现有规范，不由本稿建立另一份计数账本。

本轮没有安装上述入口，**没有证明当前六产品运行机的权限集合、Bobbio隔离账户、用户桌面不可达或Slurm提交强制受控**。未落实的强制能力必须标未来试点或工程缺口，不可将本稿的拒绝条件当已执行权限策略。

来源：Bridge main ai_bridge_kit/reviewed_handoff.py中TASK_STATES/record_review；docs/V0_5_REVIEWED_HANDOFF_IMPLEMENTATION_SPEC.md（Review三角色、轮次1–2、Watcher、CI等待）；docs/V0_4_AGENT_FLOW_IMPLEMENTATION_SPEC.md和ai_bridge_kit/agent_flow.py；Bobbio develop scripts/Invoke-BobbioAcceptanceSafe.ps1、scripts/Invoke-BobbioReaderAcceptanceSafe.ps1；Lucerna main scripts/capture-lucerna-window.ps1、development-acceptance.ps1；GPT-6 R1两项阻塞及其源码反例。

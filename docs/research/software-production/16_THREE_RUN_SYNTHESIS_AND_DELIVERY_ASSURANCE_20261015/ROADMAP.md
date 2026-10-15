# Delivery Assurance（交付保障）路线图

状态：Planner 研究路线图草案；**未获独立 Critic PASS，不授权实施**  
日期：2026-10-15  
关联综合：`README.md`

## 1. 产品定义与最终形态

正式称呼：**Delivery Assurance（交付保障）**。

它不是新仓库、新桌面应用、新网站或第四套 Bridge workflow。它是跨现有三层协作的一项能力：

1. **Bridge Kit**：运行身份、Codex 生命周期接入、候选/证据绑定、失败返还原任务、精确恢复；
2. **AI Skills / workflow-core**：交付准入，决定最终 USER_READY 前需要哪一类领域 QA；
3. **项目 repo + 领域 Skill/Plugin**：真实消费对象、专业验收、项目特有失效规则和薄适配。

长时间运行继续复用 Persistent Run、CARE controller、Slurm/finalizer 等现有 owner。状态 UI 只做投影。

当前不新建独立 repo。

## 2. 为什么不能直接全面实施

当前最关键的未知不是 schema、目录或命令名，而是：

> 在用户真实 Codex 宿主里，Codex 准备结束时，能否通过受支持的同步生命周期入口可靠阻止假完成，把具体失败送回**同一 thread/worktree**继续修，并在修好后正常结束，而不死循环、不误续办、不覆盖用户停止。

如果这条链不成立，后续大量 Bridge/AI Skills/项目适配会建立在错误前提上。

因此路线图必须先验证入口，再扩公共能力。

## 3. 阶段 0：正式设计绑定与 Critic 审查

目标：把三路独立研究综合成一份可实施但仍可被否决的正式 Proposal，而不是直接写代码。

必须冻结：

- Delivery Assurance 的产品边界；
- Bridge / workflow-core / domain / project 的唯一 owner 分工；
- Codex Hook 的允许用途和安全边界；
- 任务级证据记录的最小字段；
- 项目 adapter 的最小接口；
- PASS / FAIL / UNKNOWN 与 evidence invalidation；
- 同任务返修、用户停止、第二 writer、断线、旧候选的处理；
- 普通任务、长期任务、科研/Slurm 的不同路径；
- 明确 non-goals：无新 repo、无新 daemon、无第二任务数据库、无第四 Bridge workflow、无 Program Run。

需要独立 Critic 对 Proposal PASS 后，才允许进入阶段 1 的真实宿主探针。

本阶段同时应在正式进入 AI Skills maintenance tracking 时，把 workflow-core 当前
`Final delivery must consume domain-owned self-QA before user-ready completion`
条目绑定 tracking Issue，并记录 Bridge integration dependency。当前研究目录不直接修改 AI Skills production source 或 maintenance Project。

## 4. 阶段 1：决定性 Codex 生命周期探针

这是整个路线图的第一道 GO / NO-GO。

### 4.1 范围

只使用隔离临时 repo / worktree，不接 Lucerna、CARE、真实生产账号、真实 Slurm 或私人数据。

实现最小原型：

- 启动/恢复时获取 repo、worktree、HEAD、thread/run 身份；
- 一个同步完成检查；
- 一个故意可验证的失败；
- FAIL 时阻止结束并给当前 Codex 明确修复要求；
- 同一任务继续修；
- 修后再次检查；
- PASS 后正常结束。

### 4.2 必须验证的失败模式

至少覆盖：

1. 正常坏例：假完成被拦并继续；
2. 正常好例：一次 PASS，不产生循环；
3. 用户主动停止：停止优先，守门逻辑不得重新拉起；
4. 错 thread：失败不得注入其他会话；
5. 第二 writer：不得两边同时修改同一候选；
6. worktree/HEAD 改变：旧 evidence 失效；
7. Hook 错误或不可用：不得伪 PASS；
8. App/CLI 断线重连：只能恢复已证明支持的范围；
9. Hook 未安装/未信任/当前版本不支持：明确 UNPROVEN，不静默降级。

### 4.3 GO / NO-GO

GO：当前目标宿主至少有一条正常入口能稳定完成“假完成 → 同任务返修 → PASS 结束”，且无错线程/双写/停止失效。

NO-GO：核心入口无法可靠阻止/续办，或只能靠脆弱私有接口、另起 fresh task 冒充原任务。

NO-GO 时停止公共运行层扩张，回到：
- 只修现有项目入口；或
- 对真正需要持续生命周期的任务采用显式受管入口。

不得以“以后再加 daemon”自动挽救失败路线。

## 5. 阶段 2：Bridge Delivery Assurance 最小核心

只有阶段 1 GO 后才开始。

### 5.1 Bridge 新增范围

只实现公共运行事实：

- entry/run identity；
- repo/worktree/thread/candidate binding；
- 最小 delivery evidence envelope；
- project adapter discovery；
- evidence freshness / wrong-candidate / missing / unknown；
- Stop 结果消费；
- 合法 resume / owner handoff；
- 结构化、只读事件输出。

不实现：

- 领域评分；
- 通用视觉/中文/科研裁判；
- Slurm submit/cancel；
- Reviewer 状态机；
- 项目下一任务选择；
- Program Run；
- 中央数据库或 daemon。

### 5.2 最小证据对象

只保留当前任务真正需要的 locator/reference：

- task/goal ref；
- repo/worktree/source candidate；
- artifact/runtime/consumed target identity；
- required gate refs；
- raw evidence refs；
- PASS/FAIL/UNKNOWN + scope；
- invalidation reason；
- current legal owner / next-action locator。

避免复制完整截图、日志、私人数据和已有项目状态。

### 5.3 Bridge Capability Gates

正式 production behavior 变化必须按 Plugin Capability Gate Policy 设计真实 Gate，至少覆盖：

- normal Codex entry 实际触发；
- exact candidate binding；
- wrong/stale evidence 拒绝；
- Stop 返修；
- good candidate 不死循环；
- user stop；
- second writer / duplicate event；
- Bridge Lite/Review/Control/Persistent Run 不回归；
- 无 Bridge-managed repo 不受影响；
- Host Policy / permission 边界不扩大。

最终 Gate 必须绑定同一最终候选和实际受测安装身份。

## 6. 阶段 3：workflow-core 交付准入生产化

阶段 2 提供“怎么接回 Codex”，阶段 3 提供“什么时候不能说完成”。

### 6.1 目标

把 AI Skills 当前 NEW 条目：
`Final delivery must consume domain-owned self-QA before user-ready completion`
实现为真实 production behavior。

### 6.2 workflow-core 只做

- 判断当前任务是否属于 artifact/product-dependent delivery；
- 路由到正确领域 owner；
- 要求 exact final candidate 的领域 QA；
- required QA 缺失、过期或 wrong-candidate 时拒绝 USER_READY；
- 风险匹配：普通后端/小文档不强制 UI/PPT/科研重验；
- 将领域结果以标准结果交给 Bridge Delivery Assurance 消费。

### 6.3 workflow-core 不做

- 新状态机；
- watcher/daemon；
- 通用评分器；
- 复制 Frontend/Statistics/Research 等领域规则；
- thread resume；
- Git/worktree/Host Policy；
- 项目 adapter。

### 6.4 版本与发行

预计至少需要 workflow-core production version bump。是否需要 ai-skills-core / AI Skills Maintainer bump 由实际跨层发行能力缺口决定，不因“新能力存在”机械升级。

如果正式 release 同时要求 Bridge + workflow-core + managed consumers 一起更新，应使用 AI Skills Maintainer 已有的跨层 `### Update impact` 路由，而不是人工维护版本配对表或新 registry。

## 7. 阶段 4：第一对真实 consumer 试点

不能一开始铺七个 repo。

建议选择差异最大的两个：

### 4.1 软件侧：Lucerna

原因：
- 已有真实原生/状态验收历史；
- 真实发生过 fixture PASS、状态传播错误、用户成为第一 QA；
- Windows 正常入口是核心目标场景。

目标只适配一个代表性完整功能类别，例如状态传播/真实 Provider→聚合→UI，不一次覆盖整个 Lucerna。

必须证明：

- 项目 adapter 能调用已有真实验收；
- exact exe/runtime/candidate identity 一致；
- QA FAIL 自动回当前任务；
- 修后只重验受影响部分；
- 旧正常能力不回归；
- 用户无需充当第一 QA。

### 4.2 科研侧：CARE

原因：
- 与桌面软件差异最大；
- 已有 controller、Slurm finalizer、科学合同和 checkpoint；
- 可以验证 Delivery Assurance 不会演化成第二 Slurm owner。

首轮不必启动昂贵真实训练。先用已有低成本/隔离证据验证：

- 模型/代码/候选/checkpoint/job/result identity；
- 工程 PASS 与科学 NO_GO 分离；
- 长等待由原 owner 持有，不靠 Stop Hook 空转；
- Slurm terminal state 不等于 scientific PASS；
- Delivery Assurance 只消费 existing owner evidence，不 submit/cancel。

真实 GPU/Slurm 最小作业另作单独授权 Gate，不自动包含在首轮试点。

## 8. 阶段 5：第三平台泛化试点

只有 Lucerna + CARE 都证明公共层确有净收益后，才选第三个平台。

优先从 Bobbio、Mica、SeminarArc、Asteria 中选一个其失败机制与前两者不同的项目。

目的不是“覆盖七仓”，而是反证：

> Bridge 公共接口是否真的稳定，还是偷偷把 Lucerna/CARE 特例写进了 core。

如果第三平台需要把大量领域字段塞进公共 schema，停止泛化并回退项目本地。

## 9. 阶段 6：跨层发行与维护闭环

### 9.1 AI Skills Maintainer 负责统筹更新

利用现有：

- `machine-update-orchestrator`；
- `bridge-kit-maintainer`；
- `project-skill-installer`；
- formal `release`；
- `### Update impact`；
- managed-consumer adaptation。

用户不应手工维护“Bridge 版本 X 必须配 workflow-core Y”。

正式 release 元数据声明真实跨层影响；更新时由现有 owner 按依赖顺序：

1. 更新 Bridge 正式 release/runtime；
2. 更新对应 AI Skills plugin/profile；
3. 刷新明确 managed consumer；
4. 重启/新鲜 session（如需要）；
5. 在当前 consumer 做 normal-entry smoke；
6. 未完成 consumer 保持 ADAPTING，不冒充 DONE。

### 9.2 是否升级 AI Skills Maintainer

先复用当前 Route B/C。

只有真实试点证明现有 Maintainer 无法表达以下之一时才改：
- Bridge + workflow-core 的正式组合版本；
- managed consumer adapter refresh；
- fresh-session consumption verification；
- cross-layer partial failure recovery。

否则不为 Delivery Assurance 单独造第四条 update route。

## 10. 阶段 7：观察与用户体验

核心能力稳定后再补统一观察。

优先顺序：

1. 当前 Codex 任务中的简洁状态；
2. Bridge 结构化事件；
3. 现有 Lucerna / notifier / Project State 等只读投影。

展示至少包括：

- 当前 owner；
- 当前 candidate；
- 正在执行/等待什么；
- 最后真实进度；
- 当前 FAIL/UNKNOWN 原因；
- 自动返修轮次；
- 下一合法动作；
- 资源状态。

不允许观察层自己写 DONE、submit job 或恢复 task。

## 11. 阶段 8：是否扩到更多项目

推广条件不是“adapter 能安装”。

必须比较“修好的旧流程”与“加 Delivery Assurance”：

- 首次有效交付质量；
- 严重缺陷逃逸；
- 用户介入次数和用时；
- 总墙钟时间；
- 重复 build/test/review；
- Codex/CI/GPU 成本；
- 错候选/旧 evidence；
- 维护和适配成本；
- 误阻断与错误返修。

公共层无明显净收益，停止扩张；保留对项目本身有价值的修复。

## 12. Local Autonomous Acceptance 的处置

`TODO_LOCAL_AUTONOMOUS_ACCEPTANCE_WORKFLOW.md` 继续保持 CLOSED。

其有效需求由：

- Delivery Assurance 的 Codex 生命周期/返修接线；
- workflow-core 的交付准入；
- domain owner 的真实 QA；

共同接替。

不复活第四套 Local Review workflow，不新建 Reviewer daemon/state machine。

未来适合在 Bridge/AI Skills 正式设计通过后，为该历史 TODO 添加 supersession locator，但不得在本研究阶段直接修改生产维护源。

## 13. Program Run 的顺序

Program Run 与 Delivery Assurance 是不同层级：

- Delivery Assurance：**这一件任务真的完成了吗？**
- Program Run：**这一件真的完成后，项目下一件该做什么？**

因此 Program Run 不属于本路线图的实施范围。

只有 Delivery Assurance 至少在一个软件项目 + 一个科研/长任务项目稳定成立、完成语义可信后，才允许启动 Program Run 的独立架构研究。

未来 Program Run 若存在，应消费 Delivery Assurance 的完成结论，而不能重新实现：
- candidate binding；
- domain QA；
- Stop 返修；
- 权限；
- Slurm；
- evidence validity。

否则 Program Run 会把假完成高速传播到后续任务。

## 14. 当前推荐实施顺序

按真实价值排序：

1. **正式 Proposal + 独立 Critic**
2. **Codex Stop/同任务返修决定性探针**
3. **Bridge 最小 Delivery Assurance core**
4. **workflow-core delivery admission productionization**
5. **Lucerna 首个真实软件 consumer**
6. **CARE 首个科研/长任务 consumer**
7. **第三平台反泛化试点**
8. **AI Skills Maintainer 跨层正式发行/consumer adaptation closure**
9. **只读可视化**
10. **决定是否继续推广**
11. **最后才研究 Program Run**

任何阶段如果前一层关键假设失败，都允许得到“停止扩张”的成功结论，不用为了已经投入文档和代码而继续造系统。

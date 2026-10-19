# 三路独立研究综合：最小复杂交付保障能力

状态：研究综合；Phase 1 R5 已以 clean qualified run 得到 `GO`，**生产实现仍未授权**
日期：2026-10-15；Phase 1 closure 更新：2026-10-19
来源：GPT-6 Pro、GPT-5.6 Pro、GPT Work 三个互相隔离的独立研究结果，以及随后的人类可读综合讨论。

正式称呼：**Delivery Assurance（交付保障）**。实施前分阶段路线图见 [`ROADMAP.md`](ROADMAP.md)。

Phase 1 的最终机制结论见 [`PHASE1_CLOSURE_20261019.md`](PHASE1_CLOSURE_20261019.md)。生产事实与下一轮 Planner/Critic 输入见：

- [`PHASE2_IMPLEMENTATION_INPUTS_20261019.md`](PHASE2_IMPLEMENTATION_INPUTS_20261019.md)
- [`GATE_LIFECYCLE_FACT_INVENTORY_20261019.md`](GATE_LIFECYCLE_FACT_INVENTORY_20261019.md)
- [`CONSUMER_ACCEPTANCE_INVENTORY_20261019.md`](CONSUMER_ACCEPTANCE_INVENTORY_20261019.md)
- [`PRODUCTION_HANDOFF_MANIFEST_20261019.md`](PRODUCTION_HANDOFF_MANIFEST_20261019.md)

Phase 1 `GO` 只证明 `codex-cli 0.160.1` 上的受信任 Stop Hook 接缝能够完成“假完成 → 同任务一次有界返修 → fresh PASS → 正常结束”，并能处理 Interrupt、预算、重复/并发事件、错身份、旧候选、Hook 故障和授权隔离。它不等于 Bridge、workflow-core、领域 QA 或 consumer 已生产化；`DA-G10`–`DA-G15` 仍未评估。

## 1. 当前收敛结论

三路研究均否决继续建设一个新的“研工台”中央平台，也不建议新建第二套任务数据库、状态机、调度器、Reviewer 注册中心、Slurm 控制器或跨项目统一语义裁判。

当前最可信的产品形态是：

> **把一层很窄的“复杂交付保障能力”嵌入现有 Codex / Bridge 正常入口，由各项目保留自己的真实验收和专业语义；发现真实交付缺陷后，尽可能把失败直接送回原任务继续修，而不是生成 Review 报告后停住。**

这不是一个新的桌面 App 或网站，也不是一份规范。它应由可执行代码组成，但尽量不引入新的常驻服务和第二控制面。

## 2. 用户实际入口

默认不新增用户入口。

用户仍然直接使用：

- Windows Codex App；
- 服务器 Codex；
- 已存在的 Bridge / CARE 受管入口。

复杂交付保障能力应在这些入口的生命周期中自动工作。不能要求用户每次先打开一个新系统、复制 Prompt、上传 ZIP 或手工创建一套任务包。

## 3. 最小必需组件

### 3.1 Codex 生命周期接入

首选验证当前 Codex 官方支持的生命周期 Hook：

- **SessionStart 或等价启动/恢复事件**：绑定当前 repo、worktree、HEAD、任务/线程身份、Bridge 与 Skill/Plugin 运行身份；
- **Stop 同步检查**：在 Codex 准备结束当前任务时触发交付检查。如果当前候选仍有明确缺陷或缺少必需证据，则阻止结束并把具体原因送回当前任务继续处理。

Stop Hook 是第一优先级决定性技术点，因为它直接决定“Codex 自报完成后能否在同一任务里自动返修”。

不把 Hook 当成完整安全边界。危险动作、Host Policy、sandbox、approval、凭据和资源授权继续由现有 Bridge/平台机制负责。

### 3.2 Bridge 内的交付保障核心

公共新代码应优先进入现有 Bridge，而不是另起通用平台。它只回答：

1. 当前正在验谁；
2. 当前候选应该具备哪些项目级交付证据；
3. 当前证据是否属于同一候选、真实执行、仍然有效、没有越权或缺失；
4. 如果不合格，应该把什么具体失败交回当前合法 Owner。

它不负责：

- 写产品代码；
- 判断所有领域语义；
- 自己提交/取消 Slurm；
- 建第二套任务状态；
- 自己发布；
- 自己批准科研结论。

### 3.3 项目本地验收适配器

不同项目继续拥有自己的真实验收。

公共层只需要一个薄适配器，告诉它：

- 这个 repo 是谁；
- 哪些任务类型对应哪些已有验收入口；
- 什么才是最终消费对象；
- 什么动作有副作用；
- 哪些结果可以被复用，什么变化会让旧证据失效。

适配器优先复用已有能力，不重新实现：

- Lucerna 的原生/状态验收；
- CUHK_Date 的真实浏览器/部署/身份检查；
- Bobbio 的 Zotero/Figma/原生 Reader 验收；
- Mica 的真实宿主/扩展验收；
- SeminarArc 的 APK/Android/设备验收；
- Asteria 的科学图和真实可视化验收；
- CARE 的科学合同、Slurm、checkpoint、prediction、metric 和 finalizer。

项目识别优先来自真实 Git 上下文（git root、remote identity、worktree、HEAD），不依赖模型从目录名猜测。

### 3.4 每任务交付证据记录

每个任务维护一份最小、短寿命、可归档的证据记录，绑定：

- 用户任务/冻结目标；
- repo/worktree/source candidate；
- 构建或模型产物身份；
- 实际运行/安装/部署/Slurm 对象；
- 必需项目门禁及其原始证据引用；
- PASS / FAIL / UNKNOWN；
- 原合法 Owner 与下一动作。

它的目的不是形成新数据库，而是防止“改的是 A、验的是 B、截图来自 C、发布的是 D”。

### 3.5 返修接线

两类情况分开：

**当前 Codex turn 仍活跃：**
优先使用同步 Stop 检查把真实失败直接返还给当前任务，让同一 Codex 继续修。

**长时间等待后结果才回来：**
不依赖异步 Hook 唤醒已经 idle 的会话。复用现有 Bridge Persistent Run、CARE controller、Slurm finalizer 等持久 Owner 保存任务和外部动作。外部事件完成后，由已有 Owner 通过经过验证的精确任务/thread 恢复能力继续。

“外部进程能否安全恢复 Windows Codex App 中任意已有线程”目前仍是未验证事实，不能预先承诺。

## 4. 不需要常驻新服务

普通软件任务不需要新的 daemon。

典型路径应是：

```text
Codex 开始/恢复
→ 入口绑定
→ Codex 正常开发
→ Stop 触发
→ 项目真实验收
→ FAIL：同任务返修
→ PASS：允许结束
```

Slurm/HPC 等长任务仍由现有持久 Owner 保存状态和后续义务，Codex 可以在排队期间退出，不持续烧模型额度。

## 5. 可视化不是核心控制面

用户需要看见：

- 谁在执行；
- 当前候选；
- 实际调用了哪些能力；
- 当前真实检查结果；
- 为什么等待；
- 为什么返修；
- 当前资源；
- 下一合法动作。

但可视化只从真实 Owner 和原始事件投影，不能拥有第二个可写 `DONE`。未来可以利用 Lucerna 或其他既有状态 UI 展示，不先建独立控制台。

## 6. 第一决定性实验

在任何正式大开发前，先做一个隔离、低副作用、可立即否决路线的小实验：

1. 临时项目/隔离工作树；
2. Codex 正常开始任务；
3. 人为保留一个可明确验证的缺陷；
4. Codex 尝试结束；
5. Stop Hook 实际触发；
6. 项目检查返回 FAIL；
7. Hook 阻止结束，并把明确失败送回**同一 thread/worktree**；
8. Codex 继续修；
9. 第二次检查 PASS；
10. 正常结束；
11. 正例不能死循环；
12. 用户主动停止必须优先；
13. 错 thread / 第二 writer / 断线重连不能导致双写或误续办。

若这条链在真实目标 Codex 宿主上不能成立，就不能声称存在“无感自动返修”。此时应停止扩张，并在“只修现有入口”与“显式托管复杂任务”之间重新选择。

## 7. 当前推荐的代码归属原则

当前研究倾向：

- **Bridge Kit**：公共入口绑定、任务/候选身份、交付证据合同、Stop/恢复接线；
- **AI Skills**：专业方法、任务触发、领域能力和真实消费要求；
- **各项目 repo**：项目特定验收、真实消费对象、领域语义和薄适配；
- **Remote Compute / CARE**：Slurm、资源、checkpoint、长任务和科学执行；
- **Lucerna 或既有观察层**：只读状态投影；
- **AI Research Toolkit**：研究、比较、架构与实验设计，不承担生产执行。

是否需要新建独立 repo 暂不批准。只有后续证明存在一块同时满足“跨项目复用、无法自然归入 Bridge、又不形成第二控制面”的成熟公共代码时，才重新评估。

## 8. 下一步研究问题

正式实施前，需要单独核对 Bridge Kit 的 Program Run 规划，判断：

1. Program Run 是否已经准备承担复杂任务的生命周期 Owner；
2. 它是否已有精确 thread/worktree/权限/恢复/等待/去重能力；
3. 它与本研究的 Stop Hook、交付证据合同、项目验收适配器是否重叠；
4. 应该把新的交付保障能力作为 Program Run 的组成部分、前置门、后置门，还是保持正交；
5. 是否存在重新造 Persistent/Control/Program Run 能力的风险。

该关系在读取 Bridge 最新规则和 Program Run 真实 TODO/代码前不预设答案。


## 9. Bridge Program Run / Persistent Run / workflow-core 的真实关系（读取当前源后）

本节基于 2026-10-15 实际读取的 Bridge `main` 和 AI Skills `main`，不是旧聊天推断。

### 9.1 Program Run 当前并不是一个待实现的正式 TODO

Bridge 当前仓库没有独立的 `TODO_PROGRAM_RUN.md`。在 Bridge 0.11.0 的当前设计材料中，Program Run 被明确标为：

`EXCLUDED_PROGRAM_RUN`

其含义是：当前 0.11.0 不做连续自主发现下一项目任务、长期项目决策、自动验收推进或项目级自主控制器，也不新增监视器、控制器、守护进程或任务状态机。

因此不能把“Program Run”误解为 Bridge 已经准备实现、只差开工的正式能力。

### 9.2 Persistent Run 不是 Program Run

Bridge 当前的 Persistent Run 只解决“谁负责进程寿命”：

- terminal-owned foreground process/orchestrator 需要在 Codex/SSH/terminal 断开后继续；
- 当前唯一 backend 是 tmux；
- 它保存/恢复 run/session、heartbeat、stage、checkpoint 等运行证据；
- 它不决定产品是否合格，不自动审查，不自动选择下一个任务，不自动提交/取消 Slurm，也不因为心跳存在就宣布 Goal 完成。

scheduler-owned 的 Slurm job 或已经 detached 的 service 不应因为运行时间长就再套 tmux；原生 owner 继续负责寿命。

所以 Persistent Run 是“活着继续跑”的机制，不是“自己把复杂项目做完”的系统。

### 9.3 本地自动验收曾经被考虑过，但已经从 Bridge 撤出

Bridge 的 `docs/TODO_LOCAL_AUTONOMOUS_ACCEPTANCE_WORKFLOW.md` 已在 2026-10-12 标记：

`CLOSED / RESCOPED TO AI_Skills workflow-core — NOT A BRIDGE KIT WORKFLOW`

历史上它曾提出：

GPT 冻结目标 → 本地 Codex Executor 实现 → fresh local Codex Reviewer 验真实产品 → 缺陷自动回 Executor → 重建 → 再验 → 用户只看到最终候选。

这个需求本身仍然有效，但 Bridge 明确决定不再建立第四套 Local Review workflow、Reviewer 状态机、watcher 或 daemon。

当前权责拆分为：

- Bridge：执行基座、工作树/Git/运行身份/权限/恢复；
- AI Skills `workflow-core`：交付准入与完成语义；
- 领域 Skill/Plugin：真正的专业 QA；
- Goal/Planner：必要时要求额外 fresh reviewer，但不是默认新工作流。

### 9.4 AI Skills workflow-core 当前正拥有“用户不能成为第一 QA”这一要求

AI Skills 当前 `docs/plugin-todos/workflow-core.md` 有正式 NEW 条目：

`Final delivery must consume domain-owned self-QA before user-ready completion`

它要求：

- build/test/process PASS 不能单独产生 user-ready/release-ready；
- artifact-dependent 任务必须把 exact final candidate 交给正确领域 owner 做真实 QA；
- acceptance-relevant source/artifact 改变后，旧 acceptance 失效；
- UI → Frontend Design；Presentation → Presentations；Research manuscript/report → Research Authoring/Writing；其他领域由对应能力负责；
- 不为此新增 Bridge workflow、workflow-core state machine、watcher/daemon 或通用 quality scorer。

这与本研究的“项目真实验收 + Stop Hook 返修”方向高度一致。

### 9.5 当前推荐的最终归属

基于上述真实边界，当前最合理的维护拓扑是：

1. **Bridge Kit 作为唯一公共运行代码 owner**
   - Codex 生命周期接入；
   - repo/worktree/thread/runtime 身份；
   - 交付证据的跨项目通用结构；
   - Stop/精确 resume 等执行接线；
   - 不拥有专业 QA 语义。

2. **AI Skills workflow-core 作为交付准入 owner**
   - 判断某类任务在最终 user-ready 前需要什么类别的领域 QA；
   - 调用/要求正确领域 Skill；
   - 不建立新的任务状态机。

3. **各项目 repo 只保留薄适配和真实验收**
   - 项目真实入口；
   - 哪些已有检查对应哪些交付性质；
   - 最终消费对象和失效规则；
   - 不复制 Bridge 核心。

4. **Persistent Run / CARE / Slurm owner 继续管理长期寿命**
   - 普通 Stop Hook 不承担数小时/数天等待；
   - 不再造第二个 daemon。

5. **Lucerna/Project State Bridge 等只做投影**
   - 展示真实 owner/事件；
   - 不拥有新的 DONE。

### 9.6 当前不建议新建 repo

现在没有证据支持新建独立“Delivery Assurance”仓库。

新建 repo 会立刻制造三个问题：

- Bridge 和新 repo 谁拥有 thread/worktree/runtime/恢复；
- workflow-core 和新 repo 谁决定 QA 是否足够；
- 每个项目又要同时适配 Bridge、新 repo 和领域 Skill。

这会重新形成三路独立研究共同否决的第二控制面。

因此当前推荐：
- 公共运行代码进入 Bridge；
- 专业准入进入 AI Skills；
- 项目只留薄适配；
- 研究文档继续留在 AI Research Toolkit。

只有未来出现一块跨项目公共代码，明确无法归入 Bridge、又不拥有任务状态/权限/专业判断，并且在多个真实项目证明长期独立维护更便宜，才重新评估新仓库。

### 9.7 Program Run 如果未来重新提出，应位于更高层，而不是和本方案合并

按 Bridge 0.11.0 对它的描述，Program Run 更像未来的“项目级自主经营者”：

- 连续发现下一项目任务；
- 做长期项目决策；
- 自动推进项目级验收和后续任务；
- 可能跨多个独立任务持续运行。

而本研究的交付保障能力只解决：

> “一个已经给定的任务，Codex 不得假完成；真实交付不合格时，应在合法 owner 内继续修到可交付。”

因此二者不是同一个东西。

若未来真的设计 Program Run，它应**消费**本交付保障能力作为每个任务的完成门，而不是自己重新实现候选绑定、领域 QA、Stop 返修、权限和 Slurm 逻辑。

关系应是：

```text
未来 Program Run（若有）
  选择/推进“下一件事”
        ↓
现有任务 Owner（Bridge / CARE / 项目）
  执行“这一件事”
        ↓
交付保障 + workflow-core + 领域 QA
  判断“这一件事是否真的完成”
```

当前任务只需要研究并验证最下面两层，不需要提前建设 Program Run。

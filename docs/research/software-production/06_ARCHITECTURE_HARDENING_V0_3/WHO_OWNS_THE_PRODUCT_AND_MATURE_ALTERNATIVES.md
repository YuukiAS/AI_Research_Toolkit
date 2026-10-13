# 最容易走错的一步：谁真正负责把软件做完？

2026-10-13。对 v0.2 的监督器构想与 v0.3 初稿的“只做被动质量层”同时做反证。**结论：二者单独采用都不够。** 必须保留一个用户眼中的产品任务，但不能再建一套与 Bridge 每次执行竞争的状态机。这里记录修订后的工程边界和成熟工具替代。

## 一、两种极端均失败

1. **中央第二监督器全权控制六仓库**：和 Bridge Reviewed/Control 重叠；甚至不能在不篡改其 CURRENT 的前提下决定原 Controller 下一阶段；会重复派单、重复运行和重复外部审查。
2. **研工台只接受项目最后的验收结果**：无法管理产品方向、原功能依赖、首次原型检查、多个修复尝试和最终真实用户交付；用户仍要自己给每个角色发新提示词，正是原问题。

真正要管理的是**用户交付对象的持续生命周期**，而不是重复管理每一个 Codex 进程或 Git 状态。两个层次的身份不得互代：

| 身份 | 唯一事实拥有者 | 管什么 | 不管什么 |
|---|---|---|---|
| 产品目标及已批准要求 | 用户＋产品仓库既有 Goal/设计/已接受能力 | 新能力、旧行为、范围、可允许的发行和人类取舍 | 不跟踪每一条进程事件 |
| 产品交付任务 | 拟议研工台的极简目标记录；大部分结果可从目标源、Git、构建和验收推导 | 当前功能声称了什么、哪些已证明、缺的是什么、哪个角色应接下一项产品工作、交付是否发生 | 不复制单次 Reviewed CURRENT、不暗改其冻结 Plan/批准范围、不自动创造新授权 |
| 单次代码执行/返修尝试 | 当前项目有效 Codex／Bridge Lite、Reviewed 或 Control 运行合同 | 实际工作树、执行身份、进程、尝试、其已批准的 Planner/Executor/Reviewer 阶段、通知与停止 | 不能独立宣布整个产品已交付 |
| 专业验收及发行目标 | 对应项目原生/网页/安卓/扩展测试和可信审查/发布身份 | 观察真正产品、校准检测器、准确交付结果 | 不改用户目标、不能凭一个绿色数字替代整个任务 |

**产品交付任务只保留一个极小关联事实**：来源 Goal 与版本、受影响已接受行为、实际执行任务定位、目标候选、必需验收及真实结果定位、发布目标、授权定位。不是再创建十种长期状态。派发新动作前先从这些来源重新计算事实；中断后不能从旧“running”文字推断进程仍在。

在 Bridge Reviewed/Control 执行尚未终止时，研工台只能等待或通过该模式实际允许的检查/审查节点提供证据，不能自行改 CURRENT。阶段结束后，如果产品完整功能仍未证明，优先使用该模式已批准的返修通道；若其冻结范围或两轮返修预算已耗尽，**停止盲目重开同义任务**，由 Planner 归因并判断是否确需新获准的产品任务/方案调整。不能靠一个外层“无限自动继续”悄悄绕过 Bridge 门槛。

在 Lite 普通任务中，研工台可借现有 Codex/Bridge 发起有界的开发、测试、修复和结果采集，不需要另装 Reviewed/Control；没有必要持久执行时就运行完成后退出。只有多机长时间等待和外部事件触发真的需要时，才考虑真正活着的运行拥有者。

## 二、技术上如何不制造两个任务账本

未来代码若确实需要公共层，产品任务外壳最好是**从现有来源计算的视图**而非自建项目数据库。例如：

~~~json
{
  "product_goal_source": "exact repo/ref/goal path + approved revision",
  "user_capability_claim_ids": ["current-goal-claim-1", "protected-old-behavior-2"],
  "execution_owner": {
    "kind": "bridge-reviewed-or-control-or-lite",
    "task_locator": "existing task / CURRENT locator"
  },
  "candidate_binding": "exact runtime source and artifact identity",
  "required_evidence": ["actual positive path", "affected old regression", "necessary visual review"],
  "next_action": "derived from current facts, never a second arbitrary CURRENT",
  "delivery_target": "exact authorized object"
}
~~~

这个结构是合同示意，不是已创建 schema。字段名也不能反向要求六个已有仓库迁移。若项目自身已有同等关联事实，直接读取它，允许不生成此 JSON。

正常推进不靠模型随意推荐下一步；既有执行阶段来自 Bridge CURRENT/目标 Goal，质量结果来自实际正常入口，产品依赖和范围来自批准源，用户权限来自明确授权。程序用确定性逻辑决定已满足/未验证/需专业判断/需执行，在正式步骤需要模型判断时才调用该角色。

**关键反证**：若不给用户任何新指令，只让一个已有获准的 Lucerna 新功能在首次逻辑缺陷、观察器错误和审查问题之后继续，能否在同一产品目标下返修并交付？能否知道何时因真实权限边界停止？如果做不到，“有跨仓库质量工具”还不是完整生产工作流。

## 三、成熟替代：GitHub Spec Kit 已经有真正可恢复的执行引擎

这是对前几份提案的重要更新，不可继续把 Spec Kit 描述成“只有需求文档和提示词”。

2026-10-13 实际读取 github/spec-kit/main：

- workflows/README.md：支持工作流定义、命令、提示、Shell、GitHub、审批、条件、循环、分发与汇总，提供 run/status/resume 命令。
- docs/reference/workflows.md：步骤运行状态及恢复语义。
- src/specify_cli/workflows/engine.py：真实 RunState、持久保存和恢复，运行定义写入 .specify/workflows/runs/<run-id>/workflow.yml。
- src/specify_cli/workflows/step/shell/__init__.py：实际使用 subprocess.run 且 shell=True，默认有界超时。
- src/specify_cli/workflows/step/gate/__init__.py、command_resume.py：交互/非交互暂停和继续入口。

**但源码里非常重要的一句明确警告：工作流的 requires 声明不构成权限隔离，Shell 步骤用当前用户权限执行；requires.permissions 甚至会被校验器拒绝，以避免制造假安全感。** 因而 Spec Kit 不能代替 Bridge 的工作树授权、受限执行身份、隔离原生设备、可信验收与发布凭据，不能在拥有正式密钥的身份中运行不可信候选 Shell。

| 真实选择 | 能避免自造什么 | 不能替代什么 | 当前建议 |
|---|---|---|---|
| Bridge 已有 Reviewed/Control Controller | 现有任务/角色推进、等待、部分异步唤醒、授权与工作树 | 产品全路径和实际质量检查 | **既有任务继续用它**，研工台通过合法阶段注入产品质量能力 |
| Spec Kit 工作流引擎 | 多步任务、条件与恢复、现成命令分发，避免再造步骤状态机 | 安全隔离、真实产品 QA、全部自动审美、正式发行准入 | **新增普通 Lite 产品任务的认真备选**，须先做实际可运行/恢复/权限试验 |
| 自研薄产品任务外壳 | 已批准产品要求和多次执行/质量/发行结果的归属 | 单次 Codex 执行控制、成熟通用调度和可信 OS 安全 | 仅实现已有工具没有的需求关联、覆盖和准入消费，不自研通用 Workflow DSL |
| VibeResearch | 现有 Codex 适配、预算、文件状态/调度经验 | 软件产品安装和原生质量语义 | 只在确定性局部代码可复用时选择性借鉴；禁止带入实验周期 |
| 完整 OpenHands/持久服务 | 真正多机长时执行、需要内置操作界面时可能减少自造 | 用户账号/真实目标设备、专业质量、可信发布 | 多任务跨重启显著超过当前需要时才比较/引入 |

**不能把 Spec Kit 新工作流一律强制塞到当前六仓库**：一个已安装 Bridge Reviewed/Control 的任务再运行 Spec Kit 全流程，仍是两个状态机。仅当某仓库当前使用 Lite、确实缺少长步骤编排、且经过小规模真实试验表明它能在合法 Codex 登录/工作树上运行时，才让 Spec Kit 担任那次执行任务的唯一引擎。其它模式不得双开。

同样，Spec Kit 自带的多处审查关卡可能对单人长期开发造成不必要打断。要按风险裁剪，不能拿其默认完整工作流强制审一处文案。

## 四、在决定是否自研总进程前，必须进行的最小可证伪对照

只读研究已完成；**下列均是将来经独立方案审查、用户授权后才可以运行的试验**。

1. 以同一无危险的普通任务，在项目已有 Codex/Bridge Lite 路径完成需求→修复→局部回归→候选说明，记录运行事实、人工介入和时长。
2. 在隔离的临时项目用固定版本的 Spec Kit 工作流（只给普通仓库写权限，无签名/发布/生产凭据）执行等价任务，测试中途暂停/恢复、真实 Codex 登录与审批、失败重试后代码与状态一致。
3. 用已有 Bridge Reviewed/Control 的同类任务只读测试研工台产品检查适配：证明不改 CURRENT、不双开 watcher，且结果真正被该模式消费；不是只写出一张报告。
4. 用一个历史坏产品和一个真实好产品挑战观察器与整屏 QA；要求坏例拒绝、好例通过，同时一次任务不发生无用新 RC、重复安装、重复外部 Work。
5. 对用户已授权的发行范围，另测可信检查真实执行来源/跳过语义/权限隔离；做不到则只用审计型模式，不伪造强制保护。

如果现有 Bridge＋项目脚本已经足够实现全面功能与可靠质量，**研工台不应为“存在感”造独立执行引擎**；如果缺口确实在产品跨多次执行的目标管理，则只补薄产品外壳和证据消费。如果 Spec Kit 可以减少代码与维护，优先使用它而非新引擎；如果它的默认高权限 Shell 或交互关卡不可接受则拒绝在正式路径采用。

## 五、现阶段最终选择与漏洞状态

**产品逻辑已经明确**：同一个用户目标跨需求、设计、实现、内测、返修、独立核查、实际交付保持连续；不再从产品跑到工具开发、把测不了的功能降级称完成。

**执行引擎不再预设**：既有 Bridge 模式优先；Lite 任务再比较当前 Codex/Bridge 与 Spec Kit 的正式运行效果。质量/验收/发行仍需各仓库实际适配及合法分权。

该选择尚未证明六个仓库的正常入口已自动互联。用户尚未认可前不启动 Critic/实施，不把现有四份和新加研究文件数量说成可运行系统成熟。它已经有明确的反证条件：若仍由用户/GPT Work第一次大量发现历史同因P1，或没有真实执行者能持续推进一项新功能，说明产品任务与专业准入依然没有接通，不能升格推广。

### 本轮核对的直接源码来源

- https://github.com/github/spec-kit/blob/main/workflows/README.md
- https://github.com/github/spec-kit/blob/main/docs/reference/workflows.md
- https://github.com/github/spec-kit/blob/main/src/specify_cli/workflows/engine.py
- https://github.com/github/spec-kit/blob/main/src/specify_cli/workflows/step/shell/__init__.py
- https://github.com/github/spec-kit/blob/main/src/specify_cli/workflows/step/gate/__init__.py
- https://github.com/github/spec-kit/blob/main/src/specify_cli/workflows/command_resume.py
- https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/main/ai_bridge_kit/reviewed_handoff.py
- https://github.com/YuukiAS/VibeResearch/blob/main/vibe_research/next_action.py

这些仓库均是来源/比较，暂为参考采用状态，未添加运行依赖。具体外部版本/许可/用户环境需在真正决定采用时验证。

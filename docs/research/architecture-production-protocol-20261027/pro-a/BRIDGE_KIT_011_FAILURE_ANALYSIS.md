# Bridge Kit 0.11.x：为什么反复通过审查后仍要回到架构层

Bridge 的历史支持替换“固定轮流写方案和审查”这一调度方式，但不支持取消独立审查。这里至少有三类不同问题：原有用户能力没有被完整保留下来；候选方案把尚未验证的平台前提放进发布关键路径；修订不断扩张到成熟工作流，后来又整片撤回。独立 Critic 确实发现过重要缺口，真实试验也曾成功减少不确定性。问题在于这些工作没有按“下一步最可能推翻什么决定”安排，文档通过也没有要求最危险的运行前提先得到证据。[B02][B08][B20][B23][B24][B25]

最强证据是：2026-10-18 21:35:14（香港时间），v0.8 execution-ready review 明确 PASS；随后进行第二批完整实现，真实 canary 才发现所选 Codex runtime 不能满足 reader 的隔离合同；到次日 00:51:28，项目已进入 product scope reset。两份文档之间仅相隔 **3 小时 16 分 14 秒**。PASS 本身诚实地表示“可以开发”，没有冒充最终验收；但恰恰说明“可以开发”的判据没有排除会大面积推翻设计的已知高风险前提。[B20][B21][B23][B24]

也不能把结局写成“Bridge 一直没有交付”。历史实施分支记载 10-20 正式发布 0.11.0，随后发布 0.11.1 并完成 Longleaf 运行时读回。10-22 又发现进度入口和证据覆盖的局部缺口，新的 0.11.2 候选尚未完成最终 live 验收。这些不同阶段必须分别计量。[B35][B42][B36][B37][B38]

## 1. 取证范围和可信度

本报告属于 RUN_ID=pro-a 内部历史研究，只读 Bridge 历史，不写目标项目。已读取当前 Bridge main 的 AGENTS、当前 AI_Skills Planner/Critic 合同全文，以及本轮 pro-a 强制案例说明。重点核对指定的 28 个里程碑提交，并扩展到真实 canary、代码回撤、正式发布和 10-22 正常入口审查。

Bridge main 停留在较早的 bc94e41f；不能仅凭 main 推断项目最终未交付。补充读取的是历史分支 work/bridge-core--product-scope-reset，证据读取截止为 2813318a7a5b4763e8f6b0a12d8d659cb193a09b。它是 Bridge 自身的历史实施分支，与本轮 Toolkit 的 work 研究分支无关。没有读取本轮 pro-b 或 work 研究结果。

本文使用四种证据身份：

- **OBSERVED**：实际读到的版本化文档、原始结果、提交差异和时间戳。
- **INFERRED**：由这些记录推断的遗漏原因、最小可见返修链、可替代验证方式。
- **ASSUMED**：反事实试验要预先约定的执行者权限和时间预算。
- **UNKNOWN**：未保存的完整聊天、人工耗时、真实模型调用次数、是否每次修改都对应一次独立模型、实际开发成本及代码作废比例。

历史报告中的现场观察是“当时的记录”，本轮没有重新运行 Longleaf、SMTP、Codex canary 或 Git 事务。相关运行结论不能外推到现在或其他机器。本轮先看过后续结果，因此下面所有工作流回放均是 **retrospective analysis**，不能叫严格历史盲测。

## 2. 返修链：保留每一轮的信息增量

下表时间均用香港时间。S 表示该回合依赖上轮新结果，因而至少有逻辑串行依赖，不代表整项任务只能串行。H 表示文档明确提到用户决定、转交或批准；“?” 表示无法从 Git 证明。W 表示可观察到实现撤回，不能换算人时。核心变化只按机制与责任边界判断。

| 回合 | 原设计、审查和后续结果 | 主标签 | S / H / W / 核心机制 | 证据 |
|---|---|---|---|---|
| 10-12 初始 v0.1 | 上下文绑定、worktree exchange、必读控制源、readiness、残余进度能力被合成 0.11.0 | OTHER；后续可见 DESIGN_GAP | 初始 / ? / 无 / 有 | [B01] |
| 同日 v0.2 | chat Critic 提出双 dirty worktree、启动 preflight caller、partial clone 读取三个 blocker；方案补实地 Git 小实验 | DESIGN_GAP、EXTERNAL_FACT | 是 / 转交审查 / 无 / 有 | [B02] |
| 同日 execution v0.1→v0.2 | 形成 Plan/Goal/Kickoff；追加审查后冻结启动边界与 G01–G14 | DESIGN_GAP、EVIDENCE_GAP | 是 / 转交审查 / 无 / 有 | [B03] |
| 10-12 第一批实施 | 26c57fa 写入 readiness、工作树事务、launch binding 等 | OTHER | 设计后 / ? / 此时无 / 实现既定机制 | [B04] |
| 同日 post-implementation review | 646dfa0 修目标 cwd 下预算、replace refs/grafts 等安全读取事实 | IMPLEMENTATION_BUG、EXTERNAL_FACT | 实施后 / ? / 局部 / 基本不改产品 | [B05] |
| 同日 safety repair | 8ff3bba 修通知授权来源、有效配置与运行身份等 | IMPLEMENTATION_BUG、EVIDENCE_GAP | 实施后 / ? / 局部 / 部分责任核清 | [B06] |
| 同日 recovery repair；后续 source hardening | b9956c9 修 CRLF、启动前重查和事务恢复；10-13/15 继续修源绑定、EOL、index flags | IMPLEMENTATION_BUG、EXTERNAL_FACT | 实施后 / ? / 局部 / 不应全部算架构重置 | [B07] |
| 10-16 scope recovery | 明确承认主动进度缺 caller、正常只读 Git/wrapper audit 未收口、notifier 仍项目局部；原有短期能力遗漏 | DESIGN_GAP、EVIDENCE_GAP；cadence 为 IMPLEMENTATION_BUG | 是 / 核对原始用户目标 / 无直接比例 / 有 | [B08] |
| recovery v0.1 | 恢复全部短期 TODO；Local Autonomous 从 Bridge 范围移出 | DESIGN_GAP；NEW_REQUIREMENT/范围决定 | 是 / 明确用户范围决定 / 未知 / 有 | [B09] |
| recovery v0.2 | ER11-01–03：idle-only 原线程注入、模型 turn 前无工具限制、自动/手动通知与语义 authority | DESIGN_GAP、EVIDENCE_GAP | 是 / 转交审查 / 无证据 / 有 | [B10] |
| recovery v0.3 | 用户改为独立 Progress thread，不再写原 Executor thread；24b7032 仅修阶段措辞 | NEW_REQUIREMENT；措辞为 OTHER | 是 / 明确 / 暂无代码回撤 / 有 | [B11] |
| recovery v0.4 | normal-entry、Persistent start/status/supervisor、Gmail 配置入口、首次 thread materialize；unused thread 不能直接 cold resume | DESIGN_GAP、EXTERNAL_FACT | 是 / 文档记转交 / 无直接比例 / 有 | [B12] |
| recovery v0.5 | 源码表明 active thread 绑定 app-server writer，必须 shared server；修机器配置复用与 Control authority | EXTERNAL_FACT、DESIGN_GAP | 是 / 文档记转交 / 无直接比例 / 有 | [B13] |
| recovery v0.6 | ER11-08–13：writer preflight、worktree quiescence、native reads、授权寿命、通知三意图和 caller、实际 writing-style reader | DESIGN_GAP、EVIDENCE_GAP | 是 / ? / 未知 / 有 | [B14] |
| v0.6 进一步硬化 | 无可靠排他 primitive，生产 worktree exchange 改为所有平台 pre-move deny；仅保留 disposable 事务试验 | EXTERNAL_FACT、DESIGN_GAP | 是 / ? / 前期实现利用价值下降 / 有 | [B15] |
| Control Critic 责任扩张再撤回 | fa560cb 加入产品 low-friction 审查职责；4fdae84 删除同段并回归字节一致 | REVIEW_DRIFT、DESIGN_GAP | 是 / ? / 明确撤回 40 行 / 角色边界 | [B16][B17] |
| v0.7→v0.8 | 两处摘要仍允许 Linux/procfs exchange，与全平台禁止冲突；Critic 正确要求修正，然后只复核两项并 PASS | DESIGN_GAP；有价值的一致性审查 | 是 / ? / 文档 / 无新增产品机制 | [B18][B19][B20] |
| v0.8 PASS→第二批实施→canary | e0f7a32 实现 reader、display、通知和多入口接线；实际 Codex 0.160.1 无法清除全局 AGENTS，multiAgentMode 请求被忽略 | EXTERNAL_FACT、EVIDENCE_GAP、架构前提错误 | 是 / 现场授权范围已冻结 / 随后大段回撤 / 有 | [B21][B22][B23] |
| product reset v0.1 | 删除 app-server/Progress display/exchange 等发布关键依赖；G14 耦合被认定超出产品需要 | SCOPE_RESET、DESIGN_GAP | 是 / 明确允许重定范围 / 是 / 有 | [B24] |
| reset critic→v0.2→design PASS | Critic 保住用户要求的一次 Clear Writing；补 dirty scope、stale 恢复、迁移清单，避免四能力“简化”再次删需求 | DESIGN_GAP；有价值独立审查 | 是 / ? / 局部方案 / 有 | [B25][B26][B27] |
| reset execution PASS→实施 | a9c03b4 批准 C1–C5，明确删 machine notifier profile；be4a979 执行大范围删减与 one-shot 替代 | SCOPE_RESET、EVIDENCE_GAP | 是 / 执行批准身份未知 / 是 / 有 | [B28][B29][B30] |
| reset 后 integrated v3/v4 | 八个 blocker 再补生产者合同、恢复入口、机器唯一配置/迁移、四 caller、超时、写入事务；v4 再去除 process config override | DESIGN_GAP、EVIDENCE_GAP；完整聊天不全 | 是 / ? / 继续改已实施代码 / 有 | [B31][B32][B33] |
| v5/v6→最终实证→0.11.0/0.11.1 | 收窄实际 writing-style 依赖、修实际 helper/表达路线；最终正常入口成功；cadence 局部补丁后发布 | IMPLEMENTATION_BUG、EXTERNAL_FACT、OTHER | 部分是 / exact live 授权 / 局部 / 大框架稳定 | [B34][B35][B36] |
| 10-22 正常入口完整性复查 | 已发布能力保留；发现 source/status/ETA/末次快照缺口及 wrapper 保障范围尚不能外推；0.11.2 非 live 候选 | DESIGN_GAP、IMPLEMENTATION_BUG、EVIDENCE_GAP | 已发布后 / ? / 局部 / 主要已有 owner | [B37][B38] |

表中“架构前提错误”不是另加一个混淆枚举：在用户给定标签中归为 EXTERNAL_FACT + EVIDENCE_GAP + DESIGN_GAP。它表示设计承诺依赖的外部机制被实际运行反证；区别于“设计可行而代码写错”。

### 2.1 不能归咎于新需求的遗漏

最清楚的是主动进度。初始 snapshot 的旧 TODO 已经要求长任务主动报告，而非只有 on-demand status。它明确区分项目负责真实进度生产、Bridge 负责通用报告/运输，也不要求新建中央控制器。10-16 scope recovery 又逐条承认此前归一化、ETA、JSON 和可选邮件投影都有，但没有周期 caller owner，没有完整 delivery。它明确称为恢复 0.9 已冻结语义。这构成“目标存在→设计只覆盖中间函数→实现完成→重新发现缺用户能力”的直接链。[B39][B08]

相同文档指出两个 cadence bug：fraction 一变就投递，造成刷屏；以最近 observation 而非最近 logical delivery 为时钟，频繁观察反而使周期投递饥饿。前者属于设计到代码语义落地不完整；后者可以用受控时钟很小成本测出，没必要另开完整架构轮次。到 0.11.1 再次修复同类 cadence 说明“finding 被写进方案”不能代替所有当前路径仍满足约束的证据。[B08][B36]

### 2.2 必须保留的新需求和合理修订

v0.3 明确记载用户决定使用 dedicated Progress thread，而不是继续写原 Executor thread。这改变了交互表面和拓扑，应算 NEW_REQUIREMENT，不能倒算为初始 Planner 漏掉一种当时未指定的产品选择。Local Autonomous 的范围移出也有明确用户决定。正常的产品改变会带来真实串行依赖，新协议不应承诺消灭它们。[B09][B11]

reset 之后 machine-once notifier、量化进度和四个 caller 再出现，与 recovery 时代已有能力承诺一致，因此具有“范围删减失去原能力→再恢复”的迹象。不过 integrated v3 自称接续未完整版本化的 v1/v2 附件，缺少全部聊天；不能断言每一项都只是 Critic 漏项，或用户完全没有补充。可观察结论是：reset execution PASS 之后已有代码实施，随后设计又补八类重大合同，稳定性仍未成立。[B08][B29][B31]

## 3. 两次最有判别力的“可实施”失效

### 3.1 v0.8：文档闭合，平台前提仍未闭合

v0.8 具有完整 Plan/Goal/Kickoff、细粒度 release gates、正常/失败/恢复要求和独立 execution-ready PASS。最后一次审查只检查前轮 R7 的两处摘要矛盾，未重新改变此前已接受的机制。这样可以避免无止境重审；问题在于此前 accepted 的关键 external assumption 没有升级为冻结前必须证明的事实。[B18][B19][B20]

设计要求 fresh ephemeral reader 在选定 CODEX_HOME 内运行，读回 instructionSources 为空，且 multi-agent 被关闭；同时不允许为了达到这一点偷偷换 home、改全局指令或新开另一套 daemon。上述组合决定 reader 能否存在，是架构级条件，不是实现末端的小测试。实际 canary 表明：

- 默认 ephemeral reader 的 instructionSources 仍包含全局 AGENTS。
- project_doc_max_bytes=0 并未让全局 AGENTS 消失。
- 实际 schema 对 thread-start 的 multi-agent 字段标注 deprecated/ignored。
- canary 在零 reader model turns、零 durable Progress threads 时就停止。
- 恢复条件是平台真正提供可回读的 thread-local 隔离能力，或者设计改变约束。[B23]

因此这是一个能在投入全部接线前做的零模型平台 probe：固定同一运行身份，只创建 ephemeral zero-turn reader，读取 effective instructionSources 与实际控制字段。它既不需要先实现 notifier、四种工作流，也不需要等待最终 live model/Gmail Gate。代码编写后才跑它，使失败影响从 reader 一个 adapter 扩散到 release-wide G14。[B21][B23][B24]

需要保持因果边界：本轮没有在冻结前真实运行该 probe，不能给“100% 检出率”。但后来的 canary 所使用的输入和观察对象在 v0.8 前已经被设计明确指定，且失败发生在模型启动前；因此“前移同一个 probe 很可能更早改变路线”是证据较强的反事实。第二个 Pro 可能提出 one-shot exec，也可能同样依赖错误接口；第三个仍没有运行证据的架构师没有同等强度的依据。

### 3.2 reset：单纯删除机制也会删掉能力

reset v0.1 的 Critic 纠正了“自动 Clear Writing 延期”的决定，理由是用户要求仍在。它要求保留一次性表达 adapter，并明确失败 fallback，不恢复 app-server。这是独立 Critic 的高价值例子：既能否定复杂实现，又能保护产品目标，不只是挑字段。[B25][B26]

但 reset execution PASS 仍批准删除 machine notifier profile，且声称实施者不再需要 probe 决定产品范围。随后实施 checkpoint 已删除旧架构。当天晚些时候，integrated v3 又从八个 Critic blocker 补齐了明确的机器配置唯一 authority、legacy migration/retry、生产者连续报告合同、四类通知 caller、recover/resolve、120 秒超时边界等。v4 再去掉进程环境覆盖造成的第二配置真值。[B29][B30][B31][B32]

这条链说明：发生 reset 时不能只对新简化方案做内部一致性审查，还必须对**原始已接受能力做保留性核对**。每项删除都要回答“被删的是机制，还是用户能力；能力转移给谁；正常入口是否仍成立”。Asteria 的组件删除记录若只留下 reason，却没有 capability impact 和承接 owner，仍可能批准一个看似更简洁但缺功能的新方案。

## 4. 为什么多个 Critic 仍未形成稳定包

### 4.1 审查范围随当前文档收窄

最末 v0.8 Critic 做的是前轮残余 finding 复核，而 scope recovery 较早才重新回看全部 TODO。这种工作分工容易把“当前文件中已被接受的前提”当作不可再问的事实。Critic 不是完全看不到遗漏；它缺少稳定的独立问题集和未验证假设账本。未关闭的平台前提不应因为被上一轮接受就从冻结检查消失。[B08][B18][B20][B23]

### 4.2 很多 Gate 位于实施之后

G01–G14 很重，但 design PASS 与 execution-ready PASS 允许把大部分真实运行事实推到 final candidate。对于状态展示外观、正常邮件等完整能力验收，这个次序合理；对于 reader 是否能满足隔离、active thread 能否跨 server、worktree 是否存在排他 quiescence authority，它让架构在事实未知时先被实现。应该把“路线可行性证明”和“最终产品正确性验收”拆开。[B03][B13][B15][B23]

### 4.3 能力闭合被模块闭合替代

存在 report_progress_file、notifier.send、JSON schema、unit tests，不等于“长任务会自动更新给用户”。caller、启动入口、周期 owner、producer、默认配置和实际 consumer 常分别到后续版本才出现。这个类型不必靠每次新找 Critic；若设计者必须给每个能力画出真实输入→生产者→状态→调用者→输出消费者，最显性的空白应该在首稿自己暴露。[B08][B12][B31]

### 4.4 修订没有限制传播范围

从通知可读性扩张为 reader/thread/server，再进入 Lite/Reviewed/Control/Persistent 的 authority、intent 和 completion 路径，独立的可选附加能力变成多个成熟工作流和整个 release 的共同前提。即使最初遗漏不可避免，更好的组件边界也可避免大面积重做。[B14][B21][B24]

### 4.5 文档复制产生新的矛盾

v0.7 的详细规则已改成所有平台禁止生产 exchange，两处摘要还写 Linux/procfs 可允许。Critic 发现并修正是真实价值，但这属于重复表述造成的维护成本；单一规范字段、生成摘要以及增量一致性检查比完整再写一轮近两千行 plan 更合适。[B18][B19]

### 4.6 用户仍承担范围记忆和协调

资料多次记载“用户转交 Critic”“用户再次明确”“重新核对原始 TODO”，并在 product reset 处由用户允许重新决定范围。Git 不能证明用户阅读了多少字或花了多少分钟，但这些足以说明原工作流没有完全承担范围记忆和角色交接。不能把它们转换成虚构的人工时间节省百分比。[B02][B08][B11][B12][B24]

## 5. Critic 的价值与走偏必须分开

| 已观察的审查行为 | 为什么有价值或有害 | 新协议如何保留信息 |
|---|---|---|
| BC11-D01–03：worktree、preflight caller、partial clone | 促成真实 Git 小实验，补到可执行边界；不只是表面文案 | 将事实问题直接路由到 Codex probe；审查保留机制质疑 |
| ER11-01–03：idle-only、no-tool-before-turn、语义 authority | 定位运行时并发与授权约束 | 冻结前明确前提；若接口未证实，不允许“之后 Gate 再看” |
| normal entry / periodic owner / notifier caller | 恢复用户可实际用的能力 | completeness 合同首先强制设计者自查；Work 从原始场景找全局缺项 |
| v0.7 两个相互冲突摘要 | 阻止实现者选到错误规则，属于必要一致性检查 | 单一权威字段和结构检查承担显性矛盾；不必为此重启完整独立设计 |
| reset Critic 保留 one-shot Clear Writing | 防止“去复杂化”删原需求，同时提出小范围可行路径 | 保留产品反例挑战、能力保护和独立裁决 |
| 把 low-friction 产品责任塞入 Control Critic，再撤回 | 审查对象和角色 owner 混淆，扩大治理范围 | finding 必须带原始能力、影响、owner 与应改机制；无关 owner 不自动背责任 |
| 每轮只关闭上一轮 finding | 有利于止损，但会把 accepted 的未知前提当已知 | 局部复核之外，保留独立未证假设清单；只重开受新证据影响的条目 |

只有 fa560cb→4fdae84 这一段有明确的角色扩张和撤回证据，可标 REVIEW_DRIFT。不能把所有审查轮次、所有安全限制或所有不合用户预期的 finding 一概归为走偏。[B16][B17]

## 6. 四种替代机制分别能做什么

### 6.1 Asteria completeness 能提前暴露显性断点

可强制要求的字段不是“详细描述”，而是可验证的关系：

- 主动报告能力必须有周期调用 owner、真实 producer、cadence 的时钟、至少一个 delivery consumer。
- state/status/notifier 共用同一事实 owner，禁止一个读 raw source、另一个读 last-good ETA 却均声称代表同一进度。
- reader 的真实运行身份、配置来源、禁用能力和 evidence 必须相互绑定。
- managed writer 必须覆盖正常、超预算、并发、恢复和用户区域保留。
- 删除组件必须列出原能力去向；C1–C5 的简化不能静默删除 machine-once setup。
- claimed linked 必须有源码 anchor；validated 必须有实际对应输入与结果；implemented 与 proved 必须分列。

它不能凭结构发现“整项主动报告没被列入能力表”，也不能自动知道独立 Progress thread 是否符合用户价值、one-shot 是否够用、Codex 的实际接口是否诚实。accepted component 的 mechanism 字段可以被写得很完整却仍是错误机制。上述项需要独立场景调查和真实取证。[B08][B23][B29][B31][B37]

### 6.2 Work 盲区调查适合恢复能力全集

给 Work 原始 TODO、历史痛点、真实新机器/新项目/长任务/异常恢复场景，不给当前候选方案。它应先提出任何设计都必须回答的题目，例如“谁每小时唤醒 reporter”“换 repo 还要配几次邮件”“supervisor 消失后用户能否安全恢复”“退出前最后一条进度谁读取”。这些问题直接对应后来真实发现，但此处仍是反事实机会，不是已测检出率。

Work 的价值不在再给一遍所有字段评分。候选已经覆盖且事实证明充分的局部 bug，可以直接交 Codex 修复；把每次 CRLF 修复送回 Work 只会延长串行路径。[B08][B31][B37]

### 6.3 第二个独立 Pro 的适用点

若原始目标能由几种责任结构实现，例如“平台内专用显示线程”与“本地状态+普通 CLI+one-shot 通知”，在投入完整设计前进行独立核心决策竞争可能提前揭露过度耦合。它需要从相同原始目标出发，不能先阅读另一候选后换词复述。Bridge reset 最终选出的薄机制表明另一条路线确实存在。[B24][B26]

但不能据此声称第二个 Pro 一定选择正确方案。对于两个设计共同依赖一个未证实 Codex 接口，增加第三个 Pro 的信息增量没有依据；一个读取真实 schema、零模型 thread preflight 的 Codex probe 对当前决定更直接。历史没有随机对照，无法比较第二 Pro 的平均收益。

### 6.4 最小 Codex probe 应前移到路线选择

| 冻结前问题 | 最小证据动作 | 改变的决定 | 不能证明什么 |
|---|---|---|---|
| dirty linked worktrees 交换是否保留 index/工作区？ | disposable 双 worktree + staged/unstaged/untracked + interruption rollback | 事务是否值得保留候选 | 不证明 production 无活动进程，不证明排他 quiescence |
| partial clone 必读 blob 能否不改原 .git 读取？ | 隔离 object dir、只读原仓库、实际缺 blob | reader 技术路线 | 不证明所有 remote/auth/配置组合 |
| 同一 active thread 能否跨 app-server writer？ | 先读所选 tag 源码/测试；必要时零模型 start/resume | 是否必须共享 server | 不证明 viewer/持久化/重连全部正确 |
| unused thread 是否能 cold resume？ | first-turn 前后分别检查 durable materialization | thread 生命周期合同 | 不证明通知内容或用户可用性 |
| reader 能否满足 isolation 合同？ | 固定真实 CLI/CODEX_HOME，ephemeral zero-turn，读 effective instructionSources 与参数 schema | 是否允许此 reader 架构冻结 | 不证明模型一定守指令、也不证明最终端到端产品 |
| SMTP/helper 卡死能否不拖死 primary？ | disposable helper hang，检查总 deadline、父进程与重复发送状态 | adapter 失败隔离合同 | 不证明真实 inbox delivered |
| 进度观察/投递时钟是否分离？ | 假时钟推进多次观察与 60 分钟周期，检查 exact caller | cadence 的局部实现 | 不证明真实 producer 会持续上报 |

第一、第二项历史已经做过，是“有信息增量的 loop”的正对照。reader 的最小证据应比完整 app-server/notification 实施更早。对最终外部有副作用的验收，仍须保留真实身份和既有授权边界；不能为实验方便虚构授权。

## 7. 如何让晚发现局部吸收

Bridge 最后成功的方向，不是保证再无遗漏，而是把生命周期、事实、表达、传输分开。主 child/supervisor 拥有运行事实；项目拥有真实进度；已有工作流 owner 决定语义完成；notifier 运输已冻结事实；Clear Writing 只表达，不拥有执行或完成权。[B31][B32][B35]

这些边界可以吸收多种迟发现：

- reader 隔离不成立时，只替换表达 adapter；primary runtime、进度状态、通知 transport 和其余 release 能继续有明确完成范围。若用户必须要对应表达能力，则只冻结该 capability，不冒充已完成。
- app-server 变化只影响可选 UI adapter，CLI/status 为真实事实视图；不能靠临时新增 daemon 继续扩大产品面。
- SMTP failure、DELIVERY_UNKNOWN、超时不改变 child 的 lifecycle；显式 retry 不重新决定 Goal 完成。最终 v3 的 120 秒 helper deadline 是实质隔离，不是额外命名。
- producer 坏 JSON、半写或停报属于观察通道；保留 last-good，但标明失联，不能终止主任务，也不能用 stale snapshot 冒充新进度。
- replace refs、CRLF、index flags 之类 bug 由 source-reader owner 局部修复，重跑受影响事实测试，不重写全部产品架构。
- machine notifier 的配置/迁移由一个 owner 管理；项目只引用已有机器能力和批准的通知意图，不能每个入口建立另一套 secret precedence。

上述建议不能把原需求“永久降低”为 fallback。替换边界必须写明保留了哪个用户结果、哪些能力仍未达标、谁负责裁决；否则“低返工”只是隐藏功能缺失。

## 8. 可观察指标及不能算出的成本

| 指标 | 本案可报告的值或下界 | 证据身份与限制 |
|---|---|---|
| 主要设计族 | 上下文/就绪收敛；scope recovery；product scope reset；integrated v3/v4；正常入口完整性修复 | OBSERVED 文档族；不是独立 AI 调用次数 |
| 实施到设计的明显返回 | 至少 3 条：第一批实施→scope recovery；第二批实施→product reset；reset checkpoint→integrated v3 | INFERRED 下界，由实际代码与后续重大设计证明；并非所有 return 都是同一原因 |
| 明确全局 scope reset | 至少 1 次，0120b99 | OBSERVED；v3/v4 明称并非再做 scope reset，不强行多算 |
| 大批代码实施 cohort | 至少 4 批：26c57fa、e0f7a32、be4a979、542832e | OBSERVED 代码批次代理，不能直接称 4 次 Codex 会话/启动 |
| PASS 后发生的重大设计返回 | 两条直接链：35a976e→canary→0120b99；a9c03b4→be4a979→894f8bb | 第一条平台反证最强；第二条因部分聊天缺失保留混合归因 |
| v0.8 PASS 到 reset | 3 小时 16 分 14 秒 | OBSERVED 提交时间差，不是连续计算/人工工时 |
| 初始方案到正式 0.11.1 closure | 193 小时 55 分 45 秒，约 8 天 1 小时 56 分 | OBSERVED 日历跨度，不是用户等待或模型运行总时长 |
| 代码回撤代理 | reset 删除 codex_progress_thread.py 329 行、reader_layer.py 279 行；另删 development canary 243 行、reader tests 381 行 | OBSERVED 当次 diff；含中间修改，行数不等于浪费程度或时间 |
| 角色漂移回撤 | Control Critic 增加后删除同一约 40 行审查职责 | OBSERVED 小范围额外劳动，不能代表所有 Critic finding |
| 用户介入 | 原始需求再核、转交 chat Critic、改 Progress thread、允许 reset、live 授权均有文档痕迹 | 次数与分钟 UNKNOWN；一个文档可能引用同一次用户消息 |
| 串行轮数、关键等待 | 存在明确依赖链，但完整会话边界、并行时间和排队时间缺失 | UNKNOWN；只能记录阶段事件，不能报告“省 60%” |
| Codex 临时核心设计数 D_codex | 无法从已读证据可靠计数 | UNKNOWN；能证明设计前提未证实，不等于 Codex 私自设计 |
| 实现作废比例 W_waste | 有指定模块删除；全仓有效/无效行数和投入无基准 | UNKNOWN；禁止用删行/加行比例充当开发浪费比例 |
| 冻结后重大缺口率、审查检出率 | 本案存在具体事件，分母和采样偏差未知 | UNKNOWN；不能产生 p/q 实测准确率 |

## 9. 回放 benchmark

机器可读记录见 [bridge_cases.json](evidence/bridge_cases.json)。这里保留六类足以区分机制的题，并另附实际完成 Git probe 的正对照 BR-07，避免只挑负面样本。

| Case | 截止快照 | 隐藏后续真相 | 候选流程在当时该输出什么 | 可判断程度 |
|---|---|---|---|---|
| BR-01 能力无 caller | 首个 execution v0.2，3e0370c；旧 TODO 当时已存在 | scope recovery 承认周期 owner/consumer 缺失 | 不得把主动报告 marked complete；列出 owner、启动入口、cadence、delivery；缺项 RETURN_TO_ARCHITECT | 强回顾机会；并非真正盲测 |
| BR-02 worktree 无排他证据 | 2e12226 v0.2，真实 disposable 成功后 | 16ae5fe 将所有生产 exchange 禁止；reset 删事务 | 区分 transaction proof 与 quiescence authority；先事实查证，不能以 ps/procfs 扫描替代排他锁 | 可检出边界混淆；不预知未来产品删减 |
| BR-03 reader 平台能力 | 35a976e 明确 PASS | canary 0 model turns 已证 unsupported；3h16m 后 reset | 拒绝全局 Freeze，next=CODEX_MINIMAL_PROBE；固定所选 runtime，零 turn 读取有效配置 | 最强反事实；probe 是否可获当时实际环境仍需前提 |
| BR-04 reset 丢能力 | a9c03b4 execution PASS | be4 实施后 v3 补机器配置、生产者、恢复/consumer | 以原能力账本核对删减影响；所删能力无承接 owner 即 RETURN_TO_ARCHITECT | 较强但完整 v1/v2 附件/chat 不全；新需求归因不强判 |
| BR-05 检查器错判 | da9f6d2 前的开发 display 检查 | 0-turn display 的全局 instructions 并无模型执行意义；reader 才有实际边界要求 | LOCAL_CODEX_FIX 检查器，不因此更换整个显示产品；随后独立判断 reader 事实 | 防止过度路由的负对照 |
| BR-06 发布成功仍限定证据 | 0.11.1 正式 ba9013b；证据 snapshot 为 7f43e146 | 10-22 status/ETA/producer/末次读取缺口；5秒 none canary 没证明量化进度 | 保留已经成功的能力，补一条长进度路径及关键故障，已有 owner 局部返修 | 不得将正常入口缺证据直接判代码全错 |

BR-03 对 runtime probe 的支持最强；BR-01 对双向能力追溯和 blindspot Work 的支持较强；BR-02 对代表性失败路径与权限边界验证的支持强；BR-04 对能力保护有支持，但不能声称独立 Pro 的效果已被实测。BR-05 和 BR-06 用来防止新协议过度敏感：发现问题不总是 RETURN_TO_ARCHITECT，缺一条证据也不总是推翻已实施机制。

若以后开展真正回放，要由另一位执行者只读 cutoff allowlist，后续 commit/path 不进入上下文；先记录问题、next action 和 freeze 判断，再揭示未来结果。评价应以高影响问题和错误阻塞为单位，不能靠复述隐藏答案拿分。这里的叙事和标签可作为 benchmark 初稿，不能同时当盲测提示与标准答案。

## 10. 对最终方法研究的限定结论

这段历史否定了“有 Plan/Goal/Kickoff、独立 Critic PASS、最终验收已详细设计，所以实现不再需要架构判断”的充分性。它没有否定阶段化，也没有证明所有 review 必须被删除。有效部分包括：最早 Git disposable probe、独立 Critic 对 caller/authority 的质疑、reset 中保护用户 Clear Writing、最终只认可 exact candidate 的真实正常入口、失败后保留 invalid attempt 而不倒签成功。[B02][B25][B35]

新协议只有满足以下可检验条件，才能声称在 Bridge 这类任务上比固定 Planner–Critic 更好：

1. 在首个完整执行包之前发现至少一个原能力无 producer/caller/consumer 的重大空白。
2. 在大规模 app-server 与工作流接线前，取得所选 reader runtime 的关键反证，或明确隔离其失败影响。
3. 在删除整片实现时，核对原始能力是否保留，避免简化后重新恢复同一机器配置和进度能力。
4. 对 CRLF、helper entrypoint、cadence 和检查器错误给出局部 Codex 修复，不每次重启架构。
5. 已通过能力的证据不因无关 finding 作废；真正有影响的外部事实只重开受影响的决定。
6. 报告减少了哪些实际串行返回、代码回撤和用户协调，不能用“更少文档”或“更少 PASS”替代质量。

Bridge 还不足以量化第二 Pro、Work 或 Asteria 的平均检出率。若后续受控回放表明这些机制仍漏掉 BR-01/BR-03，或引入比传统流程更多错误阻塞，那么替代协议的主张必须下调。现有证据支持优先购买**具体未知事实和独立原始场景问题**，而不是固定再购买一轮已经看过当前方案的全面 Critic。

## 证据索引

所有链接固定到实际读取的提交；源码变化使用 commit diff，其他使用 blob。完整机器索引见[来源清单](evidence/source_manifest_bridge.json)。


[B01]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/27132a4da7a274371c53b61abaef20e0f26b22b1/docs/design/0.11.0_execution_context_and_readiness_convergence_proposal_v0.1_2026-10-12.md "初始 0.11.0 Proposal v0.1"

[B02]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/2e12226859446ad55067e19f08fc6b450f459c9b/docs/design/0.11.0_execution_context_and_readiness_convergence_proposal_v0.2_2026-10-12.md "Proposal v0.2 与三个设计 blocker"

[B03]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/3e0370c7b1993ba2f6cba600aaed6a741892cb16/docs/design/0.11.0_execution_context_and_readiness_convergence_execution_plan_v0.2_2026-10-12.md "首个 Execution Plan v0.2"

[B04]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/26c57fab885c209bc3944a640453c1a66e3f61a8 "第一批上下文/就绪实现"

[B05]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/646dfa03f7f54ebf74b2e6b5edb93d5c4d4a6c6c "实现后 readiness 审查修复"

[B06]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/8ff3bba99eb4aa9be3aead26fd3698841d6c7604 "safety gaps 修复"

[B07]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/b9956c9c306c9d65a3e54583271bd071801c936c "recovery/source preflight 硬化"

[B08]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/524bba6b1af6a5c9d43a3fc6fbe76ee5c35264da/docs/design/0.11.0_final_scope_recovery_proposal_v0.1_2026-10-16.md "Final Scope Recovery Proposal"

[B09]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/cb605eb2fd4fe7e54a6e1a2d92173e45ce81d56f/docs/design/0.11.0_final_scope_recovery_execution_plan_v0.1_2026-10-16.md "Scope Recovery execution v0.1"

[B10]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/798c8a6562bd31f14e1d260ec041a12ef98ae8ce/docs/design/0.11.0_final_scope_recovery_execution_plan_v0.2_2026-10-16.md "Scope Recovery execution v0.2"

[B11]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/e2f41f87bc827b145398456e3b11098130672ca9/docs/design/0.11.0_final_scope_recovery_execution_plan_v0.3_2026-10-16.md "Scope Recovery execution v0.3"

[B12]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/a03742ed07d00d36e3436f64a17e92c40a51064e/docs/design/0.11.0_final_scope_recovery_execution_plan_v0.4_2026-10-17.md "Scope Recovery execution v0.4"

[B13]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/f67ac9155c1a844f171afbeef03e8169b8eec6fc/docs/design/0.11.0_final_scope_recovery_execution_plan_v0.5_2026-10-17.md "Scope Recovery execution v0.5"

[B14]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/ae15269908dbe5b7666bb347897b8839dfd0fb49/docs/design/0.11.0_final_scope_recovery_execution_plan_v0.6_2026-10-18.md "Scope Recovery execution v0.6"

[B15]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/16ae5fefe8747e54a6db60bd155311daff1efed7 "v0.6 全平台 quiescence 与 reader isolation 硬化"

[B16]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/fa560cb36f8203866e9d3e237d6879578377be0e "向 Control Critic 添加产品审查责任"

[B17]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/4fdae84d99b53b442fb3cafd04c4c7a5722061d3 "撤销 Control Critic 责任扩张"

[B18]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/ace8f6507e61e6b53af5a3e83ba01c275ee6fc9c/docs/design/0.11.0_final_scope_recovery_execution_ready_critic_review_v0.7_2026-10-18.md "v0.7 execution-ready REVISE"

[B19]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/a6c0a3e0ecc59147fa83714c07a15244f1f2c36b/docs/design/0.11.0_final_scope_recovery_execution_plan_v0.8_2026-10-18.md "Scope Recovery v0.8 plan"

[B20]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/35a976e79c036f6e68ba70e9d2364abc1c274a45/docs/design/0.11.0_final_scope_recovery_execution_ready_critic_review_v0.8_2026-10-18.md "v0.8 execution-ready PASS"

[B21]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/e0f7a328a76e464d154cd1a4295b563b473f8023 "第二批 full-functional 实现"

[B22]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/511164258101e426da62c96b12e9803e8e7bd8a5 "app-server transport 与 development canary"

[B23]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/da9f6d2b34c00e87e00622b9234bbada786c1760/results/bridge-core--execution-context-readiness-convergence/DEVELOPMENT_PROGRESS_CANARY.json "真实 development canary 原始记录"

[B24]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/0120b99a501e4193078233bc4ec824dcb1dcac75/docs/design/0.11.0_product_scope_reset_proposal_v0.1_2026-10-19.md "Product Scope Reset Proposal v0.1"

[B25]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/d293e525491b7db823435e15ffa3318bed251960/docs/design/0.11.0_product_scope_reset_critic_review_v0.1_2026-10-19.md "Reset Proposal Critic REVISE"

[B26]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/ce77f24e5dadd083d4beecf9b6e922e94192b372/docs/design/0.11.0_product_scope_reset_proposal_v0.2_2026-10-19.md "Reset Proposal v0.2"

[B27]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/4ccc40cc5ab061bb1fbbd74f34b5d9976ad10122/docs/design/0.11.0_product_scope_reset_critic_review_v0.2_2026-10-19.md "Reset design PASS"

[B28]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/a0ff37926dba44993f29c680d5a355221fc55c72/docs/design/0.11.0_product_scope_reset_execution_plan_v0.1_2026-10-19.md "Reset execution plan v0.1"

[B29]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/a9c03b4a36c185aa98b00006c08ef600ba77d094/docs/design/0.11.0_product_scope_reset_execution_ready_critic_review_v0.1_2026-10-19.md "Reset execution-ready PASS"

[B30]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/be4a97949e65690fcfc236956de3e89768079b77 "Reset 实施 checkpoint"

[B31]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/894f8bb3eb99e6363902febd08bccae73d517d1c/docs/design/0.11.0_integrated_product_architecture_v3_2026-10-19.md "Integrated architecture v3"

[B32]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/61004a64effacad08c792140fafbf5a72ea874bf/docs/design/0.11.0_integrated_product_architecture_v4_2026-10-19.md "Integrated architecture v4"

[B33]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/commit/542832ed098013148c8bc8c53b7a59a6878bb014 "Integrated v4 实施"

[B34]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/2813318a7a5b4763e8f6b0a12d8d659cb193a09b/docs/design/0.11.0_integrated_product_architecture_v6_2026-10-20.md "Final repair v6"

[B35]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/7f43e146eed50d290ef9cc6ab912d106f754042c/results/bridge-core--product-scope-reset/v6/391ff88/FINAL_IMPLEMENTATION_REPORT.md "0.11.0 正常入口最终实施验收"

[B36]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/7f43e146eed50d290ef9cc6ab912d106f754042c/results/bridge-core--product-scope-reset/0.11.1/FINAL_REPORT.md "0.11.1 正式发行与 Longleaf closure"

[B37]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/71ad6874c1cde41548eb66a6c32cea615e055407/docs/design/0.11.1_normal_entry_capability_acceptance_proposal_v0.1_2026-10-22.md "0.11.1 发布后正常入口审查"

[B38]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/2813318a7a5b4763e8f6b0a12d8d659cb193a09b/results/bridge-core--normal-entry-acceptance/PREFINAL_CRITIC_HANDOFF.md "0.11.2 candidate prefinal handoff"

[B39]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/27132a4da7a274371c53b61abaef20e0f26b22b1/docs/TODO_PERSISTENT_RUN_PROGRESS_ETA_REPORTING.md "初始 snapshot 已存在的 Persistent 主动进度 TODO"

[B40]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/7f43e146eed50d290ef9cc6ab912d106f754042c/results/bridge-core--product-scope-reset/CANDIDATE_AUDIT.md "0.11.1 closure 当时已存在的 candidate audit/C4 原始证据索引"

[B41]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/511164258101e426da62c96b12e9803e8e7bd8a5/results/bridge-core--execution-context-readiness-convergence/DEVELOPMENT_PROGRESS_CANARY.json "检查器修正前的初始 development canary"

[B42]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/1eb93341db9af42c2ced19a3e0fbb0dfb3bdca51/results/bridge-core--product-scope-reset/v6/391ff88/FORMAL_RELEASE_CLOSURE.json "0.11.0 正式 release 推进与远端读回原始证据"

# 历史回放、可观察指标与 benchmark

历史证据支持把关键运行前提更早交给真实取证，把显性结构缺口交给设计者闭合，把普通实现缺陷留在 Codex。它还证明独立审查能提供重要反例，不能被取消。**主体是结果知情的历史回顾，另补两次新上下文的输入隔离微回放；没有完成整套工作流的严格盲测对照，也没有测得因果收益。** 以下区分已观察事件、反事实机会与仍待检验的推荐。

## 1. 研究范围与读取边界

本轮首先读取强制负面案例说明，验证 pro-a 指定分支写入并回读，再只读历史来源。没有读取本轮 pro-b 或 work 分支、提交、PR 或结果。历史 architecture-workflow、architecture-evolution-system、complex-system-showcase、Delivery Assurance 和 Asteria 来源均属于用户允许的此前工作。

三个证据子任务分别调查 Bridge、Slurm 和跨项目历史；它们属于同一个 pro-a 研究团队，不是本轮另外两项独立方法研究。主研究负责综合与方法推荐。内部并行提高取证覆盖，但不能当成新协议已经取得对照胜利。

| 项目族 | 直接读取的材料 | 主要判别问题 | 专项位置 |
|---|---|---|---|
| Bridge 0.11.x | 初始 proposal、execution、指定提交差异、scope recovery v0.1–v0.8、reset、integrated v3/v4/v6、canary、发布与正常入口复查 | 旧能力缺 caller；runtime前提晚证伪；删机制时丢能力；实际代码回撤 | [Bridge 分析](BRIDGE_KIT_011_FAILURE_ANALYSIS.md) |
| Slurm routing／cancel | routing六版及审查、Goal／Kickoff／result；cancel v0.3、fresh、v2/v2.1、Hook/global/portable v3、真实失败记录与release | 新需求与旧缺口；权限主体；host失败放行；成功早期probe；局部bug | [Slurm 分析](SLURM_ROUTING_AND_CANCEL_FAILURE_ANALYSIS.md) |
| Mica | 真实编辑器调查、冻结前源码、旧Goal、产品重建和R1/R2裁定 | 动态DOM事实；原生行为归因；Codex承担产品机制 | [跨项目分析](CROSS_PROJECT_CASES.md) |
| CAT-TRACE | 主计划、原始数值probe、有限alpha批准、结果、缺口账、数值取证 | 科学参照错误；近似共享盲点；有界研究与可靠性不能混签 | 同上 |
| STAT5060 | 三路代码执行包、共用合同、实现函数、独立验收和修复 | 完整架构仍会编码出错；正向状态不可达；执行许可范围 | 同上 |
| Clear Writing | 原机器评审、原文归因裁定、C6版面复核、最终报告 | 来源错误被误判产品缺陷；语义与视觉owner分开 | 同上 |
| Asteria／DA／showcase | 当前Asteria源码与rc.19结果、历史语义原型、DA完整架构与分阶段草稿、showcase比较与编辑审计 | 结构检查的能力边界；普通入口consumer；共同产品盲区；设计不等已实现 | [Asteria角色](ASTERIA_COMPLETENESS_ROLE.md)、本文件第5节 |

全部来源使用固定 SHA 或固定文献版本。来源清单位于 `evidence/source_manifest_*.json`；GitHub文档中的现场结果标为“原始执行记录可见”，不冒充本轮重新运行。没有复制私有原始日志、全部产品源码或用户会话作为交付。

## 2. 最能区分候选方法的真实链

**Bridge 的第一条强证据是 v0.8。** `35a976e` execution-ready PASS 后，`e0f7a32` 完整实现，`5111642`／`da9f6d2` canary 发现 reader 隔离不能满足，`0120b99` product scope reset。两个提交时间相隔 3 小时16分14秒。它不是用户等待时长，也不是虚构的全部开发耗时。失败在零 reader model turns 时已经出现，因此同一平台探针有较强的前移机会；新协议若仍等完整接线才跑，不能算改进。

**Bridge 的第二条链说明简化也会返工。** reset execution PASS `a9c03b4` 后 `be4a979` 已实施，随后 integrated v3 `894f8bb` 又补生产者、恢复、机器配置和消费者等合同。完整聊天不在资料中，不能把八项都判作原遗漏；但 PASS→实现→重要设计再补是可观察的。早期主动报告无周期 owner 则有原始 TODO 和 scope recovery 明确承认，不能归咎后来新增需求。

**Slurm 中既有失效链，也有成功阻断。** v2.1 execution包通过后按Phase0做真实probe，发现linked worktree的Hook发现路径不一致，并明确产品尚未开始，这是有效信息增量。后来用户明确延后candidate live验证；该授权必须保留。global Hook候选在fake测试和trust记录通过后，真实host中Python缺动态库、exit127、原操作继续，才促成portable runtime与外层阻断机制。这证明多层PASS并不自动连成enforcement证据。

**Slurm routing 是重要负对照。** 六版proposal包含两批新用户需求，不能算六次同一架构失败。实施后R1–R4多为已冻结earliest-uncovered、timezone、DST和真实安装入口要求未正确实现。第三个完整架构师不能保证预知这些未来bug；独立oracle和局部Codex修复更匹配。

这些事实的精确链接、逐回合分类、是否改变核心机制、串行依赖、用户痕迹和代码撤回分别在两份专项报告中。没有把“文档名称叫repair”或“返回Planner”自动计为全局reset。

## 3. 可观察指标与未知量

| 观察 | 证据身份 | 正确解释 |
|---|---|---|
| Bridge至少3条明显实施→重大设计返回 | INFERRED下界，基于实际代码与后续设计 | 不代表每条同因，也不是所有会话总数 |
| Bridge至少4批大规模代码cohort、至少1次明确全局scope reset | OBSERVED代理 | cohort不是Codex启动次数 |
| Bridge reset删除reader相关两模块329＋279行，另撤相关canary／tests | OBSERVED差异 | 可证明具体撤回，不可换算工时或全仓作废比例 |
| Bridge初始方案到0.11.1closure约8天1时56分 | OBSERVED日历跨度 | 不是连续计算时间或用户等待总量 |
| Routing六份架构审查、两份执行审查；后续四份prefinal修复审查 | OBSERVED文档数 | 不等于八次设计失败，也不是质量分 |
| Protected至少两条明确实施后核心返修：old production→v1、globalHook→v3 | INFERRED下界 | schema、QoS fixture和optional field不都算同级reset |
| Mica旧Goal明确由Codex选择核心产品机制 | OBSERVED职责转嫁代理 | 支持D_codex风险，不给出完整临场决定总数 |
| STAT独立验收列出13项问题 | OBSERVED历史记录 | 不等于13次架构返回；具体修复仍在原合同内 |
| CAT alpha 12项诊断9项通过，有限范围停止 | OBSERVED历史记录 | 不得把局部通过签成科学可靠性通过 |
| H_user、真实T_wait、总AI调用、总W_waste比例、模型检出率 | UNKNOWN | Git时间、报告字数和PASS次数不能替代 |

以上数据刻意保留分母缺失。原prompt挑选的负面项目存在选择偏差；不能把这些事件除以项目数得出“Planner–Critic失败率”。相同项目内多条案例高度相关，应按项目／失效机制聚类。

## 4. 候选机制的反事实机会

“可发现”只表示输入中有足够线索或存在区分性实验，不表示模型实测命中。没有任何一项证明“只有某个Critic才可能发现”；设计者也可能自己发现，独立性增加的是不同问题来源。

| 历史问题 | 结构闭合能做什么 | 独立盲区／路线判断 | 真实取证／接手能做什么 | 证据强度 |
|---|---|---|---|---|
| BR-01旧主动报告无caller | 已知能力图应出现空owner／consumer | 从旧TODO恢复整个场景 | 搜索真实caller；冷读无法指定入口即返回 | 强回顾机会；真实命中率未知 |
| BR-02 worktree事务成功被外推排他性 | 拆开事务与quiescence主张 | 质疑“进程扫描等于排他owner” | disposable成功不够；只读原语核查与并发失败实验 | 已有probe正例与外推限制 |
| BR-03 v0.8 reader runtime | 显示关键前提无相称证据，阻整体Freeze | 可能提出薄adapter替代；共享假设仍可能漏 | 同runtime零turn观察即可区分 | 前移probe的最强机会之一 |
| BR-04 reset删旧能力 | capability保护和删除承接可暴露断点 | 原始目标独立核对 | 冷读机器配置与消费者迁移 | 较强，但部分聊天缺失 |
| S-RUNTIME-01 host fail-open | 不能让fake／trust代签真实失败路径 | 能提出需验证问题，不能凭意见证明 | 实际host+无害marker+启动故障，观察原操作未发生 | 最强runtime机会之一 |
| S-AUTH-02同UID确认文件 | 字段齐全仍可能错误 | 权限语义反例具有高信息价值 | 无真实Slurm也可核查可伪造性 | 观察到独立审查实质改变owner |
| S-WORKTREE-03 discovery拓扑 | 标明当前环境证据未取得 | 无需重写所有产品机制 | 早期真实probe已经成功阻止先实施 | 基线有利的实际正例 |
| S-BOUNDARY-05全Bash拒绝 | 可以列无关consumer及故障矩阵 | 必须质疑过宽影响面，不能只验安全 | 同故障下测危险拒绝与无关正常 | 可局部减少blast radius |
| X-CAT-01共享Laplace近似 | 记录参照来源及共享假设 | 独立科学推导有价值 | 解析／数值独立参照揭示偏差 | 历史probe＋本轮有限复算 |
| X-STAT-01未来接线bug | 事前要求成功oracle，不能预言未写代码 | 黑箱验收检查可达状态 | 已出现后直接局部修复 | 防止过度设计的对照 |
| X-CW-01来源矛盾 | 要求source anchor与责任边界 | 无源审查可能误归因 | 实际核源纠正归因 | 审查相关性对照 |

普通CRLF、schema字段、timezone消费等应保持局部修复。真正的新产品选择——例如专用Progress thread、unknown-site portability、用户变更G4验收——保留NEW_REQUIREMENT，不能伪装成新协议本可预知的遗漏。

## 5. Asteria、DA与showcase的特殊意义

Delivery Assurance 的历史用户缺口材料指出，仅命名owner并不能回答具体函数、输入、消费者、普通无Goal入口和失败后谁真正接收。其后[分阶段包](https://github.com/YuukiAS/AI_Research_Toolkit/blob/ae2766a62b1546048ec6122e01ee95f1904fb73c/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/12_STAGED_EXECUTION_REVIEW_PACKAGE.md)明确P0先证明宿主能力，未授权实施，且不能用一个CLI单元替Desktop／Remote代签。这支持有界证据和按依赖推进，也表明很多好规则已有历史来源。本轮没有把DA草稿称为已运行系统。

Asteria rc.19 的实际读取显示：产品有统计语义图与来源表达；仓库桥接仍有固定fixture和明确限制，实时ingestion未完成。它的设计／实现／证据分离有用，但尚不是一个通用架构完整性裁判。把本轮建议当成已上线gate会重复本研究批评的证据错配。[现状与建议区分](ASTERIA_COMPLETENESS_ROLE.md)。

complex-system-showcase 两个候选早期比较得到较好评价，后续编辑审计仍发现共同的强制字段、重复说明和阅读负担。这提供“两个候选仍共享产品盲区”的实例，但没有足够数据估计相关性或证明第二设计无用。结构完整的数据应按用户问题呈现，不能让完整性要求直接膨胀为UI。[比较](https://github.com/YuukiAS/AI_Research_Toolkit/blob/515c66acd5aa0c972ef5b0e97e336894d1932a8c/docs/research/complex-system-showcase-20261026/r2/comparison/COMPARISON.md)、[后续审计](https://github.com/YuukiAS/AI_Research_Toolkit/blob/ce8442b799e0096b79367da701289255bfa23bd3/docs/research/complex-system-showcase-20261026/r2/editorial-audit/EDITORIAL_AND_CURATION_AUDIT.md)。本轮只读其证据报告，没有冒称重新看过所有截图或运行原型。

## 6. 本轮实际做了哪些实验

**CAT数值复算。** 原始历史脚本在本环境缺少 `mpmath`，保留NOT_RUN。另用标准库重写独立计算，在固定合成输入下用解析正控和20,000／40,000区间Simpson积分核对。指定 \(n=100,p=1000\) 的全零积分案例得到加权差异约15.6285578，两档网格结果差约 \(4.5\times10^{-17}\)。这是一个规划反例的有限复核，不是原程序完整复跑，也不是一般数值误差保证或科学模型验证。

**STAT实际函数复核。** 对固定 `f505086...` 源码先校验Git blob，再仅提取 `combine_semantic_states`，使用明确测试替身。P01成功，而P05/P09/P11仍被coverage状态阻断，复现正向路径不可达。没有调用模型、没有生成真实合格M回执、没有启动课程验收。它支持LOCAL_CODEX_FIX归类，不支持推翻整体验收架构。

**方法演示。** 敏感性脚本精确计算假设网格与相同任务集的依赖等待；路由脚本检查已知分类输入能否稳定输出执行者，包括未知门不得放行。二者是规则和算术检查，不是对未来模型智能或效率的实测。

复现命令和结果边界见 [analysis/README.md](analysis/README.md)。这些实验不访问真实Bridge、Slurm或用户浏览器，不产生生产副作用。

## 7. 历史回放资格与泄漏控制

主体研究先读到了后续结果，且用户prompt已提示关键答案，所以24条案例整理都是 **RETROSPECTIVE_ANALYSIS_NOT_BLIND**。不能通过新开同历史上下文的agent消除这种污染，也不能把主研究提出的正确动作计为Freeze前实际捕获。

成稿后另用两个不继承历史对话的新执行者，仅提供Bridge v0.8和Slurm v2的原始cutoff材料。前者独立提出正式reader隔离前提需实测，选择Codex最小实验；后者指出确认权来源与shell伪造的区别未闭合，选择Codex事实核查。预测固定后才由知情父研究核对，未把后续结果回传要求改答案。详细[微回放报告](evidence/CUTOFF_MICRO_REPLAY_REPORT.md)说明输入哈希和限制。两次判断没有完整流程基线、独立评分或真实runtime，只支持“当时材料能引出相关问题”，不提供检出率或效率结论。

机器数据共分为三个详细案例集与一个补充设计案例集，统一索引在 [BENCHMARK_DATA.json](BENCHMARK_DATA.json)。Bridge提供7例，Slurm5例，跨项目9例，Asteria／DA／showcase3例；这24条是不同用途的证据记录，**不是24个独立统计样本或24个已验证盲测题**。

为未来严格回放，另建 [evidence/PRE_CUTOFF_INPUT_INDEX.json](evidence/PRE_CUTOFF_INPUT_INDEX.json)，只列实际读过的精确ref/path和输入资格。完整case JSON包含答案、诊断标题、未来事件和动作标签，绝不能整体送给参试模型。输入包必须重新取得白名单文件，并由隔离执行者只看当时输入；评分端才看后来结果。

有限交叉检查发现并处理了以下风险：

- Mica旧源码可回读，但当前维护的investigation不能证明是当时未泄漏输入，排除该报告；只保留明确快照源码与可证当时材料。
- CAT追加式chronicle与Clear Writing原稿缺失不能组成严格预发现包；继续作为历史归因材料，不纳入盲测命中分母。
- Slurm v2.1同名plan在不同ref含不同内容，必须保留cutoff身份，不能取latest。
- S-RUNTIME的10月13日已知风险额外在原提交 `a92dc472...` 和cutoff `1b8df2c...` 实际回读，blob同为 `ca5a1d57...`。因此“当时已有普通Hook失败风险提示”有了直接快照支持，不仅依赖晚期文件日期。
- S-ROUTING-04、X-STAT-01、X-CAT-02的事后修复动作不能当成cutoff正确动作。结果揭示前评分“是否保留正确范围、设计必要oracle／探针”；揭示后才评分“局部修复还是返回架构”。

输入白名单仍不是全自动运行包：参试提示需移除暗示性案例名，工具权限限制到cutoff，不给later commit搜索权限；若需真实历史runtime而已无法复原，该题只能评估是否提出合适probe，不能给未执行probe虚构成功结果。

## 8. 对新协议的判定

历史回放支持的最强主张是：存在明确且可早取的决定性事实；显性能力链可以先由作者闭合；独立语义审查和真实验收必须保留；把局部bug升级为完整规划会错配信息来源。

尚未得到证明的是：默认一个Pro＋一个Work比两位完整Pro平均更好；整体串行轮数能降多少；结构合同长期净维护成本是多少；第二独立设计和盲区调查的实际边际检出率。它们进入前瞻校准，不能用回顾性的“本来可以”替代实测。

本推荐因此是明确、可推翻的默认政策，不是获证最优算法。若后续Work核对原始证据发现关键反事实不成立，或强化Planner–Critic在同资源下同样早取证且更少人工负担，就应修订相应主张。具体预测和改变推荐的规则见[校准计划](CALIBRATION_PLAN.md)。

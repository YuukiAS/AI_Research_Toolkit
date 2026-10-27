# 跨项目历史回放：结构完整、真实可行和正常使用必须分别证明

本组证据支持把架构冻结拆成明确的知识承诺：结构检查负责已知要求是否被设计覆盖；技术调查和小实验负责关键机制是否成立；独立审查负责设计者没有主动提出的问题；实现验收负责最终代码和成品是否履行承诺。它不支持把所有实施失败都解释成规划失败，也不支持把多轮审查一概视为浪费。Mica 的产品决定确曾被下放给 Codex，CAT-TRACE 的小型数学探针确曾推翻核心近似前提；另一方面，STAT5060 的局部实现缺陷、Clear Writing 的渲染缺陷和评审归因错误，都可以在不重开产品架构的情况下处理。[M2][C1][S1][W1][W2]

## 研究范围与证据强度

本研究只读 GitHub，未修改四个被研究仓库，未读取本轮 pro-b/work 的任何产物。实际固定读取了 Mica、CAT-TRACE、STAT5060 和 AI_Skills_Collection 的提交，读取相应仓库规则；中央 Planner/Critic 合同为 1.7。下述历史结论来自原始设计、执行结果、代码、机器结果和审查记录的对照，不是重新运行完整产品或重新验收课程材料。所有反事实判断均为回溯分析：研究者已经知道后续结果，不能把“有机会提前发现”报告成实测检出率。

额外完成两项低成本检查。第一项重新计算 CAT-TRACE 的全零列积分反例：原始 Python 脚本因当前环境缺少 `mpmath` 未能原样运行；另以 Python 标准库、固定输入、解析正控和两档 Simpson 网格独立复算，结果保存在 [独立复算结果](evidence/cat_zero_probe_recheck.json)。这只核对一个规划反例，不验证 CAT-TRACE 模型、推断软件或一般数值误差界。第二项从冻结源码提取 STAT5060 的结果合并函数，使用明确标注的测试替身复核三条成功路径不可达，结果为 [函数复核结果](evidence/stat_positive_path_recheck.json)；这不是正式模型回执或课程验收。

## 1. Mica：动态界面的现实事实与产品决定外包

### 1.1 已有防护不等于覆盖真实编辑器生命周期

2026-09-03 的调查记录了真实 Edge 使用中的两个症状：发送后残留文本、输入框暂时消失。最初代码把通用 `article` 作为消息候选，且输入框识别仅服务于浮层定位，没有成为长对话优化的硬隔离边界。随后加入保护和编辑静默窗口，但用户新报告仍有输入框消失；该报告同时显示优化次数为零、优化交叠为零、编辑静默计数为零，最长消失约 5746 毫秒。这些观察把调查从“错误应用渲染优化”收敛到“编辑时观察压力以及编辑事件未被识别”。[M1]

实际读取的历史代码 `9522b74...` 仍反复使用 `[contenteditable='true']`；之后的 `63ee889...` 修订扩展了可编辑元素识别与后代事件目标，并在编辑/发送窗口断开全局观察器。当前代码可直接看到 `[contenteditable]`、`isContentEditable` 和观察器断开的实现。因此这个案例同时包含**真实界面变体事实**与**具体实现覆盖缺陷**，不宜一概归为架构重置。[M1]

早期低成本验证应检查的具体断言是：“真实编辑事件是否到达静默防护；防护是否覆盖浏览器合法的可编辑属性取值；输入过程中观察器和几何读取是否仍被触发。”单纯扩大合成循环次数没有新信息，因为合成输入框若仍只使用原先的取值，就会反复验证同一个假设。Asteria 可以要求输入事件来源、触发条件、禁用条件和证据归属；它无法凭字段齐全自动知道平台正在使用哪一种编辑器。更有价值的下一动作是有界真实界面取证和针对性本地回放，而非再请一个完整架构师。

不能把所有输入框重挂载都算作 Mica 缺陷。09-07 调查发现关闭 Mica 时也出现原生连接器输入框重挂载与旧草稿恢复，因而把原生现象和扩展的删除意图保护分开。最终方案把受信任清空意图、出现过零长度、旧文本指纹、无新输入、有限次数与有限时间作为局部防护条件；这是一条可被现有能力边界局部吸收的外部变化。[M1b]

### 1.2 “先实施时再固定产品合同”是可观察的设计债务

10-05 的原始恢复 Goal 指定 `goal_owner: Codex`，随后要求执行者先固定核心用户工作、弹窗信息架构、恢复动作、高亮/导出入口、失败回退、可见操作的承诺等。这些并非语法或模块拆分，而是本次用户禁止 Codex 决定的产品与架构内容。它还要求执行者确定当前 ChatGPT 界面合同。该文件于 10-12 被明确标记为失效，由 Planner 产品系统设计替代。[M2]

10-12 的 R1 处置接受了 11 项 P1：低内存收益可证伪性、完整产品路径、兼容性证据的新鲜度与独立降级、共享回答模型、恢复决策表、验收器自身证据完整性、实际表面审查、真实 PDF 拖选、Notion 目标行为、源码迁移和实施顺序。这里只能确认这些是被接受的合同缺口，不能据此编造 11 次用户追问、11 次架构重置或 11 份作废代码。R2 随后给出规划入场通过，并明确不证明代码、性能或最终产物。用户随后收窄优先级，文件明确不需要第三轮架构审查；这是合理停止的正对照。[M3]

陌生实施者挑战在 10-05 快照就能提出一个可检查的问题：“任务要求我先决定产品结构，我是否拿到了这些决定的唯一权威来源？”它不需要预知后来的 R1 finding。第二完整设计的价值主要在产品结构尚有多种可行路线时；如果唯一缺口是当前平台 DOM 事实，调查现状更直接。边界上应让平台适配器独占选择器与变体识别，让高亮、复制和导出消费同一语义模型；这样外部界面变更不会迫使所有功能同时重做。这是后续设计的方向证据，尚无本研究运行结果证明新设计已经实现长期稳定。[M3]

## 2. CAT-TRACE：数学可行性、代码正确性与采样效率不是同一个问题

### 2.1 全零槽位：两个近似实现一致仍可能一起错误

在探针之前的提交 `560267e...`，主计划明确把一个全零列的 Laplace 积分对数贡献乘以匿名槽位重数，并要求显式与聚合实现一致。聚合在给定列贡献下可以正确，却不保证被聚合的近似本身足够准确。这是结构上完整、数值上未被证明的关键前提。[C1a]

09-15 的独立规划探针保持模型目标不变，检查 \(I_0=E\{\Phi(-\alpha)^n\}\)。当 \(n=1\) 时已有解析结果；取 \(p=1000\)、\(\gamma=3\)，精确 \(\log I_0\) 约为 −0.00299551，局部 Laplace 约为零，乘以 1000 后目标误差约 2.99551。对于 \(n=100\)、\(p=1000\)，积分给出约 −0.01562856，乘重数后的误差约 15.62856。小的单列概率误差会在下游对数目标累积，因此“显式与聚合一致”不足以证明近似可用。[C1b]

本轮标准库复算得到后一误差为 15.628557795647275，20,000 与 40,000 子区间两档积分结果相差约 \(4.5\times10^{-17}\)，并通过 \(n=1\) 解析正控。网格一致不是严格误差证明，价值在于独立计算复现了原历史反例的规模。

对协议的直接含义是：只要一个数值近似的错误会经过重数、长时程或多模块传播成为大范围返工，就应在整体实施前做原语级独立基准。Asteria 可以强迫写出重数、误差预算和消费者，却不能代替数学反例。第二个 Pro 若只是重复采用熟悉的近似，也可能同错；一个几乎不消耗模型调用的解析正控可能更有信息价值。

### 2.2 R6 的有界批准与 Alpha 的失败应分开解释

R6 明确只放行 C00、C01、合成 C02、有限截断 C04 参考引擎，继续保留匿名槽位、正式模拟预注册、真实数据、相关结构等阻塞。Alpha 随后完成数值内核和合成数据合同，但固定四链参考运行在每链保留 40,000 次样本后仍只有 9/12 个诊断目标通过。执行结果遵守预算停止，保留了可用模块，没有声称整个模型成功。[C2a][C2b]

后来审查区分了 Alpha 的 Helmert 先验几何编码错误、非有限值处理错误，以及采样器本身的混合问题。登记表要求修代码，并明确当前不需要改统计模型；新增交错更新则属于计算方案决定，仍由 GPT 负责。这里至少有一条从实现返回计算设计的真实链，但不能把“尚未证明的采样效率在实验后不够好”全部算作本可由文档完整性消除的遗漏。新协议应在冻结时标清：冻结的是要实施和检验的计算算法，性能假设仍由预定实验裁决；若只允许一次端到端成功才叫冻结，科研项目将永远不能开工。[C2c]

责任局部化已经体现出价值：C01/C02 保留，受影响的 C04/C03 后续链停止。未知算法结果不授权 Codex 换先验、换目标、放宽阈值或临时换采样器，也不要求所有已通过模块一并退回设计。

### 2.3 不能用“独立审查”保护错误的缺陷归因

后续 C04 取证发现固定 81 点 Gauss–Hermite 求积未达到冻结的总对数目标误差要求。一个临时检查又怀疑向量化形状错误；专门数值取证实际比较后否定了这个怀疑：本参数化中组内尺度固定，向量化与逐候选计算一致，最大差为零。真正问题是固定先验中心求积的近似精度；两种独立自适应积分在 960/960 个固定案例上相符，81 点与其总目标差仍过大。[C3]

这一段是审查反例和停止条件的正对照：当争议已经变成“这段向量化是否改变数值”时，应执行针对性事实检查，而不是让两个架构师继续争论；得到反证后必须撤销缺陷，不得换一个模糊理由保留 blocker。另一方面，正确实现的 v0.1.2 仍可能未通过固定混合门槛，不能由测试通过推断科学性能。

## 3. STAT5060：不能把局部开发批准改写成整系统保证

### 3.1 代码冻结明确、真实能力尚待验证

10-23 独立审查批准三个既有 Longleaf 工作树并行开发。它明确写明仅批准验证器代码、确定性检查、测试替身、正常入口和消费接线；模型调用、课程修改、教师评分决定、发布均不在批准范围。共享接口、参数、状态、错误和来源资格已经冻结；真实原生模型上下文是否可取得尚未运行验证，并被单列为后续证据。故后来的专业验收尚未通过，不构成这次限定代码批准自动失实。[S1a]

这也说明关键外部前提应阻止哪一种冻结必须写清：它应阻止宣称整条真实模型验收链可用，以及阻止不可逆依赖该链的发布；它不必阻止可独立验证的确定性模块实施。前提是否真正被隔离，要看失败时是否仍能保留已做工作及用户能力，而不能只在文档加一句“后续验证”。

### 3.2 正路径不存在是实现缺陷，不必再设计评分体系

10-25 至 10-26 的独立审查记录 13 项问题，并把环境差异、内容错误、实现缺陷、缺少专业证据分别处理。本研究实际读取 Project 冻结实现 `f505086...` 的 `combine_semantic_states()`：其 `d_ready` 表没有 P05/P09/P11，而通用成功分支又要求除 P03/P07/P08 外的规则必须在该表为真。因此这些本应由确定性结果与语义结果共同满足的规则没有可达成功路径，即使合格语义结果返回通过也会被置为覆盖不完整。这是可直接从控制流验证的实现遗漏。[S1b]

本轮又从原冻结文件提取该函数，给定相同测试替身和已具备的确定性观测：P01 返回成功，P05/P09/P11 均返回覆盖不完整。这是局部控制流复核，未绕过或宣称正式 M 来源资格。它证实具体漏接，不能证明其它规则或课程系统可靠。

同一份报告还发现 Tutorial 对合法零计数的除零路径、HW1 预算及重复派发防护不足、历史摘要入口写死为空、LibreOffice 被标成 Word 原生执行。修复清单明确要求保留冻结来源、规则和判据，回原任务做限定代码修复，不重设三套验证器。这里应路由到 `LOCAL_CODEX_FIX`；除非修复确需改变评分、语义判据或来源资格，才返回设计者。[S1c]

独立验收的价值来自读取原始代码、当前材料和执行结果。14 个验证器、58 条规则、59 个控制、116 个案例是覆盖分母，不是成功分母；报告明确 110 个案例未运行、4 个缺控，未把单元测试通过当成专业接受。历史 B1 的 50 行中有 45 个唯一图像，原始计数 TP2/FN8/FP5/TN35 也不能被当作新版效果。这些是真实可观察的评估事实；本研究没有重新运行 116 个控制或新模型回放。[S1c]

对新协议的启发是：陌生实施者挑战应检查每项强制规则存在成功路径、失败路径和缺证据路径，但最终必须在实现验收核查这些路径确实接通。结构完整性只能证明设计填写了消费者和状态，不能保证程序员没有漏掉三项映射。

## 4. Clear Writing：有价值的质量观察与错误归因可以同时存在

055 的最终独立审查发现一个真实可读性问题：早停条件的自然语言要求连续多轮改善不足，而公式只比较窗口两端累计改善。原始 `TEXT_REVIEW.json` 将其归为插件缺陷并建议改正文或公式。随后独立裁决实际读取源文，发现同一矛盾在源文已存在；该产品的冻结职责是保真改写，无权自行选择其中一个统计定义。因此保留质量观察，撤销产品缺陷归因，改列评估来源缺陷；候选 C6 没有因该问题被改写。[W1]

这里的审查并非全无价值：没有它，含歧义的成品会继续被当成干净正例。但若把观察与责任归因打包成一个 `REVISE`，就会要求写作插件发明科学方法，或者重做正确的产品。Asteria 能检查“保真判断需要源文、消费者实际收到什么”；独立智能审查才能理解两种早停语义的不同。架构冻结应把评审可见输入与它有资格作出的判断绑定，缺源文时不能断言错误由输出新增。

另一条局部修复正对照是同一 C6 的第 6 页表格越界。前置审查确实读取了完整源文、候选和 14 页 PDF，返修只改变任务局部的表格渲染参数，Markdown 和正式插件候选保持不变。第二轮确认整份 PDF 没有新增裁切，允许继续既定评估，不重新打开产品架构。[W2]

不过本组未取得当年的私有源文与全部 PDF 字节，不能独立重做那次保真或视觉判断。可确认的是原始机器评审、精确候选、正式裁决和后续版本边界；这类案例只能作为带证据缺口的历史回溯样本，不可作为严格盲测样本。

## 5. 可观察成本代理及不能得出的结论

| 项目 | 本组实际可确认 | 不应推断 |
|---|---|---|
| Mica | 09-03 同日三次语义相关修订；至少两份真实诊断报告及一次禁用对照被记录；10-05 Goal 被10-12产品系统替代；R1有11项被接受P1、R2停止 | 不能从提交数计算模型调用数、人工小时或作废代码比例；不能断言当前V1已运行成功 |
| CAT-TRACE | 探针前快照与反例原脚本均可读；R6只放行子链；Alpha真实固定实验失败并保留C01/C02；后续数值怀疑被事实检查撤销 | 不能把每个实验失败算作架构错误；不能预测另一个Pro一定发现数学问题；不能把一次成功反例当通用检出率 |
| STAT5060 | 一次明确三路代码开发批准；后续13项独立审查问题；实现源码中可确认不可达成功分支；覆盖分母与未运行状态明确 | 不能把限定开发PASS算整系统假PASS；不能把Windows环境错误等同于Longleaf产品缺陷；不能把缺件等同于文件被删除 |
| Clear Writing | 一次最终付费评审记录、一次来源归因裁决；C6保持；另有只改渲染的局部修复 | 不能把质量观察正确推出插件归因正确；不能声称私有原文或渲染已经被本研究直接复核 |

四类案例共同支持的预测是：在冻结前定位“谁必须作决定、哪个未知事实决定路线、误差在哪里累积、失败影响哪一块”，可以把一部分后期回跳改为前期信息收集，也能把一部分已发生问题留在局部修复。它们尚不能证明新流程降低了多少等待或人工时间。要证明效率，后续需用预先封存的输入、相同完成标准和可观测时间戳进行前瞻性比较；本组的 JSON 只提供回溯问题、知识截点、真实结果和可检验的路由期望。

## 参考证据

- [M1] Mica，09-03调查：[完整原始记录](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/investigations/2026-09-03-composer-lifecycle-regression.md)；[问题发现前代码](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/9522b74c9eccc8a4ded557e6fae9acb92e1db352/extension/src/content.ts)；[修订提交](https://github.com/YuukiAS/Mica-for-ChatGPT/commit/63ee889ebf90e3636176fdc3945f48d2d56acf6a)。
- [M1b] Mica，[原生重挂载与删除恢复调查](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/investigations/2026-09-07-stale-composer-clear-recovery.md)。
- [M2] Mica，[10-05原始Goal](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/2a33a57ca7e65c3dd72a741e861c7bf39dcab71c/docs/tasks/2026-10-05-mica-product-recovery-current-gpt-ui.md)；[失效标记提交](https://github.com/YuukiAS/Mica-for-ChatGPT/commit/977ba28f4ef4998367faf1e3c5f3ecb23723e6cd)。
- [M3] Mica，[R1处置](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/reviews/2026-10-12-mica-product-system-critic-r1-disposition.md)；[R2结论及收窄优先级](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/reviews/2026-10-12-mica-product-system-critic-r2-verdict.md)；[产品系统](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/product/MICA_PRODUCT_SYSTEM_V1.md)。
- [C1a] CAT-TRACE，[探针前主计划](https://github.com/YuukiAS/CAT-TRACE/blob/560267ecd818197c448b24cf7673dfc8dafae911/docs/model/catalog_aware/CAT_TRACE_CODE_IMPLEMENTATION_MASTER_PLAN_20260909.md)。
- [C1b] CAT-TRACE，[全零积分发现](https://github.com/YuukiAS/CAT-TRACE/blob/d05aa16b8f28d911207035c94752de3ee9ae683d/docs/implementation/probes/ZERO_SLOT_LAPLACE_FINDING.md)；[原始探针脚本](https://github.com/YuukiAS/CAT-TRACE/blob/d05aa16b8f28d911207035c94752de3ee9ae683d/docs/implementation/probes/zero_slot_laplace_probe.py)。
- [C2a] CAT-TRACE，[R6限定批准](https://github.com/YuukiAS/CAT-TRACE/blob/99ba6bd1f4ef96078ba3e0ebc8b49670650edaa0/docs/implementation/reviews/CRITIC_REVIEW_R6_RESOLUTION.md)。
- [C2b] CAT-TRACE，[Alpha原执行结果](https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/results/017_cat_trace_implementation_alpha/result.md)。
- [C2c] CAT-TRACE，[Beta缺口与归因登记](https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/07_DECISION_AND_GAP_LEDGER.md)。
- [C3] CAT-TRACE，[数值取证原结果](https://github.com/YuukiAS/CAT-TRACE/blob/ba0a1efbfc2558d7cb6eb05126ecd52f2fd571b9/results/c04-ref--alpha-integral-numerical-forensics/result.md)；[完整演进与错误怀疑撤销](https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/C04_REF_RELIABILITY_INVESTIGATION_CHRONICLE_20260923.md)。
- [S1a] STAT5060，[代码范围执行前审查](https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-system-architecture-research-20261022/execution-package-v1/CRITIC_FINAL_PARALLEL_EXECUTION_REVIEW_V1.md)；[当时共享合同](https://github.com/YuukiAS/STAT5060-TA/blob/435cd51f994df593d384972fe0c5f548bbe18b8d/results/validator-system-architecture-research-20261022/execution-package-v1/COMMON_CONTRACT.md)。
- [S1b] STAT5060，[被审实现](https://github.com/YuukiAS/STAT5060-TA/blob/f5050863e19ab99b5d2e26e46d8fe321007d901e/scripts/final_project/validate_release_v3.py)；[限定修复](https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-system-architecture-research-20261022/independent-acceptance-v1/REPAIR_PROJECT_V1.md)。
- [S1c] STAT5060，[独立完整审查报告](https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-system-architecture-research-20261022/independent-acceptance-v1/STAT5060_VALIDATOR_INDEPENDENT_ACCEPTANCE_REPORT_V1.md)。
- [W1] Clear Writing，[原始机器评审](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/055_clear_writing_release_convergence/text_review/TEXT_REVIEW.json)；[来源归因裁决](https://github.com/YuukiAS/AI_Skills_Collection/blob/df9186a949dc36f09bcefcc78b93c830d845adb4/results/055_clear_writing_release_convergence/FINAL_TERRA_B001_CRITIC_ADJUDICATION.md)。
- [W2] Clear Writing，[局部渲染修复复审](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/055_clear_writing_release_convergence/PREFINAL_CRITIC_REVIEW_C6_R2.md)；[保留候选的最终收口记录](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/055_clear_writing_release_convergence/FINAL_REPORT.md)。

# CARE完整模型谱系盘点与遗漏事故补查

2026-10-13。主线证据固定 `main@75a40e454de43b64e59a0b0b438ff57ef2bb8345`，复杂多角色实现另查 `develop@184cc16bc00dbb4edce80e2c848bdaabae4f782e`。这里继续上一版40项，不从头归零，也不把同一实验拆成若干编号冒称独立事故。

## 1. 先把型号、配方、阶段分开，防止再次漏整条中间路线

**SRR的M0–M9、MoSAIC配方对照的M0–M10、后来四模型竞速的M0–M3不是同一组模型。Route B的B0–B6也不是后来的生产Batch0–7。** 之前按少数名称概括，漏掉了大量中间改造与再次缩水。

下表是本次已定位的模型/阶段分母。它覆盖已读取主线谱系、蓝图目录、原始结果和develop复盘；“已定位”不冒称该模型所有旧提交/私有附件都逐个重新运行。局部来源不足处明确标出，不用另一个模型的事故充数。

| 家族/阶段 | 已确认来源与事实 | 当前能作的归因，不能越界的结论 |
|---|---|---|
| nnU-Net fold0–4基础模型与部署组合 | [总谱系][S01]、[部署/重放历史][S12] | 有真实强基线、检查点和预测；后续部署重放不一致/单层输入崩溃属于推理与交付，不把基线全部说成假模型 |
| MLoRA | 总谱系单独列出基线复现 | 当前只绑定到基线族索引；本轮没有足够原始运行证据指控特定缩水，保留待补，不与其它基线合并定罪 |
| FSCF | 总谱系单独列出基线复现 | 同上；权重/包装/几何问题应逐模型核对，不能从索引一句概括推所有错误 |
| MyoPS-Net早期复现 | 总谱系及四lane修订[S10] | 缺模态混合人群/CARE包装、切片到全体积和正式评价缺口，不能以旧简化复现否定原论文 |
| U-MyoPS | [prompt6原始说明][S14] | 最强LGE-only/no-prior路线是诊断/瘢痕专门路线；去掉Stage1对齐或使用nnU-Net回退不能叫完整论文复现 |
| CineMyoPS基础/时序/keyframe路线 | [Cine专项报告][S15] | 时序对照有真实结果，但无scar head的模型不能用于断言scar无信号；局部proxy结果不等正式时间建模收益 |
| MoSAIC clean OOF与full-data recipe M0–M10 | [配方分解原文][S16]、总谱系 | M0/M1干净折外结果与M2–M10训练命名空间配方分解分开；不能拿full-data诊断当公平泛化分数 |
| 早期SRR共享/私有、SRR Lite、v2/v2.5/v3 | 前版C01–C05、[早期修复任务][S17] | 单层输入代完整encoder/decoder、私有输入被融合、多尺度/细化削弱；实际类名不等结构忠实 |
| SRR M0–M7对照/渐进版本 | 总谱系、M8/M9原始历史 | 已定位代际但逐个旧run未全部重建；不能把M8实错反向赋给每一个M0–M7 |
| SRR M8 | 前版C06–C11及M8原审计 | 固定原型/非闭环记忆、anchor主导、参数未传、检查点选择标准漂移 |
| SRR M9 | 前版C12–C19及M9原审计 | alias loss、零占位、因果/消融表名与真实操作不符、证据载体遗漏 |
| M10 D2/D3 cross-fitted memory | 前版C20、[代码成熟度矩阵][S02] | 有类和检索接口不代表query进入最终proposal/loss；缓存指标复制不能算fresh评价 |
| Route A、B Round03/04、C | 前版C21–C25及本页RB04组 | 真实训练/身份控制存在但目标能力没被证明；B阶段间重新初始化、随机体素训练和公式指标尤其关键 |
| 生产Batch0、1 | [逐Batch历史恢复表][S03] | 原恢复表自身仍写PARTIAL_GROUPED_HISTORY，只有冒烟/anchor/prototype可行性，不足以还原两个独立完整实验 |
| 生产Batch2、3 | 同表[S03] | anchor-bound和控制语义曾混杂；同输入控制不能识别prototype贡献，不升级为完整机制成立 |
| 生产Batch4、5、6 | 同表及LINEAGE | 组件逐渐增加但最终输出权限/独立收益不足；Batch6 formal300失败后跳过900有既定条件，停止不自动等于偷懒 |
| 生产Batch7完整SRR与mechanism-closure repair | [原Controller明确事故][S04] | 真实300步后仍复制同组指标到多个干预模式，空proposal/refiner指标未被validator拒绝，named memory与anchor-free discovery不忠实 |
| Batch8 MMRD设计、Batch9 direct/teacher/control/distill | [Batch10原始审计][S05] | 成熟主干/解码能力、可靠标签、空间增强、推理和评价链需整体一致；模型负收益与实现不忠实分开 |
| Batch10 deadline rescue/有限ensemble | 同原审计[S05] | 是修公平评价/推理/配方的救援任务，不是可以随意新增第11模型；用户停止的Wave6不得自动恢复 |
| CARE-SRR-Cascade / SCR | [运行阻塞与修复原文][S18]、总谱系 | 有界微小修正、prototype控制未隔离不能证明独立检索收益；既定回退可合法但不能夸大新能力 |
| CARE-SER / SER-Lite / target-domain scar-first | [SER目标域任务][S19] | complete80和all220目标人群不同；协议明确允许特定scar混合方案时不能把混合一律说成违规；仍需真机制消费而非两行CSV |
| CARE-DG | [W2修复原文][S06] | 损伤区语义改成纯水肿、FP梯度方向错、门控幅度补偿、无效remote penalty、未提交正式入口等实际缺陷 |
| CARE-DPR / Gate A、A-R1、A-R2 / B-R1、B-R2 | [执行前架构修订][S07]、wiki历史 | 不能只给DG加refiner；候选饥饿、全体积组件/ROI和utility动作需要明确。部分是实施前设计缺口，不冒称全已发生 |
| CARE-ARC | [PRISM前置历史与wiki][S12]、[ARC专项][S20] | W3真实负结果不能当忠实ARC否定：router、anatomy、coarse proposal、同折初始化未全闭环 |
| CARE-PRISM / v2 / backbone与W1 repair | [逐模块修复原文][S08] | 深尺度算而不用、1×1伪decoder、synthetic-only、placeholder loss、全零negative标签、装饰burden等；后续6500步真实运行与早期缺陷分别保留 |
| CARE-MyoPath-PR A0/A1/A2/A3 | [原任务边界][S09]及QIF背景[S11] | 是获准的四步前置可行性试验，不是批准完整Proposal–Refinement；真实负结果不能自动当“缺refiner即缩水” |
| CARE-MyoWall-IF C0/W1/W2/W3设计 | wiki几何结果[S12] | 几何前置真实失败、正式8000步未启动是合同允许停止；不为凑降级数把科学不适用写成代码故障 |
| CARE-QIF v2强度/组件query | [正式Controller结果][S13] | 两个前置事实失败后NO_GO，未训练完整QIF有明确授权边界；可以反驳不成立的科学方向，不应靠无限长训掩盖 |
| 四lane M0→M0R、M1 MYOPSNET-L-CARE、M2 I-MMSEG-CARE、M3 CARE-TDS | [原缺口修订][S10]、[最终科学纠偏][S21] | M0优化器/学习率/选择合同不忠实；M1/M3实现不完整；M2缺资产不等方法失败；M0R inner被预训练暴露污染，后续撤销候选 |
| ASE R1与R2 v4/v5/v7/v8/v9 | 前版C26–C40及R2修订链 | 阶段/冻结/损失/采样/标签/续训不忠实；有效amendment可合法改要求，不按最旧合同误判 |
| ASE-faithful / Agent-Flow v3 develop反复修复 | [原reentry008/009][S22,S23]、[Bridge实证复盘][S24] | 即使严格多角色仍有有效样本分母错误、Verifier漏检、验收越权和哈希重绑定循环；后来有限实现忠实闭环不等正式模型效果已好 |
| ASE后续层级病理救援与Docker runtime-only热修 | 蓝图目录、wiki[S12] | 后续科学方案与部署热修不能混成R1；合法单层输入修复保持模型/15例正常结果不变，是可复用轻量正例 |

**当前完整性的边界**：上述不是把“还有中间模型”忽略了；已逐族列出并连接证据。但MLoRA/FSCF单独复现日志、早期M0–M7和Batch0–6精确逐次运行、全部私有附件没有穷尽。已有历史恢复表自己也没补齐这些，不能复制它的空格再说已全部找到。后续补证应追指定资产，而不是再研究一个新架构名字。

## 2. 新增事故与因果控制：原40项之外，不再只举12步

下列编号表示不同失效性质，不表示相同数量独立实验。每项列出的检查是**需要在正常入口实现的反证方案**，不是本轮已经部署的门槛。原40项继续见[原账本](../07_CARE_AND_EXECUTABLE_REVIEW_V0_4/CARE_FAILURE_LEDGER.md)。

| 编号/来源 | 实际失效或明确设计缺口 | 旧检查为何失明 | 真正的观察/拒绝条件 |
|---|---|---|---|
| RB04-01 [S02] | B4只查B3完成令牌，重新创建模型 | 阶段状态继承替代权重继承 | 正式B4入口输入上一checkpoint；起始参数/optimizer与批准接续语义核对，随机新模型不能过 |
| RB04-02 [S02] | B5只查B4回执又重新初始化 | 有reload文件不等本阶段真的load | 捕获实际加载来源和起始状态，正常resume应连续，刻意fresh应失败 |
| RB04-03 [S02,S25] | B6只查B5令牌/文件后fresh模型 | 先前阶段完成没有进入下游 | 从正式B6追模型构建/load链；不靠字符串“继承” |
| RB04-04 [S25] | train_joint固定一次随机小张量/几何标签训练 | 步数和秒数达标掩盖真实病例根本未读 | 实际loader的病例/体积/目标进入forward；随机诊断仅记诊断，不可给正式训练credit |
| RB04-05 [S25] | validation_events只在循环计数，不执行验证 | 事件计数被当真实评价发生 | 每次必需验证关联真正预测/输入/独立测量，只有counter变化不通过 |
| RB04-06 [S02] | B4 AUC写死0.72/0.70 | 表格/范围检查未看真实预测 | 由原始得分/真值独立重算，完美/全错输入必须能改变结果 |
| RB04-07 [S02] | B5 Dice写死0.74/0.71 | 准确率字段非空当数据 | 同上，不能只因值在0–1就合格 |
| RB04-08 [S25] | B6逐病例Dice由idx和阳性flag公式生成 | 指标对模型、预测和GT无依赖 | 本轮纯函数反例已复现：完美/全空预测都0.435，换同一病例位置变0.445；只说明这个函数，不冒称完整训练重跑 |
| B7-01 [S04] | 所有intervention复制同组formal指标 | 模式名不同/CSV存在当真干预 | 同候选独立运行各模式，关联实际prediction roots；合法identity对照允许相等，不能盲目强迫所有标签必须不同 |
| B7-02 [S04] | proposal/refiner指标为空仍未阻断 | 顶层formal300真实掩盖组件证据缺失 | 每个被声称机制有相应实测，空缺保持未证；不靠补几行占位 |
| B7-03 [S04] | named negative memory不忠实category bank | 名称/count不能证明真正负空间来源 | 类别tensor/病例/有效mask来自真正数据，当前模型确实消费；缺类不复制其它类伪补 |
| B7-04 [S04] | anchor-free discovery仍读anchor context | “无anchor”标签与消费者不符 | 正式discovery单独干预context；独立支路应满足原不变性，confirmation应实际消费context |
| MM-01 [S05] | patch训练却用单次full-volume forward正式评价 | 都是同模型forward，忽略归一化/上下文 | 按批准推理法真实滑窗/融合；不要求不同感受野数值强行相同 |
| MM-02 [S05] | 仅zoom数组再复制GT几何 | shape/header看似对齐掩盖crop/transpose逆变换 | 从真实预处理properties还原空间，已知错crop/方向的例子必须失败 |
| MM-03 [S05] | evaluator用默认构造器加载而不是checkpoint plans | 权重能load不等模型和预处理语义一致 | 从冻结配置重建，检查参数及输入规范；不忽略不匹配key |
| MM-04 [S05] | 架构plans与实际预处理data identifier不一致 | 两份配置分别存在即可 | 读实际loader根、fingerprint与模型plans，沿消费链核对 |
| MM-05 [S05] | student空间增强没同步teacher却做逐体素蒸馏 | 张量尺寸相同掩盖空间对应丢失 | 固定landmark/标签变换，对两视图真实坐标同位验证；强度增强可合法独立 |
| MM-06 [S05] | 任意类别最大置信代病灶特异置信 | 背景confidence高被当scar/edema可靠 | 对GT阳性位置按病种检查精度/覆盖，不用背景最大概率 |
| MM-07 [S05] | 均匀抽病例代先中心后病例均衡 | case_count足够不等群体权重正确 | 正式sampler输出序列与当前目标人群配比对账 |
| MM-08 [S05] | case_metadata导入依赖本机未提交文件 | 当前主机能跑被当干净检出可复现 | 用固定干净源码导入/启动最小路径；不因远程文件恰好存在通过 |
| DG-01 [S06] | 损伤区scar∪edema改成exclusive class4 | 标签数/输出shape没检查科学定义 | 对原标签集合独立生成zone和pure edema，逐值/组合验证 |
| DG-02 [S06] | FP margin与FN同向，提高了假阳性病理分数 | loss下降/梯度非零不证明方向正确 | 极小已知FP/FN例子独立检查梯度方向，正式loss消费者一致 |
| DG-03 [S06] | 无界magnitude补偿近零gate | gate看似小但delta仍大，解释失效 | 检查门控与幅度实际耦合及训练侧边界；原义务要求q=0则delta=0 |
| DG-04 [S06] | scar竞争忽略edema但loss包含edema | 单组件公式合理、跨组件语义不一致 | 原edema体素转scar的真实前向/损失/解码同定义测试 |
| DG-05 [S06] | 部分标签病例全局六类CE | 缺标签被当负类学习 | 原可靠标签mask在归约前生效，无监督行不改变该项目标 |
| DG-06 [S06] | remote penalty检查已乘support的delta | 数学构造让惩罚恒零 | 在support外注入raw correction；检查器必须观察pre-support量 |
| DG-07 [S06] | runner/eval/validator有hash但原提交看不到源码 | 回执承诺代真实可审执行版本 | 必需代码在实际执行快照中存在且内容匹配；没有源码不接受严格验收宣称 |
| DG-08 [S06] | probability/logit及缺支持图默认值语义不明 | 能跑/shape对就是默认合法 | 正式输入类型与缺失策略明确，缺真实必需图不自动零/一补成支持 |
| DG-09 [S06] | 正式sampler未可审、最终Cine资产缺失 | MyoPS路径成功掩盖完整交付对象缺件 | 真实采样配额及本轮最终包两任务资产逐一核对；不扩张未授权Cine训练 |
| PR-01 [S08] | 只搜ResEnc资产导致有合法stock资产仍停工 | 技术名被误当科学目标 | Planner依据原目标裁决等价实际主干；不能未经批准随机新训绕缺资产 |
| PR-02 [S08] | 四尺度计算，最终只用level0 | 输出字典里有tensor当使用 | 正式decoder逐尺度消费者/梯度与独立干预，不能只导出中间张量 |
| PR-03 [S08] | anatomy decoder只是逐尺度1×1 | 类名代结构和深层上下文 | 实际top-down融合与解剖到病理单向梯度边界验证 |
| PR-04 [S08] | correspondence flag读后丢弃 | flag=true被当启用 | 默认合法identity_disabled如实写；未实现不能声称该能力 |
| PR-05 [S08] | dataset只有synthetic，正式训练/评价入口缺失 | 本地fixture通过被升级真实preflight | 真Dataset501病例与正式runner才能产生对应credit |
| PR-06 [S08] | surface/MIL占位损失 | 目标名和有限数值掩盖数学替换 | 从原定义独立复算数值/梯度；L1不能只改名字算surface |
| PR-07 [S08] | 四类negative target全零 | 通道数对但负空间语义消失 | 真负空间mask、病种资格及对应loss逐一消费 |
| PR-08 [S08] | burden只辅助输出不调制最终路径 | 辅助head有梯度被说成最终机制 | 依据原要求检查对proposal/refiner的真实条件化；合法取消必须修改方法声明 |
| RACE-01 [S10] | M0用stock SGD高LR/短Poly，非批准AdamW分组warmup/cosine | 完成4000步及outer评价不能补训练配方不忠实 | 第一步与阶段边界实际optimizer/LR/选择过程对原合同核查 |
| RACE-02 [S10] | 没有500步周期full-volume inner选择 | stock best字段代本轮选择协议 | 真实checkpoint候选×inner评价记录，不从最终选中名字推过程 |
| RACE-03 [S21] | M0R inner病例被初始化checkpoint先前训练见过 | 当前fine-tune split不交叉掩盖祖先权重暴露 | split审计沿模型初始化谱系追数据暴露，不能只查本轮case列表 |
| RACE-04 [S21] | M1硬argmax解剖mask且缺官方融合/监督等完整机制 | 引入上游若干块即称论文复现 | 原论文方法→真实调用链逐项忠实；简化负结果不能否定论文 |
| RACE-05 [S21] | M3冻stock加浅BCE头、缺丰富loss与困难负样本 | 有独立heads就称完整专门模型 | 方法约定和真实训练目标/来源消费核查，不能靠Head类数量 |
| FLOW-01 [S24] | Verifier新增不同感受野logits必须1e-6一致的要求 | 验收者拥有阈值定义权，过严也能错误阻断 | 每项阻塞引用有效要求，原源不支持则诊断；领域Planner裁决而非用户调阈值 |
| FLOW-02 [S24] | worktree快进就把Verifier标冻结 | Git movement被当角色已产生新证据 | 阶段转移消费真实角色产物与成功观察，不用提交变化推断完成 |
| FLOW-03 [S24] | 回执/合并/状态提交不断改变review target | 元数据身份过度绑定导致重型重验循环 | 同一语义源使用稳定身份；文档/回执修复只做轻量检查 |
| FLOW-04 [S22] | no-T2零mask行仍进入Dice均值分母 | 无梯度/类排除通过，却改变有效人群loss权重 | 独立参考：追加不合格行不改变合格行loss；空病灶但合格的行仍正确保留 |
| FLOW-05 [S22] | T2/noT2两组scalar固定1:1平均 | 两组都存在的基本测试没覆盖1+3非等组 | 从原归一化定义独立计算不等组batch，不能复制实现helper |
| FLOW-06 [S22] | Verifier只测类mask/梯度，不测上述loss归约 | 已有“语义oracle”仍漏同义务另一性质 | 修Verifier的独立归约参考和对应坏实现；并校准好实现不误拒 |
| FLOW-07 [S22,S23] | 两份语义源清单覆盖不同 | 看似有digest，关键sampler/augmentation不进入失效依据 | 单一权威语义源闭包；不再堆第二层回执hash |
| FLOW-08 [S24] | provenance/环境问题被推成用户科学决策 | “失败即人工gate”增加心力 | 控制/工具修复回对应owner；只有Planner判真正取舍才问用户 |
| DEPLOY-01 [S12] | 新鲜nnU-Net重放与历史包数组不一致但几何全同 | 几何/文件齐全不证明历史成绩属于当前包 | 实际同渠道预测/配置与目标来源核对；允许正确区分数值非确定性和来源错误 |
| DEPLOY-02 [S12] | 合法单层输入被resampling算成零维导致整批失败 | 常规15例通过未覆盖合法几何边界 | 固定权重/入口的depth1/depth2边界＋正常15例不变回归；不为runtime热修重开模型科学设计 |
| META-01 [S03,S26] | 历史恢复表多个Batch仍共享结果/未重建却易被当完整谱系 | 审计材料自己也会以行数冒充实证 | 核对逐run来源/分母，未恢复明确标缺口，不把本表数量算全历史已审 |

## 3. 这次不是纸面例子：B6指标依赖反证已执行

本轮在当前隔离容器执行冻结历史`casewise_rows`的纯函数转录，不运行CARE整包、不训练、不读医学数据。相同病例标志下，给完美预测和全空预测，两者返回的scar分数都为0.435；独立Dice参考分别为1和0。仅把同一个病例放到列表第二位，旧函数分数变0.445。

这证明该函数产生的是**由病例序号决定的代理数值，不是预测指标**。源代码自己标明proxy/not_hosted，因此不指控它伪造官方成绩；问题是不能用这种代理数据完成原本要求真实逐病例评价的任务。脚本与实际JSON见[本轮探针](probes/route_b_metric_dependency.py)和[结果](probes/route_b_metric_dependency.result.json)。

此例推翻只查“步数/秒数/44行CSV/能重载模型”的方案。真正防线是正式评价必须消费当前真实预测与独立GT/参考，而不是再追加一个`metrics_are_real=true`字段。它对软件同样适用：既有健康卡片或HTTP200不能替代真实提供方→业务→用户操作的因果链。

## 4. 为什么一轮轮Planner/Critic通过仍返修

原始证据支持四种不同原因，不能统一归“模型不听话”：

1. **合同本身留下科学/产品歧义**，如推理上下文、部分标签资格、目标人群。需要前置领域判断，但不能自动要求用户再写更详尽清单。
2. **实现没有照有效合同接线**，如深尺度/参数/数据不消费。必须在实现形成后、重大成本投入前检查真实消费者；再审一次空方案发现不了这些。
3. **验收器实现有洞或越权**，既能固定输出假绿，也能用无依据阈值误杀。必须校准正/坏/缺测、独立reference和义务来源；不是冻结任何validator都可信。
4. **协调身份过重且错误失效**，回执和提交变化触发全量重跑、元数据问题反复送用户。应使用现有稳定语义身份、失败分类和有界恢复，不能重抄CARE几百提交的控制层。

## 5. 来源索引与未完成的穷尽范围

以下都是已读取内容的固定来源；对找不到的原附件不伪造引用。v4目录列表曾显示两个ARC明细文件，但按固定ref与blob读取返回404，因此只采用可读取的ARC专项报告和明确修复原文，不拿目录存在证明明细已读。

[S01]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/20260730_care_failure_forensics_deep_research_packet/model_lineage.csv
[S02]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/srr_production/code_maturity/anchor_prototype_loss_checkpoint_matrix.csv
[S03]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/20260730_care_failure_forensics_deep_research_packet/v4_batch_history_recovery.csv
[S04]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/tasks/20260721_srr_batch7_mechanism_closure_repair_controller.md
[S05]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/srr_production/code_maturity/batch10_deadline_rescue_planner_decision_20260724.md
[S06]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/tasks/20260727_care_dg_w2_fold0_critic_repair_amendment.md
[S07]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/tasks/20260728_care_dpr_preexecution_architecture_amendment.md
[S08]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/tasks/20260729_care_prism_v2_backbone_and_w1_repair_amendment.md
[S09]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/tasks/20260731_care_myopath_pr_a0_a3_controller.md
[S10]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/blueprints/CARE_target_domain_race_gap_closure_20260801.md
[S11]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/blueprints/CARE_QIF_v2_signal_audit_20260731.md
[S12]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/wiki/README.md
[S13]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/20260731_care_qif_v2_signal_audit/controller_report.md
[S14]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/Baseline/U-MyoPS/prompt6_missing_modality_scar_calibration.md
[S15]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/20260730_care_failure_forensics_deep_research_packet/cine_forensics_report.md
[S16]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/20260730_care_failure_forensics_deep_research_packet/mosaic_gap_forensics_report.md
[S17]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/tasks/20260629_srr_v2.md
[S18]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/srr_production/code_maturity/scr_r1_runtime_block_critic_and_repair_20260725.md
[S19]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/tasks/20260727_care_ser_lite_target_domain_codex_goal.md
[S20]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/20260730_care_failure_forensics_deep_research_packet/arc_forensics_report.md
[S21]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/20260801_care_four_lane_evidence_reconciliation/four_lane_scientific_interpretation.md
[S22]: https://github.com/YuukiAS/CARE_Challenge/blob/184cc16bc00dbb4edce80e2c848bdaabae4f782e/results/agent_flow_v3/care-ase-faithful/planner_reviews/round_001_reentry_008.json
[S23]: https://github.com/YuukiAS/CARE_Challenge/blob/184cc16bc00dbb4edce80e2c848bdaabae4f782e/results/agent_flow_v3/care-ase-faithful/planner_reviews/round_001_reentry_009.json
[S24]: https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/2d02deed9d7d570fea5c62b08126a405cc54196c/docs/CARE_AGENT_FLOW_V3_POSTMORTEM_20260811.md
[S25]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/scripts/training/route_B_round04/myops/B6/run_B6_joint.py
[S26]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/20260730_care_failure_forensics_deep_research_packet/v4_v3_scientific_gap_audit.md

**验收状态：** 本页扩展了原来遗漏的大量模型与明确机制，证明了B6局部公式指标无真实预测依赖；没有运行新研工台的独立模型审查、全体GPU复验或部署，因此不宣称全部已挡住复发。防线的接入/校准与正常任务净收益仍须真实验证；未获取的历史范围已具体列出，不用“40项/246项”掩盖分母。

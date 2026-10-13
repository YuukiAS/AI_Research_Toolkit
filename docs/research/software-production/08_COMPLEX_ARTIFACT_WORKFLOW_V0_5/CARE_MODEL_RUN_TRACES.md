# CARE多模型落地演练：如何在训练前或早期拦住缩水、假指标和错误验收

2026-10-13，依据CARE_Challenge历史main@75a40e454de43b64e59a0b0b438ff57ef2bb8345、原v0.4四十项事故、v0.5模型谱系、真实源代码和修订任务。**这是用已发生事故检验候选工作流的设计演练，不是新流程已经在Longleaf重放通过。** 不修改CARE、不运行GPU/Slurm、不混合已失效版本的结论。

四条共通区别：**代码已经跑≠原方案真正实现；损失有梯度≠数学语义正确；模型做了预测≠评价可信；科学试验按批准的停止条件失败≠执行者偷懒。** 新入口必须同时识别这四种情况，否则会把CARE带回反复昂贵返修。

## 1. Route B Round04：B4/B5/B6，每阶段令牌齐但没有接续

[原B6源码](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/scripts/training/route_B_round04/myops/B6/run_B6_joint.py)直接包含下列真实行为：

- 先查B5完成令牌、selected_checkpoint_reload.json及B0 baseline回执；
- 随后却执行 RouteBRound03MyoPS().to(device)，而不是载入本次B5所选权重；
- train_joint在函数开始创建固定 torch.randn(2,3,8,16,16) 与手工几何病灶label，循环数千步在这同一组人工张量上优化；
- validation_events按训练步数周期仅加一，不执行一次真实病例完整验证；
- casewise_rows只用idx、scar_positive、t2_edema_positive生成所谓逐病例本地代理Dice，甚至不接收预测和GT。其字段明确标注为local_same_split_proxy_not_hosted，**不能错误地指控它已声称官方成绩**。

~~~mermaid
flowchart TD
 B3["B3 选定检查点"] --> B4["历史B4读取令牌但新建模型"]
 B4 --> B5["历史B5读取令牌但新建模型"]
 B5 --> B6["历史B6读取令牌但新建模型"]
 B6 --> X["固定随机体积和几何标签训练"]
 X --> C["验证事件只计数"]
 C --> D["Dice由病例索引/标志生成"]
 D --> F["文件、时长和部分自检可绿，但未证明真实44例预测"]
 
 G0["新入口：阶段依赖的权重/优化状态有效继承"] -.-> B4
 G1["新入口：真实loader实际进入正式优化步骤"] -.-> X
 G2["新入口：每次验证连到原始预测/GT和独立评价"] -.-> C
 G3["新入口：输出指标须随预测/GT改变"] -.-> D
~~~

**改进后怎样操作：**

1. T0：Planner冻结这一阶段到底应继承哪些权重、优化器和数据，哪些允许初始化新头；不能“只要有B3令牌”就宣称继承模型。只有需要的科学分组/控制路径才要求严格连续优化器；新头的合法fresh初始化不能被错杀。
2. T1：独立验收职责从真实数据契约和Dice定义制定两个便宜的反例：删除上游checkpoint仍能跑则不合格；把相同病例的预测从完美变为空仍产生相同Dice则不合格。必要时只做CPU级最小样本，无须先等8000步。
3. T2：Executor第一次接好B4→B5→B6纵向路径时，实际observer读取加载的checkpoint哈希和起始参数；输入必须是按批准split的真实dataset loader，不是只在文件里登记病例ID。
4. T3：检查真正优化样本数与训练步数的联系，validation_events只属于诊断计数；正式检查必须生成同一checkpoint的逐病例预测并通过独立评价器。源代码已存在可用的正式 evaluate_predictions.py，应优先接入。
5. T4：只有前述都真实有效才允许昂贵训练。长训后若性能差，才有资格讨论科学负结果；缺权重接续/真实样本时先修实现，不启动另一轮科研方案。

**这次已有一项真实局部证明**：研究分支probes/route_b_metric_dependency.py运行历史casewise_rows纯函数，完美和全空预测都得到0.435，真实Dice分别1和0；同一病例变换排列位置会得0.445。它只反证这个函数，不是CARE整链已通过新准入。

## 2. SRR/M8/M9/Batch7：有记忆、检索、消融和损失名字，但可能不影响最终产物

来源：[可用性/损失/权重实情矩阵](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/srr_production/code_maturity/anchor_prototype_loss_checkpoint_matrix.csv)、[Batch7 Controller原修复任务](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/tasks/20260721_srr_batch7_mechanism_closure_repair_controller.md)。目前真实SRR有从训练特征建立prototype bank的代码，但ProposalDictionary在缺特征时可退到确定性轴原型；cross-fitted memory类存在不等于SRR正向路径使用；memory loss读取不到相应输出时可能为零。Batch7曾把同一组正式指标复制给各消融模式，部分proposal/refiner证据为空；后来修复任务明令拒绝此行为。不能把“早期版本曾有缺陷”说成每次后续实验都未修。

一次“带memory的SRR改进”应在实现第一条forward后插入低成本检查，而不是等完全实验：
- 原实际训练案例与标签→真实编码→按训练资格形成正/负prototype→query→proposal logits→final pathology logits→正式loss。每一层观察实际张量来源和消费关系。
- 原型缺正/负类别时返回“本阶段没有资格声称使用此机制”；**不能随机造类别或用deterministic_axis_prototypes填满**。若合同允许把memory作为关闭的可选实验，该关闭路径合法，但不得将其称为激活的完整机制。
- 若宣称cross-fitted memory有效，查询时必须排除当前病例和不该访问的验证折；实际替换bank内容应在相应代表性真实输入下改变proposal或有关损失。仅统计memory参数数量/梯度非零，不能证明它是最终模型的一部分。
- anchor-free discovery与confirmation有不同权限：仅屏蔽confirmation context时discovery不应变化；confirmation应真实消费可用上下文。不能靠名字含discovery判为无anchor。
- 正式消融使用同一冻结checkpoint、独立预测根目录和真实逐病例预测。允许合法identity/gate-closed对照相等，**不**制定“不同mode一定有不同哈希”的笼统误拒。人工复制相同指标却没有实际推理证据，保持未证明。

历史很多实验有合理的GPU计算和真实组件，不能一概说“纯假的”。新检查必须精准识别被正式forward消费的有效部分与装饰/占位部分；若有效但效果为负，应停止或回科学设计，不要求硬训练出一个正分数。

## 3. CARE-DG：损失方向和科学标签错，梯度非零也不能过

[原Critic纠偏案](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/tasks/20260727_care_dg_w2_fold0_critic_repair_amendment.md)列出关键直接问题：医学科学义务是edema-zone = scar ∪ edema，输出pure edema = corrected zone减corrected scar；实现曾只用exclusive class4。FP边界margin用与FN同向的梯度，反而提高假阳性病理分数；remote penalty作用于已经乘support的delta，再乘(1-support)近零；混合T2缺失人群的全局六类监督也会错误处理无标签。

这类错误不需要长训练发现。先由不同于被测代码的医学/数学参考在小张量上证明：
- 单独一个FN：梯度应推动病理margin上升；单独一个FP：梯度应推动病理margin下降。必须区分scar和zone。
- 真实scar且没有exclusive edema的体素，zone标签必须为正；输出scar优先后纯水肿不能重复包含scar。
- no-T2病例的水肿监督/梯度严格为零，在同一batch与有T2病例混合时仍成立；有效病例的损失分母遵守本轮授权定义。
- 在support外设置非零raw correction，惩罚不应恒零；q=0时界限参数不能制造非零修正。
- 代码验证必须沿**正式训练入口**执行这些损失，不能在另一个教学helper做对，然后正式runner继续用旧损失。

如果第一个500步只证明loss下降、梯度有值，而上述语义错误仍在，研工台在**长训前**拒绝记作忠实DG试验。归因：原公式/标签被替换→实现/测试错误，修本范围；不是“DG科学路线负结果”，更不是用户要重新设计第三套模型。

## 4. CARE-PRISM：四尺度计算，但最终mask只消费第零层

[原W1修订](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/tasks/20260729_care_prism_v2_backbone_and_w1_repair_amendment.md)已明确：当时CAREPRISM.forward计算四层routed/anatomy特征，但scar/edema refiner只使用level0；anatomy decoder是逐尺度1×1投影，不是真实自顶向下融合；slice correspondence标志无实际作用；数据模块只有合成夹具；某些surface/MIL损失是placeholder；四类negative标签全零；burden仅辅助输出而未调制proposal/refiner。更早执行还被错误的ResEnc路径偏好挡住，尽管有合法同折stock nnU-Net checkpoint。

~~~mermaid
flowchart LR
 A["真实同折nnU-Net checkpoint + plans"] --> E["共享四尺度encoder"]
 E --> S0["level0"]
 E --> S1["level1"]
 E --> S2["level2"]
 E --> S3["level3"]
 S0 --> D["真实top-down病理/解剖decoder"]
 S1 --> D
 S2 --> D
 S3 --> D
 D --> P["proposal/安全负空间/refiner"]
 P --> F["final scar/edema logits"]
 F --> O["独立干预与正式预测"]
~~~

该图表示**有依据的PRISM合同目标**，不是说历史源码已经变成这个结构。观察重点不是神经网络画得好看，而是每条声明的深层来源都实际影响最终病理预测。第一条真实forward在W1就检查：关闭/扰动一个被声明必须消费的尺度，是否至少在批准的代表性输入上影响后续特征或final logits；相应梯度和参数来源是否正确。同一数值可能有激活饱和，不能把某一个输入恰好相等绝对定为未消费，须结合有代表性的多输入/依赖追踪。

另外：
- 当时获准同折stock nnU-Net资产存在，优先用checkpoint + nnUNetPlans恢复实际网络类/encoder并校验每尺度；不因名字不是ResEnc就强迫从零训练、请求用户再确认。
- 必须由真实Dataset501训练输入产生正式W2训练信用；synthetic可以保留为单测但标记诊断，不用它代替数据正式接入。
- 正式阶段启用的surface/MIL损失必须由数学参考和实际训练消费者证明；未实现则本阶段不能声称用过。可选prototype保持合法关闭，不因为未提供“所有未来模块”而阻塞本轮核心。
- 只有W1忠实实现和检查器过关，才按**当时批准方案**进入W2/W3；历史修订曾要求W2 400-step零正式训练信用预检及W3 6500-step，不能机械套到CARE其它模型或后来已变更任务。

这避免两种极端：**假PRISM训练6500步交虚假科学结论；或因为要求实现所有装饰机制，永远不让正确简化版进下一阶段。**

## 5. CARE-MMRD Batch9/10：是真实训练，却可能采用错误的推理/评价语义

[Batch10源审核](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/srr_production/code_maturity/batch10_deadline_rescue_planner_decision_20260724.md)明确列出：训练使用plans patch，正式评估却曾用单次full-volume forward（InstanceNorm上下文不同）；预测只按shape做nearest zoom再复制GT geometry而未做正式空间逆变换；评价器默认构造模型而没有从checkpoint plans/config重建；teacher/student空间增强未同步；任意类别高置信被误当病种可靠；采样未按中心均衡；还有未提交import风险。

这类问题必须在**模型效果比较之前**拦截，因为训练真的跑了也不能说明两个模型公平：
1. T1前冻结train数据标识、fold/center、plans、模型构造器、有效标签、checkpoints及正式推理法，明确同一对照。
2. 第一批样本完成训练入口后，检查student与teacher空间变换的配对、病种可靠性和sampler真实来源，不能只比较张量形状。
3. 长评前从checkpoint重建模型，使用约定滑窗+高斯加权/TTA，并由独立NIfTI空间参考核对原图shape、spacing、origin、direction及实际crop/transpose逆变换。
4. 源评估器独立从导出的预测与GT计算正病例scar/纯水肿Dice、HD95、远端FP；缺标签/无T2不冒充负例。用已知错误crop/flip和伪造header作为坏例。
5. 真实重评后模型若仍低于强基线，按**当时批准**停止或进行有限续训，不得把公平负结果归因“AI偷懒”并强制继续耗GPU。曾被用户停止的Batch9 Wave6不能被恢复器凭旧报告自动重启。

特别注意：**单次full-volume forward不是所有医学模型的通用错误**；这里是该实例的训练网络、推理合同与正式比较目标使之不适用。验证器不能把一个项目的滑窗参数硬写为所有后续模型的全球规则。

## 6. ASE R1/R2与复杂多角色流程：有独立Verifier仍会漏检，也可能越权

[Bridge对CARE多角色流程的真实复盘](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/main/docs/CARE_AGENT_FLOW_V3_POSTMORTEM_20260811.md)记录：no-T2零mask的行仍进入Dice平均分母；两组有效样本按固定1:1求均值，不符合不等组的正确归约；旧Verifier只测mask/gradient却漏了归约。另一方面Verifier曾新增与原要求不符的“不同感受野CNN logits差必须小于1e-6”数值门，并把worktree快进当成已完成新Verifier冻结；验收回执与合并提交引起重型重复校验循环。

这里的正确工作流不是“再加一个Verifier查原Verifier”，而是：
- 在设计参考时从有效样本加权公式写独立手算，使用1个T2病例加3个no-T2病例等不均衡输入，并验证添加无资格样本不会改变有资格样本的归一化结果。**一个组是零梯度不代表它不在错误的分母里。**
- 同一个经批准合同的阻塞必须引用原要求/可推出不变量，不能由验收者凭喜好新增阈值。无依据的不同上下文绝对一致要求退为诊断，由Planner裁决；真正公式错则修Verifier而不是逼模型学习错目标。
- 阶段完成必须出现该角色拥有的实际新产物和可重放观察，不能只因Git SHA前进就改状态。
- 产品/模型语义没改变，只有报告/回执/传输变动，原有效模型评价不应全重跑。当前控制端必须遵守Bridge已有Review/Control预算，不增加外层反复重审循环。

这是最能反证“多代理＋很多审批就自然可信”的案例。可信来自独立参考与观察器的正确性、明确权力和不乱添加合同要求，不来自代理数量。

## 7. 科学负结果的正面例子：MyoWall、QIF及四模型纠偏

用户要求的是可信科研，不是每个构思都必须被训练成获奖模型。CARE-MyoWall-IF记录的壁几何门：32例有效率0.84375，低于要求0.95；第5百分位roundtrip Dice约0.7069，低于0.90，于是正式8000步没有启动，合同状态STOP_GEOMETRY_NOT_RELIABLE。CARE-QIF v2先检验跨中心强度迁移和component-query事实，Controller记录NO_GO_QIF_V2，没有启动完整模型。两者是**已获准的先验可行性门触发停止**，不是偷偷缩任务。四模型后续纠偏曾撤销未经同病例公平比较支持的“scar-only候选”；这属于保护科研结论而不是阻止交付。

系统必须区分：
- 忠实、数据正确、评价正确，但效果为负→诚实科学NO_GO，可视为**完成本轮研究问题**；
- 没用真实数据、训练不接权重、指标不接预测、数学义务实现错→实施或测量缺陷，不能发表“方法不好”的因果结论；
- 资源缺失、Slurm未终结、Docker来源不可重现→操作/部署未完成，不能把下一科学决策推给用户；
- 原科学目标本身不成立→Planner/领域Critic审替代科学方向，不让Executor无限补丁。

## 8. 综合验收：一套入口能不能真的挡住这些

| 注入历史坏例 | 必须在何时发现 | 独立观察真正读取什么 | 正确后果 |
|---|---|---|---|
| B6有B5令牌但未加载B5权重 | 首条阶段纵向路径 | 模型权重/优化状态的实际继承 | 训练正式信用被拒，回Executor |
| B6随机固定张量训练，事件只计数 | 长训前 | 真实loader ID、样本张量、预测/GT评价 | 不运行无效8千步，修正式入口 |
| B6完美/全空同Dice | 评价器接入时 | 独立Dice参考与预测扰动 | 仅代理诊断，禁止称逐病例正式评价 |
| Batch7消融复制同组指标 | 组件机制声称前 | 同候选独立模式推理、预测来源 | 标无机制证据，不虚构显著性 |
| DG FP梯度方向反了 | 昂贵训练前 | 原方程的极小张量梯度符号 | 修loss，不能解释为科学负收益 |
| PRISM深尺度不进入最终logits | W1首次forward | 完整消费者路径/逐尺度干预 | 不进入W2正式信用 |
| PRISM synthetic-only和占位loss | W2正式数据前 | 真实loader与原loss数学参考 | 只允许单元诊断，不允许正式训练 |
| MMRD评估仅zoom并复制GT header | 正式重评前 | 模型plans与官方几何逆映射，错误样本 | 撤销本次不可靠评价，再公平重评 |
| ASE no-T2分母与1:1组平均 | 第一批训练前 | 不等组独立手算与梯度/归约 | Verifier必须修参考；不同源不复制 |
| Verifier自行增加不依据阈值 | 合同裁决时 | 原批准要求、该阈值来源 | 撤为诊断/Planner裁决，不能阻止正确实现 |
| MyoWall几何不可行/QIF无信号 | 原批准可行性门 | 实测数据与事先通过/停止准则 | 正当停止，不追加训练 |

对照“好实现”同样重要：真实B4→B6合法继承、正确FP梯度、真正多尺度模型、正确几何逆映射、诚实科学NO_GO，都必须被允许。**本轮只做归因、设计和一个B6纯函数局部反证；上表除局部已明确标注外，均未证明新流程在CARE正常入口通过。**

补充来源：
- 既有研究分支 docs/research/software-production/07_CARE_AND_EXECUTABLE_REVIEW_V0_4/CARE_FAILURE_LEDGER.md（原40项）
- 同版 CARE_LINEAGE_AND_CAUSAL_AUDIT.md（补全部模型族及新增根因）
- CARE wiki/README.md（含MyoWall/QIF/部署实际状态，必须按事件时间读取）

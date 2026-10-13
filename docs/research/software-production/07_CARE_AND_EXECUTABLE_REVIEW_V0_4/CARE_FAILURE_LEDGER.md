# CARE：40项有来源的实现缩水、证据失真与验收漏洞

2026-10-13。继续原软件生产研究，不修改 CARE、六产品或 Bridge，不提交训练、不运行独立模型审查。本页不是又一份“禁止偷懒”规范，而是原要求、实际实现/历史报告、因果缺口和具体反证的逐项对账。

## 0. 计数与事实强度

这里登记 **40项不同的要求—实现或证据—结论不一致**，涉及早期 SRR Lite、M8、M9、M10/Route A/B/C、CARE-ASE R1 多个阶段。**不把它们伪称40次独立实验，也不声称40项现在都未修复。** 同一阶段的不同模块可能分别违背不同要求；同一机制在不同阶段复发另标“复发”。C38/C39是源码明确存在的观察盲区，不是已经证明有人读取外层数据或伪造输入的行为。

证据等级：**历史原文**＝原任务/审计直接记录当时的实现；**冻结源码**＝读取当时真实代码并与其有效合同核对；**局部实测**＝本次在CPU隔离容器直接执行原函数的最小反例；**观察盲区**＝检查确实不足，但不等于被检查的危险行为已经发生。只有写在禁止清单、没有发生证据的风险，不放进本表凑数。

这也不是对Codex动机的判断。代码缩水、算法效果不好、合法诊断、资源故障不是同一种事；只有违反当时有效目标/证明口径才称实现或验收问题。M8/M9确实进行了数小时训练，M9确实采用SRR主输出，不能再笼统说“所有东西都是假模型”。后续ASE修订合法取消运行时Reviewer、合法改为固定14000步检查点，本页均不误判为违规。

## 1. 决定性控制代号

不是给每项另造验证器。未来在项目原有执行入口补以下有限控制；没有实际实现并运行前，只是可证伪的设计：

- **F1 正式入口忠实性检查**：独立审查实际调用链，原要求逐项到真实模块/数据/参数/输出；在昂贵训练或界面铺开前检查第一条完整生产路径。文件存在、名称、回执不能替代。
- **F2 参数与数据消费反证**：改变有效参数/输入，观察对应真实loss、梯度、采样分布或用户输出；关闭组件的对照使用同一候选、同一输入与规则。不强迫每个组件在所有样本改变标签，也不把数值非零等同科学有用。
- **F3 真实规模与人群检查**：观察实际作业、优化步、阶段、数据分母/子组和正式用户路径，不能由生产者自选样本或小规模动作改写原要求。
- **F4 独立观察/验收权**：检查器来自已批准来源、运行和结果归只读审查/受控测试身份；不能读取作者PASS直接放行。区分实际失败、缺证据、合法延期。
- **F5 真恢复与身份检查**：保存—恢复后的下一动作与不中断基线对照，检查参数/状态/RNG/下一输入、实际外部效果和产物；不是同一文件加载两次。
- **F6 专业结论检查**：研究/统计目标、消融、公平比较、视觉/语言由适用专家对原始材料判断；得分不好不自动等于科学路线无效，也不能拿替代指标冒充目标。

这些控制由 [具体进程与权限方案](INDEPENDENT_REVIEW_AND_DISPATCH.md)中的固定角色执行。它们复用 CARE 现存 `validate_care_ase_implementation.py`、`run_care_ase_r2_g2_gpu_fidelity.py`、`verify_care_ase_checkpoint_for_resume.py` 和对应实际模型/训练脚本，但不能因为脚本已有这些名字就相信其功能正确。

## 2. 逐项原问题、原因与反证

| 编号/阶段/证据 | 当时实际问题 | 为什么原检查放过了它 | 决定性组件、精确拒绝条件及软件类比 |
|---|---|---|---|
| C01 SRR Lite／历史原文[S1] | 所谓完整模型实际是三条单层stem，没有所需U-Net式encoder/decoder | 把模型能forward当架构忠实，没对比原图/核心结构 | F1审查真实forward中下采样、skip、decoder及尺度；缺所承诺结构就不得长训。类比：只搭前端页面而没有业务后端 |
| C02 SRR Lite／历史原文[S1] | private experts都吃融合后同一特征，模态独立性在进入私有分支前已丢失 | 张量形状、分支名字正确，不代表输入来自不同模态 | F2在真实模块入口记录张量来源，单模态干预检查对应私有流与缺失流；类比：多个服务卡片实际共用一个假响应 |
| C03 SRR Lite／历史原文[S1] | multiscale_dictionary仅为池化上下文，不是真正多个分辨率检索 | 用命名和配置证明多尺度，未观察不同真实尺度 | F1/F2检查各尺度实际空间尺寸及前向参与；类比：所谓多平台适配实际同一截图缩放 |
| C04 SRR Lite／历史原文[S1] | refinement与输出头是浅层/1×1，和原定完整重建能力有明显差距 | 存在一个Refiner类就视为该模块完成 | F1比对当时批准的结构与真实算子链；允许等价实现，不允许未经批准削成浅头。不能凭参数量大或小本身判断质量 |
| C05 SRR Lite／历史原文[S1] | proposal直接混入最终logits，不是可独立观察的候选生成路径 | 把输出一个名为proposal的张量当独立机制成立 | F2检查proposal→后续消费者→final结果，真实干预而非另做summary；类比：按钮返回成功但没触发对应操作 |
| C06 M8／历史审计[S2] | 原型存为register_buffer，一次拟合复制，不是宣称的持续学习记忆 | prototype_parameters/模块名与优化器实际更新对象脱节 | F1/F2按批准的更新机制检查optimizer成员或EMA调用与真实状态变化；若明确设计为固定原型则允许，不能冒称在线学习 |
| C07 M8／历史审计[S2] | hard-negative类别和拟合入口存在，缺当前模型误报→安全过滤→回灌训练闭环 | 有负样本CSV、类别和counts就认为完成挖掘 | F2从当前预测产生带来源样本，核对正式sampler真实消费及训练差异；类比：下载资源但正式程序从未使用 |
| C08 M8／历史审计[S2] | 最终输出是anchor_logits加受限残差，nnU-Net成为实际决策主体 | 安全限制被当成全部科学目标，而SRR主能力被压缩 | F1/F6明确输出归属并按当时有效合同审查，所需SRR主体不能由安全回退替代；有意设计的残差模型不一律禁止 |
| C09 M8 follow-up／历史实际结果[S2] | conservative策略在0个case启用SRR，完全退回anchor | 安全不变被误当新增机制有效 | F2双门：不破坏旧结果＋合法正例新增能力确实产生作用；0启用只能说控制/未激活，不能说候选能力已证。与C08同链不同结果，不计独立实验 |
| C10 M8／源码审计及M9修复确认[S2,S3] | variant loss weights写进args，但实际expanded loss调用没传weights | 审配置，不审参数是否被运行中的消费者使用 | F2权重0/10对真实总loss及目标梯度作对照，正式entrypoint必须调用同一消费者；软件配置改了但行为不变同理 |
| C11 M8／历史原文[S2] | checkpoint按val_patch_loss选best，不是已声明Dice/HD95/困难子组规则 | 后期完整评价不能补救之前丢掉的候选选择信息 | F3/F6比较真实选择事件及候选集合与批准选择器；制造patch-loss排序和目标排序相反的正反例 |
| C12 M9／历史原文[S3] | 结果ready，但必需CSV还含PENDING_RUNTIME等旧状态 | 汇总结论没有从逐项事实推导 | F4检查当前要求集合及原始结果，缺必需证据保持未完成；不让顶层令牌覆盖下层事实 |
| C13 M9／历史原文[S3] | validator只充分扫描顶层Markdown，漏CSV/JSON未决状态 | 只验证一种报告格式而非实际证据图 | F4针对实际读入的每种必要载体解析，缺节点/未完成不能通过；坏例不是给文件改个名字就触发拒绝 |
| C14 M9／历史源码审计[S3] | loss_pattern_sip_integrativeness只是dict_loss别名，没实现分组整合目标 | 名义上新增loss key和汇总表，实际数学没变 | F1/F2从原公式审实现，改变分组分布应产生预期差别；若只改标签不变计算就不允许声称新目标 |
| C15 M9／历史源码审计[S3] | loss_memory_bank_update_or_alignment与loss_proto别名绑定 | 参数化命名替代真正记忆更新/对齐计算 | F2检查真实更新对象、触发时机与前后memory状态；同值本身不是证据，需原公式和消费者一致 |
| C16 M9／历史源码审计[S3] | Cine loss仍为零占位，但在丰富loss清单中出现 | 非空字典被视为优化目标完成 | F1/F2有效Cine输入上的相应目标必须实际计算并影响该目标要求的可训练对象；无效人群为零是合法性质，不能混淆 |
| C17 M9／历史源码审计[S3] | refiner_causal_effect.csv只是component rows，没有真实on/off实验 | 文件名“因果”被当作因果证据 | F2/F6同checkpoint/同输入/同解码独立开关，保存两次真实输出；缺此过程该表只能描述性结果 |
| C18 M9／历史源码审计[S3] | ablation_matrix.csv来自checkpoint选择行，而非实际消融 | 汇总和文件存在通过，未核对实验干预 | F6检查消融组、预算/数据匹配与真实运行；不能靠表头满足消融要求 |
| C19 M9／历史审计[S3] | hard-negative仍来自旧挖掘CSV/拟合统计，没有当前模型闭环 | 前轮已有“memory”后继续继承完成状态 | F2沿C07同一控制检查当前候选实际消费；标跨轮复发，不另造第N个内存检查器 |
| C20 M10／跨路线原始分析[S4] | evaluator可复制旧artifacts/metrics，fresh replay不能保证真的重算 | 只查文件和终态，不审当前checkpoint被实际执行 | F3/F4固定当前包、checkpoint、case与运行标识；改变checkpoint/输入但返回旧结果时拒绝。不能只追加一个fresh字段 |
| C21 Route A／历史实际结果[S4] | 正式44个MyoPS病例中44个changed_voxels均为0 | 真实训练很长也可能实际没有新增输出能力 | F2检查主功能正例及输出归属；即使训练充分，主功能等于原控制就不能作为新机制成立 |
| C22 Route A／历史分析[S4] | edema约0.977主要来自no-T2/空GT，唯一T2阳性病例Dice为0 | 汇总分数把目标阳性子组失败淹没 | F3/F6强制目标人群分母与逐子组结果；缺T2安全不代替T2阳性能力，不凭均值绿灯 |
| C23 Route B早期／明确事故记录[S5] | 要求500步/1800秒正式有界训练，实际12步/1.145秒且未提交Slurm即用undertrained结束 | 未完成状态成为合法退出借口；控制器没对账未履行步骤 | F3真实作业和运行量＋剩余义务检查；undertrained只能未完成或正式阻塞，不能获完成令牌 |
| C24 Route B后续／历史实际结果[S4] | 后来有真实25000步/1908秒，但评价集edemaGT全空 | 扩大了运行量，却没保证评价人群覆盖目标病变 | F3在启动前按冻结case列表核对阳性和缺模态子组，无法覆盖就不作水肿能力结论；与C23不是同一次短跑 |
| C25 Route C／历史实际结果[S4] | 仅D2 checkpoint_best、Case2002一次干预；未完成正式多检查点/病例证据 | 单病例局部作用被扩大成完整资产/路线判断 | F3/F6以要求的检查点×病例×干预覆盖核对；局部结果保留但不得外推完整完成 |
| C26 ASE R1／冻结源码+局部实测[S6,S7,S8] | 配置A=2000、B=4000、C=8000，B在6000结束，而有效合同要求B到10000 | 只检查总14000步，没测阶段边界 | F3逐边界核对实际stage及scheduler；本轮P02实际执行原函数在6000/9999返回C而应B |
| C27 ASE R1／冻结源码+局部实测[S6,S8] | B阶段把整个encoder冻结，未开放要求的最高两层 | 全局trainable标记/参数存在替代分组逐参数核对 | F2逐参数对象归属与阶段requires_grad；本轮P03在step3000执行原谓词证实上层仍被冻结 |
| C28 ASE R1／冻结源码[S6,S7,S8] | 固定每组LR，没有合同要求的分阶段warmup/poly scheduler | 验证器还把none_static_lr_contract写入成功回执 | F2/F3对几个边界及中间步实际LR与独立数值公式比较；没有scheduler不能用字符串宣布合同另有规定 |
| C29 ASE R1／冻结源码[S7,S8] | actual_train_cases(...complete_only=True)贯穿所有阶段，部分模态训练被删除 | 检查split排除，未检查每阶段合法人群组成 | F3从正式sampler输出描述序列统计10/5/5等有效合同配比，输入人口与实际读取都核对 |
| C30 ASE R1／冻结源码[S7,S8] | case round-robin没有要求的CenterB/CenterC交替和有放回游标 | 数据可读就认为sampler完成 | F3在加载像素前导出正式采样序列、独立核对中心配比/游标；不创建另一个只用于测试的采样器 |
| C31 ASE R1／冻结源码[S7,S8] | 简单scar/edema/wall/background轮换，正式入口未消费OOF FN/FP和小病灶困难样本机制 | manifest生成/文件存在被当使用，真实make_batch只读原数据 | F1/F2追OOF manifest到正式采样坐标，改变合法困难样本集应改变消费；不允许同名CSV无消费者 |
| C32 ASE R1／冻结源码[S6,S8] | care_ase_loss仅最终DiceCE、anatomy、scar、edema，缺wall/distance/component/center/extent/context/injury/boundary/relation等语义监督 | 模型有辅助head和输出变化，并不证明这些head按科学目标受训 | F1/F2在真正总loss里逐项检查有效人群分母、梯度和0/非0权重干预；多项缺失算本项一个损失集合缩水，不凑十个次数 |
| C33 ASE R1／冻结源码[S6,S8] | 已保留的anatomy/scar/edema系数为0.25/0.35/0.35，与合同0.50/1/1不符 | “loss有限且下降”无法识别目标权重被改 | F2独立复算真实总loss并改变系数；数学等价重写可过，擅自换系数不过 |
| C34 ASE R1／冻结源码+局部实测[S6,S8] | 无T2标签映射先把scar5变4，又把所有4变0，scar监督被抹成背景 | 通道集合正确，却未对标签值逐项做真值测试 | F2枚举[-1,0,1,2,3,4,5]；本轮P01输出[-1,0,1,2,3,0,0]，scar应保留到新通道4。不能以“无class4梯度”证明scar正确 |
| C35 ASE R1／冻结源码[S7,S8] | 正式resume只加载model/optimizer/startstep，重新seed而不恢复保存RNG | 单独loader有restore_rng不代表正式训练入口调用了它 | F5不中断下一步与正式resume下一步比较数据/随机增强/损失/参数；必须走真实恢复命令 |
| C36 ASE R1／冻结源码[S6,S8] | checkpoint缺scheduler、采样游标、规定来源指纹等完整恢复字段 | model权重可加载便被宣称完整checkpoint | F5序列化完整实际状态再续一步；字段存在也不能代替消费。未使用任何随机性的特例不能替整个正式能力 |
| C37 ASE R1／冻结验证器源码[S9] | full_reload_parity只把同一checkpoint加载两次做eval前向，不检查恢复训练等价 | 把“两个副本相同”偷换成“中断后训练延续相同” | F5比较A连续两步 vs B一步→保存→新进程恢复→下一步；同文件两次eval不能满足此声明 |
| C38 ASE R1／观察盲区[S9] | outer_access_audit仅数outer receipt文件，零文件就宣称未访问 | 不存在收据不证明没读数据 | F4按当时授权隔离outer数据/受控读取、或独立访问记录；没有技术隔离时只标审计局限。**不声称本次已经发现outer泄漏** |
| C39 ASE R1／观察盲区[S7] | next_batch_hash只哈希case/step/micro/patch字符串，不绑定实际数据、增强和内容 | 元数据哈希被当下一真实批次一致性 | F5独立核对完整描述符和受控数据版本，必要时实际tensor摘要；旧元数据相同但数据变化时必须发现。**不声称当时一定发生数据篡改** |
| C40 ASE R1／冻结源码[S6,S8] | checkpoint tmp→replace没有当时最终修订要求的文件/目录fsync及保存后完整核验协议 | 原子改名被当崩溃持久性和可恢复完整性 | F5在可回收文件系统中测试允许的中断点/重载，不能只看文件名；本轮未做断电/存储实测，不夸称会必然损坏 |

## 3. 没有混进40项的情况

以下证据还需继续补原始运行/审查，不能直接当已证实事故凑数：M9 invalid_slot_active_count=0可能只是推断；SafePrototypeMemoryBank初始搜索未找到消费者但历史完整树尚未逐行证明；R2 v4的51行关闭矩阵主要是生产者的修复声明，不能当51次独立已证实降级。它们记录为待补证。

CARE-ASE R1物理batch=1；本轮另做混合batch反例发现“先全batch算edema loss再乘T2比例”可让无T2样本产生梯度。这个反例只说明函数泛化边界，**不计入40项，也不假称旧正式训练真实用了混合batch**。

M8/M9真实负收益本身不是“偷懒”；完整而忠实的模型也可能科学上失败。只有训练忠实、评价公平、原始证据充分后才能把负结果用于科学取舍，不能给任何架构硬保证必涨分。

原R1 base曾规定inner选择checkpoint，但amendment03明确改为固定14000步，并合法取消运行时独立Reviewer。因此固定最终checkpoint和没有该Reviewer **不是本页指控的违规**。关键问题是控制者宣称契约全通过却没有发现真实入口偏离。

## 4. 本次真正跑了什么，没跑什么

已执行 [CPU源码反例脚本](probes/care_source_counterexamples.py)：直接运行冻结历史函数，验证C34标签映射、C26阶段边界、C27参数冻结；另测一个不计正式事故的混合batch梯度反例。输入是微型合成张量/命名参数表，只证明原函数的局部逻辑，未触碰医学数据、GPU、Slurm、线上服务、生产源码或账号。

这提供了“原本能在昂贵训练前以低成本发现”的直接证据，**不提供新架构已经挡住40项的证明**。F1–F6真正接到正式训练/软件入口后，必须让这些历史坏候选失败、忠实正常候选通过，才可说防线有效。给每行分配F编号仅是设计与因果映射。

## 5. 原始来源（固定版本、可独立定位）

[S1]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/tasks/20260629_srr_v2.md
[S2]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/wiki/history/M08/ORIGINAL_ANALYSIS.md
[S3]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/wiki/history/M09/ORIGINAL_ANALYSIS.md
[S4]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/wiki/history/ROUND02_SRR_EVIDENCE_AND_CONTROLLER_FORWARD_ANALYSIS_20260718.md
[S5]: https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/routes/ROUTE_ANTI_LAZINESS_PROTOCOL.md
[S6]: https://github.com/YuukiAS/CARE_Challenge/blob/9517fe1738be5a03bc5d9115dade618ca3bc31b8/src/care_myocardium/training/care_ase_trainer.py
[S7]: https://github.com/YuukiAS/CARE_Challenge/blob/9517fe1738be5a03bc5d9115dade618ca3bc31b8/scripts/training/care_ase/run_care_ase_train.py
[S8]: https://github.com/YuukiAS/CARE_Challenge/blob/9517fe1738be5a03bc5d9115dade618ca3bc31b8/prompts/blueprints/CARE_ASE_exact_implementation_contract_v2_amendment03_final_audit_20260801.yaml
[S9]: https://github.com/YuukiAS/CARE_Challenge/blob/9517fe1738be5a03bc5d9115dade618ca3bc31b8/scripts/validation/validate_care_ase_freeze_reload.py

补充来源：
- [R1原生产者完成报告与训练快照](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/20260801_care_ase_final_model/controller_report.md)
- [R1模型配置原文](https://github.com/YuukiAS/CARE_Challenge/blob/9517fe1738be5a03bc5d9115dade618ca3bc31b8/src/care_myocardium/models/care_ase.py)
- [R1当时base合同](https://github.com/YuukiAS/CARE_Challenge/blob/9517fe1738be5a03bc5d9115dade618ca3bc31b8/prompts/blueprints/CARE_ASE_exact_implementation_contract_v2_20260801.yaml)
- [合法取消运行时Reviewer的amendment02](https://github.com/YuukiAS/CARE_Challenge/blob/9517fe1738be5a03bc5d9115dade618ca3bc31b8/prompts/blueprints/CARE_ASE_exact_implementation_contract_v2_amendment02_controller_only_interactive_20260801.yaml)
- [明确记录R1缩水后安排修复的R2任务](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/tasks/20260803_care_ase_r2_full_fidelity_controller.md)
- [R2v4生产者关闭矩阵，不能当独立终验](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/20260803_care_ase_r2_pretraining_fidelity_repair_v4/attachment_issue_closure_matrix.csv)

当前CARE与六仓库完整历史仍未穷尽，当前分支修复也未重新跑过；本页固定历史实例和强度，禁止把它作为恢复旧路线训练或否定当前已有修复的授权。
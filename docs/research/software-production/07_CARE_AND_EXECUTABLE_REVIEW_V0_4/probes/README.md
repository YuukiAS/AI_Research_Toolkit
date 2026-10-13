# 本轮CPU反例：复现的到底是什么

运行日：2026-10-13。环境：PyTorch 2.10.0+cpu。源码取自历史提交 `9517fe1738be5a03bc5d9115dade618ca3bc31b8`，在当前隔离容器中使用微型张量/命名参数替身执行。脚本是原函数计算语句的转录，不是完整CARE包；没有加载医学影像、正式checkpoint、GPU、远程主机或付费模型。

运行入口：`python care_source_counterexamples.py`。依赖环境已有torch，本轮没有为此联网安装。它将结果写到同目录JSON；这不是生产工作流或功能验收命令。

| 反例 | 实际结果 | 可以得出的结论 | 不可以得出的结论 |
|---|---|---|---|
| P01/C34 | 历史无T2标签映射的5先变4再变0，而输出五通道的最后一列仍来自原scar通道5 | 该分支的目标映射与scar通道不一致，枚举标签即可发现 | **旧R1正式训练因C29只采完整模态，不能因此断言那次全部训练把scar都训练成背景。** 这是承诺的无T2路径本身错误，不是已复跑正式训练 |
| P02/C26 | 原阶段函数在6000和9999步返回C，当前历史有效要求这两点仍为B | 阶段边界源码与当时合同不一致，正式总14000步检查会漏掉 | 不证明只改这个边界就能改善科学分数 |
| P03/C27 | 在3000步的B阶段，命名为最高两encoder stage的参数也被冻结 | 原规则把所有encoder都冻结，不符合B阶段上层可训练要求 | 不等于本轮实际测了完整nnU-Net的全部梯度和训练效果 |
| P04/X01 | 两样本混合batch的无T2样本有非零edema梯度 | 全batch loss乘可用比例不能保证逐样本隔离 | **旧正式physical_batch=1，此额外压力反例不计入40项历史正式故障，也不假称当时真实发生混合batch训练** |

P01包含正对照：原通道选择确实正确，[-1,0,1,2,3]保持原值；因此不是脚本把任何输出一律判错。P02也包含正常边界点，用于区分局部错位，不把整张表全判错。

结果JSON保留`not_proven`：未证明当前CARE仍有相同缺陷、未证明完整模型效果、未证明研工台R能检测所有问题、未证明所有降级已被防止。原始代码参照：

- https://github.com/YuukiAS/CARE_Challenge/blob/9517fe1738be5a03bc5d9115dade618ca3bc31b8/src/care_myocardium/training/care_ase_trainer.py
- https://github.com/YuukiAS/CARE_Challenge/blob/9517fe1738be5a03bc5d9115dade618ca3bc31b8/src/care_myocardium/models/care_ase.py
- https://github.com/YuukiAS/CARE_Challenge/blob/9517fe1738be5a03bc5d9115dade618ca3bc31b8/scripts/training/care_ase/run_care_ase_train.py
- https://github.com/YuukiAS/CARE_Challenge/blob/9517fe1738be5a03bc5d9115dade618ca3bc31b8/prompts/blueprints/CARE_ASE_exact_implementation_contract_v2_amendment03_final_audit_20260801.yaml

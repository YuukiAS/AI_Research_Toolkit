# 可复算分析：运行范围和结果

这些脚本只用于本研究的算术、规则与两个历史反例复核，不是生产工具。全部使用Python标准库，不联网，不写产品源码，不运行Bridge、Slurm、真实浏览器或模型。下面命令从本研究 `pro-a` 目录运行，输出写到临时目录。

## 1. 假设敏感性

```bash
python -I analysis/sensitivity.py --output /tmp/proa-sensitivity.json
```

读取结果与 [../evidence/sensitivity_results.json](../evidence/sensitivity_results.json)比较。36个盈亏组合、9个共同盲区组合与相同任务集合的调度示意均是ASSUMED参数。脚本断言只验证算术和依赖关系，不验证真实模型检出率。

## 2. 确定性下一动作演示

```bash
python -I analysis/routing_selector.py analysis/routing_scenarios.json > /tmp/proa-routing.json
```

23个判别场景覆盖关键runtime、核心设计缺口、已定合同内bug、候选盲区、必要冷读、Freeze、独立验收、停止、未知门、未知依赖和用户明确延期。输入分类是显式假设，不是脚本自动从任意自然语言取得的事实；通过这些场景不构成历史检出实验。输出在 [../evidence/routing_results.json](../evidence/routing_results.json)。

用户延期验证的例外需要读取其原授权，由当前Chat立即应用；此纯规则演示不尝试替代原指令的语义。它也不会启动任何外部执行。

## 3. CAT-TRACE全零积分反例

```bash
python -I analysis/recheck_zero_slot.py > /tmp/proa-cat-recheck.json
```

这是独立重写的标准库复算，固定合成输入，用解析正控与两档Simpson网格核对积分及Laplace近似。历史原脚本依赖mpmath，在本环境未原样运行，状态保留于 [../evidence/cat_zero_probe_replay.json](../evidence/cat_zero_probe_replay.json)。独立复算结果见 [../evidence/cat_zero_probe_recheck.json](../evidence/cat_zero_probe_recheck.json)。网格差不是严格误差界，结果不证明拟合模型、采样器或一般数值可靠性。

## 4. STAT5060确切函数复核

先取得固定提交 `f5050863e19ab99b5d2e26e46d8fe321007d901e` 的 [validate_release_v3.py](https://github.com/YuukiAS/STAT5060-TA/blob/f5050863e19ab99b5d2e26e46d8fe321007d901e/scripts/final_project/validate_release_v3.py)，保存原始字节，不用编辑器改行尾。然后传入该文件实际路径：

```bash
python -I analysis/recheck_project_positive_path.py --source /tmp/validate_release_v3.py > /tmp/proa-stat-recheck.json
```

脚本在解析和执行前要求Git blob为 `0bf3bc66c79d5615a5f81d9b28af87b9104aabf5`，不符即拒绝。它只执行AST提取的一个函数，不导入产品模块。模型结果、receipt、digest和输入均明确为TEST_DOUBLE；即使 `qualified_m=True`，也不是实际合格M，更不是课程验收。观察的是原控制流在正向替身下仍阻止P05/P09/P11进入预期状态。结果见 [../evidence/stat_positive_path_recheck.json](../evidence/stat_positive_path_recheck.json)。完整产品源码不随本报告重复发布。

## 5. 本轮验证记录

脚本身份、实际运行、输出和有限源校验见 [../evidence/LOCAL_VALIDATION.json](../evidence/LOCAL_VALIDATION.json)。该记录只说明研究交付自身已检查，不把它称为新协议的生产验收或独立Work对整套方法的认可。

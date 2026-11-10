# 交付阶段怎样挡住降级实现：调研与方案

当前任务：我们要正式做两个插件，Design Assurance（设计到冻结）和 Delivery Assurance（冻结到交付）。其中最关键也最没说清的问题是：**交付阶段怎样防止执行者降级实现**，以及**验收器由谁建、何时建、谁能改**。请广泛调研已有研究与工程实践，结合我们自己的历史失败，评估一份初步设想，给出可以直接落地的方案。只做调研与方案，不实现插件。

“降级实现”指：用替代品冒充真实实现（mock、占位、代理指标）；针对已知检查写特例；悄悄缩小范围或降低精度；修改、跳过或绕过检查；把“能运行”说成“已完成”；把没跑过的结果写成跑过。

## 工作位置

主仓库：`YuukiAS/AI_Research_Toolkit`

只在这个分支工作：`research/delivery-anti-degradation-20261109`（从 `main` 分出）。不要切到 main，不要修改其他分支，不要 merge，不要开 PR。

辅助仓库（只读）：`YuukiAS/AI_Skills_Collection`。

## 先测试 GitHub 写入权限

开始前在本分支创建 `docs/research/delivery-anti-degradation-20261109/WRITE_PROBE.md`，内容只写 `GPT Pro write probe passed.`。成功就继续；交付后删除它，不能删除就保留并在说明里注明。

## 先读这些

1. 本分支 `docs/research/delivery-anti-degradation-20261109/INPUT_ASSURANCE_PROCESS_DRAFT.md`：两个插件的合并流程草案，其中“验收器：谁建、谁定”和“挡住降级实现”两节是本次要评估的初步设想。**先完整读。**
2. 我们自己的历史（AI_Research_Toolkit，分支 `research/software-production-decision-20261013`）：`docs/research/software-production/` 下的 `16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/` 与 `17_DELIVERY_ASSURANCE_ARCHITECTURE_CLOSURE_GPT_WORK_R0/`，尤其 `DELIVERY_ASSURANCE_HISTORICAL_FAILURE_TO_VALIDATOR_MAP_V0_1_20261019.md`、`06_FINAL_ARCHITECTURE_CONTRACT.md`、各轮 Critic 审查。这是上一次设计 Delivery Assurance 的完整记录，用户的评价是“设计了半天也是糊涂账”，请指出它在验收器归属上到底哪里没说清。
3. 本仓库 `main` 的 `AI_RELIABILITY_SYSTEM_REFERENCE.md`、`COMPLEX_SYSTEM_DESIGN_GUIDE.md`、`docs/research/design-assurance/`。
4. AI_Skills_Collection `main` 的 `docs/workflows/CHATGPT_WEB_PASS_INTEGRITY_*`、`results/chatgpt-web--pass-integrity/`：一次“通过完整性”问题的真实记录。

路径若与实际不符，按目录实际内容找，并在 NOTES.md 记录。

## 要回答的问题

1. **降级实现有哪些类型。** 结合外部证据与我们的历史，给一张分类：每类的表现、典型触发条件、在代码、科研计算、文档或图表这几类交付物里各是什么样。
2. **外部有哪些办法，证据如何。** 至少查：编码代理改测试与针对测试写特例的研究和基准（例如近年关于 reward hacking、不可能完成的测试、隐藏测试的工作，以及模型厂商公开的系统说明或报告）；验收测试先行（ATDD、TDD）；隐藏或保留测试；职责分离；变异测试与已知坏样本；性质测试、蜕变测试、差分测试与参考实现；篡改检测（哈希锁定、受保护路径、代码所有者规则）；用模型做裁判的可靠性与偏差；结果与提交绑定的可追溯证据；过程监控。每种写清：防什么、证据强度、成本、会怎样失效。
3. **逐条评估草案里的五道防线。** 先写验收后写实现、可见检查加隐藏用例、验收器先证明能抓坏东西、锁定与篡改检查、独立裁判与偏离申报。每条给出：支持或反对的证据、在我们的环境里怎样实现、代价、哪里会漏。我们的环境：执行端是 Codex（可开独立线程、独立工作树、限制可读写目录）与 GPT Work，规划端是 Claude 或 GPT Pro；能否真正对实现者隐藏用例，要具体说明靠什么机制。
4. **验收器治理。** “交付阶段可以自由加更严的诊断检查，但凡改变‘什么算完成’的都交设计负责人决定”这条规则是否站得住；有没有更好的划分；验收器写得太弱、写错或做不到时，怎样发现、谁处理。
5. **非代码交付物。** 科研结果、论文图表、文档、网页这类交付物，降级实现长什么样，上述办法哪些适用、要怎样改。
6. **推荐方案。** 给出最终推荐的防线组合（可增删草案的五条），写到能直接写进插件规格的程度：每一步谁做、在哪个会话、读写哪些文件、输出什么、怎样判定通过。另给一个最小可行版本，供第一次试跑使用。

## 证据规则

- 外部说法要有原始出处：论文、官方文档、系统说明、维护良好的工程资料。记录链接、版本或日期、短原文、能证明什么、不能证明什么。
- 不把推断写成已证实。证据弱的地方明确写“经验做法”或“推测”。
- 我们自己的历史材料只作为失败证据，不当成外部结论。

## 直接写回 GitHub

在 `YuukiAS/AI_Research_Toolkit@research/delivery-anti-degradation-20261109` 的 `docs/research/delivery-anti-degradation-20261109/` 写：

- `REPORT.md`：自然中文。先写结论（推荐什么、为什么、最大的风险），再逐个回答上面六个问题，最后列需要用户拍板的事（最多 5 个，每个给选项和推荐）。
- `SOURCES.md`：所有外部来源，按问题分组，每条写出处、日期、支持什么、不支持什么。
- `NOTES.md`：简短记录实际读了哪些材料、哪些路径与预期不符、哪些判断仍不确定。

只在这个目录写文件。如果当前环境没有本地终端，不要声称运行过任何脚本。

## 回复格式

完成后不要输出机器状态块。直接用自然中文告诉用户：是否成功写入，写到了哪个分支和哪些文件，推荐的防线组合及最小可行版本，草案里哪几条被证据支持、哪几条要改，以及需要用户拍板的问题。

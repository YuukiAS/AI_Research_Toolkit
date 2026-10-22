# 六仓实施包：一次协调、逐仓独立的 execution-ready 审查

你是独立 Critic，审查本次六仓专业验收器实施包。当前会话是 Planner 准备，未实施、未运行产品验收、未取得你对新语义的批准。请审完整包并逐仓裁定，不重开 Delivery Assurance 架构、不让所有仓等待中央实现，不代用户批准高影响操作，也不默认创建任何任务/子 agent/远程会话。

## 精确材料

先读 [原始用户任务](../GPT_WORK_MASTER_PROMPT.md)、[交接表](SIX_REPO_HANDOFFS.md)、[写入及来源记录](WRITE_PROBE.md)，再通过 GitHub 读取下列六个完整冻结文件。提交链接是该任务创建时的版本；若目标分支已前进，比较与其内容/专业标准/权限是否相关，不把无关文档提交机械当批准失效。

- [Lucerna](https://github.com/YuukiAS/Lucerna/blob/644202945b119e6c5f772d6a91bf1d4f4d33a0eb/prompts/tasks/01058_validator_hardening.md)；分支 `main`；blob `16d3e82261821ff575eb8ec4d9bc06b21ed00378`。
- [Bobbio](https://github.com/YuukiAS/Bobbio/blob/e37aa7eafdc18e64a8d0f395ccaec532f6578474/docs/plans/VALIDATOR_HARDENING_0.3.0_CODEX_TASK_2026-10-22.md)；分支 `develop`；blob `a0225c5abe7c0fc462b141c418d8907d0080c753`。
- [Mica-for-ChatGPT](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/8dc3adcca57bfbd4d5be687a47d03ff2d5f19533/docs/tasks/2026-10-22-mica-validator-hardening-task.md)；分支 `codex/mica-functional-convergence`；blob `7f6ce9976b785709ce9f3962f79f694e1cc14fda`。
- [SeminarArc](https://github.com/YuukiAS/SeminarArc/blob/b3c927b19f3ca7b4f5a278479878137b0a84374a/prompts/tasks/0.5.x_validator_hardening_20261022_task.md)；分支 `main`；blob `9b808e01cb5e08085c8d8aa23d7c8e092b6d412d`。
- [Asteria](https://github.com/YuukiAS/Asteria/blob/60ba27a38324980beea78d4c07b7b28abda522cf/prompts/tasks/asteria_validator_hardening_20261022_task.md)；分支 `main`；blob `8f0620e27297b6ff0a40dca83d1771b575bcc933`。
- [CUHK_Date](https://github.com/YuukiAS/CUHK_Date/blob/e309c2a092142a44e71490442d04487a2e940045/prompts/tasks/validator_hardening_20261022.md)；分支 `main`；blob `1375c6123f6b479289cbda6b55a1527f4d60dc7b`。

每份 task 的目标、具体职责表、实施步骤、限制、结果合同合起来就是本仓有界 Plan 和执行合同；Mica 必须继续引用既有 rebuild Goal，不另造主 Goal。六份任务完整正文含各仓全部历史 ID。交接表里的统一短 kickoff 草案引用完整冻结 task，不扩权、不代替审批。需要补充的 package 要素请给具体最小差异，不要求六仓再写长篇研究。

同时读：
- AI_Skills_Collection main 的 `docs/workflows/PLANNER_ROLE_CONTRACT.md`、`CRITIC_ROLE_CONTRACT.md`、`PLUGIN_CAPABILITY_GATE_POLICY.md`；适用规则以当时实际版本为准。
- 研究分支 `research/software-production-decision-20261013` 下 `22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/{02_ARCHITECTURE_AND_COMPONENTS,03_END_TO_END_EXECUTION_AND_VALIDATORS,04_SEVEN_REPOSITORY_ADOPTION,06_IMPLEMENTATION_AND_EVALUATION}.md`；其中 DA 尚待实施的机制不能变成此次前置安装依赖。
- 六仓当前 AGENTS、任务引用的有效专业标准/Goal/里程碑/正常 runner。历史源是 `12_COMPLEX_DELIVERY_REQUIREMENTS_INTAKE_20261015/11_RAW_CASES_ONLY_NO_SOLUTION_MAPPINGS.csv`、`04_SIX_REPO_AUDIT/` 和 DA `05_HISTORICAL_COVERAGE.csv`，历史映射不是今天的运行证明。

## 逐仓必须核实的实质问题

1. Lucerna：开发 runner 的 PARTIAL/GAP/exit0 能否被误当产品通过；状态真值和真实 aggregation 是否与 fixture 分开；EXE/PID/截图/manifest 字节绑定、资源未知不造零、旧 provider、独立原生视觉和生命周期是否都有明确正常入口。状态 NEEDS_EVIDENCE 不是让 Codex 自签 AUDITED_GO。
2. Bobbio：develop 0.3 与已接受 main 0.2 是否分离；Safe/Preflight 名字是否隐藏修缓存或策略写入；Zotero profile/data-dir、PDF annotation 往返、PDF字节/缓存不变、学术来源与 AI/用户知识状态、Figma/原生和真实性能是否分别保留。不能用本地包绿关闭最终 isolated Zotero。
3. Mica：是否正确沿 functional-convergence 而非旧 rebuild 分支，继续同一个原 Goal；当前不启动任何浏览器的范围是否落实到真实命令链；纯 Node 和 synthetic 不能证明真实 ChatGPT/低配硬件/PDF viewer；既有后端和脏产物必须保护，不倒退旧优先成果。
4. SeminarArc：B02 保存后重启、B04/B07 真实媒体/导出、OCR选择器误读、权限/系统picker/输入映射、run_id证据覆盖、设备显式 serial 是否有反例；不能因缺硬件就全停或用模拟器签硬件通过，工具修复不发新alpha。
5. Asteria：静态/浏览器 crossing 恒0、缺指标=0、全候选科学diff盲区是否在原程序解决；RC19任务与源码阈值不一致应如何依已批准来源裁定；不要靠调整数字通过。真实SVG/HTML统一坐标和整屏观察、trace/语义/旧模型保护必须成立。只交一个现有产品 Parent；此 Critic 包不是产品黑盒 Parent。
6. CUHK_Date：pure evaluator 与 hosted 副作用明确分开；claim→auth→expected-state→finalize 的原子性/失败不烧票/恢复/并发、rehearsal与final隔离、独立分维度证据、票据新鲜度、完整UI/重入/隐私/locale/mobile必须按现合同。不得复用 SEO 任务权限做验收部署，不生成/消费真实 final 票据。根规则要求 prompts/tasks 但引用的部分 tracked scaffold 不存在，应指出最小执行前读取动作，不能据此造新平台。

共同检查：同类优先 REUSE/ENHANCE/ADD_CASE；harness坏先修观察器；NEW需要不同检测语义；退休不丢旧保护。good/bad/missing/unchanged 应可执行且不自改标准答案。每项有正常调用和真实结果消费，旧结果仅在身份/输入/标准仍匹配时复用。未来 DA 只薄转换原生结果，不实现中央协议/Hook/后台。

## 准入与输出

分别区分：
- 已有合法批准覆盖的确定性小回归：沿原入口继续，不因本协调审查重复冻结。
- 本包新增机制、观察器、专业标准或重大假绿修复：对完整冻结 scope 做本次 execution-ready 审查，不能 Planner 自签。
- 必须真实权限/独立产品证据的后续动作：不是 Critic 可授予权限；仅拦依赖路径。
- 可由 Executor 正常读源/环境预检解决的事项：不给无意义 HUMAN_ONLY。

按六仓输出短表：`repo | reviewed task commit/blob | covered existing authority | decision | READY_FOR_CODEX | exact approved scope | excluded live effects | blockers/evidence`。遵守角色合同的阶段语义：中间审查 PROCEED/REVISE，完整执行包实质可执行才给唯一 execution-ready PASS 且 READY_FOR_CODEX=YES；PASS 只指准备包，不是产品通过。若尚有真正 Planner 决策没定，具体列出最小 REVISE，不把它藏成“实现时再决定”。

不能一个仓 PASS 覆盖另五仓，也不能一个仓 REVISE 阻止其他已有批准范围。当前未运行数量全部保持未填写。确认每仓结束强制回报 NEW_VALIDATORS、ENHANCED_VALIDATORS、NEW_REGRESSION_CASES、REUSED_VALIDATORS、MERGED_OR_RETIRED、ACTUALLY_RUN、NOT_RUN_OR_UNKNOWN、HISTORICAL_COVERAGE、FUTURE_DA_ADAPTER_ENTRY，并逐项中文解释作用与证据。

批准后直接从同一冻结 task 渲染简短 Codex handoff，带准确仓库/既有分支、task/review引用、必要权限与停止条件；不临场换 Goal、创建分支/线程或复制整套中央方案。需要修订则保留同任务文件，返回具体 blocker 与最小改动。

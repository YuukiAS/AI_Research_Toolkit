# 独立Critic审查包：Delivery Assurance总体架构

**审查阶段：总体架构中间审查，结论仅PROCEED / REVISE。当前设计有核心阻塞，READY_FOR_CODEX=NO。** 本包不含已批准Goal，不委任新线程，不授予生产执行或资源权限。Planner只提供候选与内部反证，尚无独立Critic结论。

## 1. 独立审查对象与完整承诺

target_repo = YuukiAS/AI_Research_Toolkit  
source_branch = research/software-production-decision-20261013  
design_topic = delivery-assurance--global-architecture  
proposal_path = docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/  
review_stage = architecture_intermediate  
研究输入固定基线 = f1426b6322870c7a9d42d83ff6ea7ad8a35837a3  
proposal_commit = Critic开始时实际读取该既有分支HEAD并固定；本包内相对链接按该HEAD读取，不能跨研究版本拼接。源码则按下列各自固定SHA。

核心承诺不是“生成验收文件”：普通用户表达功能/科研目标后，系统在支持的正常入口保留不可降级目标、发现并保护旧行为、复用成熟实现、补缺验收、真实调用并读取结果、在原权限预算内同任务返修、验证最终消费对象、清楚报告，用户不当第一轮QA/配置维护者/Reviewer消息转发员。真正不可推导产品/科学选择、凭据、账号、设备、费用和发布仍属用户。

必须先独立读原要求，再评价本提案：
- [本次完整正式研究指令](https://github.com/YuukiAS/AI_Research_Toolkit/blob/f1426b6322870c7a9d42d83ff6ea7ad8a35837a3/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/01_GPT_WORK_FULL_ARCHITECTURE_PROMPT.md)
- [连续用户要求与纠错](https://github.com/YuukiAS/AI_Research_Toolkit/blob/f1426b6322870c7a9d42d83ff6ea7ad8a35837a3/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/00_USER_REQUIREMENTS_AND_GAPS.md)
- [36职责与315问题原文](https://github.com/YuukiAS/AI_Research_Toolkit/blob/f1426b6322870c7a9d42d83ff6ea7ad8a35837a3/docs/research/software-production/21_DELIVERY_ASSURANCE_COMPONENT_AND_QUESTION_INVENTORY_20261022.md)

正式角色来源是AI Skills main：本轮读到Planner/Critic v1.7、Capability Gate v1.2，均在f1de8e85。Critic开始新轮次须核对最新main是否变化，差异明确说明，不偷偷用漂移版重解释本研究事实。

## 2. 阅读导航与单一权威

|文件|审查用途|
|---|---|
|[README](README.md)、[CURRENT](CURRENT.md)、[写入探针](00_GITHUB_WRITE_PROBE.md)|状态、范围、实际GitHub写入与顺序偏差|
|[01现实与替代](01_REALITY_AND_ALTERNATIVES.md)|已有/设计/未知，至少三条路线及取舍|
|[02整体架构](02_ARCHITECTURE_AND_COMPONENTS.md)|K1–K5必要性、真实接点、消息流、生命周期与否决|
|[03调用与验收器](03_END_TO_END_EXECUTION_AND_VALIDATORS.md)|普通请求、各执行模式、格式/算法/失败逐跳、216问|
|[04七仓](04_SEVEN_REPOSITORY_ADOPTION.md)|三个深度故事、四条关键链、七仓63问|
|[05 CSV](05_HISTORICAL_COVERAGE.csv)、[05摘要](05_COVERAGE_SUMMARY.md)|823行原文索引、35机制外键、36反例与G1–G6；不是运行覆盖|
|[06阶段合同](06_IMPLEMENTATION_AND_EVALUATION.md)|前置冻结、源码包、试点、成本、发行/适配/退出|
|[08可直接转交的Critic指令](08_CRITIC_PROMPT.md)|无本对话也可启动独立审查|

在大量案例之间存在冲突时，以当前用户正式研究范围、当前项目authority、真实源码/原报告为证；不要以本CSV分类覆盖原证据。03/04是调用与项目语义权威，05通过外键定位不复制全部机制；06只定义分包，不擅自改产品完成语义。E11与04末尾记录后续源码反证，前文已同步纠正。

## 3. 本轮真正改变的架构选择

1. 不默认v0.5正确。推荐B共享小型纯函数＋A既有入口消费＋C成熟专业runner；拒绝新中央daemon/任务数据库/统一评分器/第四Bridge workflow。
2. 不把36职责/26族/363事故变成同数量模块；五组职责在原source owner内实现。
3. 从用户目标构造expected obligations，再匹配检查；不能把已有测试数组当完整需求。未知旧行为单独保留G2。
4. 从产品自报数据移到原始来源、真实后置观察与独立参考；包hash防错身份，不证明防同用户伪造。
5. 从FAIL文件移到原执行者实际接收、ack、合法动作和fresh run；没有活跃消费者就是G4。
6. 普通原生无包入口是核心目标；不能静默排除。Hook失效仍缺完整保障G1，替代受管入口不是已批准等价方案。
7. 同产品任务不等于同App thread、同run或永久同Parent。CUHK换snapshot须新活动；Mica手动登录态、CARE科学Planner界限必须保留。
8. 旧da/1 freeze存在真实语义冲突G6；禁止继承旧PROCEED直接实施。新schema/version尚未批准。

## 4. 需Critic直接裁定的阻塞

|问题|Planner当前证据|需要独立判断|
|---|---|---|
|G1 无Hook/信任失败下普通任务|官方存在事件，但覆盖不完整；Phase1整体NO_GO|能否保持原用户承诺？有无更优可实现最低摩擦入口？不能以排除普通入口批准|
|G2 旧行为遗漏|公开入口与依赖普查设计，不能完备发现隐藏语义|保护范围和UNKNOWN处理是否可落地，是否又逼用户手写清单|
|G3 独立观察/反自签|Mica有协调变异控制；Asteria指标常量；CARE恢复检验不足|候选、oracle、observer谁可写？实际信任边界是否充分？新增方案是否只多hash|
|G4 反馈消费/长期恢复|Bridge函数存在，Controller运行及传输端到端未证|每条箭头的接收函数、持久owner、去重、预算、中断能否真实实现|
|G5 最终产品环境|本轮仅源码与历史文本；没有实机/账号/部署/GPU|每仓还必须证明什么，哪些是必须人类动作，低层证据有没有被升格|
|G6 接口冻结/迁移|本稿schema示例不等da/1；required/语义变化已明确|该冻结决定应如何重新形成，消费者兼容成本是否否决共享层|

这些问题不能由“以后实现时补”关闭。可提出最小隔离探针与证据要求，但在关键选择没确定前总体仍不得发执行Goal。若独立Critic认为只能批准一个更窄目标，必须标为scope-change建议，不能当原目标PROCEED。

## 5. 关键事实核对，不接受旧结论继承

- **Phase1主链可行不等整体合格。** [FINAL_RESULT](https://github.com/YuukiAS/AI_Research_Toolkit/blob/f1426b6322870c7a9d42d83ff6ea7ad8a35837a3/docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/phase1_hook_probe_r5/attempt_2/FINAL_RESULT.md)记执行完整性失败/NO_GO；[场景结果](https://github.com/YuukiAS/AI_Research_Toolkit/blob/f1426b6322870c7a9d42d83ff6ea7ad8a35837a3/docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/phase1_hook_probe_r5/attempt_2/SCENARIO_RESULTS.md)可说明部分机制。若旧提案叫GO，以实际原报告区分局部与整体，不能继承许可。
- **未hook路径没有DA PASS不代表原生UI不会假完成。** 需要危险下游确实被拦或真实正向能力，不是“没有日志”。
- **Asteria不能笼统说所有指标都假。** static crossing/floating常0、ratio默认0；browser crossing常0，floating有实际测量。源码审查需逐字段。
- **Mica不能说内存全面改善。** 历史57fa880 candidate相对B的process private memory升1.67%，heap降93.75%，target-class非物理设备；当前HEAD与真实登录态未签。
- **SeminarArc历史OCR 0/5已撤销。** 选择器误读造成假阴性；9/9历史照片与外部音频盘点不等全部媒体导入已实现。
- **CARE不能把600步科学FAIL与validator PASS合并。** 证据链合格与科学结论分别判断；14,000步当前另入口不替历史500/1800合同。
- **Bobbio有效0.3在develop。** 本轮补查develop真实read/authorize/mutate，不用main代签；本地ready仍非final native。
- **CUHK注册假绿的根因有用户语义。** 随机不同密码+fetch跳过可见表单掩盖真实422，不能只加一个状态码断言。

## 6. 冻结来源索引

以下链接为本轮实际读取的文本源码/规则/报告，提供审查最小入口；03/04另有具体行号。路径是证据定位，不意味着本轮执行过程序或访问过私有原数据/截图。原报告引用的外部附件如需结论必须由Critic实际取得，否则标缺证。

### AI Skills／source与角色

固定版本：`AI_Skills_Collection@f1de8e85957d32a50f4458349f450ec65add13bb`。

- [AGENTS.md](https://github.com/YuukiAS/AI_Skills_Collection/blob/f1de8e85957d32a50f4458349f450ec65add13bb/AGENTS.md)
- [docs/workflows/PLANNER_ROLE_CONTRACT.md](https://github.com/YuukiAS/AI_Skills_Collection/blob/f1de8e85957d32a50f4458349f450ec65add13bb/docs/workflows/PLANNER_ROLE_CONTRACT.md)
- [docs/workflows/CRITIC_ROLE_CONTRACT.md](https://github.com/YuukiAS/AI_Skills_Collection/blob/f1de8e85957d32a50f4458349f450ec65add13bb/docs/workflows/CRITIC_ROLE_CONTRACT.md)
- [docs/workflows/PLUGIN_CAPABILITY_GATE_POLICY.md](https://github.com/YuukiAS/AI_Skills_Collection/blob/f1de8e85957d32a50f4458349f450ec65add13bb/docs/workflows/PLUGIN_CAPABILITY_GATE_POLICY.md)
- [docs/workflows/AI_SKILLS_MAINTENANCE_BOARD.md](https://github.com/YuukiAS/AI_Skills_Collection/blob/f1de8e85957d32a50f4458349f450ec65add13bb/docs/workflows/AI_SKILLS_MAINTENANCE_BOARD.md)
- [skills/core/codex-system/codex-workflow-protocol/SKILL.md](https://github.com/YuukiAS/AI_Skills_Collection/blob/f1de8e85957d32a50f4458349f450ec65add13bb/skills/core/codex-system/codex-workflow-protocol/SKILL.md)
- [scripts/build_codex_marketplace.py](https://github.com/YuukiAS/AI_Skills_Collection/blob/f1de8e85957d32a50f4458349f450ec65add13bb/scripts/build_codex_marketplace.py)

### Bridge正式release

固定版本：`GPT_Codex_AI_Bridge_Kit@ba9013b9fbbd242e51b09f9d09291f417df17652`。

- [AGENTS.md](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/ba9013b9fbbd242e51b09f9d09291f417df17652/AGENTS.md)
- [ai_bridge_kit/cli.py](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/ba9013b9fbbd242e51b09f9d09291f417df17652/ai_bridge_kit/cli.py)
- [ai_bridge_kit/readiness.py](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/ba9013b9fbbd242e51b09f9d09291f417df17652/ai_bridge_kit/readiness.py)
- [ai_bridge_kit/reviewed_runner.py](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/ba9013b9fbbd242e51b09f9d09291f417df17652/ai_bridge_kit/reviewed_runner.py)
- [ai_bridge_kit/agent_flow.py](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/ba9013b9fbbd242e51b09f9d09291f417df17652/ai_bridge_kit/agent_flow.py)
- [ai_bridge_kit/persistent_run.py](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/ba9013b9fbbd242e51b09f9d09291f417df17652/ai_bridge_kit/persistent_run.py)
- [ai_bridge_kit/host.py](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/ba9013b9fbbd242e51b09f9d09291f417df17652/ai_bridge_kit/host.py)
- [codex/AGENTS_SNIPPET.md](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/ba9013b9fbbd242e51b09f9d09291f417df17652/codex/AGENTS_SNIPPET.md)
- [docs/V0_5_REVIEWED_HANDOFF_IMPLEMENTATION_SPEC.md](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/ba9013b9fbbd242e51b09f9d09291f417df17652/docs/V0_5_REVIEWED_HANDOFF_IMPLEMENTATION_SPEC.md)
- [docs/V0_4_AGENT_FLOW_IMPLEMENTATION_SPEC.md](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/ba9013b9fbbd242e51b09f9d09291f417df17652/docs/V0_4_AGENT_FLOW_IMPLEMENTATION_SPEC.md)

### Bridge实际开发分支

固定版本：`GPT_Codex_AI_Bridge_Kit@7f43e146eed50d290ef9cc6ab912d106f754042c`。

- [AGENTS.md](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/7f43e146eed50d290ef9cc6ab912d106f754042c/AGENTS.md)
- [ai_bridge_kit/cli.py](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/7f43e146eed50d290ef9cc6ab912d106f754042c/ai_bridge_kit/cli.py)
- [ai_bridge_kit/agent_flow.py](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/7f43e146eed50d290ef9cc6ab912d106f754042c/ai_bridge_kit/agent_flow.py)

### CAT-TRACE表达与机制参照

固定版本：`CAT-TRACE@0d829fb17c458a076a15ec51893e917960107c21`。

- [presentations/group_meetings/2026-10-21/CAT_TRACE_ANONYMOUS_ZERO_COLUMNS_INFERENCE_20261021.md](https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/presentations/group_meetings/2026-10-21/CAT_TRACE_ANONYMOUS_ZERO_COLUMNS_INFERENCE_20261021.md)
- [docs/implementation/architecture/CAT_TRACE_ZERO_SLOT_ARCHITECTURE_GUIDE_20261014.md](https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/architecture/CAT_TRACE_ZERO_SLOT_ARCHITECTURE_GUIDE_20261014.md)

### Lucerna

固定版本：`Lucerna@79dd2875d3da33c6a6d80e5e35bea812b84c1ceb`。

- [AGENTS.md](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/AGENTS.md)
- [src-tauri/src/provider_runtime.rs](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/src-tauri/src/provider_runtime.rs)
- [src-tauri/src/codex_quota.rs](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/src-tauri/src/codex_quota.rs)
- [src-tauri/src/lib.rs](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/src-tauri/src/lib.rs)
- [scripts/development-acceptance.ps1](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/scripts/development-acceptance.ps1)
- [scripts/acceptance-preflight.ps1](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/scripts/acceptance-preflight.ps1)
- [docs/workflows/LUCERNA_EXECUTION_FAILURE_HISTORY.md](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/docs/workflows/LUCERNA_EXECUTION_FAILURE_HISTORY.md)

### Bobbio develop

固定版本：`Bobbio@a64edfd6c5b11f81599bfcfc327be5964633a7b5`。

- [AGENTS.md](https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/AGENTS.md)
- [docs/CURRENT_MILESTONE.md](https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/docs/CURRENT_MILESTONE.md)
- [scripts/Invoke-BobbioReaderAcceptanceSafe.ps1](https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/scripts/Invoke-BobbioReaderAcceptanceSafe.ps1)
- [src-tauri/src/zotero_client.rs](https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/src-tauri/src/zotero_client.rs)

### Mica重构分支

固定版本：`Mica-for-ChatGPT@0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c`。

- [AGENTS.md](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/AGENTS.md)
- [package.json](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/package.json)
- [scripts/acceptance/cli.mjs](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/scripts/acceptance/cli.mjs)
- [scripts/acceptance/validator.mjs](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/scripts/acceptance/validator.mjs)
- [extension/src/low-memory/low-memory-background.ts](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/extension/src/low-memory/low-memory-background.ts)
- [results/mica-product-system-rebuild/foundation-review-r4-repair.md](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/results/mica-product-system-rebuild/foundation-review-r4-repair.md)
- [results/mica-product-system-rebuild/low-memory-candidate-report.md](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/results/mica-product-system-rebuild/low-memory-candidate-report.md)

### SeminarArc

固定版本：`SeminarArc@5652fe17ce60625f3ff7c758fcc0183f920189de`。

- [AGENTS.md](https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/AGENTS.md)
- [scripts/run-blackbox-acceptance.ps1](https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/scripts/run-blackbox-acceptance.ps1)
- [scripts/verify-gpt-work-acceptance.ps1](https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/scripts/verify-gpt-work-acceptance.ps1)
- [prompts/tasks/0.5.x_real_world_media_corpus_round_02_result.md](https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/prompts/tasks/0.5.x_real_world_media_corpus_round_02_result.md)

### Asteria

固定版本：`Asteria@193c033659a7612a99442763077217b130e9b756`。

- [AGENTS.md](https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/AGENTS.md)
- [scripts/validate-architecture-rc19.mjs](https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/scripts/validate-architecture-rc19.mjs)
- [tests/browser/asteria-v2-rc.spec.ts](https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/tests/browser/asteria-v2-rc.spec.ts)
- [src/architecture/projection.ts](https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/src/architecture/projection.ts)
- [docs/operations/acceptance/RC11_PRE_WORK_VISUAL_REVIEW_FAILURE_2026-09-13.md](https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/docs/operations/acceptance/RC11_PRE_WORK_VISUAL_REVIEW_FAILURE_2026-09-13.md)
- [results/asteria--rc19-layout-first-graph-convergence/result.md](https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/results/asteria--rc19-layout-first-graph-convergence/result.md)

### CUHK_Date

固定版本：`CUHK_Date@9f25c7754d3c80d0be74f5b71016320f55753ae6`。

- [AGENTS.md](https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/AGENTS.md)
- [packages/api-contract/src/parent-delivery-gate.ts](https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/packages/api-contract/src/parent-delivery-gate.ts)
- [apps/web/app/(root)/audit/handoff/handler.ts](https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/apps/web/app/(root)/audit/handoff/handler.ts)
- [docs/operations/blackbox-audit/CAMPAIGN_ORCHESTRATION.md](https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/blackbox-audit/CAMPAIGN_ORCHESTRATION.md)
- [docs/operations/prompts/CODEX_REPAIR_REAL_REGISTRATION_CRITICAL_PATH_AND_FALSE_GREEN_HARNESS_2026-09-24.md](https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/prompts/CODEX_REPAIR_REAL_REGISTRATION_CRITICAL_PATH_AND_FALSE_GREEN_HARNESS_2026-09-24.md)
- [docs/operations/HANDOFF_CLAIM_LEASE_FINAL_REPAIR_2026-10-04.md](https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/HANDOFF_CLAIM_LEASE_FINAL_REPAIR_2026-10-04.md)

### CARE

固定版本：`CARE_Challenge@75a40e454de43b64e59a0b0b438ff57ef2bb8345`。

- [AGENTS.md](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/AGENTS.md)
- [START_HERE_FOR_GPT.md](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/START_HERE_FOR_GPT.md)
- [GPT_PLANNER_CARE_PROTOCOL.md](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/GPT_PLANNER_CARE_PROTOCOL.md)
- [prompts/routes/handoffs/CURRENT.md](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/routes/handoffs/CURRENT.md)
- [prompts/routes/ROUTE_ANTI_LAZINESS_PROTOCOL.md](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/routes/ROUTE_ANTI_LAZINESS_PROTOCOL.md)
- [scripts/ops/care_milestone_finalizer.py](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/scripts/ops/care_milestone_finalizer.py)
- [scripts/training/care_ase/run_care_ase_train.py](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/scripts/training/care_ase/run_care_ase_train.py)
- [scripts/validation/validate_care_ase_freeze_reload.py](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/scripts/validation/validate_care_ase_freeze_reload.py)
- [scripts/validation/validate_srr_v25_anti_laziness.py](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/scripts/validation/validate_srr_v25_anti_laziness.py)
- [results/20260704_srr_v25_anti_laziness_acceptance_tests/result.md](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/20260704_srr_v25_anti_laziness_acceptance_tests/result.md)
- [prompts/tasks/20260721_srr_batch7_mechanism_closure_repair_controller.md](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/tasks/20260721_srr_batch7_mechanism_closure_repair_controller.md)
- [results/20260721_srr_batch7_mechanism_closure_repair/training_stage_adequacy.json](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/20260721_srr_batch7_mechanism_closure_repair/training_stage_adequacy.json)
- [results/20260721_srr_batch7_mechanism_closure_repair/validator_status.json](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/20260721_srr_batch7_mechanism_closure_repair/validator_status.json)

### 历史材料与旧候选

- [83旧要求的原整理](https://github.com/YuukiAS/AI_Research_Toolkit/blob/f1426b6322870c7a9d42d83ff6ea7ad8a35837a3/docs/research/software-production/12_COMPLEX_DELIVERY_REQUIREMENTS_INTAKE_20261015/00_COMPLETE_USER_REQUIREMENTS.md)
- [363历史原始证据索引](https://github.com/YuukiAS/AI_Research_Toolkit/blob/f1426b6322870c7a9d42d83ff6ea7ad8a35837a3/docs/research/software-production/12_COMPLEX_DELIVERY_REQUIREMENTS_INTAKE_20261015/PRO_INPUT/03_HISTORICAL_FAILURES_SOURCE_INDEX.csv)
- [旧83映射](https://github.com/YuukiAS/AI_Research_Toolkit/blob/f1426b6322870c7a9d42d83ff6ea7ad8a35837a3/docs/research/software-production/17_DELIVERY_ASSURANCE_ARCHITECTURE_CLOSURE_GPT_WORK_R0/01A_ALL_83_REQUIREMENT_ARCHITECTURE_COVERAGE.csv)
- [旧363分类映射](https://github.com/YuukiAS/AI_Research_Toolkit/blob/f1426b6322870c7a9d42d83ff6ea7ad8a35837a3/docs/research/software-production/17_DELIVERY_ASSURANCE_ARCHITECTURE_CLOSURE_GPT_WORK_R0/02_ALL_363_FAILURE_COVERAGE.csv)
- [旧26能力族](https://github.com/YuukiAS/AI_Research_Toolkit/blob/f1426b6322870c7a9d42d83ff6ea7ad8a35837a3/docs/research/software-production/17_DELIVERY_ASSURANCE_ARCHITECTURE_CLOSURE_GPT_WORK_R0/03_MANUAL_GATE_FAMILIES.md)
- [旧总体合同](https://github.com/YuukiAS/AI_Research_Toolkit/blob/f1426b6322870c7a9d42d83ff6ea7ad8a35837a3/docs/research/software-production/17_DELIVERY_ASSURANCE_ARCHITECTURE_CLOSURE_GPT_WORK_R0/06_FINAL_ARCHITECTURE_CONTRACT.md)
- [旧七仓附录](https://github.com/YuukiAS/AI_Research_Toolkit/blob/f1426b6322870c7a9d42d83ff6ea7ad8a35837a3/docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_SEVEN_CONSUMER_ADOPTION_ANNEX_V0_1_20261019.md)
- [旧da/1冻结](https://github.com/YuukiAS/AI_Research_Toolkit/blob/f1426b6322870c7a9d42d83ff6ea7ad8a35837a3/docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_PUBLIC_DA1_INTERFACE_FREEZE_V1_20261020.md)
- [旧实施包索引](https://github.com/YuukiAS/AI_Research_Toolkit/blob/f1426b6322870c7a9d42d83ff6ea7ad8a35837a3/docs/research/software-production/19_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_2_20261020/README.md)
- [旧workflow-core包](https://github.com/YuukiAS/AI_Research_Toolkit/blob/f1426b6322870c7a9d42d83ff6ea7ad8a35837a3/docs/research/software-production/19_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_2_20261020/01_WORKFLOW_CORE_RESOLVER_V0_2.md)
- [旧Bridge包](https://github.com/YuukiAS/AI_Research_Toolkit/blob/f1426b6322870c7a9d42d83ff6ea7ad8a35837a3/docs/research/software-production/19_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_2_20261020/02_BRIDGE_RUNTIME_V0_2.md)
- [旧v0.5目录](https://github.com/YuukiAS/AI_Research_Toolkit/tree/f1426b6322870c7a9d42d83ff6ea7ad8a35837a3/docs/research/software-production/20_DELIVERY_ASSURANCE_USER_VALUE_REVISION_V0_5_20261022)：只作待审提案，不作为本轮默认正确性依据。

### 平台官方资料与推论边界

本轮查阅[Codex Hooks](https://learn.chatgpt.com/docs/hooks)、[插件构建](https://developers.openai.com/plugins/build/plugins)、[Skills](https://developers.openai.com/plugins/concepts/skills)和[GitHub required checks](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks)。平台规范会变化，独立Critic应核实当前版本；文档支持接口存在，不等本机或全部宿主已实现本方案。01记录已知边界；其余“拟on_prompt”等均为研究设计。

## 7. 全量与盲审方法

机器清点：36职责＋216公共＋63七仓＋36反例＋363历史＋83需求＋26族＝823行；315问分别在03/04/05实际答复。CSV将重复机制归一到05的PROJECT/FAMILY字典，必须联结后审查；缺字典/错来源/原问题被删均属材料缺陷。

37条关联原材料抽查为定向选择而非统计样本；326条历史当前状态UNKNOWN。不能从它推导当前七仓363bug、检出率或“已覆盖全部事故”。

盲审先读原要求与某条原始故障，暂不读该CSV结论；独立写完整处理链再比对。样本由Critic选，至少包含历史已修、observer误判、评分器问题、科学负结论及未准备普通功能。每条必须落到“谁调用、谁接收、如何识别、为何这次跑、失败怎样继续、怎样关闭、用户看到什么”。不用Planner给定案例全部通过代替任意抽取能力。

## 8. 研究完整性与严格限制

实际写入成功且回读先于大规模研究，首次提交c935e0aa4ded7fa4b8584d6bf106979c04e9e19c。**严格动作顺序存在偏差**：最初两项调用发现GitHub工具schema，第一个GitHub资源操作是创建探针；权限与branch保护信息在成功回读后补查，起始SHA从parent回溯，随机标识也后补。00已明确，不能报告完全满足“先查询权限再写”的逐操作顺序。真实写入/回读确实成功，没有本地替代。

每个阶段直接写入同一既有研究分支WORK_OUTPUT并回读，CURRENT逐阶段更新。CSV初版超过Contents直接回传范围，核对自有Git blob后规范化到可完整回读大小；05记录修复，不把空内容返回当成功。本包只含研究材料；未修改生产源/状态/规则/分支拓扑/发布，未创建任务、handoff、fork、后台线程、自动化或subagent。

没有本轮视觉检查、真实GUI、浏览器账号、Zotero、Android、私有医学数据、GPU/Slurm、部署/付费/正式release。报告中good/bad链是待实现设计或明确标注的历史事实。没有独立Critic PASS；没有可执行Goal；研究整理可供审查不等整体架构闭合或产品完成。

## 9. 独立结果应长什么样

先用自然中文说明推荐组合是否真的减少用户工作、有没有更简单可行替代，再给PROCEED或REVISE。每项发现包含原要求、固定源码/行或实际缺证、触发请求、缺失/错误箭头、用户影响、最小设计/补证修订及责任owner。明确architecture_closed与READY_FOR_CODEX=NO，避免把中间PROCEED当执行许可。

如需重开G1/G3/G4/G6，不要求实现者临场选架构；把准确决策返回Planner在同研究目录修订。若只有运行证据缺失，说明它影响何种声明，仍不允许伪造完整完成。审查者不需要从本对话取回隐含信息；发现本包不自足本身就是REVISE依据。

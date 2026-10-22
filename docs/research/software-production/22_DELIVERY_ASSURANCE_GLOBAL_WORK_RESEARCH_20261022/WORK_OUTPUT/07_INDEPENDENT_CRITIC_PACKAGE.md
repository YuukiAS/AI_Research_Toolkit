# Delivery Assurance 独立审查材料与来源索引

**独立 Critic R1 已给 REVISE；本轮是原 Planner 对同一架构的五项返修。** 意见来自用户转交正文，稳定编号 DA-AR-01..05，审查基线为369b4ae4a534a7d87be11a36e7c4b3ca9114e0c7，原技术源28eded9ff482ff2377804ebac012c0dc36e8ebe5。五项均ACCEPT，不把前轮“已闭合”继承为本轮结论。下文给修订决定及新证据；新固定技术源与包身份见CURRENT。本轮尚无新的独立结论，未获生产实施授权。

已接受的有界混合方案不再询问：正常受支持Codex自动接入，受管交付强制真实验收；Hook完全缺席不保证撤回已发原生聊天；不建设新客户端、常驻调度器、第二任务库、第四工作流或万能评分器。目标仍是减少用户提醒、发现假完成、搬运失败和催促原任务返修。

## 1. 原目标与推荐结果

用户希望普通功能请求自动带出真实标准、旧功能保护、必要验收、原任务返修、实际成品与简洁中文报告，少承担“补测试、指出假实现、搬运失败、反复继续”的工作。推荐采用Bridge既有入口＋workflow-core小型纯函数库＋七仓原runner，原交付出口独立核验。没有新daemon、任务数据库、统一科学评分或第四workflow。

实质变化在于失败被当前执行者真正收到并修复；旧功能来自真实入口/前后依赖而不只是手工清单；最终对象分开核验；标准/collector/产品不同错；版本迁移不会让旧reader忽略新必需约束。实现状态全部为设计或已有源码依据，尚无生产DA调用验收。

## 2. 审查对象与唯一权威

仓库YuukiAS/AI_Research_Toolkit，既有分支research/software-production-decision-20261013，本WORK_OUTPUT为唯一续研真值。开始独立审查前固定分支HEAD作为proposal_commit，所有研究文件按同commit读。不能用早期db8beae/b6ca旧包或旧da/1批准代签当前方案。09、10是用户续研合同，本轮均未修改。优先使用当前用户最终交接消息中的精确package commit；无消息时读取分支一次并固定HEAD，核对CURRENT的architecture_source_commit，不在审查中追随移动HEAD。

读者主线：02整体因果链→03完整调用/字段/接收/恢复→04三条深链＋七仓合同/新请求推演→06阶段/成本/退出。01给事实/替代/官方边界；05给315问、83要求、363历史反向审查；本页提供源码。08为条件满足后可直接用的完整审查指令。README/CURRENT先解释可用状态，机器字段留详细合同。

## 3. 保留的整体架构骨架与本轮修订位置

|决定|可否决的具体内容|正式位置|
|---|---|---|
|D1|已信任普通入口接入＋原交付边界准入；Stop不撤回消息、失败不天然fail-closed；不偷换入口承诺|01 D1、02|
|D2|真实入口分母、语义确认、旧/新图并集、反向闭包、孤儿与动态未知扩围、有效复用、独立抽样|03 D2|
|D3|机械/产品/受保护三档；冻结标准与独立观察；四历史误判明确分流；same-user hash不是防伪|03 D3|
|D4|工具返回/Stop后续ack、Lite/Review有限精确resume、Control具体adapter及Executor/Verifier双路径、原Controller step、七仓原接收者|03 D4及末尾反例修订|
|D5|七仓最终对象、数量/时间/权限上限、好坏旧控制和回收；另七个普通任务推演|04 D5|
|D6|新da/2提案，旧da/1诊断读取，完整字段/reader握手/迁移/回退；PIE相邻合同适配|03 D6|

已修掉初稿的四个明确设计缺陷：Lite仅留文件没有续修选择；Control抽象adapter被误当可运行；结果Receipt与claim潜在循环；送审前要求独立审查通过的循环。没有把这些留给后续Codex决定。仍应由Critic寻找新缺陷。

## 4. 已确认产品边界与运行未证

**用户已作出的决定：** 已接受“正常受支持的原生入口尽量自动接入，受管交付前强制核验；Hook 缺席时不能保证拦截聊天中已生成的错误完成文字”。日常低摩擦及减少用户提醒、错误搬运仍是首要目标；实际支持范围和消费路径见01宿主矩阵、03 F1–F5，不能以设计决定替代运行证据。

原生聊天绝对拦截的替代路线（另建受管展示入口或等待平台发送前门）已被用户明确放弃为本轮目标，不再要求重选；此决定不提供生产授权、不降低受管交付质量要求。该边界由10合同和用户当前消息正式确认；Critic 应审技术接线，不重复询问该选择。

设备/账号/平台运行证据另列：Windows Desktop/CLI/Remote/Control新adapter尚未实测；Bobbio隔离Zotero、Mica真实加载与手动登录态、Android硬件、Asteria完整图/固定URL、CUHK真实campaign、CARE科学实跑均未验证。04/06已确定实验，不要求用户此刻授权这些动作。不因这些未运行停止其它设计，也不凭设计推演宣称PASS。

## 5. 独立审查重点

下一轮范围限定为DA-AR-01..05的修订及其连带影响；不能借此重开已接受产品边界或要求新平台。必须重新走正常用户完整路径，不能只做字段diff。原有无循环回执、父子锁、共享预算、科学负结果、材料/最终分层仍须检查未被破坏。

审已选机制，不替Planner选择缺失接口。必须攻击：无事件普通聊天、缺原请求、空义务、删除旧入口、动态未知、标准/expected协同改松、错误collector、不同候选拼绿、工作镜像与归档错配、Hook递送未被接收、精确resume返回新thread、Control Verifier缺合法环境、用户取消竞态、重复事件、副作用重发、预算重复领取、外部stale review、科学负结果被刷正、da/1误升da/2，以及小任务新增成本无收益。

三条深链逐跳到真实源码；另外从原历史输入与未准备任务自行抽查。少一个接收者、偷改目标或只剩文件箭头应REVISE；仅因后续需真实运行而无限要求设计增加平台也不合理。原生文字边界已经确认；应核查例外仅限聊天，不能转成受管交付豁免。

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


### 续研新增固定源码与最新标准

- [最新通用设计指南@f4a1233](https://github.com/YuukiAS/AI_Research_Toolkit/blob/f4a1233d59817867bc4c40b541f480695d947440/COMPLEX_SYSTEM_DESIGN_GUIDE.md)；[可信解释标准](https://github.com/YuukiAS/AI_Research_Toolkit/blob/f4a1233d59817867bc4c40b541f480695d947440/COMPLEX_ARCHITECTURE_EXPLANATION_STANDARD.md)。恢复时70812bd已读，收尾发现main变化后完整重读新版。
- OpenAI [LICENSE](https://github.com/openai/codex/blob/2a77e82f09212c9e1bbf02656afca5d8172c5f9e/LICENSE)、[Stop分派](https://github.com/openai/codex/blob/2a77e82f09212c9e1bbf02656afca5d8172c5f9e/codex-rs/hooks/src/events/stop.rs)、[turn消费](https://github.com/openai/codex/blob/2a77e82f09212c9e1bbf02656afca5d8172c5f9e/codex-rs/core/src/session/turn.rs#L723)、[JSONL事件](https://github.com/openai/codex/blob/2a77e82f09212c9e1bbf02656afca5d8172c5f9e/codex-rs/exec/src/exec_events.rs)、[resume参数](https://github.com/openai/codex/blob/2a77e82f09212c9e1bbf02656afca5d8172c5f9e/codex-rs/exec/src/cli.rs#L238)、[thread resume调用](https://github.com/openai/codex/blob/2a77e82f09212c9e1bbf02656afca5d8172c5f9e/codex-rs/exec/src/lib.rs#L1029)：仅作为源码支持，不代表用户安装同版本。
- 官方 [Hooks](https://learn.chatgpt.com/docs/hooks)、[安全机制边界](https://learn.chatgpt.com/docs/enterprise/security-cookbook)、[配置](https://learn.chatgpt.com/docs/config-file/config-reference)、[App Server](https://learn.chatgpt.com/docs/app-server)、[Goals](https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex)：核查事件/受管信任、steer/resume与Goal等待边界，不据此创建任务。
- [Python os](https://docs.python.org/3/library/os.html#os.open)：O_CREAT/O_EXCL在Unix/Windows提供，replace同文件系统使用；实际崩溃/取消语义仍需逐OS试点。
- [Mica高亮](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/extension/src/features/highlighter/highlight-engine.ts)、[PDF模型](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/extension/src/features/pdf/pdf-export-model.ts)；[SeminarArc导出](https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/app/src/main/java/com/yuukias/seminararc/domain/export/SeminarExportAssembler.kt)；[Asteria导出](https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/src/architecture/export.ts)；[CARE Attempt3实际打包](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/scripts/packaging/run_care_myops_attempt3_single_slice_hotfix.py#L670)：支持04新增普通任务推演，未运行其副作用。
- [PIE待实现da/1引用](https://github.com/YuukiAS/AI_Skills_Collection/blob/f1de8e85957d32a50f4458349f450ec65add13bb/docs/skill-todos/project-instructions-editor.md#L85)：是需迁移的相邻设计引用，不是已上线da/1 reader。

## 7. 材料、覆盖和权限核验口径

823唯一行＝36职责＋216公共＋63七仓＋36反例＋363历史＋83旧要求＋26能力族。原问题/来源/历史状态/当前证据状态逐字段保留；答复与D1–D6同步，定位核验。37条原历史定向材料抽查与326条当前UNKNOWN沿旧口径，不因新增源审读膨胀成已复测案例。CSV用于逆向问责，不作为系统能力证明。

续研先核对实际push权限/目标branch，写00探针并真实回读，提交26233fcbc56ceaffe8752dc4ced8cd5c93b248bf；随后每项实质决定立即写原文件、回读并更新CURRENT。首次研究更早的工具/权限顺序偏差保留00，不追改历史。没有本地成果替代，没有改09用户合同。

本轮仅本WORK_OUTPUT研究文件发生写入。未修改生产源码、规则/状态、分支拓扑或release；未创建任务/subagent/handoff/fork/自动化/后台；未运行真实GUI、账号、Zotero、Android、Docker/GPU/Slurm、私有数据、付费或部署。CARE源码含清输出/tag/load/rm动作，明确只读没有执行。

## 8. 后续审查输出合同

按08和CURRENT的固定proposal commit只读独立审查。先中文解释该组合是否改变真实使用结果，再给PROCEED或REVISE（中间架构结论，不是PASS/执行许可）。每项缺陷带原要求、固定源码、具体请求、错误箭头、用户影响、最小修订与owner。不得用旧PROCEED、文件数或作者自评作判断。READY_FOR_CODEX恒NO；不写Goal、不发起生产工作。

最终CURRENT只有在全包固定提交回读和关键合同复核后才标Planner送审候选。下一入口是用户将08交给独立Critic；本任务不自动启动审查。Critic若发现关键设计缺陷，原Planner回同目录同一方案返修，不新增平行版本。用户无需再次作已确认的产品决定。

## 9. 前轮候选的来源基础与保留机制

本轮研究基线fd0e5e0fa4569aabd538fc1c21724bd97086c064；实际写探针7c35e1ade275e2b776a286e9c6713f894b4a6dda及CURRENT恢复均完整回读。旧阶段的26233f探针和f4a1233指南读取是历史，不替代本轮权限/版本检查。当前研究main为[daf797c](https://github.com/YuukiAS/AI_Research_Toolkit/tree/daf797c79bcd777c27948da51c4218e5d95e7be3)，[设计指南](https://github.com/YuukiAS/AI_Research_Toolkit/blob/daf797c79bcd777c27948da51c4218e5d95e7be3/COMPLEX_SYSTEM_DESIGN_GUIDE.md)未改；[解释标准](https://github.com/YuukiAS/AI_Research_Toolkit/blob/daf797c79bcd777c27948da51c4218e5d95e7be3/COMPLEX_ARCHITECTURE_EXPLANATION_STANDARD.md)新增关键替代比较和连续修订完整解释要求，已完整读取。AI Skills、Bridge、七仓有效源SHA仍匹配上列。

官方Codex新固定[b4ad33d](https://github.com/openai/codex/tree/b4ad33d1a3c10c9652dd57f7afd7a949f8f26895)与原2a77e82之间两提交未改前述Hook/turn/exec文件。新增读取[UserPromptSubmit](https://github.com/openai/codex/blob/b4ad33d1a3c10c9652dd57f7afd7a949f8f26895/codex-rs/hooks/src/events/user_prompt_submit.rs)、[PreToolUse](https://github.com/openai/codex/blob/b4ad33d1a3c10c9652dd57f7afd7a949f8f26895/codex-rs/hooks/src/events/pre_tool_use.rs)。官方Hooks与安全说明重新核查commandWindows、async、输出spill、session/agent身份与cloud差异；安装版本仍未知。

F1封住“语义归纳后原要求消失”的结构缺口：保存全文范围、逐段映射、必需引用、当前模型反向读取、既有专业角色独立从原文重建；不假称纯函数能识别所有语义遗漏。F2逐仓区分材料就绪与USER_READY，并确定唯一Bridge.check_delivery消费者。F3分launch lease/短mutex、防父子互锁、共享reservation预算、实际ack和副作用核对。F4补全类型/旧枚举/摘要与无循环ReceiptLocator。F5以高风险凭据和普通关系追踪贯穿完整生命周期。06裁决最小完整首片及净收益否决，不把全量估算变成总额授权（本轮现行成本见06）。

04新增反证先冻结在[0f9a8fd](https://github.com/YuukiAS/AI_Research_Toolkit/commit/0f9a8fd36c845955e0aa07e5e24b3850e11bc785)，然后追源；它们不是独立holdout，不改37/326历史证据计数。新增源如下：

- Lucerna：[src-tauri/src/auth_intake.rs](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/src-tauri/src/auth_intake.rs)；[src-tauri/src/lib.rs](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/src-tauri/src/lib.rs)。
- Bobbio：[scripts/Invoke-BobbioReaderAcceptanceSafe.ps1](https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/scripts/Invoke-BobbioReaderAcceptanceSafe.ps1)。
- Mica-for-ChatGPT：[scripts/build.mjs](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/scripts/build.mjs)；[extension/src/content.ts](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/extension/src/content.ts)；[extension/src/reliability/send-residual-recovery.ts](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/extension/src/reliability/send-residual-recovery.ts)；[extension/src/reliability/stale-composer-recovery.ts](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/extension/src/reliability/stale-composer-recovery.ts)；[docs/investigations/2026-09-07-stale-composer-clear-recovery.md](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/docs/investigations/2026-09-07-stale-composer-clear-recovery.md)。
- SeminarArc：[prompts/tasks/0.5.x_exploratory_stress_result.md](https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/prompts/tasks/0.5.x_exploratory_stress_result.md)；[scripts/run-blackbox-acceptance.ps1](https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/scripts/run-blackbox-acceptance.ps1)；[scripts/verify-gpt-work-acceptance.ps1](https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/scripts/verify-gpt-work-acceptance.ps1)。
- Asteria：[src/architecture/trace.ts](https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/src/architecture/trace.ts)；[scripts/validate-architecture-rc19.mjs](https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/scripts/validate-architecture-rc19.mjs)。
- CUHK_Date：[apps/api/src/app.ts](https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/apps/api/src/app.ts)；[apps/web/app/(root)/audit/handoff/handler.ts](https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/apps/web/app/\(root\)/audit/handoff/handler.ts)；[packages/api-contract/src/parent-delivery-gate.ts](https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/packages/api-contract/src/parent-delivery-gate.ts)。
- CARE_Challenge：[scripts/training/run_srr_myops_fold0.py](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/scripts/training/run_srr_myops_fold0.py)；[prompts/tasks/20260629_pathology_checkpoint_selection.md](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/tasks/20260629_pathology_checkpoint_selection.md)；[results/20260629_pathology_checkpoint_selection/result.md](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/20260629_pathology_checkpoint_selection/result.md)；[scripts/ops/care_milestone_finalizer.py](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/scripts/ops/care_milestone_finalizer.py)。

审查时必须尝试否决这些具体差别：Mica旧恢复器源码不在当前构建的content scripts；SeminarArc输入注入错误和已收到文本持久化分别判断；Bobbio Safe既含全局更新策略操作又仅证明0.2Reader；CARE快速报告明确少HD/HD95；CUHK消费时health在claim前检查已存在，DA应复用并保护而不是另造服务。Lucerna先验证再保存/启用的多步副作用必须有真实后置状态与恢复；Asteria当前方向遍历已有隔离，历史问题应用作回归而非声称当前仍坏。

## 10. 前轮上游刷新记录（历史定位，不是本轮最新HEAD）

前轮冻结时：研究main仍daf797c79bcd777c27948da51c4218e5d95e7be3，七仓有效SHA和Bridge release均不变。AI Skills main前进到1cd3dfd303097265114ffd912ef003329e2c197b；Bridge dev前进到71ad6874c1cde41548eb66a6c32cea615e055407。两份compare均只新增设计文档，不改生产源码。AI Skills当前AGENTS与四份角色/policy/maintenance文件已按新main回读，blob与此前完全一致；以上f1de8e/7f43e代码链接仍是准确代码基线，不能再将旧值标成最新分支HEAD。

- [PIE新提案](https://github.com/YuukiAS/AI_Skills_Collection/blob/1cd3dfd303097265114ffd912ef003329e2c197b/docs/design/project-instructions-editor/PROJECT_INSTRUCTIONS_EDITOR_0_3_AGENTS_ARCHITECTURE_PROPOSAL_V0_2_2026-10-22.md)：核对模板归属、实际加载/隐式调用和DA边界相关正文。PIE负责编辑，Bridge原模板保留；DA尚未实现不能反向充当PIE自动调用已证。它仍待Critic。
- [Bridge新提案](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/71ad6874c1cde41548eb66a6c32cea615e055407/docs/design/0.11.1_normal_entry_capability_acceptance_proposal_v0.1_2026-10-22.md)：核对Persistent进度/ETA、正常入口、wrapper能力边界与恢复正文。新提案没有改变当前RuntimeAdapter抽象和Lite一次启动的生产事实，也不授权DA启动任何资源。Progress/ETA不是语义完成证据。

03末尾明确“同thread resume成功≠新AGENTS/Skill实际加载”、SOURCE_BINDING_STALE与原合法加载恢复路径；不新建thread绕开精确resume。Persistent仍持有原寿命/恢复，不将缺进度当产品失败。只更新本研究合同，未修改相邻提案、生产源或其它仓跟踪状态。

<a id="r1-review"></a>
## 11. R1 五项意见的正式处置与修订证据

意见原件没有仓库路径。本包准确保留用户转交的五项要求作为审查输入，不编造Critic文件或签字。**五项全部ACCEPT，无REBUT或PARTIAL_ACCEPT。** “Planner已补足设计”与“独立Critic已关闭”分开记录，后者仍待R2。

|稳定ID|接受的缺陷与用户影响|本轮选择、具体消费者及反证|唯一权威|
|---|---|---|---|
|DA-AR-01|原请求自审可能从一开始漏掉重要要求；异步反馈无耐久owner又回到用户搬运|prepare_admission在首次依赖产品写入前消费原材料；风险规则选SELF/既有独立角色；原生必要时低摩擦绑定既有Review；原owner消费独立决定；无receiver限制写入和USER_READY。bootstrap只读及工具边界先经P0|03#r1-ar01、#r1-integration；02整体链|
|DA-AR-02|候选/校准与产品stage混用；“专业owner批准”没有可验证对象|单独CalibrationContext/Report；DefinitionAdmission；四类冻结控制；submit/calibrate/activate；已有专业角色或预冻结机械政策；先不可变回执后CAS active binding。首次adapter出口及旧映射也要准入；未ACTIVE不得正式选测|03#r1-ar02；D6/F4已同步，05联动反例|
|DA-AR-03|只选验收不能防实施时省掉成熟能力；导致反复低质返工|Resolution.execution_capabilities由select/bind/ack和原Executor载荷实际消费；要求版本、真实read/invoke、实现影响；已审project equivalent可替代，缺required限制claim；后台计算文档不强迫前端|03#r1-ar03；CSV REQ-043/065|
|DA-AR-04|角色名没有真正报告出口；专业结果可能无人读，旧PASS可冒完成|七仓固定finalizer命令在原产品副作用前dispatch，独立输入后check_delivery，report重验再原结果writer核绑定；七个BYPASS均要求拒绝；未接真实入口不enable|04#r1-ar04、03阶段绑定与report协议|
|DA-AR-05|先花完整公共层成本才发现宿主不支持，会使关键接线返工|P0实际版本/Hook信任与失败/Stop/JSONL/加载/取消/幂等在产品之外先证；固定支持矩阵及P2回退，关键不支持先回同Planner修路线再实施完整da/2|06#r1-ar05、P0→P1/P2依赖与成本|

### 本轮新刷新及固定源码

研究main仍为daf797c79bcd777c27948da51c4218e5d95e7be3，两份指南已读取。七仓固定SHA和Bridge release不变；不是重新取移动HEAD来覆盖原历史证据。以下新增读取用于本轮真实接线：

- AI Skills main **ca10623fe028114cfafc5ec7e5350800d5c8259c**：[AGENTS](https://github.com/YuukiAS/AI_Skills_Collection/blob/ca10623fe028114cfafc5ec7e5350800d5c8259c/AGENTS.md)、[Planner](https://github.com/YuukiAS/AI_Skills_Collection/blob/ca10623fe028114cfafc5ec7e5350800d5c8259c/docs/workflows/PLANNER_ROLE_CONTRACT.md)、[Critic](https://github.com/YuukiAS/AI_Skills_Collection/blob/ca10623fe028114cfafc5ec7e5350800d5c8259c/docs/workflows/CRITIC_ROLE_CONTRACT.md)、[Capability Gate](https://github.com/YuukiAS/AI_Skills_Collection/blob/ca10623fe028114cfafc5ec7e5350800d5c8259c/docs/workflows/PLUGIN_CAPABILITY_GATE_POLICY.md)、[Maintenance](https://github.com/YuukiAS/AI_Skills_Collection/blob/ca10623fe028114cfafc5ec7e5350800d5c8259c/docs/workflows/AI_SKILLS_MAINTENANCE_BOARD.md)。Planner/Critic为1.7，Capability Gate为1.2。相对1cd3dfd，新增变更仅PIE设计文本；[PIE v0.2](https://github.com/YuukiAS/AI_Skills_Collection/blob/ca10623fe028114cfafc5ec7e5350800d5c8259c/docs/design/project-instructions-editor/PROJECT_INSTRUCTIONS_EDITOR_0_3_AGENTS_ARCHITECTURE_PROPOSAL_V0_2_2026-10-22.md)要求DA相关任务保留三层AGENTS证据，R1能力消费未删掉它；它仍不是已实现调用。
- Bridge实际开发分支 `work/bridge-core--product-scope-reset` **b3a435eb193bcba251b343d2dd5dd3ef580587ed**：[cli.py](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/b3a435eb193bcba251b343d2dd5dd3ef580587ed/ai_bridge_kit/cli.py)、[reviewed_runner.py](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/b3a435eb193bcba251b343d2dd5dd3ef580587ed/ai_bridge_kit/reviewed_runner.py)、[reviewed_handoff.py](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/b3a435eb193bcba251b343d2dd5dd3ef580587ed/ai_bridge_kit/reviewed_handoff.py)、[agent_flow.py](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/b3a435eb193bcba251b343d2dd5dd3ef580587ed/ai_bridge_kit/agent_flow.py)、[readiness.py](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/b3a435eb193bcba251b343d2dd5dd3ef580587ed/ai_bridge_kit/readiness.py)。相对71ad687只有[0.11.1入口提案v0.2](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/b3a435eb193bcba251b343d2dd5dd3ef580587ed/docs/design/0.11.1_normal_entry_capability_acceptance_proposal_v0.2_2026-10-22.md)新增，不把提案当实现。release仍ba9013b9fbbd242e51b09f9d09291f417df17652，release AGENTS/cli/reviewed亦重读。
- Bridge真实调用依据：run_lite_task的preflight及subprocess；Review的executor_prompt、run_codex_event、watcher_once；reviewed_handoff.init_task原PLAN_REQUESTED和PLAN_FROZEN转移、validate_final_report_for_repository；Control的RoleLaunchRequest、RuntimeAdapter抽象与launch_executor_with_preflight。新增prepare_admission/definition/consumer/report函数均明确是拟接线，源码没有它们。
- 七仓新增最终出口源码与专业规则完整链接集中于04#r1-ar04。特别核查CUHK当前脚本会先加载凭据/查询live，故新增finalize必须顶端分流；CARE原finalizer默认会有accounting/commit，最终分支也必须提前分流；Lucerna旧campaign不直接重跑；Bobbio旧Safe不代表0.3；SeminarArc准备脚本明确GPT_WORK_EXECUTED=NO。
- 官方固定Codex **b4ad33d1a3c10c9652dd57f7afd7a949f8f26895**：[stop.rs](https://github.com/openai/codex/blob/b4ad33d1a3c10c9652dd57f7afd7a949f8f26895/codex-rs/hooks/src/events/stop.rs)、[turn.rs](https://github.com/openai/codex/blob/b4ad33d1a3c10c9652dd57f7afd7a949f8f26895/codex-rs/core/src/session/turn.rs)、[exec CLI](https://github.com/openai/codex/blob/b4ad33d1a3c10c9652dd57f7afd7a949f8f26895/codex-rs/exec/src/cli.rs)、[exec events](https://github.com/openai/codex/blob/b4ad33d1a3c10c9652dd57f7afd7a949f8f26895/codex-rs/exec/src/exec_events.rs)。重查[官方Hooks](https://learn.chatgpt.com/docs/hooks)、[非交互](https://learn.chatgpt.com/docs/non-interactive-mode)、[AGENTS](https://learn.chatgpt.com/docs/agent-configuration/agents-md)。源码与文档说明可能路线，不能证明用户实际Windows/Desktop/CLI/Remote版本及已加载状态。

### 审查最容易漏掉的连带影响

- 原要求独立重建与候选validator批准是不同决定；可由已有同一专业角色在同次审查分别输出，但不准以同一个旧摘要代签两个对象。
- 候选校准不是RequestedClaim.stage。所有新增字段已并入同一未发布da/2提案，不保留另一个可忽略新字段的“兼容reader”。
- 激活回执与profile CAS、结果回执与claim、首次adapter与最终出口shadow均不能形成循环。
- 正常无任务包请求和纯CLI父进程缺模型上下文均有明确路线及支持前提，未获P0证实不能宣传自动接入；没有owner不能把落盘写成送达。
- 七仓报告失败应回原task，不重跑有副作用准备脚本；产品科学负结论、用户取消、外部等待不启动自动修成绿的循环。
- 总体估算130–316小时，首片36–80小时，先行P0仅4–8小时；未量测，未获一次性全部实施授权。

本轮只完成研究文稿写入和固定源码核查。P0、七仓完整产品验收、实际安装/loaded证明全部仍未执行；各仓DA enabled=NO。独立Critic只能判断该设计是否足以进入下一步获权阶段，不能把本文转成生产PASS。

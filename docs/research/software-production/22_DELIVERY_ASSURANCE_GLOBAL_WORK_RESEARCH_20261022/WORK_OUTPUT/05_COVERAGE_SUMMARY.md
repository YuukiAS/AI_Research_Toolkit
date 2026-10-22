# 覆盖审查、设计裁决与仍未证明的运行边界

本文件与[覆盖CSV](05_HISTORICAL_COVERAGE.csv)共同构成一份规范化映射。表大不代表系统有效：本轮没有运行产品、设备、账号或科研试验。D1–D6的研究可解设计已在01–04确定；平台绝对原生文字拦截、真实宿主/成品与独立审查仍有明确边界，不能进入可执行Goal。逐项设计回答见03/04与本页；实现与验证分包见06。

## 1. 清点结果与证据等级

|输入|行数|实际处理|
|---|---:|---|
|36项职责|36|归属K1–K5，逐组定位03六问|
|公共问题|216|保留原问题与逐问答复|
|七仓问题|63|保留原问题与04逐仓九问答复|
|跨组件反例|36|保留原问题，本页逐项处置|
|历史登记|363|全部原编号/原问题/原项目来源、旧分类与本轮状态分开|
|旧需求登记|83|原75条及旧助手归纳8条，不冒充用户逐字原话或批准|
|专业能力族|26|仅做归类；不要求安装26个新Gate|
|合计|823|row_id无重复；315问=216+63+36|

历史363行项目分布：Lucerna 53、Bobbio 32、Mica 46、SeminarArc 32、Asteria 52、CUHK_Date 56、CARE 92。保留旧映射可以减少重建成本，不能继承其“已覆盖”判定。37条关联源码或代表性报告经过定向抽查：32条标SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY，5条标CURRENT_VALIDATOR_LIMIT_CONFIRMED_SOURCE_ONLY；其余326条标HISTORICAL_MAPPING_REUSED_CURRENT_UNKNOWN。37不代表37个原事故逐一重演，报告中的历史修复也不是本轮当前复测。

5条源码确认仅指评分/检查能力边界（Asteria A40/A41/A42/A43、CARE C37），不推导当前用户产品仍有相同缺陷。历史“已修”“风险登记”“假阴性”“建议”均保留原历史身份；表中UNKNOWN不得被汇总成架构PASS。

旧REQ-068保留无法取得全部旧聊天/附件的限制；REQ-069保留旧20页PDF与Lucerna真实演练未在本轮完成。本次正式合同要求GitHub研究且禁止未经授权实机，不能用研究文档冒充那两项历史交付。

## 2. CSV如何从一条原问题走到真实处理链

CSV采用显式外键，避免363次复制同一段组件说明。它不是残缺短表：

- `INPUT:`＝本研究仓库、输入基线 `f1426b6322870c7a9d42d83ff6ea7ad8a35837a3`、`docs/research/software-production/`下的路径；#L为该固定文件行号。
- `WORK:`＝本目录文件；#L为本文包中的行号，#aNN为本页稳定锚。CURRENT记录包版本，审查时先固定整个包commit。
- `PROJECT:<name>`＝下表项目真实入口/消费者/包号，加04该仓完整故事。
- `FAMILY:<key>`＝下表行为断言/原始证据/责任与返修/可签claim；属于通用机制，必须和项目行联合使用。
- `ANSWER:<row_id>`＝本行answer_locator和design_answer；公共216问、七仓63问、36反例均已有独立逐问答案。
- `original_project_sources`是旧原始索引保留的定位文本，不保证文件在所有分支还存在；用本页有效版本或原历史commit核对。找不到必须记缺证，不能猜一个现存近似文件。

每条历史行的完整解释＝原问题/原始源＋历史/当前状态＋PROJECT入口/consumer＋FAMILY断言/证据/返修/claim＋04项目特化＋06对应包验证。多族行全部联合，不取最容易通过的一族。NON_GATE旧分类映射到CLAIM、IDENTITY、AUTH、RECOVERY、SCOPE、RULES、CALIBRATION、ENV、RELEASE九类治理职责，不能为了表格统一把它们包装成产品测试。

|项目键|有效源码|正常入口及定位|结果接收方|实施包|
|---|---|---|---|---|
|Lucerna|[Lucerna@79dd2875](https://github.com/YuukiAS/Lucerna/tree/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb)|[scripts/development-acceptance.ps1](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/scripts/development-acceptance.ps1)：development-acceptance.ps1::Assert-CandidateAdmission/Test-CaptureSameRunBinding; independent native orchestrator|当前Executor或Lucerna原local orchestrator|P3-LUC|
|Bobbio|[Bobbio@a64edfd6](https://github.com/YuukiAS/Bobbio/tree/a64edfd6c5b11f81599bfcfc327be5964633a7b5)|[scripts/Invoke-BobbioReaderAcceptanceSafe.ps1](https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/scripts/Invoke-BobbioReaderAcceptanceSafe.ps1)：Invoke-BobbioReaderAcceptanceSafe.ps1; milestone gates|Bobbio原Executor/milestone owner|P4-BOB|
|Mica|[Mica-for-ChatGPT@0aee22f3](https://github.com/YuukiAS/Mica-for-ChatGPT/tree/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c)|[scripts/acceptance/validator.mjs](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/scripts/acceptance/validator.mjs)：scripts/acceptance/cli.mjs::candidate -> validateBundle; original Parent|Mica原Parent Goal/Executor|P4-MIC|
|SeminarArc|[SeminarArc@5652fe17](https://github.com/YuukiAS/SeminarArc/tree/5652fe17ce60625f3ff7c758fcc0183f920189de)|[scripts/run-blackbox-acceptance.ps1](https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/scripts/run-blackbox-acceptance.ps1)：run-blackbox-acceptance.ps1::Run-B01..B08; verify-gpt-work-acceptance|SeminarArc原Executor/Parent|P3-SEM|
|Asteria|[Asteria@193c0336](https://github.com/YuukiAS/Asteria/tree/193c033659a7612a99442763077217b130e9b756)|[scripts/validate-architecture-rc19.mjs](https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/scripts/validate-architecture-rc19.mjs)：test:browser; validate-architecture-rc19.mjs; fixed URL review|Asteria原Executor/Reviewer|P4-AST|
|CUHK_Date|[CUHK_Date@9f25c775](https://github.com/YuukiAS/CUHK_Date/tree/9f25c7754d3c80d0be74f5b71016320f55753ae6)|[packages/api-contract/src/parent-delivery-gate.ts](https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/packages/api-contract/src/parent-delivery-gate.ts)：runRegistrationCriticalPathHosted; evaluateParentDeliveryGate; handleAuditTicketSession|CUHK原Parent/campaign owner|P4-CUH|
|CARE|[CARE_Challenge@75a40e45](https://github.com/YuukiAS/CARE_Challenge/tree/75a40e454de43b64e59a0b0b438ff57ef2bb8345)|[scripts/ops/care_milestone_finalizer.py](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/scripts/ops/care_milestone_finalizer.py)：approved formal train/eval -> care_milestone_finalizer.py -> original Controller|CARE原Controller/科学Planner|P3-CARE|

以下定义26个原专业族和9个治理族。专业阈值最终来自项目冻结合同；此表没有创造科学、视觉或性能数值门槛。

|族键|职责/组件|必须识别的行为或断言|原始证据|失败接收与恢复|最多支持的声明|
|---|---|---|---|---|---|
|UI|C21 / K3|完整实际画面/交互符合冻结设计；不以截图存在签可用|actual surface + independent whole-screen review|专业Reviewer→原Executor；collector误读先修采集|视觉/用户可用|
|STATE|C18 / K3|独立状态来源与产品后置状态一致；未知不变0或健康|原provider/DB状态+动作前后观察|产品Executor；外部源未知回Controller|真实状态功能|
|NATIVE|C19 / K3|声明的原生动作确实造成指定后置状态|exact EXE/PID + native action + postcondition|产品或native observer按因果分流|原生交互|
|INSTALL|C22 / K4|实际安装/启动/升级/卸载对象与候选及偏好一致|source/build/install/process identity + lifecycle|安装owner→原任务；不覆盖用户配置|已安装可用|
|PRIVACY|C28 / K3|真实敏感对象边界与失败补偿正确，未授权数据不变|隔离路径/账户/数据before-after及拒绝控制|原Controller/权限owner；产品privacy缺陷回Executor|隔离/隐私可用|
|PERF|C16 / K3|冻结同负载A/B/C收益且核心行为不退化，保留全部样本|目标类/设备真实process+heap+latency与回归|产品/perf observer分流，不能关主要功能凑收益|指定环境性能|
|ZOTERO|C19 / K3|隔离Zotero增读改删、PDF字节不变、缓存可重建|真实API/native往返+原PDF hash+profile审计|Bobbio Executor或隔离runner owner|真实Zotero集成|
|HOST|C18 / K3|当前宿主能力精确识别，未知不猜；原生编辑/历史保留|真实派生contract+actual loaded instance+必要手动边界|Mica Parent→同Goal修host adapter|真实ChatGPT能力|
|DOC|C20 / K3|实际导出全文/数学/来源/选择编辑符合合同|最终阅读器/导出内容+源对照|文档/导出owner→同任务修复|实际导出物可用|
|ANDROID|C19 / K3|安装实例正常用户路径及强停重启持久化成立|APK/serial/run + UI/action + storage reread|SeminarArc Executor或harness owner|Android安装流程|
|MEDIA|C20 / K3|实际素材经产品导入处理保存可重入，内容正确|真实授权媒体+结果内容/重启读回|media产品或observer owner|真实媒体处理|
|STRESS|C19 / K3|冻结压力场景无崩溃且恢复数据/用户路径|指定serial/seed + all iterations + recovery|项目owner定位flaky root，不盲重试|指定压力恢复|
|HARDWARE|C28 / K3|指定物理设备/OEM/麦克风相机行为实际观察|authorized physical-device evidence|硬件权限/环境留UNKNOWN；实现缺陷原Executor|真实硬件能力|
|GRAPH|C21 / K3|科学方向/索引/证据缺失/模型关系符合科学源|canonical graph+trace+完整科学源|Asteria scientific owner裁标准，Executor修实现|科学图真值|
|GEOMETRY|C13 / K3|独立真实DOM/SVG测量，无缺测默认0|screen-space paths/rects + crossing/bounds bad controls|observer/validator owner先校准，再原Executor|几何量测结论|
|SCIVIS|C21 / K3|整图可读且不删科学内容换清爽|whole scientific surface+source+reader judgment|专业Reviewer→同任务最小修复|科学可读性|
|DEPLOY|C22 / K4|固定消费URL的多服务身份/健康与同候选一致|deployment ids+status+消费时真实路径|原deployment owner；无授权只诊断|已部署可用|
|REGISTRATION|C19 / K3|visible registration至dashboard，用户密码语义匹配|可见UI动作+auth/state readback+清理审计|CUHK原Executor；先critical path再广泛审查|注册关键路径|
|HANDOFF|C29 / K3|claim/auth/expected-state/finalize，失败不burn，不串persona|事务与浏览器session故障注入/重试/并发|CUHK原Parent；真实auth故障不当工具恢复|交接/会话正确|
|CATALOG|C21 / K3|真实常见/歧义查询内容正确、去重、locale一致|实际query结果+独立内容审查|CUHK content/provider owner→原任务|检索质量|
|SCI_ENTRY|C17 / K3|批准结构在正式entry实际消费，不只是utility/token|formal command/model/dataflow/runtime trace|CARE Controller→Executor；标准冲突Planner|科研实现忠实|
|SCI_CAUSAL|C17 / K3|loss/参数/输入实际影响对应更新，隔离项不误伤|梯度/干预/真实batch与变换lineage|科学owner解语义，Executor修因果链|机制/数据因果|
|SCI_SCALE|C17 / K3|实跑步数/时长/总体/selection满足原合同|真实optimizer counter+population+casewise metrics|Controller继续合法scope；缺权限未完成|充分训练/评价|
|SCI_EVIDENCE|C27 / K4|终态后实际重聚合完整科学输出，不复制假指标|checkpoint/预测/GT/CSV/JSON内容+job lineage|既有finalizer→Controller补证|科研送审材料|
|SCI_RESUME|C13 / K3|连续与独立进程恢复后训练轨迹满足冻结等价|RNG/optimizer/sampler/真实batch/参数轨迹|CARE validator owner与Executor分责|恢复训练等价|
|SCI_CONCLUSION|C21 / K3|充分实验支持有限结论；允许科学NO_GO|同split消融/病例指标/完整报告|科学Planner决定停止或新方向|科学结论|
|CLAIM|C23 / K4|required set逐项满足，低层不冒充高层|全部义务及分项result/缺项|原completion owner拒绝ready→K5|完成/交付声明|
|IDENTITY|C22 / K1/K4|task/semantic candidate/build/runtime/evidence同对象|对象向量/源blob/真实观测绑定|原Controller/采集owner重绑|本候选声明|
|AUTH|C28 / K1/K5|当前用户精确effect授权，不能被命令名称扩权|current user authority+target/effect identity|HUMAN_ONLY原owner请求；无旁路|合法执行|
|RECOVERY|C25 / K5|失败实际送原owner，同task/原budget，不重置|WID ack+fresh result+原状态/预算|活跃Executor/Review watcher/原Controller|自动返修/等待|
|SCOPE|C15 / K2|完整diff与依赖闭包，不漏旧能力也不过度全跑|baseline→candidate变化+公共入口普查|当前Executor修mapping，未知G2|受影响回归|
|RULES|C06 / K1/K2|当前权威/分支/loaded源正确，不只文件存在|effective source bindings+normal-entry behavior|项目维护owner；语义冲突Planner|规则实际消费|
|CALIBRATION|C13 / K3|good/bad/missing/unchanged同正式路径校准，独立参考|历史根因回放+原观察+冻结oracle|原专业验收owner；不逼正确产品改错|验收判定可信|
|ENV|C19 / K5|工具/环境可达且等价不降级，错误不误判产品|环境前检+实际异常+合法修复/限制|原Controller/runner owner|可运行/未证|
|RELEASE|C31 / K5|canonical→release→installed→loaded→consumer逐层闭合|发布/载荷/正常入口与回滚证据|既有Maintainer与各consumer owner|正式发布/适配|

## 3. 六项问题的设计裁决与剩余证据

|原问题|本轮已经选择的机制|仍未证明／不能代替的事项|
|---|---|---|
|G1|01 D1：可信原生事件＋原交付门；官方源码证明Stop是续修、Hook失败不必阻止|任意原生聊天文字绝不误报不可由插件保证，用户已接受此限制并排除新客户端；受管交付仍强制，各host实测未做|
|G2|03 D2：真实入口分母、新旧图并集、反向闭包、孤儿/未知扩围、接受基线、独立抽样|有限范围不代表全知；提取器覆盖与未准备旧行为的运行抽查待验证，算法不再待定|
|G3|03 D3：标准/程序/collector/观察/判定分开；三档风险匹配；四类反例分别路由|same-user hash不防恶意同权篡改；真实受限观察和专业独立验收未运行|
|G4|03 D4：当前回合、原launcher有限精确resume、Control具体adapter和原Controller step、七仓原接收者|新增接线未实施；无存活owner不自动唤醒。ACK不等修好，须fresh result|
|G5|04 D5：七仓真实成品、正坏旧控制、数量/时间/权限上限和回收；另外七个普通任务推演|本轮没有设备/账号/GPU/部署验收；Mica最终登录态手动、CARE科学路线authority保留|
|G6|03 D6：明确提出da/2、旧da/1只诊断、必填字段/真实相邻consumer/迁移/回退|新提案未获独立Critic批准，生产reader/loaded适配未实现；不继承旧PROCEED|

这些条目不再是一份让实施者补架构的P0清单。当前剩余分为：已接受的平台文字限制、后续真实资源授权，以及必须后续实现实测的运行性质。研究可解部分已形成可被Critic否决的具体选择；没有发生产品PASS或独立Critic PASS。

CUHK产品任务lineage可保留，但新snapshot按现有合同关闭旧campaign，新活动仍须授权；Mica正常Edge登录态手动；CARE充分负结果交科学Planner。这些项目边界不得被“自动继续”覆盖。

## 4. 定向抽查与反向核对

本轮先读363条原登记，再按假绿/误判/非降级/身份/接收链选37条关联原材料；它不是随机统计样本，不能计算总体检出率。具体原始路径仍在CSV，下面保留清单以便核对。

|历史ID|归类|本轮状态|原始材料定位（原索引）|
|---|---|---|---|
|Lucerna:L17|G:STATE|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/docs/workflows/LUCERNA_EXECUTION_FAILURE_HISTORY.md|
|Lucerna:L22|N:IDENTITY|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/docs/workflows/LUCERNA_EXECUTION_FAILURE_HISTORY.md|
|Bobbio:B05|G:UI|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/docs/CURRENT_MILESTONE.md|
|Bobbio:B06|G:UI|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/docs/CURRENT_MILESTONE.md|
|Bobbio:B14|N:CLAIM|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/docs/audits/0.3.0/overnight-2026-10-04/GPT_WORK_REVIEW_SYSTEM_AUDIT.md; https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/docs/quality/GPT_WORK_PRODUCT_REVIEW_CONTRACT.md|
|Bobbio:B30|N:RULES|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/docs/DEVELOPMENT_WORKFLOW.md|
|Mica:M14|G:PERF|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/tasks/2026-10-05-mica-product-recovery-current-gpt-ui.md|
|Mica:M15|N:RECOVERY|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/tasks/2026-10-05-mica-product-recovery-current-gpt-ui.md|
|Mica:M16|N:RULES|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/tasks/2026-10-05-mica-product-recovery-current-gpt-ui.md; https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/results/mica-product-system-rebuild/foundation-review-r2-repair.md|
|Mica:M36|N:SCOPE|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/results/mica-product-system-rebuild/foundation-review-r4-repair.md|
|Mica:M37|G:PERF|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/results/mica-product-system-rebuild/low-memory-candidate-report.md|
|Mica:M38|G:PERF|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/results/mica-product-system-rebuild/low-memory-candidate-report.md|
|Mica:M43|N:CALIBRATION|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/scripts/acceptance/cli.mjs; https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/scripts/acceptance/validator.mjs|
|Mica:M45|N:IDENTITY|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/package.json; https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/results/mica-product-system-rebuild/low-memory-candidate-report.md|
|Mica:M46|N:ENV|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/package.json|
|SeminarArc:S02|G:ANDROID|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/prompts/tasks/0.5.x_blackbox_acceptance_harness_result.md|
|SeminarArc:S11|N:CALIBRATION|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/prompts/tasks/0.5.x_real_world_media_corpus_round_02_result.md|
|SeminarArc:S12|N:CALIBRATION|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/prompts/tasks/0.5.x_real_world_media_corpus_round_02_result.md|
|SeminarArc:S15|N:IDENTITY|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/prompts/tasks/0.5.x_real_world_media_corpus_round_02_result.md|
|SeminarArc:S16|G:ANDROID|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/prompts/tasks/0.5.x_real_world_media_corpus_round_02_result.md|
|SeminarArc:S17|N:CLAIM|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/prompts/tasks/0.5.x_real_world_media_corpus_round_02_result.md; https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/README.md|
|SeminarArc:S30|N:CLAIM|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/scripts/verify-gpt-work-acceptance.ps1|
|Asteria:A39|N:CALIBRATION|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/results/asteria--rc19-layout-first-graph-convergence/result.md|
|Asteria:A40|N:CALIBRATION|CURRENT_VALIDATOR_LIMIT_CONFIRMED_SOURCE_ONLY|https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/scripts/validate-architecture-rc19.mjs|
|Asteria:A41|N:CALIBRATION|CURRENT_VALIDATOR_LIMIT_CONFIRMED_SOURCE_ONLY|https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/scripts/validate-architecture-rc19.mjs|
|Asteria:A42|N:CALIBRATION|CURRENT_VALIDATOR_LIMIT_CONFIRMED_SOURCE_ONLY|https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/scripts/validate-architecture-rc19.mjs|
|Asteria:A43|N:CALIBRATION|CURRENT_VALIDATOR_LIMIT_CONFIRMED_SOURCE_ONLY|https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/tests/browser/asteria-v2-rc.spec.ts|
|Asteria:A46|N:CLAIM|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/results/asteria--rc19-layout-first-graph-convergence/result.md; https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/docs/operations/blackbox-audit/VISUAL_ACCEPTANCE_CONTRACT.md|
|CUHK_Date:C01|G:REGISTRATION|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/prompts/CODEX_REPAIR_REAL_REGISTRATION_CRITICAL_PATH_AND_FALSE_GREEN_HARNESS_2026-09-24.md|
|CUHK_Date:C02|N:CALIBRATION|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/prompts/CODEX_REPAIR_REAL_REGISTRATION_CRITICAL_PATH_AND_FALSE_GREEN_HARNESS_2026-09-24.md|
|CUHK_Date:C03|N:CALIBRATION|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/prompts/CODEX_REPAIR_REAL_REGISTRATION_CRITICAL_PATH_AND_FALSE_GREEN_HARNESS_2026-09-24.md|
|CUHK_Date:C11|G:HANDOFF|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/blackbox-audit/CAMPAIGN_ORCHESTRATION.md|
|CUHK_Date:C16|G:HANDOFF|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/blackbox-audit/CAMPAIGN_ORCHESTRATION.md|
|CARE:C23|G:SCI_SCALE|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/routes/ROUTE_ANTI_LAZINESS_PROTOCOL.md|
|CARE:C37|G:SCI_RESUME|CURRENT_VALIDATOR_LIMIT_CONFIRMED_SOURCE_ONLY|https://github.com/YuukiAS/CARE_Challenge/blob/9517fe1738be5a03bc5d9115dade618ca3bc31b8/scripts/validation/validate_care_ase_freeze_reload.py|
|CARE:B7-01|G:SCI_CONCLUSION|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/tasks/20260721_srr_batch7_mechanism_closure_repair_controller.md|
|CARE:B7-02|G:SCI_EVIDENCE|SOURCE_OR_REPORT_RESAMPLED_NO_RUNTIME_REPLAY|https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/tasks/20260721_srr_batch7_mechanism_closure_repair_controller.md|

补充直接证据：
- [Mica Foundation r4](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/results/mica-product-system-rebuild/foundation-review-r4-repair.md)：原round3 REVISE后强化完整placement proof，协调改hash负例被拒；runtime/dist未变可复用相应运行，仍未获独立最终审查或真实登录态验收。
- [CUHK campaign合同](https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/blackbox-audit/CAMPAIGN_ORCHESTRATION.md)：预演与final batch分离、可见UI、required surface、consume-time健康、换snapshot结束旧Parent，以及合法session loss的有限恢复。
- [CARE Batch7原修复合同](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/tasks/20260721_srr_batch7_mechanism_closure_repair_controller.md)：解释复制intervention指标、placeholder及机制不忠实；要求独立预测与阶段门。这里是历史事实来源，不是本研究的训练授权。

独立Critic的反向核对流程：先仅给一个历史ID与原363来源索引，暂不展示本CSV结论；Critic自行读取原源与当前有效源码，写出“当时问题是什么/现在是否还存在→普通请求入口→冻结行为→真实runner/observer→坏例断言→接收者→同任务合法动作→可签/不能签claim→维护与关闭”。然后才与本CSV联结结果比较。至少覆盖一项历史已修、一项observer假阴性、一项源码评分缺陷、一项科学负结果和一项没有任务包的未准备普通功能；样本由独立Critic选择，不让Planner预选全部题目。

任一关键箭头只能答“模型会知道”“后续会路由”“有报告即可”，判该链未闭合。找不到原材料保留NEEDS_EVIDENCE；不能把另一个案例当原证据。当前未发生独立盲审，不报告通过。

## 5. 36个跨组件反例逐项处置

<a id="a01"></a>
### A01 用户仅发一句话，没有任务包也没有显式调用插件，系统是否可观察地拦截并给出支持/不支持真值？

01 D1与03 D4：可信prompt登记、受支持tool事件更新、Stop请求同回合续修；已证明Hook完全缺席无法拦原生聊天。原交付门独立拒绝缺证，不能把此能力算成原生文字强制拦截。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a02"></a>
### A02 存在某个领域 Skill，但模型完全没有加载它，系统是否还能拒绝缺必需专业验收的完成声明？

K2由正常入口直接读installed descriptor，不依赖Skill被模型触发；K4发现required专业结果缺失拒绝ready并发缺能力工作项。现有release未接线，P1/P2待证。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a03"></a>
### A03 原有 adapter 根本没登记一个旧功能，受影响共享代码改坏它，系统怎样检测覆盖未知？

03 D2固定真实入口分母、前后依赖图与accepted baseline；孤儿生成补映射/补检查反馈给当前Executor，动态未知扩到所属产品FULL并保留缺口。有限范围不声称全知。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a04"></a>
### A04 项目适配文件只剩空数组，系统是否会错误地认为无需任何 Gate？

03 E4先从原目标构造expected set；非空产品任务+empty adapter拒绝NONE，工作项回当前Executor，正好真正无产品改动的咨询仍可NONE。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a05"></a>
### A05 Codex 删除一个测试或将必需改可选，怎么阻止以新基线逃避？

批准基线的required set不能由候选删除；diff包括测试删除/mandatory→optional，K4判contract drift，交原owner，不能以新baseline洗白。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a06"></a>
### A06 验收结果是上周别的 EXE/PID/设备截图，怎样禁止当前候选复用？

Lucerna same-run binding检查EXE/hash/PID/run_id，错误对象UNKNOWN交采集owner；旧图不可签当前安装，修定位后同候选重采。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a07"></a>
### A07 状态文件写 PASS，但程序实际未启动，谁检查观察路径而不是信任 JSON？

K3要求实际runner/observer记录和原始后置条件，K4拒绝空的PASS；same-user协调伪造仍超出hash能力，独立观察G3未证明则不能高等级签字。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a08"></a>
### A08 计算正确性验收只用 1000-320=680，硬编码 680 恰好通过，第二个不同输入能否抓住？

状态真值同生产映射跑1000−320与1000−500；680常量第二例FAIL；W2实际返回当前Codex，修产品后连旧quota一起重跑，见03 E6/E7。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a09"></a>
### A09 外部 API 仅返回已用量，没有可信额度上限，是否拒绝“剩余额度已实现”？

可信limit缺失为UNKNOWN，剩余额度claim不成立；既有已用量可报告但不能当原需求完成；原专业owner处理数据源语义，不发明额度。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a10"></a>
### A10 真实数据检查由实现程序自己生成期望值，如何设置独立对照？

期望来自冻结独立公式/API原响应/真实后置条件；若只由产品生成expected，标oracle dependency gap给专业owner，G3阻止自签。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a11"></a>
### A11 产品实现和 validator 同轮降低阈值，历史坏例为何不会突然变成 PASS？

产品与validator同时变化触发calibration失效；独立owner持原标准和bad，经同入口重放；旧bad变绿却无批准语义变更则REVISE。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a12"></a>
### A12 采集器读取错误控件，验收 FAIL，是否修采集器而非把产品改坏？

SeminarArc OCR原观察与控件树对照，误取EditText是observer fault；原runner维护者修定位并撤销假阴性，不改正确OCR。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a13"></a>
### A13 只有文件/图像/报告存在，没有真正完整渲染或阅读，是否能得到高层声明？

03 C20/C21要求实际完整渲染/读取/操作记录，文件存在只证明存在；缺观察UNKNOWN回原采集/Reviewer，高层claim未完成。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a14"></a>
### A14 一个 `skipped`/`neutral` 状态检查被平台视为合格，系统能否识别必需 job 未真实执行？

K4逐required job检查executed状态与真实结果，不以GitHub accepted check state替代；skipped/neutral保留UNKNOWN，回原owner补必要检查。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a15"></a>
### A15 普通 README 修改被错误要求跑完整 Windows/Slurm 正式验收，谁识别过重检查？

K2依赖闭包和semantic diff证明确为文档文字，TARGETED或NONE产品检查；若FULL是selector defect修选测，不打开Windows/申请GPU。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a16"></a>
### A16 共享 schema 变化，应该保护的多个兄弟目标之一未映射，如何扩大与恢复？

03 D2：shared schema从旧/新图并集反查消费者，未知边扩到相关产品FULL且未解义务仍阻ready；不能全跑已知测试抹掉未知兄弟。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a17"></a>
### A17 长任务 PENDING，控制器是否错误触发多次训练提交、重复扣费？

原CAREController读已有job lineage/lock/sacct，PENDING等待不重提；DA无提交权。无durable owner则G4，不偷偷新tmux。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a18"></a>
### A18 真实用户中断后 Stop/Watcher 是否仍能擅自启动第二轮？

Interrupt/用户取消由原owner保留，发起前核对；Stop不续修，watcher不因旧事件重启；支持各host需实际负例，G1/G4。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a19"></a>
### A19 钩子信任丢失或更新后旧哈希不再被信任，是否还能报告“已自动保障”？

更新后精确定义信任失效需宿主重新确认，未生效为无保障；受管发布边界拒绝ready，原生UI无法自证被拦仍G1。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a20"></a>
### A20 安装了中央插件，但消费者运行时实际加载旧版本，如何防虚假适配完成？

K1比较source/release/installed/loaded身份，fresh普通入口行为验证；旧payload是consumer未适配，维护板留ADAPTING，不能DONE。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a21"></a>
### A21 一个子任务失败、其他独立子任务完成，能否保存部分有效结果并准确说明？

结果按义务/目标保留；独立成功子目标不被抹掉，required失败仍阻整体声明；原owner只修受影响闭包，不新task。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a22"></a>
### A22 同类缺陷第三次返回，没有新根因证据，系统是否止损而非换措辞无限修？

相同因第二次无新证据先根因审计，第三次没有新信息停止盲试；服从更低原budget，保存失败/恢复点，不重置Goal。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a23"></a>
### A23 真实用户需要授权前台窗口/账号/物理硬件，但 Codex 把权限不足当作产品坏了，怎样避免？

Host effect前检分AUTH_REQUIRED/ENV_UNAVAILABLE，产品不标FAIL；继续无关源码检查，具体设备/账号动作只问真实人类边界一次。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a24"></a>
### A24 审查结果没有自动送到原任务可执行者，是否只留下漂亮的待办文档？

03 D4的DELIVERED/ACKED/RESOLVED分别有真实观察；当前工具返回、Stop后续回合、Lite/Review精确resume、原Controller control step各有消费位置。有文件无后续观察不能签自动返修。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a25"></a>
### A25 原任务进程已经结束、后台不可恢复，还承诺无人值守继续，谁负责纠正？

03 D4选定原Lite父进程run_delivery_cycle，在原预算内最多两次精确thread resume，共享Hook计数；取消/缺id/预算耗尽不启动。父进程也消失则由原合法入口恢复，没有活跃持久owner不承诺后台。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a26"></a>
### A26 新功能重用过时历史规则，最新用户要求相矛盾，谁有权裁决？

K1/K2保留新用户决定与旧来源冲突，原owner裁权威并revision；不擅自删科学/安全最低要求；失效旧结果可追溯。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a27"></a>
### A27 两个专业 Gate 互相矛盾，聚合是否投票或自动挑较严的一份？

不同标准结果不投票不挑更严；冲突附原条款交唯一专业Planner，停相关高层claim，不反复修产品迎合。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a28"></a>
### A28 用户想关闭某个验收器，能否展示关闭范围、会失去的保护、替代覆盖和历史证据？

K5列关闭范围/保护损失/替代/原bad迁移；临时pause不等retire，required缺口继续不ready，专业最低标准不能绕过。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a29"></a>
### A29 首次接入新仓没有任何正式回归，系统能否说明 baseline 缺口而非凭空宣称完整？

03 D2从源码枚举入口和依赖，accepted baseline缺失不能拿候选当oracle；当前正式合同可支持明确新义务，旧行为未知保留。04新任务推演与后续独立抽样分别标注，不能声称全部旧功能已证。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a30"></a>
### A30 一个仓库试点通过后，是否错误宣称七仓安装、加载、真实入口都已经通过？

每consumer×host×entry×artifact独立验收；Lucerna通过不改变Mica/Bobbio等状态，维护板逐个保持缺证。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a31"></a>
### A31 正式 holdout 暴露给执行者并被用于改代码，能否不再把它当新样本？

holdout曝光后降为开发回归，不能再当未见；由独立owner按预注册批次重新审查，不挑赢家；本轮无holdout运行。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a32"></a>
### A32 安全拒绝后改用 Python/bash/shell 间接执行同一危险操作，如何保持不越权？

AUTH绑定effect而非命令表面，同一拒绝换Python/SSH/子进程仍拒绝；最小权限审批走原route，不旁路。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a33"></a>
### A33 只记录绿色结果，失败日志被后来覆盖，能否防止选择性报告？

原run失败追加不可就地改PASS，后续run用supersedes；审核对所有attempt与raw evidence，缺原日志标缺证；同用户恶意删除仍G3边界。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a34"></a>
### A34 真实产品体验仍差而评分器通过，系统如何把用户反馈优先视为真实产品回归？

用户具体可复现产品反例优先触发incident，复核oracle与整个实际画面；不是模型分数投票。Asteria RC11为历史锚，回项目原task修。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a35"></a>
### A35 中央 Plugin 更新后，哪些消费者要适配无法确定，是否错误默认为全部已完成？

consumer inventory未知则中央只能source-ready，不得formal adaptation DONE；维护owner补真实安装/加载来源，既有兼容consumer可继续。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

<a id="a36"></a>
### A36 达标需要模型、GPU、真实账号或付费，但资源不可得，方案是否提供合法部分推进/停止而非伪造结果？

精确资源/标准不足仍未完成；执行无关低成本部分，保存合法恢复点；不以smoke/fixture替正式GPU/账号证据，科学充分负结果另分。

证据链与最终处置：见03 E2/E7和04对应项目；这是设计反证，未实跑。必要条件缺失保持对应claim未完成，不伪造FAIL修复或PASS。

## 6. GitHub可读取性与写入记录

初版CSV的UTF-8体积超过GitHub Contents直接回传范围，工具返回blob身份但内容为空；没有把它报告成已读回。先以Git blob SHA核对已知自有写入内容，再把重复机制字段改为上述显式外键（原问题、原来源和逐问答案均保留），文件压至531812字节。更新后重新读取完整文本并逐字一致，提交 `ebe441f3d3dead46c828d57d8356928d857263dc`，blob `8cea514997c9dbe413c23b457f8c9a5a38ab4913`。此为研究材料格式修复，不是生产源码改动，也未换仓库或分支。

所有状态是证据等级，不是自评Critic结论。当前实施合同已经选定具体路线，独立审查与执行授权仍未获得。

## 续研的反向核对口径

原315问题、83要求、363历史原文与历史状态保留，不因设计决定更新而改称已实测。CSV答复已同步D1–D6；G编号现在用于追溯问题，不再一概表示“架构待定”。新增Mica/PDF、SeminarArc导出、Asteria导出、CARE archive源码审读是新的设计证据，不把原37条历史抽查统计扩成未经逐例复测的新通过数。

独立Critic应从原输入另抽问题，检查CURRENT固定包、03具体消费者、04正常/坏/旧链、06成本边界；发现未闭合箭头继续返修，不能把823行数量当准入条件。旧包快照仍在Git历史，本目录只保留最新唯一权威方案。

## 最终设计闭合：同一账本的增量解释

本轮没有新增第二份823行台账。原row_id、原问题、来源、历史状态、当前证据状态保持；仅同步C02原文覆盖、C23唯一阶段消费者、C25/C26锁与实际续修、C30四类退休校准、C34最小成本路线等设计答案。03 F1–F5是这些答案的详细合同；未再出现“用户产品边界待选/当前设计因此不闭合”的旧回答。

04追加L20、B02、M08、S24、A14、CUHK C25、CARE C11，先在0f9a8fd固定题目，再读取当前代码和历史报告作反证。它们是新的有来源设计推演，不是独立holdout、真实重演或历史已解决认证，因此原37条定向审读/326条当前UNKNOWN统计不变。源码显示已有修复应当保护，不将历史缺陷自动归罪当前实现。

PROJECT接收方还必须联合03 F2解释：development-acceptance/validateBundle/verify-gpt-work/static validator/Parent gate/finalizer只证明自己的阶段；Bobbio Safe的0.2证明也不能代0.3。最终USER_READY一律由原交付owner调用唯一Bridge.check_delivery核验真实同候选结果。CSV若只读项目入口名而忽略阶段合同，不构成完整结论。

成本与保护一同受检：纯对话NONE、小文档局部、稳定候选昂贵观察；首片28–64小时估算与全量104–264小时均未量测。不得以文件/行数齐全认定设计或实现成功。后续独立Critic仍需从原源码另选问题，按具体箭头给PROCEED或REVISE。

# 六仓实施任务交接

六份完整实施任务均已先行写入各仓正式入口，并经 GitHub 全文回读，逐字一致。准备完成于 2026-10-23（本轮沿用 2026-10-22 专项标识）。未修改业务/测试代码、现有 Goal 或发布配置，未运行产品验收、未给产品或新执行包自签 PASS。没有创建分支、PR、远程任务、子 agent 或自动化；CARE 不在范围内。

|正式任务（点击即可打开）|有效分支|复用的原生入口|优先加固对象|
|---|---|---|---|
|[Lucerna](https://github.com/YuukiAS/Lucerna/blob/main/prompts/tasks/01058_validator_hardening.md)|`main`|development-acceptance.ps1；guard-01056r4-state-contract.mjs|状态真值、旧 provider/资源缺值、EXE/PID/截图绑定、PARTIAL/GAP 与真正产品通过分层|
|[Bobbio](https://github.com/YuukiAS/Bobbio/blob/develop/docs/plans/VALIDATOR_HARDENING_0.3.0_CODEX_TASK_2026-10-22.md)|`develop`|Invoke-BobbioReaderAcceptanceSafe.ps1；0.2 Reader runner 与 0.3 audit/native checks|profile/data-dir 隔离、真实标注往返、PDF/缓存不变、学术知识边界、Figma与原生|
|[Mica-for-ChatGPT](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/codex/mica-functional-convergence/docs/tasks/2026-10-22-mica-validator-hardening-task.md)|`codex/mica-functional-convergence`|scripts/acceptance/{cli,validator,control-corpus}.mjs|Foundation→Low Memory→Highlighter→PDF，控制校准与当前已存在后端旧保护|
|[SeminarArc](https://github.com/YuukiAS/SeminarArc/blob/main/prompts/tasks/0.5.x_validator_hardening_20261022_task.md)|`main`|run-blackbox-acceptance.ps1 B01–B08；Gradle；视觉/压力；verify-gpt-work-acceptance.ps1|B02重启持久化、B04/B07媒体导出、OCR/输入/picker误报、显式serial与证据目录|
|[Asteria](https://github.com/YuukiAS/Asteria/blob/main/prompts/tasks/asteria_validator_hardening_20261022_task.md)|`main`|validate-architecture-rc19.mjs；tests/browser/asteria-v2-rc.spec.ts；test:regression|恒零计数、缺metric、科学基线diff、真实几何/整屏、稳定回归去重|
|[CUHK_Date](https://github.com/YuukiAS/CUHK_Date/blob/main/prompts/tasks/validator_hardening_20261022.md)|`main`|registration-critical-path-hosted；claim-canaries；parent-delivery-gate与既有Vitest/Playwright|票据事务、预态/身份/批次、只读重入、隐私、简繁/移动端、Parent结果分层|

## Codex 的结果位置与准入

|仓库|实施后的真实计数与结果写入位置|当前执行边界|
|---|---|---|
|Lucerna|`results/01058_validator_hardening/result.md`|新验收语义独立准入待审；既有批准范围继续。真实 Windows/账号/安装/服务效果须原权限。|
|Bobbio|`docs/audits/0.3.0/validator-hardening-2026-10-22/RESULT.md`|0.3 新语义待相应审查；不复用0.2通过替代0.3。真实Zotero、更新器和原生写入不得自行运行。|
|Mica-for-ChatGPT|`results/mica-product-system-rebuild/validator-hardening-2026-10-22.md`|同原Goal已批准范围可继续；当前禁止启动浏览器，保留本地脏产物。真实ChatGPT/低配机器/查看器仍按原边界。|
|SeminarArc|`prompts/tasks/0.5.x_validator_hardening_20261022_result.md`|无副作用代码/隔离测试沿旧授权；设备安装/清状态、真机与外部provider依原权限。工具维护不自动发版。|
|Asteria|`results/asteria_validator_hardening_20261022_result.md`|新观察器需独立准入；RC19阈值冲突先核批准来源。固定公网/服务不动；产品独立审查仍一个Parent。|
|CUHK_Date|`results/validator_hardening_20261022/result.md`|本地隔离检查先行；不造/耗真实final票据、不动生产/部署/账号。与现有SEO任务先核共享工作树归属。|

六份正文均包含具体路径、现有问题与正确能力、动作选择、good/bad/missing/unchanged、实施顺序、正常 runner 接线、受影响回归、权限/冲突/恢复及薄适配入口。每仓都强制真实填写九个字段：NEW_VALIDATORS、ENHANCED_VALIDATORS、NEW_REGRESSION_CASES、REUSED_VALIDATORS、MERGED_OR_RETIRED、ACTUALLY_RUN、NOT_RUN_OR_UNKNOWN、HISTORICAL_COVERAGE、FUTURE_DA_ADAPTER_ENTRY；并逐个用中文说明防什么错误、何时调用、坏例、旧保护和证据。本轮不预报这些数量。

全部 271 条历史 source_scoped_id 已分配到对应任务：53 / 32 / 46 / 32 / 52 / 56，与 raw CSV 和 DA coverage 的历史 ID 集合相符。它们是历史问题/保护/担忧的登记，不是当前缺陷数量；旧已修、观察器问题、正式替代与环境未证分别处理，不要求在实施前先重跑271项。没有新增历史数据库。

## 一次协调审查与短 kickoff 草案

新机制和真正需要独立准入的部分，使用这一份 [六仓协调 Critic 提示词](SIX_REPO_CRITIC_PROMPT.md)，按仓独立给出结论。已批准标准内的小回归继续原入口；一仓缺权限或待裁定不阻其他仓。不等待 DA P0/Hook/共享核心，也不开发第二个通用验收平台。未来仅从本仓已有逐项结果薄转换，原专业逻辑保持独立可用。

供同版 execution-ready 审查的短 kickoff 草案如下（逐仓把目标 task 链接代入，批准后引用对应 review；不是本轮已启动实现）：

> 在上述目标仓库及既有有效分支，执行该仓完整 validator-hardening 任务。以该任务冻结正文作为本次有界 Plan/实施合同；Mica 继续原 rebuild Goal。先核当前 HEAD、工作树归属与原授权，再直接完成批准范围的验收器修复/增强、案例接线和真实运行。不得改专业标准或扩展权限；高影响现场动作只沿已存在的准确授权。结果写任务指定位置，报告实际数量、作用、证据和未证范围。不要等待中央 Delivery Assurance，不另建线程、分支或主 Goal。

Mica 分支已从历史 rebuild 线索更新为当前 functional-convergence，已只读核实本地分支/HEAD/脏产物。CUHK_Date 根 AGENTS 明定 prompts/tasks，虽其引用的部分 managed 规则不在当前 GitHub tree，本文件仍按根指定正式入口新增；现有 docs/operations/prompts 仅作背景。其余远程工作树未登录核实，不能宣称无冲突，实施任务已要求开工前检查。

精确源码起点、任务创建 commit、全文 blob 和来源版本见 [写入与回读记录](WRITE_PROBE.md)。本交付的完成含义仅为六份真实、完整、可定位的实施包已交付。

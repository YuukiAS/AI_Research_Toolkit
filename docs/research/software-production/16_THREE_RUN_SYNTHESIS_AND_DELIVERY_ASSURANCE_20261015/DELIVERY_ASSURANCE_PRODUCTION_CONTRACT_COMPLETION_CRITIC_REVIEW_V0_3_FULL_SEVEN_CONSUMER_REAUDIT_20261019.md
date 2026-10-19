# Delivery Assurance Production Contract v0.3 — Full Seven-Consumer Reaudit

Source: user-forwarded independent Critic review  
Date: 2026-10-19  
Reviewed proposal: `DELIVERY_ASSURANCE_PRODUCTION_CONTRACT_COMPLETION_PROPOSAL_V0_3_20261019.md`  
Reviewed branch state: `research/software-production-decision-20261013@5ebdc0c2038b429c99102abb9679bb2a4523dbac`  
Review stage: `DESIGN_FULL_SEVEN_CONSUMER_REAUDIT`  
Governance source: `YuukiAS/AI_Skills_Collection@89d740f03863f8ab1351a4865a1e78dc37f75998`  
Planner/Critic contract: `1.7`  
Capability Gate Policy: `1.2`

## 结论

`REVISE`

v0.3 的公共内核方向应保留：职责分层、交付目标图、候选与证据失效、分层声明、防止实现者自签、长期任务继续由原有调度负责人持有，以及不新建第二状态机、中央数据库或服务。

阻塞点不是要求推翻公共架构，而是七个真实 consumer 尚未全部成为正式设计合同。正式 consumer inventory 只具体冻结了 Lucerna、CARE、Bobbio；Mica、SeminarArc、Asteria、CUHK_Date 仍缺少明确的最终消费对象、正常入口、负责人、声明上限、最高风险失败链和恢复路径。公共 `DA-G10`–`DA-G15` 也尚未扩展为符合 Capability Gate Policy 1.2 的七仓正常入口实例。

当前状态：

```text
public_da_1_interface=NOT_FROZEN
phase1_scope=QUALIFIED_STOP_SEAM_PROBE_ONLY
production_g10_g15=NOT_EVALUATED
ready_for_execution_package=NO
production_implementation_authorized=NO
```

## 阻塞项 1：七仓覆盖没有成为正式设计合同

v0.4 必须为 Lucerna、Bobbio、Mica-for-ChatGPT、SeminarArc、Asteria、CUHK_Date、CARE_Challenge 分别冻结：

- 最终消费对象及多对象依赖图；
- 正常开发、验收和发布入口；
- 产品、视觉、科学、环境与用户判断的唯一负责人；
- 可复用的现有 validator、controller 或黑盒验收；
- Delivery Assurance 只补充的责任；
- 完整成功链；
- 最高风险失败链；
- 同任务恢复入口；
- HUMAN_ONLY 边界；
- 声明上限；
- adapter 精确来源、维护 owner 和预计复杂度。

这些内容不能留给 Executor 在 consumer implementation 时临场推导。

## 阻塞项 2：Adapter 可能通过遗漏削弱标准

v0.4 必须冻结 adapter 单调性：

1. 项目 adapter 只能增加项目义务、绑定参数或收窄真实目标，不能删除、降级或替换领域最低标准；
2. 未映射但可能影响验收的变化必须进入 `UNKNOWN`，再扩大到相应依赖闭包，不能进入 `NONE`；
3. 每个 consumer 必须有遗漏变异测试：从 adapter 删除一条真实必需映射后，正常入口必须拒绝 `USER_READY`；
4. canonical authority set 必须有内容摘要；定位文件缺失、迁移、冲突或语义变化时返回 adapter stale / authority conflict；
5. 机械 locator 更新由 Maintainer 或 Executor 在同一任务内修复；产品或科学语义冲突返回项目或领域 owner。

## 阻塞项 3：权威定位漂移没有自动恢复闭环

Bobbio 是现实反例：0.2.0 acceptance 记录已经接受，但 `CURRENT_MILESTONE.md` 和 Roadmap 仍表达旧状态，当前开发又已进入 0.3.0。

需要冻结恢复任务：

```text
task_key=bobbio--status-authority-recovery
required_output=
  freeze current milestone authority by branch and release state
  repair or explicitly supersede stale current-status documents
  prove pre-repair resolver returns authority conflict
  prove post-repair resolver selects the correct 0.3.0 contract on develop
  prove accepted 0.2.0 evidence cannot satisfy a 0.3.0 claim
```

同样的 authority-locator drift 检查必须成为七仓公共合同，而不是 Bobbio 特例。

## 阻塞项 4：生产 Gate 仍过粗

`DA-G10`–`DA-G15` 只说明公共职责，还没有逐仓冻结：

- 用户怎样从正常任务入口触发解析；
- 哪个 exact final object 接受哪项专业验收；
- 哪个高风险负例必须被正常入口拒绝；
- 失败后回到哪个原任务恢复点；
- 哪些证据可以复用，哪些必须重新采集；
- 什么情况下只能声明 source、artifact、installed 或 live，不能声明整体可用。

v0.4 必须形成“公共 Gate + 七仓实例”。每个 consumer 至少有一条完整正向链和一条代表最高风险的负向链，并绑定同一最终候选和 should-not-change。

## 阻塞项 5：HUMAN_ONLY 和声明上限没有逐仓冻结

- Mica：自动证据最多到“可以进行一次真实登录态设备验收”；synthetic fixture 不能证明真实性能收益。
- SeminarArc：Emulator 不能代签真实麦克风、相机和厂商后台行为。
- Lucerna：repository Hook 不能代签 Windows 隔离或真实 native acceptance。
- CUHK_Date：完整 staging 验收也不能授权真实 Matching。
- CARE：运行合同完成不能代签科学路线晋升。
- Bobbio、Asteria 也必须分别冻结最终用户判断和外部/部署边界。

用户不得成为第一轮普通 QA；在用户介入前，所有可由项目/领域 owner 发现的普通缺陷必须先闭合。

## 七仓真实因果链摘要

### Lucerna

最终对象是 exact Windows release executable、真实进程/native UI、provider/auth state。复用 `scripts/acceptance-preflight.ps1`、development acceptance 和独立 native release review。最高风险是 fixture 进入用户实例、Hook 冒充 OS 边界、source/executable/PID 不一致、Producer 自评冒充独立 review。失败返回同一任务重建 exact candidate 并启动 fresh Reviewer。

### Bobbio

最终对象是 Windows Reader、隔离 Zotero profile/data directory、真实 PDF/annotation round-trip 和不变 PDF。复用 safe acceptance、audit 和 Windows GUI。最高风险是真实 profile 被触碰、系统 Zotero handler 绕过隔离、PDF 被重写、cache 冒充 annotation authority、0.2.0 evidence 被复用到 0.3.0。先完成 authority recovery。

### Mica

最终对象是实际加载到目标浏览器 profile 的 extension，以及真实 ChatGPT 长对话和低功耗设备行为。复用 build、focused regression、risk-triggered E2E、`dist/mica-dev`、loaded-version check 和隐私安全报告。最终真实账户/设备检查可以是 HUMAN_ONLY，但用户不能成为第一轮功能/性能 reviewer。

### SeminarArc

最终对象是 exact APK、application id/version/signature/hash、installed instance、持久化数据、用户流程和导出物；真实麦克风/相机/后台行为是独立硬件边界。复用 Gradle/unit/lint、Emulator instrumentation、package black-box、截图/UI tree/logcat、visual golden、stress、API 29/36 和独立 review。最高风险是静态页面/假按钮/内存数据冒充 MVP、Emulator 冒充硬件、自动覆盖 golden、source/APK 漂移。

### Asteria

最终对象是 fixed public entry 上的 Architecture/Lineage/Evidence 表面和其表达的科学关系。复用 producer visual pack、browser/regression、fixed deployment 和 single GPT Work black-box review。最高风险是实现与 validator/rubric 同轮放宽后自签，或 source/build/deployment/report identity 漂移。需保留旧标准对照和受保护校准。

### CUHK_Date

最终对象包括 source、staging Web/API、database migration/ProductState、producer rehearsal、persona prestate、one-time audit ticket、final independent browser reports。最高风险是 source/deployment/campaign identity 不一致、ticket 错误消费、rehearsal/final batch 复用身份、旧 campaign 证明新 candidate、部分 persona 结果扩大为整体完成。真实 Matching 仍需用户单独授权。

### CARE_Challenge

最终对象是 code/config/split/checkpoint/prediction/metric/log/cache、Slurm accounting、aggregation、strict validators、controller packet 和 scientific adequacy；仅在授权后包含 submission zip/hosted metric。最高风险是 terminal job 冒充 scientific completion、欠训练结论、proxy metric 冒充挑战指标、artifact identity 混淆和只看 finalizer exit code。DA 只消费既有 owner 结果，不轮询、submit、cancel 或解释 Slurm。

## 反例攻击结论

v0.3 的公共结构可以表达以下问题，但在七仓实例冻结前仍不能证明会在正常入口被调用：

- 功能降级但测试全绿；
- fixture 过拟合；
- mock/假数据活到交付；
- 实现者同轮改松 validator；
- source 与安装/部署对象不同；
- GUI 机械绿但真实交互差；
- PPT/论文只过格式检查；
- CARE terminal 但 scientific claim 未闭合；
- validator 存在但正常入口未调用；
- adapter 漏掉一项义务；
- 某仓永久推迟到“以后适配”；
- 用户成为第一位发现普通问题的人。

## v0.4 实现顺序要求

```text
v0.4 design review
→ freeze da/1 with adapter monotonicity, authority freshness, AGENTS lifecycle and claim ceilings
→ minimal workflow-core resolver + minimal Bridge identity/Stop integration
→ one low-cost complete vertical consumer chain
→ repair common core from that real chain
→ Lucerna native chain + CARE scientific long-run chain
→ Bobbio after authority recovery
→ Mica + SeminarArc + Asteria + CUHK_Date remaining adaptations
→ seven-consumer fresh-session normal-entry closure
→ AI Skills formal release and managed adaptation
```

首个低成本纵向 consumer 由 Planner 冻结为 Asteria；只有 fixed public environment 在实施前检中不可用时，才使用预先冻结的 SeminarArc Emulator fallback。Executor 不得临场选择。

## 当前边界

```text
VERDICT=REVISE
REQUIRED_NEXT_PROPOSAL=v0.4
DA_1_INTERFACE_FREEZE_ALLOWED=NO
EXECUTION_PACKAGE_ALLOWED=NO
CODEX_IMPLEMENTATION_ALLOWED=NO
R5_PHASE1_REOPENED=NO
```

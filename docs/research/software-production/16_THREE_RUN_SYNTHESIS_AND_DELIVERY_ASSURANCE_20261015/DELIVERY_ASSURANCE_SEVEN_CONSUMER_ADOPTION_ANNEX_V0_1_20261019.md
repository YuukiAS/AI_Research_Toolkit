# Delivery Assurance 七仓接入附录 v0.1

Status: **PLANNER DESIGN INPUT / INDEPENDENT CRITIC REVIEW REQUIRED / NOT IMPLEMENTATION AUTHORIZATION**  
Date: 2026-10-19  
Design topic: `software-production--delivery-assurance`  
Applies to: Production Contract v0.4

## 1. 这份附录解决什么

公共架构已经说明“项目提供 adapter、领域能力判断质量、`workflow-core` 选择门槛、Bridge 绑定身份”，但这还不足以证明七个真实仓库会接得上。这里把 Lucerna、Bobbio、Mica、SeminarArc、Asteria、CUHK_Date、CARE_Challenge 分别冻结成可实现合同：最终验什么、从哪个正常入口验、谁判断、失败回哪里、何时需要用户、最多能声明到哪一层。

这不是要求立即修改七仓，也不是给每个仓库建立新控制器。每个 adapter 都只引用仓库已有入口、已有专业规则和现有任务流程；Delivery Assurance 只补统一的义务选择、目标身份、结果包装和交付声明。

## 2. 七仓共同接入规则

每个仓库的正式 adapter 固定在：

```text
automation/delivery_assurance/ADAPTER.toml
automation/delivery_assurance/gates.toml
```

adapter 只能增加项目义务、绑定参数、描述目标与现有入口，不能删除、降级或替换领域最低标准。每个 adapter 必须包含：

- `repo_identity`、适用 branch/release；
- `canonical_authority_set` 及内容摘要；
- root/nested `AGENTS.md` authority set；
- 最终消费对象和依赖边；
- normal entry；
- project-local gate refs 与 domain capability refs；
- claim ceiling；
- HUMAN_ONLY 条件；
- long-run owner；
- source/path/target 到 impact tag 的规则；
- 同任务恢复入口。

任何未映射但可能影响验收的变化都进入 `UNKNOWN`，并扩展到受影响依赖闭包，不能默认为 `NONE`。每个仓库都必须执行以下变异检查：

1. 删除一个必需 Gate 映射；
2. 删除一个 sibling consumed target；
3. 把 canonical locator 指向旧版本；
4. 删除或移动一个生效的 nested `AGENTS.md`；
5. 把 MUST 改成 SHOULD；
6. 提高 milestone/version 后复用旧证据；
7. 制造两个权威来源冲突。

普通任务入口必须拒绝 `USER_READY`，返回 `UNKNOWN`、`ADAPTER_STALE` 或 `INSTRUCTION_AUTHORITY_CONFLICT`。测试不能只检查字段是否存在。

## 3. Lucerna

### 当前来源

```text
repo = YuukiAS/Lucerna
ref = main@79dd2875d3da33c6a6d80e5e35bea812b84c1ceb
adapter_owner = Lucerna project owner
estimated_adaptation = LIGHT_TO_MEDIUM
```

### 最终消费对象图

```text
source commit
  -> Windows release executable + embedded source identity
  -> installed/running process (PID + start time)
  -> native windows / tray / controls
  -> provider/auth/live-state aggregation
  -> user-visible status, metrics, CTA, notification and copy
```

安装相关任务还包括：installer、登录启动项、升级迁移、卸载和精确归属的系统设置。

### 正常入口与现有能力

- `scripts/governance-preflight.ps1 -Quick`
- `scripts/governance-regression.ps1`
- `scripts/acceptance-preflight.ps1`
- `scripts/development-acceptance.ps1`
- `docs/workflows/LUCERNA_EXECUTION_GOVERNANCE.md`
- `docs/workflows/LUCERNA_VISUAL_ACCEPTANCE.md`
- `docs/workflows/LUCERNA_INDEPENDENT_RELEASE_ACCEPTANCE.md`

Lucerna project owner 决定状态、安装、provider 和本机生命周期语义；Frontend Design 判断实际界面、层级、交互、文案和视觉；fresh native Reviewer 判断 exact candidate；Bridge 只验证 commit/executable/PID/evidence identity。

### Delivery Assurance 只补什么

- 把 source、EXE、PID、live-state、review result 绑定为同一目标图；
- 根据实际改动选 STATE/NATIVE/UI/PRIVACY/INSTALL 中的必要实例；
- 拒绝 fixture、旧 screenshot、错误 PID 或 Producer 自评冒充最终 native review；
- 在失败后回原任务修复、重建，并只重跑失效闭包。

### 正向完成链

```text
frozen Goal and claim
-> governance preflight
-> exact source commit build
-> release executable identity freeze
-> required project/domain checks
-> two consecutive candidate-consistent acceptance preflight passes when required
-> fresh independent native review on exact PID/candidate
-> Bridge freshness check
-> workflow-core claim aggregation
```

### 最高风险负向链

将 fixture/control state 注入 founder-facing runtime，或让 source commit、EXE hash、PID 与 review evidence 不一致。正常入口必须返回 `IDENTITY_MISMATCH`、`EVIDENCE_GAP` 或 `PRODUCT_DEFECT`，不得产生 `USER_READY`。repository Hook 成功不能代签 Windows/OS 隔离。

### 恢复、人类边界与声明上限

失败回当前 Lucerna task：修产品或证据工具、重建 exact candidate、fresh review。只有真实 foreground/OS action、secret/auth 或最终主观产品接受才进入 HUMAN_ONLY；用户不做普通 UI/debug QA。

- 未构建：最高 `LOCAL_SOURCE`
- exact EXE 及 artifact QA：最高 `ARTIFACT_READY`
- 安装/运行和 native evidence：可到 `INSTALLED`
- live provider/auth 路径在明确时间窗口成立：可到 `LIVE`
- 缺 fresh independent native review 时，不得给完整 Windows release `USER_READY`

### 必需 consumer Gate 实例

- `DA-G10-LUCERNA_RESOLUTION`
- `DA-G11-LUCERNA_ADAPTER_MONOTONICITY`
- `DA-G13-LUCERNA_BRIDGE_COMPATIBILITY`
- `DA-G14-LUCERNA_NATIVE_FINAL_SURFACE`

## 4. Bobbio

### 当前来源

```text
repo = YuukiAS/Bobbio
main = e7d929bad2d4b23939c81920e77390efbce42b96
current development = develop@a64edfd6c5b11f81599bfcfc327be5964633a7b5
adapter_owner = Bobbio project owner
estimated_adaptation = MEDIUM_AFTER_AUTHORITY_RECOVERY
```

### 最终消费对象图

```text
source commit / milestone contract
  -> Windows Bobbio executable
  -> isolated Zotero profile + isolated data directory
  -> real PDF attachment
  -> Bobbio Reader interaction
  -> Zotero-compatible annotation create/update/delete/read-back
  -> unchanged source PDF + rebuildable Bobbio cache
```

0.3.0 还包括 line/arrow/sequence/formula/freehand 的高层语义及其向 Zotero-compatible primitives 的降级关系。

### 正常入口与现有能力

- `pnpm validate`
- `pnpm bobbio:acceptance`
- `pnpm bobbio:measure-native-performance`
- `pnpm bobbio:capture-native-shell-evidence`
- `pnpm bobbio:acceptance:0.2.0`，仅用于其明确的 0.2.0 历史/回归范围
- `pnpm zotero:profile-audit`
- `pnpm zotero:data-dir-audit`
- `pnpm bobbio:smoke:release`
- `docs/DEVELOPMENT_WORKFLOW.md`
- Zotero compatibility/authority contracts

Bobbio project owner 决定 milestone、Reader、Zotero authority 和 enhanced annotation 语义；Frontend Design 判断界面；项目 native acceptance 和独立产品审查分别给证据；用户只做最终产品接受。

### 必须先完成的权威恢复

当前 `main` acceptance 记录 0.2.0 已接受，而旧 current-status 文档仍表达 final gate；`develop` 已是 0.3.0。正式 adapter 前必须完成 `bobbio--status-authority-recovery`：按 branch/release 冻结 milestone authority，修复或显式 supersede 旧文档，并证明 0.2.0 evidence 不能满足 0.3.0 claim。

### Delivery Assurance 只补什么

- 绑定 branch/milestone、EXE、profile/data-dir、PDF hash、annotation result；
- 防止系统 `zotero://` handler 绕过隔离；
- 区分真实 Zotero round-trip、fake API native performance 和 UI review；
- 拒绝 Bobbio cache 成为 annotation authority；
- 允许 0.2.0 evidence 仅作为明确的回归证据，不提升 0.3.0 claim。

### 正向完成链

```text
branch-aware milestone authority
-> source/build/native checks
-> exact executable
-> isolated Zotero profile and data directory proof
-> Reader/PDF/annotation round-trip
-> PDF immutability + cache rebuild + real profile untouched
-> project/domain product review
-> Bridge identity/freshness
-> claim aggregation
```

### 最高风险负向链

让 acceptance 打开真实 profile、经系统 URL handler 进入默认 Zotero、修改 PDF，或将 0.2.0 accepted evidence 复用于 0.3.0。任何一项出现都必须 FAIL/UNKNOWN，并停止对应 claim；不得通过“Reader 能打开”降级接受。

### 恢复、人类边界与声明上限

环境/runner 问题回同一 Bobbio task修复；authority conflict 先回项目 owner 的 recovery task，不问用户维护 milestone 清单。只有真实 GUI 能力不可用或最终产品判断才需要用户。

- 权威冲突未解：相关 current milestone claim = `UNKNOWN`
- source + tests：`LOCAL_SOURCE`
- exact executable + artifact checks：`ARTIFACT_READY`
- isolated real Zotero + native Reader：`INSTALLED`
- final accepted milestone 仍需项目/用户正式接受

### 必需 consumer Gate 实例

- `DA-G10-BOBBIO_RESOLUTION`
- `DA-G11-BOBBIO_AUTHORITY_AND_ADAPTER`
- `DA-G14-BOBBIO_ZOTERO_ROUNDTRIP`
- `DA-G15-BOBBIO_VERSIONED_ADAPTATION`

## 5. Mica-for-ChatGPT

### 当前来源

```text
repo = YuukiAS/Mica-for-ChatGPT
ref = main@7059c0dc24b908b57bd0e1f475142ba4f4520621
adapter_owner = Mica project owner
estimated_adaptation = MEDIUM
```

### 最终消费对象图

```text
source + release config
  -> built dist/mica-dev + manifest/version
  -> actual extension loaded in exact browser profile
  -> current ChatGPT DOM/runtime
  -> long-thread rendering and composer hot path
  -> privacy-safe diagnostic report
  -> target lower-power device observation
```

### 正常入口与现有能力

- `npm run build`
- focused fixture/validator checks
- `npm test`
- `npm run test:e2e` when lifecycle/DOM risk requires it
- `npm run test:e2e:stress` only when indicated
- `npm run package:release`
- stable development output `dist/mica-dev`
- popup/page guided diagnostics and `Copy report`
- final manual authenticated real-site acceptance

Mica project owner owns host behavior、privacy、hot-path and benefit semantics；Frontend Design handles actual extension UI；用户仅持有真实 account/device final observation；Bridge binds source→dist→loaded identity→report。

### Delivery Assurance 只补什么

- 选择与实际改动相称的 testing ladder；
- 绑定 source、runtime version、manifest、dist digest 和实际 loaded instance；
- 区分 synthetic fixture、isolated Chromium、real authenticated ChatGPT、target device；
- 防止 validator/evidence contract 协调改写后自洽假 PASS；
- 把“功能正确”和“低内存设备确有性能收益”作为不同义务。

### 正向完成链

```text
impact audit
-> focused regression
-> npm test
-> risk-triggered E2E/stress if required
-> rebuild dist/mica-dev with unique version
-> verify actual loaded version
-> guided privacy-safe real-site check
-> target device benefit/no-regression evidence when claimed
-> domain/project judgment
-> Bridge freshness and claim aggregation
```

### 最高风险负向链

用 synthetic 90-turn fixture 或 heap 指标宣称真实 ChatGPT/低功耗设备性能完成；或为了安全 PASS 默认关闭主要功能。正常入口必须限制 claim 为 synthetic/controlled evidence，真实收益为 UNKNOWN；关闭功能不能同时获得 benefit PASS。

### 恢复、人类边界与声明上限

自动化负责 source、build、fixture、E2E、diagnostic instrumentation 和 privacy-safe report。用户只在最后执行一次边界清晰的真实登录态/设备操作，不需要打开 DevTools 或查 DOM。

- 自动证据可到 `ARTIFACT_READY`
- 已加载、非登录敏感路径成立可到有限 `INSTALLED`
- 真实性能/宿主兼容 claim 在真实登录态和目标设备确认前为 `UNKNOWN`
- 用户动作只是最终观察，不替代前面的 ordinary QA

### 必需 consumer Gate 实例

- `DA-G10-MICA_RESOLUTION`
- `DA-G11-MICA_ADAPTER_OMISSION`
- `DA-G14-MICA_ACTUAL_HOST_AND_BENEFIT`
- `DA-G15-MICA_LOADED_VERSION_ADAPTATION`

## 6. SeminarArc

### 当前来源

```text
repo = YuukiAS/SeminarArc
ref = main@5652fe17ce60625f3ff7c758fcc0183f920189de
adapter_owner = SeminarArc project owner
estimated_adaptation = LIGHT_TO_MEDIUM
```

### 最终消费对象图

```text
source commit
  -> APK (application id/version/signature/hash)
  -> installed package on explicit Emulator/device
  -> Room/app-owned files/foreground service
  -> visible seminar/record/photo/timeline/clip/export flows
  -> Markdown/ZIP output
  -> hardware-specific microphone/camera/background observations when claimed
```

### 正常入口与现有能力

- Gradle build/unit/lint
- Windows Emulator instrumentation/connected tests
- `scripts/run-blackbox-acceptance.ps1`
- screenshot/UI tree/logcat evidence
- visual golden and accessibility checks
- fixed-seed stress/recovery
- API 29/36 matrix where required
- `scripts/verify-gpt-work-acceptance.ps1`
- independent GPT Work after producer-side QA
- protected physical-device smoke only for non-substitutable hardware claims

Android Lead/Compose Expert and SeminarArc project owner own app semantics；Frontend Design owns visible product quality；physical device owner supplies hardware observation；Bridge binds source/APK/installed package/evidence。

### Delivery Assurance 只补什么

- 绑定 source→APK→signature/hash→installed package→scenario→review；
- 防止 static Compose、fake button、memory-only data 冒充 MVP；
- 区分 Emulator、real media、stress 和 protected physical device；
- 防止测试失败时自动改 golden；
- 物理设备不可用时只冻结对应 hardware claim，不阻断其它工作。

### 正向完成链

```text
source + task contract
-> unit/lint/build
-> exact APK identity
-> Emulator installed black-box flow
-> persistence/re-entry/export
-> visual/accessibility/stress as indicated
-> independent review
-> optional protected physical-device smoke for hardware claims
-> Bridge/claim aggregation
```

### 最高风险负向链

把 fixture/Emulator 结果升级成真实麦克风、相机或厂商后台行为；或自动覆盖 golden 让回归消失。正常入口必须保持 hardware claim UNKNOWN，golden/rubric 变化需要专业 owner 冻结，不能自签。

### 恢复、人类边界与声明上限

Emulator/tooling 问题由项目 Executor 修复。只有 explicit serial 的真机写操作、production signing、Play Console、真实账号/数据或最终主观体验才需要用户。

- JVM/build：`LOCAL_SOURCE`/`ARTIFACT_READY`
- exact APK + Emulator black-box：`INSTALLED` on Emulator
- 真机硬件 claim 只能由相应 physical evidence 支持
- Emulator 不代签硬件/厂商行为

### 必需 consumer Gate 实例

- `DA-G10-SEMINARARC_RESOLUTION`
- `DA-G11-SEMINARARC_ADAPTER_MONOTONICITY`
- `DA-G14-SEMINARARC_INSTALLED_BLACKBOX`
- `DA-G14-SEMINARARC_PHYSICAL_CLAIM_BOUNDARY`

## 7. Asteria

### 当前来源

```text
repo = YuukiAS/Asteria
ref = main@193c033659a7612a99442763077217b130e9b756
adapter_owner = Asteria project owner
estimated_adaptation = MEDIUM
preferred_first_vertical_consumer = YES
```

### 最终消费对象图

```text
source + canonical scientific graph
  -> Vite build
  -> shared server/fixed public deployment
  -> Architecture / Lineage / Evidence UI
  -> DOM/SVG geometry and inspector state
  -> screenshot review pack
  -> independent GPT Work report
  -> user final acceptance
```

### 正常入口与现有能力

- `npm run build`
- focused architecture validators, including current `test:architecture-rc19`
- `npm run test:browser` / `npm run test:e2e`
- `npm run test:regression`
- `npm run capture:architecture-rc19`
- fixed public URL and `/api/asteria/status`
- single canonical GPT Work black-box campaign
- `results/<task_key>/VISUAL_REVIEW_PACK.md`
- Frontend Design producer self-QA

Scientific project owner owns graph truth；Frontend Design owns scientific surface readability/visual quality；project owner owns geometry/deployment/product semantics；independent GPT Work owns designated black-box review；Bridge binds source/build/deployment/pack/report。

### Delivery Assurance 只补什么

- 把 science truth、mechanical geometry、whole-product visual reading 和 deployed identity分开；
- 防止 implementation 与 validator/rubric 同轮放宽后自签；
- 绑定 fixed public URL 到 exact source/build/config；
- 要求旧标准结果、semantic diff 和真实 known-bad 校准；
- 失败回同一 task修复后，按影响决定 targeted review 或 full campaign。

### 正向完成链

```text
frozen scientific/product contract
-> source implementation
-> focused validator + regression
-> browser geometry/state checks
-> visual review pack producer QA
-> refresh fixed public deployment
-> verify source/deployment identity and status endpoint
-> single independent GPT Work campaign
-> consolidated triage and repair if needed
-> user final acceptance
```

### 最高风险负向链

实现、量测脚本、阈值和 expected result 同轮修改，新的测试全部通过，但真实图仍碰撞或科学方向错误。正常入口必须保留旧标准/known-bad、标记 validator semantic change、要求独立 geometry/raw observation 和 professional review；缺值不能默认 0。

### 恢复、人类边界与声明上限

固定 public runtime 的工程修复由项目 owner/Executor完成，不创建临时 URL。用户只在 GPT Work 全部通过后做最终产品判断；用户不负责第一轮视觉 QA。

- source/build：`LOCAL_SOURCE`/`ARTIFACT_READY`
- fixed deployment identity + browser checks：有限 `LIVE`
- whole-product `USER_READY` 仍需 designated GPT Work 和用户最终接受

### 必需 consumer Gate 实例

- `DA-G10-ASTERIA_RESOLUTION`
- `DA-G11-ASTERIA_ADAPTER_MUTATION`
- `DA-G14-ASTERIA_DEPLOYED_SCIENTIFIC_SURFACE`
- `DA-G13-ASTERIA_EXISTING_WORKFLOW_COMPATIBILITY`

## 8. CUHK_Date

### 当前来源

```text
repo = YuukiAS/CUHK_Date
ref = main@9f25c7754d3c80d0be74f5b71016320f55753ae6
adapter_owner = CUHK_Date project owner
estimated_adaptation = MEDIUM_TO_RICH_DECLARATIVE
```

### 最终消费对象图

```text
source commit
  -> staging Web deployment + campaign identity
  -> staging API deployment + same campaign identity
  -> database migration / ProductState
  -> producer rehearsal identities and state
  -> separate final-batch identities
  -> one-time audit tickets / authenticated browser sessions
  -> persona reports + launch-quality dimension results
  -> founder go/no-go
  -> separately authorized real Matching
```

### 正常入口与现有能力

- `pnpm verify:registration-critical-path-hosted`
- visible staging registration/auth/profile/questionnaire/dashboard path
- campaign/ticket generation and validation contracts
- `docs/operations/blackbox-audit/CAMPAIGN_ORCHESTRATION.md`
- `docs/operations/blackbox-audit/LAUNCH_QUALITY_ACCEPTANCE_CONTRACT.md`
- producer full disposable rehearsal
- separate final-batch generation
- one canonical `PARENT_WORK.md`
- serial persona GPT Work and consolidated dimension-level result

Project owner owns dating product/state/privacy/campaign semantics；Frontend/product-copy owners judge UI/language；existing controller/Parent Work owns campaign execution；founder owns final Matching go/no-go；Bridge binds source/Web/API/run/ticket/result identities。

### Delivery Assurance 只补什么

- target graph and identity checks across source/Web/API/database/campaign/persona；
- prevent rehearsal/final identity overlap and stale campaign reuse；
- require each launch dimension to have own evidence，not fan out aggregate PASS；
- preserve one-time ticket commit-on-success and recovery semantics；
- keep real Matching authorization outside staging completion。

### 正向完成链

```text
exact pushed staging candidate
-> source/Web/API campaign identity check
-> hosted registration critical path
-> full producer rehearsal for all personas
-> repair and repeat on same candidate class until clean
-> retire rehearsal state
-> generate fresh distinct final batch
-> Parent Work runtime preflight
-> serial independent persona campaign
-> per-dimension consolidation
-> founder go/no-go
-> real Matching remains separate authorization
```

### 最高风险负向链

source 与部署不一致、Web/API campaign identity 不一致、ticket 在 session建立前被永久消费、rehearsal/final batch 复用身份、旧 campaign evidence 证明新 candidate、一个 persona/aggregate PASS扩成全部维度。任何一项必须阻止 Parent delivery 或 USER_READY，并回当前 campaign/task recovery。

### 恢复、人类边界与声明上限

产品/fixture/harness问题由 Executor修复；tool-only child failure沿已有 recovery child语义，不丢弃安全的独立 evidence。用户只启动一次 canonical Parent Work并做 founder final decision；不负责调 ticket、persona、状态或普通 UI bug。真实 Matching 开放永远是新的明确授权。

- source/staging artifacts 可分别声明对应层级
- 完整 staging campaign 可支持 staging `LIVE`/launch-quality claim
- 不自动产生 production Matching 或真实用户开放 claim

### 必需 consumer Gate 实例

- `DA-G10-CUHKDATE_RESOLUTION`
- `DA-G11-CUHKDATE_IDENTITY_AND_ADAPTER`
- `DA-G14-CUHKDATE_PERSONA_LAUNCH_QUALITY`
- `DA-G15-CUHKDATE_MANAGED_ADAPTATION`

## 9. CARE_Challenge

### 当前来源

```text
repo = YuukiAS/CARE_Challenge
ref = main@75a40e454de43b64e59a0b0b438ff57ef2bb8345
adapter_owner = CARE scientific project owner
estimated_adaptation = MEDIUM_DECLARATIVE / NO_NEW_SCHEDULER
```

### 最终消费对象图

```text
frozen scientific contract
  -> code/config/data split/model/training entry
  -> Slurm job set and resource accounting
  -> checkpoint
  -> prediction/ground truth
  -> metric/aggregation/validator
  -> controller/finalizer packet
  -> scientific adequacy/conclusion
  -> optional submission zip / hosted metrics under separate authority
```

### 正常入口与现有能力

- `START_HERE_FOR_GPT.md`
- `GPT_PLANNER_CARE_PROTOCOL.md`
- `prompts/AGENT_FLOW_V2_PROTOCOL.md`
- milestone/controller schemas
- existing controller / executor / mapper / deterministic finalizer / validator
- route hard-requirements matrix when applicable
- strict model/data/metric validators
- submission packager only when explicitly authorized

CARE controller owns operational continuity and terminal accounting；scientific project/domain owner owns model/data/adequacy/conclusion；Slurm remains scheduler；Planner/user owns route promotion、external upload and next milestone；Bridge only binds identities and resume locator。

### Delivery Assurance 只补什么

- choose required SCI_ENTRY/SCI_CAUSAL/SCI_SCALE/SCI_EVIDENCE/SCI_RESUME/SCI_CONCLUSION instances；
- bind code/config/split/job/checkpoint/prediction/metric/report；
- consume existing WAITING/terminal/finalizer/resume facts without polling or resubmission；
- separate operational completion、scientific NO_GO and external submission；
- prevent proxy metric、undertrained result、receipt-only packet from becoming scientific PASS。

### 正向完成链

```text
frozen Planner scientific contract
-> controller task graph
-> formal entry implementation and cheap causal/scale prechecks
-> authorized Slurm execution through existing owner
-> terminal accounting
-> deterministic finalizer/collector
-> checkpoint/prediction/GT/metric validation and aggregation
-> controller verification
-> scientific adequacy/domain judgment
-> Planner/user scientific route decision
-> optional separately authorized packaging/upload
```

### 最高风险负向链

Slurm `COMPLETED`、finalizer exit 0 或 receipt 存在被当成 scientific completion；或欠训练/错误 split/proxy metric导致错误路线淘汰。正常入口必须保留 WAITING/UNKNOWN/SCIENTIFIC_NO_GO 的差异，并拒绝未充分 evidence 的性能结论。

### 恢复、人类边界与声明上限

PENDING/RUNNING/AWAITING_SACCT 由现有 controller/finalizer持有，不耗 DA repair round。运行/环境故障沿原任务恢复。用户只在新资源、外部上传、路线晋升/停止或不可推导科学取舍时介入。

- source/config 可先到 `LOCAL_SOURCE`
- checkpoint/report可到 `ARTIFACT_READY`，但必须有来源和领域证据
- formal run在观察窗口内可到科学执行的 `LIVE`
- operational VERIFIED_COMPLETE 不代签 scientific conclusion或route promotion

### 必需 consumer Gate 实例

- `DA-G10-CARE_RESOLUTION`
- `DA-G11-CARE_ADAPTER_MONOTONICITY`
- `DA-G12-CARE_LONG_RUN_OWNER_HANDOFF`
- `DA-G14-CARE_SCIENTIFIC_FINAL_TARGETS`

## 10. 七仓 Gate 总矩阵

每个 consumer 的 release/adaptation 判断必须由同一 consumer final candidate 直接通过以下六类实例；不能只用公共 `DA-G10`–`DA-G15` 的 schema/unit test：

| 公共能力 | 每仓必须证明的实例 |
|---|---|
| `DA-G10` Resolver | 正常任务入口能选到该仓真实必需 Gate，且 isolated 小改不被强制全量验收 |
| `DA-G11` Adapter | 删除必需映射、旧 locator、missing sibling target 后，正常入口拒绝 USER_READY |
| `DA-G12` Long-run | 仅适用于有外部 owner 的仓库；等待、终态、resume 不产生重复执行 |
| `DA-G13` Compatibility | 既有 Lite/Review/Control/Persistent/project controller 与普通任务不被 DA 破坏 |
| `DA-G14` Domain/project QA | exact final consumed target 经过真实专业入口；build/file/schema 不足以 PASS |
| `DA-G15` Release/adaptation | installed/loaded identity、fresh session、normal entry 和 should-not-change 在所需 consumer 上成立 |

七仓闭合前，不得用“公共核心已通过”宣称完整 Delivery Assurance 已可生产使用。

## 11. 首个纵向 consumer 和后续顺序

首个低成本完整纵向 consumer 固定为 Asteria，因为它已有 fixed public URL、真实 browser/visual normal entry、完整回归和独立 GPT Work，能较低成本贯通 source→deployment→professional QA→claim。

唯一预定义 fallback：若实施前检证明 Asteria fixed public environment 在批准窗口不可用，改用 SeminarArc Emulator 链。该切换由 frozen preflight condition 决定，不由 Executor临场选择。

后续顺序：

```text
Asteria vertical chain
-> repair common core
-> Lucerna native + CARE scientific long-run
-> Bobbio after authority recovery
-> Mica + SeminarArc + CUHK_Date remaining adaptation
-> seven-consumer fresh-session normal-entry closure
```

## 12. 当前边界

```text
SEVEN_CONSUMER_DESIGN_BOUND=YES
CONSUMER_PRODUCTION_ADAPTERS_IMPLEMENTED=NO
DA_G10_G15_PRODUCTION_PASS=NO
CONSUMER_MUTATION_AUTHORIZED=NO
```

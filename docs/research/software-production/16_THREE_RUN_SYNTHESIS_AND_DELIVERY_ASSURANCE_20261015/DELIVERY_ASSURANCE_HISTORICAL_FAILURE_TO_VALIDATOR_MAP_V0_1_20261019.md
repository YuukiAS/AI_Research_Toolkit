# Delivery Assurance 历史失败 → Validator/Gate 家族映射 v0.1

Status: PLANNER ANALYSIS / SUPPORTING EVIDENCE FOR PROPOSAL v0.2 / NOT IMPLEMENTATION AUTHORIZATION
Date: 2026-10-19
Source branch: research/software-production-decision-20261013

## 0. 先说结论

本轮不是继续抽象讨论，而是把已经整理过的真实失败逐条压回“到底由哪个验收能力负责”。

覆盖：
- 六仓库原始基线 246 条：Lucerna 33、Bobbio 32、Mica 46、SeminarArc 32、Asteria 47、CUHK Date 56；
- CARE 原始失败账本 40 条；
- 合计 286 条。

逐条机器可查映射见同目录 DELIVERY_ASSURANCE_HISTORICAL_FAILURE_TO_VALIDATOR_MAP_V0_1_20261019.csv。

本轮没有把 77 条后续晚期补查假装已经完成专业重分类。它们留给下一轮独立复核；当前 286 条已经足够反证生产架构。

最重要的结果：
- 286 条失败没有导出 286 个 Gate；
- 它们收敛到 46 个项目/领域 Gate 家族；
- 其中 280 条应当进入已有/可识别 Gate 家族，动作是“补 regression、补/修 validator、补真实证据”，不是新建语义 Gate；
- 只有 6 条纯粹属于 workflow / Bridge / evidence / environment 机制，不应创建产品 Gate：Lucerna L13、L14、L23；Mica M41、M46；SeminarArc S30。

这正是 Delivery Assurance 必须实现的默认行为：先归已有 Gate 家族；只有 capability / evidence class / normal entry / owner / claim scope 真正不同才新建 Gate。

## 1. Gate 新建判定规则：从真实失败反推

历史映射后，生产合同必须增加一个明确步骤：

真实失败 / 新功能
-> 查当前 project/domain descriptors
-> 问：这是已有能力的新坏例，还是新的能力边界？

### 1.1 不新建 Gate：默认

满足以下任一情况，不建新 Gate：
1. 同一用户能力，只是新的坏例；
2. 同一 evidence class，只是过去没覆盖某个状态/输入；
3. 同一 normal entry，只是 validator 没测到；
4. 同一 owner，只是 runner 缺回归；
5. gate 自己有 bug / 误判 / 可被绕过；
6. candidate/evidence/runtime 绑定错误，属于 Bridge / workflow 机械合同；
7. 环境暂时不可运行，只造成 coverage gap；
8. 用户动作/secret/auth 属于 HUMAN_ONLY。

动作是：
- 将该失败加入既有 Gate 的 regression bank；
- 标准已冻结但 runner 缺失时，Executor 同任务补 runner；
- validator 错误则修 validator，不改变标准；
- workflow/Bridge 问题回对应 owner，不造产品 Gate。

### 1.2 新建 Gate：例外

只有下列至少一项真正变化，并且不能被已有 Gate 合理覆盖，才提出新 Gate：
- 用户能力不同；
- 必须观察的 evidence class 不同；
- normal production entry 不同；
- PASS/FAIL failure semantics 不同；
- 专业 owner 不同；
- 支持的 claim level 是独立的新交付表面。

“功能名字不同”“文件很多”“任务复杂”“之前又失败一次”都不是新 Gate 理由。

## 2. Lucerna：33 条不是 33 个 Gate

### 2.1 六个真实 Gate 家族 + 一个非 Gate 运行机制

| 家族 | 来源组件 | 负责什么 | 典型历史条目 |
|---|---|---|---|
| project:lucerna/state-truth-propagation | L-STATE | 子路径→provider→summary→header→CTA 状态语义，瞬态/未观测/确认失败分开 | L15、L16、L17、L20 |
| project:lucerna/native-interaction-actual-surface | L-NATIVE | exact EXE/PID/同次 capture、真实点击因果、重入/持久化、正常 release | L04、L05、L07、L17、L19–L22、L30、L31、L33 |
| project:lucerna/environment-coverage-integrity | L-ENV | 真 DPI / sandbox / Hook 生效 / GAP 语义；环境证据不能冒充产品 PASS | L05、L12、L24、L26–L29、L31 |
| project:lucerna/install-startup-lifecycle | L-INSTALL | 安装、升级、登录启动、卸载、同名外来项保护 | L32、L33 |
| domain:web-development/frontend-product-coherence | L-DESIGN | 首屏层级、重复、视觉重量、普通 UI 文案/结构 | L02、L06、L09、L18 |
| project:lucerna/independent-release-review | L-REVIEW | exact release 的独立产品判断；Producer 自报不能成为最终 PASS | L01–L04、L06、L09、L11、L18、L21、L33 |
| 不是 Gate：workflow-core/Bridge recovery-authority | L-RECOVER | 用户中断、权限、旧指令、脏工作、原任务恢复 | L08、L10–L14、L23–L25 |

关键例子：
- L17 Longleaf 状态传播错误：不是新 Gate。已经属于 state-truth-propagation。Executor 应把“关键 child failure 不得被 Available 吞掉”和“unobserved/checking 不得误报 failure”加入同一 regression bank。
- L02/L06/L09 重复卡片、首屏过重、用户成为第一 QA：不是每种视觉问题一个 Gate。统一进入 Frontend actual-surface/product-coherence；历史坏截图变 regression / negative evidence。
- L19 窗口隐藏不能证明点了 X：不是“X 按钮 Gate”。属于 native interaction causality。同一 Gate 以后覆盖 tray、Esc、close、folder chooser、Cancel/Back 等“动作→正确后置状态”。
- L32 启动项/升级/卸载：这是与 UI 不同的 Gate 家族，因为 normal entry、evidence surface 和风险 owner 不同；但 Lucerna 已经有 L-INSTALL 语义和脚本，所以动作是补完整真实 install lifecycle runner，不是再发明一个新标准。
- L13/L14/L23：不建 Gate，分别是错误升级用户、授权时序、脏工作/进程所有权问题，归 workflow-core / Bridge。

## 3. CARE：40 条已经天然证明“不能一条失败一个 Gate”

| Gate 家族 | 历史问题 |
|---|---|
| project:care/formal-entry-fidelity（F1） | C01、C03、C04、C06、C08、C14、C16、C31、C32 |
| project:care/parameter-data-consumption-causality（F2） | C02、C03、C05–C10、C14–C17、C19、C21、C27、C28、C31–C34 |
| project:care/scale-population-budget（F3） | C11、C20、C22–C26、C28–C30 |
| project:care/independent-evidence-completeness（F4） | C12、C13、C20、C38 |
| project:care/resume-checkpoint-equivalence（F5） | C35–C37、C39、C40 |
| project:care/scientific-conclusion-ablation-validity（F6） | C08、C11、C17、C18、C22、C25 |

例子：
- loss key 存在但没真正消费 → F2 regression；
- 500 步要求只跑 12 步 → F3 regression；
- ready 但 CSV 还是 PENDING → F4 regression；
- 同一 checkpoint load 两次冒充 resume parity → F5 regression；
- ablation_matrix 并非真实消融 → F6 regression。

都不需要新 Gate。

## 4. Bobbio：32 条收敛到七个家族

| Gate 家族 | 历史条目 |
|---|---|
| Zotero 隔离安全 project:bobbio/zotero-isolation-safety | B01–B03、B29 |
| Zotero round-trip / authority project:bobbio/zotero-roundtrip-authority | B01、B03、B04、B08、B14、B25、B26、B28、B31 |
| 原生 Reader / interaction / performance project:bobbio/native-reader-interaction-performance | B07–B11、B18、B19、B28 |
| evidence package integrity project:bobbio/evidence-package-integrity | B09、B14、B17–B19、B24、B27 |
| Frontend actual surface domain:web-development/frontend-actual-surface | B05、B06、B10、B16、B21、B22 |
| independent product review project:bobbio/independent-product-review | B05、B06、B10、B12–B15、B17–B21、B23–B26 |
| developer pre-review closure project:bobbio/developer-pre-review-closure | B07、B11、B13、B23、B30–B32 |

未来新增 arrow annotation，默认不会创建 ARROW_GATE。先把 arrow 加入既有 round-trip / isolation / actual-surface regression。只有 arrow 引入现有 round-trip 无法表达的 degradation contract，project owner 才冻结新的 project-local Gate。

## 5. Mica：46 条说明 validator 本身也必须被验收

| Gate 家族 | 主要历史条目 |
|---|---|
| acceptance normal-entry fidelity | M42、M43 |
| evidence-contract validation | M03、M04、M14、M19、M22、M23、M28–M35、M43 |
| validator anti-forgery | M17、M22、M32、M35、M44 |
| actual host behavior/lifecycle | M05–M11、M13、M18、M20、M21、M24、M28、M29、M31、M34、M37、M39、M40、M42、M44 |
| low-memory benefit / no-regression | M01–M03、M09、M14、M17、M37–M40 |
| Frontend product coherence | M01、M06、M07、M12、M13、M15、M16、M18、M19、M21、M25–M27 |
| independent actual-artifact review | M11、M13、M23–M25、M31 |
| 非 Gate：candidate/evidence materialization | M04、M15、M16、M26、M30、M33、M36、M41、M45、M46 |

M35“协调改写所有对象仍能伪装完整”不是再建一个新 Gate，而是现有 anti-forgery Gate 的 regression。
M14 默认关闭主要功能获得安全 PASS 必须同时落入 benefit Gate：安全不干扰只能证明 should-not-change，不能证明新增能力成立。
M41/M46 是证据工具/机器路径问题，不创建用户能力 Gate。

## 6. SeminarArc：32 条说明产品 Gate、测试工具 Gate、硬件 coverage 要分开

| Gate 家族 | 历史条目 |
|---|---|
| installed black-box research flow | S01–S16、S18、S20、S24、S26 |
| Android lifecycle/platform | S02–S04、S18–S20、S32 |
| real media/OCR/persistence | S05、S11、S12、S14、S16、S17 |
| mobile visual/accessibility | S18、S19、S21、S22 |
| stability/recovery stress | S23–S27 |
| research-workflow product quality | S10、S17、S21、S22、S27–S29、S31、S32 |
| 非 Gate：review transport/readiness | S30、部分 S31 |

关键反例：
- S11 OCR 假阴性来自测试器读错控件 → 修 validator，不改 OCR 产品算法。
- S21 golden 可被自动更新掩盖退化 → visual gate definition/fixture 必须独立冻结。
- S27 Monkey 全绿只证明稳定性，不证明研究工作流语义。
- S30 跳过 dynamic probe 只是 readiness 缩小，不是新产品 Gate。

## 7. Asteria：47 条说明“几何指标 Gate”和“整体科学可读性 Gate”不能混成一个

| Gate 家族 | 主要历史条目 |
|---|---|
| browser interaction/geometry | A01–A05、A08–A10、A12、A14、A15、A18、A19、A21–A25、A28–A35、A38、A39、A43、A44 |
| mechanical architecture regression | A33、A39–A44 |
| scientific graph state/truth | A01、A03、A08、A09、A12、A14–A20、A25、A27、A29、A33–A35、A37 |
| scientific-visualization readability/encoding | A02、A04–A07、A11、A13、A20、A26–A28、A32、A36、A37 |
| independent whole-product review | A01、A04–A06、A10、A11、A13、A20、A24、A27、A36、A38、A45–A47 |
| deployed-surface identity | A45、A46 |
| 非 Gate：capture transport | A-CAPTURE 自身 |

A40/A41 是典型 validator bug：交叉数/浮动标签硬编码 0、缺指标被当 0。正确动作是修 mechanical-architecture-regression 的测量实现并加入 known-bad；绝不能再新建另一个 route-metric Gate。
A36/A38 证明几何/回归全绿也不能替代整体视觉与科研可读性，因此 independent-whole-product-review 必须是不同 evidence class 的 Gate。

## 8. CUHK Date：56 条需要多身份、一次性票据、真实用户路径和产品语义分别验收

| Gate 家族 | 主要历史条目 |
|---|---|
| registration critical path | C01–C05、C19、C29、C34、C35、C40 |
| credential transition semantics | C01、C02 |
| review package / final-state preservation | C04–C06、C12、C14、C17、C20、C25、C26、C55 |
| one-time handoff transaction | C06–C18、C24、C25、C28 |
| web state lifecycle | C21–C23、C29、C30、C36–C41、C44–C50、C54 |
| no-match truthfulness | C50、C51 |
| CI/release truth | C31–C33、C56 |
| dating product semantics/content quality | C19、C21–C23、C27、C30、C37–C39、C42–C54 |
| independent persona black-box review | C08–C10、C13、C15、C18、C26–C28、C52、C55 |
| 非 Gate：静态 deploy config evidence | C34 的静态部分 |

这里尤其能反证“有一个 web e2e Gate 就够了”：
- C11 一次性票据事务；
- C13 多 persona 隔离；
- C21 媒体搜索质量；
- C29 read-only re-entry 不应改数据；
- C47 窄屏/safe-area；
- C54 隐私可见性。

它们虽然都发生在同一个网站，却需要不同 evidence 和 owner，因此是不同 Gate 家族或同家族中的不同 regression，不应该全部塞进一个“Playwright PASS”。

## 9. 这次映射反过来修改 Proposal 的地方

v0.1 还少了一条关键合同：新失败如何进入 Gate 生命周期。

v0.2 必须增加：

### 9.1 Failure-to-Gate Admission

new failure / new feature
-> match existing descriptors by capability + evidence + normal entry + owner + claim
-> if matched: add regression / harden runner
-> if only workflow/evidence/runtime: no product Gate
-> if no match and standard already frozen: project-local implementation missing
-> if truly new professional standard: owner freezes it, then create new Gate

### 9.2 Descriptor 增加 regression bank locator

Gate descriptor 增加可选字段：
- regression_bank_ref
- known_bad_refs
- should_not_change_refs

这些 locator 指向项目/领域现有 tests/fixtures/TODO，不复制成中央数据库。

### 9.3 Resolver 必须接受“历史失败回放”验收

Resolver 实现不能只靠 synthetic demo。至少使用本文件的真实映射做 acceptance replay：
- 给定一个历史任务/change-impact；
- Resolver 应选择与人工逐条映射相同的 gate family；
- 不应额外 full-run 无关 gates；
- workflow-only case 不应制造 project Gate；
- 新 failure 应优先进入既有 regression bank。

若自动 Resolver 无法复现这种人工映射，说明 descriptor/applicability 不够，不得进入生产。

## 10. 当前边界

这不是声称 286 个历史故障今天仍然存在，也不是声称当前 repo 已经实现这 46 个 Delivery Assurance descriptor。

本文件证明的是：
1. 真实历史问题可以被压到有限且可解释的 Gate 家族；
2. 大多数失败应该成为 regression，而不是新 Gate；
3. 有一小类根本不该进入 Gate，必须由 workflow/Bridge/evidence 机制解决；
4. 因此 Proposal v0.1 的方向可继续，但必须补 Failure-to-Gate Admission 和历史映射回放，否则 Resolver 仍可能“理论上会选 Gate、实际上不会”。

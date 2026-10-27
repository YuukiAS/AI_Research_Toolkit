# 历史回放与 retrospective benchmark

## 1. benchmark 目的与限制

本 benchmark 不比较“谁写了更多报告”，而比较不同机制在真实项目中是否有机会：

- 在 Freeze 前发现后来实际发生的重大问题；
- 减少串行轮次和用户追问；
- 避免 Codex 临时补核心设计；
- 降低 implementation→design 返回；
- 把晚期修订限制在局部 adapter/实现范围；
- 使最终候选可直接实施。

历史材料没有统一的工时、模型调用和废弃代码统计，因此不伪造精确概率或比例。本文件把证据分为：

- `OBSERVED`：仓库、提交、报告或用户反馈直接记录；
- `INFERRED`：由多个 observed 事实推得，但不是直接测量；
- `UNKNOWN`：当前材料不能回答；
- `COUNTERFACTUAL`：若某机制当时存在，可能提前暴露什么；不是已观察结果。

## 2. 汇总矩阵

| 项目 | 主要失败类型 | 后来如何暴露 | 固定 P–C 的表现 | Asteria 能否提前抓 | Work 盲区价值 | Codex probe 价值 | 第二 Pro 价值 | 推荐档位 |
|---|---|---|---|---|---|---|---|---|
| Mica | 真实 UI/登录环境取证入口未设计 | 用户追问“真实 GPT 界面如何生成/观察” | 结构覆盖未阻止空洞 | 部分：可要求 evidence actor/route | 高：整场景遗漏 | 高：正常入口 UI probe | 中：若有不同取证路线 | L |
| CAT-TRACE | 数值近似与截断前提错误；算法规格不闭合 | 确定性数学/求积 probe | 纯审查不能证明近似 | 只能标未验证假设 | 中：能问真值/接口 | **极高**：数值反例直接改变路线 | 中：科学路线竞争时 | XL |
| STAT5060 Validator | owner/mapping 存在，但执行语义链、分支/恢复与正控不闭合 | 新鲜 Critic 冷读当前仓库 | 高价值 Critic 找到 3 个 blocker | 高：owner→rule→entry→evidence→receipt | 高：历史/学生边界 | 中：实现 handoff dry-run | 低/中 | L |
| Delivery Assurance | 设计通过但生产接线、宿主、七仓正常入口未证明 | 当前状态仍标 `READY_FOR_CODEX=NO` | 多轮设计可闭合语义，未证明运行 | 高：设计/实现/证据三轴 | 高：用户价值和七仓场景 | 高：宿主前置 probe | 高：产品边界复杂 | XL |
| Asteria / Architecture Ledger | 单一状态混淆设计、实现、证据；图可能只是展示 | 两个独立研究均提出语义账本/三轴 | 固定 Critic 可发现局部空洞 | **核心适用对象** | 中：遗漏场景/错误路线 | 中：锚点/生成器/真实导入 | 中 | L |
| Bridge Kit 0.11.x | 原目标能力无 owner；核心/可选表面耦合；产品路线过重 | scope recovery、normal-entry、v0.8 后 product reset | 多轮 PASS 后仍 reset | 高：owner/consumer/状态/证据 | **高**：用户消费和平台化盲区 | **高**：app-server/normal-entry | **高**：薄核心 vs 统一控制面 | XL |
| Slurm routing | 任务身份、授权、时间/安装/隐私组合缺口 | 首轮 Critic + 多轮 prefinal | 首轮高价值，后续串行碎片化 | 高：payload/permission/state | 中 | 中：站点事实 | 高（初始路线） | L |
| Slurm cancel | enforcement authority 与 runtime/failure semantics 未证明 | 真实 Hook runtime 失败 | 文档审查不能证明 | 可阻止“validated” | 中 | **极高** | 中（信任模型） | XL |
| Presentations | 执行者自证、validator/fixture 同源、渲染作品回归 | 三次 executor PASS 后独立审查发现 blocker | 独立验收有价值 | 高：状态/证据/锁/候选 identity | 高：真实作品盲审 | 中：渲染/生产 hook | 低 | L |

## 3. Mica：数字覆盖没有证明真实证据路径

### OBSERVED

- 既有 roadmap 声称 14 步、95 条要求、34/34 coverage，并给出可交 Codex 的 Goal。
- 用户追问“GPT-6 interactive answer 如何在真实登录 UI 中生成与观察”后，设计才承认没有可执行证据路径。
- Step 06 的“真实 UI adaptation”缺少合法 actor、取证方式、输出和失败处理，后续多个步骤依赖它。

来源：`docs/examples/MICA_REAL_UI_EVIDENCE_GATE_FAILURE_2026-10-26_ZH.md`。

### 判断

这类问题不是再加一个 requirement ID 能解决。真正缺的是：

```text
claim
→ evidence source
→ legal actor
→ normal entry
→ acquisition method
→ candidate identity
→ fail/local continuation
→ consumer
```

### 反事实

- Asteria completeness 若强制 evidence acquisition 字段，会阻止假 Freeze；
- Work 从真实用户任务出发，很可能提出登录 UI/动态 DOM/账号权限问题；
- Codex 最小 probe 可以证明当前环境能否观察真实界面；
- 第二 Pro 只有在存在扩展、浏览器自动化、人工回执等互斥取证路线时才有明显价值。

## 4. CAT-TRACE：科学错误前提需要数值/数学证据

### OBSERVED

- 原 C00–C04 连续实施入口被撤回，因为算法、函数、数据和测试规格不足，Codex 不得规划。
- 确定性 probe 发现：普通 all-zero column Laplace 会漏掉对开放尾强度重要的积分质量；在给定例子中，重数加权目标差达到约 13–19。
- 固定参数下有限 \(p\) 向渐近目标收敛可极慢，原“不断倍增直到 1%”不能作为无条件执行规则。

来源：`YuukiAS/CAT-TRACE/ROADMAP.md` 与 `docs/implementation/probes/ZERO_SLOT_LAPLACE_FINDING.md`。

### 判断

两个 Pro、一个 Critic 或完整 Asteria 图都可能共享“Laplace 足够准确”的错误前提。真正改变架构的是针对高 blast 数值假设的独立求积和解析反例。

### 反事实

- 架构师先标记“zero-slot approximation correctness”是 architecture-killer；
- Codex/研究探针在冻结前运行固定输入、独立真值、误差放大检查；
- 若失败，`RETURN_TO_ARCHITECT`，而不是让 Codex换算法；
- 第二 Pro 只在替代积分/采样路线需要科学裁决时启动。

## 5. STAT5060 Validator：新鲜独立审查何时真正有价值

### OBSERVED

冻结设计已具备：

- Tutorial/HW1/Project 的固定 validator 架构；
- 213/46/32 历史映射；
- 零 orphan 声明；
- 两份实施 handoff；
- 明确的正负控制与页面锁。

新鲜 Critic 仍找到三个 blocker：

1. owner mapping 没形成可执行语义链；
2. handoff 的分支、工作树、路径 authority、受保护 rubric/tests 与恢复语义未闭合；
3. Project Guide 控制、anti-shortcut 与 HW1 Q6 full-covariance positive control 未完全闭合。

来源：`AI_Skills_Collection/results/chatgpt-web--pass-integrity/STAT5060_VALIDATOR_FRESH_CRITIC_REGRESSION_2026-10-20.md`。

### 判断

这是支持独立 Critic 的正例，但其价值来自：

- 读取当前仓库而非 Planner 摘要；
- 直接挑战 execution semantics；
- 保留已冻结的正确范围，不把所有内容推翻；
- 把问题限制成三个有证据的 blocker。

新协议不会取消这种审查，而会把它重命名为 implementation-readiness / independent blindspot challenge，并在高价值触发时运行一次。

## 6. Delivery Assurance：设计闭合与真实运行必须分轴

### OBSERVED

- 当前状态为 R3 设计阶段 `PROCEED`，同时明确：`READY_FOR_CODEX=NO`、`PRODUCTION_IMPLEMENTED=NO`、`ALL_SEVEN_DA_ENABLED=NO`。
- 普通入口自动接入、独立角色启动与回传、同任务恢复、正常结束强制检查和七仓适配尚未实施验证。
- 宿主前置 probe 被单独列为实施前条件。

来源：历史分支 `research/software-production-decision-20261013` 的 `CURRENT.md` 与 `11_ARCHITECTURE_EXPLAINED.md`。

### 判断

这是“设计可以通过，但 Architecture Freeze 尚未成立”的清晰例子。设计状态、实现状态、证据状态必须独立；否则 `PROCEED` 容易被误读为可以全面实施或已具备能力。

### 反事实

- Asteria 三轴能诚实表达 accepted/none/none；
- Work 可检查七仓真实场景和用户价值；
- 宿主 probe 决定 Bridge/子进程/恢复路线是否成立；
- 冷实施者挑战决定 execution package 是否无需临时设计。

## 7. Asteria / Architecture Ledger：结构检查的适用边界

### OBSERVED

两个独立 architecture-evolution 研究均推荐轻量 Git 原生语义账本，而非新后台平台；共同要点包括：

- 稳定组件身份；
- `Component / Relation / Mechanism / Anchor / Decision / Evidence / Issue / Revision`；
- 设计、实现、证据三轴；
- meaningful revision 与 source anchor；
- 静态可重建阅读器；
- 不把每个 commit 当架构版本。

Asteria 2.0 当前也已经以 typed semantic graph 提供 Architecture/Lineage/Evidence 视图，但 live GitHub ingestion 和 scientific-truth update 仍明确在 RC 范围外。

### 判断

这说明 Asteria 可成为 Architecture Completeness Contract，但不能被宣称为自动架构评审器。它能阻止结构性假 Freeze，不能生成遗漏场景、判断科学正确性或证明外部 runtime。

## 8. Bridge Kit 0.11.x：固定流程最具破坏性的失败

### OBSERVED

- 初始设计、execution package、实现与多轮 safety/recovery 修复后，仍进入 final scope recovery；
- 随后新增 normal-entry、shared-server/notifier、full-functional、Progress/display/reader 等；
- v0.8 实施后又发生 product scope reset，核心范围被重新收窄；
- reset 明确否定了过度耦合路线。

### 可观察代理

- `A_reset`: 至少发生 final scope recovery 与 product scope reset 两次架构级回跳；
- `I_impl`: 在稳定产品范围前至少启动了初始实现和 v0.8 实现；
- `S_serial`: 从 proposal、Critic、execution package、implementation、review、recovery、scope recovery 到 reset，存在明显多轮串行；
- `H_user`: 多个关键边界由用户再次指出或澄清；
- `W_waste`: 精确代码比例 UNKNOWN，但 shared app-server/Progress/reader 等实现后来不再属于推荐核心，废弃或降级工作为高。

### 反事实

- Work 原始需求盲区会更早问“用户在哪里消费进度、为何每仓配置通知、是否又做了平台”；
- 第二 Pro 可并行提出薄核心 + adapter；
- normal-entry/app-server probe 可在全功能实现前否定关键前提；
- Asteria 可发现 owner/consumer 与 core/optional failure containment。

## 9. Slurm routing：Critic 正例与串行碎片化

### OBSERVED

- 第一轮 Critic 找到会改变核心路线的身份和授权问题；
- 后续 v0.2–v0.6 逐步闭合站点、授权与可移植性；
- implementation prefinal 又连续出现摘要、递归窗口、安装入口、隐私、时区、DST 问题。

### 判断

第一轮独立审查值得保留；后四类问题更适合一次 cold handoff + 状态/场景矩阵。固定 Critic 没有错，但关键路径利用率低。

## 10. Slurm protected cancellation：最强 probe 正例

### OBSERVED

- 机制在 wrapper/PATH、终端确认、Chat confirmation、project Hook、trusted/global Hook 与 portable runtime 之间多次迁移；
- 晚期真实运行证明 Hook-launched Python 缺动态库，退出 `127`；普通 Hook failure 未按期望阻断原 Bash；
- v3 才把 portable runtime qualification 和 representative fault injection 写成必要条件。

### 判断

该问题的最高价值下一步不是第三个 Critic，而是 `CODEX_MINIMAL_PROBE`。任何协议若不能在首次 Freeze Hook 前要求真实故障探针，就无法击败基线。

## 11. Presentations：最终成品需要独立信任域

### OBSERVED

- STAT5060 Tutorial 反复可见回归；三次治理实现出现 executor PASS 后，独立审查仍发现 blocker。
- 正式架构要求 authoring/execution、deterministic validation、rendered-artifact review 与 human acceptance 分开。
- executor 的最强声明只能是 `READY_FOR_INDEPENDENT_VALIDATION=YES`。
- validator runtime、fixtures、accepted controls 和 reviewer prompt 不能由当前候选任务同时修改。

### 判断

动态路由不等于所有任务取消独立验收。对作品型产物和可被自我调松的验收器，独立验收是产品信任边界，应在实现后保留。它与架构生产阶段的固定 Critic 是不同问题。

## 12. 跨案例 failure taxonomy

| 类型 | 定义 | 代表案例 | 最优响应 |
|---|---|---|---|
| `DESIGN_GAP` | 原目标已有，但机制/owner/interface/状态未设计 | Bridge 进度 owner；STAT 语义链 | `RETURN_TO_ARCHITECT` |
| `NEW_REQUIREMENT` | 后来新增的真实范围 | Bridge 部分呈现/通知要求 | `USER_PRODUCT_DECISION` 或架构修订 |
| `EXTERNAL_FACT` | 只能由真实环境/接口/源码确认 | Hook loader；Chat UI 能力 | `CODEX_FACT_CHECK/PROBE` |
| `SCIENTIFIC_ASSUMPTION` | 数学/统计/算法前提可能错误 | CAT-TRACE Laplace | 数学/数值 probe，再架构裁决 |
| `IMPLEMENTATION_BUG` | 冻结语义正确，代码写错 | 局部状态/路径实现 | `LOCAL_CODEX_FIX` |
| `ARCHITECTURE_ERROR` | 信任边界或产品机制本身不可行 | wrapper/PATH 保护；Bridge 过耦合 | `RETURN_TO_ARCHITECT` |
| `REVIEW_DRIFT` | finding 偏离用户目标或制造无必要复杂度 | 潜在治理膨胀 | 拒绝 finding / 停止审查 |
| `SCOPE_RESET` | 核心产品路线被替换 | Bridge product scope reset | 新冻结，旧批准失效 |
| `EVIDENCE_GAP` | 主张缺当前候选/正式入口证据 | Mica UI；DA normal entry | fact check/probe/acceptance |
| `HANDOFF_GAP` | 实施者仍需做核心决定 | STAT handoff；Slurm入口/时区 | implementation-readiness challenge |

## 13. 新协议的可检验预测

相对固定 Planner–Critic，未来同等级复杂任务应出现：

1. `S_serial` 下降：首轮设计、盲区、事实调查可并行；
2. `G_gap` 下降：显性结构缺口在第一轮由 Asteria 暴露；
3. `D_codex` 下降：cold handoff 中发现核心未决即返回架构师；
4. `A_reset` 下降：高 blast 路线在实施前竞争，杀手假设先 probe；
5. `W_waste` 下降：核心/adapter 和 stable interface 限制返工；
6. Work finding 更集中于场景、产品和共享前提，而非字段空洞；
7. execution-ready 后的重大 reset 更少；
8. `H_user` 下降：系统输出唯一下一执行者与 prompt 类型。

这些是待前瞻校准的预测，不是已证明效果。

## 14. benchmark 结论

没有单一机制在所有案例占优：

- Mica/Bridge 需要独立场景与产品盲区；
- CAT-TRACE/Slurm cancel 需要风险优先 probe；
- STAT5060/Slurm routing 证明新鲜独立审查有价值；
- Asteria 适合系统性消灭显性结构缺口；
- Presentations 证明最终作品仍需要独立信任域；
- Delivery Assurance 证明设计通过、实现与证据必须分轴。

这正是固定 Planner–Critic 不应继续作为默认控制流的原因。唯一稳健的替代不是固定更多模型，而是根据当前未决问题动态路由到最可能改变决定或避免昂贵返工的信息来源。

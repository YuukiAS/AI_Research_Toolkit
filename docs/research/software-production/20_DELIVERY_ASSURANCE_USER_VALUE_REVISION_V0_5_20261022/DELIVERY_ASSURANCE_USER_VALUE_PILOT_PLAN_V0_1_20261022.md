# Delivery Assurance 用户价值试点计划 v0.1

状态：**DESIGN INPUT / 独立 Critic 待审 / 未授权执行**  
日期：2026-10-22  
任务：`software-production--delivery-assurance`

## 1. 试点目的

本试点不再证明接口能解析、schema 能校验或测试数量足够。它只回答四个用户问题：

1. 用户只说“做这个功能”后，交付保障是否从真实 normal entry 自动发生；
2. 旧能力和低配替代是否在用户看到结果前被发现；
3. 普通问题是否由同一任务自动修复，而不是再次要求用户催促；
4. 这些收益是否以可接受、可解释的额外运行成本实现，而不是把每个任务都升级成全量审查。

试点使用既有历史失败映射，不重做 83/363 条审计，不新增 consumer source 修改，也不运行未授权的 Windows、浏览器账号、Slurm/GPU、付费或发布动作。

## 2. 评价设计

### 2.1 基线与处理组

**历史基线**来自已经存在的真实任务证据：用户提醒、返修轮次、第一次用户可见失败、低配实现、漏掉的旧功能、最终完成状态和资源消耗。基线不重新运行，也不把 Planner 摘要当原始证据；Pilot execution package 必须绑定 exact repo path/commit/artifact locator。

**Delivery Assurance 处理组**使用同类真实任务，在 isolation branch/worktree 中从正式 normal entry 启动。用户只提供一次功能目标和已经必需的授权，不追加“加测试、查旧功能、别低配、继续修”等提醒。

这不是随机试验，也不声称估计一般因果效应。它是 bounded matched-case product evaluation：若在冻结的历史失败类型上仍无法减少人工提醒或阻止假完成，系统不得发布用户价值承诺。

### 2.2 开发样本与最终 holdout

- 实现开发可以使用已知 regression bank 和公开 known-bad；
- 最终用户价值评价必须在 core candidate 冻结后，由独立 Critic/Verifier 从现有历史 inventory 中冻结至少一个未用于调优的真实 holdout case；
- holdout 的 repo、commit/artifact、预期 failure family、normal entry 和 claim ceiling 在执行前写入 Pilot package；
- Executor 不得看到 protected fixture/mutation 细节，不能在运行后换题、挑赢家或追加样本；
- 若可用历史 artifact 不足，返回 `EVIDENCE_GAP`，不能临时造一个容易通过的 synthetic case。

这仍然复用现有历史证据，不启动新的全面审计。

## 3. 试点 A：Lucerna 防回归与正常入口

### 3.1 历史失败依据

现有历史映射把 Lucerna 问题归入：

- `project:lucerna/state-truth-propagation`：关键 child failure 不能被 Available 吞掉，unobserved/checking 不能误报 failure；
- `project:lucerna/native-interaction-actual-surface`：窗口隐藏不能冒充真实点击因果，必须绑定 exact EXE/PID/同次 capture；
- `domain:web-development/frontend-product-coherence`：重复、层级、普通 UI 文案和用户成为第一 QA；
- `project:lucerna/independent-release-review`：Producer 自报不能代替 exact release review。

### 3.2 冻结任务形状

Pilot execution package 必须从当前 Lucerna authority 中选择一个真实、边界清楚、会触及现有状态/交互链的功能修复或增强，并冻结：

```text
exact base commit
frozen feature Goal
changed source set
existing accepted state/interaction behaviors
historical regression IDs/artifact locators
normal governance/acceptance entry
exact build/EXE/PID/target-surface identity
HUMAN_ONLY boundary
```

本设计不预先创造一个新功能。若当前 Lucerna 没有合适的合法任务，Pilot Planner 从现有 historical failure map 中选择一个可安全重放的真实修复；不得编 synthetic UI exercise。

### 3.3 必须观察

- feature request 是否自动进入 supported entry；
- Resolver 是否选择 state/native/frontend/review 的最小闭包，而不是全仓所有 Gate；
- first vertical slice 是否已经检查状态传播和代表性旧交互；
- 一个 historical regression/holdout 是否在 final Stop 前被发现；
- ordinary implementation/validator defect 是否在同一任务修复；
- 用户是否需要再次指出视觉、交互或旧状态错误；
- exact final EXE/PID/evidence identity 是否一致。

### 3.4 声明边界

没有获准真实 Windows/native 操作时，只能完成设计、local artifact 和已有 evidence replay，不得宣称 full Lucerna user-value PASS。最终 Lucerna Pilot PASS 必须在获准窗口从真实 native normal entry完成。

## 4. 试点 B：CARE 低配实现与科学结论边界

### 4.1 历史失败依据

现有 CARE 映射已明确以下真实低配模式：

- loss/config key 存在但实际训练路径没有消费；
- 目标规模要求 500 步却只运行 12 步；
- ready/finalizer exit 0，但 CSV 或 required evidence 仍为 PENDING；
- 同一 checkpoint load 两次冒充 resume parity；
- `ablation_matrix` 存在但不是真实消融；
- Slurm `COMPLETED`、receipt 存在或 finalizer成功被错误升级成 scientific completion。

这些分别属于既有 F1–F6 Gate family，不新增 CARE Gate。

### 4.2 冻结任务形状

Pilot execution package 从已有 CARE history 中绑定：

```text
一个真实 historical shallow-substitution candidate或保存的可重放 artifact
一个对应 corrected candidate或同类合法修复任务
frozen scientific contract
formal entry
config/data/split/model/checkpoint/prediction/metric/report targets
existing controller/finalizer/validator entry
resource/Slurm authorization ceiling
```

优先使用已保存的实际 candidate/artifact 和 deterministic replay，不为了试点提交新 Slurm/GPU 任务。若科学 claim 只有新正式 run 才能证明，则诚实停在较低 claim，等待单独授权；不能把 replay 冒充新科学结果。

### 4.3 必须观察

- 在正式 run 前，first vertical slice/causal precheck 是否发现参数或数据未被真正消费；
- scale precheck 是否阻止 12 步冒充 500 步；
- operational completion 与 scientific conclusion 是否分开；
- receipt/finalizer/Slurm success 是否只支持相应 operational claim；
- ordinary code/validator/evidence bug 是否由 CARE 原 controller/Executor 同任务修复；
- PENDING/RUNNING/AWAITING_SACCT 是否保持等待且不耗 DA repair budget；
- 用户是否需要再次提醒“不要把 job 完成当科学完成”。

### 4.4 声明边界

本 Pilot 可以在无新资源消费时证明 false-completion rejection、formal-entry fidelity、evidence completeness 和恢复路由。它不能在没有真实新 run 的情况下产生新的 scientific performance/route-promotion PASS。

## 5. 试点 C：Asteria 正常入口、validator 反自签和实际表面

### 5.1 历史失败依据

现有历史映射包括：

- route crossing/浮动标签等指标硬编码为 0；
- 缺失指标被当作 0；
- implementation、validator、threshold、expected result 同轮协调改松；
- browser/geometry tests 全绿但真实科学图仍碰撞或方向错误；
- deployed source/build/status identity 与 review pack 不一致。

Asteria 已被冻结为首个低成本 vertical consumer，具有 fixed public URL、browser/visual入口和 independent GPT Work 入口。

### 5.2 冻结任务形状

Core implementation candidate 完成后，Asteria consumer package 选择：

1. 一个真实 historical validator/geometry failure 作为开发 regression；
2. 一个未用于调优的 historical holdout；
3. 一个 corrected final candidate；
4. 一个局部隔离的小改动，用于检验是否错误升级 `FULL`。

### 5.3 必须观察

- 一句自然功能请求是否从 actual consumer normal entry触发 Resolver；
- validator semantic diff、旧标准、known-bad 是否被绑定；
- 缺值是否 `UNKNOWN/FAIL`，而不是默认 0；
- first vertical slice 是否在 deployment/GPT Work前发现低配实现；
- local isolated change 是否保持 targeted；
- shared graph/rubric change是否正确升级 broad/full；
- fixed deployment、status endpoint、review pack 和 final candidate identity是否一致；
- 用户是否仍成为第一位视觉/科学错误发现者。

## 6. 记录字段

每次 Pilot run 至少记录：

```text
repo / task / workflow / normal entry
initial user request count
additional user QA reminder count
HUMAN_ONLY action count and reason
candidate identities
resolved gate set and scope
coverage gaps found
first failure detection phase
Stop continuation count
Review/Control/project repair round count
same-failure repeat count
known-bad/holdout decision
final supported claim
false USER_READY count
wall time
model turns / Codex runs
local test/runtime minutes
external/paid/Slurm/GPU/Windows actions and cost
unnecessary broad/full or repeated expensive gates
```

机器字段可以保留原名；用户结果必须先给经过消化的结论，不能只贴日志。

## 7. 通过标准

### 7.1 用户负担

Across the frozen Pilot set：

```text
additional ordinary QA reminders = 0
```

以下不算普通 QA reminder，但必须单独记录：

- exact Hook trust；
- secret/auth；
- physical device/foreground action；
- high-impact publish/upload/resource authorization；
- genuinely new product/scientific choice；
- final subjective acceptance。

### 7.2 真实完成与漏检

```text
known-bad or holdout reaching USER_READY = 0
missed frozen historical regression = 0
corrected candidate reaches its maximum authorized claim = YES
lower valid claim preserved when higher evidence is unavailable = YES
```

### 7.3 早期发现

在 regression 和 shallow-substitution 两类中，各至少一个 blocking failure 必须在 `FINAL_CANDIDATE/Stop` 之前由 `FIRST_VERTICAL_SLICE` 或 `INTEGRATION_CHECKPOINT` 发现。

### 7.4 持续修复

```text
agent-resolvable defect returned to same task = YES
user asked to restart ordinary repair = NO
same failure retried without new candidate/evidence = 0
existing workflow budget respected = YES
```

Lite/Canonical Goal 在 Stop continuation 后仍失败可以诚实停止；Pilot 不把这一事实改写为“持续自动修复成功”。需要多轮独立 repair 的任务必须由 workflow-core 在启动前选择 Review/Control/project controller。

### 7.5 成本与范围

不设置脱离真实任务的任意时间比例。成本 Gate 使用可观察的结构约束：

- isolated small change 不得无理由 `FULL`；
- expensive/actual-surface Gate 只在稳定 candidate 或真实 invalidation后运行；
- 同一 expensive Gate 不得因 receipt/CURRENT/docs变化重复；
- 无授权时 paid/Slurm/GPU/Windows/real-account actions 必须为 0；
- 所有额外 model/runtime/external cost必须完整报告；
- 若 DA-specific control work明显超过产品实现且没有发现/阻止真实失败，Pilot Critic必须 `REVISE`。

## 8. 失败归因

Pilot failure 必须区分：

```text
entry/routing failure
workflow-core resolver failure
Bridge identity/Stop failure
consumer adapter coverage failure
domain/project validator failure
implementation product defect
environment/authorization gap
pilot harness/evaluator failure
```

修复样本不再作为 final holdout。Evaluator/harness bug修复后，必须冻结新的独立 holdout或诚实保持 final evaluation incomplete。

## 9. 实施顺序与授权

```text
v0.5 design Critic PROCEED
→ core Package 01/02 v0.3 execution-ready PASS
→ separate core implementation and independent review
→ Asteria consumer implementation
→ development Pilot cases
→ freeze final historical holdouts
→ independent Pilot preflight
→ obtain only task-specific Windows/Slurm/real-account/paid authorization when genuinely required
→ one bounded final Pilot batch
→ independent final evaluation
```

本 Plan 不授权任何实际 Pilot。不得预先启动 Windows、浏览器账号、Slurm/GPU、付费调用、外部上传或 release。

## 10. 当前状态

```text
PILOT_DESIGN=READY_FOR_USER_VALUE_DESIGN_CRITIC
PILOT_EXECUTION_PACKAGE=NOT_PREPARED
HISTORICAL_HOLDOUTS=NOT_FROZEN
CORE_IMPLEMENTATION=NOT_STARTED
PILOT_RUNS=NOT_STARTED
USER_VALUE_VERDICT=NOT_REACHED
READY_FOR_CODEX=NO
USER_ACTION_REQUIRED_NOW=NO
```
# Delivery Assurance Consumer 验收事实清单

状态：只读审计；没有修改 consumer
日期：2026-10-19

## 1. 目的与边界

本文记录各 consumer 已经拥有的真实消费对象、验收入口、证据和 owner，供后续薄 adapter 设计使用。它不把 consumer 加入 Delivery Assurance，不运行 Windows/Slurm/GPU/外部服务，也不选择 Phase 2/3 的首个生产试点。

## 2. 汇总

| Consumer | 审计提交 | 最终消费对象 | 真实验收 owner | 已有入口 | 主要 DA 适配缺口 |
|---|---|---|---|---|---|
| Lucerna | `79dd2875d3da33c6a6d80e5e35bea812b84c1ceb` | exact Windows release executable、PID、native UI/interaction、真实 provider/state | 项目 Producer + fresh independent native Reviewer + 最终用户判断 | `scripts/acceptance-preflight.ps1`、`development-acceptance.ps1`、Independent Release Acceptance | 把 task-defined gates、exe/hash/PID、review result 归一化为 candidate-bound refs |
| CARE | `75a40e454de43b64e59a0b0b438ff57ef2bb8345` | code/config/split/checkpoint/prediction/metric、terminal Slurm accounting、必要时一份 submission zip 与 hosted metrics | CARE Controller/finalizer/validator；Planner/用户拥有科学路线与外部上传 | Agent-Flow v2、strict validators、dependency finalizer、submission packager | 保留 operational/scientific/submission 三层状态；DA 只消费，不调度 |
| Bobbio | `e7d929bad2d4b23939c81920e77390efbce42b96` | exact Windows executable、isolated Zotero attachment/profile/data dir、Reader/annotation round-trip、PDF immutability | 项目 native acceptance + GPT Work/product review + 用户 acceptance | `pnpm bobbio:acceptance:0.2.0`、`bobbio:audit:0.2.0`、safe PowerShell runner | 先解决 current-status 文档漂移；再标准化 executable/profile/data/evidence identity |

## 3. Lucerna

### 3.1 已有事实

- `docs/workflows/LUCERNA_EXECUTION_GOVERNANCE.md` 明确区分 static policy、runtime guard、environment coverage、native acceptance 和 final release/user acceptance；
- changed product candidate 会使旧 candidate-bound evidence 失效；
- immutable evidence freeze 顺序是 source commit → candidate-bound evidence payload → handoff bundle → optional receipt；
- `docs/workflows/LUCERNA_INDEPENDENT_RELEASE_ACCEPTANCE.md` 要求 Reviewer 记录 exact `origin/main` SHA、release path、PID、bundle identity；source 改变后必须重建并重新审查；
- canonical preflight：`scripts/acceptance-preflight.ps1`；只有连续两次同 commit/executable hash 的 PASS 才允许 Reviewer；
- 项目已有 native shell、whole-panel visual、button/action、state logic、notification、copy 等独立验收矩阵；
- package scripts 提供 `lint`、`governance:check`、`governance:test`、`test:acceptance-harness`、`test:development-acceptance`。

### 3.2 适合 adapter 暴露的 locator

- frozen task/Goal；
- source commit 与 clean-tree assertion；
- release executable path/hash/embedded source commit；
- process PID/target environment；
- preflight `latest.json` 与 events；
- fresh Reviewer `REVIEW.md` / `acceptance.json`；
- task-defined required environment/human gates。

### 3.3 不应进入 Bridge core 的语义

- “视觉协调”“五秒可读性”“按钮逻辑”“通知必要性”等专业判断；
- provider live-state 是否符合 Lucerna 产品语义；
- Windows foreground/native interaction 的具体动作；
- 哪些 task-defined human gates 是本次 release 必需。

### 3.4 当前风险

Lucerna 治理文档明确指出普通 repository Hook 只是辅助控制，未信任/timeout/malformed 必须记为 `HOOK_GAP`。后续 consumer 试点不能把 DA Hook 当成 Windows 安全边界，也不能因 Hook GO 自动获得 native-host 权限。

## 4. CARE

### 4.1 已有事实

- formal repo identity 是 `YuukiAS/CARE_Challenge`；当前默认 `main-only`，只有任务明确声明时才使用特例分支；
- `START_HERE_FOR_GPT.md` 和 `prompts/AGENT_FLOW_V2_PROTOCOL.md` 规定 Controller 是 coordinator/acceptance owner，Executor 不能宣布整项完成；
- 长 Slurm/overnight/multi-job 工作由 dependency finalizer 或受限 tmux watcher 负责连续性；`PENDING/RUNNING/AWAITING_SACCT` 是 monitor 状态，不是完成；
- finalizer exit code 不能单独证明完成，仍需 terminal accounting、aggregation、validators、required outputs 与 controller verification；
- `prompts/CARE_OVERLAY_GATES.md` 明确分离 operational completion、scientific resolution、route promotion、external upload 和 hosted claim；
- domain evidence 要绑定 model/config/split/budget/decode/evaluator/checkpoint/prediction/metric/log/cache；
- `scripts/submission/prepare_care_myocardium_validation.py` 是 validation package 单一入口；一份 zip 同时含 MyoPS/CineMyoPS 并返回三个 hosted metrics；
- raw label、no-T2、Cine temporal、experiment adequacy、same-split baseline 等规则属于 CARE/Medical Imaging owner。

### 4.2 适合 adapter 暴露的 locator

- task prompt hash、current SHA、frozen scientific contract；
- controller/finalizer state 与 job IDs；
- checkpoint、prediction、metric、aggregation、validator evidence；
- `controller_verification_decision`；
- `experiment_adequacy_decision` / scientific resolution；
- submission manifest/zip identity（只有任务确实授权 packaging/upload 时）；
- exact resume/owner locator。

### 4.3 不应进入 Bridge core 的语义

- scar/edema/CineMyoPS 指标、raw/compact label、no-T2、HD95、组件数等科学判定；
- Slurm submit/cancel/retry策略；
- 模型路线 promotion/stop；
- validation upload、hosted metric 或外部数据权限。

### 4.4 推荐的低成本 DA-G12 输入

首轮只使用已有、小型、去敏的 controller/finalizer/validator fixture，验证：

```text
WAITING_EXTERNAL_OWNER
→ existing owner terminalizes and aggregates
→ exact resume locator
→ fresh candidate/gate check
```

不得为此启动真实 GPU/Slurm 作业，也不得让 Hook 轮询、重提或取消 job。

## 5. Bobbio

### 5.1 已有事实

- 最终产品面是 Windows Bobbio Reader 与 Zotero-native annotation authority；
- safe runner 必须同时证明 isolated Zotero profile 与 isolated data directory，真实 profile/data 保持不变；
- 真实验收包括 PDF open/navigation/selection、Codex explanation、Candidate persistence、annotation create/recolor/delete/read-back、PDF hash unchanged、cache rebuild；
- normal entry：`pnpm bobbio:acceptance:0.2.0` / `scripts/Invoke-BobbioReaderAcceptanceSafe.ps1`；
- audit：`pnpm bobbio:audit:0.2.0`；
- `docs/handoffs/ACCEPTANCE_0.2.0_2026-09-13.md` 标记 `ACCEPTED`，最新 `main` commit 的 subject 是 `Merge accepted Bobbio 0.2.0 milestone`。

### 5.2 当前权威漂移

同一 latest `main` 中：

- Git history 和 `docs/handoffs/ACCEPTANCE_0.2.0_2026-09-13.md` 表示 0.2.0 已接受并合并；
- `docs/CURRENT_MILESTONE.md` 仍写 `0.2.0 — FINAL NATIVE ACCEPTANCE GATE`；
- `ROADMAP.md` 仍把 0.2.0 标为 current/active，部分 checklist 未勾选。

这不是 Delivery Assurance 可以自行修正或猜测的事实。正式 Bobbio adapter 前，Planner/项目 owner 必须先冻结 authoritative status source 或修正文档漂移。否则 adapter 应返回 `UNKNOWN/STATUS_AUTHORITY_CONFLICT`，不得利用较方便的一份文件制造 PASS。

### 5.3 适合 adapter 暴露的 locator

- exact source commit 与 Windows release executable；
- isolated profile/data-dir identity 和 real-profile untouched audit；
- Reader/annotation acceptance evidence；
- PDF content hash；
- GPT Work product-review evidence（仅覆盖其真实范围）；
- final user acceptance record；
- milestone authority locator。

### 5.4 不应进入 Bridge core 的语义

- Zotero annotation compatibility/authority；
- profile/data-dir isolation细节；
- Reader interaction与 PDF immutability 的产品判断；
- Windows GUI 操作或真实用户研究库访问。

## 6. AI Skills 领域验收能力

AI Skills 不是单一 consumer，但负责把任务语义路由到专业 gate：

| 领域 | 当前真实 gate 例子 | 不能由机械 PASS 替代 |
|---|---|---|
| Frontend Design | exact native/browser surface、state coverage、P1/P2、interaction reachability | build、DOM 存在、单张 screenshot |
| Presentations | PPTX 由真实 engine 渲染、逐页视觉/科学对象 QA、changed-slide rerender | 文件存在、手工 PDF、无 overflow 单项 |
| Research Writing | claim/evidence、citation、selected final artifact、render/fidelity | Markdown/LaTeX 编译成功 |
| Medical Imaging/CARE | model/config/split/checkpoint/prediction/metric、adequacy、labels、subgroups | job terminal、日志存在、proxy metric |

workflow-core 应只决定哪些 gate refs 必需；各 owner 继续输出专业判断；Bridge 只验证它们是否属于当前最终候选和真实 consumed target。

## 7. 试点选择尚未决定

R5 Roadmap 推荐先 Lucerna + CARE，再选第三平台。本文没有授权这一顺序，也没有把 Bobbio 自动升级为试点。下一轮 Planner 应结合当时分支、环境、授权、成本和正在进行的产品工作，明确：

- 第一个 consumer；
- 精确 feature/delivery class；
- 是否只做 fixture 还是实际 native surface；
- required gates 和 invalidation；
- 哪些动作需要新的当前用户授权。

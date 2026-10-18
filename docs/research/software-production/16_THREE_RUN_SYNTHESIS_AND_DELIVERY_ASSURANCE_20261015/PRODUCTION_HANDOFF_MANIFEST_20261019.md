# Delivery Assurance 生产交接清单

状态：`HANDOFF_TO_PLANNER_CRITIC`
日期：2026-10-19
不构成 Phase 2 实施授权

## 1. 交接包身份

| 项目 | Locator |
|---|---|
| R5 Proposal | `DELIVERY_ASSURANCE_PROPOSAL_R5_20261019.md` |
| R5 Goal | `DELIVERY_ASSURANCE_PHASE1_GOAL_R5_20261019.md` |
| R5 Critic PASS | Git object `2964e6a14f927e408b9a7a0d8803dcaea8d6e51d` 中的 `DELIVERY_ASSURANCE_CRITIC_REVIEW_R5_20261019.md` |
| 批准包 | `58717a6b3ace4f5ccf094fb4f8754231af762d54` |
| Clean GO | `2d823a0a163d5e79806c5c1964702820bcce3290` |
| Phase 1 evidence | `phase1_hook_probe_r5/attempt_3/` |
| Attempt history | `phase1_hook_probe_r5/ATTEMPTS.md`、root Attempt 1、`attempt_2/` |
| Phase 1 closure | `PHASE1_CLOSURE_20261019.md` |
| Phase 2 inputs | `PHASE2_IMPLEMENTATION_INPUTS_20261019.md` |
| Gate facts | `GATE_LIFECYCLE_FACT_INVENTORY_20261019.md` |
| Consumer facts | `CONSUMER_ACCEPTANCE_INVENTORY_20261019.md` |

## 2. Source snapshot manifest

| Owner | Repository snapshot | Source locators | 允许 Planner 得出的结论 |
|---|---|---|---|
| Bridge runtime | `YuukiAS/GPT_Codex_AI_Bridge_Kit@a9c03b4a36c185aa98b00006c08ef600ba77d094` | `AGENTS.md`、`ai_bridge_kit/readiness.py`、`reviewed_handoff.py`、`reviewed_runner.py`、`persistent_run.py`、text/visual review modules、0.11.0 scope-reset package | 有可复用机械原语；没有生产 DA Hook/core；必须与 scope reset 单独协调 |
| Delivery admission | `YuukiAS/AI_Skills_Collection@23f51b0bebd8a32f49d899f7fae1ee0e5f17e4cd` | root `AGENTS.md`、workflow-core SKILL/TODO、Frontend/Presentations/Research/Medical Imaging sources、maintenance board rules | ownership contract 已存在；结构化 production admission 尚未实现 |
| Software consumer | `YuukiAS/Lucerna@79dd2875d3da33c6a6d80e5e35bea812b84c1ceb` | execution governance、visual acceptance、independent release acceptance、package scripts | 可定位 exact exe/native review/evidence；不能把 repo Hook 当安全边界 |
| Scientific consumer | `YuukiAS/CARE_Challenge@75a40e454de43b64e59a0b0b438ff57ef2bb8345` | START_HERE、Agent-Flow v2、CARE overlay、adequacy/publication gates、submission packager | 长任务/科学/提交 owner 已存在；DA 只能消费证据 |
| Third-platform fact sample | `YuukiAS/Bobbio@e7d929bad2d4b23939c81920e77390efbce42b96` | README/ROADMAP/CURRENT_MILESTONE、Development Workflow、0.2.0 acceptance handoff、safe runner/audit | native Zotero验收可复用；当前状态文档存在权威漂移，必须先解决 |

## 3. 生产责任清单

| 能力 | 唯一主要 owner | 其他层只做什么 | 禁止串位 |
|---|---|---|---|
| Hook lifecycle、任务/candidate/evidence 机械绑定 | Bridge Kit | project 提供 thin definition/locator | workflow-core/domain 不维护 thread/worktree；project 不复制 core |
| delivery class 与 required gates | workflow-core | project adapter 提供可用 class/gate locator | Bridge 不选择专业 gate；Executor 不降级 declaration |
| 专业 QA 判断 | domain skill/plugin + project-native acceptance | workflow-core 路由；Bridge 验证绑定和 freshness | Bridge 不评分 UI/论文/统计/医学影像 |
| 长运行寿命 | 现有 Persistent/CARE/Slurm/project owner | DA 保存 owner/ref/resume | Hook 不轮询、不 submit/cancel、不当第二 scheduler |
| 权限 | 当前用户/Goal/Host Policy/sandbox/既有 authority owner | DA 继承 refs 并拒绝越界 | continuation 不创造批准 |
| release/distribution | Bridge release + AI Skills Maintainer + consumer adaptation owner | DA 提供 Gate 证据 | 不建立版本矩阵、registry 或新发布系统 |
| 观察 | 现有 UI/Notifier/项目状态投影 | 读取结构化事件 | 观察层不写第二个 DONE |

## 4. 后续执行包的必需输入

Planner/Critic 在允许任何生产修改前，应产出一个新的、可执行但可否决的 Phase 2 包，并至少冻结：

1. exact target repo、base commit、branch/worktree strategy；
2. 与 Bridge 0.11.0 scope reset 的顺序和兼容边界；
3. production Hook definition/entrypoint 的来源、trust、安装、冲突、升级、卸载；
4. adapter/declaration/gate-result/snapshot 的最小 schema 与 owner；
5. public Hook/Git/Bridge facts 的 identity 算法；
6. event claim、single writer、idempotency、crash recovery；
7. Stop/Interrupt/repair-budget/low-progress/authority 合同；
8. no-adapter no-op 与 existing Bridge modes should-not-change；
9. long-run owner handoff；
10. DA-G10–G16 的具体测试、normal entry、candidate binding 和 failure semantics；
11. version、release、fresh-session consumption 和 rollback；
12. task-owned evidence paths、去敏规则和清理边界。

## 5. 建议的 source-change 分层

以下只是 owner/map，不是文件变更授权：

| 阶段 | 可能涉及的生产 repo | 变更类别 | 不应同时做的事 |
|---|---|---|---|
| Phase 2 core | Bridge Kit | lifecycle entry、mechanical identity、adapter discovery、snapshot、bounded continuation | domain QA、consumer-specific commands、Slurm、release |
| Phase 3 admission | AI Skills Collection | workflow-core routing/result contract、domain adapters、regression/replay | Bridge runtime、consumer state machine |
| Consumer pilot A | Planner 选择的单一软件 consumer | thin adapter + existing acceptance locator | 全仓验收重写、第二 reviewer workflow |
| Consumer pilot B | Planner 选择的科研/long-run consumer | thin adapter + existing owner evidence | GPU/Slurm 动作，除非另行明确授权 |
| Release closure | Bridge + AI Skills Maintainer + selected consumers | formal release、Update impact、managed adaptation、fresh session smoke | 私建 registry/版本配对表 |

## 6. 已知冲突与前置依赖

### 6.1 Bridge 0.11.0 scope reset

最新 Bridge `main` 的 execution-ready package 正在收缩 reader/progress-thread/exchange 等实验拓扑，并明确限定 0.11.0 的五项能力。DA 不能隐式加入该包，也不能依赖将被删除的 app-server/persistent-thread 代码。Planner 必须选择“scope reset 完成后单独实现”或明确冻结新的组合方案。

### 6.2 workflow-core maintenance tracking

R5 的触发点现已满足前半条件（Phase 1 GO），但本轮不是 production design/implementation kickoff。下一轮 Planner 在第一次实质交接前应按 AI Skills maintenance board 创建/绑定 tracking Issue，并记录 Bridge integration dependency；不要把本研究提交当成 Issue 已创建。

### 6.3 Bobbio status authority drift

Git/main 与 acceptance handoff 表示 0.2.0 已接受；`CURRENT_MILESTONE.md`/ROADMAP 仍表示等待 final gate。任何 Bobbio adapter 设计都必须先解决这个 owner/source-of-truth 冲突。

### 6.4 Codex runtime drift

Phase 1 证明的是 `codex-cli 0.160.1` 上的具体 Hook seam。正式实现与 release candidate 若使用不同 runtime/Hook contract，必须重新执行适当的 compatibility/normal-entry Gate，不能机械复用 Phase 1 PASS。

## 7. 禁止携带进生产的内容

- probe workspace、probe handler 或 probe candidate；
- Attempt 1/2 的失败环境/越界做法；
- `codex doctor` 或 Codex private state 读取；
- trust bypass、自动点击 trust、直接编辑 trust store；
- 新 daemon/watcher/controller/database；
- Local Review/Program Run 复活；
- consumer-specific质量规则写入 Bridge；
- Hook 获得的新权限、发布/Slurm/付费/凭据副作用；
- 用 Phase 1 GO 预先宣布 DA-G10–G15 PASS。

## 8. Handoff decision

```text
PHASE1_CLOSED=YES
MECHANISM_SEAM_PROVEN=YES
PRODUCTION_CONTRACT_INVENTORY_COMPLETE=YES
EXTERNAL_REPOS_MODIFIED=NO
PHASE2_IMPLEMENTATION_AUTHORIZED=NO
NEXT_OWNER=PLANNER_CRITIC
NEXT_REQUIRED_ARTIFACT=FROZEN_PHASE2_IMPLEMENTATION_PACKAGE
```

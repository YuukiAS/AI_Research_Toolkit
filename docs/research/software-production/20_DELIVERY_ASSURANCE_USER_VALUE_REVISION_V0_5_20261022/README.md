# Delivery Assurance 用户价值返修包 v0.5

状态：**PLANNER REVISION CANDIDATE / 独立设计 Critic 待审 / 未授权实施**  
日期：2026-10-22  
任务：`software-production--delivery-assurance`  
分支：`research/software-production-decision-20261013`

## 这轮解决什么

本轮不重做 Delivery Assurance，也不修改 Phase 1 或重新研究 Hook。它只处理独立 Critic 提出的五个用户价值缺口：

1. 普通功能任务是否会自动进入交付保障；
2. 项目功能关系和验收清单不完整时，旧能力如何避免漏检；
3. 低配实现能否在开发过程中被拦住，而不是最后才发现；
4. Stop 的一次续跑如何与 Lite、Review、Control 和项目原有恢复衔接；
5. 如何用真实历史失败证明用户以后不必反复提醒“加测试、查退化、别低配、继续修”。

## 本包文件

- `DELIVERY_ASSURANCE_USER_VALUE_REVISION_PROPOSAL_V0_5_20261022.md`：完整设计返修候选；
- `DELIVERY_ASSURANCE_USER_FINDING_CLOSURE_MATRIX_V0_1_20261022.md`：五项 finding 的逐项处理；
- `DELIVERY_ASSURANCE_USER_VALUE_IMPLEMENTATION_PACKAGE_DELTA_V0_1_20261022.md`：对现有 Package 01、02、consumer 和 release package 的准确影响；
- `DELIVERY_ASSURANCE_USER_VALUE_PILOT_PLAN_V0_1_20261022.md`：真实历史任务试点和用户负担评估；
- `DELIVERY_ASSURANCE_USER_VALUE_CRITIC_PROMPT_V0_1_20261022.md`：下一轮独立 Critic 提示词，单独提交并绑定本设计内容 commit。

## 当前结论

- v0.4 的 owner 分工、Gate 生命周期、TargetGraph、claim 分层、adapter 单调性、反自签和无第二控制面原则继续保留。
- 冻结的 `da/1` required fields、owner 和 decision semantics 不需要修改；本轮把现有字段真正接入正常入口、覆盖检查、开发中检查、原工作流恢复和真实用户价值试点。
- Package 01 v0.2 和 Package 02 v0.2 的 execution-ready 状态暂时失效，必须在本 Proposal 获独立 Critic `PROCEED` 后形成各自 v0.3，再重新接受 execution-ready 审查。
- Package 03、04A–04D、08 的既有阶段不因本轮自动改变；其中 04A–04D 的 descriptor 字段已经能够承载 regression、known-bad、should-not-change 和 normal-entry 语义。
- 本轮没有实施任何 Bridge、AI Skills、consumer、Windows、浏览器、Slurm/GPU、付费或发布动作。

## 下一步

唯一下一入口是独立设计 Critic，只允许：

```text
PROCEED
或
REVISE
```

`PROCEED` 只允许 Planner 返修实施包和准备用户价值试点 execution package，不授权 Codex。
# Bobbio 状态权威恢复合同 v0.1

Status: **PLANNER RECOVERY DESIGN / NOT EXECUTION AUTHORIZATION**  
Date: 2026-10-19  
Task key: `bobbio--status-authority-recovery`  
Owner: Bobbio project owner

## 1. 问题

Bobbio 当前存在 branch-aware 状态冲突：

- `main@e7d929bad2d4b23939c81920e77390efbce42b96` 和 `docs/handoffs/ACCEPTANCE_0.2.0_2026-09-13.md` 表示 0.2.0 已接受；
- 同一历史中的 `CURRENT_MILESTONE.md` / ROADMAP 仍表达 0.2.0 final gate；
- `develop@a64edfd6c5b11f81599bfcfc327be5964633a7b5` 已声明版本 0.3.0，并把 0.3.0 enhanced research annotations 设为当前实施范围。

Delivery Assurance 不能自行选择最方便的一份文件，也不能让用户长期维护“到底信哪份”的清单。正式 Bobbio adapter 必须先恢复 branch/release-aware authority。

## 2. 冻结权威模型

Bobbio milestone 状态由以下有序、字段化 authority set 决定：

```text
current development branch contract
→ exact branch AGENTS + ROADMAP/current-plan semantics
→ version source in package/release config
→ accepted milestone records for historical releases
→ user/founder acceptance record when required
```

这不是简单的“新文件优先”。每个来源只拥有自己的字段：

| 字段 | authority |
|---|---|
| 当前开发 branch | Git ref / 当前任务合同 |
| 当前实施 milestone | 当前 branch 的 AGENTS + authoritative current plan |
| runtime/package version | package/version source |
| 某历史 milestone 是否已接受 | immutable acceptance record + accepted main/release identity |
| 是否允许晋升 main/release | Bobbio project owner / user acceptance contract |
| 当前任务最高 claim | frozen Goal + Delivery Assurance result |

ROADMAP、CURRENT_MILESTONE、acceptance record 对同一字段冲突时返回 `STATUS_AUTHORITY_CONFLICT`；不能以更新时间或文件名猜测。

## 3. 必需输出

恢复任务必须交付：

1. `BOBBIO_MILESTONE_AUTHORITY.md`
   - main / develop / release 的 milestone authority；
   - 每个字段的 canonical locator；
   - 历史 accepted milestones 与 current development 分离；
   - superseded locator 列表。
2. 修复或明确 supersede 过期的 `CURRENT_MILESTONE.md` / ROADMAP 表述；
3. Bobbio adapter authority set 和 content digest；
4. pre-repair / post-repair resolver evidence；
5. regression，证明 old evidence 不能提升 new claim。

## 4. 正常入口

恢复不建立新状态机。正常入口是 Bobbio 已有开发流程：

```text
AGENTS.md
+ README.md / ROADMAP.md
+ docs/VERSIONING.md
+ docs/DEVELOPMENT_WORKFLOW.md
+ current active milestone plan
+ exact branch/version/acceptance records
```

Executor 只做机械定位、diff、文档修复和回归实现。语义冲突由 Bobbio project owner 冻结；用户不负责手工整理 locator。

## 5. 必需验证

### R1：修复前必须拒绝

在故意同时提供以下事实时：

```text
main accepted 0.2.0 evidence
+ stale current-status says 0.2.0 final gate
+ develop package version 0.3.0
```

Resolver 必须返回：

```text
STATUS_AUTHORITY_CONFLICT
claim=UNKNOWN
USER_READY=NO
```

### R2：develop 选择正确合同

修复后，在 `develop@a64edfd6c5b11f81599bfcfc327be5964633a7b5` 或后续明确 successor 上，Resolver 必须选择 0.3.0 active milestone、enhanced annotation contracts 和对应 normal entries，不得选择 0.2.0 current gate。

### R3：历史 evidence 不跨 milestone

0.2.0 的 accepted Reader/Zotero evidence 只能作为：

- unchanged 0.2 regression；
- 0.3 should-not-change；
- 已明确相同 subject/target/definition 的可复用 raw evidence。

它不能单独支持：

- 0.3 line/arrow/sequence/formula semantics；
- 0.3 current milestone completion；
- 0.3 executable identity；
- 0.3 final user acceptance。

### R4：branch 切换必须失效

main/develop/release identity 变化时，authority set digest 和当前 claim 重新解析。旧 branch 的 current-status result 不能继续使用。

### R5：locator 漂移恢复

canonical file 移动但语义不变时，Executor 在同一任务更新 locator 和 digest；语义变化或两个来源仍冲突时返回 project owner，不由 Resolver选择。

## 6. 防止自签

同一任务不能通过：

- 删除 stale 文件而不记录 supersession；
- 将 0.3 current 退回 0.2 以复用已有 PASS；
- 修改 adapter 排除 0.3 Gate；
- 只更新 ROADMAP 不更新 authority map；
- 只比较文件时间；
- 把 main accepted 视为 develop current；
- 把 package version 当用户 acceptance。

任何权威语义变化必须有 Bobbio project owner 的冻结记录，并使受影响旧结果失效。

## 7. 与中央架构的关系

该 recovery 是 Bobbio consumer 前置，不阻塞 Delivery Assurance 公共 C01–C20，也不要求中央 Resolver硬编码 Bobbio 文件名。中央合同只提供：

- authority set + digest；
- branch/release scope；
- conflict→UNKNOWN；
- locator mechanical repair；
- semantic conflict→project owner；
- stale evidence invalidation。

Bobbio adapter 实例负责具体 locator。

## 8. 当前边界

```text
RECOVERY_CONTRACT_FROZEN_FOR_CRITIC=YES
RECOVERY_EXECUTED=NO
BOBBIO_ADAPTER_READY=NO
CODEX_AUTHORIZED=NO
```

# 独立历史证据研究：复杂架构生产协议

RUN_ID：work。研究日期：2026-10-27。范围：历史证据与 benchmark；不提出第三套完整协议，不裁定两位 Pro 的方案。本轮另两位 Pro 的分支及结果未读取。

**最重要的结论：多轮审查确实能修正设计，但 PASS、execution-ready 和完整文档都不足以证明实施前提成立。** Bridge 的正常入口/owner 缺口与后期 reader runtime 否证、Slurm 的可信 Hook 与实际失败阻断之间的落差，是两种不同的失败：前者需要更完整的能力闭合，后者需要更早的真实运行证据。不能用同一轮泛化 Critic 替代所有证据。

## 已得到的证据

- **Bridge 0.11.x：** reset 前至少两次主要产品实施准入，至少两次 implementation→design 返回，一次明确全局 product scope reset。原目标的 progress/normal-entry 曾被缩成 helper；后来 app-server reader/display/notifier 耦合扩大影响。真实零模型轮 canary 才否证 reader 隔离前提。
- **Slurm routing：** 部分反复来自明确新增用户需求；四次 prefinal 多为实现修复，不能都计架构重置。Critic 对 JobId/竞态/授权有实质价值。
- **Protected cancellation：** wrapper/PATH/terminal、chat token、trusted/global Hook、portable runtime 是真实机制迁移。早期已知 Hook 失败可能放行，后续 loader failure 却仍出现，说明证据义务没有在冻结前闭合。Phase0 曾成功提前拦停，是早 probe 有效的正例。
- **跨项目：** Mica 缺真实 UI 输入路径；CAT-TRACE 的独立解析/数值 probe 揭穿共同近似；STAT 的 READY 后撤回暴露 literal edges/identity；Asteria 的 Work PASS 后用户发现整体质量失败；Research Authoring/Presentation 显示正常入口、增量保护与独立验收问题。
- **基线的正向证据：** Critic 保住承诺需求、发现授权/竞态、拒绝 self-certification；局部 bug 不必重开架构、有限子范围可以停止审查，已有历史实例。

## 哪些机制有支持，哪些没有

针对性真实 probe、原能力到 owner/consumer 的闭合、独立原始场景调查、只读实施挑战、failure containment 都有明确历史靶点。它们是否组成更好的整体协议，还须受控验证。

没有证据确定固定一个/两个/三个完整设计者的最优数量，也没有第二 Pro 边际收益、Work 检出率、Asteria 维护成本或用户时间节省百分比。结构齐全不能发现所有未知场景，角色独立不能保证问题框架独立。未知概率保持 UNKNOWN。

## 阅读路径

| 需要核对 | 文件 |
| --- | --- |
| Bridge 全返修链、PASS 与 reset 的原因 | [BRIDGE_KIT_011_TIMELINE.md](BRIDGE_KIT_011_TIMELINE.md) |
| Slurm routing 与 cancel/runtime 演化 | [SLURM_EVOLUTION_TIMELINE.md](SLURM_EVOLUTION_TIMELINE.md) |
| 其他七类任务证据与正控制 | [HISTORICAL_CASES.md](HISTORICAL_CASES.md) |
| 正式基线的真实优势、失败与停止 | [PLANNER_CRITIC_AUDIT.md](PLANNER_CRITIC_AUDIT.md) |
| Asteria 能抓与不能抓的缺口 | [ASTERIA_COUNTERFACTUAL.md](ASTERIA_COUNTERFACTUAL.md) |
| 计数口径、代理、未知量、敏感性与校准 | [OBSERVED_METRICS.md](OBSERVED_METRICS.md) |
| 标签、证据等级与避免错误归因 | [FAILURE_TAXONOMY.md](FAILURE_TAXONOMY.md) |
| 53 事件、9 个时点 fixture 与反事实靶点 | [BENCHMARK_DATA.json](BENCHMARK_DATA.json) |
| 如何做真正盲测及判定后续协议 | [BENCHMARK_README.md](BENCHMARK_README.md) |
| 105 个固定来源及历史提交 | [SOURCE_INDEX.md](SOURCE_INDEX.md)、[COMMIT_TIMELINE.json](COMMIT_TIMELINE.json) |

## 研究完成与下一责任人

本轮实际完成的是历史证据回读、归因、时点抽取和 retrospective analysis；没有执行新的生产实验，也没有声称严格盲测、因果胜率或完整原始聊天恢复。

`NEXT_ACTION=CHAT_ARCHITECT_EVIDENCE_SYNTHESIS`

下一位责任人是拥有最终设计裁决权的 Chat/GPT 架构负责人。输入本 RESULT、两条时间线与 benchmark；将独立 Pro 的协议逐条对照已登记预测、正控制和未知量。Work 不替其拍板；Codex 此时没有正式实施新协议的冻结授权。此动作是研究交付的明确路由，不是另外创建任务。

## 写入与验证范围

唯一写入分支：`research/architecture-production-protocol-20261027-work`。开始时已通过 `WRITE_VERIFICATION.md` 实际写入并远端回读，写入 commit 为 `fcf2b40692419e7147a38eddebbf76472bec55c8`。

本次成果只新增本目录研究文件。没有修改被研究仓库、生产 runtime、Slurm、SSH、tunnel、任务或服务；没有创建其他分支、PR、后台线程或远程任务。最终提交身份与逐文件回读结果由本次会话工具结果和最终回复给出，避免文件自引用 commit。


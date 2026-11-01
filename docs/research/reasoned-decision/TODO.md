# Reasoned Decision — TODO

> 2026-11-01 从 `Reasoned Design` 正式更名为 `Reasoned Decision`；既有 `RD-*` 回归用例 ID 保持稳定，不因命名变更重编号。

> Candidate-plugin TODO. Reasoned Decision is still a planned plugin; this file records real-use failures and does not claim production implementation or release.
>
> Related evidence: `REAL_USE_EVIDENCE.md`

## 2026-11-01：BWG/GFW thread 暴露 Task State Integrity 缺口

status: NEW  
owner: Reasoned Decision  
primary area: Task State Integrity（候选内部能力）  
related area: Judgment Integrity / Solution Design  
source: 2026-10-29 至 2026-11-01 的真实 BWG/GFW ChatGPT thread；用户已提供完整 transcript。  
evidence: 当前 thread 的私有完整记录；本 TODO 只保存不含公网 IP、订阅 token、UUID、credential URL 等秘密的抽象失败证据。

### problem

这条 thread 的核心失败不是单一“判断太保守”，而是模型没有稳定维护当前任务状态，导致每次局部纠正后仍继续回答已经关闭或根本没有被问的问题。

真实失败链至少包括：

1. 用户已经给出足够工程证据证明当前 BWG 公网 IP 在大陆方向被阻断，模型仍用“高度疑似 / 可以按被墙处理 / 不能完全排除”等措辞拒绝完成最后的工程判断。
2. 用户随后已经明确完成“付费更换新 IP”。这个动作应永久改变本 thread 的任务状态：
   - 已完成事实：旧 IP 已被墙；用户已经付费换新 IP。
   - 已关闭问题：这次要不要付费换 IP；要不要先等待旧 IP 解封；是否先用 Hysteria2 顶住旧 IP。
   但模型后续再次建议“先不要付钱换 IP”“先看 UDP 能不能顶”，把已经关闭的问题复活。
3. 用户真正追问已经变成长期预防问题：**以后怎样在不增加开销的前提下，尽量避免再次发生“被墙后只能付费换 IP”**，其中用户明确提出了健康期主动 migration 是否可行。
4. 模型却多次把“预防复发”替换成别的问题：
   - 新 IP 当前是否正常；
   - 怎样恢复全部客户端；
   - 被墙后如何继续可用；
   - 增加第二台 VPS；
   - 升级付费 SLA；
   - IPv6 / UDP / Cloudflare 灾备。
   这些可能各自有价值，但都不能替代当前目标“零新增开销地降低再次进入付费换 IP 状态的概率”。
5. 用户明确加入“**不增加开销**”这一硬约束后，模型仍继续提出第二供应商、付费 SLA 等方案，说明约束没有被真正消费。
6. 模型曾承诺“重新把 migration 机制查透”，但实际只回读旧 thread 就再次给出“不要定期 migration”的结论；也就是研究承诺没有完成，结论却提前关闭。
7. 用户每次纠正后，模型能在当前一句话里复述新的目标，却没有把它变成后续推理的持久任务状态；因此下一轮又从旧问题或新旁支重新开始。

### why this is not only Judgment Integrity

Judgment Integrity 能拦住“证据已经足够却不敢下结论”这一类失败，但不能单独保证模型仍在回答**当前问题**。

即使证据判断非常严谨，只要当前任务状态错了，模型仍可能非常有逻辑地回答：

- 用户已经做完的动作；
- 已经关闭的问题；
- 与当前目标相邻但不同的问题；
- 违反当前硬约束的方案。

因此需要单独评估 Reasoned Decision 是否应加入候选内部能力 **Task State Integrity**。

### minimum task-state contract to evaluate

每轮推理前至少维护并真正消费以下短状态：

- **CURRENT_QUESTION**：用户这一轮真正要解决什么。
- **HARD_CONSTRAINTS**：例如“零新增开销”“不要客户端临时 patch”。
- **CONFIRMED_FACTS**：已经被证据或用户动作确定的事实。
- **COMPLETED_ACTIONS**：用户或系统已经完成的不可忽略动作。
- **CLOSED_QUESTIONS**：已经结束、不得无故重新讨论的问题。
- **DO_NOT_REVIVE**：除非出现明确新证据，否则禁止复活的旧路线。
- **SUCCESS_CRITERION**：什么样的回答才算真正解决当前问题，而不是只提供相邻信息。

这些字段可以是内部轻量状态，不要求数据库或重型 memory 系统。

### regression requirements

后续 Reasoned Decision 回放必须覆盖本案例，并至少满足：

1. 当用户已经说“我已经付费换了新 IP”，后续不得再次建议“先别付费换 IP”，除非用户明确重新打开该问题。
2. 当当前目标是“避免复发”，只提供“复发后如何保持可用”应判失败。
3. 当硬约束是“零新增开销”，把第二台 VPS、付费 SLA 等作为默认答案应判失败；这些最多只能在用户主动放宽约束后讨论。
4. 当用户问“健康期 migration 能否作为预防”，必须真正核实 migration 的 IP 变化、限制、回迁行为与社区长期实践，再做判断；不能用旧结论或直觉提前关闭。
5. 用户纠正目标后，下一轮必须继承纠正后的状态，而不是只在当前回复里复述一次。
6. 如果一个问题已经有足够现实工程证据，Reasoned Decision 必须完成可执行判断，不得为了理论上的微小不确定性把结论重新丢给用户。
7. 最终输出必须直接回答“现在该采用什么长期策略”，而不是让用户从多个旁支方案里自己提炼。

### project-specific context

BWG、GFW、DC9、migration、IP replacement 是本案例的具体载体，不应直接变成 Reasoned Decision 的通用规则。通用问题是：**多轮真实任务中如何保持当前目标、约束、完成事实与关闭问题不漂移，并在正确问题上完成证据充分的判断。**

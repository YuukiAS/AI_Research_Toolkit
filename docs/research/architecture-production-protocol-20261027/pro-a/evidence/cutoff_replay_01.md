# 历史材料独立判断

## 固定结论

**唯一下一执行者：Codex 最小实验。**

暂不建议把完整范围直接交给 Codex 正式实施。两份材料已经把主要产品取舍、职责、失败路径和验收范围写得足够具体；问题不在于还缺一轮泛化设计，而在于其中两组必要的目标运行时事实仍是 **UNKNOWN**。尤其是 `thread/inject_items` 展示链：正常输出和确定性 fallback 都依赖它，失败后又明确禁止执行者自行替换机制。这个前提值得在较大规模的正式实现前，用冻结预算内的小实验先确定。

这不是认定该 API 不存在，也不是认定整个方案无法实现。材料只足以支持“要求使用并准备验证”，尚不足以支持“已在目标运行时证明可用”。独立评审给出的 `READY_FOR_CODEX=YES` 是已知的文档判断，不能代替尚未提供的运行时观察。

## 输入边界与判断截点

只读取了以下两个原始文件，没有读取仓库、历史提交、其他材料或后续结果，没有联网，没有运行产品或实验：

- [input_01.md](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/a6c0a3e0ecc59147fa83714c07a15244f1f2c36b/docs/design/0.11.0_final_scope_recovery_execution_plan_v0.8_2026-10-18.md)：《Bridge Kit 0.11.0 Final Scope Recovery — Execution Plan v0.8》。
- [input_02.md](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/35a976e79c036f6e68ba70e9d2364abc1c274a45/docs/design/0.11.0_final_scope_recovery_execution_ready_critic_review_v0.8_2026-10-18.md)：《Bridge Kit 0.11.0 Final Scope Recovery v0.8 — Execution-ready Critic Review》。

下文的“已知”均指材料中有明确记载，不代表本次独立复核了其所引用的源码、官方协议或历史证据。判断在读完两份材料后固定，未寻找未来结果。

## 已经足够明确的部分

| 范围 | 材料已冻结的决定 | 本次判断 |
|---|---|---|
| Worktree | 新正式路径禁止系统临时目录；T 内部派生；所有平台生产自动 exchange 在第一次 move 前返回 `WORKTREE_EXCHANGE_ACTIVITY_UNVERIFIED`，保证零修改；事务核心仅在可丢弃 fixture 中回归 | 不存在必须先发明 quiescence 证明的开放设计。扫描的局限已由禁用生产自动 exchange 消化，不能因此再次重开该项。见 input_01 §5、§12 G02；input_02 “Minimal recheck result”。 |
| 指令预算 | 用户指令只诊断；Bridge managed block 写前计算投影字节；三个 block 有明确上限；自身 root AGENTS 有明确目标 | 足以指导实现与验证。实际字节、发现顺序和 native 截断行为需要实现期检查，但材料没有迫使执行者重新决定产品边界。见 input_01 §4。 |
| Host rules | 常用安全读取直接允许；危险邻近保留门控；`ls-remote` 的具体形状若实测不能冻结，只收窄这一条 | 关键取舍及失败后动作均已给定。argv 与 execpolicy 检查属于有边界的实现验证，不构成本次额外设计 blocker。见 input_01 §6。 |
| 授权连续性 | 当前可见用户授权/Kickoff 与 exact effect identity；原生 session approval 只按真实 lifetime 使用；无法证明时允许重问；不建立授权数据库 | 不要求跨会话永久授权，也没有必须补出的新授权系统。见 input_01 §7。 |
| 通知 | 三个独立 intent、固定 runtime emitter、semantic authority、兼容映射和默认关闭均已确定 | 足以实现事件合同。runtime 退出与 semantic PASS 的区别不是未决问题。见 input_01 §8、§11。 |
| 写作与失败隔离 | 每次 logical delivery 最多一次 reader turn；thread/email 复用同一结果；reader 失败时使用确定性 fallback；不杀 primary | 产品语义已经确定；尚需确认的是承载这些语义的正式运行时能力。见 input_01 §9。 |

## 两项实质未决问题

### 1. 目标运行时是否支持冻结的零模型回合展示链？

**状态：UNKNOWN；完整范围的前置可行性问题。**

input_01 §9.5、§10.2–10.3、§12 G14-C/G14-F 要求：通过同一个 official shared app-server，向非 ephemeral、display-only 的线程注入 assistant text；首次注入后线程必须 materialize；exact thread ID 冷恢复后文本仍在；viewer 已打开时 reporter 的后续注入仍可见；全过程不依靠展示线程的 model turn。材料还明确规定，若不成立则 G14 FAIL，执行者不得换回原 Executor thread、embedded writer 或第二模型链。

两份输入没有提供这一组合行为的目标版本调用记录、持久化回读或 viewer 并发观察。input_01 §1.7 记载的 `plugin/list`、`skills/list`、structured skill input 以及历史 plugin smoke，并不能证明上述展示链。input_02 的 PASS 主要确认摘要修正和范围保持，也没有增加该链的实测结果。

这里的未知同时包括：正式 shared server 是否能被当前环境按约束发现并连接，以及同一 server 上注入、冷恢复和 viewer 共存是否成立。单独看见一个方法名或收到一次 RPC 成功响应，不足以回答完整问题。

### 2. 正式 reader 调用能否同时满足明确选 skill 与上下文、工具隔离？

**状态：UNKNOWN；正常 reader 路径的必要技术事实。**

input_01 §9.2、§9.4 要求每个 event 使用 fresh ephemeral reader thread，显式选择同一正式插件的 `chinese-prose` 与 `writing-fidelity`，同时不带业务历史、AGENTS/Goal/task/source/log，并关闭 shell、web、apps、MCP、dynamic tools、environment、multi-agent、hooks 等执行或外部表面。

材料提供了 skill discovery/selection 能力的记载，也规定了 neutral cwd、空 workspace roots 等要求；没有给出在目标正式 runtime 上同时满足这些条件的已验证配置和观察。不能仅由“换了 cwd”或“创建了 fresh thread”推出所有隐式指令和工具都已隔离；也不能由一次历史插件调用推出本次完整隔离合同已经成立。

这不要求新建 reader 服务。需要确定现有官方入口是否足以实现已经冻结的限制。若只能依赖未说明的宿主改造或额外模型链，便会超出当前执行包。

## 建议的最小实验

**实验要区分的决定：**现有目标 runtime 能否承载冻结机制，从而进入正式实施；还是该机制不能成立，需要把具体失败事实交回原规划/审查流程。不是试验通知文案优劣，也不是提前跑完整 G01–G14。

### 最小对象与观察

1. **先确认能力和连接事实。**记录 actual Codex/runtime identity、目标 shared server 的绑定、必要方法及请求字段、已安装插件与两个 skill 的实际 identity。若方法或必要配置不存在，立即记录结果，不补替代机制。仅缺环境前提时应记为“前提未满足”，不能据此断言机制不可能。

2. **只使用一个可丢弃的 durable Progress display thread。**在既有正式 shared server 上验证一次 assistant text 注入，随后以 exact ID 冷恢复并回读；打开真实 viewer，再验证第二次注入仍可见并持久。展示线程保持零模型回合。观察必须来自实际协议/持久化读回和 viewer 行为，不能只用模型自述或本地模拟代替。

3. **最多两个 fresh ephemeral reader turns。**按 input_01 §9.2 的正式 structured skill selection，分别处理两个最小 canonical events。记录实际调用与受支持的隔离配置，确认第二次调用没有携带第一次事件、输出或展示历史；对隐式指令与工具边界没有可验证依据的部分继续标 UNKNOWN。两次结果分别用于上述两次正常展示注入，不追加写作回合。

4. **追加一次零模型回合 fallback 注入。**使用冻结的确定性短文本，确认 fallback 也走同一展示入口并持久。email 复用可比较同一结果的字节或内容，不发送真实 Gmail。

该实验沿用 input_01 §9.8、§16 S6、§18 的上限：一个 durable display thread、最多两个 reader turns、两次正常注入和一次零模型 fallback 注入。不跑业务 primary，不修改正式用户 worktree，不发送真实邮件，不发布 GitHub 或 release，也不通过新增 daemon、embedded writer、模型链或权限扩大来使实验通过。

### 结果如何影响决定

| 观察结果 | 对当前范围的影响 |
|---|---|
| 两组能力都在目标 runtime 得到实际证明 | 这两项前置未知关闭；当前合同已足够交正式实施。之后仍按原计划完成开发回归、candidate freeze 与 final Gates，本实验不冒充 release PASS。 |
| 注入不可用、不持久、不能冷恢复，或 viewer 与 reporter 不能按合同共存 | G14 的展示机制不成立，且正常 reader 和 fallback 都受影响。执行者应提交具体失败证据，不能靠增加模型回合或换展示承载方式继续。 |
| reader 无法兼顾正式 skill 选择与冻结的隔离要求 | 正常写作路径未满足合同。确定性 fallback 能降低运行影响，但不能替代“正常路径真实消费正式插件”的验收要求。 |
| 只有环境或身份前提尚未满足，或关键观察不可获得 | 维持 UNKNOWN，指出具体缺项；不把未完成的验证写成 PASS，也不据此擅自扩展产品设计。 |

## 权限与评审状态的解释

input_02 明确给出 execution-ready PASS，并说明它只代表可交 Codex 开始开发，不代表实现完成、development Gate 已通过或 final release 已批准。本判断接受这份记录作为已有评审结论，但对下一步工作次序作独立判断：先验证会决定整条实现路线能否成立的两项运行时前提。

input_01 开头明确该文件本身不授权实现或 canary。两份输入也没有包含新的执行授权，因此实际实施/canary 权限是否已经在其他渠道授予为 **UNKNOWN**。这里选择“Codex 最小实验”只是唯一下一工作类型，不构成授权；本次已按任务要求停留在阅读与判断，没有运行它。

除上述两项必要技术事实外，未发现需要现在继续补核心设计的事项。不要求为了得到更多问题而重开 worktree、治理 owner、三 intent、预算或发布边界。

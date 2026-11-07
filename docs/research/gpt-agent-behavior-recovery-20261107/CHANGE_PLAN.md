# 配置修改方案

Status: PROPOSED — NOT APPLIED  
Date: 2026-11-07

## 1. 优先级：先修哪里

### 第一优先：实际运行时全局 AGENTS

目标：

- `~/.codex/AGENTS.md`
- 版本化来源：`YuukiAS/AI_Instruction_Configuration/codex/global/AGENTS.md`

原因：现场 Probe 已经证明本机 Work 和独立 Codex 都会加载它。这是目前唯一同时覆盖两类失败运行时、且有直接证据的长期入口。

不建议先把 `chatgpt/global/codex-current-instructions.md` 当作修复本身，因为该文件当前明确写着“是否同步到实际 Codex 运行时待确认”。下一版应先把“仓库候选”和“真实运行文件”收敛为一条清楚的来源链。

### 第二优先：多仓本地项目的 canonical-owner 路由

`PC+Server+VPS` 保持一个本地项目，继续以 `Remote_Compute_Infrastructure` 作为 primary，同时附加 `Local_Compute_Infrastructure` 与 `Clash_Profile`。不为了指令发现而强迫用户拆成三个项目。

需要修的是自动加载语义：

- primary folder 只是默认工作目录和自动发现入口，不等于整个 `PC+Server+VPS` 工作台的 canonical owner；
- 每个任务开始前先按任务本身判断 canonical owner；
- owner 就是 primary repo 时，使用已自动加载的 repo `AGENTS.md`；
- owner 是 secondary repo 时，Codex 必须主动读取该 secondary repo 的适用 `AGENTS.md` 和必要合同，再进行修改或把结果归因给该 repo；
- primary repo 的专属规则不得因为自动加载而越权覆盖另一个 canonical owner；
- 跨 repo 任务必须显式区分每个变更的 owner，不能因为三个目录放在同一个 local project 就混写事实。

这样既保留用户想要的单一工作台，也修复“primary 自动发现被误当成任务所有权”的路由错误。

### 第三优先：ChatGPT 全局与 Project instructions

`chatgpt/global/custom-instructions.md` 当前主要解决读者表达，已经有明显价值，不应把完整工程规则继续塞进去。

后续只考虑加一个极短的行为核心，覆盖普通 Chat：

- 先确认当前真实问题和成功标准；
- 新权限/工具/复杂度前先证明必要；
- 交付前确认没有把理解和判断重新推给用户。

但 ChatGPT Project 内官方规则是 Project instructions 覆盖 global Custom Instructions，因此如果 Web/Cloud Project 也要稳定拥有这三条，必须由 Project Instructions Editor 在维护项目设置时统一注入；不能假定全局 Custom Instructions 会兜底。

本阶段先不批量改所有 Project setting。先用 Work/Codex 三回归验证全局 AGENTS 改动是否有效，再决定是否扩大。

## 2. 全局 AGENTS 需要增加什么

不是增加案例禁令，而是增加一个短的“任务判断内核”，放在少见的机器/工作流细节之前。

### A. 开始动作前

内部确认：

1. 当前真正的用户结果是什么；
2. 当前运行时与实际指令来源是什么；
3. 当前准备做的动作是否直接推进成功标准；
4. 是否存在更小、已授权、现有能力可完成的路径。

新增权限、外部应用访问、用户操作、开发工具链、后台服务、fork、系统级组件或长期维护面前，必须先证明它是当前成功标准的最小必要升级。

### B. 遇到限制时

限制只作用于受影响的路线。

禁止把“我想用的实现做不到”自动升级成“用户目标做不到”。BLOCKED 必须针对用户成功标准，而不是某个 API、字段、设备身份或候选方案。

### C. 请求用户前

只有当前信息无法由 Agent 从已授权上下文、文件、工具、官方资料或非破坏性验证得到，而且该信息确实会改变下一步，才请求用户。

用户不是方向探索器或 regression suite。

### D. 交付前

发送前做一次读者检查：

- 是否直接回答了用户真正的问题；
- 是否明确了当前结论、推荐、下一步和用户是否需要行动；
- 是否把本应由 Agent 完成的理解、比较、推演、总结重新交给用户；
- 内部状态、日志、报告结构删除后，答案是否仍然完整。

需要用户决定时展示实际后果、代表性案例或成品差异，不要求用户批准抽象规则。

## 3. 对现有文件的具体处理

### `codex/global/AGENTS.md`

**修改。** 增加上述短核心；同时审查当前 Bridge Kit host-policy 中哪些是跨任务真正必须常驻的安全规则，哪些是罕见 workflow 细节。第一轮不冒险删除安全边界，但应避免继续往该文件追加更多案例型条款。

### `chatgpt/global/codex-current-instructions.md`

**收敛。** 当前 v0.3 已经包含任务忠实、风险匹配、自主执行、局部阻塞不扩大、最终自然中文等正确方向。下一版应吸收本轮四个判断门槛，并明确它与真实 `~/.codex/AGENTS.md` 的关系；不能长期保留“两份都叫当前全局规则”的状态。

### `chatgpt/global/custom-instructions.md`

**暂不大改。** 当前表达层已经足够强。若三组回归证明普通 Chat 仍缺同样的前置判断，再只加 1 个短段，不把 Reasoned Decision 全文复制进去。

### ChatGPT Project settings

**本轮不批量修改。** 已知 Project instructions 会覆盖 global Custom Instructions，但本机 Work 是否接收绑定云端 Project instructions 仍未实证。先不要把未确认的加载关系当修复入口。

### 各项目仓库 `AGENTS.md`

**不复制通用判断内核。** 项目 AGENTS 只保留项目专属事实、危险边界和工作流。若某项目存在与全局核心直接冲突的规则，再做局部修正。

## 4. 修改前后预期变化

| 场景 | 修改前 | 修改后应出现 |
| --- | --- | --- |
| Probe 需要核官方规则 | 看到 Edge 可用就申请权限 | 先用当前线程、项目状态和已有官方检索；仅在关键未知确实必须依赖 Edge 时申请，并说明必要性 |
| Karabiner 遇到 device_id(0) | 把实现字段升级成 Goal blocker | 只淘汰“依赖物理来源”的路线，继续比较 stock / compose / extend |
| Karabiner 找到源码可改 | 技术上能做就一路走到 Xcode / fork | 先证明更小路线不能满足成功标准；没有 Gap Proof 不升级维护面 |
| 需要现场验证 | 多次要求断线、按键、授权 | Agent 自动验证到最后一公里；用户只承担真正 HUMAN_ONLY 的一次确认 |
| Validator 给用户决定 | 82%、决定单、状态字段、抽象批准 | 先给实际影响和代表答案，说明推荐与理由；内部报告退到证据层 |
| 最终回复 | 把内部完成度当用户结果 | 先回答“现在是什么、意味着什么、你要不要做事” |

## 5. 是否新增文件

### AI_Research_Toolkit

本分支新增本研究目录和三份文件：

- `CURRENT.md`
- `CHANGE_PLAN.md`
- `REGRESSION_PLAN.md`

它们是研究与回归依据，不是运行时指令。

### AI_Instruction_Configuration

当前建议**优先修改现有文件，不新增运行时配置文件**。若后续决定让 Project Instructions Editor 维护一段跨项目共享核心，届时再评估是否新增一个仅用于生成/维护的 shared fragment；在没有消费机制前不创建“看起来统一、实际不生效”的文件。

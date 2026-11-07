# GPT / Work / Codex 行为修复研究 — 当前判断

Status: ANALYSIS_BASELINE  
Date: 2026-11-07  
Scope: ChatGPT Work、Codex Desktop、AI Instruction Configuration 与本地项目路由。当前只研究和设计修复，不修改生产 AI 设置。

## 1. 为什么这次不是三个孤立 bug

三组真实失败分别发生在不同阶段：

1. **Probe / 权限判断失败**：任务只是只读确认运行时身份与指令来源，Work 在已有当前线程、项目状态和官方资料能力时仍主动申请 Microsoft Edge 权限。问题不是“不能用 Edge”，而是没有先判断新增权限是否必要、是否会改变结论。
2. **STAT5060 / 人类交付失败**：内部工作已经很多，但最终把“82% ready”“一页决定单”“状态字段”和抽象规则交给用户，要求用户批准；没有先把规则在真实答卷上的后果、推荐理由和真正需要判断的分歧展示出来。
3. **Karabiner / 执行判断失败**：局部实现限制被升级成 Goal BLOCKED；随后把“尽量复用现有键盘体验”的目标逐渐替换成“恢复软件事件来源”，最后升级到 Xcode、Apple Development 证书和自编译 Karabiner，而更小的 stock Karabiner + 会话门控路线尚未完成 Gap Proof。

共同根因不是某个产品名或某条禁令，而是缺少一组默认的**前置判断、执行中判断、交付前判断**。

## 2. 当前运行时事实

### ChatGPT Work — STAT5060

现场 Probe 已确认：

- 线程是本机 ChatGPT Work，不是独立 Codex。
- 本地项目绑定同名 ChatGPT 云端 Project。
- 本轮实测自动加载了本机全局 `~/.codex/AGENTS.md`。
- 启动注入记录中没有云端 Project instructions 正文；本轮按**未加载**处理，不把它作为 Work 修复入口。
- 主文件夹不是 Git 仓库，因此没有仓库级 `AGENTS.md` 自动进入这条线程。

因此，针对这条 Work 失败，**目前唯一已经实证会长期进入该线程的用户规则层，是所选机器的全局 Codex 指令，也就是 `~/.codex/AGENTS.md`。** 启动注入记录同样没有网页端全局 Custom Instructions 正文；本轮按**未加载**处理。后续修复这两条本机 Work/Codex 事故时，只使用有启动证据的规则层，不再把云端 Project 绑定或网页设置当成潜在修复入口。

最新 Codex 设置界面进一步确认：当前机器真实的全局 `~/.codex/AGENTS.md` 已经是 2026-11-06 更新后的中文 v0.3；而版本仓库 `AI_Instruction_Configuration/codex/global/AGENTS.md` 仍是 2026-11-03 旧英文快照，新版中文正文却保存在 `chatgpt/global/codex-current-instructions.md`。这是**版本归档漂移**，不是运行时仍在使用旧英文规则。

### Codex Desktop — PC+Server+VPS / Karabiner

现场 Probe 已确认：

- 线程是独立 Codex Desktop，不是 Work。
- 本地项目 primary folder 是 `Remote_Compute_Infrastructure`，另外附加了其他目录。
- Codex 自动加载 `~/.codex/AGENTS.md` 和 primary repository 的 `Remote_Compute_Infrastructure/AGENTS.md`。
- secondary folder 的 `AGENTS.md` 不会因为“已附加”就自动发现。
- ChatGPT Web Custom Instructions、同名云端 Project instructions 不适用于这条 Codex 线程。

补充 Probe 已经排除了一个之前的错误归因：**Karabiner 失败不能归因于“没有读到 Local Compute 的规则”。** 线程启动时确实自动加载了 Remote Compute 的项目规则，但用户原始任务明确要求先读 `Local_Compute_Infrastructure/AGENTS.md`，Codex 也在开始实施前实际读取了该文件和 Karabiner 当前状态。

更关键的是，Karabiner 失败发生时：
- 中文 v0.3 全局规则已经完整在上下文中；
- Local Compute 的轻量、现实问题优先等项目规则已经在上下文中；
- 用户原始目标已经明确写成“UU 远控时复用现有 Windows 键盘语义”，没有要求恢复每个事件的物理来源；
- 在这些规则都存在的情况下，Codex 仍把 `device_id(0)` 相关限制升级成整个 Goal 阻塞，随后继续走到 Xcode、Apple Development 证书和自编译 Karabiner。

因此，这次 Karabiner 的主问题是**Codex 在已获得正确目标和正确规则后，仍然没有把“不得擅自扩大目标”落实成稳定判断行为**。这属于全局执行判断缺陷，不应再用更多 Local/Remote 仓库规则来补。

## 3. 通用失败模型

### A. 运行时与规则来源识别不完整

在做判断前没有先稳定回答：

- 当前是 Chat、Work 还是 Codex；
- 当前是 cloud project、local project 还是二者绑定；
- 哪些 instruction 实际自动加载；
- 当前任务的 权威归属 与 primary folder 是否一致。

结果是后续修改可能落在不会生效的层，或让错误仓库的项目规则主导任务。

### B. 动作必要性与比例感缺失

Agent 容易把“可用的工具/权限/实现路径”误当成“应该使用的工具/权限/实现路径”。

需要新增权限、用户操作、工具链、长期服务、fork、系统级组件或明显维护成本时，没有先证明：

- 它解决哪条用户成功标准；
- 更小的现有能力为什么不足；
- 新成本是否与问题价值相称。

### C. 局部失败被升级成目标失败

某个字段、API、设备身份或候选路线失效后，Agent 容易把实现内部条件升级成用户成功条件，并过早 BLOCKED 或换整套架构。

正确行为应是：局部限制先淘汰局部路线；只有真实成功标准在现实候选中都无法满足，才允许判整个目标不可完成。

### D. 用户被当成探针和回归测试器

Agent 没有先穷尽自身可读状态、自动验证、现有日志、官方资料和非破坏性 probe，就请求用户授权、断线、按键、切换状态。

用户操作应只用于真正 HUMAN_ONLY 的最后一公里，而不是帮助 Agent 找方向。

### E. 交付责任缺失

内部报告、状态机和 QA 结果没有被转换成“用户现在需要知道、判断、决定或操作什么”。

需要用户批准时，必须展示实际结果或实际后果，并给出推荐；不能让用户从抽象规则、状态百分比或内部决定单自行推演。

## 4. 这次不采用的修法

- 不针对三个案例分别写“不要 Edge / 不要 Xcode / 不要 82%”。
- 不要求每轮显式调用 Reasoned Decision 或 Clear Writing。
- 不把所有项目规则复制到全局 AGENTS。
- 不在证据不足时把 Work、Codex、Web Chat 当成同一个 runtime。
- 不先改全部 ChatGPT Project settings；先修已证实会影响 Work/Codex 的加载层，再用回归判断是否需要扩大范围。

## 5. 当前修复原则

第一阶段只做高杠杆、可验证的最小改动：

1. 先修**版本来源漂移**：把当前真实中文全局 Codex 指令归档到正确的 `codex/global/AGENTS.md`，避免两份“当前规则”长期并存。
2. 在 Work 与 Codex 都已实证加载的全局 `AGENTS.md` 中补足“目标保持、动作必要性、局部失败、方案复杂度、用户负担、交付转换”这些真正缺失的判断约束。
3. 保留现有 v0.3 已经正确的任务忠实、风险匹配、自主执行和中文交付要求，不通过复制更多案例禁令来补洞。
4. PC+Server+VPS 继续保持一个本地项目；Karabiner 案例不再作为“必须拆项目”或“Remote 规则覆盖 Local”证据。多仓任务只需要在全局层明确：任务属于附加仓库时应主动读取对应项目规则。
5. 用三组冻结真实回归证明行为是否真的改变；如果正确规则已经加载仍复现同一根因，再判断模型/产品形态是否不适合承担该职责。

## 6. 官方资料

- ChatGPT Work 与 Codex 产品边界：https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex
- Local project / primary folder / Codex AGENTS 自动发现：https://learn.chatgpt.com/docs/projects
- Codex AGENTS 加载链：https://learn.chatgpt.com/docs/agent-configuration/agents-md
- ChatGPT Project instructions 覆盖全局 Custom Instructions：https://help.openai.com/en/articles/10169521-projects-in-chatgpt
- OpenAI 关于减少 AGENTS / skills / task prompt 上下文膨胀：https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra

## 7. 当前候选

当前冻结候选为 **v0.8**：

`docs/research/gpt-agent-behavior-recovery-20261107/V0_8_RELEASE_CANDIDATE_AND_REGRESSION_PACK.md`

v0.7 与 v0.8 均已归档，三个回归 Prompt 保持冻结不变。当前回归状态：R1 在 v0.7 已通过；R2 在 v0.8 仍失败；R3 暂不需要重复运行，等待 R2 收敛后再做最终确认。

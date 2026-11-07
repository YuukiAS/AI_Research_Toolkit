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
- 云端 Project instructions 是否实际注入这条本地 Work 线程仍未确认。
- 主文件夹不是 Git 仓库，因此没有仓库级 `AGENTS.md` 自动进入这条线程。

因此，针对这条 Work 失败，**目前已证实的长期可控入口是本机全局 AGENTS，而不是网页 Custom Instructions 或 STAT5060 仓库 AGENTS。**

### Codex Desktop — PC+Server+VPS / Karabiner

现场 Probe 已确认：

- 线程是独立 Codex Desktop，不是 Work。
- 本地项目 primary folder 是 `Remote_Compute_Infrastructure`，另外附加了其他目录。
- Codex 自动加载 `~/.codex/AGENTS.md` 和 primary repository 的 `Remote_Compute_Infrastructure/AGENTS.md`。
- secondary folder 的 `AGENTS.md` 不会因为“已附加”就自动发现。
- ChatGPT Web Custom Instructions、同名云端 Project instructions 不适用于这条 Codex 线程。

这产生了一个真实路由缺陷：Karabiner 的 canonical owner 是 `Local_Compute_Infrastructure`，但该线程启动时自动吃到的是 Remote Compute 的项目规则。官方项目文档也明确说明：Codex 使用 local project 的 primary folder 作为 Git 和 `AGENTS.md` 自动发现入口。

## 3. 通用失败模型

### A. 运行时与权威识别不完整

在做判断前没有先稳定回答：

- 当前是 Chat、Work 还是 Codex；
- 当前是 cloud project、local project 还是二者绑定；
- 哪些 instruction 实际自动加载；
- 当前任务的 canonical owner 与 primary folder 是否一致。

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

1. 先修**运行时路由**：任务 canonical owner 与 Codex primary folder / 自动发现的 repo AGENTS 对齐。
2. 在实际被 Work 和 Codex 都加载的全局 AGENTS 中增加短小的“任务判断内核”。
3. 把现有 Codex v0.3 中已经正确的任务忠实、最小必要验证、少打扰用户、自然中文交付保留并收敛，不继续堆大型协议。
4. 用三组冻结真实回归证明行为改变；失败时再决定是继续调配置还是判模型/产品形态不适合。

## 6. 官方资料

- ChatGPT Work 与 Codex 产品边界：https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex
- Local project / primary folder / Codex AGENTS 自动发现：https://learn.chatgpt.com/docs/projects
- Codex AGENTS 加载链：https://learn.chatgpt.com/docs/agent-configuration/agents-md
- ChatGPT Project instructions 覆盖全局 Custom Instructions：https://help.openai.com/en/articles/10169521-projects-in-chatgpt
- OpenAI 关于减少 AGENTS / skills / task prompt 上下文膨胀：https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra

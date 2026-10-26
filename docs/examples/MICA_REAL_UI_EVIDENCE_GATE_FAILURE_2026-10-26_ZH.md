# Mica 案例：路线图逐项覆盖，却遗漏了真实界面的取证办法

日期：2026-10-26。供复杂系统设计、执行 Goal 和交付审查引用。以下将用户转述的对话、GitHub 当前文件和外部平台限制分开记录。本例是**设计缺口与项目推进判断**，不是新的 Mica 实施方案，也不修改 Mica 原有路线图。

## 发生了什么

用户在 Mica 线程里要求：完整梳理剩余功能，让每项需求都有明确步骤、证据和人工操作节点，然后让 Codex 连续开发到可用。

该线程先报告：“14 个固定步骤、95 项需求编号、34/34 现有功能矩阵覆盖”、两轮审查以及 GitHub 已提交；随后给出一个让 Codex 自主推进、仅在真实需要人工动作时阻塞的 Goal。

用户继续问：**GPT-6 的交互式回答怎样实际产生？Codex 如何在登录态页面获取其结构？谁执行必要的点击或提问？** 回答才承认：原 Goal 没有确定产生真实交互式回答、观察流式组件及将观察转成回归测试的可执行路径。

用户因此要求停止 Mica；该线程按要求停止，也没有产出下一步开发结果。**“停止”的证据来自用户在对话中提供的片段；不能据此推断 GitHub 中的某个运行任务或进程状态。**

核心问题不是编号没有覆盖功能，而是**步骤 06 虽写了“验证当前 GPT-6 智能界面”，却没有先证明取得该验证所需的真实样本的通道**。后面第 07 步布局、第 08 步回归和第 09 步实站验收依赖它，因此“完整、可以自主执行”的说法过早。

## 我们实际能核实的现状

2026-10-26 从 GitHub 读取：

- 仓库：[`YuukiAS/Mica-for-ChatGPT`](https://github.com/YuukiAS/Mica-for-ChatGPT)。工作分支：[`codex/mica-functional-convergence`](https://github.com/YuukiAS/Mica-for-ChatGPT/tree/codex/mica-functional-convergence)，HEAD `af3cdc9399eef90a44a6286f02faa5a9a47305af`。本次路线图提交前的源码起点 `28570488d2dd14e1c9a633c56bbaab908d90ebbe`；二者 GitHub 对比仅 `docs/ROADMAP.md` 有改动，**不能把路线图审核视为新功能开发**。
- [路线图](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/codex/mica-functional-convergence/docs/ROADMAP.md) 第 05 步是先消除未经验证的自动刷新与恢复风险；第 06 步是当前 ChatGPT 结构；第 07—08 步是 UI/真实安装扩展测试与独立审查；第 09—10 步是真实用户集中验收与四核心预发布；第 11—14 步另有普通网页高亮、Notion、可靠性等完整产品事项。
- [本地候选说明](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/codex/mica-functional-convergence/docs/product/MICA_FUNCTIONAL_CONVERGENCE_V1.md) 与[验证覆盖](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/codex/mica-functional-convergence/docs/testing/MICA_EXTENSION_TEST_COVERAGE.md)：`0.5.16` 已有复制、高亮、PDF、低内存的生产代码，以及真正加载 MV3 扩展的隔离 Chromium 测试。报告显示本地测试通过；真实登录态和目标设备尚未通过，不应贬低已实现代码，也不应把离线测试冒充发布完成。
- [10 月 12 日 ChatGPT 实站调查](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/codex/mica-functional-convergence/docs/investigations/2026-10-12-current-chatgpt-surface-bootstrap.md)：只读调查来自未登录主页和公开共享对话。[`contracts/chatgpt/current.json`](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/codex/mica-functional-convergence/contracts/chatgpt/current.json) 仍把原生回答操作区、数学和流式/工具行为标为 `UNKNOWN`。
- 实际 [`ChatGPTAdapter`](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/codex/mica-functional-convergence/extension/src/core/chatgpt-adapter.ts) 的 `inspectAnswerActionTargets()` 在真实站点当前返回 `current_site_contract_unproven`，只允许有可信测试权限的 fixture 完成精确按钮注入。这是安全的保守行为，也证明按钮还没完成真实适配。
- 已有 `Developer QA` 去敏报告及 `scripts/chatgpt-ui.mjs` 的 `verify/refresh/diff`，但后者只读取报告，不负责打开 ChatGPT 或生成模型回答。现有报告的结构内容是否足以保存所有动态交互组件仍须核查，不能因为“有导出按钮”就判可重放。
- 已保存 [Windows Codex Computer Use 配置与旧实测](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/codex/mica-functional-convergence/docs/WINDOWS_CODEX_COMPUTER_USE_SETUP.md)，但那次只证实 Calculator 等原生窗口控制；不证明能合法自动操作 ChatGPT 网站本身。OpenAI 当前[Computer Use 官方说明](https://learn.chatgpt.com/docs/computer-use)明确写明不能自动操作 ChatGPT 自身；[Intelligent UI 说明](https://help.openai.com/en/articles/20001598-intelligent-ui-in-chatgpt)则确认交互内容取决于问题，不能保证每次生成按钮/图表。

## 本例的设计失败在哪里

| 当时说已经解决 | 实际缺的前置事实 | 正确处理 |
| --- | --- | --- |
| “步骤 06：真实 GPT-6 UI 适配” | 具体由谁在什么会话生成/选取交互回答，以及用什么设备、权限、工具取到可重放证据 | 先指定并验证“公共只读样本 → 必要时用户现有登录态 H0 一次简短操作 → 去敏 QA → 差异判断 → 离线正式扩展回归”的**实际入口与输出** |
| “Codex 自主连续开发” | 是否存在无法由 Codex 自己获取的登录态/私人界面，以及哪些操作不允许自动化 | 在开发开始前把每个外部前提分为：已获真实证据、可自动取得、仅用户可执行、当前不可取得 |
| “全部需求编号覆盖” | 每项关键验收能否取得足以判断成功或失败的观察，真实数据怎样进入测试 | **覆盖矩阵必须有证据取得方法、合法执行者和失败后的下一步**；没有这些字段不能声称实施闭合 |
| “需要用户时才 BLOCK” | 条件是否可准确识别、用户只需做哪一个最小动作、其他路径如何继续 | 只有不可替代的真实外部事实/权限/设计决定阻塞对应功能；其它任务继续开发 |
| “用户指出遗漏后停止” | 是否可以在不再次要求规划的情况下恢复当前已允许工作 | 尊重用户明确暂停指令；恢复授权后从第 05 步继续，并把缺失前提补进第 06 步执行说明，不重开 95 项规划或另建 Goal |

**完整性不等于已编号；还要求最危险的环节能被实际观察和证伪。** 这是一项前置可行性检查，而不是要求每条代码实施前再跑一次 Planner–Critic。

## 不等待新插件，Mica 仍可完成的路径

这段是根据当前已读证据提出的建议，**未在 Mica 仓库实施或完成验证**。

1. **当前可立即开发的部分：** 承接原分支第 05 步，先处理自动刷新和恢复的危险默认值/存量升级/执行前条件；随后继续公共只读 ChatGPT 能力核对、既有 Developer QA 报告能力、真实扩展离线回归，以及不依赖未取得 DOM 位置的高亮、复制、PDF、设置等可实施事项。
2. **真实交互界面的最小缺口：** 优先查找合法公开样本、已有去敏报告。若必须从登录态生成或选取一条动态 GPT-6 回答，明确请求用户 **一次 H0 操作**：在自己的 ChatGPT 网页打开已有交互回答，若确有必要自行生成无敏感内容的测试回答，在 Mica 中按预先做好的操作导出安全结构报告。不能要求用户贴聊天正文、导出 cookie、反复跑 DevTools；如果没有观察到某种组件，记作未证，不伪造 fixture。
3. **已有实物测试继续用：** [Playwright 官方扩展说明](https://playwright.dev/docs/chrome-extensions)要求专用 Chromium persistent context 加载 MV3 扩展。当前仓库已经这样测试，并且能用可回放的真实派生结构检查功能。新版本应继续先让已知坏例失败、正确例通过，再进入独立完整作品检查。需要重新覆盖的真实边界才安排 H1。
4. **集中人工验收：** 现有路线图预计 H0 为 0/1 次、H1 为 1 次、H2 为 1 次；真实条件改变时可能调整，不能承诺绝无额外人类动作。H1 服务于四核心首次可用发布；H2 服务于普通网页/Notion/安全恢复等完整第一版。此时用户做的是 **Codex 不能合法替代的最终真实动作**，而不是替 Codex 找第一轮常规代码/UI 错误。
5. **两个范围同时被保留：** 优先把四核心做成可安装和实用版本，再持续完成 11—14；不因为准备全功能而拖延第一批可用能力，不因为提前发布四核心而取消其余既有要求。

## 对后续复杂系统设计与验收的通用规定

一份声称“现在可以让执行者自主推进”的方案，必须在批准前检查至少三条最危险的真实路径：**数据/证据从哪里来，谁能合法取得，最终怎样在生产入口观测成功与失败**。特别核对需要登录态、不可稳定触发的第三方 UI、用户本机环境或有副作用动作的步骤。

对每个核心依赖给出“目前已证/仍需验证、具体取得途径、负责人、无法取得时怎样局部继续”的简短答案。**若依赖尚未解决，应在批准前指出，绝不能用大量需求编号或机械 PASS 掩盖。**

反过来，暂时拿不到某一外部证据，不等于整个项目应当停工。保留已有成果，在安全范围内持续实现和测试；涉及用户登录态、权限和外部真实结果时精确请求最小人工动作。**用户是否继续开发是用户的决定；协作模型不得把自己的设计缺口当作替用户取消项目的理由。**

本记录只增加 Toolkit 案例，未改变 Mica 路线图、分支、运行代码、已安装插件、真实账号或 release。

# 六仓库实际工作流安装盘点：不能把 Bridge 的可用源码当成已启用运行器

检查日期 2026-10-13。只读 GitHub 固定源码树，不修改项目、主机或工作流。检查标准目录：automation/reviewed_handoff、automation/agent_flow、automation/persistent_run。结论仅覆盖指定提交的**仓库已跟踪文件**；不能推出机器上的 CODEX_HOME/本地私有工作树或人工安装状态。

| 产品仓库与被检查的版本 | 标准 automation 目录是否存在 | 实际可见项目入口及落地含义 |
|---|---|---|
| Lucerna main@79dd2875d3da33c6a6d80e5e35bea812b84c1ceb | 不存在 | AGENTS、prompts/tasks、results、scripts 是实际产品任务/执行证据；不能假定 Reviewed 的 CURRENT/controller 已经管理 Lucerna |
| Bobbio develop@a64edfd6c5b11f81599bfcfc327be5964633a7b5 | 不存在 | 产品自身 develop 分支里程碑、Zotero安全验收、Figma和原生审查仍是正常来源 |
| Mica codex/mica-product-system-rebuild@0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c | 不存在 | 活动重构及已有 acceptance CLI 真实存在，但这不是 Bridge Reviewed/Control 的安装 |
| SeminarArc main@5652fe17ce60625f3ff7c758fcc0183f920189de | 不存在 | 当前黑盒/视觉/设备脚本直接服务项目任务，不假定自动有外部 Planner/Reviewer watcher |
| Asteria main@193c033659a7612a99442763077217b130e9b756 | 不存在 | 浏览器回归和 GPT Work 合同已有，但阶段责任来自项目自己的任务与审查，不是 Bridge CURRENT |
| CUHK Date main@9f25c7754d3c80d0be74f5b71016320f55753ae6 | 不存在 | 项目自有黑盒身份/票据/浏览器编排及 GitHub Actions；不能假设 Bridge 已成为其任务控制器 |

**这直接改变 v0.2/v0.3 的权重：** H01 所说“双控制器”是今后适配 Reviewed/Control 时必须避免的风险，**不是已经证明六仓库当前正在同时运行双控制器**。当前真实短板反而是：六项目已有脚本与角色合同，但缺少经实测可以持续驱动“目标→Codex实现→内部 QA→局部返修→最终可用交付”的统一正常消费程序。这是为什么只提供被动验收侧工具不够。

本轮没有读取目标机器安装的 Bridge/全局 Codex 配置，也没有证明这六仓库都在 Lite：只能说**当前 Git 跟踪树未找到上述标准目录**。其它自定义任务系统须按各项目实际源继续核对，不得根据文件夹不在就说完全没有任何工作流。

## 实际路线的修正

**研工台需要一个清晰的产品任务负责人**：从目标进入后，负责决定哪些已批准的工作仍缺实际结果，调度或交回同一合法执行者、触发项目已有的检查、在适用时取得独立审查、核对真实交付。它可以先是一个有界本机入口，不必是永久服务，也不必自建新数据库。

**但不能自己实现第二套成熟多步流程引擎**。一旦需要断线恢复和多步骤状态：
- 优先核对并比较现有 Bridge 可选的 Review/Control（必须先真正安装、授权与适配，不能自动把全部六项目切过去）；
- 对仍在普通项目任务模式的消费者，评估 github/spec-kit 当前实际具有步骤持久状态、resume、条件和 gate 的工作流引擎；仅在权限隔离后才能调用其 Shell；
- 现有 Codex SDK/CLI 作为单次工程执行后端；项目专业测试和独立审查仍由其真正的运行者执行。
- 若两者均不能以足够低的成本保持一个产品任务的完整链路，才最小化自研产品目标和阶段事件协调；不可复制完整审批、队列、工作树和调度器。

研工台和 Bridge 的最小稳定边界应按不同对象划分：**研工台拥有用户可见产品交付目标，Bridge 若已安装则拥有对应一次执行任务的状态、工作树、授权和任务持续运行。** 单次子运行是否成功，不直接意味着整体功能通过；研工台也不能绕过子运行耗尽的批准预算重新启动同义任务。

这一选择可由用户正常使用和负面案例推翻，而不是仅凭本研究名称批准。若实际接入必须给六仓库各安装几百个模板和任务文档，或每次普通改字都要人工批准，则它过重；若没有真正的自动执行入口、只产出一份检查清单，则它过简。

## 需要实测后才能决定的细节

1. 六仓库开发机当前 Codex/Bridge 真正安装和授权状态；工具不在线时如何读取成果并恢复。
2. 有没有合法方法让一个有界任务从 ChatGPT 用户指令送到有权运行的实际主机；没接通就只能用当前真实 CLI/项目启动入口。
3. Spec Kit 的工作流恢复是否能避免危险 Shell 重放、是否兼容各仓库分支和当前订阅/认证；源码明确没有强制权限沙箱，不得把它作为安全机制。
4. Reviewed/Control 如果为了某个仓库被真正启用，产品质量如何被其既有阶段消费，而不再开第二 CURRENT。
5. 项目原有脚本/第三方服务/受限 OS 隔离是否足以给出真正用户行为结果，缺少则标不足，不让配置文件通过冒充发行。

原始仓库树及严格版本可通过以下地址核对：
- https://github.com/YuukiAS/Lucerna/tree/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb
- https://github.com/YuukiAS/Bobbio/tree/a64edfd6c5b11f81599bfcfc327be5964633a7b5
- https://github.com/YuukiAS/Mica-for-ChatGPT/tree/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c
- https://github.com/YuukiAS/SeminarArc/tree/5652fe17ce60625f3ff7c758fcc0183f920189de
- https://github.com/YuukiAS/Asteria/tree/193c033659a7612a99442763077217b130e9b756
- https://github.com/YuukiAS/CUHK_Date/tree/9f25c7754d3c80d0be74f5b71016320f55753ae6

以上只读结果防止的是**设计时假设错误**。它不证明未来研工台已经接通六仓库。

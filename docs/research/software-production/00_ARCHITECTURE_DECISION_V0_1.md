# 研工台：软件生产体系架构决策草案 v0.1

> 状态：**待独立 Critic 审查；未获 PASS；未授权实现、部署或发布**。
> 日期：2026-10-13。用途：跨项目方案研究与反证，不是 AI_Skills 的正式插件、Bridge 新模式或 Lucerna 产品合同。
> 本研究暂存在 AI_Research_Toolkit 的独立研究分支。**这里是评审资料的存放位置，不预判未来生产系统的代码归属。**

## 0. 直接结论及撤回条件

候选方向是**小型软件生产协调层 + 现有 Codex/Bridge/AI Skills + 各项目已有验收程序 + 独立的候选验收与发布信任域**。用户可以称它为“研工台”；名称只是沟通入口，不代表已有软件。不要把“一个 Python 命令行加 GitHub 事件”误当成长期自动生产：没有持续在线的真实执行者、持久检查点、权限分离和产品级验收，它不能提供这种能力。

**此刻不批准建立新仓库、常驻服务、独立 GUI、全新 Plugin 或 Bridge 大版本。** 同时不把“先写文档”列为实施价值。先通过本包中的具体反证，再依据证据决定最小代码应该在哪里实现：
- GitHub + 原有脚本已足够：不另建通用控制程序；只补现有执行与验收缺口。
- 确认跨项目任务身份/恢复/晋升有重复代码且无法复用现有实现：再建立独立研工台工具代码。
- 多机长时间等待、任务租约、交互审查确实需要持续调度：先适配成熟执行系统（如 OpenHands 或持久任务框架），不自研第二个任务服务器。
- 自动化权限不可隔离：诚实地只提供独立审查和有人批准的发布，不得宣称防绕过已生效。

**放弃或改变本方案的条件**：不能让明显降级候选失败；不能真实控制跳过验收；修正产品质量的成本高于现有开发且无实际收益；两平台接入必须复制核心；可信身份无法和候选执行分离且没有安全替代。

## 1. 为什么之前的五轮方案尚不能实施

1. 第一代“规范＋Skill＋Profile”：仅提高 Codex 阅读和遵守概率，不提供独立执行和发布控制。
2. 第二代“acceptance-trust-core”：解决的是验收权威，不覆盖需求/产品设计/完整功能/根因返修/恢复/交付。
3. 第三代“独立生产平台”：系统名和模块多，但没有先证明当前 GitHub、Bridge、Codex、现有项目脚本哪里确实不够；容易重造低配任务引擎。
4. 第四代“先救 Lucerna”：业务优先级对，但容易把通用生产体系错误缩小成 Windows 原生验收问题。
5. 必须同时建设两种不同能力：**实施前/实施中纠偏**（阻止空壳、方向错误、旧功能丢失）和 **实施后独立证实**（防自改测试、错包、虚假发布）。只拥有其中一条都不够。

## 2. 本轮实际读取的来源与事实边界

- [Lucerna: 当前执行规范](https://github.com/YuukiAS/Lucerna/blob/main/docs/workflows/LUCERNA_EXECUTION_GOVERNANCE.md)：明确普通开发、隔离界面测试、最终真实验收三个边界，2026-10-10 记录的 Windows 沙箱进程/桌面隔离问题，不得靠脚本名字判断安全。
- [Lucerna: 失败史](https://github.com/YuukiAS/Lucerna/blob/main/docs/workflows/LUCERNA_EXECUTION_FAILURE_HISTORY.md)：明确记录 01047、01055 的自报通过与独立审查冲突、模拟控件泄漏、用户变第一轮质量检查者、反复重新构建与重开窗口。
- [Lucerna: package.json](https://github.com/YuukiAS/Lucerna/blob/main/package.json)：大量 lint 项是源码守卫；test:development-acceptance 当前运行自检，不等于最终安装/界面验收。
- [Lucerna: development-acceptance.ps1](https://github.com/YuukiAS/Lucerna/blob/main/scripts/development-acceptance.ps1)：确实核对候选提交、EXE 摘要、PID、同次原生冒烟与截图；但主路径调用 smoke-lucerna-close.ps1 和窗口捕获，不是无副作用后台命令，也不是独立可信裁判。
- [Lucerna: governance-regression.ps1](https://github.com/YuukiAS/Lucerna/blob/main/scripts/governance-regression.ps1)：把覆盖缺口明确计为 GAP/PARTIAL；当前脚本最后对 FAIL 退出 1，否则退出 0。因而 **退出码 0 不等于已达到 RUNTIME_GUARD_PASS，更不等于可安全做原生验收**。
- [Lucerna: NSIS hooks](https://github.com/YuukiAS/Lucerna/blob/main/src-tauri/windows/startup-hooks.nsh)：实际有启动项迁移和外来同名记录处理代码；存在代码不等于完成安装/升级/卸载的实际行为验证。
- [AI Skills: workflow-core 源](https://github.com/YuukiAS/AI_Skills_Collection/blob/main/skills/core/codex-system/codex-workflow-protocol/SKILL.md)：拥有执行路由、真实证据、完整产品切片、重复失败停止等流程指导，但 Skill 自身不是可信运行器。
- [AI Skills: Frontend Design](https://github.com/YuukiAS/AI_Skills_Collection/blob/main/skills/tools/frontend/frontend-visual-systems/SKILL.md)：现有产品视觉和真实渲染责任，不应重造同义插件。
- [Bridge Kit: 当前 AGENTS](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/main/AGENTS.md)：工作树、授权、交接、持久会话等执行机制；其 [本地自主验收 TODO](https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/main/docs/TODO_LOCAL_AUTONOMOUS_ACCEPTANCE_WORKFLOW.md) 已关闭第四种 Bridge 模式提案。
- [VibeResearch: README](https://github.com/YuukiAS/VibeResearch/blob/main/README.md)、[pyproject.toml](https://github.com/YuukiAS/VibeResearch/blob/main/pyproject.toml)：**已有**仓库内任务状态、证据、预算、安全和本地/Slurm 调度软件，当前包版本声明 0.20.4。其重点是长期科研实验，不能未经正常软件产品任务试点就声称适用于安装包/图形界面/受信发布；但绝对不能在不评估它的情况下重造状态账本和调度器。
- [SeminarArc: Android 黑盒脚本](https://github.com/YuukiAS/SeminarArc/blob/main/scripts/run-blackbox-acceptance.ps1)：可指定安装包并运行 B01–B08；[候选核验脚本](https://github.com/YuukiAS/SeminarArc/blob/main/scripts/verify-gpt-work-acceptance.ps1) 核对 APK 身份及设备证据。
- [Asteria: 视觉合同](https://github.com/YuukiAS/Asteria/blob/main/docs/operations/blackbox-audit/VISUAL_ACCEPTANCE_CONTRACT.md)：明确机械布局/截图成功不等于整体图形和数学排版质量。
- [Mica: 产品系统](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/main/docs/product/MICA_PRODUCT_SYSTEM_V1.md)：正式重建设计已经独立通过方案审查，但不能以方案批准宣称扩展实际完成。
- [Bobbio: develop/AGENTS](https://github.com/YuukiAS/Bobbio/blob/develop/AGENTS.md)：真实开发分支 develop，现有 Zotero profile 与数据目录隔离不能被通用工具覆盖。
- [CUHK_Date: AGENTS](https://github.com/YuukiAS/CUHK_Date/blob/main/AGENTS.md)：实际托管、隐私及多身份验收边界高度项目化，不能直接复制一个模拟验证模板。

以上是已检查源码/规范的事实；**没有连接 Windows 主机、未运行 Lucerna 安装/虚拟机测试，不能声称环境已经修复或发布已完成**。模型报告中的日期、成本及其他运行结论不替代当前主机实测。

## 3. 现实路线对比（只看能否减少真实失败）

| 路线 | 长处 | 不能解决什么 | 当前选择 |
|---|---|---|---|
| 不新建系统，使用现有项目脚本 | 最快继续 Lucerna 产品开发；维护低 | 候选自改测试、自报完整交付、跨项目恢复一致性 | 作为现实基线和第一步的对照 |
| AI Skills 新 Skill/Plugin/Profile | 专业知识分发、设计协调已有成熟组件 | 无独立权限、没有不可跳过的发布门槛 | 只复用，不作为主系统 |
| Bridge 大版本 | 工作树/授权/中断恢复已有机制 | 不判断产品设计、完整功能和真实专业质量 | 不扩大 Bridge 职责 |
| VibeResearch 直接复用 | 已有文件状态、预算、安全和调度实现 | 研究实验/Slurm 语义不等于软件生命周期；未知迁移成本 | 必做现实替代实验，禁止无证据复制 |
| GitHub 为主＋现有产品脚本＋隔离验收 | 既有事件、PR、构建记录、产物、用户可见任务页 | 不自带软件设计、真实 Windows GUI、可靠多机长期执行 | **优先最小方案** |
| 独立薄协调工具＋上述成熟工具 | 一个固定产品入口、跨项目恢复、专业验收接入 | 必须证明比项目原有入口有额外实际价值 | 仅当跨项目试点证明缺口后建设 |
| OpenHands 等成熟运行环境 | 真正需要长时运行与可视化时比自造 agent server 成熟 | 不自动提供独立验收/发布权；Windows 原生仍需专项环境 | 条件触发，不作为首轮前置 |
| 自研常驻服务/GUI/数据库 | 理论上集中管理 | 同时再造第二套需要测试维护的软件，拖累当前项目 | 当前拒绝 |

外部项目的实际采用需在实施前锁定官方源码/版本、许可、依赖、用途和真实试点；目前它们仅属于待复核替代。

## 4. 研工台的“对象”与正常使用承诺

拟议可称“研工台”；它不是一个新 ChatGPT 角色。**用户只需一个逻辑任务身份，源内容仍由项目仓库拥有，GitHub 提供可见任务及版本证据。** 后端可从最薄的本地程序逐步升级，但用户不应每次换工具重新学习流程。

用户用中文说“继续 Mica 高亮”“查看 Asteria 当前阻塞”“完成 Lucerna 已授权发布”时，系统必须：
1. 先解析唯一存在的任务和用户当前版本，不另造同义任务。
2. 查询实际仓库、进程、代码、产物和上一次外部副作用；说明哪个证据仍有效。
3. 选择已有获批设计、实施或验收步骤；需要真正新产品选择时才请求用户。
4. 只有在线执行器及授权真实存在时才继续执行；离线时如实说明待恢复。
5. 让用户直接看到当前真实成果、下一项动作和是否需要其介入，而不是内部日志堆砌。

界面 v1 可使用现有 GitHub Issues/PR/Checks。只有证明普通操作确实无法满足查状态、控制任务或审查体验时，才研究新的 UI；不为外观先做新前端。

## 5. 软件生产链和专业角色

| 环节 | 责任角色与动作 | 哪一层判定进入下阶段 |
|---|---|---|
| 需求/已有功能 | 用户决定目标，Planner 查仓库、核对产品成功标准、指出不能退化的能力 | 当前合同与风险分类被确认；不能编造批准 |
| 产品/交互设计 | 设计负责人依据现有 Figma/产品规范做关键状态与整体结构；重大方向经 Critic | 整体方案及关键交互路径可检查，小修复跳过重审 |
| 技术设计 | Planner/平台专家检验真实依赖、环境、成本与替代；Critic 审重大机制 | 存在合法实施入口和可验收结果 |
| 执行预检 | Bridge 核对工作树/授权/加载来源，协调层检查任务现状 | 检查不通过则不执行危险步骤；其它安全工作继续 |
| 代码实现 | Codex 完成用户入口→逻辑→状态→异常→持久化→结果完整切片 | 开发者自检仅允许进入候选验证，不能发布 |
| 开发自检 | Codex 跑相关旧回归和受影响产品动作，补失败复现 | 明确的初步结果和当前候选身份 |
| 独立验收 | 可信执行环境复用被冻结的行为合同＋项目真实程序，按平台收集原始证据 | 缺证据/错版本/自改标准不能通过 |
| 专业审查 | 独立 Reviewer 实际看完整产物；设计错误退回设计，局部错误退回 Codex | 真实材料可访问、候选绑定、无未关闭核心缺陷 |
| 集成/交付 | 受限发布者核对授权、产物、实际目标状态；已达目标不重复安装/发布 | 真实集成和运行后置条件；不是 Commit 字符串 |
| 反馈 | Planner 归因，产品/专业负责人修复；真实失败进入原有回归 | 修复后同一最终候选重验相关能力 |

角色**不等于运行进程**：小任务可由 Planner/Executor 局部合并，但方案提出者不能自审批准；实现者与可信验收器不能分享可改判定的权限；发布凭据不能交给不可信构建。独立 Reviewer 有专业判断权，但不拥有生产代码或发布权限。

## 6. 最小机制（拟议，非已实现）

- **任务契约**：指向现有 Goal、批准范围、目标功能、保护旧行为、交付物、允许的效果及权限；不建立第二套互相竞争的源事实。具体机器字段见 01。
- **影响选择**：改一个文案仅测关联 UI 与文案，改共享状态测其下游，正式安装测真实包及升级、进程与设置；若无法证明小范围隔离，则扩大检查。任务规模不由文件数量决定。
- **开发反馈**：执行者可以改源码与开发期测试，但核心验收标准和既有能力不因候选删除测试就消失。每个按钮需验证动作及后置状态，而不是 handler 存在。
- **可信验收**：由候选无法随意修改的检查器，从批准来源获得合同，实际运行指定同一产物，识别环境不足/产品失败/专业待审的差别。
- **原生/网页/移动专项**：共享的是候选、证据、权限与结果格式，真正测试留在平台适配；不开发通用“截图即通过”引擎。
- **恢复与重试**：查询 Git 与真实进程、正在执行/结果未知的外部动作。未知结果先核对后置状态；同因无新增证据不无限重试，不因提交换 SHA 就清零。
- **发布**：不能从本地 PASS 自报晋升。必须明确部署/安装对象、权限与产物；若 GitHub 私有仓库当前不可启用有效受保护检查，就只能诚实说明是人工批准发布，不能冒称强制。
- **长期运行**：会话恢复与活进程持续是两回事；没有已配置在线执行者，不能写“自动继续”。

## 7. Lucerna 是首个消费者，但不决定公共抽象

**立即要做的不是重写 Lucerna，也不是先造通用服务。** 按顺序完成：当前目标/缺陷核对 → 不危险的后台测试和修复 → 隔离原生环境真实性探针（需要另行批准）→ 精确 NSIS 候选和真实安装/状态验收 → 必要独立复核 → 已授权的最终交付。

当前缺少可直接认定安全的 Windows 测试环境；正式原生测试应在隔离虚拟机/专用测试设备且实际验证边界后执行。不能用普通 Windows 沙箱配置宣称隔离成功，也不得在用户现有正式桌面试验有风险的进程或窗口操作。

同一核心必须在**另一个平台**证明：建议 Mica（浏览器扩展完整用户功能）或 Asteria（网页产品交付）至少一个。若必须重写协调/信任核心才能适配，说明当前抽象过窄。

## 8. 什么时候值得信任与批准

**审查通过 ≠ 机制成立 ≠ 普通使用可靠。**

- **阶段 P0（现在）**：完整、可审、证据可追溯的需求/权限/架构与反证计划。只有独立 Critic 判明确版本无阻塞，才值得批准有限试点，不是批准正式系统上线。
- **阶段 P1（机制有效）**：在真实 Lucerna 当前任务上通过正例；并让故意错误的旧功能删除、假数据、改验收、自报、错包、原生越权、反复执行等候选按预期被拦截/正确阻塞。**不能只看机制自己的结构测试**。
- **阶段 P2（跨平台可用）**：至少一个非 Windows 项目（Mica/Asteria/SeminarArc）按相同核心完成真实任务，既有能力不退化，审查者实际取得完整产物；基本抽象无平台特判扩张。
- **阶段 P3（普通使用可信）**：真实的新功能、小修复及发布任务显示首轮明显缺陷漏检、用户干预、同因返修与总交付时间有净改善；恢复不会重复发布/安装。未达到就收缩机制，不升格为正式长期能力。

**当前结论：P0 研究草案已形成；独立 Critic 尚未审查，P1/P2/P3 均未验证。** 本次文件提交是研究资料，不是任何门槛通过的证据。

## 9. 仍待决定的阻塞性技术事实

1. 日常 Codex/Bridge 登录和进程在目标主机真实使用哪个版本、可以从哪里恢复；
2. 用户 Windows 可用的可信独立测试资源、虚拟机许可、桌面与凭据隔离；
3. 个人 GitHub 私有仓库当前账号实际可用的保护和发布配置；管理身份是否与 Codex 相同；
4. 独立 Reviewer 是否能够取得完整实际运行产物；无法取得时如何保留真相；
5. VibeResearch 的任务/证据/预算模块对真实软件开发能否被选择性复用，而不是复制 Slurm 研究状态；
6. 是否存在真正需要常驻调度的跨重启、跨机器、多并发任务，还是 GitHub/Bridge 的事实足以恢复。

## 10. 配套文件与独立审查

- [01_EXECUTION_AND_TRUST_CONTRACT_V0_1.md](01_EXECUTION_AND_TRUST_CONTRACT_V0_1.md)：候选系统实际代码接口、运行/恢复与权限边界。
- [02_FALSIFICATION_AND_ACCEPTANCE_PLAN_V0_1.md](02_FALSIFICATION_AND_ACCEPTANCE_PLAN_V0_1.md)：真实失败模式和正反验收，明确何时允许用户相信这条路线。
- [03_INDEPENDENT_CRITIC_PACKAGE_V0_1.md](03_INDEPENDENT_CRITIC_PACKAGE_V0_1.md)：明确版本的独立架构审查对象、阻塞判定标准和可允许的下一步；审查本身仍未执行。

本轮**不建立新的仓库、控制服务、插件、额外 Bridge 模式或正式生产流水线**，不运行 GUI/安装/收费探针，不变更任何现有产品和用户数据。正式代码化必须经独立 Critic、必要用户授权和真实环境验证。

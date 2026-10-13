# 第五卷：成熟工具复用决策与不采用的原因（B5）

目标不是让每个仓库装更多成熟库，而是明确**已有工具究竟证明哪种性质、缺什么，何时只补薄映射**。以下是设计研究时对官方文档/实际项目源码的选择；它们不是已经安装在用户目标环境的依赖。未来真正采用时必须冻结版本/提交、实际检测入口、许可/供应链风险、真实维护Owner和操作权限；仅发现/读过不是集成。

## 1. 逐证据类型选择

| 需要证明什么 | 优先复用的真实成熟实现 | 何时采用及为什么 | 不采用/不替代的边界 | 决定 |
|---|---|---|---|---|
| 项目执行、状态、审批、异步Reviewer及有限返修 | 现有GPT_Codex_AI_Bridge_Kit Host/Lite/Reviewed/Control、项目当前合法Codex任务；已检查reviewed_handoff.py/runner.py与agent_flow.py | **已安装且当前任务获授权时**直接用其真正状态、Watcher及合法角色。唯一Owner和最多两轮正式Review不被本包重写 | 其源文件存在不说明六仓已安装；Bridge不替各项目专业观测，不提供全平台图形理解 | 复用优先，拒绝第二Controller |
| 小任务技能派发与专业阶段 | AI_Skills_Collection当前前端设计、产品界面文案、医学/统计/视觉等实际Skill及workflow-core | 由现有合法阶段解析实际安装版本并触发，确认对最终代码/设计的影响，跨专业消费规则由AI Skills维护 | 本轮没有证据证明所有现有Executor自动识别并可靠调用Skill，不能靠Goal一行标“已调用” | 选择性适配现有消费入口；不造Skill路由数据库 |
| 网页完整操作轨迹 | Playwright Test与Trace Viewer，保留动作、DOM快照、截图时间线、控制台、网络及错误；Asteria/CUHK Date已有浏览器程序 | **优先在当前浏览器脚本开启必要trace**，把受测URL/当前部署版本、用户动作与后置结果绑定；Mica只对当前合法宿主受权使用 | trace存在不等于当前用户可用/科研审美正确；敏感cookie/URL会被采集，必须最小化、受限保存和脱敏 | REFERENCE→SELECTIVE_RUNTIME_DEPENDENCY（目标项目真安装后才能写ACTUALLY_CONSUMED） |
| Windows原生截图与交互 | Lucerna已有capture-lucerna-window.ps1、development-acceptance.ps1，Bobbio现有Reader/capture＋Win32/现有系统支持 | 保留实际代码与PID/前端ready/截图绑定，唯一新增的是**受权独立桌面会话和证据传输消费** | 不自造新截屏器；能截图不等于用户动作/通知成功；SetForegroundWindow不是只读，不能在活动用户桌面盲跑 | EXISTING_PROJECT_CODE_REUSE，需隔离验证 |
| Android真实安装/动作/导出 | SeminarArc已有run-blackbox-acceptance.ps1、Android UI/系统选择器、Room内容回读、视觉golden | 继续经合法模拟器/固定serial的真安装与场景脚本，负例纠正OCR工具误读，完成导出内容检查 | 不造新的手机远程控制器，不把Monkey次数/模拟器代理当真机录音与硬件权限 | EXISTING_PROJECT_CODE_REUSE |
| 科研模型身份和追踪 | CARE原checkpoints/训练配置/数据fold/Slurm作业与正式部署证明；MLflow Model Registry可提供模型版本、运行溯源、别名、标签 | **默认继续现有CARE产物和合法版本证明**。只有确定要管理大量实际模型跨环境部署、目标服务可用且带来真实收益，才单独评估是否引入MLflow登记和真实版本锁定 | MLflow注册模型不证明某loss被训练、某输入进入forward、医学指标正确；不为一次CPU探针/科研小试点启动新tracking server。当前无证据显示CARE已配置MLflow服务 | CARE项目既有先用；MLflow为REVIEWED_REFERENCE_ONLY，非默认依赖 |
| GitHub受保护发布及人类批准 | GitHub分支保护、规则集、受保护环境/必需Reviewer、expected status check App、必要产物来源证明 | 真正有权限和计划资格时由**原项目Release owner**配置并验证，要求必需job实际执行、与最终候选匹配、来源可信；部署凭据不进入不可信PR的编译工作 | GitHub文档明确：required status check可以是skipped/neutral；条件跳过job可能被视Success；某些私有仓库计划不支持环境required reviewer；管理员可能具绕过权，均需真实验证。保护环境不能担保UI审美或医学推断 | 有效规则集才采用为强制，未核权限只能审计建议 |
| 多步可恢复Lite任务执行 | GitHub Spec Kit现有workflow run/resume/step功能、Bridge自身Review/Control和原Codex SDK/CLI | **只有当前普通Lite任务确实缺多步可恢复执行**才对比其实际运行和维护成本；如Bridge Reviewed已拥有任务状态，不能再并行引入Spec Kit | 已读Spec Kit workflow engine的Shell以当前用户权限执行，不是安全沙箱，也不能替代表现审查；不将命令级工作流本身当验收 | SELECTIVE_REFERENCE，待真实Lite试点比较 |
| 科研长任务恢复经验 | VibeResearch已有daemon/codex_adapter/next_action/checkpoint经验 | 只在可证明其一段现有代码能直接填真正缺口时选择性移植；仓库科学/Slurm语义保持原Owner | 不把“论文实验周期队列”变软件开发的中央状态机或新用户任务数据库 | REFERENCE_ONLY |
| 产品视觉/科研图专业评审 | 现有Figma源、AI Skills 前端设计、Asteria图形与浏览器真实渲染、专业Reviewer | 第一个可操作原型与最终完整真实画面核对；机械像素/可读性指标和专业语义分开 | 没有万能美观分数；用户/专业审查漏检须校准资格；机械指标不能替专家 | 复用项目现有专业能力、必要独立定性 |
| 文档/PDF科研排版 | 已有Pandoc/XeLaTeX、原项目构建报告与可访问PDF渲染环境 | 原四卷不因版本身份修复而重新写科学结论；对最终受测PDF实际检查真实字形/公式/表格 | PDF有哈希不等于审过真实渲染；只能获得GitHub文字源的线程不得宣称检查过PDF | 复用成熟排版，不造卡片PDF |

## 2. 官方资料针对性核查与本轮采用状态

2026-10-14查阅：
- GitHub分支保护：https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches；说明分支可要求独立审查、限制绕过、指定特定App来源，**也允许部分skipped/neutral check被算作满足required**。
- GitHub跳过检查：https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks；按条件跳过的job可能Success，依赖上游失败被skip未必阻止合并，应用必须核对预定需要执行的检查集合及实际状态。
- GitHub部署审查：https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/review-deployments；required reviewer可禁止自己审批，但免费/Pro/Team在私有仓库的保护规则存在限制，需用户真实计划核实。不能把该功能当六库已安装。
- Playwright Trace Viewer：https://playwright.dev/docs/trace-viewer-intro；已有真实动作时间线、前后DOM快照、console/network/error，默认常见配置仅在重试时生成trace；正式验证需要预先核实trace采样范围、保存与私密内容。
- MLflow Model Registry：https://mlflow.org/docs/latest/model-registry/；拥有版本/别名/标签/来源关系，**没有自动证明医学真实数据/数学loss正确**，仅为CARE未来多版本部署管理候选。
- GitHub Spec Kit源码：https://github.com/github/spec-kit/blob/main/src/specify_cli/workflows/engine.py；工作流步骤持久状态与恢复可用，Shell命令以用户权限运行，不能作为强隔离。
- Bridge源码与真实产品项目脚本：见v0.7的02/03和本版04。

官方文档证明成熟工具可提供这些能力，不证明用户七仓库已连接、免费或具相同权限。拟议采用状态区分：EXISTING_PROJECT_CODE_REUSE、REFERENCE_ONLY、REVIEWED_REFERENCE_ONLY、SELECTIVE_RUNTIME_DEPENDENCY，只有正式正常执行、实际影响输出并通过用户质量检查才能升级ACTUALLY_CONSUMED。

## 3. 为什么不能把所有东西拉进“统一软件包”

需求最终是成熟复杂产物，往往一个新功能在原仓库增加一条真实回归，比安装新的大平台更直接。若现有CI、Playwright、Rust测试、Android黑盒、Slurm指标已经满足目标，就不引入新Runtime。**共享的只是“批准义务—真实观察—候选—证据范围”之间是否一致这一窄约定，不把每个领域的图形、公式、身份和训练都做成中央引擎。** 一旦某项目需要写自己业务动作的脚本，动作属于项目而非中央；如果多个平台确有重复的候选绑定逻辑，再以实际第二平台通过证明来抽取公共代码。

强制安全的核心是当前受保护分支/执行账户/真实资源权限，纯本地可写脚本做不了“任何候选绕不过”的绝对保证。也不允许以“复用成熟工具”之名，给私有项目引入未经许可的外部模型登记服务或上传个人素材。

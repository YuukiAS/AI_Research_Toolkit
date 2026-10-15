# Bridge：已有受控执行器，但并非任意原生会话接管器

RUNNER_ID: GPT6_PRO
READ_DATE: 2026-10-15
SOURCE_REPOSITORY: YuukiAS/GPT_Codex_AI_Bridge_Kit
SOURCE_MAIN: a7931fdfc6e3d71cf985351df075de17097795e6
SOURCE_RELEASE: 9db19b0409816c22042a246b35a33e1d34fedd0a

## 已读证据及定位

通过GitHub读取branches、release递归树、README开头及三层/版本/机器策略部分、AGENTS.md 1–120行、ai_bridge_kit/reviewed_runner.py的状态/锁/进程身份/同步部分及codex_command、run_codex_event、watcher_once、失败与权限处理段（约780–1079行），以及.github/workflows/tests.yml全文。搜索定位另见main tests/test_reviewed_runner.py，只有检索片段，未当作已运行测试。没有读取Toolkit历史架构。

README不是当前机器安装证明：它仍同时写source candidate 0.10.0与formal 0.9.3，列出的旧生产候选OID也不同于本次真实release ref。实际分发版本必须由ref、代码和host身份诊断共同确定，不能只信说明文字。

## 六个维度

目标与入口：机器级Host管理CODEX_HOME配置/规则；项目默认Lite交接，Review/Control/Persistent Run/通知均按需选用；任务是实例，不是再次安装整套系统。AGENTS要求安装前盘点automation/reviewed_handoff与automation/agent_flow，不准假定不存在或全量安装。

有效规则：Bridge拥有runtime/Host/Lite/Review/Control/Persistent Run实现；AI Skills Maintainer拥有正式分发闭环。不得复制第二套release engine或watcher。不同CODEX_HOME属于不同身份；安装非破坏式备份，不得以danger-full-access或never审批消除摩擦。普通workspace build/test先sandbox；部署、敏感传输、付费、资源分配仍须原授权。

真实执行：reviewed_runner中ELIGIBLE_EXECUTOR_STATES={PLAN_FROZEN,REVISE}；codex_command实际为codex exec -C <target> -。run_codex_event用subprocess.run启动新CLI进程，记录runtime_type=codex_exec、thread_id=None。因而“能启动自己拥有的Review执行”有源码支持；“能继续Windows Codex App中任意已结束原线程”没有该代码证据，不能把新任务重放冒充原线程resume。

恢复与副作用：机器本地watcher.json采用临时文件、fsync、原子替换；按仓库/分支记录pid、心跳和加载的Bridge提交。进程识别使用/proc和命令行核对，PID活着但身份不符返回冲突。运行前拒绝dirty worktree、仅快进同步、不擅自换分支；事件有稳定identity及有界尝试。执行后验证流程推进、权限字段、clean worktree与发布是否成功，非零退出/停滞不能仅凭日志宣称完成。越改Planner/Reviewer字段、未合法推进却有新提交、留下dirty工作均进入人工恢复而不是无限重跑或reset。

验收入口：GitHub CI在Ubuntu上运行Python 3.9与3.x unittest；docs/results/Markdown-only变更被paths-ignore排除。本轮未运行测试，也未证明Windows进程所有权、重启续接与当前已部署版本。现有runner以任务协议合法推进为判据，不等于领域产物正确。

已知失败与防护依据：源代码明确处理push失败、dirty worktree、身份冲突、旧进程需重启、executor权限越界与无进展重试耗尽。AGENTS还记录readonly诊断误拒绝及bounded正常入口失效后禁止升级raw操作。这些是已实现防护/仓库维护事实，不代表本次观察到这些故障正在发生。

## 对候选的约束

应优先复用身份、授权、事件、恢复和有界执行，不能再建第二个拥有同一工作树写权的控制面。专业验收仍须项目真实入口和独立证据。适配既有Review的代价与“支持用户随手开一个App线程”的代价不同；后者是决定性待验证接口。以/proc确认进程的现有实现不得直接宣称原生Windows可靠性。系统若只新增规则而没有观察者/控制权，不能承诺假完成自动返修。

下一仓库：Remote_Compute_Infrastructure。没有启动Codex、tmux、Slurm或任何外部执行。

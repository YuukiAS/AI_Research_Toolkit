# Remote Compute：调度成功、服务可用与持续性必须分别证明

RUNNER_ID: GPT6_PRO
READ_DATE: 2026-10-15
SOURCE_REPOSITORY: YuukiAS/Remote_Compute_Infrastructure
SOURCE_REF: main
SOURCE_COMMIT: ca0bad392ce1295e76a07a5d8f9c9dd27d3f61d7

## 实际读取

GitHub branches与递归树；AGENTS.md 1–150行、README.md 1–200行；以下全文：docs/incidents/2026-10-13-longleaf-lifecycle-continuity.md（blob e1f83f10b42d78ba0e36ffa525a25b9869a684c8）、scripts/longleaf_lifecycle_controller.sh（37025ae5f95ce734e94746086e921c0c96c68cfa）、shared/contracts/HEALTH_STATES.md（b245787a6cbaa0fc9d1e91b45a5376e596c299b8）、scripts/tests/test_reconcile_longleaf_access.sh（8faf6b6869e6304e103b707d5dfe1749e245ae6c）。树中的其他路径只是定位信息，未当作全文读过。未运行任何命令/作业/机器探针。

## 项目入口与有效归属

本仓库是Longleaf和Workstation远程访问、恢复与健康提供者；Clash_Profile单独拥有代理路由，Lucerna单独拥有桌面UI和通知。longleaf-bridge暴露status、diagnose、actions、run-action。后者是有边界的动作，不是任意远程shell。源码变更、候选验收、另行授权部署、生产运行是不同阶段。原UNC-Watchdog的迁移规则禁止同类自动恢复同时由两个系统拥有。

AGENTS把WORKSTATION、LONGLEAF、SHARED_GOVERNANCE及目标机器/允许路径/禁止路径分开；共享治理不得偷渡生产修改。一台机器的驱动、SSH或状态不能证明另一台相同仓库机器的情况。Runtime v2须保留CODEX_HOME、SQLite、socket和既有访问面；apps=false、daemon_auto_start=false分别约束网络开销和重复生命周期，remote_plugin不得无因改动。统一生产体系若重建这些所有权，会制造新的故障面。

## 运行控制的源码证据

longleaf_lifecycle_controller.sh要求在Slurm之外运行，核对精确源码提交，取得非阻塞单实例锁，使用专用SSH配置和受限目标执行一次reconcile。审计默认不变更；ensure必须另带confirm-submit-missing。输出后原子保存检查时间、退出码、模式、提交、目标；SSH失败保持失败。此处能证明受控一次性调用与部署身份检查的实现，不能证明外部timer已部署或任一真实机器现在可用。

共享健康合同明确RUNNING不等于健康、未知不等于故障、监听端口不等于端到端可用、超时不直接定组件故障、文件存在不等于新鲜证据、单视点成功不等于所有视点成功。应记录视点、时间、新鲜度、权威来源、故障域与变更许可。状态映射需要这些区别，不应该压成一个绿色布尔值。

## 历史实证与剩余边界

10月13日事故记录提供当时实时取证，而非本轮实测：Cloudflare A的接班排队7小时48分超过6小时提前量；Tailscale提交接班后1秒结束旧实例，之后排队近5小时；Bridge B固定等锁12小时耗尽后没有补充者；A端口保留临时22084；编辑器新旧实例同时拥有同一身份，旧实例自然退出后重连告警停止。这些支持排队不确定性、先断后建、双所有者、部署漂移和缺少存活控制者分别导致失败。

该记录还直接推翻了旧完成声明的现状含义：历史Windows观察器路径与任务已不存在；当前观察器只覆盖两个Workstation目标，不覆盖Longleaf七路。来源明确把新修复的源码测试、受限身份部署、真实端到端、首个自然生命周期分别作为门槛。不能因为报告写过完成，或接班已RUNNING，就宣布生产持续性完成。尾部候选渲染哈希只是未提交的准备证据。

## 测试读取及效力

test_reconcile_longleaf_access.sh使用fake sbatch、fake SSH和队列fixture，覆盖只读不提交、五类缺失组件各一次有界补充、成功与失败提交均限流、接班已PENDING不重复提交、过期交接清理、控制器传递提交身份/授权参数。测试正文是可审计验收入口，既不是本次执行结果，也不能证明真实调度器按时分配、外部SSH可用或首轮自然切换正确。

## 对候选的约束

统一层最多消费提供者已有状态/许可/证据，不能另起Slurm调度和网络恢复控制器。必须把“任务已提交”“资源已分配”“产物已形成”“端到端可用”“自然生命周期已验证”分层。不可控外部等待需要保留可恢复状态和到期风险，不能用无限重试或更多声明消除。任何承诺自主持续推进的方案，必须指出独立存活、具有最小权限的实际执行者是谁，以及其失效时谁能恢复；纯规则没有这一能力。

下一仓库：Lucerna。本仓库读取已完成并落盘；后续结论若依赖更多特定源码，另开补充批次并及时checkpoint。

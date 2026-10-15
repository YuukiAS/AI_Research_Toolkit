# 官方来源核查一：Codex 的实际控制入口

RUNNER_ID: GPT6_PRO
READ_DATE: 2026-10-15
RECOVERY_FROM: checkpoints/10_CARE.md @ 78eda260bc2dd04cf3e9cd3c3a58fe432f4d796e
HISTORY_READ: NO

本轮从匹配身份的 RUN_STATE / SOURCE_LOG 恢复，复用 WRITE_PREFLIGHT=PASS；已读回 10_CARE，blob 54e0a31860ca32e7a0bb48f4130a1fe5129b418a。没有重读任何已完成项目仓库。运行合同采用当前 START_HERE，blob f06d84ed06669fb3a84593a64ba680e4c740a9f7。

## 已核实的一手事实

**O01，Hooks。** 官方发布行为文档已明确存在同步 Stop 续接：返回 decision:block 及 reason，会生成同线程的后续用户提示；stop_hook_active 可识别已经续接的轮次。非托管 hook 必须按定义散列审核信任，安装不等于生效；多个来源会合并，同事件命令可并发。异步 hook 不能阻止原操作、会话结束会取消未完工作；Interrupt 不能阻止用户中断或重启轮次。PreToolUse 的错误/超时不保证阻止工具，部分工具不覆盖。因此不能把 hook 当完整安全边界，更不能把旧版本的“只有通知”当今日事实。文档还区分本地编排和云编排：本地脚本 hook 不自动成为云侧能力。[O01]

**O02，App Server。** 官方列出 thread/start、thread/resume、turn/start、turn/steer、turn/interrupt、事件和审批；steer 要求 expectedTurnId 匹配。有非实验方法集合不代表整体集成已获生产稳定承诺：同页明确 app-server 命令及 WebSocket 为实验性、不支持生产工作负载。文档还描述 Unix socket，但它不证明用户 Windows App 暴露可接管的端点。非本地连接必须认证和加密；不能部署默认无认证远端监听。协议应与实际二进制生成的 schema 绑定。[O02]

**O03，SDK。** 官方支持 TypeScript 线程创建/续接；Python SDK 的公开稳定版本控制本地 app-server，包含固定运行时依赖。SDK稳定、底层命令/传输实验与目标 App 的兼容性是三个独立层次。官方现已说明 codex mcp-server 及独立二进制已移除，不能再作为新方案默认接口。SDK可以创建自有执行入口，但其存在不等于可以无授权附着任意既有桌面线程。[O03]

**O04，非交互执行。** 官方文档支持 codex exec resume <SESSION_ID>，可输出结构化事件；这支持 CARE 已有精确线程机制的可行性，但不承诺跨机器、跨 CODEX_HOME 或跨桌面版本共享会话。指定线程而非 --last 是本研究的隔离设计选择。CLI退出/turn结束也不等于交付验收通过。[O04]

**O05，原生长任务。** 官方当前文档已提供桌面、CLI、IDE 的 /goal，同一会话可暂停、续接和修改目标；目标模式不扩大权限。它必须进入“完全不建新通用系统”的实质对照组，不能因历史方案缺此功能而忽略。本文未确认用户实际安装版本、账号权限或运行行为。[O05]

**O06，原生定时任务。** 官方区分独立新会话、已有会话续接和连接器事件触发；涉及本地项目需机器开机、App运行。文档没有证明它具备集群账务、专业验收、精确一次副作用或用户当前版本支持。这里只比较成熟替代，本轮不创建任何定时任务。[O06]

## 由事实推导的候选约束

应先比较“原生目标模式 + 已信任同步停止检查 + 现有领域收尾工具”与新常驻调度器，不能先假定必须开发另一客户端。同步停止检查适合短判据和明确返修，长训练、断网等待、应用关闭后的恢复必须交给唯一已有持久责任者或授权的明确入口，不能阻塞 Stop 数小时。安全否决由受保护验收、文件/进程权限和外部授权共同落实，不能靠被执行者可修改的项目脚本。

“普通 Windows App 原线程可无缝闭环”仍是决定性未验证事实。未来应只在获授权的隔离任务中验证 hook实际加载、精确线程/工作树、人工中断优先、故障时禁止放行及一次续接；失败则该平台只能提供交付门，或要求用户明确选择受管入口。不得声称官方没有接口，也不得声称用户环境已经跑通。

## 可独立定位的官方参考文献

访问日期均为 2026-10-15。旧 developers.openai.com/codex 路径实际重定向至 OpenAI 的 learn.chatgpt.com；只采用官方页面，不采用搜索结果中的镜像或论坛推断。

[O01] OpenAI. Hooks. https://learn.chatgpt.com/docs/hooks 。核查位置：Where Codex looks for hooks；Review and trust hooks；Managed hooks；Tool coverage；Running hooks in background；Stop；Interrupt；Schemas（区分 main schema 与已发布行为）。

[O02] OpenAI. Codex App Server. https://learn.chatgpt.com/docs/app-server 。核查位置：Connect remote Code Mode host；Protocol；Experimental API opt-in；Lifecycle；Steer an active turn；Interrupt。

[O03] OpenAI. Codex SDK. https://learn.chatgpt.com/docs/codex-sdk 。核查位置：总述、TypeScript library、Python library、Sandbox presets。

[O04] OpenAI. Non-interactive mode. https://learn.chatgpt.com/docs/non-interactive-mode 。核查位置：结构化事件、Resume a non-interactive session、CI集成。

[O05] OpenAI. Long-running work. https://learn.chatgpt.com/docs/long-running-work 。核查位置：Start a goal；Steer a running goal；权限与并行工作树。

[O06] OpenAI. Scheduled tasks. https://learn.chatgpt.com/docs/automations?surface=app 。核查位置：本地条件、连接器事件、独立任务与已有会话任务。

[O07] OpenAI. Feature Maturity. https://learn.chatgpt.com/docs/feature-maturity 。仅用于解释实验、测试、稳定、弃用标签，不能替代具体功能的版本核查。

NEXT_ACTION: GitHub受保护交付与可信验收来源核查；完成后立即落盘，再读Slurm及专业工具主题簇。
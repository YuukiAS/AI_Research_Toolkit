# 来源清单、已亲读范围与尚不具备的证据

本文件用于防止以后 GPT Pro 只看摘要、凭旧记忆编造平台能力或要求用户重复上传 ZIP。日期：2026-10-15。所有 URL 均为可独立定位的 GitHub 或官方链接；分支与提交一旦变化须对照当前版本，不可将仓库源码存在宣称某台机器已安装或已通过。

## A. 历史体系与本次新归档

- 宿主研究仓库：https://github.com/YuukiAS/AI_Research_Toolkit/tree/research/software-production-decision-20261013/docs/research/software-production
- v0.6 四卷与完整21问：09_FULL_DOSSIER_V0_6/，审查冻结对象 dcc8b073c84174ede5c277776fdc31c01a9b943e。
- v0.7 根本改向：10_POST_CRITIC_REDESIGN_V0_7/。
- v0.8 三位Critic后修订：11_THREE_CRITIC_RECONCILIATION_V0_8/，冻结提案 e0b98d327231407054074f3450e364b730b7cbe3；提示词后续提交 ba04b055912bb1ec63b43041e8ccc1db8e83ad16；该版未PASS、未实现。
- 三位 Critic 本轮用户上传原文：原 ZIP 内六份 Markdown 已完整转存于本目录 `original_reviews/`，且逐份对照工具读取内容与 GitHub 文件一致。三位判决分别为 GPT-5.5 REVISE、GPT-5.6 REJECT、GPT-6 REVISE（其余 GPT-6 文件属于同一次审查，不能计作其他 Critic）。换行字节可能已标准化。
- 三位原始审查 Markdown 全文目录：https://github.com/YuukiAS/AI_Research_Toolkit/tree/research/software-production-decision-20261013/docs/research/software-production/12_COMPLEX_DELIVERY_REQUIREMENTS_INTAKE_20261015/original_reviews
- GPT-5.5 旧归档：https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/11_THREE_CRITIC_RECONCILIATION_V0_8/reviews/GPT55_R1_ORIGINAL_USER_UPLOAD.md
- 早先生成的 GPT Pro R1 提示词已作为**未批准历史草稿**存储在本目录 `08_PRIOR_PRO_RESEARCH_PROMPT_R1_NOT_APPROVED.md`，不能直接发送。
- v0.8原始363行完整表：https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/11_THREE_CRITIC_RECONCILIATION_V0_8/08_FULL_CASE_COVERAGE_MATRIX.csv
- 新档案05只做逐项来源索引与不可信映射隔离；所有保护状态仍未由正常入口验证。

## B. 规则与执行基础设施

- https://github.com/YuukiAS/AI_Skills_Collection/blob/main/docs/workflows/PLANNER_ROLE_CONTRACT.md
- https://github.com/YuukiAS/AI_Skills_Collection/blob/main/docs/workflows/CRITIC_ROLE_CONTRACT.md
- https://github.com/YuukiAS/AI_Skills_Collection/blob/main/docs/workflows/PLUGIN_CAPABILITY_GATE_POLICY.md
- https://github.com/YuukiAS/AI_Skills_Collection/blob/main/docs/workflows/AI_SKILLS_MAINTENANCE_BOARD.md
- https://github.com/YuukiAS/AI_Skills_Collection/blob/main/AGENTS.md
- https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/main/AGENTS.md
- https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/main/ai_bridge_kit/reviewed_runner.py （executor_prompt, run_codex_event, watcher_once）
- https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/main/ai_bridge_kit/reviewed_handoff.py （record_review 的合法状态）
- https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/main/ai_bridge_kit/agent_flow.py （已有 Controller/Verifier/Executor 角色与发现分流）
- https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/main/docs/CARE_AGENT_FLOW_V3_POSTMORTEM_20260811.md
- https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/main/docs/V0_5_REVIEWED_HANDOFF_IMPLEMENTATION_SPEC.md
- https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/main/docs/V0_4_AGENT_FLOW_IMPLEMENTATION_SPEC.md
- https://github.com/YuukiAS/GPT_Codex_AI_Bridge_Kit/blob/main/docs/design/0.8.0_persistent_run.md

本轮直接查过该来源的源码/规则及 relevant 函数；未在 Windows 真实安装版或 Longleaf 目标主机上验证当前运行环境，不得声称已接通。

## C. 领域项目与 Longleaf

- https://github.com/YuukiAS/CARE_Challenge/blob/main/AGENTS.md
- https://github.com/YuukiAS/CARE_Challenge/blob/main/.agents/skills/slurm-routing-partition/SKILL.md
- https://github.com/YuukiAS/CARE_Challenge/blob/main/prompts/CONTROLLER_TASK_PROTOCOL.md
- https://github.com/YuukiAS/CARE_Challenge/blob/main/wiki/EXECUTION.md
- https://github.com/YuukiAS/CARE_Challenge/blob/main/scripts/ops/submit_care_dependency_finalizer.py
- https://github.com/YuukiAS/CARE_Challenge/blob/main/scripts/ops/submit_care_mm_batch9_chain.py
- https://github.com/YuukiAS/Remote_Compute_Infrastructure/blob/main/codex/AGENTS.longleaf.md
- https://github.com/YuukiAS/Remote_Compute_Infrastructure/blob/main/codex/shell/sq
- 七项目历史代码/情况有 v0.6 和 04_SIX_REPO_AUDIT、v0.8 04_SEVEN_REPOSITORY_ADOPTION_MATRIX.md 的源定位；**不代表此轮已经重新克隆/运行了全部七库每一个当前开发分支或全部363条事故**。

## D. 官方可复核能力来源（需要按实际日期重新核对）

- OpenAI Codex 插件及钩子：https://developers.openai.com/plugins/build/plugins
- OpenAI Hooks：https://developers.openai.com/docs/hooks
- OpenAI Codex 作为平台及稳定集成层：https://developers.openai.com/blog/codex-as-a-platform
- OpenAI Codex Goals：https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex
- OpenAI 迭代修复范例：https://developers.openai.com/cookbook/examples/codex/build_iterative_repair_loops_with_codex
- OpenAI Codex App Server/OAuth 与线程恢复：https://developers.openai.com/siwc/token-sharing-open-source/codex-app-server
- GitHub 必需检查、分支保护：https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
- Playwright Trace：https://playwright.dev/docs/trace-viewer-intro
- Slurm 标准文档及本站配置：https://slurm.schedmd.com/squeue.html 、https://slurm.schedmd.com/sacct.html 、https://slurm.schedmd.com/sbatch.html 、https://slurm.schedmd.com/job_state_codes.html

官方资料只证明产品提供相应接口，不证明用户目标环境装了、可用、受保护或实际已获得执行授权。

## E. 当前绝不能宣称已取得的来源

1. 标题“统一软件开发流程”旧 ChatGPT 线程**完整逐字导出**。本轮已检索到有关历史要求摘要，并直接读到了研究仓库第三卷21问，但无法把第三卷冒充用户旧线程完整原话。当前01文档明确这一边界。
2. GPT-5.5、GPT-5.6、GPT-6 原始完整审查已在 GitHub 归档；未能取得完整逐字原文的是旧 ChatGPT 线程“统一软件开发流程”，目前只有21问研究整理和可检索的部分用户要求。不能声称旧线程全量逐字导出已闭合。
3. 全部363行的真正当前分支源码逐条重放、由领域审查者重新校准的根因分类。现05保留历史来源而不信旧错误映射。
4. 当前 Windows Codex App 版本、Hooks/SDK/App Server 真实运行证明、与原生会话交接防双执行验证。
5. 当前 Longleaf 作业权限、分区资源、用户 CODEX_HOME、自动机受权身份、是否能监测全部账户作业的实机证明。
6. 真正隔离的 Windows/Zotero/浏览器/Android/医学数据观察环境与受保护 GitHub 检查计划/权限。
7. 对不同架构路线的真实质量、成本、用户参与和资源消耗的成对对比数据。

这些不全意味着不能假装技术方案已经可以冻结，不意味着用户应现在人工补齐。后续研究者应优先利用已连接 GitHub 与可只读取证的当前来源；需要真实机器权限的试验必须先提供具体最小授权请求。
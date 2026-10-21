# 给 GPT Work 的唯一启动指令

你现在承担一次独立、完整的 Delivery Assurance 总体架构研究，不是修订几条旧规则。研究必须从真实用户任务入口开始，覆盖七仓、验收器完整生命周期、旧功能保护、非降级实现、同任务返修、真实成品、持续维护和成本，最后交出能够被独立 Critic 从源码核对的整体架构与逐阶段落地合同。

**第一项工具操作必须检查 GitHub 的实际写入权限并尝试写入、回读**，在验证之前不得开展大规模研究或只产出本地文件。

GitHub 研究仓库：YuukiAS/AI_Research_Toolkit
既有分支：research/software-production-decision-20261013
实际写入探针：在该分支新建并回读
docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/00_GITHUB_WRITE_PROBE.md

若无法完成真实写入和回读，立即停止并报告精准的权限或工具阻塞，不得换分支、换仓库、写到 main 或以本地成果替代。成功后通过 GitHub 完整读取并严格执行以下已保存的正式研究指令：

docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/01_GPT_WORK_FULL_ARCHITECTURE_PROMPT.md

还必须读取同目录的 00_USER_REQUIREMENTS_AND_GAPS.md，以及
docs/research/software-production/21_DELIVERY_ASSURANCE_COMPONENT_AND_QUESTION_INVENTORY_20261022.md。

从整体架构着手，不预设 Delivery Assurance v0.5 正确；先依据真实代码提出并比较可行架构，解释每个必要组件的真实触发、输入输出、接收方、失败与恢复，再在 Lucerna、Bobbio、Mica、SeminarArc、Asteria、CUHK_Date、CARE 七仓具体推演与核对。36 项职责、315 个问题和历史 83/363 登记是覆盖审查输入，不是应新增同样多模块的指令。

**研究全程逐阶段直接写入并回读 GitHub 的 WORK_OUTPUT，更新 CURRENT.md，禁止最终才一次性上传或只在本地保存。** 所有其它仓库只读，不修改生产源、不运行未授权设备、账号、GPU、付费、部署和发布。不允许自称独立 Critic PASS 或输出未获批准的 Codex 执行 Goal。

最终先用自然中文解释推荐架构为什么能改变用户实际使用结果、哪些平台仍未证明，再给已写入 GitHub 的真实文件和提交链接，以及可直接送独立 Critic 的完整审查包。无法完成的核心设计环节如实保留为阻塞，不能用“以后实现时补”结束。
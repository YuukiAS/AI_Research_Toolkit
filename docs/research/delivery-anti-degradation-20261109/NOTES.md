# 研究记录

## 实际读取的内部材料

### 本轮直接输入

- `AI_Research_Toolkit@research/delivery-anti-degradation-20261109`
  - `docs/research/delivery-anti-degradation-20261109/INPUT_ASSURANCE_PROCESS_DRAFT.md`
  - 同目录现有 `PROMPT_GPT_PRO.md`，仅用于确认本轮工作位置和交付约束；研究结论仍以用户当前任务为准。

### 当前总体设计输入

- `AI_Research_Toolkit@main`
  - `AI_RELIABILITY_SYSTEM_REFERENCE.md`
  - `COMPLEX_SYSTEM_DESIGN_GUIDE.md`
  - `docs/research/design-assurance/GRILL_AND_ASTERIA_BLUEPRINT_INPUT_20261102.md`

### 旧 Delivery Assurance 研究

- `AI_Research_Toolkit@research/software-production-decision-20261013`
  - `docs/research/software-production/16_THREE_RUN_SYNTHESIS_AND_DELIVERY_ASSURANCE_20261015/DELIVERY_ASSURANCE_HISTORICAL_FAILURE_TO_VALIDATOR_MAP_V0_1_20261019.md`
  - `.../DELIVERY_ASSURANCE_CRITIC_REVIEW_R5_20261019.md`
  - `.../DELIVERY_ASSURANCE_RESPONSIBILITY_AND_VALIDATION_GUIDE_20261019.md`
  - `docs/research/software-production/17_DELIVERY_ASSURANCE_ARCHITECTURE_CLOSURE_GPT_WORK_R0/01_ARCHITECTURE_COMPLETENESS_AUDIT.md`
  - `.../05_MANUAL_VS_ARCHITECTURE_COMPARISON.md`
  - `.../06_FINAL_ARCHITECTURE_CONTRACT.md`
  - `.../VALIDATION.md`
  - 同时查看了上述两个研究目录的实际文件清单，用于定位预期材料。

### AI_Skills_Collection 的 PASS 完整性回归

- `AI_Skills_Collection@main`
  - `docs/workflows/CHATGPT_WEB_PASS_INTEGRITY_PROPOSAL_V0_3_2026-10-19.md`
  - `docs/workflows/CHATGPT_WEB_PASS_INTEGRITY_EXECUTION_PLAN_V0_3_2026-10-19.md`
  - `docs/workflows/CHATGPT_WEB_PASS_INTEGRITY_KICKOFF_DRAFT_V0_3_2026-10-19.md`
  - `docs/workflows/CHATGPT_WEB_PASS_INTEGRITY_EXECUTION_READY_CRITIC_PROMPT_V0_3_2026-10-19.md`
  - `results/chatgpt-web--pass-integrity/FINAL_CLOSURE_2026-10-20.md`
  - `results/chatgpt-web--pass-integrity/DELIVERY_ASSURANCE_FRESH_CRITIC_REGRESSION_2026-10-20.md`
  - `results/chatgpt-web--pass-integrity/STAT5060_VALIDATOR_FRESH_CRITIC_REGRESSION_2026-10-20.md`

## 路径与材料变化

- 目标仓库根目录没有发现 `AGENTS.md`；未应用不存在的根规则。
- `docs/research/design-assurance/` 当前实际只发现 `GRILL_AND_ASTERIA_BLUEPRINT_INPUT_20261102.md`。
- 用户指定的旧 Delivery Assurance 两个研究目录均存在；个别所需观点分散在最终合同、审计、责任说明和历史映射中，而不是单一文件。
- `results/chatgpt-web--pass-integrity/` 当前实际包含三份最终回归记录，均已读取。
- 目标研究目录原本除输入草案外还存在 `PROMPT_GPT_PRO.md`；本轮没有修改它。

## 尚无充分证据的问题

- 本环境没有本地终端；本轮没有运行本地脚本、Codex 宿主探针、真实安装、部署、浏览器扩展、模型训练或付费评测。
- 没有实测独立 Codex 会话、独立工作树或 GPT 会话对仓库文件的具体读取隔离；因此报告不把它们当作安全边界。
- 没有测量本项目使用变异测试、受保护用例或独立模型判断的实际成本；报告中的成本等级来自文献、官方能力与工程推断，不是本项目计时结果。
- 模型厂商的过程监控报告证明问题在真实代理中存在，但不能直接给出本项目中的漏检率或发生率。

## 草案前提与真实宿主能力的冲突

- 目标仓库是公开仓库；只要实现者或工具具有仓库读取权限，放在同一仓库或可读工作树中的所谓隐藏用例就不是真正隐藏。
- 独立模型会话隔离上下文，不自动隔离仓库、工具和文件权限；独立工作树隔离修改位置，不自动阻止读取其他工作树或远端内容。
- 文件哈希只能绑定身份和提示篡改，不能决定谁有权修改验收语义，也不能证明语义或产品结果正确。
- GitHub 的 CODEOWNERS、受保护分支、规则集、环境审批和私有仓库能够形成真实约束，但本轮没有证据证明目标仓库已经为验收资产启用了这些规则。
- 因此，第一版不应强制独立验收器实现者、通用隐藏测试或独立模型裁判；只有建立真实权限边界或确有专业判断增益时再启用。

## 写入说明

- 开始时已按要求创建并成功提交 `WRITE_PROBE.md`，证明目标分支可写。
- 最终交付前删除该探针；正式研究交付仅为 `REPORT.md`、`SOURCES.md` 和 `NOTES.md`。
- 本轮未修改 `main`、其他分支或正式 Plugin / Skill，也未 merge 或创建 PR。

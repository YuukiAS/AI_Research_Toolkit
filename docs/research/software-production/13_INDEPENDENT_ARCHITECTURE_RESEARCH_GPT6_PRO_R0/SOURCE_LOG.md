# 研究来源与恢复日志

RUNNER_ID: GPT6_PRO
OUTPUT_ROOT: docs/research/software-production/13_INDEPENDENT_ARCHITECTURE_RESEARCH_GPT6_PRO_R0
INPUT_SNAPSHOT_COMMIT: 60d0a1feb7ca1efc8f751774850a4ec176b9ab6f
INPUT_BRANCH: research/software-production-decision-20261013

## 启动写入预检与恢复

WRITE_PREFLIGHT=PASS
- STARTUP_WRITE_PROBE.md实际写入提交91b1dc946e89b5670c83192ab5d597d29df564c4；原读回blob cec34037bd2cf0dcab81f468db188dcad04be545。身份、输出路径、快照、状态、nonce完整一致；发生于研究之前。
- 当前运行合同START_HERE.md blob 34fde56b79b7aca53af64370074cf55be23928d2。
- 2026-10-15续接再次读回相同probe和输入checkpoint，未从头重读输入。RUN_STATE实际更新提交9c9cabf64b9c058f738cd9a0a0755b696984b904，并重新通过GitHub读回一致，证明恢复仍有写入能力。
- 当前消息要求再做真实写入：只更新原探针、不重复创建文件，提交04905a02db82c02e5e6d990b4fbc0e03b5e6c7c8；重新通过GitHub读回blob ae6a2252caf3333c3cfd25c9ed9d15358670e35b，所有身份字段、原nonce和RESUME_WRITE_NONCE=GPT6_PRO-20261015-resume-from-input-checkpoint-v2一致。WRITE_PREFLIGHT=PASS。SOURCE_LOG首次写入遇409后已重新读取当前文件、保留新增R01记录再合并，不覆盖其他进度，不读取其他研究者输出。

## 已完成来源

### INPUT — 四份冻结问题输入

按顺序完整读取冻结提交中PRO_INPUT/01、02、03、04；61问、363条登记及边界全部读完。CSV分段展开截断并补CARE C37。363=246+25+40+52，不是363个当前bug。事实文件checkpoints/00_INPUT_FACTS.md，首次提交da3a090a80ec5f829b9a8322555f8aa4a733877d；续接读回blob f0509ff2b26364f930762e2d39347f21f10577f4。

### R01 — AI_Skills_Collection

main 0d990b24fb7c7b46877347241800244f623b20c0；release 06d135d8a6ee62cd41abb40fc5771fcef7f8db25。实际读取分支/树、AGENTS相关段、README、release workflow SKILL全文、marketplace CI全文、workflow TODO前部真实事故。路径与事实详见checkpoints/01_AI_SKILLS.md，提交9e49c78cb994a039e23ac9df77f2c950ea6fb800。稳定入口跟release；技能提供规则/专业路由，没有获得任意App线程外部续执行权的证据；CI是安装/打包/回归入口而非专业质量的充分证明。

## 记录原则

只记实读来源；代码、历史运行记录、当前机器实测分开。每仓库立即事实checkpoint并更新日志和状态。候选冻结前不读Toolkit历史方案；任何时候不读其他研究者输出。checkpoint非审批点，立即继续。

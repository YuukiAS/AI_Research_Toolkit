# 研究来源与恢复日志

RUNNER_ID: GPT6_PRO
OUTPUT_ROOT: docs/research/software-production/13_INDEPENDENT_ARCHITECTURE_RESEARCH_GPT6_PRO_R0
INPUT_SNAPSHOT_COMMIT: 60d0a1feb7ca1efc8f751774850a4ec176b9ab6f
INPUT_BRANCH: research/software-production-decision-20261013

## 写入与恢复

WRITE_PREFLIGHT=PASS
原探针提交91b1dc946e89b5670c83192ab5d597d29df564c4、读回cec34037bd2cf0dcab81f468db188dcad04be545。本次更新同一STARTUP_WRITE_PROBE.md提交04905a02db82c02e5e6d990b4fbc0e03b5e6c7c8、GitHub读回ae6a2252caf3333c3cfd25c9ed9d15358670e35b；身份/路径/快照/RESUME_WRITE_NONCE=GPT6_PRO-20261015-resume-from-input-checkpoint-v2一致。未重复创建或重启。当前START_HERE blob 34fde56b79b7aca53af64370074cf55be23928d2。一次409后保留R01合并提交94ae508716a8f8d6df8cf3c0e937345922944bf9；恢复状态9c9cabf64b9c058f738cd9a0a0755b696984b904已读回。

## 已读来源索引

各checkpoint是本日志组成部分，包含实读文件/ref/commit/范围、目的、关键事实和未验证边界，非目录推断。恢复不重读已完成仓库。

| 批次 | 事实记录 | 首次提交 |
|---|---|---|
| INPUT：四冻结输入、61问、363历史登记非当前bug数 | checkpoints/00_INPUT_FACTS.md | da3a090a80ec5f829b9a8322555f8aa4a733877d |
| R01 AI_Skills_Collection：分发/加载/消费分开 | checkpoints/01_AI_SKILLS.md | 9e49c78cb994a039e23ac9df77f2c950ea6fb800 |
| R02 GPT_Codex_AI_Bridge_Kit：自有codex exec不是任意App线程续接 | checkpoints/02_BRIDGE.md | e5efa23d8292bafe47c5f3a53b754930d1132aa6 |
| R03 Remote_Compute_Infrastructure：外部控制者、调度/健康/自然周期不同 | checkpoints/03_REMOTE_COMPUTE.md | 888bb07a3e1b66650efe7fff97e3d1f3e32c2e6f |
| R04 Lucerna：测试能固化未经证实的业务语义 | checkpoints/04_LUCERNA.md | 023cf364b14d41da33cd345471573449fef38bbe |
| R05 CUHK_Date：事务租约、逐维证据、候选与生产区分 | checkpoints/05_CUHK_DATE.md | 4d9e0f4d5b5578cf2b16a889e7ddb200604766c6 |
| R06 Bobbio：develop有效、真实dataDir隔离、原生和人工知识判断 | checkpoints/06_BOBBIO.md | f37d9f362f3547a178bfdfe16da791f21956c746 |
| R07 Mica-for-ChatGPT：main/recovery分叉、网页观察非后端控制、账号边界 | checkpoints/07_MICA.md | 7d4fa716191c9f4e90966b094410ba9aa9696095 |

INPUT至R06均读回；R06 blob fae95fb1ae42fed44e76df2db340fc1548edcbce。R07 main 7059c0dc24b908b57bd0e1f475142ba4f4520621和recovery 0065a7ba841f72244e6bc1dbce0b5ec2ada12d35实际比较ahead11/behind27，不能猜已安装版本。实读两分支规则/README、recovery来源恢复及失败史、turn-delivery-guard主逻辑与test-product-core全文；45秒DOM启发式不是模型执行或自动重发权。R07写后立即读回再继续。

## 边界

只写本人输出，不读其他研究者产物；候选冻结前不读Toolkit历史。每仓库立即checkpoint、日志/状态更新并读回，非审批。历史报告/当前代码/当前实测分开；本轮没有Codex、实机、数据库、Slurm、生产、付费或高成本执行。

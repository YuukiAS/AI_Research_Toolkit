# 研究来源与恢复日志

RUNNER_ID: GPT6_PRO
OUTPUT_ROOT: docs/research/software-production/13_INDEPENDENT_ARCHITECTURE_RESEARCH_GPT6_PRO_R0
INPUT_SNAPSHOT_COMMIT: 60d0a1feb7ca1efc8f751774850a4ec176b9ab6f
INPUT_BRANCH: research/software-production-decision-20261013

## 写入与恢复

WRITE_PREFLIGHT=PASS
原探针写入91b1dc946e89b5670c83192ab5d597d29df564c4、读回cec34037bd2cf0dcab81f468db188dcad04be545。本次更新同一STARTUP_WRITE_PROBE.md的提交04905a02db82c02e5e6d990b4fbc0e03b5e6c7c8，GitHub读回blob ae6a2252caf3333c3cfd25c9ed9d15358670e35b，身份、路径、快照及RESUME_WRITE_NONCE=GPT6_PRO-20261015-resume-from-input-checkpoint-v2一致。未重复创建或重启。
当前START_HERE合同blob 34fde56b79b7aca53af64370074cf55be23928d2。一次409已重新读取保留R01合并（94ae508716a8f8d6df8cf3c0e937345922944bf9）；恢复RUN_STATE写入9c9cabf64b9c058f738cd9a0a0755b696984b904已读回。后续按稳定checkpoint继续。

## 已读来源索引

以下checkpoint是本日志的组成部分，逐份记录实际文件、ref/commit、读取范围、目的、关键事实与未验证边界；并非只读目录后推断内容。恢复按RUN_STATE走，不从头重读。

| 批次 | 事实记录 | 首次提交 | 已核对事实 |
|---|---|---|---|
| INPUT | checkpoints/00_INPUT_FACTS.md | da3a090a80ec5f829b9a8322555f8aa4a733877d | 冻结四输入完整读取，61问、363历史登记；不是当前bug数 |
| R01 AI_Skills_Collection | checkpoints/01_AI_SKILLS.md | 9e49c78cb994a039e23ac9df77f2c950ea6fb800 | main 0d990b24fb7c7b46877347241800244f623b20c0；release 06d135d8a6ee62cd41abb40fc5771fcef7f8db25；分发/加载/消费分开 |
| R02 GPT_Codex_AI_Bridge_Kit | checkpoints/02_BRIDGE.md | e5efa23d8292bafe47c5f3a53b754930d1132aa6 | release 9db19b0409816c22042a246b35a33e1d34fedd0a；codex exec、thread_id=None，不是普通App线程接管 |
| R03 Remote_Compute_Infrastructure | checkpoints/03_REMOTE_COMPUTE.md | 888bb07a3e1b66650efe7fff97e3d1f3e32c2e6f | main ca0bad392ce1295e76a07a5d8f9c9dd27d3f61d7；受限外部控制者、调度/健康/生命周期分开 |
| R04 Lucerna | checkpoints/04_LUCERNA.md | 023cf364b14d41da33cd345471573449fef38bbe | main 79dd2875d3da33c6a6d80e5e35bea812b84c1ceb；真实函数测试亦会固化未证实语义 |
| R05 CUHK_Date | checkpoints/05_CUHK_DATE.md | 4d9e0f4d5b5578cf2b16a889e7ddb200604766c6 | main 9f25c7754d3c80d0be74f5b71016320f55753ae6；active fix 7586b9bd97750efd2e0b8916d1b894ca19460d5f；租约/认证/状态/finalize有实现，逐维证据不可复制总PASS |
| R06 Bobbio | checkpoints/06_BOBBIO.md | f37d9f362f3547a178bfdfe16da791f21956c746 | develop a64edfd6c5b11f81599bfcfc327be5964633a7b5；独立profile不等于dataDir隔离，原生/产品/人工知识审核权属不可合并 |

INPUT至R05均已GitHub读回，R05 blob bd7ce32833e6be0b19557b42e97991de3dcc4ed8；R06写后立即读回再继续Mica。历史报告、当前代码、本轮实测严格分开。Bobbio实际Figma和原生像素本轮未读取/未测试；不宣称设计一致性已证。

## 边界

只写本OUTPUT_ROOT，不读其他研究者产物；候选冻结前不读Toolkit历史方案。每仓库立即checkpoint、日志和状态更新，非审批。未运行Codex、Windows实机、数据库、Slurm、生产、付费或高成本动作。

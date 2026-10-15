# 研究来源与恢复日志

RUNNER_ID: GPT6_PRO
OUTPUT_ROOT: docs/research/software-production/13_INDEPENDENT_ARCHITECTURE_RESEARCH_GPT6_PRO_R0
INPUT_SNAPSHOT_COMMIT: 60d0a1feb7ca1efc8f751774850a4ec176b9ab6f
INPUT_BRANCH: research/software-production-decision-20261013

## 写入与恢复

WRITE_PREFLIGHT=PASS
原探针提交91b1dc946e89b5670c83192ab5d597d29df564c4、读回cec34037bd2cf0dcab81f468db188dcad04be545。本次同一探针更新04905a02db82c02e5e6d990b4fbc0e03b5e6c7c8、GitHub读回ae6a2252caf3333c3cfd25c9ed9d15358670e35b，身份/路径/快照/RESUME_WRITE_NONCE=GPT6_PRO-20261015-resume-from-input-checkpoint-v2一致；未重建/重启。合同START_HERE blob 34fde56b79b7aca53af64370074cf55be23928d2。早期409保留R01合并94ae508716a8f8d6df8cf3c0e937345922944bf9；恢复状态9c9cabf64b9c058f738cd9a0a0755b696984b904已读回。

## 来源索引

各checkpoint均为本日志组成部分，含实际文件、ref/commit、读取范围、目的、关键事实与边界；恢复不从头重读。

| 批次 | 事实记录 | 首次提交 |
|---|---|---|
| INPUT：四冻结输入、61问、363历史登记 | checkpoints/00_INPUT_FACTS.md | da3a090a80ec5f829b9a8322555f8aa4a733877d |
| R01 AI_Skills_Collection | checkpoints/01_AI_SKILLS.md | 9e49c78cb994a039e23ac9df77f2c950ea6fb800 |
| R02 GPT_Codex_AI_Bridge_Kit | checkpoints/02_BRIDGE.md | e5efa23d8292bafe47c5f3a53b754930d1132aa6 |
| R03 Remote_Compute_Infrastructure | checkpoints/03_REMOTE_COMPUTE.md | 888bb07a3e1b66650efe7fff97e3d1f3e32c2e6f |
| R04 Lucerna | checkpoints/04_LUCERNA.md | 023cf364b14d41da33cd345471573449fef38bbe |
| R05 CUHK_Date | checkpoints/05_CUHK_DATE.md | 4d9e0f4d5b5578cf2b16a889e7ddb200604766c6 |
| R06 Bobbio | checkpoints/06_BOBBIO.md | f37d9f362f3547a178bfdfe16da791f21956c746 |
| R07 Mica-for-ChatGPT | checkpoints/07_MICA.md | 7d4fa716191c9f4e90966b094410ba9aa9696095 |
| R08 SeminarArc | checkpoints/08_SEMINARARC.md | 8df8b18a8ab0d5a84180ee42b0b15ccbe96e196f |
| R09 Asteria | checkpoints/09_ASTERIA.md | b7c9ae384bed31ff55a1fdf4ffbee658b2a0aa21 |
| R10 CARE_Challenge | checkpoints/10_CARE.md | 78eda260bc2dd04cf3e9cd3c3a58fe432f4d796e |
| O11A 官方Codex接口、hook、目标与原生任务 | checkpoints/11A_OFFICIAL_CODEX.md | f3c437c1478d8644185bbdafc0b785d1fbf78fb5 |
| O11B 官方GitHub交付门、权限与来源证明 | checkpoints/11B_OFFICIAL_GITHUB.md | 79dfe9b50bd35f9db44ad70762810ca11912b1da |

INPUT–R09均已读回，R09 blob21b32cec2a350d7812d095dcc1ddddc026e1d7ec。R10 main75a40e454de43b64e59a0b0b438ff57ef2bb8345、develop184cc16bc00dbb4edce80e2c848bdaabae4f782e，分叉665/4；显式develop v3实验与main普通工作边界区分。已读v3精确线程续接实际Popen/身份/锁/事件代码，不能误报仓库只有提示词；也不等于任意Windows App线程接管。Slurm确定性finalizer、历史会计夹具、8月科学诊断/单层Docker事故已读；未运行。本批次写后立即读回。

## 本次恢复后的追加

2026-10-15：从OFFICIAL_SOURCE_VERIFICATION恢复，未重读十仓库。当前合同blob f06d84ed06669fb3a84593a64ba680e4c740a9f7；R10读回blob54e0a31860ca32e7a0bb48f4130a1fe5129b418a。O11A已按提交f3c437c1478d8644185bbdafc0b785d1fbf78fb5读回，blob f4d789a8b268fc8bfdb948fdade691e35ebe9cfe。官方已存在同步Stop原线程续接、原生/goal、精确SDK/CLI续接；但hook信任/云本地差异、实验app-server及实际Windows可用性必须分别证明。codex mcp-server当前官方标记移除，不作为新候选。详细官方URL/定位见O11A。

O11B已按提交79dfe9b50bd35f9db44ad70762810ca11912b1da读回，blob1e7d0aeaf348b4e27f5af09811b3d2ac05d81118。核实跳过/中性检查可满足平台条件、检查来源/版本/目标提交绑定、合并队列事件、验收代码与凭据隔离、构建证明不等于质量。未查看十仓库的当前管理员保护配置，能力存在不等于用户已启用。具体官方URL/定位见O11B。

## 边界

只写本人输出；冻结候选前不读Toolkit历史，永不读其他研究者产物。每仓库立即checkpoint、日志/状态并读回，非审批。历史报告/当前代码/本轮实测分开。没有Codex、实机、数据库、Slurm、生产、付费或高成本执行。

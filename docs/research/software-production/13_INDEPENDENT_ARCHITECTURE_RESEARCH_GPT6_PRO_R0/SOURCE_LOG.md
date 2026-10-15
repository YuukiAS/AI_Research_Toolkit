# 研究来源与恢复日志

RUNNER_ID: GPT6_PRO
OUTPUT_ROOT: docs/research/software-production/13_INDEPENDENT_ARCHITECTURE_RESEARCH_GPT6_PRO_R0
INPUT_SNAPSHOT_COMMIT: 60d0a1feb7ca1efc8f751774850a4ec176b9ab6f
INPUT_BRANCH: research/software-production-decision-20261013
WRITE_PREFLIGHT: PASS

## 原始记录保全

本文件完整前版commit26acd2398702c17bb3f0c00d24a929813a671812包含启动/恢复证明、四冻结输入和十仓库不可变来源、官方O01–O34和11A–11D读回、01冻结、12A/12B历史读取。前版以及它引用的所有更早版本均为本日志组成部分，未删除事实。00–10来源不重读；本轮只复用自己的checkpoint。

01_INDEPENDENT_CANDIDATES_BEFORE_HISTORY.md @3a8e5df5360c20814bbbf34d7a4f392655437588，blob4ec5855bb69a9087f35cfa61a29a80350f2c8ef5；历史前冻结并全文读回，此后不得修改。

HISTORY_SNAPSHOT_COMMIT: 3a8e5df5360c20814bbbf34d7a4f392655437588

| 历史批次 | checkpoint写入commit | 读回blob |
|---|---|---|
| v0.6八核心 | 12A_HISTORY_V06_CORE.md @c9bb5ddfc6a858e07769b64aa77ecc59796cffd8 | 50f7a6f188917f9c208d26e22b251066df9b316b |
| v0.6附录/全部排版及图文本 | 12B_HISTORY_V06_APPENDICES.md @0eacf14b7a49bc6a39e80d95ce53647aa46d7e87 | 028e9f56d0bea3a5f31d7ca76c384811cf5b69d6 |
| v0.7全八文件 | 13_HISTORY_V07.md @031eccccd850d07c986d8dc0bf4ea2cae9f2ff2b | e698417b31bd3bcd2eeb07ae6e58786e544f02f2 |

表内路径均在checkpoints/。每份包含准确源blob、全文读取范围与对本人冻结候选的逐项反证。v0.7提出的无状态引用/唯一拥有者与本人A/B重合，这不是新发现，也非已实现证明；正式Review时序、传递工具权限、专业资格与通知结果未知要求更严格修订。v0.7第三份原审查当时为空不等本轮仍空，须继续original_reviews核实。

唯一材料呈现限制：PDF已枚举，但GitHub二进制UTF-8拒绝、raw未取得；正文/全部附录/四DOT和构建源已完整读，未渲染PDF，不借历史BUILD_REPORT假称视觉已验。此限制不阻止架构综合。

下一步v0.8和原审查全文，再02/03。仅自己OUTPUT_ROOT可写；不读其他研究者，未执行实机、Codex、Slurm、生产或付费高成本。checkpoint非阻塞。

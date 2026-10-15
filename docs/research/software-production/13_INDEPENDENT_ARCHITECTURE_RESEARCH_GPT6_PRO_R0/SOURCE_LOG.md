# 研究来源与恢复日志

RUNNER_ID: GPT6_PRO
OUTPUT_ROOT: docs/research/software-production/13_INDEPENDENT_ARCHITECTURE_RESEARCH_GPT6_PRO_R0
INPUT_SNAPSHOT_COMMIT: 60d0a1feb7ca1efc8f751774850a4ec176b9ab6f
INPUT_BRANCH: research/software-production-decision-20261013
WRITE_PREFLIGHT: PASS

## 原记录保全

本路径前版commit159f5b53fa47d530f6bac98f39aa266b19ded098及其引用的全部前版共同保留启动证明、四输入、十源仓库、官方11A–11D、冻结01和历史12A/12B/13。所有checkpoint均保留原文、提交、实际读取范围，不将恢复摘要算新审计。十源仓库禁止重读。

01_INDEPENDENT_CANDIDATES_BEFORE_HISTORY.md @3a8e5df5360c20814bbbf34d7a4f392655437588，读回blob4ec5855bb69a9087f35cfa61a29a80350f2c8ef5；历史前冻结，之后不修改。
HISTORY_SNAPSHOT_COMMIT: 3a8e5df5360c20814bbbf34d7a4f392655437588

| 历史批次 | checkpoint提交 | 读回blob |
|---|---|---|
| v0.6核心 | checkpoints/12A_HISTORY_V06_CORE.md @c9bb5ddfc6a858e07769b64aa77ecc59796cffd8 | 50f7a6f188917f9c208d26e22b251066df9b316b |
| v0.6全部附录/排版/图源 | checkpoints/12B_HISTORY_V06_APPENDICES.md @0eacf14b7a49bc6a39e80d95ce53647aa46d7e87 | 028e9f56d0bea3a5f31d7ca76c384811cf5b69d6 |
| v0.7全八文件 | checkpoints/13_HISTORY_V07.md @031eccccd850d07c986d8dc0bf4ea2cae9f2ff2b | e698417b31bd3bcd2eeb07ae6e58786e544f02f2 |
| v0.8全目录及363行/GPT55全文 | checkpoints/14_HISTORY_V08.md @8205c1f7c673dc0e8123870d2568f6ae6437ef3c | 608083a64f09de4787ef6ccc5f324aea446daf6a |

14准确列出全部14文本blob。新增静态反证：required_runs参数未消费，单声明证据不能证明必需场景覆盖；CSV存在医学模型控制被配密码/网页、原生桌面污染被配科学公式等错配。字段齐全不等因果归类正确；没有运行旧提案或修改原表，不断言生成器根因。GPT55全文REVISE已读，其他两位仍须读原始目录而非09摘要。

唯一呈现限制：旧PDF二进制GitHub UTF-8拒绝、raw未取得；全部架构/附录/图源文本已读，不宣称PDF渲染已验。没有以限制阻止后续综合。

下一步只读original_reviews，然后02/03。仅自己输出可写；不读另一研究者，不运行实机/Codex/Slurm/数据库/生产/付费高成本。checkpoint非阻塞，最终03读回和COMPLETE才结束。

# 固定输入与研究边界

本轮为 `RUN_ID=pro-a` 的独立最终候选研究。读取下列共同输入；未读取另一位本轮 Pro 的分支、提交、文件、原型、PR 或中间结果。表中的旧 Pro-A / Pro-B 是用户指定的历史共同输入。

## 历史候选与 GPT Work 输入

| 输入 | 仓库与分支 | 固定提交 |
|---|---|---|
| R2 GPT-6 | `AI_Research_Toolkit` / `research/complex-system-showcase-20261026-r2-gpt6` | [`1508994fd3b4e478d5a39c569d42cb87460de77e`](https://github.com/YuukiAS/AI_Research_Toolkit/tree/1508994fd3b4e478d5a39c569d42cb87460de77e) |
| R2 GPT-5.6 | `AI_Research_Toolkit` / `research/complex-system-showcase-20261026-r2-gpt56` | [`a76aafa6d48eb9b947d5683cae35aa3e41141c96`](https://github.com/YuukiAS/AI_Research_Toolkit/tree/a76aafa6d48eb9b947d5683cae35aa3e41141c96) |
| 上一轮 Pro-A / GPT-6 | `AI_Research_Toolkit` / `research/architecture-evolution-system-20261027-pro-a` | [`c733aa065d9ad102a64bb5f5f55453cd31a7e7bc`](https://github.com/YuukiAS/AI_Research_Toolkit/tree/c733aa065d9ad102a64bb5f5f55453cd31a7e7bc) |
| 上一轮 Pro-B / GPT-5.6 | `AI_Research_Toolkit` / `research/architecture-evolution-system-20261027-pro-b` | [`4322881023b40f70352d5cc380c585d90098fb12`](https://github.com/YuukiAS/AI_Research_Toolkit/tree/4322881023b40f70352d5cc380c585d90098fb12) |
| GPT Work 内容与策展审查 | `AI_Research_Toolkit` / `research/complex-system-showcase-20261027-work-editorial-audit` | [`ce8442b799e0096b79367da701289255bfa23bd3`](https://github.com/YuukiAS/AI_Research_Toolkit/tree/ce8442b799e0096b79367da701289255bfa23bd3) |
| GPT Work Skill 证据 | `AI_Skills_Collection` / `research/complex-system-editorial-curation-evidence-20261027-work` | [`fd6e8300ea848b96a01c1cff588086fe980a2787`](https://github.com/YuukiAS/AI_Skills_Collection/tree/fd6e8300ea848b96a01c1cff588086fe980a2787) |
| 当前正式写作、UI、前端及治理输入 | `AI_Skills_Collection` / `main` | [`5d4b1432f96742646e00ad279a054359b1aec1da`](https://github.com/YuukiAS/AI_Skills_Collection/tree/5d4b1432f96742646e00ad279a054359b1aec1da) |

历史能力裁决见 [CONVERGENCE_DECISION_MATRIX.md](CONVERGENCE_DECISION_MATRIX.md)。本轮同时读取文字、源码、已有截图和比较结果，并在浏览器里操作四个历史原型；没有只看 index 首页。历史浏览器观察见 [history-browser-observations.json](sources/history-browser-observations.json) 和 [R2 GPT-5.6 指针复核](sources/history-r2b-pointer-observations.json)。历史浏览器环境曾出现中文字体缺失，相关文字和视觉判断同时对照其已存档截图，没有把该环境问题误报成历史产品固有缺陷。

Work 输入包含 `EDITORIAL_AND_CURATION_AUDIT.md`、`PLUGIN_REALITY_CHECK.md`、`REGRESSION_CASES.tsv`、`VISIBLE_CONTENT_AUDIT.tsv` 及 revised prototypes / screenshots。当前正式规则、设计 TODO 与尚未实现的能力分别识别；研究计划不被当作已安装运行能力。

## 宿主与真实 reference

| 来源 | 固定版本 | 读取用途 |
|---|---|---|
| `YuukiAS/Asteria` | [`60ba27a38324980beea78d4c07b7b28abda522cf`](https://github.com/YuukiAS/Asteria/tree/60ba27a38324980beea78d4c07b7b28abda522cf) | README、ROADMAP、TODO、VERSIONING、语义模型、Architecture/Lineage/Evidence、variant/diff、bridge/binding、源码追踪计划、当前实现与测试 |
| `YuukiAS/Mica-for-ChatGPT` | [`7059c0dc24b908b57bd0e1f475142ba4f4520621`](https://github.com/YuukiAS/Mica-for-ChatGPT/tree/7059c0dc24b908b57bd0e1f475142ba4f4520621) | 当前机制与固定源锚点；本地合成输入路径检查 |
| Mica 0.1.6 → 0.1.7 | [`9f56ea8d23a0895ddbb3f1e95ee207bd049b62c0`](https://github.com/YuukiAS/Mica-for-ChatGPT/tree/9f56ea8d23a0895ddbb3f1e95ee207bd049b62c0) → [`aa4ce52581fff2e207d1f93600becbb3018b0efc`](https://github.com/YuukiAS/Mica-for-ChatGPT/tree/aa4ce52581fff2e207d1f93600becbb3018b0efc) | 真实修订、消费事件、输入路径、三对固定历史源码绑定 |
| `YuukiAS/CAT-TRACE` | [`0d829fb17c458a076a15ec51893e917960107c21`](https://github.com/YuukiAS/CAT-TRACE/tree/0d829fb17c458a076a15ec51893e917960107c21) | C01、C04-REF、撤销的普通局部 Laplace 路线、C03 受阻生产模块、公式/例程/检查及后续候选 |
| CAT-TRACE reference 0.1.1 → 0.1.2 | [`bea7aca3ba51bcd4883b9105765bfbbad5eddadc`](https://github.com/YuukiAS/CAT-TRACE/tree/bea7aca3ba51bcd4883b9105765bfbbad5eddadc) → [`2ccb9f9b3c67258292e3b39faeadb4a6c8fef03b`](https://github.com/YuukiAS/CAT-TRACE/tree/2ccb9f9b3c67258292e3b39faeadb4a6c8fef03b) | 条件潜变量目标到 collapsed observed likelihood 的有意义修订 |
| `YuukiAS/STAT5060-TA` | [`76dc93ce7aaf2b91b60fd4003daa8be75ff54588`](https://github.com/YuukiAS/STAT5060-TA/tree/76dc93ce7aaf2b91b60fd4003daa8be75ff54588) | Tutorial history/rule/control、架构研究、当前要求与真实页面、历史专业审阅 |
| Tutorial validator candidate | [`88d1214ea329f1e538301107c10bd8fd4fd8c341`](https://github.com/YuukiAS/STAT5060-TA/tree/88d1214ea329f1e538301107c10bd8fd4fd8c341) | v2/v3 验证构思与验证器缺陷，未把现有实现当正确答案 |
| Tutorial V04 → V05 | [`c747870e294e784e89edf3ba92a5ad4a74a7ab2d`](https://github.com/YuukiAS/STAT5060-TA/tree/c747870e294e784e89edf3ba92a5ad4a74a7ab2d) → [`ce896c8a11816ea0a5cd836b00554433b79a23fa`](https://github.com/YuukiAS/STAT5060-TA/tree/ce896c8a11816ea0a5cd836b00554433b79a23fa) | 局部内容修正的历史候选身份；区别于较新审阅文档提交 |

DA 的两份真实设计来自 Toolkit 的 [`ae2766a62b1546048ec6122e01ee95f1904fb73c`](https://github.com/YuukiAS/AI_Research_Toolkit/tree/ae2766a62b1546048ec6122e01ee95f1904fb73c) 与 AI_Skills 的 [`fd6916ad5fdd5fb905544b6a127f9b0d31a737e1`](https://github.com/YuukiAS/AI_Skills_Collection/tree/fd6916ad5fdd5fb905544b6a127f9b0d31a737e1)。较新设计不在本轮固定的 AI_Skills main 上，不能用 main 的哈希拼出不存在的链接。具体路径、职责与历史纠正见 [da-design-history.md](sources/da-design-history.md)。

上述来源仓库只读。私有 CAT-TRACE 和 STAT5060 的原始源码、数据表、计算结果文件与页面截图留在原权限范围；交付仅保留研究所需的机制摘要、固定位置及来源权限提示。Tutorial 页面结构图是说明定位关系的新示意，不冒充私有课件截图。仓库已有结果、历史作者观察、本轮源码核对与本轮实际执行均分别标识。

## 写入与实现边界

唯一远端写入为 `YuukiAS/AI_Research_Toolkit` 的 `research/asteria-next-convergence-20261027-pro-a`，从共同基线 `23a1c4840f665e66f7af95ffadaadd96dc999e7f` 出发。本轮所有候选文件位于 `docs/research/asteria-next-convergence-20261027/pro-a/`。

开工实际写入提交为 `1739de02430e0748f447bfc9fe0fc8475d742566`，随后按固定提交回读 sentinel，见 [WRITE_ACCESS_CHECK.md](WRITE_ACCESS_CHECK.md)。最终交付另行提交并再次回读远端，不覆盖其他分支或来源仓库。

允许的工作是研究、候选规格、参考原型与内部 QA。原型不执行外部任务、修改四个项目、触发科研计算、制作新的私有课件或宣布正式验收。后续 Codex 合同描述未来正式实施的责任与退出条件，不构成本轮已实施声明。

成熟开源项目按官方仓库、文档与包元数据核对；失败的探测也保留在 [oss-source-ledger.json](sources/oss-source-ledger.json)，不将失效链接改写成成功读取。最终采用与不采用的判断见 [OPEN_SOURCE_ADOPTION.md](OPEN_SOURCE_ADOPTION.md)。

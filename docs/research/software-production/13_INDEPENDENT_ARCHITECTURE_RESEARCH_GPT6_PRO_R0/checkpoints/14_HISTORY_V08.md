# 历史反证：v0.8全目录与363行覆盖矩阵

RUNNER_ID: GPT6_PRO
READ_DATE: 2026-10-15
HISTORY_SNAPSHOT_COMMIT: 3a8e5df5360c20814bbbf34d7a4f392655437588
INDEPENDENT_CANDIDATES_FROZEN: YES；01保持原提交未修改。

## 完整实际读取清单

来源均为docs/research/software-production/11_THREE_CRITIC_RECONCILIATION_V0_8/。根目录定向枚举含00–11和README，reviews子树1003aaf9041ed51f0f1206cd7e82996aea08a49c返回truncated=false，仅含一份GPT-5.5原文。所有下列文件均已完整读取；长响应分段补齐。CSV363数据行全部逐段读取，不是只看开头或字段数；这是文本/语义检查，不冒充本轮运行生成器或产品重放。

| 文件 | 实际blob |
|---|---|
| README.md | a69ae446d1978976302eb2d71346a73f0e0aea76 |
| 00_PLAN_AND_ARCHITECTURE_V0_8.md | f5cb9087258cb90427f5ba1800611a9e08a6ccc9 |
| 01_EXECUTABLE_KERNEL_AND_PLAN.md | ba85447a7cb0fff12e05cd37d026d3bd3a2e07ec |
| 02_TRUSTED_EVIDENCE_AND_IDENTITY_CONTRACT.md | 025cbbe79e0cee3f86770f05f2d194ec8f8417b9 |
| 03_REVIEWER_AND_VALIDATOR_ADMISSION.md | a139ef0183fa877ea7a4c4857fb677bfbe73b4a3 |
| 04_SEVEN_REPOSITORY_ADOPTION_MATRIX.md | 97b09fc3fb03f0ff152f39818c77d2125ea244d1 |
| 05_MATURE_COMPONENT_ADOPTION_DECISIONS.md | 7c2f8bebe2212dad39ec89caac2b5aa9320ca5e7 |
| 06_PDF_AND_COMMIT_IDENTITY.md | e4e16606599ebe316fe0f5e42b8a3fc9db053ef5 |
| 07_COVERAGE_METHODOLOGY_AND_LIMITS.md | acb085110213103ccc865c503f6898e29fbcb79b |
| 08_FULL_CASE_COVERAGE_MATRIX.csv | 98cc2377c54ba6bc9d9ca9e80f3bf58afe564981 |
| 09_THREE_CRITIC_BLOCKER_DISPOSITION.md | 2a22b5cdfa489bc3288f56ec96a95315d4d31c9a |
| 10_REVIEW_MANIFEST.md | 542dcf392ebe5a3ca3893f18588a1164ea687f4b |
| 11_INDEPENDENT_CRITIC_R2_FULL_PROMPT.md | dc4c3760a79cb280590e896dc406373ce049f581 |
| reviews/GPT55_R1_ORIGINAL_USER_UPLOAD.md | 4ccea7ce49c2dcba63e5bb1360e73541413064ed |

GPT55原文215行及所附返修提示全文已读，裁决REVISE；没有执行历史提示中的重读源仓库/新角色任务。v0.8对GPT56/GPT6的09摘要不能替代另两份原文，下一步读original_reviews。

## v0.8真正回应了什么

五个assure子命令是短命无状态接口提案，不是已实现程序；作者明确没有正式审查通过、安装或真实权限验证。它尝试通过既有拥有者调用检查，保留专业工具与三种候选身份，建立领域审查者准入，提供七仓差异和所有登记项。这比v0.6责任列表更具体，但具体接口和完整字段仍不等于真实执行与正确判断。

v0.8承认旧PDF视觉不属于新架构设计通过对象，c9到dcc8的关系是其历史GitHub比较记录；本轮没有重跑这个比较或渲染旧PDF。它也承认363行没有任何一行经其新正常入口验证，不能把它的保守标注误写为声称已经解决363问题。

## 本轮发现的具体反证

**H08-1：必需场景可能没有进入准入计算。** 01接口草图evaluate_required_claims接收required_runs，但循环仅逐approved_claim查找claim.id和candidate.identity的一份证据，草图未消费required_runs。由该代码结构可推导：仅有同一声明的一个成功场景，未必能证明该声明要求的不同系统、动作、重启、病例或阶段全部覆盖。这里是对提案伪代码的静态反例，不是已运行的安全漏洞。本人B也不能只关联“声明有一张合格收据”；应逐项匹配冻结的必需义务与适用消费场景，缺任何必需单元都不得晋升。

**H08-2：准入草图仍将核心语义委托给未定义判据。** trusted_observer和observed_postcondition_meets是必要条件，但不是来源独立、观测有效及专业正确的实现。受保护观察者可以忠实记录一个错误输入、错误分母或测试替代路径。本人A/B/C必须分别证明来源/权限、真实消费链、专业判断，不能将三者合并为一个trusted布尔值。

**H08-3：完整CSV存在可直接定位的领域错配。** 以下均为本轮从原表读出的值，不需要推断产品当前是否仍坏：

- Lucerna:L07是控件/窗口留在用户桌面的测试污染，却分为SCIENTIFIC_SEMANTIC_DRIFT并配DOMAIN_FORMULA_AND_FORWARD_PROBE。
- Lucerna:LX15、LX16、LX17分别涉及图标消费者、实际动作和设计呈现，也被分到同一科学/公式检查路线。真实渲染和动作观察不能由公式探针替代。
- CARE:C01是模型只剩浅stem的问题，existing控制却出现C-PASSWORD；CARE:C21等又出现C-PRODUCT/C-WEB。这些控制代号与相应医学模型失败不匹配。与CUHK的同名C编号共存提示可能有编号混用，但本轮未读取生成器，不能宣称已证实生成算法根因。
- CARE:C02的模态私有输入混合被配为USER_ARTIFACT_QUALITY/REAL_RENDER_AND_ACTION_REVIEW；需要的是真实张量来源和模态干预，不是常规界面观察。
- CARE:RACE-01的优化器与学习率配方偏离被分类为AUTHORITY_OR_DATA_ISOLATION/PLATFORM_ISOLATED_GATE；隔离正确不能证明配方正确。

由这些反例可直接否定“表中每行有控制字段，所以能自动选择正确领域检查”。该表保留来源索引价值，但其自动归类不能成为拥有者自动选检查或宣称覆盖的权威。本人候选的任务解析必须从当前批准目标和真实消费者推导，由对应领域判据核对，而不是直接把历史标签转成检查命令。

**H08-4：状态与事件性质仍有混杂。** Mica:M03是正确的平台范围边界而非本次事故；Bobbio:B32源文明确为知识语义保护要求而非虚构历史故障，却仍进入统一历史状态列。类似风险边界、已修事实、重发和当前代码观察应分层，不能用计数、赋值完成率或统一HISTORICAL_UNREPLAYED证明故障覆盖程度。这里不重新制造363份测试，也不把已正确保留的NO_GO和局部修复抹去。

**H08-5：短命与无状态不能证明没有新增权力。** 如果admit决定必需证据、可释放动作和下一轮授权，它在逻辑上仍有准入权；关键是这是否由既有合法拥有者使用受保护判据执行、是否可被普通实现身份绕过，而非进程是否常驻。本人B的可删除性与单一拥有者条件须落实：删除适配不能让任务状态或恢复秘密一起消失；适配不得拥有独立预算、轮次、暂停/重启队列。

**H08-6：设计充分性与已安装分开，但不能无限后移核心验证。** 不能因所有代码尚未实施而自动否决一切设计；也不能把无法成立的线程附着、真实隔离、专业判据当实现细节。当前官方原生goal/同步Stop是替代证据，须先与不建系统的A比较。v0.8在这些实际目标环境中没有新增实测，本人也没有，最终只批准或否决架构方向及有界探针，不虚构运行通过。

## 已读GPT-5.5原文带来的修订

原审查并非要求大型新控制器：B1要求可实施最小机制，B2–B7要求可信证据、专业资格、轻量适配、成熟复用、版本与覆盖。它倾向最小内核+两个试点，不认可仅再加长规则。本人接受“必须有实际入口和专业判据”，但不接受由此直接推出“必须发行独立公共CLI”；既有入口的窄修也能满足同一可检验要求，是否足够由对照决定。

GPT55声称A不足以稳定跨项目改善，是该审查者的架构判断，不是A已经被实验证伪。其STAT5060数字是历史原文证据，本轮没有重读或重跑STAT5060仓库。其推荐MLflow属于成熟替代考虑，不构成必须部署新登记服务的授权。

## 下一步

立即定向枚举并全文读取12_COMPLEX_DELIVERY_REQUIREMENTS_INTAKE_20261015/original_reviews/。相同blob可去重记录；不同原文必须完整读。之后写02历史攻击与候选修订，再03最终综合。01不改，十源仓库不重读，不读取另两研究者，不进行执行器/实机/集群/生产/付费操作。

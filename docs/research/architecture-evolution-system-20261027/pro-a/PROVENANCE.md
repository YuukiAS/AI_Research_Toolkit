# 研究来源、读取范围与写入边界

## 运行身份与远端写入

本次身份为 `pro-a`。唯一写入分支是 `research/architecture-evolution-system-20261027-pro-a`，共同基线为 `23a1c4840f665e66f7af95ffadaadd96dc999e7f`。本轮所有新交付均位于 `docs/research/architecture-evolution-system-20261027/pro-a/`，没有修改原有指南、R2 材料或产品源码。

研究开始前已真实创建 [WRITE_ACCESS_CHECK.md](WRITE_ACCESS_CHECK.md)，形成提交 [`a6b9615ba3a483b1ec47339c7833aafe0a28c322`](https://github.com/YuukiAS/AI_Research_Toolkit/commit/a6b9615ba3a483b1ec47339c7833aafe0a28c322)，随后从指定分支远端读取该文件，核对内容和 blob `4302bc7104c79449058b019feb3ee55a6d4b4246`。这一步完成后才开展研究。

本轮没有读取另一位 Pro 的分支、提交、成果、PR 或中间文件。用户指定的前轮 R2 两候选及比较属于共同研究输入，已按下面的固定提交读取。Mica 与 CAT-TRACE 均只读。最终交付与远端回读见 [REMOTE_READBACK.md](REMOTE_READBACK.md)。

## 1. 必读共同输入

以下主文件与两个目录中的共同研究材料均按基线完整阅读，而非仅按文件标题概括。

| 来源 | 固定位置 |
| --- | --- |
| 复杂系统设计指南 | [COMPLEX_SYSTEM_DESIGN_GUIDE.md](https://github.com/YuukiAS/AI_Research_Toolkit/blob/23a1c4840f665e66f7af95ffadaadd96dc999e7f/COMPLEX_SYSTEM_DESIGN_GUIDE.md) |
| 复杂架构讲解标准 | [COMPLEX_ARCHITECTURE_EXPLANATION_STANDARD.md](https://github.com/YuukiAS/AI_Research_Toolkit/blob/23a1c4840f665e66f7af95ffadaadd96dc999e7f/COMPLEX_ARCHITECTURE_EXPLANATION_STANDARD.md) |
| 可靠工作体系参考 | [AI_RELIABILITY_SYSTEM_REFERENCE.md](https://github.com/YuukiAS/AI_Research_Toolkit/blob/23a1c4840f665e66f7af95ffadaadd96dc999e7f/AI_RELIABILITY_SYSTEM_REFERENCE.md) |
| 架构工作方式研究 | [architecture-workflow-20261026](https://github.com/YuukiAS/AI_Research_Toolkit/tree/23a1c4840f665e66f7af95ffadaadd96dc999e7f/docs/research/architecture-workflow-20261026)：需求与选项／推荐机制两份全文 |
| 既有展示任务及 R2 要求 | [complex-system-showcase-20261026](https://github.com/YuukiAS/AI_Research_Toolkit/tree/23a1c4840f665e66f7af95ffadaadd96dc999e7f/docs/research/complex-system-showcase-20261026)：原任务、第二轮质量证据、R2 重做要求三份全文 |

## 2. 两份 R2 候选与真实比较

| 材料 | 固定提交 | 实际读取与观察 |
| --- | --- | --- |
| GPT-6 R2 | [`1508994…`](https://github.com/YuukiAS/AI_Research_Toolkit/tree/1508994fd3b4e478d5a39c569d42cb87460de77e/docs/research/complex-system-showcase-20261026/r2/gpt6) | DESIGN、ARCHITECTURE_MODEL、RESULT、模型／内容、生成与交互代码、样式、离线原型；实际打开页面并操作节点、关系和情境步骤 |
| GPT-5.6 R2 | [`a76aafa…`](https://github.com/YuukiAS/AI_Research_Toolkit/tree/a76aafa6d48eb9b947d5683cae35aa3e41141c96/docs/research/complex-system-showcase-20261026/r2/gpt56) | DESIGN、ARCHITECTURE_MODEL、RESULT、数据、交互代码、样式、页面；实际打开并操作节点、关系和失败情境 |
| R2 比较 | [`515c66a…`](https://github.com/YuukiAS/AI_Research_Toolkit/tree/515c66acd5aa0c972ef5b0e97e336894d1932a8c/docs/research/complex-system-showcase-20261026/r2/comparison) | COMPARISON、metrics 和比较入口；保留 A 86／B 82 的既有真实结论，不重评分 |

本轮读取确认：R2 已有源码外链和结构化数据；它主要缺少机制与实现的连续绑定、证据范围和组件因果修订。一次新的关系鼠标点击成功，不能推翻既有 A/B 在其他关系上发现的命中问题。两次浏览器读取服务不同问题，不混用验收含义。

## 3. 三个真实项目

| 项目 | 来源身份 | 读取范围 |
| --- | --- | --- |
| DA 旧设计 | Toolkit `ae2766a62b1546048ec6122e01ee95f1904fb73c` | `docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/` 的 CURRENT、完整架构、执行与证据合同及相关背景；没有把分支名误当目录 |
| DA 新候选 | AI_Skills_Collection `fd6916ad5fdd5fb905544b6a127f9b0d31a737e1` | `docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md` 与 ROADMAP 全文；候选身份不继承旧批准 |
| Mica | `7059c0dc24b908b57bd0e1f475142ba4f4520621` | 当前内容脚本、连接器生命周期与连续显示、旧草稿恢复、真实测试定义、版本与产品规格、审查边界；另读 0.1.6 固定实现及修复提交 |
| CAT-TRACE | `0d829fb17c458a076a15ec51893e917960107c21` | 指定 2026-09-16 演进文档 1–861 行、全部 18 节与维护规则；C01 设计／Critic resolution／C++ 与测试；C04 调查、计划、审查、两版实现与记录；零槽位反例、撤销、10 月说明及当前 blocker |

逐组件的真实来源、范围和修订见 [THREE_PROJECT_STRESS_TEST.md](THREE_PROJECT_STRESS_TEST.md)，机器可定位的来源在 [prototype/model/data.json](prototype/model/data.json)。本轮没有重新执行产品、科研或真站验证；历史运行记录与本轮源代码核查分别表达。

CAT 原材料继续保持私有；本分支只收录任务必需的机制和状态摘要，以及经过选择的权限链接，没有复制私有源码、测试输入、实验数值、日志或原文全文。

## 4. 当前开源资料

2026-10-27 实际检索 GitHub 与官方资料，覆盖 12 组能力、13 个仓库；默认分支提交、发布与许可证分别核对。主要来源和采用判断见 [OPEN_SOURCE_RESEARCH.md](OPEN_SOURCE_RESEARCH.md)，完整版本与检索登记见 [oss_sources.json](sources/oss_sources.json)。

实际构建版本与当前上游版本明确分开。`@viz-js/viz 3.25.0` 的官方 npm 完整性值与 Graphviz 14.1.3 的固定版本 `COPYING` 已另外核实，见 [build-dependency.json](sources/build-dependency.json)。只分发生成 SVG，不把上游当前许可证覆盖到旧版本。

## 5. 研究判断、已实现能力与后续工作

产品形态、六对象模型、设计方法和试点建议属于本次研究判断。来源支持其事实前提，不等于这些建议已经通过长期用户研究。

原型实际完成结构差异、局部历史范围、来源导航、因果记录与本地校验。已执行的模型、浏览器和历史基线正反例见 [QA.md](prototype/QA.md)。跨仓自动提取、语言 AST 解析、远端 CI、写界面和长期收益评估尚未建设；没有用计划能力解释本轮截图。

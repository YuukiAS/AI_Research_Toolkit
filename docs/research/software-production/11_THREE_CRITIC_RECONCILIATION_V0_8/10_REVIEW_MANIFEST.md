# v0.8独立Critic的冻结来源清单（研究包，不是Implementation PASS）

生成时点：2026-10-14。以下文件均已由GitHub连接器从研究分支真实读取，blob内容身份在本表中固定。下一轮Critic应以单独给出的最终**方案冻结Git提交**为最高版本定位，不能仅靠本表哈希证明内容正确。审查提示词将在本来源清单之后单独提交，其存在不改变本方案源语义。

## 一、正式提案及原始独立审查

| 文件（本目录下） | 源Blob SHA | 本轮真正证明的性质 |
|---|---|---|
| 00_PLAN_AND_ARCHITECTURE_V0_8.md | f5cb9087258cb90427f5ba1800611a9e08a6ccc9 | 正式设计Plan、替代方案与有界试点 |
| 01_EXECUTABLE_KERNEL_AND_PLAN.md | ba85447a7cb0fff12e05cd37d026d3bd3a2e07ec | 对应审查阻塞的可审核设计合同 |
| 02_TRUSTED_EVIDENCE_AND_IDENTITY_CONTRACT.md | 025cbbe79e0cee3f86770f05f2d194ec8f8417b9 | 对应审查阻塞的可审核设计合同 |
| 03_REVIEWER_AND_VALIDATOR_ADMISSION.md | a139ef0183fa877ea7a4c4857fb677bfbe73b4a3 | 对应审查阻塞的可审核设计合同 |
| 04_SEVEN_REPOSITORY_ADOPTION_MATRIX.md | 97b09fc3fb03f0ff152f39818c77d2125ea244d1 | 对应审查阻塞的可审核设计合同 |
| 05_MATURE_COMPONENT_ADOPTION_DECISIONS.md | 7c2f8bebe2212dad39ec89caac2b5aa9320ca5e7 | 对应审查阻塞的可审核设计合同 |
| 06_PDF_AND_COMMIT_IDENTITY.md | e4e16606599ebe316fe0f5e42b8a3fc9db053ef5 | 对应审查阻塞的可审核设计合同 |
| 07_COVERAGE_METHODOLOGY_AND_LIMITS.md | acb085110213103ccc865c503f6898e29fbcb79b | 对应审查阻塞的可审核设计合同 |
| 08_FULL_CASE_COVERAGE_MATRIX.csv | 98cc2377c54ba6bc9d9ca9e80f3bf58afe564981 | 363行原始编号与保守覆盖状态 |
| 09_THREE_CRITIC_BLOCKER_DISPOSITION.md | 2a22b5cdfa489bc3288f56ec96a95315d4d31c9a | 21项三审查者阻塞处置，不是PASS |
| README.md | a69ae446d1978976302eb2d71346a73f0e0aea76 | 入口导航 |
| reviews/GPT55_R1_ORIGINAL_USER_UPLOAD.md | 4ccea7ce49c2dcba63e5bb1360e73541413064ed | 用户最新上传完整GPT-5.5 R1源文本 |

## 二、来源真实覆盖情况

- 六仓库主登记：Lucerna33、Bobbio32、Mica46、SeminarArc32、Asteria47、CUHK_Date56，共246。
- 晚期Lucerna LX20、Asteria AX5，共25；CARE旧40、追加52（不计META-01）。
- 实际生成CSV **363数据行**，带全局来源编号/源行号/原状态/证据强度/根因候选/真实未测原因，**363行中尚无一行经本版正式正常入口重放验证**。
- 当前所有归因族是Planner提出的领域初审分类；37条初始分类缺口由逐项阅读原描述及控制补出，仍可被下一位Critic逐项推翻。不能从编号齐全推断已证实363次事故，也不能推断各项目当前仍坏。
- GPT-5.5完整R1原文现已保存在本目录；GPT-5.6原始REJECT及GPT-6原始REVISE在当前用户先前上传的v4.zip内，v0.8的09写稳定编号摘要。**若下一审查线程无法直接打开原zip，应明确要求原文/核对缺口，而不是声称亲读三份原始审查。**

## 三、Critic必须逐项审的阻塞类别

- GPT-5.5：B1最小代码可执行内核、B2三类可信证据、B3专业Reviewer准入/退休、B4七仓轻量适配、B5成熟工具复用、B6PDF两提交身份、B7原表363行覆盖。
- GPT-5.6：P0-ARCH-01/02、P0-TRUST-03、P0-SCOPE-04、P1-ADAPT-05、P1-RULE-06、P1-REVIEW-07、P1-RUN-08、P1-PERM-09、P1-ART-10、P2-EVID-11、P2-COMP-12。
- GPT-6：R1-P1-01（早期独立审查与现有Bridge阶段冲突）、R1-P1-02（只读/MCP/GUI/Zotero子脚本副作用），另有Lucerna通知Gate真实源码补查。

## 四、精确审查边界和有权动作

- 本轮只审**设计**、来源归因与可证伪试点合同，不安装任何新程序，不修改七仓与Bridge/AI Skills正式行为，不触碰Windows/Zotero/私有ChatGPT宿主、医疗数据、Slurm或正式CI权限。
- 原v0.6设计PDF已构建，但不作为v0.8架构设计PASS的一部分；PDF独立实际视觉审查另留独立产品事项，见06。不能把PDF未审误算当前新架构必然失败，也不能宣传其已过。
- 当前所有assure命令是接口提案，不代表安装。真正接受/发布权限归已安装的Bridge/原项目Owner和受信任CI、合法平台，不增加第二CURRENT或新部署服务。
- 下一步必须给用户三选一的独立裁决：PASS／REVISE／REJECT。PASS只允许继续准备有界实施试点的独立Plan，不授权启动；REVISE列稳定阻塞与下一轮Planner返修提示词；REJECT给方向替代与完整重做提示词。用户此前明确反对无休止小修，否决也必须是合法真实选项。

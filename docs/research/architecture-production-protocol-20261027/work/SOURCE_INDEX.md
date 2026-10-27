# 固定来源目录

本报告使用105个固定来源。全部 repository、40位 commit、path、blob、行数、证据类型保存在 [SOURCES.json](SOURCES.json)。为减少重复，repository_id/ref_id 由文件顶部字典解析；文件末提供唯一 URL 模板。正文关键论据已直接链接精确 GitHub 文件和行号。

共同原始基线：`23a1c4840f665e66f7af95ffadaadd96dc999e7f`；强制案例预置：`ed7643fc185ce8dcf222785e05ace652e92bac7e`。

| 来源组 | ID 与用途 |
| --- | --- |
| 原始任务、历史方法与展示 | MANDATORY、REQ、OLD、SHOW、STD、D2：原始要求、旧候选、展示失败与结构要求 |
| Bridge设计与审查 | B01–B22：初始proposal/execution、scope recovery v0.1–v0.8、reset与complexity review |
| Bridge时点与运行事实 | BH1、BH2：精确旧执行包；BC：实际canary JSON |
| Slurm routing | S25–S30、S33–S34、S37–S43、S64–S67、S75–S79、SG/SK/SE、SH2：proposal/review/Goal/kickoff/result/TODO |
| Slurm取消与运行 | S05、S07–S08、S12–S13、S16、S19、S45/S47/S48/S49/S51–S54/S59/S61/S62：设计、runtime、安装与验收；实际收录集合以JSON为准 |
| Slurm历史失败候选 | SF、SCODE、SH1：旧RESULT、真实installer源码、Phase0前执行包 |
| Mica | M1–M2、MR/MG：用户案例、审查、产品合同、旧ROADMAP与站点contract |
| CAT-TRACE | C1–C4：解析probe、R1/R6闭合、数值可靠性历史 |
| STAT5060 | VH、V1–V4：原PASS时点、撤回、缺口闭合与finding裁决 |
| Asteria / DA | A1–A3、DAOLD、D1、E1–E3：真实验收失败、纯设计状态、历史结构化架构研究 |
| Plugin / Artifact | P1–P4：RA059审查、用户版式QA与Presentation黑箱设计 |

上表的连续编号表示来源系列，并非每个整数都有文件。例如S编号来自原检索目录，缺号不代表缺失成果；JSON列出本报告实际采用的105项。用户案例汇总与归档运行报告的证据限度在正文分别说明，不等同本轮重现实验。

历史 architecture-evolution-system 研究是任务允许的旧输入；本轮 architecture-production 的另两个 Pro 分支、commit、文件、PR和中间结果均未读取。

[COMMIT_TIMELINE.json](COMMIT_TIMELINE.json) 保存 Bridge54个时间窗提交、33个landmark统计及Slurm失败候选提交。为避免重复，不复制完整补丁；用commit SHA可回到原始diff。diff行数只作暴露规模，不能当废弃代码量。

# 研工台v0.8：三位独立审查完整归因后的正式重做提案

**当前阶段：Planner正式设计修订完备、准备独立Critic复审；未PASS、未实现、未运行高成本或平台实验。**

本目录解决两个前一版相反的错误：v0.6把十二项职责装进第二套可能与Bridge冲突的中央运行体系，方向过重；v0.7撤回中央系统后，又没有真正的最小可执行保证接口，方向过简。v0.8采用**现有Bridge/项目唯一执行任务Owner＋短命无状态保证检查函数＋各项目现有专业真实脚本与受保护准入**。是否需要新公共包仍以“相对完全不加公共包是否取得真实净收益”的试点决定，不能因本次有很多文件便宣布应安装。

## 五分钟阅读顺序

| 你关心的实质对象 | 真实文件 |
|---|---|
| 我到底推荐什么、为什么、和成熟替代如何比较、PASS后才做什么 | [00 v0.8正式Plan](00_PLAN_AND_ARCHITECTURE_V0_8.md) |
| 哪个程序启动、五个短命命令做什么、为什么不再造Bridge状态/预算、早期防降级如何进正常入口 | [01 最小可执行内核](01_EXECUTABLE_KERNEL_AND_PLAN.md) |
| 桌面exe/网页/模型候选如何绑定，截图/指标/旧包不能怎样造假，谁有真实写权限 | [02 三类可信证据合同](02_TRUSTED_EVIDENCE_AND_IDENTITY_CONTRACT.md) |
| STAT5060检出率20%这种审查者怎样限制、失格、重新准入；Asteria/CUHK自然语言/CARE等领域如何区分 | [03 领域审查资格](03_REVIEWER_AND_VALIDATOR_ADMISSION.md) |
| 六软件加CARE各已有哪一个实际脚本/角色、哪些真正需新增、哪些绝对不新增、小修和完整功能何时用 | [04 七仓适配矩阵](04_SEVEN_REPOSITORY_ADOPTION_MATRIX.md) |
| GitHub受保护检查、Playwright轨迹、原Win捕获、Slurm、MLflow、Spec Kit、AI Skills/Bridge各自采用或不采用原因 | [05 成熟实现复用决定](05_MATURE_COMPONENT_ADOPTION_DECISIONS.md) |
| v0.6 PDF为何c9源与dcc8产物SHA不同、究竟是否独立视觉审查 | [06 PDF与构建身份](06_PDF_AND_COMMIT_IDENTITY.md) |
| 全部问题数量/证据强度、历史/风险/真实BUG区别与未覆盖原因 | [07 矩阵说明](07_COVERAGE_METHODOLOGY_AND_LIMITS.md)、[08 全部363行实际CSV](08_FULL_CASE_COVERAGE_MATRIX.csv) |
| 三位Critic的7＋12＋2项每一项如何回应、未验证在哪里 | [09 21项完整处置](09_THREE_CRITIC_BLOCKER_DISPOSITION.md) |
| 新上传GPT-5.5完整审查215行原话 | [审查原文](reviews/GPT55_R1_ORIGINAL_USER_UPLOAD.md) |

**所有“设计回应”都不等于原Critic已关闭阻塞。** 受控真实试点还没有执行，当前全部363行均标未由v0.8在正常入口验证。第三位GPT-5.5的原文已经由本轮用户重新上传并保存；v0.7关于第三位文件缺失的文字是此前压缩包情形，在当前v0.8不再成立。

## 这些数字不能造假

六仓库主登记：Lucerna33、Bobbio32、Mica46、SeminarArc32、Asteria47、CUHK Date56，共246；Lucerna/Asteria晚期25；CARE原40及追加52，共363个源记录。包括历史已修、重复机制、边界、风险与未见缺口，**不是363次独立事故/实验**。机器CSV已从源文件逐行生成并校验363条，人工修订了最初37条未分类的候选根因；仍需相应领域Owner复核，不自封全部源事实已审完。

## 唯一允许的下一步

下一轮独立Critic用同一冻结版本审查全部三份意见、正式提案、接口、证据、三领域真实验证与未完成的研究范围，允许**PASS、REVISE、REJECT**。若设计PASS，只表示可以准备有界试点方案/角色与授权，不直接编写或运行任何实施Goal。若REVISE按稳定编号返修，若REJECT直接比较是否应只修现有Bridge/AI Skills与七项目自身。

研究仓库只是用户临时允许的资料存放位置，未来正式能力代码归属未决定；不将这份README当发布证据，不动七项目、Bridge、AI Skills main、GitHub保护规则或用户机器。

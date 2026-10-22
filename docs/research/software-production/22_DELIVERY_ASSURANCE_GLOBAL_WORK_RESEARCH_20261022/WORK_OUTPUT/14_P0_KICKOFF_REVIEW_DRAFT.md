# Kickoff Draft：仅供审查的 P0 Windows CLI 启动范围

`STATUS=DRAFT` · `AUTHORIZATION=NOT_AUTHORIZED` · `READY_FOR_CODEX=NO`

用户已经允许**保存这份审查草稿**，未允许运行探针或启动Goal。这里不是可直接发送给Codex的执行指令；没有COPY TO CODEX块。只有独立Critic审过同一固定包、用户随后实际发送明确有界指令，才可能形成执行授权。R3设计PROCEED不代替这些条件。

## 被审范围与定位

同一任务 `software-production--delivery-assurance`，阶段仅为既有P0中的当前Windows非交互CLI单元，不包括生产实施。

Proposal/Plan为02、03、06、12；Canonical Goal审查草稿为[13](13_P0_CANONICAL_GOAL_REVIEW_DRAFT.md)；图/用户说明为11。所有文件使用CURRENT及最终交接所指定的同一固定package commit，不从移动HEAD挑版本。Critic只能批准这个有界目标，不能把P1–P5一并放行。

已选host为local；fixture根为 `C:\Users\humc2\Documents\Codex\2026-10-22\delivery-assurance-delivery-assurance-critic-github\work\delivery-assurance-p0`。精确binary为 `C:\Users\humc2\AppData\Local\OpenAI\Codex\bin\codex.exe`，SHA-256 `DD4ADF302B112FDC30FCE509A5E261A0A6F1118DC58AC2DA636EB84E0A6B3E3E`。这是静态定位，尚未运行；漂移必须先更新绑定，不能临时换其它binary。

本机Bridge checkout `D:\Code\GPT_Codex_AI_Bridge_Kit` 仅供只读参考；当前main/6bbaca5，不是获权生产执行分支。fixture不是新Git仓库，不创建任何分支。研究回写仅 `YuukiAS/AI_Research_Toolkit:research/software-production-decision-20261013` 的原WORK_OUTPUT。

## 未来短 handoff 必须明确的有限授权素材

这些是**待用户未来授予**的精确范围，当前没有生效：

1. 在上述唯一fixture根创建无敏感测试文件、计数器、短脚本和项目级Hook/AGENTS，使用正常宿主信任流程；不得改全局配置。
2. 使用当前Codex身份/现有额度，启动最多一条本机CLI fixture会话及同一精确ID的resume；最多6＋2回合、45分钟探针/4小时该单元工程上限。不是通用subagent，不创建Desktop任务、远程任务、fork、handoff或自动化。
3. 允许只针对本次fixture的准确PID/启动身份进行取消、父退出和有界恢复，验证没有重复效果；不碰其它进程。
4. 允许将脱敏P0报告及结果JSON写入原研究分支的两个15输出文件，更新CURRENT并读回；不写其它仓、不上传私有会话或秘密。
5. 允许恢复本次fixture项目配置/信任项并保留raw证据；不递归清理用户目录。

正式短handoff只引用批准的02/06/12/13/14及Critic审查locators，携带以上必要当前许可与停止条件。不得逐字复制本草稿的历史状态，也不得在批准后新增其它host、产品、provider、额度或路径。若Critic修改了目标语义，先回Planner更新同一冻结包，不能批准后口头补范围。

## 明确不在该授权包络内

- Windows Desktop/交互式CLI/Remote实测、SSH或新的用户任务；它们在矩阵保留NOT_TESTED，本次不代签。
- 完整da/2、Bridge生产接线、项目adapter代码及七仓产品运行。
- 当前账号/凭据/设备、GPU/Slurm/Docker、部署/发布、邮件、独立付费API或额度购买。
- 安装/升级runtime、切换CODEX_HOME或provider、忽略规则/绕过审批与Hook信任、改全局安全设置。
- 任何其它repo/branch写入、分支拓扑改变、强推、清理或重置用户工作。

## 唯一结束与交接

依13判断该P0单元完成或如实未完成，所有实际结果回原维护任务和长期Planner。按06固定支持矩阵提出已证路线，但不自动进入P1/P2、不自动启用DA。实际不支持是有效测量结果，不能强行换新入口制造通过。

若未来计划扩大为Desktop/Remote或Lucerna真实产品试点，沿原06阶段约束绑定精确对象与授权后审查；不是本次CLI单元的暗含许可。没有新的架构问题就不重讨论已接受的产品边界；只有改变冻结语义才重回设计Critic。

# CARE：已有精确线程续接与持久收尾，不能误判为只有提示词

RUNNER_ID: GPT6_PRO
READ_DATE: 2026-10-15
SOURCE_REPOSITORY: YuukiAS/CARE_Challenge
SOURCE_MAIN: 75a40e454de43b64e59a0b0b438ff57ef2bb8345
SOURCE_DEVELOP: 184cc16bc00dbb4edce80e2c848bdaabae4f782e

## 来源和真实效力

实际读取branches及main/develop比较：diverged，develop独有665提交、main独有4提交，不能按分支名或提交数择一代表全部当前生产。develop的AGENTS 1–180、README 1–150；main的wiki/README 1–170；develop的automation/agent_flow_v3/README 1–210（blob 249eb9201f15936028605b6c0f51ca25d1d57caa）；scripts/automation/agent_flow_v3_runtime.py入口/身份段以及650–1048行真实事件绑定、调用和去重段；scripts/ops/care_milestone_finalizer.py 1–170（25fc5e5ee7abf151f3bc0b51db42fa225ca890c2）；scripts/automation/validate_agent_flow_v3.py 1–135（1a5fc69a5d8869668e092d27ae4d69ad74f42636）；results/20260710_agent_flow_v2_finalizer_smoke/result.md全文（562f64cc5e79139923955d05c52eb0e64f04df01）；results/agent_flow_v3/care-ase-faithful-formal-training-20260812/outer_diagnostic_user_authorized/REPORT_FOR_GPT.md全文（48b52daade561fedc2f8d5ac10cfee90eeacffce）。未读全runtime/validator，不宣称完整安全审计；未读取或评审SRR图的科学正确性，不制定CARE新路线/里程碑。

root规则对普通新工作采用main-only；v3 README明确这是单独授权的develop实验、只有Controller推develop且不自动合main。因此两者按活动任务区分：稳定规则与旧科学证据读main，研究已有新控制实现必须读develop；不把8月存档当10月服务器实况。

## 目标、用户入口及领域所有权

CARE是医学图像分割科研与比赛产物交付，而非通用软件UI：从冻结问题/数据拆分/模型结构/预算进入训练、推理、逐病例与亚组评价、对照、公平比较、Docker交付、最终科学与提交判断。源码公开库排除真实checkpoint、预测、日志/DB与凭据，因此无法仅凭GitHub证明当前部署、GPU产物或在线分数。

原v2把短任务直接执行、长Slurm任务交给持续Controller和确定性finalizer；v3增加独立持久Controller/Verifier/Executor，Planner拥有任务/科学意图，Critic冻结合同，Verifier构造判据，Executor实现。独立thread/CODEX_HOME/worktree是必须字段，角色写权与科学决定权不同。仍需真实运行隔离，字段自报不是OS权限证明。账号/外部上传/训练扩展及最终科学选择不能由运营完成状态自动授权。

## 对“已有系统不能续接”的直接反证

v3 README明确watcher仅续接已绑定的精确role thread，命令为codex exec -C <role-worktree> resume <exact-thread-id> -，设置独立CODEX_HOME，不用--last。所读runtime源码确实实现：核对任务nonce、冻结合同、review轮次与稳定内容摘要；读取远端审查决定/精确返修提示；fcntl非阻塞锁；拒绝已有活跃role进程；subprocess.Popen传指定环境/工作目录并写PID、thread、提示摘要、退出码和日志；已处理事件去重。不是仅有规范，也不是Bridge默认runner的thread_id=None新执行。

该证据只支持“为已登记且本系统拥有的服务端角色线程提供续接机制”，不证明能接管任意Windows Codex App新线程，也不证明今日进程正在存活。独立CODEX_HOME、工作树与持久外部进程使得迁移为普遍入口有真实成本。runtime入口write_json直接写目标文件，没有在已读函数中使用原子替换；事件处理在实际运行后记录，进程在副作用后/记账前崩溃的精确一次语义不能由去重列表保证，须专项故障注入与副作用读回。此为待验证设计边界，不宣称现网已重现。

## Slurm与最终完成

finalizer把PENDING/RUNNING/CONFIGURING/COMPLETING/AWAITING_SACCT和终态分开；sacct异常/空输出变成等待而非成功，退出码也保留；锁带host/PID/TTL，支持有界会计重试及既有tmux watcher或重提finalizer恢复。所读sacct解析选择首行，完整job/step/array定位是否稳健需要专项测试，本轮不外推。

历史smoke明确是合成/tmp会计夹具：COMPLETED缺产物仍NEEDS_EVIDENCE；产物与聚合成功也仅进入mapper-final，最后validator与提交另有责任者；失败是运行失败而不是调度阻塞。源码/夹具通过不代表真实作业结束。本轮未提交、查询、取消或重跑任何Slurm作业。

v3稳定审查对象由nonce、合同、要求清单、实现关键内容和验证器关键内容组成；收据/CI是其后代，不应每个CURRENT或报告提交都触发重型GPU验证。增量失效规则在已有项目内已被明确设计，新体系不能把它包装成全新独有价值。现有validator只证明结构/角色/绑定；其固定training_authorized=false等约束适用于实现忠实性任务，不能拿来证明另一正式训练任务是否获准。

## 科学证据与真实失败的含义

main wiki最新所读8月5日记录：组织方depth=1 Docker输入失败，已唯一绑定原archive并复现重采样零尺寸，修复仅最小形状clamp；checkpoint、推理语义不变；服务器静态审计不能冒充服务器Docker实跑。此前完整15+15常规病例彩排仍没覆盖此边界，说明数据/形状挑战集不可被“全套常规通过”替代。

develop 8月13日外层诊断报告说明混合人群总体scar均值掩盖完整三模态与缺T2病例的差异；完整模态略好不等于整体胜过基线，edema仍落后，灾难性空预测保留在均值，诊断不得用于checkpoint选择。它区分实现忠实性控制状态、正式训练实时状态和独立科学结论。这里只采纳其证据结构/失败类别，不独立确认模型优越性或建议训练；没有读取原始医学数据/论文附件/图解来做该科学判断。

## 对候选的约束

必须复用现有精确线程与Slurm收尾资产，先测其可靠性/维护成本，不重复建一组角色、watcher、notifier或科学真值库。训练实现忠实性、运行完成、对照公平、数据泄漏、解释范围、模型性能与正式提交是不同判据。科学NO_GO可为成功完成的研究结论，不要求训练到阳性；但负结果不能替代尚欠的已授权终态/聚合工作。新模型适配必须给数据/标签/模态/拆分/机制/基线/预算/指标/不确定性/失败样本及复现身份，远超注册命令。

下一批次：当前官方资料核实与独立候选冻结。全部十个仓库已有事实checkpoint，历史架构仍未读取。

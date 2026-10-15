# 官方来源核查三：Slurm 不等于任务或科学结论

RUNNER_ID: GPT6_PRO
READ_DATE: 2026-10-15
HISTORY_READ: NO

## 一手事实及架构后果

**O14：状态是基础状态加标志。** squeue/sacct可能只显示单一文本，识别到的标志会覆盖基础状态。PENDING是尚未获得执行条件；RUNNING是资源已分配并执行；COMPLETING仍在清理；PREEMPTED可能转成其他状态；COMPLETED只说明调度视角的成功退出。[O14] 因而解析必须按实际版本支持状态/标志，不能固定“不是RUNNING就是结束”。

**O15：提交成功并非运行成功。** sbatch通常在控制器接收脚本并分配作业号后返回；排队无上限承诺，也不搬运普通用户文件。afterok是成功后依赖，afterany是终止后依赖；前驱失败导致依赖失效后，即使前驱后续重排成功，既有依赖也不会自动复活。requeue重新从批脚本开头执行，而非自动恢复应用内存。[O15] 所以收尾宜能处理失败而不只afterok；重复执行必须由应用checkpoint和副作用协议保证，而非依赖调度器名称。

**O16：账务身份不能只用作业号。** sacct支持作业、步骤、集群、提交时间和退出信息；重复记录可由重排、联合集群、扩缩容或作业号回绕产生。官方当前文档含SLUID/OriginalSLUID，旧安装不必支持，需按版本协商；可用集群、作业/数组/步骤、Submit及重启代次组合识别。DBIndex是数据库记录索引；DerivedExitCode是步骤最大退出码且允许修改，不能当不可篡改唯一真值。显式限定查询窗口，不能相信默认时间窗覆盖本任务。[O16]

**O17：抢占不保证重排或自动续算。** 集群PreemptMode和作业属性决定取消、重排、挂起；REQUEUE需要允许重排，不满足时可能取消；SUSPEND与重排不同。[O17] 用户态工具不得猜测本站配置，也不能把OOM自动改科学批量、把超时自动增预算、把抢占转成无限重提。

**O18：预计开始时间不是预约。** squeue --start需要回填调度支持；PENDING可以有多个阻因而只展示某一原因，默认队列视图也不是完整历史。[O18] 队列中消失只能触发账务核对，不能据此判定成功或立即补提。

**O19：批脚本可以掩盖步骤失败。** 官方退出码说明明确指出关键步骤失败而脚本仍返回零的情形；步骤退出及派生退出存在为此辅助调查。[O19] 必须验证结果清单、检查点、样本覆盖和后处理，不只看ExitCode=0。

**O20：数组需逐元素收尾。** 作业数组的元素身份和排序不能从简单编号顺序推出，部分元素失败不代表全部结束或全部可重跑。[O20] 结果聚合须对冻结元素集合逐一核对，不能取sacct第一行、数组父行或任意COMPLETED行代表任务。

## 本研究建议的边界与恢复协议

调度事实由Slurm负责；作业提交/收尾由项目现有唯一持久责任者负责；模型实现和科学指标由领域验收负责。CARE已有精确线程与收尾实现应先复用，Remote Compute维持访问路径，二者不可竞争相同作业的重提权。

持久意图先于提交：记录任务/尝试身份、授权预算、脚本及输入摘要；收到作业号后登记并读回。若请求超时发生在可能已提交之后，进入“提交结果不确定”，按唯一任务标识、账户、时间和工作目录核对，不能盲目重发。租约/锁只能约束合作进程，不能证明副作用恰好一次；需要跨崩溃的动作记录、代次隔离及实际副作用读回。

排队时有限频率观察，不消费模型轮次忙等；账务异常/缺行保留“未知/等待账务”，退避并保留最后一次可靠事件。基础设施失败按原授权有界重试；任何改变科学预算、样本、模型或分区授权的策略另行决定。用户取消优先，不被自动恢复抵消。产物完整后才进行聚合、复现检查和科学解释；科学NO_GO可以是成功完成的研究结论，不是重跑直到阳性的信号。

以上均为设计和未来探针要求。本轮没有向用户集群发查询、提交、取消、续跑或任何Slurm命令，未证明Longleaf当前配置、会计延迟、排队时间或登录节点常驻政策。

## 官方参考文献

访问日期均为2026-10-15。

[O14] SchedMD. Job State Codes. https://slurm.schedmd.com/job_state_codes.html 。全文（基础状态与标志）。

[O15] SchedMD. sbatch. https://slurm.schedmd.com/sbatch.html 。Description；--dependency；afterany/afterok；--requeue/--no-requeue。

[O16] SchedMD. sacct. https://slurm.schedmd.com/sacct.html 。--duplicates；字段JobID/JobIDRaw/Cluster/Submit/DBIndex/DerivedExitCode/SLUID；时间窗。

[O17] SchedMD. Preemption. https://slurm.schedmd.com/preempt.html 。PreemptMode及重排、挂起条件。

[O18] SchedMD. squeue. https://slurm.schedmd.com/squeue.html 。--start；--states；Job reason codes。

[O19] SchedMD. Job Exit Codes. https://slurm.schedmd.com/job_exit_code.html 。作业与步骤退出、派生退出的意义。

[O20] SchedMD. Job Array Support. https://slurm.schedmd.com/job_array.html 。Job ID and environment variables；数组管理和依赖。

NEXT_ACTION: 只从自己checkpoints恢复七项目平台事实，核查对应成熟专业工具；禁止重读十个原仓库；官方主题簇完成后冻结独立候选。
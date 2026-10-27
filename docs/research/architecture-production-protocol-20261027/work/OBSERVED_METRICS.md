# 可观察指标、下界与未知量

这是历史描述和可复查代理，不是新协议效果评估。53 个事件是本研究的语义分组；分组粒度由研究者选择，不能用 53 当“失败次数”。

## 已观察或可严格限定的数量

| 对象 | 数值 / 下界 | 状态与口径 |
| --- | --- | --- |
| 样本 | Bridge16、routing10、cancel13、Mica2、CAT3、STAT2、Asteria2、DA1、showcase1、RA2、Artifact1，共53事件 | OBSERVED 文档 + INFERRED 分组，不是完整事故总体 |
| Bridge 提交目录 | 54 个读取的时间窗提交；其中33个详细 landmark/补丁 | OBSERVED 元数据，不能等于设计轮数 |
| Bridge 正式产品实施准入 | reset 前至少2次：26c57fa、e0f7a328；reset 后另有 be4a979 checkpoint | OBSERVED 提交/审查；初次完整 execution PASS 的独立记录未取得 |
| Bridge implementation→design | 至少2个明确返回：scope recovery、product scope reset | INFERRED 下界；没有把三次 safety/recovery fix 全算架构返回 |
| Bridge A_reset | 至少1次明确全局 product scope reset | OBSERVED 旧 authority 撤销；不是每个 proposal 版本 |
| Bridge exposure proxy | e0f7a328：37 files、+3288/-572 | OBSERVED 补丁规模；W_waste UNKNOWN |
| Bridge 人工协调代理 | B04/B02/B08/B09 四份文件记载用户转交/补充 review；另有 scope reset | OBSERVED 文档事件；可能消息重叠，不给 H_user 实际次数 |
| routing review objects | 6 proposal +2 execution +4 prefinal +2 integration +1 final =15 | OBSERVED distinct documents；模型调用次数 UNKNOWN |
| routing 实施后重审 | 4 prefinal 文档序列 | OBSERVED 顺序；多数实现 bug，不等于4次 architecture reset |
| cancel 实施阶段 | 旧 Phase3、chat/global Hook 候选、portable runtime 至少3组记录 | INFERRED episode 下界；MCP 是否另算独立 start 取决于预注册口径 |
| cancel 历史 live retain | 未执行；最终由用户明确豁免 | OBSERVED，不能填 PASS 或算测试成功 |
| STAT READY 撤回 | 至少1个可定位原始 PASS 后被 supersede | OBSERVED 精确 VH 与后续 V1/V2；主要是 pre-implementation |
| Asteria RC8 | 6类用户 blocker；W05/W06 当前复验，其他 carry-forward | OBSERVED 报告；不是6次全面独立 RC8 审查 |
| CAT 数值 probe | 解析小例子、n100 误差与后续固定/自适应 reference 的指定样本 | OBSERVED 历史输出；不是算法总体准确率 |

详细出处由事件 ID 对应 [数据](BENCHMARK_DATA.json)、[来源](SOURCE_INDEX.md)、[提交目录](COMMIT_TIMELINE.json) 给出。

## 用户成本变量怎样测

| 变量 | 本轮可得代理 | 本轮未知 / 未来应记录 |
| --- | --- | --- |
| N_design | 命名 proposal/独立来源；showcase 两模型同时漏总图 | 同一模型会话与完整设计调用数，不得以版本数替代 |
| N_review | review 文档数及独立目标 | 调用次数、token、完整/窄审耗时 |
| N_probe | 找到的 probe / runtime evidence | 所有失败尝试、调试成本和未保存实验 |
| S_serial | 事件 depends_on；明确 review→repair→recheck 顺序 | 真正模型串行轮与可重叠时间 |
| P_parallel | 历史材料允许并行的活动类型 | 实际并发数及利用率 |
| H_user | 用户转交、追问、产品/资源/验收决定的文档记录 | 原始消息全量、人工分钟、协调与必要产品决定的占比 |
| C_ai | 无完整使用账单 | UNKNOWN；未来逐调用成本 |
| T_wait | UTC 提交和本地文档日历跨度 | 主动等待、离线空档、时区混合，不由跨度估算 |
| R_rework / G_gap | 实施后核心机制返回与重大 gap 的事件下界 | 没发现/没记录的 gap；统一 severity 分母 |
| B_blast | Bridge release coupling、Slurm shell capability 影响、模块范围 | 实际受影响任务/用户数与修复小时 |
| D_codex | C2 外层 profile、Bridge helper/owner、STAT module 等未定问题 | Codex 真实私下决定的数量与严重度 |
| F_drift | STAT 过度手工处方；治理/一致性低增量单列 | 全 finding 母集与无关比例 |
| I_impl / A_reset | 上表明确的 admission / reset | 未记录的尝试；同一阶段局部修补不加 start |
| W_waste | 暴露改动规模、撤销模块/authority | 实际废弃代码比例、投入小时，全部 UNKNOWN |

Bridge 10-12 至10-19、routing 文档从9-24至10-03、cancel 10-13至10-21仅是日历窗口。期间可能并行别的任务或无人运行，不能写成“用户等了七/九/八天”。

## 敏感性：什么结论无需假概率，什么不能下结论

| 场景假设 | 稳定的证据判断 | 仍敏感的选择 |
| --- | --- | --- |
| 返工损失低 / 中 / 高 | reader 隔离不支持、Hook process failure 放行都是真实前提问题 | probe 具体预算、多少旁路场景值得测 |
| 第二设计检出率悲观 / 中性 / 乐观 | 与真实 runtime 核验不是同一证据；一致设计仍可能共享前提 | 一个还是两个/三个完整设计者的净收益 |
| Asteria维护成本低 / 中 / 高 | owner/payload/anchor 缺失适合结构核对 | 全图维护粒度、S/M任务是否值得建完整图 |
| Work 盲区收益低 / 中 / 高 | 原始 TODO/真实旅程确实含被当前包遗漏的能力 | 是否每个 L/XL都配 Work |
| probe 成本低 / 中 / 高 | 科学/安全关键事实不能被无证据 PASS 替代 | 先文档事实查证还是直接实验，以及批准隔离后是否延后 |
| 新需求频率低 / 中 / 高 | routing v0.2 的新增范围不能归因旧遗漏 | 总返工可降低多少，稳定范围能维持多久 |

没有给 p/q/L/R/c 伪造准确数。若未来要用期望信息价值，必须分别标出 OBSERVED cost、ASSUMED损失区间、UNKNOWN检出/改变决策概率；使用宽范围并报告推荐翻转区间。若选择对某未知量极敏感，先测该量。**本轮无法识别任何完整协议相对基线的因果平均增益。**

## 校准时最低可用的记录

每个任务保存：原始输入 hash、范围版本、调用角色及起止时间、可见输入、事件/决定、用户触点原因、freeze identity、probe 预算与实际结果、实施 admission、返回设计原因、作废/复用任务量、最终真实验收。记录 reviewer 看到了什么，比只记录 PASS 更有用。

按软件 UI、科研算法、强 runtime、安全执行、artifact 产品分层；同时收集成功无需返修的任务，避免本样本事故选择偏差。以同需求/同预算或相同人工时间约束比较，而非以报告数量比较。


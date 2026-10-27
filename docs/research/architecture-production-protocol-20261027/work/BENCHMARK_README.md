# 历史 benchmark 使用说明

## 本轮到底执行了什么

执行了真实 Git 历史/文件/补丁回读、精确时点抽取、跨版本差异归因与反事实分析；未执行随机多模型 A/B、未重跑远端生产 Hook/Slurm、未做新的数学计算实验。用户任务和本研究者已知道事故结局，故 **所有反事实均为 RETROSPECTIVE_ANALYSIS，不称严格盲测**。

[BENCHMARK_DATA.json](BENCHMARK_DATA.json) 含53事件、时点输入与结果目标、判定状态和证据索引；[SOURCES.json](SOURCES.json) 给出 repo/ref/path/blob；[COMMIT_TIMELINE.json](COMMIT_TIMELINE.json) 给出历史提交与抽样补丁规模。文件集合是后续独立重放的可用种子，不是已测算法排行榜。

## 已实际回读的时点

| ID | 历史输入 | 隐藏结果 / 任务 | 限制 |
| --- | --- | --- | --- |
| T01 | Bridge 初次 execution v0.2 @3e0370c | 原 TODO 对正常入口/进度 owner 的闭合 | 初次 execution PASS独立记录不足；需同 ref 扩展原需求才做完整原貌回放 |
| T02 | Bridge v0.8 @bbd14ce | reader runtime isolation/readback | 后续35a976e PASS批准该包；本研究已知结果，未重跑 canary |
| T03 | Slurm v2.1 execution @c3879065 | linked-worktree真实 Hook discovery | 历史 Phase0确实提前阻断实施；正例 |
| T04 | routing v0.6 @ad3e6098 | timezone/DST、真实 owner/occurrence | 已有timezone字段；不是看到字段就预测全部后续实现bug |
| T05 | STAT原 READY @c4885af | literal edges、handoff/module/identity | 撤回前精确历史文件；完整包需按原同 ref拉取 |
| T06 | Mica ROADMAP+contract @af3cdc9 | UI来源/login/capture/replay | 和用户汇总中的完整聊天审查不能等同 |
| T07 | failed cancel installer/result @1b8df2c | loaderfailure是否变成有效deny | 候选里已有兼容Python修补，不能假装“完全没检查runtime” |
| T08 | Asteria历史RC8 gate | 用户真实交互/整屏质量 | 当前固定ref保存的历史文档，未证明整个旧应用artifact可复现 |
| T09 | CAT解析probe与R6冻结记录 | shared approximation与有限范围停止 | 结果知情的诊断fixture，非无泄漏前快照 |

精确 SHA 与 blob、输入 allowlist、outcome IDs 在 JSON。T01–T07 是已回读的旧 Git 输入，但并不宣称其最小文件 allowlist 就代表当时所有信息；缺少的同 ref材料须先冻结补充。T08/T09 明确不是严格时间隔离输入。

## 如何进行下一轮真正盲测

由不参与作答的 curator 按时点冻结输入包、路径白名单与 hash；遮蔽后续结果、当前 main、版本名字暗示和本报告。初始只给当时已存在的要求/TODO/代码/设计；如果允许技术调查，使用当时 runtime 或明确记录模拟差异。无法还原 runtime 时只能测试“是否请求正确 probe”，不能计作实际检出漏洞。

同一时点分别评估：传统 Planner–Critic、结构化自查、独立盲区调查、第二独立设计、针对性事实/probe、实施者 dry-run，以及预注册组合。预算可以匹配总模型成本，也可匹配关键路径等待；两种答案不同，应分别报告。1/2/3完整设计者、核心不可逆决策先行/完整设计先行，均是待测条件，不在本轮虚构结果。

每个作答须冻结：
- 具体发现及原始输入依据；
- 缺失的是设计、现实事实还是实现错误；
- 最少能改变决定的行动与所需授权；
- 能否冻结、冻结范围及剩余明确问题；
- 唯一下一执行者及可发送的任务；
- 哪些发现必须返回架构、哪些只需局部修复。

这只是被测输出合同，不规定每次必须把所有角色跑一遍。

## 结果评分与防作弊

重大检出必须在隐藏结果揭示前定位机制/影响/可验证命题；“多测一点”“可能有bug”“全部不可冻结”不算命中。probe请求要精确到同一入口/环境/失败方式/预期观察，不能事后靠宽泛愿望领取功劳。

分别记录 Freeze 前/后重大缺口、无关/过度处方 finding、decision-changing finding、正确停止、用户协调触点、串行依赖、AI调用/成本、实施 admission、implementation→design、影响组件与废弃工作代理、D_codex。没有真实执行的臂不能填运行结果。

必须保留正控制：
- SR02 新需求不追责旧设计；
- BK16 managed marker bug只需局部实现修复；
- C02 子范围冻结不因future blocker无限等待；
- M02 纯优先级调整不自动加Critic；
- D01 纯设计不强求伪造实现证据；
- SC12 保护同时保持无关命令正常；
- SC13 豁免不写成实测通过。

否则一个总是拒绝冻结的模型也能伪装“抓住所有问题”。

## 对未来协议的可证伪预测

后续 Pro 的协议应把以下指标和适用类别说清，才能由本数据检验：

1. BK06/BK08/V01 类显性结构缺口更多由设计阶段自查发现。
2. BK13/SC07 类致命现实假设在大实施之前被证实或否证。
3. M01/D02 类共同盲点不能只靠“两设计一致”宣布关闭。
4. SR06–09/BK16/SC10 类实现bug不被系统升级成全局架构重置。
5. C01 类科学问题由有能力的数学/实验路径解决，不交 Codex临时决定。
6. implementation→design、用户重复解释、核心reset和受影响组件范围下降，同时正确冻结率不下降。
7. 下一动作给唯一责任人；Work证据研究本身不越权给最终架构裁决。

若某协议只提高报告数、PASS数、execution package数量，或者降低G_gap的方法是永久不实施，它没有击败baseline。

## 无法回答的比较

本轮不能给出某协议节省百分比、最优N_design、Work平均检出率、第三Pro边际收益、Asteria维护工时、用户等待下降或作废代码比例。下一轮必须收集成功任务及真实成本，校准假设，并预注册更新条件。普通追问不构成改变已登记方法的证据。


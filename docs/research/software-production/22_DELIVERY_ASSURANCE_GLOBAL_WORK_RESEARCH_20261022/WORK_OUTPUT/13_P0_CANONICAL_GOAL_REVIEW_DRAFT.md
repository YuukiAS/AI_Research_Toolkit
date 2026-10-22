# Canonical Goal 审查草稿：P0 当前 Windows CLI 宿主能力

`STATUS=DRAFT` · `AUTHORIZATION=NOT_AUTHORIZED` · `READY_FOR_CODEX=NO`

用户仅批准把目标/启动范围草稿保存到 GitHub 供独立 Critic 审查，**未批准执行**。这份文件没有创建或启动 Codex Goal；不得自行读取后执行。它是同一任务既有 P0 阶段的有界目标，不是新增研究版本或工作流。

## 1. 固定对象与目标

- task_key：`software-production--delivery-assurance`
- stage：既有 `P0`；本次只取 **当前 Windows 非交互 CLI / 精确 session 恢复** 单元。
- Proposal/Plan：[02](02_ARCHITECTURE_AND_COMPONENTS.md)、[03](03_END_TO_END_EXECUTION_AND_VALIDATORS.md)、[06](06_IMPLEMENTATION_AND_EVALUATION.md)、[12](12_STAGED_EXECUTION_REVIEW_PACKAGE.md)；同一固定包中的[14](14_P0_KICKOFF_REVIEW_DRAFT.md)绑定授权范围。
- 研究仓/分支：`YuukiAS/AI_Research_Toolkit:research/software-production-decision-20261013`；仅允许该分支原 WORK_OUTPUT 中 P0 报告及 CURRENT 研究进度写入。
- 执行 host：当前本地 Windows，`hostId=local`；不 SSH，不创建远程任务。
- fixture 唯一绝对根：`C:\Users\humc2\Documents\Codex\2026-10-22\delivery-assurance-delivery-assurance-critic-github\work\delivery-assurance-p0`。当前只读检查它不存在，尚未创建。
- 当前命令解析的首选 executable：`C:\Users\humc2\AppData\Local\OpenAI\Codex\bin\codex.exe`；本轮只读文件 SHA-256：`DD4ADF302B112FDC30FCE509A5E261A0A6F1118DC58AC2DA636EB84E0A6B3E3E`。未执行该文件，未取得运行版本。这是文件定位，不是 P0 通过。
- 同机另一个版本目录可执行文件存在，但不自动切换到它，不把它当当前 Desktop runtime。开始时 hash 不符则记录版本漂移并返回 Planner 更新本P0绑定，不猜版本或升级软件。
- 只读源码参照：Bridge release `ba9013b9fbbd242e51b09f9d09291f417df17652`，dev `82ae7c855240f4936b05b1417f78fd2bd799c5a2`；本机 `D:\Code\GPT_Codex_AI_Bridge_Kit` 当前 main/6bbaca5，仅只读，不拉取、不切分支、不运行该旧 checkout 的产品命令。

**完成目标：** 在上述单一 fixture 与当前 Codex 身份中，给出可以从原始事件独立复核的 H1–H8 支持/不支持矩阵、精确恢复和副作用边界，按既定表生成 route 建议；不实施 da/2 或任何产品。真实不支持也可以完成本次测量目标，但不能完成 DA，也不能据此启用相关承诺。

Windows Desktop、交互式 CLI 与 Remote 均单列 NOT_TESTED；不能从 `codex exec` 推断这些入口。它们的原 P0 合同完整保留，未来须在精确获权环境补测。选择此最小单元，是为了先用一个有限本机过程测最便宜的高风险假设，不创建新的 Desktop 用户任务或远程控制面。

## 2. 准备与合法效果

正式获权后，执行者在**同一获权维护任务**建立该 fixture，仅写无敏感 canary、输入、schema、事件桩、计数器、输出及项目级 Hook/AGENTS。普通非Git目录使用安装版本确实支持的 `--skip-git-repo-check`；固定官方源码 [exec cli.rs](https://github.com/openai/codex/blob/b4ad33d1a3c10c9652dd57f7afd7a949f8f26895/codex-rs/exec/src/cli.rs#L35)有该参数，但安装版仍需实际确认。参数不支持则记不支持，**不创建临时Git分支、不升级CLI、不换目录规避**。

本单元的调用形状已选：同一个固定binary以 `--ask-for-approval never exec --json --sandbox workspace-write --skip-git-repo-check -C <上述唯一fixture根> --output-schema <fixture内probe_response.schema.json> -` 读取无敏感stdin；精确resume仍用该binary、相同目录/权限/JSONL配置，传真实session ID，不用--last。只读工具边界子阶段使用read-only权限，不能因拒绝而提权。参数名称以冻结源码为依据；安装版不支持时记录UNSUPPORTED，不更换入口或放宽sandbox。该段是审查用调用合同，本轮没有运行。

先做静态配置/权限检查：只记录当前 CODEX_HOME 位置、provider 类别与必要非敏感配置，沿当前用户正常登录。不得读取/输出 token、认证文件内容、私有会话历史；不得更换 CODEX_HOME、账户或 provider。若配置会额外启动未获权外部工具/连接器、写到 fixture 外，且现有受支持的**仅本进程/项目级**工具限制不能排除，停止模型启动并记录该边界；不改全局安全规则。

这里最多允许未来授权中的 **一条新 CLI fixture 会话**及该精确 ID 的 resume；这是被测对象，非通用 Reviewer agent。原父任务保存/消费输出。没有新 app task、subagent、fork、handoff、schedule、daemon。正常 Hook 信任若需要用户确认，仅针对本 fixture 的正常信任项；不得绕过信任或把未信任当已执行。该项获权文本须由最终短 handoff 明确携带，不从当前研究授权推导。

## 3. 测量顺序与判据

以06 H1–H8为权威，使用同一 fixture 会话分段进行；机械桩能覆盖的异常不占用额外模型会话。

1. **H1身份。** 记录实际 executable hash/运行版本、OS、入口、CODEX_HOME位置、会话ID与原父PID启动身份。不能用源码SHA替代运行版本。
2. **H2正常与信任。** 项目级事件记录器从当前入口出现实际事件；未信任、信任、禁用、移除及定义变动分别记录。恢复后须有正向事件。若该入口不发某事件，写OBSERVED_UNSUPPORTED，不能用调用stub代替。
3. **H3错误输出。** 机械桩返回合法block、空reason、非法JSON和有界超时；记录真实host反应。合成正式出口缺证必须拒绝，不伪称尚未实现的Bridge已强制拒绝。
4. **H4同任务继续。** fixture普通请求先产生错误canary，合法Stop反馈含原expected/actual和feedback ID；无需用户输入“继续”，同session后续回合应修好并ACK。宿主不继续就判该能力不支持。
5. **H5精确恢复。** 读取实际JSONL的thread.started和最终结构化输出，对同一ID恢复；错ID/缺ID只在父解析/验证边界注入，不得尝试打开用户其它会话。禁止--last、新session补数和旧结果拼接。
6. **H6实际加载。** 项目AGENTS/技能canary A→B后，分别保存后续输出/动作与是否显式读取的证据；自动reload和显式读取分开判定。不能声称编辑一个文件就证明自动生效。
7. **H7取消/父退出。** 仅对fixture启动的准确PID/进程启动身份实施有界取消与父退出。保存cancel_epoch与恢复点，之后不再launch。不能按进程名停止用户其它进程。
8. **H8不重复效果。** fixture effect_id的原子计数器只可0→1；重复反馈、父/Hook同时接收、效果前后崩溃后先核已有记录。未知则停止，不盲重放。原父进程不持短mutex等待child ACK。

只读工具边界可以在这条fixture会话的只读子阶段用无敏感目标验证，失败即记录不支持；这不是完整专业独立审查的证据。真实原项目Reviewer的隔离、全输入、启动/返回和实际消费者仍须P2/首次绑定单独验，不新开通用agent来完成P0。

H4/H5成功不证明产品修复；H8计数器成功不证明任意外部API exactly-once；合成出口拒绝不证明未来七仓正常host必然拒绝。这些边界必须出现在报告里。

## 4. 预算与不可越过的边界

本单元最大工程投入 **4小时**，实际CLI探针累计墙钟 **45分钟**；最多 **6个模型回合＋2个定向复验回合**，全部计入原P0三host总24回合与4–8小时估算，不额外叠加。父/Hook共享计数；达到任何上限保存事实并停止，不另建task重置。

模型仅使用未来明确获权的当前Codex现有额度，不调用独立计费API、不购买额度、不更改模型/provider。开始前无法确认是该许可范围就不启动。机械stub无输出目标≤2秒；故意超时例只使用有限短等待。无长期进程、定时器、网络服务或GPU。

禁止生产源码/配置修改；七仓产品、GUI、真实账户、远端SSH/隧道、Slurm/Docker/GPU、设备、数据库、Vault、邮件、部署/发布全部0。禁止git pull/checkout/branch/remote/force/reset/stash/clean操作。不得运行Bridge相邻已写Goal或付费Text Transform。

## 5. 结果、接收与停止

本机raw留fixture；只把必要脱敏结果通过已有GitHub写入面提交到**原研究分支**的：
- `WORK_OUTPUT/15_P0_HOST_PROBE_REPORT.md`
- `WORK_OUTPUT/15_P0_HOST_PROBE_RESULTS.json`
- `WORK_OUTPUT/CURRENT.md` 的P0进度/恢复点。

上述15文件是**未来输出约定，目前不存在**。不得上传会话历史、配置全文、token或其它私有材料。正式执行应每次写后读回；不改03/04冻结合同、不自签DA启用。

每个能力行至少含host/entry、binary hash/version、fixture/session身份、状态、raw refs、观察到什么/未观察到什么、route及原因、预算/取消/恢复信息。状态用OBSERVED_SUPPORTED、OBSERVED_UNSUPPORTED、NOT_TESTED；不创造任务状态机。Desktop/Remote及未运行单元必须明确NOT_TESTED。

原维护任务消费CLI结果、出具报告，再交**当前长期Planner**按06固定路线表裁决。没有活跃父进程则原任务恢复时先读会话/计数器/取消点；不自动唤醒，不运行P1/P2。若实测迫使改变冻结产品承诺、权限或恢复路线，回同一独立Critic；纯实现/观测错误在本目标预算内修，不开新研究。

完成本目标需：所有计划单元有真实证据或精准不能运行原因；正向与危险边界不混用；原始证据可核、账目完整、fixture作用恢复；报告写回并读回。不得用“文件齐了”替代实际测量。环境真正阻塞且未完成这些条件时，明确目标未完成及精确恢复位置。

## 6. 回滚

运行前为将改的fixture项目配置保留存在性、原字节和hash；退出时只恢复这些文件/本次信任项，并验证恢复。新建fixture证据可保留，不默认递归删除。任何清理先核绝对路径属于唯一fixture根、无junction逃逸；不能移走或删除用户其它目录。

取消/父退出只作用于本次PID启动身份；仍有孤立进程时先只读核实归属与已授权停止范围。无权恢复全局变更说明探针越界，必须如实报告，不扩大权限“修干净”。原生产检查、产品数据和网络配置保持未触碰。

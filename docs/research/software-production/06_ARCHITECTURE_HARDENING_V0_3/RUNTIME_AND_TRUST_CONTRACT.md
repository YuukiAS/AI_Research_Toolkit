# 研工台 v0.3：日常可运行路径、各角色权力与可信结果合同

性质：设计合同，**没有对应已实现的研工台命令**。本文必须和 DECISION_AND_FAILURE_ATTACKS.md、六仓库原始证据一同看。正常执行入口是否真的存在，要在将来的有界试点逐一验证；不把接口草案当已经安装。

## 1. 一项任务怎样真正进来

第一版接受三类合法入口：

1. 用户直接在已安装的 Codex/Bridge 对该仓库给出目标；对应任务继续按项目现有 AGENTS、批准 Goal 和工作树运行。
2. 若项目使用 Bridge Reviewed 或 Control，任务推进权属于其既有 Controller/CURRENT/角色机制；研工台只是它主动调用的质量/产品能力工具，交还不可伪造的执行结果；**研工台绝不自写 CURRENT 或建立并行 watcher**。
3. Lite 或没有项目级 Controller 的普通任务，才研究一个可安装的有界本地命令执行器，核对并调用当前实际支持的 Codex CLI/SDK。没有经过验证的主机、登录和授权，不能宣称自然语言已自动触发它。

用户界面第一版应能从现有 ChatGPT 对话、当前项目任务和 GitHub 检查链接看到：本次真正新增了什么、哪个能力未验证、下一项由哪个 owner 执行、是否真需要用户决策。GitHub 任务页只是展示，不是第二个任务状态数据库。

## 2. 三种现有 Bridge 模式怎样接，不复制职责

| 项目模式 | 唯一任务阶段所有者 | 研工台实际允许做的事情 | 禁止的事情 |
|---|---|---|---|
| Lite／项目普通任务 | 项目当前 Goal 与实际 Codex 会话；未来可由单次有界驱动器调度 | 选择项目已有检查、验证观察器、整理声明结果、发回真实失败，调用已授权 Codex 继续 | 不自动安装 Reviewed/Control；不新建与旧 Goal 竞争的任务 |
| Reviewed | Bridge Reviewed Controller + CURRENT，Planner→Executor→Reviewer 既有合同 | 在 Executor 自检或已有 Reviewer 对应阶段作为一个具体检查工具；输出结果供正式 Controller 消费 | 不重写 CURRENT、不新增独立 Final Critic、不多开第2 watcher；不能从 result 文件自行“推进”任务 |
| Control | Bridge Control Controller/Verifier/Executor/独立审查既有合同 | 为其真正的 Verifier 提供产品行为、测量校准和完整产物证据，并由原 Verifier 决定对应用户能力 | 不平行建立第二个 Requirement Ledger、证据图或重复的最终审查状态 |
| 持久执行（以上任一） | 原目标已授权的真实进程/调度或 Bridge Persistent Run 的宿主 | 观察进程、权限和项目原生检查点，汇报恢复准备情况 | 不把 thread ID 当运行中进程；不因长任务默认新装 tmux／daemon |

**接入可达性仍是待证问题**：Bridge 已有任务模板不必然自动调用新包。因此首版需要只读枚举现有消费者何时实际运行这些检查；不能只把研工台引用写进 AGENTS 就宣称接入完成。若无法在原阶段调用产品质量，必须把它列为产品质量检查缺口而非静默另开工作流。

## 3. 具体能力包及最小输入输出

路径仅供未来工程布局参考，使用 TypeScript 还是复用原 Python 实现，必须以实际入口为准：

| 拟议能力 | 输入 | 输出 | 不满足时的准确处理 |
|---|---|---|---|
| 任务/范围解释器 | 当前用户要求、实际 Goal、产品权威、已接受行为、有效分支 | 目标用户操作集合、依赖路径、保护旧能力、授权定位 | 歧义交 Planner；执行者不能缩小原功能集 |
| 设计消费者 | 有效 Figma／产品系统、状态、主要使用路径、实际首个原型 | 设计实现目标与实际渲染偏差、具体设计/实现归因 | 设计不成立退回设计；无需 UI 设计的任务跳过 |
| 检查计划选择器 | 被批准声明、依赖闭包、实际 Git 影响、历史故障、交付类型 | 明确本次必需的产品场景、状态和现有脚本/版本集合 | 必需场景无实际执行能力标未验证，不选容易的替代场景 |
| 项目观察适配器 | 安全运行环境、精确产品包、场景输入、可触发的正式 UI/服务入口 | 原始动作、实际后置状态、身份、截图/DOM/持久化/服务结果与完整日志 | 断言失败是产品或工具/环境待归因；证据缺失不能造 PASS |
| 测量校准器 | 真实正常样本、可定位历史坏样本、缺失/损坏观察例、观察器源码版本 | “对本性质可用/失效/覆盖不足”的有限裁决 | 错观察器取消该性质的验收资格，修工具而非修产品 |
| 声明与证据核对器 | 任务批准的声明、必需场景集合、原始执行结果、最终包身份、独立审查 | 每项可证明用户能力及其范围，未测/失败/过期/由谁观测 | 不接受自报 P1=0、哈希自洽、退出0、截图存在单独作为正式产品结论 |
| 有界失败分流 | 实际失败步骤、当前差异、此前根因与尝试、合法资源预算 | 实现/设计/测试器/身份/环境/权限/外部依赖负责人、可恢复事实 | 同因无新增证据停止盲跑，保留原任务；未知高风险效果先对账 |
| 交付核对器 | 已批准目标、独立验收、目标分支/网页/安装真实状态、授权 | 允许交付、尚未证明、权限阻塞、已满足无需操作 | 不替产品发布器新造另一套 installer；无强制权限只能审计模式 |

**程序只能执行明确的工具能力，不得从任务正文、证据包或未可信 PR 中执行任意命令。** 所有真实高权限动作必须由符合授权的现有执行者负责。

## 4. 每项功能必须有的最小可观察单位

避免几十页“需求账本”。从已有批准任务派生临时的用户能力描述即可：

~~~yaml
feature:
  authority: "<批准过的当前任务链接与版本>"
  user_entry: "<真实可点击/可调用入口>"
  valid_inputs: "<正常输入及变化输入族>"
  result: "<最终用户能观察的正确结果>"
  adverse_and_cancel: "<异常、取消和恢复结果>"
  persistence_or_reentry: "<必要的重新进入结果>"
  external_dependency: "<真实服务/数据来源及合法权限边界>"
  protected_existing_behaviors: "<实际旧场景及批准来源>"
  excludes: "<合法排除项，不是 تنفيذ者单方面删题>"
  delivery: "<本次需到达的实际安装/部署/源码交付对象>"
~~~

例：Lucerna 增加用量提醒，不是“增加设置界面”，而是配置阈值→真实用量读取→阈值触发→通知抑制重复→取消/错误→重开保留；既有 Longleaf/其他资源状态不回归。Mica 增加高亮不只是“不会干扰 ChatGPT”，还必须对合法答案在真实宿主成功高亮/恢复。Asteria 图形必须能实际读科学关系，低碰撞计数不能代替。

领域模型/Planner 决定具体语义；程序只核对内容有没有对应测试/观察。不能因为 YAML 所有字段非空就宣称需求正确。

## 5. 真实检查裁决：必须检查执行而非单个 PASS 字段

拟议检查流程：

~~~text
Input: approvedClaims, approvedMustRunSet, candidate, originalObservations,
       acceptedVerifierRevision, platformEnvironment, humanReviewIfRequired

For each required user capability:
  1. source/version is currently approved? otherwise WAIT_FOR_DESIGN_OR_AUTHORITY
  2. observer for this claim actually calibrated? otherwise OBSERVER_UNVERIFIED
  3. exact candidate ran required normal user entry? otherwise NOT_EXECUTED
  4. matching original inputs/actions/postconditions exist? otherwise COVERAGE_GAP
  5. behavior failed? otherwise distinguish PRODUCT_FAILURE or OBSERVER_FAILURE
  6. old behavior regression still protected? otherwise NOT_VERIFIED
  7. if qualitative claim: was actual complete artifact reviewed? otherwise REVIEW_PENDING
  8. if external service: does evidence class reach claimed live ability? otherwise PARTIAL

For release:
  verify every applicable requirement had a real run,
  verify source/check origin is trusted and candidate identity matches,
  verify no required job was skipped or succeeded merely by a dependent skip,
  verify requested delivery target and authority are still valid,
  inspect actual target before external effects,
  only then permit its existing authorized publisher.
~~~

“未执行”和“执行失败”不能都归产品失败；“跳过但状态成功”不能归真实验证成功。某检查确实不适用，必须有早于最终评分/经过批准的排除原因。不让 Codex 随候选重新定义必需检查清单。

**三个信任等级**：

- 内部开发：使用仓库脚本与开发身份，完成便宜测试和生产者首轮 QA；可指导开发，不给强制发行资格。
- 独立审计：读取已批准的检查和完整产物，由与开发者职责区分的实际观察/审查者得出结果；可能仍共享仓库管理员权限，不能宣称技术防绕过。
- 强制准入：开发身份在实际权限上无法修改必需验收版本、真实验证器、结果签发者和发布凭据；且通过同名检查、skip、恶意构建、错误包等真实反面测试。缺其中一项不得宣称强制。

GitHub 正式文档明确：按条件被跳过的必需 job 可能报告 Success；有仓库写权限可写 commit statuses；需核对指定 App 源及真实规则。不能只使用绿色汇总作为裁决。高权限 pull_request_target / workflow_run 不得直接执行不可信候选或下载并执行其文件。

## 6. 观察器的可信校准，不引入“合成指标比赛”

每一种检查声称检测的真实性质，在加入发行准入前必须证明：

- 正常反例：曾经能够正确使用的功能真实可过，而不是测试器总失败。
- 已知坏例：对应原真实事故的输入/页面/状态会失败，或者若危险无法重现则准确说明缺少证据。
- 缺测例：删掉观察器应该测的输入、输出、截图或状态，不得自动生成零/空成功。
- 证明范围：是否真实用户入口，实际设备/浏览器/服务与候选身份，对真实不能观察的方面主动注明缺口。

已证明 Asteria 的部分交叉/标签指标恒零，这类指标在修复前不得用于证明该性质无问题；不能因正好通过另一个路线长度指标就称整体图形合格。SeminarArc OCR 夹具读取错误属于观察器假阴性，不能为迎合测试器而破坏真实算法。Mica 已有“坏证据包”控制，需要补实际坏实现从宿主用户路径被检测的能力。

## 7. 审美与产品质量：必须提前、完整、可操作

不能再依赖“先跑完全部测试，最后再让 GPT Work 看一眼”。对有实际界面变化的较大功能采用：

- 开发前设计：负责人真实消费当前 Figma/产品系统，确认一屏信息层级、用户动作、正常/空/异常/加载状态、跨设备关键变体。
- 首个原型阶段：Codex 在专用隔离的真实浏览器/桌面/扩展/模拟器运行出整屏，生产者实际操作并检查；若布局架构方向错误立即返回设计，而非继续铺代码。
- 候选稳定阶段：专业 Reviewer 在看到完整实际画面、连续交互、相关错误状态和与权威设计比较后审查。应包含可定位未知缺陷，不是只核对之前 P1 关闭。
- 合格后的终审：按仓库实际合同调用 GPT Work/独立最终角色；若没有真实已连接的审查入口，诚实等待，不反复用同一个 Codex 伪独立评审。

静态截图不是动作因果证明；具体的坐标/文字截断、焦点和状态错可以机器检查，但整体审美与科学易读性不能靠一个“漂亮分数”实现全自动。历史被用户否决的 Asteria RC8 与 Bobbio Reader 错屏应作为专业审查校准负例，不是把旧失败全部机械升级为阻塞。

## 8. 同一任务内返修和不重做

一次交办不承诺第一版无 bug，但承诺凡执行者有权、安全可测的基本问题，先在内部同任务发现和修复，而不是让用户成为初次验收员。

恢复时读取 **原任务、当前进程/机器、Git 工作树、真实构建/部署、审核版本、外部效果、授权**。只有实际执行仍存在才显示正在执行；没有主机不承诺后台继续。

对同一根因没有新增事实，停止重复昂贵检查并转根因分析；不能通过换任务名、版本号、新检查器把失败计数清零。局部工具出错先修工具，不把它误作产品需要重写。已安装版本符合要求时不再次安装；一次性票据已消费不再尝试。

为保护轻量性，小文案只跑相关目标 UI；新功能跑完整路径及相关旧行为；共享状态、凭据、数据迁移扩大回归；正式发行核对精确包和真实目标。没有固定“每次强制 N 个角色/N 份报告/N 轮 Work”。

## 9. 实际 Skill／Plugin 没有被加载的反复故障

用户担忧的“明明有 Frontend Design、领域插件和 workflow-core，Codex 仍然做出低配产品”，不能用再加一条请读取技能的文字解决。

对需要专业角色的任务，接入程序应在**发起该次执行之前**确认当前执行主机、当前 CODEX_HOME、可用技能入口及实际版本；实际调用后核对该能力是否真正被读取和用于设计/实现，再以运行产物确认其影响。如果插件在已运行的旧会话中不存在，不能凭仓库文件显示“安装了插件”。仅有调用记录仍不能证明专业正确，必须由相应产品质量检查验证设计是否真正改进。

已经存在的 Bridge plugin-replay 可作为获授权条件下测试“插件是否在当前 Codex 身份被实际消费”的特定入口；不能把它当作可自动运行六产品、操作原生桌面或发布的万能 QA。未接入则该项标为“专业能力消费未验证”，不能假装 Frontend Design 已实际参与。

**反例**：Codex 没读正式 Figma/Frontend Design、直接生成普通卡片布局。即使产物里有设计术语，也必须由真实源的实际读取证据与首个整屏原型对照发现；若旧规则写过而调用路径没有加载，应修安装/调用者，不再复制第 N 份同义 AGENTS。

## 9. 实施之前需要实际核对的入口清单

这些还不是已完成条件，后续经批准的最小试点须提供直接证据：

1. 本机已安装 Codex 及其合法启动/恢复/事件入口，实际 CODEX_HOME，是否可复用当前订阅或产生额外费用。
2. 目标项目究竟使用 Lite、Reviewed、Control 还是自有状态机，谁是真正的任务阶段所有者。
3. 哪个消费者将研工台的检查结果纳入已有 Controller/Verifier/Reviewer 阶段；只写“应消费”不能算接通。
4. 是否真有能看实际应用的内部 Reviewer 及有权限的运行环境；没有则不声称独立质量通过。
5. 六仓库原有脚本的实际参数、退出码、跳过语义、设备/数据/外部副作用和对应用户路径。
6. GitHub 私有/公开仓库当前可用的身份隔离、分支保护和发布权限，不以官方文档假定用户配置已生效。
7. 运行证据可否绑定最终构建/签名/安装/部署目标；不能只凭候选包自行填写来源。
8. 真正的授权与不可逆影响范围，不涉及本任务的私有资料/账号/外部接口不得自动触碰。

## 10. 当前结论

上述是实际可实施的职责合同，不是系统已运行证明。v0.2 的六仓库事故账本仍作为原始来源，v0.3 对其“必须新建独立监督程序”的单点假设作了实质修正。若这些接口最终只能靠 Codex 自觉读文档，则 v0.3 自身也应被否定；如果产品质量和真实执行缺口必须靠另一套同等复杂的数据库/状态机才能补，应该先复用成熟工具或收缩目标。

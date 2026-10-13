# Lucerna端到端实例：新增R2使用量提醒，并避免01055重演

2026-10-13，设计演练，**没有向Lucerna提交功能代码，也没有读用户真实Cloudflare凭据或运行Windows桌面**。当前检视源码：Lucerna main 的 src-tauri/src/cloudflare_r2.rs，blob 7c0bdeedc926de02adb165b4a20032c2e676f249；scripts/development-acceptance.ps1，blob 2c4ebefff98fc5e630f5a17a1f177fd2d4a65e36；docs/workflows/LUCERNA_EXECUTION_FAILURE_HISTORY.md，blob 89a73fae28905d1aed98aad39177ef5c914d1dda。示例功能、阈值、提醒行为**不是用户已经批准的新产品目标**。

## 1. 当前代码是什么，不能再重造什么

实际 CloudflareR2Provider::refresh 已读本机已保存配置，从 WindowsCredentialStore 读token，经fetch_state拉取Cloudflare R2 metrics/buckets/operations。CloudflareR2State提供storage_bytes、object_count、class_a_requests、class_b_requests及三个 Option<u8> 免费档使用百分比，并含observed_at、source、state、status、billable_usage。无配置有not_configured_state，无token及鉴权故障有needs_sign_in_state。fetch_state对operations失败保留未知状态；parse_current_stored_metrics特别注明缺失分支不可补成0。save_setup_transaction已有失败回滚。

所以主实现不得另外做一套R2接入、读取系统代理、展示虚构账户，也不能把可选使用量None变成0%、把网络/鉴权错误变成“健康”。新功能要与现有提供方、聚合、UI和通知接合；哪里已有公共通知/持久化实现须在目标分支确认，**当前材料未证明某个新通知API已经存在**。

## 2. 假设一次任务：按可用R2指标，在达到用户设置比例时提醒

这是用于验证架构的具体产品案例。假设用户批准“可配置使用量提醒，避免重复提醒，错误与缺值如实展示”。以下80%只是示例测试阈值，不是正式产品决定，也不是Cloudflare计费规则承诺。具体是哪个免费档、如何抖动去重、何时重置，必须在设计时按用户同意的语义定义，不能让执行者随手硬编码为只对演示数据适用。

一次任务真正需要三类结果：
- 功能正例：真实提供方状态中的有效指标满足配置，经过正式聚合/UI/通知路径，用户得到一次正确提醒；之后值持续越限不反复通知。
- 状态和动作正例：缺测/鉴权/过期/网络失败保留诚实状态；取消不保存、保存并重启后保持；其它提供方和正常托盘行为不回归。
- 最终体验：正常正式程序，无开发夹具残留，首次真实画面已经简洁、状态一致，现有服务不被新功能挤掉。

## 3. 谁派发哪些实际进程：不是交给主Codex一句“调用插件”

~~~mermaid
sequenceDiagram
    participant Entry as 已获授权任务入口
    participant Design as 专业设计职责（现有插件）
    participant Main as 主Codex
    participant Sub1 as 子代理：规则/去重
    participant Sub2 as 子代理：设置/文案
    participant Win as 独立Windows观察器
    participant Review as 已有合法审查者
    Entry->>Design: 目标+现有托盘/真实R2源码
    Design-->>Entry: 最小交互与文案责任，不创造新服务层
    Entry->>Main: 原Goal、已接受行为、约束、代码工作树
    Main->>Sub1: 纯规则与开发测试，限定独立文件
    Main->>Sub2: 设置组件与文案，限定不冲突文件
    Sub1-->>Main: 变更与开发测试
    Sub2-->>Main: 变更与开发测试
    Main->>Main: 将真实Provider、聚合、UI、通知、存储集成
    Main->>Win: 首条纵向路径及候选检查请求
    Win-->>Review: 实际输入、运行身份、后置状态和截图
    Review-->>Entry: 具体未闭合义务，或同一候选合格
    Entry->>Main: 本任务内部定向返修
~~~

这里的设计职责应从AI Skills当前安装内容真实解析；没有实际安装就不能记“设计插件调用成功”。主实现两位子代理仅作参考分工，文件冲突、任务不值得并行时主实现自行完成，独立审查必须由外层合法阶段启动。Bridge Reviewed或Control时由其原有Role拥有正式裁决，不能多装一套与其竞争的Reviewer。

## 4. 从第一次设计到到手release的实例追踪

| 时点与责任 | 必须实际交付/观察到什么 | 历史错误会怎样被挡住 |
|---|---|---|
| L0任务入口 | 读取已有R2实现/用户授权/有效Goal/现存旧功能；对照01055历史 | 不能先声称“不支持R2，要重写provider”；也不能误读旧临时停工限制 |
| L1设计与独立验收依据 | 用户可见提醒所需字段/操作、状态、去重与过期规则、旧服务回归；独立验收从源目标形成 | 只有通知图标没有任何用户受益正例，不能通过 |
| L2实施主Codex | 集成正规Provider::refresh→运行聚合→设置→通知→持久化；子代理结果自己合并 | 两个模块各自单测绿、实际相互不连，不能通过 |
| L3首条真路径与低成本审计 | 可控制的HTTP边界输入仍由正式R2 parser消费；实际组件状态传播，而非直接替换UI最终JSON | 无token变“正常0%”、operations异常变“健康”、只渲染mock会在扩大前暴露 |
| L4内部功能回归 | 阈值上下、缺值/网络/过期、重复拉取、保存/取消/重启、通知去重、已有提供方状态 | Cancel handler调用≠没有持久化；存储成功消息≠重启保持 |
| L5首次真正内部审美/动作QA | 主实现对实际程序完成托盘操作和完整画面审查，检查长文、首屏密度、焦点、状态/动作一致 | 01047/01055中应由Producer发现的重复状态、按钮与文案不再直接推给Work |
| L6候选固定与Windows独立观察 | source commit、release.exe SHA256、PID、frontend ready、同次截图与触发动作；必须是真实host/session | 125% CSS zoom测试不能谎报为原生125% DPI；旧进程/旧截图不能混入 |
| L7合法审查者 | 先形成独立整屏体验意见，再核历史P1是否关闭；同候选对应所有必需证据 | 不以“TODO已清零”“内部P1=0”的自报代真实观察 |
| L8定向返修与交付 | 只对变更的产品语义/相应场景重新跑；报告/截图传输修复不重装；真实live_state已验证才到GPT Work | 01033/01054多轮刷新/重构验收链不再成为默认功能开发方式 |
| L9规则维护 | 若已有AGENTS规则反复被忽略，检查实际读到哪条、谁能操作前台、验证是否正确发起；修调用/权限再整理文字 | 不能“再加一条不要抢用户桌面”却继续允许脚本抢桌面 |

## 5. 一个能立即判断是否在缩水的接口及测试切片

以下为设计接口示意，不是Lucerna现有函数：

~~~rust
// 在正式Provider数据经运行态有效性判定后，而不是在mock UI上判断
fn classify_r2_alert(metric: Option<u8>,
                     observation_fresh: bool,
                     configured_threshold: u8,
                     previous_delivered_episode: Option<AlertEpisode>)
                     -> AlertDecision;
~~~

约定正反例：Some(85)、fresh、阈值80、此前未提醒→触发；连续同类85→不重复；Some(0)→正常可判断；None→UNKNOWN，绝不能变0；stale→STALE，不充当本周期有效状态；Needs-sign-in不伪装usage=0；取消并重启设置不应变；新提醒出现时其他provider原有可见性不变。受控边界数据只证明数据映射；确认真实Cloudflare消费还须获准账号/真实响应观察。

举一个历史反例的真实用户路径：Longleaf的子服务已失败，但全局顶部显示“可用”。不能在检查脚本里直接构造“顶部应失败”并断言就算修好；应通过正式子状态入口产生失败→父提供方计算→daily/global summary→header与行动按钮，逐一记录实际值。**有P1时不能为了全绿把出错的子服务整块隐藏掉**。这条检查是状态传播，不应被“R2提醒逻辑单测通过”替代；同一候选至少跑本次影响的旧功能回归。

## 6. 原生运行不能继续打扰用户

Lucerna现有 scripts/development-acceptance.ps1 已提供 -Doctor、-SelfTest、-Mode S1/S2/S3、-ExpectedCandidateCommit、-RequireCommittedCandidate、真实exe哈希、smoke PID及capture同次绑定。已读取的S3核心代码会调用smoke-lucerna-close.ps1及capture-lucerna-window.ps1，检查release source_commit、PID、frontend-mounted readiness和截图元数据。**因此新流程的唯一工作是合法调用并正确消费已有脚本，不是发明新截图算法。**

具体规则：
1. 功能测试默认为后台，无权触碰用户现用桌面；批准的Windows测试机/隔离会话要有经实际验证的前台操作权。没有合法隔离时继续代码/后台测试，仅把原生观察标为未完成。
2. 稳定候选集中采有限场景；同一exe重复启动并不增加质量。脚本可以用controlled mock场景补边界，但最终正式程序必须无fixture标志、真实live_state与现存auth/provider绑定。
3. 本地采集→受控证据传输→独立解读是三步；传输失败只补传，审查文案写错只修报告，不自动重新启动/重装。
4. 必需原生场景缺测不能按通过；只需用户最终主观确认或真实登录凭据才打断用户。

示意候选接入（**已存在脚本的拟议调用，不表示此命令在用户Windows上执行过**）：

~~~powershell
pwsh -File scripts/development-acceptance.ps1 -Doctor
pwsh -File scripts/development-acceptance.ps1 -Mode S3 -ExpectedCandidateCommit "<ACTUAL_GIT_SHA>" -RequireCommittedCandidate -ReleaseExe "<ACTUAL_RELEASE_EXE>" -State current-live -DeferGptWorkPack
~~~

正式接入必须先由目标Host验证pwsh可用性、正确运行会话、exe路径、候选提交、允许前台的操作范围和脚本具体模式语义。不是每轮都运行全部三种模式，更不在用户工位直接复制这个命令盲试。已有脚本本身不等于所有R2用户交互已经被覆盖；新提醒动作需要真实新增适配场景。

## 7. 这次示例完成后用户看到什么

用户最终不应接收“203个测试PASS、已生成20张截图”，而应看到：现有Cloudflare R2账户状态可用时提醒确实触发且不刷屏；无凭据时诚实显示无法验证；阈值、取消、重启和托盘全部能用；Windows正式候选和审查截图是同一版本；相邻提供方仍正常；剩余只能由用户完成的是必要登录/新的体验取舍。没有真实账号可用时明确列出“真实R2消费未验证”，不能说功能生产可用。

关键来源：
- https://github.com/YuukiAS/Lucerna/blob/main/src-tauri/src/cloudflare_r2.rs
- https://github.com/YuukiAS/Lucerna/blob/main/scripts/development-acceptance.ps1
- https://github.com/YuukiAS/Lucerna/blob/main/docs/workflows/LUCERNA_EXECUTION_FAILURE_HISTORY.md

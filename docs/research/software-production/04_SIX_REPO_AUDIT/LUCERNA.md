# Lucerna：已记录问题、实际检查入口与缺口

本轮源码基准：`YuukiAS/Lucerna@79dd2875d3da33c6a6d80e5e35bea812b84c1ceb`。这是问题取证，不是重新验收软件。表中“历史”表示仓库确实记录过，不表示当前仍可复现；“源码缺口”表示本轮直接读到的检查范围不足；“边界”不是产品故障。原始私有日志、凭据、用户目录和截图不复制到本公开研究目录。

## 决定性程序与审查者

| 代号 | 已存在的入口 | 真正作用及不足 |
|---|---|---|
| L-STATE | `scripts/test-longleaf-presentation.mjs`、`scripts/test-vault-presentation.mjs`；`scripts/guard-01056r4-state-contract.mjs` | 前两项对呈现逻辑作回归；守卫还包括源码检查。不能由它们推断真实服务认证或完整原生界面通过。须把同一正式聚合路径接到变化输入和实际界面观察。 |
| L-NATIVE | `scripts/development-acceptance.ps1`：`Assert-CandidateAdmission`、`Test-SmokeCaptureEligibility`、`Test-CaptureSameRunBinding`；下游 `smoke-lucerna-close.ps1`、`capture-lucerna-window.ps1` | 实际运行、窗口操作及同次进程/截图绑定已有代码。它会启动和操作原生程序，不是安全只读预检；不包含完整安装生命周期或独立整体品味裁决。 |
| L-ENV | `scripts/governance-preflight.ps1`、`scripts/governance-regression.ps1` | 分别检查规则发现和部分运行隔离。回归脚本只要没有 FAIL 就可能退出 0，即使存在 GAP；调用者必须读逐项结果。项目钩子不构成不可绕过的安全边界。 |
| L-INSTALL | `src-tauri/windows/startup-hooks.nsh` 的 `NSIS_HOOK_POSTINSTALL`、`NSIS_HOOK_PREUNINSTALL`、`NSIS_HOOK_POSTUNINSTALL`；`scripts/guard-startup-lifecycle.mjs` | 已有开发/安装路径迁移、升级保留和外来同名记录保护；守卫主要检查源码结构，不能代替安装—登录—升级—卸载。 |
| L-DESIGN | AI Skills `frontend-visual-systems` 协调器，调用产品交互、视觉方向、设计系统、响应式等专业能力；Lucerna `LUCERNA_UI_PRODUCT_SYSTEM_V1.md` | 这是专业指导与设计权威，不是可自动执行的裁判。要让有视觉能力的实施/审查模型看到完整实际画面，并把问题返回设计或实现。 |
| L-REVIEW | `prompts/reviewers/LUCERNA_FINAL_PRODUCT_REVIEWER.md`，配套 `LUCERNA_INDEPENDENT_RELEASE_ACCEPTANCE.md`、`LUCERNA_VISUAL_ACCEPTANCE.md` | 已存在独立产品审查规范。提示词存在不证明已启动独立会话，更不证明它看过完整产物。当前用户未要求运行，本轮未启动。 |
| L-RECOVER | Bridge 已有工作树、授权、持久运行接口；Lucerna 当前任务与 Git 状态 | 可作为执行事实来源；没有当前主机实测，不能宣称可跨重启自动续跑。需要核对原任务、进程、实际结果，不重开同义任务。 |

表中的“补”是尚未实现/验证的修订要求，不是又建立一个新产品。共享缺口将在 `COMPONENTS.md` 中集中论证。

## 问题登记

| 编号 | 仓库实际暴露的问题及来源 | 性质/现状 | 决定性控制、为什么有效、还缺什么 |
|---|---|---|---|
| L01 | 01037 过早宣布可交用户验收，后来因范围和产品缺口重新打开。[LH §1] | 历史；当前状态需按候选判断 | 当前任务条目→实际行为证据由 L-REVIEW 核对；补任务声明核对器，不接受执行者独立写一个 READY。它只能拒绝未证明的条目，不能自动发明漏掉的需求。 |
| L02 | 01047 自报无重复卡片/状态文案，独立截图却发现 Overleaf、VS Code、Zotero、Bridge 重复。[LH §1、4] | 历史有反证 | L-DESIGN + L-REVIEW 看完整首屏和展开态，不只读自检结论。补首次自检实际看图记录；坏画面须由专业审查驳回，而非靠禁词计数。 |
| L03 | 01055 原始前端待办还有未闭合项，却宣称全部适用项完成。[LH §1] | 历史 | 从原始待办取得条目集合，逐项标注完成/合法排除/未验证；缺证据的项禁止关闭。不能让候选自己选择一个较小清单。 |
| L04 | 全量测试和设计文档都通过，但真实界面仍有层级、状态和文案缺陷。[LH §2] | 历史 | L-NATIVE 负责取真实画面，L-REVIEW 负责整体质量；两者缺一不能把机器检查升级为成品通过。 |
| L05 | CSS 缩放/测试意图被当成真实 Windows 缩放覆盖。[LH §2] | 历史 | 原生采集须记录实际显示缩放、窗口尺寸和候选。补真实平台覆盖判定；浏览器/CSS 证据只能关闭其本身范围。 |
| L06 | 明明已有紧凑摘要设计要求，发布画面仍使用过重结构。[LH §2] | 历史设计偏离 | L-DESIGN 对照产品设计与实际整屏，先修组件/布局规则，不逐项增补碰撞测试。 |
| L07 | 测试状态和测试控件留在用户桌面，测试画面看起来像正式产品。[LH §3] | 历史 | 受控场景留在隔离测试会话；正式交付检查正常配置、实际数据来源及无测试控件。补交付前环境清洁检查，不能只在截图加标签。 |
| L08 | 已有真实认证/服务状态却继续围绕模拟证据开发。[LH §3、6] | 历史 | L-STATE 测逻辑，已授权真实来源另测连接/读数；现有认证先读取、不得重新索要或以假状态替换。两类证据明确分开。 |
| L09 | 用户不断发现首屏密度、重复服务、视觉重量等实施者本可发现的问题。[LH §4] | 历史 | L-DESIGN 在实施中查整屏，L-REVIEW 在交用户前查未知缺陷；不能只重审上一轮已知问题。 |
| L10 | 每次小改反复构建、打开/关闭/刷新界面，打扰用户工作。[LH §5] | 历史 | 批量修改后跑必要局部测试；原生动作只在隔离环境，最终稳定候选才整体验收。补动作去重与资源所有权，不对每个保存触发发布。 |
| L11 | 专项通知防刷测试中的重复刷新外溢成所有 UI 开发默认动作。[LH §5] | 历史流程外溢 | 检查必须带任务用途/范围；正常界面修复不调用通知压力路径。对不涉及通知的小改作“不应触发”回归。 |
| L12 | 用户要求少打扰桌面后，执行走向完全停工。[LH §5] | 历史 | L-RECOVER 把动作分后台安全、隔离界面、正式操作；只停没有边界的步骤，继续其它已授权工作。 |
| L13 | 把执行者可解决、可据实关闭或可选的问题都升级给用户。[LH §6] | 历史 | Planner 仅处理真正目标/权限变化；Codex 在原任务内修常规问题。补依赖分类结果的消费，不新增一层逐命令审批。 |
| L14 | 已有认证再次要求配置；旧阶段停止指令压过后来的当前授权。[LH §6] | 历史 | L-RECOVER 核对授权对象/用途/效果及时间来源；同范围继续，新效果才提权。不能让旧任务文字自动重置当前许可。 |
| L15 | 未带认证的可达性探测 401 被误判为用户凭据需要登录。[LH §7] | 历史语义错误 | 服务可达性与凭据有效性采用不同输入和状态；L-STATE 对该组合回归，真实来源检查只证明其被测语义。 |
| L16 | 密钥库暂时读取错误被错误降为“需要设置”。[LH §7] | 历史 | L-STATE 保留最后确认状态，将瞬态不可检查单独呈现；错误恢复后验证旧配置未丢失。 |
| L17 | Longleaf 子路径故障被父级正常状态掩盖，或未观测/检查中被当故障。[LH §7] | 历史反复出现 | 同一正式聚合链测试子路径→服务→摘要→顶部→操作提示；必须同时有正常不误报与异常不漏报的例子，不能一律显示警告过关。 |
| L18 | 原始后端原因、内部操作码、路径和错误链进入普通 UI。[LH §8] | 历史 | L-DESIGN 给每条文字分配用户任务/后果，文字由清晰写作能力处理；L-REVIEW 看相邻文本与完整状态，不只排除几个单词。 |
| L19 | 窗口最后隐藏了，不代表点击的是关闭按钮。[LH §9] | 历史验收因果缺失 | L-NATIVE 保留真实命中目标和隐藏原因；当存在 Escape/失焦等竞争路径，必须证明指定操作导致结果。 |
| L20 | 新密钥验证成功，但替换操作没有真正激活它。[LH §9] | 历史功能不完整 | 从真实替换入口操作→下一次读取实际采用新密钥→重新打开仍一致；HTTP 成功不能代替持久化后置状态。敏感值不写证据。 |
| L21 | 取消、返回、成功后的紧凑状态和重新进入未纳入动作完成判断。[LH §9] | 历史跨服务共性 | L-REVIEW 和项目动作测试检查前态→动作→后态→重入；不能仅证明 handler 被调用。 |
| L22 | 旧进程占同一 EXE 路径、旧产物被本轮误读、PID/准备状态/截图不属于同次运行。[LH §10] | 历史；L-NATIVE 有修复代码 | 复用 `Test-CaptureSameRunBinding` 与候选准入，检查进程启动身份和包摘要；不另造同类截图框架。实际最终包仍须另核对。 |
| L23 | 未保存本地脏工作、误清未知文件、按名字粗暴停止进程等风险。[LH §11] | 历史教训及边界 | L-RECOVER + 精确任务拥有文件清单；只处理明确拥有的进程。文件夹名/进程名不等于授权。 |
| L24 | 只读监控任务顺手修改代理、网络、远端权限、生产基础设施。[LH §11] | 已明确禁止的高影响边界 | 操作能力按目标和效果限制；不让产品测试身份持有相关管理权限。规则只能提醒，权限域才实际阻止。 |
| L25 | 为原生截图/验收工具返修多轮，工具研发吞掉产品开发。[LH §12] | 历史 | 复用 L-NATIVE 已成熟辅助函数；只有关键证据被工具故障阻塞才有界修工具，之后回原产品任务。 |
| L26 | 规则文件过长被当前 Codex 实际截断。[LP] | 历史；仓库报告已缩减并重测加载 | L-ENV 校验真实发现链和加载限制；读取新规则不等于遵守，仍需行为验证。不能简单把所有规则再塞回根文件。 |
| L27 | 项目钩子源码/单测存在，但当前工作树未证明真实启用。[LG §Validated machine boundary] | 运行覆盖缺口 | L-ENV 用无害拒绝探针检验正常入口；静态检查通过不得称钩子生效。 |
| L28 | 沙箱能拦文件写入，却能终止指定普通用户进程并打开默认桌面高权限句柄。[LG 同节] | 2026-10-10 记录的实际隔离失败；非本轮重跑 | 原生环境采用实际隔离且经过授权探针证明；不能用同机换目录或规则提醒补成强隔离。 |
| L29 | `governance-regression.ps1` 总体可为 PARTIAL/GAP 仍退出 0。[LE] | 当前源码观察 | 补调用者对必需结果的语义判断：逐项覆盖不足保持未验证；不把所有 GAP 一律当产品失败，也不把 0 当通过。 |
| L30 | `test:development-acceptance` 实际仅运行自测和评审包自测。[LJ] | 当前命令范围；不是命令本身错误 | 该命令只能证明工具自身；正式产品门槛必须调用实际 L-NATIVE/安装行为，任务汇总不得升级结论。 |
| L31 | L-NATIVE 主路径会启动、操作、保留可见窗口；不能因命名为检查就默认后台安全。[LN] | 当前源码副作用 | 在调度前核对实际下游调用和允许环境。禁把同一脚本作为无权限预检运行。 |
| L32 | 启动迁移/单实例代码已存在，但源码文本守卫不能证明真实升级、禁用偏好、卸载和外国同名项保护。[LI] | 当前实现与验收范围之差；非断言功能坏 | 在隔离环境以同一 NSIS 包跑完整状态转移，核对前后注册/启动/运行身份。脚本字符串检查保留为便宜回归。 |
| L33 | 独立产品评审、原生环境验收与最终用户交付容易被一个 PASS 混为一谈。[LG §Review and release gates；LR] | 明确合同边界，需消费落实 | 汇总器按声明分别核对证据；任一缺口禁止相应完成声明，已经达到的局部结果保留。发布前查询目标，已正确则不重装。 |

## 本仓库对架构的约束

必须保留产品状态语义、设计判断、真实动作因果、身份和环境分层；只建发布验收器不能修复 L06/L17/L20，增加流程协调器也不能替专业模型判断 L02/L09。共同体系值得新增的是**让现有检查被正确选择、实际运行并按证明范围消费**，不是重写 Lucerna 或为每一项问题建立独立新门槛。

## 来源

[LH]: https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/docs/workflows/LUCERNA_EXECUTION_FAILURE_HISTORY.md
[LG]: https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/docs/workflows/LUCERNA_EXECUTION_GOVERNANCE.md
[LP]: https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/docs/workflows/LUCERNA_POLICY_MIGRATION.md
[LN]: https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/scripts/development-acceptance.ps1
[LE]: https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/scripts/governance-regression.ps1
[LJ]: https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/package.json
[LI]: https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/src-tauri/windows/startup-hooks.nsh
[LR]: https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/prompts/reviewers/LUCERNA_FINAL_PRODUCT_REVIEWER.md

来源均为仓库文本和源码；本轮没有取得用户主机实时状态、没有运行完整 Lucerna、没有重审截图。因此历史问题的当前关闭结论仍须精确候选证据，不能根据本表自动重开或关闭产品任务。

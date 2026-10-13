# SeminarArc：实际缺陷、测试误判与可复用能力

取证基准：`main@5652fe17ce60625f3ff7c758fcc0183f920189de`。本仓库既有真实产品缺陷，也有已经修复的测试工具误判，是避免“出了问题就加门槛”的重要反例。本轮仅读源码与报告；没有复验私有媒体、模拟器或真实手机。

## 决定性组件

| 代号 | 具体脚本/运行能力 | 证明范围 |
|---|---|---|
| S-BLACKBOX | `scripts/run-blackbox-acceptance.ps1`：指定 `Serial`、`ApkPath`、`Scenarios`；`Finish-Scenario`、场景包装、实际 UI/导出/持久化动作 | 对安装后的应用和系统选择器执行 B01–B08；场景可分别失败、受外部提供方阻塞或延期。不能只看总退出码/总步数。 |
| S-ANDROID | `EndSeminarUseCase.kt`、`RecordingServiceStarter.kt`、`EndSeminarUseCaseTest.kt`；项目 Android/Compose 负责人及既有 Gradle instrumentation | 精确处理 Android 服务生命周期、Room、WorkManager、权限和 Compose 可访问语义；前端设计角色不能替代这些平台实现判断。 |
| S-MEDIA | 第二轮真实媒体任务及其现有语料驱动；S-BLACKBOX 的照片导入、OCR 文本控件读取、B04/B07 | 真实照片及可编辑文本/导出/重启复核；私人媒体留在 ignored 区域。音频库存不是不存在的音频导入能力。 |
| S-VISUAL | `scripts/run-visual-regression.ps1`；`scripts/blackbox/Compare-VisualGolden.py`；显式 `-AcceptInitialBaseline/-UpdateBaseline` | 比较经目检的显示基线与当前图像，覆盖不同尺寸/方向/字体。普通比较不自动接受差异；显式更新开关不是外部权限隔离，仍需独立批准更新。 |
| S-STRESS | `scripts/run-exploratory-stress.ps1`；固定种子、包作用域、运行预算和恢复 | 查崩溃/ANR/状态恢复；随机事件数不代表科研语义、音质或整体产品体验。 |
| S-REVIEW-READY | `scripts/verify-gpt-work-acceptance.ps1`；`gpt-work-acceptance-common.ps1`；固定候选、场景启动/重置及完整 Parent 生成 | 验证交给独立审查的环境、APK、场景、提示词是否一致；`-SkipDynamicProbe` 明确不是动态验收通过。准备就绪不等于审查已执行。 |
| S-PRODUCT | 当前产品/隐私合同＋Android Lead、Compose 专业角色；必要时 Frontend Design 的完整交互/视觉判断和独立 GPT Work | 检查研究操作是否可用、信息层级、真实媒体与本地/外部服务边界。不能靠 golden 或 Monkey 次数代替。 |

## 已记录的问题及约束

| 编号 | 问题和证据 | 性质/现状 | 决定性控制与仍需注意的边界 |
|---|---|---|---|
| S01 | 原有白盒/组件检查不足，用户仍需逐项证明普通导航、保存和导出。[SP Goal/Why] | 已识别流程缺口 | S-BLACKBOX 从安装包真实入口跑 CRUD、会话、重启、导出；把普通调试交回 Codex，不是再给用户更长清单。 |
| S02 | 仅拍照会话结束时无录音仍发送前台服务停止，触发 `ForegroundServiceDidNotStartInTimeException`。[SH] | 历史真实崩溃，报告已修 | `EndSeminarUseCase` 判断 open recording rows，`RecordingServiceStarter` 停止命令不错误启动前台服务；原有录音正常停止仍需回归。S-BLACKBOX B03 直接验证。 |
| S03 | 模拟器相机停滞让界面无限等待。[SF Fixed Bugs] | 历史产品错误，报告加入超时 | `ActiveSessionScreen` 15秒限时及用户可见失败；B03/B04 观察实际终态，不能无终态却PASS。 |
| S04 | 无 OCR/关键页时“查找参考文献”不可达，阻断合法手工 DOI/题名路径。[SF] | 历史功能入口错误，报告已修 | `ReconstructionWorkspaceScreen` 保留人工线索入口；S-BLACKBOX B05 通过真实 UI 完成查找/确认/重入。 |
| S05 | B04 相机没生成资产，依赖它的 OCR/公式 B07 无法证明。[SF Scenario Status] | 历史模拟器覆盖不足，后来导入/真实媒体任务补齐 | 不把缺资产记作产品失败或通过；S-MEDIA 从合法用户入口导入照片，分别证明导入与真实相机能力。 |
| S06 | 公共文献服务超时会让 B05 失败，不能混成产品逻辑故障。[SF] | 外部依赖边界 | 真实请求成功/错误/超时分开，保留用户重试和本地数据；组件逻辑可用受控替身，真实在线成功另有证据。 |
| S07 | 系统权限拒绝后对话框未真正消失就继续，导致脚本后续误点。[SF Harness fixes] | 历史工具错误 | S-BLACKBOX 以系统 UI 消失与目标应用就绪作后置条件，不靠延时/点击已调用。 |
| S08 | 长屏导航、父级可点击对象、双向滚动和当前导航栈假设导致错误。[SF] | 历史工具不稳定 | 同一用户路径定位真实可点击祖先，双向查找并从 library 重新打开；不得默认当前屏幕等于目标状态。 |
| S09 | DocumentsUI 保存等待、残留选择器和目录状态使导出误判。[SF；SM] | 历史工具错误 | 保存后核对系统选择器退出、真实文件/ZIP条目；通过 Show roots 返回确定位置，不依赖上次记忆目录。 |
| S10 | 文件存在/非零不足以证明导出内容完整。[SF Export Evidence] | 当前已部分检查的能力边界 | 现有正文片段与ZIP条目检查保留；科研结构/引用/公式/图片语义需要相应内容核对，不能由大小推断。 |
| S11 | 旧报告称5张真实照片 OCR 全空，根因是脚本没读到标签包裹的 EditText，不是 OCR 产品坏。[SM] | 历史假阴性，明确撤销旧产品判断 | S-MEDIA 正确读取真正输入控件；与实际照片目视/人工编辑/搜索相互校准。不能修产品算法去迎合读错位置的测试器。 |
| S12 | 把文件名编号当 OCR 搜索内容，错误地测了不存在的文本。[SM Harness] | 历史测试语义错误 | 搜索使用真实OCR/人工编辑内容；资产定位走未筛选列表。输入与预期必须属于真实能力。 |
| S13 | 列表滚动被可拖拽公式图片截获，误以为列表或控件不可达。[SM] | 历史操作路径误判 | S-BLACKBOX 从卡片留白触发滚动，核对实际viewport；不能用内部状态跳过UI达到目标。 |
| S14 | 公式编辑展开阻塞后续照片操作。[SM] | 历史测试编排问题 | 核心素材处理先完成再做代表公式流程，仍单独测恢复/收起；不把测试顺序失败误判整组照片无法处理。 |
| S15 | 快速或并行运行证据目录碰撞。[SM] | 历史工具缺陷，报告已修 | 现有运行ID含更细时间和进程标识；共同协调层再约束同设备租约，不能让两个测试同时点击同一模拟器。 |
| S16 | 仅抽查3张重启后资产，不能支撑全量素材保留声明。[SM] | 历史覆盖不足，报告改9/9 | 逐素材核对重启后关键数据，缺失使本轮不通过；无需无限扩样本，只按声明集合完整覆盖。 |
| S17 | 两段外部录音虽可盘点元数据，产品没有音频导入入口。[SM；SR] | 明确未提供能力，不是已实现 | 不能将文件入库/metadata成功称产品导入通过；S-PRODUCT 维护 scope，未来新增才设计用户入口和验收。 |
| S18 | 短屏保存失败后错误提示不可见。[SV；SVR] | 真实可达性缺陷，报告已修 | Compose 布局/滚动与 S-VISUAL/S-BLACKBOX 实际短屏流程；字段验证返回错误但用户看不到仍是失败。 |
| S19 | 空 library 短 viewport 不可滚动，入口不可达。[SVR] | 历史产品缺陷，报告已修 | Android/Compose负责人修布局，真实小屏操作验证；不以大屏golden替代。 |
| S20 | OCR编辑缺少真实保存完成信号，点击动作无法证明持久化。[SV] | 产品反馈与验收缺口，报告已修 | 显示基于实际Room更新的完成状态，再重启核对文本；不能仅添加固定成功提示满足脚本。 |
| S21 | 基线图片比较可能被“自动接受新图”掩盖退化。[SV、SVR] | 当前已有显式更新约束，仍非独立权限 | 普通比较不能写基线；更新必须单独取证并目检，外部受保护基线防同一候选随意放宽。 |
| S22 | 33张golden稳定不等于完整无障碍、TalkBack、音质或硬件体验。[SV] | 明确覆盖边界 | S-VISUAL 只关闭对应画面；S-PRODUCT/真实设备检查关闭其它声明，不能泛化。 |
| S23 | PowerShell `$PID` 大小写只读变量冲突令压力工具失败。[SS] | 历史工具兼容错误 | 修工具变量与自测，不改Android代码；区分运行基础设施与产品故障。 |
| S24 | Android10输入注入把请求值映射为另一个字符，造成保存/导出假失败。[SS] | 历史模拟器键映射问题 | 在产品处理前读取控件实际收到的值，后续持久化/导出对该值核对；API36精确输入仍保留。不能读取保存后的错误值再自洽放行。 |
| S25 | Monkey 打开外部系统分享选择器后残留，被误判应用恢复失败。[SS] | 历史环境/操作判断错 | 恢复时先关闭测试创建的系统界面、回HOME再启动指定包，核对真正前台包和进程，不全局杀服务。 |
| S26 | 广域adb/Gradle设备命令可能误触受保护真机。[SS；AG] | 明确设备权限边界，未将其列成已发生污染 | 所有写动作显式设备serial和任务拥有AVD；不因另一设备在线就操作，不执行adb全局重启/连接修复。 |
| S27 | 压力事件全部成功也不能证明实际研究流程和真实硬件连续录音。[SS；SR] | 测量证明范围 | S-STRESS只判崩溃/ANR/恢复；实际语料、权限、持久化和真机音质各由对应入口。 |
| S28 | 一项工具或文档修复就产生新alpha，逼用户重复安装。[SQ；SS] | 已明确制止的流程风险 | 发布器先判是否有值得用户更新的产品变化；纯QA/证据变化不发版，已安装正确版本不重装。 |
| S29 | ASR、在线摘要、NotionOAuth、在线公式OCR尚未接通，local-safe路径不能伪装全部功能完成。[SR] | 明确延期/不可用边界 | 真实provider能力和本地手动流程分开，界面可用不代表外部服务已支持；不为了“闭环”新增假成功provider。 |
| S30 | `verify-gpt-work-acceptance.ps1 -SkipDynamicProbe` 可跳过真实动态探针。[SG] | 当前命令范围，不是独立审查通过 | 调用者检查dynamicProbe=SKIPPED及本次门槛；不得只消费最终环境ready字段。常规静态核对允许跳过，但要缩小声明。 |
| S31 | Work环境/Parent/候选准备完毕被误认为独立产品审查完成。[SP；SR；SG] | 当前明确未审查 | S-REVIEW-READY仅发准备回执；真正独立审查必须有实际材料与判定。没有运行就不能关闭。 |
| S32 | 真机麦克风、相机、锁屏/OEM后台、低存储等不在现有模拟器证据内。[SR] | 当前保留的覆盖缺口 | 对需要宣称这些能力的发行范围做有界真实设备测试；不让用户重做普通UI回归，也不从模拟器推断硬件已过。 |

## 可直接复用而非重造的经验

S02证明已有真实黑盒能抓住单元检查之外的服务生命周期错误；S11/S24证明测试器也会误判，必须校准真实输入/观察；S28证明“不每次出新release”是已经存在的正确策略。中央体系应统一这些结果的证明范围、任务所有权和失败归因，而不是把所有失败都交给一个超级审查模型。

## 来源

[SH]: https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/prompts/tasks/0.5.x_blackbox_acceptance_harness_result.md
[SF]: https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/prompts/tasks/0.5.x_blackbox_research_flows_result.md
[SM]: https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/prompts/tasks/0.5.x_real_world_media_corpus_round_02_result.md
[SV]: https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/prompts/tasks/0.5.x_visual_regression_result.md
[SVR]: https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/prompts/tasks/0.5.x_visual_regression_review.md
[SS]: https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/prompts/tasks/0.5.x_exploratory_stress_result.md
[SQ]: https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/prompts/tasks/0.5.x_qa_closeout_task.md
[SP]: https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/docs/plans/0.5.x-blackbox-acceptance-plan.md
[SR]: https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/README.md
[SG]: https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/scripts/verify-gpt-work-acceptance.ps1
[AG]: https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/AGENTS.md

本页完整整理上述指定事故/修复/语料/视觉/压力/就绪报告中的独立问题类别；早期0.1–0.4全部提交与原始私有逐步日志尚未逐项审计。所有“报告已修复”仅指相应来源报告，不能代替本轮实际验证或最终产品通过。

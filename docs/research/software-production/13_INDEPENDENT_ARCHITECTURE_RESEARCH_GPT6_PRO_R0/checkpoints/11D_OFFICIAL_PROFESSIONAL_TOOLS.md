# 官方来源核查四：成熟工具能采证，不能自动给出专业真值

RUNNER_ID: GPT6_PRO
READ_DATE: 2026-10-15
HISTORY_READ: NO

## 恢复范围

本轮只读回自己的00–10事实checkpoint，没有重读十个源仓库。恢复了Web、Tauri原生桌面、浏览器扩展、Android及CARE科学产物的实际入口和已有验收工具。来源commit和实际已读范围保留在对应checkpoint，不把这些恢复摘要重新算成源码审计。

## 已核实的成熟替代

**网页与扩展。** Playwright提供真实浏览器交互、可访问性树快照和像素基线比较；官方明确截图受操作系统、字体、硬件和运行方式影响，基线必须在相同环境生成。更新基线是改验收标准，不是修复证明。其axe集成明确只发现部分无障碍问题，仍需人工评估与用户测试。因此CUHK Date、Mica、Asteria已有Playwright入口应优先保留；DOM结构/HTTP成功/无自动无障碍告警不能证明整页好用、中文自然或科学关系正确。[O21–O23]

**原生桌面。** Microsoft区分Windows UI Automation原生交互与WebView2中的网页部分；它们不能互相替代。UI Automation有完整性等级和安全桌面边界，不能为了测按钮绕过UAC或随意提权。[O24–O25] Tauri当前官方文档已经推荐WebdriverIO的Tauri服务，嵌入式驱动覆盖Windows、Linux、macOS；直接tauri-driver仍限Windows/Linux，另一macOS路线有付费要求。不能继续用旧知识断言macOS完全没有自动化入口。嵌入驱动、IPC模拟、纯浏览器模式的证据效力不同：测试插桩构建不自动等于正式用户二进制，原生托盘、系统通知、跨应用往返及真实DPI仍需相应用户入口。[O26]

**Zotero隔离。** 官方多profile说明本身保留警告：新profile未必自动创建不同data directory。这独立支持Bobbio事故中的隔离风险。最小可接受方案是既有安全runner显式核对profile、dataDir、同步/更新配置、URI handler和真实资料前后不变，而不是另写一个泛用“测试账户”字段。官方说明不是本机隔离已成立的证明。[O27]

**Android。** UI Automator可从真实安装应用进行元素查找/点击与系统界面交互；Macrobenchmark提供启动、帧时序、JSON及系统trace。官方明确模拟器性能数值不能代表用户设备，测量有debuggable、电量等配置检查；不能压制错误再把结果叫真实性能。WorkManager作为持久后台任务的成熟底座，已经被SeminarArc使用，应由应用领域状态约束重试、取消和唯一工作，而不是让外部通用控制器再调媒体任务。[O28–O30] 模拟器可覆盖大量普通质量问题，但真实投影照片、录音硬件、厂商后台策略仍是小范围真机边界。

**科学评价。** scikit-learn的官方反例明确说明预处理/特征选择看到测试集会制造乐观评价；Pipeline帮助限定拟合数据，但不能替代正确的问题、拆分单位和外部检验。[O31] MONAI官方托管文档的DiceMetric参数区分背景、空真值、NaN和聚合方式，证明库函数存在并不消除统计定义选择。[O32] 对CARE需要逐病例/模态/亚组分母与失败保留；对Asteria需要独立数学含义与图形可读性双链；对未来统计模型需要明确估计对象、假设、识别和诊断，不能用统一PASS替代。这里没有重评CARE模型结果，也没有声称任一指标默认值适合该比赛。

**持久编排替代。** Temporal已有持久工作流/活动、事件历史、重试及心跳恢复机制，是真实替代而非必须自建这些基础设施；但官方要求活动有幂等设计，重试通常从初始状态开始，除非应用使用心跳checkpoint。它不会自动赋予Windows App原线程控制权、Slurm恰好一次提交或专业验收能力。[O33–O34] 因而只能在确有跨主机持久生命周期需求且收益足够时，作为现有控制者的替代底座，而不是与Bridge/CARE并列的新主控。

## 候选设计约束

“统一”最多统一任务意图、授权、真实消费对象和证据关联；执行、事实来源与专业判据必须按领域保留。视觉审查应同时看整窗和关键交互，不得靠文本/OCR或坐标合格替代；专业审查者应独立于实现者，挑战集不能由被测实现同源生成，更不能自动追认新golden。

需要区分验证器发现产品错误、验证器自身错误和环境无法观察。对每个关键检查至少准备旧坏新好反例、可适用的未见变体、良好负对照和工具失败对照。量化漏报/误报、返修轮次与用户介入，而不是以文件数/测试数衡量成功。仅改变结果收据不应无条件重跑GPU/原生全套，影响分析必须绑定消费输入；关键输入变化则精确失效。

成熟工具清单不是实施建议：没有安装、执行、购买或连接用户机器。MONAI原docs.monai.io两个URL读取失败后，使用官方monai.readthedocs.io托管文档的参数段；ArviZ旧API地址只返回重定向空页，因此没有把它作为已核实能力来源。

## 官方参考文献

访问日期均为2026-10-15；只使用项目官方资料。

[O21] Playwright. Visual comparisons. https://playwright.dev/docs/test-snapshots 。Introduction、环境警告、基线更新。

[O22] Playwright. Accessibility testing. https://playwright.dev/docs/accessibility-testing 。Introduction/Disclaimer及按交互状态扫描。

[O23] Playwright. Snapshot testing. https://playwright.dev/docs/aria-snapshots 。可访问性树与部分匹配的定义。

[O24] Microsoft. Test apps built with the Windows App SDK and WinUI 3. https://learn.microsoft.com/en-us/windows/apps/develop/testing/ 。UI自动化、Accessibility Insights、WebView2区别；此页不证明Tauri应用必然暴露完整原生树。

[O25] Microsoft. Security Considerations for Assistive Technologies. https://learn.microsoft.com/en-us/windows/win32/winauto/uiauto-securityoverview 。完整性等级、UIAccess和安全桌面边界。

[O26] Tauri. WebDriver. https://v2.tauri.app/develop/tests/webdriver/ 。2026-06-29更新；服务嵌入式/外部/付费驱动、纯浏览器模式及直接tauri-driver限制。

[O27] Zotero. How can I use multiple profiles in Zotero? https://www.zotero.org/support/kb/multiple_profiles 。profile与dataDir及仍保留的2023-06警告。

[O28] Android Developers. Write automated tests with UI Automator. https://developer.android.com/training/testing/other-components/ui-automator 。元素查找/实际交互及权限界面例子；示例不构成本任务自动批准权限的授权。

[O29] Android Developers. Write a Macrobenchmark. https://developer.android.com/topic/performance/benchmarking/macrobenchmark-overview 。运行、测量结果、模拟器/配置限制。

[O30] Android Developers. Task scheduling. https://developer.android.com/develop/background-work/background-tasks/persistent 。WorkManager持久任务与唯一工作链。

[O31] scikit-learn. Common pitfalls and recommended practices. https://scikit-learn.org/stable/common_pitfalls.html 。12.1、12.2，预处理一致性和数据泄漏。

[O32] MONAI. Metrics, DiceMetric. https://monai.readthedocs.io/en/latest/metrics.html 。include_background、reduction、get_not_nans、ignore_empty参数。该latest页为1.6.1rc0，不能当用户已安装稳定版本。

[O33] Temporal. What is a Temporal Activity? https://docs.temporal.io/activities 。活动重试、幂等、副作用、心跳恢复。

[O34] Temporal. Temporal Workflow Execution overview. https://docs.temporal.io/workflow-execution 。持久执行与生命周期；不推定其部署成本已被验证。

NEXT_ACTION: 在读取任何历史架构或Critic之前，立即完成并提交01_INDEPENDENT_CANDIDATES_BEFORE_HISTORY.md；读回后才解锁历史反证。
# 事故补查：不能把较早失败史当作完整历史

日期：2026-10-13。性质：来源取证与因果分析，不修改产品、不启动审查、不重做已批准任务。承接[六仓库246项登记](../04_SIX_REPO_AUDIT/README.md)。本页新增的是此前汇总未充分覆盖的原始评审，不将同一事故重复计为多个当前故障。

## 1. 本次补查范围与直接结论

完整补读 Lucerna 01056、01056r1、01056r2、01056r3 的原始独立全产品失败报告，以及相应修复任务的关键机制；完整补读 Asteria RC7、RC8 黑盒通过、RC8 用户失败和 RC13 原始视觉复审。它们揭示了之前33项 Lucerna 摘要遗漏的安全事务、真实服务契约、依赖闭合、原生事件链、证据冻结和交付能力深度问题。

**重要纠正：** Lucerna 的失败史更新于10月5日，不能覆盖随后10月6日至8日这些新事故。以前以读过失败史就代表“事故已整理完”是不成立的。本次保留原246项编号，用本页补充编号追踪不同根因；重复机制只增加原始证据。

历史评审证明某一候选当时失败；当前源码有修复不等于本轮重新运行过。本文不声称下列问题当前都仍存在，也不以问题数量证明整个历史穷尽。早期任务、其它历史分支、未归档聊天和私有原始材料的剩余覆盖仍见[范围说明](../04_SIX_REPO_AUDIT/COVERAGE.md)。

## 2. Lucerna：01056系列新增或细化的根因

源码取证快照：`79dd2875d3da33c6a6d80e5e35bea812b84c1ceb`。下列“拟补模块”指[本轮架构提案](ARCHITECTURE.md)中的职责接口，不是已经存在的可执行脚本。

| 补充编号 | 具体事故及原始依据 | 为什么原流程没拦住 | 决定性程序/智能体与补法 | 复发时必须怎样被发现 |
|---|---|---|---|---|
| LX01 | 01056把`BLOCKED_EXTERNAL`的Workstation、仅有Not set up画面的R2称完整实现；r1/r2仍把setup、preflight、first-sync边界算完整能力。[L56、L561、L562] | 完成矩阵由实现者手填，按模块/页面存在而非完整用户能力判断 | 产品负责人定义能力深度；拟补`claims.ts::evaluateClaim`消费真实服务/动作证据。现有候选矩阵保留为来源，不是裁判 | 只有设置页、无正常读取/错误恢复/重入证据时，不能关闭主能力；合法延期与完成分开 |
| LX02 | 01056监测WSL是否故障却依赖WSL执行Windows健康提供程序。[L56] | 测试只覆盖提供方可用时的路径，没分析故障域 | 技术设计智能体核对依赖图；`src-tauri/src/workstation.rs`从当前外部权威发现独立Windows入口；不在监控器复制远端维护逻辑 | 令被监测子系统不可用，监测仍能返回来自独立观察面的诚实结果；不能仅展示上一次健康 |
| LX03 | R2解析器模糊递归找`payloadSize/objectCount/storage`，与提供方嵌套结构不符。[L561] | 为自造夹具写解析器，而不是消费真实接口契约 | 真实提供方契约→解析器；拟补项目级`provider-contract`测试，覆盖正常、部分、鉴权、畸形、缺可选字段。技术负责人核对官方/权威来源 | 合法原始响应经生产解析链得出正确结果；字段缺失不是零；改变一组合法输入，读数必须相应变化 |
| LX04 | Windows/WSL/Tailnet设备同名；本机Tailscale运行被当整组设备健康；positive presence被当完整健康或被详细provider失败抹去。[L56、L562] | 身份、可达性、详细健康、数据路径、控制面混为一个状态 | `workstation.rs`、`tailnet.rs`及统一呈现模型；领域负责人定义各证据优先级；真实跨来源状态回归 | Windows与WSL身份不能互代；presence已知但health未知时显示两层事实；无观测不得写离线 |
| LX05 | 新加/旧模块继续硬编码某开发机SSH alias。[L561、L562] | 单机正例被当产品可移植性 | 复用外部权威配置发现，不生成第二套端口/主机清单；Bridge核对当前主机，产品配置解析器处理具体endpoint | 在另一合法配置中仍定位正确入口；没有配置保持缺口，不退回作者机器常量 |
| LX06 | CUHK Date backup-health适配器未实现，下游freshness/failure alert待办却被关闭。[L561] | 只核对本条UI/文案，不核对前置能力是否存在 | 拟补`scope.ts::resolveRequiredJourney`从现有任务建立依赖闭包；专业负责人验证依赖关系 | 上游未验有效数据源时，下游告警不能称完成；但无关功能不被全局阻塞 |
| LX07 | `CredDeleteW`真实错误被当成功，metadata被删而secret仍留；`.ok().flatten()`又可能把安全存储错误吞成缺失。[L56、L561] | 下层与上层错误含义不一致，测试只看成功返回 | 安全存储产品实现、Rust失败注入与真实隔离存储测试；独立代码审查者追调用链 | 除确实不存在外错误必须传播；删除/读失败后旧状态仍可理解，不能冒充清理完成 |
| LX08 | secure-store与metadata/config分步写入，失败留孤儿secret、旧配置或覆盖旧凭据。[L561] | 页面提交成功替代跨资源事务完成 | 项目事务/补偿机制；测试分别在每一步失败，验证旧凭据、metadata与新凭据一致性 | 中途失败不丢旧可用状态、不泄露新secret；恢复后核对实际后置状态，不能只看函数退出 |
| LX09 | Cancel、Hide、切面板后保留Passcodes/R2/OpenAI/BWG/Vault敏感草稿。[L561] | 只补两个新模块，未把“敏感表单生命周期”当共享性质 | `src/main.ts`统一敏感表单清理；设计模型区分普通metadata可保留与secret必须清除；真实动作测试 | 五类secret及一次性恢复key在取消/隐藏/切换/保存结果后按合同消失，重新打开不能复现 |
| LX10 | 前端hide做了清理，但托盘/失焦/原生标题栏等后端hide直接绕过JavaScript。[L562] | 只检查一个按钮handler，未列全部终止路径 | `hide_panel_with_cause()`及前后端窗口事件统一清理协议；原生驱动必须分别触发各条真实隐藏路径 | 每条路径隐藏后重开都验证秘密与管理面状态，而不是只看最后窗口隐藏 |
| LX11 | UI承诺code不会出现在截图，却没有相应捕获保护；公开证据含真实主机、账号、仓库、额度等私人metadata。[L56、L562] | 把“没有密码字面量”当隐私通过；文案承诺超过实现 | 设计/隐私角色限制承诺；mask/reveal/copy真实生命周期；采集者保管私人原始证据，审查输出只给必要脱敏派生 | 不得声称不存在的截图免疫；外发前核对信息类别，脱敏材料不冒称真实服务数据 |
| LX12 | ResourceState生产者用underscore词汇，聚合器认hyphen词汇，再退回severity，导致auth/checking变stale、未配置污染全局。[L563] | 夹具和守卫各自测试自己的枚举，没有贯通实际生产输出 | 当前`ResourceRuntimeState`、`resource.contribution_state()`、`resourceStatusPresentation()`是正确修复落点；现有`guard-01056r4-state-contract.mjs`仅便宜结构守卫 | 用每个真实生产者的输出走同一过滤→聚合→标题/托盘/行/CTA链；未映射类型编译或测试失败，不能补一堆别名 |
| LX13 | Tailnet positive presence覆盖正在Checking的Workstation；BLOCKED_EXTERNAL被全局聚合直接丢弃。[L563] | “不是LIVE”被粗略当同一类，未知值默认无贡献 | 当前`WorkstationLiveStatus`与`reconcile_tailnet_presence`/contribution规则；状态模型专家定义证据独立性 | Checking+presence保持Checking；已配置blocked贡献Unknown；旧健康/明确故障不被弱证据冲掉 |
| LX14 | 八态截图看似完整，fixture却使用生产不认识的`live_status="FIXTURE"`；模拟最终headline绕真实aggregation。[L56、L561、L563] | 测试制造了产品里不会出现的状态，再测试其自身结果 | 夹具只在I/O输入层替换；中间runtime state和生产聚合不分叉；单provider变异，其余正常。`guard-01056r4-state-contract.mjs`可阻止字面FIXTURE，但行为驱动还需跑真正链路 | 目标provider异常必须在最终画面产生正确贡献；只改fixture headline而正式链未改的候选必须失败 |
| LX15 | icon映射表有正确区分，实际组件仍按粗severity自行选图。[L563] | 存在正确helper不等于每个消费者真的用它 | 呈现对象携带semantic，所有`renderStatusBadge`消费同一模型；控件实际渲染比较，源码字串只作辅助 | Checking/Auth/Unknown/Stale在各个组件显示一致；一个旁路组件就能使对应场景失败 |
| LX16 | 已知backend未就绪仍启用诊断按钮；展开后CTA还叫“打开当前详情”；台账与真正enabled/backend命令不一致。[L56、L561、L562] | 把动作存在当动作完成，台账手写不与实际UI核对 | 拟补项目`actions.spec`观察已渲染可见控件、enabled、后端命令与实际后置状态；产品交互模型判断动作有没有用 | 禁用需有用户可理解理由；合法入口真正到达下一状态；无意义按钮不能靠onclick存在过关 |
| LX17 | 产品设计顺序/分组/单展开/可选setup权重已经冻结，实际界面仍违背且自报通过。[L561、L562] | 设计只作为文本，不是实现前和过程中持续消费的结构约束 | Frontend Design先产关键整屏；设计一致性可计算部分自动检查，层级/密度独立视觉模型检查 | section order、互斥展开、首屏主次真实可见；不能临时修改设计迁就已写UI |
| LX18 | 外部包只有折叠态，展开的Longleaf/Workstation/Connections/密钥设置等全缺；缺Dark、键盘、长文本仍称完整。[L563] | 按“采了截图”而非可交付用户路径集合判断 | 拟补`scope.ts`生成本次声明的必需界面/动作集合，`evidence.ts`判缺口；不把所有产品每次全展开变硬要求 | 宣称全产品时必须完整材料；局部任务可明确缩小，但不能无批准删掉难测项 |
| LX19 | 49/92个MANIFEST摘要与冻结字节不符；文件哈希后继续改写，旧candidate混用。[L563] | 报告生成/证据冻结顺序错误，元数据和产品身份混一团 | 不改产品来修报告；按P源码、E不可变运行证据、H交接说明、可选R回执分工。摘要对Git blob实际字节，禁止自含未来commit哈希 | 改报告不触发重新编译；改运行包必须重验；任何旧截图仅改标签或冻结后字节变化都拒绝 |
| LX20 | “所有东西已实现”的自报与四次独立FAIL反复冲突。[L56–L563] | 实施者既定义完成集合又填写裁决；下一次又只修已列缺陷而不校验整个观察系统 | 任务监督程序不接收自报completion作状态晋升；内部独立功能/实际画面审查先于GPT Work；历史坏候选校准验收器本身 | 相同失败机制若再次漏到用户或外部Work，按检验系统回归处理，不只开下一个产品修复编号 |

这些新增根因与旧条目有交叉：LX12–LX15细化L17/L22；LX19细化L22；LX01细化L01/L03/L33。它们保留为独立补充，目的在于不丢失确定性实现落点，不为凑一个更大的“已修复问题数”。

## 3. Asteria：原始通过为何不能作保留依据

源码快照：`193c033659a7612a99442763077217b130e9b756`。

| 补充编号 | 原事故/根因 | 与旧账本关系 | 必须修的决定性组件与复发验证 |
|---|---|---|---|
| AX01 | RC7同一Light+trace对比问题，W01给PASS+P2而W05给FAIL；祖先opacity可把active label再次淡化。[A7] | 细化A04/A47 | 相同能力不能挑宽松判定，按预先冻结的必需可读状态处理。实际层叠样式和全屏观察一起测；局部修复只重测对应负责人及必要发行验证 |
| AX02 | RC8全部指定Work通过后，用户仍一眼发现六类图/动效/遮挡/数学/模板文案问题。[A8、AH8] | 为A36/A38增加完整早期原证据 | 旧“全绿”不能当好基线。内部实际画面审查先对历史坏画面校准，连续点节点与改变视角；数学检查遍历主阅读层而非只看公式节点；拒绝核心视觉P2被写PASS+P2 |
| AX03 | RC13内部virtual targetPort正确，屏幕上箭头却不接卡片：SVG缩放，HTML固定virtual px，不在同一响应式坐标系。[A13] | **此前未具体登记的新根因** | `layoutProvenanceFlow`及渲染容器共同坐标变换；Playwright测实际DOM rect与SVG screen coordinates，含1536→1366→1536 resize。不再只检算法虚拟坐标 |
| AX04 | 1366开启Inspector后，百分比节点中心与固定px卡片宽度组合越界；只移三个特殊节点不能泛化。[A13] | 细化A35，新增尺寸混用机制 | 布局按真实内容区、卡片尺寸和安全边界约束；变化节点/尺寸正反例，保持同视口选中稳定。不能用动画掩盖位置不一致 |
| AX05 | RC13通用布局本身比旧方式好，失败集中在响应式整合；全部推翻会丢正面能力。[A13] | 补充A39/A47 | 根因审查区别方向错误与正确机制的局部接入错误；保留已通过科学/路由/状态，窄修共享坐标，不重跑无关六路模型评审 |

**对“审美造假”的严格表述：** 现有源码可直接证明某些度量没有测量却输出零，原始报告可证明自评/部分外评与用户可见失败冲突。它们足以判定度量失真和验收失效；没有证据判断某个执行者的主观动机。禁止把“未测交叉数=0”包装成审美保证，也禁止用更长的审美提示词代替实际看图。

## 4. 其它四仓库不被本次补查挤掉

完整问题仍在各自账本：Bobbio32项、Mica46项、SeminarArc32项、CUHK Date56项，均在旧索引逐条映射。各自决定性反例不能被Windows经验替代：

- Bobbio：profile名称并不隔离数据目录；原生性能脚本用假API并非真实Zotero往返；整屏Figma偏离不能用组件状态通过掩盖。
- Mica：活动重构已经有验收CLI/同路径正反控制，仍发生多轮证据归属缺陷；关闭功能只能证明安全，不能证明低内存/高亮/导出有效。
- SeminarArc：OCR空结果曾是采集器读错控件，不能拿假阴性修算法；系统输入实际收到什么与保存后输出分别校准；模拟器/真实硬件结论不混用。
- CUHK Date：托管预检用更方便的密码并直接调API，和真正用户注册不是同一条路径；会话隔离、一次性票据、外部服务寿命和小任务快检需要不同机制。

## 5. 覆盖与审计约束

本次没有遍历六仓库所有历史提交、每条评论和每个私有图像，也没有重新运行六个产品。现有全量可追溯登记是246项，加本页25项补充观察（包含细化和重复来源），不能将两者简单相加宣称271个不同事故或全部已修。

最终架构必须对**每项已登记机制**安排明确的现有入口、需要修复的缺口和验证方法；“历史资料尚有未读”不能成为不交付架构的借口，但也不能被数字掩盖。对未知未来失效，靠不同输入、完整任务、持续观察和回归维护发现，不作绝对零缺陷承诺。

## 原始参考资料（全部为固定源码快照）

[L56]: https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/results/01056_product_capability_closure/GPT_WORK_REVIEW_2026-10-06.md
[L561]: https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/results/01056r1_full_product_repair/GPT_WORK_REVIEW_2026-10-06_FAIL.md
[L562]: https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/results/01056r2_full_product_repair/GPT_WORK_REVIEW_2026-10-06_FAIL.md
[L563]: https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/results/01056r3_full_product_repair/GPT_WORK_REVIEW_2026-10-08_FAIL.md
[LG4]: https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/scripts/guard-01056r4-state-contract.mjs
[A7]: https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/docs/operations/blackbox-audit/reports/RC7_TARGETED_REAUDIT_CONSOLIDATED_REPORT_2026-09-13.md
[A8]: https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/docs/operations/blackbox-audit/reports/RC8_FINAL_BLACKBOX_GATE_2026-09-13.md
[AH8]: https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/docs/operations/acceptance/RC8_HUMAN_ACCEPTANCE_FAILURE_2026-09-13.md
[A13]: https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/docs/operations/blackbox-audit/reports/RC13_W01_VISUAL_REAUDIT_REPORT_2026-09-13.md

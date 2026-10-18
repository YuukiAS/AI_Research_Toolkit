# 人工归纳的验收能力与非产品机制

本阶段先按363条原问题、83条要求和当前生产owner合同归纳，尚未读取附件禁止的Proposal v0.2与两份supporting map。26个能力族是跨七仓的语义目录，不是要求每个项目运行26个Gate；每个实例只有一个专业owner。9类NON_GATE是既有工作流职责，不新增产品Gate或运行时。

## 独立性限制

追溯原始locator时，中央历史审计页中的旧“对应控制/补法”列曾进入当前上下文；这些不是本轮指定的当前Proposal，但仍超出严格纯来源盲读的边界。因此本表可作为先于当前Proposal提交的人工研判，不能作为完全未受旧方案影响的盲归纳证明。此限制不可通过事后声明“忽略”消除，最终证明C不得据此宣称严格PASS。重新完成严格盲对照需要隔离的新研究上下文，只给原要求、纯索引、真实源码与owner合同；本轮不伪造独立研究者。

## 归纳方法与粒度

每条历史登记单独归属，重复根因保留case id。产品正确性由用户消费行为定义，运行与权限问题留在已有工作流。不同阈值、不同病例、不同按钮、不同版本号不是新family。相同owner、证据方式、正常入口和失败含义可共享family；项目实例冻结具体能力与claim，不允许一个总PASS吞掉内部缺项。

26个族中没有据文件名发明的新能力：已有项目合同已要求这些性质；本轮新增的是明确的描述和选择语义。validator missing表示标准存在但当前查得的入口不足以机械证明该义务，不表示项目没有任何测试。temporarily unrunnable/HUMAN_ONLY仅说明特定运行或授权路径，不移除底层Gate。

| family | 能力 | 唯一专业owner | evidence class | normal entry | PASS/FAIL/UNKNOWN与claim边界 |
|---|---|---|---|---|---|
|UI|实际界面与设计一致性|Frontend Design|ACTUAL_SURFACE_RENDER_AND_INTERACTION|Frontend Design P0–P4；项目实际原生/浏览器入口|完整受影响画面、状态与动作符合冻结设计；缺目标画面为UNKNOWN；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|STATE|产品状态真值|PROJECT|PRODUCTION_STATE_TRANSITION|项目正常用户入口→真实状态生产者→持久层→显示|上下游身份、状态及动作后置条件一致；无观测不转健康/零值；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|NATIVE|原生交互因果|PROJECT|NATIVE_ACTION_AND_POSTCONDITION|候选EXE的窗口/托盘/标题栏真实操作|指定动作确实造成对应转移；替代路径不能证明所声明路径；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|INSTALL|安装与生命周期|PROJECT|INSTALLED_LIFECYCLE|项目安装/启动/升级/卸载正式入口|安装目标、启动偏好、单实例和卸载后置状态正确；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|PRIVACY|数据隔离与敏感状态|PROJECT|ISOLATION_AND_FAILURE_INJECTION|隔离profile/dataDir或最小权限测试身份的正式入口|实际数据边界与失败补偿成立，敏感草稿按全生命周期清除；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|PERF|声明环境中的性能与稳定性|PROJECT|CONTROLLED_BENEFIT_AND_CORE_REGRESSION|项目性能入口；相同目标类/真实设备的关闭/开启对照|冻结指标与负载达到标准且核心能力不退化；不选最好样本；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|ZOTERO|Zotero 原生批注往返|Bobbio project owner|ISOLATED_EXTERNAL_ROUNDTRIP|pnpm bobbio:acceptance:0.2.0 对应正式版本扩展的隔离Reader入口|真实隔离Zotero创建/更新/删除/重入与原文一致；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|HOST|真实宿主适配与无损行为|Mica project owner|HOST_DERIVED_PLUS_MANUAL_AUTHENTICATED|已加载dist扩展→宿主正常编辑/发送/分支；最终登录态由用户手动验收|完整能力归属、顺序、工具块、恢复和原生输入成立；未知退回原生但不算功能完成；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|DOC|实际导出物可用性与来源保真|Research Authoring|RENDERED_DOCUMENT_AND_SOURCE|实际PDF/Markdown/ZIP及最终阅读器选择或粘贴路径|完整内容/数学/来源可追溯且所声明选择编辑能力可用；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|ANDROID|Android 安装包用户流程与持久化|SeminarArc project owner|INSTALLED_ANDROID_BLACKBOX|scripts/run-blackbox-acceptance.ps1→显式AVD/包→普通UI|录制/保存/重启/导出及服务生命周期达到冻结目标；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|MEDIA|真实媒体处理与内容正确性|SeminarArc project owner|REAL_MEDIA_CONTENT|真实照片从产品导入/相机入口→增强/OCR→保存/检索|实际素材的输出内容和重启后完整集合正确；元数据盘点不算导入；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|STRESS|Android 压力恢复|SeminarArc project owner|STRESS_AND_RECOVERY|项目显式设备/seed压力入口及应用恢复路径|无冻结范围内崩溃/ANR且能恢复目标应用和数据；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|HARDWARE|真实设备能力|SeminarArc project owner|PHYSICAL_DEVICE_OBSERVATION|经当前授权的精确真机麦克风/相机/锁屏路径|OEM、音质、低存储等声明在所指定设备成立；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|GRAPH|科学图真值|Asteria scientific project owner|SCIENTIFIC_GRAPH_AND_CAUSAL_TRACE|canonical graph→trace/projection→实际图与Inspector|方向、索引、证据缺失、模型关系忠于科学源；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|GEOMETRY|浏览器几何与量测可靠性|Asteria project owner|INDEPENDENT_DOM_SVG_GEOMETRY|npm run test:browser 的真实DOM/SVG坐标量测|实际屏幕节点/边/标签不碰撞且量测覆盖完整；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|SCIVIS|科学可读性与完整图体验|Frontend Design|WHOLE_SCIENTIFIC_SURFACE|Frontend research-product-frontend→完整实际科学图|研究者能读懂模型/关系/证据；全图及长链不以删内容换清爽；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|DEPLOY|已部署表面与交付一致性|PROJECT|DEPLOYED_USER_PATH|项目固定正式URL及正常用户路径|部署身份与冻结候选一致且必要服务在消费时可用；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|REGISTRATION|注册完整关键路径|CUHK_Date project owner|HOSTED_VISIBLE_FORM_TRANSACTION|scripts/registration-critical-path-hosted.ts→可见注册表单|正确密码/身份/问卷/重入完成且清理可审；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|HANDOFF|一次性交接事务与persona隔离|CUHK_Date project owner|TRANSACTION_AND_SESSION_ISOLATION|普通audit-ticket UI→Web/API claim→auth/state→finalize|成功后消费；中途失败可恢复；身份/场景/快照不串用；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|CATALOG|检索内容与locale质量|CUHK_Date project owner|REAL_QUERY_CONTENT_AND_LOCALE|正常Favorite Media检索入口|真实常见和歧义查询返回正确、去重、可辨且locale一致内容；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|SCI_ENTRY|科研正式入口与结构忠实度|CARE scientific project owner|FORMAL_ENTRY_RUNTIME_TRACE|批准Plan→formal entrypoints→实际model/train/eval链|模型结构、阶段资产、正式数据/入口符合冻结合同；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|SCI_CAUSAL|参数、数据与机制因果|CARE scientific project owner|INTERVENTION_GRADIENT_DATA_LINEAGE|正式训练/评价的参数干预、梯度及数据追踪|改变机制输入产生合同指定影响且应隔离路径不受影响；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|SCI_SCALE|规模、总体与实验充分性|CARE scientific project owner|ADEQUATE_POPULATION_BUDGET|批准训练及实际病例/中心/模态/步数→同split评价|实跑预算、总体组成和选择标准足够支持所作结论；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|SCI_EVIDENCE|科研输出与证据完整性|CARE scientific project owner|TERMINAL_COLLECTED_SCIENTIFIC_ARTIFACTS|既有finalizer/collector→CSV/JSON/checkpoint/prediction/GT|终态后重新聚合且必需证据内容完整、语义一致；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|SCI_RESUME|恢复训练等价性与保存可靠性|CARE scientific project owner|CONTINUOUS_VS_RESUMED_EXECUTION|正式train checkpoint→中断恢复→后续训练轨迹对照|合同要求的RNG/optimizer/scheduler/sampler/内容和原子保存成立；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|
|SCI_CONCLUSION|科学结论、消融与合法负结果|CARE scientific project owner|SOURCE_GROUNDED_SCIENTIFIC_JUDGMENT|同split真实消融/指标→领域判断→Planner科学决定|证据足够且结论范围正确；充分负结果可以NO_GO；反例成立为FAIL，必要观察缺失为UNKNOWN；仅限该实例subject与claim。|

## NON_GATE

| mechanism | 职责 | authority owner | normal entry | 失效/恢复边界 |
|---|---|---|---|---|
|CLAIM|交付声明与证据覆盖|workflow-core|冻结claim→所需结果集合→最终交付准入|不把准备就绪/测试绿/自评当产品完成|
|IDENTITY|身份与新鲜度|Bridge|现有任务/候选/消费目标/结果identity检查|实际运行对象与字节绑定，hash只证明绑定不证明能力|
|AUTH|授权和安全操作边界|Bridge Host Policy|当前用户授权→现有受限入口→副作用核对|脚本名称、安全标签、repo自报不能扩权|
|RECOVERY|原任务恢复与预算|existing workflow controller|既有Lite/Reviewed/Control的resume/repair入口|不新建Goal重置预算，工具失败不改产品，等待不耗repair轮次|
|SCOPE|影响范围与回归选择|workflow-core|任务claim+差异+目标依赖闭包→执行计划|不按任务大小、repo名或Gate数量选FULL|
|RULES|规则与正常入口消费|project owner|AGENTS locator→现有normal entry加载验证|已写规则不等于已加载，不重复堆规则|
|CALIBRATION|验收器校准与语义保护|gate professional owner|冻结标准→known good/bad/missing→独立复核|验收器修改者不能自签新标准；假阴性要纠正裁决|
|ENV|环境可执行性与局部恢复|project owner|声明的环境前检→等价合法修复→原入口|环境缺口不伪称产品缺陷，不静默换目标|
|RELEASE|集成、发布与consumer适配|project owner|本地结果→正式集成/发布入口→目标消费者读回|文档/工具变化不自动重发产品；源码完成不等于安装生效|

`PROJECT`是描述模板的参数，不是运行时双owner；实例必须替换成该repo已确认的项目专业owner。`CALIBRATION`继承且只继承被校准Gate的owner；workflow-core只能路由，不能改标准。

## 必须保留的不同证据边界

- Lucerna：源码守卫、原生交互、安装生命周期、实际provider状态、完整界面各证明不同对象。Human Gate和桌面干扰由权限/恢复控制，不是再造一个产品Gate。
- Bobbio：隔离profile/dataDir是运行前提；真实Zotero roundtrip、受控后端原生Reader性能、整屏设计判断分别裁决。旧0.2验收不能覆盖0.3增强批注。
- Mica：当前main与重构分支分别有身份；当前重构分支报告明确将target-class环境与物理低内存设备分开。用户手动最终登录态验收不得被通用自动化绕过。
- SeminarArc：安装包流程、真实媒体内容、压力恢复、物理设备、视觉/无障碍分别有证据边界。S11是明确撤销的历史OCR假阴性，不能当今日产品缺陷。
- Asteria：科学图语义、屏幕几何、完整科学图阅读体验分别保留。A40/A41当前源码能确认量测缺陷，但本轮未运行页面，不能扩称整个产品当前失败。
- CUHK_Date：表单路径、一次性事务/身份隔离、状态/隐私、检索质量和部署依赖分别裁决；独立审查预演及票据管理不能当发布许可。
- CARE：正式入口/结构忠实度、因果消费、规模总体、证据完整、训练恢复等价、科学结论各有不同反例。证据完整只审实际科学输出的完整与内容，通用身份/freshness仍属于Bridge。

## 六个CARE族的合并与拆分检验

SCI_ENTRY不能吞并SCI_CAUSAL：正式入口调用了完整模型仍可能不传loss weights；反过来一批参数有梯度不能证明批准结构真的存在。SCI_SCALE不能由SCI_ENTRY代替：入口正确但12步/空GT仍不足。SCI_EVIDENCE检查终态后真正收集与内容完整，不决定科学优劣。SCI_RESUME必须比较连续与恢复后训练轨迹，和两次eval同checkpoint不同。SCI_CONCLUSION消费充分实验并允许NO_GO，不负责调度。六族保留；共同采集步骤可共享一次运行，不能强迫六次训练。

## 回归归属

完整逐条映射在03A。范围针对该历史失败的原声明和根因修复推定；执行时由实际diff与目标依赖闭包重新选择。case id不是运行时路由键。对单个case涉及多个能力，主归属表示最先阻断的职责，最终required set仍由claim的完整义务并集得到。

## 本轮直接核查的关键代码与报告

- Lucerna package.json 的 test:development-acceptance 仅调用SelfTest；不能当原生产品验收。
- Bobbio measure-0.3-native-performance.mjs:100,890 使用startFakeZoteroLocalApi；Invoke-BobbioAcceptanceSafe.ps1:78存在-Apply调用，PreflightOnly名称不构成只读证明。
- Mica scripts/acceptance/cli.mjs 的candidate分支调用validateBundle；validator执行哈希/集合/源断言核对，但这些核对不能自动赋予原始采集独立可信性。
- SeminarArc 0.5.x_real_world_media_corpus_round_02_result.md记载9/9 OCR、旧0/5由选择器错误造成，真实录音只盘点而未伪称产品导入。
- Asteria validate-architecture-rc19.mjs:37起的routeGestalt有常零交叉/标签计数，缺routeRatio/routeScore退为0；浏览器rc19RouteGestalt同样含应用自报指标。
- CUHK_Date registration-critical-path-hosted.ts真实使用可见link/button/field；handoff/handler.ts中claim→auth/state→finalize与abort release存在；本轮未证明所有并发/响应丢失路径。
- CARE validate_care_ase_freeze_reload.py:69起把两个model置eval后比较前向；不能替代后续训练等价。EXPERIMENT_ADEQUACY_GATE明确区分运行完成、证据发布和科学结论。

本轮没有执行上述任何产品runner，没有开展真实账号、设备、GPU或付费验证。当前性标签仅反映代码/报告证据。


# 架构规则推导与能力目录

Pass B是在人工两文件提交32b542a79d9e1a937c3b8975d20d5c6fadab282c之后读取frozen Proposal v0.2（3868886b621cd77b180af8721b39d5c620dfb9e4）与supporting map进行的。supporting map仅为被审对象，不能当推导输入答案。

## 能证明什么

04A包含363条原问题的事实触发、影响标签、目标链、原设计是否覆盖、规则投影、能力/owner/证据/入口/判定/claim及处置。事实编码逐条按来源问题进行，不按关键词或repo名自动造Gate；同一能力标签由其语义规则选取。标准化族名沿用03以便比较，不以名字相同作为证明。

这仍然是**设计推演**：没有所有历史任务的原始完整diff、冻结adapter/descriptor和当时目标图，也没有本轮运行生产Resolver。不能把人工输入语义标签后输出相同族名叫“独立自动推导已验证”。而且Pass A来源隔离有已披露限制。04A的v02_rule_only_verdict全部保留不可确定标签；revised列是修订合同的预期，而不是伪造现存软件的执行结果。

## 原设计的规则级反例

1. supporting map只有286条，缺Lucerna晚期20、Asteria晚期5、CARE追加52，共77条。不能用286行表宣称363全覆盖。
2. Resolver选择“更严格且可执行定义”会把标准冲突隐藏成PASS路径；06 C04改为按字段authority回流。
3. supporting map把大量声明/身份/权限/环境义务配成产品Gate；其中62条在本次归因为NON_GATE。旧表有些可能只是在列承载该机制的产品Gate，故62是需澄清的层级混合数量，不声称62个必然独立产品缺陷。
4. 单纯evidence class和hash无法表达真实native+fake backend、同身份协调伪造、已撤销OCR误判；C09/C10增加fidelity与observer约束，不能用新字段本身证明真实性。
5. 结果按gate-id单文件可能覆盖多target/run；C03固定实例key及不覆盖结果。
6. FULL如果解释为每次全量重跑会重演M36/A44；C06区分完整义务覆盖与新执行，C11区分raw复用/判断复用。

## 语义规则目录

每条产品规则均以C05事实和C06完整义务为输入；不查case id。当前历史表的tag是研究者从问题语义重建的，不是假称已有adapter已输出该tag。

| rule | capability/影响事实 | 专业owner | evidence requirements核心 | normal entry语义 | PASS/FAIL/UNKNOWN与claim |
|---|---|---|---|---|---|
|R-UI|acceptance.ui；实际界面与设计一致性|Frontend Design|ACTUAL_SURFACE_RENDER_AND_INTERACTION；C10 fidelity/observer轴按实例绑定|Frontend Design P0–P4；项目实际原生/浏览器入口|完整受影响画面、状态与动作符合冻结设计；缺目标画面为UNKNOWN；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-STATE|acceptance.state；产品状态真值|PROJECT|PRODUCTION_STATE_TRANSITION；C10 fidelity/observer轴按实例绑定|项目正常用户入口→真实状态生产者→持久层→显示|上下游身份、状态及动作后置条件一致；无观测不转健康/零值；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-NATIVE|acceptance.native；原生交互因果|PROJECT|NATIVE_ACTION_AND_POSTCONDITION；C10 fidelity/observer轴按实例绑定|候选EXE的窗口/托盘/标题栏真实操作|指定动作确实造成对应转移；替代路径不能证明所声明路径；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-INSTALL|acceptance.install；安装与生命周期|PROJECT|INSTALLED_LIFECYCLE；C10 fidelity/observer轴按实例绑定|项目安装/启动/升级/卸载正式入口|安装目标、启动偏好、单实例和卸载后置状态正确；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-PRIVACY|acceptance.privacy；数据隔离与敏感状态|PROJECT|ISOLATION_AND_FAILURE_INJECTION；C10 fidelity/observer轴按实例绑定|隔离profile/dataDir或最小权限测试身份的正式入口|实际数据边界与失败补偿成立，敏感草稿按全生命周期清除；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-PERF|acceptance.perf；声明环境中的性能与稳定性|PROJECT|CONTROLLED_BENEFIT_AND_CORE_REGRESSION；C10 fidelity/observer轴按实例绑定|项目性能入口；相同目标类/真实设备的关闭/开启对照|冻结指标与负载达到标准且核心能力不退化；不选最好样本；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-ZOTERO|acceptance.zotero；Zotero 原生批注往返|Bobbio project owner|ISOLATED_EXTERNAL_ROUNDTRIP；C10 fidelity/observer轴按实例绑定|pnpm bobbio:acceptance:0.2.0 对应正式版本扩展的隔离Reader入口|真实隔离Zotero创建/更新/删除/重入与原文一致；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-HOST|acceptance.host；真实宿主适配与无损行为|Mica project owner|HOST_DERIVED_PLUS_MANUAL_AUTHENTICATED；C10 fidelity/observer轴按实例绑定|已加载dist扩展→宿主正常编辑/发送/分支；最终登录态由用户手动验收|完整能力归属、顺序、工具块、恢复和原生输入成立；未知退回原生但不算功能完成；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-DOC|acceptance.doc；实际导出物可用性与来源保真|Research Authoring|RENDERED_DOCUMENT_AND_SOURCE；C10 fidelity/observer轴按实例绑定|实际PDF/Markdown/ZIP及最终阅读器选择或粘贴路径|完整内容/数学/来源可追溯且所声明选择编辑能力可用；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-ANDROID|acceptance.android；Android 安装包用户流程与持久化|SeminarArc project owner|INSTALLED_ANDROID_BLACKBOX；C10 fidelity/observer轴按实例绑定|scripts/run-blackbox-acceptance.ps1→显式AVD/包→普通UI|录制/保存/重启/导出及服务生命周期达到冻结目标；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-MEDIA|acceptance.media；真实媒体处理与内容正确性|SeminarArc project owner|REAL_MEDIA_CONTENT；C10 fidelity/observer轴按实例绑定|真实照片从产品导入/相机入口→增强/OCR→保存/检索|实际素材的输出内容和重启后完整集合正确；元数据盘点不算导入；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-STRESS|acceptance.stress；Android 压力恢复|SeminarArc project owner|STRESS_AND_RECOVERY；C10 fidelity/observer轴按实例绑定|项目显式设备/seed压力入口及应用恢复路径|无冻结范围内崩溃/ANR且能恢复目标应用和数据；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-HARDWARE|acceptance.hardware；真实设备能力|SeminarArc project owner|PHYSICAL_DEVICE_OBSERVATION；C10 fidelity/observer轴按实例绑定|经当前授权的精确真机麦克风/相机/锁屏路径|OEM、音质、低存储等声明在所指定设备成立；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-GRAPH|acceptance.graph；科学图真值|Asteria scientific project owner|SCIENTIFIC_GRAPH_AND_CAUSAL_TRACE；C10 fidelity/observer轴按实例绑定|canonical graph→trace/projection→实际图与Inspector|方向、索引、证据缺失、模型关系忠于科学源；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-GEOMETRY|acceptance.geometry；浏览器几何与量测可靠性|Asteria project owner|INDEPENDENT_DOM_SVG_GEOMETRY；C10 fidelity/observer轴按实例绑定|npm run test:browser 的真实DOM/SVG坐标量测|实际屏幕节点/边/标签不碰撞且量测覆盖完整；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-SCIVIS|acceptance.scivis；科学可读性与完整图体验|Frontend Design|WHOLE_SCIENTIFIC_SURFACE；C10 fidelity/observer轴按实例绑定|Frontend research-product-frontend→完整实际科学图|研究者能读懂模型/关系/证据；全图及长链不以删内容换清爽；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-DEPLOY|acceptance.deploy；已部署表面与交付一致性|PROJECT|DEPLOYED_USER_PATH；C10 fidelity/observer轴按实例绑定|项目固定正式URL及正常用户路径|部署身份与冻结候选一致且必要服务在消费时可用；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-REGISTRATION|acceptance.registration；注册完整关键路径|CUHK_Date project owner|HOSTED_VISIBLE_FORM_TRANSACTION；C10 fidelity/observer轴按实例绑定|scripts/registration-critical-path-hosted.ts→可见注册表单|正确密码/身份/问卷/重入完成且清理可审；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-HANDOFF|acceptance.handoff；一次性交接事务与persona隔离|CUHK_Date project owner|TRANSACTION_AND_SESSION_ISOLATION；C10 fidelity/observer轴按实例绑定|普通audit-ticket UI→Web/API claim→auth/state→finalize|成功后消费；中途失败可恢复；身份/场景/快照不串用；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-CATALOG|acceptance.catalog；检索内容与locale质量|CUHK_Date project owner|REAL_QUERY_CONTENT_AND_LOCALE；C10 fidelity/observer轴按实例绑定|正常Favorite Media检索入口|真实常见和歧义查询返回正确、去重、可辨且locale一致内容；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-SCI_ENTRY|acceptance.sci.entry；科研正式入口与结构忠实度|CARE scientific project owner|FORMAL_ENTRY_RUNTIME_TRACE；C10 fidelity/observer轴按实例绑定|批准Plan→formal entrypoints→实际model/train/eval链|模型结构、阶段资产、正式数据/入口符合冻结合同；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-SCI_CAUSAL|acceptance.sci.causal；参数、数据与机制因果|CARE scientific project owner|INTERVENTION_GRADIENT_DATA_LINEAGE；C10 fidelity/observer轴按实例绑定|正式训练/评价的参数干预、梯度及数据追踪|改变机制输入产生合同指定影响且应隔离路径不受影响；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-SCI_SCALE|acceptance.sci.scale；规模、总体与实验充分性|CARE scientific project owner|ADEQUATE_POPULATION_BUDGET；C10 fidelity/observer轴按实例绑定|批准训练及实际病例/中心/模态/步数→同split评价|实跑预算、总体组成和选择标准足够支持所作结论；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-SCI_EVIDENCE|acceptance.sci.evidence；科研输出与证据完整性|CARE scientific project owner|TERMINAL_COLLECTED_SCIENTIFIC_ARTIFACTS；C10 fidelity/observer轴按实例绑定|既有finalizer/collector→CSV/JSON/checkpoint/prediction/GT|终态后重新聚合且必需证据内容完整、语义一致；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-SCI_RESUME|acceptance.sci.resume；恢复训练等价性与保存可靠性|CARE scientific project owner|CONTINUOUS_VS_RESUMED_EXECUTION；C10 fidelity/observer轴按实例绑定|正式train checkpoint→中断恢复→后续训练轨迹对照|合同要求的RNG/optimizer/scheduler/sampler/内容和原子保存成立；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|
|R-SCI_CONCLUSION|acceptance.sci.conclusion；科学结论、消融与合法负结果|CARE scientific project owner|SOURCE_GROUNDED_SCIENTIFIC_JUDGMENT；C10 fidelity/observer轴按实例绑定|同split真实消融/指标→领域判断→Planner科学决定|证据足够且结论范围正确；充分负结果可以NO_GO；反例FAIL，必要观察缺失UNKNOWN；只支持绑定target的C13 claim|

`PROJECT`仅为模板；02已逐条实例化唯一owner。多个Gate可共享采集但不得合并专业裁决。

| rule | 控制义务 | authority | 为什么不新增产品Gate |
|---|---|---|---|
|R-CLAIM|交付声明与证据覆盖|workflow-core|不把准备就绪/测试绿/自评当产品完成|
|R-IDENTITY|身份与新鲜度|Bridge|实际运行对象与字节绑定，hash只证明绑定不证明能力|
|R-AUTH|授权和安全操作边界|Bridge Host Policy|脚本名称、安全标签、repo自报不能扩权|
|R-RECOVERY|原任务恢复与预算|existing workflow controller|不新建Goal重置预算，工具失败不改产品，等待不耗repair轮次|
|R-SCOPE|影响范围与回归选择|workflow-core|不按任务大小、repo名或Gate数量选FULL|
|R-RULES|规则与正常入口消费|project owner|已写规则不等于已加载，不重复堆规则|
|R-CALIBRATION|验收器校准与语义保护|gate professional owner|验收器修改者不能自签新标准；假阴性要纠正裁决|
|R-ENV|环境可执行性与局部恢复|project owner|环境缺口不伪称产品缺陷，不静默换目标|
|R-RELEASE|集成、发布与consumer适配|project owner|文档/工具变化不自动重发产品；源码完成不等于安装生效|

## 几种关键推导

- 实际窗口关闭动作→NATIVE；新凭据已经验证但没有被激活→STATE+PRIVACY，并使用真实原生入口。两者不能因为都发生在窗口里共用同一通过证据。
- 改几何量测器→CALIBRATION(GEOMETRY)+BROAD重判/必要补采；改共享布局→GEOMETRY+SCIVIS+UI的受影响闭包；部署整个图产品→FULL覆盖+DEPLOY。
- 科学formal entry出现模型缩水→SCI_ENTRY；loss weights写而未传→SCI_CAUSAL；12步却称正式训练→SCI_SCALE；receipt齐但预测/GT缺→SCI_EVIDENCE；两次eval伪称resume→SCI_RESUME；复制指标伪称消融→SCI_CONCLUSION。
- 只修validator不改产品且raw仍可信→BROAD重新resolve/重判，不全套重跑；实际collector读错EditText→MEDIA采集失效，必须补采，不能修OCR产品迎合错误selector。

## 还缺的独立证明

必须由隔离的新研究上下文从纯来源先提交manual，再在看不到manual分类结果的条件下编码架构输入并跑规则，最后才比较六维；真实历史diff缺失的行必须保留重建标签。该方法验证是07的剩余审查工作，不能由本脚本的363个非空输出替代。

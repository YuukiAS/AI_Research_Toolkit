# 七项目最终能力族摘要

清单是项目可用/承诺能力的语义目录，不是每次任务的全量执行清单。02的primary记录最先阻断的责任；secondary和claim义务形成required set。相同族在不同项目有独立实例、目标和参数。跨项目合计26种能力模板；没有按363条逐项建Gate。

| 项目 | 历史登记 | 最终能力族 | 当前证据及执行边界 |
|---|---:|---|---|
|Lucerna|53|STATE 产品状态真值；NATIVE 原生交互因果；UI 实际界面与设计一致性；PRIVACY 数据隔离与敏感状态；INSTALL 安装与生命周期|Windows EXE及真实provider状态；源码自测不能代替原生动作。前台干扰/权限、身份和准入属于NON_GATE。|
|Bobbio|32|PRIVACY 数据隔离与敏感状态；INSTALL 安装与生命周期；ZOTERO Zotero 原生批注往返；NATIVE 原生交互因果；STATE 产品状态真值；PERF 声明环境中的性能与稳定性；UI 实际界面与设计一致性|当前develop；真实隔离Zotero与fake API原生Reader性能分开。INSTALL/NATIVE为已有生命周期/原生行为的补充义务，不要求每轮重新安装。|
|Mica|46|HOST 真实宿主适配与无损行为；PERF 声明环境中的性能与稳定性；UI 实际界面与设计一致性；DOC 实际导出物可用性与来源保真|重构分支实际loaded dist；真实登录态最终验证按项目限制由用户手动。target-class≠物理低内存，heap≠process。|
|SeminarArc|32|ANDROID Android 安装包用户流程与持久化；MEDIA 真实媒体处理与内容正确性；DOC 实际导出物可用性与来源保真；UI 实际界面与设计一致性；STRESS Android 压力恢复；HARDWARE 真实设备能力|AVD installed blackbox、真实媒体、压力、真机分别取证。S11旧OCR失败已撤销；真机权限缺失不得隐式调用。|
|Asteria|52|GRAPH 科学图真值；GEOMETRY 浏览器几何与量测可靠性；SCIVIS 科学可读性与完整图体验；UI 实际界面与设计一致性；STATE 产品状态真值；DEPLOY 已部署表面与交付一致性|科学真值、屏幕几何、完整图阅读分别裁决；DEPLOY由真实URL整体交付义务引入，不被本地截图替代。|
|CUHK_Date|56|REGISTRATION 注册完整关键路径；HANDOFF 一次性交接事务与persona隔离；STATE 产品状态真值；PRIVACY 数据隔离与敏感状态；CATALOG 检索内容与locale质量；UI 实际界面与设计一致性；DEPLOY 已部署表面与交付一致性|可见注册表单、一次性票据、persona/状态、真实内容和消费时依赖；合成审查不是上线许可。|
|CARE|92|SCI_ENTRY 科研正式入口与结构忠实度；SCI_CAUSAL 参数、数据与机制因果；SCI_SCALE 规模、总体与实验充分性；SCI_EVIDENCE 科研输出与证据完整性；SCI_RESUME 恢复训练等价性与保存可靠性；SCI_CONCLUSION 科学结论、消融与合法负结果|六族保留但共享采集，不要求六次训练；调度/权限/identity另走现有机制，充分NO_GO合法。|

## 专业owner与NON_GATE

UI与SCIVIS由Frontend Design判定；DOC的最终内容/来源由Research Authoring，涉及PPT时另由Presentations承担该产物渲染义务；其余上述族由各项目专业owner拥有，CARE和Asteria图真值明确为科学owner。不是一个项目总裁判替代所有domain owner。

CLAIM/SCOPE属于workflow-core，IDENTITY属于Bridge，AUTH属于Host Policy，RECOVERY属于当前workflow controller，RULES/ENV/项目RELEASE属于对应项目owner，CALIBRATION继承被校准对象的专业authority。中央release/adaptation属于AI Skills Maintainer，不能混成项目发布。

## 数量与颗粒度

26种能力是跨项目模板数，具体项目实例数与实际required set不同。STRESS、DEPLOY等有些族来自原任务完整义务或校准对象，没有被人为制造一个新历史事故。UI一般界面与SCIVIS科学全图保留不同证据/失败语义，但可共享一次实际画面采集。Bobbio的INSTALL只在更新/安装隔离生命周期受影响时选中。

disposition：NON_GATE workflow mechanism 80；existing-gate regression 226；validator missing 15；validator hardening 37；temporarily unrunnable 4；HUMAN_ONLY 1。genuinely new project/domain gate均为0：当前历史主要暴露既有标准未消费、观察不充分和控制层混淆，不能据此断言未来永不需要新Gate。

## 当前性限制

363条是历史登记，包含已修、风险、重复根因和工具误判。本轮取得各repo源码/报告并检查关键入口，但没有实机运行。02明确区分CURRENT_SOURCE_INSPECTED、原报告更正、历史登记和未证明的当前覆盖；不把全表称为当前363个bug。

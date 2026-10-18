# 来源日志与证据限界

采集日期：2026-10-19（Asia/Hong_Kong）。原始来源只读；研究结果写用户指定GitHub目录。SOURCE_ACQUISITION_INDEX记录95次文件取得的ref/blob，**取得不等于全文逐行审阅**。下列是实际用于判断的读取范围；输出截断的长AGENTS/设计文档只主张相关段核查，不伪称全篇验证。

## 第一阶段输入

四份PRO_INPUT全文读入；363条纯source索引与83条原要求逐条用于覆盖。05_ALL_363和07_ALL_83只取编号/问题/来源，旧映射不作答案。START_HERE本轮最终补核全文；其旧三运行规划不是当前执行指令。

| 文件 | b7537eef与60d0a1f相同blob |
|---|---|
|01_USER_REQUIREMENTS_NO_SOLUTIONS.md|8881ef60f02d0030fc6eedea7977be1c031b90a2|
|02_OPEN_QUESTIONS_NO_ANSWERS.md|ad39a66d2a5b9709d48ad8d538b38c8fb2745da0|
|03_HISTORICAL_FAILURES_SOURCE_INDEX.csv|034f4b8097c59b03faa206ec5423047c0f637759|
|04_SOURCE_BOUNDARIES.md|1223c6645161e753bfbcb3b0a1fdf6d8cdb27746|

未取得旧ChatGPT线程完整逐字导出；source boundaries明确说明该缺口。本轮不能宣称复原原话全部上下文，也不能把363登记当363次独立事故。

## 生产owner与快照

| repo/ref | commit | 实际核查范围与用途 |
|---|---|---|
|AI_Skills_Collection@main|23f51b0bebd8a32f49d899f7fae1ee0e5f17e4cd|AGENTS相关owner/维护边界；Planner/Critic与Capability Gate政策；workflow-core最终交付消费domain self-QA；Frontend实际表面；research-presentations末段最终渲染；research-reporting/citation-verification；statistical-analysis；正式release Update impact。长AGENTS和board仅相关段。|
|GPT_Codex_AI_Bridge_Kit@main|a9c03b4a36c185aa98b00006c08ef600ba77d094|AGENTS；Local Autonomous Acceptance CLOSED/rescoped相关段；Reviewed Handoff身份；0.11.0最终恢复计划关键条；Persistent Run/Control/Host权限相关段。未把Bridge当专业评分器。|
|Lucerna@main|79dd2875d3da33c6a6d80e5e35bea812b84c1ceb|AGENTS、package脚本；failure-history与治理/visual合同相关段；development-acceptance入口。SelfTest不能证明EXE用户操作。|
|Bobbio@develop|a64edfd6c5b11f81599bfcfc327be5964633a7b5|AGENTS/main与develop分支差异、开发流程、0.3审计入口/coverage；安全wrapper Apply、fake Zotero性能；Zotero safety完整关键段。未运行库往返。|
|Mica-for-ChatGPT@codex/mica-product-system-rebuild|0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c|main与重构分支身份、AGENTS/package；cli.mjs、validator源断言；low-memory报告环境与收益；旧composer调查相关段。未接管真实账号。|
|SeminarArc@main|5652fe17ce60625f3ff7c758fcc0183f920189de|AGENTS、DEVICE_TESTING、blackbox/Work入口、candidate/evidence合同；真实媒体结果全文及stress相关段。确认OCR旧假阴性更正，未实际重放。|
|Asteria@main|193c033659a7612a99442763077217b130e9b756|AGENTS/AGENT_RULES、package、RC14/RC13/visual相关材料；rc19机械validator和浏览器量测函数；viewProjection来源。常零/缺值零有当前源码证据。|
|CUHK_Date@main|9f25c7754d3c80d0be74f5b71016320f55753ae6|AGENTS主要边界段、package；registration visible form、handoff claim/auth/finalize/abort；preflight/release truth；launch quality和repair prompt相关段。未宣称事务并发已验证。|
|CARE_Challenge@main|75a40e454de43b64e59a0b0b438ff57ef2bb8345|AGENTS主要科学/控制边界、formal entry静态审计、adequacy/overlay、freeze_reload eval函数；科学修订合同/lineage/batch history、B6入口相关段。未实跑任何科研任务。|

Bobbio main初读e7d929bad2d4b23939c81920e77390efbce42b96，后按当前开发入口改查develop a64edfd6c5b11f81599bfcfc327be5964633a7b5；Mica main初读7059c0dc24b908b57bd0e1f475142ba4f4520621，后查重构分支0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c。报告中的旧runtime不能当当前HEAD通过。

## Pass A来源隔离事故

追溯中央历史source locator时，04_SIX_REPO_AUDIT旧审计页面部分“对应控制/补法”列进入上下文；这超出纯来源边界。没有在人工提交前读当前Proposal v0.2或其supporting maps，但严格盲归纳仍被削弱。该事实在03提交前已披露；最终C=FAIL，不以事后声称忽略来消除污染。

## Pass B冻结来源

- Proposal v0.2：3868886b621cd77b180af8721b39d5c620dfb9e4，blob 7acce94c1989e2a4f120c1546095d95ea5bf9589；人工提交后读取全文。
- supporting map MD/CSV：787e046ca76ec36853977b3974cc6b7ef3d29aaf；286行，仅为被审对象。
- 当前研究起始head：787e046ca76ec36853977b3974cc6b7ef3d29aaf；manual freeze：32b542a79d9e1a937c3b8975d20d5c6fadab282c。

## 当前源码直接支持的关键反证

1. Lucerna package的test:development-acceptance只跑SelfTest/review-pack self-test。
2. Bobbio performance脚本startFakeZoteroLocalApi；安全wrapper存在Apply调用。
3. Mica acceptance candidate走validateBundle；文件/哈希/来源断言不能证明不受协调篡改的真实观察。
4. SeminarArc真实媒体报告更正旧0/5 OCR；当前材料写9/9，不是本轮新实测。
5. Asteria validate-architecture-rc19.mjs routeGestalt和浏览器rc19RouteGestalt含硬零/缺值零，保护diff需baseline。
6. CUHK_Date注册脚本实际使用可见控件；handoff具有claim→auth/state→finalize与abort释放路径；并发与响应丢失仍未实测。
7. CARE freeze_reload两个模型eval前向比较，不能证明继续训练等价；adequacy合同允许充分负结果。

## 官方外部来源

- [OpenAI插件打包](https://developers.openai.com/plugins/build/plugins)：本轮检索并打开manifest/extension/兼容overlay相关段；没有据此证明DA自定义字段受平台支持。
- [GitHub required checks](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks)：skip/neutral/success与专业结果不能等同。
- [in-toto Statement](https://github.com/in-toto/attestation/blob/main/spec/v1/statement.md)：只借鉴subject/predicate绑定，不引入新的签名服务。
- [Slurm job states](https://slurm.schedmd.com/job_state_codes.html)：官方状态资料用于边界核查，具体CARE队列策略以项目现有合同为准。

## GitHub读写与副作用

账户/仓库push权限已读；STARTUP_WRITE_PROBE实际提交5fe61e94bc84ef95bd78512b64b63481b91d6d4e并读回；RUN_STATE提交ebb3ad9413c4f68b562109ca4a4444f1ec04ea2d；SOURCE_LOG提交b8d6e403060166febab6b03a24b8d83f96de80cc；人工两文件提交32b542a79d9e1a937c3b8975d20d5c6fadab282c并读回。最终批次仅覆盖指定17目录的新研究文件，03/03A保持冻结，不修改production源码。

本轮源码发现不是目标机器可运行性结论。没有执行产品runner，沒有Slurm/GPU/真实设备/真实账号/付费/部署。

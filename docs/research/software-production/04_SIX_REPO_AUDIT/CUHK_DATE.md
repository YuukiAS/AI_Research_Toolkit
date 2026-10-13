# CUHK Date：产品、审查环境、服务依赖与流程失效

基准：`main@9f25c7754d3c80d0be74f5b71016320f55753ae6`。本页同时整理历史实际失败、现有修复、当前源码的证明范围和未验覆盖；不能把它们混成“所有问题现在都没修”。不复制合成账号凭据、一次性链接、真实用户资料或内部服务密钥。

## 决定性组件

| 代号 | 实际脚本/模型角色 | 实际功能与限制 |
|---|---|---|
| C-CRITICAL | `scripts/registration-critical-path-hosted.ts`：`runRegistrationCriticalPathHosted`、`completeProfileUi`、`completeQuestionnaireUi` | 真正用Playwright打开托管入口，点击注册、输入密码、完成Profile/Questionnaire、重入和Dashboard；默认每项FAIL，仅完成后改成功。初始化/清理需要明确测试环境权限，本轮未运行。 |
| C-PASSWORD | `apps/web/src/lib/blackbox-audit-passwords.js`的源码对应模块：`blackboxInternalBootstrapAuthPassword`、`blackboxUserAssignedPassword`、`assertBlackboxAuditPasswordsDistinct` | 实际被C-CRITICAL导入，同一生成语义保证内部引导密码与用户输入密码不同。文件名`.js`为TypeScript导入约定，不等于另有一份并行权威。 |
| C-DELIVERY-PREFLIGHT | `scripts/verify-gpt-work-parent-delivery-preflight.ts`：`assertFrozenSnapshot`、`runFullRegistrationCanary`、`runHandoffCanary`、`cleanupPreflightState`、`finalPersonaStateClean`、`finalHandoffsConsumed` | 已直接调用C-CRITICAL，并在finally核对清理/最终身份未污染/最终票据未消耗；这是审查包就绪，不是Dating上线许可。它持有测试管理能力，不能交纯黑盒审查者执行。 |
| C-HANDOFF | `scripts/blackbox-audit-phase-a.ts`、`prepare-questionnaire-v4-quality-audit.ts`；API `apps/api/src/app.ts`中的`claimBlackboxAuditHandoff`；当前campaign合同 | 生成明确身份/场景/快照的访问与恢复入口。已读到claim调用和合同，未把所有租约/提交/撤销实现全路径跑过；不能仅因合同齐全宣称事务安全。 |
| C-WEB | `apps/web/test/gate1-ux.test.ts`、`pnpm test:web`、既有Playwright e2e；`dashboard-view.tsx`；相应用户状态模型 | 产品级状态、保存/退出、可见操作与无匹配等回归。单元与本地网页不能替代实际托管身份、外部服务和多用户状态。 |
| C-NOMATCH | `scripts/blackbox-final-no-match-p2-regression.ts` | 针对最终无匹配状态的真实浏览器回归，来源报告明确验证Dashboard/Match不矛盾、无假对象/联系方式/逼迫降偏好、重入稳定。 |
| C-CI | `.github/workflows/verify.yml`；`scripts/verify-release-truth.ts`；`verify-current-semantic-drift.ts` | 快速检查与重型手工套件分流；发布静态事实检查不能把可变路线图锁成产品不变量。上游先失败时后续检查并未运行。 |
| C-STATIC-DEPLOY | `scripts/verify-cloudflare-staging.ts` | 只检查文件、配置及源码字符串。其名字不代表当前网站、定时任务、真实服务已经验证。 |
| C-PRODUCT | Frontend Design→产品交互/内容架构/响应式＋匹配、隐私领域判断 | 正常用户流程、身份/同意/历史语义和可读性；不得为了测试容易改匹配阈值、隐私或反复匹配规则。 |
| C-REVIEW | `UI_BLACKBOX_BROWSER_CONTRACT.md`、`AUDIT_RESULT_CONTRACT.md`、`CAMPAIGN_ORCHESTRATION.md`约束的独立GPT Work | 只能按真实UI观察，不读repo/DB/内部正确答案；多身份状态须隔离。Parent准备PASS、工具可用和产品上线通过是不同结论。 |

## 逐项登记

| 编号 | 具体暴露问题及来源 | 类型/现状 | 具体控制、为何能防、未补齐之处 |
|---|---|---|---|
| C01 | 引导登录已经设为随后给用户填写的同一密码，真实设置密码页返回422 same_password。[CF §0] | 历史确认根因 | C-PASSWORD分离两类密码且共用生成契约；真实C-CRITICAL输入表单。不能把same_password当成功或给页面写特判。 |
| C02 | 生产者预检自己生成更方便的随机密码，没用最终P01语义，导致假绿。[CF §0、3] | 历史验收失真 | 预检与最终用户输入来源一致但身份分离；C-PASSWORD断言两类凭据不同，不能换样本绕问题。 |
| C03 | 预检直接`page.evaluate(fetch(...))`推进密码状态，跳过可见表单。[CF §0、2] | 历史真实假验收 | C-CRITICAL真实输入、点击、导航和后置状态；后台API准备只属于operator，不替代用户动作。 |
| C04 | 合成账号清理触发外键约束，残留被忽略。[CF §6] | 历史工具/生命周期故障 | C-DELIVERY-PREFLIGHT和C-CRITICAL finally检查Auth删除、约束错误、测试残留；仅清理明确拥有的合成身份。 |
| C05 | 首次注册关键路径尚未绿，就跑大套件和新Work，浪费用户与计算资源。[CF §4、7] | 历史流程问题 | 先C-CRITICAL快路径，通过才准备昂贵审查；其它匹配模拟/长时压力不当作忙碌替代。 |
| C06 | 为检测交接可用而消费最终一次性票据/改变最终persona状态。[CF；CO“两批次”] | 明确反复防护的风险 | 独立一次性生产者批次与未触碰最终批次；C-DELIVERY-PREFLIGHT核对final状态未变和票据未用。 |
| C07 | 工具/浏览器会话关闭后一次性primary不可再用，没有预留恢复造成反复重跑。[CH；CO Wave C/D] | 历史基础设施失败 | C-HANDOFF预置同persona/run/campaign的reserve；仅工具丢会话且前次成功建立身份时使用，不用它绕产品拒绝。 |
| C08 | 为写报告/设置工具换浏览器或目录，丢掉已经认证的会话。[CH；CO browser pinning] | 历史执行纪律/入口问题 | 在认证前确定浏览器与输出方式，权限不足报告可留聊天；不为输出目录毁已就绪会话。 |
| C09 | 真logout、认证失败、隐私/状态污染被误当工具故障并试图恢复。[CO Recovery rules] | 当前安全边界，需逐路径验证 | C-REVIEW分类具体故障，C-HANDOFF只允许工具丢失恢复；状态不可信停止后续身份，不消耗无限票据。 |
| C10 | 子代理工具能力未经预检，带一次性token启动就失败。[CO Work-native preflight] | 已记录编排缺口 | 先一次无票据无身份的原生子任务测试，不能含生产线索；发现工具不可用不启动正式子任务。程序和平台能力仍须实测。 |
| C11 | 票据在真正认证和预期状态建立前就被消耗，后续故障无法重试。[CO two-phase consume] | 已明确修复要求；全事务本轮未运行 | API的claim/租约→验证身份与prestate→成功finalize，失败释放或过期；C-HANDOFF相关集成测试必须验证中断点，而非只检查字符串。 |
| C12 | 已处于匹配揭示/历史状态的persona误用首次onboarding入口。[CO state access] | 历史场景入口错配 | 生成器按预期前态选择entry mode，并在消费前校验；不能把用户送到别的状态再让其发现。 |
| C13 | 多个Work共享浏览器，P06等看到P01/P10账号，结论被污染。[CA；CO Gate5B] | 历史实际身份碰撞 | 每persona独立上下文/身份；未证明隔离时串行。页面可见身份与预设一致才允许操作，不能靠角色名称认为独立。 |
| C14 | P04有效交接却没有当前介绍，预定拒绝路径不可执行。[CA] | 历史环境/前置状态错误 | C-HANDOFF先物化并核对前态，C-DELIVERY-PREFLIGHT真实用户路径确认；不把未覆盖标完成。 |
| C15 | 审查中途部署/推进轮次/对方同意，导致同批材料不是同一状态。[CO wave freeze] | 明确禁止的污染风险 | 运行批次持有快照和状态资源锁；收齐当前任务再集中修，配对双方操作按依赖顺序。 |
| C16 | 新campaign误用旧已消耗primary或恢复授权，跨persona/快照续跑。[CO continuation rules] | 已记录恢复边界 | C-HANDOFF绑定准确campaign、run、persona、snapshot、许可；区分新活动和同活动恢复，不重置所有产品状态。 |
| C17 | final批次与生产者预演用同身份、内容或票据，测试预热污染独立体验。[CO disposable/final batches] | 已制定明确控制 | 两批真实独立合成身份，operator核对无交叉；独立Work不接收内置正确答案。 |
| C18 | M04没准备全部真实支持的联系方式，导致审查看不全却被判产品缺陷/通过。[CO M04 fixture] | 夹具覆盖问题 | 合成partner按当前支持的三种渠道物化，C-REVIEW实际UI验证；缺预置标夹具错误，不临时改产品。 |
| C19 | 只按最新diff验收，忽略给Work的完整任务会走到其它已知坏surface。[CO required surfaces] | 历史假就绪模式 | 从最终用户任务产生必需路径集合，再做影响筛选；新增代码少也不能跳过该任务依赖的坏路径。 |
| C20 | Favorite Media返回503/短暂不可用仍当“非本次修复范围”交给Work。[CO required dependencies] | 已记录具体误分范围 | 属最终任务必需的服务先健康核对，不健康不发/消费票据；不关联的审查不应被全局阻塞。 |
| C21 | HTTP200/非空结果被当媒体检索质量，重复、年份/来源/语言/消歧错误被漏掉。[CO media quality] | 已识别专业质量不足 | C-PRODUCT定义常见作品语义标准；实际用户查询→结果字段/去重/选择验证，网络状态只判可达。 |
| C22 | 只放行固定campaign题目，独立审查可自由查的常见作品失败被排除。[CO broader verifier] | 已记录验收取巧风险 | 覆盖真实承诺范围，用非调参查询反证；聚合报告多个失败，不首个失败掩盖剩余问题。 |
| C23 | 只检查规范题名语言，实际显示的metadata仍混入另一locale。[CO locale purity] | 明确实际质量维度 | 按用户看到的所有字段检查简繁/本地化，而不是只检查一个title。 |
| C24 | 临时Quick Tunnel进程/地址失效，staging保留旧origin，多种媒体一起不可用。[CO durable transport] | 历史外部依赖可靠性问题 | 正式长审查使用持续有效来源；诊断短隧道不升级为正式依赖。先修传输，不重造检索引擎。 |
| C25 | 发票据时预检健康，但消费时依赖已死，用户刚进场即失败。[CO consume-time] | 已提出关闭条件，本轮未跑真实消费路径 | 在冻结runtime消费前查本campaign必需依赖，失败保留primary未用，恢复后可在有效期继续。不是一次ready永久有效。 |
| C26 | Parent包可执行或P1=0就被当产品上线许可，已知P2/发布阻塞P3未关闭。[CO launch-quality] | 明确门槛区别 | C-REVIEW按launchquality合同检查语言、状态、响应式和整体体验；不机械把所有P3升阻塞，只处理合同指定项。 |
| C27 | 用户举报流被平台确认挡住，容易混成产品无法提交；也可能从未完整测过成功提交。[CO launch-quality] | 产品/平台证据边界 | 生产者用合成对象完整执行一次实际举报后置状态；Work平台确认单独记录，不替它确认也不因此宣称产品坏。 |
| C28 | 旧Work报告对新候选重复开修复，已经修过的同问题又改一轮。[CO stale-report] | 明确防重复规则 | 先比source/deployment，分类当前复现/新候选已修/夹具期望/需再现；只把确认当前失败交Codex。 |
| C29 | 查看/刷新已完成问卷而未编辑，却可能改变版本、错误状态和当前介绍。[CO read-only re-entry] | 新增必须验证的性质；本轮未断言当前故障 | C-CRITICAL/C-WEB增加无编辑重入前后数据不变，不能用“页面能开”证明纯读取。 |
| C30 | 自己实时照片状态与对方冻结揭示/历史照片状态被混同。[CO photo-state] | 产品语义边界 | 测所有权×实时/冻结×生命周期矩阵，不要求所有页面文本字面相同；独立审查判断指代清楚。 |
| C31 | 可变路线图目标被硬编码成旧release永久不变量，QuickCI第一步失败后所有实际代码测试跳过。[CI §0、2] | 历史真实连续失败 | C-CI分不可变已发布事实和当前目标metadata；不能用continue-on-error放水，也不能误称大CI重新启用。 |
| C32 | 便宜metadata漂移在安装大量依赖后才失败，浪费时间。[CI §3] | 已提出具体修复目标 | 单独轻量metadata入口先检查；失败不代表lint/test已执行。实际快套件最终仍需完整跑一次。 |
| C33 | 普通提交、文档、完整DB/浏览器/长时回归混为同级默认动作。[CI §1、5、8] | 现有已分流策略必须保留 | `verify.yml`普通代码Quick，full明确手工；文件/风险触发和concurrency避免重复，中央系统不得重新全量自动化。 |
| C34 | `verify-cloudflare-staging.ts`仅检查文件和代码字符串，不能证明线上发布、服务调用或定时任务。[CS] | 当前源码证明范围 | 保留静态配置检查；实际C-CRITICAL及托管浏览器/服务检查另取证据，结果汇总不按命令名称猜含义。 |
| C35 | 较早Supabase记录说邮件未测，后来的SMTP/跨设备OTP记录已经通过；旧报告被当当前事实。[CE；旧验证文档] | 时间/来源对齐问题 | 读取最新适用候选证据，不再笼统说从未测试真实邮件；新候选能否继承须看实际变更。 |
| C36 | 已有当前介绍/单边YES等待，Dashboard仍说下轮未开放或暂无动作。[CA P1] | 历史真实跨页状态错误 | C-WEB统一ProductState传播到Dashboard/Match/history；实际登录后操作YES并回首页验证，不只在Match看终态。 |
| C37 | 活跃等待介绍放在“过往介绍”，谁需要回应不清。[CA P2] | 历史 | C-PRODUCT区分当前/历史/隐藏和等待主体；真实不同状态的跨页检查，不能只替换一个词。 |
| C38 | 已选YES仍提示用户在截止前作决定。[CA fix themes] | 历史文案与状态错配 | 以用户自己的决定状态选择时限说明；A/B双方角色分别检验，不能复用对方措辞。 |
| C39 | 举报/拉黑/隐藏的对象和影响范围不清。[CA fix themes] | 历史用户操作理解风险 | 安全领域/产品模型明确影响当前介绍、历史展示或未来匹配；真实合成对象操作和状态回读，无真用户数据。 |
| C40 | 已完成问卷编辑未保存就返回review，summary/dashboard未更新或失败不明显。[CB A] | 历史，来源报告修复 | C-WEB确认写入成功才返回，失败留原地；C-CRITICAL编辑/保存/重入/刷新一致，不能按钮返回即成功。 |
| C41 | Profile未保存就Back/站内跳转/离开，未确认丢改动。[CB B] | 历史 | dirty状态与明确舍弃对话；测浏览器离开和应用导航，不只组件卸载。 |
| C42 | 1–5量表缺含义锚点，回答不能表达真实偏好。[CB C；CW findings] | 历史产品测量语义问题 | 匹配/问卷领域负责人定义字段特定锚点；C-PRODUCT检查实际理解，不能统一加1/5数字就算解决。 |
| C43 | 自己异地意愿与对对方状态接受度混在一起。[CB C] | 历史 | 问卷语义/字段映射和实际渲染分别区分主体；不得改匹配模型来迁就错误文案。 |
| C44 | 长重复下拉/接受度矩阵造成疲劳，严格偏好选择状态不明确。[CB C] | 历史 | 产品交互分组/摘要/共享标尺与实际选择反馈；机器检控件存在不等于适合填写。 |
| C45 | 多词专业名搜索不匹配，必须从结果选中却没有可理解的恢复说明。[CB D] | 历史 | 真实programme查询与选中后身份/字段验证；不能手工填内部ID绕过搜索。 |
| C46 | 建议列表造成Tab长绕路、CTA重复焦点，键盘操作低效。[CB E] | 历史 | e2e的`programme suggestions`和真实Tab/箭头操作；按钮数不说明键盘路径合理。 |
| C47 | 窄屏底栏遮挡内容、问卷入口难找、safe-area不足。[CB E；CW] | 历史 | 真正代表性移动viewport路径检查；共享shell修复需回归onboarding/app/public各处。 |
| C48 | matching/introduction/round等概念混用，简繁泄漏，隐私文字像内部系统术语。[CB F；CW] | 历史 | C-PRODUCT先定产品概念及locale对应，文字能力润色后实际看整屏；不把术语表存在视为已渲染正确。 |
| C49 | 法律/隐私等已有页面链接不易找，照片file input缺本地化。[CB G] | 历史界面问题 | 真实页面导航、控件标签和输入说明；本轮不新增法律审查，只检查已有产品入口。 |
| C50 | 已最终“无合适对象”，Dashboard仍显示通用“尚未公布”提示。[CN] | 历史，来源报告已修并受控托管复验 | `dashboard-view.tsx`按ProductState选结果文案；C-NOMATCH同时保留等待/过期/结束/互相同意/loading，禁止一律显示无匹配。 |
| C51 | 无匹配处理可能用假对象、联系方式或公共浏览/降低偏好的退路偷补成功。[CN] | 明确受测负面边界 | C-NOMATCH确认不存在这些控件/误导操作，允许诚实无匹配；不把真实匹配算法结果改为UI造对象。 |
| C52 | 合成审查全部关闭被当作真实用户可上线。[CN result；CP] | 明确范围界限 | 分合成业务链/真实受控launch/生产授权；无真实注册授权不打开服务，准备通过不是上线。 |
| C53 | 旧必需活体识别要求残留，可能用假provider把所有人标已验证。[CT] | 已批准信任模型迁移边界，不虚构已发生作弊 | 正确移除不适用的旧门槛并保留邮箱/自声明/控制准入；禁止假活体通过，产品措辞不夸大已验证身份。 |
| C54 | 原始问卷回答、联系方式或照片可见性不能被“测试方便”放宽。[CP] | 明确隐私/多身份保护要求 | API授权/RLS/服务状态与真实角色UI共同验证；纯截图不能证明隔离，纯DB权限不能证明界面不泄漏。 |
| C55 | Parent生成器验证了提示词字符串，但没有证明实际子任务环境、浏览器和账号隔离。[CO；CD] | 边界，不因文件齐全给全局PASS | C-REVIEW无敏感数据的工具测试＋实际persona入口观察；生成器通过只证明包结构，不证明下一阶段必可运行。 |
| C56 | `verify-release-truth.ts`仍包含很多版本条件/文字检查；新工具简单将它升级为总裁判会继承范围混杂。[CV；CI] | 当前源码结构，未说旧故障现在仍复现 | 审核每个断言的不可变/可变/实际行为类别，剥离便宜metadata与发行事实；不能删有效检查，也不能以老硬编码拖停所有开发。 |

## 此仓库推翻的简单假设

“有端到端脚本就够”被C02/C03反驳：脚本可以绕开实际用户入口。“有固定候选就够”被C24/C25反驳：长期外部依赖会变。“有独立Work就够”被C13反驳：共享会话使身份不独立。“越多规则越保险”被C31反驳：错误元数据门槛可以让真正测试长期没有执行。“只检查新diff即可”被C19反驳：用户任务依赖完整现有路径。

因此组件必须分别承担真实用户动作、数据/身份隔离、证据类型、外部依赖存续和产品语义；一个中央命令或一个超级模型不能合并这些责任。C50是有价值的轻量正例：精确状态修复＋相关旧状态回归＋托管验证已充分时，不再重开整套GPT Work。

## 来源

[CF]: https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/prompts/CODEX_REPAIR_REAL_REGISTRATION_CRITICAL_PATH_AND_FALSE_GREEN_HARNESS_2026-09-24.md
[CH]: https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/prompts/CODEX_REPAIR_QUESTIONNAIRE_GPT_WORK_HARNESS_RECOVERY_2026-09-20.md
[CO]: https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/blackbox-audit/CAMPAIGN_ORCHESTRATION.md
[CI]: https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/prompts/CODEX_CI_TRIGGER_RELEASE_TRUTH_REPAIR_2026-09-24.md
[CB]: https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/blackbox-audit/fixes/WAVE_B_REPAIR_BATCH_2026-09-11.md
[CW]: https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/blackbox-audit/reports/WAVE_B_CONSOLIDATED_REPORT_2026-09-11.md
[CA]: https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/blackbox-audit/reports/GATE5A_CONSOLIDATED_REPORT_2026-09-12.md
[CN]: https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/blackbox-audit/fixes/FINAL_NO_MATCH_P2_REPAIR_2026-09-13.md
[CE]: https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/STAGING_EMAIL_VERIFICATION.md
[CS]: https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/scripts/verify-cloudflare-staging.ts
[CV]: https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/scripts/verify-release-truth.ts
[CD]: https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/scripts/verify-gpt-work-parent-delivery-preflight.ts
[CC]: https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/scripts/registration-critical-path-hosted.ts
[CP]: https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/product/PRIVACY_MODEL.md
[CT]: https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/product/TRUST_AND_VERIFICATION.md

范围说明：已读当前编排合同及历次失效总结、密码/CI/问卷恢复专项、Wave B修复根因和Gate5A汇总；长报告附录中的每个人物逐条低优先级意见没有全部重读，完整匹配算法/数据库/所有历史分支也未逐函数审计。原始运行材料未在本轮复验。本表登记56个可追溯问题/边界，不是56个当前未修复漏洞，也不宣称仓库全部历史已穷尽。

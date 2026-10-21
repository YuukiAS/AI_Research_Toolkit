# 现实能力与架构选择

本轮核对支持一个方向：把交付保障接入已有任务入口和项目验收程序，补齐“这次该验什么、证据属于谁、失败交给谁”的连接。现有材料尚不能支持“安装后所有普通 Codex 对话都得到强制保障”。尤其是原生入口、Hook 失效和同任务持续恢复，必须作为可否决架构的前置条件。

本文件为研究候选 v0.1，后续七仓核查将修订同一文件。不是独立审查结论，不授权实施。

## 1. 用户实际经历的任务

用户说“增加真实用量显示，同时保持原来的配额功能”。系统应在第一次修改前保存用户原意、已有正式标准、所用分支与最终要运行的应用，发现共享数据层会影响旧配额，选择现有检查。明确标准已有而程序没有时，当前执行者收到补检查的具体工作项；标准不明确时只把不能推导的决策交回专业负责人。实现与检查分别产生证据，用户实际运行的 EXE 也必须属于被检查的候选。失败内容回到原任务，预算与中断规则仍由原执行入口掌管。最后报告新增功能、旧能力保护、验收器变化和未证实范围。

这条链中，测试结果只是中间输入。源码、安装包、运行实例、观察对象和用户声明必须连在一起；任何一跳缺失都不能被一个绿色总状态代替。

## 2. 本次固定的来源版本

读取时间：2026-10-21 UTC（用户所在时区为 2026-10-22）。以下均通过 GitHub 实际取得目录树/文件；固定提交避免研究中漂移。

| 来源 | 固定提交 | 事实边界 |
|---|---|---|
| 研究输入分支 | f1426b6322870c7a9d42d83ff6ea7ad8a35837a3 | 此次写入探针首提交的 parent；历史设计只作待审输入 |
| AI_Skills_Collection main | f1de8e85957d32a50f4458349f450ec65add13bb | Planner/Critic 1.7、Capability Gate 1.2、维护看板 |
| Bridge release | ba9013b9fbbd242e51b09f9d09291f417df17652 | 正式发布来源；GitHub Releases API 返回空列表，不用该列表替代 release 分支 |
| Bridge main | bc94e41f44bd5b534d8ab8caa304114b8bf90685 | 与 release 不同，不能默认 main 更接近用户正在使用的实现 |
| Bridge 当前产品开发分支 | work/bridge-core--product-scope-reset @ 7f43e146eed50d290ef9cc6ab912d106f754042c | 待与 release 逐函数比对，不能继承发布证明 |
| Lucerna main | 79dd2875d3da33c6a6d80e5e35bea812b84c1ceb | 桌面最终对象仍需获权运行验证 |
| Bobbio main / develop | e7d929bad2d4b23939c81920e77390efbce42b96 / a64edfd6c5b11f81599bfcfc327be5964633a7b5 | main 里程碑仍写 0.2.0，开发目标需单独绑定 |
| Mica main | 7059c0dc24b908b57bd0e1f475142ba4f4520621 | fixture E2E 不代表真实 ChatGPT 加载 |
| SeminarArc main | 5652fe17ce60625f3ff7c758fcc0183f920189de | 黑盒脚本存在，真机硬件能力未在本轮执行 |
| Asteria main | 193c033659a7612a99442763077217b130e9b756 | 固定部署版本需单独证明 |
| CUHK_Date main | 9f25c7754d3c80d0be74f5b71016320f55753ae6 | 正式发布授权不由 staging 验收产生 |
| CARE main | 75a40e454de43b64e59a0b0b438ff57ef2bb8345 | v3 develop 只有明确绑定任务才有效 |
| CAT-TRACE main | 0d829fb17c458a076a15ec51893e917960107c21 | 参考解释方式，不移植统计方法为交付算法 |

引用形式统一为 `仓库@上述SHA:path#函数或行`；后续 SOURCE_INDEX 给直接固定链接。

## 3. 已有代码与当前断点

| 已读取入口 | 已有机制 | 尚不能据此成立的声明 |
|---|---|---|
| Bridge `ai_bridge_kit/cli.py:run_lite_task`，L657–745 | `preflight_lite_task` 读取已存在 task，组装来源后启动一次 `codex exec`；退出通知明确不等于语义完成 | 不接收任意原生对话；没有自动发现缺验收器并完整消费结果的生产调用 |
| `reviewed_runner.py:watcher_once` L992 起、`run_codex_event` L798 起 | 校验工作流、按 event identity 启动执行者、检查权限与进展、发布；`executor_prompt` 明确读取旧 REVIEW 文件 | watcher 存在不等于当前机器已启动；代码返回 `thread_id=None`，同逻辑任务不等于同一个 App 对话 |
| `agent_flow.py` L2395–2505 | 按当前状态和 findings 路由 Executor/Verifier/合同审查/最终 Critic | 返回 next_action 本身不证明有人执行；必须核对项目 controller 消费者 |
| `persistent_run.py:start_persistent_run` | 已有终端进程存活管理；progress 和真实 child exit 分开 | 不拥有产品完成标准，不能再加 DA 调度器代替它 |
| Lucerna `development-acceptance.ps1` | 候选 admission、未跟踪语义文件检查、同次截图/PID绑定及已知坏例自测 | 不能用脚本自测代替当前 EXE 的用户行为 |
| Bobbio `Invoke-BobbioReaderAcceptanceSafe.ps1`、当前里程碑 | 正式隔离 Zotero 验收入口已存在 | main 的 0.2.0 报告不能替 develop 的 0.3.0 目标背书 |
| SeminarArc `run-blackbox-acceptance.ps1` | 选择模拟器、构建/安装 APK、UI操作与证据采集 | 存在保存按钮/截图不等于重启后数据持久化 |
| Mica `run-e2e.mjs` L45、L145起 | headless Chromium，访问本地 fixture，多种输入/复制/热路径回归 | 真实登录页面、扩展加载身份、低功耗设备进程开销未由 fixture 证明 |

AI_Skills 已读生产树中未定位到 `delivery_assurance` / `da1` / resolver 同名运行实现；这是本轮检索结果，不能推出没有任何相似能力。旧实施包自身标明尚无 Codex 实施授权。不得把设计中的字段、函数或审查意见改称生产代码。

## 4. 原生入口的可实现边界

OpenAI 官方资料确认当前有 UserPromptSubmit 和 Stop 生命周期接口；前者可传入用户请求并注入上下文，后者可要求当前会话继续。技能发现仍由模型选择，插件安装也不自动信任 Hook。[Hooks](https://learn.chatgpt.com/docs/hooks)、[插件打包](https://developers.openai.com/plugins/build/plugins)、[Skills](https://developers.openai.com/plugins/concepts/skills)。

因此，日常低摩擦方案可以设计为一次接入并信任当前 Hook 后，由用户照常发消息。但本轮没有运行 Windows Desktop、远端 App、CLI 新版本或 cloud 的实际探针，不能承诺它们等价。Hook 禁用、未信任、超时或程序未启动时，Hook 自己无法可靠证明自己“缺席”，更不能保证改写已发出的助手完成话语。独立发布/交付入口必须再次检查证据；没有该入口的原生聊天保留核心未闭合项 G1。

已有 Phase 1 `attempt_2/FINAL_RESULT.md` 的事实是：CLI 0.160.1 的 Stop 主链场景有成功观察，整个试验仍为 NO_GO，因为前置运行违反清洁执行边界。既不能抹掉机械可行性，也不能把该试验当正式可接入许可。P10/P11 注入时缺少事件，只证明没有伪造 DA PASS，不能证明平台阻断了所有假完成。

GitHub 必需状态检查接受的结果可能包含 skipped/neutral；因此发布消费方必须核对必需检查的实际执行与结果内容，不能只看绿色 UI。[GitHub 状态检查](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks)。

## 5. 三条候选路线

| 路线 | 用户操作与真实调用 | 能解决什么 | 主要代价与否决点 |
|---|---|---|---|
| A 只加固每个项目与 Bridge | 在各项目正式入口分别加选测、证据与结果校验 | 最少中央依赖；成熟黑盒/科学工具直接工作 | 七仓分别重复需求与证据失效规则；普通对话仍可能绕过入口；维护漂移较大 |
| B 小型共享交付判定 + 原入口执行 | 同一任务内生成验收义务；Bridge只绑定身份和递送；项目运行专业检查；公共纯函数判定可声明范围 | 共享的是关联/失效/结果消费，不接管领域或调度；能补“已有检查没人调用” | 增加一套窄接口及跨仓兼容成本；普通原生入口必须先证明；不能靠配置完备性假设保护未知旧功能 |
| C 成熟工具或外部编排平台 | 复用 pytest/Playwright/Android instrumentation/项目黑盒与现有CI；另可考虑独立工作流引擎 | 专业运行与重试工具成熟 | 全面迁移新调度器增加账号、持久状态、运维与多主风险；仍不能自动解决需求/标准真值、安装身份和原生聊天触发 |

初步推荐 B，并把 C 的专业运行器作为可替换依赖；不引入第二个中央 daemon、任务数据库或统一评分器。A 作为净收益不足时的退出路线必须保留。推荐不是因为 v0.5 已写成文档，而是已有各仓运行器和 Bridge 任务权威可以承担执行，只缺少可消费的义务与证据连接。若原生入口接入成本或失效行为不能满足用户承诺，则不能把 B 包装成“全平台自动”；应保留 G1 未闭合，独立审查明确否决这一承诺或要求新的入口方案。

## 6. 后续必须攻破的反例

1. 模型完全不调用 Skill；空 adapter；已有旧功能未登记。
2. 产品与阈值一起改松；固定 680；假截图或错误 PID；程序未运行却写 PASS。
3. Stop 未获信任/已失效；用户中断；预算耗尽；Reviewer 回来后没有活执行者。
4. 中央新载荷未被消费者加载；Web/API/模型/数据混版本；将合法科学负结论当实现失败。
5. 小文档修改触发重型设备测试；所有检查存在但无人阅读完整成品。

这些反例将落实为调用点、观察和失败消费者，不以“已覆盖”关闭。

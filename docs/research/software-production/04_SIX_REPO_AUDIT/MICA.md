# Mica：历史失败、当前重构中发现的问题与脚本能力

取证同时固定 `main@7059c0dc24b908b57bd0e1f475142ba4f4520621` 和活动重构分支 `codex/mica-product-system-rebuild@0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c`。**纠正此前研究中的遗漏：重构分支已经存在验收程序和多轮实际返修记录，不能再说“只有验收设计，没有代码”。** 但源码存在、报告自称通过、独立审查通过和用户当前已加载版本仍然不是同一个事实。

## 已有决定性组件

| 代号 | 已存在脚本/专业角色 | 实际作用及边界 |
|---|---|---|
| M-CLI | 重构分支 `scripts/acceptance/cli.mjs`；`acceptance:preflight`、`acceptance:focused`、`acceptance:candidate` | preflight 运行控制样本；candidate/focused 调用 `validateBundle` 检查给定证据包。该命令本身不是实时打开 ChatGPT、执行所有产品动作的驱动器。 |
| M-VALID | `scripts/acceptance/validator.mjs`：`validateBundle`、`validateMeasurement`；`acceptance/contracts.json` | 核对候选、文件摘要、证据类别、唯一门槛、原始材料与测量对应、不同验收阶段的必要集合。配置和检查器仍从 repoRoot 读取，不能仅凭一致哈希就称与实施者权限隔离。 |
| M-CONTROL | `scripts/acceptance/control-corpus.mjs`：`runControlCorpus` | 明确修改证据/契约/测量，调用同一 `validateBundle` 检查错误包；含协调篡改、固定 PASS、错误绑定和无性能收益等例子。它主要证明验证器对这些输入的判断，不等于真实产品已经在全部宿主场景中跑过坏例。 |
| M-DRIVE | `foundation-core-fixture-smoke.mjs`、`foundation-core-flow-fixture.mjs`、`popup-render-fixture.mjs`、`low-memory-*-fixture*.mjs`、`highlighter-fixture-smoke.mjs`、`highlighter-stress.mjs`、`pdf-export-fixture.mjs`、`pdf-background-fixture.mjs` | 正式构建相应模块的开发回归；当前 `test:e2e` 仍串联这些本地脚本。真实浏览器承载夹具不自动等于当前登录 ChatGPT。 |
| M-BENEFIT | `scripts/low-memory-pressure.mjs`；低内存候选报告所述 A/B/C 环境 | 比较无扩展/关闭/开启，检查附加效果与不退化。须区分堆内存、进程内存、客户端图规模、输入/滚动性能和实际设备；不能只数 DOM。 |
| M-MATERIAL | `scripts/acceptance/materialize-foundation-candidate.mjs`；候选目录、当前网页结构来源和构建脚本 | 整理已有原始观察与候选绑定。不是独立事实采集权威；上游观察错了、证据等级虚报了，自洽哈希仍不足。 |
| M-DESIGN | 当前 `MICA_PRODUCT_SYSTEM_V1.md`＋Frontend Design 的产品交互/视觉/组件专业角色 | 正常产品、排障、开发工具分开；精确回答归属、数据语义、功能优先级、现有宿主交互保护。大改按当前已批准 Goal，不能中央研究另起重构。 |
| M-REVIEW | 产品合同 §9.5 的独立实际产物审查者，§9.6 的 GPT Work 整体体验审查者 | 前者查看真实扩展/目标环境/PDF，后者审整体认知和体验。既有基础模块 R1–R4 的审查发现表明机械检查不能替代这两类判断。 |

## 问题登记

| 编号 | 真实问题/来源 | 性质与当前边界 | 决定性组件及补法 |
|---|---|---|---|
| M01 | LightSession 在当前 ChatGPT 一直等待消息，长对话性能目标没有兑现。[I1] | 历史目标来源，不能假定根因一直相同 | M-BENEFIT 先在受支持目标工作负载证明额外收益；平台适配失败需显示不可用，不无限等待。 |
| M02 | ChatGPT 已原生窗口化，只有约 5–9 个挂载消息；旧 containment 不再能当主性能方案。[I2] | 真实调查结论；版本相关 | 比较无扩展/关闭/开启实际资源与核心交互，不能给原生窗口化换名字。M-BENEFIT 要有零收益负例。 |
| M03 | Windows 大内存功能检查被误用为低内存目标设备性能结论的风险。[I2；ML] | 证据等级边界 | M-VALID 区分目标类环境和物理设备；物理内存未知不得填写设备通过。限制堆容量并非等同整机内存不足。 |
| M04 | 主线、分支、公开 ZIP、实际加载版本长期不同；旧发布早于修复。[I6；MH §2] | 历史明确故障来源 | 包摘要、构建标识、扩展已加载身份共同核对。旧包复现不能归罪新源码，旧源码通过不能替新包。 |
| M05 | 发送后原文残留、全选删除/剪切时输入框塌陷、连接器选择后重建；无 Mica 机器也复现。[I5、I6] | 宿主/扩展归因未可混同 | M-DRIVE 复现真实派生生命周期，受控 A/B 对照；没有证据不能给 Mica 定根因。修改 observer 前查宿主重建与焦点。 |
| M06 | 输入框清空或“思考中”被当发送成功，实际消息未提交。[I4] | 已观察宿主/网络故障模式；高级恢复当前延后 | 恢复模块须核对新用户消息身份及提交顺序；不以按钮状态判断。未来涉及自动重发时必须防双发，当前不能强行加入优先重构。 |
| M07 | 新问题后显示上一回答，可能是旧 DOM/消息复用或未提交，不应仅语义猜测。[I4] | 观察与根因候选分开 | 结构化消息身份、顺序和本地指纹；不能为了“智能”引入语义模型武断重发。 |
| M08 | 未确认提交就直接清空草稿，会丢输入；提交后用户继续编辑又可能误删新草稿。[I5] | 明确安全回归要求 | 生命周期检查同时看提交、草稿指纹及新编辑；工具/文件/授权存在时不能自动处理。M-DRIVE 测正常、延迟、重建和输入保留。 |
| M09 | 修 observer 时又加 observer，输入热路径和重建互相干扰。[I6；MG] | 历史诊断/实现风险 | 目标路径零额外文档查询等性能回归，与真实输入/IME/mention一起测；不是仅调用更大压力批次。 |
| M10 | 精确限流提示自动关闭可能扩大为通用对话框点击。[I3] | 功能安全边界，不断言已发生越权 | `known-interruptions-fixture-smoke.mjs` 正常/未知/多按钮/授权/删除负例；一次确认不能触发请求重试或刷新。 |
| M11 | 多次本地全绿，真实 ChatGPT 同一问题仍失败；夹具不忠实反映按钮栏、输入状态及重建。[MH §2] | 历史明确失败 | M-DRIVE 只证明夹具；M-REVIEW 必须对最低真实证据等级验收，旧坏/新好在同一真实派生场景复现。 |
| M12 | Atlas、诊断、探针和验收工具反客为主，产品能力长期未交付。[MH §2；MP 开头] | 历史 | M-DESIGN 以独立有用功能里程碑约束预算；工具修复只为当前必要证据，完成后回功能。不能把新控制器目录当阶段产值。 |
| M13 | 按钮乱放、UI 难用、正常弹窗堆开发状态，用户成为首轮 QA。[MH §2；MP §1] | 历史 | M-DESIGN 在编码前分正常/排障/开发面，M-DRIVE 渲染实际构建弹窗，M-REVIEW 看完整主流程和未知缺陷。 |
| M14 | 通过默认关闭主要功能取得安全，仍宣称产品完成。[MH §2 第8项] | 历史明确降级 | M-VALID 分“未干扰宿主”和“新增能力有效”两个判据；不开启、无注入可以证明安全，不能证明用户功能完成。 |
| M15 | 失败后反复新 Goal、新计划、让用户重试，旧证据跨候选复用。[MH §2] | 历史 | 保留同一 Goal、工作树和证据身份；同因无新证据转根因调查，用户只处理真正权限/主观决定。 |
| M16 | README/ROADMAP 与真实源码及当前优先级不一致。[MH；MR2] | 历史；R2 修订记录 | 任务定位核对当前有效来源和源码，旧 Goal 明确历史；不把过期目录/声明作为执行权威。 |
| M17 | 低内存需求缺可证伪收益门槛。[PD PSR-01] | 方案缺陷，R2 已修改 | M-BENEFIT 必须有零效果对照和目标负载；设计通过不等于性能实测通过。 |
| M18 | “调用前端设计”取代完整产品路径和设计冻结。[PD PSR-02] | 方案缺陷已修订 | M-DESIGN 输出主要状态、操作目标、退路，实际扩展渲染复验。插件调用记录不是设计质量。 |
| M19 | 宿主适配缺逐能力来源/变体/新鲜度/失效范围，局部漂移可能拖垮所有功能。[PD PSR-03] | 方案缺陷已修订 | `ChatGPTAdapter` 对能力单独有效性；M-VALID 核对本次能力集合与最低证据类别，未证明能力不可猜测。 |
| M20 | 回答语义模型缺顺序、版本/终态、数学来源、交互块及高亮冲突处理。[PD PSR-04] | 方案缺陷，重构正实施 | M-DRIVE 验证完整 AnswerDocument 的有序源映射，数学/交互块不能删掉后仍说完整。 |
| M21 | 一分钟无新文字被误当失败风险，恢复动作与实际提交证据未绑定。[PD PSR-05及澄清] | 设计已区分结构进度；功能延后 | 已提交恢复原消息，未提交才考虑一次重发；工具/文件/授权有副作用时禁止重发。不得中央系统提前实施该延后功能。 |
| M22 | 验收器缺防伪自检，无法区分有文件/哈希与真实生产路径。[PD PSR-06] | 方案缺陷，现有 M-CONTROL 已新增实码 | 复用 M-VALID/M-CONTROL，不再造同义中央验证器；仍需独立采集/权限证明而非同源自证。 |
| M23 | 实际产物审查缺证据等级，没看真正对象也可被表述通过。[PD PSR-07] | 已修改合同 | M-VALID＋M-REVIEW 记录实际扩展、当前网页、目标设备、真实 PDF 等；不足标未独立验证，不误归产品坏。 |
| M24 | PDF 文字提取/程序化文本层通过，但鼠标不能连续选正文—行内公式—正文。[PD PSR-08；I9] | 已知外部参考缺陷和硬能力要求 | `pdf-export-fixture.mjs`/`pdf-background-fixture.mjs` 作开发检查；正式门槛须实际 PDF 阅读器指针选择＋独立文本层检查，截图不能替代。 |
| M25 | 本地 contenteditable 夹具被用来推断真正 Notion 粘贴数学可用。[PD PSR-09；I10] | 方案证据不足；Notion 当前延后 | 真正宣称 Notion 能力时必须看真实目标；当前不能纳入已完成，也不能让其阻塞优先功能。 |
| M26 | 草案把旧分支才有的文档当主线文件，来源和旧实现处置不明。[PD PSR-10] | 设计缺陷已修订 | 读取活动分支和源码清单，保留好的实现检查点，明确保留/迁移/废弃而不破坏旧正例。 |
| M27 | 实施顺序不清、没有独立有用里程碑，并拟造多份重复权威文档。[PD PSR-11、13] | 设计缺陷已收敛 | 遵守当前已批准 foundation→low-memory→highlight/PDF，引用单一产品合同，不再追加五份平行长文。 |
| M28 | 未知生成生命周期被调用方指定为已结束，生成可持久回答。[MR1] | 重构历史实码缺陷，报告修复 | M-DRIVE 检查调用方不能强行指定 settled；M-VALID 读取绑定原始结果，不接受结论布尔单独证明。 |
| M29 | 未识别内容、工具/多归属回答被过滤，剩余子集却称精确匹配；交互块丢失。[MR1] | 重构历史缺陷 | 适配器未知/歧义整体拒绝精确声明，保留 unknown/opaque 类型。正文完整性和安全退回须一起测。 |
| M30 | 候选测量未从绑定原始浏览器证据取得，能力与 bootstrap 对应错。[MR1] | 重构历史缺陷 | M-VALID 对每项测量重读原始 JSON；M-CONTROL 篡改绑定测量负例。仍须证明原始采集由可信入口完成。 |
| M31 | 排障/开发页返回后焦点未回到入口；输入框变体契约与实际观察不一致。[MR1] | 历史 P2 修复记录 | M-DRIVE 真实导航后检查 activeElement，并对不同 composer variant 独立绑定来源。 |
| M32 | 能力 ID 缺失/重复/集合不相等仍可能通过。[MR2] | 重构历史验收缺陷 | M-VALID 强制 measured/contract/bootstrap 唯一且完整对应；M-CONTROL 缺失、重复负例。 |
| M33 | 只写观察 ID，没有重新核对实际来源断言。[MR2] | 重构历史缺陷 | materializer 与 validator 分别评估源数据对应断言；被篡改源断言应失败。不能靠标签自证。 |
| M34 | 仅识别原生 Copy 按钮就宣称回答归属、父容器、兄弟插入位置、尺寸均已证明。[MR3] | 重构真实审查发现 | 能力状态降为 UNKNOWN，实际禁止注入；M-VALID 要完整放置证据。当前禁注入是安全措施，完成 Copy 功能还需正面真实路径。 |
| M35 | 放置证明曾硬编码；后虽用契约/测量哈希绑定，协调改写所有对象仍能伪装完整。[MR3、MR4] | 多轮验收器缺陷；R4 报告修复 | M-CONTROL 有 coordinated forgery；M-VALID 要四项实质观察，不能仅核对内部一致。受保护源/独立采集仍是未证明边界。 |
| M36 | 验收器唯一修复、运行包未变，却可能要求全套昂贵产品重测。[MR4] | 当前记录给出正确裁剪正例 | 同一 dist 的运行证据可在影响分析后继续使用，但检查器重新判定；报告源码变化不能机械等同运行包变化。最终包有变化则重验影响部分。 |
| M37 | 低内存前候选缺真实上滑证明、恢复动作可信边界和正确环境分类。[ML] | 后续独立审查三项 P1，报告已修 | M-BENEFIT＋恢复动作测试：页面伪造状态/合成点击不触发重载；真实输入、草稿/流式/弹窗保护。 |
| M38 | 性能数据可被挑选：JS 堆下降，不代表进程内存下降；限制堆不等于物理低内存设备。[ML] | 当前报告明确区分的边界 | 正式收益评价同时报告所测指标与基线；该报告私有进程内存略增、堆下降，不能笼统宣称所有内存更省。 |
| M39 | 截断客户端图涉及关联节点和续流索引，可能破坏分支、工具和恢复。[ML] | 当前机制需维持的强回归 | 正式图验证、依赖保留、continuation index 重映射；短/中对话不截断，完整历史恢复和卸载无服务端删除。不能只测裁剪长度。 |
| M40 | 扩展级动态注册在单标签恢复窗口影响其它新标签。[ML] | 已记录实现取舍，不自动算缺陷 | 测跨标签临时恢复原生行为和后续重新启用；产品说明和回归明确边界，不把全局开关假称完全逐标签隔离。 |
| M41 | 压力运行遇 PNG 文件打开故障，容易混成产品失败或悄悄改成通过。[ML] | 报告正确记录过基础设施失败与复测 | 归因文件/证据工具，保留原失败；有界重试，不扩大产品补丁，不忽略最终证据缺口。 |
| M42 | 系统没有 npm，实际用等价 Node/pnpm 脚本；不能报告未执行的 npm test。[MR1–MR4；ML] | 已记录环境事实 | 正常命令解析器核对完整被执行链与副作用，记录实际命令；允许等价合法入口，不靠命令字符串伪证明。 |
| M43 | 当前 `acceptance:candidate` 主要验证包内容，不能证明原始观察真的发生；同 repo 中契约/验证器可被同身份修改。[MC、MV] | 当前源码能力边界，非已执行攻击 | 外部任务核对要求的验收阶段，独立采集者绑定 nonce/对象/动作；固定审查源和权限隔离，不能把一个 bundle hash 当外部信任。 |
| M44 | preflight 的坏例多为证据包变异，不能代替产品真实坏实现的端到端回放。[MT] | 当前测试层级 | 保留这些廉价校验器单测；另在正常运行路径破坏实际功能验证检测能力，不能用坏 JSON 拒绝率冒充产品质量。 |
| M45 | 主线、重构根 package 及不同里程碑报告版本不同；旧报告不代表当前 HEAD 全部通过。[MK；ML] | 当前多候选事实，不自动判版本错误 | 将报告绑定它明确声明的 runtime commit/dist/validator，不把活动分支全部拼成一个已发布版本。 |
| M46 | 普通安装/图标生成含机器专有工具路径，跨机器可能失效。[MK] | 当前可移植性观察，未执行验证 | 先检查实际工具定位，尊重现有环境，不自动复制个人认证；路径适配属于环境修复，不扩产品功能。 |

## 从 Mica 对中央架构的直接反证

1. 一个已具备正反控制、哈希和门槛集合的验证器，仍然经过多轮实质缺陷修复。因此“新增中央验收核心”不是解决方案本身。
2. 仅冻结错误或不完整的观察，会稳定地产生错误结论；必须校准每个声明需要哪种观察、谁取得、正例是否真能使用。
3. 安全地不注入、不开功能，与低内存/高亮/导出确实有用是两个要求；不能一律关闭来拿通过。
4. Mica 现有已批准重构 Goal 不得被本研究取代；中央组件只适配有效任务和证据，不另建新分支重新实现。

## 来源

[MH]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/tasks/2026-10-05-mica-product-recovery-current-gpt-ui.md
[MP]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/product/MICA_PRODUCT_SYSTEM_V1.md
[MG]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/tasks/2026-10-12-mica-product-system-rebuild-goal.md
[PD]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/reviews/2026-10-12-mica-product-system-critic-r1-disposition.md
[MR1]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/results/mica-product-system-rebuild/foundation-review-r1-repair.md
[MR2]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/results/mica-product-system-rebuild/foundation-review-r2-repair.md
[MR3]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/results/mica-product-system-rebuild/foundation-review-r3-repair.md
[MR4]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/results/mica-product-system-rebuild/foundation-review-r4-repair.md
[ML]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/results/mica-product-system-rebuild/low-memory-candidate-report.md
[MK]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/package.json
[MC]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/scripts/acceptance/cli.mjs
[MV]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/scripts/acceptance/validator.mjs
[MT]: https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/scripts/acceptance/control-corpus.mjs
[I1]: https://github.com/YuukiAS/Mica-for-ChatGPT/issues/1
[I2]: https://github.com/YuukiAS/Mica-for-ChatGPT/issues/2
[I3]: https://github.com/YuukiAS/Mica-for-ChatGPT/issues/3
[I4]: https://github.com/YuukiAS/Mica-for-ChatGPT/issues/4
[I5]: https://github.com/YuukiAS/Mica-for-ChatGPT/issues/5
[I6]: https://github.com/YuukiAS/Mica-for-ChatGPT/issues/6
[I9]: https://github.com/YuukiAS/Mica-for-ChatGPT/issues/9
[I10]: https://github.com/YuukiAS/Mica-for-ChatGPT/issues/10

来源中的 PSR 编号是方案审查发现，不等于运行故障。已明确排除的 Mica 法律/许可审查不在本次问题清单中重新作为阻塞。高亮全网页扩展、Notion、高级恢复均按当前正式任务的延后范围解释。未遍历所有旧分支和每个私有运行附件，未实际操作当前登录态 ChatGPT、低内存机器或 PDF 阅读器；不能宣称本轮复验了这些修复。

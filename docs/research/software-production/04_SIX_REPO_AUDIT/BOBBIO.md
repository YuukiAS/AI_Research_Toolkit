# Bobbio：实际问题与决定性执行、审查入口

取证基准：`develop@a64edfd6c5b11f81599bfcfc327be5964633a7b5`。本页不是产品复验，不把已接受的 0.1/0.2 重开；0.3 的内部就绪与外部/最终原生验收分别解释。历史报告里的失败与当前源码的证明范围分开。

## 具体组件

| 代号 | 实际脚本或专业角色 | 能做什么，不能做什么 |
|---|---|---|
| B-ISO | `scripts/Invoke-BobbioAcceptanceSafe.ps1`；`phase1a/windows/Prepare-BobbioZoteroTestIsolation.ps1`、`Disable-ZoteroAppUpdates.ps1` | 核对明确的 profile/data dir、更新策略、缓存及运行进程。安全 wrapper 不强杀进程，但会调用带 `-Apply` 的配置/缓存准备；`PreflightOnly` 也不能被默认当只读。 |
| B-ROUNDTRIP | `scripts/Invoke-BobbioReaderAcceptanceSafe.ps1`；`validate-0.2.0-reader-acceptance-evidence.mjs`；`Test-ZoteroProfileUntouched.ps1`、`Test-ZoteroDataDirUntouched.ps1` | 对真实隔离 Zotero 阅读/批注往返和真实资料未变更提供入口。它们证明 0.2 已定义能力，不自动覆盖 0.3 增强工具。 |
| B-NATIVE | `scripts/measure-0.3-native-performance.mjs`；`Capture-BobbioNativeShellEvidence.ps1`、`smoke-bobbio-windows-release.mjs` | 真正桌面 EXE、窗口和性能测量已有代码；性能脚本使用 `startFakeZoteroLocalApi` 和测试 Paper B。因此是“真实原生界面＋受控后端”，不是实际 Zotero 同步证明。 |
| B-PACK | `scripts/validate-0.3.0-audit-bundle.mjs` | 检查文件存在/非空、报告字段、原生性能 JSON 数值和状态断言；不是逐张看图，也不重新完成用户动作。适合证据一致性前检，不能独立宣布整屏美观。 |
| B-FRONTEND | AI Skills `frontend-visual-systems` → `figma-design-to-code`、`visual-direction`、`design-system-tokens`、`responsive-accessibility-review` | 依据 `docs/design/FIGMA_HANDOFF.md` 的真正 Figma 设计进行全屏与状态设计。调用指导不是自动执行保证；必须实际读取 Figma 并看原生渲染。 |
| B-REVIEW | `docs/audits/GPT_WORK_FULL_PRODUCT_REVIEW_PROMPT_0.3.0_2026-10-04.md`；`docs/quality/GPT_WORK_PRODUCT_REVIEW_CONTRACT.md` | 独立审查完整产品、未知缺陷、研究阅读体验和设计一致性。提示词存在不是已运行审查；本轮未调用该角色。 |
| B-DEV | `docs/quality/DEVELOPER_PRE_REVIEW_GATE.md`＋Codex；`pnpm test`、`pnpm rust:test` | 执行者负责真实内部自检、状态转移/旧能力回归、无明显问题后再交独立审查。不能用自己填的 P1/P2=0 代替实际检查。 |

## 问题登记

| 编号 | 具体事实与来源 | 类型/现状 | 对应组件、因果控制与不足 |
|---|---|---|---|
| B01 | 新建 Bobbio 专用 profile 仍指向真实 Zotero 数据目录，已启动后才发现。[BS] | 历史实际安全事故 | B-ISO 在启动前读取实际 `useDataDir/dataDir`，拒绝与真实目录重合；名称和 sync-off 不算隔离。最终以 B-ROUNDTRIP 的前后资料审计验证。 |
| B02 | 关闭自动更新偏好后，启动仍出现更新器；缓存/机器策略是另一条生命周期。[BS] | 历史 | B-ISO 核对机器更新策略和待执行更新缓存；这属于系统配置副作用，不能在未授权主机上自动修复。 |
| B03 | 已有独立 Zotero 实例，裸 `zotero://open-pdf` 仍经系统处理器触及默认 profile。[BS] | 历史实际污染 | 只在已确认测试实例内通过 UI 打开测试 PDF；前后审计发现真实资料变化则整次证据失效。通用浏览器打开链接不能替代实例绑定。 |
| B04 | 旧的不安全启动结果被误用为“真实库未触碰”的潜在依据。[BS] | 历史结果明确作废 | B-ROUNDTRIP 重新取独立前后基线，不追认污染运行。共享证据接口必须保存失效原因，不覆盖旧报告。 |
| B05 | 功能、状态、性能门槛通过，整屏仍有无意义大圆形选择控件、相邻按钮不一致、重复选择提示。[BM §Why] | 已记录视觉失败；后有内部返修报告，非本轮重验 | B-FRONTEND 修整套 Reader/Inspector 结构和组件语法，B-REVIEW 看整屏。仅局部 CSS/控件测试无法解决设计方向。 |
| B06 | 界面局部都过状态检查，却不像同一款成熟产品。[BM] | 历史，促成 Figma 整体重对齐 | 在关键状态原型和实现中都由视觉设计角色判断；必要整体审查必须在用户前完成，而不把用户当艺术指导。 |
| B07 | 健康证据可能同时显示“选择就绪”和“页面渲染失败”等矛盾状态。[BD Pass A] | 规则中列出的既有失败模式，当前是否复现未知 | B-NATIVE 获取真实 PDF/选择前置状态，矛盾则拒绝健康采集；错误画面独立存放，不能混进主成功流程。 |
| B08 | 当前论文、选择、解释与已保存历史结果可能混淆，切换论文后旧输出看似属于新论文。[BD Pass D2] | 明确回归目标，不把风险当新事故 | 测 Paper A→B、清除选择、保存后重启；同时验证当前状态失效与历史结果仍归原文。B-NATIVE 的转移测量和 B-ROUNDTRIP 来源核对组合。 |
| B09 | 分别有两个终态截图，不代表实际转移/持久化曾成功。[BD Pass D2] | 已识别证据缺陷 | 记录前态→真实动作→后态→重入，B-PACK 检查因果证据而不是文件数量。补对应未覆盖真实转移，不生成更多静态截图冒充。 |
| B10 | hover/pressed/focus 的 CSS 选择器不同，但实际像素不可辨。[BD Pass B] | 已记录的检查盲区 | B-FRONTEND/B-REVIEW 对真实控件状态并排看；B-PACK 仅保证材料在，不能代审。 |
| B11 | 修视觉时可能破坏 Inspector 延迟、滚动、重生成闪烁和后台空转。[BM Regression floors；BD Pass E] | 既有保护边界 | B-NATIVE 对相同候选测相关性能/交互；改视觉不能用功能或性能降级换好看。只测受影响交互，不每次全体系重审。 |
| B12 | 老审查提示词偏向关闭已知问题，不主动找未知缺陷。[BA 1、6] | 2026-10-04 审计明确发现 | B-REVIEW 使用完整产品维度，历史清单仅作背景；先独立操作再对照已知问题，避免“照答案打勾”。 |
| B13 | GPT Work 被当作测试执行器，而非独立产品审查者。[BA 2] | 已识别审查分工错误 | B-DEV 完成日常操作和可计算验证，B-REVIEW 才查整体体验；不能把所有确定性步骤转给昂贵模型。 |
| B14 | `READY_FOR_USER_REVIEW` 把产品审查与最后隔离 Zotero 验收混为一谈。[BA 3；BR §1] | 旧提示词缺口，现有合同已分开 | 汇总明确本地就绪/产品审查/原生集成/用户就绪/里程碑接受；读实际对应证据，不由单个 READY 推进发布。 |
| B15 | 整体产品判断并非每轮强制，容易只过局部控件。[BA 4] | 历史系统性漏检 | 重大 UI/里程碑用 B-REVIEW 全屏判断；普通小改不全审，但不得沿用已知失效的整体结论。 |
| B16 | 提及 Figma，但没定义读取失败或设计与实现偏离由谁处理。[BA 5] | 旧合同缺口 | B-FRONTEND 实际取得设计；读不到标设计覆盖缺口。偏离设计修实现，设计本身缺状态由设计负责人补，不随机改 Figma 迁就代码。 |
| B17 | 证据散落在 manifest、自评、性能、文案、交接和图片，覆盖容易漏算。[BA 7] | 历史管理缺口 | 复用已有 `REVIEW_INDEX.md`、`EVIDENCE_COVERAGE.md` 索引，不新建中央并行账本；索引逐项指实际证据，不能填一个总 PASS。 |
| B18 | 浏览器/夹具材料标签有了，但审查并未总能拒绝原生能力过度声明。[BA 8] | 历史 | B-PACK 加证据等级与声明对应，B-REVIEW 仅判断所见平台；浏览器不能关闭桌面焦点/托盘等要求。 |
| B19 | 健康主流程材料最完整，响应式与错误恢复容易被一起宣称通过。[BA 9] | 历史覆盖偏差 | B-NATIVE 采集实际紧凑尺寸与缺失 PDF 恢复；B-PACK 要求不同类证据，缺少不自动继承。 |
| B20 | 无障碍风险与认知负担只隐含在要求中。[BA 10] | 历史审查标准缺口 | B-REVIEW 按键盘焦点/图标用途/禁用状态/阅读连续性检查；完整无障碍认证不在证据外宣称。 |
| B21 | 文案评审忽略信息应不应该出现在此处、密度和内部流程泄漏。[BA 11] | 历史 | B-FRONTEND 先决定信息角色和层级，再交文字能力润色；B-REVIEW 检查相邻内容和实际状态，不只改措辞。 |
| B22 | 历史设计 PNG 与正式 Figma 权威被混用。[BA 12；BF] | 历史来源错位 | Figma 作当前视觉源，PNG/原型仅参考；证据索引标来源及有效版本，不得挑更容易满足的一份。 |
| B23 | 返修队列没有按生产代码、Figma、证据采集、产品语义分类。[BA 13] | 已识别流程缺口 | B-REVIEW 输出具体原因和责任方；调度程序据批准范围回流，不能让 Codex 对所有问题都改 CSS。 |
| B24 | 审查提示词自身未充分确认材料、范围和就绪条件。[BA 14] | 历史 | 复用提示词自查，但只检查完整性/版本/可访问性；自查通过不能当真正产品审查通过。 |
| B25 | 未来 Curate/LearningTrace/Notion/macOS/iPad 没有明确继承各层完成含义。[BA 15] | 设计扩展缺口，不是已发生多平台故障 | 共同结果接口保留分层，产品专业判断由各适配器提供；未接平台标未覆盖，不复制五套中央状态机。 |
| B26 | Work 0.2 产品审查 PASS 被误解为实际批注往返已完成的风险。[BW] | 来源明确限制；0.2 后续已接受，不能倒退阶段 | 保留真实 Zotero→Bobbio→Zotero、改色/删除读回、缓存重建/PDF 不变等验收；历史视觉通过不跨能力使用。 |
| B27 | 当前审计包验证器包含文件非空、必需文字和提交者生成 JSON 断言。[BP] | 当前检查范围，非全盘无效 | 保留数值/结构检查；独立执行实际动作并取得原始观察，再由审查者看图。候选可改报告时哈希自洽不等于真实。 |
| B28 | 原生性能脚本使用假 Zotero API 和测试论文，不能证明真正第三方数据往返。[BN] | 当前源码证据类型 | B-NATIVE 专用于界面/性能/受控状态；正式批注互通由 B-ROUNDTRIP 负责。二者不互相替代。 |
| B29 | 名叫安全/预检的 wrapper 仍可能修改更新缓存及测试 profile。[BI] | 当前源码副作用 | 调度前检查完整调用链，明确环境和 Apply 权限；只读盘点不能运行它。共享系统不能凭脚本名字授予安全等级。 |
| B30 | 主机和开发分支约定可能被通用流程覆写：Windows 原生是产品入口，WSL 仅辅助，develop 持续协作。[BDW] | 既有有效合同 | Bridge/项目入口尊重 develop 和文件归属；不强制所有任务新分支、PR 或 Linux 执行，不迁移机器本地缓存和 token。 |
| B31 | 为通过新增工具可能另建一套脱离 Zotero 的批注世界；公式插入当前被兼容性门槛延后。[BM；BREADME] | 已批准产品边界，非已证实事故 | 技术/领域负责人先验证普通 Zotero 可读、编辑/删除和 PDF 不变；不安全工具继续未提供，不能以隐藏退路冒充支持。 |
| B32 | AI 解释、综合、用户想法被自动升级为原文或人类已确认知识。[BREADME] | 必须保护的知识语义，不虚构历史事故 | 领域模型对源引用、解释、综合与人工确认分别判断；数据模型/转移测试禁止未经用户批准的知识晋升。通用 UI 验收无法替代。 |

## 架构必须接受的结论

Bobbio 已经有分层的产品审查和执行脚本，不需要再生成一套总规范。需要补的是让实际入口消费这些分层结果，并保证审查者真的收到完整材料。用 Windows 进程/截图身份解决不了 Figma 设计偏离；用视觉模型也解决不了 Zotero 库隔离和批注权威。早期按 EXE/桌面快捷方式交付可能是合法合同，不能强制套用 Lucerna 的 NSIS 方案。

## 来源

[BS]: https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/docs/handoffs/ZOTERO_ACCEPTANCE_SAFETY_2026-09-12.md
[BM]: https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/docs/CURRENT_MILESTONE.md
[BD]: https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/docs/quality/DEVELOPER_PRE_REVIEW_GATE.md
[BA]: https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/docs/audits/0.3.0/overnight-2026-10-04/GPT_WORK_REVIEW_SYSTEM_AUDIT.md
[BR]: https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/docs/quality/GPT_WORK_PRODUCT_REVIEW_CONTRACT.md
[BF]: https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/docs/design/FIGMA_HANDOFF.md
[BW]: https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/docs/handoffs/GPT_WORK_REVIEW_0.2.0_PASS_2026-09-13.md
[BP]: https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/scripts/validate-0.3.0-audit-bundle.mjs
[BN]: https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/scripts/measure-0.3-native-performance.mjs
[BI]: https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/scripts/Invoke-BobbioAcceptanceSafe.ps1
[BDW]: https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/docs/DEVELOPMENT_WORKFLOW.md
[BREADME]: https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/README.md

本页覆盖上述事故、里程碑、审查系统审计及关键脚本中的问题集合。未逐张复验私有原生图像，未遍历所有历史分支和每个旧 Review，未在目标 Windows 执行脚本。报告“已修复”只按其被测候选保留，不替代本轮实测。

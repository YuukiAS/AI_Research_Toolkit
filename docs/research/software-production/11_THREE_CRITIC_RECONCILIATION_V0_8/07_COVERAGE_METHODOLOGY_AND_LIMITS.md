# 第七卷：363条源登记的逐项覆盖方法与不能假称完成的证据边界（B7）

## 1. 真正交付的机器可读矩阵

文件： [08_FULL_CASE_COVERAGE_MATRIX.csv](08_FULL_CASE_COVERAGE_MATRIX.csv)，**已从原始账本逐行读取、生成并写入GitHub，363条记录全部保留原始唯一编号、源文件行号、原始描述和原有判定状态**；不是只增加一个空模板或由模型口头宣称“覆盖”。当前校验如下：

| 来源 | 数量 | 来源 |
|---|---:|---|
| Lucerna L01–L33 | 33 | 04_SIX_REPO_AUDIT/LUCERNA.md |
| Bobbio B01–B32 | 32 | 04_SIX_REPO_AUDIT/BOBBIO.md |
| Mica M01–M46 | 46 | 04_SIX_REPO_AUDIT/MICA.md |
| SeminarArc S01–S32 | 32 | 04_SIX_REPO_AUDIT/SEMINARARC.md |
| Asteria A01–A47 | 47 | 04_SIX_REPO_AUDIT/ASTERIA.md |
| CUHK Date C01–C56 | 56 | 04_SIX_REPO_AUDIT/CUHK_DATE.md |
| 六库主登记合计 | **246** | 原始记录，不等于246次独立事故 |
| LX01–LX20、AX01–AX05 | **25** | 05_PROPOSED_ARCHITECTURE_V0_2/INCIDENT_ADDENDUM.md |
| CARE初版 C01–C40 | **40** | 07_CARE_AND_EXECUTABLE_REVIEW_V0_4/CARE_FAILURE_LEDGER.md |
| CARE模型追加 RB04/B7/MM/DG/PR/RACE/FLOW/DEPLOY | **52** | 08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/CARE_LINEAGE_AND_CAUSAL_AUDIT.md |
| **合计源登记** | **363** | 不含单独分母边界META-01，不等于363个独立故障 |

注意：CUHK Date的C01与CARE C01重复编号，为避免碰撞，另加source_scoped_id如CUHK_Date:C01和CARE:C01，不改原编号。Lucerna晚期有LX、Asteria晚期有AX，都保留对应项目归属。原矩阵已有problem-control-map.csv的Kxx控制和本地组件定位亦全部保留。

## 2. CSV字段为何这样设计

每行至少20个字段，含：
- source_scoped_id、original_id、project、source_path、source_line：精确到已读文件中哪个原始登记，防止仅凭抽象K号宣称覆盖。
- source_summary、source_status_raw、currentity_conservative：原始失效/风险、原文时间/状态和保守当前性。历史报告已修不等于本轮重新实测当前版本，真正风险边界不等于曾发生。
- original_causal_explanation、root_cause_family_tentative：晚期/CARE原表提供的直接因果不改写；主六库台账没有专门单列因果列时明确指出来源缺口，分类依据其原描述和控制措施人工再核对。**不从自动标签反推已经证实某种恶意动机**。
- evidence_strength：实际来源报告、历史源码/局部反例、明确风险的不同层次，不把CPU短张量断言为GPU正式训练。
- responsible_owner_to_confirm、existing_local_component_from_map、legacy_common_controls、original_control_explanation、v08_recommended_project_check：指出既有项目工具和应该沿哪条真实用户/科学路径检查，Owner具体机器身份未核实前不捏造。
- actual_coverage_state、not_covered_reason、first_pilot_flag：目前全部为**NOT_VALIDATED_ON_NORMAL_ENTRY**；即使历史真坏例已经在文献/脚本中出现，也没有在本次新工作流真实执行内完成好/坏/缺测对照，不得填“已受保护”。
- reviewer_caveat：根因族分类不等于另一个独立Critic认可，正式工作必须让原项目专业负责人核对。

## 3. 分类方法及自查

本轮初次生成363行并检查唯一身份/连续总数，采用源文本关键词作保守归类，发现37行因含义复杂不能自动可靠分类。后续逐行读取这些原描述和旧控制，人工给出更具体的候选类别，包括旧授权覆盖现授权、Zotero更新缓存副作用、Mica关闭主功能换安全、SeminarArc假阴性、Asteria实际屏幕布局与状态不一致、CARE阶段边界/无效分母、旧公式指标等。**现在矩阵中不再有UNRESOLVED_CAUSAL_CLASS空占位，但所有root_cause_family仍是待领域Owner/独立Critic核验的归因提案**，而非已经由正式根因调查认证。

核对还应检查：
1. 行号是否对应已冻结源路径、不同模型代号同名是否误并、当前临时改变的源是否导致行号漂移；
2. 同一个真实候选被多次报告形成多个编号时是否标记复发或重复来源，不能简单算节省363次P1；
3. 历史已修、合法延期/无资源、评审器误报/错误判定不能归为“实施者偷懒”；
4. 正确科学NO_GO或受权限阻塞不应该因“必须交付模型”被强迫继续昂贵训练；
5. 所谓项目已有脚本是否**被正常路径消费**；如未真实运行必须仍列缺口；
6. 编码者有无能力同轮改写受保护参考/结果、是否因此只能称审计而非技术强制；
7. 六仓库中正常正确候选/不应改变场景应保持可通过，不能靠一律拒绝获得100%坏例召回。

## 4. 两类不能简化为一个统计数的覆盖差异

**历史根因已知且可复现**：如Lucerna未识别FIXTURE状态、Asteria硬置碰撞0、Mica默认关闭主功能、CUHK Date直接API跳过表单、CARE B6分数不看预测。可以用原候选的受控重放/安全最小函数证据建立具体拒绝测试，并提供合法正例验证。不一定要求先运行全部大模型、外网账号或真实发布。

**归因源不完整或跨版本不明确**：如部分CARE M0–M7/Batch0–6、MLoRA/FSCF私有运行片段，Bobbio未来macOS/安卓真设备权限，以及某些源码架构风险。不能因矩阵有一行就说已经复现，也不能为了“全覆盖”自行发起高费用或私人测试。应公开待取证主体及最小合法源，后续Planner可据事实更新；不能把遗漏永久删除来制造表格100%。

## 5. 七仓库项目适配并不从这363行直接生成363套测试

363行是**可追溯登记与分类**，不是363个正式门槛或363套新fixture。强制测试集合应按“本任务完整用户/科研路径依赖闭包＋受影响旧能力＋历史同机制回归＋交付要求”去重。比如：
- Lucerna状态传播用一个受控真实provider→父聚合→header/CTA的差异测试覆盖L、LX多个同根因，不能复制15个脚本。
- Asteria真实屏幕坐标和整屏科研可读是两种不同证明对象，同类旧RC可合成一个代表性设备/多尺寸控制族，不能替代必要完整原型审查。
- CARE模型参数/损失/采样忠实性按当前有效科学合同和真实消费者分组，不能因为40＋52项就每次跑92个独立长训练。
- 单纯文字改正不应触发任何GPU或受保护Windows会话，除非修改影响科学/业务状态或用户交互。

## 6. 让本矩阵从“归因提案”升级为真实工作流能力需要的证据

每个被声明适用的根因族，在目标项目正式入口下必须经过：旧历史坏例被实际拒绝；正确成熟实现被实际接受；无法观察时准确标缺证据；同一最终候选身份/权限正确；若曾经由低质量Reviewer误判，必须校准其资格并保护评审规则。只有这些全部成立，才能从NOT_VALIDATED_ON_NORMAL_ENTRY升级为对应有限范围的生产防护。

目前**没有任何一行因为“写了新控制描述”就自动升级成功**。这恰恰是B7阻塞不应靠表格数量表演关闭的核心原则。

## 7. Critic可如何使用此表

直接读取08 CSV，逐行核验source_path与source_line、必要时回原真实仓库源码；独立挑选根因不同的坏例并对照新方案中实际负责的项目脚本/领域角色。若发现某个归类把风险当事故、把旧修补误作当前缺陷，指出原行号并要求精确更新。不得只看当前v0.8文字就给B7 PASS；若关键历史真实失败根本没有能在正常入口实施的检测器，应列实质阻塞或推翻当前路线。

本目录所有源的冻结归属仍是研究分支当前版本，真正v0.8审查须绑定下一轮明确提交，不能Critic审查过程中被Planner换源。

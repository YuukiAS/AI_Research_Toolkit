# Delivery Assurance 问题覆盖与架构可行性证明 v0.1

Status: **PLANNER DESIGN PROOF / NOT PRODUCTION PASS**  
Date: 2026-10-19  
Applies to: Production Contract v0.4

## 1. 先说明“解决”到底是什么意思

本文件不声称七个仓库的 363 条历史问题已经全部在当前代码里修好。这里要证明的是更严格也更有用的一件事：**每条问题在最终架构里都有唯一归属、正常入口、验收方式、失败后的恢复负责人和能够阻止它再次被误报为完成的机制。**

如果某条历史问题只能靠未来 Codex 临场决定“该不该测、谁来测、测什么、失败找谁”，架构就没有解决它。反过来，只要它已经被绑定到以下完整链，就不再是架构空白：

```text
问题/承诺
→ 项目或领域 owner 冻结标准
→ adapter/descriptor 表达义务
→ workflow-core 选择本任务必需 Gate
→ Executor 从正常入口实现和执行
→ 专业 owner 给 PASS/FAIL/UNKNOWN
→ Bridge 核对 exact candidate/target/evidence
→ 原任务按原因返修或等待
→ 只有证据支持的 claim 才能交付
```

GPT Work 已经对 83 条用户要求和 363 条历史登记逐条建立 disposition，并通过机械完整性检查。v0.4 不是再造一份平行清单，而是补上 Critic 指出的最后一层：七个真实仓库都必须把这些抽象义务绑定到自己的正常入口、最终对象、最高风险负例和声明上限。

## 2. 为什么不会出现“一条问题一个 Gate”或“一个总 Gate 包打天下”

每个新问题先比较六个维度：

1. 用户能力；
2. 证据要求；
3. 正常入口；
4. 专业负责人；
5. 失败含义；
6. 支持的声明范围。

已有 Gate 能完整表达六个维度，就只增加回归、修验收器或补证据。至少一个维度存在无法表达的真实差异，才由相应 owner 冻结新 Gate。这样既不会给每个按钮、错误码和版本号建 Gate，也不会用一个“综合验收”吞掉 UI、科学、安装、隐私和真实设备的不同责任。

七仓历史最终归入 26 种跨项目能力模板和 9 种控制责任。Gate 数量不是运行时固定清单；每个任务只选择受 Goal、真实改动、依赖闭包和目标声明影响的实例。

## 3. 七仓历史问题怎样被真正接住

### Lucerna

历史问题集中在状态真值、原生交互、实际界面、环境覆盖、安装生命周期、候选身份和错误 Human Gate。架构分别由 Lucerna project owner、Frontend Design、Bridge 和 `workflow-core` 接住。

- “Longleaf 已失败但顶部仍正常”进入状态传播回归；
- “窗口消失但不能证明点 X 生效”进入原生动作因果；
- “fixture 截图冒充真实状态”由证据 fidelity 和 live-state target 阻止；
- “Hook PASS 冒充 Windows 隔离”由 claim ceiling 阻止；
- “source、EXE、PID、review 不一致”由 Bridge identity 阻止；
- “本可自行解决却问用户”由 Human Gate 分类阻止。

这些问题不依赖新增 Lucerna controller；正常入口继续是治理前检、acceptance preflight、native review 和项目现有恢复。

### Bobbio

历史问题集中在 Zotero 隔离、真实往返、Reader、PDF 不变性、缓存权威、原生界面和 milestone 漂移。

- isolated profile/data-dir 和禁止系统 `zotero://` handler 由 project Gate 接住；
- Bobbio cache 不能成为 annotation authority；
- 真实 Zotero 往返与 fake backend 性能证据分开；
- 0.2.0 evidence 不能满足 0.3.0 claim；
- current-status 冲突返回 authority conflict，不由 Resolver猜文件。

`bobbio--status-authority-recovery` 已作为精确前置合同冻结，因此 Bobbio 不再是“以后再想怎么接”的空白。

### Mica

历史问题集中在真实宿主、低内存收益、typing hot path、证据自洽造假、fixture 与真实 ChatGPT 混淆、用户承担调试。

- source→`dist/mica-dev`→manifest/version→loaded extension→real-site report 有完整目标链；
- synthetic fixture、isolated E2E、authenticated ChatGPT、low-power device 是不同 evidence fidelity；
- 安全 fail-open 不能代签性能收益；
- validator/contract 同轮改写必须经 frozen known-bad 校准；
- DevTools/DOM 调查责任留在 Mica 内置诊断，不转嫁给用户。

自动化最多把任务推进到真实账户/设备检查已准备好；用户只完成不可代理的最终观察，不成为第一轮性能 Reviewer。

### SeminarArc

历史问题集中在静态 Compose/假按钮/内存数据冒充 MVP、OCR harness 假阴性、Emulator 冒充硬件、golden 被自动覆盖、source/APK 漂移、设备通道阻塞扩大成全任务阻塞。

- exact APK、签名、安装实例、Room/file/foreground service 和 visible flow 分开绑定；
- 黑盒、真实媒体、视觉、压力、API 矩阵和 physical-device claim 分开；
- OCR selector 错误归 VALIDATOR_BUG，不逼产品迎合；
- golden/rubric 改动需要专业 owner，旧 raw evidence按失效规则处理；
- `DEVICE_CHANNEL_BLOCKED` 只冻结 hardware claim，其它工作继续。

不需要另造 Android controller，继续复用项目已有脚本和独立 GPT Work。

### Asteria

历史问题集中在科学图真值、几何碰撞、量测器硬编码/缺值为零、完整图可读性、fixed deployment 和 validator 与实现同时放宽。

- GRAPH、GEOMETRY、SCIVIS、UI、DEPLOY 是不同专业义务；
- 采集可以共享，判断不能合并成总 PASS；
- validator 变化保留旧标准结果、semantic diff、真实 known-bad 和独立屏幕量测；
- source→build→fixed public URL→visual pack→GPT Work 绑定同一候选；
- 临时 URL 不得替代 fixed public entry。

Asteria 被选为首个低成本完整纵向链，正是为了尽早证明公共 Resolver、adapter、Bridge 和专业 QA 在真实入口上接通，而不是先把平台铺完再发现不工作。

### CUHK_Date

历史问题集中在注册关键路径、一次性票据、persona/状态隔离、Web/API campaign identity、rehearsal/final batch 混用、locale/responsive/privacy、聚合 PASS 扩散和真实 Matching 授权。

- source、Web、API、database、campaign、ticket、persona、report 分开绑定；
- ticket 必须 commit-on-success；
- producer rehearsal 与 final batch 必须完全不同；
- 每个 launch dimension 独立取证，aggregate PASS 不扩散；
- final Matching 始终是用户新的真实授权，不由 staging PASS产生。

用户只需运行一次 canonical Parent Work并做最终 go/no-go，不负责调试票据、persona 和状态机。

### CARE_Challenge

历史问题集中在正式入口未真实使用、参数/数据未进入计算、训练规模不足、证据不完整、resume 伪等价、proxy metric/假消融、Slurm terminal 冒充科学完成。

六类科学 Gate 保留：SCI_ENTRY、SCI_CAUSAL、SCI_SCALE、SCI_EVIDENCE、SCI_RESUME、SCI_CONCLUSION。它们共享训练和产物，但不互相代签。

- Slurm/Persistent/Controller 继续拥有长任务；
- DA 不 submit/cancel/poll；
- terminal accounting、checkpoint、prediction/GT、aggregation、validator 和 adequacy 分开；
- 充分负结果可以是 `SCIENTIFIC_NO_GO`，但不能伪装性能成功；
- route promotion、upload 和下一轮仍由 Planner/用户决定。

## 4. 对 Critic 12 个反例的逐项回答

| 反例 | v0.4 的阻断机制 | 谁负责 | 正常入口证明 |
|---|---|---|---|
| 功能降级但测试全绿 | 专业 target Gate + same-candidate actual-surface/scientific evidence | domain/project owner | 七仓各自正向链和负向链 |
| fixture 过拟合 | evidence modality/fidelity/observer 三轴；真实目标声明不能由 fixture 升级 | gate owner + workflow-core | Mica、SeminarArc、Lucerna 实例 |
| mock/假数据活到交付 | Delivery Target Graph 必须到最终 consumed target；缺边为 UNKNOWN | project owner + Bridge | 七仓 target graph |
| 实现者改松 validator | semantic diff、旧标准结果、known-bad、protected observation、旧证据失效 | professional owner | Asteria/Mica mutation Gate |
| source 与安装/部署对象不同 | source/build/package/installed/deployed 分节点绑定 | Bridge | Lucerna EXE/PID、SeminarArc APK、Asteria deployment、CUHK Web/API |
| GUI 机械绿但体验差 | Frontend/project professional QA，机械结果不聚合 USER_READY | Frontend Design / project review | Lucerna/Asteria/Bobbio/SeminarArc |
| PPT/论文只过格式检查 | Presentations/Research Authoring descriptors 在有对应 target 时成为必需义务 | domain owner | 后续 domain lane normal entry，不由 Bridge替代 |
| CARE job 结束但科学未闭合 | operational/scientific/submission 三层 claim | CARE controller + scientific owner | CARE finalizer/validator/adequacy |
| validator 存在但正常入口未调用 | 每仓 Gate 实例必须从 normal entry走完整链；helper/unit 不够 | workflow-core + project owner | `DA-G10-*` / `DA-G14-*` |
| adapter 漏一条要求 | adapter 单调性、authority digest、missing-mapping mutation | workflow-core + project owner | 每仓 `DA-G11-*` |
| 某仓永久留到以后 | 七仓 annex、顺序和闭合条件已经冻结 | Planner / each owner | seven-consumer closure before release |
| 用户亲自发现普通问题 | producer self-QA + project/domain review 先于 HUMAN_ONLY | project/domain owner | 每仓 claim ceiling 和 human boundary |

## 5. 容易被问穿的问题，现在逐条回答

### 谁整理 AGENTS？

项目 owner 拥有语义；`workflow-core` 判断何时需要维护；当前任务 Executor 调用 PIE 0.3 生成和提交；PIE 只整理已冻结语义；Bridge 验证实际加载身份；Maintainer 发布 PIE。用户不维护。

### 谁生成 adapter？

首次接入和已冻结语义下的路径更新由 Executor生成；project owner只冻结未知产品/科学语义。中央更新由 Maintainer建立 adaptation task。

### 谁决定要不要新 Gate？

对应 project/domain professional owner按六维可表达性决定；`workflow-core` 只识别 existing family / standard gap，不发明标准。

### Gate 的内容从哪里来？

冻结 Goal → project canonical contract/AGENTS → domain contract →历史真实回归→机械实现。Executor只能实现，不能倒过来用测试创造标准。

### Gate 多了跑哪些？

`workflow-core` 根据 Goal、target graph、adapter impact rules、actual diff和dependency closure决定 NONE/TARGETED/BROAD/FULL。Gate数量和“任务很复杂”不是FULL条件。

### 谁更新 locator？

语义不变的机械移动由 Executor/Maintainer同任务更新；语义冲突回project/domain owner。用户不维护路径清单。

### 谁处理标准冲突？

发生冲突的字段由其唯一authority owner裁决。Resolver不选“更严格”“更新”“更方便”的一份。

### 谁修 validator？

标准已冻结且机械实现缺失/有bug时由Executor修；专业owner用正例、真实坏例、缺证据校准。修validator不等于产品修改。

### 谁判断最终专业质量？

领域或项目owner。Bridge不判断UI、科学、统计、论文或设备质量。

### 谁推进返修？

原Lite/Review/Control/CARE controller继续拥有任务状态和预算。DA只提供原因和required Gate，不建第二状态机。

### 谁管Slurm和长任务？

CARE/project controller、Slurm和Persistent Run。DA只引用owner、run和resume，不提交、取消或轮询。

### 什么时候问用户？

只有不可推导产品/科学取舍、secret/auth、physical action、外部付费/发布、不可逆高影响操作或最终主观接受。普通测试、adapter、AGENTS、validator、证据和同范围返修不问用户。

### 某个高层证据缺失，会不会把全部成果判失败？

不会。claim绑定target和层级；高层UNKNOWN只阻塞该层和依赖它的更高层。`LOCAL_SOURCE`不会因为真机暂不可用变成FAIL。

### 如何防旧证据复用？

候选、目标、标准、runner、fixture/rubric、环境、observer任一相关变化都按依赖闭包失效。raw evidence和旧judgment分别判断能否复用。

### 项目没有adapter怎么办？

不得默默NONE。若任务不依赖DA，保持合法no-op并说明；若用户声明需要专业交付，返回ADAPTER_GAP/UNKNOWN，由Executor生成最小草案、project owner只裁决未知语义。

### 项目规则写了但Codex不读怎么办？

AGENTS authority set、mandatory source identity和normal-entry Gate共同检查；规则存在但未被实际加载不能PASS。PIE 0.3负责整理入口，Bridge验证读取身份。

### 中央能力更新后谁改七仓？

AI Skills Maintainer根据正式release和`Update impact`建立managed adaptation；每仓独立PASS。central完成但consumer未完成保持`ADAPTING`。

### 谁宣布完成？

`workflow-core`只聚合证据支持的claim；原任务controller发布合法completion；用户最终接受仍按项目合同。任何单一测试、Issue、receipt或Bridge状态都不能独立宣布整体完成。

## 6. 为什么这套架构可实现，而不是文档堆叠

第一，它复用的都是已经存在的生产入口。Lucerna已有preflight/native review，Bobbio已有safe runner，Mica已有build/E2E/manual diagnostic，SeminarArc已有Android black-box，Asteria已有fixed deployment/browser/GPT Work，CUHK_Date已有campaign/Parent Work，CARE已有controller/finalizer/validator。DA不替换它们，只统一“本任务必须调用哪个、结果绑定哪个对象、最多能声明什么”。

第二，公共层只做机械工作。`workflow-core`选择义务，Bridge校验身份，adapter只声明映射。专业判断留在原owner，因此无需构造一个不可能懂所有领域的中央validator。

第三，最危险的逃逸路径都有反例：漏映射、旧locator、降级MUST、旧证据、新milestone、validator同轮改松、wrong target、fake fidelity、aggregate PASS扩散。v0.4要求这些反例从正常入口直接失败，不是只测schema。

第四，实施不是一次铺开。先以Asteria贯通一条低成本真实纵向链，修公共核心，再接Lucerna和CARE两种极端，之后完成其余四仓并做fresh-session closure。这样公共接口会在早期被真实消费验证，不会等五仓都改完才暴露根本错误。

## 7. 架构层仍未完成的唯一事项

本证明加上七仓附录已经把owner、入口、恢复、human boundary、claim ceiling和missing-mapping Gate固定。仍未完成的是：

- v0.4 独立Critic审查；
- `da/1`正式冻结；
- 各实现lane的代码和真实normal-entry Gate；
- 七仓adapter实际写入；
- 正式release和managed adaptation。

这些是设计后的实施与验证，不再需要Codex临场发明架构。若独立Critic发现本文与真实repo直接冲突，应指出具体consumer/字段/因果链；不能再用“某个容易想到的问题没提”作为模糊返工理由。

## 8. 当前结论

```text
HISTORICAL_REQUIREMENT_COVERAGE=83/83_MAPPED
HISTORICAL_CASE_COVERAGE=363/363_DISPOSITIONED
SEVEN_CONSUMER_DESIGN_CHAINS=FROZEN_CANDIDATE
EASY_OWNERSHIP_QUESTIONS=ANSWERED
PRODUCTION_CAPABILITY_PROVEN=NO
READY_FOR_V0_4_CRITIC=YES
READY_FOR_CODEX=NO
```

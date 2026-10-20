# 交付保障 v0.4：完整读者说明

这套架构要解决的不是“测试不够多”，而是过去反复出现的**假完成**：代码写完了、单元测试绿了、甚至生成了截图和完成报告，但用户真正拿到的程序、网页、模型结果、论文、PPT 或安装后的产品仍然有明显问题；或者验收器和实现一起被改松，最后所有检查都绿了，却只是“自己出题、自己判卷、自己宣布通过”。

交付保障（Delivery Assurance）的目标，是把“做完功能”到“可以可信地交给用户”之间这段责任补齐。以后用户仍然只需要说“把这个功能做好”。系统自己决定这次到底要证明什么、该调用项目已有的哪些验收入口、缺什么检查需要补、哪些旧证据还能继续用、失败后由谁返修，以及最终最多能宣布完成到哪一层。用户不维护 Gate 清单，不维护 adapter，不整理 `AGENTS.md`，也不负责替 Codex 找普通缺陷。

当前 v0.4 仍然只是**架构候选**，不是已经上线的生产能力。Phase 1 已经证明 Stop Hook 这个关键接缝在受测环境中可用，但 Bridge、`workflow-core`、领域验收描述、七个项目的 adapter 和正式发布都还没有生产实现。因此现在应该理解成：**“整套职责和交接已经被设计到可以审查；代码实现和真实七仓接线仍然在后面。”**

---

## 一、先用一句话理解整套架构

整套体系可以压成一条责任链：

```text
项目/领域决定“什么叫对”
        ↓
workflow-core 决定“这次必须验什么、验多大范围”
        ↓
当前 Executor 实现功能、补已冻结的检查、运行正式入口
        ↓
项目/领域验收能力判断 PASS / FAIL / UNKNOWN
        ↓
Bridge 核对“验的到底是不是这次真正要交付的对象”
        ↓
原来的 Lite / Review / Control / 项目 controller 负责返修、等待和恢复
        ↓
workflow-core 只对证据支持的范围给出交付声明
        ↓
用户只处理真正需要人的授权、物理动作或最终产品/科学选择
```

其中最关键的边界有三条。

第一，**专业标准不属于 Bridge，也不属于 workflow-core。** UI 好不好、科学结论是否充分、统计推断是否成立、PPT 是否真的可读，都由对应项目或领域能力判断。

第二，**任务状态不属于 Delivery Assurance。** Lite、Reviewed、Control、Persistent Run、CARE controller 等原有流程继续负责预算、等待、恢复和当前任务是否还能继续。Delivery Assurance 不再造第二套任务状态机。

第三，**Bridge 只管“是不是同一个任务、同一个候选、同一个真实对象、同一份新鲜证据”。** 它不判断“图好不好看”“模型结论对不对”。

---

## 二、以后用户只说“做这个功能”，系统实际会发生什么

假设用户说：

> 把 Lucerna 的这个状态问题修好，给我一个真的可以交付的 Windows 版本。

系统不会先问用户“要跑哪些测试”。正常链固定如下。

### 1. 先确定用户真正要拿到什么

如果用户只要一个内部逻辑修复，目标可能只是源码和集成行为；如果用户要求“真正可以交付的 Windows 版本”，最终对象就不是源码，而是：

```text
source commit
→ Windows executable
→ running process / PID
→ native UI
→ provider/auth/live-state
→ 用户最后看到的状态、按钮、通知和文案
```

这张关系叫 Delivery Target Graph。它解决过去最常见的一类错误：**测试的是源码 A，交付的是安装包 B，验收截图来自旧进程 C，最后却说整体通过。**

### 2. 找到当前项目已有的验收能力

`workflow-core` 从已安装、已启用的领域插件，以及项目自己的：

```text
automation/delivery_assurance/ADAPTER.toml
automation/delivery_assurance/gates.toml
```

找到这个任务可以使用哪些验收能力。

它不会扫描整台机器，也不会把“找不到 Gate”解释成“所以不需要验收”。如果任务明明需要专业验收，但对应能力缺失，结果必须进入缺失能力处理，而不是直接完成。

### 3. 看这次真实改了什么

系统同时看五样东西：

- 冻结的 Goal；
- 用户想达到的最高交付层级；
- 最终对象图；
- 项目 adapter 里的影响规则；
- 从批准基线到当前候选的完整实际改动和依赖闭包。

所以“只改一行”不自动等于“小影响”，“项目很复杂”也不自动等于“全量重测”。

比如 Lucerna 只改一个 Provider 的状态传播，通常只触发状态语义和相关可见表面；改安装器就触发安装生命周期；改共享状态 schema，则会扩大到所有依赖这个 schema 的产品面。

### 4. 算出本任务必须证明的义务

最终义务不是 adapter 自己说了算，而是：

```text
领域最低标准
∪ 项目正式合同
∪ 当前 Goal
∪ 实际改动影响
∪ 应保持不变的已有能力
```

因此 adapter 只能增加项目义务、绑定项目参数和真实对象，不能通过“少写一条”把专业要求删掉。

### 5. 判断这次是旧 Gate 加回归，还是确实要新 Gate

绝大多数新功能和新 bug **不应该新建 Gate**。

系统比较六件事：

- 验的是不是同一种用户能力；
- 需要的证据是不是同一种；
- 正常执行入口是不是同一种；
- 专业 owner 是不是同一个；
- 失败含义是不是相同；
- 支持的交付声明是不是同一类。

如果都能由已有 Gate 表达：

```text
NEW_GATE = NO
```

动作只能是：

- 加回归；
- 修/加固 validator；
- 补缺失证据。

只有已有 Gate 确实表达不了新的专业边界时，才允许新建 Gate，而且必须先由对应项目或领域 owner 定义“什么叫对”，Executor 不能自己发明标准。

### 6. 标准已经明确，但缺检查程序时，Codex自己补

例如 Lucerna 已经明确规定：

> 已确认的关键 child failure 不能被父级 Available 吞掉。

但代码里没有对应回归测试，那么当前 Executor 应在同一个任务里自动补 old-bad/new-good regression。这个过程不需要问用户。

反过来，如果问题是：

> 以后 Dice 到底达到多少才算这个科研路线值得推进？

这不是机械实现问题，而是新的科学标准。Executor 没资格自己写一个阈值然后宣布通过；必须返回科学 owner 冻结标准。

### 7. 只跑最小但充分的验收范围

系统不是 Gate 越多越全部跑，而是四档：

| 范围 | 什么时候用 |
|---|---|
| `NONE` | 没有影响真实产品/产物/科研表面，也没有提高交付声明，而且旧证据仍完整有效 |
| `TARGETED` | 改动能稳定隔离在一个目标和依赖闭包内 |
| `BROAD` | 改了共享 runtime/schema/router/generator/adapter/validator 定义，或多个 sibling target 同时受影响 |
| `FULL` | 首次接入、完整 release/installed/live 声明、跨仓整体完成、多个产物无法安全拆分，或历史已经证明局部验收会漏掉同一整体声明 |

`FULL` 的意思是“所有适用义务都必须得到有效证据”，**不是所有测试、所有设备、所有机器每次从头跑一遍**。未失效的证据可以复用。

### 8. 从正式入口执行，而不是只跑 helper

真正的 Gate 必须从项目正常入口发生。

例如：

- Lucerna 用自己的 preflight/native review；
- Mica 用 build/test/E2E + real-site boundary；
- SeminarArc 用 APK/Emulator/black-box；
- Asteria 用 fixed public deployment + browser/visual/GPT Work；
- CARE 用 controller/finalizer/validator。

“存在一个脚本”“JSON schema 对了”“单元测试绿了”都不能代替完整用户路径。

### 9. Bridge 最后只检查“你验的是不是你要交的”

Bridge 核对：

- task；
- repo/worktree；
- source candidate；
- build/package；
- installed/deployed target；
- run/session；
- Gate definition version；
- evidence identity 和新鲜度。

如果产品后来又改了，受影响的旧证据会失效；如果只改 rubric 而原始观察仍可信，可以重新判分；如果 collector 本身坏了，就要重新采集。

### 10. 失败后回原任务，不另开新任务洗状态

如果 Gate FAIL、UNKNOWN、证据过期或 target identity 不一致，原任务进入返修/等待/恢复。

Delivery Assurance 不新建第二任务，不替 Control 或 CARE controller 做预算和轮次，不因为失败就把任务切到一个全新的“DA workflow”。

---

## 三、每个组件到底负责什么

| 组件 | 它负责的唯一问题 | 它明确不负责什么 |
|---|---|---|
| 项目 owner | 本项目什么叫正确；目标图；项目参数；项目特有验收；最终声明上限 | 不能降低领域最低标准 |
| 领域插件 | 跨项目可复用的专业标准 | 不管理项目任务状态 |
| `workflow-core` | 本任务要验哪些能力、影响多大、缺什么、最多能声明到哪 | 不发明 UI/科研/统计标准 |
| Executor | 实现功能；补已冻结的机械检查；运行正式入口；修同范围问题 | 不能改标准让自己通过 |
| Bridge | 身份、新鲜度、Stop、恢复定位 | 不判断产品/科学质量 |
| Lite / Review / Control / 项目 controller | 原任务状态、预算、等待、恢复 | 不被 DA 替代 |
| AI Skills Maintainer | 中央能力 release、`Update impact`、下游 managed adaptation | 不替 consumer 宣布通过 |
| 用户 | secret/auth、物理动作、高影响发布/付费、不可推导产品/科学选择、最终主观接受 | 不维护 Gate、adapter、AGENTS、locator、普通 QA |

这张表的目的，是让以后再问“这个东西到底谁负责”时不用重新设计。

---

## 四、这套架构里几个文件分别是什么，不是又造一套中央系统

### 1. Gate 描述文件

领域插件或项目会声明：

> 我有一个什么验收能力；什么任务适用；从哪个正常入口执行；能检查哪些目标；需要什么证据；谁有权改标准；结果怎么表达。

它只是随插件/项目分发的声明文件，不是中央数据库。

### 2. 项目 adapter

adapter 只回答：

> 这个通用能力在我的项目里，对应哪些源码区域、目标、正常入口和项目参数。

它不是一个自由删 Gate 的清单。

### 3. Gate Result

一次实际验收结果会记录：

> 用哪个标准、哪个 runner、对哪个候选和最终目标、在什么环境、看到什么证据、最后是 PASS/FAIL/UNKNOWN、这个结果能支持哪个交付层级。

### 4. Delivery Target Graph

它把“源码”“构建物”“安装实例”“部署页面”“checkpoint”“prediction”“报告”分开。

这样不会再出现一个模糊的 `candidate_ref` 代替所有东西。

### 5. `AGENTS.md`

`AGENTS.md` 是项目正常入口的稳定路由层，不是完整验收数据库。

它只应该告诉未来任务：

- 必须先读什么；
- 谁拥有哪个长期规则；
- 哪些权限/安全/隐私边界不可越；
- 哪些正式验收和 adapter 在哪里；
- 哪些长期行为绝不能被破坏。

详细 Gate rubric、fixture、历史事故和当前任务状态留在自己的正式文件里。

---

## 五、谁负责整理 AGENTS：现在已经有唯一答案

以后不是“谁碰到顺手整理”，也不是“用户发现乱了再让 Codex 收拾”。

责任固定为：

```text
项目 owner
  决定长期规则语义
        ↓
workflow-core
  判断当前任务是否触发 AGENTS 维护
        ↓
当前 Executor
  调用 Project Instructions Editor 0.3
        ↓
PIE 0.3
  读取 exact root/nested AGENTS + canonical authorities
  生成修改预览 + 完整 clean AGENTS + authority map + coverage report
        ↓
Executor
  提交项目内修改
        ↓
Bridge
  验证后续任务实际加载的是哪份 AGENTS / mandatory source
```

PIE 0.3 不决定产品或科学标准，它只把**已经决定好的权威语义**整理成稳定、短、可执行的项目入口。

### 什么情况下必须整理 AGENTS

包括：

- 新项目第一次接入 Delivery Assurance；
- root/nested AGENTS 缺失；
- authority、normal entry、adapter、Gate family、claim owner 发生变化；
- locator 移动；
- root/nested AGENTS 和正式合同冲突；
- 真实失败证明“规则写了但正常入口没读”；
- AGENTS 膨胀、重复、最新局部需求挤掉长期规则；
- 正式中央 release 的 `Update impact` 明确要求 consumer instruction adaptation。

普通小 bug、增加一个 regression、更新一份 result 不触发整份 AGENTS 重写。

### 怎样防止 Executor 用改 AGENTS 逃 Gate

每个 consumer 都必须故意测试：

- 删除一个必需 Gate locator；
- 删除一个 consumed target；
- 把 locator 指到旧版本；
- 删除一个 nested AGENTS scope；
- 把 MUST 改成 SHOULD；
- 里程碑升级后继续复用旧 PASS；
- 制造 root/nested authority conflict。

正常入口必须拒绝 `USER_READY`。

---

## 六、adapter 为什么不能通过“漏一条”把任务变绿

项目最终必须满足的义务不是“adapter 里写了什么就是什么”，而是：

```text
domain_minimums
∪ project_canonical_contract
∪ frozen_goal
∪ actual_change_impact
∪ should_not_change
```

也就是说，adapter 是**映射层**，不是裁决层。

例如 Asteria 的 adapter 如果漏掉“整体科学可读性”，但 Frontend/Scientific Visualization 的最低标准和项目正式合同仍要求这一项，Resolver 必须把它视为遗漏，而不能因为 adapter 没写就当成不适用。

如果一段改动可能影响用户表面，但 adapter 没映射到任何能力，结果是：

```text
UNKNOWN_IMPACT
```

系统扩大到相应依赖闭包，并要求修 adapter。它绝不能默默变成 `NONE`。

---

## 七、验收器本身坏了怎么办

过去已经出现过这种问题：

- Asteria 的指标被硬编码成 0；
- SeminarArc 的 OCR harness 读错控件；
- Mica 的 validator/contract 可以协调改写后继续自洽；
- golden 或 threshold 跟着产品一起被调松。

因此 Delivery Assurance 明确区分：

```text
产品坏了
验收器坏了
证据采集坏了
环境缺了
权限缺了
科学结果本身是负结论
```

如果标准是对的，只是 validator 实现错了，Executor 修 validator，不逼产品代码迎合坏测试。

如果标准真的要改，必须先有对应项目/领域 owner 的语义变更记录。旧标准、旧结果和真实坏例仍要保留用于比较；实现者不能“一边改产品、一边把评分器也改成能过”。

---

## 八、旧证据什么时候可以继续用

不是“代码改了，所以全部重跑”，也不是“以前绿过，所以永久有效”。

大致规则是：

- 最终对象变了：与它相关的旧证据失效；
- 标准变了：旧判断失效；原始观察若仍可信，可以重新判断；
- runner/collector 坏了：依赖它采集的证据需要重采；
- 环境变了：只复用与新环境确实等价的部分；
- sibling target 没受影响且身份完全一致：对应证据可以继续用；
- milestone/version 已提升：旧里程碑的 PASS 只能作为回归或 should-not-change，不能直接证明新能力。

这就是为什么完整验收不等于每轮把所有东西从头跑一遍。

---

## 九、完成不是一个总布尔值

Delivery Assurance 不再只有“完成/没完成”。

同一个任务可能同时有：

- 源码已经正确；
- 构建物已经生成；
- 安装还没验；
- 真实设备暂不可用；
- 在线服务还没发布。

因此完成声明绑定具体目标和层级：

```text
LOCAL_SOURCE
INTEGRATED
ARTIFACT_READY
INSTALLED
LIVE
```

如果 SeminarArc 的 APK 已经构建并通过 Emulator 黑盒，但真实麦克风还没验，那么它可以诚实保留 `ARTIFACT_READY` / Emulator 范围的 `INSTALLED`，而真实硬件 claim 仍然 UNKNOWN。不能把整个任务说成 FAIL，也不能越级说真实设备完成。

`USER_READY` 只是：

> 当前任务承诺的所有最终目标都达到它们各自要求的层级。

它不是一种新的证据。

---

# 十、七个真实项目到底怎样接

下面不是“举例”，而是 v0.4 已冻结的七仓接入模型。

## Lucerna：桌面原生产品

用户真正拿到的是：

```text
source commit
→ Windows EXE
→ running PID
→ native UI
→ provider/auth/live-state
→ 用户看到的状态、操作、通知和文案
```

系统复用 Lucerna 已有的 governance preflight、acceptance preflight、development acceptance、native visual acceptance 和 independent release review。

过去的风险分别这样接住：

- child 已失败但顶部仍正常 → 状态传播 Gate；
- fixture 冒充真实状态 → evidence fidelity + live-state target；
- 窗口消失但不知道是不是点 X 导致 → native interaction causality；
- source、EXE、PID、review 不是同一候选 → Bridge identity；
- Hook PASS 冒充 Windows 隔离 → claim ceiling；
- Producer 自评冒充独立 native review → observer provenance；
- 本来 Codex 自己能修却问用户 → Human Gate 分类。

用户只在真实 foreground/OS 动作、secret/auth 或最终产品接受时介入。

## Bobbio：本地 Reader + Zotero 权威

真正对象是：

```text
branch / milestone
→ Bobbio Windows Reader
→ isolated Zotero profile + data dir
→ real PDF
→ annotation create/update/delete/read-back
→ unchanged source PDF
```

这里最危险的不是 UI，而是权威和隔离。

系统必须挡住：

- 测试打开真实 Zotero profile；
- Windows 系统 `zotero://` handler 绕过 isolated profile；
- 直接改 source PDF；
- Bobbio cache 变成 annotation authority；
- 0.2.0 已接受证据直接证明 0.3.0。

当前 Bobbio 还存在真实 status authority drift，所以有单独的 `bobbio--status-authority-recovery`。修复前 Resolver 必须返回 authority conflict，而不是选择“看起来最新”的文档。

## Mica：浏览器扩展 + 真实网站 + 低功耗设备

最终链是：

```text
source / version
→ dist/mica-dev
→ actual loaded extension
→ real ChatGPT DOM/runtime
→ long-thread behavior
→ typing hot path
→ privacy-safe report
→ target low-power device
```

synthetic fixture、isolated Chromium、真实登录态 ChatGPT、低功耗设备是四种不同强度的证据。

所以：

- fixture 可以证明生命周期和已知回归；
- E2E 可以证明隔离浏览器行为；
- 真实登录态证明当前 ChatGPT 宿主兼容；
- 低功耗设备才有资格支持“真实性能收益”。

安全 fail-open 不能代签性能收益。用户最后只做一次边界清晰的真实账户/设备观察，不需要打开 DevTools、查 DOM 或当第一轮性能测试员。

## SeminarArc：Android 安装包 + 持久化 + 硬件边界

最终链是：

```text
source
→ APK + application id/version/signature/hash
→ installed package
→ Room / files / foreground service
→ visible seminar/photo/record/timeline/export flow
→ hardware-specific microphone/camera/background behavior
```

Emulator 能证明绝大多数安装和用户流程，但不能证明真实麦克风、相机或 OEM 后台行为。

过去问题的处理：

- 静态 Compose 页面/假按钮/内存数据冒充 MVP → installed black-box；
- OCR 假阴性来自 harness → validator bug；
- 自动更新 golden 掩盖退化 → protected standard；
- source 与 APK 不一致 → Bridge identity；
- 真机通道坏了就整个任务停掉 → claim-specific environment gap。

物理设备只负责它真的不可替代的那一层。

## Asteria：科学图 + 固定公网部署

最终链是：

```text
source + scientific contract
→ build
→ fixed public deployment
→ Architecture / Lineage / Evidence UI
→ DOM/SVG geometry
→ screenshot review pack
→ independent GPT Work
→ user final acceptance
```

Asteria 特别重要，因为历史上出现过“实现和 validator 一起更新，新测试全部绿，但真实布局仍可能有问题”。

因此这里必须把：

- 科学图真值；
- 几何量测；
- 整体视觉可读性；
- fixed deployment identity；
- independent review

分开判断。

Asteria 被选为第一个低成本完整纵向 consumer，就是因为它能较早用真实 fixed public entry 验证：

> Resolver 选 Gate → adapter 映射 → Bridge 绑定 deployment → 专业 QA → claim

这一整条链是否真的工作。

## CUHK_Date：多对象、多 persona、一次性票据

它不是一个单 artifact，而是：

```text
source
→ staging Web
→ staging API
→ database / ProductState
→ producer rehearsal
→ fresh final batch
→ audit ticket / browser session
→ persona reports
→ launch-quality dimensions
→ founder go/no-go
→ separately authorized real Matching
```

必须防：

- source 与部署不一致；
- Web/API campaign identity 不一致；
- ticket 在真实 session 建立前就永久消耗；
- rehearsal 和 final batch 复用身份；
- 旧 campaign 证明新 candidate；
- 一个 persona 或一个总布尔值扩散成全部维度 PASS。

完整 staging 验收仍然不能自动开启真实 Matching。那是新的用户授权边界。

## CARE：长任务 + 科学结论

最终链不是一个 job，而是：

```text
scientific contract
→ code/config/data split
→ Slurm jobs
→ checkpoint
→ prediction/ground truth
→ metrics/aggregation
→ validator
→ controller packet
→ scientific adequacy
→ route decision
```

CARE 已经有 controller、Executor、Mapper、durable finalizer、validator。Delivery Assurance 不会再造一个 Slurm controller。

它只检查六类科学义务：

- 正式入口是否真的用到；
- 参数/数据是否真实影响计算；
- 训练规模/人群/预算是否满足；
- 证据是否完整；
- resume 是否真的等价；
- 科学结论/消融是否成立。

`Slurm COMPLETED`、finalizer exit 0、receipt 存在，都不能单独变成科学完成。

---

# 十一、这套架构怎样对应过去暴露出的所有问题

GPT Work 已经把 83 条用户要求和 363 条历史登记全部给出 disposition。这里的意义不是“363 个 Gate”，而是证明每一种失败都有归属。

典型问题与阻断机制如下：

| 历史失败类型 | 现在由什么挡住 |
|---|---|
| 功能降级但测试全绿 | 专业 Gate + same-candidate actual-surface/scientific evidence |
| fixture 过拟合 | evidence fidelity 分层，低 fidelity 不能升级真实 claim |
| mock/假数据活到交付 | Target Graph 必须走到真实 consumed target |
| 实现和 validator 一起改松 | 标准版本、semantic diff、known-bad、old-standard 对照 |
| source 与安装/部署对象不同 | Bridge target identity |
| GUI 机械测试绿但真实难用 | Frontend/project qualitative QA |
| PPT/论文只过格式 | 对应 domain descriptor + final artifact review |
| CARE job 结束但科学结论没闭合 | operational 和 scientific claim 分离 |
| validator 有但正常任务没调用 | normal-entry Gate |
| adapter 漏了一条 | monotonicity + omission mutation |
| 某仓永远“以后适配” | 七仓 annex + 七仓 closure before release |
| 用户成为第一位普通 QA | producer self-QA / project-domain review 必须先于 HUMAN_ONLY |

所以这套架构真正的闭合标准不是“我们想到很多规则”，而是：

> 任何已知失败都必须能回答：谁拥有标准、哪个入口会检查、漏了会返回什么、谁修、哪些旧证据失效、最多还能声明到哪一层。

---

# 十二、如果又出现一个新问题，系统怎么处理

例如未来 Lucerna 新增一个 Provider 后又出现状态传播错误。

系统不新建一个“Provider-X Gate”。它先看已有状态传播能力是否能完整表达。如果能，加入 existing regression bank；如果没有机械检查，Executor 同任务补；如果这次还引入新的 native UI，再额外触发 actual-surface Gate。

再比如 CARE 新增一种 loss，但参数写进 config 后并没有进入实际计算。

这属于已有“参数/数据真实消费”能力，不新建 Gate。加反事实回归，例如 weight=0 与 weight=10 必须让真实 loss/gradient 产生预期差异。

只有未来出现一种真的不同的专业能力，例如全新的临床安全判据，现有科学 Gate 无法表达，才由项目/领域 owner 先冻结新标准，再新增 Gate。

---

# 十三、如果某个文件路径改了，谁维护

如果只是：

> `docs/foo.md` 移到了 `docs/bar.md`，语义完全没变。

Executor 或 Maintainer 在同一任务修 locator 和 digest，不问用户。

如果变成：

> 旧文件和新文件对“当前 milestone”“科学阈值”“发布条件”写了不同含义。

这不是路径修复，而是 authority conflict。Resolver 返回 UNKNOWN，把这个字段交给 project/domain owner。它不能自行选“时间更新”“名字更像 current”或“条件更严格”的一份。

Bobbio 当前就是这种现实反例，所以单独有 recovery contract。

---

# 十四、如果缺一个 adapter 怎么办

如果只是普通代码任务，并没有要求 Delivery Assurance 交付声明，系统可以合法 no-op，并清楚说明没有使用 DA。

如果用户要求专业交付，而项目没有 adapter：

1. 不能默默 `NONE`；
2. 返回 adapter gap；
3. Executor 根据现有项目合同和正常入口生成最小草案；
4. 已经明确的机械映射自动完成；
5. 只有真正不明确的产品/科学语义交给 project owner；
6. adapter 建好后必须跑 omission mutation；
7. 用户不维护 adapter。

---

# 十五、什么时候才真的需要用户

用户只在这些情况被打断：

- secret / OAuth / 登录；
- 物理设备或 OS 前台动作；
- 不可逆外部操作；
- 付费或公开发布；
- 无法从现有合同推导的产品取舍；
- 无法从现有科学合同推导的科学决策；
- 项目明确要求的最终主观接受。

普通测试、环境诊断、adapter、AGENTS、validator、证据整理、同范围返修、locator 更新，都由系统自己处理。

而且用户动作只是一个 checkpoint。动作完成后 Executor 必须继续同一个 Goal，把后续 validation 做完；不能“用户点了一下，所以任务就算 PASS”。

---

# 十六、为什么这不是一个新的中央大平台

因为中央层没有接管任何专业工作。

真正新增的公共能力只有：

1. `workflow-core`：把 Goal、改动、目标图和项目/领域能力算成“本任务必须验什么”；
2. Bridge：确认所有结果属于当前真实候选和目标；
3. `da/1`：定义这些层之间如何交换最少必要信息。

没有新增：

- 中央 Gate 数据库；
- 常驻 watcher/daemon；
- 新 scheduler；
- 第四 Bridge workflow；
- 第二 CURRENT / 第二 DONE；
- 中央万能 UI/科研/统计 validator。

七个项目已有的成熟入口继续使用。

---

# 十七、为什么先接 Asteria，而不是先把所有中央代码写完

如果先把 Bridge、workflow-core、所有 domain descriptor 一口气写完，再去接真实项目，最危险的是：

> 设计在纸面上很好看，直到第五个仓库才发现 public schema 根本表达不了真实 normal entry。

所以顺序改成：

```text
v0.4 设计审查
→ 冻结 da/1
→ workflow-core 最小 Resolver || Bridge 最小 identity/Stop
→ Asteria 第一条低成本完整纵向链
→ 根据真实链修公共核心
→ Lucerna native + CARE long-run 两个极端
→ Bobbio authority recovery 后接入
→ Mica + SeminarArc + CUHK_Date
→ 七仓 fresh-session normal-entry closure
→ 正式 release / managed adaptation
```

Asteria 的优点是已有 fixed public URL、浏览器回归、visual pack 和独立 GPT Work，能较低成本跑完整链。

如果实施前检证明 fixed public environment 在批准窗口不可用，唯一预定义 fallback 是 SeminarArc Emulator。Executor 不能临场挑一个最容易 PASS 的仓库。

---

# 十八、哪些问题属于 PIE 0.3，哪些属于 Delivery Assurance

PIE 0.3 只解决：

> 项目长期规则应该怎样稳定、可读、无重复地投影到 root/nested `AGENTS.md`，并且不因为整理而削弱 authority。

Delivery Assurance 解决：

> 本任务到底应该验什么、如何选择范围、结果属于哪个候选、最终能声明到哪一层。

所以：

- PIE 不决定 Gate 标准；
- DA 不直接编辑 AGENTS；
- project owner 仍然拥有长期语义；
- Executor 调 PIE 做机械整理；
- Bridge 只验证实际加载身份。

两者互相配合，但不是一套状态机。

---

# 十九、现在还没做完什么

截至 v0.4 设计候选：

已经有：

- Phase 1 Stop seam 的真实 GO；
- 公共职责架构；
- Gate 生命周期；
- adapter 单调性；
- authority/locator 生命周期；
- AGENTS owner 和 PIE 0.3 需求；
- 七仓目标图、正常入口、正向/负向链、声明上限；
- Bobbio authority recovery；
- 83/363 问题覆盖映射；
- 后续实现顺序。

还没有：

- v0.4 独立设计 Critic 的 `PROCEED`；
- public `da/1` freeze；
- production Bridge DA code；
- production workflow-core Resolver；
- PIE 0.3 implementation；
- domain descriptors；
- 七仓实际 adapter；
- 七仓 normal-entry Gate 的真实运行；
- `DA-G10`–`DA-G15` production PASS；
- formal release / managed adaptation。

因此现在不能说“Delivery Assurance 已完成”，只能说：

> **架构已经被返修成一个可以接受独立 Critic 审查的完整候选；生产能力还没有实现。**

---

# 二十、以后再问这些问题，答案应该已经固定

| 问题 | 固定答案 |
|---|---|
| 谁整理 AGENTS？ | project owner 定语义，workflow-core 触发，Executor 调 PIE 0.3，Bridge 验加载 |
| 谁生成 adapter？ | Executor 机械生成/更新；project owner 只裁决未知语义 |
| 谁决定新 Gate？ | 对应 project/domain owner；workflow-core 不发明标准 |
| Gate 内容从哪里来？ | Goal → project contract/AGENTS → domain standard → historical regression |
| Gate 太多怎么办？ | 根据 blast radius 和 claim 选 NONE/TARGETED/BROAD/FULL，不按数量全跑 |
| validator 坏了谁修？ | 标准不变时 Executor 修；专业 owner 校准 |
| 标准冲突怎么办？ | 对应字段唯一 authority owner 裁决；Resolver不猜 |
| locator 移了谁修？ | 语义不变由 Executor/Maintainer同任务机械修 |
| 旧证据能不能继续用？ | 按 candidate/target/definition/runner/environment/observer 失效闭包判断 |
| 项目没有 adapter？ | 有 DA claim 就返回 gap，自动生成草案；不能默默 NONE |
| 长任务谁管？ | 原 scheduler/controller/Persistent Run；DA不接管 |
| 什么时候问用户？ | secret/auth/physical/high-impact/new product-science choice/final acceptance |
| 真机没测是不是整个任务失败？ | 不是；只阻塞对应高层 claim |
| 谁宣布最终完成？ | workflow-core 聚合可证 claim；原 task controller 合法结束；用户按项目合同最终接受 |
| central 更新后谁改项目？ | AI Skills Maintainer 根据 release/`Update impact` 建 managed adaptation，每仓独立验收 |

如果未来再出现一个“很容易想到的问题”，首先应把它放进这张责任模型里检查：它到底是专业标准、项目映射、机械身份、任务状态、AGENTS 投影、环境/权限还是用户授权。如果其中某一类已经有 owner、入口、失败状态和恢复路径，就只补具体实现或回归；只有真的出现一个没有 owner 的新职责，才需要回架构层，而不是每个新问题都重新设计 Delivery Assurance。

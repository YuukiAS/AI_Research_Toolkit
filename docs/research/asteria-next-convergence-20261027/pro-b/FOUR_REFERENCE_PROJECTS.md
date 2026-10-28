# 四个永久参考项目

## 1. 共同模型，不同投影

四个参考项目都使用实体、类型关系、机制、实现绑定、证据、修订和变化。通用性来自共同语义，不来自相同卡片、相同路径或相同 renderer。它们必须长期保留为回归项目，每次模型、交互或视觉变更都至少覆盖一个正常状态和一个危险状态。

## 2. Delivery Assurance：纯设计系统

### 证明内容

- 用户能力、组件责任、关系载荷、真实消费者和关键机制可以在没有代码时完整表达；
- 正常交付、失败返修、恢复和旧能力保护共享一个拓扑；
- 正式实现与验证证据为 `design_only / pending`，不存在假 package、函数或测试；
- 评价来源未冻结时可以条件冻结或阻塞，而不是伪装完成；
- 设计 revision 仍能比较原因、影响和不变保证。

### 核心路径

用户能力与边界 → 架构合同 → Architecture Freeze → 正式实现 → 验证证据 → 独立评价。问题记录返回原制作任务，修复后只重跑受影响证据，同时复验旧能力保护。

### 必须保留的危险状态

评价来源尚未冻结；implementation 合法为空；证据计划存在但没有运行结果。任何实现自动补全都会让此参考失败。

## 3. Mica：真实软件

### 稳定对象

- ChatGPT DOM 与 turn／composer／connector 识别；
- long-thread observer 与 diagnostics；
- composer identity／remount 生命周期；
- stale composer／旧内容恢复状态机；
- connector continuity latch；
- 用户可见状态与降级反馈；
- fixture、Playwright 与真实页面门。

### 下钻

系统能力 → DOM 事件与状态 → 恢复／连续性机制 → repository-relative file → function／selector → test → fixed commit。

### meaningful revision

0.1.6 → 0.1.7 不显示为文件列表，而显示为输入热路径的机制变化：重型快照离开普通输入路径，恢复由清空意图触发，用户新输入可取消，连接器生命周期单独锁存；同时保存未改变的原生安全保证。

### 必须保留的危险状态

fixture 或合成测试不能冒充真实 ChatGPT 页面通过；选择器或 DOM 行为改变会让 binding stale；诊断不能删除 React 管理节点。

## 4. CAT-TRACE：科研算法

### 四类状态

1. 稳定实现：probit 数值 primitive 与稳定尾部计算，可追到 C++／R routine、梯度／稳定性测试和固定提交。
2. reference algorithm：C04-REF，可独立运行和测试，但正式可靠性门仍可显示未闭合。
3. 被撤销路线：普通零槽位 Laplace 路线被反例和独立求积推翻，保留为 corrected／superseded history。
4. open／blocked：C03 production grouped open-tail inference 仍受匿名零槽位积分器和预注册阻塞。

### 下钻

科学模型 → 数学机制／公式 → 数值算法 → routine → oracle／test／result → evidence → revision → blocker。

### 关键边界

代码绑定不更新科学真值；存在 routine 不等于算法正确；“尚无唯一算法”是合法状态；不补假实现。被反例撤销的路线保留在 history，不与当前路线等权。

## 5. STAT5060 Tutorial：产品／Artifact 验收

### 对象层级

候选产品 → 当前要求 → 页面／对象 → 机械证据 → 专业语义判断 → finding → 原制作任务 → 修复 → 重渲染 → 新候选 → 局部与完整复验。

### 关键能力

- 候选身份包含源文件、PDF、有序页面渲染、提交和生成来源；
- 机械检查定位数值、对象、身份和版面，不冒充统计／教学／视觉结论；
- finding 绑定要求、页面、对象、实际、预期、证据和发现者；
- 验收器不直接修改产品；
- 修复产生新候选，受影响证据 stale，未改对象证据可保留；
- 相邻页和整套叙事仍需代表性复验，保护旧正确内容。

### 参考问题

第 10 页 exposure 定义和 Q/A 分隔线问题用于验证：用户能自然回答“为什么没通过、哪个页面／对象／要求有问题、谁发现、修了什么、哪些证据重跑、哪些旧内容未破坏”。该问题保持 open，不能在参考原型中伪装已修复。

## 6. 长期回归矩阵

| 项目 | 正常控制 | 反向控制 |
|---|---|---|
| Delivery Assurance | 无实现仍可完成设计拓扑和冻结检查 | 自动生成假代码锚点必须失败 |
| Mica | 固定提交的函数与测试绑定 current | 同名错误函数、DOM 改变或 commit 漂移必须 stale／broken |
| CAT-TRACE | 稳定 primitive 与 reference algorithm 可下钻 | 被反例推翻路线不得显示 accepted；代码不得升级科学真值 |
| Tutorial | finding 可定位并返回原任务 | 测试通过或漂亮渲染不得自动标最终通过 |

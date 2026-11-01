# Design Assurance 输入：Grill 与 Asteria Blueprint 的职责关系

日期：2026-11-02  
状态：设计输入，不是已冻结架构，不授权实现。

## 核心关系

Design Assurance 面向“复杂构思到实施前冻结”。当前新增两类可复用能力输入：

1. **Grill Me / Grill with Docs**：负责把尚未决定的关键问题暴露并解决。
2. **Asteria Blueprint**：负责把已经形成的设计长期连接到系统结构、机制、实现、证据、修订与漂移。

二者不是替代关系，也不应合并为一个产品。

建议的阶段关系：

```text
模糊构思
  -> Grill Me / Grill with Docs
  -> 明确关键决定、理由与必要设计文档
  -> Design Assurance 收敛唯一方案并检查实施就绪
  -> Architecture Freeze
  -> Asteria Blueprint 保存和展示冻结后的系统真相及后续演进
  -> Codex 实施
  -> Asteria Blueprint 继续记录实现绑定、证据、修订与设计-实现漂移
```

当 Asteria Blueprint 后续发现新的关键空洞、设计-实现漂移或新证据推翻旧路线时，可以把具体未决问题重新交回 Design Assurance；Design Assurance 再按需要进入新的 Grill 轮次，形成新的有意义修订。

## Grill 在 Design Assurance 中应负责什么

Grill 的价值不是“多问问题”，而是阻止 AI 在实施前静默替用户做关键决定。

适合进入 Grill 的问题包括：

- 用户能力或产品行为仍有实质歧义；
- 两条路线互斥且选择会改变后续架构；
- 失败、恢复、权限、成本或不可逆边界尚未冻结；
- Codex 如果现在开始实施，仍必须自行决定核心行为；
- 当前设计依赖用户偏好或业务判断，而不是仓库事实即可回答。

事实性问题应优先从代码、文档、现有证据中调查，不应重复问用户。

Grill 结束的产物应是“已解决的关键决定及其理由”，不是完整聊天记录。

### Grill Me

适合没有现成仓库上下文或只需要快速澄清关键选择的场景。它本身不承担长期事实保存。

### Grill with Docs

适合已有真实仓库的复杂设计。重要术语、关键决定和设计理由可以沉淀为可引用文档、ADR 或后续规格，为 Design Assurance 收敛提供稳定输入。

当前只把 Matt Pocock 相关实现视为成熟外部参考，采用状态为 **REFERENCE_ONLY**。正式 Design Assurance 是否直接复用、选择性移植或只吸收方法，后续架构研究再决定，不在本输入中预设。

## Asteria Blueprint 在 Design Assurance 中应负责什么

Asteria Blueprint 不负责主持需求访谈，也不负责连续追问用户。

它负责长期回答：

- 当前系统由哪些组件和关系组成；
- 关键组件内部机制是什么；
- 关系实际传递什么、由谁消费；
- 当前设计对应哪些真实实现；
- 文件、函数、selector、测试和固定提交在哪里；
- 哪些证据支持哪些结论；
- 证据是否因实现或设计变化而失效；
- 为什么形成某次有意义修订；
- 修改了什么、明确保持了什么；
- 当前设计是否领先实现，或实现是否领先设计。

因此 Asteria Blueprint 是 Design Assurance 的**结构完整性与长期真相载体**，不是 Design Assurance 自身，也不是通用 AI 设计工作流。

## Design Assurance 应怎样消费两者

Design Assurance 应拥有阶段判断权：

- 问题尚未决定：调用 Grill；
- 事实可以从仓库直接核实：调查，不问用户；
- 关键决定已经形成：写入或更新设计来源，并映射到 Asteria Blueprint；
- 结构完整但仍缺产品/科学/专业判断：交给相应 Pro / GPT Work /领域机制，不让结构检查冒充判断；
- 冻结条件满足：形成 Architecture Freeze；
- Freeze 后发现新证据足以改变核心语义：返回 Design Assurance，建立新修订，而不是让 Codex自行改设计。

Design Assurance 不应把 Grill 的每个问题、每次回答都转成 Blueprint 对象。只有对长期系统理解有意义的决定、理由、约束和修订进入 Blueprint。

## 与 Asteria Atlas 的边界

**Asteria Blueprint** 是本条 Design Assurance 设计链中的架构、实现、证据与演进工具。

**Asteria Atlas** 是另一条未来科研相关产品方向，本输入不定义、不研究，也不让 Design Assurance 自动依赖它。

后续本项目讨论 Asteria 与 Design Assurance 的接口时，默认指 **Asteria Blueprint**。

## 后续正式设计需要回答的问题

Design Assurance 架构研究时至少要裁决：

1. Grill 是直接复用上游实现、选择性移植，还是只采用方法；
2. 哪些任务自动进入 Grill，哪些必须保持按需显式调用，避免过度盘问；
3. Grill 的哪些结果需要进入 ADR/spec，哪些只属于当前对话；
4. Design Assurance 如何把已冻结决定映射进 Asteria Blueprint，而不建立第二套同义数据模型；
5. Blueprint 检出的哪些缺口应自动回到 Design Assurance，哪些只是非阻塞信息；
6. Architecture Freeze 如何引用 Blueprint 的结构检查结果，同时保留专业判断与用户授权边界。

本文件只固定问题和职责关系，不提前替后续 Design Assurance 架构研究作最终选型。

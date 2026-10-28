# 版本、演进与漂移

## 1. Git commit 与架构修订

Git commit 是文件历史；`ArchitectureRevision` 是系统语义历史。二者可以关联但不等价：

- 文案、格式、测试重排和内部重构通常只有 commit，没有 architecture revision；
- 一个架构修订可能跨多个 commit 才完成；
- 设计先于代码时，revision 可以存在而 sourceCommit 为空；
- 修复错误绑定时，commit 可以更新而规范设计不变。

Asteria 必须显示固定 commit 作为实现证据，但不能用 commit 数量制造架构时间线。

## 2. meaningful revision 条件

满足以下至少一项才创建架构修订：

- 用户能力、边界或不变保证改变；
- 核心对象、责任或生命周期改变；
- 关键关系类型、载荷、消费者或失败语义改变；
- 关键机制、算法、公式或状态机改变；
- 实现责任、验证方法、发布／冻结门槛改变；
- 某路线被 supersede、correct、rollback；
- 证据推翻了当前设计或使关键结论失效。

每个 revision 必须给出 trigger、reason、before、after、evidence、impact、unchanged guarantees 和 alignment。

## 3. 当前优先与局部历史

默认页面只显示当前对象和当前关系。用户点一个组件可看到：

当前是什么 → 曾经是什么 → 为什么改 → 什么证据触发 → 实现哪里改 → 哪些没改 → 当前是否验证。

局部历史从涉及该对象或关系的 SemanticChange 计算。全局演进页只列 meaningful revisions，避免巨型时间线。

## 4. semantic diff

semantic diff 比较规范对象而不是原始 JSON 行：

- 实体增加、删除、修改、取代、校正和回滚；
- 关系类型与合同变化；
- 机制步骤、公式、不变量和失败模式变化；
- implementation binding、commit、anchor、test refs 和 staleness 变化；
- evidence 状态、范围和失效变化；
- view projection 只有在改变阅读语义时才进入架构 diff，普通坐标调整属于 presentation diff。

UI 默认显示 before／after、为什么改变、影响和不变保证。原始结构差异作为高级证据下沉。

## 5. superseded、correction 与 rollback

- `superseded`：新路线取代旧路线，旧路线仍可能在当时合理。
- `corrected`：旧路线因事实、逻辑或实现错误被纠正；必须保存反例或审查证据。
- `rolled_back`：新路线实施后撤回到明确的目标 revision；保存撤回原因、受影响实现和证据失效。

CAT-TRACE 的零槽位普通 Laplace 路线属于 `corrected/superseded`，不应从历史删除，也不应继续显示为当前可选算法。

## 6. 双向漂移

### 6.1 设计领先代码

允许。实体标为 `design_only`，implementation binding 为空，revision 明确实施责任和验证计划。Delivery Assurance 就是该状态。

### 6.2 代码领先设计

静态分析发现规范图中不存在的实现变化。Asteria 生成候选 finding，引用 commit 和结构差异；必须由人或授权 ChatGPT 判断它是实现细节、设计遗漏还是错误修改。

### 6.3 绑定陈旧或断裂

固定提交之外的代码变化导致 structural anchor 或 fingerprint 不匹配。binding 变为 `STALE`；符号已找不到则为 `BROKEN`。这不自动修改实体设计状态，也不自动推翻科学证据。

### 6.4 证据漂移

相关候选、实现、要求或协议改变后 EvidenceRecord 变为 `stale`。变更传播以依赖图和显式 invalidation rule 为准；未改对象的证据可保留，但跨对象／跨页／跨叙事保证仍需代表性复验。

## 7. 对齐摘要

每个 revision 生成一条简短、事实化的 alignment：

- 设计与实现一致；
- 设计领先实现，已明确为 design-only；
- 实现领先设计，等待判断；
- 绑定 stale／broken；
- 实现存在但验证证据 pending；
- 设计和代码都已更新，但证据因候选改变而 stale。

不使用一个“同步／不同步”总 badge 压平这些差异。

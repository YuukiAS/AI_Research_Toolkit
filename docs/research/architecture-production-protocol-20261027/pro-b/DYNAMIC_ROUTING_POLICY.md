# 动态下一执行者选择器

## 1. 目标

协议每个阶段结束时必须给出唯一 next action，并明确下一条 prompt 发给谁。用户不再负责判断“继续 Chat、找第二 Pro、找 Work、让 Codex 调查还是正式实施”。

选择器不按角色轮换，而按当前最高价值信息缺口路由。

## 2. 标准动作

```text
CONTINUE_ARCHITECTURE
SECOND_INDEPENDENT_DESIGN
WORK_BLINDSPOT_AUDIT
CODEX_FACT_CHECK
CODEX_MINIMAL_PROBE
IMPLEMENTATION_READINESS_CHALLENGE
FREEZE_AND_IMPLEMENT
RETURN_TO_ARCHITECT
LOCAL_CODEX_FIX
WORK_FINAL_ACCEPTANCE
USER_PRODUCT_DECISION
FREEZE_NO_IMPLEMENTATION
STOP_AS_NOT_WORTH_BUILDING
```

每个结果必须附：

- `target_actor`；
- `reason`；
- `blocking_question`；
- `input_ref`；
- `allowed_scope`；
- `stop_condition`；
- `return_to`。

## 3. 第一步：任务分级

### S：局部低风险

同时满足：

- 单模块或少量文件；
- 不改变外部接口、数据 owner、权限、科学目标；
- 可逆；
- 失败 blast 低；
- 验收成熟；
- 无未知 external runtime。

默认：Chat 直接明确改动后 `FREEZE_AND_IMPLEMENT`，或既有 frozen contract 下直接 Codex。

### M：跨组件但路线清楚

特征：

- 多模块/少量跨组件；
- 外部接口与技术路线成熟；
- 历史要求可枚举；
- 返工为中等；
- 无高 blast 杀手假设。

默认：一个主架构师 + Asteria completeness；必要时窄 `CODEX_FACT_CHECK`；随后 readiness challenge。

### L：复杂长期或返工昂贵

任一：

- 跨仓库/多个产品表面；
- 历史 TODO/事故多；
- 重要权限、恢复、数据或验收边界；
- 实施规模大；
- 用户曾多次追问才暴露遗漏。

默认首波：

- 主架构师；
- Work 盲区调查；
- 有杀手假设则并行 Codex fact/probe。

第二 Pro 按路线竞争条件触发，不默认。

### XL：重大不可逆、复杂 runtime 或科研路线

任一：

- 安全/权限 enforcement；
- 高成本计算或数月科研；
- 关键科学/统计假设；
- 跨仓基础设施；
- 错误会废弃大部分实现；
- 两条互斥路线均合理。

默认首波：主架构师 + Work + 至少一个窄证据任务；若路线互斥则第二 Pro。所有工作尽量并行。

## 4. 第二步：识别未决问题类型

选择器对每个未决问题打一个主类型：

- `STRUCTURAL_GAP`：组件、机制、接口、状态、owner、payload、consumer 缺失；
- `SCENARIO_GAP`：整个用户场景、历史保护、真实入口可能遗漏；
- `ROUTE_COMPETITION`：两条核心产品/科学路线互斥；
- `FACT_UNKNOWN`：源码、API、仓库、平台或环境事实未知，只读可查；
- `PROBE_REQUIRED`：必须运行无害实验才能确认；
- `HANDOFF_GAP`：实施者仍需决定核心语义；
- `LOCAL_IMPLEMENTATION_BUG`：冻结设计正确，代码偏离；
- `PRODUCT_QUALITY_UNKNOWN`：最终作品、用户体验、专业质量未知；
- `GENUINE_USER_TRADEOFF`：价值偏好无法由证据或架构师代替；
- `LOW_VALUE_OPEN_ISSUE`：局部、可隔离、不阻止目标能力；
- `NO_REMAINING_HIGH_VALUE_QUESTION`。

## 5. 核心路由规则

### 5.1 结构缺口

```text
IF STRUCTURAL_GAP affects core capability/interface/state/permission
THEN CONTINUE_ARCHITECTURE or RETURN_TO_ARCHITECT
```

Asteria 已能指出具体空洞时，不启动 Critic；由主架构师闭合并更新 ledger。

### 5.2 场景盲区

```text
IF SCENARIO_GAP and no independent raw-input audit exists
THEN WORK_BLINDSPOT_AUDIT
```

Work 只读原始目标、事故、TODO、用户反馈和真实使用，不先读候选；输出必须有证据和影响，不给最终架构决定。

### 5.3 路线竞争

```text
IF ROUTE_COMPETITION
AND switching later has high cost
AND facts alone cannot decide
THEN SECOND_INDEPENDENT_DESIGN
```

若第二 Pro 已完成，下一步不是第三 Pro，而是比较差异对应的证据缺口：Work、fact check、probe 或用户产品决定。

### 5.4 只读事实未知

```text
IF FACT_UNKNOWN
AND source/API/repo inspection can answer without mutation
THEN CODEX_FACT_CHECK
```

Codex 报告事实、来源、版本、限制；不选择产品路线。

### 5.5 必须实验的杀手假设

```text
IF PROBE_REQUIRED
AND assumption false would change multiple components, safety, science, or major implementation
THEN CODEX_MINIMAL_PROBE
```

probe 必须包含无副作用 happy path 与代表性 failure path；不得发展成正式实现。

### 5.6 handoff 未就绪

```text
IF candidate structurally closed
AND external assumptions resolved
AND no cold implementer challenge yet
THEN IMPLEMENTATION_READINESS_CHALLENGE
```

挑战返回核心未决时：`RETURN_TO_ARCHITECT`；返回事实未知时：`CODEX_FACT_CHECK/PROBE`。

### 5.7 冻结并实施

```text
IF Freeze Gate passes
AND readiness = IMPLEMENTATION_READY
AND next information value is low
THEN FREEZE_AND_IMPLEMENT
```

输出必须包含 exact revision/commit、Codex Goal、允许自由度、禁止决定和验收。

### 5.8 实现 bug

```text
IF observed failure is inside frozen semantics
AND no capability/interface/authority/algorithm change
THEN LOCAL_CODEX_FIX
```

不返回 Planner，不重开完整审查。修复后对当前候选重新运行相关正负控制。

### 5.9 架构被证据否定

```text
IF implementation/probe shows frozen premise false
AND correction changes core mechanism/interface/authority/algorithm
THEN RETURN_TO_ARCHITECT
```

旧 Freeze 对受影响范围失效；未受影响组件保持锁定。

### 5.10 最终成品未知

```text
IF implementation complete
AND product/artifact/professional quality cannot be self-certified
THEN WORK_FINAL_ACCEPTANCE or domain-specific independent acceptance
```

Presentations、Frontend、Research Authoring、统计/科研产品按各自消费对象验收。

### 5.11 真正用户决定

只有以下情况返回用户：

- 两个满足技术条件的方案对应不同价值偏好；
- 费用、权限、数据使用、发布或不可逆副作用需要授权；
- 科研目标/产品范围由用户决定，证据不能唯一化；
- 用户明确保留的品牌、教学或政策选择。

```text
THEN USER_PRODUCT_DECISION
```

问题必须收敛为一个真实取舍，不把技术未知交给用户。

### 5.12 停止

```text
IF no high-impact unresolved issue
AND next call/probe unlikely to change decision
AND remaining issues are contained
THEN FREEZE_AND_IMPLEMENT or FREEZE_NO_IMPLEMENTATION
```

若价值/成本分析显示不值得建设，则 `STOP_AS_NOT_WORTH_BUILDING`，而不是继续审查直到看起来完整。

## 6. 下一步优先级

当多个动作同时可能，按以下顺序裁决：

1. `USER_PRODUCT_DECISION`：只有真正阻塞且不能由证据解决时；
2. `CODEX_MINIMAL_PROBE`：高 blast 事实会推翻路线；
3. `SECOND_INDEPENDENT_DESIGN`：互斥高 blast 路线尚未独立展开；
4. `WORK_BLINDSPOT_AUDIT`：长期历史/场景尚无独立输入；
5. `CONTINUE/RETURN_TO_ARCHITECT`：已有明确结构 blocker；
6. `IMPLEMENTATION_READINESS_CHALLENGE`；
7. `FREEZE_AND_IMPLEMENT`。

实际首波允许 2–4 并行，不需按此序列等待；该优先级用于决定哪个问题阻止 Freeze。

## 7. 并行编排

### 可并行

- 主架构师与 Work 盲区；
- 两个独立 Pro；
- 与候选无耦合的源码/外部事实调查；
- 不同 architecture-killer assumptions 的独立无害 probes；
- 文献/成熟开源调查；
- 不同项目案例回放。

### 必须串行

- 吸收新证据后的唯一架构裁决；
- Freeze 后改变同一核心文件/接口的正式实施；
- candidate commit 后的独立验证；
- 发现核心 premise false 后的新 Freeze；
- 用户授权之后的外部副作用。

并行目标是减少 `T_wait`，不是把同一问题复制给五个模型。

## 8. 默认模型数

| 档位 | 默认完整设计者 | Work | Codex 事实/探针 | 说明 |
|---|---:|---:|---:|---|
| S | 1 或 0 | 0 | 0 | 既有合同下可直接实施 |
| M | 1 | 0，场景复杂时 1 | 0/1 | Asteria 自检为主 |
| L | 1 | 1 | 按杀手假设 0–n | 默认两个模型来源，不是两个完整方案 |
| XL | 1；互斥路线时 2 | 1 | 至少一个针对性证据任务 | 不固定第三 Pro |

## 9. 机器可读路由输出建议

```yaml
next_action: CODEX_MINIMAL_PROBE
target_actor: Codex
blocking_question: >-
  Global Hook runtime failure 是否会阻断原 Bash，而不是 fail open？
reason: >-
  该假设错误会使整个 protected-cancellation enforcement boundary 失效。
input_ref:
  architecture_revision: cancel-v2.1
  source_commit: <sha>
allowed_scope:
  - trigger a harmless scancel --help match
  - inject interpreter/loader failure
  - record Bash launch count
forbidden:
  - execute real scancel
  - redesign confirmation UX
  - implement production cancellation
stop_condition:
  - all failure modes yield original Bash launch count = 0
return_to: Chat architect
```

用户可见摘要只需说明：下一条 prompt 发给谁、为什么、成功后进入什么阶段。

## 10. 示例

### Bridge Kit

- 原目标无 progress consumer：`RETURN_TO_ARCHITECT`；
- 薄核心 vs shared control plane：`SECOND_INDEPENDENT_DESIGN`；
- app-server normal-entry 可行性：`CODEX_MINIMAL_PROBE`；
- 实现局部恢复 bug：`LOCAL_CODEX_FIX`；
- 产品范围只有用户价值偏好无法裁决时：`USER_PRODUCT_DECISION`。

### Slurm protected cancellation

- wrapper vs Hook authority：第二 Pro/架构裁决；
- Hook runtime/failure semantics：`CODEX_MINIMAL_PROBE`；
- Python 路径拼错但边界正确：`LOCAL_CODEX_FIX`；
- Hook failure 证明会 fail open：`RETURN_TO_ARCHITECT`。

### CAT-TRACE

- 零槽位近似真值未知：数值 probe；
- probe 失败后的算法选择：`RETURN_TO_ARCHITECT`；
- 两种统计路线均合理且科研贡献不同：`SECOND_INDEPENDENT_DESIGN` 或 `USER_PRODUCT_DECISION`（仅目标偏好）。

## 11. 停止反复审查的硬规则

下列情况禁止继续泛化 Critic：

- finding 只改变措辞，不改变能力、机制、接口、风险或 handoff；
- 同一类结构空洞已由 schema/gate 自动覆盖；
- 唯一未决是可直接 probe 的事实；
- candidate 已满足 Freeze，下一审查没有独立输入；
- 剩余 issue blast 低且有 containment；
- 继续审查会改变已冻结表面但没有新证据；
- 用户已经作出同一产品取舍且无新事实。

## 12. 结论

动态路由器把流程从“角色轮班”改成“问题类型→最有价值的信息来源”。它保留独立判断、真实证据和最终验收，却移除固定串行 Critic、无止境 review 和用户手工协调。

默认复杂任务只启动两个模型来源；增加的是窄事实/探针，不是第三套架构。系统在每一步给出唯一 next action，满足条件即 Freeze，不再把“下一轮找谁”交回用户。

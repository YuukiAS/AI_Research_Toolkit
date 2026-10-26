# 架构模型

此文档由最终网页的同一语义源导出。14 个节点、16 条逻辑连接、3 个情境、19 步；桌面与手机使用相同 id。SVG 将连线路径与标签分层，避免线条命中区域盖住文字按钮；两层不是两条业务关系。

主图采用当前拟议分工。实线表示已有项目操作，虚线表示新增 DA 连接尚未实现。双向连接的两种载荷在详情中分别解释；逻辑数据依赖不等于直接 API。图中的“按需能力”是一个分组端点，包含四个可选择节点，不是额外执行进程。

![完整架构](previews/architecture.png)

## 节点

### 用户（user）

从原任务提出要求。

| 项目 | 内容 |
| --- | --- |
| 为什么需要 | 系统要保留用户原话，避免后续只对照执行者自己的摘要。 |
| 输入 | 用户目标、已确认的产品要求及授权。 |
| 输出与消费者 | 当前 Codex 接收请求；用户最终取得与本次版本相符的结果。 |
| 删除后果 | 没有原始要求，就无法判断实现有没有被悄悄降级。 |
| 目前情况 | 正常输入入口已有；通过该入口自动触发 DA 尚未验证。 |
| 来源 | [当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)、[原研究：检查与返修](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md) |

### 当前 Codex（codex）

实现、补测与返修。

| 项目 | 内容 |
| --- | --- |
| 为什么需要 | 原任务需要持续负责的执行者，修改产品并处理验收发现的问题。 |
| 输入 | 原请求、workflow-core 的能力安排、失败的实际与预期结果。 |
| 输出与消费者 | 生成当前成品，运行项目检查；收到反馈后修复，并提交新的验证结果。 |
| 删除后果 | 即使检查发现错误，也没有执行者把错误修掉。 |
| 目前情况 | 已有 Codex 和项目执行流程；DA 的反馈能否被原任务接收并处理，还需验证。 |
| 来源 | [当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)、[原研究：检查与返修](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md) |

### 当前成品（artifact）

源码、构建与运行对象。

| 项目 | 内容 |
| --- | --- |
| 为什么需要 | 检查必须针对本次要交付的版本，避免用旧截图说明新代码。 |
| 输入 | 当前 Codex 的修改及本次构建。 |
| 输出与消费者 | 项目验收和独立审查按同一版本观察成品。 |
| 删除后果 | 无法确定证据检查了哪个版本，测试结果可能来自另一版软件。 |
| 目前情况 | 项目已有成品和版本记录；跨环节身份核对是 DA 待实现的要求。 |
| 来源 | [原研究：检查与返修](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md)、[Lucerna 独立验收要求](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/docs/workflows/LUCERNA_INDEPENDENT_RELEASE_ACCEPTANCE.md) |

### 项目专业验收（validator）

按项目标准观察成品。

| 项目 | 内容 |
| --- | --- |
| 为什么需要 | 界面状态、数据和用户动作是否正确，需要项目自己的标准与检查程序判断。 |
| 输入 | 本次成品、已冻结标准、正确与错误对照，以及受影响的旧功能。 |
| 输出与消费者 | 原始观察和逐项结果由当前 Codex 取得，交给 DA 核对覆盖范围。 |
| 删除后果 | DA 无从判断业务是否正确，只剩文件和状态码。 |
| 目前情况 | Lucerna 已有状态测试与原生验收入口；本轮没有运行 Lucerna。 |
| 来源 | [Lucerna 历史修复记录](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/results/01054_final_independent_release_acceptance/repair-product-001.md)、[已有状态回归](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/scripts/test-longleaf-presentation.mjs)、[Lucerna 独立验收要求](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/docs/workflows/LUCERNA_INDEPENDENT_RELEASE_ACCEPTANCE.md) |

### 批准的要求（baseline）

已接受的旧功能。

| 项目 | 内容 |
| --- | --- |
| 为什么需要 | 新功能符合要求时，原来正常的入口也可能被改坏；检查范围必须包含两者。 |
| 输入 | 原请求、项目正式标准、已接受版本和变更前后的依赖。 |
| 输出与消费者 | DA 据此选择应验行为；未知依赖保留为缺口，不能当作无影响。 |
| 删除后果 | 只按已有测试倒推目标，会漏掉未写测试的要求和旧功能。 |
| 目前情况 | 标准和历史记录已有；DA 怎样整理要求、识别受影响的功能并安排检查，仍在设计中。 |
| 来源 | [当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)、[原研究：检查与返修](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md) |

### workflow-core（workflow）

选择能力，安排检查。

| 项目 | 内容 |
| --- | --- |
| 为什么需要 | 复杂任务常需要多个专业能力，还要确认它们的结果有人使用。 |
| 输入 | 原任务目标、当前可加载的技能、DA 所需检查与返回结论。 |
| 输出与消费者 | 把执行安排交给当前 Codex；需要返修时，确定原任务接收者并使用 Bridge 的既有通道。 |
| 删除后果 | 技能可能没被用到，检查结果也可能停在报告里。 |
| 目前情况 | 已有流程规范；多个插件能否按安排协作并接入 DA，仍待实测。 |
| 来源 | [当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)、[实施路线图](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ROADMAP.md) |

### Delivery Assurance（da）

确定验收范围与交付结论。

| 项目 | 内容 |
| --- | --- |
| 为什么需要 | 单项测试通过不能说明原始要求和受影响旧功能都已满足。 |
| 输入 | 已批准的要求、旧行为、本次版本、项目验收与必要的独立结果。 |
| 输出与消费者 | 检查安排交给 workflow-core；可以交付的范围交给交付入口，失败和缺少的结果交回原工作流。 |
| 删除后果 | 某项检查通过，仍可能被误报为整个产品完成。 |
| 目前情况 | 拟新增独立插件。旧研究通过的是设计，尚无本图整条生产路径的运行证据。 |
| 来源 | [当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)、[旧 DA 研究状态](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/CURRENT.md) |

### 独立审查（review）

按风险核对标准或成品。

| 项目 | 内容 |
| --- | --- |
| 为什么需要 | 实现者可能用自己的错误假设解释自己的结果，需要时由独立观察补足。 |
| 输入 | 原始要求、项目标准、同一待交付版本及可操作的成品。 |
| 输出与消费者 | 自己取得的观察或发现交给 DA；当前 Codex 根据具体问题返修。 |
| 删除后果 | 高风险标准和完整成品可能只剩实现者自查，盲点没有被复核。 |
| 目前情况 | Lucerna 有独立审查合同；是否必需取决于任务，不能把所有小改都升级审查。 |
| 来源 | [当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)、[Lucerna 独立验收要求](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/docs/workflows/LUCERNA_INDEPENDENT_RELEASE_ACCEPTANCE.md) |

### Bridge Kit（bridge）

身份、运行、反馈与恢复。

| 项目 | 内容 |
| --- | --- |
| 为什么需要 | 反馈要找到正确的原任务，运行和恢复也必须遵守已有权限与预算。 |
| 输入 | 原任务身份、合法运行请求、workflow-core 指定的反馈接收者。 |
| 输出与消费者 | 身份与运行回执交回工作流；失败递送到原 Codex，退出后保留原恢复位置。 |
| 删除后果 | 可能把证据绑定到错误任务，或把无人接收的文件当作已返修。 |
| 目前情况 | 基础设施已有。DA 钩子、精确回传与各宿主能力必须分别验证。 |
| 来源 | [当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)、[原研究：检查与返修](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md) |

### 受管交付入口（delivery）

核对结论后接受成品。

| 项目 | 内容 |
| --- | --- |
| 为什么需要 | 即使普通聊天漏跑检查，实际交付入口仍需拒绝缺证或错版本的结果。 |
| 输入 | DA 的当前结论、成品身份和允许声明的范围。 |
| 输出与消费者 | 把本次可交付的成品与结果交给用户；缺证时保留未完成状态。 |
| 删除后果 | Codex 可能绕过检查直接交出结果，旧报告也可能被重复使用。 |
| 目前情况 | 项目入口已有；接入 DA 的末端核验尚未实现。不承诺撤回已发出的聊天文字。 |
| 来源 | [原研究：检查与返修](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md)、[当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md) |

### Reasoned Design（reasoned）

方案与判断依据。

| 项目 | 内容 |
| --- | --- |
| 为什么需要 | 重要方案需要比较可行替代，并主动查找入口、异常和旧功能的遗漏。 |
| 输入 | 原始目标、专业事实、成熟方案与用户已确认的决定。 |
| 输出与消费者 | 有依据的方案交给当前 Codex 和领域负责人；批准后的要求才进入 DA。 |
| 删除后果 | 可能在遗漏需求的方案上继续实现，再靠用户逐项纠正。 |
| 目前情况 | 拟新增插件；本例的固定状态修复不以它为必经步骤。 |
| 来源 | [当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md) |

### Artifact Curation（curation）

内容取舍。

| 项目 | 内容 |
| --- | --- |
| 为什么需要 | 文字、图形和交互都占用注意力，需要判断它们是否帮助理解或操作。 |
| 输入 | 受众、目标、专业语义和候选作品。 |
| 输出与消费者 | 取舍意见由原制作端执行，保留文字再交给 Clear Writing。 |
| 删除后果 | 无用卡片、口号和解释可能不断累积，必要信息反而不显眼。 |
| 目前情况 | 拟建共享 Skill；这里采用其目标原则，不声称已安装该能力。 |
| 来源 | [当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md) |

### Clear Writing（writing）

自然表达与保真。

| 项目 | 内容 |
| --- | --- |
| 为什么需要 | 技术事实需要按读者的理解顺序表达，同时保留限制和责任。 |
| 输入 | 已经核实的事实、需要保留的内容及界面位置。 |
| 输出与消费者 | 原制作端使用修订后的文字，并检查完整页面。 |
| 删除后果 | 读者可能被内部术语和模板句式挡住，或误解完成程度。 |
| 目前情况 | 已有插件；加载规则不能单独证明整页文字质量。 |
| 来源 | [当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md) |

### 领域技能（domain）

专业制作与判断。

| 项目 | 内容 |
| --- | --- |
| 为什么需要 | 科学、界面、文稿等工作各有不同的正确性要求。 |
| 输入 | 任务相关资料、项目约定和专业标准。 |
| 输出与消费者 | 当前 Codex 使用相应技能制作作品；专业标准用于项目验收。 |
| 删除后果 | 通用流程无法判断具体作品在其领域是否正确。 |
| 目前情况 | 已有多种专业插件；按任务选择，并核查当前环境是否实际可用。 |
| 来源 | [当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md) |

## 连接

### 请求（request）

**用户 → 当前 Codex**；已有操作。

- 载荷：用户原话及当前任务上下文；产品授权仍沿原入口。
- 消费者：当前 Codex 保留原请求并核对项目约定。
- 状态：已有正常对话入口；这不代表 DA 已自动触发。
- 来源：[当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)

### 确认范围（authority）

**用户 → 批准的要求**；拟议连接。

- 载荷：用户已批准的要求；旧行为还需引用项目正式标准与已接受版本。
- 消费者：DA 读取有来源的要求，不把当前代码默认当作正确基线。
- 状态：来源材料已有；接入 DA 属于设计。
- 来源：[当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)、[原研究：检查与返修](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md)

### 能力与安排（route）

**当前 Codex ↔ workflow-core**；拟议连接。

- 载荷：当前 Codex 提供目标与所需工作；workflow-core 返回技能组合、顺序和结果接收者。
- 消费者：仍由当前 Codex 实际读取技能并执行；路线说明本身不是已调用证据。
- 状态：流程规范已有；多个技能能否按安排执行、结果能否被后续步骤使用，仍需验证。
- 来源：[当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)

### 构建（build）

**当前 Codex → 当前成品**；已有操作。

- 载荷：本次源码、构建物及对应运行对象的身份。
- 消费者：项目检查使用本次成品；代码修改后重新取得受影响的证据。
- 状态：项目开发与构建已有；本轮只做网站原型。
- 来源：[Lucerna 历史修复记录](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/results/01054_final_independent_release_acceptance/repair-product-001.md)、[Lucerna 独立验收要求](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/docs/workflows/LUCERNA_INDEPENDENT_RELEASE_ACCEPTANCE.md)

### 本次版本（subject）

**当前成品 → 项目专业验收**；已有操作。

- 载荷：当前待交付的应用、构建身份和运行实例。
- 消费者：项目验收对该对象操作和取证，拒绝旧进程或其它版本的截图。
- 状态：Lucerna 验收合同已有身份要求；不代表当前候选已运行。
- 来源：[Lucerna 独立验收要求](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/docs/workflows/LUCERNA_INDEPENDENT_RELEASE_ACCEPTANCE.md)

### 运行检查（run）

**当前 Codex → 项目专业验收**；已有操作。

- 载荷：应验行为、对应项目检查入口、当前成品和原授权范围。
- 消费者：原项目运行器产生真实观察；缺程序由原 Codex 补足，缺标准交专业负责人。
- 状态：项目检查调用已有；DA 选择检查的新增部分未接通。
- 来源：[原研究：检查与返修](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md)、[已有状态回归](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/scripts/test-longleaf-presentation.mjs)

### 观察与结果（evidence）

**项目专业验收 → Delivery Assurance**；拟议连接。

- 载荷：每项要求的实际值、预期值、原始证据、标准版本与成品身份；缺失也须保留。
- 消费者：当前 Codex 取得项目结果，再提交 DA；DA 核对范围和身份，不重新裁决专业事实。
- 状态：项目结果还未接入 DA，图中这条连接尚未实际运行。
- 来源：[当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)、[原研究：检查与返修](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md)

### 要求与旧行为（scope）

**批准的要求 → Delivery Assurance**；拟议连接。

- 载荷：批准要求、已接受旧行为、变化前后依赖及尚不能解析的关系。
- 消费者：DA 选择必需检查；未知影响不能用“所有现有测试通过”消除。
- 状态：影响分析和验收范围的整理尚未实现。
- 来源：[原研究：检查与返修](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md)、[当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)

### 检查与结论（check）

**workflow-core ↔ Delivery Assurance**；拟议连接。

- 载荷：workflow-core 提供任务和证据引用；DA 返回应验范围、缺口及允许交付的范围。
- 消费者：workflow-core 把所需工作交给原 Codex，并将结果送到指定消费者。
- 状态：独立 DA 与 workflow-core 的双向接线尚未实施。
- 来源：[当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)

### 按需委托（commission）

**workflow-core → 独立审查**；拟议连接。

- 载荷：需要独立核对的原要求、标准或成品，以及具体合法调用方式。
- 消费者：项目已有审查角色自行观察并返回结果；尚未启动或结果无人接收时，验收仍未完成。
- 状态：按风险选择；DA 与既有审查通道的调用仍需实测。
- 来源：[当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)、[原研究：检查与返修](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md)

### 独立结果（reviewResult）

**独立审查 → Delivery Assurance**；拟议连接。

- 载荷：独立取得的观察、发现、证据引用，以及确切受审版本。
- 消费者：DA 核对本次所需独立证据；新源码不能继续使用旧版本的通过结论。
- 状态：项目已有审查合同，将结果交给 DA 的连接仍在设计中。
- 来源：[Lucerna 独立验收要求](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/docs/workflows/LUCERNA_INDEPENDENT_RELEASE_ACCEPTANCE.md)、[当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)

### 身份与反馈（transport）

**workflow-core ↔ Bridge Kit**；拟议连接。

- 载荷：工作流请求原任务身份与运行能力；返修时提供失败、接收者、允许范围和预算。
- 消费者：Bridge 返回身份与运行回执，按现有合法通道递送失败；workflow-core 确认是否有人接收。
- 状态：基础能力已有；DA 反馈的实际递送与消费尚待宿主试验。
- 来源：[当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)、[原研究：检查与返修](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md)

### 续修（repair）

**Bridge Kit → 当前 Codex**；拟议连接。

- 载荷：失败要求、实际与预期、证据、本次版本、允许修改范围、剩余预算与原任务身份。
- 消费者：原 Codex 在合法回合收到反馈并修改产品；新的检查结果才说明问题已修复。
- 状态：待验证。断线后先核任务身份；取消、无权限、预算耗尽或无活跃接收者时不自动启动。
- 来源：[原研究：检查与返修](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md)、[当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)

### 交付结论（allow）

**Delivery Assurance → 受管交付入口**；拟议连接。

- 载荷：仅针对当前版本的结论、证据引用和可声明的完成范围。
- 消费者：原受管交付入口独立核对，缺证、失效或版本不一致时拒绝接受。
- 状态：拟新增末端核验；旧研究的设计通过不能替代它。
- 来源：[当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)、[原研究：检查与返修](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md)

### 结果与成品（return）

**受管交付入口 → 用户**；拟议连接。

- 载荷：本次成品、已经验证的范围和仍未完成的部分。
- 消费者：用户取得可核对的结果；不把测试退出码当作产品可用结论。
- 状态：项目交付入口已有，图示的 DA 准入链仍待实现。
- 来源：[当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)、[原研究：检查与返修](https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md)

### 按需选用（skills）

**workflow-core ↔ 按需专业能力**；拟议连接。

- 载荷：任务相关的能力选择，以及这些能力提供的方案、取舍、文字或专业结果。
- 消费者：当前 Codex 实际使用所选能力；不要求依次调用全部四项，也不让它们取代 DA。
- 状态：Clear Writing 与领域能力已有；Reasoned Design、Artifact Curation 及新增组合仍需实现或验证。
- 来源：[当前职责方案](https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md)

## 同一任务的三种情境

以下是设计推演，不是本轮运行 Delivery Assurance 的记录。每一步的边 id 可在 SVG 和 model.json 中逐项对应。

### 正常完成

| 步骤 | 经过连接 | 证据变化与后续 |
| --- | --- | --- |
| 1. 保留原始要求 | request、route | 原 Codex 收到“检查中不误报，确认故障仍提醒”的要求。workflow-core 选择本次需要的项目能力和 DA 检查。 |
| 2. 确定本次检查范围 | authority、scope、check | DA 加入已接受的可用入口和状态一致性要求，再把检查安排交给 workflow-core。缺少相关测试时，由原 Codex 补足。 |
| 3. 生成本次成品 | build、run、subject | 原 Codex 修改状态判断并构建。项目检查绑定本次版本，旧截图不会自动成为新版本的证据。 |
| 4. 取得项目结果与独立观察 | evidence、commission、reviewResult | 状态对照覆盖检查中、未观测和确认故障，旧入口也实际可用。本例按正式成品的要求取得独立观察，DA 随后核对结果。 |
| 5. 核对后接受交付 | allow、return | DA 确认本次必需结果齐全且版本相符，受管交付入口接受相应范围的成品，再把结果交给用户。 |

### 错误交回原任务

| 步骤 | 经过连接 | 证据变化与后续 |
| --- | --- | --- |
| 1. 保留原始要求 | request、route | 原 Codex 收到“检查中不误报，确认故障仍提醒”的要求。workflow-core 选择本次需要的项目能力和 DA 检查。 |
| 2. 确定本次检查范围 | authority、scope、check | DA 加入已接受的可用入口和状态一致性要求，再把检查安排交给 workflow-core。缺少相关测试时，由原 Codex 补足。 |
| 3. 生成本次成品 | build、run、subject | 原 Codex 修改状态判断并构建。项目检查绑定本次版本，旧截图不会自动成为新版本的证据。 |
| 4. 确认故障却显示正常 | evidence | 这是故意构造的错误版本。已有状态回归应发现确认故障被隐藏；实际窗口还须由项目验收观察。DA 接收失败，交付入口保持未通过。 |
| 5. 把具体失败交回原任务 | check、transport、repair | DA 返回违反的要求、实际与预期结果及本次版本。workflow-core 指定原任务，Bridge 将反馈送回原 Codex；是否收到必须实际确认。 |
| 6. 修复后重新取得证据 | build、run、subject、evidence、commission、reviewResult | 原 Codex 修正判断并生成新版本，重跑受影响的项目检查和必要复核。旧版本的通过结论失效，新证据齐全后才回到交付检查。 |
| 7. 核对后接受交付 | allow、return | DA 确认本次必需结果齐全且版本相符，受管交付入口接受相应范围的成品，再把结果交给用户。 |

### 旧功能被改坏

| 步骤 | 经过连接 | 证据变化与后续 |
| --- | --- | --- |
| 1. 保留原始要求 | request、route | 原 Codex 收到“检查中不误报，确认故障仍提醒”的要求。workflow-core 选择本次需要的项目能力和 DA 检查。 |
| 2. 确定本次检查范围 | authority、scope、check | DA 加入已接受的可用入口和状态一致性要求，再把检查安排交给 workflow-core。缺少相关测试时，由原 Codex 补足。 |
| 3. 生成本次成品 | build、run、subject | 原 Codex 修改状态判断并构建。项目检查绑定本次版本，旧截图不会自动成为新版本的证据。 |
| 4. 新状态正确，旧入口打不开 | scope、evidence | 这是构造的回归情境。状态测试可以通过，但按已接受基线检查旧入口时仍会失败；项目验收把这项结果交给 DA。 |
| 5. 保留原要求，返回修复 | check、transport、repair | DA 不能因新状态测试通过而忽略旧入口。失败沿 workflow-core 和 Bridge 返回原 Codex，检查范围仍包含这个旧入口。 |
| 6. 重验受影响的功能 | build、run、subject、evidence | 原 Codex 修复共享改动，项目重新操作旧入口并检查状态。仍有无法确认的依赖或缺失观察时，DA 不能确认可以交付。 |
| 7. 核对后接受交付 | allow、return | DA 确认本次必需结果齐全且版本相符，受管交付入口接受相应范围的成品，再把结果交给用户。 |

## 身份与验证边界

本模型没有网络端点、真实任务 ID、自动启动器或生产状态。事实源及其核对身份见 RESEARCH.md；当前源码与截图身份见 checks/browser-report.json。仍未知的宿主反馈、权限、接收者和证据缺口保留在边详情中，不能靠动画视为已闭合。

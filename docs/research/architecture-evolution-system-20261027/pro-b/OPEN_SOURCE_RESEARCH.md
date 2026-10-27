# 成熟开源能力研究与采用决定

调查时间：2026-10-27。目标不是寻找一个包揽全部需求的平台，而是判断哪些成熟能力可以直接复用，哪些问题必须由 Architecture Ledger 自己解决。维护状态以官方仓库、官方文档和近期发布为主；许可证仍应在正式集成时锁定具体版本并复核。

## 1. 候选总览

| 项目/方法 | 主要能力 | 维护与许可概况 | 对本任务的适用性 | 决定 |
|---|---|---|---|---|
| C4 Model / Structurizr DSL | 层级架构模型、关系、视图、架构即代码 | Structurizr DSL 为文本模型，Apache-2.0 路线 | 责任层级和视图分离成熟，但不足以表达因果演进和证据三轴 | `SELECTIVELY_PORTED` |
| Cytoscape.js | 浏览器端图模型、交互、选择与样式 | 活跃，MIT；2026 年仍有频繁发布 | 非常适合系统拓扑、路径高亮和差异叠加 | `RUNTIME_DEPENDENCY` 候选 |
| ELK.js | 分层图自动布局 | 活跃；EPL-2.0 / GPL-3.0-or-later 组合需版本复核 | 适合中等规模拓扑布局，不负责语义 | `RUNTIME_DEPENDENCY` 候选 |
| Mermaid | 文本式时序、状态、流程与小型图 | 活跃，MIT | 适合机制层内容，不适合作为统一交互拓扑 | `RUNTIME_DEPENDENCY` 候选 |
| JSON Schema + Ajv | 结构校验、跨环境验证 | Ajv 活跃、MIT，支持 Draft 2020-12 | 可直接承担 ledger schema 校验 | `RUNTIME_DEPENDENCY` 候选 |
| MADR | 架构决策记录模板 | 活跃，MIT 或 CC0 | 适合决策内容与 supersede 思维，不足以表达组件级 diff | `SELECTIVELY_PORTED` |
| Log4brains | ADR 静态知识库、时间线、Git 集成 | Apache-2.0；成熟但节奏需正式复核 | 借鉴 Git 原生、不可变决策和静态发布；不直接作为核心 | `REFERENCE_ONLY` |
| tree-sitter | 多语言增量语法树 | 活跃，MIT | 可为符号和规则锚点提供轻量提取；不应一期强制 | `OPTIONAL_RUNTIME` |
| SCIP | 语言无关代码智能协议 | Apache-2.0；2026 年转向社区治理 | 适合已有索引器的仓库；自建索引成本较高 | `OPTIONAL_RUNTIME` |
| GumTree | AST 感知代码差异、移动/重命名 | LGPL-3.0-or-later；成熟研究工具 | 适合实现考古，不适合定义架构语义差异 | `REFERENCE_ONLY` |
| Backstage | 开发者门户、目录、插件生态 | 活跃，Apache-2.0 | 能力和运维远超需要，会引入后台、身份和插件平台 | `REJECTED_FOR_CORE` |
| React Flow / xyflow | 节点编辑器与交互流程 | 活跃，MIT | 适合可编辑画布；本任务一期是阅读器而非在线编辑器 | `REVIEWED_NOT_ADOPTED` |
| D2 | 图形即代码和自动布局 | MPL-2.0；2026 年继续演进 | 适合独立图稿，但核心交互和语义扩展不如直接图模型 | `REVIEWED_NOT_ADOPTED` |

## 2. C4 与 Structurizr：采用语义，不照搬工具边界

C4 的价值是帮助区分系统、容器、组件和代码等抽象层，以及让一个模型生成多个视图。Architecture Ledger 应借用：

- 稳定身份、责任和关系优先于图形；
- 一个模型可有多个视图；
- 视图根据受众裁剪；
- 关系需要名称和方向。

但本任务跨越浏览器扩展、AI Skill 和科研算法，不应强迫全部对象成为 C4 容器/组件。C4 也没有原生解决证据强度、设计/实现分离、因果返修和语义差异。因此采用 C4 思维，不以 Structurizr DSL 作为唯一存储格式。

## 3. Cytoscape.js 与 ELK.js：推荐的图形底座

Cytoscape.js 同时提供图数据模型、交互、选择、样式、布局接口和路径处理，适合：

- 当前系统拓扑；
- 正常、失败、恢复路径高亮；
- 组件和关系选择；
- 新增、修改、撤销的差异叠加；
- 中等规模图的浏览器端运行。

ELK.js 可在需要时提供层次化布局。布局结果应缓存到构建产物，避免每次打开产生不稳定位置。原型为降低依赖采用手写 SVG，但正式建设建议以 Cytoscape.js 为图形底座，而不是自行长期维护连线和命中逻辑。

## 4. Mermaid：机制层而非系统层统一引擎

Mermaid 对时序、状态机和小流程足够成熟，中文文本也可使用。适合 Mica 状态流、简单恢复时序和 Chat/Codex 交接过程。不适合承担：

- 大型拓扑的精细交互；
- 组件级版本叠加；
- 实现锚点和详情联动；
- 多种领域内容的统一语义。

因此把 Mermaid 作为一种 mechanism renderer，而非系统模型。

## 5. JSON Schema 与 Ajv：直接复用

账本的结构一致性没有理由自建验证语言。JSON Schema Draft 2020-12 可以描述对象结构，Ajv 在 Node 和浏览器中成熟。跨引用、图环路、状态与锚点一致性等超出 Schema 的检查，再用小型 TypeScript 校验器实现。

推荐组合：

```text
JSON Schema：字段、枚举、基本形状
自定义检查器：跨引用、状态一致性、历史约束、锚点可达性
```

## 6. MADR 与 Log4brains：借用决策历史，不照搬时间线中心

MADR 提供简洁的决策上下文、选项、结果和后果结构；Log4brains 证明 ADR 可以与 Git 同仓库并生成静态知识库。可直接借用：

- 决策不可静默改写；
- superseded 状态；
- 原因、备选和后果；
- Git 原生审核与静态发布。

但 Architecture Ledger 的主要入口是当前系统，不是 ADR 时间线。一个修订也可能影响多个组件和关系，反之一个组件可能经历多次决定。Decision 因此是语义对象之一，而不是整个系统的数据模型。

## 7. tree-sitter 与 SCIP：可选的源码绑定增强

一期可以用路径、固定提交、符号名和文本指纹完成大多数锚点检查。真实维护中若函数移动和多语言项目造成频繁漂移，再选择：

- tree-sitter：项目内轻量提取特定语言的函数、常量、selector 或规则；
- SCIP：已有索引器时复用语言无关符号和引用。

两者不应成为初始门槛。尤其不应为了“代码导航”建设统一索引服务。

## 8. GumTree：实现差异辅助，不定义架构差异

GumTree 能识别 AST 插入、删除、移动和重命名，比纯文本 diff 更适合软件考古。但“函数移动”不等于“组件责任改变”，而“架构决定撤销”可能尚无任何代码 diff。因此它只能为 implementation diff 提供候选证据，不能生成 Architecture Revision。

## 9. Backstage、React Flow 和 D2 为什么不是核心

### Backstage

Backstage 解决组织级开发者门户、服务目录、插件、身份和运营。Architecture Ledger 面向少量 Git 仓库和静态阅读，采用 Backstage 会把维护成本扩大一个数量级。

### React Flow

React Flow 很适合节点编辑器，但本任务不需要用户在画布上拖拽定义架构。核心数据应在 Git 中评审；在线编辑器会增加位置状态、保存、冲突和权限问题。若未来出现真实可视编辑需求，再单独评估。

### D2

D2 的声明式图和自动布局质量值得参考，但它更接近图稿语言。Architecture Ledger 需要一个可查询、可选中、可叠加版本和联动详情的图模型。用 D2 作为导出格式可以，作为核心运行时收益不足。

## 10. 唯一推荐组合

正式一期建议：

- 存储：JSON/YAML + JSON Schema；
- 校验：Ajv + 小型 TypeScript 跨引用检查；
- 站点：静态 HTML/TypeScript；
- 拓扑：Cytoscape.js；
- 布局：ELK.js，可缓存；
- 机制图：Mermaid 按需；
- 决策正文：MADR 风格 Markdown；
- 源码锚点：GitHub permanent link + 可选 tree-sitter；
- 版本与发布：Git commit/tag + Architecture Revision。

这套组合复用成熟基础能力，而把自研范围限制在真正独特的三件事：跨领域语义模型、因果演进/语义差异、设计—实现—证据三轴检查。

## 11. 来源

- Structurizr 文档与 DSL：`https://docs.structurizr.com/`
- Cytoscape.js：`https://github.com/cytoscape/cytoscape.js`
- ELK.js：`https://github.com/kieler/elkjs`
- Mermaid：`https://github.com/mermaid-js/mermaid`
- Ajv：`https://github.com/ajv-validator/ajv`
- MADR：`https://github.com/adr/madr`
- Log4brains：`https://github.com/thomvaill/log4brains`
- tree-sitter：`https://github.com/tree-sitter/tree-sitter`
- SCIP：`https://github.com/sourcegraph/scip`
- GumTree：`https://github.com/GumTreeDiff/gumtree`
- Backstage：`https://github.com/backstage/backstage`
- xyflow：`https://github.com/xyflow/xyflow`
- D2：`https://github.com/terrastruct/d2`

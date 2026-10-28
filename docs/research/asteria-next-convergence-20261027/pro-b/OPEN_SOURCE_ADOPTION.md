# 成熟开源能力采用方案

## 1. 原则

Asteria 的独特价值是规范语义、架构设计合同、实现／证据／修订的连接和面向复杂项目的阅读体验。布局、图交互、源码索引、结构差异、schema、公式、高亮和文档渲染优先复用成熟实现。正式引入前必须再次核对版本、许可证、包体、浏览器兼容和维护状态。

## 2. 直接依赖

| 项目 | 用途 | 采用边界 | 原因 |
|---|---|---|---|
| Cytoscape.js | 大图交互、选择、聚焦、邻接与路径 | 只负责图交互；规范模型留在 Asteria | 成熟、可扩展、适合受控语义图，不需自己重写图事件层。 |
| ELK.js | 分层、端口、正交／单调连接与大图布局 | 生成初始／自动布局，人工 override 留在 view projection | 复杂有向图布局成熟，能避免手工坐标成为真值。 |
| Tree-sitter | 多语言语法树与结构锚点 | 生成候选绑定，不直接确认语义 | 解析速度和语言覆盖适合本地索引。 |
| SCIP | definitions／references 的跨语言索引交换 | 在有 indexer 的语言中增强 source trace | 避免自建通用引用协议。 |
| Ajv | schema 和 manifest 校验 | 校验规范包、bridge、revision、evidence | 错误定位成熟，适合版本化 JSON schema。 |
| KaTeX | 公式渲染 | 只渲染，不推断符号语义 | 性能和静态输出成熟，现有产品已需要。 |
| Shiki | 源码高亮 | inspector 和 source excerpt | 与静态／暗色主题兼容，不自建语言高亮。 |
| Vite／现有 React 工具链 | 前端构建与静态分发 | 延续当前 Asteria，不引入后端 | 与现有产品一致，迁移成本最低。 |

结构差异采用一项而不是同时长期依赖两项：Difftastic 适合作为多语言、可读的开发／CLI 差异来源；GumTree 适合需要 AST edit script 的深入实现。正式实现先做小型比较，以“能否稳定映射到 SemanticChange”为选择标准。

## 3. 借理念或作为可选适配器

| 项目 | 借用内容 | 不直接成为核心的原因 |
|---|---|---|
| LikeC4 | 模型／视图分离、关系查询、可读架构 DSL | 它的领域模型不能替代 Asteria 的统计、科研、成品与证据语义。可考虑导入／导出。 |
| Structurizr | C4 的层级视图、workspace 与决策记录经验 | 组件层级有价值，但 Asteria 需要公式、科学证据、artifact finding 和修订语义。 |
| MADR／Log4brains | 决策记录、取代关系和静态站点阅读 | Decision 是 Asteria 实体子型；不另建并行决策数据库。 |
| Mermaid | 文档内轻量序列／流程导出 | 大图交互、source trace 和稳定布局不足以承担主产品。 |
| Graphviz | 离线导出、布局基线和回归辅助 | 交互和浏览器增量布局不是强项。 |
| dependency-cruiser | JavaScript／TypeScript 模块依赖与规则 | 只提供实现候选，不等于架构关系。 |
| React Flow | 节点编辑和自由画布经验 | Asteria 2.0 已退出无限编辑画布；不恢复为核心。 |

## 4. 不采用

- 图数据库：当前 Git 规模和单用户阅读不需要，且会制造同步与迁移成本。
- 常驻后端／账号／云服务：不属于本轮价值，破坏本地可审查和静态部署。
- 向量数据库：语义搜索不是核心瓶颈，规范 identity 和类型关系优先。
- agent runtime：Asteria 保存设计与证据，不负责运行长期自治代理。
- 自研 Markdown、公式、代码高亮或图布局引擎：没有独特价值。
- 把 LikeC4／Structurizr 作为规范模型：会压缩科学、artifact 和证据语义。

## 5. 采用顺序

1. 先复用 Asteria 现有 React／Vite／KaTeX／schema 设施。
2. 用 ELK.js + Cytoscape.js 替换原型中的自制静态 SVG 图层，但保持同一交互合同。
3. 用 Ajv 校验扩展 schema 和迁移 fixture。
4. 在 Mica 与 CAT-TRACE 上试点 Tree-sitter／SCIP，先闭合负控制再扩大语言覆盖。
5. 选择 Difftastic 或 GumTree，证明其结果能稳定映射到有意义修订，而不是增加噪声。
6. 最后提供 LikeC4／Mermaid／Graphviz 等导入导出适配器，不能阻塞核心产品。

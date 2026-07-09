# Resource Index

这个索引按类别列出 toolkit 中的资源，说明资源类型、解决的问题、服务器安装适配、API key 风险、输出格式和 headless Linux 适配情况。

## 已迁移路径记录

| 资源 | 旧路径 | 新路径 |
| --- | --- | --- |
| Paper2Any | `software/Paper2Any` | `software/scientific-figure-generation/Paper2Any/repo` |
| academic-figure-generator | `software/academic-figure-generator` | `software/scientific-figure-generation/academic-figure-generator/repo` |
| figures4papers | `visual-examples/figures4papers` | `references/visual-examples/figures4papers/repo` |
| awesome-ai-research-writing | `prompt-resources/awesome-ai-research-writing` | `references/prompt-resources/awesome-ai-research-writing/repo` |
| awesome-autoresearch | `research-system-references/awesome-autoresearch` | `references/research-system-references/awesome-autoresearch/repo` |

## Diagramming software

| 资源 | Type | 解决的问题 | 服务器安装 | API key | 输出 | Headless Linux | 状态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [D2](software/diagramming/d2/README.md) | `software` | 通用文本到图示渲染工具，适合把架构图、流程图和系统关系图写成可版本化的 D2 源文件。 | 适合 | `false` | SVG, PNG, PDF | `good` | `checked` |
| [Graphviz](software/diagramming/graphviz/README.md) | `software` | 经典 DOT 图渲染工具，适合依赖图、有限状态机、流程图和 diagrams.py 后端渲染。 | 适合 | `false` | SVG, PNG, PDF | `good` | `checked` |
| [Mermaid CLI](software/diagramming/mermaid-cli/README.md) | `software` | Mermaid 图表的命令行渲染器，适合从 Markdown/文档中的流程图、时序图、状态图生成 SVG/PNG/PDF。 | 部分适合 | `false` | SVG, PNG, PDF | `partial` | `failed` |
| [Draw.io](software/diagramming/drawio/README.md) | `software` | 通用可编辑图示工具，用于维护 .drawio 文件并导出 SVG/PNG/PDF。 | 部分适合 | `false` | DrawIO, SVG, PNG, PDF | `partial` | `unknown` |
| [PlantUML](software/diagramming/plantuml/README.md) | `software` | UML 和时序图渲染工具，适合接口流程、类图、状态机、组件关系图。 | 适合 | `false` | SVG, PNG, PDF | `good` | `failed` |
| [Typst](software/diagramming/typst/README.md) | `software` | 轻量排版和技术文档渲染工具，可用于报告、图注、公式排版和小型说明页。 | 适合 | `false` | PDF, SVG, PNG | `good` | `failed` |
| [Manim](software/diagramming/manim/README.md) | `software` | 数学动画和讲解视频生成工具，适合科研方法动画、几何/公式演示和短视频说明。 | 部分适合 | `false` | MP4, PNG, GIF | `partial` | `failed` |
| [diagrams.py](software/diagramming/diagrams-py/README.md) | `software` | 用 Python 描述云架构和系统组件图，通常依赖 Graphviz 输出图像。 | 适合 | `false` | PNG, SVG, PDF | `good` | `failed` |
| [Excalidraw](software/diagramming/excalidraw/README.md) | `software` | 手绘风格图示工具，适合概念草图、讲解图和快速视觉沟通。 | 部分适合 | `false` | SVG, PNG | `partial` | `unknown` |

## Scientific figure generation software

| 资源 | Type | 解决的问题 | 服务器安装 | API key | 输出 | Headless Linux | 状态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [Paper2Any](software/scientific-figure-generation/Paper2Any/README.md) | `software` | 产品级 paper-to-anything 工具，覆盖论文到图、PPT、Draw.io、poster、video、rebuttal、citation、image playground 和 knowledge-base 工作流。 | 部分适合 | `unknown` | SVG, PNG, DrawIO, PPTX, PDF, Video | `partial` | `unknown` |
| [AutoFigure](software/scientific-figure-generation/AutoFigure/README.md) | `software` | 论文图或科研 illustration 自动生成参考工具，当前未 clone。 | 待确认 | `unknown` | PNG, SVG, PDF | `unknown` | `unknown` |
| [AutoFigure-Edit](software/scientific-figure-generation/AutoFigure-Edit/README.md) | `software` | 科研图编辑或 refinement 方向占位资源；当前只有资源名，没有确认 upstream URL。 | 待确认 | `unknown` | PNG, SVG, PDF | `unknown` | `unknown` |
| [academic-figure-generator](software/scientific-figure-generation/academic-figure-generator/README.md) | `software` | 本地 FastAPI/React 应用，用于基于论文生成学术配图 prompt，并调用图像生成流程。 | 部分适合 | `unknown` | Prompt, PNG | `partial` | `unknown` |
| [Crafter](software/scientific-figure-generation/Crafter/README.md) | `software` | 科研图生成或编辑工具占位资源；当前只有资源名，没有确认 upstream URL。 | 待确认 | `unknown` | PNG, SVG, PDF | `unknown` | `unknown` |
| [LiveFigure](software/scientific-figure-generation/LiveFigure/README.md) | `software` | 动态或交互式科研图工具占位资源；当前只有资源名，没有确认 upstream URL。 | 待确认 | `unknown` | PNG, SVG, PDF | `unknown` | `unknown` |
| [FigureWeave](software/scientific-figure-generation/FigureWeave/README.md) | `software` | 科研图组合、编排或编辑工具占位资源；当前只有资源名，没有确认 upstream URL。 | 待确认 | `unknown` | PNG, SVG, PDF | `unknown` | `unknown` |

## Code knowledge audit software

| 资源 | Type | 解决的问题 | 服务器安装 | API key | 输出 | Headless Linux | 状态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [Graphify](software/code-knowledge-audit/graphify/README.md) | `software` | 代码/文档知识图谱与审计工具占位资源，用于后续整理代码库结构、依赖关系和文档覆盖。 | 待确认 | `unknown` | Knowledge graph, Audit report | `unknown` | `unknown` |

## Reference resources

| 资源 | Type | 解决的问题 | 服务器安装 | API key | 输出 | Headless Linux | 状态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [figures4papers](references/visual-examples/figures4papers/README.md) | `reference` | 论文级 Python 作图样例仓库，用于学习顶会/期刊图表风格；包含 scientific-figure-making skill。 | 不适用 | `false` | Reference figures, Python examples | `unknown` | `not_applicable` |
| [awesome-ai-research-writing](references/prompt-resources/awesome-ai-research-writing/README.md) | `reference` | AI 科研写作 prompt 和 agent skill 资源，用于论文写作、模板、引用、表格、caption、coauthoring 和 humanization。 | 不适用 | `false` | Prompts, Writing templates | `unknown` | `not_applicable` |
| [awesome-autoresearch](references/research-system-references/awesome-autoresearch/README.md) | `reference` | 自动科研系统参考列表，用于查找 autonomous improvement loops、research agents、benchmarks 和相关 writeup。 | 不适用 | `false` | Reference list | `unknown` | `not_applicable` |


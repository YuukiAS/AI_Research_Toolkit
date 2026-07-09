# Toolkit Reorganization Report

日期：2026-07-09

## 1. 创建的目录

已创建通用 AI research toolkit 布局：

- `bin/`
- `envs/`
- `logs/`
- `scripts/`
- `smoke/`
- `docs/`
- `inventory/`
- `software/diagramming/`
- `software/scientific-figure-generation/`
- `software/code-knowledge-audit/`
- `references/visual-examples/`
- `references/prompt-resources/`
- `references/research-system-references/`
- `examples/`
- `templates/`

每个外部资源目录采用统一结构：`repo/` 放 upstream clone 或预留位置，外层 `README.md`、`install.md`、`notes.md`、`privacy.md`、`examples/` 放本地说明。

## 2. 迁移的已有资源

| 资源 | 旧路径 | 新路径 | Commit |
| --- | --- | --- | --- |
| Paper2Any | `software/Paper2Any` | `software/scientific-figure-generation/Paper2Any/repo` | `1ca1f65` |
| academic-figure-generator | `software/academic-figure-generator` | `software/scientific-figure-generation/academic-figure-generator/repo` | `0a2bec6` |
| figures4papers | `visual-examples/figures4papers` | `references/visual-examples/figures4papers/repo` | `05644a5` |
| awesome-ai-research-writing | `prompt-resources/awesome-ai-research-writing` | `references/prompt-resources/awesome-ai-research-writing/repo` | `c07628b` |
| awesome-autoresearch | `research-system-references/awesome-autoresearch` | `references/research-system-references/awesome-autoresearch/repo` | `b99fab1` |

迁移前检查了 `git status --short --branch --ignored`、目录列表和每个 clone 的 remote/commit。目标 `repo/` 已存在时迁移命令会停止，不覆盖。

## 3. 已存在的 upstream repo

| 资源 | Remote |
| --- | --- |
| Paper2Any | `https://github.com/OpenDCAI/Paper2Any.git` |
| academic-figure-generator | `https://github.com/LigphiDonk/academic-figure-generator.git` |
| figures4papers | `https://github.com/ChenLiu-1996/figures4papers.git` |
| awesome-ai-research-writing | `https://github.com/Leey21/awesome-ai-research-writing.git` |
| awesome-autoresearch | `https://github.com/webfuse-com/awesome-autoresearch.git` |

这些 upstream repo 迁移后 `git status --short` 未显示本地修改。

## 4. 未 clone 或缺 URL 的资源

已创建目录但未 clone：

- `software/diagramming/d2/repo`
- `software/diagramming/graphviz/repo`
- `software/diagramming/mermaid-cli/repo`
- `software/diagramming/drawio/repo`
- `software/diagramming/plantuml/repo`
- `software/diagramming/typst/repo`
- `software/diagramming/manim/repo`
- `software/diagramming/diagrams-py/repo`
- `software/diagramming/excalidraw/repo`
- `software/scientific-figure-generation/AutoFigure/repo`
- `software/scientific-figure-generation/AutoFigure-Edit/repo`
- `software/scientific-figure-generation/Crafter/repo`
- `software/scientific-figure-generation/LiveFigure/repo`
- `software/scientific-figure-generation/FigureWeave/repo`
- `software/code-knowledge-audit/graphify/repo`

仍缺确认 URL：

- AutoFigure-Edit
- Crafter
- LiveFigure
- FigureWeave
- Graphify

AutoFigure 记录了候选 URL `https://github.com/ResearAI/AutoFigure.git`，但本次未 clone。

## 5. 核心软件命令检查

运行命令：

```bash
bash scripts/check_core_software.sh
```

结果：

| 工具 | 状态 | 输出摘要 |
| --- | --- | --- |
| D2 | OK | `v0.7.1` |
| Graphviz `dot` | OK | `dot - graphviz version 2.44.0 (0)` |
| Mermaid CLI `mmdc` | MISSING | `mmdc` 不存在 |
| Node | OK | `v20.17.0` |
| npm | OK | `10.8.2` |
| Java | OK | `openjdk version "25.0.1" 2025-10-21` |
| PlantUML | MISSING | 未找到 `plantuml` 或 `plantuml.jar` |
| Typst | MISSING | 未找到 `typst` |
| Manim | MISSING | 未找到 `manim` |
| diagrams.py | BROKEN | `ModuleNotFoundError: No module named 'diagrams'` |

## 6. Smoke test 结果

运行命令：

```bash
bash scripts/smoke_render_diagrams.sh
```

成功：

- D2：生成 `smoke/d2/smoke_architecture.svg`
- Graphviz：生成 `smoke/graphviz/smoke_map.svg`

未执行或失败原因：

- Mermaid：`mmdc command not found`
- PlantUML：`plantuml command or jar not found`
- Typst：`typst command not found`
- Manim：`manim command not found`

Smoke 源文件和报告保存在 `smoke/`。该目录为本地产物，默认被 `.gitignore` 排除。

## 7. 需要后续安装的项目

优先级建议：

- core：Mermaid CLI、PlantUML
- recommended：Typst、Manim、diagrams.py
- optional：Draw.io、Excalidraw

安装时只使用用户目录级路径，例如 `envs/`、`bin/` 或用户 npm prefix；不要使用 `sudo`。

## 8. 覆盖、跳过和删除情况

- 未覆盖任何 upstream repo 内容。
- 根目录 `README.md` 和 `.gitignore` 被重写为新的 toolkit 结构说明和忽略规则。
- 原有 `RESOURCE_LOG.md` 保留。
- 旧的 `prompt-resources/`、`research-system-references/`、`visual-examples/` 在内容迁移后为空目录，已用 `rmdir` 移除；未删除其中任何文件。
- 外部 clone 内容通过 `.gitignore` 的 `**/repo/**` 排除，不会进入根仓库提交。

## 9. 后续建议

- 补全 AutoFigure-Edit、Crafter、LiveFigure、FigureWeave、Graphify 的确认 URL，再决定是否 clone。
- 对未 clone 资源做 license audit；`LICENSE_AUDIT.md` 中为 `unknown` 的资源，在人工检查前不要直接复用代码。
- 安装 Mermaid CLI、PlantUML、Typst、Manim、diagrams.py 后，重新运行：

```bash
bash scripts/check_core_software.sh
bash scripts/smoke_render_diagrams.sh
```

- 如果要让 Graphify 类工具扫描项目，先从 `templates/graphifyignore_template` 复制 allowlist 配置，只放开明确需要的代码和文档路径。

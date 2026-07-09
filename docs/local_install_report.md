# Local Install Report

日期：2026-07-09

本次只在当前仓库 `/overflow/htzhu/mingcheng_new/AI_Research_Toolkit` 下安装缺失工具，不使用 `sudo`，不写系统目录。

## 安装位置

| 工具 | 位置 |
| --- | --- |
| Mermaid CLI | `envs/npm-prefix/`，wrapper 为 `bin/mmdc` |
| PlantUML | `bin/plantuml.jar`，wrapper 为 `bin/plantuml` |
| Typst | `envs/typst/`，wrapper 为 `bin/typst` |
| Manim | `envs/python-tools/`，wrapper 为 `bin/manim` |
| diagrams.py | `envs/python-tools/` |
| Puppeteer Chrome cache | `envs/puppeteer-cache/` |

`envs/`、`repo/`、smoke 输出和 `bin/plantuml.jar` 均由 `.gitignore` 排除，不进入根仓库提交。

## 版本检查

运行：

```bash
bash scripts/check_core_software.sh
```

结果：

| 工具 | 状态 | 版本或说明 |
| --- | --- | --- |
| D2 | OK | `v0.7.1` |
| Graphviz `dot` | OK | `dot - graphviz version 2.44.0 (0)` |
| Mermaid CLI | OK | `11.16.0` |
| Node | OK | `v20.17.0` |
| npm | OK | `10.8.2` |
| Java | OK | `openjdk version "25.0.1" 2025-10-21` |
| PlantUML | OK | `PlantUML version 1.2026.6` |
| Typst | OK | `typst 0.15.0` |
| Manim | OK | `Manim Community v0.20.1` |
| diagrams.py | OK | `diagrams import OK` |

## Smoke render

运行：

```bash
bash scripts/smoke_render_diagrams.sh
```

结果：

| 工具 | 状态 | 输出 |
| --- | --- | --- |
| D2 | OK | `smoke/d2/smoke_architecture.svg` |
| Graphviz | OK | `smoke/graphviz/smoke_map.svg` |
| Mermaid CLI | BROKEN | Chromium 启动失败，错误来自 crashpad/socket 权限限制 |
| PlantUML | OK | `smoke/plantuml/smoke_sequence.svg` |
| Typst | OK | `smoke/typst/smoke_note.pdf` |
| Manim | OK | 只做版本检查，不渲染长视频 |

## Mermaid 说明

`mmdc --version` 已可用，但 `mmdc` 渲染需要 Chromium。当前系统 Chromium 和仓库本地 Puppeteer Chrome 都在启动时失败：

```text
setsockopt: Operation not permitted
```

这属于当前节点对 Chromium crashpad/sandbox 行为的限制，不是 Mermaid CLI 包缺失。`bin/mmdc` 已默认使用 `scripts/mermaid-puppeteer-config.json`，包含 `--no-sandbox`、`--disable-crashpad` 等参数；若换到允许 Chromium headless 的节点，Mermaid smoke 可能直接通过。

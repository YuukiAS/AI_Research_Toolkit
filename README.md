# AI Research Toolkit

这个仓库是通用 AI research toolkit 的资源索引和本地检查入口，只存放非 skill 资源：可安装软件、科研图示工具链、论文图生成工具、视觉样例仓库、prompt/research writing 资源、自动科研系统参考仓库，以及本地安装检查脚本。

它不是某个具体研究项目的专用目录。外部项目统一放在各资源目录的 `repo/` 下；本仓库自己的说明、模板、脚本、示例和清单放在 `repo/` 外层。

## Top-level layout

| 路径 | 用途 |
| --- | --- |
| `software/` | 可以安装、运行、调用、渲染或本地执行的工具 |
| `references/` | 主要用于阅读、学习、风格参考或资源索引的仓库 |
| `examples/` | 本仓库维护的最小示例，不依赖 upstream repo 内部结构 |
| `templates/` | 本仓库自己的通用模板 |
| `scripts/` | 检查、安装、更新、渲染等本地脚本 |
| `inventory/` | 机器可读资源清单 |
| `smoke/` | smoke render 输出和测试源文件 |
| `docs/` | 维护报告和长说明 |
| `bin/` | wrapper 或软链接 |
| `envs/` | 用户目录级隔离环境，例如 venv、conda env、npm prefix、Go bin |
| `logs/` | 本地运行日志 |

## Resource index

资源总览见 `RESOURCE_INDEX.md`。机器可读清单见 `inventory/resources.yaml`。

## Maintenance rules

- 不把本地说明写进 upstream repo 根目录。
- 不把 raw data、NIfTI、checkpoint、logs、submission zip、secrets 或大型数据目录纳入索引扫描。
- 外部 clone 默认由 `.gitignore` 排除，根仓库只跟踪外层说明、脚本、模板和清单。
- 新增资源时，先放入合适分类目录，再更新 `inventory/resources.yaml`、`RESOURCE_INDEX.md` 和对应资源 README。

## Local checks

```bash
bash scripts/check_toolkit_layout.sh
bash scripts/check_core_software.sh
bash scripts/smoke_render_diagrams.sh
```

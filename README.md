# AI Research Toolkit

这个仓库用于维护通用 AI 科研工具工作台，存放非 skill 资源：可安装软件、科研图示工具链、论文图生成工具、视觉样例仓库、prompt / research writing 参考、自动科研系统参考、wrapper 和本地检查脚本。

本仓库不是具体科研项目目录，也不是 Codex skill marketplace。仓库边界见 `docs/REPOSITORY_BOUNDARY.md`。

## 通用方法规范

- [从科研想法到博士一作论文：通用科学研究标准](RESEARCH_IDEA_TO_FIRST_AUTHOR_PAPER_STANDARD.md)：从重要科学问题、原始文献与可证伪假设出发，经强基线、独立证据、原创贡献与第一作者主导形成可发表研究。
- [复杂系统设计与交付标准](COMPLEX_SYSTEM_DESIGN_GUIDE.md)：怎样设计、实施和验收真实可用的复杂系统。
- [AI 架构团队：用户需求](docs/research/architecture-workflow-20261026/01_USER_REQUIREMENTS_ZH.md)与[方案比较](docs/research/architecture-workflow-20261026/02_OPTIONS_AND_RECOMMENDED_MECHANISM_ZH.md)：记录跨项目长期要求，比较三种 AI 设计方式，给出并行协作、人工成本与架构交接建议（尚未自动化落地）。
- [复杂架构的可信解释标准](COMPLEX_ARCHITECTURE_EXPLANATION_STANDARD.md)：怎样结合实际使用、因果机制与证据，向读者解释系统为何有用、当前真正做到了什么。
- [AI 可靠工作体系：当前组件与设计边界](AI_RELIABILITY_SYSTEM_REFERENCE.md)：记录 Reasoned Design、Artifact Curation、Clear Writing、workflow-core、Delivery Assurance 与 Bridge Kit 的目标职责，供复杂系统展示研究引用；方案尚未实施。
- [用户认可的复杂架构解释范例（2026-10-22）](docs/examples/ACCEPTED_COMPLEX_ARCHITECTURE_EXPLANATION_2026-10-22.md)：保留一次明确获得用户认可的完整版本对比、真实机制及证据边界解释，作为范例而非新的强制模板或产品验收结论。
- [Mica：路线图完整却漏了真实界面取证](docs/examples/MICA_REAL_UI_EVIDENCE_GATE_FAILURE_2026-10-26_ZH.md)：记录关键外部测试前提未落实导致开发停滞的例子，以及如何局部继续开发。

## 新机器使用流程

```bash
git clone https://github.com/YuukiAS/AI_Research_Toolkit.git
cd AI_Research_Toolkit
bash scripts/bootstrap.sh
bin/ai-research-toolkit validate
bin/ai-research-toolkit list
bin/ai-research-toolkit sync --priority core --dry-run
bin/ai-research-toolkit doctor
```

`repo/` 是可选的本地 upstream clone，fresh clone 后可以不存在。需要某个资源时，再用 `sync` 选择性 clone。

## 常用命令

```bash
bin/ai-research-toolkit list
bin/ai-research-toolkit validate
bin/ai-research-toolkit status
bin/ai-research-toolkit sync --id paper2any --dry-run
bin/ai-research-toolkit doctor --json
bin/ai-research-toolkit smoke
bin/ai-research-toolkit generate
```

旧入口仍保留，但只是统一 CLI 的薄 wrapper：

```bash
bash scripts/check_toolkit_layout.sh
bash scripts/check_core_software.sh
bash scripts/smoke_render_diagrams.sh
```

## 目录结构

| 路径 | 用途 |
| --- | --- |
| `software/` | 可安装、可调用、可渲染或可本地执行的软件工具 |
| `references/` | 阅读、学习、风格参考、prompt、写作或系统参考仓库 |
| `examples/` | 本仓库维护的最小示例和 smoke 输入模板 |
| `templates/` | 本仓库维护的通用模板 |
| `scripts/` | CLI 实现、bootstrap 和兼容 wrapper |
| `inventory/` | 持久化资源清单、候选资源和 retired 记录 |
| `docs/` | 仓库边界、历史审计和维护说明 |
| `bin/` | tracked wrapper 和主入口 |
| `.local/` | ignored 的本机环境、缓存、日志、smoke 输出和状态文件 |

正式资源的外层结构如下：

```text
<category>/<resource>/
  README.md
  install.md
  notes.md
  privacy.md
  examples/
  repo/
```

`repo/` 由 Git 忽略，只表示可选的 upstream 工作副本。本仓库自己的说明、模板和示例必须放在 `repo/` 外层。

## 事实来源

- `inventory/resources.yaml` 是正式资源的唯一清单。
- `inventory/candidates.yaml` 记录尚未确认 upstream 身份的候选名称。
- `inventory/retired.yaml` 预留给未来确认 retired 的历史资源。
- `RESOURCE_INDEX.md` 和 `LICENSE_AUDIT.md` 由 `bin/ai-research-toolkit generate` 生成，不手工维护。
- 本机检测结果写入 `.local/state/resources.json`，不提交。

## 图示工具取舍

当前服务器无法稳定启动 Chromium headless，因此已从正式资源中移除 Mermaid CLI。图示渲染优先使用：

- D2：架构图、流程图、系统关系图。
- Graphviz：依赖图、DAG、状态关系。
- PlantUML：sequence diagram、UML、组件图、状态图。
- Typst：PDF、公式、图文排版。

## 安全规则

- 不在本仓库中使用 `sudo`。
- 不扫描 raw data、NIfTI、checkpoint、logs、submission archive、`.env*`、secret、token 或 credential。
- 不修改 `repo/` 内 upstream 文件。
- 不对 upstream clone 执行 reset、clean、rebase 或 force checkout。
- `sync` 遇到 dirty upstream clone 会跳过并报告。

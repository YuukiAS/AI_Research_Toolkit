# 资源维护日志

这个文件记录 `AI_Research_Toolkit` 中外部资源的导入、更新、替换和移除。根目录 `README.md` 用于快速检索；本文件用于保留变更历史和版本线索。

## 记录格式

新增或更新资源时，建议记录：

- 日期
- 分类和本地路径
- 来源 URL
- 分支和 commit
- 资源类型
- 主要用途
- 维护备注

## 2026-07-09 初始导入与重组

| 分类 | 当前路径 | 旧路径 | 来源 | 分支 | Commit | 大小 | 类型 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `software/scientific-figure-generation` | `software/scientific-figure-generation/Paper2Any/repo` | `software/Paper2Any` | <https://github.com/OpenDCAI/Paper2Any.git> | `main` | `1ca1f65` | 817M | 产品级 paper-to-anything 工具 | 覆盖 paper-to-figure、paper-to-PPT、paper-to-Drawio、paper-to-poster、paper-to-video、rebuttal、citation、image playground、knowledge-base 等工作流。 |
| `software/scientific-figure-generation` | `software/scientific-figure-generation/academic-figure-generator/repo` | `software/academic-figure-generator` | <https://github.com/LigphiDonk/academic-figure-generator.git> | `main` | `0a2bec6` | 63M | 本地 FastAPI/React 学术配图生成应用 | 用于论文驱动的 academic image prompt generation 和图像生成。 |
| `references/visual-examples` | `references/visual-examples/figures4papers/repo` | `visual-examples/figures4papers` | <https://github.com/ChenLiu-1996/figures4papers.git> | `main` | `05644a5` | 107M | 论文级 Python 作图示例 | 包含 publication-quality figure examples 和 `scientific-figure-making` skill。 |
| `references/prompt-resources` | `references/prompt-resources/awesome-ai-research-writing/repo` | `prompt-resources/awesome-ai-research-writing` | <https://github.com/Leey21/awesome-ai-research-writing.git> | `main` | `c07628b` | 37M | AI 科研写作 prompt/skill 资源 | 覆盖 writing、templates、citations、tables、captions、coauthoring、humanization 等场景。 |
| `references/research-system-references` | `references/research-system-references/awesome-autoresearch/repo` | `research-system-references/awesome-autoresearch` | <https://github.com/webfuse-com/awesome-autoresearch.git> | `main` | `b99fab1` | 2.1M | 自动研究系统参考列表 | 记录 autonomous improvement loops、autoresearch descendants、research-agent systems、benchmarks 和相关 writeups。 |

同日新增 `RESOURCE_INDEX.md`、`LICENSE_AUDIT.md`、`inventory/resources.yaml`、`scripts/check_toolkit_layout.sh`、`scripts/check_core_software.sh`、`scripts/smoke_render_diagrams.sh` 和 `templates/` 下的通用模板。外部 clone 内容保留在各自 `repo/` 中，根仓库通过 `.gitignore` 排除这些 upstream 内容。

## 后续维护建议

- 更新外部资源后，在对应条目下追加日期和新 commit，不覆盖旧记录。
- 如果资源用途发生变化，在 `README.md` 更新快速定位描述。
- 如果资源被 fork 或本地二次开发，记录 fork URL、原因和与上游的同步策略。

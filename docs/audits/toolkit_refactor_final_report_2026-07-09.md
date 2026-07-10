# Toolkit Refactor Final Report

日期：2026-07-09

实现 commit：`8fdf142`

## 1. 保留的原始设计

保留了 `software/`、`references/`、`examples/`、`templates/`、`scripts/`、`inventory/`、`docs/`、`bin/`。没有新增 `resources/` 包装层，也没有重命名现有仓库。

每个正式资源继续使用外层说明 + 可选 `repo/` 的模型；`repo/` 由 Git 忽略，fresh clone 后可以不存在。

## 2. Inventory schema 变化

`inventory/resources.yaml` 成为正式资源的唯一事实来源，删除了机器本地字段 `install_status`。新增治理字段：

- `resource_role`
- `lifecycle`
- `integration_status`
- `support_status`
- `default_ref`
- `last_verified_commit`
- `superseded_by`
- `provenance_note`
- `derived_from`

`RESOURCE_INDEX.md` 和 `LICENSE_AUDIT.md` 已改为 `bin/ai-research-toolkit generate` 生成文件。

后续补充校验：`validate` 现在还要求每个正式资源外层存在 `README.md`、`install.md`、`notes.md`、`privacy.md` 和 `examples/`，但仍不要求 fresh clone 预先存在 ignored `repo/`。

## 3. Candidates 分离

以下无确认 URL 的名称已从正式资源树移入 `inventory/candidates.yaml`，并删除原 formal placeholder 目录：

- AutoFigure-Edit
- Crafter
- LiveFigure
- FigureWeave
- Graphify

`AutoFigure` 保留在正式 inventory 中，但标为 `resource_role: source-material`、`integration_status: source-only`、`support_status: unverified`，默认 sync 不下载。

## 4. 本机状态迁移

本机状态迁入 `.local/`：

- `envs/` -> `.local/envs/`
- `logs/` -> `.local/logs/`
- smoke 输出 -> `.local/smoke/`
- PlantUML jar -> `.local/cache/plantuml/plantuml.jar`
- 机器检查状态 -> `.local/state/resources.json`

`.local/`、upstream `repo/`、缓存、环境、日志和 smoke 输出均由 Git 忽略。

## 5. CLI 命令

新增统一入口 `bin/ai-research-toolkit`，实现：

- `list`
- `validate`
- `sync`
- `status`
- `doctor`
- `smoke`
- `generate`

旧脚本 `scripts/check_toolkit_layout.sh`、`scripts/check_core_software.sh`、`scripts/smoke_render_diagrams.sh` 已改为薄 wrapper。

## 6. Dirty upstream 保护

`sync` 从实际目录读取 remote、branch、commit、dirty 和 untracked 状态。规则：

- repo 不存在时才 clone。
- remote 不一致时报错，不覆盖。
- dirty 或存在 untracked 文件时跳过并报告。
- clean repo 只执行 fetch 和 fast-forward merge。
- 不执行 hard reset、clean、rebase 或 force checkout。

当前 5 个非空 upstream clone 在重构前后 remote、commit、dirty 状态保持一致：

| Repo | Commit | Status |
| --- | --- | --- |
| `software/scientific-figure-generation/Paper2Any/repo` | `1ca1f658e811dcec4f9e3d951ce8dacd344d050c` | clean |
| `software/scientific-figure-generation/academic-figure-generator/repo` | `0a2bec6bb56d6b47143a81909f8d818716bdcbab` | clean |
| `references/visual-examples/figures4papers/repo` | `05644a59219b85d824620b1ad3ceecb029fdbbe5` | clean |
| `references/prompt-resources/awesome-ai-research-writing/repo` | `c07628b453309a1fb131ee105b2f01190162bc6c` | clean |
| `references/research-system-references/awesome-autoresearch/repo` | `b99fab177127bb13c8992fa9b84fe2b833083994` | clean |

## 7. Fresh-machine 结果

`bash scripts/bootstrap.sh` 已创建 `.local/envs/toolkit` 并安装 CLI 最小依赖 `PyYAML==6.0.3`。`bin/ai-research-toolkit validate` 在没有多数 `repo/` 的状态下通过，说明 fresh clone 不依赖本机 upstream clone。

`bin/ai-research-toolkit sync --priority core --dry-run` 只报告 core standalone 资源会被 clone 或 fast-forward，不下载 source-only、reference-only、merged、retired 或 candidates。

## 8. Doctor 和 smoke 真实结果

`bin/ai-research-toolkit doctor --strict` 返回 `0`。core command 检查结果：

- D2 OK
- Graphviz OK
- Mermaid CLI OK
- PlantUML OK
- Paper2Any SKIPPED，manual
- academic-figure-generator SKIPPED，manual

`bin/ai-research-toolkit smoke` 返回 `0`，但报告 Mermaid BROKEN。`bin/ai-research-toolkit smoke --strict` 返回 `1`，与 Mermaid/Chromium 启动失败一致：

```text
Error: Failed to launch the browser process
```

没有伪造 Mermaid smoke 成功。

## 9. 自动测试和 CI

已添加 `python -m unittest` 测试，覆盖 schema、重复 id/path、无 URL 拒绝、fresh clone validate、sync dry-run、本地 bare repo clone、remote mismatch、dirty skip、fast-forward、status、strict doctor/smoke、generate、candidates 排除。

本地结果：

```text
Ran 16 tests
OK
```

新增 GitHub Actions workflow：安装 CLI 依赖、运行 `python -m unittest`、`bin/ai-research-toolkit validate`、`bin/ai-research-toolkit generate`、`git diff --exit-code`。

## 10. Git 状态

初始 HEAD：`971bd870557a419e1282829a22768011c5f5cbec`

实现 commit：`8fdf142`

最终报告 commit 会在本文件提交后产生；最终 `git status --short` 由交付回复记录。

`TODO.md` 保持未跟踪任务输入，未纳入提交。

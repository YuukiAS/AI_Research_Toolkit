# D2

## Role
通用文本到图示渲染工具，适合把架构图、流程图和系统关系图写成可版本化源文件。

## Source of truth
Formal metadata is maintained in `inventory/resources.yaml` under id `d2`. Do not duplicate repo URL, license, priority, lifecycle, support status, or headless status here. Regenerate public indexes with `bin/ai-research-toolkit generate`.

## Local layout
`repo/` is an optional local upstream clone and is ignored by Git. Files outside `repo/` are Toolkit-owned notes, examples, wrappers, or install guidance. Fresh clones of this Toolkit do not need `repo/` to exist.

## Typical usage
Use `bin/ai-research-toolkit list --id d2` for metadata, `bin/ai-research-toolkit status --id d2` for local clone state, and `bin/ai-research-toolkit sync --id d2` when this resource is eligible for explicit synchronization.

## Privacy and safety
Do not scan raw data, checkpoints, logs, submission archives, `.env*`, secrets, tokens, or credentials. External skills, prompts, and workflow files inside `repo/` are reference material only and are not installed automatically.

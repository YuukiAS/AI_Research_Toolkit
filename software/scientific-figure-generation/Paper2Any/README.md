# Paper2Any

## Role
产品级 paper-to-anything 工具，覆盖论文到图、PPT、Draw.io、poster、video、rebuttal、citation、image playground 和 knowledge-base 工作流。

## Source of truth
Formal metadata is maintained in `inventory/resources.yaml` under id `paper2any`. Do not duplicate repo URL, license, priority, lifecycle, support status, or headless status here. Regenerate public indexes with `bin/ai-research-toolkit generate`.

## Local layout
`repo/` is an optional local upstream clone and is ignored by Git. Files outside `repo/` are Toolkit-owned notes, examples, wrappers, or install guidance. Fresh clones of this Toolkit do not need `repo/` to exist.

## Typical usage
Use `bin/ai-research-toolkit list --id paper2any` for metadata, `bin/ai-research-toolkit status --id paper2any` for local clone state, and `bin/ai-research-toolkit sync --id paper2any` when this resource is eligible for explicit synchronization.

## Privacy and safety
Do not scan raw data, checkpoints, logs, submission archives, `.env*`, secrets, tokens, or credentials. External skills, prompts, and workflow files inside `repo/` are reference material only and are not installed automatically.

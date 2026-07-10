# awesome-autoresearch

## Role
自动科研系统参考列表，用于查找 autonomous improvement loops、research agents、benchmarks 和相关 writeup。

## Source of truth
Formal metadata is maintained in `inventory/resources.yaml` under id `awesome-autoresearch`. Do not duplicate repo URL, license, priority, lifecycle, support status, or headless status here. Regenerate public indexes with `bin/ai-research-toolkit generate`.

## Local layout
`repo/` is an optional local upstream clone and is ignored by Git. Files outside `repo/` are Toolkit-owned notes, examples, wrappers, or install guidance. Fresh clones of this Toolkit do not need `repo/` to exist.

## Typical usage
Use `bin/ai-research-toolkit list --id awesome-autoresearch` for metadata, `bin/ai-research-toolkit status --id awesome-autoresearch` for local clone state, and `bin/ai-research-toolkit sync --id awesome-autoresearch` when this resource is eligible for explicit synchronization.

## Privacy and safety
Do not scan raw data, checkpoints, logs, submission archives, `.env*`, secrets, tokens, or credentials. External skills, prompts, and workflow files inside `repo/` are reference material only and are not installed automatically.

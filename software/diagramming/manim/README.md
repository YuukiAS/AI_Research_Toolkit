# Manim

## Role
数学动画和讲解视频生成工具，适合科研方法动画、几何/公式演示和短视频说明。

## Source of truth
Formal metadata is maintained in `inventory/resources.yaml` under id `manim`. Do not duplicate repo URL, license, priority, lifecycle, support status, or headless status here. Regenerate public indexes with `bin/ai-research-toolkit generate`.

## Local layout
`repo/` is an optional local upstream clone and is ignored by Git. Files outside `repo/` are Toolkit-owned notes, examples, wrappers, or install guidance. Fresh clones of this Toolkit do not need `repo/` to exist.

## Typical usage
Use `bin/ai-research-toolkit list --id manim` for metadata, `bin/ai-research-toolkit status --id manim` for local clone state, and `bin/ai-research-toolkit sync --id manim` when this resource is eligible for explicit synchronization.

## Privacy and safety
Do not scan raw data, checkpoints, logs, submission archives, `.env*`, secrets, tokens, or credentials. External skills, prompts, and workflow files inside `repo/` are reference material only and are not installed automatically.

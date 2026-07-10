# Repository Boundary

This repository is a general AI research toolkit for software, references, examples, templates, inventory, wrappers, and local checks. It is not a Codex skill marketplace and is not a second source of active skills.

## What This Repository May Track

- Metadata for installable or callable software.
- Optional upstream clones under ignored `repo/` directories.
- Reference repositories that contain prompts, workflows, examples, or skills.
- Local wrappers and scripts that call software from this toolkit.

## What This Repository Must Not Do

- It must not scan external `repo/` directories and automatically install `SKILL.md` files.
- It must not link external skills into `.agents/skills/`.
- It must not generate a second Codex Marketplace.
- It must not copy external skills into `AI_Skills_Collection` automatically.
- It must not mix Toolkit-owned notes into upstream clone roots.

## Adopting External Skills

If a future workflow needs a skill from an external reference repo, that skill must be reviewed separately for source, license, quality, and safety. Any adopted skill belongs in `AI_Skills_Collection`, with provenance recorded there: original repo URL, path, ref, license, and adaptation notes.

## Upstream Clone Policy

`repo/` directories are optional local work copies. They are ignored by Git, may be absent on a fresh machine, and are not the durable source of truth. Durable provenance belongs in `inventory/resources.yaml`, `inventory/candidates.yaml`, `inventory/retired.yaml`, and generated audit files.

If upstream code is modified locally, the maintainer must fork or record an explicit patch strategy. This toolkit must not silently treat modified upstream clones as canonical.

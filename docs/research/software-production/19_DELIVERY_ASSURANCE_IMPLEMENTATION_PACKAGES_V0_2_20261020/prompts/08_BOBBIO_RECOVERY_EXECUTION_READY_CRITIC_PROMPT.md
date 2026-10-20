# Package 08 v0.2 — Bobbio Authority Recovery Execution-Ready Critic Prompt

你现在担任独立 Critic，只审小型恢复任务 `bobbio--status-authority-recovery`。不审 Bobbio Delivery Assurance consumer，不实施代码、产品或 Windows/Zotero 操作。

## Context

- package: `docs/research/software-production/19_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_2_20261020/08_BOBBIO_AUTHORITY_RECOVERY_V0_2.md`
- package commit: `f2f2e3b9b9be2fea3339241960204984a675b73b`
- target repo: `YuukiAS/Bobbio`
- inspected develop: `a64edfd6c5b11f81599bfcfc327be5964633a7b5`
- inspected main: `e7d929bad2d4b23939c81920e77390efbce42b96`
- previous review: `.../18_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_1_20261020/reviews/08_BOBBIO_RECOVERY_CRITIC_REVIEW.md`
- previous findings: `DA-ER-08-F01`, `DA-ER-08-F02`
- expected review: `.../19_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_2_20261020/reviews/08_BOBBIO_AUTHORITY_RECOVERY_V0_2_CRITIC_REVIEW.md`

## Required reads

Refresh Bobbio `develop` and `main`, then read on both branches as applicable:

- `AGENTS.md`
- `README.md`
- `ROADMAP.md`
- `docs/CURRENT_MILESTONE.md`
- `docs/VERSIONING.md`
- `docs/DEVELOPMENT_WORKFLOW.md`
- `package.json`
- `docs/handoffs/ACCEPTANCE_0.2.0_2026-09-13.md`
- `docs/plans/IMPLEMENTATION_PLAN_0.3.0.md` and active 0.3 successors.

Confirm current facts rather than inheriting the previous review wording.

## Finding recheck

### F01 branch facts and topology

Verify the package accurately states:

- develop: accepted 0.2 plus current 0.3 development/package;
- main: accepted stable 0.2 plus stale historical status wording;
- two branch-scoped reviewed tasks are necessary and bounded;
- Step A cannot edit main;
- Step B is docs/authority-only and cannot directly push/merge main;
- both branch reviews and exact integrated identities are required before aggregate closure;
- package-specific user kickoff is still required for branch/publication/main effects.

### F02 locator and normal entry

Verify exact paths exist as frozen design inputs:

- `docs/BOBBIO_MILESTONE_AUTHORITY.json`
- `scripts/validate-bobbio-milestone-authority.mjs`
- `tests/frontend/bobbio-milestone-authority.test.mjs`
- six exact fixtures;
- package command `validate:milestone-authority`;
- durable evidence paths.

Confirm the validator uses explicit refs, not current checkout/newest file/mtime.

## Attack requirements

Attack:

- newest file wins;
- package version equals acceptance;
- deleting stale docs without supersession hides history;
- main 0.2 evidence becomes develop 0.3 current truth;
- develop 0.3 current status becomes main accepted release;
- old 0.2 evidence signs 0.3 enhanced annotations;
- branch change leaves prior authority result valid;
- locator-only move forces product decision;
- semantic conflict is resolved by Executor;
- Step B silently edits product code/package version;
- recovery expands into DA adapter/Windows/Zotero/product acceptance.

## Decision

Only `PASS / REVISE`.

PASS output:

```text
decision=PASS
READY_FOR_CODEX=YES
reviewed_package_commit=f2f2e3b9b9be2fea3339241960204984a675b73b
USER_EXECUTION_AUTHORIZATION=NOT_GRANTED
MAIN_INTEGRATION_AUTHORIZATION=NOT_GRANTED
NEXT_HANDOFF=PLANNER
```

PASS approves only the bounded two-step recovery after a later kickoff explicitly authorizes exact branches/worktrees and publication. It does not approve Bobbio DA adapter or 0.3 acceptance.

REVISE uses old finding IDs when applicable, otherwise `DA-ER-08-V02-Fxx`.

Write only the review artifact; do not generate a Codex kickoff.

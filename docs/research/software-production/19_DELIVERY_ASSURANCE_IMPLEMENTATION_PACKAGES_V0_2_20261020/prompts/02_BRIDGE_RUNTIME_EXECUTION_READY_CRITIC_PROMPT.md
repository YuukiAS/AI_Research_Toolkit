# Package 02 v0.2 — Bridge Runtime Execution-Ready Critic Prompt

你现在担任 AI Research Stack 的独立 Critic，只审 Delivery Assurance Package 02 v0.2：`bridge-core--delivery-assurance-runtime`。

本轮不实施代码，不修改 Bridge，不审 workflow-core/domain/consumer。结论只允许 `PASS / REVISE`。

## Active Review Context

- target_repo: `YuukiAS/GPT_Codex_AI_Bridge_Kit`
- task_key: `bridge-core--delivery-assurance-runtime`
- reviewed_package:
  `docs/research/software-production/19_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_2_20261020/02_BRIDGE_RUNTIME_V0_2.md`
- package commit: `2f085624b99010a30fa80e11e87e1aa99812d2f9`
- previous review:
  `docs/research/software-production/18_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_1_20261020/reviews/02_BRIDGE_RUNTIME_CRITIC_REVIEW.md`
- previous findings: `DA-ER-02-F01`, `DA-ER-02-F02`
- frozen production base claimed by package:
  `refs/heads/release@ba9013b9fbbd242e51b09f9d09291f417df17652`
- da/1 commit: `e278a3bab0949eac8a6f7df4007066da6eae7bd6`
- expected review artifact:
  `docs/research/software-production/19_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_2_20261020/reviews/02_BRIDGE_RUNTIME_V0_2_CRITIC_REVIEW.md`

## Required reads

Read latest Bridge `AGENTS.md`, current `main`, `release`, current 0.11 scope-reset sources/evidence, Review spec/implementation, Control spec/implementation, Persistent Run, Host/Hook rules, and the exact release source files named in the package.

Confirm whether `release@ba9013...` is a real formal post-reset production base and whether a newer release successor preserves the same scope. Do not accept current divergent `main` merely because it is the default branch.

## Finding recheck

### F01 post-reset production base

Verify:

- `ba9013...` contains the 0.11 reset and 0.11.1 formal release source;
- app-server reader/display, Progress thread, persistent Codex thread, worktree exchange and cross-workflow event bus are absent from the production contract;
- the package branch is based on exact release or an approved strict successor;
- no future imaginary surface remains a dependency.

### F02 normal-entry call sites

Verify exact integration at:

- Lite `ai_bridge_kit/cli.py::run_lite_task` and `readiness.preflight_lite_task`;
- Review `reviewed_runner.py::run_codex_event` plus existing task/result transition validation;
- Control `agent_flow.py::launch_executor_with_preflight`, `validate_review_bundle`, `validate_planner_pass_candidate` and existing final completion validator;
- project-local trusted Stop template/handler;
- task-owned da/1 packet paths and one Bridge identity verdict object.

Confirm the ordering is precise enough that Executor does not choose integration sites.

## Attack requirements

Attack:

- wrong session/cwd/worktree/candidate/target/result;
- stale result closes the task;
- process exit 0 becomes semantic completion;
- duplicate/concurrent Stop event starts multiple continuations;
- Interrupt loses precedence;
- second failing Stop creates an unbounded loop;
- synthetic continuation expands authority;
- Hook trust/error/timeout/malformed event becomes PASS;
- Bridge starts interpreting professional rubrics;
- DA creates second CURRENT/DONE or scans latest-green result;
- Control role/state/nonce/budget changes;
- Persistent Run becomes DA scheduler;
- any reset-deleted mechanism returns.

## Release boundary

Confirm Package 02 intentionally performs no release movement and leaves exact next Bridge release version/ref to Package 13/bridge-kit-maintainer. This is acceptable only if implementation/review evidence can still bind one unreleased task candidate and no Executor version choice is required.

## Decision

On PASS:

```text
decision=PASS
READY_FOR_CODEX=YES
reviewed_package_commit=2f085624b99010a30fa80e11e87e1aa99812d2f9
production_base=release@ba9013b9fbbd242e51b09f9d09291f417df17652
USER_EXECUTION_AUTHORIZATION=NOT_GRANTED
NEXT_HANDOFF=PLANNER
```

PASS authorizes only later Package 02 implementation after package-specific user kickoff. It does not authorize formal release or other packages.

On REVISE, reuse old IDs when applicable or use `DA-ER-02-V02-Fxx` with direct evidence and minimum closure.

Write only the review artifact. Do not generate a Codex kickoff.

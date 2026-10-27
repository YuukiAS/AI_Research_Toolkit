# Architecture Production Protocol — mandatory negative case addendum

Date: 2026-10-27

This addendum is part of the architecture-production-protocol research task. It does not prescribe the final method. It identifies two mandatory historical cases that must be studied because they expose repeated Planner–Critic / implementation-loop failure.

## 1. Bridge Kit 0.11.x / 0.11.0 convergence history

Repository: `YuukiAS/GPT_Codex_AI_Bridge_Kit`.

Do not inspect only the final release state. Reconstruct the sequence from the 2026-10-12 initial 0.11.0 proposal through implementation, safety/recovery repairs, 2026-10-16 scope recovery, 2026-10-17/18 normal-entry/shared-server/full-functional packages, v0.6/v0.7/v0.8 review packages, and the 2026-10-19 product-scope reset.

Useful commit-message landmarks include:
- `27132a4` initial 0.11.0 proposal;
- `2e12226`, `eb63dcc`, `3e0370c` repeated design/execution package revisions;
- `26c57fa` implementation;
- `646dfa0`, `8ff3bba`, `b9956c9` post-implementation review/safety/recovery repairs;
- `524bba6`, `cb605eb`, `798c8a6`, `e2f41f8`, `24b7032` scope/progress recovery;
- `a03742e`, `f67ac91`, `ae15269`, `b4c8c70`, `ace8f65`, `a6c0a3e`, `35a976e` further execution-package convergence;
- `0120b99`, `d293e52`, `ce77f24`, `4ccc40c`, `a0ff379`, `6ac371d`, `b2e26fd`, `a9c03b4` product-scope reset and new execution package.

Research questions:
- How many distinct design/review/implementation/recovery cycles occurred?
- Which findings were genuine new external facts versus omissions that should have been exposed before implementation?
- Which changes altered the architecture itself rather than fixing local implementation bugs?
- At which earlier point could a structured architecture model, independent route competition, blindspot audit, or targeted technical probe have prevented a later reset?
- How much serial waiting and user intervention was caused by returning from implementation to architecture?
- Did repeated PASS/ready language correspond to true implementation readiness?
- Which interfaces or responsibility boundaries could have reduced the blast radius even if a later omission remained?

Do not infer failure merely from the number of commits. Classify each revision by semantic cause.

## 2. Slurm workflows routing / protected cancellation history

Repository: `YuukiAS/AI_Skills_Collection`.

Study both the routing refactor and the later protected-cancel line. Do not treat the final implementation as evidence that the route to it was efficient.

Routing refactor:
- inspect `docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_*`;
- proposals/reviews progressed through multiple versions including v0.1–v0.6;
- inspect `docs/goals/SLURM_WORKFLOWS_ROUTING_REFACTOR_GOAL_*`, execution plans/prompts, result packages, and `docs/skill-todos/slurm-workflows.md`.

Protected cancellation / confirmation:
- inspect the progression from the early cancel-protection proposal through fresh-confirmation, chat-confirmation v2/v2.1, and portable-runtime v3;
- important documents include:
  - `SLURM_WORKFLOWS_CANCEL_PROTECTION_PROPOSAL_V0_3_2026-10-13.md`;
  - `SLURM_PROTECTED_PARTITION_FRESH_CONFIRMATION_PROPOSAL_V1_2026-10-17.md`;
  - `SLURM_PROTECTED_PARTITION_CHAT_CONFIRMATION_PROPOSAL_V2_2026-10-18.md`;
  - `SLURM_PROTECTED_PARTITION_CHAT_CONFIRMATION_PROPOSAL_V2_1_2026-10-18.md`;
  - `SLURM_PROTECTED_CANCEL_PORTABLE_RUNTIME_PROPOSAL_V3_2026-10-19.md`;
  - corresponding execution plans, Critic reviews, goals, Reviewed Handoff records, and final execution evidence.

This history contains materially different implementation boundaries over time: skill-local decision logic, optional hook concepts, PATH/wrapper-style approaches, native confirmation, trusted/global Hook boundaries, and portable runtime qualification. The final v3 explicitly forbids several earlier routes such as `scancel` wrappers, PATH interception, project-local Hooks, and terminal confirmation flows.

A particularly important real implementation fact is recorded in the current Slurm TODO/evidence: a candidate protection path could fail because the Hook-launched Python runtime exited with a dynamic-library/environment failure, while ordinary Hook process failure did not itself guarantee the protected command was blocked. Study how and when this fact became visible and whether an earlier targeted real-runtime probe would have changed the architecture sooner.

Research questions:
- Which architecture changes were caused by genuinely new user requirements, and which were late discoveries of implementation reality?
- Which Critic loops narrowed the design productively, and which merely moved the architecture between wrapper/hook/runtime variants?
- How often was Codex asked to implement a supposedly frozen design before the true enforcement boundary was proven?
- Could a small early real Codex/Slurm/Hook probe have eliminated multiple later design rounds?
- Which parts should have been represented in an Asteria-style mechanism/implementation/failure-path model before freeze?
- How should a future protocol distinguish “architecture unknown”, “implementation bug”, and “external runtime fact invalidated the design”?

## 3. Required comparison with Planner–Critic

Both cases must be used as strong negative benchmarks when comparing a new architecture-production protocol against fixed Planner–Critic.

Measure or reconstruct where possible:
- number of serial design/review rounds;
- implementation starts before architecture was actually stable;
- returns from Codex/implementation to Planner;
- architecture-level resets;
- user interventions;
- elapsed calendar span;
- low-value versus decision-changing Critic findings;
- technical facts that could have been probed earlier;
- design gaps that an Asteria completeness gate could have exposed;
- blast radius of each late discovery.

Use observed facts where available. Mark estimates and interpretations explicitly. Do not manufacture exact effort or reliability numbers.

## 4. Role-specific use

- `RUN_ID=pro-a/pro-b`: incorporate these cases into the candidate protocol, sensitivity analysis, routing policy, freeze criteria, and historical benchmark.
- `RUN_ID=work`: reconstruct them independently as evidence. Work must not assume the new protocol is better; identify which failures it plausibly would and would not have prevented.

The final purpose is not to criticize old projects. It is to prevent the same architecture-production failure mode from repeating across Bridge Kit, Slurm, Mica, validators, plugins, and future systems.

# Research Source Log

RUNNER_ID: GPT56_PRO
INPUT_SNAPSHOT_COMMIT: 60d0a1feb7ca1efc8f751774850a4ec176b9ab6f

## Preflight

- Read current `PRO_INPUT/START_HERE.md` on `research/software-production-decision-20261013`; established isolation, exact input order, per-repository checkpoints, nonblocking phase recovery, and write restriction to this OUTPUT_ROOT.
- Fetched proof commit `39f86bc75fd2c9265835178a8d80043d1a3213c4`; read back both recovery anchors and confirmed matching `RUNNER_ID`, `OUTPUT_ROOT`, and `INPUT_SNAPSHOT_COMMIT`. `WRITE_PREFLIGHT=PASS`; no new startup probe was created.

## Frozen input checkpoint

Read in required order at exactly `60d0a1feb7ca1efc8f751774850a4ec176b9ab6f`:

1. `01_USER_REQUIREMENTS_NO_SOLUTIONS.md`: success means lower elapsed completion time, better first delivery, fewer user interruptions/rework, bounded compute/Codex cost, and lower maintenance. Normal entries are Windows Codex App and server Codex. Required properties include real-artifact closure, legitimate scientific `NO_GO`, no duplicate execution, resource/product failure separation, specialist/Figma consumption when applicable, and non-authoritative observability.
2. `02_OPEN_QUESTIONS_NO_ANSWERS.md`: 61 unresolved decisions spanning product scope; actual entry interception/continuation; candidate identity; repair stopping; anti-degradation and live-data protection; specialist quality; rule ownership; Slurm authorization/waiting/recovery/result truth; event provenance; adaptation cost; and the no-new-general-system baseline.
3. Entire 363-row `03_HISTORICAL_FAILURES_SOURCE_INDEX.csv`: historical samples only, all `NOT_VERIFIED_AS_CURRENT_DEFECT` unless current sources re-establish them. Recurring classes include self-report versus artifact conflict, fixture/live confusion, stale candidate identity, harness false results, semantic aggregation errors, missed visual/language defects, unsafe side effects, reviewer drift, broad retesting, scientific shrinkage/hardcoding, invalid lineage, incomplete resume, and unsupported Slurm claims.
4. `04_SOURCE_BOUNDARIES.md`: current code/rules/tests and current primary sources may establish facts; prior architectures and Planner/Critic recommendations cannot shape first-stage candidates. Repository presence, machine installation, entrypoint consumption, and candidate passage are separate claims.

## Repository checkpoint — AI_Skills_Collection

- Read `YuukiAS/AI_Skills_Collection` at `main@0d990b24fb7c7b46877347241800244f623b20c0`; formal stable ref `release@06d135d8a6ee62cd41abb40fc5771fcef7f8db25`; main was 212 commits ahead.
- Read README, root `AGENTS.md`, marketplace/plugin manifests, `workflow-core` skill, CI workflow, setup/TODO and maintained workflow-core incident notes.
- Product is a Codex plugin/skill collection plus `ai-skills` CLI. Stable installation targets `release` and requires a fresh session. `workflow-core` owns process guidance; domain plugins own technical quality; Bridge owns runtime/Git/Host Policy.
- CI proves packaging, generation/audit, unittests, Windows sparse checkout and CLI smoke, not installation or loading on a target machine and not arbitrary live-session control.
- Conclusion: suitable professional-policy and specialist-distribution layer; not an external controller, scheduler, artifact authority, or universal continuation mechanism.

## Repository checkpoint — GPT_Codex_AI_Bridge_Kit

- Read `YuukiAS/GPT_Codex_AI_Bridge_Kit` at `main@a7931fdfc6e3d71cf985351df075de17097795e6`; formal `release@9db19b0409816c22042a246b35a33e1d34fedd0a`; main was 23 commits ahead. Main is a `0.11.0` source candidate, formal distribution `0.10.0`.
- Read README, `AGENTS.md`, package metadata, CI, readiness implementation, current context-continuity TODO, and candidate execution reports.
- Bridge supplies bounded Host Policy, Lite/Reviewed/Controlled/Persistent modes, task/worktree identity, HTTPS publish/sync, unique watcher, plugin replay, persistent tmux, runtime identity and notifications. It keeps approval and workspace sandbox boundaries; Slurm mutation remains gated.
- `0.11.0` adds control-file/read binding and stronger context continuity but lacks formal distribution proof. `0.10.0` has isolated same-candidate live consumer evidence.
- Notifications and process activity are projections, not semantic completion. Installed Reviewed flows are controlled; arbitrary Windows/server Codex turns are not shown to be intercepted.
- Conclusion: strongest existing narrow substrate for execution identity, recovery and permissions; not project-specific acceptance, specialist quality, scheduler authority or universal orchestration.

## Repository checkpoint — Remote_Compute_Infrastructure

- Read `YuukiAS/Remote_Compute_Infrastructure` at `main@ca0bad392ce1295e76a07a5d8f9c9dd27d3f61d7`, including README, `AGENTS.md`, Longleaf contract/runtime, scheduling architecture, shared health states, Lucerna integration, observer documentation, ROADMAP/TODO and tests tree.
- Repository is source authority, not proof of current deployment. Longleaf/Workstation providers own typed status/diagnose/action contracts; Lucerna owns presentation and authorized operator interaction.
- Evidence is scoped by vantage, timestamp, freshness and provenance. `RUNNING`, a listener, timeout, or one vantage cannot establish end-to-end health.
- Slurm A/B allocations are scheduler-owned. Placement is `KNOWN/UNKNOWN/AMBIGUOUS`; unknown fails closed. No automatic cancel/restart/relocation/resource expansion. Actions require exact scope, preconditions, rollback/fail-closed behavior and post-verification.
- Observer Watchdog 3.0.8 is read-only. Workstation mutation remains disabled pending staffed acceptance; that is a legitimate safety `NO_GO`.
- Conclusion: retain as provider and scheduler adapter. Codex may prepare/authorize/interpret jobs, but detached job lifetime and resource truth remain scheduler-owned.

## Repository checkpoint — Lucerna

- Read `YuukiAS/Lucerna` at current `main@79dd2875d3da33c6a6d80e5e35bea812b84c1ceb`. Read README, root `AGENTS.md`, product/roadmap/long-term TODO, package and Tauri manifests, implementation tree, provider runtime, recent commit history, exact-candidate convergence result, release/tag APIs and relevant evidence metadata.
- Product is a local-first Tauri desktop monitor: Windows tray and macOS menu-bar are primary; dashboard is secondary. It presents Codex/OpenAI/GitHub/VPS/research/network evidence and dispatches narrowly authorized provider actions. It is not a workflow or semantic-completion controller.
- Implementation is substantial despite stale planning language: Rust providers and health/runtime logic, React UI, auth/vault, notifications, test/e2e/visual/performance tools and desktop evidence exist. Runtime explicitly records freshness, last attempt/success, failure count, generation, sanitized error and bounded history; failed refresh with prior payload becomes `stale`, otherwise `unavailable`.
- Rules require provenance/freshness, forbid stale or failed evidence becoming healthy, require post-action checks, separate fixtures from live providers, and require real Windows/macOS desktop closure for release claims.
- Exact candidate `58119733ec98ff253082cd64c0139f73b38d836f` has candidate-bound `01056r4` evidence: unit/type/lint/e2e closure; real Windows executable hash and desktop/provider proof; GitHub live workflow timing; Windows remote provider convergence without local-proxy substitution; real macOS desktop lifecycle. The macOS environment could not prove the remote VPS provider and the result did not claim otherwise. Reviewer disposition was ready for user final acceptance for that exact candidate.
- Current main is later than the accepted candidate, so that evidence is not a current-main release gate. GitHub release API and matching tag refs were empty; target-machine installation/current process were not probed. No repository GitHub Actions workflow was found. README/ROADMAP/TODO status is internally stale/conflicting, so result artifacts are more useful but remain candidate-scoped.
- A recent handoff incident recorded successful tests without a bound watcher receipt before timeout, demonstrating that orchestration receipt and semantic result are separate facts.
- Conclusion: reuse Lucerna as an event/status projection and bounded action UI. Do not make it a task database, scheduler, semantic verifier or source of completion truth. Any architecture must preserve provider ownership and distinguish accepted candidate, current main, published artifact and installed runtime.

Record only sources actually read. Do not infer machine state from repository state and do not read another runner's output.

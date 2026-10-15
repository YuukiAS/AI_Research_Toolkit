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
- Product is a Codex plugin/skill collection plus `ai-skills` CLI. Stable installation targets `release` and requires a fresh session. `workflow-core` owns process guidance; domain plugins own technical quality; Bridge owns runtime/Git/Host Policy.
- CI proves packaging, generation/audit, unittests, Windows sparse checkout and CLI smoke, not installation/loading on a target machine and not arbitrary live-session control.
- Conclusion: suitable professional-policy and specialist-distribution layer; not an external controller, scheduler, artifact authority, or universal continuation mechanism.

## Repository checkpoint — GPT_Codex_AI_Bridge_Kit

- Read `YuukiAS/GPT_Codex_AI_Bridge_Kit` at `main@a7931fdfc6e3d71cf985351df075de17097795e6`; formal `release@9db19b0409816c22042a246b35a33e1d34fedd0a`; main was 23 commits ahead. Main is a `0.11.0` source candidate, formal distribution `0.10.0`.
- Bridge supplies bounded Host Policy, Lite/Reviewed/Controlled/Persistent modes, task/worktree identity, HTTPS publish/sync, unique watcher, plugin replay, persistent tmux, runtime identity and notifications. It keeps approval and workspace sandbox boundaries; Slurm mutation remains gated.
- `0.11.0` adds control-file/read binding and stronger context continuity but lacks formal distribution proof. `0.10.0` has isolated same-candidate live consumer evidence.
- Notifications and activity are projections, not semantic completion. Installed Reviewed flows are controlled; arbitrary Windows/server Codex turns are not shown to be intercepted.
- Conclusion: strongest existing narrow substrate for execution identity, recovery and permissions; not project-specific acceptance, specialist quality, scheduler authority or universal orchestration.

## Repository checkpoint — Remote_Compute_Infrastructure

- Read `YuukiAS/Remote_Compute_Infrastructure` at `main@ca0bad392ce1295e76a07a5d8f9c9dd27d3f61d7`, including rules, Longleaf contract/runtime, scheduling architecture, shared health states, Lucerna integration, observer documentation, ROADMAP/TODO and tests tree.
- Repository is source authority, not proof of current deployment. Longleaf/Workstation providers own typed status/diagnose/action contracts; Lucerna owns presentation and authorized operator interaction.
- Evidence is scoped by vantage, timestamp, freshness and provenance. `RUNNING`, a listener, timeout, or one vantage cannot establish end-to-end health.
- Slurm A/B allocations are scheduler-owned. Placement is `KNOWN/UNKNOWN/AMBIGUOUS`; unknown fails closed. No automatic cancel/restart/relocation/resource expansion. Actions require exact scope, preconditions, rollback/fail-closed behavior and post-verification.
- Observer Watchdog 3.0.8 is read-only. Workstation mutation remains disabled pending staffed acceptance; that is a legitimate safety `NO_GO`.
- Conclusion: retain as provider and scheduler adapter. Codex may prepare/authorize/interpret jobs, but detached job lifetime and resource truth remain scheduler-owned.

## Repository checkpoint — Lucerna

- Read `YuukiAS/Lucerna` at `main@79dd2875d3da33c6a6d80e5e35bea812b84c1ceb`: rules, product/roadmap/TODO, manifests, implementation tree, provider runtime, commit history, exact-candidate result, release/tag APIs and evidence metadata.
- Product is a local-first Tauri desktop monitor. It presents typed evidence and dispatches narrowly authorized provider actions; it is not a workflow or semantic-completion controller.
- Runtime records freshness, last attempt/success, failures, generation, sanitized error and bounded history; refresh failure yields stale or unavailable, never healthy. Rules require provenance/freshness, post-action checks, live/fixture separation, and real desktop closure.
- Exact candidate `58119733ec98ff253082cd64c0139f73b38d836f` has bound `01056r4` Windows/macOS evidence. Windows executable/provider/GitHub-live proof closed; macOS desktop lifecycle ran but remote VPS provider remained unproven and was not overstated.
- Current main is later than that candidate; releases/tags were empty; current installation was not probed; no repository GitHub Actions workflow was found. Documentation status is stale/conflicting. A watcher incident also separated successful tests from a missing bound orchestration receipt.
- Conclusion: reuse as event/status projection and bounded action UI; not a task database, scheduler, verifier or completion authority.

## Repository checkpoint — CUHK_Date

- Read `YuukiAS/CUHK_Date` at `main@9f25c7754d3c80d0be74f5b71016320f55753ae6`. Read README, root rules, package/gate surface, authoritative current product contract, pre-real-user readiness matrix, workflows, accepted release tag, current main commit and the unmerged indexing-fix branch comparison.
- Normal product entry is the public `cuhkdate.com` web application, now branded Meet at CU, with API/Web/persistence/matching packages and Cloudflare/Supabase-backed hosted paths. Current accepted release is `0.5.25`; annotated tag `v0.5.25` resolves to commit `3d1229597253c78950b070c7c47646ddb1cb6730`. Main is intentionally ahead through later staging/audit work.
- Production classification is deliberately split: registration and Questionnaire V4 collection are live, while Matching 1.2 is only `inactive_pilot_ready`; opt-in/publication are paused and `REAL_MATCHING_STARTED=NO`. This is an explicit founder authorization boundary, not unfinished work to auto-continue.
- Current product semantics have a declared source hierarchy. Historical release evidence remains immutable but cannot override the current contract. Matching preserves hard constraints, permanent no-repeat, quality-before-coverage, deterministic assignment and truthful no-match instead of weakening thresholds.
- Root rules bind launch-quality work to exact source/deployment/run identities; require producer rehearsal and a cryptographically/state-distinct final batch; preserve one-time ticket claim/finalize semantics; distinguish product failure from tool/runtime failure; require both Chinese locales, responsive/visual/state/security evidence; and fail closed when the actual staged candidate or consumer path is not proved.
- The package exposes extensive local, integration, browser, security, race, failure-injection, migration, shadow, matching and release gates. GitHub workflows include lightweight main metadata, manually controlled/full reliability work and verification. Expensive push-triggered CI is intentionally bounded, so green repository structure alone is not a current deployed-candidate proof.
- The `0.5.25` readiness matrix explicitly records synthetic-only evidence, `readyForRealUsers=false`, and `readyForSeparateReview=true`, with real provider/browser/legal and operational decisions remaining. Later production registration activation superseded the old registration boundary, but did not authorize matching.
- Current branch `fix/search-indexing-canonical-20261015` is two commits ahead of main with canonical/redirect/private-boundary tests and production probe evidence. It is unmerged and therefore cannot be reported as current main or production closure.
- Conclusion: CUHK_Date demonstrates why project-local semantic acceptance and human authorization must remain authoritative. A general system may bind candidate/deployment/evidence and resume approved work, but must not reinterpret a deliberate pause, consume final credentials, open real matching, or replace the project’s product/security/release gates.

Record only sources actually read. Do not infer machine state from repository state and do not read another runner's output.

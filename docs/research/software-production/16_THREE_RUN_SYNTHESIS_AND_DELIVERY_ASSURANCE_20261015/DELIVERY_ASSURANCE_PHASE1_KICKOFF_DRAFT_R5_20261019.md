# Delivery Assurance Phase 1 Hook Probe — Kickoff Draft R5

Status: **DRAFT ONLY — DO NOT EXECUTE UNTIL INDEPENDENT CRITIC PASS AND THE USER SENDS THIS KICKOFF**  
Proposal: `DELIVERY_ASSURANCE_PROPOSAL_R5_20261019.md`  
Goal: `DELIVERY_ASSURANCE_PHASE1_GOAL_R5_20261019.md`  
Planned execution branch: `work/delivery-assurance-hook-probe-r5`

> 只有独立 Critic 对同版 Proposal / Goal / Kickoff 给出 `EXECUTION_READY_REVIEW_R5=PASS`，并且我随后实际发送本 Kickoff，才形成 Phase 1 执行授权。

执行 **Delivery Assurance Phase 1 Hook Probe R5**。严格读取 Critic 批准的 R5 package commit、Proposal R5、Goal R5、本 Kickoff 和对应 Critic PASS。只执行 Phase 1，不做生产实现。

执行环境使用我当前正常、已登录的真实 `CODEX_HOME` 和 Codex 正常 SQLite/state。**不要设置临时 `CODEX_SQLITE_HOME`，不要为 probe 改写 `sqlite_home`、`log_dir`、history/session/rollout 持久化策略。** Codex 自身正常产生的 SQLite、索引、日志、sessions、rollouts/backfill、认证维护等内部状态不属于 Delivery Assurance probe 的验收对象。

只隔离 Delivery Assurance 自己拥有的状态：task-owned probe workspace、candidate/evidence、project Hook handler，以及临时 `AI_BRIDGE_STATE_HOME`。probe handler、Executor 和 diagnostic code **不得直接读取、修改、复制、导出、打印、软链接、解析或依赖** `auth.json`、Codex SQLite、sessions、rollouts、credential store、API key 或其他 Codex 私有状态；只能通过正常 Codex/Hook 接口和 probe 自己的 evidence 工作。

保持 existing project trust，不新增 `projects.<path>.trust_level`。通过正常 `/hooks` 枚举全部 Hook 来源；若存在无法归因的 matching `Stop` controller，setup 立即停止。当前精确 project Hook definition/hash 必须由我本人通过正常 `/hooks` 审核并 trust；不得脚本化，不得使用 `--dangerously-bypass-hook-trust`。如果尚未 trusted，停在 `HOOK_TRUST_REQUIRED`，只告诉我 source、definition/hash、当前状态和唯一所需操作。

禁止重新 Sign in、Device Code、API key fallback、复制/软链接认证缓存；禁止修改真实 Host Policy、plugin、已有 Hook、managed policy；禁止修改/发布 Bridge、AI Skills 或任何 consumer；禁止 Windows 实机产品操作、Slurm/GPU/tmux 长任务、私有数据、付费第三方服务、新 daemon/watcher/controller/database、Program Run 或新的 Bridge workflow。

setup 通过后严格执行 Goal R5 的 **P1–P13 全部场景**，不得缩减。`auto_repair_budget=1`；用户 `Interrupt` 优先；event/task identity、machine-local atomic single-writer、candidate binding、synthetic continuation 不新增 authority、P10/P11 三层判定全部按 Goal R5 原样执行。

证据写入 Goal R5 指定的 `phase1_hook_probe_r5/` 并提交到专用执行分支。若 setup blocker 发生，保持 Phase 1 verdict 未到达；不要把 Codex 正常内部 SQLite/log/rollout/backfill/auth state 变化当成 blocker。

Phase 1 GO 后立即停止，把结果交回 Planner/Critic；**不要自动进入 Phase 2**。
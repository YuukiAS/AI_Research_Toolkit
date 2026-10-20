target_repo=YuukiAS/GPT_Codex_AI_Bridge_Kit
task_key=bridge-core--delivery-assurance-runtime
reviewed_package=docs/research/software-production/18_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_1_20261020/02_BRIDGE_RUNTIME.md
package_set_commit=f977aa997d405a297f6bcef335c2399c7ef8cae7
da1_freeze_commit=e278a3bab0949eac8a6f7df4007066da6eae7bd6
da1_sha256=8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b
source_ref_reviewed=bc94e41f44bd5b534d8ab8caa304114b8bf90685
review_stage=EXECUTION_READY
decision=REVISE
READY_FOR_CODEX=NO

# 结论

当前包正确收窄了 Bridge 的职责：只处理身份、新鲜度、Stop 和一次有界恢复，不选择或理解专业 Gate，也明确禁止恢复旧 app-server reader、Progress display thread、persistent Codex thread、worktree exchange 和跨工作流事件总线。但它绑定的“0.11 scope-reset surviving runtime surface”目前只是已通过 execution-ready 审查、尚未实施的未来表面；当前 `main` 仍是 reset 前的混合实现。包还没有冻结 Lite、Review、Control 三条正常入口的准确调用点。Codex 现在开始会被迫自行决定先做 reset、怎样处理并发改动，以及 DA 接到哪些 runtime 文件，故不能执行。

## DA-ER-02-F01 — POST_RESET_PRODUCTION_BASE_DOES_NOT_EXIST

### requirement

独立 Bridge DA lane 必须建立在已经实现、可定位的 0.11 scope-reset surviving production surface 上。执行包需要绑定 exact base commit，不能把另一个尚未实施的 execution package 当成已存在源码依赖，也不能让两个独立任务并行修改同一 runtime surface。

### direct evidence

Bridge 当前 `main@bc94e41f44bd5b534d8ab8caa304114b8bf90685` 仍包含旧混合 0.11 实现和历史 Final Scope Recovery 材料。当前正式产品范围重置包：

```text
task=bridge-core--product-scope-reset
approved_package=f4d39d5b4845d48d8c598971cab0fba1b9821c8e
READY_FOR_CODEX=YES
implementation_branch=work/bridge-core--product-scope-reset
```

已批准的 reset Plan 明确要求先删除或重写：

```text
ai_bridge_kit/reader_layer.py
ai_bridge_kit/codex_progress_thread.py
production worktree exchange
three-intent / cross-workflow event ownership
machine notifier profile expansion
```

并简化 `reviewed_handoff.py`、`reviewed_runner.py`、`agent_flow.py`、Persistent Run 和 Host templates。该 implementation branch 尚未创建，reset 尚未实施。

本包却以当前 pre-reset `main` 为 source ref，并仅写：

```text
Dependency: frozen da/1 + current approved 0.11 scope-reset surviving runtime surface
```

没有可绑定的 post-reset commit 或 tree identity。

### causal risk

DA Codex 可能直接在随后会被 reset 删除或重写的代码上实现；也可能与 scope-reset Codex 同时修改 `reviewed_handoff.py`、`reviewed_runner.py`、Hook/config templates 和测试。最终 evidence 将无法证明 DA 候选建立在实际 surviving surface 上，普通 merge 还可能重新带回已删除的重型拓扑。

### minimum closure

二选一，由 Planner 明确冻结，不得交给 Executor选择：

1. 先完成 `bridge-core--product-scope-reset` 的实现、独立 implementation review 和所需 canonical integration，再把本包的 `source_ref_reviewed`、execution base、allowed files 和 regression baseline 更新为 exact post-reset commit；或
2. 若要把 DA 纳入 scope-reset 同一任务，必须回 Planner/Critic 修改已批准 reset 语义和 execution package，撤销本包的“独立 lane”假设，再做新的 execution-ready 审查。

默认应采用方案 1。

### unique owner

Delivery Assurance Planner / Bridge product owner

## DA-ER-02-F02 — NORMAL_ENTRY_INTEGRATION_POINTS_NOT_FROZEN

### requirement

包声称支持 Lite、Review、Control 和 trusted Stop Hook，就必须列出每条正常入口的准确 runtime call site、文件、输入输出和 failure return；不能只列 Review 文件或让 Codex在 reset 后重新寻找插入点。

### direct evidence

当前包允许面只列：

```text
ai_bridge_kit/reviewed_handoff.py
ai_bridge_kit/reviewed_runner.py
ai_bridge_kit/delivery_assurance.py
Bridge Hook/config templates that survive 0.11 scope reset
```

但 normal-entry claim 是：

```text
current Bridge normal Lite/Review/Control task runtime + trusted project Stop Hook
```

已批准的 0.11 reset Plan 明确指出：

- Review 的 Executor spawn 前接入点在 `reviewed_runner.py`；
- Control 的对应接入点在 `agent_flow.py`；
- Lite、Host/template 和 CLI 仍有各自正式入口；
- Hook/config templates 必须在 reset 后确定 surviving 文件。

本包没有列出 `agent_flow.py`、Lite/CLI 入口、具体 Hook definition/handler/template 路径，也没有冻结 workflow-core claim/result 如何进入 Bridge Stop 决策、结果写回现有 task packet 的准确位置。

### causal risk

Codex 可以只接 Review 并用单元测试宣称 Bridge DA 已支持三种 workflow；也可能把 DA 写成共享 helper，却没有任何普通 Lite/Control 入口真实调用。相反，为了补齐入口，它又可能修改未经批准的 Control/Persistent 状态或新增事件路由。

### minimum closure

在 post-reset source 上修订包，逐条冻结：

1. Lite 的启动前身份绑定、完成前 claim 检查和 Stop 入口；
2. Review 的 exact Executor spawn、result materialization 和 Stop/recovery call site；
3. Control 的 exact `agent_flow.py` call site，且不改变现有角色、状态、nonce、预算和 Controller authority；
4. trusted project Hook 的准确 definition、handler、配置/安装模板和失效边界；
5. da/1 Bridge-owned subset 的输入文件、输出 evidence ref、现有 task packet 持久化位置；
6. 每条入口的 should-not-change 与正常入口 Gate，不能由共享 helper test 代签。

### unique owner

Delivery Assurance Planner / Bridge product owner

# 已接受的设计部分

以下内容无需重做：

- da/1 只解析 Bridge-owned identity subset；
- wrong task/repo/worktree/session/candidate/target/result fail closed；
- stale result不能结束任务；
- duplicate Stop event保持幂等和 single-writer；
- Interrupt 优先；
- 一次有界 continuation 延续 Phase 1 已证边界；
- 宿主能力缺失时返回 `UNSUPPORTED_WITH_EVIDENCE`；
- 不读取 Codex private auth/SQLite/session/rollout；
- 不创建第二 `CURRENT`、第二 `DONE`、新 workflow、daemon、watcher或数据库；
- BR-G1–BR-G6 的风险类别合理。

# 审查边界

本次 `REVISE` 不重开 Phase 1 Hook 研究，也不否定 Bridge DA 的窄职责。阻塞点仅是生产 base 和正常入口尚未成为可执行事实。

```text
NEXT_HANDOFF=PLANNER
CODEX_IMPLEMENTATION_AUTHORIZED=NO
USER_KICKOFF_AUTHORIZED=NO
```
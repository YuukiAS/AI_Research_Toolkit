target_repo=YuukiAS/Bobbio
task_key=bobbio--status-authority-recovery
reviewed_package=docs/research/software-production/18_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_1_20261020/08_BOBBIO_RECOVERY.md
package_set_commit=f977aa997d405a297f6bcef335c2399c7ef8cae7
da1_freeze_commit=e278a3bab0949eac8a6f7df4007066da6eae7bd6
da1_sha256=8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b
source_ref_reviewed=develop@a64edfd6c5b11f81599bfcfc327be5964633a7b5 + main@e7d929bad2d4b23939c81920e77390efbce42b96
review_stage=EXECUTION_READY
decision=REVISE
READY_FOR_CODEX=NO

# 结论

Bobbio authority recovery 是必要而且范围正确的前置任务；它不应实现 DA adapter，也不需要运行 Windows 或 Zotero。阻塞点是当前包仍把一个已经分化为“develop 已一致、main 历史状态文档仍陈旧”的问题描述成单一冲突，并计划只产生一个 develop candidate。它还没有冻结新的 canonical authority 文件路径和可执行的 branch-aware resolver/regression 入口。由于本任务本身就是恢复 locator 与权威真值，这些不能留给 Executor 临场选择。

## DA-ER-08-F01 — CURRENT_BRANCH_FACTS_AND_MUTATION_TOPOLOGY_NOT_FROZEN

### requirement

恢复包必须按 branch/release 分别陈述当前事实、需要修改的分支和不修改的历史对象，并说明一个候选怎样让 `main`、`develop` 和历史 acceptance 的权威关系真实成立。不能用单一 develop commit 暗示已经修复 main 上仍存在的 stale 文件。

### direct evidence

本轮直接核对得到：

`develop@a64edfd6c5b11f81599bfcfc327be5964633a7b5` 当前已经内部一致：

- `AGENTS.md`：`0.1.0 ACCEPTED -> 0.2.0 ACCEPTED -> 0.3.0 CURRENT`；
- `ROADMAP.md`：`0.2.0 DONE / ACCEPTED`，`0.3.0 CURRENT / ACTIVE`；
- `docs/CURRENT_MILESTONE.md`：`0.3.0 — READY FOR EXTERNAL VISUAL CONFIRMATION`；
- `package.json`：`version = 0.3.0`；
- 当前 active plan 与 review materials均属于0.3.0。

`main@e7d929bad2d4b23939c81920e77390efbce42b96` 的 Git history和 `docs/handoffs/ACCEPTANCE_0.2.0_2026-09-13.md` 表明0.2.0已经验收并晋升，但同一 main 中：

- `docs/CURRENT_MILESTONE.md` 仍写 `0.2.0 — FINAL NATIVE ACCEPTANCE GATE`；
- `ROADMAP.md` 仍写 `0.2.0 CURRENT / ACTIVE`，并保留未完成 checklist。

当前包却只写：

```text
Planned execution branch/worktree rule: develop
Final candidate: one develop candidate commit containing authority freeze + stale-doc repair
```

它没有说明 main 上两份 stale 文档怎样被修复、supersede 或被 branch-aware authority 排除，也没有说明是否允许对 main 做独立 docs-only correction。正常 Bobbio policy 又规定 ongoing implementation 在 develop，main 只接收已接受里程碑，不能由 Executor自行改分支策略。

### causal risk

Codex可能只在 develop 新增 authority 文档并宣称“冲突已恢复”，但任何从 main 启动的普通任务仍会读取 stale `CURRENT_MILESTONE.md`/ROADMAP；也可能擅自修改或合并 main，越过 Bobbio 的 branch/promotion 权限。反过来，若为了避免 main mutation 而把 main stale 文件完全忽略，也没有 durable supersession 证据。

### minimum closure

Planner/Bobbio project owner 更新包并明确选择一种合法拓扑：

1. **推荐**：在 develop 冻结 branch-aware canonical authority artifact，同时定义 main stale locators 的明确 historical/superseded 语义；另列一个准确、经授权的 main docs-only correction/promotion步骤及其完成前 claim ceiling；或
2. 若本任务被明确授权同时修复 main 与 develop，冻结两个 branch 的独立 commit/审查顺序、禁止产品代码变化，并说明为什么不违反 main=accepted milestone 的规则。

无论采用哪条，都要逐分支列出：当前事实、修改文件、保持不变的 acceptance records、最终 locator、完成前后 resolver 预期，以及哪一步才允许说 recovery complete。

### unique owner

Bobbio project owner / Package Planner

## DA-ER-08-F02 — CANONICAL_LOCATOR_AND_NORMAL_ENTRY_UNSPECIFIED

### requirement

authority recovery 的核心交付物、解析入口和回归必须有 exact path、schema/字段、命令和 evidence location。`project-appropriate docs path` 与“deterministic regression”不足以构成 execution-ready normal entry。

### direct evidence

当前包允许：

```text
BOBBIO_MILESTONE_AUTHORITY.md (new canonical authority artifact in project-appropriate docs path)
CURRENT_MILESTONE.md / ROADMAP only where stale semantics require repair/supersession
deterministic authority-resolution regression
```

但没有冻结：

- canonical artifact 的 repo-relative path；
- main/develop/release 每个字段的 schema 和 source locator；
- supersedes 记录怎样表达；
- resolver/regression 的脚本路径、测试路径和执行命令；
- pre-repair conflict fixture 与 post-repair branch cases；
- normal task/未来 Bobbio adapter 从哪个入口消费该 artifact；
- result/evidence 保存路径。

现有 Bobbio `pnpm validate` 已有大量 milestone transition 检查，但包没有判断是扩展现有脚本还是新增哪一个 focused command。

### causal risk

Executor可能把 authority 文件放在不同目录、写成仅供人阅读的说明，或创建一个只验证关键词的测试。后续 adapter仍要重新猜 locator和字段，main/develop切换也无法机械使旧结果失效。删除 stale 文件还可能被当成修复，却没有留下 supersession记录。

### minimum closure

修订包至少冻结：

1. exact canonical path，例如由 Bobbio owner确认的 `docs/BOBBIO_MILESTONE_AUTHORITY.md`；
2. 字段级 authority contract：branch identity、current implementation milestone、package/runtime version、historical acceptance、promotion authority、current claim ceiling、canonical locators、supersedes和content digest；
3. exact implementation/test files和 command，例如扩展哪一个现有 validator，或新增哪个 `scripts/validate-...mjs` 与对应 `pnpm` script；
4. 五个 Gate 的具体输入 fixture、输出 token和 durable evidence路径；
5. normal Bobbio task与未来 adapter只通过该 locator消费，不以mtime、文件长度或package version代替 acceptance；
6. locator-only move的机械更新路径和semantic conflict返回 project owner 的实际负例。

### unique owner

Bobbio project owner / Package Planner

# 已接受的设计部分

以下内容无需推翻：

- 0.2 accepted evidence只能作为0.3 should-not-change或明确相同目标的原始证据，不能完成0.3新能力；
- main/develop/release必须分开解析；
- mtime、文件“更新”、package version均不能单独成为权威；
- 删除 stale 文件不能代替 supersession；
- locator-only movement可由同任务机械修复；
- semantic conflict必须返回 Bobbio project owner；
- 本任务不实现 DA adapter、不改变 Reader/Zotero产品语义、不运行 native acceptance；
- BOB-R1–R5 的风险类别正确。

# 审查边界

本次 `REVISE` 不否定 recovery 必要性。关闭两个定位问题后，该任务仍应保持小型、文档与确定性回归为主，不扩大成 Bobbio 产品开发或 consumer adapter任务。

```text
NEXT_HANDOFF=PLANNER
CODEX_IMPLEMENTATION_AUTHORIZED=NO
USER_KICKOFF_AUTHORIZED=NO
```
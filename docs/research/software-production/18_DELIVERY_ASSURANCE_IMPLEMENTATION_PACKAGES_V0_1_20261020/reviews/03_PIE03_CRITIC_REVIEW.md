target_repo=YuukiAS/AI_Skills_Collection
task_key=project-instructions-editor--0.3-agents-authority-maintenance
reviewed_package=docs/research/software-production/18_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_1_20261020/03_PIE03.md
package_set_commit=f977aa997d405a297f6bcef335c2399c7ef8cae7
da1_freeze_commit=e278a3bab0949eac8a6f7df4007066da6eae7bd6
da1_sha256=8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b
source_ref_reviewed=272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3
review_stage=EXECUTION_READY
decision=REVISE
READY_FOR_CODEX=NO

# 结论

PIE 0.3 的方向合理，当前仓库也已经形成了比 Delivery Assurance 依赖说明更完整的正式架构提案。但该提案仍明确处于架构 Critic 待审状态，并规定只有设计阶段 `PROCEED` 后才准备 Plan、Goal、Kickoff 和 execution-ready package。当前包直接跳到了 execution-ready，且允许修改面没有包含提案已冻结的新合同文件和若干生产身份变化。现在给 PASS 会让 Codex在尚未批准的产品语义上自行补设计。

## DA-ER-03-F01 — ARCHITECTURE_REVIEW_AND_EXECUTION_PACKAGE_SEQUENCE_SKIPPED

### requirement

新 standalone Skill 模式、触发边界、作用域模型、managed-region 规则、两端分发和真实 consumer Gate 属于正式产品架构。必须先完成独立架构 Critic 的 `PROCEED`，再由 Planner 基于获准版本形成完整 Plan/Goal/Kickoff，最后才能做本次 execution-ready 审查。

### direct evidence

AI_Skills_Collection 当前 `main@272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3` 已存在：

```text
docs/design/project-instructions-editor/
PROJECT_INSTRUCTIONS_EDITOR_0_3_AGENTS_ARCHITECTURE_PROPOSAL_V0_1_2026-10-20.md
```

其状态为：

```text
DRAFT_FOR_ARCHITECTURE_CRITIC_REVIEW
review_stage=ARCHITECTURE_REVIEW
execution_branch/worktree=NOT_FROZEN
```

提案明确写明：架构审查 `PROCEED` 后，Planner 才准备 implementation Plan/Goal/Kickoff 和最终 execution-ready 审查；当前提案不授权修改 Skill source、wrapper、Bridge、Delivery Assurance 或 consumer AGENTS。当前仓库没有该提案的架构 Critic review artifact，也没有获准后的同版 execution Plan/Goal/Kickoff。

当前 Package 03 只绑定 da/1 与 Delivery Assurance 需求，没有绑定一个已获独立架构结论的 PIE 0.3 Proposal。

### causal risk

Codex 将不得不自行裁决：

- `AGENTS.override.md` 与 fallback instruction files 的正式范围；
- active instruction chain、shadowing 与预算模型；
- ChatGPT wrapper 与 Codex implicit normal entry 的产品承诺；
- managed/generated region 的保护边界；
- runtime consumption failure 与内容维护失败如何分流；
- central implementation 与 Asteria/SeminarArc consumer adaptation 的边界。

这些决定一旦在实现中形成，测试会反向固化未经 Critic 批准的架构。

### minimum closure

1. 由独立 PIE Critic 审查当前 0.3 架构提案，只给 `PROCEED/REVISE`；
2. 若 `PROCEED`，Planner 基于获准 proposal commit 形成同版 implementation Plan、Canonical Goal、Kickoff Draft 和完整 Capability Gate Matrix；
3. 修订 Package 03，绑定获准 proposal/review/Plan/Goal/Kickoff 的 exact path + commit；
4. 再提交 execution-ready Critic，不能沿用本次结论自动通过。

### unique owner

PIE 0.3 Planner

## DA-ER-03-F02 — PACKAGE_SCOPE_DIVERGES_FROM_CURRENT_PIE03_DESIGN

### requirement

execution-ready package 必须完整落实获准架构的 production source、metadata、测试、版本和生成/安装身份，不能遗漏核心合同文件或把发行决定留成泛化的“generated outputs”。

### direct evidence

当前 0.3 架构提案把最小 production source 冻结为：

```text
skills/core/codex-system/project-instructions-editor/
├── SKILL.md
├── agents/openai.yaml
├── references/editor-contract.md
├── references/repository-agents-contract.md        # new
├── evals/trigger_queries.json
└── assets/app-facing.svg
```

并明确要求：

- standalone skill version `0.2 -> 0.3`；
- `writes_files: false -> true`；
- `allow_implicit_invocation: true` 保持；
- Project-setting mode保持0.2合同；
- repo mode覆盖 `AGENTS.md`、`AGENTS.override.md`、作用域遮蔽、managed regions、任务级 authority map、coverage report 和真实两端入口；
- version、registry/catalog/provenance、私人 wrapper 与 installed standalone skill identity 必须闭合。

当前 Package 03 的允许面没有列出新的 `references/repository-agents-contract.md`，没有冻结 frontmatter/standalone version、wrapper/安装身份或生成配置，只泛化写：

```text
README.md / CHANGELOG.md / generated registry-catalog-provenance
```

它还没有使用 `workflow-core + ai-skills-core + target standalone skill` 的中央维护闭环。

### causal risk

即使跳过前一 blocker，Executor 仍可能把 repo 合同继续堆进 `SKILL.md`、忘记将 `writes_files` 改为真实值、只更新 source 而未更新 ChatGPT wrapper/installed skill，或让 0.3 normal entry 与 0.2 的发布身份不一致。局部测试通过不能证明两个用户入口消费的是同一候选。

### minimum closure

在架构审查完成后，修订包至少冻结：

1. 提案获准后的完整 source file list，包括 `repository-agents-contract.md`；
2. exact standalone version、frontmatter 和 `agents/openai.yaml` 变化；
3. 0.2 regression bank、0.3 fixture/mutation、ChatGPT explicit entry、Codex fresh-session implicit entry和两个真实 repo isolated-worktree Gate；
4. `ai-skills-core` 维护伴随入口、version/registry/catalog/provenance、私人 wrapper/standalone installation parity；
5. README 更新或 `README checked: no update required`，以及 central complete→ADAPTING 的 consumer identity集合和收口边界。

### unique owner

PIE 0.3 Planner / AI Skills maintenance owner

# 已接受的设计部分

当前包和提案中以下方向无需推翻：

- 继续使用同一个 `project-instructions-editor` slug，不新建第二技能或中央 Plugin；
- 0.2 Project-setting 行为完整保留；
- exact root/nested/ABSENT baseline，禁止从 Memory 或旧聊天重建；
- 项目/领域 owner 保留产品和科学语义；
- authority conflict fail closed；
- bounded edit、preview、clean candidate、authority map、coverage report；
- nested 不能未经授权削弱权限、安全、证据、领域最低标准和 required Gate；
- managed/generated region 不由 PIE 改写；
- 不建立 registry、database、watcher、daemon或同步服务；
- Asteria 与 SeminarArc 作为结构差异明显的真实 Gate 候选是合理的。

# 审查边界

本次 `REVISE` 是治理顺序和执行包完整性问题，不是对 PIE 0.3 产品方向的否决。

```text
NEXT_HANDOFF=PLANNER
NEXT_REQUIRED_REVIEW=ARCHITECTURE_CRITIC
CODEX_IMPLEMENTATION_AUTHORIZED=NO
USER_KICKOFF_AUTHORIZED=NO
```
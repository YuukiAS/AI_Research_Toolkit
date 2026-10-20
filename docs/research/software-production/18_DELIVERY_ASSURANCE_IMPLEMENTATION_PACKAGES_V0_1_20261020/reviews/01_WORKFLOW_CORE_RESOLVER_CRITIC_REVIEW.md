target_repo=YuukiAS/AI_Skills_Collection
task_key=workflow-core--delivery-assurance-resolver
reviewed_package=docs/research/software-production/18_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_1_20261020/01_WORKFLOW_CORE_RESOLVER.md
package_set_commit=f977aa997d405a297f6bcef335c2399c7ef8cae7
da1_freeze_commit=e278a3bab0949eac8a6f7df4007066da6eae7bd6
da1_sha256=8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b
source_ref_reviewed=272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3
review_stage=EXECUTION_READY
decision=REVISE
READY_FOR_CODEX=NO

# 结论

当前包的产品边界、da/1 绑定、验收范围和失败恢复方向基本正确，但还不能交给 Codex。两个阻塞项都位于 AI_Skills_Collection 的真实维护入口：包把正式实现写入生成层，并把版本、生成、发布收口和维护伴随能力留成“需要时再做”。这会让 Executor 必须自行决定仓库的源码权威和发行范围，也可能得到一个在当前工作树可运行、下一次 Marketplace 生成后却消失的实现。

## DA-ER-01-F01 — CANONICAL_SOURCE_AND_GENERATED_PARITY

### requirement

正式中央插件行为修改必须从 canonical source 实施，再通过仓库现有生成器产生 Marketplace/plugin payload；生成层不能成为手工维护的能力真值源。执行包必须冻结准确源码面、生成路径和同一最终候选的 source/generated/installed identity。

### direct evidence

当前仓库明确规定：`skills/` 与 `profiles/` 是源码层，`.agents/plugins/marketplace.json` 和 `plugins/codex/plugins/` 是生成层。workflow-core 的 canonical skill 位于：

```text
skills/core/codex-system/codex-workflow-protocol/
```

正式生成物位于：

```text
plugins/codex/plugins/workflow-core/
```

但当前包的允许实现面只列出：

```text
plugins/codex/plugins/workflow-core/skills/workflow/SKILL.md
plugins/codex/plugins/workflow-core/skills/workflow/references/delivery-assurance-da1.md
plugins/codex/plugins/workflow-core/skills/workflow/scripts/da_resolver.py
plugins/codex/plugins/workflow-core/skills/workflow/assets/da1/
```

没有列出 canonical source、Marketplace 生成配置或生成器变更。

### causal risk

Codex 可以直接修改生成 payload 并让局部测试通过，但下一次 `build_codex_marketplace.py --write` 会覆盖这些变更；或者 source 与生成插件产生不同 Resolver 语义。最终 normal-entry evidence 将无法证明被发布和安装的 workflow-core 与审查过的源码一致。

### minimum closure

Planner 修订包并冻结：

1. `codex-workflow-protocol` canonical source 下准确新增/修改的 `SKILL.md`、reference、script、asset、agent/eval 文件；
2. support file 如何由现有 Marketplace generator 复制到 `plugins/codex/plugins/workflow-core/`；如生成器当前不支持该文件类型，列出准确的 generator/config 修改面；
3. 必跑的 source→generated parity、幂等生成、路径预算和 installed-plugin normal-entry Gate；
4. 禁止直接手改 generated payload，生成物只能由 canonical generator 产生并提交。

### unique owner

Package Planner / workflow-core maintenance owner

## DA-ER-01-F02 — MAINTENANCE_AND_RELEASE_CLOSURE_NOT_FROZEN

### requirement

中央 production plugin refinement 必须同时消费 `workflow-core + ai-skills-core + target plugin` 的维护合同，并在执行包中冻结版本、CHANGELOG、README 检查、registry/catalog/provenance、Marketplace 生成和正式 release/adaptation 边界。不能把这些决定留给 Executor 的“when required”。

### direct evidence

AI_Skills_Collection 当前 `AGENTS.md` 要求任何改变中央插件正式行为的任务使用 `workflow-core`、`ai-skills-core` 和目标领域插件/Skill。当前 workflow-core production version 为 `0.5`。本包会新增正式 Resolver、脚本、结果与 claim aggregation，却只写：

```text
README.md / CHANGELOG.md / generated registry-catalog-provenance when required
```

包没有冻结：

- 是否以及如何将 workflow-core 从 `0.5` 提升到下一版本；
- `scripts/codex_marketplace_config.json`、plugin manifest、registry/catalog/provenance 的准确修改面；
- README 是更新还是记录 `README checked: no update required`；
- AI Skills Maintainer 的 `Update impact`、安装后 fresh-session consumption 和 tracking #107 的收口责任；
- `ai-skills-core` 在本次维护中的明确入口。

### causal risk

Executor 可能实现用户可见 production behavior 却不更新版本或生成清单，也可能把中央实现 PASS 误当成正式安装与下游消费完成。不同机器继续加载旧 workflow-core 时，包仍可能被报告为完成。

### minimum closure

Planner 在包中冻结：

1. 精确的目标 plugin version 与版本源修改；
2. `ai-skills-core` 维护伴随入口和 required closure checklist；
3. CHANGELOG、README 检查结果、Marketplace/config、registry/catalog/provenance 与 generated parity 的准确文件和命令；
4. central implementation、formal release、installed identity、fresh session 和 managed adaptation 的分层完成边界；
5. Issue #107 / Maintenance Board 在 implementation review、release 和 ADAPTING 阶段的准确 next action。

### unique owner

Package Planner / AI Skills maintenance owner

# 已接受的设计部分

以下内容无需重做：

- da/1 freeze commit 与 SHA-256 绑定正确；
- `unknown` 不能进入 `NONE`；
- `NONE/TARGETED/BROAD/FULL` 不按 Gate 数量选择；
- 标准缺失返回项目/领域 owner，Resolver 不发明专业标准；
- 高层 `UNKNOWN` 不抹去已证明的低层结果；
- WC-G1–WC-G7 覆盖正常入口、危险负例、W1–W5、最小权限和 Human Gate；
- 同范围实现/validator 缺陷留在原任务，接口或 owner 语义变化返回 Planner。

# 审查边界

本次 `REVISE` 不否定 workflow-core Resolver 架构，也不要求重新冻结 da/1。关闭上述两项后，可对修订后的同一 package 做 execution-ready 复审。

```text
NEXT_HANDOFF=PLANNER
CODEX_IMPLEMENTATION_AUTHORIZED=NO
USER_KICKOFF_AUTHORIZED=NO
```
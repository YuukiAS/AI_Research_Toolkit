target_repo=YuukiAS/AI_Skills_Collection
task_key=domain-descriptors--delivery-assurance-da1
reviewed_package=docs/research/software-production/18_DELIVERY_ASSURANCE_IMPLEMENTATION_PACKAGES_V0_1_20261020/04_DOMAIN_DESCRIPTORS.md
package_set_commit=f977aa997d405a297f6bcef335c2399c7ef8cae7
da1_freeze_commit=e278a3bab0949eac8a6f7df4007066da6eae7bd6
da1_sha256=8d98b4b3744cc198514becba22173ff80115e247bafe28cd0d87e101e2e12b1b
source_ref_reviewed=272f5cd1b3599acb0c5b95ef57ce00a0cf1b0ac3
review_stage=EXECUTION_READY
decision=REVISE
READY_FOR_CODEX=NO

# 结论

当前包正确坚持“descriptor 只投影现有专业权威，不创造新标准”，也正确把专业判断留给现有 domain skill。但执行包没有真正做到这一点：四个 `gates.toml` 被安排直接写入生成插件目录，没有 canonical source/generator 设计；同时包只给出四个宽泛能力标题，没有冻结每个 descriptor 的 exact gate_ref、权威来源、正常入口、证据和声明边界。对当前 production sources 实际核对后，至少 scientific-visualization 与 statistical-modeling 的拟议表述已经跨出了现有合同，Codex 必须自行决定哪些语义应中央化。该包不能执行。

## DA-ER-04-F01 — DESCRIPTORS_TARGET_GENERATED_PAYLOAD_WITHOUT_CANONICAL_SOURCE

### requirement

中央插件 support files 必须从 AI_Skills_Collection 的 canonical source 和现有 generator 产生。执行包必须冻结 source path、生成规则、四个 plugin 的版本和 source→generated→installed parity，不能直接把 `plugins/codex/plugins/` 当源码层。

### direct evidence

仓库当前正式规则明确：

```text
skills/ and profiles/ = source layer
.agents/plugins/marketplace.json = generated manifest
plugins/codex/plugins/ = generated plugin payload
```

当前 Package 04 只允许新增：

```text
plugins/codex/plugins/web-development/delivery-assurance/gates.toml
plugins/codex/plugins/scientific-visualization/delivery-assurance/gates.toml
plugins/codex/plugins/statistical-modeling/delivery-assurance/gates.toml
plugins/codex/plugins/medical-imaging/delivery-assurance/gates.toml
```

并模糊写 `generator/catalog/provenance outputs if package support files require them`。包没有规定四份 descriptor 的 canonical source 位于哪里，也没有规定 `build_codex_marketplace.py`、`scripts/codex_marketplace_config.json` 或其他 generator 怎样把 support files复制进自包含插件。

### causal risk

Codex 可以手改四个 generated payload 并通过测试，但下一次 Marketplace 生成会删除或覆盖 descriptor。反向地，某些插件可能只在 source tree 有 descriptor、正式安装包没有。workflow-core 的 normal discovery 会因此在开发候选和安装候选上得到不同能力集。

### minimum closure

Planner 修订包并冻结：

1. 四个插件各自的 canonical descriptor source path；
2. support file 进入 generated plugin payload 的准确 generator/config 实现面；
3. source descriptor、generated file、plugin manifest/version、Marketplace manifest、registry/catalog/provenance 的完整一致性；
4. 幂等生成、Windows path budget、installed/enabled discovery 和 fresh-session normal-entry Gate；
5. 禁止手改 generated `gates.toml`。

### unique owner

Package Planner / AI Skills Maintainer

## DA-ER-04-F02 — PROFESSIONAL_DESCRIPTOR_SEMANTICS_NOT_FROZEN

### requirement

每个 descriptor 必须只是现有专业合同的可追溯投影。execution-ready package 应逐项冻结 `gate_ref`、professional owner、`authority_contract_ref`、capability、applicability、normal entry、subject/target、evidence requirements、PASS/FAIL/UNKNOWN、claim support、known-bad、should-not-change 与 invalidation。若当前 domain source 不足，先返回对应 domain Planner，不能让 Executor补语义。

### direct evidence

当前包只有以下宽泛标题：

```text
DD-G1_WEB
DD-G2_SCIVIS
DD-G3_STATS
DD-G4_MEDIMG
```

没有给出任何待写入 `gates.toml` 的具体 descriptor 列表或字段投影。

对 current production sources 的核对结果是：

- Frontend Design 当前 `frontend-visual-systems` 已明确拥有 design authority/state coverage、design-system coherence、actual-surface convergence、producer admission 与 interaction reachability，可以形成可追溯 descriptor。
- Scientific Visualization 当前 `scientific-figure-qa` 的正式范围主要是 publication figure 的颜色可访问性、排版、统计视觉完整性和导出质量；它没有冻结 Asteria 交互式 scientific graph 的科学真值、图谱关系、DOM/SVG geometry 或 whole-product inspector state。包中的“scientific graph truth/readability/rendered observation”会把项目/Frontend/科学 owner 的多种职责合并成一个中央标准。
- Statistical Modeling 当前 `statistical-analysis` 确实覆盖 estimand、study design、assumption、sensitivity、effect size、uncertainty 和 intended-scale completion；但“CARE job receipt 不能代签科学结论”同时属于 workflow/CARE controller/medical-imaging/project adequacy 边界，不是现有 statistical-modeling source 单独拥有的通用 Gate。
- Medical Imaging 当前 `medical-imaging-deep-learning` 已有 model/config/split/checkpoint/prediction/metric/same-split baseline、mechanism completeness、scale和 shallow-substitution 禁令，能够投影一部分通用 descriptor；项目专属标签、阈值和 route promotion 仍必须留在 CARE。

### causal risk

Executor 必须自行决定：

- Asteria graph truth 应归 scientific-visualization、Frontend Design 还是项目 gate；
- CARE 的 operational/scientific boundary 应由 statistical-modeling、medical-imaging、workflow-core 还是项目 controller 拥有；
- 一个 descriptor 应包含几种独立 failure semantics；
- 哪些现有 skill 文本是正式 PASS/UNKNOWN 标准，哪些只是一般指导。

这会造成两个 professional owner 被合并、项目规则泄漏中央层，或 descriptor 只指向 helper/文件存在而没有真实专业 normal entry。

### minimum closure

Planner 与四个 domain owner 形成一份逐 descriptor 的冻结矩阵。每一项至少写明：

```text
gate_ref
source plugin / source skill
authority_contract_ref + exact source digest
professional owner
capability and distinct failure semantics
applicability
normal_entry
subject_types / target_roles
evidence modality / fidelity / observer
PASS / FAIL / UNKNOWN
claim_support
regression_bank / known_bad / should_not_change
invalidation
```

其中：

1. 不能由现有 source 直接支持的 Asteria/CARE 语义保持 project-local，或先进入对应 domain Planner 的独立设计审查；
2. Frontend、scientific-visualization、statistics、medical-imaging 的判断结果保持独立，不能聚合成一个 generic professional PASS；
3. 每个 descriptor 至少绑定一个真实 source-owned normal entry 和一个缺证据 `UNKNOWN` 反例；
4. 生成包存在只能证明 discovery，不能证明专业 PASS。

### unique owner

Package Planner coordinating the four domain owners

## DA-ER-04-F03 — FOUR_PLUGIN_RELEASE_AND_FINAL_CANDIDATE_BOUNDARY_UNRESOLVED

### requirement

跨插件 production behavior 修改必须为每个 plugin 冻结 target version、target-domain maintenance companion、Capability Gate、same-final-candidate identity 和 release/adaptation closure。一个总包不能用一个总体 PASS 代签四个独立插件。

### direct evidence

当前包使用一个 task key、一个 execution branch 和一个总体 completion state，同时写：

```text
每个 domain plugin 独立 final candidate/版本；
此包只在同一 AI_Skills candidate 中生成兼容 descriptors；
release时各plugin独立验收。
```

但包没有列出四个 plugin 的当前版本、目标版本、各自 source/manifest/generated identity、独立 Gate result、README/CHANGELOG 决定或 formal release/adaptation 条件，也没有明确 `workflow-core + ai-skills-core + each target domain plugin` 的四套维护伴随关系。

### causal risk

其中三个插件可通过、一个插件仍在发明标准或生成失败时，总包仍可能写 `PACKAGE_GATES=PASS`。一次 AI_Skills commit 的存在会被误当成四个 installed plugin 都已正常消费，central completion也可能越级代签 consumer adaptation。

### minimum closure

可以保留一个协调索引，但执行和审查必须拆成四个可独立失败的 domain subpackages，或在本包内冻结等价的四套独立 section，并明确：

- 每个 plugin 的 current/target version、source、generated 和 installed identity；
- 各自独立 final candidate Gate 与 decision；
- 任何一个失败时不得给该 plugin PASS，也不得用其他 plugin 的 evidence补签；
- 每个 plugin 的 README/CHANGELOG/release/Update impact/adaptation closure；
- 总包最多报告协调完成，不能成为四个专业能力的单一质量判断。

### unique owner

Package Planner / AI Skills maintenance owner

# 已接受的设计部分

以下方向无需推翻：

- da/1 freeze identity正确；
- descriptor 只由 installed/enabled package root发现；
- descriptor existence不等于专业 PASS；
- 项目路径、阈值、路线晋升和私有数据语义不得进入中央描述；
- 专业判断仍由 domain skill/QA normal entry执行；
- missing or disabled plugin保持缺失/未知，不能静默跳过；
- 不新增 registry、database、daemon、watcher、workflow或状态机。

# 审查边界

本次 `REVISE` 不否定 da/1 descriptor 机制。阻塞点是 canonical production path、专业投影内容和四插件独立完成边界尚未冻结。

```text
NEXT_HANDOFF=PLANNER
CODEX_IMPLEMENTATION_AUTHORIZED=NO
USER_KICKOFF_AUTHORIZED=NO
```
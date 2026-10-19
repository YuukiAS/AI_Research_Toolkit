# Delivery Assurance：AGENTS 生命周期与 Project Instructions Editor 0.3 需求

Status: **PLANNER CONTRACT INPUT / NOT IMPLEMENTATION AUTHORIZATION**  
Date: 2026-10-19  
Design topic: `software-production--delivery-assurance`  
Dependent capability: standalone Skill `project-instructions-editor`  
Proposed PIE task key: `project-instructions-editor--0.3-agents-authority-maintenance`

## 1. 一句话结论：谁负责整理 AGENTS

**项目 owner 决定 AGENTS 必须表达哪些长期语义；当前任务 Executor 负责在触发条件出现时调用 Project Instructions Editor 0.3 整理并提交；PIE 0.3 负责机械地读取当前 AGENTS、权威来源和历史决定，生成可审 diff 与完整新版本；`workflow-core` 决定本任务是否必须更新 AGENTS；Bridge 只验证实际加载的 AGENTS/mandatory source 身份，不写内容；AI Skills Maintainer 负责 PIE 0.3 的中央实现、发布和下游适配。**

用户不负责维护 AGENTS 清单，也不需要提醒 Codex“顺便整理规则”。

## 2. 为什么这不是一个附带小问题

七个真实仓库已经反复暴露以下失败：

- 规则已经写在某处，但正常入口没有读取；
- root AGENTS、nested AGENTS、task prompt、roadmap 和验收文档互相漂移；
- 同一规则被复制多次，后来只改了一份；
- 最新局部要求压过原有长期规则，AGENTS 越写越长；
- 过期路径或旧 milestone 继续被当作当前 authority；
- Executor 用修改后的规则证明自己的实现通过；
- 项目已有专业 validator，但 AGENTS 没有把普通任务路由到它；
- 为了“统一”把项目专属语义复制进中央 Bridge/workflow-core。

因此，AGENTS 不是普通 README 文案，也不是 Bridge 的 runtime state。它是项目正常入口的**稳定路由与权威定位层**。Delivery Assurance 必须冻结谁维护、什么时候维护、允许写什么和怎样证明没有漏规则。

## 3. 唯一职责矩阵

| 能力 | 语义 authority | 实际 actor | 禁止事项 |
|---|---|---|---|
| 确定项目长期产品/科研规则 | project owner | 项目 Planner / 已批准合同 | PIE、Executor、Bridge 不发明产品语义 |
| 判断本任务是否触发 AGENTS 更新 | `workflow-core` | Resolver | 不因每个小任务都重写 AGENTS |
| 生成/更新/压缩/同步 AGENTS | project owner 拥有语义；PIE 0.3 拥有编辑合同 | 当前 Executor 调用 PIE 0.3 | Executor 不手工删规则换 PASS；PIE 不改专业标准 |
| 验证 mandatory source/实际加载身份 | Bridge | Bridge normal entry | Bridge 不写 AGENTS、不决定专业内容 |
| PIE 0.3 中央能力发布 | AI Skills Maintainer | AI Skills implementation/release lane | Maintainer 不替项目决定规则 |
| root/nested AGENTS 的最终提交 | project owner | 当前 repo Executor | 用户不手工维护；不创建中央 AGENTS registry |

## 4. AGENTS 应该保存什么

AGENTS 只保存未来任务在**开始行动前必须知道**的稳定内容：

1. 正常任务入口与必读 locator；
2. 项目/领域/Bridge/用户的 authority 边界；
3. permission、safety、privacy、distribution 和高影响操作边界；
4. project adapter、验收入口、长期任务 owner 的稳定 locator；
5. 哪些动作必须先读哪个 canonical contract；
6. 当前项目的 durable should-not-change；
7. nested scope 的适用范围和优先关系。

AGENTS 不应复制：

- 详细 Gate rubric、所有 fixture、全部历史失败；
- 当前 task 状态、review round、临时 branch、run id；
- 会频繁变化的版本矩阵、consumer inventory；
- README/ROADMAP/Plan 的整段内容；
- 可以在执行时按 locator 读取的长 SOP；
- 用户已经删除或否定的旧规则。

详细标准继续留在 canonical project/domain contracts；AGENTS 只留下必须在 lookup 前生效的短规则与 locator。

## 5. 什么时候必须整理 AGENTS

`workflow-core` 在以下任一触发条件出现时，把 `AGENTS_MAINTENANCE_REQUIRED=true` 写入当前任务 resolution；Executor 在同一任务调用 PIE 0.3：

1. 新 repo 首次启用 Delivery Assurance；
2. root/nested AGENTS 缺失，而任务需要项目长期路由或权限边界；
3. canonical authority、normal entry、adapter、Gate family、claim ceiling 或 long-run owner 发生语义变化；
4. 文件/目录重组导致 locator 移动；
5. root 与 nested AGENTS、项目合同或 adapter 出现冲突；
6. 某次真实失败证明“规则已存在但正常入口没有消费”；
7. AGENTS 超出项目预算、重复规则、复制大量细节或 latest-request dominance；
8. AI Skills/Bridge 正式 Update impact 明确要求 consumer instruction adaptation；
9. 项目 owner 明确要求压缩、同步、重组或 reset。

以下情况不触发：

- 普通局部 bug fix，现有 locator 和 authority 未变化；
- 只新增一个回归样本；
- docs/result/receipt 变化但长期入口不变；
- 为了“更整齐”做无语义收益的重排。

## 6. PIE 0.3 必须新增的能力

PIE 0.2 只编辑 ChatGPT Project setting，并要求完整 live baseline。PIE 0.3 需要新增一个**repo AGENTS mode**，但仍是同一个 standalone Skill，不建立服务或数据库。

### 6.1 输入

repo AGENTS mode 的必需输入：

- exact repo / branch / worktree；
- root AGENTS 当前全文，缺失时明确 `ABSENT`；
- 受影响目录中的 nested AGENTS 全文；
- project adapter；
- canonical authority set；
- 本次 frozen Goal/Plan 中与长期规则有关的变化；
- relevant accepted/deleted/rejected history；
- instruction budget / headroom；
- current Bridge mandatory-source locator。

PIE 不从 Memory、旧聊天或模型推测当前 AGENTS。

### 6.2 输出

一次真实修改必须同时输出：

1. `AGENTS_CHANGE_PREVIEW.md`：可读 diff；
2. 完整 clean AGENTS 候选；
3. `AGENTS_AUTHORITY_MAP.md`：每条长期规则的 canonical owner/locator；
4. `AGENTS_COVERAGE_REPORT.md`：本次触发条件、保留/迁移/删除规则、未解决冲突；
5. path/authority content digests；
6. no-op 时给出 no-op 理由，不制造假 diff。

这些是任务 evidence，不是中央 registry。

### 6.3 编辑规则

- bounded edit 优先；只有跨范围冲突、系统性复制、预算不可能或显著 authority drift 才全量重组；
- root AGENTS 保存全仓 durable rule；nested AGENTS 只保存该子树真正不同的规则；
- 相同规则提升到最近共同 ancestor，不在多个文件复制；
- nested AGENTS 不能削弱 root 的安全、权限、证据或领域最低标准；
- canonical locator 移动时更新 locator，保留语义；
- canonical 语义发生冲突时停止，返回 project/domain owner，不由 PIE 选择“更严格”或“更新的”一份；
- 用户明确删除/否定且未被当前 authority 重新采用的规则不得复活；
- exact machine string 保留，普通说明自然中文化；
- 不把 task-specific Gate 清单写进 AGENTS。

## 7. AGENTS authority set 与失效

每个 consumer adapter 增加：

```text
agents_authority_set[]:
  scope_root
  agents_path | ABSENT
  canonical_contract_refs[]
  authority_ref
  branch_or_release_scope
  content_digest
  supersedes[]
  effective_from
```

`agents_authority_set_digest` 进入 adapter semantic digest。以下变化使当前 AGENTS projection 失效：

- AGENTS 文件缺失/移动/内容语义变化；
- canonical contract digest 变化；
- nested scope 变化；
- adapter/normal entry/authority owner 变化；
- Project Instructions/Bridge Update impact 声明受影响；
- 同一字段出现两个未消解 authority。

失效时结果为 `AGENTS_STALE` 或 `INSTRUCTION_AUTHORITY_CONFLICT`，不能继续 `USER_READY`。

## 8. 防止 AGENTS 被用来逃避 Gate

Executor 不得在同一任务中通过以下方式获得 PASS：

- 删除 Gate/adapter locator；
- 把 MUST 改成 SHOULD；
- 把真实环境要求改成 fixture；
- 删除 HUMAN_ONLY 前置条件；
- 把 domain owner 改成 project/Executor；
- 删除 should-not-change；
- 把多个 authority 中最方便的一份设为唯一真值；
- 用压缩为理由去掉权限、隐私、证据强度或恢复边界。

任何上述语义变化必须有对应 authority 冻结记录，并使旧 Gate result 失效。

## 9. 必需的遗漏变异测试

每个 consumer adaptation 至少运行以下 AGENTS/adapter 变异：

1. 删除一个必需 domain Gate locator；
2. 删除一个 consumed target；
3. 把 canonical contract locator 指到旧文件；
4. 删除一个 nested AGENTS scope；
5. 将 MUST 降为可选；
6. 保留旧 accepted evidence 但提高 milestone/version；
7. 制造 root/nested authority conflict。

正常入口必须分别返回 `UNKNOWN` / `ADAPTER_STALE` / `INSTRUCTION_AUTHORITY_CONFLICT`，并拒绝 `USER_READY`。测试不得只验证 schema 字段存在。

## 10. 与七个 consumer 的关系

| Consumer | AGENTS 整理重点 |
|---|---|
| Lucerna | root 只定位 execution governance、native acceptance、install/lifecycle；不复制完整矩阵；明确 Hook 不是 Windows 安全边界 |
| Bobbio | 冻结 main/develop/release 的 milestone authority；旧 0.2.0 acceptance 不进入 0.3.0 current rule |
| Mica | 保留 real-site/manual boundary、stable `dist/mica-dev`、testing ladder；不复制每个 fixture |
| SeminarArc | root 保留 Emulator-first、physical-device safety、project skills 和 task entry；设备细节继续归 `docs/DEVICE_TESTING.md` |
| Asteria | root 保留 fixed public link、single GPT Work、visual pack、normal-entry regression；详细 Browser contract继续由 locator 管理 |
| CUHK_Date | root 保留 task/controller entry、campaign/Parent Work/launch-quality locator 和授权边界；不复制所有 persona 细节 |
| CARE | root 保留 Controller/finalizer/Slurm/scientific owner 和正式入口；科学阈值留在 overlay/Plan |

## 11. PIE 0.3 Capability Gate Matrix

| Gate | 证明能力 | 正常入口 | 正向证据 | 高风险负例 | Should-not-change |
|---|---|---|---|---|---|
| `PIE03-G1_LIVE_AGENTS_BASELINE` | 对 exact root/nested AGENTS 做编辑，不凭历史重建 | repo AGENTS edit request | current files/ABSENT + receipt | partial/stale AGENTS 被拒绝 | PIE 0.2 Project-setting baseline gate |
| `PIE03-G2_AUTHORITY_PROJECTION` | 从 canonical sources 投影短 AGENTS，不复制全合同 | first-adoption / authority change | authority map + clean candidate | stale/missing/conflicting locator fail closed | 用户拥有语义不被重写 |
| `PIE03-G3_BOUNDED_ORGANIZATION` | 去重、分层、预算控制且不丢语义 | ordinary update/compress | preview + clean final + coverage | latest request 吞掉其他 scope | protected absence / accepted deletion |
| `PIE03-G4_MONOTONICITY` | nested/project AGENTS 不削弱 domain/safety minimum | DA adoption normal entry | mutation tests reject deletion/downgrade |删 Gate/MUST/owner 后仍 USER_READY | 合法项目附加规则保留 |
| `PIE03-G5_REAL_CONSUMER` | 至少两个真实 repo 的 AGENTS 整理从正常入口有效 | Asteria + SeminarArc 或 Critic 批准替代 | exact before/after + downstream resolver | 只测 synthetic text | 原 repo normal entry 不受破坏 |

## 12. 当前边界

本文件只冻结 PIE 0.3 的 Delivery Assurance dependency，不授权修改 `project-instructions-editor` source，也不授权改七仓 AGENTS。

```text
PIE_0_3_DESIGN_INPUT_READY=YES
PIE_0_3_IMPLEMENTATION_AUTHORIZED=NO
CONSUMER_AGENTS_MUTATION_AUTHORIZED=NO
```

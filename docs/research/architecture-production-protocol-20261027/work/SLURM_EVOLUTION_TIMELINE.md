# Slurm：routing 与 protected cancellation 的两种返修链

routing 的多轮记录主要混合了新需求、设计纠错和实现回归；protected cancellation 还经历了真正的执行权、信任与运行边界迁移。两条链必须分开计算。[事件数据](BENCHMARK_DATA.json) 分别为 SR01–SR10、SC01–SC13。

## Routing：不能把用户新增范围算成 Planner 漏项

| 回合 | 发生了什么 | 分类 / 对实施的影响 |
| --- | --- | --- |
| v0.1 → v0.2 | Critic 发现 cancel/resubmit 对 JobId、dependency、RUNNING 竞态的破坏；站点未禁止并不等于授权 | DESIGN_GAP；真实机制纠错，v0.2 PASS 关闭原 blocker |
| v0.2 execution → 新范围 | 用户新增稳定资源推荐、周期 GPU capacity、persistent/interactive reusable allocation；真实队列证据改变场景 | NEW_REQUIREMENT + EXTERNAL_FACT；review 明说旧范围不变时 execution-ready，不能算原 PASS 漏审 |
| v0.3 | successor allocation 的责任/自动动作边界不足 | 新范围里的 DESIGN_GAP |
| v0.4 | 泛化为任意站点需 live discovery，不能把 site registry 当支持清单 | DESIGN_GAP；未知站点反例有价值 |
| v0.5 → v0.6 | 剩余版本/发布分类修订；设计与 execution PASS | OTHER：治理绑定，核心技术路线没有每次重做 |
| 实施后 prefinal R1 | scope/enrollment identity、earliest uncovered occurrence、installed G6、ClusterName 泄漏 | IMPLEMENTATION_BUG / EVIDENCE_GAP |
| prefinal R2 | R1 的 identity/occurrence 修复不完整 | IMPLEMENTATION_BUG；复验有信息增量 |
| prefinal R3 → R4 | timezone 未使用，再发现 DST fold/gap | 前者明确实现漏用；后者是异常时间语义与实现的混合边界，不能证明全部由初始设计导致 |
| 集成与发布 | 两次 integration review 处理版本漂移与正式 CI；最终 repo5.4.2 / skill0.3 | release identity / evidence，非新架构；记录 REAL_SLURM_MUTATION=NO |

证据：[S25](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_CRITIC_REVIEW_V0_1_2026-09-24.md)、[S26](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_CRITIC_REVIEW_V0_2_2026-09-24.md)；新增范围的明确分界 [S33:30–40](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_EXECUTION_CRITIC_REVIEW_V0_2_2026-09-24.md#L30-L40)；v0.3–v0.6 [S27](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_CRITIC_REVIEW_V0_3_2026-09-24.md)、[S28](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_CRITIC_REVIEW_V0_4_2026-09-24.md)、[S29](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_CRITIC_REVIEW_V0_5_2026-09-24.md)、[S30](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_CRITIC_REVIEW_V0_6_2026-09-24.md)、[S34](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_EXECUTION_CRITIC_REVIEW_V0_6_2026-09-24.md)。Goal、kickoff 与执行计划也已核对：[SG](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/goals/SLURM_WORKFLOWS_ROUTING_REFACTOR_GOAL_V0_6.md)、[SK](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/operations/prompts/SLURM_WORKFLOWS_ROUTING_REFACTOR_KICKOFF_V0_6.md)、[SE](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_EXECUTION_PLAN_V0_6_2026-09-24.md)。实施回合：[S75](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-workflows-routing-refactor/PREFINAL_CRITIC_REVIEW_R1_2026-10-02.md)、[S76](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-workflows-routing-refactor/PREFINAL_CRITIC_REVIEW_R2_2026-10-02.md)、[S77](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-workflows-routing-refactor/PREFINAL_CRITIC_REVIEW_R3_2026-10-02.md)、[S78](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-workflows-routing-refactor/PREFINAL_CRITIC_REVIEW_R4_2026-10-02.md)；发布：[S65](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-workflows-routing-refactor/INTEGRATION_RELEASE_CLOSURE_2026-10-03.md)、[S79](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-workflows-routing-refactor/RESULT.md)。

这条链有 6 份 proposal Critic、2 份 execution Critic、4 份 prefinal、2 份 integration、1 份 final，合计 **15 份审查文档**。这是明确口径的文档计数，不是 15 次模型调用、15 次架构错误或 15 次串行等待。四次 prefinal 之后有 Planner repair handoff，也不能把角色返回直接等同 architecture reset。

v0.6 快照已有 recurrence/timezone 字段，但不等于已经明确所有 DST 行为，更不等于实现正确。机械 schema 只能查字段，具体时间反例测试才验证算法边界。[SH2](https://github.com/YuukiAS/AI_Skills_Collection/blob/ad3e60988f5581dd0d0c194e13907baaa446c413/docs/design/slurm-workflows/SLURM_WORKFLOWS_ROUTING_REFACTOR_PROPOSAL_V0_6_2026-09-24.md)

## Protected cancellation：主要机制迁移

| 回合 | 原路线 → 现实发现 → 后续边界 | 归因 / 用户与实施 |
| --- | --- | --- |
| 10-13 cancel protection 0.3 | 任务归属/GPU/取消保护，区分决策、辅助 Hook 与真实执行权；明确 Hook process failure 可能继续 | 原始风险已经被想到。后来的漏证不应写成“此前完全未知” |
| 10-17 fresh confirmation v1 | 用户把目标收窄为 protected partition fresh confirmation，拒绝旧 Phase3 候选；尝试 PATH guard、terminal human adapter | NEW_REQUIREMENT / SCOPE_RESET，夹杂错误入口选择；旧实现候选被拒绝有记录 |
| 10-18 chat v2 | 改同根 chat 原生确认；识别 Default 空答案、headless 限制，要求先做 Phase0 probe | UX/产品修订 + EXTERNAL_FACT；不是只改命令名称 |
| chat v2 → v2.1 | persisted confirmed state 可由同 UID shell 伪造；改 host PostToolUse 执行确切动作，禁止 next-shell token | DESIGN_GAP：授权拥有者发生变化 |
| v2.1 execution PASS → Phase0 | linked worktree 的 Hook discovery 实际走 canonical/config 路径，probe FAIL；改 standalone clone | EXTERNAL_FACT；记录 PRODUCT_IMPLEMENTATION_NOT_STARTED，是早期实验成功阻止浪费的正例 |
| 后续实现候选 | shim → trusted host Hook → one global Hook；catalog、hash、fake cancellation 与测试 PASS | 审查/实现逐步落实信任，但列表注册与测试不证明实际 Hook 进程能启动并阻断 |
| 10-19 portable runtime v3 | 真实 Hook 的 Python 缺动态库，exit127；普通 process failure 不阻断原 Bash | EXTERNAL_FACT + EVIDENCE_GAP，否定了当前 enforcement 组合；需独立 runtime qualification 与有效 deny 的 supervisor |
| v3 正常入口 | old session 使用旧 Hook snapshot；同 backend fresh session 才观察到 harmless scancel 阻断 | 安装成功与当前 session 消费成功不同；入口证据补齐 |
| live fixture | CPU-only/no-GPU 被 QOSMinGRES 拒绝；站点 MinTRES 要求 GPU1 | 测试资源合同需要用户修订；不是核心 Hook 设计重置 |
| native question schema | exposed 四键、内部 normalized 六键不一致 | Planner 明确判实现 bug、Plan revision1不变；局部修复，不能算每次都回架构 |
| MCP transport | 用户明确改 trusted PreToolUse MCP + SDK stdio；首次当前 chat vertical probe 无 card/无 installed audit | 真实的用户授权机制替换；SDK smoke 与 MCP connected 都不足以证明产品路径 |
| failure isolation / binding | runtime 故障误伤普通 Bash；scope classifier、pending/root binding 修复 | failure containment 与实现边界修补；保护能力不能靠把整个 shell 都拒绝来冒充 |
| 10-20/21 acceptance | 两次 live 表单均返回 confirm 并执行精确取消；未执行 live retain；用户另行明确豁免该项，保留 native retain mapping + deterministic integration | 最终 repo5.5.2 / skill0.5 发布。豁免不是“实测通过”；不能篡改历史 KEEP_TEST=NOT_RUN |

原始与各版：[S19](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_WORKFLOWS_CANCEL_PROTECTION_PROPOSAL_V0_3_2026-10-13.md)、[S16](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_PROTECTED_PARTITION_FRESH_CONFIRMATION_PROPOSAL_V1_2026-10-17.md)、[S13](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_PROTECTED_PARTITION_CHAT_CONFIRMATION_PROPOSAL_V2_2026-10-18.md)、[S12](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_PROTECTED_PARTITION_CHAT_CONFIRMATION_PROPOSAL_V2_1_2026-10-18.md)、[S08](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_PROTECTED_PARTITION_CHAT_CONFIRMATION_EXECUTION_PLAN_V2_1_2026-10-18.md)、[S07](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_PROTECTED_CANCEL_PORTABLE_RUNTIME_PROPOSAL_V3_2026-10-19.md)。后续入口、schema、MCP、failure isolation 与真实验收：[S62](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/SESSION_AB_EVIDENCE.md)、[S52](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/NATIVE_SCHEMA_REPAIR_EVIDENCE.md)、[S51](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/MCP_VERTICAL_EVIDENCE.md)、[S53](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/P0_FAILURE_ISOLATION_EVIDENCE.md)、[S54](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/PENDING_BINDING_REPAIR_EVIDENCE.md)、[S59](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/RESULT.md)。

### 历史实现提交链

失败候选历史中，可核对 `343628c…` 首次 guard 实现，`577b160…` 改 trusted host Hooks，`da5e88…` one user/global Hook，`445380…` 替换 guard profile，`17fb148…` 记录 closure，`546043e…` 绑定 compatible Python，`1b8df2c…` 保留信任。完整 SHA/时间/提交消息在 [COMMIT_TIMELINE.json](COMMIT_TIMELINE.json)。

这不是八次独立“重新写产品”。若只看当前 main 会丢掉该失败候选；若只看这个候选 RESULT=PASS 又会误认真实取消边界已证实。该 RESULT 的取消测试主要是 fake，另外坦白记载一次 `scancel 9101` 意外真实命令，历史真实 mutation 状态 UNKNOWN；没有证据可据此声称一个真实 Job 被取消。[SF](https://github.com/YuukiAS/AI_Skills_Collection/blob/1b8df2c1f2b93de1605d571f5125cd4aaa99fd20/results/hpc--slurm-cancel-production-closure/RESULT.md)

## 动态库事件：最强反例

v3 root-cause 记录确认：nested CodeMode 路径已命中 Hook，失败点是 Hook-launched Python 找不到 `libpython3.12.so.1.0`，exit127；所用 Codex 0.160.1 的普通 Hook process failure 不是自动 deny，原 Bash 继续。因而把问题归因于“CodeMode 绕过 Hook”会修错层。[S07:36–44](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_PROTECTED_CANCEL_PORTABLE_RUNTIME_PROPOSAL_V3_2026-10-19.md#L36-L44)

失败候选 installer 的 `_python_executable` 主要检查当前 Python 版本、文件存在/可执行和路径位置；hash 后 exec 的存在性检查无法证明 app-server 清理后的运行环境能加载动态库，也无法保证 child 失败时父层产出合法 deny。[SCODE:40–65](https://github.com/YuukiAS/AI_Skills_Collection/blob/1b8df2c1f2b93de1605d571f5125cd4aaa99fd20/skills/tools/hpc/slurm-workflows/scripts/setup_protected_cancel.py#L40-L65)。v3 相应要求 runtime 选择/资格验证和配置声明层 fail-closed root。[S07:85–123](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/docs/design/slurm-workflows/SLURM_PROTECTED_CANCEL_PORTABLE_RUNTIME_PROPOSAL_V3_2026-10-19.md#L85-L123)

最关键的时间对照是：**0.3 已写出 Hook 失败可能放行的风险，后续仍出现该类失败。** 这首先是风险证据义务未闭合，而非再增加一个 Critic 是否更聪明。早期小 probe 应使用相同 Codex 版本、真实 identity、真实加载环境，注入 loader failure，观察原命令是否启动；无须取消真实 Job。它应同时测试无关安全命令仍可运行，否则“所有命令都拒绝”会伪装成保护成功。

该反事实技术上有明确靶点，但本研究没有重跑旧环境，不能宣称已证明能省去多少版本。早期 v2.1 Phase0 的真实成功拦停，提供的是相邻机制的正面经验，而非这个 loader 反事实的实测命中率。

## 为什么边界从 wrapper 移到 Hook，再移到 runtime

三个问题先后混在了同一产品里：

1. **什么需要用户决定。** 从任务归属/GPU 扩张收窄到 partition + fresh confirmation；终端确认与 chat 内确认涉及真实产品入口。
2. **谁有不可伪造的执行授权。** shell-owned token、PATH wrapper 和项目配置不能自动构成可信边界；host trust/global Hook 改变了权限来源。
3. **可信逻辑是否真的会执行。** trusted catalog、正确脚本、可执行 Python 文件都不等于真实 session 内成功加载，更不等于失败时原操作被阻断。

v3 禁止 wrapper、PATH interception、project-local Hook、terminal confirmation、next-shell token，是对前两类边界的纠正；portable runtime/supervisor 则回答第三类。后续 MCP、schema、session 与 failure isolation 又表明，“global Hook 已选择”不代表交互和故障链全部决定。

## 可局部吸收与必须返回设计的分界

- global boundary 固定后，question schema normalization、session reload 说明、pending identity 验证属于局部事实/实现修复，已有历史正例。
- runtime 崩溃能放行原操作，直接否定安全边界，不能允许 Codex 私下换机制。
- 确认 transport 的替换改变用户体验和授权路径，需要设计/用户决定；不能称为顺手修复。
- QoS 测试资源冲突改变批准的实验范围，需资源授权；不应借此重做取消架构。
- adapter、scope parser、supervisor 与 runtime 分开 owning，让局部修复不碰 routing；最新 RESULT 明确 `slurm_routing.py` 与其他项目未改，是减小影响范围的实例。[S59:78–100](https://github.com/YuukiAS/AI_Skills_Collection/blob/5d4b1432f96742646e00ad279a054359b1aec1da/results/hpc--slurm-cancel-production-closure/RESULT.md#L78-L100)

## 证据限制

真实 loader 事件依据仓库 root-cause 与相关源码；没有读取服务器私有原始日志，故标记“仓库记录的运行事实”，不是本轮复现实验。原始用户聊天、所有角色调用次数与等待时间缺失。至少有旧 Phase3、chat/global Hook 候选、portable runtime 三组实施阶段记录，但边界迁移中的代码复用与废弃比例 UNKNOWN。不得据版本号直接算作废率。


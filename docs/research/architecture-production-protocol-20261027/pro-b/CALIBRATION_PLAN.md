# 协议校准计划

## 1. 目的

当前推荐由真实案例支持，但没有经过统一前瞻对照，不能宣称已知检出率、返工降低百分比或最佳模型数。校准的目标不是训练一个复杂评分器，而是逐步回答：

- 哪些任务应在首轮增加 Work；
- 第二 Pro 何时真正改变路线；
- 哪些 external assumptions 值得 probe；
- Asteria completeness 减少了多少显性结构 finding；
- readiness challenge 是否减少实施中途设计；
- 哪些规则只增加成本。

## 2. 最小事件记录

每个复杂任务建立一条 case 记录：

```yaml
case_id:
project:
task_class: S | M | L | XL
start_commit:
raw_goal_ref:
initial_risk_flags:
  cross_repo:
  external_runtime:
  scientific_assumption:
  permission_or_safety:
  long_history:
  mutually_exclusive_routes:
first_wave:
  lead_architect:
  work_blindspot:
  second_pro:
  fact_checks:
  probes:
serial_rounds:
parallel_tasks:
user_interventions:
freeze_revision:
freeze_evidence:
readiness_result:
implementation_start_count:
design_returns:
architecture_resets:
local_revisions:
late_major_gaps:
local_bugs:
wasted_work_proxy:
final_acceptance:
notes:
```

不要求精确计时才能开始；先记录可观察事件，再逐步增加时间数据。

## 3. Finding 级记录

每个 finding 记录：

```text
finding_id
source_actor
source_type: architect | Work | second Pro | fact check | probe | readiness | implementation | final acceptance | user
found_stage
category
severity: blocks_freeze | local_revision | local_fix | nonblocking
original_evidence
was_already_in_scope
changed_core_architecture
could_asteria_catch
could_probe_catch
required_user_decision
implementation_work_invalidated
resolution
```

这能区分：

- 同一问题被多个角色重复发现；
- Work 的低价值清单；
- 第二 Pro 是否真正提出不同路线；
- probe 是否改变架构；
- late finding 是实现 bug 还是架构 gap。

## 4. 关键指标

### 4.1 用户与关键路径

- `H_user_count`：需要用户实质输入的次数；
- `H_user_minutes`：可选，用户阅读/决策时间；
- `S_serial`：必须等待的串行模型/实验轮数；
- `P_parallel_max`：首波可并行任务数；
- `T_to_freeze`：从目标冻结到 Architecture Freeze；
- `T_to_implementation_ready`；
- `T_wait_blocked_on_review`。

### 4.2 设计与返工

- `G_gap_pre_freeze`：Freeze 前重大 gap；
- `G_gap_post_freeze`：Freeze 后重大 gap；
- `D_codex`：Codex 被迫或试图作核心决定；
- `I_impl`：稳定前启动正式实施次数；
- `A_reset`：核心架构重置次数；
- `R_rework_local/global`；
- `W_waste_proxy`：被删除/废弃/降级的模块、提交或实现周数代理；
- `B_blast`：受影响组件/仓库/用户入口数量。

### 4.3 信息源质量

- Work finding precision：高影响且未重复 finding / Work findings；
- second-Pro route-change rate：触发后改变核心路线的任务比例；
- probe decision-change rate：probe 使路线、边界或 Freeze 改变的比例；
- readiness blocker rate；
- Asteria structural catch rate：第一轮 gate 抓到的显性结构缺口；
- Critic/Work drift rate：低影响或超范围 finding 比例；
- duplicate finding rate。

所有比例只在足够样本后报告区间，不先写目标数字。

## 5. 历史数据回填

先对以下案例回填事件级记录：

1. Bridge Kit 0.11.x；
2. Slurm routing；
3. Slurm protected cancellation；
4. Mica real UI evidence gap；
5. CAT-TRACE zero-slot probe；
6. STAT5060 validator architecture；
7. Delivery Assurance；
8. Presentations/STAT5060 deck recovery。

历史数据只能提供方向：提交时间不等于用户等待，代码 diff 不等于废弃工作。所有无法确认的字段标 `UNKNOWN`。

## 6. 前瞻试点

### 试点 1：M 类成熟路线

选择一个跨组件但外部事实明确的 Plugin 局部升级。

协议：一个主架构师 + Asteria + readiness challenge，不启动 Work/第二 Pro。

目标：验证轻量档不会制造不必要流程。

### 试点 2：L 类长历史

选择 Research Authoring、Presentation 或 Delivery Assurance 的独立功能片。

协议：主架构师与 Work 并行；按假设决定 fact/probe；不默认第二 Pro。

目标：测 Work precision、结构 gate 与用户介入。

### 试点 3：XL runtime

选择一个无害但真实的 Hook/server/HPC/浏览器正常入口任务。

协议：主架构师 + Work + runtime probe；存在路线竞争才第二 Pro。

目标：测 probe 是否在 Freeze 前改变路线，及 failure-path coverage。

### 试点 4：科研算法

选择 CAT-TRACE 或 DII 中一个可用小真值/模拟反例的问题。

协议：科学架构与数学/数值 probe 并行；Codex 不选算法。

目标：测科学 premise ledger 与 RETURN_TO_ARCHITECT 的效果。

## 7. retrospective blind replay

历史允许时，选择某重大问题被发现前的 snapshot：

- 冻结当时已存在的目标、TODO、源码、设计和已知事实；
- 隐藏后来 finding；
- 分别运行：
  1. 传统 Planner–Critic；
  2. 主设计 + Asteria；
  3. Work 盲区；
  4. risk selector；
  5. cold readiness；
- 观察是否在 Freeze 前提出决定性问题，以及需要多少串行轮次。

Bridge/Slurm 的本轮分析只是 retrospective，不可冒充真正盲测。后续 replay 的 prompt、snapshot 和结果必须入库。

## 8. 何时调整默认策略

### 减少 Work 默认触发

若连续足够多的 L 案例中：

- Work 高影响独有 finding 接近零；
- 大量 finding 已被 Asteria 覆盖；
- 人工综合成本显著；

则把 Work 从 L 默认降为“长历史/多场景触发”。在达到稳定样本前不设武断阈值，先报告原始计数与区间。

### 增加第二 Pro 触发

若多次 architecture reset 原因是主设计路线锚定，且 second-Pro 回放能提前提出被采用路线，则扩大到相似高 blast 类别。

### 减少第二 Pro 触发

若 second Pro 多数重复主设计，真正改变决定的是 probe 或 Work，则收紧到互斥不可逆路线。

### 调整 probe 触发

- 若高 blast assumption 经常被 probe 否定，保持或扩大；
- 若 probe 经常验证低影响事实且不改变决定，要求更严格 blast 与敏感性条件；
- 若 probe 锁定实现细节，缩小输入输出，只验证 claim。

### 调整 Asteria schema

- 反复出现的结构 finding 加入 schema/gate；
- 长期没人使用、无法改变判断的字段删除；
- 不为单次事故堆同义字段；
- 只有跨项目复发才升级为通用规则。

## 9. 基线比较方式

比较同等级任务，不按报告长度：

```text
固定 Planner–Critic
vs
动态证据路由
```

主要结局：

1. Freeze 后重大设计缺口；
2. implementation→design 返回次数；
3. 架构级 reset；
4. 用户介入；
5. 串行轮数；
6. Codex 核心决定；
7. 废弃实现代理；
8. 最终正常入口验收。

总 AI 调用作为次要成本。用户已明确愿意以更多并行计算换更少人工时间和返工。

## 10. 不应优化的代理

禁止把下列作为主要成功指标：

- 报告文件数；
- Critic PASS 数；
- requirement mapping 数；
- execution package 字数；
- fixture/测试总数；
- Asteria 对象数量；
- 参与模型数量；
- “覆盖率 100%”但未绑定真实证据。

## 11. 校准周期

建议按三个阶段：

### 前 5 个任务

- 只做事件与 finding 记录；
- 不宣称概率；
- 主要修 schema 与分类歧义。

### 6–15 个任务

- 比较任务档位与路由动作；
- 检查 Work/second Pro/probe 的独有信息；
- 调整触发器；
- 开始报告原始比例和不确定区间。

### 15 个以上且类别覆盖足够

- 才考虑更正式的经验阈值；
- 仍保留人工判断和项目特异例外；
- 不训练黑箱评分器取代可解释 selector。

样本数量不是硬科学门槛；类别多样性比总数更重要。

## 12. 推荐可能被推翻的证据

若校准显示以下任一稳定现象，应重新研究协议：

- 同等成本下，固定 Planner–Critic 明显更少 post-freeze gap/reset；
- 动态 selector 经常选错角色并增加串行轮数；
- Work finding 大量低价值且无法通过门槛改善；
- 第二 Pro 在高 blast 触发场景仍无信息增量；
- probes 多数验证无关实现细节或导致错误路线锁定；
- Asteria 维护成本持续超过返工节省；
- readiness challenge 仍让 Codex 在实施中频繁做核心决定；
- 某类科研/产品任务不能用当前 assumption/validation 模型表达。

普通用户追问或单个局部 bug不构成推翻证据。

## 13. 结论

协议从第一天就应保存可校准数据，但不等待统计完美才使用。当前历史足以否定固定串行流程作为默认；未来数据用于收紧触发器、删掉低价值字段和确定不同任务档位的最小信息集。

校准目标是让系统越来越少地“按流程叫人”，越来越准确地购买那一次最可能改变决定或避免昂贵返工的信息。

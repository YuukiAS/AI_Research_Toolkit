# 第一卷：无第二控制面的最小可执行内核与v0.8计划

2026-10-14；性质：独立复审前的Planner完整修订方案，**并非已安装代码、独立PASS或产品实施授权**。同时回应GPT-5.5 B1、GPT-5.6 P0-ARCH-01/02及GPT-6 R1-P1-01。前任v0.7过度否定新程序，让“既有Bridge自己消费”仍可能只是提示词；本稿明确可调用的、短命的实际检查组件及其独立边界，但**不增加任何中央任务状态、Watcher、Reviewer轮次、通用重试器或发布身份**。

## 1. 最终架构选择：一个真正有权的任务Owner＋一组可直接执行的保证函数

~~~mermaid
flowchart TB
 U["用户当前目标和当前批准源"] --> B["唯一任务Owner：项目Codex/Lite/Bridge Reviewed或Control"]
 B --> P["保证函数：定位目标／导出义务及需检查性质"]
 P --> C["主Codex，可按需有限开发子代理"]
 C --> Q["项目正式生产路径的廉价前置探针"]
 Q --> F{"当前声明能由实际结果支持？"}
 F -->|"不能／尚未观察"| C
 F -->|"能"| O["平台原观察程序：真实UI／数据／模型／持续结果"]
 O --> R["现有Bridge合法Reviewer／Verifier或受保护CI"]
 R --> A["保证函数：证据与同一候选校验，不自行审批"]
 A --> D["项目原有授权发布/科研结论"]
 D --> U
~~~

运行位置不是一台新的中央机器。短命的保证函数运行在**当前合法项目CI/任务执行环境**中，读取原任务和项目专业脚本的结果，完成即退出。真正启动、等待、阶段推进、审查轮次和预算仍属于唯一现有Owner。若项目没有已安装可用的Reviewed/Control，不能凭Bridge源码存在宣称能自动恢复、交接。必要长时能力先比较一次性安装现有Bridge的真实成本；不再另造并行状态机。

## 2. 最小内核的五个子命令（拟议接口，非已经发行的CLI）

子命令是一个可复用**纯决策库＋项目已有固定脚本消费者**。命令名仅供审查API：assure inspect、assure plan、assure probe、assure collect、assure admit。不得成为新队列/长期服务。输入数据可暂存在当前任务的results目录，已有等价结果就只引用，不复制同义文件。

| 子命令/触发时点 | 输入、来源与启动者 | 输出/失败含义 | 谁可写、谁不可改 |
|---|---|---|---|
| assure inspect：当前任务刚进入合法Executor阶段 | 原Goal/Issue、准确分支/worktree、实际Bridge模式、批准资源/成本。由原任务Owner调用而非接收模型任意命令 | task_binding.json仅定位，不创建新任务。源错/工作树错→SOURCE_MISMATCH，权限不明→AUTHORITY_BLOCKED | Goal/授权由原权威维护；Executor不可通过改变标题/临时摘要替换真源 |
| assure plan：编码前、变更影响扩大时 | 原用户操作/科研公式/数据义务、历史旧行为、目前变更影响。原Planner冻结正式义务，实施者可追加自测，不能删旧义务 | claims引用原要求、required_checks引用项目真实入口与证据等级。不清楚→UNRESOLVED_SEMANTICS；不允许悄悄缩题 | 现有Plan/Requirement Ledger才是权威；生成视图不允许覆盖受保护参考 |
| assure probe：首次正式纵向链出现后、扩大昂贵操作之前 | 固定候选、批准的项目脚本ID与实际代码/数据入口；执行者或现有Verifier在批准环境调用 | probe引用实际数据流、loss/梯度/预测或Provider→聚合→界面。FAIL→NEEDS_REPAIR；缺输入/观察器错→NOT_PROVEN，不等产品FAIL。0退出码只证明本次限定探针 | 公开开发探针可由Executor写；正式受保护参考/观察由现有独立验证权限拥有，不允许同候选改规则再自签 |
| assure collect：候选稳定和合法平台观察之后 | 源码提交/构建包、真实进程/设备/服务/模型版本、项目既有原始动作和后置事实 | 指向不可变原始记录的evidence_manifest；未执行、过时、错版本或权限缺失逐项标注；不能改成PASS | 合法CI/专业平台Owner写受保护原始事实；开发者的叙述只能作为辅助 |
| assure admit：已有正常交付或Bridge正式Review阶段 | 批准声明、必须运行集合、同一候选、独立专业审查及实际观察；原有Reviewer/Verifier/项目受信CI消费 | SUPPORTED_FOR_STAGE / NOT_PROVEN / PRODUCT_FAILURE / OBSERVER_FAILURE / AUTHORITY_BLOCKED；返回原Owner处理。**绝不调用publish、advance、retry、record_review** | 最终审查与真实发布必须使用现有权限体系，实施者不能覆写独立结论 |

共同返回含义：仅定位/读源码/公开开发自测可在本地辅助执行；涉及正式准入时若不能证明执行身份与隔离，只能标ADVISORY，不具备技术阻断权。为避免中央状态机，除原任务/批准源外不记录另一个review_round、retry_budget、candidate_current或等待状态。

### 提案中的技术接口草图（待审，不是可执行Goal）

~~~python
def evaluate_required_claims(approved_claims, required_runs, trusted_evidence, candidate):
    for claim in approved_claims:
        run = trusted_evidence.find(claim.id, candidate.identity)
        if run is None or run.skipped or run.stale:
            return "NOT_PROVEN"
        if not run.trusted_observer or not run.executed_normal_entry:
            return "NOT_PROVEN"
        if not run.observed_postcondition_meets(claim):
            return "PRODUCT_FAILURE"
    return "SUPPORTED_FOR_STAGE"  # 原既有Reviewer/发布者仍是唯一决策者
~~~

该设计示意有意没有“网络请求/执行任意Shell/修改Git仓库/写CURRENT”的方法。实际校验由冻结的专业参考和真实观察产生；仅有字段/摘要/文件数量不会触发SUPPORTED。

## 3. 三种任务实际怎样触发，不能偷偷把Lite变Control

**普通小改**：原项目Codex/Lite阅读目标与有效本地规则，执行已有适用语义及回归；无跨依赖或用户可见复杂变化时不强制生成claims/evidence的完整包，不启独立Reviewer/GUI/GPU。已存在CI按项目实际配置运行。

**完整新产品功能**：仅目标仓库实际安装/授权Reviewed时，由其Planner冻结正面完成要求，Watcher在EXECUTING启动主Codex。早期assure probe在Executor阶段调用项目**确定性**真实路径，不占正式Review轮次。候选完成后才能进入READY_FOR_GPT_REVIEW，由Bridge真正Reviewer独立审查；record_review仅允许合法状态与最多两次记录。若没真正安装Reviewed，则不能宣称一次交办后的异步独立Review与自动修复。

**高风险CARE科研工作**：原Control或科研Controller拥有Requirement Ledger、Verifier、费用/Slurm权限及科研负结果标准。医学/统计数学源在编码前确定，真实数据/梯度/采样/模型接续先以廉价正式路径探针检查；被真实授权资源提交入口消费其结果后才允许昂贵作业。短训练**不能**升级为原合同长训练完成。若直接sbatch仍能越过准入，设计仅能称纪律性告警，不能声称技术性强制。

## 4. 本内核在哪里才有权阻断真正的副作用

- GitHub CI/发布：只有在规则集、受保护检查来源、独立执行身份与环境权限**真实可用**时，才能阻断合并/部署；跳过工作流显示绿色不能证明必需场景已运行。项目只允许发布身份消费其合格观察。
- Windows GUI/Zotero：先在实际独立的账号/桌面会话限制对真实用户资料的访问。Bobbio带PreflightOnly的现有wrapper内可能调用Apply；Lucerna截图脚本包含SetForegroundWindow，不能称只读。无隔离时停止对应动作，保留后台开发，不能靠脚本自己说SAFE取得权限。
- Slurm/GPU：长训仅可在现有批准提交者/站点机制真正约束命令与资源的条件下主张技术强制；若实施者仍可直接绕过受控入口提交，属于未闭合安全/费用缺口。
- 模型审查：新Codex会话≠独立权限；若继承写入型MCP、钩子或共享参考目录，必须在实际进程启动前限制工具与身份。没有可确认权限只能提供诊断。

## 5. 技能谁调用，防止“Planner只写一句用插件”

合法任务启动者（已有Executor输入组装或其领域阶段）读取当前已安装的Skill清单/版本。比如新增CUHK Date问卷时实际触发前端设计与产品微文案Skill，先拿设计语义后开发；Asteria科学图要真的消费科研来源/完整设计；Bobbio必须真正读取Figma本体。检查是否实际加载、是否影响最终用户产物，不能只看提示词提到Skill。**目前没有核实六仓库已具备可普遍自动路由的现成实现**。若缺，应作为原Bridge或AI Skills正常消费者的**最窄后续变更方案**提交独立审查；不在v0.8偷偷声称已安装。

## 6. 明确下一阶段计划与停止条件（非产品实施Goal）

v0.8如果获得独立设计PASS，只批准进入有界、无私人/付费资源的**试点方案设计**，不直接执行。下一Plan应先核对目标主机、真实Bridge安装、有效CI保护与项目原脚本，再比较“完全不新增公共函数”与“最小保证函数”两条正常入口。用Lucerna早期状态真路径和CARE旧B6指标依赖坏例及对应正确例先证明**真实能力差异**。第三个平台选择Mica/Asteria/SeminarArc之一，验证不是Windows特殊方案。若需要另起第二CURRENT、第二重试预算、新Daemon，直接否决此路线；若小改额外大量模型/审批，或正确实现被长期误拒，必须收缩/更换。

**本文件新增的是有边界的可实现接口设计，不是编译过、安装过或经过安全审计的程序。** 它不能用“已设计接口”给全部历史降级关闭。独立Critic完全可以拒绝B1，理由必须指向无法实际由原Owner消费、缺强制权限或违背用户一次交办承诺的具体因果风险。

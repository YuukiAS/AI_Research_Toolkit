# 研工台：可落到进程、文件与真实入口的运行架构

日期：2026-10-13。状态：Planner候选设计，**未安装、未验证、未获独立Critic PASS**。只在AI_Research_Toolkit研究分支留稿，不声称已经取得用户主机/Codex账号、云端仓库规则、测试身份或HPC执行授权。本页应与同版 [Lucerna完整演练](LUCERNA_RUN_TRACE.md)、[CARE多模型演练](CARE_MODEL_RUN_TRACES.md)一起读，而不是只看概念图。

## 1. 用一张运行图说明真实组件

~~~mermaid
flowchart TB
    U["用户一次任务：最终功能/科学目标 + 有效授权"]
    P["项目当前真值：Goal / 产品或科学源 / 已接受行为 / Git分支"]
    EN["任务入口（目标机器现存批准入口）"]
    A["研工台薄运行包：任务适配、阶段派发、质量证据消费、恢复/规则维护"]
    BR["Bridge Kit：Host权限、工作树、Review/Control既有角色及恢复"]
    SK["实际安装的领域Skills/Plugins：设计、文案、医学影像、统计等"]
    DEV["主Codex（集成owner），按需派发子代理"]
    PK["真实产物：运行exe/web/安装APK/checkpoint与NIfTI/论文"]
    VALID["项目现有实测器：窗口动作/Playwright/Android/真实模型推理"]
    OR["独立只读审查 + 受保护参考/原始观察"]
    G{"准入：真实正例、关键回归、独立判定、同候选"}
    QA["GPT Work或最终用户：成熟候选、少量人类专属事项"]
    REPAIR["失败分类：代码/设计/观察器/证据/要求/权限"]
    U --> EN
    P --> EN
    EN --> A
    A <-->|"使用既有阶段入口，不叠加角色状态机"| BR
    A -->|"读取当前安装并实际派发"| SK
    A --> DEV
    DEV --> PK
    PK --> VALID
    A --> OR
    VALID --> OR
    OR --> G
    G -->|"有本轮对应直接证据"| QA
    G -->|"不满足"| REPAIR
    REPAIR -->|"同范围修复，仅失效部分重做"| DEV
    REPAIR -->|"测量器错误/合同歧义/真正用户决定"| A
~~~

**三个不同的真值不能合并**：项目和用户给出“要做什么”；真实源/设备/数据给出“实际做了什么”；有权限独立的验证者给出“能声称证明了什么”。报告里的PASS、模型的自评、截图文件存在、梯度非零均不得直接充当第三项。

## 2. 第一版到底部署在哪里

**不先建网页平台、队列服务、新数据库、中央云监控或第六种Bridge模式。** 目标是可安装在已获授权的执行主机上的小型命令行运行包，加每项目极薄适配器：

~~~text
拟议安装包（非现存项目路径）
  task_adapter        解析有效Goal、分支、需求、既有规则、候选身份和变更影响
  stage_dispatch      调用现有Bridge合法阶段或已核实的Codex非交互入口/专业Skill
  assurance           调用项目正式运行/验收脚本，消费独立原始观察
  continuity          错误归因、重入/去重、事件触发的规则更新检查
  adapters/
    lucerna           复用Windows native acceptance与R2当前代码路径
    care              复用Longleaf Slurm、正式数据、评估器和原项目验证器
    bobbio/cuhk/...   仅在实际试点中实现需要的薄绑定
~~~

**不做两个系统同时指挥同一任务。** 若项目已经安装Bridge Reviewed，使用其Planner→Executor→Reviewer，不另发明“研工台Reviewer”；Control仍由既有Verifier、Controller、Executor、Planner、Critic拥有各自authority，研工台只供相应角色调用能力和消费已有证据。Lite中可有实施阶段内部额外质量检查，但不得冒充独立的正式Review结论。Bridge若缺乏合法可用阶段启动器，入口暂停并列出准确缺口，而不是直接未经审查升级模式。

运行主机不同：Lucerna的真实Windows窗口观察必须在获准的独立桌面会话/测试机执行；CARE真实训练与推理要在获准UNC/Longleaf Linux作业与数据环境内完成。模型文本审查可以在另一主机执行，却不能替代这两个本地真实观察。进程寿命由当前有权任务入口或现有Bridge Persistent Run承担；单次ChatGPT回答本身不会产生常驻程序。

## 3. 一个任务内部有哪些真实工作件

只保留六个概念，不要求各自再新建JSON文件：①原任务及批准范围；②基于原源的公开能力合同和受保护判定来源；③主实现提交与实际产物；④项目既有正式脚本的原始观察；⑤独立审查发现和必要返修；⑥最终交付对象与后置状态。它们分别可以存在项目已有Goal/Plan、已保护的验收源、Git提交、测试目录、既有Review包及发布记录中。研工台不再复制一份跨仓库CURRENT或另建维护看板。

拟议单一调用上下文（接口示意，**不是现存API或已验证命令**）：

~~~yaml
task:
  project: YuukiAS/Lucerna
  goal_ref: a-pinned-existing-goal-or-issue
  base_branch: actual-verified-project-branch
  bridge_mode: the-actually-installed-and-authorized-mode
  scope: approved-worktree-and-resources
  authority_ref: existing-bridge-host-task-authorization
  historical_behaviors: applicable-protected-positive-regressions
  domain_adapters: [lucerna]
  candidate:
    source_commit: immutable-snapshot
    artifact_sha256: value-from-actual-built-app
  checks:
    public_regression: project-existing-commands
    production_path: approved-observer-scenarios
    protected_reference: authority-owned-check
    visual_or_scientific_review: triggered-by-real-task
  effect_budget: same-task-approved-operations-only
~~~

这里的路径、标识来自已有项目，绝不能由实施者任意声明已启用。尤其“actual-verified-project-branch”不是统一main：Bobbio此前使用develop，CARE的main/develop分别有各自历史，应按目标任务及当前真实检出判断。

## 4. 真正运行过程：不是每阶段多一份报告

~~~mermaid
sequenceDiagram
    actor U as 用户
    participant R as 实际任务入口/研工台
    participant B as 已安装Bridge或Host
    participant D as 主Codex/开发子代理
    participant T as 项目真实观察器
    participant V as 合法独立验收角色
    participant F as 正式交付
    U->>R: 一次交办及既有授权
    R->>B: 核对主机、工作树、模式和权限
    R->>V: 在编码前从原始要求建立公开合同与独立参考
    R->>D: 实际派发所需专业技能和设计/实现
    D->>D: 合并子任务，跑开发回归
    D->>T: 第一条正式输入→输出链
    T-->>V: 原始输入、消费、结果和错误
    V-->>R: 是否忠实原要求；重大缩水禁止扩大投入
    R->>D: 继续完整实现/内部自己操作产品
    D->>T: 最终候选同版本真实运行
    T-->>V: 安装/设备/预测/窗口证据与正反例
    V-->>R: 逐要求判断，通过或具体原因
    alt 已有义务失败
      R->>D: 同范围定向返修
      D->>T: 仅重做失效的实测
    else 验收器故障/合同争议
      R->>B: 交既有Verifier或Planner；无权自改门槛
    end
    R->>F: 核对同一交付对象及后置事实
    F-->>U: 成熟产物、实际缺口、必要人类决定
~~~

时点必须清楚：
- 编码前冻结的是**要证明的真实能力、误差语义和既有回归**，不是假装新界面、新训练脚本已经运行。
- 第一条真实纵向路径能运行后，立即做**忠实性/因果消费检查**：防PRISM算四层只用一层、防CARE训练随机张量、防Lucerna展示fixture冒充正式状态。这是扩大实现和长训练前的早期审计。
- 开发结束前实施者自行操作真实界面/预测/论文，修掉按钮、保存、语言、整体布局这些明显问题；不能把GPT Work变成首轮生产自检。
- 候选固定后，受保护参考和事先定义的最终输入生成规则由独立端执行，结果来自真实对象；使用过的失败样本变成开发回归，不再号称未见样本。
- 只有候选及实测对象一致、必需检查全部真实执行，才交正式Review/Work/用户。源语义或二进制改变使受影响证据失效；报告和传输变化只做轻量重绑定。

## 5. 最重要的准入实现：拒绝“假绿灯”

准入消费者需要取得的是可信原始事实（字段名为拟议接口，并非系统已经存在）：

~~~python
def admit(requirements, trusted_observations, candidate, authority):
    assert authority.current_scope_allows(candidate.project)
    assert candidate.matches_observed_source_and_artifact()
    for claim in requirements.required_claims:
        obs = trusted_observations.for_claim(claim.id)
        if obs is None or obs.skipped or obs.missing or obs.test_only_when_real_required:
            return "NOT_PROVEN"
        if not obs.was_run_by_authorized_observer():
            return "UNTRUSTED_EVIDENCE"
        if not obs.actual_postcondition_satisfies(claim):
            return "NEEDS_REPAIR"
    if requirements.requires_qualified_independent_review:
        if not trusted_observations.review_for_exact_candidate_is_valid():
            return "NEEDS_REVIEW"
    return "ADMISSIBLE_FOR_NEXT_EXISTING_ROLE"  # 不是用户产品最终PASS
~~~

不是“执行者提交一个PASS JSON，系统验它字段齐不齐”。真实观察端要独立记录：它在哪台受控机器、对哪个PID/安装包/模型权重、使用哪些真实输入、走了什么正式入口、产生什么后置状态。判定参考与原始记录不能由当前候选单方覆盖；非零错误、必需用例跳过、缺观察器、引用旧候选，统统不能提升结论。

**边界说明**：没有实际分权的当前管理员可以修改本地检验程序、读取所谓私有样本、覆盖日志。此时只能称“独立审计和阻止普通误报”，不能宣传成抗恶意管理员的强制安全机制。引入GitHub受保护分支/必需检查时，必须让受信任的验证控制源在有权限的环境运行，避免PR可改测试器；构建不受信任候选不得获得发布凭据。官方安全参考：https://docs.github.com/en/actions/reference/security/secure-use 和 https://docs.github.com/en/actions/reference/security/securely-using-pull_request_target。保护规则、检查的实际配置本轮未读到具备管理权限的真值，不能声称已启用。

## 6. 防过拟合、误拒及Verifier越权

公开验收职责由原用户目标/论文公式/既有基线推出：执行者可以看到“no-T2无水肿监督”“Button Cancel不保存”“真实多尺度进入final logits”。隐藏具体最终样本不等于隐藏要求。独立参考不可调用被测函数当真值。审查者后来发现之前漏测“有效样本分母”，可引用原公式补充测量并记录非盲；若要新增科学门槛或错误地要求不同上下文logits绝对一致，必须交Planner裁决，不得自行构成阻塞。CARE历史曾出现这两种故障，详细见同版CARE案例。

若验证器判错，先用正确、故意破坏、缺观察三类样本验证检测力；不能为了通过把产品修改成错误行为，也不能把报告变绿称修复成功。新候选对既有正确功能的回归仍然必须通过，只有拒绝所有候选的“安全”不是交付能力。

## 7. 谁负责、什么时候才打断用户

- 主Codex负责代码及有界子代理的集成、先行真实操作；不拥有修改原要求、私有参考或发行决定的权力。
- 执行派发者必须确实启动专业技能，不是Goal里写“请使用插件”。读取实际安装版本、动作记录和应用效果分别核对；无能力不静默降级为普通提示词。
- 产品/领域审查者由任务入口在正确时点派发独立会话；在Reviewed/Control内必须使用已有合法角色。
- 观察器缺测/错误由项目测试负责人修；代码不忠实回主Codex；合同歧义由Planner；Critic只审其实际获准对象，不能由Planner假装PASS。
- 同一根因反复昂贵失败时停止第三次无新证据的全量复核；不换新任务号规避已有Bridge两轮/人工出口规则。必要用户决策限新增目标、数据/权限、不可逆动作、费用及真正人类审美/科学取舍。
- 自动AGENTS维护由阶段完成和真实事故触发；规则无变化不另启长任务。允许合并/更新/退休过时规则，但改权限/科学目标仍须合法批准；新规则必须通过真实加载和行为回归。

## 8. 第一版如何验证“系统真的有用”

不能先宣布所有六库+CARE已集成。建议**一个短Lucerna纵向试点 + 一个CARE无需新训练的旧坏例重放**。两者通过后再选择性接第二平台。评价不是写了几条规则，而是：
1. Lucerna原有01055父子状态矛盾、fixture残留、取消/重启错误等真实旧坏例能被自动或独立首次内部检查发现；正确原生发布候选仍能通过。
2. CARE旧B6公式指标/新模型未接旧checkpoint/PRISM多尺度无效能被受信任检查拒绝或明确停在未证明，不跑8000步才发现；一条真实正确较小训练链能继续。
3. 运行后用户首次发现的同类P1减少，主实现自动返修且不反复抢前台/重装/调大模型；没有强制所有小改跑重检查。
4. 某个既有CI/检查器测错时能校准而非逼产品造假；模型真实科学负结果被诚实停止而非误判“代码未忠实”。

历史坏例的原因可在同版六仓库246项、CARE40项及新增谱系查到。**目前没有做上述新流程正常入口重放，以上是必须经Critic独立审查的设计与未来试点标准。**

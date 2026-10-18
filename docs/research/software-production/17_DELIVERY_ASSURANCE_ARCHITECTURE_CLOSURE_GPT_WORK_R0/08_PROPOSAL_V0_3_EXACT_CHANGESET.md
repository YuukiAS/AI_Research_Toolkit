# Proposal v0.3 精确变更单

基线：`DELIVERY_ASSURANCE_PRODUCTION_CONTRACT_COMPLETION_PROPOSAL_V0_2_20261019.md` @ `3868886b621cd77b180af8721b39d5c620dfb9e4`。本文件不直接改写旧Proposal，保留其历史权威。Planner按下表和06完整规范转写；若对冻结语义有异议，应审查修订合同，不能留给Executor任选。

## 转写规则

06 C01–C20为新正文规范。原Proposal §0–21的背景/来源可保留；与下表或06冲突的旧句、示例和默认值必须删除，不能把新条款仅附在旧条款之后形成双权威。旧supporting map作为历史附录保留，当前覆盖引用02/04A。不得将本轮证明C改写为PASS。

| ID | 原文精确定位 | 操作 | 替换/新增的确定内容 | 权威正文 |
|---|---|---|---|---|
|X01|§0、§1.2、§4A.4、§12A、§12B|替换覆盖数字与证明语义|286/46/6统计不得用于363闭合；换为83/363研究覆盖、26能力模板、9控制责任，列80纯控制主归因及其边界；明确独立证明FAIL|01、02、04、05；06 C20|
|X02|§2.1 plugin.json示例|删除自定义平台字段依赖|删除delivery_assurance manifest字段作为Codex原生发现前提；由workflow-core读取已启用package root下固定delivery-assurance/gates.toml，项目adapter显式capability_refs|06 C02|
|X03|§2.2、§3|替换identity/descriptor schema|采用C03所有必需字段、语义projection digest（排除自digest/排版）、固定引用、单一authority和da/1兼容规则|06 C03|
|X04|§3.2、§8.3|替换证据模型|单载体class扩为modality/fidelity/observer三轴并记录实际观察；native+fake backend不得升级真实roundtrip|06 C09–C10|
|X05|§4.1A|替换影响算法|五源取并集；baseline到candidate含committed/staged/unstaged/untracked；path仅候选，三值谓词、unknown不得NONE、依赖闭包含消费目标|06 C05|
|X06|§4.2第“合并重复”条|删除择更严可执行定义|只去重同定义/subject/target/entry/evidence实例；冲突按字段authority回流，不选更严、更便宜或可执行者|06 C04、C06|
|X07|§4.3|整节替换scope规则|使用C06四档必要条件；FULL为完整义务覆盖允许有效复用；小改whole-product仍FULL覆盖；Gate数量和任务复杂度不是触发器|06 C06|
|X08|§4.4、§8.2|替换resolution和结果locator|required obligations、missing、复用理由和授权前检持久化；run UUID+复合instance key，不同target/run不覆盖，引用留原packet|06 C03、C06|
|X09|§4A.1–§4A.3；supporting map说明|替换新Gate逻辑|完整比较六维可表达性；任一维相同不等于无需Gate，文本不同不等于新Gate；已有family能覆盖则仅回归/加固/补证据|06 C04|
|X10|§4A.5 seed和supporting CSV|替换为完整语义目录与逐条映射|使用02A/02最终族及363处置；保留历史来源和已修状态；不能把表中case-id写成runtime分支|02、02A、04；06 C18|
|X11|§5|替换缺项路由|六种能力状态按C08判据和owner；与result原因/既有workflow状态分开，暂不可跑不删除Gate，不把可解环境问题推给用户|06 C08、C12|
|X12|§6|细化机械实现与晋升|冻结标准机械validator由Executor实现；新语义需专业owner；两个已验证consumer六维等价才触发中央晋升，Maintainer只管分发|06 C04、C08、C14|
|X13|§7|整节替换anti-gaming|冻结semantic diff、真实坏实现/正例/缺观察校准，producer/independent/protected分开；hash或另一会话不构成不可绕过；防false negative|06 C09|
|X14|§7.4|替换失效与复用矩阵|定义/rubric变更重判有效raw，collector错需补采，产品/环境变化沿闭包失效；纯回执不改变冻结semantic candidate|06 C07、C11|
|X15|§8.1、§8.3|补齐调用和result schema|固定正常入口触发点；C10全部字段及PASS/FAIL/UNKNOWN、缺项、observer、成本、fingerprint；不能仅输出总PASS|06 C02、C10|
|X16|§9|整节替换目标图|provider→consumer边方向、INTEGRATES兼容证据、build DAG与runtime SCC、installer payload到进程、job与artifact区分、动态身份窗口|06 C07|
|X17|§10|替换adapter/update生命周期|最小草案、明确语义authority、首次FULL覆盖受授权约束；Update impact/allowlist/每机器独立验证及ADAPTING保留|06 C14|
|X18|§11|替换claim偏序与聚合|按target/capability/environment/time绑定，INSTALLED/LIVE不互相代签；科学outcome分离；USER_READY是完整承诺聚合非新全局等级|06 C13|
|X19|§12、§14|替换普通路径和示例|既有入口→首真实链→实施→producer自检→既有review→identity→有限claim；宿主接口未证则明确降级；用C18七repo实际路径|06 C02、C16、C18|
|X20|§12A、§12B|明确独立实验顺序和否决条件|先隔离manual commit，再独立事实编码/规则执行，最后比较六维；缺原始diff标重建；不得用同上下文对齐表冒充独立自动证明|03–05、07；06 C20|
|X21|§13|整表替换|以C17的22行11字段交接矩阵替换旧owner/actor三列表；全部位置/恢复owner/用户条件/失效填满|06 C17|
|X22|§14.2、§18|保留既有长任务边界并细化|不重造Slurm/Persistent Run；项目完整队列视图、pending分因、终态collector、科学NO_GO、预算和权限按原合同|06 C12、C15|
|X23|§15、§16、§21|替换关闭条件与下一步|研究verdict保持REVISE；方法独立性与批准未闭合，架构内部无未分配选择；Phase2前固定项与consumer参数阶段明确；不运行R5或prod|01、07；06 C19–C20|
|X24|§17、§19|增加真实入口/收益/可视消费验收|C19可否决分支，C16现有packet只读视图与同样本净收益评估；不新建console/daemon/CURRENT|06 C16、C19|
|X25|§20外部实践|更新为有限采纳|官方manifest不提供DA字段语义；in-toto只借subject/predicate绑定；GitHub绿灯含skip/neutral不可代专业PASS；不引入额外基础设施|06 C02、C10、C13|

## 转写后的验收

1. 检查旧“更严格且可执行”、自含digest、单gate-id结果路径、286/363等错误完成声明已被替换；引用旧历史时明确标旧。
2. 06全部20节语义均有唯一正文位置；descriptor、adapter、result和graph类型没有彼此矛盾的字段。
3. 83要求、363登记、22交接行和六维比较文件仍可追溯；没有把实际未运行改成PASS。
4. 不新增工作流/registry/daemon/状态机，不改变R5状态或生产源码；consumer参数均有阶段和owner。
5. 独立复核与既有Planner/Critic批准未成立时，不将v0.3文档改名视为ARCHITECTURE_CLOSED。

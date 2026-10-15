# AI Skills：专业指导确已分发，不能等同于外部执行控制

RUNNER_ID: GPT6_PRO
READ_DATE: 2026-10-15
SOURCE_REPOSITORY: YuukiAS/AI_Skills_Collection
SOURCE_MAIN: 0d990b24fb7c7b46877347241800244f623b20c0
SOURCE_RELEASE: 06d135d8a6ee62cd41abb40fc5771fcef7f8db25

## 已直接核实的来源

读取 branches、main 根树、AGENTS.md相关规则、README.md、release 的 plugins/codex/plugins/workflow-core/skills/workflow/SKILL.md 全文、main .github/workflows/codex-marketplace.yml 全文，以及 docs/plugin-todos/workflow-core.md 前部真实事故/已发布修订记录。README明确稳定安装跟随release；main用于开发，不能互相替代。main另有写作、演示文稿审查器研发等工作分支，未把这些实验成果冒充release能力。

## 六个核查维度

目标：可安装的科研工程专业技能，提供写作、界面、统计、影像及工作流指导。真实入口：Codex App/CLI Git marketplace，稀疏路径 .agents/plugins 与 plugins/codex/plugins；更新后新会话加载。安装和源码存在不能证明用户当前机器加载了该版本。

规则：AGENTS以用户当前目标、明确绑定分支和真实产物优先；要求按任务规模缩小读取范围。中央维护由workflow-core、ai-skills-core和真正领域插件分工；README语言检查不能以字符串扫描代替。所读AGENTS不是声称全文件逐条执行；本轮不修改该仓库。

实现：release的workflow技能frontmatter明确 executes_code:false；正文定义专业路由、验收准入、证据层级、同类失败止损、保持既有行为、最小权限和同一任务恢复。它要求Bridge处理Git/授权/任务生命周期，自己不实现第二套解析器或状态。目录是技能、参考资料、图标、触发评测；本次没有看到一个能自动接管任意已结束Codex App会话的外部执行器。

验收入口：CI真实配置运行 unittest discover -s tests、marketplace生成/验证/新鲜度、skills validate/audit；另有Windows长路径稀疏checkout和跨平台CLI安装冒烟。上述只说明检查入口存在，本轮没有执行，也不证明生成产物专业质量。

失败来源：workflow TODO明确记录已加载规则仍误把PATH缺工具等同能力不存在、拒绝审批后改走更宽权限路径；另记录Lucerna测试绿色但真实状态/证据等级不符。它们是仓库事故记录，不是本轮机器实测。已有规则覆盖的失败不应再用新增同义规则处理；应查加载/消费路径和验证器质量。

执行/恢复/权限：同一Goal记录恢复点、真实人类依赖停止后续动作、明确回复后一次续接；六维等价且不扩权才允许自动恢复。README把Host/运行时交给ai-bridge。所读release技能不保证这些文字在每个普通会话被强制执行。

## 对独立候选的约束

技能应复用为领域知识与审查方法，不宜被赋予持久任务拥有权。需要区分规则写了、插件实际加载、工具被调用、真实消费者通过四种事实。候选若声称安装workflow插件即可在Codex结束后自动发现失败并续原任务，必须提供另一个实际事件/控制接口证据，否则淘汰这一能力声明。项目接入不应复制全部中央规则。

## 证据边界

未访问Windows/服务器会话、安装状态、付费回放或生产执行；未读取任何其他研究者输出或Toolkit历史方案。下一仓库：GPT_Codex_AI_Bridge_Kit。

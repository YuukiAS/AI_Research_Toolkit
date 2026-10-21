# Delivery Assurance：全局架构研究启动包

本目录是**研究指令**，不是已批准架构、实施包或正式产品能力。用户要求的是减少普通开发和科研交付中反复提醒、发现旧功能退化、识别低配实现、手工催促返修的负担，而不是增加验收文件数量。

## 入口

- [02_GPT_WORK_STARTER.md](02_GPT_WORK_STARTER.md)：直接复制给 GPT Work 的短启动提示词。明确要求第一个动作核实 GitHub 写入权限，真正创建并回读探针。
- [01_GPT_WORK_FULL_ARCHITECTURE_PROMPT.md](01_GPT_WORK_FULL_ARCHITECTURE_PROMPT.md)：完整研究合同。从真实软件架构、部件因果解释，到验收器全生命周期、七仓真实接入和历史问题反向核对。
- [00_USER_REQUIREMENTS_AND_GAPS.md](00_USER_REQUIREMENTS_AND_GAPS.md)：本次长对话的核心用户要求、反复暴露的架构与沟通失败、最终每轮任务应如何汇报。
- [上一轮 36 项职责与 315 个问题](../21_DELIVERY_ASSURANCE_COMPONENT_AND_QUESTION_INVENTORY_20261022.md)：必须检查的输入，不代表要新建 36 个软件模块。

GPT Work 产物只可写到本目录的 WORK_OUTPUT/；最先创建 00_GITHUB_WRITE_PROBE.md，随后逐阶段写入研究结果并更新 CURRENT.md。**不能先在本地研究一大轮，最后才尝试提交。**

研究输出首先解释推荐架构是什么、为何在真实任务中能工作、对用户减少什么负担，再给具体代码入口、反例、七仓接入、实施与独立审查材料。此阶段不修改生产代码或启动高成本工作。

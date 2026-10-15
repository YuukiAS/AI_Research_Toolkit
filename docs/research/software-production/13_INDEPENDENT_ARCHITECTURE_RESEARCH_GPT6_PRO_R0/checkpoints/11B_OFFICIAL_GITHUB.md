# 官方来源核查二：GitHub 交付门及其不能证明的事情

RUNNER_ID: GPT6_PRO
READ_DATE: 2026-10-15
HISTORY_READ: NO

## 官方事实

O08：受保护分支可以要求检查及审查，但默认管理员/有绕过权限的角色可能不受限制。要求检查可指定预期 GitHub App 来源，否则有写权限的主体可设置同名状态。successful、skipped、neutral 均可能满足平台的必需检查条件，不能把“平台绿色”自动翻译成“领域全部验收通过”。不同工作流不要用含混重名检查。[O08]

O09：必需检查绑定最新目标提交；测试合并提交已有状态时检查该提交，否则检查分支头。整个工作流因路径/分支过滤没触发可能保持等待，作业层条件跳过则可能报告可接受状态。使用合并队列必须覆盖 merge_group，不能只验证原PR头。[O09]

O10：规则集可约束更新、删除、PR、审查、部署及工作流；有效强制取决于规则的激活状态、目标分支、绕过角色与计划/组织能力。不能由仓库存在 workflow YAML 推断保护已开启。本轮不重读十仓库，也不声称已获得管理员规则视图。[O10]

O11：官方安全指引明确警告 pull_request_target / workflow_run 处理不可信检出代码的特权风险。自托管运行器不天然具备每次干净隔离保证；环境审批也不把它变成沙箱。依赖应采用受支持的工作流依赖锁定，无法采用时固定完整提交；执行者不应同时获得验收签发、生产凭据和主机管理权限。[O11]

O12：环境保护可以在作业访问环境秘密之前要求授权；具体能力和自审限制取决于配置与计划。它管的是部署/秘密释放，不是模型理解质量。[O12]

O13：构建证明把产物绑定至来源与构建流程，必须在消费端验证；官方明确其不保证产物安全，更不保证专业、视觉或科学正确。私有仓库可用性受计划限制，不能在尚未核查用户权益时把专属功能设为唯一可行路线。[O13]

## 对候选的可执行约束（研究建议，尚未实施）

受保护聚合门须从固定可信验证器重新计算结果，只在每个必需领域判据都有有效证据时显式成功；未知、缺件、跳过和无效签发者都不得被聚合成通过。业务失败、基础设施失联、科学否定分别保留。验证器代码/版本、目标源码、验收合同、环境、产物摘要与发行对象须绑定；源码变化后不能拿旧截图、旧安装包、旧测试结果自动续用。

仅限制 Check 的 App 来源仍不够：同一 GitHub Actions App 下的恶意工作流也可能制造同名结果。还要保护验收工作流、可信代码的取用位置及签发凭据，使普通实现身份不能改掉门，再给自己发证。待审分支可执行的产品代码只在低权、可清理环境中运行；可信发布阶段只解释数据，不执行被测产物夹带的脚本。提交、合并和正式发布应共享同一产物身份，而非在每阶段重新编译却沿用旧证明。

这提供“拒绝假交付”的权力，不提供“回到任意Codex原线程继续”的权力；后者仍由原生hook、已绑定的CLI/SDK入口或已有CARE持久控制者负责。分支保护没有让任何Windows验收真的发生，也没有替代研究问题及专业判据。

## 官方参考文献

均于2026-10-15访问。

[O08] GitHub. About protected branches. https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches 。位置：Require status checks；Do not allow bypassing。

[O09] GitHub. Troubleshooting required status checks. https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks 。位置：Latest commit SHA；Head versus test merge；Skipped workflows/jobs；Merge queue。

[O10] GitHub. Available rules for rulesets. https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets 。位置：更新/PR/部署/工作流/合并队列规则。

[O11] GitHub. Secure use reference. https://docs.github.com/en/actions/reference/security/secure-use 。位置：Untrusted code checkout；Third-party actions；Self-hosted runners；CODEOWNERS。

[O12] GitHub. Deployments and environments. https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments 。位置：Deployment protection rules；Environment secrets。

[O13] GitHub. Artifact attestations. https://docs.github.com/en/actions/concepts/security/artifact-attestations 。位置：When to generate；Verifying；Warning；计划边界另核对官方actions/attest说明。

NEXT_ACTION: 核查Slurm作业身份、排队/重排、会计及依赖语义，立即checkpoint；随后专业工具。
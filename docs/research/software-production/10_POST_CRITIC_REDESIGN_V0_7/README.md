# 审查后重做：从“统一运行体系”改为“已有所有者下的复杂产物保证”

日期2026-10-14。**这是Planner对独立意见的实质返修，不是Critic R2 PASS；尚未实施任何新生产运行能力。** 用户明确要求同时总结问题、修改方案并说明究竟赞同哪位审查者。此处沿原研究分支推进，不合并main、不改六软件/CARE/Bridge/AI Skills、不启动新的自动化、模型训练或有外部副作用的试验。

## 结论先行

**我更赞同GPT-5.6的REJECT在架构方向上的判断**：v0.6试图把“调度、验证、权限、恢复、专业派发和规则管理”重新集中到一个号称轻量的新包，不是在修真实入口，而是在累积第二套控制系统。它既难以真正技术强制，又会让用户继续维护项目流程和中央流程两份事实。不能通过把组件减少12→4或追加协议字段来保留原路线。

GPT-6的REVISE也有准确的源码级阻塞：Reviewed正式review只能处于READY_FOR_GPT_REVIEW或CI失败分支记录，轮次最多2；Bobbio标为Safe/PreflightOnly的wrapper在早期仍可能实际Apply写缓存/数据，Lucerna capture会显示及切换窗口；只读Codex沙箱也不能天然禁用其它继承的MCP写工具。这些不仅支持REVISE，它们还进一步支持**不引入中央Controller和万能观察器**。

所以当前推荐方案是：**使用现有Bridge/项目任务拥有唯一执行/状态，AI Skills负责专业Skill，项目正式脚本负责实际用户/科学观察，CI与实际受控平台负责阻断及发布，最多允许一个无状态的跨系统保证引用格式。** 不再计划做“研工台新常驻运行平台”。是否保留这个名称，用户可以在路线成熟后决定；不凭名字给仓库分发地位。

## 已经实质修订的五份文件

1. **[00 架构重选与具体责任归属](00_DECISION_AND_ARCHITECTURE.md)**：删除第二状态机/十二中央运行职责；产品和科研两种成功语义但不另造两个CURRENT；与不建立公共系统、Bridge成熟模式、Spec Kit和项目本地CI对照。
2. **[01 所有可取得的14项阻塞逐项处置](01_BLOCKER_DISPOSITIONS.md)**：GPT-5.6的4项P0、6项P1、2项P2；GPT-6的两项P1。逐项写接受、变更和真正有资格关闭的证据，不自我宣布PASS。
3. **[02 三个实际任务流程、合法角色/预算及首副作用权限](02_ROLE_EXECUTION_AND_CAPABILITY_BOUNDARIES.md)**：小文案Lite、Lucerna完整功能Reviewed、CARE高成本Control/科学Owner；精确对到Bridge Reviewed当前状态与最多两轮，预检PreflightOnly也可能写数据，审查MCP工具继承不能忽视。
4. **[03 科学/产品不同结论、评审资格与六库项目本地验收](03_DOMAIN_EVIDENCE_AND_REVIEWER_QUALIFICATION.md)**：STAT5060的20%召回如何使评审器失格；六库/CARE专业脚本、实际消费与正确NO_GO；AGENTS与AI Skills维护边界、历史账本不虚假叠加。
5. **[04 Lucerna通知新反例与PDF产物身份](04_ARTIFACT_AND_LUCERNA_CASE.md)**：现有NotificationGate通知show前标已发送、发送失败、过期被当恢复的源码序列；旧PDF已经生成、独立未渲染，原v0.6 README的过时声明已修。

5. **[05 各项目真正的正常启动入口与最小接入成本](05_NORMAL_ENTRY_AND_ADOPTION_BOUNDARY.md)**：不能只说交Bridge，必须确知每个仓库是否已安装Reviewed/Control，专业Skill在原Executor提示与运行里由谁实际触发；Lite不谎称断线后自动接力，接入开销必须与纯本地改法对照。

## 对“两个REVISE＋一个REJECT”的证据限制

用户上传的v4.zip内部真实内容：
- v4/gpt5.6.md（SHA256：90e375cd5898caf095fc0b2676142717f1ba258efb3f894eb91d39b92578485c）是完整REJECT，包含12条P0/P1/P2发现。
- v4/gpt6/decision.md（SHA256：6a8f4c1fcd5e5676ae450db31404d60b418f0fd3d5e9dab9a5cc33b12fddf352）及independent_architecture_review_R1.md（SHA256：5d9c42e70ea05ebdcf5fd37d559106669d912a27f61c43577010074124bc2661）属于同一位GPT-6的REVISE，其four_volume_claim_review.md是该审查的逐卷附件。
- **v4/gpt5.5.md为0字节**（空文件的SHA256为e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855）。**无法审查第三位的独立阻塞**，不能把GPT-6摘要算作另一位REVISE，也不能猜测其意见。这一材料缺口仍在。

本项目中源审查文本目前由用户上传的附件提供，研究分支只记录发现和文件校验摘要；后续复审若想独立核实原话需要获得原附件，不能把本Planner逐项响应表当审查者原文。

## 哪些问题是真修订，哪些未证明

- **已完成设计变更**：撤销中央任务运行器；明确产品/科研两种判定语义；重用真实Bridge状态与预算；把所有平台副作用交合法环境；为评价者加入校准、弃权和撤销；修旧v0.6 README“PDF未生成”的事实错误；用源代码补Lucerna通知隐患。
- **仍未实现与验证**：六软件普通任务如何确实消费这些检查（尤其Lite无自动审查），每个运行主机的Bridge/CI/工具权限是否已安全安装、独立Reviewer的检出率是否提升、项目正式脚本能否在实际隔离会话运行、CARE昂贵动作能否由真实技术边界禁止假训练、统计/设计评估是否具有净收益。独立PDF视觉审查仍未取得真实文件做渲染。
- **因此不可宣称**：“两位Critic的14项已闭合”“第三位也通过”“全部事故永久解决”“现在用户一次交办就必能无人介入到产品发布”。本轮做到的是可复审的结构返修与因果实施责任定位。

## 新方案仍面临的最重要反证

**一、是否丢失用户一次交办的体验。** 不建立中央运行器，只有在真正已安装的Bridge Reviewed/Control/成熟项目Runner中才能自动等待和继续。六库不少分支此前没有标准Reviewed安装目录；光说“Bridge源码已有功能”并不能自动续跑。若一项真正新功能仍需用户复制多条Prompt，必须先修合法正常入口，不能把v0.7评价为满足用户目标。

**二、项目本地受保护准入是否真实具备权力。** 如果Codex可无权限限制地直接执行sbatch、Win32前台或GitHub发布，任何事前检查都可绕开，只能算提示，不算防降级/防副作用。

**三、专业Reviewer是不是仍低质。** 独立身份并不解决自然中文、科研数学、图形审美与统计判断；STAT5060实测的低召回若重复出现，必须撤资格，不得靠多代理共识把P1=0交给用户。

**四、是否真的比原方案轻。** 应先做受批准的小任务、Lucerna完整功能和CARE历史错误对照试点；只新增元数据/审查调用、没有改善第一轮用户P1和真实交付时间，就不建设任何新包。

**当前状态：Planner revised proposal; independent re-review pending。** 第三份空审查需要真实原文；用户认可前不触发执行Kickoff、安装、额外费用和新工作流程。独立Critic下一轮完全可以否决本版。

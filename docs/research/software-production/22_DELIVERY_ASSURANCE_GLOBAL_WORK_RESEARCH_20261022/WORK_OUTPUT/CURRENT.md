# 当前状态：R2返修完成候选，等待R3独立设计审查

review_stage=ARCHITECTURE_REVIEW_R2_REPAIR
next_review_stage=ARCHITECTURE_REVIEW_R3
target_repo=YuukiAS/AI_Research_Toolkit
source_branch_or_ref=research/software-production-decision-20261013
design_topic_or_task_key=software-production--delivery-assurance
reviewed_package_commit=9eacd550e563ef9ffd4610b7f66427ad8d827ad3
previous_architecture_source_commit=c87220f9d52935e4eb5296b072830cfd408d32df
architecture_source_commit=79fe13a6ce3480732e206b33029cfa3b9fcf9a78
critic_decision=REVISE（R2，尚无R3结论）
CANDIDATE_STATUS=R2_REPAIR_READY_FOR_INDEPENDENT_ARCHITECTURE_REVIEW
ARCHITECTURE_CLOSED=NO
READY_FOR_CRITIC=YES
READY_FOR_CODEX=NO
PRODUCTION_IMPLEMENTED=NO
ALL_SEVEN_DA_ENABLED=NO

R2原文由用户当前转交，没有单独GitHub审查文件，不得虚构路径。DA-AR-02、DA-AR-03、DA-AR-05保留R2设计关闭。DA-AR-01、DA-AR-04均ACCEPT，Planner已完成以下具体选择并给出关闭证据候选；是否关闭留给独立Critic，不自签结论。

## 两项修订实际改变了什么

**DA-AR-01：03#r2-ar01。** 不再把init_task/PLAN_REQUESTED当自动独立审查。当前项目Reviewer只有在已有角色、明确进程授权、完整原材料和实际只读工具边界成立时，才由有限admission-review调用；父进程解析精确JSONL终态并消费。已有Review schedule补首轮Planner分支，既有watcher/原owner接返回；Control必须具体可执行原角色adapter。简单UI机械小修可SELF。同scope科学Planner决定可复用。没有自动通道则明确一次原角色人工恢复及claim限制，不用新任务/daemon掩盖。

**DA-AR-04：03#r2-completion、04#r2-ar04。** 撤回七个历史脚本finalizer作为通用出口；正常Stop、Lite退出、Review新鲜结果消费、Control终态前统一调用finish→check→report→accept_submission。即使模型省略manifest或显式finish，host仍从Admission与原结果索引构造提交。七仓原result位置、独立输入、状态、报告、恢复与绕过坏例都已冻结；直接写原result“就绪”不能通过受管接受。当前均待实现验证，未启用。

04#r2-normal-journeys从无Goal请求深入Lucerna、SeminarArc、CARE，另四仓核正式结果出口。高风险新长科学运行仍受原Goal/资源合同约束，不从普通请求擅自启动。现行GPT Work人工交接与Mica正常Edge手动边界如实保留，无活跃owner不承诺唤醒。

## 不变的机制与边界

验收器/ProjectAdapter的冻结四控制、独立准入、精确ACTIVE摘要、回执/CAS；成熟能力真实选择、读取/调用和实现影响；P0先于完整P1/P2，均保持。两级交付、回执去环、父子锁、共享预算、取消epoch、副作用未知先核对、科学充分负结果及七仓原专业归属没有放宽。

没有生产代码修改、宿主探针、模型角色进程、产品/账号/设备/GPU/付费/部署、邮件、task/agent/automation创建。没有新版本或平行目录。工程估算改为138–332小时、首片40–88小时，P0仍4–8；新增8–16小时是两项真实接线规划余量，不是本轮费用或实施授权。

## 固定来源与回读

- GitHub权限与精确分支已核；R2首次真实写入/回读ab3bb28d9cd3148725883983a5e9e53906adc7f5。
- 技术源 **79fe13a6ce3480732e206b33029cfa3b9fcf9a78** 已按同一固定提交完整取回14份文件并与待提交内容逐字核对；不是仅看目录或blob。
- CSV仍823唯一row_id、17列；前八列逐字段不变。DA-AR-03正文与被审包完全相同；DA-AR-02仅改正常host消费引用，不改准入机制。
- 技术源之后只更新08提示词及本CURRENT。最终package为本次送审CURRENT所在Git提交；交接消息提供其精确commit和全包回读结果，避免文件自嵌未来commit造成循环。独立Critic使用交接SHA固定读取，不追随分支HEAD。
- 研究main=daf797c79bcd777c27948da51c4218e5d95e7be3；AI Skills main=ca10623fe028114cfafc5ec7e5350800d5c8259c。
- Bridge release=ba9013b9fbbd242e51b09f9d09291f417df17652；开发分支最新核到76e2f14d5669867b2d4e3fa0950d8b2fedea7f35，新增相邻文档未改本轮生产入口；代码读取0de62固定链接仍准确。
- 七仓固定源见04/08。CUHK_Date更新到269fce644563e58afcb131470c68d28969e1532c，仅SEO相关变化；其余六仓未变。

## 唯一下一入口

[08_CRITIC_PROMPT.md](08_CRITIC_PROMPT.md) 是完整R3指令；[07审查包](07_INDEPENDENT_CRITIC_PACKAGE.md#r2-review)给两项调用链证据与三项保留关闭。只审两项及整体连带影响，同时重走普通用户完整路径。不是执行批准。

真实运行仍待后续明确授权：当前Windows/Desktop/CLI/Remote支持与加载、独立角色实际launch/return、已有schedule实际首轮消费、七仓正常入口好例/绕过坏例、同任务修复与取消恢复、实机/账号/科学观察和成本量测。没有这些证据不能标产品可用，但也不把当前可由架构决定的入口/消费者/恢复选择推给实施者。

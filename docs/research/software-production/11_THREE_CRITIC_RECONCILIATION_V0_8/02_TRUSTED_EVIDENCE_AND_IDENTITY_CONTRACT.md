# 第二卷：桌面、网页、科研模型的受保护证据与同一候选身份合同（B2）

性质：设计合同，尚未在用户真实系统部署，不声称受信任权限已经配置。不同领域保留各自真实操作，公共只定义**哪些事实是同一个被测对象、由谁真正测得、证据证明了什么**。机器数据字段为拟议，不强迫现有七项目重命名自己已有的产物。

## 1. 四类身份，任何一种混淆都禁止晋升

一项候选可以有：①源码快照（commit/dirty tree/脚本及依赖）；②构建产物（exe、APK、扩展包、网页构建、训练checkpoint）；③运行目标（Windows安装路径/PID与桌面会话、真实浏览器URL/部署版本、数据与模型版本）；④观察行为（受控动作、所见输入/输出和当时工具版本）。**哈希只说明字节一致，不能说明谁运行/动作发生/科学结论正确。**

- 源码改动：先判影响是否到达实际功能/构建，必要时失效相应观察；不是每次文档文字变化都重新安装。
- 观察器/测试器改动：只有被该观察器所证明的结果需要重新校准、必要时重新采集；产品二进制没变时不得因此重编、重装或新建昂贵模型。
- 报告/链接修订：只更新派生阅读材料与引用，不自动触发真GUI/Slurm重跑。
- 受信规则变化：由原权限Owner批准，必须核实不会放宽已有要求、误删旧回归；不能让实施者同一次差异提交新宽松参考就PASS。

## 2. 三类公共证据的最小字段

| 字段与来源 | 原生桌面 | 网页/浏览器 | 科研模型与结果 |
|---|---|---|---|
| candidate_source | repo/ref/已检出工作树源码身份 | 代码commit/静态构建和合法部署来源 | 仓库commit、配置、数据/折/预处理源版本 |
| artifact_identity | exe安装包/签名/摘要，目标exe实际路径 | 受测构建摘要、URL、构建部署标识，不能仅首页HTTP200 | checkpoint字节摘要、权重加载源、训练运行及必要optimizer/scheduler状态 |
| runtime_identity | 隔离Win会话、进程路径/PID、窗口HWND、真实DPI、有效账号 | Browser版本、上下文与隔离persona、实际URL及session，必要trace | 实际python/容器/Slurm job、CUDA环境、数据人群、fold、模型plans |
| observer_identity | 现有capturer版本、受控OS身份与真实执行时间 | Playwright版本/真正trace来源，原项目测试与浏览器使用身份 | 项目正式前向/评估脚本、独立指标参考版本与合法数据访问身份 |
| actions/inputs | 开面板→修改→取消/保存→重开、通知显示；不得只拍静态图 | 真UI输入点击导航、网络/DOM变化、服务后置；不能用page.evaluate(fetch)替代交互 | loader样本/参数/损失/梯度/优化步骤、正式模型预测与真实GT |
| postconditions | 实际状态、截图/日志、存储、秘密/通知后果和相邻旧行为 | 页面/后端持久状态、多用户隐私/登出/重新进入 | 真预测路径、子人群指标、权重/恢复、科学效应与获准NO_GO |
| result_and_limit | 哪些场景真实运行、哪些只受控Mock；无GUI环境NOT_PROVEN | 夹具页面不等真实已登录宿主/托管环境 | 短CPU探针不等长训练、代理Dice不等正式指标 |
| protection | 受限Win worker的原始记录；开发者不能覆写验证器与真实目标 | 独立浏览器/CI收原始trace，保护正式场景和提交来源 | 独立领域参考/评估器和合法集群身份；必要数据不能外发 |

以上每列必须来自真实可达项目脚本/OS/外部身份。各项目若已有等价证据格式，用**只读映射**指向它即可，**不要新建第二套截图/trace/checkpoint登记库**。

## 3. 推荐受控证据包形态（不是“字段填全就PASS”）

~~~json
{
  "schema": "assurance-evidence-proposal-v0.8",
  "approved_task_ref": "<existing-current-goal-and-revision>",
  "candidate": {
    "source": "<actual-source-snapshot>",
    "artifact": "<actual-built-artifact>",
    "runtime_target": "<actual-host-runtime-or-registered-model>",
    "semantic_version_key": "<verified-meaning-bearing-identity>"
  },
  "observation": {
    "owner": "<trusted-platform-owner>",
    "observer_version": "<observed-version>",
    "normal_entry": "<approved-actual-command-or-ui-sequence>",
    "actions": ["<actual-event-ref>"],
    "postconditions": ["<actual-observation-ref>"],
    "raw_evidence": "<immutable-access-controlled-uri>",
    "raw_sha256": "<computed-by-trusted-collector>",
    "input_scope": "<real-service-vs-controlled-boundary-vs-synthetic>",
    "run_conclusion": "PASS_FOR_THIS_SCENARIO|FAIL|SKIPPED|NOT_OBSERVED|OBSERVER_INVALID"
  },
  "independent_review": {
    "source": "<existing-Bridge-review-or-specialist>",
    "claim_limits": ["<only-what-was-truly-observed>"]
  }
}
~~~

字段字符串、声明PASS本身不会使其可信。结果消费端需核验有效项目授权、原始观察实际存在、原目标清单、同候选、观察端身份与校准资格以及重要后置状态；不能只核验与被审对象一起提交的manifest/sha。原始医学/用户秘密保留在受限环境，跨模型审查只拿必要脱敏材料，不能因脱敏后文字/视觉密度不同宣称看过完整真实体验。

## 4. 防止真正历史坏例从头到尾伪造成功

**Lucerna**：一张截图即使hash正确，仍需对应实际release.exe/source/PID/window/FrontendReady与当次启动会话；capture-lucerna-window.ps1已有这些部分能力但会ShowWindow/SetForegroundWindow，绝不能未经证明隔离便在用户正式桌面运行。假fixture从最终headline直接写“Available”，缺少从真实provider→聚合→header的变动路径→本次状态能力NOT_PROVEN。受控HTTP替身必须走正式解析/业务链；真实服务声明还要合法live响应。图片传输失败只补传，不重启/重安装。

**Bobbio**：真实用户资料不因“Safe Profile”四字变安全；需要实际Zotero进程、dataDir、OS URL处理器、更新缓存及被调用子脚本动作的前置确认。开发者给出的前后哈希如果没有受控OS隔离和可信采集，不能证明无个人数据被触碰。PreflightOnly实际可能调用Apply，因此其审查属性不能从开关名判断。

**CUHK Date**：真实表单证明要求输入、点击、导航、认证后状态和后端账户，直接API fetch绕表单只能用于Operator准备而不能作为注册UI正例。两个persona各自session与一次性票据记录必须隔离且绑定合法当前部署，HTTP200或同域服务在线不等真人用户流程完整。

**Mica**：固定DOM夹具、控制JSON和当前已登录ChatGPT宿主不等价；只有真实扩展包与当前宿主版本、回答选择/保存/恢复/原生输入共存、低内存目标条件才证明对应能力。关闭扩展获得“无损害”不能冒充“新增高亮功能”。

**CARE B6**：训练脚本报告14000步、保存一个模型或casewise_rowsCSV存在，都不能证明B4/B5权重接续、真实loader消费或Dice由预测/GT计算。B6历史纯函数对照完美/空预测同分必须失败；只有独立预测和真实参考评价可获得正式指标结论。权重、环境、fold和数据标签应与最终实际部署的checkpoint绑定。

**Asteria**：源码SVG虚拟坐标正确和屏幕DOM几何正确不同；几何数恒零或缺测归零不能作为无交叉证据，完整画面与科学关系解读另由合格Reviewer核查，不靠截图存在。

**SeminarArc**：真APK/设备serial、前台服务与Room、OCR文本与ZIP完整内容必须对应；如果脚本误读EditText，属于Observer假阴性，不能迫使产品去适配错误选择器。

## 5. 信任等级和禁止升级条件

- **开发证据**：实施者可本地修改测试与报告，可用于返修，不能自己签正式独立通过。
- **独立质量审计**：独立人员/模型拿完整原材料和实际观察，能发现专业问题，但若共享管理员身份可改源/规则，不声称强制防绕过。
- **技术受保护准入**：需实际限制实施者对必需检查、保留旧行为、验证工具、原始记录和发布凭据的修改权；并经跳过必需检查、伪造同名结果、旧候选、带写MCP、恶意构建等反证校准。没有真实权限配置时不可宣称这个等级。

必需检查SKIPPED/NEUTRAL不一定意味可信成功，且GitHub Actions按条件跳过job可能显示Success。受信者应确认本轮**预先确定的检查真的执行**、实际目标候选和来源身份、内容覆盖完整，而不是依赖UI绿色；默认不允许执行者随本轮提交降低必需集合。规则权限需核验计划和仓库种类：GitHub环境required reviewers在部分非公开仓库/计划有资格限制，不应假定用户当前私有项目必支持。外发审查者不得获得发布/模型训练凭据。

## 6. 哪些变更触发证据失效，避免无限重做

| 变化 | 需要重做 | 不应自动重做 |
|---|---|---|
| 改正式provider/业务状态/模型loss | 受影响的正式路径和旧行为回归、必要独立检查 | 无关的全部浏览器设备矩阵或旧科学大实验 |
| 改最终安装包/部署/模型checkpoint | 同候选相关原生/网页/科学观察 | 仅重复生成前一版审查汇总 |
| 改采集器/评分器 | 新观察器的好/坏/缺测校准；原受影响观察若无可靠原始数据需要重采 | 未变的源码/二进制再编、全部不相关正式训练 |
| 改报告/链接/文件定位 | 更正派生材料和引用，有必要重新核对档案身份 | 原生窗口反复重开、重新消耗一次性票据或Slurm预算 |
| 增加不在原合同的产品/科研门槛 | 由原批准者审变更/模型方案；合法新目标另按授权 | 旧候选被当违规并直接REVISE直到迎合审查者 |

真正的安全边界在现有CI、隔离操作系统/服务角色和项目正式脚本的前置授权，不在本JSON。若项目无法设置，则该项真实能力仍未满足，不能拿描述自称已经拒绝坏产物。

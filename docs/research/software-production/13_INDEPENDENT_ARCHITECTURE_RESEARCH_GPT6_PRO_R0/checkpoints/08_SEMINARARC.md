# SeminarArc：可恢复移动端流水线与硬件验收应保留各自权威

RUNNER_ID: GPT6_PRO
READ_DATE: 2026-10-15
SOURCE_REPOSITORY: YuukiAS/SeminarArc
SOURCE_REF: main
SOURCE_COMMIT: 5652fe17ce60625f3ff7c758fcc0183f920189de

## 实读来源

branches；AGENTS全文（25266b9aee82a8b202bf1e810d05eaf7baeceaf5）；README 1–190行（b857cd9364c5efd15160ac41d582c0e7f003fda7）；docs/DEVICE_TESTING.md 1–170行（a051ddf98804129f02d7c0461f94e5e2e2fcf2bc）；scripts/run-blackbox-acceptance.ps1 1–340行（90621151ee8e500fabe248d5225b730f6813d750）；app/src/main/java/com/yuukias/seminararc/media/processing/WorkManagerProcessingWorkScheduler.kt全文（c192def1e4bd29d58839368b700f5f51f39afb0a）；同目录ProcessingWorker.kt 1–140行（c13152f8caf2a0b7bfa5cae4f7364097e2f03bcf）。搜索仅定位代码。没有启动ADB、Emulator、Gradle或操作真机。

## 项目、入口与当前有效规则

原生Android、Kotlin/Compose/Room/WorkManager本地优先学术活动采集、录音拍照、重建/OCR、文献确认、公式和研究导出。用户通过安装的Internal APK完成活动内流程，素材必须属于seminar，录音由前台服务及Room持久状态拥有而非Activity内存。main外只有治理review分支，本次采用main。

README当前为0.5.0-alpha.2个人内测；自动生产者QA完成，但独立GPT Work待执行、正式发布不就绪。根AGENTS的“0.1.x禁OCR”是明确版本条件，不应误当0.5.x全局禁令；需按活动里程碑读取合同。未接真实ASR、在线总结、Notion上传或云公式识别，文档明确不可用而非假结果。

有效设备规则是WSL负责源码/JVM/无界面，Windows测试镜像绑定相同提交只做Emulator，不成为第二开发主线。真机只限授权的硬件/系统测试；设备通道坏不阻塞其余源码/模拟器工作。严禁为方便测试重置ADB、USB、WSL或挪用真实设备。历史目录大小写、JDK/SDK/缓存路径属于运行记录，必须现场发现不能硬编码为永远有效。

## 已有持久执行与恢复代码

WorkManagerProcessingWorkScheduler先建Room领域job，再enqueueUniqueWork，名称由job id确定；初次KEEP，用户retry经领域requeue后REPLACE，cancel同时取消WorkManager并标记领域取消；恢复读取中断job并KEEP调度。摘要/公式输入保存payload，手动LaTeX按区域/来源/文本生成指纹；转写要求录音确已COMPLETED。现有Android运行时拥有该调度，统一层不得另建轮询者重复处理媒体。

ProcessingWorker实际读回领域job：无效/缺失/取消则失败，已成功则直接成功，否则按类型调用；未接的NOTION_EXPORT_PREP明确不可重试失败，普通异常写领域失败、可重试标记，取消写取消。它不是“不管发生什么都重试直到绿”。本次只读前140行，不审计所有持久化事务；例如图像重试requestFor回到默认参数是否符合原请求，需要专项验证，不能先宣称全类型精确恢复。

## 验收实现与证据边界

黑盒脚本真实调用进程/ADB并限时，先枚举设备，只选device状态的emulator-*；多台时要求显式选择，物理设备可见仍仅给选中模拟器加-s操作，不通过reset获得清洁环境。它构建/安装internal APK、从真实UI抓树/截图等，故是有副作用的测试入口，本轮不执行。已读段只证明选设备与启动边界，不能宣布全脚本安全认证。

DEVICE_TESTING的历史事故包括WSL互操作失败/盘只读、混合设备inventory不能跑无目标connected任务、Android偏好路径冲突、JBR与Gradle不兼容；这些是特定环境事实，不是生产功能坏。README报告24项instrumentation、真实派生照片9/9、33视觉状态、3750压力事件、API29/36通过，但这些是仓库记录而非本轮重跑。尤其CameraX模拟器限制没有改写成相机PASS、两段录音inventory未冒充录音导入能力、普通视觉回归禁止自动覆盖golden，是应保留的诚实边界。

## 对候选的约束

最小适配需APK/源码/签名/包名/版本绑定、独立模拟器身份、场景与Room/文件一致性、真实媒体后置条件、生命周期/迁移/导出语义，而非只跑Gradle。模拟器能关闭普通按钮、持久化和清理缺陷，不能证明真机麦克风质量、真实投影拍照、厂商锁屏后台；这些少量最终人工项目是合理边界，不得作为把普通QA推给用户的借口。文献匹配分数必须是启发式而非假概率，公式/转写本地人工输入必须与真实提供者输出分开；形式正确的文件不等于学术内容正确。

下一仓库：Asteria。

# 七仓落地合同：同一架构，保留各自真实验收

本文件将真实源码/历史报告与**待实现接线**分开。固定SHA来自本轮GitHub读取；所有正向/坏链的DA步骤均是设计推演，不是本轮设备、账号、GPU或部署运行。代表性完整结果文件已读，但私有原始图片/媒体/医学数据、原生安装对象及外部Figma未在本轮观察；不宣称其视觉或科学审查通过。三条深度示范分别覆盖桌面数据、Android持久化与科学训练。

## Lucerna：真实刷新、状态真值与旧额度（深度示范）

**基线与成品。** main `79dd2875d3da33c6a6d80e5e35bea812b84c1ceb`；用户消费Windows release EXE的托盘/窗口/通知和真实provider状态，不是浏览器截图。已有[provider_runtime.rs](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/src-tauri/src/provider_runtime.rs#L387)的background_loop→refresh_now及freshness；[codex_quota.rs](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/src-tauri/src/codex_quota.rs#L41)的Provider→read_codex_usage_limits→parse；[lib.rs](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/src-tauri/src/lib.rs#L730) refresh_providers发起刷新。额度字段是Option，缺数据不能自动变0。当前Mathpix 680不是本轮确认的源码缺陷，作为用户给定对抗例保留。

**请求→早期缺口。** 用户要求“新增可信用量并让刷新真实更新”。K1拟从普通消息记录原义；K2读有效产品合同，区分已用量/剩余量、账号/周期/单位以及旧Codex/OpenAI/Longleaf行为。若API没有可信上限，产生标准/数据源缺口，不能先做假余额UI。若已有标准但缺数据映射测试，当前Executor收到03 E7的BUILD_VALIDATOR，在现有state-truth类别加样例。

**第一条链与错误。** 已有Rust provider→共享聚合→Tauri UI是第一纵向链。首先运行低成本两输入与缺证样例；恒680、null→0或“未观测”→“故障”应失败。真实历史[L17相关产品修复](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/results/01054_final_independent_release_acceptance/repair-product-001.md)说明曾把Longleaf的checking/未观测当故障；应保护正常Available与真实secondary failure的区别。该报告是历史修复证据，不是今天实测。

**正式运行与反馈。** 复用[development-acceptance.ps1](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/scripts/development-acceptance.ps1#L143)：Assert-CandidateAdmission、Test-SmokeCaptureEligibility、Test-CaptureSameRunBinding；新增小result adapter读取其原始结果，不重写native runner。W1=actual/expected/source/candidate/invalidations由当前Codex直接收到；真实产品坏修provider，误抓PID修采集。修后重跑受影响quota/freshness/UI状态，保留无关Zotero证据的复用理由。正式release仍进入[独立原生合同](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/docs/workflows/LUCERNA_INDEPENDENT_RELEASE_ACCEPTANCE.md)；原local orchestrator拥有最多三轮，不与Stop/Review相加，不自动改为Control。

**不能跳过观察器。** [repair-harness-006](https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/results/01054_final_independent_release_acceptance/repair-harness-006.md)记录sandbox停在backend-ready而native host成功；后来采用有界输出drain、同run PID和capture。反例是旧EXE路径相同、PID不同，或Producer截图给Reviewer用；须拒绝当前安装claim。现有SelfTest/pack-builder测试不是实机验收。

**最终对象/报告/退出。** 最终记录源码semantic digest、EXE hash、独立Reviewer自己产生的smoke→PID→capture及真实刷新后置状态。给用户报告新增回归、旧quota通过与仍无权限的LIVE范围；不让用户先试按钮找bug。本轮没有桌面/账户权限，不启动任何实例或Reviewer子进程。接入回退仅撤销DA适配调用，保留已有验收和新回归；不改网络/tunnel/SSH/VPN。试点若不能从普通请求送失败回同任务，G1/G4不关闭。

### Lucerna 第21号九问逐项答复

1. 普通请求沿03 E2原生拟接入，先产生provider真实来源/刷新/旧quota义务；当前无已验证原生全保障，G1。
2. 项目owner须核实官方账户、单位、周期、上限与更新时间；本研究未发现当前Mathpix实现，也未访问真实账户。
3. 两组1000−320、1000−500与缺limit输入同runner；恒680第二组FAIL；W2经当前命令或原owner回原task，不能只留报告。
4. provider_runtime/lib/main共享变更沿消费者图选codex_quota、OpenAI、Longleaf真实状态与null/freshness；隔离模块按来源证据缩小。
5. 复用Assert-CandidateAdmission、Test-CaptureSameRunBinding和独立reviewer自身smoke→PID→capture；源码/EXE/hash/PID/run_id一起绑定。
6. 错误PID/旧截图路由observer/provenance，修采集后重采；不改正确产品以迎合错误脚本。
7. 当前研究不操作桌面；未来精确Windows native授权，私有桌面只有相应工具与合同证明才算等价，sandbox screenshot不得冒充。
8. Lucerna原生审查最多三轮由local orchestrator管；Bridge不新增Control或Stop额外预算；独立context需实际获权启动，当前不启动。
9. 加固既有state-truth类别与scripts，维护位置在项目，报告新增/复用/未跑；停用不能删真实额度原目标。

## SeminarArc：安装后的保存与重启（深度示范）

**基线与成品。** main `5652fe17ce60625f3ff7c758fcc0183f920189de`。真实对象是指定APK安装实例及Room/文件存储、导出物。现有[run-blackbox-acceptance.ps1](https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/scripts/run-blackbox-acceptance.ps1#L239)明确Select-EmulatorSerial、Build-And-Install、Run-B01至B08；这些会安装、清状态、强停App，研究只读，不能因“test”名字就获权。

**请求→选择。** 用户说“只拍照的会议也能结束，重启不能丢笔记”。K1保留原task；K2沿EndSeminarUseCase/RecordingServiceStarter/Room影响，复用B02持久化、B03权限拒绝与photos-only分支、B04媒体。共享Room schema则扩大读写/迁移/search/export闭包；若没有重启后置检查，补已有runner而非新建Android平台。

**历史错误→因果修复。** [历史harness结果](https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/prompts/tasks/0.5.x_blackbox_acceptance_harness_result.md)记录photos-only结束触发ForegroundServiceDidNotStartInTimeException。当前[EndSeminarUseCase](https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/app/src/main/java/com/yuukias/seminararc/domain/usecase/EndSeminarUseCase.kt#L20)先判断live recording；无live时只有open recording ids非空才stop。[RecordingServiceStarter](https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/app/src/main/java/com/yuukias/seminararc/recording/service/RecordingServiceStarter.kt#L21)停止使用普通startService。这是已存在的修复路径；拟DA把崩溃与对应动作日志转为同task IMPLEMENTATION_BUG，不把整个Android环境判坏。

**正向全链。** 原Executor构建候选→获权的exact serial安装→用户路径创建/编辑/结束→[Run-B02](https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/scripts/run-blackbox-acceptance.ps1#L1674)强停、重启、搜索读回→原始UI/日志/DB或导出内容证据→adapt_result逐义务→K4同APK/serial核验→原Parent接受/返修。bad按钮只改UI不落盘会在强停后失败，原Codex获得缺失对象ID与expected state；修repository/transaction后重跑B02和受影响媒体/录音旧路径。不能只看Save按钮点击成功。

**误判与旧能力。** [真实媒体第二轮](https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/prompts/tasks/0.5.x_real_world_media_corpus_round_02_result.md)撤销OCR 0/5：选择器读错带标签EditText。历史报告9/9照片重启保留，外部录音仅盘点且明确无产品导入。拟适配必须保留这种observer fault与产品false negative区别；不为过检查改正确OCR，不用文件非空证明导出完整。

**完成/回退。** [verify-gpt-work-acceptance.ps1](https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/scripts/verify-gpt-work-acceptance.ps1#L234)的SkipDynamicProbe返回NOT_EVALUATED，不能被PASS汇总吞掉。最终报告“指定模拟器安装和持久化已证，物理麦克风/相机/OEM仍未证”，并列新增/加固/复用检查。真机与私有素材本研究未访问。适配回退保留B02/B04/B07及migration测试；只有工具/文档变更不自动发新alpha逼用户安装。

### SeminarArc 第21号九问逐项答复

1. 正式runner Build-And-Install选择明确AVD与APK；首条纵向链在稳定小功能时运行，不能等全应用结束才发现按钮假保存。
2. Run-B02创建/编辑→Force-Stop-App→Launch-App→搜索读回；B04/B07对照片OCR/公式持久化和导出，硬件录音另证。
3. 模拟器证明安装/逻辑/权限分支；真实麦克风相机锁屏/OEM与低存储必须指定物理设备，不混签。
4. Room migrations影响所有读写消费者：seminar、note、photo、recording、search/export；不能只测新增表。
5. 项目owner维护harness/OCR selector；S11旧0/5为误读EditText，已被历史9/9撤销，不能逼产品改OCR。
6. golden更新是新候选输入，独立视觉标准不随之更新；bad控件遮挡/保存失败必须仍被拒。
7. 记录APK hash/package/version/signature、明确serial、install/time、run_id、后置持久化；同图跨APK无效。
8. 当前不跑任何设备；未来真机缺权保持hardware UNKNOWN，有授权的仿真/代码工作可继续。
9. 按当前项目冻结repair预算，未明确的三轮不能从Lucerna搬来；同因无新信息根因审计，原task保留失败与恢复。

## CARE：机制、实际训练与科学负结果（深度示范）

**基线与成品。** main `75a40e454de43b64e59a0b0b438ff57ef2bb8345`；现行[Planner协议](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/GPT_PLANNER_CARE_PROTOCOL.md)与[CURRENT](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/routes/handoffs/CURRENT.md)规定main-only，历史Route A/B/C不是活动控制器。最终对象可能是被实际消费的checkpoint/预测/医学指标/完整报告或提交archive；每种须自己的声明。当前协议默认不启用planning critic/reviewer，DA不得把所有科学任务升级Control。本研究未视觉读取SRR原图，不制定新模型路线或科学阈值。

**请求与不降级。** 用一个历史批准的bounded train/eval任务作演绎：科学Planner已经冻结模型、数据split、500步/1800秒/2次validation及病例最低数。K2从原合同提取，不能把这组历史数字推广成所有CARE任务默认。当前[run_care_ase_train.py](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/scripts/training/care_ase/run_care_ase_train.py#L115)是另一正式入口，硬约束14000步并实际backward/optimizer.step；它不能拿来替代历史Route B的语义或未获准的R2 v9。

**真实失败。** [反偷懒协议](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/prompts/routes/ROUTE_ANTI_LAZINESS_PROTOCOL.md)记录Route B实际只12步/1.145秒、formal_training_submitted=false且没有Slurm job，却以undertrained终止。K3必须在第一条纵向链比较实跑counter/时间/数据总体与冻结门槛，产生SCALE_SHORTFALL，禁止完成声明。配置写500无用；utility存在无用；需实际调用/梯度/输入干预。已有[anti-laziness validator](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/scripts/validation/validate_srr_v25_anti_laziness.py)与[结果](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/20260704_srr_v25_anti_laziness_acceptance_tests/result.md)明确utility未消费/正式源不对/claim缺runtime；复用它而非从零新写科研总评分。

**同任务返修与终态。** 当前Controller收到包含原合同+实跑统计+命令+job lineage的工作项。若启动环境错（历史裸python无torch），在已授权相同scope修env、训练credit为0，由原Controller决定合法retry；若缺GPU批准，必须停相关执行，不能把12步算等价。PENDING只等待，不再sbatch。已有[care_milestone_finalizer.py](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/scripts/ops/care_milestone_finalizer.py#L456)读取sacct、分类失败、查runtime outputs、aggregation、mapper、validators；最后是PACKET_COMMITTED_FOR_REVIEW或READY_FOR_LOCAL_PACKET_COMMIT，非科学成功。其accounting continuation有潜在资源启动，仍需原授权，DA不调用另一套scheduler。拟adapt_finalizer_result将分项交原Controller，且必须以真实controller consumption试点关闭G4。

**校准与恢复训练。** 已读[freeze_reload.py](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/scripts/validation/validate_care_ase_freeze_reload.py#L69)比较同checkpoint两次eval，不能证明断线后继续训练等价。拟补连续k+m与独立进程resume m的对照，绑定真实batch内容、RNG、optimizer/scheduler、参数轨迹；容差由科学合同/数值环境决定。good连续/恢复符合合同，bad丢RNG或sampler必须拒绝，unchanged no-T2语义/固定split/已接受baseline保留。不能把snapshot receipt更新变新semantic candidate导致反复训练。

**允许负结果。** batch7的[training_stage_adequacy](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/20260721_srr_batch7_mechanism_closure_repair/training_stage_adequacy.json)记录600步、help25/harm27、continuation FAIL；[validator_status](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/results/20260721_srr_batch7_mechanism_closure_repair/validator_status.json)同时PASS。前者是科学方向不足，后者是证据检查正常，不能平均成成功也不能继续训练直到正面。原Planner决定STOP/下一路线，执行者只保留可信负结论。

**最终报告与回退。** 报告分别写结构/机制、规模、实际输出、科学结论、未证环境及新/旧验收变化；私有医学数据、GPU和上传在本研究均未触及。最新CURRENT还有已报告的单层输入archive修复与训练前外审等待，不能恢复旧route。回退撤销DA适配，保留科学validators、最终器和原job lineage，不取消job或删除checkpoint。

### CARE 第21号九问逐项答复

1. 科学Planner冻结model/loss/split/budget/selection，当前协议默认不新增Critic；本研究不新定SRR路线、不复活历史route。
2. 正式entry实际model.forward/loss/backward/optimizer上观测梯度与干预；args存在、utility文件存在不算消费。
3. 冻结adequacy与实跑step/time/eval population逐项比，历史12步1.145秒不得抵500步1800秒；也检查病例GT非空与分组。
4. 原Controller/finalizer读取sacct终态、lock与job lineage；DA不sbatch/scancel或发第二scheduler。
5. code/env/input/split→job→checkpoint hash→预测/GT几何→metrics→报告；终态后重新aggregation，不复制旧CSV。
6. validator错误回程序owner，证据缺失回Controller，充分600步科学FAIL回Planner；不能为正面结论改阈值。
7. 连续k+m步对照k步checkpoint后独立进程恢复m步，比较batch真实内容/RNG/optimizer/scheduler与参数轨迹；两次eval同checkpoint不足。
8. 私有医学数据/GPU/Slurm/外传当前禁止；未来exact授权与预算由原owner持有，同task恢复不重复提交。
9. 合格负结果需足够数据/机制/规模并忠实报告；实现失败不能称科学NO_GO，下一路线是科学Planner/用户决定。

## Bobbio：隔离Zotero、版本权威与最终Reader

**有效版本。** main `e7d929bad2d4b23939c81920e77390efbce42b96`代表已接受0.2；develop `a64edfd6c5b11f81599bfcfc327be5964633a7b5`代表0.3当前阶段。[CURRENT_MILESTONE](https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/docs/CURRENT_MILESTONE.md)明确LOCAL_CODEX_READY不等FINAL_NATIVE_INTEGRATION_READY/USER_REVIEW_READY。项目正常开发在develop，生产Windows native；本研究不切分支。最终用户从真实快捷方式打开EXE与隔离Zotero验证，不把浏览器fixture当原生验收。

**逐跳任务。** 用户要求增强批注→K1锁定0.3合同→K2选择Zotero primitive可见性、PDF不变、缓存重建、旧0.2批注及whole-screen/perf→现Executor修Reader/Rust→项目[Safe runner](https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/scripts/Invoke-BobbioReaderAcceptanceSafe.ps1#L339)核对测试profile/data-dir与真实目录不同→正式批注增/读/改色/删→before/after审计和PDF hash→adapt_result→既有milestone gate。已直接补查develop [zotero_client.rs](https://github.com/YuukiAS/Bobbio/blob/a64edfd6c5b11f81599bfcfc327be5964633a7b5/src-tauri/src/zotero_client.rs#L242)：read_attachment_annotations在242行、authorize_local_writes在407行、mutate_attachment_annotation在526行，实际写路径检查Zotero-Server-ID/写能力/API授权。main旧实现只作基线，不替develop身份背书。

**最高风险坏链。** 新profile仍指向真实data-dir，或裸zotero://路由默认profile：前置断言必须在启动之前拒绝，权限/隔离owner修测试环境，不得先操作后补“未触碰”receipt。命名Safe/Preflight不证明只读，runner含准备/缓存修复动作；必须冻结exact effect。另一坏链是0.2产品Work PASS直接签0.3用户可用，K4版本和必需最终native gate应阻止。

**good/unchanged/恢复。** 正常隔离环境批注往返后在Zotero可见、PDF字节不变、cache删除后仍保留；视觉修正不得破坏Inspector性能和论文切换/历史Candidate归属。开发期fake API性能只证明受控性能。失败分类给原Executor或runner维护者，版本冲突给项目owner；不让用户替系统搬运审查。拟修改只限既有安全runner结果输出及任务接点；回退保留安全断言和原门槛。最终GUI、真实Zotero、Figma整屏观察本轮未执行。

### Bobbio 第21号九问逐项答复

1. main e7d929b=0.2接受基线，develop a64edfd=0.3当前；CURRENT_MILESTONE按分支读取，旧0.2不能替0.3签字。
2. Safe runner解析ProfilePath/TestDataDir/RealDataDir/UntouchedProfilePath，检测系统URL handler与更新缓存；专用profile名字不保证隔离。
3. mutate_attachment_annotation→Zotero API→read_attachment_annotations读回增改删；PDF前后hash与cache rebuild一起检查。
4. fake API性能只证明受控Reader，真实Zotero往返单列；product Work PASS后仍须final isolated-native acceptance。
5. Assert-ZoteroStopped、无裸zotero://、before/after真实profile与dataDir只读审计；精确实例身份和授权缺一不可。
6. 0.3新工具复用0.2批注/PDF不变/缓存权威，新增增强语义兼容和whole-screen；旧不同候选图不能复用。
7. runner本身异常修安全程序/采集；可见Reader状态/annotation错误修产品，保持Zotero单一权威。
8. 无GUI可做源码/测试夹具，原生与最终用户快捷方式仍未证；不绕过用户当前未授权桌面。
9. Bobbio项目owner维护实例，领域标准由对应owner；退休需保留PDF不变、隔离及原生批注替代覆盖。

## Mica：实际加载的扩展与低内存证据边界

**两条来源必须分开。** main `7059c0dc24b908b57bd0e1f475142ba4f4520621`与有效重构分支 `codex/mica-product-system-rebuild@0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c`。已读重构[AGENTS](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/AGENTS.md)、[package](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/package.json)、[acceptance CLI](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/scripts/acceptance/cli.mjs)与[validator](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/scripts/acceptance/validator.mjs)。0.2.3根package不是唯一runtime真值，AGENTS指定release-config与built manifest。10/05 Goal已superseded，10/12产品标准优先；不将延后的Reliability/Notion混入当前里程碑。

**逐跳任务。** “长线程占用更低，高亮/复制不能坏”→K1当前rebuild目标→K2选ChatGPTAdapter/low-memory/data-plane/恢复与旧typing/IME/streaming/tools→现Executor→现有focused/pressure/E2E→cli candidate调用validateBundle→原Parent Controller收候选结果→actual-surface Reviewer及最后手动登录态验收。已有[low-memory-background](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/extension/src/low-memory/low-memory-background.ts#L98)的syncRegistration/prepareFullHistory维护注册与恢复，拟只加结果适配/消费，不能另造常驻诊断轮询。

**最高风险链。** 合成90回合或把功能默认关掉能绿，但真实宿主没有收益；候选需要A absent/B installed off/C on同负载。历史[low-memory candidate](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/results/mica-product-system-rebuild/low-memory-candidate-report.md)绑定57fa880，报告C heap下降而process private memory较B升1.67%，明确target-class非物理设备、独立审查待定。不能把旧report或JSON哈希当当前HEAD已安装/加载/真实低内存通过。

**good/旧保护/失败。** 正常全图校验与可信恢复可减少保留graph并保全服务端历史；未知结构fail-open是安全行为，但不能签Low Memory功能完成。bad丢branch/tool依赖、synthetic click触发reload、错误回答归属须同入口拒绝；unchanged typing/IME不增加同步DOM扫描，高亮恢复/PDF可选数学在各里程碑保留。validator包变异负例只证明包校验，不等真实坏实现端到端，G3。

**权限与退出。** 当前AGENTS明确禁止自动化用户正常Edge profile，最终登录态手动；DA不能用别的browser绕过。系统应把普通缺陷先修好、内建报告减少手动负担，但这一人类边界不能消失。回退保持dist/mica-dev稳定路径、原生fail-open和历史恢复，不自动新Release；正式更新须实际loaded version与被批准milestone一致。本轮无浏览器/账号运行。

### Mica 第21号九问逐项答复

1. AGENTS指定scripts/release-config.mjs为runtime版本authority；source→dist/mica-dev→实际MV3加载实例/manifest；根package 0.2.3不能单独定runtime。
2. main7059c0d与rebuild0aee22f分开；fixture/local browser/current-derived/target-class/物理设备/登录态各自结论，未证不能升级。
3. content/adapter/low-memory共享变更选typing/IME、streaming/edit/branch/tools/connectors/auth、history restore；文档不跑全量E2E。
4. Low Memory不能关闭或以native virtualization冒充收益；冻结A/B/C标准，隐私约束不因性能放松。
5. ChatGPTAdapter集中识别当前变体；builtin compatibility report+真实派生fixture更新，禁止让用户跑DevTools脚本。
6. 项目AGENTS明确最终登录态手动且禁止自动化正常Edge profile；系统只能集中最小人类动作，原承诺存在不可消除的账户边界。
7. 分别报告process private memory/heap/retained graph/输入延迟；256MiB V8约束不是物理低内存，报告已有C私有内存高于B不能说内存全面下降。
8. 现有Parent Goal接收candidate/validator结果；无实际后台消费证据标G4；用户仅不可代理的最后登录态验收，普通缺陷先old-bad/new-good修。
9. 暂停某host能力保留fail-open和明确未支持状态；不把安全降级算产品功能完成；依赖消费者需重新适配。

## Asteria：真实几何、科学语义和评分器不能自签

**成品与入口。** main `193c033659a7612a99442763077217b130e9b756`；用户消费固定URL的科学图、Inspector与交互。已有package test:browser/test:regression、[RC19 static validator](https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/scripts/validate-architecture-rc19.mjs#L18)、[浏览器量测](https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/tests/browser/asteria-v2-rc.spec.ts#L2253)及[历史结果](https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/results/asteria--rc19-layout-first-graph-convergence/result.md)。本研究未打开公网界面，不能评现在外观。

**逐跳任务。** “图更好读且保留科学关系”→K2把geometry、scientific graph与whole-screen阅读分开→当前Executor修改layout/projection→Playwright实测屏幕DOM/SVG→独立科学/完整视觉审阅→候选与固定URL/status对齐→既有交付owner。拟改routeGestalt/rc19RouteGestalt的测量与source diff，并加结果消费；不新造总评分平台。

**源码反例。** static helper crossing/floating计数恒0，缺ratio变0；browser helper crossing恒0、ratio来自产品data-*且缺值变0，但floating实际有读取，不能误写全都恒0。changedProtectedTruthFiles仅git diff --name-only --，漏staged/committed。新增正确量测应从真实路径/矩形计算交叉/遮挡、标注缺测，并以交叉坏图与完整正确图校准。不是把阈值调到现候选能过。

**历史与旧行为。** [RC11失败](https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/docs/operations/acceptance/RC11_PRE_WORK_VISUAL_REVIEW_FAILURE_2026-09-13.md)自动绿但箭头视觉过重、selector可见不一致；RC19报告承认改过旧RC validator。必须按原科学源确认关系/索引/trace不变、选择trace-off不挪图，不能删节点或箭头骗清爽。几何good仍可被科学阅读判FAIL，反馈附实际图/原条款回同task；错采集修采集器。未见图/不同viewport对泛化作否决。

**发布与回退。** 历史公开rc19刷新不是当前在线证据；部署必须另授权且回读固定URL/API身份。退休累加RC测试要把旧bad迁入长期不变量，不删保护。回退DA adapter保留独立geometry/科学测试；本研究既不改validator也不发布。

### Asteria 第21号九问逐项答复

1. layout/projection改动映射geometry、canonical graph/trace、whole scientific surface三义务；各有专业判断，不压一总分。
2. 当前static routeGestalt crossing/floating常0、缺ratio降0；必须独立DOM/SVG观测并对缺值UNKNOWN，不能信app data-*。
3. 标准/阈值/known-bad由专业owner候选前冻结；实现与validator并改须独立复核，A39不是自动认罪但要校准。
4. 固定公网URL与/api/asteria/status必须匹配最终候选；本研究未访问或部署它，历史rc19报告不等当前上线验收。
5. 几何无碰撞不等科学正确/可读，canonical scientific reviewer与whole-screen reviewer消费完整图和原科学源。
6. Work包包含完整图、DOM/layout、source identity及限制；未提供可读原图不能用Producer自评替代。
7. 普通非语义文本只局部/溢出检查；公共布局、科学prose或trace变化才扩大相应闭包，避免累加所有RC检查。
8. 独立新鲜REVISE回原task，先修局部并重看整图；固定入口部署需另授权，不偷建临时URL规避。
9. 退休重复RC测试要证明旧bad到新长期不变量的映射；保留scientific truth和未见图，不能删失败测试取得绿灯。

## CUHK_Date：可见注册、会话事务与正式发布

**成品/基线。** main `9f25c7754d3c80d0be74f5b71016320f55753ae6`；真实用户路径跨Web/API/数据库/会话与campaign。已有[runRegistrationCriticalPathHosted](https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/scripts/registration-critical-path-hosted.ts#L68)、[Parent preflight](https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/scripts/verify-gpt-work-parent-delivery-preflight.ts#L155)、[evaluateParentDeliveryGate](https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/packages/api-contract/src/parent-delivery-gate.ts#L198)，不需要第二黑盒活动系统。

**逐跳正向。** “新用户设置密码并进入问卷”→K2选auth/onboarding与persona→可见CTA/form submit→后置API/DB只读验证→parent gate检查same credential semantics/source+Web/API部署+required surface→既有Parent Work发合法独立审查→新鲜反馈回原产品task；相同snapshot沿原campaign，产品修复改变部署snapshot时须关闭旧Parent并按原权限准备新campaign。fixture预演与final personas/tickets分离；传输/浏览器能力预检发生在消耗票据之前。

**两条真实坏链。** [注册假绿历史](https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/prompts/CODEX_REPAIR_REAL_REGISTRATION_CRITICAL_PATH_AND_FALSE_GREEN_HARNESS_2026-09-24.md)：bootstrap密码与用户要设置密码相同，UI422；旧预检另造随机密码并用fetch跳过表单，因而绿。正确回归必须同密码语义+可见表单，不能把same_password当成功。票据链[handleAuditTicketSession](https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/apps/web/app/(root)/audit/handoff/handler.ts#L70)先claim、认证/expected product state成功后finalize，失败release；[历史修复](https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/HANDOFF_CLAIM_LEASE_FINAL_REPAIR_2026-10-04.md)已有no-burn/lease/concurrency canary。拟适配读取这些真实结果；响应丢失与跨persona仍需同候选测试，不能只信输入PASS字段。

**旧行为/反馈/特殊权限。** 保留问卷只读重入、隐私/照片冻结状态、production audit入口fail-closed；共享session缺陷扩大所有依赖persona，不用一例签全活动。真正logout/账号污染不当工具故障恢复；只恢复合法session loss。Controller必须实际消费新鲜报告，否则G4；用户不用手拼子任务不等当前研究获准创建子任务。

**退出/上线。** Web/API/DB deployment+campaign/round+persona vector不一致阻止ready；依赖消费时再健康检查。staging PASS只准送审，正式Matching上线仍用户当前授权。回滚适配不回滚数据库/票据；底层修复若要迁移按原生产备份与授权合同，当前不执行。

### CUHK_Date 第21号九问逐项答复

1. 原请求与真实API/Web/schema依赖选persona与surface，auth/onboarding早跑visible critical path，非所有改动全campaign。
2. 普通任务拟将work item送已有Parent preflight/evaluateParentDeliveryGate；Parent多任务创建仍需当前权限，不能假称自动调度已存在。
3. 候选向量绑定source commit、Web/API deployment、DB migration、campaign/round/persona/expected state与观察时刻。
4. claim→auth/product-state→finalize；失败release，测downstream失败不burn、lease retry、并发和wrong identity；response-loss还需补证。
5. sacrificial预演与final personas/tickets不同但合同同；final holdout未暴露，预演不能消耗final。
6. 纯黑盒Reviewer只见操作合同和合法票据，无内部答案；浏览器/session隔离且工具预检先于领票据。
7. 共享auth/session缺陷扩大所有依赖persona，局部内容仅相关；一persona成功不签全campaign。
8. staging质量只允许送审；真实Matching开放/正式部署保持明确当前用户决策，不由Parent PASS授权。
9. 同campaign记录claim/lease/预期状态/候选；合法工具session丢失才恢复，真实logout/账号污染是产品失败；无自动connector保留G4。

## 共同接入/退出完成条件

每仓最小接入是：实际入口消费K2结果、项目runner提供真实原始观察、K4拒绝坏例/缺证、失败实际抵达原执行者、同候选修复后旧行为不变；不能仅提交adapter文件。每仓独立保存源码/安装/加载/运行/审查/发布证据，不一仓代签。正式接入还需06分包审批与平台验证。退出先恢复项目原生检查的直接调用、保留未决task和回归，再移除DA接点，不删除保护；当前不实施。

## 后续源码反证：活动连续性不是复用旧Parent

[CUHK campaign正式合同](https://github.com/YuukiAS/CUHK_Date/blob/9f25c7754d3c80d0be74f5b71016320f55753ae6/docs/operations/blackbox-audit/CAMPAIGN_ORCHESTRATION.md)明确：新部署snapshot后旧Parent永久结束，不继续其尚未运行persona、不复用旧handoff；为新snapshot准备新的受影响persona活动。产品任务、问题来源与预算保持连续，活动创建仍受当前用户权限限制。相同snapshot的纯工具session loss只有符合原合同的有限恢复例外。DA不能用“同任务返修”覆盖这个边界，也不能据本研究自动创建Parent。

[Mica Foundation r4](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/results/mica-product-system-rebuild/foundation-review-r4-repair.md)补证展示validator-only修复：完整placement proof的协调伪造负例被拒、dist不变可复用相应runtime证据；文档明确仍是review candidate且没有登录态最终验收。它支持语义输入失效设计，不支持same-user防伪已解决。

## D5 七仓真实实验合同：设计已选择，运行尚未授权或证明

以下上限是**拟议首轮试点资源上限，不是已测耗时或当前授权**。超时/超额保留未完成、回原owner重估，不能缩小样本/换方法后宣称原目标完成。每仓的最终Gate仍由上文现行产品合同决定；这里只限定证明 DA 接线的最小实验，不替代全部产品验收。普通一次模型修复和父进程resume共用03 D4预算；项目原流程更小上限优先。所有真设备/账号/部署/GPU动作在未来精确授权前为0次。

|仓库／最终对象|确定的实施边界与首轮输入|必须成功、拒绝、保护的控制|实验上限、合法入口与回收|
|---|---|---|---|
|Lucerna／真实Windows EXE、托盘窗口和provider|扩展现有development-acceptance输出适配、provider-state测试和交付报告消费；两组quota输入＋缺值＋未观测/secondary failure；候选EXE hash/PID绑定|正常刷新确有后置变化；固定680/unknown变0/旧PID拒绝；旧Codex/OpenAI/Longleaf状态与退出/重开保留|机械层1次套件＋最多2次修复复跑；获权后1个隔离Windows会话、1个候选、最多2次启动/采集、60分钟；真实provider访问只对明确获权账户且最多2次刷新；退出仅关闭本次测试实例，原安装不覆盖，回退DA适配不动网络配置|
|Bobbio／develop对应EXE＋指定隔离Zotero Reader|只改Safe runner结果适配/既有安全断言与受影响Reader回归；固定测试profile/dataDir/两份测试论文；before/after审核真实目录无变化|新增/改色/删除批注真实API读回且PDF字节不变；测试目录指真实dataDir、裸URL handler、旧0.2签0.3拒绝；论文切换和原批注cache重建保持|源码/fixture一轮＋最多2次复跑；真实阶段1个独立测试profile、2份非私有PDF、每篇1个测试annotation生命周期、90分钟；启动前断言失败则0次GUI动作；恢复前核对本次备份及测试profile身份，清理仅本次测试对象，不自动启动/关闭真实Zotero|
|Mica／稳定dist路径实际加载的MV3扩展、最终PDF|复用preflight/focused/candidate/validateBundle；绑定release-config/build manifest/loaded identity；先Foundation→Low Memory→Highlighter→PDF按现行顺序|A/B/C同负载区分heap与process；关功能不算收益；错answer归属/ambiguous anchor拒绝；typing/IME、历史恢复、工具branch、高亮/PDF保持|fixture 1个全候选＋2次局部修复；目标类性能仅按原合同规模跑一次完整A/B/C，不缩水；最终正常Edge登录态必须用户手动，集中为一次不超过20分钟的现有验收清单，不让用户跑DevTools；未知宿主报告由内建功能导出。无自动登录，无新Release；失败禁用仅该候选扩展并保留旧稳定包|
|SeminarArc／指定APK安装、持久库、导出ZIP|适配blackbox和verify-gpt-work最终结果；复用B02/B03/B04/B07；一个新测试seminar包含文字、照片、公式和已有录音控制|结束/强停/重启读回成功；只改UI不落盘、OCR读标签、导出漏媒体必须分清；photos-only不启动不必要foreground服务；旧录音与迁移保持|1个获权AVD，最多2次安装、2次强停复跑、90分钟；独立物理设备能力另列，最小1台/1次短录音/锁屏恢复/30分钟，需单独授权。清数据只限事先冻结的测试包/实例，有备份才回收；不能删用户会议|
|Asteria／固定候选网页完整科学图和导出物|修routeGestalt/rc19RouteGestalt真实测量与基线diff；复用test:browser/regression，增加独立渲染几何与旧truth校准|好图正常、交叉/悬浮/缺观测/改旧validator已提交版本应被拒；trace-off不挪图、canonical关系/索引/导出保持；科学与整屏阅读分别判|本地隔离浏览器2个固定viewport×好/坏2图，共4组；一次修复重跑仅影响组，60分钟；固定公开URL只读核验需获权访问目标，部署次数0，若新部署必要另授权；独立审阅完整图一次，不能复用Producer截图当自己采集|
|CUHK_Date／同snapshot Web/API/DB会话和有效campaign|复用hosted registration、parent preflight、evaluateParentDeliveryGate、ticket handler；绑定snapshot/surface health/quality/campaign/persona/lease|可见注册成功；API旁路冒充可见操作、过期票据、认证失败烧票、不同snapshot混签拒绝；并发单claim/失败release/原已注册回流保持|本地fake transport只证明事务逻辑；真实阶段一个获权staging snapshot/campaign，最多2个合成persona、1次正向注册、1次失败/重试、1组双请求并发，60分钟；邮件/短信费用默认0。不得动生产用户；换snapshot按原合同结束旧campaign，后续新活动须有授权，原产品task/budget不重置|
|CARE／原批准task的checkpoint/预测/指标/归档|适配finalizer，保留科学协议；第一试点选**现有报告回放＋CPU机制fixture**，不恢复旧训练任务；随后在原授权科学任务首次实际运行时验证完整链|12步冒500、空预测、错GT、两次eval冒训练resume拒绝；600步help/harm负结果正确送Planner；no-T2/split/模型来源不可改；archive必须save/load后从官方entry消费|首轮最多10个既有/合成结果变异；CPU确定性fixture k=3,m=2对照两进程、总60秒；这些只能证明机械链。真实训练预算完全取该活动task冻结模型/样本/步数/Slurm资源，不预设新数；当前GPU/提交次数0。原job PENDING只等待，断线查lineage；不得取消job、删checkpoint、发送组织方邮件或上传archive|

### 接收、修复与最终汇报的统一实测判据

每仓试点必须留下同一个 task 下的原请求、selected/reused义务、坏候选运行、feedback id、真实接收/ack、允许范围内的修复、fresh run以及最终对象身份。只有Bad被拒没有Good可以完成，或只有Good没有旧保护，都不足以启用该仓。设备不可达时保留已完成机械部分，不签对应INSTALLED/LIVE/科学充分性；也不停止其它仓或公共设计。

退出时撤掉新增DA准入调用但保留原专业runner、安全断言、有效新回归与历史事实。原产品用户数据/部署/作业不作为DA回滚对象。若新adapter本身错，先回退adapter并停止DA ready；不能让错adapter逼正确产品改坏。试点结果由原project owner接收，中央维护看板仅引用任务和consumer版本。

每任务最终报告从实际记录生成，必须包括：受验版本/安装或部署身份；新建验收器及理由，或明确“本次无新增，复用足够”；旧程序加固/复用；真正运行的检查；复用旧结果的依据；合法未运行项及其声明限制；当前失败归属、同任务已修到哪里、确需用户的动作。避免把程序名列表当用户结果。报告摘要中的“完成”只能对应有证据的原交付范围。

## 非特制功能压力推演：换一个普通请求仍能找到消费者

这些是在续研中另选并补读源码的**设计演绎**，不是独立盲测PASS，也不是新功能实施授权。

|普通请求与源码依据|入口→保护→选测→最终对象|故意坏结果怎样被收到和修复|
|---|---|---|
|Lucerna：恢复网络后别一直显示旧状态。已有provider_runtime freshness与background refresh|原生请求→ProviderState新鲜度/未知值义务→断线/恢复两输入＋旧quota→同EXE/PID刷新后的实际状态|只把stale标识清掉但observed_at不变，实际provider观察与UI不符；runner把actual/expected送当前Executor；修缓存/时间戳消费，重跑旧unknown语义，不重置真实账户|
|Bobbio：切换论文后删除批注不能删到上一份。已有zotero_client read/mutate的attachment key|原task→attachment identity/往返/PDF不变→两论文隔离fixture及真实测试profile→原生Reader与Zotero读回|UI换论文但mutation还带旧key，before/after按两attachment比较能发现；当前Executor修调用绑定，不能改expected或清真实库；cache重建及旧批注仍验|
|Mica：重复文字的高亮在导出PDF时不要跳错位置。补读 [pdf-export-model.ts](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/extension/src/features/pdf/pdf-export-model.ts) 和 [highlight-engine.ts](https://github.com/YuukiAS/Mica-for-ChatGPT/blob/0aee22f3e04c2b8bcfd36663d8f3a3918b56e23c/extension/src/features/highlighter/highlight-engine.ts)|createRecord/resolveRecord→buildModel/resolveHighlights/resolveAnchor→相同sourceSpan与唯一quote/prefix/suffix；选择PDF文本层与渲染、旧answer身份/数学选择保护→实际生成PDF|当前源码只接受唯一匹配，否则unresolved，durable/SETTLED不满足拒绝导出；坏变更取第一个重复文字应被known-bad拒绝。候选CLI把错误交原Executor，修锚定后同时验PDF与页面恢复；不能只验证JSON有highlights|
|SeminarArc：导出会议不能悄悄丢照片或公式。补读 [SeminarExportAssembler.kt](https://github.com/YuukiAS/SeminarArc/blob/5652fe17ce60625f3ff7c758fcc0183f920189de/app/src/main/java/com/yuukias/seminararc/domain/export/SeminarExportAssembler.kt)|assemble→addAssetIfReadable/toExportFormulas→mediaAssets/skippedMedia＋READY且非空LaTeX→既有export runner检查ZIP实物和显示缺失；保护timeline排序、录音fallback、原笔记持久化|若导出引用了未打包文件但报告完整，独立ZIP目录/引用对照拒绝；文件不可读必须明确skipped，不能当完整交付。feedback回当前Executor分清实际文件缺失与打包bug；修复后重开ZIP及APK原记录|
|Asteria：只聚焦一层后，导出的科学关系仍完整。补读 [projection.ts](https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/src/architecture/projection.ts) 与 [export.ts](https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/src/architecture/export.ts)|projectLayerFocus限定view及boundary；exportArchitectureMarkdown遍历project entities/relations→明确视图投影与canonical导出不同目标→全图关系/导出符号＋视觉/trace控制|坏改动把聚焦后的subset写回canonical导致导出漏关系；独立原模型/Markdown关系集合对比先FAIL，当前Executor修数据流；若用户实际要“只导出视图”则是新产品选择须明确，不自行代换|
|CUHK：登录失败后重试同一链接不应永久失效。已有handleAuditTicketSession claim→auth/state→finalize，失败release|原Parent任务→ticket/lease/expected state→失败后重新claim＋旧成功单消费＋并发冲突→同snapshot可见页面与API状态|先finalize再auth的坏序列会烧票；本地事务负例先拒绝，真实staging失败/重试观察再证；反馈由当前Parent工具返回接收，不新发campaign掩盖失败|
|CARE：仅修单层预处理后重新打包，旧权重和正常病例不能改变。补读 [Attempt3 packaging](https://github.com/YuukiAS/CARE_Challenge/blob/75a40e454de43b64e59a0b0b438ff57ef2bb8345/scripts/packaging/run_care_myops_attempt3_single_slice_hotfix.py#L670)|原task→BASE_ARCHIVE身份/关键assets/正常病例不变→phase_functional的正常15例与混合病例、phase_archive save/load后官方entry、13例synthetic矩阵→实际archive/image ID和预测|只测工作镜像却打旧tar、混入Attempt2、load后少输出均不准archive ready；适配器将身份/缺病例送原Controller。源码docker_infer会清输出、phase_archive会改tag/load/rm，故绝不作为本轮只读探针执行；包装不改变科学路线，也不授权上传|

这些推演反过来修订了公共算法：旧/新图并集防删除逃逸；多个最终对象各有claim，不能以JSON model代替PDF、工作镜像代替archive、视图子集代替canonical模型；同一错误必须带对象identity回原task。真正未见功能抽样仍按03 D2在冻结方案后由独立审查/试点进行，本轮不能自称独立验证。

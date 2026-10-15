# CUHK Date：事务、独立验收与当前候选身份已存在，不能被通用成功字段取代

RUNNER_ID: GPT6_PRO
READ_DATE: 2026-10-15
SOURCE_REPOSITORY: YuukiAS/CUHK_Date
SOURCE_MAIN: 9f25c7754d3c80d0be74f5b71016320f55753ae6
SOURCE_ACTIVE_FIX: fix/search-indexing-canonical-20261015 @ 7586b9bd97750efd2e0b8916d1b894ca19460d5f

## 实读来源与分支判断

branches及main→active fix比较（ahead 2、behind 0）；AGENTS.md读取入口/交接/验收主体及后部规则、受限staging授权（blob 823ca031ec4b93fcd6e26ac84ba91e9689e37eb1）；package.json前部脚本清单，后部未完整展开；docs/operations/blackbox-audit/LAUNCH_QUALITY_ACCEPTANCE_CONTRACT.md全文（7bda75b1563238ffdfa152b2eaa8668324105271）；scripts/verify-blackbox-handoff-claim-canaries.ts全文（e56df909050332a9e0d23759c9fd7fdf6394e55b）；apps/web/app/(root)/audit/handoff/handler.ts 1–250行（12254fc176046ed06380c2fea5bbc8f6644bdd8d）；active fix上的docs/operations/SEARCH_INDEXING_INVESTIGATION_2026-10-15.md全文（03890a208aea6e418a1657a2fd1bd54871d93803）。搜索仅用于定位，不把未展开结果当全文。读取Supabase技能仅获得工具安全指南，没有连接数据库或执行任何测试。

主分支仍是共同产品基线，但当天有未合并搜索修复分支。比较明确该分支改动SEO元数据/根重定向、部署壳、对应测试和报告，不修改本次所读handoff与launch合同。因此使用main解释产品和验收机制，单独标注最新修复候选；没有默认把default branch当所有当前工作，也没有把未部署修复当生产结果。

## 目标、真实入口及规则

产品是面向CUHK学生的网页配对服务，普通用户经公开页、认证、Profile、Questionnaire、Dashboard、介绍/同意/联系/历史/安全页面完成任务；技术底座包括Next、API、匹配/模拟/合同包和Supabase事务存储。开发入口是prompts任务及明确角色：执行者只交自评，独立审查者只读，控制者在指定任务内协调，不创造新方向。

规则已有非常具体的事故防护：staging与production隔离、一次性票据不被工具预消耗、独立会话/串行persona、两批隔离测试数据、候选冻结、合同摘要、逐维度语言/视觉/状态证据、权限/凭据边界、合理一次性用户动作，以及CI预算。重复推送调试被明确禁止。历史staging授权不扩大本轮研究权限；本轮一律未执行。

根AGENTS中仍并列“最终Questionnaire Work不得通过Quick Tunnel”与后部“当前阶段Quick Tunnel是授权等价入口、不得因此要求新增token”。二者具有不同历史/阶段描述，但在当前文件内没有足够清晰的机器可判定消歧链。此处只记录需治理澄清的活动规则冲突风险，不自行挑一条赋予运行权限。通用系统复制全部AGENTS只会复制这种歧义。

## 真实恢复与后置条件代码

handler.ts的ticket入口先要求APP_ENV=staging及audit enabled；先claim，再创建/更新合成身份、认证、读取权威ProductState、检查用途对应状态和安全跳转，最后finalize。失败路径释放claim，返回notFound或依赖不可用，且设置no-store。这是将“已生成票据”“已建立会话”“前置产品状态成立”“票据最终消耗”分开的真实源代码，不只是协议文档。

claim canary以数据库状态读回+真实接口+Playwright验证成功后finalize、下游失败不烧票据、租约过期可重试、六并发只有一个winner。它会写临时数据、访问staging并清理，因此名字含verify不代表只读，本轮只读源码没有运行。已有代码可以承担领域事务和有界恢复；上层不得泛化成盲重放整套脚本，更不得把所有verify当低副作用。

## 专业质量及验收事实边界

Launch合同不仅要求P1为零，还明确未关P2/特定P3、繁简中文自然度、解释语义、冻结联系快照、隐私、320–1440响应式、加载/错误、无操作重入不写数据、照片实际可取且身份一致，以及每维度独立证据。禁止一个launchPass扩散出全维度PASS；禁止拼接不同候选的通过结果；平台安全确认导致最后提交受阻时，生产者精确候选端到端与独立审查者提交前证据可形成明确分工，但不可假报同一证据。这是成熟局部合同，仍不能由文件本身证明实际消费/视觉合格。

当天SEO报告是正面的证据纪律例：源码矛盾已复现且定向26项测试被记录通过，部署壳307覆盖页面308也被识别；但报告明确没有合并/部署、生产36次返回同一不可用占位页只能判无法验证、不能判源站停机或隐私泄漏，也没有Search Console具体网址。历史上线声明不是当前健康。这些是仓库报告中的实测记录，不是本研究自己运行。

## 对候选的约束

最低适配应复用现有staging隔离、候选冻结、票据租约、批次生成器、测试与launch合同；不能引入另一批状态/票据/部署主控。读网页、生成Prompt、检查数据库行、操作真实UI属于不同边界。独立审查应持有冻结要求与普通用户入口，不窥生产者答案/最终票据；一般单元测试不能证明中文自然度或配对解释恰当。流程成本必须包括票据过期、浏览器工具失败、人工复制、批次重建和CI消耗，而不只计模型调用。

下一仓库：Bobbio。当前仓库已立即落盘。

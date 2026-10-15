# Bobbio：原生集成、知识权属和人的判断不能压成统一完成状态

RUNNER_ID: GPT6_PRO
READ_DATE: 2026-10-15
SOURCE_REPOSITORY: YuukiAS/Bobbio
SOURCE_DEVELOP: a64edfd6c5b11f81599bfcfc327be5964633a7b5
SOURCE_MAIN: e7d929bad2d4b23939c81920e77390efbce42b96

## 实读范围

读取branches；develop的AGENTS.md主体至第12节，另定位第14–19节规则；docs/DEVELOPMENT_WORKFLOW.md 1–230行（3ebae0c02c71254fb4d798aa05a869f6b14336de）；scripts/Invoke-BobbioReaderAcceptanceSafe.ps1前部参数/隔离/进程/交接函数及530–699行实际运行与finalize段；docs/design/FIGMA_HANDOFF.md全文（3303b5ed518ac6335a83ef0d4816df0f23fa2ffe）；docs/quality/GPT_WORK_PRODUCT_REVIEW_CONTRACT.md全文（856e8928413bb947a2a1fc6d96827c63b3ba2156）；package.json全文（61e9a9763f4c8da074fb9ff666c1ed55bf7a51ad）；scripts/validate-0.3.0-audit-bundle.mjs 1–180行（95d4857ec73959e9276e33e36e1c925bad451df5）。没有读取Figma实际图层、截图像素或运行原生软件；不把定位/截断范围记成全文。

## 当前入口与约束

根规则和开发流程均指定develop为日常集成，main为用户验收后的稳定里程碑，因此采用develop而非默认main。当前0.3增强科研批注，0.1/0.2接受是仓库记载，不是本次重新验收。生产目标是Windows原生Codex Desktop；WSL仅辅助，Legion与Workstation经Git交接。普通用户从原生桌面应用和Zotero进入阅读/批注/解释/候选知识，而非localhost仪式。

技术为Tauri/React/Rust。Zotero拥有书目、附件及兼容批注；Bobbio拥有LearningTrace、经审阅知识与发布意图。批注不重写原PDF、不直接改zotero.sqlite；知识提升引用原批注而不是复制可见批注；AI建议不能自行成为human_verified。Notion等是投影不是第二事实源。框架复用不能取消人的知识审核或另建批注主库。

## 安全与恢复的具体实现

历史0.1验收发现“独立profile仍可能指向真实data directory”，因此仅有测试profile标签不证明隔离。开发流程要求显式不同dataDir、禁同步/自动更新、机器更新策略与缓存检查、真实资料前后只读比对，并禁止经OS zotero:// handler逃到默认真实profile。此历史事故足以说明只改Prompt不等于安全执行环境。

Reader安全runner已实现模式互斥、Zotero/updater仍在则拒绝、不强杀Zotero、URL handler检查、更新策略/缓存校验、隔离配置与真实资料基线、旧证据归档，以及结束时调用严格证据验证和readiness audit。实际完整验收拒绝AgentMode=fake及脏工作树；handoff模式写精确路径、候选提交、进程和步骤后退出，finalize不再次启动应用。它仍依赖真实GUI操作/观察及domain后置条件，不是独立持续执行引擎。代码中部分安全准备会修改测试配置或机器更新缓存，不能因名字含Safe/Preflight就当本轮只读许可；本轮没有执行。

## 专业验收与证据效力

0.3审查合同区分本地自检、独立产品审查、最终原生集成、用户可审、用户已接受五个状态。GPT Work通过不允许直接晋升main或宣布用户可验收，必须再完成隔离Zotero原生往返。浏览器、源代码、fixture和旧图片不能替代桌面专有行为证据。要求整窗、阅读主次、批注工具、状态转换、历史候选、性能、1280紧凑、错误恢复、文案及新缺陷发现；无障碍只是风险门槛，不冒充完整认证。

Figma手册指定当前0.3 Reader状态/组件作为视觉权威，旧v0.1及原型只是历史；产品简报仍拥有交互语义。此处证明仓库规定设计权威，不证明本轮访问过Figma或代码已对齐。公式插入在当前0.3审查合同明确暂缓，只有兼容性门槛重新激活才纳入，不能把早期工具顺序当当前必交范围。

当前package已有前端/Rust/原生性能/壳层/隔离/0.3审查包验证。读取的audit-bundle验证器同时检查文件存在非空、报告必备文字、性能数值、状态矩阵和各机器断言；甚至固定要求COPY_REVIEW含CLEAR_WRITING_PASS = NO。它可验证打包一致性与声明约束，但不能从这些字符串推导像素、中文表达或当前机器真实质量；历史固定措辞也可能导致适配成本。未检查其后半部，不断言没有其他防护。

## 对候选的约束

应复用安全runner、Zotero权属和原生证据采集，不能用网页统一测试替代原生跨应用往返。最小适配需要候选/二进制身份、隔离profile与dataDir证明、批注往返及源PDF不变、Figma版本、知识人工审核边界；不是注册一条build命令即可。连续执行只跨已授权内部步骤，不跨真实资料/新凭据/设计或科学判断。可观察性必须保留五种不同成熟度，不能给一个绿色完成状态。

下一仓库：Mica-for-ChatGPT。当前仓库的实质读取已落盘。

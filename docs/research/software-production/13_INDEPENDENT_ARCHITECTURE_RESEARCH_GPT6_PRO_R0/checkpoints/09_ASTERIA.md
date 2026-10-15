# Asteria：图形可读性与科学关系正确是两条独立验收链

RUNNER_ID: GPT6_PRO
READ_DATE: 2026-10-15
SOURCE_REPOSITORY: YuukiAS/Asteria
SOURCE_REF: main
SOURCE_COMMIT: 193c033659a7612a99442763077217b130e9b756

## 实读来源

branches；AGENTS全文（ea922f25cb549c1fb9dbeb62eead28fedb712fc1）；README全文（98b0c3ab190de8a6674a302f29801ab04621b672）；prompts/AGENT_RULES.md 1–160行（85778eef76b5943c652dc38c4b90b6c39fe5757e）；src/architecture/repositoryBridge.ts 1–225行（d1dca56694bc48f054d7ca8d32677491a340db5f）；package.json全文（687d6bf00e52680bdd8e944552490adea6543ad9）；scripts/validate-cat-trace-bridge.mjs全文（2e76c8958bd7a72cc5cd01d073b4cc2460b4d8c1）；UI_BLACKBOX_BROWSER_CONTRACT全文（0f98c9a13757753a188b002cbde6cfb76f4c1092）；CHANGELOG 1–130（e92139556f9e3bc844159c7a466460bfa34083e5）；docs/operations/development/RUNTIME_OPERATIONS.md 1–130（c9d25b5bd690fa65465383e8da8a14bbdb096ec6）。一次猜测test-cat-trace-bridge.mjs返回404，随后从package定位真实validate文件；404不算已读来源。没有运行浏览器/服务器/隧道或访问CAT-TRACE实际仓库。

## 当前产品与权属

main之外仅治理review分支；main为Asteria2.0当前2.0.0-rc.19网页科学模型架构图。普通入口固定公开URL直接打开CAT-TRACE Architecture，用户可切Original TRACE/Frozen V2、Overview/Full、Lineage/Evidence、选择/显式追踪、检查器和视图保存。1.x研究画布已归档，不得从老文档恢复为隐藏主入口。

根规则规定单一父验收提示、自动检查/自看成品/固定URL刷新/独立Work/合并裁决/最后人工验收；不让用户分别启动多审查者。正式AI Skills/Bridge由正常入口发现加载，source main比release新不等于生产有效。持久服务器/固定隧道独立于UI任务；不另开随机公开URL或双服务器，不复制发布引擎。授权维修后应分别核实源站与公开status，但本轮没有执行。

## 科学语义和代码绑定

repositoryBridge定义科学实体与代码位置/角色/来源/提交/新鲜度/实现成熟度的绑定；验证器实际拒绝上级路径、绝对路径、非40位提交、错误枚举，以及把implementation binding声明为科学证明的manifest。测试真实加载同一TypeScript并用非法路径、scientific-proof=true反例验证拒绝。此处是实现而非只有文案。

但CURRENT、TESTED、AUDITED等仍是输入字段；解析器只检查格式，不读取GitHub代码/执行测试来证明其内容。fixture是明确synthetic、固定旧CAT-TRACE提交且含未关闭的科学限制；测试要求该固定提交不构成“今天最新科学事实”。代码存在、测试路径存在或图中一条连线，都不证明模型可识别性、收敛/ESS或定理成立。真实GitHub摄取与调用图目前不在RC范围。

## 验收与失败历史

当前代码入口已有统计图kernel、canonical fixtures、桥接、迁移往返、累计RC静态/Playwright/公开冒烟；许多检查从同一科学fixture产生，仍需独立数学来源核对，不可用循环一致性当外部正确性。图形任务规则要求像素自审、两个窗口/明暗主题、可读公式、选择/追踪分离和另一个不同结构fixture，禁止只按CAT-TRACE实体id硬编码修图。

CHANGELOG记录从RC5到RC19多次黑盒/人工暴露问题后的修复：公式碎裂、截断、选择导致布局移动、追踪方向语义错误、低对比度、连接线/标签交叉漂浮、嵌套检查器挤压，最终从反复调障碍路由改为布局优先关系呈现。这些版本记录支持“测试越来越多却仍需产品机制重做”的历史判断，但本轮未复看截图，不宣称当前RC视觉合格或仍坏。

黑盒合同把真实UI操作与绕过页面区分：Playwright等真实UI工具可用，读源码/隐藏状态/私有接口作为黑盒结论则污染；点击超时先看页面是否已成功，工具故障不是自动产品缺陷。当前研究是源码架构分析，不声称自己进行了无污染黑盒验收。

## 对候选的约束

Asteria可作为语义/证据投影思想的现有资产，不应未经用户需求扩大成通用执行监控主控。最小适配需要固定科学图版本、跨视图选择/追踪不变量、不同结构图、公式像素与专业含义、候选部署身份；HTTP200、schema或bbox通过都不充分。统一体系要保留科学事实来源与实现绑定的隔离；重新计算视图不能反写科学事实。版本化来源和人工确认的知识权属不能由自动证据状态覆盖。

下一仓库：CARE_Challenge。

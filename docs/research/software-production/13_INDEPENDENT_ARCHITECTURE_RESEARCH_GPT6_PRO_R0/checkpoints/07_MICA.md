# Mica：观察网页状态不等于拥有模型执行权，诊断不能成为主产品

RUNNER_ID: GPT6_PRO
READ_DATE: 2026-10-15
SOURCE_REPOSITORY: YuukiAS/Mica-for-ChatGPT
SOURCE_MAIN: 7059c0dc24b908b57bd0e1f475142ba4f4520621
SOURCE_RECOVERY_BRANCH: codex/mica-product-recovery-current-gpt-ui
SOURCE_RECOVERY_COMMIT: 0065a7ba841f72244e6bc1dbce0b5ec2ada12d35

## 实读来源与分支效力

branches及main/recovery比较；main README全文和AGENTS 1–95行（c6740be29b45d7f0be300d387898b81b99b97932）；recovery AGENTS全文（1ba64b648b8cb72568de3659bd4a4695f8c4d746）；docs/recovery/MICA_SOURCE_OF_TRUTH_RECOVERY.md全文（14862a55ab8c54e80d0bd7e642f9cf7946fa9ba9）；docs/workflows/MICA_EXECUTION_FAILURE_HISTORY.md全文（9a79c378e6884eceeda35974ee975c219469d28c）；extension/src/reliability/turn-delivery-guard.ts从开头至reduce函数主体（尾部导出截断，未宣称全文）；scripts/test-product-core.mjs全文（267eef94bf2e8b91c57713b6c00599dfa3426979）。未操作真实ChatGPT账号、浏览器、扩展、模型或外部服务。

比较结果是diverged：recovery独有11提交，main独有27提交。恢复文档明确该分支的产品重建授权和起点2a33a57，但其历史描述不能消除今天的分叉。main README仍描述0.1.7，recovery文档说明0.4.1候选；本轮没有证据证明后者已合并、发布或安装。因此两者分别记录：main是当前默认源码，recovery是明确产品工作候选，绝不把更大版本号或更像“新方案”的名字当实际生产权威。

## 项目目标和约束

Mica实际是Manifest V3/TypeScript本地浏览器扩展，不是桌面执行器。入口是ChatGPT原生页面上的小幅增强及扩展popup，固定加载路径dist/mica-dev。基本目标是低内存长对话性能、复制/LaTeX、少量可靠性增强，不重做ChatGPT或上传聊天内容。私有接口和DOM都被规则标为不稳定；识别失败保持原生，不绕过授权/安全/付款/工具确认。

普通输入同步热路径只能做轻量检查，禁止全页选择器、布局读、克隆、大文本和序列化；诊断应显式会话内、结构性无正文、有限事件，不成为常驻额外轮询。测试阶梯先影响面和定向，再普通测试，再有风险才完整E2E/压力；同类失败两次无新信息则审计根因和夹具，不盲跑。真实登录态ChatGPT与弱机最终表现是明确人工验收边界，不允许为了自动化质量目标反复操纵用户账号。

## 实际状态/恢复与测试

恢复分支turn-delivery-guard有发送意图、匹配新用户消息、助手生成、稳定结束、疑似未发送/无进展/旧回复/错误状态。恢复主要是提供提示、有限恢复草稿和确认已发送后的同指纹残留清理；草稿恢复拒绝敏感上下文和非空输入。无进展判断依赖DOM/停止按钮/文本变化，45秒是网页启发式，不是后端执行状态；代码不能证明服务端失败、模型已停或可以合法重新运行某个Codex任务，更没有普通Codex App原线程控制权。

一个需另测的源码边界是observe只要看见assistant或generating就刷新lastProgressAt，未以正文实质变化限定；因此持续存在停止信号/无关DOM更新可能让“无进展”时钟失真。这里只报告本地实现风险，不声称当前真实账号已重现，也不把修复它纳入本轮范围。

test-product-core用隔离本地页面和Playwright，实际操作复制控件位置、Markdown/LaTeX/表格/代码序列化、远程资源去除以及中英文/组合输入，猴子补丁统计重型DOM调用，断言热路径为零。它还能构造旧位置失败与新位置成功，但测试本身使用已有legacy节点而非执行完整旧构建，因此不能单独等价于所有历史old-bad/new-good复现。默认依赖本机Codex缓存内Playwright和Windows Edge路径，说明跨机器适配仍有实成本。未运行测试。

## 失败历史与候选约束

失败史记录源码/构建/公开release/浏览器版本脱节、fixture不覆盖真实action cluster/composer/remount、测试绿而真实站点坏、Atlas和探针膨胀、默认关闭主功能冒充完成、用户成为普通QA以及跨候选复用旧截图。main还记载2026-09-01真实网页已原生窗口化，90-turn synthetic fixture只能验证自身机制，不能证明8GB目标设备有实际收益；这也是历史证据，不是本轮对2026-10-15页面结构的确认。

最小适配必须记录实际加载扩展版本、当前DOM证据的日期、同夹具反例、热路径/弱机成本及账号手动边界。候选不能以“统一自动验收”消除真实账号边界，或另建Atlas式控制台。性能优化无收益应允许停做/回退原生作为科学结论，但关闭用户所需能力不能叫产品交付成功。

下一仓库：SeminarArc。

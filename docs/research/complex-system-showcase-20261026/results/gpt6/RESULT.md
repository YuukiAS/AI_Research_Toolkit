# gpt6：复杂系统解释网站设计交付

**唯一推荐：Eleventy 3.1.7 + Markdown/YAML + Nunjucks + 原生 CSS/JS；采用浅色编辑式版面，以真实案例、候选对照、组件责任和分级证据解释系统。**

完整设计研究与静态原型已完成，等待用户审核。实际调查了 9 个一手项目，核查 DA 历史研究、新总体架构与 Lucerna 固定版本的原任务、修复、源码和验收器。没有读取另一模型成果，没有修改 main、生产系统或启动正式开发与部署。

## 直接看设计

- [视觉总览：桌面、手机、失败展开、组件展开及另一系统](prototype/README.md)
- [桌面完整页面](prototype/previews/desktop-full.png) · [手机完整页面](prototype/previews/mobile-full.png)
- [失败与原任务返修](prototype/previews/desktop-failure.png) · [组件责任展开](prototype/previews/desktop-components.png)
- [下载可离线交互的静态包](prototype-bundle.zip)：解压后打开 `prototype/index.html`，不需要安装；GitHub 的 HTML 文件页只展示源码。

## 完整交付

| 内容 | 可审阅文件 |
| --- | --- |
| 技术路线比较、唯一选型、信息架构、视觉体系、交互与弃选理由 | [DESIGN_DECISION.md](DESIGN_DECISION.md) |
| 可直接面向用户的中文样例、真实历史、成功/失败/旧行为、组件必要性、成本及证据边界 | [DA_STORY_AND_EVIDENCE.md](DA_STORY_AND_EVIDENCE.md) |
| 薄模板、内容格式、更新纪律、Automerge 迁移演练和未来 Codex 的冻结验收 | [REUSABLE_TEMPLATE_AND_ACCEPTANCE.md](REUSABLE_TEMPLATE_AND_ACCEPTANCE.md) |
| 一手来源、版本身份和实际参考观察 | [SOURCE_REGISTER.md](SOURCE_REGISTER.md)、[references](references/README.md) |
| 实际渲染、行为、保真检查及未验证事项 | [VISUAL_QA.md](VISUAL_QA.md)、[浏览器记录](prototype/browser-checks.json) |
| 开始前写入与远端回读 | [WRITE_ACCESS_CHECK.md](WRITE_ACCESS_CHECK.md) |
| 完整设计候选的逐文件远端回读 | [REMOTE_VERIFICATION.json](REMOTE_VERIFICATION.json) |

原型包含 9 张实际渲染预览，DA 与另一系统均检查了 320–1920px 的六档宽度。三种候选、键盘、details、无脚本阅读、主要触控目标和代表性文字对比度已核查。浏览器记录绑定页面源码摘要；离线包逐文件匹配同一源码。

这仍是作者自查。独立读者理解测试、跨浏览器与屏幕阅读器核查留在后续正式开发验收；DA 运行、宿主接入、产品返修和最终应用验收均未执行。没有把这些缺口包装成 PASS。

## GitHub 身份与范围

唯一分支：[research/complex-system-showcase-20261026-gpt6](https://github.com/YuukiAS/AI_Research_Toolkit/tree/research/complex-system-showcase-20261026-gpt6/docs/research/complex-system-showcase-20261026/results/gpt6)。

共同基线为 `a5070288cd7625658524218c83c411fb93475cc6`。先写入并回读探针，再提交实质研究记录，随后形成[完整设计与视觉提交 ff778d9](https://github.com/YuukiAS/AI_Research_Toolkit/commit/ff778d9683d8ee41bd9fd1a11c9bc4a563530c68)。已从该远端提交读取全部 33 项文件（含图片和 ZIP），每项 Git blob 与本地字节身份一致；GitHub compare 显示所有变化只在本轮 `results/gpt6/` 内。当前收尾文件补充结果入口与这份回读证据，原型内容保持不变。

本次本地 Git 上传停滞后已取消，最终通过已连接 GitHub 写入接口更新指定分支，使用准确父提交与非强制更新。远端提交是交付权威，不引用未上传的本地传输草稿。

当前没有待补参数或未收敛的技术选择。下一动作是审核这份设计；通过审核之前，不实施 DA、不启动试点、不建设或发布正式网站。

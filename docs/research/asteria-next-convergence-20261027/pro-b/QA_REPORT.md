# 2026-10-29 交付修复补充

原报告的视觉／浏览器检查证明了打包前候选的设计，但没有证明 commit `2c010853b2b6fafefa1edf7d8146caec6a7729e6` 中的 gzip 分片能重建同一页面。该固定候选后来确认 CRC 与解压长度失败，因此旧报告不能再作为最终交付可打开性的证据；截图仍可作为设计视觉证据。

新的候选取消压缩分片。提交前已完成 JavaScript 编译、四项目数据解析、16/16 视图运行 smoke、主题切换和无外部资源检查。提交后还需从 GitHub 新 commit 回读复核。精确根因见 `DELIVERY_REPAIR_20261029.md`。

---

# QA 报告

## 1. 范围

本轮检查对象是 `prototype/` 中的静态高保真候选。浏览器执行使用系统 Chromium 与 Playwright，资源以内联方式加载，以绕过当前运行环境对 `file://` 和 localhost 的限制。QA 覆盖四个参考项目、系统／机制／演进／检查、组件／关系／实现／证据详情、light／dark、desktop／mobile 和核心交互。

本报告是 producer 第一轮 QA，不是 GPT Work 的独立最终 PASS。

## 2. 自动浏览器结果

- 主屏案例：10 通过，0 警告，0 失败。
- 核心交互：9 通过，0 失败。
- 控制台错误：0。
- 页面脚本错误：0。
- body 横向溢出：0。
- 节点矩形碰撞：0。
- 无可访问名称按钮：0。
- P1：0。
- 明显 P2：0。

核心交互：

- project switch：PASS
- view switch：PASS
- path switch：PASS
- node inspector：PASS
- implementation tab：PASS
- edge contract：PASS
- search：PASS
- theme：PASS
- checks：PASS

完整机器结果见 `prototype/qa/browser-qa.json`。

## 3. 语义数据一致性

- 4 个项目；
- 34 个节点；
- 39 条类型关系；
- 15 个机制；
- 8 个 meaningful revisions；
- 所有路径引用的节点与关系均存在；
- 所有关系均有 label、payload、consumer 和 summary；
- 所有 mechanism 引用均可解析；
- 所有源码绑定 commit 均为 40 位 SHA；
- Delivery Assurance 的 design-only implementation 合法为空；
- Tutorial artifact identity 不伪装成源码 commit。

## 4. 人工整页检查

逐张检查全部 10 张正式截图：

- 第一眼主次：系统结构或当前正文是视觉主角，状态与工具栏不抢占；
- panel balance：路径、图、inspector 在 1440px 保持稳定比例；
- graph collision：节点无重叠，当前路径与非当前上下文区分清楚；
- text clipping：标题、节点、路径、实现锚点和差异正文未发现截断；
- light／dark：浅色关系线不水印化，暗色次要文字、边、代码和差异可读；
- mobile：不缩放桌面图，改为顺序路径与底部详情；底部导航不遮挡当前首屏任务；
- content taste：无无意义渐变、巨大状态卡、到处 pill、装饰几何和密集指标；
- repeated copy：项目摘要、revision 和状态均有主要表达位置，没有全页 reassurance；
- implementation：源码 path／symbol／commit 只在实现页签；
- validation：结构检查与专业判断边界分开，不产生总分或最终正确结论。

初次手机截图发现关系载荷继承浏览器默认按钮边框，已修复后重新运行全部 QA 和截图。

## 5. 截图证据

浏览器 QA 实际渲染并检查了 10 个状态；`prototype/qa/browser-qa.json` 保存全部状态、尺寸、原始哈希和检查结果。为控制研究分支体积，仓库保留 4 张代表性压缩截图，覆盖四个项目、明暗主题、桌面与手机：

- `01-delivery-light-system.webp`：560×373，SHA-256 `3cbfd3779cad194e424c78b5aebcf97a46ef77c2d96e73c0ae4d99d0fca97460`
- `02-mica-dark-recovery.webp`：560×373，SHA-256 `2da7878283578926b906650494c168fc84596acdbb8a14618cedc4c52c9c0e1e`
- `04-cat-light-evolution.webp`：560×381，SHA-256 `abce7cf0988580f0d5a52398ec23665f8dcef6573bc6a58db7a54ee421bcf33e`
- `09-tutorial-mobile-dark.webp`：230×498，SHA-256 `13713256b63bc8a4aa47c91fd76f33b43b8d86ec525fee23231beabaf1487ae6`

`prototype/screenshots/MANIFEST.json` 记录压缩副本的尺寸、字节和哈希。

## 6. 已知边界

- reference prototype 使用自制 SVG 以冻结产品语义和视觉；正式实现应替换为 Cytoscape.js／ELK.js，不把原型图层当生产依赖。
- 当前自动检查不是完整 WCAG 审计，也未替代 screen reader 实机测试；正式实现必须使用成熟可访问性测试和真实键盘／读屏 QA。
- source binding 的最大风险仍是语义误绑；本原型只展示合同，正式能力必须完成 Tree-sitter／SCIP 正负控制和人工确认工作流。
- 本轮没有修改 Asteria 正式产品，也没有通过 fixed public URL 验收；这些属于批准后的正式实施。

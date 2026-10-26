# 浏览交互原型

[下载完整网站 index.html](https://github.com/YuukiAS/AI_Research_Toolkit/raw/refs/heads/research/complex-system-showcase-20261026-r2-gpt6/docs/research/complex-system-showcase-20261026/r2/gpt6/prototype/index.html)，保存后用浏览器打开。样式、语义模型和脚本均在这个文件内，不需要安装依赖、服务器或账户。GitHub 的文件预览显示源码，不会执行网页。

点选组件或连线查看责任与传递内容；选择正常、错误、旧功能回归，再用前后步追踪路径。手机会重新排图，详情在底部打开。所有交互用于解释设计，不调用真实产品。

![桌面架构](../previews/desktop-overview.png)

[完整网站长图](../previews/complete-website.png) · [手机长图](../previews/mobile-overview.png) · [架构模型](../ARCHITECTURE_MODEL.md)

维护源为 `content.cjs`、`layout.cjs`、`styles.css`、`app.js`。执行 `node build.cjs` 重建 HTML 与 `model.json`，然后按上级目录 ACCEPTANCE 重新检查和截图。单文件 HTML 可独立打开；其它文件用于审阅和维护，不是运行时网络依赖。

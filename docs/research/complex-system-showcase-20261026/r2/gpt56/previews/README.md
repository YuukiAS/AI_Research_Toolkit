# 视觉截图清单

`prototype/verify.py` 从当前 `index.html`、`styles.css`、`architecture-data.js` 和 `app.js` 同次渲染下面的 PNG。浏览器插件在本会话不可用；本地自验使用 Chromium 和 Playwright，远端交付截图由该分支的临时材料化工作流用 Playwright 管理的 Chromium 重新生成。脚本将同一组源文件内联后通过 `page.set_content` 渲染，没有另写一份页面。

| 文件 | 视口 | 状态 | 用途 | SHA-256 |
| --- | --- | --- | --- | --- |
| `desktop-architecture.png` | 1600 × 1000 | 正常交付，默认全图 | 完整架构首屏；没有节点被默认淡化。 | `fdaaa96db7022513e54540d2ca512abfcdea1d01d559a027eb4d726e7074653d` |
| `desktop-component-bridge.png` | 1600 × 1000 | 正常交付，选中 Bridge Kit | 展示节点上下游高亮和责任检查器。 | `570b17a0b9429381b2b8ef3c4af79e94302f819296a6233ccbc36b6b34af4ef3` |
| `desktop-failure-path.png` | 1600 × 1000 | 验收失败，返回原任务 | 橙色返修回路与其余架构同时可见。 | `4b5b4c4c6c9869ebe4b084b964f5be7166d6d8c2f2b32a397314730f91001b3e` |
| `desktop-connection-detail.png` | 1600 × 1000 | 验收失败，选中专业结果连接 | 展示连接的传递内容、触发条件、接收者、接通条件和缺口。 | `9026617701ade8e8548511797d1aa8da4c567fa86c553b3bac2dace5b87e2d5f` |
| `mobile-architecture.png` | 390 × 844 | 正常交付 | 同一模型重排为纵向路径。 | `39447c7a8e4ff8bb8e25c5ecd09ad38b41ecad540c6a5fcd51a576518d149e1a` |
| `mobile-regression-path.png` | 390 × 844 | 新修复破坏旧功能 | 旧功能成为路径中的独立步骤。 | `8a90a82b46e5b5584922875e4af900991726c137fe4164488d45f3c6ee4ba36c` |

截图只证明展示网站的布局与交互状态，不证明 Delivery Assurance 已经实施，也不证明 Lucerna 当前生产版本已经通过新的独立验收。

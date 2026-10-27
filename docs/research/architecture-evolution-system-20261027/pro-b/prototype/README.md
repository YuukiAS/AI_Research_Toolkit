# Architecture Ledger 高保真原型

直接打开 `index.html`。原型为纯静态 HTML/CSS/JavaScript，不依赖网络或后台。

演示路径：

1. 在顶部切换 Delivery Assurance、Mica、CAT-TRACE；
2. 选择组件，查看“机制、实现、演进”；
3. Mica 中选择 `Stale composer 恢复`，查看真实状态机和源码锚点；
4. CAT-TRACE 中点击“与父修订比较”，查看匿名零槽位撤销的原因、证据和下游影响；
5. Delivery Assurance 中查看设计已接受但实现尚无的诚实状态；
6. 打开“完整性检查”；
7. 缩小浏览器宽度检查移动端底部详情面板。

`model.js` 由上级目录的 `example-ledger.json` 生成，避免 `file://` 环境下的跨源读取限制。正式产品应在构建阶段生成静态数据包。

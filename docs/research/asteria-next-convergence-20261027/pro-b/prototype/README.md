# Asteria Next 高保真参考原型

这是 Pro-B 收敛候选的自包含静态原型。

## 打开

下载本目录后直接双击 `index.html` 即可。它不需要服务器、构建步骤、gzip 解压、Base64 分片或外部网络资源。

也可使用普通静态服务器：

```bash
cd prototype
python -m http.server 4173
```

然后打开 `http://127.0.0.1:4173/`。

## 结构

- `index.html`：唯一运行入口，CSS、四项目数据和交互全部内联。
- `INTEGRITY.json`：固定入口 Git blob、字节数和运行级检查结果。
- `qa/`：设计阶段内容／浏览器 QA。
- `screenshots/`：四项目代表性渲染。

2026-10-29 已删除上一版 `PACKING.json`、`assets/loader.js` 和 `assets/payload-*.js`。旧固定候选的 gzip 数据在仓库中已经损坏，重新下载或启动服务器无法修复。精确诊断见上级目录 `DELIVERY_REPAIR_20261029.md`。

四项目、系统／机制／演进／检查、组件与关系详情、实现／证据／历史、有意义修订、完整性检查和明暗主题均保留。语义数据模型未更改；从确认损坏的 `renderEvolutionView` 起重建渲染和交互尾部。

# Asteria Next 高保真参考原型

这是独立收敛后的静态产品候选，不是旧原型的换色或修补。它冻结信息架构、交互、内容取舍、响应式和视觉语法；正式实施仍应映射到 Asteria 当前 React／TypeScript 架构，并复用规范中选定的成熟图与布局依赖。

## 运行

本目录是无后端静态站点：

```bash
cd prototype
python -m http.server 4173
```

打开 `http://127.0.0.1:4173/`。入口为 `index.html`。为便于在研究分支中原子交付，原型源码已压缩为 `assets/payload-*.js`，由 `assets/loader.js` 在浏览器中还原；`PACKING.json` 保存解包后完整文档的哈希。正式产品不得沿用这种打包方式。

## 已实现的参考能力

- 四项目切换：Delivery Assurance、Mica、CAT-TRACE、STAT5060 Tutorial；
- 系统／机制／演进／检查四个主视图；
- 节点、关系、载荷和真实消费者；
- 当前／实现／证据／历史详情；
- 顺序、算法、数值与成品验收四类机制内容；
- 有意义修订、前后差异、变化原因、影响与不变保证；
- design-only、open、blocked、tested 等诚实状态；
- light／dark、desktop graph 与 mobile ordered path；
- 搜索、键盘焦点与 query 参数固定状态。

## 查询参数

```text
project=delivery|mica|cat|tutorial
view=system|mechanism|evolution|checks
path=<project path id>
focus=node:<id>|edge:<id>
tab=current|implementation|evidence|history
mechanism=<id>
revision=<id>
theme=light|dark
```

## QA 证据

`qa/browser-qa.json` 保存全部 10 个浏览器状态和 9 条交互的机器结果；仓库保留 4 张代表性压缩截图，覆盖四个项目、明暗主题、桌面和手机。完整内容存在性裁决见 `qa/visible-content-audit.json`。

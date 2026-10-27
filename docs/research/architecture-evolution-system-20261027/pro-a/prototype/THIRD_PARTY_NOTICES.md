# 本原型使用的外部能力

## 构建依赖

`@viz-js/viz` **3.25.0** 是唯一 npm 构建依赖。包装项目采用 MIT；官方 npm 元数据的精确包完整性值已写入 `package-lock.json`。来源：[Viz.js](https://github.com/mdaines/viz-js) · [3.25.0 npm 元数据](https://registry.npmjs.org/@viz-js/viz/3.25.0)。

本地实际引擎为 **Graphviz 14.1.3**。已直接读取该版本官方 `COPYING`，其许可为 **EPL-1.0**；不能将当前上游版本的许可证反套到此版本。来源：[Graphviz 14.1.3 COPYING](https://gitlab.com/graphviz/graphviz/-/raw/14.1.3/COPYING)。包装还含 Expat 等构建成分，具体来源记录保存在该 npm 包的 provenance 中。

本交付只提交本项目生成的 DOT 与 SVG，不分发布局引擎、WASM 或 npm 包二进制。阅读器使用原生浏览器能力。若以后改变分发方式，需要按锁定版本随相应第三方软件保留原许可与 notices；不能把整个打包引擎统称 MIT。

本轮核查的版本和许可来源摘要见 [build-dependency.json](../sources/build-dependency.json)。上游当前发布和本轮实际构建版本的差别见 [开源调查](../OPEN_SOURCE_RESEARCH.md)。

## 方法与来源

使用 Git 和 GitHub 固定提交链接维护历史来源；采用 ADR 保留被替代决定的原则。LikeC4、Structurizr、Cytoscape、ELK、Tree-sitter、SCIP、dependency-cruiser、VitePress、Difftastic 与 Backstage 是经过调查的候选，没有冒充本原型已加载的依赖。

## 测试工具

Playwright、隔离的 Chrome for Testing 与 Noto Sans CJK SC 仅用于本地浏览器核验，没有进入页面依赖，也没有随本交付提交其二进制或字体文件。

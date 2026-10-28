# Asteria Next 最终候选收敛研究（Pro-B）

本目录给出一套唯一的 Asteria Next 候选：继续演进 `YuukiAS/Asteria`，以现有 Asteria 2.0 的规范语义图为唯一语义底座，在其上补齐关系合同、实现与证据绑定、架构修订、语义差异、漂移和冻结检查。没有建立平行的 Architecture Ledger 数据库，也没有把四个参考项目做成四套产品。

## 先读什么

1. `RESULT.md`：最终判断与最危险问题。
2. `ASTERIA_NEXT_CANONICAL_SPEC.md`：唯一产品规格。
3. `CONVERGENCE_DECISION_MATRIX.md`：四版历史候选逐项裁决。
4. `SEMANTIC_MODEL.md`：现有 Asteria 对象与新增语义的合并方案。
5. `prototype/index.html`：高保真静态参考原型。
6. `QA_REPORT.md` 与 `CONTENT_AND_TASTE_AUDIT.md`：浏览器、内容存在性和整页审查证据。

## 原型

原型是静态前端，不依赖后端或外部服务。为避免浏览器对 `file://` 的安全限制，可在本目录启动任意静态服务器：

```bash
cd prototype
python -m http.server 4173
```

然后打开：

```text
http://127.0.0.1:4173/
```

原型支持四个参考项目、系统／机制／演进／检查四个视图、关系与组件下钻、源码与证据页签、有意义修订、明暗主题和重新设计的手机路径阅读。

## 边界

本轮没有修改 Asteria、Mica、CAT-TRACE、STAT5060 或 AI Skills 的正式仓库，没有创建 PR，也没有读取本轮另一位 Pro 的分支、提交、文件、原型或中间结果。

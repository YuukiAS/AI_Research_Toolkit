# 小红书：AI 辅助科研选题讨论采集

## 目标

本目录用于收集小红书上关于“AI 如何辅助科研选题、发现研究问题、寻找前作缺口、形成候选课题”的公开讨论，作为后续研究 AI 科研选题工作流的现实经验材料。

当前阶段只研究“辅助科研选题”。不把全自动科研、自动写论文、自动跑实验当成本轮主题；只有当相关帖子直接讨论“如何产生/筛选研究问题”时才纳入。

第一轮目标为 **10–20 篇**高相关帖子，优先选择点赞 **≥100** 的内容。评论区不采集。

## 执行方式决定

本轮固定使用 **macOS 原生小红书 App**，不切换到网页端。

参考过 `chang-zy/xiaohongshu-skill` 后，决定：

- **不直接使用它的运行时。** 其搜索、正文读取和筛选实现依赖 Chrome DevTools Protocol、网页 DOM 和 Chrome 扩展，不能直接控制原生小红书 App。
- **不为这一轮 fork 或重写它。** 10–20 篇的规模下，把 Chrome 执行层改成 macOS App 执行层的成本高于直接采集。
- **只复用它已经验证过的采集思想。** 包括关键词搜索、按互动量筛选、逐篇读取、字段记录、图片顺序、去重和失败后继续下一篇。
- 如果以后确认需要经常做 50–200 篇以上的原生 App 调研，再单独评估是否把本轮稳定操作封装成原生 macOS Skill。

因此，本轮是一个**有界的原生 App UI 采集任务**，不是新的通用爬虫或 Skill 开发任务。

## 数据结构

每篇帖子使用独立目录：

```text
posts/
  001_作者_短标题/
    note.md
    images/
      01.png
      02.png
      ...
```

`note.md` 保存可复制的文字与追溯字段；配图按原顺序截屏，不下载原图。全局索引使用 `manifest.csv`。

原始材料与后续 AI 综合分析分开：

```text
docs/research/xhs-ai-research-ideation-20261122/
  README.md
  COLLECTION_PROTOCOL_ZH.md
  POST_TEMPLATE.md
  manifest.csv
  posts/
  synthesis/
```

第一轮采集完成前，`synthesis/` 不提前写结论。

## 与 AI Research Toolkit 的关系

本目录记录的是通用 AI 科研方法研究材料，符合本仓库“科研参考、自动科研系统参考、工作流研究”的边界。它不修改任何正式 Skill，也不把外部 Skill 自动安装进本仓库。

后续若本轮经验形成可复用的正式 Skill，再按仓库边界转到 `AI_Skills_Collection` 独立评审和实现。

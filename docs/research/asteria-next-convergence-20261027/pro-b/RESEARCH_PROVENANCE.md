# 研究来源与独立性记录

## 1. 当前写入范围

- 仓库：`YuukiAS/AI_Research_Toolkit`
- 分支：`research/asteria-next-convergence-20261027-pro-b`
- 共同基线：`23a1c4840f665e66f7af95ffadaadd96dc999e7f`
- 初始写入验证提交：`2703428bc9b080b809adb96b5fa93f3f51fef590`
- 唯一成果目录：`docs/research/asteria-next-convergence-20261027/pro-b/`

本轮没有读取 `research/asteria-next-convergence-20261027-pro-a` 的分支、提交、文件、prototype、PR 或中间结果。

## 2. 历史候选输入

完整纳入比较的历史分支：

- `research/complex-system-showcase-20261026-r2-gpt6`
- `research/complex-system-showcase-20261026-r2-gpt56`
- `research/architecture-evolution-system-20261027-pro-a`
- `research/architecture-evolution-system-20261027-pro-b`

比较覆盖研究文本、原型各主页面、桌面／手机、差异、检查、机制、source binding、四项目压力测试和截图，不只看首页。

## 3. 内容与视觉输入

- `research/complex-system-showcase-20261027-work-editorial-audit`
- `docs/research/complex-system-showcase-20261026/r2/editorial-audit/`
- `research/complex-system-editorial-curation-evidence-20261027-work`（AI Skills）
- 当前 Clear Writing、Product UI Copy、Frontend Design、Artifact Curation 及 whole-product taste／visual freeze 相关规则。

这些输入用于删除无信息增量元素、避免 schema 驱动 UI、减少图文重复、重做手机阅读顺序、执行整页审查和人话审查。

## 4. Asteria 当前事实

读取并对照 `YuukiAS/Asteria` 当前 main：README、ROADMAP、TODO、VERSIONING、当前 `ArchitectureProjectV2`、typed relations、semantic diff、repository bridge、validation、graph presentation、projections、migration 和当前 UI／测试。当前 Asteria 已明确：

- 2.0 是唯一 active product shell；
- Architecture／Lineage／Evidence 共享 canonical semantic graph；
- 当前 schema 核心为 entities、symbols、relations、variants、views；
- repository bridge 已定义固定提交、结构锚点、测试、来源、置信度、实现状态和 staleness；
- implementation binding 不是科学证明；
- 1.x live canvas 已归档，只保留迁移兼容。

因此本候选选择演进 Asteria，而不是建立平行产品。

## 5. 参考仓库

只读核对：

- `YuukiAS/Mica-for-ChatGPT`
- `YuukiAS/CAT-TRACE`
- `YuukiAS/STAT5060-TA`

原型中的文件、函数、测试、commit、算法状态和 Tutorial finding 只用于 reference projection；本轮没有修改这些仓库，也没有把未实现内容伪装成实现。

## 6. 开源研究

重新核对 LikeC4、Structurizr、Cytoscape.js、ELK.js、React Flow、Mermaid、Graphviz、Tree-sitter、SCIP、dependency-cruiser、Difftastic、GumTree、MADR、Log4brains、VitePress／Vite、Ajv、KaTeX 和 Shiki 的职责、维护边界和采用方式。版本和许可证必须在正式实现时再次锁定；本轮只冻结能力取舍，不执行依赖升级。

# 一手来源与观察记录

核查日期：2026-10-26。身份 `gpt6`。本文只记录本轮实际取得的材料及其用途；来源中的执行命令没有作为本任务授权。外部动态文档的观察仅对核查当日有效。

## 共同基线与研究权威

任务与根目录共同基线固定在 `a5070288cd7625658524218c83c411fb93475cc6`。完整读取了[正式任务](https://github.com/YuukiAS/AI_Research_Toolkit/blob/a5070288cd7625658524218c83c411fb93475cc6/docs/research/complex-system-showcase-20261026/00_INDEPENDENT_DESIGN_TASK_ZH.md)，先完成写入及回读，之后才开展研究。

| 材料 | 本次采用的约束或事实 |
| --- | --- |
| [AI_RELIABILITY_SYSTEM_REFERENCE](https://github.com/YuukiAS/AI_Research_Toolkit/blob/a5070288cd7625658524218c83c411fb93475cc6/AI_RELIABILITY_SYSTEM_REFERENCE.md) | 系统真实用户损失；独立 DA 与相关能力的目标分工；不把解释网站变成另一套平台 |
| [COMPLEX_SYSTEM_DESIGN_GUIDE](https://github.com/YuukiAS/AI_Research_Toolkit/blob/a5070288cd7625658524218c83c411fb93475cc6/COMPLEX_SYSTEM_DESIGN_GUIDE.md) | 与最强简化路线竞争；部件的必要性、失败处理与生命周期 |
| [COMPLEX_ARCHITECTURE_EXPLANATION_STANDARD](https://github.com/YuukiAS/AI_Research_Toolkit/blob/a5070288cd7625658524218c83c411fb93475cc6/COMPLEX_ARCHITECTURE_EXPLANATION_STANDARD.md) | 讲清输入、机制、输出、真实消费者；证据不能只靠箭头或协议字段 |
| [已接受的解释案例](https://github.com/YuukiAS/AI_Research_Toolkit/blob/a5070288cd7625658524218c83c411fb93475cc6/docs/examples/ACCEPTED_COMPLEX_ARCHITECTURE_EXPLANATION_2026-10-22.md) | 具体失败及根因先行；采用因果解释方式，不照搬版式 |

DA 历史只读分支 `research/software-production-decision-20261013` 当时 HEAD 为 `ae2766a62b1546048ec6122e01ee95f1904fb73c`。实际取得 `CURRENT.md`、`01_REALITY_AND_ALTERNATIVES.md`、`02_ARCHITECTURE_AND_COMPONENTS.md`、`03_END_TO_END_EXECUTION_AND_VALIDATORS.md`、`04_SEVEN_REPOSITORY_ADOPTION.md`、`06_IMPLEMENTATION_AND_EVALUATION.md`、`11_ARCHITECTURE_EXPLAINED.md`；对长文重点读取 E1–E8、D2/D3/D4、标准与消费者、Lucerna 接入、宿主探针、成本和后续修订。没有把“取得全文”冒充逐行审计所有历史记录。

AI Skills 总体架构只读分支 `design/ai-reliability-architecture-20261026` 当时 HEAD 为 `fd6916ad5fdd5fb905544b6a127f9b0d31a737e1`。实际读取 `ARCHITECTURE_ZH.md` 与 `ROADMAP.md`。采用更新的独立 DA 所有权；旧协议约束仍有参考价值，但不把旧审查结论转授给新分工。

Lucerna 采用研究材料给出的固定提交 `79dd2875d3da33c6a6d80e5e35bea812b84c1ceb`。实际读取原任务、修复记录、前端状态源文件、前端测试、独立验收合同，以及 Rust 中确认次级故障与未观测证据的相邻实现。具体路径和事实到来源的映射见 [正文 E1–E11](DA_STORY_AND_EVIDENCE.md#固定来源索引)。没有从当前应用观察倒推该历史版本，也没有启动 Lucerna。

## 外部方案：源码和官方资料

| 项目 | 直接读取的位置 | 对决定有影响的观察 |
| --- | --- | --- |
| Eleventy / Build Awesome | [README](https://github.com/11ty/buildawesome)、[稳定 tag package](https://github.com/11ty/buildawesome/blob/v3.1.7/package.json)、main package、[版本记录](https://www.11ty.dev/docs/versions/)、[front matter](https://www.11ty.dev/docs/data-frontmatter/)、[Nunjucks](https://www.11ty.dev/docs/languages/nunjucks/) | `11ty/eleventy` 当时跳转到 `11ty/buildawesome`；稳定 3.1.7 与 main alpha 分开。普通模板与内容文件满足维护需求。稳定 package 的 Git blob 为 `71524ae42ffe48f839f8784a8be2ebd3db678e0d` |
| Astro | [核心 package](https://github.com/withastro/astro/blob/main/packages/astro/package.json)、[许可](https://github.com/withastro/astro/blob/main/LICENSE)、[islands](https://docs.astro.build/en/concepts/islands/) | 静态内容同样可无客户端框架；本次不需要多框架局部 hydration。拒绝的是不必要的组织成本，不是臆测性能劣势 |
| VitePress | [package](https://github.com/vuejs/vitepress/blob/main/package.json)、[许可](https://github.com/vuejs/vitepress/blob/main/LICENSE)、[Vue in Markdown](https://vitepress.dev/guide/using-vue) | 文档默认壳与 Vue 能力成熟，但首次解释页面不需要大部分文档导航；本次 main 为预发行 |
| Docusaurus | [核心 package](https://github.com/facebook/docusaurus/blob/main/packages/docusaurus/package.json)、[许可](https://github.com/facebook/docusaurus/blob/main/LICENSE)、[SSG](https://docusaurus.io/docs/advanced/ssg) | React/MDX、版本与多语言适合大型文档；当前解释页没有相应收益 |
| React Flow / xyflow | [README](https://github.com/xyflow/xyflow)、[官方例子](https://reactflow.dev/examples/overview) | 编辑式节点画布适合图操作；本例不要求读者编辑拓扑，责任展开更直接 |
| Observable Plot | [package](https://github.com/observablehq/plot/blob/main/package.json)、[交互文档](https://observablehq.github.io/plot/features/interactions) | 科研数值材料可以受益；DA 没有实测效果分布，不为了视觉而制造图表 |
| Carbon | [README](https://github.com/carbon-design-system/carbon)、[Content switcher](https://carbondesignsystem.com/components/content-switcher/usage/) | 同一对象相关视图可以原位切换；不是跨页面导航。借鉴使用语义与稳定层级，没有导入其组件库 |
| GOV.UK Frontend | [README](https://github.com/alphagov/govuk-frontend)、[Details](https://design-system.service.gov.uk/components/details/) | details 适合补充材料，必读状态不能藏进去。参考渐进增强与普通语义 HTML；没有采用政府品牌 |
| Automerge | [README](https://github.com/automerge/automerge)、[MIT 许可](https://github.com/automerge/automerge/blob/main/LICENSE)、[冲突语义](https://automerge.org/docs/reference/documents/conflicts/) | 同一属性并发赋值的默认读取值与冲突值不同；底层保留不等于应用界面完成冲突处理。第二系统不运行库，故没有借 Node/浏览器兼容声明冒充应用验证 |

外部文件返回的 Git blob 标识保存在 [检索清单](references/source-manifest.json)。blob 是内容身份，不是本轮运行测试的证据。没有复制第三方完整代码；许可只用于判断未来采用的可行性。将来真的引入依赖时仍须保留其许可与通知。

## 实际视觉观察

本轮浏览器实际打开 GOV.UK Details、Carbon Content switcher、Eleventy Getting Started，保存了[原始观察截图](references/README.md)。GOV.UK 捕获时嵌入示例区域没有完整呈现，因此仅依据外层页面与官方用法理解 disclosure，不声称实测了其嵌入示例。Carbon 的文档侧栏适合查阅，却会分散本例第一屏注意力；只借用内容切换原则。Eleventy 页面能核对稳定版本，但其文档版式不是本网站视觉来源。

另外下载并打开了原 DA 11/12 两图。旧图对熟悉系统的人有全局核对价值，初次阅读则需要追踪泳道、箭头与长文。改进方案把真实例子放首屏、三条结果就地比较、失败接收者紧邻结果；这是可查看的结构变化，尚非独立读者实验。

本轮没有访问另一模型分支、目录、Issue、PR 或成果，也没有将任何未读材料写成“参考过”。

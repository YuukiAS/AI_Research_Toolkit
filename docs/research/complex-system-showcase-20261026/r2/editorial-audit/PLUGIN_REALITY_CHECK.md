# 现有插件现实检验

日期：2026-10-27

本轮在真实页面上按当前安装版 Clear Writing（含 product-ui-copy、writing-fidelity、中文终审）与 Frontend Design 的正式边界执行，不把“读过技能说明”视为通过。检查对象包括首屏、组件详情、连线详情、三条路径、折叠区和 390px 手机视图。

| 代表输入 | 当前能力实际能解决 | 没有自动解决或容易解决错 | 应由谁负责 |
| --- | --- | --- | --- |
| “一次交付怎样完成验收、返修和复验” | Clear Writing 能压缩报告式标题，得到“失败怎样回到原任务”。 | 仅改句子不会发现首屏与路径控件已经重复解释流程。 | Clear Writing 改写；Artifact Curation 消重。 |
| 每个节点都有“为什么存在 / 需要什么 / 交出什么 / 谁接收 / 少了会怎样 / 当前状态” | Clear Writing 能让各字段更自然，并保护技术含义。 | 它按职责不能决定字段是否存在；若直接润色，会把错误模板写得更顺。 | Artifact Curation。 |
| 五字段连线详情 | product-ui-copy 能缩短字段名。 | 不能只靠文案规则判断图已经表达了方向和触发。 | Frontend Design + Artifact Curation。 |
| GPT‑6 的 1,710px 手机关系图 | Frontend Design 能发现响应式阅读顺序失败，并改成路径优先。 | Clear Writing 无法修复结构；只缩短节点文字仍然需要长滚动。 | Frontend Design。 |
| “旧截图不能成为新版本证据” | writing-fidelity 会保护版本归属和证据强度。 | 单纯追求减字可能误删这条边界。 | Writing Fidelity。 |
| 页眉、首屏、徽标、详情和页脚重复“尚未接入生产” | Clear Writing 能识别页面级重复；Frontend Design 能指定状态主位置。 | 当前没有自动提取动态状态并聚合同义事实的正式回归器。 | Clear Writing + Artifact Curation。 |
| 三路线比较与旧工时估算 | Frontend Design 能下沉为折叠内容并保留来源。 | 如果只用“更简洁”目标，容易直接删除估算的范围包含关系。 | Artifact Curation + Writing Fidelity。 |

## 现实结论

- **已经能做**：标题与正文自然化、内部过程语言压缩、页面级节奏检查、手机阅读顺序、留白与层级、事实与证据边界保护。
- **还缺正式实现**：真实渲染可见内容枚举、逐项 disposition、模板字段覆盖率探针、图文重复探针、跨动态状态的同义重复聚合、可 replay 的界面内容回归器。
- **最危险的误用**：把 Clear Writing 当成“把所有现有文字润色一遍”。这会改善句子，却保留本来不该存在的字段和区块。
- **本轮处理**：没有修改 production skill，也没有发布新版本；只把真实案例和候选规则送入现有设计/TODO 路线。

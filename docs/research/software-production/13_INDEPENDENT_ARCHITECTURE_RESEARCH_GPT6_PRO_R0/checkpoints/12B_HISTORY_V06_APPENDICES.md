# v0.6历史反证：汇编附录与全部文本完成

RUNNER_ID: GPT6_PRO
READ_DATE: 2026-10-15
HISTORY_SNAPSHOT_COMMIT: 3a8e5df5360c20814bbbf34d7a4f392655437588
INDEPENDENT_FREEZE: 01_INDEPENDENT_CANDIDATES_BEFORE_HISTORY.md @ 同一提交；保持未改。

## 实际读取与范围闭合

前八份核心文本见12A。本批完成09_FULL_DOSSIER_V0_6/typeset/全部文本：

| 相对v0.6目录路径 | 实际blob | 读取范围 |
|---|---|---|
| typeset/input_manifest.json | 98e10d6638b214a2af7f439c04e5f2a8b1c0772c | 全文：四卷、十个附录输入及计数 |
| typeset/workflow_architecture_dossier_v0.6.md | 8c759bc78b7c690e75b620792aafd37dc15cd963 | 全文：四卷及246条、25补查、CARE40条和52追加/META；长响应逐段展开到EOF，另补68–91截断交界 |
| typeset/build_workflow_dossier.py | ca5baba48273bdaeb6649eaf7f4249f5f7a185f4 | 全文：源汇编、计数、四图、构建与指纹；只读未执行 |
| typeset/preamble.tex.in | e9e307514a41b9ee8e4a2f2053241420e15adc9f | 全文；不分享字体 |
| typeset/figures/architecture_overview.dot | 1a8b298a0ef12994a922fab2427a0a8b6ad351ae | 全文 |
| typeset/figures/risk_routing.dot | b8b41f3abdf33cc1d1a7bce071791bc96d3a4eb2 | 全文 |
| typeset/figures/lucerna_run.dot | 91fe52078f390a9efb60de7c42f5d21061f4fd01 | 全文 |
| typeset/figures/model_acceptance.dot | 080f2e119a56e9c66f5dc26f3a8f5e9dcdff6f42 | 全文 |

定向子树d0c53c5a85edc30b824196a6619f024a586f171c返回truncated=false。正文和附录均经历史汇编读取，未回到十个已完成源仓库，也未重开其审计。计数不是独立事故数；同名C编号必须标CUHK或CARE。

## PDF二进制限制（不得冒充视觉验证）

exports目录已单独枚举，唯一完整PDF blob3eb437955c54f3b2f7477400bdfd1de0e290a37d，907998字节。GitHub按精确blob URL实际读取返回HTTP400：接口只支持UTF-8，拒绝二进制；对应raw URL外网读取亦未取得内容。四幅PDF图也不是已渲染证据。其四份DOT原文及构建源已完整读到关系与文字，但不能替代已生成PDF的排版/视觉核验。历史BUILD_REPORT的76页/73有效页和通过声明仅作历史构建者记录，不升级为本轮亲见。这个限制不妨碍基于已完整取得的全部架构、审查与逐项附录文本完成架构反证；最终须保留限制。

## 新证据如何攻击冻结候选

H06-8：LX07–LX10说明正确返回/局部表单清理不等跨安全存储事务和全部原生终止路径闭合。A/B/C必须由专业领域入口观测真实后置条件，不能把共同状态包当修复。

H06-9：LX12–LX15证明输入枚举、正式聚合和实际组件消费者必须贯通；正确helper没被调用、fixture直接设置headline都会假绿。专业验证须干预真实I/O替换点后运行同一生产链，而非让每个层次各自生成期望。

H06-10：AX03/AX05显示虚拟布局正确而SVG/HTML坐标变换错误，失败未必要求重写整个布局。B不得把每次失败自动升级架构重做，A也不能只看算法单测；复用正确机制并检查真实屏幕消费者。

H06-11：Mica的坏包变异、协调篡改防线有价值但不证明产品有效；安全关闭功能不能冒称收益。旧runtime不变、仅验证器修订时可以重判原证据，不能因回执commit改变重跑昂贵动作。

H06-12：SeminarArc的OCR读错控件和Android输入映射构成明确假阴性，必须在产品处理前核对真正输入/观测；不能根据保存后错误输出反推期望而自洽通过。验收器有独立身份仍可能错，保护来源不是保护错误永远不可撤销。

H06-13：CARE的B4/B5/B6重建随机模型、固定/序号代理指标，说明步数、CSV、阶段令牌、hash都不能证明连续训练或真实评价。RACE-03还要求追初始化权重的数据暴露，当前split不交叉仍可能泄漏。保留当前方法忠实与研究结论有效两个维度。

H06-14：FLOW-04/05/06说明专业reference须覆盖不等组归约与有效资格；仅测mask/梯度会漏分母。FLOW-01又说明不同感受野1e-6无来源阈值会错杀。门必须能拒绝无依据新要求，并由适用领域判断解释争议，不能把所有check失败转用户。

H06-15：FLOW-02/03/07要求语义输入闭包与事件分离：快进工作树不等新审查；文档/回执不改变产品消费身份；sampler/augmentation等真正影响方法的源必须纳入。不能用“稳定摘要”漏关键依赖，也不能用HEAD一变全失效。

H06-16：DEPLOY单层输入修复保留普通15例是轻量正例，QIF/MyoWall合法NO_GO同样是完成。新体系必须保留这些成功，不因历史失败数多而强制所有任务大审查/重训。

## 下一步

v0.6全部可读文本已完成、PDF呈现未核验。立即继续v0.7全目录，然后v0.8及original_reviews；不在此等待。历史作者写“本轮已实测”的CPU局部反例均是历史记录，本研究没有重跑，不改01。

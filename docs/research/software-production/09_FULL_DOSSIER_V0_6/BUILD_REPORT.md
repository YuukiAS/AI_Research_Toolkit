# PDF Build Report: workflow_architecture_dossier_v0.6

日期：2026-10-13

## 产物

- PDF：`docs/research/software-production/09_FULL_DOSSIER_V0_6/exports/workflow_architecture_dossier_v0.6.pdf`
- SHA256：`a641ae2875148f204208b6681d3f519f0ac98d4772912693ee4638cbf3079db9`
- 总页数：76 页，A4。
- 有效内容页数：73 页，按页 4-76 统计；页 1-3 为封面/目录。四卷主体与补充图页为页 5-26，共 22 页；附录从页 27 开始。

## 输入文件

正文四卷完整收录：

- `01_ARCHITECTURE_AND_COMPONENT_CONTRACT.md`
- `02_INCIDENTS_AND_CAUSAL_COVERAGE.md`
- `03_ALL_USER_QUESTIONS_AND_DECISIONS.md`
- `04_LUCERNA_FULL_WORKED_RUN.md`

附录来源：

- `../04_SIX_REPO_AUDIT/LUCERNA.md`
- `../04_SIX_REPO_AUDIT/BOBBIO.md`
- `../04_SIX_REPO_AUDIT/MICA.md`
- `../04_SIX_REPO_AUDIT/SEMINARARC.md`
- `../04_SIX_REPO_AUDIT/ASTERIA.md`
- `../04_SIX_REPO_AUDIT/CUHK_DATE.md`
- `../04_SIX_REPO_AUDIT/problem-control-map.csv`
- `../05_PROPOSED_ARCHITECTURE_V0_2/INCIDENT_ADDENDUM.md`
- `../07_CARE_AND_EXECUTABLE_REVIEW_V0_4/CARE_FAILURE_LEDGER.md`
- `../08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/CARE_LINEAGE_AND_CAUSAL_AUDIT.md`

构建提示词已读取并执行：`05_CODEX_PDF_BUILD_PROMPT.md`。

## 编译环境

- Git commit：`c9d651272bab15f9e7bc37e5179c5f73daae87bb`
- 分支：`research/software-production-decision-20261013`
- 渲染路线：Markdown -> Pandoc -> XeLaTeX -> PDF。
- Pandoc：2.14.0.3。
- XeLaTeX：XeTeX 3.14159265-2.6-0.999992，TeX Live 2020。
- TeX/字体资源：`/overflow/htzhu/mingcheng_new/render_resources/chinese_math_pdf`。
- 主要字体：Noto Serif SC、Noto Sans SC、TeX Gyre Termes；`pdffonts` 显示核心字体均嵌入且有 Unicode 映射。

实际编译命令：

```bash
python docs/research/software-production/09_FULL_DOSSIER_V0_6/typeset/build_workflow_dossier.py --compile
```

## 编号和数量核对

- Lucerna：L01-L33，33 条，无缺号。
- Bobbio：B01-B32，32 条，无缺号。
- Mica：M01-M46，46 条，无缺号。
- SeminarArc：S01-S32，32 条，无缺号。
- Asteria：A01-A47，47 条，无缺号。
- CUHK Date：C01-C56，56 条，无缺号。
- 六仓库主账本合计：246 条登记；报告中明确说明它们不是 246 次独立事故。
- 晚期补查：LX01-LX20，AX01-AX05，均无缺号；报告中明确说明不得直接加成 271 次事故。
- CARE 原始归因：C01-C40，40 条，无缺号。
- CARE 追加登记：RB04/B7/MM/DG/PR/RACE/FLOW/DEPLOY 共 52 条；另有 META-01 作为谱系/分母边界记录，不计入这 52 条。

## PDF QA

实际执行：

```bash
pdfinfo docs/research/software-production/09_FULL_DOSSIER_V0_6/exports/workflow_architecture_dossier_v0.6.pdf
pdffonts docs/research/software-production/09_FULL_DOSSIER_V0_6/exports/workflow_architecture_dossier_v0.6.pdf
pdftotext -layout docs/research/software-production/09_FULL_DOSSIER_V0_6/exports/workflow_architecture_dossier_v0.6.pdf docs/research/software-production/09_FULL_DOSSIER_V0_6/typeset/build/workflow_architecture_dossier_v0.6.txt
pdftoppm -f <page> -l <page> -r 140 -png docs/research/software-production/09_FULL_DOSSIER_V0_6/exports/workflow_architecture_dossier_v0.6.pdf ...
```

文本抽取结果：全文 76 个非空页面可抽取；未发现 `�`、`□` 或原 `∪` 缺字残留。`scar∪edema` 在排版生成层改写为“scar 与 edema 的并集”，不改变原始 Markdown 文件和科学含义。

人工渲染检查页：

- 页 1：封面和目录首页；中文正常，链接目录可见。
- 页 2：目录续页；四卷和附录页码完整。
- 页 6：主架构图；箭头方向、节点和文字清楚。
- 页 8、12、16：第一、二、三卷代表页；正文和跨页表格未裁切。
- 页 21、24：第四卷代表页及宽表；长文本折行正常。
- 页 26、27：Lucerna 职责流程图与模型/正式验收时序图；图形清楚、未乱码。
- 页 56、72：控制映射宽表与 CARE 追加登记表；跨页表格表头和内容可读。
- 页 76：末页；不是空白页，末段边界说明可读。

## 边界和未做事项

- 未修改六个产品、CARE、Bridge 或插件源码。
- 未启动模型训练、Critic、付费实验、GUI 原生验收或云端部署。
- 未合并主分支。
- 附录保留登记、证据状态、来源定位和控制，不把登记数冒充独立事故数。

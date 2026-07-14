# R Research Stack

本文件记录 `AI_Research_Toolkit` 后续科研环境应当覆盖的 R 包。它面向统计建模、生物信息学、多组学、医学影像辅助分析和可复现研究，不是单个环境的安装脚本，也不建议把全部包安装进同一个 R library。

R 与 Bioconductor 的版本对应关系非常重要。正式项目必须记录 R 版本、Bioconductor release、包版本和系统依赖，不能只记录包名。

## 使用原则

1. 通用统计、组学分析和医学影像辅助分析应使用不同的 `renv` 项目。
2. Bioconductor 包必须通过匹配当前 R 版本的 `BiocManager` 安装。
3. 原始测序处理、比对、变异检测、DICOM 转换和大型影像配准仍应使用原生软件；R 包主要负责统计建模、数据整合和结果解释。
4. 对 Python 与 R 都存在的方法，例如 DESeq2/PyDESeq2、Scanpy/Seurat，应指定一个主实现，另一个只用于交叉验证或协作需要。
5. 关键分析必须保存 `sessionInfo()`、随机种子、输入数据版本和参数。

## 1. 环境与项目管理

### Core

- `renv`：项目级依赖隔离和 lockfile。
- `pak`：快速、可靠地解析和安装依赖。
- `BiocManager`：安装与当前 R 版本匹配的 Bioconductor release。
- `here`：稳定管理项目路径。
- `config`：按环境管理配置。
- `withr`：临时修改随机种子、环境变量和图形参数。
- `cli`：命令行信息与错误提示。
- `rlang`：现代 R 元编程和错误处理基础。

### Recommended

- `targets`：可复现的数据分析流水线。
- `tarchetypes`：常见 `targets` 模式。
- `crew`：为 `targets` 提供并行 worker 管理。
- `future`、`future.apply`：统一并行后端。
- `parallelly`：并行资源检测。

## 2. 数据处理与通用计算

### Core

- `data.table`：大规模表格数据处理。
- `dplyr`：数据变换。
- `tidyr`：长宽表转换和嵌套数据。
- `purrr`：函数式迭代。
- `readr`：文本表格读取。
- `readxl`：Excel 读取。
- `stringr`：字符串处理。
- `forcats`：分类变量处理。
- `lubridate`：日期时间处理。
- `janitor`：列名与表格清理。

### Large and cross-language data

- `arrow`：Parquet/Arrow 数据交换。
- `duckdb`：本地分析型数据库和大表查询。
- `DBI`：数据库统一接口。
- `RSQLite`：SQLite 接口。
- `qs`：快速 R 对象序列化；长期归档仍应优先使用开放格式。
- `reticulate`：调用 Python；只在确实需要跨语言时使用，避免环境不可控。

## 3. 统计建模

### Core regression and inference

- `broom`：统一整理模型输出。
- `sandwich`：稳健协方差估计。
- `lmtest`：模型检验。
- `car`：回归诊断和线性假设检验。
- `emmeans`：边际均值和对比。
- `marginaleffects`：边际效应、预测和对比。
- `performance`：模型诊断与性能汇总。
- `parameters`：模型参数整理。

### Mixed, longitudinal and generalized models

- `lme4`：线性与广义线性混合模型。
- `nlme`：相关结构和经典纵向模型。
- `glmmTMB`：灵活的广义混合模型、零膨胀和离散度结构。
- `mgcv`：广义加性模型。
- `geepack`：广义估计方程。
- `ordinal`：有序响应模型。
- `MASS`：常用统计方法和分布模型。

### Survival and event-history analysis

- `survival`：Cox 模型、Kaplan-Meier 和生存对象基础。
- `survminer`：生存结果整理和常用图形。
- `cmprsk`：竞争风险。
- `riskRegression`：风险预测、校准和时间依赖评估。
- `pec`：预测误差与模型评估。
- `mstate`：多状态模型。
- `flexsurv`：参数生存模型。

### Bayesian modeling

- `rstan` 或 `cmdstanr`：Stan 接口；新项目通常优先 `cmdstanr`。
- `posterior`：后验样本标准格式与汇总。
- `bayesplot`：贝叶斯诊断。
- `loo`：留一法交叉验证和模型比较。
- `brms`：基于 Stan 的公式化贝叶斯模型。
- `rstanarm`：常用回归模型的 Stan 实现。
- `coda`：MCMC 诊断与传统接口。
- `nimble`：需要自定义贝叶斯模型或算法时使用。

### High-dimensional and machine learning

- `glmnet`：Lasso、Elastic Net 和正则化广义线性模型。
- `ranger`：高性能随机森林。
- `xgboost`：梯度提升。
- `tidymodels`：统一建模、调参与评估框架。
- `mlr3`：另一套完整机器学习框架；团队应在 `tidymodels` 与 `mlr3` 中选主线。
- `SuperLearner`：集成学习。

### Causal inference

- `MatchIt`：匹配。
- `WeightIt`：倾向评分与平衡权重。
- `cobalt`：协变量平衡诊断。
- `survey`：复杂抽样与加权分析。
- `drtmle`：双重稳健和目标最大似然相关方法。
- `tmle`：目标最大似然估计。
- `grf`：广义随机森林与异质性处理效应。
- `dagitty`：DAG 表达与调整集分析。
- `mediation`：中介分析；使用前应检查识别假设。
- `fixest`：高维固定效应和面板模型。

## 4. 统计图形与结果表达

视觉规范将在后续单独建设。本文件只记录分析环境应具备的包。

### Core

- `ggplot2`：主要统计图形系统。
- `scales`：坐标、标签和尺度。
- `patchwork`：多面板组合。
- `cowplot`：组合、对齐和论文式标注。
- `ggrepel`：避免文本重叠。
- `ggtext`：富文本标签。
- `ragg`：高质量光栅图形设备。
- `svglite`：稳定导出 SVG。

### Statistical and scientific figures

- `ComplexHeatmap`：复杂热图和组学注释。
- `circlize`：环形和弦图与环形布局。
- `pheatmap`：简单热图；复杂论文图优先 `ComplexHeatmap`。
- `ggdist`：分布与不确定性表达。
- `ggridges`：脊线图。
- `ggbeeswarm`：点分布。
- `forestplot` 或 `forestploter`：森林图。
- `ggalluvial`：桑基/流向图。
- `igraph`、`ggraph`、`tidygraph`：网络与图结构可视化。
- `UpSetR` 或 `ComplexUpset`：集合交集图。

## 5. Bioconductor 数据结构基础

这些数据结构决定不同组学包之间能否稳定交换数据，优先级高于单个分析方法。

### Core

- `S4Vectors`：Bioconductor S4 基础容器。
- `IRanges`：区间数据结构。
- `GenomicRanges`：基因组坐标和区间运算。
- `GenomeInfoDb`：染色体和基因组信息。
- `Biostrings`：DNA/RNA/蛋白质序列。
- `SummarizedExperiment`：组学矩阵、样本信息和 feature 信息的统一容器。
- `SingleCellExperiment`：单细胞数据容器。
- `MultiAssayExperiment`：多组学、多 assay 联合容器。
- `DelayedArray`：延迟计算的大型矩阵接口。
- `HDF5Array`：HDF5 后端矩阵。
- `BiocParallel`：Bioconductor 并行接口。

## 6. 基因组文件、注释与序列

### Core

- `Rsamtools`：SAM/BAM/CRAM 和索引文件访问。
- `GenomicAlignments`：比对结果表示与计数。
- `VariantAnnotation`：VCF 读取、注释和变异对象。
- `rtracklayer`：BED、GFF、WIG、BigWig 等格式及 UCSC 接口。
- `GenomicFeatures`：由 GTF/GFF 构建转录本数据库。
- `AnnotationDbi`：注释数据库接口。
- `AnnotationHub`：集中访问注释资源。
- `biomaRt`：访问 BioMart。
- `ensembldb`：Ensembl 注释数据库。
- `BSgenome`：参考基因组容器。
- `ShortRead`：高通量序列和 FASTQ 质量处理。

### Organism annotation

按物种安装，例如：

- `org.Hs.eg.db`：人类基因注释。
- `org.Mm.eg.db`：小鼠基因注释。
- 对应的 `TxDb.*`、`BSgenome.*` 和 `EnsDb.*` 包。

必须记录物种、基因组 build 和注释 release，不能只记录包名。

## 7. Bulk RNA-seq、转录组与差异分析

### Core

- `DESeq2`：基于负二项模型的差异表达分析。
- `edgeR`：计数数据建模、离散度估计和差异分析。
- `limma`：微阵列及 `voom` RNA-seq 工作流。
- `tximport`：导入 Salmon、kallisto 等转录本定量结果。
- `tximeta`：带 provenance 的转录本定量导入。
- `Rsubread`：比对、featureCounts 和相关工具的 R 接口。
- `apeglm`：效应量收缩。
- `ashr`：自适应收缩。
- `sva`：批次效应和 surrogate variable analysis。
- `RUVSeq`：不需要变异因子校正。

### Enrichment and interpretation

- `clusterProfiler`：富集分析和结果组织。
- `enrichplot`：富集结果可视化。
- `fgsea`：快速 GSEA。
- `GSEABase`：基因集对象与基础设施。
- `msigdbr`：MSigDB 基因集访问。
- `ReactomePA`：Reactome 通路分析。
- `DOSE`：疾病本体富集。
- `GSVA`：样本级基因集活性。
- `decoupleR`：通路和调控活性推断。

## 8. 单细胞与空间组学

### Core single-cell infrastructure

- `scuttle`：单细胞质量控制与基础处理。
- `scran`：归一化、方差建模和聚类辅助。
- `scater`：质量控制、降维和可视化。
- `DropletUtils`：液滴式单细胞数据处理。
- `batchelor`：批次校正基础框架。
- `bluster`：聚类算法接口。
- `BiocSingular`：降维后端。

### Analysis frameworks

- `Seurat`、`SeuratObject`：广泛使用的单细胞分析生态。
- `SingleR`：参考数据驱动的细胞类型注释。
- `celldex`：SingleR 参考数据。
- `scDblFinder`：doublet 检测。
- `Harmony`：批次整合。
- `muscat`：多样本多条件单细胞差异状态分析。
- `MAST`：单细胞差异表达模型。
- `tradeSeq`：轨迹相关差异分析。
- `slingshot`：轨迹推断。
- `miloR`：差异丰度分析。

### Spatial transcriptomics

- `SpatialExperiment`：空间组学数据容器。
- `BayesSpace`：空间聚类和分辨率增强。
- `nnSVG`：空间变异基因检测。
- `CARD`：空间转录组解卷积。
- `SPOTlight`：基于单细胞参考的空间解卷积。

不要默认同时使用所有整合和批次校正方法。应依据实验设计、混杂结构和生物问题选择，并保留未经校正的原始对象。

## 9. DNA 甲基化、表观组与染色质

按数据类型选择：

- `minfi`：Illumina 甲基化芯片。
- `sesame`：甲基化芯片处理与质量控制。
- `DMRcate`：差异甲基化区域。
- `ChIPseeker`：ChIP-seq peak 注释。
- `DiffBind`：差异结合分析。
- `csaw`：窗口化 ChIP-seq 差异分析。
- `chromVAR`：染色质可及性 motif 活性。
- `Signac`：单细胞染色质数据分析，通常与 Seurat 配合。
- `motifmatchr`：motif 匹配。
- `JASPAR2024` 或对应当前 release：转录因子 motif 数据。

## 10. 微生物组与生态数据

### Core

- `phyloseq`：微生物组计数、taxonomy、样本信息和系统发育对象。
- `vegan`：生态距离、多样性、排序和群落分析。
- `microbiome`：微生物组常用处理。
- `mia`：基于 `TreeSummarizedExperiment` 的微生物组基础设施。
- `TreeSummarizedExperiment`：层级 taxonomy/phylogeny 数据容器。
- `DECIPHER`：序列比对与分类相关工具。
- `Biostrings`：序列基础。

### Differential abundance and compositional analysis

- `ANCOMBC`：组成数据差异丰度。
- `ALDEx2`：基于 Dirichlet Monte Carlo 的组成分析。
- `corncob`：beta-binomial 丰度建模。
- `Maaslin2`：多变量关联分析。
- `metagenomeSeq`：微生物组差异分析工具。

对生态和物种联合分布模型，项目自己的 TRACE/HMSC/CAT-TRACE 实现不应被通用包替代。通用包主要负责数据整理、基线、诊断和结果比较。

## 11. 蛋白质组、代谢组与多组学

### Proteomics

- `MSnbase`：质谱数据基础设施。
- `Spectra`：质谱谱图对象与后端。
- `QFeatures`：定量蛋白质组数据结构。
- `DEP`：差异蛋白丰度分析。
- `limma`：常用于处理已归一化蛋白质组矩阵。

### Metabolomics

- `xcms`：色谱质谱峰检测和对齐。
- `CAMERA`：峰注释。
- `MetaboAnalystR`：代谢组统计分析与通路解释。

### Multi-omics integration

- `MOFA2`：多组学因子模型。
- `mixOmics`：监督与无监督多组学整合。
- `MultiAssayExperiment`：多 assay 数据管理。
- `DIABLO`：通过 `mixOmics` 使用的监督多组学方法。

## 12. 遗传统计与群体数据

按研究任务选择：

- `SNPRelate`：大规模 SNP 数据和 PCA/亲缘关系。
- `SeqArray`：测序变异数据的 GDS 存储与分析。
- `GWASTools`：GWAS 数据质量控制。
- `GENESIS`：群体结构与关联分析。
- `gdsfmt`：GDS 数据基础。
- `bigsnpr`：大规模基因型矩阵和 polygenic score。
- `susieR`：fine-mapping 和 sparse regression。
- `coloc`：共定位分析。
- `TwoSampleMR`：两样本孟德尔随机化；必须严格检查工具变量和样本重叠假设。
- `MendelianRandomization`：MR 分析的另一套接口。

原始 PLINK、BGEN、VCF 处理仍应配合 PLINK 2、bcftools 和其他原生工具。

## 13. 医学影像辅助分析

R 不是当前医学影像深度学习主线，但可用于统计汇总、影像表型分析和部分 NIfTI 处理。

### Recommended

- `RNifti`：快速读写 NIfTI。
- `oro.nifti`：NIfTI/Analyze 基础处理。
- `neurobase`：神经影像常用辅助函数。
- `freesurferformats`：读取 FreeSurfer 格式。
- `ANTsRCore`：ANTs 的 R 接口核心；安装和系统依赖复杂，应作为专用环境。
- `extrantsr`：ANTsR 相关辅助工作流。
- `WhiteStripe`：MRI 强度标准化相关方法。

医学影像的空间信息、方向矩阵、体素尺寸和插值方式必须显式检查。R 中读入图像后，不应只把体素当作普通三维数组处理。

## 14. 报告质量与验证

- `testthat`：测试。
- `vdiffr`：图形回归测试。
- `checkmate`：参数检查。
- `assertthat`：轻量断言。
- `lintr`：代码检查。
- `styler`：代码格式。
- `covr`：测试覆盖率。
- `sessioninfo`：更完整的环境信息。
- `bench`：性能基准。
- `profvis`：性能分析。

## 15. 推荐环境边界

```text
statistics-general/
  data.table + tidyverse components + survival + mixed models + Bayesian tools

bioinformatics-bulk-rnaseq/
  SummarizedExperiment + DESeq2/edgeR/limma + tximport + enrichment

bioinformatics-single-cell/
  SingleCellExperiment + scater/scran + Seurat or Bioconductor workflow

bioinformatics-genomics/
  GenomicRanges + Rsamtools + VariantAnnotation + annotation packages

bioinformatics-microbiome/
  phyloseq + mia + vegan + compositional methods

medical-imaging-statistics/
  RNifti + project phenotype tables + statistical models
```

## 16. 最小建议清单

### 通用统计

```text
renv pak here targets
 data.table dplyr tidyr purrr arrow
 broom survival lme4 glmmTMB mgcv
 emmeans marginaleffects sandwich
 ggplot2 patchwork ragg svglite
 testthat sessioninfo
```

### 生物信息学基础

```text
BiocManager
SummarizedExperiment GenomicRanges Biostrings
Rsamtools VariantAnnotation rtracklayer AnnotationHub
ComplexHeatmap BiocParallel
```

### Bulk RNA-seq

```text
DESeq2 edgeR limma tximport tximeta
apeglm sva
clusterProfiler fgsea GSVA
```

### 单细胞/多组学

```text
SingleCellExperiment scater scran scuttle
Seurat SingleR scDblFinder batchelor
MultiAssayExperiment MOFA2
```

## 17. 参考入口

- R Project: https://www.r-project.org/
- CRAN: https://cran.r-project.org/
- Bioconductor: https://bioconductor.org/
- Bioconductor package workflows: https://bioconductor.org/help/workflows/
- renv: https://rstudio.github.io/renv/
- targets: https://books.ropensci.org/targets/
- DESeq2: https://bioconductor.org/packages/DESeq2/
- edgeR: https://bioconductor.org/packages/edgeR/
- limma: https://bioconductor.org/packages/limma/
- SingleCellExperiment: https://bioconductor.org/packages/SingleCellExperiment/
- Seurat: https://satijalab.org/seurat/
- ComplexHeatmap: https://bioconductor.org/packages/ComplexHeatmap/

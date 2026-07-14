# Research Software Gaps

本文件记录 `AI_Research_Toolkit` 在独立软件层面的剩余缺口。重点是后续能够完整支持：

- 医学影像查看、转换、配准、分割检查和论文素材导出；
- AI 网络结构检查、架构图制作和矢量后期；
- 生物信息学原始数据处理、组学分析、网络可视化和结果审阅；
- 科研图片的批处理、格式转换和最终投稿输出。

Python/R 包分别记录在根目录的 `PYTHON_RESEARCH_STACK.md` 与 `R_RESEARCH_STACK.md`。本轮只建立能力与软件缺口清单，不处理视觉模板、配色、字体、Figma 组件库或顶会图形风格。

## 1. 当前已有能力

仓库已经跟踪以下图示与科研配图资源：

- D2：架构图、流程图和系统关系图。
- Graphviz：DAG、依赖图、状态图和网络结构。
- Draw.io：通用可编辑图示。
- PlantUML：UML、时序图、组件图和状态图。
- Typst：公式、图文说明页和 PDF 排版。
- Manim：数学动画与方法演示。
- diagrams.py：程序化系统组件图。
- Excalidraw：概念草图。
- Paper2Any：论文到图、PPT、Draw.io、海报和视频等工作流。
- academic-figure-generator：论文驱动的科研插图提示词和图片生成。
- AutoFigure：当前仅作为 source-only 参考。
- figures4papers：论文级 Python 图形样例参考。

用户已另外安装 BioRender 与 Figma 插件。它们分别提供生物医学素材与主设计画布，但不替代医学影像软件、模型检查器和标准矢量编辑器。

## 2. 优先级定义

- **Core**：对目标科研工作流存在实质性缺口，应正式纳入 `inventory/resources.yaml` 并提供安装/检查说明。
- **Recommended**：常用且有明确价值，但可按机器或项目选择安装。
- **Optional**：只适合特定数据类型、三维展示或人工后期。
- **Reference-only**：适合学习或生成局部素材，不应被视为稳定生产工具。
- **External/manual**：许可证、体积、平台或账号限制使其不适合由 Toolkit 自动安装。

## 3. AI 架构图与论文图后期

### 3.1 Inkscape — Core

**作用**：标准矢量图编辑和投稿前修整。

应覆盖：

- 编辑 Figma、Draw.io、D2、Graphviz、Matplotlib、ggplot2 等导出的 SVG/PDF；
- 调整路径、曲线、箭头、字体、线宽、裁剪区域和图层；
- 合并模型架构、医学影像切片、统计图和图例；
- 输出 SVG、PDF、EPS 和高分辨率 PNG；
- 修复跨工具导出时的字体替换、对象偏移和 mask 问题。

建议路径：

```text
software/vector-editing/inkscape/
```

建议状态：`priority: core`，桌面端人工使用为主，命令行导出作为辅助。

官方入口：https://inkscape.org/

### 3.2 Netron — Core

**作用**：检查真实模型计算图、算子、张量尺寸和导出结构。

支持的典型用途：

- 打开 ONNX、PyTorch、TensorFlow、Keras、Core ML 等模型；
- 核查模型导出是否遗漏分支、输入或动态维度；
- 从真实实现中提炼论文架构图所需的语义模块；
- 检查 checkpoint 转换和部署图。

Netron 的原始计算图通常过于细碎，不应直接作为论文主图。正确流程是：

```text
Netron 检查实现
  -> 提炼语义结构
  -> Figma / Draw.io / D2 构图
  -> Inkscape 最终修整
```

建议路径：

```text
software/model-inspection/netron/
```

官方入口：https://netron.app/

### 3.3 NN-SVG — Reference-only

**作用**：生成传统神经元连接图、CNN 三维特征块和简单网络 SVG。

适合局部几何素材，不适合多模态、动态路由、dictionary retrieval 或复杂医学影像网络的完整主图。

建议路径：

```text
references/neural-network-diagrams/nn-svg/
```

上游：https://github.com/alexlenail/NN-SVG

### 3.4 PlotNeuralNet — Reference-only

**作用**：用 LaTeX/TikZ 生成 U-Net、CNN、编码器—解码器和三维张量块风格图。

优点是源码可复现，缺点是复杂布局维护成本高，最终通常仍需在 Figma 或 Inkscape 中调整。

建议路径：

```text
references/neural-network-diagrams/plotneuralnet/
```

上游：https://github.com/HarisIqbal88/PlotNeuralNet

### 3.5 ImageMagick — Core

**作用**：科研图片的命令行批处理和格式转换。

应覆盖：

- 自动裁剪空白边缘；
- 调整分辨率、尺寸和色彩空间；
- 多面板拼图；
- PNG、TIFF、JPEG、PDF 等格式转换；
- 批量生成缩略图和预览图；
- 对输出图片执行基础元数据检查。

它不负责精细设计，但非常适合 Codex、CI 和批处理脚本。

建议路径：

```text
software/image-processing/imagemagick/
```

官方入口：https://imagemagick.org/

### 3.6 GIMP — Optional

**作用**：像素级编辑、位图修复、遮罩和图像合成。

仅在 AI 生成图、扫描图或位图素材必须人工修改时需要。Figma + Inkscape + ImageMagick 已覆盖大部分常规工作。

官方入口：https://www.gimp.org/

### 3.7 Blender — Optional

**作用**：高质量三维解剖模型、器官网格、动画和封面级渲染。

主要用于将 3D Slicer 导出的表面模型进行材质、灯光、相机和动画处理。常规医学影像结果图不应依赖 Blender。

官方入口：https://www.blender.org/

## 4. 医学影像软件

### 4.1 3D Slicer — Core

**作用**：医学影像查看、分割、配准、三维显示、DICOM 和论文素材导出。

应覆盖：

- MRI、CT、PET 和多模态影像联动；
- DICOM 导入与序列管理；
- NIfTI/NRRD 等体数据；
- 标签、预测和真值叠加；
- 三正交视图、任意切面和体渲染；
- 分割编辑和表面模型生成；
- 配准结果检查；
- Python console、扩展和自动化截图。

对心脏 MRI、LGE/T2/C0、多模态分割和 CARE 类任务，这是最重要的独立软件缺口。

建议路径：

```text
software/medical-imaging/3d-slicer/
```

建议状态：`priority: core`、`integration_status: standalone`、桌面端人工验证。

官方入口：https://www.slicer.org/

### 4.2 ITK-SNAP — Core

**作用**：快速查看三维医学影像、手工勾画、标签修正和多模态同步浏览。

与 3D Slicer 的区别：

- 3D Slicer 是综合平台；
- ITK-SNAP 更专注于查看和分割，界面更直接；
- 对逐病例检查预测、修补掩膜和生成标准三视图非常高效。

建议路径：

```text
software/medical-imaging/itk-snap/
```

官方入口：https://www.itksnap.org/

### 4.3 dcm2niix — Core

**作用**：将 DICOM 稳定转换为 NIfTI，并保留必要元数据。

Python 的 `dicom2nifti` 不能完全替代它。医学影像项目应记录转换命令、版本、输入序列和输出 sidecar JSON。

建议路径：

```text
software/medical-imaging/dcm2niix/
```

上游：https://github.com/rordenlab/dcm2niix

### 4.4 ANTs — Core for registration-heavy projects

**作用**：医学影像配准、变换、模板构建和形态学处理。

`antspyx` 适合 Python 集成，但完整 ANTs 原生工具链仍应单独记录。对于存在跨模态配准、时相对齐或 atlas 映射的项目，应作为核心软件。

建议路径：

```text
software/medical-imaging/ants/
```

上游：https://github.com/ANTsX/ANTs

### 4.5 elastix / SimpleElastix — Recommended

**作用**：参数化医学影像配准和可复现注册配置。

当项目需要对多种配准参数进行系统比较时有价值。若 ANTs 已覆盖需求，可不同时设为 core。

上游：https://github.com/SuperElastix/elastix

### 4.6 OHIF Viewer — Recommended

**作用**：浏览器端 DICOM 查看和 DICOMweb 工作流。

适合需要远程审阅、标注前浏览或与临床影像服务对接的项目。对于纯本地 NIfTI 研究，3D Slicer 与 ITK-SNAP 已足够。

官方入口：https://ohif.org/

### 4.7 Fiji/ImageJ — Recommended

**作用**：通用科学图像、显微图像、时间序列、批处理和插件生态。

对 MRI 主线不是核心，但对病理、显微镜、细胞影像和图像测量具有长期价值。

官方入口：https://fiji.sc/

### 4.8 QuPath — Optional / pathology-specific

**作用**：数字病理 whole-slide image 查看、标注、检测和测量。

只有进入病理切片、多模态影像—病理联合分析时才需要。

官方入口：https://qupath.github.io/

### 4.9 FSL、FreeSurfer、MRtrix3 — Domain-specific

- **FSL**：神经影像分析、配准、分割和统计。
- **FreeSurfer**：脑皮层和脑结构分析。
- **MRtrix3**：扩散 MRI 和纤维追踪。

它们对神经影像很重要，但对当前心脏 MRI 主线不是默认 core。应按项目作为 external/manual 软件记录。

### 4.10 ParaView — Optional

**作用**：大型三维网格、流场、仿真和科学计算结果可视化。

只有涉及心脏流体、有限元、计算生物力学或复杂网格时需要。

官方入口：https://www.paraview.org/

## 5. 生物信息学软件

R/Python 包不能代替原始序列质控、比对、变异处理和标准格式工具。以下软件应按数据类型组织，而不是全部安装到一个环境。

### 5.1 基础格式与区间工具 — Core

#### samtools / htslib

处理 SAM、BAM、CRAM、索引和基础统计。

官方入口：https://www.htslib.org/

#### bcftools

处理 VCF/BCF、过滤、合并、标准化和统计。

官方入口：https://samtools.github.io/bcftools/

#### bedtools

基因组区间交集、覆盖、合并和注释。

官方入口：https://bedtools.readthedocs.io/

建议路径：

```text
software/bioinformatics/htslib-samtools/
software/bioinformatics/bcftools/
software/bioinformatics/bedtools/
```

### 5.2 原始测序质量控制 — Core when sequencing data are used

- `FastQC`：FASTQ 质量检查。
- `MultiQC`：汇总多个样本和工具的报告。
- `fastp`：质量过滤、接头处理和报告。

建议路径：

```text
software/bioinformatics/fastqc/
software/bioinformatics/multiqc/
software/bioinformatics/fastp/
```

官方入口：

- https://www.bioinformatics.babraham.ac.uk/projects/fastqc/
- https://multiqc.info/
- https://github.com/OpenGene/fastp

### 5.3 RNA-seq 比对与定量 — Recommended by workflow

- `STAR`：剪接感知 RNA-seq 比对，也可使用 STARsolo。
- `Salmon`：转录本水平快速定量。
- `kallisto`：伪比对与快速定量。
- `RSEM`：基因/转录本定量。
- `subread/featureCounts`：read assignment 和计数。

不应把这些全部设为同一流程的强制依赖。选择取决于 bulk RNA-seq、单细胞、参考转录组和下游统计方法。

官方入口：

- https://github.com/alexdobin/STAR
- https://combine-lab.github.io/salmon/
- https://pachterlab.github.io/kallisto/
- https://github.com/deweylab/RSEM
- https://subread.sourceforge.net/

### 5.4 DNA/长读长比对 — Recommended by workflow

- `BWA-MEM2`：短读长 DNA 比对。
- `minimap2`：长读长、组装和通用序列比对。
- `Bowtie2`：短读长比对，适合部分表观组和微生物流程。

官方入口：

- https://github.com/bwa-mem2/bwa-mem2
- https://github.com/lh3/minimap2
- https://bowtie-bio.sourceforge.net/bowtie2/

### 5.5 变异检测与注释 — Project-specific

- `GATK`：变异检测和基因组分析工具链；体积大、Java 依赖多，建议 external/manual。
- `DeepVariant`：深度学习变异检测；建议容器化使用。
- `VEP`：Ensembl Variant Effect Predictor。
- `SnpEff`：变异功能注释。

这些工具依赖参考基因组、known-sites 和注释数据库。Toolkit 只记录软件与安装，不应存储大型数据库或患者数据。

官方入口：

- https://gatk.broadinstitute.org/
- https://github.com/google/deepvariant
- https://www.ensembl.org/info/docs/tools/vep/
- https://pcingola.github.io/SnpEff/

### 5.6 群体遗传与 GWAS — Recommended

- `PLINK 2`：基因型数据 QC、关联分析和格式处理。
- `KING`：亲缘关系和样本关系。

官方入口：https://www.cog-genomics.org/plink/2.0/

### 5.7 单细胞预处理 — Project-specific

- `Cell Ranger`：10x Genomics 官方流程，许可证和平台限制决定其应为 external/manual。
- `STARsolo`：基于 STAR 的单细胞定量。
- `alevin-fry`：快速单细胞定量。
- `kb-python`：kallisto/bustools 工作流；虽然通过 Python 安装，但应按完整单细胞流程管理。

不要在没有明确平台和 protocol 的情况下默认选择单细胞前处理工具。

### 5.8 流程引擎 — Core for reproducible bioinformatics

#### Nextflow

适合容器化、集群和跨环境生信流程，能够使用 nf-core 社区流程。

官方入口：https://www.nextflow.io/

#### Snakemake

适合规则式、文件依赖驱动的可复现流程。虽然通过 Python 生态安装，但应视为独立工作流工具管理。

官方入口：https://snakemake.readthedocs.io/

#### nf-core — Recommended reference ecosystem

提供经过社区维护的 Nextflow 流程。Toolkit 应记录如何选择和固定 pipeline release，不应盲目同步全部流程。

官方入口：https://nf-co.re/

### 5.9 生物信息学可视化与审阅

#### IGV — Core

**作用**：浏览 BAM/CRAM、VCF、BED、BigWig 和基因组注释，人工核查覆盖、变异和区域信号。

建议路径：

```text
software/bioinformatics/igv/
```

官方入口：https://igv.org/

#### Cytoscape — Core

**作用**：基因、蛋白、通路、物种和多组学关系网络的交互分析与发表级导出。

相比 Graphviz，Cytoscape 更适合节点/边属性来自数据、需要交互过滤、样式映射和插件分析的网络。

建议路径：

```text
software/network-visualization/cytoscape/
```

官方入口：https://cytoscape.org/

#### Integrative web resources — Reference-only

UCSC Genome Browser、Ensembl 和 NCBI Genome Data Viewer 应作为外部参考服务记录，不应被伪装成本地可复现软件。

## 6. 建议正式纳入的第一批软件

在不立即引入全部生信原始流程的前提下，第一批建议纳入 `inventory/resources.yaml`：

```text
Core visual and architecture
  inkscape
  imagemagick
  netron

Core medical imaging
  3d-slicer
  itk-snap
  dcm2niix
  ants

Core bioinformatics review and infrastructure
  samtools-htslib
  bcftools
  bedtools
  igv
  cytoscape
  nextflow
```

第二批按项目需求选择：

```text
Medical imaging
  elastix
  ohif-viewer
  fiji
  qupath
  paraview

Bioinformatics
  fastqc
  multiqc
  fastp
  star
  salmon
  minimap2
  plink2
  gatk

Visual post-processing
  gimp
  blender
```

参考资源：

```text
nn-svg
plotneuralnet
nf-core
```

## 7. 不建议重复收录的工具

- Mermaid CLI：当前服务器无法稳定启动 Chromium headless，仓库已移除，不应在未解决运行条件前重新加入 core。
- Visio、Lucidchart、Miro：与 Figma、Draw.io、D2 高度重叠。
- Adobe Illustrator：可作为个人商业软件使用，但 Toolkit 的可复现主线应优先 Inkscape。
- Canva：适合宣传图，不是科研架构和投稿矢量图的必要工具。
- Gephi：若 Cytoscape 已覆盖生物网络，暂不需要重复增加。
- 多个功能重叠的 DICOM viewer：先以 3D Slicer + ITK-SNAP 为主线。
- 多个功能重叠的基因组 viewer：先以 IGV 为主线。

## 8. 安全与数据边界

医学影像和生信工具可能读取患者数据、DICOM 标签、VCF、BAM、原始 FASTQ 和样本表。后续接入 Toolkit 时必须遵守：

1. 不在仓库或 upstream clone 中保存原始数据、DICOM、NIfTI、FASTQ、BAM、VCF、checkpoint 或样本元数据。
2. 不让自动检查脚本递归扫描项目数据目录。
3. 不上传病例截图、DICOM metadata 或基因组数据到外部服务。
4. 对 3D Slicer、OHIF、W&B、云端 AI 工具等单独审查联网行为和隐私设置。
5. 大型参考数据库、基因组索引和模型权重应放在受控的数据存储位置，而不是 Toolkit 仓库。
6. 所有生信流程必须固定参考基因组 build、注释 release、软件版本和参数。

## 9. 后续实施顺序

本轮完成的是根目录能力清单。下一步实施时建议按以下顺序：

```text
1. 更新 inventory/resources.yaml
2. 为 core 软件建立 README.md / install.md / notes.md / privacy.md
3. 为可检测软件增加 doctor 检查
4. 为 headless 可运行工具增加 smoke test
5. 对桌面软件记录人工验证步骤
6. 再进入视觉层：Figma 组件、顶会架构图模板、颜色、字体、线宽和导出规范
```

视觉层不应在软件能力和安装边界尚未稳定时提前固化。

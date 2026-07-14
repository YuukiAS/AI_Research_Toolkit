# Python Research Stack

本文件记录 `AI_Research_Toolkit` 尚未以独立软件资源覆盖、但后续科研环境应当具备的 Python 包。它是能力清单与环境设计依据，不是单个环境的强制依赖文件，也不建议把全部包安装进同一个 Conda 环境。

目标场景包括：医学影像、深度学习与 AI 方法开发、模型结构检查、统计分析、生物信息学与多组学分析，以及可复现的科研实验管理。

## 使用原则

1. 按项目建立独立环境，至少区分 `medical-imaging-ai`、`bioinformatics` 和 `statistics-general`。
2. GPU 框架、CUDA、MONAI、nnU-Net、JAX 等必须按服务器驱动和任务需要固定版本，不能只依赖最新版本。
3. 本文件只记录“应考虑什么”，真正使用时应生成项目级 `environment.yml`、`requirements.txt`、`pyproject.toml` 或 lockfile。
4. 原生软件与 Python 包分开管理。例如完整 ANTs、3D Slicer、dcm2niix、samtools 不应被 Python 包清单替代。
5. 只安装项目实际需要的组学分支，避免把单细胞、群体遗传、变异检测和空间组学全部混在一个环境中。

## 1. 通用科学计算基础

### Core

- `numpy`：数组与数值计算基础。
- `scipy`：优化、积分、线性代数、统计分布与信号处理。
- `pandas`：表格数据处理。
- `polars`：大表格和多线程数据处理，可作为 pandas 的补充。
- `pyarrow`：Arrow、Parquet 与跨语言数据交换。
- `xarray`：带坐标的多维数组，适合时空、成像和网格数据。
- `numba`：对数值循环和自定义算子进行即时编译加速。
- `joblib`：轻量并行与缓存。
- `tqdm`：长任务进度显示。

### Recommended

- `dask`：超出内存的数据和并行数组/表格计算。
- `zarr`：分块、压缩、云友好的大型数组存储。
- `h5py`：HDF5 数据访问。
- `networkx`：图结构、网络算法和 DAG 分析。

## 2. 统计、机器学习与因果分析

### Core

- `scikit-learn`：预处理、经典机器学习、模型选择与指标。
- `statsmodels`：广义线性模型、混合效应、时间序列和统计检验。
- `patsy`：公式接口与设计矩阵。
- `lifelines`：生存分析与常用生存模型。
- `pingouin`：常用统计检验和效应量的便捷实现。

### Bayesian and probabilistic modeling

- `pymc`：贝叶斯建模与 MCMC。
- `arviz`：贝叶斯诊断、后验汇总与比较。
- `numpyro`：基于 JAX 的概率编程，适合需要加速的贝叶斯模型。
- `cmdstanpy`：需要 Stan 时的 Python 接口。

### Causal and domain adaptation utilities

- `dowhy`：因果图、识别与估计工作流。
- `econml`：异质性处理效应与机器学习因果估计。
- `causal-learn`：因果发现算法。
- `imbalanced-learn`：类别不平衡处理。
- `adapt`：常见领域自适应方法的研究原型实现；使用前需核查方法与维护状态。

这些包不能替代项目自己的理论实现。对于 TRACE、领域自适应或挑战赛方法，核心模型仍应在项目仓库中显式实现并接受单元测试和消融验证。

## 3. 深度学习与 AI 研发

### Core

- `torch`：主要深度学习框架。
- `torchvision`：通用视觉模型、算子和数据接口。
- `torchaudio`：仅在处理音频或时频数据时使用。
- `einops`：清晰表达张量重排、合并和分块。
- `torchmetrics`：可组合指标。
- `safetensors`：安全、快速的张量权重格式。

### Training and configuration

- `lightning`：训练循环、分布式训练与日志管理；只在项目确实采用其抽象时使用。
- `accelerate`：轻量化多 GPU/混合精度适配。
- `hydra-core`：层级配置和实验组合。
- `omegaconf`：配置对象与插值。
- `pydantic`：配置和数据契约校验。
- `typer`：构建清晰的命令行入口。
- `rich`：终端日志和错误展示。

### Model libraries and research components

- `timm`：常用视觉主干与预训练权重。
- `transformers`：Transformer 模型与通用组件。
- `diffusers`：扩散模型组件；仅在生成式任务中安装。
- `xformers`：高效注意力与相关算子；需严格匹配 PyTorch/CUDA。
- `opt-einsum`：复杂张量收缩优化。

## 4. 医学影像 AI

### Core imaging I/O and geometry

- `nibabel`：NIfTI、GIFTI 等神经影像格式读写，也适合一般 NIfTI 工作流。
- `pydicom`：DICOM 元数据与像素数据访问。
- `SimpleITK`：医学影像 I/O、重采样、配准、滤波和空间信息处理。
- `itk`：需要底层 ITK 算法或更细控制时使用。
- `scikit-image`：通用图像处理、形态学和测量。
- `opencv-python-headless`：服务器端二维图像处理，避免 GUI 依赖。

### Deep learning for medical imaging

- `monai`：医学影像深度学习的数据、变换、网络、损失、指标和推断组件。
- `torchio`：三维医学影像预处理、增强、patch 采样和空间变换。
- `nnunetv2`：nnU-Net v2 训练与基线复现；应作为基线/组件使用，而不是替代项目创新。
- `dynamic-network-architectures`：nnU-Net 生态中的网络组件，只有相关项目需要时安装。

### Registration, transforms and augmentation

- `antspyx`：ANTs 的 Python 接口；不能视为完整原生 ANTs 工具链的完全替代。
- `dipy`：扩散 MRI、配准和神经影像算法；非扩散任务按需安装。
- `batchgenerators`：医学影像数据增强与批处理，常见于 nnU-Net 生态。
- `albumentations`：二维影像增强；三维 MRI/CT 主线优先使用 MONAI 或 TorchIO。

### Segmentation and surface analysis

- `surface-distance`：分割表面距离指标。
- `medpy`：医学影像指标与基础处理；注意其部分实现较旧，关键指标应自行验证。
- `cc3d`：三维连通组件分析。
- `connected-components-3d`：若包名或平台支持与 `cc3d` 冲突，应只保留一个经过验证的实现。
- `trimesh`：三维网格处理。
- `pyvista`：三维网格、体数据和 VTK 可视化接口。

### DICOM/NIfTI conversion and dataset handling

- `dicom2nifti`：Python 内部的小规模 DICOM 转 NIfTI 工作流；正式转换仍优先使用原生 `dcm2niix`。
- `highdicom`：DICOM Segmentation、Structured Report 等高级对象。
- `dicomweb-client`：DICOMweb 访问。

### Recommended medical-imaging environment profile

```text
python
numpy scipy pandas
pytorch torchvision
monai torchio
nibabel pydicom SimpleITK scikit-image
antspyx
nnunetv2
surface-distance cc3d
hydra-core pydantic typer rich
```

具体项目再加入 `dipy`、`highdicom`、`pyvista`、`itk` 或生成式模型依赖。

## 5. 模型结构理解与 AI 架构图辅助

这些包用于检查真实计算图、张量尺寸和模块关系，不负责最终顶会风格排版。

- `torchinfo`：汇总参数量、输出尺寸和内存估计。
- `torchview`：从 PyTorch 模型生成可视计算图。
- `torchviz`：基于 autograd 图生成 Graphviz 图。
- `onnx`：统一模型交换格式。
- `onnxruntime`：验证导出的 ONNX 模型和推断一致性。
- `onnxsim`：简化 ONNX 图；发布前必须比较简化前后输出。
- `netron`：Netron 主要是独立软件，但也可通过 Python 包启动本地查看器；正式记录见软件清单。

推荐流程：

```text
真实模型与 checkpoint
  -> torchinfo / torchview / ONNX / Netron 检查
  -> 提炼论文级语义模块
  -> Figma / D2 / Draw.io 建立结构
  -> Inkscape 进行最终矢量修整
```

## 6. 生物信息学与多组学

### General sequence and genomic file handling

- `biopython`：序列、注释和常见生物信息学格式。
- `pysam`：SAM/BAM/CRAM/VCF/BCF 访问。
- `pybedtools`：BEDTools 的 Python 接口；需要系统安装 `bedtools`。
- `cyvcf2`：高性能 VCF 解析。
- `gffutils`：GFF/GTF 注释数据库。
- `pyfaidx`：FASTA 随机访问。
- `intervaltree`：区间查询。

### Single-cell and multi-omics

- `anndata`：单细胞带注释矩阵容器。
- `scanpy`：单细胞 RNA-seq 分析基础工作流。
- `scvi-tools`：基于生成模型的单细胞/多组学建模。
- `mudata`：多模态组学数据容器。
- `muon`：多组学分析框架。
- `squidpy`：空间组学分析。
- `celltypist`：细胞类型注释；使用外部模型时需记录模型版本和物种。
- `harmonypy`：Harmony 的 Python 实现，适合批次校正对照。

### Bulk transcriptomics and enrichment

- `pydeseq2`：DESeq2 方法的 Python 实现；需要与 R/Bioconductor 结果交叉核查。
- `gseapy`：基因集富集与 Enrichr/GSEA 接口。
- `mygene`：基因标识符查询。
- `decoupler`：通路和调控活性推断。

### Population genetics and survival/genomics integration

- `scikit-allel`：群体遗传和变异数组分析。
- `pandas-plink`：PLINK 数据读取。
- `hail`：超大规模基因组数据；通常应在独立集群环境中部署。
- `scikit-survival`：机器学习生存分析。

### Workflow and reproducibility

- `snakemake`：可复现工作流引擎；大型流程应作为独立工具管理。
- `nextflow`：不是 Python 包，但生信流程常用，记录在软件缺口文件中。
- `multiqc`：汇总多种生信工具的质控报告。
- `papermill`：参数化执行 Jupyter Notebook；不建议把 Notebook 作为唯一生产入口。

### Recommended bioinformatics profiles

#### General genomics

```text
biopython pysam cyvcf2 pybedtools gffutils pyfaidx
pandas polars pyarrow
snakemake multiqc
```

#### Single-cell / multi-omics

```text
anndata scanpy scvi-tools mudata muon squidpy
numpy scipy pandas
scikit-learn statsmodels
```

#### Statistical genomics

```text
pydeseq2 gseapy decoupler mygene
scikit-allel pandas-plink
lifelines scikit-survival
```

## 7. Data quality, experiment tracking and reproducibility

### Core

- `pytest`：单元测试与集成测试。
- `pytest-cov`：覆盖率。
- `hypothesis`：属性测试，适合数据变换、形状和边界条件。
- `ruff`：快速 lint 和格式检查。
- `mypy` 或 `pyright`：静态类型检查，二选一并保持统一。
- `pre-commit`：提交前检查。

### Experiment tracking

- `tensorboard`：基础训练日志。
- `wandb`：托管式实验追踪；涉及敏感医学数据时必须关闭原始样本上传并审查隐私配置。
- `mlflow`：自托管实验、模型和指标记录。
- `dvc`：数据与流水线版本管理；大型医学影像数据必须明确 remote 和隐私边界。

### Profiling and reliability

- `psutil`：资源监控。
- `py-spy`：低侵入 CPU profiling。
- `memory-profiler`：内存分析。
- `line-profiler`：逐行性能分析。
- `nvitop`：GPU 进程查看。

## 8. 不建议默认安装的包

- 同一功能的多个深度学习框架，例如同时维护 PyTorch、TensorFlow 和 JAX 的完整 GPU 栈。
- 未经维护状态、许可证和数值正确性审查的“论文复现包”。
- 只为画一张图而引入的大型交互式框架。
- 与系统级工具重复、但功能不完整的 Python wrapper。
- 自动上传数据或中间结果到外部服务、且无法严格控制隐私范围的客户端。

## 9. 环境边界建议

```text
medical-imaging-ai/
  PyTorch + MONAI + TorchIO + imaging I/O + project code

bioinformatics-single-cell/
  Scanpy + scvi-tools + MuData/Muon + workflow helpers

bioinformatics-genomics/
  pysam + pybedtools + cyvcf2 + command-line genomics tools

statistics-general/
  NumPy/SciPy/pandas + statsmodels + scikit-learn + Bayesian tools

model-inspection/
  ONNX + onnxruntime + torchinfo + torchview + Netron
```

不要用一个“万能环境”承担所有科研任务。最终的可复现单位应是项目级环境文件、容器或锁定依赖，而不是本清单本身。

## 10. 参考入口

- PyTorch: https://pytorch.org/
- MONAI: https://monai.io/
- TorchIO: https://torchio.readthedocs.io/
- SimpleITK: https://simpleitk.org/
- NiBabel: https://nipy.org/nibabel/
- pydicom: https://pydicom.github.io/
- ANTsPy: https://github.com/ANTsX/ANTsPy
- nnU-Net: https://github.com/MIC-DKFZ/nnUNet
- Scanpy: https://scanpy.readthedocs.io/
- scvi-tools: https://scvi-tools.org/
- Biopython: https://biopython.org/
- pysam: https://pysam.readthedocs.io/
- Snakemake: https://snakemake.readthedocs.io/

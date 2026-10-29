# Mac mini 本地 AI 基线

更新时间：2026-10-29

这份文档记录新 Mac mini 的本地 AI 基础环境。目标是先把运行层和使用层搭好，不下载任何大模型，不重复安装已有的终端和编辑器。

当前机器已具备：

- iTerm；
- VS Code。

因此本方案不安装第二套终端，不安装第二套编辑器，也不因为 OpenCode 再额外安装 OpenCode Desktop 或 VS Code 扩展。

## 当前采用的架构

```text
macOS / Apple Silicon
        ↓
Homebrew + Apple Command Line Tools
        ↓
Miniforge（独立 Python 环境）
        ↓
local-ai
├── MLX-LM：文字大模型运行层
└── MLX-VLM：视觉 / 多模态运行层
        ↓
使用层
├── OpenCode CLI：代码、仓库与工程任务
└── Hermes Desktop：通用本地智能体
```

模型权重不属于本阶段。Qwen、GLM 等模型在基础环境验收后再单独选择。

## 只需要安装这些

### 1. Apple Command Line Tools

先检查：

```bash
xcode-select -p
git --version
```

如果 `xcode-select -p` 已返回有效路径且 `git --version` 正常，就跳过。

缺失时安装：

```bash
xcode-select --install
```

不需要为了本地 AI 安装完整 Xcode。

### 2. Homebrew

先检查：

```bash
brew --version
```

已有则跳过。

缺失时按 Homebrew 官网安装：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Apple Silicon 默认前缀应为：

```text
/opt/homebrew
```

### 3. Miniforge

用途：只给本地 AI 建独立 Python 环境，避免污染系统 Python。

先检查：

```bash
conda --version
```

如果当前已有可用的 Miniforge / Conda，并且确定要继续使用它，就不重复安装。

新机器推荐直接使用 conda-forge 官方 Apple Silicon PKG：

```text
https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-MacOSX-arm64.pkg
```

不要通过 Homebrew 安装 Miniforge；conda-forge 官方明确说明 Homebrew 重打包方式可能带来其未测试的兼容性问题。

安装后建立专用环境：

```bash
conda create -n local-ai python=3.12
conda activate local-ai
```

### 4. MLX-LM + MLX-VLM

它们是这台 Mac mini 的主本地模型运行层。

在 `local-ai` 环境中：

```bash
python -m pip install -U mlx-lm mlx-vlm
```

不需要另外单独安装：

- `mlx`；
- `transformers`；
- Hugging Face Python 依赖；
- Gradio UI；
- 训练 extras。

这些要么会作为依赖进入环境，要么当前阶段不需要。

安装后只做基础检查，不下载模型：

```bash
python -c "import platform, mlx.core as mx; print(platform.machine()); print(mx.default_device())"
python -c "import mlx_lm, mlx_vlm; print('MLX stack OK')"
```

预期机器架构应为 `arm64`。

### 5. OpenCode CLI

这台机器已经有 iTerm 和 VS Code，因此只安装 OpenCode CLI，不安装 OpenCode Desktop，也暂时不需要额外的 VS Code OpenCode 扩展。

安装：

```bash
brew install anomalyco/tap/opencode-v2
```

检查：

```bash
opencode --version
```

本阶段只完成 CLI 安装。等本地模型服务起来后，再把 OpenCode 指向 MLX 的本地接口。

### 6. Hermes Desktop

Hermes 用于通用本地智能体场景，与 OpenCode 的工程 / 仓库任务分工。

macOS Apple Silicon 推荐直接安装官方 Hermes Desktop DMG：

```text
https://hermes-agent.nousresearch.com/desktop
```

Desktop 包已经包含 Hermes Agent、Python 和支持的基础依赖，因此：

- 不再单独运行 Hermes 的 `install.sh`；
- 不再另外给 Hermes 配一套 Python；
- 不需要为了 Hermes 安装第二套桌面客户端。

先安装即可。本地模型 endpoint 等 MLX 服务验收后再配置。

## 当前明确不安装

以下都不是当前基础环境必需项：

- Ollama：与 MLX 属于另一套模型运行 / 管理路径，当前不重复维护；
- LM Studio：GUI 模型管理层，当前工作流已有 VS Code、iTerm、MLX；
- Open WebUI：以后需要局域网 ChatGPT 风格网页时再考虑；
- OpenCode Desktop：已有 VS Code + iTerm，当前只保留 CLI；
- OpenCode VS Code 扩展：不是基础运行所必需；
- Hermes CLI 源码安装：Hermes Desktop 已包含所需运行层；
- 完整 Xcode：Command Line Tools 足够；
- Docker：当前 MLX / OpenCode / Hermes 主线不需要；
- Gradio：当前不需要额外聊天 UI；
- 任意 Qwen / GLM / DeepSeek 模型：本阶段不下载。

## 推荐安装顺序

```text
检查 Command Line Tools
        ↓
检查 / 安装 Homebrew
        ↓
安装 Miniforge
        ↓
创建 local-ai
        ↓
安装 MLX-LM + MLX-VLM
        ↓
安装 OpenCode CLI
        ↓
安装 Hermes Desktop
        ↓
基础环境验收
        ↓
再决定模型与模型存储位置
```

## 本阶段完成标准

以下全部通过即可停止，不需要继续下载模型：

```bash
xcode-select -p
git --version
brew --version
conda --version
conda activate local-ai
python -c "import platform, mlx.core as mx; print(platform.machine()); print(mx.default_device())"
python -c "import mlx_lm, mlx_vlm; print('MLX stack OK')"
opencode --version
```

另外人工确认 Hermes Desktop 可以正常启动。

完成这些以后，下一阶段才处理：

1. 32GB 内存下 Qwen / GLM 的具体型号与量化；
2. MLX 本地服务接口；
3. OpenCode 与 Hermes 的 endpoint 配置；
4. 模型缓存放内置盘还是外置盘；
5. Shione / Bobbio 等项目如何复用同一个本地模型服务。

# diagrams.py

## Role
用 Python 描述云架构和系统组件图，通常依赖 Graphviz 输出图像。

## Upstream
https://github.com/mingrammer/diagrams.git

## Local layout
`repo/` 是 upstream clone 或预留位置；外层 `README.md`、`install.md`、`notes.md`、`privacy.md`、`examples/` 是本 toolkit 的本地说明和示例，不写入 upstream repo 根目录。

## Install status
checked

## Typical usage
- `python -c "import diagrams"`
- `python examples/minimal.py`

## Privacy and safety
diagrams.py 执行 Python 文件，只运行可信示例；不要让脚本遍历敏感项目目录。

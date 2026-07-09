# Graphviz

## Role
经典 DOT 图渲染工具，适合依赖图、有限状态机、流程图和 diagrams.py 后端渲染。

## Upstream
https://gitlab.com/graphviz/graphviz.git

## Local layout
`repo/` 是 upstream clone 或预留位置；外层 `README.md`、`install.md`、`notes.md`、`privacy.md`、`examples/` 是本 toolkit 的本地说明和示例，不写入 upstream repo 根目录。

## Install status
checked

## Typical usage
- `dot -V`
- `dot -Tsvg examples/input.dot -o examples/output.svg`

## Privacy and safety
Graphviz 只读取显式指定的 DOT 文件；不要把 raw data 或敏感目录作为输入。

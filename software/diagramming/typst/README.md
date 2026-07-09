# Typst

## Role
轻量排版和技术文档渲染工具，可用于报告、图注、公式排版和小型说明页。

## Upstream
https://github.com/typst/typst.git

## Local layout
`repo/` 是 upstream clone 或预留位置；外层 `README.md`、`install.md`、`notes.md`、`privacy.md`、`examples/` 是本 toolkit 的本地说明和示例，不写入 upstream repo 根目录。

## Install status
failed

## Typical usage
- `typst --version`
- `typst compile examples/input.typ examples/output.pdf`

## Privacy and safety
Typst 读取显式指定的 .typ 文件；不要把包含敏感路径的项目树传给模板。

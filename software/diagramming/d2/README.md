# D2

## Role
通用文本到图示渲染工具，适合把架构图、流程图和系统关系图写成可版本化的 D2 源文件。

## Upstream
https://github.com/terrastruct/d2.git

## Local layout
`repo/` 是 upstream clone 或预留位置；外层 `README.md`、`install.md`、`notes.md`、`privacy.md`、`examples/` 是本 toolkit 的本地说明和示例，不写入 upstream repo 根目录。

## Install status
checked

## Typical usage
- `d2 --version`
- `d2 examples/input.d2 examples/output.svg`

## Privacy and safety
D2 主要读取显式指定的 .d2 文件，不应递归扫描项目目录。

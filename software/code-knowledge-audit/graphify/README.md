# Graphify

## Role
代码/文档知识图谱与审计工具占位资源，用于后续整理代码库结构、依赖关系和文档覆盖。

## Upstream
not specified

## Local layout
`repo/` 是 upstream clone 或预留位置；外层 `README.md`、`install.md`、`notes.md`、`privacy.md`、`examples/` 是本 toolkit 的本地说明和示例，不写入 upstream repo 根目录。

## Install status
unknown

## Typical usage
- `TODO: identify upstream repository and CLI`

## Privacy and safety
这类工具可能递归读取本地项目文件；默认必须使用 graphifyignore，并硬排除 data、checkpoints、logs、secrets、token、credential 等路径。

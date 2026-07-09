# Mermaid CLI

## Role
Mermaid 图表的命令行渲染器，适合从 Markdown/文档中的流程图、时序图、状态图生成 SVG/PNG/PDF。

## Upstream
https://github.com/mermaid-js/mermaid-cli.git

## Local layout
`repo/` 是 upstream clone 或预留位置；外层 `README.md`、`install.md`、`notes.md`、`privacy.md`、`examples/` 是本 toolkit 的本地说明和示例，不写入 upstream repo 根目录。

## Install status
failed

## Typical usage
- `mmdc --version`
- `mmdc -i examples/input.mmd -o examples/output.svg`

## Privacy and safety
Mermaid CLI 读取显式输入文件；在服务器上通常依赖 Node 和 headless Chromium。

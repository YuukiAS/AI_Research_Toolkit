# PlantUML

## Role
UML 和时序图渲染工具，适合接口流程、类图、状态机、组件关系图。

## Upstream
https://github.com/plantuml/plantuml.git

## Local layout
`repo/` 是 upstream clone 或预留位置；外层 `README.md`、`install.md`、`notes.md`、`privacy.md`、`examples/` 是本 toolkit 的本地说明和示例，不写入 upstream repo 根目录。

## Install status
checked

## Typical usage
- `plantuml -version`
- `plantuml -tsvg examples/input.puml`

## Privacy and safety
PlantUML 读取显式指定的 .puml 文件；避免引用外部 URL 或敏感本地文件。

# Manim

## Role
数学动画和讲解视频生成工具，适合科研方法动画、几何/公式演示和短视频说明。

## Upstream
https://github.com/ManimCommunity/manim.git

## Local layout
`repo/` 是 upstream clone 或预留位置；外层 `README.md`、`install.md`、`notes.md`、`privacy.md`、`examples/` 是本 toolkit 的本地说明和示例，不写入 upstream repo 根目录。

## Install status
checked

## Typical usage
- `manim --version`
- `manim -ql scene.py SceneName`

## Privacy and safety
Manim 执行 Python 场景文件，只运行可信代码；服务器上可能依赖 LaTeX、Cairo 和 ffmpeg。

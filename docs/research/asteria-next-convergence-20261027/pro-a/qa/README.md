# 制作者 QA 记录

最终候选 SHA-256：`6d2ddbff4fb56d5288614345067a7e379a3bbde2c99552e24cf9f3eba739147b`。

## 身份与范围

| 阶段 | 文件身份 | 记录 |
|---|---|---|
| 完整基线 r6 | `ccb1e32ca8faff2c15278e7ffd40efaf6e4558cd1eeba650b3410a69bfd48602` | `audit-r6-rendered.json`（92 态）、`audit-r6-targeted.json`（47 项）、`audit-r6-extended.json`（39 项）、`audit-r6-theme.json`；原完整汇总保存在 `producer-r6-full-verification.json` |
| 事实纠正 | `9ebad1e29df3d0818f3415e1027c6f97317792d21364ed7cdc451faf4a7039df` | `audit-final-delta.json`：28 态、27 项，证据结果类型及 Mica 当前与历史机制 |
| 修改关系视觉纠正 | `6d2ddbff4fb56d5288614345067a7e379a3bbde2c99552e24cf9f3eba739147b` | `audit-final-diff-visual.json`：6 态、7 项，修改关系标记、选择、布局及事实模型未变 |

`producer-final-verification.json` 汇总这三段证据，不把旧基线的完整覆盖算作对最终字节重新执行。`producer-issue-log.tsv` 保存 24 项闭环（5 项 P1、19 项 P2），`rendered-content.tsv` 保存 68 个重要内容区块的裁决。对应截图分别使用 `audit-r6-*`、`audit-final-delta-*`、`audit-final-diff-visual-*` 前缀。

## 复跑

在本目录执行。完整巡检脚本先把 `../prototype/preview.html` 复制为固定快照，其余同轮脚本读取该快照。新运行请使用新轮次名，避免覆盖已有证据。

```bash
ASTERIA_AUDIT_ROUND=review node producer-rendered-audit.mjs
ASTERIA_AUDIT_ROUND=review node producer-targeted-audit.mjs
ASTERIA_AUDIT_ROUND=review node producer-extended-audit.mjs
ASTERIA_AUDIT_ROUND=review node producer-theme-audit.mjs
```

本轮实际完整运行使用 `ASTERIA_AUDIT_ROUND=r6`。92 态和定向脚本最初从 `/tmp/asteria-content-audit.mjs` 与 `/tmp/asteria-targeted-audit.mjs` 执行；补充脚本和主题脚本从本目录执行。`executed-runners/` 保留当时脚本原样；本目录的便携副本仅使用相对候选路径并添加环境覆盖。

最后两次实际执行命令如下。各脚本会检查预期 hash；事实 delta 脚本锁定 9ebad 版本，因此当前最终页面会触发身份保护。该记录是历史定向验证，不能用当前页面冒充原输入重跑。

```bash
node producer-final-delta-audit.mjs
node producer-final-diff-visual-audit.mjs
```

运行时可用 `ASTERIA_CHROMIUM` 指定 Chromium 可执行文件，用 `ASTERIA_PLAYWRIGHT_MODULE` 指定 Playwright 模块。默认值保留实际环境路径：

```text
/tmp/architecture-browser/chrome-linux64/chrome
/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs
```

主题脚本最初额外要求所有触点宽度也达到 44px；这不是 `VISUAL_SYSTEM.md` 的规格，因此改为检查实际承诺的 44px 命中高度并重新执行。实际宽高没有改写。颜色检查读取 computed style，不只检查 CSS 变量是否存在。

## 连续读稿与证据整理

正文来自实际渲染态，按 DOM 顺序抽出后去格式连续阅读，并核对截图。CSS 隐藏的其他断点副本、SVG 辅助文本和未展开的下拉框选项不当作当前正文。补充记录保留字面移除 CSS 的调试文本，但不把暴露出的隐藏副本误判为产品重复，也不使用禁词数量评价内容。

完整保留 r6、事实 delta、最终视觉 delta 截图及被问题表引用的 7 张旧缺陷图。538 张未被最终文档逐名引用的旧巡检图已移出候选；`screenshot-curation.json` 保存路径、hash、大小和原因，`old-screenshot-explicit-references.json` 保存引用核对。旧 JSON 不改写，其已移出截图路径属于历史索引，不是交付入口。所有问题表中的具体缺陷图仍在。

这是制作者内部 QA；结论仅覆盖列明项目、状态、Chromium 和视口，不替代独立 Work 黑箱比较。

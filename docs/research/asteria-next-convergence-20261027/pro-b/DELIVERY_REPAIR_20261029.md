# Pro-B 固定候选交付修复 — 2026-10-29

## 根因

问题位于 commit `2c010853b2b6fafefa1edf7d8146caec6a7729e6` 内已经提交的压缩资源本身，不是下载、HTTP server 或浏览器缓存。

远端七个 `payload-*.js` 重组后：

- Base64 字符数 48724，与旧 `PACKING.json` 一致；
- Base64 解码后 gzip 36543 字节，与旧记录一致；
- gzip 头有效，尾部 ISIZE 声明 131455；
- 实际 inflate 只有 131350 字节；
- 尾部 CRC32 为 `0x86f70b58`；
- 实际 inflate 输出 CRC32 为 `0xefe5d703`。

因此旧固定候选同时违反解压长度和 CRC。恢复内容在主应用脚本 `renderEvolutionView` 内首次出现不可用损坏，后续脚本闭合和 HTML 尾部也损坏。仓库 blob 本身错误，所以重新下载无效。

## 上一轮为什么漏掉

上一轮截图和浏览器 QA验证的是打包前／内联执行的页面。最终增加“gzip → Base64 → 七分片 → `DecompressionStream`”后，没有从 GitHub 固定 commit 回读并重新执行 CRC、长度和最终入口检查。也就是说，验证对象与最终交付对象没有保持一致。

## 修复边界

本次不继续修补压缩链，直接删除它：

- 删除 `PACKING.json`；
- 删除 `assets/loader.js`；
- 删除七个 `assets/payload-*.js`；
- `index.html` 成为自包含未压缩单文件；
- 无 `DecompressionStream`；
- 无外部脚本、样式或网络资源；
- 直接 `file://` 打开不需要资源请求。

损坏点以前的页面、CSS、四项目数据、系统／机制渲染代码原样保留；从 `renderEvolutionView` 起，依据已有数据、CSS 和既定交互合同重建演进、检查、搜索、选择、状态 URL 和主题尾部。

## 提交前门槛

- JavaScript 语法编译通过；
- 四项目 JSON 解析通过；
- 外部脚本 = 0；
- 外部样式 = 0；
- gzip／Base64／`DecompressionStream` 引用 = 0；
- 4 个项目 × 4 个主视图 = 16/16 运行渲染 smoke；
- 明暗主题切换 smoke；
- HTML 完整闭合。

提交后必须从新的 GitHub commit 回读 `index.html` 并再次检查 Git blob、语法、四项目数据和无外部依赖。

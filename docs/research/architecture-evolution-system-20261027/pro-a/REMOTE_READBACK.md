# pro-a 交付提交与远端回读

## 实际核对结果

本轮研究交付已经写入唯一授权分支 `research/architecture-evolution-system-20261027-pro-a`。本记录在读取远端提交、完整 Git tree 和核心文件正文后生成。

- 共同基线：[`23a1c4840f665e66f7af95ffadaadd96dc999e7f`](https://github.com/YuukiAS/AI_Research_Toolkit/commit/23a1c4840f665e66f7af95ffadaadd96dc999e7f)。
- 研究前写入证明：[`a6b9615ba3a483b1ec47339c7833aafe0a28c322`](https://github.com/YuukiAS/AI_Research_Toolkit/commit/a6b9615ba3a483b1ec47339c7833aafe0a28c322)，已在研究开始前远端回读。
- 研究交付提交：[`1fa1c2b02cdc1eb9dfe854969a0704a524ffe5fa`](https://github.com/YuukiAS/AI_Research_Toolkit/commit/1fa1c2b02cdc1eb9dfe854969a0704a524ffe5fa)。
- 交付 tree：`ff1350897b6764e79b3ee087510a06c433e4feb9`。
- 远端树核对时间：`2026-10-27T08:05:43.988Z`。
- 交付目录：`docs/research/architecture-evolution-system-20261027/pro-a/`。

交付提交包含本目录 **44 个文件，共 2,163,451 字节**。相对于写入证明提交，43 个文件新增，原写入证明文件保持原 blob。逐一核对远端 tree 的路径、大小和 Git blob SHA，44 个文件全部与本地一致。原有研究和产品文件均未改变，交付目录外变更为 0。

另外从固定交付提交读取以下完整正文，并与本地上传内容逐字符比较，均一致：

- [RESULT.md](https://github.com/YuukiAS/AI_Research_Toolkit/blob/1fa1c2b02cdc1eb9dfe854969a0704a524ffe5fa/docs/research/architecture-evolution-system-20261027/pro-a/RESULT.md)
- [prototype/model/data.json](https://github.com/YuukiAS/AI_Research_Toolkit/blob/1fa1c2b02cdc1eb9dfe854969a0704a524ffe5fa/docs/research/architecture-evolution-system-20261027/pro-a/prototype/model/data.json)
- [prototype/index.html](https://github.com/YuukiAS/AI_Research_Toolkit/blob/1fa1c2b02cdc1eb9dfe854969a0704a524ffe5fa/docs/research/architecture-evolution-system-20261027/pro-a/prototype/index.html)
- [prototype/generated/ui-report.json](https://github.com/YuukiAS/AI_Research_Toolkit/blob/1fa1c2b02cdc1eb9dfe854969a0704a524ffe5fa/docs/research/architecture-evolution-system-20261027/pro-a/prototype/generated/ui-report.json)

远端模型回读确认三个项目、90 个固定来源；UI 报告为 14 项通过、0 项失败。模型 13 项检查、历史基线正反例及浏览器检查的实际范围见 [QA.md](prototype/QA.md)，这些结果不代表三个项目的生产运行或科研计算已经重新验证。

## 原型入口与固定对象

- [交付版本的核心原型](https://github.com/YuukiAS/AI_Research_Toolkit/blob/1fa1c2b02cdc1eb9dfe854969a0704a524ffe5fa/docs/research/architecture-evolution-system-20261027/pro-a/prototype/index.html)：下载该单文件后用浏览器打开。
- [交付版本的研究结论](https://github.com/YuukiAS/AI_Research_Toolkit/blob/1fa1c2b02cdc1eb9dfe854969a0704a524ffe5fa/docs/research/architecture-evolution-system-20261027/pro-a/RESULT.md)。
- [可读截图与运行方式](prototype/README.md)。

实际被测且已远端回读的 HTML SHA-256：

```text
b716d50d816a155293f37ae2911258f1ab1311bf179795c977de8225890ce965
```

本收据在交付提交之后单独加入；它自身的提交编号可从 Git 历史读取，不通过改写本收据制造自指提交。加入收据不会改变上述被测 HTML 或 44 个已核对文件。

## 文件身份清单

Git blob SHA 用于直接核对 GitHub tree。下面只列研究交付提交的 44 个文件，不把本收据计入其自身的验证对象。

| 文件 | 字节 | Git blob SHA |
| --- | ---: | --- |
| `ARCHITECTURE_DESIGN_METHOD.md` | 14643 | `6ddc0a1fecfeff23b9eef2ae6f86d123e0f71330` |
| `IMPLEMENTATION_OPTIONS.md` | 21895 | `b31abbdeb4fabf16df31c873b3598021dd17f5c8` |
| `OPEN_SOURCE_RESEARCH.md` | 28125 | `944f1460b849399a409d8512c41e49440d23ef55` |
| `PRODUCT_AND_INFORMATION_ARCHITECTURE.md` | 14616 | `987aef3019da72c2c17bfc891a73f27f52f11e34` |
| `PROVENANCE.md` | 6554 | `f72446bebd34e0f401d6dfb2e83dd6d866431535` |
| `RESULT.md` | 8398 | `4200fd6c96fee98abc0d77ac818f145ec0940aeb` |
| `SOURCE_OF_TRUTH_AND_IMPLEMENTATION_BINDING.md` | 20316 | `8609971697824975d38863a1bca18969bd06e2cf` |
| `THREE_PROJECT_STRESS_TEST.md` | 46400 | `88b8e4ba675204917027684fc7c01537e1deb76a` |
| `VERSION_AND_EVOLUTION_MODEL.md` | 13771 | `04173d5e5fd73813b3852c731cbf58355a541c3f` |
| `WRITE_ACCESS_CHECK.md` | 342 | `4302bc7104c79449058b019feb3ee55a6d4b4246` |
| `prototype/QA.md` | 6549 | `f2b447cbd288cc85ba61ec44a9010540f455d3cc` |
| `prototype/README.md` | 5298 | `da62889ebe4621de22bcbdde6a02b9bc0e23e3a7` |
| `prototype/THIRD_PARTY_NOTICES.md` | 1717 | `f3f319512fe08c455ed6b873a43624a4f8e2cc6b` |
| `prototype/app.js` | 27775 | `fe3ec3ead1766e44a7288f77f5cc51d4c54fa4b0` |
| `prototype/build.mjs` | 6123 | `022a80c398e6cdd78c14f96d49273c1e715718b8` |
| `prototype/generated/build-report.json` | 2436 | `3d77edb01046e766754874e1b6a302441eb812da` |
| `prototype/generated/cat.dot` | 1741 | `dccef7d0623bdf2545c0ab705b90b0076f463a77` |
| `prototype/generated/cat.svg` | 10586 | `56f51856b0ea0c3aa565ad32e260962541f62ca3` |
| `prototype/generated/da.dot` | 3287 | `0c499f044dd246aac90a02341d78dce7417af6e5` |
| `prototype/generated/da.svg` | 20435 | `7f8c3ee8133dac93be3ea0b30bf6630cbb4ce9c7` |
| `prototype/generated/mica.dot` | 2941 | `15896e1a61ec9d33e48d19aa1849cdc225125b3e` |
| `prototype/generated/mica.svg` | 18678 | `82491248ffa64b69b919339341a83dc690b4ae8d` |
| `prototype/generated/model-test-output.txt` | 1260 | `95a8ca456e2969599b9e5c66a1fb6b106414f776` |
| `prototype/generated/ui-report.json` | 12291 | `a2eacc337bc9dac90f299350872d1c77b1412e8f` |
| `prototype/generated/validation.json` | 430 | `8a4105b3a4afb6709f85e44990fdddf8f3f2f479` |
| `prototype/index.html` | 305536 | `930c040a4866e5bef2eaa5c3dfc8b87aadc265d6` |
| `prototype/model/README.md` | 4279 | `e5c913087d1b4364f50e18a39ff0ed2b2e256808` |
| `prototype/model/data.json` | 200269 | `3f8d137df3ed47a7f6a233a33f5c1349a5e0e43a` |
| `prototype/model-core.mjs` | 11079 | `1d0df907cbd0f09aee1aba888b46a1ab3f285189` |
| `prototype/package-lock.json` | 659 | `ac4f23aeb77680f28adae877a464b5e96e047ce1` |
| `prototype/package.json` | 292 | `cfd000fd2a94a6b5e5171c649be3413d64c4db52` |
| `prototype/screenshots/desktop-cat-evolution.png` | 211933 | `1d85aba1e11adc12a0bd7d9d19b7de4e5c7e92ff` |
| `prototype/screenshots/desktop-da-design.png` | 217353 | `326b13912c05fa139cf02c38611f85977055430c` |
| `prototype/screenshots/desktop-mica-diff.png` | 229493 | `008018243f1662cc874a02c6ba71d464fbe0587d` |
| `prototype/screenshots/desktop-mica-implementation.png` | 208485 | `013b4d0bd3541f858cc6c40e1ddf9a1a852ec818` |
| `prototype/screenshots/desktop-mica-overview.png` | 243665 | `8f4264dcc28270319e8ef6688aaf89efe92e8c06` |
| `prototype/screenshots/mobile-da.png` | 72683 | `56727676ce2a930aa19a82690c7356d02e0b9baa` |
| `prototype/screenshots/mobile-mica.png` | 68015 | `a19a24efd13f00037946164fec5c757a50aa1d5f` |
| `prototype/styles.css` | 27077 | `802b5b4629d115f9f8cf539c8e85b6c604e18c7a` |
| `prototype/template.html` | 857 | `aaa1878707959612255705ca11b997e678248665` |
| `prototype/tests/model.test.mjs` | 6656 | `756fa90b6626fde9435c89131babb3c9b968a2a6` |
| `prototype/tests/ui.test.mjs` | 17667 | `a8ec1ad8751f44dc45a3547cf1107fa04ace4d76` |
| `sources/build-dependency.json` | 663 | `a0275f5ee122a93649e12c470399c37013380c71` |
| `sources/oss_sources.json` | 40183 | `04e741bd4fc3d9b8f71f18906bffff374d77ec10` |

## 写入边界

本轮没有写入 `main`、其他研究分支、Mica 或 CAT-TRACE。没有读取另一位 Pro 的分支、提交、PR、成果或中间文件。CAT 私有原文、源码、数据、运行日志以及本地浏览器、字体和依赖缓存没有进入本交付。

本记录确认的是指定分支的实际内容与原型测试对象身份；没有声称已经部署正式服务、设置远端 CI 或完成长期使用验收。


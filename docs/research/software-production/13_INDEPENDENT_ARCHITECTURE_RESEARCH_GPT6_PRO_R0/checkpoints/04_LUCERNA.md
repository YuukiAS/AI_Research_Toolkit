# Lucerna：缺口不只是缺测试，而是测试判据也可能复述错误假设

RUNNER_ID: GPT6_PRO
READ_DATE: 2026-10-15
SOURCE_REPOSITORY: YuukiAS/Lucerna
SOURCE_REF: main
SOURCE_COMMIT: 79dd2875d3da33c6a6d80e5e35bea812b84c1ceb

## 实读来源

branches；AGENTS.md全文（c4c2e5ff9bdbe732a40be2138206821ff4f51bcf）；README.md 1–180行；src目录定位；docs/workflows/LUCERNA_EXECUTION_FAILURE_HISTORY.md全文（89a73fae28905d1aed98aad39177ef5c914d1dda）；src/longleaf-presentation.ts全文（12c61c60402ed9ee3b38cd39a458c037af9a7918）；scripts/development-acceptance.ps1 1–240行（2c4ebefff98fc5e630f5a17a1f177fd2d4a65e36）；package.json全文（ccd26613e90ec3bd9901a1578eb97a5b86b09df1）；scripts/test-longleaf-presentation.mjs全文（8be6cad151b2b3e779096654761c5ec4b0da57a0）。未运行构建、测试、原生窗口或当前生产状态探针。

## 入口、有效规则及权责

用户入口是Windows托盘/macOS菜单栏的小型资源、健康和消耗监控界面，不是通用运维平台。Tauri/Rust/TypeScript实现；README最后仍写Planning/pre-prototype，而实际源码与验收脚本已丰富，说明README状态不能当项目成熟度唯一来源。读取分支定位得main与两个review分支；本次采用main，未把未合并review当当前发布，更未证明某台机器已安装本提交。

当前AGENTS是精简执行核心，分派治理/视觉/领域规则；正常可逆仓库工作不重复索权，用户动作只限真实身份、物理、不可逆或授权缺口。禁止为了本仓库验收改变网络、其他仓库、调度器或生产提供者。根规则明确项目可写的hook/script不是操作系统隔离或可信授权边界，必须把静态规则、真实运行保护和环境覆盖分别报告。规则存在不证明当前执行环境已加载或强制执行。

## 具体源码证据

longleaf-presentation.ts把UNKNOWN与若干reason短语判为未观察；bridgeSideCopy对未观察输出Not checked，对VERIFYING输出Checking，对STALE输出Out of date，说明产品层已有状态解释代码，而非只缺状态文件。与此同时，两个局部判据值得独立挑战：

1. bridgeSideCopy在备用链路确认失败、reason包含listener/handshake/connection failed时，直接输出“primary access remains available”。函数入参没有主链路证据，因而该句并非由本函数输入证明。调用方是否另有限定需要进一步追踪，不能把此局部发现直接升级为所有发布运行都误报。
2. vscodeCopy把UNKNOWN/未观察主机与VERIFYING合并为Checking。测试明确要求UNKNOWN、缺失证据及VERIFYING在该场景全部Checking。这既有“暂时刷新不要误报故障”的意图，也可能掩盖长期无观察者的事实；必须通过有时间/探针生命周期的业务判据区分，而不是把单元测试通过视为未知状态表达正确的充分证明。

test-longleaf-presentation.mjs不仅执行transpile后的真实函数，还用正则检查main.ts调用方式；它同时逐字期望上述主访问可用句和Checking映射。此例说明可执行测试也可能固化未经证明的语义；不能仅以“不是grep”或“测试数量很多”认定验收专业正确。

## 验收入口与失败来源

package.json已有类型、lint、状态、文案、通知、交互、托盘、原生验收、证据完整性及多轮历史修复的guard；development-acceptance.ps1已实现候选提交一致、脏工作树/未跟踪产品输入拒绝、结果文件例外、截图身份和场景字段校验。本次读的是该脚本前240行，未宣称全脚本安全性已审计；其中观察文字正则是辅助声明检查，不等于实际clean live_state证明。

执行失败史明确记录：01047自报无重复与截图矛盾；01055未关TODO却自报已关；全套测试/构建与真实UI质量冲突；CSS zoom冒充原生DPI证据；fixture留在用户桌面；普通QA转给用户；父子状态、认证/可达性混淆；按钮调用不等于后置条件完成；旧进程与同exe路径导致证据身份错配；验收工具反复返修吞掉产品时间。这些是项目记忆记录，不是本次重新运行出的故障。

## 对候选的约束

已有项目接受入口和规则值得复用；再建一套“状态+检查器”不自动解决问题。需要以冻结目标/独立语义判据/真实像素交互或提供者后置条件审视测试本身，并在不同证据层之间保持边界。证据工具复杂度和前台干扰必须计入净成本；原生隔离未证明时不能由更多规则自证安全。正常小修应允许精准测试而不强制全流程。新体系不能复制Lucerna通知与Remote Compute控制所有权。

下一仓库：CUHK_Date。当前仓库已完成可复用事实checkpoint。

# 两条失败线程的实际指令输入图

Date: 2026-11-07
Status: FROZEN FOR THIS RECOVERY ROUND

本文件只记录两条真实失败线程在事故发生时**实际进入上下文的规则来源**。不根据产品名称、项目绑定或当前设置推断未出现的规则。后续若 ChatGPT Work / Codex 的产品加载机制改变，应重新 Probe，而不是沿用本文件猜测。

## 1. STAT5060 — ChatGPT Work

线程身份：本机 ChatGPT Work（`originator=codex_work_desktop`）。

事故时实际进入上下文：

1. ChatGPT Work 自身的系统行为、工具权限与运行约束；
2. 当前线程中的用户指令；
3. 所选机器的全局 Codex 指令：`~/.codex/AGENTS.md`；
4. 当时采用的 `pragmatic` 风格和机器记忆摘要；
5. 实际被调用的 Skill / 插件规则。

本轮按**未加载**处理：

- 网页端全局 Custom Instructions；
- 绑定云端 `STAT5060 TA + STAT5050 Class` Project 的 Project instructions；
- `STAT5060-TA/AGENTS.md`。

理由：启动注入记录中没有这三层正文；本地项目绑定云端 Project 只能证明“有绑定”，不能证明云端 Project instructions 已注入。该 Work 主文件夹也不是 Git 仓库，没有仓库级 `AGENTS.md` 自动发现。

因此，本轮修复 Work 的长期行为时，只把 `~/.codex/AGENTS.md` 视为已经实证有效的用户长期规则入口。不得为了修 Work 去修改一个没有加载证据的网页 Project setting 或仓库 `AGENTS.md`。

## 2. PC+Server+VPS — Codex Desktop / Karabiner

线程身份：独立 Codex Desktop，本机运行。

事故时实际进入上下文：

1. Codex 自身的系统行为、工具权限与运行约束；
2. 当前线程中的用户原始任务；
3. 所选机器的全局 Codex 指令：`~/.codex/AGENTS.md`；
4. local project 主目录 `Remote_Compute_Infrastructure` 自动发现的仓库 `AGENTS.md`；
5. 用户原始任务明确要求后，Codex 在实施前主动读取的 `Local_Compute_Infrastructure/AGENTS.md` 与 Karabiner 当前状态；
6. 后续实际调用的工具 / Skill 规则。

明确不适用：

- 网页端全局 Custom Instructions；
- 同名 ChatGPT 云端 Project instructions。

补充 Probe 已确认：Karabiner 失败发生时，中文 v0.3 全局指令已经完整生效，Local Compute 的项目规则也已经读取，用户原始目标也已经明确。因此该失败不能归因于“旧英文全局规则”“没有读 Local AGENTS”或“Remote 是 primary”。

## 3. 本轮固定关系

```text
本机 ChatGPT Work
  → Work 系统规则
  → 当前线程用户指令
  → ~/.codex/AGENTS.md
  → 实际调用的 Skill / 插件
  × 本案例不使用网页 Custom Instructions
  × 本案例不使用云端 Project instructions
  × 本案例没有 repo AGENTS 自动发现

本机 Codex Desktop
  → Codex 系统规则
  → 当前线程用户指令
  → ~/.codex/AGENTS.md
  → primary repo/路径自动发现的 AGENTS.md
  → 任务明确读取的其他仓库规则
  → 实际调用的 Skill / 插件
  × 不使用网页 Custom Instructions
  × 不使用 ChatGPT Project instructions
```

## 4. 对修复位置的直接含义

- Work 与 Codex 的共同通用行为问题：优先修 `~/.codex/AGENTS.md`。
- 仓库特有问题：只在对应仓库 `AGENTS.md` 有真实缺口时修改。
- 网页 Chat 的表达/协作问题：由 ChatGPT Custom Instructions / Project instructions 负责，不拿它们修本机 Work 或 Codex。
- 本轮 Karabiner 的目标漂移、过早阻塞、复杂度失控不是仓库规则缺失；主修复位置是全局 Codex 指令。

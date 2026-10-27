# Asteria completeness 的反事实边界

Asteria 式结构最有支持的作用，是把已经知道的能力、机制、关系和证据义务做成可逐项挑战的设计合同。历史尚未证明它自动发现未知场景，或能独立给出科学正确性与运行安全保证。

## 历史映射

| 事件 | 若当时有强结构约束，可能提前暴露什么 | 仍须额外证据 | 判断 |
| --- | --- | --- | --- |
| BK06/BK08 | progress/report 没 trigger/owner，正常 start/resume/status 无实现责任 | 真实用户入口 dry-run | 较强的结构适配证据，未做盲测 |
| BK09 | server 单写者、notifier authority/consumer 跨界 | 源码与并发客户端事实 | 结构会问，不能自己回答 |
| BK13 | reader 声称 isolated 却无相同 runtime readback | 零模型轮真实 probe | 只有“阻断无证据假设”的 gate 才有效 |
| SC01→SC07 | 已知 Hook failure 风险，没有有效 deny 的责任链与证据 | loader failure 注入、原命令启动计数 | 仅有 failure 字段会假绿 |
| SC12 | 保护故障是否误伤无关命令，failure containment 无独立 owner | harmless command 正控制 | 必须同时保护核心与旁路能力 |
| M01 | capture/replay 输入来源、登录权限、动态状态缺失 | 真实浏览 UI | 若整个用户场景没列入，图也看不见 |
| V01/V02 | edge 无 consumer、module/source anchor 不存在、oracle owner 冲突 | materializer / 文件只读核对 | 明确可检验的结构目标 |
| C01/C03 | 科学精度域、参考值/算法决定未绑定 | 解析证明/数值实验 | 图不能证明积分正确 |
| A01/A02 | 可验收的阅读/交互任务未映射 | 整屏/动态交互与独立产品判断 | 不能用结构替代视觉体验 |
| P01/P02 | 正常入口、增量 owner、frozen rubric 与 validator 对应 | 真实 greenfield + 未知增量 | Gate 设计与 Gate 通过须分开 |
| D02 | 用户要求总图却无可见交付节点 | 原型实际读取 | 双模型一致仍可同时遗漏 |

证据详见 [返修链](BRIDGE_KIT_011_TIMELINE.md)、[Slurm](SLURM_EVOLUTION_TIMELINE.md)、[跨项目案例](HISTORICAL_CASES.md)；结构候选原始材料为 [E1](https://github.com/YuukiAS/AI_Research_Toolkit/blob/c733aa065d9ad102a64bb5f5f55453cd31a7e7bc/docs/research/architecture-evolution-system-20261027/pro-a/RESULT.md)、[E2](https://github.com/YuukiAS/AI_Research_Toolkit/blob/c733aa065d9ad102a64bb5f5f55453cd31a7e7bc/docs/research/architecture-evolution-system-20261027/pro-a/ARCHITECTURE_DESIGN_METHOD.md)、[E3](https://github.com/YuukiAS/AI_Research_Toolkit/blob/c733aa065d9ad102a64bb5f5f55453cd31a7e7bc/docs/research/architecture-evolution-system-20261027/pro-a/THREE_PROJECT_STRESS_TEST.md)。

## 应在 benchmark 中测试的 gate 语义

这些是对方法候选的验收命题，不是一套第三完整协议：

- accepted component 的 mechanism 空白，应产生可定位设计缺口。
- relation 只有箭头、没有 payload/consumer，应无法声称交互已设计。
- linked 状态无真实 source anchor，或 anchor 指向不存在模块，应拒绝该声明。
- validated 无 exact candidate / environment / evidence，应降为未验证，不转写成 PASS。
- 重大 revision 没有 reason、受影响能力与失效证据，应无法判断旧证据还能否沿用。
- implementer 需要决定核心产品/算法时，结构完整也不够；必须明确返回架构负责人。
- 外部假设若失败会破坏安全授权、科学有效性、主路径可达性或迫使跨组件重做，且没有已批准隔离/降级，应要求在正式大规模实施前取得相应现实证据。Bridge reader 与 Slurm enforcement 属此类。
- 若证据缺失只影响隔离 adapter、已有批准且不损失承诺能力的替代路径，可以单独冻结不受影响范围；不得用“可隔离”暗中删需求。

最后两条的效益方向有历史支持，成本阈值尚未校准，不能写成统计最优规则。

## 三种假绿

**填满字段。** “失败时 fail closed”填写完整，却未说明是谁在 Python 起不来时输出合法 deny；SC07 仍会发生。

**引用即验证。** linked 到 installer、hash、hooks/list 就写 validated；真实 session 未加载最新 Hook，SC08 仍会发生。

**全部拒绝。** 保护路径不执行，因此负向测试都 PASS，但普通 Bash 也不能用；SC12 要求正控制验旧能力。

这三种都要求语义/运行挑战，schema validator 本身无法识别。

## 结构与独立智能审查的可检验分工

结构层最适合查已知能力的悬空 owner、未定义载荷、无证据状态、无来源链接和版本漂移。独立智能审查更适合从原始场景、事故与产品目标重新定义“还有什么必须回答”，或反驳现有算法/边界。技术调查/最小实验负责外部真实性。最终产品判断负责真实整体使用质量。

这种分工还须实测：例如独立 Work 是否真带来新盲区，而不是重复结构 validator 已提示的问题；Asteria 维护是否额外产生大量仪式工作；图更新是否落后于架构。这些尚无对照数据。

## 降低 late discovery 的损失

Bridge reader/display 对 run state 与 release 的耦合、Slurm supervisor 对无关 Bash 的误伤，说明可以从三个方面检查影响范围：

1. 数据与动作 owner 唯一，adapter 不私自更新核心状态。
2. 外部接口有版本/能力边界，失效不会让下游重新发明语义。
3. normal/failure/recovery 与旁路旧能力一起验，局部改动只作废受影响证据。

历史没有给出“因此减少 X% 代码报废”的数字。这个机制应以后期受影响组件数、废弃任务/代码代理和 implementation→design 返回数衡量，不以增加多少表格衡量。


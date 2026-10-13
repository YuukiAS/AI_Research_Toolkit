# 软件生产体系研究：当前有效入口

研究资料暂存于 AI_Research_Toolkit 的 research/software-production-decision-20261013 分支；未来正式代码归属未决定。未启动Critic，未实施生产系统，未改变六个产品、CARE或STAT5060。

**最新阅读入口是 [v0.4：CARE事故与具体审查进程](07_CARE_AND_EXECUTABLE_REVIEW_V0_4/README.md)。** 这一轮补了40项跨SRR Lite、M8/M9、M10/Routes、ASE R1的具体实现/证据不一致，直接在CPU执行三个冻结源码反例，并将“内部独立审查”明确为由任务拥有者派发的新顶层Codex进程、独立实际观察执行器和受控结果消费，而不是另给主Codex一句“请自查”。

- [40项CARE原始问题、根因和逐项反证](07_CARE_AND_EXECUTABLE_REVIEW_V0_4/CARE_FAILURE_LEDGER.md)
- [审查进程、权限、实际CLI与具体插件派发](07_CARE_AND_EXECUTABLE_REVIEW_V0_4/INDEPENDENT_REVIEW_AND_DISPATCH.md)
- [规则如何修进真实入口及审查者自身的验证](07_CARE_AND_EXECUTABLE_REVIEW_V0_4/RULE_EVOLUTION_AND_PROCESS_TESTS.md)
- [本轮CPU源码反例及准确证据范围](07_CARE_AND_EXECUTABLE_REVIEW_V0_4/probes/README.md)

此前 [v0.3](06_ARCHITECTURE_HARDENING_V0_3/README.md) 的产品任务与Bridge单次执行职责、成熟工具复用、六仓库适配仍有效；v0.4补足实际内部检查与调用者，不再从头设计另一个万能框架。

六仓库已登记问题原始来源见 [246项账本](04_SIX_REPO_AUDIT/README.md)；晚期事故见 [Lucerna/Asteria补查](05_PROPOSED_ARCHITECTURE_V0_2/INCIDENT_ADDENDUM.md)。40项CARE条目不是40次独立实验，也不与246项相加宣称全部当前故障，更不等于已技术性防住。

历史原始材料仍未穷尽。当前主机权限、独立模型审查的真实检测力、实际插件消费和跨平台持续收益尚未完成试点；本轮局部源码复现只证明这些具体失效本可以低成本发现，不能证明新系统已经能拦截所有问题。用户认可前不发Critic提示词，不把研究写入当生产实施或新费用授权。

00–03和05保留历史提案用于溯源；不从其中已被修订的“只写规范”“只要可信验收器”或“强制自造中央监督器”结论自动生成执行任务。

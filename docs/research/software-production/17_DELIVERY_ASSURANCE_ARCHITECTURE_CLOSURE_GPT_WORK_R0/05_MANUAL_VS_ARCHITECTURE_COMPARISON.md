# 人工与架构的六维比较

**证明C：FAIL。** 后提交的修订投影与人工能力目录可以在语义上协调，但不能据此证明独立自动推导成立。Pass A追溯时旧审计页的解决建议列进入上下文；04A又缺原始完整diff/冻结adapter的真正自动执行证据。这两项必须保留，不能用表格覆盖率掩盖。

03/03A已在32b542a79d9e1a937c3b8975d20d5c6fadab282c冻结；本轮没有事后回写它们来抹平差异。逐条六维结果另见05A。下面比较的是能力实质，而不是Gate名字。

| 比较点 | 人工/原设计问题 | 六维分析 | 最终修订 |
|---|---|---|---|
| 控制义务误归产品 | 旧map仅6条纯NON_GATE，本轮80条控制主责任；62条旧map带产品family | 权限/identity/claim失败不等于某产品能力失败；normal entry和authority均不同 | C01/C12/C13分层；相关产品Gate仍提供证据，不再新造“完成Gate” |
| Lucerna L20 | 人工先归NATIVE，新投影归STATE+PRIVACY | 正面能力是凭据实际激活；证据为替换后生产使用；项目owner不变；native只限定入口；FAIL是未激活而非未点击关闭 | 02/04A明确实际激活入口和敏感状态保护；不改03历史 |
| 校准37条 | 人工N:CALIBRATION只写继承owner，尚不够具体 | 被校准对象决定专业authority、normal entry和误拒/漏检语义，不能统一塞给Bridge | 02逐条写calibration_subject及唯一owner；C09禁止自签标准 |
| native/fixture/真实第三方 | 单个evidence class不能表达混合真实度 | 同native Reader可以是真EXE+fake Zotero；支持性能不支持真实库往返 | C10三轴证据；ZOTERO与PERF不同义务 |
| Asteria UI/geometry/scientific truth | 一个综合视觉Gate会吞掉科学方向或量测造假 | GRAPH科学owner；GEOMETRY实测坐标；SCIVIS完整阅读/Frontend，入口/失败含义不同 | 三者保留，采集可共享；缺值不能为零 |
| CARE六族 | 共同科学owner不意味着同一Gate | 结构、干预、总体充分性、终态输出、恢复训练、结论分别有独立坏例和claim边界 | 保留六族，共用运行证据，不强迫六次训练 |
| Bobbio生命周期、SeminarArc压力、Asteria部署 | 人工primary不等于全任务义务集合 | INSTALL/STRESS/DEPLOY可作为secondary或claim直接义务，不能因primary未选就漏掉 | 02A项目能力目录+02 secondary+06 union，避免按单标签选Gate |
| 环境/HUMAN_ONLY | 某次机器不可用容易被永久贴成能力缺失 | 暂不可运行和权限只限制该次target；reporting不是当前机器探针 | 02列明条件状态；C08保留Gate、分开运行可用性 |
| claim范围 | 人工粗写INSTALLED/LIVE或LIVE_SCIENTIFIC | 不同消费对象并非同一线性等级，科研结论更不是部署状态 | C13按target/capability/environment/window绑定；科学outcome单列 |
| scope | 历史根因推定BROAD/FULL不能变永久执行计划 | 需要实际diff+目标闭包；全局交付可复用无关有效结果 | C05/C06/C11固定动态规则；不按案例ID或Gate数量 |
| 新Gate | 旧表任一维相同便说不建，或按不同功能名拆族 | 应比较全部六维是否可被已有family表达，名字/路径差异不够 | C04冻结可表达性与反例；本历史集无须新语义类别 |

## 已消解的设计分歧与未完成的证明

已给出确定修订：L20主归属改变但保留native入口；37个校准责任具体化；多义务并集、target claim、三轴证据、冲突回流、失效/复用规则写入06。没有以人工要求Gate而架构NONE的方式“解决”问题，也没有按363条建Gate或用一个总Gate吞并。

尚不能声称“所有实质mismatch已被独立证明消解”：表内协调由同一研究上下文完成，无法补回盲读独立性；自动Resolver的完整输入不存在。设计上的未分配职责为0，不等于证据上的未完成项为0。

## 准确数字

- 人工363行、架构投影363行、最终覆盖363行，ID集合相等；需求83行。
- 跨项目26种能力模板、9种NON_GATE责任；它们不是运行时必须全选的35个门。
- 原map286行缺77；62条旧表产品family记录在本轮归为NON_GATE主责任；不把这62直接称为62个错误实现。
- primary变化1条（L20）；其余增加/澄清的证据轴、owner、secondary和claim不是“名字全一样所以自动证明成功”。
- 本轮产品runner运行0、真实账号/设备/GPU/付费/部署0；没有生产自动replay PASS。

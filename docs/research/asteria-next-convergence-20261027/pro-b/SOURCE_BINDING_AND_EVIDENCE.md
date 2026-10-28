# 源码绑定与证据

## 1. 复用现有 repository bridge

Asteria 当前 repository bridge 已经包含仓库身份、固定提交、entityId、role、相对路径、codeKind、qualifiedName、testRefs、source、confidence、implementationState、structuralAnchor、codeFingerprint 和 bindingStatus。Asteria Next 不另建 SourceAnchor 数据库；它扩展现有 manifest 的消费、确认和陈旧检测。

## 2. 绑定来源与信任

绑定来源按以下顺序表达，不自动升级：

- `manual`：项目作者手工声明；
- `manifest`：项目正式 manifest 导入；
- `static_analysis`：Tree-sitter／SCIP／dependency-cruiser 等生成；
- `agent_inferred`：模型根据上下文推断；
- `human_confirmed`：合资格人员核实。

`confidence` 是索引器对定位的置信度，不是实现正确率。`agent_inferred` 即使置信度高，也不能直接成为冻结所需的 confirmed binding。

## 3. 绑定粒度

只绑定对理解、实现或验证有价值的锚点：

系统能力 → 机制 → file → function／method／selector／formula routine → test → fixed commit。

不追求全文件树或全调用图。一个实体可以有多个角色绑定，例如 definition、initialization、update、consumption、diagnostic 和 test。代码内行号不是稳定主键；优先使用 qualified name、结构锚点和 fingerprint。

## 4. 源码索引流程

1. 读取 repository bridge manifest 和固定 commit。
2. Tree-sitter 提取语言语法节点、qualified name 和结构范围。
3. SCIP 在支持的语言中补充 definitions／references。
4. dependency-cruiser 或语言原生工具提供模块依赖辅助。
5. 将候选锚点与 manifest 比较，生成 current／stale／broken／unknown。
6. 对新增候选只创建 review queue，不直接写入规范图。
7. 人工确认后更新 manifest，保留来源和确认记录。

## 5. 负控制

正式能力必须包含：

- 符号重命名但行为不变：旧锚点应 stale，候选新锚点出现；
- 同名函数出现在错误文件：不得自动匹配为 current；
- 注释或字符串包含 qualified name：不得被当定义；
- commit 不一致：即使路径存在也不得标 current；
- 测试文件删除：实现状态不得继续显示 tested；
- agent 推断错误：人工拒绝后不能在下一次索引无证据复活；
- 科研代码存在：不得自动升级科学路线为 accepted。

## 6. 证据层级

Asteria 区分：

1. 候选身份：仓库、commit、文件／产物哈希、生成命令和环境。
2. 机械观察：测试、数值复算、schema、文件结构、布局和可复现性。
3. 运行观察：正常入口、真实浏览器／程序行为、性能和失败链。
4. 专业判断：产品、科学、统计、教学、视觉或领域结论。
5. 决策／冻结：谁基于哪些证据接受、拒绝或条件冻结。

后一层不能由前一层自动替代。implementation binding 明确不等于科学证明，测试通过不等于成品验收。

## 7. EvidenceRecord 有效性

证据必须绑定候选和范围，保存生产者、观察、结论、限制、有效提交和生成时间。以下变化触发失效：

- 候选字节或固定 commit 改变；
- 证据覆盖的实体、关系、机制或要求改变；
- 生成工具或协议发生实质变化；
- source anchor 变为 stale／broken；
- 专业判断使用的完整上下文不再相同。

局部改变只使受影响证据 stale；跨对象不变保证和整套产品质量需要单独的回归证据。

## 8. 四项目的绑定差异

- Delivery Assurance：implementation 合法为空，只保存未来责任和验证方法。
- Mica：绑定 DOM 识别、输入生命周期、旧内容恢复、连接器锁存、诊断和真实测试。
- CAT-TRACE：绑定数值 primitive、reference algorithm、oracle、测试和 blocked status；代码不更新科学真值。
- Tutorial：源码并非唯一实现对象；绑定 PPTX／PDF／页面／对象身份、生成脚本、渲染和 validator evidence。

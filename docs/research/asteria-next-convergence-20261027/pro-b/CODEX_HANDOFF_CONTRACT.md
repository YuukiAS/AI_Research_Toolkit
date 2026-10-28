# Codex 实施交接合同

## 1. 执行边界

Codex 的任务是把本规格实现为 Asteria 的下一版，不重新决定产品边界、规范对象、四个参考项目、冻结语义、证据边界或开源采用方向。任何需要改变这些冻结语义的发现都应返回设计审查，而不是在代码中静默选择。

## 2. 进入实施前必须读取

- Asteria 当前 `README.md`、`ROADMAP.md`、`TODO.md`、`VERSIONING.md`；
- `src/architecture/types.ts`、`schema.ts`、`projection.ts`、`semanticDiff.ts`、`validation.ts`、`repositoryBridge.ts`、`graphPresentation.ts`；
- 当前 AGENTS 与适用项目规则；
- 本目录的 `ASTERIA_NEXT_CANONICAL_SPEC.md`、`SEMANTIC_MODEL.md`、`ARCHITECTURE_DESIGN_AND_FREEZE.md`、`VERSION_EVOLUTION_AND_DRIFT.md`、`SOURCE_BINDING_AND_EVIDENCE.md`、`VISUAL_SYSTEM.md`、`FOUR_REFERENCE_PROJECTS.md`。

## 3. 实施阶段

### 阶段 A：模型与迁移

- 对当前 schema 做向前兼容扩展；
- 增加 relation contract、ArchitectureRevision、SemanticChange 和 EvidenceRecord；
- 现有 Original TRACE／CAT-TRACE、Architecture／Lineage／Evidence 和 v1 migration fixture 必须零语义损失；
- 不建立第二套 ledger store；
- 为旧数据提供显式 migration 和 roundtrip test。

完成能力：现有图可以在不破坏 2.0 的情况下承载关系合同、修订和证据有效性。

### 阶段 B：系统与路径阅读

- 复用当前 Architecture workspace；
- 接入 Cytoscape.js／ELK.js 或经验证的等价成熟方案；
- 实现路径聚焦、节点／关系选择、关系合同 inspector、上游／下游和手机 readingOrder；
- view projection 保存布局，不复制语义关系。

完成能力：用户可从整体系统进入真实载荷和消费者，桌面／手机均自然阅读。

### 阶段 C：机制 renderer

- 实现 sequence、algorithm、formula／numerical、artifact loop 四类 renderer；
- renderer 共享 token、选择和 source/evidence link；
- 没有对应语义时不得显示空标题或占位卡。

完成能力：组件名字可继续下钻到实际工作机制。

### 阶段 D：源码与证据

- 消费现有 repository bridge；
- 加入 Tree-sitter／SCIP 试点、binding review queue、current／stale／broken 检查；
- 实现 EvidenceRecord、候选身份和局部失效；
- 先在 Mica、CAT-TRACE 关闭正反控制，再扩大语言覆盖。

完成能力：设计能追到可信实现与验证，同时保持科学／产品证据边界。

### 阶段 E：演进、差异与漂移

- 扩展 semantic diff；
- 实现 meaningful revision、local history、before／after、why changed、impact、unchanged guarantees；
- 实现 design-ahead、code-ahead、binding stale／broken 和 evidence stale。

完成能力：用户可解释组件如何变、为什么变以及代码是否跟上。

### 阶段 F：Freeze 与交付

- 实现机械完整性检查和专业判断回执；
- 生成 Architecture Freeze report 与 Codex handoff export；
- 导出不能遗漏开放项、边界、失败链和不变保证。

完成能力：交给后续 Codex 的包不再把关键决定留给实施者。

### 阶段 G：四参考与产品验收

- 用同一规范模型加载 DA、Mica、CAT-TRACE、Tutorial；
- 完成 light/dark、desktop/mobile、键盘、overflow、图碰撞和完整产品审查；
- 使用真实浏览器、真实 fixed public URL 和最终候选执行 gate。

完成能力：四类项目在正常入口下均可用，不是合成 schema 演示。

## 4. 必须测试

- schema parse／serialize／migration／roundtrip；
- 现有 v1 compatibility 与 Asteria 2.0 regression；
- relation contract 正反控制；
- revision 与 commit 非一一对应；
- semantic diff 排除纯坐标／文案噪声；
- implementation binding current／stale／broken／unknown；
- 同名错误锚点和 agent inference 拒绝；
- evidence invalidation 的局部传播与全局保护；
- design-only 不误报 drift，validated-without-evidence 必须报错；
- 四项目完整数据 fixture；
- 320／390／768／1366／1440／1920，light／dark；
- keyboard、focus、reduced motion、forced colors；
- large graph 性能、路径聚焦和 manual layout override；
- fixed public URL smoke。

## 5. 禁止实施者决定

- 是否另建产品或数据库；
- 是否把 Architecture Ledger 作为第二真值；
- 是否删除现有 Lineage／Evidence；
- 是否用文件树替代架构；
- 科研路线是否 accepted；
- 哪类专业判断可以被 lint 替代；
- 发布、外部服务、费用或权限扩大；
- 四个 reference 中开放／阻塞项的事实状态。

## 6. 交付证据

每阶段提交：源码与 migration、真实测试结果、四参考受影响页面截图、正反控制、浏览器 QA、README／ROADMAP／VERSIONING 检查、固定候选 commit 和未关闭风险。测试文件或截图存在本身不代表能力完成，必须通过正常入口证明用户可以完成对应任务。

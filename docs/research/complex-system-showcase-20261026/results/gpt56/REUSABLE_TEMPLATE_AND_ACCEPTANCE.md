# 通用复杂系统展示模板与 Codex 验收标准

## 模板目标

模板服务于“读者需要判断一个复杂系统是否有用、怎样工作、为什么可信”的场景。它不是通用营销首页、文档主题或架构图编辑器。每个新系统必须提供真实任务、真实失败、组件合同和证据边界，才能进入模板。

## 内容模型

最终 Astro 模板使用结构化内容集合。以下字段是概念合同；实现时可用 Astro Content Collections 的模式校验。

```ts
interface SystemProfile {
  id: string;
  name: string;
  oneLineValue: string;
  realLoss: string;
  currentBoundary: EvidenceState;
  completed: ClaimRef[];
  missing: ClaimRef[];
  primaryScenario: string;
  recommendedArchitecture: DecisionRef;
  nextProof: string;
}

interface Scenario {
  id: string;
  title: string;
  sourceCase: SourceRef[];
  obligation: string;
  outcomes: {
    normal: Stage[];
    failure: Stage[];
    regression: Stage[];
  };
}

interface Stage {
  name: string;
  input: string;
  mechanism: string;
  output: string;
  consumer: string;
  failureHandling: string;
  falsifier: string;
  evidenceState: EvidenceState;
}

interface ComponentContract {
  id: string;
  name: string;
  reason: string;
  trigger: string;
  authoritativeInput: string;
  mechanism: string;
  output: string;
  consumer: string;
  failureHandling: string;
  removalLoss: string;
  notResponsibleFor: string;
  lifecycle: "existing" | "partial" | "approved-design" | "proposed" | "missing";
}

interface EvidenceClaim {
  id: string;
  claim: string;
  kind: "observed" | "source" | "deterministic-test" | "approved-design" | "real-candidate" | "deployed" | "estimate";
  supports: string;
  doesNotSupport: string;
  sources: SourceRef[];
  subjectIdentity?: string;
  consumer?: string;
}
```

### 构建时硬校验

- 每个系统至少一个真实正向场景、一个真实失败场景和一个旧功能保护场景。
- 每个关键阶段必须有 `input`、`output`、`consumer` 和 `falsifier`。
- 每个组件必须填写 `removalLoss` 和 `notResponsibleFor`。
- 每条证据必须同时填写 `supports` 与 `doesNotSupport`。
- 声明为 `real-candidate` 或 `deployed` 时必须有 `subjectIdentity`；没有同一候选身份则构建失败。
- 任何关键输出没有消费者时构建失败，而不是显示一条无去向箭头。
- 估计必须标记 `estimate`，不得使用“已完成”“预计上线”等表达。

## 页面模板

### `/`：系统概览

必有：一句价值、真实损失、当前边界、一个主要任务入口、三项核心判断、唯一推荐架构、下一项证明。首屏不得出现完整组件目录、角色名单或研究过程。

### `/stories/[scenario]`：真实任务

显示正常、失败和旧功能保护三种结果；使用同一阶段结构便于比较。交互只切换结果和阶段。页面必须标明案例来源及其证据等级。

### `/components/[id]`：组件合同

每页只解释一个组件的存在理由、合同、消费者、失败与删除后果。可从概览组件检查器进入。不得把仓库目录或类图当作组件解释。

### `/evidence/[claim]`：主张与证据

按主张组织来源，展示支持和不支持。源码路径、提交、测试和截图在这里展开，不占用概览主路径。

### `/decisions/[id]`：架构决定

记录采用方案、最强替代、取舍、风险、停止条件和重新打开决定的触发条件。内部思考过程不展示；只保留影响读者判断的决定依据。

## 通用视觉规则

- 页面最大正文宽度和标题层级由令牌统一；不得为每个系统重新发明主题。
- 状态色只表达证据等级，不能表达品牌装饰。
- 面积与注意力必须大致对应信息价值；次要来源不得占据首屏。
- 一个视窗内最多一个主焦点。连续卡片不得代替真正分组。
- 图表只在空间关系本身具有解释价值时使用；能用顺序、比较或合同表达时不用架构图。
- 移动端按阅读顺序重排，不缩小桌面大图。
- 正文默认自然中文；正式专名和机器字符串按需要保留。

## Artifact Curation、Reasoned Design 与 Clear Writing 的运行位置

1. **Reasoned Design 先确定内容真相。** 它负责问题、替代、机制、证据和未决项；没有收敛方案时不进入视觉实施。
2. **Artifact Curation 决定哪些元素进入成品。** 每个标题、图、控件和交互要说明帮助读者完成的判断；无明确价值则删除。
3. **Clear Writing 最后组织读者表达。** 它不能改变事实等级，也不能把内部机器状态直接倾倒给读者。
4. **Delivery Assurance 检查交付承诺。** 它验证页面是否真的覆盖指定受众、内容、移动端、交互、证据和状态边界。
5. **项目级视觉与无障碍验收提供专业事实。** 自动检查不能替代浏览器渲染和人工内容复核。

这五步是责任顺序，不应在页面上显示为研发角色说明。

## Codex 实施边界

### 必须保留

- 首屏“一句价值 + 当前边界 + 下一项证明”。
- 三种任务结果与五阶段机制。
- 组件合同中的消费者、删除后果和明确不负责。
- 证据账本的“支持 / 不支持”。
- 旧 R3 与新职责架构的时间版本区分。
- Lucerna 固定提交与真实来源链接。
- 桌面和移动端独立布局。
- 无 JavaScript 时的默认内容可读性。

### 禁止擅自加入

- 登录、账号、数据库、搜索、编辑器、CMS、仪表盘或实时数据。
- 节点拖拽、缩放画布、迷你地图、自动播放、粒子、视差、鼠标跟随、主题切换。
- “点击灯头”“柔光扩散”等无解释价值互动。
- 大量同形卡片、假指标、百分比完成度、动态数字、虚构用户评价。
- 内部代理角色、任务号、流水线名称和研发过程作为面向读者的正文。
- 没有消费者的箭头、没有证据的绿色状态、把 `PROCEED` 写成“已上线”。
- 为使用组件库而重写视觉，或把 GOV.UK、Starlight 等现成品牌直接套到成品上。

### 允许新增的条件

新增页面、组件或交互前，提交一条简短设计决定，说明：它帮助哪类读者完成什么判断；为什么现有结构不能完成；新增后删除或合并什么；移动端与无障碍怎样成立。任何一项无法回答，拒绝新增。

## 视觉与功能验收

### 内容

- 首屏不阅读任何流程图即可说明用途和真实完成度。
- 正常、失败和旧功能保护都使用真实案例，不是抽象占位符。
- 每个关键组件都能回答“删掉以后失去什么”。
- 所有完成状态都能追到证据，且没有跨级升级。
- 所有估计明确标记为估计。

### 桌面与移动

- 1440 像素桌面和 390 像素移动端均无整页横向溢出。
- 移动端标题、控件、详情和证据保持可读；大图不得依赖横向平移。
- 组件选择器允许局部滚动，但页面主体宽度不增加。
- 触控目标、键盘焦点和跳过链接实际可用。

### 交互

- 场景切换后，阶段详情和结论同步更新。
- 阶段切换后，输入、动作、输出、消费者与证伪条件来自同一数据对象。
- 组件切换后，状态、责任、删除后果和不负责范围同步更新。
- 禁用 JavaScript 时仍有默认正常路径、组件合同、证据和推荐结论。
- 交互没有自动动画；减少动态效果偏好下无额外运动。

### 工程

- Astro 构建为静态输出；第一版不要求服务器。
- 内容集合模式检查通过；缺必需字段时构建失败。
- 页面 JavaScript 只来自两个局部交互岛；其余为静态 HTML。
- 不引入 React Flow、图表运行时或完整 UI 框架。
- Lighthouse 或同类自动检查只作为辅助；必须另有键盘、移动端和内容人工复核。
- 所有外部来源链接固定到官方仓库或明确提交；对实时版本信息注明核对日期。

## 第二系统迁移检查：SeminarArc

模板不是为 Delivery Assurance 特制。使用旧研究中的 SeminarArc 对象进行纸面迁移：

- 一句价值：一次讲座记录从创建、编辑、结束到强制关闭、重启、搜索和导出仍保持完整。
- 正常故事：同一 APK 与数据库版本完成创建、持久化、重启读取和导出。
- 失败故事：OCR 观察器定位错控件导致 0/5，不得被解释为模型或存储失败；修正观察路径后重新取得证据。
- 旧功能保护：新增 OCR 或编辑能力不能破坏离线照片流、Room 持久化和已有导出。
- 组件合同与证据账本无需改变字段，只替换项目专业入口和来源。

这说明模板的稳定对象是“任务、义务、组件合同和证据”，不是 Lucerna 特有状态名。

## 交付停止点

本轮完成后必须停在设计审查。只有用户接受信息架构、视觉方向、技术选型和原型，才可以另开正式产品实施任务。原型文件不得直接搬入生产仓库并宣称完成；正式实施需重新建立 Astro 工程、内容模式、测试与部署边界。

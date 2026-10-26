window.DA_MODEL = {
  nodes: [
    {
      id: 'request',
      label: '原始要求',
      subtitle: '用户目标与授权',
      kind: 'input',
      status: 'existing',
      statusLabel: '已有事实来源',
      x: 42, y: 198, w: 166, h: 92,
      summary: '保留用户原话、明确授权、项目边界和最终要交付的对象。',
      details: [
        ['为什么存在', '后续判断必须能回到原始要求，不能只依赖执行者的摘要。'],
        ['交出什么', '原始请求、明确决定、资源与权限边界。'],
        ['谁接收', '当前 Codex；交付义务形成时也要能追溯到这里。'],
        ['少了会怎样', '需求可能在实现或验收时被缩减、改写或遗漏。'],
        ['当前状态', '普通用户请求本身已经存在；自动绑定到交付层尚待接线。']
      ]
    },
    {
      id: 'codex',
      label: '当前 Codex',
      subtitle: '同一任务的实现与返修',
      kind: 'component',
      status: 'existing',
      statusLabel: '已有执行者',
      x: 246, y: 198, w: 178, h: 92,
      summary: '理解请求、调用需要的专业能力、修改当前候选；验收失败后仍由原任务继续修复。',
      details: [
        ['为什么存在', '产品修改和修复需要留在同一任务、同一候选与原权限边界内。'],
        ['需要什么', '原始要求、项目规则、现有代码和专业能力。'],
        ['交出什么', '当前候选、变化说明、需要运行的项目检查。'],
        ['谁接收', '项目验收程序；失败时由 Bridge Kit 把反馈送回本任务。'],
        ['少了会怎样', '失败报告没有实际修复者，用户仍需重新开任务或搬运结论。'],
        ['当前状态', 'Codex 执行能力已有；DA 失败回传到准确原任务仍需实测。']
      ]
    },
    {
      id: 'workflow',
      label: 'workflow-core',
      subtitle: '选择能力与调用顺序',
      kind: 'component',
      status: 'partial',
      statusLabel: '已有；消费待证明',
      x: 472, y: 70, w: 184, h: 92,
      summary: '发现当前可用的专业能力，安排调用顺序，并记录每项输出由谁实际使用。',
      details: [
        ['为什么存在', '复杂任务往往需要多个专业能力；只列清单不能证明它们真的被调用。'],
        ['需要什么', '任务目标、宿主可加载能力、项目现有工作流。'],
        ['交出什么', '必要能力、顺序、执行者和结果接收者。'],
        ['谁接收', '当前 Codex 与原项目流程。'],
        ['少了会怎样', '技能可能只存在于仓库或提示词中，最终成品并未消费其结果。'],
        ['当前状态', '路由规范已有；跨插件的实际加载与消费仍需正常入口验证。']
      ]
    },
    {
      id: 'bridge',
      label: 'Bridge Kit',
      subtitle: '身份、运行与反馈递送',
      kind: 'component',
      status: 'partial',
      statusLabel: '已有；DA 接线待证',
      x: 472, y: 326, w: 184, h: 92,
      summary: '绑定任务和候选身份，按已有权限运行，递送结果，并保留合法恢复位置。',
      details: [
        ['为什么存在', '交付证据必须属于准确任务、候选和运行对象，失败也要回到合法接收者。'],
        ['准确责任', '身份、合法启动、运行边界、反馈递送和已有恢复机制。'],
        ['不负责', '不选择专业标准，不审界面，不决定产品已经完成。'],
        ['谁接收', '当前 Codex、原父流程或已有控制器。'],
        ['少了会怎样', '结果可能发错任务、绑定错候选，或只写文件却没人接收。'],
        ['当前状态', '底层能力已有；面向 DA 的普通入口钩子和回执尚未正式接通。']
      ]
    },
    {
      id: 'baseline',
      label: '原有可用功能',
      subtitle: '项目基线和正式合同',
      kind: 'input',
      status: 'existing',
      statusLabel: '已有项目资产',
      x: 704, y: 430, w: 178, h: 72,
      summary: '把修改前已经可用的行为和受影响的下游入口纳入本次交付条件。',
      details: [
        ['为什么存在', '新增用例通过，仍可能同时破坏原有功能。'],
        ['需要什么', '已接受版本、正式产品合同、依赖关系和历史正确行为。'],
        ['交出什么', '本次必须保持的行为，以及能够证明这些行为仍可用的证据。'],
        ['谁接收', 'Delivery Assurance 与项目验收程序。'],
        ['少了会怎样', '修复一个错误时可能悄悄制造回归。'],
        ['当前状态', '项目基线通常存在；未知的动态影响仍无法靠自动扫描全部发现。']
      ]
    },
    {
      id: 'da',
      label: 'Delivery Assurance',
      subtitle: '核对交付义务和证据',
      kind: 'component',
      status: 'proposed',
      statusLabel: '建议新增',
      x: 694, y: 198, w: 208, h: 102,
      summary: '核对本次承诺、受影响的原有功能和当前候选，只在证据足够时允许相应的交付结论。',
      details: [
        ['为什么存在', '各项测试即使分别通过，也可能没有共同证明本次承诺。'],
        ['需要什么', '原始要求、项目标准、受影响的原有功能、当前候选身份和专业结果。'],
        ['交出什么', '能确认的范围、仍缺的证据，或写清实际结果和预期结果的失败反馈。'],
        ['谁接收', '成功结论交给最终使用路径；失败交给 Bridge Kit，再回原 Codex。'],
        ['少了会怎样', '旧截图或不属于当前候选的结果，可能被拼成错误的“完成”。'],
        ['当前状态', '职责架构已经形成；独立插件、正常入口和七仓接线尚未实施。']
      ]
    },
    {
      id: 'validators',
      label: '项目验收程序',
      subtitle: '观察真实成品',
      kind: 'component',
      status: 'partial',
      statusLabel: '各项目程度不同',
      x: 934, y: 112, w: 190, h: 92,
      summary: '运行项目自己的测试和观察，判断真实软件、数据、模型或文档是否符合专业标准。',
      details: [
        ['为什么存在', '通用交付层不能替项目发明医学、统计、界面或设备标准。'],
        ['需要什么', '冻结的项目标准、当前候选、合法环境和观察方式。'],
        ['交出什么', '原始结果、实际与预期、候选和观察器身份。'],
        ['谁接收', 'Delivery Assurance；必要时也供独立复核查看。'],
        ['少了会怎样', '交付层只能检查文件和状态，无法判断专业成品是否正确。'],
        ['当前状态', 'Lucerna 等项目已有运行器；覆盖和成熟度并不一致。']
      ]
    },
    {
      id: 'review',
      label: '独立复核',
      subtitle: '高风险时按需调用',
      kind: 'component',
      status: 'partial',
      statusLabel: '按需；接线待证',
      x: 934, y: 326, w: 190, h: 92,
      summary: '在含义、验收器或重要成品容易被同一执行者误判时，独立读取原始材料并给出意见。',
      details: [
        ['为什么存在', '实现者不能靠修改产品和测试一起降低标准后自我签发。'],
        ['触发条件', '新专业标准、高风险语义、重要观察器或正式独立验收。'],
        ['交出什么', '针对当前候选和原材料的独立意见。'],
        ['谁接收', 'Delivery Assurance 或原项目已有接收者。'],
        ['少了会怎样', '关键专业判断可能只剩同一上下文的自查。'],
        ['当前状态', '部分项目已有独立角色；不是每个任务都需要，也不能只创建文件冒充运行。']
      ]
    },
    {
      id: 'consumer',
      label: '用户或下游流程',
      subtitle: '消费有边界的交付结论',
      kind: 'output',
      status: 'pending',
      statusLabel: '最终接收路径待实测',
      x: 1148, y: 198, w: 118, h: 102,
      summary: '收到与当前候选一致的可用范围、未完成项和必要证据，而不是一个脱离对象的总绿灯。',
      details: [
        ['为什么存在', '交付结论必须进入真实用户操作或后续流程，才算被消费。'],
        ['需要什么', 'Delivery Assurance 给出的范围化结论和 Bridge Kit 绑定的候选身份。'],
        ['交出什么', '用户可使用的结果，或下游任务可接受的明确状态。'],
        ['谁接收', '用户、发布流程、科研分析或下一合法步骤。'],
        ['少了会怎样', '报告存在，但正常结束入口仍可绕过它。'],
        ['当前状态', '设计已指定消费者；普通入口的强制消费尚未证明。']
      ]
    },
    {
      id: 'reasoned',
      label: 'Reasoned Design',
      subtitle: '需要重新设计时',
      kind: 'optional',
      status: 'proposed',
      statusLabel: '建议新增',
      x: 184, y: 548, w: 178, h: 66,
      summary: '用于重要判断和完整方案设计，不是每次交付都必须经过的固定关卡。',
      details: [
        ['何时使用', '目标、取舍或架构本身尚未明确时。'],
        ['交出什么', '有依据的判断、完整方案和仍待验证的前提。'],
        ['谁接收', '当前 Codex 或项目设计负责人。'],
        ['不负责', '不替项目定义专业验收阈值，也不直接签发交付。'],
        ['当前状态', '总体职责已提出，插件尚未开发。']
      ]
    },
    {
      id: 'domain',
      label: '领域插件',
      subtitle: '按任务选择',
      kind: 'optional',
      status: 'existing',
      statusLabel: '已有多种能力',
      x: 382, y: 548, w: 150, h: 66,
      summary: '提供前端、科研写作、可视化、统计等专业制作和检验能力。',
      details: [
        ['何时使用', '任务确实属于相应专业领域时。'],
        ['交出什么', '领域方案、成品或专业检查结果。'],
        ['谁接收', '当前 Codex、项目验收程序或后续领域流程。'],
        ['不负责', '不承担跨项目的最终交付身份和失败递送。'],
        ['当前状态', '多种插件已有；实际加载与消费要逐宿主证明。']
      ]
    },
    {
      id: 'curation',
      label: 'Artifact Curation',
      subtitle: '决定什么值得出现',
      kind: 'optional',
      status: 'proposed',
      statusLabel: '建议新增共享 Skill',
      x: 552, y: 548, w: 190, h: 66,
      summary: '检查文字、图片、卡片、按钮和说明是否对读者或使用者有实际价值。',
      details: [
        ['何时使用', '网页、文档、幻灯片、图片或界面需要内容取舍时。'],
        ['交出什么', '保留、删除、合并、转移或补充必要内容的意见。'],
        ['谁接收', '实际制作成品的领域插件或当前 Codex。'],
        ['不负责', '不改专业事实，不删除用户明确承诺的功能。'],
        ['当前状态', '职责已经提出，独立共享 Skill 尚未开发。']
      ]
    },
    {
      id: 'writing',
      label: 'Clear Writing',
      subtitle: '处理保留文字',
      kind: 'optional',
      status: 'partial',
      statusLabel: '已有；新版仍在验收',
      x: 762, y: 548, w: 176, h: 66,
      summary: '在内容和事实已经确定后，整理阅读顺序并写成自然、准确的中文。',
      details: [
        ['何时使用', '面向读者的中文说明、界面文案或正式成稿需要表达审校时。'],
        ['交出什么', '不改变证据强度和产品含义的自然表达。'],
        ['谁接收', '当前成品和最终读者。'],
        ['不负责', '不替前端决定文本是否该出现，也不替项目改变结论。'],
        ['当前状态', '现有插件可用；最新版本仍需真实正常入口完成验收。']
      ]
    }
  ],
  edges: [
    {
      id: 'request-codex', from: 'request', to: 'codex',
      label: '原始请求', kind: 'normal', state: 'existing',
      d: 'M208 244 L246 244', labelX: 228, labelY: 232,
      payload: '用户原话、明确授权、项目边界。',
      trigger: '用户提出或继续原任务。',
      consumer: '当前 Codex。',
      success: '后续义务能够追溯到同一请求。',
      gap: '普通请求已有；自动形成 DA 会话身份仍待接线。'
    },
    {
      id: 'codex-workflow', from: 'codex', to: 'workflow',
      label: '目标与环境', kind: 'optional', state: 'pending',
      d: 'M358 198 C382 146 420 116 472 116', labelX: 414, labelY: 142,
      payload: '任务目标、当前宿主、已有项目能力。',
      trigger: '复杂任务需要组合多项能力时。',
      consumer: 'workflow-core。',
      success: '形成必要且不过度的能力路线。',
      gap: '路由规则已有，当前宿主是否稳定加载仍需验证。'
    },
    {
      id: 'workflow-codex', from: 'workflow', to: 'codex',
      label: '能力与顺序', kind: 'optional', state: 'pending',
      d: 'M472 138 C416 164 394 184 380 198', labelX: 420, labelY: 178,
      payload: '必要能力、调用顺序、输出接收者。',
      trigger: 'workflow-core 完成路由。',
      consumer: '当前 Codex。',
      success: '专业结果在实现或验收中被实际使用。',
      gap: '跨插件“实际消费”是目前尚未完成的关键证据。'
    },
    {
      id: 'codex-bridge', from: 'codex', to: 'bridge',
      label: '任务与候选身份', kind: 'normal', state: 'partial',
      d: 'M424 244 C448 244 448 372 472 372', labelX: 452, labelY: 306,
      payload: '任务标识、分支、候选版本、权限与运行请求。',
      trigger: '受管入口需要启动、恢复或递送结果。',
      consumer: 'Bridge Kit。',
      success: '运行和反馈绑定准确对象。',
      gap: '部分受管入口已有；普通任务的 DA 接入仍未证明。'
    },
    {
      id: 'codex-da', from: 'codex', to: 'da',
      label: '要求与候选', kind: 'normal', state: 'pending',
      d: 'M424 244 L694 244', labelX: 560, labelY: 232,
      payload: '批准要求、当前候选、变化范围、专业标准定位。',
      trigger: '准备形成交付义务或检查结果时。',
      consumer: 'Delivery Assurance。',
      success: '本次承诺被转成明确的必需条件。',
      gap: '独立 Delivery Assurance 尚未实现。'
    },
    {
      id: 'bridge-da', from: 'bridge', to: 'da',
      label: '身份与回执', kind: 'normal', state: 'pending',
      d: 'M656 372 C682 372 672 286 694 274', labelX: 678, labelY: 334,
      payload: '同一任务、候选、运行和接收者身份。',
      trigger: '交付判断或失败递送前。',
      consumer: 'Delivery Assurance。',
      success: '证据不会跨任务、跨版本拼接。',
      gap: '接收者已定义，生产接口仍待实现。'
    },
    {
      id: 'baseline-da', from: 'baseline', to: 'da',
      label: '必须保持的功能', kind: 'evidence', state: 'pending',
      d: 'M793 430 L793 300', labelX: 807, labelY: 374,
      payload: '原有可用功能、依赖关系和受影响的下游入口。',
      trigger: '当前修改触及共享逻辑或既有入口。',
      consumer: 'Delivery Assurance。',
      success: '旧功能成为同一交付义务的一部分。',
      gap: '未知动态影响不能被完全自动发现，必须保留覆盖缺口。'
    },
    {
      id: 'codex-validators', from: 'codex', to: 'validators',
      label: '当前候选与检查范围', kind: 'normal', state: 'partial',
      d: 'M424 224 C590 150 752 148 934 158', labelX: 690, labelY: 142,
      payload: '当前候选、项目入口、检查范围和合法环境。',
      trigger: '实现形成可运行纵向链或准备正式交付。',
      consumer: '项目验收程序。',
      success: '项目正式运行器观察准确候选。',
      gap: '项目运行器已有程度不同；不能用一个通用脚本替代。'
    },
    {
      id: 'validators-da', from: 'validators', to: 'da',
      label: '专业结果', kind: 'evidence', state: 'pending',
      d: 'M934 174 C914 194 914 224 902 238', labelX: 920, labelY: 210,
      payload: '原始观察、实际与预期、运行器和候选身份。',
      trigger: '项目检查完成或明确缺少观察。',
      consumer: 'Delivery Assurance。',
      success: '专业结果逐项对应交付义务。',
      gap: '项目结果适配到共享交付判断尚未完成。'
    },
    {
      id: 'validators-review', from: 'validators', to: 'review',
      label: '按需送审', kind: 'optional', state: 'partial',
      d: 'M1028 204 L1028 326', labelX: 1042, labelY: 270,
      payload: '当前候选、原始结果和冻结专业标准。',
      trigger: '验收器或专业结论需要独立判断时。',
      consumer: '实际获权的独立复核者。',
      success: '独立意见来自准确候选和原材料。',
      gap: '只有复核者实际启动并有人接回结果才算发生。'
    },
    {
      id: 'review-da', from: 'review', to: 'da',
      label: '独立意见', kind: 'optional', state: 'pending',
      d: 'M934 372 C910 354 916 292 902 270', labelX: 916, labelY: 324,
      payload: '独立判断、适用范围和仍未解决的问题。',
      trigger: '复核完成。',
      consumer: 'Delivery Assurance 或原项目接收者。',
      success: '产品与验收标准不能由同一执行者一起放松。',
      gap: '跨任务回传和候选绑定仍需逐宿主证明。'
    },
    {
      id: 'da-consumer', from: 'da', to: 'consumer',
      label: '交付结论', kind: 'success', state: 'pending',
      d: 'M902 244 L1148 244', labelX: 1026, labelY: 232,
      payload: '通过范围、未证项、当前候选身份和必要证据。',
      trigger: '所有必需义务具有合格证据。',
      consumer: '用户、发布流程或下游任务。',
      success: '最终结果在正常结束入口被实际消费。',
      gap: '正常结束检查和七仓正式出口尚未接通。'
    },
    {
      id: 'da-bridge-failure', from: 'da', to: 'bridge',
      label: '失败反馈', kind: 'failure', state: 'pending',
      d: 'M694 272 C666 292 682 344 656 360', labelX: 674, labelY: 306,
      payload: '实际结果、应有结果、证据、候选身份、允许修复范围。',
      trigger: '必需义务失败，且仍可在原任务内修复。',
      consumer: 'Bridge Kit。',
      success: '反馈由合法运行路径递送。',
      gap: '只写失败文件不算递送；实际回执仍待证明。'
    },
    {
      id: 'bridge-codex-failure', from: 'bridge', to: 'codex',
      label: '回到原任务', kind: 'failure', state: 'pending',
      d: 'M472 392 C438 418 402 348 388 290', labelX: 420, labelY: 376,
      payload: '结构化失败、当前候选和剩余修复边界。',
      trigger: 'Bridge Kit 找到准确的原 Codex 接收者。',
      consumer: '同一逻辑任务中的当前 Codex。',
      success: 'Codex 明确接收并继续修复；之后重新验收。',
      gap: '无活跃接收者时只能保存恢复点，不能承诺后台自动唤醒。'
    },
    {
      id: 'reasoned-codex', from: 'reasoned', to: 'codex',
      label: '方案与判断', kind: 'optional', state: 'pending',
      d: 'M272 548 C268 478 278 360 304 290', labelX: 278, labelY: 468,
      payload: '设计结论、取舍和待验证前提。',
      trigger: '任务本身需要重要设计判断。',
      consumer: '当前 Codex。',
      success: '实施以完整方案为依据。',
      gap: '插件尚未开发；不是当前每个任务的必经步骤。'
    },
    {
      id: 'domain-codex', from: 'domain', to: 'codex',
      label: '专业能力', kind: 'optional', state: 'partial',
      d: 'M450 548 C432 466 388 350 356 290', labelX: 414, labelY: 458,
      payload: '领域方案、实现规则或专业检验。',
      trigger: '任务需要相应专业能力。',
      consumer: '当前 Codex 或项目验收程序。',
      success: '专业结果实际改变实现或验收。',
      gap: '安装、读取和消费不能互相代替。'
    },
    {
      id: 'curation-codex', from: 'curation', to: 'codex',
      label: '内容取舍', kind: 'optional', state: 'pending',
      d: 'M648 548 C620 500 520 360 400 286', labelX: 554, labelY: 458,
      payload: '保留、删除、合并或转移内容的意见。',
      trigger: '交付物需要决定哪些元素值得出现。',
      consumer: '当前 Codex 或领域制作插件。',
      success: '成品不靠无关文字和装饰制造完整感。',
      gap: '共享 Skill 尚未开发。'
    },
    {
      id: 'writing-codex', from: 'writing', to: 'codex',
      label: '自然表达', kind: 'optional', state: 'partial',
      d: 'M850 548 C850 530 686 532 660 506 C594 438 510 340 416 278', labelX: 654, labelY: 446,
      payload: '在事实和内容位置冻结后的中文表达。',
      trigger: '用户可见文字需要终审。',
      consumer: '当前成品和最终读者。',
      success: '文字自然，同时保留产品含义和证据边界。',
      gap: '当前新版仍需真实入口完成验收；不能以插件名称代替逐句审校。'
    }
  ],
  scenarios: {
    success: {
      title: '正常交付',
      summary: '专业证据与当前候选一致，交付结论进入最终使用路径。',
      next: '下一位接收者：用户或下游流程',
      nodes: ['request', 'codex', 'workflow', 'bridge', 'da', 'validators', 'consumer'],
      edges: ['request-codex', 'codex-workflow', 'workflow-codex', 'codex-bridge', 'codex-da', 'bridge-da', 'codex-validators', 'validators-da', 'da-consumer'],
      steps: [
        ['request', 1], ['codex', 2], ['workflow', 3], ['bridge', 4], ['validators', 5], ['da', 6], ['consumer', 7]
      ]
    },
    failure: {
      title: '验收失败，返回原任务',
      summary: '项目验收发现当前候选不符合要求，反馈经 Bridge Kit 送回原 Codex，修复后重新检查。',
      next: '下一位接收者：当前 Codex',
      nodes: ['request', 'codex', 'bridge', 'da', 'validators'],
      edges: ['request-codex', 'codex-bridge', 'codex-da', 'bridge-da', 'codex-validators', 'validators-da', 'da-bridge-failure', 'bridge-codex-failure'],
      steps: [
        ['request', 1], ['codex', 2], ['validators', 3], ['da', 4], ['bridge', 5]
      ]
    },
    regression: {
      title: '新修复破坏旧功能',
      summary: '新增用例通过，但原有功能出现回归；候选不能交付，修复仍回到原任务。',
      next: '下一位接收者：当前 Codex',
      nodes: ['request', 'codex', 'bridge', 'baseline', 'da', 'validators'],
      edges: ['request-codex', 'codex-bridge', 'codex-da', 'baseline-da', 'codex-validators', 'validators-da', 'da-bridge-failure', 'bridge-codex-failure'],
      steps: [
        ['request', 1], ['baseline', 2], ['codex', 3], ['validators', 4], ['da', 5], ['bridge', 6]
      ]
    }
  }
};

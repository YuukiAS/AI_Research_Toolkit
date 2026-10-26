const storyData = {
  normal: {
    tone: "normal",
    consequence: "<strong>正常完成：</strong>同一发布候选通过项目正常入口和独立复核，证据覆盖新要求与相邻旧行为，才允许写“可交付”。",
    stages: [
      {status:"设计机制", statusClass:"evidence-design", title:"先固定“正在验收哪一个候选”", summary:"记录来源提交、构建产物、运行实例和任务承诺。后续任何源码变化都使旧复核失效，避免拿旧截图签发新版本。", input:"原任务、确切提交、Windows 发布候选、必须保护的既有行为", action:"Bridge 只提供任务身份和合法运行接点；Delivery Assurance 绑定验收对象与承诺", output:"同一候选的身份记录，交给项目验证和独立复核消费", falsify:"提交、构建、进程或截图来自不同候选；或者身份无法从正常入口取得"},
      {status:"设计机制", statusClass:"evidence-design", title:"把自然语言承诺变成不可降级的义务", summary:"本例不是“修一下状态显示”，而是三项可证伪要求：检查中不误报、确认故障仍提示、已有可用入口不回退。", input:"用户目标、项目正式约定、已接受的旧行为", action:"DA 提取当前改动必须证明的新行为和相邻旧行为；标准不清时退回专业负责人", output:"具名验收义务及其证据要求，交给项目验证入口", falsify:"只测新函数、不写旧行为；把备用路径可用当成原承诺的等价替代"},
      {status:"部分已有", statusClass:"evidence-source", title:"项目自己判断领域事实是否正确", summary:"Lucerna 的发布构建、状态映射、确定性回归和真实窗口观察仍由 Lucerna 负责；DA 不临场发明较弱标准。", input:"同一候选、项目专业规则、确定性 fixture 与正常发布入口", action:"运行源码检查、构建、真实应用状态、按钮和跨状态回归", output:"原始结果与观察证据，交给 DA 和独立复核", falsify:"只运行 fixture 或旧构建；跳过的门槛仍被写成通过；进程与构建身份不一致"},
      {status:"合同已有", statusClass:"evidence-source", title:"由没有实施该候选的新鲜复核者观察成品", summary:"复核者使用相同提交和发布候选，自行检查整个面板、状态语义和相邻旧功能。源码一旦变化，必须启动新的复核回合。", input:"冻结候选、项目验收结果、独立复核规则", action:"独立观察正常、检查中、确认故障和可用入口；记录自己取得的截图与结果", output:"具名发现或独立通过结果，交给 DA", falsify:"Producer 自评冒充独立复核；截图不是同一候选；只看局部函数不看用户表面"},
      {status:"尚未接通", statusClass:"evidence-missing", title:"只有证据完整时才允许升级交付声明", summary:"DA 核对义务、项目结果、独立结果和候选身份。任何必需结果缺失、失效或版本不一致，都保持“未通过”。", input:"义务清单、同一候选的项目证据与独立证据", action:"按风险判定当前允许声明“设计完成”“源码有支持”或“产品可交付”中的哪一层", output:"放行结论进入最终用户说明；缺口进入原任务修复", falsify:"设计评审被升级成生产通过；测试退出码被升级成可用；缺证仍显示绿色"}
    ]
  },
  failure: {
    tone: "failure",
    consequence: "<strong>发现失败：</strong>若真正故障仍显示正常，或检查中仍被写成不可用，DA 返回具体状态、期望、证据和受影响义务；原 Codex 修复后必须生成新候选并重新复核。",
    stages: [
      {status:"设计机制",statusClass:"evidence-design",title:"先固定失败发生在哪一个候选",summary:"失败记录必须绑定提交、构建和运行实例，避免修复者面对无法重现的抽象意见。",input:"确切候选身份和原任务",action:"记录触发状态、实际表现和观察证据",output:"可重放的失败包，交给原任务",falsify:"只有“测试失败”四个字；没有状态、候选或证据"},
      {status:"设计机制",statusClass:"evidence-design",title:"指出被违反的是哪一项承诺",summary:"错误必须落在具名义务上：检查中不误报、确认故障仍提示，或已有可用入口不回退。",input:"失败包和义务清单",action:"对齐实际、期望和影响范围",output:"一项或多项明确未满足义务",falsify:"临时把较弱结果改写成正式标准"},
      {status:"真实项目入口",statusClass:"evidence-source",title:"项目验证提供原始观察，不替 DA 下结论",summary:"Lucerna runner 和复核证据说明哪个状态错了；它们不单独证明全部交付承诺都已覆盖。",input:"实际状态、UI、回归和发布候选",action:"运行对应状态与相邻旧行为的验证",output:"失败证据或缺证事实",falsify:"把跳过、缺失或无法运行写成绿色"},
      {status:"合同已有",statusClass:"evidence-source",title:"独立复核确认失败不是 Producer 自己的解释",summary:"新鲜复核者从正常用户表面观察同一缺陷，并注明可能的共享根因。",input:"同一候选和失败场景",action:"复现并记录完整界面语义",output:"独立发现包",falsify:"复核者继承 Producer 的通过结论或使用另一个构建"},
      {status:"尚未接通",statusClass:"evidence-missing",title:"失败必须回到原任务，而不是停在报告里",summary:"DA 产生机器和人都能消费的缺口；workflow-core 选择原任务接收者；Bridge 只负责把结果送到仍存活的执行回合。",input:"具名失败、原任务身份和可用执行入口",action:"阻止交付并递送修复工作；源码变化后废止旧通过",output:"原 Codex 继续修复，随后重建、重验和新鲜复核",falsify:"报告文件存在但无人消费；要求用户手工搬运；旧复核继续签发新源码"}
    ]
  },
  regression: {
    tone: "protection",
    consequence: "<strong>旧功能保护：</strong>本次只改状态语义，也必须证明主要访问入口、详情开合和刷新稳定性仍然成立；新功能通过但旧入口损坏，仍是交付失败。",
    stages: [
      {status:"设计机制",statusClass:"evidence-design",title:"从改动边界向外找相邻旧行为",summary:"状态聚合会影响标题、折叠摘要、详情和恢复动作；因此验收不能只盯新增判断函数。",input:"改动文件、依赖边和已接受旧行为",action:"形成新要求与相邻旧能力的最小保护集",output:"旧功能回归范围",falsify:"只按文件名猜影响；关键消费者没有进入范围"},
      {status:"设计机制",statusClass:"evidence-design",title:"把“保持可用”写成可观察结果",summary:"2/3 访问路径可用时，整体仍应 Available；次级未观测不升级故障；确认次级失败才进入 attention。",input:"历史可接受行为和专业语义",action:"定义正例、反例与边界状态",output:"可执行的保护义务",falsify:"只写“不要破坏旧功能”而没有状态与预期"},
      {status:"源码已有",statusClass:"evidence-source",title:"确定性回归先检查共享状态机制",summary:"现有测试覆盖未观测、检查中、确认监听缺失和重复刷新不抖动；它是必要证据，但仍不是完整 Windows 成品。",input:"状态 fixture 和展示映射",action:"运行共享机制回归并检查消费者使用统一 presentation model",output:"源码层保护结果",falsify:"测试只断言字符串存在，或前端仍绕过统一映射"},
      {status:"仍待复验",statusClass:"evidence-missing",title:"在同一正式候选上检查真实旧入口",summary:"必须用当前 Windows release 观察可用入口、详情开合、刷新和跨状态表现，不能用旧 PID 或开发模式替代。",input:"当前正式候选和跨状态矩阵",action:"独立操作正常入口并取得自己拥有的证据",output:"旧功能保持或具体回归缺陷",falsify:"只看截图、不操作；fixture 代替正式候选；截图与源码身份不一致"},
      {status:"尚未接通",statusClass:"evidence-missing",title:"旧功能失败与新功能失败拥有同等阻断力",summary:"DA 不因为本次目标是“修状态”就降低旧入口的权重；任何受影响的已接受行为失效，都返回原任务。",input:"新要求和旧功能结果",action:"统一交付准入并保持候选身份",output:"通过，或带回归范围的修复任务",falsify:"新测试绿色就忽略旧入口损坏"}
    ]
  }
};

const components = {
  "delivery-assurance": {role:"交付判断",title:"Delivery Assurance",status:"拟建插件",statusClass:"evidence-proposed",purpose:"把原始承诺转成不可降级的验收义务，判断当前候选还缺什么证据，以及此刻允许作出怎样的交付声明。",trigger:"正式软件交付、重要集成变化、首个真实纵向功能和最终候选",input:"用户确认目标、项目正式约定、已接受旧行为、当前候选的项目验收结果",output:"缺口交给原 Codex 继续修复；放行结论交给最终用户说明",failure:"标准不清则返回专业负责人补齐；证据缺失或版本不一致则保持未通过",removal:"项目可能各自有测试，但没有一方负责证明“所有承诺都被当前候选覆盖”，绿色局部结果仍可被扩大成产品完成。",notdo:"不编写项目领域测试，不接管 Codex，不负责插件路由，也不创建新的常驻调度器。"},
  "workflow-core": {role:"能力路由",title:"workflow-core",status:"已有能力，增强待证",statusClass:"evidence-source",purpose:"从当前宿主实际可用的能力中选择必要组合，安排顺序，并确认每项输出确实被下游消费。",trigger:"需要跨领域、跨技能或正式交付保障的复杂任务",input:"用户意图、已安装能力、领域入口、每项输出的预期消费者",output:"有界路线和实际消费状态，交给当前执行者与 Delivery Assurance",failure:"能力缺失时如实暴露，不把路由建议文件当成已调用；简单任务不启动重型流程",removal:"用户或 Codex 需要手工拼装插件；已有技能可能从未加载，审查结果也可能无人接收。",notdo:"不裁决科研或 UI 专业事实，不拥有成品内容取舍，也不作正式交付放行。"},
  "bridge-kit": {role:"运行底层",title:"Bridge Kit",status:"已有能力，DA 接点待证",statusClass:"evidence-source",purpose:"提供任务身份、合法启动、权限、工作树、现有恢复能力和结果递送，让上层结论能绑定真实执行对象。",trigger:"任务需要受管运行、身份核对、权限操作或向活跃执行回合递送结果",input:"冻结任务合同、仓库与工作树身份、受支持宿主入口",output:"运行身份、事件和回执，交给 workflow-core、DA 与原任务",failure:"原流程已退出时保存诚实恢复点；文件存在但无人消费不算恢复",removal:"验收结论无法可靠绑定实际进程与候选，失败也可能停在文件里。",notdo:"不选插件、不写验收标准、不审 UI、不判断产品完成。"},
  "project-validation": {role:"专业事实",title:"项目验收入口",status:"各项目部分已有",statusClass:"evidence-source",purpose:"按项目自己的领域标准检查真实产物，例如 Windows 发布应用、移动端数据持久化或统计结果。",trigger:"候选实现已产生，或 DA 发现某项承诺需要专业证据",input:"当前候选、项目 runner、真实设备/环境、专业预期",output:"原始结果与观察，供 DA 判定承诺是否有证据",failure:"缺少正式标准时暴露标准缺口；缺测试时由原 Codex 补齐",removal:"DA 只剩通用规则，无法知道 UI、数据库、数学结果或发布包是否真的正确。",notdo:"不单独决定所有交付承诺是否完整，也不把自己的一次绿色结果扩大成产品可用。"},
  "independent-review": {role:"独立观察",title:"新鲜复核者",status:"Lucerna 合同已有，当前候选待跑",statusClass:"evidence-source",purpose:"由没有实施该候选的新鲜上下文观察用户表面，降低 Producer 自我验证、局部测试和视觉盲点。",trigger:"高风险设计、正式产品最终候选或项目明确要求独立复核",input:"冻结候选、只读审查合同、可操作的真实产物",output:"自己取得的发现与证据，交给 DA 和原任务",failure:"无法启动时先走有界本地替代；没有独立证据就保持未通过",removal:"实现者可以用自己的假设解释自己的实现，视觉、交互和状态矛盾更容易被遗漏。",notdo:"不常驻参与每个小任务，不继承 Producer 结论，不自行修改候选。"},
  "reasoned-design": {role:"方案依据",title:"Reasoned Design",status:"拟建插件",statusClass:"evidence-proposed",purpose:"在实施前形成可被追问的完整方案，区分事实、用户决定、假说、建议和未决信息。",trigger:"重大方案、需求仍不完整、取舍影响长期架构或用户提出有效质疑",input:"原始目标、真实使用链、成熟替代、源码与一手证据",output:"有依据的方案与待证项，交给领域负责人、workflow-core 和 DA",failure:"证据不足时允许暂缓，不因为必须给答案而捏造确定性",removal:"设计容易局部拼补，用户每指出一个遗漏才追加一条路线图。",notdo:"不写专业测试阈值，不授权 Codex 实施，也不把过去助理表态升级成用户决定。"},
  "artifact-curation": {role:"内容取舍",title:"Artifact Curation",status:"拟建共享技能",statusClass:"evidence-proposed",purpose:"逐项判断文字、图、卡片、标签、按钮和交互是否帮助读者理解、判断或操作，删掉无价值元素并保留必要细节。",trigger:"制作网页、文档、幻灯片、图像或其他读者可见成品",input:"用户目标、受众、媒体、专业语义和候选作品",output:"保留、删除、合并、转移或补足的编辑决定，交给原制作端",failure:"与领域正确性冲突时由领域和用户明确要求优先；不打印内部审查记录污染成品",removal:"页面会堆满卡片、流程图、内部编号和装饰，面积与注意力不再对应信息价值。",notdo:"不负责语言润色，不为了留白删除必要按钮、公式、安全说明或用户明确要求。"},
  "clear-writing": {role:"读者表达",title:"Clear Writing",status:"已有能力",statusClass:"evidence-source",purpose:"在事实和内容取舍已确定后，安排理解顺序、自然中文和文稿保真，让读者不必解码内部工程语言。",trigger:"需要用户可读说明、正式文稿、页面文案或结果汇报",input:"已经核实的事实、证据强度和保留内容",output:"自然、完整且不改变事实等级的文字，交给用户或目标产物",failure:"无法控制的平台 UI 不冒充已拦截；机器内容按合同原样保留",removal:"即使架构正确，读者仍会看到内部状态词、路径、模板化辩护和过量过程说明。",notdo:"不替 Reasoned Design 作方案，不替 Artifact Curation 决定元素存在，也不改变完成程度。"}
};

let activeStory = "normal";
let activeStage = 0;

function renderStory() {
  const story = storyData[activeStory];
  document.querySelectorAll("[data-story-tab]").forEach((button) => {
    button.setAttribute("aria-selected", String(button.dataset.storyTab === activeStory));
  });
  document.querySelectorAll("[data-stage]").forEach((button, index) => {
    button.classList.toggle("is-active", index === activeStage);
  });
  const stage = story.stages[activeStage];
  document.querySelector("[data-stage-index]").textContent = `${String(activeStage + 1).padStart(2,"0")} / 05`;
  const status = document.querySelector("[data-stage-status]");
  status.textContent = stage.status;
  status.className = `evidence-label ${stage.statusClass}`;
  document.querySelector("[data-stage-title]").textContent = stage.title;
  document.querySelector("[data-stage-summary]").textContent = stage.summary;
  document.querySelector("[data-stage-input]").textContent = stage.input;
  document.querySelector("[data-stage-action]").textContent = stage.action;
  document.querySelector("[data-stage-output]").textContent = stage.output;
  document.querySelector("[data-stage-falsify]").textContent = stage.falsify;
  const consequence = document.querySelector("[data-story-consequence]");
  consequence.dataset.tone = story.tone;
  consequence.querySelector("p").innerHTML = story.consequence;
}

function renderComponent(id) {
  const item = components[id] || components["delivery-assurance"];
  document.querySelectorAll("[data-component]").forEach((button) => {
    button.setAttribute("aria-selected", String(button.dataset.component === id));
  });
  document.querySelector("[data-component-role]").textContent = item.role;
  document.querySelector("[data-component-title]").textContent = item.title;
  const status = document.querySelector("[data-component-status]");
  status.textContent = item.status;
  status.className = `evidence-label ${item.statusClass}`;
  document.querySelector("[data-component-purpose]").textContent = item.purpose;
  document.querySelector("[data-component-trigger]").textContent = item.trigger;
  document.querySelector("[data-component-input]").textContent = item.input;
  document.querySelector("[data-component-output]").textContent = item.output;
  document.querySelector("[data-component-failure]").textContent = item.failure;
  document.querySelector("[data-component-removal]").textContent = item.removal;
  document.querySelector("[data-component-notdo]").textContent = item.notdo;
  try {
    const url = new URL(location.href);
    url.searchParams.set("component", id);
    if (location.protocol !== "about:") {
      history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    }
  } catch {
    // The design stays usable in sandboxed preview documents with an opaque origin.
  }
}

document.querySelectorAll("[data-story-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    activeStory = button.dataset.storyTab;
    activeStage = 0;
    renderStory();
  });
});

document.querySelectorAll("[data-stage]").forEach((button) => {
  button.addEventListener("click", () => {
    activeStage = Number(button.dataset.stage);
    renderStory();
  });
});

document.querySelectorAll("[data-component]").forEach((button) => {
  button.addEventListener("click", () => renderComponent(button.dataset.component));
});

const params = new URLSearchParams(location.search);
const initialComponent = params.get("component") || "delivery-assurance";
renderStory();
renderComponent(components[initialComponent] ? initialComponent : "delivery-assurance");

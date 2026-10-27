'use strict';
// 唯一语义源。编辑决定由作者逐条写入；构建程序只序列化，不评判语言质量。
const copy = {}, audit = [];
function c(id, text, original, decision, reason, source='设计决定') {
  if(copy[id]!==undefined) throw Error('duplicate copy '+id);
  copy[id]=text; audit.push({id,original:original||'新稿，无对应旧句',decision:decision||'保留',final:text,reason,source}); return id;
}
const sources={
  current:{label:'当前职责方案',url:'https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md'},
  roadmap:{label:'实施路线图',url:'https://github.com/YuukiAS/AI_Skills_Collection/blob/design/ai-reliability-architecture-20261026/docs/design/ai-reliability-architecture/ROADMAP.md'},
  history:{label:'Lucerna 历史修复记录',url:'https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/results/01054_final_independent_release_acceptance/repair-product-001.md'},
  code:{label:'状态处理源码',url:'https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/src/longleaf-presentation.ts#L44'},
  tests:{label:'已有状态回归',url:'https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/scripts/test-longleaf-presentation.mjs'},
  acceptance:{label:'Lucerna 独立验收要求',url:'https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/docs/workflows/LUCERNA_INDEPENDENT_RELEASE_ACCEPTANCE.md'},
  contract:{label:'原研究：检查与返修',url:'https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md'},
  costs:{label:'原研究的投入估算',url:'https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/06_IMPLEMENTATION_AND_EVALUATION.md'},
  status:{label:'旧 DA 研究状态',url:'https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/software-production-decision-20261013/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/CURRENT.md'}
};
Object.entries(sources).forEach(([k,v])=>v.copy=c('source.'+k,v.label,null,'保留','链接名说明能核对什么，完整路径留在链接目标。',v.url));
const ui={};
function u(key,text,old,decision,reason,source){ui[key]=c('ui.'+key,text,old,decision,reason,source)}
u('title','Delivery Assurance','交付之前，先证明它做到了。','重写','标题只保留系统名称，删除没有解释机制的口号。');
u('heading','交付验收怎样工作',null,'保留','页眉已经给出英文名称；主标题补充中文含义，避免连续重复品牌。');
u('intro','交付前核对原始要求、当前成品和受影响的旧功能。发现问题后，由原 Codex 继续修复。','把原始要求、旧功能和当前成品的证据连起来。发现问题后，交回原任务修复，减少你亲自找错、催验收的工作。','重写','说清检查对象和修复者，去掉对读者的营销承诺。','current');
u('status','拟议架构，尚未接入生产任务','设计有依据，生产能力尚未成立','重写','用普通状态说明限制，只在页首集中出现一次。','current,status');
u('navGraph','系统架构','任务怎样被接住','重写','导航准确指向完整架构，不用拟人化隐喻。');
u('navCase','Lucerna 示例','一次交付','重写','直接标明案例对象。');
u('navEvidence','依据与取舍','证据账本','重写','避免账本隐喻，包含可信度和是否值得做两项判断。');
u('skip','跳到架构图',null,'保留','键盘用户可以跳过顶部导航。');
u('graphTitle','系统架构',null,'保留','图有独立标题，截图和辅助技术均能辨认。');
u('hint','点选组件或连线查看详情',null,'保留','提示可点击的对象，避免只把图当图片。');
u('all','全部关系',null,'保留','恢复全貌，清除场景与选择。');
u('existing','已有程序路径',null,'保留','图例解释实线，不能被理解为本轮运行成功。');
u('proposed','拟新增接线',null,'保留','虚线明确尚未实现的连接。');
u('optional','按需使用的专业能力',null,'保留','此分组的四项能力并非每项任务必经。','current');
u('runGroup','原任务中的执行与协作',null,'保留','说明这些职责不等于多个常驻服务。','current');
u('projectGroup','项目验收与交付',null,'保留','把项目正确性与公共判断分开。','current');
u('need','为什么需要',null,'保留','对应组件的存在理由。');
u('input','接收什么',null,'保留','节点和边详情中的输入。');
u('output','交给谁',null,'保留','明确下游消费者。');
u('remove','去掉以后',null,'保留','让读者判断组件是否多余。');
u('now','目前情况',null,'保留','状态跟随具体组件，避免总绿灯。');
u('basis','来源',null,'保留','按需核对事实。');
u('close','关闭详情',null,'保留','手机弹层有可见且可键盘操作的关闭按钮。');
u('edgePayload','传递内容',null,'保留','边详情必须给出实际信息，不能只写协作。');
u('edgeConsumer','接收与后续动作',null,'保留','说明箭头另一端如何使用结果。');
u('edgeState','接线情况',null,'保留','程序存在与新调用是否接通分别说清。');
u('previous','上一步',null,'保留','手动检查顺序，避免自动播放。');
u('next','下一步',null,'保留','按步骤追踪证据和消费者。');
u('stepFormat','第 {n} / {total} 步',null,'保留','有限场景位置，数字随真实步数变化。');
u('storyNote','以下是按方案推演的三种结果，采用同一个 Lucerna 状态修复任务。',null,'保留','区分设计推演与真实历史，放在场景入口。','history,current');
u('idleTitle','从原任务到交付',null,'保留','默认面板给出读图入口。');
u('idleBody','上方是实现与项目检查，中间是检查安排和交付判断，下方是反馈与交付出口。选择一种结果，可以逐步查看证据如何传递。',null,'保留','空间定位帮助第一次读图，不复述所有组件职责。');
u('noScript','交互需要启用 JavaScript；架构图、案例和依据仍可阅读。',null,'保留','无脚本时准确说明能力边界。');
u('caseTitle','Lucerna 的状态误报',null,'保留','标题指出具体问题，删除栏目包装。','history');
u('caseP1','Lucerna 曾在三条访问路线中已有两条可用、另一条仍在检查时，把整体显示为故障。原因是部分辅助状态还没有观察结果，却被当作已确认的故障处理。',null,'保留','先说明用户会看到什么，再解释原因；历史限定保留。','history');
u('caseP2','修复需要保留两种区别：尚未查明的状态不能报故障，已经确认的故障仍要提醒。历史修改已补入状态回归，但该轮没有重新构建和启动 Windows 正式版本，也没有完成新的独立界面验收。',null,'保留','把有效修复方向与直接限制放在一起，不拆成重复免责声明。','history,code,tests');
u('tableObs','观察到的情况',null,'保留','对照的输入列。');
u('tableExpected','应有表现',null,'保留','对照的结果列。');
u('row1obs','两条路线可用；Tailscale 检查中；辅助状态未观测',null,'保留','保留真实案例条件，不能压成所有未知都健康。','history');
u('row1result','整体保持可用，未查明的部分单独说明。',null,'保留','部分可用与未知并存，不将未知写成故障或全部健康。','history');
u('row2obs','已确认次级服务故障',null,'保留','已有回归的反例条件。','history,tests');
u('row2result','提示需要处理；不把故障隐藏为正常。',null,'保留','否定在这里防止具体错误，并非装饰性对偶。','history,tests');
u('row3obs','本次状态修复正确，但原来可用的入口打不开',null,'保留','明确构造旧功能回归，不暗示历史真实发生。','current；设计反例');
u('row3result','仍需返修，并重新验证受影响的旧入口。',null,'保留','解释旧保护为什么不是附加可选项。','current,contract');
u('row3note','最后一行是本原型构造的旧功能回归情境。',null,'保留','该限定必须与表同屏。');
u('evidenceTitle','已有依据与待验证环节','证据账本——相信到哪一步，只由证据类型决定','重写','删掉宣言，把具体证据和仍缺什么直接呈现。');
u('evidenceP','源码可以解释某个判断为何改变，运行记录才能说明当次成品怎样表现。图中涉及 DA 的新接线还需要从正常任务入口验证。',null,'保留','三类证据的差异只用一个连接段，不再重复多张状态卡。','current,history');
u('e1title','Lucerna 的源码与定向回归',null,'保留','证据对象明确。','history');
u('e1body','历史修复把未观测状态排除在已确认故障之外，并让标题、摘要和详情使用一致的状态解释。记录报告了定向测试通过，不能据此推断修改后的 Windows 窗口已经验收。',null,'保留','保留局部成果及未做的原生验收，不虚报当前运行。','history,code,tests');
u('e2title','旧研究与当前职责调整',null,'保留','新旧架构归属必须解释。','current,status');
u('e2body','旧 DA 研究的第三轮设计结论为通过，由用户转交；原图将部分交付判断放在 workflow-core 和 Bridge。当前方案把这项责任交给独立的 Delivery Assurance，workflow-core 负责组合能力，Bridge 保持运行底层。新的分工仍是方案。',null,'保留','不把旧设计通过扩展为新架构已审或已实现。','current,status');
u('e3title','反馈能否到达原 Codex',null,'保留','最关键的未证连接。','contract');
u('e3body','要观察到原任务收到具体失败、在原权限与预算内修复，并交回新版本的检查结果。仅生成报告或记录“已发送”不够；任务已退出、取消或无权限时，应保留原任务恢复位置，等待合法继续。',null,'保留','接收、处理和修复结果分开；停止边界不藏在页脚。','contract');
u('e4title','检查程序也可能判断错',null,'保留','解释验证器可信性，避免测试自签。','contract');
u('e4body','新补的检查要先能区分正确实现、故意错误、旧功能回归和证据缺失。专业标准由项目确定；涉及新的重要标准或观察方法时，需要独立核对。不能同时放松产品要求和测试答案来获得通过。',null,'保留','说明具体校准与权威，不用“证据可信”空判断。','contract,current');
u('choiceTitle','先验证最小一条交付链',null,'保留','读者据此判断下一步投入。');
u('choiceP','先试一个 Lucerna 任务：正确版本能交付，掩盖故障和破坏旧入口的版本会被拒绝，漏跑检查也不能通过。失败应回到原 Codex，修复后重新核对版本与结果。宿主不能可靠传回失败，就先停止扩展自动返修。',null,'保留','给出可否决试验，避免先铺七仓。','roadmap,contract');
u('alternative','更轻的选择是只加固各项目已有测试。若共享 DA 没有减少漏检、催验收或搬运报告，就撤去新增层，保留有效的项目回归。',null,'保留','最强替代和停止条件直接影响选择，必须留在正文。','costs,roadmap');
u('costP','旧方案估计：宿主探针 4–8 小时，首个完整试点 40–88 小时，七仓全量 138–332 小时。三个范围逐级包含，不能相加；这是当时的工程估算，并非已花工时或新分工的预算。',null,'保留','数值和包含关系均不可弱化。','costs');
u('costNote','估算不含等待外部审查、设备和账号，也不含新的科学训练。',null,'保留','放在数字旁，防止误读成本范围。','costs');
u('footer','资料核对：2026-10-26',null,'保留','来源具有时间边界，更新时可核对。');
u('graphLink','查看架构模型',null,'保留','实现者可追溯图中每条关系，置于页尾。');
u('viewSources','查看原始资料',null,'保留','折叠中的短链接组标题。');

const nodes=[];
function node(id,title,role,why,input,output,remove,status,source,kind='component'){
 const item={id,source,kind};
 for(const [k,v] of Object.entries({title,role,why,input,output,remove,status})) item[k]=c('node.'+id+'.'+k,v,null,'保留',({title:'准确命名图中对象。',role:'一句短语区别相邻组件职责。',why:'说明已有组件无法代替的具体作用。',input:'输入与来源能沿图追踪。',output:'明确实际或拟议消费者。',remove:'删除后的能力损失是组件准入理由。',status:'区分已有实物、拟建能力和未验证接线。'})[k],source);
 nodes.push(item); return item;
}
node('user','用户','从原任务提出要求','系统要保留用户原话，避免后续只对照执行者自己的摘要。','用户目标、已确认的产品要求及授权。','当前 Codex 接收请求；用户最终取得与本次版本相符的结果。','没有原始要求，就无法判断实现有没有被悄悄降级。','正常输入入口已有；通过该入口自动触发 DA 尚未验证。','current,contract','actor');
node('codex','当前 Codex','实现、补测与返修','需要有一个持续承担原任务的执行者，真正修改产品并处理失败。','原请求、workflow-core 的能力安排、失败的实际与预期结果。','生成当前成品，运行项目检查；收到反馈后修复，并提交新的验证结果。','即使检查发现错误，也没有执行者把错误修掉。','Codex 与项目执行流程已有；DA 反馈的同任务消费仍待接通。','current,contract');
node('artifact','当前成品','源码、构建与运行对象','检查必须针对本次要交付的版本，避免用旧截图说明新代码。','当前 Codex 的修改及本次构建。','项目验收和独立审查按同一版本观察成品。','无法确定证据检查了哪个版本，测试和实际软件可能各对一半。','项目已有成品和版本记录；跨环节身份核对是 DA 待实现的要求。','contract,acceptance','artifact');
node('validator','项目专业验收','按项目标准观察成品','界面状态、数据和用户动作是否正确，需要项目自己的标准与检查程序判断。','本次成品、已冻结标准、正确与错误对照，以及受影响的旧功能。','原始观察和逐项结果由当前 Codex 取得，交给 DA 核对覆盖范围。','DA 无从判断业务是否正确，只剩文件和状态码。','Lucerna 已有状态测试与原生验收入口；本轮没有运行 Lucerna。','history,tests,acceptance');
node('baseline','批准的要求','包含已接受的旧行为','新功能符合要求时，原来正常的入口也可能被改坏；检查范围必须包含两者。','原请求、项目正式标准、已接受版本和变更前后的依赖。','DA 据此选择应验行为；未知依赖保留为缺口，不能当作无影响。','只按已有测试倒推目标，会漏掉未写测试的要求和旧功能。','标准和历史记录已有；DA 的提取、影响分析与消费属于设计。','current,contract','artifact');
node('workflow','workflow-core','选择能力，安排检查','复杂任务常需要多个专业能力，还要确认它们的结果有人使用。','原任务目标、当前可加载的技能、DA 所需检查与返回结论。','把执行安排交给当前 Codex；需要返修时，确定原任务接收者并使用 Bridge 的既有通道。','技能可能没被用到，检查结果也可能停在报告里。','已有流程规范；多插件消费确认与 DA 接线仍待实测。','current,roadmap');
node('da','Delivery Assurance','确定验收范围与交付结论','单项测试通过不能说明原始要求和受影响旧功能都已满足。','批准要求、旧行为、本次版本身份、项目验收与必要的独立结果。','检查安排交给 workflow-core；通过范围交给交付入口，失败及缺证交回原工作流。','局部绿色结果仍可能被扩大为“整个产品已完成”。','拟新增独立插件。旧研究通过的是设计，尚无本图整条生产路径的运行证据。','current,status');
node('review','独立审查','按风险核对标准或成品','实现者可能用自己的错误假设解释自己的结果，需要时由独立观察补足。','原始要求、项目标准、同一待交付版本及可操作的成品。','自己取得的观察或发现交给 DA；当前 Codex 根据具体问题返修。','高风险标准和完整成品可能只剩实现者自查，盲点没有被复核。','Lucerna 有独立审查合同；是否必需取决于任务，不能把所有小改都升级审查。','current,acceptance');
node('bridge','Bridge Kit','身份、运行、反馈与恢复','反馈要找到正确的原任务，运行和恢复也必须遵守已有权限与预算。','原任务身份、合法运行请求、workflow-core 指定的反馈接收者。','身份与运行回执交回工作流；失败递送到原 Codex，退出后保留原恢复位置。','可能把证据绑定到错误任务，或把无人接收的文件当作已返修。','基础设施已有。DA 钩子、精确回传与各宿主能力必须分别验证。','current,contract');
node('delivery','受管交付入口','核对结论后接受成品','即使普通聊天漏跑检查，实际交付入口仍需拒绝缺证或错版本的结果。','DA 的当前结论、成品身份和允许声明的范围。','把本次可交付的成品与结果交给用户；缺证时保留未完成状态。','Codex 可能绕过检查直接交出结果，旧报告也可能被重复使用。','项目入口已有；接入 DA 的末端核验尚未实现。不承诺撤回已发出的聊天文字。','contract,current');
node('reasoned','Reasoned Design','方案与判断依据','重要方案需要比较可行替代，并主动查找入口、异常和旧功能的遗漏。','原始目标、专业事实、成熟方案与用户已确认的决定。','有依据的方案交给当前 Codex 和领域负责人；批准后的要求才进入 DA。','可能在遗漏需求的方案上继续实现，再靠用户逐项纠正。','拟新增插件；本例的固定状态修复不以它为必经步骤。','current','optional');
node('curation','Artifact Curation','内容取舍','文字、图形和交互都占用注意力，需要判断它们是否帮助理解或操作。','受众、目标、专业语义和候选作品。','取舍意见由原制作端执行，保留文字再交给 Clear Writing。','无用卡片、口号和解释可能不断累积，必要信息反而不显眼。','拟建共享 Skill；这里采用其目标原则，不声称已安装该能力。','current','optional');
node('writing','Clear Writing','自然表达与保真','技术事实需要按读者的理解顺序表达，同时保留限制和责任。','已经核实的事实、需要保留的内容及界面位置。','原制作端使用修订后的文字，并检查完整页面。','读者可能被内部术语和模板句式挡住，或误解完成程度。','已有插件；加载规则不能单独证明整页文字质量。','current','optional');
node('domain','领域技能','专业制作与判断','科学、界面、文稿等工作各有不同的正确性要求。','任务相关资料、项目约定和专业标准。','当前 Codex 使用相应技能制作作品；专业标准用于项目验收。','通用流程无法判断具体作品在其领域是否正确。','已有多种专业插件；按任务选择，并核查当前环境是否实际可用。','current','optional');

const edges=[];
function edge(id,from,to,label,payload,consumer,status,source,existing=false,both=false){
 const item={id,from,to,existing,both,source};
 for(const [k,v] of Object.entries({label,payload,consumer,status}))item[k]=c('edge.'+id+'.'+k,v,null,'保留',({label:'线上只显示有辨识力的动作或载荷。',payload:'解释这条连接实际携带的信息。',consumer:'点名下游和消费条件，不能用箭头自证。',status:'区分已有程序路径与待实现接点。'})[k],source);
 edges.push(item);
}
edge('request','user','codex','请求','用户原话及当前任务上下文；产品授权仍沿原入口。','当前 Codex 保留原请求并核对项目约定。','已有正常对话入口；这不代表 DA 已自动触发。','current',true);
edge('authority','user','baseline','确认范围','用户已批准的要求；旧行为还需引用项目正式标准与已接受版本。','DA 读取有来源的要求，不把当前代码默认当作正确基线。','来源材料已有；接入 DA 属于设计。','current,contract');
edge('route','codex','workflow','能力与安排','当前 Codex 提供目标与所需工作；workflow-core 返回技能组合、顺序和结果接收者。','仍由当前 Codex 实际读取技能并执行；路线说明本身不是已调用证据。','已有流程规范；完整的多技能消费确认待验证。','current',false,true);
edge('build','codex','artifact','构建','本次源码、构建物及对应运行对象的身份。','项目检查使用本次成品；代码修改后重新取得受影响的证据。','项目开发与构建已有；本轮只做网站原型。','history,acceptance',true);
edge('subject','artifact','validator','本次版本','当前待交付的应用、构建身份和运行实例。','项目验收对该对象操作和取证，拒绝旧进程或其它版本的截图。','Lucerna 验收合同已有身份要求；不代表当前候选已运行。','acceptance',true);
edge('run','codex','validator','运行检查','应验行为、对应项目检查入口、当前成品和原授权范围。','原项目运行器产生真实观察；缺程序由原 Codex 补足，缺标准交专业负责人。','项目检查调用已有；DA 选择检查的新增部分未接通。','contract,tests',true);
edge('evidence','validator','da','观察与结果','每项要求的实际值、预期值、原始证据、标准版本与成品身份；缺失也须保留。','当前 Codex 取得项目结果，再提交 DA；DA 核对范围和身份，不重新裁决专业事实。','拟新增结果适配与 DA 消费；图示不是已运行证明。','current,contract');
edge('scope','baseline','da','要求与旧行为','批准要求、已接受旧行为、变化前后依赖及尚不能解析的关系。','DA 选择必需检查；未知影响不能用“所有现有测试通过”消除。','影响分析与义务提取是待实现设计。','contract,current');
edge('check','workflow','da','检查与结论','workflow-core 提供任务和证据引用；DA 返回应验范围、缺口及允许交付的范围。','workflow-core 把所需工作交给原 Codex，并将结果送到指定消费者。','独立 DA 与 workflow-core 的双向接线尚未实施。','current',false,true);
edge('commission','workflow','review','按需委托','需要独立核对的原要求、标准或成品，以及具体合法调用方式。','项目已有审查角色自行观察并返回结果；未启动或无人接回时保持未证。','按风险选择；DA 与既有审查通道的调用仍需实测。','current,contract');
edge('reviewResult','review','da','独立结果','独立取得的观察、发现、证据引用，以及确切受审版本。','DA 核对本次所需独立证据；新源码不能继续使用旧版本的通过结论。','项目合同存在；本图结果消费属于拟议接线。','acceptance,current');
edge('transport','workflow','bridge','身份与反馈','工作流请求原任务身份与运行能力；返修时提供失败、接收者、允许范围和预算。','Bridge 返回身份与运行回执，按现有合法通道递送失败；workflow-core 确认是否有人接收。','基础能力已有；DA 反馈的实际递送与消费尚待宿主试验。','current,contract',false,true);
edge('repair','bridge','codex','续修','失败要求、实际与预期、证据、本次版本、允许修改范围、剩余预算与原任务身份。','原 Codex 在合法回合收到反馈并修改产品；新的检查结果才说明问题已修复。','待验证。断线后先核任务身份；取消、无权限、预算耗尽或无活跃接收者时不自动启动。','contract,current');
edge('allow','da','delivery','交付结论','仅针对当前版本的结论、证据引用和可声明的完成范围。','原受管交付入口独立核对，缺证、失效或版本不一致时拒绝接受。','拟新增末端核验；旧研究的设计通过不能替代它。','current,contract');
edge('return','delivery','user','结果与成品','本次成品、已经验证的范围和仍未完成的部分。','用户取得可核对的结果；不把测试退出码当作产品可用结论。','项目交付入口已有，图示的 DA 准入链仍待实现。','current,contract');
edge('skills','workflow','optional','按需选用','任务相关的能力选择，以及这些能力提供的方案、取舍、文字或专业结果。','当前 Codex 实际使用所选能力；不要求依次调用全部四项，也不让它们取代 DA。','Clear Writing 与领域能力已有；Reasoned Design、Artifact Curation 及新增组合仍需实现或验证。','current',false,true);

const stories=[];
function story(id,label,steps){const s={id,label:c('story.'+id+'.label',label,null,'保留','情境名直接对应读者需要比较的结果。'),steps:[]};
 for(let i=0;i<steps.length;i++){const [title,body,edgeIds,nodeIds,detail,tone]=steps[i];s.steps.push({title:c('story.'+id+'.'+i+'.title',title,null,'保留','步骤标题点名此时发生的动作。','设计推演；current,contract'),body:c('story.'+id+'.'+i+'.body',body,null,'保留','说明证据变化和下一接收者；不冒充真实 DA 运行。','设计推演；history,current,contract'),edgeIds,nodeIds,detail,tone:tone||'active'});}stories.push(s);}
const start=['保留原始要求','原 Codex 收到“检查中不误报，确认故障仍提醒”的要求。workflow-core 选择本次需要的项目能力和 DA 检查。',['request','route'],['user','codex','workflow'],'codex'];
const scope=['确定本次检查范围','DA 加入已接受的可用入口和状态一致性要求，再把检查安排交给 workflow-core。缺少相关测试时，由原 Codex 补足。',['authority','scope','check'],['baseline','da','workflow'],'da'];
const build=['生成本次成品','原 Codex 修改状态判断并构建。项目检查绑定本次版本，旧截图不会自动成为新版本的证据。',['build','run','subject'],['codex','artifact','validator'],'artifact'];
const verify=['取得项目结果与独立观察','状态对照覆盖检查中、未观测和确认故障，旧入口也实际可用。本例按正式成品的要求取得独立观察，DA 随后核对结果。',['evidence','commission','reviewResult'],['validator','review','da'],'validator'];
const decision=['核对后接受交付','DA 确认本次必需结果齐全且版本相符，受管交付入口接受相应范围的成品，再把结果交给用户。',['allow','return'],['da','delivery','user'],'delivery'];
story('normal','正常完成',[start,scope,build,verify,decision]);
story('failure','错误交回原任务',[start,scope,build,
 ['确认故障却显示正常','这是故意构造的错误版本。已有状态回归应发现确认故障被隐藏；实际窗口还须由项目验收观察。DA 接收失败，交付入口保持未通过。',['evidence'],['validator','da','delivery'],'validator','error'],
 ['把具体失败交回原任务','DA 返回违反的要求、实际与预期结果及本次版本。workflow-core 指定原任务，Bridge 将反馈送回原 Codex；是否收到必须实际确认。',['check','transport','repair'],['da','workflow','bridge','codex'],'bridge','error'],
 ['修复后重新取得证据','原 Codex 修正判断并生成新版本，重跑受影响的项目检查和必要复核。旧版本的通过结论失效，新证据齐全后才回到交付检查。',['build','run','subject','evidence','commission','reviewResult'],['codex','artifact','validator','review','da'],'artifact'],decision]);
story('regression','旧功能被改坏',[start,scope,build,
 ['新状态正确，旧入口打不开','这是构造的回归情境。状态测试可以通过，但按已接受基线检查旧入口时仍会失败；项目验收把这项结果交给 DA。',['scope','evidence'],['baseline','validator','da','delivery'],'baseline','error'],
 ['保留原要求，返回修复','DA 不能因新状态测试通过而忽略旧入口。失败沿 workflow-core 和 Bridge 返回原 Codex，检查范围仍包含这个旧入口。',['check','transport','repair'],['da','workflow','bridge','codex'],'bridge','error'],
 ['重验受影响的功能','原 Codex 修复共享改动，项目重新操作旧入口并检查状态。若还有无法确认的依赖或缺失观察，DA 继续保留缺口。',['build','run','subject','evidence'],['codex','artifact','validator','da'],'validator'],decision]);

// R1 的具体取舍。删除项不进入 copy，所以不会被重新放回网页。
const legacy=[
 ['r1.brand','系统观察室','删除','','没有获得用户要求的品牌命名，占用首屏注意力。'],
 ['r1.slogan','把证据放在它能证明的位置。','删除','','口号没有增加证据内容。'],
 ['r1.chain','判断一次交付，需要连起原始要求、当前成品、专业证据、接收与返修。','合并','ui.intro','删去独立横幅，真实关系改由主图承担。'],
 ['r1.who','一次交付，谁对什么负责。','重写','ui.graphTitle','标题不再扮演提问，直接标出架构图。'],
 ['r1.obligation','义务收束','重写','node.da.role','说明 DA 做什么，避免内部名词堆叠。'],
 ['r1.contract','组件合同——每个组件只拥有一项不可替代的责任','删除','','过度断言且重复，必要性在具体节点详情解释。'],
 ['r1.proof','源码支持 ≠ 实际入口已验证','合并','ui.evidenceP','改为连贯说明并靠近实际证据，不作为反复出现的警示横幅。'],
 ['r1.subtitle','复杂系统展示样例','删除','','介绍页面自己的身份，不能帮助读者理解系统。'],
 ['r1.stage','把自然语言承诺变成不可降级的义务','重写','story.normal.1.title','步骤标题只说检查范围，详情再解释依据。'],
 ['r1.flow','五阶段机制','删除','','固定五阶段切分遮住真实组件关系，三种情境改走同一全图。'],
 ['r1.detail','同一候选的身份记录，交给项目验证和独立复核消费','重写','node.artifact.output','“消费身份记录”过于抽象，直接说观察同一版本的成品。'],
 ['r1.recovery','只有证据完整时才允许升级交付声明','重写','story.normal.4.body','保留必要条件和实际接收方，删除升级声明的官样说法。']
];
for(const [id,original,decision,target,reason] of legacy)audit.push({id,original,decision,final:target?copy[target]:'',reason,source:'R1 两份失败原型',target});
// 真实首轮渲染和连续阅读后的逐条编辑。保留修改前文本及具体理由。
function revise(id,text,reason){const entry=audit.find(a=>a.id===id);entry.original=entry.final;entry.final=text;entry.decision='重写';entry.reason=reason;copy[id]=text;}
revise('ui.existing','已有操作','实线表示已有项目操作，不暗示 DA 的整条程序已接通。');
revise('ui.proposed','拟议连接','去掉接线口语隐喻；图例只需区分实现情况。');
revise('ui.idleBody','用户提出要求，Codex 制作成品；项目验收给出观察，DA 核对范围和结果。选择一种情境，可以逐步查看交付或返修经过哪些组件。','桌面和手机排布不同，删除只适用于桌面的上中下定位。');
revise('ui.choiceTitle','下一步怎样验证','最小一条交付链生硬，改为直接引导验证计划的标题。');
revise('ui.graphLink','回到架构图','实际链接回到页内主图，不能误称进入模型文档。');
revise('ui.caseP2','修复时要把未查明的状态与已确认的故障分开：前者不能误报，后者仍要提醒。','整页阅读发现原生验收限制在案例和依据重复；保留在紧邻来源的依据正文，案例只解释修复目标。');
revise('node.baseline.role','已接受的旧功能','手机窄节点中原句留下单字一行；删去可由标题推知的包含，使标注完整可读。');
revise('node.artifact.remove','无法确定证据检查了哪个版本，测试结果可能来自另一版软件。','各对一半像随口凑出的解释；改为具体的版本错配。');
revise('node.codex.why','原任务需要持续负责的执行者，修改产品并处理验收发现的问题。','删除真正等无必要强调，保留任务连续性的原因。');
revise('node.codex.status','已有 Codex 和项目执行流程；DA 的反馈能否被原任务接收并处理，还需验证。','同任务消费是内部协议用语，改为需要观察的接收与处理。');
revise('node.workflow.status','已有流程规范；多个插件能否按安排协作并接入 DA，仍待实测。','多插件消费确认不能帮助读者理解当前缺少哪项验证。');
revise('node.baseline.status','标准和历史记录已有；DA 怎样整理要求、识别受影响的功能并安排检查，仍在设计中。','以具体工作替换提取、分析与消费的抽象并列。');
revise('node.da.output','检查安排交给 workflow-core；可以交付的范围交给交付入口，失败和缺少的结果交回原工作流。','通过范围和缺证过于压缩，展开真实去向与缺少的内容。');
revise('edge.route.status','流程规范已有；多个技能能否按安排执行、结果能否被后续步骤使用，仍需验证。','说明需要验证的动作，去掉消费确认行话。');
revise('edge.evidence.status','项目结果还未接入 DA，图中这条连接尚未实际运行。','结果适配与 DA 消费是制作端术语；当前事实是连接未接通。');
revise('edge.reviewResult.status','项目已有审查合同，将结果交给 DA 的连接仍在设计中。','用结果交给谁解释关系，避免结果消费。');
revise('edge.commission.consumer','项目已有审查角色自行观察并返回结果；尚未启动或结果无人接收时，验收仍未完成。','保持未证像内部状态字段，改为对任务结果的具体影响。');
revise('node.da.remove','某项检查通过，仍可能被误报为整个产品完成。','绿色结果是内部行话，改成读者可判断的具体错误。');
revise('node.da.input','已批准的要求、旧行为、本次版本、项目验收与必要的独立结果。','批准要求和版本身份不自然，改为完整限定和普通名词。');
revise('edge.scope.status','影响分析和验收范围的整理尚未实现。','义务提取属于内部术语，读者需要知道未实现的具体动作。');
revise('story.regression.5.body','原 Codex 修复共享改动，项目重新操作旧入口并检查状态。仍有无法确认的依赖或缺失观察时，DA 不能确认可以交付。','保留缺口是数据库腔；直接说明为何仍不能交付。');
for(const key of ['projectGroup','basis','viewSources']){const id=ui[key],entry=audit.find(a=>a.id===id);entry.original=entry.final;entry.final='';entry.decision='删除';entry.reason='实际页面无需额外分组或链接说明，已有标题和链接名足以定位。';delete copy[id];delete ui[key];}
module.exports={copy,audit,ui,sources,nodes,edges,stories};

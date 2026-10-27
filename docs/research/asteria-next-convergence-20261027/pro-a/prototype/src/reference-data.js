import input from './source-evidence.js';
import micaHistory from '../../sources/mica-historical-anchors.json' with {type:'json'};
import {coreSnapshot} from './model-core.js';

const clone=x=>JSON.parse(JSON.stringify(x));
const upstream='https://github.com/YuukiAS/AI_Skills_Collection/blob/fd6916ad5fdd5fb905544b6a127f9b0d31a737e1/';
function make(id,title,subtitle,edition,description){return {schemaVersion:'asteria-next-reference-1',project:{id,title,subtitle,edition,description,currentRevision:id+'-current'},entities:{},symbols:{},relations:{},variants:{},views:{system:{id:'system',kind:'architecture',projectedEntityIds:[]}},anchors:{},bindings:{},revisions:{},paths:[],questions:[],sources:[]};}
function node(p,id,label,description,kind='component',facets={},designState='accepted'){
  p.entities[id]={id,kind,label,description,designState,facets:{contract:{critical:true},...facets}};p.views.system.projectedEntityIds.push(id);return p.entities[id];
}
function edge(p,id,sourceId,targetId,label,payload,consumer,options={}){
  p.relations[id]={id,type:'transfers',sourceId,targetId,directed:true,label,contract:{payload,consumer,...options.contract},...options};return p.relations[id];
}
function anchor(p,id,extra={}){if(input.anchors[id])p.anchors[id]={...clone(input.anchors[id]),...p.anchors[id],...extra};return id;}
const bindingRoles={'cat-tail':'definition','cat-tail-test':'test','cat-column':'definition','cat-observed':'definition','cat-collapsed':'transformation','cat-transition':'transformation','cat-sweep':'entrypoint','cat-result':'result_source','cat-open':'design_reference','cat-gap':'design_reference','cat-counterexample':'result_source','cat-counterexample-routine':'probe','cat-target-test':'test','cat-stale-test':'test','cat-oracles':'result_source','stat-timetable':'requirement_source','stat-page10':'artifact_source','stat-page35':'artifact_source','stat-page37':'artifact_source','stat-rate-code':'definition'};
function bind(p,entityId,ids){ids.forEach((id,i)=>{anchor(p,id);if(p.anchors[id]){const role=bindingRoles[id]||p.anchors[id].role||'definition';p.bindings[`${entityId}:${id}`]={id:`${entityId}:${id}`,entityId,anchorId:id,role,source:'manual',bindingStatus:'CURRENT'};if(['definition','transformation','entrypoint','probe','test'].includes(role)&&p.anchors[id].path)p.anchors[id].kind='code';if(role==='artifact_source')p.anchors[id].kind='artifact';}});}
function source(p,id,label,url,commit='5d4b1432f96742646e00ad279a054359b1aec1da'){p.anchors[id]={id,kind:'document',label,url,commit,access:'public',resolution:'resolved'};return id;}
function evidence(p,id,label,subjects,summary,details,anchors=[],kind='source_check',result='observed'){
  anchors.forEach(a=>anchor(p,a));p.entities[id]={id,kind:'result',label,description:summary,designState:'observed',facets:{evidence:{subjects,kind,result,subjectRevision:p.project.currentRevision,summary,details,anchorIds:anchors}}};
}
function issue(p,id,label,target,description,sourceIds=[],blocks='implementation'){sourceIds.forEach(a=>anchor(p,a));p.entities[id]={id,kind:'open_question',label,description,designState:'open',facets:{issue:{target,blocks,sourceIds}}};p.questions.push(id);}
const sequence=(steps,boundary)=>({kind:'sequence',steps,boundary});
function revision(p,id,title,scope,before,reason,trigger,unchanged,impact,options={}){
  const after=options.after||coreSnapshot(p);
  // Historical mechanisms are source reconstructions, not original frozen
  // workspaces. Do not silently reuse current implementation bindings as past
  // observations. Exact historical source links are carried by sourceIds.
  for(const snapshot of [before,after])for(const [bindingId,binding] of Object.entries(snapshot.bindings||{}))if(scope.includes(binding.entityId))delete snapshot.bindings[bindingId];
  p.revisions[id]={id,title,scope,state:'source_reconstruction',major:true,reason,trigger,unchanged,impact,provenance:'根据固定来源重建所选对象的局部对照；没有把当前绑定当作历史实现快照。',implementationCoverage:'historical source links; complete past binding table not reconstructed',...options,before,after};
}
const step=(node,edge,title,detail)=>({node,edge,title,detail});

// Delivery Assurance: design facts. No implementation binding is manufactured.
const da=make('da','Delivery Assurance','交付、验收与返修','设计方案','同一候选从原始要求走到验收；失败回到原任务，修复后重新核对受影响的证据。');
node(da,'request','用户要求','确定这次交付要满足什么，以及哪些已有能力必须保留。','requirement',{mechanism:sequence(['保留用户原始要求与不能降低的承诺','把新能力与已接受能力分别纳入本次范围','说明什么可观察结果构成交付'], '要求改变时更新依据，不能由实现者自行降低标准。')});
node(da,'workflow','workflow-core','安排工作与接收者，把失败送回原制作任务。','component',{mechanism:sequence(['接收当前任务、候选身份与检查范围','调用所需领域能力并指定结果接收者','收到失败后确定原任务，再交给 Bridge Kit 递送','确认接收与恢复点，保留未完成的检查'],'交付判断由 DA 汇总，专业结论由项目审阅提供。')});
node(da,'maker','当前制作任务','按当前设计制作或修复成品，并保留真实版本。','component',{mechanism:sequence(['读取当前要求及允许修改范围','生成候选并标记源码、构建或文件身份','对照 finding 修复，输出新候选与修改范围'],'普通实现缺陷留在原任务；核心设计空白返回设计。')});
node(da,'candidate','当前候选','把待验文件、运行入口和实际版本绑定在一起。','artifact',{mechanism:{kind:'contract',facts:[['身份','源码提交、构建或文件摘要'],['消费对象','用户实际打开的页面、文件或运行入口'],['更换候选','保留旧证据，并重新判断其适用范围']]}});
node(da,'assurance','Delivery Assurance','汇总当前候选的交付义务、有效证据与未解决问题。','component',{mechanism:sequence(['将原始要求与已有能力映射到检查范围','核对证据所指的候选、对象和条件','有失败或关键缺证时给出具体问题及返回位置','只对已有有效证据覆盖的范围形成交付判断'],'不接管项目的专业判断，也不自行选择下一执行者。')});
node(da,'review','专业审阅','直接检查成品的行为、内容、科学含义或视觉。','component',{mechanism:sequence(['取得同一候选的完整消费对象','按领域标准核对正常路径与重要反例','把实际、预期、对象位置和来源写入 finding'],'测试通过、文件存在和真实用户效果分别判断。')});
node(da,'bridge','Bridge Kit','把带原任务身份的反馈送到既有合法执行入口。','component',{mechanism:sequence(['接收工作流已确定的任务身份与接收者','按已有授权和恢复通道递送反馈','回传是否真正收到及可继续的恢复点'],'Bridge Kit 负责递送；它不猜测交付结论和下一任务。')});
node(da,'accepted','可交付范围','只纳入当前候选已有证据支持的用户能力。','result',{mechanism:{kind:'contract',facts:[['依据','当前要求、候选与有效证据'],['既有能力','本次修改涉及的旧正确行为仍需得到保护']]}});
edge(da,'request-workflow','request','workflow','要求与范围','原始请求、接受标准、需保护的能力','workflow-core 的工作安排');
edge(da,'workflow-maker','workflow','maker','制作安排','任务、范围、专业能力及检查接收者','原制作任务');
edge(da,'maker-candidate','maker','candidate','候选版本','实际成品、源码/构建身份、变更范围','候选身份核对');
edge(da,'candidate-review','candidate','review','实际成品','完整成品、当前版本、必要运行入口','项目专业审阅');
edge(da,'review-assurance','review','assurance','结论与问题','对象级发现、预期/实际、所据证据','DA 的证据资格与交付判断');
edge(da,'workflow-assurance','workflow','assurance','检查范围','本次用户能力、候选及所需验证','DA 的义务范围整理');
edge(da,'assurance-accepted','assurance','accepted','可交付范围','当前有效证据支持的能力和保留问题','交付入口');
edge(da,'assurance-workflow','assurance','workflow','失败与缺证','候选、受影响要求、实际/预期、证据位置','workflow-core 的原任务返回决策',{route:'repair'});
edge(da,'workflow-bridge','workflow','bridge','原任务与反馈','接收者、合法任务身份、finding 与恢复点','Bridge Kit 的既有递送通道',{route:'repair'});
edge(da,'bridge-maker','bridge','maker','续修','原任务反馈与确认回执','原制作任务的恢复入口',{route:'recovery'});
const daDoc=source(da,'da-design','当前职责设计',upstream+'docs/design/ai-reliability-architecture/ARCHITECTURE_ZH.md','fd6916ad5fdd5fb905544b6a127f9b0d31a737e1');
source(da,'da-before','旧共享判定库设计','https://github.com/YuukiAS/AI_Research_Toolkit/blob/ae2766a62b1546048ec6122e01ee95f1904fb73c/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/02_ARCHITECTURE_AND_COMPONENTS.md#L45-L49','ae2766a62b1546048ec6122e01ee95f1904fb73c');
source(da,'da-before-return','旧原任务返回合同','https://github.com/YuukiAS/AI_Research_Toolkit/blob/ae2766a62b1546048ec6122e01ee95f1904fb73c/docs/research/software-production/22_DELIVERY_ASSURANCE_GLOBAL_WORK_RESEARCH_20261022/WORK_OUTPUT/03_END_TO_END_EXECUTION_AND_VALIDATORS.md#L209-L214','ae2766a62b1546048ec6122e01ee95f1904fb73c');
evidence(da,'da-source','设计依据',['assurance','workflow','bridge'],'职责边界来自现有设计说明。','本轮核对了设计与历史原型；尚未取得普通入口的七仓真实接线证据。');da.entities['da-source'].facets.evidence.anchorIds=[daDoc];
issue(da,'da-host-open','恢复入口需要实测','bridge','失败反馈要由原任务真实接收，并能继续处理。现有设计不足以证明这条接线已经运行。',[daDoc]);
da.paths=[
 {id:'normal',label:'正常交付',steps:[step('request','request-workflow','保留要求','新能力和旧能力保护一起进入本次检查范围。'),step('maker','workflow-maker','制作候选','原任务产出可以实际打开或运行的候选。'),step('candidate','candidate-review','直接审阅成品','审阅对象固定到这一个候选版本。'),step('assurance','review-assurance','汇总有效证据','结论必须能回到具体要求、对象和证据。'),step('accepted','assurance-accepted','形成交付范围','用户看到的是已有依据支持的能力与剩余问题。')]},
 {id:'repair',label:'返修',steps:[step('review','candidate-review','发现问题','专业审阅记录具体位置、实际与预期。'),step('assurance','review-assurance','确认受影响范围','检查 finding 是否属于当前候选。'),step('workflow','assurance-workflow','确定原任务','工作流决定接收者，保留问题上下文。'),step('bridge','workflow-bridge','送达反馈','Bridge Kit 使用既有合法通道递送。'),step('maker','bridge-maker','返回原制作任务','修改后生成新候选，受影响证据需要复验。')]},
 {id:'recovery',label:'恢复',steps:[step('bridge','workflow-bridge','确认中断位置','先确认任务身份与上次已接收的反馈。'),step('maker','bridge-maker','恢复未完成工作','从原任务恢复点继续，保留旧候选用于对照。'),step('candidate','maker-candidate','绑定新候选','新文件与旧报告不能混为同一版本。'),step('review','candidate-review','重新检查影响范围','复用仍适用的证据，补做本次失效的判断。')]},
 {id:'preserve',label:'保护已有能力',steps:[step('request','request-workflow','纳入已接受基线','本次成功必须同时保留相关旧正确行为。'),step('review','candidate-review','检查新旧路径','新用例通过后，继续检查受影响的旧入口。'),step('assurance','review-assurance','发现回归就停止交付','新功能通过不能抵消已有能力失效。'),step('maker','bridge-maker','带着保护条件返修','修复范围与不能破坏的内容一起回到原任务。')]}
];
for(const id of da.views.system.projectedEntityIds)da.entities[id].designState='proposed';
const daBefore=coreSnapshot(da);
daBefore.entities.assurance.label='交付判定职责';
daBefore.entities.assurance.facets.mechanism=sequence(['在 workflow-core 的共享纯判定库中整理义务与证据','判定函数将结果返回 Bridge 的既有执行接点','专业结果仍由项目 runner 和原领域权威提供'],'这是旧设计的职责投影，没有对应运行迁移证据。');
daBefore.entities.workflow.facets.mechanism=sequence(['包含共享交付判定函数与能力选择逻辑','原任务负责人决定运行模式与续修','Bridge 消费已选模式，不启动第二个任务负责人']);
daBefore.entities.bridge.facets.mechanism=sequence(['在已有入口执行准入、完成、检查与报告接点','调用共享判定库并接收结果','沿原任务、原父进程或既有控制器返回问题']);
revision(da,'da-responsibility','交付判断独立成职责',['assurance','workflow','bridge'],daBefore,'让交付判定、能力编排与底层运行各有明确责任；旧任务权威和专业判断继续保留。','新设计提出独立的 Delivery Assurance 插件，并重新划定 workflow-core 与 Bridge Kit 的职责。',['项目保留专业判断','原任务负责人及合法恢复通道','候选身份继续绑定证据'],['交付规则的所有者','判定结果的消费位置','现有宿主接点'],{beforeLabel:'共享判定库设计',afterLabel:'独立职责候选',recordKind:'design_reconstruction',provenance:'依据两份设计材料重建职责对照；两版都包含工作流和原任务权威，没有代码迁移或运行接线证明。',sourceIds:['da-before','da-before-return',daDoc]});

// Mica: exact public source anchors, and a narrowly scoped real fixture run.
const mica=make('mica','Mica','对话页面与输入体验','运行版本 0.1.7','浏览器扩展从原生页面识别安全边界，在长对话、清空与连接器切换中保留原有交互。');
for(const m of input.mica.mechanisms){
 const e=node(mica,m.id,m.label,m.summary,'component',{mechanism:{kind:m.id==='mica.stale'?'states':'sequence',steps:m.steps,boundary:m.failure,invariants:m.unchanged||[],bounds:m.bounds||[],selector:m.selector},implementationClaim:'linked'});
 bind(mica,m.id,m.anchors);
}
node(mica,'mica.native','ChatGPT 原生页面','保留消息、输入框、工具和授权界面的行为。','external',{contract:{critical:false,blackBoxReason:'外部宿主；只绑定可观察 DOM 与交互契约。'},mechanism:{kind:'contract',facts:[['边界','扩展不拥有宿主 DOM 的稳定承诺'],['保护','输入、流式内容、工具与授权区域保留原生交互']]}});
node(mica,'mica.adapter','统一平台适配层','新规格希望把 DOM 识别收拢到统一适配层；当前仍未迁移。','component',{mechanism:sequence(['统一识别轮次、输入框与宿主状态','只由适配层生成共享回答文档','向上层能力提供稳定对象'],'这是后续已描述的设计，当前运行代码仍使用分散选择器。')},'proposed');
for(const r of input.mica.relations)edge(mica,r.id,r.source,r.target,r.id.includes('signal')?'共享连接器事件':r.id.includes('stale')?'恢复互斥':'安全消息轮次',r.payload,r.consumer,{type:r.type==='constrains'?'constrains':r.type==='emits'?'emits':'transfers',anchorIds:r.anchors});
edge(mica,'mica.native-dom','mica.native','mica.dom','已挂载结构','候选消息、角色、输入与交互区域','collectConversationTurns',{anchorIds:['m-turns','m-selectors']});
edge(mica,'mica.native-signal','mica.native','mica.signal','选择动作','连接器相关按键与 DOM 标记','isPotentialConnectorEvent');
edge(mica,'mica.native-stale','mica.native','mica.stale','清空与重挂载','明确清空意图、空值确认、后续原生挂载','confirmPendingClear',{route:'recovery',anchorIds:['m-stale-intent','m-stale-confirm']});
edge(mica,'mica.scan-native','mica.scan','mica.native','局部渲染约束','安全历史轮次的 content-visibility 调整','浏览器渲染层',{type:'constrains'});
edge(mica,'mica.continuity-native','mica.continuity','mica.native','短期只读外观','新鲜且不可交互的消毒快照','showShell 创建的只读外观层',{route:'recovery',anchorIds:['m-shell','m-skip']});
source(mica,'mica-adapter-spec','平台适配层规格','https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/product/MICA_PRODUCT_SYSTEM_V1.md#L300-L436','7059c0dc24b908b57bd0e1f475142ba4f4520621');
evidence(mica,'mica-hotpath','普通输入回归',['mica.signal','mica.continuity'],'13 项合成回归通过；普通输入与输入法用例没有新增 DOM 复制或计算样式读取。','本轮运行既有 runTypingHotpathCase，Chrome for Testing 131，900 × 820；源码与 dist 一致。真实 ChatGPT 和目标设备性能仍需另验。',['m-hotpath-test','m-hotpath-fixture'],'mechanical_run','pass');
evidence(mica,'mica-source','源码与入口核对',['mica.dom','mica.scan','mica.stale'],'已定位声明、消费点、选择器和既有测试。','源码检查能确认机制写在何处；尚未在当前在线 ChatGPT 对所有功能重新验收。',['m-turns','m-scan','m-stale-confirm','m-stale-delete']);
issue(mica,'mica-design-ahead','平台适配设计领先代码','mica.adapter','新规格中的统一适配层尚未出现于当前实现。旧运行代码仍然可独立查看。',['mica-adapter-spec'],'alignment');
issue(mica,'mica-live','当前线上结构尚待验证','mica.dom','固定源码中的选择器可追溯，但宿主 DOM 会改变。本地输入回归没有覆盖当前登录态 ChatGPT。',['m-selectors'],'evidence');
mica.paths=[
 {id:'normal',label:'长对话',steps:[step('mica.native','mica.native-dom','读取原生页面','先识别已挂载消息及输入保护区。'),step('mica.dom','mica.dom-scan','筛选安全轮次','去重、排序，排除不可靠结构。'),step('mica.scan','mica.scan-native','合并扫描','保持最近轮次、视口附近和特殊交互区域。'),step('mica.native','mica.scan-native','保留原生行为','只改变安全区域的渲染约束，不删除消息。')]},
 {id:'continuity',label:'连接器切换',steps:[step('mica.signal','mica.native-signal','识别真实切换','普通输入先被快速过滤。'),step('mica.continuity','mica.signal-continuity','消费共享事件','在短观察窗口内合帧刷新快照。'),step('mica.native','mica.continuity-native','短暂维持外观','原生输入框消失时显示不可交互的外观层。'),step('mica.continuity','mica.stale-continuity','清理与互斥','原生返回或超时会清理；发送和清空恢复活动会阻止新建外观层。')]},
 {id:'recovery',label:'清空恢复',steps:[step('mica.stale','mica.native-stale','确认用户清空','只有同一输入对象真的清空后才启动守护。'),step('mica.stale','mica.native-stale','等待同一旧草稿','重挂载内容与本地指纹相符后才处理。'),step('mica.native','mica.stale-continuity','有界恢复','新输入立即取消；最多恢复 3 次，不自动发送。')]}
];
const mBefore=coreSnapshot(mica);
mBefore.entities['mica.continuity'].facets.mechanism.steps=['监听 6 类输入与交互事件；检测到连接器上下文后同步重建快照','用 60 ms 轮询检查输入框','共享生命周期信号仍然存在','发送互斥要求同时处于活动状态且已提交用户轮次'];
mBefore.entities['mica.continuity'].facets.mechanism.bounds=['观察窗口 3200 ms','快照新鲜度 2500 ms','外观层硬上限 2000 ms'];
mBefore.entities['mica.continuity'].facets.mechanism.boundary='没有新鲜快照或矩形时不新建外观层；发送互斥需同时满足 active 与 userTurnCommittedLatched，清空恢复活动也会阻止新建。已有外观层不因此立即移除。';
mBefore.entities['mica.signal'].facets.mechanism.steps=['普通输入调用 detectSignal','publicLatch 再次查询候选列表'];
mBefore.relations['mica.native-signal'].contract.consumer='handlePotentialConnectorSignal → detectSignal';
mBefore.relations['mica.input-heavy']={id:'mica.input-heavy',type:'emits',sourceId:'mica.native',targetId:'mica.continuity',label:'普通输入触发快照',contract:{payload:'普通输入事件；检测到连接器上下文后触发',consumer:'handlePotentialMentionEvent → beginLifecycle'},route:'legacy'};
revision(mica,'mica-hotpath-change','让普通输入离开重型快照路径',['mica.signal','mica.continuity'],mBefore,input.mica.revision.changes[0].reason,input.mica.revision.trigger,input.mica.revision.unchangedGuarantees,['连续显示调度','读取共享状态的调用方','输入性能回归'],{beforeLabel:'0.1.6',afterLabel:'0.1.7',beforeCommit:input.mica.revision.beforeCommit,afterCommit:input.mica.revision.afterCommit,compareUrl:input.mica.revision.compareUrl,sourceIds:['m-hotpath-test'],summary:'移除普通输入的重复快照与固定轮询，保留共享生命周期信号。',alignment:'当前源码包含这项修复；本轮证据限于既有合成输入用例。'});
const micaRevision=mica.revisions['mica-hotpath-change'];
// The comparison reconstructs relation contracts, not every historical source
// locator. Omit these locators on both sides so current anchors cannot masquerade
// as old code or create a fictitious source-addition diff. Current bindings stay.
for(const side of ['before','after'])for(const relation of Object.values(micaRevision[side].relations))if(micaRevision.scope.includes(relation.sourceId)||micaRevision.scope.includes(relation.targetId))delete relation.anchorIds;
for(const pair of micaHistory.pairs){
 for(const side of ['before','after']){
  const a={...clone(pair[side]),access:'public',label:`${side==='before'?'0.1.6':'0.1.7'} · ${pair[side].symbol}`};
  mica.anchors[a.id]=a;micaRevision[side].anchors[a.id]=a;
  micaRevision[side].bindings[pair.recommendedStableBindingId]={id:pair.recommendedStableBindingId,entityId:pair.entityId,anchorId:a.id,role:pair.role,source:'manual',bindingStatus:'CURRENT'};
 }
}
micaRevision.provenance='机制与关系契约依据两次固定提交重建；实现对照只含已核对的 3 对函数。关系源码锚点未完整重建，不参与前后比较。';
micaRevision.implementationCoverage='three verified paired functions; remaining historical bindings not reconstructed';

// Research and artifact material uses fixed private source links, without private source or data copies.
const catInput=input.scienceProjects.find(p=>p.id==='cat-trace');
const cat=make('cat','CAT-TRACE','科学模型、数值算法与证据','研究中的模型','已实现的数值内核、参考采样器与尚未冻结的积分方法，在同一模型中保留各自的结论范围。');
for(const c of catInput.components){
 const m=c.mechanism;
 const facets={mechanism:m?{kind:m.renderer,steps:m.steps,formula:m.formula,formulaMeaning:m.formula_meaning,boundary:undefined}:sequence(c.id==='cat-model'?['区分已知对象与未发现槽位','由共享参数连接观测和未观测贡献','保留科学假设及适用条件']:c.id==='cat-data'?['固定样本、特征与分组身份','检查输入契约','把同一比较输入交给各算法']:['用独立参照核对数值目标','区分实现正确性与链的可靠性','保留反例和未满足的要求'],'详细材料留在原仓库。')};
 if(c.design==='superseded')facets.contract={critical:false};
 node(cat,c.id,c.label,c.summary,c.kind==='routine'?'algorithm':c.kind,facets,c.design);
 bind(cat,c.id,c.anchors||[]);if(c.id==='cat-zero')cat.entities[c.id].description='计算未发现槽位对科学模型的贡献，并保留聚合等价关系。';
}
catInput.relations.forEach((r,i)=>edge(cat,'cat-r'+i,r.source,r.target,r.verb,r.payload,r.consumer,{route:r.status||'normal',type:r.verb==='约束'?'constrains':'transfers'}));
edge(cat,'cat-model-reference','cat-model','cat-reference','固定目标','当前模型、先验和观测输入','参考后验算法');
evidence(cat,'cat-numerical-evidence','数值内核的检查范围',['cat-tail'],'仓库已有尾部稳定性与导数检查。','本轮读取了例程和对应测试，没有重新执行科研计算；数值内核的检查不批准匿名零槽位路线。',['cat-tail','cat-tail-test','cat-column']);
evidence(cat,'cat-reference-evidence','参考算法：正确性与可靠性分开',['cat-reference','cat-validation'],'修订后的正确性有记录，正式混合可靠性要求仍未满足。','参考实现不能因此升为全部推断模块的金标准。证据保留原目标、版本与检查条件。',['cat-result','cat-target-test','cat-stale-test'],'recorded_result','mixed');
evidence(cat,'cat-counter','旧近似被反例否定',['cat-zero','cat-laplace-withdrawn'],'普通单列局部近似不能直接用于匿名全零列。','尾部误差可能随槽位重数放大；保留原模型目标，重新设计积分算法。',['cat-counterexample','cat-open'],'counterexample','fail');
issue(cat,'cat-zero-open','积分误差、导数与成本尚未闭合','cat-zero','已有截距消元与分位数求积候选，但生产算法还缺统一误差控制、适用范围和独立证据。',['cat-open','cat-gap'],'design');
issue(cat,'cat-mixing','参考链可靠性仍待改进','cat-reference','正确性检查与统计可靠性回答不同问题。当前参考结果不能承担尚未满足要求的验证角色。',['cat-result'],'evidence');
cat.paths=[
 {id:'normal',label:'数值内核',steps:[step('cat-data','cat-r0','固定输入身份','同一响应、设计和先验进入单列计算。'),step('cat-tail','cat-r1','稳定计算尾部','按数值区间选择稳定表达，再核对导数。'),step('cat-model','cat-r1','返回模型需要的量','概率、众数与曲率回到显式列计算。')]},
 {id:'reference',label:'参考推断',steps:[step('cat-model','cat-model-reference','沿用当前目标','模型、先验与输入不能为改善诊断而偷换。'),step('cat-reference','cat-r3','独立参考算法','组成更新使用观测似然，下一轮重新抽取潜变量。'),step('cat-validation','cat-r3','核对可靠性','检查正确性和采样可靠性，两者分别形成结论。')]},
 {id:'open',label:'尚待确定',steps:[step('cat-zero','cat-r2','保留未观测贡献','没有唯一生产算法仍是合法的研究状态。'),step('cat-validation','cat-r4','检验候选机制','误差、导数、成本和适用范围需要共同成立。'),{...step('cat-zero',null,'查看旧路线为何撤销','普通局部近似的反例留在修订中，不能重新充当当前实现。'),revision:'cat-zero-withdrawal'}]}
];
const cBefore=coreSnapshot(cat);cBefore.entities['cat-reference'].facets.mechanism.steps=['更新潜变量和参数块','在当前潜变量条件下更新组成对比','继续当前迭代'];
const cr=catInput.revisions[0];revision(cat,'cat-composition-change','组成更新改用观测似然',['cat-reference'],cBefore,cr.reason,cr.trigger,cr.unchanged,cr.changed,{beforeLabel:'参考算法 0.1.1',afterLabel:'参考算法 0.1.2',beforeCommit:cr.before_commit,afterCommit:cr.after_commit,compareUrl:`https://github.com/YuukiAS/CAT-TRACE/compare/${cr.before_commit}...${cr.after_commit}`,sourceIds:cr.evidence,summary:cr.after,alignment:cr.outcome});cr.evidence.forEach(a=>anchor(cat,a));
const zeroBefore=coreSnapshot(cat);zeroBefore.entities['cat-laplace-withdrawn'].designState='proposed';zeroBefore.entities['cat-laplace-withdrawn'].description='尝试把单列局部近似用于匿名全零列。';
revision(cat,'cat-zero-withdrawal','撤销匿名零槽位的普通局部近似',['cat-laplace-withdrawn','cat-zero'],zeroBefore,'局部尾部误差会随重复槽位贡献放大。','独立解析与高精度数值反例。',['未发现槽位仍进入模型','聚合等价关系','显式列数值内核'],['零事件积分','共享目标的数值误差'],{beforeLabel:'尝试中的旧路线',afterLabel:'撤销后重新设计',sourceIds:['cat-counterexample','cat-open'],summary:'保留模型目标；替代算法仍在研究。',alignment:'尚无获准的生产替代实现。'});

const tInput=input.scienceProjects.find(p=>p.id==='stat5060');
const tutorial=make('tutorial','STAT5060 Tutorial','从整套课件追到页面与要求','教学材料 · V14','验收围绕实际课件、当前课程要求及具体对象；修复后按影响范围重渲染和复验。');
node(tutorial,'tutorial-requirement','当前要求','课程事实、教学目标和已接受模板共同约束这次课件。','requirement',{mechanism:{kind:'contract',facts:[['课程事实','使用当前冻结的课程安排'],['统计内容','数据、公式与解释保持一致'],['读者','学生页只保留当下需要知道的信息']]}});bind(tutorial,'tutorial-requirement',['stat-timetable']);
node(tutorial,'tutorial-candidate','候选课件','以文件身份与有序页面绑定同一份待验产品。','artifact',{mechanism:{kind:'artifact',pages:[{number:10,label:'计数与发生率',objects:['问题','数据表','统计解释'],state:'reference'},{number:35,label:'考核安排',objects:['考核表'],state:'attention'},{number:37,label:'项目安排',objects:['标题','口试说明'],state:'attention'}],summary:'第 35、37 页保留旧考核安排，需要按当前要求更新。'}});bind(tutorial,'tutorial-candidate',['stat-page10','stat-page35','stat-page37']);
node(tutorial,'tutorial-mechanical','机械核对','计算数值、核对文件身份，并报告能重复检验的事实。','component',{mechanism:sequence(['绑定候选、统计对象和当前声明','在定义域内核算事实与阈值','把检查结果交给专业审阅，保留异常原因'],'合法零计数不能被当作程序异常丢失。')});bind(tutorial,'tutorial-mechanical',['stat-rate-code']);
node(tutorial,'tutorial-page','页面与对象审阅','检查页面读起来是否清楚，以及文字、图表和公式是否表达正确。','component',{mechanism:{kind:'artifact',pages:[{number:10,label:'计数与发生率',objects:['题干 → 数据表 → 解释'],state:'reference'},{number:35,label:'考核表与当前要求不一致',objects:['表格：过时的考核项目'],state:'attention'},{number:37,label:'项目说明仍有已撤销安排',objects:['标题与正文：旧口试说明'],state:'attention'}],summary:'这里展示对象结构；完整原页保留在受控来源。'}});bind(tutorial,'tutorial-page',['stat-page10','stat-page35','stat-page37']);
node(tutorial,'tutorial-sequence','整套叙事审阅','按完整页序检查先修、转场、遗漏与重复。','component',{mechanism:sequence(['读取同一版本的完整有序页图','核对概念引入先于使用','检查页面之间的转场、重复及教学承诺'],'交换两页即使不改页图，也会改变整套叙事的证据身份。')});
node(tutorial,'tutorial-finding','具体问题','将失败绑定到候选、要求、页面或对象，交回原制作任务。','component',{mechanism:{kind:'finding'}});
node(tutorial,'tutorial-rerender','修复与重渲染','在原任务中更新内容，生成新候选，再补受影响的检查。','component',{mechanism:sequence(['确认是产品缺陷、验收程序缺陷还是要求已改变','保持未受影响内容，修改对应对象','生成新页图与文件身份','重新核对失效证据，并检查旧正确内容'],'当前第 35、37 页的修复仍待完成。')});
edge(tutorial,'t-rule-check','tutorial-requirement','tutorial-mechanical','当前要求','规则、统计声明与对象范围','机械验证入口');
edge(tutorial,'t-rule-page','tutorial-requirement','tutorial-page','权威事实','当前课程决定、教学目标与模板','页面专业判断');
edge(tutorial,'t-candidate-check','tutorial-candidate','tutorial-mechanical','候选身份','文件摘要、页序、统计对象及输入','身份核对与计算');
edge(tutorial,'t-candidate-page','tutorial-candidate','tutorial-page','页图与对象','同一候选的页面、对象定位与必要邻页','页级审阅');
edge(tutorial,'t-candidate-story','tutorial-candidate','tutorial-sequence','完整页序','有序页面、概念依赖与全部正文','整套叙事审阅');
edge(tutorial,'t-check-find','tutorial-mechanical','tutorial-finding','机械事实','实际结果、预期、对象和规则','问题归因',{route:'repair'});
edge(tutorial,'t-page-find','tutorial-page','tutorial-finding','页面问题','页码、对象、要求和阅读或事实缺口','原制作任务',{route:'repair'});
edge(tutorial,'t-story-find','tutorial-sequence','tutorial-finding','整体问题','缺失先修、重复、转场或完整性问题','原制作任务',{route:'repair'});
edge(tutorial,'t-find-repair','tutorial-finding','tutorial-rerender','限定修复','受影响对象、受保护内容与待复验证据','原制作任务的修复范围',{route:'recovery'});
edge(tutorial,'t-repair-candidate','tutorial-rerender','tutorial-candidate','新候选','新文件身份、页序与修改对应','同一验收入口',{route:'recovery'});
for(const [number,label] of [[10,'计数与发生率'],[35,'考核安排'],[37,'项目安排']]){
 const id=`tutorial-v14-page-${number}`;
 tutorial.entities[id]={id,kind:'artifact',label:`V14 · 第 ${number} 页`,description:label,designState:'observed',facets:{artifact:{parentId:'tutorial-candidate',version:'V14',pageNumber:number,anchorId:`stat-page${number}`},mechanism:{kind:'contract',facts:[['页面身份',`V14 第 ${number} 页`],['主要内容',label],['来源','对应固定提交中的原始页图']]}}};bind(tutorial,id,[`stat-page${number}`]);
}
for(const [version,commit] of [['V04','c747870e294e784e89edf3ba92a5ad4a74a7ab2d'],['V05','ce896c8a11816ea0a5cd836b00554433b79a23fa']]){
 const id=`tutorial-${version.toLowerCase()}-page-26`;
 tutorial.entities[id]={id,kind:'artifact',label:`${version} · 第 26 页`,description:'历史项目说明页；候选提交由对应逐页审阅记录确认。',designState:'observed',facets:{artifact:{version,pageNumber:26,repository:'YuukiAS/STAT5060-TA',commit,anchorId:version==='V04'?'stat-v04':'stat-v05'},mechanism:{kind:'contract',facts:[['对象',`${version} 第 26 页项目说明`],['候选提交',commit],['证据边界','本轮读取历史审阅，没有重新渲染这两版课件']]}}};
}
for(const [id,label,description,sourceId] of [['tutorial-student-content','学生页面内容','只呈现学生当下需要知道的课程内容。','stat-v04'],['tutorial-rate-domain','合法计数与发生率','按实际声明处理统计定义域，合法零计数不能使验收程序退出。','stat-finding']]){
 tutorial.entities[id]={id,kind:'requirement',label,description,designState:'observed',facets:{mechanism:{kind:'contract',facts:[['要求',description],['依据','固定版本的领域审阅记录']]},sourceIds:[sourceId]}};
}
tutorial.views.findings={id:'findings',kind:'finding_list',projectedEntityIds:tInput.findings.map(f=>f.id)};
for(const f of tInput.findings){
 const objectIds=f.id==='tutorial-v14-obsolete-assessment'?['tutorial-v14-page-35','tutorial-v14-page-37']:f.attribution==='validator_defect'?['tutorial-mechanical']:['tutorial-v04-page-26'];
 tutorial.entities[f.id]={id:f.id,kind:'finding',label:f.title,description:f.explanation,designState:'observed',facets:{finding:{...clone(f),objectIds,requirementIds:[f.attribution==='validator_defect'?'tutorial-rate-domain':f.status==='historical_locally_corrected'?'tutorial-student-content':'tutorial-requirement'],sourceIds:[f.source,f.after_source,f.authority_anchor,f.code,...(f.artifact_anchors||[])].filter(Boolean),projectionOwner:'tutorial-finding'},mechanism:{kind:'finding',findingId:f.id}}};
}
for(const f of tInput.findings){const ids=[f.source,f.after_source,f.authority_anchor,f.code,...(f.artifact_anchors||[])].filter(Boolean);ids.forEach(a=>anchor(tutorial,a));}
evidence(tutorial,'t-current-evidence','课件与当前课程决定对照',['tutorial-candidate','tutorial-page','tutorial-finding'],'V14 的第 35、37 页仍包含已被当前要求替换的安排。','已有研究记录了差异；本轮再次打开真实页图与当前课程决定核对。修复尚未完成。',['stat-page35','stat-page37','stat-timetable','stat-recorded-stale'],'semantic_review','fail');
evidence(tutorial,'t-page10-evidence','第 10 页的局部语义正例',['tutorial-page'],'该页确有问题、数据表和发生率解释。','它能支持对象定位和局部科学说明；不代表整套课件已经通过视觉与教学验收。',['stat-page10'],'source_check','observed');
evidence(tutorial,'t-validator-defect','验证器的零计数缺陷',['tutorial-mechanical'],'合法零计数可能使验证器直接退出。','独立检查定位到先算比值再检查声明的控制流；这属于验收程序缺陷，不能据此判课件内容错误。',['stat-finding','stat-rate-code'],'review','fail');
tutorial.entities['t-current-evidence'].facets.evidence.subjects.push('tutorial-v14-obsolete-assessment','tutorial-v14-page-35','tutorial-v14-page-37');
tutorial.entities['t-page10-evidence'].facets.evidence.subjects.push('tutorial-v14-page-10');
tutorial.entities['t-validator-defect'].facets.evidence.subjects.push('IVA-T-001');
evidence(tutorial,'t-history-review','V04 → V05 的逐页审阅',['tutorial-v04-p26','tutorial-v04-page-26','tutorial-v05-page-26'],'V05 的审阅确认已移除内部制作状态，但视觉与解释仍需改进。','本轮读取固定的历史审阅；没有重新渲染 V04/V05，也没有把局部内容修正升级成整套通过。',['stat-v04','stat-v05'],'recorded_result','mixed');
tutorial.entities['t-history-review'].facets.evidence.subjectRevision='t-historical-repair';
issue(tutorial,'t-stale-requirements','课程事实需要更新','tutorial-candidate','按当前要求更新第 35、37 页，重渲染后重新检查课程事实与整套叙事。',['stat-timetable','stat-recorded-stale'],'acceptance');
issue(tutorial,'t-zero-domain','验收程序需要修正定义域','tutorial-mechanical','先按实际声明确定要计算的量；未定义比值应有明确结果，不能任意补小常数。',['stat-finding'],'evidence');
tutorial.paths=[
 {id:'normal',label:'验收',steps:[step('tutorial-requirement','t-rule-check','确认当前要求','先分清当前课程事实、教学要求与模板。'),step('tutorial-candidate','t-candidate-check','绑定候选身份','同一文件、页序与统计对象进入检查。'),step('tutorial-page','t-candidate-page','检查实际页面','机械核对和专业判断分别保存证据。'),step('tutorial-sequence','t-candidate-story','读取完整叙事','单页正确仍需符合整套教学顺序。')]},
 {id:'repair',label:'返修',steps:[step('tutorial-finding','t-page-find','定位当前问题','第 35、37 页与当前课程决定不一致。'),step('tutorial-rerender','t-find-repair','返回原制作任务','只更新相关课程事实，保护已接受教学内容。'),step('tutorial-candidate','t-repair-candidate','生成新候选','修复待完成；新页图不能沿用旧页的视觉结论。'),step('tutorial-sequence','t-candidate-story','复验变化与保留项','重新看受影响页面和完整课件顺序。')]},
 {id:'preserve',label:'保护正确内容',steps:[step('tutorial-finding','t-find-repair','明确修改范围','修改课程安排不等于重写全部统计内容。'),step('tutorial-mechanical','t-check-find','保留独立数值证据','输入与算法均未变化的计算结果可保留。'),step('tutorial-page','t-candidate-page','重看受影响页','共享样式改变时扩大重渲染范围。'),step('tutorial-sequence','t-candidate-story','核对整体阅读','页序变化时重新审阅叙事。')]}
];
const tBefore=coreSnapshot(tutorial);tBefore.entities['tutorial-v04-p26'].description='V04 第 26 页使用内部制作状态组织课程说明。';tBefore.entities['tutorial-v04-p26'].facets.finding.status='historical_open';tBefore.entities['tutorial-v04-p26'].facets.finding.repair_completed=false;
const tAfter=coreSnapshot(tutorial);tAfter.entities['tutorial-v04-p26'].description='V05 第 26 页已移除内部制作状态；视觉与解释仍需改进。';tAfter.entities['tutorial-v04-p26'].facets.finding.objectIds=['tutorial-v05-page-26'];
revision(tutorial,'t-historical-repair','项目说明的局部返修',['tutorial-v04-p26'],tBefore,'学生页面需要直接说明课程内容，不需要制作过程状态。','历史逐页审阅指出第 26 页的内部状态和改稿说明。',['课程事实仍需权威来源','未批准的政策不能补写'],['第 26 页学生说明','页面阅读与整套课件审阅'],{after:tAfter,beforeLabel:'V04 · 第 26 页',afterLabel:'V05 · 第 26 页',beforeCommit:'c747870e294e784e89edf3ba92a5ad4a74a7ab2d',afterCommit:'ce896c8a11816ea0a5cd836b00554433b79a23fa',sourceIds:['stat-v04','stat-v05'],summary:'移除内部制作状态，保留学生需知内容。',alignment:'历史记录确认局部内容已修；后版视觉仍需改进，整套未据此通过。',provenance:'由 V04、V05 的原始候选与逐页审阅重建局部变化。两个来源提交对应课件身份，审阅记录保留自己的提交。'});

cat.views.system.projectedEntityIds=cat.views.system.projectedEntityIds.filter(id=>id!=='cat-laplace-withdrawn');
export const projects={da,mica,cat,tutorial};
export const projectOrder=['da','mica','cat','tutorial'];
export const impactEvidence=[{id:'numeric',label:'独立数值计算',dependencies:['statistical-input','algorithm']},{id:'local',label:'页面内容与事实',dependencies:['page-content','authority','statistical-input','algorithm']},{id:'render',label:'受影响页面的渲染与视觉',dependencies:['page-content','shared-style','statistical-input','algorithm']},{id:'story',label:'整套叙事与先修关系',dependencies:['page-content','order','authority','statistical-input','algorithm']},{id:'asset',label:'未修改的源资产',dependencies:['asset']}];

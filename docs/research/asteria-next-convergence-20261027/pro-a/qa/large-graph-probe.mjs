// Synthetic, bounded data-path probe. It does not mount React Flow or add a UI project.
// Run after prototype dependencies are installed:
//   node qa/large-graph-probe.mjs
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
import {performance} from 'node:perf_hooks';
import {coreSnapshot,graphObjects,semanticDiff,affectedEntities,MODEL_LIMITATIONS} from '../prototype/src/model-core.js';

const here=path.dirname(fileURLToPath(import.meta.url));
const require=createRequire(new URL('../prototype/package.json',import.meta.url));
const ELK=require('elkjs/lib/elk.bundled.js');
const elkPackage=require('elkjs/package.json');
const hash=value=>createHash('sha256').update(value).digest('hex');
const bytes=async relative=>fs.readFile(path.resolve(here,relative));
const round=value=>Math.round(value*10000)/10000;
const copy=value=>JSON.parse(JSON.stringify(value));
const timed=fn=>{const start=performance.now();const value=fn();return {value,elapsedMs:round(performance.now()-start)}};
const sameSet=(a,b)=>a.length===b.length&&a.every(value=>new Set(b).has(value));
const modelHashBefore=hash(await bytes('../prototype/src/model-core.js'));

function fixture(totalEntities) {
  const visibleCount=24,entities={},relations={},groups=Array.from({length:visibleCount},()=>[]);
  function entity(id,label) {
    entities[id]={id,kind:'component',label,description:'Synthetic probe object; no real architecture or implementation claim.',designState:'proposed',facets:{mechanism:{kind:'procedure',steps:['Receive a synthetic token.','Forward it along declared synthetic send edges.']}}};
  }
  function relation(id,sourceId,targetId) {
    relations[id]={id,type:'sends',sourceId,targetId,label:'合成信号',contract:{payload:{summary:'Synthetic token with no external effect.'},consumer:{entityId:targetId},trigger:'Synthetic source transition'}};
  }
  const visible=Array.from({length:visibleCount},(_,i)=>`layer-${String(i).padStart(2,'0')}`);
  visible.forEach((id,i)=>entity(id,`合成层 ${i+1}`));
  // Six layers of four visible objects; two forward connections per source.
  for(let layer=0;layer<5;layer++)for(let column=0;column<4;column++){
    const source=visible[layer*4+column];
    relation(`visible-${layer}-${column}-direct`,source,visible[(layer+1)*4+column]);
    relation(`visible-${layer}-${column}-cross`,source,visible[(layer+1)*4+(column+1)%4]);
  }
  const hiddenCount=totalEntities-visibleCount;
  const minimum=Math.floor(hiddenCount/visibleCount),remainder=hiddenCount%visibleCount;
  for(let group=0;group<visibleCount;group++){
    const count=minimum+(group<remainder?1:0);
    for(let j=0;j<count;j++){
      const id=`internal-${String(group).padStart(2,'0')}-${String(j).padStart(3,'0')}`;
      entity(id,`合成内部 ${group+1}.${j+1}`);
      groups[group].push(id);
      relation(`group-${group}-step-${j}`,j===0?visible[group]:groups[group][j-1],id);
    }
    for(let j=0;j+2<count;j+=2)relation(`group-${group}-skip-${j}`,groups[group][j],groups[group][j+2]);
  }
  // Internal consumers remain in the common model while absent from the system projection.
  for(let group=0;group+1<visibleCount;group++)relation(`internal-bridge-${group}`,groups[group].at(-1),groups[group+1][0]);
  return {
    project:{project:{id:`synthetic-probe-${totalEntities}`,title:'Synthetic bounded probe',currentRevision:'synthetic-current'},entities,relations,bindings:{},anchors:{},symbols:{},variants:{},revisions:{},views:{system:{id:'system',projectedEntityIds:visible}}},
    groups,
    visible
  };
}

function snapshots(data) {
  const before=coreSnapshot(data.project),after=copy(before),group=12;
  const removedEdgeId=`internal-bridge-${group}`;
  const deleted=after.relations[removedEdgeId];
  delete after.relations[removedEdgeId];
  after.entities[deleted.targetId].facets.mechanism.steps[0]='Receive a revised synthetic token.';
  return {before,after,seeds:[deleted.sourceId],scope:[deleted.sourceId,deleted.targetId],removedEdge:deleted,expectedConsumers:data.groups.slice(group+1).flat()};
}

function projectionOf(project,snapshot) {
  const projected=graphObjects({...project,...snapshot});
  return {nodes:projected.nodes,edges:projected.edges,snapshot:{relations:Object.fromEntries(projected.edges.map(edge=>[edge.id,edge]))}};
}

function impactProbe(data) {
  const state=snapshots(data);
  const query=timed(()=>affectedEntities(state.before,state.after,state.seeds));
  const afterOnly=timed(()=>affectedEntities(state.after,state.after,state.seeds));
  const beforeView=projectionOf(data.project,state.before),afterView=projectionOf(data.project,state.after);
  const visibleOnly=timed(()=>affectedEntities(beforeView.snapshot,afterView.snapshot,state.seeds));
  const diff=timed(()=>semanticDiff(state.before,state.after,state.scope));
  const ids=new Set(data.visible);
  return {
    scale:{entities:Object.keys(state.before.entities).length,relationsBefore:Object.keys(state.before.relations).length,relationsAfter:Object.keys(state.after.relations).length,systemProjectionNodes:beforeView.nodes.length,systemProjectionEdges:beforeView.edges.length},
    fixtureDigest:hash(JSON.stringify(data.project)),
    localScope:state.scope,
    removedEdge:{id:state.removedEdge.id,sourceId:state.removedEdge.sourceId,targetId:state.removedEdge.targetId},
    measurements:{fullOldNewUnionMs:query.elapsedMs,currentEdgesOnlyMs:afterOnly.elapsedMs,projectionEdgesOnlyMs:visibleOnly.elapsedMs,localSemanticDiffMs:diff.elapsedMs},
    observations:{
      candidateImpactCount:query.value.length,
      candidateImpactsOutsideSystemProjection:query.value.filter(id=>!ids.has(id)).length,
      expectedSyntheticConsumers:state.expectedConsumers.length,
      matchesConstructedConsumerSet:sameSet(query.value,state.expectedConsumers),
      deletedEdgeTargetRetained:query.value.includes(state.removedEdge.targetId),
      currentEdgesOnlyCount:afterOnly.value.length,
      projectionEdgesOnlyCount:visibleOnly.value.length,
      localDiff:diff.value.map(change=>({id:change.id,table:change.table,kind:change.kind})),
      sourceProjectStillHasRemovedEdge:Boolean(data.project.relations[state.removedEdge.id]),
      sourceProjectEntityCountUnchanged:Object.keys(data.project.entities).length===Object.keys(state.before.entities).length
    },
    scopeNote:'Only synthetic forward sends edges are used. Impact is the current model-core candidate traversal, not a production typed-impact engine or runtime causality proof.'
  };
}

function rectangleIntersections(nodes) {
  const pairs=[];
  for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
    const a=nodes[i],b=nodes[j];
    const width=Math.min(a.x+a.width,b.x+b.width)-Math.max(a.x,b.x);
    const height=Math.min(a.y+a.height,b.y+b.height)-Math.max(a.y,b.y);
    if(width>1e-6&&height>1e-6)pairs.push({a:a.id,b:b.id,width:round(width),height:round(height)});
  }
  return pairs;
}

const small=fixture(200);
const inputDigestBefore=hash(JSON.stringify(small.project));
const projectionResult=timed(()=>graphObjects(small.project));
const graph=projectionResult.value;
const elk=new ELK();
const layoutInput={
  id:'synthetic-projection-24',
  layoutOptions:{'elk.algorithm':'layered','elk.direction':'DOWN','elk.spacing.nodeNode':'60','elk.layered.spacing.nodeNodeBetweenLayers':'24','elk.edgeRouting':'ORTHOGONAL','elk.layered.considerModelOrder.strategy':'NODES_AND_EDGES'},
  children:graph.nodes.map(node=>({id:node.id,width:184,height:78})),
  edges:graph.edges.map(edge=>({id:edge.id,sources:[edge.sourceId],targets:[edge.targetId],labels:[{text:edge.label,width:66,height:22}]}))
};
const layoutStart=performance.now();
const layout=await elk.layout(layoutInput);
const layoutMs=round(performance.now()-layoutStart);
const placements=layout.children.map(({id,x,y,width,height})=>({id,x,y,width,height}));
const overlapPairs=rectangleIntersections(placements);
const finite=placements.every(node=>['x','y','width','height'].every(key=>Number.isFinite(node[key])));
const smallImpact=impactProbe(small);
const largeImpact=impactProbe(fixture(1600));
const modelHashAfter=hash(await bytes('../prototype/src/model-core.js'));
const result={
  probe:'synthetic-bounded-large-model-projection',
  runId:'pro-a',
  executedAt:new Date().toISOString(),
  purpose:'Measure the separation between a 200-entity common model, a 24-node system projection, and local old/new impact queries. A second 1600-entity case runs only queries.',
  environment:{node:process.version,v8:process.versions.v8,platform:process.platform,osRelease:os.release(),architecture:process.arch,logicalCpuCount:os.cpus().length,elkjs:elkPackage.version},
  reproducibility:{script:'qa/large-graph-probe.mjs',command:'node qa/large-graph-probe.mjs',workingDirectory:'Asteria Next pro-a candidate directory',modelCoreSha256:modelHashBefore,modelCoreUnchangedDuringRun:modelHashBefore===modelHashAfter,packageLockSha256:hash(await bytes('../prototype/package-lock.json')),scriptSha256:hash(await fs.readFile(fileURLToPath(import.meta.url))),generator:'Deterministic 24 visible nodes, internal chains and skips; no random input.'},
  timingProtocol:'Each reported measurement is one invocation in this run, with no warm-up or repeated-trial summary. Timings exclude fixture generation, module loading and serialization. ELK elapsed covers its first layout call after construction. No threshold, benchmark ranking or performance acceptance is defined.',
  layout:{
    fullModel:{entities:Object.keys(small.project.entities).length,relations:Object.keys(small.project.relations).length},
    visibleProjection:{nodes:graph.nodes.length,edges:graph.edges.length},
    measurements:{projectionMs:projectionResult.elapsedMs,elkLayoutMs:layoutMs},
    options:layoutInput.layoutOptions,
    geometry:{graphWidth:layout.width,graphHeight:layout.height,nodeBounds:{minX:Math.min(...placements.map(n=>n.x)),minY:Math.min(...placements.map(n=>n.y)),maxX:Math.max(...placements.map(n=>n.x+n.width)),maxY:Math.max(...placements.map(n=>n.y+n.height))},placements,finiteNodeGeometry:finite,nodeOverlapPairCount:overlapPairs.length,nodeOverlapPairs:overlapPairs,edgesWithSections:layout.edges.filter(edge=>edge.sections?.length).length},
    canonicalInputUnchanged:inputDigestBefore===hash(JSON.stringify(small.project)),
    collisionScope:'Axis-aligned node rectangles only; edge crossings, edge-label collisions, font metrics and browser rendering were not tested.'
  },
  impactQueries:[smallImpact,largeImpact],
  implementationLimitations:MODEL_LIMITATIONS,
  limitations:[
    'Synthetic fixtures are not one of the four reference projects and are never added to the product UI.',
    'Only 24 visible nodes were laid out; no 200-node or 1600-node browser rendering was performed.',
    'No React Flow interaction, frame rate, memory ceiling, mobile behavior or assistive-technology behavior was measured.',
    'The larger case runs only in-process candidate-impact and local-diff queries.',
    'No claim is made about thousand-node interaction, arbitrary graph shapes, real large-project usability or production readiness.',
    'Measured elapsed times are contextual observations and must not be used as final candidate ranking scores.'
  ]
};
await fs.writeFile(path.join(here,'large-graph-probe.json'),JSON.stringify(result,null,2)+'\n');
const a=smallImpact,b=largeImpact;
const markdown=`# 合成大模型的投影与查询探测\n\n本记录只检查一条有限的数据路线：共同模型保留完整对象，系统图只投影其中 24 个高层节点，局部影响查询继续读取完整前后关系。数据由脚本确定性生成，不代表真实项目，不加入四个 reference 的产品界面。\n\n使用本轮已经安装的 ELK.js ${elkPackage.version} 与当前 model-core；环境为 ${process.version} / ${process.platform} ${os.release()} / ${process.arch}。原始结果、代码摘要与运行时间保存在 [large-graph-probe.json](large-graph-probe.json)，复现脚本为 [large-graph-probe.mjs](large-graph-probe.mjs)。\n\n## 实际观察\n\n200 个实体、${a.scale.relationsBefore} 条关系的完整模型，生成 24 个节点、${graph.edges.length} 条关系的系统投影。ELK 实际执行 layered 与正交路由，图形几何边界为 ${layout.width.toFixed(2)} × ${layout.height}；节点矩形重叠对数为 ${overlapPairs.length}。投影耗时 ${projectionResult.elapsedMs} ms，首次布局调用耗时 ${layoutMs} ms。只检查了矩形几何，没有检查边交叉、标签、字体或浏览器可读性。\n\n在一个不可见的内部消费者入口删除关系，并修改该消费者的合成机制。以被删关系的产生方为查询起点，完整前后关系并集仍找出 ${a.observations.candidateImpactCount} 个构造时已知的下游对象，全部位于系统投影之外；仅使用当前边或可见边时分别为 ${a.observations.currentEdgesOnlyCount} 和 ${a.observations.projectionEdgesOnlyCount}。完整并集结果与构造的消费者集合${a.observations.matchesConstructedConsumerSet?'一致':'不一致'}，说明这个案例不会因删边或隐藏节点而漏掉旧消费路径。局部差异返回 ${a.observations.localDiff.length} 项变化。\n\n另运行了 1600 个实体、${b.scale.relationsBefore} 条关系的同类查询，没有布局或渲染这些对象。它返回 ${b.observations.candidateImpactCount} 个候选影响对象，与构造集合${b.observations.matchesConstructedConsumerSet?'一致':'不一致'}。两次完整并集查询分别耗时 ${a.measurements.fullOldNewUnionMs} ms 与 ${b.measurements.fullOldNewUnionMs} ms。\n\n## 能支持到什么程度\n\n这次观察支持所构造案例中“投影范围与全模型查询范围分离”的数据处理方式，以及旧关系参与删除影响追踪。模型只使用向前传递的合成 sends 关系；当前 affectedEntities 仍是候选范围遍历，不等同于正式按关系类型判断因果与证据失效。共同输入在投影与查询后${result.layout.canonicalInputUnchanged?'保持不变':'发生变化'}。\n\n本报告中的每项计时来自本次执行的一次调用，没有预热、重复统计或预设门槛。没有测量 React Flow 交互、帧率、内存上限、手机或屏幕阅读器，也没有证明千节点交互或真实大型项目可用。上述数字不作为最终候选优劣评分或验收结论。\n\n复现时在候选根目录运行：\n\n\`\`\`sh\nnode qa/large-graph-probe.mjs\n\`\`\`\n\n脚本仅更新本目录中的这份说明与 JSON 结果，不修改 UI、模型实现或四个参考项目。\n`;
await fs.writeFile(path.join(here,'large-graph-probe.md'),markdown);
console.log(JSON.stringify({synthetic:true,visibleNodes:graph.nodes.length,fullEntities:[a.scale.entities,b.scale.entities],fullRelations:[a.scale.relationsBefore,b.scale.relationsBefore],elkLayoutMs:layoutMs,nodeOverlapPairCount:overlapPairs.length,impactCounts:[a.observations.candidateImpactCount,b.observations.candidateImpactCount],constructedImpactSetsMatch:[a.observations.matchesConstructedConsumerSet,b.observations.matchesConstructedConsumerSet],output:'qa/large-graph-probe.json'},null,2));

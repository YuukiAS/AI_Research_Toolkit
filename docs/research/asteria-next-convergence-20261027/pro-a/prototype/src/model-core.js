// Pure projections over curated reference data; no repository is fetched or written.
// This deliberately remains smaller than the proposed production schema.
export const MODEL_LIMITATIONS = Object.freeze([
  'Reference checks only; no production schema migration or Architecture Freeze.',
  'Anchor checks verify declared identity and references, not remote content or fingerprints.',
  'A well-formed run/review can support a declared claim; scientific or product sufficiency remains a judgment.',
  'Diff covers entities, relations and bindings; symbols, variants and source digests need the production comparator.',
  'Impact is a candidate scope over declared dependencies, not proof of runtime causality or complete coverage.'
]);
const clone = value => JSON.parse(JSON.stringify(value));
const values = value => Object.values(value || {});
const list = value => Array.isArray(value) ? value : [];
const textPresent = value => typeof value === 'string' && value.trim().length > 0;
const own = (object,key) => Object.prototype.hasOwnProperty.call(object || {},key);
const subjectId = value => typeof value === 'string' ? value : value?.entityId;
const gitCommit = value => typeof value === 'string' && /^[0-9a-f]{40}$/i.test(value);
export function coreSnapshot(project) {
  return clone({entities:project.entities,relations:project.relations,bindings:project.bindings,anchors:project.anchors,variants:project.variants,symbols:project.symbols});
}
// Presentation/cache keys are specific to this reference format.
const omit = new Set(['position','size','presentation','updatedAt','generatedAt','selected','expanded','codeHtml','view','canonicalId','comparisonSide','context','diff']);
function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value==='object') return Object.fromEntries(Object.keys(value).filter(k=>!omit.has(k)).sort().map(k=>[k,canonical(value[k])]));
  return value;
}
export function semanticDiff(before,after,scope) {
  const result=[];
  for(const table of ['entities','relations','bindings']) {
    const left=before[table]||{}, right=after[table]||{};
    const ids=new Set([...Object.keys(left),...Object.keys(right)]);
    for(const id of ids) {
      const a=left[id],b=right[id];
      const inScope=scope.includes(id)||[a?.sourceId,a?.targetId,b?.sourceId,b?.targetId,a?.entityId,b?.entityId].some(x=>scope.includes(x));
      if(!inScope)continue;
      if(JSON.stringify(canonical(a))===JSON.stringify(canonical(b)))continue;
      result.push({id,table,kind:!a?'added':!b?'removed':'modified',before:a,after:b});
    }
  }
  return result;
}
export function affectedEntities(before,after,seeds) {
  // The old graph stays in the union so deleting a consumer edge cannot erase impact.
  const edges=[...Object.values(before.relations||{}),...Object.values(after.relations||{})].filter(r=>r.impact!=='none');
  const visited=new Set(seeds), queue=[...seeds];
  while(queue.length){const id=queue.shift();for(const edge of edges)if(edge.sourceId===id&&!visited.has(edge.targetId)){visited.add(edge.targetId);queue.push(edge.targetId);}}
  return [...visited].filter(id=>!seeds.includes(id));
}
export function entityBindings(project,id){return values(project.bindings).filter(binding=>binding.entityId===id)}
export function evidenceFor(project,id){return values(project.entities).filter(entity=>list(entity.facets?.evidence?.subjects).some(subject=>subjectId(subject)===id))}

const resultKinds = new Set(['run','mechanical_run','runtime_observation','review','semantic_review','scientific_review','visual_review']);
const definitionRoles = new Set(['test','test_definition','definition','design_reference','requirement_source']);
function supportsCurrentClaim(project,record,id) {
  const evidence=record.facets?.evidence;
  if(!evidence||!resultKinds.has(evidence.kind)||evidence.result!=='pass')return false;
  if(own(evidence,'outcome')&&evidence.outcome!=='pass')return false;
  if(!textPresent(project.project?.currentRevision)||evidence.subjectRevision!==project.project.currentRevision)return false;
  if(!list(evidence.subjects).some(subject=>subjectId(subject)===id&&(typeof subject==='string'||!subject.revisionId||subject.revisionId===project.project.currentRevision))||!textPresent(evidence.method))return false;
  const producer=typeof evidence.producer==='string'?evidence.producer:evidence.producer?.name;
  if(!textPresent(producer)&&!textPresent(evidence.reviewer))return false;
  // A test definition/source read cannot become a run receipt by adding pass.
  const resultAnchors=[...list(evidence.resultAnchorIds),...list(evidence.artifactAnchorIds)];
  return resultAnchors.length>0&&resultAnchors.every(id=>{
    const anchor=project.anchors?.[id];
    return anchor&&!definitionRoles.has(anchor.role)&&!['code','test','test_definition'].includes(anchor.kind);
  });
}
function isGitAnchor(anchor) {
  return own(anchor,'commit')||Boolean(anchor.repository)||anchor.kind==='code'||/https?:\/\/(?:github\.com|gitlab\.com)\/[^\s]+\/(?:blob|tree|commit|raw)\//.test(anchor.url||'')||/^https?:\/\/raw\.githubusercontent\.com\//.test(anchor.url||'');
}

export function validateProject(project={}) {
  const findings=[],seen=new Set();
  const add=(id,target,message)=>{
    const key=`${id}\0${target}\0${message}`;
    if(!seen.has(key)){seen.add(key);findings.push({id,target,message,type:'mechanical'});}
  };
  const entities=project.entities||{},anchors=project.anchors||{};
  const anchorArrays=new Set(['anchorIds','sourceIds','sourceRefs','methodAnchorIds','artifactAnchorIds','resultAnchorIds']);
  const evidenceArrays=new Set(['evidenceRefs','evidenceIds']);
  const entityArrays=new Set(['objectIds','requirementIds']);
  function checkReferences(value,owner,tables) {
    if(!value||typeof value!=='object')return;
    for(const [key,field] of Object.entries(value)){
      if(key==='before'||key==='after')continue;
      if(key==='anchorId'){
        if(!textPresent(field)||!tables.anchors[field])add('anchor',owner,`来源引用不存在：${String(field)}。`);
      }else if(anchorArrays.has(key)||evidenceArrays.has(key)||entityArrays.has(key)){
        if(!Array.isArray(field)){add('reference-shape',owner,`${key} 应为引用列表。`);continue;}
        for(const reference of field){
          const id=typeof reference==='string'?reference:reference?.anchorId||reference?.entityId||reference?.id;
          if(anchorArrays.has(key)&&!tables.anchors[id])add('anchor',owner,`来源引用不存在：${String(id)}。`);
          if(evidenceArrays.has(key)&&!tables.entities[id]?.facets?.evidence)add('evidence-reference',owner,`证据引用不存在或不是结果记录：${String(id)}。`);
          if(entityArrays.has(key)&&!tables.entities[id])add('entity-reference',owner,`对象引用不存在：${String(id)}。`);
        }
      }
      checkReferences(field,owner,tables);
    }
  }
  function checkAnchors(table,prefix=''){
    for(const [id,anchor] of Object.entries(table||{}))if(isGitAnchor(anchor)&&!gitCommit(anchor.commit))add('commit',prefix+id,'Git 来源没有固定到完整的 40 位提交。');
  }
  function checkEntityReferences(entity,tables,owner=entity.id){
    checkReferences(entity,owner,tables);
    const evidence=entity.facets?.evidence;
    if(evidence){
      if(!Array.isArray(evidence.subjects)||evidence.subjects.length===0)add('evidence-subject',owner,'证据没有明确的被观察对象。');
      for(const subject of list(evidence.subjects))if(!tables.entities[subjectId(subject)])add('evidence-subject',owner,`证据对象不存在：${String(subjectId(subject))}。`);
    }
    const finding=entity.facets?.finding;
    if(finding){
      if(finding.subject&&!tables.entities[subjectId(finding.subject)])add('finding-subject',owner,'发现所指的对象不存在。');
      if(finding.projectionOwner&&!tables.entities[finding.projectionOwner])add('entity-reference',owner,'发现的展示归属不存在。');
      for(const id of [finding.source,finding.after_source,finding.authority_anchor,finding.code,...list(finding.artifact_anchors)].filter(Boolean))if(!tables.anchors[id])add('anchor',owner,`发现的来源引用不存在：${id}。`);
    }
    if(entity.facets?.issue?.target&&!tables.entities[entity.facets.issue.target])add('issue-target',owner,'问题所指的对象不存在。');
    if(entity.facets?.artifact?.parentId&&!tables.entities[entity.facets.artifact.parentId])add('artifact-parent',owner,'产物对象的父对象不存在。');
  }

  checkAnchors(anchors);
  for(const entity of values(entities)){
    if(entity.designState==='accepted'&&entity.facets?.contract?.critical&&!textPresent(entity.facets?.mechanism?.kind)&&!textPresent(entity.facets?.contract?.blackBoxReason))add('mechanism',entity.id,'关键组件还没有机制或明确的外部契约。');
    if(entity.facets?.implementationClaim==='linked'&&!entityBindings(project,entity.id).length)add('binding',entity.id,'声称有实现，但没有固定来源绑定。');
    if(entity.facets?.verificationClaim==='validated'&&!evidenceFor(project,entity.id).some(record=>supportsCurrentClaim(project,record,entity.id)))add('evidence',entity.id,'验证声明缺少当前对象的明确运行或审阅结果、方法、评审者及结果产物。');
    checkEntityReferences(entity,{entities,anchors});
  }
  for(const relation of values(project.relations)){
    if(!entities[relation.sourceId]||!entities[relation.targetId])add('endpoint',relation.id,'关系端点不存在。');
    const payload=relation.contract?.payload;
    if(['transfers','emits','commands','constrains','sends','calls','produces_for'].includes(relation.type)&&!textPresent(typeof payload==='string'?payload:payload?.summary))add('payload',relation.id,'关系没有说明传递的数据或约束。');
    if(['transfers','emits','commands','sends','calls','produces_for'].includes(relation.type)){
      const consumer=relation.contract?.consumer;
      if(!textPresent(typeof consumer==='string'?consumer:consumer?.entityId))add('consumer',relation.id,'关系还没有明确的消费位置。');
      else if(typeof consumer==='object'&&!entities[consumer.entityId])add('consumer',relation.id,'消费者所指的对象不存在。');
    }
    checkReferences(relation,relation.id,{entities,anchors});
  }
  for(const binding of values(project.bindings)){
    if(!entities[binding.entityId])add('binding-entity',binding.entityId||binding.id,'实现绑定的对象不存在。');
    if(!anchors[binding.anchorId])add('anchor',binding.entityId||binding.id,'实现绑定的来源不存在。');
    checkReferences(binding,binding.entityId||binding.id,{entities,anchors});
  }
  for(const [viewId,view] of Object.entries(project.views||{}))for(const id of list(view.projectedEntityIds))if(!entities[id])add('projection',viewId,`视图中的对象不存在：${id}。`);
  for(const id of list(project.questions))if(!entities[id])add('issue-reference',id,'问题列表引用的对象不存在。');
  for(const path of list(project.paths))for(const step of list(path.steps)){
    if(!entities[step.node])add('path-node',path.id,`阅读路径的对象不存在：${step.node}。`);
    if(step.edge&&!project.relations?.[step.edge])add('path-edge',path.id,`阅读路径的关系不存在：${step.edge}。`);
  }
  for(const revision of values(project.revisions)){
    const target=list(revision.scope)[0]||revision.id;
    if(!textPresent(revision.reason)||!textPresent(revision.trigger))add('revision-reason',target,'修订缺少原因或触发依据。');
    const nonemptyTextList=value=>Array.isArray(value)&&value.length>0&&value.every(textPresent);
    if(revision.major&&(!nonemptyTextList(revision.impact)||!nonemptyTextList(revision.unchanged)))add('revision-impact',target,'重要修订没有交代影响与保留边界。');
    for(const id of [revision.parentId,...list(revision.parentIds)].filter(Boolean))if(!project.revisions?.[id])add('revision-parent',target,'修订的父对象不存在。');
    for(const key of ['beforeCommit','afterCommit'])if(own(revision,key)&&!gitCommit(revision[key]))add('revision-commit',target,'修订的源码截面没有完整固定提交。');
    checkReferences(revision,target,{entities,anchors});
    for(const side of ['before','after']){
      const snapshot=revision[side];
      if(!snapshot){add('revision-snapshot',target,`修订缺少 ${side} 截面。`);continue;}
      const tables={entities:snapshot.entities||{},anchors:snapshot.anchors||{}};
      checkAnchors(tables.anchors,`${revision.id}:${side}:`);
      for(const entity of values(tables.entities))checkEntityReferences(entity,tables,`${revision.id}:${side}:${entity.id}`);
      for(const relation of values(snapshot.relations)){
        if(!tables.entities[relation.sourceId]||!tables.entities[relation.targetId])add('revision-endpoint',target,`${side} 截面的关系端点不存在：${relation.id}。`);
        checkReferences(relation,target,tables);
      }
      for(const binding of values(snapshot.bindings)){
        if(!tables.entities[binding.entityId]||!tables.anchors[binding.anchorId])add('revision-binding',target,`${side} 截面的绑定对象或来源不存在：${binding.id}。`);
        checkReferences(binding,target,tables);
      }
    }
  }
  return findings;
}

export function evidenceImpact(change=[],records=[]){
  const changed=new Set(change);
  return records.map(record=>{
    const dependencies=list(record.dependencies),known=dependencies.filter(textPresent),touched=known.filter(id=>changed.has(id));
    const incomplete=!Array.isArray(record.dependencies)||known.length===0||known.length!==dependencies.length||record.dependenciesComplete===false||list(record.unknownDependencies).length>0;
    return {id:record.id,label:record.label,status:touched.length?'rerun':incomplete?'unknown':'retain',reason:touched};
  });
}
export function revisionChanges(project,revision){return revision?semanticDiff(revision.before,revision.after,revision.scope):[]}
export function graphObjects(project){
  const ids=new Set(list(project.views?.system?.projectedEntityIds));
  return {nodes:[...ids].map(id=>project.entities?.[id]).filter(Boolean),edges:values(project.relations).filter(relation=>ids.has(relation.sourceId)&&ids.has(relation.targetId))};
}

/** Current projection is context; only scoped history replaces it.
 * Retargeting uses two display IDs. Use canonicalId for semantic selection.
 * Context is never called unchanged: it was not compared as a historical whole.
 */
export function comparisonObjects(project,revision){
  const base=graphObjects(project);
  if(!revision)return {...base,changes:[]};
  const before=revision.before||{},after=revision.after||{},scope=new Set(revision.scope||[]);
  const changes=revisionChanges(project,revision);
  const nodeChanges=new Map(changes.filter(change=>change.table==='entities').map(change=>[change.id,change]));
  const edgeChanges=changes.filter(change=>change.table==='relations'),changedEdgeIds=new Set(edgeChanges.map(change=>change.id));
  const nodes=new Map(base.nodes.map(entity=>[entity.id,{...entity,canonicalId:entity.id,comparisonSide:'context',context:true}]));
  for(const id of scope){
    const next=after.entities?.[id],previous=before.entities?.[id];
    if(!next&&!previous)continue;
    nodes.set(id,{...(next||previous),canonicalId:id,comparisonSide:next?'after':'before',context:false,...(nodeChanges.has(id)?{diff:nodeChanges.get(id).kind}:{})});
  }
  const unresolvedEndpointIds=new Set();
  function ensureEndpoint(id){
    if(nodes.has(id))return true;
    const next=after.entities?.[id],current=project.entities?.[id],previous=before.entities?.[id];
    const entity=next||current||previous;
    if(!entity){unresolvedEndpointIds.add(id);return false;}
    const change=nodeChanges.get(id);
    nodes.set(id,{...entity,canonicalId:id,comparisonSide:scope.has(id)?(next?'after':'before'):(next||current?'context':'before'),context:!scope.has(id),...(change?{diff:change.kind}:{})});
    return true;
  }
  const comparisonEdges=[];
  function addEdge(relation,canonicalId,side,diff,displayId=canonicalId){
    const hasSource=ensureEndpoint(relation.sourceId),hasTarget=ensureEndpoint(relation.targetId);
    if(hasSource&&hasTarget)comparisonEdges.push({...relation,id:displayId,canonicalId,comparisonSide:side,context:false,diff});
  }
  for(const change of edgeChanges){
    const a=change.before,b=change.after;
    if(a&&b&&(a.sourceId!==b.sourceId||a.targetId!==b.targetId)){
      addEdge(a,change.id,'before','removed',`${change.id}::before`);
      addEdge(b,change.id,'after','added',`${change.id}::after`);
    }else if(b)addEdge(b,change.id,'after',change.kind);
    else if(a)addEdge(a,change.id,'before','removed');
  }
  // Never spread complete historical relations over current out-of-scope context.
  const contextEdges=values(project.relations).filter(relation=>!changedEdgeIds.has(relation.id)&&nodes.has(relation.sourceId)&&nodes.has(relation.targetId)).map(relation=>({...relation,canonicalId:relation.id,comparisonSide:'context',context:true}));
  return {nodes:[...nodes.values()],edges:[...contextEdges,...comparisonEdges],changes,unresolvedEndpointIds:[...unresolvedEndpointIds]};
}

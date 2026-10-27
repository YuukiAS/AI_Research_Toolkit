// Small, deterministic operations on explicitly authored semantics.
// These functions do not infer architecture or approve a design.
export const canonical = value => {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(k=>[k,canonical(value[k])]));
  return value;
};
export const equal = (a,b) => JSON.stringify(canonical(a))===JSON.stringify(canonical(b));
const sorted = a => [...(a||[])].sort();
const withoutAnchors = blocks => (blocks||[]).map(b=>{
  const {anchors, ...rest}=b;
  if(rest.items) rest.items=rest.items.map(({anchors,...item})=>item);
  return rest;
});
const componentFields = c => ({
  role:c.role, owner:c.owner||null, design:c.design?.state,
  mechanism:withoutAnchors(c.mechanism),
  implementation:{state:c.implementation?.state,anchors:sorted(c.implementation?.anchors)},
});
const relationFields = r => ({from:r.from,to:r.to,object:r.object,at:r.at,kind:r.kind,reality:r.reality});
function compareCollection(before,after,project){
  const b=new Map(before.map(x=>[x.id,x])); const a=new Map(after.map(x=>[x.id,x]));
  return [...new Set([...b.keys(),...a.keys()])].map(id=>{
    if(!b.has(id))return {id,status:'added',before:null,after:a.get(id),fields:[]};
    if(!a.has(id))return {id,status:'removed',before:b.get(id),after:null,fields:[]};
    const bp=project(b.get(id)),ap=project(a.get(id));
    const fields=Object.keys(ap).filter(k=>!equal(bp[k],ap[k]));
    return {id,status:fields.length?'changed':'unchanged',before:b.get(id),after:a.get(id),fields};
  });
}
export function semanticDiff(before,after){
  const scope=Array.isArray(before.scope)?before.scope:Array.isArray(after.scope)?after.scope:null;
  const components=compareCollection(before.components,after.components,componentFields);
  const relations=compareCollection(before.relations,after.relations,relationFields);
  if(scope){
    for(const c of components)if(!scope.includes(c.id)){c.rawStatus=c.status;c.status='context';}
    for(const e of relations)if(![e.before?.from,e.before?.to,e.after?.from,e.after?.to].some(id=>scope.includes(id))){e.rawStatus=e.status;e.status='context';}
  }
  return {components,relations,scope:scope||'system'};
}
export function affectedConsumers(before,after,seeds){
  // Union is necessary: deletion must not make an old consumer disappear.
  const edges=[...before.relations,...after.relations];
  const seen=new Set(seeds),queue=[...seeds];
  while(queue.length){const n=queue.shift();for(const e of edges)if(e.from===n&&!seen.has(e.to)){seen.add(e.to);queue.push(e.to);}}
  return [...seen];
}
export function evidenceMeaning(e){
  return ({source:'源码事实','test-definition':'测试定义','reported-test':'历史测试记录','design-review':'设计审查','repository-record':'仓库修复记录',review:'独立审查',investigation:'机制调查','experiment-report':'实验记录',proposal:'设计候选','design-record':'设计记录','source-conflict':'来源冲突'})[e.basis]||'来源记录';
}
export function safeSourceURL(raw){
  try{const u=new URL(raw);return u.protocol==='https:'&&u.hostname==='github.com'&&!u.username&&!u.password?u.href:null;}catch{return null;}
}
export function validateProject(p){
  const errors=[],warnings=[];
  const error=(code,object,message)=>errors.push({code,object,message});
  const warn=(code,object,message)=>warnings.push({code,object,message});
  const aid=new Set(Object.keys(p.anchors||{})),eids=new Set((p.evidence||[]).map(x=>x.id));
  const checkRefs=(refs,owner)=>{for(const r of refs||[])if(!aid.has(r))error('UNKNOWN_ANCHOR',owner,r);};
  for(const [id,a] of Object.entries(p.anchors||{})){
    if(!/^[a-f0-9]{40}$/.test(a.commit||''))error('UNPINNED_SOURCE',id,'来源必须固定完整提交。');
    if(!safeSourceURL(a.url))error('UNSAFE_SOURCE_URL',id,'来源链接必须是固定的 GitHub HTTPS 链接。');
    else {
      const u=new URL(a.url),expected=a.path?`/${a.repo}/blob/${a.commit}/${a.path}`:`/${a.repo}/commit/${a.commit}`;
      if(decodeURI(u.pathname)!==expected)error('SOURCE_URL_MISMATCH',id,'来源 URL 与仓库、固定提交或路径不一致。');
      if(a.lines?.length&&u.hash!==`#L${a.lines[0]}-L${a.lines[1]}`)error('SOURCE_RANGE_MISMATCH',id,'来源行范围与链接不一致。');
    }
    if((a.path||'').split('/').includes('..'))error('PATH_TRAVERSAL',id,'拒绝越界路径。');
    if(a.visibility==='private'&&(a.preview||a.excerpt))error('PRIVATE_EXCERPT',id,'公开数据不能带入私有源码摘录。');
  }
  for(const ev of p.evidence||[]){
    checkRefs(ev.anchors,ev.id);
    if(!ev.claim||!ev.limits)error('UNSCOPED_EVIDENCE',ev.id,'证据必须说明支持什么和边界。');
  }
  const revisionIds=new Set();
  for(const r of p.revisions||[]){
    if(revisionIds.has(r.id))error('DUPLICATE_REVISION',r.id,'修订身份重复。');revisionIds.add(r.id);
    const ids=new Set();
    for(const c of r.components){
      if(ids.has(c.id))error('DUPLICATE_COMPONENT',c.id,'同一修订中身份重复。');ids.add(c.id);
      checkRefs(c.design.refs,c.id);checkRefs(c.implementation.anchors,c.id);
      if(![null,'proposed','accepted','retired'].includes(c.design.state))error('UNKNOWN_DESIGN_STATE',c.id,'未知的设计状态。');
      if(!['located','partial','absent','unmapped','external'].includes(c.implementation.state))error('UNKNOWN_IMPLEMENTATION_STATE',c.id,'未知的实现状态，不能绕过已有实现检查。');
      if(['located','partial'].includes(c.implementation.state)&&!(c.implementation.anchors||[]).some(x=>['code','selector','config'].includes(p.anchors[x]?.kind)))error('IMPLEMENTATION_WITHOUT_SOURCE',c.id,'已有实现必须绑定代码、selector 或配置，测试定义不能替代实现。');
      for(const ev of c.evidence||[])if(!eids.has(ev))error('UNKNOWN_EVIDENCE',c.id,ev);
      if(c.detail&&!c.mechanism?.length)error('NO_MECHANISM',c.id,'本范围的关键组件不能只留下高层职责。');
      for(const b of c.mechanism||[]){checkRefs(b.anchors,c.id);for(const s of b.items||[])checkRefs(s.anchors,c.id);}
      if(c.implementation.state==='absent')warn('IMPLEMENTATION_PENDING',c.id,'设计存在，实现仍未建立。');
    }
    const edgeIds=new Set();
    for(const e of r.relations){
      if(edgeIds.has(e.id))error('DUPLICATE_RELATION',e.id,'关系身份重复。');edgeIds.add(e.id);
      if(!ids.has(e.from)||!ids.has(e.to))error('DANGLING_RELATION',e.id,'关系端点不存在。');
      if(!e.object?.trim())error('UNKNOWN_PAYLOAD',e.id,'必须说明传递对象或依赖语义。');
      if(!e.at?.trim())warn('UNKNOWN_INTERACTION_POINT',e.id,'交互点尚未明确。');
      checkRefs(e.anchors,e.id);
    }
    if(Array.isArray(r.scope))for(const id of r.scope)if(!ids.has(id))error('UNKNOWN_REVISION_SCOPE',r.id,id);
  }
  const objectIds=new Set((p.revisions||[]).flatMap(r=>r.components.map(c=>c.id)));
  for(const c of p.changes||[]){
    if(!c.reason?.trim()||!c.scope?.length)error('UNEXPLAINED_CHANGE',c.id,'变更必须说明原因和对象范围。');
    for(const id of c.scope||[])if(!objectIds.has(id))error('UNKNOWN_CHANGE_SCOPE',c.id,id);
    if(!(c.triggers?.length||c.decisionAnchors?.length))error('MISSING_CHANGE_BASIS',c.id,'变更需要触发证据或有来源的明确决定。');
    for(const ev of c.triggers||[])if(!eids.has(ev))error('UNKNOWN_TRIGGER',c.id,ev);
    checkRefs(c.anchors,c.id);checkRefs(c.decisionAnchors,c.id);checkRefs(c.beforeAnchors,c.id);checkRefs(c.afterAnchors,c.id);
    if(!c.historyOnly&&(!revisionIds.has(c.from)||!revisionIds.has(c.to)))error('UNKNOWN_REVISION',c.id,'系统比较必须指向已有修订。');
  }
  if(p.revisions?.length>1){
    const first=p.revisions[0],last=p.revisions.at(-1),diff=semanticDiff(first,last);
    const active=(p.changes||[]).filter(c=>!c.historyOnly&&c.from===first.id&&c.to===last.id),covered=new Set(active.flatMap(c=>c.scope));
    const changed=x=>['added','removed','changed'].includes(x.status);
    if([...diff.components,...diff.relations].some(changed)&&!active.length)error('MISSING_CHANGE_RECORD',last.id,'所选前后版本发生变化，必须留下有范围和依据的变更记录。');
    for(const c of diff.components)if(changed(c)&&!covered.has(c.id))error('UNCOVERED_COMPONENT_CHANGE',c.id,'组件变化未被对应修订记录覆盖。');
    for(const e of diff.relations)if(changed(e)&&![e.before?.from,e.before?.to,e.after?.from,e.after?.to].some(id=>covered.has(id)))error('UNCOVERED_RELATION_CHANGE',e.id,'关系变化未被对应修订记录覆盖。');
    for(const x of [...diff.components,...diff.relations])if(x.status==='context'&&x.rawStatus!=='unchanged')error('CONTEXT_DIVERGED',x.id,'局部历史中的当前上下文意外改变；扩大范围并补依据，或恢复同一上下文。');
  }
  return {errors,warnings};
}
export function validateHistoryUpdate(base,next){
  const errors=[];
  for(const old of base.changes||[]){
    const now=(next.changes||[]).find(c=>c.id===old.id);
    if(!now)errors.push({code:'HISTORY_REMOVED',object:old.id});
    else if(!equal(old,now))errors.push({code:'HISTORY_REWRITTEN',object:old.id});
  }
  for(const kind of ['anchors','evidence','revisions']){
    const oldItems=Array.isArray(base[kind])?base[kind]:Object.values(base[kind]||{});
    const newItems=Array.isArray(next[kind])?next[kind]:Object.values(next[kind]||{});
    for(const old of oldItems){
      const now=newItems.find(x=>x.id===old.id);
      if(!now||!equal(old,now))errors.push({code:'FROZEN_SOURCE_REWRITTEN',kind,object:old.id});
    }
  }
  return errors;
}
export function scopedEvidenceUsable(evidence,observed){
  // A test definition or source inspection never becomes runtime proof.
  if(evidence.basis!=='runtime-run')return {usable:false,reason:'NOT_RUNTIME_EVIDENCE'};
  for(const key of ['candidate','standard','runner','observer','conditions']){
    if(!evidence.binding?.[key]||!observed[key])return {usable:false,reason:'MISSING_BINDING',key};
    if(evidence.binding[key]!==observed[key])return {usable:false,reason:'BINDING_CHANGED',key};
  }
  return {usable:true,reason:'SAME_DECLARED_SCOPE'};
}
export function locateExactFragment(anchor,files,renames={}){
  // This small demonstrator offers a candidate, not a semantic rename approval.
  if(!anchor.quote)return {status:'unresolved',reason:'NO_TRUSTED_FRAGMENT'};
  const path=Object.hasOwn(files,anchor.path)?anchor.path:renames[anchor.path];
  if(!path||!Object.hasOwn(files,path))return {status:'unresolved',reason:'PATH_NOT_FOUND'};
  const text=files[path],hits=[];let start=0;
  while(true){const pos=text.indexOf(anchor.quote,start);if(pos<0)break;hits.push(pos);start=pos+1;}
  if(hits.length!==1)return {status:hits.length?'ambiguous':'unresolved',reason:hits.length?'MULTIPLE_MATCHES':'FRAGMENT_CHANGED',count:hits.length};
  return {status:path===anchor.path?'exact':'candidate-rebind',path,line:text.slice(0,hits[0]).split('\n').length,requiresSemanticReview:path!==anchor.path};
}

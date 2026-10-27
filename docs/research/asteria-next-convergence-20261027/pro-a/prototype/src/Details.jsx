import React,{useState} from 'react';
import {ArrowUpRight,ArrowLeft,ArrowRight,ExternalLink,GitCommitHorizontal,ChevronDown,ChevronRight,X,Braces,BookOpen,FileText,ArrowDown,Link,AlertCircle} from 'lucide-react';
import katex from 'katex';
import generated from './generated.js';
import {entityBindings,evidenceFor,revisionChanges,affectedEntities,evidenceImpact} from './model-core.js';
import {impactEvidence} from './reference-data.js';

export function SourceLink({anchor,label}){return anchor?.url?<a className="source-link" href={anchor.url} target="_blank" rel="noopener noreferrer">{label||anchor.label||anchor.symbol||anchor.path?.split('/').pop()||'查看来源'}<ArrowUpRight size={14}/></a>:null;}
function Formula({formula}){return <div className="formula" dangerouslySetInnerHTML={{__html:katex.renderToString(formula,{throwOnError:false,trust:false,output:'htmlAndMathml',displayMode:true,maxSize:10,maxExpand:1000})}}/>;}
export function Mechanism({entity,project,onSelect}){
 const m=entity.facets?.mechanism;if(!m)return <p className="body-copy">当前对象保留在原始来源中，尚未展开内部机制。</p>;
 if(m.kind==='finding')return <ArtifactFinding project={project} findingId={m.findingId} onSelect={onSelect}/>;
 if(m.kind==='artifact')return <div className="artifact-mechanism"><div className="artifact-pages">{m.pages.map(page=>{const content=<><span className="page-number">{page.number}</span><div><strong>{page.label}</strong>{page.objects.map((o,i)=><span key={i}>{o}</span>)}</div>{page.state==='attention'?<AlertCircle size={17}/>:<ArrowUpRight size={17}/>}</>;return page.state==='attention'?<button key={page.number} className={`page-object ${page.state}`} onClick={()=>onSelect('tutorial-v14-obsolete-assessment')}>{content}</button>:<a key={page.number} className={`page-object ${page.state}`} href={project.anchors['stat-page10']?.url} target="_blank" rel="noopener noreferrer" aria-label="打开第 10 页原图">{content}</a>})}</div>{entity.id==='tutorial-page'&&<p className="small-note">这里按对象定位；完整页面可从来源打开。</p>}</div>;
 if(m.kind==='contract')return <dl className="contract-list">{m.facts.map(([name,value])=><React.Fragment key={name}><dt>{name}</dt><dd>{value}</dd></React.Fragment>)}</dl>;
 return <div className={`mechanism ${m.kind}`}>
  {m.formula&&<><Formula formula={m.formula}/><p className="small-note">{m.formulaMeaning}</p></>}
  <ol className="mechanism-steps">{m.steps?.map((text,i)=><li key={i}><span className="step-marker">{i+1}</span><p>{text}</p></li>)}</ol>
  {m.selector&&<div className="selector"><span>识别规则</span><code>{m.selector}</code></div>}
  {!!m.bounds?.length&&<div className="bounds">{m.bounds.map(x=><span key={x}>{x}</span>)}</div>}
  {m.boundary&&<p className="boundary">{m.boundary}</p>}
  {!!m.invariants?.length&&<details className="quiet-details"><summary>保持的行为</summary><ul>{m.invariants.map(x=><li key={x}>{x}</li>)}</ul></details>}
 </div>;
}
export function Implementation({entity,project,onSelect}){
 const all=entityBindings(project,entity.id),references=all.filter(b=>['design_reference','result_source'].includes(b.role));
 const bindings=all.filter(b=>!['design_reference','result_source'].includes(b.role));const [active,setActive]=useState(0);const b=bindings[Math.min(active,bindings.length-1)];const a=b&&project.anchors[b.anchorId];
 if(entity.kind==='finding'){
  const finding=entity.facets.finding;
  return <div className="finding-locations"><h3>相关对象</h3>{finding.objectIds.map(id=><button className="location-link" key={id} onClick={()=>onSelect(id)}>{project.entities[id]?.label}<ChevronRight size={15}/></button>)}<h3>对应要求</h3>{finding.requirementIds.map(id=><button className="location-link" key={id} onClick={()=>onSelect(id)}>{project.entities[id]?.label}<ChevronRight size={15}/></button>)}<div className="source-links">{finding.sourceIds.map(id=><SourceLink key={id} anchor={project.anchors[id]}/>)}</div></div>;
 }
 if(!bindings.length)return <div className="implementation-empty"><Braces size={28}/><h3>{project.project.id==='da'?'实现尚未接入':entity.id==='cat-zero'?'生产算法尚未冻结':'这里还没有实现绑定'}</h3><p>{entity.id==='mica.adapter'?'统一适配层已写进新规格，当前源码仍采用原有选择器与内容脚本。':entity.id==='cat-zero'?'已有数学目标与候选路线；误差、导数和成本验证完成后，再确定生产例程。':'现有对象没有对应的执行实现。机制与设计依据仍可单独查看。'}</p>{entity.id==='mica.adapter'&&<SourceLink anchor={project.anchors['mica-adapter-spec']} label="查看适配层设计"/>}{references.length>0&&<div className="reference-sources"><h3>设计与研究来源</h3><div className="source-links">{references.map(r=><SourceLink key={r.id} anchor={project.anchors[r.anchorId]}/>)}</div></div>}</div>;
 return <div className="implementation"><label className="input-label" htmlFor={`anchor-${entity.id}`}>来源位置</label><select id={`anchor-${entity.id}`} value={Math.min(active,bindings.length-1)} onChange={e=>setActive(Number(e.target.value))}>{bindings.map((binding,i)=>{const a=project.anchors[binding.anchorId];return <option key={binding.id} value={i}>{a.symbol||a.path?.split('/').pop()||a.label||'来源'}</option>})}</select>
  <div className="source-heading"><span className="file-path">{a.path||a.label}</span><SourceLink anchor={a} label="打开"/></div>
  {a.symbol&&<h3 className="symbol-name">{a.symbol}</h3>}
  <div className="source-meta"><GitCommitHorizontal size={14}/><code>{a.commit?.slice(0,10)}</code><span>{a.access==='source_permissions'?'按原仓库权限访问':a.kind==='artifact'?'固定文件':generated.code[a.id]?'源码节选':'固定源码'}</span></div>
  {generated.code[a.id]?<div className="code-window" dangerouslySetInnerHTML={{__html:generated.code[a.id]}}/>:<p className="body-copy">{a.access==='source_permissions'?'打开原仓库可查看完整定义、检查与结果。当前页面保留对象定位。':'此来源提供契约或结果。打开固定版本查看原文。'}</p>}
  <div className="binding-role"><strong>对应关系</strong><p>{b.role==='consumption'?'这一位置消费上游传递的对象。':b.role==='test'?'这是测试定义；执行结果另见证据。':b.role==='artifact_source'?'这是对应版本的原始页面，保留文件位置和候选身份。':b.role==='requirement_source'?'这是当前要求所依据的冻结材料。':b.role==='probe'?'这是反例探针；它用于检验旧路线，不是生产算法。':`绑定到「${entity.label}」的${b.role==='definition'?'定义':b.role==='entrypoint'?'执行入口':'内部处理'}。`}</p></div>
 </div>;
}
export function Evidence({entity,project}){
 const records=evidenceFor(project,entity.id);
 if(!records.length)return <div className="empty-copy"><h3>验证依据仍需补齐</h3><p>机制和来源可以先确定；运行结果或专业审阅需要绑定到实际候选。</p></div>;
 return <div className="evidence-list">{records.map(record=>{const ev=record.facets.evidence;return <article className="evidence-record" key={record.id}><div className="evidence-kind">{{mechanical_run:'机械运行',source_check:'来源核对',counterexample:'反例',recorded_result:'已有结果记录',semantic_review:'专业判断',review:'独立审查'}[ev.kind]||'依据'}</div><h3>{record.label}</h3><p>{record.description}</p><p className="small-note">{ev.details}</p><div className="source-links">{ev.anchorIds.map(id=><SourceLink key={id} anchor={project.anchors[id]}/>)}</div>{record.id==='mica-hotpath'&&<p className="evidence-origin">本轮制作者运行 · 2026-10-27 · 既有本地合成输入用例</p>}</article>})}</div>;
}
function Synopsis({value}){if(!value)return <span className="small-note">此版本没有该对象</span>;const mechanism=value.facets?.mechanism;return <>{value.label&&<strong>{value.label}</strong>}{value.contract?.payload?<p>{value.contract.payload}<br/><span className="small-note">消费：{value.contract.consumer||'未指定'}</span></p>:mechanism?.steps?<ul>{mechanism.steps.map((s,i)=><li key={i}>{s}</li>)}</ul>:<p>{value.description||value.id}</p>}</>;}
function BindingSynopsis({binding,snapshot}){const a=snapshot.anchors[binding?.anchorId];return a?<><strong>{a.symbol}</strong><p className="file-path">{a.path}</p><SourceLink anchor={a} label={`${a.commit.slice(0,10)} · 打开固定源码`}/></>:<span className="small-note">这个版本没有相应的已重建绑定</span>}
export function DiffSelection({project,revision,selected,onClose,onCurrent}){
 const canonicalId=selected.replace(/::(before|after)$/,'');const change=revisionChanges(project,revision).find(c=>c.id===canonicalId);
 const current=project.entities[canonicalId]||project.relations[canonicalId],historic=revision.before.entities[canonicalId]||revision.before.relations[canonicalId];
 const value=change?.after||change?.before||current||historic;if(!value)return null;
 return <section className="diff-selection" aria-label="选中对象的变化"><div className="inspector-heading"><h3>{value.label||project.anchors[value.anchorId]?.symbol}</h3><button className="icon-button" aria-label="关闭变化详情" onClick={onClose}><X size={18}/></button></div>{change?<><p className="small-note">{selected.endsWith('::before')?'选中修订前关系。':selected.endsWith('::after')?'选中修订后关系。':''}只比较本次修订范围。</p><div className="before-after"><div className="before"><span className="diff-label">之前</span>{change.table==='bindings'?<BindingSynopsis binding={change.before} snapshot={revision.before}/>:<Synopsis value={change.before}/>}</div><div className="after"><span className="diff-label">之后</span>{change.table==='bindings'?<BindingSynopsis binding={change.after} snapshot={revision.after}/>:<Synopsis value={change.after}/>}</div></div></>:<><p className="small-note">当前上下文；这次修订没有对它作历史比较。</p><p className="body-copy">{value.description||value.contract?.payload}</p>{current&&<button className="text-button" onClick={()=>onCurrent(canonicalId)}>查看当前对象<ArrowRight size={14}/></button>}</>}</section>;
}
export function RevisionDetail({project,revision,compact=false,onSelect,compare,setCompare}){
 if(!revision)return <div className="empty-copy"><h3>当前对象尚无相关修订记录</h3></div>;
 const changes=revisionChanges(project,revision);const impacts=affectedEntities(revision.before,revision.after,revision.scope);
 return <div className={`revision-detail ${compact?'compact':''}`}>
  <div className="revision-range"><span>{revision.beforeLabel}</span><ArrowRight size={17}/><span>{revision.afterLabel}</span></div>
  <h3>{revision.title}</h3>{revision.summary&&<p className="body-copy">{revision.summary}</p>}
  {revision.provenance&&<p className="revision-provenance">{revision.provenance}</p>}
  <div className="cause"><span>为什么改</span><p>{revision.trigger}</p><p>{revision.reason}</p></div>
  {!compact&&<div className="diff-comparison">{changes.filter(c=>c.table!=='bindings').map(c=><article key={c.id} className="diff-item"><h4>{c.after?.label||c.before?.label||c.id}<span>{{added:'新增',removed:'撤销',modified:'修改'}[c.kind]}</span></h4><div className="before-after"><div className="before"><span className="diff-label">之前</span><Synopsis value={c.before}/></div><div className="after"><span className="diff-label">之后</span><Synopsis value={c.after}/></div></div></article>)}</div>}
  {!compact&&changes.some(c=>c.table==='bindings')&&<section className="source-changes"><h4>实现变化</h4>{changes.filter(c=>c.table==='bindings').map(c=><div className="source-change-row" key={c.id}><strong>{revision.after.anchors[c.after?.anchorId]?.symbol||revision.before.anchors[c.before?.anchorId]?.symbol}</strong><SourceLink anchor={revision.before.anchors[c.before?.anchorId]}/><SourceLink anchor={revision.after.anchors[c.after?.anchorId]}/></div>)}</section>}
  {compact&&onSelect&&<button className="text-button" onClick={()=>onSelect(revision.id,'revision')}>查看前后差异<ArrowRight size={15}/></button>}
  <details className="quiet-details" open={!compact}><summary>保持的内容</summary><ul>{revision.unchanged.map(text=><li key={text}>{text}</li>)}</ul></details>
  <details className="quiet-details"><summary>下游检查范围</summary><p className="small-note">{revision.impact.join('、')}。</p>{impacts.length>0&&<p className="small-note">声明关系中还涉及：{impacts.map(id=>project.entities[id]?.label||id).join('、')}。这是待核对范围。</p>}</details>
  {revision.alignment&&<p className="boundary">{revision.alignment}</p>}
  <div className="source-links">{(revision.sourceIds||[]).map(id=><SourceLink key={id} anchor={project.anchors[id]}/>)}{revision.compareUrl&&<a className="source-link" href={revision.compareUrl} target="_blank" rel="noopener noreferrer">源码前后对照<ArrowUpRight size={14}/></a>}</div>
  <p className="historical-scope">历史范围仅含所选机制；图中其他组件提供当前上下文。</p>
 </div>;
}
export function ArtifactFinding({project,findingId,onSelect}){
 const [impact,setImpact]=useState('authority');const findings=(project.views.findings?.projectedEntityIds||[]).map(id=>project.entities[id].facets.finding);const f=findings.find(x=>x.id===findingId)||findings[0];if(!f)return null;
 const changes={authority:['authority','page-content'],style:['shared-style'],order:['order'],science:['statistical-input','algorithm']};
 const affected=evidenceImpact(changes[impact],impactEvidence);
 return <div className="artifact-finding"><label className="input-label" htmlFor="finding-select">问题</label><select id="finding-select" value={f.id} onChange={e=>onSelect(e.target.value)}>{findings.map((f,i)=><option value={f.id} key={f.id}>{f.title}</option>)}</select>
   <div className="finding-location"><FileText size={17}/><strong>{f.object}</strong></div><p>{f.explanation}</p><dl className="finding-facts"><dt>发现依据</dt><dd>{f.discovered_by}</dd><dt>当前情况</dt><dd>{f.status==='historical_locally_corrected'?'历史记录确认局部内容已修；整页仍需改进。':f.attribution==='validator_defect'?'验收程序需修复；不能据此判课件错误。':'课件仍待更新，修复尚未完成。'}</dd></dl>
   {f.objectIds?.length>0&&<div className="finding-objects">{f.objectIds.map(id=><button key={id} className="text-button" onClick={()=>onSelect(id)}>{project.entities[id]?.label}<ChevronRight size={14}/></button>)}</div>}
   <div className="source-links">{[f.source,f.after_source,f.authority_anchor,f.code,...(f.artifact_anchors||[])].filter(Boolean).map(id=><SourceLink key={id} anchor={project.anchors[id]}/>)}</div>
   {f.repair_proposal&&<div className="repair-plan"><h3>修复范围</h3><p>{f.repair_proposal}</p><ol className="repair-loop"><li>原制作任务</li><li>生成新候选</li><li>重渲染与复验</li></ol><details className="quiet-details"><summary>需要保留</summary><ul>{f.protected?.map(x=><li key={x}>{x}</li>)}</ul></details></div>}
   <div className="impact-preview"><h3>变更影响预览</h3><select aria-label="选择变更类型" value={impact} onChange={e=>setImpact(e.target.value)}><option value="authority">更新页面与课程要求</option><option value="style">修改共享问答样式</option><option value="order">仅交换页面顺序</option><option value="science">修改统计模型或数据</option></select><ul>{affected.map(e=><li key={e.id} className={e.status}><span>{e.label}</span><strong>{e.status==='rerun'?'需复验':e.status==='unknown'?'待核对':'可保留¹'}</strong></li>)}</ul><p className="small-note">¹ 对应输入、内容与依赖均未变化时。此处只预览影响，不执行修复。</p></div>
 </div>;
}
export default function Inspector({project,selected,tab,setTab,onSelect,onClose,onRevision}){
 const entity=project.entities[selected],relation=project.relations[selected];
 if(!entity&&!relation)return null;
 if(relation)return <aside className="inspector" aria-label="关系详情"><div className="inspector-heading"><span className="section-overline">关系</span><button className="icon-button" aria-label="关闭详情" onClick={onClose}><X size={19}/></button></div><h2>{relation.label}</h2><div className="relation-endpoints"><button onClick={()=>onSelect(relation.sourceId)}>{project.entities[relation.sourceId]?.label}</button><ArrowDown size={20}/><button onClick={()=>onSelect(relation.targetId)}>{project.entities[relation.targetId]?.label}</button></div><div className="relation-contract"><h3>传递</h3><p>{relation.contract?.payload}</p><h3>接收与用途</h3><p>{relation.contract?.consumer}</p>{relation.contract?.failure&&<p className="boundary">{relation.contract.failure}</p>}</div><div className="source-links">{relation.anchorIds?.map(id=><SourceLink key={id} anchor={project.anchors[id]}/>)}</div>{project.project.id==='da'&&<p className="boundary">这条接线属于设计方案，普通入口尚待实测。</p>}</aside>;
 const rev=Object.values(project.revisions).find(r=>r.scope.includes(entity.id));
 const issues=project.questions.map(id=>project.entities[id]).filter(q=>q.facets.issue.target===entity.id);
 const relations=Object.values(project.relations).filter(r=>r.sourceId===entity.id||r.targetId===entity.id);
 return <aside className="inspector" aria-label="组件详情"><div className="inspector-heading"><span className="section-overline">{{artifact:'产物',requirement:'要求',algorithm:'算法',model:'模型',finding:'问题',external:'外部边界'}[entity.kind]||'组件'}</span><button className="icon-button" aria-label="关闭详情" onClick={onClose}><X size={19}/></button></div><h2>{entity.label}</h2>{entity.kind!=='finding'&&<p className="object-description">{entity.description}</p>}<nav className="detail-tabs" aria-label="组件内容">{[['mechanism',entity.kind==='finding'?'问题':'机制'],['implementation',entity.kind==='artifact'?'文件':entity.kind==='requirement'?'依据':entity.kind==='finding'?'定位':'实现'],['evidence','证据'],['evolution','演进']].map(([key,label])=><button key={key} className={tab===key?'active':''} onClick={()=>setTab(key)} aria-current={tab===key?'page':undefined}>{label}</button>)}</nav><div className="detail-body" key={entity.id+tab}>
  {tab==='mechanism'&&<><Mechanism entity={entity} project={project} onSelect={onSelect}/>{issues.map(q=><div className="open-issue" key={q.id}><AlertCircle size={17}/><div><strong>{q.label}</strong><p>{q.description}</p></div></div>)}</>}
  {tab==='implementation'&&<Implementation entity={entity} project={project} onSelect={onSelect}/>}
  {tab==='evidence'&&<Evidence entity={entity} project={project}/>}
  {tab==='evolution'&&<RevisionDetail project={project} revision={rev} compact onSelect={onRevision}/>}
 </div>{relations.length>0&&<div className="local-links"><span>相邻关系</span>{relations.map(r=><button key={r.id} onClick={()=>onSelect(r.id)}>{r.label}<ChevronRight size={14}/></button>)}</div>}</aside>;
}

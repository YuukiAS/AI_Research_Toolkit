(() => {
  'use strict';
  const data=JSON.parse(document.getElementById('architecture-data').textContent);
  const $=s=>document.querySelector(s);
  const h=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon=(name,cls='')=>`<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">${({arrow:'<path d="M7 17 17 7M7 7h10v10"/>',code:'<path d="m8 7-5 5 5 5m8-10 5 5-5 5m-5 2 2-14"/>',map:'<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M6 9v9h9M9 6h9v9"/>',diff:'<path d="M7 3v18m10-18v18M4 7l3-3 3 3m4 10 3 3 3-3"/>',chevron:'<path d="m8 5 7 7-7 7"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',history:'<path d="M3 11a9 9 0 1 1 2 7M3 4v7h7m2-4v6l4 2"/>',search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>'})[name]||''}</svg>`;
  let state={project:'mica',revision:'mica-current',compare:false,path:'all',selected:'mica.connector-continuity',selectionType:'component',tab:'mechanism',anchor:null,sourceFilter:'all',showSources:false,expanded:false};
  const project=()=>data.projects.find(p=>p.id===state.project);
  const revision=()=>project().revisions.find(r=>r.id===state.revision)||project().revisions.at(-1);
  const current=()=>project().revisions.at(-1);
  const before=()=>project().revisions[0];
  const allComponents=()=>new Map([...before().components,...current().components].map(c=>[c.id,c]));
  const selectedComponent=()=>revision().components.find(c=>c.id===state.selected)||allComponents().get(state.selected);
  const aLabel=a=>a.title||a.symbol||a.path.split('/').at(-1);
  const stateText={proposed:'设计候选',accepted:'设计已采纳',retired:'已撤销',located:'源码已定位',partial:'局部实现',absent:'尚无实现',unmapped:'实现尚未核对',external:'外部边界'};
  const deltaText={added:'新增',removed:'撤销',changed:'修改',unchanged:'保持'};
  const fieldText={role:'职责',owner:'归属',design:'设计状态',mechanism:'机制',implementation:'实现绑定',from:'来源组件',to:'消费组件',object:'传递对象',at:'交互点',kind:'关系类型',reality:'接通状态'};
  function refs(ids,label){
    return [...new Set(ids||[])].filter(id=>project().anchors[id]).map(id=>`<button class="anchor-link" data-anchor="${h(id)}">${icon('code')}<span>${h(label||aLabel(project().anchors[id]))}</span></button>`).join('');
  }
  function statusLine(c){
    const basis=c.design?.state?stateText[c.design.state]:'据源码回建';
    return `<dl class="status-line"><div><dt>设计</dt><dd>${h(basis)}</dd></div><div><dt>实现</dt><dd>${h(stateText[c.implementation?.state]||'尚未核对')}</dd></div><div><dt>证据</dt><dd>${h(c.evidence?.length?'按范围查看':'未单独验证')}</dd></div></dl>`;
  }
  function evidenceBlock(ids){
    const items=(ids||[]).map(id=>project().evidence.find(e=>e.id===id)).filter(Boolean);
    if(!items.length)return '';
    return `<section class="evidence-block"><h3>证据能说明什么</h3>${items.map(e=>`<div class="evidence-item"><div class="eyebrow">${h(evidenceMeaning(e))}</div><h4>${h(e.title)}</h4><p>${h(e.claim)}</p><p class="muted">${h(e.limits)}</p><div class="inline-refs">${refs(e.anchors.slice(0,3))}</div></div>`).join('')}</section>`;
  }
  function mechanismBlock(b){
    if(['steps','sequence','algorithm'].includes(b.type))return `<ol class="mechanism ${b.type}">${b.items.map((s,i)=>`<li><span class="step-mark">${String(i+1).padStart(2,'0')}</span><div><h4>${h(s.title)}</h4><p>${h(s.body)}</p><div class="inline-refs">${refs(s.anchors)}</div></div></li>`).join('')}</ol>`;
    if(b.type==='prose')return `<div class="prose-block"><p>${h(b.body)}</p><div class="inline-refs">${refs(b.anchors)}</div></div>`;
    if(b.type==='contract')return `<section class="contract"><h3>${h(b.title)}</h3><dl>${b.rows.map(row=>`<div><dt>${h(row[0])}</dt><dd>${h(row[1])}</dd></div>`).join('')}</dl><div class="inline-refs">${refs(b.anchors)}</div></section>`;
    if(b.type==='state')return `<section class="state-block"><div class="state-map">${b.states.map((s,i)=>`${i?'<span class="state-arrow" aria-hidden="true">→</span>':''}<span>${h(s)}</span>`).join('')}</div><details><summary>查看状态转移</summary><dl class="transitions">${b.transitions.map(t=>`<div><dt>${h(t[0])} → ${h(t[1])}</dt><dd>${h(t[2])}</dd></div>`).join('')}</dl></details><p class="boundary-note">${h(b.exit)}</p></section>`;
    if(b.type==='formula')return `<section class="formula-block"><div class="eyebrow">${h(b.title)}</div><div class="formula" role="math" aria-label="${h(b.math)}">${h(b.math)}</div><p>${h(b.body)}</p><div class="inline-refs">${refs(b.anchors)}</div></section>`;
    return `<p>${h(b.body||'该展示类型尚未实现。')}</p>`;
  }
  function sourceEntry(id){
    const a=project().anchors[id];if(!a)return '';
    const url=safeSourceURL(a.url);
    const type={code:'函数',selector:'选择器',config:'配置',test:'测试定义',design:'设计来源',decision:'设计决定',review:'审查',document:'源文档',evidence:'记录'}[a.kind]||a.kind;
    return `<article class="source-entry ${state.anchor===id?'source-selected':''}" id="source-${h(id)}"><div class="source-meta"><span>${h(type)}${a.visibility==='private'?' · 需原仓库权限':''}</span><span>${h(a.commit.slice(0,7))}${a.lines?.length?' · L'+a.lines[0]+'–'+a.lines[1]:''}</span></div><h4>${h(aLabel(a))}</h4><div class="source-path">${h(a.path||a.repo+' / commit')}</div>${a.preview?`<details class="source-preview"><summary>固定提交的源码片段</summary><pre><code>${h(a.preview)}</code></pre><small>从上述提交生成的只读预览；完整定义以源码为准。</small></details>`:''}${url?`<a class="external-link" href="${h(url)}" target="_blank" rel="noopener noreferrer" data-source-id="${h(id)}">${a.kind==='code'||a.kind==='selector'?'打开源码':'打开原始来源'} ${icon('arrow')}</a>`:''}</article>`;
  }
  function implementationPanel(c){
    const blockRefs=(c.mechanism||[]).flatMap(b=>[...(b.anchors||[]),...(b.items||[]).flatMap(i=>i.anchors||[])]);
    const evRefs=(c.evidence||[]).flatMap(id=>project().evidence.find(e=>e.id===id)?.anchors||[]);
    let ids=[...new Set([...(c.implementation.anchors||[]),...blockRefs,...(c.design.refs||[]),...evRefs])];
    if(state.anchor&&!ids.includes(state.anchor))ids.unshift(state.anchor);
    const groups={code:['code','config'],selector:['selector'],test:['test'],design:['design','document','decision','review','evidence']};
    const shown=ids.filter(id=>project().anchors[id]&&(state.sourceFilter==='all'||groups[state.sourceFilter].includes(project().anchors[id].kind)));
    return `${['absent','unmapped'].includes(c.implementation.state)?`<div class="empty-implementation"><span class="empty-symbol">—</span><h3>${c.implementation.state==='absent'?'尚无实现锚点':'此处尚未建立实现绑定'}</h3><p>${h(c.implementation.note)}</p></div>`:`<p class="panel-intro">${h(c.implementation.note||'固定提交定位来源；代码存在不等于已运行验证。')}</p>`}<div class="source-filters" role="group" aria-label="来源类型">${Object.entries({all:'全部',code:'函数',selector:'选择器',test:'测试',design:'设计与记录'}).map(([key,label])=>`<button data-source-filter="${key}" aria-pressed="${state.sourceFilter===key}">${label}</button>`).join('')}</div><div class="source-list">${shown.length?shown.map(sourceEntry).join(''):'<p class="empty-text">这个范围没有此类来源。</p>'}</div>${evidenceBlock(c.evidence)}`;
  }
  function changeDetail(ch,compact=false){
    return `<article class="change-detail"><div class="eyebrow">${h(({ 'bug-fix':'机制修复','architecture-revision':'职责修订','design-correction':'设计纠正','implementation-revision':'算法实现修订','rejected-route':'路线撤销'})[ch.kind]||'变更')}</div><h3>${h(ch.title)}</h3><p class="change-reason">${h(ch.reason)}</p>${ch.before?`<div class="before-after"><section><span>以前</span><h4>${h(ch.beforeTitle)}</h4><p>${h(ch.before)}</p>${refs(ch.beforeAnchors)}</section><section><span>现在</span><h4>${h(ch.afterTitle)}</h4><p>${h(ch.after)}</p>${refs(ch.afterAnchors)}</section></div>`:''}<div class="change-lists"><section><h4>具体改变</h4><ul>${ch.changed.map(x=>`<li>${h(x)}</li>`).join('')}</ul></section><section><h4>保持不变</h4><ul>${ch.unchanged.map(x=>`<li>${h(x)}</li>`).join('')}</ul></section></div><div class="implementation-followup"><h4>实现是否跟上</h4><p>${h(ch.implementation)}</p></div><p class="capability-effect"><strong>对用户或科学目标的影响</strong> ${h(ch.capabilityEffect)}</p>${compact?'':evidenceBlock(ch.triggers)}<div class="inline-refs">${refs(ch.anchors)}</div></article>`;
  }
  function historyPanel(c){
    const changes=project().changes.filter(ch=>ch.scope.includes(c.id));
    return changes.length?`<p class="panel-intro">当前结论保持在机制页。这里展开影响这个组件的修订及依据。</p>${changes.map(ch=>changeDetail(ch)).join('')}`:`<div class="empty-history"><h3>本切片没有单独修订记录</h3><p>未录入不等于历史从未改变。本原型只整理已核对的代表性修订。</p><button class="text-button" data-action="compare">查看项目版本比较 ${icon('diff')}</button></div>`;
  }
  function inspector(){
    if(state.showSources)return `<aside class="inspector" aria-label="来源与边界"><div class="inspector-head"><div class="eyebrow">读取范围</div><h2>来源与证据边界</h2><button class="icon-button close-panel" data-action="sources" aria-label="返回组件">${icon('close')}</button></div><div class="inspector-body"><p>${h(project().scope)}</p><div class="source-snapshot"><span>源码观察</span><strong>${h(project().observed.repo)}</strong><code>${h(project().observed.commit)}</code><p>${h(project().observed.note)}</p></div>${project().notices.map(n=>`<section class="notice"><h3>${h(n.title)}</h3><p>${h(n.body)}</p>${refs(n.anchors)}</section>`).join('')}<p class="muted small">本页为研究映射。只读页面不修改仓库、不运行产品、不授予审批。来源快照固定于 2026 年 10 月 27 日。</p></div></aside>`;
    if(state.selectionType==='relation'){
      const e=(state.compare?[...current().relations,...before().relations].find(x=>x.id===state.selected&&x.from===state.edgeFrom&&x.to===state.edgeTo):revision().relations.find(x=>x.id===state.selected))||revision().relations.find(x=>x.id===state.selected)||before().relations.find(x=>x.id===state.selected);
      const comps=allComponents();
      return `<aside class="inspector" aria-label="关系详情"><div class="inspector-head"><button class="back-system text-button" data-action="back-system">← 返回系统概览</button><div class="eyebrow">组件之间的真实交互点</div><h2>${h(e.label)}</h2><p class="relation-route">${h(comps.get(e.from)?.title)} ${icon('chevron')} ${h(comps.get(e.to)?.title)}</p></div><div class="inspector-body"><section class="relation-body"><h3>传递什么</h3><p>${h(e.object)}</p><h3>在哪里交互</h3><p>${h(e.at)}</p><div class="boundary-note">${e.reality==='proposed'?'这条关系仍是设计依赖；没有据此声称实际已接通。':'已核对源码中的关系；运行是否发生需要相应观察证据。'}</div><div class="inline-refs">${refs(e.anchors)}</div><button class="text-button" data-select-node="${h(e.to)}">进入消费组件 ${icon('chevron')}</button></section></div></aside>`;
    }
    const c=selectedComponent();
    return `<aside class="inspector" aria-label="组件详情"><div class="inspector-head"><button class="back-system text-button" data-action="back-system">← 返回系统概览</button><div class="eyebrow">${c.tag?h(c.tag)+' · ':''}${c.kind==='boundary'?'系统边界':'组件下钻'}</div><h2>${h(c.title)}</h2><p>${h(c.role)}</p>${statusLine(c)}</div><div class="inspector-tabs" role="tablist" aria-label="组件深度">${[['mechanism','内部机制'],['implementation','实现与证据'],['history','演进']].map(([id,label])=>`<button id="tab-${id}" role="tab" aria-selected="${state.tab===id}" aria-controls="detail-panel" data-tab="${id}">${label}</button>`).join('')}</div><div class="inspector-body" id="detail-panel" role="tabpanel" aria-labelledby="tab-${state.tab}">${state.tab==='implementation'?implementationPanel(c):state.tab==='history'?historyPanel(c):`${c.mechanism.map(mechanismBlock).join('')}${c.open?.length?`<section class="open-boundary"><h3>当前边界</h3><ul>${c.open.map(x=>`<li>${h(x)}</li>`).join('')}</ul></section>`:''}<button class="drill-link" data-tab="implementation">继续到真实实现 ${icon('chevron')}</button>`}</div></aside>`;
  }
  function comparison(){
    const diff=semanticDiff(before(),current());
    const modified=diff.components.filter(x=>['added','removed','changed'].includes(x.status));
    const er=diff.relations.filter(x=>['added','removed','changed'].includes(x.status));
    const changes=project().changes.filter(c=>!c.historyOnly);
    const seeds=[...new Set([...changes.flatMap(ch=>ch.scope),...er.flatMap(e=>[e.before?.from,e.before?.to,e.after?.from,e.after?.to]).filter(Boolean)])];
    const affected=affectedConsumers(before(),current(),seeds).filter(id=>!seeds.includes(id));
    const comps=allComponents();
    return `<section class="comparison-summary"><div class="section-title"><h2>这次修订改变了什么</h2><span>${modified.length} 个组件 · ${er.length} 条关系</span></div><div class="delta-objects">${modified.map(x=>`<button data-select-node="${h(x.id)}"><span class="delta-mark">Δ</span>${h((x.after||x.before).title)}<small>${x.fields.map(f=>fieldText[f]).join('、')}</small></button>`).join('')}</div>${er.length?`<details class="relation-changes" open><summary>关系变化</summary>${er.map(x=>`<button data-select-edge="${h(x.id)}"><span class="delta-mark ${x.status}">${x.status==='removed'?'−':x.status==='added'?'+':'Δ'}</span><span>${h((x.after||x.before).label)}</span><small>${h(deltaText[x.status])}${x.status==='changed'?' · '+x.fields.map(f=>fieldText[f]).join('、'):''}</small></button>`).join('')}</details>`:''}${changes.map(ch=>`<div class="change-overview"><h3>${h(ch.title)}</h3><p>${h(ch.reason)}</p><div class="change-actions"><button class="text-button" data-open-change="${h((ch.focus||ch.scope)[0])}">原因、证据与不变项 ${icon('chevron')}</button><span>${h(ch.implementation)}</span></div></div>`).join('')}<details class="impact"><summary>可能受影响的下游 · ${affected.length} 个</summary><p>按改动前后关系的并集推导，供检查影响；不自动成为必须运行的测试清单。</p><div class="impact-list">${affected.map(id=>`<button data-select-node="${h(id)}">${h(comps.get(id)?.title||id)}</button>`).join('')||'<span>本图没有声明其他下游；未知依赖仍需调查。</span>'}</div></details><p class="unchanged-note">${diff.scope==='system'?diff.components.filter(x=>x.status==='unchanged').length+' 个组件在本次比较中保持不变。':diff.components.filter(x=>x.status==='context').length+' 个组件仅作当前上下文，不作历史未变判断。'} 源代码细节可在组件内打开固定提交。</p></section>`;
  }
  function overviewNotes(){
    return `<section class="reading-notes"><div class="section-title"><h2>从整体到真实实现</h2><span>先看当前，历史按需展开</span></div><div class="reading-flow"><span>选择组件</span>${icon('chevron')}<span>理解内部机制</span>${icon('chevron')}<span>定位源码与证据</span></div><p>${h(project().scope)}</p>${project().notices.slice(0,1).map(n=>`<div class="inline-notice"><span class="notice-dot"></span><div><strong>${h(n.title)}</strong><p>${h(n.body)}</p></div></div>`).join('')}<div class="component-index"><h3>可直接下钻</h3>${current().components.filter(c=>c.detail&&!c.layer).map(c=>`<button data-select-node="${h(c.id)}">${h(c.title)} ${icon('chevron')}</button>`).join('')}</div></section>`;
  }
  function mobileSystem(p,r){
    const selectedPath=state.path==='all'?null:p.paths.find(x=>x.id===state.path);
    const diff=semanticDiff(before(),current());
    return `<div class="mobile-system-list"><div class="mobile-list-heading"><span>紧凑阅读</span><small>组件 ${r.components.length} · 关系 ${r.relations.length}</small></div><div class="mobile-components">${r.components.map(c=>{const d=diff.components.find(x=>x.id===c.id);return `<button data-select-node="${h(c.id)}" class="${state.selected===c.id?'selected':''} ${selectedPath&&!selectedPath.nodes.includes(c.id)?'path-muted':''}"><strong>${h(c.title)}</strong><small>${state.compare&&d?.status==='context'?'当前上下文':h(stateText[c.implementation.state]||'外部边界')}</small></button>`;}).join('')}</div><button class="text-button" data-action="mobile-graph">${state.mobileGraph?'收起横向架构图':'查看横向架构图'} ${icon('map')}</button></div>`;
  }
  function render(preserveFocus=null){
    const p=project(),r=revision();
    document.title='架构工作集 · '+p.title;
    $('#app').innerHTML=`<div class="app-shell"><nav class="project-rail" aria-label="项目"><a class="brand" href="#project=mica">${icon('map')}<span>架构工作集</span></a><div class="rail-label">项目</div><div class="project-list">${data.projects.map((x,i)=>`<button id="project-${x.id}" data-project="${x.id}" aria-current="${x.id===p.id?'page':'false'}"><span class="project-letter">${['M','D','C'][i]}</span><span><strong>${h(x.title)}</strong><small>${h(x.subtitle.split(' · ')[1])}</small></span></button>`).join('')}</div><div class="rail-footer"><div class="rail-line"></div><span>设计 · 实现 · 演进</span><small>独立研究 / pro-a</small><button class="text-button" data-action="sources">来源与边界 ${icon('arrow')}</button></div></nav><main id="workspace"><header class="workspace-header"><div><div class="eyebrow">${h(p.subtitle)}</div><h1>${h(p.title)}</h1><p>${h(p.tagline)}</p></div><div class="header-aside"><button id="source-button" class="text-button" data-action="sources">${icon('code')} 固定来源 ${h(p.observed.commit.slice(0,7))}</button><small>读取于 ${h(p.observed.date)} · 只读研究原型</small></div></header><div class="workspace-toolbar"><label class="version-control"><span>版本</span><select id="revision-select" aria-label="选择架构修订">${p.revisions.map(v=>`<option value="${h(v.id)}" ${v.id===r.id?'selected':''}>${h(v.label)}</option>`).join('')}</select></label><button id="compare-button" class="compare-button" data-action="compare" aria-pressed="${state.compare}">${icon('diff')} ${state.compare?'正在比较前后':'与上一版比较'}</button><div class="toolbar-spacer"></div><span class="toolbar-hint">${state.compare?'同一坐标，保留变化':'点击组件、连线或路径'}</span><button class="icon-button expand-map" data-action="expand" aria-label="${state.expanded?'恢复详情布局':'展开架构图'}">${icon('map')}</button></div><div class="revision-context ${r.scope==='system'?'':'historical'}"><span>${r.scope==='system'?'当前范围':'局部历史'}</span><p>${h(r.context)}</p></div><div class="workspace-grid ${state.expanded?'map-expanded':''}"><section class="system-pane" aria-label="系统架构"><div class="graph-heading"><div><h2>${state.compare?'版本变化':'系统概览'}</h2><small>${state.compare?h(before().label)+' → '+h(current().label):'组件、依赖与系统边界'}</small></div><div class="graph-legend">${state.compare?'<span><i class="legend-change"></i>修改</span><span><i class="legend-remove"></i>撤销</span>':'<span><i></i>已有来源</span><span><i class="legend-design"></i>设计关系</span>'}</div></div><div class="path-controls" role="group" aria-label="阅读路径"><button data-path="all" aria-pressed="${state.path==='all'}">整体</button>${p.paths.map(x=>`<button data-path="${h(x.id)}" aria-pressed="${state.path===x.id}">${h(x.label)}</button>`).join('')}</div>${mobileSystem(p,r)}<div class="graph-stage ${state.mobileGraph?'show-mobile-map':''}" id="graph-stage">${p.svg}</div><div class="path-caption">${state.path==='all'?`<span>${icon('map')}</span> ${state.compare?'只对已核实范围比较；修改原因在下方和组件演进页展开。':'实线与虚线说明接通状态。选中组件后可继续查看机制和实现。'}`:`<span>${icon('chevron')}</span> ${h(p.paths.find(x=>x.id===state.path)?.note)}`}</div><details class="relation-index"><summary>以列表查看所有关系</summary>${r.relations.map(e=>`<button data-select-edge="${h(e.id)}"><span>${h(e.label)}</span><small>${h(allComponents().get(e.from)?.title)} → ${h(allComponents().get(e.to)?.title)}</small></button>`).join('')}</details>${state.compare?comparison():overviewNotes()}</section>${inspector()}</div><footer class="workspace-footer"><span>来源仍在原仓库 · 本页可离线打开</span><span>${Object.keys(p.anchors).length} 个固定来源 · 运行证明与源码核对分开</span></footer></main></div>`;
    updateGraph();
    if(preserveFocus)document.getElementById(preserveFocus)?.focus({preventScroll:true});
    if(state.anchor&&state.tab==='implementation'){
      const el=document.getElementById('source-'+state.anchor);el?.scrollIntoView({block:'nearest',behavior:'instant'});
    }
    updateHash();
  }
  function updateGraph(){
    const r=revision(),p=project(),diff=semanticDiff(before(),current());
    const nodes=new Map(r.components.map(x=>[x.id,x]));
    const path=state.path==='all'?null:p.paths.find(x=>x.id===state.path);
    for(const g of document.querySelectorAll('[data-node]')){
      const id=g.dataset.node,c=nodes.get(id)||allComponents().get(id),d=diff.components.find(x=>x.id===id);
      const visible=state.compare||nodes.has(id);g.style.display=visible?'':'none';
      g.classList.toggle('selected',state.selectionType==='component'&&state.selected===id&&!state.showSources);
      g.classList.toggle('future',c.layer==='future'||c.implementation.state==='absent');
      g.classList.toggle('external',c.kind==='boundary');
      g.classList.toggle('path-muted',!!path&&!path.nodes.includes(id));
      if(state.compare&&d)g.dataset.delta=d.status;
      const old=g.querySelector('.node-delta');if(old)old.remove();
      if(state.compare&&d&&['added','removed','changed'].includes(d.status)){
        const box=g.getBBox(),t=document.createElementNS('http://www.w3.org/2000/svg','text');t.setAttribute('x',box.x+box.width-8);t.setAttribute('y',box.y+13);t.setAttribute('class','node-delta');t.textContent=d.status==='added'?'+':d.status==='removed'?'−':'Δ';g.append(t);
      }
    }
    for(const g of document.querySelectorAll('[data-edge]')){
      const id=g.dataset.edge,from=g.dataset.from,to=g.dataset.to;
      const old=before().relations.find(e=>e.id===id&&e.from===from&&e.to===to),now=current().relations.find(e=>e.id===id&&e.from===from&&e.to===to);
      const active=r.relations.some(e=>e.id===id&&e.from===from&&e.to===to);
      g.style.display=state.compare||active?'':'none';
      const delta=!old?'added':!now?'removed':diff.relations.find(x=>x.id===id)?.status||'unchanged';
      if(state.compare)g.dataset.delta=delta;
      g.classList.toggle('selected',state.selectionType==='relation'&&state.selected===id);
      g.classList.toggle('path-muted',!!path&&!path.edges.includes(id));
    }
  }
  function selectNode(id,tab='mechanism'){
    state.selected=id;state.selectionType='component';state.edgeFrom=null;state.edgeTo=null;state.tab=tab;state.anchor=null;state.showSources=false;state.expanded=false;state.sourceFilter='all';
  }
  function updateHash(){
    const q=new URLSearchParams({project:state.project,revision:state.revision,component:state.selected,tab:state.tab});if(state.compare)q.set('compare','1');
    history.replaceState(null,'','#'+q.toString());
  }
  function readHash(){
    const q=new URLSearchParams(location.hash.slice(1)),p=data.projects.find(x=>x.id===q.get('project'));
    if(!p)return;
    state.project=p.id;state.revision=p.revisions.some(x=>x.id===q.get('revision'))?q.get('revision'):p.defaultRevision;
    state.selected=p.revisions.some(r=>r.components.some(c=>c.id===q.get('component')))?q.get('component'):p.defaultComponent;
    state.tab=['mechanism','implementation','history'].includes(q.get('tab'))?q.get('tab'):'mechanism';state.compare=q.get('compare')==='1';
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest('button,[data-node],[data-edge]');if(!b)return;
    const d=b.dataset,focus=b.id||null;
    if(d.project){const p=data.projects.find(x=>x.id===d.project);state={...state,project:p.id,revision:p.defaultRevision,compare:false,path:'all'};selectNode(p.defaultComponent);}
    else if(d.selectNode||d.node)selectNode(d.selectNode||d.node);
    else if(d.selectEdge||d.edge){state.selected=d.selectEdge||d.edge;state.selectionType='relation';state.edgeFrom=d.from||null;state.edgeTo=d.to||null;state.anchor=null;state.showSources=false;state.expanded=false;}
    else if(d.tab){state.tab=d.tab;state.anchor=null;state.sourceFilter='all';}
    else if(d.anchor){
      if(state.selectionType==='relation'||state.showSources){
        const c=current().components.find(c=>c.implementation.anchors.includes(d.anchor)||c.design.refs.includes(d.anchor))||current().components.find(c=>c.id===project().defaultComponent);selectNode(c.id,'implementation');
      }
      state.tab='implementation';state.anchor=d.anchor;state.sourceFilter='all';state.showSources=false;
    }
    else if(d.sourceFilter){state.sourceFilter=d.sourceFilter;state.anchor=null;}
    else if(d.path){state.path=d.path;}
    else if(d.openChange){selectNode(d.openChange,'history');}
    else if(d.action==='compare'){state.compare=!state.compare;state.revision=current().id;state.path='all';}
    else if(d.action==='sources'){state.showSources=!state.showSources;state.expanded=false;}
    else if(d.action==='expand'){state.expanded=!state.expanded;}
    else if(d.action==='mobile-graph'){state.mobileGraph=!state.mobileGraph;}
    else if(d.action==='back-system'){document.querySelector('.graph-heading').scrollIntoView({block:'start'});return;}
    else return;
    render(focus);if((d.selectNode||d.node||d.openChange||d.selectEdge||d.edge)&&matchMedia('(max-width:640px)').matches)document.querySelector('.inspector').scrollIntoView({block:'start'});$('#announce').textContent=state.selectionType==='component'?(selectedComponent()?.title||'')+'，'+({mechanism:'内部机制',implementation:'实现与证据',history:'演进'})[state.tab]:'关系详情已更新';
  });
  document.addEventListener('change',e=>{
    if(e.target.id==='revision-select'){
      state.revision=e.target.value;state.compare=false;state.anchor=null;state.path='all';
      if(!revision().components.some(c=>c.id===state.selected))selectNode(project().defaultComponent);
      render('revision-select');
    }
  });
  document.addEventListener('keydown',e=>{
    const node=e.target.closest('[data-node],[data-edge]');
    if(node&&(e.key==='Enter'||e.key===' ')){e.preventDefault();node.dispatchEvent(new MouseEvent('click',{bubbles:true}));}
    if(e.target.matches('[role="tab"]')&&['ArrowLeft','ArrowRight'].includes(e.key)){
      e.preventDefault();const tabs=['mechanism','implementation','history'],i=tabs.indexOf(state.tab);state.tab=tabs[(i+(e.key==='ArrowRight'?1:2))%3];state.anchor=null;render('tab-'+state.tab);
    }
  });
  window.addEventListener('hashchange',()=>{readHash();render();});
  readHash();render();
})();

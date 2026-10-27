(() => {
  'use strict';
  const ledger = window.ARCH_LEDGER;
  if (!ledger?.projects?.length) throw new Error('Architecture Ledger model missing');

  const $ = (id) => document.getElementById(id);
  const els = {
    projectTabs: $('projectTabs'), revisionSelect: $('revisionSelect'), compareButton: $('compareButton'), checksButton: $('checksButton'), checkCount: $('checkCount'),
    projectKind: $('projectKind'), projectName: $('projectName'), projectDescription: $('projectDescription'), projectRepo: $('projectRepo'),
    componentList: $('componentList'), componentSearch: $('componentSearch'), viewTabs: $('viewTabs'), revisionState: $('revisionState'), revisionDate: $('revisionDate'),
    diffBanner: $('diffBanner'), graph: $('architectureGraph'), edgeLayer: $('edgeLayer'), nodeLayer: $('nodeLayer'), canvasHint: $('canvasHint'),
    inspector: $('inspector'), inspectorGroup: $('inspectorGroup'), inspectorTitle: $('inspectorTitle'), inspectorSummary: $('inspectorSummary'), statusAxes: $('statusAxes'),
    inspectorTabs: $('inspectorTabs'), inspectorBody: $('inspectorBody'), closeInspector: $('closeInspector'), collapseSidebar: $('collapseSidebar'),
    checksDialog: $('checksDialog'), checkSummary: $('checkSummary'), checkItems: $('checkItems'), closeChecks: $('closeChecks'), closeChecksTop: $('closeChecksTop')
  };

  const state = {
    projectId: 'mica',
    revisionId: null,
    compare: false,
    view: 'current',
    selectedType: 'component',
    selectedId: 'mica-stale',
    inspectorTab: 'mechanism',
    search: ''
  };

  const LABELS = {
    kind: { design_system: '设计态系统', software: '已实现软件', research_method: '科研方法', ai_capability: 'AI 能力' },
    design: { proposed: '拟议', accepted: '已接受', open: '开放', superseded: '已撤销' },
    implementation: { none: '尚无', partial: '部分', linked: '已链接' },
    evidence: { none: '尚无', checked: '已检查', validated: '已验证' },
    revision: { draft: '草案', frozen: '当前接受修订', superseded: '历史修订' },
    mechanism: { state_machine: '状态机', sequence: '时序', algorithm: '算法', formula: '公式', data_contract: '数据合同', narrative: '机制说明', subgraph: '子图' },
    change: { add: '新增', modify: '修改', remove: '删除', supersede: '撤销', align_implementation: '实现对齐', evidence_update: '证据更新' },
    alignment: { not_applicable: '无需实现', behind: '实现未跟上', partial: '部分跟上', aligned: '已对齐', drifted: '发生漂移' }
  };

  function project() { return ledger.projects.find(p => p.id === state.projectId) || ledger.projects[0]; }
  function revision() { const p = project(); return p.revisions.find(r => r.id === state.revisionId) || p.revisions.find(r => r.id === p.currentRevision) || p.revisions[p.revisions.length - 1]; }
  function parentRevision() { const r = revision(); return r.parent ? project().revisions.find(x => x.id === r.parent) : null; }
  function component(id = state.selectedId) { return revision().components.find(c => c.id === id); }
  function relation(id = state.selectedId) { return revision().relations.find(r => r.id === id); }
  function escapeHtml(v) { return String(v ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])); }
  function unique(arr) { return [...new Set(arr)]; }
  function lower(s) { return String(s || '').toLocaleLowerCase('zh-CN'); }

  function init() {
    const p = project();
    state.revisionId = p.currentRevision;
    bindEvents();
    renderAll();
  }

  function bindEvents() {
    els.revisionSelect.addEventListener('change', e => {
      state.revisionId = e.target.value;
      state.compare = false;
      chooseDefaultSelection();
      renderAll();
    });
    els.compareButton.addEventListener('click', () => {
      if (!parentRevision()) return;
      state.compare = !state.compare;
      state.inspectorTab = state.compare ? 'evolution' : 'mechanism';
      renderAll();
    });
    els.componentSearch.addEventListener('input', e => { state.search = e.target.value; renderComponentList(); });
    els.viewTabs.addEventListener('click', e => {
      const b = e.target.closest('button[data-view]'); if (!b) return;
      state.view = b.dataset.view; renderViewTabs(); renderGraph();
    });
    els.inspectorTabs.addEventListener('click', e => {
      const b = e.target.closest('button[data-tab]'); if (!b) return;
      state.inspectorTab = b.dataset.tab; renderInspectorTabs(); renderInspectorBody();
    });
    els.checksButton.addEventListener('click', openChecks);
    els.closeChecks.addEventListener('click', () => els.checksDialog.close());
    els.closeChecksTop.addEventListener('click', () => els.checksDialog.close());
    els.closeInspector.addEventListener('click', () => els.inspector.classList.remove('open'));
    els.collapseSidebar.addEventListener('click', () => document.body.classList.toggle('sidebar-collapsed'));
    window.addEventListener('keydown', e => { if (e.key === 'Escape' && els.checksDialog.open) els.checksDialog.close(); });
  }

  function chooseDefaultSelection() {
    const r = revision();
    const preferred = state.projectId === 'mica' ? 'mica-stale' : state.projectId === 'cat-trace' ? 'cat-zero' : 'da-slice';
    state.selectedType = 'component';
    state.selectedId = r.components.some(c => c.id === preferred) ? preferred : r.components[0]?.id;
    state.inspectorTab = 'mechanism';
  }

  function renderAll() {
    renderProjectTabs(); renderTopMeta(); renderRevisionSelect(); renderViewTabs(); renderComponentList(); renderGraph(); renderInspector(); renderCheckBadge();
  }

  function renderProjectTabs() {
    els.projectTabs.innerHTML = ledger.projects.map(p => `<button type="button" data-project="${escapeHtml(p.id)}" class="${p.id===state.projectId?'active':''}">${escapeHtml(p.name)}</button>`).join('');
    els.projectTabs.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => {
      state.projectId = btn.dataset.project;
      state.revisionId = project().currentRevision;
      state.compare = false;
      state.view = 'current';
      chooseDefaultSelection();
      renderAll();
    }));
  }

  function renderTopMeta() {
    const p = project(), r = revision();
    els.projectKind.textContent = LABELS.kind[p.kind] || p.kind;
    els.projectName.textContent = p.name;
    els.projectDescription.textContent = p.description;
    els.projectRepo.textContent = p.repo;
    els.revisionState.textContent = LABELS.revision[r.status] || r.status;
    els.revisionDate.textContent = r.date;
    const parent = parentRevision();
    els.compareButton.disabled = !parent;
    els.compareButton.classList.toggle('active', state.compare);
    els.compareButton.textContent = state.compare && parent ? `正在对比：${parent.title}` : '与父修订比较';
    els.diffBanner.hidden = !state.compare;
    if (state.compare && parent) {
      els.diffBanner.innerHTML = `<strong>${escapeHtml(parent.title)}</strong> → <strong>${escapeHtml(r.title)}</strong> · ${r.changes.length} 项系统语义变化。选择组件查看原因、证据和实现跟进。`;
    }
  }

  function renderRevisionSelect() {
    const p = project();
    els.revisionSelect.innerHTML = p.revisions.slice().reverse().map(r => `<option value="${escapeHtml(r.id)}" ${r.id===revision().id?'selected':''}>${escapeHtml(r.title)}</option>`).join('');
  }

  function renderViewTabs() {
    els.viewTabs.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.view === state.view));
  }

  function renderComponentList() {
    const r = revision();
    const q = lower(state.search);
    const groups = new Map();
    r.components.filter(c => !q || lower(`${c.name} ${c.group} ${c.responsibility}`).includes(q)).forEach(c => {
      if (!groups.has(c.group)) groups.set(c.group, []);
      groups.get(c.group).push(c);
    });
    els.componentList.innerHTML = [...groups.entries()].map(([group, comps]) => `<section class="component-group"><h3>${escapeHtml(group)}</h3>${comps.map(c => componentRow(c)).join('')}</section>`).join('') || '<div class="empty-state"><strong>没有匹配组件</strong><p>缩短搜索词或清空筛选。</p></div>';
    els.componentList.querySelectorAll('[data-component]').forEach(btn => btn.addEventListener('click', () => selectObject('component', btn.dataset.component)));
  }

  function componentRow(c) {
    const on = c.status;
    return `<button type="button" class="component-row ${state.selectedType==='component'&&state.selectedId===c.id?'active':''}" data-component="${escapeHtml(c.id)}"><span class="name">${escapeHtml(c.name)}</span><span class="mini-axes" aria-label="设计、实现、证据状态"><i class="design ${on.design==='accepted'?'on':''}"></i><i class="implementation ${on.implementation==='linked'?'on':''}"></i><i class="evidence ${on.evidence==='validated'?'on':''}"></i></span></button>`;
  }

  function renderGraph() {
    const r = revision();
    const changes = new Map((r.changes || []).map(ch => [ch.targetId, ch]));
    const filterStyle = state.view === 'current' ? null : state.view;
    const positions = new Map(r.components.map(c => [c.id, c.position || {x: 0,y:0}]));
    const nodeW=150, nodeH=74;
    const edges = [];
    for (const edge of r.relations) {
      const s=positions.get(edge.source), t=positions.get(edge.target); if (!s || !t) continue;
      const sx=s.x+nodeW, sy=s.y+nodeH/2, tx=t.x, ty=t.y+nodeH/2;
      const horizontal = Math.abs(tx-sx) > Math.abs(ty-sy);
      let path;
      if (horizontal) {
        const bend = Math.max(36, Math.abs(tx-sx)*.46);
        path=`M ${sx} ${sy} C ${sx+bend} ${sy}, ${tx-bend} ${ty}, ${tx} ${ty}`;
      } else {
        const startX=s.x+nodeW/2, startY=s.y+nodeH, endX=t.x+nodeW/2, endY=t.y;
        const bend=Math.max(28,Math.abs(endY-startY)*.42);
        path=`M ${startX} ${startY} C ${startX} ${startY+bend}, ${endX} ${endY-bend}, ${endX} ${endY}`;
      }
      const dim = filterStyle && edge.style !== filterStyle;
      const selected = state.selectedType==='relation' && state.selectedId===edge.id;
      const labelX = horizontal ? (sx+tx)/2 : s.x+nodeW/2+8;
      const labelY = horizontal ? (sy+ty)/2-6 : (s.y+nodeH+t.y)/2;
      edges.push(`<g class="edge-wrap ${selected?'selected':''}" data-relation="${escapeHtml(edge.id)}"><path class="edge ${escapeHtml(edge.style||'normal')} ${dim?'dim':''} ${selected?'selected':''}" d="${path}"></path><text class="edge-label" x="${labelX}" y="${labelY}">${escapeHtml(edge.label)}</text></g>`);
    }
    els.edgeLayer.innerHTML=edges.join('');
    els.nodeLayer.innerHTML=r.components.map(c=>{
      const p=c.position||{x:0,y:0}; const ch=changes.get(c.id); const cls=state.compare&&ch ? (ch.kind==='add'?'added':ch.kind==='remove'||ch.kind==='supersede'?'removed':'modified') : '';
      const selected=state.selectedType==='component'&&state.selectedId===c.id;
      const issues=(r.issues||[]).filter(i=>i.targets.includes(c.id));
      const dOn=c.status.design==='accepted', iOn=c.status.implementation==='linked', eOn=c.status.evidence==='validated';
      return `<g class="graph-node ${selected?'selected':''} ${cls}" data-component="${escapeHtml(c.id)}" transform="translate(${p.x},${p.y})"><rect class="node-rect" width="${nodeW}" height="${nodeH}"></rect><text class="node-group" x="12" y="17">${escapeHtml(c.group)}</text><text class="node-title" x="12" y="38">${escapeHtml(shorten(c.shortName||c.name,22))}</text><line class="node-status-line design ${dOn?'':'off'}" x1="12" y1="58" x2="35" y2="58"></line><line class="node-status-line implementation ${iOn?'':'off'}" x1="44" y1="58" x2="67" y2="58"></line><line class="node-status-line evidence ${eOn?'':'off'}" x1="76" y1="58" x2="99" y2="58"></line>${issues.length?`<text class="node-issue" x="136" y="17" text-anchor="end">${issues.length}</text>`:''}</g>`;
    }).join('');
    els.nodeLayer.querySelectorAll('[data-component]').forEach(n=>n.addEventListener('click',()=>selectObject('component',n.dataset.component)));
    els.edgeLayer.querySelectorAll('[data-relation]').forEach(g=>g.addEventListener('click',()=>selectObject('relation',g.dataset.relation)));
    els.canvasHint.textContent = state.compare ? '高亮表示本修订发生系统语义变化；淡化对象仍保留在当前架构。' : '选择组件查看内部机制；选择关系查看真实载荷和消费点。';
  }

  function shorten(s,n){ return s.length>n ? s.slice(0,n-1)+'…' : s; }
  function selectObject(type,id){ state.selectedType=type; state.selectedId=id; if(type==='relation') state.inspectorTab='mechanism'; renderComponentList(); renderGraph(); renderInspector(); els.inspector.classList.add('open'); }

  function renderInspector(){
    const obj = state.selectedType==='component' ? component() : relation();
    if(!obj){ els.inspectorTitle.textContent='选择对象'; els.inspectorSummary.textContent=''; els.statusAxes.innerHTML=''; els.inspectorBody.innerHTML=''; return; }
    if(state.selectedType==='component'){
      els.inspectorGroup.textContent=obj.group;
      els.inspectorTitle.textContent=obj.name;
      els.inspectorSummary.textContent=obj.responsibility;
      els.statusAxes.innerHTML=axisHtml('design','设计',LABELS.design[obj.status.design])+axisHtml('implementation','实现',LABELS.implementation[obj.status.implementation])+axisHtml('evidence','证据',LABELS.evidence[obj.status.evidence]);
    } else {
      els.inspectorGroup.textContent=`${obj.type} 关系`;
      els.inspectorTitle.textContent=obj.label;
      els.inspectorSummary.textContent=obj.payload;
      els.statusAxes.innerHTML=axisHtml('design','来源',componentName(obj.source))+axisHtml('implementation','目标',componentName(obj.target))+axisHtml('evidence','路径',obj.style||'normal');
    }
    renderInspectorTabs(); renderInspectorBody();
  }
  function axisHtml(cls,label,value){ return `<div class="axis-cell ${cls}"><small>${escapeHtml(label)}</small><strong>${escapeHtml(value)}</strong></div>`; }
  function componentName(id){ return revision().components.find(c=>c.id===id)?.name || id; }
  function renderInspectorTabs(){ els.inspectorTabs.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.tab===state.inspectorTab)); }

  function renderInspectorBody(){
    if(state.selectedType==='relation'){
      els.inspectorBody.innerHTML = relationDetails(relation()); return;
    }
    const c=component(); if(!c) return;
    if(state.inspectorTab==='mechanism') els.inspectorBody.innerHTML=mechanismDetails(c);
    else if(state.inspectorTab==='implementation') els.inspectorBody.innerHTML=implementationDetails(c);
    else els.inspectorBody.innerHTML=evolutionDetails(c);
  }

  function mechanismDetails(c){
    if(!c.mechanisms?.length) return `<div class="empty-state"><strong>机制尚未展开</strong><p>若该组件决定关键能力，这通常意味着设计仍过于抽象。</p></div>`;
    return c.mechanisms.map(m=>{
      let body=`<span class="detail-kicker">${escapeHtml(LABELS.mechanism[m.type]||m.type)}</span><h3>${escapeHtml(m.title)}</h3><p>${escapeHtml(m.summary)}</p>`;
      if(m.formula) body+=`<div class="formula-block">${escapeHtml(m.formula)}</div>`;
      if(m.states?.length) body+=`<h4>STATE</h4><div class="state-list">${m.states.map(s=>`<span class="state-chip">${escapeHtml(s)}</span>`).join('')}</div>`;
      if(m.transitions?.length) body+=`<table class="transition-table"><thead><tr><th>从</th><th>到</th><th>守卫</th></tr></thead><tbody>${m.transitions.map(t=>`<tr><td>${escapeHtml(t.from)}</td><td>${escapeHtml(t.to)}</td><td>${escapeHtml(t.guard)}</td></tr>`).join('')}</tbody></table>`;
      if(m.steps?.length) body+=`<h4>步骤</h4><ol class="step-list">${m.steps.map(s=>`<li>${escapeHtml(s)}</li>`).join('')}</ol>`;
      if(m.invariants?.length) body+=`<h4>不变量</h4><ul class="invariant-list">${m.invariants.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul>`;
      if(m.failures?.length) body+=`<h4>失败处理</h4><ul class="invariant-list">${m.failures.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul>`;
      return `<section class="mechanism-section">${body}</section>`;
    }).join('');
  }

  function implementationDetails(c){
    if(!c.anchors?.length){
      return `<div class="empty-state"><strong>没有生产实现锚点</strong><p>${c.status.implementation==='none'?'当前是设计态对象；系统不会虚构 package、function 或 test。':'实现状态与锚点不一致，应由完整性检查阻断。'}</p></div>${issuesFor(c.id)}`;
    }
    return `<span class="detail-kicker">SOURCE OF TRUTH</span><h3>${c.anchors.length} 个真实锚点</h3><p>永久链接固定到修订所使用的提交；符号和行范围用于导航，不替代提交身份。</p><div class="anchor-list">${c.anchors.map(a=>anchorCard(a)).join('')}</div>${issuesFor(c.id)}`;
  }
  function anchorCard(a){
    return `<a class="anchor-card" href="${escapeHtml(a.url||'#')}" target="_blank" rel="noreferrer"><div class="anchor-top"><strong>${escapeHtml(a.symbol||a.path.split('/').pop())}</strong><span class="anchor-kind">${escapeHtml(a.kind)}</span></div><div class="anchor-path">${escapeHtml(a.path)}${a.symbol?' · '+escapeHtml(a.symbol):''}</div><div class="anchor-summary">${escapeHtml(a.summary)}</div></a>`;
  }

  function evolutionDetails(c){
    const r=revision(); const changes=(r.changes||[]).filter(ch=>ch.targetId===c.id || ch.impact?.includes(c.id));
    const decisions=(r.decisions||[]).filter(d=>d.impact?.includes(c.id));
    const evidenceIds=unique(changes.flatMap(ch=>ch.triggerEvidenceIds||[]).concat(decisions.flatMap(d=>d.evidenceIds||[])));
    const evidence=(r.evidence||[]).filter(e=>evidenceIds.includes(e.id));
    let html='';
    if(changes.length) html+=changes.map(changeCard).join('');
    else html+=`<div class="empty-state"><strong>当前修订没有该组件的语义变化</strong><p>实现锚点仍可能在普通 Git 历史中发生等价移动。</p></div>`;
    if(decisions.length) html+=`<h4>架构决定</h4>${decisions.map(d=>`<div class="evidence-card"><strong>${escapeHtml(d.title)}</strong><p>${escapeHtml(d.outcome)} ${escapeHtml(d.reason)}</p></div>`).join('')}`;
    if(evidence.length) html+=`<h4>触发证据</h4>${evidence.map(e=>`<div class="evidence-card"><strong>${escapeHtml(e.title)}</strong><p>${escapeHtml(e.summary)}</p></div>`).join('')}`;
    html+=issuesFor(c.id);
    return html;
  }
  function changeCard(ch){
    const before=typeof ch.before==='string'?ch.before:ch.before==null?'—':JSON.stringify(ch.before);
    const after=typeof ch.after==='string'?ch.after:ch.after==null?'—':JSON.stringify(ch.after);
    return `<div class="change-card"><div class="change-top"><strong>${escapeHtml(ch.summary)}</strong><span class="change-kind">${escapeHtml(LABELS.change[ch.kind]||ch.kind)}</span></div><dl><dt>此前</dt><dd>${escapeHtml(before)}</dd><dt>当前</dt><dd>${escapeHtml(after)}</dd><dt>原因</dt><dd>${escapeHtml(ch.reason)}</dd><dt>实现</dt><dd>${escapeHtml(LABELS.alignment[ch.alignment]||ch.alignment)}</dd><dt>保持不变</dt><dd>${escapeHtml((ch.unchanged||[]).join('；')||'未单独声明')}</dd></dl></div>`;
  }
  function issuesFor(id){
    const issues=(revision().issues||[]).filter(i=>i.targets.includes(id)); if(!issues.length) return '';
    return `<h4>当前边界</h4>${issues.map(i=>issueHtml(i)).join('')}`;
  }
  function issueHtml(i){ const icon=i.severity==='block'?'!':i.severity==='review'?'△':'i'; return `<div class="issue-row" data-issue="${escapeHtml(i.id)}"><span class="issue-icon ${escapeHtml(i.severity)}">${icon}</span><div><strong>${escapeHtml(i.id)} · ${escapeHtml(i.title)}</strong><p>${escapeHtml(i.summary)}</p></div></div>`; }

  function relationDetails(r){
    if(!r) return '';
    const styleName={normal:'正常',failure:'失败',recovery:'恢复',proposed:'拟议'}[r.style]||r.style;
    return `<span class="detail-kicker">RELATION</span><h3>真实载荷</h3><p>${escapeHtml(r.payload)}</p><table class="transition-table"><tbody><tr><th>生产者</th><td>${escapeHtml(componentName(r.source))}</td></tr><tr><th>消费者</th><td>${escapeHtml(componentName(r.target))}</td></tr><tr><th>类型</th><td>${escapeHtml(r.type)} / ${escapeHtml(styleName)}</td></tr><tr><th>发生点</th><td>${escapeHtml(r.mechanismPoint||'未单独指定')}</td></tr><tr><th>失败语义</th><td>${escapeHtml(r.failure||'由目标机制处理')}</td></tr></tbody></table><h4>为什么这条边可审查</h4><p>它说明了实际传递对象和消费位置，而不是装饰性箭头。若载荷为空，完整性检查应阻断冻结。</p>`;
  }

  function computeChecks(){
    const r=revision(); const items=[];
    for(const c of r.components){
      if(c.status.implementation==='linked' && !c.anchors?.length) items.push({severity:'block',title:`${c.name} 声称已链接但没有 source anchor`,summary:'实现状态与事实来源矛盾。',target:c.id});
      if(c.status.design==='accepted' && !c.mechanisms?.length) items.push({severity:'review',title:`${c.name} 缺少机制层`,summary:'已接受组件无法解释内部如何工作。',target:c.id});
      if(c.status.evidence==='validated' && !c.anchors?.some(a=>['test','result'].includes(a.kind))) items.push({severity:'review',title:`${c.name} 的“已验证”需要复核`,summary:'没有直接测试或结果锚点；可能依赖修订级证据。',target:c.id});
    }
    for(const e of r.relations){ if(!e.payload?.trim()) items.push({severity:'block',title:`关系 ${e.label} 没有真实载荷`,summary:'无法判断生产者和消费者之间实际传递什么。',target:e.id,type:'relation'}); }
    for(const ch of r.changes||[]){ if(!ch.reason?.trim() || !(ch.triggerEvidenceIds||[]).length) items.push({severity:'review',title:`变更 ${ch.summary} 的因果链不完整`,summary:'重大语义变化需要原因和触发证据。',target:ch.targetId}); }
    for(const i of r.issues||[]) items.push({severity:i.severity,title:`${i.id} · ${i.title}`,summary:i.summary,target:i.targets[0]});
    if(!items.length) items.push({severity:'boundary',title:'未发现结构性矛盾',summary:'这不代表产品或专业判断已经正确。'});
    return items;
  }
  function renderCheckBadge(){ const checks=computeChecks(); els.checkCount.textContent=checks.filter(i=>i.severity!=='boundary').length; }
  function openChecks(){
    const checks=computeChecks(); const counts={block:0,review:0,boundary:0}; checks.forEach(i=>counts[i.severity]=(counts[i.severity]||0)+1);
    els.checkSummary.innerHTML=`<div class="summary-cell"><strong>${counts.block}</strong><span>阻断</span></div><div class="summary-cell"><strong>${counts.review}</strong><span>需复核</span></div><div class="summary-cell"><strong>${counts.boundary}</strong><span>诚实边界</span></div>`;
    els.checkItems.innerHTML=checks.map(i=>issueHtml({id:'',...i,targets:[]})).join('');
    els.checkItems.querySelectorAll('.issue-row').forEach((row,idx)=>row.addEventListener('click',()=>{ const item=checks[idx]; if(item.target){ els.checksDialog.close(); selectObject(item.type==='relation'?'relation':'component',item.target); } }));
    els.checksDialog.showModal();
  }

  init();
})();

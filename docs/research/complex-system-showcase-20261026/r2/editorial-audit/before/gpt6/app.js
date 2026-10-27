'use strict';
(()=>{
 const model=JSON.parse(document.getElementById('model').textContent);
 const {copy,ui,nodes,edges,stories,sources}=model;
 const nodeById=Object.fromEntries(nodes.map(n=>[n.id,n]));
 const inspector=document.getElementById('inspector'),detail=document.getElementById('detail-content'),scrim=document.querySelector('.scrim');
 const narrow=()=>matchMedia('(max-width:760px)').matches;
 let scenario=null,stepIndex=0,selected=null,origin=null;
 const el=(tag,id,cls)=>{const e=document.createElement(tag);if(id){e.dataset.copy=id;e.textContent=copy[id];}if(cls)e.className=cls;return e;};
 function sourceLinks(ids){const wrap=el('div',null,'source-links');ids.split(',').forEach(id=>{const s=sources[id],a=el('a',s.copy);a.href=s.url;a.target='_blank';a.rel='noreferrer';wrap.append(a);});return wrap;}
 function definition(list,key,value){list.append(el('dt',ui[key]),el('dd',value));}
 const endpoint=(id,n)=>id===n||(id==='optional'&&nodeById[n]?.kind==='optional');
 function paint(){const step=scenario?.steps[stepIndex];let activeEdges=new Set(step?.edgeIds||[]),activeNodes=new Set(step?.nodeIds||[]);
  if(!step&&selected?.type==='node'){activeNodes.add(selected.id);edges.filter(e=>endpoint(e.from,selected.id)||endpoint(e.to,selected.id)).forEach(e=>{activeEdges.add(e.id);[e.from,e.to].forEach(n=>n==='optional'?nodes.filter(n=>n.kind==='optional').forEach(n=>activeNodes.add(n.id)):activeNodes.add(n));});}
  if(!step&&selected?.type==='edge'){const e=edges.find(e=>e.id===selected.id);activeEdges.add(e.id);[e.from,e.to].forEach(n=>n==='optional'?nodes.filter(n=>n.kind==='optional').forEach(n=>activeNodes.add(n.id)):activeNodes.add(n));}
  const filtering=!!step||!!selected;
  document.querySelectorAll('[data-node]').forEach(g=>{const id=g.dataset.node;g.classList.toggle('selected',selected?.type==='node'&&selected.id===id);g.classList.toggle('related',activeNodes.has(id));g.classList.toggle('dim',filtering&&!activeNodes.has(id));g.classList.toggle('error',step?.tone==='error'&&activeNodes.has(id));g.setAttribute('aria-pressed',String(selected?.type==='node'&&selected.id===id));});
  document.querySelectorAll('[data-edge]').forEach(g=>{const id=g.dataset.edge,active=activeEdges.has(id),error=step?.tone==='error'&&active;g.classList.toggle('active',active);g.classList.toggle('selected',selected?.type==='edge'&&selected.id===id);g.classList.toggle('dim',filtering&&!active);g.classList.toggle('error',error);g.setAttribute('aria-pressed',String(selected?.type==='edge'&&selected.id===id));const prefix=g.closest('svg').classList.contains('mobile')?'mobile':'desktop',line=g.querySelector('.edge-line'),marker=`url(#${prefix}-${error?'error':active?'active':'arrow'})`;if(line){line.setAttribute('marker-end',marker);if(line.hasAttribute('marker-start'))line.setAttribute('marker-start',marker);}});
 }
 function fillDetail(type,id){detail.replaceChildren();const list=el('dl');if(type==='node'){const n=nodeById[id];detail.append(el('h3',n.title),el('p',n.role,'role'));definition(list,'need',n.why);definition(list,'input',n.input);definition(list,'output',n.output);definition(list,'remove',n.remove);definition(list,'now',n.status);detail.append(list,sourceLinks(n.source));}
  else{const e=edges.find(e=>e.id===id);detail.append(el('h3',e.label));definition(list,'edgePayload',e.payload);definition(list,'edgeConsumer',e.consumer);definition(list,'edgeState',e.status);detail.append(list,sourceLinks(e.source));}
 }
 function show(type,id,trigger){scenario=null;updateStory();selected={type,id};fillDetail(type,id);
  inspector.classList.add('open');inspector.scrollTop=0;paint();if(narrow()){origin=trigger;inspector.setAttribute('role','dialog');inspector.setAttribute('aria-modal','true');scrim.classList.add('open');document.body.classList.add('modal-open');inspector.querySelector('.close-detail').focus();}
 }
 function close(){inspector.classList.remove('open');inspector.removeAttribute('role');inspector.removeAttribute('aria-modal');scrim.classList.remove('open');document.body.classList.remove('modal-open');origin?.focus();origin=null;}
 document.querySelector('.close-detail').addEventListener('click',close);scrim.addEventListener('click',close);
 document.querySelectorAll('[data-node],[data-edge]').forEach(g=>{const activate=()=>show(g.dataset.node?'node':'edge',g.dataset.node||g.dataset.edge,g);g.addEventListener('click',activate);g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate();}});});
 function updateStory(){selected=null;const step=scenario?.steps[stepIndex];fillDetail('node',step?.detail||'da');inspector.scrollTop=0;document.querySelector('.story-controls').classList.toggle('idle',!scenario);document.querySelector('.story-reading').classList.toggle('idle',!scenario);document.querySelectorAll('[data-scenario]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scenario===(scenario?.id||'all'))));const title=document.getElementById('step-title'),body=document.getElementById('step-body');title.dataset.copy=step?.title||ui.idleTitle;title.textContent=copy[title.dataset.copy];body.dataset.copy=step?.body||ui.idleBody;body.textContent=copy[body.dataset.copy];document.querySelector('.story-reading').classList.toggle('error',step?.tone==='error');const counter=document.getElementById('counter');counter.textContent=scenario?copy[ui.stepFormat].replace('{n}',String(stepIndex+1)).replace('{total}',String(scenario.steps.length)):'';counter.dataset.copy=scenario?ui.stepFormat:'';document.getElementById('previous').disabled=!scenario||stepIndex===0;document.getElementById('next').disabled=!scenario||stepIndex===scenario.steps.length-1;paint();}
 document.querySelectorAll('[data-scenario]').forEach(b=>b.addEventListener('click',()=>{scenario=stories.find(s=>s.id===b.dataset.scenario)||null;stepIndex=0;updateStory();}));
 document.getElementById('previous').addEventListener('click',()=>{if(scenario&&stepIndex>0){stepIndex--;updateStory();}});
 document.getElementById('next').addEventListener('click',()=>{if(scenario&&stepIndex<scenario.steps.length-1){stepIndex++;updateStory();}});
 document.addEventListener('keydown',e=>{if(!narrow()||!inspector.classList.contains('open'))return;if(e.key==='Escape'){e.preventDefault();close();}if(e.key==='Tab'){const focusable=[...inspector.querySelectorAll('button,a')],first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
 window.addEventListener('resize',()=>{if(!narrow()){scrim.classList.remove('open');inspector.removeAttribute('role');inspector.removeAttribute('aria-modal');document.body.classList.remove('modal-open');}});
 const query=new URLSearchParams(location.search);if(query.has('scenario')){scenario=stories.find(s=>s.id===query.get('scenario'))||null;stepIndex=scenario?Math.max(0,Math.min(scenario.steps.length-1,Number(query.get('step'))||0)):0;updateStory();}if(query.has('node')&&nodeById[query.get('node')])show('node',query.get('node'),null);
})();

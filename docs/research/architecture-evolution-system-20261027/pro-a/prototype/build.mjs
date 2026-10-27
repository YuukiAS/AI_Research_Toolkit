import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import {validateProject,validateHistoryUpdate,semanticDiff} from './model-core.mjs';

const root=path.dirname(fileURLToPath(import.meta.url));
const require=createRequire(import.meta.url);
let vizModule;
try{vizModule=require('@viz-js/viz');}
catch{const dir=process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES;if(!dir)throw new Error('Run npm install, or set CODEX_PRIMARY_RUNTIME_NODE_MODULES.');vizModule=require(path.join(dir,'@viz-js/viz'));}
const viz=await vizModule.instance();
const data=JSON.parse(await fs.readFile(path.join(root,'model/data.json'),'utf8'));
const baselineArg=process.argv.indexOf('--baseline');
if(baselineArg>=0){
  if(!process.argv[baselineArg+1])throw new Error('--baseline requires a previously frozen model file.');
  const baseline=JSON.parse(await fs.readFile(path.resolve(process.argv[baselineArg+1]),'utf8'));
  const problems=baseline.projects.flatMap(old=>{const next=data.projects.find(x=>x.id===old.id);return next?validateHistoryUpdate(old,next):[{code:'PROJECT_HISTORY_REMOVED',object:old.id}];});
  if(problems.length)throw new Error('Frozen history changed: '+JSON.stringify(problems));
}
const results=data.projects.map(p=>({project:p.id,...validateProject(p)}));
if(results.some(r=>r.errors.length))throw new Error(JSON.stringify(results,null,2));
const esc=s=>JSON.stringify(String(s));
const xml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
await fs.mkdir(path.join(root,'generated'),{recursive:true});
for(const p of data.projects){
  const before=p.revisions[0],current=p.revisions.at(-1);
  const nodes=new Map([...before.components,...current.components].map(n=>[n.id,n]));
  const edges=[];
  for(const r of [before,current])for(const e of r.relations){
    if(!edges.some(x=>x.id===e.id&&x.from===e.from&&x.to===e.to))edges.push({...e,instance:e.id+'--'+edges.filter(x=>x.id===e.id).length});
  }
  const direction=p.layout?.direction==='TB'?'TB':'LR';
  const ranksep=Number.isFinite(p.layout?.ranksep)?Math.max(.3,Math.min(2,p.layout.ranksep)):.75;
  const dot=['digraph Architecture {',`graph [rankdir=${direction}, bgcolor="transparent", pad=0.25, nodesep=0.45, ranksep=${ranksep}, splines=polyline, outputorder=edgesfirst, fontname="sans-serif"];`,'node [shape=box, style="rounded,filled", fillcolor="white", color="#cbd3de", penwidth=1.2, fontname="sans-serif", fontsize=14, margin="0.20,0.17"];','edge [fontname="sans-serif", fontsize=10, fontcolor="#637083", color="#9aa6b7", penwidth=1.2, arrowsize=0.65];'];
  for(const n of nodes.values()){
    const label=n.title.length>11?n.title.replace(/(.{5,8})(?=.{4,}$)/,'$1\n'):n.title;
    dot.push(`${esc(n.id)} [id=${esc('node-'+n.id)}, label=${esc(label)}, ${n.kind==='boundary'?'fillcolor="#f3f5f7", color="#dde2e8"':''}];`);
  }
  for(const e of edges)dot.push(`${esc(e.from)} -> ${esc(e.to)} [id=${esc('edge-'+e.instance)}, label=${esc(e.label)}, tooltip=${esc(e.object)}, ${e.reality==='proposed'?'style=dashed':''}];`);
  for(const rank of p.layout?.ranks||[]){
    if(!rank.every(id=>nodes.has(id)))throw new Error('Layout refers to an unknown component: '+p.id);
    dot.push('{ rank=same; '+rank.map(esc).join('; ')+'; }');
  }
  dot.push('}');
  let svg=viz.renderString(dot.join('\n'),{format:'svg',engine:'dot'}).replace(/<\?xml[^>]*>/,'').replace(/<!DOCTYPE[^>]*>/,'').replace(/&#45;/g,'-');
  svg=svg.replace('<svg ','<svg role="group" aria-label="组件与关系，可用 Tab 键选择" ');
  for(const n of nodes.values())svg=svg.replace(`id="node-${n.id}" class="node"`,`id="node-${n.id}" class="node" data-node="${xml(n.id)}" tabindex="0" role="button" aria-label="${xml(n.title)}"`);
  for(const e of edges)svg=svg.replace(`id="edge-${e.instance}" class="edge"`,`id="edge-${e.instance}" class="edge" data-edge="${xml(e.id)}" data-from="${xml(e.from)}" data-to="${xml(e.to)}" tabindex="0" role="button" aria-label="关系：${xml(e.label)}，${xml(e.object)}"`);
  if((svg.match(/data-node=/g)||[]).length!==nodes.size||(svg.match(/data-edge=/g)||[]).length!==edges.length)throw new Error('SVG semantic binding incomplete: '+p.id);
  // Large transparent hit strokes prevent the R2 edge-pointer failure.
  svg=svg.replace(/(<g\s[^>]*class="edge"[\s\S]*?<path\s)([^>]*)(\/>)/g,(all,a,attrs,end)=>a+attrs+end+'<path '+attrs.replace(/stroke="[^"]*"/g,'stroke="transparent"').replace(/stroke-width="[^"]*"/g,'')+' class="edge-hit" stroke-width="16" fill="none" pointer-events="stroke"/>');
  p.svg=svg;
  p.computedDiff=semanticDiff(before,current);
  await fs.writeFile(path.join(root,'generated',p.id+'.svg'),svg+'\n');
  await fs.writeFile(path.join(root,'generated',p.id+'.dot'),dot.join('\n')+'\n');
}
const css=await fs.readFile(path.join(root,'styles.css'),'utf8');
const core=(await fs.readFile(path.join(root,'model-core.mjs'),'utf8')).replace(/^export /gm,'');
const app=await fs.readFile(path.join(root,'app.js'),'utf8');
const template=await fs.readFile(path.join(root,'template.html'),'utf8');
const json=JSON.stringify(data).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
const html=template.replace('/*__STYLE__*/',css).replace('/*__DATA__*/',json).replace('/*__APP__*/',core+'\n'+app);
await fs.writeFile(path.join(root,'index.html'),html);
const report={generator:'@viz-js/viz 3.25.0 (build-time only)',graphvizVersion:viz.graphvizVersion,projects:data.projects.length,sourceAnchors:data.projects.reduce((n,p)=>n+Object.keys(p.anchors).length,0),validation:results.map(r=>({project:r.project,errors:r.errors,warnings:r.warnings})),history:'One union layout per project; old snapshots are explicitly scoped.',runtimeDependencies:0};
await fs.writeFile(path.join(root,'generated/build-report.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({output:'index.html',bytes:Buffer.byteLength(html),projects:report.projects,anchors:report.sourceAnchors,errors:results.flatMap(r=>r.errors).length,graphviz:viz.graphvizVersion}));

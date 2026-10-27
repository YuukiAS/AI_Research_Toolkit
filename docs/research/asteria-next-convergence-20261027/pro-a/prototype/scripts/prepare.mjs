import fs from 'node:fs/promises';
import ELK from 'elkjs/lib/elk.bundled.js';
import {codeToHtml} from 'shiki';
import {projects} from '../src/reference-data.js';
import {graphObjects,comparisonObjects} from '../src/model-core.js';
const elk=new ELK();
const generated={layouts:{},code:{},dependencies:{elk:'0.12.0',shiki:'4.5.0'}};
function pathOf(points){
 let path=`M${points[0].x},${points[0].y}`;
 for(let i=1;i<points.length-1;i++){
  const a=points[i-1],b=points[i],c=points[i+1];
  const ab=Math.hypot(b.x-a.x,b.y-a.y),bc=Math.hypot(c.x-b.x,c.y-b.y),r=Math.min(8,ab/2,bc/2);
  if(!ab||!bc)continue;
  const p={x:b.x-(b.x-a.x)*r/ab,y:b.y-(b.y-a.y)*r/ab},q={x:b.x+(c.x-b.x)*r/bc,y:b.y+(c.y-b.y)*r/bc};
  path+=` L${p.x},${p.y} Q${b.x},${b.y} ${q.x},${q.y}`;
 }
 const end=points.at(-1);return path+` L${end.x},${end.y}`;
}
function exteriorRoute(edge,nodes,width,serial){
 const a=nodes[edge.sourceId],b=nodes[edge.targetId];if(!a||!b)return null;
 const sideFor=n=>{
  const row=Object.values(nodes).filter(o=>o!==n&&o.y<n.y+39&&o.y+78>n.y+39);
  const leftFree=!row.some(o=>o.x+184<=n.x),rightFree=!row.some(o=>o.x>=n.x+184);
  return leftFree&&rightFree?(n.x+92>width/2):rightFree;
 };
 const right=sideFor(a),targetRight=sideFor(b),distance=28+(serial%2)*23;
 const side=right?width+distance:-distance,targetSide=targetRight?width+distance:-distance;
 const start={x:a.x+(right?184:0),y:a.y+39},end={x:b.x+(targetRight?184:0),y:b.y+39};
 const top=-24-serial*19;
 const points=right===targetRight?[start,{x:side,y:start.y},{x:side,y:end.y},end]:[start,{x:side,y:start.y},{x:side,y:top},{x:targetSide,y:top},{x:targetSide,y:end.y},end];
 return {sourceId:edge.sourceId,targetId:edge.targetId,path:pathOf(points),label:{x:side+(right?1:-1)*(edge.label.length*5.5+16),y:a.y+39-Math.min(90,50+serial*13)},points,exterior:true};
}
for(const [key,project] of Object.entries(projects)){
 const graph=graphObjects(project);
 // A view may distinguish forward work from returning control. ELK owns the
 // complete forward layout and orthogonal routes. Returns use exterior lanes;
 // this is presentation metadata, never a second semantic graph.
 const forward=graph.edges.filter(e=>key==='da'?!['workflow-maker','assurance-workflow','bridge-maker'].includes(e.id):key==='mica'?e.targetId!=='mica.native':key==='tutorial'?e.id!=='t-repair-candidate':true);
 const layout=await elk.layout({id:key,layoutOptions:{'elk.algorithm':'layered','elk.direction':'DOWN','elk.separateConnectedComponents':key==='mica'?'false':'true','elk.spacing.nodeNode':'60','elk.layered.spacing.nodeNodeBetweenLayers':'24','elk.edgeRouting':'ORTHOGONAL','elk.edgeLabels.inline':'true','elk.layered.considerModelOrder.strategy':'NODES_AND_EDGES'},children:graph.nodes.map(n=>({id:n.id,width:184,height:78,layoutOptions:n.id==='request'?{'elk.layered.layering.layerConstraint':'FIRST'}:{}})),edges:forward.map(e=>({id:e.id,sources:[e.sourceId],targets:[e.targetId],labels:[{text:e.label,width:e.label.length*11+14,height:22}]}))});
 const nodes=Object.fromEntries(layout.children.map(n=>[n.id,{x:n.x,y:n.y}]));
 const routes={};for(const e of layout.edges){const s=e.sections[0],label=e.labels[0];routes[e.id]={sourceId:e.sources[0],targetId:e.targets[0],path:pathOf([s.startPoint,...(s.bendPoints||[]),s.endPoint]),label:{x:label.x+label.width/2,y:label.y+label.height/2},points:[s.startPoint,...(s.bendPoints||[]),s.endPoint]};}
 let serial=0;for(const e of graph.edges)if(!routes[e.id])routes[e.id]=exteriorRoute(e,nodes,layout.width,serial++);
 const revisions={};for(const revision of Object.values(project.revisions)){
  const comparison=comparisonObjects(project,revision),historicNodes={...nodes};let additional=0;
  for(const entity of comparison.nodes)if(!historicNodes[entity.id]){historicNodes[entity.id]={x:12+(additional%2)*244,y:layout.height+55+Math.floor(additional/2)*118};additional++;}
  const historicRoutes={};let extra=serial;
  for(const e of comparison.edges){const route=routes[e.canonicalId||e.id];historicRoutes[e.id]=route&&route.sourceId===e.sourceId&&route.targetId===e.targetId?route:exteriorRoute(e,historicNodes,layout.width,extra++);}
  revisions[revision.id]={nodes:historicNodes,routes:historicRoutes,height:layout.height+(additional?Math.ceil(additional/2)*118+40:0)};
 }
 generated.layouts[key]={width:layout.width,height:layout.height,nodes,routes,revisions};
 for(const anchor of Object.values(project.anchors))if(anchor.excerpt&&!generated.code[anchor.id])generated.code[anchor.id]=await codeToHtml(anchor.excerpt,{lang:'typescript',themes:{light:'github-light',dark:'github-dark'},defaultColor:false});
 console.log(key,layout.width,layout.height);
}
await fs.writeFile('src/generated.js','export default '+JSON.stringify(generated)+';\n');

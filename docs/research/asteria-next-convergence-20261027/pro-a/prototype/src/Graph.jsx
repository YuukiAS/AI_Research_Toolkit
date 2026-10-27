import React,{useEffect,useMemo,useRef} from 'react';
import {ReactFlow,ReactFlowProvider,Handle,Position,BaseEdge,EdgeLabelRenderer,getSmoothStepPath,MarkerType,useReactFlow,Controls} from '@xyflow/react';
import {Box,FileText,ScanLine,Workflow,BookOpen,Braces,TriangleAlert} from 'lucide-react';
import generated from './generated.js';
import {graphObjects,comparisonObjects} from './model-core.js';
const icons={artifact:FileText,requirement:BookOpen,algorithm:Braces,model:Workflow,finding:TriangleAlert,external:ScanLine};
function ArchitectureNode({data,selected}){
 const Icon=icons[data.entity.kind]||Box;
 return <><Handle type="target" position={Position.Top}/><button type="button" aria-label={data.entity.label} aria-pressed={selected} onClick={event=>{event.stopPropagation();data.select(data.entity.id)}} className={`architecture-node ${selected?'is-selected':''} ${data.active?'is-active':''} ${data.muted?'is-muted':''} ${data.diff||''} ${data.entity.designState==='proposed'?'is-proposed':''}`}>
   <span className="node-top"><Icon size={16}/>{data.diff&&<span className="diff-word">{data.diff==='added'?'新增':data.diff==='removed'?'撤销':'修改'}</span>}</span>
   <span className="node-label">{data.entity.label}</span>
 </button><Handle type="source" position={Position.Bottom}/></>;
}
function RelationEdge(props){
 const {id,sourceX,sourceY,targetX,targetY,sourcePosition,targetPosition,data,markerEnd}=props;
 const [fallbackPath,fallbackX,fallbackY]=getSmoothStepPath({sourceX,sourceY,targetX,targetY,sourcePosition,targetPosition,borderRadius:9,offset:28});
 const path=data.geometry?.path||fallbackPath,labelX=data.geometry?.label.x??fallbackX,labelY=data.geometry?.label.y??fallbackY;
 const style={stroke:data.active?'var(--accent)':data.diff==='removed'?'var(--removed)':data.diff==='added'?'var(--added)':data.diff==='modified'?'var(--accent)':'var(--edge)',strokeWidth:data.active?2.4:data.diff==='modified'?1.8:1.35,strokeDasharray:data.diff==='removed'?'5 4':data.relation.route==='repair'?'5 4':undefined,opacity:data.muted?.23:1};
 return <><BaseEdge id={id} path={path} markerEnd={markerEnd} style={style} interactionWidth={26}/><EdgeLabelRenderer><button type="button" aria-label={`关系：${data.relation.label}`} className={`edge-label nodrag nopan ${data.active?'active':''} ${data.muted?'muted':''} ${data.diff==='modified'?'is-modified':''}`} style={{transform:`translate(-50%, -50%) translate(${labelX+(data.offsetX||0)}px,${labelY+(data.offsetY||0)}px)`}} onClick={e=>{e.stopPropagation();data.select(id);}}>{data.relation.label}{data.diff==='modified'&&<span className="edge-diff-word"> · 修改</span>}</button></EdgeLabelRenderer></>;
}
const nodeTypes={architecture:ArchitectureNode},edgeTypes={relation:RelationEdge};
function Canvas({project,projectKey,selected,onSelect,path,stepIndex,revision,compare,neighbor,inspectorOpen}){
 const {fitBounds}=useReactFlow();
 const box=useRef(null);
 const objects=useMemo(()=>{
  return compare&&revision?comparisonObjects(project,revision):graphObjects(project);
 },[project,revision,compare]);
 const chosen=project.entities[selected];
 const adjacent=new Set([selected]);if(neighbor&&chosen)objects.edges.forEach(e=>{if(e.sourceId===selected)adjacent.add(e.targetId);if(e.targetId===selected)adjacent.add(e.sourceId)});
 const activeStep=path?.steps[stepIndex];const dim=neighbor&&chosen;
 const layout=generated.layouts[projectKey],geometry=compare&&revision?layout.revisions[revision.id]:layout;
 const selectedProjection=project.entities[selected]?.facets?.finding?.projectionOwner||project.entities[selected]?.facets?.artifact?.parentId||selected;
 const nodes=objects.nodes.map((entity,i)=>({id:entity.id,type:'architecture',position:geometry.nodes[entity.id],selected:selectedProjection===entity.id,data:{entity,select:onSelect,active:!selected&&activeStep?.node===entity.id,muted:dim&&!adjacent.has(entity.id),diff:entity.diff==='modified'&&entity.designState==='superseded'?'removed':entity.diff},ariaLabel:entity.label,focusable:false,draggable:false}));
 const edges=objects.edges.map((r,i)=>({id:r.id,source:r.sourceId,target:r.targetId,type:'relation',markerEnd:{type:MarkerType.ArrowClosed,width:13,height:13,color:'var(--edge)'},focusable:false,ariaLabel:`${r.label}：${project.entities[r.sourceId]?.label}到${project.entities[r.targetId]?.label}`,data:{relation:r,select:onSelect,geometry:geometry.routes[r.id],active:selected===r.id||!selected&&activeStep?.edge===r.id,muted:dim&&r.sourceId!==selected&&r.targetId!==selected,diff:r.diff,offsetX:0,offsetY:0}}));
 const fit=()=>fitBounds({x:-135,y:-95,width:layout.width+270,height:geometry.height+110},{padding:.045,duration:0,maxZoom:1.14,minZoom:.32});
 useEffect(()=>{const t=setTimeout(fit,80);return()=>clearTimeout(t)},[projectKey,inspectorOpen,compare,revision?.id,fitBounds]);
 useEffect(()=>{if(!box.current)return;const observer=new ResizeObserver(fit);observer.observe(box.current);return()=>observer.disconnect()},[projectKey,compare,revision?.id,fitBounds]);
 return <div className="graph-canvas" ref={box} data-testid="graph-canvas"><ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes} minZoom={.32} maxZoom={1.8} onNodeClick={(_,n)=>onSelect(n.id)} onEdgeClick={(_,e)=>onSelect(e.id)} onPaneClick={()=>onSelect(null)} nodesConnectable={false} nodesDraggable={false} deleteKeyCode={null} panOnScroll={false} zoomOnScroll={false} onlyRenderVisibleElements ariaLabelConfig={{'node.a11yDescription.default':'按回车选择组件。','edge.a11yDescription.default':'按回车选择关系。','controls.zoomIn.ariaLabel':'放大','controls.zoomOut.ariaLabel':'缩小','controls.fitView.ariaLabel':'适应全图'}} proOptions={{hideAttribution:false}}><Controls showInteractive={false} position="bottom-right" onFitView={fit}/></ReactFlow></div>;
}
export default function Graph(props){return <ReactFlowProvider><Canvas {...props}/></ReactFlowProvider>}

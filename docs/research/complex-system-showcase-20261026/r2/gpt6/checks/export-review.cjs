'use strict';
// 机械导出作者写下的决定与浏览器观察，不生成或润色正文。
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),m=require('../prototype/content.cjs');
const seen=JSON.parse(fs.readFileSync(root+'/checks/visible-text.json','utf8'));
const resolve=s=>s==='R1 两份失败原型'?['gpt6','gpt56'].map(id=>`https://github.com/YuukiAS/AI_Research_Toolkit/blob/research/complex-system-showcase-20261026-${id}/docs/research/complex-system-showcase-20261026/results/${id}/prototype/index.html`).join(' ; '):String(s).split(/[,；]/).map(x=>m.sources[x]?.url||x).join(' ; ');
const cell=s=>String(s??'').replaceAll('\t',' ').replaceAll('\n',' / ');
const rows=m.audit.map(a=>({id:a.id,location:seen[a.id]?.locations.join(' ; ')||(a.id.startsWith('r1.')?'R1 旧页面；已删除或并入所标注新文本':'未采用的候选元素'),original:a.original,decision:a.decision,final:a.final,reason:a.reason,source:resolve(a.source),target:a.target||'—'}));
fs.writeFileSync(root+'/COPY_EDITORIAL_AUDIT.tsv',['文本 ID\t实际页面与状态\t原文\t决定\t最终文案\t编辑理由\t事实来源\t合并或重写去向',...rows.map(a=>Object.values(a).map(cell).join('\t'))].join('\n')+'\n');
const c=id=>m.copy[id],links=s=>s.split(',').map(k=>m.sources[k]?`[${m.sources[k].label}](${m.sources[k].url})`:k).join('、');
let md='# 架构模型\n\n此文档由最终网页的同一语义源导出。14 个节点、16 条逻辑连接、3 个情境、19 步；桌面与手机使用相同 id。SVG 将连线路径与标签分层，避免线条命中区域盖住文字按钮；两层不是两条业务关系。\n\n主图采用当前拟议分工。实线表示已有项目操作，虚线表示新增 DA 连接尚未实现。双向连接的两种载荷在详情中分别解释；逻辑数据依赖不等于直接 API。图中的“按需能力”是一个分组端点，包含四个可选择节点，不是额外执行进程。\n\n![完整架构](previews/architecture.png)\n\n## 节点\n';
for(const n of m.nodes)md+=`\n### ${c(n.title)}（${n.id}）\n\n${c(n.role)}。\n\n| 项目 | 内容 |\n| --- | --- |\n| 为什么需要 | ${c(n.why)} |\n| 输入 | ${c(n.input)} |\n| 输出与消费者 | ${c(n.output)} |\n| 删除后果 | ${c(n.remove)} |\n| 目前情况 | ${c(n.status)} |\n| 来源 | ${links(n.source)} |\n`;
const title=id=>id==='optional'?'按需专业能力':c(m.nodes.find(n=>n.id===id).title);
md+='\n## 连接\n';for(const e of m.edges)md+=`\n### ${c(e.label)}（${e.id}）\n\n**${title(e.from)} ${e.both?'↔':'→'} ${title(e.to)}**；${e.existing?'已有操作':'拟议连接'}。\n\n- 载荷：${c(e.payload)}\n- 消费者：${c(e.consumer)}\n- 状态：${c(e.status)}\n- 来源：${links(e.source)}\n`;
md+='\n## 同一任务的三种情境\n\n以下是设计推演，不是本轮运行 Delivery Assurance 的记录。每一步的边 id 可在 SVG 和 model.json 中逐项对应。\n';for(const s of m.stories){md+=`\n### ${c(s.label)}\n\n| 步骤 | 经过连接 | 证据变化与后续 |\n| --- | --- | --- |\n`;s.steps.forEach((step,i)=>md+=`| ${i+1}. ${c(step.title)} | ${step.edgeIds.join('、')} | ${c(step.body)} |\n`);}
md+='\n## 身份与验证边界\n\n本模型没有网络端点、真实任务 ID、自动启动器或生产状态。事实源及其核对身份见 RESEARCH.md；当前源码与截图身份见 checks/browser-report.json。仍未知的宿主反馈、权限、接收者和证据缺口保留在边详情中，不能靠动画视为已闭合。\n';
fs.writeFileSync(root+'/ARCHITECTURE_MODEL.md',md);
console.log(JSON.stringify({auditRows:rows.length,visibleIds:Object.keys(seen).length,decisions:rows.reduce((a,r)=>(a[r.decision]=(a[r.decision]||0)+1,a),{})}));

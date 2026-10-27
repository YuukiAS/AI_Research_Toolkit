const {chromium}=await import(process.env.ASTERIA_PLAYWRIGHT_MODULE||'/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs');
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import {projects} from '../prototype/src/reference-data.js';

const out=new URL('../',import.meta.url).pathname.replace(/\/$/,'');
const expected='9ebad1e29df3d0818f3415e1027c6f97317792d21364ed7cdc451faf4a7039df';
const bytes=await fs.readFile(out+'/prototype/preview.html');
const hash=crypto.createHash('sha256').update(bytes).digest('hex');
if(hash!==expected)throw Error('Candidate identity changed: '+hash);
const snapshot='/tmp/asteria-audit-final-delta.html';await fs.writeFile(snapshot,bytes);
const report={candidateSha256:hash,baselineFullQaSha256:'ccb1e32ca8faff2c15278e7ffd40efaf6e4558cd1eeba650b3410a69bfd48602',scope:'Targeted evidence-kind and Mica historical/current semantic corrections; baseline r6 remains the full 92-state run.',states:[],checks:[],errors:[],console:[],semantic:{}};
const browser=await chromium.launch({headless:true,executablePath:process.env.ASTERIA_CHROMIUM||'/tmp/architecture-browser/chrome-linux64/chrome',args:['--no-sandbox','--disable-dev-shm-usage']});
const page=await browser.newPage();page.setDefaultTimeout(5000);page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.console.push(m.text())});

async function open(project,theme,mobile,query=''){
 await page.setViewportSize(mobile?{width:390,height:844}:{width:1440,height:1000});
 await page.goto('file://'+snapshot+'?project='+project+'&theme='+theme+query);
 await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(350);
}
async function capture(name,selector='body'){
 await page.mouse.move(8,8);await page.waitForTimeout(100);
 const screenshot='qa/screenshots/audit-final-delta-'+name+'.png';
 await page.screenshot({path:out+'/'+screenshot,fullPage:false});
 const data=await page.evaluate(()=>{let text=document.body.innerText;for(const select of document.querySelectorAll('select'))if(select.getClientRects().length)text=text.replace(select.innerText,[...select.selectedOptions].map(o=>o.label).join(' / '));return{text,viewport:{width:innerWidth,height:innerHeight},documentWidth:document.documentElement.scrollWidth,theme:document.documentElement.dataset.theme}});
 report.states.push({name,screenshot,...data,selectedText:await page.locator(selector).innerText()});
 return data;
}
async function check(name,fn){try{report.checks.push({name,...await fn()})}catch(e){report.checks.push({name,ok:false,error:e.message.slice(0,900)})}}

// The eight evidence states cover both affected uses of recorded_result.
for(const [project,entity] of [['tutorial','tutorial-v04-p26'],['cat','cat-reference']])for(const theme of ['light','dark'])for(const mobile of [false,true]){
 await open(project,theme,mobile,'&entity='+entity+'&tab=evidence');
 const name=[project,theme,mobile?'mobile':'desktop','recorded-result'].join('-');
 const data=await capture(name,'.inspector');
 await check(name,async()=>{const labels=await page.locator('.evidence-kind').allTextContents();const text=await page.locator('.evidence-list').innerText();return{ok:labels.includes('已有结果记录')&&data.documentWidth<=data.viewport.width,labels,text}});
}

// Mica now distinguishes prevention of a new shell from removal of an existing one.
for(const theme of ['light','dark'])for(const mobile of [false,true]){
 await open('mica',theme,mobile,'&entity=mica.continuity&tab=mechanism');
 const name=['mica',theme,mobile?'mobile':'desktop','current-mechanism'].join('-');
 const data=await capture(name,'.inspector');
 await check(name,async()=>{const text=await page.locator('.inspector').innerText();return{ok:text.includes('4200 ms')&&text.includes('已有外观层不因此立即移除')&&text.includes('任一状态')&&data.documentWidth<=data.viewport.width,text}});
}

function graphGeometry(){
 const area=document.querySelector('.diff-graph');const visible=e=>e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden';
 const labels=[...area.querySelectorAll('.edge-label')].filter(visible).map(e=>({text:e.textContent,b:e.getBoundingClientRect()}));
 const labelOverlaps=[];for(let i=0;i<labels.length;i++)for(let j=i+1;j<labels.length;j++){const a=labels[i].b,b=labels[j].b;if(a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top)labelOverlaps.push([labels[i].text,labels[j].text])}
 const ns=[...area.querySelectorAll('.react-flow__node')].map(n=>({id:n.dataset.id,b:n.getBoundingClientRect()}));const crossings=[];
 for(const g of area.querySelectorAll('.react-flow__edge')){const path=g.querySelector('.react-flow__edge-path');if(!path)continue;const m=path.getScreenCTM();const at=q=>({x:q.x*m.a+q.y*m.c+m.e,y:q.x*m.b+q.y*m.d+m.f});const len=path.getTotalLength(),start=at(path.getPointAtLength(0)),end=at(path.getPointAtLength(len));for(const n of ns){const endpoint=q=>q.x>n.b.left-3&&q.x<n.b.right+3&&q.y>n.b.top-3&&q.y<n.b.bottom+3;if(endpoint(start)||endpoint(end))continue;for(let i=1;i<120;i++){const q=at(path.getPointAtLength(len*i/120));if(q.x>n.b.left+4&&q.x<n.b.right-4&&q.y>n.b.top+4&&q.y<n.b.bottom-4){crossings.push({edge:g.dataset.id,node:n.id});break}}}}
 return{labelOverlaps,crossings,labels:labels.map(x=>x.text),nodes:ns.map(n=>n.id)};
}

for(const theme of ['light','dark'])for(const mobile of [false,true]){
 await open('mica',theme,mobile,'&view=revisions');
 const stem=['mica',theme,mobile?'mobile':'desktop'].join('-');
 await page.locator('.segmented button').nth(1).click();await page.waitForTimeout(200);
 await capture(stem+'-diff-overview','.revisions-view');
 if(!mobile)await check(stem+' diff geometry',async()=>{const geometry=await page.evaluate(graphGeometry);return{ok:geometry.labelOverlaps.length===0&&geometry.crossings.length===0,...geometry}});
 for(const [label,expectedConsumer] of [['选择动作','handlePotentialConnectorSignal'],['普通输入触发快照','handlePotentialMentionEvent']]){
  if(mobile)await page.locator('.mobile-diff-list button').filter({hasText:label}).first().click();
  else await page.locator('.diff-graph .edge-label').filter({hasText:label}).first().click();
  await page.locator('.diff-selection').scrollIntoViewIfNeeded();
  const data=await capture(stem+'-relation-'+(label==='选择动作'?'signal':'heavy'),'.diff-selection');
  await check(stem+' relation '+label,async()=>{const text=await page.locator('.diff-selection').innerText();return{ok:text.includes(expectedConsumer)&&data.documentWidth<=data.viewport.width,text}});
 }
 await page.locator('.segmented button').first().click();
 const preserve=page.locator('.revision-detail summary').filter({hasText:'保持的内容'});if(await preserve.count())await preserve.click();
 const data=await capture(stem+'-before-after','.revision-detail');
 await check(stem+' before/after factual scope',async()=>{const text=await page.locator('.revision-detail').innerText();return{ok:text.includes('连接器上下文')&&text.includes('同时处于活动状态且已提交')&&text.includes('不再新建')&&text.includes('关系源码锚点未完整重建')&&data.documentWidth<=data.viewport.width,text}});
}

const p=projects.mica,r=p.revisions['mica-hotpath-change'];
const before=r.before.entities['mica.continuity'].facets.mechanism,after=r.after.entities['mica.continuity'].facets.mechanism;
const scopedRelations={};for(const side of ['before','after'])scopedRelations[side]=Object.values(r[side].relations).filter(rel=>r.scope.includes(rel.sourceId)||r.scope.includes(rel.targetId)).map(rel=>({id:rel.id,anchorIds:rel.anchorIds||null,consumer:rel.contract.consumer,payload:rel.contract.payload}));
const pairedBindings={};for(const side of ['before','after'])pairedBindings[side]=Object.values(r[side].bindings).filter(b=>r.scope.includes(b.entityId)).map(b=>({id:b.id,anchorId:b.anchorId,commit:r[side].anchors[b.anchorId]?.commit,symbol:r[side].anchors[b.anchorId]?.symbol}));
report.semantic={before,after,current:p.entities['mica.continuity'].facets.mechanism,scopedRelations,pairedBindings,unchanged:r.unchanged,beforeCommit:r.beforeCommit,afterCommit:r.afterCommit,sourceFileSha256:crypto.createHash('sha256').update(await fs.readFile(out+'/prototype/src/reference-data.js')).digest('hex')};
report.checks.push({name:'Mica historical and current semantic values',ok:before.bounds.includes('观察窗口 3200 ms')&&after.bounds.includes('观察窗口 4200 ms')&&before.boundary.includes('同时满足 active 与 userTurnCommittedLatched')&&after.boundary.includes('任一状态')&&before.boundary.includes('已有外观层不因此立即移除')&&after.boundary.includes('已有外观层不因此立即移除')&&scopedRelations.before.every(x=>x.anchorIds===null)&&scopedRelations.after.every(x=>x.anchorIds===null)&&pairedBindings.before.length===3&&pairedBindings.after.length===3&&r.before.relations['mica.native-signal'].contract.consumer==='handlePotentialConnectorSignal → detectSignal'&&r.before.relations['mica.input-heavy'].contract.consumer==='handlePotentialMentionEvent → beginLifecycle'&&r.before.relations['mica.input-heavy'].contract.payload.includes('检测到连接器上下文')});

await browser.close();report.ok=report.checks.every(x=>x.ok)&&!report.errors.length&&!report.console.length;
await fs.writeFile(out+'/qa/audit-final-delta.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({candidateSha256:hash,states:report.states.length,checks:report.checks.length,ok:report.ok,failures:report.checks.filter(x=>!x.ok),errors:report.errors,console:report.console},null,2));

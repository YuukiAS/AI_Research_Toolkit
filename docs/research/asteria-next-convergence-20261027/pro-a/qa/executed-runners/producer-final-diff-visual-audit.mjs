import fs from 'node:fs/promises';
import crypto from 'node:crypto';
const {chromium}=await import(process.env.ASTERIA_PLAYWRIGHT_MODULE||'/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs');
const out=new URL('../',import.meta.url).pathname.replace(/\/$/,'');
const expected='6d2ddbff4fb56d5288614345067a7e379a3bbde2c99552e24cf9f3eba739147b';
const bytes=await fs.readFile(out+'/prototype/preview.html');const hash=crypto.createHash('sha256').update(bytes).digest('hex');if(hash!==expected)throw Error('Candidate changed: '+hash);
const snapshot='/tmp/asteria-audit-final-diff-visual.html';await fs.writeFile(snapshot,bytes);
const report={candidateSha256:hash,baselineFullQaSha256:'ccb1e32ca8faff2c15278e7ffd40efaf6e4558cd1eeba650b3410a69bfd48602',factualDeltaSha256:'9ebad1e29df3d0818f3415e1027c6f97317792d21364ed7cdc451faf4a7039df',scope:'Only modified relation rendering; all full baseline and factual delta records retain their original candidate identity.',states:[],checks:[],errors:[],console:[]};
const browser=await chromium.launch({headless:true,executablePath:process.env.ASTERIA_CHROMIUM||'/tmp/architecture-browser/chrome-linux64/chrome',args:['--no-sandbox','--disable-dev-shm-usage']});const page=await browser.newPage();page.setDefaultTimeout(5000);page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.console.push(m.text())});
async function capture(name){await page.mouse.move(8,8);await page.waitForTimeout(120);const screenshot='qa/screenshots/audit-final-diff-visual-'+name+'.png';await page.screenshot({path:out+'/'+screenshot});const state=await page.evaluate(()=>({text:document.body.innerText,width:innerWidth,documentWidth:document.documentElement.scrollWidth,theme:document.documentElement.dataset.theme}));report.states.push({name,screenshot,...state});return state;}
function graphGeometry(){
 const area=document.querySelector('.diff-graph');const visible=e=>e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden';
 const labels=[...area.querySelectorAll('.edge-label')].filter(visible).map(e=>({text:e.textContent,b:e.getBoundingClientRect()}));
 const labelOverlaps=[];for(let i=0;i<labels.length;i++)for(let j=i+1;j<labels.length;j++){const a=labels[i].b,b=labels[j].b;if(a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top)labelOverlaps.push([labels[i].text,labels[j].text])}
 const ns=[...area.querySelectorAll('.react-flow__node')].map(n=>({id:n.dataset.id,b:n.getBoundingClientRect()}));const crossings=[];
 for(const g of area.querySelectorAll('.react-flow__edge')){const path=g.querySelector('.react-flow__edge-path');if(!path)continue;const m=path.getScreenCTM();const at=q=>({x:q.x*m.a+q.y*m.c+m.e,y:q.x*m.b+q.y*m.d+m.f});const len=path.getTotalLength(),start=at(path.getPointAtLength(0)),end=at(path.getPointAtLength(len));for(const n of ns){const endpoint=q=>q.x>n.b.left-3&&q.x<n.b.right+3&&q.y>n.b.top-3&&q.y<n.b.bottom+3;if(endpoint(start)||endpoint(end))continue;for(let i=1;i<120;i++){const q=at(path.getPointAtLength(len*i/120));if(q.x>n.b.left+4&&q.x<n.b.right-4&&q.y>n.b.top+4&&q.y<n.b.bottom-4){crossings.push({edge:g.dataset.id,node:n.id});break}}}}
 return{labelOverlaps,crossings,labels:labels.map(x=>x.text),nodes:ns.map(n=>n.id)};
}

for(const theme of ['light','dark']){
 for(const mobile of [false,true]){
  await page.setViewportSize(mobile?{width:390,height:844}:{width:1440,height:1000});await page.goto('file://'+snapshot+'?project=mica&theme='+theme+'&view=revisions');await page.evaluate(()=>document.fonts.ready);await page.locator('.segmented button').nth(1).click();await page.waitForTimeout(350);
  if(mobile){await page.getByRole('button',{name:'查看关系图',exact:true}).click();await page.locator('.diff-graph').scrollIntoViewIfNeeded();await page.waitForTimeout(250);}
  const stem=theme+'-'+(mobile?'mobile':'desktop');const state=await capture(stem+'-overview');
  const geometry=await page.evaluate(graphGeometry);const marker=await page.evaluate(()=>{const label=[...document.querySelectorAll('.diff-graph .edge-label')].find(e=>e.getAttribute('aria-label')==='关系：选择动作');const p=document.querySelector('.diff-graph .react-flow__edge[data-id="mica.native-signal"] .react-flow__edge-path');const other=document.querySelector('.diff-graph .react-flow__edge[data-id="mica.signal-continuity"] .react-flow__edge-path');return {label:label?.textContent,labelClass:label?.className,stroke:p?getComputedStyle(p).stroke:null,strokeWidth:p?getComputedStyle(p).strokeWidth:null,ordinaryStroke:other?getComputedStyle(other).stroke:null};});
  report.checks.push({name:stem+' unselected semantic marker and layout',ok:marker.label?.includes('修改')&&marker.strokeWidth==='1.8px'&&marker.stroke!==marker.ordinaryStroke&&geometry.labelOverlaps.length===0&&geometry.crossings.length===0&&state.documentWidth<=state.width,marker,geometry});
  if(!mobile){await page.getByRole('button',{name:'关系：选择动作',exact:true}).click();await page.locator('.diff-selection').scrollIntoViewIfNeeded();const selected=await capture(stem+'-selected');const text=await page.locator('.diff-selection').innerText();report.checks.push({name:stem+' selected relation still readable',ok:text.includes('handlePotentialConnectorSignal')&&text.includes('isPotentialConnectorEvent')&&selected.documentWidth<=selected.width,text});}
 }
}
const prior=JSON.parse(await fs.readFile(out+'/qa/audit-final-delta.json','utf8'));const dataHash=crypto.createHash('sha256').update(await fs.readFile(out+'/prototype/src/reference-data.js')).digest('hex');report.checks.push({name:'Factual model unchanged since 28-state delta',ok:dataHash===prior.semantic.sourceFileSha256,currentSha256:dataHash,priorSha256:prior.semantic.sourceFileSha256});
await browser.close();report.ok=report.checks.every(c=>c.ok)&&!report.errors.length&&!report.console.length;await fs.writeFile(out+'/qa/audit-final-diff-visual.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({candidateSha256:hash,states:report.states.length,checks:report.checks.length,ok:report.ok,failures:report.checks.filter(c=>!c.ok),errors:report.errors,console:report.console},null,2));

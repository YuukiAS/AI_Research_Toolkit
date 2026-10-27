const {chromium}=await import(process.env.ASTERIA_PLAYWRIGHT_MODULE||'/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs');
import fs from 'node:fs/promises';
import crypto from 'node:crypto';

const out=new URL('../',import.meta.url).pathname.replace(/\/$/,'');
const round=process.env.ASTERIA_AUDIT_ROUND||'r6';
const snapshot='/tmp/asteria-audit-'+round+'.html';
const source=await fs.readFile(snapshot);
const report={round,candidateSha256:crypto.createHash('sha256').update(source).digest('hex'),checks:[],textOnly:[],errors:[]};
const browser=await chromium.launch({headless:true,executablePath:process.env.ASTERIA_CHROMIUM||'/tmp/architecture-browser/chrome-linux64/chrome',args:['--no-sandbox','--disable-dev-shm-usage']});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
page.setDefaultTimeout(4000);page.on('pageerror',e=>report.errors.push(e.message));
async function open(project,extra=''){await page.goto('file://'+snapshot+'?project='+project+'&theme=light'+extra);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(180)}
async function check(name,action){try{const data=await action();report.checks.push({name,...data})}catch(e){report.checks.push({name,ok:false,error:e.message.slice(0,700)})}}
async function shot(name){await page.screenshot({path:out+'/qa/screenshots/audit-'+round+'-'+name+'.png',fullPage:false})}
async function read(name,selector='.inspector'){const text=await page.locator(selector).innerText();report.textOnly.push({name,text});return text}

await open('da');
const base=await page.locator('.desktop-graph .react-flow__node').evaluateAll(es=>es.map(e=>e.dataset.id).sort());
for(const label of ['正常交付','返修','恢复','保护已有能力'])await check('DA same topology '+label,async()=>{
 await page.locator('.path-tabs button').filter({hasText:label}).click();const steps=[];
 for(let i=0;i<12;i++){steps.push(await page.locator('.path-player').innerText());if(await page.getByRole('button',{name:'下一步',exact:true}).isDisabled())break;await page.getByRole('button',{name:'下一步',exact:true}).click()}
 const now=await page.locator('.desktop-graph .react-flow__node').evaluateAll(es=>es.map(e=>e.dataset.id).sort());
 return{ok:JSON.stringify(base)===JSON.stringify(now)&&steps.length>1,nodeIds:now,steps};
});
await open('da','&entity=assurance&tab=implementation');
await check('DA design-only empty implementation',async()=>{const text=await read('DA implementation');return{ok:text.includes('实现尚未接入'),text}});
await open('da','&view=revisions');
await check('DA historical provenance',async()=>{const text=await read('DA revision','.revisions-view');const links=await page.locator('.revisions-view a').evaluateAll(es=>es.map(e=>({text:e.textContent,href:e.href})));return{ok:text.includes('两份设计')&&text.includes('没有代码迁移'),text,links}});
await page.getByRole('button',{name:'来源与版本',exact:true}).first().click();
await check('DA fixed design source commit',async()=>{const links=await page.locator('.source-modal a').evaluateAll(es=>es.map(e=>e.href));return{ok:links.some(h=>h.includes('fd6916ad5fdd5fb905544b6a127f9b0d31a737e1')),links}});

for(const [project,entity] of [['mica','mica.stale'],['cat','cat-tail'],['cat','cat-reference'],['cat','cat-zero'],['tutorial','tutorial-candidate']]){
 await open(project,'&entity='+entity+'&tab=implementation');
 await check(project+' source drill '+entity,async()=>{const text=await read(project+' '+entity+' implementation');return{ok:!!text.trim(),text,links:await page.locator('.inspector a').evaluateAll(es=>es.map(e=>({text:e.textContent,href:e.href})))}});
 if(entity==='cat-tail')await shot('cat-light-numerical-source');
 if(entity==='tutorial-candidate')await shot('tutorial-light-artifact-file');
 const evidence=page.locator('.detail-tabs button').filter({hasText:'证据'});if(await evidence.count()){await evidence.click();await check(project+' evidence '+entity,async()=>({ok:true,text:await read(project+' '+entity+' evidence')}))}
}

await open('cat');
await page.locator('.path-tabs button').filter({hasText:'尚待确定'}).click();
for(let i=0;i<12&&!(await page.getByRole('button',{name:'下一步',exact:true}).isDisabled());i++)await page.getByRole('button',{name:'下一步',exact:true}).click();
await check('CAT withdrawn route remains reachable',async()=>{
 await page.getByRole('button',{name:'查看撤销依据',exact:true}).click();const text=await page.locator('.revisions-view').innerText();return{ok:!!text.trim(),text};
});
await shot('cat-light-withdrawn-history');

await open('tutorial','&entity=tutorial-candidate');
await check('Tutorial positive page10 is fixed artifact',async()=>{const link=page.locator('.page-object').filter({hasText:'计数与发生率'});const href=await link.getAttribute('href');return{ok:!!href&&href.includes('/blob/')&&href.includes('page-10'),href}});
await check('Tutorial page35 maps finding identity',async()=>{await page.locator('.page-object').filter({hasText:'考核安排'}).click();return{ok:(await page.locator('.artifact-finding').count())===1,selected:await page.locator('#finding-select').inputValue(),text:await read('Tutorial page35 finding')}});
await page.getByLabel('选择变更类型',{exact:true}).selectOption('order');
await check('Tutorial order change impact',async()=>({ok:true,text:await page.locator('.impact-preview').innerText()}));

await open('mica');
await check('Keyboard search preserves focus intent',async()=>{await page.keyboard.press('/');const active=await page.evaluate(()=>document.activeElement.getAttribute('aria-label'));await page.keyboard.type('confirmPendingClear');const labels=await page.locator('.object-list button').allTextContents();return{ok:active==='查找组件或函数'&&labels.length===1,active,labels}});
await open('mica');const native=page.locator('.desktop-graph .react-flow__node').first().locator('button.architecture-node');await native.focus();await shot('mica-light-focus');await native.hover();await shot('mica-light-hover');await native.press('Space');
await check('Keyboard Space selects component',async()=>({ok:await page.locator('.inspector').count()===1,title:await page.locator('.inspector h2').innerText()}));

for(const project of ['da','mica','cat','tutorial']){
 await open(project,'&view=revisions');await page.locator('.segmented button').nth(1).click();
 await check(project+' diff node opens comparison',async()=>{await page.locator('.diff-graph .react-flow__node button').first().click();const box=page.locator('.diff-selection');return{ok:await box.count()===1,text:await box.innerText()}});
}

await page.setViewportSize({width:390,height:844});
for(const project of ['da','mica','cat','tutorial']){
 await open(project,'&view=revisions');await page.locator('.segmented button').nth(1).click();
 await check(project+' mobile change list',async()=>{const list=page.locator('.mobile-diff-list');const count=await list.locator('button').count();const visible=await list.isVisible();const graphVisible=await page.locator('.diff-graph').isVisible();if(visible&&count>1)await list.locator('button').first().click();return{ok:visible&&!graphVisible&&count>1,text:await page.locator('.revisions-view').innerText(),count,graphVisible}});
 await shot(project+'-light-mobile-change-detail');
}
await open('tutorial');await page.locator('.mobile-objects summary').click();await page.locator('.mobile-objects button').filter({hasText:'候选课件'}).click();
await check('Mobile detail back restores position',async()=>{const back=page.locator('.mobile-back');const y=(await back.boundingBox()).y;await back.click();return{ok:y>=-1&&y<40&&await page.locator('.mobile-objects').isVisible(),backY:y,scrollAfter:await page.evaluate(()=>scrollY)}});
await open('da');await page.getByRole('button',{name:'来源与版本',exact:true}).filter({visible:true}).click();
await check('Mobile source dialog usable',async()=>({ok:await page.locator('.source-modal').isVisible(),text:await page.locator('.source-modal').innerText()}));


await page.setViewportSize({width:1440,height:1000});
for(const [label,expected,anchor] of [['已挂载结构','collectConversationTurns','content.ts'],['清空与重挂载','confirmPendingClear','stale-composer-recovery.ts'],['短期只读外观','showShell','connector-continuity.ts']]){
 await open('mica');
 await check('Mica verified consumer '+label,async()=>{await page.locator('.desktop-graph .edge-label').filter({hasText:label}).click();const text=await page.locator('.inspector').innerText();const links=await page.locator('.inspector a').evaluateAll(es=>es.map(e=>e.href));return{ok:text.includes(expected)&&links.some(h=>h.includes(anchor)&&h.includes('7059c0dc24b908b57bd0e1f475142ba4f4520621')),text,links}});
 await shot('mica-light-relation-'+expected);
}
await open('mica','&entity=mica.adapter');
await check('No empty adjacent relations block',async()=>({ok:await page.locator('.local-links').count()===0,text:await page.locator('.inspector').innerText()}));
await open('mica','&view=checks');
await check('Recheck computes current structure',async()=>{await page.getByRole('button',{name:'检查当前引用',exact:true}).click();const text=await page.locator('.structure-result').innerText();return{ok:text.includes('已重新检查当前模型'),text}});
await open('tutorial','&entity=tutorial-candidate');await page.locator('.page-object').filter({hasText:'考核安排'}).click();
await check('Tutorial finding object and requirement location',async()=>{await page.locator('.detail-tabs button').filter({hasText:'定位'}).click();const text=await page.locator('.inspector').innerText();return{ok:text.includes('35')&&text.includes('37'),text}});
await shot('tutorial-light-finding-location');

// Reading copy without its visual hierarchy: retain only what was actually visible
// in this state, then read the resulting text continuously. A literal CSS removal
// is also recorded separately; responsive duplicate navigation is not prose.
await page.setViewportSize({width:1440,height:1000});
for(const [project,entity] of [['da','assurance'],['mica','mica.stale'],['cat','cat-zero'],['tutorial','tutorial-finding']]){
 await open(project,'&entity='+entity);
 const visible=await page.evaluate(()=>{let text=document.body.innerText;for(const select of document.querySelectorAll('select'))if(select.getClientRects().length)text=text.replace(select.innerText,[...select.selectedOptions].map(o=>o.label).join(' / '));return text;});
 await page.evaluate(()=>{for(const s of document.querySelectorAll('style,link[rel="stylesheet"]'))s.remove();for(const e of document.querySelectorAll('[style]'))e.removeAttribute('style')});
 const unstyled=await page.locator('body').innerText();
 report.textOnly.push({name:project+' full page CSS removed',visibleTextBefore:visible,unstyledText:unstyled});
}
await browser.close();
await fs.writeFile(out+'/qa/audit-'+round+'-extended.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({checks:report.checks.length,failures:report.checks.filter(x=>!x.ok),errors:report.errors,textStates:report.textOnly.length},null,2));

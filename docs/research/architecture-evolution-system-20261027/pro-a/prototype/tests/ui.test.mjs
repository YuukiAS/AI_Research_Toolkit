// Optional browser QA. Playwright and Chromium are not application dependencies.
// Example: QA_PLAYWRIGHT_MODULE=/path/to/playwright QA_BROWSER_EXECUTABLE=/path/to/chrome node tests/ui.test.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';

const require=createRequire(import.meta.url);
const playwrightModule=process.env.QA_PLAYWRIGHT_MODULE||'playwright';
let playwright;
try { playwright=require(playwrightModule); }
catch { throw new Error('Optional UI QA requires Playwright. Install it separately or set QA_PLAYWRIGHT_MODULE; it is not needed to open the prototype.'); }
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const baseURL=process.env.QA_BASE_URL||pathToFileURL(path.join(root,'index.html')).href;
const shots=path.join(root,'screenshots');
await fs.mkdir(shots,{recursive:true});
const html=await fs.readFile(path.join(root,'index.html'));
const report={observedAt:new Date().toISOString(),nodeVersion:process.version,playwrightVersion:require(playwrightModule+'/package.json').version,htmlSha256:createHash('sha256').update(html).digest('hex'),baseURL,viewports:{desktop:{width:1600,height:1000},mobile:{width:390,height:844}},environment:{isolatedBrowser:true,externalLinksOpened:false,customFontconfig:!!process.env.QA_FONTCONFIG_FILE},checks:[],screenshots:[],pageErrors:[],consoleErrors:[]};
const browser=await playwright.chromium.launch({headless:true,...(process.env.QA_BROWSER_EXECUTABLE?{executablePath:process.env.QA_BROWSER_EXECUTABLE}:{}),args:['--no-sandbox','--disable-dev-shm-usage'],env:{...process.env,...(process.env.QA_FONTCONFIG_FILE?{FONTCONFIG_FILE:process.env.QA_FONTCONFIG_FILE}:{})}});
report.browserVersion=browser.version();
async function newPage(viewport){const page=await browser.newPage({viewport,deviceScaleFactor:1});page.setDefaultTimeout(4000);page.on('pageerror',e=>report.pageErrors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.consoleErrors.push({text:m.text(),location:m.location()});});return page;}
async function open(page,hash=''){await page.goto(baseURL+hash,{waitUntil:'load'});await page.evaluate(()=>document.fonts.ready);}
async function capture(page,name){await page.screenshot({path:path.join(shots,name),fullPage:false});report.screenshots.push('screenshots/'+name);return name;}
async function check(name,fn){try{const details=await fn();report.checks.push({name,passed:true,details});console.log('PASS '+name);}catch(error){report.checks.push({name,passed:false,error:error.message});console.error('FAIL '+name+'\n'+error.message);}}
const desktop=await newPage(report.viewports.desktop),mobile=await newPage(report.viewports.mobile);

try {
  await check('desktop: current architecture has bound, accessible nodes and hides the removed input edge',async()=>{
    await open(desktop);
    assert.equal(await desktop.locator('#graph-stage [data-node]').count(),8);
    assert.equal(await desktop.locator('#graph-stage [data-node][role="button"][tabindex="0"]').count(),8);
    // Chromium 131 retains SVG-group bounding boxes for display:none. Playwright
    // isVisible() can therefore misreport them; verify computed display and capture the actual view.
    assert.equal(await desktop.locator('#graph-stage [data-edge="mica-input-trigger"]').evaluate(e=>getComputedStyle(e).display),'none');
    assert.notEqual(await desktop.locator('#graph-stage [data-edge="mica-signal"]').evaluate(e=>getComputedStyle(e).display),'none');
    assert.equal(await desktop.locator('.inspector-head h2').innerText(),'连接器输入框连续显示');
    assert.equal(await desktop.locator('.mechanism>li').count(),4);
    return {title:await desktop.title(),nodes:8,oldInputEdgeHidden:true,screenshot:await capture(desktop,'desktop-mica-overview.png')};
  });
  await check('desktop: graph component opens its mechanism and a pinned implementation link',async()=>{
    await desktop.locator('#graph-stage [data-node="mica.offscreen-rendering"]').click();
    assert.equal(await desktop.locator('.inspector-head h2').innerText(),'离屏历史渲染');
    assert.equal(await desktop.locator('.mechanism>li').count(),4);
    await desktop.locator('[data-anchor="mica-observer"]').first().click();
    assert.equal(await desktop.locator('#tab-implementation').getAttribute('aria-selected'),'true');
    const href=await desktop.locator('.source-selected .external-link').getAttribute('href');
    assert.equal(href,'https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/content.ts#L231-L262');
    assert.match(await desktop.locator('.source-selected').innerText(),/setupObservers/);
    assert.equal(await desktop.locator('.source-selected .external-link').getAttribute('target'),'_blank');
    await desktop.evaluate(()=>window.scrollTo(0,0));
    return {href,sourceWasNotOpened:true,screenshot:await capture(desktop,'desktop-mica-implementation.png')};
  });
  await check('desktop: relation pointer selection shows concrete producer, consumer and interaction point',async()=>{
    await desktop.locator('#graph-stage [data-edge="mica-clear-exclusion"] text').click();
    assert.equal(await desktop.locator('.inspector-head h2').innerText(),'恢复互斥');
    const route=await desktop.locator('.relation-route').innerText();
    assert.match(route,/旧草稿清除恢复/);assert.match(route,/连接器输入框连续显示/);
    assert.match(await desktop.locator('.relation-body').innerText(),/continuitySkipReason/);
    const selectedStroke=await desktop.locator('#graph-stage [data-edge="mica-clear-exclusion"] path:not(.edge-hit)').evaluate(e=>getComputedStyle(e).stroke);
    assert.equal(selectedStroke,'rgb(43, 105, 175)');
    return {route,selectedStroke};
  });
  await check('desktop: old Mica revision retains shared signal and uses old source commits',async()=>{
    await desktop.locator('#graph-stage [data-node="mica.connector-continuity"]').click();
    await desktop.locator('#revision-select').selectOption('mica-before');
    assert.match(await desktop.locator('.revision-context').innerText(),/不是 0.1.6 全系统快照/);
    assert.notEqual(await desktop.locator('#graph-stage [data-edge="mica-input-trigger"]').evaluate(e=>getComputedStyle(e).display),'none');
    assert.notEqual(await desktop.locator('#graph-stage [data-edge="mica-signal"]').evaluate(e=>getComputedStyle(e).display),'none');
    assert.match(await desktop.locator('#detail-panel').innerText(),/60 毫秒/);
    await desktop.locator('#tab-implementation').click();
    const hrefs=await desktop.locator('.source-list .external-link').evaluateAll(xs=>xs.map(x=>x.href));
    assert.ok(hrefs.length>=4);assert.ok(hrefs.every(x=>x.includes('/9f56ea8d23a0895ddbb3f1e95ee207bd049b62c0/')));
    return {revision:await desktop.locator('#revision-select').inputValue(),hrefs};
  });
  await check('desktop: semantic comparison and causal history distinguish changes from context',async()=>{
    await desktop.locator('#compare-button').click();
    assert.equal(await desktop.locator('#graph-stage [data-node][data-delta="changed"]').count(),1);
    assert.equal(await desktop.locator('#graph-stage [data-edge="mica-input-trigger"]').getAttribute('data-delta'),'removed');
    assert.equal(await desktop.locator('#graph-stage [data-edge="mica-signal"]').getAttribute('data-delta'),'unchanged');
    assert.match(await desktop.locator('.unchanged-note').innerText(),/仅作当前上下文/);
    assert.match(await desktop.locator('.comparison-summary').innerText(),/1 个组件 · 1 条关系/);
    await desktop.locator('#tab-history').click();
    const text=await desktop.locator('#detail-panel').innerText();assert.match(text,/具体改变/);assert.match(text,/保持不变/);assert.match(text,/实现是否跟上/);assert.match(text,/未执行/);assert.match(text,/仓库/);
    await desktop.evaluate(()=>window.scrollTo(0,0));
    return {changedComponents:1,changedRelations:1,historyHasCauseEvidenceAndLimits:true,screenshot:await capture(desktop,'desktop-mica-diff.png')};
  });
  await check('desktop: Delivery Assurance honestly exposes design without production implementation',async()=>{
    await desktop.locator('#project-da').click();await desktop.locator('#tab-implementation').click();
    assert.equal(await desktop.locator('h1').innerText(),'Delivery Assurance');
    assert.match(await desktop.locator('.empty-implementation').innerText(),/尚无实现锚点/);
    const sourceKinds=await desktop.locator('.source-meta').allTextContents();assert.ok(sourceKinds.every(x=>!x.startsWith('函数')));
    assert.match(await desktop.locator('.revision-context').innerText(),/PROPOSAL/);
    await desktop.evaluate(()=>window.scrollTo(0,0));
    return {sourceKinds,screenshot:await capture(desktop,'desktop-da-design.png')};
  });
  await check('desktop: old DA same-endpoint relation resolves only its historical source anchors',async()=>{
    await desktop.locator('#revision-select').selectOption('da-before');
    await desktop.locator('#graph-stage [data-edge="da-check-request"] text').click();
    const anchorIds=await desktop.locator('.relation-body [data-anchor]').evaluateAll(xs=>xs.map(x=>x.dataset.anchor));
    assert.deepEqual(anchorIds,['da-old','da-old-flow']);assert.ok(!anchorIds.includes('da-assurance'));
    return {revision:await desktop.locator('#revision-select').inputValue(),anchorIds};
  });
  await check('desktop: comparison can open both old and new DA feedback endpoints',async()=>{
    await desktop.locator('#compare-button').click();
    await desktop.locator('#graph-stage [data-edge="da-feedback"][data-to="da.bridge"] text').click();
    const oldRoute=await desktop.locator('.relation-route').innerText();assert.match(oldRoute,/任务身份与回传/);assert.doesNotMatch(oldRoute,/能力与任务编排/);
    await desktop.locator('#graph-stage [data-edge="da-feedback"][data-to="da.workflow"] text').click();
    const newRoute=await desktop.locator('.relation-route').innerText();assert.match(newRoute,/能力与任务编排/);
    return {oldRoute,newRoute};
  });
  await check('desktop: CAT evolution and private source boundaries remain explicit',async()=>{
    await desktop.locator('#project-cat').click();await desktop.locator('#tab-history').click();
    const history=await desktop.locator('#detail-panel').innerText();assert.match(history,/具体改变/);assert.match(history,/保持不变/);assert.match(history,/实现是否跟上/);
    await desktop.evaluate(()=>window.scrollTo(0,0));const screenshot=await capture(desktop,'desktop-cat-evolution.png');
    await desktop.locator('#tab-implementation').click();
    const sourceKinds=await desktop.locator('.source-meta').allTextContents();assert.ok(sourceKinds.length>0&&sourceKinds.every(x=>x.includes('需原仓库权限')));
    assert.equal(await desktop.locator('.source-preview').count(),0);
    await desktop.locator('#graph-stage [data-node="zero"]').click();
    const blocker=await desktop.locator('#detail-panel').innerText();assert.match(blocker,/候选|阻塞|blocker|未解决|GAP/);
    return {screenshot,privateSourceCount:sourceKinds.length,privatePreviews:0,blockerComponent:await desktop.locator('.inspector-head h2').innerText(),sourceLinksWereNotOpened:true};
  });
  await check('desktop: Tab reaches graph controls; Enter activates graph relation and node',async()=>{
    await desktop.locator('#project-mica').click();await desktop.locator('#revision-select').focus();
    const trail=[];let focused;
    for(let i=0;i<25;i++){await desktop.keyboard.press('Tab');focused=await desktop.evaluate(()=>({id:document.activeElement.id,node:document.activeElement.dataset?.node,edge:document.activeElement.dataset?.edge,role:document.activeElement.getAttribute('role')}));trail.push(focused);if(focused.node||focused.edge)break;}
    assert.ok(focused.node||focused.edge);assert.equal(focused.role,'button');await desktop.keyboard.press('Enter');
    assert.ok(await desktop.locator('.inspector-head h2').innerText());
    await desktop.locator('#graph-stage [data-node="mica.stale-clear"]').focus();await desktop.keyboard.press('Enter');
    assert.equal(await desktop.locator('.inspector-head h2').innerText(),'旧草稿清除恢复');
    const focusAfter=await desktop.evaluate(()=>document.activeElement.id);assert.ok(focusAfter.includes('mica.stale-clear'));
    await desktop.locator('#tab-mechanism').focus();await desktop.keyboard.press('ArrowRight');
    assert.equal(await desktop.locator('#tab-implementation').getAttribute('aria-selected'),'true');
    return {tabTrail:trail,focusAfterNodeActivation:focusAfter,tabArrowNavigation:true};
  });
  await check('mobile: complete readable component list without document horizontal overflow',async()=>{
    await open(mobile);assert.equal(await mobile.locator('.mobile-components button').count(),8);assert.equal(await mobile.locator('#graph-stage').isVisible(),false);
    const geometry=await mobile.evaluate(()=>({width:innerWidth,documentWidth:document.documentElement.scrollWidth,labels:[...document.querySelectorAll('.mobile-components strong')].map(e=>({text:e.textContent,fontSize:getComputedStyle(e).fontSize}))}));
    assert.equal(geometry.documentWidth,390);assert.ok(geometry.labels.every(x=>parseFloat(x.fontSize)>=12));
    return {...geometry,screenshot:await capture(mobile,'mobile-mica.png')};
  });
  await check('mobile: component activation reveals mechanism, source binding, and return to system',async()=>{
    await mobile.locator('.mobile-components [data-select-node="mica.stale-clear"]').click();
    assert.equal(await mobile.locator('.inspector-head h2').innerText(),'旧草稿清除恢复');
    const detailBox=await mobile.locator('.inspector').boundingBox();assert.ok(detailBox.y>=-1&&detailBox.y<844);
    await mobile.locator('[data-anchor="mica-stale-confirm"]').first().click();
    assert.equal(await mobile.locator('#tab-implementation').getAttribute('aria-selected'),'true');
    const href=await mobile.locator('.source-selected .external-link').getAttribute('href');assert.match(href,/7059c0dc24b908b57bd0e1f475142ba4f4520621\/extension\/src\/reliability\/stale-composer-recovery.ts#L224-L252/);
    await mobile.locator('[data-action="back-system"]').click();const headingBox=await mobile.locator('.graph-heading').boundingBox();assert.ok(headingBox.y>=-1&&headingBox.y<844);
    return {detailBox,href,returnHeadingBox:headingBox,sourceWasNotOpened:true};
  });
  await check('mobile: relation list and optional horizontal graph remain usable without body overflow',async()=>{
    await mobile.locator('.relation-index summary').click();await mobile.locator('.relation-index [data-select-edge="mica-clear-exclusion"]').click();
    assert.equal(await mobile.locator('.inspector-head h2').innerText(),'恢复互斥');
    const relationDetailBox=await mobile.locator('.inspector').boundingBox();assert.ok(relationDetailBox.y>=-1&&relationDetailBox.y<844);
    await mobile.locator('[data-action="back-system"]').click();
    const relationReturnBox=await mobile.locator('.graph-heading').boundingBox();assert.ok(relationReturnBox.y>=-1&&relationReturnBox.y<844);
    await mobile.locator('[data-action="mobile-graph"]').click();assert.equal(await mobile.locator('#graph-stage').isVisible(),true);
    const widths=await mobile.locator('#graph-stage').evaluate(e=>({client:e.clientWidth,scroll:e.scrollWidth,body:document.documentElement.scrollWidth}));
    assert.ok(widths.scroll>widths.client);assert.equal(widths.body,390);
    await mobile.locator('#graph-stage').evaluate(e=>{e.scrollLeft=200;});const scrollLeft=await mobile.locator('#graph-stage').evaluate(e=>e.scrollLeft);assert.ok(scrollLeft>0);
    return {relationDetailBox,relationReturnBox,widths,scrollLeft};
  });
  await check('mobile: DA design and CAT project can be read without horizontal page overflow',async()=>{
    await mobile.locator('#project-da').click();await mobile.evaluate(()=>window.scrollTo(0,0));
    assert.equal(await mobile.locator('.mobile-components button').count(),8);assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth),390);
    const screenshot=await capture(mobile,'mobile-da.png');
    await mobile.locator('.mobile-components [data-select-node="da.assurance"]').click();await mobile.locator('#tab-implementation').click();assert.match(await mobile.locator('.empty-implementation').innerText(),/尚无实现锚点/);
    await mobile.locator('#project-cat').click();assert.equal(await mobile.locator('h1').innerText(),'CAT-TRACE');assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth),390);
    return {screenshot,daAbsent:true,catAccessible:true};
  });
} finally {
  await browser.close();
  report.passed=report.checks.filter(x=>x.passed).length;report.failed=report.checks.filter(x=>!x.passed).length;
  report.scope='Limited prototype UI verification only. No Mica, DA or CAT-TRACE production execution; no private source links opened; no full accessibility certification.';
  await fs.mkdir(path.join(root,'generated'),{recursive:true});
  await fs.writeFile(path.join(root,'generated/ui-report.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({passed:report.passed,failed:report.failed,pageErrors:report.pageErrors,consoleErrors:report.consoleErrors,report:'generated/ui-report.json',screenshots:report.screenshots},null,2));
  if(report.failed||report.pageErrors.length)process.exitCode=1;
}

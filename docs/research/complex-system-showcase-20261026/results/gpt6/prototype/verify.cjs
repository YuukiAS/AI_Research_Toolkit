// Author verification for the static design candidate. Requires Playwright + Chromium.
const fs=require('fs'),path=require('path'),crypto=require('crypto'),assert=require('assert/strict');
const {pathToFileURL}=require('url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const root=__dirname, output=path.join(root,'previews');fs.mkdirSync(output,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true});
 try {
 const checks=[],errors=[],external=[];
 const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
 page.on('pageerror',e=>errors.push(String(e)));page.on('request',r=>{if(/^https?:/.test(r.url()))external.push(r.url());});
 const url=pathToFileURL(path.join(root,'index.html')).href;
 await page.goto(url);await page.keyboard.press('Tab');
 const skip=await page.locator('.skip').evaluate(e=>({focused:document.activeElement===e,top:e.getBoundingClientRect().top,clipped:getComputedStyle(e).clipPath}));
 assert(skip.focused && skip.top>=0 && skip.clipped==='none');checks.push({keyboardSkipLink:skip});
 await page.keyboard.press('Enter');assert((await page.evaluate(()=>location.hash))==='#main');
 await page.goto(url);await page.locator('body').click({position:{x:1,y:1}});
 await page.screenshot({path:path.join(output,'desktop-home.png')});await page.screenshot({path:path.join(output,'desktop-full.png'),fullPage:true});
 for(const id of ['good','bad','regression']){
  await page.locator(`[data-scenario="${id}"]`).click();
  const result={case:id,visible:await page.locator(`[data-panel="${id}"]`).isVisible(),otherPanelsHidden:await page.locator('[data-panel]:visible').count()===1,pressed:await page.locator(`[data-scenario="${id}"]`).getAttribute('aria-pressed')==='true'};
  assert(result.visible && result.otherPanelsHidden && result.pressed);checks.push(result);
 }
 await page.locator('[data-scenario="bad"]').click();await page.locator('#walk').screenshot({path:path.join(output,'desktop-failure.png')});
 await page.locator('#component-bridge summary').click();assert(await page.locator('#component-bridge').getAttribute('open')!==null);checks.push({component:'bridge',expanded:true});
 await page.locator('#parts').screenshot({path:path.join(output,'desktop-components.png')});
 await page.locator('[data-scenario="good"]').focus();await page.keyboard.press('Space');assert(await page.locator('[data-panel="good"]').isVisible());checks.push({keyboardSpaceSelect:true});
 await page.locator('#component-runner summary').focus();await page.keyboard.press('Enter');assert(await page.locator('#component-runner').getAttribute('open')!==null);checks.push({keyboardDetails:true});
 const anchors=await page.locator('a[href^="#"]').evaluateAll(as=>as.map(a=>({href:a.getAttribute('href'),exists:!!document.getElementById(a.getAttribute('href').slice(1))})));assert(anchors.every(a=>a.exists));checks.push({anchors});
 for(const width of [320,390,768,1024,1440,1920]){
  await page.setViewportSize({width,height:1000});await page.goto(url);
  const geometry=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth}));
  assert(geometry.document<=geometry.viewport);checks.push({width,...geometry,noHorizontalOverflow:true});
 }
 await page.setViewportSize({width:1440,height:1000});await page.goto(url);await page.evaluate(()=>document.documentElement.style.zoom='200%');
 const zoom=await page.evaluate(()=>({method:'CSS layout zoom 200%, not a native browser zoom or screen-reader test',viewport:innerWidth,document:document.documentElement.scrollWidth}));assert(zoom.document<=zoom.viewport);checks.push({zoom});
 await page.setViewportSize({width:390,height:844});await page.goto(url);
 const targets=await page.locator('.site-header nav a,.scenario-controls button,.primary-link').evaluateAll(es=>es.map(e=>({text:e.textContent.trim(),height:e.getBoundingClientRect().height})));assert(targets.every(e=>e.height>=44));checks.push({commonTouchTargets:targets});
 await page.screenshot({path:path.join(output,'mobile-home.png')});await page.screenshot({path:path.join(output,'mobile-full.png'),fullPage:true});
 await page.locator('[data-scenario="bad"]').click();await page.locator('#walk').screenshot({path:path.join(output,'mobile-failure.png')});
 const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await nojs.goto(url);
 const graceful={scenarioCount:await nojs.locator('[data-panel]:visible').count(),componentCount:await nojs.locator('.component-list details').count()};assert.equal(graceful.scenarioCount,3);assert.equal(graceful.componentCount,6);checks.push({withoutJavascript:graceful});await nojs.close();
 const transferUrl=pathToFileURL(path.join(root,'transfer.html')).href;
 for(const width of [320,390,768,1024,1440,1920]){await page.setViewportSize({width,height:1000});await page.goto(transferUrl);const geometry=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth}));assert(geometry.document<=geometry.viewport);checks.push({transferWidth:width,noHorizontalOverflow:true});}
 await page.setViewportSize({width:1440,height:1000});await page.goto(transferUrl);await page.screenshot({path:path.join(output,'transfer-desktop.png'),fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.goto(transferUrl);await page.screenshot({path:path.join(output,'transfer-mobile.png'),fullPage:true});
 const pairs=[['#192f2b','#f7f8f4'],['#56655e','#f7f8f4'],['#285e45','#eaf0e5'],['#973f2d','#fbede6'],['#4e6357','#eaf0e5'],['#765524','#f7f8f4'],['#c9d7ca','#192f2b'],['#ffffff','#192f2b']];
 const luminance=h=>{const c=h.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722;};
 const contrasts=pairs.map(([foreground,background])=>{const a=luminance(foreground),b=luminance(background),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);assert(ratio>=4.5);return {foreground,background,ratio:Number(ratio.toFixed(2))};});checks.push({representativeTokenContrast:contrasts,scope:'Representative text pairs, not a complete automated accessibility audit'});
 assert.equal(errors.length,0);assert.equal(external.length,0);
 const sourceHashes=Object.fromEntries(['index.html','styles.css','interactions.js','transfer.html'].map(n=>[n,crypto.createHash('sha256').update(fs.readFileSync(path.join(root,n))).digest('hex')]));
 const report={date:new Date().toISOString(),browser:browser.version(),method:'Headless Chromium; local static files; author verification, not independent user comprehension or DA product acceptance',checks,errors,externalRequests:external,sourceHashes,screenshotFiles:fs.readdirSync(output).filter(n=>n.endsWith('.png'))};
 fs.writeFileSync(path.join(root,'browser-checks.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

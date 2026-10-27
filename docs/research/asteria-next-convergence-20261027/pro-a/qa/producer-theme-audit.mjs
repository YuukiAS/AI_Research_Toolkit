const {chromium}=await import(process.env.ASTERIA_PLAYWRIGHT_MODULE||'/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs');
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
const out=new URL('../',import.meta.url).pathname.replace(/\/$/,'');
const round=process.env.ASTERIA_AUDIT_ROUND||'r6';
const source='/tmp/asteria-audit-'+round+'.html';
const report={round,candidateSha256:crypto.createHash('sha256').update(await fs.readFile(source)).digest('hex'),themes:[]};
const browser=await chromium.launch({headless:true,executablePath:process.env.ASTERIA_CHROMIUM||'/tmp/architecture-browser/chrome-linux64/chrome',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
for(const theme of ['light','dark']){
 await page.goto('file://'+source+'?project=mica&theme='+theme+'&entity=mica.stale&tab=implementation');
 await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(180);
 const data=await page.locator('.code-window').evaluate(e=>{
  const tokens=[...e.querySelectorAll('code span')].filter(s=>s.children.length===0&&s.textContent.trim()).map(s=>({text:s.textContent,color:getComputedStyle(s).color}));
  const css=getComputedStyle(document.documentElement);
  return{tokens,colors:[...new Set(tokens.map(t=>t.color))],edge:css.getPropertyValue('--edge').trim(),canvas:css.getPropertyValue('--canvas').trim(),codeBackground:getComputedStyle(e).backgroundColor};
 });
 report.themes.push({theme,...data});
 await page.screenshot({path:out+'/qa/screenshots/audit-'+round+'-mica-'+theme+'-code-token-colors.png',fullPage:false});
}
await page.setViewportSize({width:390,height:844});
await page.goto('file://'+source+'?project=tutorial&theme=light');
report.mobileControls=await page.locator('.mobile-controls nav button,.mobile-path-heading select,.mobile-path-heading button,.header-actions .icon-button').evaluateAll(es=>es.filter(e=>e.getClientRects().length).map(e=>{const b=e.getBoundingClientRect();return{label:e.getAttribute('aria-label')||e.textContent,width:b.width,height:b.height}}));
report.ok=report.themes.every(t=>t.colors.length>=3)&&JSON.stringify(report.themes[0].colors)!==JSON.stringify(report.themes[1].colors)&&report.mobileControls.every(c=>c.height>=44);
await browser.close();await fs.writeFile(out+'/qa/audit-'+round+'-theme.json',JSON.stringify(report,null,2));console.log(JSON.stringify({ok:report.ok,themes:report.themes.map(t=>({theme:t.theme,colors:t.colors})),mobileControls:report.mobileControls}));

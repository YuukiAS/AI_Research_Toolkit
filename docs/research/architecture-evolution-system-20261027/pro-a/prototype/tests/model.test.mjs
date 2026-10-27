import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {semanticDiff,affectedConsumers,validateProject,validateHistoryUpdate,scopedEvidenceUsable,locateExactFragment,safeSourceURL} from '../model-core.mjs';
const data=JSON.parse(await fs.readFile(new URL('../model/data.json',import.meta.url),'utf8'));
const copy=o=>structuredClone(o);
const mica=data.projects.find(p=>p.id==='mica');
const da=data.projects.find(p=>p.id==='da');
const cat=data.projects.find(p=>p.id==='cat');

test('三个项目使用同一结构校验；私有来源没有源码摘录',()=>{
  for(const p of data.projects){assert.deepEqual(validateProject(p).errors,[],p.id);for(const a of Object.values(p.anchors))if(a.visibility==='private'){assert.ok(!a.preview&&!a.excerpt);}}
});
test('真实 Mica 历史保留共享信号，只撤销普通输入直接触发关系',()=>{
  const diff=semanticDiff(mica.revisions[0],mica.revisions[1]);
  assert.equal(diff.relations.find(e=>e.id==='mica-signal').status,'unchanged');
  assert.equal(diff.relations.find(e=>e.id==='mica-input-trigger').status,'removed');
  assert.deepEqual(diff.components.filter(c=>['changed','added','removed'].includes(c.status)).map(c=>c.id),['mica.connector-continuity']);
  assert.equal(diff.components.filter(c=>c.status==='context').length,7);
  assert.match(mica.anchors['mica-old-shared-signal'].commit,/^9f56ea8/);
});
test('仅布局、显示顺序与来源说明变化不制造架构变化',()=>{
  const first=copy(mica.revisions[1]),after=copy(first);
  after.components[0].x=999;after.components[0].color='red';after.components[0].implementation.note='只调整说明';
  after.components.reverse();after.relations.reverse();
  assert.ok([...semanticDiff(first,after).components,...semanticDiff(first,after).relations].every(x=>x.status==='unchanged'));
});
test('删除依赖仍保留旧消费者，且环不会无限遍历',()=>{
  const before={relations:[{from:'producer',to:'consumer'},{from:'consumer',to:'downstream'},{from:'downstream',to:'consumer'}]};
  const after={relations:[]};
  assert.deepEqual(affectedConsumers(before,after,['producer']),['producer','consumer','downstream']);
});
test('声称已有实现却无源码，或只给测试链接，必须失败',()=>{
  const p=copy(mica),node=p.revisions[1].components.find(c=>c.id==='mica.connector-continuity');
  node.implementation.anchors=['mica-test-hotpath'];
  assert.ok(validateProject(p).errors.some(e=>e.code==='IMPLEMENTATION_WITHOUT_SOURCE'));
  node.implementation.state='implemented';
  assert.ok(validateProject(p).errors.some(e=>e.code==='UNKNOWN_IMPLEMENTATION_STATE'));
});
test('没有传递对象的边与没有原因的版本不能静默通过',()=>{
  const p=copy(mica);p.revisions[1].relations[0].object='';p.changes[0].reason='';
  const errors=validateProject(p).errors.map(e=>e.code);
  assert.ok(errors.includes('UNKNOWN_PAYLOAD'));assert.ok(errors.includes('UNEXPLAINED_CHANGE'));
  p.changes=[];assert.ok(validateProject(p).errors.some(e=>e.code==='MISSING_CHANGE_RECORD'));
});
test('历史修正必须追加记录，不允许覆盖或删除旧原因',()=>{
  const next=copy(mica);next.changes[0].reason='改写旧事实';
  assert.equal(validateHistoryUpdate(mica,next)[0].code,'HISTORY_REWRITTEN');
  next.changes=[];assert.equal(validateHistoryUpdate(mica,next)[0].code,'HISTORY_REMOVED');
  next.changes=copy(mica.changes);next.changes.push({id:'correction',supersedes:mica.changes[0].id});
  assert.deepEqual(validateHistoryUpdate(mica,next),[]);
});
test('测试定义、源码检查、旧候选运行均不能成为当前运行证明',()=>{
  assert.equal(scopedEvidenceUsable({basis:'test-definition'},{}).usable,false);
  assert.equal(scopedEvidenceUsable({basis:'source'},{}).usable,false);
  const binding={candidate:'a',standard:'s',runner:'r',observer:'o',conditions:'c'};
  assert.equal(scopedEvidenceUsable({basis:'runtime-run',binding},{...binding,candidate:'b'}).reason,'BINDING_CHANGED');
  assert.equal(scopedEvidenceUsable({basis:'runtime-run',binding},binding).usable,true);
});
test('文件移动只产生候选重绑定；重复片段或改名不猜测',()=>{
  const anchor={path:'old.ts',quote:'function applyRule() { return 1; }'};
  assert.equal(locateExactFragment(anchor,{'new.ts':anchor.quote},{'old.ts':'new.ts'}).status,'candidate-rebind');
  assert.equal(locateExactFragment(anchor,{'old.ts':anchor.quote+'\n'+anchor.quote}).status,'ambiguous');
  assert.equal(locateExactFragment(anchor,{'old.ts':'function renamedRule() { return 1; }'}).status,'unresolved');
});
test('来源链接不能执行脚本或携带凭据',()=>{
  assert.equal(safeSourceURL('javascript:alert(1)'),null);
  assert.equal(safeSourceURL('https://token@github.com/repo'),null);
  assert.ok(safeSourceURL(mica.anchors['mica-continuity-trigger'].url));
  const p=copy(mica);p.anchors['mica-continuity-trigger'].url='https://github.com/YuukiAS/Mica-for-ChatGPT/blob/main/extension/src/reliability/connector-continuity.ts';
  assert.ok(validateProject(p).errors.some(e=>e.code==='SOURCE_URL_MISMATCH'));
});
test('局部历史外的对象不算历史未变；意外改动上下文或错误scope会失败',()=>{
  const p=copy(mica);p.revisions[1].components.find(c=>c.id==='mica.offscreen-rendering').role='悄悄换一个职责';
  assert.ok(validateProject(p).errors.some(e=>e.code==='CONTEXT_DIVERGED'));
  p.changes[0].scope=['ghost.component'];
  assert.ok(validateProject(p).errors.some(e=>e.code==='UNKNOWN_CHANGE_SCOPE'));
});
test('同名锚点、触发证据和旧快照不能被新版本重定向',()=>{
  const p=copy(mica);p.anchors['mica-continuity-trigger'].commit='f'.repeat(40);
  assert.ok(validateHistoryUpdate(mica,p).some(e=>e.kind==='anchors'));
  p.evidence[0].claim='更强结论';
  assert.ok(validateHistoryUpdate(mica,p).some(e=>e.kind==='evidence'));
  p.revisions[0].components[0].role='另一种历史';
  assert.ok(validateHistoryUpdate(mica,p).some(e=>e.kind==='revisions'));
});
test('DA 新方案保留候选状态，CAT 历史仅替换 C04，不借新证据批准旧版本',()=>{
  assert.ok(da.revisions[1].components.every(c=>c.design.state==='proposed'));
  assert.equal(da.revisions[1].relations.find(e=>e.id==='da-feedback').to,'da.workflow');
  assert.deepEqual(cat.revisions[0].scope,['c04']);
  assert.deepEqual(cat.revisions[0].components.find(c=>c.id==='c04').evidence,['cat-c04-old-source']);
  assert.equal(cat.revisions[1].components.find(c=>c.id==='zero').implementation.state,'absent');
  assert.ok(cat.revisions[1].components.find(c=>c.id==='c03').open.some(t=>t.includes('GAP-04')));
});

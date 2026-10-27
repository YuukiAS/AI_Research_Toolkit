import test from 'node:test';
import assert from 'node:assert/strict';
import {projects,impactEvidence} from '../src/reference-data.js';
import {coreSnapshot,semanticDiff,affectedEntities,validateProject,evidenceFor,evidenceImpact,graphObjects,comparisonObjects,MODEL_LIMITATIONS} from '../src/model-core.js';

// Behavioral examples for the reference contract, not a production-schema claim.
// node --test --test-isolation=none scripts/model.test.mjs reports every subtest.
const clone=value=>JSON.parse(JSON.stringify(value));
const commit='1234567890abcdef1234567890abcdef12345678';
function entity(id,label=id){return {id,label,kind:'component',designState:'accepted',facets:{contract:{critical:true},mechanism:{kind:'sequence',steps:['Read input','Return result']}}};}
function relation(id,sourceId,targetId){return {id,type:'transfers',sourceId,targetId,label:'Submit request',contract:{payload:'A request with its candidate identity',consumer:'consumeRequest'}};}
function fixture(){
  return {project:{id:'example',currentRevision:'current'},entities:{a:entity('a'),b:entity('b'),c:entity('c'),x:entity('x'),y:entity('y')},relations:{flow:relation('flow','a','b')},anchors:{},bindings:{},revisions:{},symbols:{},variants:{},views:{system:{projectedEntityIds:['a','b','c','x','y']}},paths:[],questions:[]};
}
function revision(before,after,scope=['a']){
  return {id:'change',scope,before,after,major:true,reason:'A consumer must receive a different request.',trigger:'A recorded consumer failure.',impact:['Consumer contract'],unchanged:['Original request identity']};
}
function addEvidence(project,kind='mechanical_run'){
  project.anchors.receipt={id:'receipt',kind:'artifact',role:'result_source',candidateDigest:'a'.repeat(64),label:'Actual result receipt'};
  project.anchors.test={id:'test',kind:'code',role:'test',repository:'example/repo',commit,path:'tests/example.mjs'};
  project.entities.observation={id:'observation',kind:'result',label:'Observation',facets:{evidence:{subjects:['a'],subjectRevision:'current',kind,result:'pass',method:'Execute the declared candidate check',producer:{name:'Fixture runner'},anchorIds:['test'],resultAnchorIds:['receipt']}}};
  project.entities.a.facets.verificationClaim='validated';
  return project.entities.observation.facets.evidence;
}
const hasFinding=(project,id)=>validateProject(project).some(finding=>finding.id===id);

for(const [name,project] of Object.entries(projects)){
  test(`${name}: curated references, findings and historic snapshots remain resolvable`,()=>{
    assert.deepEqual(validateProject(project),[]);
    for(const rev of Object.values(project.revisions)){
      const objects=comparisonObjects(project,rev),ids=new Set(objects.nodes.map(node=>node.id));
      assert.deepEqual(objects.unresolvedEndpointIds,[]);
      assert.equal(ids.size,objects.nodes.length);
      assert.equal(new Set(objects.edges.map(edge=>edge.id)).size,objects.edges.length);
      for(const edge of objects.edges)assert.ok(ids.has(edge.sourceId)&&ids.has(edge.targetId));
    }
  });
}

test('design-only and unresolved algorithms do not need invented implementation bindings',()=>{
  assert.equal(Object.keys(projects.da.bindings).length,0);
  assert.deepEqual(validateProject(projects.da),[]);
  const project=fixture();
  project.entities.a.kind='algorithm';
  project.entities.a.designState='proposed';
  project.entities.a.facets.mechanism={kind:'unresolved',question:'The production integration method remains open.'};
  assert.deepEqual(validateProject(project),[]);
});

test('missing implementation and mechanism contracts produce focused findings',async t=>{
  const cases=[
    ['mechanism',p=>delete p.entities.a.facets.mechanism,'mechanism'],
    ['payload',p=>p.relations.flow.contract.payload='  ','payload'],
    ['consumer',p=>delete p.relations.flow.contract.consumer,'consumer'],
    ['nonexistent structured consumer',p=>p.relations.flow.contract.consumer={entityId:'missing'},'consumer'],
    ['linked without binding',p=>p.entities.a.facets.implementationClaim='linked','binding'],
    ['binding without source',p=>p.bindings.bound={id:'bound',entityId:'a',anchorId:'missing'},'anchor'],
    ['binding without entity',p=>{p.anchors.source={id:'source',commit};p.bindings.bound={id:'bound',entityId:'missing',anchorId:'source'};},'binding-entity'],
    ['validated without a result',p=>p.entities.a.facets.verificationClaim='validated','evidence']
  ];
  for(const [name,mutate,code]of cases)await t.test(name,()=>{const p=fixture();mutate(p);assert.ok(hasFinding(p,code));});
});

test('non-transfer scientific and containment relations do not invent message payloads',()=>{
  const p=fixture();
  p.relations.flow={id:'flow',sourceId:'a',targetId:'b',type:'contains'};
  p.relations.parameter={id:'parameter',sourceId:'b',targetId:'c',type:'parameterized_by'};
  assert.deepEqual(validateProject(p),[]);
});

test('unbound Git sources and all visible source/evidence references are checked',async t=>{
  const cases=[
    ['unbound abbreviated commit',p=>p.anchors.background={id:'background',kind:'document',commit:'abc123'},'commit'],
    ['Git URL without declared commit',p=>p.anchors.background={id:'background',url:`https://github.com/example/repo/blob/${commit}/design.md`},'commit'],
    ['raw Git URL without declared commit',p=>p.anchors.background={id:'background',url:'https://raw.githubusercontent.com/example/repo/main/design.md'},'commit'],
    ['code source without commit',p=>p.anchors.background={id:'background',kind:'code',path:'src/example.js'},'commit'],
    ['relation source',p=>p.relations.flow.anchorIds=['missing'],'anchor'],
    ['nested mechanism source',p=>p.entities.a.facets.mechanism.sourceRefs=['missing'],'anchor'],
    ['evidence source',p=>{addEvidence(p);p.entities.observation.facets.evidence.anchorIds=['missing'];},'anchor'],
    ['evidence subject',p=>{addEvidence(p);p.entities.observation.facets.evidence.subjects=['missing'];},'evidence-subject'],
    ['missing evidence object',p=>p.entities.a.facets.evidenceRefs=['missing'],'evidence-reference'],
    ['component presented as evidence',p=>p.entities.a.facets.evidenceRefs=['b'],'evidence-reference'],
    ['entity name does not resolve source name',p=>p.entities.a.sourceRefs=['b'],'anchor'],
    ['artifact source',p=>p.entities.a.facets.artifact={parentId:'b',anchorId:'missing'},'anchor'],
    ['finding object',p=>p.entities.a.facets.finding={subject:'b',objectIds:['missing'],requirementIds:['c'],sourceIds:[]},'entity-reference']
  ];
  for(const [name,mutate,code]of cases)await t.test(name,()=>{const p=fixture();mutate(p);assert.ok(hasFinding(p,code));});
  const p=fixture();p.anchors.artifact={id:'artifact',kind:'artifact',candidateDigest:'f'.repeat(64)};
  assert.deepEqual(validateProject(p),[],'An artifact identity is not forced to invent a Git commit.');
});

test('source checks, test definitions and unknown review labels cannot establish validated',async t=>{
  for(const kind of ['source_check','test_definition','definition','recorded_result','unknown_review'])await t.test(kind,()=>{
    const p=fixture();addEvidence(p,kind);assert.ok(hasFinding(p,'evidence'));
  });
});

test('a current result needs an explicit outcome, method, producer and result artifact',async t=>{
  const p=fixture();addEvidence(p);
  assert.deepEqual(validateProject(p),[]);
  const cases=[
    ['another revision',e=>e.subjectRevision='old'],
    ['contradictory subject revision',e=>e.subjects=[{entityId:'a',revisionId:'old'}]],
    ['unknown review outcome',e=>e.result='observed'],
    ['contradictory outcome',e=>e.outcome='fail'],
    ['no method',e=>delete e.method],
    ['no producer',e=>delete e.producer],
    ['only a test definition',e=>e.resultAnchorIds=['test']],
    ['no result artifact',e=>e.resultAnchorIds=[]],
    ['a different subject',e=>e.subjects=['b']]
  ];
  for(const [name,mutate]of cases)await t.test(name,()=>{const copy=clone(p);mutate(copy.entities.observation.facets.evidence);assert.ok(hasFinding(copy,'evidence'));});
  const review=clone(p),record=review.entities.observation.facets.evidence;
  record.kind='semantic_review';record.subjects=[{entityId:'a'}];record.producer={name:'Named reviewer'};
  assert.equal(evidenceFor(review,'a').length,1);
  assert.deepEqual(validateProject(review),[],'This only checks a declared review record, not its adequacy.');
});

test('major revisions require real reason, trigger, impact and preserved boundaries',async t=>{
  const p=fixture();p.revisions.change=revision(coreSnapshot(p),coreSnapshot(p));
  assert.deepEqual(validateProject(p),[]);
  for(const [key,value,code]of [['reason','  ','revision-reason'],['trigger','','revision-reason'],['impact',[],'revision-impact'],['unchanged',[],'revision-impact'],['unchanged',[' '],'revision-impact'],['parentId','missing','revision-parent']])await t.test(key,()=>{
    const copy=clone(p);copy.revisions.change[key]=value;assert.ok(hasFinding(copy,code));
  });
});

test('historical sources are validated within their own immutable snapshot',()=>{
  const p=fixture(),before=coreSnapshot(p),after=coreSnapshot(p);
  before.entities.a.sourceRefs=['old-source'];
  before.anchors['old-source']={id:'old-source',commit};
  p.revisions.change=revision(before,after);
  assert.deepEqual(validateProject(p),[],'Historic anchors need not be copied into current source tables.');
  delete before.anchors['old-source'];
  assert.ok(hasFinding(p,'anchor'));
});

test('layout, theme and generated rendering noise do not become semantic changes',()=>{
  const before=coreSnapshot(fixture()),after=clone(before);
  after.entities.a.position={x:200,y:500};after.entities.a.presentation={theme:'dark'};
  after.entities.a.selected=true;after.entities.a.codeHtml='<span>render cache</span>';
  after.entities.a.generatedAt='later';after.relations.flow.presentation={stroke:'blue'};
  assert.deepEqual(semanticDiff(before,after,['a']),[]);
});

test('stable identity survives renamed text while mechanism and payload changes are visible',()=>{
  const before=coreSnapshot(fixture()),after=clone(before);
  after.entities.a.label='New display name';after.entities.a.facets.mechanism.steps=['Read input','Reject stale identity'];
  after.relations.flow.contract.payload='Request plus candidate digest';
  const diff=semanticDiff(before,after,['a']);
  assert.deepEqual(diff.map(change=>[change.id,change.kind]),[['a','modified'],['flow','modified']]);
  assert.equal(diff[0].before.id,diff[0].after.id);
});

test('retargeting a stable relation preserves old and new consumers as two display edges',()=>{
  const p=fixture(),before=coreSnapshot(p),after=coreSnapshot(p);
  after.relations.flow.targetId='c';p.relations.flow=clone(after.relations.flow);
  delete after.entities.b;delete p.entities.b;p.views.system.projectedEntityIds=['a','c','x','y'];
  const rev=revision(before,after),original=JSON.stringify({p,rev});
  const result=comparisonObjects(p,rev);
  const old=result.edges.find(edge=>edge.id==='flow::before'),next=result.edges.find(edge=>edge.id==='flow::after');
  assert.deepEqual([old.canonicalId,old.targetId,old.comparisonSide,old.diff],['flow','b','before','removed']);
  assert.deepEqual([next.canonicalId,next.targetId,next.comparisonSide,next.diff],['flow','c','after','added']);
  assert.ok(result.nodes.some(node=>node.id==='b'),'The old consumer must remain selectable.');
  assert.equal(result.edges.filter(edge=>edge.canonicalId==='flow').length,2);
  assert.equal(JSON.stringify({p,rev}),original,'Projection must not mutate source snapshots.');
});

test('deleting a scoped node retains its old endpoint and incoming relation',()=>{
  const p=fixture(),before=coreSnapshot(p),after=coreSnapshot(p);
  delete after.entities.b;delete after.relations.flow;
  delete p.entities.b;delete p.relations.flow;p.views.system.projectedEntityIds=['a','c'];
  const result=comparisonObjects(p,revision(before,after,['b']));
  assert.equal(result.nodes.find(node=>node.id==='b').diff,'removed');
  assert.equal(result.nodes.find(node=>node.id==='b').comparisonSide,'before');
  assert.equal(result.edges.find(edge=>edge.canonicalId==='flow').targetId,'b');
  assert.equal(result.edges.find(edge=>edge.canonicalId==='flow').diff,'removed');
});

test('an extra scoped node uses the after state when it still exists',()=>{
  const p=fixture(),before=coreSnapshot(p),after=coreSnapshot(p);
  before.entities.b.description='Historical old state';after.entities.b.description='Historical corrected state';
  p.entities.b.description='A later current state';p.views.system.projectedEntityIds=['a'];
  const result=comparisonObjects(p,revision(before,after,['b']));
  const b=result.nodes.find(node=>node.id==='b');
  assert.equal(b.description,'Historical corrected state');assert.equal(b.comparisonSide,'after');assert.equal(b.diff,'modified');
});

test('outside-scope nodes and relations keep current context without an unchanged claim',()=>{
  const p=fixture();p.relations.context=relation('context','x','y');
  const before=coreSnapshot(p),after=coreSnapshot(p);
  p.entities.x.description='Current context';p.relations.context.label='Current context relation';
  before.entities.x.description='Old background';after.entities.x.description='Another old background';
  before.relations.context.label='Old relation';after.relations.context.label='Another old relation';
  before.relations.ghost=relation('ghost','x','y');
  after.entities.a.description='Scoped change';
  const result=comparisonObjects(p,revision(before,after,['a']));
  const context=result.nodes.find(node=>node.id==='x'),edge=result.edges.find(edge=>edge.id==='context');
  assert.equal(context.description,'Current context');assert.equal(context.comparisonSide,'context');assert.equal(context.context,true);
  assert.equal(context.diff,undefined);assert.equal(context.unchanged,undefined);
  assert.equal(edge.label,'Current context relation');assert.equal(edge.comparisonSide,'context');
  assert.equal(result.edges.some(edge=>edge.canonicalId==='ghost'),false);
});

test('a changed relation with an unresolved endpoint reports the gap without inventing a node',()=>{
  const p=fixture(),before=coreSnapshot(p),after=coreSnapshot(p);
  after.relations.flow.targetId='unknown';
  const result=comparisonObjects(p,revision(before,after,['a']));
  assert.deepEqual(result.unresolvedEndpointIds,['unknown']);
  assert.equal(result.nodes.some(node=>node.id==='unknown'),false);
  assert.ok(result.edges.some(edge=>edge.id==='flow::before'));
});

test('impact keeps deleted consumers and terminates on a new cyclic route',()=>{
  const before={relations:{ab:relation('ab','a','b'),bd:relation('bd','b','d')}},after={relations:{ac:relation('ac','a','c'),ca:relation('ca','c','a'),ignored:{...relation('ignored','a','z'),impact:'none'}}};
  const impacted=affectedEntities(before,after,['a']);
  assert.deepEqual(new Set(impacted),new Set(['b','c','d']));assert.equal(impacted.includes('a'),false);
});

test('artifact changes invalidate the relevant evidence without erasing independent calculations',async t=>{
  const cases=[
    ['page-content',['local','render','story']],
    ['shared-style',['render']],
    ['order',['story']],
    ['statistical-input',['numeric','local','render','story']],
    ['algorithm',['numeric','local','render','story']],
    ['authority',['local','story']]
  ];
  for(const [change,expected]of cases)await t.test(change,()=>{
    const result=evidenceImpact([change],impactEvidence);
    assert.deepEqual(result.filter(record=>record.status==='rerun').map(record=>record.id),expected);
    assert.equal(result.find(record=>record.id==='asset').status,'retain');
  });
});

test('unknown or incomplete evidence dependencies never silently become retain',()=>{
  const records=[{id:'missing'},{id:'empty',dependencies:[]},{id:'incomplete',dependencies:['page-content'],dependenciesComplete:false},{id:'changed-incomplete',dependencies:['order'],dependenciesComplete:false},{id:'unknown',dependencies:['asset'],unknownDependencies:['review-context']}];
  const result=evidenceImpact(['order'],records);
  assert.deepEqual(result.map(record=>[record.id,record.status]),[['missing','unknown'],['empty','unknown'],['incomplete','unknown'],['changed-incomplete','rerun'],['unknown','unknown']]);
});

test('artifact parts and findings stay in the shared model without being forced into the system projection',()=>{
  const p=projects.tutorial,visible=new Set(graphObjects(p).nodes.map(node=>node.id));
  for(const id of p.views.findings.projectedEntityIds){assert.ok(p.entities[id].facets.finding);assert.equal(visible.has(id),false);}
  assert.ok(p.entities['tutorial-v14-page-10']);assert.equal(visible.has('tutorial-v14-page-10'),false);
  assert.ok(MODEL_LIMITATIONS.some(value=>value.includes('Architecture Freeze')));
});

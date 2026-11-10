'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const crypto=require('node:crypto');
const policy=require('./editorial-policy.cjs');
const hash=text=>crypto.createHash('sha256').update(text).digest('hex');
const source=(i,length=1000)=>{const content=('Synthetic evidence '+i+' ').repeat(Math.ceil(length/21)).slice(0,length);return {id:'S'+i,url:'https://evidence'+i+'.example/article',content,content_sha256:hash(content),content_truncated:false,full_content:true,http_status:200};};
const envelope=()=>({task_key:'fixture-task',summary_tr:'Yalnızca yapısal sözleşme testidir.',observations:[{evidence_ref:'S1',note_tr:'Gerçek üretim değildir.'}],remaining_checks_tr:['Makale şeması ve bağımsız kanıt denetimi henüz yapılmadı.'],artifact:{kind:'article_draft',title_en:'',description_en:'',body_tr:JSON.stringify({schema_version:1,title:'Synthetic fixture, not real article content'})}});
const response=e=>({finish_reason:'stop',content:JSON.stringify(e)});

test('word allowance grows with distinct verified evidence rather than a fixed SEO article length',()=>{
 const small=policy.evidenceBudget([source(1),source(2)]),large=policy.evidenceBudget(Array.from({length:8},(_,i)=>source(i+1)));
 assert.equal(small.ok,true);assert.equal(small.maxReaderFacingWords,360);assert.equal(large.maxReaderFacingWords,1440);
 assert.equal(large.wordCountIsSeoTarget,false);assert.equal(large.bodyMinCharacters,2000);assert.equal(large.semanticSourceAttributionStillRequiresIndependentReview,true);
});
test('a smaller source word limit is honored and quotation allowance is not a target',()=>{
 const a=source(1);a.summary_word_limit=95;const b=source(2);b.summary_word_limit=999;
 const r=policy.evidenceBudget([a,b]);assert.equal(r.maxReaderFacingWords,275);assert.equal(r.maxVerbatimWordsEach,25);assert.equal(r.preferredVerbatimWordsEach,0);
});
test('mirrors and duplicate URLs cannot manufacture additional source allowance',()=>{
 const a=source(1),b=source(2),mirror={...a,id:'S3',url:'https://mirror.example/article'};
 const r=policy.evidenceBudget([a,b,mirror]);assert.equal(r.ok,true);assert.equal(r.distinctSources,2);assert.equal(r.maxReaderFacingWords,360);
 assert.equal(policy.evidenceBudget([a,mirror]).ok,false);
});
test('hash mismatch, incomplete or oversized bodies do not silently pass or truncate',()=>{
 for(const mutate of [s=>s.content+='changed',s=>s.content_truncated=true,s=>delete s.full_content,s=>s.full_content=false,s=>s.http_status=404,s=>{s.content='x'.repeat(40001);s.content_sha256=hash(s.content);},s=>s.content_sha256=undefined]){
  const a=source(1);mutate(a);assert.equal(policy.evidenceBudget([a,source(2)]).ok,false);
 }
});
test('source count and cumulative context are bounded without clipping source text',()=>{
 assert.equal(policy.evidenceBudget(Array.from({length:13},(_,i)=>source(i+1))).ok,false);
 const sources=Array.from({length:7},(_,i)=>source(i+1,36000));const before=sources.map(s=>s.content);
 const r=policy.evidenceBudget(sources);assert.equal(r.ok,false);assert(r.errors.includes('SOURCE_CONTEXT_LIMIT_EXCEEDED_RESELECT_NEVER_TRUNCATE'));assert.deepEqual(sources.map(s=>s.content),before);
});
test('empty DeepSeek JSON output and truncated completion remain explicit held outcomes',()=>{
 assert.equal(policy.parseWriterResponse({finish_reason:'stop',content:'   '},'fixture-task').reason,'EMPTY_MODEL_JSON_RESPONSE');
 const r=policy.parseWriterResponse({finish_reason:'length',content:JSON.stringify(envelope())},'fixture-task');assert.equal(r.ok,false);assert.equal(r.automaticPaidRetry,false);
});
test('outer article metadata regression is rejected even when inner JSON is valid',()=>{
 for(const key of ['title_en','description_en']){const e=envelope();e.artifact[key]='This is not the correct metadata location';assert.equal(policy.parseWriterResponse(response(e),'fixture-task').reason,'ARTICLE_OUTER_METADATA_MUST_BE_EMPTY');}
});
test('inner article must be a JSON string, not an object, Markdown or a false-success empty result',()=>{
 for(const [value,reason] of [[{schema_version:1},'ARTICLE_BODY_MUST_BE_JSON_STRING'],['```json\n{}\n```','INVALID_INNER_ARTICLE_JSON'],['','WRITER_BLOCKED_OR_EMPTY_ARTICLE']]){
  const e=envelope();e.artifact.body_tr=value;assert.equal(policy.parseWriterResponse(response(e),'fixture-task').reason,reason);
 }
});
test('writer response is bound to the expected task and exact existing outer contract',()=>{
 const e=envelope();assert.equal(policy.parseWriterResponse(response(e),'different-task').reason,'TASK_KEY_MISMATCH');e.title_en='';assert.equal(policy.parseWriterResponse(response(e),'fixture-task').reason,'UNEXPECTED_OUTER_KEYS');
});
test('a valid envelope never pretends structural parsing is editorial or publication approval',()=>{
 const r=policy.parseWriterResponse(response(envelope()),'fixture-task');assert.equal(r.ok,true);assert.equal(r.requiresExistingArticleValidation,true);assert.equal(r.requiresIndependentEditorialReview,true);assert.equal(r.publicationAuthorized,false);
});
test('all four prompt schema examples are JSON-safe and preserve the agreed narrowing/audit fields',()=>{
 assert.doesNotThrow(()=>JSON.parse(JSON.stringify(policy.PLAN_SHAPE)));
 assert.deepEqual(Object.keys(policy.CRITIC_SHAPE.scope_narrowing).sort(),['applied','excluded_requirement_ids','prohibited_claims','reason']);
 assert.equal(typeof policy.AUDIT_SHAPE.scope_narrowing_approved,'boolean');
 assert.equal(policy.WRITER_EXAMPLE.artifact.title_en,'');assert.equal(policy.WRITER_EXAMPLE.artifact.description_en,'');
 assert.equal(typeof policy.WRITER_EXAMPLE.artifact.body_tr,'string');assert.equal(JSON.parse(policy.WRITER_EXAMPLE.artifact.body_tr).schema_version,1);
});
test('export v3 names the integrated validator without granting legacy approval',()=>{
 assert.equal(policy.EXPORT_ADMISSION_V3_DESIGN.status,'integrated_shared_research_v3_admission');assert.equal(policy.EXPORT_ADMISSION_V3_DESIGN.validator,'automation/content/research-v3-contracts.cjs#validateFinalPacket');assert.equal(policy.EXPORT_ADMISSION_V3_DESIGN.version,3);assert.equal(policy.EXPORT_ADMISSION_V3_DESIGN.requiredPassed,true);assert.equal(policy.EXPORT_ADMISSION_V3_DESIGN.additionalToExistingChecks,true);
});
test('research prompts carry the same controller-only discovery registry and version',()=>{
 assert.equal(policy.POLICY_VERSION,'flexiknee-editorial-v3.2026-11-10.4');
 for(const prompt of [policy.PLANNER_PROMPT,policy.CRITIC_PROMPT,policy.RESEARCH_AUDIT_PROMPT]){
  assert.ok(prompt.includes(JSON.stringify(policy.APPROVED_DISCOVERY_SCOPE)));
  assert.ok(prompt.includes('approved_discovery_scope'));assert.ok(prompt.includes('EXACTLY ONE site:'));
 }
 assert.deepEqual(policy.APPROVED_DISCOVERY_SCOPE.publisher_groups.find(g=>g.id==='nih').site_filters,['nih.gov','pubmed.ncbi.nlm.nih.gov','pmc.ncbi.nlm.nih.gov']);
});
test('first-round examples cover descriptive and safety questions across independent publisher groups',()=>{
 const examples=policy.DISCOVERY_QUERY_EXAMPLES;
 assert.deepEqual(examples.map(q=>q.purpose),['descriptive','safety']);
 const checked=examples.map(q=>policy.discoveryQueryCheck(q.query));assert.ok(checked.every(q=>q.ok));
 assert.equal(new Set(checked.map(q=>q.publisherGroup)).size,2);
 assert.ok(checked.every(q=>q.semanticGapReviewRequired),'Syntax never substitutes for useful evidence');
});
test('query preflight rejects missing/multiple filters, unregistered hosts and oversized Unicode input',()=>{
 for(const query of ['knee support options','site:nhs.uk site:cdc.gov knee pain','site:nhs.uk.evil.example knee pain','site:my.clevelandclinic.org knee pain','site:nhs.uk','site:nhs.uk '+ '🦵'.repeat(117)])assert.equal(policy.discoveryQueryCheck(query).ok,false,query);
 const atLimit='site:nhs.uk '+ '🦵'.repeat(116);assert.equal(Array.from(atLimit).length,128);assert.equal(policy.discoveryQueryCheck(atLimit).ok,true);
});
test('controller discovery scope can narrow but never expand the actual registry',()=>{
 const narrow={publisher_groups:[{id:'nhs',site_filters:['nhs.uk','unregistered.example']}]};
 assert.equal(policy.discoveryQueryCheck('site:nhs.uk knee pain warning signs',narrow).ok,true);
 assert.equal(policy.discoveryQueryCheck('site:cdc.gov knee pain warning signs',narrow).ok,false);
 assert.equal(policy.discoveryQueryCheck('site:unregistered.example knee pain',narrow).ok,false);
 assert.equal(policy.discoveryQueryCheck('site:pubmed.ncbi.nlm.nih.gov knee supports').publisherGroup,policy.discoveryQueryCheck('site:pmc.ncbi.nlm.nih.gov knee supports').publisherGroup);
});
test('planner proposals are distinct from the first batch and later critic-authorized work',()=>{
 assert.match(policy.PLANNER_PROMPT,/full ordered proposal list, not the next dispatch batch/);
 assert.match(policy.PLANNER_PROMPT,/remaining total search-call budget, capped at SIX/);
 assert.match(policy.PLANNER_PROMPT,/dispatches ONLY the first TWO/);
 assert.match(policy.PLANNER_PROMPT,/no automatic follow-on queue/);
 assert.match(policy.CRITIC_PROMPT,/explicitly choose at most TWO queries/);
 assert.match(policy.CRITIC_PROMPT,/gaps\[\]\.next_query_ids/);
 assert.match(policy.CRITIC_PROMPT,/Never treat a dormant proposal as an executed search/);
});

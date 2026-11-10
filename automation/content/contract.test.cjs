const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');
const core=require('./content-core.cjs');const {draftFiles}=require('./export-draft.cjs');
const files=Object.fromEntries(['guides','recent-guides-data','recent-article-loaders','recent-article-ctas','guide-thumbnail-loaders'].map(p=>['src/data/'+p+'.ts',fs.readFileSync(path.join(__dirname,'../../src/data/'+p+'.ts'),'utf8')]));
const guides=core.inventory([files['src/data/guides.ts'],files['src/data/recent-guides-data.ts']]);
const source=(id,url)=>({id,url,title:'Test source '+id,publisher:'Test publisher',retrieved_at:new Date().toISOString(),content_truncated:false,content:'This is synthetic test evidence, not a real source quotation. '.repeat(30)});
const research={status:'sources_available',source_preflight:{version:2,passed:true},provider:'deepseek_search',created_at:new Date().toISOString(),sources:[source('S1','https://www.nhs.uk/symptoms/knee-pain/'),source('S2','https://orthoinfo.aaos.org/en/staying-healthy/exercise/')]};
const raw={schema_version:1,slug:'synthetic-content-pipeline-contract-fixture',title:'Synthetic content pipeline contract fixture',metaTitle:'Synthetic editorial pipeline contract example',metaDescription:'This synthetic test checks the article drafting contract and cannot be treated as real editorial content or a published health guide.',intro:'A synthetic introduction used solely to check the article contract. It is not intended for publication and contains no clinical advice.',quickAnswer:'This synthetic fixture validates the structure of a draft package. It does not represent a researched or published guide.',novelty_tr:'Bu yalnızca test verisidir. Gerçek makale üretimi veya konu araştırması olarak kabul edilemez.',sections:Array.from({length:3},(_,i)=>({heading:'Synthetic section number '+i,paragraphs:['Synthetic contract prose, used only for a structural test. No health claim is supplied. '.repeat(9)],source_ids:['S1','S2']})),faqs:[],internalLinks:[{slug:guides[0].slug,label:guides[0].title}],imagePrompt:'Synthetic editorial test image brief for a photograph of adults in a park. No text, logo, medical devices or health claims.',imageAlt:'Two adults walking along a level park path.',cta:{headline:'Inspect the optional product information',text:'This is synthetic product copy for a structural contract test. It makes no treatment or health outcome claim.'}};
const article=core.validateArticle(raw,research,guides);
const bytes=Buffer.alloc(120);bytes.write('RIFF',0);bytes.write('WEBP',8);
const pkg={schema_version:1,status:'ready_for_draft_export',export_policy:'draft_pr_only_no_merge',manager_decision_key:'fixture-decision',result_key:'fixture-result',article,article_fingerprint:core.fingerprint(JSON.stringify(article)),research,image:{base64:bytes.toString('base64'),mime_type:'image/webp',alt_text:raw.imageAlt,visual_review:{approved:true,violations:[]}}};
test('all 190 current guide records, including quoted-key recent entries, are screened',()=>{assert.ok(guides.length>=190);assert.ok(guides.some(g=>g.slug==='gifts-for-parents-with-knee-pain'));});
test('existing search intent is rejected before paid research',()=>{assert.equal(core.topicCandidate([{query:'knee mobility after 50',impressions:100}],null,guides,[]),null);});
test('source URL filter rejects lookalike domains, HTTP and internal URLs',()=>{for(const u of ['http://www.nhs.uk/knee','https://nhs.uk.evil.com/knee','https://localhost/knee','https://nhs.uk@evil.com/knee'])assert.equal(core.validSourceUrl(u),false);});
test('source snippets do not satisfy full source content',()=>{assert.equal(core.sourcePacket({results:[{url:research.sources[0].url,content:'small snippet'}]},{topic:'test'},new Date().toISOString()).status,'insufficient_sources');});
test('unknown source IDs, duplicates, stale evidence and invented review claims fail',()=>{assert.throws(()=>core.validateArticle({...raw,slug:guides[0].slug},research,guides));const bad=structuredClone(raw);bad.sections[0].source_ids=['S99'];assert.throws(()=>core.validateArticle(bad,research,guides));assert.throws(()=>core.validateArticle(raw,{...research,created_at:'2020-01-01'},guides));assert.throws(()=>core.validateArticle({...raw,intro:raw.intro+' Clinically proven.'},research,guides));});
test('draft exporter refuses changed content or rejected image',()=>{assert.throws(()=>draftFiles({...pkg,article:{...article,title:'Changed after approval'}},files,'2026-11-09'));assert.throws(()=>draftFiles({...pkg,image:{...pkg.image,visual_review:{approved:false,violations:['bad']}}},files,'2026-11-09'));});
test('export adds one guide and preserves every original registration',()=>{const out=draftFiles(pkg,files,'2026-11-09');assert.equal(core.inventory([files['src/data/guides.ts'],out['src/data/recent-guides-data.ts']]).length,guides.length+1);for(const g of guides)assert.ok((files['src/data/guides.ts']+out['src/data/recent-guides-data.ts']).includes('"'+g.slug+'"'));assert.equal(Object.keys(out).length,7);const a=out['src/data/articles/'+article.slug+'.tsx'];assert.match(a,/medicalReviewPending: true/);assert.match(a,/sources:/);assert.ok(!a.includes('PremiumCTA'));assert.match(a,/heroAlt:/);assert.ok(!JSON.stringify(out['automation/content/review-manifests/'+article.slug+'.json']).includes('Synthetic test evidence'));});
test('publication evidence and reporting lag gate measurement',()=>{assert.equal(core.measurementPlan({state:'draft_only'}).state,'await_verified_publication');const now=Date.now(),p={state:'verified_live',slug:'example',production_url:'https://flexi-knee.com/guides/example',canonical:'https://flexi-knee.com/guides/example',commit_sha:'a'.repeat(40),http_status:200,verified_at:new Date().toISOString(),published_at:new Date(now-18*86400000).toISOString()};assert.equal(core.measurementPlan(p,now).state,'ready');assert.equal(core.measurementPlan({...p,published_at:new Date(now-10*86400000).toISOString()},now).state,'await_data');});

const isoAgo=ms=>new Date(Date.now()-ms).toISOString();
const day=86400000;
function rejectResearch(mutate){
 const invalid=structuredClone(research);mutate(invalid);
 assert.throws(()=>core.validateArticle(raw,invalid,guides),/Missing, expired or incomplete research/);
 assert.throws(()=>draftFiles({...pkg,research:invalid},files,'2026-11-09'),/Missing, expired or incomplete research/);
}
function cachedResearch(){
 return {...structuredClone(research),provider:'source_bank_cache',topic:'Why do knees click when bending?',expires_at:isoAgo(-day),sources:research.sources.map(s=>({...s,retrieved_at:isoAgo(4*day),expires_at:isoAgo(-day),review_state:'scope_screen_passed_pending_independent_review'}))};
}
test('writer and exporter both require a passed current preflight and complete bodies',()=>{
 for(const mutate of [r=>delete r.source_preflight,r=>r.source_preflight.passed=false,r=>r.source_preflight.version=1,r=>r.status='insufficient_sources',r=>r.sources[0].content_truncated=true,r=>delete r.sources[0].content_truncated,r=>r.sources[0].content='snippet'])rejectResearch(mutate);
});
test('writer and exporter reject invalid, stale or future packet and source timestamps',()=>{
 for(const mutate of [r=>r.created_at='bad date',r=>r.created_at=isoAgo(4*day),r=>r.created_at=isoAgo(-10*60000),r=>r.sources[0].retrieved_at='bad date',r=>r.sources[0].retrieved_at=isoAgo(4*day),r=>r.sources[0].retrieved_at=isoAgo(-10*60000)])rejectResearch(mutate);
});
test('explicit packet and source expiry is enforced even for direct-provider research',()=>{
 for(const mutate of [r=>r.expires_at=isoAgo(1000),r=>r.expires_at='bad date',r=>r.sources[0].expires_at=isoAgo(1000),r=>r.sources[0].expires_at='bad date'])rejectResearch(mutate);
});
test('duplicate source identities and malformed source packets cannot authorize a draft',()=>{
 for(const mutate of [r=>r.sources[1].id=r.sources[0].id,r=>r.sources[1].url=r.sources[0].url,r=>r.sources[0]=null,r=>r.sources=[],r=>delete r.sources])rejectResearch(mutate);
});
test('unexpired narrowly scoped cached evidence remains exportable after three days',()=>{
 const cached=cachedResearch();assert.doesNotThrow(()=>core.validateArticle(raw,cached,guides));
 assert.equal(Object.keys(draftFiles({...pkg,research:cached},files,'2026-11-09')).length,7);
});
test('a fresh cache wrapper never revives expired sources or broadens their clinical scope',()=>{
 for(const mutate of [r=>r.expires_at=isoAgo(1000),r=>r.sources[0].expires_at=isoAgo(1000),r=>delete r.sources[0].expires_at,r=>r.sources[0].expires_at=isoAgo(-4*day),r=>r.sources[0].review_state='unreviewed',r=>r.topic='Knee clicking after knee replacement surgery']){
  const cached=cachedResearch();mutate(cached);
  assert.throws(()=>core.validateArticle(raw,cached,guides),/Missing, expired or incomplete research/);
  assert.throws(()=>draftFiles({...pkg,research:cached},files,'2026-11-09'),/Missing, expired or incomplete research/);
 }
});
test('source packet helper rejects over-limit and provider-truncated bodies without clipping',()=>{
 for(const content of [research.sources[0].content,'X'.repeat(14001)]){
  const results=research.sources.map(s=>({...s,content,content_truncated:content.length<=14000}));
  const packet=core.sourcePacket({results},{topic:'Synthetic fixture'},new Date().toISOString());
  assert.equal(packet.status,'insufficient_sources');assert.deepEqual(packet.sources,[]);
 }
 const truncated=core.sourcePacket({results:research.sources.map(s=>({...s,truncated:true}))},{topic:'Synthetic fixture'},new Date().toISOString());
 assert.equal(truncated.status,'insufficient_sources');assert.deepEqual(truncated.sources,[]);
 const packet=core.sourcePacket({results:research.sources},{topic:'Synthetic fixture'},new Date().toISOString());
 assert.equal(packet.sources[0].content,research.sources[0].content);assert.equal(packet.sources[0].content_truncated,false);
 assert.throws(()=>core.validateArticle(raw,packet,guides),/Missing, expired or incomplete research/);
});


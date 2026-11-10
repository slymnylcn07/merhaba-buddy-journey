'use strict';
// Pure research contracts. No HTTP, model invocation, DB writes, credential access,
// clinical judgement, or automatic retry. Persist reservations with caller-side CAS
// BEFORE a request. Provenance MUST come from the authenticated transport adapter,
// never from an analyst's JSON. Hashes bind data; they do not authenticate a provider.
const CAPS = Object.freeze({ rounds:3, searches:6, analyst_calls:4, independent_reviews:2,
  queries_per_round:2, results_per_search:6, fetches_per_round:6, sources:12,
  source_chars:40000, aggregate_source_chars:240000, pdf_pages:20 });
const CORE_PACKET_KEYS=Object.freeze(['schema_version','topic','topic_key','main_sha','created_at','expires_at','provider','status','research_status','medical_claims_verified','source_topic_review','sources','source_preflight','research_audit']);
const TERMINAL = new Set(['satisfied','insufficient','budget_exhausted']);
const clone = x => JSON.parse(JSON.stringify(x));
function stable(x) { return JSON.stringify(x && typeof x==='object' ? Array.isArray(x) ? x.map(v=>JSON.parse(stable(v))) : Object.fromEntries(Object.keys(x).sort().map(k=>[k,JSON.parse(stable(x[k]))])) : x); }
function hash(value) {
  // SHA-256 over UTF-8, using only standard JavaScript. Matches Node crypto;
  // lone UTF-16 surrogates encode as U+FFFD. No Buffer/TextEncoder/require.
  const text=typeof value==='string'?value:stable(value),bytes=[];
  for(let i=0;i<text.length;i++){let cp=text.charCodeAt(i);if(cp>=0xd800&&cp<=0xdbff){const low=text.charCodeAt(i+1);if(low>=0xdc00&&low<=0xdfff){cp=0x10000+((cp-0xd800)<<10)+(low-0xdc00);i++;}else cp=0xfffd;}else if(cp>=0xdc00&&cp<=0xdfff)cp=0xfffd;
    if(cp<128)bytes.push(cp);else if(cp<2048)bytes.push(0xc0|(cp>>6),0x80|(cp&63));else if(cp<65536)bytes.push(0xe0|(cp>>12),0x80|((cp>>6)&63),0x80|(cp&63));else bytes.push(0xf0|(cp>>18),0x80|((cp>>12)&63),0x80|((cp>>6)&63),0x80|(cp&63));}
  const bitHigh=Math.floor(bytes.length/0x20000000),bitLow=(bytes.length*8)>>>0;bytes.push(0x80);while(bytes.length%64!==56)bytes.push(0);for(const n of [bitHigh,bitLow])for(let i=3;i>=0;i--)bytes.push((n>>>(i*8))&255);
  const k=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
  const h=[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19],ror=(x,n)=>(x>>>n)|(x<<(32-n));
  for(let offset=0;offset<bytes.length;offset+=64){const w=new Array(64);for(let i=0;i<16;i++)w[i]=((bytes[offset+i*4]<<24)|(bytes[offset+i*4+1]<<16)|(bytes[offset+i*4+2]<<8)|bytes[offset+i*4+3])>>>0;
    for(let i=16;i<64;i++){const x=w[i-15],y=w[i-2];w[i]=((ror(x,7)^ror(x,18)^(x>>>3))+w[i-16]+(ror(y,17)^ror(y,19)^(y>>>10))+w[i-7])>>>0;}
    let [a,b,c,d,e,f,g,z]=h;for(let i=0;i<64;i++){const t1=(z+(ror(e,6)^ror(e,11)^ror(e,25))+((e&f)^(~e&g))+k[i]+w[i])>>>0,t2=((ror(a,2)^ror(a,13)^ror(a,22))+((a&b)^(a&c)^(b&c)))>>>0;z=g;g=f;f=e;e=(d+t1)>>>0;d=c;c=b;b=a;a=(t1+t2)>>>0;}[a,b,c,d,e,f,g,z].forEach((n,i)=>h[i]=(h[i]+n)>>>0);
  }return h.map(n=>n.toString(16).padStart(8,'0')).join('');
}
function fail(message) { throw Error(message); }
function ok(condition,message) { if(!condition)fail(message); }
function shape(v,required,optional=[]) {
  ok(v && typeof v==='object' && !Array.isArray(v),'EXPECTED_OBJECT');
  ok(required.every(k=>Object.hasOwn(v,k)),'MISSING_FIELD:'+required.filter(k=>!Object.hasOwn(v,k)).join(','));
  ok(Object.keys(v).every(k=>required.includes(k)||optional.includes(k)),'UNKNOWN_FIELD:'+Object.keys(v).filter(k=>!required.includes(k)&&!optional.includes(k)).join(','));
}
function str(v,min=1,max=2000) { ok(typeof v==='string' && v.length>=min && v.length<=max && (min===0||v.trim().length>0),'INVALID_STRING'); return v; }
function id(v) { str(v,1,100);ok(/^[A-Za-z0-9][A-Za-z0-9:_-]*$/.test(v),'INVALID_ID');return v; }
function bool(v) { ok(typeof v==='boolean','EXPECTED_BOOLEAN'); }
function integer(v,min,max) { ok(Number.isSafeInteger(v)&&v>=min&&v<=max,'INVALID_INTEGER'); }
function list(v,min,max) { ok(Array.isArray(v)&&v.length>=min&&v.length<=max,'INVALID_ARRAY_LENGTH');return v; }
function texts(v,min=0,max=20) { list(v,min,max).forEach(x=>str(x,1,2000)); }
function unique(v,key=x=>x) { ok(new Set(v.map(key)).size===v.length,'DUPLICATE_ID_OR_VALUE'); }
function date(v) { str(v,10,40);ok(/^\d{4}-\d{2}-\d{2}T/.test(v)&&Number.isFinite(Date.parse(v)),'INVALID_ISO_DATE');return Date.parse(v); }
function rawJson(v) { if(typeof v==='string'){ok(v.length<=150000,'MODEL_JSON_TOO_LARGE');return JSON.parse(v);}return clone(v); }
function publicUrl(v) {
  str(v,8,2048);const m=/^https:\/\/([a-z0-9](?:[a-z0-9.-]*[a-z0-9])?)(\/[^\s#\\]*|\?[^\s#\\]*)?$/i.exec(v);
  ok(m,'UNSAFE_URL');const host=m[1].toLowerCase();ok(!host.includes('..')&&host.split('.').every(x=>/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(x))&&/\.[a-z]{2,}$/.test(host)&&!/(?:^|\.)(?:localhost|local)$/.test(host),'NONPUBLIC_URL');
  return 'https://'+host+(m[2]?.startsWith('?')?'/'+m[2]:m[2]||'/');
}
function publisherId(url) {
  const normalized=publicUrl(url),m=/^https:\/\/([^/]+)(\/.*)$/.exec(normalized),h=m[1],pathname=m[2].split('?')[0],suffix=d=>h===d||h.endsWith('.'+d);
  if(suffix('nhs.uk'))return 'nhs';if(suffix('nih.gov'))return 'nih';if(suffix('cdc.gov'))return 'cdc';
  if(h==='orthoinfo.aaos.org')return 'aaos';if(h==='my.clevelandclinic.org'&&pathname.startsWith('/health/'))return 'cleveland_clinic';
  if(['mayoclinic.org','www.mayoclinic.org'].includes(h))return 'mayo_clinic';
  if(suffix('cochrane.org')||['cochranelibrary.com','www.cochranelibrary.com'].includes(h))return 'cochrane';
  fail('UNREGISTERED_PUBLISHER');
}
function event(s,type,at,details={}) {
  date(at);const prev=s.ledger.at(-1)?.event_hash||null;
  const e={sequence:s.ledger.length+1,type,at,details:clone(details),previous_hash:prev};
  s.ledger.push({...e,event_hash:hash(e)});return s;
}
function active(s,at=s.updated_at) { ok(s.schema_version===3&&!TERMINAL.has(s.status),'RESEARCH_TERMINAL');ok(date(at)>=date(s.created_at)&&date(at)<date(s.expires_at),'RESEARCH_EXPIRED_OR_TIME_REVERSED'); }
function provenance(p,kind,callId,s) {
  shape(p,['call_id','provider','model','request_id','response_id','at','http_status']);id(p.call_id);str(p.request_id,1,300);str(p.response_id,1,300);
  date(p.at);integer(p.http_status,100,599);ok(p.call_id===callId,'CALL_ID_MISMATCH');ok(date(p.at)>=date(s.created_at)&&date(p.at)<date(s.expires_at),'PROVENANCE_OUTSIDE_WINDOW');
  const provider={planner:'deepseek',critic:'deepseek',search:'deepseek_search',independent_review:'openai',verification:'direct_http_extractor'}[kind];
  ok(p.provider===provider,'PROVENANCE_PROVIDER_MISMATCH');
  if(['planner','critic'].includes(kind))ok(typeof p.model==='string'&&/^deepseek-[a-z0-9.-]+$/.test(p.model),'WRONG_ANALYST_MODEL');
  else if(kind==='independent_review')ok(['gpt-6.1-sol','gpt-6-sol'].includes(p.model),'WRONG_INDEPENDENT_REVIEWER');
  else ok(p.model===null,'NONMODEL_PROVENANCE');
  return clone(p);
}
function createState(config) {
  shape(config,['topic','topic_key','main_sha','created_at','expires_at'],['limits']);str(config.topic,8,500);id(config.topic_key);ok(/^[a-f0-9]{40}$/.test(config.main_sha),'INVALID_PINNED_COMMIT');
  const start=date(config.created_at),end=date(config.expires_at);ok(end>start&&end-start<=3*86400000,'INVALID_RESEARCH_WINDOW');
  const limits={...CAPS};if(config.limits){shape(config.limits,[],Object.keys(CAPS));for(const [k,v]of Object.entries(config.limits)){integer(v,1,CAPS[k]);limits[k]=v;}}
  const s={schema_version:3,topic:config.topic,topic_key:config.topic_key,main_sha:config.main_sha,created_at:config.created_at,expires_at:config.expires_at,updated_at:config.created_at,
    status:'active',phase:'needs_plan',limits,counters:{rounds:0,searches:0,analyst_calls:0,independent_reviews:0},plan:null,pending:null,calls:[],rounds:[],sources:[],verification_attempts:[],critiques:[],independent_reviews:[],ledger:[],terminal_reason:null};
  return event(s,'research_created',config.created_at,{topic:config.topic,limits});
}
function knownRequirements(s,ids) {list(ids,1,10).forEach(id);unique(ids);ok(ids.every(x=>s.plan.evidence_requirements.some(r=>r.id===x)),'UNKNOWN_REQUIREMENT_ID');}
function query(q,s,allIds=[]) {
  shape(q,['id','query','requirement_ids']);id(q.id);str(q.query,1,500);ok(Array.from(q.query).length<=128,'QUERY_EXCEEDS_128_UNICODE_CHARACTERS');ok(q.query.trim()===q.query,'QUERY_OUTER_WHITESPACE');knownRequirements(s,q.requirement_ids);
  ok(!allIds.includes(q.id),'REUSED_QUERY_ID');
  ok(!s.rounds.flatMap(r=>r.queries).some(old=>old.query.toLowerCase().replace(/\s+/g,' ')===q.query.toLowerCase().replace(/\s+/g,' ')),'REPEATED_QUERY_TEXT');
}
function validatePlan(raw, state) {
  const p=rawJson(raw);shape(p,['schema_version','topic','subquestions','evidence_requirements','search_queries','editorial_scope']);ok(p.schema_version===1&&p.topic===state.topic,'PLAN_TOPIC_OR_VERSION_MISMATCH');
  list(p.subquestions,1,8).forEach(x=>{shape(x,['id','question']);id(x.id);str(x.question,5,1000);});unique(p.subquestions,x=>x.id);
  list(p.evidence_requirements,1,10).forEach(r=>{shape(r,['id','subquestion_ids','claim_goal','population','intervention','comparator','outcome','study_requirement','max_source_age_days','mandatory']);id(r.id);list(r.subquestion_ids,1,8).forEach(id);unique(r.subquestion_ids);ok(r.subquestion_ids.every(x=>p.subquestions.some(q=>q.id===x)),'UNKNOWN_SUBQUESTION');str(r.claim_goal,5,1500);str(r.population,1,500);str(r.intervention,1,500);str(r.comparator,0,500);str(r.outcome,1,500);ok(['descriptive','direct_comparison','safety'].includes(r.study_requirement),'INVALID_STUDY_REQUIREMENT');if(r.study_requirement==='direct_comparison')str(r.comparator,1,500);if(r.max_source_age_days!==null)integer(r.max_source_age_days,1,36500);bool(r.mandatory);});
  unique(p.evidence_requirements,r=>r.id);ok(p.evidence_requirements.some(r=>r.mandatory&&r.study_requirement!=='direct_comparison'),'MANDATORY_NONCOMPARATIVE_REQUIREMENT_REQUIRED');
  shape(p.editorial_scope,['article_purpose','prohibited_claims']);str(p.editorial_scope.article_purpose,10,1500);texts(p.editorial_scope.prohibited_claims,1,20);
  // The immutable plan may describe the entire authorized search allowance.
  // Only its first bounded batch is scheduled; later entries remain suggestions.
  list(p.search_queries,1,state.limits.searches).forEach(q=>query(q,{...state,plan:p}));unique(p.search_queries,q=>q.id);unique(p.search_queries,q=>q.query.toLowerCase());return p;
}
function reserveCall(state,request) {
  shape(request,['id','kind','now'],['query_id']);active(state,request.now);ok(!state.pending,'PENDING_CALL_MUST_BE_SETTLED');id(request.id);ok(!state.calls.some(c=>c.id===request.id),'CALL_ALREADY_RESERVED');
  const s=clone(state),kind=request.kind;ok(['planner','search','critic','independent_review'].includes(kind),'INVALID_CALL_KIND');
  let counter,cap;
  if(kind==='planner'){ok(s.phase==='needs_plan'&&!s.plan,'PLAN_ALREADY_PRESENT');counter='analyst_calls';cap=s.limits.analyst_calls;}
  if(kind==='search'){ok(s.phase==='collecting','NOT_COLLECTING');const r=s.rounds.at(-1);ok(r.queries.some(q=>q.id===request.query_id)&&!r.searches.some(x=>x.query_id===request.query_id),'QUERY_NOT_AVAILABLE');counter='searches';cap=s.limits.searches;}
  if(kind==='critic'){ok(s.phase==='collecting','CRITIQUE_NOT_AVAILABLE');const r=s.rounds.at(-1);ok(r.searches.length===r.queries.length,'ROUND_SEARCHES_INCOMPLETE');ok(getVerificationCandidates(s).length===0,'DIRECT_SOURCE_VERIFICATION_INCOMPLETE');counter='analyst_calls';cap=s.limits.analyst_calls;}
  if(kind==='independent_review'){ok(s.phase==='awaiting_independent_review','INDEPENDENT_REVIEW_NOT_AVAILABLE');counter='independent_reviews';cap=s.limits.independent_reviews;}
  ok(s.counters[counter]<cap,'CALL_BUDGET_EXHAUSTED');s.counters[counter]++;s.pending={id:request.id,kind,query_id:request.query_id||null,round:s.counters.rounds,reserved_at:request.now};s.calls.push(clone(s.pending));s.updated_at=request.now;
  return event(s,'call_reserved',request.now,{...s.pending,counters:s.counters});
}
function settle(state,kind,p) {ok(state.pending?.kind===kind,'NO_MATCHING_PENDING_CALL');provenance(p,kind,state.pending.id,state);ok(p.http_status===200,'NON_SUCCESS_RESPONSE_USE_RECORD_FAILURE');const s=clone(state);s.calls.find(c=>c.id===s.pending.id).provenance=clone(p);s.calls.find(c=>c.id===s.pending.id).status='completed';s.pending=null;s.updated_at=p.at;return s;}
function recordPlan(state,raw,p) {const plan=validatePlan(raw,state),s=settle(state,'planner',p);s.plan=plan;s.phase='ready_for_round';s.next_queries=clone(plan.search_queries.slice(0,s.limits.queries_per_round));return event(s,'plan_recorded',p.at,{plan_hash:hash(plan),initial_query_ids:s.next_queries.map(q=>q.id),provenance:p});}
function finish(s,status,reason,at) {s.status=status;s.phase='terminal';s.terminal_reason=reason;s.updated_at=at;return event(s,'research_terminal',at,{status,reason});}
function beginRound(state,now) {
  active(state,now);ok(!state.pending&&state.phase==='ready_for_round','ROUND_NOT_READY');const s=clone(state);
  if(s.counters.rounds>=s.limits.rounds||s.counters.searches+(s.next_queries?.length||1)>s.limits.searches||s.counters.analyst_calls>=s.limits.analyst_calls)return finish(s,'budget_exhausted','Insufficient budget to search and assess another round.',now);
  list(s.next_queries,1,s.limits.queries_per_round);s.counters.rounds++;s.rounds.push({round:s.counters.rounds,started_at:now,queries:clone(s.next_queries),searches:[]});delete s.next_queries;s.phase='collecting';s.updated_at=now;return event(s,'round_started',now,{round:s.counters.rounds});
}
function recordSearch(state,raw,p) {
  const result=rawJson(raw);shape(result,['schema_version','query_id','status','results'],['rejected_results','normalized_results']);ok(result.schema_version===1&&result.query_id===state.pending?.query_id,'SEARCH_ID_MISMATCH');ok(['success','failed'].includes(result.status),'INVALID_SEARCH_STATUS');
  list(result.results,0,state.limits.results_per_search).forEach(x=>{shape(x,['url','title','snippet']);publicUrl(x.url);str(x.title,0,1000);str(x.snippet,0,4000);});if(result.status==='failed')ok(result.results.length===0,'FAILED_SEARCH_HAS_RESULTS');
  if(result.rejected_results!==undefined){list(result.rejected_results,0,state.limits.results_per_search).forEach(r=>{shape(r,['index','reason','url_sha256']);integer(r.index,0,state.limits.results_per_search-1);ok(['UNSAFE_URL','INVALID_RESULT_SHAPE','INVALID_DISCOVERY_TEXT'].includes(r.reason),'UNKNOWN_SEARCH_REJECTION');ok(r.url_sha256===null||/^[a-f0-9]{64}$/.test(r.url_sha256),'INVALID_DISCOVERY_URL_HASH');});unique(result.rejected_results,r=>r.index);}
  if(result.normalized_results!==undefined){list(result.normalized_results,0,state.limits.results_per_search).forEach(r=>{shape(r,['index','original_url','normalized_url','reason']);integer(r.index,0,state.limits.results_per_search-1);str(r.original_url,8,2048);ok(r.reason==='URL_FRAGMENT_REMOVED'&&r.original_url.includes('#')&&publicUrl(r.original_url.split('#')[0])===r.normalized_url,'INVALID_URL_NORMALIZATION');ok(result.results.some(x=>x.url===r.normalized_url),'NORMALIZED_RESULT_MISSING');});unique(result.normalized_results,r=>r.index);}
  ok(result.results.length+(result.rejected_results?.length||0)<=state.limits.results_per_search,'SEARCH_RESULT_CAP');
  const s=settle(state,'search',p);s.rounds.at(-1).searches.push({...result,provenance:clone(p)});return event(s,'search_recorded',p.at,{query_id:result.query_id,status:result.status,result_urls:result.results.map(r=>r.url),rejected_results:clone(result.rejected_results||[]),normalized_results:clone(result.normalized_results||[]),provenance:p});
}
// Adapter for the documented provider response. Unknown provider fields are not
// admitted into model contracts; complete provider provenance remains in the ledger.
function normalizeSearchResponse(queryId,response) {
  ok(response&&Array.isArray(response.results),'SEARCH_RESULTS_MISSING');ok(response.results.length<=6,'SEARCH_RESULT_CAP');
  const result={schema_version:1,query_id:queryId,status:'success',results:[],rejected_results:[],normalized_results:[]};
  response.results.forEach((r,index)=>{const reject=reason=>result.rejected_results.push({index,reason,url_sha256:typeof r?.url==='string'?hash(r.url):null});if(!r||typeof r!=='object'||Array.isArray(r)){reject('INVALID_RESULT_SHAPE');return;}
    let url;try{str(r.url,8,2048);url=publicUrl(r.url.split('#')[0]);}catch{reject('UNSAFE_URL');return;}
    const title=r.title||'',snippet=r.snippet||r.summary||'';try{str(title,0,1000);str(snippet,0,4000);}catch{reject('INVALID_DISCOVERY_TEXT');return;}
    result.results.push({url,title,snippet});if(r.url.includes('#'))result.normalized_results.push({index,original_url:r.url,normalized_url:url,reason:'URL_FRAGMENT_REMOVED'});
  });return result;
}
function getVerificationCandidates(state) {
  const round=state.rounds.at(-1);if(!round)return [];
  const remaining=state.limits.fetches_per_round-state.verification_attempts.filter(a=>a.round===round.round).length;if(remaining<=0)return [];
  const seen=new Set([...state.verification_attempts.map(a=>a.original_url),...state.sources.flatMap(s=>[s.original_url,s.url,s.final_url])]),candidates=[];
  // Round-robin each search's ranked discoveries so the first query cannot
  // monopolize the verification budget or starve an independent publisher.
  const depth=Math.max(0,...round.searches.map(s=>s.results.length));
  for(let i=0;i<depth;i++)for(const search of round.searches){const item=search.results[i];if(!item)continue;const url=publicUrl(item.url);if(seen.has(url))continue;seen.add(url);
    try{publisherId(url);}catch{continue;}candidates.push({id:'S'+hash(url).slice(0,12),url});if(candidates.length===remaining)return candidates;
  }return candidates;
}
function makePassages(source) {
  const text=source.content,spans=[];let start=0;
  // Preserve exact characters. Paragraphs longer than 6000 chars are split into
  // adjacent exact spans, not discarded. Offsets are JavaScript UTF-16 offsets.
  for(const m of text.matchAll(/\n\s*\n/g)){const end=m.index;if(end>start)spans.push([start,end]);start=m.index+m[0].length;}
  if(start<text.length)spans.push([start,text.length]);
  return spans.flatMap(([a,b])=>{const out=[];for(let p=a;p<b;p+=6000){const end=Math.min(b,p+6000),part=text.slice(p,end);if(part.trim())out.push({id:source.id+':p'+p+'-'+end,start:p,end,text:part,sha256:hash(part)});}return out;});
}
function validateVerifiedSource(src,state,candidate) {
  shape(src,['id','url','original_url','final_url','title','publisher','publisher_id','retrieved_at','content','content_sha256','content_truncated','full_content','http_status','mime_type','dates','canonical_url','extraction','extractor_provenance','content_scope'],['sha256','document_title','canonical_status','scope_note','content_provenance']);
  ok(src.id===candidate.id&&publicUrl(src.original_url)===candidate.url,'SOURCE_CANDIDATE_MISMATCH');ok(src.url===src.final_url,'FINAL_URL_MISMATCH');publicUrl(src.final_url);ok(src.publisher_id===publisherId(src.final_url),'PUBLISHER_REGISTRY_MISMATCH');str(src.publisher,1,500);str(src.title,1,500);date(src.retrieved_at);ok(date(src.retrieved_at)>=date(state.created_at)&&date(src.retrieved_at)<date(state.expires_at),'SOURCE_TIME_OUTSIDE_RESEARCH');
  str(src.content,800,state.limits.source_chars*2);integer(Array.from(src.content).length,800,state.limits.source_chars);ok(src.http_status===200&&src.full_content===true&&src.content_truncated===false,'SOURCE_NOT_COMPLETE_HTTP200');ok(src.content_sha256===hash(src.content)&&(!src.sha256||src.sha256===src.content_sha256),'SOURCE_HASH_MISMATCH');
  ok(src.extractor_provenance==='official-source-verifier/1.0.0','UNKNOWN_EXTRACTOR');ok(['abstract_or_index_record','full_text_article_page','official_health_webpage','patient_education_page','pdf_document'].includes(src.content_scope),'UNKNOWN_CONTENT_SCOPE');
  str(src.mime_type,3,120);if(src.canonical_url!==null)ok(publisherId(src.canonical_url)===src.publisher_id,'CROSS_PUBLISHER_CANONICAL');
  if(src.document_title!==undefined&&src.document_title!==null)str(src.document_title,0,2000);
  if(src.canonical_status!==undefined)ok(['not_present','matches_final_url','page_declared_alternate_url','not_applicable_pdf'].includes(src.canonical_status),'UNKNOWN_CANONICAL_STATUS');
  if(src.scope_note!==undefined)str(src.scope_note,1,1500);
  if(src.content_provenance!==undefined){const p=src.content_provenance;shape(p,['kind','text_trust','topic_relevance_verified','clinical_claims_verified','dates_certainty']);ok(p.kind==='direct_https_get'&&p.text_trust==='untrusted_source_data'&&p.topic_relevance_verified===false&&p.clinical_claims_verified===false&&p.dates_certainty==='visible_page_labels_only','INVALID_CONTENT_PROVENANCE');}
  list(src.dates,0,20).forEach(d=>{shape(d,['label','value','source'],['confidence','is_verified_publication_date']);str(d.label,1,200);str(d.value,1,200);ok(d.source==='visible_text','INFERRED_SOURCE_DATE');if(d.confidence!==undefined)ok(d.confidence==='visible_label_only','INFERRED_DATE_CERTAINTY');if(d.is_verified_publication_date!==undefined)ok(d.is_verified_publication_date===false,'UNVERIFIED_PUBLICATION_DATE');});
  shape(src.extraction,['method','chars'],['pages','bytes','javascript_executed','whitespace_normalized','visible_main_text_only','linked_resources_retrieved','ocr_performed','image_content_interpreted','redirects_followed']);str(src.extraction.method,1,100);ok(src.extraction.chars===Array.from(src.content).length,'EXTRACTION_LENGTH_MISMATCH');if(src.extraction.pages!==undefined&&src.extraction.pages!==null)integer(src.extraction.pages,1,state.limits.pdf_pages);
  if(src.mime_type==='application/pdf')integer(src.extraction.pages,1,state.limits.pdf_pages);if(src.extraction.bytes!==undefined)integer(src.extraction.bytes,1,10000000);if(src.extraction.redirects_followed!==undefined)integer(src.extraction.redirects_followed,0,5);
  for(const k of ['javascript_executed','linked_resources_retrieved','ocr_performed','image_content_interpreted'])if(src.extraction[k]!==undefined)ok(src.extraction[k]===false,'UNSUPPORTED_EXTRACTION_CAPABILITY');for(const k of ['whitespace_normalized','visible_main_text_only'])if(src.extraction[k]!==undefined)ok(src.extraction[k]===true,'EXTRACTION_PROVENANCE_MISMATCH');
  return {...clone(src),passages:makePassages(src),text_is_untrusted:true};
}
function addVerifiedSources(state,envelope,p) {
  active(state,p.at);ok(state.phase==='collecting'&&!state.pending,'VERIFICATION_NOT_AVAILABLE');shape(envelope,['schema_version','results'],['extractor_provenance']);ok(envelope.schema_version===1,'VERIFIER_SCHEMA_VERSION');if(envelope.extractor_provenance!==undefined)ok(envelope.extractor_provenance==='official-source-verifier/1.0.0','UNKNOWN_EXTRACTOR');list(envelope.results,1,state.limits.fetches_per_round);unique(envelope.results,r=>r.id);
  provenance(p,'verification',p.call_id,state);ok(p.http_status===200,'VERIFIER_TRANSPORT_FAILED');ok(!state.ledger.some(e=>e.details.provenance?.call_id===p.call_id),'REPLAYED_VERIFIER_RECEIPT');
  const s=clone(state),candidates=getVerificationCandidates(s);const approved=[];
  for(const r of envelope.results){shape(r,['id','status'],['source','error']);const c=candidates.find(x=>x.id===r.id);ok(c,'UNREQUESTED_VERIFICATION_SOURCE');ok(['accepted','rejected'].includes(r.status),'INVALID_VERIFIER_STATUS');
    if(r.status==='accepted'){ok(r.source&&!r.error,'AMBIGUOUS_VERIFIER_RESULT');const src=validateVerifiedSource(r.source,s,c);approved.push({src,c});}
    else{ok(!r.source&&r.error,'AMBIGUOUS_VERIFIER_RESULT');shape(r.error,['code','message']);str(r.error.code,1,100);str(r.error.message,1,1000);s.verification_attempts.push({id:c.id,original_url:c.url,status:'rejected',error:clone(r.error),round:s.counters.rounds,provenance:clone(p)});}
  }
  for(const {src,c}of approved){let reason=null;if(s.sources.some(x=>x.id===src.id||x.final_url===src.final_url||x.content_sha256===src.content_sha256))reason='DUPLICATE_SOURCE_OR_SYNDICATED_CONTENT';else if(s.sources.length>=s.limits.sources||s.sources.reduce((n,x)=>n+Array.from(x.content).length,0)+Array.from(src.content).length>s.limits.aggregate_source_chars)reason='SOURCE_STORAGE_BUDGET_EXHAUSTED';
    s.verification_attempts.push({id:c.id,original_url:c.url,status:reason?'rejected':'accepted',...(reason?{error:{code:reason,message:'Whole source rejected; no truncation or partial admission.'}}:{}),round:s.counters.rounds,provenance:clone(p)});if(!reason)s.sources.push(src);
  }
  s.updated_at=p.at;return event(s,'sources_verified',p.at,{accepted_source_ids:s.sources.filter(x=>!state.sources.some(y=>y.id===x.id)).map(x=>x.id),provenance:p});
}
function scope(v) {shape(v,['population','intervention','comparator','outcome']);for(const k of Object.keys(v))str(v[k],k==='comparator'?0:1,500);}
function passageReference(ref,s) {shape(ref,['source_id','passage_id','quote']);const src=s.sources.find(x=>x.id===ref.source_id);ok(src,'FABRICATED_SOURCE_ID');const p=src.passages.find(x=>x.id===ref.passage_id);ok(p,'FABRICATED_PASSAGE_ID');str(ref.quote,12,2000);ok(p.text.includes(ref.quote)&&src.content.slice(p.start,p.end)===p.text&&hash(p.text)===p.sha256,'QUOTE_OR_PASSAGE_MISMATCH');return src;}
function validateCritique(raw,state) {
  const c=rawJson(raw);shape(c,['schema_version','round','decision','source_assessments','claims','contradictions','gaps','next_queries','scope_narrowing','evidence_conclusion']);ok(c.schema_version===1&&c.round===state.counters.rounds,'CRITIQUE_ROUND_MISMATCH');ok(['satisfied','continue','insufficient'].includes(c.decision),'INVALID_CRITIC_DECISION');
  list(c.source_assessments,0,12).forEach(a=>{shape(a,['source_id','relevance','scope','evidence_type','date_assessment','limitations']);ok(state.sources.some(s=>s.id===a.source_id),'FABRICATED_SOURCE_ID');ok(['relevant','irrelevant'].includes(a.relevance),'INVALID_RELEVANCE');scope(a.scope);ok(['direct_comparison','clinical_guidance','descriptive','not_applicable'].includes(a.evidence_type),'INVALID_EVIDENCE_TYPE');texts(a.limitations);shape(a.date_assessment,['date_label','date_value','within_requirement_limit']);const d=a.date_assessment;ok(d.within_requirement_limit===null||typeof d.within_requirement_limit==='boolean','INVALID_DATE_FIT');if(d.date_label===null||d.date_value===null)ok(d.date_label===null&&d.date_value===null&&d.within_requirement_limit===null,'UNKNOWN_DATE_CANNOT_PASS');else{const src=state.sources.find(s=>s.id===a.source_id);ok(src.dates.some(x=>x.label===d.date_label&&x.value===d.date_value),'FABRICATED_VISIBLE_DATE');}});unique(c.source_assessments,x=>x.source_id);
  list(c.claims,0,20).forEach(cl=>{shape(cl,['id','requirement_id','statement','verdict','comparative_superiority','scope','passages','limitations']);id(cl.id);ok(state.plan.evidence_requirements.some(r=>r.id===cl.requirement_id),'UNKNOWN_REQUIREMENT_ID');str(cl.statement,10,2000);ok(['supported','partial','unsupported','contradicted'].includes(cl.verdict),'INVALID_CLAIM_VERDICT');bool(cl.comparative_superiority);scope(cl.scope);texts(cl.limitations);list(cl.passages,0,8).forEach(p=>passageReference(p,state));unique(cl.passages,p=>p.source_id+'|'+p.passage_id+'|'+p.quote);if(cl.verdict==='supported')ok(cl.passages.length>0,'SUPPORTED_CLAIM_WITHOUT_PASSAGES');ok(cl.passages.every(p=>c.source_assessments.some(a=>a.source_id===p.source_id)),'UNASSESSED_CLAIM_SOURCE');});unique(c.claims,x=>x.id);
  list(c.contradictions,0,10).forEach(x=>{shape(x,['id','claim_ids','source_ids','description','resolution','bounded_claim_ids']);id(x.id);str(x.description,10,1500);list(x.claim_ids,1,20).forEach(id);list(x.source_ids,1,12).forEach(id);list(x.bounded_claim_ids,0,20).forEach(id);ok([...x.claim_ids,...x.bounded_claim_ids].every(y=>c.claims.some(z=>z.id===y)),'UNKNOWN_CONTRADICTED_CLAIM');ok(x.source_ids.every(y=>state.sources.some(z=>z.id===y)),'UNKNOWN_CONTRADICTION_SOURCE');ok(['unresolved','bounded_scope'].includes(x.resolution),'INVALID_CONTRADICTION_RESOLUTION');if(x.resolution==='bounded_scope')ok(x.bounded_claim_ids.length>0,'MISSING_BOUNDED_CLAIMS');});unique(c.contradictions,x=>x.id);
  const oldIds=state.rounds.flatMap(r=>r.queries.map(q=>q.id));list(c.next_queries,0,state.limits.queries_per_round).forEach(q=>query(q,state,oldIds));unique(c.next_queries,q=>q.id);unique(c.next_queries,q=>q.query.toLowerCase());
  list(c.gaps,0,10).forEach(g=>{shape(g,['requirement_id','reason','next_query_ids']);ok(state.plan.evidence_requirements.some(r=>r.id===g.requirement_id),'UNKNOWN_GAP_REQUIREMENT');str(g.reason,10,1500);list(g.next_query_ids,0,2);ok(g.next_query_ids.every(id=>c.next_queries.some(q=>q.id===id&&q.requirement_ids.includes(g.requirement_id))),'GAP_QUERY_MAPPING_MISSING');});unique(c.gaps,x=>x.requirement_id);
  shape(c.scope_narrowing,['applied','reason','excluded_requirement_ids','prohibited_claims']);bool(c.scope_narrowing.applied);str(c.scope_narrowing.reason,0,1500);texts(c.scope_narrowing.prohibited_claims);list(c.scope_narrowing.excluded_requirement_ids,0,10);unique(c.scope_narrowing.excluded_requirement_ids);
  ok(['verified_scope_supported','comparison_not_established_in_verified_set','insufficient'].includes(c.evidence_conclusion),'INVALID_EVIDENCE_CONCLUSION');
  if(c.scope_narrowing.applied){str(c.scope_narrowing.reason,10,1500);texts(c.scope_narrowing.prohibited_claims,1);list(c.scope_narrowing.excluded_requirement_ids,1,10);ok(c.scope_narrowing.excluded_requirement_ids.every(id=>state.plan.evidence_requirements.some(r=>r.id===id&&r.study_requirement==='direct_comparison')),'CANNOT_DROP_SAFETY_OR_DESCRIPTIVE_REQUIREMENT');ok(c.evidence_conclusion==='comparison_not_established_in_verified_set'||(c.decision==='insufficient'&&c.evidence_conclusion==='insufficient'),'NARROWING_CONCLUSION_REQUIRED');ok(!c.claims.some(x=>x.verdict==='supported'&&(x.comparative_superiority||c.scope_narrowing.excluded_requirement_ids.includes(x.requirement_id))),'NARROWED_SCOPE_CANNOT_RANK_OR_CLAIM_EXCLUDED_GOAL');}
  else ok(c.scope_narrowing.excluded_requirement_ids.length===0,'UNDECLARED_SCOPE_NARROWING');
  if(c.decision==='continue'){ok(c.gaps.length>0&&c.next_queries.length>0,'CONTINUE_REQUIRES_GAPS_AND_QUERIES');ok(c.next_queries.every(q=>c.gaps.some(g=>g.next_query_ids.includes(q.id))),'UNGROUNDED_FOLLOWUP_QUERY');}
  else ok(c.next_queries.length===0,'TERMINAL_CRITIC_HAS_QUERIES');return c;
}
function structuralAcceptance(state,c) {
  const issues=[],excluded=c.scope_narrowing.excluded_requirement_ids,claims=c.claims.filter(x=>x.verdict==='supported'&&!excluded.includes(x.requirement_id));
  for(const r of state.plan.evidence_requirements.filter(r=>r.mandatory&&!excluded.includes(r.id)))if(!claims.some(cl=>cl.requirement_id===r.id))issues.push('UNSUPPORTED_REQUIRED_CLAIM:'+r.id);
  if(c.contradictions.some(x=>x.resolution==='unresolved'))issues.push('UNRESOLVED_CONTRADICTION');
  const used=new Set();for(const cl of claims){const req=state.plan.evidence_requirements.find(r=>r.id===cl.requirement_id);for(const key of ['population','intervention','comparator','outcome'])if(cl.scope[key]!==req[key])issues.push('CLAIM_SCOPE_DIFFERS_FROM_REQUIREMENT:'+cl.id+':'+key);
    for(const ref of cl.passages){const src=state.sources.find(s=>s.id===ref.source_id),a=c.source_assessments.find(a=>a.source_id===ref.source_id);used.add(src.id);if(a.relevance!=='relevant')issues.push('IRRELEVANT_SUPPORT_SOURCE:'+src.id);
      if(req.max_source_age_days!==null){const dated=Date.parse(a.date_assessment.date_value);if(a.date_assessment.within_requirement_limit!==true||!Number.isFinite(dated)||dated>Date.parse(state.updated_at)||Date.parse(state.updated_at)-dated>req.max_source_age_days*86400000)issues.push('DATE_LIMIT_UNVERIFIED:'+cl.id);}
    }
    if(cl.comparative_superiority||req.study_requirement==='direct_comparison'){
      const direct=cl.passages.some(ref=>{const src=state.sources.find(s=>s.id===ref.source_id),a=c.source_assessments.find(a=>a.source_id===ref.source_id);return a.evidence_type==='direct_comparison'&&['full_text_article_page','pdf_document'].includes(src.content_scope)&&Object.keys(cl.scope).every(k=>a.scope[k]===cl.scope[k]);});
      if(!direct)issues.push('NO_DIRECT_COMPARATIVE_EVIDENCE:'+cl.id);
    }
  }
  const supporting=state.sources.filter(s=>used.has(s.id));if(supporting.length<2)issues.push('FEWER_THAN_TWO_FULL_RELEVANT_SOURCES');if(new Set(supporting.map(s=>s.publisher_id)).size<2)issues.push('FEWER_THAN_TWO_INDEPENDENT_PUBLISHER_GROUPS');
  if(c.gaps.some(g=>state.plan.evidence_requirements.some(r=>r.id===g.requirement_id&&r.mandatory&&!excluded.includes(r.id))))issues.push('OPEN_MANDATORY_GAPS');return [...new Set(issues)];
}
function routeNext(s,queries,at) {s.next_queries=clone(queries);s.phase='ready_for_round';if(s.counters.rounds>=s.limits.rounds||s.counters.searches+queries.length>s.limits.searches||s.counters.analyst_calls>=s.limits.analyst_calls)return finish(s,'budget_exhausted','Evidence gaps remain and the bounded research budget is exhausted.',at);return s;}
function recordCritique(state,raw,p) {
  const c=validateCritique(raw,state),s=settle(state,'critic',p);const issues=structuralAcceptance(s,c);s.critiques.push({round:s.counters.rounds,critique:c,critique_hash:hash(c),structural_issues:issues,provenance:clone(p)});event(s,'critique_recorded',p.at,{critique_hash:hash(c),decision:c.decision,structural_issues:issues,provenance:p});
  if(c.decision==='continue')return routeNext(s,c.next_queries,p.at);
  if(c.decision==='insufficient'||issues.length)return finish(s,'insufficient',issues.length?'Structural evidence gates failed: '+issues.join(', '):'Analyst reports insufficient evidence.',p.at);
  if(s.counters.independent_reviews>=s.limits.independent_reviews)return finish(s,'budget_exhausted','No independent review budget remains.',p.at);
  s.phase='awaiting_independent_review';return s;
}
function validateIndependentReview(raw,state) {
  const r=rawJson(raw),entry=state.critiques.at(-1),c=entry.critique;
  shape(r,['schema_version','round','critique_hash','decision','claim_reviews','source_reviews','contradiction_reviews','missing_evidence','next_queries','prohibited_claims','unlabelled_comparative_claims_found','scope_overreach_found','scope_narrowing_approved']);
  ok(r.schema_version===1&&r.round===state.counters.rounds&&r.critique_hash===entry.critique_hash,'REVIEW_SNAPSHOT_MISMATCH');ok(['approve','request_more','reject'].includes(r.decision),'INVALID_REVIEW_DECISION');
  for(const k of ['unlabelled_comparative_claims_found','scope_overreach_found','scope_narrowing_approved'])bool(r[k]);texts(r.prohibited_claims);
  list(r.claim_reviews,0,20).forEach(x=>{shape(x,['claim_id','approved','entailment','population_fit','intervention_fit','date_fit','direct_comparison_verified','reason']);ok(c.claims.some(cl=>cl.id===x.claim_id),'FABRICATED_REVIEW_CLAIM');for(const k of ['approved','entailment','population_fit','intervention_fit','date_fit','direct_comparison_verified'])bool(x[k]);str(x.reason,10,1500);});unique(r.claim_reviews,x=>x.claim_id);ok(r.claim_reviews.length===c.claims.length,'ALL_CLAIMS_REQUIRE_REVIEW');
  const used=new Set(c.claims.flatMap(cl=>cl.passages.map(p=>p.source_id)));list(r.source_reviews,0,12).forEach(x=>{shape(x,['source_id','relevant','publisher_independence_verified','full_content_verified','reason']);ok(used.has(x.source_id),'UNMAPPED_REVIEW_SOURCE');for(const k of ['relevant','publisher_independence_verified','full_content_verified'])bool(x[k]);str(x.reason,10,1500);});unique(r.source_reviews,x=>x.source_id);ok(r.source_reviews.length===used.size,'ALL_MAPPED_SOURCES_REQUIRE_REVIEW');
  list(r.contradiction_reviews,0,10).forEach(x=>{shape(x,['contradiction_id','resolved','reason']);ok(c.contradictions.some(z=>z.id===x.contradiction_id),'UNKNOWN_REVIEW_CONTRADICTION');bool(x.resolved);str(x.reason,10,1500);});unique(r.contradiction_reviews,x=>x.contradiction_id);ok(r.contradiction_reviews.length===c.contradictions.length,'ALL_CONTRADICTIONS_REQUIRE_REVIEW');
  list(r.missing_evidence,0,10).forEach(x=>{shape(x,['requirement_id','reason']);ok(state.plan.evidence_requirements.some(q=>q.id===x.requirement_id),'UNKNOWN_REVIEW_REQUIREMENT');str(x.reason,10,1500);});unique(r.missing_evidence,x=>x.requirement_id);
  list(r.next_queries,0,state.limits.queries_per_round).forEach(q=>query(q,state,state.rounds.flatMap(x=>x.queries.map(q=>q.id))));unique(r.next_queries,x=>x.id);unique(r.next_queries,x=>x.query.toLowerCase());
  if(r.decision==='request_more')ok(r.missing_evidence.length>0&&r.next_queries.length>0&&r.next_queries.every(q=>q.requirement_ids.some(id=>r.missing_evidence.some(x=>x.requirement_id===id))),'RESEARCH_REQUEST_NEEDS_MAPPED_GAPS');else ok(r.next_queries.length===0,'UNEXPECTED_REVIEW_QUERIES');return r;
}
function applyIndependentReview(state,raw,p) {
  const review=validateIndependentReview(raw,state),s=settle(state,'independent_review',p),c=s.critiques.at(-1).critique;const issues=structuralAcceptance(s,c);
  for(const cl of c.claims.filter(x=>x.verdict==='supported'&&!c.scope_narrowing.excluded_requirement_ids.includes(x.requirement_id))){const r=review.claim_reviews.find(x=>x.claim_id===cl.id),req=s.plan.evidence_requirements.find(x=>x.id===cl.requirement_id);if(!r.approved||!r.entailment||!r.population_fit||!r.intervention_fit||!r.date_fit)issues.push('INDEPENDENT_CLAIM_REJECTED:'+cl.id);if((cl.comparative_superiority||req.study_requirement==='direct_comparison')&&!r.direct_comparison_verified)issues.push('INDEPENDENT_COMPARISON_NOT_VERIFIED:'+cl.id);for(const ref of cl.passages){const a=review.source_reviews.find(x=>x.source_id===ref.source_id);if(!a.relevant||!a.publisher_independence_verified||!a.full_content_verified)issues.push('INDEPENDENT_SOURCE_REJECTED:'+ref.source_id);}}
  if(review.unlabelled_comparative_claims_found||review.scope_overreach_found)issues.push('SEMANTIC_SCOPE_OR_SUPERIORITY_OVERREACH');if(c.scope_narrowing.applied&&!review.scope_narrowing_approved)issues.push('SCOPE_NARROWING_NOT_APPROVED');if(review.contradiction_reviews.some(x=>!x.resolved))issues.push('INDEPENDENT_UNRESOLVED_CONTRADICTION');if(review.missing_evidence.some(x=>!c.scope_narrowing.excluded_requirement_ids.includes(x.requirement_id)))issues.push('INDEPENDENT_MISSING_EVIDENCE');
  s.independent_reviews.push({review,provenance:clone(p),issues:[...new Set(issues)]});event(s,'independent_review_recorded',p.at,{decision:review.decision,critique_hash:review.critique_hash,issues,provenance:p});
  if(review.decision==='request_more')return routeNext(s,review.next_queries,p.at);
  if(review.decision!=='approve'||issues.length)return finish(s,'insufficient','Independent source/claim review did not pass: '+issues.join(', '),p.at);
  return finish(s,'satisfied','Verified source passages and scoped claims passed independent review.',p.at);
}
function recordFailure(state,{message},p) {str(message,1,1500);ok(state.pending,'NO_PENDING_CALL');provenance(p,state.pending.kind,state.pending.id,state);const s=clone(state);const call=s.calls.find(c=>c.id===s.pending.id);call.status='failed';call.provenance=clone(p);call.error=message;s.pending=null;event(s,'call_failed',p.at,{call_id:call.id,kind:call.kind,message,provenance:p});return finish(s,'insufficient','A reserved call failed; consumed budgets are retained. '+message,p.at);}
// Explicit operator recovery only. The ordinary controller never calls this.
// It does not reserve a call, alter a limit/counter, or extend authority.
function resumeFailedCritic(state,request) {
  shape(request,['now','failed_call_id','operator_reason']);id(request.failed_call_id);str(request.operator_reason,1,1500);
  ok(state.schema_version===3&&state.status==='insufficient'&&state.phase==='terminal'&&!state.pending,'RECOVERY_REQUIRES_SETTLED_INSUFFICIENT_STATE');
  ok(date(request.now)>=date(state.updated_at)&&date(request.now)<date(state.expires_at),'RECOVERY_EXPIRED_OR_TIME_REVERSED');
  ok(!state.ledger.some(e=>e.type==='manual_controller_recovery'),'MANUAL_RECOVERY_ALREADY_USED');
  const failed=state.calls.at(-1),round=state.rounds.at(-1);
  ok(failed?.id===request.failed_call_id&&failed.kind==='critic'&&failed.status==='failed'&&typeof failed.error==='string'&&failed.error.trim(),'RECOVERY_LAST_CALL_MUST_BE_FAILED_CRITIC');
  ok(round&&failed.round===round.round&&failed.round===state.counters.rounds&&!state.critiques.some(c=>c.round===failed.round),'RECOVERY_CRITIC_ROUND_MISMATCH');
  ok(round.searches.length===round.queries.length&&getVerificationCandidates(state).length===0,'RECOVERY_SOURCE_COLLECTION_INCOMPLETE');
  ok(state.counters.analyst_calls<state.limits.analyst_calls,'RECOVERY_ANALYST_BUDGET_EXHAUSTED');
  provenance(failed.provenance,'critic',failed.id,state);
  const terminal=state.ledger.at(-1),failure=state.ledger.at(-2);
  ok(terminal?.type==='research_terminal'&&terminal.details.status==='insufficient'&&terminal.details.reason===state.terminal_reason&&failure?.type==='call_failed'&&failure.details.call_id===failed.id&&failure.details.kind==='critic'&&failure.details.message===failed.error&&hash(failure.details.provenance)===hash(failed.provenance),'RECOVERY_FAILURE_AUDIT_MISSING');
  const s=clone(state),details={failed_call_id:failed.id,round:failed.round,operator_reason:request.operator_reason,prior_terminal_reason:state.terminal_reason,failed_receipt_sha256:hash(failed.provenance),failed_error_sha256:hash(failed.error),original_expires_at:state.expires_at,consumed_counters:clone(state.counters)};
  s.status='active';s.phase='collecting';s.terminal_reason=null;s.updated_at=request.now;return event(s,'manual_controller_recovery',request.now,details);
}
function halt(state,message,now) {active(state,now);str(message,1,1500);ok(!state.pending,'PENDING_CALL_USE_RECORD_FAILURE');return finish(clone(state),'insufficient',message,now);}
function expire(state,now) {ok(!TERMINAL.has(state.status),'RESEARCH_TERMINAL');ok(date(now)>=date(state.expires_at),'NOT_EXPIRED');const s=clone(state);if(s.pending){const call=s.calls.find(c=>c.id===s.pending.id);call.status='outcome_unknown_at_expiry';event(s,'pending_call_expired',now,{call_id:call.id,kind:call.kind,request_billed:null});s.pending=null;}return finish(s,'insufficient','Research authority window expired; no later paid call is authorized.',now);}
function finalizePacket(state) {
  ok(TERMINAL.has(state.status)&&!state.pending,'RESEARCH_NOT_TERMINAL');const c=state.critiques.at(-1)?.critique,review=state.independent_reviews.at(-1),passed=state.status==='satisfied';
  if(passed){ok(c&&review?.review.decision==='approve'&&review.issues.length===0&&structuralAcceptance(state,c).length===0,'SATISFIED_STATE_INCONSISTENT');ok(review.review.critique_hash===hash(c),'REVIEW_HASH_MISMATCH');}
  const claimMap=passed?c.claims.filter(x=>x.verdict==='supported'&&!c.scope_narrowing.excluded_requirement_ids.includes(x.requirement_id)):[];
  // Retain every verified source because rejected/partial claims and assessments
  // also belong to the durable audit. Only claim_map grants writer claim scope.
  const selected=state.sources;
  const packet={schema_version:3,topic:state.topic,topic_key:state.topic_key,main_sha:state.main_sha,created_at:state.updated_at,expires_at:state.expires_at,provider:'deepseek_iterative_verified_research',status:passed?'sources_available':'insufficient_sources',research_status:state.status,medical_claims_verified:false,source_topic_review:passed?'independent_semantic_source_and_claim_review_passed_not_clinical_certification':'not_approved',sources:clone(selected),source_preflight:{version:2,passed,review_required:true},
    research_audit:{version:3,status:passed?'passed':'failed',passed,terminal_reason:state.terminal_reason,research_started_at:state.created_at,plan:clone(state.plan),final_critique:clone(c||null),critique_hash:state.critiques.at(-1)?.critique_hash||null,claim_map:clone(claimMap),source_content_hashes:selected.map(s=>({id:s.id,content_sha256:s.content_sha256,publisher_id:s.publisher_id,content_scope:s.content_scope})),unmet_requirements:c?.scope_narrowing.excluded_requirement_ids||[],scope_narrowing:c?.scope_narrowing||null,evidence_conclusion:c?.evidence_conclusion||'insufficient',prohibited_claims:[...new Set([...(state.plan?.editorial_scope.prohibited_claims||[]),...(c?.scope_narrowing.prohibited_claims||[]),...(review?.review.prohibited_claims||[])])],independent_review:clone(review||null),budgets:{limits:clone(state.limits),used:clone(state.counters)},ledger:clone(state.ledger),provenance:clone(state.calls),verification_attempts:clone(state.verification_attempts)}};
  packet.research_audit.snapshot_sha256=packetHash(packet);return packet;
}
function corePacket(packet) {return Object.fromEntries(CORE_PACKET_KEYS.filter(k=>Object.hasOwn(packet,k)).map(k=>[k,clone(packet[k])]));}
function packetHash(packet) {const bound=corePacket(packet);delete bound.research_audit.snapshot_sha256;return hash(bound);}
// This verifies internally consistent trusted transport receipts, not a digital
// signature. Consumers must load packets from the CAS-protected research store.
function validateFinalPacket(packet,now) {
  packet=corePacket(packet);shape(packet,CORE_PACKET_KEYS);
  const a=packet.research_audit;shape(a,['version','status','passed','terminal_reason','research_started_at','plan','final_critique','critique_hash','claim_map','source_content_hashes','unmet_requirements','scope_narrowing','evidence_conclusion','prohibited_claims','independent_review','budgets','ledger','provenance','verification_attempts','snapshot_sha256']);
  ok(packet.schema_version===3&&a.version===3&&packet.provider==='deepseek_iterative_verified_research'&&packet.status==='sources_available'&&packet.research_status==='satisfied'&&a.passed===true&&a.status==='passed','RESEARCH_V3_NOT_PASSED');
  ok(packet.medical_claims_verified===false&&packet.source_topic_review==='independent_semantic_source_and_claim_review_passed_not_clinical_certification','UNSUPPORTED_CLINICAL_CERTIFICATION');
  shape(packet.source_preflight,['version','passed','review_required']);ok(packet.source_preflight.version===2&&packet.source_preflight.passed===true&&packet.source_preflight.review_required===true,'PREFLIGHT_COMPATIBILITY_MISMATCH');
  ok(a.snapshot_sha256===packetHash(packet),'RESEARCH_SNAPSHOT_HASH_MISMATCH');ok(date(now)>=date(packet.created_at)&&date(now)<date(packet.expires_at),'RESEARCH_PACKET_STALE_OR_FUTURE');
  shape(a.budgets,['limits','used']);shape(a.budgets.limits,Object.keys(CAPS));shape(a.budgets.used,['rounds','searches','analyst_calls','independent_reviews']);
  let s=createState({topic:packet.topic,topic_key:packet.topic_key,main_sha:packet.main_sha,created_at:a.research_started_at,expires_at:packet.expires_at,limits:a.budgets.limits});
  for(const k of Object.keys(a.budgets.used))integer(a.budgets.used[k],1,s.limits[k]);ok(date(packet.created_at)>=date(s.created_at),'FINAL_TIME_BEFORE_RESEARCH');
  s.plan=validatePlan(a.plan,s);s.counters=clone(a.budgets.used);s.updated_at=packet.created_at;s.phase='awaiting_independent_review';
  list(packet.sources,2,s.limits.sources);unique(packet.sources,x=>x.id);unique(packet.sources,x=>x.final_url);unique(packet.sources,x=>x.content_sha256);
  list(a.verification_attempts,2,s.limits.rounds*s.limits.fetches_per_round);
  for(const src of packet.sources){const {passages,text_is_untrusted,...raw}=src;ok(text_is_untrusted===true,'SOURCE_UNTRUSTED_BOUNDARY_MISSING');const checked=validateVerifiedSource(raw,s,{id:src.id,url:publicUrl(src.original_url)});ok(hash(passages)===hash(checked.passages),'SOURCE_PASSAGE_BINDING_MISMATCH');s.sources.push(checked);const receipt=a.verification_attempts.find(r=>r.id===src.id&&r.original_url===src.original_url&&r.status==='accepted');ok(receipt,'VERIFIER_RECEIPT_MISSING');provenance(receipt.provenance,'verification',receipt.provenance.call_id,s);ok(receipt.provenance.http_status===200,'VERIFIER_RECEIPT_FAILED');}
  ok(s.sources.reduce((n,x)=>n+Array.from(x.content).length,0)<=s.limits.aggregate_source_chars,'AGGREGATE_SOURCE_LIMIT');
  const c=validateCritique(a.final_critique,s);ok(c.decision==='satisfied'&&a.critique_hash===hash(c),'FINAL_CRITIQUE_MISMATCH');ok(structuralAcceptance(s,c).length===0,'FINAL_STRUCTURAL_GATES_FAILED');
  const expectedClaims=c.claims.filter(x=>x.verdict==='supported'&&!c.scope_narrowing.excluded_requirement_ids.includes(x.requirement_id));ok(hash(a.claim_map)===hash(expectedClaims),'CLAIM_MAP_MISMATCH');ok(hash(a.scope_narrowing)===hash(c.scope_narrowing)&&hash(a.unmet_requirements)===hash(c.scope_narrowing.excluded_requirement_ids)&&a.evidence_conclusion===c.evidence_conclusion,'FINAL_SCOPE_MISMATCH');
  ok(hash(a.source_content_hashes)===hash(s.sources.map(x=>({id:x.id,content_sha256:x.content_sha256,publisher_id:x.publisher_id,content_scope:x.content_scope}))),'SOURCE_HASH_INDEX_MISMATCH');
  list(a.provenance,4,16);unique(a.provenance,x=>x.id);const counts={searches:0,analyst_calls:0,independent_reviews:0};
  for(const call of a.provenance){ok(['planner','critic','search','independent_review'].includes(call.kind)&&['completed','failed'].includes(call.status),'UNSETTLED_RESEARCH_CALL');provenance(call.provenance,call.kind,call.id,s);if(call.status==='completed')ok(call.provenance.http_status===200,'FAILED_RESEARCH_RECEIPT');else ok(call.kind==='critic','ONLY_EXPLICIT_FAILED_CRITIC_RECOVERY_ALLOWED');counts[call.kind==='search'?'searches':call.kind==='independent_review'?'independent_reviews':'analyst_calls']++;}
  for(const k of Object.keys(counts))ok(counts[k]===s.counters[k],'CALL_LEDGER_BUDGET_MISMATCH');const completedCritics=a.provenance.filter(x=>x.kind==='critic'&&x.status==='completed');ok(a.provenance.filter(x=>x.kind==='planner'&&x.status==='completed').length===1&&completedCritics.length===s.counters.rounds,'ANALYST_ROUND_LEDGER_MISMATCH');unique(completedCritics,x=>x.round);completedCritics.forEach(x=>integer(x.round,1,s.counters.rounds));
  list(a.ledger,1,200);let previous=null;for(let i=0;i<a.ledger.length;i++){const {event_hash,...entry}=a.ledger[i];ok(entry.sequence===i+1&&entry.previous_hash===previous&&hash(entry)===event_hash,'LEDGER_HASH_CHAIN_MISMATCH');date(entry.at);previous=event_hash;}
  const recoveries=a.ledger.filter(e=>e.type==='manual_controller_recovery'),failedCalls=a.provenance.filter(c=>c.status==='failed');ok(recoveries.length<=1&&recoveries.length===failedCalls.length,'FAILED_CALL_REQUIRES_EXPLICIT_MANUAL_RECOVERY');
  for(const recovery of recoveries){const d=recovery.details;shape(d,['failed_call_id','round','operator_reason','prior_terminal_reason','failed_receipt_sha256','failed_error_sha256','original_expires_at','consumed_counters']);id(d.failed_call_id);str(d.operator_reason,1,1500);str(d.prior_terminal_reason,1,2000);integer(d.round,1,s.counters.rounds);
    const failedIndex=a.provenance.findIndex(c=>c.id===d.failed_call_id),failed=a.provenance[failedIndex],reassessment=a.provenance[failedIndex+1];ok(failed&&failed.kind==='critic'&&failed.status==='failed'&&failed.round===d.round,'INVALID_MANUAL_RECOVERY_TARGET');ok(typeof failed.error==='string'&&failed.error.trim()&&hash(failed.error)===d.failed_error_sha256&&hash(failed.provenance)===d.failed_receipt_sha256,'MANUAL_RECOVERY_FAILURE_BINDING_MISMATCH');
    ok(d.original_expires_at===packet.expires_at&&date(recovery.at)>=date(failed.provenance.at)&&date(recovery.at)<date(packet.expires_at),'MANUAL_RECOVERY_AUTHORITY_MISMATCH');
    const prefix=a.provenance.slice(0,failedIndex+1),used={rounds:d.round,searches:prefix.filter(c=>c.kind==='search').length,analyst_calls:prefix.filter(c=>['planner','critic'].includes(c.kind)).length,independent_reviews:prefix.filter(c=>c.kind==='independent_review').length};ok(hash(d.consumed_counters)===hash(used)&&used.analyst_calls<s.limits.analyst_calls,'MANUAL_RECOVERY_COUNTER_RESET_OR_NO_BUDGET');
    ok(reassessment?.kind==='critic'&&reassessment.status==='completed'&&reassessment.round===d.round&&date(reassessment.reserved_at)>=date(recovery.at)&&date(reassessment.provenance.at)>=date(recovery.at),'MANUAL_RECOVERY_REASSESSMENT_MISSING');
    const ri=a.ledger.indexOf(recovery),terminal=a.ledger[ri-1],failure=a.ledger[ri-2];ok(terminal?.type==='research_terminal'&&terminal.details.status==='insufficient'&&terminal.details.reason===d.prior_terminal_reason&&failure?.type==='call_failed'&&failure.details.call_id===failed.id&&failure.details.kind==='critic'&&hash(failure.details.provenance)===d.failed_receipt_sha256&&hash(failure.details.message)===d.failed_error_sha256,'MANUAL_RECOVERY_FAILURE_LEDGER_MISMATCH');
    ok(a.ledger.slice(ri+1).some(e=>e.type==='call_reserved'&&e.details.id===reassessment.id&&e.details.kind==='critic'&&e.details.round===d.round),'MANUAL_RECOVERY_RESERVATION_MISSING');
  }
  ok(a.ledger.some(e=>e.type==='plan_recorded'&&e.details.plan_hash===hash(a.plan))&&a.ledger.some(e=>e.type==='critique_recorded'&&e.details.critique_hash===hash(c)),'ANALYSIS_LEDGER_BINDING_MISSING');
  for(const call of a.provenance)ok(a.ledger.some(e=>e.type==='call_reserved'&&e.details.id===call.id&&e.details.kind===call.kind),'CALL_RESERVATION_LEDGER_MISSING');
  shape(a.independent_review,['review','provenance','issues']);ok(a.independent_review.issues.length===0,'INDEPENDENT_REVIEW_HAS_ISSUES');const p=a.independent_review.provenance,call=a.provenance.find(x=>x.kind==='independent_review'&&x.id===p.call_id);ok(call&&hash(call.provenance)===hash(p),'INDEPENDENT_TRANSPORT_RECEIPT_MISSING');
  ok(a.ledger.some(e=>e.type==='independent_review_recorded'&&e.details.provenance.call_id===p.call_id&&e.details.critique_hash===a.critique_hash),'INDEPENDENT_REVIEW_LEDGER_MISSING');
  s.calls=clone(a.provenance);s.pending={...call};s.critiques=[{critique:c,critique_hash:a.critique_hash}];const reviewed=applyIndependentReview(s,a.independent_review.review,p);ok(reviewed.status==='satisfied','FINAL_INDEPENDENT_GATE_FAILED');
  const prohibited=[...new Set([...s.plan.editorial_scope.prohibited_claims,...c.scope_narrowing.prohibited_claims,...a.independent_review.review.prohibited_claims])];ok(hash(prohibited)===hash(a.prohibited_claims),'PROHIBITED_CLAIMS_MISMATCH');return true;
}
module.exports={CAPS,CORE_PACKET_KEYS,hash,publisherId,createState,reserveCall,validatePlan,recordPlan,beginRound,normalizeSearchResponse,recordSearch,getVerificationCandidates,makePassages,validateVerifiedSource,addVerifiedSources,validateCritique,structuralAcceptance,recordCritique,validateIndependentReview,applyIndependentReview,recordFailure,resumeFailedCritic,halt,expire,finalizePacket,validateFinalPacket};

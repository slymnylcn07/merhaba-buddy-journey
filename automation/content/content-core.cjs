/* Pure, deterministic contracts shared by n8n and the draft exporter. */
const {researchFresh}=require('./research-guards.cjs');
const stop = new Set('the a an and or for with from into that this what when why how your you are does after before about guide knee knees pain'.split(' '));
function tokens(s) { return [...new Set((String(s).toLowerCase().match(/[a-z0-9]+/g)||[]).map(x=>x.length>4&&x.endsWith('s')&&!x.endsWith('ss')?x.slice(0,-1):x))].filter(x=>x.length>2&&!stop.has(x)); }
function overlap(a,b) { const x=tokens(a), y=new Set(tokens(b)); return x.length&&y.size?x.filter(v=>y.has(v)).length/Math.min(x.length,y.size):0; }
function fingerprint(value) { const s=typeof value==='string'?value:JSON.stringify(value);let a=2166136261,b=5381;for(const c of s){a=Math.imul(a^c.charCodeAt(0),16777619);b=Math.imul(b,33)^c.charCodeAt(0);}return (a>>>0).toString(16).padStart(8,'0')+(b>>>0).toString(16).padStart(8,'0'); }
function parse(s) { try{return JSON.parse(s);}catch{return null;} }
function inventory(texts) { const rows=[];for(const text of texts)for(const m of String(text).matchAll(/"?slug"?:\s*"([a-z0-9-]+)"\s*,\s*"?title"?:\s*"((?:\\.|[^"\\])*)"/g))rows.push({slug:m[1],title:JSON.parse('"'+m[2]+'"')});if(rows.length<50||new Set(rows.map(x=>x.slug)).size!==rows.length)throw Error('Guide inventory missing, incomplete or duplicated');return rows; }
function topicCandidate(queries,trends,guides,history) {
 const prior=new Set(history.map(x=>x.topic?.toLowerCase()).filter(Boolean));
 const leads=[...queries.filter(x=>Number.isFinite(x.impressions)&&x.impressions>=10).sort((a,b)=>b.impressions-a.impressions).map(x=>({topic:x.query,signal:{type:'gsc_query',...x}})),...(trends?.available?trends.candidates||[]:[]).map(x=>({topic:x.title,signal:{type:'trends_rss_lead',title:x.title,country:x.country,published_at:x.published_at}}))];
 for(const lead of leads){const q=String(lead.topic||'').replace(/[^a-zA-Z0-9 -]/g,' ').replace(/\s+/g,' ').trim();if(q.length<8||q.length>140||!/(knee|joint|walk|running|mobility|arthritis|exercise|aging|ageing|recovery)/i.test(q)||/flexi.?knee|\bbest\b|\btop\b|rechargeable|cordless|massager|\bbuy\b|coupon|discount|aliexpress|amazon/i.test(q)||prior.has(q.toLowerCase()))continue;
 const matches=guides.map(g=>({...g,similarity:overlap(q,g.title+' '+g.slug)})).sort((a,b)=>b.similarity-a.similarity).slice(0,8);
 if(matches[0]?.similarity>=0.8)continue;
 return {topic:q,signal:lead.signal,nearest_guides:matches,inventory_count:guides.length,duplicate_check:'lexical_screen_only_semantic_review_required'};
 }return null;
}
function validSourceUrl(s) {return /^https:\/\/(?:[a-z0-9-]+\.)*(?:nhs\.uk|niams\.nih\.gov|nia\.nih\.gov|cdc\.gov)\/[a-z0-9/_?=&.%+-]*$/i.test(s)||/^https:\/\/orthoinfo\.aaos\.org\/[a-z0-9/_?=&.%+-]*$/i.test(s);}
function sourcePacket(response,brief,now) {
 const seen=new Set();const sources=(response.results||[]).filter(x=>{if(!validSourceUrl(x.url)||seen.has(x.url)||typeof x.content!=='string'||x.content.length<800||x.content.length>14000||x.truncated===true||(x.content_truncated!==undefined&&x.content_truncated!==false))return false;seen.add(x.url);return true;}).slice(0,4).map((x,i)=>({id:'S'+(i+1),url:x.url,title:String(x.title||'').slice(0,240),publisher:x.url.split('/')[2],publication_date:x.date||null,retrieved_at:now,content:x.content,content_truncated:false}));
 return {...brief,created_at:now,provider:'deepseek_search',api_requests:1,request_billed:!response.error&&Array.isArray(response.results)?true:null,token_usage_not_applicable:true,sources,status:sources.length>=2?'sources_available':'insufficient_sources',medical_claims_verified:false,error:response.error?String(response.error.message||response.error).slice(0,500):null};
}
function validateArticle(a,research,guides,now=Date.now()) {
 const str=(v,min,max)=>typeof v==='string'&&v.length>=min&&v.length<=max;
 if(!a||a.schema_version!==1||!str(a.slug,8,100)||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug))throw Error('Invalid article slug');
 if(guides.some(g=>g.slug===a.slug||g.title.toLowerCase()===String(a.title).toLowerCase()))throw Error('Existing slug or title');
 for(const [key,min,max] of [['title',20,120],['metaTitle',15,70],['metaDescription',60,180],['intro',80,1800],['quickAnswer',60,900],['imagePrompt',80,1200],['imageAlt',15,180],['novelty_tr',40,1200]])if(!str(a[key],min,max))throw Error('Invalid '+key);
 if(!researchFresh(research,now))throw Error('Missing, expired or incomplete research');
 if(!Array.isArray(a.sections)||a.sections.length<3||a.sections.length>8)throw Error('Expected 3 to 8 sections');
 const refs=new Set(research.sources.map(s=>s.id));const used=new Set();let chars=0;
 for(const s of a.sections){if(!str(s.heading,8,160)||!Array.isArray(s.paragraphs)||s.paragraphs.length<1||s.paragraphs.length>4||!Array.isArray(s.source_ids)||!s.source_ids.length||s.source_ids.some(id=>!refs.has(id)))throw Error('Invalid sourced section');for(const p of s.paragraphs){if(!str(p,60,1600))throw Error('Invalid paragraph');chars+=p.length;}for(const id of s.source_ids)used.add(id);}
 if(chars<2000||chars>14000||used.size<2)throw Error('Insufficient article or independent source coverage');
 if(!Array.isArray(a.internalLinks)||a.internalLinks.length<1||a.internalLinks.length>4||a.internalLinks.some(l=>!guides.some(g=>g.slug===l.slug)||!str(l.label,8,120)))throw Error('Unknown internal guide');
 if(!Array.isArray(a.faqs)||a.faqs.length>4||a.faqs.some(f=>!str(f.question,15,180)||!str(f.answer,50,700)||!Array.isArray(f.source_ids)||!f.source_ids.length||f.source_ids.some(id=>!refs.has(id))))throw Error('Invalid sourced FAQ');
 if(/<\/?[a-z][^>]*>|—|\b(cure|guaranteed|pain-free|clinically proven|medically reviewed)\b/i.test(JSON.stringify(a)))throw Error('Unsupported markup or editorial claim');
 if(!a.cta||!str(a.cta.headline,12,100)||!str(a.cta.text,40,500))throw Error('Invalid CTA');
 return {...a,sources:research.sources.filter(s=>used.has(s.id)||a.faqs.some(f=>f.source_ids.includes(s.id))).map(({title,publisher,url})=>({title,publisher,url})),medicalReviewPending:true,readTime:Math.max(3,Math.ceil((chars+a.intro.length)/6/180))};
}
function measurementPlan(publication,now=Date.now()) {
 if(!publication||publication.state!=='verified_live'||publication.production_url!=='https://flexi-knee.com/guides/'+publication.slug||!publication.commit_sha||publication.http_status!==200||publication.canonical!==publication.production_url||!publication.verified_at||!publication.published_at)return {state:'await_verified_publication'};
 const start=Date.parse(publication.published_at);if(!Number.isFinite(start))return {state:'invalid_publication'};
 const age=now-start;if(age<17*86400000)return {state:'await_data',earliest_review_at:new Date(start+17*86400000).toISOString()};
 const iso=d=>new Date(d).toISOString().slice(0,10);return {state:'ready',page:publication.production_url,start_date:iso(start),end_date:iso(start+13*86400000),baseline_start:iso(start-14*86400000),baseline_end:iso(start-86400000),scope:'first_14_complete_days_plus_3_day_reporting_lag',causation_claim_allowed:false};
}
module.exports={tokens,overlap,fingerprint,parse,inventory,topicCandidate,validSourceUrl,sourcePacket,validateArticle,measurementPlan};


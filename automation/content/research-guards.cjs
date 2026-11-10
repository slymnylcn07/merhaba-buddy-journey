// Shared deterministic guards. No network, model call, retry or budget mutation.
function ordinaryKneeNoiseTopic(topic) {
 const q=String(topic||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
 if(!/\bknees?\b/.test(q)||!/\b(crepitus|click(?:ing|y|s)?|crack(?:ing|s)?|pop(?:ping|s)?|grind(?:ing|s)?|nois(?:e|es|y))\b/.test(q))return false;
 // The two curated pages serve ordinary adult activity questions only. Unknown
 // populations/conditions never inherit this cache by merely mentioning a knee.
 const allowed=new Set('the a an and or for with without when while what why how is are does do can should to of in on at from after before my your i it its they them that this there be being so very just normal common painless pain painful no not adult adults older aging ageing knee knees click clicks clicking clicky crack cracks cracking pop pops popping grind grinds grinding noise noises noisy crepitus bend bends bending squat squats squatting walk walks walking standing stand stairs up down movement move moving exercise exercises exercising running run sit sits sitting straighten straightening sound sounds making make getting keep keeps stop meaning mean means causes cause safe safety seek help assessment get got'.split(' '));
 return q.split(' ').every(term=>allowed.has(term));
}
function researchFresh(research,now=Date.now()) {
 const time=new Date(now).getTime(),created=Date.parse(research?.created_at);
 if(!Number.isFinite(time)||!Number.isFinite(created)||created>time+300000||time-created>3*86400000)return false;
 if(research.status!=='sources_available'||research.source_preflight?.version!==2||research.source_preflight?.passed!==true||!Array.isArray(research.sources)||research.sources.length<2)return false;
 const cached=research.provider==='source_bank_cache';
 if(cached&&!ordinaryKneeNoiseTopic(research.topic))return false;
 if(cached||research.expires_at!=null){const end=Date.parse(research.expires_at);if(!Number.isFinite(end)||time>=end)return false;}
 const ids=new Set(),urls=new Set();
 return research.sources.every(source=>{
  if(!source||typeof source.id!=='string'||!source.id||ids.has(source.id)||typeof source.url!=='string'||urls.has(source.url)||source.content_truncated!==false||typeof source.content!=='string'||source.content.length<800)return false;
  ids.add(source.id);urls.add(source.url);
  const at=Date.parse(source.retrieved_at);if(!Number.isFinite(at)||at>time+300000)return false;
  if(cached||source.expires_at!=null){const end=Date.parse(source.expires_at);if(!Number.isFinite(end)||time>=end||end<=at)return false;if(cached&&(end-at>168*3600000||time-at>=168*3600000))return false;}
  if(!cached&&time-at>3*86400000)return false;
  return !cached||source.review_state==='scope_screen_passed_pending_independent_review';
 });
}
module.exports={ordinaryKneeNoiseTopic,researchFresh};

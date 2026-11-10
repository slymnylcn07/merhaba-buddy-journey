const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {validateArticle,inventory,fingerprint}=require('./content-core.cjs');
const {researchFresh}=require('./research-guards.cjs');
const q=JSON.stringify;
function insertOnce(text,anchor,addition){if(text.split(anchor).length!==2)throw Error('Registry anchor changed; manual review required: '+anchor);return text.replace(anchor,anchor+'\n'+addition);}
function draftFiles(pkg,currentFiles,date){
 if(!researchFresh(pkg?.research))throw Error('Missing, expired or incomplete research');
 if(pkg?.schema_version!==1||pkg.status!=='ready_for_draft_export'||pkg.export_policy!=='draft_pr_only_no_merge'||!pkg.manager_decision_key||!pkg.result_key)throw Error('Draft is not manager accepted');
 if(!/^[a-f0-9]{64}$/.test(pkg.research_snapshot_sha256||'')||pkg.research_snapshot_sha256!==pkg.research.research_audit?.snapshot_sha256)throw Error('Research changed since review');
 if(!pkg.image?.visual_review?.approved||pkg.image.visual_review.violations?.length)throw Error('Independent image QA missing');
 if(!pkg.image.base64||pkg.image.base64.length>600000||pkg.image.mime_type!=='image/webp')throw Error('Invalid image payload');
 if(fingerprint(JSON.stringify(pkg.article))!==pkg.article_fingerprint)throw Error('Article changed since review');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||new Date(date+'T12:00:00Z').toISOString().slice(0,10)!==date)throw Error('Invalid draft date');
 const guides=inventory([currentFiles['src/data/guides.ts'],currentFiles['src/data/recent-guides-data.ts']]);
 const a=validateArticle(pkg.article,pkg.research,guides);
 const articlePath='src/data/articles/'+a.slug+'.tsx',assetPath='public/images/editorial/'+a.slug+'-hero.webp';
 if(Object.hasOwn(currentFiles,articlePath)||Object.hasOwn(currentFiles,assetPath))throw Error('Refusing to overwrite an existing article or asset');
 const image=Buffer.from(pkg.image.base64,'base64');if(image.toString('ascii',0,4)!=='RIFF'||image.toString('ascii',8,12)!=='WEBP'||image.length<100)throw Error('Not an actual WebP file');
 const imageSha=crypto.createHash('sha256').update(image).digest('hex');
 const prop=(k,v)=>'    '+k+': '+q(v)+',';
 const sourceById=new Map(pkg.research.sources.map(source=>[source.id,source]));
 const sourceNumberByUrl=new Map(a.sources.map((source,index)=>[source.url,index+1]));
 const sectionCitations=section=>{
  const cited=[...new Set(section.source_ids)].map(id=>sourceById.get(id));
  const links=cited.map(source=>{
   const url=new URL(source.url);
   if(url.protocol!=='https:'||url.username||url.password)throw Error('Unsafe citation source URL');
   const number=sourceNumberByUrl.get(source.url),label=source.publisher+': '+source.title;
   return '<a className="align-super text-xs font-medium text-primary underline underline-offset-4 hover:text-primary/80" href={'+q(source.url)+'} aria-label={'+q('Source '+number+': '+label)+'} title={'+q(label)+'} target="_blank" rel="noreferrer noopener">['+number+']</a>';
  });
  return '{" "}'+links.join('{" "}');
 };
 const body=a.sections.map(s=>'<section>\n<h2>{'+q(s.heading)+'}</h2>\n'+s.paragraphs.map((p,index)=>'<p>{'+q(p)+'}'+(index===s.paragraphs.length-1?sectionCitations(s):'')+'</p>').join('\n')+'\n</section>').join('\n');
 const links='<h2>Related guides</h2>\n<ul>\n'+a.internalLinks.map(l=>'<li><Link to={'+q('/guides/'+l.slug)+'}>{'+q(l.label)+'}</Link></li>').join('\n')+'\n</ul>';
 const article='import type { ArticleExport } from "./types";\nimport { Link } from "react-router-dom";\n\nexport const editorialArticle: ArticleExport = {\n  cta: "",\n  article: {\n'+[
 prop('slug',a.slug),prop('title',a.title),prop('intro',a.intro),prop('quickAnswer',a.quickAnswer),prop('metaTitle',a.metaTitle),prop('metaDescription',a.metaDescription),prop('heroImage','/images/editorial/'+a.slug+'-hero.webp'),prop('heroAlt',pkg.image.alt_text),prop('publishedDate',date),prop('lastUpdated',date),prop('medicalReviewPending',true),prop('sources',a.sources),prop('faqs',a.faqs.map(({question,answer})=>({question,answer}))),
 '    content: (<>\n'+body+'\n'+links+'\n</>),','  },','};',''].join('\n');
 const out={[articlePath]:article,[assetPath]:image};
 out['src/data/recent-guides-data.ts']=insertOnce(currentFiles['src/data/recent-guides-data.ts'],'export const recentGuidesData: PublishedGuideData[] = [','  '+q({slug:a.slug,title:a.title,description:a.metaDescription,readTime:a.readTime,publishedDate:date,lastModified:date})+',');
 out['src/data/recent-article-loaders.ts']=insertOnce(currentFiles['src/data/recent-article-loaders.ts'],'const recentArticleLoaders: Record<string, () => Promise<ArticleData>> = {','  '+q(a.slug)+': () => import("./articles/'+a.slug+'").then(module => module.editorialArticle.article),');
 out['src/data/recent-article-ctas.ts']=insertOnce(currentFiles['src/data/recent-article-ctas.ts'],'export const recentArticleCTAs: Record<string, { headline: string; text: string }> = {','  '+q(a.slug)+': '+q(a.cta)+',');
 out['src/data/guide-thumbnail-loaders.ts']=insertOnce(currentFiles['src/data/guide-thumbnail-loaders.ts'],'const thumbnailLoaders: Record<string, GuideThumbnailLoader> = {','  '+q(a.slug)+': () => Promise.resolve('+q('/images/editorial/'+a.slug+'-hero.webp')+'),');
 // Keep full source extracts and private performance metrics out of the public repository.
 out['automation/content/review-manifests/'+a.slug+'.json']=JSON.stringify({schema_version:1,state:'draft_only',slug:a.slug,draft_date:date,publication_date_pending_review:true,article_fingerprint:pkg.article_fingerprint,research_policy_version:3,image_sha256:imageSha,ai_visual_review:{approved:true,alt_text:pkg.image.alt_text},sources:a.sources,medical_review_pending:true,requires:['current_main_diff_review','independent_source_check','npm run validate:source','npm run validate:content','npm run validate:assets','npm run lint','npm run build','Vercel preview desktop and mobile','explicit human publication decision'],no_automatic_merge:true},null,2)+'\n';
 return out;
}
if(require.main===module){
 const [packageFile,repoDir,draftDate]=process.argv.slice(2);if(!packageFile||!repoDir||!draftDate)throw Error('Usage: node export-draft.cjs <private-package.json> <clean-feature-checkout> <YYYY-MM-DD>');
 const paths=['src/data/guides.ts','src/data/recent-guides-data.ts','src/data/recent-article-loaders.ts','src/data/recent-article-ctas.ts','src/data/guide-thumbnail-loaders.ts'];
 const pkg=JSON.parse(fs.readFileSync(packageFile,'utf8')),files=Object.fromEntries(paths.map(p=>[p,fs.readFileSync(path.join(repoDir,p),'utf8')]));
 for(const p of ['src/data/articles/'+pkg.article.slug+'.tsx','public/images/editorial/'+pkg.article.slug+'-hero.webp'])if(fs.existsSync(path.join(repoDir,p)))files[p]='exists';
 const changed=draftFiles(pkg,files,draftDate);for(const [p,content]of Object.entries(changed)){const target=path.resolve(repoDir,p);if(!target.startsWith(path.resolve(repoDir)+path.sep))throw Error('Unsafe output path');fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,content);}console.log(JSON.stringify({state:'draft_only',changed_files:Object.keys(changed),note:'Run repository checks and inspect the full diff before opening a draft PR. Never publish automatically.'},null,2));
}
module.exports={draftFiles,insertOnce};


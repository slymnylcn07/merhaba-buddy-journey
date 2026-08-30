# Group 1 research and generated asset manifest

Date: August 30, 2026. Scope: five new topic-specific knee guides. Built-in image_gen only, one generation call per original asset. All 20 generated images inspected visually; no CLI/API fallback. Thumbnails are resized copies of each dedicated hero. Article photography illustrates equipment and checking routines, not a diagnostic or clinical measurement.

## Editorial constraints

- Body target at least 2200 words excluding metadata and FAQs. Natural intro and separate quickAnswer. Three useful tables, nine FAQs, three distinct body photos per article.
- No em dashes, cure claims, guaranteed injury prevention, self-diagnosis, embedded CTA, quiz, or manual source panel.
- Walking-pad scope: flat under-desk walking, keyboard/monitor setup, comfortable stride, workday exposure. Not incline workouts.
- Insole scope: troubleshooting fit, insert placement, wearing-in response, and prescriber review. Not a product ranking.
- Leg-extension scope: seat/pivot alignment, shin pad, resistance, movement range and machine differences.
- Work-boot scope: required PPE, foot volume, concrete, shift tasks, manufacturer-approved modifications.
- Rowing scope: catch, footplates, drive/recovery and controllable rowing dose.
- Trends findings were provided from main agent's live UI checks. Walking-pad synonyms: under desk, compact, mini treadmill, portable. Orthotics: arch support. Work boots: men's, women's, steel toe, waterproof/leather. No knee-query growth claims. General rowing and leg-extension rising lists contained noise and are not used as evidence.

## Verified source URLs

### Walking pad

https://www.osha.gov/etools/computer-workstations/positions
https://www.osha.gov/etools/computer-workstations/components/desks
https://pubmed.ncbi.nlm.nih.gov/33449603/
https://pubmed.ncbi.nlm.nih.gov/23417995/
https://www.cdc.gov/physical-activity-basics/adding-adults/what-counts.html
https://www.cdc.gov/physical-activity-basics/overcoming-barriers/index.html
https://www.walkingpad.com/pages/faq
https://www.nhs.uk/symptoms/knee-pain/

### Insoles

https://www.bmj.com/content/337/bmj.a1735
https://msk-bexley.nhs.uk/conditions/foot-and-ankle-pain/foot-orthoses-insole-wearing-in
https://www.royaldevon.nhs.uk/media/sneklmhq/advice-for-wearing-orthotic-insole-devices-275-v5.pdf
https://www.dgft.nhs.uk/leaflet/information-about-your-insole-or-foot-orthosis/
https://www.oxfordhealth.nhs.uk/podiatry/wp-content/uploads/2013/12/Foot-orthotics-insoles.pdf
https://www.nice.org.uk/guidance/ng226/chapter/recommendations
https://www.nhs.uk/symptoms/knee-pain/

### Leg extension

https://pubmed.ncbi.nlm.nih.gov/24673446/
https://pubmed.ncbi.nlm.nih.gov/9565938/
https://www.lifefitness.com/en-eu/catalog/strength-training/plate-loaded/life-fitness-leg-extension
https://www.orthoinfo.org/diseases--conditions/patellofemoral-pain-syndrome/
https://www.orthoinfo.org/recovery/knee-conditioning-program/
https://pubmed.ncbi.nlm.nih.gov/24440362/
https://www.nhs.uk/symptoms/knee-pain/

### Work boots

https://www.ccohs.ca/oshanswers/prevention/ppe/footwear.html
https://www.ccohs.ca/oshanswers/prevention/ppe/foot_com.html
https://www.ccohs.ca/oshanswers/ergonomics/standing/standing_basic.html
https://www.ccohs.ca/oshanswers/ergonomics/mats.html
https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.136
https://www.orthoinfo.org/diseases--conditions/patellofemoral-pain-syndrome/
https://www.nhs.uk/symptoms/knee-pain/

### Rowing

https://www.concept2.com/training/improve-your-rowing-technique
https://www.concept2.com/blog/a-foot-position-primer
https://www.concept2.com/training/articles/getting-comfortable-on-the-rowerg
https://www.concept2.com/training/articles/damper-setting
https://www.concept2.com/blog/the-necessity-of-foot-straps
https://www.youtube.com/watch?v=4zWu1yuJ0_g
https://www.orthoinfo.org/diseases--conditions/patellofemoral-pain-syndrome/
https://www.nhs.uk/symptoms/knee-pain/

## Prompts and original outputs

## Final validation

Targeted ESLint passed for all five modules. Rendered article audit passed on August 30, 2026. Initial Vite audit was blocked by Windows sandbox module resolution; the same read-only audit passed with approved elevated access. Main agent owns full-registry and production-build validation.

| Slug | Rendered body words | Total reading words | Read time | Tables | FAQs | Sources | Asset files |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| walking-pad-knee-pain | 2342 | 2874 | 14 min | 3 | 9 | 8 | 5 |
| can-insoles-cause-knee-pain | 2303 | 2769 | 13 min | 3 | 9 | 7 | 5 |
| leg-extension-knee-pain | 2345 | 2829 | 13 min | 3 | 9 | 7 | 5 |
| work-boots-knee-pain | 2316 | 2798 | 13 min | 3 | 9 | 7 | 5 |
| rowing-machine-knee-pain | 2376 | 2852 | 13 min | 3 | 9 | 8 | 5 |

All body images have intrinsic width and height, lazy loading, async decoding, and descriptive alt text. Leg-extension body images 01 and 02 are 1402 by 1122; all other originals are 1536 by 1024. WebP encoding uses quality 83, method 6; thumbnails use quality 80 and a 640px maximum dimension. Original outputs were retained. All final assets are workspace-local.

Suggested central product mapping: insoles for insole troubleshooting and work boots, subject to shoe fit and required safety-footwear compatibility; knee sleeve for walking-pad, leg-extension, and rowing comfort where suitable. No curative or injury-prevention claim is made.

## Individual image prompts

### walking-pad-knee-pain-hero

- Original: `C:\Users\slymn\.codex\generated_images\01a052ab-f850-7f62-bf8d-cd309ffd24b3\exec-aea2c44d-baee-43f7-b143-c8a72e830f2e.png`
- Final: `src/assets/guide-thumbnails/next-15/walking-pad-knee-pain-hero.webp`
- Prompt: Use case: photorealistic-natural. Asset type: landscape article hero photograph. Adult office worker walking slowly on a compact flat under-desk walking pad beneath an adjustable standing desk in a bright realistic home office. Full body side view, monitor comfortable eye level, external keyboard close at elbow height, relaxed shoulders, small natural step and supportive unbranded shoes. Physically plausible complete flat belt, no incline. Natural daylight, authentic skin and fabric. No text, logos, watermark, collage, medical symbols or pain glow.
- QA: subject and equipment visible; no diagnostic overlays; suitable editorial image. Follow actual machine instructions for precise positioning.

### walking-pad-knee-pain-01

- Original: `C:\Users\slymn\.codex\generated_images\01a052ab-f850-7f62-bf8d-cd309ffd24b3\exec-66412a3a-29f4-42fb-aa6a-a116665c0859.png`
- Final: `src/assets/article-photos/next-15/walking-pad-knee-pain-01.webp`
- Prompt: Use case: photorealistic-natural. Asset type: landscape educational article photo. An adult woman's upper body and hands in profile at a height adjustable standing desk while standing on a flat walking pad. Focus external keyboard and mouse close to torso, elbows comfortably bent and shoulders relaxed, monitor raised independently. Show wrists neutral, real fabric and equipment detail, bright daylight. No text, logos, watermark, arrows, labels, collage.
- QA: subject and equipment visible; no diagnostic overlays; suitable editorial image. Follow actual machine instructions for precise positioning.

### walking-pad-knee-pain-02

- Original: `C:\Users\slymn\.codex\generated_images\01a052ab-f850-7f62-bf8d-cd309ffd24b3\exec-def9c20b-bf79-4951-bfad-f8f05774c0e6.png`
- Final: `src/assets/article-photos/next-15/walking-pad-knee-pain-02.webp`
- Prompt: Use case: photorealistic-natural. Asset type: landscape educational article photo. Low side view of an adult's two lower legs in simple trousers and unbranded walking shoes taking a small natural step on the central belt of a flat under-desk walking pad. Both knees and complete shoes visible, believable stance, comfortable clearance around feet, stationary desk legs in background, natural home-office light, crisp belt texture. No text logos watermark overlays collage or pain glow.
- QA: subject and equipment visible; no diagnostic overlays; suitable editorial image. Follow actual machine instructions for precise positioning.

### walking-pad-knee-pain-03

- Original: `C:\Users\slymn\.codex\generated_images\01a052ab-f850-7f62-bf8d-cd309ffd24b3\exec-05694631-2f9c-4ab5-bbb9-6d047537a100.png`
- Final: `src/assets/article-photos/next-15/walking-pad-knee-pain-03.webp`
- Prompt: Use case: photorealistic-natural. Asset type: landscape editorial article photo. Adult office worker seated comfortably at an adjustable desk after a short walking break, compact flat walking pad visibly stopped and moved safely beside the desk, notebook with blank pages on desk and water glass. Calm bright home office, full seated posture and both feet on floor, chair not sitting on treadmill. Natural candid photograph. No text logos watermark collage.
- QA: subject and equipment visible; no diagnostic overlays; suitable editorial image. Follow actual machine instructions for precise positioning.

### can-insoles-cause-knee-pain-hero

- Original: `C:\Users\slymn\.codex\generated_images\01a052ab-f850-7f62-bf8d-cd309ffd24b3\exec-45d01b0c-87f1-450c-9e93-8e304fc4b866.png`
- Final: `src/assets/guide-thumbnails/next-15/can-insoles-cause-knee-pain-hero.webp`
- Prompt: Use case: photorealistic-natural. Asset type: landscape article hero photograph. Adult seated on a home bench inspecting a removable contoured insole beside a pair of ordinary unbranded walking shoes, feet and knees naturally visible, holding insert in both hands thoughtfully. Warm daylight realistic home, useful shoe and insole detail, no medical pain effects. No text logos watermark collage.
- QA: subject and equipment visible; no diagnostic overlays; suitable editorial image. Follow actual machine instructions for precise positioning.

### can-insoles-cause-knee-pain-01

- Original: `C:\Users\slymn\.codex\generated_images\01a052ab-f850-7f62-bf8d-cd309ffd24b3\exec-c1e5dd0f-b483-4512-b9f6-f0cd1a9ed762.png`
- Final: `src/assets/article-photos/next-15/can-insoles-cause-knee-pain-01.webp`
- Prompt: Use case: product-mockup. Asset type: landscape educational article photograph. Close overhead photo of one unbranded walking shoe open with laces loosened, its thin factory liner removed and placed beside a separate full length contoured orthotic insole. Three objects clearly distinct, arranged on clean light wood worktop, realistic fabric foam and contours, no confusing stacked inserts inside shoe. No text logos watermark arrows labels collage.
- QA: subject and equipment visible; no diagnostic overlays; suitable editorial image. Follow actual machine instructions for precise positioning.

### can-insoles-cause-knee-pain-02

- Original: `C:\Users\slymn\.codex\generated_images\01a052ab-f850-7f62-bf8d-cd309ffd24b3\exec-7e6557a3-9db8-4522-a827-0469116deec0.png`
- Final: `src/assets/article-photos/next-15/can-insoles-cause-knee-pain-02.webp`
- Prompt: Use case: photorealistic-natural. Asset type: landscape educational article photograph. Close side view of hands carefully seating a full-length contoured insole into an unbranded walking shoe with tongue lifted and laces loose. Show heel cup flat at rear and shoe opening unobstructed, realistic hands with correct fingers, indoor daylight and crisp foam fabric texture. No text labels logos watermark collage.
- QA: subject and equipment visible; no diagnostic overlays; suitable editorial image. Follow actual machine instructions for precise positioning.

### can-insoles-cause-knee-pain-03

- Original: `C:\Users\slymn\.codex\generated_images\01a052ab-f850-7f62-bf8d-cd309ffd24b3\exec-b43aeffc-3d21-4daa-aac7-7c5a099261b1.png`
- Final: `src/assets/article-photos/next-15/can-insoles-cause-knee-pain-03.webp`
- Prompt: Use case: photorealistic-natural. Asset type: landscape educational article photograph. Physiotherapist or podiatrist in ordinary professional clothing at clinic bench discussing an unbranded contoured shoe insole with adult patient, clinician pointing to heel cup while patient holds the walking shoe. Clean calm consultation room, both hands accurate and natural, no identifiable records. No text logos watermark collage or pain glow.
- QA: subject and equipment visible; no diagnostic overlays; suitable editorial image. Follow actual machine instructions for precise positioning.

### leg-extension-knee-pain-hero

- Original: `C:\Users\slymn\.codex\generated_images\01a052ab-f850-7f62-bf8d-cd309ffd24b3\exec-a1848670-da18-4b61-b52c-3205930ccdca.png`
- Final: `src/assets/guide-thumbnails/next-15/leg-extension-knee-pain-hero.webp`
- Prompt: Use case: photorealistic-natural. Asset type: landscape article hero photograph. Adult woman on a conventional seated leg-extension weight-stack machine in a bright clean gym, side view showing back supported on backrest, thighs on seat, knees near seat front aligned with the machine's visible circular pivot, lower legs partially extended with roller contacting front of lower shins above ankles. Controlled mid repetition, no hyperextension, complete machine mechanically plausible. Natural photo skin fabric metal texture. No text logos watermark collage pain glow.
- QA: subject and equipment visible; no diagnostic overlays; suitable editorial image. Follow actual machine instructions for precise positioning.

### leg-extension-knee-pain-01

- Original: `C:\Users\slymn\.codex\generated_images\01a052ab-f850-7f62-bf8d-cd309ffd24b3\exec-a549f441-b12a-4f09-90f4-23c352e9963f.png`
- Final: `src/assets/article-photos/next-15/leg-extension-knee-pain-01.webp`
- Prompt: Use case: photorealistic-natural. Asset type: landscape educational article photograph. Close side view of a personal trainer checking the seat adjustment of an adult seated on a conventional gym leg-extension machine. Focus bent knee beside visible circular machine pivot at knee height, seat edge behind knee, trainer hand pointing near pivot without touching body, anatomically accurate, gym daylight. No text labels logos watermark collage arrows.
- QA: subject and equipment visible; no diagnostic overlays; suitable editorial image. Follow actual machine instructions for precise positioning.

### leg-extension-knee-pain-02

- Original: `C:\Users\slymn\.codex\generated_images\01a052ab-f850-7f62-bf8d-cd309ffd24b3\exec-1558f4c2-d2c1-49f0-ba6f-3ff899219cae.png`
- Final: `src/assets/article-photos/next-15/leg-extension-knee-pain-02.webp`
- Prompt: Use case: photorealistic-natural. Asset type: landscape educational article photograph. Close side view of two lower legs in shorts and unbranded trainers on a seated gym leg-extension machine. Padded cylindrical roller contacts FRONT of lower shins slightly ABOVE ankles, feet visible below pad, knees partially bent, mechanically plausible supporting lever at side, no pad behind legs or on feet. Realistic gym equipment photo. No text logos watermark labels collage.
- QA: subject and equipment visible; no diagnostic overlays; suitable editorial image. Follow actual machine instructions for precise positioning.

### leg-extension-knee-pain-03

- Original: `C:\Users\slymn\.codex\generated_images\01a052ab-f850-7f62-bf8d-cd309ffd24b3\exec-7c447416-266c-4364-a95b-8aa657130df1.png`
- Final: `src/assets/article-photos/next-15/leg-extension-knee-pain-03.webp`
- Prompt: Use case: photorealistic-natural. Asset type: landscape educational article photograph. An adult gym user paused beside a seated leg-extension machine selecting a light resistance on its weight stack with a yellow selector pin. Focus hand and stack while seat and shin roller are clearly recognizable behind, realistic correct hand anatomy, clean gym natural light. Weight stack plain unnumbered, no legible text logos watermark collage.
- QA: subject and equipment visible; no diagnostic overlays; suitable editorial image. Follow actual machine instructions for precise positioning.

### work-boots-knee-pain-hero

- Original: `C:\Users\slymn\.codex\generated_images\01a052ab-f850-7f62-bf8d-cd309ffd24b3\exec-4f8d4ecb-40bb-4d54-a1b0-94f1aba80f4d.png`
- Final: `src/assets/guide-thumbnails/next-15/work-boots-knee-pain-hero.webp`
- Prompt: Use case: photorealistic-natural. Asset type: landscape article hero photograph. Adult warehouse worker in ordinary work trousers and high-visibility vest seated on a clean locker room bench checking the fit of unbranded brown leather protective work boots before shift. Both boots and knees clearly visible, realistic leather soles and lacing, factory background safely distant. Natural documentary photo. No text logos watermark collage pain glow.
- QA: subject and equipment visible; no diagnostic overlays; suitable editorial image. Follow actual machine instructions for precise positioning.

### work-boots-knee-pain-01

- Original: `C:\Users\slymn\.codex\generated_images\01a052ab-f850-7f62-bf8d-cd309ffd24b3\exec-52656d7c-2bec-4ce7-a254-daf57dfe65b0.png`
- Final: `src/assets/article-photos/next-15/work-boots-knee-pain-01.webp`
- Prompt: Use case: photorealistic-natural. Asset type: landscape educational article photograph. Close low side view of an adult standing in unbranded brown leather protective work boots fully laced with work socks, knees and lower trouser legs visible. Clean industrial changing area, realistic broad toe boxes, secure heel fit, crisp leather and laces. No safety labels fabricated, no text logos watermark collage.
- QA: subject and equipment visible; no diagnostic overlays; suitable editorial image. Follow actual machine instructions for precise positioning.

### work-boots-knee-pain-02

- Original: `C:\Users\slymn\.codex\generated_images\01a052ab-f850-7f62-bf8d-cd309ffd24b3\exec-4c2c67b5-9beb-41b5-a7e1-75665dacb69b.png`
- Final: `src/assets/article-photos/next-15/work-boots-knee-pain-02.webp`
- Prompt: Use case: photorealistic-natural. Asset type: landscape educational article photograph. Warehouse workstation showing worker's lower body in work trousers and protective boots on a beveled-edge anti-fatigue mat placed flat on concrete, workstation at comfortable height, clear aisle and no debris. Focus mat edge and boots, realistic industrial light and surface texture. No text logos watermark collage.
- QA: subject and equipment visible; no diagnostic overlays; suitable editorial image. Follow actual machine instructions for precise positioning.

### work-boots-knee-pain-03

- Original: `C:\Users\slymn\.codex\generated_images\01a052ab-f850-7f62-bf8d-cd309ffd24b3\exec-c2a0794f-f2c3-4367-9223-bde10fe22088.png`
- Final: `src/assets/article-photos/next-15/work-boots-knee-pain-03.webp`
- Prompt: Use case: product-mockup. Asset type: landscape educational article photograph. Close inspection scene of two unbranded brown leather protective work boots on a light wooden bench, one upright and one on its side showing tread with moderate ordinary wear, removable factory footbed placed beside them. Realistic robust safety boot construction, useful sole heel and insert details, natural daylight. No text logos watermark labels or collage.
- QA: subject and equipment visible; no diagnostic overlays; suitable editorial image. Follow actual machine instructions for precise positioning.

### rowing-machine-knee-pain-hero

- Original: `C:\Users\slymn\.codex\generated_images\01a052ab-f850-7f62-bf8d-cd309ffd24b3\exec-6d96c7aa-6ab4-4b07-bc1e-e779fd8cd344.png`
- Final: `src/assets/guide-thumbnails/next-15/rowing-machine-knee-pain-hero.webp`
- Prompt: Use case: photorealistic-natural. Asset type: landscape article hero photograph. Side view of adult man in sports clothing on a realistic air resistance rowing ergometer in bright gym, at a comfortable shallow catch position: seat forward but not against heels, shins nearly vertical, arms straight holding connected handle, shoulders relaxed, torso hinged gently forward from hips, feet strapped on footplates. Entire flywheel rail seat and body clearly visible and mechanically plausible. No text logos watermark collage pain glow.
- QA: subject and equipment visible; no diagnostic overlays; suitable editorial image. Follow actual machine instructions for precise positioning.

### rowing-machine-knee-pain-01

- Original: `C:\Users\slymn\.codex\generated_images\01a052ab-f850-7f62-bf8d-cd309ffd24b3\exec-d28f619d-1b77-450f-bd24-91ec4d440a10.png`
- Final: `src/assets/article-photos/next-15/rowing-machine-knee-pain-01.webp`
- Prompt: Use case: photorealistic-natural. Asset type: landscape educational article photograph. Close side view of lower body of adult seated on an air rowing machine at comfortable catch position, knees bent without excessive compression, shins approximately vertical, shoes on angled footplates, heels allowed natural slight lift, seat not jammed against heels. Include thighs and hands holding handle ahead of knees, realistic connected rower mechanism. No text logos watermark diagrams arrows collage.
- QA: subject and equipment visible; no diagnostic overlays; suitable editorial image. Follow actual machine instructions for precise positioning.

### rowing-machine-knee-pain-02

- Original: `C:\Users\slymn\.codex\generated_images\01a052ab-f850-7f62-bf8d-cd309ffd24b3\exec-4491014c-09f6-432d-9bde-0a17ea08afa8.png`
- Final: `src/assets/article-photos/next-15/rowing-machine-knee-pain-02.webp`
- Prompt: Use case: photorealistic-natural. Asset type: landscape educational article photograph. Close oblique overhead view of both feet in plain trainers placed in rowing machine adjustable heel cups on angled footplates. Straps run across broad forefoot at ball of foot, adult hand adjusts one strap, heel cups symmetric, realistic rower hardware with no visible brand. Show actual secure shoe and strap contact. No text logos watermark labels collage.
- QA: subject and equipment visible; no diagnostic overlays; suitable editorial image. Follow actual machine instructions for precise positioning.

### rowing-machine-knee-pain-03

- Original: `C:\Users\slymn\.codex\generated_images\01a052ab-f850-7f62-bf8d-cd309ffd24b3\exec-9a4c55b4-57db-4d57-9534-54336eafae30.png`
- Final: `src/assets/article-photos/next-15/rowing-machine-knee-pain-03.webp`
- Prompt: Use case: photorealistic-natural. Asset type: landscape educational article photograph. Side view adult woman on air rowing ergometer at early recovery: legs extended without hyperextension, arms extended forward holding handle, torso starting gentle hinge forward, knees still low so handle has a clear path over them. Clean gym natural light, entire person and connected handle chain, rail seat footplates and fan visible, mechanically plausible. No text logos watermark collage arrows pain effects.
- QA: subject and equipment visible; no diagnostic overlays; suitable editorial image. Follow actual machine instructions for precise positioning.

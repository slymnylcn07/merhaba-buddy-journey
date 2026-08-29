import type { GuideData } from "./guides";

/**
 * New guide metadata belongs here.
 *
 * Rule:
 * - publishedDate = first public publication date and never changes.
 * - lastModified = latest material update date and may change.
 * - Latest Guides sorts only by publishedDate.
 */
export interface PublishedGuideData extends GuideData {
  publishedDate: string;
}

export const recentGuidesData: PublishedGuideData[] = [
  {
    slug: "can-running-shoes-cause-knee-pain",
    title: "Can Running Shoes Cause Knee Pain? Fit, Drop, Stability, and Training Load",
    description:
      "Test whether new or worn running shoes are contributing to knee pain by comparing fit, heel drop, cushioning, stability, wear, and training load.",
    readTime: 22,
    publishedDate: "2026-08-29",
    lastModified: "2026-08-29",
  },
  {
    slug: "knee-injury-symptom-chart",
    title: "Knee Injury Symptom Chart: Ligament, Meniscus, Tendon, and Bone Patterns",
    description:
      "Compare knee injury symptoms by event, pain location, swelling, movement loss and stability across ligament, meniscus, tendon and bone patterns.",
    readTime: 20,
    publishedDate: "2026-08-29",
    lastModified: "2026-08-29",
  },
  {
    slug: "meniscus-knee-pain-location-chart",
    title: "Meniscus Knee Pain Location Chart: Inner, Outer, and Joint-Line Pain",
    description:
      "Map medial and lateral meniscus pain, joint-line clues, twisting and deep-bend triggers, common mimics and signs that need assessment.",
    readTime: 20,
    publishedDate: "2026-08-29",
    lastModified: "2026-08-29",
  },
  {
    slug: "hip-to-knee-pain-location-chart",
    title: "Hip-to-Knee Pain Location Chart: Referred Pain Patterns Explained",
    description:
      "Compare hip, knee, nerve and lower-back clues when pain travels from the hip or thigh toward the knee, including urgent warning signs.",
    readTime: 19,
    publishedDate: "2026-08-29",
    lastModified: "2026-08-29",
  },
  {
    slug: "seated-knee-exercises-limited-mobility",
    title: "Seated Knee Exercises for Limited Mobility: A Chair Routine",
    description:
      "Follow a stable-chair routine with ankle pumps, heel slides, marching, knee extensions, safe setup and a measured progression.",
    readTime: 20,
    publishedDate: "2026-08-29",
    lastModified: "2026-08-29",
  },
  {
    slug: "patellar-tendon-strap-knee-pain",
    title: "Patellar Tendon Strap for Knee Pain: Placement, Fit, and When It Helps",
    description:
      "Learn where a patellar strap sits, how tight it should feel, what the evidence says, who may benefit and when a strap is the wrong tool.",
    readTime: 21,
    publishedDate: "2026-08-29",
    lastModified: "2026-08-29",
  },
  {
    slug: "knee-sleeves-for-running",
    title: "Knee Sleeves for Running: Fit, Compression, and When They Help",
    description:
      "Learn whether knee sleeves help runners, how compression should fit, when to wear one, and when recurring knee pain needs a better plan.",
    readTime: 20,
    publishedDate: "2026-08-04",
    lastModified: "2026-08-04",
  },
  {
    slug: "best-sandals-knee-pain",
    title: "Best Sandals for Knee Pain: Support, Cushioning, and Fit",
    description:
      "Compare walking sandals for knee pain by heel security, arch shape, cushioning, flexibility, traction, and a practical fit test.",
    readTime: 20,
    publishedDate: "2026-08-04",
    lastModified: "2026-08-04",
  },
  {
    slug: "best-hiking-poles-bad-knees",
    title: "Best Hiking Poles for Bad Knees: Length, Grip, and Downhill Use",
    description:
      "Choose hiking poles for bad knees by length, grip, lock, shaft, and terrain, then learn how to use trekking poles downhill safely.",
    readTime: 20,
    publishedDate: "2026-08-04",
    lastModified: "2026-08-04",
  },
  {
    slug: "diclofenac-gel-knee-pain",
    title: "Diclofenac Gel for Knee Pain: Voltaren Use, Safety, and Evidence",
    description:
      "Learn when diclofenac gel may help knee osteoarthritis, how to follow a 1% gel label, what to avoid, side effects, and when to seek care.",
    readTime: 21,
    publishedDate: "2026-08-04",
    lastModified: "2026-08-04",
  },
  {
    slug: "capsaicin-cream-knee-pain",
    title: "Capsaicin Cream for Knee Pain: How It Works and What to Expect",
    description:
      "Learn how capsaicin cream may help knee osteoarthritis, why it burns, how to use it safely, evidence limits, and when to stop.",
    readTime: 20,
    publishedDate: "2026-08-04",
    lastModified: "2026-08-04",
  },
  {
    slug: "nordic-hamstring-curl-knee-health",
    title: "Nordic Hamstring Curls and Knee Health: Benefits, Form, and Progressions",
    description:
      "Learn Nordic hamstring curl benefits, muscles worked, knee-friendly setup, beginner progressions, common mistakes, and evidence-based limits.",
    readTime: 18,
    publishedDate: "2026-08-03",
    lastModified: "2026-08-03",
  },
  {
    slug: "cyclist-squat-knee-strength",
    title: "Cyclist Squat for Knee Strength: Heel-Elevated Form and Progression",
    description:
      "Learn cyclist squat benefits, heel-elevated setup, muscles worked, knee loading, common mistakes, and a gradual bodyweight-to-loaded progression.",
    readTime: 19,
    publishedDate: "2026-08-03",
    lastModified: "2026-08-03",
  },
  {
    slug: "knee-taping-stability-pfps",
    title: "Knee Taping for Stability and Patellofemoral Pain: KT Tape vs Rigid Tape",
    description:
      "Compare KT tape and rigid knee taping for patellofemoral pain, including realistic benefits, tailored application, skin safety, and limits.",
    readTime: 18,
    publishedDate: "2026-08-03",
    lastModified: "2026-08-03",
  },
  {
    slug: "tens-unit-knee-pain",
    title: "TENS Unit for Knee Pain: Pad Placement, Settings, Safety, and Evidence",
    description:
      "Learn how a TENS unit for knee pain works, example pad placement, safe settings, contraindications, and what osteoarthritis evidence shows.",
    readTime: 19,
    publishedDate: "2026-08-03",
    lastModified: "2026-08-03",
  },
  {
    slug: "cold-therapy-machine-knee",
    title: "Cold Therapy Machine for the Knee: Ice Machines Compared",
    description:
      "Compare knee ice machines, cold-compression units, iceless systems, and gel packs by evidence, safety, pad fit, timers, upkeep, and cost.",
    readTime: 20,
    publishedDate: "2026-08-03",
    lastModified: "2026-08-03",
  },
  {
    slug: "are-knees-over-toes-bad",
    title: "Are Knees Over Toes Bad? What the Evidence and Load Actually Mean",
    description:
      "Learn what knees over toes means in squats and lunges, how depth and load change knee demand, and how to progress the position without treating it as a pass-or-fail rule.",
    readTime: 18,
    publishedDate: "2026-08-02",
    lastModified: "2026-08-02",
  },
  {
    slug: "tibialis-raises-knee-strength",
    title: "Tibialis Raises for Knee Strength: Benefits and Technique",
    description:
      "Use wall tibialis raises with clear setup, form, range, and progression while understanding what stronger ankle dorsiflexors can and cannot do for knee comfort.",
    readTime: 17,
    publishedDate: "2026-08-02",
    lastModified: "2026-08-02",
  },
  {
    slug: "banded-tke-knee-exercise",
    title: "Banded TKE for Knee Strength: Setup, Form, and Progression",
    description:
      "Set up terminal knee extension with a resistance band, find a controlled quadriceps squeeze, troubleshoot form, and progress the drill one variable at a time.",
    readTime: 17,
    publishedDate: "2026-08-02",
    lastModified: "2026-08-02",
  },
  {
    slug: "spanish-squat-patellar-tendon",
    title: "Spanish Squat for Patellar Tendon Pain: How and When to Use It",
    description:
      "Learn Spanish squat band setup, upright form, isometric holds, symptom monitoring, and where the exercise may fit within progressive patellar tendon loading.",
    readTime: 18,
    publishedDate: "2026-08-02",
    lastModified: "2026-08-02",
  },
  {
    slug: "step-down-exercise-knee-control",
    title: "Step-Down Exercise for Knee Control: Form and Progression",
    description:
      "Build single-leg knee control with forward and lateral step-downs, a low heel tap, practical alignment cues, and gradual height, repetition, and load progressions.",
    readTime: 18,
    publishedDate: "2026-08-02",
    lastModified: "2026-08-02",
  },
  {
    slug: "stairmaster-vs-incline-treadmill-knees",
    title: "StairMaster vs Incline Treadmill for Bad Knees",
    description:
      "Compare knee bend, workout control, Zone 2 cardio, calorie estimates, technique, and a practical first test on both machines.",
    readTime: 18,
    publishedDate: "2026-08-01",
    lastModified: "2026-08-01",
  },
  {
    slug: "incline-walking-knee-pain",
    title: "Incline Walking With Knee Pain: When Hills Help or Hurt",
    description:
      "Learn how treadmill grade, pace, duration, hills, downhill exposure, and the 12-3-30 workout can change knee demand.",
    readTime: 18,
    publishedDate: "2026-08-01",
    lastModified: "2026-08-01",
  },
  {
    slug: "reformer-pilates-knee-pain",
    title: "Reformer Pilates With Knee Pain: Springs, Footbar, and Modifications",
    description:
      "Adjust reformer springs, footbar position, range, kneeling, lunges, and class communication without relying on one universal setting.",
    readTime: 17,
    publishedDate: "2026-08-01",
    lastModified: "2026-08-01",
  },
  {
    slug: "aqua-jogging-knee-pain",
    title: "Aqua Jogging for Knee Pain: A Pool Workout Without Impact",
    description:
      "Set up deep-water pool running with a flotation belt, form cues, a beginner workout, progression, and return-to-land checks.",
    readTime: 17,
    publishedDate: "2026-08-01",
    lastModified: "2026-08-01",
  },
  {
    slug: "downhill-running-knee-pain",
    title: "Downhill Running Knee Pain: Braking Load, Form, and Recovery",
    description:
      "Understand how grade, speed, braking, cadence, stride, and descent exposure shape knee pain and a gradual return to downhill running.",
    readTime: 18,
    publishedDate: "2026-08-01",
    lastModified: "2026-08-01",
  },
  {
    slug: "hyrox-knee-pain",
    title: "HYROX Knee Pain: Running, Lunges, Sleds, and Wall Balls",
    description:
      "Map HYROX knee pain to running, sled work, lunges, wall balls, fatigue, training load, shoes, and a staged return to race-specific work.",
    readTime: 20,
    publishedDate: "2026-07-31",
    lastModified: "2026-07-31",
  },
  {
    slug: "rucking-knee-pain",
    title: "Rucking With Bad Knees: Backpack Weight, Hills, and Footwear",
    description:
      "Learn how backpack weight, pace, hills, terrain, pack fit, footwear, and recovery affect knee comfort during loaded walking.",
    readTime: 21,
    publishedDate: "2026-07-31",
    lastModified: "2026-07-31",
  },
  {
    slug: "padel-knee-pain",
    title: "Padel Knee Pain: Turning, Stopping, and Court-Sport Recovery",
    description:
      "Understand knee pain after padel through braking, pivots, low lunges, court load, footwear, warning signs, and a gradual return to play.",
    readTime: 19,
    publishedDate: "2026-07-31",
    lastModified: "2026-07-31",
  },
  {
    slug: "trail-running-knee-pain",
    title: "Trail Running Knee Pain: Terrain, Footing, and Route Load",
    description:
      "How technical terrain, footing, elevation, route design, and fatigue shape knee symptoms and a gradual return to trail running.",
    readTime: 19,
    publishedDate: "2026-07-31",
    lastModified: "2026-08-01",
  },
  {
    slug: "knee-xray-vs-mri-vs-ultrasound",
    title: "Knee X-Ray vs MRI vs Ultrasound: What Each Test Can Show",
    description:
      "Compare what knee X-rays, MRI, and ultrasound can show, what each may miss, when contrast is used, and why the examination still matters.",
    readTime: 24,
    publishedDate: "2026-07-31",
    lastModified: "2026-07-31",
  },
  {
    slug: "osgood-schlatter-adults",
    title: "Osgood-Schlatter in Adults: Why the Bump Below the Knee Can Still Hurt",
    description:
      "Why an old Osgood-Schlatter bump can hurt in adulthood, including tibial tubercle pressure, residual ossicles, imaging, treatment, and surgery.",
    readTime: 19,
    publishedDate: "2026-07-30",
    lastModified: "2026-07-30",
  },
  {
    slug: "peroneal-nerve-compression-knee",
    title: "Peroneal Nerve Compression Near the Knee: Numbness, Pain, and Foot Drop",
    description:
      "How compression at the fibular head can cause outer-shin numbness, top-of-foot tingling, weakness, foot slap, and foot drop.",
    readTime: 19,
    publishedDate: "2026-07-30",
    lastModified: "2026-08-29",
  },
  {
    slug: "saphenous-nerve-knee-pain",
    title: "Saphenous Nerve Knee Pain: Inner-Knee Burning, Numbness, and Entrapment",
    description:
      "Map saphenous nerve distribution, inner-knee burning, infrapatellar numbness, surgical scar pain, diagnosis, and treatment options.",
    readTime: 17,
    publishedDate: "2026-07-30",
    lastModified: "2026-07-30",
  },
  {
    slug: "knee-numbness-guide",
    title: "Knee Numbness: Around the Kneecap, Outer Knee, and Below the Knee",
    description:
      "A location-first guide to knee numbness from local pressure, surgery, peroneal and saphenous nerves, sciatica, neuropathy, and urgent warning signs.",
    readTime: 18,
    publishedDate: "2026-07-30",
    lastModified: "2026-07-30",
  },
  {
    slug: "osteochondral-lesion-knee",
    title: "Osteochondral Lesions of the Knee: Cartilage and Bone Injury",
    description:
      "Understand osteochondral lesions and defects, cartilage and bone injury, MRI stability, osteochondritis dissecans, treatment, surgery, and recovery.",
    readTime: 18,
    publishedDate: "2026-07-30",
    lastModified: "2026-07-30",
  },
  {
    slug: "collagen-peptides-knee-pain",
    title: "Collagen for Knee Pain: Do Collagen Peptides Actually Work?",
    description:
      "Compare hydrolyzed collagen peptides, marine collagen and undenatured type II collagen, including trial doses, evidence, safety, and product quality.",
    readTime: 19,
    publishedDate: "2026-07-28",
    lastModified: "2026-07-28",
  },
  {
    slug: "turmeric-curcumin-knee-pain",
    title: "Turmeric for Knee Pain: Curcumin Evidence, Dose, and Safety",
    description:
      "Turmeric powder, standardized curcumin and enhanced-absorption formulas compared by evidence, dose, interactions, safety, and product quality.",
    readTime: 19,
    publishedDate: "2026-07-28",
    lastModified: "2026-07-28",
  },
  {
    slug: "varicose-veins-knee-pain",
    title: "Can Varicose Veins Cause Knee Pain? Behind-Knee Warning Signs",
    description:
      "Compare varicose-vein aching, Baker's cyst, joint pain, superficial thrombosis and DVT, with treatment options and urgent warning signs.",
    readTime: 20,
    publishedDate: "2026-07-28",
    lastModified: "2026-08-04",
  },
  {
    slug: "knee-osteoarthritis-vs-rheumatoid-arthritis",
    title: "Knee Osteoarthritis vs Rheumatoid Arthritis: Key Differences",
    description:
      "Compare symptoms, morning stiffness, swelling, blood tests, imaging, stages and treatment differences between knee OA and rheumatoid arthritis.",
    readTime: 21,
    publishedDate: "2026-07-28",
    lastModified: "2026-07-28",
  },
  {
    slug: "best-low-impact-cardio-knee-pain",
    title: "Best Low-Impact Cardio for Knee Pain: Walking vs. Cycling vs. Swimming",
    description:
      "Compare walking, cycling, and swimming by knee load, access, setup, symptom pattern, and next-day response, with a four-week starter plan.",
    readTime: 17,
    publishedDate: "2026-07-27",
    lastModified: "2026-07-27",
  },
  {
    slug: "backward-walking-knee-pain",
    title: "Backward Walking for Knee Pain: What the Evidence Says",
    description:
      "What trials actually show about retro walking, how it changes knee mechanics, who may benefit, and how to start without creating a fall risk.",
    readTime: 17,
    publishedDate: "2026-07-27",
    lastModified: "2026-07-27",
  },
];

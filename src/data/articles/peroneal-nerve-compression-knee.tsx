import { Link } from "react-router-dom";
import type { ArticleExport } from "./types";
import heroImage from "@/assets/guide-thumbnails/wave-3/peroneal-nerve-compression-knee.webp";
import sensoryMap from "@/assets/article-diagrams/wave-3/peroneal-sensory-map.svg";
import localizationMap from "@/assets/article-diagrams/wave-3/peroneal-localization.svg";

const linkClass = "font-medium text-primary underline underline-offset-4 hover:text-primary/80";

export const peronealNerveCompressionKnee: ArticleExport = {
  cta: "",
  article: {
    slug: "peroneal-nerve-compression-knee",
    title: "Peroneal Nerve Compression Near the Knee: Numbness, Pain, and Foot Drop",
    subtitle: "How pressure at the fibular head can affect the outer shin, top of the foot, ankle strength, and walking",
    intro:
      "The common peroneal nerve passes so close to the surface at the outside of the knee that a hard chair edge, tight brace, long period with crossed legs, rapid weight loss, or a knee injury can put it under pressure. Symptoms may begin as pins and needles over the outer shin or top of the foot. If the motor fibers are affected, the foot may slap, the toes may catch, or lifting the ankle may become difficult. That weakness changes the priority: new foot drop is not a routine outer-knee ache.",
    metaTitle: "Peroneal Nerve Compression: Knee Pain, Numbness & Foot Drop",
    metaDescription:
      "Peroneal nerve compression near the fibular head can cause outer-leg numbness, top-of-foot tingling and foot drop. Learn causes, tests and treatment.",
    heroImage,
    publishedDate: "July 30, 2026",
    lastUpdated: "August 29, 2026",
    nextSlug: "saphenous-nerve-knee-pain",
    nextTitle: "Saphenous Nerve Knee Pain",
    seoTags:
      "peroneal nerve compression knee, common fibular nerve entrapment, peroneal nerve palsy, peroneal nerve pain knee, outer knee numbness tingling, fibular head nerve pain, foot drop peroneal nerve, top of foot numbness, peroneal neuropathy symptoms, sciatic nerve vs peroneal nerve, l5 radiculopathy vs peroneal neuropathy",
    faqs: [
      {
        question: "Where is the peroneal nerve compressed near the knee?",
        answer:
          "The common peroneal, or common fibular, nerve is especially vulnerable where it wraps around the fibular head and neck on the outer side of the knee. It lies close to the skin and has relatively little protection from direct pressure."
      },
      {
        question: "What does peroneal nerve compression feel like?",
        answer:
          "Symptoms can include tingling, burning, reduced sensation, or pain along the outer upper shin and top of the foot. Weakness may make it hard to lift the ankle or toes, turn the foot outward, or walk without the foot slapping or catching."
      },
      {
        question: "Can crossing your legs cause peroneal nerve symptoms?",
        answer:
          "Prolonged or repeated pressure from crossing the legs at the knee can compress the nerve at the fibular head. Brief leg crossing does not injure everyone, but avoiding direct pressure is sensible when symptoms appear."
      },
      {
        question: "Is foot drop an emergency?",
        answer:
          "New foot drop needs prompt medical assessment because the cause may be at the knee, elsewhere along the nerve, a lumbar nerve root, or the central nervous system. Sudden weakness with facial symptoms, speech difficulty, severe back pain, bladder or bowel changes, or major trauma requires emergency care."
      },
      {
        question: "How is peroneal neuropathy diagnosed?",
        answer:
          "Diagnosis combines history, a neurological and musculoskeletal examination, and tests selected for the suspected cause. Nerve conduction studies and electromyography can localize and grade nerve dysfunction. Ultrasound, X-ray, or MRI may be used when a fracture, cyst, mass, or structural compression is possible."
      }
    ],
    content: (
      <>
        <div className="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Quick answer</p>
          <p className="mb-0 text-slate-700">
            <strong>Peroneal nerve compression near the knee most often occurs where the nerve curves around the fibular head on the outer side of the joint.</strong> It can cause tingling or numbness over the outer shin and top of the foot. More significant compression can weaken ankle and toe lifting, producing a foot slap or foot drop. Remove avoidable pressure, but arrange prompt assessment for new weakness, a change in walking, symptoms after trauma, or numbness that is progressing.
          </p>
        </div>

        <p>
          The terms <strong>peroneal nerve</strong> and <strong>fibular nerve</strong> refer to the same nerve. Many current anatomy sources prefer "fibular," while patients and clinicians still commonly use "peroneal." The common nerve divides below the knee into superficial and deep branches, which is why the precise mix of numbness and weakness helps localize the problem.
        </p>
        <p>
          <strong>Peroneal nerve palsy</strong> is a broader clinical term for loss of nerve function, particularly weakness, and does not name the cause. Compression at the fibular head is one possible cause; trauma, a cyst, surgery, a more proximal sciatic lesion, and other neuropathies can produce a similar deficit. New foot drop therefore needs localization rather than being labeled a simple pressure episode at home.
        </p>
        <p>
          Outer-knee pain alone is not enough to diagnose nerve compression. The iliotibial band, biceps femoris tendon, lateral meniscus, proximal tibiofibular joint, and lateral collateral ligament all occupy the same region. The guide to <Link to="/guides/side-knee-pain-comfort-guide" className={linkClass}>inner and outer knee pain</Link> compares these mechanical patterns.
        </p>

        <h2>Why the Peroneal Nerve Is Vulnerable at the Fibular Head</h2>
        <p>
          The common peroneal nerve separates from the sciatic nerve, travels behind the outer knee, and wraps around the neck of the fibula. At this point it is superficial, close to bone, and covered by relatively little soft tissue. A tight cast, compression wrap, brace edge, prolonged bed positioning, habitual leg crossing, or extended squatting can press it against the fibula.
        </p>
        <p>
          Trauma can stretch, bruise, or cut the nerve. Knee dislocation, fibular-head fracture, proximal fibula fracture, and some ligament injuries are important causes. Surgery around the hip, knee, or lower leg can also affect the nerve. Less commonly, an intraneural ganglion cyst, tumor, or another mass creates focal compression.
        </p>
        <p>
          Rapid weight loss can reduce the normal cushion around the fibular head. Diabetes and broader neuropathy can also make nerve symptoms more likely, but they do not prove that the compression site is at the knee.
        </p>

        <h2>Peroneal Nerve Symptom Map</h2>
        <figure className="my-8">
          <img src={sensoryMap} alt="Diagram of the common peroneal nerve around the fibular head and its outer-shin and top-of-foot sensory territory" loading="lazy" />
          <figcaption>Symptoms at the fibular head often combine a focal outer-knee pressure point with sensory changes farther down the leg.</figcaption>
        </figure>
        <div className="my-8 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[920px] border-collapse text-left text-sm">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="px-5 py-4 font-semibold">Finding</th>
                <th className="px-5 py-4 font-semibold">What a person may notice</th>
                <th className="px-5 py-4 font-semibold">Possible level</th>
                <th className="px-5 py-4 font-semibold">Why it matters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Outer upper-shin numbness</td>
                <td className="px-5 py-4 text-slate-600">Pins and needles, burning, or reduced touch near and below the fibular head</td>
                <td className="px-5 py-4 text-slate-600">Common peroneal nerve</td>
                <td className="px-5 py-4 text-slate-600">Supports a local nerve pattern but is not diagnostic by itself</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Top-of-foot sensory change</td>
                <td className="px-5 py-4 text-slate-600">Numbness or tingling across most of the dorsum of the foot</td>
                <td className="px-5 py-4 text-slate-600">Superficial branch or common nerve</td>
                <td className="px-5 py-4 text-slate-600">Distribution helps separate it from sole-of-foot symptoms</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">First web-space numbness</td>
                <td className="px-5 py-4 text-slate-600">Reduced feeling between the big toe and second toe</td>
                <td className="px-5 py-4 text-slate-600">Deep peroneal branch</td>
                <td className="px-5 py-4 text-slate-600">A small but useful sensory territory during examination</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Weak ankle or toe lifting</td>
                <td className="px-5 py-4 text-slate-600">Toes catch, foot slaps, or stairs feel unsafe</td>
                <td className="px-5 py-4 text-slate-600">Deep branch or common nerve</td>
                <td className="px-5 py-4 font-semibold text-amber-700">Needs prompt assessment</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Weak outward foot movement</td>
                <td className="px-5 py-4 text-slate-600">Difficulty turning the sole outward or stabilizing on uneven ground</td>
                <td className="px-5 py-4 text-slate-600">Superficial branch or common nerve</td>
                <td className="px-5 py-4 text-slate-600">Helps distinguish the pattern from an isolated deep-branch problem</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Peroneal Neuropathy vs. L5 Radiculopathy</h2>
        <figure className="my-8">
          <img src={localizationMap} alt="Comparison of clues from fibular-head compression, lumbar nerve-root irritation, and urgent neurological patterns" loading="lazy" />
          <figcaption>Foot drop describes a movement problem, not a single diagnosis. Localization determines treatment.</figcaption>
        </figure>
        <p>
          A pinched lumbar nerve root can also cause foot drop, sensory change, and leg pain. Back pain, pain traveling from the buttock, and weakness involving muscles outside the peroneal distribution may point higher. However, back pain can be absent, and a local peroneal problem can coexist with lumbar disease.
        </p>
        <p>
          Examination of ankle dorsiflexion, toe extension, foot eversion, foot inversion, reflexes, sensation, and hip strength helps localize the lesion. Electromyography and nerve conduction studies are often used when the site or severity is unclear. The article on the <Link to="/guides/knee-discomfort-lower-back-hips" className={linkClass}>lower-back, hip, and knee connection</Link> explains why symptoms felt near the knee do not always begin there.
        </p>
        <p>
          A general <Link to="/guides/knee-numbness-guide" className={linkClass}>knee numbness map</Link> is useful when the altered sensation sits around the kneecap rather than the outer shin and foot.
        </p>
        <div className="my-8 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[840px] border-collapse text-left text-sm">
            <thead className="bg-slate-950 text-white"><tr><th className="px-5 py-4">Possible level</th><th className="px-5 py-4">Clues that may fit</th><th className="px-5 py-4">Why examination still matters</th></tr></thead>
            <tbody className="divide-y divide-slate-200">
              <tr><td className="px-5 py-4 font-semibold">Fibular head compression</td><td className="px-5 py-4">Outer-knee pressure history, outer-shin or top-of-foot sensory change, ankle and toe-lifting weakness</td><td className="px-5 py-4">A local mass, trauma, or branch-level injury can alter the pattern</td></tr>
              <tr><td className="px-5 py-4 font-semibold">L5 nerve root</td><td className="px-5 py-4">Back or buttock symptoms, weakness beyond the peroneal distribution, inversion involvement</td><td className="px-5 py-4">Back pain can be absent and findings can overlap</td></tr>
              <tr><td className="px-5 py-4 font-semibold">Sciatic nerve</td><td className="px-5 py-4">Wider sensory or motor involvement that includes tibial as well as peroneal territories</td><td className="px-5 py-4">The site and cause may be in the pelvis, thigh, or elsewhere</td></tr>
            </tbody>
          </table>
        </div>
        <h3>Why foot inversion is an important examination clue</h3>
        <p>
          The muscles that turn the sole inward are mainly supplied by the tibial nerve but receive much of their command from the L5 nerve root. If ankle lifting is weak while inversion remains relatively strong, a common peroneal lesion becomes more plausible. If inversion is also weak, a problem higher in the pathway, such as L5 radiculopathy or sciatic neuropathy, deserves more attention. This is a clue, not a home diagnostic test.
        </p>
        <p>
          Hip abduction, reflexes, back movement, and sensory boundaries add context. No single movement perfectly separates every cause because pain, effort, previous injury, and overlapping lesions can blur the pattern.
        </p>

        <h2>How Compression Is Diagnosed</h2>
        <p>
          The history should cover onset, recent injury, surgery, casting, braces, prolonged bed rest, weight loss, leg-crossing habits, squatting, diabetes, and back symptoms. Examination checks the fibular head for tenderness, sensation over the outer shin and foot, ankle and toe strength, gait, and signs of a knee or proximal fibula injury.
        </p>
        <p>
          Plain X-rays can look for fracture or bone abnormality after trauma. Ultrasound can show nerve enlargement, altered fascicles, or a nearby cyst. MRI can assess soft-tissue masses and associated knee structures. Electrodiagnostic testing helps determine whether the problem is at the fibular head, a more distal branch, the sciatic nerve, or a lumbar root.
        </p>
        <p>
          Test timing and interpretation matter. A normal early study does not answer every clinical question, and an abnormal study must be matched to symptoms and examination. The goal is to locate the lesion and understand whether sensory, motor, or both types of fibers are affected.
        </p>
        <h3>What nerve conduction studies and EMG can add</h3>
        <p>
          Nerve conduction testing measures how an electrical signal travels through selected sensory and motor segments. Slowing or conduction block across the fibular head can support focal compression. Needle electromyography samples electrical activity in muscles supplied by different nerves and roots. The combination can estimate severity, identify axonal loss, and show whether muscles outside the common peroneal territory are involved.
        </p>
        <p>
          These tests do not replace the history or imaging. A ganglion cyst may need ultrasound or MRI even when electrodiagnostic testing confirms nerve dysfunction. Likewise, test abnormalities can remain after symptoms improve. Results should be interpreted by someone who can integrate the timeline, examination, and structural cause.
        </p>

        <h2>Common Peroneal Nerve Injury Symptoms During Walking</h2>
        <p>
          Mild motor dysfunction may appear before a person describes full foot drop. The foot can slap after heel strike because the ankle-lifting muscles cannot lower it smoothly. Toes may catch on rugs, curbs, or uneven ground. Some people lift the knee higher than usual to clear the foot, producing a steppage gait. Others notice that one shoe scuffs at the toe.
        </p>
        <p>
          Fatigue can expose subtle weakness. Walking may look nearly normal for the first few minutes and deteriorate later. Repeated trips, a new need to watch the feet, or difficulty heel-walking should be reported. Falls prevention matters while the cause is being assessed, especially on stairs and in low light.
        </p>
        <p>
          Sensory symptoms may fluctuate with position. Leg crossing, prolonged squatting, or leaning the outer knee against a surface can reproduce tingling. A response to pressure supports the history but is not permission to keep provoking the nerve.
        </p>

        <h2>What to Do About Suspected Pressure at the Knee</h2>
        <p>
          Stop avoidable direct pressure at the fibular head. Do not rest the outer knee against a hard chair edge, sleep with a rigid object pressing the area, or tighten a wrap over the fibular neck. Check casts, braces, and compression garments for focal pressure. A medical cast should be reviewed by the treating team rather than adjusted at home.
        </p>
        <p>
          When there is no weakness and symptoms are mild, a clinician may recommend observation, activity modification, and physical therapy. Rehabilitation can address ankle motion, strength, balance, gait, and protection of the nerve. If foot drop is present, an ankle-foot orthosis may reduce toe catching while the cause and recovery potential are evaluated.
        </p>
        <p>
          Treatment targets the cause. A ganglion cyst, fracture, severe traumatic injury, persistent entrapment, or rapidly worsening deficit may require a specialist and sometimes surgery. There is no single recovery timeline because a brief pressure palsy and a lacerated nerve are biologically different injuries.
        </p>
        <h3>How long can recovery take?</h3>
        <p>
          A short-lived pressure episode may improve over days or weeks once pressure is removed. Injury involving axons generally recovers more slowly because nerve fibers must regrow and reconnect with muscle. Severe traction, laceration, prolonged compression, or a structural mass can have a less predictable outcome. Age, diabetes, nutrition, smoking, and the distance to the affected muscle may also influence recovery.
        </p>
        <p>
          Improvement can occur in stages. Pain and tingling may change before strength, or strength may begin to return while a numb patch remains. Serial strength measurements, gait observations, and sometimes repeat electrodiagnostic testing provide a more useful picture than checking sensation alone.
        </p>

        <h2>Peroneal Nerve Compression After a Brace, Cast, or Surgery</h2>
        <p>
          Symptoms that begin under a cast or immediately after a procedure deserve early contact with the treating team. Swelling can turn an initially comfortable device into a pressure source, and padding can shift. New numbness, burning, toe weakness, increasing pain, or color and temperature change should not wait for a routine follow-up.
        </p>
        <p>
          After surgery, the cause may be positioning, swelling, traction, direct nerve injury, or a problem unrelated to the operative site. The surgeon can review the timing and anatomy. Do not cut or loosen a prescribed cast unless the treating team instructs you to do so, since the device may also be protecting a fracture or repair.
        </p>

        <h2>What Not to Do</h2>
        <p>
          Do not repeatedly press or aggressively massage a tender nerve to "release" it. Avoid placing a tight knee sleeve directly over the fibular head when it increases tingling. Heat may temporarily change sensation but does not relieve structural nerve compression and can burn skin with reduced feeling.
        </p>
        <p>
          Do not use return of pain as the only recovery test. Motor control matters. A person whose numbness is improving but whose toes still catch may remain at risk of falling.
        </p>

        <h2>When to Get Medical Help</h2>
        <div className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="mb-0 text-slate-700">
            Arrange prompt assessment for new ankle or toe weakness, foot slapping, repeated tripping, progressive numbness, symptoms after knee trauma, or pressure from a cast or brace. Seek emergency care for sudden limb weakness with facial droop, speech or vision change, severe back pain with bladder or bowel changes, a cold pale foot, or major knee injury with deformity or rapidly increasing swelling.
          </p>
        </div>

        <h2>The Bottom Line</h2>
        <p>
          The common peroneal nerve is easy to compress at the outer knee because it wraps around the fibular head close to the skin. Outer-shin and top-of-foot sensory changes are common clues. Weak ankle or toe lifting is the finding that should move the problem out of the self-care category.
        </p>
        <p>
          Remove avoidable pressure, protect walking safety, and have the cause localized. Examination, electrodiagnostic testing, and selected imaging help separate a local fibular-head problem from a branch injury, knee trauma, sciatic neuropathy, or lumbar radiculopathy.
        </p>
      </>
    ),
    sources: [
      {
        title: "Knee Neuropathies",
        publisher: "PM&R KnowledgeNow, American Academy of Physical Medicine and Rehabilitation",
        url: "https://now.aapmr.org/knee-neuropathies/"
      },
      {
        title: "Peroneal Nerve Injury",
        publisher: "NCBI Bookshelf",
        url: "https://www.ncbi.nlm.nih.gov/books/NBK549859/"
      },
      {
        title: "Electrodiagnostic Evaluation of Peroneal Neuropathy",
        publisher: "NCBI Bookshelf",
        url: "https://www.ncbi.nlm.nih.gov/books/NBK563251/"
      },
      {
        title: "An Update on Peroneal Nerve Entrapment and Neuropathy",
        publisher: "PubMed Central",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8567814/"
      },
      {
        title: "Foot drop",
        publisher: "MedlinePlus",
        url: "https://medlineplus.gov/ency/article/007761.htm"
      }
    ]
  }
};

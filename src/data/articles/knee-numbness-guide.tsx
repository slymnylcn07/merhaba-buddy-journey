import { Link } from "react-router-dom";
import type { ArticleExport } from "./types";
import heroImage from "@/assets/guide-thumbnails/wave-3/knee-numbness-guide.webp";
import zonesMap from "@/assets/article-diagrams/wave-3/knee-numbness-zones.svg";
import triageMap from "@/assets/article-diagrams/wave-3/knee-numbness-triage.svg";

const linkClass = "font-medium text-primary underline underline-offset-4 hover:text-primary/80";

export const kneeNumbnessGuide: ArticleExport = {
  cta: "",
  article: {
    slug: "knee-numbness-guide",
    title: "Knee Numbness: Around the Kneecap, Outer Knee, and Below the Knee",
    subtitle: "A location-first guide to pressure, surgery, local nerves, lumbar causes, weakness, and urgent warning signs",
    intro:
      "Knee numbness is easy to dismiss when the joint still moves and the patch is small. Yet the location and the symptoms traveling with it can tell very different stories. A quiet numb area beside an old surgical scar is not the same pattern as new outer-knee numbness with a slapping foot, and neither is the same as tingling that begins in the back and runs down the leg. Start by mapping the altered skin, then check strength, walking, swelling, circulation, and the timeline.",
    metaTitle: "Knee Numbness by Location: Causes & Warning Signs",
    metaDescription:
      "Map numbness around the kneecap, outer knee, above or below the knee. Compare local nerve pressure, surgery, sciatica, tests, care, and warning signs.",
    heroImage,
    publishedDate: "July 30, 2026",
    lastUpdated: "July 30, 2026",
    nextSlug: "osteochondral-lesion-knee",
    nextTitle: "Osteochondral Lesions of the Knee",
    seoTags:
      "knee numbness, numbness in knee, numbness around kneecap, outer knee numbness, numbness below knee, numbness above knee, knee numbness after surgery, numb knee and tingling, numbness in leg below knee",
    faqs: [
      {
        question: "What causes numbness around the kneecap?",
        answer:
          "A small superficial nerve may be irritated by pressure, injury, swelling, or surgery. The infrapatellar branch of the saphenous nerve is especially relevant near knee scars. Lumbar nerve problems and broader neuropathy can also alter sensation, so location alone is not diagnostic."
      },
      {
        question: "Why is the outside of my knee numb?",
        answer:
          "Pressure on the common peroneal nerve near the fibular head can cause outer-knee or outer-shin numbness, sometimes with top-of-foot tingling. New ankle or toe weakness, foot slapping, or repeated tripping needs prompt assessment."
      },
      {
        question: "Is knee numbness after surgery normal?",
        answer:
          "A small numb patch near an incision is common after several knee procedures because tiny skin nerves cross the surgical area. Report expanding numbness, severe burning, new weakness, circulation changes, worsening swelling, fever, or wound concerns to the surgical team."
      },
      {
        question: "Can sciatica cause numbness near the knee?",
        answer:
          "Yes. Lumbar nerve-root irritation can cause sensory changes in the thigh, knee region, lower leg, or foot. Back or buttock pain may occur but is not required. Strength, reflexes, and the full sensory pattern help localize the source."
      },
      {
        question: "When is knee or leg numbness an emergency?",
        answer:
          "Emergency assessment is needed for sudden numbness with major weakness, facial or speech changes, severe back pain with bladder or bowel changes or saddle numbness, a cold pale limb, or symptoms after major trauma."
      }
    ],
    content: (
      <>
        <div className="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Quick answer</p>
          <p className="mb-0 text-slate-700">
            <strong>Knee numbness usually reflects altered nerve signaling, but the source may be a small skin nerve, the common peroneal or saphenous nerve, a lumbar nerve root, surgery, swelling, or a wider neuropathy.</strong> A small stable patch without weakness may be monitored after a known pressure event or operation. New foot drop, spreading loss of sensation, severe back symptoms, circulation change, or sudden one-sided neurological symptoms requires prompt care.
          </p>
        </div>

        <p>
          Google Trends data shows that people most often search the plain phrase "numbness in knee," followed by location questions such as "numbness below knee" and "numbness above knee." This guide is organized around those real descriptions. It does not try to turn a skin map into a diagnosis. Nerve territories overlap, and individual anatomy is not identical.
        </p>

        <h2>First, Map the Numbness</h2>
        <figure className="my-8">
          <img src={zonesMap} alt="Front-knee map showing numbness zones around the kneecap, inner knee, outer knee, and below the knee" loading="lazy" />
          <figcaption>Use one fingertip to outline the altered area and note whether it is numb, tingling, burning, or painful to touch.</figcaption>
        </figure>
        <p>
          Compare the affected side with the other leg using gentle touch. Mark the upper, lower, inner, and outer boundaries. Is it a coin-sized patch, a band, or a path that continues into the foot? Does the skin feel less sensitive, more sensitive, or both? Note whether the area changes with sitting, kneeling, crossing the legs, bending the back, walking, or pressing near a scar.
        </p>
        <p>
          Then check function. Can you lift the ankle and toes, walk on the heels, straighten the knee, and climb a step as usual? Do not keep testing if you feel unsafe. Strength loss changes the priority because a purely cutaneous branch should not cause true motor weakness.
        </p>

        <h2>Numbness Around the Kneecap</h2>
        <p>
          Small sensory branches cross the front of the knee. The infrapatellar branch of the saphenous nerve commonly supplies skin beside and below the kneecap. It can be affected by an incision, arthroscopy portal, direct impact, prolonged kneeling, or scar tissue. The resulting patch may be numb, burning, or unusually sensitive to clothing.
        </p>
        <p>
          Front-knee swelling can also temporarily change sensation by stretching or compressing local tissues. If pain is deeper, linked with stairs or prolonged sitting, and not accompanied by a clear sensory change, a patellofemoral problem may be more likely. Our guide to <Link to="/guides/pain-behind-kneecap" className={linkClass}>pain behind the kneecap</Link> focuses on that mechanical pattern.
        </p>

        <h2>Numbness on the Outer Knee and Upper Shin</h2>
        <p>
          The common peroneal nerve wraps around the fibular head at the outside of the knee, where it lies close to the skin. Leg crossing, prolonged squatting, a tight brace or cast, bed positioning, rapid weight loss, knee trauma, or a nearby cyst can compress it. Sensory change may continue down the outer shin and across the top of the foot.
        </p>
        <p>
          Weak ankle or toe lifting, foot slapping, and repeated tripping suggest motor involvement. Read the dedicated <Link to="/guides/peroneal-nerve-compression-knee" className={linkClass}>peroneal nerve compression guide</Link> for the fibular-head pattern and why foot drop needs timely localization.
        </p>

        <h2>Numbness on the Inner Knee or Inner Shin</h2>
        <p>
          The saphenous nerve is the main sensory nerve along the inner knee and lower leg. Symptoms may follow surgery, a direct blow, scar entrapment, or less commonly compression farther up the thigh. Burning, electric pain, and touch sensitivity support nerve involvement, but medial meniscus, arthritis, pes anserine, and ligament problems can occur in the same area.
        </p>
        <p>
          The <Link to="/guides/saphenous-nerve-knee-pain" className={linkClass}>saphenous nerve knee pain guide</Link> explains the main trunk, infrapatellar branch, diagnostic blocks, and postoperative neuroma patterns.
        </p>

        <h2>Numbness Above or Below the Knee</h2>
        <p>
          Numbness above the knee may involve a skin nerve in the thigh, a femoral or saphenous pathway, a lumbar nerve root, or a more general neuropathy. A patch on the outer thigh is anatomically different from numbness centered on the knee and may involve the lateral femoral cutaneous nerve. Hip or pelvic procedures, tight garments, pregnancy, and body-weight changes can affect some thigh nerves.
        </p>
        <p>
          Numbness below the knee is too broad to localize by itself. The inner shin suggests the saphenous distribution; the outer shin and top of the foot suggest the common peroneal pathway; the sole of the foot suggests tibial nerve or spinal involvement. Bilateral stocking-like numbness raises more concern for systemic peripheral neuropathy.
        </p>

        <h2>Common Cause Groups</h2>
        <div className="my-8 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[940px] border-collapse text-left text-sm">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="px-5 py-4 font-semibold">Cause group</th>
                <th className="px-5 py-4 font-semibold">Typical context</th>
                <th className="px-5 py-4 font-semibold">Clues beyond numbness</th>
                <th className="px-5 py-4 font-semibold">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Local pressure</td>
                <td className="px-5 py-4 text-slate-600">Kneeling, leg crossing, brace, hard edge</td>
                <td className="px-5 py-4 text-slate-600">Position-linked tingling and a focal pressure point</td>
                <td className="px-5 py-4 text-slate-600">Remove pressure; assess if persistent</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Surgery or trauma</td>
                <td className="px-5 py-4 text-slate-600">Incision, arthroscopy, fracture, ligament injury</td>
                <td className="px-5 py-4 text-slate-600">Scar patch, swelling, focal electric pain</td>
                <td className="px-5 py-4 text-slate-600">Contact team for worsening or motor change</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Lumbar nerve root</td>
                <td className="px-5 py-4 text-slate-600">Back episode, radiating leg symptoms</td>
                <td className="px-5 py-4 text-slate-600">Weakness, reflex change, back or buttock pain</td>
                <td className="px-5 py-4 text-slate-600">Clinical localization</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Peripheral neuropathy</td>
                <td className="px-5 py-4 text-slate-600">Diabetes, alcohol, vitamin or metabolic issue</td>
                <td className="px-5 py-4 text-slate-600">Often bilateral and begins farther down the feet</td>
                <td className="px-5 py-4 text-slate-600">Medical evaluation and cause review</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Circulation or central nervous system</td>
                <td className="px-5 py-4 text-slate-600">Sudden onset or severe systemic pattern</td>
                <td className="px-5 py-4 text-slate-600">Cold pale limb, facial change, speech change</td>
                <td className="px-5 py-4 font-semibold text-rose-700">Emergency assessment</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Knee Numbness After Surgery</h2>
        <p>
          Surgeons must pass through skin that contains tiny sensory nerves. A numb patch near an incision can therefore occur after knee replacement, ligament reconstruction, meniscus surgery, arthroscopy, or tendon harvest. The patch may shrink, remain stable, or become less noticeable as the brain adapts. It does not necessarily mean the joint repair has failed.
        </p>
        <p>
          Painful numbness is different from neutral reduced sensation. Burning around a scar, an electric shock when one point is touched, or severe sensitivity to fabric may indicate a painful nerve ending or scar tethering. Increasing swelling, wound drainage, fever, calf pain, or new weakness requires review for complications beyond a small skin-nerve injury.
        </p>

        <h2>Can Sciatica Cause Numbness in the Knee?</h2>
        <p>
          Lumbar nerve-root irritation can alter sensation around the knee or lower leg. L3 and L4 patterns may involve the front or inner knee, while L5 commonly reaches the outer leg and top of the foot. Real symptoms rarely follow a textbook stripe perfectly. Disc changes, spinal narrowing, inflammation, and previous surgery can all affect the pattern.
        </p>
        <p>
          Back pain is helpful when present but not required. Clinicians use strength, reflexes, sensory testing, nerve-tension maneuvers, and sometimes imaging or electrodiagnostic tests to separate a root problem from a local nerve lesion. Severe back pain with saddle numbness or new bladder and bowel dysfunction is an emergency warning pattern.
        </p>

        <h2>How Knee and Leg Numbness Is Evaluated</h2>
        <p>
          The assessment starts with timing and distribution. A clinician will ask about surgery, trauma, braces, prolonged positions, back symptoms, diabetes, medications, alcohol, nutrition, and whether both legs are involved. Examination checks pulses, skin temperature, swelling, joint motion, scars, sensation, strength, reflexes, and gait.
        </p>
        <p>
          Tests depend on the suspected level. X-rays may be useful after trauma. Ultrasound can show superficial nerve changes or a nearby cyst. MRI can evaluate the lumbar spine, knee, or a soft-tissue mass when indicated. Nerve conduction studies and electromyography help localize larger nerve and root lesions. Blood tests may assess glucose, vitamin status, thyroid function, or other systemic causes when the pattern is broader.
        </p>
        <p>
          Not every numb patch needs every test. A small stable postoperative area with normal strength may be observed. Progressive symptoms, unclear localization, or motor findings justify a more structured workup.
        </p>

        <h2>What You Can Do Safely While Arranging Care</h2>
        <p>
          Remove obvious pressure from the affected area. Adjust sitting position, stop leaning the outer knee against hard furniture, and check nonmedical sleeves or straps. Contact the treating team before changing a cast, postoperative brace, or prescribed dressing. Protect skin with reduced sensation from extreme heat, ice, and friction because burns or pressure injury may be harder to feel.
        </p>
        <p>
          Keep a simple symptom map and note strength or walking changes once daily. Comfortable movement is usually preferable to repeatedly provoking the numb area. Do not aggressively massage a suspected nerve, and do not use a very hot device on skin that cannot judge temperature normally.
        </p>
        <p>
          If the knee is also painful or swollen, the cause may involve more than a nerve. The <Link to="/guides/knee-pain-locations-visual-guide" className={linkClass}>visual knee pain map</Link> and <Link to="/guides/knee-swelling-after-exercise" className={linkClass}>knee swelling after exercise guide</Link> help compare joint patterns.
        </p>

        <h2>When Numbness Changes the Urgency</h2>
        <figure className="my-8">
          <img src={triageMap} alt="Triage guide for stable numbness, symptoms needing assessment, and emergency neurological or circulation signs" loading="lazy" />
          <figcaption>Weakness, rapid progression, circulation change, and severe neurological symptoms matter more than patch size alone.</figcaption>
        </figure>
        <p>
          New numbness with ankle, toe, or knee weakness should be assessed promptly. Sudden one-sided weakness with facial droop, speech difficulty, vision change, or severe imbalance may indicate a central neurological emergency. A cold pale painful limb suggests impaired circulation and also needs emergency care.
        </p>
        <p>
          Severe back pain with new saddle numbness, loss of bladder or bowel control, difficulty starting urination, or rapidly worsening weakness can indicate cauda equina syndrome. Do not wait for a routine appointment. Major knee trauma with deformity, absent pulses, or rapidly increasing swelling also requires emergency evaluation.
        </p>

        <h2>When to Get Medical Help</h2>
        <div className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="mb-0 text-slate-700">
            Arrange an assessment when numbness is spreading, recurring, painful, bilateral, linked with gait change, or unexplained by a brief pressure event. Contact a surgical team for worsening symptoms near a recent procedure. Seek emergency care for sudden weakness or neurological change, bladder or bowel symptoms with back pain, a cold pale limb, or major trauma.
          </p>
        </div>

        <h2>The Bottom Line</h2>
        <p>
          "Knee numbness" describes a symptom, not one condition. Mapping the patch separates front-knee skin branches, the outer common peroneal pathway, the inner saphenous pathway, and patterns that may begin in the lumbar spine or a wider neuropathy.
        </p>
        <p>
          The safest next step depends on function and timing. A small stable postoperative patch is usually lower priority than numbness with foot drop, rapid spread, severe back symptoms, or circulation change. Protect insensitive skin, remove avoidable pressure, and seek an examination when the pattern is persistent or unclear.
        </p>
      </>
    ),
    sources: [
      {
        title: "Numbness and Tingling",
        publisher: "MedlinePlus",
        url: "https://medlineplus.gov/ency/article/003206.htm"
      },
      {
        title: "Peripheral Neuropathy",
        publisher: "National Institute of Neurological Disorders and Stroke",
        url: "https://www.ninds.nih.gov/health-information/disorders/peripheral-neuropathy"
      },
      {
        title: "Knee Neuropathies",
        publisher: "PM&R KnowledgeNow, American Academy of Physical Medicine and Rehabilitation",
        url: "https://now.aapmr.org/knee-neuropathies/"
      },
      {
        title: "Sciatica",
        publisher: "MedlinePlus",
        url: "https://medlineplus.gov/ency/article/000686.htm"
      },
      {
        title: "Cauda Equina Syndrome",
        publisher: "North Bristol NHS Trust",
        url: "https://www.nbt.nhs.uk/our-services/a-z-services/neurosurgery/neurosurgery-patient-information/same-day-emergency-clinic-sdec-cauda-equina-syndrome-sec"
      }
    ]
  }
};

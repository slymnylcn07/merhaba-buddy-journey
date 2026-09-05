import { Link } from "react-router-dom";
import type { ArticleExport } from "./types";
import heroImage from "@/assets/guide-thumbnails/wave-3/saphenous-nerve-knee-pain.webp";
import branchMap from "@/assets/article-diagrams/wave-3/saphenous-branch-map.svg";
import differentialMap from "@/assets/article-diagrams/wave-3/saphenous-differential.svg";

const linkClass = "font-medium text-primary underline underline-offset-4 hover:text-primary/80";

export const saphenousNerveKneePain: ArticleExport = {
  cta: "",
  article: {
    slug: "saphenous-nerve-knee-pain",
    title: "Saphenous Nerve Knee Pain: Inner-Knee Burning, Numbness, and Entrapment",
    subtitle: "How saphenous nerve distribution, surgery, scars, and nearby structures shape medial knee symptoms",
    intro:
      "A burning strip along the inner knee can feel too superficial to be joint pain and too precise to be an ordinary muscle ache. Clothing may irritate it, a light touch may feel sharp, or a small patch near a scar may seem numb and painful at the same time. The saphenous nerve is a sensory nerve that travels down the inner thigh and knee. Its main trunk and small infrapatellar branch can be irritated by pressure, stretch, injury, or surgery, but they are not the only explanations for pain on the inside of the knee.",
    metaTitle: "Saphenous Nerve Knee Pain: Burning & Numbness",
    metaDescription:
      "Saphenous nerve pain can cause inner-knee burning, numbness, and touch sensitivity. See its distribution, causes, tests, treatment, and warning signs.",
    heroImage,
    publishedDate: "July 30, 2026",
    lastUpdated: "July 30, 2026",
    nextSlug: "knee-numbness-guide",
    nextTitle: "Knee Numbness by Location",
    seoTags:
      "saphenous nerve pain, saphenous nerve entrapment, saphenous nerve distribution, inner knee burning, medial knee numbness, infrapatellar branch saphenous nerve, saphenous neuralgia, knee scar nerve pain",
    faqs: [
      {
        question: "What does saphenous nerve pain at the knee feel like?",
        answer:
          "It may feel burning, electric, prickling, numb, or unusually sensitive to light touch. Symptoms are usually on the inner knee, inner shin, or near the lower and inner edge of the kneecap. The exact area varies because the nerve branches differ among people."
      },
      {
        question: "Can saphenous nerve entrapment cause knee weakness?",
        answer:
          "The saphenous nerve is sensory, so an isolated lesion should not directly weaken knee or ankle muscles. Apparent weakness may come from pain inhibition, another nerve problem, a lumbar root problem, or a joint injury and needs broader assessment."
      },
      {
        question: "Can knee surgery injure the infrapatellar branch?",
        answer:
          "Yes. The infrapatellar branch crosses an area used for several knee incisions and graft-harvest procedures. Numbness near a scar is relatively common, while persistent painful neuroma or disabling neuralgia is less common."
      },
      {
        question: "How is saphenous nerve entrapment diagnosed?",
        answer:
          "Diagnosis is clinical and may include sensory mapping, scar examination, joint and tendon tests, ultrasound, electrodiagnostic testing in selected cases, and a carefully performed diagnostic local anesthetic block. No single test is perfect."
      },
      {
        question: "Does saphenous nerve pain go away?",
        answer:
          "Some pressure or traction injuries settle with time and removal of the trigger. Recovery is less predictable when there is a neuroma, scar entrapment, ongoing compression, or another pain source. Treatment should match the identified cause."
      }
    ],
    content: (
      <>
        <div className="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Quick answer</p>
          <p className="mb-0 text-slate-700">
            <strong>Saphenous nerve irritation can cause burning, tingling, numbness, or touch sensitivity along the inner knee and shin.</strong> The infrapatellar branch may produce a smaller patch beside or below the kneecap, especially after surgery or a direct injury. Because the nerve is sensory, true muscle weakness points to another or additional problem. Persistent scar pain, spreading numbness, a swollen joint, or any new weakness deserves clinical assessment.
          </p>
        </div>

        <p>
          "Saphenous neuralgia" is a technical term for saphenous nerve pain. A map of the nerve's distribution can help describe where symptoms occur, but a map is not a diagnosis. Small sensory branches vary, and tendon, bursa, meniscus, arthritis, and lumbar nerve problems can overlap the same inner-knee territory.
        </p>

        <h2>Where the Saphenous Nerve Travels</h2>
        <figure className="my-8">
          <img src={branchMap} alt="Diagram of the saphenous nerve and infrapatellar branch along the inner knee" loading="lazy" />
          <figcaption>The main saphenous nerve continues toward the inner shin, while the infrapatellar branch crosses toward the front of the knee.</figcaption>
        </figure>
        <p>
          The saphenous nerve is the longest sensory branch of the femoral nerve. It travels through the thigh near the femoral vessels, passes through the adductor canal, and becomes more superficial near the inner knee. It then divides into branches that supply skin around the medial knee, lower leg, and sometimes the inner ankle and foot.
        </p>
        <p>
          The infrapatellar branch leaves the main nerve near the knee and crosses toward the region below and beside the kneecap. Its course is variable. That variability helps explain why one person's numb patch sits just below an incision while another person's extends across the front-inner knee.
        </p>
        <p>
          A sensory nerve carries information such as touch, temperature, and pain. It does not directly command the quadriceps or ankle muscles. A painful knee may feel unreliable because a person avoids loading it, but measurable muscle weakness, foot drop, or a major reflex change is not explained by an isolated saphenous neuropathy.
        </p>

        <h2>Saphenous Nerve Distribution and Typical Symptoms</h2>
        <div className="my-8 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[920px] border-collapse text-left text-sm">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="px-5 py-4 font-semibold">Area or symptom</th>
                <th className="px-5 py-4 font-semibold">Possible nerve pattern</th>
                <th className="px-5 py-4 font-semibold">Common alternative</th>
                <th className="px-5 py-4 font-semibold">Useful clue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Inner knee burning</td>
                <td className="px-5 py-4 text-slate-600">Main saphenous nerve or a medial branch</td>
                <td className="px-5 py-4 text-slate-600">Pes anserine irritation, medial joint pain</td>
                <td className="px-5 py-4 text-slate-600">Skin sensitivity and electric quality favor nerve involvement</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Patch beside or below kneecap</td>
                <td className="px-5 py-4 text-slate-600">Infrapatellar branch</td>
                <td className="px-5 py-4 text-slate-600">Patellar tendon or fat-pad pain</td>
                <td className="px-5 py-4 text-slate-600">Numbness near a scar makes the branch more relevant</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Inner-shin numbness</td>
                <td className="px-5 py-4 text-slate-600">Sartorial branch or main saphenous nerve</td>
                <td className="px-5 py-4 text-slate-600">Lumbar root or generalized neuropathy</td>
                <td className="px-5 py-4 text-slate-600">A narrow medial sensory strip may fit the nerve</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Pain with light touch</td>
                <td className="px-5 py-4 text-slate-600">Allodynia from nerve irritation or neuroma</td>
                <td className="px-5 py-4 text-slate-600">Skin disorder or complex regional pain</td>
                <td className="px-5 py-4 text-slate-600">A small trigger point can send symptoms along the branch</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Symptoms may be constant or triggered by kneeling, tight clothing, a brace, running, prolonged knee flexion, or touching a scar. Burning and numbness can coexist because an injured nerve can transmit abnormal pain signals while normal sensation is reduced.
        </p>

        <h2>What Causes Saphenous Nerve Pain?</h2>
        <h3>Compression in the adductor canal</h3>
        <p>
          The nerve can be irritated where it travels through the adductor canal in the thigh. Athletic overuse, local anatomy, fascial pressure, and repeated hip or knee motion have been proposed as contributors. Symptoms can extend from the inner thigh or knee into the medial shin. This pattern is uncommon and can be confused with muscle, tendon, or lumbar pain.
        </p>
        <h3>Knee surgery and graft harvest</h3>
        <p>
          The infrapatellar branch is vulnerable during arthroscopy portals, total knee replacement, anterior cruciate ligament reconstruction, and hamstring tendon harvest. A numb patch after an incision does not automatically mean a dangerous complication. Many small sensory changes become less noticeable with time. Persistent focal burning, a shock-like response when the scar is tapped, or severe touch sensitivity raises concern for scar entrapment or a neuroma.
        </p>
        <h3>Direct trauma and prolonged pressure</h3>
        <p>
          A fall onto the inner knee, a blow during sport, tight equipment, or prolonged kneeling can irritate superficial branches. Swelling from a nearby injury may create secondary pressure. The nerve can also be stretched during a larger knee injury even when it is not cut.
        </p>
        <h3>Neuroma</h3>
        <p>
          A neuroma is disorganized nerve healing at an injured end or branch. It may create a very focal trigger point that sends burning or electric pain into the nerve's territory. Imaging can sometimes identify it, but the diagnosis still depends on whether the location and provoked symptoms match.
        </p>

        <h2>Saphenous Nerve Pain vs. Other Inner-Knee Problems</h2>
        <figure className="my-8">
          <img src={differentialMap} alt="Comparison of nerve, tendon, bursa, joint, and urgent inner-knee symptom patterns" loading="lazy" />
          <figcaption>The quality of the symptom and the structures that reproduce it matter as much as the location.</figcaption>
        </figure>
        <p>
          Medial meniscus and arthritis symptoms are often deeper, linked with weight bearing, and may include swelling, stiffness, catching, or loss of motion. Pes anserine pain is usually tender several centimeters below the inner joint line and is commonly aggravated by stairs or resisted hamstring work. Medial collateral ligament pain often follows a side force and may be reproduced by ligament stress.
        </p>
        <p>
          Nerve pain is more likely when light touch, clothing, or scar pressure causes burning, pins and needles, or an electric streak. Even then, coexistence is possible. A person can have knee osteoarthritis and a painful infrapatellar neuroma after surgery. Our <Link to="/guides/knee-pain-locations-visual-guide" className={linkClass}>knee pain location guide</Link> provides a broader joint map, while the <Link to="/guides/burning-sensation-in-knee" className={linkClass}>burning knee guide</Link> compares nerve and non-nerve causes.
        </p>

        <h2>How Clinicians Evaluate Suspected Entrapment</h2>
        <p>
          The history should establish the exact start date, surgery or injury timeline, symptom quality, sensory territory, movement triggers, and whether back, hip, or generalized nerve symptoms are present. Examination maps light touch and pin sensation, checks scars, looks for a focal Tinel-like response when the nerve is tapped, and assesses joint, tendon, ligament, strength, and reflex findings.
        </p>
        <p>
          Ultrasound can follow a superficial nerve, identify focal enlargement, and look for a neuroma, scar tethering, cyst, or other mass. MRI may be used to evaluate deeper soft tissues or an alternative knee diagnosis. Standard nerve conduction studies can be technically challenging for small saphenous branches, so a normal study does not exclude every focal lesion.
        </p>
        <p>
          A diagnostic local anesthetic block may support the diagnosis when accurately placed relief matches the expected territory. Relief is not automatically proof that surgery will work, and an injection should be performed by an appropriately trained clinician. Recent diagnostic research supports combining examination, ultrasound, electrodiagnostic information, and selective blocks rather than relying on one finding.
        </p>

        <h2>What Treatment Can Help?</h2>
        <h3>Remove the mechanical trigger</h3>
        <p>
          Avoid repeated pressure over the tender branch. Adjust straps, braces, clothing, kneeling surfaces, and work positions. If symptoms appeared after a brace or postoperative dressing, contact the treating team before changing prescribed protection. A small change in contact pressure can matter more than a general rest period.
        </p>
        <h3>Rehabilitation and desensitization</h3>
        <p>
          Physical therapy may address mobility, strength, gait, and the activity that keeps provoking the area. Graded desensitization uses tolerable textures and touch to reduce an exaggerated protective response around a healed scar. It should be gentle and progressive. Repeated hard rubbing or pressing on a suspected neuroma can aggravate it.
        </p>
        <h3>Medicines and procedures</h3>
        <p>
          Medication choices depend on health history and whether pain is neuropathic, inflammatory, or mixed. A clinician may consider topical or oral options, image-guided injection, hydrodissection in selected cases, radiofrequency-based procedures, or surgery for confirmed entrapment or neuroma. Evidence quality and availability vary, and procedure choice should follow a clear diagnosis.
        </p>
        <h3>Surgery</h3>
        <p>
          Surgery may release a trapped nerve, remove or manage a painful neuroma, or relocate the nerve end. It is usually reserved for persistent disabling symptoms with a reproducible focal source and supportive diagnostic findings. Potential tradeoffs include continued numbness, scar sensitivity, incomplete relief, or recurrent nerve pain.
        </p>

        <h2>What Recovery May Look Like</h2>
        <p>
          A temporary compression injury may improve as swelling and pressure settle. Small postoperative numb areas may shrink or become less intrusive over months. Painful scar entrapment and neuroma symptoms can be more persistent. Nerve recovery is often uneven: burning may ease before normal touch returns, or numbness may remain after pain improves.
        </p>
        <p>
          Track the boundaries of the numb area, touch sensitivity, sleep disruption, walking tolerance, and the activities that trigger a flare. Repeatedly testing the most sensitive spot is not useful progress monitoring. A simple weekly map is more informative than checking it every hour.
        </p>

        <h2>When to Get Medical Help</h2>
        <div className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="mb-0 text-slate-700">
            Arrange an assessment for persistent or spreading inner-knee numbness, severe scar sensitivity, recurrent electric pain, symptoms after surgery, or pain that limits sleep and walking. Seek prompt care for new muscle weakness, a rapidly swollen or hot red knee, fever, major trauma, calf swelling with breathing difficulty, or a cold pale foot. Those findings are not explained by a simple isolated saphenous sensory irritation.
          </p>
        </div>

        <h2>The Bottom Line</h2>
        <p>
          Saphenous nerve pain is a plausible cause of burning, numbness, and touch sensitivity along the inner knee, inner shin, or infrapatellar region. The nerve's sensory role and variable distribution explain why symptoms can feel superficial and why true weakness suggests another diagnosis.
        </p>
        <p>
          The most reliable approach is to map the symptoms, compare joint and tendon patterns, review any surgery or scar, and use targeted testing when needed. Treatment ranges from removing pressure and graded rehabilitation to specialist procedures for a confirmed focal entrapment or neuroma.
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
        title: "Saphenous Nerve Injuries: A Review of the Literature",
        publisher: "PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/38294640/"
      },
      {
        title: "Saphenous Nerve Neuropathy After Knee Surgery: A Systematic Review",
        publisher: "PubMed Central",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11962285/"
      },
      {
        title: "Diagnostics of Infrapatellar Saphenous Neuralgia",
        publisher: "PubMed Central",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8330472/"
      },
      {
        title: "Diagnosis and Treatment of the Saphenous Nerve Entrapment",
        publisher: "PubMed Central",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6394177/"
      }
    ]
  }
};

import { Link } from "react-router-dom";
import type { ArticleExport } from "./types";
import heroImage from "@/assets/guide-thumbnails/wave-3/osgood-schlatter-adults.webp";
import locationMap from "@/assets/article-diagrams/wave-3/osgood-location-map.svg";
import decisionPath from "@/assets/article-diagrams/wave-3/osgood-decision-path.svg";

const linkClass = "font-medium text-primary underline underline-offset-4 hover:text-primary/80";

export const osgoodSchlatterAdults: ArticleExport = {
  cta: "",
  article: {
    slug: "osgood-schlatter-adults",
    title: "Osgood-Schlatter in Adults: Why the Bump Below the Knee Can Still Hurt",
    subtitle: "Persistent tibial tubercle pain, ossicles, kneeling discomfort, imaging, and treatment options",
    intro:
      "That hard bump below the kneecap may have been there since school sports and caused no trouble for years. Then kneeling on a hard floor, returning to running, or increasing squat volume makes the same spot tender again. Osgood-Schlatter disease starts while the tibial tubercle is still growing, but a prominent bump, residual ossicle, irritated bursa, or sensitive patellar tendon can remain relevant in adulthood. The location matters: adult pain at the bump is not automatically active Osgood-Schlatter disease, and pain beside or behind it may come from a different structure.",
    metaTitle: "Osgood-Schlatter in Adults: Bump, Pain & Treatment",
    metaDescription:
      "Why can an old Osgood-Schlatter bump hurt in adults? Compare tibial tubercle pain, ossicles, patellar tendon symptoms, imaging and treatment options.",
    heroImage,
    publishedDate: "July 30, 2026",
    lastUpdated: "July 30, 2026",
    nextSlug: "peroneal-nerve-compression-knee",
    nextTitle: "Peroneal Nerve Compression Near the Knee",
    seoTags:
      "Osgood Schlatter adults, adult Osgood Schlatter pain, bump below knee hurts, tibial tubercle pain adult, Osgood Schlatter ossicle, painful knee bump kneeling, unresolved Osgood Schlatter disease, tibial tuberosity pain",
    faqs: [
      {
        question: "Can Osgood-Schlatter disease still hurt in adults?",
        answer:
          "Yes. The original growth-plate irritation is no longer active after skeletal maturity, but a prominent tibial tubercle, residual ossicle, local bursa, or patellar tendon irritation can remain painful. Persistent adult symptoms are less common than a painless bump."
      },
      {
        question: "Why does the bump below my knee hurt when kneeling?",
        answer:
          "Direct pressure can irritate the prominent tibial tubercle, an overlying bursa, or a residual ossicle near the patellar tendon. A padded surface may reduce pressure, but recurring focal pain deserves assessment if it limits work, exercise, or ordinary kneeling."
      },
      {
        question: "Does an adult Osgood-Schlatter bump need an MRI?",
        answer:
          "Not always. A clinician may begin with examination and plain X-rays. MRI can be useful when symptoms are persistent, the diagnosis is uncertain, or the relationship between an ossicle, patellar tendon, bursa, and surrounding tissues needs clarification."
      },
      {
        question: "Can the Osgood-Schlatter bump be removed?",
        answer:
          "Surgery is uncommon and is generally considered only for a skeletally mature person with clearly localized, persistent symptoms that have not improved with appropriate nonsurgical care. The operation and expected benefit depend on the exact anatomy."
      },
      {
        question: "Is adult Osgood-Schlatter pain the same as patellar tendinopathy?",
        answer:
          "No. They can overlap, but patellar tendinopathy more often involves the tendon itself, commonly near the lower edge of the kneecap or along the tendon. Unresolved Osgood-Schlatter symptoms are usually most focal at the tibial tubercle or a residual ossicle below the knee."
      }
    ],
    content: (
      <>
        <div className="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Quick answer</p>
          <p className="mb-0 text-slate-700">
            <strong>Osgood-Schlatter disease begins during growth, but the bump it leaves can remain tender in adulthood.</strong> Adult pain is usually linked with direct pressure on a prominent tibial tubercle, a residual bone fragment called an ossicle, irritation where the patellar tendon attaches, or a local bursa. A painless bump needs no treatment. Persistent focal pain, swelling, loss of motion, or pain after a new injury should be assessed rather than assumed to be an old growth problem.
          </p>
        </div>

        <p>
          The tibial tubercle is the bony attachment point for the patellar tendon at the top of the shin. During adolescence, repeated pulling from running and jumping can irritate the growth area at this attachment. That is the classic Osgood-Schlatter pattern. Once growth is complete, the growth plate closes, but the shape of the tubercle does not necessarily return to its pre-adolescent contour.
        </p>
        <p>
          This is why an adult can have a very obvious bump without active disease. The bump may simply be a stable reminder of adolescence. The clinically useful question is not whether the bump exists, but whether pain is precisely reproduced there and whether imaging shows a structure that matches the symptoms.
        </p>

        <h2>What Can Remain After Osgood-Schlatter Disease?</h2>
        <figure className="my-8">
          <img src={locationMap} alt="Front-knee diagram locating the tibial tubercle bump below the kneecap" loading="lazy" />
          <figcaption>The tibial tubercle sits below the kneecap at the lower attachment of the patellar tendon.</figcaption>
        </figure>
        <p>
          Most people become symptom-free by skeletal maturity. A thickened or prominent tibial tubercle may remain, usually without causing a problem. In a smaller group, symptoms continue or return because a fragment did not fully unite, the distal patellar tendon rubs against the prominence, or direct pressure irritates the tissues over the bump.
        </p>
        <p>
          A residual ossicle is a small piece of bone within or near the patellar tendon attachment. Its presence on an X-ray does not prove that it is painful. Some adults have an ossicle and no symptoms. Focal tenderness, pain during resisted knee extension, and a matching imaging finding make the connection more plausible.
        </p>
        <p>
          Pain below the kneecap can also come from the patellar tendon, a deep infrapatellar bursa, the fat pad, or the upper tibia. Our broader guide to <Link to="/guides/below-knee-discomfort-teens-adults" className={linkClass}>below-knee discomfort in teens and adults</Link> compares these locations without treating every bump as Osgood-Schlatter disease.
        </p>

        <h2>Adult Osgood-Schlatter Symptoms vs. Similar Problems</h2>
        <div className="my-8 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="px-5 py-4 font-semibold">Pattern</th>
                <th className="px-5 py-4 font-semibold">Most typical location</th>
                <th className="px-5 py-4 font-semibold">Common trigger</th>
                <th className="px-5 py-4 font-semibold">Useful clue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Persistent Osgood-Schlatter symptoms</td>
                <td className="px-5 py-4 text-slate-600">Directly over the tibial tubercle bump</td>
                <td className="px-5 py-4 text-slate-600">Kneeling, running, jumping, squats, direct impact</td>
                <td className="px-5 py-4 text-slate-600">Old history plus focal tenderness at the bump or ossicle</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Patellar tendinopathy</td>
                <td className="px-5 py-4 text-slate-600">Tendon below the kneecap, sometimes extending downward</td>
                <td className="px-5 py-4 text-slate-600">Jumping, sprinting, repeated acceleration</td>
                <td className="px-5 py-4 text-slate-600">Tendon-loading pain is more prominent than pressure on the bump</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Infrapatellar bursitis</td>
                <td className="px-5 py-4 text-slate-600">Soft tissue over or just below the tendon</td>
                <td className="px-5 py-4 text-slate-600">Prolonged kneeling and repeated surface pressure</td>
                <td className="px-5 py-4 text-slate-600">Local puffiness or pressure sensitivity may dominate</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Patellofemoral pain</td>
                <td className="px-5 py-4 text-slate-600">Around or behind the kneecap</td>
                <td className="px-5 py-4 text-slate-600">Stairs, prolonged sitting, squats</td>
                <td className="px-5 py-4 text-slate-600">Pain is not limited to the tibial tubercle</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Acute tibial tubercle injury</td>
                <td className="px-5 py-4 text-slate-600">Top of the shin after a sudden force</td>
                <td className="px-5 py-4 text-slate-600">Jump, fall, direct blow, forceful contraction</td>
                <td className="px-5 py-4 text-slate-600">Sudden pain, swelling, weakness, or inability to straighten the knee</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Why It May Start Hurting Again Years Later</h2>
        <p>
          A new workload often exposes a previously quiet pressure point. Returning to basketball, adding hill running, increasing squat depth, or starting a job that involves kneeling can raise tendon force or direct contact at the tubercle. A change in symptoms does not mean the growth plate has reopened. It means the adult tissues around an old prominence may be handling more load than before.
        </p>
        <p>
          Weight gain, reduced quadriceps capacity after inactivity, tight or poorly tolerated training volume, and a recent blow to the bump can all change local sensitivity. These are reasons to review load and function, not proof that the ossicle must be removed.
        </p>
        <p>
          If kneeling is the main trigger, compare the pattern with our guide to <Link to="/guides/knee-pain-when-kneeling" className={linkClass}>knee pain when kneeling</Link>. Pain in front of the kneecap, at the tendon, and at the tibial tubercle responds to pressure differently.
        </p>
        <h3>Why the Osgood-Schlatter bump itself may look larger</h3>
        <p>
          A large bump is not necessarily a sign that the condition is getting worse. The contour may have formed during adolescence and become more noticeable as body composition changes or the soft tissue over it becomes thinner. Local swelling after kneeling or sport can temporarily make the area look more prominent. A genuinely enlarging mass, however, is not something to label from appearance alone.
        </p>
        <p>
          Search phrases such as "Osgood Schlatter bump in adults" often mix three different questions: whether the bump is dangerous, whether it can be flattened, and whether it explains current pain. A stable painless prominence is usually benign. Cosmetic removal is not routine. When pain is present, treatment should target the tissue reproducing the symptom rather than the shape alone.
        </p>

        <h2>How Adult Tibial Tubercle Pain Is Evaluated</h2>
        <figure className="my-8">
          <img src={decisionPath} alt="Decision guide for a painless bump, recurring focal pain, and urgent symptoms after a new injury" loading="lazy" />
          <figcaption>A stable painless bump, recurring focal tenderness, and an acute injury require different responses.</figcaption>
        </figure>
        <p>
          Examination usually includes the exact location of tenderness, the size and sensitivity of the bump, knee motion, swelling, patellar tendon loading, quadriceps strength, and the ability to squat, step, or kneel. The clinician will also ask whether symptoms have been present continuously since adolescence or appeared after a new injury.
        </p>
        <p>
          Plain X-rays can show a prominent tubercle, separated ossicle, prior fragmentation, or another bone problem. MRI is not automatically required, but it can help when pain persists, the diagnosis is uncertain, or the relationship between an ossicle, tendon, bursa, and surrounding tissue will change treatment. Ultrasound can assess the tendon and superficial soft tissues in selected cases.
        </p>
        <p>
          Imaging findings need clinical correlation. A fragment that looks impressive but is not tender may be incidental. Conversely, new night pain, a growing mass, fever, or unexplained swelling does not fit an ordinary unresolved Osgood-Schlatter pattern and needs a broader assessment.
        </p>

        <h2>What Usually Helps First?</h2>
        <p>
          Start by reducing the specific aggravator rather than stopping all movement. A short reduction in jumping volume, deep knee flexion, or direct kneeling may settle the area while maintaining comfortable cycling, walking, or upper-body training. A cushioned kneeling pad can reduce contact pressure at work and home.
        </p>
        <p>
          Progressive quadriceps and lower-limb strengthening can improve how the knee handles load. The correct starting exercise depends on which movement reproduces symptoms. Isometric knee-extension work, controlled squats within a tolerated range, hip strengthening, and gradual return to running may be used in rehabilitation, but none should be presented as a universal protocol for an undiagnosed painful bump.
        </p>
        <p>
          Pain relief options depend on medical history and should follow a clinician or pharmacist's advice. Repeated injections into or around the patellar tendon are not a casual home solution. Recent reviews still find limited and mixed evidence for injection approaches in Osgood-Schlatter disease.
        </p>
        <h3>A practical way to adjust training without losing all activity</h3>
        <p>
          Identify the movement that causes the clearest focal pain and change one variable at a time. A runner might reduce hills or speed before reducing easy mileage. A strength athlete might shorten squat depth, lower total sets, or temporarily replace loaded kneeling positions. Someone whose symptoms come only from floor contact may need padding and shorter kneeling intervals rather than a complete exercise break.
        </p>
        <p>
          Track the response during the activity and again the next morning. Mild discomfort that settles quickly is different from a progressive increase in tenderness, swelling, or altered walking. The useful goal is a workload the area can recover from, followed by small planned increases. Randomly testing the painful movement every few hours can keep the spot irritated and makes progress harder to judge.
        </p>
        <h3>Can stretching make the bump go away?</h3>
        <p>
          Stretching cannot remove a mature bony prominence or unite a residual ossicle. Mobility work may still help if limited hip, ankle, or thigh motion changes how a person squats, runs, or kneels, but it should not be sold as a way to dissolve bone. Aggressive quadriceps stretching that pulls directly through a painful patellar tendon attachment may aggravate symptoms.
        </p>
        <p>
          A rehabilitation plan is more useful when it includes strength, activity tolerance, and the exact demands of work or sport. Flexibility is one possible component, not the diagnosis and not the entire treatment.
        </p>

        <h2>When Is Surgery Considered in Adults?</h2>
        <p>
          Surgery is reserved for selected skeletally mature people with persistent, clearly localized symptoms that continue despite appropriate nonsurgical care. Imaging may show an ossicle within or behind the patellar tendon, impingement, or a prominent tubercle that matches pain during kneeling and activity.
        </p>
        <p>
          Procedures vary. They may remove an ossicle, smooth a prominence, address an irritated bursa, or repair the tendon when necessary. Evidence comes mainly from case series and small studies rather than large comparative trials. A surgical consultation should therefore discuss the certainty of the pain source, scar sensitivity, tendon protection, rehabilitation, and the possibility of residual symptoms.
        </p>
        <p>
          The decision is usually stronger when several pieces agree: pain is consistently focal, ordinary kneeling or sport remains limited, a structured nonsurgical plan has been tried, and imaging shows an ossicle or prominence in the same location. Surgery is a weaker proposition when pain is diffuse, imaging findings are incidental, or symptoms are mainly around the kneecap rather than at the tubercle.
        </p>

        <h2>Osgood-Schlatter Treatment Questions Adults Often Ask</h2>
        <h3>Will a knee strap help?</h3>
        <p>
          A patellar tendon strap changes local pressure and may make some loaded activities feel more comfortable. It does not remove an ossicle or permanently change the bump. It is reasonable to stop using it if it increases pressure directly over the tender area, causes numbness, or merely allows a workload that produces a larger flare later.
        </p>
        <h3>Can adults return to running and squats?</h3>
        <p>
          Many can, provided the current pain source has been identified and load is rebuilt gradually. The presence of a bump is not itself a ban on running or resistance training. A return plan should consider current strength, movement tolerance, next-day symptoms, and whether direct contact or tendon force is the bigger trigger.
        </p>
        <h3>Does every ossicle need removal?</h3>
        <p>
          No. Residual ossicles can be incidental. Removing a structure that does not match the pain pattern may not solve the problem and still creates surgical recovery demands. Clinical tenderness and symptom reproduction should lead the interpretation of imaging, not the other way around.
        </p>

        <h2>When to Get Medical Help</h2>
        <div className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="mb-0 text-slate-700">
            Arrange an assessment when focal tibial tubercle pain keeps returning, limits kneeling or sport, or has not improved after a sensible reduction in aggravating load. Seek prompt care after a new injury if you cannot straighten the knee or bear weight, or if swelling is rapid. A hot red knee with fever, an enlarging unexplained lump, severe night pain, or progressive weakness also needs medical evaluation.
          </p>
        </div>

        <h2>The Bottom Line</h2>
        <p>
          Osgood-Schlatter disease does not usually remain an active growth-plate disorder in adulthood. What can remain is the anatomy it created: a prominent tibial tubercle, residual ossicle, and a pressure-sensitive patellar tendon attachment. A painless bump is common and does not need treatment.
        </p>
        <p>
          When the bump hurts, map the exact trigger and compare it with tendon, bursa, kneecap, and acute bone-injury patterns. Most adults begin with load adjustment, pressure protection, and progressive rehabilitation. Imaging and surgery are reserved for symptoms that are persistent, focal, and matched to a treatable structure.
        </p>
      </>
    ),
    sources: [
      {
        title: "Osgood-Schlatter Disease (Knee Pain)",
        publisher: "American Academy of Orthopaedic Surgeons",
        url: "https://orthoinfo.aaos.org/en/diseases--conditions/osgood-schlatter-disease-knee-pain"
      },
      {
        title: "Osgood-Schlatter Disease",
        publisher: "NCBI Bookshelf",
        url: "https://www.ncbi.nlm.nih.gov/books/NBK441995/"
      },
      {
        title: "Osgood Schlatter's Disease and Sinding-Larsen-Johannson Syndrome",
        publisher: "NHS Tayside",
        url: "https://www.rightdecisions.scot.nhs.uk/nhs-tayside-refguide/surgery-and-orthopaedics/orthopaedic-and-trauma-surgery/knee/patello-femoral-joint-dysfunction-anterior-knee-pain/osgood-schlatters-disease-sinding-larsen-johannson-syndrome/"
      },
      {
        title: "Treatments for Osgood Schlatter Disease: A Systematic Review of the Literature",
        publisher: "PubMed Central",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12957582/"
      },
      {
        title: "Apophysitis of the Tibial Tuberosity (Osgood-Schlatter Disease): A Review",
        publisher: "PubMed Central",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5063719/"
      }
    ]
  }
};

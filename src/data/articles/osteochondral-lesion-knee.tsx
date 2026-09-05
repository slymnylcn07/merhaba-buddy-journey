import { Link } from "react-router-dom";
import type { ArticleExport } from "./types";
import heroImage from "@/assets/guide-thumbnails/wave-3/osteochondral-lesion-knee.webp";
import depthMap from "@/assets/article-diagrams/wave-3/osteochondral-depth.svg";
import treatmentFactors from "@/assets/article-diagrams/wave-3/osteochondral-treatment-factors.svg";

const linkClass = "font-medium text-primary underline underline-offset-4 hover:text-primary/80";

export const osteochondralLesionKnee: ArticleExport = {
  cta: "",
  article: {
    slug: "osteochondral-lesion-knee",
    title: "Osteochondral Lesions of the Knee: Cartilage and Bone Injury",
    subtitle: "Symptoms, MRI findings, lesion stability, osteochondritis dissecans, treatment options, and recovery",
    intro:
      "A knee can keep swelling after a twist even when the major ligaments look intact. It may ache deeply with impact, catch during motion, or feel unreliable without a dramatic injury story. One possible explanation is an osteochondral lesion, an area where the smooth joint cartilage and the supporting bone beneath it are both affected. The term covers several causes and severities, so the useful questions are where the lesion sits, how large and stable it is, whether a fragment is loose, and whether it actually matches the symptoms.",
    metaTitle: "Osteochondral Lesion of the Knee: Symptoms & Treatment",
    metaDescription:
      "Understand knee osteochondral lesions and defects, cartilage and bone injury, MRI stability, osteochondritis dissecans, treatment, surgery, and recovery.",
    heroImage,
    publishedDate: "July 30, 2026",
    lastUpdated: "July 30, 2026",
    seoTags:
      "osteochondral lesion knee, osteochondral defect knee, knee cartilage injury, cartilage lesion knee, osteochondritis dissecans knee, knee cartilage and bone defect, loose body knee, osteochondral fracture",
    faqs: [
      {
        question: "What is an osteochondral lesion of the knee?",
        answer:
          "It is an area of damage involving articular cartilage and the subchondral bone beneath it. The lesion may follow trauma, develop through osteochondritis dissecans, or occur with other joint disease. Size, location, depth, and stability vary."
      },
      {
        question: "What does an osteochondral lesion feel like?",
        answer:
          "Symptoms may include deep activity-related pain, recurrent swelling, catching, locking, loss of motion, or reduced confidence in the knee. Small stable lesions can be asymptomatic, so imaging must be matched to the clinical pattern."
      },
      {
        question: "Can an osteochondral knee lesion heal without surgery?",
        answer:
          "Some stable lesions, especially in people who are still growing, can improve with activity modification and monitored rehabilitation. Healing potential is lower for some adult lesions, unstable fragments, displaced pieces, and larger defects."
      },
      {
        question: "Is an osteochondral lesion the same as osteochondritis dissecans?",
        answer:
          "No. Osteochondral lesion is a broad descriptive term. Osteochondritis dissecans is a specific condition affecting subchondral bone and overlying cartilage, often in a characteristic part of the femoral condyle. Trauma can create a different type of osteochondral injury."
      },
      {
        question: "Does an osteochondral defect always need surgery?",
        answer:
          "No. Treatment depends on symptoms, stability, size, location, age, growth status, activity goals, alignment, and other knee problems. Surgery is more likely for unstable or displaced lesions, loose bodies, persistent mechanical symptoms, or failure of appropriate nonsurgical care."
      }
    ],
    content: (
      <>
        <div className="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Quick answer</p>
          <p className="mb-0 text-slate-700">
            <strong>An osteochondral lesion affects both the smooth cartilage surface of the knee and the supporting bone underneath.</strong> It can cause deep pain, repeated swelling, catching, or locking, but some lesions found on MRI are incidental. Treatment depends on age, growth plates, cause, lesion size and location, fragment stability, symptoms, and activity goals. A locked knee, rapid swelling after injury, or inability to bear weight needs prompt assessment.
          </p>
        </div>

        <p>
          "Osteochondral lesion" and "osteochondral defect" describe a more specific finding than the broader term "knee cartilage injury." Not every cartilage injury reaches the underlying bone, and not every MRI defect causes pain.
        </p>

        <h2>What Does Osteochondral Mean?</h2>
        <figure className="my-8">
          <img src={depthMap} alt="Cross-section showing articular cartilage, subchondral bone, and an osteochondral defect involving both layers" loading="lazy" />
          <figcaption>Articular cartilage distributes load and glides over the subchondral bone that supports it.</figcaption>
        </figure>
        <p>
          "Chondral" refers to cartilage. "Osseous" refers to bone. An osteochondral lesion crosses the interface between articular cartilage and subchondral bone. This distinction matters because cartilage and bone have different healing biology. Bone has a blood supply and can remodel; adult articular cartilage has limited intrinsic repair capacity.
        </p>
        <p>
          A shallow chondral defect may involve cartilage alone. An osteochondral fracture can shear off cartilage with a piece of bone during trauma. Osteochondritis dissecans, often shortened to OCD, involves focal subchondral bone disease that can threaten the overlying cartilage and fragment stability. Osteoarthritis creates more diffuse cartilage and bone change rather than one isolated traumatic defect.
        </p>

        <h2>What Causes an Osteochondral Knee Lesion?</h2>
        <h3>Acute trauma</h3>
        <p>
          A patellar dislocation, hard twist, fall, or direct impact can damage the cartilage and bone. Patellar dislocation commonly affects the inner side of the kneecap and outer portion of the femoral trochlea or condyle as the kneecap leaves and returns to its groove. A fragment may remain attached, become unstable, or detach as a loose body.
        </p>
        <h3>Osteochondritis dissecans</h3>
        <p>
          OCD most commonly involves the lateral aspect of the medial femoral condyle. Its exact cause is not completely settled. Repetitive loading, local blood supply, genetics, and bone biology may contribute. Juvenile OCD occurs before growth plates close and generally has better healing potential than adult disease.
        </p>
        <h3>Repetitive overload and joint mechanics</h3>
        <p>
          Malalignment, meniscus deficiency, instability, and high repeated joint load can concentrate stress in one region. A cartilage-restoration procedure is less likely to succeed if the mechanical reason for overload is ignored. Surgeons may therefore evaluate limb alignment, ligament stability, meniscus function, and patellar tracking.
        </p>
        <h3>Other bone and cartilage conditions</h3>
        <p>
          Osteonecrosis, inflammatory disease, infection, and degenerative arthritis can affect subchondral bone or cartilage. These are not interchangeable with a focal traumatic lesion and may require very different treatment.
        </p>

        <h2>Common Symptoms</h2>
        <p>
          Deep pain with running, jumping, stairs, squatting, or prolonged weight bearing is common but nonspecific. Recurrent swelling after activity can be an important clue, especially after a known injury. Catching, locking, or a blocked range of motion raises concern for an unstable fragment or loose body.
        </p>
        <p>
          Some people describe a vague ache rather than a precise surface point. The location depends on the lesion. A femoral condyle defect may hurt with weight bearing, while a patellofemoral lesion may be more noticeable with stairs, squats, or prolonged sitting. A lesion can also coexist with a meniscus tear, ligament injury, or patellar instability.
        </p>
        <p>
          Imaging findings and symptoms do not always match. Small stable defects may not hurt. A large-looking MRI abnormality can be less relevant than another structure. Clinical examination should reproduce the functional pattern and assess swelling, motion, alignment, stability, and the rest of the joint.
        </p>

        <h2>Osteochondral Lesion, Defect, Fracture, and OCD</h2>
        <div className="my-8 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[940px] border-collapse text-left text-sm">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="px-5 py-4 font-semibold">Term</th>
                <th className="px-5 py-4 font-semibold">What it describes</th>
                <th className="px-5 py-4 font-semibold">Typical context</th>
                <th className="px-5 py-4 font-semibold">Key question</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Chondral lesion</td>
                <td className="px-5 py-4 text-slate-600">Cartilage surface damage</td>
                <td className="px-5 py-4 text-slate-600">Trauma, wear, focal overload</td>
                <td className="px-5 py-4 text-slate-600">How deep and symptomatic is it?</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Osteochondral lesion</td>
                <td className="px-5 py-4 text-slate-600">Cartilage plus subchondral bone</td>
                <td className="px-5 py-4 text-slate-600">Broad descriptive category</td>
                <td className="px-5 py-4 text-slate-600">What caused it and is it stable?</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Osteochondral fracture</td>
                <td className="px-5 py-4 text-slate-600">Traumatic cartilage-bone fragment</td>
                <td className="px-5 py-4 text-slate-600">Twist, impact, patellar dislocation</td>
                <td className="px-5 py-4 text-slate-600">Can the fragment be fixed?</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Osteochondritis dissecans</td>
                <td className="px-5 py-4 text-slate-600">Focal subchondral disorder with cartilage risk</td>
                <td className="px-5 py-4 text-slate-600">Youth or young adult, often medial condyle</td>
                <td className="px-5 py-4 text-slate-600">Are growth plates open and is it stable?</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>How Imaging Is Used</h2>
        <p>
          Plain X-rays can show an OCD lesion, displaced fragment, loose body, bone contour, alignment, and arthritis. Weight-bearing views give information about joint-space and load. A normal X-ray does not exclude a cartilage injury because cartilage is not directly visible.
        </p>
        <p>
          MRI is the main tool for evaluating cartilage, subchondral bone, bone marrow change, fluid around a fragment, cysts, and associated injuries. In OCD, MRI features can suggest stability, but interpretation is imperfect and differs between skeletally immature and mature knees. Arthroscopy provides direct visualization and probing but is an operation, not a first-line screening test.
        </p>
        <p>
          CT gives excellent bone detail and may help define a fragment or plan surgery. The chosen study should answer a management question. Repeating scans without a change in symptoms or treatment plan does not automatically improve care.
        </p>
        <p>
          For a broader explanation of why one test may be chosen before another, compare <Link to="/guides/knee-xray-vs-mri-vs-ultrasound" className={linkClass}>knee X-ray, MRI, and ultrasound</Link>. That guide explains what each modality can show without turning imaging into a self-ordering decision.
        </p>

        <h2>What Makes a Lesion Stable or Unstable?</h2>
        <p>
          A stable lesion remains attached and supported. An unstable lesion may be partly separated, surrounded by fluid, displaced, or mobile when probed. Instability matters because a loose or hinged fragment can damage the opposing surface and create mechanical symptoms.
        </p>
        <p>
          Size, depth, cystic change, subchondral bone quality, cartilage condition, and the person's skeletal maturity all influence healing. A teenager with open growth plates and a stable OCD lesion has a different prognosis from an adult with a displaced traumatic fragment.
        </p>

        <h2>Nonsurgical Treatment</h2>
        <p>
          Stable lesions without a displaced fragment may begin with a period of impact reduction, activity modification, and monitored rehabilitation. The plan may limit running, jumping, pivoting, or deep loaded flexion while maintaining safe strength and conditioning. Some patients need temporary weight-bearing restrictions, particularly when subchondral bone healing is a priority.
        </p>
        <p>
          Rehabilitation addresses motion, swelling, quadriceps function, hip and lower-limb strength, gait, and gradual return to load. Symptoms and follow-up imaging may both inform progression in OCD. A person should not use pain alone to decide that bone healing is complete.
        </p>
        <p>
          There is no supplement proven to restore a focal osteochondral defect. General nutrition, smoking avoidance, sleep, and management of bone-health issues support recovery but do not replace lesion-specific treatment. Our <Link to="/guides/knee-swelling-after-exercise" className={linkClass}>post-exercise knee swelling guide</Link> explains why repeated effusion is a reason to review the diagnosis rather than simply add more recovery tools.
        </p>

        <h2>When Surgery Is Considered</h2>
        <figure className="my-8">
          <img src={treatmentFactors} alt="Five factors guiding osteochondral lesion treatment: age, stability, size, location, and symptoms" loading="lazy" />
          <figcaption>No single operation is best for every osteochondral lesion.</figcaption>
        </figure>
        <p>
          Surgery is more likely when a fragment is unstable or displaced, a loose body causes locking, a repairable acute fragment is present, symptoms persist despite appropriate nonsurgical care, or lesion characteristics predict poor spontaneous healing. The procedure depends on the tissue available and the mechanical environment.
        </p>
        <h3>Fixation</h3>
        <p>
          A viable fragment with enough bone may be fixed back into place. This preserves the person's native cartilage surface when healing is possible. The surgeon may refresh the underlying bone and use bioabsorbable or metal fixation. Protection after surgery allows bone healing.
        </p>
        <h3>Drilling or marrow stimulation</h3>
        <p>
          Drilling can stimulate blood supply and healing in selected stable OCD lesions. Microfracture or other marrow-stimulation techniques create channels into bone so a repair clot fills a small defect. The resulting tissue is fibrocartilage rather than identical hyaline cartilage, and durability can be less predictable in larger or high-demand lesions.
        </p>
        <h3>Osteochondral autograft or allograft</h3>
        <p>
          Osteochondral autograft transfer moves small plugs of cartilage and bone from a lower-load area of the person's knee. Allograft uses donor tissue and can address larger defects without creating the same donor-site gap. Availability, graft fit, cost, incorporation, and rehabilitation differ.
        </p>
        <h3>Cell-based cartilage restoration</h3>
        <p>
          Autologous chondrocyte implantation and related techniques aim to restore larger cartilage surfaces in selected patients. They may require staged surgery and do not solve uncorrected instability, malalignment, or meniscus deficiency. Subchondral bone damage may also require bone grafting.
        </p>
        <h3>Correcting the environment</h3>
        <p>
          Alignment osteotomy, ligament reconstruction, meniscus treatment, or patellar-stability surgery may be combined with cartilage work when those factors caused overload. Treating the defect while leaving the same excessive pressure can undermine the result.
        </p>

        <h2>Recovery and Return to Activity</h2>
        <p>
          Recovery depends more on the procedure and lesion biology than on the incision size. Early goals often include swelling control, protected motion, and quadriceps activation. Weight-bearing may be limited for weeks after fixation, grafting, or marrow stimulation. Return to running, jumping, and pivoting can take many months.
        </p>
        <p>
          Progression should use milestones such as motion, absence of reactive swelling, strength symmetry, movement quality, and sport-specific tolerance. A calendar date alone is not enough. Repeated swelling the next day suggests the joint has not tolerated the current dose even if pain during exercise was mild.
        </p>
        <p>
          Outcomes vary with lesion size, location, age, previous surgery, body mass, smoking, alignment, meniscus status, and adherence to protection. Cartilage-restoration surgery can improve symptoms and function, but it does not make the knee biologically untouched.
        </p>

        <h2>When to Get Medical Help</h2>
        <div className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="mb-0 text-slate-700">
            Arrange an assessment for repeated swelling, deep activity pain that does not settle, catching, loss of motion, or symptoms after a patellar dislocation or significant twist. Seek prompt care if the knee is physically locked, you cannot bear weight, swelling is rapid after injury, or the joint is hot and red with fever. A loose fragment or acute osteochondral injury may need time-sensitive evaluation.
          </p>
        </div>

        <h2>The Bottom Line</h2>
        <p>
          An osteochondral lesion involves the cartilage surface and the supporting bone beneath it. The label includes traumatic fragments, focal defects, and osteochondritis dissecans, but those problems do not share one prognosis or one treatment.
        </p>
        <p>
          Symptoms, lesion stability, age, size, location, alignment, meniscus and ligament function, and activity goals guide care. Stable lesions may be monitored and rehabilitated. Unstable fragments, loose bodies, persistent mechanical symptoms, and selected larger defects may require surgery tailored to both the defect and the forces acting on it.
        </p>
        <p>
          If clicking is your main symptom without recurrent swelling or locking, compare it with our <Link to="/guides/knee-clicking-when-walking" className={linkClass}>knee clicking when walking guide</Link>. A sound alone is different from a mechanical block caused by a loose fragment.
        </p>
      </>
    ),
    sources: [
      {
        title: "Osteochondritis Dissecans",
        publisher: "American Academy of Orthopaedic Surgeons",
        url: "https://orthoinfo.aaos.org/diseases--conditions/osteochondritis-dissecans/"
      },
      {
        title: "Osteochondritis Dissecans of the Knee: Plain Language Summary",
        publisher: "American Academy of Orthopaedic Surgeons",
        url: "https://orthoinfo.aaos.org/globalassets/pdfs/osteochondritis-dissecans-of-the-knee-plain-language-summary_5-2-25.pdf"
      },
      {
        title: "Treatment of Adult Knee Osteochondral Lesions",
        publisher: "PubMed Central",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4300813/"
      },
      {
        title: "Osteochondritis Dissecans of the Knee: Diagnosis and Treatment",
        publisher: "PubMed Central",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4799442/"
      },
      {
        title: "Osteochondritis Dissecans of the Knee: Imaging, Instability, and Skeletal Maturity",
        publisher: "PubMed Central",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9900010/"
      }
    ]
  }
};

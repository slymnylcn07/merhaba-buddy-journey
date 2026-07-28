import { Link } from "react-router-dom";
import { InfoBox } from "@/components/ArticleCharts";
import type { ArticleExport } from "./types";

import heroImage from "@/assets/article-hero-pain-behind-kneecap.jpg";
import imgKneecapAnatomy from "@/assets/article-kneecap-anatomy-side.jpg";
import imgPressureBehind from "@/assets/article-pressure-behind-kneecap.jpg";
import imgRunnersMechanics from "@/assets/article-runners-knee-mechanics.jpg";
import imgStairsPressure from "@/assets/article-stairs-knee-pressure.jpg";
import imgSquattingCompression from "@/assets/article-squatting-knee-compression.jpg";

const faqs = [
  {
    question: "What causes pain behind the kneecap?",
    answer:
      "A common pattern is patellofemoral pain, which is felt around or behind the kneecap and is often aggravated by stairs, squats, running, or prolonged sitting. Other causes are possible, including tendon problems, osteoarthritis, plica irritation, cartilage injury, or an acute knee injury.",
  },
  {
    question: "Is pain behind the kneecap the same as patellofemoral pain syndrome?",
    answer:
      "Not always. Pain behind the kneecap is a symptom location. Patellofemoral pain is a clinical pattern diagnosed from the history and examination after considering other causes. The terms overlap, but location alone cannot confirm the diagnosis.",
  },
  {
    question: "Is runner's knee the same as PFPS?",
    answer:
      "Runner's knee is a broad informal term that is often used for patellofemoral pain, but it is not a precise diagnosis. Patellofemoral pain can affect runners and non-runners and may be triggered by stairs, squats, jumping, or prolonged sitting.",
  },
  {
    question: "Why does the area behind my kneecap hurt when bending?",
    answer:
      "Knee bending changes the contact area and force at the patellofemoral joint. A load-sensitive joint may become painful with deeper flexion, especially during squats, stairs, or sitting. The exact meaning depends on swelling, injury history, pain location, and mechanical symptoms.",
  },
  {
    question: "Can pain behind the kneecap happen after sitting?",
    answer:
      "Yes. Some people with patellofemoral pain notice discomfort after prolonged sitting with the knee bent, sometimes called the theater sign. Pain when first standing can also have other causes, so use the full symptom pattern rather than this sign alone.",
  },
  {
    question: "What helps patellofemoral pain?",
    answer:
      "Current guidance places education and progressive knee-targeted exercise, often combined with hip-targeted exercise, at the center of care. Taping, movement retraining, or prefabricated foot orthoses may help selected people after assessment. The plan should match the person's symptoms, capacity, and goals.",
  },
  {
    question: "Do I need a scan for kneecap pain?",
    answer:
      "Many patellofemoral pain cases are assessed from the history and physical examination without immediate imaging. A clinician may consider imaging when there was significant trauma, symptoms suggest another diagnosis, or the problem is not improving as expected.",
  },
  {
    question: "When should pain behind the kneecap be checked?",
    answer:
      "Arrange an assessment when pain persists, worsens, repeatedly limits activity, or occurs with swelling, locking, instability, or reduced movement. Seek urgent care after major injury, if you cannot bear weight, or if the knee is badly swollen, deformed, hot, and red with fever.",
  },
];

export const painBehindKneecap: ArticleExport = {
  cta: "pain-behind-kneecap",
  article: {
    slug: "pain-behind-kneecap",
    title: "Pain Behind the Kneecap: PFPS, Causes & What Helps",
    subtitle: "A symptom-based guide to patellofemoral pain, runner's knee, and other possibilities",
    intro:
      "Pain behind the kneecap is a location, not a diagnosis. The most common pattern is patellofemoral pain, sometimes called runner's knee, but tendon problems, osteoarthritis, plica irritation, cartilage injury, and acute trauma can produce overlapping symptoms. This guide explains how patellofemoral pain is recognized, which activity patterns matter, what evidence-based care usually includes, and when another cause should be considered.",
    metaTitle: "Pain Behind Kneecap: PFPS Causes & What Helps",
    metaDescription:
      "Understand pain behind the kneecap, PFPS and runner's knee, common triggers, other possible causes, evidence-based care, and warning signs.",
    heroImage,
    publishedDate: "March 8, 2026",
    lastUpdated: "July 28, 2026",
    nextSlug: "knee-pain-climbing-stairs",
    nextTitle: "Knee Pain When Climbing Stairs: Causes by Location",
    seoTags:
      "pain behind kneecap, pain behind knee cap, patellofemoral pain syndrome, PFPS, runner's knee, pain behind patella, kneecap pain bending, front knee pain, kneecap pain stairs, kneecap pain squatting",
    faqs,
    sources: [
      {
        title: "Patellofemoral Pain Syndrome",
        publisher: "American Academy of Orthopaedic Surgeons",
        url: "https://orthoinfo.aaos.org/en/diseases--conditions/patellofemoral-pain-syndrome/",
      },
      {
        title: "Best Practice Guide for Patellofemoral Pain",
        publisher: "British Journal of Sports Medicine via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/39401870/",
      },
      {
        title: "Patellofemoral Pain Clinical Practice Guideline",
        publisher: "APTA Orthopedics",
        url: "https://www.orthopt.org/content/s/patellofemoral-pain-2019",
      },
      {
        title: "Patellofemoral Joint Reaction Force Across Activities",
        publisher: "British Journal of Sports Medicine via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/35115309/",
      },
      {
        title: "Patellofemoral Joint Stress During Stair Ascent and Descent",
        publisher: "Gait & Posture via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/12297253/",
      },
      {
        title: "Knee Pain: Self-Care and When to Get Help",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/knee-pain/",
      },
    ],
    content: (
      <>
        <InfoBox title="Quick answer">
          <p>
            Pain around or behind the kneecap commonly fits a patellofemoral pain pattern, especially when stairs, squats, running, or prolonged sitting provoke it. PFPS is not diagnosed from location alone, and it is not simply proof of poor tracking or worn cartilage. Current best practice centers on education and progressive exercise tailored to the person, with other options added when appropriate.
          </p>
        </InfoBox>

        <h2>What “Behind the Kneecap” Actually Means</h2>
        <p>
          The kneecap, or patella, sits within the quadriceps tendon and glides along a groove at the end of the thigh bone as the knee bends and straightens. The patellofemoral joint is the contact between those surfaces. A person may describe discomfort as behind, under, around, or at the front of the kneecap even when the precise tissue source cannot be identified from symptoms alone.
        </p>

        <figure className="my-8">
          <img
            src={imgKneecapAnatomy}
            alt="Side-view anatomy of the kneecap and patellofemoral joint"
            className="h-auto w-full rounded-xl shadow-sm"
            loading="lazy"
          />
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">
            The patella glides within the femoral groove as the knee bends and straightens.
          </figcaption>
        </figure>

        <p>
          Loaded knee bending changes patellofemoral contact area and joint force. That helps explain why stairs, squats, running, jumping, and prolonged sitting can be provocative. It does not mean that a specific force number or knee angle can diagnose the cause of pain in an individual.
        </p>

        <h2>Patellofemoral Pain Syndrome and Runner’s Knee</h2>
        <p>
          Patellofemoral pain, often shortened to PFP or PFPS, is a clinical pattern of pain around or behind the kneecap that is commonly aggravated by activities that load a bent knee. Runner's knee is an informal label frequently used for the same pattern, although not every runner with knee pain has PFPS and many people with PFPS do not run.
        </p>
        <p>
          A clinician typically considers the history, the activities that reproduce symptoms, the location of pain, strength and movement capacity, and signs that might point to another diagnosis. PFPS is not confirmed by one tracking observation, one muscle test, or one scan finding.
        </p>

        <InfoBox title="Symptom Location vs Diagnosis">
          <p>
            “Pain behind the kneecap” describes where you feel it. “Patellofemoral pain” describes a clinical pattern after other important causes have been considered. The terms often overlap, but they are not automatically identical.
          </p>
        </InfoBox>

        <h2>Typical Patellofemoral Pain Pattern</h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>a dull or aching pain around or behind the kneecap</li>
          <li>pain with stairs, squats, running, jumping, or lunges</li>
          <li>discomfort after prolonged sitting with the knee bent</li>
          <li>symptoms that increase after a sudden change in training or activity</li>
          <li>clicking or grinding that may or may not be painful</li>
          <li>pain that is difficult to identify as one pinpoint spot</li>
        </ul>
        <p>
          Clicking without pain, swelling, locking, or loss of function can occur in healthy knees. Painful clicking paired with catching, true locking, instability, or swelling deserves more attention.
        </p>

        <figure className="my-8">
          <img
            src={imgPressureBehind}
            alt="Illustration of the patellofemoral contact area behind the kneecap"
            className="h-auto w-full rounded-xl shadow-sm"
            loading="lazy"
          />
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">
            Symptoms can be felt behind or around the kneecap even when the exact pain-generating tissue is uncertain.
          </figcaption>
        </figure>

        <h2>Other Causes of Pain in the Kneecap Area</h2>
        <p>
          Not every anterior-knee symptom is PFPS. The following patterns can overlap and may require an examination to separate them.
        </p>

        <h3>Patellar or quadriceps tendon pain</h3>
        <p>
          Tendon pain is often more localized just below or above the kneecap and may follow jumping, running, heavy squats, or a rapid increase in training. Pressing the tendon or loading it may reproduce the symptom more precisely than in diffuse PFPS.
        </p>

        <h3>Osteoarthritis</h3>
        <p>
          Gradual aching, stiffness, reduced movement, and symptoms across several daily activities may occur with osteoarthritis. Imaging changes do not always match pain severity, so the clinical pattern and function matter.
        </p>

        <h3>Plica or other soft-tissue irritation</h3>
        <p>
          A fold of joint lining or another soft-tissue structure can become irritated and produce pain near the kneecap, sometimes with a snapping or catching sensation. Persistent focal symptoms need assessment rather than a self-diagnosis of PFPS.
        </p>

        <h3>Cartilage or osteochondral injury</h3>
        <p>
          A significant impact, twist, swelling, catching, or a blocked knee can suggest an injury that needs a different pathway. Pain behind the kneecap after trauma should not be treated as routine runner's knee without evaluation.
        </p>

        <h3>Referred pain</h3>
        <p>
          Hip, back, or nerve-related problems can occasionally be felt around the knee. Numbness, tingling, weakness, or pain extending along the leg changes the assessment.
        </p>

        <h2>Activities That Commonly Expose the Pattern</h2>
        <h3>Going upstairs</h3>
        <p>
          Stair ascent combines knee flexion with the effort of lifting the body. The guide to <Link to="/guides/knee-pain-climbing-stairs" className="text-primary hover:underline">knee pain when climbing stairs</Link> focuses on step phase, pain location, and a graded return to ascent.
        </p>

        <h3>Going downstairs</h3>
        <p>
          Descent requires controlled lowering and is often particularly sensitive in patellofemoral pain. Use the dedicated guide to <Link to="/guides/knee-pain-going-down-stairs" className="text-primary hover:underline">knee pain going down stairs</Link> for short-term adjustments and progression.
        </p>

        <figure className="my-8">
          <img
            src={imgStairsPressure}
            alt="Adult using stairs with the front knee area highlighted"
            className="h-auto w-full rounded-xl shadow-sm"
            loading="lazy"
          />
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">
            Stair ascent and descent are separate tasks and can provoke different symptom patterns.
          </figcaption>
        </figure>

        <h3>Squatting and lunging</h3>
        <p>
          Squat symptoms may depend on depth, load, repetitions, and whether pain occurs during descent, at the bottom, or while rising. The guide to <Link to="/guides/knee-pain-when-squatting" className="text-primary hover:underline">knee pain when squatting</Link> explains how to test those variables one at a time.
        </p>

        <figure className="my-8">
          <img
            src={imgSquattingCompression}
            alt="Squat movement with the patellofemoral area highlighted"
            className="h-auto w-full rounded-xl shadow-sm"
            loading="lazy"
          />
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">
            Squat depth, variation, and external load all change the demands on the knee.
          </figcaption>
        </figure>

        <h3>Running</h3>
        <p>
          Running creates repeated knee-loading cycles, and symptoms may appear after changes in distance, speed, hills, or frequency. The term runner's knee should not replace a full assessment. For broader running patterns, see the <Link to="/guides/running-knee-pain-guide" className="text-primary hover:underline">running knee pain guide</Link>.
        </p>

        <figure className="my-8">
          <img
            src={imgRunnersMechanics}
            alt="Runner with the front knee and kneecap area highlighted"
            className="h-auto w-full rounded-xl shadow-sm"
            loading="lazy"
          />
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">
            Training changes and total running load often matter more than one isolated stride feature.
          </figcaption>
        </figure>

        <h3>Prolonged sitting</h3>
        <p>
          Some people notice a dull ache after a cinema, flight, desk session, or car ride. This is sometimes called the theater sign. When the dominant complaint is pain or stiffness while standing after sitting, use the guide to <Link to="/guides/knee-pain-getting-up-after-sitting" className="text-primary hover:underline">knee pain and stiffness after sitting</Link>.
        </p>

        <h2>Why PFPS Is Not Just a Tracking Problem</h2>
        <p>
          Older explanations often blamed the kneecap for tracking incorrectly because one part of the quadriceps was weak or the knee moved inward. Current guidance treats patellofemoral pain as multifactorial. Training load, strength, movement capacity, recovery, sleep, previous pain, confidence, and individual anatomy may all contribute.
        </p>
        <p>
          Movement observations can still help select an exercise or retraining strategy, but they are not proof of damage. A person's painful movement may also be a protective response rather than the original cause.
        </p>

        <h2>How Patellofemoral Pain Is Assessed</h2>
        <p>
          A clinician may ask when symptoms started, which activities provoke them, how long they last, and whether swelling, locking, instability, or trauma is present. They may examine knee motion, strength, tolerance of a squat or step, and the hip and ankle when relevant.
        </p>
        <p>
          Imaging is not always required at the beginning. It may be considered after significant trauma, when symptoms suggest another diagnosis, or when the problem does not improve as expected. A scan finding should be interpreted alongside symptoms and function.
        </p>

        <h2>What Evidence-Based Care Usually Includes</h2>
        <p>
          The 2024 best-practice guide recommends education and exercise therapy as the foundation. Knee-targeted exercise is commonly used, often alongside hip-targeted exercise. The exercise selection, range, resistance, and progression should match the person's presentation and goals.
        </p>

        <h3>Education and activity planning</h3>
        <p>
          Understanding the pattern can reduce fear and help manage activity without unnecessary complete rest. Temporarily reduce the most provocative dose, maintain tolerable movement, and rebuild the required task progressively.
        </p>

        <h3>Progressive knee and hip exercise</h3>
        <p>
          Options may include sit-to-stands, shallow squats, step exercises, knee-extension work, and hip-strengthening movements. There is no single best exercise for every person. The useful starting point is the variation you can perform with control and without a meaningful worsening afterward.
        </p>

        <h3>Selected supporting options</h3>
        <p>
          Taping, movement or running retraining, prefabricated foot orthoses, and manual therapy may help selected people when matched to their individual findings and preferences. They should support an active plan rather than replace it.
        </p>

        <h3>Monitoring the response</h3>
        <p>
          Improvement can include a later onset of pain, faster recovery after activity, greater stair or squat capacity, and fewer next-day symptoms. A brief symptom during rehabilitation is not automatically harmful, but sharp or escalating pain, swelling, or a clear deterioration means the dose should be reviewed.
        </p>

        <h2>How Long Can Recovery Take?</h2>
        <p>
          There is no universal timeline. Some people improve over weeks, while persistent or recurrent PFPS can require a longer structured plan. Progress is rarely perfectly linear. The important trend is improving function and symptom recovery, not eliminating every sensation immediately.
        </p>
        <p>
          Recurrent symptoms often follow a rapid return to the previous activity dose. Continue building capacity after the knee begins to feel better rather than stopping the plan at the first improvement.
        </p>

        <h2>Heat, Ice, and Passive Comfort Tools</h2>
        <p>
          A wrapped cold pack may be considered when the knee is newly swollen or unusually warm. Gentle heat may feel more comfortable when stiffness or muscle tightness is the main problem and there is no swelling. These options provide temporary comfort and do not correct a presumed tracking fault or replace progressive rehabilitation.
        </p>
        <p>
          See the <Link to="/guides/heat-vs-ice-for-knees" className="text-primary hover:underline">heat versus ice guide</Link> for safety details.
        </p>

        <h2>When to Seek Medical Care</h2>
        <div className="my-6 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="mb-3 font-semibold text-amber-950">Arrange an assessment when:</p>
          <ul className="list-disc space-y-2 pl-5 text-amber-950/90">
            <li>pain persists, worsens, or repeatedly limits daily activity or exercise</li>
            <li>the knee swells, catches, truly locks, or repeatedly gives way</li>
            <li>you cannot regain normal bending or straightening</li>
            <li>symptoms began after trauma or do not improve with sensible load changes</li>
          </ul>
          <p className="mb-3 mt-5 font-semibold text-amber-950">Seek urgent care when:</p>
          <ul className="list-disc space-y-2 pl-5 text-amber-950/90">
            <li>you cannot bear weight after an injury</li>
            <li>the knee is badly swollen, deformed, or changed shape</li>
            <li>the knee is hot and red and you also feel feverish or unwell</li>
          </ul>
        </div>
      </>
    ),
  },
};

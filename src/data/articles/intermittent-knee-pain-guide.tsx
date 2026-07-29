import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { ArticleExport } from "./types";
import ArticleFaqAccordion from "@/components/ArticleFaqAccordion";
import heroImage from "@/assets/article-hero-intermittent-knee.jpg";
import patternVisual from "@/assets/article-hero-sharp-pain-patterns.jpg";

const intermittentKneePainFaqs = [
  {
    question: "Why does my knee pain come and go?",
    answer:
      "Knee symptoms can be episodic because a particular movement, position, activity load, or period of swelling affects the knee only at certain times. The pattern alone does not identify a cause. Record timing, location, quality, triggers, swelling, and changes in function.",
  },
  {
    question: "Can intermittent knee pain happen without an obvious injury?",
    answer:
      "Yes. Recurring pain can begin without one memorable injury. Changes in activity, repeated loading, kneecap-related patterns, joint irritation, and referred symptoms are among the broad possibilities. Persistent or recurrent episodes should be assessed when they limit normal activity.",
  },
  {
    question: "Does a pain-free period mean my knee is fine?",
    answer:
      "Not necessarily. A pain-free period is useful information, but it does not rule out a recurring mechanical, inflammatory, load-related, or referred pattern. Pay attention to what consistently brings the symptoms back.",
  },
  {
    question: "What should I track during an intermittent knee pain episode?",
    answer:
      "Record the date and time, exact location, pain quality, duration, movement or activity before it started, swelling, warmth, locking, catching, instability, numbness, and how the knee felt later that day and the next morning.",
  },
  {
    question: "Should I rest when knee pain comes back?",
    answer:
      "Temporarily reduce or stop the movement that triggers significant pain, then check for swelling and warning signs. Complete rest is not always necessary, but do not push through severe pain, instability, true locking, or a new injury. Return to comfortable activity gradually.",
  },
  {
    question: "When should recurring knee pain be assessed?",
    answer:
      "Arrange an assessment when episodes are becoming more frequent or severe, repeatedly limit walking or daily activity, cause swelling, disturb sleep, reduce motion, or include catching, locking, or giving way.",
  },
  {
    question: "When is intermittent knee pain urgent?",
    answer:
      "Seek urgent guidance for severe pain after trauma, inability to bear weight or move the knee, major swelling or deformity, true locking, repeated giving way, a hot red swollen knee with fever, concerning calf swelling, or new marked numbness or weakness.",
  },
];

const QuickAnswer = ({ children }: { children: ReactNode }) => (
  <aside
    aria-label="Quick answer"
    className="my-7 rounded-xl border border-sky-200 bg-sky-50 p-5 text-slate-900"
  >
    <p className="mb-2 text-sm font-bold uppercase tracking-wide text-sky-800">
      Quick Answer
    </p>
    <div className="space-y-3 leading-relaxed">{children}</div>
  </aside>
);

const NoteBox = ({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "amber" | "red";
}) => {
  const styles = {
    blue: "border-sky-200 bg-sky-50",
    amber: "border-amber-200 bg-amber-50",
    red: "border-red-200 bg-red-50",
  };

  return (
    <aside className={`my-7 rounded-xl border p-5 leading-relaxed text-slate-900 ${styles[tone]}`}>
      {children}
    </aside>
  );
};

export const intermittentKneePainGuide: ArticleExport = {
  cta: "",
  article: {
    slug: "intermittent-knee-pain-guide",
    title: "Intermittent Knee Pain: Why It Comes and Goes and What to Track",
    subtitle:
      "Understand recurring episodes without assuming that a pain-free interval identifies the cause",
    intro:
      "Intermittent knee pain may appear during one movement, after a busy day, at rest, or in recurring episodes separated by pain-free periods. The pattern can include an ache, stiffness, swelling, catching, or a sharp sensation. This guide explains what to record, how episodic pain differs from persistent pain, and when recurring symptoms deserve medical assessment.",
    metaTitle: "Intermittent Knee Pain: Why It Comes and Goes",
    metaDescription:
      "Learn why knee pain may come and go, how to track recurring episodes, what patterns matter and when intermittent knee pain needs medical assessment.",
    heroImage,
    publishedDate: "February 24, 2026",
    lastUpdated: "July 29, 2026",
    nextSlug: "sharp-knee-pain-guide",
    nextTitle: "Sharp or Stabbing Knee Pain: Causes and Warning Signs",
    seoTags:
      "intermittent knee pain, knee pain that comes and goes, episodic knee pain, recurring knee pain, random knee pain, on and off knee pain, pain-free between knee pain episodes, knee pain some days not others, knee pain episode tracker",
    sources: [
      {
        title: "Knee pain",
        publisher: "NHS",
        url: "https://www.nhs.uk/symptoms/knee-pain/",
      },
      {
        title: "Knee Pain in Adults and Adolescents: The Initial Evaluation",
        publisher: "American Academy of Family Physicians",
        url: "https://www.aafp.org/pubs/afp/issues/2018/1101/p576.html",
      },
      {
        title: "Knee Injuries and Disorders",
        publisher: "MedlinePlus, U.S. National Library of Medicine",
        url: "https://medlineplus.gov/kneeinjuriesanddisorders.html",
      },
      {
        title: "Meniscus Tears",
        publisher: "American Academy of Orthopaedic Surgeons",
        url: "https://orthoinfo.aaos.org/en/diseases--conditions/meniscus-tears/",
      },
      {
        title: "Patellofemoral Pain Syndrome",
        publisher: "American Academy of Orthopaedic Surgeons",
        url: "https://orthoinfo.aaos.org/en/diseases--conditions/patellofemoral-pain-syndrome",
      },
      {
        title: "Baker's Cyst (Popliteal Cyst)",
        publisher: "American Academy of Orthopaedic Surgeons",
        url: "https://orthoinfo.aaos.org/diseases--conditions/bakers-cyst-popliteal-cyst/",
      },
    ],
    faqs: intermittentKneePainFaqs,
    content: (
      <>
        <QuickAnswer>
          <p>
            <strong>Intermittent knee pain means the symptoms recur with pain-free or
            lower-symptom periods between episodes.</strong> It may feel dull, achy, stiff,
            swollen, unstable, or occasionally sharp. The pattern does not identify one
            condition.
          </p>
          <p>
            Track what happens before, during, and after each episode. The most useful clues
            are the exact location, trigger, duration, swelling, loss of motion, locking,
            catching, giving way, and next-day response.
          </p>
        </QuickAnswer>

        <h2>What Intermittent Knee Pain Means</h2>
        <p>
          Intermittent describes timing. It does not describe severity or cause. One person
          may notice an ache after long walks. Another may have stiffness after sitting.
          Someone else may experience a short movement-specific episode and then feel normal
          for several days.
        </p>
        <p>
          This timing category is different from constant pain that remains present
          throughout the day. It is also different from the quality of pain. If your main
          symptom is stabbing, shooting, pinching, or electric, the{" "}
          <Link to="/guides/sharp-knee-pain-guide">sharp knee pain guide</Link>{" "}
          provides the more focused explanation.
        </p>

        <figure className="my-8">
          <img
            src={patternVisual}
            alt="Person noting the movement and timing of a short intermittent knee pain episode"
            width={1200}
            height={750}
            className="h-auto w-full rounded-xl border border-slate-200 bg-white shadow-sm"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">
            A short episode becomes more useful information when you record the exact
            movement, location, duration, swelling, and effect on walking.
          </figcaption>
        </figure>

        <h2>Why Knee Pain May Appear and Disappear</h2>
        <p>
          Several broad pattern groups can create symptoms that are present only at certain
          times. These are categories for observation, not diagnoses.
        </p>

        <h3>Movement-specific episodes</h3>
        <p>
          Pain may occur at one part of a squat, during a turn, on the first step after
          sitting, while kneeling, or during stair use. A repeated movement-specific pattern
          can be more informative than the pain score alone. Note whether the knee also
          catches, locks, clicks painfully, or gives way.
        </p>

        <h3>Activity and recovery cycles</h3>
        <p>
          Symptoms may appear during activity, several hours later, or the next morning.
          Record recent changes in distance, frequency, intensity, terrain, footwear, or
          repeated bending. A temporary improvement after rest does not show which tissue is
          involved, but the load-response pattern can guide a gradual activity plan.
        </p>

        <h3>Episodes with swelling or warmth</h3>
        <p>
          Swelling changes the decision. Record whether it appears quickly after trauma,
          builds later, or occurs without an obvious injury. A hot, red, very painful,
          swollen knee with fever or feeling unwell needs urgent medical guidance.
          Recurrent swelling without fever still deserves assessment.
        </p>

        <h3>Pain-free periods between mechanical symptoms</h3>
        <p>
          Some joint problems create catching, locking, loss of motion, or instability only
          in specific positions. Meniscus symptoms, for example, can include pain, swelling,
          catching, locking, giving way, and reduced range of motion. These signs do not
          confirm a meniscus injury on their own, but they are important to report.
        </p>

        <h3>Symptoms referred from another area</h3>
        <p>
          Knee pain can coexist with symptoms from the hip, back, muscles, or nerves. Record
          whether pain travels and whether there is back pain, tingling, numbness, or
          weakness. An assessment may need to look beyond the knee when these clues are
          present.
        </p>

        <h2>Intermittent vs Persistent Knee Pain</h2>
        <div className="my-8 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead className="bg-slate-100 text-slate-950">
              <tr>
                <th className="p-4 font-semibold">Pattern</th>
                <th className="p-4 font-semibold">What to record</th>
                <th className="p-4 font-semibold">Reason to arrange assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-4 font-medium text-slate-950">Brief and movement-specific</td>
                <td className="p-4">Exact motion, bend angle, location, catching</td>
                <td className="p-4">Repeats, worsens, locks, or changes walking</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-950">After activity</td>
                <td className="p-4">Load change, delayed swelling, next-day response</td>
                <td className="p-4">Recovery takes longer or normal activity becomes limited</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-950">Some good days, some bad days</td>
                <td className="p-4">Activity, stiffness, swelling, sleep disruption</td>
                <td className="p-4">Episodes become more frequent or severe</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-950">Persistent or progressive</td>
                <td className="p-4">Daily duration, night symptoms, loss of motion</td>
                <td className="p-4">Does not improve or steadily affects function</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>How to Track Knee Pain That Comes and Goes</h2>
        <p>
          Use a short note on your phone rather than relying on memory. One week of specific
          observations can be more useful than a long description written after the pattern
          has changed.
        </p>

        <div className="my-8 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead className="bg-slate-100 text-slate-950">
              <tr>
                <th className="p-4 font-semibold">Field</th>
                <th className="p-4 font-semibold">Example entry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-4 font-medium text-slate-950">Time and duration</td>
                <td className="p-4">7:40 a.m., lasted about 30 seconds</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-950">Exact location</td>
                <td className="p-4">Inner joint line, one-finger-sized spot</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-950">Quality</td>
                <td className="p-4">Ache, pressure, stiffness, sharp, burning</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-950">Trigger</td>
                <td className="p-4">First step after sitting, turning left</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-950">Associated signs</td>
                <td className="p-4">No swelling, one painful catch, no giving way</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-950">Later response</td>
                <td className="p-4">Walked normally, mild swelling that evening</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          For a precise location description, use the{" "}
          <Link to="/guides/knee-pain-locations-visual-guide">
            knee pain location chart and diagram
          </Link>. Record the front, inner, outer, back, kneecap, tendon, or joint-line zone
          before the sensation fades.
        </p>

        <h2>What to Do When an Episode Starts</h2>
        <ol>
          <li>
            <strong>Stop or reduce the provoking movement.</strong> Do not repeatedly test a
            painful turn, squat, or step.
          </li>
          <li>
            <strong>Check function.</strong> Can you move the knee and bear weight without
            severe pain or instability?
          </li>
          <li>
            <strong>Check associated signs.</strong> Look for swelling, unusual warmth,
            redness, deformity, locking, giving way, numbness, or weakness.
          </li>
          <li>
            <strong>Record the episode.</strong> Capture the pattern before it becomes hard
            to remember.
          </li>
          <li>
            <strong>Return gradually.</strong> When warning signs are absent and symptoms
            settle, resume comfortable activity in small steps rather than jumping back to
            the previous load.
          </li>
        </ol>

        <h2>Ice, Heat, Movement, or Rest?</h2>
        <p>
          A new injury or swollen, unusually warm knee calls for a different approach from a
          non-swollen knee that mainly feels stiff. Reduce the provoking load after a new
          episode. A wrapped cold pack may help short-term pain and swelling for some people.
          Do not apply ice directly to skin.
        </p>
        <p>
          When there is no new injury, redness, unusual warmth, or swelling, easy movement
          can help avoid unnecessary stiffness. Gentle warmth may be used for comfort before
          movement if it feels good and is safe for you. Heat does not treat the cause of
          recurring pain and should not be used on a newly injured, hot, red, or swollen
          knee. Compare the situations in the{" "}
          <Link to="/guides/heat-vs-ice-for-knees">
            ice or heat for knee pain guide
          </Link>.
        </p>

        <NoteBox tone="amber">
          <strong>Do not let a symptom-free day erase the pattern.</strong> Repeated swelling,
          true locking, instability, reduced motion, or episodes that limit normal walking
          still deserve assessment even when the knee feels normal between them.
        </NoteBox>

        <h2>When Recurring Knee Pain Needs an Appointment</h2>
        <p>Arrange a clinical assessment when:</p>
        <ul>
          <li>Episodes are becoming more frequent, severe, or longer lasting</li>
          <li>Pain repeatedly affects walking, stairs, work, exercise, or sleep</li>
          <li>The knee swells more than once or does not regain its normal motion</li>
          <li>There is catching, painful clicking, locking, or giving way</li>
          <li>Symptoms return every time you try to resume normal activity</li>
          <li>There is numbness, tingling, weakness, back pain, or pain traveling down the leg</li>
          <li>The pattern does not improve with a reasonable period of load adjustment</li>
        </ul>

        <h2>When Intermittent Knee Pain Is Urgent</h2>
        <p>Seek urgent medical guidance if an episode includes:</p>
        <ul>
          <li>Severe pain after trauma or inability to bear weight</li>
          <li>Major or rapid swelling, deformity, or inability to move the knee</li>
          <li>A knee that is physically locked or repeatedly gives way</li>
          <li>A hot, red, swollen knee with fever, chills, or feeling unwell</li>
          <li>Increasing calf pain or swelling, especially with breathing symptoms</li>
          <li>New marked numbness, weakness, or a cold or discolored foot</li>
        </ul>

        <NoteBox tone="red">
          <strong>Emergency symptoms:</strong> Seek emergency help for chest pain, breathing
          difficulty, collapse, severe deformity after trauma, or sudden concerning
          circulation or nerve symptoms.
        </NoteBox>

        <h2>How a Clinician Evaluates an Episodic Pattern</h2>
        <p>
          A clinician will usually ask about location, onset, duration, quality, trauma,
          swelling, mechanical symptoms, systemic symptoms, and previous injuries. The
          examination can compare motion, strength, tenderness, stability, circulation, and
          nerve function.
        </p>
        <p>
          Imaging is selected for a clinical reason rather than used automatically for every
          recurring pain. Bringing a short episode log can help the appointment focus on the
          pattern that is missing when the knee happens to feel normal in the clinic.
        </p>

        <ArticleFaqAccordion
          faqs={intermittentKneePainFaqs}
          headingId="intermittent-knee-pain-frequently-asked-questions"
        />
      </>
    ),
  },
};

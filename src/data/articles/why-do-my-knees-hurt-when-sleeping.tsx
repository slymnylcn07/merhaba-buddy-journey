import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import ArticleFaqAccordion from "@/components/ArticleFaqAccordion";
import { NightKneePainCausesChart, SleepPositionImpactChart } from "@/components/ArticleCharts";
import heroImage from "@/assets/article-hero-night-knee-pain.jpg";
import articleSectionStretching from "@/assets/article-section-stretching-relief.jpg";
import articleSectionWarmth from "@/assets/article-section-warmth.jpg";
import articleSectionKneeBending from "@/assets/package-4/exercise-gentle-knee-flexion.svg";
import type { ArticleExport } from "./types";

const nightKneePainFaqs = [
  {
    question: "Why do my knees hurt at night but not during the day?",
    answer:
      "Symptoms can become more noticeable after the day's activity, when the knee stays in one position, or when there are fewer distractions. The timing does not identify a cause. Record the day's load, sleep position, exact location, swelling, warmth, and morning response.",
  },
  {
    question: "Why do my knees hurt when I sleep on my side?",
    answer:
      "Side sleeping can bring the knees together or let the top leg rotate, which may increase pressure on a sensitive area. A pillow between the knees may improve comfort, but a response to pillow support does not diagnose the cause.",
  },
  {
    question: "Can sleeping position affect knee pain?",
    answer:
      "Yes. A prolonged bend, full extension, twisting, or direct knee-to-knee pressure can change symptoms. Try one small position adjustment at a time and avoid forcing a knee that is locked, very swollen, or recently injured.",
  },
  {
    question: "Why do my knees throb at night?",
    answer:
      "People use throbbing to describe several sensations. It may accompany swelling, warmth, an activity-related flare, or increased awareness at rest. A hot red swollen knee, fever, rapid swelling, or severe worsening pain needs prompt medical guidance.",
  },
  {
    question: "Why does the back of my knee hurt at night?",
    answer:
      "Structures behind the knee include tendons, muscles, the joint capsule, and the popliteal area. Position, swelling, or a Baker's cyst can be relevant. A new lump, marked swelling, calf pain, redness, or warmth should be assessed.",
  },
  {
    question: "Does warmth help nighttime knee discomfort?",
    answer:
      "Gentle warmth may feel comfortable for stiffness when the knee is not newly injured, swollen, unusually hot, or red. Do not use heat over an acute injury or a hot swollen knee, and stop if symptoms increase. Warmth does not treat the underlying cause.",
  },
  {
    question: "Why do a teenager's knees hurt at night?",
    answer:
      "Activity load, sports, an injury, or a growth-related condition can be relevant, but pain should not automatically be labeled growing pains. Persistent pain, swelling, a limp, night waking, fever, or reduced activity deserves assessment.",
  },
  {
    question: "When should nighttime knee pain be checked urgently?",
    answer:
      "Seek urgent guidance for a very painful knee, inability to move it or bear weight, major swelling or deformity, true locking, repeated giving way, or a hot red swollen knee with fever or feeling unwell. Concerning calf swelling, breathing symptoms, new marked weakness, or a cold discolored foot also need prompt help.",
  },
];

const Figure = ({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) => (
  <figure className="my-8">
    <img
      src={src}
      alt={alt}
      width={1200}
      height={760}
      className="h-auto w-full rounded-xl border border-slate-200 bg-white shadow-sm"
      loading="lazy"
      decoding="async"
    />
    <figcaption className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">
      {caption}
    </figcaption>
  </figure>
);

export const whyDoMyKneesHurtWhenSleeping: ArticleExport = {
  cta: "",
  article: {
    slug: "why-do-my-knees-hurt-when-sleeping",
    title: "Why Do My Knees Hurt at Night or When Sleeping?",
    subtitle:
      "Compare activity, sleep-position, location, swelling, and warning-sign clues behind nighttime knee pain",
    intro:
      "Knee pain at night can feel like an ache, throb, stiffness, pressure, burning sensation, or a sharp pain that appears when you change position. The clock alone cannot identify the cause. This guide covers nighttime knee pain at any age, including side sleeping, pain behind the knee, sleep positions, morning stiffness, and the signs that need medical assessment.",
    metaTitle: "Why Do My Knees Hurt at Night? Causes & Sleep Tips",
    metaDescription:
      "Learn why knees may ache, throb or feel stiff at night, how sleep position affects symptoms, what to track and which warning signs need medical care.",
    heroImage,
    publishedDate: "February 25, 2026",
    lastUpdated: "July 29, 2026",
    faqs: nightKneePainFaqs,
    seoTags:
      "why do my knees hurt at night, knee pain at night, aching knees at night, sore knees at night, nighttime knee pain, why do my knees hurt when sleeping, knee pain lying down, knees throb at night, side sleeping knee pain, back of knee pain at night, knee stiffness at night, knee pain waking me up, warm knee at night, teenager knee pain at night, best sleeping position for knee pain",
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
        title: "Osteoarthritis",
        publisher: "MedlinePlus, U.S. National Library of Medicine",
        url: "https://medlineplus.gov/ency/article/000423.htm",
      },
      {
        title: "Baker's Cyst (Popliteal Cyst)",
        publisher: "American Academy of Orthopaedic Surgeons",
        url: "https://orthoinfo.aaos.org/diseases--conditions/bakers-cyst-popliteal-cyst/",
      },
      {
        title: "Meniscus Tears",
        publisher: "American Academy of Orthopaedic Surgeons",
        url: "https://orthoinfo.aaos.org/en/diseases--conditions/meniscus-tears/",
      },
      {
        title: "Knee pain and sleep-position guidance",
        publisher: "Leicestershire Partnership NHS Trust",
        url: "https://www.leicspart.nhs.uk/msk-physiotherapy-resources/getting-started/lower-limb/knee/",
      },
      {
        title: "Osteoarthritis and Sleep",
        publisher: "Arthritis Foundation",
        url: "https://www.arthritis.org/health-wellness/healthy-living/managing-pain/fatigue-sleep/osteoarthritis-and-sleep",
      },
    ],
    content: (
      <>
        <h2>What Nighttime Knee Pain Can and Cannot Tell You</h2>
        <p>
          Timing is one clue among several. Pain that begins after a high-load day may have
          a different pattern from pain caused by knee-to-knee pressure, pain that wakes you
          regardless of position, or severe pain with swelling and loss of motion.
        </p>

        <div className="my-8 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead className="bg-slate-100 text-slate-950">
              <tr>
                <th className="p-4 font-semibold">Night pattern</th>
                <th className="p-4 font-semibold">Useful clues</th>
                <th className="p-4 font-semibold">Next question</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-4 font-semibold">After an active day</td>
                <td className="p-4">Walking, stairs, exercise, kneeling, new workload</td>
                <td className="p-4">Does reducing or pacing the trigger change the next night?</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold">Only in one position</td>
                <td className="p-4">Side sleeping, knees touching, deep bend, full extension</td>
                <td className="p-4">Does a small support change reduce pressure?</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold">With stiffness after rest</td>
                <td className="p-4">Morning duration, swelling, age, activity response</td>
                <td className="p-4">Does comfortable movement ease the stiffness?</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold">With mechanical symptoms</td>
                <td className="p-4">Catching, locking, giving way, painful clicking</td>
                <td className="p-4">Is motion physically blocked or walking unsafe?</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold">With systemic warning signs</td>
                <td className="p-4">Fever, feeling unwell, unexplained weight loss, hot red knee</td>
                <td className="p-4">Is urgent medical guidance needed?</td>
              </tr>
            </tbody>
          </table>
        </div>

        <NightKneePainCausesChart />

        <h2>Why Knee Symptoms May Feel Worse at Night</h2>
        <p>
          Several effects can overlap. The knee has already handled the day's load, sleep
          keeps it in fewer positions for longer periods, and quiet surroundings can make
          an existing sensation easier to notice. Pain can also disturb sleep, while poor
          sleep can make pain harder to tolerate the next day.
        </p>
        <p>
          These factors explain why timing matters, but they do not prove that fluid pooling,
          inflammation, circulation, or one specific tissue is responsible. The safest
          approach is to connect the night symptom with location, trigger, swelling,
          function, and the morning response.
        </p>

        <h2>Why Do My Knees Hurt When I Sleep on My Side?</h2>
        <p>
          Side sleeping can place the knees together and allow the top leg to rotate. This
          may increase pressure at the inner knee, outer knee, or kneecap depending on the
          position. A pillow between the knees can reduce direct contact and help keep the
          top leg from dropping forward.
        </p>
        <p>
          Pillow support is a comfort test, not a diagnosis. If the knee remains painful in
          every position, repeatedly wakes you, swells, locks, or gives way, the pattern
          deserves assessment.
        </p>

        <SleepPositionImpactChart />

        <h2>Night Knee Pain by Location</h2>
        <p>
          Use a fingertip to identify the most specific area you can, then record whether
          the pain stays there or travels. A visual location guide can help you describe the
          zone without assigning a diagnosis.
        </p>
        <ul>
          <li>
            <strong>Front or around the kneecap:</strong> record stairs, squatting, kneeling,
            prolonged sitting, and direct mattress pressure.
          </li>
          <li>
            <strong>Inner or outer knee:</strong> record side-sleeping pressure, twisting,
            joint-line tenderness, and instability.
          </li>
          <li>
            <strong>Behind the knee:</strong> record fullness, a lump, reduced extension,
            swelling, and calf symptoms.
          </li>
          <li>
            <strong>Diffuse or both knees:</strong> record morning stiffness, other joints,
            activity changes, and systemic symptoms.
          </li>
        </ul>
        <p>
          Compare the area with the{" "}
          <Link to="/guides/knee-pain-locations-visual-guide">
            knee pain location map
          </Link>
          .
        </p>

        <h2>Why Does the Back of My Knee Hurt at Night?</h2>
        <p>
          The back of the knee contains tendons, muscles, the joint capsule, nerves, blood
          vessels, and the popliteal area. A prolonged bend or full extension can change
          pressure on a sensitive structure. Joint swelling can also create fullness behind
          the knee, and a Baker's cyst is one possible cause of a noticeable lump or
          pressure.
        </p>
        <p>
          Do not massage a new unexplained lump or marked calf swelling. Seek timely
          assessment for a new mass, rapid swelling, redness, warmth, calf pain, or symptoms
          that affect circulation or breathing. The{" "}
          <Link to="/guides/back-of-knee-pain-explained">
            back-of-knee pain guide
          </Link>{" "}
          covers that location in more detail.
        </p>

        <h2>Throbbing, Warmth, or Burning at Night</h2>
        <p>
          Throbbing describes a sensation, not a cause. It can be reported with swelling,
          an activity-related flare, or increased awareness at rest. Warmth can also be
          subjective, so compare both knees with the back of your hand and look for visible
          redness or swelling.
        </p>
        <p>
          A hot red swollen knee with fever or feeling unwell needs urgent medical guidance.
          A recurring burning quality, numbness, tingling, weakness, or pain traveling from
          the back or hip may require evaluation for a nerve-related or referred pattern.
          See the{" "}
          <Link to="/guides/burning-sensation-in-knee">
            burning knee sensation guide
          </Link>{" "}
          for a focused comparison.
        </p>

        <Figure
          src={articleSectionWarmth}
          alt="Person checking a knee before choosing warmth or another comfort step at night"
          caption="Check for swelling, redness, unusual heat, and recent injury before using warmth."
        />

        <h2>Night Pain After Squatting, Stairs, or Exercise</h2>
        <p>
          A knee can feel comfortable during an activity and become sore later. Record the
          depth and number of squats, stairs, running, jumping, kneeling, or a sudden
          increase in training. The next-day response is also useful.
        </p>
        <p>
          Reduce the specific trigger temporarily rather than avoiding all movement. A
          gradual return is more informative than repeatedly testing a painful motion.
          Persistent swelling, locking, instability, or loss of motion should be assessed.
          For exercise-specific timing, use the{" "}
          <Link to="/guides/knee-pain-after-exercise">
            knee pain after exercise guide
          </Link>
          .
        </p>

        <Figure
          src={articleSectionKneeBending}
          alt="Gentle knee bending range used to observe whether night pain follows squatting or repeated flexion"
          caption="Record the movement range that triggers symptoms without forcing a painful or blocked knee."
        />

        <h2>Knee Clicking or Cracking After Sleep</h2>
        <p>
          Painless clicking or cracking can occur when the knee begins moving after rest.
          Sound becomes more important when it is painful or appears with swelling,
          catching, true locking, instability, or a new injury. Do not use the sound alone
          to decide whether the knee is damaged.
        </p>
        <p>
          Compare painless and painful patterns in the{" "}
          <Link to="/guides/why-do-my-knees-crack-or-pop">
            knee cracking and popping guide
          </Link>
          .
        </p>

        <h2>Night Knee Pain in Teenagers and Younger Adults</h2>
        <p>
          Younger people can have activity-related pain, sports injuries, tendon problems,
          kneecap-related symptoms, or growth-related conditions. Persistent night pain
          should not automatically be called growing pains. Record a limp, swelling,
          reduced participation, a specific injury, pain below the kneecap, fever, and
          whether the pain wakes the teenager.
        </p>
        <p>
          A clinician should assess persistent or worsening symptoms, significant swelling,
          inability to bear weight, fever, or a clear loss of normal activity.
        </p>

        <h2>Best Sleeping Position for Knee Pain</h2>
        <p>
          There is no universal best position. The useful position reduces pressure and
          does not force the knee into a painful twist, deep bend, or full extension.
        </p>
        <ul>
          <li>
            <strong>Side sleeping:</strong> try a pillow between the knees so the top leg
            does not drop forward.
          </li>
          <li>
            <strong>Back sleeping:</strong> try light support under the knees if full
            extension feels uncomfortable.
          </li>
          <li>
            <strong>Stomach sleeping:</strong> avoid direct kneecap pressure or twisting if
            it reproduces symptoms.
          </li>
        </ul>
        <p>
          Use the smallest support that improves comfort. Very thick pillows can hold the
          knee in a deep bend and create a different problem.
        </p>

        <p>
          For a closer look at side- and back-sleeping setups, see our{" "}
          <Link to="/guides/how-to-sleep-with-knee-pain">sleeping positions and pillow placement guide</Link>.
        </p>

        <h2>A Safe Nighttime Knee Comfort Routine</h2>
        <ol>
          <li>
            <strong>Check the knee:</strong> look for a new injury, swelling, unusual heat,
            redness, deformity, locking, or loss of weight-bearing ability.
          </li>
          <li>
            <strong>Review the day's load:</strong> note exercise, stairs, kneeling, long
            sitting, or a change in routine.
          </li>
          <li>
            <strong>Use comfortable movement:</strong> try a few gentle bends and
            straightens without forcing pain or a blocked motion.
          </li>
          <li>
            <strong>Choose temperature carefully:</strong> gentle warmth may feel
            comfortable for stiffness when there is no new injury, swelling, unusual heat,
            or redness. Follow the{" "}
            <Link to="/guides/heat-vs-ice-for-knees">
              ice or heat for knee pain guide
            </Link>{" "}
            for situation-specific safety.
          </li>
          <li>
            <strong>Set one pillow adjustment:</strong> keep it consistent for several
            nights so you can judge the response.
          </li>
        </ol>

        <Figure
          src={articleSectionStretching}
          alt="Gentle evening mobility sequence for knee comfort before sleep"
          caption="Keep evening movement gentle and stop if pain, swelling, or instability increases."
        />

        <h2>What to Track When Knee Pain Wakes You</h2>
        <p>Record these details for seven nights:</p>
        <ul>
          <li>Which knee and the exact location</li>
          <li>Ache, sharp pain, pressure, burning, throbbing, or stiffness</li>
          <li>Sleep position and whether changing position helped</li>
          <li>Swelling, warmth, redness, locking, catching, or giving way</li>
          <li>The day's walking, exercise, stairs, kneeling, or injury</li>
          <li>How long morning stiffness lasted and whether movement changed it</li>
          <li>Other joint pain, fever, feeling unwell, numbness, or weakness</li>
        </ul>

        <p>
          If this pattern began in midlife, compare osteoarthritis and menopause clues in
          the focused guide to{" "}
          <Link to="/guides/knee-pain-at-night-after-40">
            knee pain at night after 40
          </Link>
          .
        </p>

        <h2>When to Get Medical Help</h2>
        <aside
          aria-label="Urgent knee pain warning signs"
          className="my-6 rounded-xl border border-rose-200 bg-rose-50 p-5 text-slate-800"
        >
          <ul className="!mb-0 space-y-2">
            <li className="!mb-0">
              The knee is very painful, locked, deformed, or you cannot move it or bear weight
            </li>
            <li className="!mb-0">
              Swelling is major or rapid, or the knee is hot and red with fever, chills, or
              feeling unwell
            </li>
            <li className="!mb-0">
              The knee repeatedly gives way and causes falls, or there is new marked numbness,
              weakness, or a cold or discolored foot
            </li>
            <li className="!mb-0">
              New calf swelling or pain occurs with chest pain or breathing difficulty; seek
              emergency help
            </li>
          </ul>
        </aside>

        <h2>How Night Knee Pain Is Evaluated</h2>
        <p>
          Evaluation usually starts with the history and physical examination. The
          clinician can compare location, onset, duration, night waking, daily triggers,
          trauma, swelling, warmth, mechanical symptoms, other joint symptoms, previous
          knee problems, motion, strength, stability, circulation, and nerve function.
        </p>
        <p>
          Imaging is not required for every night symptom. It is selected when the history
          and examination raise a specific question or when persistent pain, mechanical
          symptoms, trauma, or atypical features change the investigation.
        </p>

        <ArticleFaqAccordion
          faqs={nightKneePainFaqs}
          headingId="night-knee-pain-frequently-asked-questions"
        />
      </>
    ),
  },
};

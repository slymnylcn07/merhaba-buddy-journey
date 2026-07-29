import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { ArticleExport } from "./types";
import ArticleFaqAccordion from "@/components/ArticleFaqAccordion";
import {
  KneePainBelowKneecapChart,
  SciaticaKneePainChart,
  SharpPainPatternsChart,
} from "@/components/ArticleCharts";
import heroImage from "@/assets/article-hero-sharp-knee-pain.jpg";
import anatomyDiagram from "@/assets/article-sharp-knee-anatomy-diagram.jpg";
import painCycleDiagram from "@/assets/article-sharp-knee-pain-cycle.jpg";
import kneecapPressureDiagram from "@/assets/article-sharp-knee-kneecap-pressure.jpg";
import sideStressDiagram from "@/assets/article-sharp-knee-side-stress.jpg";
import nervePathwayDiagram from "@/assets/article-sharp-knee-nerve-pathway.jpg";
import stretchingImage from "@/assets/article-section-leg-stretch-fixed.jpg";

const sharpPainFaqs = [
  {
    question: "What can cause a sharp pain in the knee?",
    answer:
      "Sharp knee pain can occur with several joint, tendon, ligament, kneecap, muscle, or nerve-related patterns. The sensation alone cannot identify the cause. Location, onset, the movement that triggers it, swelling, locking, instability, and recent injury provide more useful clues.",
  },
  {
    question: "Why does sharp stabbing pain in my knee come and go?",
    answer:
      "Brief episodes may happen only when a certain movement or position irritates a sensitive structure. Record the exact motion, location, duration, and whether the knee catches, locks, swells, or gives way. Recurrent mechanical symptoms deserve clinical assessment.",
  },
  {
    question: "Why do I get sharp knee pain randomly?",
    answer:
      "A trigger can be subtle, such as a turn, first step, change of direction, or transition from sitting to standing. Truly unexplained or recurring episodes should be tracked rather than assumed to be harmless, especially when they affect walking or occur with swelling or instability.",
  },
  {
    question: "What does shooting pain in the knee mean?",
    answer:
      "Shooting or electric pain may suggest a nerve-like quality, but people use these words in different ways. Note whether the sensation travels, and whether it occurs with back pain, tingling, numbness, or weakness. A clinician can determine whether the source is local or referred.",
  },
  {
    question: "What can sharp pain around the kneecap indicate?",
    answer:
      "Pain around or behind the kneecap can be associated with kneecap-related tissues and is often influenced by stairs, squats, running, jumping, kneeling, or prolonged sitting. Pain below the kneecap can involve a different set of tissues. Location and loading pattern matter.",
  },
  {
    question: "Why does my knee hurt sharply when I straighten it?",
    answer:
      "Full straightening changes pressure and tension across several tissues at the front, joint line, and back of the knee. Do not force a knee that feels blocked. Painful loss of motion, true locking, swelling, or a recent injury should be assessed.",
  },
  {
    question: "Is sharp knee pain at rest or at night concerning?",
    answer:
      "One episode does not reveal a cause, but repeated pain at rest or pain that disrupts sleep deserves attention, particularly if it is worsening or accompanied by swelling, redness, warmth, fever, unexplained weight loss, numbness, or weakness.",
  },
  {
    question: "When should sharp knee pain be checked urgently?",
    answer:
      "Seek urgent guidance for severe pain after trauma, inability to bear weight or move the knee, major or rapid swelling, deformity, true locking, repeated giving way, or a hot, red, swollen knee with fever or feeling unwell.",
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
      height={750}
      className="h-auto w-full rounded-xl border border-slate-200 bg-white shadow-sm"
      loading="lazy"
      decoding="async"
    />
    <figcaption className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">
      {caption}
    </figcaption>
  </figure>
);

export const sharpKneePainGuide: ArticleExport = {
  cta: "",
  article: {
    slug: "sharp-knee-pain-guide",
    title:
      "Sharp or Stabbing Knee Pain: Causes, Locations, Warning Signs, and What Helps",
    subtitle:
      "Use the timing, location, trigger, swelling, and mechanical symptoms to describe a sharp knee pain pattern",
    intro:
      "Sharp knee pain can feel like a stab, pinch, jolt, or shooting sensation. The word sharp describes how the pain feels, but it does not identify one cause. This guide helps you compare common patterns, including pain around the kneecap, at the joint line, behind the knee, during straightening, at rest, or in brief episodes that come and go.",
    metaTitle: "Sharp Knee Pain: Causes, Locations & Warning Signs",
    metaDescription:
      "Compare sharp, stabbing and shooting knee pain by location and trigger. Learn what to track, what may help and which warning signs need medical care.",
    heroImage,
    publishedDate: "December 20, 2025",
    lastUpdated: "July 29, 2026",
    nextSlug: "intermittent-knee-pain-guide",
    nextTitle: "Intermittent Knee Pain: Why It Comes and Goes",
    seoTags:
      "sharp knee pain, sharp pain in knee, stabbing pain in knee, shooting pain in knee, sharp stabbing pain in knee comes and goes, sharp pain kneecap, sharp pain in knee randomly, sharp knee pain at rest, pain in knee when straightening leg, stabbing pain in side of knee, stabbing pain in back of knee, pinching pain in knee",
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
      {
        title: "Knee Injuries and Disorders",
        publisher: "MedlinePlus, U.S. National Library of Medicine",
        url: "https://medlineplus.gov/kneeinjuriesanddisorders.html",
      },
    ],
    faqs: sharpPainFaqs,
    content: (
      <>
        <QuickAnswer>
          <p>
            <strong>Sharp, stabbing, and shooting describe pain quality, not a diagnosis.</strong>{" "}
            A brief pain with one motion can reflect a different pattern from severe pain
            after a twist, pain around the kneecap during stairs, or an electric sensation
            that travels with tingling.
          </p>
          <p>
            Check five clues: <strong>onset, exact location, trigger, swelling, and function</strong>.
            Seek urgent medical guidance if the knee is deformed, badly swollen, hot and red,
            locked, repeatedly giving way, unable to bear weight, or associated with fever
            after a new severe episode.
          </p>
        </QuickAnswer>

        <h2>What Sharp, Stabbing, and Shooting Knee Pain Can Tell You</h2>
        <p>
          Pain quality helps you describe an episode, but different people can use the same
          word for different sensations. A stabbing pain may be pinpoint or deep. A shooting
          pain may travel through the joint or down the leg. A pinch may happen only near the
          end of a movement. These descriptions become useful when paired with timing,
          location, and function.
        </p>

        <div className="my-8 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead className="bg-slate-100 text-slate-950">
              <tr>
                <th className="p-4 font-semibold">Description</th>
                <th className="p-4 font-semibold">Useful pattern question</th>
                <th className="p-4 font-semibold">Extra clues to record</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-4 font-medium text-slate-950">Sharp or stabbing</td>
                <td className="p-4">Does one movement reproduce it?</td>
                <td className="p-4">Exact spot, catching, locking, swelling</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-950">Shooting or electric</td>
                <td className="p-4">Does it travel above or below the knee?</td>
                <td className="p-4">Tingling, numbness, back or hip symptoms</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-950">Pinching</td>
                <td className="p-4">Does it appear at a specific bend angle?</td>
                <td className="p-4">Front, joint line, end-range straightening</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-950">Sudden and severe</td>
                <td className="p-4">Was there a twist, fall, pop, or impact?</td>
                <td className="p-4">Rapid swelling, instability, weight bearing</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Figure
          src={anatomyDiagram}
          alt="Knee anatomy diagram showing bones, cartilage, ligaments, tendons, and the kneecap"
          caption="Several nearby structures can create a similar sharp sensation. The symptom pattern matters more than matching one word to one tissue."
        />

        <SharpPainPatternsChart />

        <h2>Common Pattern Groups Behind Sharp Knee Pain</h2>
        <p>
          The groups below are possibilities to discuss, not a self-diagnosis list. A
          clinician combines the history with an examination and decides whether imaging or
          another test is useful.
        </p>

        <h3>Injury and mechanical symptoms</h3>
        <p>
          A twist, pivot, awkward landing, or direct impact can affect the meniscus,
          ligaments, cartilage, or other joint structures. Meniscus injuries can include
          pain, stiffness, swelling, catching, locking, giving way, or loss of full motion.
          Ligament injuries can also create swelling and instability. A painful click is
          different from ordinary painless joint noise.
        </p>
        <p>
          True locking means the knee becomes physically stuck and cannot move through its
          normal range. Do not repeatedly force a blocked knee. New locking, repeated giving
          way, or rapid swelling after trauma needs professional assessment.
        </p>

        <h3>Kneecap and front-of-knee loading</h3>
        <p>
          Pain around or behind the kneecap often follows repeated knee bending, stairs,
          squats, running, jumping, kneeling, or sitting with the knee bent. Patellofemoral
          pain is commonly described as a dull ache, but an irritated front-of-knee area can
          still feel sharper during a particular step or bend. Pain below the kneecap may
          follow a different loading pattern involving the patellar tendon or nearby tissues.
        </p>

        <Figure
          src={kneecapPressureDiagram}
          alt="Kneecap pressure diagram showing front knee contact zones during bending"
          caption="For front knee pain, record whether the sensation is on, around, behind, above, or below the kneecap."
        />

        <KneePainBelowKneecapChart />

        <h3>Side and joint-line patterns</h3>
        <p>
          Sharp pain on the inner or outer side can sit directly on the joint line or in
          nearby soft tissues. Twisting, pivoting, cutting, side-to-side movement, and deep
          bending provide useful context. The{" "}
          <Link to="/guides/knee-pain-locations-visual-guide">
            knee pain location chart
          </Link>{" "}
          can help you distinguish inner, outer, joint-line, and kneecap zones without
          treating the location as a diagnosis.
        </p>

        <Figure
          src={sideStressDiagram}
          alt="Inner and outer knee diagram showing medial and lateral pain zones"
          caption="Use one finger to mark the sharpest point, then note whether the pain spreads above, below, or along the joint line."
        />

        <h3>Back-of-knee pain and fullness</h3>
        <p>
          Pain behind the knee can involve joint, muscle, tendon, or fluid-related patterns.
          A Baker's cyst can cause fullness, stiffness, or tightness behind the knee,
          particularly during straightening. Increasing calf pain or swelling needs prompt
          medical care because a cyst and a blood clot can produce overlapping symptoms.
          See the{" "}
          <Link to="/guides/back-of-knee-pain-explained">
            back-of-knee pain guide
          </Link>{" "}
          for a more focused location review.
        </p>

        <h3>Nerve-like or referred sensations</h3>
        <p>
          A shooting, electric, burning, or needle-like sensation may have a nerve-like
          quality. The source may be around the knee or referred from another area. Record
          whether symptoms travel, whether there is back or hip pain, and whether numbness,
          tingling, or weakness is present. These details are more informative than assuming
          every shooting pain is sciatica.
        </p>

        <Figure
          src={nervePathwayDiagram}
          alt="Diagram of nerve pathways around the knee and possible referred pain routes"
          caption="Pain that travels with numbness, tingling, or weakness needs a broader assessment than the knee alone."
        />

        <SciaticaKneePainChart />

        <h2>Sharp Stabbing Pain in the Knee That Comes and Goes</h2>
        <p>
          A sharp episode may last seconds and disappear when you change position. It can
          occur during a turn, first step, squat, stair, or transition from sitting to
          standing. The stop-start pattern does not prove that a structure is catching, and
          a pain-free interval does not prove that nothing is wrong.
        </p>
        <p>
          Track whether each episode is in the same location and triggered by the same
          movement. Mechanical symptoms such as locking, catching, loss of motion, swelling,
          or giving way raise the value of an assessment. If the broader issue is knee pain
          that appears on some days and disappears on others, without always feeling sharp,
          use the{" "}
          <Link to="/guides/intermittent-knee-pain-guide">
            intermittent knee pain guide
          </Link>.
        </p>

        <Figure
          src={painCycleDiagram}
          alt="Diagram showing a trigger, a brief sharp knee pain episode, symptom relief, and possible recurrence"
          caption="A recurring sequence is easier to evaluate when you record the trigger and what happens immediately afterward."
        />

        <h2>Sharp Pain When Straightening, Bending, or Changing Position</h2>
        <p>
          Straightening and bending change pressure and tension across the kneecap, joint
          line, tendons, muscles, and back of the knee. Note whether pain appears only at the
          final few degrees, throughout the movement, or while weight bearing. Also record
          whether the knee feels blocked rather than simply painful.
        </p>
        <p>
          A gentle, comfortable range of motion can be reasonable when there has been no
          major injury and the knee is not locked or rapidly swelling. Do not push through a
          sharp block or repeatedly test a motion that causes severe pain.
        </p>

        <Figure
          src={stretchingImage}
          alt="Person performing a gentle supported leg stretch without forcing the knee"
          caption="Use comfortable movement only. A blocked, unstable, or acutely swollen knee needs assessment before exercise progression."
        />

        <h2>Sharp Knee Pain at Rest, at Night, or Without a Clear Trigger</h2>
        <p>
          Pain at rest can feel more noticeable because fewer other sensations compete for
          attention. Position, symptoms from the back or hip, an irritated joint, and several
          other patterns may contribute. Repeated pain that wakes you, steadily worsening
          pain, or symptoms accompanied by swelling, redness, warmth, fever, weakness, or
          unexplained weight loss should be discussed with a healthcare professional.
        </p>
        <p>
          Sudden describes onset, while sharp describes quality. A first severe episode after
          a twist or impact belongs in an injury decision pathway. A severe episode without
          an obvious injury may still need prompt advice. Compare that timing pattern in the{" "}
          <Link to="/guides/sudden-knee-pain-guide">sudden knee pain guide</Link>.
        </p>

        <h2>What to Track Before You Choose a Next Step</h2>
        <div className="my-8 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead className="bg-slate-100 text-slate-950">
              <tr>
                <th className="p-4 font-semibold">Track</th>
                <th className="p-4 font-semibold">Example</th>
                <th className="p-4 font-semibold">Why it matters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-4 font-medium text-slate-950">Onset</td>
                <td className="p-4">Gradual, first step, twist, fall, new training load</td>
                <td className="p-4">Separates trauma from gradual or recurring patterns</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-950">Location</td>
                <td className="p-4">Kneecap, inner line, outer side, back, diffuse</td>
                <td className="p-4">Improves communication and examination focus</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-950">Trigger</td>
                <td className="p-4">Straightening, squatting, turning, stairs, rest</td>
                <td className="p-4">Shows whether the pattern is movement-specific</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-950">Associated signs</td>
                <td className="p-4">Swelling, heat, redness, locking, giving way</td>
                <td className="p-4">Changes the urgency and next step</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-950">Episode response</td>
                <td className="p-4">Stops immediately, lingers, swells later, affects walking</td>
                <td className="p-4">Shows severity and recovery between episodes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>What May Help While You Arrange the Right Care</h2>
        <p>
          The safest self-care choice depends on what happened. After a new injury or when
          the knee is swollen, unusually warm, or irritated, reduce the provoking load and
          avoid heat. A wrapped cold pack may help short-term pain and swelling for some
          people. Do not apply ice directly to skin.
        </p>
        <p>
          When there is no new injury, swelling, redness, or unusual heat, comfortable
          movement and a gradual return to normal activity may help prevent unnecessary
          stiffness. Gentle warmth can be used for comfort before easy movement if it feels
          good and is safe for you. It does not diagnose or treat the underlying cause. The{" "}
          <Link to="/guides/heat-vs-ice-for-knees">
            ice or heat for knee pain guide
          </Link>{" "}
          explains how the choice changes with swelling, injury timing, and stiffness.
        </p>
        <p>
          Repeated sharp pain should not be managed by repeatedly testing the painful motion.
          A clinician or physiotherapist can help you decide when progressive strengthening,
          mobility work, or activity modification fits your pattern.
        </p>

        <NoteBox tone="amber">
          <strong>Do not use symptom relief as a clearance test.</strong> A knee that feels
          temporarily better may still need assessment when it locks, gives way, swells
          repeatedly, loses motion, or cannot tolerate normal walking.
        </NoteBox>

        <h2>When Sharp Knee Pain Needs Urgent Medical Guidance</h2>
        <p>Seek urgent medical guidance when you have any of the following:</p>
        <ul>
          <li>Severe pain after a fall, twist, collision, or other trauma</li>
          <li>Inability to move the knee or put weight on the leg</li>
          <li>Rapid or major swelling, visible deformity, or loss of normal alignment</li>
          <li>A knee that is physically locked or repeatedly gives way</li>
          <li>A hot, red, swollen knee with fever, chills, or feeling unwell</li>
          <li>Increasing calf pain or swelling, especially with breathing symptoms</li>
          <li>New numbness, marked weakness, or a cold or discolored foot</li>
        </ul>

        <NoteBox tone="red">
          <strong>Emergency symptoms:</strong> Seek emergency help for breathing difficulty,
          chest pain, collapse, a visibly deformed limb after trauma, or sudden concerning
          circulation or nerve symptoms.
        </NoteBox>

        <h2>How Sharp Knee Pain Is Evaluated</h2>
        <p>
          An evaluation normally starts with the history and physical examination. Useful
          details include age, exact location, onset, duration, pain quality, trauma,
          swelling, mechanical symptoms, systemic symptoms, and previous knee problems. The
          examination can assess motion, strength, tenderness, stability, circulation, and
          nerve function.
        </p>
        <p>
          Imaging is not automatically required for every sharp pain. X-rays, ultrasound,
          MRI, or laboratory tests are selected when the history and examination support a
          specific question. This approach reduces guesswork and keeps the investigation
          matched to the pattern.
        </p>

        <ArticleFaqAccordion
          faqs={sharpPainFaqs}
          headingId="sharp-knee-pain-frequently-asked-questions"
        />
      </>
    ),
  },
};

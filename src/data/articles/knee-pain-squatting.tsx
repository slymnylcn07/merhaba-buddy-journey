import { Link } from "react-router-dom";
import { InfoBox } from "@/components/ArticleCallouts";
import type { ArticleExport } from "./types";

import heroImage from "@/assets/article-hero-knee-pain-squatting.jpg";

const faqs = [
  {
    question: "Why do my knees hurt when squatting?",
    answer:
      "Squatting combines knee bending with load. Symptoms may come from a load-sensitive kneecap joint, patellar or quadriceps tendon, meniscus, osteoarthritis, a recent training increase, or another knee problem. The location and the phase of the squat are more useful than assuming one form error is responsible.",
  },
  {
    question: "Why does my knee hurt at the bottom of a squat?",
    answer:
      "The bottom position uses deeper knee and hip flexion and may increase demand on the kneecap joint, tendons, meniscus, and surrounding tissues. Reducing depth can be a useful short-term experiment, but persistent sharp pain, locking, swelling, or a blocked feeling should be assessed.",
  },
  {
    question: "Why does my knee hurt while standing up from a squat?",
    answer:
      "Rising requires the leg to produce force through the painful range. The symptom may be influenced by load, fatigue, tendon sensitivity, patellofemoral pain, or a recent jump in training. Compare bodyweight, depth, speed, and external load one variable at a time.",
  },
  {
    question: "Are knees going past the toes always bad?",
    answer:
      "No. Forward knee travel is a normal part of many squats and daily movements. It changes how load is shared between the knee, hip, and ankle. The useful goal is a controlled, tolerable movement rather than forcing every person into one universal position.",
  },
  {
    question: "Should I stop squatting if my knees hurt?",
    answer:
      "A temporary reduction in depth, load, repetitions, or frequency may be enough when there are no warning signs. Stop the session for sharp or escalating pain, a sudden injury, instability, locking, or swelling. Persistent symptoms deserve an individual assessment.",
  },
  {
    question: "Can heel elevation help knee pain during squats?",
    answer:
      "A small heel lift changes ankle and trunk mechanics and may feel better for some people, but it can also increase knee demand in certain ranges. Treat it as an experiment rather than a universal fix and judge it by control, symptoms, and the next-day response.",
  },
  {
    question: "Why does only one knee hurt during squats?",
    answer:
      "One-sided pain may reflect a previous injury, a local tendon or joint problem, an asymmetrical stance, a recent load change, or pain-related compensation. Repeated swelling, catching, giving way, or a large side-to-side difference should be evaluated.",
  },
  {
    question: "When should squat-related knee pain be checked?",
    answer:
      "Arrange an assessment when pain persists, worsens, repeatedly changes your training, or occurs with swelling, locking, instability, or reduced movement. Seek urgent care after a major injury, if you cannot bear weight, or if the knee is deformed or hot and red with fever.",
  },
];

export const kneePainSquatting: ArticleExport = {
  cta: "knee-pain-when-squatting",
  article: {
    slug: "knee-pain-when-squatting",
    title: "Knee Pain When Squatting: Location, Depth, Load & Warning Signs",
    subtitle: "Use the phase of the squat and the next-day response to guide changes",
    intro:
      "Knee pain when squatting can appear during the descent, at the bottom, while rising, or only after the session. Those patterns are not interchangeable. Pain location, squat depth, external load, repetition volume, recent training changes, swelling, and mechanical symptoms all help determine the safer next step. This guide avoids one-size-fits-all form rules and shows how to test changes methodically.",
    metaTitle: "Knee Pain When Squatting: Location, Depth & Load",
    metaDescription:
      "Learn why knees hurt during or after squats, how pain phase and location guide adjustments, which variables to test, and when to seek care.",
    heroImage,
    publishedDate: "March 5, 2026",
    lastUpdated: "July 28, 2026",
    nextSlug: "pain-behind-kneecap",
    nextTitle: "Pain Behind the Kneecap: PFPS, Causes and What Helps",
    seoTags:
      "knee pain when squatting, knee pain during squat, knee pain after squats, pain at bottom of squat, knee pain rising from squat, kneecap pain squatting, inner knee pain squat, back of knee pain squatting, heavy squat knee pain",
    faqs,
    sources: [
      {
        title: "Patellofemoral Joint Loading During Squat Variations",
        publisher: "PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/39906057/",
      },
      {
        title: "Patellofemoral Joint Force and Stress During Squats",
        publisher: "PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/19276845/",
      },
      {
        title: "Patellofemoral Joint Stress During Quadriceps Exercises",
        publisher: "PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/24673446/",
      },
      {
        title: "Patellofemoral Joint Reaction Force Across Activities",
        publisher: "British Journal of Sports Medicine via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/35115309/",
      },
      {
        title: "Best Practice Guide for Patellofemoral Pain",
        publisher: "British Journal of Sports Medicine via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/39401870/",
      },
      {
        title: "Patellofemoral Pain Syndrome",
        publisher: "American Academy of Orthopaedic Surgeons",
        url: "https://orthoinfo.aaos.org/en/diseases--conditions/patellofemoral-pain-syndrome/",
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
            Do not judge squat-related knee pain from depth or form alone. First identify where it hurts and whether it begins during the descent, at the bottom, while rising, or afterward. Then change one variable at a time, such as load, depth, repetitions, tempo, stance, or heel elevation. Stop for sharp or escalating pain, swelling, locking, instability, or a sudden injury.
          </p>
        </InfoBox>

        <h2>Start With the Phase of the Squat</h2>
        <p>
          A squat is not one movement. The knee experiences different demands while lowering, pausing, and rising. Separating those phases helps avoid random technique changes.
        </p>

        <h3>Pain during the descent</h3>
        <p>
          Symptoms while lowering may be influenced by increasing knee flexion, control of the movement, speed, fatigue, or a sensitive range. A slower descent is not automatically better if it increases time under load beyond what the knee currently tolerates. Compare a comfortable tempo with a faster or slower one rather than assuming one is correct.
        </p>

        <h3>Pain at the bottom</h3>
        <p>
          The bottom position combines the deepest knee and hip bend used in that repetition. Patellofemoral joint force and stress generally change with knee angle, squat variation, and whether the task is single-leg or two-leg. The exact load is not a fixed multiple of body weight for every person. Reducing depth is a practical way to test whether the painful range matters.
        </p>

        <h3>Pain while rising</h3>
        <p>
          The ascent requires force production through the knee and hip. Pain here may be affected by external load, fatigue, tendon sensitivity, a load-sensitive kneecap joint, or a recent increase in training. Notice whether the pain appears immediately, only near lockout, or only after several repetitions.
        </p>

        <h3>Pain only after squats</h3>
        <p>
          Delayed pain may reflect the total dose rather than a single repetition. Sets, repetitions, load, squat variation, other leg exercises, running, and recovery all contribute. Use the <Link to="/guides/knee-pain-after-exercise" className="text-primary hover:underline">knee pain after exercise guide</Link> when the main problem appears hours later rather than during the squat itself.
        </p>

        <h2>Use Pain Location to Narrow the Pattern</h2>
        <div className="my-6 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="p-3 text-left font-semibold">Location</th>
                <th className="p-3 text-left font-semibold">A pattern it may fit</th>
                <th className="p-3 text-left font-semibold">What changes the decision</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border align-top">
                <td className="p-3 font-medium">Around or behind the kneecap</td>
                <td className="p-3">Patellofemoral pain is common with loaded bending</td>
                <td className="p-3">Stairs, running, prolonged sitting, and depth may also provoke it</td>
              </tr>
              <tr className="border-b border-border align-top">
                <td className="p-3 font-medium">Below the kneecap</td>
                <td className="p-3">Patellar tendon irritation may be considered</td>
                <td className="p-3">Jumping, heavy leg training, and rapid load increases are relevant</td>
              </tr>
              <tr className="border-b border-border align-top">
                <td className="p-3 font-medium">Above the kneecap</td>
                <td className="p-3">Quadriceps tendon or nearby tissue sensitivity</td>
                <td className="p-3">Pain with stairs, step-ups, and resisted knee extension may coexist</td>
              </tr>
              <tr className="border-b border-border align-top">
                <td className="p-3 font-medium">Inner or outer joint line</td>
                <td className="p-3">Meniscus or another joint structure may be involved</td>
                <td className="p-3">A twist, swelling, catching, or true locking increases concern</td>
              </tr>
              <tr className="align-top">
                <td className="p-3 font-medium">Back of the knee</td>
                <td className="p-3">Soft-tissue tension, swelling, or a posterior-knee problem</td>
                <td className="p-3">A blocked feeling, lump, calf swelling, or loss of extension needs assessment</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          For pain centered around the patella, use the main guide to <Link to="/guides/pain-behind-kneecap" className="text-primary hover:underline">pain behind the kneecap and patellofemoral pain</Link>. Location alone cannot confirm the diagnosis, but it helps choose the right questions.
        </p>

        <h2>The Main Squat Variables to Test</h2>
        <p>
          Instead of replacing your entire technique, change one variable and compare the response during the session and over the next 24 hours.
        </p>

        <h3>Depth</h3>
        <p>
          A shallower squat may reduce exposure to a painful range. Start at a depth that remains controlled and does not provoke sharp or escalating pain. Progress depth only after the current range feels stable across several sessions.
        </p>

        <h3>External load</h3>
        <p>
          Bodyweight, a light counterbalance, a goblet squat, and a barbell squat distribute demand differently. Reduce external load before assuming the movement itself must be abandoned. Heavy squats also create more fatigue and may change technique across the set.
        </p>

        <h3>Volume and frequency</h3>
        <p>
          Ten comfortable repetitions may be tolerated while five sets are not. Count the total squat dose across training, work, sport, and daily activities. Change either sets, repetitions, or weekly frequency rather than all of them at once.
        </p>

        <h3>Tempo and pause</h3>
        <p>
          A slower tempo can improve control but increases time under tension. A pause can help confidence or make the bottom position more demanding. Test these options rather than treating them as universally safer.
        </p>

        <h3>Stance and toe angle</h3>
        <p>
          Hip structure, limb proportions, mobility, and the squat goal influence a comfortable stance. A slightly wider or narrower position may change symptoms, but there is no single toe angle that suits every body. Keep the feet secure and choose a stance that allows controlled movement.
        </p>

        <h3>Heel elevation</h3>
        <p>
          A wedge or lifting shoe can make depth easier when ankle motion is limited, but it also changes knee and trunk demand. Use it as a controlled experiment. If calf tightness or ankle range seems to limit the movement, see the guide to <Link to="/guides/tight-calves-knee-pain" className="text-primary hover:underline">tight calves and knee pain</Link>.
        </p>

        <h3>Support and balance</h3>
        <p>
          Holding a stable rail, rack, or counter may reduce fear and help you test a comfortable range. Support is not cheating. It is a way to lower task difficulty while rebuilding control.
        </p>

        <InfoBox title="There Is No Universal Perfect Squat">
          <p>
            Forward knee travel, trunk angle, stance width, and depth vary across people and squat goals. The useful standard is a controlled movement that matches your current capacity and does not create a meaningful worsening afterward. A single visual form rule cannot diagnose or fix knee pain.
          </p>
        </InfoBox>

        <h2>Bodyweight Squats, Gym Squats, and Daily Squatting</h2>
        <h3>Bodyweight or chair squats</h3>
        <p>
          These can be useful starting points because depth and support are easy to adjust. A higher chair reduces range. A counterbalance can help keep the movement steady. If standing from a chair is the main trigger, use the separate guide to <Link to="/guides/knee-pain-getting-up-after-sitting" className="text-primary hover:underline">knee pain and stiffness after sitting</Link>.
        </p>

        <h3>Loaded gym squats</h3>
        <p>
          Bar position, load, footwear, fatigue, and the rest of the training session all affect the knee's total demand. Compare the same variation with a lighter load and fewer sets before switching exercises. If symptoms began after a sudden change in weight, volume, or frequency, return temporarily to the previous tolerated dose.
        </p>

        <h3>Single-leg squats and split squats</h3>
        <p>
          Single-leg variations typically require more balance and may create higher local demand than a two-leg squat. They can be valuable later in rehabilitation, but they are not automatically a better starting point. Use support, reduce range, or return to a two-leg version when control is poor or symptoms escalate.
        </p>

        <h3>Occupational or daily squatting</h3>
        <p>
          Gardening, cleaning, lifting, and childcare can involve repeated deep bending without the rest periods of a gym set. Alternate positions, use a stool or support, and break long tasks into shorter blocks. The total duration may matter more than any one repetition.
        </p>

        <h2>A Practical Squat Rebuild Plan</h2>
        <ol className="my-4 list-decimal space-y-3 pl-6">
          <li><strong>Record the baseline.</strong> Note location, painful phase, depth, load, repetitions, and next-day response.</li>
          <li><strong>Choose one tolerable variation.</strong> Use support, a higher target, or a reduced range if needed.</li>
          <li><strong>Keep the dose small.</strong> Begin with a few controlled repetitions rather than testing the maximum.</li>
          <li><strong>Change one variable.</strong> Add repetitions, depth, load, or frequency separately.</li>
          <li><strong>Review the next 24 hours.</strong> A growing limp, swelling, earlier-onset pain, or a clear next-day flare means the dose was too high.</li>
          <li><strong>Progress toward the goal.</strong> Rebuild the squat variation required for daily life, training, or sport rather than chasing depth for its own sake.</li>
        </ol>
        <p>
          There is no universal acceptable pain score. A useful session remains controlled, does not produce sharp or escalating pain, and does not cause a meaningful deterioration afterward. A physiotherapist or qualified clinician can help when even a shallow supported squat is difficult.
        </p>

        <h2>When Not to Keep Testing the Squat</h2>
        <p>
          Stop repeatedly checking the movement when there is rapid swelling, true locking, giving way, inability to bear weight, a sudden pop with injury, or a clear loss of motion. These features need assessment rather than another technique experiment.
        </p>
        <p>
          Persistent pain can also deserve help even without an emergency. A clinician can examine the knee, review training load, and decide whether the pattern fits patellofemoral pain, tendon irritation, meniscus involvement, osteoarthritis, or another condition.
        </p>

        <h2>Heat, Ice, and Recovery</h2>
        <p>
          A wrapped cold pack may be considered when the knee is newly swollen or unusually warm. Gentle heat may feel better when stiffness or muscle tightness is the main issue and there is no swelling. Neither method corrects squat mechanics or proves that the knee is ready for heavy training. See the <Link to="/guides/heat-vs-ice-for-knees" className="text-primary hover:underline">heat versus ice guide</Link> for safety details.
        </p>

        <h2>When to Seek Medical Care</h2>
        <div className="my-6 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="mb-3 font-semibold text-amber-950">Arrange an assessment when:</p>
          <ul className="list-disc space-y-2 pl-5 text-amber-950/90">
            <li>pain persists, worsens, or repeatedly forces major training changes</li>
            <li>the knee swells, catches, locks, or repeatedly gives way</li>
            <li>you cannot regain comfortable bending or straightening</li>
            <li>one knee behaves very differently from the other across several sessions</li>
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

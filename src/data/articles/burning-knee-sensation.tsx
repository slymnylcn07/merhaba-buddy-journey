import { Link } from "react-router-dom";
import { InfoBox } from "@/components/ArticleCharts";
import type { ArticleExport } from "./types";

import heroImage from "@/assets/article-hero-burning-knee-sensation.jpg";
import imgJointIrritation from "@/assets/article-knee-joint-irritation-diagram.jpg";
import imgPatellofemoral from "@/assets/article-patellofemoral-pressure.jpg";
import imgNerveIrritation from "@/assets/article-nerve-irritation-knee.jpg";
import imgInflammation from "@/assets/article-knee-inflammation-visual.jpg";
import imgStressComparison from "@/assets/article-knee-movement-stress-comparison.jpg";

const faqs = [
  {
    question: "Why does my knee feel like it is burning?",
    answer:
      "Burning is a description of the sensation, not a diagnosis. It may come from irritated joint or tendon tissue, pressure around the kneecap, skin irritation, or nerve-type pain. Location, timing, numbness, swelling, redness, and the activity that triggered it help narrow the pattern.",
  },
  {
    question: "What causes a burning sensation on the side of the knee?",
    answer:
      "Side-of-knee burning can involve local soft-tissue irritation or a nearby nerve. Outer-knee symptoms may follow repetitive bending or pressure, while inner-knee burning may occur near tendons, bursae, or sensory nerves. Persistent pinpoint pain, numbness, weakness, or swelling should be assessed.",
  },
  {
    question: "Why does my knee burn when sitting?",
    answer:
      "A long period with the knee bent can increase pressure around the kneecap and may also irritate sensitive tissues or nerves. Note whether the sensation improves after a few minutes of easy movement or is accompanied by tingling, numbness, back pain, or weakness.",
  },
  {
    question: "Can a knee burn without being painful?",
    answer:
      "Yes. Some people describe warmth, stinging, tingling, or an unusual hot feeling rather than conventional pain. A recurring sensory change still deserves attention when it is one-sided, spreading, associated with numbness, or present without a clear mechanical trigger.",
  },
  {
    question: "What does burning behind the knee mean?",
    answer:
      "Burning behind the knee can come from local tissue irritation, pressure in the back of the joint, or nerve sensitivity. A new lump, visible swelling, calf swelling, redness, warmth, sudden pain, or reduced motion should be evaluated promptly rather than massaged or exercised through.",
  },
  {
    question: "Is burning in the knee a nerve symptom?",
    answer:
      "It can be. Neuropathic pain is often described as burning, tingling, shooting, or electric. Nerve involvement becomes more likely when burning follows a line, the skin is unusually sensitive, or numbness, pins and needles, or weakness are present. A clinician is needed to identify the source.",
  },
  {
    question: "Should I use heat on a burning knee?",
    answer:
      "Do not add heat when the knee is already objectively hot, red, newly swollen, or recently injured. When the sensation is subjective burning without surface heat or swelling, comfort choices depend on the cause. A cool compress may be more appropriate after recent irritation, but persistent symptoms need assessment rather than repeated temperature treatment.",
  },
  {
    question: "When should a burning knee be checked?",
    answer:
      "Seek urgent advice for severe pain, inability to bear weight, a badly swollen or deformed knee, locking or giving way, or a hot red knee with fever. Arrange an assessment for burning that persists, repeatedly returns, spreads, occurs at rest, or comes with numbness, weakness, a lump, or reduced motion.",
  },
];

export const burningKneeSensation: ArticleExport = {
  cta: "burning-sensation-in-knee",
  article: {
    slug: "burning-sensation-in-knee",
    title: "Burning Knee Pain: Causes by Location and When to Worry",
    subtitle: "Use the location, trigger, and accompanying symptoms to understand the pattern",
    intro:
      "A knee that burns can feel hot, stinging, prickly, or unusually sensitive even when the skin is not warmer than the other side. The word burning does not identify one condition. What matters more is whether it sits around the kneecap, along the inner or outer side, behind the knee, or follows a line with tingling or numbness. This guide helps you sort those patterns without treating every burning feeling as the same problem.",
    metaTitle: "Burning Knee Pain: Causes by Location & Warning Signs",
    metaDescription:
      "Compare burning knee pain around the kneecap, inner or outer side, and back of the knee, including triggers, nerve-type symptoms, and warning signs.",
    heroImage,
    publishedDate: "March 8, 2026",
    lastUpdated: "July 31, 2026",
    nextSlug: "knee-weakness-without-pain",
    nextTitle: "Knee Weakness Without Pain",
    seoTags:
      "burning sensation in knee,burning knee pain,knee burning sensation,burning feeling in knee,knee feels like it is burning,burning inside knee,burning behind kneecap,burning sensation on side of knee,burning knee when sitting,burning knee at rest,burning knee without pain,nerve pain around knee,burning and swelling in knee",
    faqs,
    sources: [
      {
        title: "Pain",
        publisher: "National Institute of Neurological Disorders and Stroke",
        url: "https://www.ninds.nih.gov/health-information/disorders/pain",
      },
      {
        title: "Peripheral Neuropathy",
        publisher: "National Institute of Neurological Disorders and Stroke",
        url: "https://www.ninds.nih.gov/health-information/disorders/peripheral-neuropathy",
      },
      {
        title: "Knee pain",
        publisher: "NHS",
        url: "https://www.nhs.uk/symptoms/knee-pain/",
      },
      {
        title: "Patellofemoral Pain Syndrome",
        publisher: "OrthoInfo, American Academy of Orthopaedic Surgeons",
        url: "https://orthoinfo.aaos.org/en/diseases--conditions/patellofemoral-pain-syndrome/",
      },
      {
        title: "Sports Injuries: Types, Symptoms, and Risk Factors",
        publisher: "National Institute of Arthritis and Musculoskeletal and Skin Diseases",
        url: "https://www.niams.nih.gov/health-topics/sports-injuries",
      },
    ],
    content: (
      <>
        <InfoBox title="Quick Answer">
          <p>
            <strong>A burning sensation in the knee is a symptom description, not a diagnosis.</strong> Front-of-knee burning often follows pressure or repeated bending; burning that follows a narrow line with tingling or numbness is more suggestive of nerve sensitivity; burning with visible swelling, redness, surface heat, weakness, or loss of motion needs closer attention. Record the exact location, trigger, duration, and accompanying symptoms before deciding whether it is a short-lived irritation or a pattern that should be assessed.
          </p>
        </InfoBox>

        <p>
          This page covers burning that may happen while sitting, kneeling, walking, resting, or during ordinary movement. Burning that appears specifically during or after running, cycling, lifting, tai chi, or another workout has a more focused activity-related pattern. See <Link to="/guides/burning-knees-after-exercise">burning knees after exercise</Link> for that version. A knee that is physically warmer than the other knee, especially with redness or swelling, is also different from a purely sensory burning feeling; our <Link to="/guides/warm-feeling-in-knee">warm feeling in the knee guide</Link> separates those patterns.
        </p>

        <h2>Why Does My Knee Feel Like It Is Burning?</h2>
        <p>
          Pain can be generated by irritated or inflamed tissue, by a sensitized or compressed nerve, or by a combination of both. Burning, tingling, shooting, and electric sensations are common descriptions of nerve-type pain, but the word <em>burning</em> alone does not prove that a nerve is damaged. Joint, tendon, bursa, skin, and kneecap-related symptoms can also be described as hot or burning.
        </p>
        <p>
          That is why the useful question is not simply, “What causes burning knees?” It is: <strong>Where is the burning, what were you doing when it began, is the skin actually hot, and what else changed?</strong> A broad feeling at the front after stairs is a different pattern from a narrow stripe of burning with pins and needles, and both are different from a red, swollen joint.
        </p>

        <figure className="my-8">
          <img
            src={imgJointIrritation}
            alt="Knee diagram showing joint, tendon, soft-tissue, and nerve areas that may be described as burning"
            className="w-full h-auto rounded-xl shadow-sm"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="text-sm text-muted-foreground mt-3 text-center">
            The same word can describe symptoms coming from different tissues, so location and accompanying signs matter.
          </figcaption>
        </figure>

        <h2>Use Location and Trigger to Narrow the Pattern</h2>
        <div className="my-6 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-3 pr-4">Pattern</th>
                <th className="py-3 pr-4">Useful clues</th>
                <th className="py-3">Best next step</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 pr-4">Front or under kneecap</td>
                <td className="py-3 pr-4">Stairs, squats, kneeling, or prolonged sitting</td>
                <td className="py-3">Reduce the provoking bend or pressure and compare the next-day response</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 pr-4">Inside or outside</td>
                <td className="py-3 pr-4">Pinpoint tenderness, friction, pressure, or a line of tingling</td>
                <td className="py-3">Track whether the symptom behaves like local tissue pain or nerve sensitivity</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 pr-4">Behind the knee</td>
                <td className="py-3 pr-4">Fullness, a lump, calf symptoms, or reduced bending</td>
                <td className="py-3">Avoid aggressive massage and seek advice for swelling or a persistent lump</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 pr-4">When sitting or at rest</td>
                <td className="py-3 pr-4">Bent-knee pressure, skin sensitivity, tingling, numbness, or back symptoms</td>
                <td className="py-3">Change position, note the distribution, and assess persistent sensory symptoms</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">With redness or surface heat</td>
                <td className="py-3 pr-4">Visible swelling, fever, severe pain, or rapid change</td>
                <td className="py-3">Do not treat it as routine stiffness; use the warning-sign guidance below</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Burning at the Front or Under the Kneecap</h2>
        <p>
          Front-of-knee burning is often reported with repeated bending, stairs, squats, kneeling, or sitting for a long time with the knee flexed. These situations increase pressure around the kneecap and can irritate sensitive tissues at the front of the joint. The sensation may be broad around the patella or more focused just above or below it.
        </p>
        <p>
          Pain and stiffness around the kneecap that are linked to running, stairs, squatting, or prolonged sitting can fit a patellofemoral pattern, but a symptom description cannot confirm that diagnosis. Compare the pattern with our <Link to="/guides/pain-behind-kneecap">patellofemoral pain syndrome guide</Link> and the more location-specific guide to <Link to="/guides/pain-behind-kneecap">pain behind the kneecap</Link>. Burning caused by direct pressure while gardening or working on the floor may be better matched to <Link to="/guides/knee-pain-when-kneeling">knee pain when kneeling</Link>.
        </p>

        <figure className="my-8">
          <img
            src={imgPatellofemoral}
            alt="Illustration of pressure around the kneecap during repeated bending"
            className="w-full h-auto rounded-xl shadow-sm"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="text-sm text-muted-foreground mt-3 text-center">
            A front-of-knee burning pattern is often linked to how the kneecap area responds to pressure and repeated bending.
          </figcaption>
        </figure>

        <h2>Burning on the Inside or Outside of the Knee</h2>
        <p>
          A burning sensation on one side of the knee deserves more precise tracking than “my knee burns.” Note whether the area is tender when pressed, whether the burning follows a narrow path, and whether there is tingling or altered skin sensation. Local tendons and bursae can become irritated, while nearby sensory nerves can create burning or stinging without much joint ache.
        </p>
        <p>
          Outer-knee burning during repetitive movement may overlap with the patterns discussed in the <Link to="/guides/it-band-pain-location-diagram">IT band pain location guide</Link>. A broader comparison of inner and outer discomfort is available in our <Link to="/guides/side-knee-pain-comfort-guide">side knee pain guide</Link>. Do not assume every side-burning symptom is an IT band problem, particularly when numbness, weakness, or pain below the knee is present.
        </p>

        <h2>Burning Behind the Knee</h2>
        <p>
          Burning behind the knee can feel deep in the crease, closer to the skin, or beside an area of fullness. The back of the knee contains tendons, vessels, nerves, and the joint capsule, so this is not a location to diagnose from sensation alone. Record whether there is a lump, visible swelling, calf swelling, reduced motion, or pain when fully straightening the leg.
        </p>
        <p>
          A new or enlarging lump, a hot swollen knee, or calf swelling with sudden pain needs medical assessment. Do not repeatedly massage unexplained fullness behind the knee. For the swelling-specific decision path, read <Link to="/guides/knee-swelling-after-exercise">knee swelling after exercise</Link>; the same warning principles apply even when exercise was not the trigger.
        </p>

        <h2>Burning When Sitting, Resting, or at Night</h2>
        <p>
          Long periods with the knee bent can increase pressure around the kneecap and make a sensitive joint more noticeable when you first stand. A symptom that settles after a few minutes of easy movement may behave more like a pressure or stiffness pattern. Our guide to <Link to="/guides/knee-pain-getting-up-after-sitting">knees that feel tight after resting</Link> covers that transition in more detail.
        </p>
        <p>
          Burning that continues at rest, wakes you repeatedly, follows a strip of skin, or arrives with tingling, numbness, unusual sensitivity to clothing, or weakness is more suggestive of a sensory nerve component. Nerve symptoms may originate near the knee or farther up the leg or spine. Persistent or progressive symptoms need clinical evaluation rather than a stronger stretching routine.
        </p>

        <figure className="my-8">
          <img
            src={imgNerveIrritation}
            alt="Nerve pathways around the knee and lower leg that may produce burning or tingling sensations"
            className="w-full h-auto rounded-xl shadow-sm"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="text-sm text-muted-foreground mt-3 text-center">
            Burning that follows a path or comes with tingling, numbness, or skin sensitivity may involve a nerve rather than the joint alone.
          </figcaption>
        </figure>

        <h2>Burning After an Injury</h2>
        <p>
          A burning sensation that begins after a twist, fall, direct blow, kneecap dislocation, or failed repetition should not be grouped with an occasional unexplained burning feeling. The injury event, swelling, bruising, ability to bear weight, and ability to fully bend and straighten the knee matter more than the word used to describe the pain.
        </p>
        <p>
          Stop the provoking activity. Seek prompt advice when there is severe pain, major swelling, deformity, inability to bear weight, locking, giving way, or a large loss of motion. The <Link to="/guides/sudden-knee-pain-guide">sudden knee pain guide</Link> provides a clearer injury and warning-sign pathway.
        </p>

        <h2>Burning With Warmth, Redness, or Swelling</h2>
        <p>
          Subjective burning and objective heat are not the same. A knee can feel as though it is burning while both knees have the same skin temperature. By contrast, a knee that is visibly red, noticeably hotter than the other side, and swollen needs more caution. Infection, gout, bursitis, injury, and other inflammatory problems can produce a hot joint, and they cannot be distinguished from a web description.
        </p>

        <figure className="my-8">
          <img
            src={imgInflammation}
            alt="Visual comparison of a subjective burning sensation and visible heat, redness, or swelling around the knee"
            className="w-full h-auto rounded-xl shadow-sm"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="text-sm text-muted-foreground mt-3 text-center">
            Visible redness, swelling, and measurable surface heat change the decision and should not be treated as simple tightness.
          </figcaption>
        </figure>

        <InfoBox title="Get Urgent Medical Advice">
          <p>
            Seek urgent help if the knee is very painful, you cannot move it or bear weight, it is badly swollen or deformed, it locks or gives way, or it is hot and red while you have a fever or feel unwell. Arrange a non-urgent assessment for burning that persists, repeatedly returns, spreads, appears at rest, or comes with numbness, weakness, a lump, or progressive loss of motion.
          </p>
        </InfoBox>

        <h2>What to Do First</h2>
        <ol>
          <li><strong>Stop guessing from the word “burning.”</strong> Mark the exact location with one finger and note whether the feeling is deep, on the skin, or follows a line.</li>
          <li><strong>Record the trigger and timing.</strong> Sitting, kneeling, an injury, ordinary walking, and exercise create different patterns.</li>
          <li><strong>Check accompanying signs.</strong> Compare both knees for swelling, redness, surface heat, range of motion, and stability.</li>
          <li><strong>Remove the obvious irritant.</strong> Avoid the position, pressure, or activity that reliably provokes the symptom while it settles.</li>
          <li><strong>Use gentle movement only when comfortable.</strong> Do not stretch aggressively through burning, numbness, or sharp pain.</li>
          <li><strong>Avoid heat on a hot or newly swollen knee.</strong> Temperature-based comfort should never override warning signs.</li>
          <li><strong>Get assessed when the pattern is persistent or neurological.</strong> Burning with numbness, weakness, spreading symptoms, or night pain needs a more specific explanation.</li>
        </ol>

        <figure className="my-8">
          <img
            src={imgStressComparison}
            alt="Comparison of knee burning patterns linked to pressure, repeated movement, and nerve sensitivity"
            className="w-full h-auto rounded-xl shadow-sm"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="text-sm text-muted-foreground mt-3 text-center">
            The goal is to identify the repeatable pattern, not to force every burning sensation into one cause.
          </figcaption>
        </figure>

        <h2>The Bottom Line</h2>
        <p>
          A burning knee can reflect local tissue irritation, pressure around the kneecap, an injury, skin sensitivity, or nerve-type pain. Location and context do most of the diagnostic work: front burning after bending, side burning that follows a path, burning behind a swollen knee, and burning at rest are not interchangeable. Use the pattern to choose the right guide, and seek medical advice when burning is persistent, progressive, associated with neurological symptoms, or accompanied by a hot, red, swollen, unstable, or locked knee.
        </p>
        <p>
          Burning with numbness along the inner knee or beside a surgical scar may fit the <Link to="/guides/saphenous-nerve-knee-pain" className="text-primary hover:underline">saphenous nerve distribution</Link>. If altered sensation is the main symptom, map the full area with our <Link to="/guides/knee-numbness-guide" className="text-primary hover:underline">knee numbness guide</Link> before assuming the problem begins inside the joint.
        </p>
      </>
    ),
  },
};

import { Link } from "react-router-dom";
import { InfoBox, TipsList } from "@/components/ArticleCharts";
import type { ArticleExport } from "./types";

import heroImage from "@/assets/article-hero-heavy-knees.jpg";
import imgMuscleFatigue from "@/assets/package-4/knee-control-factors.svg";
import imgKneeSupportMuscles from "@/assets/article-knee-support-muscles.jpg";
import imgCirculationLimbs from "@/assets/fig-leg-circulation-v2.svg";
import imgJointLoad from "@/assets/article-knee-joint-load.jpg";
import imgMovementStiffness from "@/assets/article-movement-vs-stiffness.jpg";
import imgHeavyKneePatterns from "@/assets/article-heavy-knees-patterns-v1.svg";
import { ArticleSourcesBox } from "@/components/ArticleSourcesBox";

const faqs = [
  {
    question: "Why do my knees feel heavy?",
    answer: "A heavy feeling is a symptom description, not a diagnosis. It may follow muscle fatigue, unaccustomed activity, stiffness after sitting, or visible leg swelling. The timing, whether one or both legs are affected, and symptoms such as pain, weakness, warmth, redness, or breathlessness determine how urgently it should be assessed.",
  },
  {
    question: "Is knee heaviness normal after activity?",
    answer: "Temporary heaviness after more activity than usual can reflect muscle fatigue, especially when both legs feel similar and the sensation improves with recovery. New swelling, inability to bear weight, or symptoms that repeatedly worsen are not something to dismiss as ordinary fatigue.",
  },
  {
    question: "Can fatigue cause heavy knees?",
    answer: "Yes. Tired quadriceps, hamstrings, and calf muscles can make walking, stairs, and standing up feel more effortful. Fatigue is only one possibility, so persistent or unexplained heaviness should be considered in the context of swelling, pain, weakness, and general health.",
  },
  {
    question: "Why do my knees feel heavy when walking?",
    answer: "Heaviness during walking may appear when distance or pace exceeds current capacity, but it can also occur with joint pain, swelling, weakness, or problems elsewhere in the leg. Stop and seek assessment if walking becomes unsafe, the knee gives way, or one leg is newly swollen, warm, or discolored.",
  },
  {
    question: "Does sitting too long cause heavy knees?",
    answer: "Long sitting can leave the knees and legs feeling stiff or sluggish when you first stand. Gentle movement may help a simple stiffness pattern. One-sided calf or leg swelling and pain after prolonged immobility needs urgent medical advice because a blood clot must be considered.",
  },
  {
    question: "How can I relieve heavy knees?",
    answer: "If there are no warning signs, try changing position, a short easy walk, and a gradual return to normal activity. Longer-term strengthening may help when low capacity is part of the pattern. Treatment for visible swelling or a medical condition depends on its cause and should not be replaced by a generic exercise routine.",
  },
  {
    question: "Can leg swelling make the knees feel heavy?",
    answer: "Yes. Fluid buildup in the lower leg can feel heavy or tight and may affect one or both sides. Recurrent swelling, unexplained one-sided swelling, or swelling that is sudden, painful, red, or warm needs medical assessment rather than self-diagnosis.",
  },
  {
    question: "When should heavy knees be checked?",
    answer: "Arrange an assessment when heaviness persists, worsens, limits walking, or comes with pain, weakness, numbness, or recurrent swelling. Seek urgent care for unexplained swelling in one leg, especially with pain, warmth, or discoloration. Chest pain, sudden breathlessness, coughing blood, fainting, or severe illness requires emergency help.",
  },
];

const article = {
  slug: "heavy-feeling-in-knees",
  title: "Heavy Feeling in the Knees: Causes, Clues, and When to Act",
  subtitle: "Compare fatigue, stiffness, swelling, and warning patterns without guessing the diagnosis",
  intro: "A heavy feeling in the knees can describe tired muscles, stiffness after sitting, effortful walking, or swelling in the lower leg. Because the word heavy means different things to different people, the safest approach is to compare the timing, visible changes, one-sided versus two-sided symptoms, and what happens with movement. This guide explains practical next steps and the signs that need medical care.",
  metaTitle: "Heavy Feeling in Knees: Causes and Warning Signs",
  metaDescription: "Compare fatigue, stiffness, swelling, and weakness when your knees feel heavy. Learn practical steps and when one-sided leg symptoms need urgent care.",
  heroImage,
  publishedDate: "March 8, 2026",
  lastUpdated: "July 13, 2026",
  nextSlug: "knee-pain-after-flights",
  nextTitle: "Knee Pain After Long Flights",
  faqs,
  seoTags: "heavy feeling in knees, knees feel heavy, heavy knees walking, legs feel heavy, knee heaviness and swelling, heavy knees after sitting, one leg feels heavy, knee fatigue, when heavy legs are serious",
  content: (
    <>
      <InfoBox title="Quick answer">
        <p>
          Heavy-feeling knees are not one condition. If both legs feel tired after unusual activity and improve with recovery, muscle fatigue may be contributing. If the feeling appears after sitting and eases after a few gentle steps, stiffness may be more relevant. Visible swelling, progressive weakness, or a new change on only one side shifts the decision toward medical assessment. <strong>Unexplained one-sided swelling with pain, warmth, or color change needs urgent advice. Chest pain or sudden breathlessness requires emergency help.</strong>
        </p>
      </InfoBox>

      <p>
        A heavy feeling in the knees is one of those sensations that can be difficult to describe but easy to recognize. Your knees may feel weighed down, sluggish, or resistant to movement, even though there is no visible swelling or sharp discomfort. This type of sensation is often linked to how the muscles, circulation, and joint structures around the knee are functioning during daily life.
      </p>

      <p>
        In this guide, we will explore the everyday reasons why knees may feel heavy, how muscle fatigue and circulation play a role, and practical strategies that may help your knees feel lighter and more comfortable throughout the day.
      </p>

      <figure className="my-8">
        <img
          src={imgHeavyKneePatterns}
          alt="Three everyday patterns associated with heavy-feeling knees: walking fatigue, stiffness after sitting, and one-sided leg swelling"
          className="h-auto w-full rounded-xl shadow-sm"
          loading="lazy"
        />
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          The same word, heavy, can describe very different patterns. Timing, symmetry, and visible swelling change the next step.
        </figcaption>
      </figure>

      <h2>Heavy Knees Cause Comparison</h2>
      <p>
        Use this comparison as a way to describe the symptom, not to diagnose yourself. More than one pattern can be present at the same time, and an examination may be needed when the cause is unclear.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="p-3 text-left font-semibold">Pattern</th>
              <th className="p-3 text-left font-semibold">Clues that may fit</th>
              <th className="p-3 text-left font-semibold">Reasonable next step</th>
              <th className="p-3 text-left font-semibold">What raises concern</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border align-top">
              <td className="p-3 font-medium">Activity-related muscle fatigue</td>
              <td className="p-3">Both legs feel tired after a longer walk, workout, or stair-heavy day; no major swelling; improves with recovery</td>
              <td className="p-3">Temporarily reduce the dose, keep easy movement, and rebuild distance or resistance gradually</td>
              <td className="p-3">Marked weakness, repeated giving way, severe pain, or failure to return toward baseline</td>
            </tr>
            <tr className="border-b border-border align-top">
              <td className="p-3 font-medium">Stiffness after inactivity</td>
              <td className="p-3">Heaviness on the first steps after sitting; movement becomes easier after a short warm-up</td>
              <td className="p-3">Change position regularly and use a gentle, comfortable movement break</td>
              <td className="p-3">A locked knee, persistent loss of motion, hot swelling, or worsening night symptoms</td>
            </tr>
            <tr className="border-b border-border align-top">
              <td className="p-3 font-medium">Knee or lower-leg swelling</td>
              <td className="p-3">Visible puffiness, tighter socks, skin that looks stretched, or a feeling of pressure</td>
              <td className="p-3">Compare sides, note onset and medicines, and arrange assessment if unexplained, recurrent, or worsening</td>
              <td className="p-3">Sudden, severe, painful, red, or hot swelling; fever; or swelling after significant injury</td>
            </tr>
            <tr className="border-b border-border align-top">
              <td className="p-3 font-medium">One-sided vascular warning pattern</td>
              <td className="p-3">One leg becomes swollen with pain or tenderness, warmth, redness, or discoloration</td>
              <td className="p-3">Seek urgent medical advice because a deep vein thrombosis must be considered</td>
              <td className="p-3">Breathlessness, chest pain, coughing blood, fainting, or feeling acutely unwell is an emergency</td>
            </tr>
            <tr className="align-top">
              <td className="p-3 font-medium">Weakness or nerve-related symptoms</td>
              <td className="p-3">The leg feels difficult to control, gives way, drags, or is accompanied by numbness or tingling</td>
              <td className="p-3">Arrange a clinical assessment rather than treating the sensation as simple fatigue</td>
              <td className="p-3">Sudden major weakness, new loss of bladder or bowel control, or rapidly spreading numbness needs urgent care</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>What Causes Heaviness in the Knees</h2>

      <p>
        The sensation of heaviness in the knees is typically related to how well the surrounding muscles, blood vessels, and joint structures are functioning. Unlike sharp pain that usually has a specific trigger, heaviness tends to develop gradually and reflects the overall condition of the lower limbs.
      </p>

      <figure className="my-8">
        <img
          src={imgJointLoad}
          alt="Visualization of load distribution in the knee joint during daily activities"
          className="w-full h-auto rounded-xl shadow-sm"
          loading="lazy"
        />
        <figcaption className="text-sm text-muted-foreground mt-3 text-center">
          The knee joint manages significant load during everyday movement
        </figcaption>
      </figure>

      <h3>Muscle Fatigue</h3>
      <p>
        The muscles around the knee, including the quadriceps, hamstrings, and calves, work continuously to support the joint during standing, walking, and movement. When these muscles become fatigued from overuse, prolonged activity, or insufficient recovery, the knee can feel heavy and sluggish. The muscles simply become less efficient at supporting and moving the joint.
      </p>

      <h3>Swelling and Fluid Buildup</h3>
      <p>
        Swelling in the knee, ankle, foot, or lower leg can create pressure, tightness, and heaviness. Long periods in one position are one possible contributor, but swelling can also relate to an injury, medicines, vein problems, infection, or conditions affecting the heart, kidneys, liver, or thyroid. The appearance, timing, and whether one or both legs are affected matter. It is not safe to label unexplained swelling as poor circulation without an assessment.
      </p>

      <h3>Stiffness After Rest</h3>
      <p>
        A bent knee can feel stiff after sitting, driving, or sleeping. The first few steps may feel effortful even when the leg is not visibly swollen. A stiffness pattern that eases with gentle movement is different from a knee that is truly locked and cannot straighten. A locked knee, major loss of movement, or repeated giving way should be assessed promptly.
      </p>

      <h3>Deconditioning</h3>
      <p>
        When the muscles around the knee have not been regularly challenged through activity, they may lose some of their strength and endurance. This deconditioning means that even normal daily activities can fatigue the muscles more quickly, leading to a heavy sensation earlier in the day or during routine tasks.
      </p>

      <InfoBox title="Understanding Knee Heaviness">
        <p>Knee heaviness does not prove structural damage, but it also should not automatically be dismissed as fatigue. Describe whether the feeling is in the joint or the whole leg, whether it is one-sided, what triggers it, and whether swelling, pain, weakness, numbness, warmth, or skin-color change is present.</p>
      </InfoBox>

      <h2>Muscle Fatigue and Knee Support</h2>

      <figure className="my-8">
        <img
          src={imgMuscleFatigue}
          alt="Diagram showing several factors that contribute to knee control"
          className="w-full h-auto rounded-xl shadow-sm"
          loading="lazy"
        />
        <figcaption className="text-sm text-muted-foreground mt-3 text-center">
          Muscle capacity is one of several factors that can influence how controlled or effortful the knee feels
        </figcaption>
      </figure>

      <p>
        The knee joint depends heavily on the surrounding muscles for stability and movement. When these muscles are functioning well, the knee feels light, responsive, and easy to move. When they are tired, the knee can feel heavy, stiff, and resistant to movement.
      </p>

      <h3>Quadriceps Fatigue</h3>
      <p>
        The quadriceps muscles at the front of the thigh are the primary supporters of the knee during activities like walking, climbing stairs, and standing up. When these muscles become fatigued, the knee loses some of its active support, which can create a sensation of heaviness and increased effort during movement.
      </p>

      <h3>Hamstring and Calf Fatigue</h3>
      <p>
        The hamstrings and calves work together with the quadriceps to stabilize the knee and control movement. Fatigue in these muscle groups can alter how forces are distributed through the knee, making the joint feel heavier and less stable during walking and other activities. If you also notice weakness without pain, our guide on <Link to="/guides/knee-weakness-without-pain" className="text-primary hover:underline">knee weakness without pain</Link> explores this topic further.
      </p>

      <h3>How Fatigue Builds Throughout the Day</h3>
      <p>
        Many people notice that their knees feel heavier as the day progresses. This is because the supporting muscles gradually fatigue with continuous use. The morning typically brings the most rested, responsive muscles, while the evening often brings the most noticeable fatigue and heaviness.
      </p>

      <TipsList tips={[
        "Muscle fatigue is one possible cause of activity-related heaviness",
        "The quadriceps bear the greatest load in supporting the knee",
        "Heaviness often increases throughout the day as muscles tire",
        "Regular strengthening helps muscles resist fatigue longer",
        "Recovery between activities is essential for reducing heaviness",
      ]} />

      <h2>When the Whole Leg Feels Heavy</h2>

      <figure className="my-8">
        <img
          src={imgCirculationLimbs}
          alt="Illustration of major blood vessels in the lower limbs"
          className="w-full h-auto rounded-xl shadow-sm"
          loading="lazy"
        />
        <figcaption className="text-sm text-muted-foreground mt-3 text-center">
          A whole-leg symptom needs a broader check than a knee-only symptom.
        </figcaption>
      </figure>

      <p>
        People sometimes say their knees feel heavy when the sensation actually extends through the calf, ankle, or entire leg. Look for visible swelling, sock marks, skin that appears stretched, and a difference between the two sides. Also consider recent travel, prolonged immobility, surgery, pregnancy, cancer treatment, hormone medicines, and a previous blood clot when discussing symptoms with a clinician.
      </p>

      <h3>The Role of the Muscle Pump</h3>
      <p>
        Calf-muscle contractions help venous blood return toward the heart, which is one reason changing position and walking may feel useful after sitting. That does not make movement a treatment for every heavy-leg symptom. If a leg is newly swollen, painful, warm, or discolored, seek urgent advice before massaging it or assuming a short walk will solve it.
      </p>

      <h3>How Inactivity Reduces Circulation</h3>
      <p>
        Extended sitting can leave the legs stiff and sluggish. For a simple, symmetrical stiffness pattern without warning signs, changing position and taking a comfortable movement break may help. For related context, see our guide on <Link to="/guides/knee-pain-getting-up-after-sitting" className="text-primary hover:underline">knee stiffness after resting</Link>. Long travel or immobility also increases the importance of recognizing one-sided DVT symptoms rather than treating every sensation as ordinary stiffness.
      </p>

      <h3>Medicines and General Health</h3>
      <p>
        Some medicines can contribute to lower-leg swelling, and swelling may also occur with medical conditions outside the knee. Do not stop a prescribed medicine on your own. Note when the symptom began, any recent dose changes, and whether swelling affects the feet, ankles, face, or abdomen, then discuss those details with a healthcare professional.
      </p>

      <h2>Situations When Knees Feel Heavy</h2>

      <p>
        Certain everyday situations are more likely to trigger a heavy feeling in the knees. Recognizing these patterns can help you take proactive steps to reduce heaviness before it becomes bothersome.
      </p>

      <h3>After Long Periods of Sitting</h3>
      <p>
        Sitting for extended periods at work, during travel, or while relaxing reduces muscle activity and circulation in the legs. When you stand up after prolonged sitting, the knees often feel heavy and stiff until movement restores normal function. Our guide on <Link to="/guides/knee-pain-after-car-rides" className="text-primary hover:underline">knee discomfort after car rides</Link> covers travel-related strategies.
      </p>

      <h3>During or After Extended Walking</h3>
      <p>
        Walking for longer distances or durations than your muscles are accustomed to can lead to progressive fatigue and heaviness. The muscles gradually tire, reducing their ability to support the knee efficiently, and the joint begins to feel heavier with each step.
      </p>

      <h3>After Intense Exercise</h3>
      <p>
        Vigorous exercise that heavily engages the leg muscles can leave both legs feeling tired during recovery. A fatigue pattern should trend back toward baseline and should not include rapid swelling, severe pain, instability, or loss of function. For more on post-exercise sensations, explore our guide on <Link to="/guides/knee-pain-after-exercise" className="text-primary hover:underline">knee discomfort after exercise</Link>. If the heaviness is accompanied by clicking or popping sounds, our guide on <Link to="/guides/knee-clicking-when-walking" className="text-primary hover:underline">knee clicking when walking</Link> explains why these sounds occur.
      </p>

      <h3>At the End of a Long Day</h3>
      <p>
        After a full day of activity, the cumulative effect of muscle fatigue, gravity, and reduced energy can make the knees feel notably heavier than they did in the morning. This is a common experience that reflects the natural limits of muscle endurance.
      </p>

      <h3>During Periods of Low Activity</h3>
      <p>
        Paradoxically, periods of very low activity can also cause knee heaviness. Without regular movement to maintain muscle tone, circulation, and joint fluid flow, the knees may feel heavy and sluggish even during light tasks.
      </p>

      <h2>How Movement Helps Reduce Heaviness</h2>

      <figure className="my-8">
        <img
          src={imgMovementStiffness}
          alt="Comparison showing how movement reduces knee stiffness and heaviness"
          className="w-full h-auto rounded-xl shadow-sm"
          loading="lazy"
        />
        <figcaption className="text-sm text-muted-foreground mt-3 text-center">
          Regular movement helps combat the stiffness and heaviness cycle
        </figcaption>
      </figure>

      <p>
        Regular, consistent movement may help when the pattern is stiffness after inactivity or muscle fatigue. Movement activates the leg muscles and, over time, progressive exercise can build the capacity needed for walking, stairs, and standing. It is not a treatment for unexplained swelling, a blood clot, infection, or sudden weakness.
      </p>

      <h3>Why Movement Breaks Matter</h3>
      <p>
        During prolonged sitting, change position regularly rather than waiting until the knees feel very stiff. If there are no warning signs and walking is safe, stand or take a short comfortable walk at an interval that fits your day. The aim is to interrupt a sustained position, not to meet a rigid timer.
      </p>

      <h3>Gentle Walking as a Reset</h3>
      <p>
        Walking is one of the most accessible ways to combat knee heaviness. A 5 to 10 minute walk activates all the major muscle groups around the knee, promotes circulation, and helps restore the natural rhythm of joint fluid movement. If you experience tightness along with heaviness, our <Link to="/guides/knee-tightness-without-pain" className="text-primary hover:underline">knee tightness without pain guide</Link> offers additional strategies.
      </p>

      <h3>Light Stretching</h3>
      <p>
        Gentle stretching of the quadriceps, hamstrings, and calves helps relieve muscle tension that contributes to heaviness. Stretching improves blood flow to the muscles, reduces stiffness, and can make the knees feel noticeably lighter within minutes.
      </p>

      <h3>Progressive Strengthening</h3>
      <p>
        Building strength in the muscles around the knee increases their endurance and resistance to fatigue. Stronger muscles can support the knee for longer periods before heaviness develops. Exercises like wall sits, leg raises, step-ups, and gentle squats gradually build this capacity. For a comprehensive routine, see our <Link to="/guides/knee-pain-exercises-guide" className="text-primary hover:underline">knee exercises guide</Link>.
      </p>
      <p>
        If heaviness is paired with knee pain that consistently builds during long periods on your feet, the guide to <Link to="/guides/knee-pain-after-standing" className="text-primary hover:underline">standing-related knee pain at work</Link> helps separate static standing, hard-floor, footwear, and swelling patterns.
      </p>

      <TipsList tips={[
        "Change position regularly during prolonged sitting",
        "Walk for 5 to 10 minutes to reset circulation and muscle activity",
        "Stretch quadriceps, hamstrings, and calves daily",
        "Build leg strength gradually with low-impact exercises",
        "Stay hydrated to support muscle function and joint lubrication",
        "Elevate legs briefly after long periods of standing",
        "Choose low-impact activities like swimming or cycling for joint-friendly conditioning",
      ]} />

      <h2>Daily Habits That Support Lighter Knee Movement</h2>

      <figure className="my-8">
        <img
          src={imgKneeSupportMuscles}
          alt="Illustration of muscles that support the knee joint"
          className="w-full h-auto rounded-xl shadow-sm"
          loading="lazy"
        />
        <figcaption className="text-sm text-muted-foreground mt-3 text-center">
          Strong, well-conditioned muscles help knees feel lighter during daily activities
        </figcaption>
      </figure>

      <p>
        Consistent daily habits can help an activity-related fatigue or stiffness pattern. The most useful plan is one you can progress gradually and adjust according to the knee's response, while obtaining an assessment when symptoms are persistent, swollen, one-sided, or worsening.
      </p>

      <h3>Stay Active Throughout the Day</h3>
      <p>
        Rather than concentrating all your activity into one exercise session, distribute movement throughout your day. Regular gentle activity maintains muscle tone, keeps circulation flowing, and prevents the buildup of stiffness and heaviness that comes from prolonged inactivity.
      </p>

      <h3>Strengthen Your Leg Muscles</h3>
      <p>
        Strong quadriceps, hamstrings, and calves can improve capacity for walking, stairs, and standing up. Start with a tolerable exercise, range, and resistance, then progress gradually. A physiotherapist can help select a starting level if ordinary exercises provoke pain, swelling, or instability.
      </p>

      <h3>Stay Hydrated</h3>
      <p>
        Drink according to thirst and any medical guidance you have been given. Hydration is important for general health and exercise, but drinking extra water is not a specific treatment for knee heaviness or lower-leg swelling. People with heart, kidney, or other conditions may have individualized fluid advice.
      </p>

      <h3>Maintain a Healthy Activity Balance</h3>
      <p>
        Finding the right balance between activity and rest is important. Too much activity without adequate recovery can lead to chronic muscle fatigue, while too little activity can lead to deconditioning. Listen to your body and adjust your activity levels to maintain comfortable, sustainable movement patterns.
      </p>

      <h3>Choose Supportive Footwear</h3>
      <p>
        Well-fitting, supportive shoes help distribute forces more evenly through the legs and reduce unnecessary strain on the knee-supporting muscles. Worn-out or unsupportive footwear can increase the effort required during walking, contributing to earlier muscle fatigue and heaviness.
      </p>

      <h3>Monitor Your Posture</h3>
      <p>
        How you sit and stand affects how your leg muscles and circulation function. Sitting with your legs crossed, standing with locked knees, or adopting other sustained positions can restrict circulation and contribute to heaviness. Being mindful of your posture throughout the day helps maintain healthy blood flow. For understanding how different knee sensations map to specific areas, check our <Link to="/guides/knee-pain-locations-visual-guide" className="text-primary hover:underline">knee pain location guide</Link>.
      </p>

      <h2>When Knee Heaviness Should Be Evaluated</h2>

      <p>
        A short-lived, symmetrical tired feeling after unusual activity may settle as the muscles recover. The following patterns need a different response because heaviness can be the first word someone uses for swelling, weakness, or a whole-leg problem.
      </p>

      <h3>Persistent Heaviness Without Clear Cause</h3>
      <p>
        If your knees consistently feel heavy even after adequate rest and regular activity, it may be worth discussing with a healthcare professional. Persistent heaviness without an obvious trigger could indicate an underlying factor that would benefit from evaluation.
      </p>

      <h3>Heaviness Accompanied by Swelling</h3>
      <p>
        Recurrent swelling in both legs, or swelling that does not improve, should be discussed with a healthcare professional. Unexplained swelling in one leg needs urgent advice, particularly when it is painful, tender, warm, red, or discolored. These symptoms can occur with a deep vein thrombosis, although only a medical assessment can determine the cause.
      </p>

      <h3>Numbness or Tingling</h3>
      <p>
        Numbness, tingling, foot drag, or difficulty controlling the leg may involve a nerve or another problem outside the knee. New or progressive weakness should be assessed. Sudden major weakness or neurological symptoms affecting more than the knee require urgent care.
      </p>

      <h3>Progressive Worsening</h3>
      <p>
        Knee heaviness that progressively worsens over time despite maintaining regular activity and healthy habits should be discussed with a healthcare provider to rule out any contributing factors.
      </p>

      <InfoBox title="Urgent and Emergency Warning Signs">
        <p><strong>Seek urgent medical advice</strong> for unexplained one-sided leg swelling, especially with pain, tenderness, warmth, redness, or discoloration; sudden severe swelling; a hot red knee with fever; inability to bear weight; or a knee that is badly swollen or misshapen. <strong>Call emergency services</strong> for sudden breathlessness, chest pain, coughing up blood, fainting, confusion, or feeling acutely unwell. These combinations should not be managed with heat, massage, or exercise while waiting to see whether they pass.</p>
      </InfoBox>

      <p>
        Understanding why your knees feel heavy starts with describing the pattern accurately. Fatigue, stiffness, swelling, and weakness are not interchangeable, and the right response depends on which clues are present. For an uncomplicated activity-related pattern, gradual capacity building can be useful. For persistent, one-sided, swollen, or progressive symptoms, an assessment is the safer next step.
      </p>

      <ArticleSourcesBox>
      <ul>
        <li><a href="https://www.nhs.uk/conditions/oedema/" target="_blank" rel="noreferrer" className="font-medium text-blue-600 underline underline-offset-4 hover:text-blue-700">NHS: Swollen ankles, feet and legs (oedema)</a></li>
        <li><a href="https://www.nhs.uk/conditions/deep-vein-thrombosis-dvt/" target="_blank" rel="noreferrer" className="font-medium text-blue-600 underline underline-offset-4 hover:text-blue-700">NHS: Deep vein thrombosis (DVT)</a></li>
        <li><a href="https://www.cdc.gov/blood-clots/about/" target="_blank" rel="noreferrer" className="font-medium text-blue-600 underline underline-offset-4 hover:text-blue-700">CDC: About venous thromboembolism</a></li>
        <li><a href="https://www.nhs.uk/symptoms/knee-pain/" target="_blank" rel="noreferrer" className="font-medium text-blue-600 underline underline-offset-4 hover:text-blue-700">NHS: Knee pain and urgent warning signs</a></li>
      </ul>
    </ArticleSourcesBox>
    </>
  ),
};

export const heavyFeelingInKnees: ArticleExport = { article, cta: "heavy-feeling-in-knees" };

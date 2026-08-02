import { Link } from "react-router-dom";
import type { ArticleExport } from "./types";
import heroImage from "@/assets/guide-thumbnails/wave-3-46-50/are-knees-over-toes-bad.webp";
import loadMapImage from "@/assets/article-diagrams/wave-3-46-50/knees-over-toes-load-map.svg";
import progressionImage from "@/assets/article-diagrams/wave-3-46-50/knees-over-toes-progression-check.svg";

const linkClass = "font-medium text-primary underline underline-offset-4 hover:text-primary/80";

export const areKneesOverToesBad: ArticleExport = {
  cta: "",
  article: {
    slug: "are-knees-over-toes-bad",
    title: "Are Knees Over Toes Bad? What the Evidence and Load Actually Mean",
    subtitle:
      "Why the toe line is not an injury boundary, how forward knee travel redistributes demand, and how to train it without chasing a trend",
    intro:
      "For years, many people were told never to let their knees pass their toes. More recently, knees-over-toes exercises have been promoted as the route to unusually resilient knees. Both messages turn a normal movement into a slogan. Your knees move forward when you climb stairs, lower into a chair, lunge, and squat. That position is not automatically dangerous or therapeutic. What matters is how much load, depth, speed, and weekly exposure your knee can currently handle.",
    quickAnswer:
      "Knees moving over the toes are not automatically bad. Forward knee travel usually increases the demand placed on the knee while allowing a more upright trunk and sharing less demand with the hip. Forcing the knees back does not remove load; it shifts more of it toward the hips and trunk. Use a range you can control, progress one variable at a time, and modify the task if pain, swelling, locking, or instability appears.",
    metaTitle: "Are Knees Over Toes Bad? Evidence, Squats and Safe Progression",
    metaDescription:
      "Are knees over toes bad in squats or lunges? Learn what the phrase means, how forward knee travel changes load, and how to build tolerance safely.",
    heroImage,
    publishedDate: "August 2, 2026",
    lastUpdated: "August 2, 2026",
    nextSlug: "tibialis-raises-knee-strength",
    nextTitle: "Tibialis Raises for Knee Strength",
    seoTags:
      "are knees over toes bad, knees over toes exercises, knees over toes squat, squat knees over toes, knee over toes, what does knees over toes mean, knees past toes squat, forward knee travel squat, knees over toes treadmill, knees over toes sled, knees over toes lunge",
    faqs: [
      {
        question: "Are knees over toes bad when squatting?",
        answer:
          "No universal toe-line rule separates a safe squat from an unsafe one. Allowing the knees to travel forward generally raises knee demand, while deliberately restricting that travel shifts more demand toward the hips and trunk. Depth, external load, speed, fatigue, symptoms, and individual proportions all affect whether a squat is appropriate for you."
      },
      {
        question: "What does knees over toes mean?",
        answer:
          "It describes a side view in which the front of the knee moves horizontally beyond the toes during a squat, split squat, step-down, or similar task. It is a position, not a diagnosis, exercise system, or measure of tissue damage. Footwear, heel elevation, stance, limb proportions, and camera angle can all change how it looks."
      },
      {
        question: "Do knees-over-toes exercises strengthen the knees?",
        answer:
          "They can train the quadriceps and other lower-limb muscles when the exercise, range, and dose are appropriate. The benefit comes from progressive resistance and adaptation, not from crossing an invisible line at the toes. A complete program usually also includes hip strength, calf capacity, balance, and task-specific practice."
      },
      {
        question: "Should my knees go over my toes during lunges?",
        answer:
          "They may, especially with a shorter step or a deeper forward lunge. A longer step can reduce forward travel and change patellofemoral demand. Neither version is automatically correct for everyone. Choose the step length and depth that match your goal, remain controlled, and do not cause an unacceptable same-day or next-day response."
      },
      {
        question: "Is a knees-over-toes treadmill the same as a backward sled?",
        answer:
          "No. Backward treadmill walking is a moving-belt gait task, while a backward sled adds external resistance and requires repeated backward steps. Research on backward walking cannot simply be transferred to a loaded sled. Both also create different balance, equipment, and progression demands."
      },
      {
        question: "When should knee pain during a squat be assessed?",
        answer:
          "Arrange an assessment when pain persists, worsens, repeatedly changes your training, or is accompanied by recurring swelling, catching, or loss of motion. Seek prompt medical guidance after a clear injury if you cannot bear weight, the knee is badly swollen or deformed, it locks or repeatedly gives way, or it becomes hot and red with fever."
      }
    ],
    sources: [
      {
        title: "Effect of knee position on hip and knee torques during the barbell squat",
        publisher: "Journal of Strength and Conditioning Research via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/14636100/"
      },
      {
        title: "Comparison of the angles and corresponding moments in the knee and hip during restricted and unrestricted squats",
        publisher: "Journal of Strength and Conditioning Research via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/22801421/"
      },
      {
        title: "Patellofemoral joint kinetics while squatting with and without an external load",
        publisher: "Journal of Orthopaedic and Sports Physical Therapy via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/11949662/"
      },
      {
        title: "Patellofemoral joint kinetics in females when using different depths and loads during the barbell back squat",
        publisher: "European Journal of Sport Science via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/32781938/"
      },
      {
        title: "Patellofemoral Joint Loading in Forward Lunge With Step Length and Height Variations",
        publisher: "Journal of Applied Biomechanics via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/35697336/"
      },
      {
        title: "Can Backward Sled Towing Potentiate Sprint Performance?",
        publisher: "Journal of Strength and Conditioning Research via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/31403574/"
      },
      {
        title: "Best practice guide for patellofemoral pain based on synthesis of a systematic review, the patient voice and expert clinical reasoning",
        publisher: "British Journal of Sports Medicine via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/39401870/"
      },
      {
        title: "Patellofemoral Pain Syndrome",
        publisher: "American Academy of Orthopaedic Surgeons",
        url: "https://www.orthoinfo.org/diseases--conditions/patellofemoral-pain-syndrome/"
      },
      {
        title: "Knee pain",
        publisher: "NHS",
        url: "https://www.nhs.uk/symptoms/knee-pain/"
      }
    ],
    content: (
      <>
        <p>
          Search results for <strong>are knees over toes bad</strong> often place two absolute claims beside each other. One says the knee must never pass the toes. The other says everyone should force it as far forward as possible. Biomechanics does not support either shortcut. Moving the knee forward changes joint angles and how demand is shared, but a single paused frame cannot reveal the total load, the condition of the knee, or how the person responds afterward.
        </p>
        <p>
          This article focuses on that movement question. If you already have pain at a particular point in the squat, use the separate guide to <Link to="/guides/knee-pain-when-squatting" className={linkClass}>knee pain when squatting</Link>. It maps the painful phase, location, depth, and training dose without making the toe line the diagnosis.
        </p>

        <h2>What Does Knees Over Toes Mean?</h2>
        <p>
          “Knees over toes” describes the horizontal position of the knee relative to the front of the foot. During a deep squat or short-step lunge, the shin angles forward and the knee may appear in front of the toes. The phrase does not name one exercise, one program, or one type of knee. It is simply a visual description of forward knee travel.
        </p>
        <p>
          The same person can look different without changing tissue capacity. Weightlifting shoes or a heel wedge can make a more upright, deeper squat possible. A wider stance, longer femurs, a different toe angle, or a longer lunge step can change the knee's position. Even camera height and whether the image is taken at the deepest point can alter the impression. Treat the toe line as a clue about the task, not a safety boundary.
        </p>

        <h2>Are Knees Over Toes Bad in a Squat?</h2>
        <p>
          The best-known study behind this debate compared restricted and unrestricted barbell squats in seven trained men. A wooden barrier prevented forward knee travel in the restricted version. Knee torque was lower, but hip torque rose greatly and the participants leaned farther forward. The study showed that changing technique redistributes demand. It did not measure injury, pain, cartilage damage, or long-term outcomes, and seven people cannot define a universal safe squat.
        </p>
        <p>
          A later study of 20 participants also found higher maximum knee moments and lower hip moments in unrestricted squats. However, the unrestricted group reached a deeper knee angle, so depth and toe travel were not cleanly separated. The practical lesson is narrower than many posts suggest: allowing more forward travel can increase knee demand, while restricting it can increase hip and trunk demand. Neither result proves that one variation is inherently harmful.
        </p>

        <figure className="my-9">
          <img
            src={loadMapImage}
            alt="Comparison of natural forward knee travel and deliberately restricted knee travel during a squat, showing how demand shifts between the knee, hip, and trunk"
            className="h-auto w-full rounded-2xl border border-slate-200 shadow-sm"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">
            Preventing forward travel can lower one demand while raising another. Load is redistributed rather than erased.
          </figcaption>
        </figure>

        <h2>Why the Toe Line Is Not an Injury Threshold</h2>
        <p>
          An injury threshold would need to distinguish an acceptable exposure from a damaging one. The toe line does not contain information about external weight, repetitions, speed, recent training, tissue history, sleep, recovery, or symptoms. A controlled bodyweight split squat with the knee past the toes may be easier than a heavy shallow barbell squat in which it stays behind them.
        </p>
        <p>
          Joint force is also not synonymous with injury. Muscles and joints need load to maintain and build capacity. Problems are more likely when the exposure exceeds what a person can tolerate or recover from, particularly after a rapid increase. The goal is not to minimize every force. It is to select a useful dose, allow adaptation, and adjust when the response says the dose was too high.
        </p>

        <h2>What Changes When the Knee Travels Forward?</h2>
        <h3>Knee extensor demand usually rises</h3>
        <p>
          As the knee moves forward and bends, the quadriceps generally work harder to control and reverse the movement. That is why a knees-over-toes squat can be a useful quadriceps exercise. It is also why a sensitive patellofemoral joint or patellar tendon may prefer less depth, less load, or a different variation at first. Around-the-kneecap symptoms are covered in the guide to <Link to="/guides/pain-behind-kneecap" className={linkClass}>pain behind the kneecap</Link>.
        </p>
        <h3>The trunk may stay more upright</h3>
        <p>
          Letting the shin angle forward can make it easier to keep the center of mass over the feet with a more upright torso. Forcing a vertical shin may require the hips to move farther back and the torso to incline. That can be appropriate for a hip-dominant exercise, but it is not automatically a safer way to move.
        </p>
        <h3>The ankle needs to participate</h3>
        <p>
          Forward shin travel uses ankle dorsiflexion. Calf stiffness, ankle-joint restriction, footwear, and foot position can all change the range available. Limited motion does not mean you should force the knee farther. It means the ankle and the goal of the exercise deserve attention. See the guide to <Link to="/guides/tight-calves-knee-pain" className={linkClass}>tight calves, ankle motion, and knee load</Link> for that separate problem.
        </p>

        <h3>Body proportions change the picture</h3>
        <p>
          Two people can perform equally controlled squats and show different amounts of forward travel. Someone with longer thighs may need more trunk lean, more knee travel, a wider stance, or some combination to keep balance over the foot. Torso length and ankle range also influence the solution. This is why copying the outline of another person's squat is less useful than checking balance, control, load, and recovery in your own variation.
        </p>

        <h2>Depth, Load, and Volume Matter More Than a Snapshot</h2>
        <p>
          Laboratory work consistently shows that squat depth and external resistance change patellofemoral loading. In one study of healthy adults squatting to 90 degrees, estimated patellofemoral force and stress rose with deeper flexion and were greater with an added load. A study of experienced female lifters similarly found that reaction force increased with load and was higher below parallel than at shallower depths.
        </p>
        <p>
          These studies use biomechanical models, small samples, and controlled repetitions. They do not provide a number at which injury begins. They do show why “my knee was behind my toe” is incomplete training information. Record the variation, depth, resistance, sets, repetitions, speed, and next-day response. If the knee reacts only after a large session, the <Link to="/guides/knee-pain-after-exercise" className={linkClass}>post-exercise knee pain guide</Link> is more relevant than another form cue.
        </p>

        <h2>Knees-Over-Toes Exercises Are Not One Exercise</h2>
        <h3>Squat</h3>
        <p>
          A heel-elevated or counterbalanced squat often permits more forward travel and a more upright trunk. Start with a support or a target that limits depth. The exercise should be selected because it matches the training goal, not because the knee must cross the toe on every repetition.
        </p>
        <h3>Split squat or forward lunge</h3>
        <p>
          A shorter step usually allows the front knee to travel farther, while a longer step changes the joint angles and load distribution. Research on forward lunges shows that patellofemoral loading varies with knee angle, step length, platform height, and movement phase. Adjusting the step is a useful dose change, not an admission that one position is defective.
        </p>
        <h3>Step-down</h3>
        <p>
          A low step-down can train controlled forward shin movement in a task that resembles stairs. Hold a rail, lower the free heel toward the floor, and begin with a small height. Ordinary stair climbing already involves forward travel, so the aim is to make the chosen dose predictable. If stairs are the main trigger, use the guide to <Link to="/guides/knee-pain-climbing-stairs" className={linkClass}>knee pain while climbing stairs</Link>.
        </p>

        <h2>Backward Treadmill vs Reverse Sled</h2>
        <p>
          “Knees over toes treadmill” and reverse sled work are often grouped together online, but they are different tasks. Backward treadmill walking uses a moving belt and creates a balance concern. A reverse sled adds external resistance, friction, and a performance demand. Published backward-sled research has largely examined short-term sport performance rather than knee-pain rehabilitation, so it does not validate a promise that sled dragging repairs a painful knee.
        </p>
        <p>
          Backward walking has its own clinical evidence and safety rules, especially for people with knee osteoarthritis. The complete <Link to="/guides/backward-walking-knee-pain" className={linkClass}>backward walking for knee pain guide</Link> explains treadmill versus floor practice. Do not copy a backward-walking protocol and assume it is an equivalent sled prescription.
        </p>

        <h2>How to Build Tolerance Without Chasing Maximum Range</h2>
        <ol className="my-4 list-decimal space-y-3 pl-6">
          <li><strong>Choose a stable starting variation.</strong> A supported split squat, shallow squat to a box, or low step-down makes range easy to control.</li>
          <li><strong>Use a comfortable range.</strong> Stop before technique becomes hurried or pain rises sharply. Maximum toe travel is not the objective.</li>
          <li><strong>Keep the first dose modest.</strong> Two or three small sets can reveal more than a high-volume test.</li>
          <li><strong>Change one variable.</strong> Add depth, resistance, repetitions, or frequency separately so the response is interpretable.</li>
          <li><strong>Check ordinary function.</strong> Walking, stairs, and chair rises should be no worse later that day or the following morning.</li>
        </ol>
        <p>
          There is no universal pain score that makes a repetition safe. Mild, stable discomfort may be acceptable in some rehabilitation plans, while sharp, escalating, or movement-changing pain is a reason to reduce or stop. A broader <Link to="/guides/how-to-strengthen-knees" className={linkClass}>knee strengthening program</Link> should also train the hips, thighs, calves, and tasks you actually need.
        </p>

        <figure className="my-9">
          <img
            src={progressionImage}
            alt="Knees-over-toes progression guide showing range, load, speed, and weekly dose as separate dials, with same-day and next-morning response checks"
            className="h-auto w-full rounded-2xl border border-slate-200 shadow-sm"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">
            Progressing one dial at a time makes it easier to identify the dose your knee can recover from.
          </figcaption>
        </figure>

        <h2>Common Mistakes</h2>
        <ul>
          <li><strong>Forcing range to match a video.</strong> Limb proportions, ankle motion, stance, and training history differ.</li>
          <li><strong>Adding depth and weight together.</strong> This hides which change caused the response.</li>
          <li><strong>Using a heel lift as proof of ankle mobility.</strong> It changes the task; it does not diagnose or permanently change the ankle.</li>
          <li><strong>Judging only the warm-up.</strong> A knee may feel fine during training and react later as total exposure becomes clear.</li>
          <li><strong>Treating exercise burn as the goal.</strong> Quadriceps effort can be expected, but sharp joint pain, swelling, or instability is not a better stimulus.</li>
        </ul>

        <h2>When to Get Medical Help</h2>
        <div className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="mb-0 text-slate-700">
            Stop testing the position after a clear injury, with rapid swelling, a knee that locks or repeatedly gives way, or an inability to bear weight normally. A hot, red, swollen knee with fever or feeling unwell needs prompt medical guidance. Recurring swelling after training also deserves more than a technique debate; use the guide to <Link to="/guides/knee-swelling-after-exercise" className={linkClass}>knee swelling after exercise</Link> and arrange an assessment when it persists.
          </p>
        </div>

        <h2>The Bottom Line</h2>
        <p>
          Knees over toes is a normal position that changes how load is shared. It is neither an automatic injury mechanism nor a secret requirement for healthy knees. Allowing forward travel can increase knee demand and reduce some hip or trunk demand. The useful version is the one that fits your goal, remains controlled, and produces a response you can recover from. Build range, resistance, and volume gradually, and let symptoms and function guide the next step rather than an invisible line at the front of the shoe.
        </p>
      </>
    )
  }
};

import { Link } from "react-router-dom";
import type { ArticleExport } from "./types";
import heroImage from "@/assets/guide-thumbnails/wave-3/rucking-knee-pain.webp";
import loadDialsImage from "@/assets/article-diagrams/wave-3/rucking-four-load-dials.svg";
import packFitHillsImage from "@/assets/article-diagrams/wave-3/rucking-pack-fit-hills.svg";

const linkClass = "font-medium text-primary underline underline-offset-4 hover:text-primary/80";

export const ruckingKneePain: ArticleExport = {
  cta: "",
  article: {
    slug: "rucking-knee-pain",
    title: "Rucking With Bad Knees: Backpack Weight, Hills, and Footwear",
    subtitle:
      "A practical guide to load, distance, pace, pack fit, hills, shoes, and the knee response that should decide your next ruck",
    intro:
      "Rucking looks almost identical to walking until the backpack goes on. Then every step carries more load, hills become less forgiving, and a small fit problem can repeat thousands of times. That does not mean someone with a history of knee pain must avoid rucking forever. It means the pack, route, pace, and distance need to be treated as separate training variables instead of being increased together.",
    quickAnswer:
      "You may be able to ruck with a history of knee pain, but do not begin by copying a military load or an online body-weight percentage. Establish comfortable unloaded walking first. Add an empty or very light, secure pack on a level route, then change only one variable: weight, distance, pace, or terrain. Reduce the dose if your gait changes or symptoms are worse later that day or the next morning. Swelling, locking, repeated giving way, inability to bear weight, or pain after a new injury needs clinical assessment.",
    metaTitle: "Rucking With Bad Knees: Weight, Hills, and Footwear",
    metaDescription:
      "Can you go rucking with bad knees? Learn how backpack weight, distance, pace, hills, pack fit and footwear affect knee demand and warning signs.",
    heroImage,
    publishedDate: "July 31, 2026",
    lastUpdated: "July 31, 2026",
    nextSlug: "padel-knee-pain",
    nextTitle: "Padel Knee Pain",
    seoTags:
      "rucking with bad knees, is rucking bad for your knees, rucking knee pain, knee pain after rucking, how much weight should I ruck with, beginner ruck weight, rucking weight percentage, rucking downhill knee pain, best shoes for rucking, boots vs running shoes for rucking, rucking insoles, rucksack fit",
    faqs: [
      {
        question: "Is rucking bad for your knees?",
        answer:
          "Rucking is not automatically bad for every knee, but adding a backpack increases the demand of walking. Weight, distance, pace, hills, surface, and recovery all matter. Begin only from comfortable unloaded walking, progress one variable at a time, and stop for swelling, locking, instability, or a change in your gait."
      },
      {
        question: "Can I ruck with knee arthritis or an old knee injury?",
        answer:
          "Some people with stable symptoms can build load-carrying capacity, while others need a modified route or a different exercise. The diagnosis alone does not set the dose. Start with an assessment if the knee is swollen, unstable, recently injured or operated on, or if a clinician has limited weight bearing."
      },
      {
        question: "How much weight should I carry if I have bad knees?",
        answer:
          "There is no research-backed percentage that is safe for everyone. First confirm that ordinary walking is comfortable. Then use an empty or very lightly loaded pack and choose a weight that does not change your gait. Keep distance, pace, and terrain steady before adding a small amount. Military targets are not beginner recreational prescriptions."
      },
      {
        question: "Why do my knees hurt downhill with a ruck?",
        answer:
          "Descending requires repeated control as the body and pack move downward. Research on loaded walking suggests a backpack can increase knee extension demand on a decline. Reduce pack weight, choose a gentler grade, slow the descent, avoid hard braking, and use the next-morning response to judge whether the route was too much."
      },
      {
        question: "Are boots or running shoes better for rucking?",
        answer:
          "Neither category is universally better. Prioritize secure fit, enough toe room, suitable traction, comfort under the pack, and familiarity on the actual surface. Boots may add protection and ankle coverage, while running or trail shoes may feel lighter. Evidence does not support one shoe type as a guaranteed knee-pain solution."
      }
    ],
    sources: [
      {
        title: "Foot Marching and Load Carriage",
        publisher: "Defense Centers for Public Health, U.S. Department of Defense",
        url: "https://ph.health.mil/topics/discond/ptsaip/Pages/Foot-Marching.aspx"
      },
      {
        title: "Holistic Health and Fitness, FM 7-22",
        publisher: "Department of the Army",
        url: "https://home.army.mil/cavazos/5517/2115/1094/FM_7-22.pdf"
      },
      {
        title: "Effects of Load Carriage and Step Length Manipulation on Achilles Tendon and Knee Loads",
        publisher: "Military Medicine via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/30839070/"
      },
      {
        title: "Joint Moments and Muscle Excitations Increase With Body-Mass Normalized Backpacks Across Walking Slopes",
        publisher: "Gait & Posture via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/40305925/"
      },
      {
        title: "Profiling Injuries Sustained Following Implementation of a Progressive Load Carriage Program in United States Marine Corps Recruit Training",
        publisher: "Work via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/38552130/"
      },
      {
        title: "The Role of Footwear, Foot Orthosis, and Training-Related Strategies in the Prevention of Bone Stress Injuries: A Systematic Review and Meta-Analysis",
        publisher: "International Journal of Exercise Science via PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/37649463/"
      },
      {
        title: "Knee Pain",
        publisher: "NHS",
        url: "https://www.nhs.uk/symptoms/knee-pain/"
      }
    ],
    content: (
      <>
        <p>
          People searching <strong>rucking with bad knees</strong> are usually asking two different questions. One is whether load carriage will damage the joint. The other is how to begin without causing the same ache that appeared after a previous march, hike, or weighted walk. Neither question can be answered by the weight of the pack alone.
        </p>
        <p>
          Rucking demand is the product of many repeated choices. A 20-pound pack for 20 minutes on level pavement is a different task from the same pack for two hours over steep ground. A secure load close to the torso is different from equipment that swings with every step. A comfortable pace is different from a timed march. The correct comparison is not rucking versus no rucking. It is your current ruck dose versus what your knee is prepared to recover from.
        </p>
        <p>
          This article focuses specifically on weighted backpack walking. If your knee hurts during an unloaded trail day, use the <Link to="/guides/knee-pain-when-hiking" className={linkClass}>knee pain when hiking guide</Link>. If ordinary neighborhood walks already cause symptoms, begin with <Link to="/guides/knee-pain-after-long-walks" className={linkClass}>knee pain after long walks</Link> before adding weight.
        </p>

        <h2>Is Rucking Bad for Your Knees?</h2>
        <p>
          Rucking is not automatically harmful, and extra load is not biologically neutral. Defense public-health guidance describes foot marching and load carriage as repeated stress on the body, with lower-extremity, knee, and back problems among the concerns. Research also shows that backpack load can change forces and joint moments during walking. Those findings establish greater demand. They do not prove that any weighted walk damages a healthy knee.
        </p>
        <p>
          Bodies can adapt to progressive training, but adaptation needs a dose that can be recovered from. A retrospective study in U.S. Marines found that a progressive, periodized load-carriage program was associated with fewer overall injuries and fewer overuse injuries than the comparison approach. This military cohort cannot promise the same result to every recreational rucker, but it supports planned progression over occasional all-out marches.
        </p>
        <p>
          The word "bad" is too vague to set a safe program. A stable history of occasional kneecap ache is different from a recently reconstructed ligament, an acutely swollen joint, a stress injury, inflammatory arthritis, or a knee that gives way. Anyone with current restrictions, recent surgery, or significant instability should obtain individualized guidance before carrying weight.
        </p>

        <h2>What Changes When You Add a Backpack?</h2>
        <p>
          Every step must now move and control body mass plus the pack. The body may alter trunk position, hip motion, step timing, and muscle activity to keep the combined system balanced. The effect depends on pack weight, where the load sits, walking speed, slope, surface, fatigue, and the individual.
        </p>
        <p>
          A laboratory study of 16 male cadets walking with a 20-kilogram pack found increases in estimated Achilles tendon, patellofemoral, and medial tibiofemoral loads. Deliberately shorter steps did not reduce the knee loads in that study, while longer steps increased patellofemoral load the most. The researchers recommended the participants' natural, self-selected step length. This is useful evidence against a simplistic instruction to take tiny steps, but it came from a small, specific group under a heavy fixed load. Use a natural, controlled stride rather than forcing one exact cadence.
        </p>
        <p>
          Another study examined loaded walking across level, uphill, and downhill conditions and found that the backpack affected joint moments and muscle activation across slopes. Added load produced a greater knee-extension moment during downhill walking. That does not mean every descent is dangerous. It explains why a person may tolerate a flat ruck but feel the same pack at the front of the knee during a long decline.
        </p>

        <figure className="my-9">
          <img
            src={loadDialsImage}
            alt="Four rucking load variables showing pack weight, distance, pace, and terrain as separate progression dials"
            className="h-auto w-full rounded-2xl border border-slate-200 shadow-sm"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">
            Keep three variables steady and change one. This makes the knee response easier to interpret and the next decision easier to explain.
          </figcaption>
        </figure>

        <h2>Use Pain Location and Timing as Clues</h2>
        <p>
          Pain location is helpful, but it does not diagnose the tissue. An ache around or behind the kneecap may be sensitive to longer walks, hills, squatting, and stairs. Pain along the inner or outer joint line can have several explanations. Discomfort below the kneecap may react differently to speed and climbing. Use the <Link to="/guides/knee-pain-locations-visual-guide" className={linkClass}>knee pain location map</Link> to describe the pattern accurately when speaking with a clinician.
        </p>
        <div className="my-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-[780px] w-full border-collapse text-left text-sm">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="px-4 py-3">When symptoms appear</th>
                <th className="px-4 py-3">What to review first</th>
                <th className="px-4 py-3">Useful first adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-600">
              <tr>
                <td className="px-4 py-3">Within the first few minutes</td>
                <td className="px-4 py-3">Current irritability, pack fit, previous injury, and unloaded walking tolerance</td>
                <td className="px-4 py-3">Stop the loaded test and return to comfortable walking or assessment</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Only after distance accumulates</td>
                <td className="px-4 py-3">Total time, previous weekly mileage, surface, and recovery</td>
                <td className="px-4 py-3">Shorten duration while holding the same easy route and weight</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Mainly on descents</td>
                <td className="px-4 py-3">Hill grade, descent time, braking pattern, and pack weight</td>
                <td className="px-4 py-3">Choose a gentler route or reduce load before changing footwear</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Later that evening or next morning</td>
                <td className="px-4 py-3">The combined dose, not only the moment pain was first noticed</td>
                <td className="px-4 py-3">Repeat a lower dose until recovery becomes predictable</td>
              </tr>
              <tr>
                <td className="px-4 py-3">With swelling, locking, or giving way</td>
                <td className="px-4 py-3">Possible injury or joint problem rather than normal training fatigue</td>
                <td className="px-4 py-3">Stop rucking and arrange clinical assessment</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>How Much Weight Should You Ruck With?</h2>
        <p>
          The honest answer is that there is no universally safe rucking weight percentage. Online programs often present a fixed percentage of body weight as if it were a medical threshold. Research does not validate one percentage for every age, body size, training history, route, pack, and knee condition.
        </p>
        <p>
          U.S. Army guidance discusses load-carriage progression in a military readiness context and says loads above 30 percent of body weight should be increased with caution. That is not a beginner target or a universal medical threshold. Military personnel train for occupational demands that may be unnecessary for general fitness, and a caution should not be converted into a target.
        </p>
        <p>
          Start with ability, not ambition. You should first be able to complete the planned route without a pack and without limping, escalating pain, or an unusually worse next morning. Then walk it with the empty pack. If the pack itself is comfortable and secure, add a very light load that does not alter posture or stride. There is no prize for jumping directly to 20, 30, or 40 pounds.
        </p>
        <p>
          When the same load and route are predictable for more than one session, add a small amount of weight or a modest amount of time, not both. Someone returning from knee pain may progress more slowly than a pain-free runner, hiker, or service member. That is appropriate.
        </p>

        <h2>Distance and Pace Can Matter as Much as Weight</h2>
        <p>
          A light pack carried for a long distance can produce more repeated knee cycles than a heavier pack used briefly. Faster marching can raise impact and fatigue while leaving less time to adjust foot placement. Timed events also encourage people to ignore early signs and chase an average pace that does not match the terrain.
        </p>
        <p>
          Choose minutes before miles when you are starting. A short loop near home makes it easy to stop. Keep the first sessions conversational and avoid shuffling into a run unless the plan specifically includes loaded running and you are prepared for it. If pace is the goal, build it after the load and distance are stable.
        </p>
        <p>
          Track actual exposure. "One ruck" could mean 25 easy minutes or a four-hour event. Record weight, time, distance, surface, hills, and the knee response later that day. This simple log is more useful than relying on memory after several variables changed.
        </p>

        <h2>Why Downhill Rucking Can Hurt More</h2>
        <p>
          Descending requires the leg muscles to control the downward movement of the body and pack repeatedly. People often lean back and brake hard with the foot far ahead, especially when the grade feels unsafe. The front of the knee may notice this combination even when the uphill section felt harder for breathing.
        </p>
        <p>
          Reduce the challenge at the route level first. Choose a gentle grade, shorten the descent, lower pack weight, and slow enough to maintain control. Use a natural stride and avoid deliberately reaching far forward. Trekking poles may improve confidence and distribute some work for some hikers, but they require technique and are not a guarantee against knee pain.
        </p>
        <p>
          If unloaded stairs and hills produce the same pain, the issue is not specific to rucking. See the guides to <Link to="/guides/knee-pain-going-down-stairs" className={linkClass}>knee pain going down stairs</Link> and <Link to="/guides/knee-pain-climbing-stairs" className={linkClass}>knee pain climbing stairs</Link> before adding more load.
        </p>

        <figure className="my-9">
          <img
            src={packFitHillsImage}
            alt="Rucking pack fit and terrain diagram showing a secured backpack plus level, uphill, and downhill walking"
            className="h-auto w-full rounded-2xl border border-slate-200 shadow-sm"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">
            A secure pack limits unwanted movement. Hills still change the task, so route selection remains a separate training decision.
          </figcaption>
        </figure>

        <h2>Pack Fit: Reduce Movement Before Adding Weight</h2>
        <p>
          The pack should feel like part of the torso rather than a pendulum. Tighten both shoulder straps evenly, use the sternum strap if available without restricting breathing, and use the hip belt if the pack is designed for one. Keep dense items secure and close to the back instead of allowing them to roll at the bottom.
        </p>
        <p>
          Exact load placement depends on pack design and terrain, but any setup that bounces, shifts sideways, rubs, or pulls you into an uncomfortable lean needs correction. Stop and repack rather than accepting poor fit as conditioning. Water movement inside a partially filled container can also make a light load feel unstable, so use secured plates, sandbags, or tightly packed items suited to the bag.
        </p>
        <p>
          Shoulder discomfort may tempt you to loosen the straps until the pack hangs away from the body. That can increase movement and change posture. A different pack size or harness may be more sensible than forcing a bag that does not fit. Defense public-health guidance also emphasizes load distribution, properly adjusted straps, hip belts, and gradual progression.
        </p>

        <h2>Boots vs Running Shoes for Rucking</h2>
        <p>
          Search results often promise one "best rucking shoe for bad knees." Evidence does not justify that universal claim. Boots can provide protection, durability, ankle coverage, and traction for rough or occupational terrain. Trail-running shoes can feel lighter and may be comfortable for recreational paths. Road-running shoes may work on pavement but can lack grip or stability for mud, loose rock, or heavy sled-like pushing.
        </p>
        <p>
          Prioritize fit first. The heel should feel secure, toes should have room, and the upper should not create pressure when feet swell over distance. Test footwear with the actual pack on a short route. A shoe that feels comfortable in a store may behave differently under load on a cambered road or descent.
        </p>
        <p>
          A systematic review of footwear and orthoses for bone stress injury prevention found low-certainty evidence and important uncertainty. That review is not a direct knee-pain rucking trial, but it reinforces a cautious message: footwear is one part of exposure management, not protective armor. Replace worn footwear when traction or structure is clearly compromised, but do not expect a new shoe to solve excessive weight, distance, and hills.
        </p>

        <h2>Do Insoles Help With Rucking Knee Pain?</h2>
        <p>
          Insoles may change comfort or pressure distribution, especially when the original liner is thin or the foot moves excessively inside the shoe. They can also reduce space and create new heel or toe pressure. Try them first during unloaded walking, then a short light ruck. Stop if numbness, rubbing, arch pain, or a new gait change appears.
        </p>
        <p>
          People with flat feet or overpronation sometimes assume an insole must correct the knee. Foot motion is only one part of a chain that includes the ankle, calf, hip, load, surface, and training history. The guide to <Link to="/guides/flat-feet-overpronation-knee-pain" className={linkClass}>flat feet, overpronation, and knee pain</Link> explains this relationship, while the <Link to="/guides/best-insoles-for-knee-pain-2026" className={linkClass}>knee-pain insole guide</Link> covers fit and realistic expectations.
        </p>

        <h2>A Conservative Beginner Rucking Progression</h2>
        <p>
          This example is for a person who can already walk comfortably, has no medical restriction, and is not preparing for a required military test. It is deliberately based on decisions rather than a fixed percentage. Repeat a stage if the knee response is not predictable. There is no need to advance every week.
        </p>
        <div className="my-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-[820px] w-full border-collapse text-left text-sm">
            <thead className="bg-emerald-900 text-white">
              <tr>
                <th className="px-4 py-3">Stage</th>
                <th className="px-4 py-3">Session</th>
                <th className="px-4 py-3">Keep steady</th>
                <th className="px-4 py-3">Advance only when</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-600">
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-950">1. Baseline</td>
                <td className="px-4 py-3">Comfortable unloaded walk on a level short loop</td>
                <td className="px-4 py-3">Easy pace and familiar footwear</td>
                <td className="px-4 py-3">Walking, stairs, and next morning remain at baseline</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-950">2. Pack fit</td>
                <td className="px-4 py-3">Same loop with the empty pack</td>
                <td className="px-4 py-3">Distance, pace, and terrain</td>
                <td className="px-4 py-3">The pack stays secure without changing gait</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-950">3. Light load</td>
                <td className="px-4 py-3">Add a small secured load and shorten the walk if needed</td>
                <td className="px-4 py-3">Level route and easy pace</td>
                <td className="px-4 py-3">More than one session produces a predictable response</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-950">4. One progression</td>
                <td className="px-4 py-3">Add a little weight, time, pace, or gentle terrain</td>
                <td className="px-4 py-3">The other three variables</td>
                <td className="px-4 py-3">No swelling, limp, instability, or escalating next-day pain</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Leave recovery between loaded walks, particularly after a new weight or hill exposure. Army programming advises changing variables progressively and avoiding consecutive long foot marches, endurance runs, and heavy leg-strength days. Recreational ruckers do not need to copy military programming, but the scheduling principle is useful: three differently named sessions can still load the same knees.
        </p>

        <h2>Can You Ruck With Knee Arthritis or an Old Injury?</h2>
        <p>
          A diagnosis does not provide a universal yes or no. Some people with stable osteoarthritis tolerate progressive walking and strength work well. Someone with a recently irritated knee may need to establish unloaded capacity before adding a pack. A reconstructed ligament may feel excellent but still be subject to return-to-sport criteria. An old meniscus injury may be quiet on level ground and react to deep uneven descents.
        </p>
        <p>
          Start with present function. Can you walk the route without load? Is the knee free of new swelling and instability? Can you climb ordinary stairs with a familiar pattern? Have you been cleared for unrestricted weight bearing? If those answers are uncertain, an assessment can save weeks of trial and error.
        </p>
        <p>
          General strength work can improve the capacity available for load carriage. Squat, step, calf, hip, and trunk exercises can be selected around the knee's current tolerance. Use the <Link to="/guides/how-to-strengthen-knees" className={linkClass}>how to strengthen knees guide</Link> for a broader framework. A sleeve may provide warmth or light compression, but it does not replace stability testing or graded exposure. See <Link to="/guides/knee-brace-vs-compression-sleeve" className={linkClass}>knee brace versus compression sleeve</Link> before treating all supports as interchangeable.
        </p>

        <h2>Knee Pain After Rucking: What to Do Next</h2>
        <p>
          If an ache appears after the pack comes off, record the session while it is fresh: weight, distance, time, hills, footwear, and when discomfort began. Check for swelling and whether normal walking or stairs have changed. Avoid immediately retesting the same full dose the next day.
        </p>
        <p>
          Easy movement may feel better than complete stillness for some people, but a hot, rapidly swollen, locked, or unstable knee is not a routine recovery problem. For a mild response without warning signs, return to comfortable unloaded walking and reduce the most likely variable when you try again. The guide to <Link to="/guides/knee-swelling-after-exercise" className={linkClass}>knee swelling after exercise</Link> explains why visible swelling deserves more caution than ordinary muscle fatigue.
        </p>
        <p>
          Heat or ice can change comfort temporarily but does not decide the correct training dose. Use the <Link to="/guides/heat-vs-ice-for-knees" className={linkClass}>ice or heat for knee pain guide</Link> for safe application details. Do not use pain relief solely to complete another heavy ruck before understanding the response.
        </p>

        <h2>Common Rucking Mistakes That Irritate Knees</h2>
        <h3>Increasing all four dials together</h3>
        <p>
          A heavier pack, longer route, faster pace, and first hilly trail create four changes. If pain appears, you cannot identify the main driver. Progress one variable and keep a simple log.
        </p>
        <h3>Using a military benchmark as a beginner workout</h3>
        <p>
          Occupational standards are designed around job requirements, not the minimum dose needed for health or enjoyment. Build from your own walking capacity rather than someone else's test.
        </p>
        <h3>Forcing an unnatural short stride</h3>
        <p>
          Shorter steps are often recommended for descents, but a load-carriage laboratory study did not find that deliberately short steps reduced knee loads. Avoid overstriding and hard braking, yet keep a natural controlled pattern rather than marching to a rigid formula.
        </p>
        <h3>Ignoring pack movement</h3>
        <p>
          A shifting object creates repeated balance corrections. Secure the contents and adjust the harness before deciding that the knee cannot tolerate the nominal weight.
        </p>
        <h3>Stacking rucks with running and heavy leg days</h3>
        <p>
          The knee responds to the week, not the workout label. Separate harder lower-body exposures and make easy days genuinely easy.
        </p>

        <h2>When to Get Medical Help</h2>
        <div className="my-8 rounded-2xl border border-rose-200 bg-rose-50 p-6">
          <p className="mb-0 text-slate-700">
            Arrange an assessment when pain keeps returning, progressively limits walking, repeatedly swells, or comes with catching, locking, or giving way. Seek urgent medical guidance if you cannot bear weight, the knee is deformed or rapidly swollen, a hot red knee occurs with fever or feeling unwell, or new calf swelling appears with chest pain or breathing difficulty.
          </p>
        </div>
        <p>
          Stop the session after a fall, twist, direct impact, or sudden pop followed by loss of function. Do not use the pack as a test of whether an acute injury is serious. A clinician can decide whether examination, rehabilitation, or imaging is appropriate.
        </p>

        <h2>The Bottom Line</h2>
        <p>
          Rucking adds a useful training challenge because it adds load to walking. The same fact explains why an irritable knee may notice it. Establish comfortable unloaded walking, secure the pack, and treat weight, distance, pace, and terrain as separate dials. There is no universal beginner percentage and no shoe that cancels excessive exposure. Build one variable at a time, use ordinary walking and next-day symptoms as feedback, and reduce the dose before technique changes. Swelling, locking, instability, inability to bear weight, and new traumatic pain are reasons to stop carrying and get assessed.
        </p>
      </>
    )
  }
};

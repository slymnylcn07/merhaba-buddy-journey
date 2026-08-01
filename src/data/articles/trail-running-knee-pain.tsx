import { Link } from "react-router-dom";
import type { ArticleExport } from "./types";
import heroImage from "@/assets/guide-thumbnails/wave-3/trail-running-knee-pain.webp";
import descentLoadMap from "@/assets/article-diagrams/wave-3/trail-descent-load-map.svg";
import loadProgression from "@/assets/article-diagrams/wave-3/trail-load-progression.svg";

const linkClass = "font-medium text-primary underline underline-offset-4 hover:text-primary/80";

export const trailRunningKneePain: ArticleExport = {
  cta: "",
  article: {
    slug: "trail-running-knee-pain",
    title: "Trail Running Knee Pain: Terrain, Footing, and Route Load",
    subtitle: "How technical ground, elevation, route design, and fatigue shape symptoms and a gradual return to trails",
    intro:
      "Two trail runs can share the same mileage and feel nothing alike at the knee. A wide dirt loop with gentle elevation asks for a steady rhythm. A narrow route with roots, loose rock, off-camber turns, and repeated climbs demands constant changes in foot placement, stabilization, and concentration. When knee pain appears, route difficulty, footing, total elevation, and fatigue often explain more than distance alone. The useful task is to identify which trail feature changed and rebuild that feature without stacking every challenge at once.",
    quickAnswer:
      "Trail running knee pain often appears when technical footing, elevation change, route duration, or consecutive trail days increase faster than current capacity. Separate distance from total climbing and loss, continuous technical time, surface stability, camber, pace, and fatigue. Begin the return on a familiar, predictable trail, then add elevation, uneven footing, longer time, and speed one at a time. If symptoms occur mainly on smooth descents, use the dedicated downhill running guide for braking, stride, and cadence. Stop for altered gait, swelling, locking, giving way, a traumatic pop, or inability to bear weight.",
    metaTitle: "Trail Running Knee Pain: Terrain, Footing, Route Load",
    metaDescription:
      "Learn how technical terrain, footing, elevation change, route design, and fatigue shape trail running knee pain and a gradual return to trails.",
    heroImage,
    publishedDate: "July 31, 2026",
    lastUpdated: "August 1, 2026",
    nextSlug: "knee-xray-vs-mri-vs-ultrasound",
    nextTitle: "Knee X-Ray vs MRI vs Ultrasound",
    seoTags:
      "trail running knee pain, knee pain after trail running, technical trail knee pain, uneven terrain knee pain, trail footing knee pain, trail elevation load, trail route planning knee pain, outer knee pain trail running, off camber trail knee pain, trail running injuries, trail running knee exercises, return to trail running",
    faqs: [
      {
        question: "Why do my knees hurt after trail running?",
        answer:
          "Trail running combines distance with elevation loss, uneven footing, frequent changes in stride, and repeated stabilization. A new route may therefore create a larger knee demand even when its mileage looks familiar. Pain can also reflect a specific condition or injury, so note the exact location, whether it began on a descent or after the run, and whether swelling, locking, or instability is present."
      },
      {
        question: "Why does my knee hurt on technical trail sections?",
        answer:
          "Technical trail sections require repeated changes in foot placement, step width, direction, and body position. Loose ground, roots, rocks, camber, elevation change, and fatigue can combine into a larger demand than the same distance on a predictable surface. If pain appears only on a smooth descent, the focused downhill running guide is a better match for questions about braking, stride, and cadence."
      },
      {
        question: "Is trail running harder on the knees than road running?",
        answer:
          "Not in one universal way. Trails change slope, footing, step length, and direction, while roads provide a more repetitive surface. Descents may increase front-knee demand, but varied terrain can distribute work differently across tissues. Injury risk depends on previous injury, training exposure, route difficulty, strength, fatigue, and recovery, not only whether the surface is road or trail."
      },
      {
        question: "What causes outer knee pain on uneven or off-camber trails?",
        answer:
          "Outer knee pain in runners is often associated with an iliotibial band pain pattern, but the lateral meniscus, ligaments, tendons, and joint can also produce symptoms in that area. A repeatable distance, prolonged camber, narrow single track, recent route change, or awkward step is useful context, not proof of a diagnosis. A distinct twist, swelling, locking, or giving way should be assessed."
      },
      {
        question: "How do I return to trail running after knee pain?",
        answer:
          "First regain comfortable walking, stairs, and ordinary knee motion without meaningful swelling. Reintroduce flat running or run-walk intervals, then a familiar smooth trail, modest elevation, and finally uneven or off-camber footing. Add route duration, technicality, speed, and consecutive trail days separately. If a stage changes your gait or causes a clear next-morning flare, step back and seek assessment if the pattern persists."
      }
    ],
    sources: [
      {
        title: "Mountain and Trail Running",
        publisher: "World Athletics",
        url: "https://worldathletics.org/disciplines/trail-running/trail-running"
      },
      {
        title: "Epidemiology, Clinical Characteristics, and Risk Factors for Running-Related Injuries Among Trail Runners",
        publisher: "PubMed Central",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8656810/"
      },
      {
        title: "Injury Prevention, Safe Training Techniques, Rehabilitation, and Return to Sport in Trail Runners",
        publisher: "PubMed Central",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8811510/"
      },
      {
        title: "Per-Step and Cumulative Load at Three Common Running Injury Locations",
        publisher: "PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/38389144/"
      },
      {
        title: "Is There Evidence for an Association Between Changes in Training Load and Running-Related Injuries?",
        publisher: "PubMed",
        url: "https://pubmed.ncbi.nlm.nih.gov/30534459/"
      },
      {
        title: "Patellofemoral Pain Syndrome",
        publisher: "American Academy of Orthopaedic Surgeons",
        url: "https://www.orthoinfo.org/diseases--conditions/patellofemoral-pain-syndrome/"
      },
      {
        title: "Iliotibial Band Syndrome",
        publisher: "Sports Medicine Today, American Medical Society for Sports Medicine",
        url: "https://www.sportsmedtoday.com/iliotibial-band-friction-syndrome-itbs-va-50.htm"
      }
    ],
    content: (
      <>
        <p>
          "I only ran six miles" can be a misleading summary of a trail session. Six miles on a wide, firm path and six miles across roots, loose stone, tight turns, and repeated elevation changes are different exposures. A GPS file may show the same distance and average pace while the legs handle very different footing, step patterns, stabilization demands, and fatigue.
        </p>
        <p>
          This article focuses on what makes trail running knee pain different. The broader{" "}
          <Link to="/guides/running-knee-pain-guide" className={linkClass}>running knee pain guide</Link>{" "}
          covers general running injuries and symptoms. Here, the central questions are more specific: Which surface, camber, turn, elevation change, or fatigue point made this route different? Which terrain should return first? If the problem is limited to a smooth slope rather than technical trail features, the{" "}
          <Link to="/guides/downhill-running-knee-pain" className={linkClass}>downhill running knee pain guide</Link>{" "}
          explains braking, stride, cadence, and descent-specific progression in more detail. Pain location helps organize the trail questions, but it cannot confirm a diagnosis.
        </p>

        <h2>What Makes Trail Running Different?</h2>
        <p>
          World Athletics describes trail running as endurance running on varied natural terrain that can include dirt, forest paths, single track, sand, snow, mountains, plains, and deserts. Significant climbing and descending are common. This variability is the attraction of the sport, but it also means that distance is only one part of the workload.
        </p>
        <p>
          A trail runner continually adjusts step width, foot placement, stride length, speed, and body position. A root may shorten one step. Loose gravel may require a controlled slide. A cambered section can load the two legs differently. None of these features is automatically harmful. They require a capacity for repeated adaptation that has to be trained.
        </p>
        <p>
          Prospective trail-running research supports taking knee symptoms seriously without presenting the sport as dangerous. In one 30-week cohort of 152 trail runners, the knee was the leading anatomical site among recorded running-related injuries. Previous injury was an important risk factor. The study does not prove that trails caused every knee problem, and its findings should not be converted into a personal risk percentage.
        </p>

        <h2>How Technical Terrain Changes the Knee's Job</h2>
        <figure className="my-8">
          <img
            src={descentLoadMap}
            alt="Trail terrain diagram showing elevation, uneven footing, route demand, and repeated knee control"
            loading="lazy"
          />
          <figcaption>Elevation is only one variable. Footing, camber, turns, visibility, and fatigue determine how a trail section feels.</figcaption>
        </figure>
        <p>
          A smooth, open slope and a rocky switchback can share the same grade while asking for different movement. On predictable ground, the runner can settle into a rhythm. Roots, loose gravel, ruts, wet rock, and narrow single track interrupt that rhythm. Each feature may change where the foot lands, how wide the next step needs to be, and how quickly the body must reorganize over the planted leg.
        </p>
        <p>
          Off-camber ground adds another layer because the two feet meet different angles. Tight turns and step-downs may load one side repeatedly, especially on a route that always circles in the same direction. Low speed does not automatically mean low demand. A runner moving cautiously through difficult terrain may spend longer under tension and make more corrective movements than someone covering a simple trail quickly.
        </p>
        <p>
          Laboratory models show that gradient can redistribute cumulative load across the patellofemoral joint, tibia, and Achilles tendon, but those controlled studies cannot reproduce every trail surface or predict an individual injury. Use elevation as one clue within the whole route. Total technical time, surface stability, visibility, turns, accumulated fatigue, and previous exposure help explain why the same hill may feel manageable on one trail and provocative on another.
        </p>
        <h3>Why pain may appear after the trail run</h3>
        <p>
          Symptoms do not have to appear at the moment of the hardest feature. Attention to footing and a constantly changing environment can make a mild problem less noticeable during the run. Pain may become clearer after cooling down, during stairs later that day, or when standing the next morning. Use the guide to{" "}
          <Link to="/guides/knee-pain-after-exercise" className={linkClass}>knee pain after exercise but not during</Link>{" "}
          when the delayed response is the main puzzle.
        </p>

        <h2>Map the Pain Before Changing Everything</h2>
        <p>
          Search terms such as "runner's knee" are broad. They often refer to patellofemoral pain, but runners also use the phrase for almost any knee symptom. A more useful description includes the location, timing, slope, surface, and whether the knee swells. The{" "}
          <Link to="/guides/runners-knee-pain-location" className={linkClass}>runner's knee pain location guide</Link>{" "}
          provides a wider map.
        </p>

        <div className="my-8 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[940px] border-collapse text-left text-sm">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="px-5 py-4 font-semibold">Location</th>
                <th className="px-5 py-4 font-semibold">Trail pattern to note</th>
                <th className="px-5 py-4 font-semibold">Possible category</th>
                <th className="px-5 py-4 font-semibold">Clues that need assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Around or behind the kneecap</td>
                <td className="px-5 py-4 text-slate-600">Worse after steep elevation, repeated step-downs, stairs, or sitting</td>
                <td className="px-5 py-4 text-slate-600">Patellofemoral load-sensitive pattern</td>
                <td className="px-5 py-4 text-slate-600">Large swelling, trauma, loss of motion, worsening daily pain</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Outside of the knee</td>
                <td className="px-5 py-4 text-slate-600">Appears at a repeatable distance, on camber, or on one-sided footing</td>
                <td className="px-5 py-4 text-slate-600">IT band or another lateral structure</td>
                <td className="px-5 py-4 text-slate-600">Twist, swelling, instability, joint-line locking</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Inside of the knee</td>
                <td className="px-5 py-4 text-slate-600">Camber, awkward step, deep bend, or distinct pivot</td>
                <td className="px-5 py-4 text-slate-600">Medial tendon, ligament, meniscus, or joint irritation</td>
                <td className="px-5 py-4 text-slate-600">Rapid swelling, catching, true locking, giving way</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Below the kneecap</td>
                <td className="px-5 py-4 text-slate-600">Steep running, jumping obstacles, forceful push-off</td>
                <td className="px-5 py-4 text-slate-600">Patellar tendon or upper shin region</td>
                <td className="px-5 py-4 text-slate-600">A pop, sudden weakness, inability to straighten the knee</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold text-slate-950">Back of the knee</td>
                <td className="px-5 py-4 text-slate-600">Long stride, deep flexion, uphill push, or fullness after running</td>
                <td className="px-5 py-4 text-slate-600">Muscle, tendon, joint, or fluid-related pattern</td>
                <td className="px-5 py-4 text-slate-600">Calf swelling, redness, major loss of motion, breathing symptoms</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Front knee pain after steep or sustained trail sections</h3>
        <p>
          Patellofemoral pain is commonly felt around or behind the kneecap and can be aggravated by running, squatting, and stairs. The American Academy of Orthopaedic Surgeons also lists changes in activity, surface, and equipment as relevant contributors. A route with unfamiliar elevation, repeated rock step-downs, or much longer technical time can fit that history, but only an assessment can distinguish patellofemoral pain from tendon, cartilage, fat-pad, or other anterior-knee sources. Our{" "}
          <Link to="/guides/pain-behind-kneecap" className={linkClass}>pain behind the kneecap guide</Link>{" "}
          explains the overlap.
        </p>
        <h3>Outer knee pain on repeated camber or narrow single track</h3>
        <p>
          Iliotibial band syndrome is a common lateral-knee diagnosis in runners. Clinicians ask about mileage, route profile, and elevation changes when evaluating this pattern. A long cambered traverse, narrow track, or route that repeatedly turns the same way may be worth recording, but outer pain can also arise from other structures and should not be labeled from one online test. Use the{" "}
          <Link to="/guides/it-band-pain-location-diagram" className={linkClass}>IT band pain location diagram</Link>{" "}
          to describe the area, then seek assessment when pain is persistent or mechanical symptoms appear.
        </p>
        <h3>Back or inner knee pain after a technical trail</h3>
        <p>
          Back-of-knee pain may involve muscle, tendon, joint, or fluid-related causes, and inner pain can come from several different tissues. A clear awkward step, new swelling, and restricted motion matter more than blaming the trail in general. New calf swelling, warmth, or redness is not a routine recovery problem. Review{" "}
          <Link to="/guides/back-of-knee-pain-explained" className={linkClass}>back-of-knee patterns</Link>{" "}
          when the location is posterior.
        </p>

        <h2>Audit Trail Load, Not Just Weekly Mileage</h2>
        <figure className="my-8">
          <img
            src={loadProgression}
            alt="Trail training progression showing distance, elevation, terrain difficulty, and speed as separate load variables"
            loading="lazy"
          />
          <figcaption>Distance, elevation, technicality, and speed are separate variables. Change one before stacking the others.</figcaption>
        </figure>
        <p>
          Running research suggests that sudden changes in load may be associated with injury, but the evidence does not support one universal percentage rule for every runner. A systematic review found limited evidence and different definitions across the available studies. The practical lesson is to compare the current week with what your body has recently handled, not to treat a fixed formula as protection.
        </p>
        <p>
          A useful trail log records more than miles or kilometers:
        </p>
        <ul>
          <li><strong>Distance and total time:</strong> how long the legs were working, including hiking.</li>
          <li><strong>Elevation gain and loss:</strong> record total change, the steepest sections, and how much was continuous.</li>
          <li><strong>Technicality:</strong> smooth dirt, loose gravel, roots, rocks, mud, snow, and off-camber ground create different demands.</li>
          <li><strong>Terrain-adjusted pace:</strong> the same speed can be easy on wide dirt and aggressive on narrow, broken ground.</li>
          <li><strong>Consecutive days:</strong> a familiar route may feel different after a hard run, strength session, or poor recovery.</li>
          <li><strong>Footwear and surface changes:</strong> record them without assuming they are the cause.</li>
          <li><strong>Symptom response:</strong> during the run, later that day, and the following morning.</li>
        </ul>
        <p>
          Look for the first variable that changed before pain began. A road runner who moves to trails may keep the same mileage but add far more elevation, camber, and technical time. An experienced trail runner may tolerate the route but add speed, a race, poor visibility, or back-to-back long runs. Reducing the newest stressor often preserves more fitness than stopping all running without a plan.
        </p>

        <h2>What to Do During a Run When the Knee Starts Hurting</h2>
        <p>
          Use movement quality as the first checkpoint. If pain makes you limp, stiffen the leg, avoid one side, or lose confident footing, stop running. Walking a safer route back may be reasonable if you can bear weight normally, but remote terrain changes the risk calculation. A small problem can become a larger safety issue when balance and concentration decline far from help.
        </p>
        <p>
          On mild symptoms without swelling or instability, shorten the route and choose the simplest safe exit. Avoid repeatedly testing the same rock garden, cambered traverse, or steep segment to see whether the pain is still present. Do not make a sudden, extreme change to foot strike or technique in the middle of a painful run. Any adjustment should be small, practiced, and judged over time.
        </p>
        <p>
          A pop, forceful twist, rapid swelling, locked knee, repeated giving way, or inability to bear weight requires a different response. Stop, arrange safe transport, and seek medical assessment. Trail runners should carry communication and emergency supplies appropriate for the route because an injury that is manageable near home may be serious when access is difficult.
        </p>

        <h2>How to Settle a Mild Load-Related Flare</h2>
        <p>
          Reduce the specific exposure that provokes symptoms. That may mean choosing a shorter familiar route, removing loose or off-camber sections, reducing continuous elevation change, or replacing one trail session with comfortable cycling or pool work. The goal is not to prove toughness. It is to keep an amount of activity that does not produce worsening pain, swelling, or altered gait.
        </p>
        <p>
          Cold may feel useful for a newly swollen or unusually warm knee, while warmth may suit stiffness without swelling. Neither is required for every runner, and neither builds trail capacity. The{" "}
          <Link to="/guides/heat-vs-ice-for-knees" className={linkClass}>heat or ice decision guide</Link>{" "}
          explains the distinction. A simple{" "}
          <Link to="/guides/knee-recovery-exercises-after-workout" className={linkClass}>post-workout knee recovery routine</Link>{" "}
          may help ordinary soreness, but it is not a substitute for assessing trauma or recurring swelling.
        </p>
        <p>
          Check the knee again the following morning. Normal walking, ordinary stairs, range of motion, and swelling are more useful than whether the area felt briefly better after massage or a device. Symptoms that keep returning at the same route feature or elapsed time deserve a more structured review.
        </p>

        <h2>Strength and Control for Technical Trails</h2>
        <p>
          Trail preparation should include more than heavy lifting and more than balance practice alone. The sport asks the quadriceps to control knee flexion, the hip and trunk to organize the leg, the calf and foot to adapt to the surface, and the nervous system to make rapid corrections. A review of trail-running rehabilitation emphasizes coordinated movement across this chain.
        </p>
        <h3>Build controlled knee capacity</h3>
        <p>
          A squat or sit-to-stand, supported split squat, and slow step-down can train controlled knee flexion. Begin with a height, depth, and resistance that do not cause sharp or escalating pain. The lowering phase should remain smooth rather than becoming a drop. Progress one feature at a time.
        </p>
        <h3>Train the hip, calf, and foot</h3>
        <p>
          Hip-hinge work, bridges, side steps, calf raises, and supported single-leg balance can complement knee-focused exercises. These movements do not "fix alignment" in every runner. They build options for controlling the body when the trail changes. The guides to{" "}
          <Link to="/guides/tight-calves-knee-pain" className={linkClass}>calf and ankle motion</Link>{" "}
          and{" "}
          <Link to="/guides/flat-feet-overpronation-knee-pain" className={linkClass}>flat feet and overpronation</Link>{" "}
          cover those links without treating foot shape as a diagnosis.
        </p>
        <h3>Add trail-specific balance and reaction</h3>
        <p>
          After basic strength is comfortable, introduce planned reaches, step-overs, and direction changes on a safe surface. Technical terrain should not be the first balance exercise after an injury. A rail, wall, or stable support allows a runner to practice control before adding unpredictability. Hops and faster drills belong later and may require professional guidance.
        </p>

        <h2>A Gradual Return to Trail Running</h2>
        <p>
          Return should be based on function and the diagnosis, not a generic number of rest days. A bone stress injury, ligament injury, or meniscus problem follows a different plan from mild patellofemoral or IT band symptoms. The steps below are a framework for a mild, improving pattern after serious causes have been excluded.
        </p>
        <h3>Step 1: Comfortable daily movement</h3>
        <p>
          Walking is normal, stairs are manageable, the knee has close to its usual range, and meaningful swelling is absent. A runner who still limps should not use a trail as a rehabilitation test.
        </p>
        <h3>Step 2: Flat run-walk or easy running</h3>
        <p>
          Start on a predictable surface at a conversational effort. The purpose is to reintroduce running rhythm without simultaneously adding elevation and technical footing. Keep the first exposure short enough that the later-day and next-morning responses are easy to interpret.
        </p>
        <h3>Step 3: A smooth, familiar trail</h3>
        <p>
          Choose a wide, predictable trail with stable footing and easy access back. Keep the route flat or gently rolling and do not chase the previous pace. This step tests the change from road or treadmill to trail without adding the most difficult surface, elevation, and duration at the same time.
        </p>
        <h3>Step 4: Add elevation separately</h3>
        <p>
          Add modest climbing and loss on stable ground before combining elevation with roots, loose stone, or sharp turns. Hiking a section is a valid intermediate step. If symptoms appear mainly on a smooth descent, move to the focused downhill guide rather than turning this trail progression into a technique experiment.
        </p>
        <h3>Step 5: Technicality, duration, and speed</h3>
        <p>
          Add roots, rocks, camber, mud, narrow track, and more difficult turns only after a predictable trail is tolerated. Increase technical time before adding race speed, or add speed before a much longer route, but do not stack both immediately. Consecutive trail days and back-to-back long runs belong near the end of the progression.
        </p>
        <p>
          Our{" "}
          <Link to="/guides/knee-pain-when-hiking" className={linkClass}>knee pain when hiking guide</Link>{" "}
          is the better resource when walking routes, pack weight, or trekking poles are the main concern. This trail-running article remains focused on running exposure, foot placement, route design, and return to run.
        </p>

        <h2>Footing, Line Choice, and Trail Shoes</h2>
        <p>
          Look several steps ahead rather than reacting only to the ground under the current foot. Choose a line that offers secure contact and enough room to adjust. Slow before a technical feature, not after balance has already been lost. Wet rock, leaves, mud, ruts, and loose gravel may justify hiking even when the grade itself looks easy.
        </p>
        <p>
          Do not force identical steps across changing terrain. Step width, stride length, and direction naturally vary around obstacles and camber. A route becomes harder when fatigue reduces the ability to make those small corrections. When foot placement becomes noisy, uncertain, or consistently one-sided, shortening the session is more useful than trying to hold a perfect form cue.
        </p>
        <p>
          Trail shoes should fit securely and provide traction appropriate to the surface, but cushioning and heel-to-toe drop do not diagnose or cure knee pain. Make footwear changes gradually and test them on a short familiar route. For broader shoe questions, use the{" "}
          <Link to="/guides/best-running-shoes-knee-pain" className={linkClass}>running shoes and knee pain guide</Link>.
        </p>

        <h2>When to Get Medical Help</h2>
        <div className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="mb-0 text-slate-700">
            Arrange an assessment when trail running pain repeatedly returns, begins earlier on each run, limits ordinary walking or stairs, or produces recurring swelling. Seek prompt care after a fall or twist if you cannot bear weight, the knee is deformed or physically locked, swelling is rapid, or the knee repeatedly gives way. A hot red swollen joint with fever, new calf swelling, a cold or discolored foot, chest pain, or breathing difficulty needs urgent medical guidance.
          </p>
        </div>

        <h2>The Bottom Line</h2>
        <p>
          Trail running knee pain cannot be understood from mileage alone. Terrain type, total elevation, continuous technical time, footing, camber, route difficulty, speed, fatigue, and consecutive training days all change what the knee must handle. A familiar distance on a harder route is still a new load.
        </p>
        <p>
          Map the location, identify the surface, turn, camber, elevation segment, or fatigue point where symptoms begin, and check the response after the run and the following morning. Mild load-sensitive pain may improve when the provoking route feature is reduced, strength and control are rebuilt, and terrain returns separately from speed and distance. Swelling, locking, instability, trauma, or altered gait requires a different path. The goal is not to avoid trails. It is to earn back the specific capacity that makes technical running safe and confident.
        </p>
      </>
    )
  }
};

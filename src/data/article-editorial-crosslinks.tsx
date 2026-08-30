import { Link } from "react-router-dom";
import type { ReactNode } from "react";

const linkClass = "font-medium text-primary underline underline-offset-4 hover:text-primary/80";

/**
 * Natural in-article editorial bridges from established guides to newer guides.
 * Rendering them centrally keeps the links in prerendered HTML and prevents a
 * new writer from forgetting the reverse internal-link requirement.
 */
export const articleEditorialCrosslinks: Record<string, ReactNode> = {
  "best-supplements-for-knee-pain": (
    <p>
      Readers comparing the most searched newer options can now go deeper with our evidence reviews of <Link to="/guides/collagen-peptides-knee-pain" className={linkClass}>collagen peptides and type II collagen for knee pain</Link> and <Link to="/guides/turmeric-curcumin-knee-pain" className={linkClass}>turmeric and curcumin for knee osteoarthritis</Link>, including the doses, product forms, trial timelines, and safety questions that broad supplement lists cannot cover.
    </p>
  ),
  "back-of-knee-pain-explained": (
    <p>
      A visible blue or rope-like vein, heaviness after standing, or swelling that improves with elevation points toward a circulation pattern rather than only a joint structure; our guide to <Link to="/guides/varicose-veins-knee-pain" className={linkClass}>varicose veins behind the knee and urgent blood-clot warning signs</Link> explains how to tell those possibilities apart.
    </p>
  ),
  "knee-arthritis-pain-guide": (
    <>
      <p>
        Because “arthritis” can mean a mechanical whole-joint condition or an autoimmune inflammatory disease, the comparison of <Link to="/guides/knee-osteoarthritis-vs-rheumatoid-arthritis" className={linkClass}>knee osteoarthritis versus rheumatoid arthritis</Link> is the next useful step when prolonged morning stiffness, symmetrical swelling, hand or foot symptoms, or blood-test questions enter the picture.
      </p>
      <p>
        If you are considering electrical stimulation for symptom relief, the <Link to="/guides/tens-unit-knee-pain" className={linkClass}>TENS unit guide for knee pain</Link> explains pad placement, settings, safety exclusions, and the mixed evidence. It should be viewed as a possible short-term comfort tool, not a treatment that changes arthritis itself.
      </p>
      <p>
        For topical medicines, compare the stronger guideline support and NSAID precautions in the <Link to="/guides/diclofenac-gel-knee-pain" className={linkClass}>diclofenac gel guide</Link> with the common burning sensation and less certain evidence in the <Link to="/guides/capsaicin-cream-knee-pain" className={linkClass}>capsaicin cream guide</Link>. Neither product repairs cartilage, and both require their own label and safety checks.
      </p>
    </>
  ),
  "knee-pain-after-exercise": (
    <p>
      When repeated impact is the main trigger, replacing one weekly workout with a carefully dosed option from our comparison of <Link to="/guides/best-low-impact-cardio-knee-pain" className={linkClass}>walking, cycling, and swimming for knee pain</Link> can preserve aerobic training while you rebuild tolerance.
    </p>
  ),
  "knee-pain-exercises-guide": (
    <>
      <p>
        People looking for a more unusual gait drill can also review the evidence for <Link to="/guides/backward-walking-knee-pain" className={linkClass}>backward walking for knee pain</Link>, including the balance precautions and short progression that should come before any treadmill challenge.
      </p>
      <p>
        For a single exercise rather than a general routine, use the form and progression guides for <Link to="/guides/tibialis-raises-knee-strength" className={linkClass}>tibialis raises</Link>, <Link to="/guides/banded-tke-knee-exercise" className={linkClass}>banded terminal knee extensions</Link>, or the <Link to="/guides/step-down-exercise-knee-control" className={linkClass}>step-down exercise</Link>. Each guide separates setup, load, and the later symptom response instead of treating every painful knee the same way.
      </p>
    </>
  ),
  "how-to-strengthen-knees": (
    <p>
      For two technique-focused options, the <Link to="/guides/nordic-hamstring-curl-knee-health" className={linkClass}>Nordic hamstring curl guide</Link> explains assisted eccentric progressions and why hamstring injury-prevention evidence is not the same as proof of treating knee pain. The <Link to="/guides/cyclist-squat-knee-strength" className={linkClass}>heel-elevated cyclist squat guide</Link> shows how heel height, depth, support, and load change the exercise before weight is added.
    </p>
  ),
  "best-low-impact-cardio-knee-pain": (
    <>
    <p>
      For more specific activity choices, compare <Link to="/guides/stairmaster-vs-incline-treadmill-knees" className={linkClass}>StairMaster and incline treadmill workouts for sensitive knees</Link>, learn how <Link to="/guides/aqua-jogging-knee-pain" className={linkClass}>deep-water pool running</Link> removes foot strike, or review <Link to="/guides/reformer-pilates-knee-pain" className={linkClass}>reformer Pilates knee modifications</Link> when controlled strength is the main goal rather than sustained cardio.
    </p>
    <p>
      If one machine is the problem, use the focused setup checks for <Link to="/guides/elliptical-knee-pain" className={linkClass}>elliptical stride and resistance</Link> or <Link to="/guides/rowing-machine-knee-pain" className={linkClass}>rowing-machine catch depth and foot position</Link>. A low-impact label does not mean that every machine or session length will suit your knee.
    </p>
    </>
  ),
  "running-knee-pain-guide": (
    <>
      <p>
        When terrain is the trigger, the <Link to="/guides/downhill-running-knee-pain" className={linkClass}>downhill running knee pain guide</Link> separates grade, speed, cadence, stride, and braking load. If land running is temporarily too irritable, <Link to="/guides/aqua-jogging-knee-pain" className={linkClass}>aqua jogging and deep-water running</Link> can preserve an aerobic routine without pretending pool fitness proves land readiness.
      </p>
      <p>
        A soft support is an optional comfort tool rather than a fix for recurring symptoms. The <Link to="/guides/knee-sleeves-for-running" className={linkClass}>knee sleeves for running guide</Link> compares compression sleeves, patellar straps, and braces, then shows how to check fit during a short easy run before using one for distance.
      </p>
    </>
  ),
  "trail-running-knee-pain": (
    <p>
      Runners whose symptoms are tied specifically to the descent can use the focused guide to <Link to="/guides/downhill-running-knee-pain" className={linkClass}>downhill braking, cadence, stride, and return progression</Link>, while this trail guide remains the broader resource for terrain, route difficulty, footwear, and elevation planning.
    </p>
  ),
  "knee-pain-when-hiking": (
    <>
      <p>
        If the climb itself is the main trigger, compare grade and duration in the <Link to="/guides/incline-walking-knee-pain" className={linkClass}>incline walking knee pain guide</Link>. If symptoms appear during the return down, the <Link to="/guides/downhill-running-knee-pain" className={linkClass}>downhill braking guide</Link> explains the related descent mechanics while keeping hiking and running progressions separate.
      </p>
      <p>
        For gear selection and technique, use the focused guide to <Link to="/guides/best-hiking-poles-bad-knees" className={linkClass}>choosing and sizing hiking poles for bad knees</Link>. It explains grip, locks, shaft material, downhill setup, and why proper pole placement matters more than an anti-shock label.
      </p>
    </>
  ),
  "best-running-shoes-knee-pain": (
    <>
      <p>
        If knee pain began after a shoe change, pause the shopping process and use the <Link to="/guides/can-running-shoes-cause-knee-pain" className={linkClass}>running-shoe cause test</Link>. It compares fit, heel drop, cushioning, stability, wear, and training load so a new pair is chosen for the feature that actually failed.
      </p>
      <p>
        Warm-weather footwear needs a separate test because an open shoe changes heel security, toe gripping, and strap fit. The <Link to="/guides/best-sandals-knee-pain" className={linkClass}>sandals for knee pain guide</Link> compares supportive walking sandals, recovery slides, and flip-flops without claiming that one arch shape or cushioning level works for every knee.
      </p>
    </>
  ),
  "home-remedies-knee-pain": (
    <p>
      If you are considering an over-the-counter topical product, read the medicine-specific guidance before combining it with heat, wraps, or another cream. Compare <Link to="/guides/diclofenac-gel-knee-pain" className={linkClass}>diclofenac gel for knee osteoarthritis</Link> with <Link to="/guides/capsaicin-cream-knee-pain" className={linkClass}>capsaicin cream and its expected burning sensation</Link>.
    </p>
  ),
  "knee-pain-climbing-stairs": (
    <p>
      Gym users who tolerate daily stairs differently from cardio equipment can compare repeated stepping with adjustable hill walking in <Link to="/guides/stairmaster-vs-incline-treadmill-knees" className={linkClass}>StairMaster versus incline treadmill for bad knees</Link>.
    </p>
  ),
  "knee-pain-going-down-stairs": (
    <>
      <p>
        Stair descent and downhill running both require controlled lowering, but running adds speed and repeated landing. The separate <Link to="/guides/downhill-running-knee-pain" className={linkClass}>downhill running knee pain guide</Link> explains braking load without turning this everyday stair page into a running plan.
      </p>
      <p>
        When the goal is to practice that lowering skill in a controlled gym setting, the <Link to="/guides/step-down-exercise-knee-control" className={linkClass}>lateral and forward step-down exercise guide</Link> shows how step height, support, range, tempo, and added load change the task. It is an exercise progression, not a diagnosis for pain on household stairs.
      </p>
    </>
  ),
  "knee-pain-during-yoga": (
    <p>
      If you prefer guided equipment work, the <Link to="/guides/reformer-pilates-knee-pain" className={linkClass}>reformer Pilates knee pain guide</Link> shows how springs, footbar position, range, kneeling, and lunges create different modification choices from mat yoga.
    </p>
  ),
  "knee-pain-when-squatting": (
    <>
      <p>
        Reformer footwork can still involve repeated loaded knee bend, even though the carriage supports the body differently from a free squat. Use the <Link to="/guides/reformer-pilates-knee-pain" className={linkClass}>reformer Pilates modification guide</Link> for spring, footbar, and range decisions.
      </p>
      <p>
        Knee position is only one part of squat demand. The evidence guide to <Link to="/guides/are-knees-over-toes-bad" className={linkClass}>whether knees over toes are bad</Link> explains how depth, external load, speed, anatomy, and current capacity interact. For a heel-elevated, upright variation, use the <Link to="/guides/cyclist-squat-knee-strength" className={linkClass}>cyclist squat setup and progression guide</Link>. For a band-supported isometric variation with a tendon-specific intent, see the <Link to="/guides/spanish-squat-patellar-tendon" className={linkClass}>Spanish squat setup and progression guide</Link>.
      </p>
    </>
  ),
  "backward-walking-knee-pain": (
    <p>
      Backward walking is a gait and conditioning drill. If your goal is a smaller, stationary quadriceps exercise that focuses on the final part of straightening the knee, use the <Link to="/guides/banded-tke-knee-exercise" className={linkClass}>banded terminal knee extension guide</Link> for anchor height, band tension, form checks, and progression.
    </p>
  ),
  "pain-behind-kneecap": (
    <>
    <p>
      Taping can sometimes be used as a short-term adjunct while exercise tolerance is rebuilt. The <Link to="/guides/knee-taping-stability-pfps" className={linkClass}>knee taping guide for patellofemoral pain</Link> separates kinesiology tape from rigid techniques, shows practical skin precautions, and explains why tape does not diagnose the source of pain behind the kneecap.
    </p>
    <p>
      Pain beside the patellar tendon that is aggravated near full straightening has a different set of possibilities from pain behind the kneecap. The guide to <Link to="/guides/hoffa-fat-pad-impingement" className={linkClass}>Hoffa's fat pad and anterior knee pain</Link> explains that distinction and why an MRI finding alone does not identify the cause.
    </p>
    </>
  ),
  "knee-brace-vs-compression-sleeve": (
    <>
    <p>
      Tape is another category rather than a lighter version of a brace or sleeve. Compare elastic and rigid methods in the <Link to="/guides/knee-taping-stability-pfps" className={linkClass}>knee taping guide for stability and patellofemoral pain</Link>, including what each method can and cannot reasonably provide.
    </p>
    <p>
      Coverage also matters: a sock supports a different area from a knee sleeve. The <Link to="/guides/compression-socks-vs-knee-sleeves" className={linkClass}>compression socks versus knee sleeves comparison</Link> separates lower-leg coverage, knee coverage, fit, and the symptoms that need assessment before buying compression.
    </p>
    </>
  ),
  "do-knee-massagers-work": (
    <p>
      A TENS unit is not the same technology as a heated or vibrating knee massager. If electrical stimulation is what you are evaluating, use the separate <Link to="/guides/tens-unit-knee-pain" className={linkClass}>TENS guide for pad placement, settings, evidence, and safety</Link> so the claims and precautions do not get mixed together.
    </p>
  ),
  "heat-vs-ice-for-knees": (
    <p>
      If you are comparing circulating systems with reusable packs, the <Link to="/guides/cold-therapy-machine-knee" className={linkClass}>cold therapy machine guide for the knee</Link> explains the main device types, early post-operative evidence, skin-safety checks, and when a simple cold pack may be enough.
    </p>
  ),
  "incline-walking-knee-pain": (
    <p>
      A flat under-desk treadmill introduces desk reach, footwear, and long distracted sessions rather than hill grade. Use the separate <Link to="/guides/walking-pad-knee-pain" className={linkClass}>walking-pad knee pain guide</Link> to check those workday factors without treating desk walking as an incline workout.
    </p>
  ),
  "best-insoles-for-knee-pain-2026": (
    <p>
      If discomfort began after changing an insert, use the <Link to="/guides/can-insoles-cause-knee-pain" className={linkClass}>insole and orthotic troubleshooting guide</Link> before buying another pair. Shoe space, arch position, left-right fit, and the amount of wear can help explain why a seemingly supportive insert is uncomfortable.
    </p>
  ),
  "knee-ache-after-leg-workouts": (
    <p>
      If the seated knee-extension machine is the specific trigger, the <Link to="/guides/leg-extension-knee-pain" className={linkClass}>leg-extension setup and range guide</Link> examines the seat, machine pivot, shin pad, resistance, and response after training. It is separate from general leg-day soreness or squat technique.
    </p>
  ),
  "knee-pain-after-standing": (
    <p>
      When the problem is tied to a safety boot or a long work shift, compare boot fit, weight, sole stiffness, and floor conditions in the <Link to="/guides/work-boots-knee-pain" className={linkClass}>work boots and knee pain guide</Link>. Keep required workplace protection in place while investigating comfort.
    </p>
  ),
  "seated-knee-exercises-limited-mobility": (
    <p>
      A small pedal device is another seated activity, but chair movement, device reach, and pedal height need separate checks. The <Link to="/guides/pedal-exerciser-knee-pain" className={linkClass}>pedal exerciser guide for knee pain</Link> explains how to test a brief comfortable session without replacing an individualized rehabilitation plan.
    </p>
  ),
  "best-sandals-knee-pain": (
    <p>
      Indoor footwear has different demands from outdoor walking sandals. Compare heel security, floor grip, and fit in the <Link to="/guides/best-slippers-knee-pain" className={linkClass}>slippers for knee pain guide</Link>, including why a very soft or loose house shoe is not automatically the most comfortable choice.
    </p>
  ),
  "aqua-jogging-knee-pain": (
    <p>
      Breaststroke introduces a turning kick that pool running does not require. If swimming rather than aqua jogging provokes inner-knee symptoms, read the <Link to="/guides/breaststroke-knee-pain" className={linkClass}>breaststroker's knee guide</Link> for kick, wall-push, and training-load considerations.
    </p>
  ),
  "knee-pain-after-long-walks": (
    <p>
      Golf combines course walking with repeated swings and uneven lies. The <Link to="/guides/golf-knee-pain" className={linkClass}>golf knee pain guide</Link> helps distinguish walking fatigue from lead-knee or trail-knee symptoms during the swing.
    </p>
  ),
  "knee-weakness-without-pain": (
    <p>
      Knees that move beyond the usual straight position need a different discussion from general weakness. The <Link to="/guides/hypermobile-knees" className={linkClass}>hypermobile knees guide</Link> explains extra range, movement control, symptomatic hypermobility, and why flexibility alone does not diagnose a connective-tissue disorder.
    </p>
  ),
  "knee-clicking-when-walking": (
    <p>
      A sound is different from a knee that physically cannot complete its movement. Compare <Link to="/guides/knee-locking-vs-catching" className={linkClass}>knee locking, catching, and clicking</Link> for the difference between brief sensations and a persistent movement block that needs prompt assessment.
    </p>
  ),
  "tight-calves-knee-pain": (
    <p>
      If knee symptoms started with an ankle sprain, do not assume that calf tightness or a changed walking pattern explains everything. The <Link to="/guides/knee-pain-after-ankle-sprain" className={linkClass}>knee pain after an ankle sprain guide</Link> separates recovery-related changes from injuries that need the whole lower leg assessed.
    </p>
  ),
};

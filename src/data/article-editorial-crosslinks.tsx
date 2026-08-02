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
    <p>
      Because “arthritis” can mean a mechanical whole-joint condition or an autoimmune inflammatory disease, the comparison of <Link to="/guides/knee-osteoarthritis-vs-rheumatoid-arthritis" className={linkClass}>knee osteoarthritis versus rheumatoid arthritis</Link> is the next useful step when prolonged morning stiffness, symmetrical swelling, hand or foot symptoms, or blood-test questions enter the picture.
    </p>
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
  "best-low-impact-cardio-knee-pain": (
    <p>
      For more specific activity choices, compare <Link to="/guides/stairmaster-vs-incline-treadmill-knees" className={linkClass}>StairMaster and incline treadmill workouts for sensitive knees</Link>, learn how <Link to="/guides/aqua-jogging-knee-pain" className={linkClass}>deep-water pool running</Link> removes foot strike, or review <Link to="/guides/reformer-pilates-knee-pain" className={linkClass}>reformer Pilates knee modifications</Link> when controlled strength is the main goal rather than sustained cardio.
    </p>
  ),
  "running-knee-pain-guide": (
    <p>
      When terrain is the trigger, the <Link to="/guides/downhill-running-knee-pain" className={linkClass}>downhill running knee pain guide</Link> separates grade, speed, cadence, stride, and braking load. If land running is temporarily too irritable, <Link to="/guides/aqua-jogging-knee-pain" className={linkClass}>aqua jogging and deep-water running</Link> can preserve an aerobic routine without pretending pool fitness proves land readiness.
    </p>
  ),
  "trail-running-knee-pain": (
    <p>
      Runners whose symptoms are tied specifically to the descent can use the focused guide to <Link to="/guides/downhill-running-knee-pain" className={linkClass}>downhill braking, cadence, stride, and return progression</Link>, while this trail guide remains the broader resource for terrain, route difficulty, footwear, and elevation planning.
    </p>
  ),
  "knee-pain-when-hiking": (
    <p>
      If the climb itself is the main trigger, compare grade and duration in the <Link to="/guides/incline-walking-knee-pain" className={linkClass}>incline walking knee pain guide</Link>. If symptoms appear during the return down, the <Link to="/guides/downhill-running-knee-pain" className={linkClass}>downhill braking guide</Link> explains the related descent mechanics while keeping hiking and running progressions separate.
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
        Knee position is only one part of squat demand. The evidence guide to <Link to="/guides/are-knees-over-toes-bad" className={linkClass}>whether knees over toes are bad</Link> explains how depth, external load, speed, anatomy, and current capacity interact. For a band-supported isometric variation with a tendon-specific intent, see the <Link to="/guides/spanish-squat-patellar-tendon" className={linkClass}>Spanish squat setup and progression guide</Link>.
      </p>
    </>
  ),
  "backward-walking-knee-pain": (
    <p>
      Backward walking is a gait and conditioning drill. If your goal is a smaller, stationary quadriceps exercise that focuses on the final part of straightening the knee, use the <Link to="/guides/banded-tke-knee-exercise" className={linkClass}>banded terminal knee extension guide</Link> for anchor height, band tension, form checks, and progression.
    </p>
  ),
};

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
    <p>
      People looking for a more unusual gait drill can also review the evidence for <Link to="/guides/backward-walking-knee-pain" className={linkClass}>backward walking for knee pain</Link>, including the balance precautions and short progression that should come before any treadmill challenge.
    </p>
  ),
};

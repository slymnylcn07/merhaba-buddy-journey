import { Link } from "react-router-dom";
import type { ReactNode } from "react";

const linkClass = "font-medium text-primary underline underline-offset-4 hover:text-primary/80";

/**
 * Natural in-article editorial bridges from established guides to newer guides.
 * Rendering them centrally keeps the links in prerendered HTML and prevents a
 * new writer from forgetting the reverse internal-link requirement.
 */
export const articleEditorialCrosslinks: Record<string, ReactNode> = {
  "knee-pain-after-exercise": (
    <p>
      When repeated impact is the main trigger, replacing one weekly workout with a
      carefully dosed option from our comparison of <Link to="/guides/best-low-impact-cardio-knee-pain" className={linkClass}>walking, cycling, and swimming for knee pain</Link> can preserve aerobic training while you rebuild tolerance.
    </p>
  ),
  "knee-pain-exercises-guide": (
    <p>
      People looking for a more unusual gait drill can also review the evidence for
      <Link to="/guides/backward-walking-knee-pain" className={linkClass}> backward walking for knee pain</Link>, including the balance precautions and short progression that should come before any treadmill challenge.
    </p>
  ),
};

import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { ArticleExport } from "./types";
import heroImage from "@/assets/article-hero-knee-pain-locations.jpg";
import diagramFrontKnee from "@/assets/fig-zone-front-v2.svg";
import diagramInnerKnee from "@/assets/fig-zone-inner-v2.svg";
import diagramOuterKnee from "@/assets/fig-zone-outer-v2.svg";
import diagramBackKnee from "@/assets/fig-zone-back-v2.svg";
import diagramAboveKneecap from "@/assets/fig-zone-above-kneecap-v2.svg";
import diagramITBand from "@/assets/fig-zone-itband-v2.svg";
import diagramJointLine from "@/assets/fig-zone-joint-line-v2.svg";
import diagramPainMapZones from "@/assets/fig-knee-zones-map-v2.svg";
import diagramAnatomyBonesLigaments from "@/assets/fig-knee-anatomy-v2.svg";
import diagramBackKneePainViz from "@/assets/fig-zone-back-detail-v2.svg";
import diagramBelowKneecapPressure from "@/assets/fig-zone-below-kneecap-v2.svg";

const SectionDivider = () => <hr className="my-10 border-t border-border/40" />;

const QuickAnswer = ({ children }: { children: ReactNode }) => (
  <aside
    aria-label="Quick answer"
    className="my-7 rounded-xl border border-sky-200 bg-sky-50 p-5 text-slate-900"
  >
    <p className="mb-2 text-sm font-bold uppercase tracking-wide text-sky-800">
      Quick Answer
    </p>
    <div className="space-y-3 leading-relaxed">{children}</div>
  </aside>
);

const NoteBox = ({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "amber" | "red";
}) => {
  const styles = {
    blue: "border-sky-200 bg-sky-50 text-slate-900",
    amber: "border-amber-200 bg-amber-50 text-slate-900",
    red: "border-red-200 bg-red-50 text-slate-900",
  };

  return (
    <aside className={`my-7 rounded-xl border p-5 leading-relaxed ${styles[tone]}`}>
      {children}
    </aside>
  );
};

const VisualFigure = ({
  src,
  alt,
  caption,
  width = 900,
  height = 560,
  eager = false,
}: {
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
  eager?: boolean;
}) => (
  <figure className="my-7">
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="mx-auto h-auto w-full max-w-3xl rounded-xl border border-border/50 bg-[#FFF9F0] shadow-sm"
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
    <figcaption className="mx-auto mt-3 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
      {caption}
    </figcaption>
  </figure>
);

const explorerZones = [
  {
    id: "front-knee",
    label: "Front",
    shortLabel: "Around or behind the kneecap",
    summary:
      "Front-of-knee discomfort is often noticed with stairs, squats, running, or sitting with the knee bent. Record whether the sensation sits on, around, or behind the kneecap.",
    image: diagramFrontKnee,
    alt: "Front knee pain location diagram highlighting the area around the kneecap",
  },
  {
    id: "inner-knee",
    label: "Inner",
    shortLabel: "Medial side",
    summary:
      "Inner-knee discomfort follows the side facing your other leg. Note whether it is exactly on the joint line, slightly below it, or spread across a wider area.",
    image: diagramInnerKnee,
    alt: "Inner knee pain location chart highlighting the medial side",
  },
  {
    id: "outer-knee",
    label: "Outer",
    shortLabel: "Lateral side and IT band",
    summary:
      "Outer-knee discomfort may sit at the joint line or extend upward along the outside of the thigh. Repetitive running or cycling context can be useful to record.",
    image: diagramOuterKnee,
    alt: "Outer knee pain location diagram highlighting the lateral side",
  },
  {
    id: "back-knee",
    label: "Back",
    shortLabel: "Behind the knee",
    summary:
      "Pain or fullness behind the knee can feel central or favor one side. New swelling, calf symptoms, or difficulty bending the knee deserves prompt assessment.",
    image: diagramBackKnee,
    alt: "Back of knee pain location diagram highlighting the popliteal area",
  },
  {
    id: "above-kneecap",
    label: "Above",
    shortLabel: "Quadriceps tendon area",
    summary:
      "Discomfort just above the kneecap sits where the quadriceps tendon meets the patella. Note whether it follows a jump in training, repeated stairs, or deep bending.",
    image: diagramAboveKneecap,
    alt: "Knee diagram highlighting pain above the kneecap",
  },
  {
    id: "below-kneecap",
    label: "Below",
    shortLabel: "Patellar tendon area",
    summary:
      "Below-kneecap discomfort may sit in the tendon between the kneecap and shin or over the bony bump below it. Age and activity pattern change the likely explanation.",
    image: diagramBelowKneecapPressure,
    alt: "Knee pain diagram highlighting the area below the kneecap",
  },
  {
    id: "joint-line",
    label: "Joint line",
    shortLabel: "Inner or outer crease",
    summary:
      "Joint-line discomfort follows the narrow crease between the thigh and shin bones. Record swelling, catching, locking, or a twisting event rather than assuming a cause.",
    image: diagramJointLine,
    alt: "Knee joint line pain diagram highlighting the inner and outer joint lines",
  },
  {
    id: "whole-knee",
    label: "Whole knee",
    shortLabel: "Diffuse or shifting",
    summary:
      "A broad ache, warmth, or swelling across the whole knee is less location-specific. Timing, morning stiffness, recent illness, injury, and changes in activity become more important.",
    image: diagramPainMapZones,
    alt: "Knee pain map showing front, side, above, below and back zones",
  },
] as const;

const ZoneExplorer = () => {
  const [activeZone, setActiveZone] = useState<(typeof explorerZones)[number]>(
    explorerZones[0],
  );

  return (
    <section
      aria-label="Interactive knee pain location map"
      className="my-8 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6"
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {explorerZones.map((zone) => {
          const isActive = activeZone.id === zone.id;

          return (
            <button
              key={zone.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveZone(zone)}
              className={`min-h-16 rounded-lg border px-3 py-2 text-left transition ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-primary/5"
              }`}
            >
              <span className="block font-semibold">{zone.label}</span>
              <span
                className={`mt-0.5 block text-xs ${
                  isActive ? "text-primary-foreground/85" : "text-muted-foreground"
                }`}
              >
                {zone.shortLabel}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid items-center gap-5 rounded-xl bg-muted/35 p-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <img
          src={activeZone.image}
          alt={activeZone.alt}
          width={activeZone.id === "whole-knee" ? 1000 : 900}
          height={activeZone.id === "whole-knee" ? 620 : 560}
          className="h-auto w-full rounded-lg bg-[#FFF9F0]"
          decoding="async"
        />
        <div>
          <p className="text-lg font-bold text-foreground">
            {activeZone.label}: {activeZone.shortLabel}
          </p>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {activeZone.summary}
          </p>
          <a
            href={`#${activeZone.id}`}
            className="mt-4 inline-flex font-semibold text-primary underline underline-offset-4 hover:opacity-80"
          >
            Read the full location guide
          </a>
        </div>
      </div>
    </section>
  );
};

const locationFaqs = [
  {
    question: "Can a knee pain location chart diagnose the cause?",
    answer:
      "No. A chart can help you name and describe the area, but nearby tissues can create similar sensations and pain can be referred or spread. A clinician combines location with onset, injury history, swelling, movement limits, instability, locking, age, and examination findings.",
  },
  {
    question: "What is the most common knee pain location?",
    answer:
      "The front of the knee and the area around or behind the kneecap are common complaint areas. However, frequency does not identify your cause. The activity that brings symptoms on and any swelling or mechanical symptoms matter too.",
  },
  {
    question: "What does inner knee pain at the joint line mean?",
    answer:
      "It describes a location, not a diagnosis. The medial joint line contains and borders several structures. Note whether the pain followed a twist, whether the area is swollen or tender, and whether the knee catches, locks, or gives way.",
  },
  {
    question: "Why does the back of my knee feel tight or swollen?",
    answer:
      "Several joint, muscle, tendon, and fluid-related patterns can create tightness or fullness behind the knee. Sudden or marked swelling, redness, warmth, calf pain, breathlessness, or difficulty bearing weight needs prompt medical guidance.",
  },
  {
    question: "Why can knee pain move from one location to another?",
    answer:
      "Pain can feel diffuse, spread from nearby tissues, or change as you alter your movement to protect one area. A shifting location is a reason to track the whole pattern: timing, activity, swelling, and function. Do not match one spot to one condition.",
  },
  {
    question: "How do I identify knee pain by location accurately?",
    answer:
      "Point with one finger to the most specific spot, then mark the wider area with your hand. Record whether it is front, inner, outer, back, above or below the kneecap, or at the joint line. Add what happened before it started and which movement reproduces it.",
  },
  {
    question: "When should knee pain be assessed urgently?",
    answer:
      "Seek urgent guidance after a major injury if the knee looks deformed, cannot bear weight, swells suddenly, or feels unstable. Fever with a red, hot, swollen knee, or concerning calf or breathing symptoms also needs urgent assessment.",
  },
] as const;

export const kneePainLocationsVisualGuide: ArticleExport = {
  cta: "",
  article: {
    slug: "knee-pain-locations-visual-guide",
    title: "Knee Pain Location Chart: A Visual Map of Where Your Knee Hurts",
    subtitle:
      "Compare front, inner, outer, back, kneecap, tendon, and joint-line patterns without using location alone as a diagnosis",
    intro:
      "Use this knee pain location chart to identify the area you want to describe: front, inner, outer, back, above or below the kneecap, or along the joint line. The interactive knee pain map and labeled diagrams below help you compare zones, record useful pattern clues, and recognize when a location needs professional assessment.",
    metaTitle: "Knee Pain Location Chart & Diagram | FlexiKnee",
    metaDescription:
      "Use this visual knee pain location chart to compare front, inner, outer, back, kneecap and joint-line pain, plus warning signs and next steps.",
    heroImage,
    publishedDate: "February 25, 2026",
    lastUpdated: "July 29, 2026",
    nextSlug: "runners-knee-pain-location",
    nextTitle: "Runner's Knee Pain Location: Causes & Patterns",
    seoTags:
      "knee pain location chart, knee pain diagram, knee pain chart, knee pain locations, knee pain map, identify knee pain by location, inner knee pain location chart, front knee pain location, outer knee pain location, back of knee pain location, pain below kneecap location, knee joint line pain",
    sources: [
      {
        title: "Knee pain: Symptoms and causes",
        publisher: "Mayo Clinic",
        url: "https://www.mayoclinic.org/diseases-conditions/knee-pain/symptoms-causes/syc-20350849",
      },
      {
        title: "Knee Pain in Adults and Adolescents: The Initial Evaluation",
        publisher: "American Academy of Family Physicians",
        url: "https://www.aafp.org/pubs/afp/issues/2018/1101/p576.html",
      },
      {
        title: "About Your Knee",
        publisher: "American Academy of Orthopaedic Surgeons",
        url: "https://orthoinfo.aaos.org/globalassets/pdfs/about-your-knee.pdf",
      },
      {
        title: "Knee pain",
        publisher: "NHS",
        url: "https://www.nhs.uk/symptoms/knee-pain/",
      },
      {
        title: "Patellofemoral pain syndrome: Symptoms and causes",
        publisher: "Mayo Clinic",
        url: "https://www.mayoclinic.org/diseases-conditions/patellofemoral-pain-syndrome/symptoms-causes/syc-20350792",
      },
      {
        title: "Swollen knee: Symptoms and causes",
        publisher: "Mayo Clinic",
        url: "https://www.mayoclinic.org/diseases-conditions/swollen-knee/symptoms-causes/syc-20378129",
      },
    ],
    content: (
      <>
        <QuickAnswer>
          <p>
            <strong>Where your knee hurts narrows the description, not the diagnosis.</strong>{" "}
            Pain around the kneecap often shows up with stairs, squats, running, or
            prolonged sitting; inner or outer pain may follow a joint line or nearby
            soft tissue; pain behind the knee can feel like tightness or fullness; and
            pain above or below the kneecap often sits near a tendon.
          </p>
          <p>
            Match the spot on the map, then add the clues that matter most: how it
            started, which movement triggers it, whether it is swollen, and whether the
            knee locks, catches, or gives way.
          </p>
        </QuickAnswer>

        <h2>Interactive Knee Pain Map: Choose Where It Hurts</h2>
        <p>
          Select the closest zone for a quick visual comparison. Start with the place
          you can point to most precisely. If the sensation covers the entire joint or
          changes position, choose <strong>Whole knee</strong> and use timing, swelling,
          and movement as your stronger clues.
        </p>

        <ZoneExplorer />

        <NoteBox tone="amber">
          <strong>Important:</strong> The interactive map is a communication tool. It
          cannot identify a torn ligament, meniscus problem, arthritis, tendon problem,
          cyst, infection, or any other diagnosis from location alone.
        </NoteBox>

        <SectionDivider />

        <h2>Knee Pain Location Chart: Front, Sides, and Back</h2>
        <VisualFigure
          src={diagramPainMapZones}
          alt="Color-coded knee pain location chart showing the front, inner, outer, above, below and back of the knee"
          caption="A front-and-back knee pain map. Match the area first, then compare onset, activity, swelling, and movement symptoms."
          width={1000}
          height={620}
          eager
        />
        <p>
          A useful <strong>knee pain diagram</strong> separates the knee into zones
          without pretending that each color equals one condition. Several tissues
          overlap in a small space. That is why two people pointing to the same spot can
          have different histories. That is why a clinician asks more than “where does
          it hurt?”
        </p>

        <div className="my-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <caption className="sr-only">
              Knee pain locations and pattern clues to record
            </caption>
            <thead className="bg-muted/70 text-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">How to mark it</th>
                <th className="px-4 py-3 font-semibold">Useful context to record</th>
                <th className="px-4 py-3 font-semibold">Detailed section</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-semibold">Front / kneecap</td>
                <td className="px-4 py-3">On, around, or behind the patella</td>
                <td className="px-4 py-3">Stairs, squats, running, long sitting</td>
                <td className="px-4 py-3"><a href="#front-knee" className="text-primary underline">Front knee</a></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">Inner / medial</td>
                <td className="px-4 py-3">Side facing the other knee</td>
                <td className="px-4 py-3">Twisting, tenderness, swelling, joint line</td>
                <td className="px-4 py-3"><a href="#inner-knee" className="text-primary underline">Inner knee</a></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">Outer / lateral</td>
                <td className="px-4 py-3">Outside edge or line extending up the thigh</td>
                <td className="px-4 py-3">Running, cycling, terrain, repetitive bending</td>
                <td className="px-4 py-3"><a href="#outer-knee" className="text-primary underline">Outer knee</a></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">Back / posterior</td>
                <td className="px-4 py-3">Central hollow or either back corner</td>
                <td className="px-4 py-3">Fullness, swelling, bending, calf symptoms</td>
                <td className="px-4 py-3"><a href="#back-knee" className="text-primary underline">Back of knee</a></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">Above / below kneecap</td>
                <td className="px-4 py-3">Tendon area immediately above or below</td>
                <td className="px-4 py-3">Training changes, jumping, stairs, age</td>
                <td className="px-4 py-3"><a href="#above-kneecap" className="text-primary underline">Tendon areas</a></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">Whole knee</td>
                <td className="px-4 py-3">Diffuse, shifting, or hard to pinpoint</td>
                <td className="px-4 py-3">Warmth, stiffness, swelling, illness, injury</td>
                <td className="px-4 py-3"><a href="#whole-knee" className="text-primary underline">Whole knee</a></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>What a Knee Pain Chart Can and Cannot Tell You</h2>
        <p>
          Location is one part of a knee assessment. Age, how the symptoms began,
          duration, recent changes in activity, swelling, trauma, mechanical symptoms,
          and the ability to bear weight all change what a location may mean. Use the
          chart to create a clearer description, then add these four questions:
        </p>
        <ol>
          <li><strong>Onset:</strong> Was it sudden after an event or gradual over days or weeks?</li>
          <li><strong>Trigger:</strong> Which movement, position, or activity reproduces it?</li>
          <li><strong>Function:</strong> Can you walk, bend, straighten, and use stairs normally?</li>
          <li><strong>Associated signs:</strong> Is there swelling, warmth, redness, locking, catching, or giving way?</li>
        </ol>

        <VisualFigure
          src={diagramAnatomyBonesLigaments}
          alt="Labeled knee anatomy diagram showing the patella, femur, tibia, menisci and major ligaments"
          caption="Many structures occupy neighboring areas. A pain location is useful context, but examination and history separate look-alike patterns."
          width={1000}
          height={700}
        />

        <SectionDivider />

        <section id="front-knee" className="scroll-mt-24">
          <h2>Front Knee Pain Location: Around or Behind the Kneecap</h2>
          <VisualFigure
            src={diagramFrontKnee}
            alt="Front knee pain diagram highlighting the kneecap and surrounding patellar region"
            caption="Front knee location: distinguish pain on the kneecap, around its edges, and the deeper feeling behind it."
          />
          <p>
            Front-of-knee pain is often described around or behind the patella. It may
            become more noticeable with stairs, squatting, running, kneeling, or sitting
            with the knee bent for a long time. Those patterns can occur with
            patellofemoral pain, but the same location does not prove one diagnosis.
          </p>
          <h3>Describe the front zone more precisely</h3>
          <ul>
            <li><strong>On the surface:</strong> tenderness directly over the kneecap</li>
            <li><strong>Around the rim:</strong> sensation along one or both patellar edges</li>
            <li><strong>Behind the kneecap:</strong> a deeper ache during loaded bending</li>
            <li><strong>With swelling:</strong> puffiness around or above the kneecap</li>
          </ul>
          <p>
            If the discomfort feels distinctly behind the patella, compare the pattern
            with our <Link to="/guides/pain-behind-kneecap" className="text-primary underline hover:opacity-80">pain behind the kneecap guide</Link>.
          </p>
        </section>

        <SectionDivider />

        <section id="inner-knee" className="scroll-mt-24">
          <h2>Inner Knee Pain Location Chart: Medial Side</h2>
          <VisualFigure
            src={diagramInnerKnee}
            alt="Inner knee pain location chart highlighting the medial side and medial joint line"
            caption="Inner knee location: use one finger to separate joint-line pain from a broader area above or below it."
          />
          <p>
            The inner knee is the side facing your other leg. Rather than labeling every
            medial sensation as one condition, record whether it sits exactly on the
            joint line, above it, or a few centimeters below it. A twisting event,
            tenderness, swelling, or a sense of instability changes the clinical
            context.
          </p>
          <h3>Clues worth recording</h3>
          <ul>
            <li>Did the discomfort follow a twist, pivot, fall, or change of direction?</li>
            <li>Is the most tender point at the joint crease or below it?</li>
            <li>Does the knee catch, lock, buckle, or feel unstable?</li>
            <li>Is swelling immediate, delayed, or absent?</li>
          </ul>
          <p>
            Compare the two sides in our <Link to="/guides/side-knee-pain-comfort-guide" className="text-primary underline hover:opacity-80">inner vs. outer knee pain guide</Link>.
          </p>
        </section>

        <SectionDivider />

        <section id="outer-knee" className="scroll-mt-24">
          <h2>Outer Knee Pain Location: Lateral Side and IT Band</h2>
          <VisualFigure
            src={diagramOuterKnee}
            alt="Outer knee pain diagram highlighting the lateral side of the knee"
            caption="Outer knee location: compare a small joint-line spot with a longer band-like area extending up the outer thigh."
          />
          <p>
            Outer-knee pain may be sharply localized near the lateral joint line or feel
            connected to a longer path up the outside of the thigh. Repetitive running,
            cycling, hills, cambered roads, and a rapid change in training load are
            useful details, but location alone cannot distinguish the structures
            involved.
          </p>
          <VisualFigure
            src={diagramITBand}
            alt="IT band pain location diagram showing the outer thigh and lateral knee path"
            caption="The IT band follows the outside of the thigh; symptoms near the lateral knee should still be interpreted with activity history."
          />
          <p>
            For the running-related outer-thigh pattern, use the focused{" "}
            <Link to="/guides/it-band-pain-location-diagram" className="text-primary underline hover:opacity-80">IT band pain location diagram</Link>.
          </p>
        </section>

        <SectionDivider />

        <section id="back-knee" className="scroll-mt-24">
          <h2>Back of Knee Pain Location: Tightness, Fullness, or Pain</h2>
          <VisualFigure
            src={diagramBackKnee}
            alt="Back of knee pain diagram highlighting the area behind the knee"
            caption="Back-of-knee location: note whether the sensation is central, toward one side, or extends into the calf or thigh."
          />
          <p>
            The area behind the knee contains tendons, muscles, blood vessels, nerves,
            and the back of the joint capsule. Describe whether you feel a central
            fullness, one-sided pull, visible swelling, or pain that extends into the
            calf or hamstring. New or marked swelling is more important than matching a
            label on a diagram.
          </p>
          <VisualFigure
            src={diagramBackKneePainViz}
            alt="Detailed posterior knee diagram showing the central hollow, hamstring sides and calf connection"
            caption="A closer posterior view helps separate the central hollow from the inner and outer tendon borders."
          />
          <p>
            See the <Link to="/guides/back-of-knee-pain-explained" className="text-primary underline hover:opacity-80">back-of-knee pain guide</Link> for a deeper comparison of common patterns and warning signs.
          </p>
        </section>

        <SectionDivider />

        <section id="above-kneecap" className="scroll-mt-24">
          <h2>Pain Above the Kneecap: Quadriceps Tendon Area</h2>
          <VisualFigure
            src={diagramAboveKneecap}
            alt="Knee pain diagram highlighting the quadriceps tendon area above the kneecap"
            caption="Above-kneecap location: the highlighted region sits where the quadriceps tendon meets the patella."
          />
          <p>
            Pain immediately above the kneecap may be described in the quadriceps tendon
            region. Note whether it followed a sudden jump in running, jumping, stairs,
            or loaded squats, and whether the knee can straighten normally. A sudden
            injury with weakness or loss of normal extension needs assessment.
          </p>
        </section>

        <section id="below-kneecap" className="scroll-mt-24">
          <h2>Pain Below the Kneecap: Patellar Tendon and Shin-Bump Area</h2>
          <VisualFigure
            src={diagramBelowKneecapPressure}
            alt="Knee pain location diagram highlighting the patellar tendon and area below the kneecap"
            caption="Below-kneecap location: distinguish the tendon just under the patella from the bony bump farther down the shin."
          />
          <p>
            Below-kneecap pain can sit in the patellar tendon or over the bony attachment
            on the upper shin. Age matters here: rapidly growing teenagers and active
            adults can report similar locations for different reasons. Record jumping,
            sprinting, kneeling, growth, and recent training changes.
          </p>
          <p>
            Our <Link to="/guides/below-knee-discomfort-teens-adults" className="text-primary underline hover:opacity-80">below-knee guide for teens and adults</Link> compares those age-dependent patterns.
          </p>
        </section>

        <SectionDivider />

        <section id="joint-line" className="scroll-mt-24">
          <h2>Knee Joint-Line Pain: Inner or Outer Crease</h2>
          <VisualFigure
            src={diagramJointLine}
            alt="Knee joint-line diagram highlighting the inner and outer creases between the thigh and shin bones"
            caption="Joint-line location: the narrow inner and outer creases are different from broad side-of-knee pain."
          />
          <p>
            The joint line is the narrow crease between the femur and tibia on either
            side. Pain there may become more noticeable with twisting or deep bending.
            Catching, locking, swelling, or loss of motion should be described clearly;
            none of those findings should be self-diagnosed from a chart.
          </p>
        </section>

        <section id="whole-knee" className="scroll-mt-24">
          <h2>Whole-Knee or Shifting Pain: When One Spot Is Not Enough</h2>
          <p>
            Some symptoms are diffuse, move between zones, or feel like a general ache,
            stiffness, warmth, or pressure. In that case, a single location has less
            value. Track whether symptoms are in one or both knees, how long morning
            stiffness lasts, whether the joint is visibly swollen, and whether there was
            a recent illness, injury, or activity increase.
          </p>
          <NoteBox>
            Compensation can also change the map: limping or protecting one area may
            make a neighboring area more noticeable. Record the first location and how
            the pattern changed instead of choosing only the latest spot.
          </NoteBox>
        </section>

        <SectionDivider />

        <h2>How to Identify Knee Pain by Location</h2>
        <ol>
          <li>
            <strong>Point with one finger.</strong> Mark the most precise point before
            describing the wider area with your hand.
          </li>
          <li>
            <strong>Name the zone.</strong> Use front, inner, outer, back, above or below
            the kneecap, joint line, or whole knee.
          </li>
          <li>
            <strong>Add depth.</strong> Does it feel superficial, deep behind the
            kneecap, or inside the joint?
          </li>
          <li>
            <strong>Add time and trigger.</strong> Record onset, duration, activity,
            rest, stairs, sitting, twisting, or impact.
          </li>
          <li>
            <strong>Add visible and mechanical signs.</strong> Note swelling, warmth,
            redness, bruising, locking, catching, or giving way.
          </li>
          <li>
            <strong>Use the map to communicate.</strong> Bring the description to a
            qualified professional if symptoms are severe, persistent, worsening, or
            limiting normal activity.
          </li>
        </ol>

        <h2>When the Location Needs Prompt Assessment</h2>
        <NoteBox tone="red">
          <p className="font-semibold">Seek urgent medical guidance if:</p>
          <ul className="mb-0 mt-3">
            <li>the knee looks deformed after an injury;</li>
            <li>you cannot bear weight or the knee gives way after trauma;</li>
            <li>swelling is sudden or severe, or movement is markedly limited;</li>
            <li>the knee is red, hot, and swollen with fever;</li>
            <li>pain behind the knee is accompanied by concerning calf swelling, chest pain, or breathlessness.</li>
          </ul>
        </NoteBox>
        <p>
          If the pain began suddenly without an obvious explanation, our{" "}
          <Link to="/guides/sudden-knee-pain-guide" className="text-primary underline hover:opacity-80">sudden knee pain guide</Link> can help you organize the history and warning signs before seeking care.
        </p>

        <SectionDivider />

        <h2>Frequently Asked Questions</h2>
        <div className="my-6 space-y-2">
          {locationFaqs.map((item) => (
            <details
              key={item.question}
              className="group rounded-lg border border-border bg-card px-4 py-3"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-xl font-normal text-primary transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mb-1 mt-3 border-t border-border/60 pt-3 leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </details>
          ))}
        </div>

        <NoteBox tone="amber">
          <strong>Medical note:</strong> This visual guide is for education and clearer
          symptom description. It does not diagnose the cause of knee pain or replace an
          examination by a qualified healthcare professional.
        </NoteBox>
      </>
    ),
  },
};
